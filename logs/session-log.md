# Session Log — Eli's Journey

> The story of the studio, as *Eli* built it — one entry per module he's played,
> newest first. This is his game's diary. (Studio-building notes live backstage
> in `studio-build-log.md`, not here.)

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
