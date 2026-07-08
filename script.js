/* ============================================================
   ELI AI GAME STUDIO — dashboard logic
   No frameworks. No build step. No backend.
   Reads MEMORY.md + ACHIEVEMENTS.md when served over http;
   falls back to the embedded starting state on file://.
   ============================================================ */

"use strict";

/* ---------------- module data ---------------- */

const MODULES = [
  {
    n: 1,
    title: "Think Like a Game Studio",
    teaser: "Design your own game from scratch — before any code exists. The studio opens its doors to its Director.",
  },
  { n: 2,  title: "From Vision to Prototype",      teaser: "Make Claude build something real from a single, perfect prompt. One shot. No edits." },
  { n: 3,  title: "Direct the Team",               teaser: "Stop typing code requests. Start running a studio. You give direction; the team executes." },
  { n: 4,  title: "Build a Second Brain",          teaser: "Teach the studio to remember everything, so every session starts smarter than the last." },
  { n: 5,  title: "Read the Machine",              teaser: "See through the machine. Read code the way a director reads a script." },
  { n: 6,  title: "Speak AI Fluently",             teaser: "Words are your controller. Learn the inputs that make AI do exactly what you mean." },
  { n: 7,  title: "Create Worlds",                 teaser: "Give your game a face. Real graphics and atmosphere — you art-direct, the studio paints." },
  { n: 8,  title: "Design Great Games",            teaser: "The craft of making players feel clever. Design your next room and its puzzle — with your own head." },
  { n: 9,  title: "Summon the Experts",            teaser: "Send a team of AI researchers after the world's best ideas, curate the winners, and build them into your game." },
  { n: 10, title: "Build the Next Room",           teaser: "Grow the manor. Turn your next design into a whole new playable room." },
  { n: 11, title: "Hunt Bugs",                     teaser: "Things will break. Directors don't panic — they hunt." },
  { n: 12, title: "Cross Into the Real World",     teaser: "Your studio skills escape the screen. The things you design in the real world become game mechanics." },
  { n: 13, title: "Ship Like a Pro",               teaser: "Release day. An audience. Your game, in other people's hands." },
];

// Dad has opened modules 1..N. Opened modules unlock IN ORDER — a module only
// becomes playable once the one before it is complete. Modules past this number
// stay sealed until Dad opens them. (Dad opened through 8 on 2026-07-07 — the
// "make the game visibly better" run: read code, prompt, graphics, design.)
const DAD_OPENED_THROUGH = 8;

// State of a module for the given completion array: complete | active | queued | sealed.
function moduleState(n, done) {
  if (done[n - 1]) return "complete";        // finished
  if (n > DAD_OPENED_THROUGH) return "sealed"; // Dad hasn't opened it yet
  if (n === 1 || done[n - 2]) return "active"; // opened AND the previous one is done
  return "queued";                             // opened, but waiting on the previous module
}

const MODULE1_GOALS = [
  "AI helps with thinking, not just coding.",
  "Great games begin with clear design choices.",
  "The human is the Creative Director.",
  "AI can act as a studio team.",
  "The project memory files become the shared brain.",
  "Good prompts create better outcomes.",
];

const MODULE1_STEPS = [
  "Welcome to the Studio",
  "What should players feel?",
  "Map the emotional curve — where players get stuck, nearly quit, celebrate.",
  "Who does the player become?",
  "What kind of world is this?",
  "What problem or challenge drives the game?",
  "What are the game's 3–5 pillars?",
  "What references inspire the game?",
  "Claude generates 3 game directions — from your answers only.",
  "You choose, reject, or combine directions. The First Big Decision.",
  "Claude simulates a studio team review.",
  "Claude writes the design harness files.",
  "Achievement unlock: Creative Director.",
];

const MODULE2_GOALS = [
  "The real skill isn't code — it's communicating with an AI engineer.",
  "MVP thinking: the smallest version that's still fun beats a big plan.",
  "Studios build versions (0.1, 0.2…), not whole games at once.",
  "A precise spec gets a better build than \"make my game.\"",
  "Software can be simple — three files, no frameworks.",
  "You're the Director: even the AI's own work gets reviewed and improved.",
];

const MODULE2_STEPS = [
  "Meet your Lead Engineer — Claude swaps hats (Creative Director → Lead Engineer).",
  "MVP thinking: \"If we only had two hours, which ONE room proves your game's worth playing?\"",
  "Write a tiny spec together — one room, one locked door, one puzzle, one key.",
  "Make your estimate — how long do YOU think this'll take to build? (Claude logs it.)",
  "One shot — Claude builds the whole playable Version 0.1 into game/… in seconds.",
  "Play it — and remember your estimate.",
  "Don't celebrate yet — that's Version 0.1. (How much of the game is actually done?)",
  "Studio Review — the team rates the build through different lenses.",
  "Under the hood — just 3 files, no frameworks. Software can be simple.",
  "One change, watch it update — a taste of directing. Trophies: One-Shot Power + First Playable.",
];

const MODULE3_GOALS = [
  "AI's work is clay, not stone — nothing it makes is final.",
  "Your taste is the job: you decide what's good, boring, or wrong.",
  "You're allowed to reject AI's version and ask for another.",
  "Small, specific change requests beat vague ones.",
  "Directing is choosing between options, not doing it all yourself.",
];

const MODULE3_STEPS = [
  "Play your game and make a 'change list' — what feels off, boring, or not-you.",
  "Pick the top 3 changes worth making first.",
  "Direct one change — tell Claude what you want; it offers a few versions.",
  "Choose the version that feels most like YOUR game.",
  "See the change land, play again, react.",
  "Repeat for your top changes.",
  "Achievement unlock: Director Mode.",
];

const MODULE4_GOALS = [
  "AI forgets between sessions — the project has to remember for it.",
  "The memory files (MEMORY.md, logs/) are the studio's shared brain.",
  "Good builders leave notes for their future selves.",
  "Writing memory in your own words makes it truly yours.",
  "Memory is what turns a chat into a studio.",
];

const MODULE4_STEPS = [
  "Open MEMORY.md and the logs — see what the studio remembers about your game.",
  "Learn what each memory file is for: state, sessions, decisions.",
  "Summarize, in your OWN words, what your game is and where you're at.",
  "Add your summary to the memory with Claude.",
  "Test it: end the session, start fresh, watch Claude pick up right where you left off.",
  "Achievement unlock: Memory Keeper.",
];

