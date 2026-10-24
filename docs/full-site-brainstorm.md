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

## Decisions so far

1. **Home:** the current one-page design is the draft for the new home page, with refinements.
   - The Graphics card links to `/graphics` instead of Instagram.
   - Release cards link to their own release pages.

2. **Colour:** a colour per section. Lime for music (Audio) and orange for graphics (Graphics). Log and About still need a colour, or stay neutral (black and white).

3. **Background:** the dotted background is for the home page only, as a test. Inner pages get something calmer, to be tried (candidates from the earlier shader round: the stepped terrain, capsules, or a plain page).

4. **Audio player:** back in scope. It plays on the site and keeps playing as you move between pages.

### Player plan (draft)

- **Keep playing across pages:** Astro's view transitions with the player marked `transition:persist`, so the audio element is never destroyed on navigation.
- **Files:** Cloudflare R2, the same way as the graphics (for example `audio.oddsphere.net`), mp3 for streaming.
- **UI:** a docked capsule at the bottom (play circle, title, rounded progress bar, previous/next), expanding on tap. Media Session API so phone lock screens and headphones can control it.
- **Where play buttons start it:** the play circle on a release card, a track row, or a release page.
- **Rights check:** Neuromancer is released by Soundz Organic Collective, so confirm it can be streamed from here before adding it.

## Home page refinements to work out

- **Instagram:** moves to the social row (as a fourth capsule) and to the Graphics page.
- **Release card click:** the card goes to `/audio/<release>`. Bandcamp and Soundcloud stay as the two buttons that appear on hover or tap. On phones the tray needs a third, clear way into the release page.
- **Graphics card:** could show a tiny strip of the newest pieces so it previews what's inside.

## Open questions

1. ~~Is the home page still the front door?~~ Yes, see decisions.
2. ~~Colour per section or one accent?~~ Per section: lime for music, orange for graphics. What do Log and About get?
3. ~~Dotwave on every page?~~ Home only, to be tested. What do the inner pages get?
4. ~~Is the audio player back in scope?~~ Yes. See the plan above.
5. What belongs on Log and About now, given how much you want to maintain?
