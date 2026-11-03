import { ArrowUp } from "lucide-react";
import { site } from "../data/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-canvas/60 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <div>
          <a href="#home" className="font-display text-base font-semibold text-white transition-colors hover:text-accent-cyan">
            {site.identity.name}
          </a>
          <p className="mt-1 text-xs text-slate-400">{site.footer.tagline}</p>
        </div>
        <div className="flex items-center justify-between gap-6 md:justify-end">
          <p className="text-xs text-slate-400">
            {new Date().getFullYear()} {site.identity.name}. {site.footer.rights}
          </p>
          <a href="#home" className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-slate-200 transition-colors hover:text-accent-cyan">
            {site.footer.backToTop}
            <ArrowUp aria-hidden="true" size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}