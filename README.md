# Somik World Research 1.0

One product, one scientific engine, one long-term archive.

## Browser
Serve this folder from GitHub Pages or any static web server and open `index.html`. Autosave uses IndexedDB. The dashboard includes live world view, long-term charts, evolution/mutation statistics, full brain map, lineage/cohort analysis, ecology, Common Garden, Ancestor Replay, Mutation-Off, knockouts, mutational-neighborhood analysis, Multi-Seed experiments, checkpoints, import/export and protocol QA.

## Headless long run

Requires Node.js:

```bash
node headless-runner.js --seed 1 --ticks 100000000 --checkpoint 10000 --out ./run-1
```

The runner writes `state.json` atomically, `summary.json`, and compact `events.jsonl`. Re-running the same command with the same output directory resumes the saved Run.

## Files

- `index.html` — complete research UI.
- `research-engine.js` — DOM-free scientific engine, browser + Node compatible.
- `headless-runner.js` — long-duration runner using the same engine.
- `SCIENTIFIC_PROTOCOL.md` — frozen scientific design.
- `QA_REPORT.md` — validation report.
- `BUILD_MANIFEST.json` — hashes and identity.
