"use client";

import { useEffect, useRef } from "react";
import type { Project } from "../content";
import ProjectCard from "./ProjectCard";

// Extra vertical scroll (in px) spent per px of horizontal travel
const SCROLL_PER_PX = 1;
// Fraction of the remaining distance the track covers each frame (lower = floatier)
const EASE = 0.12;

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

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let travel = 0;
    let target = 0;
    let current = 0;

    const measure = () => {
      travel = Math.max(0, track.scrollWidth - sticky.clientWidth);
      // The sticky offset is added so the pin holds right to the end of the travel
      const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
      outer.style.height = `${sticky.offsetHeight + stickyTop + travel * SCROLL_PER_PX}px`;
    };
    const readTarget = () => {
      const scrolled = -outer.getBoundingClientRect().top;
      const progress = travel > 0 ? Math.min(1, Math.max(0, scrolled / (travel * SCROLL_PER_PX))) : 0;
      target = progress * travel;
    };
    const paint = () => {
      track.style.transform = `translate3d(${-current}px, 0, 0)`;
      // Light motion: slides settle in scale and opacity as they near the centre of the view
      const mid = current + sticky.clientWidth / 2;
      for (const el of Array.from(track.children) as HTMLElement[]) {
        const centre = el.offsetLeft + el.offsetWidth / 2;
        const t = Math.min(1, Math.abs(centre - mid) / (sticky.clientWidth * 0.9));
        el.style.opacity = String(1 - t * 0.45);
        el.style.transform = `scale(${1 - t * 0.04})`;
      }
    };
    const tick = () => {
      frame = 0;
      readTarget();
      const diff = target - current;
      if (reduce.matches || Math.abs(diff) < 0.3) current = target;
      else current += diff * EASE;
      paint();
      if (current !== target) frame = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onResize = () => {
      measure();
      kick();
    };

    measure();
    readTarget();
    current = target;
    paint();
    const observer = new ResizeObserver(onResize);
    observer.observe(sticky);
    observer.observe(track);
    window.addEventListener("scroll", kick, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", kick);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Sidebar links point at a project id: scroll the page to where that project is centred
  useEffect(() => {
    const scrollToProject = (i: number) => {
      const outer = outerRef.current;
      const sticky = stickyRef.current;
      const track = trackRef.current;
      if (!outer || !sticky || !track) return;
      const travel = Math.max(0, track.scrollWidth - sticky.clientWidth);
      const slide = track.children[i] as HTMLElement;
      const centred = slide.offsetLeft + slide.offsetWidth / 2 - sticky.clientWidth / 2;
      const offset = Math.min(travel, Math.max(0, centred));
      const top = outer.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + offset * SCROLL_PER_PX, behavior: "smooth" });
    };
    const indexOf = (hash: string) => projects.findIndex((p) => `#${p.id}` === hash);

    // Handle the click ourselves so the browser's own anchor jump can't fight the scroll,
    // and so re-clicking the current link still works
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const i = a ? indexOf(a.getAttribute("href")!) : -1;
      if (!a || i < 0) return;
      e.preventDefault();
      history.replaceState(null, "", a.getAttribute("href"));
      scrollToProject(i);
    };

    const initial = indexOf(window.location.hash);
    if (initial >= 0) scrollToProject(initial);
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [projects]);

  return (
    <div ref={outerRef} role="region" aria-label="Projects">
      <div
        ref={stickyRef}
        // A focus jump must never scroll the clipped track on its own
        onScroll={(e) => {
          e.currentTarget.scrollLeft = 0;
        }}
        className="@container sticky top-12 -mr-5 flex items-center overflow-hidden lg:-mr-8"
        style={{ height: "calc(100vh - 5rem)" }}
      >
        <div
          ref={trackRef}
          className="flex h-full w-max gap-6 pr-5 will-change-transform lg:gap-8 lg:pr-8"
        >
          {projects.map((p) => (
            <div key={p.id} className="h-full w-[96cqw] shrink-0 will-change-transform">
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
