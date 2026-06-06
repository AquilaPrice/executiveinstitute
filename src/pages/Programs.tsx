import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  Clock,
  Monitor,
  BadgeCheck,
  ArrowRight,
  BookOpen,
  Code2,
  Languages,
  Sparkles,
  Brain,
  Target,
  Megaphone,
  Lightbulb,
  Briefcase,
  Palette,
  BarChart3,
  Search,
  Mail,
} from "lucide-react";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import children from "@/assets/children.jpg";
import teens from "@/assets/teens.jpg";
import adults from "@/assets/adults.jpg";

const EMAIL = "teeiinstitute@gmail.com";

interface Program {
  id: string;
  track: "Children" | "Teens" | "Adults";
  title: string;
  tagline: string;
  description: string;
  modules: string[];
  duration: string;
  mode: string;
  icon: any;
  image: string;
}

const PROGRAMS: Program[] = [
  // Children
  {
    id: "children-academic",
    track: "Children",
    title: "Academic Foundations",
    tagline: "English, Math & Basic Science for early learners",
    description: "Strong building blocks in core academic subjects, taught with age-appropriate methods that grow confidence and curiosity.",
    modules: ["English Language", "Mathematics", "Basic Science", "Reading & Comprehension"],
    duration: "8 Weeks",
    mode: "Online / Physical",
    icon: BookOpen,
    image: children,
  },
  {
    id: "children-digital",
    track: "Children",
    title: "Kids Coding & Digital Skills",
    tagline: "Introducing children to the world of technology",
    description: "Hands-on coding, computer literacy and digital safety for children — building creators, not just consumers.",
    modules: ["Introduction to Coding", "Basic Computer Skills", "Digital Safety"],
    duration: "6 Weeks",
    mode: "Online / Physical",
    icon: Code2,
    image: children,
  },
  {
    id: "children-life",
    track: "Children",
    title: "Life Skills & Character",
    tagline: "Discipline, confidence and study habits",
    description: "We help children develop the habits and inner discipline that lead to lifelong achievement.",
    modules: ["Discipline & responsibility", "Confidence building", "Study habits", "Mother Tongue Language"],
    duration: "4 Weeks",
    mode: "Online / Physical",
    icon: Sparkles,
    image: children,
  },

  // Teens
  {
    id: "teens-academic",
    track: "Teens",
    title: "Teen Academic Support",
    tagline: "Mastering school subjects with proven techniques",
    description: "Personalized academic support designed to lift teens to the next level in their studies.",
    modules: ["English Language", "Mathematics", "Science", "Study techniques"],
    duration: "8 Weeks",
    mode: "Online / Physical",
    icon: BookOpen,
    image: teens,
  },
  {
    id: "teens-personal",
    track: "Teens",
    title: "Personal Development",
    tagline: "Identity, purpose and emotional intelligence",
    description: "Helping teens discover who they are and what they were made for — confident in their identity and grounded in purpose.",
    modules: ["Self-esteem & confidence", "Identity & purpose", "Emotional intelligence"],
    duration: "6 Weeks",
    mode: "Online / Physical",
    icon: Brain,
    image: teens,
  },
  {
    id: "teens-life",
    track: "Teens",
    title: "Teen Life Skills",
    tagline: "Communication, decisions and time management",
    description: "Practical life skills every teen needs to navigate friendships, choices and the pressures of growing up.",
    modules: ["Communication", "Decision-making", "Time management", "Peer pressure"],
    duration: "6 Weeks",
    mode: "Online / Physical",
    icon: Target,
    image: teens,
  },
  {
    id: "teens-career",
    track: "Teens",
    title: "Career Readiness",
    tagline: "Discover, explore, prepare",
    description: "Early career awareness and digital skills exposure to help teens make informed decisions about their future.",
    modules: ["Career awareness", "Skill discovery", "Intro to digital skills"],
    duration: "4 Weeks",
    mode: "Online",
    icon: Lightbulb,
    image: teens,
  },

  // Adults
  {
    id: "adults-business",
    track: "Adults",
    title: "Business & Entrepreneurship",
    tagline: "Build, grow and manage your business",
    description: "Practical training in starting and running profitable businesses — from operations to sales and customer growth.",
    modules: ["Business Management", "Sales & Marketing", "Operations"],
    duration: "8 Weeks",
    mode: "Online / Physical",
    icon: Briefcase,
    image: adults,
  },
  {
    id: "adults-leadership",
    track: "Adults",
    title: "Leadership & Public Speaking",
    tagline: "Lead well. Speak with influence.",
    description: "Develop the leadership presence, communication and influence skills required to lead teams and organizations.",
    modules: ["Leadership & Management", "Communication & Public Speaking", "Team building"],
    duration: "6 Weeks",
    mode: "Online / Physical",
    icon: Megaphone,
    image: adults,
  },
  {
    id: "adults-design",
    track: "Adults",
    title: "Design & Creative Skills",
    tagline: "Graphics, UI/UX and virtual assistance",
    description: "Income-generating digital and creative skills you can apply remotely or build a freelance career around.",
    modules: ["Virtual Assistant", "Graphics Design", "UI/UX Design"],
    duration: "8 Weeks",
    mode: "Online",
    icon: Palette,
    image: adults,
  },
  {
    id: "adults-data",
    track: "Adults",
    title: "Data & Analytics",
    tagline: "Turn data into decisions",
    description: "Learn to work with data, build reports, and generate insights that drive smarter decision-making.",
    modules: ["Data Analytics", "Reporting", "Insights for decision-making"],
    duration: "8 Weeks",
    mode: "Online",
    icon: BarChart3,
    image: adults,
  },
];

