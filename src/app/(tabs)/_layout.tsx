/**
 * Tab bar layout — matches the prototype's bottom navigation.
 *
 * 4 tabs: Home, Browse, Bookings, Vendor.
 * Uses simple View-based icons to match the prototype's geometric shapes.
 */

import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import { EHColors } from '@/constants/colors';
import { logger } from '@/utils/logger';

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
          tabBarIcon: ({ color }) => <Feather name="home" size={20} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: 'Browse',
          tabBarIcon: ({ color }) => <Feather name="search" size={20} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color }) => <Feather name="calendar" size={20} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <Feather name="user" size={20} color={color as string} />,
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
});
