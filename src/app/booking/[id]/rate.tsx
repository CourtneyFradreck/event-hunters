import { useState } from 'react';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { Button, EmptyState, Screen, ui } from '@/components/ui/screen';
import { Chip } from '@/components/ui/chip';
import { useBooking } from '@/hooks/use-booking';
import { useBookingsStore } from '@/store/useBookingsStore';
import { useAuth } from '@/context/AuthContext';
import { formatUSD } from '@/utils/money';

export default function RateScreen() {
  const booking = useBooking();
  const { role } = useAuth();
  const [rating, setRating] = useState(booking?.rating ?? 0);
  const rateBooking = useBookingsStore(state => state.rateBooking);
  return <Screen title="Rate Caterer" back="/(tabs)/bookings">
    {booking?.status === 'completed' && role === 'organiser' ? <>
      <Text style={ui.title}>Escrow released!</Text>
      <Text style={ui.success}>{formatUSD(booking.quote?.deposit ?? 0)} is now available in the caterer&apos;s demo wallet.</Text>
      <Text style={ui.body}>Rate {booking.catererName}. This rating stays in memory for this demo.</Text>
      <View style={ui.row}>{[1, 2, 3, 4, 5].map(star =>
        <Chip key={star} label={`${star} ★`} selected={rating === star} onPress={() => setRating(star)} />)}</View>
      <Button label="Done" disabled={!rating} onPress={() => {
        if (rateBooking(booking.id, rating)) router.replace('/(tabs)/bookings');
      }} />
      <Button label="Skip rating" variant="secondary" onPress={() => router.replace('/(tabs)/bookings')} />
    </> : <EmptyState title="Confirm delivery before rating" />}
  </Screen>;
}
