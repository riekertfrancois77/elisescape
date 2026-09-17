# Expert Ideas — Kept for Later (Module 9 backlog)

> From the ★ Module 9 expert panel Eli summoned (2026-07-08). He **kept** these
> ideas but, on the Game Engineer's honest scope advice, saved the bigger/riskier
> ones for their own build-and-playtest sessions (each adds a *gate* or a *screen*,
> which is a new way to accidentally make the game unwinnable). The safe, additive
> set was built in v0.7; these are the backlog.

## Already built in v0.7 (for reference)
- ✅ **Split the time** — the hour comes from the candle, the minutes from the footman.
- ✅ **Lying witness** — a guest claims the host was alive at 10:45; the physical clues disprove it.
- ✅ **Killer taunts** — escalating whispers as you search; silent once you get the key.
- ✅ **Room reacts** — the foyer curdles darker/colder with each clue (capped so it stays playable).

## Backlog — build in future sessions (each on its own)

### 1. Connect-the-clues gate  *(effort: big)*
Make the notebook `<li>` clues clickable; the player selects the two that fit
(candle + footman) to "forge" a deduction (`state.forged = true`). The clock only
accepts an answer once forged.
- **Why:** turns the solve into an "aha chain," not a single guess.
- **Fairness risk:** it's a real gate — require both clues to exist before the pair
  can be forged, and give a clear "these don't connect" message. Playtest that the
  game is always still winnable.

### 2. Name-the-culprit lock (WHO, not just WHEN)  *(effort: medium/big)*
After the key, a second lock: name the killer, deduced from a fair physical tell
(the single spent match by the candle) cross-referenced with a guest who's the only
smoker. Clone the `handleClock()` pattern into `handleCulprit()` with a `CULPRIT`
constant; gate `win()` behind `state.knowsKiller`.
- **Why:** adds a whole new axis of deduction and delivers the "Duel With the Culprit" pillar.
- **Fairness risk:** the tell (match + smoker guest) must be in the notebook first,
  or it's guessing. Accept a couple of spellings of the name.

### 3. Multi-beat ENDING  *(effort: big)*  — Eli's chosen finale
Reuse the `storyLines` + `showNextStoryLine()` scripted-scene engine to play an
ending after the door opens, called from `win()`:
1. **Face-Off** — the corridor opens on the killer, waiting; he explains *why* he did it.
2. **Name the clue** — his last dare: pick the clue that proves it's him (multiple-choice
   from `state.clues`, not free-typed).
3. **Dawn Breaks** — you lay out the case (time · method · name); the killer is unmasked;
   the barred doors open with the dawn. Case closed.
- **Why:** gives the game a real payoff — its biggest missing piece.
- **Note:** overlaps with #2 (both are "name it" tests). Decide ONCE whether naming
  the killer happens before the door (#2) or inside the finale (#3) — don't make the
  player name him twice.

## Recommended order when unlocked
Split/lying/taunts/room are done → then **#1 (connect-the-clues)** → **#2 (name WHO)**
→ **#3 (the ending)**, since the ending ties the others together. Build and playtest
one at a time; the deduction chain must always still solve (candle + footman → 10:36).
