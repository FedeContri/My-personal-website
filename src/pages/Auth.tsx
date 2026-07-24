import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock } from "lucide-react";

const RL_KEY = "fd_auth_rl";
const MAX_ATTEMPTS = 5;         // tentativi consentiti nella finestra
const WINDOW_MS = 15 * 60 * 1000; // finestra: 15 min
const LOCKOUT_MS = 30 * 60 * 1000; // blocco: 30 min dopo il superamento

type RLState = { attempts: number[]; lockedUntil: number };

const loadRL = (): RLState => {
  try {
    const raw = localStorage.getItem(RL_KEY);
    if (!raw) return { attempts: [], lockedUntil: 0 };
    const s = JSON.parse(raw) as RLState;
    return { attempts: s.attempts || [], lockedUntil: s.lockedUntil || 0 };
  } catch {
    return { attempts: [], lockedUntil: 0 };
  }
};
const saveRL = (s: RLState) => localStorage.setItem(RL_KEY, JSON.stringify(s));

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [lockedUntil, setLockedUntil] = useState<number>(() => loadRL().lockedUntil);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/admin");
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate("/admin");
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (lockedUntil <= Date.now()) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [lockedUntil]);

  const isLocked = lockedUntil > now;
  const remainingSec = Math.max(0, Math.ceil((lockedUntil - now) / 1000));
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const t = Date.now();
    const state = loadRL();
    if (state.lockedUntil > t) {
      setLockedUntil(state.lockedUntil);
      toast.error(`Troppi tentativi. Riprova tra ${fmt(Math.ceil((state.lockedUntil - t) / 1000))}`);
      return;
    }
    // rimuovi tentativi fuori finestra
    state.attempts = state.attempts.filter((a) => t - a < WINDOW_MS);

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // reset su successo
      saveRL({ attempts: [], lockedUntil: 0 });
      setLockedUntil(0);
      toast.success("Benvenuto!");
    } catch (err: any) {
      state.attempts.push(t);
      if (state.attempts.length >= MAX_ATTEMPTS) {
        state.lockedUntil = t + LOCKOUT_MS;
        state.attempts = [];
        setLockedUntil(state.lockedUntil);
        saveRL(state);
        toast.error(`Troppi tentativi falliti. Accesso bloccato per ${LOCKOUT_MS / 60000} min.`);
      } else {
        saveRL(state);
        const left = MAX_ATTEMPTS - state.attempts.length;
        toast.error(`${err.message || "Credenziali non valide"} — ${left} tentativi rimanenti`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <Helmet>
        <title>Login — FD Portfolio</title>
        <meta
          name="description"
          content="Secure login to the private admin dashboard of FD Portfolio. Restricted access for the site owner only."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://fd-portfolio.site/auth" />
        <meta property="og:title" content="Login — FD Portfolio" />
        <meta property="og:description" content="Secure login to the private admin dashboard of FD Portfolio." />
        <meta property="og:url" content="https://fd-portfolio.site/auth" />
      </Helmet>
      <div className="card-glass p-8 rounded-lg w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">Area Admin</h1>
          <p className="text-sm text-muted-foreground">Accedi alla dashboard privata</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Username</Label>
            <Input id="email" type="text" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full glow-primary" disabled={loading}>
            {loading ? "Attendere..." : "Accedi"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
