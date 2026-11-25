import type { ProofRecord } from '../lib/types'

// Proof atlas branch: analysis (real, metric, measure, complex, functional,
// Fourier and asymptotic). Deep theorems are honestly labelled "Proof sketch";
// no open problem is asserted as proved.
export const ANALYSIS_PROOFS: ProofRecord[] = [
  {
    id: 'pc-an-sup-existence',
    title: 'Existence of suprema in the reals',
    field: 'Real analysis',
    topicIds: ['completeness', 'real-numbers', 'sequences-analysis'],
    level: 'Undergraduate 1',
    status: 'Theorem',
    statement: String.raw`\text{Every nonempty }S\subseteq\mathbb{R}\text{ bounded above has a least upper bound }\alpha=\sup S\in\mathbb{R}.`,
    hypotheses: [
      `S is a nonempty subset of the real numbers`,
      `S is bounded above: there exists M with s ≤ M for every s in S`,
      `The least-upper-bound property holds for ℝ`,
    ],
    conclusion: `There is α ∈ ℝ with s ≤ α for all s ∈ S, and for every ε > 0 some s ∈ S satisfies α − ε < s.`,
    idea: `Completeness is an axiom for ℝ; bisection of an interval whose left endpoint is "not an upper bound" and whose right endpoint is an upper bound traps the least upper bound.`,
    steps: [
      {
        title: `Set up the bracket`,
        text: `Fix s₀ ∈ S and an upper bound M. Put a₀ = s₀ − 1 and b₀ = M. Then a₀ is not an upper bound of S (it is smaller than s₀), while b₀ is an upper bound.`,
        math: String.raw`$a_0<s_0\le s\le M=b_0\quad(s\in S)$`,
      },
      {
        title: `Bisect inductively`,
        text: `Let mₙ = (aₙ + bₙ)/2. If mₙ is an upper bound replace bₙ by mₙ; otherwise choose s ∈ S with s > mₙ and replace aₙ by mₙ. The invariant is preserved: aₙ is not an upper bound and bₙ is an upper bound.`,
        math: String.raw`$[a_{n+1},b_{n+1}]=\begin{cases}[m_n,b_n],& m_n\text{ an upper bound}\\[a_n,m_n],& \text{otherwise}\end{cases}$`,
      },
      {
        title: `Pass to the limit`,
        text: `The intervals are nested and their lengths are 2⁻ⁿ(b₀ − a₀), which tend to 0 by the Archimedean property. Hence the increasing sequence aₙ is bounded above by M; put α = sup aₙ. Then aₙ ≤ α ≤ bₙ for every n.`,
        math: String.raw`$b_n-a_n=2^{-n}(b_0-a_0)\longrightarrow 0$`,
      },
      {
        title: `α is an upper bound`,
        text: `If some s ∈ S satisfied s > α, choose n with 2⁻ⁿ(b₀ − a₀) < s − α. Then bₙ ≤ α + (bₙ − aₙ) < s, contradicting that bₙ is an upper bound of S.`,
      },
      {
        title: `α is the least upper bound`,
        text: `If β < α, pick n with aₙ > β. Since aₙ is not an upper bound, some s ∈ S has s > aₙ > β. Thus no β < α is an upper bound, so α = sup S.`,
      },
    ],
    assumptionsUsed: [
      `Least-upper-bound property of ℝ (completeness)`,
      `Archimedean property: 2⁻ⁿ → 0`,
    ],
    edgeCases: [
      `S unbounded above: no real supremum exists`,
      `S = ∅: every real is an upper bound and there is no least one`,
      `If S is a singleton {c}, the proof gives α = c`,
    ],
    applications: [
      `Existence of √2 and of nth roots`,
      `Monotone convergence theorem`,
      `Definition of limit superior and limit inferior`,
    ],
    references: ['Rudin, Principles of Mathematical Analysis', 'ProofWiki'],
  },
  {
    id: 'pc-an-monotone-convergence',
    title: 'Monotone convergence of real sequences',
    field: 'Real analysis',
    topicIds: ['sequences-analysis', 'completeness', 'convergence-analysis'],
    level: 'Undergraduate 1',
    status: 'Theorem',
    statement: String.raw`\text{If }(x_n)\text{ is increasing and bounded above, then }x_n\to\sup_{k}x_k.\text{ The decreasing bounded case is dual.}`,
    hypotheses: [
      `xₙ ≤ xₙ₊₁ for all n`,
      `supₙ xₙ < ∞ (or, dually, xₙ decreasing and infₙ xₙ > −∞)`,
      `ℝ has the least-upper-bound property`,
    ],
    conclusion: `The sequence converges, and its limit equals the supremum of its terms (respectively the infimum in the decreasing case).`,
    idea: `The supremum is simultaneously an ε-close upper bound and, by supremality, approached from below by the sequence itself.`,
    steps: [
      {
        title: `Identify the candidate limit`,
        text: `By completeness the nonempty set {xₙ : n ∈ ℕ} has a supremum; call it L. Monotonicity gives xₙ ≤ L for every n.`,
        math: String.raw`$L=\sup_{k\in\mathbb{N}}x_k$`,
      },
      {
        title: `Supremality supplies a near term`,
        text: `Fix ε > 0. Since L − ε is not an upper bound, there is an index N with xₙ > L − ε.`,
      },
      {
        title: `Monotonicity does the rest`,
        text: `For every n ≥ N we have L − ε < xₙ ≤ L < L + ε, hence |xₙ − L| < ε. Therefore xₙ → L by definition of convergence.`,
        math: String.raw`$L-\varepsilon<x_N\le x_n\le L\qquad(n\ge N)$`,
      },
      {
        title: `The dual statement`,
        text: `If xₙ is decreasing and bounded below, apply the result to −xₙ, which is increasing and bounded above; the limit is infₙ xₙ.`,
      },
    ],
    assumptionsUsed: [
      `Completeness of ℝ`,
      `Monotonicity to propagate the ε-close term to all later indices`,
    ],
    edgeCases: [
      `An unbounded increasing sequence diverges to +∞ rather than converging`,
      `Constant sequences are both monotone increasing and decreasing`,
      `Monotonicity is essential: merely bounded sequences can oscillate`,
    ],
    applications: [
      `Convergence of recursively defined monotone sequences`,
      `Construction of e and of infinite series of nonnegative terms`,
      `Proof of the nested interval theorem`,
    ],
    references: ['Rudin, Principles of Mathematical Analysis', 'ProofWiki'],
  },
  {
    id: 'pc-an-bolzano-weierstrass',
    title: 'Bolzano–Weierstrass theorem',
    field: 'Metric spaces',
    topicIds: ['sequences-analysis', 'compactness', 'limit-points', 'metric-spaces'],
    level: 'Undergraduate 2',
    status: 'Theorem',
    statement: String.raw`\text{Every bounded sequence in }\mathbb{R}^d\text{ has a convergent subsequence. In particular every bounded infinite subset of }\mathbb{R}^d\text{ has a limit point.}`,
    hypotheses: [
      `(xₙ) is a sequence in ℝᵈ`,
      `There is R > 0 with ‖xₙ‖ ≤ R for all n`,
      `Finite-dimensionality d < ∞`,
    ],
    conclusion: `There exist a strictly increasing index sequence nₖ and a point x ∈ ℝᵈ with x_{nₖ} → x.`,
    idea: `Repeatedly bisect a box containing all terms: at least one half contains infinitely many terms, giving nested boxes whose diameters shrink to zero; their common point is the subsequence limit.`,
    steps: [
      {
        title: `Trap the sequence in a cube`,
        text: `Choose a closed cube Q₀ containing the ball of radius R. Since Q₀ is a finite union of 2ᵈ congruent closed subcubes of half the side length, at least one subcube contains infinitely many terms.`,
        math: String.raw`$Q_0=\prod_{i=1}^{d}[-R,R]$`,
      },
      {
        title: `Nested cube construction`,
        text: `Inductively choose Q_{k+1} ⊂ Qₙ among the 2ᵈ dyadic children of Qₙ containing infinitely many terms. Pick nₖ > n_{k−1} with x_{nₖ} ∈ Qₖ.`,
      },
      {
        title: `Shrinking diameters`,
        text: `The side length of Qₖ is 2^{−k} times that of Q₀, so the diameters tend to zero; also x_{nⱼ} ∈ Qₖ for all j ≥ k by nestedness.`,
        math: String.raw`$\operatorname{diam}(Q_k)=2^{-k}\operatorname{diam}(Q_0)\to 0$`,
      },
      {
        title: `Cauchy and convergent`,
        text: `For j, ℓ ≥ k both x_{nⱼ} and x_{nℓ} lie in Qₖ, so ‖x_{nⱼ} − x_{nℓ}‖ ≤ diam(Qₖ) → 0. The subsequence is Cauchy, hence convergent in ℝᵈ, which is complete.`,
      },
      {
        title: `Infinite sets`,
        text: `Enumerate a countably infinite subset; the convergent subsequence obtained cannot be eventually constant with finitely many values, so its limit is a limit point of the original set.`,
      },
    ],
    assumptionsUsed: [
      `Completeness of ℝᵈ`,
      `Finite-dimensional pigeonhole principle for 2ᵈ dyadic subcubes`,
    ],
    edgeCases: [
      `Unbounded sequences need not have convergent subsequences (e.g. xₙ = n)`,
      `The theorem fails in infinite-dimensional normed spaces`,
      `A finite set has no limit point, hence the "infinite" hypothesis`,
    ],
    applications: [
      `Sequential compactness of closed bounded sets in ℝᵈ`,
      `Existence of minimisers in the extreme value theorem`,
      `Equivalence of sequential and covering compactness in metric spaces`,
    ],
    references: ['Rudin, Principles of Mathematical Analysis', 'ProofWiki'],
  },
  {
    id: 'pc-an-heine-borel',
    title: 'Heine–Borel theorem in ℝⁿ',
    field: 'Metric spaces',
    topicIds: ['compactness', 'metric-spaces', 'sequences-analysis', 'limit-points'],
    level: 'Undergraduate 2',
    status: 'Theorem',
    statement: String.raw`$K\subseteq\mathbb{R}^d\text{ is compact }\iff K\text{ is closed and bounded.}$`,
    hypotheses: [
      `K is a subset of finite-dimensional Euclidean space ℝᵈ`,
      `Compactness means every open cover of K admits a finite subcover`,
      `The Euclidean topology is used`,
    ],
    conclusion: `K is compact if and only if it is closed and bounded; equivalently, every sequence in K has a subsequence converging to a point of K.`,
    idea: `Boundedness traps a cube; a dyadic bisection argument shows the cube is compact, closedness passes compactness to subsets, and the converse uses the open cover by complements of shrinking balls.`,
    steps: [
      {
        title: `A closed cube is compact`,
        text: `Suppose an open cover of Q₀ = [−R,R]ᵈ has no finite subcover. Bisect Q₀; one closed dyadic child Q₁ cannot be finitely covered. Iterating gives nested cubes Qₖ with diam(Qₖ) → 0 and no finite subcover.`,
        math: String.raw`$Q_0\supseteq Q_1\supseteq\cdots,\qquad \operatorname{diam}(Q_k)=2^{-k}\operatorname{diam}(Q_0)$`,
      },
      {
        title: `The intersection point gives a contradiction`,
        text: `The unique point x in ∩ₖ Qₖ lies in some open U of the original cover. For large k, Qₖ ⊂ U since diam(Qₖ) < dist(x, ℝᵈ∖U); then Qₖ has a one-set subcover — contradiction.`,
      },
      {
        title: `Closed subsets inherit compactness`,
        text: `If K ⊂ Q₀ is closed and {Uᵢ} covers K, then {Uᵢ} together with the open set ℝᵈ∖K covers Q₀. Extract a finite subcover and discard ℝᵈ∖K to obtain a finite cover of K. Hence closed bounded sets are compact.`,
      },
      {
        title: `Compact sets are closed and bounded`,
        text: `The open cover by balls B(0,n), n ∈ ℕ, has a finite subcover, so K ⊂ B(0,N) is bounded. For closure: if x ∉ K, the sets {y : ‖y − x‖ > ‖z − x‖/2} for z ∈ K form an open cover; a finite subcover shows a ball around x misses K, so Kᶜ is open.`,
      },
      {
        title: `Sequential reformulation`,
        text: `In metric spaces compactness is equivalent to sequential compactness; combined with Bolzano–Weierstrass this gives the familiar subsequence criterion for ℝᵈ.`,
      },
    ],
    assumptionsUsed: [
      `Finite dimensionality (fails in infinite-dimensional Banach spaces)`,
      `Bolzano–Weierstrass / nested interval completeness of ℝ`,
      `Metric-space equivalence of compactness and sequential compactness`,
    ],
    edgeCases: [
      `In infinite-dimensional Banach spaces the closed unit ball is not compact`,
      `Open bounded sets such as (0,1) are not compact`,
      `In general metric spaces compact sets are closed and bounded, but not conversely`,
    ],
    applications: [
      `Extreme value theorem`,
      `Uniform continuity of continuous functions on compact sets`,
      `Existence of minimisers in optimisation and variational problems`,
    ],
    references: ['Rudin, Principles of Mathematical Analysis', 'Munkres, Topology', 'ProofWiki'],
  },
  {
    id: 'pc-an-intermediate-value',
    title: 'Intermediate value theorem',
    field: 'Real analysis',
    topicIds: ['continuity-analysis', 'connectedness', 'limits'],
    level: 'Undergraduate 1',
    status: 'Theorem',
    statement: String.raw`\text{If }f:[a,b]\to\mathbb{R}\text{ is continuous and }f(a)<y<f(b)\text{, then }\exists c\in(a,b): f(c)=y.`,
    hypotheses: [
      `a < b and f is continuous on the closed interval [a, b]`,
      `y lies strictly between f(a) and f(b) (the reversed case is analogous)`,
    ],
    conclusion: `Some c ∈ (a, b) satisfies f(c) = y; more generally f([a,b]) is an interval.`,
    idea: `The set of points where f ≤ y is nonempty and bounded; its supremum cannot be a point where f < y or f > y, by continuity.`,
    steps: [
      {
        title: `Take the natural cut point`,
        text: `Let S = {x ∈ [a,b] : f(x) ≤ y}. Then a ∈ S, S is bounded above by b, so by completeness c := sup S exists and c ∈ [a,b].`,
        math: String.raw`$c=\sup\{x\in[a,b]:f(x)\le y\}$`,
      },
      {
        title: `Rule out f(c) > y`,
        text: `If f(c) > y, continuity at c gives δ > 0 with f(x) > y whenever |x − c| < δ. Then no point of S lies in (c − δ, c], so c − δ is an upper bound of S smaller than c — contradiction.`,
      },
      {
        title: `Rule out f(c) < y`,
        text: `If f(c) < y, continuity gives δ > 0 with f(x) < y on (c − δ, c + δ) ∩ [a,b]. Then some point x > c lies in S, contradicting that c is an upper bound.`,
      },
      {
        title: `Conclude`,
        text: `Only f(c) = y remains. Since f(a) < y < f(b), c cannot be an endpoint, so c ∈ (a,b). Equivalently, the continuous image of a connected set is connected, i.e. an interval.`,
      },
    ],
    assumptionsUsed: [
      `Completeness of ℝ to define c as a supremum`,
      `ε–δ continuity at the cut point`,
      `Connectedness of intervals`,
    ],
    edgeCases: [
      `If y equals f(a) or f(b), the trivial endpoint solves the equation`,
      `Discontinuity destroys the conclusion: a jump can skip intermediate values`,
      `On a non-connected domain a continuous function need not take intermediate values`,
    ],
    applications: [
      `Existence of real roots of odd-degree polynomials`,
      `Fixed-point existence results on intervals`,
      `Bisection method for numerical root finding`,
    ],
    references: ['Rudin, Principles of Mathematical Analysis', 'ProofWiki'],
  },
  {
    id: 'pc-an-mean-value',
    title: 'Lagrange mean value theorem',
    field: 'Real analysis',
    topicIds: ['mean-value-theorem', 'differentiability-analysis', 'continuity-analysis'],
    level: 'Undergraduate 1',
    status: 'Theorem',
    statement: String.raw`\text{If }f:[a,b]\to\mathbb{R}\text{ is continuous and differentiable on }(a,b)\text{, then }\exists c\in(a,b): f'(c)=\frac{f(b)-f(a)}{b-a}.`,
    hypotheses: [
      `a < b`,
      `f is continuous on [a, b]`,
      `f is differentiable at every point of (a, b)`,
    ],
    conclusion: `There is c ∈ (a, b) where the instantaneous slope equals the average slope over [a, b].`,
    idea: `Subtract the secant line; the resulting function has equal endpoint values, so by Rolle's theorem (an interior extremum with zero derivative) its derivative vanishes somewhere.`,
    steps: [
      {
        title: `Remove the secant`,
        text: `Define g(x) = f(x) − L(x), where L is the affine function through (a, f(a)) and (b, f(b)). Then g(a) = g(b) = 0.`,
        math: String.raw`$g(x)=f(x)-f(a)-\frac{f(b)-f(a)}{b-a}(x-a)$`,
      },
      {
        title: `Find an interior extremum`,
        text: `g is continuous on the compact interval [a,b], so it attains a maximum and a minimum. If both were attained only at endpoints, then g ≡ 0; otherwise an interior extremum c exists.`,
      },
      {
        title: `Apply Fermat's theorem`,
        text: `At an interior extremum of a differentiable function, the derivative is zero (difference quotients from the left and right have opposite signs). Hence g′(c) = 0.`,
        math: String.raw`$g'(c)=f'(c)-\frac{f(b)-f(a)}{b-a}=0$`,
      },
      {
        title: `Conclude`,
        text: `Rearranging gives f′(c) = (f(b) − f(a))/(b − a). This special case with f(a) = f(b) is Rolle's theorem.`,
      },
    ],
    assumptionsUsed: [
      `Extreme value theorem on [a, b]`,
      `Fermat's interior extremum theorem`,
      `Continuity at the endpoints and differentiability inside`,
    ],
    edgeCases: [
      `If f is constant, every c ∈ (a,b) works`,
      `Endpoints need not be differentiable; only (a,b) matters`,
      `The conclusion can fail for complex-valued functions as stated (apply to real and imaginary parts separately)`,
    ],
    applications: [
      `Monotonicity criteria from the sign of f′`,
      `Taylor's theorem with remainder`,
      `L'Hôpital's rule and inequalities such as |sin x| ≤ |x|`,
    ],
    references: ['Rudin, Principles of Mathematical Analysis', 'Apostol, Mathematical Analysis'],
  },
  {
    id: 'pc-an-taylor-lagrange',
    title: 'Taylor’s theorem with Lagrange remainder',
    field: 'Real analysis',
    topicIds: ['taylor-series', 'differentiability-analysis', 'higher-order-derivatives'],
    level: 'Undergraduate 2',
    status: 'Theorem',
    statement: String.raw`$f(x)=\sum_{k=0}^{n}\frac{f^{(k)}(a)}{k!}(x-a)^k+\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1}\quad\text{for some }\xi\text{ between }a\text{ and }x.$`,
    hypotheses: [
      `f has n continuous derivatives on the closed interval between a and x`,
      `f⁽ⁿ⁺¹⁾ exists on the open interval between a and x`,
    ],
    conclusion: `f equals its nth-degree Taylor polynomial at a plus a remainder of Lagrange form with derivative evaluated at an intermediate point ξ.`,
    idea: `Repeated Cauchy mean value theorem applied to the remainder and to (t − a)ⁿ⁺¹ produces the Lagrange form without any series convergence assumption.`,
    steps: [
      {
        title: `Define the remainder function`,
        text: `Put Rₙ(t) = f(t) − Σ_{k=0}^{n} f⁽ᵏ⁾(a)(t − a)ᵏ/k!. Then Rₙ and its first n derivatives vanish at t = a.`,
        math: String.raw`$R_n^{(k)}(a)=0\quad(0\le k\le n)$`,
      },
      {
        title: `Apply Cauchy mean value theorem`,
        text: `Compare Rₙ(t) with g(t) = (t − a)ⁿ⁺¹. On the interval [a,x] there is ξ₁ with Rₙ(x)/g(x) = Rₙ′(ξ₁)/g′(ξ₁).`,
      },
      {
        title: `Iterate`,
        text: `Repeat with Rₙ′/g′, Rₙ″/g″, …; after n + 1 applications one obtains Rₙ(x)/g(x) = Rₙ⁽ⁿ⁺¹⁾(ξ)/(n+1)! for some ξ between a and x.`,
        math: String.raw`$g^{(n+1)}(t)=(n+1)!$`,
      },
      {
        title: `Identify the derivative`,
        text: `Differentiating the polynomial n + 1 times leaves only the top term, so Rₙ⁽ⁿ⁺¹⁾ = f⁽ⁿ⁺¹⁾. Hence Rₙ(x) = f⁽ⁿ⁺¹⁾(ξ)(x − a)ⁿ⁺¹/(n+1)!.`,
      },
    ],
    assumptionsUsed: [
      `Cauchy mean value theorem`,
      `Existence and continuity of the stated derivatives`,
      `Compactness for attainment of extrema used inside Rolle's theorem`,
    ],
    edgeCases: [
      `For n = 0 the statement reduces to the mean value theorem`,
      `The point ξ depends on x and is generally not explicit`,
      `A smooth function need not equal its infinite Taylor series (e.g. the flat function e^{−1/x²})`,
    ],
    applications: [
      `Error bounds for Taylor polynomial approximation`,
      `Derivation of standard series for exp, sin and cos`,
      `Second-derivative tests for local extrema`,
    ],
    references: ['Rudin, Principles of Mathematical Analysis', 'Apostol, Mathematical Analysis'],
  },
  {
    id: 'pc-an-uniform-limit-continuity',
    title: 'Uniform limits preserve continuity',
    field: 'Real analysis',
    topicIds: ['uniform-convergence', 'function-sequences', 'continuity-analysis', 'pointwise-convergence'],
    level: 'Undergraduate 2',
    status: 'Theorem',
    statement: String.raw`\text{If }f_n:X\to\mathbb{R}\text{ are continuous and }f_n\to f\text{ uniformly on }X\text{, then }f\text{ is continuous.}`,
    hypotheses: [
      `X is a metric space (or topological space with uniform convergence defined via a metric on the codomain)`,
      `Each fₙ is continuous at a point x₀ ∈ X`,
      `sup_{x∈X} |fₙ(x) − f(x)| → 0 as n → ∞`,
    ],
    conclusion: `The limit function f is continuous at x₀, hence continuous everywhere if the hypotheses hold at every point.`,
    idea: `The classical ε/3 trick: one index n controls the uniform error at both x and x₀, and continuity of that single fₙ controls the remaining difference.`,
    steps: [
      {
        title: `Split the error`,
        text: `For any x, write |f(x) − f(x₀)| ≤ |f(x) − fₙ(x)| + |fₙ(x) − fₙ(x₀)| + |fₙ(x₀) − f(x₀)|.`,
        math: String.raw`$|f(x)-f(x_0)|\le \varepsilon/3+\varepsilon/3+\varepsilon/3$`,
      },
      {
        title: `Choose n by uniform convergence`,
        text: `Given ε > 0, choose n with supₓ |fₙ(x) − f(x)| < ε/3. The same n works simultaneously for all x — this is exactly where uniformity is used.`,
      },
      {
        title: `Choose δ by continuity of fₙ`,
        text: `For this fixed n, continuity of fₙ at x₀ gives δ > 0 with |fₙ(x) − fₙ(x₀)| < ε/3 whenever d(x, x₀) < δ.`,
      },
      {
        title: `Conclude`,
        text: `Combining, |f(x) − f(x₀)| < ε for d(x,x₀) < δ, which is continuity of f at x₀.`,
      },
    ],
    assumptionsUsed: [
      `Uniform convergence of fₙ to f`,
      `Continuity of a single approximating function fₙ`,
      `Triangle inequality in ℝ`,
    ],
    edgeCases: [
      `Pointwise convergence alone is insufficient: xⁿ on [0,1] has a discontinuous limit`,
      `Uniform convergence on compact subsets suffices for local continuity`,
      `Uniform convergence does not preserve differentiability without derivative convergence`,
    ],
    applications: [
      `Continuity of sums of uniformly convergent series`,
      `Passing limits through continuous linear functionals`,
      `Proof that power series define continuous functions inside their radius`,
    ],
    references: ['Rudin, Principles of Mathematical Analysis', 'ProofWiki'],
  },
  {
    id: 'pc-an-weierstrass-m-test',
    title: 'Weierstrass M-test for series of functions',
    field: 'Real analysis',
    topicIds: ['uniform-convergence', 'series-analysis', 'function-sequences'],
    level: 'Undergraduate 2',
    status: 'Theorem',
    statement: String.raw`\text{If }|f_n(x)|\le M_n\text{ for all }x\in X\text{ and }\sum_{n=1}^{\infty}M_n<\infty\text{, then }\sum f_n\text{ converges uniformly and absolutely on }X.`,
    hypotheses: [
      `fₙ : X → ℝ (or ℂ), and Mₙ ≥ 0 satisfies |fₙ(x)| ≤ Mₙ for all x ∈ X`,
      `The numerical series Σ Mₙ converges`,
    ],
    conclusion: `Σ fₙ converges uniformly and absolutely on X; if each fₙ is continuous, so is the sum.`,
    idea: `The tails are dominated termwise by the tails of a convergent numerical series, which are uniformly small — the Weierstrass criterion for uniform Cauchy property.`,
    steps: [
      {
        title: `Estimate the tail`,
        text: `For m > n and any x ∈ X, the triangle inequality and the dominating sequence give |Σ_{k=n+1}^{m} fₖ(x)| ≤ Σ_{k=n+1}^{m} Mₖ.`,
        math: String.raw`$\sup_{x\in X}\left|\sum_{k=n+1}^{m}f_k(x)\right|\le\sum_{k=n+1}^{m}M_k$`,
      },
      {
        title: `Use numerical convergence`,
        text: `Because Σ Mₖ converges, its tails tend to 0. Given ε > 0 choose N with Σ_{k=N+1}^{m} Mₖ < ε for all m > N.`,
      },
      {
        title: `Uniform Cauchy criterion`,
        text: `The bound is independent of x, so supₓ |Σ_{k=n+1}^{m} fₖ(x)| < ε for n ≥ N: the partial sums are uniformly Cauchy.`,
      },
      {
        title: `Conclude`,
        text: `Completeness of the space of bounded functions with the sup norm (or pointwise completeness of ℝ) yields a uniform limit; absolute convergence follows from the same majorisation.`,
      },
    ],
    assumptionsUsed: [
      `Convergence of the majorant series Σ Mₙ`,
      `Completeness of ℝ or ℂ`,
      `Triangle inequality and termwise domination`,
    ],
    edgeCases: [
      `The test is only sufficient: some uniformly convergent series fail any such majorant`,
      `Pointwise domination depending on x does not suffice`,
      `Uniform absolute convergence need not imply convergence of Σ sup|fₙ| if Mₙ is chosen poorly; the Mₙ must be a summable majorant`,
    ],
    applications: [
      `Uniform convergence of power series on compact subsets of their disc`,
      `Continuity of Fourier series with absolutely summable coefficients`,
      `Justifying term-by-term integration of dominated series`,
    ],
    references: ['Rudin, Principles of Mathematical Analysis', 'ProofWiki'],
  },
  {
    id: 'pc-an-power-series-radius',
    title: 'Radius of convergence of a power series',
    field: 'Series & asymptotics',
    topicIds: ['power-series', 'series-analysis', 'series'],
    level: 'Undergraduate 3',
    status: 'Theorem',
    statement: String.raw`$R=\frac{1}{\limsup_{n\to\infty}|a_n|^{1/n}}\quad\bigl(\tfrac10:=\infty\bigr),\qquad \sum a_n z^n \text{ converges for }|z|<R\text{ and diverges for }|z|>R.$`,
    hypotheses: [
      `aₙ is a sequence of real or complex coefficients`,
      `The Cauchy–Hadamard formula defines R with the conventions 1/0 = ∞ and 1/∞ = 0`,
    ],
    conclusion: `The power series converges absolutely for |z| < R and diverges for |z| > R; convergence on |z| = R must be decided separately.`,
    idea: `Apply the root test to the terms aₙzⁿ: the nth root is |z|·|aₙ|^{1/n}, so the limsup crosses 1 exactly at |z| = R.`,
    steps: [
      {
        title: `Compute the root test quantity`,
        text: `For the series of nonnegative terms |aₙzⁿ|, the nth root equals |z| · |aₙ|^{1/n}. Set ρ = limsupₙ |aₙ|^{1/n}, so limsup of the roots is |z|ρ.`,
        math: String.raw`$\limsup_{n\to\infty}|a_nz^n|^{1/n}=|z|\,\limsup_{n\to\infty}|a_n|^{1/n}$`,
      },
      {
        title: `Inside the radius`,
        text: `If |z| < R then |z|ρ < 1. Choose q with |z|ρ < q < 1; eventually |aₙzⁿ| ≤ qⁿ, and the geometric series converges.`,
      },
      {
        title: `Outside the radius`,
        text: `If |z| > R then |z|ρ > 1, so infinitely often |aₙzⁿ| > 1; the general term does not tend to zero and the series diverges by the term test.`,
      },
      {
        title: `Boundary and uniformity`,
        text: `At |z| = R the root test is inconclusive. For every r < R the Weierstrass M-test with Mₙ = |aₙ|rⁿ gives uniform convergence on |z| ≤ r.`,
      },
    ],
    assumptionsUsed: [
      `Root test (Cauchy) for series of nonnegative terms`,
      `Weierstrass M-test for local uniform convergence`,
      `Conventions for 0 and ∞ in the reciprocal formula`,
    ],
    edgeCases: [
      `R = ∞ (e.g. coefficients 1/n!): convergence everywhere`,
      `R = 0 (e.g. coefficients n!): convergence only at the centre`,
      `The behaviour on the circle |z| = R can be arbitrarily complicated`,
    ],
    applications: [
      `Determining domains of holomorphic power series`,
      `Generating functions in combinatorics`,
      `Termwise integration and differentiation inside the radius`,
    ],
    references: ['Rudin, Principles of Mathematical Analysis', 'Ahlfors, Complex Analysis'],
  },
  {
    id: 'pc-an-riemann-continuous',
    title: 'Riemann integrability of continuous functions',
    field: 'Real analysis',
    topicIds: ['riemann-integration', 'continuity-analysis', 'compactness', 'uniform-continuity'],
    level: 'Undergraduate 2',
    status: 'Theorem',
    statement: String.raw`\text{Every continuous }f:[a,b]\to\mathbb{R}\text{ is Riemann integrable, and }\int_a^b f=\lim_{\|P\|\to0}U(f,P).`,
    hypotheses: [
      `f is continuous on the compact interval [a, b]`,
      `Riemann integrability is defined by equality of upper and lower Darboux integrals`,
    ],
    conclusion: `The upper and lower integrals coincide; the common value is the Riemann integral, and Riemann sums converge to it as the mesh tends to zero.`,
    idea: `Uniform continuity on a compact interval lets every sufficiently fine partition have oscillation less than ε on each subinterval, forcing upper and lower sums within ε(b − a).`,
    steps: [
      {
        title: `Uniform continuity`,
        text: `Continuity on compact [a,b] implies uniform continuity: given ε > 0 choose δ > 0 so |x − y| < δ implies |f(x) − f(y)| < ε/(b − a).`,
      },
      {
        title: `Choose a fine partition`,
        text: `Take any partition P with mesh ‖P‖ < δ. On each subinterval Iₖ, compactness gives points of maximum and minimum, so Mₖ − mₖ = sup_I f − inf_I f ≤ ε/(b − a).`,
        math: String.raw`$U(f,P)-L(f,P)=\sum_k (M_k-m_k)\Delta x_k$`,
      },
      {
        title: `Squeeze the Darboux sums`,
        text: `Summing, U(f,P) − L(f,P) ≤ (ε/(b−a))·(b−a) = ε. Since L(f,P) ≤ lower integral ≤ upper integral ≤ U(f,P) for every P, the difference of upper and lower integrals is at most ε.`,
      },
      {
        title: `Conclude`,
        text: `As ε > 0 was arbitrary, upper and lower integrals are equal, so f is Riemann integrable; the common value is the limit of all Riemann sums with mesh → 0.`,
      },
    ],
    assumptionsUsed: [
      `Heine–Borel compactness of [a, b]`,
      `Uniform continuity of continuous functions on compact sets`,
      `Completeness of ℝ for existence of suprema and infima`,
    ],
    edgeCases: [
      `Discontinuous functions with a set of discontinuities of measure zero are still Riemann integrable (Lebesgue criterion)`,
      `The Dirichlet function is discontinuous everywhere and not Riemann integrable`,
      `Improper integrals over unbounded domains require a separate limiting definition`,
    ],
    applications: [
      `Existence of area under a continuous curve`,
      `Fundamental theorem of calculus`,
      `Numerical quadrature error estimates via modulus of continuity`,
    ],
    references: ['Rudin, Principles of Mathematical Analysis', 'Apostol, Mathematical Analysis'],
  },
  {
    id: 'pc-an-ftc',
    title: 'Fundamental theorem of calculus',
    field: 'Real analysis',
    topicIds: ['fundamental-theorem-calculus', 'riemann-integration', 'antiderivatives', 'definite-integrals'],
    level: 'Undergraduate 2',
    status: 'Theorem',
    statement: String.raw`\text{(i) If }f\text{ is integrable on }[a,b]\text{ and }F(x)=\int_a^x f\text{, then }F'(x)=f(x)\text{ at continuity points of }f. \ \text{(ii) If }F'=f\text{ with }f\text{ integrable, then }\int_a^b f=F(b)-F(a).`,
    hypotheses: [
      `Part (i): f is Riemann integrable on [a,b] and continuous at the point x`,
      `Part (ii): F is differentiable on [a,b] with Riemann integrable derivative f`,
    ],
    conclusion: `Differentiation undoes integration at continuity points, and integration undoes differentiation up to the endpoint difference F(b) − F(a).`,
    idea: `For (i), the difference quotient of the integral is an average of f over a shrinking interval, which tends to f(x) by continuity; for (ii), telescope the increments of F using the mean value theorem.`,
    steps: [
      {
        title: `Part (i): the difference quotient`,
        text: `For h > 0, (F(x+h) − F(x))/h = (1/h)∫ₓ^{x+h} f. Its difference from f(x) is bounded by the oscillation of f on [x, x+h].`,
        math: String.raw`$\left|\frac{F(x+h)-F(x)}{h}-f(x)\right|\le\sup_{|t-x|\le h}|f(t)-f(x)|$`,
      },
      {
        title: `Continuity closes part (i)`,
        text: `Continuity at x makes the right-hand side tend to 0 as h → 0; the left-hand limit for h < 0 is similar. Hence F′(x) = f(x).`,
      },
      {
        title: `Part (ii): partition and telescope`,
        text: `For a partition a = x₀ < ⋯ < xₙ = b, the mean value theorem gives ξₖ ∈ (x_{k−1}, xₖ) with F(xₖ) − F(x_{k−1}) = f(ξₖ)Δxₖ.`,
      },
      {
        title: `Pass to the limit`,
        text: `Summing telescopes to F(b) − F(a) = Σ f(ξₖ)Δxₖ, a Riemann sum for f. As the mesh tends to zero these sums converge to ∫ₐᵇ f because f is integrable.`,
        math: String.raw`$F(b)-F(a)=\lim_{\|P\|\to0}\sum_k f(\xi_k)\Delta x_k=\int_a^b f$`,
      },
    ],
    assumptionsUsed: [
      `Riemann integrability of f`,
      `Continuity of f for part (i) at the differentiation point`,
      `Mean value theorem and existence of Riemann sums for part (ii)`,
    ],
    edgeCases: [
      `Part (i) gives differentiability only where f is continuous`,
      `If f has a jump, F has a corner there`,
      `Absolute continuity is the exact hypothesis for the Lebesgue version of part (ii)`,
    ],
    applications: [
      `Evaluation of definite integrals via antiderivatives`,
      `Definition of the logarithm as an integral`,
      `Area, arc length and work computations`,
    ],
    references: ['Rudin, Principles of Mathematical Analysis', 'Apostol, Mathematical Analysis'],
  },
  {
    id: 'pc-an-fourier-dirichlet',
    title: 'Pointwise convergence of Fourier series (Dirichlet conditions)',
    field: 'Fourier analysis',
    topicIds: ['fourier-series', 'convergence-analysis', 'function-sequences'],
    level: 'Undergraduate 3',
    status: 'Proof sketch',
    statement: String.raw`$S_Nf(x)=\sum_{|n|\le N}\widehat f(n)e^{inx}\longrightarrow \tfrac12\bigl(f(x+)+f(x-)\bigr)\quad\text{as }N\to\infty$`,
    hypotheses: [
      `f is 2π-periodic and absolutely integrable on a period`,
      `f has bounded variation in a neighbourhood of x (Dirichlet condition), or is piecewise C¹`,
    ],
    conclusion: `The symmetric partial sums converge at x to the average of the one-sided limits; for continuous points of bounded variation this equals f(x).`,
    idea: `Rewrite the partial sums as convolution with the Dirichlet kernel and use the Riemann–Lebesgue-type cancellation of its oscillatory integral against a locally well-behaved function.`,
    steps: [
      {
        title: `Dirichlet kernel representation`,
        text: `The partial sum operator is convolution with Dₙ(t) = Σ_{|k|≤n} e^{ikt} = sin((n+1/2)t)/sin(t/2), whose integral over a period is 2π.`,
        math: String.raw`$S_Nf(x)=\frac{1}{2\pi}\int_{-\pi}^{\pi} f(x-t)D_N(t)\,dt$`,
      },
      {
        title: `Isolate the local contribution`,
        text: `Subtract the one-sided limits and split the integral into |t| < δ and δ ≤ |t| ≤ π. Write the integrand relative to sin(t/2) to expose the oscillatory numerator.`,
      },
      {
        title: `Small scale`,
        text: `Near t = 0, bounded variation (or differentiability) makes f(x−t) − f(x−) Lipschitz-like; combined with the bound |sin((N+1/2)t)| ≤ 1 and the monotone denominator, this part tends to the half-sum.`,
      },
      {
        title: `Large scale`,
        text: `On δ ≤ |t| ≤ π the function (f(x−t) − limits)/sin(t/2) is integrable, and the Riemann–Lebesgue lemma sends ∫ g(t) sin((N+1/2)t) dt to 0.`,
      },
      {
        title: `Scope of the sketch`,
        text: `A complete proof requires the Riemann–Lebesgue lemma and careful handling of bounded variation; uniform convergence requires stronger smoothness (e.g. absolutely summable coefficients).`,
      },
    ],
    assumptionsUsed: [
      `Dirichlet kernel identity`,
      `Riemann–Lebesgue lemma`,
      `Bounded variation or piecewise continuous differentiability near x`,
    ],
    edgeCases: [
      `Continuous functions exist whose Fourier series diverges at a point (du Bois-Reymond)`,
      `At a jump the series converges to the midpoint, not to either one-sided value`,
      `Pointwise convergence does not imply uniform or L¹ convergence`,
    ],
    applications: [
      `Solving the heat and wave equations by separation of variables`,
      `Signal reconstruction under smoothness assumptions`,
      `Pointwise inversion of the Fourier transform`,
    ],
    references: ['Stein & Shakarchi, Fourier Analysis', 'Rudin, Real and Complex Analysis', 'ProofWiki'],
  },
  {
    id: 'pc-an-dominated-convergence',
    title: 'Dominated convergence theorem',
    field: 'Measure theory',
    topicIds: ['lebesgue-integration', 'measure-theory', 'convergence-analysis'],
    level: 'Master’s',
    status: 'Theorem',
    statement: String.raw`$f_n\to f\text{ a.e.},\quad |f_n|\le g\in L^1(\mu)\ \Longrightarrow\ \lim_{n\to\infty}\int f_n\,d\mu=\int f\,d\mu.$`,
    hypotheses: [
      `(X, 𝓜, μ) is a measure space`,
      `fₙ are measurable functions converging to f μ-almost everywhere`,
      `There is an integrable g with |fₙ| ≤ g almost everywhere for all n`,
    ],
    conclusion: `f is integrable and the integrals converge to the integral of f; moreover ∫|fₙ − f| dμ → 0.`,
    idea: `Apply Fatou's lemma to the nonnegative functions 2g − |fₙ − f|; dominance converts pointwise convergence into the inequality that forces the L¹ distance to vanish.`,
    steps: [
      {
        title: `Measurability and integrability of the limit`,
        text: `The a.e. limit of measurable functions is measurable; |f| ≤ g a.e. gives ∫|f| ≤ ∫g < ∞, so f ∈ L¹.`,
      },
      {
        title: `Apply Fatou to a nonnegative sequence`,
        text: `Since |fₙ − f| ≤ |fₙ| + |f| ≤ 2g, the functions hₙ = 2g − |fₙ − f| are nonnegative and hₙ → 2g a.e.`,
        math: String.raw`$h_n=2g-|f_n-f|\ge 0$`,
      },
      {
        title: `Fatou's inequality`,
        text: `Fatou gives ∫liminf hₙ ≤ liminf ∫hₙ, i.e. 2∫g ≤ 2∫g − limsup ∫|fₙ − f|.`,
        math: String.raw`$2\int g\,d\mu\le 2\int g\,d\mu-\limsup_n\int|f_n-f|\,d\mu$`,
      },
      {
        title: `Conclude`,
        text: `Subtracting the finite quantity 2∫g gives limsup ∫|fₙ − f| ≤ 0, hence ∫|fₙ − f| → 0 and therefore ∫fₙ → ∫f by |∫fₙ − ∫f| ≤ ∫|fₙ − f|.`,
      },
    ],
    assumptionsUsed: [
      `Fatou's lemma`,
      `Integrability of the dominating function g`,
      `Measurability of a.e. limits`,
    ],
    edgeCases: [
      `Without domination the conclusion fails: n·1_{(0,1/n)} → 0 a.e. but its integrals equal 1`,
      `A.e. convergence may be weakened to convergence in measure with the same domination`,
      `The theorem requires a fixed integrable majorant, not merely bounded integrals`,
    ],
    applications: [
      `Interchanging limit and integral in parameter-dependent integrals`,
      `Completeness of Lᵖ spaces`,
      `Differentiation under the integral sign`,
    ],
    references: ['Folland, Real Analysis', 'Rudin, Real and Complex Analysis', 'ProofWiki'],
  },
  {
    id: 'pc-an-monotone-convergence-measure',
    title: 'Monotone convergence theorem (Lebesgue)',
    field: 'Measure theory',
    topicIds: ['lebesgue-integration', 'measure-theory', 'measure-foundations'],
    level: 'Master’s',
    status: 'Theorem',
    statement: String.raw`$0\le f_1\le f_2\le\cdots,\ f_n\to f\text{ a.e.}\ \Longrightarrow\ \int f\,d\mu=\lim_{n\to\infty}\int f_n\,d\mu.$`,
    hypotheses: [
      `fₙ are nonnegative measurable functions on a measure space`,
      `fₙ ≤ fₙ₊₁ almost everywhere`,
      `f = limₙ fₙ pointwise a.e. (possibly +∞)`,
    ],
    conclusion: `f is measurable and its integral is the supremum (equivalently the limit) of the integrals of fₙ, allowing the value +∞.`,
    idea: `Approximate the limit from below by simple functions; for simple functions the identity follows from continuity from below of the measure.`,
    steps: [
      {
        title: `Reduce to simple functions`,
        text: `Since ∫f is defined as the supremum of integrals of simple functions s ≤ f, it suffices to show that any such s has ∫s ≤ limₙ ∫fₙ.`,
      },
      {
        title: `Rescale the simple function`,
        text: `Fix 0 < α < 1 and define Eₙ = {x : fₙ(x) ≥ α s(x)}. The Eₙ increase to the support of s because fₙ ↑ f ≥ s > αs there.`,
        math: String.raw`$E_n=\{x:f_n(x)\ge \alpha s(x)\}\uparrow$`,
      },
      {
        title: `Continuity from below`,
        text: `Measures are continuous from below: μ(Eₙ) ↑ μ(∪Eₙ). Hence ∫_{Eₙ} s dμ → ∫s dμ.`,
      },
      {
        title: `Compare integrals`,
        text: `On Eₙ we have αs ≤ fₙ, so α∫_{Eₙ}s ≤ ∫fₙ. Letting n → ∞ and then α ↑ 1 gives ∫s ≤ limₙ ∫fₙ ≤ ∫f.`,
        math: String.raw`$\alpha\int_{E_n}s\,d\mu\le\int f_n\,d\mu$`,
      },
      {
        title: `Conclude`,
        text: `Taking the supremum over s ≤ f gives ∫f ≤ limₙ ∫fₙ; the reverse inequality follows from fₙ ≤ f. Therefore equality holds.`,
      },
    ],
    assumptionsUsed: [
      `Continuity from below of measures`,
      `Definition of the Lebesgue integral as a supremum over simple functions`,
      `Measurability of pointwise increasing limits`,
    ],
    edgeCases: [
      `The limit may be +∞; the statement remains valid with extended real values`,
      `Nonnegativity is essential; for signed functions use the dominated convergence theorem`,
      `Increasing sequences of measurable functions need not converge uniformly`,
    ],
    applications: [
      `Defining integrals of nonnegative functions`,
      `Beppo Levi's theorem for series of nonnegative functions`,
      `Proof of Fatou's lemma and of the Radon–Nikodym theorem`,
    ],
    references: ['Folland, Real Analysis', 'Rudin, Real and Complex Analysis', 'ProofWiki'],
  },
  {
    id: 'pc-an-fatou',
    title: 'Fatou’s lemma',
    field: 'Measure theory',
    topicIds: ['lebesgue-integration', 'measure-theory'],
    level: 'Master’s',
    status: 'Lemma',
    statement: String.raw`$f_n\ge 0\text{ measurable}\ \Longrightarrow\ \int\liminf_{n\to\infty} f_n\,d\mu\ \le\ \liminf_{n\to\infty}\int f_n\,d\mu.$`,
    hypotheses: [
      `fₙ are nonnegative measurable functions`,
      `No domination or pointwise convergence is assumed`,
      `Integrals may take the value +∞`,
    ],
    conclusion: `The integral of the pointwise lower limit is at most the lower limit of the integrals.`,
    idea: `For each k, the infimum over n ≥ k is an increasing sequence bounded by fₙ; apply monotone convergence to it.`,
    steps: [
      {
        title: `Introduce infima`,
        text: `Set gₖ = inf_{n≥k} fₙ. Then gₖ is measurable, nonnegative, and gₖ ↑ liminfₙ fₙ.`,
        math: String.raw`$g_k\uparrow \liminf_{n\to\infty}f_n$`,
      },
      {
        title: `Apply monotone convergence`,
        text: `By the monotone convergence theorem, ∫liminf fₙ = limₖ ∫gₖ.`,
      },
      {
        title: `Compare with the tail integrals`,
        text: `Since gₖ ≤ fₙ for every n ≥ k, ∫gₖ ≤ inf_{n≥k} ∫fₙ.`,
        math: String.raw`$\int g_k\,d\mu\le\inf_{n\ge k}\int f_n\,d\mu$`,
      },
      {
        title: `Take limits`,
        text: `Taking k → ∞ on both sides gives ∫liminf fₙ ≤ limₖ inf_{n≥k} ∫fₙ = liminfₙ ∫fₙ.`,
      },
    ],
    assumptionsUsed: [
      `Monotone convergence theorem`,
      `Measurability of countable infima`,
      `Nonnegativity of the functions`,
    ],
    edgeCases: [
      `Strict inequality can occur: fₙ = n·1_{(0,1/n)} has liminf fₙ = 0 but integrals 1`,
      `The left side may be +∞, in which case the liminf of integrals is +∞ too`,
      `The analogue with limsup requires domination (Fatou reverse under an integrable majorant)`,
    ],
    applications: [
      `Dominated convergence theorem`,
      `Semicontinuity of integral functionals in the calculus of variations`,
      `Proof of Scheffé's lemma in probability theory`,
    ],
    references: ['Folland, Real Analysis', 'Billingsley, Probability and Measure'],
  },
  {
    id: 'pc-an-fubini',
    title: 'Fubini–Tonelli theorem',
    field: 'Measure theory',
    topicIds: ['lebesgue-integration', 'measure-theory', 'multiple-integrals'],
    level: 'Master’s',
    status: 'Proof sketch',
    statement: String.raw`\int_{X\times Y} f\,d(\mu\times\nu)=\int_X\!\int_Y f(x,y)\,d\nu(y)\,d\mu(x)=\int_Y\!\int_X f(x,y)\,d\mu(x)\,d\nu(y)`,
    hypotheses: [
      `μ and ν are σ-finite measures`,
      `Tonelli: f ≥ 0 is measurable on the product σ-algebra`,
      `Fubini: f is integrable with respect to μ ⊗ ν`,
    ],
    conclusion: `The iterated integrals exist and agree with the product integral; for nonnegative f the common value may be +∞.`,
    idea: `Build the product measure by extending rectangles, prove the identity first for indicators by monotone class, then lift to nonnegative functions by monotone convergence and to integrable functions by linearity.`,
    steps: [
      {
        title: `Rectangles and product measure`,
        text: `Define (μ ⊗ ν)(A × B) = μ(A)ν(B) and extend to the product σ-algebra by the Carathéodory extension theorem; σ-finiteness guarantees uniqueness.`,
      },
      {
        title: `Indicators via monotone class`,
        text: `For f = 1_E the identity is Tonelli's formula for the product measure of E. The class of E for which it holds is a monotone class containing the algebra of finite unions of rectangles, hence contains the product σ-algebra.`,
      },
      {
        title: `Nonnegative functions`,
        text: `Approximate f ≥ 0 by an increasing sequence of simple functions and apply the monotone convergence theorem to both the product integral and each iterated integral.`,
        math: String.raw`$\int f\,d(\mu\otimes\nu)=\lim_k\int s_k\,d(\mu\otimes\nu)$`,
      },
      {
        title: `Integrable functions`,
        text: `Write f = f⁺ − f⁻. Tonelli applied to f⁺ and f⁻ shows both iterated integrals are finite a.e.; subtract to obtain Fubini's identity.`,
      },
      {
        title: `Why this is a sketch`,
        text: `A full proof requires the Carathéodory extension theorem, the monotone class theorem, and measurability of y ↦ f(x,y); these standard ingredients are cited rather than reproduced.`,
      },
    ],
    assumptionsUsed: [
      `σ-finiteness of the factors`,
      `Carathéodory extension and monotone class theorems`,
      `Monotone convergence theorem`,
    ],
    edgeCases: [
      `Without integrability the iterated integrals may differ for conditionally convergent examples`,
      `Non-σ-finite measures can break uniqueness of the product measure`,
      `Measurability with respect to the completion needs care`,
    ],
    applications: [
      `Computing double integrals by iterated integration`,
      `Convolution and Young's inequality`,
      `Probability: expectations via conditional distributions`,
    ],
    references: ['Folland, Real Analysis', 'Rudin, Real and Complex Analysis', 'Billingsley, Probability and Measure'],
  },
  {
    id: 'pc-an-radon-nikodym',
    title: 'Radon–Nikodym theorem',
    field: 'Measure theory',
    topicIds: ['radon-nikodym', 'measure-theory', 'absolute-continuity'],
    level: 'Master’s',
    status: 'Proof sketch',
    statement: String.raw`\nu\ll\mu,\ \mu\ \sigma\text{-finite}\ \Longrightarrow\ \exists\,h\ge 0\ \text{measurable}:\ \nu(E)=\int_E h\,d\mu\quad\forall E,\ \ h=\frac{d\nu}{d\mu}\ \mu\text{-a.e. unique}.`,
    hypotheses: [
      `ν is a σ-finite signed or positive measure absolutely continuous with respect to μ`,
      `μ is σ-finite`,
    ],
    conclusion: `There is a μ-measurable density h, unique up to μ-null sets, such that ν(E) = ∫_E h dμ for all measurable E.`,
    idea: `Use the Hilbert-space argument: the map f ↦ ∫f d(ν + μ) is a bounded functional on L²(ν+μ), hence represented by a function; the Lebesgue decomposition falls out of a maximality argument.`,
    steps: [
      {
        title: `Form an auxiliary finite measure`,
        text: `By σ-finiteness reduce to the finite case and put λ = ν + μ. The inclusion L²(λ) ↪ L¹(λ) is continuous because λ is finite.`,
      },
      {
        title: `Represent the functional`,
        text: `The map ℓ(f) = ∫f dν is a bounded linear functional on L²(λ); by the Riesz representation theorem ℓ(f) = ∫f g dλ for some g ∈ L²(λ).`,
      },
      {
        title: `Extract the density`,
        text: `Rearranging ν(E) = ∫_E g dλ and λ = ν + μ yields ν(E) = ∫_E [g/(1−g)] dμ on the set where g < 1; absolute continuity forces g = 1 on the μ-singular part.`,
        math: String.raw`$h=\frac{g}{1-g}\quad\text{on }\{g<1\}$`,
      },
      {
        title: `Uniqueness`,
        text: `If ∫_E h₁ dμ = ∫_E h₂ dμ for every E, then h₁ = h₂ μ-almost everywhere by applying this to {h₁ > h₂} and {h₂ > h₁}.`,
      },
      {
        title: `Scope of the sketch`,
        text: `A complete proof needs the Riesz representation theorem for L² and a careful treatment of the singular part (Lebesgue decomposition); the statement above is exact.`,
      },
    ],
    assumptionsUsed: [
      `Absolute continuity ν ≪ μ`,
      `σ-finiteness`,
      `Riesz representation theorem in Hilbert space`,
    ],
    edgeCases: [
      `If ν has a singular part, no density exists for ν alone`,
      `Without σ-finiteness the density may fail to exist`,
      `Uniqueness is only μ-almost everywhere`,
    ],
    applications: [
      `Change of measure and likelihood ratios in probability`,
      `Conditional expectation`,
      `Characterisation of absolutely continuous functions`,
    ],
    references: ['Folland, Real Analysis', 'Rudin, Real and Complex Analysis', 'Royden & Fitzpatrick, Real Analysis'],
  },
  {
    id: 'pc-an-lebesgue-differentiation',
    title: 'Lebesgue differentiation theorem',
    field: 'Measure theory',
    topicIds: ['differentiation-theory', 'measure-theory', 'lebesgue-integration'],
    level: 'Doctoral',
    status: 'Proof sketch',
    statement: String.raw`\text{For }f\in L^1_{\mathrm{loc}}(\mathbb{R}^d):\quad \lim_{r\to0}\frac{1}{|B(x,r)|}\int_{B(x,r)}|f(y)-f(x)|\,dy=0\quad\text{for a.e. }x.`,
    hypotheses: [
      `f is locally integrable on ℝᵈ`,
      `Balls are taken with respect to the Euclidean metric and Lebesgue measure`,
    ],
    conclusion: `Almost every point is a Lebesgue point of f; in particular the averages of f over shrinking balls converge to f(x) a.e.`,
    idea: `Prove a weak-type maximal inequality for the Hardy–Littlewood maximal function, then use density of continuous functions and a standard "good function + maximal bound" argument.`,
    steps: [
      {
        title: `Hardy–Littlewood maximal function`,
        text: `Define Mf(x) = sup_{r>0} (1/|B(x,r)|) ∫_{B(x,r)} |f|. A covering lemma gives the weak (1,1) bound |{Mf > λ}| ≤ C‖f‖₁/λ.`,
        math: String.raw`$|\{x:Mf(x)>\lambda\}|\le \frac{C}{\lambda}\|f\|_{L^1}$`,
      },
      {
        title: `Continuous functions`,
        text: `For continuous f the averages converge everywhere by ordinary continuity; moreover the oscillation at scale r is controlled uniformly on compact sets.`,
      },
      {
        title: `Density argument`,
        text: `Given f ∈ L¹_loc and ε > 0, write f = g + h with g continuous and ‖h‖₁ small. The maximal bound controls the set where Mh exceeds ε, whose measure can be made arbitrarily small.`,
      },
      {
        title: `Pass to the limit`,
        text: `For x outside a small exceptional set, limsup of the averages of |f(y) − f(x)| is bounded by ε; letting ε → 0 gives the result a.e.`,
      },
      {
        title: `Scope of the sketch`,
        text: `The full proof requires the Vitali or rising-sun covering lemma and the weak-type estimate for the maximal operator; those ingredients are standard and only summarised here.`,
      },
    ],
    assumptionsUsed: [
      `Vitali covering lemma`,
      `Weak (1,1) estimate for the maximal function`,
      `Density of continuous functions in L¹`,
    ],
    edgeCases: [
      `The exceptional null set is unavoidable for arbitrary L¹ functions`,
      `Local integrability is needed for the averages to be finite`,
      `The result fails for general measures without a doubling condition`,
    ],
    applications: [
      `Almost everywhere convergence of approximations to the identity`,
      `Differentiability almost everywhere of functions of bounded variation`,
      `Absolute continuity and the fundamental theorem for Lebesgue integrals`,
    ],
    references: ['Stein & Shakarchi, Real Analysis', 'Folland, Real Analysis'],
  },
  {
    id: 'pc-an-lp-complete',
    title: 'Completeness of Lᵖ spaces',
    field: 'Functional analysis',
    topicIds: ['lp-spaces', 'banach-spaces', 'completeness', 'measure-theory'],
    level: 'Master’s',
    status: 'Theorem',
    statement: String.raw`$1\le p\le\infty:\quad L^p(\mu)\text{ with }\|f\|_p=\bigl(\int|f|^p d\mu\bigr)^{1/p}\text{ is a Banach space.}$`,
    hypotheses: [
      `1 ≤ p ≤ ∞`,
      `Functions are equivalence classes modulo μ-a.e. equality`,
    ],
    conclusion: `Every Cauchy sequence in Lᵖ converges in the Lᵖ norm to an element of Lᵖ; in particular L² is a Hilbert space.`,
    idea: `Extract a rapidly convergent subsequence, use pointwise convergence a.e. plus Fatou to build the candidate limit, and dominated/Minkowski estimates to prove norm convergence.`,
    steps: [
      {
        title: `Choose a fast Cauchy subsequence`,
        text: `From a Cauchy sequence (fₙ) pick nₖ with ‖fₙ − fₘ‖ₚ < 2^{−k} for n,m ≥ nₖ. Then define gₖ = f_{n_{k+1}} − f_{nₖ}.`,
      },
      {
        title: `Pointwise a.e. limit`,
        text: `The series Σ|gₖ| has ∫(Σ|gₖ|)ᵖ ≤ (Σ‖gₖ‖ₚ)ᵖ < ∞ by Minkowski, so Σ|gₖ| < ∞ a.e. and f_{nₖ}(x) converges a.e. to some f.`,
        math: String.raw`$\left\|\sum_k |g_k|\right\|_p\le\sum_k\|g_k\|_p<\infty$`,
      },
      {
        title: `The limit lies in Lᵖ`,
        text: `Fatou applied to |f_{nₖ} − f_{n₁}|ᵖ (or the pointwise limit of partial sums) gives ‖f‖ₚ < ∞.`,
      },
      {
        title: `Norm convergence`,
        text: `Given ε > 0 choose k with ‖f_{nₖ} − f_{nₘ}‖ₚ < ε for all m ≥ k; Fatou on |f_{nₖ} − f|ᵖ as m → ∞ yields ‖f_{nₖ} − f‖ₚ ≤ ε. The whole sequence then converges since it is Cauchy.`,
      },
      {
        title: `p = ∞`,
        text: `For p = ∞ use essential suprema: Cauchy sequences converge uniformly outside a common null set, giving an L∞ limit.`,
      },
    ],
    assumptionsUsed: [
      `Minkowski inequality`,
      `Fatou's lemma`,
      `Completeness of ℝ/ℂ for pointwise convergence`,
    ],
    edgeCases: [
      `For 0 < p < 1 the triangle inequality fails; quasi-Banach spaces result`,
      `Lᵖ must quotient by a.e. equality to be a normed (not just seminormed) space`,
      `Pointwise a.e. convergence alone is weaker than Lᵖ convergence`,
    ],
    applications: [
      `Riesz representation theorem and duality of Lᵖ`,
      `Existence of minimisers in variational problems`,
      `Convergence of Fourier series in L²`,
    ],
    references: ['Folland, Real Analysis', 'Rudin, Real and Complex Analysis', 'Kreyszig, Introductory Functional Analysis with Applications'],
  },
  {
    id: 'pc-an-holder',
    title: 'Hölder’s inequality',
    field: 'Functional analysis',
    topicIds: ['lp-spaces', 'measure-theory', 'normed-spaces'],
    level: 'Master’s',
    status: 'Theorem',
    statement: String.raw`$1<p<\infty,\ \tfrac1p+\tfrac1q=1:\quad \int|fg|\,d\mu\le\Bigl(\int|f|^p d\mu\Bigr)^{1/p}\Bigl(\int|g|^q d\mu\Bigr)^{1/q}.$`,
    hypotheses: [
      `1 < p < ∞ and q = p/(p − 1) is the conjugate exponent`,
      `f ∈ Lᵖ(μ) and g ∈ Lᵠ(μ)`,
    ],
    conclusion: `The product fg is integrable and ‖fg‖₁ ≤ ‖f‖ₚ‖g‖ᵠ; Young's inequality ab ≤ aᵖ/p + bᵠ/q is the key estimate.`,
    idea: `Normalise ‖f‖ₚ = ‖g‖ᵠ = 1 and apply Young's inequality pointwise to a = |f(x)|, b = |g(x)|, then integrate.`,
    steps: [
      {
        title: `Handle trivial cases`,
        text: `If either norm is 0 or ∞ the inequality is immediate; otherwise scale f and g so that both norms equal 1.`,
      },
      {
        title: `Young's inequality`,
        text: `For nonnegative a, b with conjugate exponents, ab ≤ aᵖ/p + bᵠ/q, with equality iff aᵖ = bᵠ. This follows from convexity of the exponential (or from weighted AM–GM).`,
        math: String.raw`$ab\le \frac{a^p}{p}+\frac{b^q}{q}$`,
      },
      {
        title: `Integrate`,
        text: `Apply Young pointwise to |f(x)| and |g(x)| and integrate: ∫|fg| ≤ (1/p)∫|f|ᵖ + (1/q)∫|g|ᵠ = 1/p + 1/q = 1.`,
        math: String.raw`$\int|fg|\,d\mu\le\frac{\|f\|_p^p}{p}+\frac{\|g\|_q^q}{q}=1$`,
      },
      {
        title: `Undo the normalisation`,
        text: `Rescaling by ‖f‖ₚ and ‖g‖ᵠ yields the general inequality. The endpoint cases p = 1, q = ∞ and p = q = 2 are immediate or follow by continuity.`,
      },
    ],
    assumptionsUsed: [
      `Young's inequality from convexity`,
      `Conjugacy relation 1/p + 1/q = 1`,
      `Measurability of products`,
    ],
    edgeCases: [
      `p = 1, q = ∞: ∫|fg| ≤ ‖f‖₁‖g‖∞`,
      `Equality characterisation requires aᵖ proportional to bᵠ a.e.`,
      `σ-finiteness is not needed for the inequality itself`,
    ],
    applications: [
      `Minkowski inequality`,
      `Duality (Lᵖ)* ≅ Lᵠ for 1 < p < ∞`,
      `Cauchy–Schwarz as the case p = q = 2`,
    ],
    references: ['Folland, Real Analysis', 'Rudin, Real and Complex Analysis'],
  },
  {
    id: 'pc-an-minkowski',
    title: 'Minkowski inequality',
    field: 'Functional analysis',
    topicIds: ['lp-spaces', 'normed-spaces', 'measure-theory'],
    level: 'Master’s',
    status: 'Theorem',
    statement: String.raw`$1\le p\le\infty:\quad \|f+g\|_p\le\|f\|_p+\|g\|_p,$`,
    hypotheses: [
      `1 ≤ p ≤ ∞`,
      `f, g ∈ Lᵖ(μ)`,
    ],
    conclusion: `The Lᵖ triangle inequality holds, so ‖·‖ₚ is a norm on equivalence classes modulo a.e. equality.`,
    idea: `Split |f+g|ᵖ ≤ |f||f+g|ᵖ⁻¹ + |g||f+g|ᵖ⁻¹ and apply Hölder with the conjugate exponent q = p/(p−1).`,
    steps: [
      {
        title: `Pointwise splitting`,
        text: `Since |f + g| ≤ |f| + |g|, multiply by |f+g|ᵖ⁻¹ to get |f+g|ᵖ ≤ (|f| + |g|)|f+g|ᵖ⁻¹.`,
      },
      {
        title: `Integrate and apply Hölder`,
        text: `Integrating and applying Hölder to each term with exponent p and conjugate q gives ‖f+g‖ₚᵖ ≤ (‖f‖ₚ + ‖g‖ₚ)‖f+g‖ₚ^(p/q).`,
        math: String.raw`$\|f+g\|_p^p\le(\|f\|_p+\|g\|_p)\|f+g\|_p^{p/q}$`,
      },
      {
        title: `Simplify the exponent`,
        text: `Since p − p/q = 1, dividing by ‖f+g‖ₚ^(p/q) (the zero case is trivial) gives ‖f+g‖ₚ ≤ ‖f‖ₚ + ‖g‖ₚ.`,
      },
      {
        title: `Endpoint p = ∞`,
        text: `For p = ∞ use |f+g| ≤ ‖f‖∞ + ‖g‖∞ outside the union of two null sets.`,
      },
    ],
    assumptionsUsed: [
      `Hölder's inequality`,
      `Conjugacy p/q = p − 1`,
      `Triangle inequality in ℝ or ℂ`,
    ],
    edgeCases: [
      `For 0 < p < 1 the inequality reverses and ‖·‖ₚ is not a norm`,
      `Equality occurs when f and g are nonnegative scalar multiples a.e.`,
      `The p = 1 case follows directly from ∫|f+g| ≤ ∫|f| + ∫|g|`,
    ],
    applications: [
      `Completeness of Lᵖ`,
      `Triangle inequality for ℓᵖ sequence spaces`,
      `Convolution estimates and Young's inequality`,
    ],
    references: ['Folland, Real Analysis', 'Kreyszig, Introductory Functional Analysis with Applications'],
  },
  {
    id: 'pc-an-hahn-banach',
    title: 'Hahn–Banach extension theorem',
    field: 'Functional analysis',
    topicIds: ['hahn-banach', 'dual-spaces', 'normed-spaces'],
    level: 'Master’s',
    status: 'Proof sketch',
    statement: String.raw`\text{If }p:X\to\mathbb{R}\text{ is sublinear, }f:Y\to\mathbb{R}\text{ linear on }Y\le X,\text{ and }f\le p\text{ on }Y,\text{ then }\exists\,F:X\to\mathbb{R}\text{ linear with }F|_Y=f,\ F\le p.`,
    hypotheses: [
      `X is a real vector space and Y is a linear subspace`,
      `p is sublinear: p(x+y) ≤ p(x)+p(y) and p(tx) = t p(x) for t ≥ 0`,
      `f is linear on Y and dominated by p on Y`,
    ],
    conclusion: `There is a linear extension F to all of X still dominated by p; choosing p = ‖·‖ gives norm-preserving extensions of bounded functionals.`,
    idea: `Zorn's lemma gives a maximal dominated extension; if its domain is not all of X, one can extend by one dimension while preserving domination — contradiction.`,
    steps: [
      {
        title: `Partially order extensions`,
        text: `Consider pairs (Z, g) with Y ⊆ Z ⊆ X and g linear on Z, g|_Y = f, g ≤ p on Z. Order by extension of domain and agreement of values.`,
      },
      {
        title: `Maximal element`,
        text: `Every chain has an upper bound given by the union of domains and the compatible linear functional, so by Zorn's lemma there is a maximal element (Z₀, g₀).`,
      },
      {
        title: `One-dimensional extension lemma`,
        text: `If Z₀ ≠ X, pick x₀ ∉ Z₀. One can choose a value a = g₁(x₀) lying between sup_{z∈Z₀}[g₀(z) − p(z − x₀)] and inf_{z∈Z₀}[p(z + x₀) − g₀(z)]; sublinearity makes the interval nonempty.`,
        math: String.raw`$g_0(z)-p(z-x_0)\le a\le p(z+x_0)-g_0(z)$`,
      },
      {
        title: `Contradiction`,
        text: `Setting g₁(z + t x₀) = g₀(z) + ta defines a larger dominated extension, contradicting maximality; hence Z₀ = X.`,
      },
      {
        title: `Norm-preserving corollary`,
        text: `With p(x) = ‖x‖ and complex scalars handled by taking real parts, f extends with ‖F‖ = ‖f‖; this yields separation theorems and nonemptiness of duals.`,
      },
    ],
    assumptionsUsed: [
      `Axiom of choice (Zorn's lemma)`,
      `Sublinearity of p`,
      `One-dimensional extension lemma`,
    ],
    edgeCases: [
      `Constructive mathematics rejects the nonconstructive choice step`,
      `The dominating functional p must be finite and sublinear`,
      `Complex case requires the trick F(x) = f̃(x) − i f̃(ix)`,
    ],
    applications: [
      `Separation of convex sets by hyperplanes`,
      `Existence of supporting functionals and norming functionals`,
      `Duality of normed spaces and weak topologies`,
    ],
    references: ['Rudin, Functional Analysis', 'Conway, A Course in Functional Analysis', 'Kreyszig, Introductory Functional Analysis with Applications'],
  },
  {
    id: 'pc-an-uniform-boundedness',
    title: 'Uniform boundedness principle (Banach–Steinhaus)',
    field: 'Functional analysis',
    topicIds: ['banach-spaces', 'bounded-operators', 'linear-operators'],
    level: 'Master’s',
    status: 'Theorem',
    statement: String.raw`\text{If }X\text{ is Banach, }Y\text{ normed, and }\{T_\alpha\}\subset\mathcal{B}(X,Y)\text{ satisfies }\sup_\alpha\|T_\alpha x\|<\infty\ \forall x,\text{ then }\sup_\alpha\|T_\alpha\|<\infty.`,
    hypotheses: [
      `X is a Banach space and Y is a normed space`,
      `For each fixed x ∈ X, the set {‖Tαx‖} is bounded`,
      `Each Tα is a bounded linear operator`,
    ],
    conclusion: `The operator norms ‖Tα‖ are uniformly bounded.`,
    idea: `The sets Eₙ = {x : supα ‖Tαx‖ ≤ n} are closed and their union is all of X; Baire category forces one Eₙ to have interior, and scaling gives a uniform bound.`,
    steps: [
      {
        title: `Define the closed sets`,
        text: `Let Eₙ = ⋂α {x : ‖Tαx‖ ≤ n}. Each set in the intersection is closed by continuity of Tα, so Eₙ is closed.`,
        math: String.raw`$E_n=\bigcap_{\alpha}\{x:\|T_\alpha x\|\le n\}$`,
      },
      {
        title: `Baire category`,
        text: `By pointwise boundedness, X = ⋃ₙ Eₙ. Completeness of X (Baire theorem) implies some E_N has nonempty interior.`,
      },
      {
        title: `Exploit an interior ball`,
        text: `There are x₀ and r > 0 with B(x₀, r) ⊂ E_N. For ‖x‖ < r, both x₀ + x and x₀ lie in E_N, so ‖Tαx‖ ≤ ‖Tα(x₀+x)‖ + ‖Tαx₀‖ ≤ 2N.`,
      },
      {
        title: `Scale to all x`,
        text: `For arbitrary x ≠ 0, take t = r/(2‖x‖) so ‖tx‖ < r; linearity gives ‖Tαx‖ ≤ (2N/t)‖x‖ = 4N‖x‖/r, uniformly in α.`,
        math: String.raw`$\sup_\alpha\|T_\alpha\|\le \frac{4N}{r}$`,
      },
    ],
    assumptionsUsed: [
      `Baire category theorem (requires completeness of X)`,
      `Continuity of each Tα`,
      `Linearity for the scaling step`,
    ],
    edgeCases: [
      `Completeness of X is essential; pointwise bounded families on incomplete spaces can be unbounded in norm`,
      `The theorem fails if the index family consists of nonlinear maps`,
      `The bound is nonconstructive: Baire gives existence but not its value`,
    ],
    applications: [
      `Existence of continuous functions with divergent Fourier series at a point`,
      `Interchange of limits for sequences of bounded operators`,
      `Closed graph and open mapping theorems`,
    ],
    references: ['Rudin, Functional Analysis', 'Kreyszig, Introductory Functional Analysis with Applications'],
  },
  {
    id: 'pc-an-open-mapping',
    title: 'Open mapping theorem',
    field: 'Functional analysis',
    topicIds: ['open-mapping-theorem', 'banach-spaces', 'linear-operators'],
    level: 'Master’s',
    status: 'Proof sketch',
    statement: String.raw`\text{A surjective bounded linear operator }T:X\to Y\text{ between Banach spaces is open; hence it is an isomorphism if injective.}`,
    hypotheses: [
      `X and Y are Banach spaces`,
      `T is bounded, linear and surjective`,
    ],
    conclusion: `T maps open sets to open sets; if T is also injective then T⁻¹ is bounded and T is an isomorphism of Banach spaces.`,
    idea: `Baire category applied to the images of balls shows the image of a ball contains a ball; iteration of an approximate-preimage construction removes the closure.`,
    steps: [
      {
        title: `Images of balls are somewhere dense`,
        text: `Write X = ⋃ₙ n·B_X. By surjectivity, Y = ⋃ₙ T(nB_X) = ⋃ₙ n·T(B_X). Baire implies some closure of T(B_X) contains a ball around 0.`,
      },
      {
        title: `Symmetrisation gives a neighbourhood`,
        text: `Since B_X is symmetric, cl T(B_X) − cl T(B_X) ⊂ cl T(2B_X); hence cl T(B_X) contains a ball B_Y(0, δ).`,
      },
      {
        title: `Remove the closure by iteration`,
        text: `For y with ‖y‖ < δ/2, choose x₁ with ‖x₁‖ < 2/δ·‖y‖·... and ‖y − Tx₁‖ small; iterate with geometrically decreasing errors. Completeness of X makes Σxₙ converge.`,
        math: String.raw`$y=\sum_{n=1}^\infty T x_n,\qquad \|x_n\|\lesssim 2^{-n}\|y\|$`,
      },
      {
        title: `Conclude openness`,
        text: `The limit x satisfies Tx = y and ‖x‖ ≤ C‖y‖, so T(B_X(0,r)) contains a ball around 0. Linearity and translation then make T open; injectivity gives a bounded inverse.`,
      },
      {
        title: `Scope of the sketch`,
        text: `The iterative "removal of closure" step needs careful estimates; the Baire-category core and the conclusion are exact.`,
      },
    ],
    assumptionsUsed: [
      `Baire category theorem`,
      `Completeness of both spaces`,
      `Surjectivity of T`,
    ],
    edgeCases: [
      `Surjectivity is essential: the inclusion ℓ¹ ↪ ℓ² is not open onto its image`,
      `Incomplete spaces can admit bijective bounded operators with unbounded inverse`,
      `Quotient maps are the natural generalisation`,
    ],
    applications: [
      `Closed graph theorem`,
      `Bounded inverse theorem for bijective operators`,
      `Continuity of inverses in Banach algebras`,
    ],
    references: ['Rudin, Functional Analysis', 'Conway, A Course in Functional Analysis', 'Kreyszig, Introductory Functional Analysis with Applications'],
  },
  {
    id: 'pc-an-banach-fixed-point',
    title: 'Banach fixed point theorem',
    field: 'Metric spaces',
    topicIds: ['banach-spaces', 'metric-spaces', 'completeness'],
    level: 'Undergraduate 3',
    status: 'Theorem',
    statement: String.raw`\text{If }(X,d)\text{ is complete and }T:X\to X\text{ is a contraction with constant }q<1,\text{ then }T\text{ has a unique fixed point }x^*,\text{ and }T^n x\to x^*.`,
    hypotheses: [
      `(X, d) is a complete metric space`,
      `There is q ∈ [0,1) with d(Tx, Ty) ≤ q d(x,y) for all x,y`,
    ],
    conclusion: `T has exactly one fixed point x*, and the Picard iterates Tⁿx converge to it for every starting x, with geometric rate.`,
    idea: `Contraction makes the Picard iterates Cauchy because successive distances shrink geometrically; completeness supplies the limit, and continuity gives T(x*) = x*.`,
    steps: [
      {
        title: `Geometric decay of increments`,
        text: `Let xₙ = Tⁿx₀. Then d(xₙ₊₁, xₙ) ≤ qⁿ d(x₁, x₀) by induction on the contraction inequalities.`,
        math: String.raw`$d(x_{n+1},x_n)\le q^n d(x_1,x_0)$`,
      },
      {
        title: `Cauchy sequence`,
        text: `For m > n, the triangle inequality and the geometric series give d(xₘ, xₙ) ≤ qⁿ d(x₁,x₀)/(1 − q) → 0, so (xₙ) is Cauchy.`,
        math: String.raw`$d(x_m,x_n)\le \frac{q^n}{1-q}\,d(x_1,x_0)$`,
      },
      {
        title: `Existence`,
        text: `Completeness gives xₙ → x*. A contraction is continuous, so T(x*) = lim T(xₙ) = lim xₙ₊₁ = x*.`,
      },
      {
        title: `Uniqueness and rate`,
        text: `If T(x) = x and T(y) = y then d(x,y) ≤ q d(x,y) implies d(x,y) = 0. The tail estimate above yields d(xₙ, x*) ≤ qⁿ d(x₁,x₀)/(1 − q).`,
      },
    ],
    assumptionsUsed: [
      `Completeness of the metric space`,
      `Contraction constant strictly less than 1`,
      `Triangle inequality and geometric series`,
    ],
    edgeCases: [
      `If q = 1 a fixed point may not exist (e.g. a translation on ℝ)`,
      `The theorem is constructive: the error bound is explicit`,
      `Non-complete spaces may fail: T(x) = x/2 on (0,1) has no fixed point`,
    ],
    applications: [
      `Picard–Lindelöf existence for ODEs`,
      `Solving linear systems iteratively`,
      `Fractal generation via iterated function systems`,
    ],
    references: ['Kreyszig, Introductory Functional Analysis with Applications', 'Rudin, Principles of Mathematical Analysis', 'ProofWiki'],
  },
  {
    id: 'pc-an-compact-self-adjoint',
    title: 'Spectral theorem for compact self-adjoint operators',
    field: 'Functional analysis',
    topicIds: ['spectral-theory', 'compact-operators', 'hilbert-spaces'],
    level: 'Doctoral',
    status: 'Proof sketch',
    statement: String.raw`$T=T^*\text{ compact on a Hilbert space }H\ \Longrightarrow\ H=\ker T\ \oplus\ \overline{\operatorname{span}}\{\text{eigenvectors of }T\},\ \ \sigma(T)\setminus\{0\}\subset\mathbb{R}\text{ are eigenvalues.}$`,
    hypotheses: [
      `H is a Hilbert space and T : H → H is a compact linear operator`,
      `T is self-adjoint: ⟨Tx, y⟩ = ⟨x, Ty⟩ for all x,y`,
    ],
    conclusion: `Nonzero spectrum consists of real eigenvalues of finite multiplicity accumulating only at 0, and there is an orthonormal basis of eigenvectors (plus a kernel part).`,
    idea: `The norm of a self-adjoint operator is approached by quadratic forms; compactness upgrades the maximising sequence to an eigenvector, and induction on orthogonal complements builds the basis.`,
    steps: [
      {
        title: `Real spectrum via quadratic forms`,
        text: `For self-adjoint T, ‖T‖ = sup_{‖x‖=1} |⟨Tx,x⟩|; consequently the spectral radius equals ‖T‖ and every spectral value is real.`,
      },
      {
        title: `Existence of an eigenvector`,
        text: `Take a sequence xₙ with |⟨Txₙ,xₙ⟩| → ‖T‖. Compactness gives a convergent subsequence of Txₙ; the corresponding xₙ then converges, and its limit x satisfies Tx = ±‖T‖x.`,
      },
      {
        title: `Orthogonal decomposition`,
        text: `The orthogonal complement of an eigenvector is T-invariant and T restricted to it is again compact self-adjoint; iterate to obtain an orthonormal family of eigenvectors with eigenvalues tending to 0.`,
      },
      {
        title: `Completeness`,
        text: `If the closed span of eigenvectors were not all of H, its orthogonal complement would contain a nonzero eigenvector by the same argument — contradiction (unless T vanishes there).`,
      },
      {
        title: `Scope of the sketch`,
        text: `Full proofs require the spectral radius formula for self-adjoint operators and compactness arguments; the finite-dimensional analogue is ordinary diagonalisation by an orthonormal basis.`,
      },
    ],
    assumptionsUsed: [
      `Compactness of T`,
      `Self-adjointness and the spectral radius identity`,
      `Zorn's lemma / transfinite iteration in the nonseparable case`,
    ],
    edgeCases: [
      `The identity operator is self-adjoint but not compact unless H is finite-dimensional`,
      `Zero may belong to the spectrum without being an eigenvalue`,
      `Self-adjointness is essential: compact non-self-adjoint operators need not diagonalise`,
    ],
    applications: [
      `Spectral decomposition of Sturm–Liouville problems`,
      `Quantum-mechanical observables with discrete spectrum`,
      `Singular value decomposition for compact operators`,
    ],
    references: ['Conway, A Course in Functional Analysis', 'Rudin, Functional Analysis', 'Kreyszig, Introductory Functional Analysis with Applications'],
  },
  {
    id: 'pc-an-cauchy-riemann',
    title: 'Cauchy–Riemann equations are necessary',
    field: 'Complex analysis',
    topicIds: ['cauchy-riemann', 'complex-differentiation', 'holomorphic-functions'],
    level: 'Undergraduate 3',
    status: 'Theorem',
    statement: String.raw`$f=u+iv\text{ complex differentiable at }z_0=x_0+iy_0\ \Longrightarrow\ u_x=v_y,\quad u_y=-v_x\text{ at }(x_0,y_0).$`,
    hypotheses: [
      `f is complex differentiable at z₀, i.e. the limit of (f(z₀+h) − f(z₀))/h exists as h → 0 in ℂ`,
      `u = Re f and v = Im f`,
    ],
    conclusion: `The real partial derivatives of u and v exist at (x₀,y₀) and satisfy uₓ = vᵧ and uᵧ = −vₓ; moreover f′(z₀) = uₓ + ivₓ.`,
    idea: `The same complex difference quotient must agree when h approaches 0 along the real axis and along the imaginary axis; comparing real and imaginary parts gives two equations.`,
    steps: [
      {
        title: `Approach along the real axis`,
        text: `Take h = t ∈ ℝ. Then (f(z₀+t) − f(z₀))/t = [u(x₀+t,y₀) − u(x₀,y₀)]/t + i[v(x₀+t,y₀) − v(x₀,y₀)]/t, so the limit equals uₓ + ivₓ.`,
        math: String.raw`$f'(z_0)=u_x(x_0,y_0)+i\,v_x(x_0,y_0)$`,
      },
      {
        title: `Approach along the imaginary axis`,
        text: `Take h = it with t ∈ ℝ. Dividing by it yields [v(x₀,y₀+t) − v(x₀,y₀)]/t − i[u(x₀,y₀+t) − u(x₀,y₀)]/t, so the limit equals vᵧ − iuᵧ.`,
        math: String.raw`$f'(z_0)=v_y(x_0,y_0)-i\,u_y(x_0,y_0)$`,
      },
      {
        title: `Equate real and imaginary parts`,
        text: `Uniqueness of the complex limit forces uₓ = vᵧ and vₓ = −uᵧ, and identifies f′(z₀) = uₓ + ivₓ.`,
      },
      {
        title: `Converse caveat`,
        text: `The Cauchy–Riemann equations alone at a point do not imply complex differentiability; continuity of the four partial derivatives in a neighbourhood makes them sufficient.`,
      },
    ],
    assumptionsUsed: [
      `Existence of the complex derivative at z₀`,
      `Uniqueness of limits in ℂ`,
      `Continuity of partials only for the sufficient converse`,
    ],
    edgeCases: [
      `f(z) = |z|² satisfies Cauchy–Riemann only at z = 0 and is differentiable only there`,
      `f(z) = z̄ never satisfies the equations except trivially nowhere`,
      `The equations at an isolated point are too weak; a neighbourhood hypothesis is needed for holomorphy`,
    ],
    applications: [
      `Checking holomorphy of explicit functions`,
      `Deriving the Cauchy–Riemann equations in polar form`,
      `Characterising harmonic conjugates and analytic potentials`,
    ],
    references: ['Ahlfors, Complex Analysis', 'Conway, Functions of One Complex Variable', 'ProofWiki'],
  },
  {
    id: 'pc-an-cauchy-theorem',
    title: 'Cauchy’s integral theorem',
    field: 'Complex analysis',
    topicIds: ['cauchy-theorem', 'contour-integration', 'holomorphic-functions'],
    level: 'Undergraduate 3',
    status: 'Proof sketch',
    statement: String.raw`\text{If }f\text{ is holomorphic on a simply connected domain }\Omega\text{ and }\gamma\text{ is a closed piecewise }C^1\text{ curve in }\Omega,\text{ then }\oint_\gamma f(z)\,dz=0.`,
    hypotheses: [
      `Ω is simply connected (or γ is null-homotopic in Ω)`,
      `f is holomorphic on Ω`,
      `γ is a closed piecewise continuously differentiable path`,
    ],
    conclusion: `The contour integral of f around γ vanishes; equivalently, integrals of f are path-independent in Ω.`,
    idea: `Goursat's argument subdivides a triangle into four similar triangles: the integral over the triangle is at most four times that over the worst subtriangle, whose diameter and derivative error shrink, forcing the integral to vanish.`,
    steps: [
      {
        title: `Triangles suffice`,
        text: `Any closed piecewise C¹ curve in a convex region can be replaced by a polygonal path, and a polygon decomposes into triangles. It therefore suffices to prove vanishing over triangles.`,
      },
      {
        title: `Goursat subdivision`,
        text: `Let T be a triangle inside a disc where f is holomorphic. Join the midpoints to get four congruent subtriangles; interior edge integrals cancel, so ∫_{∂T} f = Σ ∫_{∂Tⱼ} f.`,
        math: String.raw`$\left|\int_{\partial T}f\right|\le 4\left|\int_{\partial T^*}f\right|$`,
      },
      {
        title: `Linearisation`,
        text: `For the subtriangle T* with largest integral, write f(z) = f(z₀) + f′(z₀)(z − z₀) + ε(z)(z − z₀), where sup_{T*}|ε| → 0 as diam(T*) → 0. The constant and linear parts integrate to zero over a closed path.`,
      },
      {
        title: `Shrink to zero`,
        text: `Estimating the remainder by length × sup|ε|·diam gives |∫_{∂T} f| ≤ C·diam(T)·sup_{T*}|ε|, and iterating the subdivision drives this to 0.`,
      },
      {
        title: `Homotopy and scope`,
        text: `For general γ in a simply connected domain, homotopy invariance (or the global primitive built from triangle integrals) reduces to the triangular case. A full proof requires careful homotopy deformation, summarised here.`,
      },
    ],
    assumptionsUsed: [
      `Goursat's triangle subdivision estimate`,
      `Holomorphy (complex differentiability) inside the contour`,
      `Simple connectedness / null-homotopy`,
    ],
    edgeCases: [
      `The theorem fails for f(z) = 1/z on a loop winding around the origin`,
      `An annulus is not simply connected; integrals of 1/z need not vanish`,
      `Goursat removed the unnecessary assumption that f′ be continuous`,
    ],
    applications: [
      `Cauchy integral formula`,
      `Existence of holomorphic primitives`,
      `Residue calculus and evaluation of real integrals`,
    ],
    references: ['Ahlfors, Complex Analysis', 'Conway, Functions of One Complex Variable', 'Stein & Shakarchi, Complex Analysis'],
  },
  {
    id: 'pc-an-cauchy-integral-formula',
    title: 'Cauchy integral formula',
    field: 'Complex analysis',
    topicIds: ['cauchy-integral-formula', 'holomorphic-functions', 'contour-integration'],
    level: 'Undergraduate 3',
    status: 'Theorem',
    statement: String.raw`$f(z)=\frac{1}{2\pi i}\oint_\gamma\frac{f(w)}{w-z}\,dw\qquad(z\text{ inside }\gamma),$`,
    hypotheses: [
      `f is holomorphic on an open set containing the closed disc bounded by γ`,
      `γ is a positively oriented simple closed contour and z lies in its interior`,
    ],
    conclusion: `The value of f at an interior point is determined by its boundary values; consequently f is infinitely differentiable with f⁽ⁿ⁾(z) = n!/(2πi) ∮ f(w)/(w−z)ⁿ⁺¹ dw.`,
    idea: `Subtract the constant f(z), note ∮ 1/(w−z) dw = 2πi, and deform the contour to a small circle around z where continuity of f makes the singularity harmless.`,
    steps: [
      {
        title: `Reduce to a vanishing integral`,
        text: `Since ∮_γ dw/(w−z) = 2πi, it suffices to show ∮_γ [f(w) − f(z)]/(w−z) dw = 0.`,
      },
      {
        title: `Deform the contour`,
        text: `The integrand is holomorphic away from z; by Cauchy's theorem on the annular region between γ and a small circle Cᵣ centred at z, the integral over γ equals the integral over Cᵣ.`,
        math: String.raw`$\oint_\gamma\frac{f(w)-f(z)}{w-z}dw=\oint_{C_r}\frac{f(w)-f(z)}{w-z}dw$`,
      },
      {
        title: `Estimate on the small circle`,
        text: `On Cᵣ the denominator has modulus r, while |f(w) − f(z)| ≤ sup_{|w−z|=r}|f(w) − f(z)| tends to 0 by continuity. The integral is bounded by 2π times that supremum, hence tends to 0.`,
      },
      {
        title: `Derivatives`,
        text: `Differentiating under the integral sign (justified by uniform convergence on compact subsets away from the contour) gives the formula for f⁽ⁿ⁾ and shows holomorphic functions are analytic.`,
      },
    ],
    assumptionsUsed: [
      `Cauchy's integral theorem`,
      `Continuity of f near z`,
      `Winding number of γ around z equal to 1`,
    ],
    edgeCases: [
      `If z lies outside γ the integral is zero`,
      `Multiple windings multiply the result by the winding number`,
      `The formula fails if f has a singularity inside γ other than the simple pole at z`,
    ],
    applications: [
      `Liouville's theorem and the fundamental theorem of algebra`,
      `Maximum modulus principle`,
      `Evaluation of definite real integrals and Taylor coefficients`,
    ],
    references: ['Ahlfors, Complex Analysis', 'Conway, Functions of One Complex Variable'],
  },
  {
    id: 'pc-an-liouville',
    title: 'Liouville’s theorem',
    field: 'Complex analysis',
    topicIds: ['holomorphic-functions', 'analytic-functions', 'cauchy-integral-formula'],
    level: 'Undergraduate 3',
    status: 'Corollary',
    statement: String.raw`\text{Every bounded entire function is constant.}`,
    hypotheses: [
      `f is holomorphic on all of ℂ (entire)`,
      `There is M with |f(z)| ≤ M for all z ∈ ℂ`,
    ],
    conclusion: `f is constant; more generally, any entire function with polynomial growth of degree n is a polynomial of degree ≤ n.`,
    idea: `Cauchy's derivative estimate gives |f′(z)| ≤ M/r for a circle of radius r centred at z; letting r → ∞ forces f′ ≡ 0.`,
    steps: [
      {
        title: `Cauchy derivative estimate`,
        text: `For any z and any r > 0, the derivative formula on the circle |w − z| = r gives |f′(z)| ≤ M/r, since |f(w)| ≤ M and the path length is 2πr.`,
        math: String.raw`$|f'(z)|\le\frac{1}{2\pi}\oint_{|w-z|=r}\frac{M}{r^2}|dw|=\frac{M}{r}$`,
      },
      {
        title: `Let the radius grow`,
        text: `The bound holds for every r > 0 because f is entire; letting r → ∞ yields f′(z) = 0.`,
      },
      {
        title: `Conclude constancy`,
        text: `A function with zero derivative on the connected set ℂ is constant (integrate f′ along line segments).`,
      },
      {
        title: `Growth generalisation`,
        text: `If |f(z)| ≤ C(1+|z|)ⁿ, the estimate for f⁽ⁿ⁺¹⁾ tends to 0 as r → ∞, so f is a polynomial of degree at most n.`,
      },
    ],
    assumptionsUsed: [
      `Cauchy integral formula for derivatives`,
      `Entirety (to take arbitrarily large circles)`,
      `Connectedness of ℂ`,
    ],
    edgeCases: [
      `Unbounded entire functions such as eᶻ and sin z are not constant`,
      `Boundedness on ℂ is essential; boundedness on a disc says nothing`,
      `The conclusion is specific to holomorphy: real and imaginary parts are merely harmonic`,
    ],
    applications: [
      `Fundamental theorem of algebra`,
      `Characterisation of entire functions with prescribed growth`,
      `Proof that a holomorphic map from the Riemann sphere to itself is rational`,
    ],
    references: ['Ahlfors, Complex Analysis', 'Conway, Functions of One Complex Variable'],
  },
  {
    id: 'pc-an-maximum-modulus',
    title: 'Maximum modulus principle',
    field: 'Complex analysis',
    topicIds: ['analytic-functions', 'holomorphic-functions', 'cauchy-integral-formula'],
    level: 'Undergraduate 3',
    status: 'Theorem',
    statement: String.raw`\text{A nonconstant holomorphic }f\text{ on a domain }\Omega\text{ has no interior maximum of }|f|;\ \max_{\overline D}|f|\text{ occurs on }\partial D.`,
    hypotheses: [
      `Ω is a domain (open, connected) and f is holomorphic on Ω`,
      `D is a bounded subdomain whose closure lies in Ω`,
    ],
    conclusion: `If |f| attains its maximum at an interior point, f is constant; otherwise the supremum over a compact closure is attained only on the boundary.`,
    idea: `The Cauchy integral formula gives a mean-value property for f, hence for |f| by the triangle inequality; equality in the triangle inequality around a circle forces f to be constant.`,
    steps: [
      {
        title: `Mean value property`,
        text: `For a disc B(z,r) ⊂ Ω, the Cauchy formula on the circle gives f(z) = (1/2π)∫₀^{2π} f(z+re^{iθ}) dθ; hence |f(z)| ≤ (1/2π)∫ |f(z+re^{iθ})| dθ.`,
        math: String.raw`$|f(z)|\le\frac{1}{2\pi}\int_0^{2\pi}|f(z+re^{i\theta})|\,d\theta$`,
      },
      {
        title: `An interior maximum propagates`,
        text: `If |f(z₀)| is a maximum, the average of |f| on every circle around z₀ equals |f(z₀)|; otherwise a point with larger modulus would exist. Thus |f| is constant on each small circle.`,
      },
      {
        title: `Equality in the triangle inequality`,
        text: `Equality in |∫ f| ≤ ∫|f| forces all values f(z₀+re^{iθ}) to share a common argument; continuity and varying r show f is constant on a neighbourhood of z₀.`,
      },
      {
        title: `Connectedness`,
        text: `The set where f equals the constant value is both open and closed in Ω, so by connectedness it is all of Ω; thus a nonconstant f cannot have an interior maximum.`,
      },
    ],
    assumptionsUsed: [
      `Cauchy integral formula`,
      `Triangle inequality and its equality case`,
      `Connectedness of the domain`,
    ],
    edgeCases: [
      `Constant functions attain their maximum everywhere`,
      `The minimum modulus principle needs the extra hypothesis that f has no zeros inside`,
      `Boundary maxima can occur at several points simultaneously`,
    ],
    applications: [
      `Schwarz lemma and Schwarz–Pick theorem`,
      `Hadamard three-lines theorem`,
      `Uniqueness and stability of analytic continuation`,
    ],
    references: ['Ahlfors, Complex Analysis', 'Conway, Functions of One Complex Variable'],
  },
  {
    id: 'pc-an-residue-theorem',
    title: 'Residue theorem',
    field: 'Complex analysis',
    topicIds: ['residue-theorem', 'laurent-series', 'contour-integration'],
    level: 'Undergraduate 4',
    status: 'Proof sketch',
    statement: String.raw`\oint_\gamma f(z)\,dz=2\pi i\sum_{a\in\operatorname{Int}\gamma}\operatorname{Res}(f,a)\qquad(\operatorname{Res}(f,a)=[w^{-1}]\,\text{Laurent coefficient}).`,
    hypotheses: [
      `f is holomorphic inside and on a positively oriented simple closed contour γ except for finitely many isolated singularities inside`,
      `The winding number of γ about each singularity is 1`,
    ],
    conclusion: `The contour integral equals 2πi times the sum of residues at the enclosed singularities; residues are the −1 coefficients of the local Laurent expansions.`,
    idea: `Cut each singularity out by a small circle; Cauchy's theorem makes the original integral the sum of small-circle integrals, and termwise integration of the Laurent series leaves only the coefficient of (z−a)⁻¹.`,
    steps: [
      {
        title: `Isolate the singularities`,
        text: `Let a₁,…,aₘ be the singularities inside γ and choose disjoint small circles Cⱼ around them. Cauchy's theorem on the multiply connected region between γ and the circles gives ∮_γ f = Σⱼ ∮_{Cⱼ} f.`,
      },
      {
        title: `Laurent expansion near a singularity`,
        text: `On an annulus around aⱼ, f(z) = Σ_{n∈ℤ} cₙ(z−aⱼ)ⁿ with c₋₁ = Res(f, aⱼ); the series converges uniformly on compact annuli, permitting termwise integration.`,
        math: String.raw`$f(z)=\sum_{n=-\infty}^{\infty}c_n(z-a_j)^n$`,
      },
      {
        title: `Only one term survives`,
        text: `For n ≠ −1, ∮_{Cⱼ}(z−aⱼ)ⁿ dz = 0 because the primitive (z−aⱼ)ⁿ⁺¹/(n+1) is single-valued; for n = −1 the integral is 2πi.`,
      },
      {
        title: `Sum and conclude`,
        text: `Therefore ∮_{Cⱼ} f = 2πi c₋₁ = 2πi Res(f,aⱼ), and summing over j gives the theorem.`,
      },
      {
        title: `Scope of the sketch`,
        text: `A complete treatment requires the Laurent expansion theorem and the homology version of Cauchy's theorem for multiply connected domains; these are standard results, not reproduced here.`,
      },
    ],
    assumptionsUsed: [
      `Laurent series expansion at isolated singularities`,
      `Cauchy's theorem on multiply connected regions`,
      `Termwise integration under uniform convergence`,
    ],
    edgeCases: [
      `Essential singularities still have a well-defined residue`,
      `Removable singularities have residue zero`,
      `Singularities outside γ contribute nothing`,
    ],
    applications: [
      `Evaluation of real trigonometric and rational integrals`,
      `Summation of series via contour integration`,
      `Argument principle and Rouché's theorem`,
    ],
    references: ['Ahlfors, Complex Analysis', 'Conway, Functions of One Complex Variable', 'Stein & Shakarchi, Complex Analysis'],
  },
  {
    id: 'pc-an-rouche',
    title: 'Rouché’s theorem',
    field: 'Complex analysis',
    topicIds: ['analytic-functions', 'residue-theorem', 'singularities'],
    level: 'Undergraduate 4',
    status: 'Theorem',
    statement: String.raw`$|g(z)|<|f(z)|\ \text{on }\partial D\ \Longrightarrow\ f\text{ and }f+g\text{ have the same number of zeros in }D$`,
    hypotheses: [
      `f and g are holomorphic on an open set containing the closure of a bounded domain D with piecewise smooth boundary`,
      `|g(z)| < |f(z)| strictly on ∂D`,
      `Zeros are counted with multiplicity`,
    ],
    conclusion: `f and f + g have equally many zeros inside D, counted with multiplicity.`,
    idea: `The homotopy fₜ = f + tg never vanishes on the boundary; by the argument principle the number of zeros, being the winding number of fₜ(∂D) about 0, is invariant under the homotopy.`,
    steps: [
      {
        title: `No boundary zeros`,
        text: `For t ∈ [0,1], |f(z) + t g(z)| ≥ |f(z)| − |g(z)| > 0 on ∂D, so the argument principle applies to every member of the homotopy.`,
      },
      {
        title: `Apply the argument principle`,
        text: `The number N(t) of zeros of fₜ in D equals (1/2πi)∮_{∂D} fₜ′(z)/fₜ(z) dz, the winding number of fₜ(∂D) about 0.`,
        math: String.raw`$N(t)=\frac{1}{2\pi i}\oint_{\partial D}\frac{f_t'(z)}{f_t(z)}\,dz$`,
      },
      {
        title: `Continuity of the integer`,
        text: `fₜ depends continuously on t, and the winding number is an integer-valued continuous function of t; hence N(t) is constant on [0,1].`,
      },
      {
        title: `Conclude`,
        text: `N(0) is the number of zeros of f and N(1) the number for f + g, so they agree.`,
      },
    ],
    assumptionsUsed: [
      `Argument principle`,
      `Strict boundary inequality |g| < |f|`,
      `Continuity of winding numbers under homotopy avoiding 0`,
    ],
    edgeCases: [
      `If equality holds at a boundary point the conclusion can fail`,
      `Multiplicities matter: a double zero counts as two`,
      `The theorem gives counts, not locations of zeros`,
    ],
    applications: [
      `Counting zeros of polynomials in a disc`,
      `Continuity of roots under perturbation of coefficients`,
      `Proof of the fundamental theorem of algebra and of Hurwitz's theorem`,
    ],
    references: ['Ahlfors, Complex Analysis', 'Conway, Functions of One Complex Variable'],
  },
  {
    id: 'pc-an-analytic-continuation',
    title: 'Uniqueness of analytic continuation',
    field: 'Complex analysis',
    topicIds: ['analytic-continuation', 'analytic-functions', 'holomorphic-functions'],
    level: 'Undergraduate 4',
    status: 'Theorem',
    statement: String.raw`\text{If }f,g\text{ are holomorphic on a domain }\Omega\text{ and }f=g\text{ on a set }E\subset\Omega\text{ with a limit point in }\Omega,\text{ then }f\equiv g\text{ on }\Omega.`,
    hypotheses: [
      `Ω is open and connected`,
      `f and g are holomorphic on Ω`,
      `E ⊂ Ω has an accumulation point belonging to Ω`,
    ],
    conclusion: `f = g everywhere on Ω; in particular a holomorphic function is uniquely determined by its values on any set with an interior limit point.`,
    idea: `Zeros of a nonzero holomorphic function are isolated because the Taylor expansion at a zero has a first nonzero coefficient; an open-and-closed argument then propagates equality across the connected domain.`,
    steps: [
      {
        title: `Zeros are isolated`,
        text: `If h is holomorphic near a and h(a) = 0 but h ≢ 0, its Taylor series has a first nonzero coefficient cₘ(z−a)ᵐ; factoring gives h(z) = (z−a)ᵐ k(z) with k(a) ≠ 0, so h ≠ 0 near a except at a.`,
        math: String.raw`$h(z)=(z-a)^m k(z),\qquad k(a)\ne0$`,
      },
      {
        title: `The equality set is closed`,
        text: `Let A = {z ∈ Ω : h(z) = 0} where h = f − g. Continuity of h makes A closed in Ω.`,
      },
      {
        title: `The equality set is open`,
        text: `If a ∈ A and h ≢ 0 near a, isolation of zeros gives a punctured neighbourhood with no zeros; but the assumed limit point can be approached arbitrarily closely, so h ≡ 0 in a neighbourhood of a. Thus A is open.`,
      },
      {
        title: `Connectedness finishes`,
        text: `A is nonempty (it contains E), open and closed in the connected set Ω, hence A = Ω and f ≡ g.`,
      },
    ],
    assumptionsUsed: [
      `Power series expansion of holomorphic functions`,
      `Connectedness of Ω`,
      `Existence of a limit point inside Ω`,
    ],
    edgeCases: [
      `The limit point must lie in Ω: values on a sequence approaching the boundary do not suffice`,
      `The theorem fails for smooth (C∞) real functions, e.g. flat bump functions`,
      `Real-analytic functions satisfy an analogous uniqueness theorem`,
    ],
    applications: [
      `Riemann surfaces and sheaves of germs`,
      `Defining the Gamma function's analytic continuation`,
      `Identity of functions known only on a real interval`,
    ],
    references: ['Ahlfors, Complex Analysis', 'Conway, Functions of One Complex Variable', 'ProofWiki'],
  },
  {
    id: 'pc-an-picard',
    title: 'Picard’s little and great theorems (statements)',
    field: 'Complex analysis',
    topicIds: ['singularities', 'analytic-functions', 'meromorphic-functions'],
    level: 'Master’s',
    status: 'Proof sketch',
    statement: String.raw`\text{Little Picard: a nonconstant entire function omits at most one complex value. Great Picard: near an essential singularity }a,\ f\text{ takes every complex value, with at most one exception, infinitely often.}`,
    hypotheses: [
      `Little Picard: f is entire and nonconstant`,
      `Great Picard: f is holomorphic on a punctured neighbourhood of an isolated essential singularity a`,
    ],
    conclusion: `At most one value can be omitted in each case; eᶻ shows that one omission (the value 0) is actually possible.`,
    idea: `These are deep theorems: routes go through Montel's normality criterion for families omitting two values (Schottky's theorem) or through the modular function covering the twice-punctured plane.`,
    steps: [
      {
        title: `Little Picard, precise form`,
        text: `If a nonconstant entire function f omits two distinct values a and b, then f is constant; equivalently the image of ℂ misses at most one point. This strengthens Liouville, which only excludes a bounded image.`,
      },
      {
        title: `Great Picard, precise form`,
        text: `At an essential singularity a, for every w ∈ ℂ with at most one exception and every neighbourhood U of a, the equation f(z) = w has infinitely many solutions in U.`,
      },
      {
        title: `Why the proofs are deep`,
        text: `A standard approach uses the fact that holomorphic maps into ℂ∖{0,1} form a normal family; Montel's theorem plus normality of the rescaled family near an essential singularity yields the conclusion. Another uses the universal cover of the twice-punctured sphere by the upper half-plane.`,
      },
      {
        title: `Scope note`,
        text: `Only the statements and proof architecture are given here; the normality and covering-space machinery is not reproduced. These theorems are established results, not conjectures.`,
      },
    ],
    assumptionsUsed: [
      `Montel's normality theorem (in the standard proof)`,
      `Universal covering of ℂ∖{0,1} (in the modular-function proof)`,
      `Classification of isolated singularities`,
    ],
    edgeCases: [
      `eᶻ omits exactly one value, 0, so "at most one" is sharp`,
      `Polynomials omit no values; transcendental entire functions may omit one`,
      `The exceptional value in great Picard may depend on f`,
    ],
    applications: [
      `Classification of entire functions and singularities`,
      `Normal families and complex dynamics`,
      `Value distribution theory (Nevanlinna theory)`,
    ],
    references: ['Ahlfors, Complex Analysis', 'Conway, Functions of One Complex Variable', 'Stein & Shakarchi, Complex Analysis'],
  },
  {
    id: 'pc-an-pnt',
    title: 'Prime number theorem: analytic proof architecture',
    field: 'Analytic number theory',
    topicIds: ['analytic-number-theory', 'prime-number-theory', 'riemann-zeta-function', 'distribution-of-primes'],
    level: 'Doctoral',
    status: 'Proof sketch',
    statement: String.raw`\pi(x)\sim\operatorname{Li}(x)\sim\frac{x}{\log x}\quad(x\to\infty),\qquad \pi(x)=\#\{p\le x:\ p\text{ prime}\}.`,
    hypotheses: [
      `π(x) counts primes not exceeding x`,
      `The Riemann zeta function ζ(s) is continued meromorphically to ℂ with a single pole at s = 1`,
    ],
    conclusion: `π(x)/(x/log x) → 1; equivalently the Chebyshev function θ(x) = Σ_{p≤x} log p satisfies θ(x) ∼ x.`,
    idea: `Connect primes to ζ via the Euler product, show ζ has no zeros on the line Re(s) = 1, and transfer the resulting analytic information through Perron's formula and a Tauberian theorem.`,
    steps: [
      {
        title: `Euler product and logarithmic derivative`,
        text: `For Re(s) > 1, ζ(s) = ∏ₚ(1 − p^{−s})⁻¹ and −ζ′/ζ(s) = Σ_{n≥1} Λ(n)n^{−s}, where Λ is the von Mangoldt function. This is the dictionary between primes and analysis.`,
        math: String.raw`$-\frac{\zeta'(s)}{\zeta(s)}=\sum_{n=1}^{\infty}\frac{\Lambda(n)}{n^s}$`,
      },
      {
        title: `Analytic continuation and the zero-free line`,
        text: `ζ extends meromorphically with a simple pole at s = 1; Hadamard and de la Vallée Poussin proved ζ(1+it) ≠ 0 for all real t using the positivity of Re log ζ and the identity involving ζ(s)³ζ(s+it)⁴ζ(s+2it).`,
      },
      {
        title: `Perron formula`,
        text: `A contour integral of −ζ′/ζ(s) xˢ/s recovers ψ(x) = Σ_{n≤x} Λ(n); shifting the contour past the pole at s = 1 gives a main term x plus error terms governed by the zeros of ζ.`,
        math: String.raw`$\psi(x)=\frac{1}{2\pi i}\int_{c-i\infty}^{c+i\infty}-\frac{\zeta'(s)}{\zeta(s)}\frac{x^s}{s}\,ds$`,
      },
      {
        title: `Tauberian conclusion`,
        text: `The absence of zeros on Re(s)=1 makes the error o(x), giving ψ(x) ∼ x; a partial summation argument converts this to θ(x) ∼ x and π(x) ∼ x/log x.`,
      },
      {
        title: `Scope note`,
        text: `This is an architectural sketch: the continuation, zero-free region, Perron formula and Tauberian step are all substantial theorems. The Riemann hypothesis is not assumed and remains open.`,
      },
    ],
    assumptionsUsed: [
      `Euler product for ζ(s)`,
      `Meromorphic continuation of ζ and nonvanishing on Re(s) = 1`,
      `Perron formula and Tauberian arguments`,
    ],
    edgeCases: [
      `The theorem is proved; the stronger Riemann hypothesis is still unproved`,
      `Explicit error terms depend on zero-free regions, not on RH`,
      `Elementary (Erdős–Selberg) proofs exist but do not use ζ`,
    ],
    applications: [
      `Estimates for the nth prime pₙ ∼ n log n`,
      `Distribution of primes in arithmetic progressions`,
      `Analytic combinatorics via singularity analysis`,
    ],
    references: ['Ingham, The Distribution of Prime Numbers', 'Titchmarsh, The Theory of the Riemann Zeta-Function', 'Hardy & Wright, An Introduction to the Theory of Numbers'],
  },
  {
    id: 'pc-an-stirling',
    title: 'Stirling’s formula for the Gamma function',
    field: 'Asymptotic analysis',
    topicIds: ['asymptotic-analysis', 'series-analysis'],
    level: 'Master’s',
    status: 'Proof sketch',
    statement: String.raw`$\Gamma(z+1)\sim\sqrt{2\pi z}\left(\frac{z}{e}\right)^{z}\quad(z\to\infty,\ |\arg z|\le\pi-\delta),\qquad n!\sim\sqrt{2\pi n}\,(n/e)^n.$`,
    hypotheses: [
      `z tends to infinity in the sector |arg z| ≤ π − δ with δ > 0 fixed`,
      `Γ(z+1) = ∫₀^∞ tᶻ e^{−t} dt/t for Re z > −1`,
    ],
    conclusion: `The ratio Γ(z+1)/[√(2πz)(z/e)ᶻ] tends to 1; for integer z = n this is Stirling's formula for n!.`,
    idea: `Write the integral as exp(z log z − z + correction) and evaluate the correction by Laplace's method at the saddle point t = z; the second derivative there produces the factor √(2πz).`,
    steps: [
      {
        title: `Exponentiate the integral`,
        text: `Substitute t = zs: Γ(z+1) = z^{z+1}∫₀^∞ e^{z(log s − s)} ds/s. The exponent φ(s) = log s − s has its unique maximum at s = 1 with φ(1) = −1, φ″(1) = −1.`,
        math: String.raw`$\Gamma(z+1)=z^{z+1}\int_0^\infty e^{z(\log s-s)}\frac{ds}{s}$`,
      },
      {
        title: `Laplace / saddle-point estimate`,
        text: `Near s = 1, φ(s) ≈ −1 − (s−1)²/2, and the Gaussian integral ∫ e^{−z u²/2} du ≈ √(2π/z). Contributions away from s = 1 are exponentially smaller.`,
      },
      {
        title: `Assemble the leading term`,
        text: `Multiplying gives Γ(z+1) ≈ z^{z+1} e^{−z}√(2π/z) = √(2πz)(z/e)ᶻ; the relative error tends to 0 uniformly in the stated sector.`,
      },
      {
        title: `Euler–Maclaurin alternative`,
        text: `For real n one can instead apply the Euler–Maclaurin formula to log(n!) = Σ_{k≤n} log k; this also yields the full expansion with correction terms 1/(12n) − 1/(360n³) + ⋯.`,
      },
      {
        title: `Scope note`,
        text: `Rigorous error control in the saddle-point step requires contour deformation and bounds away from the positive axis; the leading asymptotic and the classical integer case are exact.`,
      },
    ],
    assumptionsUsed: [
      `Integral representation of Γ`,
      `Laplace's method / steepest descent`,
      `Euler–Maclaurin formula (for the alternative derivation)`,
    ],
    edgeCases: [
      `The sector condition excludes directions near the negative real axis`,
      `The formula is asymptotic, not an equality for finite z`,
      `The full expansion is divergent and must be truncated optimally`,
    ],
    applications: [
      `Estimating factorials in combinatorics and statistical mechanics`,
      `Normalising constants of gamma and beta distributions`,
      `Analytic estimates involving binomial coefficients`,
    ],
    references: ['DLMF, NIST Digital Library of Mathematical Functions', 'Olver, Asymptotics and Special Functions', 'Stein & Shakarchi, Complex Analysis'],
  },
]
