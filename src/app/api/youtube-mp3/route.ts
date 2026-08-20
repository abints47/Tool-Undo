import { NextRequest } from "next/server";
import { execFile } from "child_process";

export const dynamic = "force-dynamic";

const YOUTUBE_REGEX =
  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]+)/;

function extractVideoId(input: string): string | null {
  const match = input.trim().match(YOUTUBE_REGEX);
  return match ? match[1] : null;
}

// Find yt-dlp executable path
function getYtdlpPath(): string {
  // On Windows: python -m yt_dlp
  // On Linux/Mac: yt-dlp or python3 -m yt_dlp
  return process.platform === "win32" ? "python" : "yt-dlp";
}

function getYtdlpArgs(url: string): string[] {
  if (process.platform === "win32") {
    return ["-m", "yt_dlp", ...commonArgs(url)];
  }
  return commonArgs(url);
}

function commonArgs(url: string): string[] {
  return [
    "--extract-audio",
    "--audio-format", "mp3",
    "--audio-quality", "192K",
    "--no-playlist",
    "--no-warnings",
    "--print", "filename:%(title)s.%(ext)s",
    "-o", "-",
    url,
  ];
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^\w\s\-()[\]]/g, "").trim() || "youtube-audio";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const url = body?.url;

    if (!url || typeof url !== "string" || url.trim().length === 0) {
      return Response.json(
        { error: "Please provide a valid YouTube URL." },
        { status: 400 }
      );
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return Response.json(
        { error: "That doesn't look like a valid YouTube video URL." },
        { status: 400 }
      );
    }

    const trimmedUrl = url.trim();

    // First, get the video title
    let title = "youtube-audio";
    try {
      const titleResult = await new Promise<string>((resolve, reject) => {
        const titleArgs =
          process.platform === "win32"
            ? ["-m", "yt_dlp", "--print", "title", "--no-playlist", trimmedUrl]
            : ["--print", "title", "--no-playlist", trimmedUrl];

        execFile(getYtdlpPath(), titleArgs, { timeout: 15000 }, (err, stdout) => {
          if (err) reject(err);
          else resolve(stdout.trim());
        });
      });
      title = sanitizeFilename(titleResult);
    } catch {
      console.error("[YouTube MP3] Could not fetch title, using fallback");
    }

    console.log(`[YouTube MP3] Downloading: ${title} from ${trimmedUrl}`);

    // Run yt-dlp to extract audio and output to stdout
    const exePath = getYtdlpPath();
    const exeArgs = getYtdlpArgs(trimmedUrl);

    const child = require("child_process").spawn(exePath, exeArgs, {
      stdio: ["pipe", "pipe", "pipe"],
      timeout: 120000,
    });

    // Check for early errors
    let stderrData = "";
    child.stderr.on("data", (chunk: Buffer) => {
      stderrData += chunk.toString();
    });

    // If yt-dlp exits with error before streaming starts
    child.on("error", (err: Error) => {
      console.error("[YouTube MP3] spawn error:", err.message);
    });

    child.on("close", (code: number | null) => {
      if (code !== 0 && code !== null) {
        console.error(`[YouTube MP3] yt-dlp exited with code ${code}: ${stderrData}`);
      }
    });

    // Convert Node.js Readable to Web ReadableStream
    const webStream = new ReadableStream({
      start(controller) {
        child.stdout.on("data", (chunk: Buffer) => {
          controller.enqueue(new Uint8Array(chunk));
        });
        child.stdout.on("end", () => {
          controller.close();
        });
        child.stdout.on("error", (err: Error) => {
          controller.error(err);
        });
      },
    });

    return new Response(webStream, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": `attachment; filename="${title}.mp3"`,
      },
    });
  } catch (error: unknown) {
    console.error("[YouTube MP3] Error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to process the video.";
    return Response.json({ error: message }, { status: 500 });
  }
}
