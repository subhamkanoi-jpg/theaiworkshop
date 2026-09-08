# Teaser ad — production pack

**For:** the 27 September 2026 workshop, *Build a Complete AI Video Ad From Scratch*.
**What this is:** the TOW master prompt system, run end to end on our own workshop, producing one 20-second vertical UGC ad.

Two jobs at once. It is the promo we can actually run on Instagram, and it is the worked example a host can hold up on the big screen and say *this is the thing you are about to do*.

Nothing here needs a tool this repo has access to. Paste each block into the tool named above it. Every stage hands exactly one output to the next — if you find yourself carrying two scripts forward, you have already left the system.

---

## Stage 0 — Brand brief

| Field | Value |
|---|---|
| Brand | The AI Workshop |
| Where | theaiworkshop.in · Instagram @theaiworkshop.in |
| One-line pitch | We help people who run their own business make their own video ads, so they stop paying per reel and stop waiting on an agency. |
| Selling | A ₹799 offline workshop, three hours, 50 seats, Salt Lake, Kolkata |
| Who for | 25–45, D2C founders, agency owners, freelancers, local business owners in Kolkata. Already tried AI video. Already deleted most of it. |
| Frustration | Their AI renders come back plastic, warped, or with a different face in every shot, and they cannot tell why |
| What they want | An ad they are not embarrassed to run, made without a shoot |
| Action | Reserve a seat at theaiworkshop.in |
| Trust | 60+ people in the room in June 2026; tables of eight; a captain per table |
| Must include | The room is offline. The price. The date. |
| Must avoid | Any claim about how the ad will perform. No "10x your revenue". No certificates. |

---

## Stage 1 — Foundation (the short version)

- **Emotional state:** quietly embarrassed. They believed the demos, spent an evening, got sludge.
- **Core problem:** they are giving the model an idea and expecting a production plan back.
- **Desired outcome:** one finished ad, and knowing why it worked.
- **Main promise:** you walk out at 2:00 PM with the rendered file.
- **Belief to shift:** *"AI video just looks fake"* → *"my prompt was nine words long."*
- **Angle:** **The nine-word prompt.** Not a tools tour, not a hype reel — a diagnosis they can feel, delivered by someone who has made the same mistake.
- **What this ad must not try to do:** teach the system. It only has to make one person recognise their own failed render.

---

## Stage 2 — Format decision

**UGC direct-to-camera.** The offer is a room full of people; the ad should be one person talking to one person. Cinematic B-roll would look more expensive and convert worse — it would put a gloss on a product whose entire pitch is *no gloss, just output*.

---

## Stage A1 — Final script

One script. Roughly 20 seconds. Hook lands inside two seconds.

> **Hook:** Your AI videos look fake because your prompt was nine words long.
>
> **Problem:** "Make a video of a man making coffee." That is an idea. The model has to guess the rest — his face, the light, how many shots. So it guesses, every time, differently.
>
> **Shift:** A real prompt is a production plan. Lock the face first. Approve the still. Then add motion.
>
> **Proof:** Three hours, Salt Lake, fifty seats. You walk out with the finished ad on your laptop.
>
> **CTA:** Twenty-seventh of September. Link in bio.

---

## Stage A2 — Face lock

**Tool:** Nano Banana Pro (or any image model). Generate **one** image. Not a sheet, not a grid, not four outfits.

### Face-lock block — reuse verbatim in every later prompt

> Indian woman, early thirties, warm medium-brown skin with neutral-olive undertone, visible natural texture and open pores across the cheeks and nose, a small mole below the left cheekbone, faint under-eye shadow. Dark brown almost-black hair, shoulder length, centre-parted, slightly frizzy at the crown with visible flyaways and baby hairs. Naturally thick unshaped eyebrows, dark brown eyes with natural moisture, no eyeliner, bare lips with real lip texture. Slight facial asymmetry — left eye marginally lower. Plain rust-brown cotton t-shirt, unbranded, softly wrinkled at the shoulder. No jewellery except one thin gold stud in each ear. Relaxed, unposed, mid-conversation energy.

### Single headshot image prompt — paste this to generate the anchor

> A single realistic photograph of one person only. [PASTE FACE-LOCK BLOCK]. Shoulders-up framing, looking naturally toward the camera, head very slightly turned. Plain warm off-white interior wall behind her, softly out of focus, no furniture, no posters, no text. Soft indoor daylight from a window at camera left, gentle falloff across the right cheek. Shot like a front-camera photo on a modern phone, natural lens, no beauty filter. Identity reference image, continuity-safe. Vertical 9:16.
>
> [PASTE SKIN ENHANCER PROMPT]
>
> **Negative:** collage, contact sheet, grid, multiple panels, multiple people, multiple poses, full body, text, watermark, logo, props, product, studio backdrop, plastic skin, airbrushed, waxy, beauty filter, over-smoothed, CGI, artificial symmetry.

### Skin enhancer prompt — append to every image prompt in this pack

