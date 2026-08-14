"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";

export default function QrGenerator() {
  const [text, setText] = useState<string>("https://toolundo.com");
  const [fgColor, setFgColor] = useState<string>("#0d1c2d"); // Matches on-surface color
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [size, setSize] = useState<number>(256);
  const [margin, setMargin] = useState<number>(4);
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("H");
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
      alert("Failed to copy image! Try downloading it instead.");
    }
  };

  return (
    <div className="bg-surface swiss-border rounded-lg p-6 md:p-8 flex flex-col gap-6 w-full max-w-3xl mx-auto shadow-sm">
      <div className="flex flex-col gap-2">
        <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-sm">
          <span className="material-symbols-outlined text-primary-container">qr_code_2</span>
          QR Code Generator
        </h2>
        <p className="font-body-sm text-body-sm text-secondary">
          Enter any link or text to instantly create custom QR codes with adjustable colors and styles!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Settings Panel */}
        <div className="md:col-span-7 flex flex-col gap-5">
          {/* Input field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="qr-text" className="font-body-sm text-on-surface font-semibold">
              What do you want to encode?
            </label>
            <textarea
              id="qr-text"
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your link or text here..."
              className="w-full swiss-border rounded p-3 text-body-sm font-sans swiss-focus bg-surface-container-lowest resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Foreground Color */}
            <div className="flex flex-col gap-2">
              <label htmlFor="fg-color" className="font-body-sm text-on-surface font-semibold text-xs">
                QR Code Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="fg-color"
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-9 h-9 border border-outline-variant rounded cursor-pointer p-0"
                />
                <span className="font-mono text-xs uppercase text-secondary">{fgColor}</span>
              </div>
            </div>

            {/* Background Color */}
            <div className="flex flex-col gap-2">
              <label htmlFor="bg-color" className="font-body-sm text-on-surface font-semibold text-xs">
                Background Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="bg-color"
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-9 h-9 border border-outline-variant rounded cursor-pointer p-0"
                />
                <span className="font-mono text-xs uppercase text-secondary">{bgColor}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Size Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="size-slider" className="font-body-sm text-on-surface font-semibold">
                  Size Dimension
                </label>
                <span className="font-mono font-bold text-secondary">{size}px</span>
              </div>
              <input
                id="size-slider"
                type="range"
                min="128"
                max="512"
                step="16"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full h-1.5 bg-outline-variant rounded-lg cursor-pointer accent-primary-container"
              />
            </div>

            {/* Margin Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="margin-slider" className="font-body-sm text-on-surface font-semibold">
                  Outer Margin
                </label>
                <span className="font-mono font-bold text-secondary">{margin}</span>
              </div>
              <input
                id="margin-slider"
                type="range"
                min="0"
                max="10"
                value={margin}
                onChange={(e) => setMargin(parseInt(e.target.value))}
                className="w-full h-1.5 bg-outline-variant rounded-lg cursor-pointer accent-primary-container"
              />
            </div>
          </div>

          {/* Error Correction Level */}
          <div className="flex flex-col gap-2">
            <label className="font-body-sm text-on-surface font-semibold text-xs">
              Error Correction Level
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(["L", "M", "Q", "H"] as const).map((level) => {
                const labelMap = { L: "Low (~7%)", M: "Medium (~15%)", Q: "Quart (~25%)", H: "High (~30%)" };
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setErrorLevel(level)}
                    className={`py-2 px-1 text-center rounded text-xs font-semibold border transition-all ${
                      errorLevel === level
                        ? "bg-primary-container text-white border-primary-container shadow-sm"
                        : "border-outline-variant text-secondary bg-surface-container-lowest hover:bg-surface-container-low"
                    }`}
                  >
                    {labelMap[level]}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-secondary leading-tight mt-0.5">
              Higher levels allow the QR code to remain scannable even if parts of it are damaged or obscured.
            </p>
          </div>
        </div>

        {/* Live Canvas View Area */}
        <div className="md:col-span-5 flex flex-col items-center justify-center gap-4 bg-surface-container-low border border-outline-variant rounded-lg p-6 min-h-75">
          <div className="bg-white rounded border border-outline-variant p-2 flex items-center justify-center shadow-inner relative max-w-full overflow-hidden">
            <canvas ref={canvasRef} className="max-w-full h-auto max-h-55 object-contain" />
            {!text.trim() && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white text-secondary/40 font-mono text-sm p-4">
                <span className="material-symbols-outlined text-4xl">qr_code_scanner</span>
                <span>Enter text to preview QR code!</span>
              </div>
            )}
          </div>

          {text.trim() && (
            <div className="flex flex-col gap-2 w-full mt-2">
              <button
                onClick={handleDownload}
                className="w-full bg-primary-container text-white py-2.5 px-4 rounded font-label-caps text-label-caps uppercase tracking-wider font-bold hover:bg-primary transition-all duration-200 active:scale-95 flex items-center justify-center gap-xs shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                Download PNG
              </button>
              <button
                onClick={handleCopyImage}
                className="w-full bg-transparent border border-outline text-secondary py-2.5 px-4 rounded font-label-caps text-label-caps uppercase tracking-wider font-semibold hover:bg-surface-container-lowest hover:text-primary transition-all duration-200 flex items-center justify-center gap-xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isCopied ? "check" : "content_copy"}
                </span>
                {isCopied ? "Copied to Clipboard!" : "Copy Image"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}