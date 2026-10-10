import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAF8F5",
          color: "#000000",
          padding: "72px",
          border: "16px solid #000000",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              fontWeight: 900,
              background: "#00F0FF",
              color: "#000000",
              padding: "8px 20px",
              border: "3px solid #000000",
              letterSpacing: 2,
            }}
          >
            {project?.status.toUpperCase() ?? "PROJECT"}{" // "}{project?.start} — {project?.end === "now" ? "NOW" : project?.end}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 900, letterSpacing: -2, lineHeight: 1, textTransform: "uppercase" }}>
            {project?.title ?? "Ankit Mahadani"}
          </div>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: "#1F2937", marginTop: 24, maxWidth: 900 }}>
            {project?.kicker ?? "AI & Automation Engineer"}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 900,
              background: "#FFE600",
              padding: "6px 16px",
              border: "3px solid #000000",
            }}
          >
            ANKIT.DEV
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#4B5563" }}>
            CASE STUDY
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
