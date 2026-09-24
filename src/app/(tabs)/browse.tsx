import { StyleSheet, Text, View } from 'react-native';

import { EHColors } from '@/constants/colors';

export default function BrowseScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Browse</Text>
      <Text style={styles.message}>Placeholder screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: EHColors.pageBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: EHColors.ink,
  },
  message: {
    marginTop: 8,
    fontSize: 16,
    color: EHColors.inkMuted,
  },
});
