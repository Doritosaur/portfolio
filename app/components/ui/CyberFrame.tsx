"use client";

import React, { useRef } from "react";
import { animate } from "animejs";

interface CyberFrameProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    label?: string;
}

const CyberFrame: React.FC<CyberFrameProps> = ({ children, label, className, ...props }) => {
    const frameRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (!frameRef.current) return;
        
        // Animate corner accents
        animate(frameRef.current.querySelectorAll('.corner-accent'), {
            borderColor: ['rgba(255,255,255,0.5)', '#22d3ee', 'rgba(255,255,255,0.5)'],
            duration: 600,
            easing: 'easeInOutQuad'
        });

        // Glow pulse animation
        animate(frameRef.current, {
            boxShadow: [
                '0 0 0 rgba(34, 211, 238, 0)',
                '0 0 30px rgba(34, 211, 238, 0.15)',
                '0 0 0 rgba(34, 211, 238, 0)'
            ],
            duration: 1200,
            easing: 'easeInOutSine',
            loop: 2
        });
    };

    return (
        <div 
            ref={frameRef}
            onMouseEnter={handleMouseEnter}
            className={`relative border border-surface-mid bg-surface/40 backdrop-blur-sm p-4 
                transition-all duration-300 hover:border-primary/50
                ${className}`} 
            {...props}
        >
            {/* Notched Corners with cyan accent */}
            <div className="corner-accent absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-white/50 transition-colors" />
            <div className="corner-accent absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-white/50 transition-colors" />
            <div className="corner-accent absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-white/50 transition-colors" />
            <div className="corner-accent absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-white/50 transition-colors" />

            {/* Label */}
            {label && (
                <div className="absolute -top-3 left-6 bg-base px-2 text-[10px] text-text-dim tracking-widest uppercase border border-surface-mid transition-colors hover:text-primary/70">
                    {label}
                </div>
            )}

            {children}
        </div>
    );
};

export default CyberFrame;
