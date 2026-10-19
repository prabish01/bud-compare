import { ImageResponse } from "next/og";
import LogoMark from "@/components/LogoMark";

// Browser tab / PWA icons generated from the logo mark at each size.
const sizes = [16, 32, 48, 192, 512];

export function generateImageMetadata() {
  return sizes.map((s) => ({ id: String(s), size: { width: s, height: s }, contentType: "image/png" }));
}

export default async function Icon({ id }: { id: Promise<string> }) {
  const s = Number(await id);
  return new ImageResponse(<LogoMark size={s} />, { width: s, height: s });
}
