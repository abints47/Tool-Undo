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
      alert("Please fill in the tool name and description!");
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
    }, 1200);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Widened Modal Dialog Container */}
      <div className="bg-white border border-gray-200 rounded-3xl w-[95vw] sm:w-162.5 md:w-180 max-w-3xl p-6 sm:p-10 shadow-2xl relative z-10 animate-scale-up my-auto max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
            <div className="flex flex-col gap-1.5 pr-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2.5">
                <span>💡</span>
                <span>Suggest a Tool</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Have an idea for a calculator, converter, or utility? Let us know and we'll build it.
              </p>
            </div>

            {/* Grid for Name & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Tool Name Input */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="tool-name" className="text-xs sm:text-sm font-semibold text-gray-800">
                  Tool Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="tool-name"
                  type="text"
                  required
                  value={toolName}
                  onChange={(e) => setToolName(e.target.value)}
                  placeholder="e.g. JSON Formatter, Base64 Converter..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 transition-all"
                />
              </div>

              {/* Category Select */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="tool-category" className="text-xs sm:text-sm font-semibold text-gray-800">
                  Category
                </label>
                <select
                  id="tool-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 transition-all"
                >
                  <option value="Developer Utility">Developer Utility</option>
                  <option value="Image/Media Tool">Image / Media Tool</option>
                  <option value="Format Converter">Format Converter</option>
                  <option value="Text Manipulation">Text Manipulation</option>
                  <option value="Other Utility">Other Utility</option>
                </select>
              </div>
            </div>

            {/* Description Textarea */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="tool-desc" className="text-xs sm:text-sm font-semibold text-gray-800">
                How should it work? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="tool-desc"
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What input should it take? What should the output look like? Describe your vision..."
                className="w-full border border-gray-300 rounded-xl p-4 text-sm text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Contact Email Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="tool-email" className="text-xs sm:text-sm font-semibold text-gray-800 flex items-center gap-1.5">
                <span>Email address</span>
                <span className="text-gray-500 font-normal">(Optional)</span>
              </label>
              <input
                id="tool-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="We'll notify you when it goes live"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 transition-all"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-4 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSending}
                className="px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-600 text-white hover:bg-amber-700 transition-all duration-200 disabled:opacity-50 active:scale-95 flex items-center gap-2 shadow-sm shadow-amber-600/20"
              >
                {isSending ? "Submitting..." : "Submit Suggestion"}
              </button>
            </div>
          </form>
        ) : (
          /* Success State Content */
          <div className="flex flex-col items-center justify-center text-center py-8 gap-5 animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-600">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-6xl font-bold text-gray-900">Thank you!</h3>
              <p className=" text-6xl sm:text-base text-gray-600 max-w-5xl leading-relaxed">
                We've received your suggestion and will look into adding it soon.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="mt-2 bg-amber-600 text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-amber-700 transition-all duration-200 active:scale-95 shadow-lg shadow-amber-600/20"
            >
              Back to Tools
            </button>
          </div>
        )}
      </div>
    </div>
  );
}