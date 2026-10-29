"use client";

import React, { useState } from "react";

export default function YoutubeMp3() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!url.trim()) {
      setError("Please paste a YouTube URL first.");
      return;
    }

    const isValidYoutube =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)/.test(
        url
      );

    if (!isValidYoutube) {
      setError("Please enter a valid YouTube video or shorts URL.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setVideoTitle(null);

    try {
      const res = await fetch("/api/youtube-mp3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to process audio extraction.");
      }

      const disposition = res.headers.get("Content-Disposition");
      let filename = "youtube-audio.m4a";
      if (disposition) {
        const match = disposition.match(/filename="?([^"]+)"?/);
        if (match) filename = match[1];
      }

      setVideoTitle(filename);

      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please verify the URL and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUrl("");
    setError(null);
    setVideoTitle(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl border border-zinc-200/80 bg-white p-6 md:p-8 flex flex-col gap-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-zinc-100 pb-5">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
          YouTube to MP3
        </h2>
        <p className="text-xs text-zinc-500">
          Extract and download audio tracks directly from any YouTube link.
        </p>
      </div>

      {/* Input & Form Area */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="yt-url" className="text-xs font-medium text-zinc-700">
            Video Link
          </label>
          <div className="flex gap-2">
            <input
              id="yt-url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSubmit()}
              placeholder="https://www.youtube.com/watch?v=..."
              disabled={isLoading}
              className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none transition-colors disabled:opacity-50"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5">
          <button
            onClick={handleSubmit}
            disabled={isLoading || !url.trim()}
            className="flex-1 sm:flex-none bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-white py-2.5 px-5 rounded-lg text-xs font-medium transition-colors"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Processing Audio...
              </span>
            ) : (
              "Extract Audio"
            )}
          </button>
          <button
            onClick={handleReset}
            disabled={isLoading || (!url && !error && !videoTitle)}
            className="border border-zinc-200 hover:bg-zinc-50 disabled:opacity-30 text-zinc-600 py-2.5 px-4 rounded-lg text-xs font-medium transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700 font-medium">
          {error}
        </div>
      )}

      {/* Success Output State */}
      {videoTitle && !isLoading && !error && (
        <div className="border border-zinc-200/80 rounded-xl p-4 bg-zinc-50/70 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col gap-0.5 text-xs min-w-0 flex-1">
            <span className="font-medium text-zinc-900">Download complete</span>
            <span className="text-zinc-500 font-mono truncate" title={videoTitle}>
              {videoTitle}
            </span>
          </div>
          <button
            onClick={handleReset}
            className="w-full sm:w-auto border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 py-2 px-4 rounded-lg text-xs font-medium transition-colors shadow-2xs"
          >
            Convert Another
          </button>
        </div>
      )}
    </div>
  );
}