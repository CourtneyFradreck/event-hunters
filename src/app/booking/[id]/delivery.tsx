import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';

import { EHColors } from '@/constants/colors';
import { EscrowIcon } from '@/components/ui/escrow-icon';
import { CATERERS } from '@/constants/data';

export default function ConfirmDeliveryScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  
  // Mock data fetching
  const caterer = CATERERS.find(c => c.id === id) || CATERERS[0];
  const deposit = '$1,089';

  const handleConfirm = () => {
    router.push(`/booking/${id}/rate` as any);
  };

  const handleDispute = () => {
    router.push(`/booking/${id}/dispute` as any);
  };

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={18} color={EHColors.white} />
        </Pressable>
        <Text style={styles.headerTitle}>Event day</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.escrowCard}>
          <View style={styles.escrowHeader}>
            <EscrowIcon size="medium" />
            <View style={styles.escrowTag}>
              <Text style={styles.escrowTagText}>HELD IN ESCROW</Text>
            </View>
          </View>
          <Text style={styles.escrowAmount}>{deposit}</Text>
        </View>

        <Text style={styles.title}>Did everything go as agreed?</Text>
        <Text style={styles.message}>
          <Text style={styles.bold}>{caterer.name}</Text> marked the event as delivered. Confirm and we release the escrow &mdash; or raise a dispute and it stays locked.
        </Text>

        <View style={styles.actions}>
          <Pressable style={styles.btnPrimary} onPress={handleConfirm}>
            <Text style={styles.btnPrimaryText}>Confirm delivery</Text>
            <Feather name="check" size={18} color={EHColors.white} />
          </Pressable>
          
          <Pressable style={styles.btnDanger} onPress={handleDispute}>
            <Text style={styles.btnDangerText}>Raise a dispute</Text>
            <Feather name="alert-triangle" size={18} color={EHColors.red} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: EHColors.pageBg },
  header: {
    backgroundColor: EHColors.navy,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingBottom: 16,
  },
  backBtn: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center', justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: { fontSize: 16, fontWeight: '600', color: EHColors.white },
  content: { padding: 24, flex: 1 },
  escrowCard: {
    backgroundColor: EHColors.white,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: EHColors.copperBorderLight,
    marginBottom: 32,
  },
  escrowHeader: { alignItems: 'center', marginBottom: 12 },
  escrowTag: {
    backgroundColor: EHColors.copperBg,
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6,
    marginTop: 8,
  },
  escrowTagText: { color: EHColors.copperDark, fontSize: 11, fontWeight: '700' },
  escrowAmount: { fontSize: 32, fontWeight: '700', color: EHColors.ink },
  title: { fontSize: 24, fontWeight: '600', color: EHColors.ink, marginBottom: 12, textAlign: 'center' },
  message: { fontSize: 15, color: EHColors.inkSecondary, lineHeight: 22, textAlign: 'center', marginBottom: 40 },
  bold: { fontWeight: '600', color: EHColors.ink },
  actions: { gap: 12 },
  btnPrimary: {
    backgroundColor: EHColors.green,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 14, borderRadius: 12, gap: 8,
  },
  btnPrimaryText: { color: EHColors.white, fontSize: 16, fontWeight: '600' },
  btnDanger: {
    backgroundColor: EHColors.redBg,
    borderWidth: 1, borderColor: EHColors.redBorder,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 14, borderRadius: 12, gap: 8,
  },
  btnDangerText: { color: EHColors.red, fontSize: 16, fontWeight: '600' },
});
