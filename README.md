# X-Tech Laboratories website

[![AI readiness](https://img.shields.io/endpoint?url=https://x-tech-laboratories.github.io/badges/x-tech-laboratories/x-tech-laboratories.github.io.json)](https://x-tech-laboratories.github.io/guidelines/readiness/)

<a href="https://liberapay.com/BeatLink/donate"><img alt="Donate using Liberapay" src="https://liberapay.com/assets/widgets/donate.svg"></a> <a href="https://ko-fi.com/I4V52ANK6N"><img alt="Support me on Ko-fi" src="https://ko-fi.com/img/githubbutton_sm.svg"></a>

Source for <https://x-tech-laboratories.github.io>, the home page of the X-Tech Laboratories community.

Built with [Astro Starlight](https://starlight.astro.build). Pages are MDX files in
`src/content/docs/`, and the sidebar is set in `astro.config.mjs`. The logo, hero image and favicon come from
the `branding/` folder of the [organisation's `.github` repository](https://github.com/x-tech-laboratories/.github), checked out as
the `org/` submodule; Dependabot opens a pull request when it changes.

## Develop

```sh
git submodule update --init   # the org/ folder: logos and icons from x-tech-laboratories/.github
npm install
npm run dev     # live preview at http://localhost:4321
npm run build   # static site in dist/, with the search index
```

Pushes to `main` build and deploy to GitHub Pages through `.github/workflows/deploy.yml`.

## Testing

`npm test` checks that every Awesome AI-Assisted Open Source entry is complete and has a readiness score. CI runs
the tests, the build and an internal link check on every pull request, and Claude reviews each pull
request when the `ANTHROPIC_API_KEY` secret is set.

## Contributing

AI-assisted contributions are welcome. Read [AGENTS.md](AGENTS.md) before you or your agent start,
and say in the pull request how AI was involved.

To suggest a project for Awesome AI-Assisted Open Source, add it to `src/data/awesome.json` and follow the
criteria on that page.

## AI Readiness Score

Scores come from the [ai-readiness](https://github.com/x-tech-laboratories/ai-readiness) package.
`npm run readiness` rescores the whole list into `src/data/readiness.json`, and the deploy workflow
does the same on every build and once a week.

## Licence

Code is licensed under the [MIT licence](LICENSE). Written content in `src/content/` is licensed
under [CC BY-SA 4.0](LICENSE-docs).
