import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, Platform, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';

import { CatererCard } from '@/components/ui/caterer-card';
import { EHColors } from '@/constants/colors';
import { CATERERS } from '@/constants/data';
import { logger } from '@/utils/logger';

const FILTER_CHIPS = [
  { id: 'escrow', label: 'Escrow protected', icon: 'shield' },
  { id: 'verified', label: 'Verified only', icon: 'check-circle' },
  { id: 'service_full', label: 'Full-service', icon: 'users' },
  { id: 'service_drop', label: 'Drop-off', icon: 'truck' },
];

export default function BrowseScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilters, setActiveFilters] = useState<string[]>(['escrow']);

  // Mock state from prototype/home
  const eventType = 'Wedding';
  const guests = 220;
  const date = '14 Dec 2026';
  const suburb = 'Borrowdale';

  const handleToggleFilter = (id: string) => {
    setActiveFilters((prev) => {
      if (prev.includes(id)) {
        logger.debug(`Removed filter: ${id}`);
        return prev.filter((f) => f !== id);
      } else {
        logger.debug(`Added filter: ${id}`);
        return [...prev, id];
      }
    });
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
  };

  return (
    <View style={styles.root}>
      {/* WHITE FLOATING HEADER */}
      <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <Pressable onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)')} style={styles.backBtn}>
            <Feather name="arrow-left" size={20} color={EHColors.ink} />
          </Pressable>
          
          <View style={styles.searchPill}>
            <View>
              <Text style={styles.searchTitle}>{eventType} in {suburb}</Text>
              <Text style={styles.searchSubtitle}>{date} • {guests} guests</Text>
            </View>
            <Feather name="sliders" size={18} color={EHColors.inkSecondary} />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScrollContent}
          style={styles.filtersScroll}
        >
          {FILTER_CHIPS.map((f) => {
            const selected = activeFilters.includes(f.id);
            return (
              <Pressable
                key={f.id}
                onPress={() => handleToggleFilter(f.id)}
                style={[styles.filterChip, selected && styles.filterChipActive]}
              >
                {f.icon && (
                  <Feather 
                    name={f.icon as any} 
                    size={14} 
                    color={selected ? EHColors.copperDark : EHColors.inkSecondary} 
                    style={{ marginRight: 6 }}
                  />
                )}
                <Text style={[styles.filterChipText, selected && styles.filterChipTextActive]}>
                  {f.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: insets.bottom + 96, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.resultsInfoRow}>
          <Text style={styles.resultsCountText}>
            <Text style={styles.resultsCountValue}>{CATERERS.length}</Text> caterers found
          </Text>
          {activeFilters.length > 0 && (
            <Pressable onPress={handleClearFilters} style={styles.clearFiltersBtn}>
              <Text style={styles.clearFiltersText}>Clear Filters</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.listContainer}>
          {CATERERS.length > 0 ? (
            CATERERS.map((caterer) => (
              <CatererCard
                key={caterer.id}
                caterer={caterer}
                variant="full"
                onPress={() => router.push(`/caterer/${caterer.id}` as any)}
              />
            ))
          ) : (
            <View style={styles.noResultsBox}>
              <Feather name="search" size={32} color={EHColors.navyBorderMedium} style={{ marginBottom: 12 }} />
              <Text style={styles.noResultsText}>No caterers match your filters.</Text>
              <Pressable onPress={handleClearFilters} style={styles.noResultsBtn}>
                <Text style={styles.noResultsBtnText}>Clear all filters</Text>
              </Pressable>
            </View>
          )}
        </View>
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
  headerContent: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 12, gap: 12,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: EHColors.pageBg,
    alignItems: 'center', justifyContent: 'center',
  },
  searchPill: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: EHColors.pageBg,
    paddingHorizontal: 16, paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1, borderColor: EHColors.navyBorderLight,
  },
  searchTitle: { fontSize: 14, fontWeight: '700', color: EHColors.ink },
  searchSubtitle: { fontSize: 12, color: EHColors.inkSecondary, marginTop: 2 },

  filtersScroll: { marginTop: 16 },
  filtersScrollContent: { paddingHorizontal: 16, gap: 10 },
  filterChip: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 8, paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: EHColors.pageBg,
    borderWidth: 1, borderColor: EHColors.navyBorderLight,
  },
  filterChipActive: {
    backgroundColor: EHColors.copperBg,
    borderColor: EHColors.copper,
  },
  filterChipText: { fontSize: 13, fontWeight: '600', color: EHColors.inkSecondary },
  filterChipTextActive: { color: EHColors.copperDark },

  scroll: { flex: 1 },
  resultsInfoRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingBottom: 16,
  },
  resultsCountText: { fontSize: 14, color: EHColors.inkSecondary },
  resultsCountValue: { color: EHColors.ink, fontWeight: '700' },
  clearFiltersBtn: {
    paddingHorizontal: 12, paddingVertical: 6,
    backgroundColor: 'rgba(216, 70, 70, 0.1)', borderRadius: 12,
  },
  clearFiltersText: { fontSize: 12, fontWeight: '700', color: EHColors.red },

  listContainer: { paddingHorizontal: 20, gap: 16 },
  
  noResultsBox: {
    paddingVertical: 48, paddingHorizontal: 24,
    backgroundColor: EHColors.white,
    borderWidth: 1, borderColor: EHColors.navyBorderLight, borderStyle: 'dashed', borderRadius: 20,
    alignItems: 'center',
  },
  noResultsText: { color: EHColors.inkSecondary, fontSize: 15, textAlign: 'center', marginBottom: 16 },
  noResultsBtn: { backgroundColor: EHColors.navy, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
  noResultsBtnText: { color: EHColors.white, fontSize: 14, fontWeight: '600' },
});