const TRACKS = ["All", "Children", "Teens", "Adults"] as const;

const buildMailto = (p: Program, applicant?: { name: string; email: string }) => {
  const subject = `Application — ${p.title} (${p.track})`;
  const lines = [
    `Hello TEEIL Team,`,
    ``,
    `I would like to apply for the program below:`,
    ``,
    `Program: ${p.title}`,
    `Track:   ${p.track}`,
    `Duration: ${p.duration}`,
    `Mode:    ${p.mode}`,
    ``,
    `Applicant Details:`,
    `Full Name: ${applicant?.name || "[Your full name]"}`,
    `Email:     ${applicant?.email || "[Your email]"}`,
    `Phone:     [Your phone number]`,
    `Country:   [Your country]`,
    ``,
    `A short note about myself / why I am applying:`,
    `[Write here]`,
    ``,
    `Thank you,`,
  ];
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
};

const ProgramCard = ({ p }: { p: Program }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <article className="group relative bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
        <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
          {p.track}
        </span>
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white/90 text-xs">
          <span className="inline-flex items-center gap-1 bg-black/30 backdrop-blur px-2 py-1 rounded-full"><Clock className="h-3 w-3" /> {p.duration}</span>
          <span className="inline-flex items-center gap-1 bg-black/30 backdrop-blur px-2 py-1 rounded-full"><Monitor className="h-3 w-3" /> {p.mode}</span>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="inline-flex items-center gap-2 text-accent">
          <p.icon className="h-4 w-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Program</span>
        </div>
        <h3 className="heading-serif text-2xl mt-2 text-primary">{p.title}</h3>
        <p className="mt-1 text-accent text-sm font-semibold italic">{p.tagline}</p>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.description}</p>
        <ul className="mt-4 space-y-1.5">
          {p.modules.map((m) => (
            <li key={m} className="text-xs text-foreground/75 flex items-start gap-2">
              <BadgeCheck className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
              {m}
            </li>
          ))}
        </ul>

        <div className="mt-6 pt-5 border-t border-border flex flex-col gap-3">
          {!open ? (
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
              <a
                href={buildMailto(p, { name: name.trim(), email: email.trim() })}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-accent text-accent-foreground font-semibold px-4 py-2.5 text-sm shadow-glow hover:scale-[1.02] transition-transform"
              >
                <Mail className="h-4 w-4" /> Send Application
              </a>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

const Programs = () => {
  const [track, setTrack] = useState<(typeof TRACKS)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return PROGRAMS.filter((p) => {
      const trackOk = track === "All" || p.track === track;
      const q = query.trim().toLowerCase();
      const queryOk =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.modules.some((m) => m.toLowerCase().includes(q));
      return trackOk && queryOk;
    });
  }, [track, query]);

  return (
    <Layout>
      <PageHero
        badgeTag="Programs"
        title={
          <>
            Our <span className="text-accent-glow">Programs.</span>
          </>
        }
        subtitle="Browse every track, pick the program that fits, and apply in seconds — your application goes straight to our team."
      />

      {/* Filter bar */}
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

      {/* Programs grid */}
      <section className="section bg-gradient-soft">
        <div className="container-tight">
          <Reveal className="flex items-end justify-between gap-4 mb-10">
            <div>
              <p className="eyebrow">All Programs</p>
              <h2 className="heading-serif text-3xl md:text-5xl mt-3 text-primary">
                {filtered.length} program{filtered.length === 1 ? "" : "s"} available
              </h2>
            </div>
          </Reveal>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              No programs match your search. Try different keywords.
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

      {/* CTA */}
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
                  <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Program Enquiry")}`}>Email Us</a>
                </Button>
                <Button asChild variant="outlineLight" size="xl">
                  <Link to="/contact">Contact Form</Link>
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
