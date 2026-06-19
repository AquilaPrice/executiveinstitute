import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  Clock,
  Monitor,
  ArrowRight,
  Search,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import fallbackImg from "@/assets/about.jpg";

interface Program {
  id: string;
  slug: string;
  title: string;
  track: string;
  summary: string | null;
  description: string;
  duration: string | null;
  format: string | null;
  cover_image: string | null;
}

const TRACKS = ["All", "Children", "Teens", "Adults"] as const;

const ProgramCard = ({ p }: { p: Program }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    const n = name.trim();
    const em = email.trim();
    if (!n || !em) {
      toast.error("Please enter your name and email.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("program_applications").insert({
      applicant_name: n.slice(0, 100),
      applicant_email: em.slice(0, 255),
      program_id: p.slug,
      program_title: p.title,
      program_track: p.track,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    setDone(true);
    toast.success("Application received. Thank you!");
  };

  return (
    <article className="group relative bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={p.cover_image || fallbackImg}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
        <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
          {p.track}
        </span>
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2 text-white/90 text-xs">
          {p.duration && (
            <span className="inline-flex items-center gap-1 bg-black/30 backdrop-blur px-2 py-1 rounded-full">
              <Clock className="h-3 w-3" /> {p.duration}
            </span>
          )}
          {p.format && (
            <span className="inline-flex items-center gap-1 bg-black/30 backdrop-blur px-2 py-1 rounded-full">
              <Monitor className="h-3 w-3" /> {p.format}
            </span>
          )}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="inline-flex items-center gap-2 text-accent">
          <Sparkles className="h-4 w-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Program</span>
        </div>
        <h3 className="heading-serif text-2xl mt-2 text-primary">{p.title}</h3>
        {p.summary && (
          <p className="mt-1 text-accent text-sm font-semibold italic">{p.summary}</p>
        )}
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
          {p.description}
        </p>

        <div className="mt-6 pt-5 border-t border-border flex flex-col gap-3">
          {done ? (
            <div className="text-center py-3 animate-fade-in">
              <CheckCircle2 className="h-8 w-8 text-accent mx-auto" />
              <p className="mt-2 font-bold text-primary text-sm">Thank you!</p>
              <p className="text-xs text-muted-foreground mt-1">
                We've received your application and will reach out shortly.
              </p>
            </div>
          ) : !open ? (
            <Button variant="hero" onClick={() => setOpen(true)} className="w-full">
              Apply Now <ArrowRight />
            </Button>
          ) : (
            <div className="space-y-2 animate-fade-in">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
                maxLength={100}
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Your email"
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
                maxLength={255}
              />
              <button
                type="button"
                onClick={submit}
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-accent text-accent-foreground font-semibold px-4 py-2.5 text-sm shadow-glow hover:scale-[1.02] transition-transform disabled:opacity-70"
              >
                {submitting ? "Submitting..." : <>Submit Application</>}
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

const Programs = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [track, setTrack] = useState<(typeof TRACKS)[number]>("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("programs")
        .select("*")
        .eq("active", true)
        .order("display_order");
      setPrograms((data ?? []) as Program[]);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    return programs.filter((p) => {
      const trackOk = track === "All" || p.track === track;
      const q = query.trim().toLowerCase();
      const queryOk =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.summary ?? "").toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return trackOk && queryOk;
    });
  }, [track, query, programs]);

  return (
    <Layout>
      <PageHero
        badgeTag="Programs"
        title={
          <>
            Our <span className="text-accent-glow">Programs.</span>
          </>
        }
        subtitle="Browse every track, pick the program that fits, and apply in seconds."
      />

      <section className="bg-background border-b border-border sticky top-20 z-30 backdrop-blur supports-[backdrop-filter]:bg-background/85">
        <div className="container-tight py-5 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {TRACKS.map((t) => (
              <button
                key={t}
                onClick={() => setTrack(t)}
                className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full border transition-all ${
                  track === t
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground/70 border-border hover:border-accent hover:text-accent"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="md:ml-auto relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search programs..."
              className="w-full bg-card border border-border rounded-full pl-9 pr-4 py-2.5 text-sm outline-none focus:border-accent"
            />
          </div>
        </div>
      </section>

      <section className="section bg-gradient-soft">
        <div className="container-tight">
          <Reveal className="flex items-end justify-between gap-4 mb-10">
            <div>
              <p className="eyebrow">All Programs</p>
              <h2 className="heading-serif text-3xl md:text-5xl mt-3 text-primary">
                {loading
                  ? "Loading..."
                  : `${filtered.length} program${filtered.length === 1 ? "" : "s"} available`}
              </h2>
            </div>
          </Reveal>

          {!loading && filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              No programs match your search.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 100}>
                  <ProgramCard p={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section bg-background">
        <div className="container-tight">
          <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-10 md:p-16 shadow-elegant">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary-glow/40 blur-3xl" />
            <div className="relative grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="eyebrow text-accent-glow">Need Help Choosing?</p>
                <h2 className="heading-serif text-4xl md:text-5xl mt-4">
                  Talk to our <span className="text-accent-glow">advisors.</span>
                </h2>
                <p className="mt-5 text-white/80">
                  Not sure where to start? Reach out and we'll help you find the right path.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 md:justify-end">
                <Button asChild variant="hero" size="xl">
                  <Link to="/contact">Contact Form</Link>
                </Button>
                <Button asChild variant="outlineLight" size="xl">
                  <Link to="/services">Our Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Programs;
