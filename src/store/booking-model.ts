export type BookingStatus = 'requested' | 'quoted' | 'awaiting_deposit' | 'deposit_paid'
  | 'delivered' | 'completed' | 'declined' | 'disputed';
export type Party = 'organiser' | 'caterer';

export interface QuoteItem {
  id: string;
  name: string;
  unitPrice: number;
  perGuest: boolean;
}

export interface QuoteDraft {
  packageName?: string;
  items: QuoteItem[];
  validUntil: string;
  note: string;
}

export interface BookingQuote extends QuoteDraft {
  total: number;
  deposit: number;
  balance: number;
  depositRate: number;
}

export interface ChatMessage {
  id: string;
  sender: Party;
  text: string;
  at: string;
}

export interface Booking {
  id: string;
  catererId: string;
  catererName: string;
  organiserName: string;
  eventType: string;
  date: string;
  guests: number;
  suburb: string;
  venue: string;
  service: string;
  notes: string;
  status: BookingStatus;
  quote?: BookingQuote;
  history: { status: BookingStatus; at: string }[];
  messages: ChatMessage[];
  paymentMethod?: string;
  disputeReason?: string;
  rating?: number;
}

export type BookingRequest = Pick<Booking, 'eventType' | 'date' | 'guests' | 'suburb' | 'venue' | 'notes' | 'service'>;

export interface VendorPackage { id: string; name: string; pricePerHead: number; dishes: string }
export interface VendorProfile {
  id: string;
  name: string;
  suburb: string;
  bio: string;
  cuisineTags: string[];
  packages: VendorPackage[];
  gallery: string[];
  service: string;
  verified: boolean;
  rating: number;
  email: string;
}
export interface Payout { id: string; catererId: string; amount: number; at: string; method: 'EcoCash' }
