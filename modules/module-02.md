# Module 2 — One-Shot Power

**Status:** UNLOCKED (opened by Dad, 2026-07-06)
**Role:** Eli is Creative Director. Claude is the studio's build team.

## Purpose

Eli has a real design — *One Night at Thornwood Manor*. Now he feels what AI
can actually do. Instead of building the game in a hundred small steps, we turn
his **whole Module 1 design into ONE carefully-built prompt**, fire it once, and
watch Claude build a real, **playable first version** of his game in a single
shot. One big instruction. One working prototype. That "whoa, it built my game"
moment is the whole point.

This is the counterweight to Module 1: Module 1 proved AI helps you *think*;
Module 2 proves AI can *build*, fast.

## What You'll Learn

- AI can build a working thing astonishingly fast.
- A great prompt is a **precise instruction**, not a vague wish.
- Your design docs are the **raw material** — Module 1 pays off right here.
- A rough, playable prototype beats a perfect plan on paper.
- Constraints and examples make prompts stronger.
- You're still the **Director** — you judge what's good, boring, or wrong.

## Rules for Claude Code in This Module

- **Build from Eli's design docs**, not from your own imagination. Re-read
  `design/vision.md`, `design/game-pillars.md`, `design/story-world.md`,
  `design/player-experience.md`, and `design/mechanics.md` first.
- **It is ONE shot.** Resist the urge to iterate endlessly. The goal is the
  single "it built my game!" hit. Real refinement is Module 3 (Director Mode) —
  don't steal its thunder.
- **Teach the prompt.** Before firing, show Eli the anatomy of a strong
  one-shot prompt (goal · must-haves · constraints · style · "playable in a
  browser") and co-write it *with* him. The prompt is the lesson.
- Build the game into the **`game/`** folder as `index.html`, `style.css`,
  `script.js`. No frameworks, no build tools. Keep it beginner-readable with
  comments.
- Keep it faithful to the pillars: *Notice What's Off · Curiosity Rewarded /
  Cleverness Earned · A Duel With the Culprit · A Cozy House That Hides
  Everything.* A first version might be one room with a "notice what's off"
  puzzle and a door that opens — small, but real and playable.
- After the build: explain what you made in plain language, let Eli **play it**,
  and ask what feels cool / boring / confusing (that list feeds Module 3).
- Update `MEMORY.md`, `logs/session-log.md`, and `ACHIEVEMENTS.md` when done.

## Mission Flow

1. **Read the blueprint** — Claude re-reads the design harness so the prompt is
   built from *Eli's* decisions, not invented.
2. **Anatomy of a one-shot prompt** — Claude teaches the parts of a great build
   prompt: the goal, the must-haves, the constraints, the style, and "make it
   playable in a browser."
3. **Co-write THE prompt** — together, turn *Thornwood Manor* into one big,
   specific build instruction.
4. **Fire it — one shot** — Claude builds a playable first version into
   `game/`.
5. **Play it** — Eli opens the game in the browser. It won't be perfect. Good.
6. **React like a Director** — what feels cool, boring, or confusing? Claude
   writes the list into `design/future-ideas.md` for Module 3.
7. **Achievement unlock** — **One-Shot Power**, and **First Playable** the
   moment the game runs.

## Done When

- A **playable first version** of the game exists in `game/` and opens in a
  browser.
- Eli has played it and given his director's reaction.
- **One-Shot Power** and **First Playable** achievements are unlocked, and
  `MEMORY.md` is updated.
- Eli has felt it: *AI can build my game.*
