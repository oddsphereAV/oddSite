# Oddsphere

Website for **Oddsphere**, the audiovisual project of Mitchell Troyer: electronic music, realtime visuals, and GLSL art.

Live at [oddsphere.net](https://oddsphere.net).

## Built with

- [Astro](https://astro.build): static site generator (components, content collections, image optimization)
- Plain CSS: a single stylesheet with a type scale, spacing scale, and automatic dark mode
- [Cloudflare Pages](https://pages.cloudflare.com): hosting; every push to `main` rebuilds and deploys the site
- Bandcamp and Instagram embeds for music and social

## Running locally

Requires [Node.js](https://nodejs.org) (LTS).

```sh
npm install      # install dependencies (first time only)
npm run dev      # start the dev server at http://localhost:4321
npm run build    # build the production site into ./dist
npm run preview  # preview the production build locally
```

## Project structure

```text
/
├── public/                     # Served as-is, never processed
│   ├── assets/img/             # Logo and other static images
│   └── styles.css              # Site stylesheet
├── src/
│   ├── assets/img/             # Images that are imported (so they get compressed)
│   ├── components/
│   │   ├── Head.astro          # <head> contents; each page passes its <title> in
│   │   ├── Header.astro        # Logo and site navigation
│   │   ├── Footer.astro        # Social links and copyright
│   │   ├── Gallery.astro       # Grid wrapper; holds anything placed inside it
│   │   ├── ArtworkCard.astro   # One artwork: image (optimized) and caption
│   │   └── BandcampPlayer.astro # Bandcamp embed (parked)
│   ├── content/
│   │   └── gallery/            # One Markdown file per gallery piece
│   ├── content.config.ts       # Collection definitions: the fields every piece must have
│   └── pages/                  # Each file becomes a page
│       ├── index.astro         # /
│       ├── audio.astro         # /audio
│       ├── graphics.astro      # /graphics
│       └── about.astro         # /about
├── astro.config.mjs
└── package.json
```

### `public/` vs `src/assets/`

- **`public/`**: files are copied untouched and referenced by URL (e.g. `/assets/img/logo.svg`).
- **`src/assets/`**: images are **imported** and rendered with Astro's `<Image />`, which compresses them, converts them to WebP, and adds width, height and lazy loading.

## Gallery collection

Each piece is a Markdown file in `src/content/gallery/`. The file name becomes its address (`test-piece.md` → `/graphics/test-piece`, once piece pages exist). The collection is named `gallery`; the section's URL is `/graphics`.

```md
---
title: Test Piece
date: 2026-10-09
kind: image          # image | video | interactive
tags: [glsl, feedback]
madeIn: TouchDesigner  # optional
draft: false         # true hides the piece
---
Description of the piece.
```

If a required field is missing, the build stops and names the file and field.

**Still to add:** per-kind fields (images, video, shader), based on the earlier site's structure.

## Media plan

| Media | Where |
|---|---|
| Gallery images | Cloudflare R2, compressed by hand before upload (about 2000px on the long edge) |
| Video | TBD (Bunny Stream was used before) |
| GLSL pieces | `.frag` files in the repo, run live on the piece page; covers in the grid |
| Paid music | Bandcamp embeds |
| Free music | Direct download links |

## Roadmap

**Done**
- [x] Move hand-written HTML/CSS into Astro
- [x] Head, Header, Footer, Gallery grid and ArtworkCard components
- [x] Image compression with `<Image />`
- [x] Deployed on Cloudflare Pages
- [x] Gallery collection with shared fields (title, date, kind, tags, madeIn, draft)

**Foundation**
- [ ] Connect `oddsphere.net` to Cloudflare Pages
- [ ] Shared `BaseLayout`
- [ ] Convert About and Audio pages to components
- [ ] Nav marks the current page (`aria-current`)

**Gallery**
- [ ] Confirm the collection reads files (missing-field error test)
- [ ] Piece pages: `src/pages/graphics/[slug].astro`
- [ ] Graphics page lists pieces from the collection, newest first
- [ ] Per-kind fields: image, video, interactive
- [ ] Images on R2
- [ ] Tag pages (`/graphics/tag/<tag>`)
- [ ] Type tabs (Img / Vid / Live)
- [ ] Video pieces (host to decide)
- [ ] Interactive GLSL pieces (runner to decide: own / library / embed)

**Audio**
- [ ] Releases collection
- [ ] Audio page: release grid
- [ ] Release pages: Bandcamp embed (paid) or download links (free)

**Other pages**
- [ ] Home: newest pieces plus featured release and log
- [ ] Log collection, page and posts
- [ ] About collection
- [ ] 404

**Later**
- [ ] Posting workflow / CMS
- [ ] Search: global overlay, ported from the earlier site's TypeScript search (after the gallery and log collections exist); Pagefind as a fallback
- [ ] RSS
- [ ] Share images (Open Graph)
- [ ] Print shop

**Dropped:** tracks table, persistent audio player.