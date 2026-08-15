"use client";

import Link from "next/link";
import Image from "next/image";
import scr from "@/app/icon.png";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-warm-100/50">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-10">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <Image 
                src={scr}
                alt="ToolUndo Logo" 
                width={24} 
                height={24} 
                className="h-6 w-6 object-contain" 
              />
              <span className="text-lg font-bold text-ink tracking-tight pb-2">ToolUndo</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed max-w-4xl">
              Browser-based tools, zero compromises. <br/>Your data, in your hands.
            </p>
          </div>  

          {/* Product links */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-700 block pb-3">
              Product
            </span>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-sm text-gray-700 hover:text-ink transition-colors">Tools</a>
              <a href="#" className="text-sm text-gray-700 hover:text-ink transition-colors">Features</a>
              <a href="#" className="text-sm text-gray-700 hover:text-ink transition-colors">Changelog</a>
            </nav>
          </div>

          {/* Company links with Back to Top on the right */}
          <div className="space-y-3 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Company
                </span>
                <button
                  onClick={scrollToTop}
                  className="text-ink-muted hover:text-ink border border-border/80 rounded-full px-2.5 py-1 hover:bg-warm-200/60 transition-all flex items-center gap-1.5 text-xs shadow-xs active:scale-95 cursor-pointer"
                  aria-label="Back to top"
                >
                  <span>Top</span>
                  <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col gap-2">
                <a href="#" className="text-sm text-gray-700 hover:text-ink transition-colors">About</a>
                <a href="#" className="text-sm text-gray-700 hover:text-ink transition-colors">Privacy</a>
                <a href="#" className="text-sm text-gray-700 hover:text-ink transition-colors">Terms</a>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xs text-ink-faint">© {new Date().getFullYear()} ToolUndo. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link 
              href="https://github.com/abints47" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-ink-faint hover:text-ink transition-colors flex items-center gap-1.5 text-xs"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </Link>

            <Link 
              href="https://discord.gg/veg7t9Kc5" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-ink-faint hover:text-ink transition-colors flex items-center gap-1.5 text-xs"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.011c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span>Discord</span>
            </Link>
          </div>
        </div>

        {/* Made with Love */}
        <div className="mt-8 flex items-center justify-center gap-1.5 text-xs text-ink-faint">
          <span>Made with</span>
          <svg className="w-3.5 h-3.5 text-red-500 fill-current animate-pulse inline-block" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span>for developers</span>
        </div>
      </div>
    </footer>
  );
}