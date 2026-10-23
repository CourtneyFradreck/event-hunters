import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';

import { EHColors } from '@/constants/colors';
import { EVENT_TYPES, SUBURBS, DATES, type EventType, type Suburb } from '@/constants/data';
import { logger } from '@/utils/logger';
import { useBookingsStore } from '@/store/useBookingsStore';
import { useCaterers } from '@/hooks/use-caterers';

const SERVICE_MODELS = ['Drop-off', 'Chef-only', 'Full-service'];
const BUDGETS = ['< $2k', '$2k – $3k', '$3k – $4k', '$4k+'];



export default function QuoteRequestScreen() {
  const { id } = useLocalSearchParams();
  const caterers = useCaterers();
  const caterer = caterers.find((c) => c.id === id) || caterers[0];
  const requestQuote = useBookingsStore(state => state.requestQuote);
  const insets = useSafeAreaInsets();

  // Mock state
  const [eventType, setEventType] = useState<EventType>('Wedding');
  const [guests, setGuests] = useState(220);
  const [dateIdx, setDateIdx] = useState(0);
  const [suburb, setSuburb] = useState<Suburb>('Borrowdale');
  const [service, setService] = useState('Full-service');
  const [dietary, setDietary] = useState('12 vegetarian, 4 halal, no pork at the main buffet.');
  const [budget, setBudget] = useState('$3k – $4k');
  const [venue, setVenue] = useState('Borrowdale event venue');
  const [error, setError] = useState('');

  const date = DATES[dateIdx];

  const incGuests = () => setGuests((g) => Math.min(1000, g + 20));
  const decGuests = () => setGuests((g) => Math.max(20, g - 20));
  const nextDate = () => setDateIdx((i) => (i + 1) % DATES.length);

  const handleSendBrief = () => {
    logger.debug('Sending brief to caterers...', {
      caterer: caterer.name,
      eventType,
      guests,
      date,
      suburb,
      service,
      budget,
    });
    const bookingId = requestQuote(caterer.id, { eventType, guests, date, suburb, venue,
      service, notes: `${dietary}\nBudget: ${budget}` });
    if (!bookingId) { setError('Please add a venue before sending your brief.'); return; }
    router.push({ pathname: '/caterer/[id]/sent', params: { id: caterer.id, bookingId } });
  };



  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.header, { paddingTop: insets.top || 16 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={18} color={EHColors.navy} />
        </Pressable>
        <Text style={styles.headerTitle}>Request a quote</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.introText}>
          Send your event brief to {caterer.name} in {suburb}. Their reply will appear in your bookings.
        </Text>

        <View style={styles.formCard}>
          <Text style={styles.fieldLabel}>EVENT TYPE</Text>
          <ChipList items={EVENT_TYPES} selected={eventType} onSelect={setEventType} />

          <View style={styles.row}>
            {/* Guests */}
            <View style={styles.halfBox}>
              <Text style={styles.fieldLabel}>GUESTS</Text>
              <View style={styles.counterRow}>
                <Pressable onPress={decGuests} style={styles.counterBtn}>
                  <Feather name="minus" size={16} color={EHColors.navy} />
                </Pressable>
                <Text style={styles.counterValue}>{guests}</Text>
                <Pressable onPress={incGuests} style={styles.counterBtn}>
                  <Feather name="plus" size={16} color={EHColors.navy} />
                </Pressable>
              </View>
            </View>

            {/* Date */}
            <Pressable onPress={nextDate} style={styles.halfBox}>
              <Text style={styles.fieldLabel}>DATE</Text>
              <Text style={styles.dateValue}>{date}</Text>
            </Pressable>
          </View>

          <Text style={[styles.fieldLabel, { marginTop: 16 }]}>VENUE SUBURB</Text>
          <ChipList items={SUBURBS} selected={suburb} onSelect={setSuburb} />
          <Text style={[styles.fieldLabel, { marginTop: 16 }]}>VENUE NAME / ADDRESS</Text>
          <TextInput accessibilityLabel="Venue" style={styles.textInput} value={venue} onChangeText={setVenue} />

          <Text style={[styles.fieldLabel, { marginTop: 16 }]}>SERVICE MODEL</Text>
          <ChipList items={SERVICE_MODELS} selected={service} onSelect={setService} />

          <Text style={[styles.fieldLabel, { marginTop: 16 }]}>DIETARY NOTES</Text>
          <TextInput
            style={styles.textInput}
            multiline
            value={dietary}
            onChangeText={setDietary}
            placeholder="E.g. 10 vegetarian, no pork..."
            placeholderTextColor={EHColors.inkPlaceholder}
          />

          <Text style={[styles.fieldLabel, { marginTop: 16 }]}>TOTAL BUDGET</Text>
          <ChipList items={BUDGETS} selected={budget} onSelect={setBudget} />
        </View>

        {!!error && <Text style={{ color: EHColors.red, margin: 18 }}>{error}</Text>}
        <Pressable
          onPress={handleSendBrief}
          style={({ pressed }) => [styles.submitBtn, pressed && styles.submitBtnPressed]}
        >
          <Text style={styles.submitBtnText}>Send quote request</Text>
        </Pressable>
        <Text style={styles.footerNote}>Free · no card needed to request quotes</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingBottom: 12,
    gap: 12,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#F1EDE6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: EHColors.ink,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 18,
  },
  introText: {
    fontSize: 12.5,
    color: EHColors.inkLabel,
    lineHeight: 18,
  },
  formCard: {
    backgroundColor: EHColors.white,
    borderWidth: 1,
    borderColor: 'rgba(27,58,92,0.1)',
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
  },
  fieldLabel: {
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: '#8B96A3',
    fontWeight: '600',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginTop: 9,
  },
  chip: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 11,
    borderWidth: 1.2,
  },
  chipText: {
    fontSize: 12.5,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  halfBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(27,58,92,0.13)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  counterBtn: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: '#F1EDE6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterValue: {
    fontSize: 19,
    fontWeight: '700',
    color: EHColors.ink,
  },
  dateValue: {
    fontSize: 16,
    fontWeight: '700',
    color: EHColors.ink,
    marginTop: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'rgba(27,58,92,0.13)',
    borderRadius: 14,
    padding: 12,
    fontSize: 13,
    color: EHColors.ink,
    lineHeight: 18,
    backgroundColor: '#FCFAF6',
    marginTop: 9,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  submitBtn: {
    height: 54,
    borderRadius: 16,
    backgroundColor: EHColors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  submitBtnPressed: {
    backgroundColor: EHColors.navyDark,
  },
  submitBtnText: {
    color: EHColors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  footerNote: {
    textAlign: 'center',
    fontSize: 11.5,
    color: '#8B96A3',
    marginTop: 10,
  },
});

const ChipList = ({
  items,
  selected,
  onSelect,
}: {
  items: readonly string[] | string[];
  selected: string;
  onSelect: (val: any) => void;
}) => (
  <View style={styles.chipRow}>
    {items.map((item) => {
      const isSelected = selected === item;
      return (
        <Pressable
          key={item}
          onPress={() => onSelect(item)}
          style={[
            styles.chip,
            {
              backgroundColor: isSelected ? EHColors.navy : EHColors.white,
              borderColor: isSelected ? EHColors.navy : EHColors.navyBorderLight,
            },
          ]}
        >
          <Text
            style={[
              styles.chipText,
              { color: isSelected ? EHColors.white : EHColors.ink },
            ]}
          >
            {item}
          </Text>
        </Pressable>
      );
    })}
  </View>
);
