import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { StatusBadge } from '@/components/booking/booking-summary';
import { Chip } from '@/components/ui/chip';
import { EmptyState, Screen, ui } from '@/components/ui/screen';
import { DashboardCard } from '@/components/vendor/dashboard-card';
import { useBookingsStore } from '@/store/useBookingsStore';
import { isTerminal } from '@/utils/booking';
import { formatUSD } from '@/utils/money';

export default function BookingsScreen() {
  const [past, setPast] = useState(false);
  const bookings = useBookingsStore(state => state.bookings);
  const upcoming = bookings.filter(booking => !isTerminal(booking.status));
  const previous = bookings.filter(booking => isTerminal(booking.status));
  const visible = past ? previous : upcoming;
  return <Screen title="My Bookings" subtitle="Your brief, quote and escrow updates in one place">
    <View style={ui.row}>
      <Chip label={`Upcoming (${upcoming.length})`} selected={!past} onPress={() => setPast(false)} />
      <Chip label={`Past (${previous.length})`} selected={past} onPress={() => setPast(true)} />
    </View>
    {visible.map(booking => <Pressable key={booking.id} accessibilityRole="button"
      accessibilityLabel={`${booking.eventType} booking for ${booking.organiserName}, ${booking.guests} guests`}
      onPress={() => router.push({ pathname: '/booking/[id]/tracker', params: { id: booking.id } })}>
      <DashboardCard><View style={ui.stack}>
        <Text style={ui.title}>{booking.catererName}</Text>
        <Text style={ui.body}>{booking.eventType} · {booking.date} · {booking.guests} guests</Text>
        <Text style={ui.muted}>{booking.organiserName} · {booking.venue}</Text>
        <StatusBadge booking={booking} />
        {booking.quote && <Text style={ui.muted}>Deposit {formatUSD(booking.quote.deposit)} · total {formatUSD(booking.quote.total)}</Text>}
      </View></DashboardCard>
    </Pressable>)}
    {!visible.length && <EmptyState title={past ? 'No past bookings' : 'No upcoming bookings'} />}
  </Screen>;
}
