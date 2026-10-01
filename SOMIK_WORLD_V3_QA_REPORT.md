# Somik World v3 — QA Report

Protocol: SW-V3-SCI-1.0 (`74b493bef4333f05`)

## Automated engine tests
- PASS — deterministic same seed: eaf07af8 / eaf07af8
- PASS — different seed diverges: 04b53646
- PASS — observer calls do not change world RNG/state: f872f0df / f872f0df
- PASS — food environment RNG remains exogenous to evolutionary events: 1106262379 / 1106262379
- PASS — save/load continuation is deterministic: c4ce3f87 / c4ce3f87
- PASS — batching/speed does not change scientific ticks: cfe11c69 / cfe11c69
- PASS — founders genetically identical: unique=1
- PASS — mutation-off keeps one genotype: unique=1
- PASS — no semantic sensor channels: ["internal energy","generic touch","8 evenly spaced generic range rays"]
- PASS — fixed recurrent brain: hidden=9
- PASS — no population rescue: 
- PASS — deterministic regression hash after 1,200 ticks at Seed 20260929: `5e4d2341`

## Static checks
- JavaScript syntax checked with Node.
- All founders use one identical fixed ancestor genome; world Seed does not choose the ancestor genotype.
- Simulation randomness is separated: initialization and food environment are independent streams; mutation, offspring placement, tie-breaking, and exact-overlap contact resolution are event-keyed so unrelated event counts cannot shift later outcomes.
- UI/rendering code has no reference to simulation RNG objects.
- No semantic food/partner/hazard/sex/age sensor is present in the neural input vector.
- No brain output exists for eating or reproduction.
- Brain topology is fixed at 9 recurrent hidden neurons; mutation changes numeric genes only.
- No population target, rescue, mutation boost, or outcome-dependent food rule is present.
- Core world topology is toroidal and uses synchronous snapshot-based sensing/decisions.
- Extinction is preserved as an outcome.
- Pilot and confirmatory Seed sets are embedded in the protocol manifest before results are observed.
- The confirmatory batch includes every extinction/technical failure and does not discard runs by outcome.
- Each confirmatory Seed includes a paired Mutation-Off run with matched initialization and exogenous food stream.

## Scientific limitation
This QA establishes internal consistency, determinism, and protocol compliance. It does not by itself prove that any observed behavioral change is an adaptation. That requires the preregistered multi-Seed experiment plus Common Garden/Replay evidence.