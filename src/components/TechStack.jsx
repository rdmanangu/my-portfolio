import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { skillContent } from "../data/skills";
import { easeOut } from "../lib/motion";
import SectionHeading from "./SectionHeading";

const markStyles = {
  languages: "border-accent-cyan/25 bg-accent-cyan/10 text-accent-cyan",
  frontend: "border-accent-blue/30 bg-accent-blue/10 text-blue-300",
  backend: "border-accent-purple/30 bg-accent-purple/10 text-accent-purple",
  tools: "border-accent-purple/30 bg-accent-purple/10 text-accent-purple",
  databases: "border-accent-cyan/25 bg-accent-cyan/10 text-accent-cyan",
  "data-science": "border-accent-blue/30 bg-accent-blue/10 text-blue-300",
};

export default function TechStack() {
  const [activeTab, setActiveTab] = useState("all");
  const tabRefs = useRef([]);
  const reduceMotion = useReducedMotion();
  const { tabs, items } = skillContent;
  const visibleSkills = activeTab === "all" ? items : items.filter((skill) => skill.category === activeTab);

  function handleTabKeyDown(event, index) {
    let nextIndex;

    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    else return;

    event.preventDefault();
    setActiveTab(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative scroll-mt-20 overflow-hidden border-y border-white/5 bg-canvas/55 py-24 sm:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -left-52 bottom-0 h-[520px] w-[520px] bg-glow-purple" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          id="skills-title"
          eyebrow={skillContent.eyebrow}
          heading={skillContent.heading}
          description={skillContent.description}
          className="max-w-2xl"
        />

        <div className="mt-12 overflow-x-auto border-b border-white/10 sm:mt-14">
          <div role="tablist" aria-label={skillContent.tabsLabel} className="flex min-w-max gap-7 sm:gap-9">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                ref={(node) => { tabRefs.current[index] = node; }}
                type="button"
                role="tab"
                id={`skills-tab-${tab.id}`}
                aria-controls="skills-panel"
                aria-selected={activeTab === tab.id}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`relative whitespace-nowrap pb-4 text-sm font-medium transition-colors sm:text-base ${
                  activeTab === tab.id ? "text-accent-cyan" : "text-slate-300 hover:text-white"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="skills-active-tab"
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.3, ease: easeOut }}
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-accent-cyan"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div
          id="skills-panel"
          role="tabpanel"
          aria-labelledby={`skills-tab-${activeTab}`}
          tabIndex={0}
          className="pt-5 focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-accent-cyan"
        >
          <motion.ul layout className="grid grid-cols-2 gap-x-5 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-4">
            <AnimatePresence initial={false} mode="popLayout">
              {visibleSkills.map((skill) => (
                <motion.li
                  key={skill.name}
                  layout="position"
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.96 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.28, layout: { duration: 0.38, ease: easeOut } }}
                  className="flex min-h-[88px] min-w-0 items-center gap-3 border-b border-white/10 py-4 sm:gap-4"
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border font-display text-xs font-bold ${markStyles[skill.category]}`}
                  >
                    {skill.mark}
                  </span>
                  <span className="min-w-0 font-display text-sm font-medium leading-tight text-white sm:text-base">
                    {skill.name}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </div>
    </section>
  );
}