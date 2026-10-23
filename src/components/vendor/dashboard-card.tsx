import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { EHColors } from '@/constants/colors';

export function DashboardCard({ children }: { children: ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: EHColors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: EHColors.navyBorder,
    shadowColor: EHColors.navyShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
});
