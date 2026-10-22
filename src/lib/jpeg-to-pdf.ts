/**
 * Minimal, dependency-free JPG → PDF builder (runs fully in the browser).
 *
 * Builds a valid single-page PDF 1.4 document that embeds the JPEG bytes
 * verbatim via the DCTDecode filter — no re-encoding, no quality loss,
 * no canvas round-trip needed for JPEG sources.
 *
 * Structure produced:
 *   obj 1 — Catalog      obj 2 — Pages
 *   obj 3 — Page         obj 4 — Image XObject
 *   obj 5 — Content stream
 */

const ASCII_ENCODER = new TextEncoder();

function chunkOf(text: string): Uint8Array {
  return ASCII_ENCODER.encode(text);
}

function totalLength(chunks: Uint8Array[]): number {
  return chunks.reduce((sum, c) => sum + c.length, 0);
}

function concat(chunks: Uint8Array[]): Uint8Array<ArrayBuffer> {
  const out = new Uint8Array(new ArrayBuffer(totalLength(chunks)));
  let pos = 0;
  for (const c of chunks) {
    out.set(c, pos);
    pos += c.length;
  }
  return out;
}

/**
 * Build a one-page PDF embedding the given JPEG.
 * @param jpegBytes Raw JPEG file bytes.
 * @param width     Image width in pixels (used as page width in pt).
 * @param height    Image height in pixels (used as page height in pt).
 */
export function jpegBytesToPdf(
  jpegBytes: Uint8Array,
  width: number,
  height: number
): Uint8Array<ArrayBuffer> {
  const w = Math.max(1, Math.round(width));
  const h = Math.max(1, Math.round(height));

  // Sequential build so we can record byte-accurate xref offsets
  const parts: Uint8Array[] = [];
  const offsets: number[] = [];
  let offset = 0;
  const emit = (part: Uint8Array) => {
    parts.push(part);
    offset += part.length;
  };
  const beginObject = () => {
    offsets.push(offset);
  };

  // ── Header ──────────────────────────────────────────────────────────────
  const header = new Uint8Array([
    0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0x0a, // "%PDF-1.4\n"
    0x25, 0xe2, 0xe3, 0xcf, 0xd3, 0x0a, // binary comment line
  ]);
  emit(header);

  // ── obj 1: Catalog ──────────────────────────────────────────────────────
  beginObject();
  emit(chunkOf("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n"));

  // ── obj 2: Pages ────────────────────────────────────────────────────────
  beginObject();
  emit(chunkOf("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n"));

  // ── obj 3: Page ─────────────────────────────────────────────────────────
  beginObject();
  emit(
    chunkOf(
      `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${w} ${h}] ` +
        `/Resources << /XObject << /Im1 4 0 R >> /ProcSet [/PDF /ImageC] >> ` +
        `/Contents 5 0 R >>\nendobj\n`
    )
  );

  // ── obj 4: Image XObject ────────────────────────────────────────────────
  beginObject();
  emit(
    chunkOf(
      `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${w} /Height ${h} ` +
        `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode ` +
        `/Length ${jpegBytes.length} >>\nstream\n`
    )
  );
  emit(jpegBytes);
  emit(chunkOf("\nendstream\nendobj\n"));

  // ── obj 5: Content stream (draw image full-page) ────────────────────────
  const content = chunkOf(`q\n${w} 0 0 ${h} 0 0 cm\n/Im1 Do\nQ\n`);
  beginObject();
  emit(
    chunkOf(
      `5 0 obj\n<< /Length ${content.length} >>\nstream\n`
    )
  );
  emit(content);
  emit(chunkOf("endstream\nendobj\n"));

  // ── xref table ──────────────────────────────────────────────────────────
  const xrefOffset = offset;
  emit(
    chunkOf(
      `xref\n0 6\n0000000000 65535 f \n` +
        offsets
          .map((o) => `${String(o).padStart(10, "0")} 00000 n \n`)
          .join("")
    )
  );

  // ── trailer ─────────────────────────────────────────────────────────────
  emit(
    chunkOf(
      `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`
    )
  );

  return concat(parts);
}

/** Re-encode any image to JPEG bytes via canvas (for PNG/WebP/etc. inputs). */
export async function imageToJpegBytes(
  blobOrUrl: Blob | string,
  quality = 0.92
): Promise<{ bytes: Uint8Array<ArrayBuffer>; width: number; height: number }> {
  const url =
    typeof blobOrUrl === "string" ? blobOrUrl : URL.createObjectURL(blobOrUrl);

  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new window.Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Couldn't load the image."));
      el.src = url;
    });

    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context unavailable.");

    // Flatten transparency onto white so JPEG has no alpha issues
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Couldn't encode JPEG."))),
        "image/jpeg",
        quality
      );
    });

    return {
      bytes: new Uint8Array(await blob.arrayBuffer()),
      width: canvas.width,
      height: canvas.height,
    };
  } finally {
    if (typeof blobOrUrl !== "string") URL.revokeObjectURL(url);
  }
}
