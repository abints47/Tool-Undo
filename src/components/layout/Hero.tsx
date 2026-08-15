import React from "react";

interface HeroProps {
  onExploreClick?: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle warm gradient background */}
      <div className="absolute inset-0 bg-linear-to-b from-cream via-warm-100/40 to-cream pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop pt-20 pb-24 md:pt-32 md:pb-40">
        <div className="flex flex-col items-center text-center animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-warm-white text-sm font-medium text-red-800 mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 text-accent rounded-full bg-accent animate-pulse" />
            🔧 സംഗതി കൊള്ളാം, പണി പാളരുത്!
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-ink leading-[1.08] max-w-4xl">
            Build faster with{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-accent-light">
              ToolUndo
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base md:text-lg text-ink-muted leading-relaxed max-w-5xl">
            വല്യ കാര്യത്തിൽ പണിതുണ്ടാക്കിയതാ! Premium browser-based utilities <br/>
            compress images, generate QR codes, design gradient meshes.
            Zero server, zero data sharing.<br/> ചുമ്മാ ഉപയോഗിക്കാം മച്ചാനേ!
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={onExploreClick}
              className="bg-accent hover:bg-accent-hover text-white px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-200 hover:shadow-lg hover:shadow-accent/15 active:scale-[0.98]"
            >
              Checkout The Tools →
            </button>
            <a
              href="https://github.com/abints47"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border hover:border-warm-300 bg-warm-white hover:bg-warm-50 text-ink-muted px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-200"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-16 md:mt-24 rounded-2xl overflow-hidden border border-border shadow-2xl shadow-ink/5 mx-auto max-w-5xl animate-fade-in">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero_neon_glow.png"
              alt="ToolUndo Preview"
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-cream/50 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
