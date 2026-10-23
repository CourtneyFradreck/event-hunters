import { useState } from 'react';
import { router } from 'expo-router';
import { Text } from 'react-native';

import { BookingSummary } from '@/components/booking/booking-summary';
import { Button, EmptyState, Screen, ui } from '@/components/ui/screen';
import { useBooking } from '@/hooks/use-booking';
import { useAuth } from '@/context/AuthContext';
import { useBookingsStore } from '@/store/useBookingsStore';
import { formatUSD } from '@/utils/money';

export default function ConfirmDeliveryScreen() {
  const booking = useBooking();
  const { role } = useAuth();
  const confirmDelivery = useBookingsStore(state => state.confirmDelivery);
  const [error, setError] = useState('');
  return <Screen title="Event Day" back="/(tabs)/bookings">
    {booking && role === 'organiser' ? <>
      <BookingSummary booking={booking} />
      <Text style={ui.title}>{booking.status === 'delivered' ? 'Did everything go as agreed?' : 'Waiting for delivery'}</Text>
      <Text style={ui.body}>{booking.status === 'delivered'
        ? `${booking.catererName} marked the event delivered. Confirm to release the ${formatUSD(booking.quote?.deposit ?? 0)} deposit to their demo wallet.`
        : 'The caterer must mark this booking delivered before you can confirm. Your deposit stays locked.'}</Text>
      {!!error && <Text style={ui.error}>{error}</Text>}
      <Button label="Confirm delivery" variant="copper" disabled={booking.status !== 'delivered'}
        onPress={() => {
          if (!confirmDelivery(booking.id)) { setError('This booking can no longer be confirmed.'); return; }
          router.replace({ pathname: '/booking/[id]/rate', params: { id: booking.id } });
        }} />
      <Button label="Raise a dispute" variant="danger" disabled={!['deposit_paid', 'delivered'].includes(booking.status)}
        onPress={() => router.push({ pathname: '/booking/[id]/dispute', params: { id: booking.id } })} />
      <Text style={ui.muted}>Mock escrow only. Confirming releases the deposit; it does not settle the remaining balance.</Text>
    </> : <EmptyState title="Delivery confirmation unavailable" />}
  </Screen>;
}
