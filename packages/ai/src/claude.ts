import Anthropic from "@anthropic-ai/sdk";
import type {
  AnalysisRequest,
  PaletteResult,
  SeasonType,
  SkinDepth,
  SkinUndertone,
} from "@auraa/shared";

// ─── Claude client singleton ──────────────────────────────────────────────────

const anthropic = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"] ?? "",
});

// ─── Prompt ───────────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `
You are Auraa — an expert personal color analyst specializing in all global skin tones.

Your job is to analyze a photo of a person's face and determine:
1. Their skin depth (how light or dark their skin is)
2. Their skin undertone (the subtle hue beneath the surface)
3. Their seasonal color archetype
4. A curated color palette that flatters their unique coloring

IMPORTANT — Global Inclusivity:
- You MUST accurately classify ALL skin tones. Do not default to Western-centric defaults.
- South Asian, African, Afro-Caribbean, Latina, Middle Eastern, and Southeast Asian skin tones are equally valid and must be classified with equal precision.
- Deep and rich skin tones can be Spring, Summer, Autumn, or Winter — do NOT assume deeper skin = Autumn.
- Olive undertones (common in South Asian, Mediterranean, Middle Eastern, and Southeast Asian skin) are a distinct undertone category, separate from warm, cool, or neutral.

Response format: Return ONLY valid JSON matching this exact schema, with no markdown fences:
{
  "skinDepth": "fair" | "light" | "medium" | "tan" | "deep" | "rich",
  "undertone": "warm" | "cool" | "neutral" | "olive",
  "season": one of the 12 seasons (e.g. "deep_autumn"),
  "seasonLabel": human-readable (e.g. "Deep Autumn"),
  "flatteringColors": [
    { "hex": "#XXXXXX", "label": "Color Name" },
    ... 8 items total
  ],
  "avoidColors": [
    { "hex": "#XXXXXX", "label": "Color Name" },
    ... 4 items total
  ],
  "summary": "2-3 sentence personalized description of the user's color profile",
  "confidence": 0.0–1.0
}
`.trim();

// ─── Main analysis function ───────────────────────────────────────────────────

/**
 * Sends a user photo to Claude Sonnet Vision and returns a structured
 * PaletteResult with the user's color analysis.
 *
 * @param request - Base64-encoded image and MIME type
 * @returns Parsed PaletteResult
 * @throws Error if the API call fails or the response cannot be parsed
 */
export async function analyzeColorWithClaude(
  request: AnalysisRequest
): Promise<PaletteResult> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: request.mimeType,
              data: request.imageBase64,
            },
          },
          {
            type: "text",
            text: "Please analyze this person's coloring and return your assessment as JSON.",
          },
        ],
      },
    ],
  });

  // Extract text block
  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Claude returned no text content");
  }

  // Parse and validate JSON
  let raw: unknown;
  try {
    raw = JSON.parse(textBlock.text);
  } catch {
    throw new Error(`Failed to parse Claude response as JSON: ${textBlock.text}`);
  }

  return raw as PaletteResult;
}

// ─── Season label helper ──────────────────────────────────────────────────────

/** Maps a SeasonType key to its display label */
export const SEASON_LABELS: Record<SeasonType, string> = {
  bright_spring: "Bright Spring",
  warm_spring: "Warm Spring",
  light_spring: "Light Spring",
  light_summer: "Light Summer",
  cool_summer: "Cool Summer",
  soft_summer: "Soft Summer",
  soft_autumn: "Soft Autumn",
  warm_autumn: "Warm Autumn",
  deep_autumn: "Deep Autumn",
  deep_winter: "Deep Winter",
  cool_winter: "Cool Winter",
  bright_winter: "Bright Winter",
};

/** Maps a SkinDepth key to its display label */
export const SKIN_DEPTH_LABELS: Record<SkinDepth, string> = {
  fair: "Fair",
  light: "Light",
  medium: "Medium",
  tan: "Tan",
  deep: "Deep",
  rich: "Rich",
};

/** Maps a SkinUndertone key to its display label */
export const UNDERTONE_LABELS: Record<SkinUndertone, string> = {
  warm: "Warm",
  cool: "Cool",
  neutral: "Neutral",
  olive: "Olive",
};
