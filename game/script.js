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
  noticedClock: false, // Has the detective spotted the stopped clock?
  doorUnlocked: false, // Has the way deeper been opened?
  clues: [],           // The list of clues in the notebook.
};

// The one true answer to the puzzle: the time the great clock stopped.
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
function addClue(text) {
  // Don't add the same clue twice.
  if (state.clues.indexOf(text) !== -1) return;
  state.clues.push(text);

  const list = document.getElementById("clue-list");
  const emptyNote = list.querySelector(".empty");
  if (emptyNote) emptyNote.remove(); // remove the "no clues yet" line

  const li = document.createElement("li");
  li.textContent = text;
  list.appendChild(li);

  // Every new clue rings the same soft chime — so the sound never singles out
  // the clock. Finding the red-herring ticket sounds exactly like finding the
  // clock. Your ears won't solve this for you.
  chime();
}


/* ---------------------------------------------------------------------
   3c. EXAMINE — write what the detective sees into the panel.
   --------------------------------------------------------------------- */
function examine(text) {
  document.getElementById("examine-text").textContent = text;
}


/* ---------------------------------------------------------------------
   3d. REACTIONS — what each object in the room says when you click it.
   Most things are cozy and innocent (that's the disguise). Only ONE
   thing is truly off — the great clock.
   --------------------------------------------------------------------- */
function clickObject(object) {
  if (object === "guests") {
    examine("The guests laugh a little too easily. Any one of them could be the killer wearing a smile. But smiles aren't evidence. Look for something that doesn't fit.");

  } else if (object === "fireplace") {
    examine("A generous fire crackles in the hearth. Warm, ordinary, welcoming. Nothing here is out of place.");

  } else if (object === "portrait") {
    examine("A proud portrait of the host hangs above the mantel. His painted eyes follow you across the room. Unsettling — but portraits do that. Nothing truly wrong here.");

  } else if (object === "coats") {
    // A RED HERRING. There is a number here too — a cloakroom ticket, No. 214 —
    // so the clock's 9:47 is no longer the only number in the room. Part of
    // "hard mode": the detective must decide WHICH number the code wants.
    examine("A rack of fine coats and hats from the evening's guests. Pinned to one lapel, a cloakroom ticket: No. 214. Damp with the night air. Ordinary — the manor keeps its real secrets better than this.");
    addClue("A cloakroom ticket: No. 214.");

  } else if (object === "clock") {
    // THE "notice what's off" moment.
    handleClock();

  } else if (object === "door") {
    handleDoor();
  }
}


/* ---------------------------------------------------------------------
   THE CLOCK — the heart of the room. This is the "notice what's off".
   --------------------------------------------------------------------- */
function handleClock() {
  if (!state.noticedClock) {
    // HARD MODE: we describe what's WRONG, but we no longer connect the dots.
    // No "the moment of the murder", no glow, no fanfare. The detective sees a
    // stopped clock frozen at 9:47 and has to decide for themselves that this
    // is the thing that's off — and that the number might matter.
    examine(
      "The great hall clock — brass, taller than you are — has stopped. Its hands are frozen at " +
      MURDER_TIME + ". Around it, the whole party breathes and moves on."
    );
    addClue("The great clock has stopped at " + MURDER_TIME + ".");
    state.noticedClock = true;
    // No pulse, no "you found it!" — the clock stays in shadow like everything
    // else. The game has stopped congratulating you. You're on your own now.
  } else {
    examine("The great clock is still frozen at " + MURDER_TIME + ".");
  }
}


/* ---------------------------------------------------------------------
   THE DOOR — the way deeper. It only opens once you KNOW the time.
   The lock is a brass time-lock: set it to the murder's hour to pass.
   You can't guess your way through — you have to have noticed the clock.
   --------------------------------------------------------------------- */
function handleDoor() {
  // HARD MODE: the dial is always there to try — no gate, no nudge, and NO hint
  // that the code is a time. It just asks for three digits. The player has to
  // have found the right number AND worked out that it's the one that matters.
  const answer = prompt(
    "A brass dial is set into the heavy oak door — three worn digits, waiting to be turned.\n\nEnter the 3-digit code:"
  );

  // If they close the box, do nothing.
  if (answer === null) return;

  // The code is the digits of the stopped clock: 9:47 -> "947".
  const cleaned = answer.replace(/[^0-9]/g, ""); // keep only the digits
  const target = MURDER_TIME.replace(/[^0-9]/g, "");

  if (cleaned === target) {
    win();
  } else {
    // Terse. No clue, no reminder, no pointing at the clock. You're on your own.
    examine("The dial doesn't move. That isn't the code.");
  }
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
    "The time-lock turns with a deep brass click. The oak door swings inward onto a dark corridor — the manor's hidden heart, where the killer fled." +
    "<br /><br />You noticed what everyone else walked past. You saw the one thing that was wrong." +
    "<br /><br /><em>Remember the time on that clock, Detective. You'll need it again before dawn.</em>";
  showScreen("win-screen");
}


/* ---------------------------------------------------------------------
   RESET — let the player start over.
   --------------------------------------------------------------------- */
function resetGame() {
  state.noticedClock = false;
  state.doorUnlocked = false;
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
