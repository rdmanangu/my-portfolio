import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Code2, Github } from "lucide-react";
import { projectContent, projects } from "../data/projects";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";
import SectionHeading from "./SectionHeading";

function ProjectPreview({ project }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-project-fallback p-2 sm:p-3">
      {project.image && !imageFailed ? (
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
          width="800"
          height="450"
          onError={() => setImageFailed(true)}
          className="h-full w-full rounded-xl border border-white/10 object-contain object-center transition-transform duration-500 motion-safe:group-hover:scale-[1.025]"
        />
      ) : (
        <div aria-hidden="true" className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl border border-white/10 text-accent-cyan">
          <Code2 size={38} strokeWidth={1.4} />
          <span className="font-display text-xl font-semibold text-white">{project.title}</span>
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const reduceMotion = useReducedMotion();
  const { labels } = projectContent;

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-48 top-40 h-[560px] w-[560px] bg-glow-cyan" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          id="projects-title"
          eyebrow={projectContent.eyebrow}
          heading={projectContent.heading}
          description={projectContent.description}
          className="max-w-2xl"
        />

        <motion.div
          variants={staggerContainer}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6"
        >
          {projects.map((project) => (
            <motion.article
              key={project.id}
              variants={fadeUp}
              whileHover={reduceMotion ? undefined : { y: -5 }}
              className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/10 transition-[border-color,box-shadow,transform] duration-300 hover:border-accent-cyan/45 hover:shadow-[0_18px_50px_rgba(34,211,238,0.12)] md:backdrop-blur-md"
            >
              <ProjectPreview project={project} />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="text-[10px] font-semibold uppercase leading-5 tracking-[0.16em] text-accent-cyan">
                  {project.type}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-[1.7rem]">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-200">{project.summary}</p>

                <div className="mt-5 space-y-2.5 border-t border-white/10 pt-5 text-[13px] leading-6 text-slate-300">
                  <p><span className="mr-1.5 font-semibold text-white">{labels.problem}.</span>{project.problem}</p>
                  <p><span className="mr-1.5 font-semibold text-white">{labels.solution}.</span>{project.solution}</p>
                  <p><span className="mr-1.5 font-semibold text-white">{labels.result}.</span>{project.result}</p>
                </div>

                <div className="mt-auto pt-6">
                  <ul className="flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                    {project.tech.map((technology) => (
                      <li key={technology} className="rounded-md border border-white/10 bg-slate-950/30 px-2.5 py-1 text-[11px] font-medium text-slate-200">
                        {technology}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
                    {project.sourceUrl && (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${labels.source}: ${project.title}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
                      >
                        <Github aria-hidden="true" size={17} strokeWidth={1.8} />
                        {labels.source}
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${labels.demo}: ${project.title}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-2 text-sm font-semibold text-accent-cyan transition-colors hover:border-accent-cyan/60 hover:bg-accent-cyan/20 hover:text-cyan-200"
                      >
                        {labels.demo}
                        <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}