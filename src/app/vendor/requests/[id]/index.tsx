import { useState } from 'react';
import { router } from 'expo-router';
import { Text } from 'react-native';

import { BookingSummary, QuoteSummary } from '@/components/booking/booking-summary';
import { ConfirmationSheet } from '@/components/ui/confirmation-sheet';
import { Button, EmptyState, Screen, ui } from '@/components/ui/screen';
import { useBooking } from '@/hooks/use-booking';
import { useBookingsStore } from '@/store/useBookingsStore';

export default function RequestDetailScreen() {
  const booking = useBooking();
  const profile = useBookingsStore(state => state.vendorProfile);
  const declineRequest = useBookingsStore(state => state.declineRequest);
  const [declining, setDeclining] = useState(false);
  const [error, setError] = useState('');
  if (!booking || booking.catererId !== profile.id) return <Screen title="Request" back="/vendor"><EmptyState title="Request not found" /></Screen>;
  const canQuote = ['requested', 'quoted', 'awaiting_deposit'].includes(booking.status);
  return <Screen title="Request detail" subtitle={booking.organiserName} back="/vendor">
    <BookingSummary booking={booking} />
    {booking.quote && <QuoteSummary quote={booking.quote} guests={booking.guests} />}
    {!!error && <Text style={ui.error}>{error}</Text>}
    {canQuote && <Button label={booking.quote ? 'Revise quote' : 'Send quote'} variant="copper"
      onPress={() => router.push({ pathname: '/vendor/requests/[id]/quote', params: { id: booking.id } })} />}
    {booking.status === 'requested' && <Button label="Decline" variant="danger" onPress={() => setDeclining(true)} />}
    <Button label="Open chat" variant="secondary" onPress={() => router.push({ pathname: '/booking/[id]/chat', params: { id: booking.id } })} />
    <ConfirmationSheet visible={declining} title="Decline this request?"
      message="The organiser will see this request as declined. No deposit has been paid."
      confirmLabel="Decline request" onCancel={() => setDeclining(false)} onConfirm={() => {
        setDeclining(false);
        if (!declineRequest(booking.id)) { setError('This request has changed. Please review its status.'); return; }
        router.replace('/vendor');
      }} />
  </Screen>;
}
