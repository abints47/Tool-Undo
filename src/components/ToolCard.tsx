"use client";

import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accentColor?: string;
}

export default function ToolCard({
  title,
  description,
  href,
  icon: Icon,
  accentColor = "from-accent to-accent-light",
}: ToolCardProps) {
  return (
    <Link 
      href={href} 
      className="group block h-full focus:outline-none focus:ring-4 focus:ring-accent/20 rounded-2xl"
    >
      <div className="premium-card glass-morphism rounded-2xl p-6 md:p-7 h-full flex flex-col gap-5 transition-all duration-300">
        <div className="flex items-start justify-between">
          <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${accentColor} text-white shadow-lg shadow-accent/25 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-accent/30`}>
            <Icon size={26} />
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-warm-white/80 text-ink-muted transition-all duration-300 group-hover:border-accent/50 group-hover:bg-accent-bg/50 group-hover:text-accent group-hover:scale-110">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-extrabold text-ink transition-colors group-hover:text-accent">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {description}
          </p>
        </div>
        {/* Bottom accent bar */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-b-2xl" />
      </div>
    </Link>
  );
}
