# EventHunters

**Book trusted caterers for your event, with your deposit protected.**

EventHunters is a proposed two-sided marketplace in Zimbabwe that connects event organisers with vetted chefs and catering companies. Its core idea is simple: in Zimbabwe's catering market, the biggest barrier isn't finding a caterer, it's trusting them with a deposit. The intended solution is an **escrow-backed booking flow**, so organisers know their money is safe and caterers know the booking is real.

> **Status:** A clickable, two-sided front-end prototype with a shared in-memory booking lifecycle. The organiser and caterer apps work together on one device. Real authentication, a backend, durable persistence, and escrow payments have not been started.

## The problem

- Organisers struggle to know which caterers are reliable, and paying an upfront deposit to a stranger is risky.
- Caterers lose bookings and time to informal, trust-based arrangements with no protection on either side.

## The solution

The planned service sits between the two sides:

1. Organisers browse **vetted** caterers and send a booking request.
2. The deposit is held in **escrow** rather than handed straight to the caterer.
3. Funds are released to the caterer once the agreed terms are met.

Revenue would come from a commission on bookings. The current prototype demonstrates these steps visually; it does not vet caterers or move money.

## Screens and prototype flows

- **Auth:** welcome, login, and registration with organiser/caterer roles. The welcome screen's caterer demo opens Requests at `/vendor`; organiser login opens the main tabs.
- **Main tabs:** home, browse/search and filters, bookings, and account.
- **Caterer profile:** photos, gallery, packages, pricing, reviews, and verification labels.
- **Quote and booking screens:** request a quote → sent confirmation → track the request → review the actual caterer quote → accept and pay a mock deposit. Links use booking IDs, so multiple requests to the same caterer stay separate.
- **Booking tracker:** live lifecycle history, quoted prices, deposit status, chat, delivery confirmation, disputes, and ratings.
- **Shared chat:** one thread per booking. Organiser and caterer messages survive navigation and role switches, with each side seeing its own messages as outgoing.
- **Caterer tabs** (`/vendor`): Requests (with a live badge), Bookings, Menu, Wallet, and Account. The tab bar shares the organiser's styling.
- **Caterer requests and quotes:** event/venue details and organiser notes; decline with confirmation; build a package or custom line-item quote, add per-head extras or flat fees, set validity and a note, preview, then send. Quotes can be revised until the deposit is paid.
- **Caterer bookings:** jobs grouped by quote sent, awaiting deposit, deposit in escrow, delivered, released to wallet, and disputed; event details, escrow history, shared chat, and a mark-as-delivered action.
- **Menu/profile:** edit business name, suburb, bio, cuisine tags, service, packages, and gallery URLs. Saved edits appear across both apps; issued quote prices stay unchanged.
- **Wallet:** balances derived from shared bookings, released deposits, payout history, and a mock EcoCash withdrawal confirmation sheet. Delivery confirmation by the organiser is required before funds become available.
- **Account/compliance:** business details, sample verification and document statuses, logout, and a development-only role switch on both Account screens.

The two sides share local state, not a network service. Document uploads, real verification, real payments, and communication with EcoCash remain unimplemented.

## Shared booking lifecycle

```text
requested → quoted → awaiting_deposit → deposit_paid → delivered → completed
    └→ declined                              └──────────┴→ disputed
```

The organiser requests, accepts, pays, confirms delivery, or opens a dispute. The caterer sends/revises quotes, declines requests, and marks jobs delivered. Invalid and duplicate transitions are rejected. Expired quotes cannot be accepted or paid.

The deposit rate is **30%**, shared by both apps through `src/constants/booking.ts`. All amounts use `formatUSD`; quote calculations round to cents. Escrow held sums deposits on `deposit_paid` and `delivered` bookings; disputed deposits appear separately as frozen funds. Completed bookings release **only their deposits** to the available wallet balance, less confirmed mock withdrawals. The remaining invoice balance is paid separately and is not modeled as a wallet payment.

The five seed records merge the original three organiser bookings and two vendor requests under the demo caterer, Zuva Feast Catering (`CATERERS[0]`). The organiser demo shows all five so both halves can be demonstrated from one account.

## Two-sided demo click-path

Run `npx expo start` in development mode; the role switch is intentionally hidden in production builds. Keep the app open throughout this walkthrough—reloading resets it.

1. Log in with any non-empty email/password. Open Zuva Feast Catering → **Request Quote** → fill the brief → **Send quote request**. Open **View booking**, then **My bookings**.
2. Open **Account → Switch role to Caterer**. On **Requests**, open the new brief → **Send quote**. Choose a package/custom items, optionally add plates & cutlery, set the validity/note → **Preview quote → Send quote to organiser**.
3. Open **All bookings → Account → Switch role to Organiser**. Open **Bookings**, select the same event → **Review quote → Accept quote → Pay Securely**.
4. Open **My bookings → Account → Switch role to Caterer**. Open **Bookings**, select that event → **Mark as delivered**. The deposit remains in escrow.
5. Open **All bookings → Account → Switch role to Organiser**. Open that booking → **Delivery & dispute options → Confirm delivery**, then rate or skip.
6. Open **Account → Switch role to Caterer → Wallet**. The released deposit is now available. **Withdraw to EcoCash → Confirm mock withdrawal** adds a payout and reduces the available balance.

**Open chat** from either side's request/booking detail to use the same thread. Alternatively, open **Raise a dispute** before confirmation to freeze the deposit and prevent release.

## What is mocked

