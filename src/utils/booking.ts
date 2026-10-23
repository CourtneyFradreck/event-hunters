import { DEPOSIT_RATE } from '@/constants/booking';
import type { Booking, BookingQuote, BookingStatus, Payout, QuoteDraft } from '@/store/booking-model';
import { roundUSD } from './money';

export const STATUS_LABELS: Record<BookingStatus, string> = {
  requested: 'Needs a quote', quoted: 'Quote sent', awaiting_deposit: 'Awaiting deposit',
  deposit_paid: 'Deposit secured', delivered: 'Awaiting delivery confirmation',
  completed: 'Funds released', declined: 'Declined', disputed: 'Disputed · funds frozen',
};

export const isTerminal = (status: BookingStatus) => status === 'completed' || status === 'declined';

export function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function defaultValidity() {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export const isQuoteExpired = (quote: Pick<BookingQuote, 'validUntil'>) =>
  !isValidDate(quote.validUntil) || new Date(`${quote.validUntil}T23:59:59`).getTime() < Date.now();

export function calculateQuote(guests: number, draft: QuoteDraft): BookingQuote {
  const total = roundUSD(draft.items.reduce((sum, item) =>
    sum + roundUSD(item.unitPrice * (item.perGuest ? guests : 1)), 0));
  const deposit = roundUSD(total * DEPOSIT_RATE);
  return { ...draft, items: draft.items.map(item => ({ ...item })), total, deposit,
    balance: roundUSD(total - deposit), depositRate: DEPOSIT_RATE };
}

export function validQuote(guests: number, draft: QuoteDraft) {
  return Number.isInteger(guests) && guests > 0 && draft.items.length > 0
    && draft.items.every(item => item.name.trim() && Number.isFinite(item.unitPrice)
      && item.unitPrice >= 0 && item.unitPrice <= 1_000_000
      && roundUSD(item.unitPrice) === item.unitPrice)
    && calculateQuote(guests, draft).total > 0 && !isQuoteExpired(draft);
}

export function walletTotals(bookings: Booking[], payouts: Payout[], catererId: string) {
  const jobs = bookings.filter(booking => booking.catererId === catererId);
  const sum = (statuses: BookingStatus[]) => roundUSD(jobs.reduce((total, booking) =>
    total + (statuses.includes(booking.status) ? booking.quote?.deposit ?? 0 : 0), 0));
  const released = sum(['completed']);
  const withdrawn = roundUSD(payouts.filter(payout => payout.catererId === catererId)
    .reduce((total, payout) => total + payout.amount, 0));
  return { escrowHeld: sum(['deposit_paid', 'delivered']), frozen: sum(['disputed']),
    released, withdrawn, available: roundUSD(released - withdrawn) };
}
