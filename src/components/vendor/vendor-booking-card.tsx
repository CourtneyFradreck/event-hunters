import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { StatusBadge } from '@/components/booking/booking-summary';
import { ui } from '@/components/ui/screen';
import type { Booking } from '@/store/booking-model';
import { formatUSD } from '@/utils/money';
import { DashboardCard } from './dashboard-card';

export function VendorBookingCard({ booking, request = false }: { booking: Booking; request?: boolean }) {
  return <Pressable accessibilityRole="button"
    accessibilityLabel={`${booking.organiserName}, ${booking.eventType}, ${booking.guests} guests`}
    onPress={() => router.push(request
      ? { pathname: '/vendor/requests/[id]', params: { id: booking.id } }
      : { pathname: '/vendor/bookings/[id]', params: { id: booking.id } })}>
    <DashboardCard><View style={ui.stack}>
      <Text style={ui.title}>{booking.organiserName}</Text>
      <Text style={ui.body}>{booking.eventType} · {booking.date} · {booking.guests} guests</Text>
      <Text style={ui.muted}>{booking.suburb} · {booking.venue}</Text>
      <StatusBadge booking={booking} />
      {booking.quote && <Text style={ui.muted}>Total {formatUSD(booking.quote.total)} · deposit {formatUSD(booking.quote.deposit)}</Text>}
      <Text style={ui.label}>{request ? 'Review request →' : 'View booking →'}</Text>
    </View></DashboardCard>
  </Pressable>;
}
