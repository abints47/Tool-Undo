"use client";

import React, { useState } from "react";

interface HeaderProps {
  onNavClick?: (section: string) => void;
  activeSection?: string;
}

export default function Header({ onNavClick, activeSection = "tools" }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (section: string) => {
    if (onNavClick) {
      onNavClick(section);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant bg-surface/80 backdrop-blur-md transition-all duration-200">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-margin-mobile md:px-margin-desktop">
        {/* Logo */}
        <div className="flex items-center gap-md">
          <a
            href="#"
            onClick={() => handleNavClick("home")}
            className="font-headline-sm text-headline-sm font-bold tracking-tight text-on-surface hover:text-primary transition-colors"
          >
            ToolUndo
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-gutter ml-lg">
            <button
              onClick={() => handleNavClick("tools")}
              className={`font-body-md text-body-md pb-1 border-b-2 transition-all duration-200 ${
                activeSection === "tools"
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-secondary hover:text-primary hover:border-outline-variant"
              }`}
            >
              Tools
            </button>
            <button
              onClick={() => handleNavClick("features")}
              className={`font-body-md text-body-md pb-1 border-b-2 transition-all duration-200 ${
                activeSection === "features"
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-secondary hover:text-primary hover:border-outline-variant"
              }`}
            >
              Features
            </button>
            <button
              onClick={() => handleNavClick("about")}
              className={`font-body-md text-body-md pb-1 border-b-2 transition-all duration-200 ${
                activeSection === "about"
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-secondary hover:text-primary hover:border-outline-variant"
              }`}
            >
              About
            </button>
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-md">
          <button className="font-label-caps text-label-caps text-secondary uppercase tracking-widest hover:text-primary transition-colors cursor-pointer">
            Sign In
          </button>
          <button
            onClick={() => handleNavClick("tools")}
            className="bg-primary-container text-white px-md py-sm rounded font-label-caps text-label-caps uppercase tracking-widest cursor-pointer hover:bg-primary transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
          >
            Get Started
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-on-surface p-1 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span className="material-symbols-outlined text-2xl">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-outline-variant bg-surface animate-scale-up">
          <nav className="flex flex-col px-margin-mobile py-4 gap-4">
            <button
              onClick={() => handleNavClick("tools")}
              className={`font-body-md text-body-md text-left py-2 border-b border-outline-variant/30 ${
                activeSection === "tools" ? "text-primary font-semibold" : "text-secondary"
              }`}
            >
              Tools
            </button>
            <button
              onClick={() => handleNavClick("features")}
              className={`font-body-md text-body-md text-left py-2 border-b border-outline-variant/30 ${
                activeSection === "features" ? "text-primary font-semibold" : "text-secondary"
              }`}
            >
              Features
            </button>
            <button
              onClick={() => handleNavClick("about")}
              className={`font-body-md text-body-md text-left py-2 border-b border-outline-variant/30 ${
                activeSection === "about" ? "text-primary font-semibold" : "text-secondary"
              }`}
            >
              About
            </button>
            <div className="flex flex-col gap-3 pt-2">
              <button className="w-full text-center font-label-caps text-label-caps text-secondary uppercase tracking-widest py-2 border border-outline rounded">
                Sign In
              </button>
              <button
                onClick={() => handleNavClick("tools")}
                className="w-full text-center bg-primary-container text-white px-md py-sm rounded font-label-caps text-label-caps uppercase tracking-widest"
              >
                Get Started
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
