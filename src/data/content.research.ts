// The MATHVERSE research library: universal research method, an annotated
// source atlas, curated reading routes and a rigorous paper-study protocol.
// All links point to real, publicly reachable resources; no identifiers or
// citations are invented.
import type { ReferenceItem } from '../lib/types'

export type ResearchGuide = {
  id: string
  title: string
  category: 'Reading' | 'Method' | 'Writing' | 'Tools' | 'Integrity'
  summary: string
  steps: { title: string; text: string }[]
  pitfalls: string[]
}

export const RESEARCH_UNIVERSE = [
  {
    id: 'ru-universe',
    title: `Research is the study of the boundary between the known and the unknown`,
    text: `A course asks a question whose answer is already known. Research asks a question whose answer is not — and then has to decide what would count as an answer. That decision is the real beginning. It forces you to state definitions precisely enough that a counterexample would be meaningful, to separate what is true from what is merely expected, and to design a path from the present state of knowledge to a new theorem. Everything else in this library — reading, notation, computation, writing, reviewing — exists to make that path trustworthy.`,
  },
  {
    id: 'ru-cycle',
    title: `The research cycle is a loop, not a line`,
    text: `Observation produces a pattern. A conjecture names it. Experiments test it in cases; failed experiments refine the statement; a proof converts it into a theorem; publication exposes it to scrutiny; scrutiny reveals sharper questions and new hypotheses. The loop rarely closes cleanly — most conjectures die, most proofs have gaps on first draft, and most papers raise more questions than they settle. Learning to be comfortable with that instability, while remaining ruthless about correctness, is the central professional skill.`,
  },
  {
    id: 'ru-status',
    title: `Every claim has an epistemic status, and the status must be stated`,
    text: `Intuition suggests. A heuristic makes a guess plausible. Numerical evidence checks finitely many cases. A conjecture is a precise unproved statement with a track record. A theorem is a statement with a proof whose every step can be checked. A formalisation is a theorem verified by a proof assistant kernel. These are different objects. Conflating them is the most common way mathematical writing becomes misleading — and the most common error in popular accounts of mathematics.`,
  },
  {
    id: 'ru-modes',
    title: `Mathematicians work in several modes, and all are legitimate`,
    text: `The theorist builds structures and proves general theorems. The experimentalist computes examples to find patterns worth proving. The computational mathematician designs algorithms and analyses their error. The formaliser encodes arguments in a proof assistant. The expositor finds the explanation that makes a hard result inevitable. Breakthroughs usually involve several modes at once: computing to guess, proving to confirm, and rewriting to understand why the proof works.`,
  },
  {
    id: 'ru-rigor',
    title: `Rigor is not pedantry — it is compression with a warranty`,
    text: `A rigorous proof states its hypotheses, uses each one, and makes every inference checkable. The payoff is generality: a correct proof about an abstract structure is simultaneously a proof about every model of that structure. When a proof step bothers you, that discomfort is valuable data. Ask exactly which hypothesis licenses it; if none does, you have found either a gap in the argument or a hidden assumption that must be made explicit.`,
  },
]

export const EPISTEMIC_LADDER = [
  { rung: `Observation`, meaning: `A pattern noticed in examples`, standard: `State the examples precisely.`, danger: `Seeing a pattern that coincidence produced.` },
  { rung: `Heuristic`, meaning: `A plausibility argument`, standard: `Name the analogy and its limits.`, danger: `Treating analogy as evidence of truth.` },
  { rung: `Numerical evidence`, meaning: `Finitely many cases checked`, standard: `Report range, precision and method.`, danger: `Extrapolating finite checks to infinity.` },
  { rung: `Conjecture`, meaning: `A precise unproved statement`, standard: `Give the formal statement and known cases.`, danger: `Quoting a conjecture as a theorem.` },
  { rung: `Theorem`, meaning: `A statement with a checkable proof`, standard: `List hypotheses and verify each is used.`, danger: `A proof sketch presented as complete.` },
  { rung: `Formal verification`, meaning: `Kernel-checked proof in an assistant`, standard: `State the system and the statement verified.`, danger: `Confusing a formal proof with mathematical insight.` },
]

