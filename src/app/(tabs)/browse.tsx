import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';

import { CatererCard } from '@/components/ui/caterer-card';
import { EHColors } from '@/constants/colors';
import { CATERERS } from '@/constants/data';
import { logger } from '@/utils/logger';

export default function BrowseScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilters, setActiveFilters] = useState<string[]>(['Escrow protected']);

  // Mock state from prototype
  const eventType = 'Wedding';
  const guests = 220;
  const date = '14 Dec 2026';
  const suburb = 'Borrowdale';

  const filterChips = [
    { id: 'escrow', label: 'Escrow protected' },
    { id: 'verified', label: 'Verified only' },
    { id: 'service_full', label: 'Full-service' },
    { id: 'service_drop', label: 'Drop-off' },
  ];

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
    logger.debug('Cleared all filters');
    setActiveFilters([]);
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/" as any);
    }
  };

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ──────────────── NAVY HEADER ──────────────── */}
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <View style={styles.headerTopRow}>
            <Pressable
              onPress={handleGoBack}
              style={({ pressed }) => [
                styles.backBtn,
                pressed && styles.backBtnPressed,
              ]}
            >
              <Feather name="arrow-left" size={18} color={EHColors.white} />
            </Pressable>
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>
                {eventType} · {guests} guests
              </Text>
              <Text style={styles.headerSubtitle}>
                {date} · {suburb} & nearby
              </Text>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersScrollContent}
            style={styles.filtersScroll}
          >
            {filterChips.map((f) => {
              const selected = activeFilters.includes(f.id);
              return (
                <Pressable
                  key={f.id}
                  onPress={() => handleToggleFilter(f.id)}
                  style={[
                    styles.filterChip,
                    {
                      backgroundColor: selected ? EHColors.copperBg : EHColors.navy,
                      borderColor: selected ? EHColors.copper : EHColors.navyBorderLight,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      { color: selected ? EHColors.copperDark : EHColors.white },
                    ]}
                  >
                    {f.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* ──────────────── RESULTS INFO ──────────────── */}
        <View style={styles.resultsInfoRow}>
          <Text style={styles.resultsCountText}>
            <Text style={styles.resultsCountValue}>{CATERERS.length}</Text> caterers ·{' '}
            <Text style={styles.escrowAccent}>all escrow-protected</Text>
          </Text>
          {activeFilters.length > 0 && (
            <Pressable onPress={handleClearFilters}>
              <Text style={styles.clearFiltersText}>Clear</Text>
            </Pressable>
          )}
        </View>

        {/* ──────────────── CATERER LIST ──────────────── */}
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
              <Text style={styles.noResultsText}>
                No caterers match these filters.{' '}
                <Text style={styles.clearFiltersLink} onPress={handleClearFilters}>
                  Clear filters
                </Text>
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
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
  header: {
    backgroundColor: EHColors.navy,
    paddingBottom: 14,
  },
  headerTopRow: {
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
  backBtnPressed: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: EHColors.white,
  },
  headerSubtitle: {
    fontSize: 11.5,
    color: '#9FBBD4',
    marginTop: 2,
  },
  filtersScroll: {
    marginTop: 13,
  },
  filtersScrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 2,
    gap: 7,
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  resultsInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 6,
  },
  resultsCountText: {
    fontSize: 12.5,
    color: EHColors.inkLabel,
  },
  resultsCountValue: {
    color: EHColors.ink,
    fontWeight: '700',
  },
  escrowAccent: {
    color: EHColors.copper,
    fontWeight: '600',
  },
  clearFiltersText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: EHColors.copper,
  },
  listContainer: {
    paddingHorizontal: 18,
    paddingTop: 6,
    gap: 13,
  },
  noResultsBox: {
    paddingVertical: 34,
    paddingHorizontal: 20,
    backgroundColor: EHColors.white,
    borderWidth: 1,
    borderColor: 'rgba(27,58,92,0.2)',
    borderStyle: 'dashed',
    borderRadius: 18,
    alignItems: 'center',
  },
  noResultsText: {
    color: EHColors.inkLabel,
    fontSize: 13,
    textAlign: 'center',
  },
  clearFiltersLink: {
    color: EHColors.copper,
    fontWeight: '700',
  },
});
