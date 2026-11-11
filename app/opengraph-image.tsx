import { ImageResponse } from "next/og";

export const alt =
  "Sky & Beyond — serveur Minecraft d’exploration aérienne et de guerre de factions.";
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
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#040e19",
          color: "#edf7f8",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-160px",
            right: "-60px",
            width: "620px",
            height: "620px",
            border: "1px solid rgba(79,225,234,0.28)",
            borderRadius: "50%",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "20px",
            width: "440px",
            height: "440px",
            border: "1px solid rgba(79,225,234,0.18)",
            borderRadius: "50%",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "17px",
            letterSpacing: "2.4px",
            color: "#4fe1ea",
            textTransform: "uppercase",
          }}
        >
          <span>Serveur Minecraft</span>
          <span>Exploration aérienne · Factions</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "128px",
              lineHeight: 0.86,
              letterSpacing: "-6px",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            Sky &amp; Beyond
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "30px",
              fontSize: "28px",
              letterSpacing: "-0.4px",
              color: "#4fe1ea",
            }}
          >
            Where the known end.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(237,247,248,0.18)",
            paddingTop: "22px",
            fontSize: "16px",
            letterSpacing: "2.2px",
            color: "#9db2bc",
            textTransform: "uppercase",
          }}
        >
          <span>Construire. Explorer. Tenir.</span>
          <span style={{ color: "#4fe1ea" }}>Sky &amp; Beyond</span>
        </div>
      </div>
    ),
    size,
  );
}
