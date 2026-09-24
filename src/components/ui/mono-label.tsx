/**
 * Mono-label — the small uppercase IBM Plex Mono-style labels
 * used throughout the prototype (e.g. "EVENT TYPE", "GUESTS", "SUBURB").
 */

import { StyleSheet, Text, type TextProps } from 'react-native';

import { EHColors } from '@/constants/colors';

interface MonoLabelProps extends TextProps {
  children: string;
}

export function MonoLabel({ children, style, ...rest }: MonoLabelProps) {
  return (
    <Text style={[styles.label, style]} {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: EHColors.inkSubtle,
  },
});
