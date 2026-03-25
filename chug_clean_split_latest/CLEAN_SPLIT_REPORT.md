# Clean split summary

Generated from `content-2.html`.

## What changed
- Extracted inline CSS into focused files under `css/`
- Extracted inline JS into focused files under `js/`
- Removed obsolete patch layers from the active load chain:
  - dropped old pause-binding patch
  - dropped old v57 pause overlay patch
- Kept the latest effective pause/fight UI layer
- Added empty `assets/` folder with placeholder subfolders for images/audio/fonts

## File map
- `index.html` — clean entry file
- `css/base.css` — primary game styles
- `css/squad.css` — squad premium shell styles
- `css/menu.css` — menu/dojo panel styling
- `css/fight.css` — current fight HUD + pause styling
- `css/armory.css` — current armory styling
- `css/viewport.css` — mobile viewport handling styles
- `css/training.css` — current training styling
- `js/game-core.js` — original base game logic
- `js/menu.js` — menu polish behavior
- `js/rage.js` — rage/combat enhancement
- `js/fight-ui.js` — consolidated current fight UI logic
- `js/armory.js` — armory/shop logic
- `js/viewport.js` — viewport + settings polish
- `js/squad.js` — squad UI logic
- `js/training.js` — training stability logic

## Removed obsolete layers
- old pause binding shim
- old v57 pause UI/overlay

## Notes
This is a structural cleanup intended to reduce patch clutter while preserving runtime order. Browser playtesting is still recommended after any further logic refactor.
