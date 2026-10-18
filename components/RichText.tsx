import Link from "next/link";
import { Fragment, type ReactNode } from "react";

// Renders the inline formatting used in lib/*Data.ts files:
//   **bold**, [label](/path/), [[cite:https://url]], and \n line breaks.
const TOKEN = /(\[\[cite:[^\]]+\]\])|(\[((?:[^\[\]])+?)\]\(([^)\s]+)\))|(\*\*[\s\S]+?\*\*)|(\n)/g;

function sourceLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "source";
  }
}

export function renderInline(text: string, keyPrefix = "t"): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(TOKEN)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push(text.slice(last, idx));
    const key = `${keyPrefix}-${i++}`;
    if (m[1]) {
      const url = m[1].slice(7, -2);
      out.push(
        <a key={key} href={url} className="cite" target="_blank" rel="noopener noreferrer nofollow" title={url}>
          {sourceLabel(url)}
        </a>,
      );
    } else if (m[2]) {
      const label = m[3];
      const href = m[4];
      const children = renderInline(label, key);
      out.push(
        href.startsWith("/") || href.startsWith("#") ? (
          <Link key={key} href={href}>
            {children}
          </Link>
        ) : (
          <a key={key} href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
      );
    } else if (m[5]) {
      out.push(<strong key={key}>{renderInline(m[5].slice(2, -2), key)}</strong>);
    } else if (m[6]) {
      out.push(<br key={key} />);
    }
    last = idx + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function RichText({ text }: { text: string }) {
  return <Fragment>{renderInline(text)}</Fragment>;
}

export function plainText(text: string): string {
  return text
    .replace(/\[\[cite:[^\]]+\]\]/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function slugify(text: string): string {
  return plainText(text)
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
