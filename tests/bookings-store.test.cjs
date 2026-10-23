const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

// Run the actual TypeScript store without adding a test runner or importing React Native.
function fixture() {
  const cache = new Map();
  const events = [];
  function load(filename) {
    const full = path.resolve(__dirname, '../src', filename.endsWith('.ts') ? filename : `${filename}.ts`);
    if (cache.has(full)) return cache.get(full).exports;
    const module = { exports: {} };
    cache.set(full, module);
    const code = ts.transpileModule(fs.readFileSync(full, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    const localRequire = name => {
      if (name === '@/utils/logger') return { logger: { trackEvent: (...args) => events.push(args), debug() {} } };
      if (name.startsWith('@/')) return load(name.slice(2));
      if (name.startsWith('.')) return load(path.relative(path.resolve(__dirname, '../src'), path.resolve(path.dirname(full), name)));
      return require(name);
    };
    vm.runInThisContext(`(function(require,module,exports){${code}\n})`, { filename: full })(localRequire, module, module.exports);
    return module.exports;
  }
  const store = load('store/useBookingsStore').useBookingsStore;
  return { store, events, ...load('utils/booking') };
}

const brief = { eventType: 'Wedding', date: '14 Dec 2026', guests: 120,
  suburb: 'Borrowdale', venue: 'Demo Hall', service: 'Full-service', notes: 'Vegetarian options please.' };
const quote = { validUntil: '2099-12-31', note: 'Cutlery included.', items: [
  { id: 'menu', name: 'Buffet', unitPrice: 16.5, perGuest: true },
  { id: 'extra', name: 'Plates & cutlery', unitPrice: 1.5, perGuest: true },
] };

test('one booking survives the complete two-sided lifecycle, chat, and withdrawal', () => {
  const { store, walletTotals, events } = fixture();
  const id = store.getState().requestQuote('zuva', brief);
  assert.ok(id);
  assert.equal(store.getState().sendQuote(id, quote), true);
  let booking = store.getState().bookings.find(b => b.id === id);
  assert.equal(booking.quote.total, 2160);
  assert.equal(booking.quote.deposit, 648);
  assert.equal(store.getState().acceptQuote(id), true);
  assert.equal(store.getState().payDeposit(id, 'ecocash'), true);
  const before = walletTotals(store.getState().bookings, [], 'zuva');
  assert.equal(store.getState().payDeposit(id, 'ecocash'), false);
  assert.equal(store.getState().markDelivered(id), true);
  assert.equal(walletTotals(store.getState().bookings, [], 'zuva').escrowHeld, before.escrowHeld);
  assert.equal(walletTotals(store.getState().bookings, [], 'zuva').available, 0);
  store.getState().sendMessage(id, 'organiser', 'Thank you!');
  store.getState().sendMessage(id, 'caterer', 'Ready for confirmation.');
  assert.equal(store.getState().confirmDelivery(id), true);
  assert.equal(store.getState().confirmDelivery(id), false);
  const after = walletTotals(store.getState().bookings, [], 'zuva');
  assert.equal(after.escrowHeld, before.escrowHeld - 648);
  assert.equal(after.available, 648);
  assert.equal(store.getState().withdraw('zuva', 648), true);
  assert.equal(store.getState().withdraw('zuva', 648), false);
  assert.equal(walletTotals(store.getState().bookings, store.getState().payouts, 'zuva').available, 0);
  booking = store.getState().bookings.find(b => b.id === id);
  assert.equal(booking.messages.length, 2);
  assert.deepEqual(booking.history.map(h => h.status), ['requested', 'quoted', 'awaiting_deposit', 'deposit_paid', 'delivered', 'completed']);
  for (const name of ['Quote Requested', 'Quote Sent', 'Quote Accepted', 'Deposit Paid', 'Delivery Marked', 'Delivery Confirmed · Funds Released']) {
    assert.ok(events.some(event => event[0] === name), name);
  }
});

test('disputes freeze deposits and block release and withdrawal', () => {
  const { store, walletTotals } = fixture();
  assert.equal(store.getState().openDispute('b3', 'Cold food'), true);
  assert.equal(store.getState().confirmDelivery('b3'), false);
  assert.equal(store.getState().markDelivered('b3'), false);
  const wallet = walletTotals(store.getState().bookings, [], 'zuva');
  assert.equal(wallet.frozen, 320);
  assert.equal(wallet.available, 0);
  assert.equal(store.getState().withdraw('zuva', 1), false);
});

test('reject invalid transitions, expired quotes, malformed prices, and duplicate sends', () => {
  const { store } = fixture();
  assert.equal(store.getState().confirmDelivery('req1'), false);
  assert.equal(store.getState().payDeposit('req1', 'card'), false);
  assert.equal(store.getState().sendQuote('req1', { ...quote, validUntil: '2000-01-01' }), false);
  assert.equal(store.getState().sendQuote('req1', { ...quote, validUntil: '2099-02-31' }), false);
  assert.equal(store.getState().sendQuote('req1', { ...quote, items: [{ ...quote.items[0], unitPrice: NaN }] }), false);
  assert.equal(store.getState().declineRequest('req1'), true);
  assert.equal(store.getState().sendQuote('req1', quote), false);
  assert.equal(store.getState().declineRequest('req1'), false);
  assert.equal(store.getState().requestQuote('zuva', { ...brief, guests: -10 }), null);
});

test('editing the business persists without changing issued quote prices', () => {
  const { store } = fixture();
  const profile = store.getState().vendorProfile;
  assert.equal(store.getState().updateVendorProfile({ ...profile, name: 'Zuva Demo', cuisineTags: ['Fusion'] }), true);
  assert.equal(store.getState().bookings.find(b => b.id === 'b1').catererName, 'Zuva Demo');
  assert.equal(store.getState().bookings.find(b => b.id === 'b1').quote.total, 3630);
  assert.equal(store.getState().updateVendorProfile({ ...profile, gallery: ['javascript:alert(1)'] }), false);
});
