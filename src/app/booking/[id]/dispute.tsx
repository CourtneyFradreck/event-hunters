import { useState } from 'react';
import {  Pressable, StyleSheet, Text, TextInput, View, ScrollView , Platform } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';

import { EHColors } from '@/constants/colors';

export default function DisputeScreen() {
  const insets = useSafeAreaInsets();
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    // In a real app, this would submit the dispute and freeze escrow
    router.push('/(tabs)/bookings');
  };

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]}>
      <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={20} color={EHColors.ink} />
          </Pressable>
          <Text style={styles.headerTitle}>Open Dispute</Text>
          <View style={{ width: 40 }} />
        </View>
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