const MODULE5_GOALS = [
  "The game you've been directing is just code — and you can read it.",
  "Your game's `state` object (from Module 4) lives here, in real code.",
  "Read first, guess what it does, THEN check — that's how pros learn a codebase.",
  "You don't need to write code from scratch to change a game.",
  "Your first solo edit: change the game with your own hands, not just direction.",
];

const MODULE5_STEPS = [
  "Meet your codebase — Claude (Lead Engineer) opens game/script.js, the machine you built.",
  "Find the memory — spot the `state` object you met in Module 4, alive in real code.",
  "Read before you're told — you predict what a chunk of code does; THEN Claude confirms.",
  "Trace one clue — follow a single clue from click → deduction → the door.",
  "Your first solo edit — change the murder time (9:47 → your call) yourself and watch the game change.",
  "Make it yours — a few more safe edits: a host's line, a color, a sound.",
  "Version bump — the game you edited by hand is now Version 0.2.",
  "Achievement unlock: Code Reader.",
];

const MODULE6_GOALS = [
  "Words are your controller — the better the prompt, the better the game.",
  "\"Make it better\" gets you noise; specifics get you what you pictured.",
  "A great prompt names WHO, WHAT, WHY, and the LIMITS.",
  "Write your prompt first, then sharpen it — don't outsource the thinking.",
  "Prompting is a real skill you'll use for the rest of your life.",
];

const MODULE6_STEPS = [
  "Meet the Prompt Coach — Claude shows you words as a controller.",
  "The weak prompt — try \"make my game better\" and watch the vague result.",
  "The strong prompt — add who/what/why/limits; feel the difference.",
  "Anatomy of a great prompt — specific, full of your taste, with clear limits.",
  "Sharpen a real one — YOU write a prompt to polish a real moment in your game.",
  "Direct 2–3 polish prompts into the game and see them land.",
  "Version bump — sharper prompts, sharper game: Version 0.3.",
  "Achievement unlock: AI Whisperer.",
];

const MODULE7_GOALS = [
  "A game's look is a feeling — you decide the feeling first.",
  "You art-direct (references, mood, palette); the studio paints.",
  "Real graphics and atmosphere are the biggest glow-up your game gets.",
  "Immersion is built from layers: light, motion, and sound together.",
  "Your taste leads every visual call — the AI serves it.",
];

const MODULE7_STEPS = [
  "Meet the Technical Artist — Claude changes hats; you art-direct, it paints.",
  "Art-direct first — describe the look and mood you want, in your own words.",
  "Lock a palette + atmosphere — set the vibe before a single pixel.",
  "The studio paints — Claude builds real graphics/atmosphere to your direction.",
  "React & redirect — what's right, what's not-you; send it back for another pass.",
  "Add immersion — layers of light, ambient motion, and sound that pull the player in.",
  "Version bump — your game has a real face now: Version 0.4.",
  "Achievement unlock: World Builder.",
];

const MODULE8_GOALS = [
  "Great games are designed to make players feel clever.",
  "You design the next room and its puzzle with YOUR head — first, alone.",
  "A good puzzle is fair: solvable from clues the player can find.",
  "Claude's job is to pressure-test your design, not invent it for you.",
  "A design you can defend is a design worth building.",
];

const MODULE8_STEPS = [
  "Meet the Game Designer — Claude becomes your design partner and critic.",
  "Study what already works — why the foyer puzzle feels fair and clever.",
  "You design the next room — on your own: the space, the 'notice what's off', the puzzle.",
  "You design its puzzle — clues in, deduction, payoff. Your idea first.",
  "Pressure-test — Claude plays devil's advocate: is it fair? clear? clever?",
  "Sharpen the CURRENT game with your new design eye — one real improvement (Version 0.5).",
  "Lock the blueprint — your next-room design is saved, ready to build in Module 10.",
  "Achievement unlock: Game Designer.",
];

const ACHIEVEMENTS = [
  { name: "Creative Director",      desc: "Complete Module 1 and lock in your game's direction." },
  { name: "First Big Decision",     desc: "Choose, reject, or combine the three game directions." },
  { name: "Game Pillars Chosen",    desc: "Define the 3–5 pillars every decision gets tested against." },
  { name: "Studio Review Complete", desc: "Survive your first studio team review." },
  { name: "Memory Created",         desc: "The design harness exists and the studio brain knows your game." },
  { name: "One-Shot Power",         desc: "Turn your whole design into one prompt and watch Claude build a real, playable game." },
  { name: "First Playable",         desc: "Your game runs in a browser for the very first time." },
  { name: "Director Mode",          desc: "Take the director's chair — reshape your game and make the AI build it your way." },
  { name: "Memory Keeper",          desc: "Teach the studio to remember, so every session starts smarter than the last." },
  { name: "Code Reader",            desc: "Read your own game's code and make your first solo edit — by your own hand." },
  { name: "AI Whisperer",           desc: "Turn a vague ask into a precise prompt and get exactly what you pictured." },
  { name: "World Builder",          desc: "Art-direct your game's real look and atmosphere — you direct, the studio paints." },
  { name: "Game Designer",          desc: "Design a new room and puzzle that make players feel clever." },
  { name: "Concept Artist",         desc: "Direct an AI to paint real 2D art for your game — and craft it in yourself. (Bonus)" },
];
const SECRET_ACHIEVEMENTS = ["Curiosity Pays", "Better Than School", "AI Tamer", "Bug Hunter", "Game Studio Brain"];

/* ---------------- cash rewards (Dad Vault) ----------------
   Real money, set by Dad, SHOWN to Eli on purpose. Each reward is tied to a
   milestone the dashboard can already see, so the earned total updates itself
   as Eli progresses. To change an amount, edit here and DAD_VAULT.md.        */

