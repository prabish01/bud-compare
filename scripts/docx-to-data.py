"""
Converts the source Word documents into lib/<pageName>Data.ts files.

Text is copied verbatim from the .docx files. The only transformations are
structural (headings, lists, tables, FAQs, pros/cons) plus:
  - bold page names are turned into internal links (text unchanged)
  - "[ ](url)" citation chips become [[cite:url]] source markers
  - bracketed developer placeholders are swapped for the real components

Usage:  python3 -I scripts/docx-to-data.py "<path to source folder>"
"""
import json
import re
import sys
from pathlib import Path

import docx
from docx.oxml.ns import qn

sys.path.insert(0, str(Path(__file__).resolve().parent))
from enrich import enrich  # noqa: E402

SRC = Path(sys.argv[1])
OUT = Path(__file__).resolve().parent.parent / "lib"

ROUTES = {
    "home": "/",
    "compare": "/medical-cannabis-clinics/",
    "best": "/best-medical-cannabis-clinics-uk/",
    "cheapest": "/cheapest-medical-cannabis-clinics-uk/",
    "howTo": "/how-to-get-medical-cannabis-uk/",
    "cost": "/medical-cannabis-cost-uk/",
    "eligibility": "/eligibility-checker/",
    "alternaleaf": "/clinics/alternaleaf/",
    "curaleaf": "/clinics/curaleaf/",
    "mamedica": "/clinics/mamedica/",
    "altVsCura": "/compare/alternaleaf-vs-curaleaf/",
    "altVsMam": "/compare/alternaleaf-vs-mamedica/",
    "curaVsMam": "/compare/curaleaf-vs-mamedica/",
    "chronicPain": "/conditions/chronic-pain/",
    "anxiety": "/conditions/anxiety/",
    "adhd": "/conditions/adhd/",
    "insomnia": "/conditions/insomnia/",
    "ptsd": "/conditions/ptsd/",
    "nhs": "/nhs-vs-private-medical-cannabis/",
    "flower": "/medical-cannabis-flower/",
    "oils": "/medical-cannabis-oils/",
}

# Bold phrase in the documents -> internal route
LINK_PHRASES = {
    "Best Medical Cannabis Clinics UK": "best",
    "Best Medical Cannabis Clinics UK 2026": "best",
    "Cheapest Medical Cannabis Clinics UK": "cheapest",
    "Medical Cannabis Cost UK": "cost",
    "Medical Cannabis Cost UK 2026": "cost",
    "Medical Cannabis Eligibility Checker": "eligibility",
    "Medical Cannabis Eligibility Checker UK": "eligibility",
    "Eligibility Checker": "eligibility",
    "Medical Cannabis Clinic Comparison Tool": "compare",
    "Clinic Comparison Tool": "compare",
    "Medical Cannabis Clinic Cost Calculator": "compare",
    "Medical Cannabis Cost Calculator": "compare",
    "Clinic Cost Calculator": "compare",
    "NHS vs Private Medical Cannabis UK": "nhs",
    "Read our full Alternaleaf Review": "alternaleaf",
    "Read our full Curaleaf Clinic Review": "curaleaf",
    "Read our full Mamedica Review": "mamedica",
    "Compare Alternaleaf vs Curaleaf": "altVsCura",
    "Compare Alternaleaf vs Mamedica": "altVsMam",
    "Read Alternaleaf vs Curaleaf": "altVsCura",
    "Read Curaleaf vs Mamedica": "curaVsMam",
    "Alternaleaf vs Curaleaf": "altVsCura",
    "Alternaleaf vs Mamedica": "altVsMam",
    "Curaleaf vs Mamedica": "curaVsMam",
    "Medical Cannabis Flower Database": "flower",
    "Medical Cannabis Oils Database": "oils",
    "Medical Cannabis for Anxiety UK": "anxiety",
    "Medical Cannabis for Insomnia UK": "insomnia",
}

SUGGESTED_LINK_LABELS = {
    "Cheapest Medical Cannabis Clinics UK": "cheapest",
    "Cheapest Clinics": "cheapest",
    "Medical Cannabis Cost UK": "cost",
    "Eligibility Checker": "eligibility",
    "Alternaleaf Review": "alternaleaf",
    "Curaleaf Review": "curaleaf",
    "Mamedica Review": "mamedica",
    "NHS vs Private Medical Cannabis": "nhs",
    "Best Clinics": "best",
}

