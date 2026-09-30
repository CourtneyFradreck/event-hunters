import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';

import { EHColors } from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login('organiser');
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.root} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color={EHColors.ink} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Log in to manage your bookings and events.</Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="name@example.com"
              placeholderTextColor={EHColors.inkPlaceholder}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={EHColors.inkPlaceholder}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <Pressable style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Pressable 
            style={[styles.btnPrimary, (!email || !password) && styles.btnDisabled]} 
            onPress={handleLogin}
            disabled={!email || !password}
          >
            <Text style={styles.btnPrimaryText}>Log in</Text>
          </Pressable>
          
          <View style={styles.signUpRow}>
            <Text style={styles.signUpText}>Don&apos;t have an account? </Text>
            <Pressable onPress={() => router.replace('/auth/register' as any)}>
              <Text style={styles.signUpLink}>Sign up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: EHColors.pageBg },
  header: { paddingHorizontal: 24, paddingBottom: 16 },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 16 },
  title: { fontSize: 32, fontWeight: '700', color: EHColors.ink, marginBottom: 8 },
  subtitle: { fontSize: 16, color: EHColors.inkSecondary, marginBottom: 32 },
  form: { gap: 20 },
  inputGroup: { gap: 8 },
  label: { fontSize: 14, fontWeight: '600', color: EHColors.ink },
  input: {
    backgroundColor: EHColors.white,
    borderWidth: 1, borderColor: EHColors.navyBorderLight,
    borderRadius: 12, paddingHorizontal: 16, height: 52,
    fontSize: 16, color: EHColors.ink,
  },
  forgotBtn: { alignSelf: 'flex-start', marginTop: -4 },
  forgotText: { color: EHColors.copper, fontSize: 14, fontWeight: '600' },
  footer: { marginTop: 'auto', paddingBottom: 40, paddingTop: 24 },
  btnPrimary: {
    backgroundColor: EHColors.navy,
    height: 56, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 24,
  },
  btnDisabled: { opacity: 0.5 },
  btnPrimaryText: { color: EHColors.white, fontSize: 16, fontWeight: '600' },
  signUpRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  signUpText: { color: EHColors.inkSecondary, fontSize: 15 },
  signUpLink: { color: EHColors.copper, fontSize: 15, fontWeight: '600' },
});
