# Cozy Focus

A Pomodoro-style focus timer with a napping/working cat mascot, redesigned around what actually helps ADHD brains get started and keep going. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step, no external dependencies beyond one Google Font.

## Why this is different from a normal Pomodoro app

Standard timers assume one task, one fixed length, and that finishing means moving straight to the next thing. This one doesn't assume any of that:

- **One tiny step at a time** — break a task down into small steps, and only the *current* one is shown big and prominent. The rest stay tucked away in a collapsed list so they don't add to the overwhelm.
- **Flexible timers** — pick from several focus/break lengths (10/15/25/45 min focus, 3/5/10 min short break, 10/15/20 min long break), plus live **+1m / −1m** nudge buttons if you're mid-flow and just need a bit more time, or need to cut a session short.
- **Dopamine-friendly rewards** — finishing a focus session triggers a little celebration (jump + sparkles + a soft chime), and the app tracks a daily streak and session count so progress is visible.
- **A break menu, not a blank break** — breaks show a random tiny suggestion (stretch, get water, dance for 10 seconds...) with a shuffle button, so "what do I do now" doesn't turn into doomscrolling.
- **Gentle by design** — soft chime instead of a harsh alarm (with a mute toggle), calm pastel colors, and a cat that visibly naps during breaks and sits attentively during focus time.

## Running it

Just open `index.html` in a browser — no installation needed.

```bash
git clone https://github.com/studywithval/pomodoro-timer-.git
cd pomodoro-timer-
open index.html   # or double-click it
```

## Tech

- HTML5 + CSS3 (flexbox, SVG ring + animation)
- Vanilla JavaScript, no dependencies
- `localStorage` for streaks, step lists, and preferences — everything stays on your device
