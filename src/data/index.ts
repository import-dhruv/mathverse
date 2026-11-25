import type { Topic, Block, Level, Derivation, Problem, ReferenceItem, LearningPath, TimelineEvent, Frontier, Mathematician } from '../lib/types'
import { BRANCHES, BRANCH_BY_ID, ALL_TOPIC_IDS, PART_NAMES } from './architecture'
import { P1_TOPICS, P1_DERIVATIONS, P1_PROBLEMS } from './content.part1'
import { P2_TOPICS, P2_DERIVATIONS, P2_PROBLEMS } from './content.part2'
import { P3_TOPICS, P3_DERIVATIONS, P3_PROBLEMS } from './content.part3'
import { P4_TOPICS, P4_DERIVATIONS, P4_PROBLEMS } from './content.part4'
import { atlasBlocks } from './content.atlas'
import { REFERENCES, TIMELINE, MATHEMATICIANS, TOPIC_SUMMARIES, TOPIC_KEY_EQUATIONS } from './content.library'
import { LEARNING_PATHS } from './content.paths'
import {
  RESEARCH_UNIVERSE, EPISTEMIC_LADDER, RESEARCH_GUIDES, SOURCE_ATLAS,
  READING_ROUTES, RESEARCH_GLOSSARY, PAPER_STUDY_FIELDS,
} from './content.research'
import { FRONTIERS, FRONTIER_BY_ID } from './content.frontiers'
import { PROOF_TECHNIQUES, PROOF_EXERCISES } from './proofs'
import { LABS, LAB_BY_ID } from './labs'
import { SIMULATIONS, SIM_BY_ID } from './simulations'
import { GENERATED_FAMILIES, GENERATED_COUNT, INTERNATIONAL_FAMILIES, INTERNATIONAL_COUNT, ALL_GENERATED_COUNT } from './generated'
import { PAPERS, PAPER_BY_ID, PAPERS_BY_TOPIC, PAPERS_BY_FRONTIER, PAPER_CATEGORIES } from './papers'

export {
  BRANCHES, BRANCH_BY_ID, ALL_TOPIC_IDS, PART_NAMES, REFERENCES, LEARNING_PATHS, TIMELINE,
  MATHEMATICIANS, FRONTIERS, FRONTIER_BY_ID, PROOF_TECHNIQUES, PROOF_EXERCISES,
  LABS, LAB_BY_ID, SIMULATIONS, SIM_BY_ID, GENERATED_FAMILIES, GENERATED_COUNT,
  INTERNATIONAL_FAMILIES, INTERNATIONAL_COUNT, ALL_GENERATED_COUNT,
  PAPERS, PAPER_BY_ID, PAPERS_BY_TOPIC, PAPERS_BY_FRONTIER, PAPER_CATEGORIES,
  TOPIC_SUMMARIES, TOPIC_KEY_EQUATIONS,
  RESEARCH_UNIVERSE, EPISTEMIC_LADDER, RESEARCH_GUIDES, SOURCE_ATLAS,
  READING_ROUTES, RESEARCH_GLOSSARY, PAPER_STUDY_FIELDS,
}
export {
  GENERATED_FAMILY_BY_ID, GENERATED_COUNT as TOTAL_GENERATED, getGeneratedProblem,
  getGeneratedMeta, generatedForTopic, generatedIdsForFamily, GENERATED_IDS,
  INTERNATIONAL_FAMILY_BY_ID, INTERNATIONAL_IDS, getInternationalProblem,
  internationalIdsForFamily, internationalForTopic,
} from './generated'

const AUTHORED: Topic[] = [...P1_TOPICS, ...P2_TOPICS, ...P3_TOPICS, ...P4_TOPICS]
export const TOPICS: Topic[] = [...new Map(AUTHORED.map(t => [t.id, t])).values()]
const DEEP = new Set(TOPICS.map(t => t.id))

export const DERIVATIONS: Derivation[] = [...P1_DERIVATIONS, ...P2_DERIVATIONS, ...P3_DERIVATIONS, ...P4_DERIVATIONS]
export const PROBLEMS: Problem[] = [...P1_PROBLEMS, ...P2_PROBLEMS, ...P3_PROBLEMS, ...P4_PROBLEMS]
export const DERIVATION_BY_ID = Object.fromEntries(DERIVATIONS.map(d => [d.id, d])) as Record<string, Derivation>
export const PROBLEM_BY_ID = Object.fromEntries(PROBLEMS.map(p => [p.id, p])) as Record<string, Problem>

