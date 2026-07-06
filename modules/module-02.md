# Module 2 — One-Shot Power

**Status:** UNLOCKED / active (opened by Dad, 2026-07-06)
**Role:** Eli is Creative Director. Claude is the studio's engineering team.

## Theme

Last module Eli became a **Creative Director**. This module he learns to
**direct an AI engineering team**. The skill he's really learning isn't
JavaScript or HTML — it's **how to communicate with an AI engineer** clearly
enough that it builds exactly what he means. That's a different, more durable
skill than any language.

> *"Last week you did the thing most people skip — you decided what you're
> making. Studios call that pre-production. Today we do something that still
> feels like science fiction: we build your first playable game."*

## Purpose

Take Eli's *Thornwood Manor* design and get a **real, playable Version 0.1** of
it running in the browser — fast. The lesson lives in *how* we get there: scope
it down, write a tiny spec, fire one shot, then judge the result like a
director. The "whoa — it built my game" moment is the hook; the thinking around
it is the point.

## What You'll Learn

- The real skill isn't code — it's **communicating with an AI engineer.**
- **MVP thinking:** the smallest version that's still fun beats a big plan.
- Studios build **versions** (0.1, 0.2, …), not whole games at once.
- A precise **spec** gets a better build than "make my game."
- **Software can be simple** — three files, no frameworks.
- You're still the Director: even the AI's own work gets reviewed and improved.

## Rules for Claude Code in This Module

- **Build from Eli's design docs**, not your own imagination. Re-read the
  `design/` harness first.
- **Force the scope down.** Ask the MVP question — *"if we only had two hours,
  what's the smallest version that's still fun?"* — and hold the line. Version
  0.1 is one room, not the whole mansion.
- **Write a spec together before building.** Short, concrete, Eli's call. Teach
  that "build my game" is a wish; a spec is an instruction. Example shape:

  ```
  Goal:
  - Player starts in one room.
  - There is one locked door.
  - There is one puzzle (a "notice what's off" moment).
  - There is one key/clue.
  - Solving the puzzle opens the door → you win.
  ```

- **Then one-shot it.** Ask "ready to watch something cool?" and generate the
  whole thing — `index.html`, `style.css`, `script.js` in `game/` — playable
  immediately. Beginner-readable, commented.
- **Reframe after:** *"Don't celebrate yet 😄 — you built Version 0.1, not the
  whole game. Pros are already thinking about 0.2."*
- **Run an AI Review of your own build** — rate the *experience*, not the code
  (e.g. ⭐⭐⭐⭐☆, "puzzle works · needs feedback when you're wrong · no music
  yet"). Model how a director judges a game. This list becomes Module 3's
  starting point.
- **Show the hood:** open `game/` and point out it's just three files — no
  React, no npm, no webpack. Software can be simple.
- **One iteration only** as a taste: make a single change (e.g., a darker
  background), run it, show the difference, ask "better?" Then stop — real
  directing is Module 3, don't steal its thunder.
- Keep everything true to the four pillars. Update `MEMORY.md`, `logs/`, and
  `ACHIEVEMENTS.md` when done.

## Mission Flow

1. **Read the blueprint** — Claude re-reads the design so the build is *Eli's*.
2. **MVP thinking** — "If we only had two hours, what's the smallest version
   that's still fun?" Scope down to Version 0.1.
3. **Write the spec** — one room, one locked door, one puzzle, one key.
4. **One shot** — Claude builds the whole playable Version 0.1 into `game/`.
5. **Play it** in the browser.
6. **"Don't celebrate yet"** — that's Version 0.1. Studios build *versions*.
7. **AI Review** — Claude rates its own build: what works, what's missing.
8. **Peek under the hood** — just three files, no frameworks. Software is simple.
9. **One change** — make a single tweak, watch it update. A taste of directing.
10. **Trophies** — **One-Shot Power**, and **First Playable** the moment it runs.

## Done When

- A **playable Version 0.1** exists in `game/` and opens in a browser.
- Eli has scoped it with the MVP question and written a tiny spec himself.
- Claude has reviewed its own build, and Eli has seen one change land.
- **One-Shot Power** and **First Playable** are unlocked; `MEMORY.md` updated.
- Eli has felt it: *AI can build my game — and I can direct how.*
