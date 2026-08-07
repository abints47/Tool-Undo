"use client";

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  malayalamQuote: string;
  avatarLetter: string;
}

function TestimonialCard({ name, role, quote, malayalamQuote, avatarLetter }: TestimonialCardProps) {
  return (
    <div className="bg-surface-container-low border border-outline-variant/60 rounded-lg p-6 flex flex-col gap-4 shadow-sm hover:border-primary-container/30 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
          {avatarLetter}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-on-surface leading-none">{name}</span>
          <span className="text-xs text-secondary mt-1">{role}</span>
        </div>
      </div>
      <div className="space-y-1.5 grow">
        <p className="font-mono text-xs text-primary font-bold">💬 &quot;{malayalamQuote}&quot;</p>
        <p className="text-secondary text-sm leading-relaxed">&quot;{quote}&quot;</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const reviews = [
    {
      name: "വിഷ്ണു പ്രസാദ്",
      role: "Frontend Developer",
      avatarLetter: "VP",
      malayalamQuote: "ഇമേജ് കൺവേർട്ടർ വെരി ഫാസ്റ്റ്! 5MB ഉള്ള ഫോട്ടോ ഒരു സെക്കൻഡിൽ WebP ആക്കി തന്നു.",
      quote: "The WebP converter is extremely fast. Shrunk my 5MB assets down in a single browser tick without any upload latency.",
    },
    {
      name: "അഞ്ജന കെ.",
      role: "UI/UX Designer",
      avatarLetter: "AK",
      malayalamQuote: "കളർ കോഡ് വെച്ച് ബ്രാൻഡ് മാച്ച് ചെയ്യാൻ ഇതിലും എളുപ്പമുള്ള ക്യു.ആർ കാണിച്ചിട്ടില്ല.",
      quote: "Color customization on the QR generator makes brand alignments so easy. The clipboard copy feature is super convenient.",
    },
    {
      name: "ഫൈസൽ റഹ്മാൻ",
      role: "Fullstack Engineer",
      avatarLetter: "FR",
      malayalamQuote: "മെഷ് ഗ്രേഡിയന്റ് കളർ പൂരം തന്നെയാണ്! CSS കോപ്പി ചെയ്യാൻ വൺ ക്ലിക്ക് മതി.",
      quote: "The gradient mesh builder is visual poetry. Dragging points directly on the black canvas lets me prototype mesh backgrounds in seconds.",
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto py-lg px-margin-mobile md:px-margin-desktop">
      <div className="text-center space-y-2 mb-lg">
        <span className="text-xs font-label-caps uppercase tracking-widest text-primary font-bold">അഭിപ്രായങ്ങൾ</span>
        <h2 className="font-headline-md text-headline-md text-on-surface">Developer Testimonials</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {reviews.map((rev, index) => (
          <TestimonialCard key={index} {...rev} />
        ))}
      </div>
    </section>
  );
}
