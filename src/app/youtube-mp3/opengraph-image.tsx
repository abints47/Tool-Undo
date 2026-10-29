import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, OgImageTemplate } from "@/lib/og";

export const alt = "YouTube → MP3 Downloader | ToolUndo";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return new ImageResponse(OgImageTemplate("YouTube → MP3", "Extract audio from any video"), size);
}
