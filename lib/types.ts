// Shared content types for every page data file in /lib.
//
// Inline text formatting (inside any `text` / list item / table cell):
//   **bold**                     bold text
//   [label](/internal-path/)     link (label may contain **bold**)
//   [[cite:https://example]]     small source chip linking to a reference
//   \n                           line break

import type { ClinicId } from "./clinicsData";

export type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][]; caption?: string }
  /** Small "prices checked" style note */
  | { type: "note"; text: string }
  /** Highlighted summary box, e.g. "Quick verdict" */
  | { type: "callout"; text: string }
  /** "→ Read our review" style link line */
  | { type: "linkline"; text: string }
  | {
      type: "proscons";
      pros: { title: string; items: string[] };
      cons: { title: string; items: string[] };
    }
  | { type: "faq"; items: { q: string; a: string[] }[] }
  /** Interactive tools */
  | { type: "tool"; tool: "comparison" | "eligibility" }
  | { type: "toolButton"; label: string; href: string }
  /** Live pricing pulled from lib/clinicsData.ts */
  | { type: "clinicPricing"; clinic: ClinicId }
  /** Side-by-side clinic table + 1/3/5-year costs from lib/clinicsData.ts */
  | { type: "clinicCompare"; clinics: ClinicId[] }
  | { type: "comingSoon"; title: string; text: string }
  // ---- Visual groupings of document paragraphs (text kept verbatim) ----
  /** "**a → b → c**" pathway */
  | { type: "flow"; text: string }
  /** "Step N" + question + answer options */
  | { type: "stepCards"; items: { title: string; question: string; options: string[] }[] }
  /** parts = result */
  | { type: "equation"; parts: string[]; operator: string; result: string }
  /** "Therefore: X is acceptable. But avoid: Y unless..." */
  | {
      type: "dodont";
      do: { lead: string; phrase: string; after: string };
      dont: { lead: string; phrase: string; after: string };
    }
  /** "... isn't: X  It's: Y" */
  | { type: "contrast"; not: { lead: string; text: string }; is: { lead: string; text: string } }
  /** Worked examples, e.g. Clinic A / Clinic B */
  | { type: "examples"; items: { title: string; body: string; total: string }[] }
  /** "Key: value" lines */
  | { type: "kv"; text: string; title?: string }
  /** "**Label:\n**A | B | C" */
  | { type: "chipGroup"; text: string }
  /** "**1. ...**" numbered steps */
  | { type: "steps"; items: string[] }
  /** Bold questions to ask */
  | { type: "questions"; items: string[] }
  /** Titled cards (from sub-headings or bold titles followed by one paragraph) */
  | { type: "cards"; numbered: boolean; items: { title: string; text: string[] }[] }
  /** Lead-in lines ("Clinic A charges:") paired with highlighted figures */
  | { type: "statRow"; items: { kind: "join" | "value"; text: string }[] }
  /** Short bold labels shown as tiles */
  | { type: "chips"; items: string[] }
  /** Standalone key statement */
  | { type: "keyline"; text: string };

export type PageCategory = "guide" | "review" | "comparison" | "condition" | "tool";

export type PageData = {
  path: string;
  navLabel: string;
  category: PageCategory;
  meta: { title: string; description: string };
  breadcrumb: { label: string; href?: string }[];
  hero: { title: string; lede?: string };
  body: Block[];
  relatedLinks?: { label: string; href: string }[];
  /** Schema types requested in the brief (FAQPage / BreadcrumbList are added automatically) */
  schema?: string[];
};