const REWARDS = [
  { label: "Become Creative Director — finish Module 1", amount: 10, when: "Module 1 complete",
    earned: (s) => s.earnedNames.has("Creative Director") },
  { label: "Build your first playable game — Module 2", amount: 5, when: "unlock First Playable",
    earned: (s) => s.earnedNames.has("First Playable") },
  { label: "Direct your game your way — Module 3", amount: 5, when: "unlock Director Mode",
    earned: (s) => s.earnedNames.has("Director Mode") },
  { label: "Master project memory — Module 4", amount: 5, when: "unlock Memory Keeper",
    earned: (s) => s.earnedNames.has("Memory Keeper") },
  { label: "Read your own code + first solo edit — Module 5", amount: 5, when: "unlock Code Reader",
    earned: (s) => s.earnedNames.has("Code Reader") },
  { label: "Prompt like a pro — Module 6", amount: 5, when: "unlock AI Whisperer",
    earned: (s) => s.earnedNames.has("AI Whisperer") },
  { label: "Art-direct your game's world — Module 7", amount: 5, when: "unlock World Builder",
    earned: (s) => s.earnedNames.has("World Builder") },
  { label: "Design your next room + puzzle — Module 8", amount: 5, when: "unlock Game Designer",
    earned: (s) => s.earnedNames.has("Game Designer") },
  { label: "Make real AI art for your game — ★ Bonus", amount: 5, when: "unlock Concept Artist",
    earned: (s) => s.earnedNames.has("Concept Artist") },
  { label: "Discover secret achievements", per: 5, cap: 5, when: "$5 each — keep exploring",
    count: (s) => s.secretCount },
  { label: "Ship & demo your game to the family — Module 13", amount: 25, when: "Module 13 complete",
    earned: (s) => s.moduleDone[12] === true },
  { label: "Finish the whole 13-module journey", amount: 5, when: "all 13 modules complete",
    earned: (s) => s.allDone },
];

/* ---------------- studio status (capabilities) ----------------
   High-level abilities the studio unlocks as Eli progresses.            */

const STUDIO_STATUS = [
  { label: "Pre-Production (Planning)", done: (s) => s.moduleDone[0] === true },
  { label: "Creative Director",         done: (s) => s.earnedNames.has("Creative Director") },
  { label: "Engineering Team",          done: (s) => s.earnedNames.has("One-Shot Power") },
  { label: "First Prototype",           done: (s) => s.earnedNames.has("First Playable") },
  { label: "Director's Eye",            done: (s) => s.earnedNames.has("Director Mode") },
  { label: "Studio Memory",             done: (s) => s.earnedNames.has("Memory Keeper") },
  { label: "Reads the Machine",         done: (s) => s.earnedNames.has("Code Reader") },
  { label: "Fluent in AI",              done: (s) => s.earnedNames.has("AI Whisperer") },
  { label: "Art Department",            done: (s) => s.earnedNames.has("World Builder") },
  { label: "Game Design",               done: (s) => s.earnedNames.has("Game Designer") },
  { label: "Makes Real Art (AI assets)", done: (s) => s.earnedNames.has("Concept Artist") },
  { label: "Shipped to an Audience",    done: (s) => s.moduleDone[12] === true },
];

/* ---------------- embedded fallback state ----------------
   Used when the dashboard is opened as file:// and fetch() of
   the Markdown files is blocked by the browser. Mirrors the
   starting state of MEMORY.md / ACHIEVEMENTS.md.               */

