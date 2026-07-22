import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default Open Graph image, generated at request time from the brand tokens.
 * Used site-wide until real product/site photography is available — a
 * generated on-brand card beats a broken or generic stock image reference.
 * Individual routes can override by adding their own opengraph-image.tsx.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#111722",
          color: "#F6F7F9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 10,
              background: "#D62410",
              display: "flex",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 28, fontWeight: 800 }}>Expert Safety</span>
            <span style={{ fontSize: 14, letterSpacing: 4, color: "#9AA5B6" }}>
              SOLUTIONS
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.1 }}>
            Fire Safety & ESH Solutions
          </span>
          <span style={{ fontSize: 24, color: "#C6CDD9" }}>
            Certified · Compliant · Vadodara, Gujarat
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            fontSize: 16,
            letterSpacing: 2,
            color: "#F6F7F9",
          }}
        >
          {["ISO", "BIS", "NFPA", "FIRE DEPT"].map((mark) => (
            <div
              key={mark}
              style={{
                display: "flex",
                border: "1px solid #3A465A",
                borderRadius: 4,
                padding: "6px 12px",
              }}
            >
              {mark}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
