import { Link, useParams } from "react-router-dom";
import { ArrowRight, Calendar, User, ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import about from "@/assets/about.jpg";
import children from "@/assets/children.jpg";
import teens from "@/assets/teens.jpg";
import adults from "@/assets/adults.jpg";
import partnership from "@/assets/partnership.jpg";

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  author: string;
  date: string;
  image: string;
  category: string;
}

export const posts: Post[] = [
  {
    slug: "raising-purpose-driven-children",
    title: "Raising Purpose-Driven Children in a Distracted World",
    excerpt:
      "How parents and educators can help children find clarity, character, and confidence early.",
    body: [
      "Children today are growing up surrounded by more noise than ever before. Screens, trends, and constant comparison pull at their attention from every angle. Where past generations had a handful of voices shaping their identity — parents, teachers, faith leaders, neighbours — today's child is shaped by thousands of voices, most of which they have never met. The result is a generation that is more informed than ever, but also more anxious, more distracted, and more uncertain about who they are.",
      "At The Executive Institute of Learning, we believe purpose is the antidote. When a child knows what they value, what they're good at, and where they're going, distractions lose their grip. Purpose acts like an internal compass: it doesn't make the storm disappear, but it gives a clear direction to walk in regardless of what the weather looks like.",
      "Purpose isn't something you hand a child fully formed. It is something you help them uncover, one honest conversation, one challenge and one small victory at a time. The earlier we begin, the more naturally it grows. A six-year-old who is asked thoughtful questions becomes a sixteen-year-old who knows how to ask them of themselves.",
      "Start small. Ask questions that invite reflection — 'What did you enjoy most about today?', 'What felt hard?', 'What would you do differently?'. Celebrate effort over outcome, because effort is the part the child controls. Anchor learning in real life: let them shop with you, plan a small project, solve real family problems. These ordinary moments are where character is actually formed.",
      "Most of all, model the curiosity and discipline you want them to live out. Children rarely become what they are told to become — they become what they see consistently. If they see a parent reading, reflecting, choosing the harder right thing over the easier wrong thing, they absorb a template for life that no classroom can replicate.",
      "Raising purpose-driven children is not a single conversation or a clever programme. It is a thousand small, intentional choices stacked on top of each other. We're here to walk that journey with you.",
    ],
    author: "TEEIL Editorial",
    date: "May 1, 2026",
    image: children,
    category: "Children",
  },
  {
    slug: "teen-identity-and-confidence",
    title: "The Teen Years: Building Identity and Confidence That Lasts",
    excerpt:
      "Practical ways to help teenagers shape a strong sense of self before the world tries to do it for them.",
    body: [
      "The teenage years are a season of becoming. The choices, friendships, and self-talk of this stage shape the adult that emerges on the other side. Almost every adult struggle — confidence, decision-making, relationships, even career direction — has roots that can be traced back to the teen years.",
      "Confidence isn't loud — it's settled. It comes from knowing who you are and being honest about where you're growing. Many teens confuse confidence with performance: being the funniest, the loudest, the most followed. Real confidence is quieter than that. It is the calm that comes from having values you have actually thought about and chosen for yourself.",
      "One of the most powerful things we can give a teenager is the language to describe their own inner world. When a teen can name what they're feeling, why they're feeling it, and what they want to do about it, they move from being controlled by emotion to being informed by it. This single skill changes friendships, academic performance, and family relationships.",
      "Identity is built in three layers: what you believe, what you practise, and who you surround yourself with. We help teens audit all three. What do you actually believe about yourself, your future, and the world? What habits are you repeating daily that are quietly shaping you? Whose voices are loudest in your life — and have you chosen them on purpose?",
      "Our Teen Development program walks alongside young people through identity, communication, decision-making, and early career discovery. We don't lecture them; we sit with them, ask the right questions, and give them tools they will still be using in their thirties.",
      "If you have a teenager in your life, the most important thing you can do today is the simplest: be present, be curious, and be patient. They are not finished — they are forming. And they need adults who believe in who they are becoming.",
    ],
    author: "TEEIL Editorial",
    date: "Apr 22, 2026",
    image: teens,
    category: "Teens",
  },
  {
    slug: "leadership-is-character",
    title: "Leadership Is Character Before It Is Strategy",
    excerpt:
      "Why every leadership journey starts with the leader's inner life — and how adults can develop it.",
    body: [
      "Skills can be taught quickly. Character is built slowly, in the small daily decisions no one sees. We live in a culture obsessed with leadership hacks — frameworks, productivity systems, communication scripts. These tools have value, but they are scaffolding around something deeper. Take away the character of the leader and the scaffolding collapses.",
      "Real leaders are trusted before they are followed. Trust is built on consistency, integrity, and the courage to do the hard right thing. People don't follow titles; they follow people whose private lives line up with their public words. Once that line is broken, no amount of charisma can rebuild it.",
      "Character work is uncomfortable because it requires honesty about ourselves. It asks: where am I cutting corners? Where am I performing rather than leading? Whose feedback am I avoiding? What promises have I made that I am not keeping? These questions don't have shortcuts. They have to be sat with.",
      "Our Adult program intentionally pairs hard skills — communication, strategy, public speaking, business — with character work. Because we never want to release competent people of weak character into the world. Competence without character is one of the most destructive combinations a community can produce.",
      "If you are leading anything — a team, a family, a small business, a classroom — the most important investment you can make this year is in your own inner life. Read slowly. Reflect honestly. Surround yourself with people who will tell you the truth. The leader you become in the next five years is being decided by the choices you make this week.",
    ],
    author: "TEEIL Editorial",
    date: "Apr 10, 2026",
    image: adults,
    category: "Leadership",
  },
  {
    slug: "why-partnerships-matter",
    title: "Why Partnerships Matter for the Future of African Education",
    excerpt:
      "Schools, churches, organizations, and individuals all have a role in raising the next generation.",
    body: [
      "No single institution can solve the development gap alone. Education, character, and leadership formation require an ecosystem. The school cannot do what the family must do. The family cannot do what the community must do. And none of them can do what mentors, faith leaders and employers contribute. When these voices align, learners thrive. When they contradict each other, learners struggle.",
      "Across Africa, we are sitting on the largest young population in human history. The continent's median age is below twenty. The decisions we make in the next decade about how we educate, mentor, and equip these young people will shape the next century. This is not a small moment.",
      "When schools, faith communities, businesses and families align around the same values, learners experience consistency and accelerate. A child who hears 'integrity matters' at home, at school, in their place of worship, and at their internship doesn't have to guess which version of themselves to be. Consistency is the secret ingredient of formation.",
      "Partnerships also unlock scale. A single institute can train thousands. A network of partner schools, churches and organizations can train millions. We are deeply committed to this multiplication model — equipping local champions in every community we touch so the work outlives any single programme.",
      "Partner with us — bring our programs to your community and help us reach more young minds across Africa. Whether you are a head teacher, a corporate leader, a faith leader, a parent network, or a foundation, there is a way to plug in. We will meet your context and co-design something that genuinely works for your people.",
    ],
    author: "TEEIL Editorial",
    date: "Mar 30, 2026",
    image: partnership,
    category: "Partnership",
  },
  {
    slug: "the-power-of-purpose",
    title: "The Power of Purpose: Why Every Learner Needs One",
    excerpt:
      "Purpose turns information into transformation. Here's how we help learners find theirs.",
    body: [
      "Knowledge without purpose is restless. We are producing a generation that knows more than any generation before it, yet feels less direction than ever. Information has multiplied; meaning has not. Purpose gives knowledge a direction and a destination — it tells the mind where to point all that it is learning.",
      "Purpose is not the same as ambition. Ambition asks: how high can I climb? Purpose asks: what am I climbing for? You can have one without the other, and the consequences are very different. Ambition without purpose burns out. Purpose without ambition stays small. The two together change the world.",
      "We help learners of every age uncover the work they were meant to do through three movements: reflection, mentorship, and structured discovery. Reflection slows life down enough to notice what is already true. Mentorship borrows the eyes of someone further along. Structured discovery turns vague hopes into concrete next steps.",
      "When purpose meets discipline, ordinary people accomplish extraordinary things. Discipline without purpose feels like punishment. Purpose without discipline stays a dream. But pair the two — a clear why with a daily how — and you have the foundation for a life of real impact.",
      "Whatever stage you are in, your purpose is not somewhere out there waiting to be stumbled upon. It is being formed, slowly, in the questions you are willing to sit with and the actions you are willing to take. We would love to walk that road with you.",
    ],
    author: "TEEIL Editorial",
    date: "Mar 12, 2026",
    image: about,
    category: "Purpose",
  },
];

