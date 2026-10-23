import { StyleSheet } from 'react-native';

import { EHColors } from './colors';

const styles = StyleSheet.create({
  tabBar: { backgroundColor: EHColors.pageBg, borderTopWidth: 1, borderTopColor: EHColors.navyBorder, paddingTop: 4 },
  tabBarLabel: { fontSize: 10, lineHeight: 12, flexShrink: 0, fontWeight: '700', letterSpacing: 0.1 },
  tabBarIcon: { height: 22 },
  badge: { backgroundColor: EHColors.copper, color: EHColors.white },
});

export const tabScreenOptions = {
  headerShown: false,
  tabBarActiveTintColor: EHColors.copper,
  tabBarInactiveTintColor: EHColors.inkPlaceholder,
  tabBarStyle: styles.tabBar,
  tabBarLabelStyle: styles.tabBarLabel,
  tabBarIconStyle: styles.tabBarIcon,
  tabBarBadgeStyle: styles.badge,
  tabBarHideOnKeyboard: true,
};
