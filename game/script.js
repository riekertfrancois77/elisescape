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
// the hidden key. 10:36 = the 10 o'clock hour, twenty-four minutes before eleven.
const MURDER_TIME = "10:36";


/* ---------------------------------------------------------------------
   1b. SOUND — made entirely with code (the Web Audio API), no sound files.
   The manor's OTHER clocks tick softly (tick... tock...), a low murmur of
   the party hums underneath, a chime rings when you find a clue, and the
   lock clicks open when you win. The ticking makes the STOPPED clock feel
   even more wrong — everything ticks except the one that matters.
   --------------------------------------------------------------------- */
let audioCtx = null;     // the sound engine (created on the first click)
let muted = false;       // is sound turned off?
let tickTimer = null;    // the repeating tick... tock...
let murmur = null;        // the low party hum
let ambienceTimer = null; // the random "room is alive" sounds
let hallOscA = null, hallOscB = null, hallGain = null; // warm grand-hall drone

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

// The soft wooden tick of a clock. Quieter now — it's just ONE voice in the
// room, not the loud thing that gives the clock away.
function tick(high) {
  beep(high ? 880 : 660, 0.028, 0.05, "sine");
}

// A short burst of filtered static — the raw material for crackles and pops.
function noiseBurst(seconds, vol, freq, band) {
  if (!audioCtx || muted) return;
  const size = Math.max(1, Math.floor(audioCtx.sampleRate * seconds));
  const buffer = audioCtx.createBuffer(1, size, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < size; i++) data[i] = Math.random() * 2 - 1;
  const src = audioCtx.createBufferSource();
  src.buffer = buffer;
  const filter = audioCtx.createBiquadFilter();
  filter.type = band || "bandpass";
  filter.frequency.value = freq;
  const g = audioCtx.createGain();
  const now = audioCtx.currentTime;
  g.gain.setValueAtTime(vol, now);
  g.gain.exponentialRampToValueAtTime(0.0001, now + seconds);
  src.connect(filter).connect(g).connect(audioCtx.destination);
  src.start(now);
  src.stop(now + seconds + 0.02);
}

// The fireplace: a little run of tiny pops and snaps.
function crackle() {
  const n = 2 + Math.floor(Math.random() * 3);
  for (let i = 0; i < n; i++) {
    setTimeout(function () {
      noiseBurst(0.03, 0.05, 1200 + Math.random() * 2200);
    }, i * (50 + Math.random() * 120));
  }
}

// A far-off clink of glasses at the party.
function glassClink() {
  beep(1568, 0.03, 0.12, "triangle");
  setTimeout(function () { beep(2093, 0.02, 0.14, "triangle"); }, 55);
}

// A single wistful piano note drifting in from another room.
function pianoNote() {
  const notes = [392, 440, 494, 587, 659]; // G A B D E — a soft, sad little scale
  beep(notes[Math.floor(Math.random() * notes.length)], 0.035, 0.7, "triangle");
}

// An old house settling — a low wooden creak.
function creak() {
  if (!audioCtx || muted) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(90, now);
  osc.frequency.exponentialRampToValueAtTime(52, now + 0.5);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(0.03, now + 0.05);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
  const lp = audioCtx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 300;
  osc.connect(lp).connect(g).connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + 0.55);
}

// A distant swell of party laughter.
function laughter() {
  const base = 300 + Math.random() * 80;
  for (let i = 0; i < 4; i++) {
    setTimeout(function () {
      beep(base + (i % 2 ? 40 : -30) + Math.random() * 20, 0.02, 0.09, "sine");
    }, i * 90);
  }
}

// Every few seconds, one random sound of life fills the room. This is the fix
// for "the ticking gives the clock away" — now the tick is lost in a crowd of
// crackles, clinks, piano and laughter.
function scheduleRoomSound() {
  if (!audioCtx) return;
  const delay = 2500 + Math.random() * 4000; // 2.5–6.5 seconds apart
  ambienceTimer = setTimeout(function () {
    const roll = Math.random();
    if (roll < 0.32) crackle();
    else if (roll < 0.58) glassClink();
    else if (roll < 0.80) pianoNote();
    else if (roll < 0.93) creak();
    else laughter();
    scheduleRoomSound(); // keep the room breathing
  }, delay);
}

// A warm, low grand-hall drone — a soft low note and a quiet fifth above it,
// muffled so it sits UNDER everything like the air of a big rich room. Its
// gentle dissonance is the "warm but wrong" mood Eli art-directed, in sound.
function startHallTone() {
  if (!audioCtx || hallGain) return;
  hallGain = audioCtx.createGain();
  const lp = audioCtx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 260; // muffle it so it's felt more than heard
  hallOscA = audioCtx.createOscillator();
  hallOscA.type = "sine";
  hallOscA.frequency.value = 110;    // a low, warm root
  hallOscB = audioCtx.createOscillator();
  hallOscB.type = "sine";
  hallOscB.frequency.value = 164.81; // a soft fifth above — grand, a touch uneasy
  hallOscA.connect(hallGain);
  hallOscB.connect(hallGain);
  hallGain.connect(lp).connect(audioCtx.destination);
  const now = audioCtx.currentTime;
  hallGain.gain.setValueAtTime(0.0001, now);
  hallGain.gain.exponentialRampToValueAtTime(0.014, now + 3); // fade in slowly
  hallOscA.start();
  hallOscB.start();
}

