// Content for /medical-cannabis-cost-uk/
// Source: "MEDICAL CANNABIS COST UK.docx". Edit the text below to update the page.
// Inline formatting: **bold**, [text](/link/), [[cite:https://source]] = source chip, \n = line break.
import type { PageData } from "./types";

export const costData: PageData = {
  path: "/medical-cannabis-cost-uk/",
  navLabel: "Medical cannabis cost",
  category: "guide",
  meta: {
    title: "Medical Cannabis Cost UK 2026: Clinic Fees & Costs",
    description: "How much does medical cannabis cost in the UK? Compare clinic consultations, follow-up fees, memberships and other potential treatment costs.",
  },
  breadcrumb: [
    {
      label: "Guides",
    },
  ],
  hero: {
    title: "How Much Does Medical Cannabis Cost in the UK?",
    lede: "The cost of private medical cannabis in the UK isn't one simple monthly fee.",
  },
  body: [
    {
      type: "p",
      text: "Patients may need to pay for both **private clinical care and prescribed medication**, and the structure varies between providers.",
    },
    {
      type: "contrast",
      not: {
        lead: "That means the useful question isn't:",
        text: "“What's the cheapest consultation?”",
      },
      is: {
        lead: "It's:",
        text: "**“What could my total annual cost be?”**",
      },
    },
    {
      type: "p",
      text: "That's the figure our comparison methodology focuses on.",
    },
    {
      type: "h2",
      text: "The Two Main Medical Cannabis Costs",
    },
    {
      type: "h3",
      text: "1. Clinic costs",
    },
    {
      type: "p",
      text: "Potential charges include:",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "initial consultation",
        "follow-up appointments",
        "subscriptions",
        "repeat prescription administration",
        "additional clinical reviews",
      ],
    },
    {
      type: "h3",
      text: "2. Medication",
    },
    {
      type: "p",
      text: "Medication is normally a separate expense and varies according to the prescription.",
    },
    {
      type: "p",
      text: "You should therefore be suspicious of comparisons that combine a £5 clinic membership with wording suggesting medical cannabis itself costs £5 per month.",
    },
    {
      type: "p",
      text: "It doesn't.",
    },
    {
      type: "h2",
      text: "Current Clinic Price Examples",
    },
    {
      type: "p",
      text: "At the time checked:",
    },
    {
      type: "table",
      headers: ["Provider", "Example Clinic Pricing", "Medication Included?"],
      rows: [
        ["Alternaleaf", "£5/month membership or £29 PAYG appointment", "No"],
        ["Curaleaf", "£5/month subscription or £30 PAYG", "No"],
        ["Mamedica", "Several programmes from differing onboarding prices", "No"],
      ],
    },
    {
      type: "p",
      text: "Alternaleaf's published pages currently advertise £5 monthly membership or £29 PAYG appointments.",
    },
    {
      type: "p",
      text: "Curaleaf currently advertises £5 monthly or £30 PAYG, with its monthly subscription covering an initial appointment and four routine appointments annually.[[cite:https://curaleafclinic.com/pricing/]]",
    },
    {
      type: "p",
      text: "Mamedica currently advertises multiple models rather than one simple subscription.[[cite:https://mamedica.co.uk/]]",
    },
    {
      type: "note",
      text: "**Pricing last checked: September 2026.**",
    },
    {
      type: "h2",
      text: "What Does the Medication Cost?",
    },
    {
      type: "p",
      text: "There is no single answer because the prescription is individual.",
    },
    {
      type: "p",
      text: "Variables include:",
    },
    {
      type: "list",
      ordered: false,
      items: ["product", "formulation", "quantity", "dose", "pharmacy", "frequency"],
    },
    {
      type: "p",
      text: "Alternaleaf currently states on some pages that medication may start at around £20 per week, with flower from £5 per gram. Those figures are advertised starting points, not a promise of what an individual patient's treatment will cost.[[cite:https://www.alternaleaf.co.uk/locations/birmingham]]",
    },
    {
      type: "h2",
      text: "Example: Why Annual Cost Matters",
    },
    {
      type: "p",
      text: "Consider two hypothetical clinics.",
    },
    {
      type: "examples",
      items: [
        {
          title: "**Clinic A**",
          body: "£10 initial consultation\n£40 × four follow-ups\n£10 repeat administration × six",
          total: "Annual clinical cost = £230.",
        },
        {
          title: "**Clinic B**",
          body: "£15 monthly membership covering routine appointments and repeats.",
          total: "Annual clinical cost = £180.",
        },
      ],
    },
    {
      type: "p",
      text: "Clinic A looked cheaper when you searched for the initial consultation.",
    },
    {
      type: "p",
      text: "Clinic B became cheaper when you calculated the year.",
    },
    {
      type: "p",
      text: "That's why our site compares **effective annual clinic cost** wherever enough pricing information exists.",
    },
    {
      type: "h2",
      text: "What Else Should You Budget For?",
    },
    {
      type: "p",
      text: "Depending on your provider and circumstances, investigate:",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "delivery fees",
        "equipment where relevant",
        "extra appointments",
        "travel documentation",
        "prescription changes",
        "cancellation charges",
      ],
    },
    {
      type: "p",
      text: "Don't assume these are either included or excluded. Check.",
    },
    {
      type: "h2",
      text: "Can You Get Medical Cannabis on the NHS?",
    },
    {
      type: "p",
      text: "Yes in some circumstances, but access remains limited.",
    },
    {
      type: "p",
      text: "The NHS says very few people in England are likely to receive an NHS medical cannabis prescription, with access principally associated with certain severe epilepsies, chemotherapy-related nausea/vomiting and MS spasticity.[[cite:https://www.nhs.uk/medicines/medical-cannabis/]]",
    },
    {
      type: "p",
      text: "Consequently, people researching treatment privately should understand the potential long-term cost before registering.",
    },
    {
      type: "h2",
      text: "How to Find Better Value",
    },
    {
      type: "p",
      text: "Don't simply choose the lowest advertised price.",
    },
    {
      type: "p",
      text: "Instead:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Establish your likely appointment frequency.",
        "Calculate 12 months of clinic fees.",
        "Identify repeat/admin charges.",
        "Check delivery.",
        "Investigate access programmes.",
        "Keep medication separate.",
        "Compare at least three clinics.",
      ],
    },
    {
      type: "p",
      text: "Our [**Medical Cannabis Clinic Comparison Tool**](/medical-cannabis-clinics/) is designed to do much of this work for you.",
    },
    {
      type: "h2",
      text: "FAQs",
    },
    {
      type: "faq",
      items: [
        {
          q: "How much does private medical cannabis cost per month?",
          a: [
            "There is no universal figure. Clinic fees and medication vary independently.",
          ],
        },
        {
          q: "Is £5 per month the total cost?",
          a: [
            "No. Where a clinic advertises a £5 membership, prescribed medication is normally an additional cost.[[cite:https://www.alternaleaf.co.uk/conditions/pmdd]]",
          ],
        },
        {
          q: "Are there cheaper access schemes?",
          a: [
            "Some providers offer special programmes subject to eligibility requirements.",
          ],
        },
        {
          q: "Can prices change?",
          a: [
            "Yes. That's why every price table on this site should carry a **last verified** date.",
          ],
        },
      ],
    },
    {
      type: "h2",
      text: "Compare Before Paying",
    },
    {
      type: "p",
      text: "Use our [**Clinic Comparison Tool**](/medical-cannabis-clinics/) to calculate the likely first-year cost of several UK providers side-by-side.",
    },
  ],
  relatedLinks: [
    {
      label: "Cheapest Clinics",
      href: "/cheapest-medical-cannabis-clinics-uk/",
    },
    {
      label: "Best Clinics",
      href: "/best-medical-cannabis-clinics-uk/",
    },
    {
      label: "Alternaleaf Review",
      href: "/clinics/alternaleaf/",
    },
    {
      label: "Curaleaf Review",
      href: "/clinics/curaleaf/",
    },
    {
      label: "Mamedica Review",
      href: "/clinics/mamedica/",
    },
    {
      label: "Eligibility Checker",
      href: "/eligibility-checker/",
    },
  ],
  schema: [
    "Dataset where appropriate",
    "ItemList",
    "FAQPage where eligible",
    "BreadcrumbList.",
  ],
};
