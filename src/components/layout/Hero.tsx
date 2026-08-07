import React from "react";

interface HeroProps {
  onExploreClick?: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl md:py-30 grid grid-cols-1 md:grid-cols-12 gap-gutter items-center animate-fade-in">
      <div className="md:col-span-8 flex flex-col gap-lg">
        <div className="space-y-md">
          <div className="inline-flex items-center gap-xs px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-mono">
            <span>🔥 സംഗതി കൊള്ളാം, പണി പാളരുത്! (Hope it doesn't break!)</span>
          </div>
          <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg  md:text-display-lg text-3xl text-on-surface tracking-normal leading-none">
            Welcome to <span className="text-primary-container font-extrabold">ToolUndo</span>
          </h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-2xl leading-relaxed">
            വല്യ കാര്യത്തിൽ പണിതുണ്ടാക്കിയതാ! (Made with great effort!) A premium collection of browser-based utilities. 
            Instantly compress images, make custom QR codes, or design beautiful mesh gradients. 
            No server overhead, no data sharing. ചുമ്മാ സീൻ ഇല്ലാതെ ഉപയോഗിക്കാം മച്ചാനേ! 
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-md">
          <button 
            onClick={onExploreClick}
            className="bg-primary-container text-white px-lg py-sm rounded font-label-caps text-label-caps uppercase tracking-widest cursor-pointer hover:bg-primary transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg whitespace-nowrap text-center font-bold"
          >
            ടൂളുകൾ നോക്കാം (Explore Tools)
          </button>
        </div>
      </div>
      <div className="md:col-span-4 hidden md:block">
        {/* Render our premium generated image */}
        <div className="w-full aspect-square rounded-lg border border-outline relative overflow-hidden group shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero_neon_glow.png"
            alt="ToolUndo Neon Art Graphic"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/30 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
