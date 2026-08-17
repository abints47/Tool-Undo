"use client";

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  tagline: string;
  avatarLetter: string;
}

function TestimonialCard({ name, role, quote, tagline, avatarLetter }: TestimonialCardProps) {
  return (
    <div className="group relative bg-warm-white/90 backdrop-blur-sm border border-border/80 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:border-accent/40 hover:-translate-y-2 hover:bg-linear-to-b hover:from-warm-white hover:to-accent-bg/40 transition-all duration-300 overflow-hidden">
      <div className="space-y-4">
        {/* Rating Stars */}
        <div className="flex items-center gap-1 text-amber-500 text-sm">
          {"★".repeat(5)}
        </div>

        {/* Highlight Tagline */}
        <p className="text-xs font-semibold text-accent tracking-wide uppercase transition-colors">
          ⚡ &ldquo;{tagline}&rdquo;
        </p>

        {/* Core Review */}
        <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-border/50">
        <div className="w-11 h-11 rounded-2xl bg-accent-bg/80 border border-accent/20 text-accent flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-accent group-hover:text-warm-white group-hover:shadow-md group-hover:shadow-accent/25 transition-all duration-300">
          {avatarLetter}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-ink tracking-tight">{name}</span>
          <span className="text-xs text-ink-faint mt-0.5">{role}</span>
        </div>
      </div>

      {/* Subtle bottom gradient line accent */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-b-3xl" />
    </div>
  );
}

export default function Testimonials() {
  const reviews = [
    {
      name: "Abin Surendran. ",
      role: "Frontend Developer",
      avatarLetter: "ATS",
      tagline: "Instant client-side speed",
      quote: "The WebP converter is remarkably fast. It compressed 5MB image assets in a single browser frame with zero network delay and complete privacy.",
    },
    {
      name: "Arjun K.",
      role: "UI/UX Designer",
      avatarLetter: "AK",
      tagline: "Seamless brand customization",
      quote: "The color controls on the QR generator make brand integration effortless. Direct clipboard export saves significant time in my design workflow.",
    },
    {
      name: "Sinan M.",
      role: "Fullstack Engineer",
      avatarLetter: "SM",
      tagline: "Intuitive developer workflow",
      quote: "The CSS gradient mesh builder is exceptionally smooth. Dragging coordinate nodes directly on the canvas lets me prototype mesh backgrounds in seconds.",
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-8">
      {/* Header */}
      <div 
        style={{ width: "100%", display: "block", textAlign: "center", marginBottom: "3rem" }}
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-accent block mb-2">
          Community Feedback
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-ink mb-3">
          Loved by Developers & Designers
        </h2>
        <p 
          style={{ 
            display: "block", 
            width: "100%", 
            maxWidth: "680px", 
            minWidth: "280px", 
            margin: "0 auto", 
            whiteSpace: "normal", 
            wordBreak: "normal" 
          }}
          className="text-sm sm:text-base text-ink-muted leading-relaxed"
        >
          Discover how teams streamline their daily development and design workflows with ToolUndo.
        </p>
      </div>

      {/* Grid Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev, index) => (
          <TestimonialCard key={index} {...rev} />
        ))}
      </div>
    </section>
  );
}