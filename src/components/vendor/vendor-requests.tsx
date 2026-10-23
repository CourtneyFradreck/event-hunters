import { Text, View } from 'react-native';

import { EmptyState, ui } from '@/components/ui/screen';
import { useBookingsStore } from '@/store/useBookingsStore';
import { walletTotals } from '@/utils/booking';
import { formatUSD } from '@/utils/money';
import { DashboardCard } from './dashboard-card';
import { VendorBookingCard } from './vendor-booking-card';

export function VendorRequests() {
  const bookings = useBookingsStore(state => state.bookings);
  const payouts = useBookingsStore(state => state.payouts);
  const profile = useBookingsStore(state => state.vendorProfile);
  const requests = bookings.filter(booking => booking.catererId === profile.id && booking.status === 'requested');
  const declined = bookings.filter(booking => booking.catererId === profile.id && booking.status === 'declined');
  const wallet = walletTotals(bookings, payouts, profile.id);
  return <View style={ui.stack}>
    <DashboardCard>
      <Text style={ui.muted}>Deposits secured in escrow</Text>
      <Text style={ui.title}>{formatUSD(wallet.escrowHeld)}</Text>
      <Text style={ui.muted}>Release requires organiser confirmation of delivery.</Text>
    </DashboardCard>
    <Text style={ui.title}>Needs a quote ({requests.length})</Text>
    {requests.map(booking => <VendorBookingCard key={booking.id} booking={booking} request />)}
    {!requests.length && <EmptyState title="All caught up" description="New organiser briefs will appear here." />}
    {!!declined.length && <Text style={ui.title}>Declined requests</Text>}
    {declined.map(booking => <VendorBookingCard key={booking.id} booking={booking} request />)}
  </View>;
}
