"use client";

import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import { jpegBytesToPdf, imageToJpegBytes } from "../../../lib/jpeg-to-pdf";

const MAX_SIZE_BYTES = 10 * 1024 * 1024;

export default function JpgToPdf() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [pdfSize, setPdfSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const loadImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Unable to read this image file."));
      img.src = url;
    });

  const clearOutputs = () => {
    if (convertedUrl) URL.revokeObjectURL(convertedUrl);
    setConvertedUrl(null);
    setPdfSize(null);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (JPG, PNG, WebP, or BMP).");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError(`File size (${formatSize(file.size)}) exceeds the 10MB limit.`);
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
      setError(err instanceof Error && err.message ? err.message : "PDF creation failed.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!convertedUrl || !selectedFile) return;
    const link = document.createElement("a");
    const originalName = selectedFile.name.substring(0, selectedFile.name.lastIndexOf("."));
    link.href = convertedUrl;
    link.download = `${originalName || "document"}.pdf`;
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
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl border border-zinc-200/80 bg-white p-6 md:p-8 flex flex-col gap-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-zinc-100 pb-5">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
          JPG to PDF
        </h2>
        <p className="text-xs text-zinc-500">
          Convert images to a single-page PDF document locally in your browser.
        </p>
      </div>

      {!selectedFile ? (
        /* Empty State Dropzone */
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
            accept="image/jpeg,image/jpg,image/png,image/webp,image/bmp"
            className="hidden"
          />
          <p className="text-sm font-medium text-zinc-800">
            Drop your image here, or <span className="underline underline-offset-2">browse</span>
          </p>
          <p className="text-xs text-zinc-400 mt-1">
            JPG, PNG, WebP, or BMP up to 10MB
          </p>
        </div>
      ) : (
        /* Active Preview & Controls */
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Preview Box */}
            <div className="bg-zinc-50 rounded-xl p-3 flex flex-col items-center justify-center border border-zinc-200/80 h-64 relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl || ""}
                alt={selectedFile.name}
                className="max-h-full max-w-full object-contain rounded"
              />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 text-[11px] rounded border border-zinc-200 font-mono text-zinc-600">
                {formatSize(selectedFile.size)}
              </span>
            </div>

            {/* Info and Actions */}
            <div className="flex flex-col justify-between h-full py-1 gap-5">
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-zinc-400 block uppercase">File Name</span>
                  <span className="text-zinc-800 font-sans font-medium text-sm truncate block" title={selectedFile.name}>
                    {selectedFile.name}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-[10px] text-zinc-400 block uppercase">Dimensions</span>
                    <span className="text-zinc-700">
                      {dimensions ? `${dimensions.width} × ${dimensions.height} px` : "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 block uppercase">Output</span>
                    <span className="text-zinc-700">1 Page PDF</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  onClick={handleConvert}
                  disabled={isConverting}
                  className="flex-1 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-white py-2.5 px-4 rounded-lg text-xs font-medium transition-colors"
                >
                  {isConverting ? "Generating..." : "Convert to PDF"}
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

          {/* Error Message */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 font-mono">
              {error}
            </div>
          )}

          {/* Ready State Banner */}
          {convertedUrl && pdfSize !== null && (
            <div className="border border-zinc-200/80 rounded-xl p-4 bg-zinc-50/70 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col gap-0.5 text-xs">
                <span className="font-medium text-zinc-900">PDF Ready</span>
                <span className="text-zinc-500 font-mono">
                  Size: {formatSize(pdfSize)}
                </span>
              </div>
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white py-2 px-4 rounded-lg text-xs font-medium transition-colors"
              >
                Download PDF
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}