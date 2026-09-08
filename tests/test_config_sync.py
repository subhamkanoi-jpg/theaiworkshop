import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CFG = json.loads((ROOT / "workshop.json").read_text(encoding="utf-8"))
ORIGIN = CFG["origin"]
PAGE_KEYS = ("kolkata", "workshop", "path", "room", "host", "about", "answers", "share")


def html(name):
    return (ROOT / name).read_text(encoding="utf-8")


def graph_of(text):
    schemas = re.findall(r'<script type="application/ld\+json">(.*?)</script>', text, re.S)
    return json.loads(schemas[0])["@graph"]


def test_html_matches_workshop_json():
    for filename in ("index.html", "book.html", "workshop.html"):
        text = (ROOT / filename).read_text(encoding="utf-8")
        assert CFG["title"] in text
        assert CFG["startDate"] in text
        assert CFG["endDate"] in text
        assert str(CFG["price"]) in text
        assert str(CFG["totalSeats"]) in text
        event = next(item for item in graph_of(text) if item["@type"] == "EducationEvent")
        assert event["name"] == CFG["eventName"]
        assert event["offers"]["price"] == str(CFG["price"])
        assert event["eventAttendanceMode"].endswith("OfflineEventAttendanceMode")
    book = (ROOT / "book.html").read_text(encoding="utf-8")
    assert "https://checkout.razorpay.com/v1/checkout.js" in book
    assert 'content="noindex, follow"' in book


def test_local_seo_pages_exist():
    for name in ("kolkata", "workshop", "path", "room", "host", "about", "answers", "share"):
        text = (ROOT / f"{name}.html").read_text(encoding="utf-8")
        assert 'id="geo-fallback"' in text
        assert 'lang="en-IN"' in text
        assert CFG["title"] in text
    assert "Learn AI in Kolkata" in (ROOT / "kolkata.html").read_text(encoding="utf-8")
    assert "LocalBusiness" in (ROOT / "index.html").read_text(encoding="utf-8")
    sitemap = (ROOT / "public/sitemap.xml").read_text(encoding="utf-8")
    for route in ("kolkata", "about", "answers", "workshop"):
        assert f"{ORIGIN}/{route}" in sitemap
    assert "/book" not in sitemap


def test_public_copy_has_one_current_offer():
    stale = ("The Magic of AI", "seven posts", "week of finished work", "#2 shipped reels", "Zero follow-through")
    paths = list(ROOT.glob("*.html")) + list((ROOT / "public").glob("*.txt")) + list((ROOT / "public").glob("*.md")) + list((ROOT / "public/ai").glob("*.json"))
    for path in paths:
        text = path.read_text(encoding="utf-8")
        for phrase in stale:
            assert phrase not in text, f"Stale offer in {path.name}: {phrase}"
    for name in ("llms.txt", "llms-full.txt"):
        text = (ROOT / "public" / name).read_text(encoding="utf-8")
        assert CFG["title"] in text
        assert "June 2026" in text
        assert "does not" in text
        assert "confidential" in text
    assert "## Optional" in (ROOT / "public/llms.txt").read_text(encoding="utf-8")


def test_geo_discovery_files():
    robots = (ROOT / "public/robots.txt").read_text(encoding="utf-8")
    for bot in ("OAI-SearchBot", "Claude-SearchBot", "PerplexityBot", "Googlebot", "Applebot"):
        assert f"User-agent: {bot}" in robots
    summary = json.loads((ROOT / "public/ai/summary.json").read_text(encoding="utf-8"))
    assert summary["next_workshop"]["title"] == CFG["title"]
    assert summary["next_workshop"]["priceINR"] == CFG["price"]
    service = json.loads((ROOT / "public/ai/service.json").read_text(encoding="utf-8"))
    assert service["capabilities"]
    assert (ROOT / "public/.well-known/ai.txt").is_file()
    assert "<rss" in (ROOT / "public/feed.xml").read_text(encoding="utf-8")
    pages = json.loads((ROOT / "src/seo/pages.json").read_text(encoding="utf-8"))
    for page in pages.values():
        asset = page["ogImage"].removeprefix(f"{ORIGIN}/")
        assert (ROOT / "public" / asset).is_file(), f"Missing share image: {asset}"


