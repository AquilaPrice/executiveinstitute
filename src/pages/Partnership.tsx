import { useState } from "react";
import {
  GraduationCap,
  UserCheck,
  Users,
  Award,
  Send,
  Building2,
  Handshake,
  Globe2,
  CheckCircle2,
  Sparkles,
  Star,
  ArrowRight,
  Mail,
  Phone,
} from "lucide-react";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import VerticalMarquee from "@/components/VerticalMarquee";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import partnership from "@/assets/partnership.jpg";

const focusAreas = [
  { icon: GraduationCap, t: "Student Development", d: "Tailored programs that build academic and life skills." },
  { icon: UserCheck, t: "Teacher Training", d: "Equipping educators with modern teaching strategies." },
  { icon: Users, t: "Parenting Sessions", d: "Empowering parents to raise confident, grounded children." },
  { icon: Award, t: "Leadership Workshops", d: "Cultivating leaders within your team or institution." },
  { icon: Handshake, t: "Corporate Programs", d: "Soft-skill and leadership training for staff teams." },
  { icon: Globe2, t: "Community Outreach", d: "Joint impact projects across schools and communities." },
];

const FocusTile = ({ icon: Icon, t, d }: { icon: any; t: string; d: string }) => (
  <article className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-elegant transition-all">
    <div className="h-11 w-11 rounded-lg bg-gradient-accent text-accent-foreground grid place-items-center shadow-glow">
      <Icon className="h-5 w-5" />
    </div>
    <p className="mt-4 font-bold text-primary">{t}</p>
    <p className="mt-1 text-sm text-muted-foreground">{d}</p>
  </article>
);

const stats = [
  { v: "6+", l: "Countries" },
  { v: "50+", l: "Partner Schools" },
  { v: "10k+", l: "Lives Touched" },
  { v: "200+", l: "Sessions Delivered" },
];

const tiers = [
  {
    name: "Schools & Institutions",
    icon: GraduationCap,
    blurb: "Term-long programs woven into your curriculum.",
    perks: [
      "Student academic & life-skills tracks",
      "Teacher capacity-building workshops",
      "Parent engagement sessions",
      "Annual leadership summits",
    ],
    accent: false,
  },
  {
    name: "Corporate & NGOs",
    icon: Building2,
    blurb: "Leadership, soft skills and CSR-aligned training.",
    perks: [
      "Executive leadership coaching",
      "Team performance workshops",
      "Custom CSR partnership programs",
      "Co-branded community projects",
    ],
    accent: true,
  },
  {
    name: "Faith & Community",
    icon: Handshake,
    blurb: "Discipleship, mentoring and youth empowerment.",
    perks: [
      "Youth mentorship programs",
      "Parenting & family seminars",
      "Volunteer training",
      "Community outreach drives",
    ],
    accent: false,
  },
];

const process = [
  { n: "01", t: "Discovery Call", d: "We learn about your people, goals and current challenges." },
  { n: "02", t: "Tailored Proposal", d: "A custom program plan with timeline, modules and outcomes." },
  { n: "03", t: "Co-Design", d: "We refine content together so it fits your culture and audience." },
  { n: "04", t: "Delivery", d: "Engaging sessions — online, on-site or hybrid — by expert facilitators." },
  { n: "05", t: "Impact Report", d: "Measurable outcomes, feedback and a roadmap for the next phase." },
];

const partnerVoices = [
  { q: "TEEIL transformed how our students think about purpose and leadership.", a: "Principal, Lagos" },
  { q: "Our staff training was practical, deep and immediately applicable.", a: "HR Lead, Kampala" },
  { q: "The parenting series changed conversations in our community.", a: "Pastor, Accra" },
  { q: "Professional, warm, and highly customized to our context.", a: "Director, Gaborone" },
];

const faqs = [
  { q: "How long does a typical partnership last?", a: "Engagements range from one-off workshops to full academic-year programs. We tailor duration to your goals." },
  { q: "Can sessions be virtual?", a: "Yes — we deliver online, on-site, or hybrid programs across Africa and beyond." },
  { q: "Is there a minimum group size?", a: "We work with cohorts as small as 15 and as large as several hundred participants." },
  { q: "How are programs priced?", a: "Pricing is based on scope, duration and audience. We'll send a clear proposal after the discovery call." },
];

const EMAIL = "teeiinstitute@gmail.com";

