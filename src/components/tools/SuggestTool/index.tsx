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
      alert("ടൂളിന്റെ പേരും വിവരങ്ങളും പൂരിപ്പിക്കൂ കൂട്ടുകാരാ!");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="bg-surface border border-outline-variant rounded-lg w-full max-w-lg p-6 md:p-8 shadow-xl relative z-10 animate-scale-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary hover:text-primary-container p-1 rounded-full focus:outline-none transition-colors"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1 pr-8">
              <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary-container">lightbulb</span>
                അടുത്ത പണി എന്താ? (Suggest a Tool)
              </h3>
              <p className="font-body-sm text-body-sm text-secondary">
                നിനക്ക് ആവശ്യമുള്ള എന്തെങ്കിലും കാൽക്കുലേറ്ററോ, കണക്കുകൂട്ടൽ യന്ത്രങ്ങളോ വേണോ? താഴെ എഴുത്, ബാക്കി ഞങ്ങൾ നോക്കാം.
              </p>
            </div>

            {/* Tool Name Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="tool-name" className="font-body-sm text-on-surface font-semibold text-xs">
                ഉണ്ടാക്കേണ്ട ടൂളിന്റെ പേര് <span className="text-error">*</span>
              </label>
              <input
                id="tool-name"
                type="text"
                required
                value={toolName}
                onChange={(e) => setToolName(e.target.value)}
                placeholder="ഉദാഹരണത്തിന്: JSON വടിവൊപ്പിക്കൽ, Base64 മാറ്റിമറിക്കൽ..."
                className="w-full swiss-border rounded px-3 py-2 text-body-sm swiss-focus bg-surface-container-lowest"
              />
            </div>

            {/* Category Select */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="tool-category" className="font-body-sm text-on-surface font-semibold text-xs">
                ഇത് ഏത് വകുപ്പിൽ പെടും? (Category)
              </label>
              <select
                id="tool-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full swiss-border rounded px-3 py-2 text-body-sm swiss-focus bg-surface-container-lowest"
              >
                <option value="Developer Utility">ഡെവലപ്പർ സാധനം</option>
                <option value="Image/Media Tool">പടം / വീഡിയോ ടൂൾ</option>
                <option value="Format Converter">മാറ്റിമറിക്കൽ യന്ത്രം (Converter)</option>
                <option value="Text Manipulation">അക്ഷരക്കളി (Text Editor)</option>
                <option value="Other Utility">മറ്റുള്ളവ</option>
              </select>
            </div>

            {/* Description Textarea */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="tool-desc" className="font-body-sm text-on-surface font-semibold text-xs">
                എന്താണ് ഇത് കൊണ്ട് ചെയ്യേണ്ടത്? <span className="text-error">*</span>
              </label>
              <textarea
                id="tool-desc"
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="എന്ത് ഇൻപുട്ട് കൊടുക്കണം? കൺവേർട്ട് ചെയ്താൽ എന്ത് കിട്ടണം? നിന്റെ സങ്കല്പം ഇവിടെ ടൈപ്പ് ചെയ്യ്..."
                className="w-full swiss-border rounded p-3 text-body-sm swiss-focus bg-surface-container-lowest resize-none"
              />
            </div>

            {/* Contact Email Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="tool-email" className="font-body-sm text-on-surface font-semibold text-xs">
                നിന്റെ ഇമെയിൽ ഐഡി <span className="text-secondary font-normal">(നിർബന്ധമില്ല മച്ചാനേ!)</span>
              </label>
              <input
                id="tool-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ടൂൾ ലൈവ് ആകുമ്പോൾ ഞങ്ങൾ അറിയിക്കാം"
                className="w-full swiss-border rounded px-3 py-2 text-body-sm swiss-focus bg-surface-container-lowest"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded font-label-caps text-label-caps uppercase border border-outline text-secondary hover:bg-surface-container-low transition-colors"
              >
                വേണ്ട മടുത്തു!
              </button>
              <button
                type="submit"
                disabled={isSending}
                className="px-6 py-2.5 rounded font-label-caps text-label-caps uppercase tracking-wider font-bold bg-primary-container text-white hover:bg-primary transition-all duration-200 disabled:opacity-50 active:scale-95 flex items-center gap-xs"
              >
                {isSending && (
                  <span className="animate-spin material-symbols-outlined text-[16px]">sync</span>
                )}
                {isSending ? "അയച്ചുകൊണ്ടിരിക്കുന്നു..." : "അങ്ങ് സമർപ്പിച്ചേക്ക്!"}
              </button>
            </div>
          </form>
        ) : (
          /* Success State Content */
          <div className="flex flex-col items-center justify-center text-center py-6 gap-5 animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-green-900/30 border border-green-500 flex items-center justify-center text-green-500">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">വളരെയധികം നന്ദി മച്ചാനേ!</h3>
              <p className="font-body-md text-secondary max-w-sm">
                സംഗതി ഞങ്ങൾ ഡയറിയിൽ കുറിച്ചിട്ടുണ്ട്. സമയം കിട്ടുമ്പോൾ പണിതു തരാം. അതുവരെ പോയി ചായ കുടിച്ചിട്ട് വാ!
              </p>
            </div>
            <button
              onClick={handleReset}
              className="mt-4 bg-primary-container text-white px-8 py-3 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary transition-all duration-200 active:scale-95 shadow-sm"
            >
              ശരി, തിരികെ പോവാം
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
