"use client";

import React, { useState, useEffect, useRef } from "react";
import { QrCode, Download, Copy, Check } from "lucide-react";
import QRCode from "qrcode";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function QrGeneratorPage() {
  const [text, setText] = useState("https://toolundo.com");
  const [fgColor, setFgColor] = useState("#0f172a");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(256);
  const [margin, setMargin] = useState(4);
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("H");
  const [isCopied, setIsCopied] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(
      canvasRef.current,
      text.trim() ? text : " ",
      {
        width: size,
        margin: margin,
        color: { dark: fgColor, light: bgColor },
        errorCorrectionLevel: errorLevel,
      },
      (error) => {
        if (error) console.error("QR error:", error);
      }
    );
  }, [text, fgColor, bgColor, size, margin, errorLevel]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.href = canvasRef.current.toDataURL("image/png");
    link.download = `qrcode_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyImage = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        }
      }, "image/png");
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Header />

      <main className="flex-1 py-12 lg:py-16">
        <div className="container-x max-w-4xl mx-auto px-4">
          {/* Title */}
          <div className="mb-8 flex items-center gap-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-fuchsia-500 to-pink-500 text-white shadow-md">
              <QrCode size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-ink md:text-3xl">QR Code Generator</h1>
              <p className="text-sm text-ink-soft">Make a square that phones love.</p>
            </div>
          </div>

          <div className="card p-6 md:p-8 bg-white rounded-2xl shadow-sm border border-line">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Settings */}
              <div className="space-y-6">
                <div>
                  <label htmlFor="qr-text" className="mb-2 block text-sm font-semibold text-ink">
                    What should it say? 🤔
                  </label>
                  <textarea
                    id="qr-text"
                    rows={3}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste a link, a secret message, your grocery list..."
                    className="w-full resize-none rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-soft"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fg-color" className="mb-2 block text-sm font-semibold text-ink">Code Color 🎨</label>
                    <div className="flex items-center gap-3">
                      <input
                        id="fg-color"
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="h-12 w-12 cursor-pointer rounded-xl border border-line bg-canvas p-0"
                      />
                      <span className="font-mono text-xs uppercase text-ink-faint">{fgColor}</span>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="bg-color" className="mb-2 block text-sm font-semibold text-ink">Background</label>
                    <div className="flex items-center gap-3">
                      <input
                        id="bg-color"
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="h-12 w-12 cursor-pointer rounded-xl border border-line bg-canvas p-0"
                      />
                      <span className="font-mono text-xs uppercase text-ink-faint">{bgColor}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label htmlFor="size-range" className="text-sm font-semibold text-ink">Size 📐</label>
                      <span className="font-mono text-sm font-bold text-brand-600">{size}px</span>
                    </div>
                    <input
                      id="size-range"
                      type="range"
                      min={128}
                      max={512}
                      step={16}
                      value={size}
                      onChange={(e) => setSize(parseInt(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-line accent-brand-600"
                    />
                    <div className="mt-1 flex justify-between text-xs text-ink-faint">
                      <span>128px</span>
                      <span>512px</span>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label htmlFor="margin-range" className="text-sm font-semibold text-ink">Margin 🖼️</label>
                      <span className="font-mono text-sm font-bold text-brand-600">{margin}</span>
                    </div>
                    <input
                      id="margin-range"
                      type="range"
                      min={0}
                      max={10}
                      value={margin}
                      onChange={(e) => setMargin(parseInt(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-line accent-brand-600"
                    />
                    <div className="mt-1 flex justify-between text-xs text-ink-faint">
                      <span>0</span>
                      <span>10</span>
                    </div>
                  </div>
                </div>

                {/* Error Correction Level */}
                <div className="space-y-2">
                  <span className="block text-sm font-semibold text-ink">Error Correction Level 🛡️</span>
                  <div className="grid grid-cols-4 gap-2">
                    {(["L", "M", "Q", "H"] as const).map((level) => {
                      const labelMap = { L: "Low (~7%)", M: "Med (~15%)", Q: "Quart (~25%)", H: "High (~30%)" };
                      return (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setErrorLevel(level)}
                          className={`py-2 px-1 text-center rounded-xl text-xs font-semibold border transition-all ${
                            errorLevel === level
                              ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                              : "border-line text-ink-soft bg-canvas hover:bg-line/50"
                          }`}
                        >
                          {labelMap[level]}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-ink-faint leading-tight">
                    Higher levels keep the code readable even if it gets slightly damaged or covered.
                  </p>
                </div>
              </div>

              {/* Preview */}
              <div className="flex flex-col items-center justify-center">
                <div className="mb-6 rounded-2xl border border-line bg-canvas p-6 shadow-inner flex items-center justify-center w-full">
                  <div className="flex flex-col items-center gap-4 w-full">
                    <canvas ref={canvasRef} className="h-auto w-full max-w-60 rounded-lg" />
                    {text.trim() && (
                      <p className="text-xs text-ink-soft text-center break-all max-w-full px-2 line-clamp-2">
                        {text}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex w-full flex-col gap-3">
                  <button onClick={handleDownload} className="btn-primary w-full flex items-center justify-center gap-2">
                    <Download size={18} /> Download PNG 💾
                  </button>
                  <button onClick={handleCopyImage} className="btn-primary w-full flex items-center justify-center gap-2">
                    {isCopied ? (
                      <><Check size={18} /> Copied! ✅</>
                    ) : (
                      <><Copy size={18} /> Copy Image 📋</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}