# ★ Bonus Mission — Paint Your World

**Status:** BONUS, OPENED by Dad (2026-07-08) · Outside the numbered 13 ·
**Playable now.**
**Role:** Eli is Creative Director **and Art Director**. Claude wears the
**Concept Artist** hat — it teaches image-prompting and *generates* to Eli's
direction; it never picks the art for him.

**Version target:** the game climbs from **0.5 → 0.6** — Eli's first **real art
files**, made by AI he directed.

## Purpose

Until now, the game's whole look was painted in **code** — CSS shapes and inline
SVG (Modules 6 and 7). That's powerful, but it's not how most real games are made.
Real studios use **art assets**: image files, made by artists, that live in the
project and get loaded into the game.

In this bonus mission **Eli becomes that artist.** He learns that he can generate
his own high-value 2D art with AI, that prompting for *pictures* is its own skill
(different from prompting for words or code), and that a real game project has a
**place where art lives** (`game/assets/`). He directs, picks the best of 4 every
time, and crafts **four real assets** into his game.

## The tool (read first)

Image generation runs through the **Canva** connector (MCP). Claude Code has no
built-in image generator — Canva is the path. The pipeline:

1. `generate-design` — Eli's prompt → **4 design candidates** (always 4).
2. Eli chooses one (or rejects all and re-prompts).
3. `create-design-from-candidate` → a real design.
4. `export-design` (PNG — supports custom size and **transparent background** for
   objects/sprites).
5. Save the PNG into **`game/assets/`** and wire it into the game.

**Prerequisite:** the Canva connector must be enabled in this session. If it isn't
available, tell Eli (and Dad) it needs turning on before the hands-on part — don't
fake it. A demo asset already exists at `game/assets/foyer-bg.png` (a painted foyer
background) so the concept can be shown even before he generates his own.

## The Brain-First Rule (this mission lives on it)

**Eli directs; the AI paints.** Two hard rules:

- **Never write his prompt for him.** Coach the *formula* (below), let *him* write
  the prompt, then sharpen it together — naming what made it stronger.
- **Never pick the asset for him.** Every generation returns **4** options —
  **always show Eli all 4** and let *him* choose the one that's most his game (or
  reject all four and re-prompt). Choosing is the director's job, now for art.

## The image-prompt formula (teach step by step)

Prompting for a picture is not like asking for code. Teach these six parts, one at
a time, on Eli's *own* game:

1. **Subject** — exactly what it is ("a tall brass grandfather clock").
2. **Style** — painterly / illustrated / realistic / line-art. **Match the game's
   look** so every asset feels like one world: *painterly, cinematic, a touch eerie.*
3. **Composition & framing** — a full scene, or a single object? Camera angle?
   Centered? ("a single object, centered, side-on").
4. **Palette & mood** — the game's colours: **gold + mahogany brown + deep
   crimson**, "warm but slightly wrong."
5. **Lighting** — "warm firelight" / "cold moonlight" — light is half the feeling.
6. **Say what to LEAVE OUT** — AI loves to add text and clutter: end with **"no
   text, no words, no letters, no people."** For objects, add **"isolated on a
   plain/transparent background"** so it drops cleanly into the scene.

A good prompt is Subject + Style + Composition + Palette/Mood + Lighting +
Constraints — in Eli's own words.

## Craft FOUR assets for the game

Eli chooses four things to make. Guide, don't decide — but a strong spread is one
of each (so he learns backgrounds, characters, and objects):

- **A background** — e.g. the Grand Foyer (the biggest visual jump).
- **A character/portrait** — e.g. the murdered host, or the killer.
- **An object** — e.g. the grandfather clock, the pocket-watch, or the brass key.
- **A next-room teaser** — something from his Module 8 library design (the statue,
  the candlelit room) — ties the art to the story he's already built.

For **each** asset: Eli art-directs → generate **4** candidates → **he** picks one
→ save to `game/assets/` → wire it into the game.

## Rules for Claude Code in This Module

- Confirm the **Canva connector** is available first (see "The tool"). If not, stop
  the hands-on part and tell Dad it needs enabling.
- **Brain-first, always** — coach the formula, let Eli write the prompt; show all
  **4** candidates, let Eli choose. Never write or pick for him.
- Keep every asset in the game's established look (gold/mahogany/crimson, painterly,
  warm-but-eerie) so the four feel like one world.
- Save chosen assets into `game/assets/` with clear names (e.g. `foyer-bg.png`,
  `host-portrait.png`, `grandfather-clock.png`). Wire them into `game/index.html`
  / `game/style.css` (`background-image`, or an `<img>`/CSS layer behind the
  clickable hotspots).
- **Keep the game playable.** If a background sits behind the clickable objects,
  make sure the hotspots still line up and the puzzle still solves — verify it.
- **Bump the version to 0.6** in `MEMORY.md`'s `## Game Version`; tick the
  `## Bonus Steps`; add a Session-Memory + `logs/session-log.md` entry in Eli's
  voice; unlock **Concept Artist**.

## Mission Flow

1. **Meet the Concept Artist** — your game's art can be real image files now.
2. **See where art lives** — the new `game/assets/` folder.
3. **Learn the image-prompt formula** — subject · style · composition · palette ·
   lighting · "no text." (step by step)
4. **Study a real one** — the demo `foyer-bg.png`: what prompt made it, what you'd
   change.
5. **Asset #1** — *Eli* writes the prompt; generate **4**; he picks the best.
6. **Assets #2, #3, #4** — art-direct, generate 4, choose. (background · character
   · object · next-room — his call.)
7. **Wire them in** — drop all four into `game/assets/` and into the game.
8. **Version bump → 0.6.** Achievement unlock: **Concept Artist**.

## Done When

- Eli learned the image-prompt formula and wrote his **own** prompts.
- For each asset he saw **4** candidates and **chose himself**.
- **Four real assets** live in `game/assets/` and are wired into the game.
- The game still plays; the version is **0.6**; **Concept Artist** is unlocked.
