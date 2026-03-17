-- Migration 002 — Analyses table
-- Stores each color analysis run by a user.

CREATE TABLE IF NOT EXISTS public.analyses (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  -- Photo storage
  photo_url     TEXT NOT NULL,  -- Supabase Storage URL

  -- Claude Vision results (denormalized for fast reads)
  skin_depth    TEXT NOT NULL CHECK (skin_depth IN ('fair','light','medium','tan','deep','rich')),
  undertone     TEXT NOT NULL CHECK (undertone IN ('warm','cool','neutral','olive')),
  season        TEXT NOT NULL,  -- e.g. 'deep_autumn'
  season_label  TEXT NOT NULL,  -- e.g. 'Deep Autumn'

  -- Full structured palette result (JSON)
  palette       JSONB NOT NULL,

  -- Analysis metadata
  confidence    NUMERIC(4,3) CHECK (confidence BETWEEN 0 AND 1),
  model_version TEXT NOT NULL DEFAULT 'claude-sonnet-4-6',
  raw_response  JSONB,          -- full Claude API response for audit/debug

  -- Timestamps
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast user history lookups
CREATE INDEX analyses_user_id_idx ON public.analyses (user_id, created_at DESC);

-- Row Level Security
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own analyses"
  ON public.analyses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analyses"
  ON public.analyses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own analyses"
  ON public.analyses FOR DELETE
  USING (auth.uid() = user_id);

-- Increment analyses_count on the user row when a new analysis is inserted
CREATE OR REPLACE FUNCTION public.increment_analyses_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.users
    SET analyses_count = analyses_count + 1
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_analysis_created
  AFTER INSERT ON public.analyses
  FOR EACH ROW EXECUTE FUNCTION public.increment_analyses_count();
