import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/admin");
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate("/admin");
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Benvenuto!");
    } catch (err: any) {
      toast.error(err.message || "Errore");
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
