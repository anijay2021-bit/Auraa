# Auraa — Project Brief

> **Tagline:** Stop guessing. Start glowing.

---

## 1. Overview

Auraa is an AI-powered personal color analysis app built for women globally. It uses computer vision to identify each user's skin tone, undertone, and seasonal color palette — then recommends flattering colors for clothing, makeup, and accessories.

### Core Differentiator
Unlike existing Western-centric color analysis apps that misclassify deeper complexions, Auraa is trained and calibrated to **accurately analyze ALL skin tones**, with dedicated attention to:
- South Asian (deep olive, brown, wheatish)
- African & Afro-Caribbean (deep ebony, mahogany, chocolate)
- Latina (morena, mestiza, olive)
- Middle Eastern (golden brown, tan, olive)
- Southeast Asian (yellow-olive, tan, medium-dark)

### Target Audience
Women aged 18–40, globally. Especially underserved women of color who have historically been misclassified by generic tools.

---

## 2. Tech Stack

### Web App
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Hosting:** Vercel

### Mobile App
- **Framework:** Expo (React Native)
- **Target Platforms:** iOS & Android
- **OTA Updates:** Expo Updates / EAS

### Backend & Database
- **Platform:** Supabase
  - PostgreSQL database
  - Supabase Auth (email, Google, Apple SSO)
  - Supabase Storage (user-uploaded photos)
  - Supabase Edge Functions (lightweight serverless logic)

### AI / ML Services
| Service | Purpose |
|---|---|
| **Claude Sonnet 4.6 Vision API** (Anthropic) | Core color analysis — skin tone detection, undertone classification, seasonal palette recommendation |
| **Replicate IDM-VTON** | Virtual outfit try-on — overlay recommended color outfits on user's photo |

### Payments & Subscriptions
- **RevenueCat** — cross-platform subscription management (iOS, Android, Web)
  - Free tier: 1 analysis
  - Pro tier: unlimited analyses, try-on, wardrobe planner
  - Plans: Monthly & Annual

---

## 3. Core Features

### MVP (v1.0)
1. **Photo Upload / Camera Capture** — user submits a selfie or face photo
2. **AI Color Analysis** — Claude Vision identifies:
   - Skin tone (on a global, inclusive scale)
   - Undertone (warm / cool / neutral / olive)
   - Seasonal palette (Spring, Summer, Autumn, Winter + sub-types)
3. **Personalized Color Palette** — a visual swatch board of "best colors" and "colors to avoid"
4. **Results Report** — shareable PDF/image with the user's palette
5. **Paywall** — free 1 analysis; Pro for unlimited

### V2 Features
6. **Virtual Try-On** (Replicate IDM-VTON) — try recommended outfit colors on the user's photo
7. **Wardrobe Planner** — catalog existing wardrobe items and get "does this suit me?" ratings
8. **Shopping Links** — curated affiliate product recommendations in the user's palette
9. **Makeup Recommendations** — foundation, blush, lipstick & eyeshadow shades

---

## 4. Project Structure

```
auraa/
├── apps/
│   ├── web/               # Next.js web app
│   └── mobile/            # Expo React Native app
├── packages/
│   ├── ui/                # Shared UI components
│   ├── color-engine/      # Color analysis logic & Claude API wrapper
│   └── config/            # Shared config, constants, types
├── supabase/
│   ├── migrations/        # Database schema migrations
│   └── functions/         # Edge functions
├── CLAUDE.md
├── .env.local
└── package.json           # Monorepo root (Turborepo)
```

---

## 5. Database Schema (High-Level)

### `users`
| Column | Type | Notes |
|---|---|---|
| id | uuid | Supabase Auth user ID |
| email | text | |
| display_name | text | |
| created_at | timestamptz | |
| subscription_tier | text | free / pro |

### `analyses`
| Column | Type | Notes |
|---|---|---|
| id | uuid | |
| user_id | uuid | FK → users |
| photo_url | text | Supabase Storage URL |
| skin_tone | text | e.g. "Deep Warm Brown" |
| undertone | text | warm / cool / neutral / olive |
| season | text | e.g. "Deep Autumn" |
| palette_json | jsonb | Full color palette data |
| raw_claude_response | jsonb | Full API response for audit |
| created_at | timestamptz | |

### `tryon_results`
| Column | Type | Notes |
|---|---|---|
| id | uuid | |
| analysis_id | uuid | FK → analyses |
| outfit_url | text | Input garment image |
| result_url | text | Supabase Storage URL of output |
| replicate_id | text | Replicate prediction ID |
| created_at | timestamptz | |

---

## 6. Claude Vision Prompt Design

The core analysis prompt sent to **Claude Sonnet 4.6 Vision** should:
- Explicitly instruct the model to account for global skin tone diversity
- Ask for: skin tone name (using inclusive language), undertone, seasonal type, best colors (6–12 swatches with hex codes), colors to avoid (4–6), and confidence score
- Return structured JSON for easy parsing
- Guard against bias — instruct the model not to default to Western seasonal naming that excludes deeper skin tones

---

## 7. Monetization

| Tier | Price | Features |
|---|---|---|
| Free | $0 | 1 color analysis lifetime |
| Pro Monthly | $9.99/mo | Unlimited analyses, try-on, wardrobe planner |
| Pro Annual | $59.99/yr | All Pro features + priority support |

Payments handled via **RevenueCat** with App Store, Google Play, and Stripe (web) as backends.

---

## 8. Key Constraints & Notes for Claude

- Always use **inclusive, global language** when naming skin tones — never map everything to Fitzpatrick scale alone.
- The color analysis must work on **compressed mobile photos** — prompt engineering must be robust to lighting variance.
- **Privacy first** — user photos must be deleted from Supabase Storage after analysis unless the user explicitly saves them.
- All API keys live in `.env.local` (never committed to git).
- Use **TypeScript** throughout (strict mode).
- Mobile app must support **offline caching** of results.
- Target **WCAG AA** accessibility across the web app.

---

## 9. Environment Variables

All environment variables are defined in `.env.local`. See that file for the full list of required keys.

---

*Last updated: March 2026*
