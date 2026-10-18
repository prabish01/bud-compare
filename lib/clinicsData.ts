// ONE SOURCE OF TRUTH for clinic prices, services and CQC information.
//
// Change a number here and every page that uses it updates: the comparison
// tool, 1/3/5-year cost calculations, clinic pricing boxes and generated
// clinic-vs-clinic tables. Prices are in GBP. Medication is never included.
//
// Plan cost model (see lib/costCalculator.ts):
//   upfront                       paid once when joining
//   monthly                       charged every month while the plan runs
//   annual                        charged at the start of every year
//   perAppointment                × appointmentsYear1 in year 1, then
//                                 × appointmentsPerYearAfter each later year
//   scheduledFees                 one-off fees at a given month (1 = first month)
//   deliveryPerMonth              assumes one dispensed delivery per month
//   repeatPrescriptionFee         × repeatsPerYear
//
// `null` means "not published / not checked" and is shown as "Not stated".

export type ClinicId = "alternaleaf" | "curaleaf" | "mamedica";

export type CqcRating = "Outstanding" | "Good" | "Requires Improvement" | "Inadequate" | "Not yet inspected";

export type ClinicPlan = {
  id: string;
  name: string;
  /** Who the plan is for */
  patientType: "new" | "transfer" | "any";
  /** Only available to people who qualify for the clinic's access/discount scheme */
  accessOnly?: boolean;
  /** Pay-as-you-go plan */
  payg?: boolean;
  upfront: number;
  monthly: number;
  annual: number;
  perAppointment: number;
  appointmentsYear1: number;
  appointmentsPerYearAfter: number;
  scheduledFees: { month: number; amount: number }[];
  deliveryPerMonth: number;
  repeatPrescriptionFee: number;
  repeatsPerYear: number;
  /** Short summary shown in results */
  summary: string;
  notes?: string;
};

export type Clinic = {
  id: ClinicId;
  name: string;
  logoText: string;
  logo?: string;
  websiteUrl: string;
  /** Affiliate / referral URL. Leave empty to use websiteUrl. */
  referralUrl: string;
  /** Extra query params appended to outbound links, e.g. { aff_id: "123" } */
  trackingParams: Record<string, string>;
  reviewUrl: string;
  plans: ClinicPlan[];
  // headline fields from the brief
  initialFee: number | null;
  monthlyMembershipFee: number | null;
  annualMembershipFee: number | null;
  paygAppointmentFee: number | null;
  followUpFee: number | null;
  repeatPrescriptionFee: number | null;
  deliveryFee: number | null;
  freeDelivery: boolean | null;
  transferFee: number | null;
  transferScheme: boolean | null;
  accessScheme: boolean | null;
  accessSchemePrice: number | null;
  accessSchemeDetails: string | null;
  travelLetterCost: number | null;
  onlineAppointments: boolean | null;
  weekendAppointments: boolean | null;
  medicationIncluded: boolean;
  cqc: {
    rating: CqcRating;
    displayText: string;
    location: string;
    inspectionDate: string | null;
    safe: CqcRating | null;
    effective: CqcRating | null;
    caring: CqcRating | null;
    responsive: CqcRating | null;
    wellLed: CqcRating | null;
    reportUrl: string;
    lastChecked: string;
  };
  lastPriceCheck: string;
  quickVerdict: string;
  notes: string;
  /** Previous prices, for the future price history feature */
  priceHistory: { date: string; description: string }[];
};

const none = { scheduledFees: [], deliveryPerMonth: 0, repeatPrescriptionFee: 0, repeatsPerYear: 0 };

