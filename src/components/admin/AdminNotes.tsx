import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2, StickyNote, Search, Check, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Note {
  id: string;
  title: string | null;
  content: string;
  updated_at: string;
}

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const AdminNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState<"idle" | "saving" | "saved">("idle");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipNextSaveRef = useRef(false);

  const active = notes.find((n) => n.id === activeId) || null;

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("admin_notes")
      .select("id, title, content, updated_at")
      .order("updated_at", { ascending: false });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    setNotes(data || []);
    if (data && data.length > 0 && !activeId) {
      selectNote(data[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const selectNote = (n: Note) => {
    skipNextSaveRef.current = true;
    setActiveId(n.id);
    setTitle(n.title || "");
    setContent(n.content || "");
    setSaving("idle");
  };

  const createNote = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    const { data, error } = await supabase
      .from("admin_notes")
      .insert({ user_id: session.user.id, title: "", content: "" })
      .select("id, title, content, updated_at")
      .single();
    if (error) return toast.error(error.message);
    setNotes((prev) => [data, ...prev]);
    selectNote(data);
  };

  const deleteNote = async (id: string) => {
    if (!confirm("Eliminare questo appunto?")) return;
    const { error } = await supabase.from("admin_notes").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (activeId === id) {
      setActiveId(null);
      setTitle("");
      setContent("");
    }
    toast.success("Appunto eliminato");
  };

  // Autosave on title/content change (debounced)
  useEffect(() => {
    if (!activeId) return;
    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false;
      return;
    }
    setSaving("saving");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const { data, error } = await supabase
        .from("admin_notes")
        .update({ title: title || null, content })
        .eq("id", activeId)
        .select("id, title, content, updated_at")
        .single();
      if (error) {
        setSaving("idle");
        toast.error(error.message);
        return;
      }
      setNotes((prev) =>
        [data, ...prev.filter((n) => n.id !== data.id)].sort(
          (a, b) => +new Date(b.updated_at) - +new Date(a.updated_at)
        )
      );
      setSaving("saved");
      setTimeout(() => setSaving("idle"), 1200);
    }, 600);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content]);

  const filtered = notes.filter((n) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      (n.title?.toLowerCase().includes(q) ?? false) ||
      n.content.toLowerCase().includes(q)
    );
  });

  return (
    <div className="grid md:grid-cols-[280px_1fr] gap-4 min-h-[60vh]">
      {/* Sidebar list */}
      <aside className="card-glass rounded-lg flex flex-col overflow-hidden">
        <div className="p-3 border-b border-border/60 space-y-2">
          <Button onClick={createNote} className="w-full glow-primary" size="sm">
            <Plus className="h-4 w-4 mr-2" /> Nuovo appunto
          </Button>
          <div className="relative">
            <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cerca..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-sm"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">Caricamento...</div>
          ) : filtered.length === 0 ? (
            <div className="p-6 text-center">
              <StickyNote className="h-8 w-8 mx-auto text-muted-foreground/60 mb-2" />
              <p className="text-xs text-muted-foreground">
                {notes.length === 0 ? "Nessun appunto" : "Nessun risultato"}
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border/40">
              {filtered.map((n) => {
                const isActive = n.id === activeId;
                const preview = n.content.split("\n")[0]?.slice(0, 60) || "Vuoto";
                return (
                  <li key={n.id}>
                    <button
                      onClick={() => selectNote(n)}
                      className={`w-full text-left px-3 py-2.5 group transition-colors ${
                        isActive ? "bg-primary/10" : "hover:bg-muted/40"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span
                          className={`text-sm font-medium truncate ${
                            isActive ? "text-primary" : ""
                          }`}
                        >
                          {n.title?.trim() || "Senza titolo"}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNote(n.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive shrink-0"
                          title="Elimina"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{preview}</p>
                      <p className="text-[10px] text-muted-foreground/70 mt-0.5">
                        {formatDate(n.updated_at)}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </aside>

      {/* Editor */}
      <section className="card-glass rounded-lg p-4 sm:p-6 flex flex-col">
        {!active ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground">
            <StickyNote className="h-12 w-12 mb-3 opacity-60" />
            <p className="mb-4">Seleziona un appunto o creane uno nuovo</p>
            <Button onClick={createNote} variant="outline">
              <Plus className="h-4 w-4 mr-2" /> Nuovo appunto
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-3 mb-3">
              <Input
                placeholder="Titolo dell'appunto..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-semibold border-0 bg-transparent focus-visible:ring-0 px-0 shadow-none"
              />
              <Badge
                variant="secondary"
                className="text-[10px] h-5 shrink-0 gap-1"
              >
                {saving === "saving" ? (
                  <><Loader2 className="h-3 w-3 animate-spin" /> Salvataggio</>
                ) : saving === "saved" ? (
                  <><Check className="h-3 w-3" /> Salvato</>
                ) : (
                  <>{formatDate(active.updated_at)}</>
                )}
              </Badge>
            </div>
            <Textarea
              placeholder="Scrivi qui i tuoi appunti... Markdown supportato visivamente con righe vuote."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 min-h-[50vh] resize-none font-mono text-sm leading-relaxed bg-transparent"
            />
          </>
        )}
      </section>
    </div>
  );
};

export default AdminNotes;
