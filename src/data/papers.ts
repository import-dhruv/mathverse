import type { Paper } from '../lib/types'

// Curated landmark papers. Links go to stable arXiv searches or publisher pages
// rather than guessed identifiers: we never fabricate identifiers or DOIs.
const arxivSearch = (title: string) => `https://arxiv.org/search/?query=${encodeURIComponent(title)}&searchtype=title`

function paper(id: string, title: string, authors: string[], year: string, category: string, summary: string, topicIds: string[], frontierIds: string[] = []): Paper {
  return { id, title, authors, published: year, year, category, summary, url: arxivSearch(title), source: 'Curated', topicIds, frontierIds }
}

export const PAPERS: Paper[] = [
  paper('paper-euclid-elements', 'The Elements', ['Euclid'], 'c. 300 BCE', 'math.HO', 'The axiomatic foundation of geometry and number theory, translated in many editions.', ['euclidean-geometry','geometric-proofs']),
  paper('paper-newton-principia', 'Philosophiæ Naturalis Principia Mathematica', ['Isaac Newton'], '1687', 'math.HO', 'Mathematical principles of natural philosophy; the origin of classical mechanics.', ['classical-mechanics-math','derivatives']),
  paper('paper-cauchy-cours', 'Cours d’Analyse', ['Augustin Cauchy'], '1821', 'math.HO', 'A rigorous treatment of limits, continuity and series.', ['limits','continuity']),
  paper('paper-riemann-zeta', 'On the Number of Primes Less Than a Given Magnitude', ['Bernhard Riemann'], '1859', 'math.NT', 'The memoir tying prime distribution to the zeros of the zeta function.', ['riemann-zeta-function','distribution-of-primes'], ['fr-riemann']),
  paper('paper-cantor-diagonal', 'On an Elementary Property of the Set of All Real Algebraic Numbers', ['Georg Cantor'], '1874', 'math.LO', 'The first proof that the reals are uncountable.', ['cardinality','set-theory']),
  paper('paper-hilbert-problems', 'Mathematical Problems', ['David Hilbert'], '1900', 'math.HO', 'A lecture listing 23 problems that shaped the twentieth century.', ['foundations-mathematics']),
  paper('paper-noether-ideale', 'Idealtheorie in Ringbereichen', ['Emmy Noether'], '1921', 'math.RA', 'The Noetherian condition and the structural approach to rings.', ['rings','ideals']),
  paper('paper-godel-incompleteness', 'On Formally Undecidable Propositions of Principia Mathematica and Related Systems', ['Kurt Gödel'], '1931', 'math.LO', 'The first incompleteness theorem.', ['godel-incompleteness'], []),
  paper('paper-turing-computable', 'On Computable Numbers, with an Application to the Entscheidungsproblem', ['Alan Turing'], '1936', 'cs.CC', 'The Turing machine and undecidability.', ['computability-theory'], ['fr-pnp']),
  paper('paper-cook-np', 'The Complexity of Theorem-Proving Procedures', ['Stephen A. Cook'], '1971', 'cs.CC', 'NP-completeness of satisfiability.', ['computational-complexity'], ['fr-pnp']),
  paper('paper-wiles-fermat', 'Modular Elliptic Curves and Fermat’s Last Theorem', ['Andrew Wiles'], '1995', 'math.NT', 'Proof of Fermat’s Last Theorem via modularity of semistable elliptic curves.', ['elliptic-curves','modular-forms']),
  paper('paper-perelman-ricci', 'The Entropy Formula for the Ricci Flow and its Geometric Applications', ['Grigori Perelman'], '2003', 'math.DG', 'The first of three papers proving the Poincaré and geometrisation conjectures.', ['topology','riemannian-geometry']),
  paper('paper-zhang-gaps', 'Bounded Gaps Between Primes', ['Yitang Zhang'], '2014', 'math.NT', 'The first proof of bounded gaps between infinitely many primes.', ['prime-numbers','distribution-of-primes'], ['fr-twin']),
  paper('paper-maynard-primes', 'Dense Clusters of Primes in Subsets', ['James Maynard'], '2015', 'math.NT', 'Multidimensional sieve methods and bounded prime gaps.', ['prime-numbers'], ['fr-twin']),
  paper('paper-hlf-goldbach', 'Every Odd Integer Larger Than 1 is the Sum of at Most Five Primes', ['Harald Helfgott'], '2013', 'math.NT', 'Proof of the weak Goldbach conjecture.', ['number-theory'], ['fr-goldbach']),
  paper('paper-nesterov-accelerated', 'A Method for Solving the Convex Programming Problem with Convergence Rate O(1/k²)', ['Yurii Nesterov'], '1983', 'math.OC', 'Accelerated gradient methods for convex optimisation.', ['convex-optimization'], ['fr-optimization-ml']),
  paper('paper-vapnik-statistical', 'The Nature of Statistical Learning Theory', ['Vladimir Vapnik'], '1995', 'cs.LG', 'Statistical foundations of learning and generalisation.', ['statistical-learning-theory-ai'], ['fr-optimization-ml']),
  paper('paper-attention', 'Attention Is All You Need', ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar', 'Jakob Uszkoreit'], '2017', 'cs.LG', 'The transformer architecture built from attention and feed-forward layers.', ['transformers-math'], ['fr-optimization-ml']),
  paper('paper-nogo-cloning', 'A Single Quantum Cannot Be Cloned', ['W. K. Wootters', 'W. H. Zurek'], '1982', 'quant-ph', 'The no-cloning theorem for unknown quantum states.', ['quantum-computing-foundations'], ['fr-quantum-computing']),
  paper('paper-shor-factoring', 'Polynomial-Time Algorithms for Prime Factorization and Discrete Logarithms on a Quantum Computer', ['Peter W. Shor'], '1997', 'quant-ph', 'Quantum algorithms for factoring and discrete log.', ['quantum-computing-foundations'], ['fr-quantum-computing']),
  paper('paper-ll-prime-tuples', 'Some Problems of Partitio Numerorum III: On the Expression of a Number as a Sum of Primes', ['G. H. Hardy', 'J. E. Littlewood'], '1923', 'math.NT', 'The circle method and conjectures on prime constellations.', ['analytic-number-theory'], ['fr-twin','fr-goldbach']),
  paper('paper-kolmogorov-foundations', 'Foundations of the Theory of Probability', ['Andrey Kolmogorov'], '1933', 'math.PR', 'The measure-theoretic axiomatisation of probability.', ['probability-axioms']),
  paper('paper-lurie-higher', 'Higher Topos Theory', ['Jacob Lurie'], '2009', 'math.CT', 'A foundational treatment of (∞,1)-categories and higher topoi.', ['higher-category-theory'], ['fr-higher-categories']),
  paper('paper-ngo-fundamental', 'The Fundamental Lemma for Stabilization of Automorphic Forms', ['Bao-Châu Ngô'], '2010', 'math.NT', 'Proof of the fundamental lemma in the Langlands programme.', ['langlands-program'], ['fr-langlands']),
]

export const PAPER_BY_ID = Object.fromEntries(PAPERS.map(p => [p.id, p])) as Record<string, Paper>
export const PAPERS_BY_TOPIC = PAPERS.reduce((m, p) => {
  p.topicIds.forEach(t => { if (!m.has(t)) m.set(t, []); m.get(t)!.push(p) })
  return m
}, new Map<string, Paper[]>())
export const PAPERS_BY_FRONTIER = PAPERS.reduce((m, p) => {
  p.frontierIds.forEach(f => { if (!m.has(f)) m.set(f, []); m.get(f)!.push(p) })
  return m
}, new Map<string, Paper[]>())
export const PAPER_CATEGORIES = [...new Set(PAPERS.map(p => p.category))].sort()
