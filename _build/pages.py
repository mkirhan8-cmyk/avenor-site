#!/usr/bin/env python3
"""Build the inner pages of avenor.com.ua in the style of the one-page card (assets/one.css).

Run from the repo root:  python3 _build/pages.py
The home pages (index.html, en/index.html) stay hand-edited; this script copies
their request form and footer into every inner page so the lead path stays identical.
"""
import html, json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://avenor.com.ua"
WA = "https://wa.me/380739556243"

LANGS = ("uk", "en", "tr")
HOMES = {"uk": "/", "en": "/en/", "tr": "/tr/"}
LABEL = {"uk": "UA", "en": "EN", "tr": "TR"}
# page key -> (UA path, EN path, TR path)
PATHS = {
    "products": ("/produktsiya.html", "/en/products.html", "/tr/urunler.html"),
    "meal": ("/shrot.html", "/en/sunflower-meal.html", "/tr/aycicegi-kuspesi.html"),
    "routes": ("/marshruty.html", "/en/routes.html", "/tr/rotalar.html"),
    "quality": ("/yakist.html", "/en/quality.html", "/tr/kalite.html"),
    "order": ("/yak-zamovyty.html", "/en/how-to-order.html", "/tr/nasil-siparis-verilir.html"),
    "about": ("/pro-kompaniyu.html", "/en/about.html", "/tr/hakkimizda.html"),
    "faq": ("/faq.html", "/en/faq.html", "/tr/sss.html"),
    "contacts": ("/kontakty.html", "/en/contacts.html", "/tr/iletisim.html"),
    "privacy": ("/privacy.html", "/en/privacy.html", "/tr/gizlilik.html"),
}
# old EN addresses with Ukrainian slugs -> English page
EN_ALIASES = {
    "/en/produktsiya.html": "products", "/en/shrot.html": "meal", "/en/marshruty.html": "routes",
    "/en/yakist.html": "quality", "/en/yak-zamovyty.html": "order", "/en/pro-kompaniyu.html": "about",
    "/en/kontakty.html": "contacts",
}
NAV = ["products", "routes", "quality", "order", "about", "contacts"]

T = {
    "uk": {
        "home": "Головна", "request": "Запросити ціну", "menu": "Меню", "skip": "До змісту",
        "nav": {"products": "Продукція", "meal": "Соняшниковий шрот", "routes": "Маршрути", "quality": "Якість",
                "order": "Як замовити", "about": "Про компанію", "faq": "FAQ", "contacts": "Контакти", "privacy": "Конфіденційність"},
        "more": "Детальніше",
    },
    "en": {
        "home": "Home", "request": "Request a quote", "menu": "Menu", "skip": "Skip to content",
        "nav": {"products": "Products", "meal": "Sunflower meal", "routes": "Routes", "quality": "Quality",
                "order": "How to order", "about": "About", "faq": "FAQ", "contacts": "Contacts", "privacy": "Privacy"},
        "more": "Learn more",
    },
    "tr": {
        "home": "Ana sayfa", "request": "Fiyat isteyin", "menu": "Menü", "skip": "İçeriğe geç",
        "nav": {"products": "Ürünler", "meal": "Ayçiçeği küspesi", "routes": "Rotalar", "quality": "Kalite",
                "order": "Nasıl sipariş verilir", "about": "Hakkımızda", "faq": "SSS", "contacts": "İletişim", "privacy": "Gizlilik"},
        "more": "Daha fazla",
    },
}

e = html.escape


def L(lang, key):
    return PATHS[key][LANGS.index(lang)]


