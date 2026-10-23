/**
 * Tab bar layout — matches the prototype's bottom navigation.
 *
 * 4 tabs: Home, Browse, Bookings, Account.
 * Uses simple View-based icons to match the prototype's geometric shapes.
 */

import { Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

import { tabScreenOptions } from '@/constants/tab-bar';
import { logger } from '@/utils/logger';

export default function TabLayout() {
  logger.debug('TabLayout rendered');

  return (
    <Tabs
      screenOptions={tabScreenOptions}
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
