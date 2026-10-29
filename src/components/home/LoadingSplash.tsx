"use client";

import React, { useState, useEffect } from "react";

/* ── Custom 5-second Funky Loading Screen (client overlay island) ── */
export default function LoadingSplash() {
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
  const [visible, setVisible] = useState(true);

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

    // 5-second initial loading timer
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => {
      clearInterval(phraseInterval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

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
}
