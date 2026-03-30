
-- Table to store brand scan leads and results
CREATE TABLE public.brand_scans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  site_url TEXT NOT NULL,
  score NUMERIC(3,1),
  report JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.brand_scans ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (lead capture)
CREATE POLICY "Anyone can insert brand scans"
ON public.brand_scans
FOR INSERT
WITH CHECK (true);

-- Allow reading own scan by id (for result page)
CREATE POLICY "Anyone can read brand scans"
ON public.brand_scans
FOR SELECT
USING (true);
