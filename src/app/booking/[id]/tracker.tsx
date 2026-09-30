import { Pressable, StyleSheet, Text, View, ScrollView, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';

import { EHColors } from '@/constants/colors';
import { CATERERS } from '@/constants/data';

const STAGES = [
  { id: 1, title: 'Deposit secured', meta: 'Paid into EventHunters escrow • receipt #EH-4471' },
  { id: 2, title: 'Caterer confirmed', meta: 'Zuva Feast accepted and locked your date' },
  { id: 3, title: 'Menu finalised', meta: 'Wedding Buffet • 220 plates • signed off' },
  { id: 4, title: 'Event day', meta: 'Sat 14 Dec • service from 12:30' },
  { id: 5, title: 'Funds released', meta: '48 hours after the event, unless you dispute' }
];

export default function BookingTrackerScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const caterer = CATERERS.find(c => c.id === id) || CATERERS[0];
  
  const currentStage = 3; 

  const handleChat = () => {
    router.push(`/booking/${id}/chat` as any);
  };

  return (
    <View style={styles.root}>
      {/* HEADER */}
      <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={20} color={EHColors.ink} />
          </Pressable>
          <View style={styles.headerTitleBox}>
            <Text style={styles.headerTitle}>Escrow Active</Text>
            <Text style={styles.headerSubtitle}>{caterer.name}</Text>
          </View>
          <Pressable onPress={handleChat} style={styles.chatBtn}>
            <Feather name="message-square" size={20} color={EHColors.navy} />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}>
        <View style={styles.content}>
          <View style={styles.escrowBanner}>
            <Feather name="shield" size={28} color={EHColors.green} />
            <Text style={styles.escrowTitle}>Deposit is secure</Text>
            <Text style={styles.escrowMeta}>$1,089 held safely in EventHunters Escrow.</Text>
          </View>

          <View style={styles.trackerCard}>
            <Text style={styles.trackerTitle}>Booking Progress</Text>
            <View style={styles.trackerLine} />
            
            <View style={styles.tracker}>
              {STAGES.map((stage, index) => {
                const isCompleted = stage.id <= currentStage;
                const isCurrent = stage.id === currentStage;
                const isLast = index === STAGES.length - 1;

                return (
                  <View key={stage.id} style={styles.stageRow}>
                    <View style={styles.timelineCol}>
                      <View style={[
                        styles.node, 
                        isCompleted ? styles.nodeCompleted : styles.nodePending,
                      ]}>
                        {isCompleted && <Feather name="check" size={14} color={EHColors.white} />}
                      </View>
                      {!isLast && (
                        <View style={[
                          styles.line, 
                          stage.id < currentStage ? styles.lineCompleted : styles.linePending
                        ]} />
                      )}
                    </View>
                    <View style={[styles.textCol, !isLast && { paddingBottom: 24 }]}>
                      <Text style={[styles.stageTitle, isCurrent && styles.stageTitleCurrent, !isCompleted && styles.stageTitlePending]}>
                        {stage.title}
                      </Text>
                      <Text style={[styles.stageMeta, !isCompleted && styles.stageMetaPending]}>
                        {stage.meta}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM ACTION BAR */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom || 24 }]}>
        <View style={styles.bottomBarContent}>
          <View style={styles.bottomBarTextCol}>
            <Text style={styles.bottomBarTitle}>Need help?</Text>
            <Text style={styles.bottomBarSub}>Contact EventHunters Support</Text>
          </View>
          <Pressable 
            style={styles.deliveryBtn}
            onPress={() => router.push(`/booking/${id}/delivery` as any)}
          >
            <Text style={styles.deliveryBtnText}>Event Day Options</Text>
          </Pressable>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: EHColors.pageBg },
  
  headerContainer: {
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
  headerTitleBox: { alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: EHColors.green },
  headerSubtitle: { fontSize: 13, color: EHColors.inkSecondary, marginTop: 2 },
  chatBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F0F4F8', alignItems: 'center', justifyContent: 'center' },

  scroll: { flex: 1 },
  content: { padding: 20 },

  escrowBanner: { alignItems: 'center', padding: 24, backgroundColor: EHColors.greenBg, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(46,125,91,0.2)', marginBottom: 24 },
  escrowTitle: { fontSize: 18, fontWeight: '700', color: EHColors.green, marginTop: 12, marginBottom: 6 },
  escrowMeta: { fontSize: 14, color: EHColors.green, textAlign: 'center' },

  trackerCard: { backgroundColor: EHColors.white, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: EHColors.navyBorderLight },
  trackerTitle: { fontSize: 18, fontWeight: '700', color: EHColors.ink, marginBottom: 24 },
  trackerLine: { height: 1, backgroundColor: EHColors.navyBorderLight, marginBottom: 24, marginHorizontal: -20 },

  tracker: { paddingHorizontal: 8 },
  stageRow: { flexDirection: 'row' },
  timelineCol: { alignItems: 'center', width: 32, marginRight: 16 },
  node: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 2 },
  nodeCompleted: { backgroundColor: EHColors.green, borderColor: EHColors.green },
  nodePending: { backgroundColor: EHColors.white, borderColor: EHColors.navyBorderLight },
  line: { width: 2, flex: 1, marginVertical: 4 },
  lineCompleted: { backgroundColor: EHColors.green },
  linePending: { backgroundColor: EHColors.navyBorderLight },
  
  textCol: { flex: 1, paddingTop: 4 },
  stageTitle: { fontSize: 16, fontWeight: '700', color: EHColors.ink, marginBottom: 4 },
  stageTitleCurrent: { color: EHColors.ink },
  stageTitlePending: { color: EHColors.inkSecondary },
  stageMeta: { fontSize: 14, color: EHColors.inkSecondary, lineHeight: 20 },
  stageMetaPending: { color: EHColors.inkPlaceholder },

  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: EHColors.white, borderTopWidth: 1, borderTopColor: EHColors.navyBorderLight,
    paddingHorizontal: 20, paddingTop: 16,
    ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.05, shadowRadius: 12 }, android: { elevation: 12 } }),
  },
  bottomBarContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  bottomBarTextCol: { flex: 1 },
  bottomBarTitle: { fontSize: 16, fontWeight: '700', color: EHColors.ink, marginBottom: 2 },
  bottomBarSub: { fontSize: 13, color: EHColors.inkSecondary },
  deliveryBtn: { backgroundColor: EHColors.navy, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 },
  deliveryBtnText: { color: EHColors.white, fontWeight: '700', fontSize: 14 },
});
