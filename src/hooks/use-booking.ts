import { useLocalSearchParams } from 'expo-router';

import { useBookingsStore } from '@/store/useBookingsStore';

/** Booking routes use booking IDs. Caterer routes pass that ID explicitly in the query. */
export function useBooking() {
  const { id, bookingId } = useLocalSearchParams<{ id: string; bookingId?: string }>();
  return useBookingsStore(state => state.bookings.find(booking => booking.id === (bookingId ?? id)));
}
