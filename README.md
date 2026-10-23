# Oddsphere

Website for **Oddsphere**, the audiovisual project of Mitchell Troyer: electronic music, realtime visuals, and GLSL art.

Live at [oddsphere.net](https://oddsphere.net).

## Built with

- [Astro](https://astro.build): static site generator (components, content collections, image optimization)
- Plain CSS: a single stylesheet with a type scale, spacing scale, and automatic dark mode
- [Cloudflare Pages](https://pages.cloudflare.com): hosting; every push to `main` rebuilds and deploys the site
- Cloudflare R2 for images and audio; Bandcamp links for buying music

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
│   │   ├── Header.astro        # Logo, site navigation and the mobile menu button
│   │   ├── Footer.astro        # Social links and copyright
│   │   ├── Grid.astro          # Grid wrapper; holds anything placed inside it
│   │   ├── ArtworkCard.astro   # One artwork: image (optimized) and caption
│   │   └── BandcampPlayer.astro # Bandcamp embed (parked)
│   ├── content/                # One Markdown file per item
│   │   ├── releases/           # Albums, EPs, singles
│   │   ├── tracks/             # One file per track (points at its release)
│   │   ├── graphics/           # Image, video and interactive pieces
│   │   ├── log/                # Blog posts
│   │   └── about/              # About page text and photo
│   ├── content.config.ts       # Collection definitions: the fields every item must have
│   ├── lib/                    # Small helpers (tag cleanup, duration formatting, audio queries)
│   └── pages/                  # Each file becomes a page
│       ├── index.astro         # /
│       ├── audio/              # /audio (release grid), /audio/tracks (track table), /audio/<release>
│       ├── graphics.astro      # /graphics
│       └── about.astro         # /about
├── astro.config.mjs
└── package.json
```

### `public/` vs `src/assets/`

- **`public/`**: files are copied untouched and referenced by URL (e.g. `/assets/img/logo.svg`).
- **`src/assets/`**: images are **imported** and rendered with Astro's `<Image />`, which compresses them, converts them to WebP, and adds width, height and lazy loading.

## Content

All content is Markdown files in `src/content/`, committed to git. There is no CMS: add or edit a file and push. If a required field is missing or wrong, the build stops and names the file and field. Files with `draft: true` are hidden from the site.

**Tags** are shared by every collection and cleaned up automatically (`Drum & Bass` becomes `drum-and-bass`), so search and tag pages treat them as one list.

### Releases and tracks

`src/content/releases/<name>.md` is an album, EP or single. `src/content/tracks/<name>.md` is one track and points at its release by file name.

```md
---
# releases/example-release.md
title: Example Release
type: single              # album | ep | single
date: 2026-01-01
cover: { url: https://graphics.oddsphere.net/cover.jpg, width: 1500, height: 1500, alt: Cover art }
genres: [Electronica]
tags: []
bandcamp: https://oddsphere.bandcamp.com/...   # optional buy link
featured: false
draft: false
---
```

```md
---
# tracks/example-track.md
title: Example Track
release: example-release  # file name of the release, without .md
trackNumber: 1
genre: Electronica
bpm: 120
key: F# minor             # optional
duration: "3:05"          # m:ss, in quotes
audio: https://audio.oddsphere.net/example-track.mp3
tags: []
draft: false
---
```

### Graphics

The file name becomes the address (`test-piece.md` becomes `/graphics/test-piece`). Each `kind` needs its own fields:

| kind | needs |
|---|---|
| `image` | `images`: a list of `{ url, width, height, alt, pixelated }` |
| `video` | `video`: `bunnyId` (Bunny Stream) or `mp4`, optional `poster` |
| `interactive` | `shader`: path to the `.frag` file in the repo |

Every piece also needs a `cover` for the grid unless it has an image or a video poster. Common fields: `title`, `date`, `kind`, `tags`, `madeIn` (optional), `draft`.

### Log and About

Log posts: `title`, `date`, `description` (optional), `cover` (optional), `tags`, `draft`. The About page is `src/content/about/about.md` (`title`, optional `photo`).

## Media plan

| Media | Where |
|---|---|
| Graphics images | Cloudflare R2 at `https://graphics.oddsphere.net/<file key>`, compressed by hand before upload (about 2000px long edge, WebP/JPEG ~80-85, PNG for pixel art, sRGB) |
| Audio | Cloudflare R2 (`audio.oddsphere.net` once set up). Played by the site's own player; Bandcamp is only the buy link |
| Video | Bunny Stream: pieces store the Bunny video ID; shown with Bunny's embed player or a plain `<video>` tag (per piece) |
| GLSL pieces | `.frag` files in the repo, run live on the piece page (Shadertoy syntax); covers in the grid |

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
- [x] Content model: releases, tracks, graphics (per-kind fields), log, about; shared tags
- [x] Drafts hidden on piece pages
- [x] Mobile menu (Menu button under 48rem; nav stays open without JavaScript)
- [x] Audio pages: release grid, release pages, Beatport-style track table

**Foundation**
- [ ] Shared `BaseLayout`
- [ ] Convert About and Audio pages to components

**Graphics**
- [ ] Show the piece's image on its page
- [ ] Thumbnails: decide two exports / Cloudflare transformations / full images
- [ ] Graphics page lists pieces from the collection, newest first
- [ ] Tag pages (`/graphics/tag/<tag>`)
- [ ] Type tabs (Img / Vid / Live)
- [ ] Bunny Stream setup: check for the old library; MP4 fallback on before uploading; note the pull zone address
- [ ] Video pieces: Bunny embed (longer, with sound) or plain `<video>` (silent loops)
- [ ] Interactive GLSL pieces: WebGL2 runner for Shadertoy-style `mainImage` (`iTime`, `iResolution`, `iMouse`)

**Audio**
- [ ] On-site player (SoundCloud-style layout and controls) that keeps playing across pages (Astro page transitions with `transition:persist`)
- [ ] R2 audio bucket and domain

**Other pages**
- [ ] Home: newest pieces plus featured release and log
- [ ] Log page and posts
- [ ] About page reads from the About collection
- [ ] 404

**Later**
- [ ] Global fuzzy search over every collection, including BPM, genre and tags (ported from the earlier site's TypeScript search, or written fresh); Pagefind as a fallback
  - Aliases (`dnb` = `drum-and-bass`, `glsl` = `shader`) from a lookup table in `src/lib/aliases.ts`, applied to tags, genres and queries
  - Terms combine with AND (`dnb 174` = drum and bass at 174 BPM); numbers and `170-175` ranges match BPM; each word is fuzzy-matched separately
  - Optional field operators (`genre:`, `tag:`, `bpm:`) and filter chips; results grouped by kind
- [ ] Posting workflow (Markdown in git, media to R2/Bunny; an editor UI only if hand-editing becomes a chore)
- [ ] RSS
- [ ] Share images (Open Graph)

**Dropped:** print shop. (The tracks table, persistent player and self-hosted audio were dropped earlier and are back in.)