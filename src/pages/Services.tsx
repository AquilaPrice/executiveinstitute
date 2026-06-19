import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const getIcon = (name?: string | null) => {
  const fallback = Icons.Sparkles;
  if (!name) return fallback;
  const I = (Icons as any)[name];
  return I ?? fallback;
};

const Services = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("services")
        .select("*")
        .eq("active", true)
        .order("display_order");
      setRows(data ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <Layout>
      <PageHero
        badgeTag="Services"
        title={
          <>
            What We <span className="text-accent-glow">Offer.</span>
          </>
        }
        subtitle="A complete ecosystem of programs and services to grow minds, character and leadership."
      />

      <section className="section bg-background">
        <div className="container-tight">
          {loading ? (
            <div className="text-center text-muted-foreground">Loading services...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rows.map((s, i) => {
                const Icon = getIcon(s.icon);
                return (
                  <Reveal key={s.id} delay={(i % 3) * 90}>
                    <article className="group bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all h-full">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="heading-serif text-2xl text-primary mt-5">{s.title}</h3>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                        {s.description}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="section bg-gradient-soft">
        <div className="container-tight">
          <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-10 md:p-16 shadow-elegant">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="eyebrow text-accent-glow">Get started</p>
                <h2 className="heading-serif text-4xl md:text-5xl mt-4">
                  Find your <span className="text-accent-glow">path.</span>
                </h2>
                <p className="mt-4 text-white/80">
                  Explore our programs or reach out to chat with an advisor.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 md:justify-end">
                <Button asChild variant="hero" size="xl">
                  <Link to="/programs">Browse Programs <ArrowRight /></Link>
                </Button>
                <Button asChild variant="outlineLight" size="xl">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
