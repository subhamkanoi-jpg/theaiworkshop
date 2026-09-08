# Teaser — 27 September workshop

A 20-second vertical (1080×1920) promo built with [HyperFrames](https://hyperframes.heygen.com),
which renders video from HTML. The whole composition is `index.html`: DOM declares
timing with `data-*` attributes and one paused GSAP timeline drives the motion.

`tow-teaser-9x16.mp4` is the rendered output — H.264, 30 fps, 20.0s, 2.2 MB.

## What it says

Four beats, in the site's palette: the nine-word prompt most people write →
"that is an idea, not a production plan" → the five stages of the run →
the ticket.

It is motion graphics, not a generated UGC ad. It makes no claim about how any
ad will perform, and the facts on the end card come from `workshop.json`.
**If the date, price or seat count changes there, change it here too** — this
composition does not read that file.

## Re-render

Needs Node 22+ and FFmpeg on PATH.

```bash
cd video/teaser
npx hyperframes check                     # lint, runtime, layout, motion, contrast
npx hyperframes preview --background      # Studio timeline for edits
npx hyperframes render --quality high --output tow-teaser-9x16.mp4
```

GSAP is vendored in `vendor/` rather than loaded from a CDN, so the render
browser needs no outbound network.

## Editing

Text lives in the four `.clip` scenes. Timing rules worth knowing before you
move anything:

- Scenes must not overlap in time. Two full-bleed scenes alive at once stack
  their text and `check` fails on content overlap.
- Never tween `autoAlpha` on a `.clip` element — the framework owns clip
  visibility. Fade the inner `#sN-in` wrapper instead.
- Every exit tween needs a matching `tl.set(..., { autoAlpha: 0 }, <boundary>)`
  so a seek landing past the fade cannot leave stale state.

`npx hyperframes check` enforces all three.