// NOTE: this file:// fallback must be kept in step with real progress, or a
// double-clicked dashboard shows stale state (the bug Eli caught). Better: open
// the live URL, which reads the real MEMORY.md/ACHIEVEMENTS.md.
//
// ⚠️ BACKTICKS: these two blocks are TEMPLATE LITERALS. Any literal backtick in
// the content ends the string early and breaks the ENTIRE dashboard (http AND
// file://). When you paste a MEMORY.md/ACHIEVEMENTS.md bullet in here, escape
// every backtick as \` (e.g. \`state\`, \`design/next-room.md\`). ALWAYS run
// `node --check script.js` after editing this file — it catches exactly this.
const FALLBACK_MEMORY = `
## Game Version
**0.6** — Arrival at Thornwood Manor, given its first real art assets — image files Eli made by directing an AI (the ★ Bonus Mission). He learned the six-part image-prompt formula, wrote his own prompts, and picked the best of 4 every time. Four assets landed in game/assets/: a grandfather clock and a golden pocket-watch, the host's wall portrait (raising his golden goblet), and — his own designer call — a killer kept hidden so she never spoils the mystery. Built on 0.5's designer eye, 0.4's art-directed look, 0.3's prompt polish and 0.2's murder time 10:36.

## Progress Tracker
- [x] Module 1
- [x] Module 2
- [x] Module 3
- [x] Module 4
- [x] Module 5
- [x] Module 6
- [x] Module 7
- [x] Module 8
- [ ] Module 9
- [ ] Module 10
- [ ] Module 11
- [ ] Module 12
- [ ] Module 13

## Module 1 Steps
- [x] 1
- [x] 2
- [x] 3
- [x] 4
- [x] 5
- [x] 6
- [x] 7
- [x] 8
- [x] 9
- [x] 10
- [x] 11
- [x] 12
- [x] 13

## Module 2 Steps
- [x] 1
- [x] 2
- [x] 3
- [x] 4
- [x] 5
- [x] 6
- [x] 7
- [x] 8
- [x] 9
- [x] 10

## Module 3 Steps
- [x] 1
- [x] 2
- [x] 3
- [x] 4
- [x] 5
- [x] 6
- [x] 7

## Module 4 Steps
- [x] 1
- [x] 2
- [x] 3
- [x] 4
- [x] 5
- [x] 6

## Session Memory
- 🧩 **Module 8 COMPLETE — Game Designer unlocked. Game → Version 0.5.** The purest "Eli's brain first" module: he **designed his next room and its puzzle himself** while Claude (Game Designer / critic) only pressure-tested. He named his own puzzle rules — **FAIR** (findable clues, no guessing) and **HARD & CLEVER** (you earn the aha) — then designed a **candlelit library** with a **statue that matches the host's portrait but holds the wrong thing**; the player fixes what it holds (a **goblet of wine**) and a **hidden room slides open**. He defended its fairness himself (you can travel between rooms to re-check the portrait), shipped a real improvement to the live game (the foyer portrait now shows the raised goblet — the planted **setup**, Version 0.5), and locked the blueprint in \`design/next-room.md\` for Module 10.
- 🎨 **Module 7 COMPLETE — World Builder unlocked. Game → Version 0.4.** Eli gave his game a **face** and art-directed all of it (Claude as Technical Artist). He chose the feeling first (*warm but wrong, grand and rich, a touch of creepy*) and a custom palette (**gold + mahogany + a bit of deep crimson**), then reacted and redirected pass after pass: a grand golden chandelier, gilded crown molding, a mantel-and-**chimney** fireplace lifted off the rug, a smaller gilded door, a coat rack with a draped cloak, a detailed crimson rug, and the great **grandfather clock** painted into its shadowy corner (kept dark so the puzzle stays fair). Then it came alive — flickering firelight, a breathing chandelier glow, and a warm low grand-hall drone. Every pass verified: the case still solves, the clock stays hidden.
- 🗣️ **Module 6 COMPLETE — AI Whisperer unlocked. Game → Version 0.3.** Eli learned that **words are the controller.** Brain-first, he wrote his own polish prompts and sharpened each with a real WHY and clear LIMITS. Three landed and were verified headless: the cartoon 🔑/🔊 emojis gone (a drawn brass sound button now) and every floating emoji in the foyer replaced with a drawn object in the manor's own style — with the hall clock **still hidden** in its shadow and the puzzle still fair. His best prompt fenced off three things at once (still clickable · don't move anything · keep the clock hidden).
- 🔧 **Module 5 COMPLETE — Code Reader unlocked. Game → Version 0.2.** Eli opened the hood on his own game and made his **first solo edit by his own hand** — he moved the murder from 9:47 to 10:36 in \`MURDER_TIME\`, then learned the engineer's loop (read → change → trace the ripple → verify): he chased the change through the whole clue chain (toast, candle, pocket-watch decoy, footman's countdown) and proved the case still solves. His game is now changed by *him*, not just directed.
- 🧠 **Module 4 COMPLETE — Memory Keeper unlocked.** Eli learned the studio's biggest secret: AI forgets between sessions, so the *project* remembers for it — the same idea as his game's \`state\` object, one level up. He wrote his game into \`MEMORY.md\` in his own words ("an escape-room type of game with a murder-mystery aspect… looking at everything closely and solving clues") plus what he wants next (design + mechanics to keep improving).
- 🏆 **Module 3 COMPLETE — Director Mode unlocked.** Eli directed five real changes into *Thornwood Manor*: a full deduction chain (clues → the 9:47 time of death → set the clock → a hidden key → the door), hidden clues + a 9:52 pocket-watch trap, a living code-made soundscape, and a CSS-painted foyer (firelight vs. moonlight). He rejected an AI version, overruled a design call to keep it fair, and caught a skipped change.
- 🎮 **Module 2 COMPLETE** — a playable Version 0.1 of *One Night at Thornwood Manor* runs in the browser.
- 🏆 Trophies so far: Creative Director, First Big Decision, Game Pillars Chosen, Studio Review Complete, Memory Created, One-Shot Power, First Playable, Director Mode, **Memory Keeper**, plus secret **AI Tamer** and **Bug Hunter**.
- 🏁 **Dad's run (Modules 5–8) is COMPLETE** — **5 Read the Machine ✅ → 6 Speak AI Fluently ✅ → 7 Create Worlds ✅ → 8 Design Great Games ✅.** The game climbed 0.1 → 0.5, all by Eli. **Modules 9–13 stay sealed until Dad opens them.**

## Claude Instructions
🧩 **Module 8 complete, Director — you earned Game Designer.** You **designed your
next room and its puzzle with your own head** — a candlelit library with a statue
that must be made to match the host's portrait (a raised goblet of wine), sliding
a hidden room open when you fix it. You defended it under pressure, kept it fair,
and planted the setup into your live game. **Version 0.5.** Blueprint saved in
\`design/next-room.md\`.

🏁 **You've completed Dad's whole run (Modules 5–8)** — your game climbed **0.1 →
0.5**, all by you. **Modules 9–13 are sealed** until **Dad** opens them. A taste of
what's next: **Module 9 — Summon the Experts**, then **Module 10 — Build the Next
Room** (your library becomes real). Ask Dad when you want more unlocked.
`;

const FALLBACK_ACHIEVEMENTS = `
## Visible Achievements
- [x] **Creative Director**
- [x] **First Big Decision**
- [x] **Game Pillars Chosen**
- [x] **Studio Review Complete**
- [x] **Memory Created**
- [x] **One-Shot Power**
- [x] **First Playable**
- [x] **Director Mode**
- [x] **Memory Keeper**
- [x] **Code Reader**
- [x] **AI Whisperer**
- [x] **World Builder**
- [x] **Game Designer**
- [x] **Concept Artist**

## Secret Achievements
- [ ] **Curiosity Pays**
- [ ] **Better Than School**
- [x] **AI Tamer**
- [x] **Bug Hunter**
- [ ] **Game Studio Brain**
`;

/* ---------------- markdown helpers ---------------- */

async function loadMd(path, fallback) {
  try {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) throw new Error(res.status);
    return await res.text();
  } catch {
    return fallback; // file:// or missing file — use embedded state
  }
}

// HTML comments in the Markdown are notes for Claude Code, not content.
function stripComments(md) {
  return md.replace(/<!--[\s\S]*?-->/g, "");
}

// Lines of a "## Heading" section, up to the next "## ".
function section(md, heading) {
  const lines = md.split("\n");
  const start = lines.findIndex((l) => l.trim().toLowerCase() === ("## " + heading).toLowerCase());
  if (start === -1) return [];
  const out = [];
  for (let i = start + 1; i < lines.length; i++) {
    if (lines[i].startsWith("## ")) break;
    out.push(lines[i]);
  }
  return out;
}

function checkboxes(lines) {
  return lines
    .filter((l) => /^\s*-\s*\[[ xX]\]/.test(l))
    .map((l) => ({
      done: /\[[xX]\]/.test(l),
      text: l.replace(/^\s*-\s*\[[ xX]\]\s*/, "").trim(),
    }));
}

// Tiny inline-markdown renderer (bold / italics / code), HTML-escaped first.
function inlineMd(text) {
  return text
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}

/* ---------------- rendering ---------------- */

const $ = (id) => document.getElementById(id);