// Curated prerequisite edges for the most important concepts. Other topics use
// their branch's natural ordering, which is itself a pedagogical sequence.
const PREREQS: Record<string, string[]> = {
  'derivatives': ['limits','continuity'], 'chain-rule': ['derivatives'], 'product-rule': ['derivatives'],
  'taylor-series': ['derivatives','higher-order-derivatives'], 'optimization': ['derivatives'],
  'mean-value-theorem': ['derivatives','continuity'], 'lhopital-rule': ['derivatives','limits'],
  'definite-integrals': ['antiderivatives','limits'], 'fundamental-theorem-calculus': ['derivatives','definite-integrals'],
  'integration-by-parts': ['product-rule','definite-integrals'], 'partial-fractions': ['rational-expressions'],
  'multivariable-functions': ['functions-relations','vectors'], 'partial-derivatives': ['derivatives','multivariable-functions'],
  'gradient': ['partial-derivatives'], 'greens-theorem': ['line-integrals','multiple-integrals'],
  'vector-spaces': ['vectors'], 'basis-dimension': ['linear-independence','span'],
  'linear-transformations': ['vector-spaces','matrices'], 'eigenvalues': ['determinants','linear-transformations'],
  'eigenvectors': ['eigenvalues'], 'diagonalization': ['eigenvectors','basis-dimension'],
  'svd': ['orthogonality','eigenvalues'], 'spectral-theorem': ['eigenvalues','inner-product-spaces'],
  'conditional-probability': ['probability-axioms'], 'bayes-theorem': ['conditional-probability'],
  'random-variables': ['probability-axioms'], 'expectation': ['random-variables'],
  'central-limit-theorem': ['expectation','variance','characteristic-functions'],
  'markov-chains': ['conditional-probability'], 'hypothesis-testing': ['estimation','data-distributions'],
  'linear-regression': ['estimation','covariance-correlation'], 'groups': ['set-theory','functions-discrete'],
  'rings': ['groups'], 'fields': ['rings'], 'galois-theory': ['fields','groups'],
  'metric-spaces': ['set-theory','real-numbers'], 'compactness': ['metric-spaces','continuity-analysis'],
  'measure-theory': ['metric-spaces'], 'lebesgue-integration': ['measure-theory'],
  'holomorphic-functions': ['complex-numbers','complex-differentiation'], 'residue-theorem': ['contour-integration','laurent-series'],
  'banach-spaces': ['normed-spaces'], 'hilbert-spaces': ['inner-product-spaces','banach-spaces'],
  'fundamental-groups': ['homotopy','groups'], 'riemannian-geometry': ['smooth-manifolds','tensor-calculus'],
  'root-finding': ['numerical-errors'], 'newton-raphson': ['derivatives','root-finding'],
  'ode': ['derivatives','definite-integrals'],
  'heat-equation': ['pde','partial-derivatives'], 'chaos-theory': ['dynamical-systems'],
  'gradient-descent': ['gradient','optimization'], 'convex-optimization': ['optimization'],
  'lagrange-multipliers': ['gradient','constrained-optimization'],
  'shannon-entropy': ['probability-distributions','logarithms'], 'mutual-information': ['conditional-entropy'],
  'shortest-paths': ['graph-fundamentals'], 'nash-equilibrium': ['normal-form-games'],
  'black-scholes': ['stochastic-calculus','pde'], 'transformers-math': ['matrix-multiplication','gradient'],
  'riemann-hypothesis-frontier': ['riemann-zeta-function','complex-analysis'],
  'p-vs-np': ['computational-complexity'], 'collatz-conjecture': ['recurrence-relations'],
}

function inferLevel(branchId: string, index: number): Level {
  const advanced = new Set(['research-frontiers','functional-analysis','differential-geometry','logic-set-theory','abstract-algebra','topology'])
  if (advanced.has(branchId)) return index < 3 ? 'Undergraduate 3' : index < 10 ? 'Master’s' : 'Doctoral'
  if (branchId === 'arithmetic' || branchId === 'pre-algebra' || branchId === 'geometry' || branchId === 'trigonometry') return index < 10 ? 'School' : 'Pre-university'
  if (branchId === 'mathematics-for-ai' || branchId === 'financial-mathematics') return index < 8 ? 'Undergraduate 3' : 'Master’s'
  return index < 5 ? 'Undergraduate 1' : index < 13 ? 'Undergraduate 2' : 'Undergraduate 3'
}

const titleFromId = (id: string) => id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