def test_elmo_prompt_pack():
    pack = json.loads((ROOT / "src/seo/elmo.json").read_text(encoding="utf-8"))
    assert pack["brand"]["name"] == "The AI Workshop"
    assert len(pack["prompts"]) == len(CFG["faqs"])
    faqs = json.loads((ROOT / "public/ai/faq.json").read_text(encoding="utf-8"))
    for prompt, source, public in zip(pack["prompts"], CFG["faqs"], faqs["faqs"]):
        assert prompt["value"] == source["q"] == public["question"]
        assert source["a"] in prompt["answer"] == public["answer"]
        assert prompt["cite"] == "/workshop"


def test_python_backend_loads_same_price():
    from api.index import PRICE, WORKSHOP_AMOUNT, TOTAL_SEATS, WORKSHOP_DATE_LABEL, WORKSHOP_TITLE
    assert PRICE == CFG["price"]
    assert WORKSHOP_AMOUNT == CFG["amountPaise"]
    assert TOTAL_SEATS == CFG["totalSeats"]
    assert WORKSHOP_DATE_LABEL == CFG["dateLabel"]
    assert WORKSHOP_TITLE == CFG["title"]


def test_one_canonical_host_everywhere():
    """Canonical, sitemap, JSON-LD @ids and share URLs must agree on one host.

    A www canonical beside a non-www sitemap splits the ranking signal, which is
    the single most expensive mistake available here, so it is worth a test.
    """
    assert ORIGIN == "https://theaiworkshop.in"
    surfaces = [ROOT / "index.html", *(ROOT / f"{k}.html" for k in PAGE_KEYS)]
    surfaces += [ROOT / "book.html", ROOT / "public/sitemap.xml", ROOT / "public/robots.txt"]
    surfaces += list((ROOT / "public").glob("*.txt")) + list((ROOT / "public").glob("*.md"))
    surfaces += list((ROOT / "public/ai").glob("*.json"))
    surfaces += [ROOT / "src/seo/pages.json", ROOT / "src/seo/local.ts", ROOT / "src/hooks/usePageSeo.ts"]
    for path in surfaces:
        assert "www.theaiworkshop.in" not in path.read_text(encoding="utf-8"), (
            f"Stale www host in {path.relative_to(ROOT)}"
        )
    for name in ("index.html", *(f"{k}.html" for k in PAGE_KEYS)):
        text = html(name)
        path = "/" if name == "index.html" else f"/{name[:-5]}"
        assert f'<link rel="canonical" href="{ORIGIN}{path}" />' in text


def test_geo_meta_tags_on_every_shell():
    lat, lng = CFG["venue"]["latitude"], CFG["venue"]["longitude"]
    for name in ("index.html", "book.html", *(f"{k}.html" for k in PAGE_KEYS)):
        text = html(name)
        assert '<meta name="geo.region" content="IN-WB" />' in text
        assert '<meta name="geo.placename" content="Salt Lake, Kolkata" />' in text
        assert f'<meta name="geo.position" content="{lat};{lng}" />' in text
        assert f'<meta name="ICBM" content="{lat}, {lng}" />' in text
        assert '<meta property="og:locale" content="en_IN" />' in text


def test_home_head_targets_the_local_query():
    text = html("index.html")
    assert "<title>AI Video Ad Workshop Kolkata | 27 Sept · Salt Lake</title>" in text
    assert "Build a complete AI video ad in 3 hours." in text
    assert (
        'content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"'
        in text
    )
    assert f'<meta property="og:image" content="{ORIGIN}{CFG["ogImage"]}" />' in text
    assert (ROOT / "public" / CFG["ogImage"].lstrip("/")).is_file()


def test_event_carries_the_full_local_entity():
    event = next(i for i in graph_of(html("index.html")) if i["@type"] == "EducationEvent")
    venue = CFG["venue"]
    assert event["@id"] == f"{ORIGIN}/#event"
    assert event["doorTime"] == CFG["doorTime"]
    assert event["offers"]["availability"].endswith("InStock")
    assert event["offers"]["validFrom"] == CFG["offerValidFrom"]
    assert event["performer"]["name"] == "The AI Workshop Core Team"
    place = event["location"]
    assert place["name"] == venue["name"]
    assert place["hasMap"] == venue["hasMap"]
    assert place["geo"]["latitude"] == venue["latitude"]
    assert place["geo"]["longitude"] == venue["longitude"]
    assert place["address"]["streetAddress"] == venue["streetAddress"]
    assert place["address"]["postalCode"] == venue["postalCode"]