function renderModules(done) {
  const CLS = { complete: "unlocked done", active: "unlocked", queued: "locked queued", sealed: "locked" };
  const BADGE = { complete: "COMPLETE", active: "UNLOCKED", queued: "UP NEXT", sealed: "LOCKED" };
  $("modules-grid").innerHTML = MODULES.map((m) => {
    const st = moduleState(m.n, done);
    const teaser = st === "queued"
      ? `${m.teaser} <em class="module-hint">Unlocks when you finish Module ${String(m.n - 1).padStart(2, "0")}.</em>`
      : m.teaser;
    return `
      <article class="module-card ${CLS[st]}" data-module="${m.n}" tabindex="0"
               role="button" aria-label="Module ${m.n}: ${m.title} (${BADGE[st]})">
        <span class="module-badge">${BADGE[st]}</span>
        <div class="module-num">${String(m.n).padStart(2, "0")}</div>
        <div class="module-title">${m.title}</div>
        <p class="module-teaser">${teaser}</p>
      </article>`;
  }).join("");

  $("modules-grid").querySelectorAll(".module-card").forEach((card) => {
    const open = () => openModule(Number(card.dataset.module));
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });
}

// The bonus mission card — always playable once opened; "complete" when its
// achievement is earned. Lives in its own #bonus-grid, apart from the 13.
function renderBonus(earnedNames) {
  const grid = $("bonus-grid");
  if (!grid) return;
  const done = earnedNames.has(BONUS.achievement);
  const badge = done ? "COMPLETE" : "BONUS · UNLOCKED";
  grid.innerHTML = `
    <article class="module-card unlocked bonus${done ? " done" : ""}" data-bonus="1" tabindex="0"
             role="button" aria-label="Bonus Mission: ${BONUS.title} (${badge})">
      <span class="module-badge">${badge}</span>
      <div class="module-num">★</div>
      <div class="module-title">${BONUS.title}</div>
      <p class="module-teaser">${BONUS.teaser}</p>
    </article>`;
  const card = grid.querySelector(".module-card");
  const open = () => openBonusMission();
  card.addEventListener("click", open);
  card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
}

function renderProgress(memoryMd) {
  const modules = checkboxes(section(memoryMd, "Progress Tracker"));
  const steps = checkboxes(section(memoryMd, "Module 1 Steps"));
  const doneModules = modules.filter((c) => c.done).length;
  const doneSteps = steps.filter((c) => c.done).length;
  const totalModules = modules.length || 12;
  const totalSteps = steps.length || 12;

  // Bar = completed modules, plus partial credit for Module 1 steps in flight.
  const pct = Math.min(100, (doneModules / totalModules) * 100 + (doneModules === 0 ? (doneSteps / totalSteps) * (100 / totalModules) : 0));
  $("progress-fill").style.width = pct.toFixed(1) + "%";
  $("progress-label").textContent = `${doneModules} / ${totalModules} MODULES`;
  $("step-label").textContent = doneModules === 0
    ? `Module 1 · Step ${doneSteps} of ${totalSteps}`
    : `${doneModules} module${doneModules === 1 ? "" : "s"} complete`;

  return { completedModules: modules.map((c) => c.done), stepsDone: steps.map((c) => c.done) };
}

function renderMemory(memoryMd) {
  const bullets = section(memoryMd, "Session Memory")
    .filter((l) => l.trim().startsWith("- "))
    .map((l) => l.trim().slice(2));
  $("memory-list").innerHTML = bullets.length
    ? bullets.map((b) => `<li>${inlineMd(b)}</li>`).join("")
    : `<li>Memory bank empty. The first session writes the first entry.</li>`;
}

function renderClaudePanel(memoryMd) {
  const lines = section(memoryMd, "Claude Instructions")
    .filter((l) => !l.trim().startsWith("<!--") && !l.trim().endsWith("-->"));
  let html = "", quote = [];
  const flushQuote = () => {
    if (quote.length) { html += `<blockquote>${quote.map(inlineMd).join("<br>")}</blockquote>`; quote = []; }
  };
  for (const l of lines) {
    const t = l.trim();
    if (t.startsWith(">")) { quote.push(t.replace(/^>\s?/, "")); continue; }
    flushQuote();
    if (t) html += `<p>${inlineMd(t)}</p>`;
  }
  flushQuote();
  $("claude-body").innerHTML = html || "<p>Awaiting instructions from the studio brain…</p>";
}

function renderAchievements(achMd) {
  const visible = checkboxes(section(achMd, "Visible Achievements"));
  const secret = checkboxes(section(achMd, "Secret Achievements"));

  const visItems = ACHIEVEMENTS.map((a, i) => {
    const earned = visible[i] ? visible[i].done : false;
    return `<li class="${earned ? "earned" : "locked"}">
      <span class="ach-icon">${earned ? "🏆" : "🔒"}</span>
      <div>${a.name}<span class="ach-desc">${a.desc}</span></div>
    </li>`;
  });

  const secItems = SECRET_ACHIEVEMENTS.map((name, i) => {
    const earned = secret[i] ? secret[i].done : false;
    return earned
      ? `<li class="earned"><span class="ach-icon">🌟</span><div>${name}<span class="ach-desc">Secret achievement unlocked.</span></div></li>`
      : `<li class="secret"><span class="ach-icon">▓</span><div>??? ??? ???</div></li>`;
  });

  const earnedCount = visible.filter((c) => c.done).length + secret.filter((c) => c.done).length;
  $("ach-count").textContent = `${earnedCount} UNLOCKED`;
  $("ach-list").innerHTML = visItems.join("") + secItems.join("");
}

// Build the reward state from what the dashboard already knows.
function rewardState(memoryMd, achMd) {
  const vis = checkboxes(section(achMd, "Visible Achievements"));
  const sec = checkboxes(section(achMd, "Secret Achievements"));
  const mods = checkboxes(section(memoryMd, "Progress Tracker"));
  const earnedNames = new Set();
  ACHIEVEMENTS.forEach((a, i) => { if (vis[i] && vis[i].done) earnedNames.add(a.name); });
  const moduleDone = mods.map((c) => c.done);
  return {
    earnedNames,
    secretCount: sec.filter((c) => c.done).length,
    moduleDone,
    allDone: moduleDone.length > 0 && moduleDone.every(Boolean),
  };
}

function rewardRow(done, label, amt, sub) {
  return `<li class="${done ? "reward-earned" : "reward-locked"}">
    <span class="vault-icon">${done ? "💰" : "🔒"}</span>
    <div><strong>${label}</strong><span>${sub}</span></div>
    <span class="reward-amt">${done ? "✓ " : ""}${amt}</span>
  </li>`;
}

