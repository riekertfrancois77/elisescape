# Module 9 — Summon the Experts

**Status:** OPENED by Dad (2026-07-08) · **Unlocks when Module 8 is complete.**
**Role:** Eli is Creative Director. Claude wears the **Research Lead** hat — it
commands a team of research sub-agents and reports back; Eli decides the questions
and picks the winners.

**Version target:** the game climbs another version (→ **v0.7**, or **v0.6** if the
Bonus isn't done yet) once the research winners are built in.

## Purpose

Every module so far, Eli directed **one** AI. This one hands him a **team.** He
learns that Claude can spawn **research sub-agents** — a squad of AI researchers
that go out **in parallel**, each chasing a different question, and bring back the
world's best current thinking. Then Eli does the Director's real job: he **curates**
— reads the findings, keeps the ideas that fit *his* game, throws out the rest — and
the studio builds the winners in.

This is the clearest "your brain first, then AI" module of all: the AI can research
faster than any human, but only Eli can decide **what's worth asking** and **what's
right for his game.**

## The tool (how the "team" works)

The research team is real, not pretend. In this session Claude spawns **sub-agents**
(the Agent/Task tool) — separate AI workers that each take one research question and
run at the same time, then report back. They can search the web for current, 2026
thinking. This is a **native Claude Code capability** — no extra connector needed.
If web access is unavailable in the session, say so honestly and fall back to what
the researchers can reason out, rather than pretending to have searched.

## The Brain-First Rule

**Eli decides the questions; Eli picks the winners.** Two hard rules:

- **Don't hand him the research questions.** Ask what *he* wants his game to be
  better at, and shape his answers into researchable questions — but the direction
  is his.
- **Don't pick the winning ideas for him.** Lay out what each researcher found,
  neutrally, and let *him* choose what fits *One Night at Thornwood Manor* — and say
  why. Curating is the whole skill.

## What You'll Learn

- One AI is powerful; a **team** of AI researchers, working at once, is a superpower.
- You can send **sub-agents** to research anything, in **parallel.**
- The Director decides **what to ask** and **curates** what comes back.
- Not every good idea fits YOUR game — choosing the right ones is the skill.
- **Research → curate → implement:** your brain leads, the AI does the legwork.

## Rules for Claude Code in This Module

- **Actually spawn sub-agents** (the Agent/Task tool) — one per research question,
  run in parallel. Make Eli *feel* the team working, not a single voice.
- Help Eli turn his wishes into **3–4 sharp research questions** (his direction).
  Good examples, only if he's stuck: *what makes 2026 detective/mystery games feel
  immersive · how escape-room designers make puzzles fair but hard · what makes a
  villain memorable · how mystery games pace tension and reveals.*
- When the team reports, present each finding **clearly and neutrally** — the top
  ideas, in plain language — and let **Eli curate**. Never pick for him.
- Turn his chosen winners into **concrete changes** to *his* game and build them
  (respecting the studio's constraints — HTML/CSS/JS, plus the art-asset pipeline
  from the Bonus if he's done it).
- Keep the game **playable** — the deduction chain must still solve; verify it.
- **Bump the version** in `MEMORY.md`'s `## Game Version`; tick `## Module 9 Steps`;
  add a Session-Memory + `logs/session-log.md` entry in Eli's voice; unlock
  **Expert Summoner**.

## Mission Flow

1. **Meet the Research Lead** — Claude can summon a whole team of AI researchers.
2. **Decide your questions** — *Eli* picks what's worth knowing to make the game better.
3. **Summon the experts** — dispatch research sub-agents, each on one question, in parallel.
4. **Read the findings** — each researcher reports what the best games/designers do.
5. **Curate as Director** — Eli keeps the winners that fit his game, rejects the rest.
6. **Implement the winners** — the studio builds his chosen ideas in.
7. **Play & verify** — the game is sharper and more immersive. Version bump.
8. **Achievement unlock:** Expert Summoner.

## Done When

- Eli set the research questions himself and saw a **team** of sub-agents run in
  parallel.
- He **curated** the findings — chose winners, rejected others, and can say why.
- The winning ideas are **built into the game** and it still plays.
- The version is bumped and the memory updated.
- The **Expert Summoner** achievement is unlocked.