export const RESEARCH_GUIDES: ResearchGuide[] = [
  {
    id: 'guide-read-paper', title: `How to read a research paper: ten passes`, category: 'Reading',
    summary: `A paper is not a textbook chapter. It compresses years of work into a few pages and assumes the reader will reconstruct what is omitted. Read it in passes, each with a single purpose.`,
    steps: [
      { title: `Pass 1 — Orientation`, text: `Read title, abstract, section headings and references. Write one sentence: "This paper proves ___ under the hypotheses ___." If you cannot, stop and find a survey.` },
      { title: `Pass 2 — Notation glossary`, text: `List every symbol the authors reuse with a different meaning than you expect. Record the domain of each object (ℝ, a group, a category, a function space). Most reading failures are notation failures.` },
      { title: `Pass 3 — The theorem inventory`, text: `Extract every statement labelled Theorem, Lemma, Proposition and Corollary. For each, write the hypotheses in your own words and mark which ones you understand.` },
      { title: `Pass 4 — Proof skeleton`, text: `Before reading the proof line by line, sketch its strategy: contradiction? compactness? diagonalisation? reduction to a known case? A proof without a strategy is a sequence of tricks you will forget.` },
      { title: `Pass 5 — Hypothesis stress test`, text: `Remove each hypothesis in turn and try to construct a counterexample. This is the fastest way to learn what the theorem is really saying.` },
      { title: `Pass 6 — Examples and edge cases`, text: `Apply the theorem to the simplest nontrivial example and to one degenerate case (zero, empty set, characteristic 2, v = 0). Check that the conclusion is what you expected.` },
      { title: `Pass 7 — Reproduce a lemma`, text: `Close the paper and prove the smallest nontrivial lemma independently. Compare with the authors' proof. The gap between the two is exactly what you needed to learn.` },
      { title: `Pass 8 — Computation`, text: `If the result is computational or quantitative, reproduce one table, one simulation or one symbolic calculation. Never treat agreement as proof — treat disagreement as a signal.` },
      { title: `Pass 9 — Literature map`, text: `Follow the introduction's citations backwards to the origin of the problem and forwards to papers citing this one. Identify what was known before and what changed after.` },
      { title: `Pass 10 — Questions`, text: `Write three questions: one technical (what does this lemma generalise to?), one strategic (why this approach?), one research-level (what remains open?). These are the seeds of a project.` },
    ],
    pitfalls: [`Reading linearly from page one`, `Accepting "clearly" and "it follows" without reconstructing the step`, `Confusing the authors' notation with standard notation`, `Skipping the introduction because it looks like prose`],
  },
  {
    id: 'guide-choose-problem', title: `How to choose a research problem`, category: 'Method',
    summary: `A good problem is narrow enough to attack and deep enough to matter. Choosing well is a skill that can be practised.`,
    steps: [
      { title: `Start from a gap you can state`, text: `Find a theorem whose hypotheses you can weaken, a conjecture with a natural special case, or a computation whose pattern lacks explanation.` },
      { title: `Check the problem is open`, text: `Search the literature and ask an expert. Many "new" problems are old results with unfamiliar notation.` },
      { title: `Find a solvable first case`, text: `Before committing, prove the smallest nontrivial instance. If the first case resists completely, the problem may need more machinery than you have time for.` },
      { title: `Identify the obstruction`, text: `Write down exactly where standard methods fail. That obstruction is the content of the problem, not an annoyance.` },
      { title: `Define success`, text: `Decide in advance what would count as progress: a theorem, a counterexample, a sharp bound, a new algorithm, or a rigorous explanation of an empirical phenomenon.` },
    ],
    pitfalls: [`Choosing a problem by prestige rather than fit`, `Working without a weekly deliverable`, `Refusing to abandon a dead end`],
  },
  {
    id: 'guide-conjecture', title: `How to form and test a conjecture`, category: 'Method',
    summary: `Conjectures are engineered objects. You choose a statement precise enough to be false, then try hard to falsify it.`,
    steps: [
      { title: `Name the objects and quantifiers`, text: `"For every X satisfying P, there exists Y with Q" is a conjecture. "Usually X behaves like Y" is not yet one.` },
      { title: `Generate structural examples`, text: `Explore extremes: small cases, symmetric cases, degenerate cases and random cases. Use exact arithmetic where possible to avoid numerical artefacts.` },
      { title: `Search for a counterexample first`, text: `A conjecture that survives serious attempts to break it is worth proving. One that breaks on the first odd case was poorly stated.` },
      { title: `Find the sharp constant`, text: `If the conjecture is an inequality, determine the equality case. Sharpness often reveals the correct proof strategy.` },
      { title: `Record the evidence honestly`, text: `State the ranges checked and the method used. Label it as numerical evidence, never as proof.` },
    ],
    pitfalls: [`Fitting a statement to two examples`, `Ignoring boundary cases`, `Reporting computation without precision and range`],
  },
  {
    id: 'guide-proof', title: `How to construct and audit a proof`, category: 'Method',
    summary: `Proof construction is design under constraints; proof auditing is adversarial reading of your own argument.`,
    steps: [
      { title: `Write the statement with all hypotheses`, text: `If you cannot state the claim precisely, you cannot prove it. Include quantifiers and domains.` },
      { title: `Choose a technique from the logical form`, text: `Universal claims invite direct proof; existential claims invite construction; negations invite contradiction; natural-number claims invite induction.` },
      { title: `Find the invariant or obstruction`, text: `Most hard proofs turn on one observation: a quantity that cannot change, an extremal object, a monovariant, or a structural obstruction.` },
      { title: `Draft a complete argument`, text: `Write every step, even the ones that feel obvious. The "obvious" steps are where hidden assumptions live.` },
      { title: `Audit adversarially`, text: `For each line ask: which hypothesis licenses this? Does it fail at zero, infinity, or in the noncommutative case?` },
      { title: `Minimise and generalise`, text: `Remove unused assumptions, then state exactly how far the argument generalises and where it stops.` },
    ],
    pitfalls: [`Proving a stronger statement you did not intend`, `Assuming the conclusion in disguised form`, `Citing a theorem whose hypotheses you have not verified`],
  },
  {
    id: 'guide-write', title: `How to write a mathematical paper`, category: 'Writing',
    summary: `A paper is a proof plus a reader's guide. Both must be written deliberately.`,
    steps: [
      { title: `Lead with the main theorem`, text: `State the result and its hypotheses in the introduction before any technical machinery. Readers decide whether to continue in the first minute.` },
      { title: `Give a proof strategy section`, text: `Explain the architecture of the proof in plain language: the reduction, the key lemma, and the role of each hypothesis.` },
      { title: `Make notation local and explicit`, text: `Define every symbol at first use. Avoid single-letter variables doing two jobs in the same paper.` },
      { title: `Separate theorem from remark`, text: `Facts with proofs are theorems or lemmas; speculation is explicitly labelled as a conjecture or question.` },
      { title: `Verify every citation`, text: `Check that the paper you cite actually proves what you claim it proves. Never fabricate references, DOI numbers or page citations.` },
      { title: `Write for a skeptical reader`, text: `Anticipate the objection at each step. A paper that answers the reader's questions before they are asked is a paper people read.` },
    ],
    pitfalls: [`Hiding the main result behind definitions`, `Unverified "well-known" claims`, `Figures that contradict the text`],
  },
  {
    id: 'guide-review', title: `How to review, and how to be reviewed`, category: 'Writing',
    summary: `Peer review is a quality-control mechanism that works only when reports are specific, fair and technically informed.`,
    steps: [
      { title: `Summarise the contribution in your own words`, text: `If you cannot, say so — that is already valuable feedback.` },
      { title: `Check the main theorem line by line`, text: `Report the first place where a step fails, not just that something seems wrong.` },
      { title: `Separate correctness from significance`, text: `A paper can be correct and incremental, or wrong and important. State both assessments separately.` },
      { title: `Distinguish major and minor issues`, text: `Give the author a clear path: what must be fixed versus what would improve the paper.` },
      { title: `When reviewed, answer every point`, text: `Respond point by point, show the revised text, and thank reviewers for genuine errors found.` },
    ],
    pitfalls: [`Vague rejection without a technical reason`, `Treating a referee report as a verdict on your ability`, `Ignoring a correct criticism because it is inconvenient`],
  },
  {
    id: 'guide-tools', title: `How to use computation without confusing it with proof`, category: 'Tools',
    summary: `Computers are instruments for discovery and verification of finite statements; they do not prove universal theorems unless the computation itself is formalised.`,
    steps: [
      { title: `Choose the right system`, text: `SymPy for symbolic algebra, SageMath for number theory and algebra, NumPy/SciPy for numerics, Lean for certified proofs, NetworkX for graphs.` },
      { title: `Use exact arithmetic for conjectures`, text: `Floating point can manufacture false patterns. Prefer rationals, integers and modular arithmetic when exploring number-theoretic claims.` },
      { title: `Report method and precision`, text: `Record software version, algorithm, tolerance and range. A numerical observation without these is not reproducible.` },
      { title: `Formalise the finite step when possible`, text: `If the theorem reduces to a finite check, a proof assistant can certify the check; state this explicitly.` },
      { title: `Cross-check independently`, text: `Reproduce a result with a second implementation or a different algorithm. Agreement raises confidence; disagreement locates a bug.` },
    ],
    pitfalls: [`Assuming a plotted curve proves an inequality`, `Trusting a CAS simplification without checking domain conditions`, `Using numerical equality as algebraic identity`],
  },
  {
    id: 'guide-integrity', title: `Citation, licensing and scientific integrity`, category: 'Integrity',
    summary: `A research library is only as trustworthy as its references. These rules are non-negotiable in MATHVERSE.`,
    steps: [
      { title: `Never invent a citation`, text: `If you cannot verify a paper exists, do not cite it. Link to a title search rather than asserting an identifier.` },
      { title: `Distinguish preprint from publication`, text: `arXiv preprints may differ from published versions. Prefer the journal version when available and say which you used.` },
      { title: `Respect licences`, text: `CC BY and CC BY-SA permit reuse with attribution; CC BY-NC restricts commercial use. Link to sources rather than reproducing whole works.` },
      { title: `Attribute ideas, not just words`, text: `Credit the originator of a theorem, construction or term even when you write entirely new prose.` },
      { title: `State uncertainty`, text: `If you are unsure whether a claim is a theorem or a conjecture, say so explicitly rather than guessing.` },
    ],
    pitfalls: [`Hallucinated DOIs and page numbers`, `Citing a secondary source as primary`, `Treating Wikipedia or a blog as authoritative for a proof`],
  },
  {
    id: 'guide-career', title: `Research skills at every stage`, category: 'Method',
    summary: `The same habits mature with experience; knowing what to expect makes the transition easier.`,
    steps: [
      { title: `Undergraduate`, text: `Learn to write complete proofs, use a computer algebra system, and read one survey article. Prioritise precise definitions over speed.` },
      { title: `Beginning graduate`, text: `Attend seminars, keep a notation glossary, reproduce one paper per month independently, and find a mentor who reads your drafts.` },
      { title: `Doctoral researcher`, text: `Choose an advisor and a problem together, build a proof portfolio, give talks, and learn to referee. Expect long periods of unproductive work — they are part of the process.` },
      { title: `Independent researcher`, text: `Maintain a reading group, use preprint servers, collaborate across methods, and protect time for slow thinking.` },
    ],
    pitfalls: [`Waiting until you "know enough" before starting`, `Equating hours logged with insight gained`, `Working in isolation without feedback`],
  },
]

