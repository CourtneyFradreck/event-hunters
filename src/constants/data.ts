/**
 * Mock data for the EventHunters home screen.
 * This mirrors the data embedded in the HTML prototype.
 */

export const EVENT_TYPES = [
  'Wedding',
  'Corporate',
  'Church Conference',
  'Kitchen Party',
  'Graduation',
  'Birthday',
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

export const SUBURBS = [
  'Borrowdale',
  'Avondale',
  'Highlands',
  'Mount Pleasant',
  'Belvedere',
  'Msasa',
  'Waterfalls',
] as const;

export type Suburb = (typeof SUBURBS)[number];

export const DATES = ['Sat 14 Dec', 'Sat 21 Dec', 'Sun 5 Jan'] as const;

export interface PriceChip {
  label: string;
  sub: string;
  band: string;
}

export const PRICE_CHIPS: PriceChip[] = [
  { label: '$8–12', sub: 'Drop-off', band: '$8–12' },
  { label: '$12–18', sub: 'Full buffet', band: '$12–18' },
  { label: '$18–25+', sub: 'Premium', band: '$18–25+' },
];

export interface MenuPackage {
  name: string;
  price: string;
  dishes: string;
}

export interface Review {
  name: string;
  stars: string;
  meta: string;
  text: string;
}

export interface Caterer {
  id: string;
  name: string;
  suburb: string;
  rating: number;
  reviews: number;
  lo: number;
  hi: number;
  band: string;
  service: string;
  cuisine: string;
  photo: string;
  verified: boolean;
  booked: string | null;
  about?: string;
  gallery?: string[];
  packages?: MenuPackage[];
  reviewList?: Review[];
}

export const CATERERS: Caterer[] = [
  {
    id: 'zuva',
    name: 'Zuva Feast Catering',
    suburb: 'Borrowdale',
    rating: 4.9,
    reviews: 127,
    lo: 14,
    hi: 20,
    band: '$12–18',
    service: 'Full-service',
    cuisine: 'Traditional & continental',
    photo: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
    verified: true,
    booked: null,
    about: 'Family-run since 2014. Weddings and church conferences from 80 to 400 plates, with our own generators, chafing dishes and a 14-person service team. Regulars at Borrowdale Country Club and Chapman Golf Club.',
    gallery: [
      'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
      'https://images.unsplash.com/photo-1628294436579-22cb15ef2a70?w=800&q=80',
      'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80'
    ],
    packages: [
      { name: 'Classic Buffet', price: '$14 / head', dishes: 'Rice, sadza, roast chicken, beef stew, coleslaw, butternut, garden salad, seasonal fruit.' },
      { name: 'Wedding Buffet', price: '$16.50 / head', dishes: 'Two starches, roast chicken, beef stew, oxtail, three salads, butternut, dessert table, juice station.' },
      { name: 'Premium Banquet', price: '$20 / head', dishes: 'Carvery station, oxtail, grilled fish, lamb, four salads, cheese board, waiter-served dessert, mocktail bar.' }
    ],
    reviewList: [
      { name: 'Rutendo M.', stars: '5.0', meta: 'Wedding · 260 guests · Nov 2026', text: 'Arrived at 8am, buffet was hot at 1pm sharp. Escrow meant I never had to hand over cash blind.' },
      { name: 'Pastor Chikore', stars: '4.8', meta: 'Church conference · 400 guests · Sep 2026', text: 'Fed 400 people in under 40 minutes. Sadza was proper, not lukewarm.' },
      { name: 'Anesu & Kuda', stars: '4.9', meta: 'Wedding · 180 guests · Aug 2026', text: 'Menu tasting was free and they adjusted for our vegetarian guests without a fuss.' }
    ]
  },
  {
    id: 'sadza',
    name: 'Sadza & Sage',
    suburb: 'Avondale',
    rating: 4.7,
    reviews: 86,
    lo: 10,
    hi: 15,
    band: '$8–12',
    service: 'Drop-off',
    cuisine: 'Traditional',
    photo: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
    verified: true,
    booked: null,
  },
  {
    id: 'table',
    name: 'The Harare Table',
    suburb: 'Highlands',
    rating: 4.8,
    reviews: 203,
    lo: 18,
    hi: 25,
    band: '$18–25+',
    service: 'Full-service',
    cuisine: 'Continental',
    photo: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    verified: true,
    booked: null,
  },
  {
    id: 'chikafu',
    name: 'Chikafu House',
    suburb: 'Waterfalls',
    rating: 4.5,
    reviews: 61,
    lo: 8,
    hi: 12,
    band: '$8–12',
    service: 'Drop-off',
    cuisine: 'Traditional',
    photo: 'https://images.unsplash.com/photo-1596683720379-b73ce17f9fe6?w=800&q=80',
    verified: true,
    booked: null,
  },
  {
    id: 'mtp',
    name: 'Mount Pleasant Catering Co.',
    suburb: 'Mount Pleasant',
    rating: 4.6,
    reviews: 54,
    lo: 12,
    hi: 18,
    band: '$12–18',
    service: 'Full-service',
    cuisine: 'Traditional & continental',
    photo: 'https://images.unsplash.com/photo-1628294436579-22cb15ef2a70?w=800&q=80',
    verified: true,
    booked: '14 Dec',
  },
  {
    id: 'braai',
    name: 'Msasa Braai & Buffet',
    suburb: 'Msasa',
    rating: 4.4,
    reviews: 39,
    lo: 9,
    hi: 14,
    band: '$8–12',
    service: 'Chef-only',
    cuisine: 'Braai',
    photo: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    verified: true,
    booked: null,
  },
  {
    id: 'belv',
    name: 'Belvedere Banquet Services',
    suburb: 'Belvedere',
    rating: 4.8,
    reviews: 98,
    lo: 15,
    hi: 22,
    band: '$12–18',
    service: 'Full-service',
    cuisine: 'Continental',
    photo: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
    verified: true,
    booked: '14 Dec',
  },
  {
    id: 'tendai',
    name: 'Chef Tendai Private Kitchen',
    suburb: 'Mount Pleasant',
    rating: 4.9,
    reviews: 45,
    lo: 20,
    hi: 25,
    band: '$18–25+',
    service: 'Chef-only',
    cuisine: 'Continental',
    photo: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80',
    verified: true,
    booked: null,
  },
];

/** The three caterers shown in the "Popular this season" carousel. */
export const POPULAR_CATERER_IDS = ['zuva', 'table', 'sadza'] as const;
