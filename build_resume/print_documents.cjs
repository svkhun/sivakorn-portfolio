// Keep the legacy Node entry point on the same reviewed, Resume/CV-only build.
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const result = spawnSync(
  process.env.PYTHON || 'python',
  [path.join(__dirname, 'build_documents.py'), ...process.argv.slice(2)],
  { stdio: 'inherit', shell: false }
);
if (result.error) console.error(result.error.message);
process.exitCode = result.status ?? 1;
