"use client";

import React, { useState } from "react";
import ImageToWebp from "../tools/ImageToWebp";
import QrGenerator from "../tools/QrGenerator";
import GradientMesh from "../tools/GradientMesh";
import YoutubeMp3 from "../tools/YoutubeMp3";
import JpgToPdf from "../tools/JpgToPdf";
import SuggestTool from "../tools/SuggestTool";

interface ToolItem {
  id: string;
  title: string;
  desc: string;
}

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
    id: "jpg-to-pdf",
    title: "JPG → PDF",
    desc: "Convert images into share-ready PDF files instantly in your browser.",
  },
  {
    id: "youtube-mp3",
    title: "YouTube → MP3",
    desc: "Extract and download audio from any YouTube video as an MP3 file.",
  },
];

/**
 * Client island for the interactive part of the Toolbox:
 * switching between the tools grid and an open tool, plus the
 * "Suggest a Tool" modal. Everything around it is server-rendered.
 */
export default function Toolbox() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);

  const scrollToTopOfTools = () => {
    document.getElementById("tools")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
      case "jpg-to-pdf":
        return (
          <svg className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6M9 15h6" />
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

  return (
    <div className="max-w-7xl mx-auto relative z-10">
      {activeTool ? (
        <div className="w-full text-left" data-aos="fade-up" data-aos-once="true">
          <button
            onClick={() => { setActiveTool(null); scrollToTopOfTools(); }}
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
            {activeTool === "jpg-to-pdf" && <JpgToPdf />}
          </div>
        </div>
      ) : (
        <div className="w-full text-left">
          <div className="w-full text-left mb-10 max-w-7xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent block mb-2">
              Toolbox
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-ink mb-3">
              Explore Tools
            </h2>
            <div className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-3xl">
              Scene illa, pure speed! Everything runs privately in your browser.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {TOOLS.map((t, index) => {
              const isYoutube = t.id === "youtube-mp3";
              return (
                <div
                  key={t.id}
                  data-aos="fade-up"
                  data-aos-once="true"
                  data-aos-delay={(index + 1) * 100}
                  onClick={() => { setActiveTool(t.id); scrollToTopOfTools(); }}
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

      {isSuggestOpen && (
        <SuggestTool
          isOpen={isSuggestOpen}
          onClose={() => setIsSuggestOpen(false)}
        />
      )}
    </div>
  );
}
