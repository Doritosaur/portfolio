import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="border-t border-surface-mid py-12 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-text-faint">
            <div className="mb-8 md:mb-0">
                <p>EST. 2026 // India</p>
                <p className="mt-2">DESIGNED BY Aman Adhikari</p>
            </div>
            <div className="flex gap-12">
                <div className="flex flex-col gap-4">
                    <span className="text-text-dim text-[10px] tracking-widest">CONNECT</span>
                    <div className="flex items-center gap-6">
                        <a href="https://x.com/amanneox" target="_blank" rel="noopener noreferrer" className="group relative">
                            <div className="absolute inset-0 bg-primary-dim/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <img src="/icons/social_0.png" alt="X Platform" className="relative w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                        </a>
                        <a href="https://www.linkedin.com/in/aman-adhikari-0457504a/" target="_blank" rel="noopener noreferrer" className="group relative">
                            <div className="absolute inset-0 bg-primary-dim/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <img src="/icons/social_1.png" alt="Github" className="relative w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                        </a>
                        <a href="https://github.com/Doritosaur" target="_blank" rel="noopener noreferrer" className="group relative">
                            <div className="absolute inset-0 bg-primary-dim/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <img src="/icons/social_2.png" alt="LinkedIn" className="relative w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                        </a>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <span className="text-text-dim text-[10px] tracking-widest">LEGAL</span>
                    <div className="flex flex-col gap-2 text-[10px] text-text-dim">
                        <a href="/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">MIT_LICENSE</a>
                        <a href="#" className="hover:text-primary transition-colors">PRIVACY_PROTOCOL</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
