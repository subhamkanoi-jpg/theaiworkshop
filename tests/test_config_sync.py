import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CFG = json.loads((ROOT / "workshop.json").read_text(encoding="utf-8"))


def test_html_matches_workshop_json():
    for filename in ("index.html", "book.html", "workshop.html"):
        text = (ROOT / filename).read_text(encoding="utf-8")
        assert CFG["title"] in text
        assert CFG["startDate"] in text
        assert CFG["endDate"] in text
        assert str(CFG["price"]) in text
        assert str(CFG["totalSeats"]) in text
        schemas = re.findall(r'<script type="application/ld\+json">(.*?)</script>', text, re.S)
        graph = json.loads(schemas[0])["@graph"]
        event = next(item for item in graph if item["@type"] == "EducationEvent")
        assert event["name"] == CFG["title"]
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
        assert f"https://www.theaiworkshop.in/{route}" in sitemap
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
        asset = page["ogImage"].removeprefix("https://www.theaiworkshop.in/")
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
