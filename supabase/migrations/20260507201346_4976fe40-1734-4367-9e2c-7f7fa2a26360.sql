-- Move has_role into a private schema so it cannot be invoked via PostgREST
CREATE SCHEMA IF NOT EXISTS private;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
-- RLS policies execute as table owner (postgres) which retains EXECUTE by default.

-- Recreate RLS policies that referenced public.has_role to use private.has_role
DROP POLICY IF EXISTS "Admins delete links" ON public.admin_links;
DROP POLICY IF EXISTS "Admins insert links" ON public.admin_links;
DROP POLICY IF EXISTS "Admins update links" ON public.admin_links;
DROP POLICY IF EXISTS "Admins view all links" ON public.admin_links;
DROP POLICY IF EXISTS "Admins view all roles" ON public.user_roles;

CREATE POLICY "Admins view all links" ON public.admin_links
  FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert links" ON public.admin_links
  FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update links" ON public.admin_links
  FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete links" ON public.admin_links
  FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins view all roles" ON public.user_roles
  FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));

-- Drop the now-unused public.has_role function (was exposed via PostgREST)
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);