"use client";

import { useEffect, useRef } from "react";
import type { Project } from "../content";
import ProjectCard from "./ProjectCard";

// Extra vertical scroll (in px) spent per px of horizontal travel
const SCROLL_PER_PX = 1;

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Pin the section; vertical scroll slides the track sideways, continuously
  useEffect(() => {
    const outer = outerRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!outer || !sticky || !track) return;

    let frame = 0;
    let travel = 0;

    const measure = () => {
      travel = Math.max(0, track.scrollWidth - sticky.clientWidth);
      outer.style.height = `${sticky.offsetHeight + travel * SCROLL_PER_PX}px`;
    };
    const update = () => {
      frame = 0;
      const scrolled = -outer.getBoundingClientRect().top;
      const progress = travel > 0 ? Math.min(1, Math.max(0, scrolled / (travel * SCROLL_PER_PX))) : 0;
      track.style.transform = `translate3d(${-progress * travel}px, 0, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    const observer = new ResizeObserver(onResize);
    observer.observe(sticky);
    observer.observe(track);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Sidebar links point at a project id: scroll to where that project reaches the left edge
  useEffect(() => {
    const onHash = () => {
      const i = projects.findIndex((p) => `#${p.id}` === window.location.hash);
      const outer = outerRef.current;
      const sticky = stickyRef.current;
      const track = trackRef.current;
      if (i < 0 || !outer || !sticky || !track) return;
      const travel = Math.max(0, track.scrollWidth - sticky.clientWidth);
      const offset = Math.min(travel, (track.children[i] as HTMLElement).offsetLeft);
      const top = outer.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + offset * SCROLL_PER_PX, behavior: "smooth" });
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [projects]);

  return (
    <div ref={outerRef} role="region" aria-label="Projects">
      <div
        ref={stickyRef}
        className="@container sticky top-12 -mr-5 flex items-center overflow-hidden lg:-mr-8"
        style={{ height: "calc(100vh - 5rem)" }}
      >
        <div
          ref={trackRef}
          className="flex h-full w-max gap-6 pr-5 will-change-transform lg:gap-8 lg:pr-8"
        >
          {projects.map((p) => (
            <div key={p.id} className="h-full w-[96cqw] shrink-0">
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
