import Feather from '@expo/vector-icons/Feather';
import { Text, View } from 'react-native';

import { ui } from '@/components/ui/screen';
import { EHColors } from '@/constants/colors';
import { DashboardCard } from './dashboard-card';

const DOCUMENTS = [
  { name: 'Health & Safety Certificate', status: 'Verified', expiry: 'Expires 14 Nov 2027' },
  { name: 'Business License', status: 'Verified', expiry: 'Expires 01 Jan 2028' },
  { name: 'Public Liability Insurance', status: 'Renewal needed', expiry: 'Sample document expires in 12 days' },
];

export function ComplianceSummary() {
  return <View style={ui.stack}>
    <Text style={ui.title}>Compliance Vault</Text>
    <Text style={ui.body}>Business verified · insurance renewal pending. These are sample statuses; no documents have been uploaded or checked.</Text>
    {DOCUMENTS.map(document => <DashboardCard key={document.name}><View style={ui.row}>
      <Feather name="file-text" size={22} color={EHColors.navy} />
      <View style={ui.grow}><Text style={ui.label}>{document.name}</Text>
        <Text style={document.status === 'Verified' ? ui.success : ui.muted}>{document.status} · {document.expiry}</Text>
      </View>
    </View></DashboardCard>)}
  </View>;
}
