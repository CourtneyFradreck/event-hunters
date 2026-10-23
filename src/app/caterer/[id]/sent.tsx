import { router } from 'expo-router';
import { Text } from 'react-native';

import { BookingSummary } from '@/components/booking/booking-summary';
import { Button, EmptyState, Screen, ui } from '@/components/ui/screen';
import { useBooking } from '@/hooks/use-booking';

export default function QuoteSentScreen() {
  const booking = useBooking();
  return <Screen title="Request sent" back="/(tabs)/bookings">
    {booking ? <>
      <Text style={ui.title}>Sent to {booking.catererName}</Text>
      <Text style={ui.body}>Your brief is in the caterer&apos;s Requests tab. Their quote will appear on this same booking.</Text>
      <BookingSummary booking={booking} />
      <Button label="View booking" onPress={() => router.replace({ pathname: '/booking/[id]/tracker', params: { id: booking.id } })} />
      <Button label="My bookings" variant="secondary" onPress={() => router.replace('/(tabs)/bookings')} />
    </> : <EmptyState title="Request not found" />}
  </Screen>;
}
