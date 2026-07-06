# Decisions Made

> Final, locked decisions only — the Creative Director's record. Each entry:
> date, the decision, one-line reason. If a decision is later changed, don't
> delete it; add the new decision and mark the old one superseded.

---

| Date | Decision | Why |
|---|---|---|
| 2026-07-06 | Eli is Creative Director. All creative decisions are his. | Founding rule of the studio. |
| 2026-07-06 | No game theme, genre, setting, story, or mechanics until Eli decides them in Module 1. | The game must come from Eli's head, not the AI's. |
| 2026-07-06 | Four game pillars locked: (1) Notice What's Off, (2) Curiosity Rewarded/Cleverness Earned, (3) A Duel With the Culprit, (4) A Cozy House That Hides Everything. | The core of the game; every future decision is tested against these. |
| 2026-07-06 | **FIRST BIG DECISION:** Game direction = **A, "One Night at Thornwood Manor"** — a single trapped night, room-by-room deduction puzzles, following the hidden killer's trail to a final confrontation. | Eli chose it; it squeezes every pillar and gives the tightest, tensest ride. |
| 2026-07-06 | **Version 0.1 = the Arrival (Grand Foyer).** MVP is the first-60-seconds hook, built as one room with one "notice what's off" puzzle: the great clock stopped at 9:47 → the clue → a brass time-lock door opens. | Eli chose the hook; it's the part that decides if a player keeps going, and it plants a first clue like the real game's setup/payoff design. |
| 2026-07-06 | **Tech stack for the game = plain HTML/CSS/JS, three files in `game/`, no frameworks.** | Matches the studio's "software can be simple" philosophy and Eli's learning path; needs no backend or build step. |
| 2026-07-06 | **First directed change (Eli):** hide the clock harder (dimmed, shadowy corner), make the puzzle tougher (no auto-lit door), and add code-made sound (ticking, murmur, chime, unlock click + mute). | Eli's directing call; deepens Pillar 1 (Notice What's Off) and the warm-but-tense art tone. |
| 2026-07-06 | **Module 3, Change #2 — the deduction chain (Eli chose Version C, the hardest):** the clock is no longer stopped at a telltale time. Instead the detective **deduces the time of death from clues** (alive at 9:30 · the 9-o'clock hour from the candle+match · "13 minutes before ten" → 9:47), avoiding a **trap** (the host's pocket watch reads 9:52 but ran fast). You **set the great clock's hands** to 9:47, which silently springs open a hidden panel holding a **brass key**, and the **key** opens the door. No "correct!" fanfare (Version C). Also replaced the browser pop-up with an in-room brass dial so it plays in the cloud panel. | Eli's design: turn "read the answer" into real four-step detective work (gather → deduce → set clock → earn key → door). Fullest expression yet of Pillars 1 (Notice What's Off) & 2 (Cleverness Earned). |
| 2026-07-06 | **Module 3, Change #1 — "Make it hard" (Eli chose Version C, the hardest):** door asks only for a "3-digit code" (no hint it's a time); the clock states it's stopped at 9:47 but no longer says that's the murder time; the clock gets no glow/chime that singles it out; two more objects (fireplace, portrait) are dimmed so the clock isn't the only one in shadow; a **red-herring number** (cloakroom ticket No. 214) is added so 9:47 isn't the only number, forcing the detective to decide *which* number matters. | Eli wants the game genuinely hard; the game must stop doing the player's deducing for them — a direct hit on Pillars 1 (Notice What's Off) & 2 (Cleverness Earned). |
