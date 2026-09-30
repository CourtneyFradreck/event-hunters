import { useState } from 'react';
import {  Pressable, StyleSheet, Text, View , Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';

import { EHColors } from '@/constants/colors';
import { CATERERS } from '@/constants/data';

export default function RateScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const caterer = CATERERS.find(c => c.id === id) || CATERERS[0];
  const [rating, setRating] = useState(0);

  const handleDone = () => {
    // Escrow released, caterer rated, return home
    router.push('/(tabs)/bookings');
  };

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]}>
      <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={20} color={EHColors.ink} />
          </Pressable>
          <Text style={styles.headerTitle}>Rate Caterer</Text>
          <View style={{ width: 40 }} />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.successBox}>
          <View style={styles.iconCircle}>
            <Feather name="check" size={24} color={EHColors.green} />
          </View>
          <Text style={styles.successTitle}>Escrow released!</Text>
          <Text style={styles.successMessage}>
            Paid out to their EcoCash wallet. Balance settled directly with the caterer.
          </Text>
        </View>

        <Text style={styles.title}>Rate {caterer.name}</Text>
        <Text style={styles.subtitle}>Your rating is what keeps the next organiser safe.</Text>

        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Pressable key={star} onPress={() => setRating(star)}>
              <Feather 
                name="star" 
                size={40} 
                color={star <= rating ? EHColors.copper : EHColors.navyBorderLight} 
                style={styles.star}
              />
            </Pressable>
          ))}
        </View>

        <Pressable 
          style={[styles.btnPrimary, rating === 0 && styles.btnDisabled]} 
          onPress={handleDone}
          disabled={rating === 0}
        >
          <Text style={styles.btnPrimaryText}>Done</Text>
        </Pressable>
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
  
  
  
  content: { padding: 24, flex: 1, alignItems: 'center' },
  successBox: {
    backgroundColor: EHColors.greenBg,
    borderRadius: 16, padding: 24,
    alignItems: 'center',
    marginBottom: 48, width: '100%'
  },
  iconCircle: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'rgba(46, 125, 91, 0.1)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
  },
  successTitle: { fontSize: 18, fontWeight: '700', color: EHColors.green, marginBottom: 8 },
  successMessage: { fontSize: 14, color: EHColors.green, textAlign: 'center', lineHeight: 20 },
  title: { fontSize: 22, fontWeight: '700', color: EHColors.ink, marginBottom: 8 },
  subtitle: { fontSize: 14, color: EHColors.inkSecondary, marginBottom: 32, textAlign: 'center' },
  stars: { flexDirection: 'row', gap: 12, marginBottom: 48 },
  star: { marginHorizontal: 4 },
  btnPrimary: {
    backgroundColor: EHColors.navy,
    alignItems: 'center', paddingVertical: 14, borderRadius: 12, width: '100%'
  },
  btnDisabled: { opacity: 0.5 },
  btnPrimaryText: { color: EHColors.white, fontSize: 16, fontWeight: '600' },
});