function renderRewards(state) {
  let earned = 0, possible = 0;
  const rows = REWARDS.map((r) => {
    if (r.per) {
      const n = Math.min(r.count(state), r.cap), amt = n * r.per, max = r.cap * r.per;
      earned += amt; possible += max;
      return rewardRow(n > 0, r.label, `$${amt} / $${max}`, `found ${n} of ${r.cap} · ${r.when}`);
    }
    const done = r.earned(state);
    earned += done ? r.amount : 0; possible += r.amount;
    return rewardRow(done, r.label, `$${r.amount}`, done ? "ready — ask Dad!" : r.when);
  }).join("");

  $("vault-total").innerHTML = earned > 0
    ? `<span class="vault-amount">$${earned}</span>
       <span class="vault-amount-label">earned so far — <strong>ask Dad to claim it!</strong></span>
       <span class="vault-possible">of $${possible} up for grabs across the whole journey</span>`
    : `<span class="vault-amount-label">No cash banked yet — your first <strong>$${REWARDS[0].amount}</strong> is one module away.</span>`;
  $("vault-list").innerHTML = rows;
}

// The game's own version number climbs as modules make it better. Claude bumps
// it in MEMORY.md's "## Game Version" section; the dashboard shows it.
function renderVersion(memoryMd) {
  const el = $("game-version");
  if (!el) return;
  const lines = section(memoryMd, "Game Version").map((l) => l.trim()).filter(Boolean).filter((l) => !l.startsWith("<!--"));
  const m = (lines[0] || "0.1").match(/([0-9]+\.[0-9]+)/);
  el.textContent = "GAME v" + (m ? m[1] : "0.1");
}

function renderStudioStatus(state) {
  $("status-list").innerHTML = STUDIO_STATUS.map((item) => {
    const on = item.done(state);
    return `<li class="${on ? "status-on" : "status-off"}">
      <span class="status-mark">${on ? "✅" : "▢"}</span>${item.label}</li>`;
  }).join("");
}

// Studio Review of the latest build — the team rates it through different
// lenses. Claude writes it into MEMORY.md's "## Latest Build Review" section:
//   **Version 0.1**
//   - Creative Director · ⭐⭐⭐⭐☆ · Feels close to the vision.
//   - QA · ⭐⭐⭐☆☆ · Found two bugs.
function renderReview(memoryMd) {
  const lines = section(memoryMd, "Latest Build Review")
    .map((l) => l.trim()).filter(Boolean).filter((l) => !l.startsWith("<!--") && !l.startsWith("-->"));
  const lenses = lines.filter((l) => l.startsWith("- ") && /[⭐★]/.test(l)).map((l) => {
    const parts = l.slice(2).split("·").map((s) => s.trim());
    const starPart = parts[1] || "";
    const filled = (starPart.match(/[⭐★]/g) || []).length;
    const empty = (starPart.match(/☆/g) || []).length;
    return { role: parts[0] || "", filled, total: filled + empty || 5, note: parts.slice(2).join(" · ") };
  });

  if (!lenses.length) {
    $("review-body").innerHTML =
      `<p class="review-empty">No build yet. After Module 2's one-shot build,
       your studio team reviews it here — each role rating the game through its
       own lens (Creative Director, Player Experience, QA, Producer…).</p>`;
    return;
  }
  const verLine = lines.find((l) => /\*\*/.test(l) && !/[⭐★]/.test(l));
  $("review-body").innerHTML = `
    ${verLine ? `<div class="review-ver-head">${inlineMd(verLine)}</div>` : ""}
    <ul class="review-lenses">${lenses.map((x) => `
      <li>
        <div class="lens-top">
          <span class="lens-role">${x.role}</span>
          <span class="lens-stars" aria-label="${x.filled} of ${x.total}">${"★".repeat(x.filled)}${"☆".repeat(Math.max(0, x.total - x.filled))}</span>
        </div>
        ${x.note ? `<span class="lens-note">${inlineMd(x.note)}</span>` : ""}
      </li>`).join("")}</ul>`;
}

/* ---------------- modal ---------------- */

// Per-module step completion, read from MEMORY.md "## Module N Steps".
let missionStepsDone = {};
// Module completion array (from MEMORY.md Progress Tracker), for gating.
let completedModulesState = [];

// Bonus mission — a special unlock from Dad, OUTSIDE the numbered 13. Always
// playable once opened; "complete" when the Concept Artist achievement is earned.
const BONUS = {
  achievement: "Concept Artist",
  title: "Paint Your World",
  teaser: "Stop painting in code — direct an AI to make REAL 2D art for your game, and craft it in yourself. Bumps your game to Version 0.6.",
  purpose: `Your game's art has been painted in code (CSS + SVG). Real studios
    use art FILES — images made by artists. In this bonus mission YOU become that
    artist: you learn to prompt for pictures (a whole new skill from prompting for
    words), you direct an AI to paint real 2D art in your game's style, you pick
    the best of 4 every time, and you craft FOUR real assets into your game — all
    living in a new game/assets/ folder. Your game climbs to Version 0.6.`,
  goals: [
    "Real games use art FILES — and now you can make your own with AI.",
    "Prompting for pictures is its own skill: subject · style · composition · palette · lighting · what to leave OUT.",
    "You always get 4 options — the director picks the one that's most YOUR game.",
    "Match your game's look (gold + mahogany + crimson, painterly, warm-but-eerie) so every asset feels like one world.",
    "Assets live in game/assets/ — the real structure of a real game project.",
  ],
  steps: [
    "Meet the Concept Artist — your game's art can be real image files now, made by AI you direct.",
    "See where art lives — the new game/assets/ folder (every real game has one).",
    "Learn the image-prompt formula — subject · style · composition · palette · lighting · \"no text.\" (step by step)",
    "Study a real one — the demo foyer background: what prompt made it, what you'd change.",
    "Asset #1 — YOU write the prompt; generate 4 options; pick the one most YOUR game.",
    "Assets #2, #3, #4 — art-direct, generate 4, choose. (background · character · object · next-room — your call.)",
    "Drop all 4 into game/assets/ and wire them into the game.",
    "Version bump → 0.6. Achievement unlock: Concept Artist.",
  ],
  start: `"Start the Bonus Mission — I want to make real art for my game."`,
  outro: `You direct; the AI paints. Write your own prompts, always look at all 4
    options, and pick the one that feels like YOUR world. Save the session, then
    refresh here to claim Concept Artist and see Version 0.6.`,
};

