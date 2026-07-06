# Technical Direction

> How the game gets built. Owned by the engineering side of the studio, but
> the Creative Director signs off. Drafted at the end of Module 1; firms up
> in Modules 5–8.

## Platform

**Browser** (studio default) — a point-and-click detective mystery fits the web
perfectly: zero installs, instant demos, easy to show Dad and friends. Final
call stays with the Director, but nothing about the design needs more than a
browser.

## Tech Approach

Plain **HTML / CSS / JavaScript**, no build tools — matches the studio's
philosophy and Eli's learning path. The game is fundamentally about *rooms,
clues, and state* (what you've seen, which suspects remain), which is very
doable in the browser without a backend.

## Constraints

- Must be buildable by Eli + Claude Code, one feature at a time.
- Must run without a backend, database, or build step (studio rule, can be
  revisited by Dad).

## Risks & Unknowns

- **Memory across the whole game (Dev's flag):** the "first clue pays off at the
  end" and the shrinking suspect list mean the game must *remember* what the
  player has seen and done for the entire session. Plan this state early, don't
  bolt it on.
- **Fair puzzles:** every "notice what's off" solution must be discoverable and
  logical — needs careful puzzle design (Module 7).
- **Scope:** number of rooms, suspects, and clues is undecided; start small and
  grow one room at a time (Module 8).
