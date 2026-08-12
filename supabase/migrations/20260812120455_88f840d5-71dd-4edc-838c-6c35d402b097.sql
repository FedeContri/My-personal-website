DROP POLICY IF EXISTS "Anyone can insert page views" ON public.page_views;
REVOKE INSERT ON public.page_views FROM anon;
REVOKE INSERT ON public.page_views FROM authenticated;