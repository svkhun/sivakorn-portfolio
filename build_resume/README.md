# Resume and CV build

`resume.html` and `cv.html` are the maintained content sources. Their inline print styles and `document-theme.css` retain the design from pushed commit `92ecc471d6c686dae44d87e0d4620c3ddf59397b`: Newsreader, Inter and the terracotta accent.

The Cover Letter is deferred. Its source and original PDF remain unchanged and neither build entry point generates it.

## Build

Use the project's Python environment with `pypdf` installed and an installed Google Chrome:

```powershell
python build_resume/build_documents.py --revision 20261114_content_v2
```

Supply a new revision on each build. Optional arguments are `--chrome PATH` and `--output-dir PATH`. `CHROMIUM_EXECUTABLE` also selects Chrome. The legacy Node entry point delegates to the same Python build; set `PYTHON` if Python is not on PATH.

Outputs use new names under `output/pdf/`. The builder refuses existing targets, rejects unresolved review fields, verifies one Resume page and two CV pages, checks bullet/title text and footers, and requires clickable repository links. It does not copy files into `assets/` or overwrite the original PDFs.

Render and visually inspect every page after building. Check typography, clipping, page numbers and links before copying the approved new filenames into `assets/` and updating the site downloads. The documents currently contain English text only; no Thai text or new Thai font has been added.

The reviewed content revision is `20261114_content_v2`. Availability dates, enrollment year, coursework and unconfirmed individual contributions are omitted rather than filled with placeholders.
