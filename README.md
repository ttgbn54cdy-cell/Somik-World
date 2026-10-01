# Somik World 1.3 — Living World

A self-contained browser-based artificial-life / evolutionary research world.

## Run

Open `index.html` in a modern browser. For GitHub Pages, publish the repository root; no build step or external dependencies are required.

## Core design

- Local physical interaction rather than semantic knowledge.
- Somiks do not receive explicit `food`, `tree`, `water`, `danger`, `shelter`, or `build` concepts.
- Water is an environmental energy source.
- Trees are physical obstacles and spatial sources of primary food.
- The danger zone causes physical damage; nearby blocks can physically attenuate it.
- Food and objects can be carried and dropped through generic interaction.
- Event feed is observer-only and does not affect the simulation.
- Mutation, inheritance, recurrent internal state, lineage tracking, archive tools, autosave and scientific controls are included.
- Extinction is a valid outcome; there is no hidden population rescue.

## Reproducibility

The application stores protocol/state identifiers, supports save/export/import, and includes internal self-tests and isolated research controls. Display and analytics are intended not to consume simulation RNG or feed information back into the world.

## GitHub Pages

Repository **Settings → Pages → Deploy from a branch**, choose the branch containing `index.html` and `/ (root)`.
