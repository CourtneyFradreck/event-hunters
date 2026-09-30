import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';

import { EHColors } from '@/constants/colors';
import { EscrowIcon } from '@/components/ui/escrow-icon';
import { CATERERS } from '@/constants/data';

// Mock data for the logged-in vendor
const MY_PROFILE = CATERERS[0]; // Zuva Feast Catering

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
  }
];

export default function VendorScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'requests' | 'menu'>('requests');

  return (
    <View style={styles.root}>
      {/* HEADER */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.headerTopRow}>
          <View>
            <Text style={styles.headerGreeting}>Vendor Dashboard</Text>
            <Text style={styles.headerTitle}>{MY_PROFILE.name}</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.ratingBadge}>
              <Feather name="star" size={12} color={EHColors.copperDark} />
              <Text style={styles.ratingText}>{MY_PROFILE.rating}</Text>
            </View>
          </View>
        </View>

        {/* TABS */}
        <View style={styles.tabsRow}>
          <Pressable
            onPress={() => setActiveTab('requests')}
            style={[styles.tabBtn, activeTab === 'requests' && styles.tabBtnActive]}
          >
            <Text style={[styles.tabText, activeTab === 'requests' && styles.tabTextActive]}>
              Requests (1)
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('menu')}
            style={[styles.tabBtn, activeTab === 'menu' && styles.tabBtnActive]}
          >
            <Text style={[styles.tabText, activeTab === 'menu' && styles.tabTextActive]}>
              My Profile
            </Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: insets.bottom + 96, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'requests' ? (
          <View style={styles.listContainer}>
            {/* ESCROW STATS */}
            <View style={styles.statsCard}>
              <View style={styles.statsIconBox}>
                <EscrowIcon size="medium" />
              </View>
              <View style={styles.statsInfo}>
                <Text style={styles.statsLabel}>Total in Escrow</Text>
                <Text style={styles.statsValue}>$1,860</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Active Bookings</Text>

            {MOCK_REQUESTS.map((req) => (
              <Pressable
                key={req.id}
                style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
                onPress={() => {
                  // In a real app, this would open a specific request detail screen
                }}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.cardHeaderLeft}>
                    <Text style={styles.organiserName}>{req.organiserName}</Text>
                    <Text style={styles.eventDetails}>
                      {req.eventType}  {req.date}  {req.guests} guests
                    </Text>
                  </View>
                  {req.status === 'needs_quote' && (
                    <Text style={styles.timeAgo}>{req.timeAgo}</Text>
                  )}
                </View>

                {/* Status Section */}
                <View style={styles.statusBox}>
                  {req.status === 'needs_quote' && (
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
                  )}
                  {req.status === 'escrow_secured' && (
                    <>
                      <View style={[styles.statusTag, styles.statusTagGreen]}>
                        <EscrowIcon size="small" />
                        <Text style={[styles.statusTagGreenText, { marginLeft: 4 }]}>Deposit secured</Text>
                      </View>
                      <Text style={styles.statusMessage}>
                        {req.deposit} held in escrow. You are booked!
                      </Text>
                    </>
                  )}
                </View>
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={styles.profileContainer}>
            <View style={styles.card}>
              <View style={styles.profileHeader}>
                <Text style={styles.profileSectionTitle}>Profile Settings</Text>
                <Feather name="edit-2" size={18} color={EHColors.copper} />
              </View>
              <Text style={styles.profileText}>Service: {MY_PROFILE.service}</Text>
              <Text style={styles.profileText}>Cuisine: {MY_PROFILE.cuisine}</Text>
              <Text style={styles.profileText}>Location: {MY_PROFILE.suburb}</Text>
              
              <View style={styles.divider} />
              
              <Text style={styles.profileSectionTitle}>Packages ({MY_PROFILE.packages?.length || 0})</Text>
              {MY_PROFILE.packages?.map((pkg, idx) => (
                <View key={idx} style={styles.packageItem}>
                  <View style={styles.packageHeader}>
                    <Text style={styles.packageName}>{pkg.name}</Text>
                    <Text style={styles.packagePrice}>{pkg.price}</Text>
                  </View>
                  <Text style={styles.packageDishes}>{pkg.dishes}</Text>
                </View>
              ))}
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingBottom: 20,
  },
  headerGreeting: {
    fontSize: 13,
    color: EHColors.navySoft,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: EHColors.white,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: EHColors.copperBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: EHColors.copperDark,
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
  profileContainer: {
    paddingHorizontal: 18,
  },
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: EHColors.navy,
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
  },
  statsIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  statsInfo: {
    flex: 1,
  },
  statsLabel: {
    fontSize: 13,
    color: EHColors.navySoft,
    marginBottom: 2,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: '700',
    color: EHColors.white,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: EHColors.ink,
    marginTop: 8,
    marginBottom: 4,
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
  organiserName: {
    fontSize: 16,
    fontWeight: '600',
    color: EHColors.ink,
    marginBottom: 4,
  },
  eventDetails: {
    fontSize: 13,
    color: EHColors.inkMuted,
  },
  timeAgo: {
    fontSize: 12,
    color: EHColors.inkLabel,
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
    marginBottom: 12,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: EHColors.navy,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  actionBtnText: {
    color: EHColors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: EHColors.ink,
    marginBottom: 8,
  },
  profileText: {
    fontSize: 14,
    color: EHColors.inkSecondary,
    marginBottom: 6,
  },
  divider: {
    height: 1,
    backgroundColor: EHColors.navyBorder,
    marginVertical: 16,
  },
  packageItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: EHColors.navyBorderLight,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  packageName: {
    fontSize: 14,
    fontWeight: '600',
    color: EHColors.ink,
  },
  packagePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: EHColors.copperDark,
  },
  packageDishes: {
    fontSize: 13,
    color: EHColors.inkMuted,
    lineHeight: 18,
  },
});
