"use client";

import React, { useState, useRef } from "react";
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import Footer from "../components/layout/Footer";
import Faq from "../components/layout/Faq";
import Testimonials from "../components/layout/Testimonials";
import TechStack from "../components/layout/TechStack";
import ImageToWebp from "../components/tools/ImageToWebp";
import QrGenerator from "../components/tools/QrGenerator";
import GradientMesh from "../components/tools/GradientMesh";
import SuggestTool from "../components/tools/SuggestTool";

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
const TOOLS = [
  { id: "image-to-webp", icon: "image", title: "Image → WebP (സൈസ് കുറയ്ക്കൽ)", desc: "ചിത്രങ്ങളുടെ വലിപ്പം ചെറുതാക്കി തരും. സംഗതി ഫാസ്റ്റാണ് മച്ചാനേ!" },
  { id: "qr-generator", icon: "qr_code_2", title: "QR Generator (ക്യു.ആർ ഉണ്ടാക്കി)", desc: "ലിങ്ക് കൊടുക്കൂ, വെറൈറ്റി കളറിൽ QR കോഡ് വാങ്ങിക്കോളൂ!" },
  { id: "gradient-mesh", icon: "gradient", title: "CSS Gradient (കളർ പൂരം)", desc: "കളറുകൾ മിക്സ് ചെയ്ത് അടിപൊളി മെഷ് ഗ്രേഡിയന്റ് ഉണ്ടാക്കാം." },
] as const;

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
  { icon: "shield", title: "100% Client-Side", titleMl: "ബ്രൗസറിൽ മാത്രം!", desc: "നിന്റെ ഡാറ്റ ഞങ്ങൾ കാണുകയുമില്ല. ഫുൾ സെക്യൂർ ആണ് ജി!" },
  { icon: "bolt", title: "Lightning Fast", titleMl: "ഇടിമിന്നൽ സ്പീഡ്", desc: "നെറ്റ്‌വർക്ക് ഡിലേ ഇല്ല. ക്ലിക്ക് ചെയ്യുന്ന വേഗത്തിൽ കഴിഞ്ഞിരിക്കും!" },
  { icon: "lock", title: "Zero Data Sharing", titleMl: "ഡാറ്റ ചോരില്ല", desc: "ഫയലുകൾ ഒരിടത്തും അപ്‌ലോഡ് ചെയ്യുന്നില്ല. നിന്റെ സിസ്റ്റത്തിൽ മാത്രം!" },
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavClick={handleNav} activeSection={activeSection} />
      <Hero onExploreClick={() => scrollTo(toolsRef)} />

      <main className="grow">
        {/* ════════ TOOLS ════════ */}
        <section ref={toolsRef} className="scroll-mt-24 max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop py-section">
          {activeTool ? (
            <div>
              <button
                onClick={() => setActiveTool(null)}
                className="flex items-center gap-1 text-sm text-ink-muted hover:text-accent font-medium mb-8 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {TOOLS.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => { setActiveTool(t.id); scrollTo(toolsRef); }}
                    className="group bg-warm-white border border-border rounded-2xl p-6 cursor-pointer card-lift"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent-bg flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-xl">{t.icon}</span>
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-ink group-hover:text-accent transition-colors">{t.title}</h3>
                    <p className="mt-2 text-sm text-ink-faint leading-relaxed">{t.desc}</p>
                  </div>
                ))}
                {/* Suggest card */}
                <div
                  onClick={() => setIsSuggestOpen(true)}
                  className="group bg-warm-50 border border-dashed border-warm-300 rounded-2xl p-6 cursor-pointer card-lift flex flex-col items-center justify-center text-center"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-ink-faint/30 flex items-center justify-center text-ink-faint group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all">
                    <span className="material-symbols-outlined text-xl">add</span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-ink">Suggest a Tool</h3>
                  <p className="mt-1 text-sm text-ink-faint">നിനക്ക് ഒരു ഐഡിയ ഉണ്ടോ?</p>
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
              <div key={i} className={`grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
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

        {/* ════════ KEY FEATURES GRID ════════ */}
        <section className="max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop py-section">
          <SectionLabel label="എന്തുകൊണ്ട്?" heading="Why ToolUndo?" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {KEY_FEATURES.map((f, i) => (
              <div key={i} className="bg-warm-white border border-border rounded-2xl p-8 card-lift">
                <div className="w-12 h-12 rounded-xl bg-accent-bg flex items-center justify-center text-accent">
                  <span className="material-symbols-outlined text-2xl">{f.icon}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">{f.title}</h3>
                <span className="text-xs text-accent font-medium">{f.titleMl}</span>
                <p className="mt-3 text-sm text-ink-faint leading-relaxed">{f.desc}</p>
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

        {/* ════════ TECH STACK ════════ */}
        <section className="py-section">
          <TechStack />
        </section>

        <Divider />

        {/* ════════ FAQ ════════ */}
        <section className="py-section">
          <Faq />
        </section>

        <Divider />

        {/* ════════ ABOUT ════════ */}
        <section ref={aboutRef} className="scroll-mt-24 max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-section text-center">
          <SectionLabel label="ഒരു ചെറിയ വർത്തമാനം" heading="About ToolUndo" />
          <p className="text-base text-ink-muted leading-relaxed max-w-2xl mx-auto">
            ഡെവലപ്പർമാരുടെയും സാധാരണക്കാരുടെയും ദൈനംദിന ജോലികൾ എളുപ്പമാക്കുക എന്ന ലക്ഷ്യത്തോടെ ഉണ്ടാക്കിയ ചെറിയൊരു ഉദ്യമം.
            അനാവശ്യ ഭാരമുള്ള ആപ്പുകൾ മാറ്റി, സിമ്പിളായി Undo ചെയ്ത് പണിയെടുക്കാം!
          </p>
          <p className="mt-4 text-base text-ink-muted leading-relaxed max-w-2xl mx-auto">
            Next.js, Tailwind CSS, TypeScript — all running inside your browser. കട്ട സപ്പോർട്ട് പ്രതീക്ഷിക്കുന്നു!
          </p>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { num: "3+", label: "Tools", ml: "ടൂളുകൾ" },
              { num: "0ms", label: "Server", ml: "സർവർ ചില്ലിംഗ്" },
              { num: "100%", label: "Private", ml: "സുരക്ഷിതം" },
            ].map((s, i) => (
              <div key={i} className="bg-warm-white border border-border rounded-2xl p-5">
                <div className="text-2xl md:text-3xl font-extrabold text-ink">{s.num}</div>
                <div className="text-sm font-medium text-ink-muted mt-1">{s.label}</div>
                <div className="text-[11px] text-accent font-medium mt-0.5">{s.ml}</div>
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
              ടൂളുകൾ നോക്കാം →
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <SuggestTool isOpen={isSuggestOpen} onClose={() => setIsSuggestOpen(false)} />
    </div>
  );
}