- Seed data comes from `src/constants/data.ts`, `src/constants/demo-bookings.ts`, and hardcoded sample compliance/review arrays. Booking, message, payout, and business edits live in `src/store/useBookingsStore.ts`. Images use remote URLs; no application backend is called.
- Authentication accepts no credentials in its API: `login(role)` only updates React context. Forms require non-empty values to enable their buttons, but any values work; they are never validated against an account or saved. The login screen uses the current in-memory role, which defaults to organiser; registration lets you select either role.
- Nothing persists across an app reload. Auth uses React context; bookings, chat, profile/packages/gallery, and payouts use one in-memory Zustand store. Navigation, role switching, and logout do not reset that store.
- Escrow is a **simulated status and balance calculation only**. Payments and EcoCash payouts only change local state. No money is held, released, or withdrawn, no documents are verified, and there is no dispute mediation service.

## Tech stack

| Layer | Choice |
| --- | --- |
| App | Expo SDK 57 + React Native 0.86 + React 19.2, TypeScript |
| Navigation | Expo Router, with routes in `src/app/` |
| State | React context for mock auth/role; one Zustand store for both sides of the booking demo |
| Design | Shared navy/copper tokens in `src/constants/colors.ts`, reusable UI components |
| Backend | Firebase (planned; not integrated) |
| Payments | Real escrow and local payment methods such as EcoCash (planned) |

## Getting started

### Prerequisites

- Node.js 22.13 or newer and npm.
- An Expo Go version compatible with SDK 57 on a device, or a suitable development build/emulator. The web preview also works in a browser.

### Setup

From the repository root:

```bash
npm ci
npx expo start
```

Scan the QR code with a compatible client, press `a` for an Android emulator, or press `w` for the web preview. The iOS simulator requires macOS. No environment variables or backend credentials are required for the prototype.

To try the roles, choose **Skip for now (Dev: Caterer)** on welcome for the vendor dashboard, or log in with any non-empty form values for the default organiser flow. Registration also allows either role with arbitrary non-empty form values. Reload to reset the demo session and data.

### Checks and dependency changes

```bash
npx tsc --noEmit
npx expo lint
npx expo-doctor
node --test tests/bookings-store.test.cjs

# Use Expo to select SDK-compatible versions when adding a package:
npx expo install <package>
```

Read the [Expo SDK 57 documentation](https://docs.expo.dev/versions/v57.0.0/) and the repository's `AGENTS.md` before changing Expo or React Native APIs.

## Project structure

```text
event-hunters/
├── src/
│   ├── app/                  # Expo Router screens and layouts
│   │   ├── (tabs)/           # Home, browse, bookings, account
│   │   ├── auth/             # Welcome, login, register
│   │   ├── caterer/          # Profile and quote/compare/book/sent flow
│   │   ├── booking/          # Tracker, chat, delivery, dispute, rating
│   │   ├── account/          # Wallet and compliance
│   │   └── vendor/           # Caterer stack, (tabs)/, request/quote, booking and profile-edit routes
│   ├── components/
│   │   ├── ui/               # Shared cards, chips, labels, escrow icon, error boundary
│   │   ├── booking/          # Shared booking summary, quote and lifecycle timeline
│   │   └── vendor/           # Requests, quote/profile editors, wallet, compliance and cards
│   ├── constants/            # Colours, tab styling, deposit rate and demo seed data
│   ├── context/              # Mock AuthContext
│   ├── hooks/                # Booking lookup and live caterer profiles
│   ├── store/                # Shared booking types and in-memory Zustand store
│   └── utils/                # Quote/wallet calculations, USD formatting and logger
├── tests/                    # Lifecycle, pricing, dispute, payout and profile-store tests
├── assets/                   # Icons, splash screen, and app images
├── app.json                  # Expo configuration
├── eas.json                  # EAS build/submit configuration
└── package.json
```

`vendor/_layout.tsx` is a stack around `vendor/(tabs)/`. This keeps `/vendor` as the Requests URL and preserves role redirects without creating duplicate root URLs. Request, quote, booking, and profile-edit screens open above the five-tab navigator. Both roles reuse `/booking/[id]/chat`.

## Roadmap

- [x] Scaffold Expo project
- [x] Design system and core UI components
- [x] Prototype auth screens and role-based routing
- [x] Prototype caterer profiles, listings, search, and discovery
- [x] Prototype quote, compare, booking, and tracker flows
- [x] Prototype chat, delivery confirmation, dispute, and rating screens
- [x] Five-tab caterer app with request, quote-builder, booking, menu/profile, wallet, and account screens
- [x] Shared booking lifecycle, per-booking chat, and derived escrow/released balances
- [x] Development-only role switch and complete two-sided demo on one device
- [x] Local menu/profile/gallery editing and mock payout confirmation/history
- [ ] Real authentication and organiser/caterer accounts — not started
- [ ] Backend and APIs — not started
- [ ] Persistent data storage — not started
- [ ] Real escrow-backed deposits and payment integration — not started
- [ ] Real reviews and caterer verification
- [ ] Pilot with a small group of founding caterers

## Team

- **Courtney Fradreck Taga**: technical co-founder
- **[Co-founder name]**: co-founder and working chef

## Contributing

This is currently a private, founder-led project. If you'd like to get involved, please get in touch.

## Contact

- Email: courtaga@gmail.com
- GitHub: [github.com/courtneyfradreck](https://github.com/courtneyfradreck)

## License

_To be decided._ All rights reserved until a licence is added.
