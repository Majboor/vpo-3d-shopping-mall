import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Runway", href: "#runway", isRoute: false },
    { label: "Spaces", href: "#spaces", isRoute: false },
    { label: "Editorial", href: "/gallery", isRoute: true },
    { label: "Atelier", href: "/atelier", isRoute: true },
    { label: "Journal", href: "/blog", isRoute: true },
    { label: "Access", href: "#account", isRoute: false },
    { label: "Business", href: "/business", isRoute: true },
    { label: "Case Studies", href: "/case-studies", isRoute: true },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 text-white transition-all duration-500 group border-b border-white/5 bg-transparent hover:backdrop-blur-md">
      <div className="md:px-12 flex h-24 max-w-[1920px] mx-auto px-6 items-center justify-between">
        {/* Brand */}
        <div className="flex-1">
          <Link to="/" className="text-2xl md:text-3xl font-serif italic tracking-tighter hover:opacity-70 transition-opacity">
            VPO.
          </Link>
        </div>

        {/* Central Menu (desktop) */}
        <div className="hidden md:flex flex-1 justify-center gap-5 lg:gap-8">
          {navItems.map((item) => (
            item.isRoute ? (
              <Link
                key={item.label}
                to={item.href}
                className="vpo-navlink text-[10px] uppercase tracking-[0.2em] font-medium transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="vpo-navlink text-[10px] uppercase tracking-[0.2em] font-medium transition-colors"
              >
                {item.label}
              </a>
            )
          ))}
        </div>

        {/* Actions */}
        <div className="flex-1 flex justify-end items-center gap-4 md:gap-6">
          <span className="hidden lg:block text-[10px] text-stone-400 uppercase tracking-widest">
            v.0.9 Beta
          </span>
          <Link
            to="/business#bp-join"
            className="hidden sm:inline-block px-4 py-1.5 border border-white/20 text-[9px] uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            Contact Us
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center p-2 -mr-2 text-white/80 hover:text-white transition-colors"
          >
            {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        style={{ backgroundColor: "#050505", top: 0, left: 0, right: 0, bottom: 0, height: "100dvh", overflowY: "auto", WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}
        className={`md:hidden fixed z-[100] transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Drawer header mirrors the nav bar so the overlay reads as one piece */}
        <div className="flex h-24 items-center justify-between px-6">
          <Link to="/" onClick={() => setMobileOpen(false)} className="text-2xl font-serif italic tracking-tighter text-white">
            VPO.
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center justify-center p-2 -mr-2 text-white/80 hover:text-white transition-colors"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex flex-col px-8 py-6 gap-1">
          {navItems.map((item, i) => (
            item.isRoute ? (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                style={{ transitionDelay: mobileOpen ? `${i * 40}ms` : "0ms" }}
                className={`py-4 border-b border-white/5 text-sm uppercase tracking-[0.25em] font-medium text-white/90 hover:text-white transition-all ${
                  mobileOpen ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                style={{ transitionDelay: mobileOpen ? `${i * 40}ms` : "0ms" }}
                className={`py-4 border-b border-white/5 text-sm uppercase tracking-[0.25em] font-medium text-white/90 hover:text-white transition-all ${
                  mobileOpen ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
                }`}
              >
                {item.label}
              </a>
            )
          ))}
          <Link
            to="/business#bp-join"
            onClick={() => setMobileOpen(false)}
            className="mt-8 px-6 py-4 border border-white/20 text-center text-xs uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
