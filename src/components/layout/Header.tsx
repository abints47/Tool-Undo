"use client";

import React, { useState, useEffect } from "react";
import Image from 'next/image';

interface HeaderProps {
  onNavClick?: (section: string) => void;
  activeSection?: string;
}

export default function Header({ onNavClick, activeSection = "tools" }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar if near the top of the page
      if (currentScrollY < 10) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down -> hide navbar and close mobile menu
        setShowNavbar(false);
        setMobileOpen(false);
      } else {
        // Scrolling up -> show navbar
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Prevent body scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const nav = (s: string) => { onNavClick?.(s); setMobileOpen(false); };

  const linkClass = (s: string) =>
    `text-sm transition-colors duration-200 ${
      activeSection === s
        ? "text-accent font-semibold"
        : "text-ink-muted hover:text-ink"
    }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-warm-50/90 backdrop-blur-xl border-b border-border shadow-xs w-full transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-6 md:px-12">
          {/* Logo */}
          <button onClick={() => nav("home")} className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink select-none cursor-pointer">
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
            <button onClick={() => nav("tools")} className={linkClass("tools") + " cursor-pointer"}>Tools</button>
            <button onClick={() => nav("features")} className={linkClass("features") + " cursor-pointer"}>Features</button>
            <button onClick={() => nav("blog")} className={linkClass("blog") + " cursor-pointer"}>Blog</button>
            <button onClick={() => nav("about")} className={linkClass("about") + " cursor-pointer"}>About</button>
          </nav>

          {/* Desktop CTA */}
          <button
            onClick={() => nav("tools")}
            className="hidden md:inline-flex text-sm font-medium bg-ink text-cream px-5 py-2 rounded-full hover:bg-ink-light transition-colors cursor-pointer"
          >
            Get Started
          </button>

          {/* Mobile toggle (Alternative modern asymmetric line menu icon) */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="md:hidden text-ink p-2 focus:outline-none cursor-pointer relative z-50"
            aria-label="Toggle Menu"
          >
            <div className="w-6 flex flex-col gap-1.5 items-start justify-center">
              <span className={`h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "w-full rotate-45 translate-y-2" : "w-full"}`} />
              <span className={`h-0.5 bg-current transition-opacity duration-300 ${mobileOpen ? "opacity-0" : "w-3/5"}`} />
              <span className={`h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "w-full -rotate-45 -translate-y-2" : "w-4/5"}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40 md:hidden transition-opacity animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Left-to-Right Sliding Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-72 bg-warm-50/98 backdrop-blur-2xl border-r border-border shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out flex flex-col justify-between p-6 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6">
          {/* Drawer Top / Logo inside drawer */}
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <button onClick={() => nav("home")} className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink select-none cursor-pointer">
              <Image 
                src="/icon.png" 
                alt="ToolUndo Logo" 
                width={24} 
                height={24} 
                className="object-contain" 
              />
              ToolUndo
            </button>
          </div>

          {/* Drawer Links */}
          <nav className="flex flex-col gap-4 mt-2">
            <button onClick={() => nav("tools")} className={`${linkClass("tools")} text-left text-base py-2 cursor-pointer`}>Tools</button>
            <button onClick={() => nav("features")} className={`${linkClass("features")} text-left text-base py-2 cursor-pointer`}>Features</button>
            <button onClick={() => nav("about")} className={`${linkClass("about")} text-left text-base py-2 cursor-pointer`}>About</button>
          </nav>
        </div>

        {/* Drawer Bottom CTA */}
        <div className="pt-4 border-t border-border">
          <button
            onClick={() => nav("tools")}
            className="w-full text-sm font-medium bg-ink text-cream py-3 rounded-full text-center cursor-pointer shadow-md hover:bg-ink-light transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}