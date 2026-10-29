import QrCodeTool from "./QrCodeTool";

// Server-render every request (shows up as Dynamic/SSR during `next build`)
export const dynamic = "force-dynamic";

export default function QrGeneratorPage() {
  return <QrCodeTool />;
}
