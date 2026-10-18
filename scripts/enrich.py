"""
Structural enrichment for converted page content.

Detects recurring paragraph patterns in the Word documents and regroups them
into richer block types (cards, steps, stat rows, flows...). Text is NEVER
edited: every string is moved into the new block exactly as written.
"""
import re

BOLD = re.compile(r"\*\*[^*]+\*\*")


def is_p(b):
    return b.get("type") == "p"


def is_bold(t):
    return bool(BOLD.fullmatch(t))


def plain(t):
    return t.replace("**", "")


def is_join(b):
    """Short connector paragraph, e.g. 'Clinic A charges:', 'or', 'followed by:'."""
    if not is_p(b) or "**" in b["text"] or "[[" in b["text"]:
        return False
    t = b["text"].strip()
    return (len(t) <= 60 and t.endswith(":")) or t in ("or", "and", "plus")


def is_value(b, prev, nxt):
    if not is_p(b) or not is_bold(b["text"]) or "→" in b["text"]:
        return False
    t = plain(b["text"])
    if len(t) > 90:
        return False
    return "£" in t or (prev is not None and is_join(prev)) or (nxt is not None and is_join(nxt) and nxt["text"] != nxt["text"].rstrip(":"))


def enrich(blocks):
    out = []
    i = 0
    n = len(blocks)

    def at(k):
        return blocks[k] if 0 <= k < n else None

    while i < n:
        b = blocks[i]
        t = b.get("text", "")

        # flow: **a → b → c**
        if is_p(b) and is_bold(t) and t.count("→") >= 2:
            out.append({"type": "flow", "text": t})
            i += 1
            continue

        # calculator step cards: h3 "Step N" + question + options
        if b["type"] == "h3" and re.fullmatch(r"Step \d+", t):
            items = []
            while i < n and blocks[i]["type"] == "h3" and re.fullmatch(r"Step \d+", blocks[i]["text"]):
                title = blocks[i]["text"]
                i += 1
                paras = []
                while i < n and is_p(blocks[i]):
                    paras.append(blocks[i]["text"])
                    i += 1
                items.append({"title": title, "question": paras[0] if paras else "", "options": paras[1:]})
            out.append({"type": "stepCards", "items": items})
            continue

        # equation: bold parts, '=', bold result
        if is_p(b) and is_bold(t):
            j = i
            while j < n and is_p(blocks[j]) and is_bold(blocks[j]["text"]):
                j += 1
            if j - i >= 2 and at(j) and is_p(at(j)) and at(j)["text"] == "=" and at(j + 1) and is_p(at(j + 1)) and is_bold(at(j + 1)["text"]):
                out.append({"type": "equation", "parts": [x["text"] for x in blocks[i:j]], "operator": "=", "result": at(j + 1)["text"]})
                i = j + 2
                continue

        # do / don't
        w = [at(i + k) for k in range(6)]
        if (
            all(x is not None and is_p(x) for x in w)
            and w[0]["text"].endswith(":")
            and is_bold(w[1]["text"])
            and w[2]["text"] == "is acceptable."
            and w[3]["text"].endswith(":")
            and is_bold(w[4]["text"])
        ):
            out.append(
                {
                    "type": "dodont",
                    "do": {"lead": w[0]["text"], "phrase": w[1]["text"], "after": w[2]["text"]},
                    "dont": {"lead": w[3]["text"], "phrase": w[4]["text"], "after": w[5]["text"]},
                }
            )
            i += 6
            continue

        # contrast: "... isn't:" X "It's:" Y
        w = [at(i + k) for k in range(4)]
        if all(x is not None and is_p(x) for x in w) and w[0]["text"].endswith("isn't:") and w[2]["text"] == "It's:":
            out.append(
                {
                    "type": "contrast",
                    "not": {"lead": w[0]["text"], "text": w[1]["text"]},
                    "is": {"lead": w[2]["text"], "text": w[3]["text"]},
                }
            )
            i += 4
            continue

        # worked examples: **Clinic X** / body / "Annual clinical cost = ..."
        if is_p(b) and re.fullmatch(r"\*\*Clinic [A-Z]\*\*", t):
            items = []
            while (
                i + 2 < n
                and is_p(blocks[i])
                and re.fullmatch(r"\*\*Clinic [A-Z]\*\*", blocks[i]["text"])
                and blocks[i + 2]["text"].startswith("Annual clinical cost")
            ):
                items.append({"title": blocks[i]["text"], "body": blocks[i + 1]["text"], "total": blocks[i + 2]["text"]})
                i += 3
            if items:
                out.append({"type": "examples", "items": items})
                continue

        # key/value lines: "Safe: Good\nEffective: Good ..."
        if is_p(b):
            lines = t.split("\n")
            if len(lines) >= 2 and all(re.match(r"^(\*\*)?[^:\n]{1,32}:(\*\*)? \S", ln) for ln in lines):
                kv = {"type": "kv", "text": t}
                if out and out[-1]["type"] == "p" and is_bold(out[-1]["text"]):
                    kv["title"] = out.pop()["text"]
                out.append(kv)
                i += 1
                continue

        # chip group: "**Sort by:\n**A | B | C"
        if is_p(b) and t.count(" | ") >= 2:
            out.append({"type": "chipGroup", "text": t})
            i += 1
            continue

        # table caption
        if is_p(b) and is_bold(t) and at(i + 1) and at(i + 1)["type"] == "table":
            tbl = dict(at(i + 1))
            tbl["caption"] = t
            out.append(tbl)
            i += 2
            continue

        # numbered bold steps: **1. ...**
        if is_p(b) and re.fullmatch(r"\*\*\d+\. [^*]+\*\*", t):
            j = i
            while j < n and is_p(blocks[j]) and re.fullmatch(r"\*\*\d+\. [^*]+\*\*", blocks[j]["text"]):
                j += 1
            if j - i >= 3:
                out.append({"type": "steps", "items": [x["text"] for x in blocks[i:j]]})
                i = j
                continue

        # question cards: run of bold questions
        if is_p(b) and is_bold(t) and t.endswith("?**"):
            j = i
            while j < n and is_p(blocks[j]) and is_bold(blocks[j]["text"]) and blocks[j]["text"].endswith("?**"):
                j += 1
            if j - i >= 3:
                out.append({"type": "questions", "items": [x["text"] for x in blocks[i:j]]})
                i = j
                continue

        # labelled cards: (**Short title**, paragraph) x3+
        def bold_title(x):
            return x is not None and is_p(x) and is_bold(x["text"]) and len(plain(x["text"])) <= 60 and not x["text"].endswith((".**", "?**"))

        if bold_title(b) and at(i + 1) and is_p(at(i + 1)) and not is_bold(at(i + 1)["text"]):
            j = i
            items = []
            while bold_title(at(j)) and at(j + 1) and is_p(at(j + 1)) and not is_bold(at(j + 1)["text"]):
                items.append({"title": at(j)["text"], "text": [at(j + 1)["text"]]})
                j += 2
            if len(items) >= 3:
                out.append({"type": "cards", "numbered": False, "items": items})
                i = j
                continue

        # h3 cards: (h3, exactly one paragraph) x3+. The run stops at the first
        # sub-heading followed by more than one paragraph.
        if b["type"] == "h3":
            j = i
            items = []
            while at(j) is not None and at(j)["type"] == "h3" and at(j + 1) is not None and is_p(at(j + 1)):
                items.append({"title": at(j)["text"], "text": [at(j + 1)["text"]]})
                j += 2
                if at(j) is None or at(j)["type"] != "h3":
                    break
            if len(items) >= 3:
                numbered = all(re.match(r"^\d+\. ", it["title"]) for it in items)
                out.append({"type": "cards", "numbered": numbered, "items": items})
                i = j
                continue

        # chips: run of short bold labels
        def chip(x):
            return x is not None and is_p(x) and is_bold(x["text"]) and len(plain(x["text"])) <= 45 and "£" not in x["text"]

        if chip(b):
            j = i
            while chip(at(j)):
                j += 1
            if j - i >= 3:
                out.append({"type": "chips", "items": [x["text"] for x in blocks[i:j]]})
                i = j
                continue

        # a lead-in line ("...column:") followed by a run of 3+ labels, questions
        # or titled pairs stays a normal paragraph; the run is grouped next.
        if is_join(b):
            k = i + 1
            while at(k) is not None and is_p(at(k)) and is_bold(at(k)["text"]):
                k += 1
            pairs = 0
            k2 = i + 1
            while bold_title(at(k2)) and at(k2 + 1) is not None and is_p(at(k2 + 1)) and not is_bold(at(k2 + 1)["text"]):
                pairs += 1
                k2 += 2
            if k - (i + 1) >= 3 or pairs >= 3:
                out.append(b)
                i += 1
                continue

        # stat rows: joins and bold values, e.g. "Clinic A charges:" **£5 per month.**
        if is_join(b) or is_value(b, at(i - 1), at(i + 1)):
            j = i
            items = []
            while at(j) is not None and (is_join(at(j)) or is_value(at(j), at(j - 1), at(j + 1))):
                items.append({"kind": "join" if is_join(at(j)) else "value", "text": at(j)["text"]})
                j += 1
            # a trailing join belongs to whatever follows it (e.g. a list)
            while items and items[-1]["kind"] == "join":
                items.pop()
                j -= 1
            if any(x["kind"] == "value" for x in items) and j > i:
                out.append({"type": "statRow", "items": items})
                i = j
                continue

        # key statement
        if is_p(b) and is_bold(t) and len(plain(t)) >= 30:
            out.append({"type": "keyline", "text": t})
            i += 1
            continue

        out.append(b)
        i += 1
    return out
