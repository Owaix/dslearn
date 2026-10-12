import { readFile, mkdir, writeFile, cp, rm } from "node:fs/promises";
import { marked } from "marked";

const output = new URL("./public/", import.meta.url);
const root = new URL("../", import.meta.url);
const sections = [
  ["reference", "Package & API", "README.md"],
  ["learning", "Learning path", "docs/learning-path.md"],
  ["contributing", "Contributing", "CONTRIBUTING.md"],
  ["git", "Git workflow", "docs/git-workflow.md"],
  ["publishing", "npm publishing", "docs/npm-publishing.md"],
  ["changelog", "Changelog", "CHANGELOG.md"],
  ["license", "License", "LICENSE"],
];
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
const documents = [];
for (const [id, title, path] of sections) {
  const source = await readFile(new URL(path, root), "utf8");
  const html =
    id === "license"
      ? `<pre>${source.replaceAll("&", "&amp;").replaceAll("<", "&lt;")}</pre>`
      : marked.parse(source);
  documents.push(`<article id="${id}" class="document" aria-label="${title}">${html}</article>`);
}
const template = await readFile(new URL("./index.html", import.meta.url), "utf8");
const examples = await readFile(new URL("examples/all-structures.mjs", root), "utf8");
const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
const targets = {
  "README.md": "reference",
  "learning-path.md": "learning",
  "git-workflow.md": "git",
  "npm-publishing.md": "publishing",
  "CONTRIBUTING.md": "contributing",
  "CHANGELOG.md": "changelog",
  LICENSE: "license",
};
const staticDocuments = documents.join("\n").replace(/href="([^"#]+)"/g, (attribute, href) => {
  if (/^(https?:|mailto:)/.test(href)) return attribute;
  const file = href.split("#")[0].split("/").pop();
  return targets[file]
    ? `href="#${targets[file]}"`
    : `href="https://github.com/Owaix/dslearn/blob/master/${href.replace(/^(\.\.\/|\.\/)+/, "")}"`;
});
await writeFile(
  new URL("index.html", output),
  template
    .replace("<!-- DOCUMENTS -->", staticDocuments)
    .replace("<!-- EXAMPLES -->", `<pre><code>${escapeHtml(examples)}</code></pre>`),
);
for (const name of ["style.css"]) await cp(new URL(name, import.meta.url), new URL(name, output));
await cp(new URL("dist/", root), new URL("dist/", output), { recursive: true });
await writeFile(new URL(".nojekyll", output), "");
await cp(new URL("examples/", root), new URL("examples/", output), { recursive: true });
console.log(`Built ${sections.length} documentation pages with local package modules.`);
