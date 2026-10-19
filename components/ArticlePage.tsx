import type { Metadata } from "next";
import Link from "next/link";
import type { ClinicId } from "@/lib/clinicsData";
import { siteData } from "@/lib/siteData";
import type { PageData } from "@/lib/types";
import Blocks from "./Blocks";
import { ClinicSideCard } from "./ClinicBlocks";
import { IconArrow, IconShield } from "./Icons";
import JsonLd from "./JsonLd";
import RichText, { plainText, slugify } from "./RichText";

export function pageMetadata(data: PageData): Metadata {
  return {
    title: { absolute: data.meta.title },
    description: data.meta.description,
    alternates: { canonical: data.path },
    openGraph: { title: data.meta.title, description: data.meta.description, url: data.path, siteName: siteData.name, type: "article", locale: "en_GB", images: "/opengraph-image" },
  };
}

export default function ArticlePage({ data, clinicId, wide = false }: { data: PageData; clinicId?: ClinicId; wide?: boolean }) {
  const toc = data.body.filter((b) => b.type === "h2").map((b) => (b as { text: string }).text);
  const faqs = data.body.flatMap((b) => (b.type === "faq" ? b.items : []));
  const crumbs = [{ label: "Home", href: "/" }, ...data.breadcrumb, { label: data.navLabel, href: data.path }];

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs
        .filter((c) => c.href)
        .map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: new URL(c.href!, siteData.url).toString() })),
    },
    {
      "@context": "https://schema.org",
      "@type": data.category === "review" ? "Review" : "Article",
      headline: data.hero.title,
      description: data.meta.description,
      ...(data.category === "review" ? { itemReviewed: { "@type": "MedicalClinic", name: data.navLabel.replace(/ review$/i, "") } } : {}),
      publisher: { "@type": "Organization", name: siteData.name },
    },
  ];
  if (faqs.length)
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a.map(plainText).join(" ") } })),
    });

  return (
    <>
      <JsonLd data={jsonLd} />
      {/* Hero */}
      <section className="container-x pt-4">
        <div className="relative overflow-hidden rounded-3xl bg-brand-900 px-6 pb-10 pt-8 text-white sm:px-10 md:pb-14 md:pt-10">
          <div className="relative max-w-3xl">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-white/60">
              {crumbs.map((c, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <span>/</span>}
                  {c.href && i < crumbs.length - 1 ? (
                    <Link href={c.href} className="hover:text-lime">
                      {c.label}
                    </Link>
                  ) : (
                    <span className={i === crumbs.length - 1 ? "text-white/85" : ""}>{c.label}</span>
                  )}
                </span>
              ))}
            </nav>
            <h1 className={`mt-6 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-[3.1rem]`}>
              {data.hero.title}
            </h1>
            {data.hero.lede && (
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75 [&_a]:text-lime [&_a]:underline [&_strong]:text-white">
                <RichText text={data.hero.lede} />
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Body */}
      <div className={`container-x mt-10 grid gap-10 md:mt-14 ${wide ? "" : "lg:grid-cols-[minmax(0,1fr)_300px] xl:gap-16"}`}>
        <article className={wide ? "mx-auto w-full min-w-0 max-w-6xl" : "min-w-0 max-w-3xl"}>
          <Blocks blocks={data.body} />

          {data.relatedLinks && (
            <section className="mt-14 rounded-3xl bg-sand p-6">
              <h2 className="text-lg font-semibold text-ink">Related guides</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {data.relatedLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink ring-1 ring-line transition hover:text-brand-700 hover:ring-brand-600/30"
                  >
                    {l.label} <IconArrow className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        {!wide && (
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              {clinicId && <ClinicSideCard clinicId={clinicId} />}
              {toc.length > 2 && (
                <nav aria-label="On this page" className="rounded-3xl border border-line bg-white p-5">
                  <p className="text-xs font-semiboldr text-muted">On this page</p>
                  <ol className="mt-3 max-h-[46vh] space-y-1 overflow-y-auto pr-1 text-sm">
                    {toc.map((t) => (
                      <li key={t}>
                        <a href={`#${slugify(t)}`} className="block rounded-lg px-2 py-1.5 text-ink/70 transition hover:bg-sand hover:text-ink">
                          {t}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              {!clinicId && (
                <div className="rounded-3xl bg-lime p-5 text-brand-950">
                  <IconShield className="h-6 w-6" />
                  <p className="mt-3 text-lg font-semibold leading-snug">Compare the real cost of UK clinics</p>
                  <p className="mt-1 text-sm text-brand-950/70">1, 3 and 5-year clinic fees side by side.</p>
                  <Link
                    href={data.path === "/eligibility-checker/" ? "/medical-cannabis-clinics/" : data.path === "/medical-cannabis-clinics/" ? "/eligibility-checker/" : "/medical-cannabis-clinics/"}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-900 px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    {data.path === "/medical-cannabis-clinics/" ? "Check eligibility" : "Compare clinics"} <IconArrow className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </>
  );
}
