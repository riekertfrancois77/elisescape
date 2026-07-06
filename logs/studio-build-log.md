# Studio Build Log — Backstage (Dad + Claude)

> **Not part of Eli's game memory.** This is the workshop log — the behind-the-
> curtain work Dad and Claude do to build and tune the studio itself (the
> dashboard, modules, rewards, structure). Eli's *game* memory lives in
> `MEMORY.md`, `logs/session-log.md`, `design/`, and the decisions/questions
> logs. Keep studio-plumbing notes here, out of his view.

---

## Dad re-threads the journey around the game (2026-07-06)

After reviewing Eli's game and his momentum (he loves iterating *his* game,
version by version), Dad reshaped the road ahead so every remaining module makes
the game better instead of feeling like a detour.

- **New studio rule — "Eli's brain first, then AI":** he creates/decides first;
  AI reviews, researches, and builds after. Baked into `CLAUDE.md`.
- **Reordered Modules 5–13** (dashboard, `MEMORY.md`, `LOCKED_MODULES.md`,
  `CLAUDE.md`): 5 Read the Machine · 6 Speak AI Fluently · **7 Create Worlds**
  (moved up — graphics/immersion) · 8 Design Great Games · **9 Summon the
  Experts** (research sub-agents → curate → implement, right *after* puzzle
  design) · **10 Build the Next Room** (reframed from "Build Features", which was
  stale — the game's long built) · 11 Hunt Bugs · 12 Cross Into the Real World ·
  13 Ship Like a Pro.
- **Game Version tracker** added to the dashboard (reads `## Game Version` in
  `MEMORY.md`); starts at **v0.1** and climbs as modules improve the game.
- **Split the logs:** Eli's `session-log.md` is now purely his module
  play-throughs; this build log holds the studio-building sessions.
- No modules unlocked — 5–13 stay sealed (`DAD_OPENED_THROUGH` still 4).

---

## Module 2 deepened (Dad's ChatGPT notes) (2026-07-06)

- Reworked `modules/module-02.md` + the dashboard mission using the best of
  Dad's original Module 2 concept: framed as **directing an AI engineering
  team**; added **MVP thinking**, the **tiny spec**, **Version 0.1** language +
  "don't celebrate yet", an **AI Review** of Claude's own build, the Lead
  Engineer hat, the estimate-vs-reality lesson, and the "3 files, no frameworks"
  reveal.
- Deliberately kept **project memory** and **deep iteration** OUT of Module 2
  (those are Modules 4 and 3) so the later modules stay fresh.

---

## Dad tunes rewards & opens Modules 3–4 (gated) (2026-07-06)

- **Module 2 payout lowered to $5** (make Eli earn the cash). Later added $5
  each for Modules 3 & 4; reward pool ~$100. Lives in `DAD_VAULT.md` + the
  `REWARDS` array in `script.js`.
- **Opened Modules 3 & 4 — GATED.** The dashboard unlocks modules **in order**
  (`DAD_OPENED_THROUGH = 4`): a module is playable only once the one before it is
  complete. They show "UP NEXT" until earned.
- Wrote `modules/module-03.md` and `modules/module-04.md`; added the **Director
  Mode** + **Memory Keeper** achievements and Module 3/4 step trackers.

---

## Dad unlocks Module 2 & makes the Cash Vault real (2026-07-06)

- **Dad unlocked Module 2**; wrote its mission; updated dashboard, `MEMORY.md`,
  `LOCKED_MODULES.md`, `CLAUDE.md`. Added **One-Shot Power** + **First Playable**
  achievements.
- **Cash Vault made real (Dad's call):** the Dad Vault now shows **real dollar
  amounts** Eli has earned (was placeholders); the dashboard computes "earned"
  from achievements/progress.
- Consolidated Eli's per-session branches back onto the deployed branch after
  each module (branch fragmentation — each Claude Code chat spawns its own
  branch; the fix is a fresh chat per module + a merge back).

---

## Studio Tune-Up (2026-07-06)

- Added the **Map the emotional curve** step to Module 1.
- Added a dedicated AI-tooling module and grew the journey to **13 modules**.
- Hid a `.secret/` folder wired to the **Curiosity Pays** achievement.
- Added a private **~$100 reward map** to `DAD_VAULT.md`.
- Deployed the dashboard as a live site (Netlify) so it auto-updates on push.

---

## Studio Founding (2026-07-06)

- Built the studio: dashboard (`index.html` / `style.css` / `script.js`), the
  memory files, the design harness, and the logs.
- Module 1 unlocked; Modules 2–13 sealed. No game decisions yet — the studio
  waited for its Creative Director.
