# Oddsphere
 
Website for **Oddsphere**, the audiovisual project of Mitchell Troyer: electronic music, realtime visuals, and GLSL art.
 
Live at [oddsphere.net](https://oddsphere.net).
 
## Built with
 
- [Astro](https://astro.build): static site generator (components, layouts, image optimization)
- Plain CSS: a single stylesheet with a type scale, spacing scale, and automatic dark mode
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
├── public/                 # Served as-is, never processed
│   ├── assets/img/         # Logo and other static images
│   └── styles.css          # Site stylesheet
├── src/
│   ├── assets/img/         # Gallery images (imported, so they get compressed)
│   ├── components/
│   │   ├── Head.astro          # <head> contents; each page passes its <title> in
│   │   ├── Header.astro        # Logo and site navigation
│   │   ├── Footer.astro        # Social links and copyright
│   │   ├── Gallery.astro       # Grid wrapper; holds anything placed inside it
│   │   ├── ArtworkCard.astro   # One artwork: image (optimized) and caption
│   │   └── BandcampPlayer.astro # Bandcamp embed (in progress)
│   └── pages/              # Each file becomes a page
│       ├── index.astro     # /
│       ├── audio.astro     # /audio/
│       ├── graphics.astro  # /graphics/
│       └── about.astro     # /about/
├── astro.config.mjs
└── package.json
```
 
### `public/` vs `src/assets/`
 
- **`public/`**: files are copied untouched and referenced by URL (e.g. `/assets/img/logo.svg`).
- **`src/assets/`**: images are **imported** and rendered with Astro's `<Image />`, which compresses them, converts them to WebP, and adds width, height and lazy loading.
## Adding an artwork (current workflow)
 
1. Put the image in `src/assets/img/` (lowercase file name, e.g. `my-piece.png`).
2. Import it at the top of `src/pages/graphics.astro`:
```js
   import myPiece from '../assets/img/my-piece.png';
```
3. Add a card inside `<Gallery>`:
```astro
   <ArtworkCard src={myPiece} alt="Describe what's in the image" caption="Title" />
```
 
This will be replaced by a content collection, so new pieces won't need code changes.
 
## Roadmap
 
- [x] Move hand-written HTML/CSS into Astro
- [x] Header, Footer, and Head components
- [x] Gallery grid and ArtworkCard with image optimization
- [ ] Content collection for artworks (one file per piece)
- [ ] Individual page for each artwork
- [ ] Shared layout for all pages
- [ ] Pages CMS for posting from the browser
- [ ] Gallery images hosted on Cloudflare R2
- [ ] Deploy to Cloudflare Pages
