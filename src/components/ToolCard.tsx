"use client";

import React from "react";
import Link from "next/link";
import { LucideIcon, ArrowUpRight } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  gradient?: string;
}

export default function ToolCard({
  title,
  description,
  href,
  icon: Icon,
  gradient = "from-violet-500 to-purple-600",
}: ToolCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <div className="card flex h-full flex-col gap-5 p-7">
        <div className="flex items-start justify-between">
          <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-md transition-transform duration-300 group-hover:scale-110`}>
            <Icon size={26} />
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-faint transition-all duration-300 group-hover:border-brand-400 group-hover:bg-brand-soft group-hover:text-brand-600">
            <ArrowUpRight size={18} />
          </span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-ink transition-colors group-hover:text-brand-600">
            {title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{description}</p>
        </div>
      </div>
    </Link>
  );
}
