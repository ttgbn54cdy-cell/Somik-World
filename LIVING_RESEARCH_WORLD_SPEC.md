# Living Research World — Extension Spec (1.2 Emergence)

## Ancient-world treatment

The default 1.2 world has a fixed vertical hazard zone in the center. It damages agents physically. Unheld blocks attenuate damage within a fixed radius. Primary resources can be carried, dropped, revisited and eventually decay. The observer may report candidate caches or structures, but the simulation does not reward those patterns and never tells an agent what they mean.

## Purpose

Return the observable character of the earlier Somik World versions while preserving the neutral, reproducible Research engine.

## Required living features

- Individual behavior history for the selected Somik.
- Visible contact, pickup, transport, release, eating, damage, death and reproduction events.
- Generic movable objects that do not have a predefined building role.
- Internal recurrent memory and optional memory-off control.
- Distinct repeatable behavioral patterns that emerge from genome, state and environment.
- Event trails and a compact personal timeline.
- Lineage view connecting behavior, genome changes and descendants.
- Observer-only labels such as “repeated transport” or “stable clustering” with the raw evidence shown beside each label.

## Neutrality rules

The engine never emits a build, cooperate, leader, protect, seek-food or avoid-danger command. It has no reward for walls, groups, signals or labels. Observer classifications never feed back into energy, movement, mutation, reproduction, resource flow or RNG.

## Treatments

The living layer is tested as named treatments, one factor at a time:

1. Core: movement, energy, food, physical contact, reproduction.
2. Memory: Core plus recurrent internal state.
3. Objects: Memory plus generic movable objects.
4. Chemical: Objects plus scalar chemical emission/sensing.
5. Rich ecology: Chemical plus waste/tissue/corpse material flows.

Each treatment gets its own protocol identity, Seed set and output archive. Results across treatments are not presented as one experiment.

## Acceptance tests

- Repeated behavior is visible in the personal timeline.
- Same Seed is deterministic after save/load.
- Permuting agent/object arrays does not change outcomes.
- Observer labels do not change state hash.
- A label is shown only with minimum evidence counts and raw event links.
- No label is called intention, cooperation, intelligence or construction without a separate preregistered test.
