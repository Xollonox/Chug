# Refactor Audit

## Original structural problems

- The project shipped as a single oversized `chug_v8.html` document that mixed markup, styling, audio, persistence, combat logic, AI behavior, dialogue progression, rendering, and menu flow in one place.
- Scene transitions were tightly coupled to fight state, story progression, and save writes, which made menu/fight/result flows fragile.
- Combat tuning used repeated inline literals for boss lists, round timing, ground offsets, and enemy naming.
- Runtime DOM access was spread across many systems instead of being routed through stable shared references.
- Audio, save/load, dialogue, shop state, and chapter progression all shared mutable globals without clear file ownership.

## Refactor goals implemented

- Split the browser entrypoint into a lean `index.html` shell plus focused JS system files and an external stylesheet.
- Pulled shared gameplay constants into `src/core/constants.js`.
- Kept the browser game runnable with sequential script loading to avoid a risky rewrite.
- Added a lightweight persisted debug toggle for combat inspection.