def inline(s, lang):
    """[[key|text]] -> internal link, **x** -> <strong>; text is trusted (written here)."""
    s = re.sub(r"\[\[(\w+)\|([^\]]+)\]\]", lambda m: f'<a href="{L(lang, m.group(1))}">{m.group(2)}</a>', s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    return s


# ---------- blocks ----------

def b_terms(items, cls="", lang="uk"):
    cells = "".join(f"<div><h3>{h}</h3><p>{inline(p, lang)}</p></div>" for h, p in items)
    return f'<div class="terms {cls}">{cells}</div>'


def b_work(items, lang):
    return b_terms(items, "pg-work", lang=lang)


def b_ticks(items, lang):
    return '<ul class="ticks">' + "".join(f"<li>{inline(i, lang)}</li>" for i in items) + "</ul>"


def b_table(head, rows, lang):
    th = "".join(f"<th scope=\"col\">{h}</th>" for h in head)
    tr = "".join("<tr>" + "".join((f"<th scope=\"row\">{inline(c, lang)}</th>" if j == 0 else f"<td data-l=\"{head[j]}\">{inline(c, lang)}</td>")
                                  for j, c in enumerate(r)) + "</tr>" for r in rows)
    cls = "tbl narrow" if len(head) == 2 and all(len(r[1]) < 30 for r in rows) else "tbl wide"
    return f'<div class="{cls}"><table><thead><tr>{th}</tr></thead><tbody>{tr}</tbody></table></div>'


def b_routes(items, lang):
    li = "".join(f"<li><b>{t}</b><span>{inline(s, lang)}</span></li>" for t, s in items)
    return f'<ul class="routes">{li}</ul>'


def b_steps(items, lang):
    li = "".join(f"<li><b>{t}</b><p>{inline(p, lang)}</p></li>" for t, p in items)
    return f'<ol class="steps">{li}</ol>'


def b_faq(items, lang):
    return '<div class="faq">' + "".join(
        f"<details><summary>{q}</summary><p>{inline(a, lang)}</p></details>" for q, a in items) + "</div>"


def b_groups(items, lang):
    out = []
    for img, title, lst, tail in items:
        out.append(f'<article class="card grp"><img src="/assets/img/{img}-800.webp" alt="" width="800" height="600" loading="lazy">'
                   f'<div><h3>{title}</h3><ul>' + "".join(f"<li>{inline(x, lang)}</li>" for x in lst) +
                   f'</ul><p>{inline(tail, lang)}</p></div></article>')
    return '<div class="grid3">' + "".join(out) + "</div>"


def b_news(items, foot, lang):
    li = "".join(f'<li><time>{d}</time><p>{inline(t, lang)} <a href="{u}" rel="noopener" target="_blank">{src}</a></p></li>' for d, t, src, u in items)
    return f'<ul class="news">{li}</ul><p class="note">{foot}</p>'


def b_p(text, lang):
    return f'<p class="pg-p">{inline(text, lang)}</p>'


def b_note(text, lang):
    return f'<p class="note">{inline(text, lang)}</p>'


def b_dl(items, lang):
    return '<dl class="dl">' + "".join(f"<div><dt>{k}</dt><dd>{inline(v, lang)}</dd></div>" for k, v in items) + "</dl>"


def b_links(items, lang):
    return '<p class="pg-links">' + " · ".join(f'<a href="{L(lang, k)}">{t} →</a>' for k, t in items) + "</p>"


BLOCKS = {"terms": b_terms, "work": b_work, "ticks": b_ticks, "table": b_table, "routes": b_routes, "steps": b_steps,
          "faq": b_faq, "groups": b_groups, "p": b_p, "news": b_news, "note": b_note, "dl": b_dl, "links": b_links}


def render_block(b, lang):
    kind, *args = b
    return BLOCKS[kind](*args, lang=lang)


# ---------- page shell ----------

def chunk(src, pattern):
    m = re.search(pattern, src, re.S)
    if not m:
        raise SystemExit(f"pattern not found in home page: {pattern}")
    return m.group(0)


HOME = {k: (ROOT / (HOMES[k].lstrip("/") + "index.html")).read_text("utf-8") for k in LANGS}
FORM = {k: chunk(v, r'<section class="soft" id="request">.*?</section>') for k, v in HOME.items()}
FOOTER = {k: chunk(v, r"<footer>.*?</footer>") for k, v in HOME.items()}
STICKY = {k: chunk(v, r'<a class="stk".*?</a>') + "\n" + chunk(v, r"<script>\(function\(\)\{var k=document\.querySelector\('\.stk'\).*?</script>")
          for k, v in HOME.items()}


def header(lang, key):
    t = T[lang]
    alts = PATHS[key] if key else tuple(HOMES[k] for k in LANGS)
    links = "".join(f'<a href="{L(lang, k)}"' + (' aria-current="page"' if k == key or (key == "meal" and k == "products") else "")
                    + f'>{t["nav"][k]}</a>' for k in NAV)
    home = HOMES[lang]
    langs = "".join(f'<a href="{alts[i]}" hreflang="{k}"' + (' aria-current="true"' if k == lang else "") + f'>{LABEL[k]}</a>'
                    for i, k in enumerate(LANGS))
    return (f'<header class="top"><div class="wrap">'
            f'<a href="{home}" aria-label="AVENOR TRADE"><img src="/assets/lockup-lat-white.svg" alt="AVENOR TRADE" width="150" height="26"></a>'
            f'<nav class="mnav" aria-label="{t["menu"]}">{links}</nav><span class="sp"></span>'
            f'<nav class="lang" aria-label="Language">{langs}</nav>'
            f'<a class="btn btn-s" href="#request">{t["request"]}</a>'
            f'<details class="burger"><summary aria-label="{t["menu"]}"><span></span></summary><nav>{links}'
            f'<a href="{L(lang, "faq")}">{t["nav"]["faq"]}</a></nav></details>'
            f'</div></header>')


def page(lang, key, p):
    t = T[lang]
    alts = PATHS[key]
    url = SITE + L(lang, key)
    home = HOMES[lang]
    crumbs = [(home, t["home"])]
    if key == "meal":
        crumbs.append((L(lang, "products"), t["nav"]["products"]))
    crumbs_html = "".join(f'<a href="{h}">{n}</a><span>/</span>' for h, n in crumbs) + f'<span aria-current="page">{t["nav"][key]}</span>'
    ld = [{"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": i + 1, "name": n, "item": SITE + h} for i, (h, n) in enumerate(crumbs + [(L(lang, key), t["nav"][key])])]}]
    if p.get("faq_ld"):
        qa = [(q, re.sub(r"<[^>]+>", "", inline(a, lang))) for q, a in p["faq_ld"]]
        ld.append({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in qa]})
    secs = []
    for i, s in enumerate(p["sections"]):
        cls = s.get("bg", "soft" if i % 2 else "")
        eyebrow = f'<p class="eyebrow">{s["eyebrow"]}</p>' if s.get("eyebrow") else ""
        h2 = f'<h2>{s["h2"]}</h2>' if s.get("h2") else ""
        lead = f'<p class="lead">{inline(s["lead"], lang)}</p>' if s.get("lead") else ""
        body = "".join(render_block(b, lang) for b in s["blocks"])
        secs.append(f'<section class="pg {cls}"' + (f' id="{s["id"]}"' if s.get("id") else "") +
                    f'><div class="wrap">{eyebrow}{h2}{lead}{body}</div></section>')
    acts = (f'<div class="acts"><a class="btn" href="#request">{t["request"]}</a>'
            f'<a class="btn btn-ghost" href="{WA}" rel="noopener">WhatsApp</a></div>')
    tags = "".join(f"<span>{x}</span>" for x in p.get("tags", []))
    tags = f'<div class="dirs">{tags}</div>' if tags else ""
    img = p["img"]
    return f"""<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{e(p["title"])}</title>
<meta name="description" content="{e(p["desc"])}">
<link rel="canonical" href="{url}">
{"".join(f'<link rel="alternate" hreflang="{k}" href="{SITE}{alts[i]}">' + chr(10) for i, k in enumerate(LANGS))}<link rel="alternate" hreflang="x-default" href="{SITE}{alts[0]}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="AVENOR TRADE">
<meta property="og:url" content="{url}">
<meta property="og:title" content="{e(p["title"])}">
<meta property="og:description" content="{e(p["desc"])}">
<meta property="og:image" content="{SITE}/assets/{'og-general.jpg' if lang == 'uk' else 'og-general-en.jpg'}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#14181C">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="preload" href="/assets/m.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/m-var.woff2" as="font" type="font/woff2" crossorigin>
<script type="application/ld+json">{json.dumps(ld if len(ld) > 1 else ld[0], ensure_ascii=False)}</script>
<link rel="stylesheet" href="/assets/one.css">
</head>
<body class="inner">
<a class="skip" href="#main">{t["skip"]}</a>
{header(lang, key)}
<main id="main">
<section class="phero">
<img src="/assets/img/{img}-1600.webp" srcset="/assets/img/{img}-800.webp 800w,/assets/img/{img}-1600.webp 1600w" sizes="100vw" alt="" width="1600" height="900" fetchpriority="high">
<div class="wrap">
<nav class="crumb" aria-label="breadcrumb">{crumbs_html}</nav>
<h1>{p["h1"]}</h1>
<p class="lead">{inline(p["lead"], lang)}</p>
{tags}{acts}
</div>
</section>
{"".join(secs)}
{FORM[lang]}
</main>
{FOOTER[lang]}
{STICKY[lang]}
</body>
</html>
"""


