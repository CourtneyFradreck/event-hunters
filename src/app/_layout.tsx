import { Stack, router, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { ErrorBoundary } from '@/components/ui/error-boundary';
import { AuthProvider, useAuth } from '@/context/AuthContext';

function RootLayoutNav() {
  const segments = useSegments();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // If we're not authenticated and not currently in the auth group, redirect to welcome
    if (!isAuthenticated && segments[0] !== 'auth') {
      setTimeout(() => {
        router.replace('/auth/welcome' as any);
      }, 0);
    }
  }, [isAuthenticated, segments]);

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="auth" />
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
