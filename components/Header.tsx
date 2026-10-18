"use client";

import Link from "next/link";
import { useState } from "react";
import { siteData } from "@/lib/siteData";
import { IconChevron, IconMenu, IconX } from "./Icons";
import Logo from "./Logo";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/85 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="shrink-0" aria-label={`${siteData.name} home`} onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {siteData.nav.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button className="flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.92rem] text-ink/80 transition hover:bg-sand hover:text-ink">
                  {item.label}
                  <IconChevron className="h-3.5 w-3.5 transition group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="w-64 rounded-2xl border border-line bg-white p-2 shadow-[0_20px_50px_-20px_rgba(8,56,41,0.35)]">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block rounded-xl px-3.5 py-2.5 text-[0.92rem] text-ink/80 transition hover:bg-brand-50 hover:text-brand-700"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className="rounded-full px-3.5 py-2 text-[0.92rem] text-ink/80 transition hover:bg-sand hover:text-ink"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={siteData.headerCta.href}
            className="hidden rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-brand-950 transition hover:bg-lime-strong sm:inline-flex"
          >
            {siteData.headerCta.label}
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <IconX className="h-5 w-5" /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-white lg:hidden">
          <nav className="container-x space-y-1 py-4" aria-label="Mobile">
            {siteData.nav.map((item) =>
              item.children ? (
                <details key={item.label} className="group rounded-2xl">
                  <summary className="flex cursor-pointer items-center justify-between rounded-2xl px-3 py-3 font-medium">
                    {item.label}
                    <IconChevron className="chev h-4 w-4 transition" />
                  </summary>
                  <div className="mb-2 ml-3 border-l border-line pl-3">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2.5 text-ink/75">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link key={item.label} href={item.href!} onClick={() => setOpen(false)} className="block rounded-2xl px-3 py-3 font-medium">
                  {item.label}
                </Link>
              ),
            )}
            <Link
              href={siteData.headerCta.href}
              onClick={() => setOpen(false)}
              className="mt-3 flex justify-center rounded-full bg-lime px-5 py-3 font-semibold text-brand-950"
            >
              {siteData.headerCta.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
