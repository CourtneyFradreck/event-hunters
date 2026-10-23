import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, Text, View } from 'react-native';

import { EscrowIcon } from '@/components/ui/escrow-icon';
import { EHColors } from '@/constants/colors';

import { DashboardCard } from './dashboard-card';

// Mock requests for the logged-in vendor, independent of organiser bookings.
const MOCK_REQUESTS = [
  {
    id: 'req1',
    organiserName: 'Rutendo M.',
    eventType: 'Wedding',
    date: '14 Dec 2026',
    guests: 260,
    status: 'needs_quote',
    timeAgo: '2 hours ago',
  },
  {
    id: 'req2',
    organiserName: 'Pastor Chikore',
    eventType: 'Church Conference',
    date: '5 Jan 2027',
    guests: 400,
    status: 'escrow_secured',
    amount: '$6,200',
    deposit: '$1,860',
  },
] as const;

export const NEW_REQUEST_COUNT = MOCK_REQUESTS.filter(request => request.status === 'needs_quote').length;

export function VendorRequests() {
  return (
    <View style={styles.container}>
      <View style={styles.statsCard}>
        <View style={styles.statsIconBox}>
          <EscrowIcon size="medium" />
        </View>
        <View>
          <Text style={styles.statsLabel}>Total in Escrow</Text>
          <Text style={styles.statsValue}>$1,860</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Active Bookings</Text>
      {MOCK_REQUESTS.map(request => (
        <DashboardCard key={request.id}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <Text style={styles.organiserName}>{request.organiserName}</Text>
              <Text style={styles.eventDetails}>
                {request.eventType} · {request.date} · {request.guests} guests
              </Text>
            </View>
            {request.status === 'needs_quote' && (
              <Text style={styles.timeAgo}>{request.timeAgo}</Text>
            )}
          </View>
          <View style={styles.statusBox}>
            {request.status === 'needs_quote' ? (
              <>
                <View style={[styles.statusTag, styles.statusTagCopper]}>
                  <Text style={styles.statusTagCopperText}>New Request</Text>
                </View>
                <Text style={styles.statusMessage}>
                  Review requirements and send a quote to secure this booking.
                </Text>
                <View style={styles.actionBtn}>
                  <Text style={styles.actionBtnText}>Create Quote</Text>
                  <Feather name="arrow-right" size={16} color={EHColors.white} />
                </View>
              </>
            ) : (
              <>
                <View style={[styles.statusTag, styles.statusTagGreen]}>
                  <EscrowIcon size="small" />
                  <Text style={styles.statusTagGreenText}>Deposit secured</Text>
                </View>
                <Text style={styles.statusMessage}>
                  {request.deposit} held in escrow. You are booked!
                </Text>
              </>
            )}
          </View>
        </DashboardCard>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  statsCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: EHColors.navy,
    borderRadius: 16, padding: 16, marginBottom: 8,
  },
  statsIconBox: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', justifyContent: 'center', marginRight: 16,
  },
  statsLabel: { fontSize: 13, color: EHColors.navySoft, marginBottom: 2 },
  statsValue: { fontSize: 24, fontWeight: '700', color: EHColors.white },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: EHColors.ink, marginTop: 8, marginBottom: 4 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  cardHeaderLeft: { flex: 1, paddingRight: 12 },
  organiserName: { fontSize: 16, fontWeight: '600', color: EHColors.ink, marginBottom: 4 },
  eventDetails: { fontSize: 13, color: EHColors.inkMuted },
  timeAgo: { fontSize: 12, color: EHColors.inkLabel },
  statusBox: { backgroundColor: EHColors.sandBg, borderRadius: 12, padding: 12, alignItems: 'flex-start' },
  statusTag: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8,
    paddingVertical: 4, borderRadius: 6, marginBottom: 8,
  },
  statusTagCopper: { backgroundColor: EHColors.copperBg },
  statusTagCopperText: { color: EHColors.copperDark, fontSize: 12, fontWeight: '600' },
  statusTagGreen: { backgroundColor: EHColors.greenBg },
  statusTagGreenText: { color: EHColors.green, fontSize: 12, fontWeight: '600', marginLeft: 4 },
  statusMessage: { fontSize: 13, color: EHColors.inkSecondary, lineHeight: 18, marginBottom: 12 },
  actionBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: EHColors.navy,
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, gap: 6,
    alignSelf: 'stretch', justifyContent: 'center',
  },
  actionBtnText: { color: EHColors.white, fontSize: 14, fontWeight: '600' },
});