> Hyperrealistic photographic detail. Real human skin with visible natural texture, pores, micro shadows, faint peach fuzz, subtle fine lines, slight tonal variation, and authentic under-eye detail. Preserve natural skin irregularities such as tiny blemishes, soft pigmentation, realistic lip texture, and delicate facial contours. No plastic skin, no airbrushing, no over-smoothing, no waxy finish, no fake beauty-filter effect. True-to-life anatomy and facial structure with consistent features, realistic eyes with natural moisture and depth, detailed eyelashes, believable eyebrows, and naturally textured lips. Hair should show individual strands, baby hairs, flyaways, and realistic density without looking helmet-like. Lighting should behave naturally on skin with soft falloff, realistic highlights, subtle subsurface scattering, and accurate reflection behavior. Maintain true camera realism with depth, optical softness where appropriate, natural contrast, and lifelike tonal roll-off. Avoid CGI look, avoid overly sharpened edges, avoid artificial symmetry, avoid sterile studio perfection.

**Save as:** `Face_Lock_Master.png`. Do not continue until the face is right. Everything downstream inherits it.

---

## Stage A3 — Scene breakdown

| # | Spoken line | Visual | Shot | Mood |
|---|---|---|---|---|
| 01 | "Your AI videos look fake because your prompt was nine words long." | She turns to camera, mid-thought, phone held at arm's length | Handheld selfie, chest-up | Direct, slightly amused |
| 02 | "'Make a video of a man making coffee.' That is an idea." | Same room, she glances down at the laptop screen beside her, unimpressed | Handheld, wider, laptop edge in frame | Deadpan |
| 03 | "The model has to guess the rest. So it guesses, differently, every time." | Over-shoulder onto the laptop showing a grid of near-identical but subtly wrong frames | Over-shoulder, screen not legible | Quietly damning |
| 04 | "A real prompt is a production plan. Lock the face. Approve the still. Then add motion." | Back to camera, counting three beats on her fingers | Handheld selfie, chest-up | Clear, instructive |
| 05 | "Three hours, Salt Lake, fifty seats. Twenty-seventh of September." | She smiles slightly, small shrug, lowers the phone | Handheld selfie, chest-up, slight push-in | Warm, unsalesy |

---

## Stage A4 — Base image prompts

Generate **one still per scene**, approve it, and only then move to motion. Each prompt stands alone — the tool remembers nothing between generations, so the face-lock block is repeated every single time.

**Scene 01**
> [PASTE FACE-LOCK BLOCK] She is holding a phone at arm's length in a small warm home office, turning her face toward the lens as if she has just thought of something. Chest-up framing, phone-front-camera perspective, slight low angle. Plain warm off-white wall, soft daylight from camera left, a hint of a wooden desk edge at the bottom of frame. Natural handheld feel, minor motion blur at the frame edge. Vertical 9:16. [PASTE SKIN ENHANCER PROMPT]
> **Negative:** second person, cameraman, text overlay, watermark, logo, distorted hands, extra fingers, plastic skin, studio lighting, empty staring expression.

**Scene 02**
> [PASTE FACE-LOCK BLOCK] Same room, same outfit, same light. She glances down and to her right at an open laptop on the desk beside her, eyebrows slightly raised, unimpressed. Slightly wider framing, the top edge of the laptop screen visible but its content not readable. Vertical 9:16. [PASTE SKIN ENHANCER PROMPT]
> **Negative:** readable screen text, legible UI, second person, watermark, distorted hands, extra fingers, outfit change, different room, plastic skin.

**Scene 03**
> Over-the-shoulder shot from behind and slightly above [PASTE FACE-LOCK BLOCK], her head and shoulder soft in the left foreground. An open laptop screen fills the right of frame showing a blurred grid of six similar video thumbnails, deliberately out of focus so no text or face is legible. Same warm home office, same daylight from camera left. Vertical 9:16. [PASTE SKIN ENHANCER PROMPT]
> **Negative:** readable text, legible faces on screen, warped screen edges, second person, watermark, extra fingers, different room.

**Scene 04**
> [PASTE FACE-LOCK BLOCK] Facing the camera again, phone at arm's length, holding up three fingers of her right hand clearly and correctly at chest height, mid-sentence. Chest-up framing, same warm home office, same daylight from camera left. Hand anatomy correct and unambiguous. Vertical 9:16. [PASTE SKIN ENHANCER PROMPT]
> **Negative:** extra fingers, fused fingers, six fingers, malformed hand, blurred hand, second person, text overlay, watermark, outfit change, plastic skin.

**Scene 05**
> [PASTE FACE-LOCK BLOCK] Facing camera, a small genuine closed-mouth smile and a slight shrug, beginning to lower the phone. Chest-up framing, marginally closer than scene 01. Same warm home office, same daylight from camera left. Vertical 9:16. [PASTE SKIN ENHANCER PROMPT]
> **Negative:** wide grin, teeth-forward stock-photo smile, second person, text overlay, watermark, distorted hands, outfit change, plastic skin.

