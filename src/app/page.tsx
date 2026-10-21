"use client";

import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import Footer from "../components/layout/Footer";
import FeedbackSection from "@/components/FeedbackSection";
import Faq from "../components/layout/Faq";
import Testimonials from "../components/layout/Testimonials";
import ImageToWebp from "../components/tools/ImageToWebp";
import QrGenerator from "../components/tools/QrGenerator";
import GradientMesh from "../components/tools/GradientMesh";
import SuggestTool from "../components/tools/SuggestTool";
import YoutubeMp3 from "../components/tools/YoutubeMp3";

interface ToolItem {
  id: string;
  title: string;
  desc: string;
}

/* ── Custom 5-second Funky Loading Screen ── */
const LoadingScreen = () => {
  const funkyPhrases = [
    "Welcome To Undo-Universe! 🌌",
    "Oru chaya kudikkunna time-il sambavam set aakkam! ☕",
    "No lag, no scene, pure browser rocket speed! 🚀",
    "Server scene illa machane, full browser kalip vibes! ⚡",
    "URL kodukku, color maattu, direct scan cheythu polikku! 🎨",
    "Scene aakkalle, tool-Undo! → 🔥",
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % funkyPhrases.length);
    }, 1000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => {
      clearInterval(phraseInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-warm-white/95 backdrop-blur-md px-6 text-center select-none overflow-hidden">
      {/* Background Animated Tool Icons positioned on absolute left and right */}
      <div className="absolute inset-0 pointer-events-none opacity-10 flex justify-between px-6 sm:px-12 items-center">
        <div className="flex flex-col gap-32">
          <div className="animate-[bounce_5s_infinite] text-accent">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.121 2.121 0 0121 17.25l-5.83-5.83m-3.75 3.75a3 3 0 11-4.243-4.243 3 3 0 014.243 4.243zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col gap-32">
          <div className="animate-[spin_10s_linear_infinite] text-amber-600">
            <svg className="w-20 h-20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Animated Glowing Icon Ring */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="w-24 h-24 rounded-3xl bg-accent/15 animate-ping absolute inset-0 m-auto" />
        <div className="w-20 h-20 rounded-3xl bg-linear-to-tr from-accent to-amber-500 flex items-center justify-center shadow-xl shadow-accent/30 animate-bounce">
          <svg className="w-10 h-10 text-white animate-spin" style={{ animationDuration: "3s" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
      </div>

      {/* Brand Title */}
      <h1 className="text-3xl sm:text-4xl font-black text-ink tracking-tight mb-2">
        ToolUndo<span className="text-accent animate-pulse">.</span>
      </h1>

      {/* Funky Cycling Text */}
      <div className="h-8 mb-6 flex items-center justify-center">
        <p className="text-sm sm:text-base font-semibold text-ink-muted transition-all duration-300 transform">
          {funkyPhrases[phraseIndex]}
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full max-w-xs bg-warm-200/80 rounded-full h-2 overflow-hidden p-0.5 border border-border">
        <div 
          className="h-full bg-linear-to-r from-accent to-amber-500 rounded-full transition-all duration-75 ease-out shadow-xs"
          style={{ width: `${progress}%` }}
        />
      </div>

      <span className="text-xs font-mono font-semibold text-accent mt-3">
        {progress}%
      </span>
    </div>
  );
};

/* ── Tiny section divider ── */
const Divider = () => (
  <div className="w-full px-6 md:px-12">
    <div className="h-px bg-border max-w-7xl mx-auto" />
  </div>
);

/* ── Section label (Left-aligned explicitly) ── */
const SectionLabel = ({
  label,
  heading,
  sub,
}: {
  label: string;
  heading: string;
  sub?: React.ReactNode;
}) => (
  <div data-aos="fade-down" data-aos-once="true" className="w-full text-left mb-10 max-w-7xl mx-auto">
    <span className="text-xs font-semibold uppercase tracking-widest text-accent block mb-2">
      {label}
    </span>
    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-ink mb-3">
      {heading}
    </h2>
    {sub && (
      <div className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-3xl">
        {sub}
      </div>
    )}
  </div>
);

/* ── Concise Toolbox cards ── */
const TOOLS: ToolItem[] = [
  {
    id: "image-to-webp",
    title: "Image → WebP",
    desc: "Compress and convert images to WebP instantly in your browser.",
  },
  {
    id: "qr-generator",
    title: "QR Generator",
    desc: "Create customized, high-resolution scannable QR codes in seconds.",
  },
  {
    id: "gradient-mesh",
    title: "CSS Mesh Gradient",
    desc: "Design beautiful multi-point mesh gradients and copy pure CSS.",
  },
  {
    id: "youtube-mp3",
    title: "YouTube → MP3",
    desc: "Extract and download audio from any YouTube video as an MP3 file.",
  },
];

/* ── Feature showcase data ── */
const FEATURES_ROWS = [
  {
    id: "image-to-webp",
    label: "⚙️ Image → WebP",
    title: "Shrink Image Sizes With Zero Quality Loss",
    desc: "Convert heavy image files into lightweight WebP format right in your browser. Live side-by-side preview — scene illa, full fast!",
    checks: [
      "100% Client-side Canvas API",
      "Dynamic quality slider (5% to 100%)",
      "Instant one-click download",
    ],
  },
  {
    id: "qr-generator",
    label: "🔗 QR Generator",
    title: "Generate Custom Scannable QR Codes Instantly",
    desc: "Create stylish QR codes with custom colors and fault-tolerant error correction. Your URLs and text stay safe on your device only!",
    checks: [
      "Custom brand foreground & background colors",
      "4 standard error correction levels",
      "High-res PNG export & instant clipboard copy",
    ],
  },
  {
    id: "gradient-mesh",
    label: "🎨 CSS Mesh Gradient",
    title: "Craft Stunning Mesh Gradients in Seconds",
    desc: "Drag interactive color points across the canvas to design modern backgrounds. Adipoli color palettes with ready-to-use CSS output.",
    checks: [
      "Interactive drag-to-position color nodes",
      "Support for up to 10 custom color stops",
      "One-click pure CSS code copy",
    ],
  },
  {
    id: "youtube-mp3",
    label: "🎵 YouTube → MP3",
    title: "Extract Audio From Any YouTube Video",
    desc: "Paste a YouTube URL, hit download, and grab the MP3 audio instantly. No apps, no extensions — just your browser.",
    checks: [
      "Supports all YouTube video and Shorts URLs",
      "Highest quality audio extraction",
      "One-click MP3 download to your device",
    ],
  },
];

/* ── Key features data ── */
const KEY_FEATURES = [
  { 
    title: "100% Client-Side", 
    tagline: "Browser Only, Scene Illa!", 
    desc: "Everything executes right inside your browser. Zero server uploads, complete privacy guaranteed.",
    svg: (
      <svg className="w-5 h-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  },
  { 
    title: "Lightning Fast", 
    tagline: "Full Speed Machane!", 
    desc: "Zero network latency or queue wait times. Computations finish the instant you click.",
    svg: (
      <svg className="w-5 h-5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  { 
    title: "Zero Data Sharing", 
    tagline: "Your Data Stays Safe!", 
    desc: "Your files never leave your system. No tracking, no external database logging, ever.",
    svg: (
      <svg className="w-5 h-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("tools");
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);

  const toolsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
      anchorPlacement: "top-bottom",
    });
  }, []);

  // 5-second initial loading timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

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

  const renderToolSvg = (id: string) => {
    switch (id) {
      case "image-to-webp":
        return (
          <svg className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
            <polyline points="21 15 16 10 5 21" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case "qr-generator":
        return (
          <svg className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 14h3v3h-3zM17 17h4v4h-4zM14 21h3v-1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case "gradient-mesh":
        return (
          <svg className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12h20" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case "youtube-mp3":
        return (
          <svg className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  const renderFeatureMock = (id: string) => {
    switch (id) {
      case "image-to-webp":
        return (
          <div className="w-full aspect-square bg-warm-50 rounded-2xl p-6 flex flex-col justify-between border border-border/40 select-none overflow-hidden relative">
            <div className="flex justify-between items-center text-xs font-semibold text-ink-muted">
              <span className="bg-warm-white px-2.5 py-1 rounded-md border border-border">JPG • 4.8 MB</span>
              <span className="text-accent font-bold">→ 82% Saved</span>
              <span className="bg-accent/10 text-accent px-2.5 py-1 rounded-md border border-accent/20">WebP • 850 KB</span>
            </div>
            
            <div className="my-auto relative h-36 w-full rounded-xl bg-warm-white border border-border/80 flex items-center justify-center overflow-hidden shadow-inner">
              <svg className="w-full h-full" viewBox="0 0 300 150" fill="none">
                <rect x="10" y="10" width="280" height="130" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeDasharray="4 4" />
                <circle cx="90" cy="65" r="24" fill="#fb923c" fillOpacity="0.4" />
                <path d="M40 120 L110 70 L170 120" fill="#fdba74" fillOpacity="0.3" />
                <line x1="150" y1="0" x2="150" y2="150" stroke="#f97316" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="210" cy="65" r="24" fill="#ea580c" />
                <path d="M160 120 L230 70 L290 120" fill="#c2410c" fillOpacity="0.6" />
              </svg>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-ink-muted">
                <span>Quality</span>
                <span className="font-bold text-ink">80%</span>
              </div>
              <div className="w-full h-2 bg-warm-200 rounded-full overflow-hidden">
                <div className="w-4/5 h-full bg-accent rounded-full" />
              </div>
            </div>
          </div>
        );

      case "qr-generator":
        return (
          <div className="w-full aspect-square bg-warm-50 rounded-2xl p-6 flex flex-col items-center justify-between border border-border/40 select-none overflow-hidden">
            <div className="w-full flex justify-between items-center text-xs font-semibold text-ink-muted">
              <span className="bg-warm-white px-2.5 py-1 rounded-md border border-border">ECC: Level H</span>
              <span className="text-accent font-bold">Ready to Scan</span>
            </div>

            <div className="p-4 bg-warm-white rounded-2xl border border-border/80 shadow-md">
              <svg className="w-28 h-28 text-ink" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14-2h4v2h-4v-2zm-4 0h2v4h-2v-4zm4 4h4v4h-4v-4zm-2 2h2v2h-2v-2zm-2-2h2v2h-2v-2zm6-4h2v2h-2v-2zm-6-2h4v2h-4v-2z" />
              </svg>
            </div>

            <div className="w-full flex gap-2 justify-center">
              <span className="h-3.5 w-3.5 rounded-full bg-accent border border-white shadow-xs" />
              <span className="h-3.5 w-3.5 rounded-full bg-slate-900 border border-white shadow-xs" />
              <span className="h-3.5 w-3.5 rounded-full bg-amber-500 border border-white shadow-xs" />
              <span className="h-3.5 w-3.5 rounded-full bg-emerald-600 border border-white shadow-xs" />
            </div>
          </div>
        );

      case "gradient-mesh":
        return (
          <div className="w-full aspect-square bg-warm-50 rounded-2xl p-6 flex flex-col justify-between border border-border/40 select-none overflow-hidden relative">
            <div className="flex justify-between items-center text-xs font-semibold text-ink-muted z-10">
              <span className="bg-warm-white px-2.5 py-1 rounded-md border border-border">CSS Radial Mesh</span>
              <span className="text-accent font-bold">4 Color Nodes</span>
            </div>

            <div className="my-auto relative h-36 w-full rounded-xl overflow-hidden border border-border/80 shadow-inner bg-linear-to-br from-amber-200 via-orange-300 to-rose-400">
              <svg className="w-full h-full absolute inset-0" viewBox="0 0 200 120">
                <circle cx="40" cy="30" r="6" fill="#ffffff" stroke="#ea580c" strokeWidth="2.5" />
                <circle cx="160" cy="35" r="6" fill="#ffffff" stroke="#f59e0b" strokeWidth="2.5" />
                <circle cx="70" cy="90" r="6" fill="#ffffff" stroke="#f43f5e" strokeWidth="2.5" />
                <circle cx="150" cy="85" r="6" fill="#ffffff" stroke="#8b5cf6" strokeWidth="2.5" />
              </svg>
            </div>

            <div className="w-full bg-warm-white/90 border border-border/80 rounded-lg px-3 py-1 text-center text-xs font-mono text-ink-muted truncate z-10">
              background: radial-gradient(at 20% 25%, #ea580c, transparent);
            </div>
          </div>
        );

      case "youtube-mp3":
        return (
          <div className="w-full aspect-square bg-warm-50 rounded-2xl p-6 flex flex-col justify-between border border-border/40 select-none overflow-hidden relative">
            <div className="flex justify-between items-center text-xs font-semibold text-ink-muted z-10">
              <span className="bg-warm-white px-2.5 py-1 rounded-md border border-border">YouTube → MP3</span>
              <span className="text-accent font-bold">Audio Ready</span>
            </div>

            <div className="my-auto relative h-36 w-full rounded-xl bg-warm-white border border-border/80 flex items-center justify-center overflow-hidden shadow-inner">
              <svg className="w-16 h-16 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="white"/>
              </svg>
            </div>

            <div className="w-full bg-warm-white/90 border border-border/80 rounded-lg px-3 py-1 text-center text-xs font-mono text-ink-muted truncate z-10">
              paste URL → extract audio → download MP3
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col min-h-screen animate-fade-in w-full overflow-x-hidden">
      <Header onNavClick={handleNav} activeSection={activeSection} />
      <Hero onExploreClick={() => scrollTo(toolsRef)} />

      <main className="grow w-full">
        {/* ════════ TOOLBOX ════════ */}
        <section ref={toolsRef} className="relative overflow-hidden w-full py-section px-6 md:px-12">
          {/* Animated Background Decorative Tools SVGs on strict left and right sides */}
          <div className="absolute inset-0 pointer-events-none opacity-10 overflow-hidden flex justify-between px-6 sm:px-12">
            {/* Left Side SVGs */}
            <div className="flex flex-col justify-between py-12">
              <div className="animate-[bounce_7s_infinite] text-accent">
                <svg className="w-20 h-20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                </svg>
              </div>
              <div className="animate-[pulse_5s_infinite] text-amber-500">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
            </div>

            {/* Right Side SVGs */}
            <div className="flex flex-col justify-between py-12">
              <div className="animate-[spin_12s_linear_infinite] text-amber-600">
                <svg className="w-20 h-20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                </svg>
              </div>
              <div className="animate-[bounce_6s_infinite] text-accent">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.121 2.121 0 0121 17.25l-5.83-5.83m-3.75 3.75a3 3 0 11-4.243-4.243 3 3 0 014.243 4.243zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {activeTool ? (
              <div className="w-full text-left" data-aos="fade-up" data-aos-once="true">
                <button
                  onClick={() => setActiveTool(null)}
                  className="flex items-center gap-2 text-base text-ink-muted hover:text-accent font-semibold mb-6 transition-colors cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="currentColor">
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                  </svg>
                  Back to Tools
                </button>
                <div className="animate-scale-in">
                  {activeTool === "image-to-webp" && <ImageToWebp />}
                  {activeTool === "qr-generator" && <QrGenerator />}
                  {activeTool === "gradient-mesh" && <GradientMesh />}
                  {activeTool === "youtube-mp3" && <YoutubeMp3 />}
                </div>
              </div>
            ) : (
              <div className="w-full text-left">
                <SectionLabel
                  label="Toolbox"
                  heading="Explore Tools"
                  sub="Scene illa, pure speed! Everything runs privately in your browser."
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                  {TOOLS.map((t, index) => {
                    const isYoutube = t.id === "youtube-mp3";
                    return (
                      <div
                        key={t.id}
                        data-aos="fade-up"
                        data-aos-once="true"
                        data-aos-delay={(index + 1) * 100}
                        onClick={() => { setActiveTool(t.id); scrollTo(toolsRef); }}
                        className={`group relative bg-warm-white/95 backdrop-blur-sm border border-border/80 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-accent/40 flex flex-col justify-between min-h-57.5 text-left ${
                          isYoutube ? "sm:col-span-2 lg:col-span-3" : ""
                        }`}
                      >
                        <div>
                          <div className="w-12 h-12 rounded-xl bg-accent-bg/80 border border-accent/20 flex items-center justify-center text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-warm-white group-hover:shadow-md group-hover:shadow-accent/20">
                            {renderToolSvg(t.id)}
                          </div>
                          <h3 className="mt-4 text-xl font-extrabold text-ink tracking-tight group-hover:text-accent transition-colors">
                            {t.title}
                          </h3>
                          <p className="mt-2 text-base text-ink-muted leading-relaxed">
                            {t.desc}
                          </p>
                        </div>

                        <div className="mt-5 flex items-center text-sm font-semibold text-accent opacity-90 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                          <span>Open tool →</span>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-b-2xl" />
                      </div>
                    );
                  })}

                  {/* Suggest card */}
                  <div
                    data-aos="fade-up"
                    data-aos-once="true"
                    data-aos-delay={400}
                    onClick={() => setIsSuggestOpen(true)}
                    className="group relative bg-warm-50/70 backdrop-blur-sm border-2 border-dashed border-warm-300 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-accent flex flex-col justify-between text-left min-h-57.5"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl border-2 border-dashed border-ink-faint/40 flex items-center justify-center text-ink-faint group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all shadow-xs">
                        <svg className="w-6 h-6 transition-transform duration-500 group-hover:rotate-90" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <h3 className="mt-4 text-xl font-extrabold text-ink tracking-tight group-hover:text-accent transition-colors">
                        Suggest a Tool
                      </h3>
                      <p className="mt-2 text-base text-ink-muted leading-relaxed">
                        Have an idea for a converter or utility?
                      </p>
                    </div>

                    <div className="mt-5 flex items-center text-sm font-semibold text-ink-muted group-hover:text-accent transition-colors">
                      <span>Submit idea →</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <Divider />

        {/* ════════ FEATURE SHOWCASE ════════ */}
        <section ref={featuresRef} className="scroll-mt-24 w-full py-section text-left px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <SectionLabel
              label="Highlights"
              heading="Feature Showcase"
              sub="Each tool is built to be lightning fast, beautifully designed, and 100% private in your browser."
            />

            <div className="flex flex-col gap-20 md:gap-28 w-full">
              {FEATURES_ROWS.map((f, i) => (
                <div 
                  key={f.id} 
                  data-aos="fade-up"
                  data-aos-once="true"
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-14 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  {/* SVG Graphic Mockup */}
                  <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-last" : ""}`}>
                    <div className="rounded-3xl border border-border/80 shadow-xl bg-warm-white p-2 group hover:border-accent/40 transition-all duration-300">
                      <div className="transition-transform duration-500 group-hover:scale-[1.02]">
                        {renderFeatureMock(f.id)}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`lg:col-span-7 space-y-4 text-left ${i % 2 === 1 ? "lg:order-first" : ""}`}>
                    <span className="inline-flex px-3.5 py-1 rounded-full border border-border bg-warm-white text-xs font-semibold uppercase tracking-wider text-accent shadow-xs">
                      {f.label}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
                      {f.title}
                    </h3>
                    <p className="text-base text-ink-muted leading-relaxed">
                      {f.desc}
                    </p>
                    <ul className="space-y-2.5 pt-1">
                      {f.checks.map((c, j) => (
                        <li key={j} className="flex items-center gap-2.5 text-sm text-ink-muted">
                          <span className="w-4 h-4 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold shrink-0">
                            ✓
                          </span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ════════ WHY TOOLUNDO ════════ */}
        <section className="relative overflow-hidden w-full py-section bg-linear-to-b from-warm-white/50 to-accent-bg/20 px-6 md:px-12">
          {/* Animated Background Icons strictly on left and right sides */}
          <div className="absolute inset-0 pointer-events-none opacity-10 overflow-hidden flex justify-between px-6 sm:px-12 items-center">
            <div className="animate-[spin_15s_linear_infinite] text-accent">
              <svg className="w-24 h-24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="animate-[pulse_6s_infinite] text-amber-600">
              <svg className="w-24 h-24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <SectionLabel 
              label="Why Choose Us?" 
              heading="Why ToolUndo?" 
              sub="Fast, privacy-first tools crafted for an effortless developer workflow." 
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {KEY_FEATURES.map((f, i) => (
                <div 
                  key={i} 
                  data-aos="fade-up"
                  data-aos-once="true"
                  data-aos-delay={(i + 1) * 150}
                  className="group relative bg-warm-white/80 backdrop-blur-sm border border-border/60 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-accent/40 text-left"
                >
                  <div className="w-12 h-12 rounded-2xl bg-accent-bg/80 border border-accent/20 flex items-center justify-center text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-warm-white group-hover:shadow-lg group-hover:shadow-accent/25">
                    {f.svg}
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold text-ink tracking-tight">{f.title}</h3>
                  <span className="inline-block mt-1 text-xs text-accent font-semibold tracking-wide uppercase">
                    {f.tagline}
                  </span>
                  <p className="mt-2.5 text-sm text-ink-light leading-relaxed">{f.desc}</p>
                  
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-b-3xl" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ════════ TESTIMONIALS ════════ */}
        <section className="py-section w-full text-left px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <Testimonials />
          </div>
        </section>

        <Divider />

        {/* ════════ FAQ ════════ */}
        <section className="py-section w-full text-left px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <Faq />
          </div>
        </section>

        <Divider />

        {/* ════════ ABOUT ════════ */}
        <section ref={aboutRef} className="scroll-mt-24 w-full py-section text-center px-6 md:px-12" data-aos="fade-up" data-aos-once="true">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <h2 className="text-ink font-bold text-3xl sm:text-4xl pb-4 tracking-tight"> About ToolUndo </h2>
            
            <div className="space-y-4 max-w-4xl text-base text-ink-muted leading-relaxed text-center">
              <p>
                A small initiative created to make daily tasks faster for developers and everyday users alike.
                Swap heavy desktop utilities with instant browser tools!
              </p>
              <p>
                Next.js, Tailwind CSS, TypeScript running 100% locally on your machine.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl w-full">
              {[
                { num: "4+", label: "Tools Available" },
                { num: "Instant", label: "Client Performance" },
                { num: "100%", label: "Private & Local" },
              ].map((s, i) => (
                <div 
                  key={i} 
                  className="bg-warm-white border border-border rounded-2xl p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 text-center flex flex-col items-center justify-center"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-ink">{s.num}</div>
                  <div className="text-xs font-medium text-ink-muted mt-1.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        { /* FeedBack Section Added Component */}
        <FeedbackSection />


      </main> 

      <Footer />
     {isSuggestOpen && (
        <SuggestTool 
          isOpen={isSuggestOpen} 
          onClose={() => setIsSuggestOpen(false)} 
        />
      )}
    </div>
  );
}