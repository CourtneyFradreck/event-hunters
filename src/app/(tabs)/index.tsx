import { useState } from 'react';
import { router } from 'expo-router';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';

import { CatererCard } from '@/components/ui/caterer-card';
import { EHColors } from '@/constants/colors';
import {
  CATERERS,
  DATES,
  POPULAR_CATERER_IDS,
} from '@/constants/data';
import { logger } from '@/utils/logger';

const POPULAR = POPULAR_CATERER_IDS.map(
  (id) => CATERERS.find((c) => c.id === id)!,
);

const EVENT_TYPES = [
  { id: 'wedding', name: 'Wedding', icon: 'heart' },
  { id: 'corporate', name: 'Corporate', icon: 'briefcase' },
  { id: 'party', name: 'Party', icon: 'music' },
  { id: 'church', name: 'Church', icon: 'home' },
];

export default function HomeScreen() {
  const [eventType, setEventType] = useState('Wedding');
  const [guests, setGuests] = useState(220);
  const [dateIdx, setDateIdx] = useState(0);
  const date = DATES[dateIdx];
  const insets = useSafeAreaInsets();

  const handleFindCaterers = () => {
    logger.debug('User pressed "Find caterers" CTA');
    router.push('/(tabs)/browse');
  };

  return (
    <View style={styles.root}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} bounces={false}>
        
        {/* HERO HEADER */}
        <ImageBackground 
          source={{ uri: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80' }} 
          style={[styles.heroHeader, { paddingTop: insets.top + 20 }]}
          imageStyle={styles.heroHeaderImage}
        >
          <View style={styles.heroOverlay} />
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Ready to plan?</Text>
              <Text style={styles.heroTitle}>Find the perfect{"\n"}caterer for your event.</Text>
            </View>
            <View style={styles.profileBadge}>
              <Feather name="user" size={16} color={EHColors.white} />
            </View>
          </View>
        </ImageBackground>

        {/* QUICK SEARCH WIDGET */}
        <View style={styles.searchWidget}>
          {/* Event Types */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.eventTypeScroll}>
            {EVENT_TYPES.map((type) => {
              const isActive = eventType === type.name;
              return (
                <Pressable 
                  key={type.id} 
                  style={[styles.typeBtn, isActive && styles.typeBtnActive]}
                  onPress={() => setEventType(type.name)}
                >
                  <Feather name={type.icon as any} size={16} color={isActive ? EHColors.white : EHColors.inkSecondary} />
                  <Text style={[styles.typeBtnText, isActive && styles.typeBtnTextActive]}>{type.name}</Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Quick Details */}
          <View style={styles.detailsRow}>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Guests</Text>
              <View style={styles.detailControl}>
                <Pressable onPress={() => setGuests(g => Math.max(80, g - 20))}>
                  <Feather name="minus-circle" size={24} color={EHColors.copper} />
                </Pressable>
                <Text style={styles.detailValue}>{guests}</Text>
                <Pressable onPress={() => setGuests(g => Math.min(500, g + 20))}>
                  <Feather name="plus-circle" size={24} color={EHColors.copper} />
                </Pressable>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Date</Text>
              <View style={[styles.detailControl, { justifyContent: 'space-between', flex: 1, marginLeft: 12 }]}>
                <Text style={styles.detailValueDate}>{date}</Text>
                <Pressable onPress={() => setDateIdx(i => (i + 1) % DATES.length)}>
                  <Feather name="calendar" size={22} color={EHColors.copper} />
                </Pressable>
              </View>
            </View>
          </View>

          {/* CTA */}
          <Pressable style={styles.searchBtn} onPress={handleFindCaterers}>
            <Feather name="search" size={18} color={EHColors.white} />
            <Text style={styles.searchBtnText}>Search Caterers</Text>
          </Pressable>
        </View>

        {/* ACTIVE ESCROW BANNER (Moved here to make hero cleaner) */}
        <View style={styles.escrowBannerWrapper}>
          <View style={styles.escrowBanner}>
            <View style={styles.escrowIconWrapper}>
              <Feather name="shield" size={18} color={EHColors.green} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.escrowBannerTitle}>Escrow Active</Text>
              <Text style={styles.escrowBannerText}>$1,089 secured for your Wedding</Text>
            </View>
            <Pressable onPress={() => router.push('/(tabs)/bookings')} style={styles.escrowViewBtn}>
              <Text style={styles.escrowViewText}>View</Text>
            </Pressable>
          </View>
        </View>

        {/* POPULAR THIS SEASON */}
        <View style={styles.popularSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Picks for You</Text>
            <Pressable onPress={() => router.push('/(tabs)/browse')}>
              <Text style={styles.seeAll}>See All</Text>
            </Pressable>
          </View>

          <FlatList
            data={POPULAR}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContent}
            snapToInterval={214 + 16}
            decelerationRate="fast"
            renderItem={({ item }) => (
              <View style={styles.carouselItem}>
                <CatererCard caterer={item} onPress={() => router.push(`/caterer/${item.id}` as any)} />
              </View>
            )}
          />
        </View>
        
        {/* BOTTOM PADDING */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: EHColors.pageBg },
  scroll: { flex: 1 },
  
  heroHeader: {
    height: 320,
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
  },
  heroHeaderImage: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill as object,
    backgroundColor: 'rgba(15, 30, 50, 0.65)',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  greeting: { fontSize: 16, color: 'rgba(255,255,255,0.8)', fontWeight: '600', marginBottom: 4 },
  heroTitle: { fontSize: 32, fontWeight: '800', color: EHColors.white, lineHeight: 38 },
  profileBadge: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center', justifyContent: 'center',
  },

  searchWidget: {
    marginHorizontal: 24,
    marginTop: -100,
    backgroundColor: EHColors.white,
    borderRadius: 24,
    padding: 20,
    // Soft drop shadow
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 16 },
      android: { elevation: 8 }
    }),
  },
  eventTypeScroll: { gap: 12, marginBottom: 24 },
  typeBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 16, paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: EHColors.pageBg,
    borderWidth: 1, borderColor: EHColors.navyBorderLight,
  },
  typeBtnActive: {
    backgroundColor: EHColors.navy,
    borderColor: EHColors.navy,
  },
  typeBtnText: { fontSize: 14, fontWeight: '600', color: EHColors.inkSecondary },
  typeBtnTextActive: { color: EHColors.white },

  detailsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  detailBox: { flex: 1 },
  detailLabel: { fontSize: 12, fontWeight: '600', color: EHColors.inkLabel, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  detailControl: { flexDirection: 'row', alignItems: 'center' },
  detailValue: { fontSize: 18, fontWeight: '700', color: EHColors.ink, marginHorizontal: 16 },
  detailValueDate: { fontSize: 16, fontWeight: '600', color: EHColors.ink },
  divider: { width: 1, height: 40, backgroundColor: EHColors.navyBorderLight, marginHorizontal: 16 },

  searchBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: EHColors.copper,
    height: 56, borderRadius: 16,
  },
  searchBtnText: { fontSize: 16, fontWeight: '700', color: EHColors.white },

  escrowBannerWrapper: { paddingHorizontal: 24, marginTop: 24 },
  escrowBanner: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: EHColors.greenBg,
    borderWidth: 1, borderColor: 'rgba(46, 125, 91, 0.2)',
    padding: 16, borderRadius: 16, gap: 12,
  },
  escrowIconWrapper: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(46, 125, 91, 0.15)', alignItems: 'center', justifyContent: 'center' },
  escrowBannerTitle: { fontSize: 14, fontWeight: '700', color: EHColors.green, marginBottom: 2 },
  escrowBannerText: { fontSize: 13, color: EHColors.green },
  escrowViewBtn: { backgroundColor: EHColors.green, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  escrowViewText: { fontSize: 13, fontWeight: '600', color: EHColors.white },

  popularSection: { marginTop: 32 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 24, marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: EHColors.ink },
  seeAll: { fontSize: 14, fontWeight: '600', color: EHColors.copper, marginBottom: 2 },
  carouselContent: { paddingHorizontal: 24, paddingRight: 48 },
  carouselItem: { marginRight: 16 },
});
