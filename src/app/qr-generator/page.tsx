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
  const [isCopied, setIsCopied] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !text.trim()) return;
    QRCode.toCanvas(
      canvasRef.current,
      text,
      { width: size, margin: 2, color: { dark: fgColor, light: bgColor } },
      (error) => error && console.error("QR error:", error)
    );
  }, [text, fgColor, bgColor, size]);

  const handleDownload = () => {
    if (!canvasRef.current || !text.trim()) return;
    const link = document.createElement("a");
    link.href = canvasRef.current.toDataURL("image/png");
    link.download = `qrcode_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyImage = async () => {
    if (!canvasRef.current || !text.trim()) return;
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
      <Header showBackLink={true} backHref="/" />

      <main className="flex-1 py-12 lg:py-16">
        <div className="container-x max-w-4xl">
          {/* Title */}
          <div className="mb-8 flex items-center gap-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white shadow-md">
              <QrCode size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-ink md:text-3xl">QR Code Generator</h1>
              <p className="text-sm text-ink-soft">Make a square that phones love.</p>
            </div>
          </div>

          <div className="card p-6 md:p-8">
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
                  {[
                    ["Code Color 🎨", fgColor, setFgColor],
                    ["Background", bgColor, setBgColor],
                  ].map(([label, val, setter]) => (
                    <div key={label as string}>
                      <label className="mb-2 block text-sm font-semibold text-ink">{label as string}</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={val as string}
                          onChange={(e) => (setter as React.Dispatch<React.SetStateAction<string>>)(e.target.value)}
                          className="h-12 w-12 cursor-pointer rounded-xl border border-line bg-canvas"
                        />
                        <span className="font-mono text-xs uppercase text-ink-faint">{(val as string)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-semibold text-ink">Size 📐</label>
                    <span className="font-mono text-sm font-bold text-brand-600">{size}px</span>
                  </div>
                  <input
                    type="range"
                    min={128}
                    max={512}
                    step={16}
                    value={size}
                    onChange={(e) => setSize(parseInt(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-line accent-brand-600"
                  />
                  <div className="mt-1 flex justify-between text-xs text-ink-faint">
                    <span>128px (cute)</span>
                    <span>512px (confident)</span>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="flex flex-col items-center justify-center">
                <div className="mb-6 rounded-2xl border border-line bg-canvas p-6 shadow-inner">
                  <canvas ref={canvasRef} className="h-auto w-full max-w-[240px] rounded-lg" />
                </div>
                {text.trim() && (
                  <div className="flex w-full flex-col gap-3">
                    <button onClick={handleDownload} className="btn-primary w-full">
                      <Download size={18} /> Download PNG 💾
                    </button>
                    <button onClick={handleCopyImage} className="btn-ghost w-full">
                      {isCopied ? (
                        <><Check size={18} /> Copied! ✅</>
                      ) : (
                        <><Copy size={18} /> Copy Image 📋</>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
