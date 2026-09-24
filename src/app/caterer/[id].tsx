import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { EHColors } from '@/constants/colors';
import { CATERERS } from '@/constants/data';
import { EscrowIcon } from '@/components/ui/escrow-icon';

export default function CatererProfileScreen() {
  const { id } = useLocalSearchParams();
  const caterer = CATERERS.find((c) => c.id === id) || CATERERS[0];
  const insets = useSafeAreaInsets();

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/" as any);
    }
  };

  const handleQuote = () => {
    router.push(`/caterer/${id}/quote` as any);
  };

  // Mock calendar data (simplified for layout)
  const calendarDays = Array.from({ length: 31 }, (_, i) => {
    const d = i + 1;
    const isBooked = [3, 8, 14, 21].includes(d);
    const isSelected = d === 14 && false; // Example
    return {
      day: d,
      booked: isBooked,
      selected: isSelected,
    };
  });

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ──────────────── HERO ──────────────── */}
        <View style={styles.hero}>
          <Pressable
            onPress={handleGoBack}
            style={[styles.backBtn, { top: insets.top || 16 }]}
          >
            <Feather name="arrow-left" size={18} color={EHColors.navy} />
          </Pressable>
          <View style={styles.photoLabelBox}>
            <Text style={styles.photoLabelText}>{caterer.photo}</Text>
          </View>
        </View>

        {/* ──────────────── GALLERY ──────────────── */}
        {caterer.gallery && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.galleryScroll}
            style={styles.gallery}
          >
            {caterer.gallery.map((g, idx) => (
              <View key={idx} style={styles.galleryItem}>
                <View style={styles.galleryLabelBox}>
                  <Text style={styles.galleryLabelText}>{g}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        {/* ──────────────── INFO BLOCK ──────────────── */}
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Text style={styles.title}>{caterer.name}</Text>
              <Text style={styles.subtitle}>
                {caterer.suburb}, Harare · {caterer.cuisine} · {caterer.service}
              </Text>
              <View style={styles.ratingRow}>
                <MaterialIcons name="star" size={16} color={EHColors.ink} />
                <Text style={styles.ratingValue}>{caterer.rating}</Text>
                <Text style={styles.reviewCount}>{caterer.reviews} reviews</Text>
              </View>
            </View>
            {caterer.verified && (
              <View style={styles.verifiedBadge}>
                <MaterialIcons name="verified" size={12} color={EHColors.white} />
                <Text style={styles.verifiedText}>VERIFIED</Text>
              </View>
            )}
          </View>

          {/* ESCROW BANNER */}
          <View style={styles.escrowBanner}>
            <View style={{ width: 24, alignItems: 'center' }}>
              <EscrowIcon size="small" />
            </View>
            <Text style={styles.escrowText}>
              <Text style={styles.escrowBold}>Escrow-protected booking. </Text>
              Your deposit sits with EventHunters until 48h after the event.
            </Text>
          </View>

          {/* ABOUT */}
          {caterer.about && (
            <>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.aboutText}>{caterer.about}</Text>
            </>
          )}

          {/* PACKAGES */}
          {caterer.packages && (
            <>
              <Text style={styles.sectionTitle}>Menu packages</Text>
              <View style={styles.packagesList}>
                {caterer.packages.map((pkg, idx) => (
                  <View key={idx} style={styles.packageCard}>
                    <View style={styles.packageHeader}>
                      <Text style={styles.packageName}>{pkg.name}</Text>
                      <Text style={styles.packagePrice}>{pkg.price}</Text>
                    </View>
                    <Text style={styles.packageDishes}>{pkg.dishes}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* CALENDAR */}
          <Text style={styles.sectionTitle}>Availability · December</Text>
          <View style={styles.calendarCard}>
            <View style={styles.calendarHeaderRow}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                <Text key={idx} style={styles.calendarHeaderDay}>
                  {day}
                </Text>
              ))}
            </View>
            <View style={styles.calendarGrid}>
              {calendarDays.map((d) => (
                <View
                  key={d.day}
                  style={[
                    styles.calendarCell,
                    d.booked && styles.calendarCellBooked,
                    d.selected && styles.calendarCellSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.calendarCellText,
                      d.booked && styles.calendarCellTextBooked,
                      d.selected && styles.calendarCellTextSelected,
                    ]}
                  >
                    {d.day}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.calendarLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#F3DEDE' }]} />
                <Text style={styles.legendText}>Booked</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: EHColors.navy }]} />
                <Text style={styles.legendText}>Your date</Text>
              </View>
            </View>
          </View>

          {/* VERIFICATION */}
          <Text style={styles.sectionTitle}>Verification</Text>
          <View style={styles.verificationCard}>
            {[
              { label: 'Identity verified', meta: 'National ID & facial match' },
              { label: 'Kitchen inspected', meta: 'Passed health & safety check' },
              { label: 'Escrow approved', meta: 'Bank details verified' },
            ].map((v, idx) => (
              <View key={idx} style={styles.verificationRow}>
                <View style={styles.verificationIconBg}>
                  <Feather name="check" size={12} color={EHColors.white} />
                </View>
                <View>
                  <Text style={styles.verificationLabel}>{v.label}</Text>
                  <Text style={styles.verificationMeta}>{v.meta}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* REVIEWS */}
          {caterer.reviewList && (
            <>
              <Text style={styles.sectionTitle}>Reviews</Text>
              <View style={styles.reviewsList}>
                {caterer.reviewList.map((r, idx) => (
                  <View key={idx} style={styles.reviewCard}>
                    <View style={styles.reviewHeader}>
                      <Text style={styles.reviewName}>{r.name}</Text>
                      <View style={styles.reviewStarsRow}>
                        <MaterialIcons name="star" size={14} color={EHColors.copper} />
                        <Text style={styles.reviewStars}>{r.stars}</Text>
                      </View>
                    </View>
                    <Text style={styles.reviewMeta}>{r.meta}</Text>
                    <Text style={styles.reviewText}>{r.text}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {/* ──────────────── BOTTOM CTA ──────────────── */}
      <View style={[styles.bottomCtaContainer, { paddingBottom: insets.bottom || 24 }]}>
        <Pressable
          onPress={handleQuote}
          style={({ pressed }) => [
            styles.ctaButton,
            pressed && styles.ctaButtonPressed,
          ]}
        >
          <Text style={styles.ctaButtonText}>Request a quote</Text>
        </Pressable>
      </View>
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: EHColors.pageBg,
  },
  scroll: {
    flex: 1,
  },
  hero: {
    height: 250,
    backgroundColor: '#E6DFD3',
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    left: 18,
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: 'rgba(253,251,247,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  photoLabelBox: {
    position: 'absolute',
    bottom: 12,
    left: 18,
    backgroundColor: 'rgba(255,255,255,0.78)',
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 5,
  },
  photoLabelText: {
    fontSize: 9.5,
    color: '#6E6353',
  },
  gallery: {
    marginTop: 10,
  },
  galleryScroll: {
    paddingHorizontal: 18,
    gap: 8,
  },
  galleryItem: {
    width: 96,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#DCD3C4',
    justifyContent: 'flex-end',
    padding: 5,
  },
  galleryLabelBox: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  galleryLabelText: {
    fontSize: 8,
    color: '#6E6353',
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: EHColors.ink,
    letterSpacing: -0.4,
    lineHeight: 25,
  },
  subtitle: {
    fontSize: 12.5,
    color: EHColors.inkLabel,
    marginTop: 5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 8,
  },
  ratingValue: {
    fontSize: 13,
    fontWeight: '700',
    color: EHColors.ink,
  },
  reviewCount: {
    fontSize: 12,
    color: EHColors.inkMuted,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: EHColors.navy,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
  },
  verifiedText: {
    fontSize: 9,
    fontWeight: '600',
    color: EHColors.white,
    letterSpacing: 0.5,
  },
  escrowBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    backgroundColor: EHColors.navy,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginTop: 16,
  },
  escrowText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
    color: '#D8E5F0',
  },
  escrowBold: {
    color: EHColors.white,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: EHColors.ink,
    marginTop: 22,
  },
  aboutText: {
    fontSize: 13,
    lineHeight: 20,
    color: EHColors.inkMuted,
    marginTop: 7,
  },
  packagesList: {
    gap: 10,
    marginTop: 10,
  },
  packageCard: {
    backgroundColor: EHColors.white,
    borderWidth: 1,
    borderColor: 'rgba(27,58,92,0.12)',
    borderRadius: 16,
    padding: 14,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  packageName: {
    fontSize: 14.5,
    fontWeight: '600',
    color: EHColors.ink,
  },
  packagePrice: {
    fontSize: 15,
    fontWeight: '700',
    color: EHColors.copper,
  },
  packageDishes: {
    fontSize: 12.5,
    lineHeight: 18,
    color: '#6B7783',
    marginTop: 6,
  },
  calendarCard: {
    marginTop: 10,
    backgroundColor: EHColors.white,
    borderWidth: 1,
    borderColor: 'rgba(27,58,92,0.12)',
    borderRadius: 16,
    padding: 14,
  },
  calendarHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  calendarHeaderDay: {
    width: '13%',
    textAlign: 'center',
    fontSize: 9,
    color: '#9AA5B1',
    fontWeight: '600',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  calendarCell: {
    width: '13%',
    height: 34,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F3ED',
  },
  calendarCellBooked: {
    backgroundColor: '#F3DEDE',
  },
  calendarCellSelected: {
    backgroundColor: EHColors.navy,
  },
  calendarCellText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#42505E',
  },
  calendarCellTextBooked: {
    color: '#B08585',
    textDecorationLine: 'line-through',
  },
  calendarCellTextSelected: {
    color: EHColors.white,
  },
  calendarLegend: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
  legendText: {
    fontSize: 11,
    color: EHColors.inkLabel,
  },
  verificationCard: {
    marginTop: 10,
    backgroundColor: '#F4F8FA',
    borderWidth: 1,
    borderColor: 'rgba(27,58,92,0.12)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  verificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(27,58,92,0.08)',
  },
  verificationIconBg: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#2E7D5B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verificationLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: EHColors.ink,
  },
  verificationMeta: {
    fontSize: 11,
    color: EHColors.inkMuted,
    marginTop: 1,
  },
  reviewsList: {
    gap: 10,
    marginTop: 10,
  },
  reviewCard: {
    backgroundColor: EHColors.white,
    borderWidth: 1,
    borderColor: 'rgba(27,58,92,0.1)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewName: {
    fontSize: 13,
    fontWeight: '700',
    color: EHColors.ink,
  },
  reviewStarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  reviewStars: {
    fontSize: 12,
    fontWeight: '700',
    color: EHColors.copper,
  },
  reviewMeta: {
    fontSize: 11,
    color: '#9AA5B1',
    marginTop: 2,
  },
  reviewText: {
    fontSize: 12.5,
    lineHeight: 18,
    color: '#5A6673',
    marginTop: 7,
  },
  bottomCtaContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 18,
    paddingTop: 14,
    // Add gradient later or rely on solid color
    backgroundColor: 'rgba(253,251,247,0.95)',
  },
  ctaButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: EHColors.copper,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: EHColors.copper,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 26,
    elevation: 8,
  },
  ctaButtonPressed: {
    backgroundColor: EHColors.copperDark,
  },
  ctaButtonText: {
    color: EHColors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
