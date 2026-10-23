import { useRef, useState } from 'react';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { QuoteSummary } from '@/components/booking/booking-summary';
import { Chip } from '@/components/ui/chip';
import { Button, Field, Screen, ui } from '@/components/ui/screen';
import { DEPOSIT_RATE } from '@/constants/booking';
import type { Booking, QuoteDraft } from '@/store/booking-model';
import { useBookingsStore } from '@/store/useBookingsStore';
import { calculateQuote, defaultValidity, validQuote } from '@/utils/booking';
import { formatUSD } from '@/utils/money';
import { DashboardCard } from './dashboard-card';

interface DraftItem { id: string; name: string; price: string; perGuest: boolean }
let itemSequence = 0;
const itemId = () => `item-${Date.now()}-${++itemSequence}`;

export function QuoteBuilder({ booking }: { booking: Booking }) {
  const profile = useBookingsStore(state => state.vendorProfile);
  const sendQuote = useBookingsStore(state => state.sendQuote);
  const initialPackage = profile.packages[0];
  const [packageName, setPackageName] = useState(booking.quote?.packageName ?? initialPackage?.name ?? '');
  const [items, setItems] = useState<DraftItem[]>(() => booking.quote
    ? booking.quote.items.map(item => ({ ...item, price: String(item.unitPrice) }))
    : [{ id: itemId(), name: initialPackage?.name ?? 'Menu', price: initialPackage ? String(initialPackage.pricePerHead) : '', perGuest: true }]);
  const [validUntil, setValidUntil] = useState(booking.quote?.validUntil ?? defaultValidity());
  const [note, setNote] = useState(booking.quote?.note ?? '');
  const [preview, setPreview] = useState<QuoteDraft | null>(null);
  const [error, setError] = useState('');
  const sending = useRef(false);
  const draft: QuoteDraft = { packageName, validUntil, note,
    items: items.map(item => ({ id: item.id, name: item.name, perGuest: item.perGuest,
      unitPrice: item.price.trim() ? Number(item.price) : NaN })) };
  const valid = validQuote(booking.guests, draft);
  const totals = calculateQuote(booking.guests, draft);
  const updateItem = (id: string, changes: Partial<DraftItem>) => setItems(current =>
    current.map(item => item.id === id ? { ...item, ...changes } : item));

  if (preview) return <Screen title="Preview quote" subtitle={`${booking.organiserName} · ${booking.guests} guests`} back="/vendor">
    <Text style={ui.body}>{booking.eventType} · {booking.date} · {booking.venue}</Text>
    <QuoteSummary quote={calculateQuote(booking.guests, preview)} guests={booking.guests} />
    {!!error && <Text style={ui.error}>{error}</Text>}
    <Button label="Send quote to organiser" variant="copper" onPress={() => {
      if (sending.current) return;
      sending.current = true;
      if (!sendQuote(booking.id, preview)) {
        sending.current = false; setError('The quote is unchanged, expired, or this booking can no longer be quoted.'); return;
      }
      router.replace({ pathname: '/vendor/bookings/[id]', params: { id: booking.id } });
    }} />
    <Button label="Edit quote" variant="secondary" onPress={() => { setPreview(null); setError(''); }} />
  </Screen>;

  return <Screen title="Build quote" subtitle={`${booking.organiserName} · ${booking.guests} guests`} back="/vendor">
    <Text style={ui.title}>Choose a package or custom items</Text>
    <View style={ui.row}>
      {profile.packages.map(pkg => <Chip key={pkg.id} label={pkg.name} selected={packageName === pkg.name}
        onPress={() => {
          setPackageName(pkg.name);
          setItems(current => [{ id: current[0]?.id ?? itemId(), name: pkg.name, price: String(pkg.pricePerHead), perGuest: true }, ...current.slice(1)]);
        }} />)}
      <Chip label="Custom line items" selected={!packageName} onPress={() => setPackageName('')} />
    </View>
    {items.map((item, index) => <DashboardCard key={item.id}><View style={ui.stack}>
      <Field label={`Item ${index + 1} name`} value={item.name} onChangeText={name => updateItem(item.id, { name })} />
      <Field label={`Item ${index + 1} price (USD)`} value={item.price} keyboardType="decimal-pad"
        onChangeText={price => updateItem(item.id, { price })} />
      <View style={ui.row}>
        <Chip label="Per head" selected={item.perGuest} onPress={() => updateItem(item.id, { perGuest: true })} />
        <Chip label="Flat fee" selected={!item.perGuest} onPress={() => updateItem(item.id, { perGuest: false })} />
      </View>
      <Button label={`Remove item ${index + 1}`} variant="secondary" disabled={items.length === 1}
        onPress={() => setItems(current => current.filter(row => row.id !== item.id))} />
    </View></DashboardCard>)}
    <Button label="Add line item" variant="secondary" onPress={() => setItems(current =>
      [...current, { id: itemId(), name: '', price: '', perGuest: true }])} />
    <Button label="Add plates & cutlery" variant="secondary" onPress={() => setItems(current =>
      [...current, { id: itemId(), name: 'Plates & cutlery', price: '1.50', perGuest: true }])} />
    <Field label="Valid until (YYYY-MM-DD)" value={validUntil} autoCapitalize="none" onChangeText={setValidUntil} />
    <Field label="Note to organiser" multiline value={note} onChangeText={setNote} />
    <DashboardCard>
      <Text style={ui.title}>Total {Number.isFinite(totals.total) ? formatUSD(totals.total) : '—'}</Text>
      <Text style={ui.body}>{DEPOSIT_RATE * 100}% deposit: {Number.isFinite(totals.deposit) ? formatUSD(totals.deposit) : '—'}</Text>
      <Text style={ui.muted}>{booking.guests} guests. Per-head items are multiplied by the guest count; flat fees are added once.</Text>
    </DashboardCard>
    {!valid && <Text style={ui.error}>Add named items with valid USD prices (up to two decimal places), a positive total, and a valid date that has not expired.</Text>}
    <Button label="Preview quote" variant="copper" disabled={!valid} onPress={() => { setError(''); setPreview(draft); }} />
  </Screen>;
}
