/**
 * CatererCard — the card used in the "Popular this season" horizontal carousel.
 * Shows a placeholder photo area, verified badge, name, suburb, price, and rating.
 */

import { Pressable, StyleSheet, Text, View } from 'react-native';

import { EHColors } from '@/constants/colors';
import type { Caterer } from '@/constants/data';

interface CatererCardProps {
  caterer: Caterer;
  onPress?: () => void;
}

export function CatererCard({ caterer, onPress }: CatererCardProps) {
  const priceText = `$${caterer.lo}–${caterer.hi}`;
  const ratingText = `${caterer.rating} (${caterer.reviews})`;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      {/* Photo placeholder */}
      <View style={styles.photoArea}>
        <Text style={styles.photoLabel}>{caterer.photo}</Text>
        {caterer.verified && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✓ VERIFIED</Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {caterer.name}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {caterer.suburb} · {caterer.service}
        </Text>
        <View style={styles.row}>
          <Text style={styles.price}>{priceText}</Text>
          <Text style={styles.rating}>★ {ratingText}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 214,
    backgroundColor: EHColors.cardBg,
    borderWidth: 1,
    borderColor: EHColors.navyBorder,
    borderRadius: 18,
    overflow: 'hidden',
    // shadow
    shadowColor: EHColors.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 11,
    elevation: 4,
  },
  cardPressed: {
    borderColor: EHColors.copper,
  },
  photoArea: {
    height: 118,
    backgroundColor: '#E6DFD3',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 8,
  },
  photoLabel: {
    fontSize: 9,
    color: '#6E6353',
    backgroundColor: 'rgba(255,255,255,0.75)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    overflow: 'hidden',
  },
  verifiedBadge: {
    backgroundColor: EHColors.navy,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
  },
  verifiedText: {
    fontSize: 9,
    fontWeight: '500',
    color: EHColors.white,
    letterSpacing: 0.4,
  },
  info: {
    paddingHorizontal: 12,
    paddingTop: 11,
    paddingBottom: 13,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: EHColors.ink,
  },
  subtitle: {
    fontSize: 11.5,
    color: EHColors.inkLabel,
    marginTop: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 9,
  },
  price: {
    fontSize: 12,
    fontWeight: '700',
    color: EHColors.copper,
  },
  rating: {
    fontSize: 11.5,
    fontWeight: '600',
    color: EHColors.ink,
  },
});
