import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, OgImageTemplate } from "@/lib/og";

export const alt = "QR Code Generator | ToolUndo";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return new ImageResponse(OgImageTemplate("QR Code Generator", "Custom, scan-ready codes in seconds"), size);
}
