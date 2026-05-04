import { useEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import hero from "@/assets/hero.jpg";

interface Props {
  badge?: string;
  badgeTag?: string;
  title: React.ReactNode;
  subtitle: string;
  searchPlaceholder?: string;
  bgImage?: string;
}

const PageHero = ({
  badge = "The Executive Institute of Learning",
  badgeTag = "New",
  title,
  subtitle,
  searchPlaceholder = "Search programs, e.g. Leadership, Coding, Teens...",
  bgImage = hero,
}: Props) => {
  const navigate = useNavigate();
  const [typed, setTyped] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setTyped("");
    let i = 0;
    const id = window.setInterval(() => {
      i++;
      setTyped(subtitle.slice(0, i));
      if (i >= subtitle.length) window.clearInterval(id);
    }, 28);
    return () => window.clearInterval(id);
  }, [subtitle]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/programs?q=${encodeURIComponent(q)}` : "/programs");
  };

  return (
    <section className="relative w-full overflow-hidden min-h-[100svh] md:min-h-[110vh]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={bgImage} alt="" className="h-full w-full object-cover" />
      </div>
      {/* slate-900 → transparent gradient (using brand navy) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(220 70% 8% / 0.92) 0%, hsl(220 70% 12% / 0.85) 45%, hsl(220 70% 14% / 0.55) 100%)",
        }}
      />
      {/* Soft accent glows */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-primary-glow/30 blur-3xl" />

      <div className="relative z-10 flex min-h-[100svh] md:min-h-[110vh] flex-col items-center justify-center text-center text-white container-tight py-24 md:py-28">
        {/* Badge */}
        <div className="animate-fade-in-down inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 backdrop-blur px-4 py-1.5 text-xs font-semibold text-accent-glow">
          <span className="inline-flex items-center gap-1 rounded-full bg-accent text-accent-foreground px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="h-3 w-3" /> {badgeTag}
          </span>
          <span className="uppercase tracking-[0.18em]">{badge}</span>
        </div>

        {/* Serif headline */}
        <h1
          className="heading-serif mt-6 md:mt-8 text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] text-balance max-w-5xl animate-fade-in"
          style={{ animationDelay: "150ms" }}
        >
          {title}
        </h1>

        {/* Typing subtitle */}
        <p
          className="mt-8 max-w-2xl text-base md:text-lg text-white/85 min-h-[3.5rem]"
          aria-label={subtitle}
        >
          <span className="typing-caret">{typed}</span>
        </p>

        {/* Glowing search input */}
        <form
          onSubmit={onSubmit}
          className="mt-8 md:mt-12 w-full max-w-2xl animate-slide-up"
          style={{ animationDelay: "450ms" }}
        >
          <div className="glow-multi flex items-center gap-2 rounded-2xl bg-white p-2 pl-3 sm:pl-5">
            <Search className="h-5 w-5 text-primary/70 shrink-0 hidden sm:block" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder={searchPlaceholder}
              className="flex-1 min-w-0 bg-transparent border-0 outline-none text-primary placeholder:text-primary/40 text-sm sm:text-base py-2.5 sm:py-3"
              aria-label="Search programs"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-accent text-accent-foreground font-semibold px-3 sm:px-5 py-2.5 sm:py-3 text-sm shadow-glow hover:scale-[1.03] transition-transform shrink-0"
            >
              <span className="hidden sm:inline">Search</span> <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-3 text-[10px] sm:text-xs text-white/60 uppercase tracking-wider">
            Popular: Leadership · Coding · Teen Development · Public Speaking
          </p>
        </form>
      </div>
    </section>
  );
};

export default PageHero;
