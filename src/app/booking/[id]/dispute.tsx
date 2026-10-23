import { useState } from 'react';
import { router } from 'expo-router';
import { Text } from 'react-native';

import { Button, EmptyState, Field, Screen, ui } from '@/components/ui/screen';
import { useBooking } from '@/hooks/use-booking';
import { useAuth } from '@/context/AuthContext';
import { useBookingsStore } from '@/store/useBookingsStore';

export default function DisputeScreen() {
  const booking = useBooking();
  const { role } = useAuth();
  const openDispute = useBookingsStore(state => state.openDispute);
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  return <Screen title="Open Dispute" back="/(tabs)/bookings">
    {booking && role === 'organiser' ? <>
      <Text style={ui.title}>Deposit stays locked</Text>
      <Text style={ui.body}>Describe the issue with {booking.catererName}. Opening a dispute freezes this booking&apos;s deposit in the demo. No real mediation or refund is performed.</Text>
      <Field label="What went wrong?" multiline value={reason} onChangeText={setReason} />
      {!!error && <Text style={ui.error}>{error}</Text>}
      <Button label="Submit for mediation" variant="copper"
        disabled={!reason.trim() || !['deposit_paid', 'delivered'].includes(booking.status)}
        onPress={() => {
          if (!openDispute(booking.id, reason)) { setError('This booking can no longer be disputed.'); return; }
          router.replace({ pathname: '/booking/[id]/tracker', params: { id: booking.id } });
        }} />
    </> : <EmptyState title="Booking not found" />}
  </Screen>;
}
