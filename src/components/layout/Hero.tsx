import React from "react";

interface HeroProps {
  onExploreClick?: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-warm-50 py-20 md:py-32">
      {/* Richer warm distinct gradient background for the hero section */}
      <div className="absolute inset-0 bg-linear-to-b from-warm-100/70 via-warm-50 to-warm-100/40 pointer-events-none" />

      {/* Floating Animated Background SVGs (Tools Theme) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        {/* Floating Code Icon */}
        <div className="absolute top-16 left-[10%] animate-[bounce_6s_infinite] text-accent">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
        </div>

        {/* Floating Image/Canvas Icon */}
        <div className="absolute top-28 right-[12%] animate-[pulse_4s_infinite] text-accent-light">
          <svg className="w-14 h-14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>

        {/* Floating QR / Grid Icon */}
        <div className="absolute bottom-20 left-[15%] animate-[bounce_8s_infinite] text-ink-muted">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" />
          </svg>
        </div>

        {/* Floating Gear / Settings Icon */}
        <div className="absolute bottom-32 right-[18%] animate-[spin_12s_linear_infinite] text-accent">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a6.932 6.932 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.332.183-.582.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop pt-10 pb-16">
        <div className="flex flex-col items-center text-center animate-slide-up z-10 relative">
          
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

        {/* Dynamic Animated Tool Showcase / Overlay Card Grid */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in z-10 relative">
          <div className="p-6 rounded-2xl border border-border bg-warm-white/80 backdrop-blur-md shadow-xl shadow-ink/5 hover:border-accent/40 transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-ink text-lg mb-1">Image Tools</h3>
            <p className="text-sm text-ink-muted">Lightning fast compression & conversions right in your tab.</p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-warm-white/80 backdrop-blur-md shadow-xl shadow-ink/5 hover:border-accent/40 transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className="font-bold text-ink text-lg mb-1">QR Generators</h3>
            <p className="text-sm text-ink-muted">Generate customizable QR codes securely without any tracking.</p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-warm-white/80 backdrop-blur-md shadow-xl shadow-ink/5 hover:border-accent/40 transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-ink text-lg mb-1">100% Client-Side</h3>
            <p className="text-sm text-ink-muted">Zero servers, absolute privacy, and works completely offline.</p>
          </div>
        </div>

      </div>
    </section>
  );
}