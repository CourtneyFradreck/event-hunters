/**
 * Selectable chip — used for event types, suburbs, and filters.
 * Mirrors the prototype's rounded pill-style toggle buttons.
 */

import { Pressable, StyleSheet, Text } from 'react-native';

import { EHColors } from '@/constants/colors';

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  /** Use the copper accent palette instead of navy. */
  variant?: 'navy' | 'copper';
  size?: 'default' | 'small';
}

export function Chip({
  label,
  selected,
  onPress,
  variant = 'navy',
  size = 'default',
}: ChipProps) {
  const isCopper = variant === 'copper';

  const bgColor = selected
    ? isCopper
      ? EHColors.copperBg
      : EHColors.navy
    : EHColors.cardBg;

  const borderColor = selected
    ? isCopper
      ? EHColors.copper
      : EHColors.navy
    : EHColors.navyBorderLight;

  const textColor = selected
    ? isCopper
      ? EHColors.copperDark
      : EHColors.white
    : EHColors.inkSecondary;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        size === 'small' && styles.chipSmall,
        { backgroundColor: bgColor, borderColor },
      ]}
    >
      <Text
        style={[
          styles.label,
          size === 'small' && styles.labelSmall,
          { color: textColor },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 11,
    borderWidth: 1.2,
  },
  chipSmall: {
    paddingVertical: 8,
    paddingHorizontal: 11,
  },
  label: {
    fontSize: 12.5,
    fontWeight: '600',
  },
  labelSmall: {
    fontSize: 12,
  },
});
