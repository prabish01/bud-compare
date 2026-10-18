"""Em/en dash replacements (anti-AI-slop rule: zero em dashes on the site).
Applied by docx-to-data.py after conversion, and runnable on lib/ directly."""
FIXES = [
    ("regulatory record — and explain", "regulatory record, and explain"),
    ("assessment and — only if the clinician considers it appropriate — receiving", "assessment and (only if the clinician considers it appropriate) receiving"),
    ("**clinic criterion**, however — not a universal", "**clinic criterion**, however, not a universal"),
    ("Yes — when lawfully prescribed.", "Yes, when lawfully prescribed."),
    ("0–10 pain scale", "0-10 pain scale"),
    ("**Clinic costs** — consultations", "**Clinic costs:** consultations"),
    ("**Medication costs** — the prescribed", "**Medication costs:** the prescribed"),
    ("4–5", "4-5"),
    ("competitor — but some Mamedica", "competitor, but some Mamedica"),
    ("patients ask — and unfortunately", "patients ask, and unfortunately"),
    ("2026 — £5/month", "2026: £5/month"),
    ("2027 — [future data]", "2027: [future data]"),
    ("£5–£14", "£5-£14"),
    ("**THC — tetrahydrocannabinol**", "**THC (tetrahydrocannabinol)**"),
    ("**CBD — cannabidiol.**", "**CBD (cannabidiol).**"),
    ("cannabinoids — particularly THC — can", "cannabinoids, particularly THC, can"),
    ('"—"', '"-"'),  # empty table cells
    ("Interactive comparison tool — question", "Interactive comparison tool: question"),
    ("Interactive checker — questions", "Interactive checker: questions"),
]


def apply(text: str) -> str:
    for a, b in FIXES:
        text = text.replace(a, b)
    return text


if __name__ == "__main__":
    import sys
    from pathlib import Path

    for p in Path(sys.argv[1]).glob("*.ts"):
        s = p.read_text()
        t = apply(s)
        if t != s:
            p.write_text(t)
            print("fixed", p.name)
