import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-warm-50/50">
      <div className="max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop py-16">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-lg font-bold text-ink tracking-tight">ToolUndo</span>
            <p className="text-sm text-ink-faint leading-relaxed max-w-xs">
              Browser-based tools, zero compromises.<br />
              നിന്റെ ഡാറ്റ, നിന്റെ കയ്യിൽ.
            </p>
          </div>

          {/* Product links */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Product</span>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-sm text-ink-muted hover:text-ink transition-colors">Tools</a>
              <a href="#" className="text-sm text-ink-muted hover:text-ink transition-colors">Features</a>
              <a href="#" className="text-sm text-ink-muted hover:text-ink transition-colors">Changelog</a>
            </nav>
          </div>

          {/* Company links */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Company</span>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-sm text-ink-muted hover:text-ink transition-colors">About</a>
              <a href="#" className="text-sm text-ink-muted hover:text-ink transition-colors">Privacy</a>
              <a href="#" className="text-sm text-ink-muted hover:text-ink transition-colors">Terms</a>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xs text-ink-faint">© {new Date().getFullYear()} ToolUndo. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-ink-faint hover:text-ink transition-colors flex items-center gap-1 text-xs">
              <span className="material-symbols-outlined text-[16px]">open_in_new</span> GitHub
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-ink-faint hover:text-ink transition-colors flex items-center gap-1 text-xs">
              <span className="material-symbols-outlined text-[16px]">chat</span> Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
