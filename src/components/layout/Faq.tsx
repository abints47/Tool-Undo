"use client";

import React, { useState } from "react";

interface FaqItemProps {
  question: string;
  answer: string;
}

function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`transition-all duration-200 rounded-2xl border ${isOpen ? "border-primary/40 bg-amber-900/10 shadow-sm" : "border-outline-variant/40 bg-surface-container-low/30 hover:border-outline-variant hover:bg-amber-900/10"} overflow-hidden mb-3`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left p-6 font-body-md text-on-surface font-medium hover:text-primary transition-all duration-300 focus:outline-none group cursor-pointer"
      >
        <span className="text-base tracking-wide text-on-surface group-hover:text-primary transition-colors duration-300">
          {question}
        </span>
        <div className={`relative w-8 h-8 flex items-center justify-center transition-transform duration-500 ease-out shrink-0 ml-4 ${isOpen ? "rotate-90 scale-110" : "group-hover:scale-110"}`}>
          <span className={`absolute w-full h-0.5 rounded-full transition-all duration-500 ${isOpen ? "bg-pink-700 rotate-45" : "bg-gray-700 group-hover:bg-accent"}`}></span>
          <span className={`absolute h-full w-0.5 rounded-full transition-all duration-500 ${isOpen ? "bg-gray-700 opacity-0" : "bg-gray-700 group-hover:bg-accent"}`}></span>
        </div>
      </button>
      
      {isOpen && (
        <div className="px-5 pb-5 pt-0 text-secondary text-sm space-y-2 animate-scale-up">
          <p className="leading-relaxed text-secondary">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function Faq() {
  const faqs = [
    {
      question: "Why is there Malayalam slang used on the developer site?",
      answer: "Chumma oru rasathinu! It adds a fun Kerala touch for developers who might otherwise get bored reading serious technical English content all the time.",
    },
    {
      question: "Is this really free? Are there any hidden costs?",
      answer: "Athe machane, ithu 100% free aanu! Since all tools execute client-side right in your browser, cloud processing server-inu extra charges onnum kodukkan venda.",
    },
    {
      question: "Will my images and input files leak? Is it secure?",
      answer: "Oru kuzhappavum illa ji! Your files are never uploaded to any remote server. Ellam ninte device-il thanne browser Canvas-um JavaScript APIs-um use cheythu locally aanu nadakkunnath. You can even use it completely offline!",
    },
    {
      question: "Can I suggest custom features or new tools?",
      answer: "Theerchayayum! Just click the 'Suggest a Tool' button on the dashboard and share your idea. Community requests anusarichu njangal regular aayi puthiya utilities build cheyyunnundu.",
    },
    {
    question: "Is the source code open to the public?",
    answer: "Theerchayayum, code nokkiyal ninte ullil oru dev unarum! The project is fully open-source. You can check out the GitHub repo, fork it, fix bugs, or add your own features, machane!",
  }
  ];

  return (
    <section className="w-full max-w-4xl mx-auto py-lg px-margin-mobile md:px-margin-desktop scroll-mt-20">
      <div className="text-center space-y-2 mb-lg">
        <h2 className="font-headline-md text-headline-md text-on-surface text-3xl">Frequently Asked Questions<span className="text-amber-800 font-semibold"> (FAQ's)</span></h2>
      </div>
      <div className="flex flex-col">
        {faqs.map((faq, index) => (
          <FaqItem key={index} {...faq} />
        ))}
      </div>
    </section>
  );
}