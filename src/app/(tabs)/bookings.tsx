import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';

import { EHColors } from '@/constants/colors';
import { EscrowIcon } from '@/components/ui/escrow-icon';

// Mock bookings data
const MOCK_BOOKINGS = [
  {
    id: 'b1',
    catererId: 'zuva',
    catererName: 'Zuva Feast Catering',
    eventType: 'Wedding',
    date: '14 Dec 2026',
    guests: 220,
    status: 'action_required',
    amount: '$3,630',
    deposit: '$1,089',
  },
  {
    id: 'b3',
    catererId: 'sadza',
    catererName: 'Sadza & Sage',
    eventType: 'Kitchen Party',
    date: '10 Nov 2026',
    guests: 80,
    status: 'escrow_held',
    deposit: '$320',
  },
  {
    id: 'b2',
    catererId: 'table',
    catererName: 'The Harare Table',
    eventType: 'Corporate',
    date: '21 Dec 2026',
    guests: 50,
    status: 'pending_quote',
  },
];

export default function BookingsScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  return (
    <View style={styles.root}>
      {/* HEADER */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.headerTopRow}>
          <Text style={styles.headerTitle}>My Bookings</Text>
        </View>

        {/* TABS */}
        <View style={styles.tabsRow}>
          <Pressable
            onPress={() => setActiveTab('upcoming')}
            style={[styles.tabBtn, activeTab === 'upcoming' && styles.tabBtnActive]}
          >
            <Text style={[styles.tabText, activeTab === 'upcoming' && styles.tabTextActive]}>
              Upcoming (3)
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('past')}
            style={[styles.tabBtn, activeTab === 'past' && styles.tabBtnActive]}
          >
            <Text style={[styles.tabText, activeTab === 'past' && styles.tabTextActive]}>
              Past (0)
            </Text>
          </Pressable>
        </View>
      </View>

      {/* CONTENT */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: insets.bottom + 96, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'upcoming' ? (
          <View style={styles.listContainer}>
            {MOCK_BOOKINGS.map((booking) => (
              <Pressable
                key={booking.id}
                onPress={() => {
                  // If it's action_required, maybe route to compare or book?
                  // For now we'll route to the book screen if they need to pay
                  if (booking.status === 'action_required') {
                    router.push(`/caterer/${booking.catererId}/book` as any);
                  } else {
                    router.push(`/caterer/${booking.catererId}` as any);
                  }
                }}
                style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.cardHeaderLeft}>
                    <Text style={styles.catererName}>{booking.catererName}</Text>
                    <Text style={styles.eventDetails}>
                      {booking.eventType}  {booking.date}  {booking.guests} guests
                    </Text>
                  </View>
                  <Feather name="chevron-right" size={20} color={EHColors.inkMuted} />
                </View>

                {/* Status Section */}
                <View style={styles.statusBox}>
                  {booking.status === 'action_required' && (
                    <>
                      <View style={[styles.statusTag, styles.statusTagCopper]}>
                        <Text style={styles.statusTagCopperText}>Quote received</Text>
                      </View>
                      <Text style={styles.statusMessage}>
                        Deposit of <Text style={{ fontWeight: '700' }}>{booking.deposit}</Text> required to secure this booking.
                      </Text>
                    </>
                  )}
                  {booking.status === 'pending_quote' && (
                    <>
                      <View style={[styles.statusTag, styles.statusTagNavy]}>
                        <Text style={styles.statusTagNavyText}>Pending quote</Text>
                      </View>
                      <Text style={styles.statusMessage}>
                        Waiting for caterer to respond to your request.
                      </Text>
                    </>
                  )}
                  {booking.status === 'escrow_held' && (
                    <>
                      <View style={[styles.statusTag, styles.statusTagGreen]}>
                        <EscrowIcon size="small" />
                        <Text style={[styles.statusTagGreenText, { marginLeft: 4 }]}>Deposit secured</Text>
                      </View>
                      <Text style={styles.statusMessage}>
                        {booking.deposit} held in escrow. Caterer locked in.
                      </Text>
                    </>
                  )}
                </View>
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No past bookings</Text>
            <Text style={styles.emptyDesc}>Your completed events will appear here.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: EHColors.pageBg,
  },
  header: {
    backgroundColor: EHColors.navy,
  },
  headerTopRow: {
    paddingHorizontal: 18,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: EHColors.white,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 18,
  },
  tabBtn: {
    marginRight: 24,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: EHColors.copper,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: EHColors.navySoft,
  },
  tabTextActive: {
    color: EHColors.white,
    fontWeight: '600',
  },
  scroll: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 18,
    gap: 16,
  },
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
  cardPressed: {
    backgroundColor: EHColors.sandWarm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardHeaderLeft: {
    flex: 1,
    paddingRight: 12,
  },
  catererName: {
    fontSize: 16,
    fontWeight: '600',
    color: EHColors.ink,
    marginBottom: 4,
  },
  eventDetails: {
    fontSize: 13,
    color: EHColors.inkMuted,
  },
  statusBox: {
    backgroundColor: EHColors.sandBg,
    borderRadius: 12,
    padding: 12,
    alignItems: 'flex-start',
  },
  statusTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  statusTagCopper: {
    backgroundColor: EHColors.copperBg,
  },
  statusTagCopperText: {
    color: EHColors.copperDark,
    fontSize: 12,
    fontWeight: '600',
  },
  statusTagNavy: {
    backgroundColor: '#E5ECF2',
  },
  statusTagNavyText: {
    color: EHColors.navy,
    fontSize: 12,
    fontWeight: '600',
  },
  statusTagGreen: {
    backgroundColor: EHColors.greenBg,
  },
  statusTagGreenText: {
    color: EHColors.green,
    fontSize: 12,
    fontWeight: '600',
  },
  statusMessage: {
    fontSize: 13,
    color: EHColors.inkSecondary,
    lineHeight: 18,
  },
  emptyState: {
    paddingTop: 40,
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: EHColors.ink,
    marginBottom: 8,
  },
  emptyDesc: {
    fontSize: 14,
    color: EHColors.inkMuted,
    textAlign: 'center',
  },
});
