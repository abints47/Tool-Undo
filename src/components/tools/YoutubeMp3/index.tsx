"use client";

import React, { useState } from "react";

export default function YoutubeMp3() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!url.trim()) {
      setError("Please paste a YouTube URL first!");
      return;
    }

    const isValidYoutube =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)/.test(
        url
      );

    if (!isValidYoutube) {
      setError("Hmm, that doesn't look like a YouTube link. Try again?");
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
        throw new Error(data.error || "Something went wrong!");
      }

      // Extract filename from Content-Disposition header
      const disposition = res.headers.get("Content-Disposition");
      let filename = "youtube-audio.mp3";
      if (disposition) {
        const match = disposition.match(/filename="?([^"]+)"?/);
        if (match) filename = match[1];
      }

      setVideoTitle(filename.replace(".mp3", ""));

      // Trigger download
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
          : "Something went wrong. Try a different video?"
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
    <div className="bg-surface swiss-border rounded-lg p-6 md:p-8 flex flex-col gap-6 w-full max-w-3xl mx-auto shadow-sm">
      <div className="flex flex-col gap-2">
        <h2 className="font-headline-sm text-xl pb-5 text-on-surface flex items-center gap-sm">
          YouTube → MP3 Converter
        </h2>
        <p className="font-body-sm text-body-sm text-secondary">
          Paste any YouTube video link below to extract and download the audio as
          an MP3 file. Fast, simple, and straight from your browser.
        </p>
      </div>

      {/* Input Area */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="yt-url"
            className="font-body-sm text-on-surface font-semibold"
          >
            Paste your YouTube video link here 🔗
          </label>
          <div className="flex gap-3">
            <input
              id="yt-url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSubmit()}
              placeholder="https://youtube.com/watch?v=... or https://youtu.be/..."
              className="flex-1 swiss-border rounded p-3 text-body-sm font-sans swiss-focus bg-surface-container-lowest"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={isLoading || !url.trim()}
            className="bg-[#FFFDF8] border hover:bg-[#64d36d] hover:text-[#166534] border-outline text-[#111827] py-3 px-5 rounded font-label-caps text-label-caps uppercase tracking-wider font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Downloading...
              </span>
            ) : (
              "Get MP3"
            )}
          </button>
          <button
            onClick={handleReset}
            disabled={isLoading}
            className="bg-[#FFFDF8] border hover:bg-[#fda970] hover:text-[#f13404] border-outline text-[#111827] py-3 px-5 rounded font-label-caps text-label-caps uppercase tracking-wider font-semibold transition-all duration-200 disabled:opacity-50"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="border border-red-200 bg-red-50 rounded-lg p-4 flex items-center gap-3 text-red-700 text-sm">
          <span className="material-symbols-outlined text-lg">
            error
          </span>
          {error}
        </div>
      )}

      {/* Success */}
      {videoTitle && !isLoading && !error && (
        <div className="border border-outline-variant rounded-lg p-5 bg-surface-container-low flex flex-col sm:flex-row justify-between items-center gap-4 animate-scale-up">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-500 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <h4 className="font-body-md text-on-surface font-bold">
                Download complete! 🎉
              </h4>
            </div>
            <p className="font-body-sm text-body-sm text-secondary">
              Saved as:{" "}
              <span className="font-bold text-on-surface">{videoTitle}.mp3</span>
            </p>
          </div>
          <button
            onClick={handleReset}
            className="bg-primary-container text-white py-2.5 px-6 rounded font-label-caps text-label-caps uppercase tracking-wider font-bold hover:bg-primary transition-all duration-200 flex items-center gap-xs active:scale-95 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">
              download_done
            </span>
            Convert Another
          </button>
        </div>
      )}
    </div>
  );
}
