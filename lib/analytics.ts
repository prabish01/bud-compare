// Analytics events (see tool brief, section 11).
// Events are pushed to window.dataLayer, so Google Tag Manager / GA4 can pick
// them up, and dispatched as a "budcompare:track" DOM event for other tools.

export type TrackEvent =
  | "compare_click"
  | "filter_change"
  | "clinic_result_impression"
  | "read_review_click"
  | "visit_clinic_click"
  | "cqc_details_open"
  | "eligibility_check_complete";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: TrackEvent, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const payload = { event, page: window.location.pathname, ...props };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent("budcompare:track", { detail: payload }));
}
