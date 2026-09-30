import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EHColors } from '@/constants/colors';

export default function ComplianceScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      {/* HEADER */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={20} color={EHColors.ink} />
          </Pressable>
          <Text style={styles.headerTitle}>Compliance Vault</Text>
          <View style={{ width: 40 }} />
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={{ padding: 20 }}>
        
        <View style={styles.statusBanner}>
          <Feather name="check-circle" size={24} color={EHColors.green} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.bannerTitle}>Fully Compliant</Text>
            <Text style={styles.bannerDesc}>Your business meets all EventHunters requirements for this season.</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Required Documents</Text>
        
        <View style={styles.docList}>
          {[
            { id: 1, title: 'Health & Safety Certificate', status: 'Verified', expiry: 'Expires 14 Dec 2027' },
            { id: 2, title: 'Business License', status: 'Verified', expiry: 'Expires 01 Jan 2028' },
            { id: 3, title: 'Public Liability Insurance', status: 'Action Required', expiry: 'Expires in 12 days' },
          ].map(doc => {
            const isVerified = doc.status === 'Verified';
            return (
              <View key={doc.id} style={styles.docItem}>
                <View style={styles.docIconBox}>
                  <Feather name="file-text" size={20} color={EHColors.navy} />
                </View>
                <View style={styles.docInfo}>
                  <Text style={styles.docTitle}>{doc.title}</Text>
                  <Text style={[styles.docStatus, { color: isVerified ? EHColors.green : EHColors.copperDark }]}>
                    {doc.status} • {doc.expiry}
                  </Text>
                </View>
                {!isVerified && (
                  <Pressable style={styles.uploadBtn}>
                    <Text style={styles.uploadBtnText}>Update</Text>
                  </Pressable>
                )}
              </View>
            );
          })}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: EHColors.pageBg },
  header: { backgroundColor: EHColors.white, borderBottomWidth: 1, borderBottomColor: EHColors.navyBorderLight },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: EHColors.pageBg },
  headerTitle: { fontSize: 18, fontWeight: '700', color: EHColors.ink },
  scroll: { flex: 1 },

  statusBanner: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: EHColors.greenBg,
    padding: 20, borderRadius: 20, marginBottom: 32,
    borderWidth: 1, borderColor: 'rgba(46, 125, 91, 0.2)',
  },
  bannerTitle: { fontSize: 16, fontWeight: '700', color: EHColors.green, marginBottom: 4 },
  bannerDesc: { fontSize: 13, color: EHColors.green, lineHeight: 18 },

  sectionTitle: { fontSize: 18, fontWeight: '700', color: EHColors.ink, marginBottom: 16 },
  
  docList: { gap: 12 },
  docItem: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: EHColors.white,
    padding: 16, borderRadius: 16,
    borderWidth: 1, borderColor: EHColors.navyBorderLight,
  },
  docIconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: EHColors.sandBg, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  docInfo: { flex: 1 },
  docTitle: { fontSize: 15, fontWeight: '600', color: EHColors.ink, marginBottom: 4 },
  docStatus: { fontSize: 13 },
  
  uploadBtn: { backgroundColor: EHColors.copperBg, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  uploadBtnText: { color: EHColors.copperDark, fontWeight: '700', fontSize: 13 },
});
