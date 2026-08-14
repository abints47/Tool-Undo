"use client";

import React, { useState, useRef } from "react";
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import Footer from "../components/layout/Footer";
import Faq from "../components/layout/Faq";
import Testimonials from "../components/layout/Testimonials";
import ImageToWebp from "../components/tools/ImageToWebp";
import QrGenerator from "../components/tools/QrGenerator";
import GradientMesh from "../components/tools/GradientMesh";
import SuggestTool from "../components/tools/SuggestTool";

/* ── Tool interface definition ── */
interface ToolItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

/* ── Tiny section divider ── */
const Divider = () => (
  <div className="max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop">
    <div className="h-px bg-border" />
  </div>
);

/* ── Section label ── */
const SectionLabel = ({ label, heading, sub }: { label: string; heading: string; sub?: string }) => (
  <div className="mb-14">
    <span className="text-xs font-semibold uppercase tracking-widest text-accent">{label}</span>
    <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-ink">{heading}</h2>
    {sub && <p className="mt-3 text-base text-ink-muted max-w-xl">{sub}</p>}
  </div>
);

/* ── Tool cards data ── */
const TOOLS: ToolItem[] = [
  { 
    id: "image-to-webp", 
    icon: "image", 
    title: "Image → WebP", 
    desc: "Shrink image sizes instantly. Fast and smooth!" 
  },
  { 
    id: "qr-generator", 
    icon: "qr_code_2", 
    title: "QR Generator", 
    desc: "Enter a link and get your custom QR code instantly!" 
  },
  { 
    id: "gradient-mesh", 
    icon: "gradient", 
    title: "CSS Gradient", 
    desc: "Mix colors to create stunning mesh gradients easily." 
  },
];

/* ── Feature showcase rows data ── */
const FEATURES_ROWS = [
  {
    img: "/feature_image_compression.png",
    label: "⚙️ Compression",
    title: "ചിത്രങ്ങളുടെ ഗുണമേന്മ നഷ്ടപ്പെടാതെ സൈസ് കുറയ്ക്കാം",
    desc: "ഇമേജ് ഫയൽ സൈസ് WebP ഫോർമാറ്റിലേക്ക് മാറ്റാം. ഒറിജിനൽ vs WebP വ്യത്യാസം ലൈവായി കണ്ടറിയാം.",
    checks: ["Client-side Canvas API", "Quality slider (5–100%)", "Instant download"],
  },
  {
    img: "/feature_qr_scan.png",
    label: "🔗 QR Codes",
    title: "എന്തും സ്കാൻ ചെയ്യാൻ പാകത്തിൽ മാറ്റൂ",
    desc: "കസ്റ്റം കളറുകളിലും ഡിസൈനുകളിലും QR കോഡുകൾ തയ്യാറാക്കാം. ഡാറ്റ ചോരില്ല എന്ന് ഉറപ്പ്!",
    checks: ["Custom foreground/background", "4 error correction levels", "PNG + clipboard export"],
  },
  {
    img: "/feature_gradient_mesh.png",
    label: "🎨 Gradients",
    title: "അടിപൊളി CSS മെഷ് ഗ്രേഡിയന്റ് ഡിസൈൻ ചെയ്യാം",
    desc: "കാൻവാസിൽ കളർ പോയിന്റുകൾ ഡ്രാഗ് ചെയ്ത് ബ്യൂട്ടിഫുൾ ബാക്ക്‌ഗ്രൗണ്ട് ഉണ്ടാക്കാം.",
    checks: ["Drag-to-position nodes", "Up to 10 color stops", "One-click CSS copy"],
  },
];

