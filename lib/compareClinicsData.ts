// Content for /medical-cannabis-clinics/
// Source: "Compare Medical Cannabis Clinics UK 2026.docx". Edit the text below to update the page.
// Inline formatting: **bold**, [text](/link/), [[cite:https://source]] = source chip, \n = line break.
import type { PageData } from "./types";

export const compareClinicsData: PageData = {
  path: "/medical-cannabis-clinics/",
  navLabel: "Compare clinics",
  category: "tool",
  meta: {
    title: "Compare Medical Cannabis Clinics UK 2026 | BudCompare",
    description: "Compare UK medical cannabis clinics side by side. Explore consultation fees, follow-up costs, memberships, assessment processes and clinic services.",
  },
  breadcrumb: [
    {
      label: "Tools",
    },
  ],
  hero: {
    title: "Compare Medical Cannabis Clinics UK 2026",
    lede: "Choosing a private medical cannabis clinic shouldn't require opening 15 browser tabs and building your own spreadsheet.",
  },
  body: [
    {
      type: "p",
      text: "Clinic pricing can include monthly subscriptions, PAYG appointments, onboarding fees, follow-ups, delivery charges, repeat-prescription fees and special access schemes.",
    },
    {
      type: "p",
      text: "And the cheapest clinic in month one isn't necessarily the cheapest after three years.",
    },
    {
      type: "p",
      text: "Our **Medical Cannabis Clinic Comparison Tool** brings that information together so you can compare UK clinics on the same basis.",
    },
    {
      type: "tool",
      tool: "comparison",
    },
    {
      type: "h3",
      text: "Quick filters",
    },
    {
      type: "chipGroup",
      text: "**Sort by:**\nLowest Year 1 cost | Lowest Year 3 cost | Lowest upfront cost | CQC status | Alphabetical",
    },
    {
      type: "chipGroup",
      text: "**Filter by:**\nMonthly membership | PAYG | Access scheme | Transfer scheme | Free delivery | Online consultations",
    },
    {
      type: "h2",
      text: "Compare Leading UK Medical Cannabis Clinics",
    },
    {
      type: "table",
      headers: ["Clinic", "Entry Structure*", "Annual Option", "Delivery", "CQC Information"],
      rows: [
        [
          "Alternaleaf",
          "£5/month or £29 PAYG",
          "£60 membership equivalent",
          "1/month included",
          "Requires Improvement",
        ],
        ["Curaleaf Clinic", "£5/month or £30 PAYG", "£50 upfront option", "Free", "Good"],
        [
          "Mamedica",
          "From £49 onboarding",
          "Plan dependent",
          "Depends on plan",
          "Current site not yet separately inspected; previous site Good",
        ],
      ],
    },
    {
      type: "note",
      text: "**Prices checked September 2026. Medication is not included. Always verify current pricing and suitability directly with the clinic.**",
    },
    {
      type: "h2",
      text: "Why Clinic Prices Are Difficult to Compare",
    },
    {
      type: "p",
      text: "Imagine three clinics.",
    },
    {
      type: "statRow",
      items: [
        {
          kind: "join",
          text: "Clinic A charges:",
        },
        {
          kind: "value",
          text: "**£5 per month.**",
        },
        {
          kind: "join",
          text: "Clinic B charges:",
        },
        {
          kind: "value",
          text: "**£50 per year.**",
        },
        {
          kind: "join",
          text: "Clinic C charges:",
        },
        {
          kind: "value",
          text: "**£200 once, followed by no ongoing clinic fees for qualifying patients.**",
        },
      ],
    },
    {
      type: "p",
      text: "Which is cheapest?",
    },
    {
      type: "p",
      text: "After one year, Clinic B may appear cheapest.",
    },
    {
      type: "p",
      text: "After several years, Clinic C could become less expensive in cumulative clinic fees.",
    },
    {
      type: "p",
      text: "And if one clinic charges delivery or repeat-prescription fees while another includes them, the calculation changes again.",
    },
    {
      type: "p",
      text: "That's why we don't rank providers solely by the first number on their pricing page.",
    },
    {
      type: "h2",
      text: "Compare Total Clinic Cost",
    },
    {
      type: "p",
      text: "Our calculator should estimate:",
    },
    {
      type: "cards",
      numbered: false,
      items: [
        {
          title: "Year 1",
          text: [
            "Initial/onboarding fees + memberships + scheduled reviews + administration + expected delivery.",
          ],
        },
        {
          title: "Year 2",
          text: ["Recurring clinic charges."],
        },
        {
          title: "Year 3",
          text: ["Longer-term cumulative expenditure."],
        },
        {
          title: "Year 5",
          text: ["Useful for understanding access/lifetime-fee programmes."],
        },
      ],
    },
    {
      type: "p",
      text: "Medication remains separate because prescriptions are individual.",
    },
    {
      type: "h2",
      text: "Example: Published Clinic Structures",
    },
    {
      type: "h3",
      text: "Alternaleaf",
    },
    {
      type: "p",
      text: "Alternaleaf currently advertises £5-per-month membership covering required appointments or £29 PAYG appointments.",
    },
    {
      type: "p",
      text: "Medication costs extra. Its membership also includes one free monthly medication delivery and travel letters.",
    },
    {
      type: "h3",
      text: "Curaleaf Clinic",
    },
    {
      type: "p",
      text: "Curaleaf currently offers low-cost subscription/PAYG structures and an annual payment option.",
    },
    {
      type: "clinicPricing",
      clinic: "curaleaf",
    },
    {
      type: "h3",
      text: "Mamedica",
    },
    {
      type: "p",
      text: "Mamedica currently offers several programmes.",
    },
    {
      type: "p",
      text: "Flex starts with a £49 onboarding fee.",
    },
    {
      type: "p",
      text: "Standard starts with £150.",
    },
    {
      type: "p",
      text: "Its qualifying Access programme costs £200 upfront and currently advertises zero clinic fees for life.",
    },
    {
      type: "p",
      text: "Transfer begins at £75.",
    },
    {
      type: "p",
      text: "Medication isn't included.",
    },
    {
      type: "p",
      text: "This is exactly why comparison requires more than one “consultation price” column.",
    },
    {
      type: "h2",
      text: "What Should You Compare?",
    },
    {
      type: "h3",
      text: "1. First-Year Clinic Cost",
    },
    {
      type: "p",
      text: "This is much more useful than initial-consultation price.",
    },
    {
      type: "p",
      text: "We calculate known mandatory clinic fees over the first year wherever enough public information exists.",
    },
    {
      type: "h3",
      text: "2. Long-Term Cost",
    },
    {
      type: "p",
      text: "If you expect to remain under private care, recurring subscriptions can eventually cost more than programmes with larger upfront payments.",
    },
    {
      type: "p",
      text: "Use the **1 / 3 / 5-year toggle**.",
    },
    {
      type: "h3",
      text: "3. Medication",
    },
    {
      type: "p",
      text: "Clinic fees are not the same as prescription costs.",
    },
    {
      type: "p",
      text: "Our clinic comparison therefore keeps medication separate.",
    },
    {
      type: "statRow",
      items: [
        {
          kind: "join",
          text: "Where reliable product data is available, use our:",
        },
        {
          kind: "value",
          text: "[**Medical Cannabis Flower Database**](/medical-cannabis-flower/)",
        },
        {
          kind: "join",
          text: "and",
        },
        {
          kind: "value",
          text: "[**Medical Cannabis Oils Database**](/medical-cannabis-oils/)",
        },
      ],
    },
    {
      type: "p",
      text: "to research current product pricing.",
    },
    {
      type: "h3",
      text: "4. Delivery",
    },
    {
      type: "statRow",
      items: [
        {
          kind: "join",
          text: "A £9.99 delivery fee paid every month becomes:",
        },
        {
          kind: "value",
          text: "**£119.88 per year.**",
        },
      ],
    },
    {
      type: "p",
      text: "That's enough to materially change a “cheap” clinic comparison.",
    },
    {
      type: "p",
      text: "Our cost engine incorporates published delivery charges.",
    },
    {
      type: "h3",
      text: "5. Repeat-Prescription Fees",
    },
    {
      type: "p",
      text: "Some providers include repeat administration.",
    },
    {
      type: "p",
      text: "Others may charge.",
    },
    {
      type: "p",
      text: "This should always have its own database field.",
    },
    {
      type: "h3",
      text: "6. Regulatory Information",
    },
    {
      type: "p",
      text: "Price isn't enough.",
    },
    {
      type: "p",
      text: "Where applicable, we display current information from the Care Quality Commission alongside each provider.",
    },
    {
      type: "p",
      text: "Regulatory ratings can change, so every entry carries a **last checked** date and links users to the relevant regulator information.",
    },
    {
      type: "h3",
      text: "7. Access Schemes",
    },
    {
      type: "p",
      text: "Some clinics offer discounted programmes for particular groups.",
    },
    {
      type: "p",
      text: "Mamedica, for example, currently advertises lifetime clinic access for a one-off £200 fee to qualifying veterans, benefit recipients and students over 18.",
    },
    {
      type: "statRow",
      items: [
        {
          kind: "join",
          text: "The tool should ask:",
        },
        {
          kind: "value",
          text: "**“Could you qualify for an access scheme?”**",
        },
      ],
    },
    {
      type: "p",
      text: "Selecting **Yes** should recalculate results.",
    },
    {
      type: "h3",
      text: "8. Transfer Schemes",
    },
    {
      type: "p",
      text: "Already receiving private medical cannabis?",
    },
    {
      type: "p",
      text: "Don't show that visitor the same results as a new patient.",
    },
    {
      type: "statRow",
      items: [
        {
          kind: "join",
          text: "Add:",
        },
        {
          kind: "value",
          text: "**I am a new patient**",
        },
        {
          kind: "join",
          text: "or",
        },
        {
          kind: "value",
          text: "**I want to transfer clinic.**",
        },
      ],
    },
    {
      type: "p",
      text: "The results should immediately recalculate using transfer pricing.",
    },
    {
      type: "h2",
      text: "Medical Cannabis Clinic Cost Calculator",
    },
    {
      type: "toolButton",
      label: "Open the clinic cost calculator",
      href: "#compare-tool",
    },
    {
      type: "stepCards",
      items: [
        {
          title: "Step 1",
          question: "**Are you a new patient or transferring?**",
          options: ["New patient / Transfer"],
        },
        {
          title: "Step 2",
          question: "**Do you potentially qualify for an access scheme?**",
          options: ["Yes / No / Unsure"],
        },
        {
          title: "Step 3",
          question: "**How long do you want to compare costs over?**",
          options: ["1 year / 3 years / 5 years"],
        },
        {
          title: "Step 4",
          question: "**How important are the following?**",
          options: [
            "Lowest clinic fees",
            "Low upfront payment",
            "Free delivery",
            "PAYG",
            "No long-term subscription",
            "Weekend appointments",
          ],
        },
      ],
    },
    {
      type: "h3",
      text: "Your Results",
    },
    {
      type: "statRow",
      items: [
        {
          kind: "join",
          text: "The results should return:",
        },
        {
          kind: "value",
          text: "**Estimated clinic cost**",
        },
      ],
    },
    {
      type: "kv",
      text: "Year 1: £XXX\nYear 3: £XXX\nYear 5: £XXX",
    },
    {
      type: "statRow",
      items: [
        {
          kind: "join",
          text: "Then:",
        },
        {
          kind: "value",
          text: "**Medication: not included**",
        },
      ],
    },
    {
      type: "note",
      text: "**Pricing last checked: DD/MM/YYYY**",
    },
    {
      type: "p",
      text: "**View Clinic Review**",
    },
    {
      type: "p",
      text: "**Visit Clinic**",
    },
    {
      type: "p",
      text: "The latter becomes your commercial outbound click once an appropriate commercial relationship exists.",
    },
    {
      type: "h2",
      text: "Don't Call It an Eligibility Recommendation",
    },
    {
      type: "p",
      text: "Keep the cost comparison and medical eligibility systems separate.",
    },
    {
      type: "p",
      text: "Someone can find a clinic financially attractive without being clinically suitable for treatment.",
    },
    {
      type: "dodont",
      do: {
        lead: "Therefore:",
        phrase: "**Best price for your filters**",
        after: "is acceptable.",
      },
      dont: {
        lead: "But avoid:",
        phrase: "**Best clinic for your medical condition**",
        after: "unless the statement is supported by defensible methodology and doesn't imply medical suitability.",
      },
    },
    {
      type: "h2",
      text: "Compare Clinic Regulation",
    },
    {
      type: "p",
      text: "Build a dedicated regulatory column:",
    },
    {
      type: "chips",
      items: [
        "**CQC status**",
        "**Inspection date**",
        "**Overall rating**",
        "**Safe**",
        "**Effective**",
        "**Caring**",
        "**Responsive**",
        "**Well-led**",
        "**Report link**",
        "**Last checked**",
      ],
    },
    {
      type: "p",
      text: "This is where your platform starts becoming genuinely useful rather than another affiliate table.",
    },
    {
      type: "h2",
      text: "Add Patient Reviews Later",
    },
    {
      type: "p",
      text: "Phase two should introduce verified patient feedback.",
    },
    {
      type: "p",
      text: "Ask patients to score non-clinical service factors such as:",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "booking experience;",
        "communication;",
        "prescription administration;",
        "delivery;",
        "pricing transparency;",
        "customer service.",
      ],
    },
    {
      type: "p",
      text: "Avoid encouraging patients to score whether a particular prescription “cured” a condition.",
    },
    {
      type: "statRow",
      items: [
        {
          kind: "join",
          text: "The result becomes:",
        },
        {
          kind: "value",
          text: "**MoneySuperMarket + Trustpilot + structured medical-cannabis data.**",
        },
      ],
    },
    {
      type: "h2",
      text: "Our Comparison Methodology",
    },
    {
      type: "p",
      text: "Transparency is essential.",
    },
    {
      type: "p",
      text: "We compare clinics using publicly available provider pricing, independent regulatory information and information supplied by providers where appropriate.",
    },
    {
      type: "p",
      text: "Commercial relationships should **never determine the factual order of price results**.",
    },
    {
      type: "p",
      text: "Sponsored positions should be clearly labelled.",
    },
    {
      type: "p",
      text: "Our calculations should show exactly what has and hasn't been included.",
    },
    {
      type: "h3",
      text: "Included where known",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "onboarding;",
        "consultations;",
        "membership;",
        "scheduled reviews;",
        "repeat/admin charges;",
        "delivery.",
      ],
    },
    {
      type: "h3",
      text: "Not automatically included",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "medication;",
        "optional services;",
        "individual treatment changes;",
        "unexpected additional consultations.",
      ],
    },
    {
      type: "p",
      text: "Every clinic entry carries a date showing when its information was last verified.",
    },
    {
      type: "h2",
      text: "How Often Should Prices Be Updated?",
    },
    {
      type: "statRow",
      items: [
        {
          kind: "join",
          text: "For launch:",
        },
        {
          kind: "value",
          text: "**Weekly automated/manual check of major clinics.**",
        },
        {
          kind: "join",
          text: "When the site grows:",
        },
        {
          kind: "value",
          text: "**Daily monitoring of pricing pages.**",
        },
      ],
    },
    {
      type: "p",
      text: "If a price changes, flag it internally for human verification before changing the database.",
    },
    {
      type: "p",
      text: "Then display:",
    },
    {
      type: "keyline",
      text: "**Price changed ↓ £30 → £29 on 14 September 2026**",
    },
    {
      type: "p",
      text: "That creates another differentiating dataset.",
    },
    {
      type: "h2",
      text: "Medical Cannabis Price History",
    },
    {
      type: "p",
      text: "This could become one of your strongest features.",
    },
    {
      type: "p",
      text: "Imagine clinic pages containing:",
    },
    {
      type: "h3",
      text: "Alternaleaf Price History",
    },
    {
      type: "p",
      text: "2026: £5/month\n2027: [future data]",
    },
    {
      type: "p",
      text: "And product pages showing:",
    },
    {
      type: "kv",
      text: "**Current:** £6.50/g\n**30-day average:** £6.80/g\n**Lowest observed:** £6.00/g",
    },
    {
      type: "p",
      text: "Now you're no longer merely writing articles.",
    },
    {
      type: "p",
      text: "You're creating **proprietary historical data**.",
    },
    {
      type: "h2",
      text: "Can Anyone Join a Medical Cannabis Clinic?",
    },
    {
      type: "p",
      text: "Registering or completing an eligibility form does not guarantee treatment.",
    },
    {
      type: "p",
      text: "Cannabis-based medicinal products can be prescribed within the UK legal framework, but the prescribing decision belongs to the appropriate clinician. Specialist prescribing has been legally possible since the 2018 regulatory changes.",
    },
    {
      type: "p",
      text: "Use our [**Medical Cannabis Eligibility Checker UK**](/eligibility-checker/) before comparing providers if you're unsure about common preliminary criteria.",
    },
    {
      type: "h2",
      text: "FAQs",
    },
    {
      type: "faq",
      items: [
        {
          q: "What is the cheapest medical cannabis clinic in the UK?",
          a: [
            "There isn't one universally cheapest provider. The result changes depending on whether you're comparing upfront, annual or longer-term fees and whether you qualify for access or transfer programmes.",
            "Use the comparison tool to calculate costs for your circumstances.",
          ],
        },
        {
          q: "How much does a medical cannabis clinic cost?",
          a: [
            "Current clinic structures range from low monthly subscriptions to larger one-off onboarding programmes. Medication is normally an additional cost.",
          ],
        },
        {
          q: "Is medication included in clinic fees?",
          a: ["Generally not. Always check the individual provider."],
        },
        {
          q: "Can I switch medical cannabis clinics?",
          a: [
            "Several UK providers accept transfer patients, subject to their clinical and administrative requirements.",
          ],
        },
        {
          q: "Does the cheapest clinic provide the cheapest medication?",
          a: [
            "Not necessarily.",
            "Clinic costs and medication costs should be analysed separately.",
          ],
        },
        {
          q: "Does appearing first mean a clinic is medically better?",
          a: [
            "No.",
            "Price sorting reflects the selected financial filters. It does not determine clinical suitability or quality of treatment.",
          ],
        },
        {
          q: "Do you receive commission from clinics?",
          a: [
            "**[PUBLISHER: INSERT YOUR ACTUAL COMMERCIAL DISCLOSURE.]**",
            "If the site receives referral payments, state that clearly and explain that commercial relationships do not alter factual pricing data or regulatory information.",
          ],
        },
      ],
    },
    {
      type: "h2",
      text: "Find and Compare UK Medical Cannabis Clinics",
    },
    {
      type: "p",
      text: "Instead of comparing providers manually, use our free tool.",
    },
    {
      type: "steps",
      items: [
        "**1. Tell us whether you're new or transferring.**",
        "**2. Choose your preferred payment structure.**",
        "**3. See estimated 1-, 3- and 5-year clinic costs.**",
        "**4. Compare fees, delivery and independent regulatory information.**",
        "**5. Read our detailed clinic reviews.**",
        "**6. Decide whether you want to request a clinical assessment.**",
      ],
    },
    {
      type: "toolButton",
      label: "Compare clinics now",
      href: "#compare-tool",
    },
    {
      type: "p",
      text: "Already know which providers you're considering?",
    },
    {
      type: "linkline",
      text: "→ [**Alternaleaf vs Curaleaf**](/compare/alternaleaf-vs-curaleaf/)",
    },
    {
      type: "linkline",
      text: "→ [**Alternaleaf vs Mamedica**](/compare/alternaleaf-vs-mamedica/)",
    },
    {
      type: "linkline",
      text: "→ [**Curaleaf vs Mamedica**](/compare/curaleaf-vs-mamedica/)",
    },
    {
      type: "p",
      text: "Or browse our complete [**Best Medical Cannabis Clinics UK 2026**](/best-medical-cannabis-clinics-uk/) guide.",
    },
  ],
};