MORE = {"products": "products", "routes": "routes", "terms": "order", "about": "about"}
MORE_TXT = {"uk": {"products": "Уся продукція", "routes": "Усі маршрути й ризики", "terms": "Як замовити і хто що робить за базисом", "about": "Про компанію й реквізити"},
            "en": {"products": "All products", "routes": "All routes and risks", "terms": "How to order and who does what", "about": "About us and company details"},
            "tr": {"products": "Tüm ürünler", "routes": "Tüm rotalar ve riskler", "terms": "Nasıl sipariş verilir, kim ne yapar", "about": "Hakkımızda ve şirket bilgileri"}}


def patch_home(lang):
    """Add the page menu and 'more' links to the accepted one-page card; idempotent."""
    f = ROOT / (HOMES[lang].lstrip("/") + "index.html")
    s = f.read_text("utf-8")
    s = re.sub(r'<header class="top">.*?</header>', lambda m: header(lang, None), s, count=1, flags=re.S)
    s = re.sub(r'<p class="pmore">.*?</p>', "", s)
    alts = "".join(f'<link rel="alternate" hreflang="{k}" href="{SITE}{HOMES[k]}">' for k in LANGS)
    alts += f'<link rel="alternate" hreflang="x-default" href="{SITE}/">'
    s = re.sub(r'(?:<link rel="alternate" hreflang="[^"]+" href="[^"]+">\s*)+', lambda m: alts, s, count=1)
    for sec, key in MORE.items():
        start = s.index(f'id="{sec}"')
        end = s.index("</section>", start)
        cut = s.rindex("</div>", start, end)
        s = s[:cut] + f'<p class="pmore"><a href="{L(lang, key)}">{MORE_TXT[lang][sec]} →</a></p>' + s[cut:]
    f.write_text(s, "utf-8")
    HOME[lang] = s


