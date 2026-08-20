import { NextRequest } from "next/server";
import { execFile, spawn } from "child_process";
import { readFile, unlink, mkdir } from "fs/promises";
import { readdirSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

export const dynamic = "force-dynamic";

const YOUTUBE_REGEX =
  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]+)/;

function extractVideoId(input: string): string | null {
  const match = input.trim().match(YOUTUBE_REGEX);
  return match ? match[1] : null;
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^\w\s\-()[\]]/g, "").trim() || "youtube-audio";
}

function getExeAndArgs(extraArgs: string[]): { exe: string; args: string[] } {
  if (process.platform === "win32") {
    return { exe: "python", args: ["-m", "yt_dlp", ...extraArgs] };
  }
  return { exe: "yt-dlp", args: extraArgs };
}

const COMMON_FLAGS = [
  "--js-runtimes", "node",
  "--remote-components", "ejs:github",
  "--no-playlist",
];

function runYtdlp(args: string[], timeoutMs = 30000): Promise<string> {
  return new Promise((resolve, reject) => {
    const { exe, args: fullArgs } = getExeAndArgs(args);
    execFile(exe, fullArgs, { timeout: timeoutMs }, (err, stdout, stderr) => {
      if (err) {
        console.error("[YouTube MP3] title fetch stderr:", stderr);
        reject(err);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

function runYtdlpDownload(args: string[], timeoutMs = 120000): Promise<void> {
  return new Promise((resolve, reject) => {
    const { exe, args: fullArgs } = getExeAndArgs(args);
    console.log(`[YouTube MP3] Spawning: ${exe} ${fullArgs.join(" ").substring(0, 300)}`);

    const child = spawn(exe, fullArgs, {
      stdio: ["pipe", "pipe", "pipe"],
      timeout: timeoutMs,
    });

    let stderrData = "";

    child.stderr?.on("data", (chunk: Buffer) => {
      stderrData += chunk.toString();
      const line = chunk.toString().trim();
      if (line && !line.startsWith("\r")) {
        console.log(`[yt-dlp] ${line.substring(0, 200)}`);
      }
    });

    child.on("error", (err: Error) => {
      console.error("[YouTube MP3] spawn error:", err.message);
      reject(err);
    });

    child.on("close", (code: number | null) => {
      console.log(`[YouTube MP3] yt-dlp exit code: ${code}`);
      if (code !== 0 && code !== null) {
        console.error(`[YouTube MP3] stderr: ${stderrData.substring(0, 500)}`);
        reject(new Error(`yt-dlp failed (code ${code})`));
      } else {
        resolve();
      }
    });
  });
}

export async function POST(request: NextRequest) {
  let tempFilePath: string | null = null;

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

    // Step 1: Get the video title
    let title = "youtube-audio";
    try {
      const titleOutput = await runYtdlp([
        ...COMMON_FLAGS,
        "--print", "title",
        trimmedUrl,
      ]);
      title = sanitizeFilename(titleOutput);
    } catch {
      console.error("[YouTube MP3] Could not fetch title");
    }

    console.log(`[YouTube MP3] Title: "${title}"`);

    // Step 2: Create temp directory
    const tmpDir = join(tmpdir(), "yt-mp3");
    await mkdir(tmpDir, { recursive: true });

    const outputTemplate = join(tmpDir, `${videoId}.%(ext)s`);
    const expectedFile = join(tmpDir, `${videoId}.webm`);

    // Step 3: Download — raw audio, no conversion
    await runYtdlpDownload([
      ...COMMON_FLAGS,
      "--format", "bestaudio",
      "-o", outputTemplate,
      trimmedUrl,
    ]);

    // Step 4: Find the output file
    const allFiles = readdirSync(tmpDir);
    console.log(`[YouTube MP3] Files in tmpDir:`, allFiles.filter(f => f.includes(videoId)));

    const matchingFile = allFiles.find((f) => f.startsWith(`${videoId}.`));

    if (!matchingFile) {
      return Response.json(
        { error: "Download succeeded but no output file found." },
        { status: 500 }
      );
    }

    const foundFile = join(tmpDir, matchingFile);
    tempFilePath = foundFile;

    console.log(`[YouTube MP3] Reading: ${foundFile}`);

    // Step 5: Read the file into a buffer
    const fileBuffer = await readFile(foundFile);
    const fileSize = fileBuffer.length;

    console.log(`[YouTube MP3] File size: ${fileSize} bytes (${(fileSize / 1024 / 1024).toFixed(2)} MB)`);

    if (fileSize === 0) {
      return Response.json(
        { error: "Downloaded file is empty." },
        { status: 500 }
      );
    }

    // Step 6: Determine content type
    const ext = matchingFile.split(".").pop()?.toLowerCase() || "webm";
    const contentTypeMap: Record<string, string> = {
      mp3: "audio/mpeg",
      webm: "audio/webm",
      opus: "audio/opus",
      m4a: "audio/mp4",
      ogg: "audio/ogg",
    };
    const contentType = contentTypeMap[ext] || "audio/webm";

    console.log(`[YouTube MP3] Sending ${fileSize} bytes as ${contentType}`);

    // Step 7: Return the response — file will be cleaned up by OS temp cleanup
    // DO NOT unlink in finally — it runs before the response is sent!
    return new Response(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${title}.${ext}"`,
        "Content-Length": String(fileSize),
        "Cache-Control": "no-store",
      },
    });
  } catch (error: unknown) {
    console.error("[YouTube MP3] Error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to process the video.";
    return Response.json({ error: message }, { status: 500 });
  }
  // Note: NO finally block — temp files are cleaned up by the OS
  // A finally block would run BEFORE the Response body is streamed to the client
}
