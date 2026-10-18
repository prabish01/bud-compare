import Link from "next/link";
import { siteData } from "@/lib/siteData";
import { IconArrow } from "./Icons";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="px-2 pb-2 pt-16 sm:px-3 sm:pb-3">
      <div className="overflow-hidden rounded-3xl bg-brand-950 text-white">
        <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col gap-6 border-b border-white/10 px-6 py-10 sm:px-10 md:flex-row md:items-center md:justify-between md:py-12">
          <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            {siteData.footerCta.title} <span className="highlight">{siteData.footerCta.titleAccent}</span>
          </h2>
          <Link
            href={siteData.footerCta.button.href}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-lime px-6 py-3.5 font-semibold text-brand-950 transition hover:bg-lime-strong"
          >
            {siteData.footerCta.button.label}
            <IconArrow />
          </Link>
        </div>

        <div className="grid gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Logo light />
            <p className="mt-4 text-sm leading-relaxed text-white/60">{siteData.tagline}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {siteData.footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-white">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-white/60 transition hover:text-lime">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-6 border-t border-white/10 py-6 sm:mx-10">
          <p className="text-xs leading-relaxed text-white/50">{siteData.disclaimer}</p>
          <p className="mt-4 text-xs text-white/40">{siteData.copyright}</p>
        </div>
        </div>
      </div>
    </footer>
  );
}
