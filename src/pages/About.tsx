import { Target, Eye, Compass, Heart, Award, Users } from "lucide-react";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import VerticalMarquee from "@/components/VerticalMarquee";
import about from "@/assets/about.jpg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const values = [
  { icon: Heart, t: "Integrity", d: "We do what is right, always." },
  { icon: Award, t: "Excellence", d: "We pursue the highest standards in all we do." },
  { icon: Users, t: "Community", d: "We grow stronger when we grow together." },
  { icon: Compass, t: "Purpose", d: "We help every learner discover and live theirs." },
  { icon: Target, t: "Discipline", d: "Consistency is the bridge between goals and reality." },
  { icon: Eye, t: "Vision", d: "We see further so our learners can go further." },
];

const ValueTile = ({ icon: Icon, t, d }: { icon: any; t: string; d: string }) => (
  <article className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-elegant transition-all">
    <div className="h-11 w-11 rounded-xl bg-gradient-accent grid place-items-center text-accent-foreground shadow-glow">
      <Icon className="h-5 w-5" />
    </div>
    <h3 className="mt-4 font-bold text-primary">{t}</h3>
    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
  </article>
);

const About = () => {
  const col1 = values.filter((_, i) => i % 2 === 0);
  const col2 = values.filter((_, i) => i % 2 === 1);

  return (
    <Layout>
      <PageHero
        badgeTag="About"
        title={
          <>
            Our Story.<br />
            <span className="text-accent-glow">Our Mission.</span>
          </>
        }
        subtitle="A movement to raise individuals who are educated, disciplined, confident, and purpose-driven."
      />

      <section className="section">
        <div className="container-tight grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <img src={about} alt="Our team" loading="lazy" className="rounded-2xl shadow-elegant w-full" />
          </Reveal>
          <Reveal delay={150}>
            <p className="eyebrow">Our Story</p>
            <h2 className="heading-serif text-4xl md:text-5xl mt-3 text-primary">
              Education with <span className="text-accent">purpose.</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              We are committed to raising individuals who are not only educated but also disciplined,
              confident, and purpose-driven. Our work spans children, teens, and adults — building the
              skills, character, and leadership needed to thrive.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32" style={{ backgroundColor: "#f5f0eb" }}>
        <div className="container-tight">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: "#262626" }}>
              Our Foundation
            </p>
            <h2
              className="heading-serif mt-6 text-balance"
              style={{
                fontSize: "clamp(3rem, 9vw, 8rem)",
                lineHeight: 0.95,
                color: "#262626",
                letterSpacing: "-0.03em",
              }}
            >
              Mission, Vision & Approach.
            </h2>
          </Reveal>

          <div
            className="mv-grid mt-16 border-t border-l"
            style={{ borderColor: "rgba(38,38,38,0.12)" }}
          >
            {[
              { icon: Target, title: "Mission", text: "To equip individuals with knowledge, skills, and principles for meaningful living." },
              { icon: Eye, title: "Vision", text: "To raise a generation of intellectually sound and morally grounded leaders." },
              { icon: Compass, title: "Our Approach", text: "We combine academic training, life principles, and leadership development for total transformation." },
            ].map((c) => (
              <div key={c.title} className="mv-card group">
                <c.icon className="mv-icon" strokeWidth={1.5} size={40} />
                <h3 className="mt-8 font-extrabold uppercase tracking-wider text-base">
                  {c.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed opacity-90">
                  {c.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values — vertical marquee */}
      <section className="section overflow-hidden">
        <div className="container-tight grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <p className="eyebrow">Our Values</p>
            <h2 className="heading-serif text-4xl md:text-5xl mt-3 text-primary">
              What We <span className="text-accent">Stand For</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg max-w-md">
              Six values shape every program, every classroom and every conversation we have with learners.
            </p>
            <Button asChild variant="hero" size="lg" className="mt-8">
              <Link to="/programs">Explore Our Programs</Link>
            </Button>
          </Reveal>
          <div className="grid grid-cols-2 gap-5">
            <VerticalMarquee duration={36} items={col1.map((v) => <ValueTile {...v} />)} />
            <VerticalMarquee reverse duration={40} items={col2.map((v) => <ValueTile {...v} />)} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
