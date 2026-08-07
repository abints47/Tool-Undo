"use client";

import React, { useState } from "react";

interface FaqItemProps {
  question: string;
  malayalamQuestion: string;
  answer: string;
  malayalamAnswer: string;
}

function FaqItem({ question, malayalamQuestion, answer, malayalamAnswer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-outline-variant/60 py-4 transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-2 font-body-md text-on-surface font-semibold hover:text-primary transition-colors focus:outline-none"
      >
        <span className="flex flex-col gap-0.5">
          <span className="text-sm font-mono text-primary font-bold">{malayalamQuestion}</span>
          <span className="text-base text-on-surface">{question}</span>
        </span>
        <span className="material-symbols-outlined text-secondary transition-transform duration-200">
          {isOpen ? "remove" : "add"}
        </span>
      </button>
      
      {isOpen && (
        <div className="mt-2 pl-2 text-secondary text-sm space-y-2 animate-scale-up">
          <p className="font-semibold text-on-surface-variant font-mono">{malayalamAnswer}</p>
          <p className="leading-relaxed text-secondary">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function Faq() {
  const faqs = [
    {
      malayalamQuestion: "ഇത് ശരിക്കും സൗജന്യമാണോ? സർവർ ചെലവൊന്നും ഇല്ലേ?",
      question: "Is this really free? Are there any hidden costs?",
      malayalamAnswer: "അതെ മച്ചാനേ, ഇത് ഫുൾ ഫ്രീ ആണ്! ഇതിൽ സർവർ അണ്ണൻ ചില്ലിംഗ് ആയതുകൊണ്ട് ഞങ്ങൾക്ക് വലിയ ചെലവൊന്നുമില്ല.",
      answer: "Yes, this toolbox is 100% free with no limits. Because all tools execute inside your browser (client-side), we don't have to pay for cloud processing servers.",
    },
    {
      malayalamQuestion: "എന്റെ ചിത്രങ്ങളും ഫയലുകളും ചോരുമോ? സെക്യൂർ ആണോ?",
      question: "Will my images or input data leak? Is it secure?",
      malayalamAnswer: "ഒരു കുഴപ്പവുമില്ല ജി! ഫയലുകൾ ഒരിടത്തും അപ്‌ലോഡ് ചെയ്യുന്നില്ല. നിന്റെ സിസ്റ്റത്തിൽ മാത്രം നടക്കുന്നു.",
      answer: "Absolutely safe. Your files never touch a remote server. Everything runs locally on your device via browser Canvas and Javascript APIs. You can even use it offline!",
    },
    {
      malayalamQuestion: "എന്തിനാണ് ഇതിൽ മലയാളം എഴുതി വെച്ചിരിക്കുന്നത്?",
      question: "Why is there Malayalam slang on a developer site?",
      malayalamAnswer: "ചുമ്മാ ഒരു രസത്തിന്! എപ്പോഴും ഒരേ കടുപ്പമുള്ള ഇംഗ്ലീഷ് വായിച്ചു ബോറടിക്കുന്ന ഡെവലപ്പർമാർക്ക് ഒരു കുഞ്ഞു തമാശ.",
      answer: "Just for fun! We wanted to add a touch of local Kerala culture and humor to break the monotony of boring, overly corporate tech platforms.",
    },
    {
      malayalamQuestion: "നിങ്ങൾക്ക് പുതിയ ടൂൾ സജസ്റ്റ് ചെയ്യാൻ പറ്റുമോ?",
      question: "Can I request custom features or tools?",
      malayalamAnswer: "തീർച്ചയായും! മുകളിലുള്ള 'Suggest a Tool' ബട്ടൺ ഞെക്കി അടുത്ത പണി എന്താണെന്ന് പറഞ്ഞു തരൂ.",
      answer: "Definitely! Open the 'Suggest a Tool' modal from the dashboard grid and tell us your idea. We regularly build utilities based on community requests.",
    },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto py-lg px-margin-mobile md:px-margin-desktop scroll-mt-20">
      <div className="text-center space-y-2 mb-lg">
        <span className="text-xs font-label-caps uppercase tracking-widest text-primary font-bold">ചില സംശയങ്ങൾ</span>
        <h2 className="font-headline-md text-headline-md text-on-surface">Frequently Asked Questions</h2>
      </div>
      <div className="border border-outline-variant/60 rounded-lg p-6 bg-surface-container-low/40">
        {faqs.map((faq, index) => (
          <FaqItem key={index} {...faq} />
        ))}
      </div>
    </section>
  );
}
