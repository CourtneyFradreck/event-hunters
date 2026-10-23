import { CATERERS } from './data';
import type { Booking, BookingStatus, VendorProfile } from '@/store/booking-model';
import { calculateQuote, defaultValidity } from '@/utils/booking';

const caterer = CATERERS[0];
export const DEMO_PROFILE: VendorProfile = {
  id: caterer.id, name: caterer.name, suburb: caterer.suburb, bio: caterer.about ?? '',
  cuisineTags: ['Traditional', 'Continental'], service: caterer.service, verified: caterer.verified,
  rating: caterer.rating, email: 'hello@zuvafeast.com', gallery: [...(caterer.gallery ?? [])],
  packages: (caterer.packages ?? []).map((pkg, index) => ({
    id: `package-${index}`, name: pkg.name, dishes: pkg.dishes,
    pricePerHead: Number(pkg.price.match(/[\d.]+/)?.[0] ?? 0),
  })),
};

function seed(id: string, eventType: string, guests: number, date: string,
  status: BookingStatus, organiserName = 'Jane Doe', price?: number, delivery = 0): Booking {
  const at = new Date().toISOString();
  const quote = price === undefined ? undefined : calculateQuote(guests, {
    packageName: 'Demo event menu', validUntil: defaultValidity(), note: 'Service as described in your brief.',
    items: [{ id: 'menu', name: 'Event menu', unitPrice: price, perGuest: true },
      ...(delivery ? [{ id: 'delivery', name: 'Delivery & setup', unitPrice: delivery, perGuest: false }] : [])],
  });
  const stages: BookingStatus[] = status === 'requested' ? ['requested']
    : status === 'quoted' ? ['requested', 'quoted']
    : ['requested', 'quoted', 'awaiting_deposit', 'deposit_paid'];
  return { id, catererId: caterer.id, catererName: caterer.name, organiserName, eventType,
    guests, date, suburb: 'Borrowdale', venue: 'Borrowdale event venue', service: 'Full-service',
    notes: 'Please include setup and serving staff. Confirm dietary requirements before the event.',
    status, quote, history: stages.map(stage => ({ status: stage, at })), messages: [] };
}

// The three organiser bookings and two old vendor requests now belong to the same demo business.
export const INITIAL_BOOKINGS: Booking[] = [
  seed('b1', 'Wedding', 220, '14 Dec 2026', 'quoted', 'Jane Doe', 16.5),
  seed('b3', 'Kitchen Party', 80, '10 Nov 2026', 'deposit_paid', 'Jane Doe', 12, 106.67),
  seed('b2', 'Corporate', 50, '21 Dec 2026', 'requested'),
  seed('req1', 'Wedding', 260, '14 Dec 2026', 'requested', 'Rutendo M.'),
  seed('req2', 'Church Conference', 400, '5 Jan 2027', 'deposit_paid', 'Pastor Chikore', 15.5),
];
INITIAL_BOOKINGS[0].messages = [
  { id: 'm1', sender: 'caterer', text: 'Hi! We can cater for 220 guests. Do you need plates and cutlery?', at: new Date().toISOString() },
  { id: 'm2', sender: 'organiser', text: 'Yes please. Could you include that in the quote?', at: new Date().toISOString() },
];
