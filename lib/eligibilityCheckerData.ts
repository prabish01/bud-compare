// Content for /eligibility-checker/
// Source: "MEDICAL CANNABIS ELIGIBILITY CHECKER UK.docx". Edit the text below to update the page.
// Inline formatting: **bold**, [text](/link/), [[cite:https://source]] = source chip, \n = line break.
import type { PageData } from "./types";

export const eligibilityCheckerData: PageData = {
  path: "/eligibility-checker/",
  navLabel: "Eligibility checker",
  category: "tool",
  meta: {
    title: "Medical Cannabis Eligibility Checker UK | BudCompare",
    description: "Check whether you may meet common criteria for a UK medical cannabis assessment and understand what clinics consider before prescribing decisions.",
  },
  breadcrumb: [
    {
      label: "Tools",
    },
  ],
  hero: {
    title: "Medical Cannabis Eligibility Checker UK",
    lede: "Wondering whether you could be eligible for medical cannabis in the UK?",
  },
  body: [
    {
      type: "p",
      text: "Our free eligibility checker is designed to help you understand whether your circumstances **may align with common preliminary criteria used by private medical cannabis clinics**.",
    },
    {
      type: "p",
      text: "It cannot diagnose you, recommend treatment or determine whether medical cannabis should be prescribed.",
    },
    {
      type: "p",
      text: "Only an appropriately qualified clinician can make that decision.",
    },
    {
      type: "h2",
      text: "Start the Eligibility Check",
    },
    {
      type: "tool",
      tool: "eligibility",
    },
    {
      type: "h2",
      text: "Who Can Be Prescribed Medical Cannabis?",
    },
    {
      type: "p",
      text: "Cannabis-based products for medicinal use have been legally prescribable in the UK since 2018.",
    },
    {
      type: "p",
      text: "For many unlicensed CBPMs, initial prescribing must be undertaken by a specialist medical practitioner on the GMC Specialist Register.[[cite:https://www.nice.org.uk/guidance/ng144/chapter/Recommendations]]",
    },
    {
      type: "p",
      text: "The clinician must make an individual decision based on clinical circumstances.",
    },
    {
      type: "h2",
      text: "Do You Have to Try Two Treatments First?",
    },
    {
      type: "p",
      text: "This requires careful explanation.",
    },
    {
      type: "p",
      text: "You'll frequently see “two treatments” mentioned by UK private clinics.",
    },
    {
      type: "p",
      text: "For example, Alternaleaf currently states on numerous condition pages that its applicants should have a diagnosis and have been offered at least two conventional treatments, which can include interventions such as medicines, talking therapies, physiotherapy or surgery depending on the condition.[[cite:https://www.alternaleaf.co.uk/conditions/pmdd]]",
    },
    {
      type: "p",
      text: "But don't confuse a clinic's screening criteria with the law.",
    },
    {
      type: "p",
      text: "NHS England says there is **no restriction in law specifying which indications CBPMs can be prescribed for**. Prescribing is a clinical decision involving the patient's condition, previous/current medicines, evidence, risks and alternative treatments.[[cite:https://www.england.nhs.uk/long-read/cannabis-based-products-for-medicinal-use-cbpms/]]",
    },
    {
      type: "h2",
      text: "What Conditions Are Considered?",
    },
    {
      type: "p",
      text: "Private clinics publish different lists of conditions they assess.",
    },
    {
      type: "p",
      text: "Rather than assuming that appearing on a list means cannabis is proven to treat that condition, ask two separate questions:",
    },
    {
      type: "statRow",
      items: [
        {
          kind: "value",
          text: "**Does the clinic assess patients with this diagnosis?**",
        },
        {
          kind: "join",
          text: "and:",
        },
        {
          kind: "value",
          text: "**What does current clinical guidance say about cannabis-based medicines for this condition?**",
        },
      ],
    },
    {
      type: "p",
      text: "Those questions can produce different answers.",
    },
    {
      type: "p",
      text: "For example, private clinics assess some chronic pain patients, but NICE currently recommends against offering several cannabis-based products for chronic pain in adults and says CBD should not be offered for chronic pain except as part of a clinical trial.[[cite:https://www.nice.org.uk/guidance/NG144/chapter/recommendations]]",
    },
    {
      type: "p",
      text: "That's exactly why a specialist assessment matters.",
    },
    {
      type: "h2",
      text: "What Happens If the Checker Says I May Be Eligible?",
    },
    {
      type: "p",
      text: "Don't treat the result as medical approval.",
    },
    {
      type: "p",
      text: "Your next steps are to:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Compare regulated providers.",
        "Read their current eligibility requirements.",
        "Understand the costs.",
        "Provide accurate medical information.",
        "Attend a clinical assessment.",
        "Discuss benefits, uncertainties and risks with the clinician.",
      ],
    },
    {
      type: "h2",
      text: "What Will a Clinician Consider?",
    },
    {
      type: "p",
      text: "NICE highlights factors including:",
    },
    {
      type: "list",
      ordered: false,
      items: [
        "medical history",
        "mental health history",
        "other medicines",
        "previous/current cannabis use",
        "potential drug interactions",
        "dependence and misuse risk",
        "pregnancy/breastfeeding",
        "potential benefits and harms.",
      ],
    },
    {
      type: "p",
      text: "This demonstrates why eligibility cannot responsibly be reduced to a three-question marketing form.",
    },
    {
      type: "h2",
      text: "NHS Eligibility vs Private Eligibility",
    },
    {
      type: "p",
      text: "These are different pathways.",
    },
    {
      type: "p",
      text: "The NHS says medical cannabis prescriptions remain likely only for a relatively small number of patients and identifies certain severe epilepsies, chemotherapy-related sickness and MS spasticity among the principal situations.[[cite:https://www.nhs.uk/medicines/medical-cannabis/]]",
    },
    {
      type: "p",
      text: "Private specialists may consider CBPMs in other circumstances where lawful and clinically appropriate.[[cite:https://www.england.nhs.uk/long-read/cannabis-based-products-for-medicinal-use-cbpms/]]",
    },
    {
      type: "p",
      text: "Read [**NHS vs Private Medical Cannabis UK**](/nhs-vs-private-medical-cannabis/) for a detailed explanation.",
    },
    {
      type: "h2",
      text: "FAQs",
    },
    {
      type: "faq",
      items: [
        {
          q: "Does passing this checker mean I qualify?",
          a: [
            "No. It indicates only that your answers may align with common preliminary screening criteria.",
          ],
        },
        {
          q: "Will I definitely receive a prescription?",
          a: ["No."],
        },
        {
          q: "Can my GP prescribe it?",
          a: [
            "Initial prescribing rules for many CBPMs involve specialist practitioners; arrangements for subsequent prescribing can differ.[[cite:https://www.nice.org.uk/guidance/ng144/chapter/Recommendations]]",
          ],
        },
        {
          q: "Is medical cannabis legal?",
          a: [
            "Prescribed medical cannabis is legal when supplied and possessed in accordance with UK law. Recreational cannabis remains illegal.[[cite:https://www.nhs.uk/medicines/medical-cannabis/]]",
          ],
        },
      ],
    },
    {
      type: "h2",
      text: "Compare Clinics After Your Check",
    },
    {
      type: "p",
      text: "If your answers indicate that a specialist assessment could be worth exploring, your next step is **not “buy cannabis”**.",
    },
    {
      type: "p",
      text: "It's:",
    },
    {
      type: "flow",
      text: "**Compare appropriate UK medical cannabis clinics → understand their fees → review their eligibility process → decide whether to request a consultation.**",
    },
  ],
};

