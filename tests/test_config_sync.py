import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CFG = json.loads((ROOT / "workshop.json").read_text(encoding="utf-8"))


def test_html_matches_workshop_json():
    index = (ROOT / "index.html").read_text(encoding="utf-8")
    book = (ROOT / "book.html").read_text(encoding="utf-8")
    assert CFG["dateIso"] in index
    assert CFG["startDate"] in index
    assert str(CFG["price"]) in index
    assert str(CFG["price"]) in book
    assert "27 September" in index
    assert "27 September" in book
    assert str(CFG["totalSeats"]) in index


def test_local_seo_pages_exist():
    for name in ("kolkata.html", "workshop.html", "path.html", "room.html", "host.html", "about.html", "answers.html"):
        path = ROOT / name
        assert path.is_file(), f"missing {name} — run node scripts/write-seo-html.mjs"
    kolkata = (ROOT / "kolkata.html").read_text(encoding="utf-8")
    index = (ROOT / "index.html").read_text(encoding="utf-8")
    assert "Learn AI in Kolkata" in kolkata
    assert "The AI Workshop |" in index or "AI Workshop Kolkata" in index
    assert "LocalBusiness" in index
    sitemap = (ROOT / "public" / "sitemap.xml").read_text(encoding="utf-8")
    assert "https://www.theaiworkshop.in/kolkata" in sitemap
    assert "https://www.theaiworkshop.in/about" in sitemap
    assert "https://www.theaiworkshop.in/answers" in sitemap


def test_geo_discovery_files():
    robots = (ROOT / "public" / "robots.txt").read_text(encoding="utf-8")
    for bot in ("OAI-SearchBot", "Claude-SearchBot", "PerplexityBot", "Googlebot", "Applebot"):
        assert f"User-agent: {bot}" in robots
        assert "Allow: /" in robots
    llms = (ROOT / "public" / "llms.txt").read_text(encoding="utf-8")
    assert llms.lstrip().startswith("# ")
    assert "> " in llms
    assert "## " in llms
    assert "](https://www.theaiworkshop.in/" in llms
    assert "## Optional" in llms
    assert "about.md" in llms
    assert "kolkata.md" in llms
    assert len(llms.split()) >= 1000
    assert (ROOT / "public" / "llms-full.txt").is_file()
    assert len((ROOT / "public" / "llms-full.txt").read_text(encoding="utf-8").split()) >= 5000
    assert (ROOT / "public" / ".well-known" / "ai.txt").is_file()
    assert (ROOT / "public" / "about.md").is_file()
    assert (ROOT / "public" / "kolkata.md").is_file()
    summary = json.loads((ROOT / "public" / "ai" / "summary.json").read_text(encoding="utf-8"))
    assert len(summary["name"]) >= 3
    assert len(summary["description"]) >= 20
    faqs = json.loads((ROOT / "public" / "ai" / "faq.json").read_text(encoding="utf-8"))
    assert len(faqs["faqs"]) >= 1
    for item in faqs["faqs"]:
        assert len(item["question"]) >= 10
        assert len(item["answer"]) >= 20
    service = json.loads((ROOT / "public" / "ai" / "service.json").read_text(encoding="utf-8"))
    assert service["capabilities"]
    feed = (ROOT / "public" / "feed.xml").read_text(encoding="utf-8")
    assert "<rss" in feed
    index = (ROOT / "index.html").read_text(encoding="utf-8")
    assert 'type="application/rss+xml"' in index
    assert "dateModified" in index
    assert "HowTo" in index
    assert '"@type": "Article"' in index
    assert 'id="geo-fallback"' in index
    assert "The AI Workshop |" in index
    assert 'lang="en-IN"' in index
    fallback = index.split('id="geo-fallback"', 1)[1].split("</main>", 1)[0]
    assert len(fallback.split()) >= 300
    assert "<h3>" in fallback
    assert "https://en.wikipedia.org/wiki/Bidhannagar" in fallback
    about = (ROOT / "about.html").read_text(encoding="utf-8")
    assert 'id="geo-fallback"' in about
    assert "application/rss+xml" in about
    assert "alternateName" in index
    assert "/answers" in llms


def test_elmo_prompt_pack():
    pack = json.loads((ROOT / "src" / "seo" / "elmo.json").read_text(encoding="utf-8"))
    assert pack["brand"]["name"] == "The AI Workshop"
    assert "theaiworkshop.in" in pack["brand"]["domains"]
    assert "AI Workshop Kolkata" in pack["brand"]["aliases"]
    assert len(pack["prompts"]) >= 8
    assert pack["competitors"]
    for p in pack["prompts"]:
        assert len(p["value"]) >= 12
        assert len(p["answer"]) >= 20
        assert "The AI Workshop" in p["answer"]
        assert p["cite"].startswith("/")
    answers = (ROOT / "answers.html").read_text(encoding="utf-8")
    assert 'id="geo-fallback"' in answers
    assert pack["prompts"][0]["value"] in answers
    faqs = json.loads((ROOT / "public" / "ai" / "faq.json").read_text(encoding="utf-8"))
    assert faqs["faqs"][0]["question"] == pack["prompts"][0]["value"]
    assert (ROOT / "public" / "answers.md").is_file()


def test_python_backend_loads_same_price():
    from api.index import PRICE, WORKSHOP_AMOUNT, TOTAL_SEATS, WORKSHOP_DATE_LABEL

    assert PRICE == CFG["price"]
    assert WORKSHOP_AMOUNT == CFG["amountPaise"]
    assert TOTAL_SEATS == CFG["totalSeats"]
    assert WORKSHOP_DATE_LABEL == CFG["dateLabel"]
