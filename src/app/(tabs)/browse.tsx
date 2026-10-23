import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, Platform, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';

import { CatererCard } from '@/components/ui/caterer-card';
import { EHColors } from '@/constants/colors';
import { useCaterers } from '@/hooks/use-caterers';
import { logger } from '@/utils/logger';

const CATEGORY_CHIPS = [
  { id: 'all', label: 'All', icon: 'grid' },
  { id: 'wedding', label: 'Weddings', icon: 'heart' },
  { id: 'corporate', label: 'Corporate', icon: 'briefcase' },
  { id: 'braai', label: 'Braai & Grill', icon: 'sun' },
  { id: 'verified', label: 'Verified', icon: 'check-circle' },
];

export default function BrowseScreen() {
  const insets = useSafeAreaInsets();
  const caterers = useCaterers();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCaterers = caterers.filter((caterer) => {
    // Basic mock filtering
    const matchesSearch = caterer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          caterer.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          caterer.suburb.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeCategory === 'all') return matchesSearch;
    if (activeCategory === 'verified') return matchesSearch && caterer.verified;
    if (activeCategory === 'wedding') return matchesSearch && caterer.about?.toLowerCase().includes('wedding');
    if (activeCategory === 'corporate') return matchesSearch && caterer.about?.toLowerCase().includes('corporate');
    if (activeCategory === 'braai') return matchesSearch && (caterer.cuisine.toLowerCase().includes('bbq') || caterer.cuisine.toLowerCase().includes('braai'));
    
    return matchesSearch;
  });

  return (
    <View style={styles.root}>
      {/* HEADER & SEARCH BORDERLESS */}
      <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Explore Caterers</Text>
        </View>

        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color={EHColors.inkSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, cuisine, or location..."
            placeholderTextColor={EHColors.inkPlaceholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')} style={styles.clearSearchBtn}>
              <Feather name="x" size={16} color={EHColors.inkSecondary} />
            </Pressable>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScrollContent}
          style={styles.filtersScroll}
        >
          {CATEGORY_CHIPS.map((cat) => {
            const selected = activeCategory === cat.id;
            return (
              <Pressable
                key={cat.id}
                onPress={() => {
                  logger.trackEvent('Browse Category Selected', { category: cat.id });
                  setActiveCategory(cat.id);
                }}
                style={[styles.filterChip, selected && styles.filterChipActive]}
              >
                {cat.icon && (
                  <Feather 
                    name={cat.icon as any} 
                    size={14} 
                    color={selected ? EHColors.copperDark : EHColors.inkSecondary} 
                    style={{ marginRight: 6 }}
                  />
                )}
                <Text style={[styles.filterChipText, selected && styles.filterChipTextActive]}>
                  {cat.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* RESULTS */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: insets.bottom + 120, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.resultsInfoRow}>
          <Text style={styles.resultsCountText}>
            <Text style={styles.resultsCountValue}>{filteredCaterers.length}</Text> caterers found
          </Text>
        </View>

        <View style={styles.listContainer}>
          {filteredCaterers.length > 0 ? (
            filteredCaterers.map((caterer) => (
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
              <Text style={styles.noResultsText}>No caterers match your search.</Text>
              <Pressable onPress={() => { setSearchQuery(''); setActiveCategory('all'); }} style={styles.noResultsBtn}>
                <Text style={styles.noResultsBtnText}>Clear search</Text>
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
    paddingHorizontal: 20, paddingTop: 12, paddingBottom: 16,
  },
  headerTitle: { fontSize: 28, fontWeight: '700', color: EHColors.ink },

  searchContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F0F4F8',
    marginHorizontal: 16, borderRadius: 16,
    paddingHorizontal: 16, height: 48,
  },
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, fontSize: 16, color: EHColors.ink, height: '100%' },
  clearSearchBtn: { padding: 4 },

  filtersScroll: { marginTop: 16 },
  filtersScrollContent: { paddingHorizontal: 16, gap: 10 },
  filterChip: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 8, paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: EHColors.white,
    borderWidth: 1, borderColor: EHColors.navyBorderLight,
  },
  filterChipActive: {
    backgroundColor: EHColors.copperBg,
    borderColor: EHColors.copper,
  },
  filterChipText: { fontSize: 14, fontWeight: '600', color: EHColors.inkSecondary },
  filterChipTextActive: { color: EHColors.copperDark },

  scroll: { flex: 1 },
  resultsInfoRow: {
    paddingHorizontal: 20, paddingBottom: 16,
  },
  resultsCountText: { fontSize: 14, color: EHColors.inkSecondary },
  resultsCountValue: { color: EHColors.ink, fontWeight: '700' },

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
