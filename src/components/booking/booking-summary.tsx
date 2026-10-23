import { StyleSheet, Text, View } from 'react-native';

import { EscrowIcon } from '@/components/ui/escrow-icon';
import { SummaryRow, ui } from '@/components/ui/screen';
import { DashboardCard } from '@/components/vendor/dashboard-card';
import { EHColors } from '@/constants/colors';
import type { Booking, BookingQuote } from '@/store/booking-model';
import { STATUS_LABELS, isQuoteExpired } from '@/utils/booking';
import { formatUSD } from '@/utils/money';

export function StatusBadge({ booking }: { booking: Booking }) {
  const secured = ['deposit_paid', 'delivered', 'completed'].includes(booking.status);
  const disputed = booking.status === 'disputed';
  return <View style={[styles.badge, secured && styles.green, disputed && styles.red]}>
    {secured && <EscrowIcon size="small" />}
    <Text style={[styles.badgeText, secured && { color: EHColors.green }, disputed && { color: EHColors.red }]}>
      {STATUS_LABELS[booking.status]}
    </Text>
  </View>;
}

export function BookingSummary({ booking }: { booking: Booking }) {
  return <DashboardCard><View style={ui.stack}>
    <StatusBadge booking={booking} />
    <Text style={ui.title}>{booking.eventType} · {booking.guests} guests</Text>
    <SummaryRow label="Organiser" value={booking.organiserName} />
    <SummaryRow label="Caterer" value={booking.catererName} />
    <SummaryRow label="Date" value={booking.date} />
    <SummaryRow label="Suburb" value={booking.suburb} />
    <SummaryRow label="Venue" value={booking.venue} />
    <SummaryRow label="Service" value={booking.service} />
    <Text style={ui.label}>Organiser notes</Text>
    <Text style={ui.body}>{booking.notes || 'No additional notes.'}</Text>
    {booking.disputeReason && <Text style={ui.error}>Dispute: {booking.disputeReason}</Text>}
  </View></DashboardCard>;
}

export function QuoteSummary({ quote, guests }: { quote: BookingQuote; guests: number }) {
  return <DashboardCard><View style={ui.stack}>
    <Text style={ui.title}>{quote.packageName || 'Custom menu quote'}</Text>
    {quote.items.map(item => <SummaryRow key={item.id}
      label={`${item.name} (${item.perGuest ? `${guests} × ${formatUSD(item.unitPrice)}` : 'flat fee'})`}
      value={formatUSD(item.unitPrice * (item.perGuest ? guests : 1))} />)}
    <SummaryRow label="Total" value={formatUSD(quote.total)} />
    <SummaryRow label={`${quote.depositRate * 100}% deposit in escrow`} value={formatUSD(quote.deposit)} />
    <SummaryRow label="Balance paid separately" value={formatUSD(quote.balance)} />
    <SummaryRow label="Quote valid until" value={quote.validUntil} />
    {isQuoteExpired(quote) && <Text style={ui.error}>This quote has expired. Ask the caterer to revise it.</Text>}
    <Text style={ui.body}>{quote.note || 'No additional quote notes.'}</Text>
    <Text style={ui.muted}>Mock USD amounts. The deposit releases only after the organiser confirms delivery.</Text>
  </View></DashboardCard>;
}

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8,
    paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, backgroundColor: EHColors.copperBg },
  badgeText: { color: EHColors.copperDark, fontSize: 13, fontWeight: '700', flexShrink: 1 },
  green: { backgroundColor: EHColors.greenBg },
  red: { backgroundColor: EHColors.redBg },
});
