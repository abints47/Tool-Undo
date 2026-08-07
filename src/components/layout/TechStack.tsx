"use client";

import React from "react";

export default function TechStack() {
  const stack = [
    { name: "Next.js", desc: "React Framework", icon: "data_object" },
    { name: "Tailwind CSS v4", desc: "Styling Engine", icon: "css" },
    { name: "TypeScript", desc: "Type Safety", icon: "terminal" },
    { name: "Canvas API", desc: "Client Operations", icon: "draw" },
    { name: "WebP Engine", desc: "Compression Native", icon: "photo_size_select_large" },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto py-lg px-margin-mobile md:px-margin-desktop text-center">
      <div className="text-center space-y-2 mb-lg">
        <span className="text-xs font-label-caps uppercase tracking-widest text-primary font-bold">സാങ്കേതികവിദ്യ</span>
        <h2 className="font-headline-md text-headline-md text-on-surface">Powered by Modern Web</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-gutter">
        {stack.map((tech, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-surface-container-low border border-outline-variant/60 rounded-lg px-5 py-3 shadow-sm hover:bg-surface-container transition-all"
          >
            <span className="material-symbols-outlined text-primary text-xl">
              {tech.icon}
            </span>
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold text-on-surface leading-none">{tech.name}</span>
              <span className="text-[11px] text-secondary mt-1">{tech.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
