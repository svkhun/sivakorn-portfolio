"""Print the maintained Resume/CV HTML without changing the published design.

Cover Letter is deliberately outside this build. Existing PDFs are never overwritten.
"""
from __future__ import annotations

import argparse
from html import unescape
from html.parser import HTMLParser
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile

from pypdf import PdfReader

BUILD_DIR = Path(__file__).resolve().parent
ROOT = BUILD_DIR.parent
DOCUMENTS = (("Resume", "resume.html", 1), ("CV", "cv.html", 2))


class DocumentText(HTMLParser):
    def __init__(self, source: str):
        super().__init__()
        self.skip = 0
        self.parts: list[str] = []
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style"):
            self.skip += 1

    def handle_endtag(self, tag):
        if tag in ("script", "style"):
            self.skip -= 1

    def handle_data(self, value):
        if not self.skip and value.strip():
            self.parts.append(value.strip())


def normalize(value: str) -> str:
    value = unescape(value).replace("\u00ad", "")
    value = value.translate(str.maketrans({"\u2013": "-", "\u2014": "-", "\u2011": "-", "\u00a0": " "}))
    return re.sub(r"\s+", "", value)


def validate_source(source: str, filename: str) -> None:
    text = " ".join(DocumentText(source).parts)
    if re.search(r"\[(?:confirm[^\]]*|dates|Company|Role|TODO[^\]]*)\]", text, re.IGNORECASE):
        raise ValueError(f"Unresolved review/template field in {filename}")
    banned = r"0\.894|B1\+|GISTDA|\bCDG\b|LINE MAN|leak-free|label.leakage|Class of 2026|Basel-compliant|regulatory-defensible"
    if re.search(banned, text, re.IGNORECASE):
        raise ValueError(f"Outdated wording in {filename}")


def validate_pdf(path: Path, source: str, expected_pages: int) -> dict:
    reader = PdfReader(path)
    if len(reader.pages) != expected_pages:
        raise ValueError(f"{path.name}: expected {expected_pages} pages, found {len(reader.pages)}")
    extracted = "\n".join(page.extract_text() or "" for page in reader.pages)
    if "\ufffd" in extracted:
        raise ValueError(f"Replacement glyph in {path.name}")
    for number, page in enumerate(reader.pages, 1):
        if normalize(f"Page {number} of {expected_pages}") not in normalize(page.extract_text() or ""):
            raise ValueError(f"Missing or clipped footer on page {number} of {path.name}")
    # Check every bullet and project title so a correct page count cannot hide clipping.
    nodes = re.findall(r'<li\b[^>]*>(.*?)</li>|<span\b[^>]*class="entry-title"[^>]*>(.*?)</span>', source, re.DOTALL)
    for node in nodes:
        expected = normalize(" ".join(DocumentText(next(part for part in node if part)).parts))
        if expected and expected not in normalize(extracted):
            raise ValueError(f"Possibly clipped text in {path.name}: {expected[:90]}")
    links = []
    for page in reader.pages:
        for annotation in page.get("/Annots", []):
            action = annotation.get_object().get("/A", {})
            if action.get("/URI"):
                links.append(str(action["/URI"]))
    if not any("github.com" in uri for uri in links):
        raise ValueError(f"Missing clickable repository links in {path.name}")
    return {"pages": len(reader.pages), "links": len(links), "characters": len(extracted)}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--revision", required=True, help="Unique PDF filename suffix")
    parser.add_argument("--output-dir", type=Path, default=ROOT / "output" / "pdf")
    parser.add_argument("--chrome", default=os.environ.get("CHROMIUM_EXECUTABLE", r"C:\Program Files\Google\Chrome\Application\chrome.exe"))
    args = parser.parse_args()
    if not re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9_.-]{0,59}", args.revision):
        parser.error("Revision must be a short filename-safe identifier")
    chrome = Path(args.chrome)
    if not chrome.is_file():
        parser.error("Chrome not found; supply --chrome with the installed executable")
    output = args.output_dir.resolve()
    output.mkdir(parents=True, exist_ok=True)
    jobs = []
    for kind, html_name, pages in DOCUMENTS:
        source = (BUILD_DIR / html_name).read_text(encoding="utf-8-sig")
        validate_source(source, html_name)
        target = output / f"Sivakorn_Khundilokrattaya_{kind}_{args.revision}.pdf"
        if target.exists():
            raise FileExistsError(f"Choose a new --revision; refusing to overwrite {target}")
        jobs.append((kind, html_name, pages, source, target))
    # A fresh browser profile avoids the user's interactive Chrome session.
    with tempfile.TemporaryDirectory(prefix="portfolio-pdf-") as temporary:
        temporary = Path(temporary)
        for kind, html_name, pages, source, target in jobs:
            rendered = temporary / f"{kind}.pdf"
            command = [str(chrome), "--headless=new", "--disable-gpu", "--no-first-run", "--no-pdf-header-footer", "--allow-file-access-from-files", "--run-all-compositor-stages-before-draw", "--virtual-time-budget=3000", f"--user-data-dir={temporary / ('profile-' + kind)}", f"--print-to-pdf={rendered}", (BUILD_DIR / html_name).as_uri()]
            subprocess.run(command, check=True, timeout=90, capture_output=True)
            validation = validate_pdf(rendered, source, pages)
            with target.open("xb") as stream, rendered.open("rb") as incoming:
                shutil.copyfileobj(incoming, stream)
            print(f"Created {target}: {validation}")
    print("Visual review is still required before linking the new files. Existing assets and Cover Letter were not changed.")


if __name__ == "__main__":
    main()
