# Design Brief: ReviveRoots

**Purpose**: AI-powered cultural heritage revival platform connecting communities to preserve traditions, languages, crafts, stories, and monuments.

**Tone**: Luxury-refined + heritage-authentic. Museum-like prestige with modern accessibility. Emotional resonance through typography and intentional spacing.

**Differentiation**: Premium gradient hero with floating glowing orbs, smooth scroll-reveal animations, glassmorphism cards, elegant serif display typography paired with clean body sans-serif.

## Color Palette (OKLCH)

| Role | Value | Usage |
|------|-------|-------|
| Primary (Deep Blue) | 0.12 0.08 260 | Navigation, headings, CTAs, primary interactive |
| Secondary (Gold) | 0.68 0.22 86 | Accents, highlights, premium emphasis |
| Tertiary (Terracotta) | 0.58 0.16 40 | Supporting accents, cultural warmth |
| Background | 0.99 0.01 240 | Light page background |
| Card | 0.98 0.02 240 | Glassmorphism surfaces |
| Muted | 0.92 0.01 240 | Secondary surfaces |
| Foreground | 0.12 0.08 260 | Body text, primary contrast |

## Typography

| Layer | Font | Scale | Usage |
|-------|------|-------|-------|
| Display | Instrument Serif | 48px, 36px, 28px | Main headings, hero, section titles |
| Body | Plus Jakarta Sans | 16px, 14px, 12px | Copy, descriptions, UI text |
| Mono | JetBrains Mono | 14px, 12px | Code, technical content |

## Elevation & Depth

- **Base**: bg-background (0.99 0.01 240)
- **Elevated**: bg-card with glass effect (0.98 0.02 240, backdrop blur 8px, border 0.2 opacity)
- **Premium**: shadow-premium (0 20px 60px, deep blue at 0.12 opacity)
- **Accent glow**: shadow-glow (0 0 30px gold at 0.15 opacity)

## Structural Zones

| Zone | Treatment | Depth |
|------|-----------|-------|
| Header/Nav | bg-card with border-b, glass effect | Elevated +1 |
| Hero Section | bg-background + gradient overlay + floating orbs | Layered |
| Content Cards | bg-card + glass + shadow-elevated | Elevated +1 |
| Footer | bg-muted/40 + border-t | Subtle |

## Module Color Accents

| Module | Accent Color (OKLCH) | Gradient | Purpose |
|--------|----------------------|----------|---------|
| Heritage Identity Scanner | Purple (0.55 0.18 280) | gradient-purple | Introspection, identity exploration |
| Lost Language Revival Engine | Indigo (0.5 0.2 270) | gradient-indigo | Linguistics, ancient knowledge |
| AR Time Travel Mode | Cyan (0.65 0.18 200) | gradient-cyan | Futuristic, immersive tech |
| AI Storykeeper | Amber (0.72 0.16 60) | gradient-amber | Storytelling, nostalgia, warmth |
| Tradition Recommendation Engine | Coral (0.65 0.19 20) | gradient-coral | Celebration, joy, vitality |
| Digital Gurukul | Saffron (0.68 0.2 50) | gradient-saffron | Spirituality, cultural learning |
| Heritage Marketplace | Terracotta (0.6 0.16 40) | gradient-saffron | Artisan commerce, heritage crafts |
| Festival Planner AI | Magenta (0.6 0.2 330) | gradient-magenta | Celebration, vibrancy, community |

## Module Utilities

Each module accesses: `glass-{module}`, `shadow-glow-{module}`, `text-{module}`, `gradient-text-{module}`, `border-{module}` classes.
For example: `.glass-purple`, `.shadow-glow-cyan`, `.text-amber`, `.gradient-text-magenta`.

## Spacing & Rhythm

- **Gap ratio**: 3:2 (rich breathing room between sections)
- **Card padding**: 24px (1.5rem)
- **Section margin**: 64px (4rem) vertical
- **Grid**: 12-column mobile-first responsive

## Component Patterns

- **Buttons**: Primary (bg-primary, text-white), Secondary (bg-transparent, border, text-primary), Glass variant (glass class)
- **Cards**: glass class + shadow-elevated + hover:shadow-premium + transition-smooth
- **Hero**: gradient-primary overlay, animated floating elements
- **Text**: gradient-text for accent headings, text-balance for long copy

## Motion & Animation

- **Fade-in-up**: 0.6s ease-out on scroll reveal
- **Float**: 3s infinite on decorative orbs
- **Pulse-glow**: 2s infinite on accent elements
- **Smooth transitions**: 0.3s cubic-bezier(0.4, 0, 0.2, 1) on all interactive

## Constraints

- No dark purple or generic tech blues
- No garish neon glows; keep gold glow at 0.15 opacity max
- Glassmorphism only on cards; not full-page frosted glass
- Serif display only in headings; never in body text
- Animations disabled on prefers-reduced-motion

## Authentication & Dashboard

| Component | Style | Notes |
|-----------|-------|-------|
| Form Containers | glass-dark (blur 8px, deep blue 0.6 opacity) | Gold focus glow on inputs |
| Buttons (Primary) | Solid gold with deep blue text | Glow on hover, disabled state at 0.6 opacity |
| Buttons (Secondary) | Border gold, transparent bg | Hover reveals light gold background |
| Error/Success Text | Red (0.55 0.22 25) / Teal (0.6 0.15 160) | Small, always under input |
| Stat Cards | glass-dark, 1.5rem padding | Center text, module accent colors optional |
| Dashboard Grid | Auto-fit columns (min 200px), 1.5rem gap | Responsive mobile-first |
| Activity Feed | Bordered list items, timestamp gray | Lightweight, scrollable |

## Signature Detail

Premium shadow hierarchy (elevated vs. premium) combined with subtle glassmorphism, gold accent glow, and module-specific accent colors creates a high-end cultural institution feel. Floating orbs reinforce organic, living heritage theme. Each of 8 feature modules has a unique, culturally-meaningful accent color (purple for identity, indigo for language, cyan for AR/future, amber for storytelling, coral for joy, saffron for spirituality, terracotta for craftsmanship, magenta for celebration). Glassmorphism cards with module-colored borders and glows ensure visual cohesion while maintaining distinct module identity. Auth forms use gold accent focus states and consistent form styling to maintain premium UX throughout entire user journey.
