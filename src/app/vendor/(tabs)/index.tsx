import { Screen } from '@/components/ui/screen';
import { VendorRequests } from '@/components/vendor/vendor-requests';
import { useBookingsStore } from '@/store/useBookingsStore';

export default function VendorRequestsScreen() {
  const profile = useBookingsStore(state => state.vendorProfile);
  return <Screen title="Requests" subtitle={profile.name}><VendorRequests /></Screen>;
}
