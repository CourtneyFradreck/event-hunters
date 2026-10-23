import { useState } from 'react';
import { router } from 'expo-router';
import { Text } from 'react-native';

import { BookingSummary, QuoteSummary } from '@/components/booking/booking-summary';
import { BookingTimeline } from '@/components/booking/booking-timeline';
import { Button, EmptyState, Screen, ui } from '@/components/ui/screen';
import { useBooking } from '@/hooks/use-booking';
import { useBookingsStore } from '@/store/useBookingsStore';

export default function VendorBookingDetailScreen() {
  const booking = useBooking();
  const profile = useBookingsStore(state => state.vendorProfile);
  const markDelivered = useBookingsStore(state => state.markDelivered);
  const [error, setError] = useState('');
  return <Screen title="Booking detail" back="/vendor/bookings">
    {booking && booking.catererId === profile.id ? <>
      <BookingSummary booking={booking} />
      <BookingTimeline booking={booking} />
      {booking.quote && <QuoteSummary quote={booking.quote} guests={booking.guests} />}
      {booking.status === 'deposit_paid' && <Button label="Mark as delivered" variant="copper" onPress={() => {
        if (!markDelivered(booking.id)) setError('This booking can no longer be marked delivered.');
      }} />}
      {booking.status === 'delivered' && <Text style={ui.success}>Delivery marked. Your deposit stays in escrow until the organiser confirms delivery.</Text>}
      {['quoted', 'awaiting_deposit'].includes(booking.status) && <Button label="Revise quote" variant="secondary"
        onPress={() => router.push({ pathname: '/vendor/requests/[id]/quote', params: { id: booking.id } })} />}
      {!!error && <Text style={ui.error}>{error}</Text>}
      <Button label="Open chat" variant="secondary" onPress={() => router.push({ pathname: '/booking/[id]/chat', params: { id: booking.id } })} />
      <Button label="All bookings" variant="secondary" onPress={() => router.replace('/vendor/bookings')} />
    </> : <EmptyState title="Booking not found" />}
  </Screen>;
}
