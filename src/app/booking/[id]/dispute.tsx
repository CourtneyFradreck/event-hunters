import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';

import { EHColors } from '@/constants/colors';

export default function DisputeScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    // In a real app, this would submit the dispute and freeze escrow
    router.push('/(tabs)/bookings');
  };

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={18} color={EHColors.white} />
        </Pressable>
        <Text style={styles.headerTitle}>Raise an issue</Text>
      </View>

      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.infoBox}>
          <Feather name="lock" size={20} color={EHColors.red} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Deposit stays locked</Text>
            <Text style={styles.infoBody}>
              Raising an issue freezes the release. An EventHunters mediator reviews within 48 hours and can refund you in full or in part.
            </Text>
          </View>
        </View>

        <Text style={styles.label}>What went wrong?</Text>
        <TextInput
          style={styles.input}
          placeholder="E.g. Caterer arrived 2 hours late and the food was cold..."
          placeholderTextColor={EHColors.inkPlaceholder}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          value={reason}
          onChangeText={setReason}
        />

        <Pressable 
          style={[styles.btnPrimary, !reason.trim() && styles.btnDisabled]} 
          onPress={handleSubmit}
          disabled={!reason.trim()}
        >
          <Text style={styles.btnPrimaryText}>Submit for mediation</Text>
        </Pressable>
      </ScrollView>
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
  infoBox: {
    backgroundColor: EHColors.redBg,
    borderRadius: 12, padding: 16,
    flexDirection: 'row', alignItems: 'flex-start',
    borderWidth: 1, borderColor: EHColors.redBorder,
    marginBottom: 24,
  },
  infoTextContainer: { flex: 1, marginLeft: 12 },
  infoTitle: { fontSize: 15, fontWeight: '700', color: EHColors.red, marginBottom: 4 },
  infoBody: { fontSize: 13, color: EHColors.red, lineHeight: 18 },
  label: { fontSize: 16, fontWeight: '600', color: EHColors.ink, marginBottom: 12 },
  input: {
    backgroundColor: EHColors.white,
    borderWidth: 1, borderColor: EHColors.navyBorderLight,
    borderRadius: 12, padding: 16,
    fontSize: 15, color: EHColors.ink,
    minHeight: 120, marginBottom: 24,
  },
  btnPrimary: {
    backgroundColor: EHColors.navy,
    alignItems: 'center', paddingVertical: 14, borderRadius: 12,
  },
  btnDisabled: { opacity: 0.5 },
  btnPrimaryText: { color: EHColors.white, fontSize: 16, fontWeight: '600' },
});
