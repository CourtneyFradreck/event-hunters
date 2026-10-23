/**
 * CatererCard — the card used in the "Popular this season" horizontal carousel.
 * Shows a placeholder photo area, verified badge, name, suburb, price, and rating.
 */

import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { EHColors } from '@/constants/colors';
import type { Caterer } from '@/constants/data';
import { useCaterers } from '@/hooks/use-caterers';
import { formatUSD } from '@/utils/money';

interface CatererCardProps {
  caterer: Caterer;
  onPress?: () => void;
  variant?: 'compact' | 'full';
}

export function CatererCard({ caterer: original, onPress, variant = 'compact' }: CatererCardProps) {
  const caterers = useCaterers();
  const caterer = caterers.find(item => item.id === original.id) ?? original;
  const isFull = variant === 'full';
  const priceText = `${formatUSD(caterer.lo)}–${formatUSD(caterer.hi)}`;
  const ratingText = isFull ? caterer.rating.toString() : `${caterer.rating} (${caterer.reviews})`;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        isFull && styles.cardFull,
        pressed && styles.cardPressed,
      ]}
    >
      {/* Photo placeholder */}
      <View style={[styles.photoArea, isFull && styles.photoAreaFull]}>
        <Image source={{ uri: caterer.photo }} style={StyleSheet.absoluteFill} />
        {caterer.booked && isFull && (
          <View style={styles.bookedBadge}>
            <Text style={styles.bookedText}>Booked {caterer.booked}</Text>
          </View>
        )}
        {/* Removed text label since we have the real image now */}
        {caterer.verified && (
          <View style={styles.verifiedBadge}>
            <MaterialIcons name="verified" size={12} color={EHColors.white} />
            <Text style={styles.verifiedText}>VERIFIED</Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.info}>
        <View style={isFull ? styles.fullHeaderRow : undefined}>
          <View style={isFull ? styles.fullHeaderLeft : undefined}>
            <Text style={[styles.name, isFull && styles.nameFull]} numberOfLines={1}>
              {caterer.name}
            </Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              {caterer.suburb} · {caterer.cuisine}
            </Text>
          </View>
          {isFull && (
            <View style={styles.fullHeaderRight}>
              <Text style={styles.price}>{priceText}</Text>
              <Text style={styles.perHeadText}>per head</Text>
            </View>
          )}
        </View>

        {!isFull ? (
          <View style={styles.row}>
            <Text style={styles.price}>{priceText}</Text>
            <View style={styles.ratingRow}>
              <MaterialIcons name="star" size={14} color={EHColors.copper} />
              <Text style={styles.rating}>{ratingText}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.tagsRow}>
            <View style={styles.ratingRowFull}>
              <MaterialIcons name="star" size={14} color={EHColors.copper} />
              <Text style={styles.ratingFull}>{ratingText}</Text>
            </View>
            <Text style={styles.reviewsText}>{caterer.reviews} reviews</Text>
            <View style={styles.divider} />
            <View style={styles.serviceTag}>
              <Text style={styles.serviceTagText}>{caterer.service}</Text>
            </View>
            <View style={styles.availTag}>
              <Text style={styles.availTagText}>{caterer.booked ? 'Unavailable' : 'Available'}</Text>
            </View>
          </View>
        )}
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
    shadowColor: EHColors.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 11,
    elevation: 4,
  },
  cardFull: {
    width: '100%',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 14,
    borderRadius: 20,
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
  photoAreaFull: {
    height: 142,
    padding: 9,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
  bookedBadge: {
    position: 'absolute',
    top: 9,
    left: 9,
    backgroundColor: '#F3DEDE',
    borderWidth: 1,
    borderColor: '#E0B9B9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  bookedText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#7A2F2F',
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
  nameFull: {
    fontSize: 16,
    letterSpacing: -0.2,
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
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    fontSize: 11.5,
    fontWeight: '600',
    color: EHColors.ink,
  },
  fullHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  fullHeaderLeft: {
    flex: 1,
  },
  fullHeaderRight: {
    alignItems: 'flex-end',
  },
  perHeadText: {
    fontSize: 11.5,
    color: EHColors.inkLabel,
    marginTop: 2,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 11,
  },
  ratingRowFull: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingFull: {
    fontSize: 12,
    fontWeight: '700',
    color: EHColors.ink,
  },
  reviewsText: {
    fontSize: 11.5,
    color: EHColors.inkMuted,
  },
  divider: {
    width: 1,
    height: 12,
    backgroundColor: 'rgba(27,58,92,0.15)',
  },
  serviceTag: {
    backgroundColor: '#EAF0F6',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 7,
  },
  serviceTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: EHColors.navy,
  },
  availTag: {
    backgroundColor: '#E6F2EC',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 7,
  },
  availTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2E7D5B',
  },
});
