"use client";

import React, { useState, useRef, useEffect, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from "react";

interface MeshPoint {
  id: string;
  color: string;
  x: number; // 0 to 100
  y: number; // 0 to 100
  size: number; // 10 to 100
}

export default function GradientMesh() {
  const [points, setPoints] = useState<MeshPoint[]>([
    { id: "1", color: "#f97316", x: 20, y: 20, size: 60 },
    { id: "2", color: "#00a2f4", x: 80, y: 40, size: 70 },
    { id: "3", color: "#9d4300", x: 40, y: 80, size: 55 },
    { id: "4", color: "#cde5ff", x: 10, y: 90, size: 65 },
  ]);
  const [selectedPointId, setSelectedPointId] = useState<string>("1");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragInfo = useRef<{ pointId: string } | null>(null);

  const getGradientCss = () => {
    const gradients = points.map(
      (p) => `radial-gradient(circle at ${p.x}% ${p.y}%, ${p.color} 0%, transparent ${p.size}%)`
    );
    return `background-color: #000000;\nbackground-image:\n  ${gradients.join(",\n  ")};`;
  };

  const selectedPoint = points.find((p) => p.id === selectedPointId) || points[0];

  const updateSelectedPoint = (key: keyof MeshPoint, value: string | number) => {
    setPoints((prev) =>
      prev.map((p) => (p.id === selectedPointId ? { ...p, [key]: value } : p))
    );
  };

  const handleAddPoint = () => {
    if (points.length >= 10) return;
    const newId = (Math.max(...points.map((p) => parseInt(p.id)), 0) + 1).toString();
    const newPoint: MeshPoint = {
      id: newId,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"),
      x: Math.floor(Math.random() * 60) + 20,
      y: Math.floor(Math.random() * 60) + 20,
      size: 50,
    };
    setPoints((prev) => [...prev, newPoint]);
    setSelectedPointId(newId);
  };

  const handleRemovePoint = () => {
    if (points.length <= 1) return;
    const remaining = points.filter((p) => p.id !== selectedPointId);
    setPoints(remaining);
    setSelectedPointId(remaining[0].id);
  };

  const handleDragStart = (pointId: string, e: ReactMouseEvent | ReactTouchEvent) => {
    e.stopPropagation();
    setSelectedPointId(pointId);
    dragInfo.current = { pointId };
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!dragInfo.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    let x = ((clientX - rect.left) / rect.width) * 100;
    let y = ((clientY - rect.top) / rect.height) * 100;

    x = Math.max(0, Math.min(100, Math.round(x)));
    y = Math.max(0, Math.min(100, Math.round(y)));

    const activeId = dragInfo.current.pointId;
    setPoints((prev) =>
      prev.map((p) => (p.id === activeId ? { ...p, x, y } : p))
    );
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragInfo.current) return;
    handleDragMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!dragInfo.current || e.touches.length === 0) return;
    handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleDragEnd = () => {
    dragInfo.current = null;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleDragEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  });

  const handleCopyCode = async () => {
    try {
      const cssCode = `.mesh-gradient {\n  ${getGradientCss().replace(/\n/g, "\n  ")}\n}`;
      await navigator.clipboard.writeText(cssCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const getInlineStyle = () => {
    const gradients = points.map(
      (p) => `radial-gradient(circle at ${p.x}% ${p.y}%, ${p.color} 0%, transparent ${p.size}%)`
    );
    return {
      backgroundColor: "#000000",
      backgroundImage: gradients.join(", "),
    };
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl border border-zinc-200/80 bg-white p-6 md:p-8 flex flex-col gap-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-zinc-100 pb-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            CSS Mesh Gradient
          </h2>
          <span className="font-mono text-xs text-zinc-500">
            {points.length}/10 Points
          </span>
        </div>
        <p className="text-xs text-zinc-500">
          Position points to blend radial color nodes into a pure CSS gradient background.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Canvas Area */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div
            ref={containerRef}
            style={getInlineStyle()}
            className="w-full aspect-video md:aspect-4/3 rounded-xl border border-zinc-200/80 relative overflow-hidden shadow-xs cursor-crosshair select-none"
          >
            {/* Draggable Pins */}
            {points.map((p) => {
              const isSelected = selectedPointId === p.id;
              return (
                <div
                  key={p.id}
                  onMouseDown={(e) => handleDragStart(p.id, e)}
                  onTouchStart={(e) => handleDragStart(p.id, e)}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 cursor-grab active:cursor-grabbing flex items-center justify-center transition-transform hover:scale-110 shadow-sm ${
                    isSelected
                      ? "border-zinc-900 bg-white scale-110 z-30 ring-2 ring-zinc-900/10"
                      : "border-white bg-zinc-900/90 z-20"
                  }`}
                >
                  <span
                    style={{ backgroundColor: p.color }}
                    className="w-2.5 h-2.5 rounded-full block"
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[11px] text-zinc-600 px-1">
            <span>Drag pins on canvas to reposition</span>
            <button
              onClick={handleAddPoint}
              disabled={points.length >= 10}
              className="text-zinc-600 hover:text-zinc-900 font-medium disabled:opacity-30 transition-colors"
            >
              + Add point
            </button>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Point Selector */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-zinc-700">Active Point</span>
            <div className="flex flex-wrap gap-1.5">
              {points.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPointId(p.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 border transition-colors ${
                    selectedPointId === p.id
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "border-zinc-200 text-zinc-600 bg-white hover:bg-zinc-50"
                  }`}
                >
                  <span
                    style={{ backgroundColor: p.color }}
                    className="w-2 h-2 rounded-full border border-black/10"
                  />
                  P{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Point Details Box */}
          <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/40 p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-200/60">
              <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide">
                Parameters
              </span>
              <button
                onClick={handleRemovePoint}
                disabled={points.length <= 1}
                className="text-[11px] text-zinc-600 hover:text-red-700 disabled:opacity-30 transition-colors"
              >
                Delete point
              </button>
            </div>

            {/* Color Input */}
            <div className="flex items-center justify-between">
              <label htmlFor="mesh-color" className="text-xs font-medium text-zinc-700">
                Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="mesh-color"
                  type="color"
                  value={selectedPoint?.color || "#000000"}
                  onChange={(e) => updateSelectedPoint("color", e.target.value)}
                  className="w-6 h-6 rounded border border-zinc-200 cursor-pointer p-0 bg-transparent"
                />
                <input
                  type="text"
                  value={selectedPoint?.color || ""}
                  onChange={(e) => updateSelectedPoint("color", e.target.value)}
                  className="w-20 rounded border border-zinc-200 bg-white px-2 py-0.5 font-mono text-xs uppercase text-zinc-800 focus:outline-none focus:border-zinc-900"
                />
              </div>
            </div>

            {/* Spread Slider */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs">
                <label htmlFor="mesh-size" className="text-zinc-600">
                  Radius
                </label>
                <span className="font-mono text-[11px] text-zinc-500">{selectedPoint?.size || 50}%</span>
              </div>
              <input
                id="mesh-size"
                type="range"
                min="10"
                max="120"
                value={selectedPoint?.size || 50}
                onChange={(e) => updateSelectedPoint("size", parseInt(e.target.value))}
                className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900 focus:outline-none"
              />
            </div>

            {/* Coordinate Sliders */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <label htmlFor="mesh-x" className="text-zinc-600">
                    X
                  </label>
                  <span className="font-mono text-[11px] text-zinc-500">{selectedPoint?.x || 0}%</span>
                </div>
                <input
                  id="mesh-x"
                  type="range"
                  min="0"
                  max="100"
                  value={selectedPoint?.x || 0}
                  onChange={(e) => updateSelectedPoint("x", parseInt(e.target.value))}
                  className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <label htmlFor="mesh-y" className="text-zinc-600">
                    Y
                  </label>
                  <span className="font-mono text-[11px] text-zinc-500">{selectedPoint?.y || 0}%</span>
                </div>
                <input
                  id="mesh-y"
                  type="range"
                  min="0"
                  max="100"
                  value={selectedPoint?.y || 0}
                  onChange={(e) => updateSelectedPoint("y", parseInt(e.target.value))}
                  className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Copy Action */}
          <button
            onClick={handleCopyCode}
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-2.5 px-4 rounded-lg text-xs font-medium transition-colors"
          >
            {isCopied ? "Copied" : "Copy CSS"}
          </button>
        </div>
      </div>

      {/* Code Preview Output */}
      <div className="rounded-xl border border-zinc-200/80 overflow-hidden bg-zinc-50/50 font-mono text-[11px]">
        <div className="flex justify-between items-center px-4 py-2 border-b border-zinc-200/60 bg-zinc-50 text-zinc-500">
          <span>CSS Output</span>
          <span className="text-[10px] text-zinc-400">Pure CSS</span>
        </div>
        <pre className="p-4 text-zinc-800 overflow-x-auto whitespace-pre leading-relaxed selection:bg-zinc-200">
{`.mesh-gradient {
  background-color: #000000;
  background-image:
    ${points.map((p) => `radial-gradient(circle at ${p.x}% ${p.y}%, ${p.color} 0%, transparent ${p.size}%)`).join(",\n    ")};
}`}
        </pre>
      </div>
    </div>
  );
}