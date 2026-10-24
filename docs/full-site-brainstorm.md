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

## Decisions

**Structure and links**
- Home: the current one-page design is the draft for the new home page.
  - The Graphics card links to `/graphics`.
  - Release cards go straight to their own release page. No Bandcamp and Soundcloud pop-up on the card, on desktop or phone; those links live on the release page.
  - Instagram: a fourth capsule in the social row, plus a link on the Graphics page.
  - The Graphics card shows a small strip of thumbnails of the newest pieces.
- Pages: Home, Audio (release grid, release pages, tracks table), Graphics, Log, About.
- Search is in the plan: aliases (dnb for drum and bass) and combined tags.
- Log: occasional posts. About: one page.

**Look**
- Lime for music (Audio), orange for graphics (Graphics), purple for Log and About.
- Dotted background on the home page only.
- No background pattern on inner pages: a plain white or black page.

**Audio player**
- Back in scope, and it keeps playing across pages.
- Full tracks, all three releases (Neuromancer included), stream only with no downloads.
- A release plays through its tracks in order, and the player remembers its place after a reload.

## Player plan (draft)

- **Keep playing across pages:** Astro's view transitions with the player marked `transition:persist`, so the audio element is never destroyed on navigation.
- **Files:** Cloudflare R2, the same way as the graphics (for example `audio.oddsphere.net`), mp3 for streaming.
- **UI:** a docked capsule at the bottom (play circle, title, rounded progress bar, previous/next), expanding on tap. Media Session API so phone lock screens and headphones can control it.
- **Where play buttons start it:** a play circle on a release page or a track row.
- **Open:** you said Neuromancer can play, so I'm assuming you have the right to stream it from your own site.

## Still to design

- Navigation (capsule row; "Menu" capsule on phones).
- The Audio page, release page and tracks table.
- The Graphics grid and its thumbnail strip on the home page.
- Search results and the player dock.
- Where the purple accent sits on Log and About.
