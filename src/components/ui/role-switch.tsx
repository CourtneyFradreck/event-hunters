import { Text, View } from 'react-native';

import { useAuth } from '@/context/AuthContext';
import { Button, ui } from './screen';

export function RoleSwitch() {
  const { role, switchRole } = useAuth();
  if (!__DEV__) return null;
  return <View style={[ui.stack, { marginVertical: 12, paddingHorizontal: 18 }]}>
    <Text style={ui.muted}>Demo role · bookings, chat and saved menu stay in memory</Text>
    <Button label={`Switch role to ${role === 'organiser' ? 'Caterer' : 'Organiser'}`}
      variant="secondary" onPress={switchRole} />
  </View>;
}
