"use client";

import React, { useState, useRef } from "react";
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import Footer from "../components/layout/Footer";
import ImageToWebp from "../components/tools/ImageToWebp";
import QrGenerator from "../components/tools/QrGenerator";
import GradientMesh from "../components/tools/GradientMesh";
import SuggestTool from "../components/tools/SuggestTool";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("tools");
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isSuggestOpen, setIsSuggestOpen] = useState<boolean>(false);

  const toolsSectionRef = useRef<HTMLDivElement>(null);
  const featuresSectionRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveTool(null);
    } else if (section === "tools") {
      scrollToRef(toolsSectionRef);
    } else if (section === "features") {
      scrollToRef(featuresSectionRef);
    } else if (section === "about") {
      scrollToRef(aboutSectionRef);
    }
  };

  const handleSelectTool = (tool: string) => {
    setActiveTool(tool);
    scrollToRef(toolsSectionRef);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      {/* Header Navigation */}
      <Header onNavClick={handleNavClick} activeSection={activeSection} />

      {/* Hero Section */}
      <Hero onExploreClick={() => scrollToRef(toolsSectionRef)} />

      <main className="grow">
        {/* Toolbox Section */}
        <div ref={toolsSectionRef} className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl scroll-mt-20">
          {activeTool ? (
            // Tool View Container
            <div className="flex flex-col gap-md">
              <button
                onClick={() => setActiveTool(null)}
                className="flex items-center gap-xs text-secondary hover:text-primary font-semibold font-label-caps uppercase tracking-widest text-xs mb-md active:scale-95 transition-transform w-fit cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                തിരികെ പോവാം (Back to Toolbox)
              </button>

              <div className="animate-scale-up">
                {activeTool === "image-to-webp" && <ImageToWebp />}
                {activeTool === "qr-generator" && <QrGenerator />}
                {activeTool === "gradient-mesh" && <GradientMesh />}
              </div>
            </div>
          ) : (
            // Toolbox Main Grid List
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-lg">ടൂൾ ബോക്സ് (Toolbox)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
                {/* Tool Card 1: Image To WebP */}
                <div
                  onClick={() => handleSelectTool("image-to-webp")}
                  className="bg-surface swiss-border rounded p-md flex flex-col gap-md swiss-hover transition-colors group cursor-pointer h-full border hover:shadow-sm"
                >
                  <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center text-secondary group-hover:text-primary-container transition-colors shadow-inner">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
                      image
                    </span>
                  </div>
                  <div className="space-y-xs grow">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary-container transition-colors">
                      Image → WebP (സൈസ് കുറയ്ക്കൽ)
                    </h3>
                    <p className="font-body-sm text-body-sm text-secondary">
                      ചിത്രങ്ങളുടെ വലിപ്പം വലിച്ച് ഒട്ടിച്ച് ചെറുതാക്കി തരും. സംഗതി വെരി ഫാസ്റ്റാണ് മച്ചാനേ!
                    </p>
                  </div>
                </div>

                {/* Tool Card 2: QR Generator */}
                <div
                  onClick={() => handleSelectTool("qr-generator")}
                  className="bg-surface swiss-border rounded p-md flex flex-col gap-md swiss-hover transition-colors group cursor-pointer h-full border hover:shadow-sm"
                >
                  <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center text-secondary group-hover:text-primary-container transition-colors shadow-inner">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
                      qr_code_2
                    </span>
                  </div>
                  <div className="space-y-xs grow">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary-container transition-colors">
                      QR Generator (ക്യു.ആർ ഉണ്ടാക്കി)
                    </h3>
                    <p className="font-body-sm text-body-sm text-secondary">
                      ലിങ്കും പേരും കൊടുക്കൂ, വെറൈറ്റി കളറിൽ ക്യു.ആർ കോഡ് സ്കാൻ ചെയ്യാൻ പരുവത്തിൽ വാങ്ങിക്കോളൂ!
                    </p>
                  </div>
                </div>

                {/* Tool Card 3: Gradient Mesh */}
                <div
                  onClick={() => handleSelectTool("gradient-mesh")}
                  className="bg-surface swiss-border rounded p-md flex flex-col gap-md swiss-hover transition-colors group cursor-pointer h-full border hover:shadow-sm"
                >
                  <div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center text-secondary group-hover:text-primary-container transition-colors shadow-inner">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
                      gradient
                    </span>
                  </div>
                  <div className="space-y-xs grow">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary-container transition-colors">
                      CSS Gradient (കളർ പൂരം)
                    </h3>
                    <p className="font-body-sm text-body-sm text-secondary">
                      കളറുകൾ തമ്മിൽ മിക്സ് ചെയ്ത് അടിപൊളി മെഷ് ഗ്രേഡിയന്റ് ഉണ്ടാക്കി കോഡ് സുഖമായി കോപ്പി ചെയ്യാം.
                    </p>
                  </div>
                </div>

                {/* Suggest a Tool Card */}
                <div
                  onClick={() => setIsSuggestOpen(true)}
                  className="bg-surface-container-low/60 border border-dashed border-outline rounded p-md flex flex-col gap-md hover:border-primary-container transition-all group cursor-pointer h-full items-center justify-center text-center hover:bg-surface-container-low"
                >
                  <div className="w-12 h-12 rounded-full border border-secondary flex items-center justify-center text-secondary group-hover:bg-primary-container group-hover:text-white group-hover:border-primary-container transition-all shadow-sm">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
                      add
                    </span>
                  </div>
                  <div className="space-y-xs">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                      Suggest a Tool (അടുത്ത പണി)
                    </h3>
                    <p className="font-body-sm text-body-sm text-secondary">
                      നിനക്ക് പറ്റിയ പ്രത്യേക ടൂൾ വല്ലതും വേണോ? ഇവിടെ ഒന്നു പറഞ്ഞേക്കണേ മച്ചാനേ!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="h-px bg-outline-variant w-full"></div>
        </div>

        {/* Features Section */}
        <div ref={featuresSectionRef} className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl scroll-mt-20">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-lg">ഇതിലെ പ്രത്യേകതകൾ (Why Us?)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="flex flex-col gap-sm p-6 bg-surface-container-low rounded-lg border border-outline-variant/60">
              <span className="material-symbols-outlined text-3xl text-primary-container">shield</span>
              <h3 className="font-headline-sm text-[20px] font-bold text-on-surface">100% Client-Side (ബ്രൗസറിൽ മാത്രം!)</h3>
              <p className="font-body-sm text-secondary leading-relaxed">
                നിന്റെ ഡാറ്റ ഞങ്ങൾ കാണുകയുമില്ല, വേറെങ്ങും വിടുകയുമില്ല. ചിത്രങ്ങളും വിവരങ്ങളും നിന്റെ കമ്പ്യൂട്ടറിൽ മാത്രം പ്രോസസ്സ് ചെയ്യപ്പെടുന്നു. ഫുൾ സെക്യൂർ ആണ് ജി!
              </p>
            </div>
            <div className="flex flex-col gap-sm p-6 bg-surface-container-low rounded-lg border border-outline-variant/60">
              <span className="material-symbols-outlined text-3xl text-primary-container">bolt</span>
              <h3 className="font-headline-sm text-[20px] font-bold text-on-surface">Lightning Speed (ഇടിമിന്നൽ സ്പീഡ്)</h3>
              <p className="font-body-sm text-secondary leading-relaxed">
                നെറ്റ്‌വർക്ക് ഡിലേയോ ലോഡിങ് ബുദ്ധിമുട്ടോ ഒന്നും ഇല്ല. ക്ലിക്ക് ചെയ്യുന്ന വേഗത്തിൽ കൺവേർഷനും ഡൗൺലോഡും കഴിഞ്ഞിരിക്കും. ചുമ്മാ പവർ!
              </p>
            </div>
            <div className="flex flex-col gap-sm p-6 bg-surface-container-low rounded-lg border border-outline-variant/60">
              <span className="material-symbols-outlined text-3xl text-primary-container">palette</span>
              <h3 className="font-headline-sm text-[20px] font-bold text-on-surface">Modern Typography (ലുക്ക് കൊള്ളാം!)</h3>
              <p className="font-body-sm text-secondary leading-relaxed">
                കാണാൻ കടുപ്പമുള്ള അനാവശ്യ ഡിസൈനുകൾ ഒഴിവാക്കി, വൃത്തിയുള്ള പക്കാ ഇന്റർ (Inter) ഫോണ്ടിലാണ് ഇന്റർഫേസ് ഉണ്ടാക്കിയിരിക്കുന്നത്. പ്രൊഫഷണൽ വൈബ്!
              </p>
            </div>
          </div>

          {/* Detailed Image Feature Rows */}
          <div className="mt-20 flex flex-col gap-20">
            {/* Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono">
                  <span>⚙️ സൈസ് കുറയ്ക്കൽ (Compression Power)</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">ചിത്രങ്ങളുടെ ഗുണമേന്മ നഷ്ടപ്പെടാതെ സൈസ് കുറയ്ക്കാം</h3>
                <p className="font-body-md text-secondary leading-relaxed">
                  ഇന്റർനെറ്റിൽ ഫോട്ടോകൾ അപ്‌ലോഡ് ചെയ്യുമ്പോൾ സമയം പാഴാക്കേണ്ടതില്ല. ഞങ്ങളുടെ കൺവേർട്ടർ വഴി നിമിഷനേരം കൊണ്ട് ഇമേജ് ഫയൽ സൈസ് വെബ്പി (WebP) ഫോർമാറ്റിലേക്ക് മാറ്റാം. ഒറിജിനൽ പടവും വെബ്പി പടവും തമ്മിലുള്ള വലിപ്പ വ്യത്യാസം ലൈവായി തന്നെ കണ്ടറിയാം.
                </p>
              </div>
              <div className="lg:col-span-5 rounded-lg border border-outline overflow-hidden shadow-lg max-w-sm w-full mx-auto bg-surface-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/feature_image_compression.png" alt="Compression Illustration Art" className="w-full h-auto object-cover" />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 rounded-lg border border-outline overflow-hidden shadow-lg max-w-sm w-full mx-auto bg-surface-container order-last lg:order-first">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/feature_qr_scan.png" alt="QR Illustration Art" className="w-full h-auto object-cover" />
              </div>
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono">
                  <span>🔗 ക്യു.ആർ സുരക്ഷ (QR Security)</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">എന്തും സ്കാൻ ചെയ്യാൻ പാകത്തിൽ സുരക്ഷിതമായി മാറ്റൂ</h3>
                <p className="font-body-md text-secondary leading-relaxed">
                  കസ്റ്റം കളറുകളിലും ഡിസൈനുകളിലും ക്യു.ആർ കോഡുകൾ തയ്യാറാക്കി പിഡിഎഫുകളിലോ വെബ്സൈറ്റുകളിലോ ഉപയോഗിക്കാം. നിങ്ങളുടെ വിവരങ്ങൾ ഒരിടത്തും ചോരില്ല എന്ന് ഞങ്ങൾ ഉറപ്പുനൽകുന്നു!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="h-px bg-outline-variant w-full"></div>
        </div>

        {/* About Section */}
        <div ref={aboutSectionRef} className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl scroll-mt-20">
          <div className="bg-surface-container/30 border border-outline-variant rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-lg">
            <div className="flex-1 space-y-md">
              <h2 className="font-headline-md text-headline-md text-on-surface">About ToolUndo (ഒരു ചെറിയ വർത്തമാനം)</h2>
              <p className="font-body-md text-secondary leading-relaxed">
                ഡെവലപ്പർമാരുടെയും സാധാരണക്കാരുടെയും ദൈനംദിന ജോലികൾ എളുപ്പമാക്കുക എന്ന ലക്ഷ്യത്തോടെ പണിതെടുത്ത ചെറിയൊരു ഉദ്യമം. അനാവശ്യ ഭാരമുള്ള ആപ്പുകൾ മാറ്റി, എന്ത് കാര്യവും സിമ്പിളായി അൺഡോ (Undo) ചെയ്ത് പണിയെടുക്കാം!
              </p>
              <p className="font-body-md text-secondary leading-relaxed">
                Next.js-ലും Tailwind CSS-ലും നിർമ്മിച്ച ഇതിന്റെ എല്ലാ ടൂളുകളും ഇന്റർനെറ്റ് ഇല്ലാതെ വരെ പ്രവർത്തിക്കും (ബ്രൗസറിൽ ഓപ്പൺ ആണെങ്കിൽ). കട്ട സപ്പോർട്ട് പ്രതീക്ഷിക്കുന്നു!
              </p>
            </div>
            <div className="flex-1 w-full flex items-center justify-center">
              <div className="swiss-border bg-surface-container-low rounded-lg p-6 flex flex-col gap-4 shadow-sm w-full max-w-sm rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="flex justify-between items-center text-xs text-secondary font-mono border-b border-outline-variant/50 pb-2">
                  <span>SYSTEM METRICS</span>
                  <span className="text-green-500 font-bold">● ഓൺലൈൻ</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span>Server Overhead</span>
                    <span className="font-bold text-on-surface">0.00ms (സർവർ അണ്ണൻ ചില്ലിംഗ്!)</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span>Privacy Rating</span>
                    <span className="font-bold text-green-600">Grade A+ (സംശയം വേണ്ട!)</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span>Export Quality</span>
                    <span className="font-bold text-on-surface">Lossless (പക്കാ ഒറിജിനൽ!)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Suggest a Tool Dialog Modal */}
      <SuggestTool isOpen={isSuggestOpen} onClose={() => setIsSuggestOpen(false)} />
    </div>
  );
}
