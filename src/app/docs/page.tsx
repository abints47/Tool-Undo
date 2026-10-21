"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";

type DocSection = "introduction" | "getting-started" | "tools-overview" | "privacy-security" | "faq";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<DocSection>("introduction");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const sections = [
    { id: "introduction", title: "1. Introduction", category: "Overview" },
    { id: "getting-started", title: "2. Getting Started", category: "Overview" },
    { id: "tools-overview", title: "3. Tools Overview", category: "Features" },
    { id: "privacy-security", title: "4. Privacy & Security", category: "Architecture" },
    { id: "faq", title: "5. FAQ & Support", category: "Help" },
  ];

  return (
    <div className={`min-h-screen flex flex-col selection:bg-accent/20 selection:text-accent transition-colors duration-300 ${
      darkMode ? "bg-[#121110] text-[#EFECE6]" : "bg-warm-50 text-ink"
    }`}>
      {/* Navbar */}
      <Header activeSection="tools" />

      {/* Main Docs Layout - Full Width Stretch */}
      <div className="pt-24 pb-16 w-full px-4 md:px-8 lg:px-12 flex-1 flex flex-col lg:flex-row gap-8">
        
        {/* Mobile Sidebar Toggle & Dark Mode */}
        <div className={`lg:hidden flex items-center justify-between pb-4 border-b w-full ${
          darkMode ? "border-[#262422]" : "border-border"
        }`}>
          <span className={`font-semibold text-sm ${darkMode ? "text-[#A39E99]" : "text-ink-muted"}`}>Documentation Menu</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full shadow-xs cursor-pointer ${
                darkMode ? "bg-[#1E1C1A] text-amber-400 border border-[#2E2B28]" : "bg-ink text-cream"
              }`}
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="px-4 py-1.5 text-xs font-medium bg-accent text-white rounded-full shadow-xs cursor-pointer"
            >
              {mobileSidebarOpen ? "Close Menu" : "Open Menu"}
            </button>
          </div>
        </div>

        {/* Sidebar Navigation - Fixed Left side on large screens */}
        <aside
          className={`fixed lg:sticky top-24 left-0 h-[calc(100vh-6rem)] w-72 backdrop-blur-xl lg:backdrop-blur-none z-40 p-6 lg:p-0 border-r transition-transform duration-300 overflow-y-auto shrink-0 ${
            darkMode ? "bg-[#121110]/95 lg:bg-transparent border-[#262422]" : "bg-warm-50/95 lg:bg-transparent border-border lg:pr-6"
          } ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? "text-[#A39E99]" : "text-ink-muted"}`}>
                Documentation
              </h3>
              {/* Desktop Dark Mode Toggle Button */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`hidden lg:flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg shadow-xs cursor-pointer transition-colors ${
                  darkMode ? "bg-[#1E1C1A] text-amber-400 border border-[#2E2B28] hover:bg-[#282522]" : "bg-warm-200/70 text-slate-800 hover:bg-warm-200"
                }`}
              >
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>
            </div>

            <nav className="space-y-1">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    setActiveSection(sec.id as DocSection);
                    setMobileSidebarOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    activeSection === sec.id
                      ? "bg-accent/10 text-accent font-semibold border border-accent/20"
                      : darkMode 
                        ? "text-[#A39E99] hover:text-[#EFECE6] hover:bg-[#1E1C1A]/60" 
                        : "text-ink-muted hover:text-ink hover:bg-warm-100/60"
                  }`}
                >
                  {sec.title}
                </button>
              ))}
            </nav>

            <div className={`pt-6 border-t ${darkMode ? "border-[#262422]" : "border-border"}`}>
              <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                darkMode ? "bg-[#1A1816]/70 border-[#2E2B28] text-[#C4C0B8]" : "bg-orange-100/50 border-orange-200/60 text-slate-700"
              }`}>
                <p className={`font-semibold ${darkMode ? "text-[#EFECE6]" : "text-slate-900"}`}>💡 Quick Tip</p>
                <p>All ToolUndo utilities run 100% locally in your browser. No files are uploaded to any server.</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Backdrop for Mobile Sidebar */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-30 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Content Area - Stretched across available right space */}
        <main className="flex-1 w-full min-w-0 space-y-10 lg:pl-4">
          
          {/* Conditional Rendering of Documentation Sections */}

          {activeSection === "introduction" && (
            <section className="space-y-8 animate-fade-in max-w-5xl">
                <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent">Overview & Background</span>
                    <h1 className={`text-3xl md:text-5xl font-extrabold tracking-tight ${darkMode ? "text-[#FAF9F5]" : "text-slate-900"}`}>
                    Introduction to ToolUndo
                    </h1>
                    <p className={`text-base md:text-lg leading-relaxed ${darkMode ? "text-[#C4C0B8]" : "text-slate-600"}`}>
                    Welcome to the official documentation hub for <strong className="text-accent">ToolUndo</strong>. Built with a vision to eliminate sluggish cloud utilities, bloated software interfaces, and invasive tracking platforms, ToolUndo brings a curated suite of high-performance, privacy-focused browser utilities right to your fingertips. Whether you are a web developer, a creative designer, a student, or an everyday power user, ToolUndo transforms repetitive digital chores into instantaneous client-side interactions.
                    </p>
                </div>

                <div className={`border-l-4 border-accent pl-5 py-4 my-6 rounded-r-xl shadow-xs ${darkMode ? "bg-[#1A1816]/70" : "bg-orange-50/50"}`}>
                    <p className={`text-sm md:text-base font-semibold ${darkMode ? "text-[#EFECE6]" : "text-slate-800"}`}>
                    &ldquo;സംഗതി കൊള്ളാം, പണി പാളരുത്!&rdquo;
                    </p>
                    <p className={`text-xs md:text-sm mt-1 ${darkMode ? "text-[#A39E99]" : "text-slate-600"}`}>
                    Engineered with strict adherence to absolute speed, robust engineering standards, uncompromising security, and an optimized native experience.
                    </p>
                </div>

                <div className="space-y-4 pt-2">
                    <h2 className={`text-2xl font-bold ${darkMode ? "text-[#FAF9F5]" : "text-slate-900"}`}>Core Philosophy & Vision</h2>
                    <p className={`text-base leading-relaxed ${darkMode ? "text-[#C4C0B8]" : "text-slate-600"}`}>
                    Traditional web platforms process utility workloads by uploading your sensitive media, documents, and code to external data centers. ToolUndo completely subverts this architecture by shifting 100% of the computing workload directly into your browser instance.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                    <div className={`p-6 rounded-2xl border shadow-xs space-y-3 ${darkMode ? "bg-[#181614] border-[#2A2724]" : "bg-white border-border"}`}>
                        <div className="w-10 h-10 rounded-lg bg-orange-100/10 flex items-center justify-center text-accent font-bold text-lg">🔒</div>
                        <h3 className={`font-bold text-lg ${darkMode ? "text-[#FAF9F5]" : "text-slate-900"}`}>Zero Server Uploads</h3>
                        <p className={`text-sm leading-relaxed ${darkMode ? "text-[#A39E99]" : "text-slate-600"}`}>Your files never leave your device storage. Everything executes locally using Web APIs, Canvas rendering engines, and WebAssembly modules.</p>
                    </div>
                    <div className={`p-6 rounded-2xl border shadow-xs space-y-3 ${darkMode ? "bg-[#181614] border-[#2A2724]" : "bg-white border-border"}`}>
                        <div className="w-10 h-10 rounded-lg bg-orange-100/10 flex items-center justify-center text-accent font-bold text-lg">⚡</div>
                        <h3 className={`font-bold text-lg ${darkMode ? "text-[#FAF9F5]" : "text-slate-900"}`}>Lightning Fast Execution</h3>
                        <p className={`text-sm leading-relaxed ${darkMode ? "text-[#A39E99]" : "text-slate-600"}`}>Bypass cloud upload queues, network traffic bottlenecks, and conversion waiting bars. Experience instantaneous processing results right inside your active tab.</p>
                    </div>
                    <div className={`p-6 rounded-2xl border shadow-xs space-y-3 ${darkMode ? "bg-[#181614] border-[#2A2724]" : "bg-white border-border"}`}>
                        <div className="w-10 h-10 rounded-lg bg-orange-100/10 flex items-center justify-center text-accent font-bold text-lg">🎨</div>
                        <h3 className={`font-bold text-lg ${darkMode ? "text-[#FAF9F5]" : "text-slate-900"}`}>Clean & Modern UI</h3>
                        <p className={`text-sm leading-relaxed ${darkMode ? "text-[#A39E99]" : "text-slate-600"}`}>Minimalist, distraction-free visual layouts tailored meticulously for modern workflows, high-DPI displays, and seamless accessibility across devices.</p>
                    </div>
                    </div>
                </div>

                <div className={`space-y-4 pt-4 border-t ${darkMode ? "border-[#262422]" : "border-border"}`}>
                    <h2 className={`text-2xl font-bold ${darkMode ? "text-[#FAF9F5]" : "text-slate-900"}`}>Who is ToolUndo Built For?</h2>
                    <p className={`text-base leading-relaxed ${darkMode ? "text-[#C4C0B8]" : "text-slate-600"}`}>
                    ToolUndo is crafted to scale seamlessly across diverse professional sectors and everyday digital tasks:
                    </p>
                    <ul className={`list-disc pl-6 space-y-2 text-base ${darkMode ? "text-[#C4C0B8]" : "text-slate-600"}`}>
                    <li><strong>Frontend Engineers & Web Developers:</strong> Rapidly optimize landing page asset sizes, compile asset conversions, and design fluid gradients.</li>
                    <li><strong>UI/UX & Graphic Designers:</strong> Compress high-resolution portfolio mockups and experiment with modern design palettes locally.</li>
                    <li><strong>Content Creators & Marketers:</strong> Build clean custom QR codes and format digital campaign assets without cloud tracker exposure.</li>
                    <li><strong>Privacy Advocates & Everyday Users:</strong> Execute routine file compression without accounts, cookies, or subscription walls.</li>
                    </ul>
                </div>

                <div className={`space-y-4 pt-4 border-t ${darkMode ? "border-[#262422]" : "border-border"}`}>
                    <h2 className={`text-2xl font-bold ${darkMode ? "text-[#FAF9F5]" : "text-slate-900"}`}>Technical Standards & Compliance</h2>
                    <p className={`text-base leading-relaxed ${darkMode ? "text-[#C4C0B8]" : "text-slate-600"}`}>
                    Built using next-generation web technologies, ToolUndo adheres to strict modern web architecture benchmarks. By leveraging standard-compliant HTML5 File APIs, Canvas rendering contexts, and optimized client-side bundles, our platform guarantees maximum compatibility across all major desktop and mobile browsers including Chrome, Safari, Firefox, and Edge.
                    </p>
                </div>
                </section>
          )}

          {activeSection === "getting-started" && (
            <section className="space-y-8 animate-fade-in max-w-5xl">
                <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent">Quick Start & Workflow</span>
                    <h1 className={`text-3xl md:text-5xl font-extrabold tracking-tight ${darkMode ? "text-[#FAF9F5]" : "text-slate-900"}`}>
                    Getting Started with ToolUndo
                    </h1>
                    <p className={`text-base md:text-lg leading-relaxed ${darkMode ? "text-[#C4C0B8]" : "text-slate-600"}`}>
                    Embarking on your workflow with <strong>ToolUndo</strong> is seamless and friction-free. Because our entire utility suite operates locally inside your web browser sandbox, there is zero software to download, no accounts to register, and no configuration files to manage. Get up and running in seconds.
                    </p>
                </div>

                <div className="space-y-4 pt-2">
                    <h2 className={`text-2xl font-bold ${darkMode ? "text-[#FAF9F5]" : "text-slate-900"}`}>Step-by-Step Execution Workflow</h2>
                    <p className={`text-base leading-relaxed ${darkMode ? "text-[#C4C0B8]" : "text-slate-600"}`}>
                    Follow this intuitive four-step procedure to execute any digital task or utility processing request securely:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className={`p-6 rounded-2xl border shadow-xs space-y-3 ${darkMode ? "bg-[#181614] border-[#2A2724]" : "bg-white border-border"}`}>
                        <div className="w-10 h-10 rounded-lg bg-orange-100/10 flex items-center justify-center text-accent font-bold text-base">01</div>
                        <h3 className={`font-bold text-lg ${darkMode ? "text-[#FAF9F5]" : "text-slate-900"}`}>Browse Utilities</h3>
                        <p className={`text-sm leading-relaxed ${darkMode ? "text-[#A39E99]" : "text-slate-600"}`}>Navigate directly to the <Link href="/#tools" className="text-accent underline font-medium">Tools Section</Link> on our homepage to explore the complete catalog of available client-side modules.</p>
                    </div>
                    
                    <div className={`p-6 rounded-2xl border shadow-xs space-y-3 ${darkMode ? "bg-[#181614] border-[#2A2724]" : "bg-white border-border"}`}>
                        <div className="w-10 h-10 rounded-lg bg-orange-100/10 flex items-center justify-center text-accent font-bold text-base">02</div>
                        <h3 className={`font-bold text-lg ${darkMode ? "text-[#FAF9F5]" : "text-slate-900"}`}>Select Your Tool</h3>
                        <p className={`text-sm leading-relaxed ${darkMode ? "text-[#A39E99]" : "text-slate-600"}`}>Click into your desired utility module—whether it is the Image Compressor, QR Code Generator, or Fluid Gradient Mesh designer.</p>
                    </div>

                    <div className={`p-6 rounded-2xl border shadow-xs space-y-3 ${darkMode ? "bg-[#181614] border-[#2A2724]" : "bg-white border-border"}`}>
                        <div className="w-10 h-10 rounded-lg bg-orange-100/10 flex items-center justify-center text-accent font-bold text-base">03</div>
                        <h3 className={`font-bold text-lg ${darkMode ? "text-[#FAF9F5]" : "text-slate-900"}`}>Input Data / Drag Files</h3>
                        <p className={`text-sm leading-relaxed ${darkMode ? "text-[#A39E99]" : "text-slate-600"}`}>Drop your target files into the secure drop zone area or type/paste your text, links, and design parameters into the input fields.</p>
                    </div>

                    <div className={`p-6 rounded-2xl border shadow-xs space-y-3 ${darkMode ? "bg-[#181614] border-[#2A2724]" : "bg-white border-border"}`}>
                        <div className="w-10 h-10 rounded-lg bg-orange-100/10 flex items-center justify-center text-accent font-bold text-base">04</div>
                        <h3 className={`font-bold text-lg ${darkMode ? "text-[#FAF9F5]" : "text-slate-900"}`}>Download Instantly</h3>
                        <p className={`text-sm leading-relaxed ${darkMode ? "text-[#A39E99]" : "text-slate-600"}`}>Review your real-time optimized output or live preview, then save your finalized assets straight to your local disk with a single click.</p>
                    </div>
                    </div>
                </div>

                <div className={`space-y-4 pt-4 border-t ${darkMode ? "border-[#262422]" : "border-border"}`}>
                    <h2 className={`text-2xl font-bold ${darkMode ? "text-[#FAF9F5]" : "text-slate-900"}`}>System Requirements & Compatibility</h2>
                    <p className={`text-base leading-relaxed ${darkMode ? "text-[#C4C0B8]" : "text-slate-600"}`}>
                    Because ToolUndo runs entirely via client-side web technologies, your device hardware directly powers the processing engine. 
                    </p>
                    <ul className={`list-disc pl-6 space-y-2 text-base ${darkMode ? "text-[#C4C0B8]" : "text-slate-600"}`}>
                    <li><strong>Supported Browsers:</strong> Fully compatible with modern evergreen browsers including Google Chrome, Apple Safari, Mozilla Firefox, Microsoft Edge, and mobile web browsers.</li>
                    <li><strong>Hardware Acceleration:</strong> Utilizes browser hardware acceleration and Canvas APIs for high-speed rendering performance.</li>
                    <li><strong>Internet Connectivity:</strong> An internet connection is only needed to load the initial web page; once loaded, tools operate smoothly right inside your active session.</li>
                    </ul>
                </div>
                </section>
          )}

          {activeSection === "tools-overview" && (
            <section className="space-y-8 animate-fade-in max-w-5xl">
                <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent">Features & Modules</span>
                    <h1 className={`text-3xl md:text-5xl font-extrabold tracking-tight ${darkMode ? "text-[#FAF9F5]" : "text-slate-900"}`}>
                    Tools Overview
                    </h1>
                    <p className={`text-base md:text-lg leading-relaxed ${darkMode ? "text-[#C4C0B8]" : "text-slate-600"}`}>
                    ToolUndo offers an expanding, high-performance suite of client-side utility modules engineered specifically to streamline web development chores, creative design formatting, and everyday digital workflows.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
                    {[
                      { title: "Image Compressor", icon: "🖼️", desc: "Compress PNG, JPEG, and WebP images locally with customizable quality metrics and size optimization targets." },
                      { title: "QR Code Generator", icon: "🔲", desc: "Generate high-resolution custom vector and raster QR codes for URLs, WiFi networks, and contact vCards instantly." },
                      { title: "Gradient Mesh", icon: "🎨", desc: "Design stunning multi-color fluid gradient mesh backgrounds for your landing pages, mockups, and creative projects." },
                      { title: "Format Converters", icon: "⚡", desc: "Convert digital file formats seamlessly without compromising visual fidelity, hitting upload caps, or risking data leaks." },
                      { title: "Asset Resizer", icon: "📐", desc: "Batch resize graphic dimensions precisely by pixels or scale percentages to fit specific platform requirements." },
                      { title: "Snippet Utils", icon: "🛠️", desc: "Quickly format code blocks, clean up text strings, and decode parameters straight in your browser." }
                    ].map((tool, idx) => (
                      <div key={idx} className={`p-5 rounded-2xl border shadow-xs space-y-2.5 transition-all hover:shadow-md ${darkMode ? "bg-[#181614] border-[#2A2724]" : "bg-white border-border"}`}>
                        <div className="w-8 h-8 rounded-lg bg-orange-100/10 flex items-center justify-center text-accent font-bold text-sm">{tool.icon}</div>
                        <h3 className={`text-base font-bold ${darkMode ? "text-[#FAF9F5]" : "text-slate-900"}`}>{tool.title}</h3>
                        <p className={`text-xs md:text-sm leading-relaxed ${darkMode ? "text-[#A39E99]" : "text-slate-600"}`}>{tool.desc}</p>
                      </div>
                    ))}
                </div>
                </section>
          )}

          {activeSection === "privacy-security" && (
            <section className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">Architecture</span>
                <h1 className={`text-3xl md:text-5xl font-extrabold tracking-tight ${darkMode ? "text-[#FAF9F5]" : "text-slate-900"}`}>
                  Privacy & Security
                </h1>
                <p className={`text-base md:text-lg leading-relaxed ${darkMode ? "text-[#C4C0B8]" : "text-slate-600"}`}>
                  At ToolUndo, we believe your data belongs to you. Traditional online tools upload your sensitive photos, documents, and data to remote cloud servers. We do things differently.
                </p>
              </div>

              <h2 className={`text-2xl font-bold pt-4 ${darkMode ? "text-[#FAF9F5]" : "text-slate-900"}`}>Client-Side Architecture</h2>
              <p className={`text-base leading-relaxed ${darkMode ? "text-[#C4C0B8]" : "text-slate-600"}`}>
                Every calculation, compression, and conversion executed on ToolUndo runs directly within your browser&apos;s sandbox using modern JavaScript execution engines and browser memory. 
              </p>

              <div className={`p-5 rounded-2xl border text-sm space-y-1 ${darkMode ? "bg-[#16201B] border-[#20362B] text-[#85CEAB]" : "bg-emerald-50 border-emerald-200 text-emerald-900"}`}>
                <p className="font-bold text-base">🔒 Guaranteed Security</p>
                <p>Because no server requests transmit your files over the internet, data interception or cloud logging is technically impossible.</p>
              </div>
            </section>
          )}

          {activeSection === "faq" && (
            <section className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">Help & Support</span>
                <h1 className={`text-3xl md:text-5xl font-extrabold tracking-tight ${darkMode ? "text-[#FAF9F5]" : "text-slate-900"}`}>
                  Frequently Asked Questions
                </h1>
                <p className={`text-base md:text-lg leading-relaxed ${darkMode ? "text-[#C4C0B8]" : "text-slate-600"}`}>
                  Got questions? Find quick answers regarding file limits, browser compatibility, and usage.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {[
                  { q: "Is ToolUndo completely free to use?", a: "Yes! All tools available on ToolUndo are 100% free with no hidden paywalls or subscription fees." },
                  { q: "Do I need to install any software or browser extension?", a: "No installation required. ToolUndo works directly inside any modern web browser on desktop and mobile." },
                  { q: "Are there any file size limits?", a: "Since processing is done locally on your device, limits depend primarily on your device&apos;s available RAM and browser performance." }
                ].map((faq, idx) => (
                  <div key={idx} className={`p-6 rounded-2xl border shadow-xs space-y-2 ${darkMode ? "bg-[#181614] border-[#2A2724]" : "bg-white border-border"}`}>
                    <h3 className={`text-lg font-bold ${darkMode ? "text-[#FAF9F5]" : "text-slate-900"}`}>{faq.q}</h3>
                    <p className={`text-sm ${darkMode ? "text-[#A39E99]" : "text-slate-600"}`}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Bottom Navigation Footer inside Docs */}
          <div className={`pt-10 border-t flex items-center justify-between w-full ${darkMode ? "border-[#262422]" : "border-border"}`}>
            <Link
              href="/"
              className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                darkMode ? "text-[#A39E99] hover:text-[#FAF9F5]" : "text-ink-muted hover:text-ink"
              }`}
            >
              ← Back to Home
            </Link>
            <a
              href="https://github.com/abints47"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent hover:underline flex items-center gap-1"
            >
              GitHub Repository →
            </a>
          </div>

        </main>
      </div>
    </div>
  );
}