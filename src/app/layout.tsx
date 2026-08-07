import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToolUndo - Swiss Minimalist Toolbox",
  description: "A collection of simple, powerful browser-based tools: Image to WebP converter, QR Code generator, and CSS Gradient Mesh editor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* We load fonts globally via globals.css @import, so they are always ready */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-background text-on-surface">
        {children}
      </body>
    </html>
  );
}