function atlasTopic(id: string, branchId: string, index: number, siblings: string[]): Topic {
  const branch = BRANCH_BY_ID[branchId]
  const title = titleFromId(id)
  const summary = TOPIC_SUMMARIES[id] ?? `${title} is a topic in ${branch.title.toLowerCase()}. ${branch.description}`
  const equations = TOPIC_KEY_EQUATIONS[id] ?? []
  const prereqs = PREREQS[id] ?? (index > 0 ? branch.topicIds.slice(Math.max(0, index - 3), index) : [])
  const level = inferLevel(branchId, index)
  const blocks = atlasBlocks(id, branchId, title, summary, equations, prereqs, siblings, level)
  return { id, title, branchId, level, summary, prerequisites: prereqs,
    tags: [branch.short, 'first-principles lesson'], blocks, status: 'Complete' }
}

const ATLAS_TOPICS: Topic[] = BRANCHES.flatMap(b => b.topicIds.map((id, i) =>
  DEEP.has(id) ? null : atlasTopic(id, b.id, i, b.topicIds.filter(x => x !== id)),
)).filter(Boolean) as Topic[]

export const OUTLINES: Topic[] = []
export const ALL_TOPICS: Topic[] = [...TOPICS, ...ATLAS_TOPICS].sort((a, b) => a.title.localeCompare(b.title))
export const TOPIC_BY_ID = Object.fromEntries(ALL_TOPICS.map(t => [t.id, t])) as Record<string, Topic>

export function topicsForBranch(branchId: string) { return ALL_TOPICS.filter(t => t.branchId === branchId) }
export function topicProblems(id: string) {
  return [...PROBLEMS.filter(p => p.topicId === id)]
}
export function topicDerivations(id: string) { return DERIVATIONS.filter(d => d.topicId === id) }
export function topicProofs(id: string) { return PROOF_EXERCISES.filter(e => e.topicId === id) }
export function topicPapers(id: string) { return PAPERS_BY_TOPIC.get(id) ?? [] }

// Topic-specific self-assessment prompts derived from each article's own text.
export const QUICK_CHECKS: Record<string, { prompt: string; answer: string }> =
  Object.fromEntries(ALL_TOPICS.map(t => {
    const after = (name: string) => {
      const i = t.blocks.findIndex(b => b.kind === 'heading' && b.text.toLowerCase().includes(name.toLowerCase()))
      return i >= 0 ? t.blocks.slice(i + 1, i + 7) : []
    }
    const firstList = (name: string) => {
      const b = after(name).find(x => x.kind === 'list')
      return b && b.kind === 'list' ? b.items[0] : undefined
    }
    const misconception = firstList('common mistakes')
    const insight = t.blocks.find(b => b.kind === 'callout' && b.tone === 'intuition')
    const insightText = insight && insight.kind === 'callout' ? insight.text : t.summary
    const steps = t.blocks.find(b => b.kind === 'steps')
    const last = steps && steps.kind === 'steps' ? steps.items[steps.items.length - 1] : undefined
    return [t.id, {
      prompt: misconception
        ? `A student claims: "${misconception}" Is that correct? Explain using the definitions.`
        : `Explain the central idea of ${t.title.toLowerCase()} in your own words, then state one hypothesis behind its main result.`,
      answer: [insightText, last ? `Study step: ${last.title} — ${last.text}` : '', ...(TOPIC_KEY_EQUATIONS[t.id] ?? [])].filter(Boolean).join(' '),
    }]
  }))

export const STATS = {
  branches: BRANCHES.length,
  topics: ALL_TOPICS.length,
  deepTopics: ALL_TOPICS.length,
  authoredEssays: TOPICS.length,
  outlines: 0,
  derivations: DERIVATIONS.length,
  problems: PROBLEMS.length + ALL_GENERATED_COUNT,
  authoredProblems: PROBLEMS.length,
  generatedProblems: GENERATED_COUNT,
  internationalProblems: INTERNATIONAL_COUNT,
  totalGenerated: ALL_GENERATED_COUNT,
  simulations: SIMULATIONS.length,
  labs: LABS.length,
  proofTechniques: PROOF_TECHNIQUES.length,
  proofExercises: PROOF_EXERCISES.length,
  references: REFERENCES.length,
  paths: LEARNING_PATHS.length,
  timeline: TIMELINE.length,
  frontiers: FRONTIERS.length,
  papers: PAPERS.length,
  mathematicians: MATHEMATICIANS.length,
}
