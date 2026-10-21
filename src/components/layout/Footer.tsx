"use client";

import Link from "next/link";
import Image from "next/image";
import scr from "@/app/icon.png";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border bg-linear-to-b from-warm-white via-warm-50/50 to-cream">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-accent/3 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-amber-500/3 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-20">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 items-start">
          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Image 
                src={scr}
                alt="ToolUndo Logo" 
                width={32} 
                height={32} 
                className="h-8 w-8 object-contain" 
              />
              <span className="text-xl font-extrabold tracking-tight text-ink premium-gradient-text">ToolUndo</span>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed max-w-5xl">
              Premium browser-based utilities crafted for developers. Zero server, zero data sharing, infinite speed.
            </p>
            
            {/* Social links in footer brand */}
            <div className="flex items-center gap-4 pt-2">
              <Link 
                href="https://github.com/abints47" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-ink-muted hover:text-accent transition-all duration-200 p-2 rounded-lg hover:bg-accent-bg/50"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </Link>
              <Link 
                href="https://discord.gg/veg7t9Kc5" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-ink-muted hover:text-accent transition-all duration-200 p-2 rounded-lg hover:bg-accent-bg/50"
                aria-label="Discord"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.011c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </Link>
              <a 
                href="mailto:hello@toolundo.app" 
                className="text-ink-muted hover:text-accent transition-all duration-200 p-2 rounded-lg hover:bg-accent-bg/50"
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>  

          {/* Product links */}
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-ink block pb-2">Product</span>
            <nav className="flex flex-col gap-2.5" aria-label="Product links">
              <Link href="#tools" className="text-sm text-ink-muted hover:text-accent transition-colors font-medium">Tools</Link>
              <Link href="#features" className="text-sm text-ink-muted hover:text-accent transition-colors font-medium">Features</Link>
              <Link href="#changelog" className="text-sm text-ink-muted hover:text-accent transition-colors font-medium">Changelog</Link>
              <Link href="#roadmap" className="text-sm text-ink-muted hover:text-accent transition-colors font-medium">Roadmap</Link>
            </nav>
          </div>

          {/* Company links */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-ink">Company</span>
              <button
                onClick={scrollToTop}
                className="text-ink-muted hover:text-ink border border-border/80 rounded-full px-3 py-1.5 hover:bg-warm-100/80 transition-all flex items-center gap-1.5 text-xs font-medium shadow-xs active:scale-95 cursor-pointer"
                aria-label="Back to top"
              >
                <span>Top</span>
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-2.5" aria-label="Company links">
              <Link href="#about" className="text-sm text-ink-muted hover:text-accent transition-colors font-medium">About</Link>
              <Link href="#privacy" className="text-sm text-ink-muted hover:text-accent transition-colors font-medium">Privacy</Link>
              <Link href="#terms" className="text-sm text-ink-muted hover:text-accent transition-colors font-medium">Terms</Link>
              <Link href="#contact" className="text-sm text-ink-muted hover:text-accent transition-colors font-medium">Contact</Link>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border/60 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-ink-faint">
            <span>© {new Date().getFullYear()} ToolUndo. All rights reserved.</span>
            <span className="hidden sm:inline w-px h-4 bg-border" />
            <span className="text-ink-muted">Built with Next.js, TypeScript & Tailwind CSS</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs text-ink-faint">
            <span>Made with</span>
            <svg className="w-4 h-4 text-red-500 fill-current animate-pulse inline-block" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>By Abin</span>
            <span className="mx-1 text-border">•</span>
            <span className="text-ink-muted font-medium">Open Source</span>
          </div>
        </div>
      </div>
    </footer>
  );
}