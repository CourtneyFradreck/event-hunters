import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { VendorProfile } from '@/components/vendor/vendor-profile';
import { NEW_REQUEST_COUNT, VendorRequests } from '@/components/vendor/vendor-requests';
import { VendorWallet } from '@/components/vendor/vendor-wallet';
import { EHColors } from '@/constants/colors';
import { CATERERS } from '@/constants/data';

const MY_PROFILE = CATERERS[0];
const TABS = [
  { key: 'requests', label: `Requests (${NEW_REQUEST_COUNT})` },
  { key: 'wallet', label: 'Wallet' },
  { key: 'menu', label: 'My Profile' },
] as const;

export default function VendorScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'requests' | 'wallet' | 'menu'>('requests');

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.headerTopRow}>
          <View style={styles.headerTitleBox}>
            <Text style={styles.headerGreeting}>Vendor Dashboard</Text>
            <Text style={styles.headerTitle}>{MY_PROFILE.name}</Text>
          </View>
          <View style={styles.ratingBadge}>
            <Feather name="star" size={12} color={EHColors.copperDark} />
            <Text style={styles.ratingText}>{MY_PROFILE.rating}</Text>
          </View>
        </View>
        <View style={styles.tabsRow} accessibilityRole="tablist">
          {TABS.map(tab => (
            <Pressable
              key={tab.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: activeTab === tab.key }}
              onPress={() => setActiveTab(tab.key)}
              style={[styles.tabBtn, activeTab === tab.key && styles.tabBtnActive]}
            >
              <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 16, paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'requests' && <VendorRequests />}
        {activeTab === 'wallet' && <VendorWallet />}
        {activeTab === 'menu' && <VendorProfile profile={MY_PROFILE} />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: EHColors.pageBg },
  header: { backgroundColor: EHColors.navy },
  headerTopRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 18, paddingBottom: 20, gap: 12,
  },
  headerTitleBox: { flex: 1 },
  headerGreeting: { fontSize: 13, color: EHColors.navySoft, marginBottom: 2 },
  headerTitle: { fontSize: 22, fontWeight: '600', color: EHColors.white },
  ratingBadge: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: EHColors.copperBg,
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4,
  },
  ratingText: { fontSize: 13, fontWeight: '700', color: EHColors.copperDark },
  tabsRow: { flexDirection: 'row', paddingHorizontal: 18, gap: 24 },
  tabBtn: { paddingVertical: 12, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabBtnActive: { borderBottomColor: EHColors.copper },
  tabText: { fontSize: 15, fontWeight: '500', color: EHColors.navySoft },
  tabTextActive: { color: EHColors.white, fontWeight: '600' },
  scroll: { flex: 1 },
});
