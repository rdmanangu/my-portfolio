import { useEffect, useState } from "react";

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    let frame = null;

    const update = () => {
      frame = null;
      const referenceLine = window.innerHeight * 0.33;
      let current = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= referenceLine) current = section.id;
      }

      setActiveSection(current);
    };

    // A single measurement per frame keeps the highlight stable during smooth anchor scrolling.
    const scheduleUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [sectionIds]);

  return activeSection;
}