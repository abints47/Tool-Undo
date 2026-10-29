import { NextRequest } from "next/server";
import { Ytdl, chooseFormat, Quality, parseVideoId, YtdlError } from "@distube/ytdl-core";
import { Readable } from "stream";

// Must run on the Node.js runtime (no edge/streaming-limits)
export const runtime = "nodejs";
// Give the download enough time — Vercel Hobby/Fluid compute caps at 60s
export const maxDuration = 60;
export const dynamic = "force-dynamic";

/**
 * YouTube bot-checks datacenter IPs (like Vercel's) far more aggressively than
 * residential ones, which is why extraction can work on localhost but fail in
 * production. Two counter-measures:
 *
 * 1. A signed-in session cookie (set `YOUTUBE_COOKIE` in the environment —
 *    a `Cookie:` header string or a Netscape cookie export both work) makes
 *    YouTube treat the request as coming from a real account.
 * 2. When  an anonymous session gets blocked, we throw the instance away and
 *    retry once with a brand-new session (fresh visitor data / blocked-client
 *    list) — a stale, flagged session never recovers on its own.
 */

/** Per-request timeout, tuned to leave room for one retry inside the 60s cap. */
const REQUEST_TIMEOUT_MS = 25_000;

/** Long-lived instance keeps its YouTube session between warm invocations. */
let sharedYtdl = createYtdl();

function createYtdl(): Ytdl {
  const cookie = process.env.YOUTUBE_COOKIE?.trim();
  return new Ytdl({
    ...(cookie ? { cookie } : {}),
    timeoutMs: REQUEST_TIMEOUT_MS,
  });
}

/** Replace a poisoned instance so the next invocation starts clean. */
function resetYtdl(): Ytdl {
  sharedYtdl = createYtdl();
  return sharedYtdl;
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^\w\s\-()[\]]/g, "").trim() || "youtube-audio";
}

const ERROR_MESSAGES: Record<string, string> = {
  PRIVATE: "This video is private and can't be converted.",
  AGE_RESTRICTED: "This video is age-restricted and needs a signed-in account.",
  NOT_FOUND: "That video doesn't exist anymore — it may have been deleted.",
  MEMBERS_ONLY: "This video is for channel members only.",
  PREMIUM_ONLY: "This video needs YouTube Premium or a rental.",
  REGION_BLOCKED: "This video isn't available in the region our server runs in.",
  NOT_STARTED: "This is a scheduled stream or premiere — it hasn't started yet.",
  BOT_CHECK: "YouTube's bot check blocked this request. Please retry in a minute.",
  RATE_LIMITED: "YouTube is rate-limiting our server right now. Please retry in a minute.",
  AUTH_FAILED: "YouTube rejected the server's sign-in cookie. The owner needs to refresh it.",
  PLAYER_SOLVE_FAILED: "Couldn't decode YouTube's player signatures. Please retry later.",
  NO_FORMAT: "No audio stream is available for this video.",
  UNPLAYABLE: "This video is unplayable (removed, region-locked, or live event).",
};

/** GetUser-friendly message for a YtdlError, with defaults by code family. */
function messageFor(error: YtdlError): string {
  return (
    ERROR_MESSAGES[error.code] ??
    (error.code === "REQUEST_FAILED"
      ? "A request to YouTube failed on our server. Please try again."
      : "Couldn't extract audio from this video. Try another one?")
  );
}

/** Compact log of which InnerTube clients/steps failed — invaluable on Vercel. */
function logAttempts(error: YtdlError): void {
  if (error.attempts?.length) {
    for (const a of error.attempts) {
      console.error(`[YouTube MP3] attempt failed: client=${a.client} step=${a.step} code=${a.code} reason=${a.reason}`);
    }
  }
}

/** True when the error means this session/IP is flagged — a fresh session may pass. */
function isSessionBlocked(error: unknown): boolean {
  return (
    YtdlError.is(error, "BOT_CHECK") ||
    YtdlError.is(error, "RATE_LIMITED") ||
    YtdlError.is(error, "AUTH_FAILED") ||
    YtdlError.is(error, "REQUEST_FAILED") ||
    YtdlError.is(error, "PLAYER_SOLVE_FAILED")
  );
}

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

    // Step 1: Resolve video info and the best audio-only format.
    // On a bot-check / rate-limit we retry once with a fresh session —
    // YouTube flags individual sessions, not just whole IPs.
    let info;
    try {
      info = await sharedYtdl.getInfo(url.trim(), { signal: request.signal });
    } catch (error) {
      if (isSessionBlocked(error) && YtdlError.is(error)) {
        console.warn(`[YouTube MP3] lookup blocked (${error.code}) — retrying with a fresh session`);
        logAttempts(error);
        info = await resetYtdl().getInfo(url.trim(), { signal: request.signal });
      } else {
        throw error;
      }
    }

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
    const download = sharedYtdl.download(info, { format, signal: request.signal });

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
    if (YtdlError.is(error)) {
      message = messageFor(error);
      logAttempts(error);
      // A flagged session poisons the shared instance — start fresh next time.
      if (isSessionBlocked(error)) resetYtdl();
    }

    return Response.json({ error: message }, { status: 500 });
  }
}
