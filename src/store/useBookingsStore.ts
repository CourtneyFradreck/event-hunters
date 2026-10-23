import { create } from 'zustand';

import { INITIAL_BOOKINGS, DEMO_PROFILE } from '@/constants/demo-bookings';
import { CATERERS } from '@/constants/data';
import { isQuoteExpired, validQuote, calculateQuote, walletTotals } from '@/utils/booking';
import { roundUSD } from '@/utils/money';
import { logger } from '@/utils/logger';
import type { Booking, BookingRequest, BookingStatus, Party, Payout, QuoteDraft, VendorProfile } from './booking-model';

export type { Booking, BookingStatus } from './booking-model';

interface BookingsStore {
  bookings: Booking[];
  vendorProfile: VendorProfile;
  payouts: Payout[];
  requestQuote: (catererId: string, details: BookingRequest) => string | null;
  sendQuote: (id: string, draft: QuoteDraft) => boolean;
  declineRequest: (id: string) => boolean;
  acceptQuote: (id: string) => boolean;
  payDeposit: (id: string, paymentMethod: string) => boolean;
  markDelivered: (id: string) => boolean;
  confirmDelivery: (id: string) => boolean;
  openDispute: (id: string, reason: string) => boolean;
  sendMessage: (id: string, sender: Party, text: string) => boolean;
  rateBooking: (id: string, rating: number) => boolean;
  updateVendorProfile: (profile: VendorProfile) => boolean;
  withdraw: (catererId: string, amount: number) => boolean;
}

let sequence = 0;
const newId = (prefix: string) => `${prefix}-${Date.now()}-${++sequence}`;

/** In-memory demo state. Never reset on navigation, logout, or role changes. */
export const useBookingsStore = create<BookingsStore>((set, get) => {
  function transition(id: string, allowed: BookingStatus[], status: BookingStatus,
    event: string, changes: Partial<Booking> = {}) {
    const booking = get().bookings.find(item => item.id === id);
    if (!booking || !allowed.includes(booking.status)) return false;
    const at = new Date().toISOString();
    set(state => ({ bookings: state.bookings.map(item => item.id === id
      ? { ...item, ...changes, status, history: [...item.history, { status, at }] } : item) }));
    logger.trackEvent(event, { bookingId: id, from: booking.status, status });
    return true;
  }

  return {
    bookings: INITIAL_BOOKINGS,
    vendorProfile: DEMO_PROFILE,
    payouts: [],

    requestQuote: (catererId, details) => {
      const caterer = CATERERS.find(item => item.id === catererId);
      if (!caterer || !Number.isInteger(details.guests) || details.guests < 1 || details.guests > 1000
        || !details.eventType.trim() || !details.date.trim() || !details.suburb.trim() || !details.venue.trim()) return null;
      const id = newId('booking');
      const booking: Booking = {
        ...details, id, catererId, catererName: catererId === get().vendorProfile.id ? get().vendorProfile.name : caterer.name,
        organiserName: 'Jane Doe', status: 'requested', quote: undefined, messages: [],
        history: [{ status: 'requested', at: new Date().toISOString() }],
      };
      set(state => ({ bookings: [booking, ...state.bookings] }));
      logger.trackEvent('Quote Requested', { bookingId: id, catererId, guests: details.guests });
      return id;
    },

    sendQuote: (id, draft) => {
      const booking = get().bookings.find(item => item.id === id);
      if (!booking || booking.catererId !== get().vendorProfile.id || !validQuote(booking.guests, draft)) return false;
      return transition(id, ['requested', 'quoted', 'awaiting_deposit'], 'quoted', 'Quote Sent',
        { quote: calculateQuote(booking.guests, draft) });
    },
    declineRequest: id => transition(id, ['requested'], 'declined', 'Request Declined'),
    acceptQuote: id => {
      const quote = get().bookings.find(item => item.id === id)?.quote;
      return !!quote && !isQuoteExpired(quote)
        && transition(id, ['quoted'], 'awaiting_deposit', 'Quote Accepted');
    },
    payDeposit: (id, paymentMethod) => {
      const quote = get().bookings.find(item => item.id === id)?.quote;
      if (!quote || isQuoteExpired(quote) || !['ecocash', 'card'].includes(paymentMethod)) return false;
      const changed = transition(id, ['awaiting_deposit'], 'deposit_paid', 'Deposit Paid', { paymentMethod });
      if (changed) logger.debug('Mock deposit method', { bookingId: id, paymentMethod });
      return changed;
    },
    markDelivered: id => transition(id, ['deposit_paid'], 'delivered', 'Delivery Marked'),
    confirmDelivery: id => transition(id, ['delivered'], 'completed', 'Delivery Confirmed · Funds Released'),
    openDispute: (id, reason) => !!reason.trim() && transition(id, ['deposit_paid', 'delivered'],
      'disputed', 'Dispute Opened', { disputeReason: reason.trim() }),

    sendMessage: (id, sender, text) => {
      if (!text.trim() || !get().bookings.some(booking => booking.id === id)
        || !['organiser', 'caterer'].includes(sender)) return false;
      const message = { id: newId('message'), sender, text: text.trim(), at: new Date().toISOString() };
      set(state => ({ bookings: state.bookings.map(booking => booking.id === id
        ? { ...booking, messages: [...booking.messages, message] } : booking) }));
      logger.trackEvent('Chat Message Sent', { bookingId: id, sender });
      return true;
    },
    rateBooking: (id, rating) => {
      if (!Number.isInteger(rating) || rating < 1 || rating > 5
        || !get().bookings.some(booking => booking.id === id && booking.status === 'completed')) return false;
      set(state => ({ bookings: state.bookings.map(booking => booking.id === id ? { ...booking, rating } : booking) }));
      logger.trackEvent('Booking Rated', { bookingId: id, rating });
      return true;
    },
    updateVendorProfile: profile => {
      if (profile.id !== get().vendorProfile.id || !profile.name.trim() || !profile.suburb.trim()
        || !profile.cuisineTags.length || profile.cuisineTags.some(tag => !tag.trim())
        || profile.packages.some(pkg => !pkg.name.trim() || !pkg.dishes.trim()
          || !Number.isFinite(pkg.pricePerHead) || pkg.pricePerHead <= 0 || pkg.pricePerHead > 1_000_000
          || roundUSD(pkg.pricePerHead) !== pkg.pricePerHead)
        || profile.gallery.some(url => !/^https?:\/\/[^\s]+$/i.test(url))) return false;
      const saved = { ...profile, name: profile.name.trim(), suburb: profile.suburb.trim(),
        cuisineTags: profile.cuisineTags.map(tag => tag.trim()), packages: profile.packages.map(pkg => ({ ...pkg })),
        gallery: [...profile.gallery] };
      set(state => ({ vendorProfile: saved, bookings: state.bookings.map(booking =>
        booking.catererId === profile.id ? { ...booking, catererName: saved.name } : booking) }));
      logger.trackEvent('Vendor Profile Updated', { catererId: profile.id });
      return true;
    },
    withdraw: (catererId, amount) => {
      const state = get();
      const available = walletTotals(state.bookings, state.payouts, catererId).available;
      if (catererId !== state.vendorProfile.id || !Number.isFinite(amount) || amount <= 0
        || roundUSD(amount) !== amount || amount > available) return false;
      const payout: Payout = { id: newId('payout'), catererId, amount, method: 'EcoCash', at: new Date().toISOString() };
      set(current => ({ payouts: [payout, ...current.payouts] }));
      logger.trackEvent('Mock Withdrawal Confirmed', { catererId, amount, method: 'EcoCash' });
      return true;
    },
  };
});
