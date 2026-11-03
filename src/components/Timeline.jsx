import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { journeyContent } from "../data/education";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";
import SectionHeading from "./SectionHeading";

export default function Timeline() {
  const timelineRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 55%"],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  const entries = [journeyContent.degree, ...journeyContent.certifications];

  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/5 bg-canvas/45 py-24 sm:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -left-48 top-0 h-[550px] w-[550px] bg-glow-purple" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12">
        <SectionHeading
          id="journey-title"
          eyebrow={journeyContent.eyebrow}
          heading={journeyContent.heading}
          description={journeyContent.description}
          className="lg:sticky lg:top-32 lg:self-start"
        />

        <motion.div
          ref={timelineRef}
          variants={staggerContainer}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={viewportOnce}
          className="relative pl-10 sm:pl-14"
        >
          <div aria-hidden="true" className="absolute bottom-2 left-2.5 top-2 w-px bg-white/15" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: reduceMotion ? 1 : lineProgress }}
            className="absolute bottom-2 left-[9px] top-2 w-[3px] origin-top rounded-full bg-accent-gradient"
          />

          {entries.map((entry, index) => (
            <motion.article
              key={`${entry.kind}-${entry.title}`}
              variants={fadeUp}
              className="relative mb-10 border-b border-white/10 pb-10 last:mb-0 last:border-b-0 last:pb-0"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[39px] top-0.5 h-5 w-5 rounded-full border-[5px] border-ink bg-accent-cyan shadow-glow-cyan sm:-left-[55px]"
              />
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-cyan">
                  {entry.kind}
                </p>
                <p className="text-xs font-medium text-slate-400">{entry.date}</p>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {entry.title}
              </h3>
              <p className="mt-2 font-medium text-slate-200">{entry.organization}</p>

              {index === 0 && (
                <>
                  <p className="mt-3 text-sm text-slate-300">{entry.standing}</p>
                  {(entry.gpa || entry.honors) && (
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-300">
                      {entry.gpa && <span>{journeyContent.gpaLabel}: {entry.gpa}</span>}
                      {entry.honors && <span>{journeyContent.honorsLabel}: {entry.honors}</span>}
                    </div>
                  )}
                  <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">{entry.description}</p>
                  <div className="mt-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                      {journeyContent.courseworkLabel}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {entry.coursework.map((course) => (
                        <li key={course} className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200">
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}