import { Fragment as ReactFragment, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

import { QuoteSummary } from '@/components/booking/booking-summary';
import { Button, EmptyState, Screen, ui } from '@/components/ui/screen';
import { useBookingsStore } from '@/store/useBookingsStore';
import { isQuoteExpired } from '@/utils/booking';

export default function CompareQuotesScreen() {
  const { id, bookingId } = useLocalSearchParams<{ id: string; bookingId?: string }>();
  const bookings = useBookingsStore(state => state.bookings);
  const acceptQuote = useBookingsStore(state => state.acceptQuote);
  const [error, setError] = useState('');
  const quotes = bookings.filter(booking => booking.catererId === id
    && (!bookingId || booking.id === bookingId) && !!booking.quote
    && ['quoted', 'awaiting_deposit'].includes(booking.status));
  return <Screen title="Review quotes" subtitle="Live replies to your booking requests" back="/(tabs)/bookings">
    <Text style={ui.body}>Only quotes actually sent by a caterer appear here. Review the menu, extras and deposit before accepting.</Text>
    {quotes.map(booking => booking.quote && <ReactFragment key={booking.id}>
      <Text style={ui.title}>{booking.eventType} · {booking.guests} guests · {booking.date}</Text>
      <QuoteSummary quote={booking.quote} guests={booking.guests} />
      <Button label={booking.status === 'awaiting_deposit' ? 'Continue to deposit' : 'Accept quote'}
        disabled={isQuoteExpired(booking.quote)}
        onPress={() => {
          if (booking.status !== 'awaiting_deposit' && !acceptQuote(booking.id)) {
            setError('This quote has changed or expired. Please review it again.'); return;
          }
          router.push({ pathname: '/caterer/[id]/book', params: { id: booking.catererId, bookingId: booking.id } });
        }} />
    </ReactFragment>)}
    {!!error && <Text style={ui.error}>{error}</Text>}
    {!quotes.length && <EmptyState title="No quotes yet" description="The caterer needs to send a quote for this request." />}
  </Screen>;
}
