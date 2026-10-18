"use client";

import { useEffect } from "react";

const SECTIONS = ["about", "projects", "experience", "skills"];

// Marks the sidebar links for the section (and project) currently in view
export default function NavSpy({ projectIds }: { projectIds: string[] }) {
  useEffect(() => {
    let frame = 0;

    const mark = (current: Set<string>) => {
      document.querySelectorAll<HTMLAnchorElement>('a.nav-link[href^="#"]').forEach((a) => {
        if (current.has(a.getAttribute("href")!.slice(1))) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    };

    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.15;
      let section = SECTIONS[0];
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) section = id;
      }
      // Short last sections can never reach the line, so the page bottom counts as the last one
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (atBottom) section = SECTIONS[SECTIONS.length - 1];
      const current = new Set([section]);

      if (section === "projects") {
        let best = -1;
        projectIds.forEach((id, i) => {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= line) best = i;
        });
        if (projectIds[best]) current.add(projectIds[best]);
      }
      mark(current);
    };

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [projectIds]);

  return null;
}
