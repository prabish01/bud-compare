// Content for /compare/alternaleaf-vs-curaleaf/
// NOTE: there was no Word document for this page. Meta comes from the
// metadata spreadsheet; body copy reuses sentences from the Alternaleaf and
// Curaleaf review documents. Replace with the final article when available.
import type { PageData } from "./types";

export const alternaleafVsCuraleafData: PageData = {
  path: "/compare/alternaleaf-vs-curaleaf/",
  navLabel: "Alternaleaf vs Curaleaf",
  category: "comparison",
  meta: {
    title: "Alternaleaf vs Curaleaf 2026: Costs & Clinic Comparison",
    description:
      "Compare Alternaleaf vs Curaleaf Clinic, including consultation fees, ongoing costs, eligibility processes and key differences between the clinics.",
  },
  breadcrumb: [{ label: "Compare", href: "/medical-cannabis-clinics/" }],
  hero: {
    title: "Alternaleaf vs Curaleaf 2026: Costs & Clinic Comparison",
    lede: "There's remarkably little between their headline subscription prices.",
  },
  body: [
    { type: "h2", text: "Alternaleaf vs Curaleaf: Quick Comparison" },
    { type: "clinicCompare", clinics: ["alternaleaf", "curaleaf"] },
    { type: "h2", text: "Subscription and PAYG Prices" },
    { type: "p", text: "Both currently advertise £5-per-month options." },
    { type: "p", text: "Curaleaf additionally offers a £50 annual plan, while Alternaleaf's membership equates to £60 annually." },
    {
      type: "statRow",
      items: [
        { kind: "join", text: "PAYG is similarly close:" },
        { kind: "value", text: "**Alternaleaf: £29 per appointment**" },
        { kind: "value", text: "**Curaleaf: £30 per appointment**" },
      ],
    },
    {
      type: "p",
      text: "The bigger differentiators therefore become appointment schedules, regulatory history, product/pharmacy arrangements and the finer details of each service rather than £1 on an appointment.",
    },
    { type: "h2", text: "What Is Included?" },
    {
      type: "p",
      text: "Alternaleaf's current payment options include personalised clinical care, travel letters and one free medication delivery each month. Alternaleaf also states that it does not charge repeat-prescription fees.",
    },
    {
      type: "p",
      text: "Curaleaf currently advertises free home delivery, no administration fees for repeat prescriptions, and initial and routine appointments under its subscription/annual plans. The monthly option has a four-month minimum term for new patients and a three-month notice period.",
    },
    { type: "h2", text: "Regulatory Comparison" },
    {
      type: "p",
      text: "Following an assessment in July 2025, the Care Quality Commission rated Alternaleaf **Requires Improvement**. The report was published on 27 February 2026.",
    },
    {
      type: "p",
      text: "Curaleaf's latest published CQC assessment, dated February 2025, rates the clinic **Good** overall, with Well-led rated Outstanding.",
    },
    { type: "note", text: "**Prices checked September 2026. Medication is not included. Always verify current pricing and suitability directly with the clinic.**" },
    { type: "h2", text: "Read the Full Reviews" },
    { type: "linkline", text: "→ [**Read our full Alternaleaf Review**](/clinics/alternaleaf/)" },
    { type: "linkline", text: "→ [**Read our full Curaleaf Clinic Review**](/clinics/curaleaf/)" },
    { type: "linkline", text: "→ [**Compare all clinics with the Clinic Comparison Tool**](/medical-cannabis-clinics/)" },
  ],
};
