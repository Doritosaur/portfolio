"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "../content";

// The site renders at a desktop viewport, then is scaled down to fit the card.
const FRAME_WIDTH = 1280;
const ASPECT = 5 / 4; // card height / width

export default function ProjectCard({ project: p }: { project: Project }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setScale(entry.contentRect.width / FRAME_WIDTH),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const content = (
    <div ref={boxRef} className="relative aspect-[4/5] overflow-hidden bg-img">
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
            className="pointer-events-none absolute left-0 top-0 origin-top-left border-0 bg-white"
            style={{
              width: FRAME_WIDTH,
              height: FRAME_WIDTH * ASPECT,
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
      <div className="absolute inset-0 flex flex-col justify-end gap-3 bg-lav/70 backdrop-blur-[2px] p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="font-semibold">{p.title}</span>
        <p>{p.longDescription}</p>
      </div>
    </div>
  );

  const className = "group block scroll-mt-12";
  return p.link ? (
    <a id={p.id} href={p.link} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <div id={p.id} className={className}>
      {content}
    </div>
  );
}
