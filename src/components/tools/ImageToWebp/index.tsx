"use client";

import React, { useState, useRef, DragEvent, ChangeEvent } from "react";

export default function ImageToWebp() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [convertedSize, setConvertedSize] = useState<number | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG/JPG/WEBP).");
      return;
    }
    if (convertedUrl) URL.revokeObjectURL(convertedUrl);
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setConvertedUrl(null);
    setConvertedSize(null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleConvert = () => {
    if (!selectedFile || !previewUrl) return;

    setIsConverting(true);
    const img = new Image();
    img.src = previewUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        alert("Canvas context could not be initialized.");
        setIsConverting(false);
        return;
      }

      ctx.drawImage(img, 0, 0);

      const webpQuality = quality / 100;
      canvas.toBlob(
        (blob) => {
          if (blob) {
            if (convertedUrl) URL.revokeObjectURL(convertedUrl);
            const url = URL.createObjectURL(blob);
            setConvertedUrl(url);
            setConvertedSize(blob.size);
          } else {
            alert("Could not convert this image.");
          }
          setIsConverting(false);
        },
        "image/webp",
        webpQuality
      );
    };

    img.onerror = () => {
      alert("Failed to load image.");
      setIsConverting(false);
    };
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
    if (convertedUrl) URL.revokeObjectURL(convertedUrl);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setConvertedUrl(null);
    setConvertedSize(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const savingsPct =
    selectedFile && convertedSize !== null
      ? Math.max(0, Math.round(((selectedFile.size - convertedSize) / selectedFile.size) * 100))
      : 0;

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl border border-zinc-200/80 bg-white p-6 md:p-8 flex flex-col gap-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-zinc-100 pb-5">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
          Image to WebP
        </h2>
        <p className="text-xs text-zinc-500">
          Compress and convert PNG or JPG files locally inside your browser.
        </p>
      </div>

      {!selectedFile ? (
        /* Empty State / Dropzone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-150 ${
            isDragOver
              ? "border-zinc-900 bg-zinc-50"
              : "border-zinc-300 hover:border-zinc-400 bg-zinc-50/40"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <p className="text-sm font-medium text-zinc-800">
            Drop your image here, or <span className="underline underline-offset-2">browse</span>
          </p>
          <p className="text-xs text-zinc-400 mt-1">
            PNG, JPEG, WebP, BMP up to 10MB
          </p>
        </div>
      ) : (
        /* Active File Workspace */
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Image Preview */}
            <div className="bg-zinc-50 rounded-xl p-3 flex flex-col items-center justify-center border border-zinc-200/80 h-64 relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl || ""}
                alt="Original preview"
                className="max-h-full max-w-full object-contain rounded"
              />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 text-[11px] rounded border border-zinc-200 font-mono text-zinc-600">
                {formatSize(selectedFile.size)}
              </span>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-5">
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="quality-slider" className="text-zinc-700 font-medium">
                    Compression Quality
                  </label>
                  <span className="font-mono text-zinc-900 font-medium">
                    {quality}%
                  </span>
                </div>
                <input
                  id="quality-slider"
                  type="range"
                  min="5"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                  className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900 focus:outline-none"
                />
                <div className="flex justify-between text-[11px] text-zinc-400">
                  <span>Lower size</span>
                  <span>Higher quality</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5 pt-1">
                <button
                  onClick={handleConvert}
                  disabled={isConverting}
                  className="flex-1 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-white py-2.5 px-4 rounded-lg text-xs font-medium transition-colors"
                >
                  {isConverting ? "Processing..." : "Convert"}
                </button>
                <button
                  onClick={handleReset}
                  className="border border-zinc-200 hover:bg-zinc-50 text-zinc-600 py-2.5 px-4 rounded-lg text-xs font-medium transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Results Comparison Section */}
          {convertedUrl && convertedSize !== null && (
            <div className="border border-zinc-200/80 rounded-xl p-4 bg-zinc-50/70 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col gap-0.5 text-xs">
                <span className="font-medium text-zinc-900">Output ready</span>
                <span className="text-zinc-500">
                  {formatSize(convertedSize)}
                  {savingsPct > 0 && (
                    <span className="text-emerald-600 font-medium ml-1.5">
                      ({savingsPct}% smaller)
                    </span>
                  )}
                </span>
              </div>
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white py-2 px-4 rounded-lg text-xs font-medium transition-colors"
              >
                Download WebP
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}