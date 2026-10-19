import { ImageResponse } from "next/og";
import LogoMark, { brandColors } from "@/components/LogoMark";
import { siteData } from "@/lib/siteData";

export const alt = `${siteData.name} — ${siteData.tagline}`;
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
          padding: 96,
          background: brandColors.deep,
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <LogoMark size={128} light />
          <div style={{ display: "flex", fontSize: 96, fontWeight: 700, letterSpacing: -2 }}>
            Bud<span style={{ color: brandColors.lime }}>Compare</span>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 48, fontSize: 40, lineHeight: 1.35, color: "#cfe3da", maxWidth: 960 }}>
          {siteData.tagline}
        </div>
      </div>
    ),
    size,
  );
}