const Partnership = () => {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const payload = {
      organization: String(data.get("org") || "").slice(0, 200),
      contact_name: String(data.get("name") || "").slice(0, 100),
      email: String(data.get("email") || "").slice(0, 255),
      phone: String(data.get("phone") || "").slice(0, 50) || null,
      partnership_type: String(data.get("role") || "").slice(0, 100) || null,
      message: String(data.get("message") || "").slice(0, 2000),
    };

    if (!payload.organization || !payload.contact_name || !payload.email || !payload.message) {
      toast.error("Please fill in all required fields.");
      setSubmitting(false);
      return;
    }

    const { error } = await supabase.from("partnership_inquiries").insert(payload);
    setSubmitting(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    setSent(true);
    form.reset();
    toast.success("Thank you! Your partnership request has been received.");
  };

  const col1 = focusAreas.filter((_, i) => i % 2 === 0);
  const col2 = focusAreas.filter((_, i) => i % 2 === 1);

  return (
    <Layout>
      <PageHero
        badgeTag="Partner"
        title={
          <>
            Partner <span className="text-accent-glow">With Us.</span>
          </>
        }
        subtitle="We collaborate with schools, organizations, and institutions to deliver impactful training programs for students, parents, and staff."
      />

      {/* Stats strip */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-tight py-10 md:py-14 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.l}>
              <p className="heading-serif text-4xl md:text-5xl text-accent-glow">{s.v}</p>
              <p className="mt-1 text-xs md:text-sm uppercase tracking-widest text-primary-foreground/75">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Focus Areas + form */}
      <section className="section overflow-hidden">
        <div className="container-tight grid lg:grid-cols-2 gap-14 items-start">
          <Reveal>
            <p className="eyebrow">Focus Areas</p>
            <h2 className="heading-serif text-3xl sm:text-4xl md:text-5xl mt-3 text-primary">
              Where we create <span className="text-accent">impact together.</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-base md:text-lg max-w-md">
              From classrooms to boardrooms, we co-create programs that meet your people where they are.
            </p>
            <div className="mt-10 relative rounded-2xl overflow-hidden shadow-elegant">
              <img src={partnership} alt="Partnership handshake" loading="lazy" className="w-full aspect-[16/10] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <Building2 className="h-6 w-6 text-accent-glow" />
                <p className="mt-2 font-bold text-lg">Trusted by institutions across 6+ countries.</p>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <VerticalMarquee duration={32} items={col1.map((f) => <FocusTile {...f} />)} />
              <VerticalMarquee reverse duration={36} items={col2.map((f) => <FocusTile {...f} />)} />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <form onSubmit={onSubmit} id="partner-form" className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-elegant lg:sticky lg:top-28">
              <h3 className="heading-md text-primary">Request Partnership</h3>
              <p className="mt-2 text-muted-foreground text-sm">Tell us about your organization and we'll get back to you.</p>
              <div className="mt-6 grid gap-4">
                <div>
                  <Label htmlFor="org">Organization Name</Label>
                  <Input id="org" name="org" required placeholder="Your school or company" className="mt-1.5" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Contact Name</Label>
                    <Input id="name" name="name" required className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="role">Your Role</Label>
                    <Input id="role" name="role" className="mt-1.5" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" className="mt-1.5" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">How can we partner?</Label>
                  <Textarea id="message" name="message" required rows={5} className="mt-1.5" placeholder="Briefly describe what you have in mind..." />
                </div>
                <Button type="submit" variant="hero" size="lg" disabled={submitting}>
                  {submitting ? "Sending..." : <>Submit Request <Send /></>}
                </Button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Partnership tiers */}
      <section className="section bg-gradient-soft">
        <div className="container-tight">
          <Reveal className="text-center max-w-2xl mx-auto">
            <p className="eyebrow justify-center"><Sparkles className="h-3 w-3" /> Partnership Tracks</p>
            <h2 className="heading-serif text-3xl sm:text-4xl md:text-5xl mt-3 text-primary">
              Choose how you want to <span className="text-accent">partner</span>.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every partnership is tailored — these are the most common starting points.
            </p>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 120}>
                <article
                  className={`relative h-full rounded-2xl p-6 sm:p-8 border transition-all hover:-translate-y-1 ${
                    tier.accent
                      ? "bg-primary text-primary-foreground border-primary shadow-elegant"
                      : "bg-card text-foreground border-border shadow-card hover:shadow-elegant"
                  }`}
                >
                  {tier.accent && (
                    <span className="absolute -top-3 left-6 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-glow">
                      Most Popular
                    </span>
                  )}
                  <div
                    className={`h-12 w-12 rounded-xl grid place-items-center ${
                      tier.accent ? "bg-accent text-accent-foreground" : "bg-gradient-accent text-accent-foreground shadow-glow"
                    }`}
                  >
                    <tier.icon className="h-5 w-5" />
                  </div>
                  <h3 className={`heading-serif text-2xl mt-5 ${tier.accent ? "text-white" : "text-primary"}`}>
                    {tier.name}
                  </h3>
                  <p className={`mt-2 text-sm ${tier.accent ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {tier.blurb}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {tier.perks.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className={`h-4 w-4 mt-0.5 shrink-0 ${tier.accent ? "text-accent-glow" : "text-accent"}`} />
                        <span className={tier.accent ? "text-primary-foreground/90" : "text-foreground/80"}>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#partner-form"
                    className={`mt-7 inline-flex items-center gap-2 text-sm font-bold story-link ${
                      tier.accent ? "text-accent-glow" : "text-accent"
                    }`}
                  >
                    Start this partnership <ArrowRight className="h-4 w-4" />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container-tight">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">How It Works</p>
            <h2 className="heading-serif text-3xl sm:text-4xl md:text-5xl mt-3 text-primary">
              A simple <span className="text-accent">5-step</span> partnership process.
            </h2>
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {process.map((step, i) => (
              <Reveal key={step.n} delay={i * 90}>
                <div className="relative h-full bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-elegant transition-all">
                  <p className="heading-serif text-4xl text-accent">{step.n}</p>
                  <p className="mt-3 font-bold text-primary">{step.t}</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partner voices */}
      <section className="section bg-gradient-soft">
        <div className="container-tight">
          <Reveal className="text-center max-w-2xl mx-auto">
            <p className="eyebrow justify-center">Partner Voices</p>
            <h2 className="heading-serif text-3xl sm:text-4xl md:text-5xl mt-3 text-primary">
              What our partners <span className="text-accent">say</span>.
            </h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {partnerVoices.map((t, i) => (
              <Reveal key={i} delay={i * 100}>
                <figure className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-card hover:shadow-elegant transition-all h-full">
                  <div className="flex gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-lg text-foreground/90 leading-relaxed">"{t.q}"</blockquote>
                  <figcaption className="mt-5 text-sm font-semibold text-primary">— {t.a}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-tight grid lg:grid-cols-3 gap-12">
          <Reveal>
            <p className="eyebrow">FAQ</p>
            <h2 className="heading-serif text-3xl sm:text-4xl md:text-5xl mt-3 text-primary">
              Common questions.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Don't see your question? <a href={`mailto:${EMAIL}`} className="text-accent font-semibold story-link">Email us</a>.
            </p>
          </Reveal>
          <div className="lg:col-span-2 divide-y divide-border border-y border-border">
            {faqs.map((f, i) => (
              <Reveal key={i} delay={i * 80}>
                <details className="group py-6">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                    <span className="font-bold text-primary text-lg">{f.q}</span>
                    <span className="h-8 w-8 grid place-items-center rounded-full bg-accent/10 text-accent group-open:rotate-45 transition-transform text-xl">+</span>
                  </summary>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-24">
        <div className="container-tight">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-hero text-white p-8 sm:p-12 md:p-16 shadow-elegant">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary-glow/40 blur-3xl" />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="eyebrow text-accent-glow">Ready to begin?</p>
                <h2 className="heading-serif text-3xl sm:text-4xl md:text-5xl mt-4">
                  Let's build something <span className="text-accent-glow">meaningful</span>.
                </h2>
                <p className="mt-5 text-white/85 max-w-md">
                  Reach out today — we'll set up a discovery call within 48 hours.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 md:justify-end">
                <Button asChild variant="hero" size="xl">
                  <a href="#partner-form"><Handshake /> Start Partnership</a>
                </Button>
                <Button asChild variant="outlineLight" size="xl">
                  <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Partnership Enquiry")}`}><Mail /> Email Us</a>
                </Button>
              </div>
              <div className="md:col-span-2 flex flex-wrap gap-6 pt-6 border-t border-white/15 text-sm text-white/80">
                <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4 text-accent-glow" /> {EMAIL}</a>
                <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4 text-accent-glow" /> +234 805 092 0744</span>
                <span className="inline-flex items-center gap-2"><Globe2 className="h-4 w-4 text-accent-glow" /> Nigeria · Ghana · Kenya · Uganda · Botswana · South Africa</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Partnership;
