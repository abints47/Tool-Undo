import QrCodeTool from "./QrCodeTool";
import { metadataForPath } from "@/lib/page-metadata";

// Server-render every request (shows up as Dynamic/SSR during `next build`)
export const dynamic = "force-dynamic";

export const metadata = metadataForPath("/qr-generator");

export default function QrGeneratorPage() {
  return <QrCodeTool />;
}
