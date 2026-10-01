# Somik World Research 1.0 — Scientific Protocol

**Protocol ID:** `SW-R1-OEL-1.0`  
**Purpose:** one long-horizon artificial-life laboratory for open-ended evolutionary observation without a target behavior or internal fitness score.

## Scientific separation

The program has two layers. **Scientific Engine** contains physics, energy, reproduction, inheritance, mutation, sensory channels and RNG. **Observer & Analytics** contains dashboards, brain maps, statistics, assays, archive, rendering and reports. Observer code must never alter the Scientific Engine state or consume its simulation RNG.

A Run is identified by: Run ID, Seed, Protocol ID/hash, Engine hash, treatment hash and state hash. A change to UI or analytics does not constitute a new scientific protocol. A change to physics, biology, inheritance, mutation, resource flow or agent-environment coupling does.

## World and ecology

- 2D toroidal world, 1200 × 720. No privileged corners or walls.
- Constant external primary-resource flux, independent of population.
- No target population, no population rescue, no adaptive resource supply.
- Primary material, metabolic waste, tissue/corpses and movable inert objects coexist.
- Corpses decay into waste; waste and tissue can become resources if physiology evolves to exploit them.
- Predation is not a mode or score: it is a consequence of a physical jaw actuator, contact, damage, tissue energy and digestion traits.
- Grip is a generic physical actuator for movable entities. It does not know whether an object is “food”, “tool” or “corpse”.
- Chemical emission/sensing is a scalar physical channel; it has energetic cost and no predefined semantic meaning.
- No hazard rectangle and no hard-coded “protective block” role.

## Founders and heredity

- 72 founders start with the same ancestor genome. Position and orientation differ.
- Reproduction is sexual and hermaphroditic in the main Run. There is no male/female label or mate sensor.
- Asexual reproduction exists only as an experimental control/assay.
- Child genome is created by symmetric crossover plus unbiased mutations.
- Mutation rate and structural-mutation rate are themselves heritable within fixed safety bounds.
- Mutation can affect body/physiology traits, sensor geometry, neural biases, neural weights and neural topology.
- Structural mutations can add/delete sensors, hidden neurons and connections within predefined bounds.

## Evolvable phenotype

Evolvable traits include body radius/mass consequences, motor power, basal metabolic scale, energy storage, digestion of primary/waste/tissue, repair, armor/toughness, maturation schedule, reproductive investment, jaw/grip capacity, chemical production/sensing, sensor geometry and brain structure.

Trade-offs arise from physics and energetic costs. Larger or more capable structures are not rewarded directly; they alter mass, energy capacity, speed, metabolism and organ/brain costs.

## Nervous system

- Raw physical inputs: internal energy, health, touch, local chemical concentration and evolvable distance rays.
- Recurrent hidden network.
- Physical outputs: left motor, right motor, jaw, generic grip, chemical emission.
- No semantic inputs such as food, predator, mate, age class or hazard.
- No semantic outputs such as eat, hunt, cooperate, build, mate or reproduce.
- Brain size, sensor count and connections can evolve within fixed limits.

## Tick resolution and RNG

Each tick follows an explicit synchronous sequence: sense snapshot → neural decision → collision/object resolution → motion/energy → feeding/predation → death → reproduction → exposure accounting → resource flow → observer capture.

Conflict resolution uses deterministic keyed randomness derived from the Run seed and event identity, not array order or agent ID priority. Initialization and environmental resource RNG are separated. Rendering, UI, analytics, selected-agent state, charting and autosave never consume simulation RNG.

## Fitness and interpretation

The engine has **no fitness variable and no fitness reward**. Fitness is inferred by the Observer from reproductive outcomes.

### Primary
- offspring count measured at a fixed age endpoint;
- fraction reproduced by that fixed age;
- lifetime reproductive success for completed lives;
- reproduction per 1000 reproductively mature agent-ticks;
- Common Garden evolved/ancestor reproductive ratio.

### Secondary
Energy, health, lifespan/age, population dynamics, resource consumption and extinction.

### Exploratory
Morphology, motor behavior, gripping, predation, chemical use, brain size/topology, genetic distance/diversity, phenotype novelty, ecological clusters and lineage dynamics. These are never called adaptations without a demonstrated relationship to reproductive fitness and replicated evidence.

## Long-horizon analytics

The Observer records a multi-resolution time archive, checkpoints at generations 0/50/150/300 and then periodically, fixed-age outcomes, mutation counts, genotype diversity, genome distance from the ancestor, phenotype complexity, ecological material flows, founder ancestry and 50-generation lineage reproductive-fitness cohorts.

Persistent event archive stores compact birth edges with parent IDs, genome hash and mutation list; death/checkpoint/failure events are also stored. High-frequency grip events are aggregated rather than retained one by one.

## Causal/replication laboratory

All assays run in isolated worlds and never feed results back into the main Run:

- Ancestor Replay;
- Common Garden with matched assay seeds;
- Mutation-Off control;
- Asexual control;
- Connection knockout assay;
- Mutational Neighborhood assay;
- Multi-Seed replication;
- no-object/no-chemical variants supported by the engine.

## Long-term persistence

Browser mode uses IndexedDB autosave with rolling full snapshots and a separate compact event archive. A visible save timestamp is mandatory. Export includes protocol/engine identity, world state and metrics; “full archive” also exports persistent events.

For multi-month/year continuous computation, the same scientific engine also runs headlessly under Node using `headless-runner.js`, with atomic state checkpoints and JSONL events. Browser and headless runs share the same engine and protocol.

## Non-negotiable rules

1. No changing scientific parameters mid-Run.
2. No rescue after population decline or extinction.
3. Extinction is a valid result.
4. No interpretation-driven ecology changes after seeing results.
5. No observer metric may feed back to the world.
6. No UI/rendering randomness may affect simulation RNG.
7. Claims of adaptation require reproductive evidence and replication, not visual impression alone.
