# Animation Audit

## Main problems found

- Visual pose selection was still driven mostly by ad-hoc checks inside `Fighter.draw()` rather than a dedicated animation state machine.
- Attack visuals relied on loose timer math (`atkT`, `hitF`) embedded in rendering code, which made startup/active/recovery readability hard to reason about.
- Movement, jump, hit, land, and attack presentation all shared one procedural draw path, so multiple systems could implicitly fight over the final pose.
- Animation debug information did not expose a real animation state, frame index, clip timing, or event markers.
- Combat and animation were synced only indirectly, which made future weapon-specific or enemy-specific animation extension risky.

## Overhaul direction

- Introduce a dedicated animation registry and playback/state machine layer.
- Derive fighter visual state from combat state plus movement state in one explicit place.
- Add animation event markers and debug snapshots so combat timing, VFX hooks, and future cutscene/special work can build on a stable foundation.
