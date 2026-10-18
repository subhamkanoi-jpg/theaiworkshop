import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CFG = json.loads((ROOT / "workshop.json").read_text(encoding="utf-8"))


def test_no_page_still_sells_september():
    for path in ROOT.glob("src/**/*.tsx"):
        text = path.read_text(encoding="utf-8")
        for phrase in ("27 Sept", "27 September", "filmmaking", "face lock", "Face lock", "finished ad"):
            assert phrase not in text, f"{path.name}: {phrase}"


def test_home_reads_its_copy_from_workshop_json():
    app = (ROOT / "src/App.tsx").read_text(encoding="utf-8")
    for name in ("HERO", "STAGES", "RUN", "BELONG", "STAY_HOME", "TICKET_CHIPS", "LEAD", "AutomationRun"):
        assert name in app
    assert "teaser-9x16" not in app


def test_every_outcome_has_a_spec():
    assert len(CFG["artifactSpecs"]) == len(CFG["outcomes"]) == len(CFG["stages"])
    assert all(":" in outcome for outcome in CFG["outcomes"])


def test_automation_run_stands_still_for_reduced_motion():
    css = (ROOT / "src/index.css").read_text(encoding="utf-8")
    start = css.index(".run-log")
    reduced = css.index("prefers-reduced-motion: reduce", start)
    block = css[reduced : css.index("\n}\n", reduced)]
    assert ".run-log li" in block and "animation: none" in block
