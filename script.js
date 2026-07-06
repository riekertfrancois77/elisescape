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
  { n: 2,  title: "One-Shot Power",                teaser: "Make Claude build something real from a single, perfect prompt. One shot. No edits." },
  { n: 3,  title: "Director Mode",                 teaser: "Stop typing code requests. Start running a studio. You give direction; the team executes." },
  { n: 4,  title: "Project Memory",                teaser: "Teach the studio to remember everything, so every session starts smarter than the last." },
  { n: 5,  title: "Code Reading",                  teaser: "See through the machine. Read code the way a director reads a script." },
  { n: 6,  title: "Prompt Engineering",            teaser: "Words are your controller. Learn the inputs that make AI do exactly what you mean." },
  { n: 7,  title: "Puzzle Design",                 teaser: "The secret craft of making players feel clever." },
  { n: 8,  title: "Build One Feature",             teaser: "The first real piece of your game gets built. For real. This is where it begins." },
  { n: 9,  title: "Debugging",                     teaser: "Things will break. Directors don't panic — they hunt." },
  { n: 10, title: "AI Art, Audio and Atmosphere",  teaser: "Give your world a face, a voice, and a mood." },
  { n: 11, title: "Real-World Crossover",          teaser: "Your studio skills escape the screen. The things you design in the real world become game mechanics." },
  { n: 12, title: "The Machine Room",              teaser: "Peek behind the studio's own walls. Harnesses, agents, and MCP — the wiring that lets AI read, remember, and act." },
  { n: 13, title: "Ship and Demo",                 teaser: "Release day. An audience. Your game, in other people's hands." },
];

// Dad has opened modules 1..N. Opened modules unlock IN ORDER — a module only
// becomes playable once the one before it is complete. Modules past this number
// stay sealed until Dad opens them. (Dad opened through 4 on 2026-07-06.)
const DAD_OPENED_THROUGH = 4;

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
  "Claude re-reads your design — the build comes from YOUR decisions.",
  "MVP thinking: \"If we only had two hours, what's the smallest version that's still fun?\"",
  "Write a tiny spec together — one room, one locked door, one puzzle, one key.",
  "One shot — Claude builds the whole playable Version 0.1 into the game/ folder.",
  "Play it in the browser.",
  "Don't celebrate yet — that's Version 0.1, not the whole game. Studios build versions.",
  "AI Review — Claude rates its own build: what works, what's missing.",
  "Peek under the hood — just 3 files, no frameworks. Software can be simple.",
  "Make ONE change and watch it update — a taste of directing (the real thing is Module 3).",
  "Trophies: One-Shot Power + First Playable.",
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
  { label: "Discover secret achievements", per: 5, cap: 5, when: "$5 each — keep exploring",
    count: (s) => s.secretCount },
  { label: "Ship & demo your game to the family — Module 13", amount: 25, when: "Module 13 complete",
    earned: (s) => s.moduleDone[12] === true },
  { label: "Finish the whole 13-module journey", amount: 25, when: "all 13 modules complete",
    earned: (s) => s.allDone },
];

/* ---------------- embedded fallback state ----------------
   Used when the dashboard is opened as file:// and fetch() of
   the Markdown files is blocked by the browser. Mirrors the
   starting state of MEMORY.md / ACHIEVEMENTS.md.               */

const FALLBACK_MEMORY = `
## Progress Tracker
- [ ] Module 1
- [ ] Module 2
- [ ] Module 3
- [ ] Module 4
- [ ] Module 5
- [ ] Module 6
- [ ] Module 7
- [ ] Module 8
- [ ] Module 9
- [ ] Module 10
- [ ] Module 11
- [ ] Module 12
- [ ] Module 13

## Module 1 Steps
- [ ] 1
- [ ] 2
- [ ] 3
- [ ] 4
- [ ] 5
- [ ] 6
- [ ] 7
- [ ] 8
- [ ] 9
- [ ] 10
- [ ] 11
- [ ] 12
- [ ] 13

## Session Memory
- The studio has been founded. All systems online.
- Module 1 is unlocked and waiting: **Think Like a Game Studio**.
- No game exists yet. That's the point — it starts in Eli's head.

## Claude Instructions
Open Claude Code in this folder and say:

> **"Start Module 1. I'm ready to think like a game studio."**

Claude will welcome you to the studio and ask you the first big question. Answer honestly — there are no wrong answers, only *your* answers.
`;

const FALLBACK_ACHIEVEMENTS = `
## Visible Achievements
- [ ] **Creative Director**
- [ ] **First Big Decision**
- [ ] **Game Pillars Chosen**
- [ ] **Studio Review Complete**
- [ ] **Memory Created**
- [ ] **One-Shot Power**
- [ ] **First Playable**
- [ ] **Director Mode**
- [ ] **Memory Keeper**

## Secret Achievements
- [ ] **Curiosity Pays**
- [ ] **Better Than School**
- [ ] **AI Tamer**
- [ ] **Bug Hunter**
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

  document.querySelectorAll(".module-card").forEach((card) => {
    const open = () => openModule(Number(card.dataset.module));
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });
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

/* ---------------- modal ---------------- */

// Per-module step completion, read from MEMORY.md "## Module N Steps".
let missionStepsDone = {};
// Module completion array (from MEMORY.md Progress Tracker), for gating.
let completedModulesState = [];

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
    title: "One-Shot Power",
    purpose: `You became a Creative Director. Now learn to direct an AI
      engineering team. You'll scope your game down to the smallest fun version,
      write a tiny spec, and fire ONE shot — watching Claude build a real,
      playable Version 0.1 of your game in the browser. The skill isn't code;
      it's telling an AI engineer exactly what you mean.`,
    goals: MODULE2_GOALS,
    steps: MODULE2_STEPS,
    start: `"Start Module 2 — let's use One-Shot Power to build my game."`,
    outro: `Don't celebrate yet 😄 — you'll build Version 0.1, not the whole
      game. That's how studios work: versions, not miracles. Save the session,
      then refresh here to claim your trophies.`,
  },
  3: {
    title: "Director Mode",
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
    title: "Project Memory",
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
  renderModules(completedModules);
  renderMemory(memoryMd);
  renderClaudePanel(memoryMd);
  renderAchievements(achMd);
  renderRewards(rewardState(memoryMd, achMd));

  // Hero button → the currently active (playable, unfinished) module.
  const active = MODULES.find((m) => moduleState(m.n, completedModules) === "active");
  const cta = $("cta-module1");
  if (cta && active) {
    cta.textContent = `▸ ENTER MODULE ${active.n}`;
    cta.addEventListener("click", () => openMission(active.n));
  }
})();
