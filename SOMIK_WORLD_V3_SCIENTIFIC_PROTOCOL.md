# Somik World v3 — Evolution Baseline

**Protocol:** SW-V3-SCI-1.0  
**Protocol hash:** `74b493bef4333f05`  
**Status:** Frozen core baseline

## 1. Purpose and pattern
The experiment asks whether heritable changes in a minimal sensorimotor controller produce reproducible changes in reproductive performance under a fixed artificial ecology. The model does not contain target behaviors, semantic sensors, rescue rules, adaptive mutation rates, population targets, or observer feedback into the world.

## 2. Entities, state variables, and scale
- World: 1000×650 continuous 2-D torus.
- Somik: position, heading, energy, age, fixed-size recurrent neural controller, recurrent hidden state, generation, offspring count, ancestry label used only for diagnostics.
- Food: position only.
- Display IDs/colors are observer-only.

## 3. Process overview and scheduling
Every tick is synchronous: **snapshot → sense → decide → propose motion → symmetric contact resolution → energetic cost → food competition → death → automatic reproduction → fixed food inflow → observer metrics**. No agent acts on a partially updated world. Contested food is resolved with event-keyed tie randomness, so the number or ordering of other tie events cannot shift its random draw.

## 4. Design concepts
### Sensing
10 inputs: normalized internal energy, generic touch, and eight evenly-spaced generic range rays. Rays report only proximity to the nearest physical circle (Somik or food); they do not identify type. There is no noise input, partner sensor, food sensor, age sensor, hazard sensor, or prepared energy derivative.

### Controller
A fixed recurrent tanh network with 9 hidden neurons. The recurrent state is the only memory mechanism. There are no explicit M1/M2 memory registers or gates and no structural brain mutations.

### Actuation
Two continuous outputs control left and right motors. Forward/reverse motion and turning are consequences of differential motor activation; there is no semantic TURN, EAT, MATE, BUILD, COOPERATE, COMMUNICATE, or REPRODUCE action.

### Reproduction
Asexual and automatic. A mature Somik meeting the fixed energy and cooldown conditions reproduces without a brain output. The child receives the parent's genome plus fixed-rate zero-mean Gaussian mutation. There is no population rescue.

### Randomness
Initialization and food placement use distinct deterministic streams. Mutation, offspring placement, tie-breaking, and exact-overlap contact resolution use event-keyed deterministic randomness so one event cannot shift the random sequence of unrelated later events. The ancestor genome uses a separate protocol-fixed seed, so independent run Seeds begin from the same genotype. Rendering, UI, color, selection, plotting, and archive sampling cannot consume simulation RNG.

## 5. Initialization
64 founders are exact genotype clones of one protocol-fixed ancestor. Their positions and headings vary through the initialization RNG. Initial food is uniform on the torus.

## 6. Environment
Food inflow is a constant 0.18 units/tick and is independent of population size or outcome. Core V3 intentionally excludes hazard, blocks/manipulation, communication, sexual reproduction, and evolving brain size. These are reserved for separately preregistered treatments so one can test them one at a time.

