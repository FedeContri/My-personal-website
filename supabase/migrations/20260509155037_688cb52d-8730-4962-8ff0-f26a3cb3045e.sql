
CREATE TABLE public.page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL,
  visitor_hash TEXT,
  referrer TEXT,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_page_views_created_at ON public.page_views(created_at DESC);
CREATE INDEX idx_page_views_path ON public.page_views(path);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can record a view"
ON public.page_views
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(path) > 0 AND length(path) < 512
  AND (visitor_hash IS NULL OR length(visitor_hash) < 128)
  AND (referrer IS NULL OR length(referrer) < 512)
  AND (country IS NULL OR length(country) < 8)
);

CREATE POLICY "Admins view all views"
ON public.page_views
FOR SELECT
TO authenticated
USING (private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins delete views"
ON public.page_views
FOR DELETE
TO authenticated
USING (private.has_role(auth.uid(), 'admin'::app_role));