def redirect(lang, target):
    url = target
    return (f'<!doctype html>\n<html lang="{lang}"><head><meta charset="utf-8"><title>AVENOR TRADE</title>\n'
            f'<meta name="viewport" content="width=device-width,initial-scale=1">\n'
            f'<link rel="canonical" href="{SITE}{url}">\n<meta name="robots" content="noindex">\n'
            f'<meta http-equiv="refresh" content="0; url={url}">\n<script>location.replace("{url}")</script>\n'
            f'</head><body><p><a href="{url}">AVENOR TRADE</a></p></body></html>\n')


def sitemap():
    urls = [tuple(HOMES[k] for k in LANGS)] + list(PATHS.values())
    out = ['<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
    for alts in urls:
        alt = "".join(f'<xhtml:link rel="alternate" hreflang="{k}" href="{SITE}{alts[i]}"/>' for i, k in enumerate(LANGS))
        alt += f'<xhtml:link rel="alternate" hreflang="x-default" href="{SITE}{alts[0]}"/>'
        out += [f"<url><loc>{SITE}{u}</loc>{alt}</url>" for u in alts]
    out.append("</urlset>")
    return "".join(out)


def main():
    from content import PAGES
    for lang in LANGS:
        patch_home(lang)
    for key in PATHS:
        for i, lang in enumerate(LANGS):
            out = ROOT / PATHS[key][i].lstrip("/")
            out.write_text(page(lang, key, PAGES[lang][key]), "utf-8")
            print("wrote", out.relative_to(ROOT))
    for path, key in EN_ALIASES.items():
        (ROOT / path.lstrip("/")).write_text(redirect("en", PATHS[key][1]), "utf-8")
    (ROOT / "sitemap.xml").write_text(sitemap(), "utf-8")
    print("wrote sitemap.xml")


if __name__ == "__main__":
    main()
