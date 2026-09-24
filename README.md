# EventHunters

**Book trusted caterers for your event, with your deposit protected.**

EventHunters is a two-sided marketplace in Zimbabwe that connects event organisers with vetted chefs and catering companies. Its core idea is simple: in Zimbabwe's catering market, the biggest barrier isn't finding a caterer, it's trusting them with a deposit. EventHunters solves that with an **escrow-backed booking flow**, so organisers know their money is safe and caterers know the booking is real.

> **Status:** Early development. The project has just been scaffolded, and nothing below is built yet unless ticked off in the [Roadmap](#roadmap).

---

## The problem

- Organisers struggle to know which caterers are reliable, and paying an upfront deposit to a stranger is risky.
- Caterers lose bookings and time to informal, trust-based arrangements with no protection on either side.

## The solution

EventHunters sits between the two sides:

1. Organisers browse **vetted** caterers and send a booking request.
2. The deposit is held in **escrow** rather than handed straight to the caterer.
3. Funds are released to the caterer once the agreed terms are met.

Revenue comes from a commission on bookings.

## Planned features

**For organisers**

- Browse and search vetted chefs and catering companies
- View caterer profiles, menus, and pricing (USD)
- Request and confirm bookings
- Pay deposits through an escrow-backed flow
- Track booking status

**For caterers**

- Create a profile with menus and pricing
- Receive and manage booking requests
- Get paid securely once a booking is fulfilled

**Platform**

- Vetting and verification of caterers
- Escrow-backed payments (local payment methods such as EcoCash in scope)
- Location-aware discovery (Harare suburbs first)

## Tech stack

| Layer      | Choice                                                                         |
| ---------- | ------------------------------------------------------------------------------ |
| Mobile app | [Expo](https://expo.dev) + React Native (TypeScript)                           |
| Navigation | [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routing) |
| Backend    | Firebase _(planned)_                                                           |
| Payments   | Escrow flow with local payment methods _(planned)_                             |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) (LTS)
- npm (or yarn/pnpm)
- The [Expo Go](https://expo.dev/go) app on your phone, or an Android emulator / iOS simulator

### Setup

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd eventhunters

# 2. Install dependencies
npm install

# 3. Start the dev server
npx expo start
```

Then scan the QR code with Expo Go, or press `a` (Android emulator) / `i` (iOS simulator) in the terminal.

### Environment variables

Copy the example file and fill in your own values:

```bash
cp .env.example .env
```

Never commit `.env` or any secrets. _(Add the `.env.example` file once the backend is wired up.)_

## Project structure

```
eventhunters/
├── app/            # Screens and routes (Expo Router)
├── assets/         # Images, fonts, icons
├── components/     # Reusable UI components
├── constants/      # Colours, config, shared values
├── hooks/          # Custom React hooks
└── package.json
```

_This reflects the default Expo template and will change as the app grows._

## Roadmap

- [x] Scaffold Expo project
- [ ] Design system and core UI components
- [ ] Authentication (organiser and caterer accounts)
- [ ] Caterer profiles and listings
- [ ] Search and discovery
- [ ] Booking request flow
- [ ] Escrow-backed deposit payments
- [ ] Reviews and caterer verification
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
