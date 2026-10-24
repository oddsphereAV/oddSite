# Full site brainstorm

The one-page home on `main` is the visual language. This branch explores a multi-page site with the earlier structure, built from the same parts.

## The language we already have

- Capsules: thick black outline, inner ring, hard offset shadow, only curves.
- Tag pills (Single, Graphics, Contact) that label a block from inside it.
- Lime for releases and music, orange for graphics, black for contact.
- Belamor type, slanted text only, boxes never skewed.
- Dotwave background, light and dark by system setting.
- Motion: pop-in on load, springy hover, pressed state, lime focus ring, reduced-motion respected.

## Pages carried over from the earlier site

| Page | What it is | How it looks here |
|---|---|---|
| Home | Today's one-page link hub | Stays as is; becomes the front door |
| Audio | Release grid, release pages, tracks table | Release grid as staggered lime capsules with cover discs; release page = big capsule header + track rows |
| Graphics | Image, video and live GLSL pieces, tags, tabs | Grid of rounded frames with outline and shadow; Img / Vid / Live as tag pills that act as tabs |
| Log | Posts | Rows of pills: date tag, title, read arrow |
| About | Bio, photo, contact | A few stacked cards, same tag-in-card pattern |

## Parts that need real design

- **Navigation:** a capsule row (Audio, Graphics, Log, About) with the logo disc on the left. On phones it collapses into one "Menu" capsule that opens a stack of capsules.
- **Search:** one capsule input with chips for combined tags (dnb + 174 bpm). Results as capsule rows.
- **Audio player:** a docked capsule at the bottom with a big play circle, title, progress as a rounded bar. Persists across pages.
- **Tracks table:** each track is a capsule row; BPM, key and duration are small pills at the right instead of table columns.
- **Graphics grid:** thick-outlined rounded tiles; hover squashes and shows the title tag; filters are pills.
- **Footer:** the copyright line plus the three social capsules.

## Open questions

1. Is the home page still the front door, or does each section get its own landing page?
2. Colour per section (lime = Audio, orange = Graphics, something for Log and About), or one accent throughout?
3. Does the dotwave background stay on every page, or does each section get its own?
4. Is the audio player back in scope, or does Bandcamp stay the player?
5. What belongs on Log and About now, given how much you want to maintain?
