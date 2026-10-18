// Visual treatments for recurring paragraph patterns in the documents.
// Every string is rendered exactly as stored in lib/*Data.ts; these components
// only change layout (splitting on the document's own separators: →, |, /, \n).
import type { Block } from "@/lib/types";
import RichText from "./RichText";
import { IconArrow, IconCheck, IconQuestion, IconX } from "./Icons";

type Of<T extends Block["type"]> = Extract<Block, { type: T }>;

const unbold = (t: string) => t.replace(/^\*\*([\s\S]*)\*\*$/, "$1");

export function Flow({ b }: { b: Of<"flow"> }) {
  const parts = unbold(b.text).split(" → ");
  return (
    <div className="not-prose rounded-3xl bg-brand-50 p-4 ring-1 ring-brand-100 sm:p-5">
      <ol className="flex flex-wrap items-center gap-2">
        {parts.map((p, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${i === parts.length - 1 ? "bg-brand-700 text-white" : "bg-white text-ink ring-1 ring-line"}`}>
              {p}
            </span>
            {i < parts.length - 1 && <IconArrow className="h-3.5 w-3.5 text-brand-600" />}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function StepCards({ b }: { b: Of<"stepCards"> }) {
  return (
    <div className="not-prose grid gap-3 sm:grid-cols-2">
      {b.items.map((it) => {
        const options = it.options.length === 1 ? it.options[0].split(" / ") : it.options;
        return (
          <div key={it.title} className="rounded-3xl bg-white p-5 ring-1 ring-line">
            <p className="text-sm font-semibold text-brand-700">{it.title}</p>
            <p className="mt-1.5 text-lg font-semibold leading-snug text-ink">
              <RichText text={unbold(it.question)} />
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {options.map((o) => (
                <span key={o} className="rounded-full bg-sand px-3 py-1.5 text-sm text-ink/80">
                  {o}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Equation({ b }: { b: Of<"equation"> }) {
  return (
    <div className="not-prose flex flex-col gap-3 rounded-3xl bg-sand p-5 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="flex flex-wrap gap-2">
        {b.parts.map((p) => (
          <span key={p} className="rounded-2xl bg-white px-4 py-2.5 font-semibold text-ink ring-1 ring-line">
            {unbold(p)}
          </span>
        ))}
      </div>
      <span className="px-1 text-2xl font-semibold text-brand-700">{b.operator}</span>
      <span className="rounded-2xl bg-brand-700 px-4 py-2.5 font-semibold text-white">{unbold(b.result)}</span>
    </div>
  );
}

export function DoDont({ b }: { b: Of<"dodont"> }) {
  return (
    <div className="not-prose grid gap-3 sm:grid-cols-2">
      <div className="rounded-3xl bg-brand-50 p-5 ring-1 ring-brand-100">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-700 text-white">
          <IconCheck className="h-4 w-4" />
        </span>
        <p className="mt-4 text-sm text-muted">{b.do.lead}</p>
        <p className="mt-1 text-xl font-semibold tracking-tight text-brand-800">{unbold(b.do.phrase)}</p>
        <p className="mt-1 text-sm text-ink/75">{b.do.after}</p>
      </div>
      <div className="rounded-3xl bg-amber-soft/70 p-5 ring-1 ring-amber/20">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-amber text-white">
          <IconX className="h-4 w-4" />
        </span>
        <p className="mt-4 text-sm text-muted">{b.dont.lead}</p>
        <p className="mt-1 text-xl font-semibold tracking-tight text-ink">{unbold(b.dont.phrase)}</p>
        <p className="mt-1 text-sm text-ink/75">{b.dont.after}</p>
      </div>
    </div>
  );
}

export function Contrast({ b }: { b: Of<"contrast"> }) {
  return (
    <div className="not-prose grid gap-3 sm:grid-cols-2">
      <div className="rounded-3xl bg-sand p-5">
        <p className="text-sm text-muted">{b.not.lead}</p>
        <p className="mt-2 text-lg font-medium leading-snug text-ink/60">{unbold(b.not.text)}</p>
      </div>
      <div className="rounded-3xl bg-brand-900 p-5 text-white">
        <p className="text-sm text-white/65">{b.is.lead}</p>
        <p className="mt-2 text-lg font-semibold leading-snug text-lime">{unbold(b.is.text)}</p>
      </div>
    </div>
  );
}

export function Examples({ b }: { b: Of<"examples"> }) {
  return (
    <div className="not-prose grid gap-3 sm:grid-cols-2">
      {b.items.map((it) => (
        <div key={it.title} className="flex flex-col rounded-3xl bg-white p-5 ring-1 ring-line">
          <p className="text-lg font-semibold text-ink">{unbold(it.title)}</p>
          <ul className="mt-3 flex-1 space-y-1.5 text-[0.95rem] text-ink/80">
            {it.body.split("\n").map((ln) => (
              <li key={ln} className="tabular-nums">
                {ln}
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-line pt-3 font-semibold tabular-nums text-brand-700">{it.total}</p>
        </div>
      ))}
    </div>
  );
}

export function KeyValues({ b }: { b: Of<"kv"> }) {
  const rows = b.text.split("\n").map((ln) => {
    const clean = ln.replace(/\*\*/g, "");
    const idx = clean.indexOf(":");
    return { k: clean.slice(0, idx + 1), v: clean.slice(idx + 1).trim() };
  });
  return (
    <div className="not-prose rounded-3xl bg-white p-5 ring-1 ring-line">
      {b.title && <p className="mb-4 text-lg font-semibold text-ink">{unbold(b.title)}</p>}
      <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {rows.map((r) => (
          <div key={r.k} className="rounded-2xl bg-sand px-4 py-3">
            <dt className="text-xs text-muted">{r.k}</dt>
            <dd className="mt-0.5 font-semibold text-ink">{r.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ChipGroup({ b }: { b: Of<"chipGroup"> }) {
  const m = b.text.match(/^\*\*([^*]+)\*\*([\s\S]*)$/);
  const label = m ? m[1].trim() : "";
  const items = (m ? m[2] : b.text).split(" | ").map((x) => x.trim());
  return (
    <div className="not-prose">
      {label && <p className="mb-2 text-sm font-semibold text-ink">{label}</p>}
      <div className="flex flex-wrap gap-2">
        {items.map((x) => (
          <span key={x} className="rounded-full bg-white px-3.5 py-1.5 text-sm text-ink/80 ring-1 ring-line">
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Steps({ b }: { b: Of<"steps"> }) {
  return (
    <ol className="not-prose relative space-y-3">
      {b.items.map((t) => {
        const m = unbold(t).match(/^(\d+)\.\s+([\s\S]*)$/);
        return (
          <li key={t} className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-line">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-700 text-sm font-semibold text-lime">{m?.[1]}</span>
            <span className="font-semibold text-ink">{m?.[2]}</span>
          </li>
        );
      })}
    </ol>
  );
}

export function Questions({ b }: { b: Of<"questions"> }) {
  return (
    <div className="not-prose grid gap-3 sm:grid-cols-2">
      {b.items.map((q) => (
        <div key={q} className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-line">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lime-soft text-brand-700">
            <IconQuestion className="h-4 w-4" />
          </span>
          <p className="font-medium leading-snug text-ink">{unbold(q)}</p>
        </div>
      ))}
    </div>
  );
}

export function Cards({ b }: { b: Of<"cards"> }) {
  const cols = b.items.length % 3 === 0 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";
  return (
    <div className={`not-prose grid gap-3 ${cols}`}>
      {b.items.map((it) => {
        const title = unbold(it.title);
        const m = b.numbered ? title.match(/^(\d+)\.\s+(.*)$/) : null;
        return (
          <div key={it.title} className="rounded-3xl bg-white p-5 ring-1 ring-line">
            {m ? (
              <>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-lime text-sm font-semibold text-brand-950">{m[1]}</span>
                <p className="mt-4 font-semibold text-ink">{m[2]}</p>
              </>
            ) : (
              <p className="text-lg font-semibold text-brand-700">{title}</p>
            )}
            {it.text.map((t) =>
              t.split(" + ").length >= 3 && !t.includes("**") ? (
                // "a + b + c." formula: show each term as a pill, keeping the document's own "+" signs
                <p key={t} className="mt-3 flex flex-wrap items-center gap-1.5 text-sm">
                  {t.split(" + ").map((term, k, arr) => (
                    <span key={k} className="flex items-center gap-1.5">
                      <span className="rounded-full bg-sand px-2.5 py-1 text-ink/80">{term}</span>
                      {k < arr.length - 1 && <span className="font-semibold text-brand-700">+</span>}
                    </span>
                  ))}
                </p>
              ) : (
                <p key={t} className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">
                  <RichText text={t} />
                </p>
              ),
            )}
          </div>
        );
      })}
    </div>
  );
}

export function StatRow({ b }: { b: Of<"statRow"> }) {
  // Group "label:" lines with the figures that follow; connectors ("or", "and") sit between figures.
  type Group = { label?: string; parts: { kind: "join" | "value"; text: string }[] };
  const groups: Group[] = [];
  for (const it of b.items) {
    if (it.kind === "join" && it.text.endsWith(":") && !/^(and|or|plus|followed by):$/.test(it.text)) {
      groups.push({ label: it.text, parts: [] });
    } else {
      if (!groups.length) groups.push({ parts: [] });
      groups[groups.length - 1].parts.push(it);
    }
  }
  const valueClass = (t: string) =>
    t.includes("£") ? "text-2xl font-semibold tracking-tight text-brand-700 tabular-nums sm:text-[1.7rem]" : "text-lg font-semibold leading-snug text-ink";

  const renderParts = (parts: Group["parts"]) => (
    <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-2">
      {parts.map((p, i) =>
        p.kind === "join" ? (
          <span key={i} className="text-sm text-muted">
            {p.text}
          </span>
        ) : (
          <span key={i} className={`${valueClass(p.text)} [&_a]:text-brand-700 [&_a]:underline [&_a]:decoration-brand-700/30 [&_a]:underline-offset-4`}>
            <RichText text={unbold(p.text).startsWith("[") ? p.text : unbold(p.text)} />
          </span>
        ),
      )}
    </div>
  );

  if (groups.length > 1) {
    return (
      <div className={`not-prose grid gap-3 ${groups.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {groups.map((g, i) => (
          <div key={i} className="rounded-3xl bg-white p-5 ring-1 ring-line">
            {g.label && <p className="text-sm text-muted">{g.label}</p>}
            {renderParts(g.parts)}
          </div>
        ))}
      </div>
    );
  }
  const g = groups[0];
  return (
    <div className="not-prose rounded-3xl border-l-4 border-lime-strong bg-white px-5 py-4 ring-1 ring-line">
      {g.label && <p className="text-sm text-muted">{g.label}</p>}
      {renderParts(g.parts)}
    </div>
  );
}

export function Chips({ b }: { b: Of<"chips"> }) {
  return (
    <ul className="not-prose grid grid-cols-2 gap-2 sm:grid-cols-3">
      {b.items.map((c) => (
        <li key={c} className="flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 ring-1 ring-line">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
            <IconCheck className="h-3 w-3" />
          </span>
          <span className="text-sm font-semibold text-ink">{unbold(c)}</span>
        </li>
      ))}
    </ul>
  );
}

export function KeyLine({ b }: { b: Of<"keyline"> }) {
  return (
    <p className="not-prose rounded-3xl bg-brand-900 px-6 py-5 text-lg font-semibold leading-snug text-white sm:text-xl">
      {unbold(b.text)}
    </p>
  );
}
