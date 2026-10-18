# BudCompare

UK medical cannabis clinic comparison site (Next.js 16, App Router, Tailwind v4). Every page is statically generated.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Editing content

All content lives in `lib/`. Each page has its own `<pageName>Data.ts`:

| Page | File |
| --- | --- |
| Homepage | `lib/homeData.ts` |
| Compare tool `/medical-cannabis-clinics/` | `lib/compareClinicsData.ts` (also the tool's question wording) |
| Best / Cheapest clinics | `lib/bestClinicsData.ts`, `lib/cheapestClinicsData.ts` |
| How to get / Cost / NHS vs private | `lib/howToGetData.ts`, `lib/costData.ts`, `lib/nhsVsPrivateData.ts` |
| Eligibility checker | `lib/eligibilityCheckerData.ts` (also the checker questions and results) |
| Clinic reviews | `lib/alternaleafReviewData.ts`, `lib/curaleafReviewData.ts`, `lib/mamedicaReviewData.ts` |
| Clinic vs clinic | `lib/alternaleafVsCuraleafData.ts`, `lib/alternaleafVsMamedicaData.ts`, `lib/curaleafVsMamedicaData.ts` |
| Conditions | `lib/chronicPainData.ts`, `lib/anxietyData.ts`, `lib/adhdData.ts`, `lib/insomniaData.ts`, `lib/ptsdData.ts` |
| Flower / Oils | `lib/flowerData.ts`, `lib/oilsData.ts` |
| Navigation, footer, disclaimer | `lib/siteData.ts` |

Each page file has `meta` (SEO title and description), `hero` (H1 and intro) and `body` (an ordered list of blocks such as `h2`, `p`, `list`, `table`, `faq` and `note`).

Inline formatting inside text: `**bold**`, `[label](/path/)`, `[[cite:https://source]]` (source chip), and `\n` for a line break.

## Clinic prices: one source of truth

`lib/clinicsData.ts` holds every clinic's fees, plans, delivery, CQC data, referral URL and tracking params. The comparison tool, the 1/3/5-year calculations (`lib/costCalculator.ts`), the review sidebars and the clinic-vs-clinic tables all read from it. To change a price, edit it here and the whole site updates.

Affiliate links: set `referralUrl` and `trackingParams` for each clinic. Outbound links also get a `subid` showing where the click came from.

Analytics: `lib/analytics.ts` pushes events to `window.dataLayer` (GTM/GA4) for compare clicks, filter changes, impressions with position, review clicks, visit clicks, CQC opens and eligibility results.

## Regenerating page data from the Word documents

```bash
python3 -I scripts/docx-to-data.py "/path/to/canabis clinic"
```

This overwrites the generated `lib/*Data.ts` files. Skip it once you've hand-edited those files.
