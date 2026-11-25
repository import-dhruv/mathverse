// External proof libraries and the culture of formal proof. MATHVERSE never
// claims to replace these resources; it connects its atlas to them.
export type ProofSource = {
  id: string
  name: string
  type: 'Proof assistant' | 'Proof database' | 'Encyclopedia' | 'Community' | 'Formal archive'
  description: string
  url: string
  bestFor: string
  caveat: string
}

export const PROOF_SOURCES: ProofSource[] = [
  { id: 'ps-lean', name: 'Lean & mathlib', type: 'Proof assistant', description: 'A theorem prover and the largest collaborative formalisation of modern mathematics, covering algebra, analysis, topology and number theory.', url: 'https://lean-lang.org/', bestFor: 'Machine-checked proofs; learning formal proof structure.', caveat: 'Formal proofs are verified by a kernel, but reading them requires learning Lean’s language.' },
  { id: 'ps-mathlib-docs', name: 'Mathlib documentation', type: 'Formal archive', description: 'Generated documentation of the mathlib library with theorem statements and namespaces.', url: 'https://mathlib-docs.icecreamopenapi.dev/', bestFor: 'Finding the exact statement of a formalised theorem.', caveat: 'Documentation reflects the current library version and changes over time.' },
  { id: 'ps-proofwiki', name: 'ProofWiki', type: 'Proof database', description: 'A community-maintained collection of proofs across elementary and advanced mathematics.', url: 'https://proofwiki.org/wiki/Main_Page', bestFor: 'Checking a standard proof step you have forgotten.', caveat: 'Community-maintained: verify anything you depend on.' },
  { id: 'ps-metamath', name: 'Metamath', type: 'Formal archive', description: 'A rigorous, minimal-foundation database of formally verified proofs from set theory onward.', url: 'https://metamath.org/', bestFor: 'Seeing proofs reduced to their logical atoms.', caveat: 'The notation is intentionally austere.' },
  { id: 'ps-isabelle', name: 'Isabelle/HOL', type: 'Proof assistant', description: 'A higher-order logic proof assistant with a large archive of formalised mathematics.', url: 'https://isabelle.in.tum.de/', bestFor: 'Formal verification and the Archive of Formal Proofs.', caveat: 'Distinct tactic language from Lean.' },
  { id: 'ps-coq', name: 'Rocq / Coq', type: 'Proof assistant', description: 'A proof assistant based on the calculus of inductive constructions, widely used in programming language theory.', url: 'https://rocq-prover.org/', bestFor: 'Type theory, semantics and certified programs.', caveat: 'Different foundations from Lean’s mathlib conventions.' },
  { id: 'ps-mizar', name: 'Mizar', type: 'Formal archive', description: 'A proof assistant with a large library written in a near-natural mathematical language.', url: 'https://mizar.org/', bestFor: 'Reading formal proofs that resemble textbook prose.', caveat: 'The system and library are less actively maintained than mathlib.' },
  { id: 'ps-ho-light', name: 'HOL Light', type: 'Proof assistant', description: 'A minimal higher-order logic prover used for major formalisation projects.', url: 'https://www.cl.cam.ac.uk/~jrh13/hol-light/', bestFor: 'Foundations and classical analysis formalisation.', caveat: 'Small community and OCaml-based workflow.' },
  { id: 'ps-nlab', name: 'nLab', type: 'Encyclopedia', description: 'An encyclopedia of higher structures, category theory, topology and mathematical physics.', url: 'https://ncatlab.org/nlab/show/HomePage', bestFor: 'Canonical definitions and categorical viewpoints.', caveat: 'Often assumes advanced background.' },
  { id: 'ps-ao ps', name: 'Art of Problem Solving', type: 'Community', description: 'A large community and wiki focused on olympiad problem solving and elegant elementary proofs.', url: 'https://artofproblemsolving.com/wiki/index.php/Main_Page', bestFor: 'Short, clever elementary proofs.', caveat: 'Forum solutions are user-generated; check them.' },
  { id: 'ps-mathoverflow', name: 'MathOverflow', type: 'Community', description: 'A research-level question and answer community where proof gaps and references are discussed by experts.', url: 'https://mathoverflow.net/', bestFor: 'Locating a hard proof or a precise reference.', caveat: 'Not a substitute for reading the literature yourself.' },
  { id: 'ps-euler-archive', name: 'The Euler Archive', type: 'Formal archive', description: 'Digitised works of Leonhard Euler, including original proofs in their historical form.', url: 'https://eulerarchive.maa.org/', bestFor: 'Seeing how classic proofs were first written.', caveat: 'Historical notation and standards differ from modern ones.' },
]

export const PROOF_CULTURE = [
  {
    id: 'pc-status',
    title: `A proof is not a proof sketch, and neither is a heuristic`,
    text: `A complete proof makes every inference checkable from stated hypotheses. A proof sketch gives the architecture and omits routine or technical details — useful for orientation, not for certification. A heuristic explains why a statement should be true. A conjecture may be overwhelmingly supported by computation and still be unproved. The Proof Atlas labels each record by status; when you write your own proofs, adopt the same discipline.`,
  },
  {
    id: 'pc-decisive',
    title: `Most proofs turn on one idea`,
    text: `Behind a long argument there is usually a single move: choose the right invariant, construct the extremal object, pass to a quotient, compactify, diagonalise, induct on a complexity measure, or reduce to a special case. Finding that move is the creative act; the remaining lines are bookkeeping. When studying a proof, identify the decisive idea first — otherwise you will remember a sequence of tricks instead of a method.`,
  },
  {
    id: 'pc-hypotheses',
    title: `Hypotheses are load-bearing`,
    text: `Every hypothesis in a theorem should be used, or explained as redundant. Removing one and constructing a counterexample is the fastest way to understand what the theorem really says. Edge cases — zero, the empty set, characteristic two, infinite dimensions, noncommutativity — are where hidden assumptions surface.`,
  },
  {
    id: 'pc-formal',
    title: `Formal proof is a different kind of certainty`,
    text: `A proof assistant checks each inference against a kernel; this eliminates human gaps but not misstated theorems or mismodelled definitions. A formal proof confirms that a precise statement follows from precise axioms. It does not replace the mathematical insight that tells you which statement matters.`,
  },
  {
    id: 'pc-atlas',
    title: `How to use this atlas`,
    text: `Browse by field or search by title. Read the decisive idea, then the steps, then try to reconstruct the proof before reading further. Use the external libraries to compare treatments, and the Proof Studio workspace to write your own version. A proof you can reconstruct is knowledge; a proof you only recognise is recognition.`,
  },
]
