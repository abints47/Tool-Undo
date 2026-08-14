"use client";

import React from "react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-6 py-16 lg:py-24">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Content & Navigation */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">

          <div className="space-y-3">
            <h1 className="text-7xl sm:text-8xl font-black text-on-surface tracking-tight">
              4<span className="text-primary-container">0</span>4
            </h1>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface">
              Aiyo machane! Wrong route aanu! 🛑
            </h2>
            <p className="text-secondary text-base sm:text-lg max-w-4xl leading-relaxed">
              The tool or page you're searching for went for a tea break or completely vanished into thin air. Don't worry, let's get you back safely!
            </p>
          </div>

          {/* Quick Shortcuts / Suggested Tools */}
          <div className="w-full pt-2">
            <p className="text-xs font-mono text-secondary uppercase tracking-wider mb-3">Popular Workshop Shortcuts:</p>
          </div>

        </div>


      </div>
    </div>
  );
}