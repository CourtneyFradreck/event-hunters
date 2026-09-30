import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';

import { EHColors } from '@/constants/colors';
import { CATERERS } from '@/constants/data';

const STAGES = [
  { id: 1, title: 'Deposit secured', meta: 'Paid into EventHunters escrow · receipt #EH-4471' },
  { id: 2, title: 'Caterer confirmed', meta: 'Zuva Feast accepted and locked your date' },
  { id: 3, title: 'Menu finalised', meta: 'Wedding Buffet · 220 plates · signed off by both sides' },
  { id: 4, title: 'Event day', meta: 'Sat 14 Dec · service from 12:30' },
  { id: 5, title: 'Funds released', meta: '48 hours after the event, unless you dispute' }
];

export default function BookingTrackerScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const caterer = CATERERS.find(c => c.id === id) || CATERERS[0];
  
  // Mock current stage
  const currentStage = 3; 

  const handleChat = () => {
    router.push(`/booking/${id}/chat`);
  };

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={18} color={EHColors.white} />
        </Pressable>
        <View style={styles.headerTitleBox}>
          <Text style={styles.headerTitle}>Escrow Active</Text>
          <Text style={styles.headerSubtitle}>{caterer.name}</Text>
        </View>
        <Pressable onPress={handleChat} style={styles.chatBtn}>
          <Feather name="message-square" size={18} color={EHColors.white} />
        </Pressable>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>Booking Progress</Text>
        <Text style={styles.meta}>Your deposit of $1,089 is held securely in escrow.</Text>

        <View style={styles.tracker}>
          {STAGES.map((stage, index) => {
            const isCompleted = stage.id <= currentStage;
            const isCurrent = stage.id === currentStage;
            const isLast = index === STAGES.length - 1;

            return (
              <View key={stage.id} style={styles.stageRow}>
                {/* Timeline graphics */}
                <View style={styles.timelineCol}>
                  <View style={[
                    styles.node, 
                    isCompleted ? styles.nodeCompleted : styles.nodePending,
                    isCurrent && styles.nodeCurrent
                  ]}>
                    {isCompleted && !isCurrent && <Feather name="check" size={12} color={EHColors.white} />}
                    {isCurrent && <View style={styles.nodeCurrentInner} />}
                  </View>
                  {!isLast && (
                    <View style={[
                      styles.line, 
                      stage.id < currentStage ? styles.lineCompleted : styles.linePending
                    ]} />
                  )}
                </View>

                {/* Content */}
                <View style={styles.stageContent}>
                  <Text style={[styles.stageTitle, !isCompleted && styles.textPending]}>
                    {stage.title}
                  </Text>
                  <Text style={styles.stageMeta}>{stage.meta}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <Pressable 
          style={styles.actionBtn} 
          onPress={() => router.push(`/booking/${id}/delivery`)}
        >
          <Text style={styles.actionBtnText}>Event Day Options</Text>
          <Feather name="arrow-right" size={18} color={EHColors.white} />
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: EHColors.pageBg },
  header: {
    backgroundColor: EHColors.navy,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingBottom: 16,
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center', justifyContent: 'center',
  },
  chatBtn: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: EHColors.copper,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitleBox: { alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '600', color: EHColors.white },
  headerSubtitle: { fontSize: 12, color: EHColors.navySoft, marginTop: 2 },
  content: { padding: 24, flex: 1 },
  title: { fontSize: 22, fontWeight: '700', color: EHColors.ink, marginBottom: 4 },
  meta: { fontSize: 14, color: EHColors.inkSecondary, marginBottom: 32 },
  tracker: { backgroundColor: EHColors.white, padding: 24, borderRadius: 16, borderWidth: 1, borderColor: EHColors.navyBorderLight },
  stageRow: { flexDirection: 'row', alignItems: 'flex-start' },
  timelineCol: { width: 32, alignItems: 'center', marginRight: 12 },
  node: {
    width: 24, height: 24, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    zIndex: 2, backgroundColor: EHColors.white,
  },
  nodeCompleted: { backgroundColor: EHColors.green },
  nodeCurrent: { borderWidth: 2, borderColor: EHColors.copper },
  nodeCurrentInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: EHColors.copper },
  nodePending: { borderWidth: 2, borderColor: EHColors.navyBorderMedium },
  line: { width: 2, height: 40, marginTop: -4, marginBottom: -4, zIndex: 1 },
  lineCompleted: { backgroundColor: EHColors.green },
  linePending: { backgroundColor: EHColors.navyBorderMedium },
  stageContent: { flex: 1, paddingBottom: 28 },
  stageTitle: { fontSize: 16, fontWeight: '600', color: EHColors.ink, marginBottom: 4 },
  textPending: { color: EHColors.inkLabel },
  stageMeta: { fontSize: 13, color: EHColors.inkSecondary, lineHeight: 18 },
  actionBtn: {
    backgroundColor: EHColors.navy,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 14, borderRadius: 12, marginTop: 24, gap: 8
  },
  actionBtnText: { color: EHColors.white, fontSize: 16, fontWeight: '600' },
});
