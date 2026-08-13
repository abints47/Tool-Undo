"use client";

import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Upload } from "lucide-react";

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
  accept?: string;
}

export default function UploadArea({
  onFileSelect,
  accept = "image/*",
}: UploadAreaProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`upload-zone cursor-pointer transition-all ${
        isDragOver ? "drag-over" : ""
      }`}
      style={{ width: "405px", height: "140px" }}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept={accept}
        className="hidden"
      />
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <Upload size={28} className="text-[#7B20FF]" />
        <p className="text-sm text-gray-600">
          Click to upload or drag an image
        </p>
        <p className="text-xs text-gray-400">PNG, JPG, JPEG, GIF, BMP, SVG</p>
      </div>
    </div>
  );
}
