CREATE TABLE public.workshop_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  nocode_level smallint CHECK (nocode_level BETWEEN 1 AND 5),
  ai_level smallint CHECK (ai_level BETWEEN 1 AND 5),
  ai_usage text[] NOT NULL DEFAULT '{}',
  tools_automation text,
  tools_tested text[] NOT NULL DEFAULT '{}',
  goals text[] NOT NULL DEFAULT '{}',
  repetitive_task text
);

GRANT SELECT, INSERT ON public.workshop_responses TO anon;
GRANT SELECT, INSERT ON public.workshop_responses TO authenticated;
GRANT ALL ON public.workshop_responses TO service_role;

ALTER TABLE public.workshop_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a response"
  ON public.workshop_responses FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read responses"
  ON public.workshop_responses FOR SELECT
  TO anon, authenticated
  USING (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.workshop_responses;