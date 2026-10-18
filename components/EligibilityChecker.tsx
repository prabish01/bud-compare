"use client";

import Link from "next/link";
import { useState } from "react";
import { eligibilityChecker as copy } from "@/lib/eligibilityCheckerData";
import { track } from "@/lib/analytics";
import { IconAlert, IconArrow, IconCheck, IconInfo } from "./Icons";

type QuestionId = (typeof copy.questions)[number]["id"];
type Answers = Partial<Record<QuestionId, string>>;
type ResultKey = keyof typeof copy.results;

function evaluate(a: Answers): ResultKey {
  const barrier = a.age === "No" || a.diagnosis === "No" || a.pregnancy === "Yes" || a.psychosis === "Yes";
  if (barrier) return "barrier";
  const needsInfo =
    a.treatments === "None" || a.treatments === "One" || a.records === "No" || a.records === "Unsure" || a.psychosis === "Prefer not to say";
  return needsInfo ? "moreInfo" : "match";
}

const resultStyle: Record<ResultKey, { panel: string; badge: string; icon: React.ReactNode }> = {
  match: { panel: "from-brand-800 to-brand-600 text-white", badge: "bg-lime text-brand-950", icon: <IconCheck className="h-6 w-6" /> },
  moreInfo: { panel: "from-lime-soft to-white text-ink", badge: "bg-brand-700 text-white", icon: <IconInfo className="h-6 w-6" /> },
  barrier: { panel: "from-amber-soft to-white text-ink", badge: "bg-amber text-white", icon: <IconAlert className="h-6 w-6" /> },
};

export default function EligibilityChecker() {
  const total = copy.questions.length;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<ResultKey | null>(null);

  const q = copy.questions[Math.min(step, total - 1)];

  function choose(option: string) {
    const next = { ...answers, [q.id]: option };
    setAnswers(next);
    if (step < total - 1) {
      setTimeout(() => setStep((s) => s + 1), 180);
    } else {
      const r = evaluate(next);
      setResult(r);
      track("eligibility_check_complete", { result: r });
    }
  }

  function restart() {
    setAnswers({});
    setResult(null);
    setStep(0);
  }

  return (
    <div className="not-prose overflow-hidden rounded-3xl border border-line bg-white shadow-[0_30px_70px_-45px_rgba(8,56,41,0.45)]">
      {/* Progress */}
      <div className="flex items-center gap-4 border-b border-line bg-sand/60 px-5 py-4 sm:px-8">
        <div className="flex flex-1 gap-1.5" aria-hidden="true">
          {copy.questions.map((x, i) => (
            <span
              key={x.id}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                result || i < step ? "bg-brand-600" : i === step ? "bg-lime-strong" : "bg-line"
              }`}
            />
          ))}
        </div>
        <span className="shrink-0 text-xs font-semibold tabular-nums text-muted">
          {result ? "Complete" : `${step + 1} / ${total}`}
        </span>
      </div>

      {!result ? (
        <div className="px-5 py-8 sm:px-10 sm:py-12">
          <h3 key={q.id} className="max-w-xl text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-[1.9rem]">
            {q.label}
          </h3>

          <div role="radiogroup" aria-label={q.label} className="mt-8 grid gap-3 sm:grid-cols-2">
            {q.options.map((o) => {
              const on = answers[q.id] === o;
              return (
                <button
                  key={o}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => choose(o)}
                  className={`group flex cursor-pointer items-center justify-between gap-3 rounded-2xl border-2 px-5 py-4 text-left text-lg font-medium transition ${
                    on
                      ? "border-brand-600 bg-brand-50 text-brand-800"
                      : "border-line bg-white text-ink hover:border-brand-600/40 hover:bg-sand/50"
                  }`}
                >
                  {o}
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition ${
                      on ? "border-brand-600 bg-brand-600 text-white" : "border-ink/20 group-hover:border-brand-600/50"
                    }`}
                  >
                    {on && <IconCheck className="h-3.5 w-3.5" />}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-muted transition hover:bg-sand hover:text-ink disabled:invisible"
            >
              ← Back
            </button>
            {answers[q.id] && step < total - 1 && (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
              >
                Next <IconArrow className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-[1.3fr_1fr]">
          <div className={`bg-gradient-to-br px-5 py-8 sm:px-10 sm:py-12 ${resultStyle[result].panel}`} role="status">
            <span className={`grid h-12 w-12 place-items-center rounded-2xl ${resultStyle[result].badge}`}>{resultStyle[result].icon}</span>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">{copy.results[result].title}</h3>
            <p className="mt-3 max-w-md text-[1.05rem] leading-relaxed opacity-85">{copy.results[result].text}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              <Link
                href="/medical-cannabis-clinics/"
                className={`btn inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${
                  result === "match" ? "bg-lime text-brand-950" : "bg-brand-700 text-white"
                }`}
              >
                Compare clinics <IconArrow />
              </Link>
              <button
                type="button"
                onClick={restart}
                className={`cursor-pointer rounded-full px-5 py-3 text-sm font-semibold ring-1 ${
                  result === "match" ? "text-white ring-white/30 hover:bg-white/10" : "text-ink ring-ink/15 hover:bg-white"
                }`}
              >
                Start again
              </button>
            </div>
          </div>
          <div className="border-t border-line bg-sand/40 px-5 py-8 sm:px-8 md:border-l md:border-t-0">
            <p className="text-xs font-semibold text-muted">Your answers</p>
            <ol className="mt-4 space-y-3">
              {copy.questions.map((x, i) => (
                <li key={x.id} className="flex items-start justify-between gap-3 text-sm">
                  <span className="text-ink/75">{x.label}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setResult(null);
                      setStep(i);
                    }}
                    className="shrink-0 cursor-pointer rounded-full bg-white px-2.5 py-0.5 font-semibold text-brand-700 ring-1 ring-line hover:ring-brand-600/40"
                    title="Change answer"
                  >
                    {answers[x.id]}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
