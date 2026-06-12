# CHUG: Shadow of Fame

<p align="center">
  <strong>A cinematic browser fighting RPG made by Xollonox.</strong><br>
  Battle through story acts, train your fighter, unlock power, and rise through the shadow of fame.
</p>

<p align="center">
  <a href="https://xollonox.github.io/Chug/"><strong>▶ Play on GitHub Pages</strong></a>
</p>

---

## Overview

**CHUG: Shadow of Fame** is a browser-based fighting RPG built as a lightweight static web game. It runs directly in the browser with no installation, no backend, and no build step required.

The project focuses on a dramatic martial-arts atmosphere, arcade-style fighting presentation, RPG progression, mobile-friendly controls, and a polished single-page game experience.

> Created and maintained by **Xollonox**.

---

## Live Demo

Play the latest deployed version here:

**https://xollonox.github.io/Chug/**

If GitHub Pages is still building after a new push, wait a minute and refresh the page.

---

## Features

- Cinematic title screen and menu flow
- Browser-based fighting gameplay
- Story Acts and progression structure
- Character leveling and stat allocation
- Coins, gems, XP, and progression HUD
- Training and armory systems
- Roster, codex, squad, settings, and world-map style screens
- Mobile-friendly layout with landscape support
- Canvas-based gameplay layer
- Custom visual style with atmospheric backgrounds, effects, and UI polish
- No external game engine required
- Runs as a simple static website

---

## Tech Stack

This project is intentionally simple and portable.

| Layer | Tech |
| --- | --- |
| Markup | HTML5 |
| Styling | CSS3 |
| Game Logic | Vanilla JavaScript |
| Rendering | HTML Canvas + DOM UI |
| Hosting | GitHub Pages |

No npm install, package manager, bundler, database, or server framework is required.

---

## Repository Structure

```text
Chug/
├── index.html      # Main game page and screen structure
├── styles.css      # Full visual styling, layout, UI, and responsive design
├── game.js         # Game logic, systems, interactions, and runtime behavior
├── README.md       # Project documentation
├── CHANGELOG.md    # Version history and release notes
├── CONTRIBUTING.md # Contribution guidelines
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── LICENSE
└── .github/
    ├── PULL_REQUEST_TEMPLATE.md
    └── ISSUE_TEMPLATE/
        ├── bug_report.md
        └── feature_request.md
```

---

## Running Locally

Because this is a static browser game, you can run it in multiple ways.

### Option 1: Open Directly

Open `index.html` in your browser.

### Option 2: Run a Local Server

Recommended for consistent browser behavior:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

---

## Deployment

This repo is deployed with GitHub Pages from:

- Branch: `main`
- Folder: `/` root

Production URL:

```text
https://xollonox.github.io/Chug/
```

---

## Development Notes

The project currently uses three core runtime files:

- `index.html` loads the page structure and references the assets.
- `styles.css` controls the full visual identity and responsive layout.
- `game.js` powers gameplay, state, menus, progression, and interactions.

When editing:

1. Update the relevant file.
2. Test locally in a browser.
3. Check both desktop and mobile landscape layouts.
4. Commit only intentional project files.

---

## Quality Goals

This repository aims to stay:

- Clean and easy to run
- Friendly for new contributors
- Lightweight and dependency-free
- Playable on desktop and mobile
- Professional enough for public portfolio use
- Focused on the original creative direction by Xollonox

---

## Roadmap Ideas

Possible future improvements:

- More enemies, bosses, and story chapters
- Better save/load handling
- Expanded move lists and combo tutorials
- Audio and music settings
- More accessibility options
- Performance optimization pass
- Dedicated screenshots or trailer media
- More polished GitHub Pages release flow

---

## Author

Made by **Xollonox**.

GitHub: [@Xollonox](https://github.com/Xollonox)

---

## License

Copyright © 2026 Xollonox.

See [`LICENSE`](LICENSE) for details.
