import type { Metadata } from "next";
import Link from "next/link";
import CqcBadge from "@/components/CqcBadge";
import { IconArrow, IconCheck, IconChevron, serviceIcons } from "@/components/Icons";
import JsonLd from "@/components/JsonLd";
import { clinicsData, getClinic } from "@/lib/clinicsData";
import { cheapestPlan, eligiblePlans, formatGBP, planCosts } from "@/lib/costCalculator";
import { homeData as h } from "@/lib/homeData";
import { siteData } from "@/lib/siteData";

export const metadata: Metadata = {
  title: { absolute: h.meta.title },
  description: h.meta.description,
  alternates: { canonical: "/" },
  openGraph: { title: h.meta.title, description: h.meta.description, url: "/", siteName: siteData.name, locale: "en_GB", type: "website" },
};

// Shape system: containers rounded-3xl (24px), inner elements rounded-2xl (16px), buttons/pills rounded-full.

function Heading({ title, accent, light = false, className = "" }: { title: string; accent: string; light?: boolean; className?: string }) {
  return (
    <h2 className={`text-3xl font-semibold leading-[1.15] tracking-tight md:text-[2.5rem] ${light ? "text-white" : "text-ink"} ${className}`}>
      {title} <span className={light ? "accent-light" : "accent"}>{accent}</span>
    </h2>
  );
}

const primaryBtn =
  "inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 font-semibold text-brand-950 transition hover:bg-lime-strong";
const darkBtn =
  "inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3.5 font-semibold text-white transition hover:bg-brand-800";

