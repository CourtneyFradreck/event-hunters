import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EHColors } from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const { login } = useAuth();

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom, paddingTop: insets.top }]}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          {/* Mock Logo */}
          <View style={styles.mockLogo}>
            <Text style={styles.logoText}>EH</Text>
          </View>
          <Text style={styles.title}>EventHunters</Text>
          <Text style={styles.subtitle}>
            Book trusted caterers for your event, with your deposit protected.
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable 
            style={styles.btnPrimary} 
            onPress={() => router.push('/auth/register' as any)}
          >
            <Text style={styles.btnPrimaryText}>Create an account</Text>
          </Pressable>
          
          <Pressable 
            style={styles.btnSecondary} 
            onPress={() => router.push('/auth/login' as any)}
          >
            <Text style={styles.btnSecondaryText}>Log in</Text>
          </Pressable>

          <Pressable 
            style={styles.skipBtn} 
            onPress={() => {
              login();
              router.replace('/(tabs)');
            }}
          >
            <Text style={styles.skipBtnText}>Skip for now (Dev)</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: EHColors.navy },
  content: { flex: 1, padding: 24, justifyContent: 'space-between' },
  logoContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mockLogo: {
    width: 80, height: 80, borderRadius: 20,
    backgroundColor: EHColors.copper,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 24,
  },
  logoText: { fontSize: 32, fontWeight: '800', color: EHColors.white },
  title: { fontSize: 32, fontWeight: '700', color: EHColors.white, marginBottom: 12 },
  subtitle: { fontSize: 16, color: EHColors.navySoft, textAlign: 'center', lineHeight: 24, paddingHorizontal: 20 },
  actions: { gap: 16, paddingBottom: 20 },
  btnPrimary: {
    backgroundColor: EHColors.copper,
    paddingVertical: 16, borderRadius: 12, alignItems: 'center',
  },
  btnPrimaryText: { color: EHColors.white, fontSize: 16, fontWeight: '600' },
  btnSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1, borderColor: EHColors.navySoft,
    paddingVertical: 16, borderRadius: 12, alignItems: 'center',
  },
  btnSecondaryText: { color: EHColors.white, fontSize: 16, fontWeight: '600' },
  skipBtn: { marginTop: 16, alignItems: 'center' },
  skipBtnText: { color: EHColors.navySoft, fontSize: 14 },
});
