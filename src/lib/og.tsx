import { SITE } from "./site";

/** Shared OG image dimensions and content type for all opengraph-image files. */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

/**
 * Shared branded Open Graph image template rendered by every
 * `opengraph-image.tsx` route file via `next/og`.
 */
export function OgImageTemplate(title: string, subtitle: string) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #121110 0%, #1c1917 55%, #2a1405 100%)",
        color: "#faf8f5",
        position: "relative",
      }}
    >
      {/* Decorative glow */}
      <div
        style={{
          position: "absolute",
          top: -180,
          right: -140,
          width: 520,
          height: 520,
          borderRadius: 260,
          background: "radial-gradient(circle, rgba(234,88,12,0.35) 0%, rgba(234,88,12,0) 70%)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -160,
          left: -120,
          width: 460,
          height: 460,
          borderRadius: 230,
          background: "radial-gradient(circle, rgba(245,158,11,0.22) 0%, rgba(245,158,11,0) 70%)",
          display: "flex",
        }}
      />

      {/* Wordmark */}
      <div style={{ display: "flex", alignItems: "center", gap: 22, marginBottom: 30 }}>
        <div
          style={{
            width: 78,
            height: 78,
            borderRadius: 20,
            background: "linear-gradient(135deg, #ea580c, #f59e0b)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 40,
            fontWeight: 800,
          }}
        >
          T
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 800, letterSpacing: -2.5 }}>
          {SITE.name}
          <span style={{ color: "#ea580c" }}>.</span>
        </div>
      </div>

      {/* Page title */}
      <div style={{ display: "flex", fontSize: 52, fontWeight: 700, marginBottom: 26 }}>
        {title}
      </div>

      {/* Subtitle */}
      <div style={{ display: "flex", fontSize: 28, color: "#c4c0b8" }}>{subtitle}</div>
    </div>
  );
}
