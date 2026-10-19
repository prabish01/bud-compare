import { ImageResponse } from "next/og";
import LogoMark from "@/components/LogoMark";

// Apple touch icons (iPhone, iPad, iPad Pro, iPhone Retina). Square corners: iOS applies its own mask.
const sizes = [120, 152, 167, 180];

export function generateImageMetadata() {
  return sizes.map((s) => ({ id: String(s), size: { width: s, height: s }, contentType: "image/png" }));
}

export default async function AppleIcon({ id }: { id: Promise<string> }) {
  const s = Number(await id);
  return new ImageResponse(<LogoMark size={s} radius={0} />, { width: s, height: s });
}
