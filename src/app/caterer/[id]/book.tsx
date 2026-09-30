import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, Platform } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';

import { EHColors } from '@/constants/colors';
import { CATERERS } from '@/constants/data';
import { EscrowIcon } from '@/components/ui/escrow-icon';
import { logger } from '@/utils/logger';

export default function BookingConfirmScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const caterer = CATERERS.find((c) => c.id === id) || CATERERS[0];

  const [paymentMethod, setPaymentMethod] = useState<'ecocash' | 'card'>('ecocash');

  const guests = 220;
  const headPrice = 16.5; 
  const pct = 0.3; 
  const totalRaw = guests * headPrice;
  const depositRaw = totalRaw * pct;
  const balanceRaw = totalRaw - depositRaw;

  const fmt = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;
  const total = fmt(totalRaw);
  const deposit = fmt(depositRaw);
  const balance = fmt(balanceRaw);

  const summaryRows = [
    { k: 'Caterer', v: caterer.name },
    { k: 'Event', v: 'Wedding' },
    { k: 'Date', v: 'Sat 14 Dec 2026' },
    { k: 'Guests', v: '220 plates' },
    { k: 'Venue', v: 'Borrowdale' },
    { k: 'Service', v: 'Full-service' },
  ];

  const handlePay = () => {
    logger.debug('Paid deposit via', paymentMethod);
    router.replace('/(tabs)/bookings' as any);
  };

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={20} color={EHColors.ink} />
          </Pressable>
          <Text style={styles.headerTitle}>Confirm Booking</Text>
          <View style={{ width: 40 }} />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: insets.bottom + 120, paddingHorizontal: 20, paddingTop: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Booking Details</Text>
        <View style={styles.summaryCard}>
          {summaryRows.map((row, i) => (
            <View key={i} style={[styles.summaryRow, i !== summaryRows.length - 1 && styles.summaryBorder]}>
              <Text style={styles.summaryKey}>{row.k}</Text>
              <Text style={styles.summaryVal}>{row.v}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Payment Schedule</Text>
        <View style={styles.paymentScheduleCard}>
          <View style={styles.scheduleRow}>
            <View>
              <Text style={styles.scheduleLabel}>Total Cost</Text>
              <Text style={styles.scheduleSub}>({guests} guests × ${headPrice.toFixed(2)})</Text>
            </View>
            <Text style={styles.scheduleVal}>{total}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.scheduleRow}>
            <View>
              <Text style={styles.scheduleLabel}>Deposit Due Now</Text>
              <Text style={styles.scheduleSub}>(30% to secure booking)</Text>
            </View>
            <Text style={[styles.scheduleVal, { color: EHColors.copper, fontSize: 18 }]}>{deposit}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.scheduleRow}>
            <View>
              <Text style={styles.scheduleLabel}>Balance Due</Text>
              <Text style={styles.scheduleSub}>(By 07 Dec 2026)</Text>
            </View>
            <Text style={styles.scheduleVal}>{balance}</Text>
          </View>
        </View>

        <View style={styles.escrowBanner}>
          <Feather name="shield" size={24} color={EHColors.green} />
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={styles.escrowTitle}>Deposit goes to Escrow</Text>
            <Text style={styles.escrowDesc}>
              EventHunters holds your {deposit} deposit. The caterer only receives it 48h after the event finishes successfully.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.methodsContainer}>
          <Pressable 
            style={[styles.methodCard, paymentMethod === 'ecocash' && styles.methodCardActive]}
            onPress={() => setPaymentMethod('ecocash')}
          >
            <Feather name="smartphone" size={24} color={paymentMethod === 'ecocash' ? EHColors.copper : EHColors.inkSecondary} />
            <View style={styles.methodInfo}>
              <Text style={[styles.methodTitle, paymentMethod === 'ecocash' && styles.methodTitleActive]}>EcoCash</Text>
              <Text style={styles.methodSub}>Pay via mobile money</Text>
            </View>
            <View style={[styles.radio, paymentMethod === 'ecocash' && styles.radioActive]}>
              {paymentMethod === 'ecocash' && <View style={styles.radioInner} />}
            </View>
          </Pressable>

          <Pressable 
            style={[styles.methodCard, paymentMethod === 'card' && styles.methodCardActive]}
            onPress={() => setPaymentMethod('card')}
          >
            <Feather name="credit-card" size={24} color={paymentMethod === 'card' ? EHColors.copper : EHColors.inkSecondary} />
            <View style={styles.methodInfo}>
              <Text style={[styles.methodTitle, paymentMethod === 'card' && styles.methodTitleActive]}>Card</Text>
              <Text style={styles.methodSub}>Visa or Mastercard</Text>
            </View>
            <View style={[styles.radio, paymentMethod === 'card' && styles.radioActive]}>
              {paymentMethod === 'card' && <View style={styles.radioInner} />}
            </View>
          </Pressable>
        </View>

      </ScrollView>

      {/* BOTTOM ACTION BAR */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || 24 }]}>
        <View style={styles.bottomBarContent}>
          <View style={styles.priceCol}>
            <Text style={styles.priceValue}>{deposit}</Text>
            <Text style={styles.priceLabel}>Total to pay now</Text>
          </View>
          <Pressable style={styles.payBtn} onPress={handlePay}>
            <Feather name="lock" size={16} color={EHColors.white} />
            <Text style={styles.payBtnText}>Pay Securely</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: EHColors.pageBg },
  
  headerContainer: {
    backgroundColor: EHColors.white,
    borderBottomWidth: 1, borderBottomColor: EHColors.navyBorderLight,
    paddingBottom: 12,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8 },
      android: { elevation: 4 }
    }),
    zIndex: 10,
  },
  headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: EHColors.pageBg, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: EHColors.ink },

  scroll: { flex: 1 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: EHColors.ink, marginBottom: 16, marginTop: 8 },
  
  summaryCard: { backgroundColor: EHColors.white, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: EHColors.navyBorderLight, marginBottom: 24 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  summaryBorder: { borderBottomWidth: 1, borderBottomColor: EHColors.navyBorderLight },
  summaryKey: { fontSize: 14, color: EHColors.inkSecondary, fontWeight: '500' },
  summaryVal: { fontSize: 14, color: EHColors.ink, fontWeight: '600' },

  paymentScheduleCard: { backgroundColor: EHColors.white, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: EHColors.navyBorderLight, marginBottom: 24 },
  scheduleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  divider: { height: 1, backgroundColor: EHColors.navyBorderLight },
  scheduleLabel: { fontSize: 15, fontWeight: '700', color: EHColors.ink, marginBottom: 2 },
  scheduleSub: { fontSize: 13, color: EHColors.inkSecondary },
  scheduleVal: { fontSize: 16, fontWeight: '700', color: EHColors.ink },

  escrowBanner: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: EHColors.greenBg, padding: 20, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(46,125,91,0.2)', marginBottom: 32 },
  escrowTitle: { fontSize: 15, fontWeight: '700', color: EHColors.green, marginBottom: 4 },
  escrowDesc: { fontSize: 13, color: EHColors.green, lineHeight: 18 },

  methodsContainer: { gap: 12 },
  methodCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: EHColors.white, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: EHColors.navyBorderLight },
  methodCardActive: { borderColor: EHColors.copper, backgroundColor: EHColors.copperBg },
  methodInfo: { flex: 1, marginLeft: 16 },
  methodTitle: { fontSize: 16, fontWeight: '600', color: EHColors.ink, marginBottom: 4 },
  methodTitleActive: { color: EHColors.copperDark },
  methodSub: { fontSize: 13, color: EHColors.inkSecondary },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: EHColors.navyBorderLight, alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: EHColors.copper },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: EHColors.copper },

  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: EHColors.white, borderTopWidth: 1, borderTopColor: EHColors.navyBorderLight,
    paddingHorizontal: 20, paddingTop: 16,
    ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.05, shadowRadius: 12 }, android: { elevation: 12 } }),
  },
  bottomBarContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  priceCol: { flex: 1 },
  priceValue: { fontSize: 24, fontWeight: '800', color: EHColors.ink, marginBottom: 2 },
  priceLabel: { fontSize: 13, color: EHColors.inkSecondary, fontWeight: '500' },
  payBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: EHColors.copper, paddingHorizontal: 24, paddingVertical: 16, borderRadius: 16 },
  payBtnText: { fontSize: 16, fontWeight: '700', color: EHColors.white },
});
