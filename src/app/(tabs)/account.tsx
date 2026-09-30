import { Pressable, ScrollView, StyleSheet, Text, View, Image, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';

import { EHColors } from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';

export default function AccountScreen() {
  const insets = useSafeAreaInsets();
  const { role, logout } = useAuth();
  
  const isCaterer = role === 'caterer';

  const handleLogout = () => {
    logout();
    router.replace('/auth/welcome');
  };

  return (
    <View style={styles.root}>
      {/* HEADER */}
      <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Account</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}>
        {/* PROFILE CARD */}
        <View style={styles.profileSection}>
          <View style={styles.avatarCircle}>
            <Feather name={isCaterer ? "briefcase" : "user"} size={32} color={EHColors.navy} />
          </View>
          <Text style={styles.profileName}>{isCaterer ? 'Zuva Feast Catering' : 'Jane Doe'}</Text>
          <Text style={styles.profileEmail}>{isCaterer ? 'hello@zuvafeast.com' : 'jane.doe@example.com'}</Text>
          <View style={[styles.roleBadge, isCaterer ? styles.roleBadgeCaterer : styles.roleBadgeOrganiser]}>
            <Text style={[isCaterer ? styles.roleTextCaterer : styles.roleTextOrganiser]}>
              {isCaterer ? 'Verified Caterer' : 'Event Organiser'}
            </Text>
          </View>
        </View>

        {/* CATERER MENU */}
        {isCaterer && (
          <View style={styles.menuGroup}>
            <Text style={styles.menuGroupTitle}>Business Dashboard</Text>
            
            <Pressable style={styles.menuItem} onPress={() => router.push('/account/wallet')}>
              <View style={[styles.menuIconBox, { backgroundColor: EHColors.greenBg }]}>
                <Feather name="dollar-sign" size={18} color={EHColors.green} />
              </View>
              <Text style={styles.menuItemText}>Escrow Wallet</Text>
              <Feather name="chevron-right" size={20} color={EHColors.inkPlaceholder} />
            </Pressable>
            
            <Pressable style={styles.menuItem} onPress={() => router.push('/account/compliance')}>
              <View style={[styles.menuIconBox, { backgroundColor: EHColors.copperBg }]}>
                <Feather name="shield" size={18} color={EHColors.copperDark} />
              </View>
              <Text style={styles.menuItemText}>Compliance Vault</Text>
              <Feather name="chevron-right" size={20} color={EHColors.inkPlaceholder} />
            </Pressable>
            
            <Pressable style={styles.menuItem}>
              <View style={[styles.menuIconBox, { backgroundColor: '#F0F4F8' }]}>
                <Feather name="calendar" size={18} color={EHColors.navy} />
              </View>
              <Text style={styles.menuItemText}>Manage Bookings</Text>
              <Feather name="chevron-right" size={20} color={EHColors.inkPlaceholder} />
            </Pressable>
          </View>
        )}

        {/* GENERAL MENU */}
        <View style={styles.menuGroup}>
          <Text style={styles.menuGroupTitle}>Settings</Text>
          
          <Pressable style={styles.menuItem}>
            <View style={[styles.menuIconBox, { backgroundColor: '#F0F4F8' }]}>
              <Feather name="settings" size={18} color={EHColors.navySoft} />
            </View>
            <Text style={styles.menuItemText}>Preferences</Text>
            <Feather name="chevron-right" size={20} color={EHColors.inkPlaceholder} />
          </Pressable>
          
          <Pressable style={styles.menuItem}>
            <View style={[styles.menuIconBox, { backgroundColor: '#F0F4F8' }]}>
              <Feather name="bell" size={18} color={EHColors.navySoft} />
            </View>
            <Text style={styles.menuItemText}>Notifications</Text>
            <Feather name="chevron-right" size={20} color={EHColors.inkPlaceholder} />
          </Pressable>
          
          <Pressable style={styles.menuItem}>
            <View style={[styles.menuIconBox, { backgroundColor: '#F0F4F8' }]}>
              <Feather name="help-circle" size={18} color={EHColors.navySoft} />
            </View>
            <Text style={styles.menuItemText}>Support</Text>
            <Feather name="chevron-right" size={20} color={EHColors.inkPlaceholder} />
          </Pressable>
        </View>

        {/* LOGOUT */}
        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Feather name="log-out" size={18} color={EHColors.red} />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
        
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
    paddingHorizontal: 20, paddingTop: 12,
  },
  headerTitle: { fontSize: 28, fontWeight: '700', color: EHColors.ink },
  
  scroll: { flex: 1 },
  
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: EHColors.white,
    borderBottomWidth: 1, borderBottomColor: EHColors.navyBorderLight,
  },
  avatarCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: EHColors.sandBg,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1, borderColor: EHColors.navyBorderLight,
  },
  profileName: { fontSize: 20, fontWeight: '700', color: EHColors.ink, marginBottom: 4 },
  profileEmail: { fontSize: 14, color: EHColors.inkSecondary, marginBottom: 12 },
  
  roleBadge: {
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 12, borderWidth: 1,
  },
  roleBadgeCaterer: { backgroundColor: EHColors.copperBg, borderColor: 'rgba(202, 107, 72, 0.2)' },
  roleTextCaterer: { color: EHColors.copperDark, fontWeight: '700', fontSize: 12 },
  
  roleBadgeOrganiser: { backgroundColor: '#F0F4F8', borderColor: EHColors.navyBorderLight },
  roleTextOrganiser: { color: EHColors.navy, fontWeight: '700', fontSize: 12 },
  
  menuGroup: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  menuGroupTitle: {
    fontSize: 13, fontWeight: '700', color: EHColors.inkLabel,
    textTransform: 'uppercase', letterSpacing: 0.5,
    marginBottom: 12, marginLeft: 4,
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: EHColors.white,
    padding: 16, borderRadius: 16,
    marginBottom: 8,
    borderWidth: 1, borderColor: EHColors.navyBorderLight,
  },
  menuIconBox: {
    width: 36, height: 36, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    marginRight: 16,
  },
  menuItemText: {
    flex: 1, fontSize: 15, fontWeight: '600', color: EHColors.ink,
  },
  
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    marginHorizontal: 20, marginTop: 32,
    backgroundColor: 'rgba(216, 70, 70, 0.1)',
    paddingVertical: 16, borderRadius: 16,
  },
  logoutText: { fontSize: 16, fontWeight: '700', color: EHColors.red },
});