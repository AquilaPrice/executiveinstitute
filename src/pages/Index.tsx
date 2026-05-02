import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Lightbulb,
  GraduationCap,
  Briefcase,
  Heart,
  Sparkles,
  Target,
  CheckCircle2,
  Quote,
  Mic,
  Compass,
  ShieldCheck,
  PenTool,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import VerticalMarquee from "@/components/VerticalMarquee";
import about from "@/assets/about.jpg";
import children from "@/assets/children.jpg";
import teens from "@/assets/teens.jpg";
import adults from "@/assets/adults.jpg";

const offerings = [
  { icon: BookOpen, title: "Academic Tutoring", desc: "Strong foundations in core subjects with personalized support." },
  { icon: Heart, title: "Life Skills & Character", desc: "Building discipline, integrity and confidence for real life." },
  { icon: Award, title: "Leadership Development", desc: "Tools and mindsets to lead self, others, and communities." },
  { icon: Briefcase, title: "Career & Personal Growth", desc: "Practical skills to thrive professionally and personally." },
  { icon: Mic, title: "Public Speaking", desc: "Confidence to communicate ideas with clarity and impact." },
  { icon: Compass, title: "Purpose Discovery", desc: "Helping every learner uncover and pursue their calling." },
  { icon: ShieldCheck, title: "Character Building", desc: "Anchoring growth in values that last a lifetime." },
  { icon: PenTool, title: "Creative Skills", desc: "Design, writing and digital craft for the modern world." },
];

const programs = [
  { icon: Sparkles, age: "Children", title: "Children Development", desc: "Building strong academic and character foundations.", img: children },
  { icon: GraduationCap, age: "Teens", title: "Teen Development", desc: "Guiding identity, skills, and future direction.", img: teens },
  { icon: Briefcase, age: "Adults", title: "Adult Development", desc: "Equipping for growth, leadership, and impact.", img: adults },
];

const reasons = [
  {
    id: "practical",
    icon: Target,
    title: "Practical, Real-Life Learning",
    desc: "Every lesson is tied directly to everyday application. We don't teach theory in isolation — we teach the principles, frameworks and habits learners use the same week.",
    visualKind: "code" as const,
    code: `// Daily growth loop
const learner = {
  practice: every('day'),
  reflect:  every('week'),
  apply:    in('real-life'),
};

while (learner.alive) {
  learner.practice();
  learner.reflect();
  learner.apply();
}`,
  },
  {
    id: "ages",
    icon: Users,
    title: "Structured for All Ages",
    desc: "Children, teens and adults each have their own developmental track — built around what they need most at that stage of life.",
    visualKind: "blueprint" as const,
  },
  {
    id: "character",
    icon: Heart,
    title: "Character & Purpose First",
    desc: "Grades alone don't build a life. We focus on the whole person — values, identity, leadership and direction — so learning translates into impact.",
    visualKind: "code" as const,
    code: `interface Learner {
  knowledge: Skill[];
  character: Value[];
  purpose:   Calling;
}

// We never ship knowledge
// without character.`,
  },
  {
    id: "mentors",
    icon: Lightbulb,
    title: "Experienced Facilitators",
    desc: "Our mentors have walked the path. They lead with care, accountability and proven experience across academia, business and leadership.",
    visualKind: "blueprint" as const,
  },
];

const testimonials = [
  { quote: "This program gave me clarity and confidence. I now lead with purpose.", author: "Adaeze O.", role: "Adult Program Graduate" },
  { quote: "My daughter is more confident in school and at home. Truly transformative.", author: "Mr. Mensah", role: "Parent" },
  { quote: "I discovered my strengths and a career path I'm genuinely excited about.", author: "Brian K.", role: "Teen Program Graduate" },
];

