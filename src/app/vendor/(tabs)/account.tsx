import { router } from 'expo-router';
import { Text } from 'react-native';

import { Button, Screen, ui } from '@/components/ui/screen';
import { DashboardCard } from '@/components/vendor/dashboard-card';
import { ComplianceSummary } from '@/components/vendor/compliance-summary';
import { RoleSwitch } from '@/components/ui/role-switch';
import { useAuth } from '@/context/AuthContext';
import { useBookingsStore } from '@/store/useBookingsStore';

export default function VendorAccountScreen() {
  const profile = useBookingsStore(state => state.vendorProfile);
  const { logout } = useAuth();
  return <Screen title="Account" subtitle="Your catering business">
    <DashboardCard><Text style={ui.title}>{profile.name}</Text>
      <Text style={ui.body}>{profile.email}</Text><Text style={ui.body}>{profile.suburb}, Harare</Text>
      <Text style={ui.success}>{profile.verified ? 'Verified business (demo)' : 'Verification pending (demo)'}</Text>
    </DashboardCard>
    <Button label="Edit business details" variant="secondary" onPress={() => router.push('/vendor/profile/edit')} />
    <ComplianceSummary />
    <RoleSwitch />
    <Button label="Compliance Vault" variant="secondary" onPress={() => router.push('/account/compliance')} />
    <Button label="Log Out" variant="danger" onPress={logout} />
  </Screen>;
}
