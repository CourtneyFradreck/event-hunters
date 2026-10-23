import Feather from '@expo/vector-icons/Feather';
import { Text, View } from 'react-native';

import { ui } from '@/components/ui/screen';
import { DashboardCard } from '@/components/vendor/dashboard-card';
import { EHColors } from '@/constants/colors';
import type { Booking } from '@/store/booking-model';
import { STATUS_LABELS } from '@/utils/booking';

export function BookingTimeline({ booking }: { booking: Booking }) {
  return <DashboardCard><View style={ui.stack}>
    <Text style={ui.title}>Escrow &amp; booking timeline</Text>
    {booking.history.map((entry, index) => <View key={`${entry.status}-${index}`} style={ui.row}>
      <Feather name="check-circle" size={20} color={entry.status === 'disputed' ? EHColors.red : EHColors.green} />
      <View style={ui.grow}><Text style={ui.label}>{STATUS_LABELS[entry.status]}</Text>
        <Text style={ui.muted}>{new Date(entry.at).toLocaleString()}</Text></View>
    </View>)}
    <Text style={ui.muted}>Delivery marked by the caterer keeps the deposit locked. Only organiser confirmation releases it.</Text>
  </View></DashboardCard>;
}
