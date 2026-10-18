"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { clinicOutboundUrl, clinicsData, type Clinic, type ClinicPlan } from "@/lib/clinicsData";
import { comparisonTool as copy } from "@/lib/compareClinicsData";
import {
  CQC_ORDER,
  cheapestPlan,
  eligiblePlans,
  formatGBP,
  planCost,
  planCosts,
  planUpfront,
  type AccessAnswer,
  type PatientType,
  type Period,
} from "@/lib/costCalculator";
import { track } from "@/lib/analytics";
import { IconArrow, IconArrowUpRight, IconCheck, IconInfo } from "./Icons";

type Priority = (typeof copy.priorities.options)[number]["value"];
type SortKey = (typeof copy.sortOptions)[number]["value"];

type Row = {
  clinic: Clinic;
  plan: ClinicPlan;
  costs: { year1: number; year3: number; year5: number; upfront: number };
  accessAlternative?: { plan: ClinicPlan; cost: number };
};

const yearKey = (p: Period) => (`year${p}` as const);

function features(clinic: Clinic, plan: ClinicPlan) {
  return [
    { ok: plan.deliveryPerMonth === 0 && clinic.freeDelivery !== false, label: plan.deliveryPerMonth === 0 ? "Free delivery" : `Delivery ${formatGBP(plan.deliveryPerMonth)}` },
    { ok: clinic.onlineAppointments === true, label: "Online appointments" },
    { ok: clinic.weekendAppointments === true, label: clinic.weekendAppointments === null ? "Weekend appointments: not stated" : "Weekend appointments" },
    { ok: clinic.repeatPrescriptionFee === 0, label: "No repeat prescription fee" },
    { ok: clinic.transferScheme === true, label: clinic.transferScheme ? "Transfer scheme" : "Transfer scheme: not stated" },
  ];
}

