"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "../content";

// The site renders at a desktop viewport, then is scaled down to fit the preview.
const FRAME_WIDTH = 1280;

export default function ProjectCard({ project: p }: { project: Project }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const scale = size.w / FRAME_WIDTH;

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setSize({ w: entry.contentRect.width, h: entry.contentRect.height }),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const body = (
    <>
      <div
        ref={boxRef}
        className="relative h-full w-full overflow-hidden bg-img"
      >
        {p.link ? (
          scale > 0 && (
            <iframe
              src={p.link}
              title={`${p.title} preview`}
              loading="lazy"
              tabIndex={-1}
              scrolling="no"
              sandbox="allow-scripts allow-same-origin"
              referrerPolicy="no-referrer"
              className="pointer-events-none absolute left-0 top-0 origin-top-left border-0 bg-img"
              style={{
                width: FRAME_WIDTH,
                height: size.h / scale,
                transform: `scale(${scale})`,
              }}
            />
          )
        ) : (
          p.image && (
            <Image
              src={p.image}
              alt={p.title}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
              className="object-cover"
            />
          )
        )}

        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-baseline gap-x-4 gap-y-0.5 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-5 pb-4 pt-16 text-white [text-shadow:0_1px_6px_rgb(0_0_0/0.5)]">
          <h3 className="mr-auto text-lg font-semibold">{p.title}</h3>
          {p.link && <span className="text-white/90">↗</span>}
        </div>
      </div>
    </>
  );

  const className = "group block h-full scroll-mt-12";
  return p.link ? (
    <a id={p.id} href={p.link} target="_blank" rel="noopener noreferrer" className={className}>
      {body}
    </a>
  ) : (
    <div id={p.id} className={className}>
      {body}
    </div>
  );
}
