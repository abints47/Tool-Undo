import ImageToWebpTool from "./ImageToWebpTool";
import { metadataForPath } from "@/lib/page-metadata";

// Server-render every request (shows up as Dynamic/SSR during `next build`)
export const dynamic = "force-dynamic";

export const metadata = metadataForPath("/image-to-webp");

export default function ImageToWebpPage() {
  return <ImageToWebpTool />;
}