CRUMB = {
    "guide": {"label": "Guides", "href": None},
    "review": {"label": "Clinic reviews", "href": None},
    "comparison": {"label": "Compare", "href": "/medical-cannabis-clinics/"},
    "condition": {"label": "Conditions", "href": None},
    "tool": {"label": "Tools", "href": None},
}

# (doc file, page key, export name, file name, meta row, category, nav label)
PAGES = [
    ("Compare Medical Cannabis Clinics UK 2026", "compare", "compareClinicsData", "compareClinicsData", "Clinic Comparison Tool", "tool", "Compare clinics"),
    ("BEST MEDICAL CANNABIS CLINICS UK", "best", "bestClinicsData", "bestClinicsData", "Best Medical Cannabis Clinics UK 2026", "guide", "Best clinics UK 2026"),
    ("CHEAPEST MEDICAL CANNABIS CLINICS UK", "cheapest", "cheapestClinicsData", "cheapestClinicsData", "Cheapest Medical Cannabis Clinics", "guide", "Cheapest clinics UK"),
    ("HOW TO GET MEDICAL CANNABIS UK", "howTo", "howToGetData", "howToGetData", "How to Get Medical Cannabis UK", "guide", "How to get medical cannabis"),
    ("MEDICAL CANNABIS COST UK", "cost", "costData", "costData", "Medical Cannabis Cost UK", "guide", "Medical cannabis cost"),
    ("MEDICAL CANNABIS ELIGIBILITY CHECKER UK", "eligibility", "eligibilityCheckerData", "eligibilityCheckerData", "Eligibility Checker", "tool", "Eligibility checker"),
    ("Alternaleaf Review UK 2026_ Costs, Appointments, Pros & Cons", "alternaleaf", "alternaleafReviewData", "alternaleafReviewData", "Alternaleaf Review", "review", "Alternaleaf review"),
    ("Curaleaf Clinic Review UK 2026_ Pricing, Pros & Cons", "curaleaf", "curaleafReviewData", "curaleafReviewData", "Curaleaf Review", "review", "Curaleaf Clinic review"),
    ("Mamedica Review UK 2026_ Pricing, Access Scheme, Pros & Cons", "mamedica", "mamedicaReviewData", "mamedicaReviewData", "Mamedica Review", "review", "Mamedica review"),
    ("Curaleaf vs Mamedica 2026_ Which Pricing Model Fits Your Situation", "curaVsMam", "curaleafVsMamedicaData", "curaleafVsMamedicaData", "Curaleaf vs Mamedica", "comparison", "Curaleaf vs Mamedica"),
    ("Medical Cannabis for Chronic Pain UK_ Evidence, Eligibility & Access", "chronicPain", "chronicPainData", "chronicPainData", "Chronic Pain", "condition", "Chronic pain"),
    ("Medical Cannabis for Anxiety UK_ Evidence, Eligibility & Private Clinics", "anxiety", "anxietyData", "anxietyData", "Anxiety", "condition", "Anxiety"),
    ("Medical Cannabis for ADHD UK_ Evidence, Eligibility & Access", "adhd", "adhdData", "adhdData", "ADHD", "condition", "ADHD"),
    ("Medical Cannabis for Insomnia UK_ Sleep, Evidence & Private Access", "insomnia", "insomniaData", "insomniaData", "Insomnia", "condition", "Insomnia"),
    ("Medical Cannabis for PTSD UK_ Evidence, Eligibility & Private Clinics", "ptsd", "ptsdData", "ptsdData", "PTSD", "condition", "PTSD"),
    ("NHS vs Private Medical Cannabis UK_ What_s the Difference", "nhs", "nhsVsPrivateData", "nhsVsPrivateData", "NHS vs Private", "guide", "NHS vs private"),
    ("Medical Cannabis Flower UK_ Prices, THC, CBD & Prescription Guide", "flower", "flowerData", "flowerData", "Medical Cannabis Flower", "guide", "Medical cannabis flower"),
    ("Medical Cannabis Oils UK_ THC, CBD, Prices & Prescription Guide", "oils", "oilsData", "oilsData", "Medical Cannabis Oils", "guide", "Medical cannabis oils"),
]


# ---------------------------------------------------------------- metadata
def load_meta():
    import openpyxl

    wb = openpyxl.load_workbook(SRC / "cannabis meta data.xlsx")
    ws = wb.active
    meta = {}
    for row in ws.iter_rows(min_row=2, values_only=True):
        if row[0]:
            meta[row[0].strip()] = {"title": row[1].strip(), "description": row[2].strip()}
    return meta


