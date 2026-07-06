# MEMORY.md — The Studio Brain

This file is the shared memory of Eli AI Game Studio. Claude Code reads it at
the start of every session and updates it at the end of every session. The
dashboard reads the sections below to display progress.

## Project State

- **Creative Director:** Eli
- **Current module:** **Module 3 — Direct the Team (now UNLOCKED)**. Module 2
  (From Vision to Prototype) is **COMPLETE** — Eli built and directed a playable
  Version 0.1 of the game. **Module 4 (Build a Second Brain)** stays locked until
  Module 3 is complete (they unlock in order; Dad opened through Module 4).
  Module 1 is complete.
- **Game concept:** ***One Night at Thornwood Manor*** — a famous detective is
  trapped one night in a cozy, secret-filled early-1900s mansion during a house
  party where a murder has happened. A killer who leaves clues on purpose hides
  among the guests. The detective wins by noticing what's "off," room by room,
  deducing who the culprit is, and cornering them before dawn.
- **Studio status:** First game designed. Foundation locked. Director earned
  his title.

## Progress Tracker

<!-- The dashboard counts the [x] boxes below. Claude Code: check a box only
     when a module is fully complete. -->

- [x] Module 1 — Think Like a Game Studio
- [x] Module 2 — From Vision to Prototype
- [ ] Module 3 — Direct the Team
- [ ] Module 4 — Build a Second Brain
- [ ] Module 5 — Read the Machine
- [ ] Module 6 — Speak AI Fluently
- [ ] Module 7 — Design Great Games
- [ ] Module 8 — Build Features
- [ ] Module 9 — Hunt Bugs
- [ ] Module 10 — Create Worlds
- [ ] Module 11 — Cross Into the Real World
- [ ] Module 12 — Supercharge Your Studio
- [ ] Module 13 — Ship Like a Pro

## Module 1 Steps

<!-- Claude Code: check these off as Eli completes each step of Module 1. -->

- [x] 1. Welcome to the Studio
- [x] 2. What should players feel?
- [x] 3. Map the emotional curve
- [x] 4. Who does the player become?
- [x] 5. What kind of world is this?
- [x] 6. What problem or challenge drives the game?
- [x] 7. The game's 3–5 pillars
- [x] 8. References that inspire the game
- [x] 9. Three possible game directions generated
- [x] 10. Eli chooses / rejects / combines directions
- [x] 11. Studio team review
- [x] 12. Design harness files written
- [x] 13. Achievement unlocked: Creative Director

## Module 2 Steps

<!-- Claude Code: check these off as Eli completes each step of Module 2. -->

- [x] 1. Meet your Lead Engineer (Claude changes hats)
- [x] 2. MVP thinking — the ONE room that proves the game
- [x] 3. Write a tiny spec (one room, one door, one puzzle, one key)
- [x] 4. Make your estimate — how long will this take?
- [x] 5. One shot — Claude builds Version 0.1 into game/
- [x] 6. Play it — and remember your estimate
- [x] 7. Reframe: that's Version 0.1 (how much is actually done?)
- [x] 8. Studio Review — the team rates it through different lenses
- [x] 9. Under the hood — just 3 files, no frameworks
- [x] 10. Make one change (a taste of directing)
- [x] 11. Achievements unlocked: One-Shot Power + First Playable

## Module 3 Steps

<!-- Unlocks when Module 2 is complete. -->

- [ ] 1. Play the game and make a change list
- [ ] 2. Pick the top 3 changes
- [ ] 3. Direct one change (Claude offers versions)
- [ ] 4. Choose the version that feels most like your game
- [ ] 5. See it land, play again, react
- [ ] 6. Repeat for the top changes
- [ ] 7. Achievement unlocked: Director Mode

## Module 4 Steps

<!-- Unlocks when Module 3 is complete. -->

- [ ] 1. Open MEMORY.md and the logs
- [ ] 2. Learn what each memory file is for
- [ ] 3. Summarize your game in your own words
- [ ] 4. Write it into the memory with Claude
- [ ] 5. Test it across a fresh session
- [ ] 6. Achievement unlocked: Memory Keeper

## Session Memory

<!-- The dashboard shows these bullets in the "Session Memory" panel.
     Claude Code: add a bullet per session, newest first. Keep them short. -->

- 🐛 **Eli found a real bug (Bug Hunter unlocked):** he noticed the dashboard
  wrongly showed Module 2 incomplete and Module 3 locked, and reported it —
  *noticing what's off*, the exact skill his game is built on. Root cause: the
  dashboard's embedded `file://` fallback state in `script.js` was stale; fixed
  to mirror real progress.
- 🎬 **Eli directed his FIRST change (a taste of Module 3):** he combined three
  directions at once — *hide the clock harder, make the puzzle tougher, and add
  sound* — and the engineer rebuilt it. The clock now lurks dimmed in a shadowy
  corner; the game no longer lights the door for you; and the room ticks, murmurs,
  chimes on a clue, and clicks on the unlock (all made in code, no sound files).
- 🎮 **FIRST PLAYABLE — the game runs!** *Version 0.1 — "Arrival at Thornwood
  Manor"* is live in `game/`: the glowing foyer, the murder, the stopped clock
  ("notice what's off"), and a brass time-lock door. Eli played it and cracked
  the case. Trophies earned: **One-Shot Power** + **First Playable**.
- ⚡ **The estimate lesson landed:** Eli guessed the build would take *"a few
  hours"* — it took under a minute. AI changed the math of software; *deciding
  what to build* is now the hard, human, Director's part.
- 🎯 **MVP decision:** Eli chose to build **the arrival / first-60-seconds** as
  Version 0.1 (the hook), shaped into a fair one-room "notice the stopped clock"
  puzzle. One room, one locked way forward, one clue.
