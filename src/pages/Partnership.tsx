import { useState } from "react";
import { GraduationCap, UserCheck, Users, Award, Send, Building2, Handshake, Globe2 } from "lucide-react";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import VerticalMarquee from "@/components/VerticalMarquee";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
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

const Partnership = () => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Request received! We'll reach out within 48 hours.");
      (e.target as HTMLFormElement).reset();
    }, 700);
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

      <section className="section overflow-hidden">
        <div className="container-tight grid lg:grid-cols-2 gap-14 items-start">
          <Reveal>
            <p className="eyebrow">Focus Areas</p>
            <h2 className="heading-serif text-4xl md:text-5xl mt-3 text-primary">
              Where we create <span className="text-accent">impact together.</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg max-w-md">
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
            <div className="mt-10 grid grid-cols-2 gap-5">
              <VerticalMarquee duration={32} items={col1.map((f) => <FocusTile {...f} />)} />
              <VerticalMarquee reverse duration={36} items={col2.map((f) => <FocusTile {...f} />)} />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <form onSubmit={onSubmit} className="bg-card border border-border rounded-2xl p-8 shadow-elegant lg:sticky lg:top-28">
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
    </Layout>
  );
};

export default Partnership;