# ---------------------------------------------------------------- docx parsing
def clean_url(url):
    url = re.sub(r"[?&]utm_source=chatgpt\.com", "", url)
    return url


def numbering_formats(d):
    fmts = {}
    try:
        root = d.part.numbering_part.element
    except Exception:
        return fmts
    abstract = {}
    for an in root.findall(qn("w:abstractNum")):
        aid = an.get(qn("w:abstractNumId"))
        for lvl in an.findall(qn("w:lvl")):
            if lvl.get(qn("w:ilvl")) == "0":
                nf = lvl.find(qn("w:numFmt"))
                abstract[aid] = nf.get(qn("w:val")) if nf is not None else "bullet"
    for n in root.findall(qn("w:num")):
        nid = n.get(qn("w:numId"))
        a = n.find(qn("w:abstractNumId")).get(qn("w:val"))
        fmts[nid] = abstract.get(a, "bullet")
    return fmts


def run_text(r):
    out = []
    for x in r.iterchildren():
        if x.tag == qn("w:t"):
            out.append(x.text or "")
        elif x.tag in (qn("w:br"), qn("w:cr")):
            out.append("\n")
        elif x.tag == qn("w:tab"):
            out.append("\t")
    return "".join(out)


def is_bold(r):
    rpr = r.find(qn("w:rPr"))
    if rpr is None:
        return False
    b = rpr.find(qn("w:b"))
    if b is None:
        return False
    return b.get(qn("w:val")) not in ("0", "false")


def para_text(p_el, part):
    parts = []
    for child in p_el.iterchildren():
        if child.tag == qn("w:r"):
            t = run_text(child)
            if is_bold(child) and t.strip():
                # keep surrounding whitespace outside the bold markers
                lead = t[: len(t) - len(t.lstrip())]
                trail = t[len(t.rstrip()):]
                parts.append(f"{lead}**{t.strip()}**{trail}")
            else:
                parts.append(t)
        elif child.tag == qn("w:hyperlink"):
            rid = child.get(qn("r:id"))
            href = part.rels[rid].target_ref if rid and rid in part.rels else None
            if href:
                parts.append(f"[[cite:{clean_url(href)}]]")
    text = "".join(parts)
    text = text.replace("****", "")
    # collapse repeated identical citations
    text = re.sub(r"(\[\[cite:[^\]]+\]\])(\1)+", r"\1", text)
    # citations directly after text should sit after the sentence: strip stray spaces
    text = re.sub(r"\s+(\[\[cite:)", r"\1", text)
    return text.strip(" ")


def parse_doc(path):
    d = docx.Document(path)
    fmts = numbering_formats(d)
    raw = []
    for el in d.element.body.iterchildren():
        if el.tag == qn("w:p"):
            p = docx.text.paragraph.Paragraph(el, d)
            style = p.style.name if p.style is not None else ""
            text = para_text(el, p.part)
            if not text.strip():
                continue
            ppr = el.find(qn("w:pPr"))
            numpr = ppr.find(qn("w:numPr")) if ppr is not None else None
            if numpr is not None:
                nid = numpr.find(qn("w:numId")).get(qn("w:val"))
                raw.append({"kind": "li", "num": nid, "ordered": fmts.get(nid, "bullet") not in ("bullet", "none"), "text": text})
            elif style.startswith("Heading 1") or style == "Title":
                raw.append({"kind": "h1", "text": strip_bold(text)})
            elif style.startswith("Heading 2"):
                raw.append({"kind": "h2", "text": strip_bold(text)})
            elif style.startswith("Heading 3") or style.startswith("Heading 4"):
                raw.append({"kind": "h3", "text": strip_bold(text)})
            else:
                raw.append({"kind": "p", "text": text})
        elif el.tag == qn("w:tbl"):
            t = docx.table.Table(el, d)
            rows = []
            for r in t.rows:
                cells = []
                for c in r.cells:
                    cells.append(" / ".join(para_text(pp._p, pp.part) for pp in c.paragraphs if pp.text.strip()))
                rows.append(cells)
            raw.append({"kind": "table", "rows": rows})
    return raw


def strip_bold(t):
    return t.replace("**", "").strip()