const MISSIONS = {
  1: {
    title: "Think Like a Game Studio",
    purpose: `Design your own game from scratch — before any coding begins. Real
      studios don't start with code; they start with decisions. This one's done,
      Director — but the briefing lives on.`,
    goals: MODULE1_GOALS,
    steps: MODULE1_STEPS,
    start: `"Start Module 1. I'm ready to think like a game studio."`,
    outro: `Claude runs the mission. You make the decisions. Save the session,
      then refresh here — the studio remembers.`,
  },
  2: {
    title: "From Vision to Prototype",
    purpose: `In Module 1 Claude was your Creative Director. Today it changes
      hats and becomes your Lead Engineer. You'll scope your game to the smallest
      fun version, write a tiny spec, guess how long it'll take — then fire ONE
      shot and watch Claude build a playable Version 0.1 in seconds. The skill
      isn't code; it's telling an AI engineer exactly what you mean.`,
    goals: MODULE2_GOALS,
    steps: MODULE2_STEPS,
    start: `"Start Module 2 — let's build my first playable prototype."`,
    outro: `Don't celebrate yet 😄 — you'll build Version 0.1, not the whole
      game. That's how studios work: versions, not miracles. Save the session,
      then refresh here to claim your trophies.`,
  },
  3: {
    title: "Direct the Team",
    purpose: `You've got a playable game. Now stop being a passenger. Play
      Director: find what you don't like — a room, a name, the mood, a rule —
      and make the AI rebuild it your way. AI output is clay, not stone. Your
      taste is the whole job.`,
    goals: MODULE3_GOALS,
    steps: MODULE3_STEPS,
    start: `"Start Module 3 — I want to direct some changes to my game."`,
    outro: `Change one thing at a time, and always ask: does this feel more like
      MY game? Save the session, then refresh here to claim Director Mode.`,
  },
  4: {
    title: "Build a Second Brain",
    purpose: `You've felt the studio "remember" your game between sessions. Now
      learn the trick behind it: project memory. Open the memory files, see what
      they hold, and start writing to them yourself — so every session starts
      smarter than the last.`,
    goals: MODULE4_GOALS,
    steps: MODULE4_STEPS,
    start: `"Start Module 4 — teach me how the studio remembers."`,
    outro: `Memory is the difference between a chat and a studio. Write it in
      your own words. Save the session, then refresh here to claim Memory Keeper.`,
  },
  5: {
    title: "Read the Machine",
    purpose: `You've directed your game. You've remembered it. Now open it up.
      Claude puts its Lead Engineer hat back on and walks you through your game's
      OWN code — the machine you built. You'll find your <code>state</code> object
      (yes, the one from Module 4) living in real code, read a chunk and guess
      what it does BEFORE you're told, then make your first solo edit with your
      own hands. Your game climbs to Version 0.2.`,
    goals: MODULE5_GOALS,
    steps: MODULE5_STEPS,
    start: `"Start Module 5 — show me my own game's code and let me edit it."`,
    outro: `Read first, guess, then check — that's how you learn any machine. By
      the end you'll have changed your game by your own hand. Save the session,
      then refresh here to claim Code Reader and see Version 0.2.`,
  },
  6: {
    title: "Speak AI Fluently",
    purpose: `Words are your controller. This module makes you dangerous with a
      prompt: you'll see how "make it better" gets you noise, and how naming the
      WHO, WHAT, WHY and LIMITS gets you exactly what you pictured. You write the
      prompts yourself, sharpen them with a coach, and point them at real polish
      for your game — climbing it to Version 0.3.`,
    goals: MODULE6_GOALS,
    steps: MODULE6_STEPS,
    start: `"Start Module 6 — teach me to prompt like a pro and polish my game."`,
    outro: `The prompt is the skill of the decade — and you drive it. Write your
      own first, then sharpen. Save the session, then refresh here to claim AI
      Whisperer and see Version 0.3.`,
  },
  7: {
    title: "Create Worlds",
    purpose: `Time for the glow-up. Your game gets a real face — graphics and
      atmosphere that pull a player in. Here's the rule: YOU art-direct — the
      look, the mood, the palette come from your head first — and the studio
      paints to your direction. React, redirect, layer in light and motion and
      sound until it feels like your world. Your biggest visual jump yet:
      Version 0.4.`,
    goals: MODULE7_GOALS,
    steps: MODULE7_STEPS,
    start: `"Start Module 7 — I want to art-direct my game's real look."`,
    outro: `You're the Art Director; the AI holds the brush. Decide the feeling
      first, then make the studio chase it. Save the session, then refresh here
      to claim World Builder and see Version 0.4.`,
  },
  8: {
    title: "Design Great Games",
    purpose: `The real craft: making players feel clever. You'll design your
      game's NEXT room and its puzzle — with your own head, first and alone —
      while Claude waits, then pressure-tests it: is it fair? clear? clever? You
      also turn your new design eye on the room you already have and make it
      better (Version 0.5), and lock the blueprint for the room you'll build in
      Module 10.`,
    goals: MODULE8_GOALS,
    steps: MODULE8_STEPS,
    start: `"Start Module 8 — I want to design my game's next room and puzzle."`,
    outro: `Design first with your own head; let Claude poke holes after. A design
      you can defend is one worth building. Save the session, then refresh here to
      claim Game Designer and see Version 0.5.`,
  },
};

function openModule(n) {
  const st = moduleState(n, completedModulesState);
  if (st === "complete" || st === "active") return openMission(n);
  const m = MODULES[n - 1];
  const pad = (x) => String(x).padStart(2, "0");
  if (st === "queued") {
    return showModal(`
      <div class="locked-tease">
        <span class="lock-glyph">⏳</span>
        <p class="m-kicker">// MODULE ${pad(n)} — UP NEXT</p>
        <h3>${m.title}</h3>
        <p class="tease-line">${m.teaser}</p>
        <p>Dad's opened this one — it unlocks the moment you finish
        <strong>Module ${pad(n - 1)}</strong>. Keep going, Director.</p>
        <p class="redirect">▸ FINISH MODULE ${pad(n - 1)} TO UNLOCK</p>
      </div>`);
  }
  showModal(`
    <div class="locked-tease">
      <span class="lock-glyph">🔒</span>
      <p class="m-kicker">// MODULE ${pad(n)} — SEALED</p>
      <h3>${m.title}</h3>
      <p class="tease-line">${m.teaser}</p>
      <p>That's all you get. This door doesn't open with curiosity — it opens with progress.</p>
      <p class="redirect">▸ RETURN TO YOUR UNLOCKED MODULES</p>
    </div>`);
}

