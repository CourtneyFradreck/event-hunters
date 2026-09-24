import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ErrorBoundary } from '@/components/ui/error-boundary';

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ErrorBoundary>
  );
}
