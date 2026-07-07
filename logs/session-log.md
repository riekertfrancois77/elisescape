# Session Log — Eli's Journey

> The story of the studio, as *Eli* built it — one entry per module he's played,
> newest first. This is his game's diary. (Studio-building notes live backstage
> in `studio-build-log.md`, not here.)

---

## Module 8 — Design Great Games (COMPLETE · 2026-07-07)

Claude wore the **Game Designer** hat — but only as my *critic*. This was the
most "my brain first" module of all: **I** designed the next room and its puzzle,
and Claude just asked hard questions and tried to break it.

- **I figured out my own puzzle rules** first, by explaining why my foyer puzzle
  works: **1) it's FAIR** — you get clues that point to the answer, no guessing;
  **2) it's HARD & CLEVER** — you have to work to put it together. That became my
  checklist.
- **I designed the next room:** a **library**, full of books and shelves, with one
  **candlelit table** in the middle.
- **What's off:** a **statue that matches the portrait from the first room** — but
  it's holding the **wrong thing.** You have to notice and fix it.
- **The clue (why it's fair):** you can **walk back between rooms**, so you can
  always go check the portrait again. And the statue won't be the only puzzle in
  that room.
- **What he's holding:** a **goblet of wine** (that's the host — raising a toast
  the night he dies). Fix the statue to hold the goblet and a **hidden room slides
  open.**
- **My real improvement to the game (Version 0.5):** we put the goblet **into the
  foyer portrait now** — so the setup is already there, waiting, before I even
  build the library. That's setup and payoff, and it was my idea.
- My whole next-room design is **saved** so it can be built in Module 10. Earned
  the **Game Designer** trophy. 🧩 **That finishes Dad's whole run — my game went
  from 0.1 to 0.5, all by me.**

---

## Module 7 — Create Worlds (COMPLETE · 2026-07-07)

Claude wore the **Technical Artist** hat, but *I* was the Art Director. The rule
was: I decide the feeling and the look FIRST, and the studio just paints it.

- **I picked the feeling first.** Before any art, I said how the room should
  feel: **warm but wrong, grand and rich, with a touch of creepy.** That tension
  is my whole game — a beautiful house hiding a murder.
- **I chose the colors** myself: **gold and mahogany with a bit of deep crimson.**
- **Then I directed it, pass after pass** — I looked at each version and sent it
  back with notes, like a real director:
  - Added a **grand golden chandelier** and gilded molding.
  - Made the **fireplace** stop clipping into the rug, then grander, then gave it
    a proper **chimney** going up to the ceiling.
  - Made the **door smaller** and more detailed with a gold arch.
  - Added a **cloak on a coat rack** and made the **rug** more detailed.
  - Added the **grandfather clock** into its dark corner — but Claude kept it in
    shadow so I still have to *notice* it (that keeps my puzzle fair).
- **Then we brought it alive:** the firelight flickers into the room, the
  chandelier glows and breathes, and there's a warm deep grand-hall sound under
  the party now.
- Every single change we tested to make sure the game still solves and the clock
  is still hidden. My game finally *looks* like the manor in my head — **Version
  0.4.** Earned the **World Builder** trophy. 🎨

---

## Module 6 — Speak AI Fluently (COMPLETE · 2026-07-07)

Claude wore the **Prompt Coach** hat. The whole module was about one thing: my
words are the controller — the better my prompt, the better my game.

- **The vague prompt was mine.** I started by saying "polish my game," and Claude
  showed me that "polish" could mean five totally different things — so a vague
  prompt makes the AI guess and decide for me. A Director never lets that happen.
- **The rule: I write the prompt first, then we sharpen it.** Claude wouldn't hand
  me a finished prompt. I had to try, then we made it stronger together and named
  *why* it got better.
