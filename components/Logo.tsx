import LogoMark from "@/components/LogoMark";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <LogoMark light={light} className="h-8 w-8" />
      <span className={`text-[1.15rem] font-semibold tracking-tight ${light ? "text-white" : "text-ink"}`}>
        Bud<span className={light ? "text-lime" : "text-brand-700"}>Compare</span>
      </span>
    </span>
  );
}
