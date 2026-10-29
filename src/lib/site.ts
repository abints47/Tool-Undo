/**
 * Central site identity — single source of truth for SEO metadata,
 * sitemap, robots, JSON-LD and OG images.
 * Override with NEXT_PUBLIC_SITE_URL in production (e.g. your custom domain).
 */
export const SITE = {
  name: "ToolUndo",
  handle: "ToolUndo",
  // Pull from env so deployments (custom domain) don't require code changes
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tool-undo.vercel.app",
  title: "ToolUndo — Free Browser-Based Developer Tools",
  description:
    "A free, open-source suite of fast, privacy-first browser utilities: Image → WebP compression, custom QR code generation, CSS mesh gradients, JPG → PDF conversion and YouTube → MP3 extraction. Everything runs 100% locally — zero uploads, zero tracking.",
  keywords: [
    "browser-based tools",
    "developer utilities",
    "image to webp converter",
    "compress images online",
    "qr code generator",
    "custom qr codes",
    "css mesh gradient generator",
    "jpg to pdf converter",
    "youtube to mp3",
    "privacy-first tools",
    "client-side tools",
    "free online tools",
    "offline web tools",
  ],
  author: "Abin",
  authorUrl: "https://github.com/abints47",
  github: "https://github.com/abints47/tool-undo",
  locale: "en_US",
} as const;

export type SiteRoute = {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  /** Sitemap priority (0.0 – 1.0) */
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
};

/** Every public, indexable route on the site. */
export const SITE_ROUTES: SiteRoute[] = [
  {
    path: "/",
    title: SITE.title,
    description: SITE.description,
    priority: 1,
    changeFrequency: "weekly",
  },
  {
    path: "/image-to-webp",
    title: "Image → WebP Converter",
    description:
      "Compress and convert PNG, JPG, GIF, BMP and SVG images to lightweight WebP directly in your browser. Live preview, no uploads, completely private.",
    keywords: ["image to webp", "webp converter", "compress png", "image compression"],
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/qr-generator",
    title: "QR Code Generator",
    description:
      "Generate customizable, high-resolution QR codes with brand colors and error correction levels. Export PNG or copy to clipboard — data never leaves your device.",
    keywords: ["qr code generator", "custom qr code", "colored qr code", "free qr generator"],
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/jpg-to-pdf",
    title: "JPG → PDF Converter",
    description:
      "Turn JPG, PNG, WebP and BMP images into share-ready PDF files entirely in your browser. Page-sized output, lossless embedding, no watermarks.",
    keywords: ["jpg to pdf", "image to pdf", "png to pdf", "pdf converter"],
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/youtube-mp3",
    title: "YouTube → MP3 Downloader",
    description:
      "Extract and download audio from any YouTube video or Short as an MP3 file. Paste the URL, click download — no extensions needed.",
    keywords: ["youtube to mp3", "yt mp3 downloader", "youtube audio extractor"],
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/docs",
    title: "Documentation",
    description:
      "Official ToolUndo documentation: architecture, getting started guide, tools overview, privacy & security model and FAQ.",
    priority: 0.7,
    changeFrequency: "monthly",
  },
];

export const absoluteUrl = (path: string) => `${SITE.url}${path === "/" ? "" : path}`;
