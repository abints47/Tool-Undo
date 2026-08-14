"use client";

import React, { useState } from "react";
import Image from 'next/image';

interface HeaderProps {
  onNavClick?: (section: string) => void;
  activeSection?: string;
}

export default function Header({ onNavClick, activeSection = "tools" }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = (s: string) => { onNavClick?.(s); setMobileOpen(false); };

  const linkClass = (s: string) =>
    `text-sm transition-colors duration-200 ${
      activeSection === s
        ? "text-accent font-semibold"
        : "text-ink-muted hover:text-ink"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-margin-mobile md:px-margin-desktop">
        {/* Logo */}
        <button onClick={() => nav("home")} className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink select-none">
          <Image 
            src="/icon.png" 
            alt="ToolUndo Logo" 
            width={24} 
            height={24} 
            className="object-contain" 
          />
          ToolUndo
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => nav("tools")} className={linkClass("tools")}>Tools</button>
          <button onClick={() => nav("features")} className={linkClass("features")}>Features</button>
          <button onClick={() => nav("about")} className={linkClass("about")}>About</button>
        </nav>

        {/* Desktop CTA */}
        <button
          onClick={() => nav("tools")}
          className="hidden md:inline-flex text-sm font-medium bg-ink text-cream px-5 py-2 rounded-full hover:bg-ink-light transition-colors"
        >
          Get Started
        </button>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-ink p-1">
          <span className="material-symbols-outlined text-2xl">{mobileOpen ? "close" : "menu"}</span>
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-cream/95 backdrop-blur-xl animate-scale-in">
          <nav className="flex flex-col p-5 gap-4">
            <button onClick={() => nav("tools")} className={`${linkClass("tools")} text-left text-base`}>Tools</button>
            <button onClick={() => nav("features")} className={`${linkClass("features")} text-left text-base`}>Features</button>
            <button onClick={() => nav("about")} className={`${linkClass("about")} text-left text-base`}>About</button>
            <button
              onClick={() => nav("tools")}
              className="mt-2 text-sm font-medium bg-ink text-cream px-5 py-2.5 rounded-full text-center"
            >
              Get Started
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
