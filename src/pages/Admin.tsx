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
import { LogOut, Plus, ExternalLink, Pencil, Trash2, Link as LinkIcon, Shield, Search, Folder, StickyNote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminNotes from "@/components/admin/AdminNotes";

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
  const [search, setSearch] = useState("");

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth", { replace: true });
        return;
      }
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);
      const admin = roles?.some((r) => r.role === "admin") ?? false;
      if (!admin) {
        toast.error(rolesError ? `Errore ruoli: ${rolesError.message}` : "Accesso negato: non sei admin");
        await supabase.auth.signOut();
        navigate("/auth", { replace: true });
        return;
      }
      setIsAdmin(true);
      await loadLinks();
      setLoading(false);
    };
    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/auth", { replace: true });
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

  if (loading || !isAdmin) {
    return <div className="min-h-screen flex items-center justify-center">Caricamento...</div>;
  }

  // Filter by search
  const filtered = links.filter((l) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      l.title.toLowerCase().includes(q) ||
      l.url.toLowerCase().includes(q) ||
      (l.description?.toLowerCase().includes(q) ?? false) ||
      (l.category?.toLowerCase().includes(q) ?? false)
    );
  });

  // Group by category
  const grouped = filtered.reduce<Record<string, AdminLink[]>>((acc, l) => {
    const cat = l.category || "Generale";
    (acc[cat] ||= []).push(l);
    return acc;
  }, {});

  const categories = Object.keys(grouped).sort();
  const getHost = (url: string) => {
    try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return url; }
  };
  const faviconFor = (url: string) =>
    `https://www.google.com/s2/favicons?domain=${getHost(url)}&sz=64`;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 backdrop-blur-sm sticky top-0 z-20 bg-background/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold gradient-text truncate">Area Admin</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">I tuoi link sempre a portata di mano</p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button onClick={openCreate} className="glow-primary">
              <Plus className="h-4 w-4 sm:mr-2" /> <span className="hidden sm:inline">Nuovo link</span>
            </Button>
            <Button onClick={handleLogout} variant="outline" size="icon" title="Esci">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Stats + Search */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <div className="card-glass px-4 py-3 rounded-lg flex items-center gap-3">
              <LinkIcon className="h-4 w-4 text-primary" />
              <div>
                <div className="text-xs text-muted-foreground">Link totali</div>
                <div className="text-lg font-semibold leading-tight">{links.length}</div>
              </div>
            </div>
            <div className="card-glass px-4 py-3 rounded-lg flex items-center gap-3">
              <Folder className="h-4 w-4 text-primary" />
              <div>
                <div className="text-xs text-muted-foreground">Categorie</div>
                <div className="text-lg font-semibold leading-tight">
                  {new Set(links.map((l) => l.category || "Generale")).size}
                </div>
              </div>
            </div>
          </div>
          {links.length > 0 && (
            <div className="relative w-full sm:w-72">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cerca link..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          )}
        </div>

        {links.length === 0 ? (
          <div className="card-glass p-12 rounded-lg text-center">
            <LinkIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Nessun link salvato</h2>
            <p className="text-muted-foreground mb-4">Inizia aggiungendo il tuo primo link utile</p>
            <Button onClick={openCreate}><Plus className="h-4 w-4 mr-2" /> Aggiungi link</Button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card-glass p-12 rounded-lg text-center">
            <Search className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">Nessun risultato per "{search}"</p>
          </div>
        ) : (
          categories.map((cat) => (
            <section key={cat}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.15em]">
                  {cat}
                </h2>
                <Badge variant="secondary" className="text-[10px] h-5">{grouped[cat].length}</Badge>
                <div className="flex-1 h-px bg-border/60" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {grouped[cat].map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-glass p-4 rounded-lg group hover:border-primary hover:-translate-y-0.5 transition-all flex flex-col relative"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <img
                        src={faviconFor(link.url)}
                        alt=""
                        loading="lazy"
                        className="h-8 w-8 rounded-md bg-muted/40 border border-border/50 p-1 shrink-0"
                        onError={(e) => { (e.currentTarget.style.display = "none"); }}
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold truncate group-hover:text-primary transition-colors">{link.title}</h3>
                        <p className="text-xs text-muted-foreground truncate">{getHost(link.url)}</p>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                    {link.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{link.description}</p>
                    )}
                    <div className="flex gap-1 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm rounded-md border border-border/50">
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); openEdit(link); }}
                        className="p-1.5 hover:text-primary"
                        title="Modifica"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete(link.id); }}
                        className="p-1.5 hover:text-destructive"
                        title="Elimina"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </a>
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
