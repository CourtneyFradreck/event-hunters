import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';

import { EHColors } from '@/constants/colors';
import { CATERERS } from '@/constants/data';

const LINE_LABELS = ['Waiting staff', 'Equipment & crockery', 'Delivery', 'Setup & décor', 'Cleanup'];

const QUOTE_DEFS = [
  { id: 'zuva', head: 16.5, pct: 30, incl: [true, true, true, true, true], flagText: 'Recommended · nothing missing', tone: 'good' },
  { id: 'belv', head: 14.25, pct: 35, incl: [true, true, true, true, false], flagText: '', tone: 'plain' },
  { id: 'chikafu', head: 9.8, pct: 40, incl: [false, false, true, false, false], flagText: 'Cheapest · 4 items missing', tone: 'warn' },
  { id: 'table', head: 19, pct: 25, incl: [true, true, true, true, true], flagText: '', tone: 'plain' },
];

export default function CompareQuotesScreen() {
  const insets = useSafeAreaInsets();
  const guests = 220; // Mocked

  const fmt = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;

  const quotes = QUOTE_DEFS.map((q) => {
    const c = CATERERS.find((x) => x.id === q.id) || CATERERS[0];
    const total = q.head * guests;
    const dep = (total * q.pct) / 100;
    const good = q.tone === 'good';
    const warn = q.tone === 'warn';

    return {
      id: q.id,
      name: c.name,
      suburb: c.suburb,
      rating: c.rating,
      guests,
      total: fmt(total),
      perHead: `$${q.head.toFixed(2)}`,
      deposit: fmt(dep),
      depositNote: `${q.pct}% · released 48h after event`,
      bc: good ? EHColors.copper : warn ? EHColors.redBorder : EHColors.navyBorderMedium,
      headBg: good ? EHColors.navy : '#F4F1EB',
      headFg: good ? EHColors.white : EHColors.ink,
      flag: !!q.flagText,
      flagText: q.flagText,
      flagBg: good ? EHColors.copperBg : EHColors.redBg,
      flagFg: good ? EHColors.copperDark : EHColors.red,
      btnBg: good ? EHColors.copper : EHColors.navy,
      btnFg: EHColors.white,
      lines: LINE_LABELS.map((l, i) => ({
        label: l,
        mark: q.incl[i] ? '✓' : '✕',
        bg: q.incl[i] ? EHColors.greenBg : EHColors.redBg,
        fg: q.incl[i] ? EHColors.green : '#B05252',
        textFg: q.incl[i] ? EHColors.inkSecondary : '#A08484',
      })),
    };
  });

  const handleAccept = (quoteId: string) => {
    router.push(`/caterer/${quoteId}/book` as any);
  };

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* ──────────────── NAVY HEADER ──────────────── */}
      <View style={[styles.header, { paddingTop: insets.top || 16 }]}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={18} color={EHColors.white} />
          </Pressable>
          <View>
            <Text style={styles.headerTitle}>4 quotes in</Text>
            <Text style={styles.headerSubtitle}>Wedding · {guests} guests · 14 Dec 2026</Text>
          </View>
        </View>
      </View>

      {/* ──────────────── BANNER ──────────────── */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          <Text style={{ fontWeight: '700' }}>Chikafu House is $1,474 cheaper</Text> — but you&apos;d hire staff, crockery and cleanup yourself. Swipe to compare.
        </Text>
      </View>

      {/* ──────────────── HORIZONTAL SCROLL ──────────────── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        snapToInterval={236 + 12}
        decelerationRate="fast"
      >
        {quotes.map((q) => (
          <View key={q.id} style={[styles.card, { borderColor: q.bc }]}>
            {/* Card Header */}
            <View style={[styles.cardHeader, { backgroundColor: q.headBg }]}>
              <Text style={[styles.cardName, { color: q.headFg }]} numberOfLines={1}>
                {q.name}
              </Text>
              <Text style={[styles.cardMeta, { color: q.headFg }]}>
                ★ {q.rating} · {q.suburb}
              </Text>
            </View>

            {/* Flag */}
            {q.flag && (
              <View style={[styles.flag, { backgroundColor: q.flagBg }]}>
                <Text style={[styles.flagText, { color: q.flagFg }]}>{q.flagText}</Text>
              </View>
            )}

            <View style={styles.cardBody}>
              <Text style={styles.total}>{q.total}</Text>
              <Text style={styles.perHead}>
                {q.perHead} per head · {q.guests} guests
              </Text>

              <View style={styles.divider} />

              {/* Inclusions */}
              <View style={styles.lines}>
                {q.lines.map((l, i) => (
                  <View key={i} style={styles.lineItem}>
                    <View style={[styles.lineMark, { backgroundColor: l.bg }]}>
                      {l.mark === '✓' ? (
                        <Feather name="check" size={10} color={l.fg} />
                      ) : (
                        <Feather name="x" size={10} color={l.fg} />
                      )}
                    </View>
                    <Text style={[styles.lineText, { color: l.textFg }]}>{l.label}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.divider} />

              {/* Escrow Deposit */}
              <View style={styles.depositBox}>
                <Text style={styles.depositLabel}>DEPOSIT IN ESCROW</Text>
                <Text style={styles.depositValue}>{q.deposit}</Text>
                <Text style={styles.depositNote}>{q.depositNote}</Text>
              </View>

              {/* Accept */}
              <Pressable
                onPress={() => handleAccept(q.id)}
                style={({ pressed }) => [
                  styles.acceptBtn,
                  { backgroundColor: q.btnBg, opacity: pressed ? 0.9 : 1 },
                ]}
              >
                <Text style={[styles.acceptBtnText, { color: q.btnFg }]}>Accept quote</Text>
              </Pressable>
            </View>
          </View>
        ))}
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
    backgroundColor: EHColors.navy,
    paddingBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    gap: 12,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: EHColors.white,
  },
  headerSubtitle: {
    fontSize: 11.5,
    color: '#9FBBD4',
    marginTop: 2,
  },
  banner: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    backgroundColor: EHColors.copperBg,
    borderBottomWidth: 1,
    borderBottomColor: EHColors.copperBorderLight,
  },
  bannerText: {
    fontSize: 12,
    color: '#7A5320',
    lineHeight: 17,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 14,
    gap: 12,
  },
  card: {
    width: 236,
    backgroundColor: EHColors.white,
    borderWidth: 1.5,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: EHColors.navy,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 5,
  },
  cardHeader: {
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  cardName: {
    fontSize: 14.5,
    fontWeight: '600',
  },
  cardMeta: {
    fontSize: 11.5,
    marginTop: 4,
    opacity: 0.85,
  },
  flag: {
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  flagText: {
    fontSize: 9.5,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  cardBody: {
    padding: 14,
  },
  total: {
    fontSize: 27,
    fontWeight: '700',
    color: EHColors.ink,
    letterSpacing: -1,
  },
  perHead: {
    fontSize: 12,
    color: EHColors.inkLabel,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: EHColors.navyBorder,
    marginVertical: 13,
  },
  lines: {
    gap: 9,
  },
  lineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  lineMark: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineText: {
    fontSize: 12.5,
  },
  depositBox: {
    backgroundColor: '#F4F8FA',
    borderRadius: 12,
    padding: 11,
  },
  depositLabel: {
    fontSize: 9,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: EHColors.inkSubtle,
    fontWeight: '600',
  },
  depositValue: {
    fontSize: 17,
    fontWeight: '700',
    color: EHColors.navy,
    marginTop: 4,
  },
  depositNote: {
    fontSize: 11,
    color: EHColors.inkLabel,
    marginTop: 2,
  },
  acceptBtn: {
    height: 46,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 13,
  },
  acceptBtnText: {
    fontSize: 14.5,
    fontWeight: '600',
  },
});
