-- Migration 003 — Wardrobe Items table
-- Stores items from a user's digital wardrobe for color-matching.

CREATE TABLE IF NOT EXISTS public.wardrobe_items (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  -- Item photo
  photo_url           TEXT NOT NULL,  -- Supabase Storage URL

  -- Item details
  label               TEXT NOT NULL,
  category            TEXT NOT NULL CHECK (
                        category IN ('top','bottom','dress','outerwear','shoes','bag','accessory','other')
                      ),
  dominant_color      TEXT NOT NULL,  -- hex e.g. '#C4763A'

  -- Palette compatibility (set after analysis)
  is_flattering_match BOOLEAN,        -- NULL = not yet evaluated
  linked_analysis_id  UUID REFERENCES public.analyses(id) ON DELETE SET NULL,

  -- Timestamps
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at on row change
CREATE TRIGGER wardrobe_items_updated_at
  BEFORE UPDATE ON public.wardrobe_items
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Indexes
CREATE INDEX wardrobe_user_id_idx ON public.wardrobe_items (user_id, created_at DESC);
CREATE INDEX wardrobe_category_idx ON public.wardrobe_items (user_id, category);

-- Row Level Security
ALTER TABLE public.wardrobe_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own wardrobe"
  ON public.wardrobe_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert into own wardrobe"
  ON public.wardrobe_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own wardrobe items"
  ON public.wardrobe_items FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own wardrobe items"
  ON public.wardrobe_items FOR DELETE
  USING (auth.uid() = user_id);
