"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  onNavClick?: (section: string) => void;
  activeSection?: string;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export default function Header({ 
  onNavClick, 
  activeSection = "tools",
  darkMode = false,
  onToggleDarkMode 
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const pathname = usePathname();
  const isDocsPage = pathname?.startsWith("/docs");
  const isBlogPage = pathname?.startsWith("/blog");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
        setMobileOpen(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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

  const handleSectionClick = (section: string) => {
    setMobileOpen(false);
    if (isDocsPage || isBlogPage) {
      window.location.href = `/#${section}`;
    } else {
      onNavClick?.(section);
    }
  };

  const linkClass = (section: string) =>
    `text-sm transition-colors duration-200 ${
      (section === "docs" ? isDocsPage : section === "blog" ? isBlogPage : activeSection === section)
        ? "text-accent font-semibold"
        : darkMode 
          ? "text-[#A39E99] hover:text-[#EFECE6]" 
          : "text-ink-muted hover:text-ink"
    }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur-xl border-b shadow-xs w-full transition-transform duration-300 ${
          darkMode 
            ? "bg-[#121110]/90 border-[#262422] text-[#EFECE6]" 
            : "bg-warm-500/90 border-border text-ink"
        } ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-6 md:px-12">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center gap-2 text-lg font-bold tracking-tight select-none cursor-pointer ${
              darkMode ? "text-[#FAF9F5]" : "text-ink"
            }`}
          >
            <Image
              src="/icon.png"
              alt="ToolUndo Logo"
              width={24}
              height={24}
              className="object-contain"
            />
            ToolUndo
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleSectionClick("tools")}
              className={`${linkClass("tools")} cursor-pointer`}
            >
              Tools
            </button>
            <button
              onClick={() => handleSectionClick("features")}
              className={`${linkClass("features")} cursor-pointer`}
            >
              Features
            </button>
            <Link href="/docs" className={`${linkClass("docs")} cursor-pointer`}>
              Docs
            </Link>
            <button
              onClick={() => handleSectionClick("about")}
              className={`${linkClass("about")} cursor-pointer`}
            >
              About
            </button>
          </nav>

          {/* Desktop Right Actions (Dark Mode Toggle + CTA) */}
          <div className="hidden md:flex items-center gap-3">
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                className={`p-2 text-xs font-medium rounded-full shadow-xs cursor-pointer transition-colors ${
                  darkMode 
                    ? "bg-[#1E1C1A] text-amber-400 border border-[#2E2B28] hover:bg-[#282522]" 
                    : "bg-warm-200/70 text-slate-800 hover:bg-warm-200"
                }`}
                title="Toggle Theme"
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
            )}
            <button
              onClick={() => handleSectionClick("tools")}
              className={`text-sm font-medium px-5 py-2 rounded-full transition-colors cursor-pointer ${
                darkMode 
                  ? "bg-[#FAF9F5] text-[#121110] hover:bg-white" 
                  : "bg-ink text-cream hover:bg-ink-light"
              }`}
            >
              Get Started
            </button>
          </div>

          {/* Mobile toggle controls */}
          <div className="flex md:hidden items-center gap-2">
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                className={`p-1.5 text-xs rounded-full cursor-pointer ${
                  darkMode ? "bg-[#1E1C1A] text-amber-400 border border-[#2E2B28]" : "bg-warm-200 text-slate-800"
                }`}
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 focus:outline-none cursor-pointer relative z-50 ${darkMode ? "text-[#EFECE6]" : "text-ink"}`}
              aria-label="Toggle Menu"
            >
              <div className="w-6 flex flex-col gap-1.5 items-start justify-center">
                <span
                  className={`h-0.5 bg-current transition-all duration-300 ${
                    mobileOpen ? "w-full rotate-45 translate-y-2" : "w-full"
                  }`}
                />
                <span
                  className={`h-0.5 bg-current transition-opacity duration-300 ${
                    mobileOpen ? "opacity-0" : "w-3/5"
                  }`}
                />
                <span
                  className={`h-0.5 bg-current transition-all duration-300 ${
                    mobileOpen ? "w-full -rotate-45 -translate-y-2" : "w-4/5"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 md:hidden transition-opacity animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Left-to-Right Sliding Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 backdrop-blur-2xl border-r shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out flex flex-col justify-between p-6 ${
          darkMode 
            ? "bg-[#121110]/98 border-[#262422] text-[#EFECE6]" 
            : "bg-warm-50/98 border-border text-ink"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col gap-6">
          {/* Drawer Top / Logo inside drawer */}
          <div className={`flex items-center justify-between pb-4 border-b ${darkMode ? "border-[#262422]" : "border-border"}`}>
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 text-lg font-bold tracking-tight select-none cursor-pointer ${
                darkMode ? "text-[#FAF9F5]" : "text-ink"
              }`}
            >
              <Image
                src="/icon.png"
                alt="ToolUndo Logo"
                width={24}
                height={24}
                className="object-contain "
              />
              ToolUndo
            </Link>
          </div>

          {/* Drawer Links */}
          <nav className="flex flex-col gap-4 mt-2">
            <button
              onClick={() => handleSectionClick("tools")}
              className={`${linkClass("tools")} text-left text-base py-2 cursor-pointer`}
            >
              Tools
            </button>
            <button
              onClick={() => handleSectionClick("features")}
              className={`${linkClass("features")} text-left text-base py-2 cursor-pointer`}
            >
              Features
            </button>
            <Link
              href="/docs"
              onClick={() => setMobileOpen(false)}
              className={`${linkClass("docs")} text-left text-base py-2 cursor-pointer`}
            >
              Docs
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className={`${linkClass("blog")} text-left text-base py-2 cursor-pointer`}
            >
              Blog
            </Link>
            <button
              onClick={() => handleSectionClick("about")}
              className={`${linkClass("about")} text-left text-base py-2 cursor-pointer`}
            >
              About
            </button>
          </nav>
        </div>

        {/* Drawer Bottom CTA */}
        <div className={`pt-4 border-t ${darkMode ? "border-[#262422]" : "border-border"}`}>
          <button
            onClick={() => handleSectionClick("tools")}
            className={`w-full text-sm font-medium py-3 rounded-full text-center cursor-pointer shadow-md transition-colors ${
              darkMode 
                ? "bg-[#FAF9F5] text-[#121110] hover:bg-white" 
                : "bg-ink text-cream hover:bg-ink-light"
            }`}
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}