import { Screen } from '@/components/ui/screen';
import { VendorProfile } from '@/components/vendor/vendor-profile';
import { useCaterers } from '@/hooks/use-caterers';

export default function VendorMenuScreen() {
  const caterers = useCaterers();
  return <Screen title="Menu & profile"><VendorProfile profile={caterers[0]} /></Screen>;
}
