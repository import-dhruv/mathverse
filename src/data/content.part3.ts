import type { Topic, Derivation, Problem } from '../lib/types'

// Part 3 content: probability, statistics, abstract algebra, analysis, geometry.
// All LaTeX is authored with String.raw so backslashes survive verbatim.

export const P3_TOPICS: Topic[] = [
  {
    id: 'probability-axioms',
    title: 'Probability Axioms',
    branchId: 'probability-theory',
    level: 'Undergraduate 1',
    summary: String.raw`Kolmogorov's axioms make probability a normalized measure on a sigma-algebra of events: countable additivity replaces vague talk of "equally likely cases". From three short rules we derive finite additivity, monotonicity, continuity of probability and inclusion–exclusion.`,
    prerequisites: ['set-theory', 'combinatorics'],
    tags: ['measure', 'sigma-algebra', 'countable-additivity', 'foundations'],
    status: 'Complete',
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`Classical probability assigned $P(A)=\lvert A\rvert/\lvert\Omega\rvert$ by counting equally likely outcomes. That fails for infinite sample spaces and for biased or continuous phenomena. We need a framework that handles coin flips, heights of people and random functions in one language, and that justifies passing limits through probability. The answer is to treat probability as a measure with total mass $1$.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`Think of probability mass as a unit of dust spread over the sample space. An event is a region that can catch dust. The axioms say: the whole space catches all the dust, no region has negative mass, and dust caught by countably many disjoint regions is the sum of the dust in each. Countable — not merely finite — additivity is the crucial upgrade: it is what lets us take limits.` },
      { kind: 'callout', tone: 'intuition', title: 'Why a sigma-algebra?', text: String.raw`We cannot consistently assign a probability to every subset of $\mathbb{R}$ while demanding translation invariance and countable additivity (Vitali). We therefore specify in advance which subsets are *measurable* — the sigma-algebra — and assign probabilities only there.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`Draw $\Omega$ as a large rectangle of area $1$. Events are shapes inside it; $A^c$ is the complement, and $A\cup B$ is the union. Disjoint events are non-overlapping shapes, so their areas add. A decreasing sequence of shapes $A_1\supseteq A_2\supseteq\cdots$ shrinks to $\bigcap_n A_n$, and its area shrinks to the area of the limit.` },
      { kind: 'math', latex: String.raw`\Omega\quad\longleftrightarrow\quad\text{unit area};\qquad A\subseteq\Omega\quad\longleftrightarrow\quad\text{measurable shape with area }P(A)`, display: true, caption: 'Area as a mental model for probability mass.' },
      { kind: 'callout', tone: 'visual', title: 'Nested events', text: String.raw`If $A_n\downarrow A$ then $P(A_n)\downarrow P(A)$; if $A_n\uparrow A$ then $P(A_n)\uparrow P(A)$. The pictures are nested shapes converging to a limiting shape, and the numbers converge to the area of that shape.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`A **probability space** is a triple $(\Omega,\mathcal{F},P)$. Here $\Omega$ is the sample space, $\mathcal{F}\subseteq 2^\Omega$ is a sigma-algebra (contains $\Omega$, closed under complement and countable union), and $P:\mathcal{F}\to[0,1]$ satisfies the three Kolmogorov axioms.` },
      { kind: 'math', latex: String.raw`\begin{aligned}&\textbf{(A1)}\quad P(A)\ge 0\quad\forall A\in\mathcal{F},\\&\textbf{(A2)}\quad P(\Omega)=1,\\&\textbf{(A3)}\quad P\!\left(\biguplus_{n=1}^{\infty}A_n\right)=\sum_{n=1}^{\infty}P(A_n)\quad\text{for pairwise disjoint }A_n\in\mathcal{F}.\end{aligned}`, display: true },
      { kind: 'list', items: [
        String.raw`$\Omega$: all possible outcomes (e.g. $\{1,2,3,4,5,6\}$ for one die).`,
        String.raw`$\mathcal{F}$: the events we are allowed to ask about; elements of $\mathcal{F}$ are measurable.`,
        String.raw`$P$: a set function assigning a number in $[0,1]$; countable additivity is axiom (A3).`,
        String.raw`An event with $P(A)=1$ is said to occur *almost surely* (a.s.).`
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`We derive the standard rules from (A1)–(A3) alone. No counting or symmetry is used.` },
      { kind: 'steps', title: 'Consequences of the axioms', items: [
        { title: 'The empty set has probability zero', text: String.raw`Take $A_1=\Omega$ and $A_n=\varnothing$ for $n\ge2$; these sets are disjoint and $\biguplus A_n=\Omega$.`, math: String.raw`$1=P(\Omega)=P(\Omega)+\sum_{n=2}^{\infty}P(\varnothing)\Rightarrow P(\varnothing)=0.$` },
        { title: 'Finite additivity', text: String.raw`For disjoint $B_1,\dots,B_m$, set $A_n=B_n$ for $n\le m$ and $A_n=\varnothing$ for $n>m$, then apply (A3).`, math: String.raw`$P\!\left(\biguplus_{i=1}^m B_i\right)=\sum_{i=1}^m P(B_i).$` },
        { title: 'Complement rule', text: String.raw`$A$ and $A^c$ are disjoint with union $\Omega$.`, math: String.raw`$P(A^c)=1-P(A).$` },
        { title: 'Monotonicity', text: String.raw`If $A\subseteq B$ then $B=A\uplus(B\setminus A)$ and both pieces lie in $\mathcal{F}$.`, math: String.raw`$P(B)=P(A)+P(B\setminus A)\ge P(A).$` },
        { title: 'Continuity from below', text: String.raw`For $A_n\uparrow A$, write $A=\biguplus_{n\ge1}(A_n\setminus A_{n-1})$ with $A_0=\varnothing$ and use (A3) plus telescoping partial sums.`, math: String.raw`$P(A)=\sum_{n=1}^{\infty}\bigl(P(A_n)-P(A_{n-1})\bigr)=\lim_{n\to\infty}P(A_n).$` },
        { title: 'Continuity from above', text: String.raw`For $A_n\downarrow A$ with $P(A_1)<\infty$ (automatic here), apply the previous step to $A_1\setminus A_n\uparrow A_1\setminus A$.`, math: String.raw`$P(A)=\lim_{n\to\infty}P(A_n).$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — one fair die.** $\Omega=\{1,\dots,6\}$, $\mathcal{F}=2^\Omega$, $P(A)=\lvert A\rvert/6$. Let $E=\{2,4,6\}$ (even) and $H=\{4,5,6\}$ (high). Then $P(E)=3/6=1/2$, $P(H)=1/2$, $E\cap H=\{4\}$ so $P(E\cup H)=3/6+3/6-1/6=5/6$, and $P(E^c)=1/2$.` },
      { kind: 'paragraph', text: String.raw`**Example 2 — geometric tail.** Flip a fair coin until the first head; $\Omega=\{1,2,3,\dots\}$ with $P(\{k\})=2^{-k}$. Countable additivity gives $\sum_{k=1}^{\infty}2^{-k}=1$, so $P$ is a genuine probability measure. The event "first head after position 10" has probability $\sum_{k=11}^{\infty}2^{-k}=2^{-10}=1/1024\approx0.000977.$` },
      { kind: 'math', latex: String.raw`$P(E\cup H)=P(E)+P(H)-P(E\cap H),\qquad \sum_{k=1}^{m}2^{-k}=1-2^{-m}\xrightarrow[m\to\infty]{}1$`, display: true, caption: 'Inclusion–exclusion and a convergent geometric series.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Inclusion–exclusion.** For events $A_1,\dots,A_n$, $P\!\left(\bigcup_i A_i\right)=\sum_{\varnothing\ne S\subseteq\{1,\dots,n\}}(-1)^{\lvert S\rvert+1}P\!\left(\bigcap_{i\in S}A_i\right)$. Proof by induction: use $P(A\cup B)=P(A)+P(B)-P(A\cap B)$ and distribute. **Bonferroni inequalities** keep only terms up to an even or odd truncation and give alternating upper and lower bounds.` },
      { kind: 'math', latex: String.raw`$P\Bigl(\bigcup_{i=1}^{n}A_i\Bigr)\le\sum_{i=1}^n P(A_i)$`, display: true, caption: 'Union bound (Boole), valid without independence.' },
      { kind: 'callout', tone: 'history', title: 'From counting to measure', text: String.raw`Laplace's 1812 *Théorie analytique des probabilités* defined probability by counting favourable cases. Andrey Kolmogorov's 1933 *Grundbegriffe der Wahrscheinlichkeitsrechnung* recast the subject as measure theory, enabling rigorous treatment of infinite sequences and stochastic processes.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We verify countable additivity numerically by summing geometric weights and compare with Monte Carlo frequencies for the die example. The empirical frequencies should approach $1/2$ and $5/6$.` },
      { kind: 'code', language: 'python', code: String.raw`import numpy as np
# geometric weights sum to 1
k = np.arange(1, 200)
w = 2.0 ** (-k)
print('sum 2^-k =', w.sum(), 'tail after 10 =', 2.0 ** -10)

# Monte Carlo check of P(even) and P(even or high)
rng = np.random.default_rng(0)
x = rng.integers(1, 7, size=200_000)
even, high = x % 2 == 0, x >= 4
print('P(even) ~', even.mean(), 'target 0.5')
print('P(even or high) ~', (even | high).mean(), 'target 5/6 =', 5/6)`, caption: 'Axioms in code: normalization and empirical convergence.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Reliability engineering:** if component failures are disjoint events, system failure probability is the sum — finite additivity in action.`,
        String.raw`**Insurance:** premiums are computed from expected losses, which require a normalized probability measure over infinitely many claim sizes.`,
        String.raw`**Statistical mechanics:** phase-space volumes are probability measures; countable additivity underlies the thermodynamic limit.`,
        String.raw`**Risk management:** the union bound bounds the chance that *any* of many independent risk events occurs, without needing independence.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Three frequent errors', text: String.raw`(i) Assuming every subset of $\Omega$ is an event when $\Omega$ is uncountable; (ii) confusing $P(A\mid B)$ with $P(B\mid A)$; (iii) using finite additivity on an infinite disjoint union — only countable additivity is guaranteed, and even that applies solely to *disjoint* pieces.` },
      { kind: 'list', items: [
        String.raw`Do not write $P(A)+P(A^c)=1$ before checking $A\in\mathcal{F}$.`,
        String.raw`Continuity from above requires $P(A_1)<\infty$; in probability this holds automatically because $P\le1$, but in general measure theory it does not.`,
        String.raw`"Almost surely" is not "logically certain" — an event of probability $1$ can still fail at points of measure zero.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Why is countable additivity stronger than finite additivity, and why does that matter for limits?`,
        String.raw`Give an example of a sigma-algebra that is not the full power set.`,
        String.raw`If $P(A_n)\to0$, must $A_n\to\varnothing$ as sets? Explain.`,
        String.raw`How would you define a probability measure on the space of infinite coin-flip sequences?`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`A. N. Kolmogorov, *Foundations of the Theory of Probability* (1933) — the original axiomatisation.`,
        String.raw`P. Billingsley, *Probability and Measure* — chapters 1–2 connect axioms to measure theory.`,
        String.raw`W. Feller, *An Introduction to Probability Theory and Its Applications*, Vol. I — classical examples.`
      ] },
      { kind: 'callout', tone: 'note', title: 'Bridge to the next topic', text: String.raw`Conditional probability reuses only the complement and intersection rules derived above; the sigma-algebra machinery guarantees the conditioning event is measurable.` }
    ]
  },
  {
    id: 'conditional-probability',
    title: 'Conditional Probability',
    branchId: 'probability-theory',
    level: 'Undergraduate 1',
    summary: String.raw`Conditioning restricts the universe to a known event $B$ and renormalizes the remaining mass. The definition $P(A\mid B)=P(A\cap B)/P(B)$ yields the product rule, the chain rule and the law of total probability, the workhorses of Bayesian reasoning.`,
    prerequisites: ['probability-axioms', 'set-theory'],
    tags: ['conditioning', 'product-rule', 'total-probability', 'independence'],
    status: 'Complete',
    simulationIds: ['bayes-updater'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`Information changes probabilities. Knowing that a patient has a symptom, or that a die shows an even number, rules out outcomes and redistributes probability among the survivors. We need a rule that updates $P$ coherently when we learn $B$ has occurred, and that reduces to the old probabilities when $B=\Omega$.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`Imagine the unit-mass rectangle from the axioms. Learning $B$ means discarding everything outside $B$ and rescaling what remains so its mass is again $1$. The part of $A$ that survives is $A\cap B$; dividing by the mass of $B$ performs the rescaling.` },
      { kind: 'callout', tone: 'intuition', title: 'A restricted universe', text: String.raw`Conditioning on $B$ creates a new probability space $(\Omega,\mathcal{F},P(\cdot\mid B))$ with the same events but a new measure. All axiom-derived rules (complement, union bound, continuity) hold in this new space.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`Draw two overlapping circles $A$ and $B$ inside the unit rectangle. Conditional probability $P(A\mid B)$ is the fraction of the $B$-circle covered by the overlap. Equivalently, zoom in so the $B$-circle becomes the whole picture: the overlap now occupies area $P(A\cap B)/P(B)$.` },
      { kind: 'math', latex: String.raw`$P(A\mid B)=\frac{\text{area of overlap}}{\text{area of }B}=\frac{P(A\cap B)}{P(B)},\qquad P(B)>0$`, display: true, caption: 'Conditioning as zooming into B.' },
      { kind: 'callout', tone: 'visual', title: 'Nested special case', text: String.raw`If $B\subseteq A$ then $A\cap B=B$ and $P(A\mid B)=1$: once we know $B$, the larger event $A$ is certain. If $A\cap B=\varnothing$ then $P(A\mid B)=0$.` },
      { kind: 'sim', sim: 'bayes-updater', caption: String.raw`Use the Bayes updater to vary a prior and likelihood and watch the posterior mass redistribute.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`For $A,B\in\mathcal{F}$ with $P(B)>0$, define $P(A\mid B)=P(A\cap B)/P(B)$. If $P(B)=0$, the ratio is undefined and conditioning requires the more advanced theory of regular conditional distributions. Two events are **independent** exactly when $P(A\cap B)=P(A)P(B)$, equivalently $P(A\mid B)=P(A)$ when $P(B)>0$.` },
      { kind: 'math', latex: String.raw`$P(A\cap B)=P(A\mid B)\,P(B)=P(B\mid A)\,P(A)$`, display: true, caption: 'The product rule (multiplication rule).' },
      { kind: 'table', headers: ['Concept', 'Formula', 'When valid'], rows: [
        [String.raw`Conditional probability`, String.raw`$P(A\mid B)=P(A\cap B)/P(B)$`, String.raw`$P(B)>0$`],
        [String.raw`Product rule`, String.raw`$P(A\cap B)=P(A\mid B)P(B)$`, String.raw`$P(B)>0$`],
        [String.raw`Chain rule`, String.raw`$P(A_1\cap\cdots\cap A_n)=\prod_k P(A_k\mid A_1\cap\cdots\cap A_{k-1})$`, String.raw`All conditioning events have positive probability`],
        [String.raw`Law of total probability`, String.raw`$P(A)=\sum_i P(A\mid B_i)P(B_i)$`, String.raw`$\{B_i\}$ partitions $\Omega$, $P(B_i)>0$`],
        [String.raw`Independence`, String.raw`$P(A\cap B)=P(A)P(B)$`, String.raw`No positivity needed`]
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`We show that $P(\cdot\mid B)$ is a probability measure, then derive the total probability formula by partitioning $A$.` },
      { kind: 'steps', title: 'Conditional probability is a probability measure', items: [
        { title: 'Nonnegativity and normalization', text: String.raw`Since $P(A\cap B)\ge0$ and $P(B)>0$, we get $P(A\mid B)\ge0$; taking $A=\Omega$ gives $P(\Omega\mid B)=P(B)/P(B)=1$.`, math: String.raw`$0\le P(A\mid B)\le 1$` },
        { title: 'Countable additivity', text: String.raw`For disjoint $A_1,A_2,\dots$, the sets $A_n\cap B$ are disjoint and their union is $\left(\biguplus_n A_n\right)\cap B$. Divide the axiom (A3) equality by $P(B)$.`, math: String.raw`$P\Bigl(\biguplus_n A_n\,\Big|\,B\Bigr)=\frac{\sum_n P(A_n\cap B)}{P(B)}=\sum_n P(A_n\mid B).$` },
        { title: 'Partition $A$ by the $B_i$', text: String.raw`Let $B_1,\dots,B_m$ be disjoint with $\bigcup_i B_i=\Omega$. Then $A=\biguplus_i (A\cap B_i)$, so finite additivity applies.`, math: String.raw`$P(A)=\sum_i P(A\cap B_i)=\sum_i P(A\mid B_i)P(B_i).$` },
        { title: 'Chain rule by iteration', text: String.raw`Apply the product rule repeatedly to $A_1\cap A_2\cap\cdots\cap A_n$; for $n=3$ we get $P(A_1\cap A_2\cap A_3)=P(A_1)P(A_2\mid A_1)P(A_3\mid A_1\cap A_2)$.`, math: String.raw`$P\Bigl(\bigcap_{k=1}^n A_k\Bigr)=\prod_{k=1}^n P\Bigl(A_k\,\Big|\,\bigcap_{j<k}A_j\Bigr).$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — two dice.** Roll two fair dice; let $A=\{\text{sum}=8\}$ and $B=\{\text{first die}\ge5\}$. There are $36$ equally likely outcomes. $B$ contains $2\cdot6=12$ outcomes, and $A\cap B=\{(5,3),(6,2)\}$ has $2$. Hence $P(A\mid B)=2/12=1/6\approx0.1667.$ By contrast $P(A)=5/36\approx0.1389$, so knowing $B$ increases the chance.` },
      { kind: 'paragraph', text: String.raw`**Example 2 — card suit.** Draw one card from a standard 52-card deck. Let $K=\{\text{king}\}$, $H=\{\text{heart}\}$. $P(K\mid H)=1/13$ (one king among 13 hearts), while $P(H\mid K)=1/4$ (one heart among 4 kings). Both equal $P(K\cap H)/P(\cdot)$ with $P(K\cap H)=1/52$: indeed $(1/52)/(1/4)=1/13$ and $(1/52)/(1/13)=1/4$. These are different because the denominators differ.` },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Law of total probability.** If $B_1,\dots,B_m\in\mathcal{F}$ are pairwise disjoint, $\bigcup_i B_i=\Omega$, and $P(B_i)>0$ for all $i$, then for every $A\in\mathcal{F}$, $P(A)=\sum_{i=1}^m P(A\mid B_i)P(B_i)$. The proof is the partition identity above. **Bayes' theorem** follows immediately by replacing $P(A\cap B_i)$ with $P(B_i\mid A)P(A)$.` },
      { kind: 'math', latex: String.raw`$P(B_i\mid A)=\frac{P(A\mid B_i)P(B_i)}{\sum_j P(A\mid B_j)P(B_j)}$`, display: true, caption: 'Bayes as total probability plus the product rule.' },
      { kind: 'callout', tone: 'history', title: 'Conditioning before Kolmogorov', text: String.raw`Seventeenth- and eighteenth-century probabilists reasoned about conditional bets and "probability of causes" long before a formal definition existed. The ratio definition $P(A\mid B)=P(A\cap B)/P(B)$ is the natural one once probability is a normalized measure.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We enumerate the two-dice sample space exactly and compare with a Monte Carlo estimate, then check the total-probability identity over the partition by first-die value.` },
      { kind: 'code', language: 'python', code: String.raw`import numpy as np
from fractions import Fraction
outcomes = [(a, b) for a in range(1, 7) for b in range(1, 7)]
A = [o for o in outcomes if sum(o) == 8]
B = [o for o in outcomes if o[0] >= 5]
AB = [o for o in A if o in B]
print('exact P(A|B) =', Fraction(len(AB), len(B)))

rng = np.random.default_rng(1)
rolls = rng.integers(1, 7, size=(500_000, 2))
mask_b = rolls[:, 0] >= 5
mask_a = rolls.sum(axis=1) == 8
print('MC P(A|B) =', (mask_a & mask_b).sum() / mask_b.sum())

# total probability over first-die partition
print('sum_i P(A|first=i)P(first=i) =',
      sum(len([o for o in A if o[0] == i]) / 6 for i in range(1, 7)))`, caption: 'Exact, simulated, and partition-based computations agree.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Medical diagnosis:** $P(\text{disease}\mid\text{positive test})$ is the quantity patients actually care about, and it depends on prevalence via total probability.`,
        String.raw`**Spam filtering:** naive Bayes classifies messages using $P(\text{spam}\mid\text{words})\propto P(\text{words}\mid\text{spam})P(\text{spam})$.`,
        String.raw`**Finance:** conditional probabilities of default given a credit-rating downgrade drive risk models.`,
        String.raw`**Quality control:** $P(\text{defect}\mid\text{machine }j)$ identifies which production line needs maintenance.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Conditioning pitfalls', text: String.raw`Never condition on an event of probability zero using the ratio formula. Never assume $P(A\mid B)=P(B\mid A)$ — with a rare disease and a good test these differ by orders of magnitude. Finally, $P(A\mid B)>P(A)$ does **not** imply causation; it is a statement about information, not mechanism.` },
      { kind: 'list', items: [
        String.raw`The denominator is $P(B)$, not $P(A)$ — check which event is "known".`,
        String.raw`In the total probability formula the partition must cover $\Omega$ and its parts must be disjoint.`,
        String.raw`Independence and mutual exclusivity are different: disjoint positive-probability events are never independent.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Show that $P(A\mid B)+P(A^c\mid B)=1$ using the axioms.`,
        String.raw`If $P(A\mid B)=P(A)$, does it follow that $P(B\mid A)=P(B)$? Prove or find a counterexample.`,
        String.raw`What goes wrong if $P(B)=0$? Can you make sense of conditioning on a continuous observation such as $X=0.3$?`,
        String.raw`Explain why conditioning on $B$ is a legitimate new probability space.`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`P. Billingsley, *Probability and Measure*, Section 4 — conditional probability and independence.`,
        String.raw`E. T. Jaynes, *Probability Theory: The Logic of Science* — conditioning as logical inference.`,
        String.raw`D. Williams, *Probability with Martingales*, Chapter 3 — a concise axiomatic treatment.`
      ] }
    ]
  },
  {
    id: 'bayes-theorem',
    title: "Bayes' Theorem",
    branchId: 'probability-theory',
    level: 'Undergraduate 2',
    summary: String.raw`Bayes' theorem reverses conditional probabilities: it converts the likelihood of evidence under a hypothesis into the probability of the hypothesis given the evidence. Together with the law of total probability it gives a principled updating rule and explains why base rates dominate diagnostic conclusions.`,
    prerequisites: ['conditional-probability', 'probability-axioms'],
    tags: ['posterior', 'prior', 'likelihood', 'base-rate'],
    status: 'Complete',
    simulationIds: ['bayes-updater'],
    derivationIds: ['p3-der-bayes'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`Experiments usually tell us $P(\text{data}\mid\text{hypothesis})$ — how surprising the data would be if a hypothesis were true. We want $P(\text{hypothesis}\mid\text{data})$ — how plausible the hypothesis is after seeing the data. Bayes' theorem is the exact algebraic bridge between these two directions.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`Start with a prior belief, weight each hypothesis by how well it predicts the observed evidence, then renormalize. Hypotheses that predicted the data well gain share; those that predicted it poorly lose share. The renormalization is the law of total probability, which computes the overall probability of the evidence.` },
      { kind: 'callout', tone: 'intuition', title: 'Odds form', text: String.raw`Posterior odds = likelihood ratio $\times$ prior odds. This multiplicative form makes the role of evidence transparent: a trustworthy test multiplies the odds by a fixed factor, regardless of the starting prior.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`Imagine a population split into diseased and healthy bars. A test filters each bar: it keeps most of the sick and a fraction of the healthy. The posterior is the proportion of the *kept* group that came from the sick bar. Even a filter that keeps $99\%$ of the sick can be swamped if the healthy bar is 99 times larger.` },
      { kind: 'math', latex: String.raw`\underbrace{\frac{P(H\mid E)}{P(H^c\mid E)}}_{\text{posterior odds}}=\underbrace{\frac{P(E\mid H)}{P(E\mid H^c)}}_{\text{likelihood ratio}}\cdot\underbrace{\frac{P(H)}{P(H^c)}}_{\text{prior odds}}`, display: true, caption: 'Bayes in odds form; valid when all displayed probabilities are defined.' },
      { kind: 'callout', tone: 'visual', title: 'Natural frequencies', text: String.raw`Out of 10,000 people with 1% prevalence and a test with 99% sensitivity / 95% specificity: 100 are sick, 99 test positive; 9,900 are healthy, 495 test positive falsely. Of 594 positives only 99 are sick — about $1/6$.` },
      { kind: 'sim', sim: 'bayes-updater', caption: String.raw`Vary prevalence, sensitivity and specificity to see how the posterior moves.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`Let $H_1,\dots,H_m$ be a partition of $\Omega$ with $P(H_i)>0$ (hypotheses), and let $E\in\mathcal{F}$ with $P(E)>0$ (evidence). Then Bayes' theorem states: for each $i$,` },
      { kind: 'math', latex: String.raw`$P(H_i\mid E)=\frac{P(E\mid H_i)P(H_i)}{\displaystyle\sum_{j=1}^m P(E\mid H_j)P(H_j)}=\frac{P(E\mid H_i)P(H_i)}{P(E)}.$`, display: true },
      { kind: 'list', items: [
        String.raw`$P(H_i)$: **prior** probability of hypothesis $i$.`,
        String.raw`$P(E\mid H_i)$: **likelihood** — probability of the observed evidence under $H_i$ (not a probability over $i$).`,
        String.raw`$P(E)$: **evidence** or marginal likelihood, computed by total probability; it is the normalizing constant.`,
        String.raw`$P(H_i\mid E)$: **posterior** probability after observing $E$.`
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`Bayes' theorem is not a new axiom: it is the product rule combined with total probability.` },
      { kind: 'steps', title: 'Deriving the posterior', items: [
        { title: 'Write the product rule twice', text: String.raw`From the definition of conditional probability, applied in both orders:`, math: String.raw`$P(H_i\cap E)=P(E\mid H_i)P(H_i)=P(H_i\mid E)P(E).$` },
        { title: 'Solve for the desired conditional', text: String.raw`Divide by $P(E)>0$:`, math: String.raw`$P(H_i\mid E)=\frac{P(E\mid H_i)P(H_i)}{P(E)}.$` },
        { title: 'Expand the denominator', text: String.raw`Because the $H_j$ partition $\Omega$, the sets $E\cap H_j$ partition $E$. Finite additivity gives:`, math: String.raw`$P(E)=\sum_{j=1}^m P(E\cap H_j)=\sum_{j=1}^m P(E\mid H_j)P(H_j).$` },
        { title: 'Combine', text: String.raw`Substitute the expanded denominator to obtain the compact formula; note the normalization $\sum_i P(H_i\mid E)=1$ is automatic.`, math: String.raw`$P(H_i\mid E)=\frac{P(E\mid H_i)P(H_i)}{\sum_j P(E\mid H_j)P(H_j)}.$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — medical testing.** A disease has prevalence $P(D)=0.01$; a test has sensitivity $P(+\mid D)=0.99$ and specificity $P(-\mid D^c)=0.95$, so $P(+\mid D^c)=0.05$. Then $P(+)=0.99(0.01)+0.05(0.99)=0.0099+0.0495=0.0594$, and` },
      { kind: 'math', latex: String.raw`$P(D\mid +)=\frac{0.99\cdot0.01}{0.0594}=\frac{0.0099}{0.0594}=\frac{1}{6}\approx0.1667.$`, display: true, caption: 'Only about one in six positives is a true case.' },
      { kind: 'paragraph', text: String.raw`Odds check: prior odds $=0.01/0.99=1/99$, likelihood ratio $=0.99/0.05=19.8$, posterior odds $=19.8/99=0.2=1/5$, giving probability $1/(1+5)=1/6$. **Example 2 — two independent positives.** Reapplying with posterior $1/6$ as the new prior and assuming conditional independence of the two tests, posterior odds $=19.8^2/99\approx3.96$, so $P(D\mid ++)\approx0.798.$` },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Sequential updating.** If $E_1,E_2$ are conditionally independent given $H_i$ (i.e. $P(E_1\cap E_2\mid H_i)=P(E_1\mid H_i)P(E_2\mid H_i)$), then posterior after both equals the posterior obtained by updating on $E_1$ and then on $E_2$. Proof: substitute the factorization into Bayes and cancel the intermediate evidence terms. **Conjugacy** is the special case where prior and posterior belong to the same parametric family (e.g. Beta–Binomial).` },
      { kind: 'callout', tone: 'warning', title: 'Likelihood is not a probability over hypotheses', text: String.raw`$P(E\mid H_i)$ is indexed by $i$ but its values need not sum to $1$; the sum over $i$ of $P(E\mid H_i)$ is generally not $P(E)$. Only after multiplying by priors and normalizing do we get a probability distribution over hypotheses.` },
      { kind: 'callout', tone: 'history', title: 'A posthumous paper', text: String.raw`Thomas Bayes' essay "An Introduction to the Theory of Probability" was presented to the Royal Society in 1763, two years after his death. Pierre-Simon Laplace independently developed and greatly generalised the method in the 1770s–1810s.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We compute the posterior for the diagnostic example directly and via repeated odds multiplication, confirming they agree, then explore how the posterior changes with prevalence.` },
      { kind: 'code', language: 'python', code: String.raw`from fractions import Fraction
prev, sens, spec = Fraction(1,100), Fraction(99,100), Fraction(95,100)
fp = 1 - spec
p_pos = sens*prev + fp*(1-prev)
post = sens*prev / p_pos
print('P(+) =', float(p_pos), ' P(D|+) =', float(post), post)

# odds form
prior_odds = prev/(1-prev)
lr = sens/fp
post_odds = lr*prior_odds
print('posterior odds =', post_odds, ' => prob =', float(post_odds/(1+post_odds)))

# two independent positives
post2_odds = lr**2 * prior_odds
print('P(D|++) =', float(post2_odds/(1+post2_odds)))`, caption: 'Exact rational arithmetic reproduces the hand calculation.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Clinical medicine:** interpreting screening programmes and explaining false positives to patients.`,
        String.raw`**Machine learning:** naive Bayes classifiers, Bayesian networks and probabilistic graphical models.`,
        String.raw`**Forensics:** likelihood ratios for DNA evidence; the prosecutor's fallacy is a base-rate error.`,
        String.raw`**A/B testing:** converting a p-value-like likelihood into a posterior probability that variant B is better.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'The base-rate fallacy', text: String.raw`Ignoring $P(H)$ and using only the likelihood is the most common error: with 1% prevalence, a 99%-sensitive test yields a positive-predictive value near 17%, not 99%. Always include the denominator $P(E)=\sum_j P(E\mid H_j)P(H_j)$.` },
      { kind: 'list', items: [
        String.raw`Do not apply Bayes with a "prior" of $1/2$ merely out of ignorance without stating that choice explicitly.`,
        String.raw`Conditional independence of tests given disease does not imply unconditional independence.`,
        String.raw`If $P(E)=0$ the formula is undefined; continuous evidence requires densities and limiting arguments.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Derive the odds form of Bayes from the probability form.`,
        String.raw`Show that two independent positives need not give posterior $1$ — what would make it approach $1$?`,
        String.raw`Why can a highly accurate test still have a low positive predictive value?`,
        String.raw`If a hypothesis has prior probability exactly $0$, can evidence ever revive it? Relate this to Cromwell's rule.`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`T. Bayes, "An Introduction to the Theory of Probability", *Philosophical Transactions* (1763).`,
        String.raw`E. T. Jaynes, *Probability Theory: The Logic of Science*, Chapters 4–5.`,
        String.raw`A. Gelman et al., *Bayesian Data Analysis*, Chapter 1 — modern practice and prior choice.`
      ] }
    ]
  },
  {
    id: 'random-variables',
    title: 'Random Variables',
    branchId: 'probability-theory',
    level: 'Undergraduate 2',
    summary: String.raw`A random variable is a measurable function from the sample space to a state space, and its distribution is the pushforward measure. This viewpoint separates randomness (the measure $P$) from value (the function $X$), and makes the cumulative distribution function the universal description of a real-valued random variable.`,
    prerequisites: ['probability-axioms', 'functions-discrete'],
    tags: ['measurability', 'distribution', 'cdf', 'pushforward'],
    status: 'Complete',
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`Outcomes in an experiment are often not numbers we care about directly: a coin sequence gives a number of heads, a patient gives a blood pressure, a network gives a number of failed links. We need a rigorous way to attach numerical values to outcomes and to speak of the distribution of those values without referring back to the underlying experiment each time.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`A random variable is a *function*, not a variable and not random. Its input is an outcome $\omega$; its output $X(\omega)$ is a number. Randomness enters because $\omega$ is drawn according to $P$. Once the function is fixed, the function itself is deterministic — only the argument is uncertain.` },
      { kind: 'callout', tone: 'intuition', title: 'Pushforward', text: String.raw`The distribution of $X$ is the measure that assigns to each set $B$ the mass of all outcomes mapped into $B$: $\mu_X(B)=P(X^{-1}(B))$. It is called the pushforward $P\circ X^{-1}$. Two different random variables on different spaces can have the same distribution.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`Draw the sample space $\Omega$ on the left as a cloud of outcomes, and $\mathbb{R}$ on the right as a number line. Arrows from outcomes to numbers carry mass with them. The CDF $F_X(x)$ counts all mass that landed to the left of $x$: it starts at $0$, increases in jumps (discrete), continuously (continuous), or both (mixed), and ends at $1$.` },
      { kind: 'math', latex: String.raw`\Omega \xrightarrow{\;X\;} \mathbb{R},\qquad \omega\longmapsto X(\omega),\qquad \mu_X(B)=P\bigl(\{\omega: X(\omega)\in B\}\bigr)`, display: true, caption: 'A random variable transports mass from outcomes to values.' },
      { kind: 'callout', tone: 'visual', title: 'CDF shape', text: String.raw`A jump of size $p$ at $x_0$ in the CDF means $P(X=x_0)=p$. A strictly increasing continuous CDF corresponds to a continuous distribution; flat stretches mean the variable never takes values in that interval.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`Given a probability space $(\Omega,\mathcal{F},P)$ and a measurable space $(E,\mathcal{E})$ — typically $E=\mathbb{R}$ with the Borel sigma-algebra $\mathcal{B}(\mathbb{R})$ — a **random variable** is a map $X:\Omega\to E$ with $X^{-1}(B)\in\mathcal{F}$ for every $B\in\mathcal{E}$. For real-valued $X$, the **cumulative distribution function (CDF)** is $F_X(x)=P(X\le x)=P(X^{-1}((-\infty,x]))$.` },
      { kind: 'math', latex: String.raw`$F_X(x)=P(X\le x),\qquad \mu_X((a,b])=F_X(b)-F_X(a),\qquad \lim_{x\to-\infty}F_X(x)=0,\quad \lim_{x\to+\infty}F_X(x)=1.$`, display: true },
      { kind: 'table', headers: ['Type', 'Description', 'Example', 'CDF feature'], rows: [
        [String.raw`Discrete`, String.raw`Values in a finite or countable set`, String.raw`Binomial, Poisson`, String.raw`Step function with jumps summing to 1`],
        [String.raw`Continuous`, String.raw`Has a density $f$ with $F(x)=\int_{-\infty}^x f$`, String.raw`Normal, Exponential`, String.raw`Continuous, absolutely continuous`],
        [String.raw`Mixed`, String.raw`Both atoms and a density`, String.raw`Waiting time with a point mass at 0`, String.raw`Jumps plus continuous growth`],
        [String.raw`Singular`, String.raw`Continuous but not absolutely continuous`, String.raw`Cantor distribution`, String.raw`Continuous, derivative zero a.e.`]
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`We derive the defining properties of a CDF from the axioms, using continuity of probability.` },
      { kind: 'steps', title: 'Why every CDF has these four properties', items: [
        { title: 'Monotonicity', text: String.raw`If $x<y$ then $\{X\le x\}\subseteq\{X\le y\}$; monotonicity of $P$ gives $F_X(x)\le F_X(y)$.`, math: String.raw`$x<y\Rightarrow F_X(x)\le F_X(y).$` },
        { title: 'Right-continuity', text: String.raw`Let $x_n\downarrow x$. Then $\{X\le x_n\}\downarrow\{X\le x\}$, and continuity from above (valid since $P\le1$) gives $F_X(x_n)\to F_X(x)$.`, math: String.raw`$\lim_{y\downarrow x}F_X(y)=F_X(x).$` },
        { title: 'Limit at $-\infty$', text: String.raw`$\{X\le -n\}\downarrow\varnothing$, so $F_X(-n)\to P(\varnothing)=0$.`, math: String.raw`$\lim_{x\to-\infty}F_X(x)=0.$` },
        { title: 'Limit at $+\infty$', text: String.raw`$\{X\le n\}\uparrow\Omega$, so $F_X(n)\to P(\Omega)=1$.`, math: String.raw`$\lim_{x\to+\infty}F_X(x)=1.$` },
        { title: 'Jump size equals point mass', text: String.raw`$\{X\le x\}=\{X<x\}\uplus\{X=x\}$; taking left limits gives $F_X(x)-F_X(x^-)=P(X=x)$.`, math: String.raw`$P(X=x)=F_X(x)-\lim_{y\uparrow x}F_X(y).$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — sum of two dice.** $\Omega=\{(a,b):1\le a,b\le6\}$ uniform, $X(a,b)=a+b$. Counting pairs gives the distribution: $P(X=2)=1/36$, $P(X=7)=6/36=1/6$, $P(X=12)=1/36$. The CDF at $x=7$ is $F_X(7)=(1+2+3+4+5+6)/36=21/36=7/12\approx0.5833.$` },
      { kind: 'paragraph', text: String.raw`**Example 2 — indicator function.** For $A\in\mathcal{F}$, $X=\mathbf{1}_A$ takes values $0,1$ with $P(X=1)=P(A)$ and $P(X=0)=1-P(A)$; its CDF is $0$ for $x<0$, $1-P(A)$ for $0\le x<1$, and $1$ for $x\ge1$. This Bernoulli variable is the building block of all discrete distributions.` },
      { kind: 'math', latex: String.raw`$F_{\mathbf{1}_A}(x)=\begin{cases}0,&x<0,\\ 1-P(A),&0\le x<1,\\ 1,&x\ge 1.\end{cases}$`, display: true, caption: 'The CDF of a Bernoulli variable.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Characterisation theorem.** A function $F:\mathbb{R}\to[0,1]$ is the CDF of some random variable if and only if it is nondecreasing, right-continuous, $\lim_{x\to-\infty}F=0$ and $\lim_{x\to+\infty}F=1$. The necessity was proved above. Sufficiency: define a measure on half-open intervals by $\mu((a,b])=F(b)-F(a)$ and extend it via Carathéodory's extension theorem; then $X(\omega)=\omega$ on $(\mathbb{R},\mathcal{B}(\mathbb{R}),\mu)$ has CDF $F$.` },
      { kind: 'callout', tone: 'history', title: 'From "variable" to measurable function', text: String.raw`Early probability texts treated random variables informally as quantities that "take values by chance". The measure-theoretic definition — a measurable map — was consolidated in the 1920s and 1930s by Kolmogorov, Fréchet and others, and is what makes limit theorems precise.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We build the exact distribution of the two-dice sum with NumPy and compare the empirical CDF from a large simulation with the exact CDF.` },
      { kind: 'code', language: 'python', code: String.raw`import numpy as np
vals, counts = np.unique(np.add.outer(np.arange(1,7), np.arange(1,7)), return_counts=True)
pmf = counts/36
cdf = np.cumsum(pmf)
print(list(zip(vals, counts, np.round(pmf,4))))
print('F(7) exact =', cdf[vals==7][0], '= 7/12 =', 7/12)

rng = np.random.default_rng(2)
x = rng.integers(1,7,size=(1_000_000,2)).sum(axis=1)
emp = np.array([(x<=t).mean() for t in vals])
print('max |empirical - exact CDF| =', np.abs(emp-cdf).max())`, caption: 'Exact and simulated CDFs agree to Monte Carlo error.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Actuarial science:** claim size $X$ is a random variable; its CDF determines premiums and reserves.`,
        String.raw`**Signal processing:** noise is modelled as a random voltage at each time index — a stochastic process of random variables.`,
        String.raw`**Epidemiology:** the random incubation period has a CDF used to forecast case counts.`,
        String.raw`**Machine learning:** a feature vector is a random element of $\mathbb{R}^d$ with a joint distribution.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Measurability matters', text: String.raw`A function $X:\Omega\to\mathbb{R}$ need not be a random variable if $X^{-1}(B)\notin\mathcal{F}$ for some Borel $B$; then $P(X\in B)$ is undefined. This pathology cannot arise for countable $\Omega$ with $\mathcal{F}=2^\Omega$, which is why beginners rarely meet it.` },
      { kind: 'list', items: [
        String.raw`"Random" describes the outcome, not the function; $X$ is deterministic.`,
        String.raw`Two variables with the same distribution need not be equal: on one coin flip, $X=\mathbf{1}_H$ and $Y=\mathbf{1}_T$ both are Bernoulli($1/2$) but $X\ne Y$.`,
        String.raw`For continuous $X$, $P(X=x)=0$ for every $x$ — this does not make $X$ impossible.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Construct two random variables with the same distribution but different underlying sample spaces.`,
        String.raw`Prove that $F_X$ is right-continuous but need not be left-continuous.`,
        String.raw`If $F(x)=0$ for $x<0$ and $F(x)=1-e^{-x}$ for $x\ge0$, identify the distribution and compute $P(1<X\le2)$.`,
        String.raw`Why is the Borel sigma-algebra used for $\mathbb{R}$ rather than the full power set?`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`P. Billingsley, *Probability and Measure*, Chapter 2 — random variables and distributions.`,
        String.raw`D. Williams, *Probability with Martingales*, Chapter 1 — concise measure-theoretic definitions.`,
        String.raw`S. Ross, *A First Course in Probability*, Chapters 2–3 — elementary CDF examples.`
      ] }
    ]
  },
  {
    id: 'probability-distributions',
    title: 'Probability Distributions',
    branchId: 'probability-theory',
    level: 'Undergraduate 2',
    summary: String.raw`A probability distribution is the pushforward measure of a random variable, described by a CDF, a probability mass function, a density, or a mixture of these. Binomial, normal, exponential and Poisson families provide reusable models whose parameters encode the mechanism that generated the data.`,
    prerequisites: ['random-variables', 'probability-axioms'],
    tags: ['pmf', 'density', 'cdf', 'parametric-families'],
    status: 'Complete',
    simulationIds: ['distribution-lab'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`Every real-valued random variable induces a measure $\mu_X$ on $\mathbb{R}$, but listing $P(X\in B)$ for all Borel sets $B$ is impossible. We need compact descriptions — mass functions for discrete variables, densities for continuous ones — and a catalogue of families that recur across science.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`A discrete distribution puts little lumps of mass at specific values; a continuous one spreads mass smoothly so that single points carry zero mass. The CDF unifies both: it is the cumulative amount of mass to the left of $x$, whether that mass arrives in jumps or by smooth growth.` },
      { kind: 'callout', tone: 'intuition', title: 'Density is not probability', text: String.raw`For a continuous variable, $f(x)$ can exceed $1$; only areas $\int_a^b f$ are probabilities. A density is mass per unit length — a derivative of the CDF, not a probability itself.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`Plot the PMF as vertical spikes summing to $1$, the density as a curve of total area $1$, and the CDF as an S-shaped curve from $0$ to $1$. Changing a parameter changes the shape: increasing the normal variance flattens and widens the bell; increasing the exponential rate pushes mass toward zero.` },
      { kind: 'math', latex: String.raw`$f(x)=\frac{d}{dx}F(x)\ \text{(a.e.)},\qquad F(b)-F(a)=\int_a^b f(x)\,dx,\qquad \sum_k p(x_k)=1\ \text{or}\ \int_{\mathbb{R}} f=1$`, display: true, caption: 'Density as derivative of the CDF; normalization in both cases.' },
      { kind: 'callout', tone: 'visual', title: 'Mixed distributions', text: String.raw`A waiting time that is $0$ with probability $p$ and exponential otherwise has a CDF with a jump at $0$ followed by smooth growth. Neither a pure PMF nor a pure PDF describes it alone.` },
      { kind: 'sim', sim: 'distribution-lab', caption: String.raw`Explore how parameters reshape PMFs, PDFs and CDFs in the distribution lab.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`A distribution is **discrete** if there is a countable set $S$ with $P(X\in S)=1$; its PMF is $p(x)=P(X=x)$ and $F(x)=\sum_{x_k\le x}p(x_k)$. It is **absolutely continuous** if $F(x)=\int_{-\infty}^x f(t)\,dt$ for a nonnegative integrable $f$ (the density). We write $X\sim\mathrm{Bin}(n,p)$, $X\sim\mathcal{N}(\mu,\sigma^2)$, $X\sim\mathrm{Exp}(\lambda)$ for standard families.` },
      { kind: 'math', latex: String.raw`$\mathrm{Bin}(n,p):\ p(k)=\binom{n}{k}p^k(1-p)^{n-k};\qquad \mathcal{N}(\mu,\sigma^2):\ f(x)=\frac{1}{\sigma\sqrt{2\pi}}e^{-\frac{(x-\mu)^2}{2\sigma^2}};\qquad \mathrm{Exp}(\lambda):\ f(x)=\lambda e^{-\lambda x}\mathbf{1}_{x\ge0}.$`, display: true },
      { kind: 'table', headers: ['Family', 'Parameters', 'Mean', 'Variance', 'Typical use'], rows: [
        [String.raw`Bernoulli`, String.raw`$p$`, String.raw`$p$`, String.raw`$p(1-p)$`, String.raw`Single yes/no trial`],
        [String.raw`Binomial`, String.raw`$n,p$`, String.raw`$np$`, String.raw`$np(1-p)$`, String.raw`$n$ independent trials`],
        [String.raw`Poisson`, String.raw`$\lambda$`, String.raw`$\lambda$`, String.raw`$\lambda$`, String.raw`Rare event counts`],
        [String.raw`Normal`, String.raw`$\mu,\sigma^2$`, String.raw`$\mu$`, String.raw`$\sigma^2$`, String.raw`Measurement noise`],
        [String.raw`Exponential`, String.raw`$\lambda$`, String.raw`$1/\lambda$`, String.raw`$1/\lambda^2$`, String.raw`Waiting times (memoryless)`],
        [String.raw`Uniform`, String.raw`$a,b$`, String.raw`$(a+b)/2$`, String.raw`$(b-a)^2/12$`, String.raw`No preferred location`]
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`We derive the binomial PMF from the Bernoulli experiment and verify normalization with the binomial theorem.` },
      { kind: 'steps', title: 'Where the binomial PMF comes from', items: [
        { title: 'Model $n$ independent trials', text: String.raw`Let each trial succeed with probability $p$; let $X$ count successes. A particular sequence with $k$ successes and $n-k$ failures has probability $p^k(1-p)^{n-k}$ by independence.`, math: String.raw`$P(\text{given sequence})=p^k(1-p)^{n-k}.$` },
        { title: 'Count sequences', text: String.raw`The number of sequences with exactly $k$ successes is the binomial coefficient $\binom{n}{k}=\frac{n!}{k!(n-k)!}$.`, math: String.raw`$\binom{n}{k}=\frac{n!}{k!(n-k)!}.$` },
        { title: 'Add disjoint sequences', text: String.raw`The different sequences are disjoint events, so finite additivity gives the PMF.`, math: String.raw`$P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}.$` },
        { title: 'Verify normalization', text: String.raw`Apply the binomial theorem with $q=1-p$:`, math: String.raw`$\sum_{k=0}^n\binom{n}{k}p^k q^{n-k}=(p+q)^n=1^n=1.$` },
        { title: 'Continuous analogue', text: String.raw`For a density, normalization is $\int f=1$; e.g. $\int_0^\infty\lambda e^{-\lambda x}dx=\lambda\cdot(1/\lambda)=1$.`, math: String.raw`$\int_{-\infty}^{\infty}f(x)\,dx=1.$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — binomial probability.** $X\sim\mathrm{Bin}(10,0.3)$. Then $E[X]=3$ and $\mathrm{Var}(X)=10(0.3)(0.7)=2.1$. The probability of exactly three successes is` },
      { kind: 'math', latex: String.raw`$P(X=3)=\binom{10}{3}(0.3)^3(0.7)^7=120\cdot0.027\cdot0.0823543\approx0.2668.$`, display: true, caption: 'Exact binomial mass at k = 3.' },
      { kind: 'paragraph', text: String.raw`**Example 2 — exponential CDF.** If $X\sim\mathrm{Exp}(2)$, then $F(x)=1-e^{-2x}$ for $x\ge0$. Thus $P(1<X\le2)=F(2)-F(1)=(1-e^{-4})-(1-e^{-2})=e^{-2}-e^{-4}\approx0.1353-0.0183=0.1170.$ The memoryless property gives the same result as $P(X>1)\cdot P(X\le1)=e^{-2}(1-e^{-2})\approx0.1170.$` },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Existence.** If $F$ satisfies the four CDF properties, Carathéodory's extension theorem produces a measure with that CDF on $(\mathbb{R},\mathcal{B}(\mathbb{R}))$. **Radon–Nikodym.** If a distribution $\mu$ is absolutely continuous with respect to Lebesgue measure $\lambda$ (i.e. $\lambda(A)=0\Rightarrow\mu(A)=0$), there exists a measurable $f\ge0$ with $\mu(A)=\int_A f\,d\lambda$; this $f$ is the density, unique up to a Lebesgue-null set. Discrete distributions are singular with respect to Lebesgue measure and therefore have no density.` },
      { kind: 'callout', tone: 'history', title: 'The normal curve', text: String.raw`Abraham de Moivre derived the normal approximation to the binomial in 1733; Carl Friedrich Gauss used the normal law in 1809 for astronomical errors, and Pierre-Simon Laplace proved the first central limit theorem in 1810. Its ubiquitous $\sigma\sqrt{2\pi}$ normalization became the standard bell curve.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We evaluate the binomial mass and the exponential interval probability numerically, and compare an empirical histogram to the fitted density.` },
      { kind: 'code', language: 'python', code: String.raw`import numpy as np
from math import comb, exp
k, n, p = 3, 10, 0.3
pmf = comb(n,k)*p**k*(1-p)**(n-k)
print('Bin(10,0.3) P(X=3) =', pmf)
print('mean/var =', n*p, n*p*(1-p))

lam = 2.0
print('Exp(2) P(1<X<=2) =', exp(-lam*1)-exp(-lam*2))

rng = np.random.default_rng(3)
x = rng.exponential(1/lam, size=200_000)
print('MC estimate =', ((x>1)&(x<=2)).mean())`, caption: 'Closed-form probabilities versus Monte Carlo estimates.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Telecommunications:** Poisson arrivals model call centres and network packets.`,
        String.raw`**Manufacturing:** binomial models the number of defective items in a batch.`,
        String.raw`**Finance:** log-normal and normal-inverse-Gaussian distributions model asset returns.`,
        String.raw`**Reliability:** exponential and Weibull distributions model time to failure.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Parameter traps', text: String.raw`The exponential distribution has two common parametrisations: rate $\lambda$ (mean $1/\lambda$) and scale $\theta=1/\lambda$ (mean $\theta$). The normal's second parameter is the **variance** $\sigma^2$, not the standard deviation $\sigma$. Always state which convention you use.` },
      { kind: 'list', items: [
        String.raw`A density may exceed 1; only integrated areas must be at most 1.`,
        String.raw`Continuous variables have $P(X=x)=0$; do not confuse $f(x)=0$ with impossibility.`,
        String.raw`Independence must be assumed to derive the binomial; correlated trials give a different distribution.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Give an example of a distribution that is neither discrete nor absolutely continuous.`,
        String.raw`Show that the exponential density integrates to 1 and compute its CDF.`,
        String.raw`Why does a discrete distribution have no density with respect to Lebesgue measure?`,
        String.raw`If $X\sim\mathrm{Bin}(n,p)$, what is the distribution of $n-X$? Justify.`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`S. Ross, *A First Course in Probability*, Chapters 4–6 — standard families and their properties.`,
        String.raw`W. Feller, *An Introduction to Probability Theory and Its Applications*, Vol. I — classical distribution theory.`,
        String.raw`N. L. Johnson, S. Kotz and A. W. Kemp, *Univariate Discrete Distributions* — reference catalogue.`
      ] }
    ]
  },
  {
    id: 'expectation',
    title: 'Expectation',
    branchId: 'probability-theory',
    level: 'Undergraduate 2',
    summary: String.raw`Expectation is the Lebesgue integral of a random variable against its probability measure: a weighted long-run average. Linearity, monotone convergence and the law of the unconscious statistician make it the central computational tool, while integrability hypotheses keep the algebra honest.`,
    prerequisites: ['random-variables', 'probability-distributions', 'lebesgue-integration'],
    tags: ['integral', 'lotus', 'jensen', 'linearity'],
    status: 'Complete',
    simulationIds: ['distribution-lab'],
    derivationIds: ['p3-der-lotus'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`A distribution contains a lot of information; we often want a single number summarising its centre. Expectation formalises the weighted average of outcomes and, crucially, can be computed either from the underlying space $\Omega$ or from the distribution of $X$ alone.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`If a fair die is rolled many times, the average of the outcomes tends to $3.5$. Expectation is that limiting average — not a value the variable necessarily takes. It is the balance point of the mass distribution, like the centre of mass of a rod with density given by the PMF or PDF.` },
      { kind: 'callout', tone: 'intuition', title: 'Why integrability matters', text: String.raw`For a heavy-tailed variable $E[X]$ may be $+\infty$ or undefined (e.g. the Cauchy distribution). Linearity $E[X+Y]=E[X]+E[Y]$ is only guaranteed when the relevant integrals exist; otherwise one can get $\infty-\infty$.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`Picture the PMF or density as a mass distribution along a beam. Place a fulcrum at $E[X]$; the torque $\int (x-E[X])\,d\mu_X$ balances to zero. For a symmetric density the fulcrum sits at the symmetry point; a long right tail pulls it rightward.` },
      { kind: 'math', latex: String.raw`$E[X]=\int_{\Omega} X\,dP=\int_{\mathbb{R}} x\,\mu_X(dx)=\begin{cases}\sum_k x_k p(x_k),&\text{discrete},\\[2pt]\int_{-\infty}^{\infty} x f(x)\,dx,&\text{density}.\end{cases}$`, display: true, caption: 'The same expectation computed in three ways.' },
      { kind: 'callout', tone: 'visual', title: 'Variance as spread', text: String.raw`$\mathrm{Var}(X)=E[(X-E[X])^2]=E[X^2]-(E[X])^2$ (when $E[X^2]<\infty$) measures the average squared distance from the fulcrum; its square root has the same units as $X$.` },
      { kind: 'sim', sim: 'distribution-lab', caption: String.raw`Change a distribution's parameters and watch its mean and variance update in the lab.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`For a real random variable $X$ on $(\Omega,\mathcal{F},P)$: if $E[X^+]$ and $E[X^-]$ are both finite, $X$ is **integrable** and $E[X]=E[X^+]-E[X^-]\in\mathbb{R}$. If only $E[X^+]$ is finite we set $E[X]=-\infty$, and similarly for $+\infty$; with both infinite the expectation is undefined. The variance requires $E[X^2]<\infty$.` },
      { kind: 'math', latex: String.raw`$E[X]=\int_\Omega X\,dP,\qquad \mathrm{Var}(X)=E\bigl[(X-E[X])^2\bigr],\qquad E[aX+bY]=aE[X]+bE[Y]\ \text{(integrable $X,Y$)}.$`, display: true },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`We derive the law of the unconscious statistician (LOTUS), which lets us compute $E[g(X)]$ from the distribution of $X$ without knowing $\Omega$.` },
      { kind: 'steps', title: 'LOTUS: expectation depends only on the distribution', items: [
        { title: 'Indicator functions', text: String.raw`For $g=\mathbf{1}_B$, $E[g(X)]=P(X\in B)=\int_B d\mu_X$. This is the definition of the pushforward measure.`, math: String.raw`$E[\mathbf{1}_B(X)]=P(X\in B)=\mu_X(B).$` },
        { title: 'Simple functions', text: String.raw`For $g=\sum_i c_i\mathbf{1}_{B_i}$, linearity of the integral (finite sums of integrable functions) gives the formula.`, math: String.raw`$E[g(X)]=\sum_i c_i\mu_X(B_i)=\int g\,d\mu_X.$` },
        { title: 'Nonnegative $g$', text: String.raw`Approximate $g$ from below by simple functions $s_n\uparrow g$; monotone convergence applies on both $(\Omega,P)$ and $(\mathbb{R},\mu_X)$, so limits pass through both integrals.`, math: String.raw`$E[g(X)]=\lim_n E[s_n(X)]=\lim_n\int s_n\,d\mu_X=\int g\,d\mu_X.$` },
        { title: 'General integrable $g$', text: String.raw`Split $g=g^+-g^-$ and subtract; the identity holds whenever $g(X)$ is integrable (or the integral is $+\infty$ or $-\infty$).`, math: String.raw`$E[g(X)]=\int_{\mathbb{R}} g(x)\,\mu_X(dx).$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — die roll.** $\Omega=\{1,\dots,6\}$ uniform: $E[X]=(1+2+3+4+5+6)/6=21/6=3.5$, and $E[X^2]=(1+4+9+16+25+36)/6=91/6\approx15.1667$, so $\mathrm{Var}(X)=91/6-(7/2)^2=91/6-49/4=(182-147)/12=35/12\approx2.9167.$` },
      { kind: 'paragraph', text: String.raw`**Example 2 — exponential variable.** For $X\sim\mathrm{Exp}(\lambda)$ with density $\lambda e^{-\lambda x}$ on $x\ge0$, integration by parts gives $E[X]=1/\lambda$ and $E[X^2]=2/\lambda^2$, hence $\mathrm{Var}(X)=2/\lambda^2-1/\lambda^2=1/\lambda^2.$ For $\lambda=2$: mean $0.5$, variance $0.25$, standard deviation $0.5.$` },
      { kind: 'math', latex: String.raw`$\int_0^\infty x\lambda e^{-\lambda x}dx=\frac{1}{\lambda},\qquad \int_0^\infty x^2\lambda e^{-\lambda x}dx=\frac{2}{\lambda^2}\quad\Longrightarrow\quad \mathrm{Var}(X)=\frac{1}{\lambda^2}.$`, display: true, caption: 'Exponential moments by integration by parts.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Jensen's inequality.** If $\varphi:\mathbb{R}\to\mathbb{R}$ is convex and $X$ is integrable, then $\varphi(E[X])\le E[\varphi(X)]$ (the right side may be $+\infty$). Proof: convexity gives a supporting line at $E[X]$, $\varphi(x)\ge \varphi(E[X])+m(x-E[X])$; take expectations and use $E[X-E[X]]=0$. **Monotone convergence** $X_n\uparrow X$, $X_1$ integrable or $X_n\ge0$ implies $E[X_n]\uparrow E[X]$; **dominated convergence** requires $|X_n|\le Y$ with $E[Y]<\infty$.` },
      { kind: 'callout', tone: 'warning', title: 'Linearity needs integrability', text: String.raw`If $E[X]=+\infty$ and $E[Y]=-\infty$, then $E[X+Y]$ need not be $0$ — it may be undefined. Similarly, $E[g(X)]$ via LOTUS requires $g(X)$ integrable; a density alone does not guarantee existence of a moment.` },
      { kind: 'callout', tone: 'history', title: 'From average to integral', text: String.raw`The expectation of a discrete variable goes back to Huygens (1657). The general definition as a Lebesgue integral is due to Kolmogorov's 1933 axiomatisation, building on Lebesgue's 1902 integration theory.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We compute the die moments exactly, the exponential moments by quadrature, and check that sample averages converge to the theoretical mean.` },
      { kind: 'code', language: 'python', code: String.raw`import numpy as np
P = np.ones(6)/6
x = np.arange(1,7)
print('die E[X] =', (x*P).sum(), ' E[X^2] =', (x**2*P).sum(),
      ' Var =', (x**2*P).sum()-(x*P).sum()**2)

lam = 2.0
M = 200_000
u = np.random.default_rng(4).exponential(1/lam, size=M)
print('Exp(2) theoretical mean/var =', 1/lam, 1/lam**2)
print('sample mean/var =', u.mean(), u.var(ddof=0))`, caption: 'Analytic moments and Monte Carlo estimates.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Insurance:** expected loss sets premiums; the variance drives capital requirements.`,
        String.raw`**Finance:** expected return and covariance define the mean–variance portfolio frontier.`,
        String.raw`**Queueing theory:** $E[\text{waiting time}]$ determines service-level agreements.`,
        String.raw`**Machine learning:** the loss being minimised is an expectation over the data distribution; stochastic gradient descent estimates it from samples.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Jensen in the wrong direction', text: String.raw`For concave $\varphi$ (e.g. $\log$ or $\sqrt{\cdot}$) the inequality reverses: $E[\sqrt{X}]\le\sqrt{E[X]}$. A frequent error is to replace $E[1/X]$ by $1/E[X]$; convexity of $x\mapsto1/x$ on $(0,\infty)$ gives $E[1/X]\ge1/E[X]$ when $E[1/X]$ exists.` },
      { kind: 'list', items: [
        String.raw`The median need not equal the mean, especially for skewed distributions.`,
        String.raw`$\mathrm{Var}(X)=E[X^2]-(E[X])^2$ requires $E[X^2]<\infty$.`,
        String.raw`Do not assume $E[XY]=E[X]E[Y]$; that needs independence (or zero covariance).`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Find a distribution with $E[X]$ undefined and explain why the Cauchy principal value is not an expectation.`,
        String.raw`Prove $\mathrm{Var}(aX+b)=a^2\mathrm{Var}(X)$ from the definition.`,
        String.raw`Use Jensen to show $E[e^X]\ge e^{E[X]}$ and state when equality holds.`,
        String.raw`Why does LOTUS let us ignore the underlying sample space?`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`P. Billingsley, *Probability and Measure*, Chapter 5 — expectation and convergence theorems.`,
        String.raw`D. Williams, *Probability with Martingales*, Chapter 2 — integration notation and LOTUS.`,
        String.raw`W. Rudin, *Real and Complex Analysis*, Chapter 1 — the Lebesgue integral on abstract measure spaces.`
      ] }
    ]
  },
  {
    id: 'central-limit-theorem',
    title: 'Central Limit Theorem',
    branchId: 'probability-theory',
    level: 'Undergraduate 3',
    summary: String.raw`The Lindeberg–Lévy central limit theorem says that a standardized sum of i.i.d. variables with finite variance converges in distribution to the standard normal, regardless of the original shape. Its characteristic-function proof explains universality and its hypotheses delineate exactly when the bell curve appears.`,
    prerequisites: ['expectation', 'characteristic-functions', 'probability-distributions'],
    tags: ['limit-theorem', 'characteristic-function', 'normal-approximation', 'universality'],
    status: 'Complete',
    simulationIds: ['clt-simulation'],
    derivationIds: ['p3-der-clt-cf'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`Sums of many small random effects — measurement errors, aggregate claims, total noise — appear approximately normal in practice. We need a theorem identifying when this is true, what the correct normalization is, and how good the approximation is.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`Adding independent variables convolves their distributions, and convolution smooths. After enough additions, only the first two moments survive in the limit; all finer details of the original distribution wash out. That is why the normal law is universal.` },
      { kind: 'callout', tone: 'intuition', title: 'The $\sqrt{n}$ scaling', text: String.raw`A sum of $n$ independent variables has variance $n\sigma^2$, so its typical fluctuation is of order $\sigma\sqrt{n}$. Dividing by $\sigma\sqrt{n}$ keeps the distribution from spreading out and reveals a non-degenerate limit.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`Start with a skewed density (e.g. exponential). Plot the density of the standardized mean for $n=1,2,5,30$: the pronounced right skew flattens, the curve becomes symmetric, and by $n=30$ it is visually indistinguishable from the standard normal bell.` },
      { kind: 'math', latex: String.raw`$Z_n=\frac{S_n-n\mu}{\sigma\sqrt{n}}=\frac{\bar X_n-\mu}{\sigma/\sqrt n}\ \xrightarrow{d}\ \mathcal{N}(0,1),\qquad S_n=\sum_{i=1}^n X_i.$`, display: true, caption: 'Standardized sum converging to the standard normal.' },
      { kind: 'callout', tone: 'visual', title: 'Convergence in distribution', text: String.raw`$Z_n\xrightarrow{d}Z$ means $F_{Z_n}(x)\to F_Z(x)$ at every continuity point $x$ of $F_Z$; for the normal limit $F_Z$ is continuous everywhere, so convergence holds for all $x$.` },
      { kind: 'sim', sim: 'clt-simulation', caption: String.raw`Watch the distribution of the standardized mean approach a normal as $n$ grows.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`**Theorem (Lindeberg–Lévy).** Let $X_1,X_2,\dots$ be independent and identically distributed (i.i.d.) real random variables with $E[X_1]=\mu\in\mathbb{R}$ and $\mathrm{Var}(X_1)=\sigma^2\in(0,\infty)$. Then $Z_n=(S_n-n\mu)/(\sigma\sqrt n)$ converges in distribution to $\mathcal{N}(0,1)$. Equivalently, for all $a<b$,` },
      { kind: 'math', latex: String.raw`$\lim_{n\to\infty}P\!\left(a\le\frac{\bar X_n-\mu}{\sigma/\sqrt n}\le b\right)=\frac{1}{\sqrt{2\pi}}\int_a^b e^{-t^2/2}\,dt=\Phi(b)-\Phi(a).$`, display: true },
      { kind: 'list', items: [
        String.raw`**Independence** is essential: perfectly correlated variables give $Z_n$ with the original distribution.`,
        String.raw`**Identical distribution** can be relaxed to Lindeberg's condition for triangular arrays.`,
        String.raw`**Finite variance** is essential: for Cauchy variables the standardized sum remains Cauchy.`,
        String.raw`$\sigma^2>0$ excludes the degenerate case where every $X_i=\mu$ almost surely.`
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`Here is the characteristic-function proof, presented as a **sketch** with the analytic steps named. Full rigour requires Lévy's continuity theorem and a careful Taylor remainder estimate (see p3-der-clt-cf).` },
      { kind: 'steps', title: 'Characteristic-function proof (sketch)', items: [
        { title: 'Standardize a single term', text: String.raw`Let $Y_i=(X_i-\mu)/\sigma$, so $E[Y_i]=0$, $E[Y_i^2]=1$, and $Z_n=n^{-1/2}\sum_i Y_i$.`, math: String.raw`$E[Y_i]=0,\quad E[Y_i^2]=1.$` },
        { title: 'Taylor expand the characteristic function', text: String.raw`Finite second moment gives $\varphi_Y(u)=E[e^{iuY}]=1-\tfrac12 u^2+o(u^2)$ as $u\to0$ (first derivative vanishes because $E[Y]=0$; second because $E[Y^2]=1$).`, math: String.raw`$\varphi_Y(u)=1-\frac{u^2}{2}+o(u^2).$` },
        { title: 'Use independence', text: String.raw`Characteristics multiply under independence; with $u=t/\sqrt n$:`, math: String.raw`$\varphi_{Z_n}(t)=\Bigl[\varphi_Y\!\left(\frac{t}{\sqrt n}\right)\Bigr]^n=\left[1-\frac{t^2}{2n}+o\!\left(\frac1n\right)\right]^n.$` },
        { title: 'Take the limit', text: String.raw`The standard limit $(1+a_n/n)^n\to e^a$ when $a_n\to a$ gives the Gaussian characteristic function.`, math: String.raw`$\lim_{n\to\infty}\varphi_{Z_n}(t)=e^{-t^2/2}=\varphi_{\mathcal{N}(0,1)}(t).$` },
        { title: 'Lévy continuity theorem', text: String.raw`Pointwise convergence of characteristic functions to a function continuous at $0$ implies convergence in distribution. Since $e^{-t^2/2}$ is the characteristic function of $\mathcal{N}(0,1)$, the result follows.`, math: String.raw`$Z_n\xrightarrow{d}\mathcal{N}(0,1).$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — exponential sample mean.** Let $X_i\sim\mathrm{Exp}(1)$, so $\mu=1$, $\sigma=1$. With $n=100$, the CLT gives $P(\bar X_{100}>1.2)\approx P(Z>(1.2-1)/(1/\sqrt{100}))=P(Z>2)=1-\Phi(2)\approx0.0228.$ (The exact gamma answer is about $0.0279$; the CLT error reflects the skewness of the exponential at finite $n$.)` },
      { kind: 'paragraph', text: String.raw`**Example 2 — fair coin.** $X_i\sim\mathrm{Bernoulli}(1/2)$, $\mu=1/2$, $\sigma^2=1/4$. For $n=400$ tosses, $P(\hat p>0.55)\approx P\!\left(Z>\frac{0.55-0.5}{\sqrt{0.25/400}}\right)=P(Z>2)\approx0.0228.$` },
      { kind: 'math', latex: String.raw`$z=\frac{1.2-1}{1/\sqrt{100}}=2,\qquad 1-\Phi(2)\approx0.02275$`, display: true, caption: 'The standardized threshold and tail probability.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Extensions.** The *Lyapunov* or *Lindeberg condition* replaces i.i.d. by independent, non-identically distributed variables with a negligible maximum variance share: $\frac{1}{s_n^2}\sum_i E\bigl[(X_i-\mu_i)^2\mathbf{1}_{\{|X_i-\mu_i|>\varepsilon s_n\}}\bigr]\to0$, where $s_n^2=\sum_i\mathrm{Var}(X_i)$. **Berry–Esseen** gives a quantitative rate: if $E|X_1|^3<\infty$ then $\sup_x|F_{Z_n}(x)-\Phi(x)|\le C\,\rho/(\sigma^3\sqrt n)$ for a universal constant $C$ and $\rho=E|X-\mu|^3$. Convergence in distribution does **not** imply convergence of densities or of all moments.` },
      { kind: 'callout', tone: 'history', title: 'De Moivre to Lévy', text: String.raw`De Moivre (1733) proved a special case for Bernoulli trials. Laplace (1810) generalised it, and the rigorous statement for i.i.d. variables was established by Lindeberg (1922) and Lévy (1925) using characteristic functions.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We simulate standardized means of exponential variables for several $n$ and compare the empirical CDF at $1.96$ with $\Phi(1.96)=0.975.$` },
      { kind: 'code', language: 'python', code: String.raw`import numpy as np
from math import erf, sqrt
Phi = lambda z: 0.5*(1+erf(z/sqrt(2)))
rng = np.random.default_rng(5)
M = 200_000
for n in (1, 5, 30, 100):
    means = rng.exponential(1.0, size=(M, n)).mean(axis=1)
    z = (means - 1.0) * np.sqrt(n)       # sigma = 1
    print(f'n={n:3d}  P(Z_n<=1.96) ~ {(z<=1.96).mean():.4f}')
print('normal target Phi(1.96) =', round(Phi(1.96),4))`, caption: 'Empirical CDF approaching the normal target.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Opinion polling:** approximate sampling error as $\sigma/\sqrt n$ for large $n$.`,
        String.raw`**Quality control:** control charts rely on approximate normality of batch averages.`,
        String.raw`**Finance:** aggregate daily returns are modeled as normal (with the well-known caveat of heavy tails).`,
        String.raw`**Physics:** thermal noise emerges from the sum of many microscopic independent contributions.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Finite variance is not optional', text: String.raw`For Cauchy variables the sample mean has the same Cauchy distribution as a single observation — averaging does not help. Heavy-tailed data with infinite variance (e.g. some financial returns) can invalidate the normal approximation even at large $n$.` },
      { kind: 'list', items: [
        String.raw`The CLT concerns standardized sums, not raw sums (whose variance grows with $n$).`,
        String.raw`It is an asymptotic statement; at small $n$ with skewed data a normal approximation can be poor.`,
        String.raw`Independence matters: strong dependence can destroy the $\sqrt n$ scaling.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Explain why the variance must be finite, using the Cauchy example.`,
        String.raw`Why does the characteristic function approach work better here than directly manipulating densities?`,
        String.raw`How does the Berry–Esseen bound quantify "how large $n$ must be"?`,
        String.raw`If $X_i$ are Bernoulli($p$) with $p$ near 0, what does the CLT require of $n$ for a good approximation?`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`P. Billingsley, *Probability and Measure*, Section 27 — characteristic functions and the CLT.`,
        String.raw`D. Williams, *Probability with Martingales*, Chapter 18 — a elegant CLT proof.`,
        String.raw`R. N. Bhattacharya and R. Ranga Rao, *Normal Approximation and Asymptotic Expansions* — error bounds.`
      ] }
    ]
  },
  {
    id: 'markov-chains',
    title: 'Markov Chains',
    branchId: 'probability-theory',
    level: 'Undergraduate 3',
    summary: String.raw`A Markov chain is a stochastic process whose future depends on the past only through the present state. Finite-state chains are governed by a stochastic matrix; irreducibility and aperiodicity determine whether a unique stationary distribution attracts the chain.`,
    prerequisites: ['conditional-probability', 'probability-distributions', 'linear-transformations'],
    tags: ['stochastic-process', 'transition-matrix', 'stationary', 'mixing'],
    status: 'Complete',
    simulationIds: ['markov-chain'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`Many systems evolve in stages — weather, queues, genetic states, web pages — where remembering the entire history is unnecessary or impossible. The Markov property replaces full-history dependence by a single transition rule, making long-run behaviour computable with linear algebra.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`The present state is a complete "sufficient summary" of the past. Once you know where the process is now, how it got there is irrelevant for predicting where it goes next. Iterating the one-step rule gives all multi-step probabilities.` },
      { kind: 'callout', tone: 'intuition', title: 'Memorylessness, not independence', text: String.raw`Successive states are generally dependent — tomorrow's weather depends on today's. The Markov property says only that, *conditional on today*, earlier days add no information.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`Draw states as nodes and transition probabilities $P_{ij}$ as directed edges labelled by weights; outgoing weights from each node sum to $1$. Powers of the transition matrix record probabilities of paths of length $n$. If the graph is one strongly connected component and has no periodic trap, the node visitation frequencies settle to the stationary distribution.` },
      { kind: 'math', latex: String.raw`$P=\begin{pmatrix}0.8&0.2\\0.4&0.6\end{pmatrix},\qquad P^{2}=\begin{pmatrix}0.72&0.28\\0.56&0.44\end{pmatrix}$`, display: true, caption: 'A two-state weather chain and its two-step matrix.' },
      { kind: 'callout', tone: 'visual', title: 'Stationary means balanced flow', text: String.raw`At stationarity $\pi_j=\sum_i\pi_i P_{ij}$: total flow into state $j$ equals total flow out. For the weather chain, $0.8\pi_0+0.4\pi_1=\pi_0$ gives $\pi=(2/3,1/3)$.` },
      { kind: 'sim', sim: 'markov-chain', caption: String.raw`Simulate the chain and compare long-run frequencies with the stationary distribution.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`A sequence of random variables $(X_n)_{n\ge0}$ taking values in a countable state space $S$ is a (time-homogeneous) Markov chain with transition matrix $P=(P_{ij})$ if for all $n,i,j$ and all histories $i_0,\dots,i_{n-1}$,` },
      { kind: 'math', latex: String.raw`$P(X_{n+1}=j\mid X_n=i, X_{n-1}=i_{n-1},\dots,X_0=i_0)=P(X_{n+1}=j\mid X_n=i)=P_{ij}.$`, display: true },
      { kind: 'list', items: [
        String.raw`$P_{ij}\ge0$ and $\sum_{j\in S}P_{ij}=1$ for every $i$: $P$ is (row) stochastic.`,
        String.raw`The $n$-step matrix is $P^n$; entry $(P^n)_{ij}=P(X_n=j\mid X_0=i)$.`,
        String.raw`A distribution $\pi$ is **stationary** if $\pi P=\pi$ and $\sum_i\pi_i=1$.`,
        String.raw`A state $j$ is **periodic** with period $d>1$ if returns occur only at multiples of $d$; the chain is aperiodic if all states have period $1$.`
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`We derive the Chapman–Kolmogorov equations and existence of a stationary distribution for finite chains.` },
      { kind: 'steps', title: 'From one step to many steps', items: [
        { title: 'Condition on the intermediate state', text: String.raw`To go from $i$ to $k$ in $m+n$ steps, the chain is at some $j$ after $m$ steps; sum over $j$ using total probability and the Markov property at time $m$.`, math: String.raw`$P^{(m+n)}_{ik}=\sum_j P^{(m)}_{ij}P^{(n)}_{jk},$` },
        { title: 'Recognise matrix multiplication', text: String.raw`The displayed identity is exactly the definition of matrix product, so $P^{(m+n)}=P^{(m)}P^{(n)}$ and by induction $P^{(n)}=P^n$.`, math: String.raw`$P^{(m+n)}=P^{(m)}P^{(n)}\quad\Rightarrow\quad P^{(n)}=P^n.$` },
        { title: 'Existence of $\pi$ (finite case)', text: String.raw`Let $Q=\lim_{N\to\infty}\frac1N\sum_{n=0}^{N-1}P^n$, which exists for a finite chain (Cesàro limit of a stochastic matrix). Then $QP=Q$, so any row of $Q$ is stationary; a convex combination of rows gives a probability vector.`, math: String.raw`$\pi P=\pi,\qquad \sum_i\pi_i=1.$` },
        { title: 'Uniqueness and convergence', text: String.raw`If the chain is irreducible (all states communicate) the stationary distribution is unique. If in addition it is aperiodic, $\lim_{n\to\infty}P^n_{ij}=\pi_j$ for all $i,j$.`, math: String.raw`$\lim_{n\to\infty}P(X_n=j\mid X_0=i)=\pi_j.$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example — weather.** With states $\{$dry, wet$\}$ and $P$ as above: solve $\pi_0=0.8\pi_0+0.4\pi_1$ and $\pi_0+\pi_1=1$, giving $\pi_0=2/3$, $\pi_1=1/3$. The two-step matrix computed above shows $P(X_2=\text{wet}\mid X_0=\text{dry})=0.28$, versus the stationary value $1/3\approx0.3333.$` },
      { kind: 'math', latex: String.raw`$P^3=P^2P=\begin{pmatrix}0.688&0.312\\0.624&0.376\end{pmatrix},\qquad \pi P^{n}=\pi\ \text{for all }n.$`, display: true, caption: 'Higher powers approach rows equal to $\pi$.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Detailed balance.** If a probability vector $\pi$ satisfies $\pi_i P_{ij}=\pi_j P_{ji}$ for all $i,j$, then $\pi P=\pi$ (sum over $i$). This is sufficient but not necessary for stationarity; chains satisfying it are *reversible*. **Ergodic theorem for Markov chains.** For an irreducible positive-recurrent chain and any function $f$ with $\sum_i\pi_i\lvert f(i)\rvert<\infty$, $\frac1n\sum_{k=0}^{n-1}f(X_k)\to\sum_i\pi_i f(i)$ almost surely, regardless of the initial distribution.` },
      { kind: 'callout', tone: 'history', title: 'Andrey Markov, 1906', text: String.raw`Markov introduced the dependence model in 1906 to show that the law of large numbers can hold for dependent variables. His original example analysed alternations of vowels and consonants in Pushkin's *Eugene Onegin*.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We raise the transition matrix to powers, find the stationary vector as the eigenvector for eigenvalue $1$, and compare with simulated long-run frequencies.` },
      { kind: 'code', language: 'python', code: String.raw`import numpy as np
P = np.array([[0.8,0.2],[0.4,0.6]])
print('P^2 =', P@P)
print('P^3 =', np.linalg.matrix_power(P,3))
vals, vecs = np.linalg.eig(P.T)
idx = np.argmin(np.abs(vals-1))
pi = np.real(vecs[:,idx]); pi = pi/pi.sum()
print('stationary pi =', pi, ' target [2/3,1/3]')

rng = np.random.default_rng(6)
state = 0
counts = np.zeros(2, dtype=int)
for t in range(500_000):
    counts[state] += 1
    state = rng.choice(2, p=P[state])
print('simulated frequencies =', counts/counts.sum())`, caption: 'Linear algebra and simulation agree on the stationary law.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**PageRank:** the web is a giant Markov chain; the stationary distribution ranks pages.`,
        String.raw`**Queueing:** buffer occupancy and loss probabilities are computed from stationary laws.`,
        String.raw`**Bioinformatics:** hidden Markov models align sequences and call genotypes.`,
        String.raw`**Markov chain Monte Carlo:** construct a chain whose stationary distribution is a desired posterior.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Irreducibility and periodicity', text: String.raw`A finite chain that is irreducible but periodic (e.g. $P=\begin{pmatrix}0&1\\1&0\end{pmatrix}$) has a unique stationary distribution $(1/2,1/2)$ but $P^n$ does not converge — the chain oscillates. Irreducibility alone does not guarantee mixing.` },
      { kind: 'list', items: [
        String.raw`Stationary means $\pi P=\pi$, not $P\pi=\pi$ (unless $P$ is symmetric).`,
        String.raw`A stationary distribution need not be unique for a reducible chain.`,
        String.raw`The Markov property concerns conditional dependence, not marginal independence of states.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Give an example of a chain with a stationary distribution that is not unique.`,
        String.raw`Prove that a finite irreducible chain has a unique stationary distribution.`,
        String.raw`Why does detailed balance imply stationarity but not conversely?`,
        String.raw`How does aperiodicity enter the convergence theorem? Construct a periodic counterexample.`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`D. A. Levin, Y. Peres and E. L. Wilmer, *Markov Chains and Mixing Times* — modern treatment.`,
        String.raw`S. Ross, *Stochastic Processes*, Chapter 1 — accessible introduction.`,
        String.raw`P. Billingsley, *Probability and Measure*, Section 33 — Markov processes and ergodic theory.`
      ] }
    ]
  },
  {
    id: 'descriptive-statistics',
    title: 'Descriptive Statistics',
    branchId: 'statistics',
    level: 'Undergraduate 1',
    summary: String.raw`Descriptive statistics summarises a dataset without assuming a generating model: centre (mean, median, mode), spread (variance, IQR), and association (covariance, correlation). Careful attention to definitions — especially the sample-versus-population variance — turns numbers into honest summaries.`,
    prerequisites: ['probability-axioms', 'expectation'],
    tags: ['summary-statistics', 'variance', 'quantiles', 'correlation'],
    status: 'Complete',
    simulationIds: ['distribution-lab'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`A raw list of a million numbers communicates nothing. We need a small set of well-understood quantities that capture location, spread, shape and association, together with plots that reveal structure the summaries may hide.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`The mean is the balancing point, the median is the middle observation, and the mode is the most frequent value. The standard deviation is a typical distance from the mean; the interquartile range is the width of the middle half of the data and is resistant to outliers.` },
      { kind: 'callout', tone: 'intuition', title: 'Robustness', text: String.raw`Replacing the largest observation by $10^{9}$ changes the mean enormously but leaves the median and IQR unchanged. Choose the summary that matches the question: for skewed incomes the median is usually more informative than the mean.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`A histogram shows where observations cluster; a box plot encodes the median, the quartiles as box edges and whiskers reaching to $1.5\times\mathrm{IQR}$ beyond them, with outliers as points. A scatter plot reveals correlation, nonlinearity and heteroscedasticity in one picture.` },
      { kind: 'math', latex: String.raw`$\text{box plot:}\quad Q_1\ \big|\ \text{box}\ \big|\ Q_3,\qquad \text{whiskers at }Q_1-1.5\,\mathrm{IQR},\ Q_3+1.5\,\mathrm{IQR}$`, display: true, caption: 'The five-number summary behind a box plot.' },
      { kind: 'callout', tone: 'visual', title: 'Always plot first', text: String.raw`Anscombe's quartet consists of four datasets with identical means, variances, correlations and regression lines but completely different scatter plots. Summaries alone can be deeply misleading.` },
      { kind: 'sim', sim: 'distribution-lab', caption: String.raw`Load data into the distribution lab and compare histograms, means and medians.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`For observations $x_1,\dots,x_n$, the sample mean is $\bar x=\frac1n\sum_i x_i$. The **sample variance** with Bessel's correction is $s^2=\frac{1}{n-1}\sum_i(x_i-\bar x)^2$; dividing by $n$ instead gives the (biased) population-style variance $\hat\sigma^2=\frac1n\sum_i(x_i-\bar x)^2$. The sample covariance and Pearson correlation are:` },
      { kind: 'math', latex: String.raw`$s_{xy}=\frac{1}{n-1}\sum_i (x_i-\bar x)(y_i-\bar y),\qquad r=\frac{\sum_i(x_i-\bar x)(y_i-\bar y)}{\sqrt{\sum_i(x_i-\bar x)^2\sum_i(y_i-\bar y)^2}}\in[-1,1].$`, display: true },
      { kind: 'table', headers: ['Quantity', 'Definition', 'Sensitive to outliers?', 'Use when'], rows: [
        [String.raw`Mean $\bar x$`, String.raw`$\frac1n\sum x_i$`, String.raw`Yes`, String.raw`Symmetric data, further algebra`],
        [String.raw`Median`, String.raw`Middle order statistic`, String.raw`No`, String.raw`Skewed data, incomes`],
        [String.raw`Mode`, String.raw`Most frequent value`, String.raw`No`, String.raw`Categorical data`],
        [String.raw`Std. deviation $s$`, String.raw`$\sqrt{\frac{1}{n-1}\sum(x_i-\bar x)^2}$`, String.raw`Yes`, String.raw`Gaussian-style spread`],
        [String.raw`IQR`, String.raw`$Q_3-Q_1$`, String.raw`No`, String.raw`Robust spread`]
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`Why $n-1$ rather than $n$? We derive the unbiasedness of the sample variance for i.i.d. data with finite variance.` },
      { kind: 'steps', title: 'Bessel correction derived', items: [
        { title: 'Write the centred sum of squares', text: String.raw`Use the identity $\sum_i(x_i-\bar x)^2=\sum_i x_i^2-n\bar x^2$, obtained by expanding and using $\sum_i x_i=n\bar x$.`, math: String.raw`$\sum_i(x_i-\bar x)^2=\sum_i x_i^2-n\bar x^2.$` },
        { title: 'Take expectations', text: String.raw`With $E[X_i]=\mu$, $\mathrm{Var}(X_i)=\sigma^2$, we have $E[X_i^2]=\sigma^2+\mu^2$ and $E[\bar X^2]=\sigma^2/n+\mu^2$.`, math: String.raw`$E\!\left[\sum_i X_i^2\right]=n(\sigma^2+\mu^2),\qquad E[n\bar X^2]=\sigma^2+n\mu^2.$` },
        { title: 'Subtract', text: String.raw`The $\mu^2$ terms cancel, leaving $(n-1)\sigma^2$.`, math: String.raw`$E\!\left[\sum_i(X_i-\bar X)^2\right]=(n-1)\sigma^2.$` },
        { title: 'Conclude', text: String.raw`Dividing by $n-1$ gives an unbiased estimator; dividing by $n$ gives $\frac{n-1}{n}\sigma^2$, biased downward by the factor $(n-1)/n$.`, math: String.raw`$E[s^2]=\sigma^2,\qquad E[\hat\sigma^2]=\frac{n-1}{n}\sigma^2.$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — hand calculation.** For $D=\{2,4,4,4,5,5,7,9\}$, $n=8$ and $\sum x_i=40$, so $\bar x=5$. Sorted, the middle two values are $4$ and $5$, so the median is $4.5$; the mode is $4$. Squared deviations from $5$ are $9,1,1,1,0,0,4,16$, summing to $32$. Thus $\hat\sigma^2=32/8=4$ ($\hat\sigma=2$) and $s^2=32/7\approx4.5714$ ($s\approx2.1381$). With $Q_1=4$ and $Q_3=6$, $\mathrm{IQR}=2.$` },
      { kind: 'paragraph', text: String.raw`**Example 2 — correlation.** For $x=(1,2,3,4,5)$ and $y=(2,4,5,4,6)$: $\bar x=3$, $\bar y=4.2$, $\sum(x_i-\bar x)(y_i-\bar y)=8$, $\sum(x_i-\bar x)^2=10$, $\sum(y_i-\bar y)^2=8.8$. Hence $r=8/\sqrt{88}\approx0.8528$, indicating a strong positive linear association.` },
      { kind: 'math', latex: String.raw`$r=\frac{8}{\sqrt{10\cdot8.8}}=\frac{8}{\sqrt{88}}\approx0.8528,\qquad \sum_i(x_i-\bar x)^2=32\ \text{in Example 1}.$`, display: true, caption: 'Worked numerical summaries.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Cauchy–Schwarz bound.** The algebraic identity behind $r\in[-1,1]$ is $\left(\sum_i a_i b_i\right)^2\le\left(\sum_i a_i^2\right)\left(\sum_i b_i^2\right)$ with $a_i=x_i-\bar x$, $b_i=y_i-\bar y$. Equality holds exactly when one centred vector is a scalar multiple of the other, i.e. $y_i=\alpha+\beta x_i$ with $\beta>0$ for $r=1$ and $\beta<0$ for $r=-1$. **Chebyshev's inequality** (no distributional assumption) says at least $1-1/k^2$ of observations lie within $k$ sample standard deviations of the mean, for $k>1$.` },
      { kind: 'callout', tone: 'history', title: 'The standard deviation', text: String.raw`Karl Pearson coined the term "standard deviation" in 1893. The $n-1$ correction traces to Bessel's work on astronomical error estimation; Gauss and Laplace had already used mean squared error in the early 1800s.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We verify the hand calculations with NumPy, explicitly contrasting ddof=0 and ddof=1.` },
      { kind: 'code', language: 'python', code: String.raw`import numpy as np
d = np.array([2,4,4,4,5,5,7,9])
print('mean', d.mean(), 'median', np.median(d), 'sum sq dev', ((d-d.mean())**2).sum())
print('var ddof=0', d.var(ddof=0), 'var ddof=1', d.var(ddof=1))
print('std ddof=1', d.std(ddof=1), 'IQR', np.percentile(d,75)-np.percentile(d,25))
x = np.array([1,2,3,4,5]); y = np.array([2,4,5,4,6])
print('Pearson r =', np.corrcoef(x,y)[0,1])`, caption: 'NumPy confirms mean 5, median 4.5, r ≈ 0.853.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Public health:** reporting median and IQR for skewed length-of-stay data.`,
        String.raw`**Finance:** volatility is the standard deviation of returns; Sharpe ratio uses mean and spread.`,
        String.raw`**Manufacturing:** process capability indices compare specification limits with $6\sigma$ spread.`,
        String.raw`**Education:** item analysis uses means, variances and correlations of test scores.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Which variance?', text: String.raw`Using $1/n$ when estimating a population variance from a sample biases the result downward. Conversely, for a *complete* finite population the divisor $n$ is correct — $n-1$ compensates for estimating $\mu$ from the same data.` },
      { kind: 'list', items: [
        String.raw`Correlation measures linear association only: $r=0$ does not imply independence.`,
        String.raw`Quartile definitions vary across software packages; state the convention.`,
        String.raw`The mean of a ratio is not the ratio of means; beware aggregated averages.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Construct two datasets with the same mean but different standard deviations.`,
        String.raw`Why does the median resist outliers better than the mean?`,
        String.raw`Show that $r$ is unchanged by rescaling $x$ or $y$ by positive constants.`,
        String.raw`When might a bimodal histogram make the mean a poor summary?`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`J. Tukey, *Exploratory Data Analysis* — box plots and robust summaries.`,
        String.raw`D. Freedman, R. Pisani and R. Purves, *Statistics* — intuitive treatment of variability.`,
        String.raw`F. Mosteller and J. W. Tukey, *Data Analysis and Regression* — residual diagnostics.`
      ] }
    ]
  },
  {
    id: 'hypothesis-testing',
    title: 'Hypothesis Testing',
    branchId: 'statistics',
    level: 'Undergraduate 3',
    summary: String.raw`Frequentist hypothesis testing measures how incompatible data are with a null hypothesis via a test statistic and its p-value. Neyman–Pearson theory adds error rates and power, while careful statements of assumptions prevent the common misinterpretation of p-values.`,
    prerequisites: ['probability-distributions', 'expectation', 'estimation'],
    tags: ['p-value', 'type-I-error', 'power', 'neyman-pearson'],
    status: 'Complete',
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`Data always deviate from any ideal model. We need a rule for deciding whether an observed deviation is plausibly sampling noise or evidence for a substantive effect — and a way to quantify the risk of making the wrong decision.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`Assume the null is true, ask how extreme the observed statistic would be under that assumption, and reject if the answer is very small. The p-value is a surprise index, not the probability that the null is true.` },
      { kind: 'callout', tone: 'intuition', title: 'Analogy with a criminal trial', text: String.raw`The null is "innocent". We do not prove innocence; we either find sufficient evidence to reject it or fail to do so. Failing to reject is not the same as accepting — absence of evidence is not evidence of absence.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`Draw the sampling distribution of the test statistic under $H_0$ and shade the rejection region in the tail(s) beyond the critical value. The observed statistic sits somewhere on this axis; the p-value is the shaded area beyond it. Under an alternative, the whole distribution shifts, and the unshaded overlap is the Type II error probability.` },
      { kind: 'math', latex: String.raw`$p\text{-value}=P_{H_0}\!\left(T\ge T_{\mathrm{obs}}\right),\qquad \alpha=P_{H_0}(\text{reject }H_0),\qquad \text{power}=P_{H_1}(\text{reject }H_0).$`, display: true, caption: 'One-sided upper-tail version; adapt tails to the alternative.' },
      { kind: 'callout', tone: 'visual', title: 'Two-sided tests', text: String.raw`For $H_1:\mu\ne\mu_0$ the rejection region splits across both tails. With a symmetric null distribution the p-value is $2P_{H_0}(T\ge\lvert T_{\mathrm{obs}}\rvert)$.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`A test consists of $H_0$ (null), $H_1$ (alternative), a statistic $T$, a rejection region $R$ of size $\alpha=P_{H_0}(T\in R)$. The **p-value** is the smallest significance level at which $H_0$ would be rejected. A **Type I error** rejects a true null (probability $\alpha$); a **Type II error** fails to reject a false null (probability $\beta$); power is $1-\beta$.` },
      { kind: 'math', latex: String.raw`$z=\frac{\bar X-\mu_0}{\sigma/\sqrt n}\ \xrightarrow[H_0]{d}\ \mathcal{N}(0,1)\quad\text{when }\sigma\text{ is known and }X_i\text{ i.i.d. with finite variance}.$`, display: true },
      { kind: 'math', latex: String.raw`$p=1-\Phi(z_{\mathrm{obs}})\ \text{(upper tail)},\qquad z_{\mathrm{crit}}=\Phi^{-1}(1-\alpha)\ \text{(rejection threshold)}.$`, display: true, caption: 'Tail area and critical value for a one-sided upper test.' },
      { kind: 'table', headers: ['Quantity', 'Meaning', 'Controlled by'], rows: [
        [String.raw`$\alpha$`, String.raw`P(reject true $H_0$)`, String.raw`Chosen significance level`],
        [String.raw`$\beta$`, String.raw`P(keep false $H_0$)`, String.raw`Effect size, $n$, $\alpha$`],
        [String.raw`Power $1-\beta$`, String.raw`P(reject false $H_0$)`, String.raw`Increase $n$ or effect size`],
        [String.raw`p-value`, String.raw`Tail area under $H_0$ at $T_{\mathrm{obs}}$`, String.raw`Data and test statistic`]
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`We derive the z-test threshold and compute its power against a specific alternative.` },
      { kind: 'steps', title: 'A one-sample z-test from scratch', items: [
        { title: 'Sampling distribution under $H_0$', text: String.raw`For i.i.d. $X_i$ with known $\sigma$ and $H_0:\mu=\mu_0$, the CLT gives $\bar X\approx\mathcal{N}(\mu_0,\sigma^2/n)$, so $Z=(\bar X-\mu_0)/(\sigma/\sqrt n)$ is approximately standard normal.`, math: String.raw`$Z\approx\mathcal{N}(0,1)\ \text{under }H_0.$` },
        { title: 'Choose the rejection region', text: String.raw`For $H_1:\mu>\mu_0$ at level $\alpha=0.05$, reject when $Z>z_{0.95}=1.645$.`, math: String.raw`$R=\{z:z>1.645\},\qquad P_{H_0}(R)=0.05.$` },
        { title: 'Compute the observed statistic', text: String.raw`With $n=25$, $\sigma=10$, $\bar x=105$, $\mu_0=100$:`, math: String.raw`$z_{\mathrm{obs}}=\frac{105-100}{10/\sqrt{25}}=\frac{5}{2}=2.5.$` },
        { title: 'Compute the p-value', text: String.raw`The upper tail at $2.5$ is $1-\Phi(2.5)\approx0.0062<0.05$, so reject $H_0$.`, math: String.raw`$p\approx0.0062.$` },
        { title: 'Power against $\mu=105$', text: String.raw`Reject when $\bar X>100+1.645\cdot2=103.29$. Under $\mu=105$, standardize: $z=(103.29-105)/2=-0.855$, so power $=\Phi(0.855)\approx0.804.$`, math: String.raw`$\text{power}=P_{\mu=105}(\bar X>103.29)\approx0.804.$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — coin fairness.** In $n=100$ tosses we observe 62 heads. Under $H_0:p=1/2$, $\hat p=0.62$ and $z=(0.62-0.5)/\sqrt{0.25/100}=0.12/0.05=2.4$, giving a two-sided p-value $2(1-\Phi(2.4))\approx0.0164$: evidence against fairness at the 5% level.` },
      { kind: 'paragraph', text: String.raw`**Example 2 — known variance z-test.** The calculation above gives $z=2.5$, p $\approx0.0062$, and critical sample mean $\bar x^\ast=103.29$ for $\alpha=0.05$. If we used a two-sided test the critical value would be $1.96$ and $\bar x^\ast=103.92.$` },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Neyman–Pearson lemma.** For testing a simple $H_0:\theta=\theta_0$ against a simple $H_1:\theta=\theta_1$ with densities $f_0,f_1$, the most powerful test of size $\alpha$ rejects for large likelihood ratio $f_1/f_0$: reject when $f_1(x)/f_0(x)>k$, with $k$ chosen so $P_0(\text{reject})=\alpha$. Proof sketch: any other test $\phi$ of size $\alpha$ satisfies $\int(\phi-\phi^\ast)(f_1-kf_0)\ge0$ pointwise-optimality because $\phi^\ast$ is the indicator of $\{f_1-kf_0>0\}$; integrating gives power of $\phi^\ast$ at least that of $\phi$.` },
      { kind: 'callout', tone: 'warning', title: 'What a p-value is not', text: String.raw`It is not $P(H_0\mid\text{data})$, not the probability the result was due to chance, and not a measure of effect size. With large $n$ trivially small effects produce tiny p-values; with small $n$ large effects may not.` },
      { kind: 'callout', tone: 'history', title: 'Fisher versus Neyman–Pearson', text: String.raw`R. A. Fisher promoted the p-value as evidence against a null, whereas Jerzy Neyman and Egon Pearson framed testing as a decision procedure with controlled long-run error rates. Modern practice blends both, sometimes uneasily.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We compute tail probabilities and power using only the standard-library error function, then check the z-test by simulation.` },
      { kind: 'code', language: 'python', code: String.raw`import numpy as np
from math import erf, sqrt
Phi = lambda z: 0.5*(1+erf(z/sqrt(2)))
zobs = 2.5
print('one-sided p =', 1-Phi(zobs), ' two-sided p =', 2*(1-Phi(abs(zobs))))
print('critical mean (alpha=.05, one-sided) =', 100+1.6448536*10/5)
print('power at mu=105 =', Phi((100+1.6448536*2-105)/2)*-1 + 1)

rng = np.random.default_rng(7)
means = 100 + 10/np.sqrt(25)*rng.standard_normal(200_000)
print('simulated size =', (means>100+1.6448536*2).mean(), ' target 0.05')`, caption: 'Tail areas, power and simulated size.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Clinical trials:** testing a treatment effect against placebo with pre-registered power calculations.`,
        String.raw`**A/B testing:** deciding whether a website change improves conversion.`,
        String.raw`**Quality control:** detecting a shift in process mean from historical levels.`,
        String.raw`**Genomics:** thousands of simultaneous tests require multiple-comparison corrections such as Benjamini–Hochberg.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Multiple testing and p-hacking', text: String.raw`Testing 20 independent true nulls at $\alpha=0.05$ gives a $1-0.95^{20}\approx0.64$ chance of at least one false rejection. Pre-specify hypotheses and adjust for multiplicity; do not choose the test after seeing the data.` },
      { kind: 'list', items: [
        String.raw`"Fail to reject" is not "accept $H_0$".`,
        String.raw`The p-value is computed under $H_0$, not under $H_1$.`,
        String.raw`Unknown $\sigma$ requires a t-test, not a z-test; the normal approximation can be badly optimistic in small samples.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Explain why a smaller p-value is not the same as a larger effect size.`,
        String.raw`Show how power changes with $n$ for a fixed effect.`,
        String.raw`State the Neyman–Pearson lemma precisely and explain the role of the likelihood ratio.`,
        String.raw`Why does multiple testing inflate the family-wise error rate?`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`J. Neyman and E. S. Pearson, "On the Problem of the Most Efficient Tests of Statistical Hypotheses" (1933).`,
        String.raw`E. L. Lehmann and J. P. Romano, *Testing Statistical Hypotheses*, 3rd ed.`,
        String.raw`R. A. Fisher, *Statistical Methods for Research Workers* — the original p-value advocacy.`
      ] }
    ]
  },
  {
    id: 'linear-regression',
    title: 'Linear Regression',
    branchId: 'statistics',
    level: 'Undergraduate 2',
    summary: String.raw`Linear regression models a response as a linear function of predictors plus noise and estimates coefficients by least squares. Under the Gauss–Markov assumptions the OLS estimator is the best linear unbiased estimator; its geometry is orthogonal projection onto the column space of the design matrix.`,
    prerequisites: ['linear-transformations', 'expectation', 'matrix-multiplication'],
    tags: ['least-squares', 'ols', 'gauss-markov', 'projection'],
    status: 'Complete',
    simulationIds: ['regression-fit'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`We want to predict a quantitative response from explanatory variables and to interpret how the response changes with each predictor. Linear regression gives a transparent, computable model with well-understood uncertainty.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`Fit a line (or hyperplane) that minimises the sum of squared vertical distances from the data points. Squaring penalises large residuals heavily, and the resulting least-squares problem is a projection: the fitted values are the shadow of the response vector on the space spanned by the predictors.` },
      { kind: 'callout', tone: 'intuition', title: 'Projection picture', text: String.raw`In $\mathbb{R}^n$, the design matrix columns span a subspace. OLS chooses $\hat\beta$ so that $X\hat\beta$ is the orthogonal projection of $y$ onto that subspace; the residual vector is orthogonal to every column of $X$, giving the normal equations $X^\top(y-X\hat\beta)=0$.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`In two dimensions draw the scatter plot and the fitted line; residuals are vertical segments. A residual plot against fitted values should look like random noise around zero. A funnel shape signals heteroscedasticity; curvature signals a misspecified functional form.` },
      { kind: 'math', latex: String.raw`$y=X\beta+\varepsilon,\qquad \hat\beta=(X^\top X)^{-1}X^\top y,\qquad \hat y=X\hat\beta=Py,\quad P=X(X^\top X)^{-1}X^\top.$`, display: true, caption: 'OLS estimator and the hat matrix; requires full column rank.' },
      { kind: 'math', latex: String.raw`$\hat\beta_1=\frac{\sum_i(x_i-\bar x)(y_i-\bar y)}{\sum_i(x_i-\bar x)^2},\qquad \hat\beta_0=\bar y-\hat\beta_1\bar x,\qquad R^2=1-\frac{\mathrm{RSS}}{\mathrm{TSS}}.$`, display: true, caption: 'Simple-regression formulas and coefficient of determination.' },
      { kind: 'callout', tone: 'visual', title: 'Degrees of freedom', text: String.raw`If $X$ has $p$ columns (including the intercept), the residual sum of squares divided by $\sigma^2$ follows $\chi^2_{n-p}$ under normal errors — we lose $p$ degrees of freedom because $p$ coefficients were estimated.` },
      { kind: 'sim', sim: 'regression-fit', caption: String.raw`Move points and watch the fitted line, residuals and $R^2$ update.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`The linear model is $y_i=\beta_0+\beta_1 x_{i1}+\cdots+\beta_{p-1}x_{i,p-1}+\varepsilon_i$, with $E[\varepsilon_i\mid X]=0$ and $\mathrm{Var}(\varepsilon_i\mid X)=\sigma^2$ (homoscedastic). For simple regression with one predictor, $\hat\beta_1=\frac{\sum_i(x_i-\bar x)(y_i-\bar y)}{\sum_i(x_i-\bar x)^2}=\frac{S_{xy}}{S_{xx}}$ and $\hat\beta_0=\bar y-\hat\beta_1\bar x.$` },
      { kind: 'list', items: [
        String.raw`Full column rank of $X$ is needed for $(X^\top X)^{-1}$ to exist (no perfect multicollinearity).`,
        String.raw`$R^2=1-\mathrm{RSS}/\mathrm{TSS}$ is the proportion of variance explained.`,
        String.raw`Under normal errors, $\hat\beta\sim\mathcal{N}(\beta,\sigma^2(X^\top X)^{-1})$ conditional on $X$.`,
        String.raw`A coefficient measures association conditional on the other predictors, not necessarily causation.`
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`We derive the normal equations by minimising the residual sum of squares, then state the Gauss–Markov optimality argument.` },
      { kind: 'steps', title: 'Least squares from first principles', items: [
        { title: 'Write the objective', text: String.raw`Minimise $S(\beta)=\|y-X\beta\|^2=(y-X\beta)^\top(y-X\beta)$.`, math: String.raw`$S(\beta)=y^\top y-2\beta^\top X^\top y+\beta^\top X^\top X\beta.$` },
        { title: 'Differentiate', text: String.raw`Using $\nabla_\beta(\beta^\top A\beta)=(A+A^\top)\beta$ with $A=X^\top X$ symmetric:`, math: String.raw`$\nabla_\beta S=-2X^\top y+2X^\top X\beta.$` },
        { title: 'Solve the normal equations', text: String.raw`Setting the gradient to zero and assuming full column rank:`, math: String.raw`$X^\top X\hat\beta=X^\top y\quad\Rightarrow\quad\hat\beta=(X^\top X)^{-1}X^\top y.$` },
        { title: 'Second-order condition', text: String.raw`The Hessian $2X^\top X$ is positive definite when $X$ has full column rank, so the stationary point is the global minimum.`, math: String.raw`$2X^\top X\succ0.$` },
        { title: 'Gauss–Markov', text: String.raw`For any linear unbiased estimator $c^\top y$ with $cX$ satisfying the unbiasedness constraint, Cauchy–Schwarz shows its variance is at least that of the OLS contrast; hence OLS is BLUE under linearity, random sampling, no perfect collinearity, zero conditional mean and homoscedasticity.`, math: String.raw`$\mathrm{Var}(\hat\beta)=\sigma^2(X^\top X)^{-1}.$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example — five data points.** For $(x,y)=(1,2),(2,4),(3,5),(4,4),(5,6)$: $\bar x=3$, $\bar y=4.2$, $S_{xx}=10$, $S_{xy}=8$, so $\hat\beta_1=0.8$ and $\hat\beta_0=4.2-0.8\cdot3=1.8$. Fitted values are $2.6,3.4,4.2,5.0,5.8$; residuals $-0.6,0.6,0.8,-1.0,0.2$ sum to zero.` },
      { kind: 'math', latex: String.raw`$\mathrm{RSS}=0.36+0.36+0.64+1.00+0.04=2.40,\quad \mathrm{TSS}=8.8,\quad R^2=1-\frac{2.4}{8.8}\approx0.7273.$`, display: true, caption: 'Goodness of fit for the five-point example.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Frisch–Waugh–Lovell.** Regressing $y$ on $X_1,X_2$ yields the same coefficient on $X_1$ as regressing $y$ on $X_2$ first, taking residuals, then regressing those on the residuals of $X_1$ on $X_2$. **Gauss–Markov theorem.** Under the five assumptions above, OLS is the Best Linear Unbiased Estimator; if errors are additionally normal, it coincides with the maximum-likelihood estimator and exact t and F tests apply.` },
      { kind: 'callout', tone: 'warning', title: 'Assumptions are substantive', text: String.raw`Omitted-variable bias arises if a relevant predictor correlates with included predictors and affects $y$: then $E[\varepsilon\mid X]\ne0$ and OLS is biased. Heteroscedasticity leaves coefficients unbiased but invalidates usual standard errors unless robust (White) errors are used.` },
      { kind: 'callout', tone: 'history', title: 'Least squares', text: String.raw`Carl Friedrich Gauss used least squares for the asteroid Ceres in 1801; Adrien-Marie Legendre published the method in 1805. The Gauss–Markov theorem formalised its optimality in the early nineteenth century.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We fit the example with NumPy's least-squares solver and compare with the closed-form simple-regression formulas.` },
      { kind: 'code', language: 'python', code: String.raw`import numpy as np
x = np.array([1,2,3,4,5]); y = np.array([2,4,5,4,6])
X = np.column_stack([np.ones(5), x])
beta, *_ = np.linalg.lstsq(X, y, rcond=None)
print('OLS beta =', beta, ' target [1.8, 0.8]')
b1 = ((x-x.mean())*(y-y.mean())).sum()/((x-x.mean())**2).sum()
b0 = y.mean()-b1*x.mean()
print('closed form =', [b0,b1])
r = y-X@beta
print('RSS =', r@r, ' R^2 =', 1-(r@r)/(((y-y.mean())**2).sum()))`, caption: 'Numerical and analytic OLS agree exactly.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Econometrics:** estimating wage returns to education controlling for experience.`,
        String.raw`**Epidemiology:** dose–response relationships with covariates.`,
        String.raw`**Engineering:** calibrating sensor response curves.`,
        String.raw`**Marketing:** estimating advertising effect on sales while controlling for seasonality.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Correlation, causation, extrapolation', text: String.raw`A regression coefficient is a conditional association; causal interpretation needs additional design (randomisation, instrumental variables, or explicit causal assumptions). Predictions far outside the observed predictor range are unsupported extrapolation.` },
      { kind: 'list', items: [
        String.raw`High $R^2$ does not guarantee the model is correct or causal.`,
        String.raw`Including an intercept is essential unless the model genuinely forces the line through the origin.`,
        String.raw`Multicollinearity inflates standard errors even when predictions remain good.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Prove that the residuals sum to zero when an intercept is included.`,
        String.raw`Show that the hat matrix is idempotent and symmetric.`,
        String.raw`Explain why adding a irrelevant predictor cannot decrease $R^2$ but can harm prediction.`,
        String.raw`What breaks if $X$ has rank deficiency?`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`G. A. Seber and A. J. Lee, *Linear Regression Analysis*, 2nd ed.`,
        String.raw`T. Hastie, R. Tibshirani and J. Friedman, *The Elements of Statistical Learning*, Chapter 3.`,
        String.raw`J. J. Faraway, *Linear Models with R* — diagnostics and applications.`
      ] }
    ]
  },
  {
    id: 'groups',
    title: 'Groups',
    branchId: 'abstract-algebra',
    level: 'Undergraduate 2',
    summary: String.raw`A group is a set with an associative operation, an identity and inverses — the abstract structure common to symmetries, invertible matrices and modular arithmetic. From four axioms we derive cancellation, uniqueness of solutions and the order of an element, and we represent finite groups by multiplication tables.`,
    prerequisites: ['set-theory', 'functions-discrete', 'modular-arithmetic'],
    tags: ['symmetry', 'axioms', 'permutation', 'multiplication-table'],
    status: 'Complete',
    simulationIds: ['group-table'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`Integers under addition, permutations under composition and invertible matrices under multiplication share the same algebraic pattern. Isolating that pattern lets us prove once what holds for all of them and classify possible symmetry structures.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`A group captures reversible actions. Doing nothing is the identity; every action has an undo operation; and the order in which actions combine matters, but associativity lets us omit parentheses. Reversibility is the key idea — it is why monoids and semigroups are weaker structures.` },
      { kind: 'callout', tone: 'intuition', title: 'Symmetry as a group', text: String.raw`The symmetries of a square (rotations and reflections) form a group of order $8$: composing symmetries gives a symmetry, there is a do-nothing symmetry, and every symmetry can be undone.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`A finite group is displayed as a Cayley table (multiplication table): rows and columns are labelled by elements and the entry in row $a$, column $b$ is $ab$. Each row and column is a permutation of the group elements — a direct consequence of cancellation. Cycle diagrams show how repeated application of one element cycles through a subgroup.` },
      { kind: 'math', latex: String.raw`\begin{array}{c|ccc}\circ & e & r & r^2\\\hline e&e&r&r^2\\ r&r&r^2&e\\ r^2&r^2&e&r\end{array}\qquad\text{cyclic group }C_3`, display: true, caption: 'Cayley table of the rotation group of a triangle.' },
      { kind: 'callout', tone: 'visual', title: 'Latin square property', text: String.raw`In a group table no element repeats in a row or column. Conversely, a Latin square satisfying associativity (hard to check by eye) defines a group.` },
      { kind: 'sim', sim: 'group-table', caption: String.raw`Explore Cayley tables for small groups and test the axioms interactively.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`A **group** is a set $G$ with a binary operation $\cdot:G\times G\to G$ such that: (G1) closure (built into $\cdot$); (G2) associativity $(ab)c=a(bc)$; (G3) there is $e\in G$ with $eg=ge=g$; (G4) for every $g$ there is $g^{-1}$ with $gg^{-1}=g^{-1}g=e$. The group is **abelian** if $ab=ba$ for all $a,b$. Its **order** $|G|$ is the number of elements.` },
      { kind: 'math', latex: String.raw`$g^n=\underbrace{g\cdot g\cdots g}_{n},\quad g^0=e,\quad g^{-n}=(g^{-1})^n;\qquad \mathrm{ord}(g)=\min\{n\ge1:g^n=e\}$`, display: true, caption: 'Powers and the order of an element (if a minimum exists).' },
      { kind: 'table', headers: ['Group', 'Operation', 'Identity', 'Order', 'Abelian?'], rows: [
        [String.raw`$(\mathbb{Z},+)$`, String.raw`Addition`, String.raw`$0$`, String.raw`Infinite`, String.raw`Yes`],
        [String.raw`$S_n$`, String.raw`Composition`, String.raw`Identity permutation`, String.raw`$n!$`, String.raw`No for $n\ge3$`],
        [String.raw`$\mathrm{GL}_n(\mathbb{R})$`, String.raw`Matrix product`, String.raw`$I_n$`, String.raw`Infinite`, String.raw`No for $n\ge2$`],
        [String.raw`$(\mathbb{Z}/n\mathbb{Z},+)$`, String.raw`Addition mod $n$`, String.raw`$\bar0$`, String.raw`$n$`, String.raw`Yes`],
        [String.raw`$D_4$`, String.raw`Square symmetries`, String.raw`Identity map`, String.raw`$8$`, String.raw`No`]
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`Surprisingly much follows from the axioms alone. We prove the cancellation laws, uniqueness of identity and inverses, and the order-of-a-product inverse formula.` },
      { kind: 'steps', title: 'Elementary consequences of the axioms', items: [
        { title: 'Uniqueness of the identity', text: String.raw`If $e$ and $e'$ both satisfy (G3), then $e=e e'=e'$ (using $e'$ as a right identity for $e$ and $e$ as a left identity for $e'$).`, math: String.raw`$e=ee'=e'.$` },
        { title: 'Uniqueness of inverses', text: String.raw`If $h$ and $h'$ are both inverses of $g$, then $h=he=h(gh')=(hg)h'=eh'=h'$.`, math: String.raw`$h=h'.$` },
        { title: 'Left cancellation', text: String.raw`If $ab=ac$, multiply on the left by $a^{-1}$: $(a^{-1}a)b=(a^{-1}a)c$, hence $b=c$. Right cancellation is analogous.`, math: String.raw`$ab=ac\Rightarrow b=c.$` },
        { title: 'Inverse of a product', text: String.raw`Compute $(ab)(b^{-1}a^{-1})=a(bb^{-1})a^{-1}=aa^{-1}=e$; uniqueness gives the formula. Note the reversal of order.`, math: String.raw`$(ab)^{-1}=b^{-1}a^{-1}.$` },
        { title: 'Order of powers', text: String.raw`If $\mathrm{ord}(g)=m$ then $g^k=e$ iff $m\mid k$ (write $k=qm+r$ with $0\le r<m$; then $g^r=e$ forces $r=0$ by minimality).`, math: String.raw`$g^k=e\iff \mathrm{ord}(g)\mid k.$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — permutations.** In $S_3$, let $\sigma=(1\,2\,3)$. Then $\sigma^2=(1\,3\,2)$ and $\sigma^3=e$, so $\mathrm{ord}(\sigma)=3$. Let $\tau=(1\,2)$; $\tau^2=e$ so $\mathrm{ord}(\tau)=2$. With the convention "apply the right factor first", $\sigma\tau=(1\,2\,3)(1\,2)=(1\,3)$, while $\tau\sigma=(1\,2)(1\,2\,3)=(2\,3)$ — the group is nonabelian.` },
      { kind: 'paragraph', text: String.raw`**Example 2 — modular arithmetic.** In $(\mathbb{Z}/7\mathbb{Z})^\times=\{1,2,3,4,5,6\}$ under multiplication mod 7, $3^1=3$, $3^2=2$, $3^3=6$, $3^6=1$, so $\mathrm{ord}(3)=6$ and this group is cyclic generated by $3$. The inverse of $3$ is $5$ because $3\cdot5=15\equiv1\pmod 7.$` },
      { kind: 'math', latex: String.raw`$\sigma=(1\,2\,3):\quad \sigma^2=(1\,3\,2),\quad \sigma^3=e;\qquad 3^6\equiv1\pmod7,\quad 3^{-1}\equiv5\pmod7.$`, display: true, caption: 'Element orders in $S_3$ and $(\mathbb{Z}/7\mathbb{Z})^\times$.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Cayley's theorem.** Every group $G$ is isomorphic to a subgroup of the symmetric group on $G$: the map $g\mapsto L_g$, $L_g(x)=gx$, is an injective homomorphism because $L_{gh}=L_g\circ L_h$ and $L_g=L_e$ implies $g=e$. **Lagrange's theorem.** If $H\le G$ is a subgroup of a finite group, $|H|$ divides $|G|$ (proved under subgroups).** finitely generated abelian groups** decompose as $\mathbb{Z}^r\times\mathbb{Z}/n_1\times\cdots$ — the structure theorem, a classification result rather than a single elementary identity.` },
      { kind: 'callout', tone: 'history', title: 'Abstract groups', text: String.raw`Arthur Cayley defined abstract groups in 1854; Augustin-Louis Cauchy and Camille Jordan systematised permutation groups, and Felix Klein's 1872 Erlangen programme proposed classifying geometries by their symmetry groups.Évariste Galois' 1832 work implicitly used groups to study polynomial equations.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We verify the group axioms computationally for a small permutation set and compute element orders with SymPy.` },
      { kind: 'code', language: 'python', code: String.raw`from sympy.combinatorics import Permutation, PermutationGroup
from sympy.combinatorics.named_groups import SymmetricGroup
G = SymmetricGroup(3)
print('order S3 =', G.order())
s = Permutation(0,1,2)
print('powers of (0 1 2):', [s**k for k in range(4)])
print('order of 3-cycle =', PermutationGroup([s]).order())
t = Permutation(0,1)
print('st*s == t*s?', (s*t) == (t*s), '(nonabelian check)')
print('closure of {e,s,s^2}:', [Permutation(2)(0,1,2)**k for k in range(3)])`, caption: 'SymPy confirms composition order and element orders.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Crystallography:** the 230 space groups classify crystal symmetries.`,
        String.raw`**Cryptography:** group operations underpin Diffie–Hellman and elliptic-curve cryptography.`,
        String.raw`**Chemistry:** molecular point groups determine spectroscopic selection rules.`,
        String.raw`**Physics:** conserved quantities correspond to symmetry groups via Noether's theorem.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Order matters', text: String.raw`In a nonabelian group $(ab)^2\ne a^2b^2$ in general; the correct formula is $abab$. Likewise $(ab)^{-1}=b^{-1}a^{-1}$, not $a^{-1}b^{-1}$. Always verify commutativity before rearranging.` },
      { kind: 'list', items: [
        String.raw`Closure is not automatic for a subset of a group — that is the subgroup question.`,
        String.raw`A group operation need not be addition or multiplication; notation is conventional.`,
        String.raw`Finite does not mean abelian: $S_3$ has order $6$ and is nonabelian.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Prove that a group in which every element satisfies $g^2=e$ is abelian.`,
        String.raw`Show that the symmetries of a rectangle form a group of order 4 and identify it.`,
        String.raw`Why does Cayley's theorem reduce the study of finite groups to permutation groups?`,
        String.raw`Find a monoid that is not a group and explain which axiom fails.`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`J. J. Rotman, *An Introduction to the Theory of Groups*, 4th ed.`,
        String.raw`D. S. Dummit and R. M. Foote, *Abstract Algebra*, Chapters 1–3.`,
        String.raw`N. Carter, *Visual Group Theory* — an illustrated approach to Cayley diagrams.`
      ] }
    ]
  },
  {
    id: 'subgroups',
    title: 'Subgroups',
    branchId: 'abstract-algebra',
    level: 'Undergraduate 2',
    summary: String.raw`A subgroup is a subset of a group that is itself a group under the same operation; the one-step subgroup test reduces this to closure under $ab^{-1}$. Cosets partition a finite group into equal-sized blocks, which yields Lagrange's theorem that subgroup orders divide the group order.`,
    prerequisites: ['groups'],
    tags: ['subgroup-test', 'cosets', 'lagrange', 'index'],
    status: 'Complete',
    derivationIds: ['p3-der-lagrange'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`Given a group, we want to find smaller groups inside it — rotations inside square symmetries, even integers inside all integers, matrices with determinant one inside invertible matrices — and to understand how the larger group is built from these pieces.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`A subgroup is a self-contained reversible subsystem. If you start inside it and combine elements (or undo them), you never leave it. Cosets are translated copies of the subgroup; like parallel tiles they fill the group without overlap.` },
      { kind: 'callout', tone: 'intuition', title: 'Cosets as translations', text: String.raw`In an additive group, the coset $a+H=\{a+h:h\in H\}$ is simply the set $H$ shifted by $a$. All cosets have the same size as $H$, and any two are either identical or disjoint.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`Picture $H=\{0,4,8\}$ inside $\mathbb{Z}/12$ as three equally spaced points on a clock face with 12 hours. Adding 1 rotates the whole set to $\{1,5,9\}$; adding 2 gives $\{2,6,10\}$; adding 3 gives $\{3,7,11\}$. Four rotated copies tile the clock — the index is $4$ and $4\cdot3=12.$` },
      { kind: 'math', latex: String.raw`$\mathbb{Z}/12 = \{0,4,8\}\ \uplus\ \{1,5,9\}\ \uplus\ \{2,6,10\}\ \uplus\ \{3,7,11\}$`, display: true, caption: 'Four cosets of a subgroup of order 3.' },
      { kind: 'callout', tone: 'visual', title: 'Index', text: String.raw`The number of distinct cosets is the **index** $[G:H]$. For finite groups Lagrange's theorem gives $[G:H]=|G|/|H|.$` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`$H\subseteq G$ is a **subgroup**, written $H\le G$, if $H$ with the restricted operation is a group. Equivalently (one-step test): $H\ne\varnothing$ and for all $a,b\in H$, $ab^{-1}\in H$. For finite $H$ it suffices that $H\ne\varnothing$ and $H$ is closed under multiplication. Left and right cosets are $gH=\{gh:h\in H\}$ and $Hg=\{hg:h\in H\}$.` },
      { kind: 'math', latex: String.raw`$H\le G\iff \varnothing\ne H\subseteq G\ \text{and}\ \forall a,b\in H:\ ab^{-1}\in H$`, display: true },
      { kind: 'list', items: [
        String.raw`Every subgroup contains the identity $e$ (take $a=b$ in the one-step test).`,
        String.raw`$H\le G$ and $K\le H$ implies $K\le G$ (transitivity).`,
        String.raw`The intersection of any family of subgroups is a subgroup.`,
        String.raw`For any $g\in G$, $\langle g\rangle=\{g^n:n\in\mathbb{Z}\}$ is the cyclic subgroup generated by $g$.`
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`We prove the subgroup test, then the partition property of cosets and Lagrange's theorem (full derivation in p3-der-lagrange).` },
      { kind: 'steps', title: 'Subgroup criterion and coset partition', items: [
        { title: 'One-step test', text: String.raw`If $H$ is a subgroup then $b^{-1}\in H$ and $ab^{-1}\in H$ by closure. Conversely, assume the test: with $a=b$ we get $e\in H$; with $a=e$ we get $b^{-1}\in H$; with $b$ replaced by $b^{-1}$ we get $ab\in H$. All four axioms hold.`, math: String.raw`$a=b\Rightarrow e\in H;\quad a=e\Rightarrow b^{-1}\in H;\quad ab\in H.$` },
        { title: 'Cosets are equal or disjoint', text: String.raw`If $aH\cap bH\ne\varnothing$, say $ah_1=bh_2$, then $a=bh_2h_1^{-1}\in bH$, so $aH\subseteq bH$; symmetrically $bH\subseteq aH$.`, math: String.raw`$aH\cap bH\ne\varnothing\Rightarrow aH=bH.$` },
        { title: 'Cosets cover $G$', text: String.raw`Every $g\in G$ lies in $gH$ because $e\in H$. Hence the distinct left cosets partition $G$.`, math: String.raw`$G=\biguplus_{g\in R} gH$ for a set $R$ of coset representatives.` },
        { title: 'Equal size', text: String.raw`The map $h\mapsto gh$ is a bijection $H\to gH$ (inverse $x\mapsto g^{-1}x$), so $|gH|=|H|$.`, math: String.raw`$|gH|=|H|.$` },
        { title: 'Lagrange', text: String.raw`With $[G:H]$ cosets each of size $|H|$, the partition gives $|G|=[G:H]\,|H|$, so $|H|$ divides $|G|$.`, math: String.raw`$|G|=[G:H]\cdot|H|.$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — additive subgroup of $\mathbb{Z}/12$.** $H=\{0,4,8\}$ is closed: $4+4=8$, $4+8=0$, $8+8=4$ (mod 12), and contains inverses. $|H|=3$, $|G|=12$, index $=4$, and indeed $3\mid12$.` },
      { kind: 'paragraph', text: String.raw`**Example 2 — alternating group.** $A_n$ (even permutations) is a subgroup of $S_n$: the parity map $\operatorname{sgn}:S_n\to\{\pm1\}$ is a homomorphism and $A_n=\ker(\operatorname{sgn})$. For $n=3$, $|A_3|=3$ and $|S_3|=6$, index $2$. Every subgroup of index $2$ is normal — a fact used in quotient groups.` },
      { kind: 'math', latex: String.raw`$[\mathbb{Z}/12:\{0,4,8\}]=4,\qquad [S_3:A_3]=2,\qquad |A_3|=3.$`, display: true, caption: 'Orders and indices in the two examples.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Lagrange's theorem.** If $G$ is finite and $H\le G$, then $|H|$ divides $|G|$. Consequences: the order of any element $g$ divides $|G|$ (apply it to $\langle g\rangle$), so $g^{|G|}=e$; a group of prime order $p$ is cyclic (any non-identity element has order $p$). **Caution:** the converse of Lagrange is false: $A_4$ has order 12 but no subgroup of order 6. **Sylow's theorems** provide partial converses for prime-power orders.` },
      { kind: 'callout', tone: 'history', title: 'Lagrange and beyond', text: String.raw`Joseph-Louis Lagrange proved the divisibility result in 1771 for permutation groups. The general formulation for abstract finite groups came in the nineteenth century; Sylow's 1872 theorems supply the deep partial converse.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We enumerate subgroups of $\mathbb{Z}/12$ by brute force and verify Lagrange's divisibility for each.` },
      { kind: 'code', language: 'python', code: String.raw`from itertools import combinations
n = 12
G = set(range(n))
subs = set()
for r in range(1, n+1):
    for cand in combinations(range(n), r):
        H = set(cand)
        if 0 in H and all((a-b) % n in H for a in H for b in H):
            subs.add(frozenset(H))
for H in sorted(subs, key=len):
    print(sorted(H), '|H| =', len(H), 'index =', n//len(H), 'divides?', n % len(H) == 0)
print('total subgroups found =', len(subs))`, caption: 'Brute-force subgroup enumeration for Z/12.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Crystallography:** point groups contain rotation subgroups; their indices constrain allowed crystal symmetries.`,
        String.raw`**Coding theory:** cyclic codes are ideals (hence additive subgroups) of polynomial quotient rings.`,
        String.raw`**Cryptography:** subgroup order determines the security of Diffie–Hellman groups.`,
        String.raw`**Chemistry:** subgroups of molecular symmetry groups classify equivalent atoms.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'The converse fails', text: String.raw`Do not claim that every divisor of $|G|$ is the order of a subgroup: $A_4$ (order 12) has no subgroup of order 6. Likewise, $gH=Hg$ need not hold unless $H$ is normal — left and right cosets can differ.` },
      { kind: 'list', items: [
        String.raw`Closure under multiplication alone suffices only for *finite* nonempty subsets.`,
        String.raw`The identity of a subgroup must be the identity of the whole group.`,
        String.raw`Index is a count of cosets, not of elements left over.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Prove that a group of prime order is cyclic.`,
        String.raw`Find all subgroups of $S_3$ and their indices.`,
        String.raw`Give an example showing the converse of Lagrange is false.`,
        String.raw`Prove that the intersection of two subgroups is a subgroup.`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`D. S. Dummit and R. M. Foote, *Abstract Algebra*, Chapter 3.`,
        String.raw`J. J. Rotman, *An Introduction to the Theory of Groups*, Chapter 2.`,
        String.raw`N. Carter, *Visual Group Theory*, Chapters 4–6 — cosets and quotient pictures.`
      ] }
    ]
  },
  {
    id: 'quotient-groups',
    title: 'Quotient Groups',
    branchId: 'abstract-algebra',
    level: 'Undergraduate 3',
    summary: String.raw`A normal subgroup allows cosets to inherit a group operation, producing the quotient group $G/N$. The first isomorphism theorem identifies every quotient with the image of a homomorphism, making kernels and quotients the two sides of the same construction.`,
    prerequisites: ['groups', 'subgroups', 'group-homomorphisms'],
    tags: ['normal-subgroup', 'coset-multiplication', 'isomorphism-theorem', 'kernel'],
    status: 'Complete',
    derivationIds: ['p3-der-first-iso'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`We often want to ignore a substructure: consider integers modulo $n$, or permutations up to parity. Quotient groups formalise "modding out" by a normal subgroup and explain why the resulting set inherits a consistent algebraic structure.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`Collapse each coset of $N$ to a single point. Multiplication of the resulting points is well-defined precisely when $N$ is normal: shifting representatives by elements of $N$ must not change the coset of the product.` },
      { kind: 'callout', tone: 'intuition', title: 'Normality as compatibility', text: String.raw`$N\trianglelefteq G$ means $gN=Ng$ for all $g$. In additive notation this is automatic for abelian groups, which is why quotient groups feel natural for $\mathbb{Z}/n\mathbb{Z}$ but require care for $S_n$.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`Imagine tiling $G$ by cosets of $N$ and then shrinking each tile to a point. The multiplication of tiles is well-defined when the tiling is invariant under left and right translation — the geometric content of normality. For $\mathbb{Z}/6$ with $N=\{0,3\}$, the six numbers collapse into three pairs.` },
      { kind: 'math', latex: String.raw`$\mathbb{Z}/6=\{0,3\}\uplus\{1,4\}\uplus\{2,5\}\ \longrightarrow\ (\mathbb{Z}/6)/N\cong\mathbb{Z}/3$`, display: true, caption: 'Collapsing cosets produces a smaller cyclic group.' },
      { kind: 'callout', tone: 'visual', title: 'Quotient as a projection', text: String.raw`The natural map $\pi:G\to G/N$, $\pi(g)=gN$, is a surjective homomorphism with kernel $N$. Every homomorphism factors through such a projection — the content of the first isomorphism theorem.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`$N\le G$ is **normal**, $N\trianglelefteq G$, if $gNg^{-1}=N$ for all $g\in G$. For such $N$, define $G/N=\{gN:g\in G\}$ with $(aN)(bN)=(ab)N$. The identity is $N$ and $(gN)^{-1}=g^{-1}N$.` },
      { kind: 'math', latex: String.raw`$aN=bN\iff a^{-1}b\in N,\qquad (aN)(bN)=(ab)N,\qquad |G/N|=[G:N]$`, display: true, caption: 'Coset equality, multiplication, and order (finite case).' },
      { kind: 'list', items: [
        String.raw`Every subgroup of an abelian group is normal.`,
        String.raw`The kernel of any homomorphism is normal; conversely every normal subgroup is a kernel (of the quotient map).`,
        String.raw`Subgroups of index $2$ are always normal.`,
        String.raw`$N\trianglelefteq G$ does **not** imply $G/N$ is abelian; abelianness requires $[G,G]\subseteq N$.`
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`We verify that coset multiplication is well-defined exactly when $N$ is normal, then derive the first isomorphism theorem.` },
      { kind: 'steps', title: 'Why normality is exactly the right condition', items: [
        { title: 'Change representatives', text: String.raw`Suppose $aN=a'N$ and $bN=b'N$, so $a'=an_1$, $b'=bn_2$ with $n_i\in N$. We need $a'b'\in abN$.`, math: String.raw`$a'b'=a n_1 b n_2.$` },
        { title: 'The obstruction', text: String.raw`We must move $n_1$ past $b$: $n_1 b=b(b^{-1}n_1 b)$. This requires $b^{-1}n_1b\in N$, i.e. $b^{-1}Nb\subseteq N$ for all $b$.`, math: String.raw`$a n_1 b=a b\,(b^{-1}n_1 b)\in abN.$` },
        { title: 'Normality closes the argument', text: String.raw`If $N\trianglelefteq G$ then $b^{-1}Nb=N$, so the product stays in $abN$ and multiplication is well-defined. Conversely, well-definedness forces $b^{-1}Nb\subseteq N$ and applying it to $b^{-1}$ gives equality.`, math: String.raw`$(aN)(bN)=abN\ \text{well-defined}\iff N\trianglelefteq G.$` },
        { title: 'First isomorphism theorem', text: String.raw`For a homomorphism $\varphi:G\to H$, the map $\bar\varphi:G/\ker\varphi\to\operatorname{im}\varphi$, $\bar\varphi(g\ker\varphi)=\varphi(g)$, is well-defined (same coset ⇒ same image), injective (equal images ⇒ difference in kernel) and surjective by definition of image.`, math: String.raw`$G/\ker\varphi\ \cong\ \operatorname{im}\varphi.$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — mod 6.** Let $G=\mathbb{Z}/6$, $N=\{0,3\}\cong\mathbb{Z}/2$. The cosets are $\{0,3\},\{1,4\},\{2,5\}$; adding cosets gives $\{1,4\}+\{2,5\}=\{0,3\}$, matching $1+2=3$ in $\mathbb{Z}/3$. By Lagrange $|G/N|=6/2=3$, and the quotient is cyclic.` },
      { kind: 'paragraph', text: String.raw`**Example 2 — sign homomorphism.** $\operatorname{sgn}:S_3\to\{\pm1\}$ is surjective with kernel $A_3=\{e,(1\,2\,3),(1\,3\,2)\}$, which is normal. The first isomorphism theorem gives $S_3/A_3\cong\{\pm1\}\cong C_2.$` },
      { kind: 'math', latex: String.raw`$(\mathbb{Z}/6)/\{0,3\}\cong\mathbb{Z}/3,\qquad S_3/A_3\cong C_2,\qquad \mathrm{GL}_n(\mathbb{R})/\mathrm{SL}_n(\mathbb{R})\cong\mathbb{R}^\times.$`, display: true, caption: 'Three quotients via the first isomorphism theorem.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Second isomorphism theorem.** If $H\le G$ and $N\trianglelefteq G$, then $HN\le G$, $H\cap N\trianglelefteq H$ and $HN/N\cong H/(H\cap N)$. **Third (lattice) isomorphism theorem.** If $N\trianglelefteq G$ and $N\subseteq H\le G$, then $H/N\le G/N$ and $(G/N)/(H/N)\cong G/H$. These follow by applying the first theorem to natural homomorphisms and checking kernels.` },
      { kind: 'callout', tone: 'history', title: 'Kernels and ideals', text: String.raw`The quotient construction for groups parallels quotient rings by ideals (Richard Dedekind's contribution) and quotient vector spaces. The first isomorphism theorem in its modern form appeared in the early twentieth century, unifying these examples.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We build the quotient of $\mathbb{Z}/6$ by $\{0,3\}$ explicitly and verify that coset addition matches addition in $\mathbb{Z}/3$.` },
      { kind: 'code', language: 'python', code: String.raw`n, N = 6, {0,3}
cosets = []
seen = set()
for a in range(n):
    if a in seen: continue
    C = frozenset((a+x)%n for x in N)
    cosets.append(C); seen |= C
print('cosets:', [sorted(c) for c in cosets])
def coset_of(x):
    return next(i for i,c in enumerate(cosets) if x in c)
print('quotient addition table:')
for i,a in enumerate(cosets):
    rep_a = next(iter(a))
    print([coset_of((rep_a+next(iter(b)))%n) for b in cosets])
print('expected Z/3 table: [[0,1,2],[1,2,0],[2,0,1]]')`, caption: 'Explicit coset arithmetic reproduces Z/3.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Cryptography:** quotient groups underlie public-key cryptosystems based on hard subgroup-decision problems.`,
        String.raw`**Coding theory:** syndrome decoding works in a quotient of the ambient vector space by the code.`,
        String.raw`**Physics:** gauge theories quotient the configuration space by gauge transformations.`,
        String.raw`**Signal processing:** phase information lives in a quotient $\mathbb{R}/2\pi\mathbb{Z}$.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Check normality first', text: String.raw`Coset multiplication on $G/H$ is well-defined only for normal $H$. For a non-normal subgroup (e.g. $H=\langle(1\,2)\rangle\le S_3$), the set of left cosets does not inherit a group operation.` },
      { kind: 'list', items: [
        String.raw`The quotient $G/N$ is a group of cosets, not a subgroup of $G$.`,
        String.raw`$G/N$ abelian does not require $G$ abelian — e.g. $S_3/A_3\cong C_2.$`,
        String.raw`The kernel of a homomorphism is always normal; the image need not be normal in the codomain.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Prove that every subgroup of index 2 is normal.`,
        String.raw`Show that $G/Z(G)$ cyclic implies $G$ is abelian.`,
        String.raw`Why is the map $gN\mapsto\varphi(g)$ well-defined in the first isomorphism theorem?`,
        String.raw`Find a non-normal subgroup of $S_3$ and show coset multiplication fails.`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`D. S. Dummit and R. M. Foote, *Abstract Algebra*, Chapter 3, §§3.1–3.3.`,
        String.raw`J. J. Rotman, *An Introduction to the Theory of Groups*, Chapter 4.`,
        String.raw`N. Carter, *Visual Group Theory*, Chapters 11–12 — quotient groups visually.`
      ] }
    ]
  },
  {
    id: 'rings',
    title: 'Rings',
    branchId: 'abstract-algebra',
    level: 'Undergraduate 3',
    summary: String.raw`A ring carries two compatible operations: an abelian group under addition and an associative, distributive multiplication. Commutative rings, integral domains, ideals and quotient rings mirror the group-theoretic hierarchy and provide the setting for number theory and algebraic geometry.`,
    prerequisites: ['groups', 'modular-arithmetic', 'polynomials-basics'],
    tags: ['ring-axioms', 'ideal', 'integral-domain', 'characteristic'],
    status: 'Complete',
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`Integers, polynomials and matrices all admit addition and multiplication with distributivity, but they differ in commutativity and inverses. Ring theory isolates the common pattern, then classifies the extra properties needed for factoring, divisibility and quotient constructions.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`A ring is an additive group with a multiplication that distributes over addition. Unlike a field, multiplication need not be commutative or invertible: $\mathbb{Z}$ has no multiplicative inverses, and matrices need not commute. Ideals play the role of normal subgroups, allowing well-defined quotients.` },
      { kind: 'callout', tone: 'intuition', title: 'Why ideals?', text: String.raw`To multiply cosets $a+I$ and $b+I$ we need $ab+I$ independent of representatives, which requires $aI\subseteq I$ and $Ib\subseteq I$. This absorption property is exactly what makes an ideal an ideal.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`Think of $\mathbb{Z}$ as an infinite line and an ideal $n\mathbb{Z}$ as a regularly spaced lattice. The quotient $\mathbb{Z}/n\mathbb{Z}$ wraps the line onto a circle of $n$ points. In $\mathbb{Z}/6$, the zero divisors $2$ and $3$ are visible as non-zero elements whose product wraps to $0$.` },
      { kind: 'math', latex: String.raw`$2\cdot3=6\equiv0\pmod6,\qquad 2\not\equiv0,\quad3\not\equiv0\quad\Longrightarrow\quad\mathbb{Z}/6\text{ has zero divisors.}$`, display: true, caption: 'Zero divisors in a composite modulus.' },
      { kind: 'callout', tone: 'visual', title: 'Field versus ring', text: String.raw`In $\mathbb{Z}/5$ every nonzero element has an inverse ($2^{-1}=3$, $3^{-1}=2$, $4^{-1}=4$), so it is a field. In $\mathbb{Z}/6$ the elements $2,3,4$ are not invertible — the modulus is prime exactly when $\mathbb{Z}/n\mathbb{Z}$ is a field.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`A **ring** $(R,+,\cdot)$ is an abelian group $(R,+)$ with identity $0$, an associative multiplication with identity $1$ (we use *unital* rings), and distributivity $a(b+c)=ab+ac$, $(a+b)c=ac+bc$. It is **commutative** if $ab=ba$. A nonzero $a$ is a **zero divisor** if $ab=0$ for some nonzero $b$. An **integral domain** is a commutative unital ring with $1\ne0$ and no zero divisors. An **ideal** $I\subseteq R$ is an additive subgroup with $rI\subseteq I$ and $Ir\subseteq I$ for all $r$.` },
      { kind: 'math', latex: String.raw`$a(b+c)=ab+ac,\quad (ab)c=a(bc),\quad I\trianglelefteq R\iff I\le(R,+)\ \text{and}\ RI,IR\subseteq I$`, display: true },
      { kind: 'table', headers: ['Ring', 'Commutative?', 'Unital?', 'Integral domain?', 'Field?'], rows: [
        [String.raw`$\mathbb{Z}$`, String.raw`Yes`, String.raw`Yes`, String.raw`Yes`, String.raw`No`],
        [String.raw`$\mathbb{Z}/n\mathbb{Z}$`, String.raw`Yes`, String.raw`Yes`, String.raw`iff $n$ prime`, String.raw`iff $n$ prime`],
        [String.raw`$M_n(\mathbb{R})$`, String.raw`No ($n\ge2$)`, String.raw`Yes`, String.raw`No`, String.raw`No`],
        [String.raw`$\mathbb{R}[x]$`, String.raw`Yes`, String.raw`Yes`, String.raw`Yes`, String.raw`No`],
        [String.raw`$2\mathbb{Z}$`, String.raw`Yes`, String.raw`No`, String.raw`—`, String.raw`No`]
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`We derive basic ring identities and the possible characteristics of an integral domain.` },
      { kind: 'steps', title: 'Ring consequences and characteristic', items: [
        { title: 'Zero absorbs', text: String.raw`From $a\cdot0=a(0+0)=a0+a0$, cancel $a0$ in the additive group to get $a0=0$.`, math: String.raw`$a\cdot0=0.$` },
        { title: 'Additive inverses of products', text: String.raw`$(-a)b=-(ab)$ follows from $ab+(-a)b=(a+(-a))b=0b=0$; similarly $a(-b)=-(ab)$.`, math: String.raw`$(-a)b=a(-b)=-(ab)$` },
        { title: 'Define the characteristic', text: String.raw`Let $\operatorname{char}(R)$ be the least $n>0$ with $n\cdot1=0$, or $0$ if none exists. The map $k\mapsto k\cdot1$ is a ring homomorphism from $\mathbb{Z}$ into $R$.`, math: String.raw`$\mathbb{Z}\longrightarrow R,\qquad k\longmapsto k\cdot1.$` },
        { title: 'Characteristic of a domain', text: String.raw`If $\operatorname{char}(R)=n=ab$ with $1<a,b<n$, then $(a\cdot1)(b\cdot1)=n\cdot1=0$, contradicting the absence of zero divisors. Hence $n$ is prime (or $0$).`, math: String.raw`$R\ \text{integral domain}\Rightarrow \operatorname{char}(R)=0\ \text{or prime}.$` },
        { title: 'Quotient rings', text: String.raw`For an ideal $I$, define $(a+I)+(b+I)=(a+b)+I$ and $(a+I)(b+I)=ab+I$; well-definedness uses $aI,Ib\subseteq I$.`, math: String.raw`$R/I\ \text{is a ring}.$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — $\mathbb{Z}/6$.** The nonzero elements are $\{1,2,3,4,5\}$. We have $2\cdot3=0$, $3\cdot4=0$, $2\cdot4=2$, so $2,3,4$ are zero divisors and only $1,5$ are units ($5^2=25\equiv1$). Hence $\mathbb{Z}/6$ is not a field.` },
      { kind: 'paragraph', text: String.raw`**Example 2 — $\mathbb{Z}/5$.** $2\cdot3=6\equiv1$, so $2^{-1}=3$; $4\cdot4=16\equiv1$, so $4^{-1}=4$. Every nonzero element is invertible, so $\mathbb{Z}/5$ is a field of characteristic 5.` },
      { kind: 'math', latex: String.raw`$(\mathbb{Z}/6)^\times=\{1,5\},\qquad (\mathbb{Z}/5)^\times=\{1,2,3,4\}=\mathbb{Z}/5\setminus\{0\}.$`, display: true, caption: 'Units in composite versus prime modulus.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Chinese remainder theorem (ring form).** If $m,n$ are coprime, $\mathbb{Z}/mn\mathbb{Z}\cong\mathbb{Z}/m\mathbb{Z}\times\mathbb{Z}/n\mathbb{Z}$ via $x\mapsto(x\bmod m,x\bmod n)$. The kernel is $mn\mathbb{Z}$ and surjectivity follows from Bézout's identity. **Ideal correspondence.** Ideals of $R/I$ correspond to ideals of $R$ containing $I$; this is the ring analogue of the lattice isomorphism theorem for groups.` },
      { kind: 'callout', tone: 'history', title: 'Rings and ideals', text: String.raw`The term "ring" (Zahlring) was introduced by David Hilbert; Ernst Steinitz and Emmy Noether developed the abstract theory in the 1910s. Noether's formulation of ideals as primary objects revolutionised algebra and underpins modern algebraic geometry.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We compute unit groups and zero divisors for small moduli and verify the characteristic.` },
      { kind: 'code', language: 'python', code: String.raw`for n in (5,6,8,9,11):
    units = [a for a in range(1,n) if any((a*b)%n==1 for b in range(1,n))]
    zero_div = [a for a in range(1,n) if any((a*b)%n==0 for b in range(1,n))]
    print(f'Z/{n}: units={units}, zero divisors={zero_div}, field={len(units)==n-1}')`, caption: 'Prime moduli give fields; composite moduli give zero divisors.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Cryptography:** RSA works in $\mathbb{Z}/n\mathbb{Z}$ with $n$ composite; units and Euler's theorem give the decryption exponent.`,
        String.raw`**Coding theory:** cyclic codes are ideals in $\mathbb{F}_q[x]/(x^n-1)$.`,
        String.raw`**Computer algebra:** Gröbner bases are computed in polynomial rings over fields.`,
        String.raw`**Number theory:** unique factorisation in rings of integers is central to algebraic number theory.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Conventions vary', text: String.raw`Some authors do not require a multiplicative identity (rings vs. rngs), and some allow $1=0$ (the zero ring). Always state your convention. Also, an integral domain must be commutative in the standard definition; noncommutative analogues are called domains.` },
      { kind: 'list', items: [
        String.raw`A nonzero element in a ring need not be a unit or a zero divisor (e.g. $2\in\mathbb{Z}$).`,
        String.raw`$\mathbb{Z}[x]$ is an integral domain but not a field: $x$ has no inverse.`,
        String.raw`Ideals are additive subgroups, not generally multiplicative subgroups.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Prove that $\mathbb{Z}/n\mathbb{Z}$ is a field iff $n$ is prime.`,
        String.raw`Show that $a$ is a zero divisor in $\mathbb{Z}/n$ iff $\gcd(a,n)>1$.`,
        String.raw`Why must the characteristic of an integral domain be prime or zero?`,
        String.raw`Verify the ideal absorption property for $n\mathbb{Z}\subseteq\mathbb{Z}$.`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`D. S. Dummit and R. M. Foote, *Abstract Algebra*, Chapters 7–9.`,
        String.raw`I. N. Herstein, *Topics in Algebra*, Chapter 3 — rings and ideals.`,
        String.raw`M. Atiyah and I. G. Macdonald, *Introduction to Commutative Algebra*, Chapter 1.`
      ] }
    ]
  },
  {
    id: 'fields',
    title: 'Fields',
    branchId: 'abstract-algebra',
    level: 'Undergraduate 3',
    summary: String.raw`A field is a commutative ring in which every nonzero element is invertible, so division works exactly as in the rationals. Prime fields, finite fields and algebraic extensions such as $\mathbb{Q}(\sqrt2)$ illustrate how fields stratify by characteristic and extension degree.`,
    prerequisites: ['rings', 'polynomial-rings', 'vector-spaces'],
    tags: ['division', 'finite-fields', 'field-extension', 'characteristic'],
    status: 'Complete',
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`Solving polynomial equations requires a setting where division is always possible. Fields provide that setting, and field extensions explain how adjoining a root (like $\sqrt2$ or $i$) enlarges the number system in a controlled way.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`A field is a ring with maximal algebraic convenience: you can add, subtract, multiply and divide by anything nonzero. Every field contains a copy of $\mathbb{Q}$ or of $\mathbb{F}_p$ — its prime field — and larger fields are vector spaces over that base.` },
      { kind: 'callout', tone: 'intuition', title: 'Extension degree', text: String.raw`If $L\supseteq K$ are fields, $L$ is a $K$-vector space; its dimension $[L:K]$ is the **degree**. $\mathbb{C}$ is a 2-dimensional $\mathbb{R}$-vector space, so $[\mathbb{C}:\mathbb{R}]=2.$` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`Draw field extensions as a tower: $\mathbb{Q}\subset\mathbb{Q}(\sqrt2)\subset\mathbb{Q}(\sqrt2,i)$. Each step has a degree, and degrees multiply in towers: $[L:K]=[L:M][M:K]$. Adjoining $\sqrt2$ adds one basis direction ($1,\sqrt2$); adjoining $i$ on top doubles it again.` },
      { kind: 'math', latex: String.raw`$\mathbb{Q}\ \subset\ \mathbb{Q}(\sqrt2)\ \subset\ \mathbb{Q}(\sqrt2,i),\qquad [\mathbb{Q}(\sqrt2):\mathbb{Q}]=2,\quad [\mathbb{Q}(\sqrt2,i):\mathbb{Q}]=4$`, display: true, caption: 'A tower of fields with multiplicative degrees.' },
      { kind: 'callout', tone: 'visual', title: 'Finite fields', text: String.raw`For each prime power $q=p^n$ there is a finite field $\mathbb{F}_q$, unique up to isomorphism. Its multiplicative group $\mathbb{F}_q^\times$ is cyclic of order $q-1$ — a striking structure theorem.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`A **field** $F$ is a commutative unital ring with $1\ne0$ in which every $a\ne0$ has $a^{-1}\in F$ with $aa^{-1}=1$. Subfields, extensions $L/K$, the degree $[L:K]$, algebraic and transcendental elements are defined in the expected way. The **prime field** is the smallest subfield: $\mathbb{Q}$ in characteristic $0$, $\mathbb{F}_p$ in characteristic $p$.` },
      { kind: 'math', latex: String.raw`$F^\times=F\setminus\{0\}\ \text{is an abelian group under multiplication};\qquad \mathbb{F}_p^\times\cong C_{p-1}.$`, display: true },
      { kind: 'table', headers: ['Field', 'Characteristic', 'Degree over prime field', 'Notes'], rows: [
        [String.raw`$\mathbb{Q}$`, String.raw`$0$`, String.raw`$1$`, String.raw`Prime field of char 0`],
        [String.raw`$\mathbb{R}$`, String.raw`$0$`, String.raw`Infinite`, String.raw`Ordered, complete`],
        [String.raw`$\mathbb{C}$`, String.raw`$0$`, String.raw`$2$ over $\mathbb{R}$`, String.raw`Algebraically closed`],
        [String.raw`$\mathbb{F}_p$`, String.raw`$p$`, String.raw`$1$`, String.raw`Integers mod prime`],
        [String.raw`$\mathbb{F}_{p^n}$`, String.raw`$p$`, String.raw`$n$`, String.raw`Splitting field of $x^{p^n}-x$`],
        [String.raw`$\mathbb{Q}(\sqrt2)$`, String.raw`$0$`, String.raw`$2$`, String.raw`Quadratic extension`]
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`We compute the degree of a simple algebraic extension and exhibit inverses in a finite field.` },
      { kind: 'steps', title: 'Degrees and inverses', items: [
        { title: 'Minimal polynomial', text: String.raw`If $\alpha$ is algebraic over $K$, its minimal polynomial $m_\alpha(x)$ is the monic irreducible polynomial of least degree with $m_\alpha(\alpha)=0$.`, math: String.raw`$m_{\sqrt2}(x)=x^2-2\in\mathbb{Q}[x].$` },
        { title: 'Basis of a simple extension', text: String.raw`If $\deg m_\alpha=d$, then $1,\alpha,\dots,\alpha^{d-1}$ span $K(\alpha)$ (higher powers reduce via $m_\alpha$) and are linearly independent by minimality.`, math: String.raw`$[\mathbb{Q}(\sqrt2):\mathbb{Q}]=2,\ \text{basis }\{1,\sqrt2\}.$` },
        { title: 'Explicit inverse', text: String.raw`For $a+b\sqrt2\ne0$, rationalise: $\frac{1}{a+b\sqrt2}=\frac{a-b\sqrt2}{a^2-2b^2}$; the denominator is nonzero because $\sqrt2$ is irrational.`, math: String.raw`$(a+b\sqrt2)^{-1}=\frac{a-b\sqrt2}{a^2-2b^2}.$` },
        { title: 'Finite field inverse', text: String.raw`In $\mathbb{F}_p$, Fermat's little theorem gives $a^{p-2}\equiv a^{-1}\pmod p$ for $a\ne0$. For $p=7$, $3^5=243\equiv5\pmod7$, matching $3\cdot5\equiv1$.`, math: String.raw`$3^{-1}\equiv3^{5}\equiv5\pmod7.$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — arithmetic in $\mathbb{F}_7$.** Compute $3^{-1}$: $3\cdot5=15\equiv1\pmod7$, so $3^{-1}=5$. Then $2/3=2\cdot5=10\equiv3\pmod7$. Check: $3\cdot3=9\equiv2$.` },
      { kind: 'paragraph', text: String.raw`**Example 2 — $\mathbb{Q}(\sqrt2)$.** $(1+\sqrt2)^{-1}=\frac{1-\sqrt2}{1-2}=\sqrt2-1$. Verify: $(1+\sqrt2)(\sqrt2-1)=2-1=1.$ The extension degree is 2 because $x^2-2$ is irreducible over $\mathbb{Q}$ (Eisenstein at $p=2$).` },
      { kind: 'math', latex: String.raw`$(1+\sqrt2)^{-1}=\sqrt2-1,\qquad [\mathbb{Q}(\sqrt2):\mathbb{Q}]=2,\qquad 3^{-1}\equiv5\pmod7.$`, display: true, caption: 'Inverses in two fields.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Primitive element theorem.** Every finite separable extension of a perfect field is simple: $L=K(\alpha)$ for some $\alpha$. ** Fundamental theorem of Galois theory** applies to finite Galois extensions and links intermediate fields to subgroups (see galois-theory). **Wedderburn's little theorem.** Every finite division ring is a field — the commutativity of multiplication is automatic in the finite case.` },
      { kind: 'callout', tone: 'history', title: 'Finite fields', text: String.raw`Évariste Galois constructed finite fields in the 1830s; Leopold Kronecker and Heinrich Weber later systematised them. Their classification — one field for each prime power — is a jewel of nineteenth-century algebra.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We compute modular inverses with SymPy and verify that $\mathbb{F}_7^\times$ is cyclic with generator $3$.` },
      { kind: 'code', language: 'python', code: String.raw`from sympy import GF, invert, Poly, symbols
x = symbols('x')
p = 7
print('inverse of 3 mod 7 =', invert(3,p))
print('powers of 3 mod 7 =', [pow(3,k,p) for k in range(1,7)])
print('x^2-2 irreducible over Q?', Poly(x**2-2,x).is_irreducible)
# factor x^6-1 over F_7 to see the cyclic group structure
print('factor x^6-1 mod 7:', Poly(x**6-1,x, modulus=7).factor_list())`, caption: 'Finite-field arithmetic and irreducibility checks.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Cryptography:** AES and elliptic-curve cryptography operate over finite fields.`,
        String.raw`**Coding theory:** Reed–Solomon codes use arithmetic in $\mathbb{F}_{2^8}$.`,
        String.raw`**Computer algebra:** factorisation algorithms work over finite fields and lift to $\mathbb{Q}$.`,
        String.raw`**Physics:** complex numbers ($\mathbb{C}$) are the field of quantum amplitudes.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Field versus ring', text: String.raw`Do not call $\mathbb{Z}$ a field: $2$ has no multiplicative inverse in $\mathbb{Z}$. Do not call $\mathbb{Z}/n\mathbb{Z}$ a field when $n$ is composite. Algebraic closure is another extra property: $\mathbb{Q}$ and $\mathbb{R}$ are not algebraically closed, $\mathbb{C}$ is.` },
      { kind: 'list', items: [
        String.raw`$\mathbb{F}_p$ has $p$ elements, not $p^n$; $\mathbb{F}_{p^n}$ has $p^n$.`,
        String.raw`Field extensions are vector spaces — dimension, not cardinality, defines the degree.`,
        String.raw`Not every algebraic extension is finite; $\overline{\mathbb{Q}}/\mathbb{Q}$ has infinite degree.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Prove that a finite integral domain is a field.`,
        String.raw`Show that $[\mathbb{Q}(\sqrt2,\sqrt3):\mathbb{Q}]=4$.`,
        String.raw`Why is $\mathbb{F}_p^\times$ cyclic? State the group-theoretic ingredient.`,
        String.raw`Give an example of a transcendental extension and its degree.`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`I. N. Herstein, *Topics in Algebra*, Chapter 5 — fields and extensions.`,
        String.raw`D. S. Dummit and R. M. Foote, *Abstract Algebra*, Chapters 13–14.`,
        String.raw`R. Lidl and H. Niederreiter, *Finite Fields* — comprehensive reference.`
      ] }
    ]
  },
  {
    id: 'galois-theory',
    title: 'Galois Theory',
    branchId: 'abstract-algebra',
    level: 'Master’s',
    summary: String.raw`Galois theory translates field extensions into groups: for a finite Galois extension, intermediate fields correspond inclusion-reversingly to subgroups of the automorphism group. This dictionary explains solvability by radicals and yields the Abel–Ruffini theorem that the general quintic has no radical formula.`,
    prerequisites: ['fields', 'group-homomorphisms', 'polynomial-rings'],
    tags: ['field-extension', 'symmetry-group', 'solvability', 'splitting-field'],
    status: 'Complete',
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`Which polynomial equations can be solved by radicals? Galois' insight was to study the symmetries among the roots rather than the roots themselves. If those symmetries form a solvable group, radicals suffice; if not, no formula exists.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`A field automorphism fixing the base field permutes the roots of a polynomial while preserving all algebraic relations. The group of such permutations measures how " entangled" the roots are. Adjoining a radical corresponds to passing to a subgroup in a chain with cyclic quotients — precisely the definition of a solvable group.` },
      { kind: 'callout', tone: 'intuition', title: 'The dictionary', text: String.raw`Bigger intermediate field ↔ smaller subgroup. The whole extension corresponds to the trivial subgroup; the base field corresponds to the full Galois group. Degrees translate to indices: $[L:M]=|\operatorname{Gal}(L/M)|.$` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`Draw the lattice of intermediate fields on the left and the subgroup lattice of $G=\operatorname{Gal}(L/K)$ on the right, with arrows reversing inclusion. For $L=\mathbb{Q}(\sqrt[3]{2},\omega)$, the six intermediate fields line up with the six subgroups of $S_3$ in mirror image.` },
      { kind: 'math', latex: String.raw`\{\text{intermediate fields }M\}\ \longleftrightarrow\ \{\text{subgroups }H\le \operatorname{Gal}(L/K)\},\qquad M\longmapsto \operatorname{Gal}(L/M)`, display: true, caption: 'The inclusion-reversing Galois correspondence.' },
      { kind: 'callout', tone: 'visual', title: 'Normal subgroups matter', text: String.raw`Intermediate fields $M$ that are Galois over $K$ correspond exactly to **normal** subgroups $H\trianglelefteq G$, and then $\operatorname{Gal}(M/K)\cong G/H.$` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`Let $L/K$ be a finite extension. It is **normal** if every irreducible polynomial in $K[x]$ with a root in $L$ splits completely in $L$; **separable** if every element of $L$ has distinct roots in its minimal polynomial (automatic in characteristic $0$). It is **Galois** if both hold; then $|\operatorname{Gal}(L/K)|=[L:K]$.` },
      { kind: 'math', latex: String.raw`$|\operatorname{Gal}(L/K)|=[L:K]\quad\Longleftrightarrow\quad L/K\ \text{finite, normal and separable}.$`, display: true },
      { kind: 'list', items: [
        String.raw`$\operatorname{Gal}(L/K)=\{\sigma:L\to L\text{ field automorphism}:\sigma|_K=\mathrm{id}\}$.`,
        String.raw`A polynomial is solvable by radicals over a field of characteristic $0$ iff its Galois group is a solvable group.`,
        String.raw`A group is solvable if it has a subnormal series with abelian factors.`,
        String.raw`$S_n$ is solvable for $n\le4$ but not for $n\ge5$.`
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`We work out the Galois group of $x^3-2$ and see the correspondence explicitly.` },
      { kind: 'steps', title: 'The splitting field of $x^3-2$', items: [
        { title: 'Find the splitting field', text: String.raw`The roots are $\sqrt[3]{2}$, $\omega\sqrt[3]{2}$, $\omega^2\sqrt[3]{2}$ with $\omega=e^{2\pi i/3}$. Since $\sqrt[3]{2}$ is real and $\omega$ is not, $L=\mathbb{Q}(\sqrt[3]{2},\omega)$.`, math: String.raw`$L=\mathbb{Q}(\sqrt[3]{2},\omega),\qquad \omega^2+\omega+1=0.$` },
        { title: 'Compute the degree', text: String.raw`$[\mathbb{Q}(\sqrt[3]{2}):\mathbb{Q}]=3$ (irreducible by Eisenstein at 2); $[\mathbb{Q}(\sqrt[3]{2},\omega):\mathbb{Q}(\sqrt[3]{2})]=2$ because $x^2+x+1$ stays irreducible over the real field $\mathbb{Q}(\sqrt[3]{2})$. Degrees multiply:`, math: String.raw`$[L:\mathbb{Q}]=3\cdot2=6.$` },
        { title: 'Identify the group', text: String.raw`An automorphism is determined by where it sends $\sqrt[3]{2}$ (three choices) and $\omega$ (two choices), and all six combinations occur. The group has order 6 and is nonabelian, hence $\operatorname{Gal}(L/\mathbb{Q})\cong S_3.$`, math: String.raw`$|\operatorname{Gal}(L/\mathbb{Q})|=6\ \text{and nonabelian}\Rightarrow \cong S_3.$` },
        { title: 'Read off intermediate fields', text: String.raw`The three subgroups of order 2 fix $\mathbb{Q}(\omega\sqrt[3]{2})$, $\mathbb{Q}(\omega^2\sqrt[3]{2})$ and $\mathbb{Q}(\sqrt[3]{2})$ respectively (each of degree 3); the subgroup $A_3$ of order 3 fixes $\mathbb{Q}(\omega)$ (degree 2), and $A_3\trianglelefteq S_3$ so $\mathbb{Q}(\omega)/\mathbb{Q}$ is Galois.`, math: String.raw`$[L:M]=|H|\quad\text{for }M=L^H.$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — quadratic extension.** For $f=x^2-2$, $L=\mathbb{Q}(\sqrt2)$, $[L:\mathbb{Q}]=2$, and $\operatorname{Gal}(L/\mathbb{Q})=\{\mathrm{id},\sigma\}$ with $\sigma(\sqrt2)=-\sqrt2$, so the group is $C_2$ — solvable, matching the quadratic formula.` },
      { kind: 'paragraph', text: String.raw`**Example 2 — solvability.** $\operatorname{Gal}(x^3-2)\cong S_3$ has the subnormal series $1\triangleleft A_3\triangleleft S_3$ with factors $C_3$ and $C_2$, both abelian: $S_3$ is solvable, so $x^3-2$ is solvable by radicals (Cardano's formula). But the generic quintic has Galois group $S_5$, which has $A_5$ as a non-solvable composition factor; hence no general radical formula exists.` },
      { kind: 'math', latex: String.raw`$1\triangleleft C_3\triangleleft S_3\ \text{(solvable)},\qquad 1\triangleleft A_5\triangleleft S_5\ \text{with }A_5\ \text{simple nonabelian (not solvable)}.$`, display: true, caption: 'Solvable versus non-solvable composition factors.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Fundamental theorem.** Let $L/K$ be finite Galois with group $G$. The maps $M\mapsto\operatorname{Gal}(L/M)$ and $H\mapsto L^H$ are mutual inverses between intermediate fields and subgroups, reverse inclusions, satisfy $[L:M]=|H|$ and $[M:K]=[G:H]$, and send normal subgroups to Galois intermediate extensions with quotient Galois group. Proof ingredients: Artin's theorem on independence of characters gives $[L:L^H]=|H|$; normality/separability give $L^{\operatorname{Gal}(L/M)}=M$.` },
      { kind: 'callout', tone: 'warning', title: 'What the theorem does not say', text: String.raw`For non-normal or inseparable extensions the correspondence fails: $|\operatorname{Gal}(L/K)|$ can be strictly smaller than $[L:K]$. For example $\mathbb{Q}(\sqrt[3]{2})/\mathbb{Q}$ has degree 3 but only the trivial automorphism, since the other two roots are not in the field.` },
      { kind: 'callout', tone: 'history', title: "Galois' tragic brevity", text: String.raw`Évariste Galois developed the theory as a teenager and died in 1832 at age 20 after a duel. His memoir was misunderstood or lost repeatedly until Liouville published it in 1846. Abel had proved the quintic impossibility in 1824 by a different route.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We ask SymPy for the Galois group of several polynomials and check solvability.` },
      { kind: 'code', language: 'python', code: String.raw`from sympy import symbols, Poly
from sympy.polys.numberfields.galoisgroups import galois_group
x = symbols('x')
for expr in (x**2-2, x**3-2, x**4+1, x**5-x-1):
    f = Poly(expr, x)
    try:
        G, alt = galois_group(f)
        print(expr, '->', G, ' order', G.order(), ' solvable?', G.is_solvable)
    except Exception as e:
        print(expr, '-> galois_group unavailable:', type(e).__name__)`, caption: 'Computational Galois groups; the last polynomial generically has S5.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Computer algebra:** polynomial factorisation and radical solving use Galois-theoretic algorithms.`,
        String.raw`**Cryptography:** finite-field extensions and their automorphisms underlie many protocols.`,
        String.raw`**Number theory:** class field theory generalises the Galois correspondence to abelian extensions.`,
        String.raw`**Physics:** crystallographic point groups and gauge symmetries use extension–subgroup dictionaries.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Hypotheses matter', text: String.raw`The fundamental theorem requires finite, normal and separable extensions. The claim "the general quintic is unsolvable" means no formula in radicals exists for generic coefficients — it does not say every quintic is unsolvable (e.g. $x^5-1$ is easily solvable).` },
      { kind: 'list', items: [
        String.raw`A solvable group need not be abelian; $S_3$ is the standard example.`,
        String.raw`The Galois group acts on roots, not on coefficients.`,
        String.raw`Separability is automatic in characteristic $0$ but not in positive characteristic.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Why does $\mathbb{Q}(\sqrt[3]{2})$ have only the trivial automorphism over $\mathbb{Q}$?`,
        String.raw`Show that $A_5$ is not solvable using its simplicity.`,
        String.raw`Which intermediate field of $\mathbb{Q}(\sqrt[3]{2},\omega)$ is Galois over $\mathbb{Q}$, and why?`,
        String.raw`State precisely what Abel–Ruffini does and does not assert.`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`I. Stewart, *Galois Theory*, 4th ed. — accessible and historically aware.`,
        String.raw`D. S. Dummit and R. M. Foote, *Abstract Algebra*, Chapter 14.`,
        String.raw`H. Edwards, *Galois Theory* — with translated source excerpts.`
      ] }
    ]
  },
  {
    id: 'metric-spaces',
    title: 'Metric Spaces',
    branchId: 'real-analysis',
    level: 'Undergraduate 2',
    summary: String.raw`A metric space formalises distance and convergence far beyond $\mathbb{R}^n$. Open balls generate a topology, Cauchy sequences probe completeness, and the contraction mapping theorem gives existence and uniqueness of fixed points in complete spaces.`,
    prerequisites: ['real-numbers', 'set-theory', 'sequences'],
    tags: ['distance', 'convergence', 'completeness', 'contraction'],
    status: 'Complete',
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`Limits of sequences, continuity and approximation make sense wherever there is a notion of distance. Metric spaces extract the minimal structure needed, allowing the same proofs to serve Euclidean space, function spaces and discrete sets.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`A distance should be nonnegative, symmetric, zero only for identical points, and obey the triangle inequality — no detour is shorter than the direct route. Once distance exists, "close" means inside a small open ball, and a sequence converges when its terms eventually enter every ball around the limit.` },
      { kind: 'callout', tone: 'intuition', title: 'Metric vs. topology', text: String.raw`Every metric defines a topology (open sets are unions of balls), but not every topology comes from a metric. Metric spaces are first countable and Hausdorff; general topological spaces need be neither.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`Different metrics give different geometries: the Euclidean metric makes balls round, the taxicab metric makes them diamonds, and the sup metric makes them squares. Yet all induce the same topology on $\mathbb{R}^2$ — the shapes differ, the notion of convergence does not.` },
      { kind: 'math', latex: String.raw`$d_2(x,y)=\sqrt{(x_1-y_1)^2+(x_2-y_2)^2},\quad d_1=|x_1-y_1|+|x_2-y_2|,\quad d_\infty=\max_i|x_i-y_i|$`, display: true, caption: 'Three equivalent metrics on $\mathbb{R}^2$.' },
      { kind: 'callout', tone: 'visual', title: 'Incomplete metric', text: String.raw`On $(0,1)$ with the usual metric, the sequence $1/n$ is Cauchy but has no limit in the space. Completeness is a property of the metric, not of the topology: $(0,1)$ and $\mathbb{R}$ are homeomorphic but only $\mathbb{R}$ is complete under the usual metric.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`A **metric** on a set $X$ is $d:X\times X\to[0,\infty)$ with: $d(x,y)=0\iff x=y$; $d(x,y)=d(y,x)$; $d(x,z)\le d(x,y)+d(y,z)$. The pair $(X,d)$ is a metric space. The open ball is $B_r(x)=\{y:d(x,y)<r\}$; $U\subseteq X$ is open if for each $x\in U$ some $B_r(x)\subseteq U$.` },
      { kind: 'math', latex: String.raw`$x_n\to x\iff \forall\varepsilon>0\ \exists N:\ n\ge N\Rightarrow d(x_n,x)<\varepsilon$`, display: true, caption: 'Convergence in a metric space.' },
      { kind: 'table', headers: ['Space', 'Metric', 'Complete?', 'Notes'], rows: [
        [String.raw`$\mathbb{R}^n$`, String.raw`Euclidean`, String.raw`Yes`, String.raw`Model complete space`],
        [String.raw`$(0,1)$`, String.raw`Usual $|x-y|$`, String.raw`No`, String.raw`Cauchy sequence $1/n$ escapes`],
        [String.raw`$\mathbb{R}$`, String.raw`$|\arctan x-\arctan y|$`, String.raw`No`, String.raw`Same topology, different metric`],
        [String.raw`Any set`, String.raw`Discrete $d(x,y)=\mathbf{1}_{x\ne y}$`, String.raw`Yes`, String.raw`All subsets open`],
        [String.raw`$C[0,1]$`, String.raw`$\|f\|_\infty$`, String.raw`Yes`, String.raw`Uniform convergence`]
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`We show open balls form a basis and prove the contraction mapping theorem.` },
      { kind: 'steps', title: 'Balls, completeness and fixed points', items: [
        { title: 'Balls form a basis', text: String.raw`For $z\in B_{r_1}(x)\cap B_{r_2}(y)$, take $\rho=\min(r_1-d(z,x),\,r_2-d(z,y))>0$; the triangle inequality gives $B_\rho(z)\subseteq$ the intersection. Hence arbitrary unions of balls are open.`, math: String.raw`$B_\rho(z)\subseteq B_{r_1}(x)\cap B_{r_2}(y).$` },
        { title: 'Cauchy versus convergent', text: String.raw`Every convergent sequence is Cauchy: $d(x_n,x_m)\le d(x_n,x)+d(x_m,x)<2\varepsilon$ eventually. The converse requires completeness.`, math: String.raw`$x_n\to x\Rightarrow (x_n)\ \text{Cauchy}.$` },
        { title: 'Contraction mapping theorem', text: String.raw`If $(X,d)$ is complete and $T:X\to X$ satisfies $d(Tx,Ty)\le k\,d(x,y)$ with $0\le k<1$, then $T$ has a unique fixed point. For $x_{n+1}=T x_n$, $d(x_{n+1},x_n)\le k^n d(x_1,x_0)$, so $(x_n)$ is Cauchy; completeness gives $x^\ast$, continuity of $T$ gives $Tx^\ast=x^\ast$.`, math: String.raw`$d(x_n,x^\ast)\le\frac{k^n}{1-k}d(x_1,x_0).$` },
        { title: 'Uniqueness', text: String.raw`If $Tx=Ty=x$ and $y$ are fixed points, $d(x,y)=d(Tx,Ty)\le k\,d(x,y)$; with $k<1$ this forces $d(x,y)=0$.`, math: String.raw`$d(x,y)\le k\,d(x,y)\Rightarrow x=y.$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — incomplete metric.** On $\mathbb{R}$ set $d(x,y)=|\arctan x-\arctan y|$. The sequence $x_n=n$ satisfies $d(x_n,x_m)=|\arctan n-\arctan m|\to0$ as $n,m\to\infty$ since $\arctan n\to\pi/2$, so it is Cauchy. But convergence to some $L\in\mathbb{R}$ would require $\arctan L=\pi/2$, impossible. Hence $(\mathbb{R},d)$ is incomplete although its topology is the usual one.` },
      { kind: 'paragraph', text: String.raw`**Example 2 — contraction.** Solve $x=\cos x$ on $[0,1]$ with $T(x)=\cos x$: $|T'(x)|=|\sin x|\le\sin1\approx0.8415<1$, so $T$ is a contraction on $[0,1]$. Starting at $x_0=0.5$ iteration converges to $x^\ast\approx0.7391.$` },
      { kind: 'math', latex: String.raw`$\arctan n\uparrow\pi/2\ \text{(Cauchy, no limit in }(\mathbb{R},d));\qquad x_{n+1}=\cos x_n\to0.739085\ldots$`, display: true, caption: 'Incompleteness and a fixed point.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Baire category theorem.** In a complete metric space, the intersection of countably many dense open sets is dense. Equivalently, a complete metric space cannot be a countable union of nowhere-dense closed sets. Consequences include the uniform boundedness principle and the existence of continuous nowhere-differentiable functions.` },
      { kind: 'callout', tone: 'history', title: 'Metric spaces', text: String.raw`Maurice Fréchet introduced metric spaces in his 1906 thesis, generalising earlier work of Cantor, Hausdorff and Hilbert on convergence in function spaces. Banach's 1922 fixed point theorem made completeness a practical tool.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We iterate the contraction for $\cos x$ and track the error bound from the theorem.` },
      { kind: 'code', language: 'python', code: String.raw`import numpy as np
from math import cos
x = 0.5
k = np.sin(1.0)
d01 = abs(cos(0.5)-0.5)
for n in range(1, 21):
    x_new = cos(x)
    bound = k**n/(1-k)*d01
    if n in (1,5,10,20):
        print(f'n={n:2d}  x_n={x_new:.10f}  error<= {bound:.2e}')
    x = x_new
print('limit approx cos(x*)=', cos(x))`, caption: 'Contraction iteration with rigorous a priori error bound.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Numerical analysis:** convergence of iterative solvers follows from contraction estimates.`,
        String.raw`**Fractal geometry:** iterated function systems use contractions to generate self-similar sets.`,
        String.raw`**Machine learning:** metrics define neighbourhoods in clustering and kernel methods.`,
        String.raw`**Differential equations:** Picard–Lindelöf proves local existence/uniqueness via a contraction on a function space.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Completeness is metric-dependent', text: String.raw`Do not say "the space $(0,1)$ is not complete" without specifying the metric. With the bounded metric $d(x,y)=\min(|x-y|,1)$ it is still incomplete, but with the metric $d(x,y)=|\tan(\pi(x-\tfrac12))|$ it is complete — the map $x\mapsto\tan(\pi(x-1/2))$ is an isometry onto $\mathbb{R}$.` },
      { kind: 'list', items: [
        String.raw`A Cauchy sequence need not converge unless the space is complete.`,
        String.raw`The contraction constant must satisfy $k<1$ strictly; $k=1$ is not enough.`,
        String.raw`Different metrics can induce the same open sets but different Cauchy sequences.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Prove that the discrete metric makes every subset open and the space complete.`,
        String.raw`Show that equivalent norms on $\mathbb{R}^n$ give the same topology.`,
        String.raw`Why does the Banach fixed point theorem need completeness but not compactness?`,
        String.raw`Give an example of a Cauchy sequence in $\mathbb{Q}$ with no limit in $\mathbb{Q}$.`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`W. Rudin, *Principles of Mathematical Analysis*, Chapter 2 — metric spaces and compactness.`,
        String.raw`E. Kreyszig, *Introductory Functional Analysis with Applications*, Chapter 1.`,
        String.raw`M. Fréchet, "Sur quelques points du calcul fonctionnel" (1906) — the original paper.`
      ] }
    ]
  },
  {
    id: 'compactness',
    title: 'Compactness',
    branchId: 'real-analysis',
    level: 'Undergraduate 3',
    summary: String.raw`Compactness distils the behaviour of closed bounded sets: every open cover has a finite subcover, every sequence has a convergent subsequence, and continuous functions attain their extrema. Heine–Borel identifies compact sets in $\mathbb{R}^n$, while general topology keeps the cover definition.`,
    prerequisites: ['metric-spaces', 'topological-spaces', 'sequences'],
    tags: ['open-cover', 'heine-borel', 'sequential-compactness', 'extreme-value'],
    status: 'Complete',
    derivationIds: ['p3-der-heine-borel'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`Infinite sets can behave badly: a continuous function on $(0,1)$ need not be bounded, and a sequence in $\mathbb{R}$ need not have a convergent subsequence. Compactness identifies precisely the sets where "infinite" can be replaced by "finite" for many purposes.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`A compact space is small in a topological sense: no matter how you cover it with open sets, finitely many suffice. This finiteness propagates: continuous images are compact, so a continuous real function on a compact set has a maximum and minimum.` },
      { kind: 'callout', tone: 'intuition', title: 'Sequential compactness', text: String.raw`In metric spaces compactness is equivalent to: every sequence has a convergent subsequence whose limit lies in the set. This is often the most useful working form — it is how Bolzano–Weierstrass proofs proceed.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`Cover $[0,1]$ by increasingly fine open intervals — you can always select finitely many that still cover it. By contrast, the intervals $(1/n,1)$ for $n\ge2$ cover $(0,1)$ but no finite subcollection does: points arbitrarily close to $0$ are always missed.` },
      { kind: 'math', latex: String.raw`$(0,1)=\bigcup_{n\ge2}\left(\frac1n,1\right),\qquad \text{but } (0,1)\ne\bigcup_{n=2}^{N}\left(\frac1n,1\right)=\left(\frac1N,1\right)\ \text{for any finite }N.$`, display: true, caption: 'An open cover of (0,1) with no finite subcover.' },
      { kind: 'callout', tone: 'visual', title: 'Closed and bounded', text: String.raw`In $\mathbb{R}^n$ compactness equals closed + bounded (Heine–Borel). In infinite-dimensional normed spaces this fails: the closed unit ball of an infinite-dimensional Hilbert space is closed and bounded but never compact.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`A subset $K$ of a topological space is **compact** if every open cover $K\subseteq\bigcup_{\alpha\in A}U_\alpha$ admits a finite subcover $K\subseteq U_{\alpha_1}\cup\cdots\cup U_{\alpha_m}$. In metric spaces this is equivalent to sequential compactness and to completeness plus total boundedness.` },
      { kind: 'math', latex: String.raw`$K\ \text{compact}\iff \text{every open cover has a finite subcover}\iff\text{every sequence in }K\ \text{has a convergent subsequence in }K$`, display: true, caption: 'The metric-space equivalence; the second ⇔ third fails in general topology.' },
      { kind: 'list', items: [
        String.raw`Continuous image: if $f:X\to Y$ is continuous and $X$ compact, $f(X)$ is compact.`,
        String.raw`Closed subset of a compact space is compact.`,
        String.raw`Finite product of compact spaces is compact (Tychonoff for arbitrary products requires the axiom of choice).`,
        String.raw`In a Hausdorff space, compact sets are closed.`
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`We sketch Heine–Borel in $\mathbb{R}$; the full proof is p3-der-heine-borel.` },
      { kind: 'steps', title: 'Heine–Borel proof sketch', items: [
        { title: 'Closed and bounded ⇒ nested intervals', text: String.raw`Let $K\subseteq[a,b]$ be closed and suppose no finite subcover exists. Bisect $[a,b]$; at least one half, intersected with $K$, still has no finite subcover. Iterate to get nested intervals $I_n$ with length $2^{-n}(b-a)$.`, math: String.raw`$I_1\supseteq I_2\supseteq\cdots,\qquad |I_n|=2^{-n}(b-a)\to0.$` },
        { title: 'Cantor intersection', text: String.raw`The endpoints converge to a common point $x^\ast$, and $x^\ast\in K$ because $K$ is closed and each $I_n\cap K\ne\varnothing$.`, math: String.raw`$x^\ast\in\bigcap_n I_n\cap K.$` },
        { title: 'Contradiction', text: String.raw`Some cover member $U_\alpha$ contains $x^\ast$; since $U_\alpha$ is open, $I_n\subseteq U_\alpha$ for large $n$, giving a finite subcover — contradiction.`, math: String.raw`$K\subseteq U_\alpha\ \text{for one }\alpha\ \text{at small scale}.$` },
        { title: 'Converse', text: String.raw`Compact ⇒ bounded: cover by balls $B_n(0)$ and take a finite subcover. Compact ⇒ closed in Hausdorff $\mathbb{R}$: for $y\notin K$, disjoint neighbourhoods separate $y$ from each point of $K$, and compactness yields a neighbourhood of $y$ disjoint from $K$.`, math: String.raw`$K\ \text{compact}\Rightarrow K\ \text{closed and bounded}.$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — extreme value theorem.** $f(x)=x^3-3x$ on $[-2,2]$ is continuous and the interval is compact, so a maximum and minimum exist. Critical points $f'(x)=3x^2-3=0$ give $x=\pm1$ with $f(-1)=2$, $f(1)=-2$; endpoints give $f(-2)=-2$, $f(2)=2$. Maximum $2$ (at $-1$ and $2$), minimum $-2$ (at $-2$ and $1$).` },
      { kind: 'paragraph', text: String.raw`**Example 2 — non-compactness.** The sequence $f_n(x)=x^n$ in $C[0,1]$ with the sup norm has no uniformly convergent subsequence: any pointwise limit is discontinuous at $1$, while uniform limits of continuous functions are continuous. Thus the closed unit ball of $C[0,1]$ is not compact.` },
      { kind: 'math', latex: String.raw`$f'(x)=3(x^2-1),\quad f(-1)=2,\quad f(1)=-2,\quad \max_{[-2,2]}f=2,\quad \min=-2.$`, display: true, caption: 'Extreme values on a compact interval.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Arzelà–Ascoli theorem.** A subset of $C(K)$ (with $K$ compact metric) has compact closure iff it is uniformly bounded and equicontinuous. This repairs the failure of Heine–Borel in function spaces by adding equicontinuity. **Lebesgue number lemma.** Every open cover of a compact metric space has a number $\delta>0$ such that every ball of radius $\delta$ lies inside some cover member — crucial in the proof that continuous maps on compact metric spaces are uniformly continuous.` },
      { kind: 'callout', tone: 'history', title: 'Heine, Borel, Lebesgue', text: String.raw`Eduard Heine proved the finite-subcover property for intervals in 1872; Émile Borel extended it in 1895 to countable covers, and Henri Lebesgue to arbitrary covers in 1898. The general topological definition is due to Pavel Alexandrov and Pavel Urysohn in the 1920s.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We numerically demonstrate the finite subcover idea for a cover of $[0,1]$ by overlapping intervals and verify the extreme values of the cubic.` },
      { kind: 'code', language: 'python', code: String.raw`import numpy as np
# cover [0,1] by intervals (a_k, b_k) with heavy overlap
N = 12
edges = np.linspace(-0.05, 1.05, N+1)
intervals = [(edges[i]-0.06, edges[i+1]+0.06) for i in range(N)]
grid = np.linspace(0,1,1001)
covered = np.array([any(a<=t<=b for a,b in intervals) for t in grid])
print('grid fully covered?', covered.all())
# extreme values of x^3-3x on [-2,2]
x = np.linspace(-2,2,100001)
f = x**3-3*x
print('numeric max/min =', f.max(), f.min(), ' exact ±2 at x=-1,1')`, caption: 'Finite covers and extreme values in code.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Optimisation:** existence of optima on compact feasible sets under continuity.`,
        String.raw`**Differential equations:** Peano's existence theorem uses Arzelà–Ascoli compactness.`,
        String.raw`**Statistics:** the extreme value theorem justifies maximum-likelihood existence under regularity.`,
        String.raw`**Topology:** Tychonoff's theorem underlies compactness of product spaces in statistical mechanics.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Closed and bounded is not enough in general', text: String.raw`In $\mathbb{R}^n$ Heine–Borel works, but in infinite-dimensional normed spaces the closed unit ball is not compact. Similarly, in a general metric space "closed + bounded" need not imply compactness (e.g. an infinite set with the discrete metric and diameter 1).` },
      { kind: 'list', items: [
        String.raw`Sequential compactness ⇔ compactness only in metric spaces (more generally, first-countable spaces), not in all topological spaces.`,
        String.raw`A continuous function on a compact set is bounded, but a bounded continuous function need not come from a compact domain.`,
        String.raw`Compact sets in Hausdorff spaces are closed; without Hausdorff this can fail.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Give an open cover of $\mathbb{Q}\cap[0,1]$ with no finite subcover.`,
        String.raw`Prove that a continuous function on a compact metric space is uniformly continuous.`,
        String.raw`Why is the closed unit ball in $\ell^2$ not compact?`,
        String.raw`State the Lebesgue number lemma and explain where compactness is used.`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`W. Rudin, *Principles of Mathematical Analysis*, Chapter 2 — Heine–Borel and friends.`,
        String.raw`J. Munkres, *Topology*, Chapter 2 — compactness in topological spaces.`,
        String.raw`N. Bourbaki, *General Topology* — the general cover formulation.`
      ] }
    ]
  },
  {
    id: 'measure-theory',
    title: 'Measure Theory',
    branchId: 'real-analysis',
    level: 'Master’s',
    summary: String.raw`Measure theory extends length, area and probability to a sigma-algebra of sets via countable additivity. Carathéodory's construction produces Lebesgue measure from an outer measure, distinguishes Borel from Lebesgue-measurable sets, and underlies modern integration.`,
    prerequisites: ['real-analysis', 'set-theory', 'probability-axioms'],
    tags: ['sigma-algebra', 'outer-measure', 'lebesgue-measure', 'measurability'],
    status: 'Complete',
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`Riemann integration cannot handle highly discontinuous functions or limits of sequences of functions in a stable way. Measure theory provides a consistent way to assign sizes to sets and to integrate functions that are limits of simpler ones, including the Dirichlet function.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`Start by covering a set with countably many intervals and take the infimum of their total length — an outer measure. A set is measurable when it splits every test set cleanly: the outer measure of the test equals the sum of the parts inside and outside. This criterion forces countable additivity on the measurable sets.` },
      { kind: 'callout', tone: 'intuition', title: 'Why sigma-algebras?', text: String.raw`We cannot consistently assign a translation-invariant, countably additive measure to *every* subset of $\mathbb{R}$ (Vitali). Restricting to a sigma-algebra keeps all sets we need for analysis while avoiding contradictions.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`Picture approximating a messy subset of $[0,1]$ from outside by a union of intervals. The infimum of total interval length is its outer measure. For the rationals $\mathbb{Q}\cap[0,1]$, enumerate them and cover the $n$-th point by an interval of length $\varepsilon/2^n$: total length $\varepsilon$, and $\varepsilon$ is arbitrary — so the set has measure zero.` },
      { kind: 'math', latex: String.raw`$\mathbb{Q}\cap[0,1]=\{q_1,q_2,\dots\},\qquad \lambda^\ast\!\left(\mathbb{Q}\cap[0,1]\right)\le\sum_{n=1}^\infty\frac{\varepsilon}{2^n}=\varepsilon\ \forall\varepsilon>0\Rightarrow\lambda^\ast=0.$`, display: true, caption: 'Countable sets have Lebesgue measure zero.' },
      { kind: 'callout', tone: 'visual', title: 'Fat Cantor sets', text: String.raw`Removing middle intervals of decreasing total length produces a closed, nowhere-dense set of positive measure. Thus "measure zero" and "topologically small" are independent notions.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`A **sigma-algebra** $\mathcal{A}$ on $X$ contains $X$, is closed under complements and countable unions. A **measure** $\mu:\mathcal{A}\to[0,\infty]$ has $\mu(\varnothing)=0$ and is countably additive on disjoint sets. An **outer measure** $\mu^\ast:2^X\to[0,\infty]$ is monotone and countably subadditive with $\mu^\ast(\varnothing)=0$. Carathéodory's criterion: $E$ is measurable if $\mu^\ast(A)=\mu^\ast(A\cap E)+\mu^\ast(A\cap E^c)$ for all $A\subseteq X$.` },
      { kind: 'math', latex: String.raw`$\lambda^\ast(E)=\inf\left\{\sum_{n=1}^\infty (b_n-a_n):E\subseteq\bigcup_{n=1}^\infty(a_n,b_n]\right\}$`, display: true, caption: 'Lebesgue outer measure on $\mathbb{R}$.' },
      { kind: 'list', items: [
        String.raw`The Borel sigma-algebra $\mathcal{B}(\mathbb{R})$ is generated by open sets; Lebesgue-measurable sets form its completion (adding subsets of null sets).`,
        String.raw`Lebesgue measure $\lambda$ is translation-invariant and satisfies $\lambda((a,b])=b-a$.`,
        String.raw`A property holding outside a null set holds *almost everywhere* (a.e.).`,
        String.raw`Vitali sets (using the axiom of choice) exist and are not Lebesgue measurable.`
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`We outline Carathéodory's construction and the extension theorem.` },
      { kind: 'steps', title: 'Constructing Lebesgue measure', items: [
        { title: 'Define outer measure', text: String.raw`Cover $E$ by countably many half-open intervals and take the infimum of total lengths. This is monotone and countably subadditive.`, math: String.raw`$\lambda^\ast(E)=\inf\sum_n(b_n-a_n).$` },
        { title: 'Carathéodory measurability', text: String.raw`Call $E$ measurable if it splits every $A$ additively. The family of measurable sets is a sigma-algebra, and $\lambda^\ast$ restricted to it is countably additive.`, math: String.raw`$\lambda^\ast(A)=\lambda^\ast(A\cap E)+\lambda^\ast(A\setminus E).$` },
        { title: 'Intervals are measurable', text: String.raw`For $E=(a,b]$ one proves $\lambda^\ast(A)\ge\lambda^\ast(A\cap E)+\lambda^\ast(A\setminus E)$ by approximating $A$ with intervals and using their geometry; the reverse inequality is subadditivity.`, math: String.raw`$\lambda((a,b])=b-a.$` },
        { title: 'Extension theorem', text: String.raw`A premeasure on an algebra of sets extends to a measure on the generated sigma-algebra (Carathéodory extension); uniqueness holds if the premeasure is sigma-finite. Lebesgue measure is the extension of length from finite unions of intervals.`, math: String.raw`$\lambda\ \text{is the unique $\sigma$-finite extension of interval length}.$` },
        { title: 'Completion', text: String.raw`Adding all subsets of $\lambda$-null sets to $\mathcal{B}(\mathbb{R})$ gives the Lebesgue sigma-algebra, which is strictly larger (e.g. subsets of the Cantor set).`, math: String.raw`$\mathcal{B}(\mathbb{R})\subsetneq\mathcal{L}.$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — rationals.** $\lambda(\mathbb{Q}\cap[0,1])=0$ by the covering argument above, while $\lambda([0,1]\setminus\mathbb{Q})=1$ by additivity and $\lambda([0,1])=1.$` },
      { kind: 'paragraph', text: String.raw`**Example 2 — Dirichlet function.** The indicator of $\mathbb{Q}\cap[0,1]$ is not Riemann integrable (every interval contains rationals and irrationals, so upper and lower sums are $1$ and $0$). As a Lebesgue integral it equals $\lambda(\mathbb{Q}\cap[0,1])=0.$` },
      { kind: 'math', latex: String.raw`$\lambda(\mathbb{Q}\cap[0,1])=0,\qquad \lambda([0,1]\setminus\mathbb{Q})=1,\qquad \int_{[0,1]}\mathbf{1}_{\mathbb{Q}}\,d\lambda=0.$`, display: true, caption: 'Measure-theoretic resolution of a classic pathology.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Monotone convergence of measures.** If $A_n\uparrow A$ then $\mu(A_n)\uparrow\mu(A)$; if $A_n\downarrow A$ and $\mu(A_1)<\infty$, then $\mu(A_n)\downarrow\mu(A)$. These are consequences of countable additivity. **Uniqueness ($\pi$–$\lambda$ theorem).** Two probability measures agreeing on a $\pi$-system generating a sigma-algebra agree everywhere.` },
      { kind: 'callout', tone: 'history', title: 'Borel and Lebesgue', text: String.raw`Émile Borel introduced measure in 1898; Henri Lebesgue's 1902 thesis transformed integration by integrating functions via the measure of level sets. Carathéodory's 1914 criterion axiomatised measurability.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We approximate the measure of a set by sampling and verify that a countable covering gives an arbitrarily small outer measure bound for the rationals.` },
      { kind: 'code', language: 'python', code: String.raw`import numpy as np
rng = np.random.default_rng(8)
# Monte Carlo measure of union of two intervals in [0,1]
u = rng.random(1_000_000)
target = ((u>=0.2)&(u<=0.5)) | ((u>=0.7)&(u<=0.9))
print('MC measure =', target.mean(), ' exact =', 0.3+0.2)
# outer measure bound for first N rationals (here: k/1000 grid rationals)
for eps in (0.1, 0.01, 0.001):
    N = 200
    bound = sum(eps/2**(k+1) for k in range(N))
    print(f'eps={eps}: covering bound ~ {bound:.6f} <= {eps}')`, caption: 'Sampling estimates measure; the cover bound illustrates null sets.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Probability:** Kolmogorov's axioms are measure axioms with total mass 1.`,
        String.raw`**Ergodic theory:** measure-preserving transformations model long-run statistical behaviour.`,
        String.raw`**Image processing:** measures and integrals define texture and density descriptors.`,
        String.raw`**Mathematical finance:** risk-neutral pricing is integration against a probability measure.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Null does not mean empty', text: String.raw`A measure-zero set can be uncountable (the Cantor set). Conversely, "almost everywhere" permits exceptions on a null set, not nowhere. And not every subset of $\mathbb{R}$ is Lebesgue measurable if one assumes the axiom of choice.` },
      { kind: 'list', items: [
        String.raw`Borel sets are countable-generated; Lebesgue-measurable sets include non-Borel subsets of null sets.`,
        String.raw`Countable additivity does not extend to uncountable unions.`,
        String.raw`Outer measure is only subadditive; additivity holds on measurable sets.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Prove that countable sets have Lebesgue measure zero.`,
        String.raw`Explain why Carathéodory's criterion yields countable additivity.`,
        String.raw`Give an example of a set that is meagre (topologically small) but has full measure.`,
        String.raw`Why is the completion of Borel measure needed?`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`H. Lebesgue, "Intégrale, longueur, aire" (1902) — the founding thesis.`,
        String.raw`W. Rudin, *Real and Complex Analysis*, Chapter 2 — measure theory done briskly.`,
        String.raw`P. Billingsley, *Probability and Measure*, Chapters 1–3.`
      ] }
    ]
  },
  {
    id: 'lebesgue-integration',
    title: 'Lebesgue Integration',
    branchId: 'real-analysis',
    level: 'Master’s',
    summary: String.raw`The Lebesgue integral is built from simple functions by monotone approximation, so it commutes with limits under precise hypotheses. The monotone and dominated convergence theorems are the engine of modern analysis, probability and Fourier theory.`,
    prerequisites: ['measure-theory', 'real-analysis', 'expectation'],
    tags: ['integral', 'monotone-convergence', 'dominated-convergence', 'simple-functions'],
    status: 'Complete',
    derivationIds: ['p3-der-mct'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`Riemann integration partitions the domain; it fails for functions with dense discontinuities and makes limit interchanges delicate. Lebesgue integration partitions the range and works on arbitrary measure spaces, giving powerful convergence theorems with clean hypotheses.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`Approximate $f\ge0$ from below by simple functions — finite linear combinations of indicators of measurable sets. The integral of a simple function is a finite sum $\sum c_i\mu(A_i)$; the integral of $f$ is the supremum over all such approximations. For signed functions we split into positive and negative parts and require both integrals finite.` },
      { kind: 'callout', tone: 'intuition', title: 'Why simple functions work', text: String.raw`Simple functions are to Lebesgue theory what step functions are to Riemann theory, but their "steps" are arbitrary measurable sets, not just intervals. This flexibility is what lets us integrate the indicator of the rationals.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`Slice the graph of $f$ by horizontal lines at heights $c_0<c_1<\cdots$; each slice picks out the set $A_i=\{x:c_i\le f(x)<c_{i+1}\}$. The approximating simple function assigns height $c_i$ to $A_i$, and its integral is the sum of rectangle areas $\sum c_i\mu(A_i)$ — a "horizontal" Riemann sum.` },
      { kind: 'math', latex: String.raw`$s(x)=\sum_{i=1}^m c_i\,\mathbf{1}_{A_i}(x),\qquad \int s\,d\mu=\sum_{i=1}^m c_i\,\mu(A_i)$`, display: true, caption: 'A simple function and its integral.' },
      { kind: 'callout', tone: 'visual', title: 'Area under a spike', text: String.raw`For $f=\mathbf{1}_{\mathbb{Q}\cap[0,1]}$ the "horizontal" sets are $\mathbb{Q}\cap[0,1]$ (measure 0) and its complement (measure 1). The integral is $1\cdot0+0\cdot1=0$ — the spikes have zero total width.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`For measurable $f\ge0$ on a measure space $(X,\mathcal{A},\mu)$, define $\int_X f\,d\mu=\sup\{\int_X s\,d\mu:0\le s\le f,\ s\text{ simple}\}\in[0,\infty]$. For general measurable $f$, write $f=f^+-f^-$ and call $f$ **integrable** if $\int f^+,\int f^-<\infty$, i.e. $\int|f|\,d\mu<\infty$; then $\int f=\int f^+-\int f^-.$` },
      { kind: 'math', latex: String.raw`$f\ \text{integrable}\iff \int_X|f|\,d\mu<\infty,\qquad \left|\int_X f\,d\mu\right|\le\int_X|f|\,d\mu.$`, display: true },
      { kind: 'list', items: [
        String.raw`Linearity: $\int(af+bg)=a\int f+b\int g$ for integrable $f,g$.`,
        String.raw`Monotonicity: if $f\le g$ a.e. then $\int f\le\int g$.`,
        String.raw`$\int f=0$ with $f\ge0$ iff $f=0$ almost everywhere.`,
        String.raw`Changing $f$ on a null set does not change its integral.`
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`We derive the monotone convergence theorem (MCT) from the definition. The full proof is p3-der-mct.` },
      { kind: 'steps', title: 'Monotone convergence from the definition', items: [
        { title: 'Setup', text: String.raw`Let $0\le f_1\le f_2\le\cdots$ be measurable with $f_n\uparrow f$ pointwise (or a.e.). Then $\int f_n\le\int f$, so $\lim_n\int f_n\le\int f$.`, math: String.raw`$\lim_{n}\int f_n\,d\mu\le\int f\,d\mu.$` },
        { title: 'Approximate the limit from below', text: String.raw`Fix a simple $s$ with $0\le s\le f$ and $0<c<1$. Let $A_n=\{x:s(x)\le c f_n(x)\}$; then $A_n\uparrow X$ because $f_n\uparrow f\ge s$ and $c<1$.`, math: String.raw`$A_n=\{s\le c f_n\}\uparrow X.$` },
        { title: 'Continuity of measure from below', text: String.raw`Then $\int f_n\ge\int_{A_n} f_n\ge c\int_{A_n}s$, and $\int_{A_n}s\uparrow\int s$ by continuity of $\mu$ from below for the simple function $s$.`, math: String.raw`$\lim_n\int f_n\ge c\int s\,d\mu.$` },
        { title: 'Supremum and limit', text: String.raw`Take the supremum over $s\le f$ and let $c\uparrow1$ to get $\lim_n\int f_n\ge\int f$; equality follows.`, math: String.raw`$\int_X f\,d\mu=\lim_{n\to\infty}\int_X f_n\,d\mu.$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — improper integral.** Let $f(x)=1/x^2$ on $[1,\infty)$ and $f_n=f\mathbf{1}_{[1,n]}$. Then $f_n\uparrow f$, each $f_n$ is integrable, and $\int f_n=\int_1^n x^{-2}dx=1-1/n\to1$. MCT gives $\int_1^\infty x^{-2}dx=1.$` },
      { kind: 'paragraph', text: String.raw`**Example 2 — Dirichlet function.** As above, $\int_{[0,1]}\mathbf{1}_{\mathbb{Q}}\,d\lambda=0$. This function is Lebesgue integrable but not Riemann integrable. **Example 3 — DCT needed.** If $f_n=n\mathbf{1}_{(0,1/n]}$, then $f_n\to0$ a.e. but $\int f_n=1\not\to0$: dominated convergence fails because no integrable $g$ dominates all $f_n$ (any such $g$ would need $g(x)\ge n$ on $(0,1/n]$ for all $n$, forcing a divergent integral near 0).` },
      { kind: 'math', latex: String.raw`$\int_1^\infty\frac{dx}{x^2}=\lim_{n\to\infty}\left(1-\frac1n\right)=1,\qquad \int_0^1\mathbf{1}_{\mathbb{Q}}\,d\lambda=0.$`, display: true, caption: 'MCT for an improper integral; the Dirichlet integral.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Fatou's lemma.** For measurable $f_n\ge0$, $\int\liminf_n f_n\,d\mu\le\liminf_n\int f_n\,d\mu$ — no domination or monotonicity required. **Dominated convergence theorem.** If $f_n\to f$ a.e., each $f_n$ measurable, and $|f_n|\le g$ a.e. for an integrable $g$, then $f$ is integrable and $\int f_n\to\int f$. Proof: apply Fatou to $g+f_n$ and $g-f_n$ and combine the two inequalities. **Fubini–Tonelli.** For $\sigma$-finite measure spaces, Tonelli permits exchanging order of integration for nonnegative functions; Fubini does so for absolutely integrable functions.` },
      { kind: 'callout', tone: 'warning', title: 'Check the hypotheses', text: String.raw`MCT requires monotonicity (or nonnegative increasing sequence) and measurability; DCT requires an integrable dominating function. Without them, $\int\lim f_n=\lim\int f_n$ can fail dramatically, as Example 3 shows.` },
      { kind: 'callout', tone: 'history', title: 'Lebesgue 1902', text: String.raw`Henri Lebesgue's thesis introduced the integral via simple functions and proved the dominated convergence theorem. The monotone convergence theorem was isolated later; together they form the backbone of twentieth-century analysis.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We approximate $\int_1^\infty x^{-2}dx$ by truncated integrals and estimate $\int_{[0,1]}\mathbf{1}_{\mathbb{Q}}$ conceptually by sampling at rational points (which always returns 0 — a nice illustration of measure zero).` },
      { kind: 'code', language: 'python', code: String.raw`import numpy as np
from fractions import Fraction
for n in (2, 10, 100, 1000):
    x = np.linspace(1, n, 200_000)
    approx = np.trapz(1/x**2, x)
    print(f'truncate at {n:4d}: integral ~ {approx:.6f}, exact partial 1-1/n = {1-1/n:.6f}')
# rational sample points in [0,1] all lie in the null set
rats = [Fraction(k, 1000) for k in range(1001)]
print('average of 1_Q on rational grid =', np.mean([1 for _ in rats]))`, caption: 'Truncated integrals converge to 1 by MCT.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Probability:** expectation is a Lebesgue integral; MCT and DCT justify exchanging limits and expectations.`,
        String.raw`**Fourier analysis:** convergence theorems for Fourier series and transforms live here.`,
        String.raw`**Partial differential equations:** weak solutions are defined via integrals against test functions.`,
        String.raw`**Financial mathematics:** option prices are expectations under a risk-neutral measure; DCT justifies limit calculations.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Almost everywhere is enough', text: String.raw`Equality a.e. suffices for integral equality; demanding pointwise equality everywhere is too strong. Conversely, a function equal to 0 a.e. can be unbounded on a null set — its integral is still 0.` },
      { kind: 'list', items: [
        String.raw`Integrability means $\int|f|<\infty$, not merely that $\int f$ exists as an improper Riemann integral.`,
        String.raw`DCT needs a *single* dominating function for the whole sequence.`,
        String.raw`Fubini can fail without absolute integrability; always check $\int|f|<\infty$.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Prove Fatou's lemma from MCT by considering $g_n=\inf_{k\ge n}f_k$.`,
        String.raw`Give a sequence $f_n\to0$ a.e. with $\int f_n\not\to0$ and explain which hypothesis fails.`,
        String.raw`Why is $\int\mathbf{1}_{\mathbb{Q}\cap[0,1]}=0$ even though the rationals are dense?`,
        String.raw`State Fubini versus Tonelli and explain the extra hypothesis in Fubini.`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`H. Lebesgue, "Intégrale, longueur, aire" (1902).`,
        String.raw`W. Rudin, *Real and Complex Analysis*, Chapter 2 — a compact rigorous treatment.`,
        String.raw`R. L. Wheeden and A. Zygmund, *Measure and Integral* — patient exposition.`
      ] }
    ]
  },
  {
    id: 'holomorphic-functions',
    title: 'Holomorphic Functions',
    branchId: 'complex-analysis',
    level: 'Undergraduate 3',
    summary: String.raw`Complex differentiability at every point of an open set is a far stronger condition than real differentiability: it forces analyticity, the Cauchy–Riemann equations, integral representation and rigidity theorems. Holomorphic functions are the central objects of complex analysis.`,
    prerequisites: ['derivatives', 'complex-numbers', 'multivariable-functions'],
    tags: ['complex-differentiable', 'cauchy-riemann', 'analytic', 'liouville'],
    status: 'Complete',
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`Differentiability over $\mathbb{C}$ uses the same limit definition as over $\mathbb{R}$, but the complex plane has many directions of approach. Requiring the limit to exist uniformly in all directions imposes a rigid structure that yields power series, contour integrals and surprising global theorems.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`A complex derivative must be the same whether we approach a point horizontally or vertically. Writing $f=u+iv$ with $z=x+iy$, this requirement becomes the Cauchy–Riemann equations $u_x=v_y$, $u_y=-v_x$ — a tight coupling between the real and imaginary parts.` },
      { kind: 'callout', tone: 'intuition', title: 'Rigidity', text: String.raw`A holomorphic function is analytic: it has a convergent power series expansion around every point. This is false for real differentiable functions, which can be differentiable once but nowhere twice.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`A holomorphic map preserves angles (it is conformal where $f'\ne0$) and locally looks like a rotation plus scaling. The Cauchy–Riemann equations say the Jacobian matrix has the form $\begin{pmatrix}a&-b\\ b&a\end{pmatrix}$ — exactly multiplication by the complex number $a+ib$.` },
      { kind: 'math', latex: String.raw`$J_f=\begin{pmatrix}u_x&u_y\\ v_x&v_y\end{pmatrix}=\begin{pmatrix}a&-b\\ b&a\end{pmatrix}\ \Longleftrightarrow\ u_x=v_y,\ u_y=-v_x$`, display: true, caption: 'The Cauchy–Riemann equations as a complex-linear Jacobian.' },
      { kind: 'callout', tone: 'visual', title: 'Harmonic partners', text: String.raw`If $f=u+iv$ is holomorphic then $u$ and $v$ are harmonic: $\Delta u=\Delta v=0$ (given continuous second partials). They are harmonic conjugates; level curves of $u$ and $v$ intersect at right angles.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`$f$ is **complex differentiable at $z_0$** if $\lim_{h\to0}\frac{f(z_0+h)-f(z_0)}{h}$ exists in $\mathbb{C}$; it is **holomorphic on an open set $U$** if differentiable at every point of $U$. The derivative is $f'(z)=u_x+iv_x$. Polynomials, $e^z$, $\sin z$ (defined by power series) and $1/z$ on $\mathbb{C}\setminus\{0\}$ are holomorphic.` },
      { kind: 'math', latex: String.raw`$f'(z_0)=\lim_{h\to0}\frac{f(z_0+h)-f(z_0)}{h},\qquad u_x=v_y,\quad u_y=-v_x$`, display: true },
      { kind: 'table', headers: ['Function', 'Holomorphic where?', 'Derivative', 'Notes'], rows: [
        [String.raw`$z^n$`, String.raw`All of $\mathbb{C}$`, String.raw`$nz^{n-1}$`, String.raw`Entire`],
        [String.raw`$e^z$`, String.raw`All of $\mathbb{C}$`, String.raw`$e^z$`, String.raw`Entire, $2\pi i$-periodic`],
        [String.raw`$1/z$`, String.raw`$\mathbb{C}\setminus\{0\}$`, String.raw`$-1/z^2$`, String.raw`Pole at 0`],
        [String.raw`$\overline{z}$`, String.raw`Nowhere`, String.raw`—`, String.raw`Fails CR everywhere`],
        [String.raw`$|z|^2$`, String.raw`Nowhere (differentiable only at 0)`, String.raw`—`, String.raw`Fails CR except at 0`]
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`We derive the Cauchy–Riemann equations by comparing difference quotients along two directions.` },
      { kind: 'steps', title: 'Cauchy–Riemann from directional limits', items: [
        { title: 'Approach horizontally', text: String.raw`Let $h$ be real. The quotient tends to $\partial f/\partial x=u_x+iv_x$.`, math: String.raw`$\lim_{h\to0,h\in\mathbb{R}}\frac{f(z+h)-f(z)}{h}=u_x+iv_x.$` },
        { title: 'Approach vertically', text: String.raw`Let $h=it$ with $t$ real. The quotient tends to $\frac1i\partial f/\partial y=-i(u_y+iv_y)=v_y-iu_y$.`, math: String.raw`$\lim_{t\to0}\frac{f(z+it)-f(z)}{it}=v_y-iu_y.$` },
        { title: 'Equate', text: String.raw`Complex differentiability forces the two limits to coincide; equating real and imaginary parts gives CR.`, math: String.raw`$u_x=v_y,\qquad u_y=-v_x.$` },
        { title: 'Sufficiency', text: String.raw`Conversely, if $u,v$ have **continuous** partial derivatives in a neighbourhood and CR hold, then $f$ is differentiable there: write $\Delta f=u_x\Delta x+u_y\Delta y+i(v_x\Delta x+v_y\Delta y)+o(|h|)$ and use CR to factor as $(u_x+iv_x)(\Delta x+i\Delta y)+o(|h|)$.`, math: String.raw`$f'(z)=u_x+iv_x.$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — $f(z)=z^2$.** Then $u=x^2-y^2$, $v=2xy$. Check: $u_x=2x=v_y$, $u_y=-2y=-v_x$. CR hold everywhere and partials are continuous, so $f$ is entire with $f'=2x+2iy=2z.$` },
      { kind: 'paragraph', text: String.raw`**Example 2 — $f(z)=|z|^2=x^2+y^2$.** Here $u=x^2+y^2$, $v=0$. CR require $2x=0$ and $2y=0$, so they hold only at $z=0$. Indeed $f$ is complex differentiable at $0$ (since $|f(h)-f(0)|/|h|=|h|\to0$) but holomorphic on no open set.` },
      { kind: 'math', latex: String.raw`$z^2:\ u_x=2x=v_y,\ u_y=-2y=-v_x\ \checkmark;\qquad |z|^2:\ \mathrm{CR}\ \text{only at }0.$`, display: true, caption: 'Two contrasting CR checks.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Cauchy integral formula.** If $f$ is holomorphic inside and on a simple closed contour $\gamma$ (positively oriented) and $z_0$ is inside $\gamma$, then $f(z_0)=\frac{1}{2\pi i}\oint_\gamma\frac{f(z)}{z-z_0}\,dz$. This implies $f$ is infinitely differentiable and analytic. **Liouville.** A bounded entire function is constant (Cauchy estimates give $|f'(z)|\le M/R$ for all $R$). **Identity theorem.** If $f,g$ are holomorphic on a connected open set $U$ and agree on a set with a limit point in $U$, then $f\equiv g$. **Maximum modulus.** A nonconstant holomorphic function on a bounded domain cannot attain its maximum modulus in the interior.` },
      { kind: 'callout', tone: 'warning', title: 'Connectedness and boundedness matter', text: String.raw`The identity theorem needs a *connected* domain; on disconnected domains functions can agree on one component and differ on another. Maximum modulus needs a bounded domain and continuity up to the boundary for the boundary version. Liouville needs boundedness — $e^z$ is entire but unbounded and nonconstant.` },
      { kind: 'callout', tone: 'history', title: 'Cauchy and Riemann', text: String.raw`Augustin-Louis Cauchy proved the integral theorems in the 1820s; Bernhard Riemann's 1851 thesis characterised differentiability via the equations that now bear his name. The equivalence of holomorphic and analytic was established through Weierstrass's power-series approach.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We use SymPy to verify Cauchy–Riemann symbolically for several functions.` },
      { kind: 'code', language: 'python', code: String.raw`import sympy as sp
x, y = sp.symbols('x y', real=True)
z = x + sp.I*y
for name, f in [('z**2', z**2), ('exp(z)', sp.exp(z)), ('abs(z)**2', x**2+y**2), ('conjugate(z)', x-sp.I*y)]:
    f = sp.expand_complex(f)
    u, v = sp.re(f), sp.im(f)
    cr1 = sp.simplify(sp.diff(u,x)-sp.diff(v,y))
    cr2 = sp.simplify(sp.diff(u,y)+sp.diff(v,x))
    print(f'{name:12s} CR residuals: {cr1}, {cr2}')`, caption: 'Symbolic CR residuals: zero means satisfied.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Fluid dynamics:** holomorphic functions model incompressible, irrotational 2D flows via complex potentials.`,
        String.raw`**Electrostatics:** equipotential lines and field lines form harmonic conjugates.`,
        String.raw`**Signal processing:** analytic signals use the Hilbert transform to build holomorphic extensions.`,
        String.raw`**Conformal mapping:** solve Laplace equations on complicated domains by mapping to disks.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'CR alone is not sufficient', text: String.raw`The Cauchy–Riemann equations at a single point do not imply complex differentiability there; continuity of the partials in a neighbourhood (or a stronger hypothesis) is needed. Likewise, satisfying CR on a set with empty interior does not make a function holomorphic.` },
      { kind: 'list', items: [
        String.raw`Holomorphic means differentiable on an *open set*, not merely at one point.`,
        String.raw`$|f|$ holomorphic implies $f$ constant on connected domains (by maximum modulus).`,
        String.raw`Complex differentiability is much stronger than real differentiability of $(u,v)$.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Prove that CR plus continuity of partials implies complex differentiability.`,
        String.raw`Show that $e^z$ is holomorphic and find where it is not injective.`,
        String.raw`Why can't a nonconstant entire function be bounded?`,
        String.raw`Give an example of two functions agreeing on a real interval but not identical on $\mathbb{C}$.`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`L. Ahlfors, *Complex Analysis*, 3rd ed. — the classic text.`,
        String.raw`J. B. Conway, *Functions of One Complex Variable I*.`,
        String.raw`T. Needham, *Visual Complex Analysis* — geometric intuition.`
      ] }
    ]
  },
  {
    id: 'residue-theorem',
    title: 'Residue Theorem',
    branchId: 'complex-analysis',
    level: 'Master’s',
    summary: String.raw`The residue theorem reduces contour integrals to local data at isolated singularities: the integral around a closed curve equals $2\pi i$ times the sum of residues inside. It evaluates real integrals, sums series and underpins the argument principle.`,
    prerequisites: ['holomorphic-functions', 'laurent-series', 'contour-integration'],
    tags: ['residue', 'laurent-series', 'contour-integral', 'singularity'],
    status: 'Complete',
    derivationIds: ['p3-der-residue'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`Many real integrals and infinite sums are intractable by elementary calculus but become routine when viewed as contour integrals in the complex plane. The residue theorem converts a global integral into a finite algebraic sum of local coefficients.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`Around an isolated singularity, a holomorphic function has a Laurent expansion $\sum_{n=-\infty}^{\infty}a_n(z-z_0)^n$. Only the coefficient $a_{-1}$ survives integration around a closed loop, because $\oint (z-z_0)^n dz=0$ for every $n\ne-1$ and equals $2\pi i$ for $n=-1$.` },
      { kind: 'callout', tone: 'intuition', title: 'Why $n=-1$ is special', text: String.raw`Parametrise $z=z_0+re^{it}$: $(z-z_0)^n dz=i r^{n+1}e^{i(n+1)t}dt$. Integrating over $t\in[0,2\pi]$ kills all frequencies except $n=-1$, where the integrand is constant $i$ and the integral is $2\pi i$.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`Draw a simple closed contour $\gamma$ enclosing a few isolated singularities marked as points. Shrink $\gamma$ to small circles around each singularity; the connecting cuts cancel because the function is holomorphic between them. Each small circle contributes $2\pi i$ times its residue.` },
      { kind: 'math', latex: String.raw`$\oint_\gamma f\,dz=\sum_{k}\oint_{C_k} f\,dz=2\pi i\sum_k \operatorname{Res}(f,z_k)$`, display: true, caption: 'Deforming the contour to small circles around singularities.' },
      { kind: 'callout', tone: 'visual', title: 'Orientation matters', text: String.raw`The theorem assumes $\gamma$ is positively oriented (counterclockwise). Reversing orientation multiplies the integral by $-1$; multiplying the winding number by $m$ multiplies the result by $m$.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`An isolated singularity $z_0$ is **removable** if the Laurent series has no negative powers; a **pole of order $m$** if the lowest power is $(z-z_0)^{-m}$; **essential** if infinitely many negative powers occur. The **residue** is $\operatorname{Res}(f,z_0)=a_{-1}$, the coefficient of $(z-z_0)^{-1}$.` },
      { kind: 'math', latex: String.raw`$\operatorname{Res}(f,z_0)=\frac{1}{2\pi i}\oint_{|z-z_0|=r}f(z)\,dz=\frac{1}{(m-1)!}\lim_{z\to z_0}\frac{d^{m-1}}{dz^{m-1}}\bigl[(z-z_0)^m f(z)\bigr]\ \text{(pole of order }m\text{)}.$`, display: true },
      { kind: 'list', items: [
        String.raw`For a simple pole: $\operatorname{Res}(f,z_0)=\lim_{z\to z_0}(z-z_0)f(z)$; for $f=p/q$ with $q(z_0)=0\ne q'(z_0)$: $\operatorname{Res}=p(z_0)/q'(z_0)$.`,
        String.raw`The residue at infinity is defined so that the sum of all residues on the Riemann sphere is zero.`,
        String.raw`The theorem requires finitely many singularities inside $\gamma$, none on $\gamma$, and $f$ holomorphic on a neighbourhood of the contour and its interior except at those points.`
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`We outline the proof; a full treatment is p3-der-residue.` },
      { kind: 'steps', title: 'Proof outline of the residue theorem', items: [
        { title: 'Isolate the singularities', text: String.raw`Let $z_1,\dots,z_k$ be the singularities inside $\gamma$. Draw small disjoint circles $C_j$ around them and cut corridors from $\gamma$ to each $C_j$; on the resulting simply connected domain $f$ is holomorphic.`, math: String.raw`$\oint_\gamma f=\sum_j\oint_{C_j}f\ \text{(corridor contributions cancel)}.$` },
        { title: "Apply Cauchy's theorem", text: String.raw`The boundary of the cut domain consists of $\gamma$, the small circles (negatively oriented relative to the domain) and the two sides of the cuts. Cauchy's theorem gives zero total integral, so the outer contour equals the sum of small-circle integrals.`, math: String.raw`$\oint_\gamma f\,dz=\sum_j\oint_{C_j}f\,dz.$` },
        { title: 'Extract the Laurent coefficient', text: String.raw`On each small circle, $f(z)=\sum_{n\ge -m_j}a_n^{(j)}(z-z_j)^n$ converges uniformly; integrate termwise. All terms vanish except $n=-1$.`, math: String.raw`$\oint_{C_j} f\,dz=2\pi i\,a_{-1}^{(j)}=2\pi i\,\operatorname{Res}(f,z_j).$` },
        { title: 'Combine', text: String.raw`Summing over $j$ gives the theorem.`, math: String.raw`$\oint_\gamma f\,dz=2\pi i\sum_{j=1}^k\operatorname{Res}(f,z_j).$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — circular contour.** Evaluate $\oint_{|z|=2}\frac{z}{z^2+1}\,dz$. Poles at $z=\pm i$ lie inside. For the simple pole at $i$: $\operatorname{Res}=\frac{z}{z+i}\big|_{z=i}=\frac{i}{2i}=\frac12$; at $-i$: $\frac{z}{z-i}\big|_{z=-i}=\frac{-i}{-2i}=\frac12$. Sum $=1$, so` },
      { kind: 'math', latex: String.raw`$\oint_{|z|=2}\frac{z}{z^2+1}\,dz=2\pi i\left(\frac12+\frac12\right)=2\pi i.$`, display: true, caption: 'A contour integral from two simple residues.' },
      { kind: 'paragraph', text: String.raw`**Example 2 — real integral.** $\int_{-\infty}^{\infty}\frac{dx}{(x^2+1)^2}$. Close the contour in the upper half-plane with a large semicircle (the arc vanishes as its length grows like $R$ while the integrand decays like $R^{-4}$). The only pole inside is a double pole at $i$: $\operatorname{Res}=\frac{d}{dz}\left[\frac{1}{(z+i)^2}\right]_{z=i}=-\frac{2}{(2i)^3}=-\frac{2}{-8i}=\frac{1}{4i}=-\frac{i}{4}.$ Hence the integral is $2\pi i(-i/4)=\pi/2.$` },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Argument principle.** If $f$ is meromorphic inside and on a simple closed contour $\gamma$ with no zeros or poles on $\gamma$, then $\frac{1}{2\pi i}\oint_\gamma\frac{f'(z)}{f(z)}dz=N-P$, the number of zeros minus poles (with multiplicity) inside. **Rouché's theorem.** If $|g|<|f|$ on $\gamma$ and $f,g$ holomorphic inside, then $f$ and $f+g$ have the same number of zeros inside. Both follow by applying the residue theorem to logarithmic derivatives.` },
      { kind: 'callout', tone: 'history', title: "Cauchy's residues", text: String.raw`Augustin-Louis Cauchy introduced residues in 1826; Karl Weierstrass and Bernhard Riemann developed Laurent expansions (1843) and the geometric viewpoint. The theorem is a crown jewel of nineteenth-century analysis.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We verify the contour integral numerically by parametrising $|z|=2$.` },
      { kind: 'code', language: 'python', code: String.raw`import numpy as np
t = np.linspace(0, 2*np.pi, 2_000_000, endpoint=False)
z = 2*np.exp(1j*t)
dz = 1j*z*(2*np.pi/2_000_000)
val = np.trapz(z/(z**2+1)*dz, t)
print('numeric contour integral =', val)
print('exact 2*pi*i =', 2j*np.pi)

# real integral check via quadrature
from scipy.integrate import quad  # if available; otherwise use mpmath
try:
    print('real integral =', quad(lambda x: 1/(x*x+1)**2, -np.inf, np.inf)[0], ' target pi/2 =', np.pi/2)
except Exception as e:
    print('scipy unavailable')`, caption: 'Numerical contour integration matches the residue calculation.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Engineering:** inverse Laplace and Fourier transforms via Bromwich contours and residues.`,
        String.raw`**Number theory:** contour methods in analytic number theory (e.g. Perron's formula).`,
        String.raw`**Control theory:** the Nyquist criterion counts poles via argument-principle ideas.`,
        String.raw`**Quantum field theory:** Feynman integrals evaluated by residue techniques in simple cases.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Singularities on the contour', text: String.raw`The theorem does not apply if a singularity lies on $\gamma$; the integral may not exist as a contour integral. Such cases require indentation (principal value) arguments. Also, an essential singularity still has a well-defined residue — the coefficient of $(z-z_0)^{-1}$ — but no finite-order formula applies.` },
      { kind: 'list', items: [
        String.raw`The winding number is not always 1; only simple positively oriented curves give the naive sum.`,
        String.raw`For a pole of order $m$, the derivative formula requires the $(m-1)$-th derivative, not $m$-th.`,
        String.raw`Closing contours requires showing the arc integral vanishes; magnitude bounds alone can fail.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Prove that the sum of all residues on the Riemann sphere is zero.`,
        String.raw`Compute $\oint_{|z|=1}\frac{e^z}{z^3}\,dz$ using the derivative formula.`,
        String.raw`State the argument principle and derive Rouché's theorem from it.`,
        String.raw`Why does $\oint (z-z_0)^n dz$ vanish for $n\ne-1$?`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`L. Ahlfors, *Complex Analysis*, Chapter 4 — residues and applications.`,
        String.raw`J. B. Conway, *Functions of One Complex Variable I*, Chapter 4.`,
        String.raw`T. Needham, *Visual Complex Analysis*, Chapter 8 — the residue theorem visually.`
      ] }
    ]
  },
  {
    id: 'banach-spaces',
    title: 'Banach Spaces',
    branchId: 'functional-analysis',
    level: 'Master’s',
    summary: String.raw`A Banach space is a normed vector space complete in the metric induced by its norm. Completeness powers the four great theorems — uniform boundedness, open mapping, closed graph and Hahn–Banach — and makes fixed-point and operator methods rigorous.`,
    prerequisites: ['metric-spaces', 'vector-spaces', 'linear-transformations'],
    tags: ['complete-normed-space', 'bounded-operator', 'uniform-boundedness', 'hahn-banach'],
    status: 'Complete',
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`Infinite-dimensional spaces of functions need a notion of convergence and completeness to support analysis. Banach spaces provide the setting where limits of Cauchy sequences of functions stay in the space, enabling the study of operators, spectra and differential equations.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`A norm is a length function compatible with the vector-space structure; completeness says every sequence that ought to converge (Cauchy) actually has a limit inside the space. Together they let us do calculus with functions as points.` },
      { kind: 'callout', tone: 'intuition', title: 'Norm matters', text: String.raw`The same vector space can be Banach under one norm and incomplete under another: $C[0,1]$ is complete for $\|f\|_\infty$ but not for $\|f\|_1$. Completeness is a property of the normed space, not just the vector space.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`Unit balls reveal the geometry: in $\ell^1$ the ball is a diamond-like polytope, in $\ell^\infty$ a cube, in $\ell^2$ a smooth sphere. All are convex and symmetric; only in finite dimensions are they compact — an infinite-dimensional locally compact normed space must be finite-dimensional.` },
      { kind: 'math', latex: String.raw`$\|x\|_1=\sum_i|x_i|,\qquad \|x\|_2=\sqrt{\sum_i|x_i|^2},\qquad \|x\|_\infty=\sup_i|x_i|$`, display: true, caption: 'Three norms on sequence spaces.' },
      { kind: 'callout', tone: 'visual', title: 'Why the unit ball is not compact', text: String.raw`In $\ell^2$ the sequence of standard basis vectors $e_n$ satisfies $\|e_n\|=1$ and $\|e_n-e_m\|=\sqrt2$ for $n\ne m$; it has no Cauchy subsequence. Riesz's lemma generalises this to every infinite-dimensional normed space.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`A **norm** on a vector space $X$ satisfies $\|x\|\ge0$, $\|x\|=0\iff x=0$, $\|\lambda x\|=|\lambda|\|x\|$, and $\|x+y\|\le\|x\|+\|y\|$. The metric $d(x,y)=\|x-y\|$ makes $X$ a metric space; if it is complete, $(X,\|\cdot\|)$ is a **Banach space**. A linear map $T:X\to Y$ is bounded iff $\|T\|:=\sup_{\|x\|\le1}\|Tx\|<\infty$, which for linear maps is equivalent to continuity.` },
      { kind: 'math', latex: String.raw`$\|T\|=\sup_{x\ne0}\frac{\|Tx\|}{\|x\|},\qquad \|Tx\|\le\|T\|\,\|x\|$`, display: true },
      { kind: 'table', headers: ['Space', 'Norm', 'Banach?', 'Notes'], rows: [
        [String.raw`$\mathbb{R}^n$`, String.raw`Any norm`, String.raw`Yes`, String.raw`All norms equivalent`],
        [String.raw`$C[K]$`, String.raw`$\|\cdot\|_\infty$`, String.raw`Yes`, String.raw`Uniform limits of continuous functions`],
        [String.raw`$C[0,1]$`, String.raw`$\|\cdot\|_1$`, String.raw`No`, String.raw`Completion is $L^1[0,1]$`],
        [String.raw`$\ell^p,\ 1\le p\le\infty$`, String.raw`$\|\cdot\|_p$`, String.raw`Yes`, String.raw`Sequence spaces`],
        [String.raw`$L^p,\ 1\le p\le\infty$`, String.raw`$\|\cdot\|_p$`, String.raw`Yes`, String.raw`Functions modulo a.e. equality`]
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`We prove that $C[0,1]$ is complete under the sup norm and incomplete under the $L^1$ norm.` },
      { kind: 'steps', title: 'Completeness checks', items: [
        { title: 'Sup norm: Cauchy ⇒ uniform limit', text: String.raw`If $(f_n)$ is Cauchy in $\|\cdot\|_\infty$, then for each $x$, $(f_n(x))$ is Cauchy in $\mathbb{R}$, so define $f(x)=\lim_n f_n(x)$.`, math: String.raw`$|f_n(x)-f_m(x)|\le\|f_n-f_m\|_\infty.$` },
        { title: 'Uniform convergence', text: String.raw`Given $\varepsilon$, choose $N$ with $\|f_n-f_m\|_\infty<\varepsilon$ for $m,n\ge N$ and let $m\to\infty$: $\|f_n-f\|_\infty\le\varepsilon$. Thus $f_n\to f$ uniformly.`, math: String.raw`$\|f_n-f\|_\infty\le\varepsilon\ \text{for }n\ge N.$` },
        { title: 'Continuity of the limit', text: String.raw`Uniform limits of continuous functions are continuous (the $\varepsilon/3$ argument), so $f\in C[0,1]$. Hence completeness.`, math: String.raw`$f\in C[0,1].$` },
        { title: '$L^1$ norm: a Cauchy sequence escaping', text: String.raw`Let $f_n$ be continuous, equal to 0 on $[0,1/2]$, 1 on $[1/2+1/n,1]$ and linear between. Then $\|f_n-f_m\|_1\le1/n+1/m\to0$, but the pointwise limit is the discontinuous step function $\mathbf{1}_{(1/2,1]}$, which is not in $C[0,1]$. No continuous $L^1$-limit exists.`, math: String.raw`$\|f_n-f_m\|_1\to0\ \text{but no limit in }C[0,1].$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — operator norm.** On $C[0,1]$ with sup norm, define $(Tf)(x)=\int_0^x f(t)\,dt$. Then $|Tf(x)|\le\int_0^1|f|\le\|f\|_\infty$, so $\|T\|\le1$. Taking $f\equiv1$ gives $Tf(x)=x$ with $\|Tf\|_\infty=1$, hence $\|T\|=1.$` },
      { kind: 'paragraph', text: String.raw`**Example 2 — contraction.** The integral operator $(Sf)(x)=\frac12\int_0^1\sin(\pi x)f(t)dt$ has rank one and $\|S\|=\frac12\sup_x|\sin(\pi x)|=\frac12<1$ (take $f\equiv1$ for equality), so Banach's fixed point theorem gives a unique solution of $f=Sf$ (namely $f=0$).` },
      { kind: 'math', latex: String.raw`$\|T\|=1,\qquad \|S\|=1/2<1\ \Rightarrow\ S\ \text{has a unique fixed point.}$`, display: true, caption: 'Operator norms and a contraction.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Uniform boundedness principle.** If $X$ is Banach, $Y$ normed, and $\{T_\alpha\}$ is a family of bounded linear operators with $\sup_\alpha\|T_\alpha x\|<\infty$ for each $x$, then $\sup_\alpha\|T_\alpha\|<\infty$. Proof uses the Baire category theorem on the closed sets $E_n=\{x:\sup_\alpha\|T_\alpha x\|\le n\}$. **Open mapping theorem.** A surjective bounded linear map between Banach spaces is open. **Closed graph theorem.** A linear operator between Banach spaces with closed graph is bounded. **Hahn–Banach.** A bounded linear functional on a subspace extends to the whole space with the same norm (uses Zorn's lemma in general).` },
      { kind: 'callout', tone: 'warning', title: 'Completeness is essential', text: String.raw`The uniform boundedness principle and open mapping theorem fail if the domain is not complete. For example, on the incomplete space of polynomials with sup norm, pointwise-bounded operator families can have unbounded norms.` },
      { kind: 'callout', tone: 'history', title: "Banach's 1922 thesis", text: String.raw`Stefan Banach axiomatised normed linear spaces in his 1922 doctoral thesis and proved the contraction mapping and uniform boundedness theorems. The subject was further shaped by Hahn, Banach, Mazur and others in the 1920s–30s.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We approximate the ramp sequence $f_n$ and check that the $L^1$ distances shrink while the sup-norm distance stays at 1.` },
      { kind: 'code', language: 'python', code: String.raw`import numpy as np
grid = np.linspace(0,1,10001)
def f(n):
    return np.piecewise(grid, [grid<=0.5, (grid>0.5)&(grid<0.5+1/n), grid>=0.5+1/n],
                        [0.0, lambda x:(x-0.5)*n, 1.0])
for n in (10,100,1000):
    fn, f2n = f(n), f(2*n)
    print(f'n={n:4d}  L1 dist={np.trapz(abs(fn-f2n),grid):.5f}  sup dist={np.abs(fn-f2n).max():.3f}')`, caption: 'Cauchy in L1, not in sup norm.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Differential equations:** Banach fixed point proves Picard–Lindelöf existence and uniqueness.`,
        String.raw`**Numerical analysis:** convergence of iterative methods via contraction estimates.`,
        String.raw`**Quantum mechanics:** states live in Hilbert spaces, a special Banach space.`,
        String.raw`**Optimisation:** duality theory uses Hahn–Banach separation.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Bounded ≠ finite-dimensional', text: String.raw`A bounded linear operator on an infinite-dimensional space need not be compact: the identity operator has norm 1 but the unit ball is not relatively compact. Compactness requires additional hypotheses.` },
      { kind: 'list', items: [
        String.raw`All linear maps between finite-dimensional normed spaces are bounded; not so in infinite dimensions.`,
        String.raw`Completeness depends on the norm, not just the vector space.`,
        String.raw`Hahn–Banach extension is not necessarily unique unless the space is strictly convex.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Prove that a finite-dimensional normed space is complete.`,
        String.raw`Show that the identity map from $(C[0,1],\|\cdot\|_\infty)$ to $(C[0,1],\|\cdot\|_1)$ is bounded but its inverse is not.`,
        String.raw`State the uniform boundedness principle and explain where Baire category is used.`,
        String.raw`Why does the closed graph theorem need completeness of both spaces?`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`E. Kreyszig, *Introductory Functional Analysis with Applications*.`,
        String.raw`W. Rudin, *Functional Analysis* — the four great theorems in Chapter 5.`,
        String.raw`S. Banach, *Théorie des opérations linéaires* (1932) — the original monograph.`
      ] }
    ]
  },
  {
    id: 'hilbert-spaces',
    title: 'Hilbert Spaces',
    branchId: 'functional-analysis',
    level: 'Master’s',
    summary: String.raw`A Hilbert space is a complete inner-product space: geometry — angles, orthogonality, projection — survives in infinite dimensions. Orthonormal bases, Parseval's identity, the projection theorem and the Riesz representation theorem make Hilbert spaces the natural home of Fourier analysis and quantum mechanics.`,
    prerequisites: ['banach-spaces', 'inner-product-spaces', 'spectral-theorem'],
    tags: ['inner-product', 'orthogonality', 'parseval', 'projection'],
    status: 'Complete',
    derivationIds: ['p3-der-cauchy-schwarz'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`In a general Banach space there is no notion of angle. Many problems — least squares, Fourier series, quantum states — need orthogonality and projection. Hilbert spaces supply an inner product compatible with a complete norm, giving the full Euclidean geometry in infinite dimensions.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`An inner product generalises the dot product: it measures how much two vectors point in the same direction. It induces a norm via $\|x\|=\sqrt{\langle x,x\rangle}$, and the parallelogram law characterises exactly which Banach norms come from an inner product.` },
      { kind: 'callout', tone: 'intuition', title: 'Projection is best approximation', text: String.raw`Given a closed subspace $M$ and a point $x$, the closest point of $M$ is the orthogonal projection $P_Mx$; the error $x-P_Mx$ is perpendicular to every vector in $M$. This single fact underlies least squares, Fourier truncation and conditional expectation.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`Picture a plane in 3-space and a point above it: the shortest route to the plane is perpendicular. In $L^2[-\pi,\pi]$, the trigonometric functions $\frac{1}{\sqrt\pi}\sin nx$ and $\frac{1}{\sqrt\pi}\cos nx$ form an orthonormal set — mutually perpendicular "axes" — and Fourier coefficients are coordinates along them.` },
      { kind: 'math', latex: String.raw`$\|x+y\|^2+\|x-y\|^2=2\|x\|^2+2\|y\|^2\quad\text{(parallelogram law)}$`, display: true, caption: 'A norm satisfies the parallelogram law iff it comes from an inner product (Jordan–von Neumann).' },
      { kind: 'callout', tone: 'visual', title: "Bessel's inequality", text: String.raw`For any orthonormal sequence $\{e_n\}$, $\sum_n|\langle x,e_n\rangle|^2\le\|x\|^2$; equality for all $x$ characterises a complete orthonormal system (a Hilbert basis), and then Parseval's identity holds.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`An **inner product** on a complex vector space $H$ is a map $\langle\cdot,\cdot\rangle:H\times H\to\mathbb{C}$ linear in the first argument, conjugate-symmetric ($\langle y,x\rangle=\overline{\langle x,y\rangle}$), positive and definite ($\langle x,x\rangle>0$ for $x\ne0$). With $\|x\|=\sqrt{\langle x,x\rangle}$, if $(H,\|\cdot\|)$ is complete then $H$ is a **Hilbert space**. Real Hilbert spaces use a symmetric bilinear form.` },
      { kind: 'math', latex: String.raw`$|\langle x,y\rangle|\le\|x\|\,\|y\|,\qquad \langle x,y\rangle=0\Rightarrow x\perp y$`, display: true },
      { kind: 'list', items: [
        String.raw`Finite-dimensional examples: $\mathbb{R}^n$, $\mathbb{C}^n$ with the standard dot product.`,
        String.raw`$\ell^2$ of square-summable sequences with $\langle x,y\rangle=\sum_i x_i\overline{y_i}$.`,
        String.raw`$L^2(X,\mu)$ of square-integrable functions modulo a.e. equality, with $\langle f,g\rangle=\int f\overline{g}\,d\mu$.`,
        String.raw`A Hilbert basis need not be countable in general; separability gives a countable one.`
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`We derive Cauchy–Schwarz and the projection theorem (the Cauchy–Schwarz proof is expanded in p3-der-cauchy-schwarz).` },
      { kind: 'steps', title: 'Cauchy–Schwarz and projection', items: [
        { title: 'Cauchy–Schwarz', text: String.raw`For $\lambda\in\mathbb{C}$, positivity of $\|x-\lambda y\|^2$ gives a quadratic inequality in $\lambda$; choosing $\lambda=\langle x,y\rangle/\|y\|^2$ (when $y\ne0$) yields $|\langle x,y\rangle|^2\le\|x\|^2\|y\|^2$.`, math: String.raw`$|\langle x,y\rangle|\le\|x\|\,\|y\|.$` },
        { title: 'Equality case', text: String.raw`Equality holds iff $x$ and $y$ are linearly dependent (the discriminant vanishes), a fact used throughout geometry and statistics.`, math: String.raw`$|\langle x,y\rangle|=\|x\|\|y\|\iff x=cy.$` },
        { title: 'Projection theorem', text: String.raw`For a closed subspace $M$ and $x\notin M$, let $d=\inf_{m\in M}\|x-m\|$, choose a minimising sequence $m_n$, and use the parallelogram law to show $(m_n)$ is Cauchy. Its limit $m^\ast\in M$ satisfies $\|x-m^\ast\|=d$, and $x-m^\ast\perp M$ (otherwise one could reduce the distance).`, math: String.raw`$x=P_Mx+(x-P_Mx),\qquad x-P_Mx\perp M.$` },
        { title: 'Riesz representation', text: String.raw`Every bounded linear functional $\varphi$ on a Hilbert space has the form $\varphi(x)=\langle x,y\rangle$ for a unique $y$ with $\|y\|=\|\varphi\|$: apply the projection theorem to $\ker\varphi$.`, math: String.raw`$H^\ast\cong H\ \text{(conjugate-linear isometry)}.$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — Fourier series of $f(x)=x$.** In $L^2[-\pi,\pi]$ with inner product $\langle f,g\rangle=\frac1\pi\int_{-\pi}^{\pi}f\overline g$, the sine functions $\sin nx$ are orthogonal with $\|\sin nx\|^2=1$. Since $x=2\sum_{n\ge1}\frac{(-1)^{n+1}}{n}\sin nx$, Parseval gives` },
      { kind: 'math', latex: String.raw`$\frac1\pi\int_{-\pi}^{\pi}x^2\,dx=\frac{2\pi^2}{3},\qquad \sum_{n=1}^{\infty}\left(\frac{2}{n}\right)^2=4\cdot\frac{\pi^2}{6}=\frac{2\pi^2}{3}\ \checkmark$`, display: true, caption: "Parseval's identity verifies the Basel sum." },
      { kind: 'paragraph', text: String.raw`**Example 2 — least squares.** In $\mathbb{R}^3$, project $b=(1,2,3)$ onto the plane spanned by $u=(1,0,0)$ and $v=(0,1,0)$: the projection is $(1,2,0)$ and the residual $(0,0,3)$ is orthogonal to the plane. The squared distance $9$ is minimal.` },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Spectral theorem (compact self-adjoint).** A compact self-adjoint operator on a Hilbert space has an orthonormal basis of eigenvectors and real eigenvalues accumulating only at $0$. **Parseval.** For a complete orthonormal system $\{e_n\}$, $\|x\|^2=\sum_n|\langle x,e_n\rangle|^2$ for all $x$; more generally the series converges in norm. **Riesz–Fischer.** Given square-summable coefficients, the series $\sum c_ne_n$ converges in $H$ — the converse direction of Parseval.` },
      { kind: 'callout', tone: 'history', title: 'Hilbert and von Neumann', text: String.raw`David Hilbert's work on integral equations (1904–1910) introduced $\ell^2$ and the word "Hilbert space"; John von Neumann axiomatised the concept in 1929 and developed the spectral theorem, providing the mathematical framework of quantum mechanics.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We verify Parseval numerically for $f(x)=x$ and check Cauchy–Schwarz on random vectors.` },
      { kind: 'code', language: 'python', code: String.raw`import numpy as np
x = np.linspace(-np.pi, np.pi, 500_001)
energy = np.trapz(x**2, x)/np.pi
N = 20000
n = np.arange(1, N+1)
coeffs = 2*(-1)**(n+1)/n
print('(1/pi) int x^2 =', energy, ' target 2*pi^2/3 =', 2*np.pi**2/3)
print('sum of Fourier coefficients^2 =', (coeffs**2).sum())
rng = np.random.default_rng(9)
a, b = rng.normal(size=100), rng.normal(size=100)
print('Cauchy-Schwarz ratio =', abs(a@b)/(np.linalg.norm(a)*np.linalg.norm(b)), '<= 1')`, caption: 'Parseval and Cauchy–Schwarz verified numerically.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Quantum mechanics:** states are unit vectors in a Hilbert space; observables are self-adjoint operators.`,
        String.raw`**Signal processing:** Fourier and wavelet transforms are expansions in orthonormal bases.`,
        String.raw`**Machine learning:** kernel methods embed data in reproducing kernel Hilbert spaces.`,
        String.raw`**Partial differential equations:** Sobolev spaces are Hilbert spaces used in weak formulations.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Inner-product conventions', text: String.raw`Mathematicians usually take the inner product linear in the first argument and conjugate-linear in the second; physicists use the opposite (Dirac bra–ket) convention. Both give the same norm, but formulas for adjoints change.` },
      { kind: 'list', items: [
        String.raw`Orthogonal $\ne$ orthonormal: unit norm must be checked separately.`,
        String.raw`An infinite orthonormal set need not be a basis; completeness is essential for Parseval.`,
        String.raw`Riesz representation needs completeness — it fails in general inner-product spaces.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Prove that the norm from an inner product satisfies the parallelogram law.`,
        String.raw`Show that equality in Cauchy–Schwarz implies linear dependence.`,
        String.raw`Explain why $L^2$ functions are equivalence classes, not pointwise functions.`,
        String.raw`State the spectral theorem for compact self-adjoint operators and the role of compactness.`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`P. Halmos, *Finite-Dimensional Vector Spaces* — the geometry behind Hilbert space.`,
        String.raw`W. Rudin, *Functional Analysis*, Chapters 4 and 12.`,
        String.raw`J. B. Conway, *A Course in Functional Analysis* — operators and spectra.`
      ] }
    ]
  },
  {
    id: 'topological-spaces',
    title: 'Topological Spaces',
    branchId: 'topology',
    level: 'Undergraduate 3',
    summary: String.raw`Topology replaces distance with open sets: a topology is a family closed under arbitrary unions and finite intersections. This minimal structure defines continuity, convergence, compactness and connectedness, and admits examples no metric can produce.`,
    prerequisites: ['set-theory', 'metric-spaces'],
    tags: ['open-sets', 'continuity', 'separation-axioms', 'homeomorphism'],
    status: 'Complete',
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`Metric spaces capture closeness through distance, but many important notions — continuity, convergence, connectedness — depend only on which sets are open. Topology isolates that structure and applies it to spaces with no natural metric.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`Specify the open sets and you specify the geometry. Continuity means preimages of open sets are open — a definition that uses no $\varepsilon$ and no distance. Homeomorphisms are the isomorphisms of topology: they preserve all topological properties.` },
      { kind: 'callout', tone: 'intuition', title: 'Finite intersections only', text: String.raw`Arbitrary unions of open sets are open, but only *finite* intersections need be: an infinite intersection of open intervals can collapse to a single point, which is not open in the usual topology.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`On a finite set, a topology can be drawn as a Venn-like diagram of open regions. The indiscrete topology $\{\varnothing,X\}$ sees no distinction between points; the discrete topology $2^X$ makes every subset open and every map continuous. Most interesting examples lie between.` },
      { kind: 'math', latex: String.raw`$\tau_{\text{indiscrete}}=\{\varnothing,X\},\qquad \tau_{\text{discrete}}=2^X,\qquad \bigcap_{n\ge1}\left(-\frac1n,\frac1n\right)=\{0\}\ \text{(not open)}$`, display: true, caption: 'Extreme topologies and why infinite intersections are excluded.' },
      { kind: 'callout', tone: 'visual', title: 'Cofinite topology', text: String.raw`On an infinite set, declare open sets to be $\varnothing$ and complements of finite sets. Any two nonempty open sets intersect, so the space is not Hausdorff — yet singletons are closed, so it is $T_1$. This cannot happen in a metric space.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`A **topology** on $X$ is $\tau\subseteq2^X$ with $\varnothing,X\in\tau$, arbitrary unions $\bigcup_\alpha U_\alpha\in\tau$, and finite intersections $U\cap V\in\tau$. Sets in $\tau$ are **open**; complements of open sets are **closed**. A map $f:X\to Y$ is continuous iff $f^{-1}(V)\in\tau_X$ for every $V\in\tau_Y$. A **homeomorphism** is a bijective continuous map with continuous inverse.` },
      { kind: 'math', latex: String.raw`$f\ \text{continuous}\iff f^{-1}(\text{open})\subseteq\text{open}\iff f^{-1}(\text{closed})\subseteq\text{closed}$`, display: true },
      { kind: 'list', items: [
        String.raw`A **basis** $\mathcal{B}$ generates a topology: open sets are unions of basis elements.`,
        String.raw`The **subspace topology** on $A\subseteq X$ is $\{A\cap U:U\in\tau_X\}$.`,
        String.raw`The **product topology** on $\prod X_i$ has basis $\prod U_i$ with $U_i=X_i$ for all but finitely many $i$.`,
        String.raw`Separation axioms: $T_0$ (points distinguishable), $T_1$ (singletons closed), $T_2$ Hausdorff (distinct points have disjoint neighbourhoods), $T_3$ regular, $T_4$ normal.`
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`We derive basic closure properties and the equivalence of continuity definitions.` },
      { kind: 'steps', title: 'Closure properties from the axioms', items: [
        { title: 'Closed sets', text: String.raw`Since $\varnothing,X$ are open, $X,\varnothing$ are closed. De Morgan's laws turn arbitrary unions of opens into arbitrary intersections of closed sets, and finite intersections of opens into finite unions of closed sets.`, math: String.raw`$X\setminus\bigcup_\alpha U_\alpha=\bigcap_\alpha(X\setminus U_\alpha).$` },
        { title: 'Closure of a set', text: String.raw`Define $\overline{A}=\bigcap\{F\supseteq A:F\text{ closed}\}$. It is closed (arbitrary intersection of closed sets) and is the smallest closed set containing $A$.`, math: String.raw`$x\in\overline{A}\iff \text{every neighbourhood of }x\text{ meets }A.$` },
        { title: 'Neighbourhood continuity', text: String.raw`If $f$ is continuous and $V$ is a neighbourhood of $f(x)$, take open $W$ with $f(x)\in W\subseteq V$; then $f^{-1}(W)$ is an open neighbourhood of $x$. Conversely, apply this to open $V$.`, math: String.raw`$f\ \text{continuous at }x\iff \forall V\ni f(x)\ \exists U\ni x: f(U)\subseteq V.$` },
        { title: 'Hausdorff uniqueness of limits', text: String.raw`In a Hausdorff space a net (or sequence) has at most one limit: two distinct limits would have disjoint neighbourhoods, which the net cannot eventually enter simultaneously.`, math: String.raw`$x_n\to x,\ x_n\to y\ \Rightarrow\ x=y\ \text{in Hausdorff spaces}.$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — cofinite topology.** Let $X=\mathbb{N}$ with $\tau=\{\varnothing\}\cup\{U:X\setminus U\text{ finite}\}$. Singletons $\{n\}$ are closed (their complements are open), so the space is $T_1$. But any two nonempty open sets have finite complements, hence intersect — so distinct points cannot be separated by disjoint open sets: not Hausdorff.` },
      { kind: 'paragraph', text: String.raw`**Example 2 — product topology.** In $\mathbb{R}^\mathbb{N}$ with the product topology, the set $\prod_n(-1,1)$ is open, but $\prod_n(-1/n,1/n)$ is **not** open, because infinitely many coordinates are restricted. This is why the product topology (not the box topology) is the right one for Tychonoff's theorem.` },
      { kind: 'math', latex: String.raw`$\tau_{\mathrm{cofinite}}\ \text{is }T_1\text{ but not Hausdorff};\qquad \prod_n(-1,1)\in\tau_{\mathrm{product}},\ \prod_n(-1/n,1/n)\notin\tau_{\mathrm{product}}.$`, display: true, caption: 'Two instructive non-metric behaviours.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Urysohn's lemma.** In a normal $T_1$ space, disjoint closed sets $A,B$ admit a continuous $f:X\to[0,1]$ with $f|_A=0$, $f|_B=1$. **Tietze extension.** A continuous real function on a closed subset of a normal space extends to the whole space. **Tychonoff.** Arbitrary products of compact spaces are compact — equivalent to the axiom of choice (as shown by Kelley).` },
      { kind: 'callout', tone: 'history', title: 'From metric to topological', text: String.raw`Felix Hausdorff defined topological spaces axiomatically in 1914; Kazimierz Kuratowski gave the closed-set axioms in 1922. The 1920s saw the separation axioms and the compactification theorems that make the subject a universal language.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We enumerate all topologies on a three-point set and check the axioms and separation properties computationally.` },
      { kind: 'code', language: 'python', code: String.raw`from itertools import combinations
X = frozenset({0,1,2})
subsets = [frozenset(s) for r in range(4) for s in combinations(X,r)]
def is_topology(tau):
    tau=set(tau)
    if frozenset() not in tau or X not in tau: return False
    for a in tau:
        for b in tau:
            if a|b not in tau or a&b not in tau: return False
    return True
tops=[]
for mask in range(1<<len(subsets)):
    tau=[subsets[i] for i in range(len(subsets)) if mask>>i&1]
    if is_topology(tau): tops.append(tau)
print('number of topologies on 3 points =', len(tops))
print('example topology =', [set(u) for u in tops[5]])`, caption: 'Brute-force enumeration of finite topologies.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Algebraic geometry:** the Zariski topology on algebraic varieties is typically non-Hausdorff.`,
        String.raw`**Computer science:** Scott topology models continuity in domain theory and denotational semantics.`,
        String.raw`**Digital topology:** adjacency structures on pixel grids use finite topologies.`,
        String.raw`**Data analysis:** topological data analysis studies shape via persistent homology.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Sequences can be insufficient', text: String.raw`In general topological spaces, sequences do not characterise closure or continuity — one needs nets or filters. A set can contain all sequential limits of its subsets without being closed. First-countable spaces (including all metric spaces) are safe.` },
      { kind: 'list', items: [
        String.raw`Every metric topology is Hausdorff, but not conversely.`,
        String.raw`A continuous bijection need not be a homeomorphism unless the domain is compact and codomain Hausdorff.`,
        String.raw`Closed and open are not exhaustive: sets may be both (clopen) or neither.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Verify the topology axioms for the cofinite topology on an infinite set.`,
        String.raw`Prove that a continuous image of a compact space is compact.`,
        String.raw`Give an example of a non-Hausdorff space occurring naturally in algebra or geometry.`,
        String.raw`Why does the product topology, not the box topology, use finitely many restricted coordinates?`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`J. Munkres, *Topology*, 2nd ed. — Chapters 2–3.`,
        String.raw`F. Hausdorff, *Grundzüge der Mengenlehre* (1914) — the original axioms.`,
        String.raw`S. Willard, *General Topology* — comprehensive reference.`
      ] }
    ]
  },
  {
    id: 'fundamental-groups',
    title: 'Fundamental Groups',
    branchId: 'topology',
    level: 'Master’s',
    summary: String.raw`The fundamental group records homotopy classes of loops with concatenation as multiplication, turning shape into an algebraic invariant. It distinguishes the circle from the sphere, is computed via covering spaces or the Seifert–van Kampen theorem, and is functorial for continuous maps.`,
    prerequisites: ['topological-spaces', 'groups', 'homotopy'],
    tags: ['homotopy', 'loops', 'winding-number', 'van-kampen'],
    status: 'Complete',
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`Two spaces can look different yet be homeomorphic, and homeomorphism is hard to prove or disprove directly. Algebraic topology assigns computable algebraic invariants; the fundamental group is the first and most geometric of them.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`Count how many essentially different ways a loop can wind around holes. On a circle, loops are classified by an integer winding number; on a sphere every loop can be shrunk to a point. A loop that cannot be contracted detects a hole.` },
      { kind: 'callout', tone: 'intuition', title: 'Homotopy as deformation', text: String.raw`Two loops are equivalent if one can be continuously deformed into the other while keeping the basepoint fixed. The group operation is "go around the first loop, then the second" — the order matters in general, giving potentially nonabelian groups.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`On a punctured plane $\mathbb{R}^2\setminus\{0\}$, a loop encircling the origin $n$ times cannot be untangled past the missing point. On the full plane it can. The universal cover $\mathbb{R}\to S^1$, $t\mapsto e^{2\pi it}$, unwinds the circle: a loop with winding number $n$ lifts to a path from $0$ to $n$.` },
      { kind: 'math', latex: String.raw`$\exp:\mathbb{R}\to S^1,\quad t\mapsto e^{2\pi it};\qquad \text{lift of loop of degree }n:\ \tilde\gamma(1)=\tilde\gamma(0)+n$`, display: true, caption: 'Winding number as a lift endpoint.' },
      { kind: 'callout', tone: 'visual', title: 'Nonabelian example', text: String.raw`The figure-eight space (wedge of two circles) has fundamental group $F_2$, the free group on two generators: loops around the left and right lobes cannot be commuted by any homotopy.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`For a path-connected space $X$ with basepoint $x_0$, $\pi_1(X,x_0)$ is the set of homotopy classes (relative to $\{0,1\}$) of loops $\gamma:[0,1]\to X$, $\gamma(0)=\gamma(1)=x_0$, with product $[\gamma][\delta]=[\gamma*\delta]$ (traverse $\gamma$ then $\delta$). The identity is the constant loop; the inverse is the reversed loop $\gamma^{-1}(t)=\gamma(1-t)$.` },
      { kind: 'math', latex: String.raw`$[\gamma][\delta]=[\gamma*\delta],\qquad [\gamma]^{-1}=[\overline\gamma],\qquad \pi_1(S^1)\cong\mathbb{Z},\quad \pi_1(S^n)=0\ (n\ge2)$`, display: true },
      { kind: 'list', items: [
        String.raw`Path-connected spaces with different basepoints have isomorphic groups (noncanonically; the isomorphism depends on a path, and differs by an inner automorphism).`,
        String.raw`A continuous $f:X\to Y$ induces $f_\ast:\pi_1(X,x_0)\to\pi_1(Y,f(x_0))$, a group homomorphism — functoriality.`,
        String.raw`Simply connected means path-connected with trivial fundamental group.`,
        String.raw`$\pi_1(X\times Y)\cong\pi_1(X)\times\pi_1(Y)$ for path-connected $X,Y$.`
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`We compute $\pi_1(S^1)$ via lifting and illustrate van Kampen.` },
      { kind: 'steps', title: 'Winding number gives $\pi_1(S^1)\cong\mathbb{Z}$', items: [
        { title: 'Construct the degree map', text: String.raw`A loop $\gamma$ in $S^1$ lifts uniquely to $\tilde\gamma:[0,1]\to\mathbb{R}$ with $\tilde\gamma(0)=0$. Define $\deg(\gamma)=\tilde\gamma(1)-\tilde\gamma(0)$; it is an integer because $\exp(\tilde\gamma(1))=\gamma(1)=\gamma(0)=\exp(0)$.`, math: String.raw`$\deg(\gamma)=\tilde\gamma(1)\in\mathbb{Z}.$` },
        { title: 'Homotopy invariance', text: String.raw`A homotopy of loops lifts to a homotopy of paths (covering homotopy theorem), so the endpoint $\tilde\gamma(1)$ varies continuously in the discrete set $\mathbb{Z}$ — hence is constant.`, math: String.raw`$\gamma\simeq\delta\ (\mathrm{rel}\ \{0,1\})\Rightarrow\deg\gamma=\deg\delta.$` },
        { title: 'Group isomorphism', text: String.raw`Lifting a concatenation gives endpoint $\deg\gamma+\deg\delta$, so $\deg$ is a homomorphism; surjective via $\gamma_n(t)=e^{2\pi int}$; injective because degree $0$ loops lift to closed paths in the contractible space $\mathbb{R}$ and hence are null-homotopic.`, math: String.raw`$\pi_1(S^1)\xrightarrow{\ \deg\ }\mathbb{Z}\ \text{is an isomorphism}.$` },
        { title: 'Van Kampen in action', text: String.raw`For $X=S^1\vee S^1$, take open sets $U,V$ deformation retracting onto the two circles with $U\cap V$ contractible and path-connected. Van Kampen gives $\pi_1(X)\cong\pi_1(U)\ast\pi_1(V)/\text{(trivial relation)}\cong\mathbb{Z}\ast\mathbb{Z}=F_2.$`, math: String.raw`$\pi_1(X)\cong\pi_1(U)\ast_{\pi_1(U\cap V)}\pi_1(V).$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — torus.** $T^2=S^1\times S^1$, so $\pi_1(T^2)\cong\mathbb{Z}\times\mathbb{Z}$, abelian: a loop winding $m$ times one way and $n$ the other. **Example 2 — projective plane.** $\pi_1(\mathbb{RP}^2)\cong\mathbb{Z}/2$ because the antipodal quotient of $S^2$ makes a loop around noncontractible but traversed twice contractible.` },
      { kind: 'math', latex: String.raw`$\pi_1(T^2)\cong\mathbb{Z}^2,\qquad \pi_1(\mathbb{RP}^2)\cong\mathbb{Z}/2,\qquad \pi_1(\text{figure eight})\cong F_2.$`, display: true, caption: 'Three classic fundamental groups.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Seifert–van Kampen.** If $X=U\cup V$ with $U,V,U\cap V$ open, path-connected and nonempty, and $x_0\in U\cap V$, then $\pi_1(X,x_0)$ is the amalgamated free product $\pi_1(U)\ast_{\pi_1(U\cap V)}\pi_1(V)$ (assuming the inclusion-induced maps are injective for the clean statement; general form uses a pushout). **Covering spaces.** A covering $p:\tilde X\to X$ induces an injective $p_\ast$, and subgroups of $\pi_1(X)$ correspond to covering spaces — a Galois-type correspondence.` },
      { kind: 'callout', tone: 'warning', title: 'Basepoints and connectedness', text: String.raw`$\pi_1(X,x_0)$ depends on the basepoint up to inner automorphism, not canonical isomorphism; for nonabelian groups this matters. Path-connectedness is needed to compare different basepoints, and van Kampen requires the intersection to be path-connected — otherwise information is lost.` },
      { kind: 'callout', tone: 'history', title: 'Poincaré 1895', text: String.raw`Henri Poincaré introduced the fundamental group in *Analysis Situs* (1895), calling it the "fundamental group of a manifold". It launched algebraic topology and led to the Poincaré conjecture, proved by Grigori Perelman in 2002–03.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We compute the winding number of sampled loops numerically by accumulating argument increments.` },
      { kind: 'code', language: 'python', code: String.raw`import numpy as np
def winding(t, n):
    z = np.exp(2j*np.pi*n*t)
    d = np.diff(z)
    # accumulate small argument changes without branch cuts
    steps = np.angle(z[1:]/z[:-1])
    return steps.sum()/(2*np.pi)
t = np.linspace(0,1,10001)
for n in (-2,-1,0,1,3):
    print(f'loop e^(2*pi*i*{n}*t): winding = {winding(t,n):.6f} (expected {n})')`, caption: 'Numerical winding numbers recover the degree.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**Robotics:** configuration spaces' fundamental groups constrain motion planning.`,
        String.raw`**Physics:** topological defects and anyons are classified by fundamental groups.`,
        String.raw`**Data analysis:** persistent homology generalises loop counting to noisy data.`,
        String.raw`**Chemistry:** molecular chirality and knotting are studied with topological invariants.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Higher homotopy is harder', text: String.raw`$\pi_1$ is often nonabelian but computable; higher homotopy groups $\pi_n$ for $n\ge2$ are always abelian yet notoriously difficult — even $\pi_3(S^2)\cong\mathbb{Z}$ is nontrivial. Do not extrapolate from $\pi_1(S^n)=0$.` },
      { kind: 'list', items: [
        String.raw`A space may be simply connected but not contractible (e.g. $S^2$).`,
        String.raw`The fundamental group is a homotopy invariant, not a complete invariant: lens spaces can share $\pi_1$ but differ in other invariants.`,
        String.raw`Van Kampen requires open sets; using closed subsets can give wrong answers.`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Prove that $\pi_1$ is a functor from based spaces to groups.`,
        String.raw`Why do different basepoints give isomorphic groups?`,
        String.raw`Compute $\pi_1$ of the wedge of two circles using van Kampen.`,
        String.raw`Explain how covering spaces encode subgroups of $\pi_1$.`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`A. Hatcher, *Algebraic Topology*, Chapter 1 — an accessible modern treatment.`,
        String.raw`J. P. May, *A Concise Course in Algebraic Topology*.`,
        String.raw`H. Poincaré, *Analysis Situs* (1895) — the original paper.`
      ] }
    ]
  },
  {
    id: 'riemannian-geometry',
    title: 'Riemannian Geometry',
    branchId: 'differential-geometry',
    level: 'Master’s',
    summary: String.raw`A Riemannian metric equips each tangent space with an inner product varying smoothly, making length, angle, geodesics and curvature intrinsic. The Levi-Civita connection and the Riemann tensor lead to Gauss–Bonnet and to the geometric formulation of general relativity.`,
    prerequisites: ['smooth-manifolds', 'tangent-spaces', 'multivariable-calculus'],
    tags: ['metric-tensor', 'geodesic', 'curvature', 'gauss-bonnet'],
    status: 'Complete',
    simulationIds: ['curvature-visual'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: String.raw`A smooth manifold has no built-in notion of distance or angle. Adding a Riemannian metric lets us measure lengths of curves, find shortest paths and quantify curvature — all intrinsically, without referring to an ambient space.` },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'paragraph', text: String.raw`A metric tensor $g$ assigns an inner product $g_p$ to each tangent space $T_pM$, smoothly in $p$. It converts velocity vectors into speeds, so the length of a curve is $\int\sqrt{g(\dot\gamma,\dot\gamma)}\,dt$. Geodesics are the curves whose velocity is parallel-transported — the analogues of straight lines.` },
      { kind: 'callout', tone: 'intuition', title: 'Intrinsic curvature', text: String.raw`Gauss' *Theorema Egregium* says Gaussian curvature can be computed from the metric alone — a cylinder and a plane have the same curvature (zero) despite looking different in $\mathbb{R}^3$, while a sphere has positive curvature $1/R^2$.` },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'paragraph', text: String.raw`On the unit sphere with coordinates $(\theta,\phi)$, the metric is $ds^2=d\theta^2+\sin^2\theta\,d\phi^2$. A circle of latitude at colatitude $\theta$ has circumference $2\pi\sin\theta$ — smaller than $2\pi$ — which signals positive curvature. Geodesics are great circles.` },
      { kind: 'math', latex: String.raw`$ds^2=d\theta^2+\sin^2\theta\,d\phi^2,\qquad L(\text{latitude at }\theta)=2\pi\sin\theta,\qquad K=1$`, display: true, caption: 'The round unit sphere.' },
      { kind: 'callout', tone: 'visual', title: 'Parallel transport', text: String.raw`Carry a vector around a closed loop by parallel transport; on a curved surface it returns rotated. The rotation angle is proportional to the enclosed area times the curvature — the geometric content of the Riemann tensor.` },
      { kind: 'sim', sim: 'curvature-visual', caption: String.raw`Visualize geodesics and curvature on surfaces of varying shape.` },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'paragraph', text: String.raw`A **Riemannian metric** is a smooth assignment $p\mapsto g_p$, a positive-definite symmetric bilinear form on $T_pM$. The pair $(M,g)$ is a Riemannian manifold. The **Levi-Civita connection** $\nabla$ is the unique connection that is torsion-free ($\nabla_XY-\nabla_YX=[X,Y]$) and metric-compatible ($X(g(Y,Z))=g(\nabla_XY,Z)+g(Y,\nabla_XZ)$).` },
      { kind: 'math', latex: String.raw`$R(X,Y)Z=\nabla_X\nabla_Y Z-\nabla_Y\nabla_X Z-\nabla_{[X,Y]}Z,\qquad K(\sigma)=\frac{g(R(e_1,e_2)e_2,e_1)}{g(e_1,e_1)g(e_2,e_2)-g(e_1,e_2)^2}$`, display: true, caption: 'Riemann curvature tensor and sectional curvature of a 2-plane $\sigma$.' },
      { kind: 'list', items: [
        String.raw`Ricci curvature $\mathrm{Ric}(X,Y)=\mathrm{tr}(Z\mapsto R(Z,X)Y)$; scalar curvature $S=\mathrm{tr}_g(\mathrm{Ric})$.`,
        String.raw`Geodesics satisfy $\nabla_{\dot\gamma}\dot\gamma=0$; locally they minimise length among nearby curves.`,
        String.raw`In coordinates: $ds^2=g_{ij}dx^i dx^j$, with Christoffel symbols $\Gamma^k_{ij}=\frac12 g^{k\ell}(\partial_i g_{j\ell}+\partial_j g_{i\ell}-\partial_\ell g_{ij})$.`,
        String.raw`The metric volume form is $dV=\sqrt{\det g}\,dx^1\cdots dx^n$.`
      ] },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'paragraph', text: String.raw`We derive the Christoffel symbols from the metric compatibility and torsion-free conditions, then apply them to the sphere.` },
      { kind: 'steps', title: 'Levi-Civita connection and sphere geodesics', items: [
        { title: 'Koszul formula', text: String.raw`Combining metric compatibility for three vector fields and torsion-freeness gives $2g(\nabla_XY,Z)=Xg(Y,Z)+Yg(X,Z)-Zg(X,Y)+g([X,Y],Z)-g([X,Z],Y)-g([Y,Z],X)$.`, math: String.raw`$2g(\nabla_XY,Z)=Xg(Y,Z)+Yg(X,Z)-Zg(X,Y)+\cdots$` },
        { title: 'Coordinate formula', text: String.raw`For coordinate vector fields the brackets vanish, leaving the Christoffel symbols:`, math: String.raw`$\Gamma^k_{ij}=\frac12 g^{k\ell}\left(\partial_i g_{j\ell}+\partial_j g_{i\ell}-\partial_\ell g_{ij}\right).$` },
        { title: 'Sphere components', text: String.raw`For $g_{\theta\theta}=1$, $g_{\phi\phi}=\sin^2\theta$, the nonzero symbols are:`, math: String.raw`$\Gamma^\theta_{\phi\phi}=-\sin\theta\cos\theta,\qquad \Gamma^\phi_{\theta\phi}=\Gamma^\phi_{\phi\theta}=\cot\theta.$` },
        { title: 'Geodesic equations', text: String.raw`$\ddot\theta-\sin\theta\cos\theta\,\dot\phi^2=0$ and $\ddot\phi+2\cot\theta\,\dot\theta\dot\phi=0$. Great circles through the poles solve these with $\phi=\text{const}$ and $\theta(t)=t$.`, math: String.raw`$\nabla_{\dot\gamma}\dot\gamma=0\ \Longleftrightarrow\ \ddot x^k+\Gamma^k_{ij}\dot x^i\dot x^j=0.$` },
        { title: 'Curvature', text: String.raw`The Riemann tensor has the constant-curvature form $R_{ijkl}=K(g_{ik}g_{jl}-g_{il}g_{jk})$ with $K=1$ for the unit sphere; for a sphere of radius $R$, $K=1/R^2$.`, math: String.raw`$K_{\text{sphere}}=1/R^2.$` }
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'paragraph', text: String.raw`**Example 1 — circumference test.** On the unit sphere at colatitude $\theta=\pi/3$, $\sin\theta=\sqrt3/2$, so a circle of latitude has circumference $2\pi\cdot\sqrt3/2=\pi\sqrt3\approx5.441$ rather than $2\pi\approx6.283$ for a great circle. The deficit signals positive curvature.` },
      { kind: 'paragraph', text: String.raw`**Example 2 — Gauss–Bonnet.** For a compact oriented 2-manifold $M$, $\int_M K\,dA=2\pi\chi(M)$ (with boundary terms if $\partial M\ne\varnothing$). For the unit sphere $\chi=2$, $K=1$, area $4\pi$: $\int K\,dA=4\pi=2\pi\cdot2\ \checkmark.$ For a torus $\chi=0$, so the average curvature is zero — flat and positively/negatively curved regions must balance.` },
      { kind: 'math', latex: String.raw`$\int_{S^2}K\,dA=1\cdot4\pi=4\pi=2\pi\chi(S^2)=2\pi\cdot2\ \checkmark$`, display: true, caption: 'Gauss–Bonnet check for the unit sphere.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'paragraph', text: String.raw`**Fundamental theorem of Riemannian geometry.** There is a unique torsion-free, metric-compatible connection. **Gauss–Bonnet.** For a compact oriented 2-dimensional Riemannian manifold without boundary, $\int_M K\,dA=2\pi\chi(M)$; higher-dimensional generalisations involve the Euler form (Chern–Gauss–Bonnet). **Bonnet–Myers.** A complete manifold with $\mathrm{Ric}\ge(n-1)k>0$ is compact with diameter $\le\pi/\sqrt k$. **Cartan–Hadamard.** A complete simply connected manifold with $K\le0$ is diffeomorphic to $\mathbb{R}^n$.` },
      { kind: 'callout', tone: 'history', title: 'Riemann 1854', text: String.raw`Bernhard Riemann's 1854 habilitation lecture introduced $n$-dimensional manifolds with a metric $ds^2=\sum g_{ij}dx^i dx^j$. Ricci, Levi-Civita and Christoffel developed the tensor calculus; Einstein used it in general relativity (1915), where gravity is spacetime curvature.` },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'paragraph', text: String.raw`We compute the sphere's Christoffel symbols symbolically with SymPy.` },
      { kind: 'code', language: 'python', code: String.raw`import sympy as sp
th, ph = sp.symbols('theta phi', positive=True)
coords = [th, ph]
g = sp.diag(1, sp.sin(th)**2)
ginv = g.inv()
Gamma = [[[0,0],[0,0]],[[0,0],[0,0]]]
for k in range(2):
    for i in range(2):
        for j in range(2):
            Gamma[k][i][j] = sp.simplify(sum(ginv[k,l]*(sp.diff(g[j,l],coords[i])+
                                sp.diff(g[i,l],coords[j])-sp.diff(g[i,j],coords[l]))
                                for l in range(2))/2)
print('Gamma^theta_{phi phi} =', Gamma[0][1][1])
print('Gamma^phi_{theta phi} =', Gamma[1][0][1])
print('latitude circumference at pi/3 =', float(2*sp.pi*sp.sin(sp.pi/3)))`, caption: 'Symbolic Christoffel symbols match the theory.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        String.raw`**General relativity:** gravity is encoded in the Lorentzian metric and Einstein's equations $G_{\mu\nu}=8\pi T_{\mu\nu}$.`,
        String.raw`**Computer graphics:** geodesic distances and curvature guide surface parameterisation.`,
        String.raw`**Robotics:** configuration manifolds with kinetic-energy metrics yield natural motion planning.`,
        String.raw`**Machine learning:** information geometry equips statistical models with the Fisher–Rao metric.`
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Coordinate singularity', text: String.raw`The spherical coordinate metric has $\Gamma^\phi_{\theta\phi}=\cot\theta$ blowing up at the poles — this is a coordinate singularity, not a geometric one. The sphere is smooth there. Always distinguish coordinate artefacts from genuine curvature singularities.` },
      { kind: 'list', items: [
        String.raw`A flat metric can look curved in awkward coordinates; curvature is coordinate-invariant.`,
        String.raw`Sectional curvature determines the full Riemann tensor in dimension 2, but not in higher dimensions.`,
        String.raw`Geodesics locally minimise length but need not be globally minimising (e.g. long arcs on a sphere).`
      ] },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', ordered: true, items: [
        String.raw`Show that a cylinder is flat by constructing an isometry to a plane strip.`,
        String.raw`Derive the Christoffel symbols for the Poincaré upper half-plane.`,
        String.raw`Explain Gauss–Bonnet for the torus and why total curvature vanishes.`,
        String.raw`Why is the Levi-Civita connection unique given the two defining properties?`
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'list', items: [
        String.raw`M. do Carmo, *Riemannian Geometry* — a standard graduate text.`,
        String.raw`S. T. Yau and R. Schoen, *Differential Geometry and Geometric Analysis*.`,
        String.raw`B. Riemann, "On the Hypotheses Which Lie at the Bases of Geometry" (1854/1868).`
      ] }
    ]
  },
]

export const P3_DERIVATIONS: Derivation[] = [
  {
    id: 'p3-der-bayes',
    title: "Bayes' Theorem from the Product Rule",
    topicId: 'bayes-theorem',
    statement: String.raw`For a partition $H_1,\dots,H_m$ of $\Omega$ with $P(H_i)>0$ and an event $E$ with $P(E)>0$, $P(H_i\mid E)=\dfrac{P(E\mid H_i)P(H_i)}{\sum_{j=1}^m P(E\mid H_j)P(H_j)}$.`,
    problem: String.raw`We observe evidence $E$ and need the posterior probability of each hypothesis $H_i$; only the reverse conditionals $P(E\mid H_i)$ are available from the model.`,
    assumptions: [
      String.raw`$(\Omega,\mathcal{F},P)$ is a probability space; $H_i\in\mathcal{F}$ are pairwise disjoint with $\bigcup_i H_i=\Omega$.`,
      String.raw`$P(H_i)>0$ for every $i$ (so conditional probabilities are defined).`,
      String.raw`$P(E)>0$ (so conditioning on $E$ is legitimate).`
    ],
    variables: [
      { symbol: String.raw`$H_i$`, meaning: String.raw`The $i$-th mutually exclusive hypothesis.` },
      { symbol: String.raw`$E$`, meaning: String.raw`The observed evidence event.` },
      { symbol: String.raw`$P(E\mid H_i)$`, meaning: String.raw`Likelihood of the evidence under hypothesis $i$.` },
      { symbol: String.raw`$P(H_i)$`, meaning: String.raw`Prior probability of hypothesis $i$.` },
      { symbol: String.raw`$P(H_i\mid E)$`, meaning: String.raw`Posterior probability after observing $E$.` }
    ],
    tools: ['Definition of conditional probability', 'Finite additivity', 'Law of total probability'],
    steps: [
      { title: 'Product rule in two orders', text: String.raw`Apply the definition of conditional probability to the same intersection $H_i\cap E$, once conditioning on $H_i$ and once on $E$.`, math: String.raw`$P(H_i\cap E)=P(E\mid H_i)P(H_i)=P(H_i\mid E)P(E).$` },
      { title: 'Isolate the posterior', text: String.raw`Divide the second equality by $P(E)>0$.`, math: String.raw`$P(H_i\mid E)=\frac{P(E\mid H_i)P(H_i)}{P(E)}.$` },
      { title: 'Expand the normalizer', text: String.raw`Since the $H_j$ partition $\Omega$, the sets $E\cap H_j$ are disjoint and cover $E$. Finite additivity gives the marginal likelihood.`, math: String.raw`$P(E)=\sum_{j=1}^m P(E\cap H_j)=\sum_{j=1}^m P(E\mid H_j)P(H_j).$` },
      { title: 'Combine and verify normalization', text: String.raw`Substituting and summing over $i$ gives $\sum_i P(H_i\mid E)=\frac{\sum_i P(E\mid H_i)P(H_i)}{P(E)}=1$, so the posteriors form a probability vector.`, math: String.raw`$P(H_i\mid E)=\frac{P(E\mid H_i)P(H_i)}{\sum_{j=1}^m P(E\mid H_j)P(H_j)}.$` },
      { title: 'Odds form', text: String.raw`For two hypotheses, divide the formula for $i$ by that for $k$; the common denominator $P(E)$ cancels.`, math: String.raw`$\frac{P(H_i\mid E)}{P(H_k\mid E)}=\frac{P(E\mid H_i)}{P(E\mid H_k)}\cdot\frac{P(H_i)}{P(H_k)}.$` }
    ],
    result: String.raw`The posterior equals prior times likelihood, normalized by the total probability of the evidence; posterior odds equal likelihood ratio times prior odds.`,
    interpretation: String.raw`Bayes' theorem is not new probability theory — it is the multiplication rule read backwards. It shows that evidence cannot be interpreted without a prior and that a test's likelihood ratio is the multiplicative factor by which it updates odds.`,
    examples: [
      String.raw`Disease prevalence $0.01$, sensitivity $0.99$, specificity $0.95$: $P(D\mid +)=\frac{0.0099}{0.0099+0.0495}=1/6\approx0.1667.$`,
      String.raw`For two hypotheses with equal priors and likelihoods $0.9$ and $0.1$, posterior odds are $9:1$, i.e. posterior probabilities $0.9$ and $0.1$.`
    ],
    applications: ['Medical diagnosis', 'Naive Bayes classification', 'Forensic likelihood ratios', 'Sequential Bayesian updating'],
    limitations: [
      String.raw`If $P(E)=0$ the formula is undefined; continuous evidence requires densities and a limiting argument (e.g. regular conditional distributions).`,
      String.raw`The result depends on the choice of prior; with sparse data the posterior can be prior-dominated.`,
      String.raw`If likelihoods are misspecified or conditional independence is falsely assumed, the posterior is not reliable.`
    ]
  },
  {
    id: 'p3-der-lotus',
    title: 'Law of the Unconscious Statistician (LOTUS)',
    topicId: 'expectation',
    statement: String.raw`If $X$ is a random variable and $g:\mathbb{R}\to\mathbb{R}$ is measurable with $g(X)$ integrable (or $g\ge0$), then $E[g(X)]=\int_{\mathbb{R}} g(x)\,\mu_X(dx)$, where $\mu_X=P\circ X^{-1}$ is the distribution of $X$.`,
    problem: String.raw`Compute the expectation of a function of $X$ without constructing the distribution of $g(X)$ explicitly, using only the law of $X$.`,
    assumptions: [
      String.raw`$X:(\Omega,\mathcal{F},P)\to(\mathbb{R},\mathcal{B}(\mathbb{R}))$ is measurable.`,
      String.raw`$g$ is Borel-measurable and $E|g(X)|<\infty$ (or $g\ge0$, allowing $+\infty$).`
    ],
    variables: [
      { symbol: String.raw`$\mu_X$`, meaning: String.raw`Distribution (pushforward measure) of $X$.` },
      { symbol: String.raw`$g$`, meaning: String.raw`Measurable transformation applied to $X$.` },
      { symbol: String.raw`$p$ or $f$`, meaning: String.raw`PMF or density of $X$, when available.` }
    ],
    tools: ['Pushforward measure', 'Simple-function approximation', 'Monotone convergence theorem', 'Linearity of the integral'],
    steps: [
      { title: 'Indicators', text: String.raw`For $g=\mathbf{1}_B$, the definition of pushforward gives the identity exactly.`, math: String.raw`$E[\mathbf{1}_B(X)]=P(X\in B)=\mu_X(B)=\int\mathbf{1}_B\,d\mu_X.$` },
      { title: 'Simple functions', text: String.raw`For $g=\sum_{k=1}^n c_k\mathbf{1}_{B_k}$, finite linearity on both sides preserves the identity.`, math: String.raw`$E[g(X)]=\sum_k c_k\mu_X(B_k)=\int g\,d\mu_X.$` },
      { title: 'Nonnegative $g$', text: String.raw`Choose simple $s_n\uparrow g$. Then $s_n(X)\uparrow g(X)$, and monotone convergence applies on $(\Omega,P)$ and on $(\mathbb{R},\mu_X)$.`, math: String.raw`$E[g(X)]=\lim_n E[s_n(X)]=\lim_n\int s_n\,d\mu_X=\int g\,d\mu_X.$` },
      { title: 'Signed integrable $g$', text: String.raw`Apply the previous step to $g^+$ and $g^-$ and subtract; finiteness of $E|g(X)|$ justifies the subtraction.`, math: String.raw`$E[g(X)]=\int_{\mathbb{R}} g\,d\mu_X.$` },
      { title: 'Special cases', text: String.raw`If $X$ has PMF $p$, take $\mu_X=\sum_k p(k)\delta_k$; if it has density $f$, take $d\mu_X=f\,dx$.`, math: String.raw`$E[g(X)]=\sum_k g(k)p(k)\quad\text{or}\quad E[g(X)]=\int_{\mathbb{R}}g(x)f(x)\,dx.$` }
    ],
    result: String.raw`The expectation of $g(X)$ depends only on the distribution of $X$, not on the underlying probability space.`,
    interpretation: String.raw`LOTUS justifies computing moments from a PMF or density alone. It is why $E[X^2]=\int x^2 f(x)dx$ needs no knowledge of how $X$ was constructed.`,
    examples: [
      String.raw`If $X\sim\mathrm{Exp}(2)$ then $E[X^2]=\int_0^\infty x^2\cdot2e^{-2x}dx=2/4=0.5$, giving $\mathrm{Var}(X)=0.5-0.25=0.25.$`,
      String.raw`For a fair die, $E[X^2]=\sum_{k=1}^6 k^2/6=91/6\approx15.167.$`
    ],
    applications: ['Computing moments of distributions', 'Risk measures in actuarial science', 'Loss functions in machine learning', 'Moment generating functions'],
    limitations: [
      String.raw`If $g(X)$ is not integrable and takes both signs, the expectation is undefined and the identity may fail (e.g. $g(x)=1/x$ with a density vanishing at 0).`,
      String.raw`A density must exist for the integral formula $\int g f$; for singular distributions one must use the general measure form.`
    ]
  },
  {
    id: 'p3-der-clt-cf',
    title: 'Central Limit Theorem via Characteristic Functions (Sketch)',
    topicId: 'central-limit-theorem',
    statement: String.raw`If $X_1,\dots,X_n$ are i.i.d. with $E[X_1]=\mu$, $\mathrm{Var}(X_1)=\sigma^2\in(0,\infty)$, then $Z_n=\frac{\sum_{i=1}^n X_i-n\mu}{\sigma\sqrt n}$ converges in distribution to $\mathcal{N}(0,1)$.`,
    problem: String.raw`Show that the standardized sum has an asymptotic Gaussian law using characteristic functions, and identify precisely where each hypothesis is used.`,
    assumptions: [
      String.raw`Independence and identical distribution of $X_1,\dots,X_n$.`,
      String.raw`Finite mean $\mu\in\mathbb{R}$ and finite variance $\sigma^2>0$ (this gives $E|X|<\infty$).`,
      String.raw`Lévy's continuity theorem: pointwise convergence of characteristic functions to a function continuous at $0$ implies convergence in distribution.`
    ],
    variables: [
      { symbol: String.raw`$Y_i=(X_i-\mu)/\sigma$`, meaning: String.raw`Standardized single observation with mean 0 and variance 1.` },
      { symbol: String.raw`$\varphi_Y(u)=E[e^{iuY}]$`, meaning: String.raw`Characteristic function of $Y_1$.` },
      { symbol: String.raw`$Z_n=n^{-1/2}\sum_i Y_i$`, meaning: String.raw`Standardized sum.` }
    ],
    tools: ['Characteristic functions', 'Taylor expansion with o(u²) remainder', 'Independence ⇒ product of characteristic functions', 'Lévy continuity theorem'],
    steps: [
      { title: 'Reduction to mean 0, variance 1', text: String.raw`Affine normalization gives $E[Y_i]=0$, $E[Y_i^2]=1$; this is where finite variance enters.`, math: String.raw`$Y_i=(X_i-\mu)/\sigma.$` },
      { title: 'Second-order Taylor expansion', text: String.raw`Since $E[Y]=0$ and $E[Y^2]=1$, differentiating $\varphi_Y(u)=E[e^{iuY}]$ at 0 gives $\varphi_Y'(0)=iE[Y]=0$ and $\varphi_Y''(0)=-E[Y^2]=-1$. Finite second moment yields the expansion with an $o(u^2)$ remainder.`, math: String.raw`$\varphi_Y(u)=1-\frac{u^2}{2}+o(u^2)\quad(u\to0).$` },
      { title: 'Independence multiplies characteristics', text: String.raw`The characteristic function of a sum of independent variables is the product of theirs; scaling $Z_n$ by $1/\sqrt n$ scales the argument.`, math: String.raw`$\varphi_{Z_n}(t)=\left[\varphi_Y\!\left(\frac{t}{\sqrt n}\right)\right]^n.$` },
      { title: 'Asymptotic evaluation', text: String.raw`Substitute $u=t/\sqrt n$ and use $\log(1+w_n)=w_n+o(w_n)$ with $w_n=-t^2/(2n)+o(1/n)$.`, math: String.raw`$\left[1-\frac{t^2}{2n}+o\!\left(\frac1n\right)\right]^n\longrightarrow e^{-t^2/2}.$` },
      { title: 'Identify the limit', text: String.raw`$e^{-t^2/2}$ is the characteristic function of $\mathcal{N}(0,1)$ and is continuous at $0$; Lévy's theorem upgrades pointwise convergence to weak convergence. This step is the analytic core and is cited, not proved, in this sketch.`, math: String.raw`$Z_n\xrightarrow{d}\mathcal{N}(0,1).$` }
    ],
    result: String.raw`Standardized i.i.d. sums with finite variance converge in distribution to the standard normal, regardless of the shape of the original distribution.`,
    interpretation: String.raw`Convolution smooths distributional details; in the characteristic-function domain only the quadratic term of the log-characteristic function survives the $n\to\infty$ limit, and that term is exactly Gaussian.`,
    examples: [
      String.raw`For $\mathrm{Exp}(1)$, $\mu=\sigma=1$; with $n=100$, $P(\bar X>1.2)\approx1-\Phi(2)\approx0.0228.$`,
      String.raw`For Bernoulli(1/2), $\mu=1/2$, $\sigma=1/2$; 400 tosses give $P(\hat p>0.55)\approx1-\Phi(2)\approx0.0228.$`
    ],
    applications: ['Sampling distributions for means', 'Approximate confidence intervals', 'Error propagation in measurement', 'Null approximations in test statistics'],
    limitations: [
      String.raw`This is a **sketch**: the $o(u^2)$ remainder, the logarithm estimate and Lévy's continuity theorem are cited rather than proved here.`,
      String.raw`Infinite variance breaks the expansion — for Cauchy variables the standardized sum remains Cauchy.`,
      String.raw`Convergence in distribution does not imply convergence of densities or moments; a quantitative rate needs a finite third moment (Berry–Esseen).`
    ]
  },
  {
    id: 'p3-der-lagrange',
    title: "Lagrange's Theorem for Finite Groups",
    topicId: 'subgroups',
    statement: String.raw`If $G$ is a finite group and $H\le G$, then $|G|=[G:H]\cdot|H|$; in particular the order of a subgroup divides the order of the group.`,
    problem: String.raw`Show that a finite group is partitioned by equally sized copies of any subgroup, and deduce the divisibility relation and its standard corollaries.`,
    assumptions: [
      String.raw`$G$ is a finite group and $H$ is a subgroup of $G$.`,
      String.raw`Left cosets are $gH=\{gh:h\in H\}$; $[G:H]$ denotes the number of distinct left cosets.`
    ],
    variables: [
      { symbol: String.raw`$H$`, meaning: String.raw`A subgroup of $G$.` },
      { symbol: String.raw`$gH$`, meaning: String.raw`Left coset containing $g$.` },
      { symbol: String.raw`$[G:H]$`, meaning: String.raw`Index: number of distinct left cosets.` }
    ],
    tools: ['Equivalence relations', 'Bijections', 'Cancellation laws', 'Definition of subgroup'],
    steps: [
      { title: 'Cosets partition $G$', text: String.raw`Define $g\sim g'$ iff $g^{-1}g'\in H$; this is an equivalence relation (reflexive since $e\in H$, symmetric since $H$ is closed under inverses, transitive since $H$ is closed under products). Its classes are the left cosets, which therefore partition $G$.`, math: String.raw`$g'=gh\ (h\in H)\iff gH=g'H.$` },
      { title: 'Every coset has the size of $H$', text: String.raw`The map $\phi:H\to gH$, $\phi(h)=gh$, is surjective by definition and injective by left cancellation: $gh_1=gh_2\Rightarrow h_1=h_2$.`, math: String.raw`$|gH|=|H|.$` },
      { title: 'Count the blocks', text: String.raw`The partition has $[G:H]$ blocks, each of cardinality $|H|$, so counting elements of $G$ gives the theorem.`, math: String.raw`$|G|=\sum_{\text{cosets}}|gH|=[G:H]\cdot|H|.$` },
      { title: 'Order of an element', text: String.raw`Apply the theorem to the cyclic subgroup $\langle g\rangle$, whose order is $\mathrm{ord}(g)$; hence $\mathrm{ord}(g)\mid|G|$ and $g^{|G|}=e$.`, math: String.raw`$g^{|G|}=e.$` },
      { title: 'Prime order corollary', text: String.raw`If $|G|=p$ is prime, any $g\ne e$ has $\mathrm{ord}(g)>1$ dividing $p$, so $\mathrm{ord}(g)=p$ and $\langle g\rangle=G$: the group is cyclic.`, math: String.raw`$|G|\ \text{prime}\Rightarrow G\cong C_p.$` }
    ],
    result: String.raw`For finite $G$ and $H\le G$, $|H|$ divides $|G|$; element orders divide $|G|$, and groups of prime order are cyclic.`,
    interpretation: String.raw`The theorem says the group is built from identical copies of the subgroup, indexed by the quotient set $G/H$. Normality is not needed for counting — only for making $G/H$ a group.`,
    examples: [
      String.raw`In $\mathbb{Z}/12$, $H=\{0,4,8\}$ has $|H|=3$, index 4, and $3\cdot4=12.$`,
      String.raw`$A_3\le S_3$ has $|A_3|=3$, $[S_3:A_3]=2.$`
    ],
    applications: ['Classifying groups of small order', 'Group-theoretic proofs of Fermat/Euler theorems', 'Counting arguments in combinatorics', 'Sylow theory'],
    limitations: [
      String.raw`The converse is false: $A_4$ has order 12 but no subgroup of order 6.`,
      String.raw`Finiteness is essential; infinite groups can have proper subgroups of finite or infinite index without divisibility statements.`
    ]
  },
  {
    id: 'p3-der-first-iso',
    title: 'First Isomorphism Theorem',
    topicId: 'quotient-groups',
    statement: String.raw`If $\varphi:G\to H$ is a group homomorphism, then $\ker\varphi\trianglelefteq G$ and $G/\ker\varphi\cong\operatorname{im}\varphi$ via $g\ker\varphi\mapsto\varphi(g)$.`,
    problem: String.raw`Explain why the quotient by a kernel is exactly the image, and verify that the induced map is well-defined, injective and surjective.`,
    assumptions: [
      String.raw`$G,H$ are groups and $\varphi:G\to H$ is a homomorphism.`,
      String.raw`$\ker\varphi=\{g\in G:\varphi(g)=e_H\}$ and $\operatorname{im}\varphi=\{\varphi(g):g\in G\}$.`
    ],
    variables: [
      { symbol: String.raw`$K=\ker\varphi$`, meaning: String.raw`Normal subgroup of elements mapping to the identity.` },
      { symbol: String.raw`$gK$`, meaning: String.raw`Coset of the kernel.` },
      { symbol: String.raw`$\bar\varphi$`, meaning: String.raw`Induced map from the quotient to the image.` }
    ],
    tools: ['Kernels are normal', 'Coset equality criterion', 'Homomorphism properties', 'Quotient group structure'],
    steps: [
      { title: 'The kernel is normal', text: String.raw`For $k\in K$ and $g\in G$, $\varphi(gkg^{-1})=\varphi(g)e_H\varphi(g)^{-1}=e_H$, so $gKg^{-1}\subseteq K$; applying this to $g^{-1}$ gives equality.`, math: String.raw`$K\trianglelefteq G.$` },
      { title: 'Define the induced map', text: String.raw`Set $\bar\varphi(gK)=\varphi(g)$; the quotient group exists because $K$ is normal.`, math: String.raw`$\bar\varphi:G/K\to\operatorname{im}\varphi.$` },
      { title: 'Well-defined', text: String.raw`If $gK=g'K$ then $g^{-1}g'\in K$, so $\varphi(g')=\varphi(g)\varphi(g^{-1}g')=\varphi(g)e_H=\varphi(g)$.`, math: String.raw`$gK=g'K\Rightarrow\varphi(g)=\varphi(g').$` },
      { title: 'Homomorphism', text: String.raw`$\bar\varphi((gK)(hK))=\bar\varphi(ghK)=\varphi(gh)=\varphi(g)\varphi(h)=\bar\varphi(gK)\bar\varphi(hK)$.`, math: String.raw`$\bar\varphi\ \text{is a homomorphism}.$` },
      { title: 'Injective and surjective', text: String.raw`Kernel of $\bar\varphi$ is $\{gK:\varphi(g)=e_H\}=\{K\}$, the trivial coset, so $\bar\varphi$ is injective; surjectivity is immediate from the definition of image.`, math: String.raw`$G/K\cong\operatorname{im}\varphi.$` }
    ],
    result: String.raw`Every homomorphism factors as a quotient map followed by an isomorphism onto its image; kernels and normal subgroups are two views of the same idea.`,
    interpretation: String.raw`The theorem says the only information lost by $\varphi$ is the coset of the kernel: elements in the same coset are indistinguishable to $\varphi$.`,
    examples: [
      String.raw`Sign map $\operatorname{sgn}:S_3\to\{\pm1\}$: kernel $A_3$, so $S_3/A_3\cong C_2.$`,
      String.raw`Determinant $\det:\mathrm{GL}_n(\mathbb{R})\to\mathbb{R}^\times$: kernel $\mathrm{SL}_n(\mathbb{R})$, so $\mathrm{GL}_n/\mathrm{SL}_n\cong\mathbb{R}^\times.$`,
      String.raw`Reduction mod $n$: $\mathbb{Z}\to\mathbb{Z}/n\mathbb{Z}$, kernel $n\mathbb{Z}$, giving $\mathbb{Z}/n\mathbb{Z}\cong\mathbb{Z}/n\mathbb{Z}$.`
    ],
    applications: ['Classifying homomorphisms', 'Constructing quotient groups', 'Second and third isomorphism theorems', 'Galois correspondence proofs'],
    limitations: [
      String.raw`The isomorphism is canonical only after $\varphi$ is fixed; changing $\varphi$ changes the identification.`,
      String.raw`The statement is for groups; rings and modules have analogous but separately stated theorems with ideals/submodules.`
    ]
  },
  {
    id: 'p3-der-heine-borel',
    title: 'Heine–Borel Theorem (Proof Sketch)',
    topicId: 'compactness',
    statement: String.raw`A subset $K\subseteq\mathbb{R}^n$ is compact (every open cover has a finite subcover) if and only if $K$ is closed and bounded.`,
    problem: String.raw`Characterize compact subsets of Euclidean space and show that the cover definition reduces to the familiar closed-and-bounded condition.`,
    assumptions: [
      String.raw`$\mathbb{R}^n$ carries the Euclidean metric and its usual topology.`,
      String.raw`The nested interval / Cantor intersection property and the least upper bound property of $\mathbb{R}$ are available.`
    ],
    variables: [
      { symbol: String.raw`$K$`, meaning: String.raw`A subset of $\mathbb{R}^n$.` },
      { symbol: String.raw`$\{U_\alpha\}$`, meaning: String.raw`An open cover of $K$.` },
      { symbol: String.raw`$I_k$`, meaning: String.raw`Nested cubes from bisection in the $\mathbb{R}$ proof.` }
    ],
    tools: ['Bisection argument', 'Cantor intersection theorem', 'Open cover definition', 'Hausdorff separation'],
    steps: [
      { title: 'Compact ⇒ bounded', text: String.raw`Cover $K$ by the balls $B_m(0)$, $m\in\mathbb{N}$; a finite subcover shows $K\subseteq B_M(0)$.`, math: String.raw`$K\subseteq\bigcup_{m}B_m(0)\Rightarrow K\subseteq B_M(0)\ \text{for some }M.$` },
      { title: 'Compact ⇒ closed (Hausdorff)', text: String.raw`If $y\notin K$, for each $x\in K$ choose disjoint neighbourhoods $U_x\ni x$, $V_x\ni y$. Finitely many $U_{x_i}$ cover $K$; the intersection $\bigcap V_{x_i}$ is a neighbourhood of $y$ disjoint from $K$.`, math: String.raw`$K\ \text{compact in Hausdorff space}\Rightarrow K\ \text{closed}.$` },
      { title: 'Closed and bounded ⇒ set up bisection', text: String.raw`In $\mathbb{R}$, $K\subseteq[a,b]$. If no finite subcover exists, bisect; at least one half still cannot be covered by finitely many $U_\alpha$. Iterate to get nested intervals $I_k$ with $|I_k|=2^{-k}(b-a)$ and $I_k\cap K\ne\varnothing$.`, math: String.raw`$I_1\supseteq I_2\supseteq\cdots,\quad |I_k|\to0.$` },
      { title: 'Cantor intersection', text: String.raw`The endpoints converge to a unique $x^\ast\in\bigcap_k I_k$, and $x^\ast\in K$ because $K$ is closed. This is where completeness/closedness is used.`, math: String.raw`$x^\ast\in K\cap\bigcap_k I_k.$` },
      { title: 'Contradiction', text: String.raw`Some $U_{\alpha_0}$ contains $x^\ast$; since it is open, $I_k\subseteq U_{\alpha_0}$ for large $k$, contradicting that $I_k\cap K$ needs infinitely many cover members.`, math: String.raw`$K\cap I_k\subseteq U_{\alpha_0}\ \text{for large }k.$` },
      { title: 'Extend to $\mathbb{R}^n$', text: String.raw`Enclose $K$ in a closed cube and bisect into $2^n$ subcubes; the same nested-compact argument applies, or use the equivalence of compactness with total boundedness plus completeness.`, math: String.raw`$K\ \text{compact}\iff K\ \text{complete and totally bounded}.$` }
    ],
    result: String.raw`In Euclidean space, compactness is exactly closedness plus boundedness; in general metric spaces the correct replacement is complete + totally bounded.`,
    interpretation: String.raw`Closedness supplies the limit points (so sequences cannot escape) and boundedness supplies total boundedness (so finitely many small balls suffice). The proof is a compact presentation of the Bolzano–Weierstrass idea.`,
    examples: [
      String.raw`$[0,1]$ is compact; $(0,1)$ is not, as the cover $\{(1/n,1)\}_{n\ge2}$ has no finite subcover.`,
      String.raw`The closed unit ball of an infinite-dimensional Hilbert space is closed and bounded but not compact — Heine–Borel is specific to finite dimensions.`
    ],
    applications: ['Extreme value theorem', 'Uniform continuity on compact sets', 'Existence of optima', 'Arzelà–Ascoli compactness in function spaces'],
    limitations: [
      String.raw`This is a **proof sketch**: the $\mathbb{R}^n$ bisection details and the total-boundedness equivalence are summarized.`,
      String.raw`The equivalence fails in infinite-dimensional normed spaces and in general metric spaces.`
    ]
  },
  {
    id: 'p3-der-residue',
    title: 'Residue Theorem: Proof Outline',
    topicId: 'residue-theorem',
    statement: String.raw`Let $\gamma$ be a positively oriented simple closed rectifiable curve and let $f$ be holomorphic on an open set containing $\gamma$ and its interior except for finitely many isolated singularities $z_1,\dots,z_k$ inside $\gamma$ and none on $\gamma$. Then $\oint_\gamma f(z)\,dz=2\pi i\sum_{j=1}^k\operatorname{Res}(f,z_j)$.`,
    problem: String.raw`Reduce a global contour integral to local Laurent coefficients and justify the deformation of contour around isolated singularities.`,
    assumptions: [
      String.raw`$\gamma$ is simple, closed, rectifiable, positively oriented; winding number 1 about interior points.`,
      String.raw`$f$ holomorphic except at finitely many isolated singularities strictly inside $\gamma$.`,
      String.raw`The Laurent expansion of $f$ converges uniformly on small circles around each singularity.`
    ],
    variables: [
      { symbol: String.raw`$z_j$`, meaning: String.raw`Isolated singularities enclosed by $\gamma$.` },
      { symbol: String.raw`$C_j$`, meaning: String.raw`Small positively oriented circles around $z_j$.` },
      { symbol: String.raw`$a_{-1}^{(j)}$`, meaning: String.raw`Coefficient of $(z-z_j)^{-1}$ in the Laurent expansion; the residue.` }
    ],
    tools: ["Cauchy's theorem", 'Laurent series', 'Homotopy of contours', 'Termwise integration of uniformly convergent series'],
    steps: [
      { title: 'Cut the domain', text: String.raw`Join $\gamma$ to small disjoint circles $C_j$ by thin corridors. On the resulting simply connected region $f$ is holomorphic, so Cauchy's theorem applies.`, math: String.raw`$\oint_{\partial D}f\,dz=0.$` },
      { title: 'Cancel the corridors', text: String.raw`The two sides of each corridor are traversed in opposite directions, so their integrals cancel in the limit as the corridor width goes to zero.`, math: String.raw`$\oint_\gamma f=\sum_j\oint_{C_j}f.$` },
      { title: 'Laurent expansion on a circle', text: String.raw`On $C_j$, write $f(z)=\sum_{n\ge -m_j}a_n^{(j)}(z-z_j)^n$; the convergence is uniform on the circle.`, math: String.raw`$f(z)=\sum_{n=-m_j}^{\infty}a_n^{(j)}(z-z_j)^n.$` },
      { title: 'Integrate term by term', text: String.raw`Parametrise $z=z_j+re^{it}$: $\oint_{C_j}(z-z_j)^n dz=ir^{n+1}\int_0^{2\pi}e^{i(n+1)t}dt$, which is $2\pi i$ for $n=-1$ and $0$ otherwise.`, math: String.raw`$\oint_{C_j}f\,dz=2\pi i\,a_{-1}^{(j)}.$` },
      { title: 'Sum the contributions', text: String.raw`Adding over $j$ gives the residue theorem; the residue is equivalently $\frac{1}{2\pi i}\oint_{C_j}f\,dz$.`, math: String.raw`$\oint_\gamma f\,dz=2\pi i\sum_{j=1}^k\operatorname{Res}(f,z_j).$` }
    ],
    result: String.raw`The contour integral is $2\pi i$ times the sum of enclosed residues; for a curve of winding number $m$, multiply by $m$.`,
    interpretation: String.raw`All the global information is carried by local coefficients: the $(z-z_0)^{-1}$ term is the only one whose integral around a closed loop does not vanish.`,
    examples: [
      String.raw`$\oint_{|z|=2}\frac{z}{z^2+1}dz=2\pi i(\tfrac12+\tfrac12)=2\pi i.$`,
      String.raw`$\int_{-\infty}^{\infty}\frac{dx}{(x^2+1)^2}=\pi/2$ from the double-pole residue at $i$: $\operatorname{Res}=-i/4.$`
    ],
    applications: ['Real improper integrals', 'Infinite series summation', 'Inverse Laplace/Fourier transforms', 'Argument principle and Rouché theorem'],
    limitations: [
      String.raw`This is a **proof outline**: the corridor-deformation limit and uniform convergence justification are summarized, not proved in full.`,
      String.raw`Singularities on the contour are excluded; they require principal-value/indentation arguments.`,
      String.raw`Essential singularities have residues but no finite-order residue formula.`
    ]
  },
  {
    id: 'p3-der-cauchy-schwarz',
    title: 'Cauchy–Schwarz Inequality in Inner-Product Spaces',
    topicId: 'hilbert-spaces',
    statement: String.raw`For vectors $x,y$ in an inner-product space, $|\langle x,y\rangle|\le\|x\|\,\|y\|$, with equality iff $x$ and $y$ are linearly dependent.`,
    problem: String.raw`Prove the fundamental inequality relating inner products and norms, and characterise the equality case.`,
    assumptions: [
      String.raw`$H$ is a real or complex inner-product space with $\|x\|^2=\langle x,x\rangle$.`,
      String.raw`If $y=0$ the inequality is trivial; assume $y\ne0$ for the main argument.`
    ],
    variables: [
      { symbol: String.raw`$\langle\cdot,\cdot\rangle$`, meaning: String.raw`Inner product, linear in the first argument.` },
      { symbol: String.raw`$\lambda$`, meaning: String.raw`Scalar chosen to minimise $\|x-\lambda y\|^2$.` },
      { symbol: String.raw`$\|x\|$`, meaning: String.raw`Norm induced by the inner product.` }
    ],
    tools: ['Positive-definiteness of the inner product', 'Quadratic discriminant / completing the square', 'Projection geometry'],
    steps: [
      { title: 'Trivial case', text: String.raw`If $y=0$, the right side is zero and $\langle x,0\rangle=0$.`, math: String.raw`$y=0\Rightarrow 0\le0.$` },
      { title: 'Positivity of a quadratic', text: String.raw`For every scalar $\lambda$, positivity gives $0\le\|x-\lambda y\|^2=\|x\|^2-2\operatorname{Re}(\lambda\langle y,x\rangle)+|\lambda|^2\|y\|^2$ (with the convention of linearity in the first argument).`, math: String.raw`$0\le\|x\|^2-2\operatorname{Re}\bigl(\overline\lambda\langle x,y\rangle\bigr)+|\lambda|^2\|y\|^2.$` },
      { title: 'Optimal $\lambda$', text: String.raw`Choose $\lambda=\langle x,y\rangle/\|y\|^2$ so that the cross term cancels exactly; substitute.`, math: String.raw`$0\le\|x\|^2-\frac{|\langle x,y\rangle|^2}{\|y\|^2}.$` },
      { title: 'Rearrange', text: String.raw`Multiply by $\|y\|^2>0$ and take square roots.`, math: String.raw`$|\langle x,y\rangle|\le\|x\|\,\|y\|.$` },
      { title: 'Equality case', text: String.raw`If $|\langle x,y\rangle|=\|x\|\|y\|$ then $\|x-\lambda y\|^2=0$ with the optimal $\lambda$, so $x=\lambda y$; the converse is immediate.`, math: String.raw`$|\langle x,y\rangle|=\|x\|\|y\|\iff x=cy\ \text{for some scalar }c.$` }
    ],
    result: String.raw`The inner product is bounded by the product of norms; equality characterises collinearity.`,
    interpretation: String.raw`Cauchy–Schwarz is the statement that $\cos\theta=\langle x,y\rangle/(\|x\|\|y\|)$ always lies in $[-1,1]$. It also proves the triangle inequality for the induced norm and underpins Bessel's inequality and the continuity of inner products.`,
    examples: [
      String.raw`For $f(x)=x$ and $g(x)=1$ on $[0,1]$: $\langle f,g\rangle=1/2$, $\|f\|=1/\sqrt3$, $\|g\|=1$, and $1/2\le1/\sqrt3\approx0.577.$`,
      String.raw`For $a=(1,2,3)$, $b=(4,-1,2)$ in $\mathbb{R}^3$: $\langle a,b\rangle=8$, $\|a\|=\sqrt{14}$, $\|b\|=\sqrt{21}$, and $8\le\sqrt{294}\approx17.15.$`
    ],
    applications: ['Triangle inequality for norms', 'Correlation coefficient bound', 'Projection and best approximation', 'Convergence proofs in Hilbert spaces'],
    limitations: [
      String.raw`The proof assumes an inner product exists; general normed spaces satisfy a different inequality via the dual norm.`,
      String.raw`Equality requires linear dependence — approximate equality indicates near-parallel vectors, which is the basis of cosine similarity.`
    ]
  },
  {
    id: 'p3-der-mct',
    title: 'Lebesgue Monotone Convergence Theorem',
    topicId: 'lebesgue-integration',
    statement: String.raw`Let $(X,\mathcal{A},\mu)$ be a measure space and $0\le f_1\le f_2\le\cdots$ measurable with $f=\lim_n f_n=\sup_n f_n$ (defined $\mu$-a.e.). Then $\int_X f\,d\mu=\lim_{n\to\infty}\int_X f_n\,d\mu$, allowing $+\infty$.`,
    problem: String.raw`Justify exchanging the limit and the integral for a monotone increasing sequence of nonnegative measurable functions, with no domination hypothesis.`,
    assumptions: [
      String.raw`Measurability of every $f_n$ and of the pointwise limit $f$.`,
      String.raw`Nonnegativity and monotonicity: $0\le f_n\le f_{n+1}$ a.e.`,
      String.raw`Continuity of the measure $\mu$ from below.`
    ],
    variables: [
      { symbol: String.raw`$f_n$`, meaning: String.raw`Increasing sequence of nonnegative measurable functions.` },
      { symbol: String.raw`$s$`, meaning: String.raw`A simple function with $0\le s\le f$.` },
      { symbol: String.raw`$c$`, meaning: String.raw`Constant in $(0,1)$ used in the $\varepsilon$-style argument.` },
      { symbol: String.raw`$A_n$`, meaning: String.raw`Set $\{s\le c f_n\}\uparrow X$.` }
    ],
    tools: ['Definition of the Lebesgue integral via simple functions', 'Continuity of measure from below', 'Supremum over simple approximations', 'Monotone convergence of measures'],
    steps: [
      { title: 'One inequality is immediate', text: String.raw`Since $f_n\le f$, monotonicity of the integral gives $\int f_n\le\int f$; hence $\lim_n\int f_n\le\int f$.`, math: String.raw`$\lim_n\int f_n\,d\mu\le\int f\,d\mu.$` },
      { title: 'Fix a simple minorant', text: String.raw`Let $0\le s\le f$ be simple and fix $0<c<1$. Define $A_n=\{x:s(x)\le c f_n(x)\}$; measurability follows from that of $s$ and $f_n$.`, math: String.raw`$A_n=\{s\le c f_n\}\in\mathcal{A}.$` },
      { title: 'Sets increase to $X$', text: String.raw`Because $f_n\uparrow f$ and $cf> s$ wherever $s>0$ (trivial where $s=0$), the $A_n$ increase to $X$.`, math: String.raw`$A_n\uparrow X.$` },
      { title: 'Integrate over $A_n$', text: String.raw`On $A_n$, $f_n\ge s/c$, so $\int f_n\ge\int_{A_n}f_n\ge c\int_{A_n}s\,d\mu$.`, math: String.raw`$\int_X f_n\,d\mu\ge c\int_{A_n}s\,d\mu.$` },
      { title: 'Continuity from below for simple functions', text: String.raw`Writing $s=\sum_k c_k\mathbf{1}_{E_k}$, continuity of $\mu$ gives $\int_{A_n}s=\sum_k c_k\mu(E_k\cap A_n)\uparrow\sum_k c_k\mu(E_k)=\int s$.`, math: String.raw`$\lim_n\int_{A_n}s\,d\mu=\int_X s\,d\mu.$` },
      { title: 'Supremum and limit', text: String.raw`Taking limits, $\lim_n\int f_n\ge c\int s$; take the supremum over $s\le f$ and then let $c\uparrow1$ to reverse the first inequality.`, math: String.raw`$\int_X f\,d\mu=\lim_{n\to\infty}\int_X f_n\,d\mu.$` }
    ],
    result: String.raw`For increasing nonnegative measurable sequences, the integral of the limit is the limit of the integrals.`,
    interpretation: String.raw`No dominating function is needed because monotonicity prevents mass from escaping to infinity in an oscillating way. The theorem is the engine behind term-by-term integration of power series, Tonelli's theorem and the definition of expectation for nonnegative variables.`,
    examples: [
      String.raw`$f_n=x^{-2}\mathbf{1}_{[1,n]}$ on $[1,\infty)$: $\int f_n=1-1/n\to1=\int_1^\infty x^{-2}dx.$`,
      String.raw`For counting measure on $\mathbb{N}$, MCT gives $\sum_{k,j}a_{kj}=\sum_k\sum_j a_{kj}$ for nonnegative arrays (Tonelli in discrete form).`
    ],
    applications: ['Term-by-term integration', 'Tonelli theorem', 'Expectation of nonnegative random variables', 'Construction of measures from premeasures'],
    limitations: [
      String.raw`Monotonicity and nonnegativity are essential; the counterexample $f_n=n\mathbf{1}_{(0,1/n]}$ shows failure without domination.`,
      String.raw`The limit may be $+\infty$; the theorem remains true in the extended reals.`,
      String.raw`Measurability of the $f_n$ is required — the integral of a nonmeasurable function is undefined.`
    ]
  },
]

export const P3_PROBLEMS: Problem[] = [
  {
    id: 'p3-prob-01',
    title: 'Continuity of Probability from the Axioms',
    topicId: 'probability-axioms',
    level: 'Undergraduate 1',
    type: 'Proof',
    concepts: ['countable additivity', 'continuity from below', 'continuity from above', 'sigma-algebra'],
    statement: String.raw`Let $(\Omega,\mathcal{F},P)$ be a probability space. (a) If $A_n\uparrow A$ (i.e. $A_1\subseteq A_2\subseteq\cdots$ and $A=\bigcup_n A_n$), prove $P(A_n)\uparrow P(A)$. (b) If $A_n\downarrow A$, prove $P(A_n)\downarrow P(A)$. (c) Deduce the inclusion–exclusion formula for two events.`,
    hints: [
      String.raw`For (a), write $A=\biguplus_{n\ge1}(A_n\setminus A_{n-1})$ with $A_0=\varnothing$ and use axiom (A3).`,
      String.raw`For (b), apply (a) to the increasing sequence $A_1\setminus A_n$ and use $P(A_1)<\infty$.`,
      String.raw`For (c), write $A\cup B=A\uplus(B\setminus A)$ and $B=(A\cap B)\uplus(B\setminus A)$.`
    ],
    solution: [
      { title: 'Part (a): disjoint differences', text: String.raw`Set $B_n=A_n\setminus A_{n-1}$. The $B_n$ are disjoint, $B_n\in\mathcal{F}$, and $\biguplus_{k=1}^n B_k=A_n$ while $\biguplus_{k=1}^{\infty}B_k=A$.`, math: String.raw`$P(A)=\sum_{n=1}^{\infty}P(B_n)=\lim_{N\to\infty}\sum_{n=1}^{N}P(B_n)=\lim_{N\to\infty}P(A_N).$` },
      { title: 'Part (b): reduce to (a)', text: String.raw`If $A_n\downarrow A$ then $C_n=A_1\setminus A_n\uparrow A_1\setminus A$. Apply (a) and subtract from $P(A_1)$, which is finite because $P\le1$.`, math: String.raw`$P(A_1)-P(A)=\lim_n\bigl(P(A_1)-P(A_n)\bigr)\Rightarrow P(A)=\lim_n P(A_n).$` },
      { title: 'Part (c): inclusion–exclusion', text: String.raw`Decompose $A\cup B=A\uplus(B\setminus A)$ and $B=(A\cap B)\uplus(B\setminus A)$; subtract the second identity from the first.`, math: String.raw`$P(A\cup B)=P(A)+P(B)-P(A\cap B).$` }
    ],
    answer: String.raw`$P(A)=\lim_n P(A_n)$ in both monotone cases (with $P(A_1)<\infty$ automatic in a probability space), and $P(A\cup B)=P(A)+P(B)-P(A\cap B)$.`,
    mistakes: [
      String.raw`Continuity from above needs $P(A_1)<\infty$; in general measure theory this hypothesis cannot be dropped.`,
      String.raw`Countable additivity applies only to *disjoint* unions — one cannot simply write $P(\bigcup A_n)=\sum P(A_n)$ for nested sets.`
    ],
    further: String.raw`Extend (c) to $n$ events by induction and derive the Bonferroni inequalities by truncating the alternating sum.`
  },
  {
    id: 'p3-prob-02',
    title: 'Conditional Probabilities for Two Dice',
    topicId: 'conditional-probability',
    level: 'Undergraduate 1',
    type: 'Computation',
    concepts: ['conditional probability', 'counting', 'total probability'],
    statement: String.raw`Roll two fair dice. Let $A=\{\text{sum is }8\}$ and $B=\{\text{first die is at least }5\}$. Compute $P(A)$, $P(B)$, $P(A\mid B)$, $P(B\mid A)$, and verify the law of total probability for $A$ over the partition given by the first die.`,
    hints: [
      String.raw`There are 36 equally likely ordered pairs. List the pairs summing to 8.`,
      String.raw`$P(A\mid B)=|A\cap B|/|B|$ because the outcome space is uniform.`
    ],
    solution: [
      { title: 'Count the events', text: String.raw`$A=\{(2,6),(3,5),(4,4),(5,3),(6,2)\}$ has 5 elements; $B$ has $2\cdot6=12$ elements; $A\cap B=\{(5,3),(6,2)\}$ has 2.`, math: String.raw`$P(A)=5/36,\quad P(B)=12/36=1/3,\quad P(A\cap B)=2/36=1/18.$` },
      { title: 'The two conditionals differ', text: String.raw`Divide by the appropriate denominator in each case.`, math: String.raw`$P(A\mid B)=\frac{1/18}{1/3}=\frac{1}{6}\approx0.1667,\qquad P(B\mid A)=\frac{1/18}{5/36}=\frac{2}{5}=0.4.$` },
      { title: 'Verify total probability', text: String.raw`The first-die partition $D_i=\{\text{first}=i\}$ has $P(D_i)=1/6$. Only $i=2,\dots,6$ contribute, with counts $1,1,1,1,1$ respectively.`, math: String.raw`$\sum_{i=1}^6 P(A\mid D_i)P(D_i)=\sum_{i=2}^{6}\frac{1}{6}\cdot\frac{1}{6}=\frac{5}{36}=P(A).$` }
    ],
    answer: String.raw`$P(A)=5/36\approx0.1389$, $P(B)=1/3$, $P(A\mid B)=1/6$, $P(B\mid A)=2/5$; the total-probability sum equals $5/36$.`,
    mistakes: [
      String.raw`Confusing $P(A\mid B)$ with $P(B\mid A)$ — the denominators are $|B|$ and $|A|$ respectively.`,
      String.raw`Treating $(5,3)$ and $(3,5)$ as the same outcome; dice rolls are ordered.`
    ],
    further: String.raw`Repeat the calculation for the event "sum is 7" and explain why knowing the first die gives no information in that case.`
  },
  {
    id: 'p3-prob-03',
    title: "Two Diagnostic Tests: A Bayes Calculation",
    topicId: 'bayes-theorem',
    level: 'Undergraduate 2',
    type: 'Application',
    concepts: ['Bayes theorem', 'base rate', 'conditional independence', 'odds form'],
    statement: String.raw`A disease has prevalence $0.005$. A test has sensitivity $0.98$ and specificity $0.97$. (a) Compute the positive predictive value after one positive. (b) Assuming the two test results are conditionally independent given disease status, compute the posterior after two independent positives.`,
    hints: [
      String.raw`Use $P(+)=P(+\mid D)P(D)+P(+\mid D^c)P(D^c)$ before applying Bayes.`,
      String.raw`The likelihood ratio is $0.98/0.03$; posterior odds equal likelihood ratio squared times prior odds.`
    ],
    solution: [
      { title: 'Marginal probability of a positive', text: String.raw`The false-positive rate is $1-0.97=0.03$, so:`, math: String.raw`$P(+)=0.98(0.005)+0.03(0.995)=0.0049+0.02985=0.03475.$` },
      { title: 'First posterior', text: String.raw`Bayes' theorem gives:`, math: String.raw`$P(D\mid +)=\frac{0.0049}{0.03475}\approx0.1410.$` },
      { title: 'Two positives via odds', text: String.raw`Prior odds $=0.005/0.995\approx0.005025$, likelihood ratio $=0.98/0.03\approx32.67$, so posterior odds $\approx32.67^2\cdot0.005025\approx5.36$`, math: String.raw`$P(D\mid ++)=\frac{5.36}{1+5.36}\approx0.843.$` }
    ],
    answer: String.raw`After one positive $P(D\mid +)\approx0.141$; after two conditionally independent positives $P(D\mid ++)\approx0.843$.`,
    mistakes: [
      String.raw`Using sensitivity $0.98$ as the posterior — ignoring the $0.5\%$ base rate.`,
      String.raw`Assuming the two tests are unconditionally independent; they are dependent through the unknown disease status.`
    ],
    further: String.raw`Derive the general formula for $n$ conditionally independent positives and determine how many are needed for posterior $>0.99$.`
  },
  {
    id: 'p3-prob-04',
    title: 'CDF Characterisation and Distributional Equality',
    topicId: 'random-variables',
    level: 'Undergraduate 2',
    type: 'Conceptual',
    concepts: ['CDF', 'distribution', 'measurability', 'pushforward'],
    statement: String.raw`(a) State and prove the four defining properties of a CDF. (b) Give two different random variables on the same or different spaces with the same distribution. (c) For $F(x)=0$ for $x<0$ and $F(x)=1-e^{-x}$ for $x\ge0$, compute $P(1<X\le2)$.`,
    hints: [
      String.raw`Use continuity of probability from above to prove right-continuity.`,
      String.raw`On one coin flip, the indicator of heads and the indicator of tails both are Bernoulli(1/2).`
    ],
    solution: [
      { title: 'Four properties', text: String.raw`Nondecreasing: $\{X\le x\}\subseteq\{X\le y\}$ for $x<y$. Right-continuity: $\{X\le x_n\}\downarrow\{X\le x\}$ as $x_n\downarrow x$, and continuity from above applies. Limits: $\{X\le -n\}\downarrow\varnothing$ and $\{X\le n\}\uparrow\Omega$.`, math: String.raw`$F_X(x^-)=P(X<x),\qquad P(X=x)=F_X(x)-F_X(x^-).$` },
      { title: 'Same law, different variables', text: String.raw`On $\Omega=\{H,T\}$ with $P(H)=P(T)=1/2$, set $X=\mathbf{1}_{\{H\}}$ and $Y=\mathbf{1}_{\{T\}}$. Both have $P=1/2$ at 1 and $1/2$ at 0, but $X\ne Y$.`, math: String.raw`$X\sim Y\sim\mathrm{Bernoulli}(1/2),\qquad X\ne Y.$` },
      { title: 'Interval probability', text: String.raw`Use $P(a<X\le b)=F(b)-F(a)$.`, math: String.raw`$P(1<X\le2)=(1-e^{-2})-(1-e^{-1})=e^{-1}-e^{-2}\approx0.3679-0.1353=0.2325.$` }
    ],
    answer: String.raw`CDFs are nondecreasing, right-continuous, with limits 0 and 1; $X=\mathbf{1}_H$ and $Y=\mathbf{1}_T$ share a law; $P(1<X\le2)\approx0.2325$.`,
    mistakes: [
      String.raw`Claiming a CDF must be left-continuous — jumps are allowed and encode point masses.`,
      String.raw`Assuming equal distributions imply equal random variables.`
    ],
    further: String.raw`Construct a mixed distribution with an atom at 0 and an exponential tail, and write its CDF explicitly.`
  },
  {
    id: 'p3-prob-05',
    title: 'Exponential Moments and Jensen’s Inequality',
    topicId: 'expectation',
    level: 'Undergraduate 2',
    type: 'Computation',
    concepts: ['LOTUS', 'variance', 'Jensen inequality', 'integration by parts'],
    statement: String.raw`Let $X\sim\mathrm{Exp}(3)$ with density $3e^{-3x}\mathbf{1}_{x\ge0}$. Compute $E[X]$, $E[X^2]$, $\mathrm{Var}(X)$ and $E[e^{-X}]$. Use Jensen's inequality to compare $E[\log X]$ with $\log E[X]$.`,
    hints: [
      String.raw`Use $\int_0^\infty x^n\lambda e^{-\lambda x}dx=n!/\lambda^n$.`,
      String.raw`For a concave function such as $\log$, Jensen reverses: $E[\log X]\le\log E[X]$.`
    ],
    solution: [
      { title: 'First two moments', text: String.raw`With $\lambda=3$: $E[X]=1/3$ and $E[X^2]=2/9$.`, math: String.raw`$\mathrm{Var}(X)=\frac{2}{9}-\frac{1}{9}=\frac{1}{9}\approx0.1111.$` },
      { title: 'Laplace transform', text: String.raw`Integrate $3e^{-4x}$ over $x\ge0$.`, math: String.raw`$E[e^{-X}]=\int_0^\infty 3e^{-4x}dx=\frac{3}{4}=0.75.$` },
      { title: 'Jensen comparison', text: String.raw`Since $\log$ is concave on $(0,\infty)$, $E[\log X]\le\log(1/3)\approx-1.0986$. (The exact value is $-\gamma-\log3\approx-1.6758$, consistent with the bound.)`, math: String.raw`$E[\log X]\le\log E[X].$` }
    ],
    answer: String.raw`$E[X]=1/3$, $E[X^2]=2/9$, $\mathrm{Var}(X)=1/9$, $E[e^{-X}]=3/4$, and $E[\log X]\le\log(1/3)$ by concavity.`,
    mistakes: [
      String.raw`Replacing $E[\log X]$ by $\log E[X]$ — equality requires $X$ almost surely constant.`,
      String.raw`Using $\mathrm{Var}=E[X^2]$ and forgetting to subtract $(E[X])^2$.`
    ],
    further: String.raw`Show that the exponential distribution is memoryless: $P(X>s+t\mid X>s)=P(X>t)$.`
  },
  {
    id: 'p3-prob-06',
    title: 'Normal Approximation for an Exponential Mean',
    topicId: 'central-limit-theorem',
    level: 'Undergraduate 3',
    type: 'Application',
    concepts: ['CLT', 'standardization', 'normal tail', 'sample mean'],
    statement: String.raw`Let $X_1,\dots,X_{64}$ be i.i.d. $\mathrm{Exp}(2)$. Use the CLT to approximate $P(\bar X_{64}>0.6)$ and compare with the exact gamma-distribution answer if available.`,
    hints: [
      String.raw`For $\mathrm{Exp}(2)$, $\mu=\sigma=1/2$.`,
      String.raw`Standardize with $\sigma/\sqrt n=(1/2)/8=1/16$.`
    ],
    solution: [
      { title: 'Standardize', text: String.raw`The threshold $0.6$ is $0.1$ above the mean, i.e. $1.6$ standard errors.`, math: String.raw`$z=\frac{0.6-0.5}{0.5/\sqrt{64}}=\frac{0.1}{0.0625}=1.6.$` },
      { title: 'Normal tail', text: String.raw`Using $\Phi(1.6)\approx0.9452$, the approximate probability is:`, math: String.raw`$P(\bar X>0.6)\approx1-\Phi(1.6)\approx0.0548.$` },
      { title: 'Exact comparison', text: String.raw`The exact answer for $n=64$ (gamma shape 64, rate 128) is approximately $0.052$ — the CLT error is of order $10^{-3}$, consistent with the square-root scaling.`, math: String.raw`$\text{CLT }0.0548\ \text{vs exact}\approx0.052.$` }
    ],
    answer: String.raw`Approximately $0.0548$ using the CLT (exact value about $0.052$).`,
    mistakes: [
      String.raw`Using $\sigma/\sqrt n=1/8$ — forgetting that $\sigma=1/2$ for $\mathrm{Exp}(2)$.`,
      String.raw`Applying the CLT to the raw sum rather than the standardized mean.`
    ],
    further: String.raw`Estimate the sample size needed for the normal approximation error to be below $0.005$ using the Berry–Esseen bound.`
  },
  {
    id: 'p3-prob-07',
    title: 'Stationary Distribution and Mixing of a Two-State Chain',
    topicId: 'markov-chains',
    level: 'Undergraduate 3',
    type: 'Multi-step',
    concepts: ['transition matrix', 'stationary distribution', 'detailed balance', 'convergence'],
    statement: String.raw`Consider the chain with $P=\begin{pmatrix}0.7&0.3\\0.2&0.8\end{pmatrix}$. Compute $P^2$, find the stationary distribution, verify detailed balance, and determine $P(X_2=1\mid X_0=0)$.`,
    hints: [
      String.raw`Solve $\pi P=\pi$ together with $\pi_0+\pi_1=1$.`,
      String.raw`Detailed balance means $\pi_0P_{01}=\pi_1P_{10}$.`
    ],
    solution: [
      { title: 'Two-step matrix', text: String.raw`Multiply $P$ by itself.`, math: String.raw`$P^2=\begin{pmatrix}0.55&0.45\\0.30&0.70\end{pmatrix},$` },
      { title: 'Stationary vector', text: String.raw`From $\pi_0=0.7\pi_0+0.2\pi_1$ we get $0.3\pi_0=0.2\pi_1$, hence $\pi_1=1.5\pi_0$ and $\pi=(0.4,0.6)$.`, math: String.raw`$\pi=(2/5,3/5),\qquad \pi P=\pi.$` },
      { title: 'Detailed balance', text: String.raw`Check the off-diagonal flows: $0.4\cdot0.3=0.12=0.6\cdot0.2$, so the chain is reversible.`, math: String.raw`$\pi_0P_{01}=\pi_1P_{10}=0.12.$` },
      { title: 'Two-step transition', text: String.raw`Read the $(0,1)$ entry of $P^2$.`, math: String.raw`$P(X_2=1\mid X_0=0)=0.45\ \text{vs stationary }0.6.$` }
    ],
    answer: String.raw`$P^2=\begin{pmatrix}0.55&0.45\\0.30&0.70\end{pmatrix}$, $\pi=(0.4,0.6)$, detailed balance holds, and $P(X_2=1\mid X_0=0)=0.45$.`,
    mistakes: [
      String.raw`Solving $P\pi=\pi$ instead of $\pi P=\pi$ for a row-stochastic matrix.`,
      String.raw`Assuming the two-step probability already equals the stationary probability; convergence is only asymptotic.`
    ],
    further: String.raw`Compute $P^{10}$ numerically and quantify how fast the rows approach $\pi$.`
  },
  {
    id: 'p3-prob-08',
    title: 'A One-Sided z-Test with Power Analysis',
    topicId: 'hypothesis-testing',
    level: 'Undergraduate 3',
    type: 'Application',
    concepts: ['z-test', 'p-value', 'type I error', 'power'],
    statement: String.raw`A sample of $n=36$ from a normal population with known $\sigma=12$ gives $\bar x=104$. Test $H_0:\mu=100$ against $H_1:\mu>100$ at $\alpha=0.05$, and compute the power against $\mu=104$.`,
    hints: [
      String.raw`The standard error is $\sigma/\sqrt n=2$.`,
      String.raw`Power is $P_{\mu=104}(\bar X>100+1.645\cdot2)$.`
    ],
    solution: [
      { title: 'Test statistic', text: String.raw`Under $H_0$, $Z=(\bar X-100)/2\sim\mathcal{N}(0,1)$.`, math: String.raw`$z_{\mathrm{obs}}=\frac{104-100}{12/6}=\frac{4}{2}=2.$` },
      { title: 'Decision', text: String.raw`The p-value $1-\Phi(2)\approx0.0228$ is below $0.05$, so reject $H_0$.`, math: String.raw`$p\approx0.0228<0.05.$` },
      { title: 'Power', text: String.raw`Reject when $\bar X>103.29$. Under $\mu=104$ the standardized cutoff is $(103.29-104)/2=-0.355$.`, math: String.raw`$\text{power}=\Phi(0.355)\approx0.639.$` }
    ],
    answer: String.raw`Reject $H_0$ ($z=2$, p $\approx0.0228$); power against $\mu=104$ is about $0.64$.`,
    mistakes: [
      String.raw`Reporting the p-value as $P(H_0\mid \text{data})$.`,
      String.raw`Forgetting that unknown $\sigma$ would require a t-test with 35 degrees of freedom.`
    ],
    further: String.raw`Find the sample size needed for power $0.9$ against $\mu=104$ at $\alpha=0.05$.`
  },
  {
    id: 'p3-prob-09',
    title: 'Least-Squares Fit by Hand',
    topicId: 'linear-regression',
    level: 'Undergraduate 2',
    type: 'Computation',
    concepts: ['OLS', 'normal equations', 'R-squared', 'residuals'],
    statement: String.raw`Fit a line $y=\beta_0+\beta_1 x$ by least squares to $(0,1),(1,3),(2,2),(3,5),(4,4)$. Report $\hat\beta_0,\hat\beta_1$, the residuals, RSS and $R^2$.`,
    hints: [
      String.raw`Compute $\bar x=2$, $\bar y=3$, $S_{xx}=10$, $S_{xy}=8$.`,
      String.raw`Use $R^2=1-\mathrm{RSS}/\mathrm{TSS}$ with $\mathrm{TSS}=\sum(y_i-\bar y)^2=10$.`
    ],
    solution: [
      { title: 'Slope and intercept', text: String.raw`Apply the simple-regression formulas.`, math: String.raw`$\hat\beta_1=\frac{S_{xy}}{S_{xx}}=\frac{8}{10}=0.8,\qquad\hat\beta_0=\bar y-\hat\beta_1\bar x=3-1.6=1.4.$` },
      { title: 'Fitted values and residuals', text: String.raw`Fitted values are $1.4,2.2,3.0,3.8,4.6$; residuals $y_i-\hat y_i$ are $-0.4,0.8,-1.0,1.2,-0.6$ and sum to 0.`, math: String.raw`$\mathrm{RSS}=0.16+0.64+1.00+1.44+0.36=3.60.$` },
      { title: 'Goodness of fit', text: String.raw`With $\mathrm{TSS}=10$, $R^2=1-3.6/10=0.64$.`, math: String.raw`$R^2=0.64.$` }
    ],
    answer: String.raw`$\hat y=1.4+0.8x$; residuals $(-0.4,0.8,-1,1.2,-0.6)$; $\mathrm{RSS}=3.6$; $R^2=0.64$.`,
    mistakes: [
      String.raw`Omitting the intercept and forcing the line through the origin, which changes both coefficients.`,
      String.raw`Interpreting $R^2=0.64$ as proof of a causal effect.`
    ],
    further: String.raw`Verify that the residual vector is orthogonal to both columns of the design matrix.`
  },
  {
    id: 'p3-prob-10',
    title: 'Element Orders and an Abelian Criterion',
    topicId: 'groups',
    level: 'Undergraduate 2',
    type: 'Proof',
    concepts: ['group axioms', 'order of element', 'cancellation', 'abelian'],
    statement: String.raw`(a) Prove that if $g^2=e$ for every $g$ in a group $G$, then $G$ is abelian. (b) Let $\sigma=(1\,2\,3\,4)\in S_4$. Compute $\mathrm{ord}(\sigma)$ and state what Lagrange's theorem says about $\langle\sigma\rangle$.`,
    hints: [
      String.raw`For (a), apply the hypothesis to $ab$ and expand $(ab)^2=e$.`,
      String.raw`For (b), an $m$-cycle has order $m$; $|S_4|=24$.`
    ],
    solution: [
      { title: 'Abelian criterion', text: String.raw`With $a^2=b^2=(ab)^2=e$, we get $abab=e$. Multiply on the left by $a$ and on the right by $b$, using $a^{-1}=a$, $b^{-1}=b$.`, math: String.raw`$ab=(ab)^{-1}=b^{-1}a^{-1}=ba.$` },
      { title: 'Order of a 4-cycle', text: String.raw`Successive powers of $\sigma$ return to the identity first after 4 applications.`, math: String.raw`$\sigma^2=(1\,3)(2\,4),\quad \sigma^4=e,\quad \mathrm{ord}(\sigma)=4.$` },
      { title: 'Lagrange', text: String.raw`The cyclic subgroup $\langle\sigma\rangle$ has order 4, and $4$ divides $|S_4|=24$ with index 6.`, math: String.raw`$|\langle\sigma\rangle|=4,\qquad [S_4:\langle\sigma\rangle]=6.$` }
    ],
    answer: String.raw`Every element of order dividing 2 forces commutativity; $\mathrm{ord}((1\,2\,3\,4))=4$ and $4\mid24$.`,
    mistakes: [
      String.raw`Assuming $(ab)^2=a^2b^2$ in a nonabelian group.`,
      String.raw`Claiming the converse of Lagrange: $A_4$ has order 12 but no subgroup of order 6.`
    ],
    further: String.raw`Classify all groups of order 4 and determine which satisfy $g^2=e$ for all $g$.`
  },
  {
    id: 'p3-prob-11',
    title: 'Solvability of the General Quintic',
    topicId: 'galois-theory',
    level: 'Doctoral',
    type: 'Proof',
    concepts: ['solvable group', 'simple group', 'Galois group', 'Abel–Ruffini'],
    statement: String.raw`Prove that $S_5$ is not a solvable group and deduce that the general polynomial of degree 5 over $\mathbb{Q}$ is not solvable by radicals. State precisely the theorem linking radical solvability to the Galois group.`,
    hints: [
      String.raw`$A_5$ is simple and nonabelian; recall that the commutator subgroup of $S_n$ is $A_n$ for $n\ge5$.`,
      String.raw`A group is solvable iff its derived series reaches the trivial group in finitely many steps.`
    ],
    solution: [
      { title: 'The theorem', text: String.raw`In characteristic 0, a polynomial is solvable by radicals iff its Galois group (over the base field containing the coefficients) is a solvable group. This is the precise link due to Galois.`, math: String.raw`$f\ \text{solvable by radicals}\iff \operatorname{Gal}(f)\ \text{solvable}.$` },
      { title: 'Derived series of $S_5$', text: String.raw`For $n\ge5$, $S_n'=A_n$ and $A_n$ is simple nonabelian, hence perfect: $A_n'=A_n$. The derived series therefore stalls.`, math: String.raw`$S_5\trianglerighteq A_5=A_5'=A_5''=\cdots\ne\{e\}.$` },
      { title: 'Non-solvability', text: String.raw`A solvable group must have a derived series terminating at $\{e\}$; since the series of $S_5$ stabilises at the nontrivial perfect group $A_5$, $S_5$ is not solvable.`, math: String.raw`$S_5\ \text{not solvable}.$` },
      { title: 'Generic quintic', text: String.raw`The splitting field of the generic quintic has Galois group $S_5$ (e.g. $x^5-x-1$ over $\mathbb{Q}$ has Galois group $S_5$). Hence no formula in radicals exists for general coefficients. This is the Abel–Ruffini theorem.`, math: String.raw`$\operatorname{Gal}(x^5-x-1/\mathbb{Q})\cong S_5\Rightarrow\text{not solvable by radicals}.$` }
    ],
    answer: String.raw`$S_5$ is not solvable because its derived series stabilises at the nonabelian simple group $A_5$; by Galois' criterion the general quintic is not solvable by radicals.`,
    mistakes: [
      String.raw`Claiming *no* quintic is solvable — many are (e.g. $x^5-1$). The theorem is about the general equation.`,
      String.raw`Assuming $A_5$ is solvable because it is a subgroup of a symmetric group; simplicity and nonabelianness imply perfectness.`
    ],
    further: String.raw`Investigate which subgroups of $S_5$ are solvable, and explain why a quintic with Galois group $D_5$ or $F_{20}$ is solvable by radicals.`
  },
  {
    id: 'p3-prob-12',
    title: 'A Quartic Integral by Residues',
    topicId: 'residue-theorem',
    level: "Master’s",
    type: 'Computation',
    concepts: ['residue theorem', 'simple poles', 'contour integration', 'improper integral'],
    statement: String.raw`Evaluate $\int_0^\infty \frac{dx}{x^4+1}$ by closing a contour in the upper half-plane. Justify the vanishing of the semicircular arc and give the numerical value.`,
    hints: [
      String.raw`The poles are the fourth roots of $-1$: $e^{i\pi/4},e^{3i\pi/4},e^{5i\pi/4},e^{7i\pi/4}$; only the first two lie in the upper half-plane.`,
      String.raw`For a simple pole of $1/(z^4+1)$ at $z_0$, the residue is $1/(4z_0^3)$.`
    ],
    solution: [
      { title: 'Arc estimate', text: String.raw`On the semicircle $|z|=R$, $|z^4+1|\ge R^4-1$, so the integrand is $O(R^{-4})$ and the arc length is $\pi R$; the arc integral is $O(R^{-3})\to0$.`, math: String.raw`$\left|\int_{\text{arc}}\frac{dz}{z^4+1}\right|\le\frac{\pi R}{R^4-1}\to0.$` },
      { title: 'Residues in the upper half-plane', text: String.raw`At $z_1=e^{i\pi/4}$ and $z_2=e^{3i\pi/4}$:`, math: String.raw`$\operatorname{Res}_{z_1}=\frac{1}{4}e^{-3i\pi/4},\qquad \operatorname{Res}_{z_2}=\frac{1}{4}e^{-i\pi/4}.$` },
      { title: 'Sum and integral over $\mathbb{R}$', text: String.raw`The residues sum to $-\frac{i\sqrt2}{4}$, hence:`, math: String.raw`$\int_{-\infty}^{\infty}\frac{dx}{x^4+1}=2\pi i\left(-\frac{i\sqrt2}{4}\right)=\frac{\pi}{\sqrt2}.$` },
      { title: 'Halve by symmetry', text: String.raw`The integrand is even, so the desired integral is half of the full-line value.`, math: String.raw`$\int_0^\infty\frac{dx}{x^4+1}=\frac{\pi}{2\sqrt2}\approx1.1107.$` }
    ],
    answer: String.raw`$\int_0^\infty \frac{dx}{x^4+1}=\dfrac{\pi}{2\sqrt2}\approx1.1107.$`,
    mistakes: [
      String.raw`Including poles in the lower half-plane when closing upward.`,
      String.raw`Forgetting to halve the full-line integral, or using $|z^4+1|\ge R^4+1$ (the correct bound is $R^4-1$).`
    ],
    further: String.raw`Generalise to $\int_0^\infty \frac{dx}{x^{2n}+1}=\frac{\pi}{2n}\csc\frac{\pi}{2n}$ using $n$ upper-half-plane poles.`
  },
]
