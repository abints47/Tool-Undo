import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant bg-surface mt-xl">
      <div className="mx-auto flex flex-col md:flex-row justify-between items-center py-xl px-margin-mobile md:px-margin-desktop max-w-7xl w-full gap-lg md:gap-0">
        <div className="flex items-center gap-sm">
          <span className="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight">
            ToolUndo
          </span>
          <span className="font-body-sm text-body-sm text-secondary">
            © {new Date().getFullYear()} ToolUndo. All rights reserved.
          </span>
        </div>
        <nav className="flex flex-wrap justify-center gap-lg">
          <a
            className="font-body-sm text-body-sm text-secondary hover:underline transition-all cursor-pointer"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="font-body-sm text-body-sm text-secondary hover:underline transition-all cursor-pointer"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="font-body-sm text-body-sm text-secondary hover:underline transition-all cursor-pointer flex items-center gap-xs"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
            <span className="material-symbols-outlined text-[16px]">
              open_in_new
            </span>
          </a>
          <a
            className="font-body-sm text-body-sm text-secondary hover:underline transition-all cursor-pointer flex items-center gap-xs"
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
            <span className="material-symbols-outlined text-[16px]">
              chat
            </span>
          </a>
        </nav>
      </div>
    </footer>
  );
}