def test_nap_is_identical_across_every_entity():
    """Organization, LocalBusiness and the Event's Place must share one address."""
    graph = graph_of(html("index.html"))
    addresses = [i["address"] for i in graph if isinstance(i.get("address"), dict)]
    addresses.append(next(i for i in graph if i["@type"] == "EducationEvent")["location"]["address"])
    assert len(addresses) >= 3
    assert all(a == addresses[0] for a in addresses), "NAP drift between entities"
    local_ts = (ROOT / "src/seo/local.ts").read_text(encoding="utf-8")
    assert f'lat: {CFG["venue"]["latitude"]}' in local_ts
    assert f'lng: {CFG["venue"]["longitude"]}' in local_ts
    assert CFG["venue"]["hasMap"] in local_ts


def test_faq_schema_is_single_and_visible_on_page():
    """FAQ structured data may only answer questions the page itself renders."""
    text = html("index.html")
    graph = graph_of(text)
    faqs = [i for i in graph if i["@type"] == "FAQPage"]
    assert len(faqs) == 1, "more than one FAQPage on a single page"
    assert faqs[0]["@id"] == f"{ORIGIN}/#faq"
    names = [q["name"] for q in faqs[0]["mainEntity"]]
    # Home renders the local questions only; the rest live on /workshop and
    # /answers, and schema may not claim answers a page does not show.
    assert len(names) == len(CFG["localFaqs"])
    fallback = text.split('id="geo-fallback"', 1)[1]
    for faq in CFG["localFaqs"]:
        assert faq["q"] in names
        # Present in the crawlable shell, and rendered by the React page too.
        assert faq["q"].replace("&", "&amp;") in fallback
    app = (ROOT / "src/App.tsx").read_text(encoding="utf-8")
    assert "workshopContent.localFaqs.map" in app


def test_page_copy_does_not_contradict_the_venue_faqs():
    """The venue FAQ promises power strips; no page may say power is limited."""
    for path in list(ROOT.glob("src/**/*.tsx")) + list(ROOT.glob("*.html")):
        text = path.read_text(encoding="utf-8")
        assert "Power at the tables is limited" not in text, path.name


def test_teaser_end_card_matches_the_live_offer():
    """The teaser's end card is typed into the composition, not read from JSON.

    Nothing else stops the video from advertising last month's price after
    workshop.json moves on, and the rendered MP4/WebM in public/cinema/ are
    built from this file — so the facts are pinned here instead.
    """
    composition = (ROOT / "video/teaser/index.html").read_text(encoding="utf-8")
    year, month, day = (int(part) for part in CFG["dateIso"].split("-"))
    month_name = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ][month - 1]
    expected = {
        "date": f"{day} {month_name}",
        "price": f"₹{CFG['price']}",
        "seats": f"{CFG['totalSeats']} seats",
        "host": ORIGIN.removeprefix("https://"),
    }
    for label, value in expected.items():
        assert value in composition, (
            f"Teaser end card is stale: {label} should read {value!r}. "
            "Update video/teaser/index.html and re-render into public/cinema/ "
            "(see video/teaser/README.md)."
        )
    assert year == 2026


def test_teaser_renders_are_served_from_public():
    """The hero plays these; a missing source silently falls back to the poster."""
    for asset in ("teaser-9x16.webm", "teaser-9x16.mp4", "teaser-poster.jpg"):
        path = ROOT / "public/cinema" / asset
        assert path.is_file(), f"Missing hero video asset: {asset}"
        assert path.stat().st_size > 1024, f"Hero video asset looks empty: {asset}"
    # WebM is offered first precisely because it is the smaller download.
    webm = (ROOT / "public/cinema/teaser-9x16.webm").stat().st_size
    mp4 = (ROOT / "public/cinema/teaser-9x16.mp4").stat().st_size
    assert webm < mp4, "WebM should be the smaller source, or it should not go first"
    app = (ROOT / "src/App.tsx").read_text(encoding="utf-8")
    assert app.index("teaser-9x16.webm") < app.index("teaser-9x16.mp4")
