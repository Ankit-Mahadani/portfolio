import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
              background: "#FF66C4",
              color: "#000000",
              padding: "8px 20px",
              border: "3px solid #000000",
              letterSpacing: 2,
            }}
          >
            AI & AUTOMATION ENGINEER
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 900, letterSpacing: -2, lineHeight: 1, textTransform: "uppercase" }}>
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              color: "#1F2937",
              marginTop: 24,
              maxWidth: 900,
            }}
          >
            {site.description}
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
            {site.wordmark}
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#4B5563" }}>
            NEOBRUTALISM PORTFOLIO
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
