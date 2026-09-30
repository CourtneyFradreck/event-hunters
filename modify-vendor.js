const fs = require('fs');
let code = fs.readFileSync('temp_vendor.tsx', 'utf8');

// 1. Update state type
code = code.replace(
  /useState<'requests' \| 'menu'>\('requests'\)/,
  `useState<'requests' | 'wallet' | 'menu'>('requests')`
);

// 2. Add Wallet Tab button
const tabsReplacement = `
          <Pressable
            onPress={() => setActiveTab('wallet')}
            style={[styles.tabBtn, activeTab === 'wallet' && styles.tabBtnActive]}
          >
            <Text style={[styles.tabText, activeTab === 'wallet' && styles.tabTextActive]}>
              Wallet
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('menu')}
`;
code = code.replace(/<Pressable\s+onPress=\{\(\) => setActiveTab\('menu'\)\}/, tabsReplacement);

// 3. Add Wallet Content View
const walletContent = `
        ) : activeTab === 'wallet' ? (
          <View style={styles.walletContainer}>
            <View style={styles.card}>
              <Text style={styles.walletTitle}>Available Balance</Text>
              <Text style={styles.walletAmount}>$1,940</Text>
              <Text style={styles.walletSub}>Released 12 Dec</Text>
              <Pressable style={styles.actionBtn}>
                <Text style={styles.actionBtnText}>Withdraw to EcoCash</Text>
              </Pressable>
            </View>

            <View style={[styles.card, { marginTop: 16 }]}>
              <View style={styles.walletRow}>
                <View>
                  <Text style={styles.walletMetaTitle}>Held in escrow</Text>
                  <Text style={styles.walletMetaSub}>3 bookings pending</Text>
                </View>
                <Text style={styles.walletMetaAmount}>$4,187</Text>
              </View>
            </View>
          </View>
`;
code = code.replace(/\) : \(\s*<View style=\{styles.profileContainer\}>/, walletContent + ') : (\n          <View style={styles.profileContainer}>');

// 4. Add Compliance Vault to Profile
const complianceContent = `
              <View style={styles.divider} />
              <View style={styles.profileHeader}>
                <Text style={styles.profileSectionTitle}>Compliance Vault</Text>
              </View>
              <Text style={styles.profileText}>Your Verified badge depends on these staying current.</Text>
              <View style={styles.packageItem}>
                <View style={styles.packageHeader}>
                  <Text style={styles.packageName}>Health & Safety Cert</Text>
                  <Text style={styles.packagePrice}>Valid</Text>
                </View>
                <Text style={styles.packageDishes}>Expires 14 Nov 2027</Text>
              </View>
              <Pressable style={styles.renewBtn}>
                <Text style={styles.renewBtnText}>Renew Documents</Text>
              </Pressable>
`;
code = code.replace(/<\/View>\s*<\/View>\s*<\/ScrollView>/, complianceContent + '\n            </View>\n          </View>\n        )}</ScrollView>');

// 5. Add styles
const newStyles = `
  walletContainer: { paddingHorizontal: 18 },
  walletTitle: { fontSize: 14, color: EHColors.inkSecondary, marginBottom: 4 },
  walletAmount: { fontSize: 36, fontWeight: '700', color: EHColors.ink, marginBottom: 8 },
  walletSub: { fontSize: 13, color: EHColors.green, fontWeight: '600', marginBottom: 24 },
  walletRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  walletMetaTitle: { fontSize: 15, fontWeight: '600', color: EHColors.ink },
  walletMetaSub: { fontSize: 13, color: EHColors.inkMuted, marginTop: 2 },
  walletMetaAmount: { fontSize: 18, fontWeight: '700', color: EHColors.ink },
  renewBtn: { backgroundColor: EHColors.sandDark, paddingVertical: 10, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  renewBtnText: { color: EHColors.ink, fontSize: 14, fontWeight: '600' },
`;
code = code.replace(/packageDishes: \{[^\}]+\},/, match => match + newStyles);

fs.writeFileSync('src/app/(tabs)/vendor.tsx', code);
