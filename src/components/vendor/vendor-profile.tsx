import { router } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Button, SummaryRow, ui } from '@/components/ui/screen';
import { EHColors } from '@/constants/colors';
import { useBookingsStore } from '@/store/useBookingsStore';
import { formatUSD } from '@/utils/money';
import { DashboardCard } from './dashboard-card';

export function VendorProfile() {
  const profile = useBookingsStore(state => state.vendorProfile);
  return <View style={ui.stack}>
    <DashboardCard><View style={ui.stack}>
      <Text style={ui.title}>{profile.name}</Text>
      <SummaryRow label="Location" value={profile.suburb} />
      <SummaryRow label="Service" value={profile.service} />
      <SummaryRow label="Cuisine" value={profile.cuisineTags.join(' · ')} />
      <Text style={ui.body}>{profile.bio || 'Add a bio to introduce your business.'}</Text>
      <Text style={ui.muted}>Changes are shared with the organiser&apos;s caterer profile during this demo.</Text>
    </View></DashboardCard>
    <Button label="Edit profile & menu" variant="copper" onPress={() => router.push('/vendor/profile/edit')} />
    <Text style={ui.title}>Packages ({profile.packages.length})</Text>
    {profile.packages.map(pkg => <DashboardCard key={pkg.id}>
      <Text style={ui.title}>{pkg.name}</Text>
      <Text style={ui.success}>{formatUSD(pkg.pricePerHead)} per head</Text>
      <Text style={ui.body}>{pkg.dishes}</Text>
    </DashboardCard>)}
    {!profile.packages.length && <Text style={ui.muted}>No packages yet. You can still build a custom quote.</Text>}
    <Text style={ui.title}>Gallery</Text>
    <View style={styles.gallery}>{profile.gallery.map((url, index) =>
      <Image key={`${url}-${index}`} source={{ uri: url }} accessibilityLabel={`Gallery image ${index + 1}`} style={styles.image} />)}
    </View>
    {!profile.gallery.length && <Text style={ui.muted}>No gallery images yet.</Text>}
  </View>;
}

const styles = StyleSheet.create({
  gallery: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  image: { width: 144, height: 108, borderRadius: 14, backgroundColor: EHColors.sandBg },
});
