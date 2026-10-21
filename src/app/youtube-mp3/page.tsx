"use client";

import React from "react";
import { Music, AlertCircle } from "lucide-react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import YoutubeMp3 from "../../components/tools/YoutubeMp3";

export default function YoutubeMp3Page() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Header />

      <main className="flex-1 py-12 lg:py-16">
        <div className="container-x max-w-4xl mx-auto px-4">
          {/* Title */}
          <div className="mb-8 flex items-center gap-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-red-500 to-orange-500 text-white shadow-md">
              <Music size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
                YouTube → MP3
              </h1>
              <p className="text-sm text-ink-soft">
                Extract audio from any YouTube video. Paste, download, done.
              </p>
            </div>
          </div>

          <div className="card p-6 md:p-8 bg-white rounded-2xl shadow-sm border border-line">
            <YoutubeMp3 />
          </div>

          {/* Info section */}
          <div className="mt-8 rounded-2xl border border-line bg-canvas p-6">
            <h3 className="text-lg font-bold text-ink mb-3 flex items-center gap-2">
              <AlertCircle size={20} className="text-accent" />
              How it works
            </h3>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold mt-0.5">1.</span>
                Copy the URL of any YouTube video or Short
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold mt-0.5">2.</span>
                Paste it in the input field above and click &quot;Get MP3&quot;
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold mt-0.5">3.</span>
                The audio will be extracted and downloaded as an MP3 file
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
