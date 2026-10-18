import type { MetadataRoute } from "next";
import { siteData } from "@/lib/siteData";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", siteData.url).toString(),
  };
}
