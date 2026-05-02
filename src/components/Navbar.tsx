import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/partnership", label: "Partnership" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-lg shadow-card" : "bg-background/0"
      }`}
    >
      <nav className="container-tight flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="The Executive Institute of Learning logo" className="h-12 w-auto rounded-md" />
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-[10px] font-bold tracking-[0.18em] text-accent uppercase">The Executive Institute</span>
            <span className="text-sm font-extrabold text-primary tracking-tight">of Learning</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `text-sm font-semibold story-link transition-colors ${
                  isActive ? "text-accent" : "text-foreground/80 hover:text-primary"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="outline" size="sm">
            <Link to="/partnership">Partner</Link>
          </Button>
          <Button asChild variant="hero" size="sm">
            <Link to="/contact">Enroll Now</Link>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-md text-primary"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in-down">
          <div className="container-tight py-6 flex flex-col gap-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `text-base font-semibold py-2 ${isActive ? "text-accent" : "text-foreground"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="flex gap-3 pt-2">
              <Button asChild variant="outline" className="flex-1">
                <Link to="/partnership">Partner</Link>
              </Button>
              <Button asChild variant="hero" className="flex-1">
                <Link to="/contact">Enroll Now</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
