/**
 * Organiser Home Screen — the first screen of EventHunters.
 *
 * Layout (top to bottom):
 *   1. Navy header — tagline + role-switch button + escrow banner
 *   2. Search card — event type chips, guest counter, date picker, suburb chips, CTA
 *   3. Budget per head — price tier chips
 *   4. Popular this season — horizontal caterer carousel
 *
 * All design values are taken directly from the HTML prototype.
 */

import { useCallback, useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CatererCard } from '@/components/ui/caterer-card';
import { Chip } from '@/components/ui/chip';
import { EscrowIcon } from '@/components/ui/escrow-icon';
import { MonoLabel } from '@/components/ui/mono-label';
import { EHColors } from '@/constants/colors';
import {
  CATERERS,
  DATES,
  EVENT_TYPES,
  POPULAR_CATERER_IDS,
  PRICE_CHIPS,
  SUBURBS,
  type EventType,
  type Suburb,
} from '@/constants/data';
import { logger } from '@/utils/logger';

import Feather from '@expo/vector-icons/Feather';

// ─── Popular caterers (pre-resolved once) ──────────────────────
const POPULAR = POPULAR_CATERER_IDS.map(
  (id) => CATERERS.find((c) => c.id === id)!,
);

export default function HomeScreen() {
  // ── Local UI state (mirrors prototype) ──────────────────────
  const [eventType, setEventType] = useState<EventType>('Wedding');
  const [guests, setGuests] = useState(220);
  const [dateIdx, setDateIdx] = useState(0);
  const [suburb, setSuburb] = useState<Suburb>('Borrowdale');
  const [priceBand, setPriceBand] = useState<string | null>(null);

  const date = DATES[dateIdx];
  const insets = useSafeAreaInsets();

  const handleEventType = (t: EventType) => {
    logger.debug(`Selected event type: ${t}`);
    setEventType(t);
  };

  const handleSuburb = (s: Suburb) => {
    logger.debug(`Selected suburb: ${s}`);
    setSuburb(s);
  };

  const handlePriceBand = (band: string | null) => {
    logger.debug(`Toggled price band: ${band}`);
    setPriceBand(band);
  };

  const decGuests = useCallback(() => {
    setGuests((g) => {
      const newVal = Math.max(80, g - 20);
      logger.debug(`Decreased guests to: ${newVal}`);
      return newVal;
    });
  }, []);

  const incGuests = useCallback(() => {
    setGuests((g) => {
      const newVal = Math.min(400, g + 20);
      logger.debug(`Increased guests to: ${newVal}`);
      return newVal;
    });
  }, []);

  const nextDate = useCallback(() => {
    setDateIdx((i) => {
      const newIdx = (i + 1) % DATES.length;
      logger.debug(`Cycled date to: ${DATES[newIdx]}`);
      return newIdx;
    });
  }, []);

  const handleFindCaterers = () => {
    logger.debug('User pressed "Find caterers" CTA');
    logger.debug(`Search config - Type: ${eventType}, Guests: ${guests}, Date: ${date}, Suburb: ${suburb}, Price: ${priceBand ?? 'Any'}`);
  };

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ──────────────── NAVY HEADER ──────────────── */}
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerLabel}>HARARE · ORGANISER</Text>
              <Text style={styles.headerTitle}>
                Plan the food.{'\n'}Keep the money safe.
              </Text>
            </View>

            {/* Switch-to-Vendor button */}
            <Pressable style={styles.switchBtn}>
              <Text style={styles.switchLabel}>SWITCH</Text>
              <Text style={styles.switchValue}>Vendor</Text>
            </Pressable>
          </View>

          {/* Escrow info banner */}
          <View style={styles.escrowBanner}>
            <EscrowIcon size="medium" />
            <Text style={styles.escrowText}>
              <Text style={styles.escrowBold}>
                Every deposit is held in escrow.
              </Text>{' '}
              Released to the caterer 48 hours after your event — not before.
            </Text>
          </View>
        </View>

        {/* ──────────────── SEARCH CARD ──────────────── */}
        <View style={styles.cardWrapper}>
          <View style={styles.searchCard}>
            {/* Event type */}
            <MonoLabel>Event type</MonoLabel>
            <View style={styles.chipRow}>
              {EVENT_TYPES.map((t) => (
                <Chip
                  key={t}
                  label={t}
                  selected={eventType === t}
                  onPress={() => handleEventType(t)}
                />
              ))}
            </View>

            {/* Guests + Date */}
            <View style={styles.guestsDateRow}>
              {/* Guests counter */}
              <View style={styles.counterBox}>
                <MonoLabel>Guests</MonoLabel>
                <View style={styles.counterRow}>
                  <Pressable onPress={decGuests} style={styles.counterBtn}>
                    <Feather name="minus" size={16} color={EHColors.navy} />
                  </Pressable>
                  <Text style={styles.counterValue}>{guests}</Text>
                  <Pressable onPress={incGuests} style={styles.counterBtn}>
                    <Feather name="plus" size={16} color={EHColors.navy} />
                  </Pressable>
                </View>
              </View>

              {/* Date picker */}
              <Pressable onPress={nextDate} style={styles.dateBox}>
                <MonoLabel>Date</MonoLabel>
                <Text style={styles.dateValue}>{date}</Text>
              </Pressable>
            </View>

            {/* Suburb */}
            <MonoLabel>Suburb</MonoLabel>
            <View style={styles.chipRow}>
              {SUBURBS.map((s) => (
                <Chip
                  key={s}
                  label={s}
                  selected={suburb === s}
                  onPress={() => handleSuburb(s)}
                  size="small"
                />
              ))}
            </View>

            {/* CTA */}
            <Pressable
              onPress={handleFindCaterers}
              style={({ pressed }) => [
                styles.ctaButton,
                pressed && styles.ctaButtonPressed,
              ]}
            >
              <Text style={styles.ctaText}>Find caterers</Text>
              <Feather name="arrow-right" size={18} color={EHColors.white} />
            </Pressable>
          </View>
        </View>

        {/* ──────────────── BUDGET PER HEAD ──────────────── */}
        <View style={styles.budgetSection}>
          <MonoLabel>Budget per head</MonoLabel>
          <View style={styles.budgetRow}>
            {PRICE_CHIPS.map((p) => {
              const selected = priceBand === p.band;
              return (
                <Pressable
                  key={p.band}
                  onPress={() =>
                    handlePriceBand(selected ? null : p.band)
                  }
                  style={[
                    styles.priceChip,
                    {
                      backgroundColor: selected
                        ? EHColors.copperBg
                        : EHColors.cardBg,
                      borderColor: selected
                        ? EHColors.copper
                        : EHColors.navyBorderLight,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.priceLabel,
                      {
                        color: selected
                          ? EHColors.copperDark
                          : EHColors.ink,
                      },
                    ]}
                  >
                    {p.label}
                  </Text>
                  <Text style={styles.priceSub}>{p.sub}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* ──────────────── POPULAR THIS SEASON ──────────────── */}
        <View style={styles.popularSection}>
          <View style={styles.popularHeader}>
            <Text style={styles.popularTitle}>Popular this season</Text>
            <Pressable>
              <Text style={styles.seeAll}>See all</Text>
            </Pressable>
          </View>

          <FlatList
            data={POPULAR}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContent}
            snapToInterval={214 + 12}
            decelerationRate="fast"
            renderItem={({ item }) => (
              <View style={styles.carouselItem}>
                <CatererCard caterer={item} />
              </View>
            )}
          />
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
  content: {},

  // ── Header ──────────────────────────────────────────────────
  header: {
    backgroundColor: EHColors.navy,
    paddingHorizontal: 22,
    paddingBottom: 22,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  headerLeft: {
    flex: 1,
  },
  headerLabel: {
    fontSize: 10.5,
    fontWeight: '500',
    letterSpacing: 1.7,
    color: EHColors.navyLight,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginTop: 5,
    lineHeight: 28,
    color: EHColors.white,
  },
  switchBtn: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  switchLabel: {
    fontSize: 9,
    letterSpacing: 0.6,
    color: EHColors.escrowTextAccent,
  },
  switchValue: {
    fontSize: 10,
    fontWeight: '700',
    color: EHColors.white,
  },

  // ── Escrow banner ───────────────────────────────────────────
  escrowBanner: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: EHColors.copperBgAlpha,
    borderWidth: 1,
    borderColor: EHColors.copperBorder,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  escrowText: {
    flex: 1,
    fontSize: 12.5,
    lineHeight: 17,
    color: EHColors.escrowTextLight,
  },
  escrowBold: {
    fontWeight: '700',
    color: EHColors.white,
  },

  // ── Search card ─────────────────────────────────────────────
  cardWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchCard: {
    backgroundColor: EHColors.cardBg,
    borderWidth: 1,
    borderColor: EHColors.navyBorder,
    borderRadius: 22,
    padding: 18,
    // shadow
    shadowColor: EHColors.navy,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 14,
    elevation: 6,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginTop: 9,
    marginBottom: 16,
  },

  // ── Guests + Date ───────────────────────────────────────────
  guestsDateRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  counterBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: EHColors.navyBorderMedium,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  counterBtn: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: EHColors.sandBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: EHColors.navy,
  },
  counterValue: {
    fontSize: 19,
    fontWeight: '700',
    color: EHColors.ink,
  },
  dateBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: EHColors.navyBorderMedium,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  dateValue: {
    fontSize: 16,
    fontWeight: '700',
    color: EHColors.ink,
    marginTop: 10,
  },

  // ── CTA button ──────────────────────────────────────────────
  ctaButton: {
    marginTop: 18,
    height: 52,
    borderRadius: 15,
    backgroundColor: EHColors.navy,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  ctaButtonPressed: {
    backgroundColor: EHColors.navyDark,
  },
  ctaText: {
    fontSize: 15.5,
    fontWeight: '600',
    color: EHColors.white,
  },
  ctaArrow: {
    fontSize: 16,
    color: EHColors.white,
  },

  // ── Budget section ──────────────────────────────────────────
  budgetSection: {
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  budgetRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  priceChip: {
    flex: 1,
    paddingVertical: 13,
    paddingHorizontal: 8,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1.2,
  },
  priceLabel: {
    fontSize: 14.5,
    fontWeight: '700',
  },
  priceSub: {
    fontSize: 10.5,
    color: EHColors.inkSubtle,
    marginTop: 2,
  },

  // ── Popular section ─────────────────────────────────────────
  popularSection: {
    paddingTop: 24,
  },
  popularHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  popularTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: EHColors.ink,
    letterSpacing: -0.2,
  },
  seeAll: {
    fontSize: 12,
    fontWeight: '700',
    color: EHColors.copper,
  },
  carouselContent: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 4,
  },
  carouselItem: {
    marginRight: 12,
  },
});
