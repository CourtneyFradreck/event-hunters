import Feather from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router';

import { tabScreenOptions } from '@/constants/tab-bar';
import { useBookingsStore } from '@/store/useBookingsStore';

export default function VendorTabs() {
  const count = useBookingsStore(state => state.bookings.filter(booking =>
    booking.catererId === state.vendorProfile.id && booking.status === 'requested').length);
  return <Tabs screenOptions={tabScreenOptions}>
    <Tabs.Screen name="index" options={{ title: 'Requests', tabBarBadge: count || undefined,
      tabBarIcon: ({ color }) => <Feather name="inbox" size={20} color={color} /> }} />
    <Tabs.Screen name="bookings" options={{ title: 'Bookings',
      tabBarIcon: ({ color }) => <Feather name="calendar" size={20} color={color} /> }} />
    <Tabs.Screen name="menu" options={{ title: 'Menu',
      tabBarIcon: ({ color }) => <Feather name="book-open" size={20} color={color} /> }} />
    <Tabs.Screen name="wallet" options={{ title: 'Wallet',
      tabBarIcon: ({ color }) => <Feather name="credit-card" size={20} color={color} /> }} />
    <Tabs.Screen name="account" options={{ title: 'Account',
      tabBarIcon: ({ color }) => <Feather name="user" size={20} color={color} /> }} />
  </Tabs>;
}
