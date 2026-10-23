import { Redirect } from 'expo-router';

import { useAuth } from '@/context/AuthContext';

export default function AppEntry() {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/auth/welcome" />;
  }

  return <Redirect href={role === 'caterer' ? '/vendor' : '/(tabs)'} />;
}
