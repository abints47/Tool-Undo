import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, OgImageTemplate } from "@/lib/og";

export const alt = "JPG → PDF Converter | ToolUndo";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return new ImageResponse(OgImageTemplate("JPG → PDF Converter", "Turn images into PDFs in your browser"), size);
}
