/**
 * Escrow lock icon — the padlock drawn with pure CSS/Views
 * that appears throughout the prototype to brand the escrow feature.
 */

import { StyleSheet, View } from 'react-native';

import { EHColors } from '@/constants/colors';

interface EscrowIconProps {
  /** Overall scale factor. Default size produces a ~26×30 icon. */
  size?: 'small' | 'medium' | 'large';
}

const SIZES = {
  small: { shackleW: 13, shackleH: 8, bodyW: 19, bodyH: 14, border: 2.2, shackleR: 7 },
  medium: { shackleW: 15, shackleH: 9, bodyW: 22, bodyH: 16, border: 2.4, shackleR: 8 },
  large: { shackleW: 20, shackleH: 12, bodyW: 30, bodyH: 22, border: 3, shackleR: 11 },
};

export function EscrowIcon({ size = 'medium' }: EscrowIconProps) {
  const s = SIZES[size];
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.shackle,
          {
            width: s.shackleW,
            height: s.shackleH,
            borderWidth: s.border,
            borderTopLeftRadius: s.shackleR,
            borderTopRightRadius: s.shackleR,
          },
        ]}
      />
      <View
        style={[
          styles.body,
          {
            width: s.bodyW,
            height: s.bodyH,
            borderRadius: s.border + 2,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  shackle: {
    borderColor: EHColors.copperLight,
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  body: {
    backgroundColor: EHColors.copperLight,
  },
});