# ---------------------------------------------------------------- transforms
def link_phrases(text, self_key):
    def repl(m):
        phrase = m.group(1)
        key = LINK_PHRASES.get(phrase.strip())
        if key and key != self_key:
            return f"[**{phrase}**]({ROUTES[key]})"
        return m.group(0)

    return re.sub(r"\*\*([^*\n]+?)\*\*", repl, text)


def to_blocks(raw, page_key, placeholders):
    # merge consecutive list items into lists
    blocks = []
    for item in raw:
        k = item["kind"]
        if k == "li":
            if blocks and blocks[-1]["type"] == "list" and blocks[-1].get("_num") == item["num"]:
                blocks[-1]["items"].append(item["text"])
            else:
                blocks.append({"type": "list", "ordered": item["ordered"], "items": [item["text"]], "_num": item["num"]})
        elif k == "table":
            rows = item["rows"]
            blocks.append({"type": "table", "headers": [strip_bold(c) for c in rows[0]], "rows": rows[1:]})
        else:
            blocks.append({"type": k, "text": item["text"]})
    for b in blocks:
        b.pop("_num", None)

    # placeholders -> components (exact paragraph match)
    out = []
    for b in blocks:
        if b.get("text") in placeholders:
            rep = placeholders[b["text"]]
            if rep is not None:
                out.extend(rep if isinstance(rep, list) else [rep])
            continue
        out.append(b)
    blocks = out

    # hero: optional all-caps eyebrow, then H1, then lede
    hero = {}
    if blocks and blocks[0]["type"] in ("h1", "p") and strip_bold(blocks[0]["text"]).isupper():
        if len(blocks) > 1 and blocks[1]["type"] == "h1":
            blocks.pop(0)  # all-caps document label duplicates the H1
    first = blocks.pop(0)
    assert first["type"] == "h1", first
    hero["title"] = first["text"]
    if blocks and blocks[0]["type"] == "p":
        hero["lede"] = blocks.pop(0)["text"]

    # suggested internal links / schema notes -> page metadata
    related, schema = [], []
    keep = []
    for b in blocks:
        if b["type"] == "p" and b["text"].startswith("**Suggested internal links:**"):
            labels = b["text"].split("**", 2)[2].strip().rstrip(".").split(";")
            for lab in labels:
                lab = lab.strip()
                key = SUGGESTED_LINK_LABELS.get(lab)
                if key:
                    related.append({"label": lab, "href": ROUTES[key]})
            continue
        if b["type"] == "p" and b["text"].startswith("**Schema:**"):
            schema = [s.strip() for s in re.split(r",", b["text"].split("**", 2)[2])]
            continue
        keep.append(b)
    blocks = keep

    # FAQ grouping, pros/cons, notes, link lines
    result = []
    i = 0
    while i < len(blocks):
        b = blocks[i]
        if b["type"] == "h2" and b["text"].strip().upper() == "FAQS":
            result.append(b)
            items = []
            i += 1
            while i < len(blocks) and blocks[i]["type"] != "h2":
                if blocks[i]["type"] == "h3":
                    items.append({"q": blocks[i]["text"], "a": []})
                elif items:
                    items[-1]["a"].append(blocks[i]["text"])
                i += 1
            result.append({"type": "faq", "items": items})
            continue
        if (
            b["type"] == "p"
            and b["text"] == "**Potential advantages**"
            and i + 3 < len(blocks)
            and blocks[i + 1]["type"] == "list"
            and blocks[i + 2]["type"] == "p"
            and blocks[i + 3]["type"] == "list"
        ):
            result.append(
                {
                    "type": "proscons",
                    "pros": {"title": strip_bold(b["text"]), "items": blocks[i + 1]["items"]},
                    "cons": {"title": strip_bold(blocks[i + 2]["text"]), "items": blocks[i + 3]["items"]},
                }
            )
            i += 4
            continue
        if b["type"] == "p":
            t = b["text"]
            if re.match(r"^\*{0,2}(Prices checked|Pricing last checked|\*Prices and schemes)", t) or t == "Prices checked September 2026.":
                b = {"type": "note", "text": t}
            elif t.startswith("**Quick verdict:**"):
                b = {"type": "callout", "text": t}
            elif t.startswith("→ "):
                b = {"type": "linkline", "text": t}
        result.append(b)
        i += 1

    # regroup recurring paragraph patterns into richer blocks (text unchanged)
    result = enrich(result)

    # internal links in running text (recursively, so new block types get them too)
    SKIP_KEYS = {"type", "tool", "href", "clinic", "q", "headers"}

    def link_any(v):
        if isinstance(v, str):
            return link_phrases(v, page_key)
        if isinstance(v, list):
            return [link_any(x) for x in v]
        if isinstance(v, dict):
            return {k: (x if k in SKIP_KEYS else link_any(x)) for k, x in v.items()}
        return v

    def link_block(b):
        if b["type"] in ("h2", "h3", "table"):
            return b
        return link_any(b)

    result = [link_block(b) for b in result]
    if "lede" in hero:
        hero["lede"] = link_phrases(hero["lede"], page_key)
    return hero, result, related, schema


