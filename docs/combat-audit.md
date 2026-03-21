# Combat Audit

## Prototype combat problems found

- Attack execution, damage, hit detection, stun, AI attack choice, combo display, and movement locking were all intertwined inside `Fighter.update()`.
- Hits were effectively single-frame range checks tied to one timer value instead of a clean startup/active/recovery lifecycle.
- Blocking was not a real shared defensive system; most exchanges were raw damage trades with inconsistent state locking.
- Enemy behavior selected attacks via random inline logic instead of using the same explicit move definitions and timing rules as the player.
- Combat debugging lacked structured hitbox/hurtbox visibility and only exposed general runtime values.

## Overhaul direction

- Move definitions are now data-driven and shared through the combat registry.
- Input buffering, hitbox/hurtbox checks, block validation, hit reactions, and AI move selection are separated into dedicated combat files.
- Fighter logic now delegates to combat systems for move startup, active frames, recovery, stun, and hit resolution.
