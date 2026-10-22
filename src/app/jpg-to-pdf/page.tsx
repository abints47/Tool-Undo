"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import JpgToPdf from "../../components/tools/JpgToPdf";

export default function JpgToPdfPage() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Header />

      <main className="flex-1 py-12 lg:py-16">
        <div className="container-x max-w-4xl mx-auto px-4">
          <div className="card p-6 md:p-8 bg-white rounded-2xl shadow-sm border border-line">
            <JpgToPdf />
          </div>

          {/* Info section */}
          <div className="mt-8 rounded-2xl border border-line bg-canvas p-6">
            <h3 className="text-lg font-bold text-ink mb-3 flex items-center gap-2">
              <AlertCircle size={20} className="text-accent" />
              How it works
            </h3>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li>
                1. Upload any image — JPG files are embedded losslessly; PNG,
                WebP and BMP are converted to high-quality JPEG first.
              </li>
              <li>
                2. The PDF is built page-sized to your image entirely in your
                browser — nothing is ever uploaded to a server.
              </li>
              <li>3. Click download and your PDF is saved straight to your device.</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
