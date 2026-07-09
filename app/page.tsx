"use client";
import { useEffect, useRef } from "react";
import { animate } from "animejs";
import FeaturedWork from "./components/sections/FeaturedWork";
import ImplementationDesigns from "./components/sections/ImplementationDesigns";
import Footer from "./components/sections/Footer";
import SkillTree from "./components/sections/SkillTree";
import SystemArsenal from "./components/sections/SystemArsenal";
import SystemStatus from "./components/ui/SystemStatus";
import MasamuneFrame from "./components/ui/MasamuneFrame";

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Boot sequence - animate main container
    animate('main > div', {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      easing: 'easeOutExpo'
    });

    // Scroll-triggered reveals
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target, {
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 700,
            easing: 'easeOutCubic'
          });
          entry.target.classList.add('revealed');
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    // Observe all sections for reveal
    document.querySelectorAll('.reveal-section').forEach(el => {
      (el as HTMLElement).style.opacity = '0';
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <main className="min-h-screen p-4 md:p-8 text-zinc-300 relative bg-[#050505] selection:bg-[var(--terminal-green)] selection:text-black">

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-8 max-w-[1800px] mx-auto">

        <SystemStatus />

        <div className="flex-grow flex flex-col gap-16 min-w-0 pt-4">

          {/* Header */}
          <header className="flex justify-between items-end border-b-2 border-zinc-800 pb-2">
            <div>
              <div className="text-[10px] text-zinc-500 font-mono tracking-widest">
                PORTFOLIO_V1 // {new Date().getFullYear()}
              </div>
            </div>

            <nav className="flex gap-6 items-center pb-1">
              <a href="https://x.com/amanneox" target="_blank" rel="noopener noreferrer" className="group relative">
                <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img src="/icons/social_0.png" alt="X" className="relative w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
              </a>
              <a href="https://www.linkedin.com/in/aman-adhikari-0457504a/" target="_blank" rel="noopener noreferrer" className="group relative">
                <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img src="/icons/social_1.png" alt="GH" className="relative w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
              </a>
              <a href="https://github.com/Doritosaur" target="_blank" rel="noopener noreferrer" className="group relative">
                <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img src="/icons/social_2.png" alt="LI" className="relative w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
              </a>
            </nav>
          </header>

          {/* Projects Section - Full Width */}
          <section id="work" className="reveal-section">
            <FeaturedWork />
          </section>

          {/* Blueprints Section */}
          <section id="blueprints" className="reveal-section">
            <ImplementationDesigns />
          </section>

          {/* Experience Section */}
          <section id="skills" className="reveal-section">
            <MasamuneFrame title="CAREER_PATH // EXPERIENCE" serial="EXP-001" className="mb-0">
              <SkillTree />
            </MasamuneFrame>
          </section>

          {/* Skills Section */}
          <section id="arsenal" className="reveal-section">
            <SystemArsenal />
          </section>

          {/* Footer */}
          <div className="reveal-section">
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
