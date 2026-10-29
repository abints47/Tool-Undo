import type { Metadata } from "next";
import "aos/dist/aos.css";
import "./globals.css";
import AosProvider from "@/components/layout/AosProvider";

export const metadata: Metadata = {
  title: "ToolUndo — Browser-Based Developer Tools",
  description:
    "Premium collection of fast, private, browser-based utilities. Image compression, QR generation, CSS gradient mesh — all running locally.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
      <AosProvider />
      {children}
    </body>
    </html>
  );
}