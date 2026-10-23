import { Screen } from '@/components/ui/screen';
import { VendorWallet } from '@/components/vendor/vendor-wallet';

export default function VendorWalletScreen() {
  return <Screen title="Wallet" subtitle="Deposits and payouts · USD"><VendorWallet /></Screen>;
}