export const clinicsData: Clinic[] = [
  {
    id: "alternaleaf",
    name: "Alternaleaf",
    logoText: "A",
    websiteUrl: "https://www.alternaleaf.co.uk/",
    referralUrl: "",
    trackingParams: {},
    reviewUrl: "/clinics/alternaleaf/",
    plans: [
      {
        id: "alternaleaf-membership",
        name: "Membership",
        patientType: "any",
        upfront: 0,
        monthly: 5,
        annual: 0,
        perAppointment: 0,
        appointmentsYear1: 4,
        appointmentsPerYearAfter: 2,
        ...none,
        summary: "£5/month membership covering required appointments",
      },
      {
        id: "alternaleaf-payg",
        name: "PAYG",
        patientType: "any",
        payg: true,
        upfront: 0,
        monthly: 0,
        annual: 0,
        perAppointment: 29,
        appointmentsYear1: 4,
        appointmentsPerYearAfter: 2,
        ...none,
        summary: "£29 per appointment (4 in year 1, then six-monthly reviews)",
      },
    ],
    initialFee: 0,
    monthlyMembershipFee: 5,
    annualMembershipFee: null,
    paygAppointmentFee: 29,
    followUpFee: 29,
    repeatPrescriptionFee: 0,
    deliveryFee: 0,
    freeDelivery: true,
    transferFee: null,
    transferScheme: null,
    accessScheme: false,
    accessSchemePrice: null,
    accessSchemeDetails: null,
    travelLetterCost: 0,
    onlineAppointments: true,
    weekendAppointments: true,
    medicationIncluded: false,
    cqc: {
      rating: "Requires Improvement",
      displayText: "Requires Improvement",
      location: "Winnersh (Montu Group UK Ltd)",
      inspectionDate: "July 2025 (report published 27 February 2026)",
      safe: null,
      effective: null,
      caring: null,
      responsive: null,
      wellLed: null,
      reportUrl: "https://www.cqc.org.uk/",
      lastChecked: "September 2026",
    },
    lastPriceCheck: "September 2026",
    quickVerdict: "Simple £5-per-month membership or £29 PAYG appointments.",
    notes: "One free medication delivery per month. Travel letters included. No GP referral required.",
    priceHistory: [{ date: "2026", description: "£5/month" }],
  },
  {
    id: "curaleaf",
    name: "Curaleaf Clinic",
    logoText: "C",
    websiteUrl: "https://curaleafclinic.com/",
    referralUrl: "",
    trackingParams: {},
    reviewUrl: "/clinics/curaleaf/",
    plans: [
      {
        id: "curaleaf-annual",
        name: "Annual plan",
        patientType: "any",
        upfront: 0,
        monthly: 0,
        annual: 50,
        perAppointment: 0,
        appointmentsYear1: 5,
        appointmentsPerYearAfter: 4,
        ...none,
        summary: "£50 per year, paid upfront",
      },
      {
        id: "curaleaf-monthly",
        name: "Monthly subscription",
        patientType: "any",
        upfront: 0,
        monthly: 5,
        annual: 0,
        perAppointment: 0,
        appointmentsYear1: 5,
        appointmentsPerYearAfter: 4,
        ...none,
        summary: "£5/month (four-month minimum term, three-month notice)",
      },
      {
        id: "curaleaf-payg",
        name: "PAYG",
        patientType: "any",
        payg: true,
        upfront: 0,
        monthly: 0,
        annual: 0,
        perAppointment: 30,
        appointmentsYear1: 4,
        appointmentsPerYearAfter: 4,
        ...none,
        summary: "£30 per appointment (typically £120 in year 1)",
      },
    ],
    initialFee: 0,
    monthlyMembershipFee: 5,
    annualMembershipFee: 50,
    paygAppointmentFee: 30,
    followUpFee: 30,
    repeatPrescriptionFee: 0,
    deliveryFee: 0,
    freeDelivery: true,
    transferFee: null,
    transferScheme: null,
    accessScheme: null,
    accessSchemePrice: null,
    accessSchemeDetails: null,
    travelLetterCost: null,
    onlineAppointments: true,
    weekendAppointments: null,
    medicationIncluded: false,
    cqc: {
      rating: "Good",
      displayText: "Good",
      location: "Sapphire Clinics (London) Limited",
      inspectionDate: "February 2025",
      safe: "Good",
      effective: "Good",
      caring: "Good",
      responsive: "Good",
      wellLed: "Outstanding",
      reportUrl: "https://www.cqc.org.uk/",
      lastChecked: "September 2026",
    },
    lastPriceCheck: "September 2026",
    quickVerdict: "£30 PAYG, £5 monthly or a £50 annual plan.",
    notes: "Free home delivery. No administration fee for repeat prescriptions.",
    priceHistory: [],
  },
  {
    id: "mamedica",
    name: "Mamedica",
    logoText: "M",
    websiteUrl: "https://mamedica.co.uk/",
    referralUrl: "",
    trackingParams: {},
    reviewUrl: "/clinics/mamedica/",
    plans: [
      {
        id: "mamedica-flex",
        name: "Flex",
        patientType: "new",
        upfront: 49,
        monthly: 0,
        annual: 0,
        perAppointment: 0,
        appointmentsYear1: 0,
        appointmentsPerYearAfter: 0,
        scheduledFees: [{ month: 9, amount: 49 }],
        deliveryPerMonth: 9.99,
        repeatPrescriptionFee: 0,
        repeatsPerYear: 0,
        summary: "£49 onboarding + £49 in month nine; £9.99 per delivery",
        notes: "Travel letters £10. No clinic fees after month nine.",
      },
      {
        id: "mamedica-standard",
        name: "Standard",
        patientType: "new",
        upfront: 150,
        monthly: 0,
        annual: 0,
        perAppointment: 0,
        appointmentsYear1: 0,
        appointmentsPerYearAfter: 0,
        scheduledFees: [
          { month: 1, amount: 75 },
          { month: 3, amount: 75 },
          { month: 6, amount: 75 },
          { month: 9, amount: 75 },
        ],
        deliveryPerMonth: 0,
        repeatPrescriptionFee: 0,
        repeatsPerYear: 0,
        summary: "£150 onboarding + £75 in months 1, 3, 6 and 9",
        notes: "Includes one monthly delivery and travel letters. No clinic fees after month nine.",
      },
      {
        id: "mamedica-access",
        name: "Access",
        patientType: "new",
        accessOnly: true,
        upfront: 200,
        monthly: 0,
        annual: 0,
        perAppointment: 0,
        appointmentsYear1: 0,
        appointmentsPerYearAfter: 0,
        ...none,
        summary: "£200 one-off, then £0 clinic fees for life (eligibility applies)",
        notes: "Includes one monthly delivery and travel letters.",
      },
      {
        id: "mamedica-transfer",
        name: "Transfer",
        patientType: "transfer",
        upfront: 75,
        monthly: 0,
        annual: 0,
        perAppointment: 0,
        appointmentsYear1: 0,
        appointmentsPerYearAfter: 0,
        scheduledFees: [{ month: 3, amount: 75 }],
        deliveryPerMonth: 0,
        repeatPrescriptionFee: 0,
        repeatsPerYear: 0,
        summary: "£75 onboarding + £75 at month three",
        notes:
          "Assumes at least six months as a patient elsewhere. Shorter histories pay £75 at months three and six. No clinic fees after month nine.",
      },
    ],
    initialFee: 49,
    monthlyMembershipFee: null,
    annualMembershipFee: null,
    paygAppointmentFee: null,
    followUpFee: 75,
    repeatPrescriptionFee: 0,
    deliveryFee: 9.99,
    freeDelivery: null,
    transferFee: 75,
    transferScheme: true,
    accessScheme: true,
    accessSchemePrice: 200,
    accessSchemeDetails:
      "Groups including students over 18, veterans and people receiving certain benefits; the pricing page also references NHS workers and Blue Light Card holders.",
    travelLetterCost: 10,
    onlineAppointments: true,
    weekendAppointments: null,
    medicationIncluded: false,
    cqc: {
      rating: "Not yet inspected",
      displayText: "Current site not yet inspected; previous site Good",
      location: "20 Procter Street, London (registered October 2024)",
      inspectionDate: "Previous location: November 2024",
      safe: "Good",
      effective: "Good",
      caring: "Good",
      responsive: "Good",
      wellLed: "Good",
      reportUrl: "https://www.cqc.org.uk/",
      lastChecked: "September 2026",
    },
    lastPriceCheck: "September 2026",
    quickVerdict: "Programme pricing: Flex, Standard, Access and Transfer.",
    notes: "Free monthly delivery on Standard, Access and Transfer. Flex pays £9.99 per delivery.",
    priceHistory: [],
  },
];

export function getClinic(id: ClinicId): Clinic {
  const clinic = clinicsData.find((c) => c.id === id);
  if (!clinic) throw new Error(`Unknown clinic: ${id}`);
  return clinic;
}

export function clinicOutboundUrl(clinic: Clinic, extra: Record<string, string> = {}): string {
  const url = new URL(clinic.referralUrl || clinic.websiteUrl);
  for (const [k, v] of Object.entries({ ...clinic.trackingParams, ...extra })) url.searchParams.set(k, v);
  return url.toString();
}
