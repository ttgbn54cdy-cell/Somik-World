# Somik World Research 1.0 — QA Report

## Build identity

- Protocol: `SW-R1-OEL-1.0`
- Protocol hash: `a68eb2f7f223f7c0`
- Engine hash: `f8caf1a27e225286`

## Scientific-engine checks passed

- same seed produces the same state hash after repeated steps;
- different seeds diverge;
- save → load → continue matches uninterrupted continuation;
- Mutation-Off + asexual control keeps the founder genotype unchanged;
- resource flux is population-independent;
- raw ray sensors carry geometry only and no object/food/mate/hazard type label;
- observer archive operations do not change the scientific state hash;
- repeated calls to metrics do not advance environment RNG or change scientific state;
- all founders start genome-identical;
- no population feedback, rescue or hazard shortcut exists in the main protocol;
- the scientific engine is DOM-free and does not access `document`, `localStorage` or `indexedDB`;
- semantic action outputs such as eat/mate/hunt/build/cooperate/reproduce are absent;
- heritable mutation rate, structural mutation and evolvable sensor/brain topology are enabled;
- primary/waste/tissue ecology, scavenging and predation mechanics are present;
- observer mutation counters survive save/load without affecting the state hash.

## Persistence checks

A headless smoke run was executed with the same engine. It successfully created an atomic `state.json`, `summary.json` and compact `events.jsonl`, then reloaded a valid Research 1.0 protocol state.

Browser code has static JavaScript syntax validation, unique DOM IDs, and no unresolved `$('<id>')` references. The container environment did not permit a reliable automated Chromium end-to-end navigation run, so browser IndexedDB/UI behavior still requires a manual smoke test in the target browser before a multi-month unattended Run.

## Long-run storage design

- browser autosave every 30 seconds or 5,000 ticks, whichever comes first;
- five rolling full snapshots per Run;
- compact persistent birth/death/checkpoint/failure event archive in IndexedDB;
- birth records retain parents, genome hash and mutation details for phylogeny and mutation reconstruction;
- high-frequency grip events are aggregated rather than persisted individually;
- storage usage/quota and persistent-storage status are visible in the Archive panel;
- complete Run and complete Run+event-archive exports are supported;
- the Node headless runner uses the exact same engine for multi-month/year computation.

## Interpretation limits

Passing deterministic and software-integrity tests does not prove that a later observed behavior is an adaptation. Adaptation claims still require reproductive evidence, matched assays such as Common Garden / Ancestor Replay, and replication across independent Seeds.
