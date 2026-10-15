import subprocess
import os
import re

BUILD_DIR = r"d:\All Project\web portfolio\build_resume"
ARTIFACT_DIR = r"C:\Users\Acer\.gemini\antigravity\brain\d9db4834-7ed1-4308-86e1-bc6cd1af34dd"
CHROME_BIN = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

os.makedirs(ARTIFACT_DIR, exist_ok=True)

# 1. Screenshot Resume
res_html = os.path.join(BUILD_DIR, "resume.html")
res_png = os.path.join(ARTIFACT_DIR, "resume_preview.png")

cmd_res = [
    CHROME_BIN,
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--window-size=794,1123", # A4 at 96 DPI: 794 x 1123
    f"--screenshot={res_png}",
    res_html
]
subprocess.run(cmd_res, check=True)
print("Saved Resume screenshot:", res_png)

# 2. Extract CV Page 1 and Page 2 precisely
with open(os.path.join(BUILD_DIR, "cv.html"), "r", encoding="utf-8") as f:
    cv_content = f.read()

style_match = re.search(r'(<style>.*?</style>)', cv_content, re.DOTALL)
style = style_match.group(1) if style_match else ""

p1_idx = cv_content.find('id="resume-page-1"')
p1_start = cv_content.rfind('<div', 0, p1_idx)

p2_idx = cv_content.find('id="resume-page-2"')
p2_start = cv_content.rfind('<div', 0, p2_idx)

# Page 1 content is between p1_start and p2_start
p1_content = cv_content[p1_start:p2_start].strip()

# Page 2 content is from p2_start to the end of cv-view
# Let's find closing tags before </body>
body_end = cv_content.rfind('</body>')
p2_content = cv_content[p2_start:body_end].strip()
# Ensure trailing closing divs are balanced
# resume-page-2 is wrapped in <div id="cv-view"> so let's strip the extra </div> for cv-view
if p2_content.endswith('</div>\n  </div>'):
    p2_content = p2_content[:-7].strip()
elif p2_content.endswith('</div></div>'):
    p2_content = p2_content[:-6].strip()

p1_html = f"<!DOCTYPE html><html><head><meta charset='UTF-8'>{style}</head><body style='margin:0;padding:0;'>{p1_content}</body></html>"
p2_html = f"<!DOCTYPE html><html><head><meta charset='UTF-8'>{style}</head><body style='margin:0;padding:0;'>{p2_content}</body></html>"

p1_file = os.path.join(BUILD_DIR, "cv_p1.html")
p2_file = os.path.join(BUILD_DIR, "cv_p2.html")

with open(p1_file, "w", encoding="utf-8") as f:
    f.write(p1_html)

with open(p2_file, "w", encoding="utf-8") as f:
    f.write(p2_html)

p1_png = os.path.join(ARTIFACT_DIR, "cv_p1_preview.png")
p2_png = os.path.join(ARTIFACT_DIR, "cv_p2_preview.png")

subprocess.run([CHROME_BIN, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--window-size=794,1123", f"--screenshot={p1_png}", p1_file], check=True)
subprocess.run([CHROME_BIN, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--window-size=794,1123", f"--screenshot={p2_png}", p2_file], check=True)

print("Saved CV Page 1 screenshot:", p1_png)
print("Saved CV Page 2 screenshot:", p2_png)
