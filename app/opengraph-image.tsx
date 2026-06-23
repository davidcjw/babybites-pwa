import { ImageResponse } from "next/og";

// Auto-wires og:image + twitter:image (1200×630) for social previews.
// Plain layout (no custom font / emoji) so it renders deterministically at build.
export const alt = "BabyBites — what to cook for your baby";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#f6f3ec",
          color: "#0a0a0a",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, letterSpacing: 2, color: "#5a5a5a" }}>
          WHAT&apos;S FOR BABY?
        </div>
        <div style={{ display: "flex", fontSize: 132, fontWeight: 800, marginTop: 12 }}>
          BabyBites
        </div>
        <div style={{ display: "flex", fontSize: 40, marginTop: 16, maxWidth: 900, lineHeight: 1.3 }}>
          Randomize age-appropriate baby &amp; toddler recipes — first purées to toddler meals.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            height: 28,
            width: 260,
            background: "#c1f04c",
            border: "3px solid #0a0a0a",
            borderRadius: 999,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
