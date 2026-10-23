import { useMemo } from 'react';

import { CATERERS } from '@/constants/data';
import { useBookingsStore } from '@/store/useBookingsStore';
import { formatUSD } from '@/utils/money';

/** Local business edits are also visible on the organiser's listings/profile. */
export function useCaterers() {
  const profile = useBookingsStore(state => state.vendorProfile);
  return useMemo(() => CATERERS.map(caterer => caterer.id !== profile.id ? caterer : {
    ...caterer, name: profile.name, suburb: profile.suburb, about: profile.bio,
    cuisine: profile.cuisineTags.join(' · '), gallery: profile.gallery,
    lo: profile.packages.length ? Math.min(...profile.packages.map(pkg => pkg.pricePerHead)) : caterer.lo,
    hi: profile.packages.length ? Math.max(...profile.packages.map(pkg => pkg.pricePerHead)) : caterer.hi,
    photo: profile.gallery[0] ?? caterer.photo,
    packages: profile.packages.map(pkg => ({ name: pkg.name, price: `${formatUSD(pkg.pricePerHead)} / head`, dishes: pkg.dishes })),
  }), [profile]);
}
