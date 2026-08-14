"use client";

import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Image as ImageIcon, Upload, Download, RotateCcw, CheckCircle, AlertCircle } from "lucide-react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function ImageToWebpPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [convertedSize, setConvertedSize] = useState<number | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const processFile = (file: File) => {
    setError(null);
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/bmp", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      setError("Hmm, that's not an image we recognize. Try PNG, JPG, GIF, BMP, or SVG — no PDFs of your cat, please. 🐱");
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setConvertedUrl(null);
    setConvertedSize(null);
    const img = new window.Image();
    img.onload = () => setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    img.src = URL.createObjectURL(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) processFile(e.target.files[0]);
  };
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave = () => setIsDragOver(false);
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) processFile(e.dataTransfer.files[0]);
  };

  const handleConvert = () => {
    if (!selectedFile || !previewUrl) return;
    setIsConverting(true);
    const img = new window.Image();
    img.src = previewUrl;
    img.onload = () => {
      // Fallback for SVGs / images with no intrinsic dimensions
      const width = img.naturalWidth || imageDimensions?.width || 1000;
      const height = img.naturalHeight || imageDimensions?.height || 1000;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) { setError("Canvas went missing. Try a different browser? 🤔"); setIsConverting(false); return; }
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (blob) { setConvertedUrl(URL.createObjectURL(blob)); setConvertedSize(blob.size); }
          else setError("Conversion failed. The image fought back. Try another one?");
          setIsConverting(false);
        },
        "image/webp",
        0.8
      );
    };
    img.onerror = () => { setError("Couldn't load that image. Is it corrupted, or just shy?"); setIsConverting(false); };
  };

  const handleDownload = () => {
    if (!convertedUrl || !selectedFile) return;
    const link = document.createElement("a");
    const originalName = selectedFile.name.substring(0, selectedFile.name.lastIndexOf("."));
    link.href = convertedUrl;
    link.download = `${originalName || "image"}_optimized.webp`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setSelectedFile(null); setPreviewUrl(null); setImageDimensions(null);
    setConvertedUrl(null); setConvertedSize(null); setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const compressionPercentage =
    selectedFile && convertedSize !== null
      ? Math.max(0, Math.round(((selectedFile.size - convertedSize) / selectedFile.size) * 100))
      : 0;

  return (
    <div className="flex min-h-screen flex-col bg-canvas">

      <main className="flex-1 py-12 lg:py-16">
        <div className="container-x max-w-4xl">
          {/* Title */}
          <div className="mb-8 flex items-center gap-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500 text-white shadow-md">
              <ImageIcon size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-ink md:text-3xl">Image → WebP</h1>
              <p className="text-sm text-ink-soft">Shrink it. Ship it. Nobody notices.</p>
            </div>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {!selectedFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`upload-zone flex cursor-pointer flex-col items-center justify-center gap-4 px-6 py-16 text-center ${isDragOver ? "drag-over" : ""}`}
            >
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft">
                <Upload size={30} className="text-brand-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-ink">Drop your image here</p>
                <p className="mt-1 text-sm text-ink-soft">
                  or <span className="font-medium text-brand-600">click to browse</span> — we won&apos;t tell anyone.
                </p>
              </div>
              <p className="text-xs text-ink-faint">PNG, JPG, JPEG, GIF, BMP, SVG — yes, all of them.</p>
            </div>
          ) : (
            <div className="card p-6 md:p-8">
              {/* Preview */}
              <div className="mb-6 flex min-h-55 items-center justify-center overflow-hidden rounded-xl bg-canvas">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl ?? ""} alt={`Preview of ${selectedFile?.name ?? "uploaded image"}`} className="max-h-90 w-auto object-contain" />
              </div>

              {/* Stats grid */}
              <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  ["File Name", selectedFile.name],
                  ["Dimensions", imageDimensions ? `${imageDimensions.width} × ${imageDimensions.height}` : "Loading..."],
                  ["Original", formatSize(selectedFile.size)],
                  ["WebP", convertedSize !== null ? formatSize(convertedSize) : "—"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-canvas p-4">
                    <p className="mb-1 text-xs text-ink-faint">{k}</p>
                    <p className="truncate text-sm font-semibold text-ink" title={String(v)}>{v}</p>
                  </div>
                ))}
              </div>

              {convertedSize !== null && (
                <div className="mb-6 flex items-center gap-4 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle size={24} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-emerald-800">Boom. Done. 🎉</p>
                    <p className="text-sm text-emerald-600">You just saved {compressionPercentage}% — that&apos;s a win in our book.</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                {convertedUrl ? (
                  <>
                    <button onClick={handleDownload} className="btn-primary flex-1">
                      <Download size={18} /> Download WebP
                    </button>
                    <button onClick={handleReset} className="btn-ghost">
                      <RotateCcw size={18} /> Convert Another
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={handleConvert} disabled={isConverting} className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-60">
                      {isConverting ? (
                        <>
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Working our magic...
                        </>
                      ) : (
                        <>
                          <ImageIcon size={18} /> Convert to WebP
                        </>
                      )}
                    </button>
                    <button onClick={handleReset} className="btn-ghost">
                      <RotateCcw size={18} /> Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
