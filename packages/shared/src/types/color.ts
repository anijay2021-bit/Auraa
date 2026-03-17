// ─── Season Types ────────────────────────────────────────────────────────────

/**
 * The 12 seasonal archetypes used in Auraa's color analysis.
 * Extended beyond the standard 4 seasons to cover a wider range of palettes,
 * particularly for deeper and more richly pigmented skin tones.
 */
export type SeasonType =
  | "bright_spring"
  | "warm_spring"
  | "light_spring"
  | "light_summer"
  | "cool_summer"
  | "soft_summer"
  | "soft_autumn"
  | "warm_autumn"
  | "deep_autumn"
  | "deep_winter"
  | "cool_winter"
  | "bright_winter";

// ─── Undertone ───────────────────────────────────────────────────────────────

/**
 * Skin undertone — the subtle hue beneath the surface complexion.
 * 'olive' is included as a distinct category, common in South Asian,
 * Middle Eastern, and Mediterranean skin tones.
 */
export type SkinUndertone = "warm" | "cool" | "neutral" | "olive";

// ─── Skin Depth ──────────────────────────────────────────────────────────────

/**
 * Describes the depth (lightness/darkness) of a skin tone on a 6-step scale
 * calibrated for global, inclusive skin tone representation.
 *
 * - fair:   Very light, minimal melanin (e.g., porcelain, ivory)
 * - light:  Light with some warmth or pinkness (e.g., beige, nude)
 * - medium: Moderate melanin, neutral or warm (e.g., buff, honey)
 * - tan:    Visibly warm-to-medium brown (e.g., caramel, golden)
 * - deep:   Rich brown tones (e.g., mahogany, espresso)
 * - rich:   Deepest tones with the highest melanin (e.g., ebony, obsidian)
 */
export type SkinDepth = "fair" | "light" | "medium" | "tan" | "deep" | "rich";

// ─── Palette Result ──────────────────────────────────────────────────────────

/** A single color swatch with a hex value and a descriptive label */
export interface ColorSwatch {
  /** Hex color code, e.g. "#C4763A" */
  hex: string;
  /** Human-readable color name, e.g. "Warm Terracotta" */
  label: string;
}

/**
 * The full result of a Auraa color analysis.
 * Returned by the Claude Vision API and stored in the `analyses` table.
 */
export interface PaletteResult {
  /** Detected skin depth category */
  skinDepth: SkinDepth;

  /** Detected skin undertone */
  undertone: SkinUndertone;

  /** Assigned seasonal color type */
  season: SeasonType;

  /** Friendly display label for the season, e.g. "Deep Autumn" */
  seasonLabel: string;

  /**
   * 8 flattering colors that harmonize with the user's coloring.
   * Includes clothing, accessories, and makeup recommendations.
   */
  flatteringColors: [
    ColorSwatch,
    ColorSwatch,
    ColorSwatch,
    ColorSwatch,
    ColorSwatch,
    ColorSwatch,
    ColorSwatch,
    ColorSwatch,
  ];

  /**
   * 4 colors that tend to wash out or clash with the user's coloring.
   * Presented as "colors to avoid" in the UI.
   */
  avoidColors: [ColorSwatch, ColorSwatch, ColorSwatch, ColorSwatch];

  /**
   * A short, personalized description of the user's color profile.
   * Shown in the results card and shareable report.
   */
  summary: string;

  /**
   * Model confidence score 0–1.
   * Displayed as a quality indicator in the app.
   */
  confidence: number;
}

// ─── Analysis Request / Response ─────────────────────────────────────────────

/** Payload sent to the analysis API route */
export interface AnalysisRequest {
  /** Base64-encoded image string (JPEG or PNG) */
  imageBase64: string;
  /** MIME type of the image */
  mimeType: "image/jpeg" | "image/png" | "image/webp";
}

/** Full analysis record as stored in Supabase */
export interface AnalysisRecord {
  id: string;
  userId: string;
  photoUrl: string;
  palette: PaletteResult;
  createdAt: string;
}

// ─── Wardrobe ────────────────────────────────────────────────────────────────

export type WardrobeCategory =
  | "top"
  | "bottom"
  | "dress"
  | "outerwear"
  | "shoes"
  | "bag"
  | "accessory"
  | "other";

/** A single item in the user's digital wardrobe */
export interface WardrobeItem {
  id: string;
  userId: string;
  photoUrl: string;
  category: WardrobeCategory;
  dominantColor: string; // hex
  label: string;
  /** Whether this item sits within the user's flattering palette */
  isFlatteringMatch: boolean | null;
  createdAt: string;
}
