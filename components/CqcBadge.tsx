import type { CqcRating } from "@/lib/clinicsData";

const styles: Record<CqcRating, string> = {
  Outstanding: "bg-brand-100 text-brand-800 ring-brand-600/20",
  Good: "bg-brand-100 text-brand-800 ring-brand-600/20",
  "Not yet inspected": "bg-sand text-ink/75 ring-ink/10",
  "Requires Improvement": "bg-amber-soft text-amber ring-amber/25",
  Inadequate: "bg-red-50 text-red-700 ring-red-600/20",
};

export default function CqcBadge({ rating, text }: { rating: CqcRating; text?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${styles[rating]}`}>
      CQC: {text ?? rating}
    </span>
  );
}
