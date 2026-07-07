# Studio Build Log — Backstage (Dad + Claude)

> **Not part of Eli's game memory.** This is the workshop log — the behind-the-
> curtain work Dad and Claude do to build and tune the studio itself (the
> dashboard, modules, rewards, structure). Eli's *game* memory lives in
> `MEMORY.md`, `logs/session-log.md`, `design/`, and the decisions/questions
> logs. Keep studio-plumbing notes here, out of his view.

---

## Dad opens Modules 5–8 — the "make the game visibly better" run (2026-07-07)

Eli finished Module 4 but said it felt "way too short" (fair — it's the one
conceptual module, no version bump). Dad's answer: open the next four at once so
the hands-on, game-first momentum is uninterrupted. Each bumps the game's version.

- **`DAD_OPENED_THROUGH` 4 → 8** in `script.js`. Gating stays sequential, so Eli
  still sees only **Module 5 active**; 6–8 show "UP NEXT" until earned.
- **Wrote 4 mission files** — `modules/module-05.md` … `module-08.md` — each with
  a role/hat, an explicit **brain-first rule**, a version target, and "done when".
  Hats: 5 Lead Engineer (pair-reading code), 6 Prompt Coach, 7 Technical Artist,
  8 Game Designer/critic.
- **Version arc set:** 5 → **v0.2** (first solo code edit), 6 → **v0.3** (prompt
  polish), 7 → **v0.4** (real graphics/immersion), 8 → **v0.5** (design eye
  sharpens the current game + locks the next-room blueprint for Module 10).
- **Dashboard content** in `script.js`: added `MODULE5–8_GOALS/STEPS`, `MISSIONS`
  5–8, 4 new visible achievements (**Code Reader, AI Whisperer, World Builder,
  Game Designer**) + matching `STUDIO_STATUS` capabilities. Synced both `file://`
  fallbacks (`FALLBACK_MEMORY` Claude-Instructions/Session-Memory + the 4 new
  unearned achievements) so a double-clicked dashboard doesn't lie.
- **Memory + docs:** `MEMORY.md` (current module → 5, Claude Instructions rewritten
  to invite Module 5 + list the 5→8 arc, empty Module 5–8 step trackers added),
  `ACHIEVEMENTS.md` (4 new, unearned), `LOCKED_MODULES.md` (5–8 opened, 9–13
  sealed), `CLAUDE.md` (Current State + roadmap + `DAD_OPENED_THROUGH = 8`).
- **Cash:** deliberately **left `REWARDS` untouched** — rewards are Dad's call.
  Flagged to Dad that 5–8 currently pay $0 and the pool math needs his decision.

---

## Module 4 dashboard sync (2026-07-07)

After Eli's Module 4 session, kept the dashboard's `file://` fallback in step
with real progress (the stale-state bug Eli caught in Module 3 — the fallback
must be updated by hand or a double-clicked dashboard lies):

- `script.js` `FALLBACK_MEMORY`: ticked Module 4 in the Progress Tracker, added
  a **Module 4 Steps** block (all 6 done), refreshed Session Memory + Claude
  Instructions to the Module-4-complete state.
- `script.js` `FALLBACK_ACHIEVEMENTS`: **Memory Keeper** → `[x]`.
- No new rewards or amounts touched (Memory Keeper's `$5` Dad Vault entry was
  already wired at line ~152 and fires automatically on unlock).
- `DAD_OPENED_THROUGH` still **4** — Modules 5–13 remain sealed until Dad opens
  Module 5.

(Eli-facing memory — his own-words game summary, the Module 4 diary entry, and
the Memory Keeper trophy — was written to `MEMORY.md` / `session-log.md` /
`ACHIEVEMENTS.md` / `questions-eli-answered.md` as part of the session itself.)

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
