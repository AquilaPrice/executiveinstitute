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
      "Children today are growing up surrounded by more noise than ever before. Screens, trends, and constant comparison pull at their attention from every angle.",
      "At The Executive Institute of Learning, we believe purpose is the antidote. When a child knows what they value, what they're good at, and where they're going, distractions lose their grip.",
      "Start small. Ask questions that invite reflection. Celebrate effort over outcome. Anchor learning in real life. Most of all, model the curiosity and discipline you want them to live out.",
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
      "The teenage years are a season of becoming. The choices, friendships, and self-talk of this stage shape the adult that emerges on the other side.",
      "Confidence isn't loud — it's settled. It comes from knowing who you are and being honest about where you're growing.",
      "Our Teen Development program walks alongside young people through identity, communication, decision-making, and early career discovery.",
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
      "Skills can be taught quickly. Character is built slowly, in the small daily decisions no one sees.",
      "Real leaders are trusted before they are followed. Trust is built on consistency, integrity, and the courage to do the hard right thing.",
      "Our Adult program intentionally pairs hard skills with character work, because we never want to release competent people of weak character into the world.",
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
      "No single institution can solve the development gap alone. Education, character, and leadership formation require an ecosystem.",
      "When schools, faith communities, businesses and families align around the same values, learners experience consistency and accelerate.",
      "Partner with us — bring our programs to your community and help us reach more young minds across Africa.",
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
      "Knowledge without purpose is restless. Purpose gives knowledge a direction and a destination.",
      "Through reflection, mentorship, and structured discovery, we help learners of every age uncover the work they were meant to do.",
      "When purpose meets discipline, ordinary people accomplish extraordinary things.",
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
