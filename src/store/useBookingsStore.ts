import { create } from 'zustand';
import { logger } from '@/utils/logger';

export type BookingStatus = 'pending_quote' | 'action_required' | 'escrow_held' | 'completed';

export interface Booking {
  id: string;
  catererId: string;
  catererName: string;
  eventType: string;
  date: string;
  guests: number;
  status: BookingStatus;
  amount?: string;
  deposit?: string;
}

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    catererId: 'zuva',
    catererName: 'Zuva Feast Catering',
    eventType: 'Wedding',
    date: '14 Dec 2026',
    guests: 220,
    status: 'action_required',
    amount: '$3,630',
    deposit: '$1,089',
  },
  {
    id: 'b3',
    catererId: 'sadza',
    catererName: 'Sadza & Sage',
    eventType: 'Kitchen Party',
    date: '10 Nov 2026',
    guests: 80,
    status: 'escrow_held',
    deposit: '$320',
  },
  {
    id: 'b2',
    catererId: 'table',
    catererName: 'The Harare Table',
    eventType: 'Corporate',
    date: '21 Dec 2026',
    guests: 50,
    status: 'pending_quote',
  },
];

interface BookingsStore {
  bookings: Booking[];
  payDeposit: (id: string, paymentMethod: string) => void;
  requestQuote: (catererId: string, catererName: string, details: Partial<Booking>) => void;
}

export const useBookingsStore = create<BookingsStore>((set) => ({
  bookings: INITIAL_BOOKINGS,

  payDeposit: (id, paymentMethod) => {
    logger.trackEvent('Deposit Paid', { bookingId: id, paymentMethod });
    
    set((state) => ({
      bookings: state.bookings.map((b) => 
        b.id === id ? { ...b, status: 'escrow_held' } : b
      )
    }));
  },

  requestQuote: (catererId, catererName, details) => {
    const newBooking: Booking = {
      id: `b${Date.now()}`,
      catererId,
      catererName,
      eventType: details.eventType || 'Event',
      date: details.date || 'TBD',
      guests: details.guests || 50,
      status: 'pending_quote',
    };
    
    logger.trackEvent('Quote Requested', { catererId, guests: newBooking.guests });

    set((state) => ({
      bookings: [newBooking, ...state.bookings]
    }));
  }
}));
