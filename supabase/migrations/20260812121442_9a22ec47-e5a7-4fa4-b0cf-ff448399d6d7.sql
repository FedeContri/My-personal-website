GRANT INSERT ON public.page_views TO anon;
GRANT INSERT ON public.page_views TO authenticated;
DELETE FROM auth.users WHERE email = 'strix-test@fd-portfolio.site';