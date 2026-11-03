import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "../data/site";
import { useActiveSection } from "../hooks/useActiveSection";

const sectionIds = site.navigation.map((item) => item.id);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const desktopLinks = site.navigation.filter(
    (item) => item.id !== "home" && item.id !== "contact",
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 md:bg-white/5 md:backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-5 sm:px-8 lg:px-12">
        <a
          href="#home"
          aria-current={activeSection === "home" ? "location" : undefined}
          className="group inline-flex min-w-0 items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent-cyan/35 bg-accent-cyan/10 font-display text-sm font-bold text-accent-cyan transition-colors group-hover:bg-accent-cyan/20">
            {site.identity.initials}
          </span>
          <span className="min-w-0 font-display text-sm font-semibold tracking-tight text-white sm:text-base">
            {site.identity.name}
            <span className="ml-2 hidden font-body text-xs font-normal text-slate-400 lg:inline">
              / {site.navbar.portfolioLabel}
            </span>
          </span>
        </a>

        <nav aria-label={site.navbar.desktopNavigationLabel} className="hidden items-center gap-8 md:flex">
          {desktopLinks.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? "location" : undefined}
              className={`relative py-2 text-sm font-medium transition-colors hover:text-white ${
                activeSection === item.id ? "text-accent-cyan" : "text-slate-300"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span aria-hidden="true" className="absolute inset-x-0 -bottom-1 h-px bg-accent-cyan" />
              )}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          aria-current={activeSection === "contact" ? "location" : undefined}
          className="hidden items-center gap-2 rounded-lg border border-accent-cyan/35 bg-accent-cyan/10 px-4 py-2.5 text-sm font-semibold text-accent-cyan transition-colors hover:border-accent-cyan/70 hover:bg-accent-cyan/20 md:inline-flex"
        >
          {site.navbar.contactLabel}
          <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
        </a>

        <button
          type="button"
          aria-label={menuOpen ? site.navbar.closeMenuLabel : site.navbar.openMenuLabel}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white md:hidden"
        >
          {menuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label={site.navbar.mobileNavigationLabel}
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -10 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="absolute left-0 top-full w-full border-b border-white/10 bg-ink px-5 pb-5 pt-2 shadow-glow-blue md:hidden"
          >
            <div className="mx-auto max-w-7xl">
              {site.navigation.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeSection === item.id ? "location" : undefined}
                  className={`block border-b border-white/10 py-3.5 text-base font-medium last:border-b-0 ${
                    activeSection === item.id ? "text-accent-cyan" : "text-slate-200"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}