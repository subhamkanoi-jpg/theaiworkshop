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
    assert "30 August" in index
    assert "30 August" in book


def test_python_backend_loads_same_price():
    from api.index import PRICE, WORKSHOP_AMOUNT, TOTAL_SEATS, WORKSHOP_DATE_LABEL

    assert PRICE == CFG["price"]
    assert WORKSHOP_AMOUNT == CFG["amountPaise"]
    assert TOTAL_SEATS == CFG["totalSeats"]
    assert WORKSHOP_DATE_LABEL == CFG["dateLabel"]
