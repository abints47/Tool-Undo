"use client";

import React from "react";
import { Image, QrCode, Wrench, Sparkles, ShieldCheck, Zap, Palette } from "lucide-react";
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import Footer from "../components/layout/Footer";
import ToolCard from "../components/ToolCard";

export default function Home() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      icon: ShieldCheck,
      title: "100% Client-Side",
      body: "Your files never leave your machine. Not even a screenshot. We literally cannot see what you uploaded — probably for the best. 🔒",
      g: "from-emerald-500 to-teal-500",
    },
    {
      icon: Zap,
      title: "Faster Than You",
      body: "No servers, no queues, no “please wait while we process.” It's done before you finish your coffee. Probably. ☕⚡",
      g: "from-amber-500 to-orange-500",
    },
    {
      icon: Palette,
      title: "Actually Looks Good",
      body: "We spent an embarrassing amount of time on spacing. You're welcome. Built with Next.js, Tailwind, and zero regrets. 🎨",
      g: "from-fuchsia-500 to-pink-500",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Header />

      <Hero onExploreClick={() => scrollTo("toolbox")} />

      <main className="flex-1">
        {/* ---- Toolbox ---- */}
        <section id="toolbox" className="scroll-mt-20 bg-surface py-20 lg:py-28">
          <div className="container-x">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">
                <Wrench size={15} /> The Toolbox
              </span>
              <h2 className="section-title mt-4">Pick Your Weapon</h2>
              <p className="section-sub mx-auto mt-3">
                Two tools so far, and yes — both are free. We checked. (സൗജന്യം ആണ്, സംശയം വേണ്ട!)
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
              <ToolCard
                title="Image → WebP"
                description="Convert your images into optimized WebP format."
                href="/image-to-webp"
                icon={Image}
                gradient="from-blue-500 to-cyan-500"
              />
              <ToolCard
                title="QR Code Generator"
                description="Generate high quality QR codes instantly."
                href="/qr-generator"
                icon={QrCode}
                gradient="from-fuchsia-500 to-pink-500"
              />
            </div>

            <div className="mt-12 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-5 py-2.5 text-sm font-semibold text-amber-700">
                <Sparkles size={16} /> More tools dropping soon — patience, young padawan.
              </span>
            </div>
          </div>
        </section>

        {/* ---- Features ---- */}
        <section id="features" className="scroll-mt-20 bg-canvas py-20 lg:py-28">
          <div className="container-x">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="section-title">Why You&apos;ll Actually Use This</h2>
              <p className="section-sub mx-auto mt-3">
                No sign-ups, no “free trial” traps, no spam. Just tools that work.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {features.map(({ icon: I, title, body, g }) => (
                <div key={title} className="card group p-8">
                  <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${g} text-white shadow-md transition-transform duration-300 group-hover:scale-110`}>
                    <I size={26} />
                  </div>
                  <h3 className="text-xl font-bold text-ink">{title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- About ---- */}
        <section id="about" className="scroll-mt-20 bg-surface py-20 lg:py-28">
          <div className="container-x">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e1b4b] via-[#4c1d95] to-[#2e1065] p-8 text-white lg:p-14">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-violet-500/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-indigo-500/25 blur-3xl" />

              <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                <div className="space-y-6">
                  <h2 className="text-3xl font-extrabold tracking-tight lg:text-4xl">About ToolUndo</h2>
                  <p className="text-lg leading-relaxed text-white/85">
                    Born from a developer&apos;s refusal to install yet another desktop app for a 10-second
                    task. ToolUndo is the “undo” button for your daily busywork.
                  </p>
                  <p className="text-white/70">
                    Built by a mallu dev who got tired of bookmarking 12 different sketchy converter sites.
                    You&apos;re officially home now. 🏠
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    {["Next.js", "Tailwind CSS", "TypeScript", "Zero BS"].map((t) => (
                      <span key={t} className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                  <dl className="space-y-4 text-sm">
                    {[
                      ["Server Overhead", "0.00ms 😴"],
                      ["Privacy Rating", "Grade A+ 🔒"],
                      ["Export Quality", "Lossless ✨"],
                      ["Status", "Online 🟢"],
                      ["Vibes", "Immaculate 🔥"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0">
                        <dt className="text-white/70">{k}</dt>
                        <dd className="font-bold">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
