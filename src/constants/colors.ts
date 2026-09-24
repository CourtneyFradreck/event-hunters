/**
 * EventHunters design tokens — extracted from the HTML prototype.
 *
 * Naming follows the prototype's visual language:
 *   • "navy" family  → header / CTA backgrounds
 *   • "copper" family → accent / escrow branding
 *   • "ink" family    → body text
 *   • "sand" family   → page / card backgrounds
 */

export const EHColors = {
  // ── Navy (primary) ──────────────────────────────────────────
  navy: '#1B3A5C',
  navyDark: '#14293D',
  navyLight: '#8FB0CE',
  navySoft: '#9FBBD4',
  navyBorder: 'rgba(27,58,92,0.10)',
  navyBorderMedium: 'rgba(27,58,92,0.13)',
  navyBorderLight: 'rgba(27,58,92,0.16)',
  navyShadow: 'rgba(27,58,92,0.40)',

  // ── Copper (accent / escrow) ────────────────────────────────
  copper: '#B8752A',
  copperDark: '#8F5A1F',
  copperLight: '#E4A45F',
  copperBg: '#FBF3E8',
  copperBgAlpha: 'rgba(184,117,42,0.16)',
  copperBorder: 'rgba(184,117,42,0.50)',
  copperBorderLight: 'rgba(184,117,42,0.40)',

  // ── Ink (text) ──────────────────────────────────────────────
  ink: '#14293D',
  inkSecondary: '#3E4C59',
  inkTertiary: '#5A6673',
  inkMuted: '#6B7783',
  inkLabel: '#7D8896',
  inkSubtle: '#8B96A3',
  inkPlaceholder: '#9AA5B1',

  // ── Sand (backgrounds) ─────────────────────────────────────
  pageBg: '#FDFBF7',
  cardBg: '#FFFFFF',
  sandBg: '#F1EDE6',
  sandDark: '#E4DDD1',
  sandLight: '#F6F3ED',
  sandWarm: '#FCFAF6',

  // ── Escrow banner ───────────────────────────────────────────
  escrowTextLight: '#F3E4D2',
  escrowTextAccent: '#C9DCEC',
  escrowInfoBg: '#D8E5F0',

  // ── Success / verify ────────────────────────────────────────
  green: '#2E7D5B',
  greenBg: '#E6F2EC',

  // ── Danger / dispute ────────────────────────────────────────
  red: '#7A2F2F',
  redBg: '#F3DEDE',
  redBorder: '#E0B9B9',

  // ── Status chrome ───────────────────────────────────────────
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type EHColor = keyof typeof EHColors;

/** Fonts used in the prototype (mapped to system fonts for now). */
export const EHFonts = {
  /** Archivo — headings, prices, CTA labels */
  heading: 'System',
  /** Karla — body text */
  body: 'System',
  /** IBM Plex Mono — labels, badges, mono accents */
  mono: 'System',
} as const;
