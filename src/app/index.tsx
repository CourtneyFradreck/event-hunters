import { Redirect } from 'expo-router';

export default function AppEntry() {
  // Mock entry point -> redirect to Auth Welcome screen
  return <Redirect href="/auth/welcome" />;
}