- 🔓 **Dad unlocked Module 2 — From Vision to Prototype.** Time to turn the
  Thornwood Manor design into a real, playable game with a single prompt.
- 🎭 **Story deepened:** victim = the corrupt, powerful **party host**; killer
  is a **believer** who hunts corrupt men (thinks he's the hero); detective &
  killer are **old rivals** — chased for years, never caught, always one step
  ahead. Tonight the killer is finally trapped in the same house.
- 🎬 **FIRST BIG DECISION MADE:** the game is **"One Night at Thornwood
  Manor"** — a detective trapped one night in a cozy 1900s mansion with a
  clue-leaving killer, solving room-by-room until they corner the culprit.
- **Core feelings:** curious while playing, clever when advancing (Sherlock).
- **Pillars locked:** Notice What's Off · Curiosity Rewarded/Cleverness Earned
  · A Duel With the Culprit · A Cozy House That Hides Everything.
- **The ride:** explore → get stuck → notice the missing detail → AHA → a
  secret opens. Late-game "nearly quit" is saved by a clue from the very start.
- Next: Studio team review (Step 11), then write the full design harness.

## Claude Instructions

<!-- The dashboard shows this section in the "Claude Instructions" panel.
     Claude Code: rewrite it after each session so Eli always knows his
     exact next move. -->

🎉 **MODULE 2 COMPLETE, Director — your game is REAL.** You built *Version 0.1*
of *Thornwood Manor*, played it, and directed your first change. Three trophies
lit up: **One-Shot Power**, **First Playable**, and a *secret* one you'll spot
on the dashboard. Refresh to claim them.

🔓 **UP NEXT: MODULE 3 — DIRECT THE TEAM (now unlocked).** In Module 2 you got a
*taste* of directing (that one change). Module 3 is the real thing: you play
your game, make a list of everything you'd change, then **direct change after
change** — the engineer offers you versions, and you pick the one that feels
most like *your* game. This is where the game starts becoming truly yours.

When you're ready, open Claude Code in this folder and say:

> **"Start Module 3 — I'm ready to direct."**

*(Module 4 — Build a Second Brain stays locked until Module 3 is complete.)*

## Achievements Unlocked

- 🏆 **Creative Director** (2026-07-06) — Completed Module 1; the studio is his.
- 🏆 **Memory Created** (2026-07-06) — The full design harness is written.
- 🏆 **Studio Review Complete** (2026-07-06) — Survived the team review sharper.
- 🏆 **First Big Decision** (2026-07-06) — Eli chose game Direction A.
- 🏆 **Game Pillars Chosen** (2026-07-06) — Eli locked the game's 4 pillars.
- 🏆 **One-Shot Power** (2026-07-06) — Turned the whole design into one build and
  watched Claude create a playable Version 0.1.
- 🏆 **First Playable** (2026-07-06) — *Thornwood Manor* ran in a browser for the
  very first time; Eli cracked the case and opened the door.
- 🕵️ **AI Tamer** (secret, 2026-07-06) — Eli directed the AI to build his vision
  *his* way: he combined three changes at once and the engineer delivered.
- 🐛 **Bug Hunter** (secret, 2026-07-06) — Eli noticed the dashboard was wrong
  (Module 2 not marked done, Module 3 still locked) and reported it — noticing
  what's off in real software, the very skill his game is built on.

## Latest Build Review

<!-- Claude writes this in Module 2+ after building a version. The dashboard's
     AI Review panel reads it. The studio team reviews through DIFFERENT LENSES.
     Format (one bullet per role: Role · stars · note):
       **Version 0.1**
       - Creative Director · ⭐⭐⭐⭐☆ · Feels close to the vision.
       - Player Experience · ⭐⭐⭐☆☆ · The first puzzle is confusing.
       - Lead Engineer · ⭐⭐⭐⭐☆ · Technically solid.
       - QA · ⭐⭐⭐☆☆ · Found two bugs.
       - Producer · ⭐⭐⭐⭐☆ · Excellent progress for Version 0.1.
     Use ⭐ for filled stars and ☆ for empty. -->

**Version 0.1 — "Arrival at Thornwood Manor" (2026-07-06)**
- Creative Director (Eli) · ⭐⭐⭐⭐☆ · The arrival hook is real, and the stopped clock feels like *his* game.
- Player Experience · ⭐⭐⭐☆☆ · The mood lands; a first-timer may not realize the clock is *clickable* — needs a nudge later.
- Lead Engineer · ⭐⭐⭐⭐☆ · Clean state, no bugs, three files, fully playtested end-to-end.
- QA · ⭐⭐⭐⭐☆ · Puzzle is fair — the door won't open until you've noticed the clue. Accepts messy input ("947", "9:47"). No crashes.
- Art Director · ⭐⭐⭐☆☆ · Warm-and-shadowed tone is right; still emoji + gradients, not real art (that's Module 10).
- Producer · ⭐⭐⭐⭐⭐ · A playable first slice, built and tested in one session. Excellent progress for Version 0.1.

## Eli's Estimate vs Reality

<!-- Module 2: before building, Claude asks Eli how long HE thinks the build
     will take, and logs his guess here. After the ~1-minute build, they compare.
     A quiet lesson in how AI changes the math of software. -->

**Eli's estimate (2026-07-06):** *"A few hours."* A smart, sensible guess — the
old math of software.

**The reality:** the one-shot build took **under a minute.** The lesson landed:
AI changed the math. Building got cheap; **deciding what to build** is now the
expensive, human part — which is exactly the Director's job. The hard part is
the part only Eli can do.
