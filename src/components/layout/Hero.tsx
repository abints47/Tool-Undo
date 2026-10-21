"use client";

import React, { useEffect, useRef, useState } from "react";

interface HeroProps {
  onExploreClick?: () => void;
}

interface MeshPoint {
  id: string;
  color: string;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
}

export default function Hero({ onExploreClick }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const mousePosRef = useRef({ x: 0.5, y: 0.5 });
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const pointsRef = useRef<MeshPoint[]>([]);

  // Initialize mesh points
  useEffect(() => {
    setIsMounted(true);
    pointsRef.current = [
      { id: "1", color: "#C2410C", x: 15, y: 20, size: 55, vx: 0.03, vy: 0.02 },
      { id: "2", color: "#FB923C", x: 85, y: 35, size: 60, vx: -0.025, vy: 0.015 },
      { id: "3", color: "#F97316", x: 45, y: 75, size: 50, vx: 0.02, vy: -0.02 },
      { id: "4", color: "#EA580C", x: 75, y: 80, size: 58, vx: -0.015, vy: -0.025 },
      { id: "5", color: "#FDBA74", x: 10, y: 60, size: 45, vx: 0.025, vy: 0.01 },
      { id: "6", color: "#FFF1E6", x: 90, y: 10, size: 52, vx: -0.02, vy: 0.02 },
    ];
  }, []);

  // Canvas animation loop (stable — no React state per frame)
  useEffect(() => {
    if (!isMounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const maxDim = Math.max(width, height);
      ctx.clearRect(0, 0, width, height);

      const mouse = mousePosRef.current;

      // Update + draw mesh orbs
      const pts = pointsRef.current;
      pts.forEach((point) => {
        let { x, y, vx, vy } = point;

        // Gentle attraction toward mouse position
        const attract = 0.00025;
        vx += (mouse.x * 100 - x) * attract;
        vy += (mouse.y * 100 - y) * attract;

        // Organic drift
        vx += (Math.random() - 0.5) * 0.0015;
        vy += (Math.random() - 0.5) * 0.0015;

        // Bounce off edges with damping
        if (x <= point.size / 2 || x >= 100 - point.size / 2) {
          vx *= -0.92;
          x = Math.max(point.size / 2, Math.min(100 - point.size / 2, x));
        }
        if (y <= point.size / 2 || y >= 100 - point.size / 2) {
          vy *= -0.92;
          y = Math.max(point.size / 2, Math.min(100 - point.size / 2, y));
        }

        // Clamp velocity
        const maxV = 0.05;
        vx = Math.max(-maxV, Math.min(maxV, vx));
        vy = Math.max(-maxV, Math.min(maxV, vy));

        point.x = x;
        point.y = y;
        point.vx = vx;
        point.vy = vy;

        const cx = (x / 100) * width;
        const cy = (y / 100) * height;
        const radius = (point.size / 100) * maxDim;

        const hex = point.color.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.20)`);
        gradient.addColorStop(0.35, `rgba(${r}, ${g}, ${b}, 0.09)`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      // Subtle connections between nearby points
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const p1 = pts[i];
          const p2 = pts[j];
          const dx = ((p1.x - p2.x) / 100) * width;
          const dy = ((p1.y - p2.y) / 100) * height;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDim * 0.4) {
            const opacity = (1 - dist / (maxDim * 0.4)) * 0.05;
            ctx.strokeStyle = `rgba(194, 65, 12, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo((p1.x / 100) * width, (p1.y / 100) * height);
            ctx.lineTo((p2.x / 100) * width, (p2.y / 100) * height);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isMounted]);

  // Scroll progress for parallax
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      setScrollProgress(Math.min(scrollY / heroHeight, 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse tracking for parallax (ref for canvas loop + state for CSS transforms)
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const next = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
    mousePosRef.current = next;
    setMousePos(next);
  };

  // Skeleton state before mount (SSR-safe)
  if (!isMounted) {
    return (
      <section className="relative overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-linear-to-b from-cream via-warm-100/40 to-cream pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop pt-20 pb-24 md:pt-32 md:pb-40">
          <div className="flex flex-col items-center text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-warm-white text-sm font-medium text-red-800 mb-8 shadow-sm">
              <span className="w-1.5 h-1.5 text-accent rounded-full bg-accent animate-pulse" />
              🔧 സംഗതി കൊള്ളാം, പണി പാളരുത്!
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-ink leading-[1.08] max-w-4xl">
              Build faster with{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-accent-light">
                ToolUndo
              </span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-ink-muted leading-relaxed max-w-3xl mx-auto text-balance">
              വല്യ കാര്യത്തിൽ പണിതുണ്ടാക്കിയതാ! Premium browser-based utilities{" "}
              <br />
              compress images, generate QR codes, design gradient meshes.
              Zero server, zero data sharing.<br />
              ചുമ്മാ ഉപയോഗിക്കാം മച്ചാനേ!
            </p>
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
          <div className="mt-16 md:mt-24 rounded-2xl overflow-hidden border border-border shadow-2xl shadow-ink/5 mx-auto max-w-5xl animate-fade-in">
            <div className="relative aspect-video bg-warm-100" />
          </div>
        </div>
      </section>
    );
  }

  const parallaxY = scrollProgress * 30;
  const parallaxOpacity = 1 - scrollProgress * 0.3;

  return (
    <section
      className="relative overflow-hidden"
      style={{
        transform: `translateY(${parallaxY}px)`,
        opacity: parallaxOpacity,
      }}
      onMouseMove={handleMouseMove}
    >
      {/* ═══ Premium Animated Mesh Gradient Background ═══ */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ filter: "blur(60px)", opacity: 0.9 }}
        />

        {/* Static depth gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(194,65,12,0.08)_0%,transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(251,146,60,0.06)_0%,transparent_50%),radial-gradient(ellipse_at_50%_50%,rgba(234,88,12,0.04)_0%,transparent_70%)]" />

        {/* Fine grain texture */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundSize: "256px 256px",
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(26,22,19,0.12)_100%)]" />
      </div>

      {/* ═══ Floating geometric accents (mouse parallax) ═══ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={`a-${i}`}
            className="absolute rounded-full border border-accent/5 bg-accent/3 blur-3xl"
            style={{
              width: `${60 + i * 40}px`,
              height: `${60 + i * 40}px`,
              top: `${15 + i * 18}%`,
              left: `${10 + i * 22}%`,
              animation: `float ${15 + i * 3}s ease-in-out infinite`,
              animationDelay: `${i * -2}s`,
              transform: `translate(${(mousePos.x - 0.5) * i * 8}px, ${(mousePos.y - 0.5) * i * 8}px)`,
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        ))}
        {[1, 2, 3].map((i) => (
          <div
            key={`b-${i}`}
            className="absolute rounded-full border border-amber-500/5 bg-amber-500/3 blur-3xl"
            style={{
              width: `${80 + i * 30}px`,
              height: `${80 + i * 30}px`,
              bottom: `${10 + i * 15}%`,
              right: `${15 + i * 20}%`,
              animation: `float ${18 + i * 4}s ease-in-out infinite reverse`,
              animationDelay: `${i * -3}s`,
              transform: `translate(${(mousePos.x - 0.5) * i * -8}px, ${(mousePos.y - 0.5) * i * -8}px)`,
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        ))}
      </div>

      {/* ═══ Content ═══ */}
      <div className="relative max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop pt-20 pb-24 md:pt-32 md:pb-40">
        <div className="flex flex-col items-center text-center animate-slide-up">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-accent/20 bg-warm-white/90 backdrop-blur-xl text-sm font-medium text-accent mb-8 shadow-lg shadow-accent/5">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="tracking-wide">✨ Premium Browser-Native Tools</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-ink leading-[1.05] max-w-5xl text-balance">
            Build faster with{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-accent via-accent-light to-amber-500">
                ToolUndo
              </span>
              <span
                className="absolute inset-0 bg-linear-to-r from-accent via-accent-light to-amber-500 blur-[60px] opacity-20 -z-10"
                aria-hidden="true"
              />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-base md:text-lg lg:text-xl text-ink-muted leading-relaxed max-w-3xl mx-auto text-balance">
            വല്യ കാര്യത്തിൽ പണിതുണ്ടാക്കിയതാ! Premium browser-based utilities
            <br className="hidden md:block" />
            compress images, generate QR codes, design gradient meshes.
            <span className="text-accent font-medium"> Zero server, zero data sharing.</span>
            <br className="hidden md:block" />
            ചുമ്മാ ഉപയോഗിക്കാം മച്ചാനേ!
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              onClick={onExploreClick}
              className="group relative overflow-hidden bg-accent hover:bg-accent-hover text-white px-10 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:shadow-2xl hover:shadow-accent/25 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-accent/30"
            >
              <span className="relative flex items-center gap-2">
                Checkout The Tools
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                aria-hidden="true"
              />
            </button>

            <a
              href="https://github.com/abints47"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden border-2 border-border hover:border-accent/50 bg-warm-white/95 hover:bg-warm-white backdrop-blur-xl text-ink-muted hover:text-accent px-10 py-4 rounded-full font-semibold text-base transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-accent/20"
            >
              <span className="relative flex items-center gap-2">
                <svg
                  className="w-5 h-5 transition-transform group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </span>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-6 md:gap-10 opacity-60">
            <div className="flex items-center gap-2 text-xs text-ink-muted font-medium">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              100% Client-Side
            </div>
            <div className="w-px h-5 bg-border" />
            <div className="flex items-center gap-2 text-xs text-ink-muted font-medium">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Lightning Fast
            </div>
            <div className="w-px h-5 bg-border" />
            <div className="flex items-center gap-2 text-xs text-ink-muted font-medium">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Zero Data Sharing
            </div>
          </div>
        </div>

        {/* ═══ Premium Hero Visual — Interactive Preview ═══ */}
        <div className="mt-16 md:mt-24 relative animate-fade-in">
          <div
            className="relative rounded-3xl overflow-hidden border border-border/60 bg-warm-white"
            style={{
              boxShadow: `0 30px 80px -20px rgba(26,22,19,0.25), 0 10px 30px -10px rgba(26,22,19,0.12)`,
              transform: `perspective(1200px) rotateX(${(0.5 - mousePos.y) * 3}deg) rotateY(${(mousePos.x - 0.5) * 3}deg)`,
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Preview header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-warm-50/80 border-b border-border/60 backdrop-blur-sm">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="ml-4 px-3 py-1 bg-warm-white/50 rounded text-xs font-mono text-ink-muted border border-border/40">
                toolundo.app
              </div>
            </div>

            {/* Tool preview grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 p-4">
              {/* Image → WebP */}
              <div className="relative bg-warm-50/50 p-4 lg:p-6 hover:bg-accent-bg/30 transition-all duration-300 lg:border-r border-border/30">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-bg border border-accent/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                      <polyline points="21 15 16 10 5 21" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-ink text-sm">Image → WebP</h4>
                    <p className="text-xs text-ink-muted">Instant compression</p>
                  </div>
                </div>
                <div className="relative aspect-square bg-warm-white rounded-xl border border-border/60 overflow-hidden shadow-inner">
                  <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
                    <rect x="10" y="10" width="180" height="180" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
                    <circle cx="70" cy="70" r="35" fill="#fb923c" fillOpacity="0.25" />
                    <path d="M30 140 L100 70 L170 140" fill="#fdba74" fillOpacity="0.2" />
                    <line x1="100" y1="0" x2="100" y2="200" stroke="#f97316" strokeWidth="1.5" strokeDasharray="4 4" />
                    <circle cx="130" cy="70" r="35" fill="#ea580c" fillOpacity="0.35" />
                    <path d="M90 140 L170 60 L250 140" fill="#c2410c" fillOpacity="0.25" />
                  </svg>
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between text-[10px] font-mono">
                    <span className="bg-warm-white/90 px-2 py-1 rounded border border-border/50">JPG 4.8 MB</span>
                    <span className="bg-accent/10 text-accent px-2 py-1 rounded border border-accent/20 font-bold">→ WebP 850 KB</span>
                    <span className="bg-warm-white/90 px-2 py-1 rounded border border-border/50 text-ink-muted">82% smaller</span>
                  </div>
                </div>
              </div>

              {/* QR Generator */}
              <div className="relative bg-accent-bg/30 p-4 lg:p-6 hover:bg-accent-bg/50 transition-all duration-300 lg:border-r border-border/30">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-bg border border-accent/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M14 14h3v3h-3zM17 17h4v4h-4zM14 21h3v-1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-ink text-sm">QR Generator</h4>
                    <p className="text-xs text-ink-muted">Custom colors & ECC</p>
                  </div>
                </div>
                <div className="relative aspect-square bg-warm-white rounded-xl border border-border/60 overflow-hidden shadow-inner flex items-center justify-center p-6">
                  <svg className="w-2/3 h-2/3 text-ink" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14-2h4v2h-4v-2zm-4 0h2v4h-2v-4zm4 4h4v4h-4v-4zm-2 2h2v2h-2v-2zm-2-2h2v2h-2v-2zm6-4h2v2h-2v-2zm-6-2h4v2h-4v-2z" />
                  </svg>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent border border-white shadow-xs" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-white shadow-xs" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-white shadow-xs" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 border border-white shadow-xs" />
                  </div>
                </div>
              </div>

              {/* CSS Mesh Gradient */}
              <div className="relative bg-warm-50/50 p-4 lg:p-6 hover:bg-accent-bg/30 transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-bg border border-accent/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2 12h20" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-ink text-sm">CSS Mesh Gradient</h4>
                    <p className="text-xs text-ink-muted">Pure CSS output</p>
                  </div>
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden border border-border/60 shadow-inner bg-gradient-to-br from-amber-200 via-orange-300 to-rose-400">
                  <svg className="w-full h-full absolute inset-0" viewBox="0 0 200 200">
                    <defs>
                      <radialGradient id="g1" cx="20%" cy="20%" r="50%">
                        <stop offset="0%" stopColor="#ea580c" />
                        <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient id="g2" cx="80%" cy="17%" r="50%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient id="g3" cx="35%" cy="80%" r="50%">
                        <stop offset="0%" stopColor="#f43f5e" />
                        <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient id="g4" cx="75%" cy="82%" r="50%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <rect width="200" height="200" fill="url(#g1)" />
                    <rect width="200" height="200" fill="url(#g2)" />
                    <rect width="200" height="200" fill="url(#g3)" />
                    <rect width="200" height="200" fill="url(#g4)" />
                    <circle cx="40" cy="40" r="8" fill="#ffffff" stroke="#ea580c" strokeWidth="2" />
                    <circle cx="160" cy="35" r="8" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
                    <circle cx="70" cy="160" r="8" fill="#ffffff" stroke="#f43f5e" strokeWidth="2" />
                    <circle cx="150" cy="165" r="8" fill="#ffffff" stroke="#8b5cf6" strokeWidth="2" />
                  </svg>
                  <div className="absolute bottom-3 left-3 right-3 bg-warm-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-center text-[10px] font-mono text-ink-muted border border-border/50">
                    background: radial-gradient(at 20% 20%, #ea580c, transparent) ...
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating stats badges */}
          <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 hidden lg:block" aria-hidden="true">
            <div className="glass-card rounded-2xl p-4 md:p-5 shadow-2xl border-accent/20 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="text-2xl md:text-3xl font-extrabold text-ink">3+</div>
              <div className="text-xs text-ink-muted font-medium">Tools Available</div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 hidden lg:block" aria-hidden="true">
            <div className="glass-card rounded-2xl p-4 md:p-5 shadow-2xl border-accent/20 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <div className="text-2xl md:text-3xl font-extrabold text-ink">Instant</div>
              <div className="text-xs text-ink-muted font-medium">Client Performance</div>
            </div>
          </div>
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 hidden lg:block" aria-hidden="true">
            <div className="glass-card rounded-2xl px-5 py-3 shadow-2xl border-accent/20 animate-slide-up" style={{ animationDelay: "0.6s" }}>
              <div className="text-xl font-extrabold text-ink">100%</div>
              <div className="text-xs text-ink-muted font-medium">Private & Local</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-60" aria-hidden="true">
        <svg className="w-6 h-6 text-ink-muted" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
