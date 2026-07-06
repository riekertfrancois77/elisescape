/* =====================================================================
   One Night at Thornwood Manor — Version 0.1
   The game's brain.  Written to be READ, not just run — every part is
   commented so Eli can see how it works.

   The whole game is really just three ideas:
     1. STATE  — what the game remembers (what you've noticed, what's open).
     2. SCREENS — showing one screen at a time (title, story, room, win).
     3. REACTIONS — when you click a thing, something happens.
   ===================================================================== */


/* ---------------------------------------------------------------------
   1. STATE — the game's memory.
   Real detective games have to REMEMBER things: which clues you found,
   whether the door is open. This little object is that memory.
   --------------------------------------------------------------------- */
const state = {
  hasKey: false, // Has the detective set the clock and taken the hidden key?
  clues: [],     // The list of clues in the notebook.
};

// The one true answer: the time of the murder. You DON'T get told it — you
// DEDUCE it from the clues, then turn the great clock's hands to it to release
// the hidden key. 9:47 = the 9 o'clock hour, thirteen minutes before ten.
const MURDER_TIME = "9:47";


/* ---------------------------------------------------------------------
   1b. SOUND — made entirely with code (the Web Audio API), no sound files.
   The manor's OTHER clocks tick softly (tick... tock...), a low murmur of
   the party hums underneath, a chime rings when you find a clue, and the
   lock clicks open when you win. The ticking makes the STOPPED clock feel
   even more wrong — everything ticks except the one that matters.
   --------------------------------------------------------------------- */
let audioCtx = null;   // the sound engine (created on the first click)
let muted = false;     // is sound turned off?
let tickTimer = null;  // the repeating tick... tock...
let murmur = null;     // the low party hum

// Turn the sound engine on. Browsers only allow this after a user clicks,
// so we call it from the "Begin the night" button.
function initAudio() {
  if (audioCtx) return;
  const AudioEngine = window.AudioContext || window.webkitAudioContext;
  if (!AudioEngine) return; // very old browser — game still works, just silent
  audioCtx = new AudioEngine();
}

// Play one short sound (a "note") with a soft fade in and out so it never clicks.
function beep(freq, startVol, seconds, type) {
  if (!audioCtx || muted) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type || "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(startVol, now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + seconds);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + seconds + 0.02);
}

// The soft wooden tick of a clock.
function tick(high) {
  beep(high ? 880 : 660, 0.05, 0.05, "sine");
}

// Start the room's atmosphere: ticking + a low party murmur.
function startAmbience() {
  if (!audioCtx) return;

  // tick... tock... once a second, alternating pitch.
  if (tickTimer) clearInterval(tickTimer);
  let high = true;
  tickTimer = setInterval(function () {
    tick(high);
    high = !high;
  }, 1000);

  // A low murmur of the party: quiet filtered noise, like distant voices.
  if (murmur) return; // only build it once
  const size = audioCtx.sampleRate * 2;
  const buffer = audioCtx.createBuffer(1, size, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < size; i++) data[i] = Math.random() * 2 - 1; // static
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  const lowpass = audioCtx.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = 380; // muffle it so it sounds far away
  const vol = audioCtx.createGain();
  vol.gain.value = 0.02; // very quiet
  source.connect(lowpass).connect(vol).connect(audioCtx.destination);
  source.start();
  murmur = vol;
}

// Stop the ticking (used when the night's puzzle is solved).
function stopTicking() {
  if (tickTimer) { clearInterval(tickTimer); tickTimer = null; }
}

// A little rising chime — you found something.
function chime() {
  beep(660, 0.06, 0.18, "triangle");
  setTimeout(function () { beep(990, 0.06, 0.25, "triangle"); }, 90);
}

// A deep brass "click", then a warm chord — the lock opens.
function unlockSound() {
  beep(150, 0.09, 0.18, "square");
  setTimeout(function () { beep(392, 0.05, 0.5, "sine"); }, 120); // G
  setTimeout(function () { beep(523, 0.05, 0.6, "sine"); }, 180); // C
}

// A single soft, low click — a hidden panel in the clock's case springing open.
// Deliberately NOT the happy "chime": Version C never congratulates you. When
// you set the clock right, it just quietly clicks. You decide if you got it.
function keyClick() {
  beep(180, 0.07, 0.12, "square");
  setTimeout(function () { beep(240, 0.04, 0.1, "sine"); }, 70);
}


/* ---------------------------------------------------------------------
   2. SCREENS — show one, hide the rest.
   --------------------------------------------------------------------- */
function showScreen(id) {
  // Turn every screen off...
  document.querySelectorAll(".screen").forEach(function (screen) {
    screen.classList.remove("active");
  });
  // ...then turn on just the one we want.
  document.getElementById(id).classList.add("active");
}


/* ---------------------------------------------------------------------
   3a. THE STORY INTRO — a few lines, click to advance.
   This is the "first 60 seconds" Eli designed: welcomed and curious,
   then the first cold prickle that something is wrong.
   --------------------------------------------------------------------- */
