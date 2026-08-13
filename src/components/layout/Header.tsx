"use client";

import { useState } from "react";

interface HeaderProps {
  onNavClick?: (section: string) => void;
  activeSection?: string;
}

const navItems = [
  { label: "Tools", id: "tools" },
  { label: "Features", id: "features" },
  { label: "About", id: "about" },
];

export default function Header({ onNavClick, activeSection }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavClick?.(id);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-[var(--spacing-margin-mobile)] md:px-[var(--spacing-margin-desktop)]">
        {/* Logo */}
        <span className="text-lg font-bold tracking-tight text-white">
          ToolUndo
        </span>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm transition-colors duration-200 ${
                activeSection === item.id
                  ? "font-medium text-white"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <button className="hidden rounded-lg bg-violet-600 px-4 py-1.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-violet-500 md:inline-flex">
          Get Started
        </button>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center justify-center text-neutral-400 transition-colors hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-[24px]">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="animate-fade-in border-t border-white/[0.06] bg-black/95 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 p-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`rounded-lg px-4 py-2.5 text-left text-sm transition-colors duration-200 ${
                  activeSection === item.id
                    ? "font-medium text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button className="mt-2 w-full rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-violet-500">
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
