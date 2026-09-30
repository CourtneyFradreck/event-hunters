import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, Image, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';

import { EHColors } from '@/constants/colors';
import { EscrowIcon } from '@/components/ui/escrow-icon';
import { CATERERS } from '@/constants/data';

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
      {/* WHITE FLOATING HEADER */}
      <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>My Bookings</Text>
        </View>

        {/* PILL TABS */}
        <View style={styles.tabsContainer}>
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
            {MOCK_BOOKINGS.map((booking) => {
              const catererInfo = CATERERS.find(c => c.id === booking.catererId);
              
              return (
                <Pressable
                  key={booking.id}
                  onPress={() => {
                    if (booking.status === 'action_required') {
                      router.push(`/caterer/${booking.catererId}/book` as any);
                    } else if (booking.status === 'escrow_held') {
                      router.push(`/booking/${booking.catererId}/tracker` as any);
                    } else {
                      router.push(`/caterer/${booking.catererId}` as any);
                    }
                  }}
                  style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
                >
                  <View style={styles.cardHeader}>
                    {catererInfo?.photo && (
                      <Image source={{ uri: catererInfo.photo }} style={styles.catererThumb} />
                    )}
                    <View style={styles.cardHeaderInfo}>
                      <Text style={styles.catererName}>{booking.catererName}</Text>
                      <Text style={styles.eventDetails}>
                        {booking.eventType} • {booking.date}
                      </Text>
                      <Text style={styles.eventSubDetails}>{booking.guests} guests</Text>
                    </View>
                    <View style={styles.chevronBox}>
                      <Feather name="chevron-right" size={20} color={EHColors.inkPlaceholder} />
                    </View>
                  </View>

                  <View style={styles.divider} />

                  {/* Status Section */}
                  <View style={styles.statusSection}>
                    {booking.status === 'action_required' && (
                      <View style={styles.statusRow}>
                        <View style={[styles.iconCircle, { backgroundColor: EHColors.copperBg }]}>
                          <Feather name="file-text" size={16} color={EHColors.copperDark} />
                        </View>
                        <View style={styles.statusTextCol}>
                          <Text style={[styles.statusTitle, { color: EHColors.copperDark }]}>Quote Received</Text>
                          <Text style={styles.statusDesc}>Deposit of <Text style={{ fontWeight: '700' }}>{booking.deposit}</Text> required to secure booking.</Text>
                        </View>
                      </View>
                    )}
                    {booking.status === 'pending_quote' && (
                      <View style={styles.statusRow}>
                        <View style={[styles.iconCircle, { backgroundColor: '#F0F4F8' }]}>
                          <Feather name="clock" size={16} color={EHColors.navySoft} />
                        </View>
                        <View style={styles.statusTextCol}>
                          <Text style={[styles.statusTitle, { color: EHColors.navy }]}>Pending Quote</Text>
                          <Text style={styles.statusDesc}>Waiting for caterer to respond.</Text>
                        </View>
                      </View>
                    )}
                    {booking.status === 'escrow_held' && (
                      <View style={styles.statusRow}>
                        <View style={[styles.iconCircle, { backgroundColor: EHColors.greenBg }]}>
                          <EscrowIcon size="small" />
                        </View>
                        <View style={styles.statusTextCol}>
                          <Text style={[styles.statusTitle, { color: EHColors.green }]}>Deposit Secured</Text>
                          <Text style={styles.statusDesc}>{booking.deposit} held in escrow. Caterer locked in.</Text>
                        </View>
                      </View>
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconBox}>
              <Feather name="calendar" size={32} color={EHColors.navyBorderMedium} />
            </View>
            <Text style={styles.emptyTitle}>No past bookings</Text>
            <Text style={styles.emptyDesc}>Your completed events will appear here.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: EHColors.pageBg },
  
  headerContainer: {
    backgroundColor: EHColors.white,
    borderBottomWidth: 1, borderBottomColor: EHColors.navyBorderLight,
    paddingBottom: 16,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8 },
      android: { elevation: 4 }
    }),
    zIndex: 10,
  },
  headerContent: {
    paddingHorizontal: 20, paddingTop: 12, paddingBottom: 16,
  },
  headerTitle: { fontSize: 28, fontWeight: '700', color: EHColors.ink },
  
  tabsContainer: {
    flexDirection: 'row', backgroundColor: EHColors.pageBg,
    marginHorizontal: 20, borderRadius: 24, padding: 4,
    borderWidth: 1, borderColor: EHColors.navyBorderLight,
  },
  tabBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  tabBtnActive: {
    backgroundColor: EHColors.white,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
      android: { elevation: 2 }
    }),
  },
  tabText: { fontSize: 14, fontWeight: '600', color: EHColors.inkSecondary },
  tabTextActive: { color: EHColors.ink },

  scroll: { flex: 1 },
  listContainer: { paddingHorizontal: 20, gap: 16 },
  
  card: {
    backgroundColor: EHColors.white,
    borderRadius: 20,
    borderWidth: 1, borderColor: EHColors.navyBorderLight,
    ...Platform.select({
      ios: { shadowColor: EHColors.navyShadow, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12 },
      android: { elevation: 3 }
    }),
  },
  cardPressed: { backgroundColor: EHColors.sandBg },
  
  cardHeader: {
    flexDirection: 'row', alignItems: 'center', padding: 16,
  },
  catererThumb: {
    width: 60, height: 60, borderRadius: 16, marginRight: 16, backgroundColor: EHColors.sandDark,
  },
  cardHeaderInfo: { flex: 1, justifyContent: 'center' },
  catererName: { fontSize: 16, fontWeight: '700', color: EHColors.ink, marginBottom: 4 },
  eventDetails: { fontSize: 13, color: EHColors.inkSecondary, fontWeight: '500' },
  eventSubDetails: { fontSize: 13, color: EHColors.inkMuted, marginTop: 2 },
  chevronBox: { paddingLeft: 8 },

  divider: { height: 1, backgroundColor: EHColors.navyBorderLight, marginHorizontal: 16 },

  statusSection: { padding: 16 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconCircle: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  statusTextCol: { flex: 1 },
  statusTitle: { fontSize: 14, fontWeight: '700', marginBottom: 2 },
  statusDesc: { fontSize: 13, color: EHColors.inkSecondary, lineHeight: 18 },

  emptyState: { paddingTop: 64, alignItems: 'center', paddingHorizontal: 32 },
  emptyIconBox: { width: 64, height: 64, borderRadius: 32, backgroundColor: EHColors.white, alignItems: 'center', justifyContent: 'center', marginBottom: 16, borderWidth: 1, borderColor: EHColors.navyBorderLight },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: EHColors.ink, marginBottom: 8 },
  emptyDesc: { fontSize: 15, color: EHColors.inkMuted, textAlign: 'center' },
});