**Save as:** `Scene_01_Hook_BaseImage.png` … `Scene_05_CTA_BaseImage.png`

**Do not proceed on a bad still.** Check the face matches, hands are correct, background is clean, no invented text. Turning a broken still into video does not fix it — it animates it.

---

## Stage A5 — Video prompts

**Tool:** Google Flow / Veo 3.1 (or Kling, Seedance). Upload the approved still for that scene, then paste its prompt. Describe **movement only** — the picture already exists.

**Scene 01** — 3s. Camera: handheld, near-static, faint natural sway. Subject: she completes the turn toward the lens and begins speaking, small natural head movement, one blink. Continuity: identity, outfit, room, and lighting unchanged. Negative motion: no cuts, no zoom, no walking, no new objects entering frame, no outfit change.

**Scene 02** — 3s. Camera: handheld, faint sway, holds position. Subject: her eyes flick down toward the laptop and back up, one small eyebrow raise. Continuity: identity, outfit, room, lighting unchanged. Negative motion: no camera pan to the laptop, no screen content change, no cuts.

**Scene 03** — 4s. Camera: very slow handheld drift to the right, no more than a few degrees. Subject: minimal — a small shoulder shift. Environment: the laptop screen stays out of focus and does not change content. Continuity: identity, outfit, room, lighting unchanged. Negative motion: no rack focus onto the screen, no readable text appearing, no cuts.

**Scene 04** — 4s. Camera: handheld, near-static. Subject: she speaks and holds three fingers up steadily; fingers stay correctly formed and separated throughout. Continuity: identity, outfit, room, lighting unchanged. Negative motion: no finger count change, no morphing hand, no hand leaving frame, no cuts.

**Scene 05** — 4s. Camera: very slow handheld push-in. Subject: the small smile completes, one shrug, she begins lowering the phone as the clip ends. Continuity: identity, outfit, room, lighting unchanged. Negative motion: no cuts, no wave, no big grin, no walking away.

**Save as:** `Scene_01_Hook_Video.mp4` … `Scene_05_CTA_Video.mp4`

---

## Stage A6 — Voiceover

**Tool:** ElevenLabs (AlphaV3). **Generate the first two lines only**, listen, and only then run the whole thing.

- **Voice direction:** Indian English, female, early thirties, warm and conversational. Speaking to one person, not to an audience.
- **Pacing:** brisk on the hook, a beat of space before the shift, unhurried on the CTA.
- **Emotion:** amused recognition, not a lecture. She has made this mistake herself.

> [confident, slightly amused] Your AI videos look fake because your prompt was nine words long. [pause]
> [flat, quoting] "Make a video of a man making coffee." [beat] That is an idea.
> [matter-of-fact] The model has to guess the rest. So it guesses. Differently. Every time. [pause]
> [clear, slower] A real prompt is a production plan. Lock the face. Approve the still. Then add motion. [pause]
> [warm, unhurried] Three hours, Salt Lake, fifty seats. Twenty-seventh of September.

**Better option if you have five minutes:** record these lines yourself on a phone — three takes, natural, faster, softer — and run the best one through **ElevenLabs Voice Changer**. Pick the take with the best rhythm, not the cleanest audio. Human beats clean.

**Save as:** `VO_Final_ElevenLabs.mp3`

---

## Stage 6 — QC

Run this before exporting. The model cannot see the nightmare hand; you can.

- [ ] Same face in all five clips — check the mole, the eyebrows, the hairline
- [ ] Hands correct in scene 04 — count the fingers, then count them again
- [ ] No invented text anywhere in frame; no warped logo
- [ ] Outfit and room identical across scenes
- [ ] Light direction consistent — window stays camera left in every shot
- [ ] No second person, no reflection of a cameraman
- [ ] Voice does not sound robotic; pauses land where the meaning breaks
- [ ] Reads correctly muted, with captions on — most people will see it that way
- [ ] Claims match the site: price, date, seat count, offline. **No performance promise.**

Fix only what fails. Do not restart the workflow unless the concept itself is broken.

---

## Stage 7 — Packaging

```
01_Script/          Script_Final.md
03_Face_Lock/       Face_Lock_Master.png
04_Base_Images/     Scene_01_Hook_BaseImage.png … Scene_05_CTA_BaseImage.png
06_Video_Clips/     Scene_01_Hook_Video.mp4 … Scene_05_CTA_Video.mp4
07_Voiceover/       VO_Final_ElevenLabs.mp3
09_Editing_Project/ teaser_v1.capcut
10_Final_Exports/   TOW_Teaser_27Sept_9x16.mp4
```

Stitch in CapCut, Premiere, or DaVinci. Burn in captions — the hook has to land silently. End card: the date, the price, `theaiworkshop.in`.

Archive `Face_Lock_Master.png` and the face-lock block. The next ad for this brand starts from them rather than from a blank chat window, which is the entire point of the system.
