import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { LogOut, Plus, ExternalLink, Pencil, Trash2, Link as LinkIcon, ShieldAlert } from "lucide-react";

interface AdminLink {
  id: string;
  title: string;
  url: string;
  description: string | null;
  category: string | null;
  icon: string | null;
}

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [links, setLinks] = useState<AdminLink[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AdminLink | null>(null);
  const [form, setForm] = useState({ title: "", url: "", description: "", category: "" });

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);
      const admin = roles?.some((r) => r.role === "admin") ?? false;
      setIsAdmin(admin);
      if (admin) await loadLinks();
      setLoading(false);
    };
    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/auth");
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const loadLinks = async () => {
    const { data, error } = await supabase
      .from("admin_links")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setLinks(data || []);
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ title: "", url: "", description: "", category: "" });
    setDialogOpen(true);
  };

  const openEdit = (link: AdminLink) => {
    setEditing(link);
    setForm({
      title: link.title,
      url: link.url,
      description: link.description || "",
      category: link.category || "",
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const payload = {
      title: form.title.trim(),
      url: form.url.trim(),
      description: form.description.trim() || null,
      category: form.category.trim() || null,
    };

    if (editing) {
      const { error } = await supabase.from("admin_links").update(payload).eq("id", editing.id);
      if (error) return toast.error(error.message);
      toast.success("Link aggiornato");
    } else {
      const { error } = await supabase.from("admin_links").insert({ ...payload, user_id: session.user.id });
      if (error) return toast.error(error.message);
      toast.success("Link aggiunto");
    }
    setDialogOpen(false);
    loadLinks();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Eliminare questo link?")) return;
    const { error } = await supabase.from("admin_links").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Eliminato");
    loadLinks();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Caricamento...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card-glass p-8 rounded-lg max-w-md text-center space-y-4">
          <ShieldAlert className="h-12 w-12 text-destructive mx-auto" />
          <h1 className="text-2xl font-bold">Accesso negato</h1>
          <p className="text-muted-foreground">Non hai i permessi per accedere a questa area.</p>
          <Button onClick={handleLogout} variant="outline">Esci</Button>
        </div>
      </div>
    );
  }

  // Group by category
  const grouped = links.reduce<Record<string, AdminLink[]>>((acc, l) => {
    const cat = l.category || "Generale";
    (acc[cat] ||= []).push(l);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold gradient-text">Area Admin</h1>
            <p className="text-sm text-muted-foreground">I tuoi link sempre a portata di mano</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={openCreate} className="glow-primary">
              <Plus className="h-4 w-4 mr-2" /> Nuovo link
            </Button>
            <Button onClick={handleLogout} variant="outline" size="icon">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {links.length === 0 ? (
          <div className="card-glass p-12 rounded-lg text-center">
            <LinkIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Nessun link salvato</h2>
            <p className="text-muted-foreground mb-4">Inizia aggiungendo il tuo primo link utile</p>
            <Button onClick={openCreate}><Plus className="h-4 w-4 mr-2" /> Aggiungi link</Button>
          </div>
        ) : (
          Object.entries(grouped).map(([cat, items]) => (
            <section key={cat}>
              <h2 className="text-lg font-semibold mb-3 text-muted-foreground uppercase tracking-wider text-sm">
                {cat}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((link) => (
                  <div key={link.id} className="card-glass p-5 rounded-lg group hover:border-primary transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold truncate">{link.title}</h3>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(link)} className="p-1 hover:text-primary">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => handleDelete(link.id)} className="p-1 hover:text-destructive">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    {link.description && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{link.description}</p>
                    )}
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                    >
                      Apri <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Modifica link" : "Nuovo link"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Titolo *</Label>
              <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>URL *</Label>
              <Input required type="url" placeholder="https://..." value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Input placeholder="Es. Hosting, Tools, Docs..." value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Descrizione</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <DialogFooter>
              <Button type="submit" className="glow-primary">{editing ? "Salva" : "Aggiungi"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
