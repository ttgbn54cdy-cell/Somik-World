# Somik World — Learning World

Single-file browser artificial-life laboratory combining inherited evolution with individual lifetime learning.

## Current model
- Founders spawn in water.
- Water restores energy and increases locomotor speed, without a semantic `water` sensor.
- Trees are generic physical obstacles and fixed origins of primary food.
- Food and movable blocks can be carried with the same generic grip action.
- The central hazard damages health; unheld blocks physically attenuate hazard damage nearby.
- Recurrent state provides short-term internal memory.
- Lifetime neural plasticity changes only the individual's learned connection deltas. Learned deltas are not inherited.
- Plasticity rate is heritable and mutable, allowing selection on capacity to learn.
- Learning uses only change in the organism's own energy/health as a local reinforcement signal; it receives no labels for water, food, danger, tree, shelter, cache, leader, or target behavior.
- Reproduction occurs in water; offspring inherit genome, not acquired learning.
- Predation, scavenging, waste cross-feeding, chemical signaling, mutation and lineage tracking remain enabled.
- Explicit Learning OFF treatment is available in the laboratory controls.

## Run
Open `index.html` in a modern browser or publish the repository with GitHub Pages.
