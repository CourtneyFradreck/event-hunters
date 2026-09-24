import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';

import { EHColors } from '@/constants/colors';
import { CATERERS } from '@/constants/data';

export default function QuoteSentScreen() {
  const { id } = useLocalSearchParams();
  const mainCaterer = CATERERS.find((c) => c.id === id) || CATERERS[0];
  const insets = useSafeAreaInsets();

  // Mock list of caterers the quote was sent to (primary + 3 random/popular)
  const pendingList = [
    mainCaterer,
    CATERERS.find((c) => c.id === 'table') || CATERERS[1],
    CATERERS.find((c) => c.id === 'belv') || CATERERS[2],
    CATERERS.find((c) => c.id === 'chikafu') || CATERERS[3],
  ];

  const handleSeeQuotes = () => {
    router.push(`/caterer/${id}/compare` as any);
  };

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom || 28 }]}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.content}>
        <View style={styles.iconBox}>
          <Feather name="check" size={30} color={EHColors.green} />
        </View>

        <Text style={styles.title}>Sent to 4 caterers</Text>
        <Text style={styles.description}>
          Quotes usually arrive within 24 hours. We&apos;ll notify you as each one lands — compare them side by side before you commit a cent.
        </Text>

        <View style={styles.list}>
          {pendingList.map((c, idx) => (
            <View key={idx} style={styles.card}>
              <View>
                <Text style={styles.cardName}>{c.name}</Text>
                <Text style={styles.cardSuburb}>{c.suburb}</Text>
              </View>
              <Text style={styles.pendingText}>PENDING</Text>
            </View>
          ))}
        </View>
      </View>

      <Pressable
        onPress={handleSeeQuotes}
        style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
      >
        <Text style={styles.btnText}>See the 4 quotes</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: EHColors.pageBg,
    paddingHorizontal: 24,
    paddingTop: 96,
  },
  content: {
    flex: 1,
  },
  iconBox: {
    width: 66,
    height: 66,
    borderRadius: 22,
    backgroundColor: EHColors.greenBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: EHColors.ink,
    letterSpacing: -0.6,
    marginTop: 20,
    lineHeight: 30,
  },
  description: {
    fontSize: 14,
    color: EHColors.inkMuted,
    lineHeight: 22,
    marginTop: 10,
  },
  list: {
    marginTop: 24,
    gap: 9,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: EHColors.white,
    borderWidth: 1,
    borderColor: 'rgba(27,58,92,0.1)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  cardName: {
    fontSize: 13.5,
    fontWeight: '600',
    color: EHColors.ink,
  },
  cardSuburb: {
    fontSize: 11.5,
    color: EHColors.inkSubtle,
    marginTop: 2,
  },
  pendingText: {
    fontSize: 9.5,
    letterSpacing: 1,
    color: EHColors.copper,
    fontWeight: '700',
  },
  btn: {
    height: 54,
    borderRadius: 16,
    backgroundColor: EHColors.copper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPressed: {
    backgroundColor: EHColors.copperDark,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: EHColors.white,
  },
});
