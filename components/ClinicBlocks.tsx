import Link from "next/link";
import { clinicOutboundUrl, getClinic, type Clinic, type ClinicId } from "@/lib/clinicsData";
import { cheapestPlan, eligiblePlans, formatGBP, planCosts } from "@/lib/costCalculator";
import CqcBadge from "./CqcBadge";
import { IconArrowUpRight } from "./Icons";

const yn = (v: boolean | null) => (v === null ? "Not stated" : v ? "Yes" : "No");

/** Live plan pricing for one clinic, from lib/clinicsData.ts */
export function ClinicPricing({ clinicId }: { clinicId: ClinicId }) {
  const clinic = getClinic(clinicId);
  return (
    <div className="not-prose overflow-hidden rounded-3xl border border-line bg-white">
      <div className="flex items-center justify-between gap-3 bg-sand px-5 py-3">
        <p className="text-sm font-semibold text-ink">{clinic.name}: latest verified pricing</p>
        <p className="text-xs text-muted">Checked {clinic.lastPriceCheck}</p>
      </div>
      <ul className="divide-y divide-line">
        {clinic.plans.map((p) => {
          const c = planCosts(p);
          return (
            <li key={p.id} className="grid gap-2 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div>
                <p className="font-semibold text-ink">{p.name}</p>
                <p className="text-sm text-muted">{p.summary}</p>
              </div>
              <dl className="flex gap-4 text-sm tabular-nums">
                {(["year1", "year3", "year5"] as const).map((k, i) => (
                  <div key={k}>
                    <dt className="text-xs text-muted">Year {[1, 3, 5][i]}</dt>
                    <dd className="font-semibold text-ink">{formatGBP(c[k])}</dd>
                  </div>
                ))}
              </dl>
            </li>
          );
        })}
      </ul>
      <p className="border-t border-line px-5 py-3 text-xs text-muted">Estimated clinic fees only. Medication costs are not included.</p>
    </div>
  );
}

/** Side-by-side comparison generated from lib/clinicsData.ts */
export function ClinicCompare({ clinicIds }: { clinicIds: ClinicId[] }) {
  const clinics = clinicIds.map(getClinic);
  const best = (c: Clinic) => {
    const plan = cheapestPlan(eligiblePlans(c, "new", "no"), 1)!;
    return { plan, costs: planCosts(plan) };
  };
  const rows: [string, (c: Clinic) => React.ReactNode][] = [
    ["Pricing options", (c) => c.plans.map((p) => p.name).join(", ")],
    ["Lowest Year 1 clinic cost", (c) => `${formatGBP(best(c).costs.year1)} (${best(c).plan.name})`],
    ["Year 3", (c) => formatGBP(Math.min(...eligiblePlans(c, "new", "no").map((p) => planCosts(p).year3)))],
    ["Year 5", (c) => formatGBP(Math.min(...eligiblePlans(c, "new", "no").map((p) => planCosts(p).year5)))],
    ["Access scheme", (c) => (c.accessSchemePrice ? `${formatGBP(c.accessSchemePrice)} (eligibility applies)` : yn(c.accessScheme))],
    ["Transfer scheme", (c) => (c.transferFee ? `From ${formatGBP(c.transferFee)}` : yn(c.transferScheme))],
    ["Delivery", (c) => (c.freeDelivery ? "Free" : c.deliveryFee ? `Plan dependent (up to ${formatGBP(c.deliveryFee)} per delivery)` : "Not stated")],
    ["Repeat prescription fee", (c) => (c.repeatPrescriptionFee === 0 ? "None advertised" : c.repeatPrescriptionFee === null ? "Not stated" : formatGBP(c.repeatPrescriptionFee))],
    ["Online appointments", (c) => yn(c.onlineAppointments)],
    ["Weekend appointments", (c) => yn(c.weekendAppointments)],
    ["Medication included", (c) => yn(c.medicationIncluded)],
    ["CQC", (c) => <CqcBadge rating={c.cqc.rating} text={c.cqc.displayText} />],
    ["Prices checked", (c) => c.lastPriceCheck],
  ];
  return (
    <div className="not-prose overflow-x-auto rounded-3xl border border-line bg-white">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="bg-sand">
          <tr>
            <th className="px-4 py-3.5 font-semibold text-muted">Feature</th>
            {clinics.map((c) => (
              <th key={c.id} className="px-4 py-3.5 font-semibold text-ink">
                {c.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, fn]) => (
            <tr key={label} className="border-t border-line align-top">
              <td className="px-4 py-3 font-medium text-ink">{label}</td>
              {clinics.map((c) => (
                <td key={c.id} className="px-4 py-3 text-ink/80">
                  {fn(c)}
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t border-line">
            <td className="px-4 py-4" />
            {clinics.map((c) => (
              <td key={c.id} className="px-4 py-4">
                <div className="flex flex-wrap gap-2">
                  <Link href={c.reviewUrl} className="btn rounded-full border border-line px-3.5 py-1.5 text-xs font-semibold text-ink">
                    Read review
                  </Link>
                  <a
                    href={clinicOutboundUrl(c, { subid: "compare-table" })}
                    target="_blank"
                    rel="sponsored noopener"
                    className="btn inline-flex items-center gap-1 rounded-full bg-lime px-3.5 py-1.5 text-xs font-semibold text-brand-950"
                  >
                    Visit <IconArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <p className="border-t border-line px-4 py-3 text-xs text-muted">
        Estimated clinic fees only for new patients. Medication costs are not included.
      </p>
    </div>
  );
}

/** Sidebar card on review pages */
export function ClinicSideCard({ clinicId }: { clinicId: ClinicId }) {
  const clinic = getClinic(clinicId);
  const plans = eligiblePlans(clinic, "new", "no");
  const min = (k: "year1" | "year3" | "year5") => Math.min(...plans.map((p) => planCosts(p)[k]));
  return (
    <div className="rounded-3xl bg-brand-900 p-5 text-white">
      <p className="text-xsr text-white/60">Estimated clinic cost</p>
      <p className="mt-1 text-lg font-semibold">{clinic.name}</p>
      <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
        {(["year1", "year3", "year5"] as const).map((k, i) => (
          <div key={k} className="rounded-xl bg-white/8 px-2 py-2.5 ring-1 ring-white/10">
            <dt className="text-[0.7rem] text-white/60">Year {[1, 3, 5][i]}</dt>
            <dd className="font-semibold tabular-nums text-lime">{formatGBP(min(k))}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4">
        <CqcBadge rating={clinic.cqc.rating} text={clinic.cqc.displayText} />
      </div>
      <a
        href={clinicOutboundUrl(clinic, { subid: "review-sidebar" })}
        target="_blank"
        rel="sponsored noopener"
        className="mt-5 flex items-center justify-center gap-1.5 rounded-full bg-lime py-3 text-sm font-semibold text-brand-950 transition hover:bg-lime-strong"
      >
        Visit clinic <IconArrowUpRight className="h-3.5 w-3.5" />
      </a>
      <p className="mt-3 text-[0.72rem] leading-relaxed text-white/55">
        Estimated clinic fees only. Medication costs are not included. Prices last checked: {clinic.lastPriceCheck}.
      </p>
    </div>
  );
}