export const SOURCE_ATLAS: {
  id: string
  category: string
  title: string
  description: string
  examples: { name: string; url: string; note: string }[]
  caveat: string
}[] = [
  { id: 'src-textbooks', category: 'Foundations', title: `Open textbooks`, description: `Peer-reviewed, freely licensed books that establish the common language of a field. Read them for definitions and standard proofs, not for the research frontier.`, examples: [
    { name: 'OpenStax Mathematics', url: 'https://openstax.org/subjects/math', note: 'Licensed textbooks from pre-algebra through calculus and statistics.' },
    { name: 'LibreTexts Mathematics', url: 'https://math.libretexts.org/', note: 'Large collection of openly licensed books across the curriculum.' },
  ], caveat: `Coverage at graduate level is uneven; check the table of contents before relying on a volume.` },
  { id: 'src-lectures', category: 'Foundations', title: `Lecture notes and video courses`, description: `The fastest route to the working style of a research community: which examples they value, which proofs they consider central.`, examples: [
    { name: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/courses/mathematics/', note: 'Complete courses with notes, assignments and exams.' },
    { name: 'IMS / university lecture notes', url: 'https://www.math.uci.edu/', note: 'Search university mathematics departments for graduate lecture notes.' },
  ], caveat: `Notes may contain errors; treat them as a map, not a certificate.` },
  { id: 'src-encyclopedias', category: 'Reference', title: `Encyclopedias and proof databases`, description: `Useful for orientation and for checking standard statements. Never cite them as the authority for a novel proof.`, examples: [
    { name: 'nLab', url: 'https://ncatlab.org/nlab/show/HomePage', note: 'Advanced category-theoretic and higher-structure mathematics.' },
    { name: 'ProofWiki', url: 'https://proofwiki.org/wiki/Main_Page', note: 'Community-maintained proofs; good for checking steps.' },
    { name: 'MathWorld', url: 'https://mathworld.wolfram.com/', note: 'Broad reference for definitions and standard results.' },
  ], caveat: `Community pages can contain mistakes. Verify anything you build on.` },
  { id: 'src-databases', category: 'Reference', title: `Mathematical databases`, description: `Curated data objects — sequences, L-functions, elliptic curves, groups — that turn abstract definitions into searchable evidence.`, examples: [
    { name: 'OEIS', url: 'https://oeis.org/', note: 'The On-Line Encyclopedia of Integer Sequences; invaluable for pattern recognition.' },
    { name: 'LMFDB', url: 'https://www.lmfdb.org/', note: 'L-functions and modular forms database.' },
    { name: 'GAP', url: 'https://www.gap-system.org/', note: 'Computational group theory system and libraries.' },
  ], caveat: `Database entries are computed objects; proofs still require arguments.` },
  { id: 'src-preprints', category: 'Literature', title: `Preprint servers`, description: `Where new mathematics appears first. Reading the latest preprints reveals open problems before they enter textbooks.`, examples: [
    { name: 'arXiv mathematics', url: 'https://arxiv.org/list/math/recent', note: 'Daily preprints across all mathematical fields.' },
    { name: 'HAL', url: 'https://hal.science/', note: 'Multi-disciplinary open archive with a strong mathematics section.' },
  ], caveat: `Preprints are not peer-reviewed. Check journal versions before citing results as established.` },
  { id: 'src-journals', category: 'Literature', title: `Journals and proceedings`, description: `Peer-reviewed venues that certify a result has survived expert scrutiny. Reading a journal's recent issues teaches the standards of a community.`, examples: [
    { name: 'AMS journals', url: 'https://www.ams.org/publications/journals/journalsframework', note: 'Annals, Journal of the AMS, Proceedings and more.' },
    { name: 'EMS journals', url: 'https://www.ems.press/journals', note: 'European Mathematical Society journal family.' },
  ], caveat: `Access may be institutional; use open-access mirrors or author versions where permitted.` },
  { id: 'src-software', category: 'Tools', title: `Mathematical software`, description: `Tools for symbolic computation, numerics, verification and visualisation. Each has a distinct epistemic role.`, examples: [
    { name: 'SymPy', url: 'https://www.sympy.org/', note: 'Symbolic algebra in Python; ideal for checking derivations.' },
    { name: 'SageMath', url: 'https://www.sagemath.org/', note: 'Comprehensive open mathematics system.' },
    { name: 'Lean', url: 'https://lean-lang.org/', note: 'Proof assistant with a kernel that certifies formal proofs.' },
    { name: 'NumPy / SciPy', url: 'https://docs.scipy.org/doc/scipy/', note: 'Numerical computation, optimisation and statistics.' },
    { name: 'NetworkX', url: 'https://networkx.org/', note: 'Graph algorithms and network analysis in Python.' },
  ], caveat: `Software output is evidence about a computation, not a proof of a general statement.` },
  { id: 'src-communities', category: 'Community', title: `Question and answer communities`, description: `Places where specific technical obstacles can be discussed with experts; also a record of what practitioners find genuinely difficult.`, examples: [
    { name: 'MathOverflow', url: 'https://mathoverflow.net/', note: 'Research-level questions and answers.' },
    { name: 'Mathematics Stack Exchange', url: 'https://math.stackexchange.com/', note: 'Advanced undergraduate and graduate questions.' },
    { name: 'Art of Problem Solving', url: 'https://artofproblemsolving.com/community', note: 'Olympiad-level problem solving community.' },
  ], caveat: `Answers vary in reliability; verify before relying on them in a proof.` },
  { id: 'src-history', category: 'History', title: `Historical sources and archives`, description: `Original papers and translated classics reveal how concepts were invented, including the dead ends that textbooks omit.`, examples: [
    { name: 'Euler Archive', url: 'https://eulerarchive.maa.org/', note: "Leonhard Euler's collected works, indexed and translated." },
    { name: "Riemann's collected works", url: 'https://www.math.dartmouth.edu/~doyle/docs/riemann/riemann.html', note: "Translations and context for Riemann's papers." },
    { name: 'MacTutor History of Mathematics', url: 'https://mathshistory.st-andrews.ac.uk/', note: 'Biographies and historical essays with mathematical content.' },
  ], caveat: `Historical notation differs sharply from modern notation; translate carefully.` },
  { id: 'src-frontiers', category: 'Frontiers', title: `Problem lists and prize problems`, description: `Authoritative statements of what is not known, with precise hypotheses and existing partial results.`, examples: [
    { name: 'Clay Millennium Problems', url: 'https://www.claymath.org/millennium-problems/', note: 'The seven official problem statements.' },
    { name: 'Open Problem Garden', url: 'https://www.openproblemgarden.org/', note: 'Community-maintained collection of open problems.' },
  ], caveat: `A problem list is not a proof of importance; judge problems by their connections.` },
]

export const READING_ROUTES: {
  id: string
  title: string
  field: string
  goal: string
  steps: { label: string; detail: string }[]
}[] = [
  { id: 'route-rh', title: `From the prime number theorem to the Riemann hypothesis`, field: `Analytic number theory`,
    goal: `Understand why zeros of ζ control the error term in the distribution of primes.`,
    steps: [
      { label: `1 · Complex analysis`, detail: `Holomorphic functions, contour integration and residues (Complex Analysis Lab).` },
      { label: `2 · Euler products`, detail: `Derive ζ(s) = Π(1−p⁻ˢ)⁻¹ and connect it to unique factorisation.` },
      { label: `3 · Riemann's memoir`, detail: `Read the 1859 paper: analytic continuation, functional equation, explicit formula.` },
      { label: `4 · Zero-free regions`, detail: `Understand the Hadamard–de la Vallée Poussin proof of the PNT.` },
      { label: `5 · The conjecture`, detail: `State RH precisely; study Hardy's theorem and numerical evidence separately.` },
    ] },
  { id: 'route-pnp', title: `From algorithms to P versus NP`, field: `Computational complexity`,
    goal: `Know exactly what the P/NP question asks and why standard proof techniques fail.`,
    steps: [
      { label: `1 · Finite models`, detail: `Automata, Turing machines and decidability.` },
      { label: `2 · Time complexity`, detail: `Big-O, polynomial time, reductions.` },
      { label: `3 · NP-completeness`, detail: `Cook–Levin theorem and Karp's reductions.` },
      { label: `4 · Barriers`, detail: `Relativisation, natural proofs and algebraicisation.` },
      { label: `5 · The open question`, detail: `Separate what is proved from what is believed.` },
    ] },
  { id: 'route-langlands', title: `From Galois theory to the Langlands programme`, field: `Arithmetic geometry`,
    goal: `See the dictionary between Galois representations and automorphic forms.`,
    steps: [
      { label: `1 · Symmetry`, detail: `Groups, field extensions and the Galois correspondence.` },
      { label: `2 · Local fields`, detail: `p-adic numbers and local Galois groups.` },
      { label: `3 · Automorphic forms`, detail: `Modular forms as highly symmetric analytic functions.` },
      { label: `4 · L-functions`, detail: `Euler products, functional equations and analytic continuation.` },
      { label: `5 · The correspondence`, detail: `Read a survey before attempting a research paper.` },
    ] },
  { id: 'route-ml', title: `From linear algebra to generalisation theory`, field: `Mathematics for AI`,
    goal: `Derive the mathematics of a learning algorithm and bound its generalisation.`,
    steps: [
      { label: `1 · Representation`, detail: `Vector spaces, SVD and tensor notation.` },
      { label: `2 · Optimisation`, detail: `Gradient descent, convexity and convergence rates.` },
      { label: `3 · Probability`, detail: `Likelihood, KL divergence and concentration inequalities.` },
      { label: `4 · Empirical risk`, detail: `Define training risk, true risk and capacity.` },
      { label: `5 · Generalisation`, detail: `Rademacher complexity, PAC bounds and double descent.` },
    ] },
  { id: 'route-dynamics', title: `From differential equations to chaos`, field: `Dynamical systems`,
    goal: `Understand how deterministic local rules produce unpredictable global behaviour.`,
    steps: [
      { label: `1 · ODE theory`, detail: `Existence, uniqueness and phase portraits.` },
      { label: `2 · Linearisation`, detail: `Stability via eigenvalues and Lyapunov methods.` },
      { label: `3 · Bifurcations`, detail: `Saddle-node, transcritical and period doubling.` },
      { label: `4 · Strange attractors`, detail: `Lorenz system and sensitive dependence.` },
      { label: `5 · Rigour`, detail: `Distinguish numerical attractors from proved invariant sets.` },
    ] },
]

export const RESEARCH_GLOSSARY = [
  { term: `iff`, meaning: `If and only if: two statements imply each other.`, pitfall: `A one-way implication is not equivalence.` },
  { term: `wlog`, meaning: `Without loss of generality — a symmetry justifies assuming a case.`, pitfall: `The symmetry must actually map the general case to the assumed one.` },
  { term: `a.e.`, meaning: `Almost everywhere: except on a set of measure zero.`, pitfall: `Measure zero is not empty; exceptional points can matter.` },
  { term: `up to isomorphism`, meaning: `Objects are considered the same when a structure-preserving bijection exists.`, pitfall: `The isomorphism must preserve the structure under discussion.` },
  { term: `generically`, meaning: `True on an open dense set, or outside a proper algebraic subset.`, pitfall: `Which topology or algebraic structure is meant must be stated.` },
  { term: `sharp`, meaning: `An inequality whose constant cannot be improved.`, pitfall: `Showing one example with equality does not prove sharpness unless the constant is maximal.` },
  { term: `regularity`, meaning: `How smooth a solution or object is (continuity, differentiability, analyticity).`, pitfall: `Weak solutions may lack the regularity assumed in heuristics.` },
  { term: `compactness`, meaning: `Finite subcover property; in ℝⁿ, closed and bounded.`, pitfall: `Infinite-dimensional closed bounded sets need not be compact.` },
  { term: `canonical`, meaning: `A construction independent of arbitrary choices.`, pitfall: `A choice of basis is usually not canonical, even if convenient.` },
  { term: `functorial`, meaning: `A construction that respects morphisms and composition.`, pitfall: `A map on objects alone is not a functor.` },
  { term: `well-defined`, meaning: `The value does not depend on the representative used to define it.`, pitfall: `Quotient constructions are the common source of this check.` },
  { term: `trivial`, meaning: `True by an immediate argument from the definition.`, pitfall: `In papers, "trivial" often means "the author has not written the proof".` },
]

export const PAPER_STUDY_FIELDS = [
  { key: 'claim', label: `Main claim in one sentence`, placeholder: `This paper proves that for every … under the hypotheses …` },
  { key: 'definitions', label: `Notation glossary`, placeholder: `Symbol → meaning → domain; list reused symbols.` },
  { key: 'hypotheses', label: `Hypotheses and where each is used`, placeholder: `H1: … used in Lemma 2.3 to justify compactness.` },
  { key: 'strategy', label: `Proof strategy`, placeholder: `Reduction → key lemma → conclusion.` },
  { key: 'gap', label: `First step I cannot reconstruct`, placeholder: `Page 6, line 12: why does uniform convergence follow here?` },
  { key: 'example', label: `Example and edge case`, placeholder: `The theorem applies to … and fails if hypothesis H2 is dropped because …` },
  { key: 'computation', label: `Computation reproduced`, placeholder: `Software, version, tolerance, range, result.` },
  { key: 'questions', label: `Three research questions`, placeholder: `Technical, strategic, frontier.` },
]
