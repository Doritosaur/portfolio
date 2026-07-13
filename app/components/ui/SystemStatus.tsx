"use client";

import React, { useState, useEffect, useRef } from "react";
import { animate } from "animejs";
import { useContentStore } from "../../store/contentStore";

const navItems = [
    { label: 'Work_Modules', id: 'work' },
    { label: 'Implementation_Designs', id: 'blueprints' },
    { label: 'Work_Experience', id: 'skills' },
    { label: 'Skills_Technology', id: 'arsenal' }
];

const SystemStatus: React.FC = () => {
    const { hero } = useContentStore(state => state);
    const [isOpen, setIsOpen] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const nameRef = useRef<HTMLDivElement>(null);


    const fullText = hero.name;

    // Typewriter effect for name
    useEffect(() => {
        let currentIndex = 0;
        setDisplayText('');
        
        const typeInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setDisplayText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typeInterval);
            }
        }, 80);

        return () => clearInterval(typeInterval);
    }, [fullText]);

    // Initial load animation
    useEffect(() => {
        animate('.system-status-panel', {
            opacity: [0, 1],
            translateX: [-30, 0],
            duration: 800,
            delay: 200,
            easing: 'easeOutExpo'
        });
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    const navItems = [
        { label: 'Work_Modules', id: 'work' },
        { label: 'Work_Designs', id: 'blueprints' },
        { label: 'Work_Experience', id: 'skills' },
        { label: 'Skills_Technology', id: 'arsenal' }
    ];

    return (
        <aside className="system-status-panel w-full lg:w-80 flex-shrink-0 flex flex-col gap-4 lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] z-50">

            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between p-3 border border-zinc-800 bg-zinc-950 glass-panel">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-surface border border-surface-up overflow-hidden relative grayscale">
                        <img src={hero.avatar} alt="Avatar" className="w-full h-full object-cover opacity-80" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-text-bright tracking-tighter uppercase leading-none mb-0.5">
                            {displayText}<span className="animate-pulse text-primary">_</span>
                        </div>
                        <div className="text-[9px] text-primary font-mono tracking-widest">
                            ● {hero.status}
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-3 py-1.5 border border-surface-up text-[10px] font-mono uppercase bg-surface text-text-muted hover:text-primary hover:border-primary transition-all"
                >
                    {isOpen ? 'CLOSE' : 'MENU'}
                </button>
            </div>

            {/* Main Content */}
            <div className={`${isOpen ? 'flex' : 'hidden'} lg:flex flex-col gap-4 w-full h-full transition-all duration-300`}>

                {/* Profile Card */}
                <div className="hidden lg:block border border-surface-up bg-surface p-5 relative overflow-hidden group glass-panel glow-hover">

                    <div className="flex justify-between items-start mb-4">
                        <div className="relative">
                            <div className="w-16 h-16 bg-surface border border-surface-up overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                    <img src={hero.avatar} alt="Avatar" className="w-full h-full object-cover opacity-90" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dim/40 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary" />
                            </div>
                        </div>
                        <div className="text-right">
                            <div ref={nameRef} className="text-xl font-bold text-text-bright tracking-tighter uppercase leading-none mb-1 typewriter-cursor">
                            {displayText}
                        </div>
                        <div className="text-[10px] text-primary font-mono tracking-widest animate-pulse">
                            ● {hero.status}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1 font-mono text-xs border-t border-surface-up pt-3">
                        <div className="h-1" />

                        <div className="flex justify-between">
                            <span className="text-text-dim">Role</span>
                            <span className="text-text-muted">{hero.role}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-text-dim">Location</span>
                            <span className="text-text-muted">{hero.location}</span>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="border border-zinc-800 bg-zinc-900/20 p-5 glass-panel">
                    <div className="text-[10px] text-zinc-600 font-mono mb-3 uppercase tracking-widest flex items-center gap-2">
                        <div className="w-1 h-1 bg-zinc-500 rounded-full animate-pulse" />
                        NAV_UPLINK
                    </div>
                    <div className="flex flex-col gap-1">
                        {navItems.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => scrollToSection(item.id)}
                                className="text-left text-xs font-mono text-text-muted hover:text-primary hover:bg-surface/50 py-1.5 px-2 border-l-2 border-transparent hover:border-primary transition-all flex justify-between group/nav"
                            >
                                <span>{item.label}</span>
                                <span className="opacity-0 group-hover/nav:opacity-100 transition-opacity">&gt;&gt;</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Resume Download */}
                <div className="flex-grow flex flex-col justify-end">
                    <div className="border border-zinc-800 bg-zinc-900/10 p-5 glass-panel">
                        <div className="text-[10px] text-zinc-600 font-mono mb-3 uppercase tracking-widest flex items-center gap-2">
                            <div className="w-1 h-1 bg-zinc-500 rounded-full animate-pulse" />
                            DATA_RETRIEVAL
                        </div>

                        <a
                            href={hero.resumeLink || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between w-full p-3 border border-surface-up hover:border-primary bg-surface hover:bg-primary/10 text-text-muted hover:text-primary transition-all group"
                        >
                            <div className="flex flex-col text-left">
                                <span className="text-xs font-bold font-mono">DOWNLOAD_RESUME</span>
                                <span className="text-[9px] text-text-faint group-hover:text-primary/70">.PDF // ENCRYPTED</span>
                            </div>
                            <span className="text-lg opacity-50 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all">↓</span>
                        </a>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SystemStatus;
