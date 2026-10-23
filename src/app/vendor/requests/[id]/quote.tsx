import { EmptyState, Screen } from '@/components/ui/screen';
import { QuoteBuilder } from '@/components/vendor/quote-builder';
import { useBooking } from '@/hooks/use-booking';
import { useBookingsStore } from '@/store/useBookingsStore';

export default function BuildQuoteScreen() {
  const booking = useBooking();
  const profile = useBookingsStore(state => state.vendorProfile);
  if (!booking || booking.catererId !== profile.id || !['requested', 'quoted', 'awaiting_deposit'].includes(booking.status)) {
    return <Screen title="Build quote" back="/vendor"><EmptyState title="This request cannot be quoted" description="Check the booking status in Bookings." /></Screen>;
  }
  return <QuoteBuilder key={booking.id} booking={booking} />;
}