const storyLines = [
  "You are the famous detective. Tonight, a coach brings you to Thornwood Manor — warm windows glowing, music and laughter spilling into the cold.",
  "Inside, the house party glitters. Golden lamplight, clinking glasses, a hundred easy smiles. A cozy, welcoming place.",
  "Then a scream. The host — the powerful owner of this manor — has been found dead. Murdered. Tonight, of all nights.",
  "The doors are barred. No one may leave. Which means the killer... is still inside, hiding among the guests.",
  "You know this killer. You've chased them for years, always one step behind. But tonight they are trapped in the same house as you.",
  "Steady yourself, Detective. Look closely. Somewhere in this warm, ordinary room, something is quietly wrong.",
];
let storyIndex = 0;

function showNextStoryLine() {
  if (storyIndex < storyLines.length) {
    document.getElementById("story-text").textContent = storyLines[storyIndex];
    storyIndex = storyIndex + 1;
    // On the last line, change the button so the player knows they're entering the room.
    if (storyIndex === storyLines.length) {
      document.getElementById("story-next").textContent = "Enter the foyer";
    }
  } else {
    showScreen("room-screen"); // Story's done — into the game!
    startAmbience();            // the room comes alive: ticking + murmur
  }
}


/* ---------------------------------------------------------------------
   3b. THE NOTEBOOK — add a clue and show it on screen.
   --------------------------------------------------------------------- */
function addClue(text, silent) {
  // Don't add the same clue twice.
  if (state.clues.indexOf(text) !== -1) return;
  state.clues.push(text);

  const list = document.getElementById("clue-list");
  const emptyNote = list.querySelector(".empty");
  if (emptyNote) emptyNote.remove(); // remove the "no clues yet" line

  const li = document.createElement("li");
  li.textContent = text;
  list.appendChild(li);

  // Every clue rings the same soft chime — so the sound never singles out any
  // one thing. The KEY, though, is added silently (silent = true): Version C
  // gives you no "correct!" fanfare when you finally crack it.
  if (!silent) chime();
}


/* ---------------------------------------------------------------------
   3c. EXAMINE — write what the detective sees into the panel.
   --------------------------------------------------------------------- */
function examine(text) {
  document.getElementById("examine-text").textContent = text;
  // Looking at anything else puts the brass dial away.
  const dial = document.getElementById("dial");
  if (dial) dial.innerHTML = "";
}


/* ---------------------------------------------------------------------
   3d. REACTIONS — what each object in the room says when you click it.
   Most things are cozy and innocent (that's the disguise). Only ONE
   thing is truly off — the great clock.
   --------------------------------------------------------------------- */
function clickObject(object) {
  if (object === "guests") {
    // CLUE 1 — a lower bound. He was alive at 9:30.
    examine("A guest dabs her eyes and remembers the host's final toast. 'Half past nine, sharp,' she says. 'He raised his glass, and he was merry.' So the host was still alive at 9:30.");
    addClue("The host was alive at 9:30 — his last toast.");

  } else if (object === "fireplace") {
    // CLUE 2 — the hour. It happened in the 9 o'clock hour.
    examine("A spent match lies in the cooling ash, and the tall mantel candle — marked with the hours — has burned down into its nine-o'clock ring. Whatever happened, happened within the nine-o'clock hour.");
    addClue("It happened in the 9 o'clock hour — the candle and the match.");

  } else if (object === "portrait") {
    // THE TRAP — the pocket watch reads 9:52, but it always ran fast. Trust it
    // and you set the clock wrong. A true detective triangulates instead.
    examine("Beneath the host's proud portrait, on a side table, lies his gold pocket watch — smashed in the struggle, its hands frozen at 9:52. Yet every guest knew the truth: the host's watch always ran a few minutes fast.");
    addClue("The host's pocket watch stopped at 9:52 — but it always ran fast.");

  } else if (object === "coats") {
    // CLUE 3 — the exact minute, by deduction. 10:00 minus 13 = 9:47.
    examine("By the cloakroom, a trembling guest swears to what he heard: 'The scream tore through the hall thirteen minutes before the clock would have struck ten. I was counting down to the hour.'");
    addClue("The scream came 13 minutes before 10:00.");

  } else if (object === "clock") {
    // The great clock is now the LOCK: set its hands to the deduced time.
    handleClock();

  } else if (object === "door") {
    handleDoor();
  }
}


/* ---------------------------------------------------------------------
   THE CLOCK — the heart of the room. This is the "notice what's off".
   --------------------------------------------------------------------- */
