# Eli AI Game Studio

A visual, browser-based learning dashboard that guides Eli through an
AI-native game development journey using Claude Code.

Eli is the **Creative Director**. Claude Code is his studio team. The game he
builds is entirely his own — no theme, genre, or story is predetermined.

## For Dad: How to Run the Dashboard

**Open `index.html` in a browser.** That's it. Double-click it, or drag it
into Chrome/Firefox/Safari/Edge.

> Optional: for the dashboard to live-read progress from the Markdown files
> (`MEMORY.md`, `ACHIEVEMENTS.md`), serve the folder instead of opening the
> file directly — run `python3 -m http.server` in this folder, then open
> `http://localhost:8000`. Opened as a plain file, the dashboard still works
> fully using its built-in starting state.

## How It Works

1. Eli opens the dashboard and clicks **Module 1: Think Like a Game Studio**.
2. The mission page tells him exactly what to ask Claude Code.
3. Eli does the real work in a Claude Code session in this folder.
4. Claude Code updates the Markdown files (`MEMORY.md`, `design/`, `logs/`)
   as steps are completed.
5. Eli refreshes the dashboard to see progress, achievements, and his next
   instruction.

The dashboard never edits files itself — the Markdown files are the project's
memory, and Claude Code is the only writer.

## Project Layout

| Path | What it is |
|---|---|
| `index.html`, `style.css`, `script.js` | The dashboard |
| `CLAUDE.md` | Operating rules for Claude Code (read automatically) |
| `MEMORY.md` | The project's brain — current state, progress, next prompt |
| `ACHIEVEMENTS.md` | Visible + secret achievements |
| `DAD_VAULT.md` | Real-world rewards (Dad fills these in) |
| `LOCKED_MODULES.md` | Teasers for Modules 2–12 |
| `modules/` | Mission files, one per module |
| `design/` | The design harness Eli fills in during Module 1 |
| `logs/` | Session log, Eli's answers, decisions made |
| `vault/`, `game/`, `assets/` | Reserved for later modules |

## For Dad: Controls

- **Rewards:** edit `DAD_VAULT.md` with real rewards whenever you like.
- **Unlocking modules:** only you can unlock Modules 2–12. Tell Claude Code
  explicitly (e.g. "Dad here — unlock Module 2") and it will update the files.
- Everything is plain text. Read `logs/` anytime to see exactly what happened.
