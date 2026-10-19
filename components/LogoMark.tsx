// The BudCompare leaf mark. Shared by the header logo and the generated icons / OG image,
// so it sticks to plain SVG attributes that next/og (Satori) can render.
export const brandColors = { brand: "#0e6650", lime: "#d4ee86", deep: "#083829" };

export default function LogoMark({
  size = 32,
  light = false,
  radius = 10,
  className,
}: {
  size?: number;
  light?: boolean;
  radius?: number;
  className?: string;
}) {
  const bg = light ? brandColors.lime : brandColors.brand;
  const fg = light ? brandColors.deep : brandColors.lime;
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true">
      <rect width="32" height="32" rx={radius} fill={bg} />
      <path d="M9 22c0-7 4.2-12 13-12 0 8.6-5 13-11.8 13" fill="none" stroke={fg} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M9.5 22.5 17 15" stroke={fg} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
