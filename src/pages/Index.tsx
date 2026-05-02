import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Award, Lightbulb, GraduationCap, Briefcase, Heart, Sparkles, Target, CheckCircle2, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import hero from "@/assets/hero.jpg";
import about from "@/assets/about.jpg";
import children from "@/assets/children.jpg";
import teens from "@/assets/teens.jpg";
import adults from "@/assets/adults.jpg";

const offerings = [
  { icon: BookOpen, title: "Academic Tutoring", desc: "Strong foundations in core subjects with personalized support." },
  { icon: Heart, title: "Life Skills & Character", desc: "Building discipline, integrity and confidence for real life." },
  { icon: Award, title: "Leadership Development", desc: "Tools and mindsets to lead self, others, and communities." },
  { icon: Briefcase, title: "Career & Personal Growth", desc: "Practical skills to thrive professionally and personally." },
];

const programs = [
  { icon: Sparkles, age: "Children", title: "Children Development", desc: "Building strong academic and character foundations.", img: children },
  { icon: GraduationCap, age: "Teens", title: "Teen Development", desc: "Guiding identity, skills, and future direction.", img: teens },
  { icon: Briefcase, age: "Adults", title: "Adult Development", desc: "Equipping for growth, leadership, and impact.", img: adults },
];

const reasons = [
  { icon: Target, title: "Practical, Real-Life Learning", desc: "Lessons tied directly to everyday application and growth." },
  { icon: Users, title: "Structured for All Ages", desc: "Tailored pathways for children, teens, and adults." },
  { icon: Heart, title: "Character & Purpose", desc: "We focus on the whole person — not just grades." },
  { icon: Lightbulb, title: "Experienced Facilitators", desc: "Mentors who have walked the path and lead with care." },
];

const testimonials = [
  { quote: "This program gave me clarity and confidence. I now lead with purpose.", author: "Adaeze O.", role: "Adult Program Graduate" },
  { quote: "My daughter is more confident in school and at home. Truly transformative.", author: "Mr. Mensah", role: "Parent" },
  { quote: "I discovered my strengths and a career path I'm genuinely excited about.", author: "Brian K.", role: "Teen Program Graduate" },
];

const Index = () => {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero bg-[length:200%_200%] animate-gradient-shift" />
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <img src={hero} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-primary/40" />

        <div className="relative container-tight py-28 md:py-40 text-white">
          <div className="max-w-3xl">
            <p className="eyebrow text-accent-glow animate-fade-in-down">
              <span className="h-px w-8 bg-accent-glow" /> The Executive Institute of Learning
            </p>
            <h1 className="heading-xl mt-5 text-balance animate-fade-in" style={{ animationDelay: "150ms" }}>
              Raising Minds.<br />
              <span className="text-accent-glow">Building Lives.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl animate-fade-in" style={{ animationDelay: "350ms" }}>
              We equip children, teens, and adults with academic excellence, life principles,
              and leadership skills to become who they are meant to be.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "550ms" }}>
              <Button asChild variant="hero" size="xl" className="animate-pulse-glow">
                <Link to="/contact">Enroll Now <ArrowRight /></Link>
              </Button>
              <Button asChild variant="outlineLight" size="xl">
                <Link to="/partnership">Partner With Us</Link>
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 max-w-xl animate-fade-in" style={{ animationDelay: "750ms" }}>
              {[
                { n: "6+", l: "Countries" },
                { n: "1000+", l: "Lives Impacted" },
                { n: "3", l: "Life Stages" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-3xl md:text-4xl font-extrabold text-accent-glow">{s.n}</p>
                  <p className="text-xs uppercase tracking-wider text-white/70 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-primary text-primary-foreground py-6 overflow-hidden border-y border-accent/30">
        <div className="marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6 shrink-0">
              {["Training the next generation of leaders across Africa", "✔ Academic Training", "✔ Life Development", "✔ Leadership Growth", "✔ Character Building", "✔ Career Readiness"].map((t) => (
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
            <h2 className="heading-lg mt-4 text-primary">Education that shapes minds <span className="text-accent">and character.</span></h2>
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

      {/* WHAT WE OFFER */}
      <section className="section bg-gradient-soft">
        <div className="container-tight">
          <Reveal className="text-center max-w-2xl mx-auto">
            <p className="eyebrow justify-center">What We Do</p>
            <h2 className="heading-lg mt-4 text-primary">What We Offer</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              A complete training experience that develops the whole person.
            </p>
          </Reveal>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerings.map((o, i) => (
              <Reveal key={o.title} delay={i * 100}>
                <article className="group h-full bg-card border border-border rounded-2xl p-7 shadow-card hover:shadow-elegant hover:-translate-y-2 transition-all duration-300">
                  <div className="h-12 w-12 rounded-xl bg-gradient-accent grid place-items-center text-accent-foreground shadow-glow group-hover:scale-110 transition-transform">
                    <o.icon />
                  </div>
                  <h3 className="mt-5 font-bold text-lg text-primary">{o.title}</h3>
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{o.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="section bg-background">
        <div className="container-tight">
          <Reveal className="text-center max-w-2xl mx-auto">
            <p className="eyebrow justify-center">Program Overview</p>
            <h2 className="heading-lg mt-4 text-primary">Our Programs</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Structured learning paths designed to develop skills, build character, and prepare
              individuals for real-life success at every stage.
            </p>
          </Reveal>
          <div className="mt-14 grid md:grid-cols-3 gap-8">
            {programs.map((p, i) => (
              <Reveal key={p.title} delay={i * 120}>
                <Link to="/programs" className="block group">
                  <article className="overflow-hidden rounded-2xl bg-card border border-border shadow-card hover:shadow-elegant transition-all duration-300 h-full">
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                      <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">{p.age}</span>
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div className="h-12 w-12 rounded-xl bg-white/95 grid place-items-center text-accent">
                          <p.icon />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">{p.title}</h3>
                      <p className="mt-2 text-muted-foreground text-sm">{p.desc}</p>
                      <p className="mt-4 inline-flex items-center gap-2 text-accent font-semibold text-sm story-link">
                        Explore Program <ArrowRight className="h-4 w-4" />
                      </p>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section bg-gradient-soft">
        <div className="container-tight grid lg:grid-cols-5 gap-14 items-start">
          <Reveal className="lg:col-span-2 lg:sticky lg:top-28">
            <p className="eyebrow">Why Choose Us</p>
            <h2 className="heading-lg mt-4 text-primary">Built for transformation, <span className="text-accent">not just instruction.</span></h2>
            <p className="mt-5 text-muted-foreground text-lg">
              We blend the best of academic rigor with practical life development so every learner
              walks away changed.
            </p>
          </Reveal>
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 100}>
                <div className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-elegant transition-all">
                  <div className="h-11 w-11 rounded-lg bg-primary/5 text-accent grid place-items-center">
                    <r.icon />
                  </div>
                  <h3 className="mt-4 font-bold text-primary">{r.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED MESSAGE */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero bg-[length:200%_200%] animate-gradient-shift" />
        <div className="relative container-tight py-24 md:py-32 text-center text-white">
          <Reveal>
            <p className="eyebrow justify-center text-accent-glow">A Message For You</p>
            <h2 className="heading-lg mt-4 max-w-3xl mx-auto text-balance">
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
            <h2 className="heading-lg mt-4 text-primary">What People Say</h2>
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
                <h2 className="heading-lg mt-4">Your growth <span className="text-accent-glow">starts here.</span></h2>
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
