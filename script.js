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
    locked: false,
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

const ACHIEVEMENTS = [
  { name: "Creative Director",      desc: "Complete Module 1 and lock in your game's direction." },
  { name: "First Big Decision",     desc: "Choose, reject, or combine the three game directions." },
  { name: "Game Pillars Chosen",    desc: "Define the 3–5 pillars every decision gets tested against." },
  { name: "Studio Review Complete", desc: "Survive your first studio team review." },
  { name: "Memory Created",         desc: "The design harness exists and the studio brain knows your game." },
];
const SECRET_ACHIEVEMENTS = ["Curiosity Pays", "Better Than School", "AI Tamer", "Bug Hunter", "Game Studio Brain"];

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

function renderModules(completedModules) {
  $("modules-grid").innerHTML = MODULES.map((m) => {
    const done = completedModules[m.n - 1];
    const cls = m.locked === false ? (done ? "unlocked done" : "unlocked") : "locked";
    const badge = m.locked === false ? (done ? "COMPLETE" : "UNLOCKED") : "LOCKED";
    return `
      <article class="module-card ${cls}" data-module="${m.n}" tabindex="0"
               role="button" aria-label="Module ${m.n}: ${m.title} (${badge})">
        <span class="module-badge">${badge}</span>
        <div class="module-num">${String(m.n).padStart(2, "0")}</div>
        <div class="module-title">${m.title}</div>
        <p class="module-teaser">${m.teaser}</p>
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

/* ---------------- modal ---------------- */

let module1StepsDone = [];

function openModule(n) {
  if (n === 1) return openMission();
  const m = MODULES[n - 1];
  showModal(`
    <div class="locked-tease">
      <span class="lock-glyph">🔒</span>
      <p class="m-kicker">// MODULE ${String(n).padStart(2, "0")} — SEALED</p>
      <h3>${m.title}</h3>
      <p class="tease-line">${m.teaser}</p>
      <p>That's all you get. This door doesn't open with curiosity — it opens with progress.</p>
      <p class="redirect">▸ RETURN TO MODULE 01 — THINK LIKE A GAME STUDIO</p>
    </div>`);
}

function openMission() {
  const steps = MODULE1_STEPS.map((s, i) =>
    `<li class="${module1StepsDone[i] ? "done" : ""}">${s}</li>`).join("");
  showModal(`
    <p class="m-kicker">// MODULE 01 — UNLOCKED — MISSION BRIEFING</p>
    <h3>Think Like a Game Studio</h3>
    <p class="m-purpose">Design your own game from scratch — before any coding
    begins. Real studios don't start with code; they start with decisions.
    Nobody knows what your game is yet. Not even the AI. Especially not the
    AI. It's waiting for its Director.</p>

    <h4>WHAT YOU'LL LEARN</h4>
    <ul class="goal-list">${MODULE1_GOALS.map((g) => `<li>${g}</li>`).join("")}</ul>

    <h4>MISSION FLOW</h4>
    <ol class="mission-steps">${steps}</ol>

    <h4>HOW TO START</h4>
    <p class="m-purpose">Open <strong>Claude Code</strong> in this project folder and say:</p>
    <blockquote>"Start Module 1. I'm ready to think like a game studio."</blockquote>
    <p class="m-purpose">Claude runs the mission. You make the decisions. When
    you're done for the day, tell Claude to save the session — then come back
    here and refresh. The studio remembers.</p>`);
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

$("cta-module1").addEventListener("click", () => openMission());

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

  const { completedModules, stepsDone } = renderProgress(memoryMd);
  module1StepsDone = stepsDone;
  renderModules(completedModules);
  renderMemory(memoryMd);
  renderClaudePanel(memoryMd);
  renderAchievements(achMd);
})();
