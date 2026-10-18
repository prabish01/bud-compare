// Content for the homepage (/).
// NOTE: there was no Word document for the homepage. Meta title/description
// come from the metadata spreadsheet; the remaining copy is assembled from the
// site description and sentences in the other documents. Edit freely.
//
// Button labels: one label per intent, used everywhere.
//   compare intent     -> "Compare clinics"
//   eligibility intent -> "Check eligibility"

export const homeData = {
  meta: {
    title: "Compare UK Medical Cannabis Clinics & Costs | BudCompare",
    description:
      "Compare UK medical cannabis clinics, consultation fees, ongoing costs and access. Understand eligibility and find the right clinic with BudCompare.",
  },

  hero: {
    title: "Compare UK medical cannabis",
    titleAccent: "clinics & costs",
    text: "Compare UK medical cannabis clinics, consultation fees, ongoing costs and access. Understand eligibility and find the right clinic.",
    primaryCta: { label: "Compare clinics", href: "/medical-cannabis-clinics/" },
    secondaryCta: { label: "Check eligibility", href: "/eligibility-checker/" },
  },

  intro: {
    title: "Choosing a private medical cannabis clinic shouldn't require opening 15 browser tabs",
    titleAccent: "and building your own spreadsheet.",
    text: [
      "Clinic pricing can include monthly subscriptions, PAYG appointments, onboarding fees, follow-ups, delivery charges, repeat-prescription fees and special access schemes.",
      "And the cheapest clinic in month one isn't necessarily the cheapest after three years. BudCompare brings that information together so you can compare UK clinics on the same basis.",
    ],
  },

  tools: {
    title: "Tools and guides",
    titleAccent: "in one place",
    lead: {
      title: "Clinic comparison tool",
      text: "See estimated 1-, 3- and 5-year clinic costs side by side, for new and transferring patients.",
      cta: { label: "Compare clinics", href: "/medical-cannabis-clinics/" },
    },
    items: [
      {
        icon: "pound",
        title: "Medical cannabis cost",
        text: "Clinic fees and medication costs, explained separately.",
        href: "/medical-cannabis-cost-uk/",
      },
      {
        icon: "check",
        title: "Eligibility checker",
        text: "Common preliminary criteria used by private clinics.",
        href: "/eligibility-checker/",
      },
      {
        icon: "route",
        title: "NHS vs private",
        text: "How NHS and private access to medical cannabis differ, including who prescribes and what it costs.",
        href: "/nhs-vs-private-medical-cannabis/",
      },
    ],
  },

  whyCompare: {
    title: "What should you",
    titleAccent: "compare?",
    text: "The cheapest advertised consultation does not necessarily mean the cheapest clinic overall. We recommend comparing the total expected cost of being a patient.",
    points: [
      { title: "First-year clinic cost", text: "This is much more useful than initial-consultation price." },
      { title: "Long-term cost", text: "Recurring subscriptions can eventually cost more than programmes with larger upfront payments." },
      { title: "Medication", text: "Clinic fees are not the same as prescription costs." },
      { title: "Delivery and repeat fees", text: "A £9.99 delivery fee paid every month becomes £119.88 per year." },
      { title: "Regulatory information", text: "Price isn't enough. We show Care Quality Commission information alongside each provider." },
    ],
    cta: { label: "Compare clinics", href: "/medical-cannabis-clinics/" },
    example: {
      intro: "Imagine three clinics.",
      title: "Which is cheapest?",
      rows: [
        { label: "Clinic A", detail: "£5 per month", years: [60, 180, 300] },
        { label: "Clinic B", detail: "£50 per year", years: [50, 150, 250] },
        { label: "Clinic C", detail: "£200 once", years: [200, 200, 200] },
      ],
      footnote: "After one year, Clinic B may appear cheapest. After several years, Clinic C could become less expensive.",
    },
  },

  howItWorks: {
    title: "How it",
    titleAccent: "works",
    text: "Instead of comparing providers manually, use our free tool.",
    steps: [
      { title: "Tell us whether you're new or transferring.", text: "Transfer patients see transfer pricing where clinics publish it." },
      { title: "Choose your preferred payment structure.", text: "Monthly membership, PAYG, annual plans or access schemes." },
      { title: "See estimated 1-, 3- and 5-year clinic costs.", text: "Estimated clinic fees only. Medication costs are not included." },
      { title: "Compare fees, delivery and independent regulatory information.", text: "Every entry carries a last checked date." },
      { title: "Read our detailed clinic reviews.", text: "Alternaleaf, Curaleaf Clinic and Mamedica, reviewed in depth." },
      { title: "Decide whether you want to request a clinical assessment.", text: "Prescribing remains a clinical decision." },
    ],
    cta: { label: "Compare clinics", href: "/medical-cannabis-clinics/" },
  },

  metrics: {
    title: "UK clinic prices",
    titleAccent: "at a glance",
    note: "Prices checked September 2026. Medication is not included.",
  },

  reviews: {
    title: "Our clinic",
    titleAccent: "reviews",
    text: "Independent reviews of costs, appointments, eligibility, delivery and regulatory record.",
  },

  conditions: {
    title: "Conditions",
    titleAccent: "and evidence",
    text: "What the evidence says, what NICE recommends and how private assessment works.",
    items: [
      { title: "Chronic pain", href: "/conditions/chronic-pain/" },
      { title: "Anxiety", href: "/conditions/anxiety/" },
      { title: "ADHD", href: "/conditions/adhd/" },
      { title: "Insomnia", href: "/conditions/insomnia/" },
      { title: "PTSD", href: "/conditions/ptsd/" },
    ],
  },

  guides: {
    title: "Guides",
    titleAccent: "for patients",
    items: [
      { title: "How to get medical cannabis in the UK", href: "/how-to-get-medical-cannabis-uk/" },
      { title: "Best medical cannabis clinics UK 2026", href: "/best-medical-cannabis-clinics-uk/" },
      { title: "Cheapest medical cannabis clinics UK 2026", href: "/cheapest-medical-cannabis-clinics-uk/" },
      { title: "NHS vs private medical cannabis", href: "/nhs-vs-private-medical-cannabis/" },
      { title: "Medical cannabis flower", href: "/medical-cannabis-flower/" },
      { title: "Medical cannabis oils", href: "/medical-cannabis-oils/" },
    ],
  },
};