/* ---------- Vertical marquee card ---------- */
const FeatureTile = ({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) => (
  <article className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-elegant transition-all">
    <div className="h-11 w-11 rounded-xl bg-gradient-accent grid place-items-center text-accent-foreground shadow-glow">
      <Icon className="h-5 w-5" />
    </div>
    <h3 className="mt-4 font-bold text-primary">{title}</h3>
    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
  </article>
);

/* ---------- Why Choose Us visuals ---------- */
const CodeVisual = ({ code }: { code: string }) => (
  <div className="rounded-2xl bg-[hsl(220_45%_10%)] border border-primary/20 shadow-elegant overflow-hidden">
    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
      <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
      <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
      <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
      <span className="ml-3 text-xs text-white/50 font-mono">growth-loop.ts</span>
    </div>
    <pre className="p-6 text-sm font-mono leading-relaxed text-white/90 overflow-x-auto">
      <code>{code}</code>
    </pre>
  </div>
);

const BlueprintVisual = () => (
  <div className="relative rounded-2xl border border-border bg-[#f1f3f5] shadow-card overflow-hidden aspect-[4/3]">
    <div
      className="absolute inset-0 opacity-60"
      style={{
        backgroundImage:
          "linear-gradient(hsl(220 30% 70% / 0.35) 1px, transparent 1px), linear-gradient(90deg, hsl(220 30% 70% / 0.35) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="strokeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(220 70% 18%)" />
          <stop offset="100%" stopColor="hsl(358 72% 45%)" />
        </linearGradient>
      </defs>
      <circle cx="80" cy="220" r="28" fill="none" stroke="url(#strokeGrad)" strokeWidth="2" />
      <circle cx="200" cy="150" r="40" fill="none" stroke="url(#strokeGrad)" strokeWidth="2" />
      <circle cx="320" cy="80" r="28" fill="none" stroke="url(#strokeGrad)" strokeWidth="2" />
      <line x1="105" y1="205" x2="170" y2="170" stroke="url(#strokeGrad)" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="232" y1="130" x2="295" y2="95" stroke="url(#strokeGrad)" strokeWidth="2" strokeDasharray="4 4" />
      <text x="58" y="270" fontFamily="monospace" fontSize="11" fill="hsl(220 60% 25%)">CHILDREN</text>
      <text x="170" y="220" fontFamily="monospace" fontSize="11" fill="hsl(220 60% 25%)">TEENS</text>
      <text x="298" y="130" fontFamily="monospace" fontSize="11" fill="hsl(220 60% 25%)">ADULTS</text>
    </svg>
    <div className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-widest text-primary/60">
      / blueprint · v1
    </div>
  </div>
);

/* ---------- Why Choose Us section ---------- */
const WhyChooseUs = () => {
  const [active, setActive] = useState(reasons[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    reasons.forEach((r) => {
      const el = document.getElementById(r.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container-tight">
        <div className="max-w-3xl mb-16">
          <p className="eyebrow">Why Choose Us</p>
          <h2 className="heading-serif text-4xl md:text-6xl mt-4 text-primary">
            Built for transformation,{" "}
            <span className="text-accent">not just instruction.</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            We blend academic rigor with practical life development so every learner walks away changed.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sticky sidebar — 25% */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">
                On this page
              </p>
              <nav className="space-y-1 border-l border-border">
                {reasons.map((r) => {
                  const isActive = active === r.id;
                  return (
                    <a
                      key={r.id}
                      href={`#${r.id}`}
                      className={`group flex items-center gap-3 -ml-px pl-5 py-3 border-l-2 transition-all ${
                        isActive
                          ? "border-accent text-primary font-semibold"
                          : "border-transparent text-muted-foreground hover:text-primary"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full transition-all ${
                          isActive
                            ? "bg-accent scale-125 shadow-[0_0_0_4px_hsl(var(--accent)/0.18)]"
                            : "bg-muted-foreground/40 group-hover:bg-primary"
                        }`}
                      />
                      <span className="text-sm">{r.title}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main content — 75%, alternating rows */}
          <div className="lg:col-span-3 space-y-24">
            {reasons.map((r, i) => {
              const reverse = i % 2 === 1;
              const visual =
                r.visualKind === "code" ? <CodeVisual code={r.code!} /> : <BlueprintVisual />;
              return (
                <article
                  key={r.id}
                  id={r.id}
                  className="grid md:grid-cols-2 gap-10 items-center scroll-mt-28"
                >
                  <div className={reverse ? "md:order-2" : ""}>
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent">
                      <span className="h-px w-6 bg-accent" /> 0{i + 1}
                    </div>
                    <h3 className="heading-serif text-3xl md:text-4xl mt-3 text-primary">{r.title}</h3>
                    <p className="mt-4 text-muted-foreground text-base leading-relaxed">{r.desc}</p>
                    <div className="mt-6 inline-flex items-center gap-2 text-accent font-semibold text-sm">
                      <r.icon className="h-4 w-4" /> Built into every program
                    </div>
                  </div>
                  <div className={reverse ? "md:order-1" : ""}>{visual}</div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  // split offerings into 2 columns for marquee
  const col1 = offerings.filter((_, i) => i % 2 === 0);
  const col2 = offerings.filter((_, i) => i % 2 === 1);

  return (
    <Layout>
      <PageHero
        title={
          <>
            Raising Minds. <br />
            <span className="text-accent-glow">Building Lives.</span>
          </>
        }
        subtitle="We equip children, teens, and adults with academic excellence, life principles, and leadership skills to become who they are meant to be."
      />

      {/* TRUST STRIP */}
      <section className="bg-primary text-primary-foreground py-6 overflow-hidden border-y border-accent/30">
        <div className="marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6 shrink-0">
              {[
                "Training the next generation of leaders across Africa",
                "✔ Academic Training",
                "✔ Life Development",
                "✔ Leadership Growth",
                "✔ Character Building",
                "✔ Career Readiness",
              ].map((t) => (
                <span key={t} className="text-sm font-semibold uppercase tracking-wider text-white/90 flex items-center gap-3">
                  {t}
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="section bg-background">
        <div className="container-tight grid lg:grid-cols-2 gap-16 items-center">
          <Reveal className="relative">
            <div className="absolute -inset-4 bg-gradient-accent rounded-2xl opacity-20 blur-2xl" />
            <img src={about} alt="Educators planning together" loading="lazy" className="relative rounded-2xl shadow-elegant w-full" />
            <div className="absolute -bottom-6 -right-6 bg-card shadow-card rounded-xl p-5 border border-border hidden md:block">
              <p className="text-3xl font-extrabold text-accent">10+</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Years of Impact</p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="eyebrow">Who We Are</p>
            <h2 className="heading-serif text-4xl md:text-5xl mt-4 text-primary">
              Education that shapes minds <span className="text-accent">and character.</span>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              The Executive Institute of Learning is a developmental and educational organization
              committed to raising knowledgeable, disciplined, and purpose-driven individuals.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We go beyond academics by combining education, life principles, and leadership
              development to prepare individuals for real-life success.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {["Purpose-driven training", "Holistic curriculum", "Trusted across Africa", "Certified programs"].map((t) => (
                <div key={t} className="flex items-start gap-2 text-sm font-medium">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" /> {t}
                </div>
              ))}
            </div>
            <Button asChild className="mt-10" variant="default" size="lg">
              <Link to="/about">Learn More <ArrowRight /></Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* WHAT WE OFFER — vertical marquee */}
      <section className="section bg-gradient-soft overflow-hidden">
        <div className="container-tight grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <p className="eyebrow">What We Do</p>
            <h2 className="heading-serif text-4xl md:text-5xl mt-4 text-primary">
              What We Offer
            </h2>
            <p className="mt-5 text-muted-foreground text-lg max-w-md">
              A complete training experience that develops the whole person — academically,
              practically and personally.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Academic", "Leadership", "Character", "Career"].map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-card border border-border text-xs font-semibold text-primary">
                  {t}
                </span>
              ))}
            </div>
            <Button asChild variant="hero" size="lg" className="mt-8">
              <Link to="/programs">See All Programs <ArrowRight /></Link>
            </Button>
          </Reveal>

          <div className="grid grid-cols-2 gap-5">
            <VerticalMarquee
              duration={38}
              items={col1.map((o) => (
                <FeatureTile icon={o.icon} title={o.title} desc={o.desc} />
              ))}
            />
            <VerticalMarquee
              reverse
              duration={42}
              items={col2.map((o) => (
                <FeatureTile icon={o.icon} title={o.title} desc={o.desc} />
              ))}
            />
          </div>
        </div>
      </section>

      {/* PROGRAMS — vertical marquee preview */}
      <section className="section bg-background overflow-hidden">
        <div className="container-tight grid lg:grid-cols-2 gap-14 items-center">
          <div className="grid grid-cols-2 gap-5 order-2 lg:order-1">
            <VerticalMarquee
              duration={36}
              items={programs.map((p) => (
                <Link to="/programs" className="block group">
                  <article className="overflow-hidden rounded-2xl bg-card border border-border shadow-card hover:shadow-elegant transition-all">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                      <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">{p.age}</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-primary text-sm">{p.title}</h3>
                    </div>
                  </article>
                </Link>
              ))}
            />
            <VerticalMarquee
              reverse
              duration={40}
              items={[...programs].reverse().map((p) => (
                <article className="rounded-2xl bg-card border border-border shadow-card p-5">
                  <div className="h-11 w-11 rounded-xl bg-primary/5 text-accent grid place-items-center">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-bold text-primary text-sm">{p.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
                </article>
              ))}
            />
          </div>
          <Reveal className="order-1 lg:order-2">
            <p className="eyebrow">Program Overview</p>
            <h2 className="heading-serif text-4xl md:text-5xl mt-4 text-primary">
              Our Programs
            </h2>
            <p className="mt-5 text-muted-foreground text-lg">
              Structured learning paths designed to develop skills, build character, and prepare
              individuals for real-life success at every stage.
            </p>
            <div className="mt-8 space-y-3">
              {programs.map((p) => (
                <Link key={p.title} to="/programs" className="flex items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-card transition-all group">
                  <div className="flex items-center gap-3">
                    <span className="h-9 w-9 rounded-lg bg-gradient-accent grid place-items-center text-accent-foreground">
                      <p.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-bold text-primary text-sm">{p.title}</p>
                      <p className="text-xs text-muted-foreground">{p.age} Track</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-accent group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY CHOOSE US — sticky sidebar + alternating rows */}
      <WhyChooseUs />

      {/* FEATURED MESSAGE */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero bg-[length:200%_200%] animate-gradient-shift" />
        <div className="relative container-tight py-24 md:py-32 text-center text-white">
          <Reveal>
            <p className="eyebrow justify-center text-accent-glow">A Message For You</p>
            <h2 className="heading-serif text-4xl md:text-6xl mt-4 max-w-3xl mx-auto text-balance">
              Become Who You Are <span className="text-accent-glow">Meant To Be.</span>
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-white/85 text-lg">
              Join our transformational programs designed to help you grow, lead, and succeed
              in every area of your life.
            </p>
            <Button asChild variant="hero" size="xl" className="mt-10 animate-pulse-glow">
              <Link to="/contact">Register Now <ArrowRight /></Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-background">
        <div className="container-tight">
          <Reveal className="text-center max-w-2xl mx-auto">
            <p className="eyebrow justify-center">Testimonials</p>
            <h2 className="heading-serif text-4xl md:text-5xl mt-4 text-primary">What People Say</h2>
          </Reveal>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 120}>
                <figure className="bg-card border border-border rounded-2xl p-8 shadow-card h-full hover:shadow-elegant transition-shadow">
                  <Quote className="text-accent h-8 w-8" />
                  <blockquote className="mt-4 text-lg text-foreground leading-relaxed">"{t.quote}"</blockquote>
                  <figcaption className="mt-6 pt-5 border-t border-border">
                    <p className="font-bold text-primary">{t.author}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{t.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section bg-gradient-soft">
        <div className="container-tight">
          <Reveal className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-10 md:p-16 shadow-elegant">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary-glow/40 blur-3xl" />
            <div className="relative grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="eyebrow text-accent-glow">Ready To Begin?</p>
                <h2 className="heading-serif text-4xl md:text-5xl mt-4">
                  Your growth <span className="text-accent-glow">starts here.</span>
                </h2>
              </div>
              <div className="flex flex-wrap gap-4 md:justify-end">
                <Button asChild variant="hero" size="xl"><Link to="/contact">Enroll Now</Link></Button>
                <Button asChild variant="outlineLight" size="xl"><Link to="/partnership">Partner With Us</Link></Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

// Avoid unused Rocket import warning if tree-shaken differently
void Rocket;
