import type { Clinic, ClinicPlan, CqcRating } from "./clinicsData";

export type Period = 1 | 3 | 5;
export type PatientType = "new" | "transfer";
export type AccessAnswer = "yes" | "no" | "unsure";

/** Estimated cumulative clinic fees (no medication) after `years` years. */
export function planCost(plan: ClinicPlan, years: number): number {
  const months = years * 12;
  let total = plan.upfront;
  total += plan.monthly * months;
  total += plan.annual * years;
  if (plan.perAppointment) {
    const appts = plan.appointmentsYear1 + plan.appointmentsPerYearAfter * Math.max(0, years - 1);
    total += plan.perAppointment * appts;
  }
  for (const fee of plan.scheduledFees) if (fee.month <= months) total += fee.amount;
  total += plan.deliveryPerMonth * months;
  total += plan.repeatPrescriptionFee * plan.repeatsPerYear * years;
  return Math.round(total * 100) / 100;
}

/** What you pay on day one. */
export function planUpfront(plan: ClinicPlan): number {
  return plan.upfront + plan.monthly + plan.annual + plan.perAppointment;
}

export function planCosts(plan: ClinicPlan) {
  return { year1: planCost(plan, 1), year3: planCost(plan, 3), year5: planCost(plan, 5), upfront: planUpfront(plan) };
}

export function eligiblePlans(clinic: Clinic, patientType: PatientType, access: AccessAnswer): ClinicPlan[] {
  return clinic.plans.filter((p) => {
    if (p.accessOnly && access !== "yes") return false;
    if (patientType === "new") return p.patientType !== "transfer";
    // transferring: use transfer pricing where it exists, otherwise standard plans
    const hasTransfer = clinic.plans.some((x) => x.patientType === "transfer");
    return hasTransfer ? p.patientType === "transfer" || (p.accessOnly && access === "yes") : p.patientType !== "transfer";
  });
}

export function cheapestPlan(plans: ClinicPlan[], period: Period): ClinicPlan | undefined {
  return [...plans].sort((a, b) => planCost(a, period) - planCost(b, period))[0];
}

export const CQC_ORDER: Record<CqcRating, number> = {
  Outstanding: 0,
  Good: 1,
  "Not yet inspected": 2,
  "Requires Improvement": 3,
  Inadequate: 4,
};

export function formatGBP(n: number): string {
  return n % 1 === 0 ? `£${n.toLocaleString("en-GB")}` : `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
