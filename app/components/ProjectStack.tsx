"use client";

import { useEffect, useRef } from "react";
import type { Project } from "../content";
import ProjectCard from "./ProjectCard";

const STICKY_TOP = 48;
const SLACK = 24;
const GLIDE_MS = 700;
const PAUSE_MS = 90;
const SWIPE_PX = 24;

export default function ProjectStack({ projects }: { projects: Project[] }) {
  const listRef = useRef<HTMLDivElement>(null);

  // One scroll gesture (wheel, trackpad or swipe) glides straight to the next project
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animating = false;
    let lastInput = 0;
    let frame = 0;

    const stops = () => {
      const top = list.getBoundingClientRect().top + window.scrollY - STICKY_TOP;
      return projects.map((_, i) => top + i * window.innerHeight);
    };

    // Only take over while a stop lies in the direction of travel, and near the stack
    const nextStop = (down: boolean) => {
      const points = stops();
      const y = window.scrollY;
      const entry = window.innerHeight * 0.3;
      if (down) {
        if (y < points[0] - entry) return;
        return points.find((p) => p > y + SLACK);
      }
      if (y > points[points.length - 1] + entry) return;
      return [...points].reverse().find((p) => p < y - SLACK);
    };

    const glide = (to: number) => {
      const from = window.scrollY;
      if (reduce.matches) {
        window.scrollTo({ top: to, behavior: "instant" });
        return;
      }
      animating = true;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / GLIDE_MS);
        // Ease-out: moves the instant you scroll, then settles gently
        const eased = 1 - Math.pow(1 - t, 4);
        window.scrollTo({ top: from + (to - from) * eased, behavior: "instant" });
        if (t < 1) frame = requestAnimationFrame(step);
        else animating = false;
      };
      frame = requestAnimationFrame(step);
    };

    const go = (down: boolean) => {
      const to = nextStop(down);
      if (to === undefined) return false;
      glide(to);
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.deltaY === 0 || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const down = e.deltaY > 0;
      if (animating) {
        e.preventDefault();
        lastInput = performance.now();
        return;
      }
      // Trackpad momentum keeps sending events: wait for a pause before starting another move
      const fresh = performance.now() - lastInput > PAUSE_MS;
      lastInput = performance.now();
      if (nextStop(down) === undefined) return;
      e.preventDefault();
      if (fresh) go(down);
    };

    let touchY = 0;
    let touchCaptured = false;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
      touchCaptured = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (animating) {
        e.preventDefault();
        return;
      }
      const dy = touchY - e.touches[0].clientY;
      if (Math.abs(dy) < SWIPE_PX || touchCaptured) {
        if (touchCaptured && e.cancelable) e.preventDefault();
        return;
      }
      if (nextStop(dy > 0) === undefined || !e.cancelable) return;
      e.preventDefault();
      touchCaptured = true;
      go(dy > 0);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(frame);
    };
  }, [projects]);

  // Plain vertical flow, one viewport per project, so scrolling really moves the page
  return (
    <div ref={listRef} className="mt-6 flex flex-col gap-20">
      {projects.map((p) => (
        <div
          key={p.id}
          id={p.id}
          className="flex h-[calc(100vh-5rem)] shrink-0 scroll-mt-12 flex-col gap-5 [contain:layout_paint] lg:flex-row lg:gap-10"
        >
          <div className="min-h-0 flex-1">
            <ProjectCard project={p} />
          </div>
          <div className="shrink-0 overflow-y-auto lg:w-72 xl:w-96">
            <h3 className="text-2xl font-semibold">{p.title}</h3>
            <p className="mt-1 text-muted">{p.description}</p>
            <p className="mt-4">{p.longDescription}</p>
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block underline underline-offset-4 hover:text-muted"
              >
                Visit site ↗
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
