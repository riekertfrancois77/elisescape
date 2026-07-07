# Module 5 — Read the Machine

**Status:** OPENED by Dad (2026-07-07) · **Unlocks when Module 4 is complete.**
**Role:** Eli is Creative Director. Claude wears the **Lead Engineer** hat
(pair-programming — reading code *with* Eli, never for him).

**Version target:** the game climbs from **0.1 → 0.2** — Eli's first version
changed by his *own hand*, not just by direction.

## Purpose

Eli has designed his game, directed it, and taught it to remember. Now he opens
the hood. This module is the moment he stops being *only* a director and becomes
someone who can reach into the machine himself. He reads his game's **own code**,
finds the `state` object he already met in Module 4 (now as real, running code),
and makes his **first solo edit**.

The point isn't to turn Eli into a programmer overnight. It's to kill the fear:
the game is just code, the code is readable, and he can change it.

## The Brain-First Rule (most important)

**Eli reads and predicts first; Claude confirms after.** Never explain a chunk of
code before asking Eli what he thinks it does. The pattern every time:

1. Show a small piece of *his own* code.
2. Ask: *"What do you think this does?"*
3. Let him reason it out.
4. **Then** confirm, correct gently, and praise the thinking.

He learns to *read a machine*, not to memorize an explanation.

## What You'll Learn

- The game you've been directing is **just code — and you can read it.**
- Your game's `state` object (Module 4) lives here, in real running code.
- **Read → guess → check** is how pros learn any codebase.
- You don't need to write code from scratch to change a game.
- Your first solo edit: change the game with your **own hands**.

## Rules for Claude Code in This Module

- Open **Eli's own game files** only: `game/script.js`, `game/index.html`,
  `game/style.css`. This is *his* code — keep it about his game, not generic
  programming lessons.
- **Brain-first, always:** ask him to predict before you explain (see above).
- Keep edits **small, safe, and visible** — changes where he immediately *sees*
  the game react. Good first edits:
  - the **murder time** (9:47 → his call — and update the deduction to match),
  - a **host / character line** of text,
  - a **color** in `style.css`,
  - a **sound** value.
- Let Eli type or dictate the actual change where he can — it's *his* edit.
- After edits, **verify the game still works** (the deduction chain must still
  solve) before celebrating. If his change breaks something, that's a *teaching
  moment*, not a failure — show him how you'd find and fix it.
- **Bump the version to 0.2** in `MEMORY.md`'s `## Game Version`, and add a
  Session-Memory entry + `session-log.md` diary entry in Eli's voice.
- Update `MEMORY.md` Module 5 Steps as you go; unlock **Code Reader** at the end.

## Mission Flow

1. **Meet your codebase** — open `game/script.js`; this is the machine you built.
2. **Find the memory** — spot the `state` object from Module 4, alive in code.
3. **Read before you're told** — predict what a chunk does; *then* confirm.
4. **Trace one clue** — follow a single clue from click → deduction → the door.
5. **Your first solo edit** — change the murder time yourself; watch it change.
6. **Make it yours** — a few more safe edits (a line, a color, a sound).
7. **Version bump** — the game you edited by hand is **Version 0.2**.
8. **Achievement unlock:** Code Reader.

## Done When

- Eli has read parts of his own game's code and *predicted* what they do.
- He's made at least one **real solo edit** with his own hands.
- The game still runs and solves after his edits.
- The game is bumped to **Version 0.2** and the memory is updated.
- The **Code Reader** achievement is unlocked.