# ---------------------------------------------------------------- page-specific placeholders
def placeholders_for(key):
    if key == "compare":
        return {
            "**[ INSERT INTERACTIVE COMPARISON TOOL HERE]**": {"type": "tool", "tool": "comparison"},
            "**[DATABASE: automatically insert latest verified Curaleaf pricing]**": {"type": "clinicPricing", "clinic": "curaleaf"},
            "**[INTERACTIVE CALCULATOR]**": {"type": "toolButton", "label": "Open the clinic cost calculator", "href": "#compare-tool"},
            "**[COMPARE CLINICS NOW]**": {"type": "toolButton", "label": "Compare clinics now", "href": "#compare-tool"},
        }
    if key == "eligibility":
        # The interactive checker renders the suggested questions and result
        # wording itself (see lib/eligibilityCheckerData.ts -> checker).
        return {
            "**Your developer should place the interactive checker here.**": {"type": "tool", "tool": "eligibility"},
            "Suggested questions:": None,
            "Result states": None,
            "**1. Are you aged 18 or over?**": None,
            "**2. Do you have a diagnosed medical condition?**": None,
            "**3. Have you previously tried conventional treatment for that condition?**": None,
            "**4. Can you provide relevant medical records?**": None,
            "**5. Are you currently pregnant or breastfeeding?**": None,
            "**6. Do you have a history of psychosis or schizophrenia?**": None,
            "Yes / No": None,
            "None / One / Two or more": None,
            "Yes / No / Unsure": None,
            "Yes / No / Prefer not to say": None,
            "Rather than saying **“You qualify”**, use:": None,
            "**Potential match:** Your answers appear consistent with some commonly published private-clinic screening criteria. A specialist assessment is required before any treatment can be prescribed.": None,
            "**Further information needed:** Your circumstances may require individual assessment. Compare clinics and ask about their current eligibility process.": None,
            "**Potential barrier identified:** One or more answers may affect eligibility. This tool cannot determine suitability; discuss your circumstances with an appropriately qualified healthcare professional.": None,
            "That wording is much safer and more credible than pretending an SEO website can medically approve someone.": None,
        }
    if key == "oils":
        return {
            "**[DEVELOPER: INSERT OIL DATABASE HERE]**": {
                "type": "comingSoon",
                "title": "Medical Cannabis Oil Comparison Database",
                "text": "Product data is being added. Check back soon.",
            }
        }
    return {}


# ---------------------------------------------------------------- TS writer
IDENT = re.compile(r"^[A-Za-z_$][A-Za-z0-9_$]*$")


def ts(v, ind=0):
    pad = "  " * ind
    pad1 = "  " * (ind + 1)
    if isinstance(v, dict):
        if not v:
            return "{}"
        items = []
        for k, val in v.items():
            key = k if IDENT.match(k) else json.dumps(k)
            items.append(f"{pad1}{key}: {ts(val, ind + 1)}")
        return "{\n" + ",\n".join(items) + ",\n" + pad + "}"
    if isinstance(v, list):
        if not v:
            return "[]"
        if all(isinstance(x, str) for x in v) and sum(len(x) for x in v) < 70:
            return "[" + ", ".join(json.dumps(x, ensure_ascii=False) for x in v) + "]"
        return "[\n" + ",\n".join(pad1 + ts(x, ind + 1) for x in v) + ",\n" + pad + "]"
    if isinstance(v, bool):
        return "true" if v else "false"
    if v is None:
        return "null"
    return json.dumps(v, ensure_ascii=False)


