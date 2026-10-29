import DocsClient from "@/components/docs/DocsClient";
import { metadataForPath } from "@/lib/page-metadata";

// Server-render every request (shows up as Dynamic/SSR during `next build`)
export const dynamic = "force-dynamic";

export const metadata = metadataForPath("/docs");

export default function DocsPage() {
  return <DocsClient />;
}