function openMission(n) {
  const mi = MISSIONS[n];
  if (!mi) return;
  const done = missionStepsDone[n] || [];
  const steps = mi.steps.map((s, i) =>
    `<li class="${done[i] ? "done" : ""}">${s}</li>`).join("");
  showModal(`
    <p class="m-kicker">// MODULE ${String(n).padStart(2, "0")} — UNLOCKED — MISSION BRIEFING</p>
    <h3>${mi.title}</h3>
    <p class="m-purpose">${mi.purpose}</p>

    <h4>WHAT YOU'LL LEARN</h4>
    <ul class="goal-list">${mi.goals.map((g) => `<li>${g}</li>`).join("")}</ul>

    <h4>MISSION FLOW</h4>
    <ol class="mission-steps">${steps}</ol>

    <h4>HOW TO START</h4>
    <p class="m-purpose">Open <strong>Claude Code</strong> in this project folder and say:</p>
    <blockquote>${mi.start}</blockquote>
    <p class="m-purpose">${mi.outro}</p>`);
}

function openBonusMission() {
  const done = missionStepsDone["bonus"] || [];
  const steps = BONUS.steps.map((s, i) => `<li class="${done[i] ? "done" : ""}">${s}</li>`).join("");
  showModal(`
    <p class="m-kicker">// ★ BONUS MISSION — UNLOCKED — MISSION BRIEFING</p>
    <h3>${BONUS.title}</h3>
    <p class="m-purpose">${BONUS.purpose}</p>

    <h4>WHAT YOU'LL LEARN</h4>
    <ul class="goal-list">${BONUS.goals.map((g) => `<li>${g}</li>`).join("")}</ul>

    <h4>MISSION FLOW</h4>
    <ol class="mission-steps">${steps}</ol>

    <h4>HOW TO START</h4>
    <p class="m-purpose">Open <strong>Claude Code</strong> in this project folder and say:</p>
    <blockquote>${BONUS.start}</blockquote>
    <p class="m-purpose">${BONUS.outro}</p>`);
}

function showModal(html) {
  $("modal-content").innerHTML = html;
  $("modal-backdrop").hidden = false;
  document.body.style.overflow = "hidden";
}
function closeModal() {
  $("modal-backdrop").hidden = true;
  document.body.style.overflow = "";
}
$("modal-close").addEventListener("click", closeModal);
$("modal-backdrop").addEventListener("click", (e) => { if (e.target === $("modal-backdrop")) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

// The hero button targets the current active module (wired in boot()).

/* ---------------- easter eggs ---------------- */

function toast(msg, ms = 4200) {
  const t = $("toast");
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.hidden = true; }, ms);
}

// Egg 1 — Konami code: glitch mode.
const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
let konamiPos = 0;
document.addEventListener("keydown", (e) => {
  konamiPos = e.key === KONAMI[konamiPos] ? konamiPos + 1 : (e.key === KONAMI[0] ? 1 : 0);
  if (konamiPos === KONAMI.length) {
    konamiPos = 0;
    document.body.classList.toggle("glitch");
    toast(document.body.classList.contains("glitch")
      ? "⚠ GLITCH MODE ENGAGED — you found the old code. Tell Claude: “I found the glitch.”"
      : "GLITCH MODE DISENGAGED — systems nominal.");
  }
});

// Egg 2 — click the logo 7 times: a message from the founders.
let logoClicks = 0, logoTimer;
$("studio-logo").addEventListener("click", () => {
  logoClicks++;
  clearTimeout(logoTimer);
  logoTimer = setTimeout(() => { logoClicks = 0; }, 3000);
  if (logoClicks === 7) {
    logoClicks = 0;
    toast("🗝 FOUNDER'S NOTE: every great studio was once one kid with one idea. — Dad");
  }
});

// Egg 3 — the lonely dot in the footer.
$("footer-secret").addEventListener("click", () => {
  toast("👁 You clicked the dot nobody clicks. Curiosity like that pays off around here…");
});

// Egg 4 — type "pillars" anywhere on the page.
let typed = "";
document.addEventListener("keypress", (e) => {
  typed = (typed + e.key).slice(-7);
  if (typed === "pillars") toast("🏛 Whisper received. Pillars hold up worlds. Yours are waiting in Module 1, step 6.");
});

// Egg 5 — for those who open the console. Future developers always do.
console.log(
  "%c◢◤ ELI AI GAME STUDIO ◢◤\n" +
  "%cWell, well. Opening the console already?\n" +
  "That's exactly the kind of curiosity this studio was built for.\n" +
  "Mention 'the console egg' to Claude Code sometime. 🥚",
  "color:#29e0ff;font-size:16px;font-weight:bold;font-family:monospace",
  "color:#8b5cf6;font-size:12px;font-family:monospace"
);

/* ---------------- boot ---------------- */

(async function boot() {
  const [memoryMd, achMd] = (await Promise.all([
    loadMd("MEMORY.md", FALLBACK_MEMORY),
    loadMd("ACHIEVEMENTS.md", FALLBACK_ACHIEVEMENTS),
  ])).map(stripComments);

  const { completedModules } = renderProgress(memoryMd);
  completedModulesState = completedModules;
  missionStepsDone = {};
  for (let n = 1; n <= MODULES.length; n++) {
    missionStepsDone[n] = checkboxes(section(memoryMd, `Module ${n} Steps`)).map((c) => c.done);
  }
  missionStepsDone["bonus"] = checkboxes(section(memoryMd, "Bonus Steps")).map((c) => c.done);
  const rState = rewardState(memoryMd, achMd);
  renderVersion(memoryMd);
  renderModules(completedModules);
  renderBonus(rState.earnedNames);
  renderStudioStatus(rState);
  renderMemory(memoryMd);
  renderClaudePanel(memoryMd);
  renderReview(memoryMd);
  renderAchievements(achMd);
  renderRewards(rState);

  // Hero button → the currently active (playable, unfinished) module.
  const active = MODULES.find((m) => moduleState(m.n, completedModules) === "active");
  const cta = $("cta-module1");
  if (cta && active) {
    cta.textContent = `▸ ENTER MODULE ${active.n}`;
    cta.addEventListener("click", () => openMission(active.n));
  }
})();
