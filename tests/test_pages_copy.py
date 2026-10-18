import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CFG = json.loads((ROOT / "workshop.json").read_text(encoding="utf-8"))


def read(path):
    return (ROOT / path).read_text(encoding="utf-8")


def test_no_page_still_sells_september():
    for path in ROOT.glob("src/**/*.tsx"):
        text = path.read_text(encoding="utf-8")
        for phrase in ("27 Sept", "27 September", "filmmaking", "face lock", "Face lock", "finished ad"):
            assert phrase not in text, f"{path.name}: {phrase}"


def test_home_reads_its_copy_from_workshop_json():
    app = read("src/App.tsx")
    # RUN itself is read by RunRail, which App renders; the heading and the
    # closing line are the home page's own.
    for name in (
        "HERO",
        "STAGES",
        "RUN_HEADING",
        "FINISH_LINE",
        "BELONG",
        "STAY_HOME",
        "TICKET_CHIPS",
        "LEAD",
        "AutomationRun",
        "RunRail",
    ):
        assert re.search(rf"\b{name}\b", app), name
    assert "teaser-9x16" not in app


def test_run_rail_is_shared_and_sized_from_run():
    rail = read("src/components/RunRail.tsx")
    assert re.search(r"\bRUN\b", rail)
    assert "--run-cols" in rail and "RUN.length" in rail
    for page in ("src/App.tsx", "src/pages/WorkshopPage.tsx"):
        text = read(page)
        assert "<RunRail" in text, page
        # The tiles live in one place; the pages must not rebuild them.
        assert "Block {String(i + 1)" not in text, page


def test_every_outcome_has_a_spec():
    assert len(CFG["artifactSpecs"]) == len(CFG["outcomes"]) == len(CFG["stages"])
    assert all(":" in outcome for outcome in CFG["outcomes"])


def test_automation_run_stands_still_for_reduced_motion():
    css = read("src/index.css")
    start = css.index(".run-log")
    # Rows are visible unless an animation hides them: no base opacity: 0.
    base = re.search(r"\.run-log li \{([^}]*)\}", css[start:]).group(1)
    assert "opacity: 0" not in base
    reduced = css.index("prefers-reduced-motion: reduce", start)
    block = css[reduced : css.index("\n}\n", reduced)]
    assert ".run-log li" in block and "animation: none" in block


def test_gate_term_colour_does_not_outrank_utilities():
    """`.gate-term` is unlayered and comes after @tailwind utilities, so a plain
    `color` on it would beat every text-* class on the element."""
    css = read("src/index.css")
    rule = re.search(r"\n\.gate-term \{([^}]*)\}", css).group(1)
    assert "color:" not in rule
    assert re.search(r":where\(\.gate-term\)\s*\{[^}]*color:", css)


def test_terms_read_the_live_workshop():
    terms = read("src/pages/LegalPages.tsx")
    assert "WORKSHOP_ARTIFACT" in terms and "WORKSHOP_DURATION_LABEL" in terms
    for stale in ("three-hour", "week-of-work"):
        assert stale not in terms, stale
