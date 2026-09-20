# For Aly ♡

A tiny, interactive monthsary scrapbook built with **React + Vite + Framer Motion**.
Click through it — it opens like a real little booklet.

## Run it

```bash
npm install
npm run dev
```

Build for sharing/hosting:

```bash
npm run build      # outputs to dist/
npm run preview    # preview the build locally
```

## Make it yours — everything is editable

All text lives in **`src/config/content.js`**:

| What | Where in the file |
| --- | --- |
| Intro lines | `intro` |
| Book cover text | `cover` |
| The love letter | `letter` (salutation, paragraphs, signature) |
| Photo captions & files | `photos` (each entry is `{ src, caption, rot }`) |
| Memory section title | `memoriesTitle` |
| The wishes | `wishes` (a simple list of strings) |
| Navigation hints | `nav` |
| Final screen | `ending` |
| Background music | `music` |

### Photos
Put your own photos in **`public/photos/`** and point `photos[i].src` at them,
e.g. `'/photos/my-couple-photo.jpg'`. The SVGs already there are just placeholders.
Polaroid styling (tape, rotation, captions) is handled automatically, and each photo
keeps its own caption + tilt from the config.

### Music (optional)
Drop a soft song as **`public/music/melody.mp3`** (see the file there). It fades in
after the booklet is opened — never autoplays. Set `music.src` to `''` to disable.

## Structure

```
src/
  config/content.js        ← all editable text & photos
  components/
    Intro.jsx              ← cinematic zoom-in intro
    Scrapbook.jsx          ← the 3D book (opening / closing / camera pans)
    Cover.jsx              ← closed booklet cover (title, ribbon, hint)
    LoveLetter.jsx         ← left page, typewriter letter
    Memories.jsx           ← right page · polaroid collage
    Wishes.jsx             ← right page · handwritten wishes
    Ending.jsx             ← final message screen
    Particles.jsx          ← floating hearts / sparkles / petals
    Doodles.jsx            ← tiny hand-drawn decorations
    MusicToggle.jsx        ← corner music control
  hooks/
    useSong.js             ← quiet background-music manager
    useViewport.js         ← responsive camera zoom
```

## Flow

`Intro → Booklet → Book opens → Love letter → turn page → Photos + Wishes → book closes → HAPPY 3RD MONTHSARY`

No scrolling — everything is click-driven, one page at a time.