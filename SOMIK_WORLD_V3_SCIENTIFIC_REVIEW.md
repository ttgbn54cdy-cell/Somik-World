# Somik World v3 — Scientific Review

**Protocol:** SW-V3-SCI-1.0  
**Protocol hash:** `74b493bef4333f05`

## Decision
V3 is suitable as a controlled **in-silico evolutionary experiment**. Its design now separates inheritance, variation and differential reproduction from UI behavior and from several major implementation artifacts. It is not a model of biological evolution in general; conclusions are conditional on the frozen Somik ecology and controller architecture.

## Why the design is experimentally credible
- All founders in a run are exact clones of one protocol-fixed ancestor genome. Independent run Seeds change stochastic history, not the starting genotype.
- Mutation is fixed-rate, zero-mean and independent of population success. There is no rescue rule, adaptive mutation rate, target population or outcome-dependent food supply.
- Reproduction is asexual and automatic, which makes genotype-to-descendant inheritance cleaner for the baseline experiment.
- Neural inputs are physical and non-semantic: internal energy, generic touch and eight generic range rays. There is no food, mate, hazard, sex, age or prepared strategy channel.
- The recurrent brain has a fixed topology. Structural brain evolution is excluded from the core so controller-size change cannot masquerade as behavioral adaptation.
- Tick scheduling is synchronous: every Somik senses the same snapshot before decisions are resolved. Resource ties are resolved by event-keyed randomness rather than array/ID priority.
- Exogenous food randomness is separated from reproduction and mutation randomness. A change in the number of births cannot shift later food positions.
- Rendering, colors, plots, archive sampling and speed controls do not consume simulation randomness.
- The experiment has frozen checkpoints, fixed Seed sets, fixed stop criteria, raw-data export and explicit treatment/control separation.
- Common Garden and Ancestor Replay assay archived genotypes with mutation disabled in standardized environments, providing a direct test of heritable performance rather than relying only on behavior seen in the evolving world.
- Confirmatory Seeds are paired with Mutation-Off controls using matched initialization and exogenous food streams.

## What the experiment can establish
If independent mutation-on populations show heritable genomic change and their archived G300 genotypes repeatedly outperform the ancestor in paired Common-Garden assays, while Mutation-Off controls retain the ancestral genotype, that is evidence of adaptation **inside the Somik World v3 model**.

A change in movement, clustering, ray use, recurrent state or population size by itself is not evidence of adaptation. Extinctions and technical failures remain part of the result and are never silently discarded.

## Remaining limitations
1. The numerical ecology is a model choice. Eight rays, nine hidden neurons, food flux, energy thresholds and mutation parameters define a particular fitness landscape; there is no uniquely “objective” value for them.
2. The main protocol uses one fixed ancestral genotype. This is ideal for controlled comparisons but limits generalization across starting genotypes. A later preregistered ancestor-panel experiment would test historical contingency.
3. Twenty confirmatory Seeds are pre-specified for reproducibility, but this is not a formal power calculation. Effect estimates and uncertainty should be reported rather than relying only on a binary significance statement.
4. The world is intentionally a minimal Core. Hazard, objects/manipulation, communication, sexual reproduction and evolving brain size should be added only as separately versioned treatments, ideally one factor at a time.
5. Browser/runtime differences can theoretically introduce small floating-point differences. Each exported dataset records runtime metadata, and the built-in regression test should be run before a confirmatory campaign.
6. A successful digital evolution experiment supports a claim about the implemented computational system, not direct biological generalization without an external mapping and validation target.

## Freeze rule
Do not change physics, neural interface, mutation, reproduction, food rules, checkpoints, Seed sets or stop criteria after inspecting confirmatory outcomes. Any substantive change creates a new protocol/version (for example V3.1) and requires fresh confirmatory Seeds.

## Methodological references used for the review
- Grimm et al. (2020), *The ODD Protocol for Describing Agent-Based and Other Simulation Models: A Second Update to Improve Clarity, Replication, and Structural Realism*, JASSS 23(2), DOI 10.18564/jasss.4259.
- Caron-Lormier et al. (2008), *Asynchronous and synchronous updating in individual-based models*, Ecological Modelling 212:522–527, DOI 10.1016/j.ecolmodel.2007.10.049.
- Clune et al. / Avida digital-evolution studies using identical starting conditions, fixed mutation regimes and replicate random Seeds; see BMC Evolutionary Biology 8:284 (2008) and related Avida methods.
- Digital-evolution work using saved/frozen/replayed genotypes for direct experimental comparison, including *Coevolution Drives the Emergence of Complex Traits and Promotes Evolvability* (PLOS Biology, 2014) and Avida studies that isolate evolved genotypes for subsequent assays.
