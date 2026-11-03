import { motion, useReducedMotion } from "framer-motion";
import { site } from "../data/site";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";
import SectionHeading from "./SectionHeading";

export default function About() {
  const reduceMotion = useReducedMotion();
  const { about } = site;

  return (
    <section id="about" aria-labelledby="about-title" className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-48 top-0 h-[580px] w-[580px] bg-glow-cyan" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12">
        <SectionHeading
          id="about-title"
          eyebrow={about.eyebrow}
          heading={about.heading}
          description={about.description}
          className="lg:pt-6"
        />

        <motion.ul
          variants={staggerContainer}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3"
        >
          {about.details.map((detail) => (
            <motion.li
              key={detail.label}
              variants={fadeUp}
              className="flex min-h-[156px] flex-col rounded-2xl border border-white/10 bg-white/5 p-4 sm:min-h-[170px] sm:p-5 md:backdrop-blur-md"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 sm:text-[11px]">
                {detail.label}
              </p>
              <p className="mt-auto wrap-break-word font-display text-lg font-semibold leading-tight text-white sm:text-xl">
                {detail.value}
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-400">{detail.note}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}