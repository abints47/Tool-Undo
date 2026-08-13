import React from "react";
import Image from "next/image";

interface HeroProps {
  onExploreClick?: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* Subtle radial glow behind hero */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(139,92,246,0.12),transparent)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 md:px-10 md:py-40">
        <div className="flex flex-col items-center text-center">
          {/* Pill badge */}
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-neutral-400">
            🚀 സംഗതി കൊള്ളാം, പണി പാളരുത്!
          </span>

          {/* Main heading */}
          <h1 className="mt-8 text-5xl font-extrabold leading-[1.1] tracking-tight text-white md:text-7xl">
            Build faster with
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent">
              ToolUndo
            </span>
          </h1>

          {/* Subtext */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl">
            ബ്രൗസറിൽ തന്നെ ഓടുന്ന developer tools — no servers, no uploads, no drama.
            Image compression, QR codes, gradient meshes, എല്ലാം ഇവിടെ ഒരൊറ്റ ചെക്കിൽ.
            സെർവർ ഇല്ല, tension ഇല്ല. 🔥
          </p>

          {/* CTA row */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={onExploreClick}
              className="rounded-xl bg-violet-600 px-8 py-3 text-base font-semibold text-white transition-all hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-500/20 active:scale-[0.98]"
            >
              ടൂളുകൾ നോക്കാം →
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 bg-white/[0.05] px-8 py-3 text-base font-semibold text-neutral-300 transition-all hover:border-white/20 hover:bg-white/[0.08]"
            >
              GitHub
            </a>
          </div>

          {/* Hero image */}
          <div className="relative mt-16 w-full overflow-hidden rounded-2xl border border-white/[0.06] shadow-2xl shadow-violet-500/5">
            <Image
              src="/hero_neon_glow.png"
              alt="ToolUndo dashboard preview"
              width={1200}
              height={675}
              className="aspect-video w-full object-cover"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
