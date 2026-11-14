# Shushy's Fit · شوشي فِت — working notes for Claude

Single-file workout app (`index.html`) for Shayma. These notes let a new session continue without re-explaining.

## How to talk to her
- Reply **only in Lebanese Arabic, feminine, short**. She has complained several times when replies came in English. Tool-call descriptions may be English.
- She is not a developer: no jargon, say what changed and what she should do next.
- Never ask her to paste a secret in chat. Never spend money without her explicit OK; after any spend, say what it cost and what is left.
- She cares most about **correct technique**, especially **foot/leg position**, and about image quality.

## Where things live
- Repo `shaymasamad99-dotcom/shayma`, work on branch `claude/tamrini-goals`, open a PR to `main` and merge it (standing approval). GitHub Pages serves `main`.
- Artifact (private to her): https://claude.ai/artifact/AJse5SnMixna5CzRcHssYU — publish `index.html` there with the changed media in `files`. Before overwriting an already-published media path, `read` that path first or the publish is refused.
- iOS wrapper: copy `index.html` to `native/ios/App/App/public/index.html` and media to `native/ios/App/App/public/{a,v}/` in the same commit.

## Media model in `index.html`
- `EX` main exercises, `EX2` extra exercises, `MOVES` (`MOVE(...)`) warm-ups and stretches. `anyEx(id)` finds any of them.
- `ART` maps exercise id → image key; images are `a/<key>-1.webp` and `a/<key>-2.webp` (two frames that swap). **Still exercises use the same image for both frames.** `ART3` lists keys with a third frame.
- `CVID` is the Set of ids that have a cartoon video: `v/c-<id>.mp4` + poster `v/c-<id>.jpg`. `CVA` maps an id to another id's video (e.g. `s-catcow` → `w-catcow`).
- Videos and drawings are hidden for gender `"m"` (`cvidOf`/`artOf` return null).
- Arabic text is feminine; `MASC` maps feminine words to masculine. When adding Arabic imperatives, add any missing word to `MASC`.
- Exercises tab = `renderLib()`: muscle strip (`.mstrip`) + two-column cards (`.xgrid`, `libCard`).

## The character
Cartoon girl: brown hair in a high bun, pink sports bra, purple leggings, white sneakers with pink details, purple mat, plain light blue background. She draws the images herself with an image tool from prompts in:
- `shushy-prompts.txt` — 26 exercises still needing a video (two images each: start and end).
- `shushy-prompts-2.txt` — 27 more exercises needing a video.
- `shushy-still-prompts.txt` — 29 image-only exercises (**all done**).
Known pending: `m-preacher` needs a corrected pair (same machine in both images). `rev-wrist` has no video (optional).

## Getting her images
- Zip uploads land in `/root/.claude/uploads/<session>/`. Extract into a new empty folder and read with `python3 -I`.
- Attached images land in the session `images/` folder. Images pasted while a turn is running may not be saved as files: recover them from the session transcript (`/root/.claude/projects/-home-user-shayma/<session>.jsonl`, base64 `image` blocks) instead of asking her to resend.
- Grids (several poses in one picture) are fine for stills if each panel is ≥ ~480 px; too small for video.

## Still image recipe (free)
Flatten the background to one colour, shift the figure up so it is vertically centred, resize to 480×480, save as WebP q≈86 to `a/<key>-1.webp` and `-2.webp`, make sure `ART[id]` points to `<key>`.

## Video recipe
1. **Check the pair before generating**: feet, mat and equipment must be in the same place in both images (compare pixel regions). If the exercise already has a video, tell her instead of making another. If the pair does not match, fix by shifting when the offset is small, otherwise ask for a corrected image (or with Kling use one image only).
2. Generate:
   - **Free — Hugging Face** Space `multimodalart/wan-2-2-first-last-frame` via `gradio_client`:
     `Client(space).predict(handle_file(start), handle_file(end), prompt, negative, 2.1, 8, 1.0, 1.0, 42, False, api_name="/generate_video")` → 480×480, 16 fps, ~2 s. Needs both images. Her token is a network secret on this environment (the proxy injects it for the Space host) — never put a token in code. The free quota is a few runs per day; on a quota error tell her and continue the next day. Small movements read better from a tighter crop.
   - **Paid — Replicate Kling 2.5 Turbo Pro**: `POST https://api.replicate.com/v1/models/kwaivgi/kling-v2.5-turbo-pro/predictions` with header `Authorization: Bearer x` (proxy injects the real key), input `{start_image (JPEG data URI, 1024 px), end_image (optional), duration: 5, prompt, negative_prompt}`. About $0.35 per video; credit left is about $0.15, so ask before using it. One generation per exercise; server-side failures are not charged.
   - Prompts: name the exact technique, say what stays still ("feet stay planted", "static camera"), and list the wrong variants in the negative prompt.
3. Inspect frames (contact sheet + zoom on feet/hands). Keep only the clean, correct rep.
4. Loop with ffmpeg: trim the rep, `split` → `reverse` → `concat`, optional `tpad` hold at the top, 24 fps. Kling output → 720×720 crf 22; Hugging Face output → keep 480. Poster JPG at 480.
5. Add the id to `CVID`, test, commit, PR, merge, publish, send her the video.

## Testing
Playwright is pre-installed. Open `file:///home/user/shayma/index.html`, then in `page.evaluate`: `authUser = {uid:'x', email:'a'}; authReady = true; sheet = {id, ctx:'lib'}; renderSheet();` and check the `<video>`/`<img>` sources and that there are no page errors.

## Batching (her usage limit runs out fast)
Process everything she sends in one go: one commit, one PR, one artifact publish and one short Arabic summary per batch, not per exercise.
