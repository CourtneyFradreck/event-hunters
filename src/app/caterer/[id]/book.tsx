import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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

  // Hardcode math based on prototype quote logic for UI
  // Real app would fetch the selected quote
  const guests = 220;
  const headPrice = 16.5; // Zuva default
  const pct = 0.3; // 30% deposit
  const totalRaw = guests * headPrice;
  const depositRaw = totalRaw * pct;
  const balanceRaw = totalRaw - depositRaw;

  const fmt = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;
  const total = fmt(totalRaw);
  const deposit = fmt(depositRaw);
  const balance = fmt(balanceRaw);

  const summaryRows = [
    { k: 'Event', v: 'Wedding' },
    { k: 'Date', v: 'Sat 14 Dec' },
    { k: 'Guests', v: '220 plates' },
    { k: 'Venue', v: 'Borrowdale' },
    { k: 'Service', v: 'Full-service' },
    { k: 'Price per head', v: `$${headPrice.toFixed(2)}` },
  ];

  const handlePay = () => {
    logger.debug('Paid deposit via', paymentMethod);
    router.replace('/(tabs)/bookings' as any); // Route to bookings list/status
  };

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.header, { paddingTop: insets.top || 16 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={18} color={EHColors.navy} />
        </Pressable>
        <Text style={styles.headerTitle}>Confirm booking</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: insets.bottom + 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* SUMMARY CARD */}
        <View style={styles.card}>
          <View style={styles.catererRow}>
            <View style={styles.photoThumb}>
              <Text style={styles.photoThumbText}>IMG</Text>
            </View>
            <View>
              <Text style={styles.catererName}>{caterer.name}</Text>
              <Text style={styles.catererMeta}>
                {caterer.suburb} · ★ {caterer.rating}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {summaryRows.map((r, i) => (
            <View key={i} style={styles.summaryRow}>
              <Text style={styles.summaryKey}>{r.k}</Text>
              <Text style={styles.summaryVal}>{r.v}</Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{total}</Text>
          </View>
          <View style={styles.mathRow}>
            <Text style={styles.mathLabel}>Deposit now</Text>
            <Text style={styles.depositValue}>{deposit}</Text>
          </View>
          <View style={styles.mathRow}>
            <Text style={styles.mathLabel}>Balance after event</Text>
            <Text style={styles.balanceValue}>{balance}</Text>
          </View>
        </View>

        {/* ESCROW CARD */}
        <View style={styles.escrowCard}>
          <View style={styles.escrowHeader}>
            <EscrowIcon size="large" />
            <Text style={styles.escrowTitle}>Escrow protected</Text>
          </View>
          <Text style={styles.escrowBody}>
            Your {deposit} is held securely by EventHunters. It is only released to {caterer.name} 48 hours after your event ends successfully.
          </Text>
        </View>

        {/* PAYMENT METHOD */}
        <Text style={styles.payLabel}>PAY DEPOSIT VIA</Text>
        <View style={styles.payOptionsRow}>
          <Pressable
            onPress={() => setPaymentMethod('ecocash')}
            style={[
              styles.payBtn,
              paymentMethod === 'ecocash' && styles.payBtnActive,
            ]}
          >
            <Text
              style={[
                styles.payBtnText,
                paymentMethod === 'ecocash' && styles.payBtnTextActive,
              ]}
            >
              EcoCash
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setPaymentMethod('card')}
            style={[
              styles.payBtn,
              paymentMethod === 'card' && styles.payBtnActive,
            ]}
          >
            <Text
              style={[
                styles.payBtnText,
                paymentMethod === 'card' && styles.payBtnTextActive,
              ]}
            >
              Visa / Master
            </Text>
          </Pressable>
        </View>

        {/* CTA */}
        <Pressable
          onPress={handlePay}
          style={({ pressed }) => [styles.ctaBtn, pressed && styles.ctaBtnPressed]}
        >
          <Text style={styles.ctaBtnText}>Pay {deposit}</Text>
        </Pressable>
        <Text style={styles.termsText}>By paying you agree to the EventHunters Escrow Terms</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: EHColors.pageBg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingBottom: 12,
    gap: 12,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#F1EDE6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: EHColors.ink,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 18,
  },
  card: {
    backgroundColor: EHColors.white,
    borderWidth: 1,
    borderColor: 'rgba(27,58,92,0.1)',
    borderRadius: 20,
    padding: 16,
  },
  catererRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  photoThumb: {
    width: 62,
    height: 62,
    borderRadius: 14,
    backgroundColor: '#E6DFD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoThumbText: {
    fontSize: 10,
    color: '#6E6353',
    fontWeight: '700',
  },
  catererName: {
    fontSize: 16,
    fontWeight: '600',
    color: EHColors.ink,
  },
  catererMeta: {
    fontSize: 12,
    color: EHColors.inkLabel,
    marginTop: 3,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(27,58,92,0.1)',
    marginVertical: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
  },
  summaryKey: {
    fontSize: 13,
    color: EHColors.inkLabel,
  },
  summaryVal: {
    fontSize: 13,
    fontWeight: '600',
    color: EHColors.ink,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  totalLabel: {
    fontSize: 13,
    color: EHColors.inkLabel,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '700',
    color: EHColors.ink,
  },
  mathRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 5,
  },
  mathLabel: {
    fontSize: 13,
    color: EHColors.inkLabel,
  },
  depositValue: {
    fontSize: 18,
    fontWeight: '700',
    color: EHColors.copper,
  },
  balanceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: EHColors.ink,
  },
  escrowCard: {
    marginTop: 16,
    backgroundColor: EHColors.navy,
    borderRadius: 22,
    padding: 20,
    overflow: 'hidden',
  },
  escrowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  escrowTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: EHColors.white,
  },
  escrowBody: {
    fontSize: 13,
    lineHeight: 20,
    color: '#D8E5F0',
    marginTop: 10,
  },
  payLabel: {
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: '#8B96A3',
    fontWeight: '600',
    marginTop: 24,
  },
  payOptionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  payBtn: {
    flex: 1,
    height: 54,
    borderWidth: 1.5,
    borderColor: 'rgba(27,58,92,0.16)',
    borderRadius: 14,
    backgroundColor: EHColors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payBtnActive: {
    borderColor: EHColors.navy,
    backgroundColor: EHColors.navy,
  },
  payBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: EHColors.inkSecondary,
  },
  payBtnTextActive: {
    color: EHColors.white,
  },
  ctaBtn: {
    height: 54,
    borderRadius: 16,
    backgroundColor: EHColors.copper,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    shadowColor: EHColors.copper,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 26,
    elevation: 8,
  },
  ctaBtnPressed: {
    backgroundColor: EHColors.copperDark,
  },
  ctaBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: EHColors.white,
  },
  termsText: {
    textAlign: 'center',
    fontSize: 11.5,
    color: '#8B96A3',
    marginTop: 12,
  },
});
