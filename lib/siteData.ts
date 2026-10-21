// Site-wide settings: name, navigation, footer and disclaimers.

export const siteData = {
  name: "BudCompare",
  url: "https://www.budcompare.com",
  tagline: "Compare UK medical cannabis clinics, consultation fees, ongoing costs and access.",
  headerCta: { label: "Check eligibility", href: "/eligibility-checker/" },

  nav: [
    { label: "Compare clinics", href: "/medical-cannabis-clinics/" },
    {
      label: "Clinic reviews",
      children: [
        { label: "Alternaleaf review", href: "/clinics/alternaleaf/" },
        { label: "Curaleaf Clinic review", href: "/clinics/curaleaf/" },
        { label: "Mamedica review", href: "/clinics/mamedica/" },
        { label: "Alternaleaf vs Curaleaf", href: "/compare/alternaleaf-vs-curaleaf/" },
        { label: "Alternaleaf vs Mamedica", href: "/compare/alternaleaf-vs-mamedica/" },
        { label: "Curaleaf vs Mamedica", href: "/compare/curaleaf-vs-mamedica/" },
      ],
    },
    {
      label: "Guides",
      children: [
        { label: "Best clinics UK 2026", href: "/best-medical-cannabis-clinics-uk/" },
        { label: "Cheapest clinics UK", href: "/cheapest-medical-cannabis-clinics-uk/" },
        { label: "How to get medical cannabis", href: "/how-to-get-medical-cannabis-uk/" },
        { label: "Medical cannabis cost", href: "/medical-cannabis-cost-uk/" },
        { label: "NHS vs private", href: "/nhs-vs-private-medical-cannabis/" },
        { label: "Medical cannabis flower", href: "/medical-cannabis-flower/" },
        { label: "Medical cannabis oils", href: "/medical-cannabis-oils/" },
      ],
    },
    {
      label: "Conditions",
      children: [
        { label: "Chronic pain", href: "/conditions/chronic-pain/" },
        { label: "Anxiety", href: "/conditions/anxiety/" },
        { label: "ADHD", href: "/conditions/adhd/" },
        { label: "Insomnia", href: "/conditions/insomnia/" },
        { label: "PTSD", href: "/conditions/ptsd/" },
      ],
    },
  ] as NavItem[],

  footerCta: {
    title: "Compare the real cost of UK clinics",
    titleAccent: "in under 60 seconds.",
    button: { label: "Compare clinics", href: "/medical-cannabis-clinics/" },
  },

  footerColumns: [
    {
      title: "Compare",
      links: [
        { label: "Clinic comparison tool", href: "/medical-cannabis-clinics/" },
        { label: "Best clinics UK 2026", href: "/best-medical-cannabis-clinics-uk/" },
        { label: "Cheapest clinics UK", href: "/cheapest-medical-cannabis-clinics-uk/" },
        { label: "Eligibility checker", href: "/eligibility-checker/" },
      ],
    },
    {
      title: "Clinic reviews",
      links: [
        { label: "Alternaleaf", href: "/clinics/alternaleaf/" },
        { label: "Curaleaf Clinic", href: "/clinics/curaleaf/" },
        { label: "Mamedica", href: "/clinics/mamedica/" },
        { label: "Alternaleaf vs Curaleaf", href: "/compare/alternaleaf-vs-curaleaf/" },
        { label: "Alternaleaf vs Mamedica", href: "/compare/alternaleaf-vs-mamedica/" },
        { label: "Curaleaf vs Mamedica", href: "/compare/curaleaf-vs-mamedica/" },
      ],
    },
    {
      title: "Guides",
      links: [
        { label: "How to get medical cannabis", href: "/how-to-get-medical-cannabis-uk/" },
        { label: "Medical cannabis cost", href: "/medical-cannabis-cost-uk/" },
        { label: "NHS vs private", href: "/nhs-vs-private-medical-cannabis/" },
        { label: "Medical cannabis flower", href: "/medical-cannabis-flower/" },
        { label: "Medical cannabis oils", href: "/medical-cannabis-oils/" },
      ],
    },
    {
      title: "Conditions",
      links: [
        { label: "Chronic pain", href: "/conditions/chronic-pain/" },
        { label: "Anxiety", href: "/conditions/anxiety/" },
        { label: "ADHD", href: "/conditions/adhd/" },
        { label: "Insomnia", href: "/conditions/insomnia/" },
        { label: "PTSD", href: "/conditions/ptsd/" },
      ],
    },
  ],

  // From the tool brief, section 14.
  disclaimer:
    "This comparison tool compares publicly available clinic pricing and services. It does not provide medical advice or determine whether medical cannabis is suitable for you. Prescription decisions must be made by an appropriately qualified healthcare professional. Medication costs are not included unless explicitly stated.",
  copyright: "© 2026 BudCompare. All rights reserved.",
};

export type NavItem = { label: string; href?: string; children?: { label: string; href: string }[] };
