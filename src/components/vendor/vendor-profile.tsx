import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { EHColors } from '@/constants/colors';
import type { Caterer } from '@/constants/data';

import { DashboardCard } from './dashboard-card';

export function VendorProfile({ profile }: { profile: Caterer }) {
  return (
    <DashboardCard>
      <View style={styles.profileHeader}>
        <Text style={styles.sectionTitle}>Profile Settings</Text>
        <Feather name="edit-2" size={18} color={EHColors.copper} />
      </View>
      <Text style={styles.profileText}>Service: {profile.service}</Text>
      <Text style={styles.profileText}>Cuisine: {profile.cuisine}</Text>
      <Text style={styles.profileText}>Location: {profile.suburb}</Text>

      <View style={styles.divider} />
      <Text style={styles.sectionTitle}>Packages ({profile.packages?.length ?? 0})</Text>
      {profile.packages?.map(pkg => (
        <View key={pkg.name} style={styles.packageItem}>
          <View style={styles.packageHeader}>
            <Text style={styles.packageName}>{pkg.name}</Text>
            <Text style={styles.packagePrice}>{pkg.price}</Text>
          </View>
          <Text style={styles.packageDishes}>{pkg.dishes}</Text>
        </View>
      ))}

      <View style={styles.divider} />
      <Text style={styles.sectionTitle}>Compliance Vault</Text>
      <Text style={styles.profileText}>Your Verified badge depends on these staying current.</Text>
      <View style={styles.packageItem}>
        <View style={styles.packageHeader}>
          <Text style={styles.packageName}>Health &amp; Safety Cert</Text>
          <Text style={styles.packagePrice}>Valid</Text>
        </View>
        <Text style={styles.packageDishes}>Expires 14 Nov 2027</Text>
      </View>
      <Pressable style={styles.renewBtn} onPress={() => router.push('/account/compliance')}>
        <Text style={styles.renewBtnText}>Renew Documents</Text>
      </Pressable>
    </DashboardCard>
  );
}

const styles = StyleSheet.create({
  profileHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: EHColors.ink, marginBottom: 8 },
  profileText: { fontSize: 14, color: EHColors.inkSecondary, marginBottom: 6 },
  divider: { height: 1, backgroundColor: EHColors.navyBorder, marginVertical: 16 },
  packageItem: { marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: EHColors.navyBorderLight },
  packageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  packageName: { fontSize: 14, fontWeight: '600', color: EHColors.ink },
  packagePrice: { fontSize: 14, fontWeight: '600', color: EHColors.copperDark },
  packageDishes: { fontSize: 13, color: EHColors.inkMuted, lineHeight: 18 },
  renewBtn: { backgroundColor: EHColors.sandDark, paddingVertical: 10, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  renewBtnText: { color: EHColors.ink, fontSize: 14, fontWeight: '600' },
});
