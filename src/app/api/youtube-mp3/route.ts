import { NextRequest } from "next/server";
import { Ytdl, chooseFormat, Quality, parseVideoId, YtdlError } from "@distube/ytdl-core";
import { Readable } from "stream";

// Must run on the Node.js runtime (no edge/streaming-limits)
export const runtime = "nodejs";
// Give the download enough time — Vercel Hobby/Fluid compute caps at 60s
export const maxDuration = 60;
export const dynamic = "force-dynamic";

// One reusable instance keeps its YouTube session between warm invocations
const yt = new Ytdl();

function sanitizeFilename(name: string): string {
  return name.replace(/[^\w\s\-()[\]]/g, "").trim() || "youtube-audio";
}

const ERROR_MESSAGES: Record<string, string> = {
  PRIVATE: "This video is private and can't be converted.",
  AGE_RESTRICTED: "This video is age-restricted and can't be converted here.",
  NO_FORMAT: "No audio stream is available for this video.",
  UNPLAYABLE: "This video is unplayable (removed, region-locked, or live event).",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const url = body?.url;

    if (!url || typeof url !== "string" || url.trim().length === 0) {
      return Response.json(
        { error: "Please provide a valid YouTube URL." },
        { status: 400 }
      );
    }

    if (parseVideoId(url) === undefined) {
      return Response.json(
        { error: "That doesn't look like a valid YouTube video URL." },
        { status: 400 }
      );
    }

    // Step 1: Resolve video info and the best audio-only format
    const info = await yt.getInfo(url.trim());
    const format = chooseFormat(info.formats, {
      quality: Quality.HighestAudio,
      filter: { hasAudio: true, hasVideo: false },
    });

    if (!format) {
      return Response.json(
        { error: "No audio stream is available for this video." },
        { status: 500 }
      );
    }

    const title = sanitizeFilename(info.videoDetails.title ?? "youtube-audio");
    const container = format.container?.replace(/^\./, "") || "m4a";
    const contentType = format.mimeType?.split(";")[0] || "audio/mp4";

    console.log(`[YouTube MP3] "${title}" -> ${contentType} (${(Number(format.contentLength) / 1048576).toFixed(1)} MB)`);

    // Step 2: Start the download stream and pipe it straight to the client.
    // Streaming keeps memory flat — nothing is buffered in a temp file.
    const download = yt.download(info, { format, signal: request.signal });

    // Surface stream errors in the function logs
    download.on("error", (err: unknown) => {
      console.error("[YouTube MP3] stream error:", err);
    });

    const webStream = Readable.toWeb(download) as unknown as ReadableStream<Uint8Array>;

    return new Response(webStream, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${title}.${container}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error: unknown) {
    console.error("[YouTube MP3] Error:", error);

    let message = "Couldn't extract audio from this video. Try another one?";
    if (error instanceof YtdlError) {
      message = ERROR_MESSAGES[error.code] ?? message;
    } else if (error instanceof Error && error.message.includes("getInfo")) {
      message = "YouTube refused the request. Please try again in a moment.";
    }

    return Response.json({ error: message }, { status: 500 });
  }
}
