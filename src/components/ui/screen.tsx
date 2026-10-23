import Feather from '@expo/vector-icons/Feather';
import { router, type Href } from 'expo-router';
import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EHColors } from '@/constants/colors';

export function ScreenHeader({ title, subtitle, back, right }: {
  title: string; subtitle?: string; back?: Href; right?: ReactNode;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[ui.header, { paddingTop: insets.top + 12 }]}>
      <View style={ui.headerRow}>
        {back && <Pressable accessibilityRole="button" accessibilityLabel="Go back" style={ui.back}
          onPress={() => router.canGoBack() ? router.back() : router.replace(back)}>
          <Feather name="arrow-left" size={20} color={EHColors.white} />
        </Pressable>}
        <View style={ui.grow}><Text style={ui.headerTitle}>{title}</Text>
          {subtitle && <Text style={ui.headerSubtitle}>{subtitle}</Text>}
        </View>
        {right}
      </View>
    </View>
  );
}

export function Screen({ children, ...header }: Parameters<typeof ScreenHeader>[0] & { children: ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView style={ui.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScreenHeader {...header} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[ui.content, { paddingBottom: insets.bottom + 28 }]}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export function Button({ label, onPress, disabled, variant = 'primary' }: {
  label: string; onPress: () => void; disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'copper' | 'danger';
}) {
  return <Pressable accessibilityRole="button" accessibilityState={{ disabled: !!disabled }} disabled={disabled}
    onPress={onPress} style={({ pressed }) => [ui.button, ui[variant], (disabled || pressed) && { opacity: 0.5 }]}>
    <Text style={[ui.buttonText, (variant === 'secondary' || variant === 'danger') && { color: variant === 'danger' ? EHColors.red : EHColors.navy }]}>{label}</Text>
  </Pressable>;
}

export function Field({ label, ...props }: TextInputProps & { label: string }) {
  return <View style={ui.field}><Text style={ui.label}>{label}</Text>
    <TextInput accessibilityLabel={label} placeholderTextColor={EHColors.inkPlaceholder}
      {...props} style={[ui.input, props.multiline && ui.multiline, props.style]} />
  </View>;
}

export function SummaryRow({ label, value }: { label: string; value: string }) {
  return <View style={ui.summaryRow}><Text style={ui.muted}>{label}</Text><Text style={ui.summaryValue}>{value}</Text></View>;
}

export function EmptyState({ title, description = 'Updates will appear here during your demo.' }: { title: string; description?: string }) {
  return <View style={ui.empty}><Feather name="inbox" size={30} color={EHColors.copper} />
    <Text style={ui.title}>{title}</Text><Text style={ui.muted}>{description}</Text></View>;
}

export const ui = StyleSheet.create({
  root: { flex: 1, backgroundColor: EHColors.pageBg },
  header: { backgroundColor: EHColors.navy, paddingHorizontal: 18, paddingBottom: 18 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerTitle: { fontSize: 23, fontWeight: '700', color: EHColors.white },
  headerSubtitle: { fontSize: 13, lineHeight: 19, marginTop: 4, color: EHColors.navySoft },
  back: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 22, backgroundColor: EHColors.navyDark },
  content: { width: '100%', maxWidth: 760, alignSelf: 'center', padding: 18, gap: 16 },
  title: { color: EHColors.ink, fontSize: 18, fontWeight: '700', marginBottom: 6 },
  body: { color: EHColors.inkSecondary, fontSize: 15, lineHeight: 22 },
  muted: { color: EHColors.inkMuted, fontSize: 13, lineHeight: 20 },
  label: { color: EHColors.ink, fontSize: 14, fontWeight: '600' },
  field: { gap: 8 },
  input: { minHeight: 48, borderWidth: 1, borderColor: EHColors.navyBorderLight, borderRadius: 12,
    backgroundColor: EHColors.white, paddingHorizontal: 14, paddingVertical: 12, color: EHColors.ink, fontSize: 15 },
  multiline: { minHeight: 96, textAlignVertical: 'top' },
  button: { minHeight: 48, paddingVertical: 13, paddingHorizontal: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  primary: { backgroundColor: EHColors.navy },
  copper: { backgroundColor: EHColors.copper },
  secondary: { backgroundColor: EHColors.sandBg },
  danger: { backgroundColor: EHColors.redBg },
  buttonText: { color: EHColors.white, fontWeight: '700', fontSize: 15, textAlign: 'center' },
  error: { color: EHColors.red, fontSize: 14, lineHeight: 21 },
  success: { color: EHColors.green, fontSize: 14, lineHeight: 21 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, flexWrap: 'wrap' },
  grow: { flex: 1 },
  stack: { gap: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, paddingVertical: 7 },
  summaryValue: { color: EHColors.ink, fontSize: 14, fontWeight: '600', flex: 1, textAlign: 'right' },
  empty: { alignItems: 'center', padding: 24, gap: 12 },
});
