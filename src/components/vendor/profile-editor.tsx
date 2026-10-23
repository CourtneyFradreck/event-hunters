import { useState } from 'react';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { Button, Field, Screen, ui } from '@/components/ui/screen';
import { useBookingsStore } from '@/store/useBookingsStore';
import { DashboardCard } from './dashboard-card';

let packageSequence = 0;

export function ProfileEditor() {
  const profile = useBookingsStore(state => state.vendorProfile);
  const updateVendorProfile = useBookingsStore(state => state.updateVendorProfile);
  const [draft, setDraft] = useState(() => ({ name: profile.name, suburb: profile.suburb,
    bio: profile.bio, cuisines: profile.cuisineTags.join(', '), service: profile.service,
    gallery: profile.gallery.join('\n'), packages: profile.packages.map(pkg => ({ ...pkg, price: String(pkg.pricePerHead) })) }));
  const [error, setError] = useState('');
  const updatePackage = (id: string, changes: Partial<(typeof draft.packages)[number]>) =>
    setDraft(current => ({ ...current, packages: current.packages.map(pkg => pkg.id === id ? { ...pkg, ...changes } : pkg) }));

  return <Screen title="Edit profile & menu" back="/vendor/menu">
    <Text style={ui.muted}>Saved edits stay across screens and role switches. Reloading the app resets the demo.</Text>
    <Field label="Business name" value={draft.name} onChangeText={name => setDraft(current => ({ ...current, name }))} />
    <Field label="Suburb" value={draft.suburb} onChangeText={suburb => setDraft(current => ({ ...current, suburb }))} />
    <Field label="Business bio" multiline value={draft.bio} onChangeText={bio => setDraft(current => ({ ...current, bio }))} />
    <Field label="Cuisine tags (comma separated)" value={draft.cuisines} onChangeText={cuisines => setDraft(current => ({ ...current, cuisines }))} />
    <Field label="Service model" value={draft.service} onChangeText={service => setDraft(current => ({ ...current, service }))} />
    <Text style={ui.title}>Menu packages</Text>
    {draft.packages.map((pkg, index) => <DashboardCard key={pkg.id}><View style={ui.stack}>
      <Field label={`Package ${index + 1} name`} value={pkg.name} onChangeText={name => updatePackage(pkg.id, { name })} />
      <Field label={`Package ${index + 1} price per head (USD)`} value={pkg.price} keyboardType="decimal-pad" onChangeText={price => updatePackage(pkg.id, { price })} />
      <Field label={`Package ${index + 1} dishes`} multiline value={pkg.dishes} onChangeText={dishes => updatePackage(pkg.id, { dishes })} />
      <Button label={`Remove package ${index + 1}`} variant="danger" onPress={() => setDraft(current => ({ ...current, packages: current.packages.filter(item => item.id !== pkg.id) }))} />
    </View></DashboardCard>)}
    <Button label="Add package" variant="secondary" onPress={() => setDraft(current => ({ ...current,
      packages: [...current.packages, { id: `package-${Date.now()}-${++packageSequence}`, name: '', dishes: '', price: '', pricePerHead: 0 }] }))} />
    <Field label="Gallery image URLs (one per line)" multiline value={draft.gallery} autoCapitalize="none"
      onChangeText={gallery => setDraft(current => ({ ...current, gallery }))} />
    <Text style={ui.muted}>Use http/https image URLs. This prototype has no file uploads.</Text>
    {!!error && <Text style={ui.error}>{error}</Text>}
    <Button label="Save profile & menu" variant="copper" onPress={() => {
      const saved = updateVendorProfile({ ...profile, name: draft.name, suburb: draft.suburb, bio: draft.bio,
        service: draft.service, cuisineTags: draft.cuisines.split(',').map(tag => tag.trim()).filter(Boolean),
        gallery: draft.gallery.split('\n').map(url => url.trim()).filter(Boolean),
        packages: draft.packages.map(pkg => ({ id: pkg.id, name: pkg.name, dishes: pkg.dishes,
          pricePerHead: pkg.price.trim() ? Number(pkg.price) : NaN })) });
      if (!saved) { setError('Add a business name, suburb, cuisine tag, valid package names/dishes and positive USD prices with up to two decimals. Gallery URLs must be valid http/https links.'); return; }
      router.replace('/vendor/menu');
    }} />
    <Button label="Cancel edits" variant="secondary" onPress={() => router.replace('/vendor/menu')} />
  </Screen>;
}
