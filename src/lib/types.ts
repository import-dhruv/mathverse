// ─────────────────────────────────────────────────────────────────────────────
// MATHVERSE — shared content model.
// Every lesson, derivation, problem, experiment and simulation conforms to
// these shapes so rendering stays generic and new branches are appended as data.
// ─────────────────────────────────────────────────────────────────────────────

export type Level =
  | 'School'
  | 'Pre-university'
  | 'Undergraduate 1'
  | 'Undergraduate 2'
  | 'Undergraduate 3'
  | 'Undergraduate 4'
  | 'Master’s'
  | 'Doctoral'
  | 'Research'

export const LEVELS: Level[] = [
  'School', 'Pre-university', 'Undergraduate 1', 'Undergraduate 2',
  'Undergraduate 3', 'Undergraduate 4', 'Master’s', 'Doctoral', 'Research',
]

export type Block =
  | { kind: 'paragraph'; text: string }
  | { kind: 'heading'; text: string; level?: 2 | 3 }
  | { kind: 'math'; latex: string; display?: boolean; caption?: string }
  | { kind: 'list'; items: string[]; ordered?: boolean }
  | { kind: 'callout'; tone: 'note' | 'intuition' | 'visual' | 'warning' | 'history' | 'experiment' | 'application'; title?: string; text: string }
  | { kind: 'steps'; title?: string; items: { title: string; text: string; math?: string }[] }
  | { kind: 'table'; headers: string[]; rows: string[][] }
  | { kind: 'sim'; sim: string; caption?: string }
  | { kind: 'code'; language?: string; code: string; caption?: string }
  | { kind: 'quote'; text: string; attribution?: string }

export interface Branch {
  id: string
  title: string
  short: string
  description: string
  icon: string
  color: string
  part: string
  topicIds: string[]
}

export interface Topic {
  id: string
  title: string
  branchId: string
  level: Level
  summary: string
  prerequisites: string[]
  tags: string[]
  blocks: Block[]
  derivationIds?: string[]
  simulationIds?: string[]
  problemIds?: string[]
  referenceIds?: string[]
  status?: 'Complete' | 'Outline'
}

export interface Derivation {
  id: string
  title: string
  topicId: string
  statement: string
  problem: string
  assumptions: string[]
  variables: { symbol: string; meaning: string }[]
  tools: string[]
  steps: { title: string; text: string; math?: string }[]
  result: string
  interpretation: string
  examples: string[]
  applications: string[]
  limitations: string[]
}

export type ProblemType =
  | 'Conceptual' | 'Theoretical' | 'Derivation' | 'Computation'
  | 'Proof' | 'Graphical' | 'Application' | 'Multi-step' | 'Research challenge'

export interface Problem {
  id: string
  title: string
  topicId: string
  level: Level
  type: ProblemType
  concepts: string[]
  statement: string
  hints: string[]
  solution: { title: string; text: string; math?: string }[]
  answer: string
  alternatives?: string[]
  mistakes?: string[]
  further?: string
}

export interface ProofTechnique {
  id: string
  title: string
  summary: string
  when: string
  template: string[]
  example: string
  pitfalls: string[]
}

export interface ProofExercise {
  id: string
  title: string
  techniqueId: string
  topicId: string
  level: Level
  statement: string
  hints: string[]
  scaffold: string[]
  solution: { title: string; text: string; math?: string }[]
  formalNote?: string
}

export interface SimulationMeta {
  id: string
  title: string
  branchId: string
  description: string
  controls: { key: string; label: string; min: number; max: number; step: number; value: number; unit: string }[]
  equations: string[]
  reading: string[]
  lab?: string
}

export interface Lab {
  id: string
  title: string
  letter: string
  description: string
  topicIds: string[]
  simulationIds: string[]
  objectives: string[]
  activities: string[]
}

export interface ReferenceItem {
  id: string
  title: string
  authors?: string
  type: 'Open textbook' | 'Lecture notes' | 'Paper' | 'Software' | 'Historical paper' | 'Encyclopedia' | 'Video course'
  publisher?: string
  year?: string
  url: string
  note: string
  license?: string
  openAccess: boolean
}

export interface LearningPath {
  id: string
  title: string
  tagline: string
  description: string
  level: Level
  prerequisites: string[]
  topicIds: string[]
  objectives: string[]
  hours: number
  completion: string
}

export interface TimelineEvent {
  id: string
  year: string
  title: string
  description: string
  branchId?: string
  figure?: string
}

export interface Frontier {
  id: string
  title: string
  field: string
  status: 'Theorem' | 'Conjecture' | 'Open problem' | 'Active research' | 'Research programme' | 'Theorem of independence' | 'Established framework'
  summary: string
  history: string
  statement: string
  prerequisites: string[]
  known: string[]
  theorems: string[]
  researchers: string[]
  directions: string[]
  questions: string[]
  references: string[]
  experiments?: string
  topicIds: string[]
}

export interface Paper {
  id: string
  title: string
  authors: string[]
  published: string
  year: string
  category: string
  summary: string
  url: string
  pdf?: string
  doi?: string
  source: 'arXiv' | 'Curated'
  topicIds: string[]
  frontierIds: string[]
}

export interface Mathematician {
  id: string
  name: string
  years: string
  field: string
  contribution: string
  topicIds: string[]
}
