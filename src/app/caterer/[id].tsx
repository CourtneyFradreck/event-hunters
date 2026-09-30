import { Pressable, ScrollView, StyleSheet, Text, View, Image, Platform } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';

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

  const calendarDays = Array.from({ length: 31 }, (_, i) => {
    const d = i + 1;
    const isBooked = [3, 8, 14, 21].includes(d);
    return { day: d, booked: isBooked };
  });

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO */}
        <View style={styles.heroArea}>
          <Image source={{ uri: caterer.photo }} style={StyleSheet.absoluteFill} />
          <View style={styles.heroOverlay} />
          <Pressable
            onPress={handleGoBack}
            style={[styles.backBtn, { top: insets.top || 16 }]}
          >
            <Feather name="arrow-left" size={20} color={EHColors.ink} />
          </Pressable>
        </View>

        {/* GALLERY */}
        {caterer.gallery && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.galleryScroll}
            style={styles.gallery}
          >
            {caterer.gallery.map((g, idx) => (
              <View key={idx} style={styles.galleryItem}>
                <Image source={{ uri: g }} style={StyleSheet.absoluteFill} />
              </View>
            ))}
          </ScrollView>
        )}

        {/* INFO BLOCK */}
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Text style={styles.title}>{caterer.name}</Text>
              <Text style={styles.subtitle}>
                {caterer.suburb}, Harare • {caterer.cuisine} • {caterer.service}
              </Text>
              <View style={styles.ratingRow}>
                <Feather name="star" size={16} color={EHColors.copper} />
                <Text style={styles.ratingValue}>{caterer.rating}</Text>
                <Text style={styles.reviewCount}>({caterer.reviews} reviews)</Text>
              </View>
            </View>
            {caterer.verified && (
              <View style={styles.verifiedBadge}>
                <Feather name="check-circle" size={14} color={EHColors.white} />
                <Text style={styles.verifiedText}>VERIFIED</Text>
              </View>
            )}
          </View>

          {/* ESCROW BANNER */}
          <View style={styles.escrowBanner}>
            <View style={styles.escrowIconWrapper}>
              <Feather name="shield" size={20} color={EHColors.green} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.escrowTitle}>Escrow Protected</Text>
              <Text style={styles.escrowText}>
                Your deposit sits securely with EventHunters until 48h after your event.
              </Text>
            </View>
          </View>

          {/* ABOUT */}
          {caterer.about && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.aboutText}>{caterer.about}</Text>
            </View>
          )}

          {/* PACKAGES */}
          {caterer.packages && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Menu Packages</Text>
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
            </View>
          )}

          {/* CALENDAR */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Availability • December</Text>
            <View style={styles.calendarCard}>
              <View style={styles.calendarHeaderRow}>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                  <Text key={idx} style={styles.calendarHeaderDay}>{day}</Text>
                ))}
              </View>
              <View style={styles.calendarGrid}>
                {calendarDays.map((d) => (
                  <View
                    key={d.day}
                    style={[
                      styles.calendarCell,
                      d.booked && styles.calendarCellBooked,
                    ]}
                  >
                    <Text
                      style={[
                        styles.calendarCellText,
                        d.booked && styles.calendarCellTextBooked,
                      ]}
                    >
                      {d.day}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.calendarLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#FFEBEB' }]} />
                  <Text style={styles.legendText}>Booked</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: EHColors.white, borderWidth: 1, borderColor: EHColors.navyBorderLight }]} />
                  <Text style={styles.legendText}>Available</Text>
                </View>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* BOTTOM ACTION BAR */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || 24 }]}>
        <View style={styles.bottomBarContent}>
          <View style={styles.priceCol}>
            <Text style={styles.priceValue}>${caterer.lo} - ${caterer.hi}</Text>
            <Text style={styles.priceLabel}>per head</Text>
          </View>
          <Pressable 
            style={styles.quoteBtn}
            onPress={() => router.push(`/caterer/${id}/book` as any)}
          >
            <Text style={styles.quoteBtnText}>Request Quote</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: EHColors.pageBg },
  scroll: { flex: 1 },
  
  heroArea: { height: 260, width: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFill as object, backgroundColor: 'rgba(0,0,0,0.1)' },
  backBtn: {
    position: 'absolute', left: 20,
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: EHColors.white,
    alignItems: 'center', justifyContent: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8 },
      android: { elevation: 4 }
    }),
  },

  gallery: { marginTop: -40, zIndex: 10 },
  galleryScroll: { paddingHorizontal: 20, gap: 12 },
  galleryItem: {
    width: 100, height: 80, borderRadius: 16, overflow: 'hidden',
    borderWidth: 3, borderColor: EHColors.white,
    backgroundColor: EHColors.sandBg,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8 },
      android: { elevation: 4 }
    }),
  },

  content: { paddingHorizontal: 20, paddingTop: 24 },
  
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 },
  headerLeft: { flex: 1, paddingRight: 16 },
  title: { fontSize: 26, fontWeight: '800', color: EHColors.ink, marginBottom: 6, letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: EHColors.inkSecondary, fontWeight: '500', marginBottom: 10 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  ratingValue: { fontSize: 15, fontWeight: '700', color: EHColors.ink },
  reviewCount: { fontSize: 14, color: EHColors.inkSecondary },
  
  verifiedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: EHColors.navy, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12,
  },
  verifiedText: { color: EHColors.white, fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },

  escrowBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    backgroundColor: EHColors.greenBg, padding: 16, borderRadius: 16,
    borderWidth: 1, borderColor: 'rgba(46, 125, 91, 0.15)', marginBottom: 32,
  },
  escrowIconWrapper: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: EHColors.white, alignItems: 'center', justifyContent: 'center',
    ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 }, android: { elevation: 2 } }),
  },
  escrowTitle: { fontSize: 15, fontWeight: '700', color: EHColors.green, marginBottom: 4 },
  escrowText: { fontSize: 13, color: EHColors.green, lineHeight: 18 },

  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: EHColors.ink, marginBottom: 16, letterSpacing: -0.3 },
  aboutText: { fontSize: 15, color: EHColors.inkSecondary, lineHeight: 24 },

  packagesList: { gap: 12 },
  packageCard: {
    backgroundColor: EHColors.white, padding: 16, borderRadius: 16,
    borderWidth: 1, borderColor: EHColors.navyBorderLight,
  },
  packageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  packageName: { fontSize: 16, fontWeight: '700', color: EHColors.ink },
  packagePrice: { fontSize: 16, fontWeight: '700', color: EHColors.copper },
  packageDishes: { fontSize: 14, color: EHColors.inkSecondary, lineHeight: 20 },

  calendarCard: {
    backgroundColor: EHColors.white, padding: 20, borderRadius: 20,
    borderWidth: 1, borderColor: EHColors.navyBorderLight,
  },
  calendarHeaderRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  calendarHeaderDay: { fontSize: 13, fontWeight: '600', color: EHColors.inkSecondary, width: 32, textAlign: 'center' },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', gap: 8 },
  calendarCell: {
    width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center',
    backgroundColor: EHColors.white, borderWidth: 1, borderColor: EHColors.navyBorderLight,
  },
  calendarCellBooked: { backgroundColor: '#FFEBEB', borderColor: 'transparent' },
  calendarCellText: { fontSize: 14, fontWeight: '600', color: EHColors.ink },
  calendarCellTextBooked: { color: '#D84646' },
  calendarLegend: { flexDirection: 'row', justifyContent: 'center', gap: 24, marginTop: 24, paddingTop: 16, borderTopWidth: 1, borderTopColor: EHColors.navyBorderLight },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  legendDot: { width: 12, height: 12, borderRadius: 6 },
  legendText: { fontSize: 13, color: EHColors.inkSecondary, fontWeight: '500' },

  bottomBar: {
    backgroundColor: EHColors.white,
    borderTopWidth: 1, borderTopColor: EHColors.navyBorderLight,
    paddingHorizontal: 20, paddingTop: 16,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.05, shadowRadius: 12 },
      android: { elevation: 12 }
    }),
  },
  bottomBarContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  priceCol: { flex: 1 },
  priceValue: { fontSize: 20, fontWeight: '800', color: EHColors.ink, marginBottom: 2 },
  priceLabel: { fontSize: 13, color: EHColors.inkSecondary, fontWeight: '500' },
  quoteBtn: { backgroundColor: EHColors.copper, paddingHorizontal: 32, paddingVertical: 16, borderRadius: 16 },
  quoteBtnText: { fontSize: 16, fontWeight: '700', color: EHColors.white },
});