/* ── Key features data ── */
const KEY_FEATURES = [
  { 
    title: "100% Client-Side", 
    titleMl: "Browser Only!", 
    desc: "We never see your data. Completely secure, G!",
    svg: (
      <svg className="w-6 h-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  },
  { 
    title: "Lightning Fast", 
    titleMl: "Instant Speed!", 
    desc: "Zero network delays. Finished the very second you click!",
    svg: (
      <svg className="w-6 h-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  { 
    title: "Zero Data Sharing", 
    titleMl: "No Data Leaks!", 
    desc: "Files are never uploaded anywhere. Stays on your system only!",
    svg: (
      <svg className="w-6 h-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("tools");
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);

  const toolsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNav = (s: string) => {
    setActiveSection(s);
    if (s === "home") { window.scrollTo({ top: 0, behavior: "smooth" }); setActiveTool(null); }
    else if (s === "tools") scrollTo(toolsRef);
    else if (s === "features") scrollTo(featuresRef);
    else if (s === "about") scrollTo(aboutRef);
  };

  // Custom SVG renderer helper
  const renderToolSvg = (id: string) => {
    switch (id) {
      case "image-to-webp":
        return (
          <svg className="w-7 h-7 transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
            <polyline points="21 15 16 10 5 21" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case "qr-generator":
        return (
          <svg className="w-7 h-7 transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 14h3v3h-3zM17 17h4v4h-4zM14 21h3v-1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case "gradient-mesh":
        return (
          <svg className="w-7 h-7 transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12h20" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return (
          <svg className="w-7 h-7 transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavClick={handleNav} activeSection={activeSection} />
      <Hero onExploreClick={() => scrollTo(toolsRef)} />

      <main className="grow">
        <section ref={toolsRef} className="scroll-mt-24 max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop py-section">
          {activeTool ? (
            <div>
              <button
                onClick={() => setActiveTool(null)}
                className="flex items-center gap-2 text-lg text-ink-muted hover:text-accent font-semibold mb-8 transition-colors"
              >
                <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                തിരികെ പോവാം (Back)
              </button>
              <div className="animate-scale-in">
                {activeTool === "image-to-webp" && <ImageToWebp />}
                {activeTool === "qr-generator" && <QrGenerator />}
                {activeTool === "gradient-mesh" && <GradientMesh />}
              </div>
            </div>
          ) : (
            <>
              <SectionLabel
                label="ടൂൾ ബോക്സ്"
                heading="Toolbox"
                sub="ചുമ്മാ സീൻ ഇല്ലാതെ ഉപയോഗിക്കാം. Everything runs in your browser."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {TOOLS.map((t) => (
                  <div
                    key={t.id || t.title}
                    onClick={() => { if (t.id) { setActiveTool(t.id); scrollTo(toolsRef); } }}
                    className="group relative bg-warm-white/95 backdrop-blur-sm border border-border/80 rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-accent/40 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-accent-bg/80 border border-accent/20 flex items-center justify-center text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-warm-white group-hover:shadow-lg group-hover:shadow-accent/25">
                        {renderToolSvg(t.id)}
                      </div>
                      <h3 className="mt-6 text-2xl font-extrabold text-ink tracking-tight group-hover:text-accent transition-colors">{t.title}</h3>
                      <p className="mt-3 text-lg text-ink-faint leading-relaxed">{t.desc}</p>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-b-3xl" />
                  </div>
                ))}

                {/* Suggest card */}
                <div
                  onClick={() => setIsSuggestOpen(true)}
                  className="group relative bg-warm-50/90 backdrop-blur-sm border-2 border-dashed border-warm-300 rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-accent flex flex-col items-center justify-center text-center"
                >
                  <div className="w-14 h-14 rounded-full border-2 border-ink-faint/30 flex items-center justify-center text-ink-faint group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all shadow-sm">
                    <svg className="w-7 h-7 transition-transform duration-500 group-hover:rotate-90" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-2xl font-extrabold text-ink tracking-tight group-hover:text-accent transition-colors">Suggest a Tool</h3>
                  <p className="mt-3 text-lg text-ink-faint">നിനക്ക് ഒരു ഐഡിയ ഉണ്ടോ?</p>
                </div>
              </div>
            </>
          )}
        </section>

        <Divider />

        {/* ════════ FEATURE SHOWCASE ════════ */}
        <section ref={featuresRef} className="scroll-mt-24 max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop py-section">
          <SectionLabel
            label="പ്രത്യേകതകൾ"
            heading="Feature Showcase"
            sub="Each tool is designed to be fast, beautiful, and completely private."
          />

          <div className="flex flex-col gap-24 md:gap-32">
            {FEATURES_ROWS.map((f, i) => (
              <div key={i} className={`grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                {/* Image */}
                <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-last" : ""}`}>
                  <div className="rounded-2xl overflow-hidden border border-border shadow-lg bg-warm-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.img} alt={f.title} className="w-full aspect-square object-cover" />
                  </div>
                </div>
                {/* Content */}
                <div className={`lg:col-span-7 space-y-5 ${i % 2 === 1 ? "lg:order-first" : ""}`}>
                  <span className="inline-flex px-3 py-1 rounded-full border border-border bg-warm-white text-xs font-medium text-ink-muted">
                    {f.label}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">{f.title}</h3>
                  <p className="text-base text-ink-muted leading-relaxed">{f.desc}</p>
                  <ul className="space-y-2.5 pt-2">
                    {f.checks.map((c, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-sm text-ink-muted">
                        <span className="material-symbols-outlined text-accent text-[18px]">check_circle</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        <section className="max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop py-section bg-linear-to-b from-warm-white/50 to-accent-bg/20">
          <SectionLabel label="എന്തുകൊണ്ട്?" heading="Why ToolUndo?" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {KEY_FEATURES.map((f, i) => (
              <div 
                key={i} 
                className="group relative bg-warm-white/80 backdrop-blur-sm border border-border/60 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-accent/40"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent-bg/80 border border-accent/20 flex items-center justify-center text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-warm-white group-hover:shadow-lg group-hover:shadow-accent/25">
                  {f.svg}
                </div>
                <h3 className="mt-6 text-xl font-extrabold text-ink tracking-tight">{f.title}</h3>
                <span className="inline-block mt-1 text-xs text-accent font-semibold tracking-wide uppercase">{f.titleMl}</span>
                <p className="mt-3 text-sm text-ink-light leading-relaxed">{f.desc}</p>
                
                <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-b-3xl" />
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ════════ TESTIMONIALS ════════ */}
        <section className="py-section">
          <Testimonials />
        </section>

        <Divider />

        {/* ════════ FAQ ════════ */}
        <section className="py-section">
          <Faq />
        </section>

        <Divider />

        {/* ════════ ABOUT ════════ */}
        <section ref={aboutRef} className="scroll-mt-24 max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-section text-center">
          <h2 className="text-ink-light font-semibold text-5xl pb-8 tracking-tight"> About ToolUndo </h2>
          
          <div className="space-y-4 max-w-6xl mx-auto text-base text-ink-muted leading-relaxed">
            <p>
              A small initiative created with the goal of making daily tasks easier for developers and everyday users alike.
              Swap out heavy, bloated apps and get things done simply with a quick undo!
            </p>
            
            <p>
              Next.js, Tailwind CSS, TypeScript — all running inside your browser. Your support means everything!
            </p>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { num: "3+", label: "Features" },
              { num: "Fast", label: "Performance" },
              { num: "100%", label: "Private" },
            ].map((s, i) => (
              <div 
                key={i} 
                className="bg-warm-white border border-border rounded-3xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-ink">{s.num}</div>
                <div className="text-sm font-medium text-ink-muted mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ════════ CTA BANNER ════════ */}
        <section className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-section text-center">
          <div className="rounded-3xl bg-linear-to-br from-warm-100 via-accent-bg/60 to-warm-100 border border-border p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight">
              Ready to get started?
            </h2>
            <p className="mt-3 text-base text-ink-muted">തുടങ്ങാം? Open a tool and start building — zero sign-up required.</p>
            <button
              onClick={() => scrollTo(toolsRef)}
              className="mt-8 bg-accent hover:bg-accent-hover text-white px-10 py-3.5 rounded-full font-semibold text-base transition-all hover:shadow-lg hover:shadow-accent/15 active:scale-[0.98]"
            >
              Tools →
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <SuggestTool isOpen={isSuggestOpen} onClose={() => setIsSuggestOpen(false)} />
    </div>
  );
}