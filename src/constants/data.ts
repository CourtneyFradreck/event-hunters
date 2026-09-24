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
    photo: 'wedding buffet line',
    verified: true,
    booked: null,
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
    photo: 'sadza & relish tray',
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
    photo: 'plated main course',
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
    photo: 'rice & chicken trays',
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
    photo: 'buffet chafing dishes',
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
    photo: 'braai grill close-up',
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
    photo: 'banquet hall setting',
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
    photo: 'chef plating dish',
    verified: true,
    booked: null,
  },
];

/** The three caterers shown in the "Popular this season" carousel. */
export const POPULAR_CATERER_IDS = ['zuva', 'table', 'sadza'] as const;
