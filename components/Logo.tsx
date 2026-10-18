export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <rect width="32" height="32" rx="10" fill={light ? "#d4ee86" : "#0e6650"} />
        <path d="M9 22c0-7 4.2-12 13-12 0 8.6-5 13-11.8 13" fill="none" stroke={light ? "#083829" : "#d4ee86"} strokeWidth="2.2" strokeLinecap="round" />
        <path d="M9.5 22.5 17 15" stroke={light ? "#083829" : "#d4ee86"} strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      <span className={`text-[1.15rem] font-semibold tracking-tight ${light ? "text-white" : "text-ink"}`}>
        Bud<span className={light ? "text-lime" : "text-brand-700"}>Compare</span>
      </span>
    </span>
  );
}
