import Link from "next/link";
import type { Block } from "@/lib/types";
import RichText, { slugify } from "./RichText";
import ComparisonTool from "./ComparisonTool";
import EligibilityChecker from "./EligibilityChecker";
import { ClinicCompare, ClinicPricing } from "./ClinicBlocks";
import {
  Cards,
  ChipGroup,
  Chips,
  Contrast,
  DoDont,
  Equation,
  Examples,
  Flow,
  KeyLine,
  KeyValues,
  Questions,
  StatRow,
  StepCards,
  Steps,
} from "./RichBlocks";
import { IconAlert, IconArrow, IconCheck, IconChevron, IconInfo } from "./Icons";

export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-bud">
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
    </div>
  );
}

function BlockView({ block: b }: { block: Block }) {
  switch (b.type) {
    case "h2":
      return <h2 id={slugify(b.text)}>{b.text}</h2>;
    case "h3":
      return <h3>{b.text}</h3>;
    case "p":
      return (
        <p>
          <RichText text={b.text} />
        </p>
      );
    case "list": {
      const Tag = b.ordered ? "ol" : "ul";
      return (
        <Tag className="bud-list">
          {b.items.map((it, i) => (
            <li key={i}>
              <RichText text={it} />
            </li>
          ))}
        </Tag>
      );
    }
    case "table":
      return (
        <div className="not-prose -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {b.caption && <p className="mb-3 font-semibold text-ink">{b.caption.replace(/\*\*/g, "")}</p>}
          <table className="w-full min-w-[520px] overflow-hidden rounded-3xl text-left text-[0.95rem] ring-1 ring-line">
            <thead className="bg-brand-900 text-white">
              <tr>
                {b.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3.5 font-semibold">
                    <RichText text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {b.rows.map((r, i) => (
                <tr key={i} className="border-t border-line odd:bg-white even:bg-sand/50">
                  {r.map((c, j) => (
                    <td key={j} className={`px-4 py-3 align-top ${j === 0 ? "font-semibold text-ink" : "text-ink/80"}`}>
                      <RichText text={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "note":
      return (
        <p className="not-prose flex gap-2.5 rounded-2xl bg-sand px-4 py-3 text-sm leading-relaxed text-ink/75">
          <IconInfo className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
          <span>
            <RichText text={b.text} />
          </span>
        </p>
      );
    case "callout":
      return (
        <div className="not-prose rounded-3xl border-l-4 border-lime-strong bg-lime-soft px-5 py-4 leading-relaxed text-ink/85 [&_strong]:text-brand-900">
          <RichText text={b.text} />
        </div>
      );
    case "linkline":
      return (
        <p className="not-prose">
          <span className="group inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 font-medium text-brand-700 ring-1 ring-brand-600/15 transition hover:bg-brand-100 [&_a]:no-underline">
            <RichText text={b.text.replace(/^→\s*/, "")} />
            <IconArrow className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </p>
      );
    case "proscons":
      return (
        <div className="not-prose grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-brand-50 p-5 ring-1 ring-brand-600/15">
            <h3 className="font-semibold text-brand-800">{b.pros.title}</h3>
            <ul className="mt-3 space-y-2">
              {b.pros.items.map((it, i) => (
                <li key={i} className="flex gap-2.5 text-[0.95rem] text-ink/85">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-700 text-white">
                    <IconCheck className="h-3 w-3" />
                  </span>
                  <RichText text={it} />
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-amber-soft/70 p-5 ring-1 ring-amber/20">
            <h3 className="font-semibold text-ink">{b.cons.title}</h3>
            <ul className="mt-3 space-y-2">
              {b.cons.items.map((it, i) => (
                <li key={i} className="flex gap-2.5 text-[0.95rem] text-ink/85">
                  <IconAlert className="mt-1 h-4 w-4 shrink-0 text-amber" />
                  <RichText text={it} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    case "faq":
      return (
        <div className="not-prose divide-y divide-line rounded-3xl border border-line bg-white">
          {b.items.map((it, i) => (
            <details key={i} className="group px-5" open={i === 0}>
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 font-semibold text-ink">
                {it.q}
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sand transition group-open:bg-lime">
                  <IconChevron className="chev h-4 w-4 transition" />
                </span>
              </summary>
              <div className="space-y-3 pb-5 leading-relaxed text-ink/75 [&_a]:font-medium [&_a]:text-brand-700 [&_a]:underline">
                {it.a.map((a, j) => (
                  <p key={j}>
                    <RichText text={a} />
                  </p>
                ))}
              </div>
            </details>
          ))}
        </div>
      );
    case "tool":
      return b.tool === "comparison" ? <ComparisonTool /> : <EligibilityChecker />;
    case "toolButton":
      return (
        <p className="not-prose">
          <Link
            href={b.href}
            className="btn inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3 font-semibold text-white transition hover:bg-brand-800"
          >
            {b.label} <IconArrow />
          </Link>
        </p>
      );
    case "clinicPricing":
      return <ClinicPricing clinicId={b.clinic} />;
    case "clinicCompare":
      return <ClinicCompare clinicIds={b.clinics} />;
    case "flow":
      return <Flow b={b} />;
    case "stepCards":
      return <StepCards b={b} />;
    case "equation":
      return <Equation b={b} />;
    case "dodont":
      return <DoDont b={b} />;
    case "contrast":
      return <Contrast b={b} />;
    case "examples":
      return <Examples b={b} />;
    case "kv":
      return <KeyValues b={b} />;
    case "chipGroup":
      return <ChipGroup b={b} />;
    case "steps":
      return <Steps b={b} />;
    case "questions":
      return <Questions b={b} />;
    case "cards":
      return <Cards b={b} />;
    case "statRow":
      return <StatRow b={b} />;
    case "chips":
      return <Chips b={b} />;
    case "keyline":
      return <KeyLine b={b} />;
    case "comingSoon":
      return (
        <div className="not-prose rounded-3xl border border-dashed border-brand-600/30 bg-brand-50 p-6 text-center">
          <p className="font-semibold text-brand-800">{b.title}</p>
          <p className="mt-1 text-sm text-muted">{b.text}</p>
        </div>
      );
  }
}
