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
    examine("A rack of fine coats and hats from the evening's guests. Damp with the night air. Ordinary. The manor keeps its secrets better than this.");

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
    // First real look: the detective realises what's wrong.
    examine(
      "The great hall clock. Beautiful, brass, taller than you are — and... stopped. Its hands are frozen at " +
      MURDER_TIME + ", while the whole party breathes and moves around it. Every other timepiece in the room ticks on. This one died at a single moment. The moment of the murder."
    );
    addClue("The great clock stopped at " + MURDER_TIME + " — the time of the murder. (Your first clue.)");
    state.noticedClock = true;

    // Give the clock a soft glow now that you've spotted it, and light up the door.
    document.querySelector('.hotspot[data-object="clock"]').classList.add("noticed");
    document.querySelector('.hotspot[data-object="door"]').classList.add("unlocked");
    state.doorUnlocked = true;
  } else {
    examine("The clock stays frozen at " + MURDER_TIME + ". You've noted the time. Now — the way deeper into the manor.");
  }
}


/* ---------------------------------------------------------------------
   THE DOOR — the way deeper. It only opens once you KNOW the time.
   The lock is a brass time-lock: set it to the murder's hour to pass.
   You can't guess your way through — you have to have noticed the clock.
   --------------------------------------------------------------------- */
function handleDoor() {
  if (!state.doorUnlocked) {
    // The player hasn't found the clue yet. Nudge them to look closer.
    examine("A heavy oak door leads deeper into the house — locked by an old brass time-lock, its little dial waiting for an hour. You don't yet know which. Something in this room must tell you the time that matters. Keep looking.");
    return;
  }

  // The player HAS the clue. Ask them to set the time-lock.
  const answer = prompt(
    "The brass time-lock guards the way deeper.\nSet it to the hour that matters.\n\nEnter the time (like 9:47):"
  );

  // If they close the box, do nothing.
  if (answer === null) return;

  // Be forgiving: accept "9:47", "947", "9 47", extra spaces, etc.
  const cleaned = answer.replace(/[^0-9]/g, ""); // keep only the digits
  const target = MURDER_TIME.replace(/[^0-9]/g, "");

  if (cleaned === target) {
    win();
  } else {
    examine("The time-lock doesn't budge. That isn't the hour. Remember what the great clock told you...");
  }
}


/* ---------------------------------------------------------------------
   WIN — the way opens. End of Version 0.1.
   Note the wink at the end: the first clue will matter again later.
   That's "setup and payoff" — exactly like Eli's design.
   --------------------------------------------------------------------- */
function win() {
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

  // Reset the examine text and the glows.
  examine("You stand in the warm glow of the foyer. Click things to look closely, Detective.");
  document.querySelector('.hotspot[data-object="clock"]').classList.remove("noticed");
  document.querySelector('.hotspot[data-object="door"]').classList.remove("unlocked");

  // Reset the story.
  storyIndex = 0;
  document.getElementById("story-next").textContent = "Continue";
}


/* ---------------------------------------------------------------------
   WIRING — connect the buttons and hotspots to the functions above.
   This runs once when the page loads.
   --------------------------------------------------------------------- */
// Title screen: "Begin the night" -> show the story.
document.getElementById("begin-btn").addEventListener("click", function () {
  showScreen("story-screen");
  showNextStoryLine();
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
