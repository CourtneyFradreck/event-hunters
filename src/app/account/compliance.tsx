import { Screen } from '@/components/ui/screen';
import { ComplianceSummary } from '@/components/vendor/compliance-summary';
import { useAuth } from '@/context/AuthContext';

export default function ComplianceScreen() {
  const { role } = useAuth();
  return <Screen title="Compliance Vault" back={role === 'caterer' ? '/vendor/account' : '/(tabs)/account'}>
    <ComplianceSummary />
  </Screen>;
}
