import { Target, Eye, Compass, Heart, Award, Users } from "lucide-react";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import about from "@/assets/about.jpg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PageHeader = ({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) => (
  <section className="relative overflow-hidden bg-gradient-hero bg-[length:200%_200%] animate-gradient-shift text-white">
    <div className="container-tight py-24 md:py-32 text-center">
      <p className="eyebrow justify-center text-accent-glow animate-fade-in-down">{eyebrow}</p>
      <h1 className="heading-xl mt-4 animate-fade-in" style={{ animationDelay: "150ms" }}>{title}</h1>
      <p className="mt-5 max-w-2xl mx-auto text-white/85 text-lg animate-fade-in" style={{ animationDelay: "300ms" }}>{sub}</p>
    </div>
  </section>
);

const About = () => {
  return (
    <Layout>
      <PageHeader
        eyebrow="About Us"
        title="Our Story"
        sub="A movement to raise individuals who are educated, disciplined, confident, and purpose-driven."
      />

      <section className="section">
        <div className="container-tight grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <img src={about} alt="Our team" loading="lazy" className="rounded-2xl shadow-elegant w-full" />
          </Reveal>
          <Reveal delay={150}>
            <p className="eyebrow">Our Story</p>
            <h2 className="heading-lg mt-3 text-primary">Education with <span className="text-accent">purpose.</span></h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              We are committed to raising individuals who are not only educated but also disciplined,
              confident, and purpose-driven. Our work spans children, teens, and adults — building the
              skills, character, and leadership needed to thrive.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-gradient-soft">
        <div className="container-tight grid md:grid-cols-3 gap-6">
          {[
            { icon: Target, title: "Mission", text: "To equip individuals with knowledge, skills, and principles for meaningful living." },
            { icon: Eye, title: "Vision", text: "To raise a generation of intellectually sound and morally grounded leaders." },
            { icon: Compass, title: "Our Approach", text: "We combine academic training, life principles, and leadership development for total transformation." },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <div className="h-full bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-elegant transition-all hover:-translate-y-1">
                <div className="h-14 w-14 rounded-2xl bg-gradient-accent grid place-items-center text-accent-foreground shadow-glow">
                  <c.icon />
                </div>
                <h3 className="mt-5 font-bold text-xl text-primary">{c.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-tight">
          <Reveal className="text-center max-w-2xl mx-auto">
            <p className="eyebrow justify-center">Our Values</p>
            <h2 className="heading-lg mt-3 text-primary">What We Stand For</h2>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Heart, t: "Integrity", d: "We do what is right, always." },
              { icon: Award, t: "Excellence", d: "We pursue the highest standards." },
              { icon: Users, t: "Community", d: "We grow stronger together." },
              { icon: Compass, t: "Purpose", d: "We help every learner find theirs." },
            ].map((v, i) => (
              <Reveal key={v.t} delay={i * 80}>
                <div className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-elegant transition-all">
                  <v.icon className="mx-auto h-8 w-8 text-accent" />
                  <p className="mt-3 font-bold text-primary">{v.t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="hero" size="lg"><Link to="/programs">Explore Our Programs</Link></Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
