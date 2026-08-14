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
      alert("Machane, this is not an image! Please upload a valid image (PNG/JPG).");
      return;
    }
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
        alert("Aiyo, canvas context not found!");
        setIsConverting(false);
        return;
      }

      ctx.drawImage(img, 0, 0);

      const webpQuality = quality / 100;
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setConvertedUrl(url);
            setConvertedSize(blob.size);
          } else {
            alert("Something went wrong! Couldn't convert the image.");
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
    setSelectedFile(null);
    setPreviewUrl(null);
    setConvertedUrl(null);
    setConvertedSize(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-surface swiss-border rounded-lg p-6 md:p-8 flex flex-col gap-6 w-full max-w-3xl mx-auto shadow-sm">
      <div className="flex flex-col gap-2">
        <h2 className="font-headline-sm text-xl pb-5 text-on-surface flex items-center gap-sm">
          <span className="material-symbols-outlined text- text-primary-container">image</span>
          Image Size Reducer Machine (Image → WebP)
        </h2>
        <p className="font-body-sm text-body-sm text-secondary">
          Shrink your PNG and JPEG files while keeping the original quality. Everything happens right inside your browser,
        </p>
      </div>

      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ${
            isDragOver
              ? "border-primary-container bg-surface-container-low"
              : "border-outline-variant hover:border-primary-container bg-surface-container-lowest"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <span className="material-symbols-outlined text-5xl text-secondary mb-4 opacity-50">
            Image_upload
          </span>
          <p className="font-body-md text-on-surface font-semibold">
            Drop your image here, or <span className="text-primary-container underline">browse it</span>
          </p>
          <p className="font-body-sm text-body-sm text-secondary mt-2">
            PNG, JPEG, static GIFs (Supports up to 10MB)
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Image Preview */}
            <div className="bg-surface-container-low rounded-lg p-4 flex flex-col items-center justify-center border border-outline-variant h-64 relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl || ""}
                alt="Original preview"
                className="max-h-full max-w-full object-contain rounded"
              />
              <span className="absolute top-2 left-2 bg-surface/90 px-2 py-1 text-xs rounded border border-outline-variant font-semibold">
                Current Size: {formatSize(selectedFile.size)}
              </span>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="quality-slider" className="font-body-sm text-on-surface font-semibold">
                    What quality percentage do you <br/> need ?
                  </label>
                  <span className="bg-primary-container/10 text-primary-container px-2 py-0.5 rounded font-mono font-bold text-sm">
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
                  className="w-full h-2 bg-accent-light bg-outline-variant rounded-lg appearance-none cursor-pointer accent-primary-container focus:outline-none"
                />
                <div className="flex justify-between text-xs text-secondary font-mono">
                  <span>5% (Very Low)</span>
                  <span>80% (Ideal)</span>
                  <span>100% (Superb!)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-2">
                <button
                  onClick={handleConvert}
                  disabled={isConverting}
                  className="bg-[#FFFDF8] border hover:bg-[#64d36d] hover:text-[#166534] border-outline text-[#111827] py-3 px-4 rounded font-label-caps text-label-caps uppercase tracking-wider font-semibold hover:bg-surface-container-low transition-all duration-200"
                >
                  {isConverting ? "Converting..." : "Download !"}
                </button>
                <button
                  onClick={handleReset}
                  className="bg-[#FFFDF8] border hover:bg-[#fda970] hover:text-[#f13404] border-outline text-[#111827] py-3 px-4 rounded font-label-caps text-label-caps uppercase tracking-wider font-semibold hover:bg-surface-container-low transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Results Comparison Section */}
          {convertedUrl && convertedSize !== null && (
            <div className="border border-outline-variant rounded-lg p-5 bg-surface-container-low flex flex-col sm:flex-row justify-between items-center gap-4 animate-scale-up">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <svg 
                    className="w-5 h-5 text-green-500 shrink-0" 
                    fill="currentColor" 
                    viewBox="0 0 20 20" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <h4 className="font-body-md text-on-surface font-bold">mission accomplished!</h4>
                </div>
                <p className="font-body-sm text-body-sm text-secondary">
                  New file size: <span className="font-bold text-on-surface">{formatSize(convertedSize)}</span> 
                  {" | "}
                  Saved:{" "}
                  <span className="font-bold text-green-500">
                    {Math.max(0, Math.round(((selectedFile.size - convertedSize) / selectedFile.size) * 100))}% reduced!
                  </span>
                </p>
              </div>
              <button
                onClick={handleDownload}
                className="bg-green-600 text-white py-2.5 px-6 rounded font-label-caps text-label-caps uppercase tracking-wider font-bold hover:bg-green-700 transition-all duration-200 flex items-center gap-xs active:scale-95 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]"> Download WebP! </span>
                
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}