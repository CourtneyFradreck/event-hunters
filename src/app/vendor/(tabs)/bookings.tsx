import { Text, View } from 'react-native';

import { EmptyState, Screen, ui } from '@/components/ui/screen';
import { VendorBookingCard } from '@/components/vendor/vendor-booking-card';
import type { BookingStatus } from '@/store/booking-model';
import { useBookingsStore } from '@/store/useBookingsStore';

const GROUPS: { status: BookingStatus; title: string }[] = [
  { status: 'quoted', title: 'Quote sent' },
  { status: 'awaiting_deposit', title: 'Awaiting deposit' },
  { status: 'deposit_paid', title: 'Deposit in escrow' },
  { status: 'delivered', title: 'Delivered · awaiting confirmation' },
  { status: 'completed', title: 'Paid out · released to wallet' },
  { status: 'disputed', title: 'Disputed · funds frozen' },
];

export default function VendorBookingsScreen() {
  const bookings = useBookingsStore(state => state.bookings);
  const profile = useBookingsStore(state => state.vendorProfile);
  const jobs = bookings.filter(booking => booking.catererId === profile.id && !['requested', 'declined'].includes(booking.status));
  return <Screen title="Bookings" subtitle="Quotes, upcoming jobs and delivery progress">
    {GROUPS.map(group => {
      const items = jobs.filter(booking => booking.status === group.status);
      return items.length ? <View key={group.status} style={ui.stack}>
        <Text style={ui.title}>{group.title} ({items.length})</Text>
        {items.map(booking => <VendorBookingCard key={booking.id} booking={booking} />)}
      </View> : null;
    })}
    {!jobs.length && <EmptyState title="No bookings yet" description="Send your first quote from Requests." />}
  </Screen>;
}
