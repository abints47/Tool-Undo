import type { Metadata } from "next";
import DocsClient from "@/components/docs/DocsClient";

// Server-render every request (shows up as Dynamic/SSR during `next build`)
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Docs — ToolUndo",
  description:
    "Official documentation for ToolUndo: architecture, getting started, tools overview, privacy and security, and FAQ.",
};

export default function DocsPage() {
  return <DocsClient />;
}
