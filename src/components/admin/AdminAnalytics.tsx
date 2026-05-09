import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Eye, Users, TrendingUp, Globe } from "lucide-react";

interface ViewRow {
  path: string;
  visitor_hash: string | null;
  referrer: string | null;
  country: string | null;
  created_at: string;
}

const AdminAnalytics = () => {
  const [rows, setRows] = useState<ViewRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const since = new Date();
      since.setDate(since.getDate() - 30);
      const { data } = await supabase
        .from("page_views")
        .select("path,visitor_hash,referrer,country,created_at")
        .gte("created_at", since.toISOString())
        .order("created_at", { ascending: false })
        .limit(1000);
      setRows(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const viewsToday = rows.filter((r) => r.created_at.startsWith(today)).length;
  const uniqueVisitors = new Set(rows.map((r) => r.visitor_hash).filter(Boolean)).size;

  const topPages = Object.entries(
    rows.reduce<Record<string, number>>((acc, r) => {
      acc[r.path] = (acc[r.path] || 0) + 1;
      return acc;
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const topReferrers = Object.entries(
    rows.reduce<Record<string, number>>((acc, r) => {
      if (!r.referrer) return acc;
      acc[r.referrer] = (acc[r.referrer] || 0) + 1;
      return acc;
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Last 14 days mini chart
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return d.toISOString().slice(0, 10);
  });
  const dailyCounts = days.map((d) => rows.filter((r) => r.created_at.startsWith(d)).length);
  const maxDaily = Math.max(1, ...dailyCounts);

  if (loading) {
    return <div className="text-center text-muted-foreground py-12">Caricamento statistiche...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<Eye className="h-4 w-4 text-primary" />} label="Visite oggi" value={viewsToday} />
        <StatCard icon={<TrendingUp className="h-4 w-4 text-primary" />} label="Visite (30g)" value={rows.length} />
        <StatCard icon={<Users className="h-4 w-4 text-primary" />} label="Visitatori unici" value={uniqueVisitors} />
        <StatCard
          icon={<Globe className="h-4 w-4 text-primary" />}
          label="Paesi"
          value={new Set(rows.map((r) => r.country).filter(Boolean)).size}
        />
      </div>

      {/* Mini chart */}
      <div className="card-glass p-5 rounded-lg">
        <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
          Ultimi 14 giorni
        </h3>
        <div className="flex items-end gap-1.5 h-32">
          {dailyCounts.map((c, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
              <div
                className="w-full bg-primary/30 hover:bg-primary rounded-t transition-all"
                style={{ height: `${(c / maxDaily) * 100}%`, minHeight: c > 0 ? "4px" : "0" }}
                title={`${days[i]}: ${c} visite`}
              />
              <div className="text-[9px] text-muted-foreground">{days[i].slice(8)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card-glass p-5 rounded-lg">
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
            Pagine più viste
          </h3>
          {topPages.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nessun dato ancora</p>
          ) : (
            <ul className="space-y-2">
              {topPages.map(([path, count]) => (
                <li key={path} className="flex items-center justify-between text-sm">
                  <span className="truncate font-mono text-xs">{path}</span>
                  <span className="font-semibold text-primary">{count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card-glass p-5 rounded-lg">
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
            Da dove arrivano
          </h3>
          {topReferrers.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nessun referrer esterno</p>
          ) : (
            <ul className="space-y-2">
              {topReferrers.map(([ref, count]) => (
                <li key={ref} className="flex items-center justify-between text-sm">
                  <span className="truncate">{ref}</span>
                  <span className="font-semibold text-primary">{count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        100% privacy-friendly · Nessun cookie · Nessun IP salvato
      </p>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) => (
  <div className="card-glass p-4 rounded-lg">
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

export default AdminAnalytics;
