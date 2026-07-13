"use client";

import React, { useRef, useState, useEffect } from "react";
import CyberFrame from "../ui/CyberFrame";

import { useContentStore } from "../../store/contentStore";

const ImplementationDesigns: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const blueprints = useContentStore(state => state.blueprints);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const handleScroll = () => {
            const scrollLeft = scrollContainer.scrollLeft;
            const cardWidth = scrollContainer.firstElementChild?.clientWidth || 350;
            const gap = 24; // gap-6 = 1.5rem = 24px
            const index = Math.round(scrollLeft / (cardWidth + gap));
            setActiveIndex(Math.min(index, blueprints.length - 1));
        };

        scrollContainer.addEventListener('scroll', handleScroll);
        return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }, [blueprints.length]);

    return (
        <section className="mb-24">
            <div className="flex items-center gap-2 mb-8">
                <div className="w-2 h-2 bg-primary" />
                <h2 className="text-sm font-bold text-text-muted uppercase tracking-[0.2em] font-mono">
                    Schematics // Blueprints
                </h2>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-2 xl:grid-cols-4 lg:overflow-visible lg:pb-0"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {blueprints.map((bp, i) => (
                    <div key={i} className="min-w-[300px] md:min-w-[350px] lg:min-w-0 snap-center">
                        <CyberFrame
                            label={`SCHEMATIC_0${i + 1}`}
                            className="h-[400px] flex flex-col justify-between border-primary-deep/50 bg-primary-bg/20 hover:border-primary transition-colors group cursor-pointer relative overflow-hidden"
                        >
                            <div
                                className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity bg-cover bg-center pointer-events-none mix-blend-luminosity"
                                style={{ backgroundImage: `url(${bp.image})` }}
                            />

                            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                            <div className="p-4 relative z-10">
                                <h4 className="text-xl font-bold text-text-bright font-hud tracking-wider mb-1 mt-32 group-hover:text-primary transition-colors">{bp.title}</h4>
                                <p className="text-[10px] text-primary uppercase tracking-widest mb-4">{bp.subtitle}</p>
                                <p className="text-xs text-text-muted leading-relaxed font-mono border-l-2 border-primary-deep pl-3">
                                    {bp.description}
                                </p>
                            </div>

                            <div className="border-t border-primary-deep/50 p-4 flex justify-between items-center bg-primary-bg/20">
                                <span className="text-[9px] text-primary-muted font-hud">REV. 2.4.1</span>
                                <a
                                    href={bp.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] text-primary hover:text-text-bright border border-primary-deep hover:border-primary px-3 py-1 transition-colors uppercase"
                                >
                                    View_Source
                                </a>
                            </div>
                        </CyberFrame>
                    </div>
                ))}
            </div>

            <div className="flex lg:hidden gap-1 h-1 w-full max-w-[200px] mt-2">
                {blueprints.map((_, i) => (
                    <div 
                        key={i} 
                        className={`flex-1 transition-colors ${i === activeIndex ? 'bg-primary-dim' : 'bg-surface-mid'}`} 
                    />
                ))}
            </div>
        </section>
    );
};

export default ImplementationDesigns;
