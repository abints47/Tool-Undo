import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, OgImageTemplate } from "@/lib/og";
import { SITE } from "@/lib/site";

/**
 * Root Open Graph image — shared site banner. Tool routes under app/
 * each have their own opengraph-image.tsx with an accurate title.
 */

export const alt = "ToolUndo — free browser-based developer tools";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return new ImageResponse(
    OgImageTemplate(SITE.title, "Free. Private. Blazing fast — 100% in your browser."),
    size
  );
}
