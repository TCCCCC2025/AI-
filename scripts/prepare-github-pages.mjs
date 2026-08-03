import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("dist/client");
const prefix = "/AI-";

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else files.push(fullPath);
  }
  return files;
}

for (const file of await walk(root)) {
  if (!file.endsWith(".html") && !file.endsWith(".rsc")) continue;
  const original = await readFile(file, "utf8");
  // Static export has no knowledge of the GitHub Pages project prefix. Rebase
  // every quoted root-relative URL (HTML attributes and RSC JSON alike).
  const updated = original.replace(/(["'])\/(?!AI-\/|[\/>])/g, `$1${prefix}/`);
  if (updated !== original) await writeFile(file, updated);

  // Keep the worker-compatible flat files while also creating clean URL
  // directories for GitHub Pages (for example /AI-/weekly/ -> weekly/index.html).
  if (file.endsWith(".html") && path.dirname(file) === root) {
    const routeName = path.basename(file, ".html");
    if (routeName !== "index" && routeName !== "404") {
      const routeDirectory = path.join(root, routeName);
      await mkdir(routeDirectory, { recursive: true });
      await writeFile(path.join(routeDirectory, "index.html"), updated);
    }
  }
}

await stat(root);
