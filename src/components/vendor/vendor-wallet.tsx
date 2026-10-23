import { Pressable, StyleSheet, Text, View } from 'react-native';

import { EHColors } from '@/constants/colors';

import { DashboardCard } from './dashboard-card';

export function VendorWallet() {
  return (
    <View style={styles.container}>
      <DashboardCard>
        <Text style={styles.title}>Available Balance</Text>
        <Text style={styles.amount}>$1,940</Text>
        <Text style={styles.subtitle}>Released 12 Dec</Text>
        <Pressable style={styles.actionBtn}>
          <Text style={styles.actionBtnText}>Withdraw to EcoCash</Text>
        </Pressable>
      </DashboardCard>

      <DashboardCard>
        <View style={styles.row}>
          <View>
            <Text style={styles.metaTitle}>Held in escrow</Text>
            <Text style={styles.metaSubtitle}>3 bookings pending</Text>
          </View>
          <Text style={styles.metaAmount}>$4,187</Text>
        </View>
      </DashboardCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  title: { fontSize: 14, color: EHColors.inkSecondary, marginBottom: 4 },
  amount: { fontSize: 36, fontWeight: '700', color: EHColors.ink, marginBottom: 8 },
  subtitle: { fontSize: 13, color: EHColors.green, fontWeight: '600', marginBottom: 24 },
  actionBtn: { backgroundColor: EHColors.navy, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  actionBtnText: { color: EHColors.white, fontSize: 14, fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metaTitle: { fontSize: 15, fontWeight: '600', color: EHColors.ink },
  metaSubtitle: { fontSize: 13, color: EHColors.inkMuted, marginTop: 2 },
  metaAmount: { fontSize: 18, fontWeight: '700', color: EHColors.ink },
});
