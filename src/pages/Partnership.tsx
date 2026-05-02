import { useState } from "react";
import { GraduationCap, UserCheck, Users, Award, Send, Building2 } from "lucide-react";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import partnership from "@/assets/partnership.jpg";

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

  return (
    <Layout>
      <section className="relative overflow-hidden bg-gradient-hero bg-[length:200%_200%] animate-gradient-shift text-white">
        <div className="container-tight py-24 md:py-32 text-center">
          <p className="eyebrow justify-center text-accent-glow animate-fade-in-down">Partnership</p>
          <h1 className="heading-xl mt-4 animate-fade-in" style={{ animationDelay: "150ms" }}>Partner With Us</h1>
          <p className="mt-5 max-w-2xl mx-auto text-white/85 text-lg animate-fade-in" style={{ animationDelay: "300ms" }}>
            We collaborate with schools, organizations, and institutions to deliver impactful
            training programs for students, parents, and staff.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-tight grid lg:grid-cols-2 gap-14 items-start">
          <Reveal>
            <p className="eyebrow">Focus Areas</p>
            <h2 className="heading-lg mt-3 text-primary">Where we create <span className="text-accent">impact together.</span></h2>
            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {[
                { icon: GraduationCap, t: "Student Development", d: "Tailored programs that build academic and life skills." },
                { icon: UserCheck, t: "Teacher Training", d: "Equipping educators with modern teaching strategies." },
                { icon: Users, t: "Parenting Sessions", d: "Empowering parents to raise confident, grounded children." },
                { icon: Award, t: "Leadership Workshops", d: "Cultivating leaders within your team or institution." },
              ].map((f, i) => (
                <Reveal key={f.t} delay={i * 100}>
                  <div className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-elegant transition-all hover:-translate-y-1 h-full">
                    <div className="h-11 w-11 rounded-lg bg-gradient-accent text-accent-foreground grid place-items-center shadow-glow">
                      <f.icon />
                    </div>
                    <p className="mt-4 font-bold text-primary">{f.t}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-10 relative rounded-2xl overflow-hidden shadow-elegant">
              <img src={partnership} alt="Partnership handshake" loading="lazy" className="w-full aspect-[16/10] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <Building2 className="h-6 w-6 text-accent-glow" />
                <p className="mt-2 font-bold text-lg">Trusted by institutions across 6+ countries.</p>
              </div>
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
