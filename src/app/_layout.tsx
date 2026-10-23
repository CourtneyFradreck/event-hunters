import { Stack, router, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { ErrorBoundary } from '@/components/ui/error-boundary';
import { AuthProvider, useAuth } from '@/context/AuthContext';

function RootLayoutNav() {
  const segments = useSegments();
  const { isAuthenticated, role } = useAuth();

  useEffect(() => {
    const inAuth = segments[0] === 'auth';
    const inWrongDashboard = role === 'caterer'
      ? segments[0] === '(tabs)'
      : segments[0] === 'vendor';

    if (!isAuthenticated && !inAuth) {
      router.replace('/auth/welcome');
    } else if (isAuthenticated && (inAuth || inWrongDashboard)) {
      router.replace(role === 'caterer' ? '/vendor' : '/(tabs)');
    }
  }, [isAuthenticated, role, segments]);

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="vendor" />
        <Stack.Screen name="auth/welcome" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/register" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </ErrorBoundary>
  );
}
