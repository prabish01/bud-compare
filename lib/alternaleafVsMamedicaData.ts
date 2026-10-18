// Content for /compare/alternaleaf-vs-mamedica/
// NOTE: there was no Word document for this page. Meta comes from the
// metadata spreadsheet; body copy reuses sentences from the Alternaleaf and
// Mamedica review documents. Replace with the final article when available.
import type { PageData } from "./types";

export const alternaleafVsMamedicaData: PageData = {
  path: "/compare/alternaleaf-vs-mamedica/",
  navLabel: "Alternaleaf vs Mamedica",
  category: "comparison",
  meta: {
    title: "Alternaleaf vs Mamedica 2026: Costs & Clinic Comparison",
    description:
      "Compare Alternaleaf and Mamedica on clinic fees, ongoing costs, assessments and services to understand the differences between the two providers.",
  },
  breadcrumb: [{ label: "Compare", href: "/medical-cannabis-clinics/" }],
  hero: {
    title: "Alternaleaf vs Mamedica 2026: Costs & Clinic Comparison",
    lede: "A larger initial payment can look expensive beside a £5-per-month competitor, but some Mamedica plans eventually reduce clinic fees to zero.",
  },
  body: [
    { type: "h2", text: "Alternaleaf vs Mamedica: Quick Comparison" },
    { type: "clinicCompare", clinics: ["alternaleaf", "mamedica"] },
    { type: "h2", text: "Two Different Pricing Models" },
    { type: "p", text: "Alternaleaf's £60 annual membership makes its published clinic fees highly competitive." },
    { type: "p", text: "Mamedica's structure involves larger initial charges but some programmes remove clinic fees later." },
    { type: "p", text: "This is precisely why headline appointment price alone isn't enough." },
    { type: "h2", text: "Which Is Cheaper?" },
    { type: "p", text: "That depends entirely on the timeframe." },
    { type: "p", text: "If you're comparing the first month, competitors with £5 subscriptions look substantially cheaper." },
    {
      type: "p",
      text: "If you're comparing several years and Mamedica's published zero-clinic-fee arrangements remain in place, the calculation can change.",
    },
    { type: "h2", text: "Delivery and Travel Letters" },
    { type: "p", text: "Alternaleaf's payment options include travel letters and one free medication delivery each month." },
    {
      type: "p",
      text: "Mamedica includes one monthly delivery and travel letters for Standard, Access and Transfer patients. Flex patients currently pay £9.99 for medication delivery and £10 for travel letters.",
    },
    { type: "h2", text: "Regulatory Comparison" },
    {
      type: "p",
      text: "Following an assessment in July 2025, the Care Quality Commission rated Alternaleaf **Requires Improvement**. The report was published on 27 February 2026.",
    },
    {
      type: "p",
      text: "Mamedica's current Procter Street location is registered with the CQC but has not yet been independently inspected at that address. The regulator displays the previous Mamedica location's November 2024 Good ratings to provide historical context.",
    },
    { type: "note", text: "**Prices checked September 2026. Medication is not included. Always verify current pricing and suitability directly with the clinic.**" },
    { type: "h2", text: "Read the Full Reviews" },
    { type: "linkline", text: "→ [**Read our full Alternaleaf Review**](/clinics/alternaleaf/)" },
    { type: "linkline", text: "→ [**Read our full Mamedica Review**](/clinics/mamedica/)" },
    { type: "linkline", text: "→ [**Compare all clinics with the Clinic Comparison Tool**](/medical-cannabis-clinics/)" },
  ],
};
