# dslearn Documentation Website

The HTML website is generated from the repository's README and documentation. It includes all API docs, a hands-on learning guide, examples backed by the actual built library, and public GitHub contact links for imowaix.

```sh
npm run build
npm ci --prefix website
npm run build --prefix website
node website/serve.mjs
```

Local preview: http://127.0.0.1:4173

Generated output goes to `website/public/` and is ignored by Git. The Pages workflow rebuilds it after changes merge into `master`, and publishes the generated files to `gh-pages`. Pull requests build the site but do not deploy.

In GitHub **Settings > Pages**, select **Deploy from a branch**, **gh-pages**, and **/(root)**. The public URL is https://owaix.github.io/dslearn/.

About/contact links use the public GitHub profile and issue tracker. No email address or private biographical information is assumed. The deployed site is static HTML and CSS: every documentation section and code example is present without JavaScript, runtime routing, or API calls. Flow diagrams are displayed as their readable Mermaid source. Navigation uses ordinary anchor links.
