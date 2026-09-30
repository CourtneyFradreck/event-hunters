const fs = require('fs');

// Helper to replace navy header with white floating header
function upgradeHeader(file, title) {
  let code = fs.readFileSync(file, 'utf8');
  
  // Replace imports if needed
  if (!code.includes('Platform')) {
    code = code.replace(/import \{([^}]+)\} from 'react-native';/, 'import { $1, Platform } from \'react-native\';');
  }

  // Replace header JSX
  code = code.replace(
    /<View style=\{\[styles\.header, \{ paddingTop: insets\.top \+ 16 \}\]\}>[\s\S]*?<\/View>/,
    `<View style={[styles.headerContainer, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={20} color={EHColors.ink} />
          </Pressable>
          <Text style={styles.headerTitle}>${title}</Text>
          <View style={{ width: 40 }} />
        </View>
      </View>`
  );

  // Replace header styles
  code = code.replace(
    /header: \{[\s\S]*?\},[\s]*headerTitle: \{[\s\S]*?\},[\s]*backBtn: \{[\s\S]*?\},/,
    `headerContainer: {
    backgroundColor: EHColors.white,
    borderBottomWidth: 1, borderBottomColor: EHColors.navyBorderLight,
    paddingBottom: 12,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8 },
      android: { elevation: 4 }
    }),
    zIndex: 10,
  },
  headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: EHColors.pageBg, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: EHColors.ink },`
  );

  fs.writeFileSync(file, code);
}

try {
  upgradeHeader('src/app/booking/[id]/delivery.tsx', 'Event Day');
  upgradeHeader('src/app/booking/[id]/dispute.tsx', 'Open Dispute');
  upgradeHeader('src/app/booking/[id]/rate.tsx', 'Rate Caterer');
  upgradeHeader('src/app/booking/[id]/chat.tsx', 'Chat');
} catch (e) {
  console.log(e);
}
