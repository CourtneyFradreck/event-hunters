const fs = require('fs');

function fixStyles(file) {
  let code = fs.readFileSync(file, 'utf8');
  
  // Nuke old styles (header, backBtn, headerTitle are grouped usually)
  code = code.replace(/header: \{[\s\S]*?\},/, '');
  code = code.replace(/headerTitle: \{[\s\S]*?\},/, '');
  code = code.replace(/backBtn: \{[\s\S]*?\},/, '');
  code = code.replace(/backBtnPressed: \{[\s\S]*?\},/, '');

  const newStyles = `  headerContainer: {
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
  headerTitle: { fontSize: 18, fontWeight: '700', color: EHColors.ink },`;

  code = code.replace(/const styles = StyleSheet.create\(\{[\s\n]*root: \{[\s\S]*?\},/, (match) => match + '\n' + newStyles);
  
  fs.writeFileSync(file, code);
}

try {
  fixStyles('src/app/booking/[id]/delivery.tsx');
  fixStyles('src/app/booking/[id]/dispute.tsx');
  fixStyles('src/app/booking/[id]/rate.tsx');
  fixStyles('src/app/booking/[id]/chat.tsx');
} catch (e) {
  console.log(e);
}
