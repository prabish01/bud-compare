import type { MetadataRoute } from "next";
import { siteData } from "@/lib/siteData";

const paths = [
  "/",
  "/medical-cannabis-clinics/",
  "/best-medical-cannabis-clinics-uk/",
  "/cheapest-medical-cannabis-clinics-uk/",
  "/how-to-get-medical-cannabis-uk/",
  "/medical-cannabis-cost-uk/",
  "/eligibility-checker/",
  "/clinics/alternaleaf/",
  "/clinics/curaleaf/",
  "/clinics/mamedica/",
  "/compare/alternaleaf-vs-curaleaf/",
  "/compare/alternaleaf-vs-mamedica/",
  "/compare/curaleaf-vs-mamedica/",
  "/conditions/chronic-pain/",
  "/conditions/anxiety/",
  "/conditions/adhd/",
  "/conditions/insomnia/",
  "/conditions/ptsd/",
  "/nhs-vs-private-medical-cannabis/",
  "/medical-cannabis-flower/",
  "/medical-cannabis-oils/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: new URL(p, siteData.url).toString() }));
}
