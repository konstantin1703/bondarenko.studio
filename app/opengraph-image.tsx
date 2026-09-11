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
          background: "#050507",
          color: "#f1eee7",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 76% 43%, rgba(218,224,230,.09), transparent 24%), radial-gradient(circle at 71% 49%, rgba(196,166,111,.055), transparent 36%), linear-gradient(112deg, transparent 0%, rgba(235,238,241,.025) 53%, transparent 70%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: "28px",
            display: "flex",
            border: "1px solid rgba(241,238,231,.08)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 118,
            right: -30,
            width: 520,
            height: 390,
            display: "flex",
            borderRadius: "50%",
            transform: "rotate(-13deg)",
            background:
              "linear-gradient(176deg, rgba(35,38,43,.02) 16%, rgba(116,124,134,.18) 39%, rgba(227,230,232,.42) 49%, rgba(93,99,108,.13) 58%, rgba(8,9,11,.02) 78%)",
            border: "1px solid rgba(218,223,228,.10)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 170,
            right: 4,
            width: 450,
            height: 282,
            display: "flex",
            borderRadius: "50%",
            transform: "rotate(-13deg)",
            border: "18px solid rgba(196,201,207,.085)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 215,
            right: 58,
            width: 342,
            height: 184,
            display: "flex",
            borderRadius: "50%",
            transform: "rotate(-13deg)",
            border: "1px solid rgba(196,166,111,.32)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 306,
            right: -20,
            width: 560,
            height: 1,
            display: "flex",
            background:
              "linear-gradient(90deg, transparent, rgba(232,235,238,.18) 22%, rgba(196,166,111,.58) 56%, rgba(232,235,238,.15) 78%, transparent)",
          }}
        />

        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "50px 58px 48px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 17 }}>
              <span style={{ fontSize: 30, lineHeight: 1, fontWeight: 700, letterSpacing: "-0.065em" }}>BND</span>
              <span style={{ fontSize: 10, letterSpacing: "0.20em", color: "rgba(241,238,231,.38)" }}>DIGITAL SYSTEMS</span>
            </div>
            <span style={{ fontSize: 9, letterSpacing: "0.16em", color: "rgba(241,238,231,.30)" }}>SYSTEM / 01</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", width: 770, marginTop: 22 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 15,
                marginBottom: 24,
                color: "rgba(196,166,111,.78)",
                fontSize: 9,
                letterSpacing: "0.17em",
              }}
            >
              <span>STRATEGY / PRODUCT / MEDIA / AUTOMATION</span>
              <span style={{ width: 52, height: 1, background: "rgba(196,166,111,.45)" }} />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 76,
                lineHeight: 0.91,
                letterSpacing: "-0.062em",
                fontWeight: 400,
              }}
            >
              <span>Цифровые системы,</span>
              <span style={{ color: "rgba(241,238,231,.34)" }}>собранные</span>
              <span>в одно целое.</span>
            </div>

            <span
              style={{
                marginTop: 28,
                maxWidth: 610,
                fontSize: 14,
                lineHeight: 1.55,
                color: "rgba(241,238,231,.54)",
              }}
            >
              Сайты, медиа, Telegram, AI и автоматизация как одна цифровая архитектура.
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              borderTop: "1px solid rgba(241,238,231,.10)",
              paddingTop: 17,
              fontSize: 9,
              letterSpacing: "0.14em",
              color: "rgba(241,238,231,.30)",
            }}
          >
            <span>DIAGNOSE</span>
            <span style={{ width: 46, height: 1, background: "rgba(241,238,231,.10)" }} />
            <span>ROUTE</span>
            <span style={{ width: 46, height: 1, background: "rgba(241,238,231,.10)" }} />
            <span>ASSEMBLE</span>
            <span style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(196,166,111,.34), transparent)" }} />
            <span style={{ color: "rgba(196,166,111,.72)" }}>BNDSTUDIO.ART</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
