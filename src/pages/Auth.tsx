import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const Auth = () => {
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && session) navigate("/admin", { replace: true });
  }, [session, loading, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setBusy(false);
      if (error) return toast.error(error.message);
      toast.success("Account created. You're signed in.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return toast.error(error.message);
      toast.success("Welcome back.");
    }
  };

  return (
    <Layout>
      <section className="pt-32 pb-24 min-h-[80vh] bg-gradient-soft">
        <div className="container-tight max-w-md">
          <div className="bg-card border border-border rounded-2xl shadow-card p-8">
            <p className="eyebrow">Admin Access</p>
            <h1 className="heading-serif text-3xl text-primary mt-2">
              {mode === "signin" ? "Sign in" : "Create account"}
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Manage blog posts, services and programs.
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent"
                />
              </div>
              <Button type="submit" variant="hero" className="w-full" disabled={busy}>
                {busy ? "Please wait..." : mode === "signin" ? "Sign in" : "Sign up"}
              </Button>
            </form>

            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="mt-6 text-sm text-accent hover:underline w-full text-center"
            >
              {mode === "signin"
                ? "Need an account? Sign up"
                : "Already have an account? Sign in"}
            </button>

            <p className="mt-6 text-xs text-muted-foreground text-center">
              After signing up, ask an existing admin to grant you the admin role.
            </p>
            <Link to="/" className="mt-4 block text-center text-xs text-muted-foreground hover:text-accent">
              ← Back to site
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;
