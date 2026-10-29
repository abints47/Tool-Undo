"use client";

import React, { useState, FormEvent, useEffect } from "react";

interface SuggestToolProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuggestTool({ isOpen, onClose }: SuggestToolProps) {
  const [toolName, setToolName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Developer Utility");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!toolName.trim() || !description.trim()) {
      alert("Please enter a tool name and description.");
      return;
    }

    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
      setToolName("");
      setDescription("");
      setEmail("");
      setCategory("Developer Utility");
    }, 1000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/40 backdrop-blur-xs animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Container - Original dimensions preserved */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl w-[95vw] sm:w-162.5 md:w-180 max-w-3xl p-6 sm:p-10 shadow-xl relative z-10 my-auto max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-700 text-xs font-mono p-1 transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
            {/* Header */}
            <div className="flex flex-col gap-1 border-b border-zinc-100 pb-5 pr-8">
              <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
                Suggest a Tool
              </h2>
              <p className="text-xs text-zinc-500">
                Have an idea for a converter, generator, or developer utility? Let us know.
              </p>
            </div>

            {/* Tool Name & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="tool-name" className="text-xs font-medium text-zinc-700">
                  Tool Name
                </label>
                <input
                  id="tool-name"
                  type="text"
                  required
                  value={toolName}
                  onChange={(e) => setToolName(e.target.value)}
                  placeholder="e.g. JSON Formatter"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="tool-category" className="text-xs font-medium text-zinc-700">
                  Category
                </label>
                <select
                  id="tool-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-zinc-900 focus:bg-white focus:outline-none transition-colors"
                >
                  <option value="Developer Utility">Developer Utility</option>
                  <option value="Image/Media Tool">Image / Media</option>
                  <option value="Format Converter">Format Converter</option>
                  <option value="Text Manipulation">Text Manipulation</option>
                  <option value="Other Utility">Other</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="tool-desc" className="text-xs font-medium text-zinc-700">
                Description & Use Case
              </label>
              <textarea
                id="tool-desc"
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What does it take as input and output? How should it behave?"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 p-3.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="tool-email" className="text-xs font-medium text-zinc-700 flex items-center justify-between">
                <span>Contact Email</span>
                <span className="text-[11px] text-zinc-400 font-normal">Optional</span>
              </label>
              <input
                id="tool-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none transition-colors"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2.5 pt-3 border-t border-zinc-100">
              <button
                type="button"
                onClick={onClose}
                className="border border-zinc-200 hover:bg-zinc-50 text-zinc-600 py-2.5 px-4 rounded-lg text-xs font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSending}
                className="bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-white py-2.5 px-5 rounded-lg text-xs font-medium transition-colors flex items-center gap-2"
              >
                {isSending ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  "Submit Suggestion"
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Success State */
          <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
            <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-800 text-sm">
              ✓
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-zinc-900">Suggestion Received</h3>
              <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
                Thank you! We've received your tool idea and will review it for upcoming releases.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="mt-2 bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-2 rounded-lg text-xs font-medium transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}