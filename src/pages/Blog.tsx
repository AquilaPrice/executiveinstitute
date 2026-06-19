import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Calendar, User, ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import fallbackImg from "@/assets/about.jpg";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  author: string | null;
  published_at: string | null;
  created_at: string;
}

const formatDate = (d?: string | null) =>
  d
    ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : "";

const Blog = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      if (slug) {
        const { data } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("slug", slug)
          .eq("published", true)
          .maybeSingle();
        if (!cancelled) setPost(data as Post | null);
      } else {
        const { data } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("published", true)
          .order("published_at", { ascending: false, nullsFirst: false })
          .order("created_at", { ascending: false });
        if (!cancelled) setPosts((data ?? []) as Post[]);
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (slug) {
    if (loading) {
      return (
        <Layout>
          <div className="pt-40 pb-24 text-center text-muted-foreground">Loading article...</div>
        </Layout>
      );
    }
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
            <h1 className="heading-serif text-4xl md:text-6xl text-primary mt-3">{post.title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              {post.author && (
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-4 w-4" /> {post.author}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {formatDate(post.published_at ?? post.created_at)}
              </span>
            </div>
            <img
              src={post.cover_image || fallbackImg}
              alt={post.title}
              className="mt-10 rounded-2xl w-full aspect-[16/9] object-cover shadow-elegant"
            />
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-foreground/85">
              {post.content.split(/\n\s*\n/).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-12 pt-10 border-t border-border">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">
                  Enroll With Us <ArrowRight />
                </Link>
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
        <div className="container-tight">
          {loading ? (
            <div className="text-center text-muted-foreground">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">
              No published posts yet. Check back soon.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <Reveal key={post.id} delay={i * 80}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all hover:-translate-y-1 h-full"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={post.cover_image || fallbackImg}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-xs text-muted-foreground">
                        {formatDate(post.published_at ?? post.created_at)}
                        {post.author ? ` · ${post.author}` : ""}
                      </p>
                      <h3 className="heading-serif text-2xl text-primary mt-3 group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}
                      <span className="mt-5 inline-flex items-center gap-2 text-accent font-semibold text-sm">
                        Read article{" "}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