// Start the room's atmosphere: a quiet tick, a party murmur, and a living
// room full of random sounds.
function startAmbience() {
  if (!audioCtx) return;
  startHallTone(); // the warm grand-hall drone underneath it all

  // tick... tock... once a second, alternating pitch (quiet now).
  if (tickTimer) clearInterval(tickTimer);
  let high = true;
  tickTimer = setInterval(function () {
    tick(high);
    high = !high;
  }, 1000);

  // the living, breathing room: crackles, clinks, piano, creaks, laughter.
  if (ambienceTimer) clearTimeout(ambienceTimer);
  scheduleRoomSound();

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

// Stop the ticking AND the room sounds (used when the night's puzzle is solved).
function stopAmbience() {
  if (tickTimer) { clearInterval(tickTimer); tickTimer = null; }
  if (ambienceTimer) { clearTimeout(ambienceTimer); ambienceTimer = null; }
  // Let the grand-hall drone fade out too, so the room truly hushes on the win.
  if (hallGain) {
    const now = audioCtx.currentTime;
    hallGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
    if (hallOscA) hallOscA.stop(now + 0.7);
    if (hallOscB) hallOscB.stop(now + 0.7);
    hallGain = null; hallOscA = null; hallOscB = null;
  }
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
    // CLUE 1 — a lower bound, told as testimony. The notebook records only the
    // FACT (a half-hour chime just gone ten); the detective must realise that
    // means the host was still alive at 10:30.
    examine("A tearful guest clutches your sleeve. 'His last toast — he raised his glass the very moment the hall clock chimed the half hour, just gone ten. So merry, he was. Who could have...' Her voice breaks.");
    addClue("Host's last toast: on the half-hour chime, just gone ten.");

  } else if (object === "fireplace") {
    // CLUE 2 — the hour, told obliquely. You read a burnt candle, not a sentence
    // that says "the 9 o'clock hour".
    examine("On the mantel, a tall candle is scored with a ring for every hour. Its flame has eaten down past the tenth ring — but stops short of the eleventh. Beside it lies a single spent match.");
    addClue("Candle burned past the 10th hour-ring, not yet the 11th.");

  } else if (object === "portrait") {
    // THE TRAP — now WITHOUT the "always ran fast" giveaway (Eli's call). The
    // only tell is subtle and physical: the hands were knocked crooked in the
    // struggle, so the time it shows can't be trusted. You have to NOTICE that.
    examine("The host's proud portrait looms above a side table — painted mid-toast, a goblet of deep red wine raised high in his right hand, his smile too pleased. Below it lies his gold pocket watch, smashed in the fall, its glass starred, the hands knocked crooked on their pin. Jarred as they are, they point somewhere near 10:41.");
    addClue("Pocket watch, hands jarred crooked — points near 10:41.");

  } else if (object === "coats") {
    // CLUE 3 — the exact minute, but told LESS directly now. The footman was
    // counting the minutes DOWN to the eleven o'clock chime; he'd reached "twenty-four"
    // when the scream came. The detective has to realise: twenty-four minutes left
    // before eleven = 10:36. No "before the chime" spelled out anymore.
    examine("By the cloakroom a footman is shaking. 'I count the minutes down to the hour — a habit, sir. I'd just whispered \"twenty-four\" when the scream tore through the hall. The eleven o'clock chime never followed it.'");
    addClue("Footman counting down to eleven's chime — had reached 'twenty-four' when the scream came.");

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
  input.maxLength = 5; // "10:36" or "1036"
  input.placeholder = "set the hands (e.g. 3:15)";
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
      addClue("A brass key, hidden inside the clock's case.", true); // silent
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
  stopAmbience();  // the whole room falls silent as the lock turns
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

// Sound on/off button. The icon is DRAWN in code (an SVG), not a cartoon emoji:
// a little brass speaker with sound-waves when on, and the waves replaced by an
// X when muted. Same button, same job — it just fits the manor now.
const SPEAKER_ON =
  '<svg class="ico-sound" viewBox="0 0 24 24" width="18" height="18" fill="none"' +
  ' stroke="currentColor" stroke-width="1.6" stroke-linecap="round"' +
  ' stroke-linejoin="round" aria-hidden="true">' +
  '<path d="M4 9v6h3l5 4V5L7 9H4z" fill="currentColor" stroke="none" />' +
  '<path d="M15.5 8.5a5 5 0 0 1 0 7" />' +
  '<path d="M17.7 6a8 8 0 0 1 0 12" /></svg>';
const SPEAKER_OFF =
  '<svg class="ico-sound" viewBox="0 0 24 24" width="18" height="18" fill="none"' +
  ' stroke="currentColor" stroke-width="1.6" stroke-linecap="round"' +
  ' stroke-linejoin="round" aria-hidden="true">' +
  '<path d="M4 9v6h3l5 4V5L7 9H4z" fill="currentColor" stroke="none" />' +
  '<line x1="15.5" y1="9.5" x2="20.5" y2="14.5" />' +
  '<line x1="20.5" y1="9.5" x2="15.5" y2="14.5" /></svg>';

document.getElementById("mute-btn").addEventListener("click", function () {
  muted = !muted;
  this.innerHTML = muted ? SPEAKER_OFF : SPEAKER_ON;
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
