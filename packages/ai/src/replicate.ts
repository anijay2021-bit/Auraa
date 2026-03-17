import Replicate from "replicate";

// ─── Replicate client singleton ───────────────────────────────────────────────

const replicate = new Replicate({
  auth: process.env["REPLICATE_API_TOKEN"] ?? "",
});

// ─── IDM-VTON model reference ─────────────────────────────────────────────────

/**
 * IDM-VTON — image-based virtual try-on model.
 * https://replicate.com/yisol/idm-vton
 */
const IDM_VTON_MODEL =
  "yisol/idm-vton:906425dbca90663ff5427624839572cc56ea7d380343d13e2a4c4b09d3f0c30f";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TryOnRequest {
  /** URL of the person/model photo (full body preferred) */
  humanImageUrl: string;
  /** URL of the garment photo (flat-lay on white background) */
  garmentImageUrl: string;
  /** Optional garment description to help the model (e.g. "red floral dress") */
  garmentDescription?: string;
}

export interface TryOnResult {
  /** Supabase Storage URL of the composited try-on image */
  outputImageUrl: string;
  /** Replicate prediction ID for audit/debugging */
  predictionId: string;
}

// ─── Main try-on function ─────────────────────────────────────────────────────

/**
 * Runs the IDM-VTON virtual try-on model on Replicate.
 * Places the specified garment onto the person in the human image.
 *
 * @param request - Human photo URL and garment photo URL
 * @returns TryOnResult containing the output image URL and prediction ID
 * @throws Error if the prediction fails or returns no output
 */
export async function runVirtualTryOn(
  request: TryOnRequest
): Promise<TryOnResult> {
  const prediction = await replicate.predictions.create({
    version: IDM_VTON_MODEL.split(":")[1]!,
    input: {
      human_img: request.humanImageUrl,
      garm_img: request.garmentImageUrl,
      garment_des: request.garmentDescription ?? "a stylish outfit",
      is_checked: true,
      is_checked_crop: false,
      denoise_steps: 30,
      seed: 42,
    },
  });

  // Poll until completion (max ~3 minutes)
  const completed = await replicate.wait(prediction, { interval: 3000 });

  if (completed.status === "failed") {
    throw new Error(`Replicate prediction failed: ${completed.error ?? "unknown error"}`);
  }

  const output = completed.output as string[] | string | undefined;
  const outputUrl = Array.isArray(output) ? (output[0] ?? null) : (output ?? null);

  if (!outputUrl) {
    throw new Error("Replicate returned no output image");
  }

  return {
    outputImageUrl: outputUrl,
    predictionId: completed.id,
  };
}
