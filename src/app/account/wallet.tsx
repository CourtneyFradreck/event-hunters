import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EHColors } from '@/constants/colors';

export default function WalletScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      {/* HEADER */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={20} color={EHColors.ink} />
          </Pressable>
          <Text style={styles.headerTitle}>Escrow Wallet</Text>
          <View style={{ width: 40 }} />
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={{ padding: 20 }}>
        <View style={styles.walletCard}>
          <View style={styles.walletHeader}>
            <Text style={styles.walletLabel}>Available Balance</Text>
            <Feather name="info" size={16} color={EHColors.inkSecondary} />
          </View>
          <Text style={styles.walletBalance}>$4,250.00</Text>
          
          <View style={styles.walletActions}>
            <Pressable style={styles.withdrawBtn}>
              <Text style={styles.withdrawBtnText}>Withdraw Funds</Text>
            </Pressable>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <View style={styles.txnList}>
          {[
            { id: 1, title: 'Wedding Deposit', amount: '+$1,089.00', date: 'Today', status: 'Cleared' },
            { id: 2, title: 'Withdrawal to Bank', amount: '-$2,500.00', date: 'Yesterday', status: 'Completed' },
            { id: 3, title: 'Kitchen Party Deposit', amount: '+$320.00', date: '12 Nov', status: 'Cleared' },
          ].map(txn => (
            <View key={txn.id} style={styles.txnItem}>
              <View style={[styles.txnIconBox, { backgroundColor: txn.amount.startsWith('+') ? EHColors.greenBg : '#F0F4F8' }]}>
                <Feather name={txn.amount.startsWith('+') ? 'arrow-down-left' : 'arrow-up-right'} size={16} color={txn.amount.startsWith('+') ? EHColors.green : EHColors.navy} />
              </View>
              <View style={styles.txnInfo}>
                <Text style={styles.txnTitle}>{txn.title}</Text>
                <Text style={styles.txnDate}>{txn.date} • {txn.status}</Text>
              </View>
              <Text style={[styles.txnAmount, { color: txn.amount.startsWith('+') ? EHColors.green : EHColors.ink }]}>
                {txn.amount}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: EHColors.pageBg },
  header: { backgroundColor: EHColors.white, borderBottomWidth: 1, borderBottomColor: EHColors.navyBorderLight },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: EHColors.pageBg },
  headerTitle: { fontSize: 18, fontWeight: '700', color: EHColors.ink },
  scroll: { flex: 1 },
  
  walletCard: {
    backgroundColor: EHColors.navy, borderRadius: 24, padding: 24, marginBottom: 32,
    shadowColor: EHColors.navyShadow, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.2, shadowRadius: 24, elevation: 8,
  },
  walletHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  walletLabel: { fontSize: 14, color: 'rgba(255,255,255,0.7)' },
  walletBalance: { fontSize: 36, fontWeight: '800', color: EHColors.white, marginBottom: 24, letterSpacing: -1 },
  walletActions: { flexDirection: 'row' },
  withdrawBtn: { backgroundColor: EHColors.copper, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 16 },
  withdrawBtnText: { color: EHColors.white, fontWeight: '700', fontSize: 15 },

  sectionTitle: { fontSize: 18, fontWeight: '700', color: EHColors.ink, marginBottom: 16 },
  txnList: { backgroundColor: EHColors.white, borderRadius: 20, padding: 16, borderWidth: 1, borderColor: EHColors.navyBorderLight },
  txnItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: EHColors.navyBorderLight },
  txnIconBox: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  txnInfo: { flex: 1 },
  txnTitle: { fontSize: 15, fontWeight: '600', color: EHColors.ink, marginBottom: 4 },
  txnDate: { fontSize: 13, color: EHColors.inkSecondary },
  txnAmount: { fontSize: 16, fontWeight: '700' },
});
