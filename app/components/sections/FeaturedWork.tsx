"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, stagger } from "animejs";
import { useContentStore } from "../../store/contentStore";

const FeaturedWork: React.FC = () => {
    const workGridRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const projects = useContentStore(state => state.projects);

    useEffect(() => {
        // Header animation
        if (headerRef.current) {
            animate(headerRef.current, {
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
                easing: 'easeOutExpo'
            });
        }

        // Cards stagger animation
        if (workGridRef.current) {
            animate(workGridRef.current.children, {
                scale: [0.95, 1],
                opacity: [0, 1],
                translateY: [30, 0],
                delay: stagger(150, { start: 200 }),
                easing: 'easeOutExpo'
            });
        }
    }, [projects]);

    const handleCardHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const card = e.currentTarget;
        const image = card.querySelector('.project-image');
        
        animate(card, {
            y: -8,
            duration: 300,
            easing: 'easeOutQuad'
        });

        if (image) {
            animate(image, {
                scale: 1.05,
                duration: 400,
                easing: 'easeOutQuad'
            });
        }
    };

    const handleCardLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const card = e.currentTarget;
        const image = card.querySelector('.project-image');
        
        animate(card, {
            y: 0,
            duration: 400,
            easing: 'easeOutElastic(1, .8)'
        });

        if (image) {
            animate(image, {
                scale: 1,
                duration: 400,
                easing: 'easeOutQuad'
            });
        }
    };

    return (
        <section className="py-8">
            {/* Section Header */}
            <div ref={headerRef} className="flex items-center justify-between mb-8 opacity-0">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary animate-pulse" />
                    <h2 className="text-sm font-bold text-text-muted uppercase tracking-[0.2em] font-mono">
                        Projects
                    </h2>
                </div>
                <div className="text-xs font-mono text-text-faint">
                    {projects.length} MODULES DEPLOYED
                </div>
            </div>

            {/* Projects Grid */}
            <div ref={workGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <a
                        key={project.id}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={handleCardHover}
                        onMouseLeave={handleCardLeave}
                        className="group relative bg-surface/40 backdrop-blur-sm border border-surface-mid 
                            hover:border-primary/40 overflow-hidden cursor-pointer opacity-0 block"
                    >
                        {/* Project Image */}
                        <div className="relative h-48 overflow-hidden">
                            {project.image ? (
                                <div className="project-image absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-500">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="absolute inset-0 bg-surface-mid flex items-center justify-center">
                                    <span className="text-4xl font-mono text-surface-up">{project.id}</span>
                                </div>
                            )}
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-surface-dim/50 to-transparent" />
                            
                            {/* Year Badge */}
                            <div className="absolute top-3 right-3 px-2 py-1 bg-surface-dim/80 border border-surface-up text-[10px] font-mono text-text-dim">
                                {project.year}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            {/* ID and Title */}
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-[10px] font-mono text-text-faint">{project.id} //</span>
                                <h3 className="text-lg font-bold text-text group-hover:text-primary transition-colors font-mono tracking-tight">
                                    {project.title}
                                </h3>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-text-dim leading-relaxed mb-4 group-hover:text-text-muted transition-colors">
                                {project.longDescription}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 pt-3 border-t border-surface-mid">
                                {project.tags.map((tag, i) => (
                                    <span 
                                        key={i}
                                        className="text-[10px] font-mono text-text-faint bg-surface/80 
                                        px-2 py-1 border border-surface-mid group-hover:border-primary/30 
                                        group-hover:text-primary-muted/70 transition-all"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Hover Corner Accents */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-transparent group-hover:border-primary/50 transition-colors" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-transparent group-hover:border-primary/50 transition-colors" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-transparent group-hover:border-primary/50 transition-colors" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-transparent group-hover:border-primary/50 transition-colors" />
                    </a>
                ))}
            </div>
        </section>
    );
};

export default FeaturedWork;
