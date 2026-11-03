import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownToLine, ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { site } from "../data/site";
import { fadeUp, staggerContainer } from "../lib/motion";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { hero, identity } = site;

  const socialLinks = [
    { label: hero.socialLabels.github, href: identity.githubUrl, Icon: Github },
    { label: hero.socialLabels.linkedin, href: identity.linkedinUrl, Icon: Linkedin },
    { label: hero.socialLabels.email, href: `mailto:${identity.email}`, Icon: Mail },
  ];

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-5rem)] scroll-mt-20 items-center overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <img
          src={hero.image}
          alt=""
          fetchPriority="high"
          className="h-full w-full object-cover object-[70%_center] sm:object-center"
        />
        <div className="absolute inset-0 bg-ink/35 sm:bg-transparent" />
        <div className="absolute inset-0 bg-hero-scrim" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <motion.div
          variants={staggerContainer}
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          className="max-w-[760px]"
        >
          <motion.div variants={fadeUp} className="mb-10 sm:mb-12">
            <span className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3.5 py-2 text-[10px] font-semibold tracking-[0.025em] text-accent-cyan sm:text-xs">
              <motion.span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full bg-accent-cyan shadow-glow-cyan"
                animate={reduceMotion ? undefined : { opacity: [1, 0.4, 1], scale: [1, 1.3, 1] }}
                transition={reduceMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
              {hero.availability}
            </span>
          </motion.div>

          <motion.p variants={fadeUp} className="mb-3 text-sm font-semibold tracking-[0.18em] text-accent-cyan sm:text-base">
            {hero.greeting}
          </motion.p>
          <motion.h1
            id="hero-title"
            variants={fadeUp}
            className="bg-accent-gradient bg-clip-text font-display text-[clamp(2.9rem,7.5vw,6.5rem)] font-bold leading-[0.99] tracking-[-0.06em] text-transparent"
          >
            {identity.name}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[660px] font-display text-[clamp(1.6rem,3.1vw,2.65rem)] font-medium leading-[1.2] tracking-[-0.035em] text-white"
          >
            {hero.headline}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-5 max-w-[575px] text-[15px] leading-7 text-slate-300 sm:text-base sm:leading-8">
            {hero.description}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
            {identity.resumeUrl && (
              <a
                href={identity.resumeUrl}
                download
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg bg-accent-cyan px-5 py-3 text-sm font-bold text-ink shadow-glow-cyan transition-transform hover:-translate-y-0.5 hover:bg-cyan-300"
              >
                <ArrowDownToLine aria-hidden="true" size={18} strokeWidth={2} />
                {hero.resumeLabel}
              </a>
            )}
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-accent-cyan/50 hover:bg-white/10"
            >
              {hero.projectsLabel}
              <ArrowRight aria-hidden="true" size={18} strokeWidth={1.8} />
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-9 flex items-center gap-3">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                title={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-slate-200 transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
              >
                <Icon aria-hidden="true" size={19} strokeWidth={1.8} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}