export default function ComparisonTool() {
  const [patientType, setPatientType] = useState<PatientType>("new");
  const [access, setAccess] = useState<AccessAnswer>("no");
  const [period, setPeriod] = useState<Period>(1);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [sort, setSort] = useState<SortKey>("year1");
  const [openCqc, setOpenCqc] = useState<string | null>(null);

  const { rows, hidden } = useMemo(() => {
    const want = (p: Priority) => priorities.includes(p);
    const rows: Row[] = [];
    let hidden = 0;
    for (const clinic of clinicsData) {
      let plans = eligiblePlans(clinic, patientType, access);
      if (want("noSubscription")) plans = plans.filter((p) => p.monthly === 0);
      if (want("freeDelivery")) plans = plans.filter((p) => p.deliveryPerMonth === 0 && clinic.freeDelivery !== false);
      const clinicOk =
        (!want("payg") || clinic.plans.some((p) => p.payg)) &&
        (!want("weekend") || clinic.weekendAppointments === true) &&
        (!want("accessScheme") || clinic.accessScheme === true) &&
        (!want("transferScheme") || clinic.transferScheme === true);
      if (!plans.length || !clinicOk) {
        hidden++;
        continue;
      }
      const plan =
        want("lowestUpfront") && !want("lowestCost")
          ? [...plans].sort((a, b) => planUpfront(a) - planUpfront(b) || planCost(a, period) - planCost(b, period))[0]
          : cheapestPlan(plans, period)!;
      const row: Row = { clinic, plan, costs: planCosts(plan) };
      if (access === "unsure") {
        const ap = clinic.plans.find((p) => p.accessOnly);
        if (ap) row.accessAlternative = { plan: ap, cost: planCost(ap, period) };
      }
      rows.push(row);
    }
    const by: Record<SortKey, (a: Row, b: Row) => number> = {
      year1: (a, b) => a.costs.year1 - b.costs.year1,
      year3: (a, b) => a.costs.year3 - b.costs.year3,
      year5: (a, b) => a.costs.year5 - b.costs.year5,
      upfront: (a, b) => a.costs.upfront - b.costs.upfront,
      cqc: (a, b) => CQC_ORDER[a.clinic.cqc.rating] - CQC_ORDER[b.clinic.cqc.rating],
      name: (a, b) => a.clinic.name.localeCompare(b.clinic.name),
    };
    rows.sort((a, b) => by[sort](a, b) || a.clinic.name.localeCompare(b.clinic.name));
    return { rows, hidden };
  }, [patientType, access, period, priorities, sort]);

  // impression tracking
  const impressionKey = rows.map((r) => r.clinic.id + r.plan.id).join("|");
  useEffect(() => {
    rows.forEach((r, i) => track("clinic_result_impression", { clinic: r.clinic.id, plan: r.plan.id, position: i + 1, period, patientType }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [impressionKey, period]);

  function changePeriod(p: Period) {
    setPeriod(p);
    if (sort.startsWith("year")) setSort(yearKey(p));
    track("filter_change", { filter: "period", value: p });
  }

  function togglePriority(p: Priority) {
    setPriorities((prev) => {
      const next = prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p];
      track("filter_change", { filter: "priority", value: p, active: !prev.includes(p) });
      if (p === "lowestUpfront" && !prev.includes(p)) setSort("upfront");
      if (p === "lowestCost" && !prev.includes(p)) setSort(yearKey(period));
      return next;
    });
  }

  function onCompare() {
    track("compare_click", { patientType, access, period, priorities });
    document.getElementById("compare-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const outbound = (r: Row, position: number) =>
    clinicOutboundUrl(r.clinic, { subid: `tool-p${position}-${period}y-${patientType}` });

  const onVisit = (r: Row, position: number) =>
    track("visit_clinic_click", { clinic: r.clinic.id, plan: r.plan.id, position, period, patientType, access });
  const onReview = (r: Row, position: number) => track("read_review_click", { clinic: r.clinic.id, position });
  const toggleCqc = (id: string) => {
    setOpenCqc((v) => (v === id ? null : id));
    if (openCqc !== id) track("cqc_details_open", { clinic: id });
  };

  const cheapest = rows.length ? Math.min(...rows.map((r) => r.costs[yearKey(period)])) : 0;

  return (
    <div id="compare-tool" className="not-prose grid scroll-mt-24 gap-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start">
      {/* ---------- Questionnaire panel ---------- */}
      <aside className="relative overflow-hidden rounded-3xl bg-brand-900 p-5 text-white sm:p-6 lg:sticky lg:top-20">
        <p className="relative text-xs font-semibold text-lime">Your details</p>

        <Step n={1} label={copy.patientType.label}>
          <div className="grid grid-cols-2 gap-2">
            {copy.patientType.options.map((o) => {
              const on = patientType === o.value;
              return (
                <button
                  key={o.value}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    setPatientType(o.value as PatientType);
                    track("filter_change", { filter: "patientType", value: o.value });
                  }}
                  className={`flex min-h-[4.25rem] flex-col justify-between rounded-2xl p-3 text-left text-sm font-medium leading-snug transition ${
                    on ? "bg-lime text-brand-950" : "bg-white/[0.07] text-white/80 ring-1 ring-white/10 hover:bg-white/[0.12]"
                  }`}
                >
                  <span className={`grid h-5 w-5 place-items-center rounded-full ${on ? "bg-brand-900 text-lime" : "ring-1 ring-white/30"}`}>
                    {on && <IconCheck className="h-3 w-3" />}
                  </span>
                  {o.label}
                </button>
              );
            })}
          </div>
        </Step>

        <Step n={2} label={copy.access.label}>
          <Pills
            value={access}
            options={copy.access.options}
            onChange={(v) => {
              setAccess(v as AccessAnswer);
              track("filter_change", { filter: "access", value: v });
            }}
          />
        </Step>

        <Step n={3} label={copy.period.label}>
          <Pills value={period} options={copy.period.options} onChange={(v) => changePeriod(v as Period)} />
        </Step>

        <Step n={4} label={copy.priorities.label}>
          <ul className="space-y-1">
            {copy.priorities.options.map((o) => {
              const on = priorities.includes(o.value);
              return (
                <li key={o.value}>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={on}
                    onClick={() => togglePriority(o.value)}
                    className="flex w-full items-center justify-between gap-3 rounded-xl px-2 py-1.5 text-left text-sm text-white/80 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    {o.label}
                    <span className={`relative h-5 w-9 shrink-0 rounded-full transition ${on ? "bg-lime" : "bg-white/15"}`}>
                      <span
                        className={`absolute top-0.5 h-4 w-4 rounded-full shadow transition-all ${on ? "left-[1.125rem] bg-brand-900" : "left-0.5 bg-white"}`}
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Step>

        <button
          type="button"
          onClick={onCompare}
          className="relative mt-6 w-full rounded-full bg-lime py-3.5 font-semibold tracking-wide text-brand-950 transition hover:bg-lime-strong"
        >
          {copy.submitLabel}
        </button>
        <p className="relative mt-3 text-center text-xs text-white/55">{copy.resultNote}</p>
      </aside>

      {/* ---------- Results ---------- */}
      <section id="compare-results" className="min-w-0 scroll-mt-24" aria-live="polite">
        <div className="flex flex-col gap-3 rounded-3xl bg-sand p-3 sm:flex-row sm:items-center sm:justify-between sm:p-2 sm:pl-5">
          <p className="text-sm font-semibold text-ink">
            {rows.length} {rows.length === 1 ? "clinic" : "clinics"}
            <span className="font-normal text-muted">
              , {patientType === "transfer" ? "transfer pricing" : "new patient"}
              {access === "yes" ? ", access pricing" : ""}
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-full bg-white p-1 ring-1 ring-line" role="group" aria-label="Comparison period">
              {([1, 3, 5] as Period[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => changePeriod(p)}
                  aria-pressed={period === p}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${period === p ? "bg-brand-700 text-white" : "text-ink/70 hover:text-ink"}`}
                >
                  {p} {p === 1 ? "Year" : "Years"}
                </button>
              ))}
            </div>
            <select
              aria-label="Sort by"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as SortKey);
                track("filter_change", { filter: "sort", value: e.target.value });
              }}
              className="cursor-pointer rounded-full bg-white px-3 py-2 text-sm text-ink ring-1 ring-line focus:outline-none focus:ring-2 focus:ring-brand-600/30"
            >
              {copy.sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {rows.length === 0 && (
          <div className="mt-4 rounded-3xl border border-dashed border-line p-10 text-center text-muted">
            No clinics match all of your selections.{" "}
            <button className="font-semibold text-brand-700 underline" onClick={() => setPriorities([])}>
              Clear priorities
            </button>
          </div>
        )}

        <ol className="mt-4 space-y-4">
          {rows.map((r, i) => {
            const best = r.costs[yearKey(period)] === cheapest && rows.length > 1;
            const f = features(r.clinic, r.plan);
            const included = f.filter((x) => x.ok).map((x) => x.label);
            const missing = f.filter((x) => !x.ok).map((x) => x.label.replace(/: not stated$/, "").toLowerCase());
            const cqcTone =
              r.clinic.cqc.rating === "Requires Improvement" || r.clinic.cqc.rating === "Inadequate" ? "text-amber" : "text-brand-700";
            return (
              <li
                key={r.clinic.id}
                className={`grid gap-6 rounded-3xl bg-white p-5 sm:p-7 md:grid-cols-[minmax(0,1fr)_15rem] md:gap-10 ${
                  best ? "ring-2 ring-brand-600/40" : "ring-1 ring-line"
                }`}
              >
                {/* details */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="text-sm tabular-nums text-muted">{i + 1}.</span>
                    <h3 className="text-xl font-semibold tracking-tight text-ink">{r.clinic.name}</h3>
                    {best && (
                      <span className="rounded-full bg-lime px-2.5 py-0.5 text-xs font-semibold text-brand-950">Best price for your filters</span>
                    )}
                  </div>
                  <p className="mt-1 text-[0.95rem] text-muted">
                    <span className="font-medium text-ink/80">{r.plan.name}:</span> {r.plan.summary}
                  </p>

                  <dl className="mt-5 grid grid-cols-2 gap-y-4 sm:grid-cols-4 sm:divide-x sm:divide-line">
                    {([1, 3, 5] as Period[]).map((p) => {
                      const on = p === period;
                      return (
                        <div key={p} className="sm:px-5 sm:first:pl-0">
                          <dt className={`text-xs ${on ? "font-semibold text-brand-700" : "text-muted"}`}>Year {p}</dt>
                          <dd className={`mt-0.5 tabular-nums ${on ? "text-lg font-semibold text-ink" : "text-ink/70"}`}>
                            {formatGBP(r.costs[yearKey(p)])}
                          </dd>
                        </div>
                      );
                    })}
                    <div className="sm:px-5">
                      <dt className="text-xs text-muted">Upfront</dt>
                      <dd className="mt-0.5 tabular-nums text-ink/70">{formatGBP(r.costs.upfront)}</dd>
                    </div>
                  </dl>

                  <div className="mt-5 space-y-1.5 text-sm leading-relaxed">
                    {included.length > 0 && (
                      <p className="flex gap-2 text-ink/80">
                        <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                        <span>Includes {included.join(", ").toLowerCase()}.</span>
                      </p>
                    )}
                    {missing.length > 0 && <p className="pl-6 text-muted">Not stated: {missing.join(", ")}.</p>}
                    {r.accessAlternative && (
                      <p className="pl-6 font-medium text-brand-700">
                        If eligible for Access: {formatGBP(r.accessAlternative.cost)} over {period} {period === 1 ? "year" : "years"}.
                      </p>
                    )}
                  </div>
                </div>

                {/* price + actions */}
                <div className="flex flex-col gap-4 border-t border-line pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                  <div>
                    <p className="text-4xl font-semibold tracking-tight text-ink tabular-nums">{formatGBP(r.costs[yearKey(period)])}</p>
                    <p className="mt-1 text-xs text-muted">Estimated {period}-year clinic cost</p>
                  </div>
                  <div className="grid gap-2">
                    <a
                      href={outbound(r, i + 1)}
                      target="_blank"
                      rel="sponsored noopener"
                      onClick={() => onVisit(r, i + 1)}
                      className="btn flex items-center justify-center gap-1.5 rounded-full bg-lime py-3 text-sm font-semibold text-brand-950 transition hover:bg-lime-strong"
                    >
                      Visit clinic <IconArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <Link
                      href={r.clinic.reviewUrl}
                      onClick={() => onReview(r, i + 1)}
                      className="btn flex items-center justify-center gap-1 rounded-full py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
                    >
                      Read our review <IconArrow className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleCqc(r.clinic.id)}
                    aria-expanded={openCqc === r.clinic.id}
                    className="flex items-center justify-between gap-2 border-t border-line pt-3 text-left text-sm"
                  >
                    <span className="text-muted">CQC</span>
                    <span className={`whitespace-nowrap font-semibold ${cqcTone}`}>
                      {r.clinic.cqc.rating === "Not yet inspected" ? "See details" : r.clinic.cqc.rating}
                    </span>
                  </button>
                </div>

                {openCqc === r.clinic.id && (
                  <div className="rounded-2xl bg-brand-50 p-4 md:col-span-2">
                    <CqcDetails clinic={r.clinic} />
                  </div>
                )}
                <p className="text-xs text-muted md:col-span-2">
                  {copy.resultNote} Prices last checked: {r.clinic.lastPriceCheck}.
                </p>
              </li>
            );
          })}
        </ol>

        {hidden > 0 && rows.length > 0 && (
          <p className="mt-4 text-sm text-muted">
            {hidden} {hidden === 1 ? "clinic is" : "clinics are"} hidden by your selections.{" "}
            <button className="font-semibold text-brand-700 underline" onClick={() => setPriorities([])}>
              Show all
            </button>
          </p>
        )}

        <div className="mt-5 flex gap-3 rounded-2xl bg-sand p-4 text-sm leading-relaxed text-muted">
          <IconInfo className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
          <p>
            <strong className="text-ink">{copy.disclaimer}</strong>
          </p>
        </div>
      </section>
    </div>
  );
}

function Step({ n, label, children }: { n: number; label: string; children: React.ReactNode }) {
  return (
    <fieldset className="relative mt-5 border-t border-white/10 pt-5">
      <legend className="sr-only">{label}</legend>
      <p aria-hidden="true" className="mb-3 flex items-start gap-2.5 text-sm font-semibold leading-snug text-white">
        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/10 text-[0.7rem] text-lime ring-1 ring-white/15">{n}</span>
        {label}
      </p>
      {children}
    </fieldset>
  );
}

function Pills<T extends string | number>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: readonly { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex gap-1 rounded-full bg-white/[0.07] p-1 ring-1 ring-white/10">
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={`flex-1 rounded-full px-2 py-2 text-sm font-medium transition ${
            value === o.value ? "bg-white text-brand-900 shadow-sm" : "text-white/70 hover:text-white"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function ClinicMark({ clinic }: { clinic: Clinic }) {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-100 font-semibold text-brand-700">
      {clinic.logo ? <img src={clinic.logo} alt="" className="h-7 w-7 object-contain" /> : clinic.logoText}
    </span>
  );
}

export function CqcDetails({ clinic }: { clinic: Clinic }) {
  const c = clinic.cqc;
  const items: [string, string | null][] = [
    ["Safe", c.safe],
    ["Effective", c.effective],
    ["Caring", c.caring],
    ["Responsive", c.responsive],
    ["Well-led", c.wellLed],
  ];
  return (
    <div className="text-sm">
      <p className="font-semibold text-ink">{c.displayText}</p>
      <p className="mt-1 text-xs text-muted">
        {c.location}
        {c.inspectionDate ? ` · Inspection: ${c.inspectionDate}` : ""}
      </p>
      {items.some(([, v]) => v) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map(([k, v]) => (
            <span key={k} className="rounded-full bg-white px-2.5 py-1 text-xs ring-1 ring-line">
              {k}: <strong className="font-semibold">{v ?? "Not stated"}</strong>
            </span>
          ))}
        </div>
      )}
      <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
        <a href={c.reportUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-brand-700">
          CQC report <IconArrowUpRight className="h-3 w-3" />
        </a>
        <span>Last checked: {c.lastChecked}</span>
      </p>
    </div>
  );
}

