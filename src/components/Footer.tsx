import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-tight py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center mb-5">
            <img
              src={logo}
              alt="TEEIL logo"
              loading="lazy"
              className="h-16 w-auto object-contain mix-blend-screen contrast-125 saturate-150"
            />
          </div>
          <p className="text-primary-foreground/75 max-w-md">
            Raising minds and building lives through academic excellence, life principles,
            and leadership development across Africa.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-accent">Explore</h4>
          <ul className="space-y-2 text-primary-foreground/80 text-sm">
            <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
            <li><Link to="/programs" className="hover:text-accent">Programs</Link></li>
            <li><Link to="/partnership" className="hover:text-accent">Partnership</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-accent">Contact</h4>
          <ul className="space-y-3 text-primary-foreground/80 text-sm">
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" /><span>+234 805 092 0744<br />+256 774 538 481</span></li>
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0" /><a href="mailto:teeiinstitute@gmail.com" className="hover:text-accent">teeiinstitute@gmail.com</a></li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /><span>HQ: Nigeria · Branches in Botswana, Ghana, South Africa, Uganda, Kenya</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-tight py-6 text-xs text-primary-foreground/60 flex flex-col sm:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} The Executive Institute of Learning. All rights reserved.</p>
          <p>Raising Minds. Building Lives.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