function handleClock() {
  // If the puzzle's already solved, the panel is open and empty.
  if (state.hasKey) {
    examine("The great clock stands with its little panel open — empty now. You've already taken the key.");
    return;
  }

  // The clock is the LOCK. A small lever lets you turn the hands. You must set
  // them to the time of the murder — a time the clock will NOT tell you. You
  // have to have deduced it from the clues.
  examine("The great hall clock — brass, taller than you are. Its hands hang still, and a small lever will turn them. Set them to the moment of the murder.");

  const dial = document.getElementById("dial");
  dial.innerHTML = ""; // start fresh

  const input = document.createElement("input");
  input.type = "text";
  input.inputMode = "numeric";
  input.maxLength = 5; // "9:47" or "947"
  input.placeholder = "set the hands (e.g. 9:47)";
  input.className = "dial-input";

  const btn = document.createElement("button");
  btn.textContent = "Turn the hands";
  btn.className = "dial-btn";

  const msg = document.createElement("p");
  msg.className = "dial-msg";

  function tryTime() {
    const cleaned = input.value.replace(/[^0-9]/g, "");
    const target = MURDER_TIME.replace(/[^0-9]/g, "");
    if (cleaned === target) {
      // VERSION C: no "correct!" — just a soft click and the key, quietly.
      state.hasKey = true;
      keyClick();
      addClue("🔑 A brass key, hidden inside the clock's case.", true); // silent
      examine("You turn the hands to the hour of death. Deep in the old case something shifts — a soft click — and a little panel springs open. Inside lies a brass key. You take it.");
    } else {
      // No hint. No pointing back at the clues. You have to be sure.
      msg.textContent = "The hands turn. The old clock ticks on, and nothing stirs.";
    }
  }

  btn.addEventListener("click", tryTime);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") tryTime();
  });

  dial.append(input, btn, msg);
  input.focus();
}


/* ---------------------------------------------------------------------
   THE DOOR — the way deeper. It opens only with the brass KEY, and the key
   only comes from setting the clock to the time you deduced. So the whole
   chain must be solved: clues -> the time -> the clock -> the key -> the door.
   --------------------------------------------------------------------- */
function handleDoor() {
  // The door now takes a KEY — the one hidden in the clock. No key, no passage.
  if (!state.hasKey) {
    examine("The way deeper is a heavy oak door, locked fast. No handle turns it, no shoulder shifts it. This one wants a key — and you don't have it yet.");
    return;
  }
  // You have the key. It turns.
  win();
}


/* ---------------------------------------------------------------------
   WIN — the way opens. End of Version 0.1.
   Note the wink at the end: the first clue will matter again later.
   That's "setup and payoff" — exactly like Eli's design.
   --------------------------------------------------------------------- */
function win() {
  stopTicking();  // the ticking falls silent as the lock turns
  unlockSound();  // a deep brass click, then a warm chord
  document.getElementById("win-text").innerHTML =
    "The brass key bites into the lock and turns with a deep click. The oak door swings inward onto a dark corridor — the manor's hidden heart, where the killer fled." +
    "<br /><br />You noticed what everyone else walked past. You saw the one thing that was wrong." +
    "<br /><br /><em>Remember the time on that clock, Detective. You'll need it again before dawn.</em>";
  showScreen("win-screen");
}


/* ---------------------------------------------------------------------
   RESET — let the player start over.
   --------------------------------------------------------------------- */
function resetGame() {
  state.hasKey = false;
  state.clues = [];

  // Clear the notebook back to empty.
  const list = document.getElementById("clue-list");
  list.innerHTML = '<li class="empty">No clues yet. Look closer.</li>';

  // Reset the examine text and hide the clock back in shadow.
  examine("You stand in the warm glow of the foyer. Click things to look closely, Detective.");
  const clockEl = document.querySelector('.hotspot[data-object="clock"]');
  clockEl.classList.remove("noticed");
  clockEl.classList.add("dim");
  document.querySelector('.hotspot[data-object="door"]').classList.remove("unlocked");

  // Reset the story.
  storyIndex = 0;
  document.getElementById("story-next").textContent = "Continue";
}


/* ---------------------------------------------------------------------
   WIRING — connect the buttons and hotspots to the functions above.
   This runs once when the page loads.
   --------------------------------------------------------------------- */
// Title screen: "Begin the night" -> turn on sound + show the story.
document.getElementById("begin-btn").addEventListener("click", function () {
  initAudio(); // browsers allow sound only after a click — this is that click
  showScreen("story-screen");
  showNextStoryLine();
});

// Sound on/off button.
document.getElementById("mute-btn").addEventListener("click", function () {
  muted = !muted;
  this.textContent = muted ? "🔇" : "🔊";
});

// Story screen: "Continue" -> next line, or into the room.
document.getElementById("story-next").addEventListener("click", showNextStoryLine);

// Every hotspot in the room calls clickObject with its name.
document.querySelectorAll(".hotspot").forEach(function (spot) {
  spot.addEventListener("click", function () {
    clickObject(spot.dataset.object);
  });
});

// Win screen: "Play again" -> reset and back to the title.
document.getElementById("replay-btn").addEventListener("click", function () {
  resetGame();
  showScreen("title-screen");
});

// Start the game on the title screen.
showScreen("title-screen");
