# EventHunters

**Book trusted caterers for your event, with your deposit protected.**

EventHunters is a proposed two-sided marketplace in Zimbabwe that connects event organisers with vetted chefs and catering companies. Its core idea is simple: in Zimbabwe's catering market, the biggest barrier isn't finding a caterer, it's trusting them with a deposit. The intended solution is an **escrow-backed booking flow**, so organisers know their money is safe and caterers know the booking is real.

> **Status:** A clickable front-end prototype with mock data. The design system, core UI, and prototype flows are built. Real authentication, a backend, persistence, and escrow payments have not been started.

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

- **Auth:** welcome, login, and registration with organiser/caterer roles. The welcome screen's caterer demo opens the vendor dashboard; organiser login opens the main tabs.
- **Main tabs:** home, browse/search and filters, bookings, and account.
- **Caterer profile:** photos, gallery, packages, pricing, reviews, and verification labels.
- **Quote and booking screens:** quote request → sent confirmation, then bookings → compare quotes → book/choose a deposit method → bookings.
- **Booking tracker:** mock progress and deposit status, with links to chat and delivery confirmation.
- **Chat:** canned messages and locally composed replies.
- **Delivery confirmation, dispute, and rating:** clickable screens for the event-day flow.
- **Wallet and compliance:** sample balances, transactions, document statuses, and expiry dates.
- **Vendor dashboard** (`/vendor`): Requests, Wallet, and My Profile tabs, including packages and a compliance summary.

Some actions are visual placeholders, including creating a vendor quote, withdrawals, document uploads, and profile editing. There is no real organiser/vendor synchronisation.

## What is mocked

- All app data comes from `src/constants/data.ts` and hardcoded arrays in screens, components, and the booking store. Images use remote sample URLs; no application backend is called.
- Authentication accepts no credentials in its API: `login(role)` only updates React context. Forms require non-empty values to enable their buttons, but any values work; they are never validated against an account or saved. The login screen uses the current in-memory role, which defaults to organiser; registration lets you select either role.
- Nothing persists across an app reload. Auth and chat use React state; bookings use an in-memory Zustand store. Quote requests and deposit actions only change that local state.
- Escrow is a **status label only**. Balances, payments, transaction histories, verification badges, and compliance checks are demonstrations. No money is held, released, or withdrawn, and no documents are verified.

## Tech stack

| Layer | Choice |
| --- | --- |
| App | Expo SDK 57 + React Native 0.86 + React 19.2, TypeScript |
| Navigation | Expo Router, with routes in `src/app/` |
| State | React context for mock auth; Zustand for in-memory bookings |
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
│   │   └── vendor/           # Caterer dashboard route
│   ├── components/
│   │   ├── ui/               # Shared cards, chips, labels, escrow icon, error boundary
│   │   └── vendor/           # Dashboard sections and shared dashboard card
│   ├── constants/            # Navy/copper design tokens and mock caterer data
│   ├── context/              # Mock AuthContext
│   ├── store/                # In-memory Zustand booking store
│   └── utils/                # Console/in-memory logger
├── assets/                   # Icons, splash screen, and app images
├── app.json                  # Expo configuration
├── eas.json                  # EAS build/submit configuration
└── package.json
```

`/vendor` is a separate route from the organiser tabs. Its three sections use local tab state, so it does not need its own navigator or route group.

## Roadmap

- [x] Scaffold Expo project
- [x] Design system and core UI components
- [x] Prototype auth screens and role-based routing
- [x] Prototype caterer profiles, listings, search, and discovery
- [x] Prototype quote, compare, booking, and tracker flows
- [x] Prototype chat, delivery confirmation, dispute, and rating screens
- [x] Prototype wallet, compliance, and vendor dashboard
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