## 7. Submodels and constants
```json
{
  "actuators": {
    "channels": [
      "left motor",
      "right motor"
    ],
    "count": 2,
    "differential_drive": true
  },
  "analysis": {
    "archive_sample_size": 12,
    "common_garden_founders": 20,
    "common_garden_seeds": [
      91001,
      91002,
      91003
    ],
    "common_garden_ticks": 4000,
    "generation_checkpoints": [
      50,
      150,
      300
    ],
    "generation_cohort_width": 50,
    "stable_pattern_rule": "same directional change in >=3 consecutive preregistered cohorts; descriptive unless linked to reproductive outcome across independent seeds"
  },
  "brain": {
    "hidden_neurons": 9,
    "memory_registers": false,
    "recurrent": true,
    "structural_mutation": false,
    "type": "fixed recurrent tanh network"
  },
  "controls": [
    "mutation-off control",
    "ancestor replay",
    "common-garden assay",
    "independent multi-seed replicates"
  ],
  "display": {
    "food_color": "#ef4444",
    "somik_color": "#38bdf8",
    "world_color": "#4b9b4f"
  },
  "energetics": {
    "base_metabolism": 0.018,
    "max_energy": 180,
    "max_speed": 2.1,
    "max_turn_rate": 0.2,
    "motor_cost": 0.012
  },
  "environment": {
    "blocks": false,
    "food_energy": 40,
    "food_inflow_per_tick": 0.18,
    "food_placement": "uniform over torus",
    "hazard": false,
    "initial_food": 160,
    "population_feedback": false
  },
  "founders": {
    "ancestor_seed": 13733069,
    "count": 64,
    "genotype": "all founders are exact clones of one fixed protocol ancestor genome",
    "initial_energy": 100
  },
  "mandatory_outcomes": [
    "extinction",
    "technical failure",
    "median and maximum generation",
    "genetic distance from ancestor"
  ],
  "model": "Somik World v3 — Evolution Baseline",
  "mutation": {
    "adaptive_rate": false,
    "gaussian_sigma": 0.12,
    "genome_structure_fixed": true,
    "mean": 0,
    "per_gene_probability": 0.01
  },
  "observer_only": [
    "colors",
    "IDs",
    "lineage labels",
    "dashboard",
    "plots",
    "archive selection",
    "render cadence"
  ],
  "primary_endpoints": [
    "mean offspring produced by fixed age 5000 ticks (or before earlier death)",
    "fraction reproducing at least once by fixed age 5000 ticks (or before earlier death)",
    "common-garden reproductive-rate ratio of checkpoint genomes versus ancestor"
  ],
  "protocol_hash_sha256_16": "74b493bef4333f05",
  "protocol_id": "SW-V3-SCI-1.0",
  "purpose": "Test whether heritable behavioral changes and reproductive differences emerge under a fixed, minimal artificial ecology without semantic sensors or target behaviors.",
  "replication_plan": {
    "confirmatory_max_ticks": 2000000,
    "confirmatory_paired_mutation_off_control": true,
    "confirmatory_seeds": [
      200001,
      200002,
      200003,
      200004,
      200005,
      200006,
      200007,
      200008,
      200009,
      200010,
      200011,
      200012,
      200013,
      200014,
      200015,
      200016,
      200017,
      200018,
      200019,
      200020
    ],
    "confirmatory_target_median_generation": 300,
    "pilot_max_ticks": 250000,
    "pilot_not_confirmatory": true,
    "pilot_seeds": [
      100001,
      100002,
      100003,
      100004,
      100005,
      100006,
      100007,
      100008,
      100009,
      100010
    ],
    "pilot_target_median_generation": 50
  },
  "reproduction": {
    "brain_output": false,
    "child_energy": 50,
    "cooldown_ticks": 250,
    "energy_threshold": 135,
    "fixed_age_endpoint_ticks": 5000,
    "maturity_ticks": 250,
    "mode": "asexual",
    "parent_energy_cost": 50
  },
  "rng": {
    "ancestor_genome_rng_fixed_by_protocol": true,
    "event_randomness": "mutation, offspring placement, tie breaking and exact-overlap contact resolution are counter/keyed by event identity rather than consumed sequentially",
    "observer_rng_affects_world": false,
    "streams": [
      "initialization",
      "food_environment",
      "mutation_event",
      "offspring_placement_event",
      "tie_event",
      "contact_overlap_event"
    ]
  },
  "run_stop": {
    "confirmatory_target_median_generation": 300,
    "extinction_is_result": true,
    "max_ticks": 2000000,
    "no_rescue": true
  },
  "schedule": "Synchronous per tick: snapshot -> sense -> decide -> propose motion -> symmetric contact resolution -> energy -> food competition -> deaths -> reproduction -> food inflow -> observer metrics.",
  "scope_note": "This is a core baseline. Hazard, manipulation/blocks, communication, sexual reproduction, and evolving brain size are excluded from the core so each can later be introduced as a separately preregistered treatment.",
  "sensors": {
    "channels": [
      "internal energy",
      "generic touch",
      "8 evenly spaced generic range rays"
    ],
    "count": 10,
    "noise_input": false,
    "ray_range": 95,
    "semantic_labels_to_brain": false
  },
  "topology": "2D torus, 1000x650"
}
```

## Pre-registered analysis
Primary endpoints:
1. mean offspring produced by a fixed evaluation age of 5,000 ticks, with earlier deaths finalized at death;
2. fraction reproducing at least once by the same fixed evaluation age (or before earlier death);
3. common-garden reproductive-rate ratio of checkpoint genomes versus the ancestor.

Completed-life lifetime reproductive success is still reported, but it is descriptive because indefinitely long-lived individuals create right-censoring. The fixed-age endpoints avoid that bias.

Mandatory outcomes include extinction, technical failure, generation statistics, and genetic distance. Checkpoints are taken when population median generation first reaches 50, 150, and 300. Twelve live genomes are selected by a deterministic observer-only hash at each checkpoint. Fixed 50-generation cohorts are used for longitudinal summaries.

A behavior is not called an adaptation merely because it changes. A confirmatory claim requires a heritable difference, reproductive association, and replication across independent run Seeds. Extinctions remain in the dataset. The built-in pilot uses Seeds 100001–100010 to median generation 50 (max 250,000 ticks). The built-in confirmatory batch uses Seeds 200001–200020 to median generation 300 (max 2,000,000 ticks); these confirmatory Seeds are fixed before results are observed. Each confirmatory Seed is run as a paired mutation-on / mutation-off experiment with identical initialization and exogenous food stream.

**Primary confirmatory test:** for each confirmatory run that reaches median generation 300, compute the paired Common-Garden reproductive-rate ratio for the archived G300 sample versus the ancestor under the same assay Seeds. The across-run effect is summarized on the log-ratio scale with all extinctions and technical failures reported separately; G50/G150 are trajectory checks rather than substitute primary endpoints. A claim of improved adaptation requires a reproducible positive G300 effect across independent run Seeds, non-zero heritable change, and no corresponding genetic change in Mutation-Off controls.

## Built-in controls
- **Mutation-Off Control:** same model with mutation disabled.
- **Common Garden:** archived and ancestral genotypes are assayed separately in the same standardized environments with mutation disabled.
- **Ancestor Replay:** ancestor and a checkpoint genotype are rerun under the same assay Seed.
- **Determinism test:** same Seed and same number of ticks must produce the same state hash; different Seeds should diverge.

## Stop rule
Confirmatory target: median generation 300, extinction, or 2,000,000 ticks, whichever comes first. A run is not stopped because a trend looks convincing.