- **What I fixed:** the emojis. They looked cartoonish and silly in a murder game,
  and some of them just floated in the air. (I actually spotted six emojis
  floating in my room that Claude had missed — I used my game's own "notice what's
  off" skill on my own studio!)
- **My prompts landed three changes:** the 🔑 in the notebook became a real
  detective's line, the cartoon 🔊 sound button became a **drawn brass speaker**
  that matches the game, and every floating emoji in the foyer became a **drawn
  object** in the same style.
- **My best prompt had LIMITS.** I said: real objects, same style, still
  clickable, DON'T move anything, and keep the clock hidden so it's not obvious.
  Claude said three limits in one prompt is pro-level — the limits protected my
  puzzle so the AI couldn't wreck it.
- We **verified** every change: the game still solves, the clock is still hidden,
  nothing moved. My game is sharper now — **Version 0.3.** Earned the
  **AI Whisperer** trophy. 🗣️

---

## Module 5 — Read the Machine (COMPLETE · 2026-07-07)

I opened up my own game's code with Claude wearing the **Lead Engineer** hat. The
whole rule was: *I* guess what the code does first, and Claude only tells me after.

- **I met my game's brain.** It's a file called `script.js`, and right at the top
  is the `state` object I learned about in Module 4 — except now it's REAL running
  code. I read `hasKey: false` and `clues: []` and figured out it's remembering
  that the player doesn't have the key yet and hasn't found any clues.
- **I read the clock code.** The line `if (cleaned === target)` means the game
  checks if the time you type into the clock is EXACTLY equal to the real murder
  time. Only if it matches do you get the key.
- **My first solo edit — by my own hand.** I changed the murder time from **9:47
  to 10:36.** That's the one spot the whole game asks "what's the real answer?"
- **The ripple lesson.** Changing one thing broke the clues — they still pointed
  at 9:47! So I learned real engineers trace their change through everything it
  touches. We fixed all four clues to point at 10:36 (the toast, the candle, the
  broken pocket watch, the footman counting down).
- **I learned to verify.** We didn't just hope it worked — we tested it and proved
  10:36 opens the door, the old 9:47 fails now, and the sneaky pocket-watch trap
  still fools people. All green.
- My game is now changed by ME, not just directed by me. **Version 0.2.** Earned
  the **Code Reader** trophy. 🔧

---

## Module 4 — Build a Second Brain (COMPLETE · 2026-07-07)

Eli learned how the studio remembers, with Claude wearing the **Studio Producer**
hat (the keeper of the studio's memory).

- **The big idea:** AI forgets everything between sessions — so the *project* has
  to remember for it. The memory files ARE the studio's second brain.
- **The parallel he already knew:** his own game has a `state` object in
  `game/script.js` — the game's memory of clues found and the key earned. The
  studio's `MEMORY.md` + logs are the exact same idea, one level up.
- **The memory files, learned:** `MEMORY.md` (state of the whole game),
  `logs/session-log.md` (his diary), `logs/decisions-made.md` (locked calls),
  `logs/questions-eli-answered.md` (his words, verbatim), `design/*.md` (the
  design harness).
- **He summarized his game in his OWN words:** *"its a escape room type of game
  with a murder mystery aspect to it that will have you looking at everything
  closely and sloving clues."* A pro one-liner — genre by feel + the player's
  action baked in. Written straight into `MEMORY.md` under "In Eli's Own Words."
- **His forward arrow:** what he wants next is *"the game's design to improve and
  its mechanics"* — logged as the north star for the modules ahead.
- **The test:** saw how a cold-start Claude reconstructs the whole project from
  the files alone — proof the project remembers so Claude never has to. Real
  test to run himself: close the session, come back, ask "where are we?".
- **Trophy:** 🧠 Memory Keeper.
- **Next:** Module 5 — Read the Machine (his first solo code edit), sealed until
  Dad opens it.

---

## Module 3 — Direct the Team (COMPLETE · 2026-07-06)

Eli played his game, made a change list, and directed it one change at a time —
the team offered versions, he chose.

- **His change list (from playing):** (1) too easy — stop giving the answer
  away, (2) more sounds — the ticking gives the clock away, (3) make it look
  better.
- **"Make it hard" (chose the hardest version):** the door asks only for a
  "3-digit code" (no hint it's a time); the clock no longer names 9:47 as the
  murder time; nothing glows to single out the clock; more objects dimmed; a
  red-herring number added.
- **He rejected an AI version:** the clunky pop-up box — replaced with an
  in-room **brass dial**. (Rejecting AI is the director's skill.)
- **The deduction chain (his own big idea, hardest version):** turn "read the
  clue" into real detective work — **gather clues → deduce the 9:47 time of
  death → set the great clock's hands → a hidden panel gives up a brass key →
  the key opens the door.** With a **trap**: the host's pocket watch reads 9:52.
- **He overruled the engineer to keep it fair:** he wanted to drop the watch's
  "always ran fast" tell; when told zero tell makes it a coin-flip, he kept it
  fair with a *subtler* tell (hands knocked crooked). He also made every clue
  oblique so the detective does all the deducing.
- **He caught a skipped change:** he noticed his **sounds** change had been
  missed. Added a living, code-made soundscape so no single sound points at the
  clock.
- **The look (chose "warm with a bit of moody"):** the foyer repainted in pure
  CSS — panelled walls, a flickering hearth, a gilded frame, an arched doorway,
  and a **moonlit window** whose cold beam fights the warm firelight.
- **His call:** *"this looks good for Version 0.1."*
- **Trophies:** 🏆 Director Mode, and secret 🐛 Bug Hunter (he spotted something
  wrong in his own tools and reported it).
- **Next:** *"Start Module 4 — teach me how the studio remembers."*

---

## Module 2 — From Vision to Prototype (COMPLETE · 2026-07-06)

Eli directed his first build, with Claude wearing the **Lead Engineer** hat.

- **MVP decision:** he chose to build the **arrival / first 60 seconds** as
  Version 0.1 (the hook) rather than the flashier statue room — shaped into a
  fair one-room puzzle, so it's a game, not a cutscene.
- **The spec:** one room (the Grand Foyer), one locked way forward (a brass
  time-lock door), one "notice what's off" moment (the great clock), one clue.
- **The estimate lesson:** he guessed the build would take **"a few hours."**
  It took **under a minute.** The lesson — AI changed the math; the expensive
  part is now *deciding what to build*, the Director's job.
- **One shot:** the playable Version 0.1 appeared in the browser. He played it
  and cracked the case.
- **"Don't celebrate yet — that's Version 0.1":** the honest scorecard (gameplay
  ~15%, art ~5%, audio a little, polish 0%). Studios celebrate shipping.
- **First directing (a taste of Module 3):** he combined three directions —
  hide the clock harder, make the puzzle tougher, add sound — and the engineer
  rebuilt it.
- **Trophies:** 🏆 One-Shot Power, 🏆 First Playable, and secret 🕵️ AI Tamer.
- **Next:** *"Start Module 3 — I'm ready to direct."*

---

## Module 1 — Think Like a Game Studio (COMPLETE · 2026-07-06)

Eli designed his whole game before a line of code, as Creative Director.

- **Feelings:** curious while playing, clever when advancing.
- **Emotional curve:** explore → get stuck → notice the missing detail → AHA →
  escape. The nearly-quit wall is saved by a clue planted at the very start.
- **Player becomes:** a detective solving a crime.
- **World:** a single, cozy-but-secret-filled early-1900s mansion; grounded/real.
- **Driving problem:** a murder by a signature killer who *leaves clues on
  purpose*; the killer is still hidden in the house.
- **Pillars (locked):** Notice What's Off · Curiosity Rewarded / Cleverness
  Earned · A Duel With the Culprit · A Cozy House That Hides Everything.
- **Reference:** Sherlock Holmes — his way of thinking and observing.
- **First Big Decision:** Direction **A — "One Night at Thornwood Manor."**
- **The studio review sharpened it:** the murder happened at a **house party**,
  so the killer hides *among the guests* — you win by deducing *who*. Art tone:
  in between cozy and tense.
- **Achievements:** Game Pillars Chosen, First Big Decision, Studio Review
  Complete, Creative Director, Memory Created.
- **Next:** *"Start Module 2 — let's build my first playable prototype."*
