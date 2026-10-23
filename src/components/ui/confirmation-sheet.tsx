import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EHColors } from '@/constants/colors';
import { Button, ui } from './screen';

export function ConfirmationSheet({ visible, title, message, confirmLabel, onCancel, onConfirm }: {
  visible: boolean; title: string; message: string; confirmLabel: string;
  onCancel: () => void; onConfirm: () => void;
}) {
  const insets = useSafeAreaInsets();
  return <Modal visible={visible} transparent animationType="slide" onRequestClose={onCancel}>
    <View style={styles.overlay}>
      <Pressable accessibilityRole="button" accessibilityLabel="Dismiss confirmation" style={StyleSheet.absoluteFill} onPress={onCancel} />
      <View accessibilityViewIsModal style={[styles.sheet, { paddingBottom: insets.bottom + 24 }]}>
        <Text accessibilityRole="header" style={ui.title}>{title}</Text>
        <Text style={ui.body}>{message}</Text>
        <Button label={confirmLabel} variant="copper" onPress={onConfirm} />
        <Button label="Cancel" variant="secondary" onPress={onCancel} />
      </View>
    </View>
  </Modal>;
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(20,41,61,0.6)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: EHColors.pageBg, padding: 24, gap: 16, borderTopLeftRadius: 24,
    borderTopRightRadius: 24, width: '100%', maxWidth: 760, alignSelf: 'center' },
});