export default function Home() {
  const rows = clinicsData.map((c) => {
    const plan = cheapestPlan(eligiblePlans(c, "new", "no"), 1)!;
    return { clinic: c, plan, costs: planCosts(plan) };
  });
  const byYear1 = [...rows].sort((a, b) => a.costs.year1 - b.costs.year1);
  const curaleafRow = rows.find((x) => x.clinic.id === "curaleaf") ?? rows[0];
  const alternaleaf = getClinic("alternaleaf");
  const curaleaf = getClinic("curaleaf");
  const mamedica = getClinic("mamedica");

  return (
    <>
      <JsonLd
        data={{ "@context": "https://schema.org", "@type": "WebSite", name: siteData.name, url: siteData.url, description: h.meta.description }}
      />

      {/* Hero: split, copy left, live estimate right */}
      <section className="container-x pt-4">
        <div className="grid gap-10 rounded-3xl bg-brand-900 px-6 pb-8 pt-12 text-white sm:px-10 md:grid-cols-[1.35fr_1fr] md:items-center md:py-20">
          <div>
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              {h.hero.title} <span className="text-lime">{h.hero.titleAccent}</span>
            </h1>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-white/75">{h.hero.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={h.hero.primaryCta.href} className={primaryBtn}>
                {h.hero.primaryCta.label} <IconArrow />
              </Link>
              <Link
                href={h.hero.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/10"
              >
                {h.hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 text-ink shadow-[0_30px_80px_-30px_rgba(2,24,18,0.7)] md:ml-auto md:w-full md:max-w-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Estimated Year 1 clinic cost</p>
              <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[0.7rem] font-semibold text-brand-700">New patient</span>
            </div>
            <ul className="mt-4 space-y-2">
              {byYear1.map((r) => (
                <li key={r.clinic.id}>
                  <Link href={r.clinic.reviewUrl} className="flex items-center justify-between gap-3 rounded-2xl bg-sand px-3.5 py-3 transition hover:bg-sand-strong">
                    <span className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-700 text-sm font-semibold text-lime">{r.clinic.logoText}</span>
                      <span>
                        <span className="block text-sm font-semibold">{r.clinic.name}</span>
                        <span className="block text-xs text-muted">{r.plan.name}</span>
                      </span>
                    </span>
                    <span className="text-lg font-semibold tabular-nums text-brand-700">{formatGBP(r.costs.year1)}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted">Estimated clinic fees only. Medication costs are not included.</p>
          </div>
        </div>
      </section>

      {/* Intro statement */}
      <section className="container-x py-20 md:py-28">
        <div className="max-w-4xl">
          <p className="text-2xl font-semibold leading-snug tracking-tight text-ink md:text-[2.1rem] md:leading-[1.25]">
            {h.intro.title} <span className="accent">{h.intro.titleAccent}</span>
          </p>
          <div className="mt-6 max-w-[65ch] space-y-4 leading-relaxed text-muted">
            {h.intro.text.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Tools: asymmetric bento, 4 items = 4 cells */}
      <section className="container-x">
        <Heading title={h.tools.title} accent={h.tools.titleAccent} />
        <div className="mt-10 grid gap-4 md:grid-cols-[1.2fr_1fr_1fr] md:grid-rows-[auto_auto]">
          <div className="flex flex-col justify-between rounded-3xl bg-brand-700 p-7 text-white md:row-span-2 md:p-9">
            <div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lime text-brand-950">
                <serviceIcons.compare className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{h.tools.lead.title}</h3>
              <p className="mt-3 max-w-sm leading-relaxed text-white/75">{h.tools.lead.text}</p>
            </div>
            <div className="mt-8">
              <dl className="grid grid-cols-3 gap-2 rounded-2xl bg-brand-800 p-3 text-center">
                {(["year1", "year3", "year5"] as const).map((k, i) => (
                  <div key={k}>
                    <dt className="text-xs text-white/60">Year {[1, 3, 5][i]}</dt>
                    <dd className="font-semibold tabular-nums text-lime">from {formatGBP(Math.min(...rows.map((r) => r.costs[k])))}</dd>
                  </div>
                ))}
              </dl>
              <Link href={h.tools.lead.cta.href} className={`${primaryBtn} mt-5`}>
                {h.tools.lead.cta.label} <IconArrow />
              </Link>
            </div>
          </div>
          {h.tools.items.map((s, i) => {
            const Icon = serviceIcons[s.icon as keyof typeof serviceIcons];
            const tone = ["bg-lime-soft", "bg-white ring-1 ring-line", "bg-sand md:col-span-2"][i];
            return (
              <Link key={s.title} href={s.href} className={`group rounded-3xl p-6 transition hover:-translate-y-0.5 ${tone}`}>
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-brand-700 ring-1 ring-line">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 flex items-center gap-2 font-semibold text-ink">
                  {s.title}
                  <IconArrow className="h-4 w-4 text-brand-700 transition group-hover:translate-x-0.5" />
                </h3>
                <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted">{s.text}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* What to compare: example table + points */}
      <section className="container-x mt-20 md:mt-28">
        <div className="grid gap-10 rounded-3xl bg-brand-900 p-6 text-white sm:p-10 md:grid-cols-2 md:items-center md:p-14">
          <div className="rounded-3xl bg-white p-6 text-ink">
            <p className="text-sm text-muted">{h.whyCompare.example.intro}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">{h.whyCompare.example.title}</p>
            <div className="mt-5 overflow-hidden rounded-2xl ring-1 ring-line">
              <table className="w-full text-sm">
                <thead className="bg-sand text-xs text-muted">
                  <tr>
                    <th className="px-3 py-2.5 text-left font-semibold">Clinic</th>
                    {[1, 3, 5].map((y) => (
                      <th key={y} className="px-3 py-2.5 text-right font-semibold">
                        Year {y}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {h.whyCompare.example.rows.map((r) => {
                    const mins = [0, 1, 2].map((i) => Math.min(...h.whyCompare.example.rows.map((x) => x.years[i])));
                    return (
                      <tr key={r.label} className="border-t border-line">
                        <td className="px-3 py-3">
                          <p className="font-semibold">{r.label}</p>
                          <p className="text-xs text-muted">{r.detail}</p>
                        </td>
                        {r.years.map((y, i) => (
                          <td key={i} className="px-3 py-3 text-right tabular-nums">
                            <span className={y === mins[i] ? "rounded-md bg-lime px-1.5 py-0.5 font-semibold text-brand-950" : "text-ink/75"}>
                              {formatGBP(y)}
                            </span>
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">{h.whyCompare.example.footnote}</p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-[2.5rem]">
              {h.whyCompare.title} <span className="highlight">{h.whyCompare.titleAccent}</span>
            </h2>
            <p className="mt-4 max-w-[60ch] leading-relaxed text-white/75">{h.whyCompare.text}</p>
            <ul className="mt-6 space-y-3.5">
              {h.whyCompare.points.map((p) => (
                <li key={p.title} className="flex gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-lime text-brand-950">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-[0.95rem] leading-relaxed text-white/75">
                    <strong className="font-semibold text-white">{p.title}:</strong> {p.text}
                  </p>
                </li>
              ))}
            </ul>
            <Link href={h.whyCompare.cta.href} className={`${primaryBtn} mt-8`}>
              {h.whyCompare.cta.label} <IconArrow />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works: steps + real result card */}
      <section className="container-x py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <Heading title={h.howItWorks.title} accent={h.howItWorks.titleAccent} />
            <p className="mt-4 max-w-md text-muted">{h.howItWorks.text}</p>
            <ol className="mt-8 divide-y divide-line border-y border-line">
              {h.howItWorks.steps.map((s, i) => (
                <li key={s.title}>
                  <details className="group" open={i === 2}>
                    <summary className="flex items-center justify-between gap-4 py-4 font-semibold text-ink">
                      <span className="flex items-baseline gap-3">
                        <span className="w-4 text-sm tabular-nums text-muted">{i + 1}</span>
                        {s.title}
                      </span>
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sand transition group-open:bg-lime">
                        <IconChevron className="chev h-3.5 w-3.5 transition" />
                      </span>
                    </summary>
                    <p className="pb-4 pl-7 text-sm leading-relaxed text-muted">{s.text}</p>
                  </details>
                </li>
              ))}
            </ol>
            <Link href={h.howItWorks.cta.href} className={`${darkBtn} mt-8`}>
              {h.howItWorks.cta.label} <IconArrow />
            </Link>
          </div>

          <div className="rounded-3xl bg-brand-50 p-6 ring-1 ring-brand-100 sm:p-10">
            <div className="mx-auto max-w-sm rounded-3xl bg-white p-6 shadow-[0_30px_60px_-34px_rgba(8,56,41,0.45)]">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 font-semibold text-brand-700">{curaleafRow.clinic.logoText}</span>
                <div>
                  <p className="font-semibold">{curaleafRow.clinic.name}</p>
                  <p className="text-xs text-muted">{curaleafRow.plan.name}</p>
                </div>
              </div>
              <p className="mt-5 text-sm text-muted">Estimated clinic cost</p>
              <dl className="mt-2 grid grid-cols-3 gap-2 text-center">
                {(["year1", "year3", "year5"] as const).map((k, i) => (
                  <div key={k} className="rounded-2xl bg-sand py-2.5">
                    <dt className="text-xs text-muted">Year {[1, 3, 5][i]}</dt>
                    <dd className="font-semibold tabular-nums text-brand-700">{formatGBP(curaleafRow.costs[k])}</dd>
                  </div>
                ))}
              </dl>
              <ul className="mt-5 space-y-1.5 text-sm">
                {["Free delivery", "Online appointments", "No repeat prescription fee"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-ink/80">
                    <IconCheck className="h-4 w-4 text-brand-600" /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <CqcBadge rating={curaleafRow.clinic.cqc.rating} />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <Link href={curaleafRow.clinic.reviewUrl} className="rounded-full py-2.5 text-center text-sm font-semibold ring-1 ring-line">
                  Read our review
                </Link>
                <Link href="/medical-cannabis-clinics/" className="rounded-full bg-lime py-2.5 text-center text-sm font-semibold text-brand-950">
                  Compare clinics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prices at a glance: 1 large + 2 stacked */}
      <section className="container-x">
        <Heading title={h.metrics.title} accent={h.metrics.titleAccent} />
        <div className="mt-10 grid gap-4 md:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col justify-end rounded-3xl bg-brand-700 p-8 text-white md:row-span-2 md:min-h-[300px]">
            <p className="text-5xl font-semibold tracking-tight tabular-nums md:text-6xl">{formatGBP(alternaleaf.monthlyMembershipFee ?? 0)}/month</p>
            <p className="mt-3 max-w-sm text-white/75">Lowest advertised monthly clinic membership, offered by Alternaleaf and Curaleaf Clinic.</p>
          </div>
          <div className="rounded-3xl bg-lime p-7 text-brand-950">
            <p className="text-4xl font-semibold tracking-tight tabular-nums">{formatGBP(curaleaf.annualMembershipFee ?? 0)}/year</p>
            <p className="mt-2 text-sm text-brand-950/75">Curaleaf Clinic annual plan, paid upfront.</p>
          </div>
          <div className="rounded-3xl bg-sand p-7">
            <p className="text-4xl font-semibold tracking-tight tabular-nums text-ink">{formatGBP(mamedica.accessSchemePrice ?? 0)} once</p>
            <p className="mt-2 text-sm text-muted">Mamedica Access: £0 clinic fees for life for qualifying patients.</p>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted">{h.metrics.note}</p>
      </section>

      {/* Reviews: comparison rows */}
      <section className="container-x mt-20 md:mt-28">
        <div className="rounded-3xl bg-sand px-5 py-12 sm:px-10 md:py-16">
          <Heading title={h.reviews.title} accent={h.reviews.titleAccent} />
          <p className="mt-3 max-w-lg text-muted">{h.reviews.text}</p>
          <ul className="mt-8 space-y-3">
            {byYear1.map(({ clinic, costs }) => (
              <li key={clinic.id}>
                <Link
                  href={clinic.reviewUrl}
                  className="group grid items-center gap-4 rounded-2xl bg-white p-5 transition hover:ring-1 hover:ring-brand-600/30 md:grid-cols-[200px_minmax(0,1fr)_110px_210px_140px]"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-700 font-semibold text-lime">{clinic.logoText}</span>
                    <span className="font-semibold text-ink">{clinic.name}</span>
                  </span>
                  <span className="text-sm leading-relaxed text-ink/75">{clinic.quickVerdict}</span>
                  <span className="text-sm text-muted">
                    Year 1 from <strong className="block text-lg font-semibold tabular-nums text-brand-700">{formatGBP(costs.year1)}</strong>
                  </span>
                  <span><CqcBadge rating={clinic.cqc.rating} text={clinic.cqc.rating === "Not yet inspected" ? "Previous site Good" : undefined} /></span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                    Read our review <IconArrow className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              ["Alternaleaf vs Curaleaf", "/compare/alternaleaf-vs-curaleaf/"],
              ["Alternaleaf vs Mamedica", "/compare/alternaleaf-vs-mamedica/"],
              ["Curaleaf vs Mamedica", "/compare/curaleaf-vs-mamedica/"],
            ].map(([l, href]) => (
              <Link key={href} href={href} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink ring-1 ring-line transition hover:text-brand-700">
                {l}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions + guides */}
      <section className="container-x py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <Heading title={h.conditions.title} accent={h.conditions.titleAccent} />
            <p className="mt-3 max-w-md text-muted">{h.conditions.text}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {h.conditions.items.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="rounded-full px-5 py-2.5 font-medium text-ink ring-1 ring-line transition hover:bg-brand-50 hover:text-brand-700 hover:ring-brand-600/30"
                >
                  {c.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <Heading title={h.guides.title} accent={h.guides.titleAccent} />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {h.guides.items.map((g) => (
                <Link
                  key={g.href}
                  href={g.href}
                  className="group flex items-center justify-between gap-4 rounded-2xl bg-sand px-5 py-4 text-ink transition hover:bg-brand-50 hover:text-brand-700"
                >
                  <span className="font-medium">{g.title}</span>
                  <IconArrow className="h-4 w-4 shrink-0 transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