// Interactive comparison tool: question wording from the tool brief / document.
export const comparisonTool = {
  patientType: {
    label: "Are you a new patient or transferring?",
    options: [
      { value: "new", label: "I am a new patient" },
      { value: "transfer", label: "I want to transfer clinic." },
    ],
  },
  access: {
    label: "Could you qualify for a clinic Access/discount scheme?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  period: {
    label: "How long would you like to compare clinic costs over?",
    options: [
      { value: 1, label: "1 year" },
      { value: 3, label: "3 years" },
      { value: 5, label: "5 years" },
    ],
  },
  priorities: {
    label: "What's important to you?",
    options: [
      { value: "lowestCost", label: "Lowest overall clinic cost" },
      { value: "lowestUpfront", label: "Lowest upfront cost" },
      { value: "noSubscription", label: "No monthly subscription" },
      { value: "payg", label: "PAYG available" },
      { value: "freeDelivery", label: "Free delivery" },
      { value: "weekend", label: "Weekend appointments" },
      { value: "accessScheme", label: "Access scheme available" },
      { value: "transferScheme", label: "Transfer scheme available" },
    ],
  },
  sortOptions: [
    { value: "year1", label: "Lowest Year 1 cost" },
    { value: "year3", label: "Lowest Year 3 cost" },
    { value: "year5", label: "Lowest Year 5 cost" },
    { value: "upfront", label: "Lowest upfront cost" },
    { value: "cqc", label: "CQC status" },
    { value: "name", label: "Alphabetical" },
  ],
  submitLabel: "Compare clinics",
  resultNote: "Estimated clinic fees only. Medication costs are not included.",
  disclaimer:
    "This comparison tool compares publicly available clinic pricing and services. It does not provide medical advice or determine whether medical cannabis is suitable for you. Prescription decisions must be made by an appropriately qualified healthcare professional. Medication costs are not included unless explicitly stated.",
};
