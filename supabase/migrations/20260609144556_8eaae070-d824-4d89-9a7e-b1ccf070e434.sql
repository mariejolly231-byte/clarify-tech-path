ALTER TABLE public.workshop_responses
  ADD COLUMN IF NOT EXISTS nocode_def text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS ai_def text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS tools_other text CHECK (length(tools_other) <= 200);