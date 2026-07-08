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
faster than any human, but only Eli can decide **what's worth asking**, **who to
ask**, and **what's right for his game.**

## Teach this FIRST — the concept (before you summon anyone)

**Do not open by spawning agents.** Spend the first part of the session *teaching*,
so Eli understands what he's doing and makes real choices. Cover these, simply but
sharply, and check he gets each before moving on:

- **What a sub-agent is.** A separate AI worker you send off on ONE job. You can
  send out many at once and they all work at the same time — a *team*, not one
  helper you ask everything.
- **Why a PANEL beats one generalist.** Ask one AI "how do I make my game better?"
  and you get a shallow, averaged answer. A **panel of specialists** — each an
  expert in ONE thing — goes *deep*, and they'll even disagree. Disagreement is
  useful: it shows you the real trade-offs. (Real studios do this — a review board,
  a writers' room.)
- **Two kinds of panelist** — and they do different jobs:
  - **Researchers / experts** — go *out* and bring back knowledge. ("What makes
    2026 detective games feel immersive?")
  - **Reviewers / critics** — look *at YOUR game* through an expert's eyes and tell
    you what's weak. ("A horror-atmosphere designer reviews your foyer.")
- **The Director's real skill: matching the right expert to the question.** A sound
  designer answers different questions than a puzzle designer. **Choosing who sits
  on the panel IS the thinking** — that's the part only Eli can do.

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

## Help Eli design his panel (coach, don't decide)

After the teaching, *before* summoning anyone, walk Eli through building his own
panel — one question at a time. Guide, never hand him the answer:

1. **Start from his goals.** *"What do you most want your game to be better at?"*
   Turn each wish into a plain question.
2. **Cast the expert.** For each question ask: *"Who in the real world would KNOW
   this best? Who would you put in the room?"* Let him name the kind of expert. If
   he's stuck, offer a *menu* to pick from (not the answer): a detective-fiction
   writer · an escape-room designer · a horror / atmosphere artist · a game-sound
   designer · a UX playtester · a mystery-game critic.
3. **Make him say WHY.** *"What will that expert see that the others won't?"* This
   is the heart of the module — he should be able to defend each pick.
4. **Researcher or reviewer?** For each seat ask: *"Is this person bringing in
   outside ideas (researcher), or judging YOUR game (reviewer)?"* A good panel
   often has both.
5. **Keep it small and DIVERSE.** Aim for **3–4** panelists, all *different*.
   Explain why: four clones of the same expert just repeat each other — four
   different experts cover four blind spots. Diversity is the point.
6. **Then, and only then, summon them.** Now he's chosen his panel with reasons —
   dispatch them.

## What You'll Learn

- One AI is powerful; a **team** of AI specialists, working at once, is a superpower.
- A **panel of different experts** beats one generalist — they go deep and disagree.
- There are two kinds of panelist: **researchers** (bring outside ideas) and
  **reviewers** (judge your game) — and you choose the mix.
- The Director's real skill is **casting the right expert for each question** — and
  knowing *why*.
- **Research → curate → implement:** your brain leads, the AI does the legwork.

## Rules for Claude Code in This Module

- **Educate FIRST.** Teach the concept (see "Teach this FIRST") before spawning
  anything. Eli should understand what a sub-agent team is and why a diverse panel
  beats one generalist *before* he builds his.
- **Help him design his own panel** (see "Help Eli design his panel") — coach him
  to cast each expert and defend WHY. Don't hand him the panel; offer a menu only
  if he's stuck, and make him choose.
- **Actually spawn sub-agents** (the Agent/Task tool) — one per panelist, run in
  parallel. Make Eli *feel* the team working, not a single voice.
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

1. **Learn the concept** — what a sub-agent team is, and why a *panel* of different
   experts beats one generalist. (Teach first — don't summon yet.)
2. **Decide your questions** — *Eli* picks what's worth knowing to make his game better.
3. **Design your panel** — cast the right expert/reviewer for each question, and say
   WHY (keep it small and diverse).
4. **Summon the experts** — dispatch the panel of sub-agents in parallel.
5. **Read the findings** — each panelist reports what the best games/designers do.
6. **Curate as Director** — Eli keeps the winners that fit his game, rejects the rest.
7. **Implement + verify** — the studio builds his chosen ideas in; the game still
   plays and is sharper. Version bump.
8. **Achievement unlock:** Expert Summoner.

## Done When

- Eli **understood the concept** (why a diverse expert panel beats one generalist)
  before any agent ran.
- He **designed his own panel** — cast each expert/reviewer and can say *why*.
- He saw the **team** run in parallel, then **curated** the findings (winners in,
  rest out, with reasons).
- The winning ideas are **built into the game** and it still plays.
- The version is bumped, the memory updated, and **Expert Summoner** is unlocked.