def main():
    from dash_fixes import apply as fix_dashes

    meta = load_meta()
    for doc, key, export, fname, meta_key, category, nav_label in PAGES:
        raw = parse_doc(SRC / f"{doc}.docx")
        hero, body, related, schema = to_blocks(raw, key, placeholders_for(key))
        crumb = CRUMB[category]
        page = {
            "path": ROUTES[key],
            "navLabel": nav_label,
            "category": category,
            "meta": meta[meta_key],
            "breadcrumb": [{"label": crumb["label"], **({"href": crumb["href"]} if crumb["href"] else {})}],
            "hero": hero,
            "body": body,
        }
        if related:
            page["relatedLinks"] = related
        if schema:
            page["schema"] = schema
        header = (
            f"// Content for {ROUTES[key]}\n"
            f"// Source: \"{doc}.docx\". Edit the text below to update the page.\n"
            "// Inline formatting: **bold**, [text](/link/), [[cite:https://source]] = source chip, \\n = line break.\n"
        )
        extra = ""
        if key == "eligibility":
            extra = ELIGIBILITY_EXTRA
        if key == "compare":
            extra = COMPARE_EXTRA
        (OUT / f"{fname}.ts").write_text(fix_dashes(
            header
            + 'import type { PageData } from "./types";\n\n'
            + f"export const {export}: PageData = {ts(page)};\n"
            + extra
        ))
        print("wrote", fname)


ELIGIBILITY_EXTRA = '''
// Interactive checker: questions and result wording from the source document.
export const eligibilityChecker = {
  questions: [
    { id: "age", label: "Are you aged 18 or over?", options: ["Yes", "No"] },
    { id: "diagnosis", label: "Do you have a diagnosed medical condition?", options: ["Yes", "No"] },
    { id: "treatments", label: "Have you previously tried conventional treatment for that condition?", options: ["None", "One", "Two or more"] },
    { id: "records", label: "Can you provide relevant medical records?", options: ["Yes", "No", "Unsure"] },
    { id: "pregnancy", label: "Are you currently pregnant or breastfeeding?", options: ["Yes", "No"] },
    { id: "psychosis", label: "Do you have a history of psychosis or schizophrenia?", options: ["Yes", "No", "Prefer not to say"] },
  ],
  results: {
    match: {
      title: "Potential match",
      text: "Your answers appear consistent with some commonly published private-clinic screening criteria. A specialist assessment is required before any treatment can be prescribed.",
    },
    moreInfo: {
      title: "Further information needed",
      text: "Your circumstances may require individual assessment. Compare clinics and ask about their current eligibility process.",
    },
    barrier: {
      title: "Potential barrier identified",
      text: "One or more answers may affect eligibility. This tool cannot determine suitability; discuss your circumstances with an appropriately qualified healthcare professional.",
    },
  },
} as const;
'''

COMPARE_EXTRA = '''
// Interactive comparison tool: question wording from the tool brief / document.
export const comparisonTool = {
  patientType: {
    label: "Are you a new patient or transferring?",
    options: [
      { value: "new", label: "I am a new patient" },
      { value: "transfer", label: "I want to transfer clinic." },
    ],
  },
  access: {
    label: "Could you qualify for a clinic Access/discount scheme?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  period: {
    label: "How long would you like to compare clinic costs over?",
    options: [
      { value: 1, label: "1 year" },
      { value: 3, label: "3 years" },
      { value: 5, label: "5 years" },
    ],
  },
  priorities: {
    label: "What's important to you?",
    options: [
      { value: "lowestCost", label: "Lowest overall clinic cost" },
      { value: "lowestUpfront", label: "Lowest upfront cost" },
      { value: "noSubscription", label: "No monthly subscription" },
      { value: "payg", label: "PAYG available" },
      { value: "freeDelivery", label: "Free delivery" },
      { value: "weekend", label: "Weekend appointments" },
      { value: "accessScheme", label: "Access scheme available" },
      { value: "transferScheme", label: "Transfer scheme available" },
    ],
  },
  sortOptions: [
    { value: "year1", label: "Lowest Year 1 cost" },
    { value: "year3", label: "Lowest Year 3 cost" },
    { value: "year5", label: "Lowest Year 5 cost" },
    { value: "upfront", label: "Lowest upfront cost" },
    { value: "cqc", label: "CQC status" },
    { value: "name", label: "Alphabetical" },
  ],
  submitLabel: "Compare clinics",
  resultNote: "Estimated clinic fees only. Medication costs are not included.",
  disclaimer:
    "This comparison tool compares publicly available clinic pricing and services. It does not provide medical advice or determine whether medical cannabis is suitable for you. Prescription decisions must be made by an appropriately qualified healthcare professional. Medication costs are not included unless explicitly stated.",
};
'''

if __name__ == "__main__":
    main()