const Blog = () => {
  const { slug } = useParams();

  if (slug) {
    const post = posts.find((p) => p.slug === slug);
    if (!post) {
      return (
        <Layout>
          <div className="container-tight py-40 text-center">
            <h1 className="heading-serif text-5xl text-primary">Post not found</h1>
            <Button asChild variant="hero" className="mt-8">
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </Layout>
      );
    }
    return (
      <Layout>
        <article className="pt-32 pb-24">
          <div className="container-tight max-w-3xl">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-accent font-semibold mb-8 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" /> All articles
            </Link>
            <p className="eyebrow">{post.category}</p>
            <h1 className="heading-serif text-4xl md:text-6xl text-primary mt-3">{post.title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><User className="h-4 w-4" /> {post.author}</span>
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {post.date}</span>
            </div>
            <img
              src={post.image}
              alt={post.title}
              className="mt-10 rounded-2xl w-full aspect-[16/9] object-cover shadow-elegant"
            />
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-foreground/85">
              {post.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-12 pt-10 border-t border-border">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">Enroll With Us <ArrowRight /></Link>
              </Button>
            </div>
          </div>
        </article>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero
        badgeTag="Blog"
        title={
          <>
            Insights & <span className="text-accent-glow">Stories.</span>
          </>
        }
        subtitle="Ideas on raising minds, building character, and shaping the next generation of leaders."
      />

      <section className="section bg-background">
        <div className="container-tight grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 80}>
              <Link
                to={`/blog/${post.slug}`}
                className="group block bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all hover:-translate-y-1 h-full"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs text-muted-foreground">
                    {post.date} · {post.author}
                  </p>
                  <h3 className="heading-serif text-2xl text-primary mt-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{post.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-accent font-semibold text-sm">
                    Read article <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
