"use client";

import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import { jpegBytesToPdf, imageToJpegBytes } from "../../../lib/jpeg-to-pdf";

const MAX_SIZE_BYTES = 10 * 1024 * 1024;

const FORMAT_CHIPS = [
  { label: "JPG", className: "bg-orange-100/80 text-orange-700 border-orange-200" },
  { label: "PNG", className: "bg-sky-100/80 text-sky-700 border-sky-200" },
  { label: "WEBP", className: "bg-violet-100/80 text-violet-700 border-violet-200" },
  { label: "BMP", className: "bg-emerald-100/80 text-emerald-700 border-emerald-200" },
];

export default function JpgToPdf() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [pdfSize, setPdfSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragDepth, setDragDepth] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const loadImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Could not read that image."));
      img.src = url;
    });

  const clearOutputs = () => {
    if (convertedUrl) URL.revokeObjectURL(convertedUrl);
    setConvertedUrl(null);
    setPdfSize(null);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("That is not an image. Please pick a JPG, PNG, WebP or BMP file.");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError("That file is " + formatSize(file.size) + " — the limit is 10MB.");
      return;
    }

    setError(null);
    clearOutputs();

    const url = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(url);

    loadImage(url)
      .then((img) => setDimensions({ width: img.naturalWidth, height: img.naturalHeight }))
      .catch(() => setDimensions(null));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) processFile(e.target.files[0]);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragDepth((d) => d + 1);
    setIsDragOver(true);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragDepth((d) => {
      const next = Math.max(0, d - 1);
      if (next === 0) setIsDragOver(false);
      return next;
    });
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragDepth(0);
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) processFile(e.dataTransfer.files[0]);
  };

  const handleConvert = async () => {
    if (!selectedFile || !previewUrl) return;
    setIsConverting(true);
    setError(null);
    try {
      let jpegBytes: Uint8Array;
      let width: number;
      let height: number;

      if (selectedFile.type === "image/jpeg" || selectedFile.type === "image/jpg") {
        jpegBytes = new Uint8Array(await selectedFile.arrayBuffer());
        const img = await loadImage(previewUrl);
        width = img.naturalWidth;
        height = img.naturalHeight;
      } else {
        const reencoded = await imageToJpegBytes(selectedFile);
        jpegBytes = reencoded.bytes;
        width = reencoded.width;
        height = reencoded.height;
      }

      const pdfBytes = jpegBytesToPdf(jpegBytes, width, height);
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      clearOutputs();
      setConvertedUrl(URL.createObjectURL(blob));
      setPdfSize(blob.size);
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "Conversion failed. Try another image?");
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!convertedUrl || !selectedFile) return;
    const link = document.createElement("a");
    const originalName = selectedFile.name.substring(0, selectedFile.name.lastIndexOf("."));
    link.href = convertedUrl;
    link.download = (originalName || "image") + ".pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    clearOutputs();
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setDimensions(null);
    setError(null);
    setIsDragOver(false);
    setDragDepth(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const extension = (selectedFile?.name.split(".").pop() || "").toUpperCase();

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col items-center text-center mb-7">
        <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-accent via-accent-light to-amber-400 text-white shadow-lg shadow-accent/25 mb-4">
          <span className="material-symbols-outlined text-4xl">picture_as_pdf</span>
          <span className="absolute -right-1.5 -bottom-1.5 h-4 w-4 rounded-full border-2 border-cream bg-emerald-500" />
        </div>

        <h2 className="font-headline-sm text-2xl md:text-3xl font-extrabold tracking-tight text-ink">
          JPG <span className="text-accent">→</span> PDF
        </h2>
        <p className="mt-2 max-w-md text-sm md:text-base text-ink-muted leading-relaxed">
          Drop an image, get a clean PDF back in seconds. The file never leaves your
          device — <span className="font-semibold text-ink-light">zero uploads, zero tracking.</span>
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {[
            ["verified_user", "100% Private"],
            ["bolt", "Instant"],
            ["hd", "Lossless Quality"],
          ].map(([icon, label]) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-warm-white/70 px-3 py-1 text-xs font-semibold text-ink-light"
            >
              <span className="material-symbols-outlined text-sm text-accent">{icon}</span>
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Empty state: drop zone ─────────────────────────────── */}
      {!selectedFile ? (
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
          }}
          role="button"
          tabIndex={0}
          aria-label="Upload an image to convert to PDF"
          className={`group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed p-10 md:p-14 text-center outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
            isDragOver
              ? "scale-[1.01] border-accent bg-accent-bg/60 shadow-xl shadow-accent/10"
              : "border-warm-300 bg-warm-white/60 hover:border-accent/60 hover:bg-warm-50 hover:shadow-lg hover:shadow-warm-300/30"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/jpg,image/png,image/webp,image/bmp"
            className="hidden"
          />

          {/* decorative glow */}
          <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl transition-opacity duration-300 group-hover:opacity-150" />

          <div className="relative flex flex-col items-center">
            <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-warm-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent/40 group-hover:shadow-md">
              <span className="material-symbols-outlined text-5xl text-accent">
                cloud_upload
              </span>
              <span className="absolute -right-2 -bottom-2 flex h-9 w-9 items-center justify-center rounded-xl border-2 border-cream bg-ink text-white shadow-md">
                <span className="material-symbols-outlined text-lg">image</span>
              </span>
            </div>

            <p className="text-lg font-bold tracking-tight text-ink">
              {isDragOver ? "Release to add your image" : "Drop your image here"}
            </p>
            <p className="mt-1.5 text-sm text-ink-muted">
              or <span className="font-semibold text-accent underline decoration-accent/30 underline-offset-4 group-hover:decoration-accent">browse your files</span>
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5">
              {FORMAT_CHIPS.map((chip) => (
                <span
                  key={chip.label}
                  className={`rounded-md border px-2 py-0.5 text-[11px] font-bold tracking-wide ${chip.className}`}
                >
                  {chip.label}
                </span>
              ))}
              <span className="ml-1 text-xs text-ink-faint">up to 10MB</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* ── Selected file: preview + details ─── */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-5 animate-fade-in">
          {/* Preview */}
          <div className="md:col-span-3 overflow-hidden rounded-3xl border border-border bg-warm-white shadow-sm">
            <div className="relative flex h-72 items-center justify-center overflow-hidden bg-warm-50 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl || ""}
                alt={`Preview of ${selectedFile.name}`}
                className="max-h-full max-w-full rounded-lg object-contain shadow-md"
              />
              <span className="absolute left-3 top-3 rounded-full border border-border bg-warm-white/85 px-2.5 py-1 text-[11px] font-bold tracking-wide text-ink backdrop-blur">
                {extension || "IMAGE"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
              <span className="truncate text-sm font-semibold text-ink" title={selectedFile.name}>
                {selectedFile.name}
              </span>
              <span className="shrink-0 rounded-full bg-warm-100 px-2.5 py-0.5 text-xs font-bold text-ink-light">
                {formatSize(selectedFile.size)}
              </span>
            </div>
          </div>

          {/* Details + actions */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="rounded-3xl border border-border bg-warm-white p-5 shadow-sm">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-ink-faint">
                File details
              </h3>
              <dl className="space-y-2.5 text-sm">
                {[
                  ["Format", extension || "Image"],
                  ["Size", formatSize(selectedFile.size)],
                  [
                    "Dimensions",
                    dimensions ? dimensions.width + " × " + dimensions.height + " px" : "Reading…",
                  ],
                  ["Output", "1 page PDF"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-3">
                    <dt className="text-ink-muted">{label}</dt>
                    <dd className="truncate font-semibold text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleConvert}
                disabled={isConverting}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-accent to-accent-light px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-accent/20 transition-all duration-200 hover:shadow-xl hover:shadow-accent/30 hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isConverting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Building PDF…
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg transition-transform duration-300 group-hover:scale-110">
                      picture_as_pdf
                    </span>
                    Convert to PDF
                  </>
                )}
              </button>

              <button
                onClick={handleReset}
                disabled={isConverting}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-warm-white px-5 py-3 text-sm font-bold uppercase tracking-wider text-ink-light transition-all duration-200 hover:border-accent/40 hover:bg-warm-50 hover:text-accent active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-lg">close</span>
                Cancel
              </button>
            </div>

            <p className="flex items-start gap-1.5 text-xs leading-relaxed text-ink-faint">
              <span className="material-symbols-outlined mt-px text-sm">lock</span>
              JPG files are embedded losslessly. Everything runs in your browser.
            </p>
          </div>
        </div>
        {/* ── Result: PDF ready ───────────────────────────────── */}
        {convertedUrl && pdfSize !== null && (
          <div className="mt-5 overflow-hidden rounded-3xl border border-emerald-200 bg-linear-to-br from-emerald-50 to-white p-5 shadow-lg shadow-emerald-100/60 animate-scale-up">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              {/* PDF page visual */}
              <div className="relative flex h-28 w-24 shrink-0 items-center justify-center rounded-xl border border-emerald-200 bg-white shadow-sm">
                <span className="material-symbols-outlined text-5xl text-red-500">picture_as_pdf</span>
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
                  <span className="material-symbols-outlined text-base">check</span>
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-extrabold tracking-tight text-emerald-900">
                  PDF is ready
                </h3>
                <p className="mt-1 text-sm text-emerald-700/80">
                  1 page · {formatSize(pdfSize)} · built locally in your browser
                </p>

                <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                  <button
                    onClick={handleDownload}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-emerald-600/25 transition-all duration-200 hover:bg-emerald-700 active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-lg transition-transform duration-300 group-hover:translate-y-0.5">
                      download
                    </span>
                    Download PDF
                  </button>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-white/70 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-emerald-800 transition-all duration-200 hover:bg-emerald-50 active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-lg">add_photo_alternate</span>
                    Convert Another
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        </>
      )}

      {/* ── Error ─────────────────────────────────────────────── */}
      {error && (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 animate-fade-in">
          <span className="material-symbols-outlined mt-px text-lg text-red-500">error</span>
          <span className="font-medium">{error}</span>
        </div>
      )}
    </div>
  );
}