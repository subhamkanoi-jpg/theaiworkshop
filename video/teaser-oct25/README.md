# Teaser — 25 October workshop

A 19-second vertical (1080×1920) promo for *Build Your First AI Automation*, built with
[HyperFrames](https://hyperframes.heygen.com), which renders video from HTML. The sibling
of `video/teaser/` (27 September): same palette, grain and ivory end card.

Renders live in `public/cinema/teaser-oct25-9x16.{webm,mp4}` and `teaser-oct25-poster.jpg`.
They are for WhatsApp, Instagram and LinkedIn; nothing on the site plays them yet.

## What it says

1. **The enquiry** (0–4s): a message arrives at 9:12 PM — "You reply on Thursday."
2. **The run log** (4–10.4s): lead captured → AI reply within the hour → follow-ups that
   stop when Riya replies.
3. **The bot** (10.4–14.6s): a Telegram bot answers a price, hands an unknown question over.
4. **The card** (14.6–19s): date, time, seats, lead, price, domain.

It keeps the site's promises: replies "within the hour", a Telegram bot, no sales claims.

## Structure

`index.html` is the host: shared styles, the embedded Fraunces (`assets/fonts/`, OFL) and
vendored GSAP. Each scene is a sub-composition in `compositions/frames/` with its own
paused timeline starting at 0. `BRIEF.md` and `STORYBOARD.md` record the intent and the
motion each scene cites.

**The end card is typed, not read from `workshop.json`.** `tests/test_config_sync.py`
pins it while `data-workshop` on the card matches the live slug. If the date, price,
seats or lead change, edit `compositions/frames/04-card.html` and re-render.

## Re-render

Needs Node 22+ and FFmpeg on PATH.

```bash
cd video/teaser-oct25
npm run check                          # lint, runtime, layout, motion, contrast
npx hyperframes preview --background   # Studio timeline for edits
npx hyperframes render --quality high --output ../../public/cinema/teaser-oct25-9x16.mp4

cd ../..
ffmpeg -y -i public/cinema/teaser-oct25-9x16.mp4 -c copy -movflags +faststart tmp.mp4 \
  && mv tmp.mp4 public/cinema/teaser-oct25-9x16.mp4
ffmpeg -y -i public/cinema/teaser-oct25-9x16.mp4 -c:v libvpx-vp9 -b:v 0 -crf 34 \
  -row-mt 1 -cpu-used 5 -an public/cinema/teaser-oct25-9x16.webm
ffmpeg -y -ss 9.6 -i public/cinema/teaser-oct25-9x16.mp4 -frames:v 1 -q:v 3 \
  public/cinema/teaser-oct25-poster.jpg
```
