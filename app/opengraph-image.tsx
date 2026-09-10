import { ImageResponse } from "next/og";

export const alt = "BND Studio — цифровые системы, собранные в одно целое";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#050608",
          color: "#f1f0eb",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 78% 32%, rgba(150,165,190,.22), transparent 28%), linear-gradient(120deg, transparent 0%, rgba(255,255,255,.025) 52%, transparent 72%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "67%",
            width: 1,
            display: "flex",
            background: "rgba(235,240,247,.34)",
            boxShadow: "0 0 48px rgba(190,205,228,.24)",
          }}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "54px 64px 58px",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.06em" }}>BND</span>
            <span style={{ fontSize: 11, letterSpacing: "0.24em", color: "#70757e" }}>DIGITAL SYSTEMS</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 860 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 82,
                lineHeight: 0.92,
                letterSpacing: "-0.065em",
                fontWeight: 500,
              }}
            >
              <span>Цифровые системы,</span>
              <span style={{ color: "#777b82" }}>собранные</span>
              <span>в одно целое.</span>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 34,
                fontSize: 15,
                lineHeight: 1.5,
                color: "#a1a5ad",
                maxWidth: 680,
              }}
            >
              Сайты, медиа, Telegram, AI и автоматизация как одна цифровая архитектура.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(238,240,242,.14)",
              paddingTop: 18,
              fontSize: 11,
              letterSpacing: "0.12em",
              color: "#696d75",
            }}
          >
            <span>BNDSTUDIO.ART</span>
            <span>STRATEGY / PRODUCT / MEDIA / AUTOMATION</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
