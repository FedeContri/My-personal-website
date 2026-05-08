CREATE TABLE public.admin_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT,
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins view notes" ON public.admin_notes
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins insert notes" ON public.admin_notes
  FOR INSERT TO authenticated
  WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role) AND auth.uid() = user_id);

CREATE POLICY "Admins update notes" ON public.admin_notes
  FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins delete notes" ON public.admin_notes
  FOR DELETE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_admin_notes_updated_at
  BEFORE UPDATE ON public.admin_notes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_admin_notes_user_updated ON public.admin_notes(user_id, updated_at DESC);