// Interactive checker: questions and result wording from the source document.
export const eligibilityChecker = {
  questions: [
    { id: "age", label: "Are you aged 18 or over?", options: ["Yes", "No"] },
    { id: "diagnosis", label: "Do you have a diagnosed medical condition?", options: ["Yes", "No"] },
    { id: "treatments", label: "Have you previously tried conventional treatment for that condition?", options: ["None", "One", "Two or more"] },
    { id: "records", label: "Can you provide relevant medical records?", options: ["Yes", "No", "Unsure"] },
    { id: "pregnancy", label: "Are you currently pregnant or breastfeeding?", options: ["Yes", "No"] },
    { id: "psychosis", label: "Do you have a history of psychosis or schizophrenia?", options: ["Yes", "No", "Prefer not to say"] },
  ],
  results: {
    match: {
      title: "Potential match",
      text: "Your answers appear consistent with some commonly published private-clinic screening criteria. A specialist assessment is required before any treatment can be prescribed.",
    },
    moreInfo: {
      title: "Further information needed",
      text: "Your circumstances may require individual assessment. Compare clinics and ask about their current eligibility process.",
    },
    barrier: {
      title: "Potential barrier identified",
      text: "One or more answers may affect eligibility. This tool cannot determine suitability; discuss your circumstances with an appropriately qualified healthcare professional.",
    },
  },
} as const;
