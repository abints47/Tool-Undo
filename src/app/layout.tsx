import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToolUndo — Browser-Based Developer Tools",
  description:
    "Premium collection of fast, private, browser-based utilities. Image compression, QR generation, CSS gradient mesh design — all running locally.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
