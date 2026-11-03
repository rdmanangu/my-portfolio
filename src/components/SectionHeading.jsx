import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

export default function SectionHeading({ eyebrow, heading, description, id, className = "" }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={viewportOnce}
    >
      <motion.p
        variants={fadeUp}
        className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        id={id}
        variants={fadeUp}
        className="mt-5 bg-accent-gradient bg-clip-text font-display text-[clamp(2.35rem,4.4vw,4.25rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-transparent"
      >
        {heading}
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base leading-8 text-slate-300">
        {description}
      </motion.p>
    </motion.div>
  );
}