import { Screen } from '@/components/ui/screen';
import { VendorWallet } from '@/components/vendor/vendor-wallet';
import { useAuth } from '@/context/AuthContext';

export default function WalletScreen() {
  const { role } = useAuth();
  return <Screen title="Escrow Wallet" back={role === 'caterer' ? '/vendor/wallet' : '/(tabs)/account'}>
    <VendorWallet />
  </Screen>;
}
