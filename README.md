# MATHVERSE

**The Complete Interactive Universe of Mathematics** — an original, from-first-principles learning, experimentation and research environment built as a single integrated web application.

- **Live deployment:** https://mathverse-chi.vercel.app
- **Source:** https://github.com/import-dhruv/mathverse

> **Scope note.** This is a working, integrated foundation, not a claim to contain every fact ever written about mathematics. It ships a complete canonical knowledge architecture (34 branches, 558 topics), deep long-form articles for a curated core set, honestly labelled curriculum outlines for the remainder, a derivation library, authored and generated problem banks, 35 live visualizations, 15 laboratories, a Proof Studio, a knowledge graph, eight learning paths, a history and research-frontier explorer, an open-access reference library, and local mastery tracking. Run `npm run check` to verify structural integrity. Areas without full long-form coverage are marked **Curriculum outline** in the UI — never presented as complete.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production bundle
npm run check      # typecheck + content + LaTeX + generated-problem audits
```

No backend or API key is required. Progress, notes and saved experiment parameters are stored in `localStorage`.

## What is implemented

| Area | Delivered |
|---|---|
| Knowledge architecture | 34 branches in six parts, 558 canonical topic slugs, prerequisite edges, alternative paths |
| Lessons | Long-form articles built around the five dimensions (intuition, visual, derivation, proof, computation) and a 12-section first-principles structure |
| Derivations | Step-by-step reconstructions with assumptions, variables, result, interpretation, examples and limits |
| Problems | Authored problems with hints, full solutions, mistakes and alternatives; **20,500** deterministic generated variants (41 families) plus **15,000 international olympiad-level problems** (30 construction-verified families) |
| Visual mathematics | 36 canvas renderers with live parameter sliders, numerical readouts, pause/reset, save and PNG export |
| Laboratories | 15 themed labs (algebra, geometry, calculus, linear algebra, probability, statistics, DEs, number theory, optimization, graphs, complex analysis, fractals, Fourier, numerical, AI) |
| Proof Studio | 14 proof techniques, worked examples, scaffolded exercises, rigour checklist, Lean notes |
| Research | 21 frontiers with proven/conjecture/open labels, historical background, formal statements, prerequisites, known results, researchers, directions and references |
| History | 32 milestones from Babylon to contemporary AI mathematics, 28 mathematicians, mathematical ideas rather than biographies |
| Connections | Interactive knowledge graph with prerequisite edges and branch filters |
| Library | Open textbooks, lecture notes, software documentation and landmark papers linked to stable search URLs — no fabricated identifiers |
| Tutor | Knowledge-base tutor with mode selection, verified equations, progressive hints and honest capability disclosure |
| Progress | Mastery tracking, spaced-repetition flashcards, accuracy, streaks, prerequisite gaps, personal workspace |

## Architecture

```
src/
  lib/types.ts              shared content schema (Topic, Block, Derivation, Problem, Frontier, …)
  lib/store.ts              local mastery / spaced repetition / theme store
  lib/router.ts             hash router (no server needed)
  data/
    architecture.ts         34 branches + 558 canonical topic IDs
    content.part{1..4}.ts   authored long-form articles, derivations and problems (modular growth)
    content.library.ts      references, paths, timeline, mathematicians, summaries, key equations
    content.frontiers.ts    research topics with explicit status labels
    proofs.ts               proof techniques and exercises
    simulations.ts          metadata for all live visualizations
    labs.ts                 laboratory definitions
    papers.ts               curated landmark papers
    generated/              41 standard families → 20,500 problems; 30 international families → 15,000 problems; generated on demand
    index.ts                composition layer, curriculum outlines, quick checks, statistics
  components/
    Blocks.tsx              generic renderer for structured content blocks
    Math.tsx                KaTeX rendering
    Simulator.tsx           visualization shell, controls, readouts, export
    sim/                    canvas engine + mathematical renderers
    Search.tsx              global command-bar search (⌘/Ctrl+K)
  pages/                    one module per navigation destination
  styles/global.css         design system with dark and light themes
scripts/                    content, LaTeX and generated-problem audits
```

## Content model and integrity rules

Every topic is a structured `Topic` with typed `Block`s (paragraph, heading, math, list, callout, steps, table, simulation, code, quote). The composition layer resolves every canonical ID: authored articles win; unresolved topics become explicitly labelled outlines with a curated summary, canonical equations, prerequisites and a study sequence.

Scientific integrity rules:

- No fabricated theorems, proofs, papers, DOIs or data.
- Research topics are labelled: Theorem / Conjecture / Open problem / Active research / Research programme. Numerical evidence is never called proof.
- Derivations state assumptions, hypotheses and failure modes.
- Open resources are linked, not reproduced; library links search by title rather than asserting unverified identifiers.
- Structural audits check content depth, ID consistency, LaTeX syntax and all generated problems; they do **not** replace mathematical review.

## Development phases

| Phase | Status |
|---|---|
| 1 · Architecture, design system, navigation, search, progress | ✅ |
| 2 · Foundations and core school mathematics | ✅ substantial |
| 3 · Calculus, linear algebra, discrete mathematics, probability, statistics | ✅ substantial |
| 4 · Advanced pure and applied mathematics | ✅ substantial |
| 5 · Visual engine and laboratories | ✅ 36 visualizations, 15 labs |
| 6 · Proof Studio and computational notebooks | ✅ Proof Studio; notebook-style code blocks and local workspace |
| 7 · Tutor, adaptive practice and paths | ✅ knowledge-base tutor, generated practice, 8 paths |
| 8 · Research library, frontiers, graph, history | ✅ |
| 9 · Verification and quality assurance | ✅ four automated audits |

Remaining work is primarily **depth of content**: converting curriculum outlines into long-form articles branch by branch, expanding the authored problem and proof banks, and optionally wiring the tutor to a language model with symbolic verification.
