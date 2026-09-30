import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';

import { EHColors } from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const { login } = useAuth();
  const [role, setRole] = useState<'organiser' | 'caterer'>('organiser');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    login();
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

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Create an account</Text>
        <Text style={styles.subtitle}>Join EventHunters today.</Text>

        <View style={styles.roleSelector}>
          <Pressable 
            style={[styles.roleBtn, role === 'organiser' && styles.roleBtnActive]}
            onPress={() => setRole('organiser')}
          >
            <Feather name="calendar" size={20} color={role === 'organiser' ? EHColors.copperDark : EHColors.inkSecondary} />
            <Text style={[styles.roleBtnText, role === 'organiser' && styles.roleBtnTextActive]}>I&apos;m an Organiser</Text>
          </Pressable>
          <Pressable 
            style={[styles.roleBtn, role === 'caterer' && styles.roleBtnActive]}
            onPress={() => setRole('caterer')}
          >
            <Feather name="briefcase" size={20} color={role === 'caterer' ? EHColors.copperDark : EHColors.inkSecondary} />
            <Text style={[styles.roleBtnText, role === 'caterer' && styles.roleBtnTextActive]}>I&apos;m a Caterer</Text>
          </Pressable>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name {role === 'caterer' && 'or Business Name'}</Text>
            <TextInput
              style={styles.input}
              placeholder={role === 'caterer' ? "e.g. Zuva Feast Catering" : "e.g. Jane Doe"}
              placeholderTextColor={EHColors.inkPlaceholder}
              value={name}
              onChangeText={setName}
            />
          </View>

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
        </View>

        <View style={styles.footer}>
          <Pressable 
            style={[styles.btnPrimary, (!name || !email || !password) && styles.btnDisabled]} 
            onPress={handleRegister}
            disabled={!name || !email || !password}
          >
            <Text style={styles.btnPrimaryText}>Create Account</Text>
          </Pressable>
          
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Pressable onPress={() => router.replace('/auth/login' as any)}>
              <Text style={styles.loginLink}>Log in</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: EHColors.pageBg },
  header: { paddingHorizontal: 24, paddingBottom: 8 },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40, flexGrow: 1 },
  title: { fontSize: 32, fontWeight: '700', color: EHColors.ink, marginBottom: 8 },
  subtitle: { fontSize: 16, color: EHColors.inkSecondary, marginBottom: 32 },
  roleSelector: { flexDirection: 'row', gap: 12, marginBottom: 32 },
  roleBtn: {
    flex: 1, backgroundColor: EHColors.white,
    borderWidth: 1, borderColor: EHColors.navyBorderLight,
    borderRadius: 12, padding: 16,
    alignItems: 'center', gap: 8,
  },
  roleBtnActive: {
    backgroundColor: EHColors.copperBg,
    borderColor: EHColors.copper,
  },
  roleBtnText: { fontSize: 14, fontWeight: '600', color: EHColors.inkSecondary },
  roleBtnTextActive: { color: EHColors.copperDark },
  form: { gap: 20 },
  inputGroup: { gap: 8 },
  label: { fontSize: 14, fontWeight: '600', color: EHColors.ink },
  input: {
    backgroundColor: EHColors.white,
    borderWidth: 1, borderColor: EHColors.navyBorderLight,
    borderRadius: 12, paddingHorizontal: 16, height: 52,
    fontSize: 16, color: EHColors.ink,
  },
  footer: { marginTop: 40 },
  btnPrimary: {
    backgroundColor: EHColors.navy,
    height: 56, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 24,
  },
  btnDisabled: { opacity: 0.5 },
  btnPrimaryText: { color: EHColors.white, fontSize: 16, fontWeight: '600' },
  loginRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  loginText: { color: EHColors.inkSecondary, fontSize: 15 },
  loginLink: { color: EHColors.copper, fontSize: 15, fontWeight: '600' },
});
