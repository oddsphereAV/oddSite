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
│   │   ├── Grid.astro          # Grid wrapper; holds anything placed inside it
│   │   ├── ArtworkCard.astro   # One artwork: image (optimized) and caption
│   │   └── BandcampPlayer.astro # Bandcamp embed (parked)
│   ├── content/
│   │   └── graphics/           # One Markdown file per graphics piece
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

## Graphics collection

Each piece is a Markdown file in `src/content/graphics/`. The file name becomes its address (`test-piece.md` → `/graphics/test-piece`).

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
| Graphics images | Cloudflare R2 at `https://graphics.oddsphere.net/<file key>`, compressed by hand before upload (about 2000px long edge, WebP/JPEG ~80–85, PNG for pixel art, sRGB) |
| Video | Bunny Stream: pieces store the Bunny video ID; shown with Bunny's embed player or a plain `<video>` tag (per piece) |
| GLSL pieces | `.frag` files in the repo, run live on the piece page; covers in the grid |
| Music (paid and free) | Bandcamp. Free releases are "name your price"; the site embeds Bandcamp's player and never hosts audio. |

## Roadmap

**Done**
- [x] Move hand-written HTML/CSS into Astro
- [x] Head, Header, Footer, Gallery grid and ArtworkCard components
- [x] Image compression with `<Image />`
- [x] Deployed on Cloudflare Pages
- [x] Graphics collection with shared fields (title, date, kind, tags, madeIn, draft)
- [x] Piece pages: `src/pages/graphics/[slug].astro`
- [x] `oddsphere.net` connected to Cloudflare Pages
- [x] R2 bucket live at `graphics.oddsphere.net`; ArtworkCard shows R2 images
- [x] Nav marks the current page (`aria-current`)
- [x] Grid component (renamed from Gallery); square cropped thumbnails

**Foundation**
- [ ] Shared `BaseLayout`
- [ ] Convert About and Audio pages to components

**Graphics**
- [ ] Hide drafts (`.filter` in `getStaticPaths`)
- [ ] `images` field in the config (url, width, height, alt, pixelated)
- [ ] Show the piece's image on its page
- [ ] Thumbnails: decide two exports / Cloudflare transformations / full images
- [ ] Graphics page lists pieces from the collection, newest first
- [ ] Per-kind fields: image, video, interactive
- [ ] Tag pages (`/graphics/tag/<tag>`)
- [ ] Type tabs (Img / Vid / Live)
- [ ] Bunny Stream setup: check for the old library; MP4 fallback on before uploading; note the pull zone address
- [ ] Video pieces: Bunny embed (longer, with sound) or plain `<video>` (silent loops)
- [ ] Interactive GLSL pieces (runner to decide: own / library / embed)

**Audio**
- [ ] Releases collection: title, type, date, styles, cover, Bandcamp ID and link, featured, draft
- [ ] Audio page: release grid
- [ ] Release pages: cover, details and the Bandcamp embed (play and buy)

**Other pages**
- [ ] Home: newest pieces plus featured release and log
- [ ] Log collection, page and posts
- [ ] About collection
- [ ] 404

**Later**
- [ ] Posting workflow / CMS
- [ ] Search: global overlay, ported from the earlier site's TypeScript search (after the graphics and log collections exist); Pagefind as a fallback
- [ ] RSS
- [ ] Share images (Open Graph)

**Dropped:** tracks table, persistent audio player, self-hosted audio and downloads, print shop.