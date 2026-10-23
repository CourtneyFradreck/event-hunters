import { router } from 'expo-router';
import { Text } from 'react-native';

import { BookingSummary, QuoteSummary } from '@/components/booking/booking-summary';
import { BookingTimeline } from '@/components/booking/booking-timeline';
import { Button, EmptyState, Screen, ui } from '@/components/ui/screen';
import { useBooking } from '@/hooks/use-booking';
import { useAuth } from '@/context/AuthContext';

export default function BookingTrackerScreen() {
  const booking = useBooking();
  const { role } = useAuth();
  return <Screen title="Booking tracker" back={role === 'caterer' ? '/vendor' : '/(tabs)/bookings'}>
    {booking ? <>
      <BookingSummary booking={booking} />
      <BookingTimeline booking={booking} />
      {booking.quote && <QuoteSummary quote={booking.quote} guests={booking.guests} />}
      {booking.status === 'requested' && <Text style={ui.body}>Waiting for the caterer to send a quote.</Text>}
      {role === 'organiser' && ['quoted', 'awaiting_deposit'].includes(booking.status) &&
        <Button label="Review quote" variant="copper" onPress={() => router.push({
          pathname: '/caterer/[id]/compare', params: { id: booking.catererId, bookingId: booking.id },
        })} />}
      {role === 'organiser' && ['deposit_paid', 'delivered'].includes(booking.status) &&
        <Button label="Delivery & dispute options" onPress={() => router.push({ pathname: '/booking/[id]/delivery', params: { id: booking.id } })} />}
      {role === 'organiser' && booking.status === 'completed' &&
        <Button label={booking.rating ? 'Update rating' : 'Rate caterer'} onPress={() => router.push({ pathname: '/booking/[id]/rate', params: { id: booking.id } })} />}
      <Button label="Open chat" variant="secondary" onPress={() => router.push({ pathname: '/booking/[id]/chat', params: { id: booking.id } })} />
    </> : <EmptyState title="Booking not found" />}
  </Screen>;
}
