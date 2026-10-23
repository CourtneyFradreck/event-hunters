import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { BookingSummary, QuoteSummary } from '@/components/booking/booking-summary';
import { Chip } from '@/components/ui/chip';
import { Button, EmptyState, Screen, ui } from '@/components/ui/screen';
import { useBooking } from '@/hooks/use-booking';
import { useBookingsStore } from '@/store/useBookingsStore';
import { isQuoteExpired } from '@/utils/booking';
import { formatUSD } from '@/utils/money';

export default function BookingConfirmScreen() {
  const booking = useBooking();
  const { id } = useLocalSearchParams<{ id: string }>();
  const acceptQuote = useBookingsStore(state => state.acceptQuote);
  const payDeposit = useBookingsStore(state => state.payDeposit);
  const [paymentMethod, setPaymentMethod] = useState<'ecocash' | 'card'>('ecocash');
  const [error, setError] = useState('');
  const quote = booking?.quote;
  if (!booking || !quote || booking.catererId !== id) return <Screen title="Confirm Booking" back="/(tabs)/bookings">
    <EmptyState title="No quote selected" description="Request a quote first, then open its reply from My Bookings." />
    <Button label="My bookings" onPress={() => router.replace('/(tabs)/bookings')} />
  </Screen>;

  return <Screen title="Confirm Booking" back="/(tabs)/bookings">
    <BookingSummary booking={booking} />
    <QuoteSummary quote={quote} guests={booking.guests} />
    <Text style={ui.success}>Your {formatUSD(quote.deposit)} deposit stays in mock escrow until you confirm delivery. The remaining balance is paid separately.</Text>
    <Text style={ui.title}>Mock payment method</Text>
    <View style={ui.row}>
      <Chip label="EcoCash" selected={paymentMethod === 'ecocash'} onPress={() => setPaymentMethod('ecocash')} />
      <Chip label="Card" selected={paymentMethod === 'card'} onPress={() => setPaymentMethod('card')} />
    </View>
    <Text style={ui.muted}>This changes the demo booking status. No payment is processed.</Text>
    {!!error && <Text style={ui.error}>{error}</Text>}
    <Button label="Pay Securely" variant="copper"
      disabled={isQuoteExpired(quote) || !['quoted', 'awaiting_deposit'].includes(booking.status)}
      onPress={() => {
        if (booking.status === 'quoted' && !acceptQuote(booking.id)) {
          setError('The quote can no longer be accepted.'); return;
        }
        if (!payDeposit(booking.id, paymentMethod)) {
          setError('The deposit could not be paid. Check the quote status and validity.'); return;
        }
        router.replace({ pathname: '/booking/[id]/tracker', params: { id: booking.id } });
      }} />
  </Screen>;
}
