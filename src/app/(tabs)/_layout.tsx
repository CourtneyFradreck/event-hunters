/**
 * Tab bar layout — matches the prototype's bottom navigation.
 *
 * 4 tabs: Home, Browse, Bookings, Vendor.
 * Uses simple View-based icons to match the prototype's geometric shapes.
 */

import { Tabs } from 'expo-router';
import { StyleSheet, View, type ColorValue } from 'react-native';

import { EHColors } from '@/constants/colors';
import { logger } from '@/utils/logger';

/** Simple geometric icon matching the prototype's tab bar shapes. */
function TabIcon({ color, radius }: { color: string | ColorValue; radius: number }) {
  return (
    <View
      style={[
        styles.tabIcon,
        {
          borderColor: color,
          borderRadius: radius,
          backgroundColor: color === EHColors.copper ? color : 'transparent',
        },
      ]}
    />
  );
}

export default function TabLayout() {
  logger.debug('TabLayout rendered');

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: EHColors.copper,
        tabBarInactiveTintColor: EHColors.inkPlaceholder,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabIcon color={color} radius={6} />,
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: 'Browse',
          tabBarIcon: ({ color }) => <TabIcon color={color} radius={9} />,
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color }) => <TabIcon color={color} radius={3} />,
        }}
      />
      <Tabs.Screen
        name="vendor"
        options={{
          title: 'Vendor',
          tabBarIcon: ({ color }) => <TabIcon color={color} radius={9} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: EHColors.pageBg,
    borderTopWidth: 1,
    borderTopColor: EHColors.navyBorder,
    paddingTop: 4,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  tabIcon: {
    width: 18,
    height: 18,
    borderWidth: 2,
  },
});
