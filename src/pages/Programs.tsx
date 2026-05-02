import { Link } from "react-router-dom";
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
} from "lucide-react";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import VerticalMarquee from "@/components/VerticalMarquee";
import { Button } from "@/components/ui/button";
import children from "@/assets/children.jpg";
import teens from "@/assets/teens.jpg";
import adults from "@/assets/adults.jpg";

interface Group { title: string; icon: any; items: string[]; }

const GroupTile = ({ g }: { g: Group }) => (
  <div className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-elegant transition-all">
    <div className="h-11 w-11 rounded-xl bg-primary/5 text-accent grid place-items-center">
      <g.icon className="h-5 w-5" />
    </div>
    <h3 className="mt-4 font-bold text-primary">{g.title}</h3>
    <ul className="mt-3 space-y-1.5">
      {g.items.map((it) => (
        <li key={it} className="text-sm text-muted-foreground flex items-start gap-2">
          <span className="mt-2 h-1 w-1 rounded-full bg-accent shrink-0" /> {it}
        </li>
      ))}
    </ul>
  </div>
);

interface ProgramProps {
  id: string;
  index: number;
  badge: string;
  title: string;
  tagline: string;
  overview: string;
  image: string;
  groups: Group[];
  reverse?: boolean;
}

const ProgramSection = ({ id, index, badge, title, tagline, overview, image, groups, reverse }: ProgramProps) => {
  const col1 = groups.filter((_, i) => i % 2 === 0);
  const col2 = groups.filter((_, i) => i % 2 === 1);
  return (
    <section id={id} className={`section overflow-hidden ${index % 2 === 1 ? "bg-gradient-soft" : "bg-background"}`}>
      <div className="container-tight">
        <div className={`grid lg:grid-cols-2 gap-14 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-accent rounded-2xl opacity-20 blur-2xl" />
              <img src={image} alt={title} loading="lazy" className="relative rounded-2xl shadow-elegant w-full aspect-[4/3] object-cover" />
              <div className="absolute -bottom-5 -left-5 bg-accent text-accent-foreground rounded-xl px-5 py-3 shadow-glow">
                <p className="text-xs uppercase tracking-wider font-bold">{badge}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="eyebrow">{badge} Program</p>
            <h2 className="heading-serif text-4xl md:text-5xl mt-3 text-primary">{title}</h2>
            <p className="mt-3 text-accent font-semibold italic">{tagline}</p>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">{overview}</p>

            <div className="mt-8 grid sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3">
                <Clock className="h-5 w-5 text-accent" />
                <div><p className="text-xs text-muted-foreground">Duration</p><p className="font-bold text-sm text-primary">4–8 Weeks</p></div>
              </div>
              <div className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3">
                <Monitor className="h-5 w-5 text-accent" />
                <div><p className="text-xs text-muted-foreground">Mode</p><p className="font-bold text-sm text-primary">Online / Physical</p></div>
              </div>
              <div className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3">
                <BadgeCheck className="h-5 w-5 text-accent" />
                <div><p className="text-xs text-muted-foreground">Certification</p><p className="font-bold text-sm text-primary">Yes</p></div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Groups — vertical marquee */}
        <div className="mt-16 grid grid-cols-2 gap-5 max-w-3xl mx-auto">
          <VerticalMarquee duration={32} items={col1.map((g) => <GroupTile g={g} />)} />
          <VerticalMarquee reverse duration={36} items={col2.map((g) => <GroupTile g={g} />)} />
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="hero" size="lg"><Link to="/contact">Enroll in {badge} Program <ArrowRight /></Link></Button>
        </div>
      </div>
    </section>
  );
};

const Programs = () => {
  return (
    <Layout>
      <PageHero
        badgeTag="Programs"
        title={
          <>
            Our <span className="text-accent-glow">Programs.</span>
          </>
        }
        subtitle="Developing individuals at every stage of life through structured and practical learning."
      />

      <ProgramSection
        id="children"
        index={0}
        badge="Children"
        title="Children Development Program"
        tagline="Building Strong Foundations for Life and Learning"
        overview="We equip children with strong academic skills, confidence, and character needed for lifelong success."
        image={children}
        groups={[
          { title: "Academic Subjects", icon: BookOpen, items: ["English Language", "Mathematics", "Basic Science"] },
          { title: "Digital Skills", icon: Code2, items: ["Introduction to Coding", "Basic Computer Skills"] },
          { title: "Language Development", icon: Languages, items: ["Mother Tongue Language"] },
          { title: "Life Skills", icon: Sparkles, items: ["Discipline & responsibility", "Confidence building", "Study habits"] },
        ]}
      />

      <ProgramSection
        id="teens"
        index={1}
        badge="Teens"
        title="Teen Development Program"
        tagline="Guiding Identity, Building Confidence, Preparing the Future"
        overview="We help teens discover themselves, build confidence, and improve academically while preparing for future opportunities."
        image={teens}
        reverse
        groups={[
          { title: "Academic Support", icon: BookOpen, items: ["English Language", "Mathematics", "Science", "Study techniques"] },
          { title: "Personal Development", icon: Brain, items: ["Self-esteem & confidence", "Identity & purpose", "Emotional intelligence"] },
          { title: "Life Skills", icon: Target, items: ["Communication", "Decision-making", "Time management", "Peer pressure"] },
          { title: "Career Readiness", icon: Lightbulb, items: ["Career awareness", "Skill discovery", "Intro to digital skills"] },
        ]}
      />

      <ProgramSection
        id="adults"
        index={2}
        badge="Adults"
        title="Adult Development Program"
        tagline="Equipping You for Growth, Leadership, and Income"
        overview="We provide practical, income-generating and leadership skills to help individuals grow professionally and personally."
        image={adults}
        groups={[
          { title: "Business & Career", icon: Briefcase, items: ["Business Management", "Sales & Marketing"] },
          { title: "Leadership", icon: Megaphone, items: ["Leadership & Management", "Communication & Public Speaking"] },
          { title: "Digital Skills", icon: Palette, items: ["Virtual Assistant", "Graphics Design", "UI/UX Design"] },
          { title: "Data & Analytics", icon: BarChart3, items: ["Data Analytics", "Reporting", "Insights for decision-making"] },
        ]}
      />
    </Layout>
  );
};

export default Programs;
