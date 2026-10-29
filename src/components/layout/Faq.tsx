"use client";

import React, { useState } from "react";

interface FaqItemProps {
  question: string;
  answer: string;
}

function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`rounded-2xl border transition-colors duration-300 overflow-hidden mb-3.5 ${
        isOpen
          ? "border-zinc-300 bg-white shadow-xs"
          : "border-zinc-200/80 bg-zinc-50/40 hover:border-zinc-300 hover:bg-white"
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left p-5 sm:p-6 focus:outline-none cursor-pointer group select-none"
      >
        <div className="flex items-center gap-3.5 pr-4 min-w-0">
          {/* Status Dot */}
          <span
            className={`w-2 h-2 rounded-full shrink-0 transition-all duration-500 ease-out ${
              isOpen
                ? "bg-zinc-900 scale-125"
                : "bg-zinc-300 group-hover:bg-zinc-500"
            }`}
          />
          <span
            className={`text-base sm:text-lg font-medium tracking-tight transition-colors duration-300 ${
              isOpen ? "text-zinc-900 font-semibold" : "text-zinc-700 group-hover:text-zinc-900"
            }`}
          >
            {question}
          </span>
        </div>

        {/* Morphing Plus-to-Minus Icon with Fluid Ease */}
        <div className="relative w-5 h-5 shrink-0 flex items-center justify-center">
          {/* Horizontal line */}
          <span
            className={`absolute w-4 h-[1.75px] rounded-full bg-zinc-600 group-hover:bg-zinc-900 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
          {/* Vertical line morphs into horizontal / collapses */}
          <span
            className={`absolute h-4 w-[1.75px] rounded-full bg-zinc-600 group-hover:bg-zinc-900 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen ? "rotate-90 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"
            }`}
          />
        </div>
      </button>

      {/* Accordion Expand / Collapse with Cubic Easing */}
      <div
        className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`px-5 sm:px-6 pb-6 pt-0 text-sm sm:text-base text-zinc-600 leading-relaxed pl-10.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen ? "translate-y-0" : "-translate-y-2"
            }`}
          >
            <div className="border-t border-zinc-100 pt-3.5">
              {answer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const faqs = [
    {
      question: "Why is there Malayalam slang used on the developer site?",
      answer:
        "Chumma oru rasathinu! It adds a fun Kerala touch for developers who might otherwise get bored reading serious technical English content all the time.",
    },
    {
      question: "Is this really free? Are there any hidden costs?",
      answer:
        "Athe machane, ithu 100% free aanu! Since all tools execute client-side right in your browser, cloud processing server-inu extra charges onnum kodukkan venda.",
    },
    {
      question: "Will my images and input files leak? Is it secure?",
      answer:
        "Oru kuzhappavum illa ji! Your files are never uploaded to any remote server. Ellam ninte device-il thanne browser Canvas-um JavaScript APIs-um use cheythu locally aanu nadakkunnath. You can even use it completely offline!",
    },
    {
      question: "Can I suggest custom features or new tools?",
      answer:
        "Theerchayayum! Just click the 'Suggest a Tool' button on the dashboard and share your idea. Community requests anusarichu njangal regular aayi puthiya utilities build cheyyunnundu.",
    },
    {
      question: "Is the source code open to the public?",
      answer:
        "Theerchayayum, code nokkiyal ninte ullil oru dev unarum! The project is fully open-source. You can check out the GitHub repo, fork it, fix bugs, or add your own features, machane!",
    },
  ];

  return (
    <section className="w-full max-w-3xl mx-auto py-10 px-4 scroll-mt-20">
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-zinc-500">
          Common questions about privacy, architecture, and features.
        </p>
      </div>

      <div className="flex flex-col">
        {faqs.map((faq, index) => (
          <FaqItem key={index} {...faq} />
        ))}
      </div>
    </section>
  );
}