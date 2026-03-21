# AI Audit

## Main problems found

- Enemy tactics were still effectively embedded in fighter update flow instead of a dedicated brain/perception/decision layer.
- Enemy differences were mostly stat tweaks plus limited random attack choice, not meaningful archetype or weapon behavior.
- Enemy spacing and punish behavior did not fully evaluate weapon range, unsafe player recovery, or tactical intent.
- Difficulty mostly implied stronger enemies through type-specific tuning rather than clearly separated behavior-quality scaling.
- Enemy weapon support was not a first-class shared system; player weapon behavior was much richer than enemy weapon logic.

## Overhaul direction

- Add a dedicated AI system with perception, intent scoring, action planning, and debug snapshots.
- Add unified weapon profiles and enemy loadout/archetype data so both player and enemies can reason about weapon class, range, and timing consistently.
- Make AI decisions cadence-based, fair, and readable, with tunable reaction delay, punish chance, block chance, and error rate.
