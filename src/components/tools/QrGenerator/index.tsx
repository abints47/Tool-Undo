"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";

export default function QrGenerator() {
  const [text, setText] = useState<string>("https://toolundo.com");
  const [fgColor, setFgColor] = useState<string>("#09090b");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [size, setSize] = useState<number>(256);
  const [margin, setMargin] = useState<number>(3);
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (!text.trim()) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      return;
    }

    QRCode.toCanvas(
      canvasRef.current,
      text,
      {
        width: size,
        margin: margin,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: errorLevel,
      },
      (error) => {
        if (error) console.error("Error generating QR Code:", error);
      }
    );
  }, [text, fgColor, bgColor, size, margin, errorLevel]);

  const handleDownload = () => {
    if (!canvasRef.current || !text.trim()) return;

    const dataUrl = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
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
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        }
      }, "image/png");
    } catch (err) {
      console.error("Could not copy QR image: ", err);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl border border-zinc-200/80 bg-white p-6 md:p-8 flex flex-col gap-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-zinc-100 pb-5">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
          QR Code Generator
        </h2>
        <p className="text-xs text-zinc-500">
          Create clean, customizable QR codes instantly in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Settings Panel */}
        <div className="md:col-span-7 flex flex-col gap-5">
          {/* Input field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="qr-text" className="text-xs font-medium text-zinc-700">
              Content / URL
            </label>
            <textarea
              id="qr-text"
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste a link or write text..."
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 p-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Color pickers */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5 p-3 rounded-xl border border-zinc-200/80 bg-zinc-50/30">
              <label htmlFor="fg-color" className="text-[11px] font-medium text-zinc-600">
                Code Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="fg-color"
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-6 h-6 rounded border border-zinc-200 cursor-pointer p-0 bg-transparent"
                />
                <span className="font-mono text-xs text-zinc-500 uppercase">{fgColor}</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 p-3 rounded-xl border border-zinc-200/80 bg-zinc-50/30">
              <label htmlFor="bg-color" className="text-[11px] font-medium text-zinc-600">
                Background
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="bg-color"
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-6 h-6 rounded border border-zinc-200 cursor-pointer p-0 bg-transparent"
                />
                <span className="font-mono text-xs text-zinc-500 uppercase">{bgColor}</span>
              </div>
            </div>
          </div>

          {/* Dimension Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="size-slider" className="text-zinc-600">
                  Resolution
                </label>
                <span className="font-mono text-[11px] text-zinc-500">{size}px</span>
              </div>
              <input
                id="size-slider"
                type="range"
                min="128"
                max="512"
                step="16"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="margin-slider" className="text-zinc-600">
                  Padding
                </label>
                <span className="font-mono text-[11px] text-zinc-500">{margin}</span>
              </div>
              <input
                id="margin-slider"
                type="range"
                min="0"
                max="8"
                value={margin}
                onChange={(e) => setMargin(parseInt(e.target.value))}
                className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Error Correction Selection */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-medium text-zinc-600">
              Error Correction
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {(["L", "M", "Q", "H"] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setErrorLevel(level)}
                  className={`py-1.5 text-center rounded-lg text-xs font-mono font-medium border transition-colors ${
                    errorLevel === level
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "border-zinc-200 text-zinc-600 bg-white hover:bg-zinc-50"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Canvas View Area */}
        <div className="md:col-span-5 flex flex-col items-center justify-between gap-5 bg-zinc-50 rounded-xl border border-zinc-200/80 p-5 min-h-[300px]">
          <div className="my-auto flex items-center justify-center p-3 rounded-lg bg-white border border-zinc-200/60 shadow-xs max-w-full">
            <canvas ref={canvasRef} className="max-w-full h-auto max-h-48 object-contain" />
            {!text.trim() && (
              <span className="text-xs text-zinc-400 py-16 text-center block">
                Enter content to preview
              </span>
            )}
          </div>

          <div className="flex gap-2 w-full">
            <button
              onClick={handleDownload}
              disabled={!text.trim()}
              className="flex-1 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 text-white py-2.5 px-3 rounded-lg text-xs font-medium transition-colors"
            >
              Download
            </button>
            <button
              onClick={handleCopyImage}
              disabled={!text.trim()}
              className="border border-zinc-200 hover:bg-white bg-zinc-100 disabled:opacity-30 text-zinc-700 py-2.5 px-3 rounded-lg text-xs font-medium transition-colors"
            >
              {isCopied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}