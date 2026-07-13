"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { useContentStore } from "../../store/contentStore";

const SystemArsenal: React.FC = () => {
    const { arsenal } = useContentStore(state => state);
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            animate(containerRef.current.querySelectorAll('.skill-card'), {
                opacity: [0, 1],
                translateY: [20, 0],
                delay: stagger(100, { start: 300 }),
                easing: 'easeOutQuad'
            });

            animate(containerRef.current.querySelectorAll('.tech-chip'), {
                scale: [0.8, 1],
                opacity: [0, 1],
                delay: stagger(30, { start: 600 }),
                easing: 'easeOutQuad'
            });
        }
    }, [arsenal]);

    // Section reveal animation
    useEffect(() => {
        if (!sectionRef.current) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate('.arsenal-header', {
                        opacity: [0, 1],
                        translateX: [-20, 0],
                        duration: 600,
                        easing: 'easeOutExpo'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleChipHover = (e: React.MouseEvent<HTMLSpanElement>) => {
        animate(e.currentTarget, {
            scale: 1.05,
            backgroundColor: 'rgba(34, 211, 238, 0.1)',
            borderColor: 'rgba(34, 211, 238, 0.5)',
            duration: 200,
            easing: 'easeOutQuad'
        });
    };

    const handleChipLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
        animate(e.currentTarget, {
            scale: 1,
            backgroundColor: 'rgba(24, 24, 27, 1)',
            borderColor: 'rgba(63, 63, 70, 1)',
            duration: 200,
            easing: 'easeOutQuad'
        });
    };

    return (
        <section ref={sectionRef} className="border border-surface-mid bg-surface/30 p-6 mb-12 glass-panel glow-hover">
            <div className="arsenal-header flex items-center gap-3 mb-6 opacity-0">
                <div className="w-1.5 h-1.5 bg-primary-dim animate-pulse" />
                <h3 className="text-xs font-bold text-text-dim uppercase tracking-widest font-mono">
                    Skills & Technology
                </h3>
            </div>

            <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {arsenal.map((group, index) => (
                    <div key={index} className="skill-card opacity-0">
                        <div className="text-[10px] text-primary-dim font-mono uppercase tracking-widest mb-3 border-b border-surface-mid pb-2">
                            {group.category.replace('_', ' & ')}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {group.items.map((item, i) => (
                                <span
                                    key={i}
                                    onMouseEnter={handleChipHover}
                                    onMouseLeave={handleChipLeave}
                                    className="tech-chip px-2 py-1 text-xs text-text-muted bg-surface border border-surface-up cursor-default transition-colors"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SystemArsenal;
