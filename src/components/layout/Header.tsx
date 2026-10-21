"use client";

import React, { useState, useEffect } from "react";
import Image from 'next/image';

interface HeaderProps {
  onNavClick?: (section: string) => void;
  activeSection?: string;
}

export default function Header({ onNavClick, activeSection = "tools" }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const nav = (s: string) => { onNavClick?.(s); setMobileOpen(false); };

  const linkClass = (s: string) =>
    `text-sm font-medium transition-all duration-200 relative ${
      activeSection === s
        ? "text-accent"
        : "text-ink-muted hover:text-ink"
    }`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-warm-white/90 backdrop-blur-2xl border-b border-border shadow-sm shadow-ink/5" 
          : "bg-cream/80 backdrop-blur-xl border-b border-border"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-margin-mobile md:px-margin-desktop">
        {/* Logo */}
        <button 
          onClick={() => nav("home")} 
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink select-none hover:opacity-80 transition-opacity"
          aria-label="ToolUndo Home"
        >
          <Image 
            src="/icon.png" 
            alt="ToolUndo Logo" 
            width={28} 
            height={28} 
            className="object-contain" 
          />
          <span className="premium-gradient-text">ToolUndo</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          <button 
            onClick={() => nav("tools")} 
            className={`${linkClass("tools")} px-2 py-1.5 rounded-lg hover:bg-accent-bg/50`}
            aria-current={activeSection === "tools" ? "page" : undefined}
          >
            Tools
            {activeSection === "tools" && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
            )}
          </button>
          <button 
            onClick={() => nav("features")} 
            className={`${linkClass("features")} px-2 py-1.5 rounded-lg hover:bg-accent-bg/50`}
            aria-current={activeSection === "features" ? "page" : undefined}
          >
            Features
            {activeSection === "features" && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
            )}
          </button>
          <button 
            onClick={() => nav("about")} 
            className={`${linkClass("about")} px-2 py-1.5 rounded-lg hover:bg-accent-bg/50`}
            aria-current={activeSection === "about" ? "page" : undefined}
          >
            About
            {activeSection === "about" && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
            )}
          </button>
        </nav>

        {/* Desktop CTA */}
        <button
          onClick={() => nav("tools")}
          className="hidden md:inline-flex items-center gap-2 text-sm font-semibold bg-accent text-white px-5 py-2.5 rounded-full hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25 transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-accent/30"
        >
          <span>Get Started</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        {/* Mobile toggle */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)} 
          className="md:hidden text-ink p-2 rounded-lg hover:bg-accent-bg/50 transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span className="material-symbols-outlined text-2xl">{mobileOpen ? "close" : "menu"}</span>
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-warm-white/95 backdrop-blur-2xl animate-scale-in shadow-lg">
          <nav className="flex flex-col p-5 gap-2" aria-label="Mobile navigation">
            <button 
              onClick={() => nav("tools")} 
              className={`${linkClass("tools")} text-left text-base px-4 py-3 rounded-xl hover:bg-accent-bg/50 font-medium`}
            >
              Tools
            </button>
            <button 
              onClick={() => nav("features")} 
              className={`${linkClass("features")} text-left text-base px-4 py-3 rounded-xl hover:bg-accent-bg/50 font-medium`}
            >
              Features
            </button>
            <button 
              onClick={() => nav("about")} 
              className={`${linkClass("about")} text-left text-base px-4 py-3 rounded-xl hover:bg-accent-bg/50 font-medium`}
            >
              About
            </button>
            <button
              onClick={() => nav("tools")}
              className="mt-3 text-sm font-semibold bg-accent text-white px-5 py-3 rounded-full text-center hover:bg-accent-hover transition-colors active:scale-[0.98]"
            >
              Get Started
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
