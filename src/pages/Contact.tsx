import { useState } from "react";
import { Mail, Phone, MapPin, Send, Globe2 } from "lucide-react";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Message sent! We'll be in touch soon.");
      (e.target as HTMLFormElement).reset();
    }, 700);
  };

  const locations = ["Nigeria (HQ)", "Botswana", "Ghana", "South Africa", "Uganda", "Kenya"];

  return (
    <Layout>
      <PageHero
        badgeTag="Contact"
        title={
          <>
            Get In <span className="text-accent-glow">Touch.</span>
          </>
        }
        subtitle="We'd love to hear from you. Reach out about enrollment, partnership, or anything else."
      />

      <section className="section">
        <div className="container-tight grid lg:grid-cols-5 gap-10">
          <Reveal className="lg:col-span-2 space-y-5">
            {[
              { icon: Phone, t: "Call Us", lines: ["+234 805 092 0744", "+256 774 538 481"] },
              { icon: Mail, t: "Email", lines: ["teeiinstitute@gmail.com"] },
              { icon: MapPin, t: "Headquarters", lines: ["Nigeria"] },
            ].map((c) => (
              <div key={c.t} className="bg-card border border-border rounded-2xl p-6 shadow-card flex gap-4 hover:shadow-elegant transition-all">
                <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-accent text-accent-foreground grid place-items-center shadow-glow">
                  <c.icon />
                </div>
                <div>
                  <p className="font-bold text-primary">{c.t}</p>
                  {c.lines.map((l) => (
                    <p key={l} className="text-sm text-muted-foreground mt-0.5">{l}</p>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-elegant">
              <div className="flex items-center gap-3">
                <Globe2 className="text-accent-glow" />
                <p className="font-bold uppercase text-xs tracking-wider">Our Branches</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {locations.map((l) => (
                  <span key={l} className="text-sm text-primary-foreground/85 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {l}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-3">
            <form onSubmit={onSubmit} className="bg-card border border-border rounded-2xl p-8 shadow-elegant">
              <h2 className="heading-md text-primary">Send us a message</h2>
              <p className="mt-2 text-muted-foreground text-sm">We respond within 1–2 business days.</p>
              <div className="mt-6 grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" required className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required className="mt-1.5" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Enrollment, Partnership, etc." className="mt-1.5" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={6} required className="mt-1.5" />
                </div>
                <Button type="submit" variant="hero" size="lg" disabled={submitting}>
                  {submitting ? "Sending..." : <>Send Message <Send /></>}
                </Button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
