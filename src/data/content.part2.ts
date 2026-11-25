// ─────────────────────────────────────────────────────────────────────────────
// MATHVERSE — Part II content pack.
// Deep, first-principles articles for the 27 canonical topics spanning
// differential / integral / multivariable calculus, linear algebra and
// discrete mathematics, plus worked derivations and problems.
// ─────────────────────────────────────────────────────────────────────────────

import type { Topic, Derivation, Problem, Block, Level } from '../lib/types'

type Blocks = Block[]
type Twelve = [Blocks, Blocks, Blocks, Blocks, Blocks, Blocks, Blocks, Blocks, Blocks, Blocks, Blocks, Blocks]

interface ArticleInput {
  id: string
  title: string
  branchId: string
  level: Level
  summary: string
  prerequisites: string[]
  tags: string[]
  sections: Twelve
  simulationId?: string
  simCaption?: string
}

const HEADINGS = [
  '1 · The problem it solves',
  '2 · Intuition',
  '3 · Visual understanding',
  '4 · Definition and notation',
  '5 · Derivation from first principles',
  '6 · Worked examples',
  '7 · Theorems and proofs',
  '8 · Computational experiment',
  '9 · Real-world applications',
  '10 · Common mistakes',
  '11 · Conceptual questions',
  '12 · Further reading',
]

/** Assemble the standardized twelve-section teaching structure for one topic. */
function article(a: ArticleInput): Topic {
  const blocks: Block[] = []
  for (let i = 0; i < 12; i++) {
    blocks.push({ kind: 'heading', text: HEADINGS[i], level: 2 })
    for (const block of a.sections[i]) blocks.push(block)
    if (i === 7 && a.simulationId) {
      blocks.push({ kind: 'sim', sim: a.simulationId, caption: a.simCaption })
    }
  }
  return {
    id: a.id,
    title: a.title,
    branchId: a.branchId,
    level: a.level,
    summary: a.summary,
    prerequisites: a.prerequisites,
    tags: a.tags,
    status: 'Complete',
    blocks,
    ...(a.simulationId ? { simulationIds: [a.simulationId] } : {}),
  }
}

const P = (text: string): Block => ({ kind: 'paragraph', text })
const H = (text: string, level: 2 | 3 = 3): Block => ({ kind: 'heading', text, level })
const M = (latex: string, caption?: string): Block =>
  caption ? { kind: 'math', latex, display: true, caption } : { kind: 'math', latex, display: true }
const MI = (latex: string): Block => ({ kind: 'math', latex, display: false })
const LI = (items: string[], ordered = false): Block => ({ kind: 'list', items, ordered })
const CA = (tone: 'note' | 'intuition' | 'visual' | 'warning' | 'history' | 'experiment' | 'application',
  text: string, title?: string): Block => (title ? { kind: 'callout', tone, title, text } : { kind: 'callout', tone, text })
const ST = (title: string, items: { title: string; text: string; math?: string }[]): Block => ({ kind: 'steps', title, items })
const TB = (headers: string[], rows: string[][]): Block => ({ kind: 'table', headers, rows })
const CO = (code: string, language = 'python', caption?: string): Block =>
  caption ? { kind: 'code', code, language, caption } : { kind: 'code', code, language }

export const P2_TOPICS: Topic[] = [
  // ── Differential calculus ─────────────────────────────────────────────────
  article({
    id: 'limits', title: 'Limits', branchId: 'differential-calculus', level: 'Undergraduate 1',
    summary: "A limit describes the value a function approaches as its input approaches a point, independent of the function's value at that point. It is the rigorous foundation for continuity, derivatives and integrals.",
    prerequisites: [], tags: ['limit', 'epsilon-delta', 'approach', 'asymptote', 'squeeze'],
    sections: [
      [P("Calculus asks questions that algebra cannot answer directly: what is the slope at a single instant, or the value of an expression whose numerator and denominator both vanish? The limit isolates the idea of approaching a point without ever needing to arrive there, so that expressions such as $\\frac{x^2-1}{x-1}$ can be assigned a meaningful behaviour at $x=1$ even though they are undefined there."),
       M(String.raw`\lim_{x \to a} f(x) = L \quad\text{means}\quad \forall \varepsilon>0\;\exists\delta>0:\;0<|x-a|<\delta \Rightarrow |f(x)-L|<\varepsilon`, "The epsilon-delta definition, with the punctured neighbourhood 0 < |x−a|."),
       P("The same language handles unbounded approach: $\\lim_{x\\to\\infty} f(x)=L$ means that $f(x)$ can be forced arbitrarily close to $L$ by taking $x$ sufficiently large.")],
      [P("Think of a target and a tolerance. You name any error tolerance $\\varepsilon>0$, however tiny, and the function promises to stay within that tolerance of $L$ whenever the input is within some corresponding distance $\\delta$ of $a$. The limit exists exactly when this promise can be kept for every tolerance."),
       CA('intuition', 'A limit is a statement about a neighbourhood, not about a single point. The punctured condition $0<|x-a|$ deliberately excludes $x=a$: the function may be undefined there, or may have a completely different value, without affecting the limit.', 'Approach, not arrival')],
      [P("For $f(x)=\\frac{x^2-1}{x-1}=x+1$ for $x\\neq 1$, the graph is the line $y=x+1$ with one missing point at $(1,2)$. Walking along the graph from either side, the height tends to $2$; the hole does not change the destination."),
       TB(['x', '0.9', '0.99', '0.999', '1.001', '1.01', '1.1'],
         [['f(x) = (x²−1)/(x−1)', '1.9', '1.99', '1.999', '2.001', '2.01', '2.1']]),
       CA('visual', 'Left-hand and right-hand limits are read from the same picture: $\\lim_{x\\to a^-} f(x)$ walks in from the left, $\\lim_{x\\to a^+} f(x)$ from the right. The two-sided limit exists only when both approach the same number.', 'Two sides, one destination')],
      [P("The notation $x\\to a$ specifies the approach, $L$ is the limiting value, and $f$ must be defined on a punctured neighbourhood of $a$ (possibly except at $a$ itself). One-sided limits use $x\\to a^-$ and $x\\to a^+$; infinite limits and limits at infinity are defined by analogous quantified statements."),
       M(String.raw`\lim_{x\to a^-}f(x)=\lim_{x\to a^+}f(x)=L \iff \lim_{x\to a}f(x)=L`),
       P("The value $f(a)$ is irrelevant: a removable discontinuity (a hole) and a correctly filled point have the same limit.")],
      [P("Work directly from the definition rather than by substitution when the substitution is illegal. We prove $\\lim_{x\\to 1}\\frac{x^2-1}{x-1}=2$."),
       ST('Proof from the definition', [
         { title: 'Simplify away the illegal step', text: 'For x ≠ 1 we may cancel the common factor; the punctured neighbourhood in the definition licenses exactly this.', math: String.raw`\frac{x^2-1}{x-1}=\frac{(x-1)(x+1)}{x-1}=x+1\quad(x\neq1)` },
         { title: 'Control the distance to the candidate limit', text: 'The distance from the simplified expression to 2 equals the distance from x to 1, so the same δ works for every ε.', math: String.raw`|f(x)-2|=|x+1-2|=|x-1|` },
         { title: 'Choose δ', text: 'Given ε > 0, set δ = ε. Then 0 < |x−1| < δ forces |f(x)−2| < ε, which is precisely the definition.', math: String.raw`0<|x-1|<\delta=\varepsilon\ \Longrightarrow\ |f(x)-2|<\varepsilon` },
       ]),
       CA('warning', 'Cancelling $\\frac{x-1}{x-1}$ is valid only for $x\\neq1$; the definition deliberately never evaluates the function at $x=1$. Substituting $x=1$ into the original fraction gives $0/0$, which is undefined, not a limit.', 'Why we never substitute into 0/0')],
      [P('Three representative computations, each justified by a different technique.'),
       M(String.raw`\lim_{x\to\infty}\frac{3x^2+2x-1}{x^2+1}=\lim_{x\to\infty}\frac{3+2/x-1/x^2}{1+1/x^2}=3`, "Divide numerator and denominator by the highest power."),
       M(String.raw`\lim_{x\to 0}\frac{\sqrt{x+1}-1}{x}=\lim_{x\to 0}\frac{x}{x(\sqrt{x+1}+1)}=\frac12`, "Rationalize the numerator; the factor x cancels for x ≠ 0."),
       M(String.raw`\lim_{x\to0}\frac{\sin 3x}{x}=3\lim_{u\to0}\frac{\sin u}{u}=3`, "Substitute u = 3x and use the fundamental trigonometric limit (radians).")],
      [P('Limit laws are theorems proved from the epsilon-delta definition: if $\\lim f=L$ and $\\lim g=M$ then $\\lim(f\\pm g)=L\\pm M$, $\\lim(fg)=LM$ and, when $M\\neq0$, $\\lim f/g=L/M$.'),
       P('Squeeze theorem (statement). If $g(x)\\le f(x)\\le h(x)$ on a punctured neighbourhood of $a$ and $\\lim_{x\\to a} g=\\lim_{x\\to a} h=L$, then $\\lim_{x\\to a} f=L$. Proof sketch: given $\\varepsilon>0$, choose one $\\delta$ making both $g>L-\\varepsilon$ and $h<L+\\varepsilon$; the middle function is trapped between them.'),
       P('Uniqueness (proof): if $f\\to L$ and $f\\to M$ with $L<M$, take $\\varepsilon=(M-L)/3$; the two resulting neighbourhoods are disjoint, yet both must contain $f(x)$ for $x$ sufficiently close to $a$ — a contradiction.')],
      [P('Symbolic and numerical exploration complement the definition: SymPy evaluates limits exactly, while a table of nearby values suggests the candidate before proof.'),
       CO(String.raw`import sympy as sp
import numpy as np
x = sp.symbols('x')
print(sp.limit((x**2-1)/(x-1), x, 1))          # 2
print(sp.limit((sp.sqrt(x+1)-1)/x, x, 0))       # 1/2
print(sp.limit(sp.sin(3*x)/x, x, 0))            # 3
vals = 1/np.array([10,100,1000,10000])
print([(np.sin(3*h)/h) for h in vals])         # tends to 3`),
       P('The numerical sequence approaches $3$ from below because $\\sin u < u$ for positive $u$; the exact computation confirms the trend.')],
      [P('Limits formalize instantaneous velocity as the limit of average velocities over shrinking time intervals, asymptotic behaviour of algorithms as $n\\to\\infty$, and the continuum idealisation in physics where a finite difference becomes a differential.'),
       LI(['Instantaneous speed: $\\lim_{h\\to0}\\frac{s(t+h)-s(t)}{h}$.', 'Terminal velocity and steady state: $\\lim_{t\\to\\infty}v(t)$.', 'Algorithm complexity: comparing growth rates as the input size tends to infinity.', 'Signal reconstruction: limits of sampling and filtering schemes.'])],
      [P('Common errors: treating $0/0$ as a number; ignoring one-sided behaviour at jumps or endpoints; assuming that a limit exists because a few sampled values look stable; and confusing a limit at infinity with a limit of the derivative.'),
       CA('warning', 'A finite table of values is evidence, never proof. The function that equals $0$ at every rational sample and $1$ elsewhere has no limit anywhere, although a rational-only table would suggest $0$.', 'Numerical evidence is not a proof')],
      [LI(['Why can $f(a)$ differ from $\\lim_{x\\to a}f(x)$, and what does that say about holes?', 'Construct a function whose left and right limits at $0$ both exist but differ.', 'How would you prove $\\lim_{x\\to0}x\\sin(1/x)=0$ without the squeeze theorem?', 'What is the difference between $\\lim_{x\\to a}f(x)=+\\infty$ and a limit that does not exist?'])],
      [LI(["OpenStax, Calculus Volume 1, chapter 2: The Limit of a Function (open textbook).", 'MIT OpenCourseWare 18.01, lectures on limits and continuity (video course).', 'Next topics: continuity, derivatives, and the derivation of $\\lim_{x\\to0}\\sin x/x$.'])],
    ],
  }),

  article({
    id: 'continuity', title: 'Continuity', branchId: 'differential-calculus', level: 'Undergraduate 1',
    summary: "Continuity makes precise the idea that small changes in input produce small changes in output. It is the hypothesis that powers the intermediate value and extreme value theorems and underlies every differentiability result.",
    prerequisites: ['limits'], tags: ['continuous', 'intermediate-value', 'compactness', 'discontinuity'],
    sections: [
      [P("Many theorems fail for functions with jumps or holes: a temperature field with a discontinuity need not attain an intermediate value, and a function with a vertical asymptote need not have a maximum. Continuity is the condition that rules out these pathologies on an interval."),
       M(String.raw`f\text{ is continuous at }a \iff \lim_{x\to a}f(x)=f(a)`, "Three requirements: f(a) exists, the limit exists, and they agree.")],
      [P("Continuity at $a$ is the limit promise with the extra clause that the promised value is exactly $f(a)$. Equivalently, every neighbourhood of $f(a)$ contains the image of some neighbourhood of $a$ — the topological viewpoint generalizes to metric and abstract spaces."),
       CA('intuition', "A continuous graph can be drawn over a small interval without lifting the pencil. This picture is reliable for functions on $\\mathbb{R}$, but the epsilon-delta definition is the actual mathematics; the picture cannot prove a theorem.", 'No lifting, but prove it')],
      [P("Discontinuities come in recognisable types, each visible as a distinct failure of the three-part definition."),
       TB(['Type', 'Failure', 'Typical example'],
         [['Removable', 'Limit exists but f(a) differs or is undefined', 'sin(x)/x at 0, if not patched'],
          ['Jump', 'Left and right limits exist but differ', 'sign(x) at 0'],
          ['Infinite', 'Function unbounded near a', '1/x² at 0'],
          ['Oscillatory', 'Limit fails by endless oscillation', 'sin(1/x) at 0']]),
       CA('visual', "For a removable discontinuity the graph has a single hole; for a jump there are two distinct one-sided endpoints; for an infinite discontinuity the curve escapes to infinity. The epsilon-delta definition detects all three uniformly.", 'Reading discontinuity types')],
      [P("Formally, $f$ is continuous at $a\\in D$ if for every $\\varepsilon>0$ there is $\\delta>0$ such that $x\\in D$ and $|x-a|<\\delta$ imply $|f(x)-f(a)|<\\varepsilon$. Continuity on a set means continuity at every point of that set; continuity from the left/right uses the corresponding one-sided restriction."),
       M(String.raw`\forall\varepsilon>0\;\exists\delta>0\;\forall x\in D:\;|x-a|<\delta\Rightarrow|f(x)-f(a)|<\varepsilon`),
       P("Note the contrast with the limit definition: here $x=a$ is allowed (and the inequality is automatically true there).")],
      [P("We prove $f(x)=x^2$ is continuous at $a=2$, controlling the factor $x+2$ by first restricting $x$ to a bounded neighbourhood."),
       ST('Epsilon-delta proof', [
         { title: 'Factor the error', text: 'The difference of squares separates into a small factor |x−2| and a locally bounded factor |x+2|.', math: String.raw`|x^2-4|=|x-2|\,|x+2|` },
         { title: 'Bound the troublesome factor', text: 'If |x−2| < 1 then 1 < x < 3, hence |x+2| < 5.', math: String.raw`|x-2|<1\ \Longrightarrow\ |x+2|<5\ \Longrightarrow\ |x^2-4|<5|x-2|` },
         { title: 'Choose delta', text: 'Take δ = min(1, ε/5). Then both the bound and |x²−4| < ε hold.', math: String.raw`\delta=\min(1,\varepsilon/5)\ \Longrightarrow\ |x^2-4|<\varepsilon` },
       ]),
       CA('history', 'The epsilon-delta formulation was crystallised by Karl Weierstrass in the nineteenth century, making earlier intuitive accounts of continuity rigorous and enabling the discovery of functions continuous everywhere but differentiable nowhere.', 'Weierstrass and rigour')],
      [P('Worked checks with explicit numbers.'),
       P("Piecewise $g(x)=x^2$ for $x\\le 1$ and $g(x)=2x-1$ for $x>1$: at $x=1$ both pieces give $1$, so $g$ is continuous there. At $x=0$ the function $|x|$ is continuous because $\\bigl||x|-0\\bigr|=|x-0|$."),
       M(String.raw`\lim_{x\to1^-}x^2=1,\qquad \lim_{x\to1^+}(2x-1)=1,\qquad g(1)=1`),
       P("Conversely $h(x)=\\frac{1}{x-2}$ is discontinuous at $2$: $h(2)$ is undefined and the limit is infinite. The function $\\mathrm{sign}(x)$ has left limit $-1$ and right limit $1$ at $0$.")],
      [P('Theorem (intermediate value theorem, IVT). If $f$ is continuous on the closed interval $[a,b]$ and $y$ lies between $f(a)$ and $f(b)$, then some $c\\in[a,b]$ satisfies $f(c)=y$. The closed-interval hypothesis is essential: on $(0,1)$ the continuous function $f(x)=x$ never takes the value $0$.'),
       P('Proof sketch of IVT: assume $f(a)<y<f(b)$ and let $S=\\{x\\in[a,b]: f(x)\\le y\\}$. $S$ is nonempty and bounded, so $c=\\sup S$ exists by completeness. Continuity forces $f(c)=y$: $f(c)<y$ would allow a slightly larger point in $S$, while $f(c)>y$ would exclude a left neighbourhood of $c$ from $S$.'),
       P('Theorem (extreme value theorem, EVT). A continuous function on $[a,b]$ attains a maximum and a minimum. Proof sketch: continuity plus compactness of $[a,b]$ makes the image compact, hence closed and bounded, so it contains its supremum and infimum. The composition of continuous functions is continuous (proof: compose the two epsilon-delta conditions).')],
      [P('We test continuity at a point symbolically and sample the error magnitude numerically.'),
       CO(String.raw`import sympy as sp
import numpy as np
x = sp.symbols('x')
f = sp.Piecewise((x**2, x <= 1), (2*x-1, x > 1))
print(sp.limit(f, x, 1, dir='-'), sp.limit(f, x, 1, dir='+'))  # 1 1
# Continuity check for x^2 at 2: error shrinks linearly in |x-2|
for h in [0.1, 0.01, 0.001]:
    print(h, abs((2+h)**2 - 4))                              # ~5h`),
       P("The error at offset $h$ is $5h+h^2$, confirming the bound $5|h|$ used in the proof.")],
      [P("Continuity is the working assumption behind physical fields: a temperature distribution is modelled as continuous so that intermediate temperatures and maxima exist, and numerical solvers approximate such functions by small steps. Signal processing distinguishes continuous waveforms from sampled ones; the sampling theorem relies on continuity-like regularity."),
       LI(["Existence of solutions: IVT guarantees a root between a negative and a positive endpoint.", 'Optimisation: EVT guarantees that a continuous cost on a compact feasible set has a minimiser.', 'Computer graphics: continuity of parametrisations prevents visible cracks in rendered surfaces.'])],
      [P('Pitfalls: checking continuity only at the endpoints or only at interior points; forgetting the domain restriction in the epsilon-delta definition; assuming that a function continuous at a point is continuous on an interval; and treating a removable discontinuity as if the limit did not exist.'),
       CA('warning', "The function $f(x)=\\frac{x}{x}$ is continuous at every point of its domain, but its domain excludes $0$. Whether a discontinuity 'exists' at $0$ depends on whether you insist on $0$ being in the domain.", 'Domain matters')],
      [LI(['Does differentiability imply continuity? Does continuity imply differentiability?', 'Why must the interval be closed for the intermediate value theorem?', 'Can a function be continuous at exactly one point? (Consider $x$ times the Dirichlet function.)', 'How does continuity of $f$ at $a$ differ from continuity of $f$ on a neighbourhood of $a$?'])],
      [LI(['OpenStax, Calculus Volume 1, chapter 2: Continuity (open textbook).', 'MIT OpenCourseWare 18.01, continuity and the intermediate value theorem (video course).', 'Next topics: derivatives, the mean value theorem, and compactness in real analysis.'])],
    ],
  }),

  article({
    id: 'derivatives', title: 'Derivatives', branchId: 'differential-calculus', level: 'Undergraduate 1',
    summary: "The derivative is the limit of average rates of change and gives the instantaneous rate, the slope of a tangent line, and the local linear approximation of a function. It turns qualitative motion into computable algebra.",
    prerequisites: ['limits', 'continuity'], tags: ['derivative', 'tangent', 'rate-of-change', 'linearisation'],
    simulationId: 'tangent-line', simCaption: 'Drag the point to see the tangent line and the surrounding secants converge.',
    sections: [
      [P("Average speed over an hour does not tell a driver the speed at an instant; a secant line through two points does not give the slope at one point. The derivative solves both problems by taking a limit as the separation shrinks to zero."),
       M(String.raw`f'(a)=\lim_{h\to0}\frac{f(a+h)-f(a)}{h}`, 'Difference quotient and its limit, when the limit exists.'),
       P("The related one-sided derivatives use $h\\to0^+$ or $h\\to0^-$; differentiability requires both to exist and agree.")],
      [P("Magnify the graph of a smooth function near a point: it increasingly resembles a straight line. The derivative is the slope of that limiting line, and it converts a curved local behaviour into a linear one that is easy to compute with."),
       CA('intuition', "The derivative is not a tiny ratio; it is the limit of ratios. The numerator and denominator both tend to zero, and the limit extracts their leading-order relationship.", 'A rate, not a small number')],
      [P("For $f(x)=x^2$ at $a=1$, secants from $x=1+h$ have slope $\\frac{(1+h)^2-1}{h}=2+h$, which tends to $2$. The tangent line is therefore $y=2x-1$."),
       TB(['h', '0.1', '0.01', '0.001', '−0.001'],
         [['secant slope 2+h', '2.1', '2.01', '2.001', '1.999']]),
       CA('visual', 'At a smooth point the tangent touches the curve and shares its direction. At a corner the left and right tangents disagree; at a cusp or vertical tangent the slope is unbounded, so no finite derivative exists.', 'Tangent versus corner')],
      [P("Notation includes $f'(a)$, $\\frac{df}{dx}(a)$, $Df(a)$ and, in one dimension, $\\dot x$ for time derivatives. Differentiability at $a$ means the difference quotient has a finite two-sided limit; the derivative function $f'$ maps each such $a$ to that limit."),
       M(String.raw`L_a(h)=\frac{f(a+h)-f(a)}{h},\qquad f'(a)=\lim_{h\to0}L_a(h)`),
       P("The approximation $f(a+h)\\approx f(a)+f'(a)h$ is the first-order Taylor expansion; its error is small compared with $h$.")],
      [P("We compute $f'(x)$ for $f(x)=x^2$ strictly from the definition, then specialise to $x=1$."),
       ST('First-principles derivation', [
         { title: 'Form the difference quotient', text: 'Expand the numerator and cancel the common factor, valid for h ≠ 0.', math: String.raw`\frac{(x+h)^2-x^2}{h}=\frac{2xh+h^2}{h}=2x+h` },
         { title: 'Take the limit', text: 'Since 2x + h is continuous in h, the limit is obtained by setting h = 0.', math: String.raw`f'(x)=\lim_{h\to0}(2x+h)=2x` },
         { title: 'Evaluate', text: 'At x = 1 the slope is 2, so the tangent line through (1,1) is y − 1 = 2(x − 1).', math: String.raw`f'(1)=2,\qquad y=2x-1` },
       ]),
       CA('history', "Newton's fluxions and Leibniz's differentials gave the first systematic calculus in the late seventeenth century; the limit definition that makes the computation rigorous came later, through Cauchy and Weierstrass.", 'Independent inventions')],
      [P("Worked derivatives with explicit evaluation."),
       M(String.raw`f(x)=x^3:\quad \frac{(x+h)^3-x^3}{h}=3x^2+3xh+h^2\ \Rightarrow\ f'(2)=12`),
       M(String.raw`f(x)=\frac1x:\quad \frac{\frac1{x+h}-\frac1x}{h}=-\frac1{x(x+h)}\ \Rightarrow\ f'(2)=-\frac14`),
       M(String.raw`f(x)=\sqrt{x}:\quad \frac{\sqrt{x+h}-\sqrt{x}}{h}=\frac1{\sqrt{x+h}+\sqrt{x}}\ \Rightarrow\ f'(4)=\frac14`)],
      [P('Theorem. If $f$ is differentiable at $a$, then $f$ is continuous at $a$. Proof: $f(a+h)-f(a)=h\\cdot\\frac{f(a+h)-f(a)}{h}\\to0\\cdot f\'(a)=0$. The converse is false: $|x|$ is continuous at $0$ but has no derivative there.'),
       P('Product rule (statement and proof sketch). If $f,g$ are differentiable at $a$, then $(fg)\'(a)=f\'(a)g(a)+f(a)g\'(a)$. Add and subtract $f(a+h)g(a)$ in the numerator of the difference quotient and apply the limit laws. The quotient rule follows similarly when $g(a)\\neq0$.'),
       M(String.raw`\lim_{h\to0}\frac{f(a+h)g(a+h)-f(a)g(a)}{h}=f'(a)g(a)+f(a)g'(a)`)],
      [P('Symbolic differentiation and a numerical secant experiment should agree.'),
       CO(String.raw`import sympy as sp
import numpy as np
x = sp.symbols('x')
print(sp.diff(x**2, x))                       # 2*x
print(sp.diff(sp.sqrt(x), x).subs(x, 4))      # 1/4
for h in [1e-1, 1e-2, 1e-3, 1e-6]:
    print(h, ((1+h)**2 - 1)/h)               # → 2`),
       P('For very small $h$ floating-point cancellation eventually degrades the numerical quotient — an important practical limit of numerical differentiation.')],
      [P("Derivatives encode velocity (derivative of position), acceleration (derivative of velocity), marginal cost in economics, and sensitivity of a model output to a parameter. In machine learning the derivative of a loss with respect to each parameter drives optimisation."),
       LI(['Physics: $v=s\'(t)$, $a=v\'(t)$.', 'Economics: marginal revenue $R\'(q)$.', 'Medicine: rate of change of drug concentration.', 'Machine learning: gradients computed by automatic differentiation.'])],
      [P('Errors include treating the derivative as the ratio of two zeros, forgetting that differentiability is stronger than continuity, and assuming a corner has a derivative. Oversimplifying the tangent picture also hides cases such as $x^{1/3}$, which has a vertical tangent at $0$ and no finite derivative.'),
       CA('warning', "The existence of $\\lim_{h\\to0}\\frac{f(a+h)-f(a)}{h}$ requires the left and right limits to agree. For $f(x)=|x|$ they are $-1$ and $+1$, so $f\'(0)$ does not exist despite the graph having a visible 'corner direction'.", 'Corners are not differentiable')],
      [LI(['If $f\'(a)>0$, must $f$ be increasing near $a$? (Hint: consider differentiability in a neighbourhood.)', 'Why does differentiability at a point force continuity there?', 'What function has a derivative at $0$ but is discontinuous everywhere else?', 'How is a tangent line related to the best linear approximation?'])],
      [LI(['OpenStax, Calculus Volume 1, chapter 3: Derivatives (open textbook).', 'MIT OpenCourseWare 18.01, differentiation and rates of change (video course).', 'Next topics: chain rule, mean value theorem, and the derivation of the power rule.'])],
    ],
  }),

  article({
    id: 'chain-rule', title: 'The Chain Rule', branchId: 'differential-calculus', level: 'Undergraduate 1',
    summary: "The chain rule computes the derivative of a composition as the product of the derivatives of the outer and inner functions. It is the mechanism behind implicit differentiation, backpropagation and nearly every practical differentiation.",
    prerequisites: ['derivatives'], tags: ['composition', 'backpropagation', 'leibniz', 'differentiation'],
    sections: [
      [P("We can differentiate $\\sin x$ and $x^2$ separately, but $\\sin(x^2)$ requires combining the two results. The chain rule answers how rates compose: a change in $x$ changes $u=x^2$, which in turn changes $y=\\sin u$."),
       M(String.raw`\frac{dy}{dx}=\frac{dy}{du}\cdot\frac{du}{dx}`, "Leibniz form: the inner differential cancels formally.")],
      [P("Imagine two coupled gears. If the second gear turns three times as fast as the first, and a pointer on the second amplifies motion by a factor of two, then the pointer moves six times as fast as the first gear. Derivatives of composed functions multiply for the same reason."),
       CA('intuition', "The chain rule multiplies local magnification factors. The outer derivative is evaluated at the *inner function's value*, not at the original input — a distinction that causes most errors.", 'Magnification factors multiply')],
      [P("The mapping view is $x\\mapsto u=g(x)\\mapsto y=f(u)$. A small step $\\Delta x$ produces $\\Delta u\\approx g\'(x)\\Delta x$, which produces $\\Delta y\\approx f\'(u)\\Delta u$; composing the two linear approximations gives $\\Delta y\\approx f\'(g(x))g\'(x)\\Delta x$."),
       LI(['Linear approximation view: compose the two tangent lines.', 'Rate view: multiply rates through intermediate variables.', 'Leibniz view: formally cancel the differential du.'])],
      [P("If $g$ is differentiable at $a$ and $f$ is differentiable at $g(a)$, then $f\\circ g$ is differentiable at $a$ and $(f\\circ g)\'(a)=f\'(g(a))g\'(a)$. Equivalently, in vector notation $D(f\\circ g)(a)=Df(g(a))\\,Dg(a)$."),
       M(String.raw`\frac{d}{dx}f(g(x))=f'(g(x))\,g'(x)`),
       P('The hypothesis that $f$ is differentiable at $g(a)$ (not merely somewhere else) is essential.')],
      [P("Proof using error functions (Carathéodory form of differentiability). This is a genuine proof, not a heuristic: differentiability is rewritten as a factorisation with a vanishing error term."),
       ST('Rigorous proof', [
         { title: 'Factor the inner derivative', text: 'Differentiability of g at a gives a function ε_g(h) → 0 with this exact identity (define ε_g(0) = 0).', math: String.raw`g(a+h)-g(a)=\bigl(g'(a)+\varepsilon_g(h)\bigr)h,\quad \varepsilon_g(h)\to0` },
         { title: 'Factor the outer derivative', text: 'Differentiability of f at b = g(a) gives ε_f(k) → 0 as k → 0, with ε_f(0) = 0 (continuity of f at b).', math: String.raw`f(b+k)-f(b)=\bigl(f'(b)+\varepsilon_f(k)\bigr)k` },
         { title: 'Substitute k = g(a+h) − g(a)', text: 'Because g is continuous at a, k → 0 as h → 0, so ε_f(k) → 0.', math: String.raw`\frac{f(g(a+h))-f(g(a))}{h}=\bigl(f'(b)+\varepsilon_f(k)\bigr)\bigl(g'(a)+\varepsilon_g(h)\bigr)` },
         { title: 'Take the limit', text: 'The right-hand side tends to f′(b)g′(a), which is the chain rule.', math: String.raw`(f\circ g)'(a)=f'(g(a))\,g'(a)` },
       ]),
       CA('warning', 'The naive argument "multiply and cancel dh" is only a mnemonic. The proof above is needed because when g′(a) = 0 the inner increment k may vanish identically along a sequence of h values, making division by k illegitimate.', 'Why the proof needs error terms')],
      [P('Worked examples with evaluation at explicit points.'),
       M(String.raw`\frac{d}{dx}\sin(x^2)=\cos(x^2)\cdot 2x`),
       M(String.raw`\frac{d}{dx}(3x+1)^4=4(3x+1)^3\cdot3=12(3x+1)^3`),
       M(String.raw`f(x)=\sqrt{1+x^2}:\quad f'(x)=\frac{x}{\sqrt{1+x^2}},\quad f'(3)=\frac{3}{\sqrt{10}}\approx0.94868`)],
      [P('Theorem (multivariable chain rule, statement). If $g:\\mathbb{R}\\to\\mathbb{R}^n$ is differentiable at $t$ and $f:\\mathbb{R}^n\\to\\mathbb{R}$ is differentiable at $g(t)$, then $\\frac{d}{dt}f(g(t))=\\nabla f(g(t))\\cdot g\'(t)$. Proof sketch: apply the one-variable chain rule to $f$ restricted to the line traced by $g$, using the directional derivative.'),
       P('Repeated application gives the general fact that the derivative of a composition of $m$ functions is the product of their derivatives evaluated along the chain, which underlies automatic differentiation.')],
      [P('Symbolic differentiation verifies the products directly.'),
       CO(String.raw`import sympy as sp
x = sp.symbols('x')
for f in [sp.sin(x**2), (3*x+1)**4, sp.sqrt(1+x**2)]:
    print(sp.diff(f, x))
# numerical check at x = 3 for sqrt(1+x^2)
print(float(sp.diff(sp.sqrt(1+x**2), x).subs(x, 3)))   # 0.948683...`),
       P('At $x=3$ the exact derivative is $3/\\sqrt{10}=0.948683298\\ldots$, matching the symbolic evaluation.')],
      [P('Backpropagation in neural networks is repeated chain rule: each layer contributes a Jacobian factor, and gradients are propagated backwards as products of those factors. Related rates in physics and engineering (e.g. changing volume versus changing radius) are likewise chain-rule computations.'),
       LI(['Machine learning: gradient of a composite loss through layers.', 'Thermodynamics: relating rates of change of pressure, volume and temperature.', 'Geometry: derivative of area with respect to a changing radius.'])],
      [P('Common errors: differentiating $f(g(x))$ as $f\'(g(x))$ and omitting $g\'(x)$; evaluating the outer derivative at $x$ instead of $g(x)$; and losing a constant factor inside the inner derivative.'),
       CA('warning', 'For $\\frac{d}{dx}\\sin(2x)$ the answer is $2\\cos(2x)$, not $\\cos(2x)$ or $2\\cos x$. The inner derivative $2$ and the evaluation point $2x$ are both mandatory.', 'Two independent factors')],
      [LI(['Why is the chain rule a statement about products of linear maps?', 'When can the outer derivative be evaluated at $x$ rather than $g(x)$?', 'How does the chain rule recover implicit differentiation of $y^2+x^2=1$?', 'What goes wrong with the informal cancellation argument when $g\'(a)=0$?'])],
      [LI(['OpenStax, Calculus Volume 1, chapter 3: The Chain Rule (open textbook).', 'MIT OpenCourseWare 18.01, the chain rule (video course).', 'Next topics: implicit differentiation and backpropagation in the mathematics-for-AI branch.'])],
    ],
  }),

  article({
    id: 'taylor-series', title: 'Taylor Series', branchId: 'differential-calculus', level: 'Undergraduate 2',
    summary: "A Taylor series rewrites a smooth function as an infinite polynomial whose coefficients are determined by derivatives at one point. Truncating the series gives local approximations with explicit, quantifiable error.",
    prerequisites: ['derivatives', 'continuity'], tags: ['series', 'approximation', 'remainder', 'analytic'],
    simulationId: 'taylor-approximation', simCaption: 'Increase the polynomial degree and watch the approximation track sin(x) over a wider interval.',
    sections: [
      [P("Functions such as $\\sin x$ or $e^x$ are hard to evaluate by elementary arithmetic, while polynomials are easy. Taylor's idea is to build the polynomial that matches the function's value, slope, curvature and higher derivatives at a chosen centre."),
       M(String.raw`f(x)=\sum_{n=0}^{\infty}\frac{f^{(n)}(a)}{n!}(x-a)^n`, 'The Taylor series of f about a; the case a = 0 is a Maclaurin series.')],
      [P("Matching derivatives is like reconstructing a curve from its local behaviour: the zeroth coefficient fixes height, the first fixes slope, the second fixes curvature, and so on. Each new term improves the approximation in a neighbourhood of the centre."),
       CA('intuition', "The $n$th Taylor polynomial is the unique degree-$n$ polynomial whose first $n$ derivatives at $a$ coincide with those of $f$. Nothing in this construction promises convergence for far-away $x$ — that is a separate theorem.", 'Local matching, global caution')],
      [P("For $\\sin x$ about $0$, the successive approximations are $x$, $x-\\frac{x^3}{6}$, $x-\\frac{x^3}{6}+\\frac{x^5}{120}$. At $x=1$ the true value is $\\sin 1=0.8414709848\\ldots$."),
       TB(['Polynomial', 'Value at x = 1', 'Error'],
         [['T₁ = x', '1', '1.5853 × 10⁻¹'], ['T₃ = x − x³/6', '0.8333333', '8.1377 × 10⁻³'],
          ['T₅ = T₃ + x⁵/120', '0.8416667', '1.9568 × 10⁻⁴'], ['T₇', '0.8414683', '2.7308 × 10⁻⁶']]),
       CA('visual', 'Adding an odd power alternately overshoots and undershoots the sine curve. The approximations hug the curve near $0$ and peel away further out, exactly as an error term proportional to $|x|^{n+1}$ predicts.', 'Nested approximations')],
      [P("The $n$th Taylor polynomial is $T_n(x)=\\sum_{k=0}^n \\frac{f^{(k)}(a)}{k!}(x-a)^k$, and the remainder is $R_n(x)=f(x)-T_n(x)$. When $R_n(x)\\to0$ as $n\\to\\infty$, the function equals its Taylor series near $a$ and is called analytic there."),
       M(String.raw`T_n(x)=\sum_{k=0}^{n}\frac{f^{(k)}(a)}{k!}(x-a)^k,\qquad R_n(x)=f(x)-T_n(x)`)],
      [P("Where do the coefficients $\\frac{f^{(n)}(a)}{n!}$ come from? Assume a power-series representation and differentiate term by term."),
       ST('Deriving the coefficients', [
         { title: 'Assume a power series', text: 'Write f as a formal sum of powers of (x − a) with unknown coefficients.', math: String.raw`f(x)=c_0+c_1(x-a)+c_2(x-a)^2+\cdots` },
         { title: 'Evaluate at the centre', text: 'All terms with a positive power vanish, leaving c₀.', math: String.raw`f(a)=c_0` },
         { title: 'Differentiate n times and evaluate', text: 'Term-by-term differentiation kills every term of degree below n and leaves n!cₙ at the centre.', math: String.raw`f^{(n)}(a)=n!\,c_n\ \Longrightarrow\ c_n=\frac{f^{(n)}(a)}{n!}` },
       ]),
       CA('history', 'Brook Taylor published the expansion in 1715; Colin Maclaurin popularised the special case centred at zero. The rigorous error formula came later via the mean value theorem.', 'Taylor and Maclaurin')],
      [P('Worked numerical expansions.'),
       M(String.raw`e^x=\sum_{n=0}^{\infty}\frac{x^n}{n!}:\quad e^{0.2}\approx1+0.2+0.02+\frac{0.008}{6}=1.2213333`),
       M(String.raw`\ln(1+x)=x-\frac{x^2}{2}+\frac{x^3}{3}-\cdots\quad (|x|<1,\ x=1\text{ conditionally})`),
       P('The cubic approximation to $e^{0.2}$ differs from the true value $1.221402758\\ldots$ by about $6.94\\times10^{-5}$.')],
      [P("Taylor's theorem with Lagrange remainder (statement). If $f^{(n)}$ is continuous on the closed interval between $a$ and $x$ and $f^{(n+1)}$ exists on the open interval between them, then $f(x)=T_n(x)+\\frac{f^{(n+1)}(\\xi)}{(n+1)!}(x-a)^{n+1}$ for some $\\xi$ between $a$ and $x$."),
       M(String.raw`R_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1}`),
       P('Proof sketch: define $\\phi(t)=f(t)-T_n(t)-R_n\\frac{(t-a)^{n+1}}{(x-a)^{n+1}}$. Then $\\phi(a)=\\phi(x)=0$ and $\\phi\'(a)=0$; repeated application of Rolle\'s theorem yields a point $\\xi$ with $\\phi^{(n+1)}(\\xi)=0$, which gives the displayed formula.'),
       CA('warning', 'Smooth does not imply analytic. The function $f(x)=e^{-1/x^2}$ for $x\\neq0$ and $f(0)=0$ is infinitely differentiable with every derivative at $0$ equal to zero, so its Taylor series is identically zero although $f$ is not. Having a convergent series is an extra hypothesis.', 'Smooth ≠ analytic')],
      [P('Compare symbolic series with numerical truncation.'),
       CO(String.raw`import sympy as sp
import math
x = sp.symbols('x')
print(sp.series(sp.sin(x), x, 0, 8))                 # x - x^3/6 + x^5/120 - x^7/5040
approx = 1 - 1/6 + 1/120 - 1/5040
print(approx, math.sin(1), math.sin(1)-approx)      # error ~ 2.73e-6
# Lagrange bound for e^0.2 with n = 3
print(math.exp(0.2)*0.2**4/math.factorial(4))       # 8.14e-5`),
       P('The Lagrange bound $8.14\\times10^{-5}$ is larger than the actual error $6.94\\times10^{-5}$, as it must be.')],
      [P('Taylor expansions underlie calculator implementations of transcendental functions, small-angle approximations in physics, error propagation in measurement science, and second-order approximations of loss functions in optimisation. Truncated series also linearise nonlinear systems around an operating point.'),
       LI(['Physics: $\\sin\\theta\\approx\\theta$ for small angles.', 'Statistics: the delta method uses a first-order Taylor expansion.', 'Optimisation: Newton\'s method uses the second-order local model.'])],
      [P('Frequent mistakes: omitting the factorial in the denominator; forgetting to shift $(x-a)$ when the centre is not zero; using a truncated series with no error bound; and assuming a finite radius of convergence does not matter.'),
       CA('warning', 'The series for $\\ln(1+x)$ converges for $-1<x\\le1$ and diverges for $x<-1$ and $x>1$. Substituting $x=2$ and summing a few positive-order terms gives nonsense, not $\\ln 3$.', 'Respect the convergence domain')],
      [LI(['Why does the remainder involve the (n+1)st derivative?', 'Can a Taylor series converge but not to the original function?', 'Which functions have a Taylor series that terminates after finitely many terms?', 'How would you bound the error of a truncated alternating series differently?'])],
      [LI(['OpenStax, Calculus Volume 2, chapter 5: Taylor and Maclaurin Series (open textbook).', 'MIT OpenCourseWare 18.01, Taylor series and applications (video course).', 'Next topics: Taylor\'s theorem with remainder (derivation) and power series in advanced calculus.'])],
    ],
  }),

  article({
    id: 'optimization', title: 'Optimization', branchId: 'differential-calculus', level: 'Undergraduate 1',
    summary: "Optimization finds the best value of a function subject to constraints. Calculus supplies necessary conditions via vanishing derivatives and sufficient conditions via convexity or second derivatives.",
    prerequisites: ['derivatives', 'chain-rule'], tags: ['maximum', 'minimum', 'convexity', 'critical-point'],
    simulationId: 'gradient-descent', simCaption: 'Adjust the learning rate and watch gradient descent approach the minimum of a quadratic.',
    sections: [
      [P("Designers want the cheapest beam that is strong enough; analysts want the parameter values that best fit data. Optimization formalises these as minimising or maximising an objective function over a feasible set."),
       M(String.raw`\min_{x\in S} f(x)\quad\text{or}\quad\max_{x\in S} f(x)`, 'The objective and the feasible set S.')],
      [P("A smooth function at an interior optimum looks locally flat: if the slope were positive you could move left to improve, and if negative you could move right. Hence a vanishing derivative is a necessary condition, not a sufficient one."),
       CA('intuition', "Optimization is a landscape problem: stationary points are flat spots, convex bowls have exactly one bottom, and nonconvex landscapes have many local optima that need not be globally best.", 'Flat spots and bowls')],
      [P("In one dimension a stationary point can be a minimum ($x^2$ at $0$), a maximum ($-x^2$ at $0$) or neither ($x^3$ at $0$). In higher dimensions saddle points such as $x^2-y^2$ at the origin are stationary but not extrema."),
       TB(['Point', "f'(x)", "f''(x)", 'Classification'],
         [['x = 0 of x²', '0', '2 > 0', 'local minimum'],
          ['x = 0 of −x²', '0', '−2 < 0', 'local maximum'],
          ['x = 0 of x³', '0', '0', 'neither (inspection)'],
          ['origin of x²−y²', '∇f = 0', 'indefinite Hessian', 'saddle']])],
      [P("A point $x^*$ is a global minimiser on $S$ if $f(x^*)\\le f(x)$ for all $x\\in S$; it is a local minimiser if the inequality holds in some neighbourhood. A critical point of a differentiable $f$ is a point where $f\'(x)=0$ (or the derivative fails to exist)."),
       M(String.raw`f\text{ convex}\iff f(\lambda x+(1-\lambda)y)\le\lambda f(x)+(1-\lambda)f(y),\ 0\le\lambda\le1`)],
      [P("Fermat's interior extremum theorem, proved from first principles: at an interior local extremum of a differentiable function the derivative must vanish."),
       ST('Proof and second-order test', [
         { title: 'One-sided sign of the difference quotient', text: 'At a local minimum, f(a+h) − f(a) ≥ 0 for small h of either sign.', math: String.raw`h>0:\ \frac{f(a+h)-f(a)}{h}\ge0\quad;\quad h<0:\ \frac{f(a+h)-f(a)}{h}\le0` },
         { title: 'Take one-sided limits', text: 'The right limit is ≥ 0 and the left limit is ≤ 0, but differentiability forces them to be equal, so the common value is 0.', math: String.raw`f'(a)=\lim_{h\to0^+}\frac{f(a+h)-f(a)}{h}\ge0\ \text{ and }\ f'(a)\le0\ \Rightarrow\ f'(a)=0` },
         { title: 'Second derivative test (statement)', text: 'If f′(a) = 0, f″(a) > 0 gives a local minimum; f″(a) < 0 gives a local maximum; f″(a) = 0 is inconclusive.', math: String.raw`f(a+h)=f(a)+\tfrac12 f''(a)h^2+o(h^2)` },
       ]),
       CA('warning', 'The necessary condition applies only to interior points where $f$ is differentiable. Endpoints and corners must be checked separately; a maximum can occur where no derivative exists.', 'Check boundaries')],
      [P('Two numerical optimisations carried out completely.'),
       M(String.raw`f(x)=x^2-4x+5,\quad f'(x)=2x-4=0\Rightarrow x=2,\quad f(2)=4-8+5=1`),
       P("For a rectangle of perimeter $20$, let the sides be $x$ and $10-x$. Area $A(x)=x(10-x)=10x-x^2$, so $A\'(x)=10-2x=0$ gives $x=5$ and $A=25$; $A\''=-2<0$ confirms a maximum."),
       M(String.raw`A(5)=5\cdot5=25`),
       P('On the closed interval $[0,10]$ the endpoint areas are $0$, so the interior critical point is indeed the global maximum.')],
      [P('Theorem (convexity, first-order characterisation). For a differentiable convex $f$ on a convex set, $f(y)\\ge f(x)+\\nabla f(x)\\cdot(y-x)$ for all $x,y$; hence any point with $\\nabla f=0$ is a global minimiser. Proof sketch: convexity gives the inequality for difference quotients in $t\\in[0,1]$ and taking $t\\to0^+$ yields the gradient form.'),
       P('Extreme value theorem (recalled): a continuous function on a compact set attains its extrema, so a global optimum exists; calculus then narrows the search to critical points, nondifferentiable points and the boundary.')],
      [P('Implement gradient descent on $f(x)=x^2-4x+5$, where $f\'(x)=2x-4$.'),
       CO(String.raw`import numpy as np
x = 10.0
eta = 0.1
for step in range(12):
    grad = 2*x - 4
    x = x - eta*grad
    if step < 3 or step == 11:
        print(step, round(x, 6), round(x**2-4*x+5, 6))
# x: 10 -> 8.4 -> 7.12 -> ... -> about 2.00028`),
       P('The iterates move toward the stationary point $x=2$ where $f=1$; too large a step size would oscillate or diverge.')],
      [P('Machine learning minimises a loss over millions of parameters using gradient-based methods; engineering minimises weight or cost subject to physical constraints; economics maximises utility or profit. All rely on the same local conditions, with convexity determining whether local implies global.'),
       LI(['Linear and quadratic programming for resource allocation.', 'Structural design under stress constraints.', 'Training neural networks by stochastic gradient descent.'])],
      [P('Common mistakes: declaring a critical point optimal without classification; ignoring endpoints or constraints; assuming every stationary point is a minimum; and using a step size that prevents convergence in numerical methods.'),
       CA('warning', "For $f(x)=x^3$ on $[-1,1]$ the derivative vanishes at $0$, yet the extrema are at the endpoints: $f(-1)=-1$ and $f(1)=1$. A critical point alone proves nothing.", 'Critical is not optimal')],
      [LI(['Why is convexity so valuable in optimisation?', 'How can a maximum of one function be turned into a minimum of another?', 'What extra condition makes a stationary point a global minimum?', 'Why do constrained problems require checking the boundary separately?'])],
      [LI(['OpenStax, Calculus Volume 1, chapter 4: Applications of Derivatives (open textbook).', 'MIT OpenCourseWare 18.01, optimisation (video course).', 'Next topics: the mean value theorem, gradient descent, and convex optimisation.'])],
    ],
  }),

  article({
    id: 'mean-value-theorem', title: 'The Mean Value Theorem', branchId: 'differential-calculus', level: 'Undergraduate 2',
    summary: "The mean value theorem links a function's total change over an interval to its derivative at some interior point. Its hypotheses of continuity on the closed interval and differentiability on the open interval are essential.",
    prerequisites: ['derivatives', 'continuity'], tags: ['rolle', 'average-rate', 'bounds', 'proof'],
    sections: [
      [P("Derivatives describe local change, while many questions concern total change: how large can $f(b)-f(a)$ be, or must a differentiable function with zero derivative be constant? The mean value theorem bridges the local and the global."),
       M(String.raw`f(b)-f(a)=f'(c)(b-a)\quad\text{for some }c\in(a,b)`)],
      [P("Drive from one town to another: your average speed over the trip must equal your instantaneous speed at some moment, provided your position varies continuously and smoothly. The theorem turns this everyday certainty into a precise statement."),
       CA('intuition', "Somewhere the tangent line is parallel to the secant joining the endpoints. The proof finds that point using the extreme value theorem, so compactness — not just smoothness — is doing real work.", 'Parallel tangent')],
      [P("Draw the secant through $(a,f(a))$ and $(b,f(b))$; slide a parallel line up or down until it just touches the graph. If the function is differentiable, the touch point has exactly the secant's slope."),
       LI(['Rolle: endpoints at equal height force a horizontal tangent.', 'MVT: tilt the picture by subtracting the secant slope.', 'Cauchy MVT: two functions give a ratio version.'])],
      [P("Rolle's theorem: if $f$ is continuous on $[a,b]$, differentiable on $(a,b)$ and $f(a)=f(b)$, then $f\'(c)=0$ for some $c\\in(a,b)$. The mean value theorem drops $f(a)=f(b)$ and concludes $f\'(c)=\\frac{f(b)-f(a)}{b-a}$, under the same continuity and differentiability hypotheses."),
       M(String.raw`\exists c\in(a,b):\quad f'(c)=\frac{f(b)-f(a)}{b-a}`),
       P('Cauchy MVT: for $f,g$ continuous on $[a,b]$ and differentiable on $(a,b)$, some $c$ satisfies $(f(b)-f(a))g\'(c)=(g(b)-g(a))f\'(c)$; setting $g(x)=x$ recovers the MVT.')],
      [P('Proof of Rolle, then the MVT by an auxiliary function. This is a full proof under the stated hypotheses.'),
       ST('Proof from compactness', [
         { title: 'Find an interior extremum', text: 'By the extreme value theorem f attains a maximum and a minimum on [a,b]. If both occur at endpoints then f(a)=f(b) forces f constant, and any c works.', math: String.raw`\text{otherwise an extremum occurs at }c\in(a,b)` },
         { title: 'Apply Fermat', text: 'At an interior extremum of a differentiable function the derivative vanishes (proved via one-sided difference quotients).', math: String.raw`f'(c)=0` },
         { title: 'Reduce MVT to Rolle', text: 'Subtract the secant line; the auxiliary function has equal endpoint values, so Rolle applies.', math: String.raw`g(x)=f(x)-\frac{f(b)-f(a)}{b-a}(x-a),\quad g(a)=g(b)=f(a)` },
         { title: 'Conclude', text: "Rolle gives g′(c)=0; since g′(c)=f′(c) minus the secant slope, the MVT follows.", math: String.raw`0=g'(c)=f'(c)-\frac{f(b)-f(a)}{b-a}` },
       ]),
       CA('warning', "The hypotheses cannot be dropped. $f(x)=|x|$ on $[-1,1]$ is continuous but not differentiable at $0$; the secant slope is $0$, yet $f\'(x)=\\pm1$ wherever it exists, so no suitable $c$ exists.", 'Both hypotheses matter')],
      [P('Explicit computations of the guaranteed point $c$.'),
       M(String.raw`f(x)=x^2\ \text{on}\ [1,3]:\quad \frac{f(3)-f(1)}{2}=\frac{9-1}{2}=4,\quad 2c=4\Rightarrow c=2`),
       M(String.raw`f(x)=\sqrt{x}\ \text{on}\ [1,4]:\quad \frac{2-1}{3}=\frac13,\quad \frac{1}{2\sqrt c}=\frac13\Rightarrow c=\frac94=2.25`),
       P('Both values lie strictly inside the interval, as the theorem guarantees.')],
      [P('Corollary 1: if $f\'=0$ on an interval, then $f$ is constant there. Proof: apply the MVT to any two points. Corollary 2: if $f\'\\ge0$ on an interval, then $f$ is nondecreasing. Corollary 3 (Lipschitz bound): if $|f\'|\\le M$ on $[a,b]$, then $|f(b)-f(a)|\\le M|b-a|$.'),
       P('Taylor\'s theorem with Lagrange remainder is obtained from Cauchy MVT, showing how a single compactness result generates much of differential calculus.')],
      [P('Find the point $c$ numerically for $f(x)=\\sin x$ on $[0,\\pi/2]$.'),
       CO(String.raw`import numpy as np
a, b = 0.0, np.pi/2
secant = (np.sin(b)-np.sin(a))/(b-a)      # 2/pi ≈ 0.63662
c = np.arccos(secant)                     # cos(c) = secant
print(secant, c, np.sin(c))
# check that c lies in the interval
print(0 < c < b)`),
       P('Here $c=\\arccos(2/\\pi)\\approx0.880689$, and $\\cos c\\approx0.63662=2/\\pi$, confirming the theorem.')],
      [P('The MVT justifies the traffic-law argument that a driver exceeding the average speed limit must at some instant exceed the limit, underwrites error bounds in numerical methods, and gives bounds on how much a model output can change when an input is perturbed.'),
       LI(['Bounding the error of linear approximations.', 'Proving monotonicity from the sign of the derivative.', 'Establishing uniqueness of solutions to differential equations.'])],
      [P('Mistakes include neglecting the open-interval differentiability requirement, applying the theorem to vector-valued functions without modification (the equality form fails), and asserting that the point $c$ is unique — it need not be.'),
       CA('warning', 'For vector-valued $f$, the MVT equality $f(b)-f(a)=f\'(c)(b-a)$ is false in general (e.g. a circular parametrisation), though the inequality $\|f(b)-f(a)\|\\le\\sup\\|f\'\|\,|b-a|$ holds.', 'Scalar only')],
      [LI(['Where exactly is compactness used in the proof?', 'Why does Rolle need f(a) = f(b)?', 'Can there be several valid points c for one interval?', 'How does the MVT prove that a function with positive derivative is strictly increasing?'])],
      [LI(['OpenStax, Calculus Volume 1, chapter 4: The Mean Value Theorem (open textbook).', 'MIT OpenCourseWare 18.01, the mean value theorem (video course).', 'Next topics: Taylor\'s theorem with remainder and real analysis on compactness.'])],
    ],
  }),

  // ── Integral calculus ─────────────────────────────────────────────────────
  article({
    id: 'definite-integrals', title: 'Definite Integrals', branchId: 'integral-calculus', level: 'Undergraduate 1',
    summary: "The definite integral is the limit of Riemann sums and encodes signed area, accumulated quantity and total change. Its definition is independent of antiderivatives, which the fundamental theorem later connects to it.",
    prerequisites: ['limits', 'continuity'], tags: ['riemann-sum', 'area', 'accumulation', 'partition'],
    simulationId: 'riemann-sums', simCaption: 'Increase the number of subintervals and watch the rectangles converge to the true area.',
    sections: [
      [P("Geometry gives the area of rectangles and triangles, but not the area under a parabola or a sine curve. The definite integral solves this by slicing the region into thin rectangles, summing their areas and refining the slices until the answer stabilises."),
       M(String.raw`\int_a^b f(x)\,dx=\lim_{n\to\infty}\sum_{i=1}^{n} f(x_i^*)\,\Delta x`, "Right-endpoint Riemann sum with Δx = (b−a)/n; any sample point choice works for integrable f.")],
      [P("Each rectangle approximates the curve over a small interval. Making the rectangles thinner reduces the error; in the limit the jagged staircase becomes the exact area. Signed area counts regions below the $x$-axis negatively."),
       CA('intuition', "The integral is a limit of sums, not an antiderivative. Antiderivatives are a computational shortcut supplied by the fundamental theorem; the definition itself is purely about partitions and limits.", 'Sums first, formulas second')],
      [P("For $f(x)=x^2$ on $[0,1]$, right-endpoint sums with $n$ equal slices are $\\frac{1}{n}\\sum_{i=1}^n (i/n)^2$. The rectangles overshoot the curve, and the overshoot shrinks like $1/n$."),
       TB(['n', 'Riemann sum', 'Error vs 1/3'],
         [['10', '0.385000', '0.051667'], ['100', '0.338350', '0.005017'], ['1000', '0.333833', '0.000500']]),
       CA('visual', 'Left endpoints undershoot an increasing function and right endpoints overshoot it; both trap the true integral. For a function changing sign, positive and negative rectangles partially cancel, giving signed area.', 'Trapping the integral')],
      [P("A partition $P=\\{a=x_0<x_1<\\cdots<x_n=b\\}$ has mesh $\\|P\\|=\\max_i (x_i-x_{i-1})$. Choosing sample points $x_i^*\\in[x_{i-1},x_i]$, the Riemann sum is $\\sum f(x_i^*)\\Delta x_i$; $f$ is Riemann integrable on $[a,b]$ if these sums tend to a common limit $I$ as $\\|P\\|\\to0$, regardless of sample choice."),
       M(String.raw`\int_a^b f(x)\,dx = I \iff \forall\varepsilon>0\;\exists\delta>0:\ \|P\|<\delta\Rightarrow\Big|\sum_i f(x_i^*)\Delta x_i-I\Big|<\varepsilon`),
       P("The convention $\\int_b^a f\\,dx=-\\int_a^b f\\,dx$ extends the definition to reversed limits.")],
      [P("We compute $\\int_0^1 x^2\\,dx$ from the definition using summation formulas — no antiderivative is used."),
       ST('Limit of Riemann sums', [
         { title: 'Set up equal subintervals', text: 'Take Δx = 1/n and right endpoints xᵢ = i/n.', math: String.raw`S_n=\sum_{i=1}^{n}\left(\frac{i}{n}\right)^2\frac{1}{n}=\frac{1}{n^3}\sum_{i=1}^{n}i^2` },
         { title: 'Use the sum-of-squares formula', text: 'The exact finite sum is n(n+1)(2n+1)/6.', math: String.raw`S_n=\frac{n(n+1)(2n+1)}{6n^3}=\frac{2n^3+3n^2+n}{6n^3}` },
         { title: 'Take the limit', text: 'Divide through by n³ and let n → ∞.', math: String.raw`\lim_{n\to\infty}S_n=\frac{2}{6}=\frac13=\int_0^1x^2\,dx` },
       ]),
       CA('history', 'Bernhard Riemann formalised the integral in 1854, generalising earlier infinitesimal methods. His definition applies to bounded functions with a set of discontinuities of measure zero, a criterion later clarified by Lebesgue.', 'Riemann and integration')],
      [P('Integrals computed by the definition and by elementary geometry.'),
       M(String.raw`\int_1^2 3x^2\,dx=2^3-1^3=7`, "Checked via the limit of sums; the average height times width is consistent."),
       M(String.raw`\int_0^{\pi}\sin x\,dx=2`, "The signed area of one positive hump of the sine curve."),
       M(String.raw`\int_{-1}^{1}x^3\,dx=0`, "Odd integrand on a symmetric interval: cancellation is exact.")],
      [P('Theorem. Every continuous function on $[a,b]$ is Riemann integrable. Proof sketch: continuity on a compact interval implies uniform continuity, so oscillations over sufficiently fine subintervals are uniformly small, forcing upper and lower sums together.'),
       P('Properties (with integrability hypotheses): $\\int(f+g)=\\int f+\\int g$; $\\int cf=c\\int f$; additivity over adjacent intervals; and monotonicity: if $f\\le g$ on $[a,b]$ then $\\int_a^b f\\le\\int_a^b g$. Each follows by passing the corresponding finite-sum identity to the limit.'),
       M(String.raw`\int_a^b f(x)\,dx=\int_a^c f(x)\,dx+\int_c^b f(x)\,dx`)],
      [P('Numerically refine a Riemann sum and compare with the exact answer.'),
       CO(String.raw`import numpy as np
def right_sum(n, a=0.0, b=1.0, f=lambda x: x**2):
    dx = (b-a)/n
    xs = a + dx*np.arange(1, n+1)
    return dx*np.sum(f(xs))
for n in [10, 100, 1000, 10000]:
    print(n, right_sum(n), right_sum(n)-1/3)`),
       P('The error is approximately $\\frac{1}{2n}$ for this increasing function, matching the observed halving when $n$ doubles.')],
      [P('Integrals accumulate displacement from velocity, total charge from current, work from force, and probability density over an interval. In statistics the integral of a density gives a cumulative distribution function.'),
       LI(['Physics: work $W=\\int F\\,dx$.', 'Economics: total cost from marginal cost.', 'Probability: $P(a\\le X\\le b)=\\int_a^b f_X(x)\\,dx$.'])],
      [P('Errors include using the number of rectangles rather than the mesh as the convergence criterion, mishandling reversed limits, and forgetting that negative regions subtract. A finite Riemann sum with a large $n$ is still an approximation.'),
       CA('warning', "The statement $\\int_0^1 f=0$ does not imply $f=0$; for example $f(x)=x-\\frac12$ integrates to zero over $[0,1]$ but is not identically zero. Signed cancellation is not pointwise equality.", 'Cancellation is not zero')],
      [LI(['Why does the choice of sample point not matter for a continuous function?', 'How is signed area different from geometric area?', 'Can an unbounded function be Riemann integrable on a closed interval?', 'What is the effect of refining a partition on upper and lower sums?'])],
      [LI(['OpenStax, Calculus Volume 2, chapter 2: Definite Integrals (open textbook).', 'MIT OpenCourseWare 18.01, Riemann sums and the definite integral (video course).', 'Next topics: the fundamental theorem of calculus and numerical integration.'])],
    ],
  }),

  article({
    id: 'fundamental-theorem-calculus', title: 'The Fundamental Theorem of Calculus', branchId: 'integral-calculus', level: 'Undergraduate 2',
    summary: "The fundamental theorem connects differentiation and integration: the accumulation function has the integrand as its derivative, and a continuous function's integral equals the difference of any antiderivative's endpoint values.",
    prerequisites: ['definite-integrals', 'derivatives'], tags: ['FTC', 'antiderivative', 'accumulation', 'newton-leibniz'],
    simulationId: 'riemann-sums', simCaption: 'Compare the accumulating area with the antiderivative difference as the partition is refined.',
    sections: [
      [P("Before the fundamental theorem, areas required laborious limiting sums, while derivatives were studied separately. The theorem reveals that the two operations are inverse: differentiating an accumulated area returns the original rate."),
       M(String.raw`\frac{d}{dx}\int_a^x f(t)\,dt=f(x),\qquad \int_a^b f(x)\,dx=F(b)-F(a)`)],
      [P("Define $A(x)$ as the area swept out from $a$ to $x$. Increasing $x$ by a tiny $h$ adds a thin strip of area roughly $f(x)h$, so $\\frac{A(x+h)-A(x)}{h}\\approx f(x)$. The derivative of accumulated area is the current height."),
       CA('intuition', "Part 1 says integration then differentiation returns the function (for continuous $f$). Part 2 says differentiation then integration returns the function up to the constant $F(a)$ — the same inverse relationship in the opposite order.", 'Two inverse statements')],
      [P("Plot $A(x)$ for $f(t)=\\sin t$ on $[0,\\pi]$: $A$ grows while $f>0$, has an inflection where $f$ peaks, and flattens at $\\pi$ where $f=0$. The slope of $A$ at each $x$ is exactly the height of $\\sin x$."),
       LI(['A(x) is increasing where f(x) > 0.', 'A(x) has a local maximum where f changes sign.', 'The graph of A′ is the graph of f.'])],
      [P("Part 1 (FTC I). If $f$ is continuous on $[a,b]$, then $A(x)=\\int_a^x f(t)\\,dt$ is continuous on $[a,b]$ and differentiable on $(a,b)$, with $A\'(x)=f(x)$."),
       M(String.raw`A'(x)=\lim_{h\to0}\frac{1}{h}\int_x^{x+h}f(t)\,dt=f(x)`),
       P("Part 2 (FTC II). If $f$ is continuous on $[a,b]$ and $F\'=f$ on $[a,b]$ (one-sided at endpoints), then $\\int_a^b f=F(b)-F(a)$. Continuity is a hypothesis, not decoration.")],
      [P("Proof of FTC I from the definition of derivative, using continuity to control the average value of $f$ over a shrinking interval."),
       ST('Rigorous proof', [
         { title: 'Rewrite the difference quotient', text: 'Additivity of the integral turns the numerator into an integral over a short interval.', math: String.raw`\frac{A(x+h)-A(x)}{h}=\frac1h\int_x^{x+h}f(t)\,dt` },
         { title: 'Trap the average', text: 'Let mₕ and Mₕ be the minimum and maximum of f on [x, x+h]. The average lies between them.', math: String.raw`m_h\le\frac1h\int_x^{x+h}f(t)\,dt\le M_h` },
         { title: 'Use continuity', text: 'As h → 0 both mₕ and Mₕ tend to f(x), so the average tends to f(x) by squeezing.', math: String.raw`\lim_{h\to0}\frac{A(x+h)-A(x)}{h}=f(x)` },
         { title: 'Deduce FTC II', text: 'A and F have the same derivative, so A−F is constant; evaluating at a gives the constant −F(a), hence A(b)=F(b)−F(a).', math: String.raw`\int_a^b f(t)\,dt=A(b)=F(b)-F(a)` },
       ]),
       CA('warning', 'If $f$ has a jump at $c$, then $A(x)=\\int_a^x f$ is still continuous but is not differentiable at $c$: the left derivative is $f(c^-)$ and the right derivative is $f(c^+)$. Continuity of $f$ is exactly what makes $A\'(x)=f(x)$ hold at every point.', 'Continuity is essential')],
      [P('Applications with explicit endpoint arithmetic.'),
       M(String.raw`\int_0^1 x^2\,dx=\left[\frac{x^3}{3}\right]_0^1=\frac13-0=\frac13`),
       M(String.raw`\int_0^{\pi}\sin x\,dx=[-\cos x]_0^{\pi}=(-\cos\pi)-(-\cos0)=1+1=2`),
       M(String.raw`\int_1^e \frac{dx}{x}=[\ln x]_1^e=1-0=1`)],
      [P('Theorem (change of variables, statement). If $g$ is continuously differentiable on $[c,d]$ and $f$ is continuous on the image of $g$, then $\\int_c^d f(g(u))g\'(u)\\,du=\\int_{g(c)}^{g(d)} f(x)\\,dx$. Proof sketch: both sides have the same derivative with respect to the upper limit and agree at $u=c$.'),
       P(String.raw`Corollary (integration by parts) follows from the product rule and FTC II: $\int_a^b u v'=[uv]_a^b-\int_a^b u'v$.`)],
      [P('Verify the theorem symbolically and numerically for $f(x)=x^2$ on $[0,1]$.'),
       CO(String.raw`import sympy as sp
import numpy as np
x = sp.symbols('x')
F = x**3/3
print(sp.integrate(x**2, (x, 0, 1)), F.subs(x,1)-F.subs(x,0))   # 1/3 1/3
t = sp.Symbol('t')
A = sp.integrate(sp.sin(t), (t, 0, x))
print(sp.simplify(sp.diff(A, x)))                              # sin(x)
grid = np.linspace(0, np.pi, 1000)
print(np.trapz(np.sin(grid), grid))                            # ≈ 2`),
       P('The trapezoidal approximation approaches $2$ as the mesh refines, matching $[-\\cos x]_0^\\pi=2$.')],
      [P('The theorem makes the computation of work, displacement, mass and probability practical: once an antiderivative is known, no limiting sums are needed. It is the structural reason that differential equations can be solved by integrating rates.'),
       LI(['Kinematics: displacement = integral of velocity.', 'Electrical engineering: charge = integral of current.', 'Statistics: CDF = integral of a density.'])],
      [P('Mistakes include forgetting that the constant of integration cancels in $F(b)-F(a)$, using an antiderivative on an interval where $f$ is not continuous, and ignoring the chain rule when the upper limit is a function of $x$.'),
       CA('warning', "For $\\int_{-1}^{1}\\frac{dx}{x^2}$ the antiderivative $-1/x$ gives $-1-1=-2$, an impossible result for a positive integrand. The theorem's hypotheses fail at $x=0$: this is a divergent improper integral.", 'Check continuity first')],
      [LI(['Why does differentiating an accumulation function recover the integrand?', 'Where does the theorem use the mean value theorem?', 'How do variable limits change the derivative of an integral?', 'What breaks when f has a jump discontinuity?'])],
      [LI(['OpenStax, Calculus Volume 2, chapter 4: The Fundamental Theorem of Calculus (open textbook).', 'MIT OpenCourseWare 18.01, the fundamental theorem (video course).', 'Next topics: improper integrals and measure-theoretic integration.'])],
    ],
  }),

  article({
    id: 'integration-by-parts', title: 'Integration by Parts', branchId: 'integral-calculus', level: 'Undergraduate 1',
    summary: "Integration by parts reverses the product rule, transforming the integral of a product into a usually simpler integral. It is essential for logarithms, inverse trigonometric functions and repeated reductions.",
    prerequisites: ['derivatives', 'definite-integrals'], tags: ['product-rule', 'technique', 'reduction', 'LIATE'],
    sections: [
      [P("Products such as $xe^x$ or $x\\ln x$ are not handled by substitution, yet they arise constantly. Integration by parts trades one product for another integral that is often simpler, by undoing the differentiation of a product."),
       M(String.raw`\int_a^b u(x)\,v'(x)\,dx=\big[u(x)v(x)\big]_a^b-\int_a^b u'(x)\,v(x)\,dx`)],
      [P("Think of moving the derivative from one factor to the other. The boundary term $[uv]$ pays for the transfer; the goal is to choose $u$ so that differentiating it simplifies the integrand, and $v\'$ so that integrating it stays manageable."),
       CA('intuition', "The LIATE ordering (logarithmic, inverse trig, algebraic, trigonometric, exponential) is a heuristic for choosing $u$, not a theorem. It usually differentiates the factor that simplifies fastest.", 'A heuristic, not a rule')],
      [P("For $\\int_0^1 x e^x\\,dx$, take $u=x$ and $dv=e^x dx$. The boundary term is $e$ and the remaining integral is $\\int_0^1 e^x dx=e-1$, so the answer is $1$."),
       TB(['Choice', 'u', "dv", 'du', 'v'],
         [['Good', 'x', 'eˣ dx', 'dx', 'eˣ'], ['Poor', 'eˣ', 'x dx', 'eˣ dx', 'x²/2 (worse)']]),
       CA('visual', 'Geometrically, the formula splits the area under a product curve into a rectangle-like boundary contribution and a residual area under the swapped derivative product.', 'Area redistribution')],
      [P("Let $u$ and $v$ be continuously differentiable on $[a,b]$. Then $(uv)\\'=u\\'v+uv\\'$; integrating both sides and rearranging gives the formula. For indefinite integrals one writes $\\int u\\,dv=uv-\\int v\\,du+C$."),
       M(String.raw`(uv)'=u'v+uv'\ \Longrightarrow\ \int u v'=uv-\int u' v`)],
      [P('Derivation of the definite formula with the boundary term made explicit.'),
       ST('From product rule to integration by parts', [
         { title: 'Start from the product rule', text: 'Both u and v must be differentiable on the interval so the product rule applies.', math: String.raw`\frac{d}{dx}\big(u(x)v(x)\big)=u'(x)v(x)+u(x)v'(x)` },
         { title: 'Integrate over [a,b]', text: 'Apply the fundamental theorem to the left-hand side.', math: String.raw`u(b)v(b)-u(a)v(a)=\int_a^b u'v\,dx+\int_a^b uv'\,dx` },
         { title: 'Rearrange', text: 'Isolate the desired integral; the boundary term appears with a plus sign.', math: String.raw`\int_a^b u v'\,dx=[uv]_a^b-\int_a^b u'v\,dx` },
       ]),
       CA('warning', 'A sign error in $[uv]_a^b$ or forgetting the differential in $du$ and $dv$ is the most common failure. Also beware choices that return the original integral with the same coefficient, which solves to $0=0$ and gives no information.', 'Sign and bookkeeping')],
      [P('Three complete computations, including an improper integral.'),
       M(String.raw`\int_0^1 x e^x\,dx=[xe^x]_0^1-\int_0^1e^x\,dx=e-(e-1)=1`),
       M(String.raw`\int_0^1\ln x\,dx=\lim_{t\to0^+}\big([x\ln x]_t^1-\int_t^1 dx\big)=0-1=-1`),
       M(String.raw`\int x\cos x\,dx=x\sin x+\cos x+C`)],
      [P('Theorem (repeated integration by parts). For a polynomial $p$ of degree $n$ and a factor $v\'$ whose antiderivatives cycle (such as $\\sin$, $\\cos$, $e^x$), applying the formula $n$ times reduces $\\int p(x)v\'(x)dx$ to a single integral. Proof: induction on $n$, since each application reduces $\\deg p$ by one.'),
       P('Reduction formulas, e.g. $\\int \\sin^n x\\,dx=-\\frac{\\sin^{n-1}x\\cos x}{n}+\\frac{n-1}{n}\\int\\sin^{n-2}x\\,dx$ for $n\\ge2$, are obtained the same way.')],
      [P('Check the symbolic result against numerical quadrature.'),
       CO(String.raw`import sympy as sp
from scipy.integrate import quad
import numpy as np
x = sp.symbols('x')
expr = x*sp.exp(x)
print(sp.integrate(expr, (x, 0, 1)))                    # 1
print(quad(lambda t: t*np.exp(t), 0, 1)[0])            # 1.0
print(sp.integrate(sp.log(x), (x, 0, 1)))              # -1`),
       P('Both the exact antiderivative evaluation and numerical quadrature return $1$; the improper logarithmic integral returns $-1$.')],
      [P('Integration by parts computes expected values $E[X]=\\int x f(x)dx$, Fourier coefficients $\\int f(x)\\cos(nx)dx$, and solves differential equations such as $y\'+y=x$ after multiplying by an integrating factor.'),
       LI(['Probability: moments from a density.', 'Signal processing: Fourier transform derivations.', 'Physics: work integrals with position-dependent forces.'])],
      [P('Mistakes include choosing $u$ and $dv$ so that the new integral is harder, omitting the integration constant for indefinite integrals, and applying the formula across a singularity where $u$ or $v$ is not differentiable.'),
       CA('warning', 'In $\\int_0^1\\ln x\\,dx$ the term $x\\ln x$ must be interpreted as a limit at $0$; $0\\cdot(-\\infty)$ is not a number. The limit $x\\ln x\\to0$ as $x\\to0^+$ makes the computation valid.', 'Improper endpoints')],
      [LI(['How is integration by parts related to the product rule?', 'When would you choose u to be the exponential factor?', 'Why can repeated integration by parts terminate for polynomials?', 'What does the boundary term represent geometrically?'])],
      [LI(['OpenStax, Calculus Volume 2, chapter 3: Integration by Parts (open textbook).', 'MIT OpenCourseWare 18.01, techniques of integration (video course).', 'Next topics: partial fractions and Fourier analysis.'])],
    ],
  }),

  article({
    id: 'partial-fractions', title: 'Partial Fractions', branchId: 'integral-calculus', level: 'Undergraduate 1',
    summary: "Partial fractions decompose a rational function into a sum of elementary terms with linear or irreducible quadratic denominators. This reduces rational-function integrals to logarithms and arctangents.",
    prerequisites: ['definite-integrals', 'integration-by-parts'], tags: ['rational-function', 'decomposition', 'residue', 'integration'],
    sections: [
      [P("Integrating $\\frac{1}{x^2-1}$ directly is not obvious, but the identity $\\frac{1}{x^2-1}=\\frac{1}{2}\\bigl(\\frac{1}{x-1}-\\frac{1}{x+1}\\bigr)$ turns it into two logarithms. Partial fractions systematises this decomposition for every rational function."),
       M(String.raw`\frac{P(x)}{Q(x)}=\sum_{\text{linear factors}}\frac{A}{(x-r)^k}+\sum_{\text{quadratics}}\frac{Bx+C}{(q(x))^k}`)],
      [P("The method mirrors integer factorisation: break a complicated denominator into prime factors, then express the original fraction as a combination of simple fractions whose denominators are those factors. Clearing denominators turns the problem into linear algebra."),
       CA('intuition', "Each pole contributes its own simple term. Near a simple pole $r$, the rational function behaves like $\\frac{A}{x-r}$, and $A$ is exactly the coefficient that a cover-up evaluation extracts.", 'Each pole contributes a term')],
      [P("Factor first. Distinct linear factors give terms $A/(x-r)$; a repeated factor $(x-r)^m$ gives $m$ terms; an irreducible quadratic $ax^2+bx+c$ gives $(Bx+C)/(ax^2+bx+c)$."),
       TB(['Denominator type', 'Required terms', 'Integral produces'],
         [['(x−r)', 'A/(x−r)', 'A ln|x−r|'],
          ['(x−r)²', 'A/(x−r) + B/(x−r)²', 'A ln|x−r| − B/(x−r)'],
          ['irreducible quadratic', '(Bx+C)/(ax²+bx+c)', 'log plus arctan']])],
      [P("A rational function is proper when $\\deg P<\\deg Q$; if not, polynomial long division first extracts a polynomial plus a proper remainder. Over $\\mathbb{R}$ every polynomial factors into linear and irreducible quadratic factors."),
       M(String.raw`\frac{P}{Q}=S+\frac{R}{Q},\qquad \deg R<\deg Q`)],
      [P("We derive the decomposition of $\\frac{1}{x^2-1}$ and generalise the coefficient formula (the cover-up method)."),
       ST('Cover-up derivation', [
         { title: 'Factor the denominator', text: 'The denominator splits into two distinct real linear factors.', math: String.raw`x^2-1=(x-1)(x+1)` },
         { title: 'Postulate the form and clear denominators', text: 'Unknown coefficients A and B are determined by an identity valid for all x.', math: String.raw`\frac{1}{(x-1)(x+1)}=\frac{A}{x-1}+\frac{B}{x+1}\Rightarrow 1=A(x+1)+B(x-1)` },
         { title: 'Evaluate at the poles', text: 'Set x = 1 to isolate A and x = −1 to isolate B.', math: String.raw`x=1:\ 1=2A\Rightarrow A=\tfrac12;\qquad x=-1:\ 1=-2B\Rightarrow B=-\tfrac12` },
         { title: 'General cover-up formula', text: 'For a simple root r of Q, multiplying by (x−r) and setting x = r gives A = P(r)/Q′(r).', math: String.raw`A=\lim_{x\to r}(x-r)\frac{P(x)}{Q(x)}=\frac{P(r)}{Q'(r)}` },
       ]),
       CA('warning', 'The cover-up formula assumes a *simple* root. For repeated factors you must include all powers and either equate coefficients or differentiate.', 'Repeated roots need more work')],
      [P('Worked decompositions with verified coefficients.'),
       M(String.raw`\frac{1}{x^2-1}=\frac{1/2}{x-1}-\frac{1/2}{x+1}\Rightarrow\int\frac{dx}{x^2-1}=\frac12\ln\left|\frac{x-1}{x+1}\right|+C`),
       M(String.raw`\frac{2x+3}{x^2+x-2}=\frac{5/3}{x-1}+\frac{1/3}{x+2}`),
       P('Check the second identity at $x=0$: the left side is $3/(-2)=-1.5$; the right side is $-\\frac{5}{3}+\\frac{1}{6}=-1.5$. The numerator check is $\\frac{5(x+2)+(x-1)}{3}=2x+3$.')],
      [P('Theorem (existence and uniqueness). If $P/Q$ is proper with $\\deg Q=n$ and $Q$ factors over $\\mathbb{R}$ as specified, then a partial fraction decomposition exists and the coefficients are unique. Proof sketch: clearing denominators yields $n$ independent linear equations in $n$ unknowns; the homogeneous system has only the zero solution because a rational function with zero numerator is zero.'),
       P('For irreducible quadratics, completing the square gives $\\int\\frac{dx}{(x+h)^2+a^2}=\\frac1a\\arctan\\frac{x+h}{a}$; the linear numerator splits into a logarithmic derivative plus an arctangent term.')],
      [P('Verify the decomposition symbolically and numerically.'),
       CO(String.raw`import sympy as sp
x = sp.symbols('x')
f = (2*x+3)/(x**2+x-2)
print(sp.apart(f, x))                     # 1/(3*(x+2)) + 5/(3*(x-1))
print(sp.simplify(f - (sp.Rational(5,3)/(x-1)+sp.Rational(1,3)/(x+2))))  # 0
print(sp.integrate(1/(x**2-1), x))        # log(x-1)/2 - log(x+1)/2`),
       P('SymPy returns exactly the hand-computed coefficients.')],
      [P('Partial fractions evaluate integrals of rational functions, invert Laplace transforms in control theory, and decompose transfer functions into sums of simple pole responses. They also provide a route to summing certain rational series.'),
       LI(['Control systems: impulse response from a transfer function.', 'Probability: integrating rational densities.', 'Signal processing: partial-fraction expansion of z-transforms.'])],
      [P('Errors include skipping long division for improper fractions, using linear numerators for linear factors, forgetting absolute values in logarithms, and mishandling repeated factors by assigning too few terms.'),
       CA('warning', '$\\int\\frac{dx}{x}=\\ln|x|+C$, not $\\ln x+C$, when the domain includes negative $x$. Omitting the absolute value produces an undefined expression on part of the domain.', 'Absolute values in logs')],
      [LI(['Why must we divide before decomposing an improper fraction?', 'How many coefficients does a repeated factor of multiplicity m contribute?', 'Why do irreducible quadratics need a linear numerator?', 'What is the link between cover-up coefficients and derivatives of the denominator?'])],
      [LI(['OpenStax, Calculus Volume 2, chapter 3: Partial Fractions (open textbook).', 'MIT OpenCourseWare 18.01, rational functions and partial fractions (video course).', 'Next topics: complex residues and Laplace transforms.'])],
    ],
  }),

  // ── Multivariable and vector calculus ─────────────────────────────────────
  article({
    id: 'multivariable-functions', title: 'Multivariable Functions', branchId: 'multivariable-calculus', level: 'Undergraduate 2',
    summary: "Functions of several variables map points in Rⁿ to numbers, producing surfaces and level sets rather than curves. Their limits must hold along every path, which makes continuity subtler than in one dimension.",
    prerequisites: ['limits', 'continuity'], tags: ['surface', 'domain', 'level-set', 'path-limit'],
    simulationId: 'surface-plot', simCaption: 'Rotate the surface z = f(x,y) and inspect its contour projection.',
    sections: [
      [P("Temperature depends on position and time; a manufacturer's cost depends on labour and materials. Single-variable calculus cannot describe these situations, so we study functions $f:D\\subseteq\\mathbb{R}^n\\to\\mathbb{R}$ and the geometry of their graphs."),
       M(String.raw`f:\ D\subseteq\mathbb{R}^n\to\mathbb{R},\qquad (x_1,\dots,x_n)\mapsto f(x_1,\dots,x_n)`)],
      [P("In two variables the graph is a surface in $\\mathbb{R}^3$; level curves are the contours you see on a topographic map. Near a point the surface looks like a plane whose tilt is encoded by partial derivatives, generalising the tangent line."),
       CA('intuition', "A multivariable limit must be the same along every approach path. Checking a few straight lines is not enough: functions can agree along every line through the origin and still fail to have a limit.", 'All paths, not a few')],
      [P("The paraboloid $z=x^2+y^2$ has circular level sets and a minimum at the origin; the saddle $z=x^2-y^2$ has hyperbolic level sets and a stationary point that is neither maximum nor minimum."),
       TB(['Function', 'Surface', 'Level sets', 'Behaviour at origin'],
         [['x² + y²', 'upward paraboloid', 'circles', 'minimum'],
          ['x² − y²', 'saddle', 'hyperbolas', 'neither'],
          ['−(x² + y²)', 'downward paraboloid', 'circles', 'maximum']]),
       CA('visual', "Contour lines crowded together indicate a steep gradient; widely spaced contours indicate a gentle slope. A closed contour with increasing values inward signals a local extremum.", 'Reading contours')],
      [P("The domain $D$ is the set where the formula is defined and the range is the set of attained values. The graph is $\\{(x_1,\\ldots,x_n,f(x_1,\\ldots,x_n))\\}$; the level set at height $c$ is $\\{\\mathbf{x}\\in D: f(\\mathbf{x})=c\\}$."),
       M(String.raw`\lim_{\mathbf{x}\to\mathbf{a}}f(\mathbf{x})=L\iff\forall\varepsilon>0\ \exists\delta>0:\ \|\mathbf{x}-\mathbf{a}\|<\delta\Rightarrow|f(\mathbf{x})-L|<\varepsilon`)],
      [P("We show that $f(x,y)=\\frac{x^2-y^2}{x^2+y^2}$ has no limit at $(0,0)$ by comparing paths — a genuine disproof by path dependence."),
       ST('Path-dependent limit', [
         { title: 'Approach along the x-axis', text: 'Put y = 0 and let x → 0; the expression is identically 1.', math: String.raw`f(x,0)=\frac{x^2}{x^2}=1\quad(x\neq0)` },
         { title: 'Approach along the diagonal', text: 'Put y = x and let x → 0; the expression is identically 0.', math: String.raw`f(x,x)=\frac{x^2-x^2}{2x^2}=0` },
         { title: 'Conclude', text: 'Two paths give different limiting values, so the two-variable limit does not exist.', math: String.raw`\lim_{(x,y)\to(0,0)}f(x,y)\ \text{does not exist}` },
       ]),
       CA('warning', 'Even agreement along every straight line is insufficient: $g(x,y)=\\frac{x^2y}{x^4+y^2}$ tends to $0$ along every line $y=mx$ but tends to $1/2$ along the parabola $y=x^2$.', 'Straight lines can deceive')],
      [P('Worked evaluations with explicit numbers.'),
       M(String.raw`f(x,y)=x^2+2y^2\ \Rightarrow\ f(1,2)=1+8=9`),
       P("The domain of $h(x,y)=\\sqrt{1-x^2-y^2}$ is the closed unit disk $\\{(x,y):x^2+y^2\\le1\\}$, since the radicand must be nonnegative."),
       M(String.raw`\lim_{(x,y)\to(0,0)}(x^2+y^2)=0`, "Justified by the bound 0 ≤ x² + y² and the squeeze theorem.")],
      [P('Theorem. If $f$ is continuous at $\\mathbf{a}\\in\\mathbb{R}^n$ and $g:\\mathbb{R}\\to\\mathbb{R}$ is continuous at $f(\\mathbf{a})$, then $g\\circ f$ is continuous at $\\mathbf{a}$. Proof sketch: compose the two epsilon-delta conditions.'),
       P('Extreme value theorem in $\\mathbb{R}^n$: a continuous function on a compact (closed and bounded) domain attains its maximum and minimum. Proof sketch: the image of a compact set under a continuous map is compact, hence closed and bounded.'),
       CA('warning', 'Existence of all partial derivatives at a point does not imply continuity there. Differentiability (a linear approximation with small error) is the correct strengthening; the chain rule later relies on it.')],
      [P('Sample a surface on a grid and inspect its values near the origin.'),
       CO(String.raw`import numpy as np
xs = np.linspace(-1, 1, 5)
Y, X = np.meshgrid(xs, xs)
print(X)
print(X**2 + 2*Y**2)
# path dependence of (x^2-y^2)/(x^2+y^2)
for x in [0.1, 0.01, 0.001]:
    print(x, (x**2-0)/(x**2+0), (x**2-x**2)/(x**2+x**2))  # 1 and 0`),
       P('The grid makes the surface structure explicit; the two printed columns approach $1$ and $0$, confirming the failed limit.')],
      [P('Multivariable functions model temperature and pressure fields, terrain elevation, utility functions in economics, and loss surfaces in machine learning whose dimensions equal the number of model parameters.'),
       LI(['Geographic information systems: elevation as f(latitude, longitude).', 'Physics: potential fields in three dimensions.', 'Machine learning: loss as a function of weights.'])],
      [P('Common mistakes include assuming that checking paths proves a limit exists (it only disproves), ignoring domain restrictions such as square roots and denominators, and confusing partial derivatives with full differentiability.'),
       CA('warning', 'A limit along a path can exist for every line and still fail; conversely, proving existence requires an $\\varepsilon$–$\\delta$ estimate or a squeeze bound valid for *all* nearby points.', 'Existence needs a uniform bound')],
      [LI(['Why is the domain part of the definition of a multivariable function?', 'How many paths must agree before a limit exists?', 'What is the difference between a graph and a level set?', 'Why does compactness guarantee extrema?'])],
      [LI(['OpenStax, Calculus Volume 3, chapter 2: Functions of Several Variables (open textbook).', 'MIT OpenCourseWare 18.02, multivariable calculus (video course).', 'Next topics: partial derivatives, gradient, and differentiability in analysis.'])],
    ],
  }),

  article({
    id: 'gradient', title: 'The Gradient', branchId: 'multivariable-calculus', level: 'Undergraduate 2',
    summary: "The gradient collects all first partial derivatives of a scalar function into a vector pointing in the direction of steepest increase, with magnitude equal to the maximum rate of change.",
    prerequisites: ['multivariable-functions', 'derivatives'], tags: ['gradient', 'directional-derivative', 'level-set', 'steepest-ascent'],
    simulationId: 'gradient-field', simCaption: 'Explore the gradient field of a surface and its orthogonality to contour lines.',
    sections: [
      [P("In one dimension the derivative is a single slope. In several dimensions there are many possible directions of change, so we need a vector that encodes the slope in every direction at once — the gradient."),
       M(String.raw`\nabla f(\mathbf{a})=\left(\frac{\partial f}{\partial x_1}(\mathbf{a}),\dots,\frac{\partial f}{\partial x_n}(\mathbf{a})\right)`)],
      [P("Walk uphill on a hill: the steepest direction is perpendicular to the contour line passing through your feet. The gradient is the arrow that points straight up the slope, and its length tells you how steep that slope is."),
       CA('visual', 'On a contour map, gradients cross level curves at right angles, pointing toward higher values. Where contours are packed tightly, the gradient vector is long.', 'Contours and arrows')],
      [P("For $f(x,y)=x^2+y^2$ the level sets are circles and $\\nabla f=(2x,2y)$ points radially outward; at $(1,2)$ the gradient is $(2,4)$. The direction of steepest ascent is $(2,4)/\\sqrt{20}$, and the maximum rate is $\\sqrt{20}=2\\sqrt5\\approx4.4721$."),
       LI(['Parallel to a level curve: rate of change is zero.', 'Perpendicular to level curves: rate is maximal.', 'Opposite the gradient: steepest descent.'])],
      [P("The directional derivative of $f$ at $\\mathbf{a}$ in a unit direction $\\mathbf{u}$ is $D_{\\mathbf{u}}f(\\mathbf{a})=\\lim_{t\\to0}\\frac{f(\\mathbf{a}+t\\mathbf{u})-f(\\mathbf{a})}{t}$. When $f$ is differentiable at $\\mathbf{a}$, $D_{\\mathbf{u}}f(\\mathbf{a})=\\nabla f(\\mathbf{a})\\cdot\\mathbf{u}$."),
       M(String.raw`D_{\mathbf{u}}f=\nabla f\cdot\mathbf{u}=\|\nabla f\|\,\|\mathbf{u}\|\cos\theta`)],
      [P("Derive the directional-derivative formula from the one-variable chain rule and identify the steepest direction using Cauchy–Schwarz."),
       ST('First-principles derivation', [
         { title: 'Restrict to a line', text: 'Define g(t) = f(a + tu); then the directional derivative is g′(0).', math: String.raw`g(t)=f(a_1+tu_1,\dots,a_n+tu_n)` },
         { title: 'Apply the chain rule', text: 'Differentiability of f at a makes the multicomponent chain rule valid.', math: String.raw`g'(0)=\sum_{i=1}^n\frac{\partial f}{\partial x_i}(a)\,u_i=\nabla f(a)\cdot u` },
         { title: 'Maximise over unit directions', text: 'By Cauchy–Schwarz the dot product is at most ‖∇f‖, with equality when u points along ∇f.', math: String.raw`\max_{\|u\|=1}D_u f=\|\nabla f\|,\qquad u^*=\frac{\nabla f}{\|\nabla f\|}` },
         { title: 'Orthogonality to level sets', text: 'A tangent v to a level curve satisfies f(a+tv) = const, so ∇f·v = 0.', math: String.raw`\nabla f\cdot v=0` },
       ]),
       CA('warning', 'The formula $D_{\\mathbf{u}}f=\\nabla f\\cdot\\mathbf{u}$ requires differentiability, not merely the existence of partial derivatives. If $\\nabla f=0$, the steepest-ascent direction is undefined and every directional derivative is zero.')],
      [P('Worked computations with unit vectors and numbers.'),
       M(String.raw`f(x,y)=x^2+y^2:\quad \nabla f(1,2)=(2,4),\quad D_{(3/5,\,4/5)}f=\frac{6+16}{5}=\frac{22}{5}=4.4`),
       M(String.raw`f(x,y)=xy:\quad \nabla f(1,1)=(1,1),\quad \max D_u f=\sqrt2\approx1.4142`),
       P('For $f(x,y,z)=x^2+yz$ at $(1,2,3)$ we get $\\nabla f=(2x,z,y)=(2,3,2)$ and $\\|\\nabla f\\|=\\sqrt{17}\\approx4.1231$.')],
      [P('Theorem (interior extremum, first order). If $f$ is differentiable on an open set and has a local extremum at $\\mathbf{a}$, then $\\nabla f(\\mathbf{a})=\\mathbf{0}$. Proof sketch: apply the one-variable Fermat theorem along each coordinate direction.'),
       P('Theorem (second-order test in two variables, statement). With $D=f_{xx}f_{yy}-f_{xy}^2$ at a critical point: $D>0$ and $f_{xx}>0$ gives a local minimum; $D>0$ and $f_{xx}<0$ a maximum; $D<0$ a saddle; $D=0$ inconclusive. Proof sketch: diagonalise the Hessian quadratic form (see the spectral theorem).')],
      [P('Compute gradients symbolically and check the dot product numerically.'),
       CO(String.raw`import sympy as sp
import numpy as np
x, y = sp.symbols('x y')
f = x**2 + y**2
grad = [sp.diff(f, v) for v in (x, y)]
print(grad, [g.subs({x:1, y:2}) for g in grad])        # [2*x,2*y], [2,4]
u = np.array([3/5, 4/5])
g = np.array([2.0, 4.0])
print(float(g @ u), np.linalg.norm(g))                 # 4.4, 4.4721...`),
       P('The numerical directional derivative $4.4$ is less than the maximum rate $2\\sqrt5\\approx4.4721$, as Cauchy–Schwarz predicts.')],
      [P('Gradients drive gradient descent in machine learning, describe conservative forces via $\\mathbf{F}=-\\nabla U$ in physics, detect edges in images through spatial intensity changes, and guide optimisation in engineering design.'),
       LI(['Optimisation: iterative descent steps −η∇f.', 'Electrostatics: electric field as the negative gradient of potential.', 'Computer vision: image gradients for edge detection.'])],
      [P('Mistakes include forgetting to normalise the direction vector, assuming the gradient points downhill, and applying the dot-product formula when $f$ is not differentiable at the point.'),
       CA('warning', "For a direction $\\mathbf{v}=(3,4)$ one must use $\\mathbf{u}=\\mathbf{v}/5$; using $\\mathbf{v}$ directly gives $22$ instead of $22/5$. Direction derivatives assume a unit vector.", 'Normalise the direction')],
      [LI(['Why is the gradient perpendicular to level sets?', 'What does the magnitude of the gradient measure?', 'When can all directional derivatives exist but the gradient formula fail?', 'How is steepest descent related to steepest ascent?'])],
      [LI(['OpenStax, Calculus Volume 3, chapter 4: Directional Derivatives and the Gradient (open textbook).', 'MIT OpenCourseWare 18.02, gradients and level sets (video course).', 'Next topics: Hessian matrices, Lagrange multipliers and convex optimisation.'])],
    ],
  }),

  article({
    id: 'greens-theorem', title: "Green's Theorem", branchId: 'multivariable-calculus', level: 'Undergraduate 3',
    summary: "Green's theorem converts a line integral around a positively oriented simple closed curve into a double integral of the curl over the enclosed region. It is the two-dimensional ancestor of Stokes' theorem.",
    prerequisites: ['definite-integrals', 'multivariable-functions'], tags: ['line-integral', 'curl', 'orientation', 'planimeter'],
    sections: [
      [P("Computing the circulation of a vector field around an irregular closed loop directly requires a parametrisation of the boundary. Green's theorem replaces that with an area integral of a local quantity, the two-dimensional curl $\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}$."),
       M(String.raw`\oint_C\big(P\,dx+Q\,dy\big)=\iint_D\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)dA`)],
      [P("Curl measures local spinning: tiny paddles placed in the field rotate at a rate given by $\\partial_x Q-\\partial_y P$. Adding up all the tiny rotations inside a region leaves only the circulation around its boundary, because rotations of adjacent paddles cancel along shared edges."),
       CA('intuition', 'Internal cancellation is the whole idea: adjacent little loops share edges traversed in opposite directions, so only the outer boundary survives. This is the same mechanism behind Stokes and divergence theorems in higher dimensions.', 'Cancellation of interior edges')],
      [P("The curve $C$ must be traversed counterclockwise (positive orientation) so that the region stays on the left. Reversing the direction flips the sign of the line integral."),
       LI(['Positive orientation: counterclockwise around D.', 'Negative orientation: clockwise, giving the negative of the formula.', 'Simple closed curve: no self-intersections.', 'Piecewise smooth: finitely many smooth arcs.'])],
      [P("Let $C$ be a positively oriented, piecewise smooth, simple closed curve bounding a region $D$, and let $P,Q$ have continuous partial derivatives on an open set containing $D$. Then $\\oint_C P\\,dx+Q\\,dy=\\iint_D (Q_x-P_y)\\,dA$."),
       M(String.raw`\oint_C P\,dx=-\iint_D P_y\,dA,\qquad \oint_C Q\,dy=\iint_D Q_x\,dA`)],
      [P("Proof sketch for a region that is both vertically and horizontally simple. We prove the $P$-part and obtain the $Q$-part by symmetry; this is a proof sketch because general regions require decomposition into such pieces."),
       ST('Proof sketch by iterated integrals', [
         { title: 'Write the double integral for −P_y', text: 'For a vertically simple region with y between y₁(x) and y₂(x), integrate in y first.', math: String.raw`-\iint_D P_y\,dA=\int_a^b\Big[P(x,y_1(x))-P(x,y_2(x))\Big]dx` },
         { title: 'Compare with the boundary integral', text: 'On the lower curve the boundary is traversed from a to b; on the upper curve from b to a, so the two line contributions have opposite signs.', math: String.raw`\oint_C P\,dx=\int_a^b P(x,y_1(x))dx+\int_b^a P(x,y_2(x))dx` },
         { title: 'Handle Q_x analogously', text: 'Use a horizontally simple description and integrate with respect to x first.', math: String.raw`\oint_C Q\,dy=\iint_D Q_x\,dA` },
         { title: 'Add the two parts', text: 'The sum gives the stated identity.', math: String.raw`\oint_C P\,dx+Q\,dy=\iint_D(Q_x-P_y)\,dA` },
       ]),
       CA('warning', "The hypotheses fail for $P=-\\frac{y}{x^2+y^2}$, $Q=\\frac{x}{x^2+y^2}$ on any region containing the origin: the partial derivatives are not continuous at $(0,0)$. Around the unit circle the line integral is $2\\pi$ although the curl integral over the punctured disk is $0$.", 'Singularities invalidate the theorem')],
      [P('Area computations with explicit parametrisation of the unit circle $x=\\cos t$, $y=\\sin t$, $0\\le t\\le2\\pi$.'),
       M(String.raw`\oint_C x\,dy=\int_0^{2\pi}\cos t\cdot\cos t\,dt=\pi=\text{Area}(D)`),
       M(String.raw`\oint_C(x\,dy-y\,dx)=\int_0^{2\pi}1\,dt=2\pi=2\,\text{Area}(D)`),
       P('The second identity is the planimeter formula: a mechanical device measuring a line integral reads off the enclosed area.')],
      [P('Theorem (normal/divergence form, statement). For the same hypotheses, $\\oint_C \\mathbf{F}\\cdot\\mathbf{n}\\,ds=\\iint_D \\nabla\\cdot\\mathbf{F}\\,dA$, obtained by applying Green\'s theorem to $(-Q,P)$. This is the two-dimensional divergence theorem.'),
       P('Green\'s theorem is the $n=2$ case of Stokes\' theorem $\\oint_{\\partial S}\\mathbf{F}\\cdot d\\mathbf{r}=\\iint_S(\\nabla\\times\\mathbf{F})\\cdot\\mathbf{n}\\,dS$ for a surface in $\\mathbb{R}^3$.')],
      [P('Approximate the boundary integral numerically for the unit circle and compare with $\\pi$.'),
       CO(String.raw`import numpy as np
N = 10000
t = np.linspace(0, 2*np.pi, N, endpoint=False)
x, y = np.cos(t), np.sin(t)
dt = 2*np.pi/N
line = np.sum(x*np.cos(t))*dt        # integral of x dy
print(line, np.pi, line-np.pi)
# curl form with P=0, Q=x gives integrand 1 over the disk
print(np.pi)`),
       P('The discrete line integral approaches $\\pi$ with error $O(1/N^2)$ for this smooth periodic integrand.')],
      [P('Green\'s theorem computes areas of irregular regions, fluid circulation around obstacles, electromagnetic flux in two-dimensional models, and underlies the operation of the planimeter.'),
       LI(['Surveying: area from boundary measurements.', 'Fluid dynamics: circulation and vorticity.', 'Electromagnetism: two-dimensional flux computations.'])],
      [P('Mistakes include reversing orientation without changing the sign, applying the theorem across a singularity, and confusing the scalar curl $Q_x-P_y$ with the divergence $P_x+Q_y$.'),
       CA('warning', "For a region with a hole, the boundary consists of an outer counterclockwise curve and inner clockwise curves. Ignoring the inner orientation gives the wrong answer.", 'Orient every boundary component')],
      [LI(['Why do interior edges cancel in the proof?', 'What does the scalar curl measure physically?', 'Why is positive orientation counterclockwise?', 'What goes wrong when the field is singular inside D?'])],
      [LI(['OpenStax, Calculus Volume 3, chapter 6: Green\'s Theorem (open textbook).', 'MIT OpenCourseWare 18.02, line integrals and Green\'s theorem (video course).', 'Next topics: Stokes\' theorem, divergence theorem and differential forms.'])],
    ],
  }),

  // ── Linear algebra ────────────────────────────────────────────────────────
  article({
    id: 'vectors', title: 'Vectors', branchId: 'linear-algebra', level: 'Undergraduate 1',
    summary: "Vectors encode magnitude and direction as ordered tuples, support addition and scaling, and carry a dot product that measures alignment. They are the basic objects of geometry and linear algebra.",
    prerequisites: [], tags: ['magnitude', 'dot-product', 'unit-vector', 'cauchy-schwarz'],
    sections: [
      [P("Forces, velocities and displacements have both size and direction, which scalars alone cannot express. Vectors represent these quantities as ordered lists of components and provide algebraic rules for combining them."),
       M(String.raw`\mathbf{u}=(u_1,\dots,u_n)\in\mathbb{R}^n,\qquad \|\mathbf{u}\|=\sqrt{\sum_{i=1}^n u_i^2}`)],
      [P("A vector is an arrow with a length and a direction; moving its tail without rotating or stretching it does not change the vector. Algebraically this means a vector is determined by components, not by where it is drawn."),
       CA('intuition', "Adding vectors tip-to-tail corresponds to componentwise addition; stretching an arrow corresponds to multiplying every component by the same number. Geometry and algebra are the same operation viewed differently.", 'Arrows and components')],
      [P("The parallelogram law shows $\\mathbf{u}+\\mathbf{v}$ as the diagonal of the parallelogram built from the two arrows. The dot product's sign reveals whether vectors point roughly together (positive), perpendicular (zero) or apart (negative)."),
       LI(['u + v: diagonal of the parallelogram.', 'u − v: arrow from the tip of v to the tip of u.', 'u/‖u‖: unit vector in the direction of u.'])],
      [P("Vector addition and scalar multiplication are defined componentwise. The dot (inner) product is $\\mathbf{u}\\cdot\\mathbf{v}=\\sum_{i=1}^n u_i v_i$, and the angle $\\theta\\in[0,\\pi]$ between nonzero vectors satisfies $\\cos\\theta=\\frac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|}$."),
       M(String.raw`\mathbf{u}\cdot\mathbf{v}=\|\mathbf{u}\|\,\|\mathbf{v}\|\cos\theta`)],
      [P("Derive the geometric formula for the dot product from the algebraic one using the law of cosines — this is a genuine proof for nonzero vectors."),
       ST('Law-of-cosines derivation', [
         { title: 'Compute ‖u − v‖² two ways', text: 'Algebraically expand the sum of squared component differences.', math: String.raw`\|\mathbf{u}-\mathbf{v}\|^2=\sum_i(u_i-v_i)^2=\|\mathbf{u}\|^2+\|\mathbf{v}\|^2-2\sum_i u_iv_i` },
         { title: 'Apply the geometric law of cosines', text: 'The same squared length in the triangle formed by u, v and u−v.', math: String.raw`\|\mathbf{u}-\mathbf{v}\|^2=\|\mathbf{u}\|^2+\|\mathbf{v}\|^2-2\|\mathbf{u}\|\,\|\mathbf{v}\|\cos\theta` },
         { title: 'Compare and conclude', text: 'Equating the two expressions cancels the norm terms.', math: String.raw`\sum_i u_iv_i=\mathbf{u}\cdot\mathbf{v}=\|\mathbf{u}\|\,\|\mathbf{v}\|\cos\theta` },
         { title: 'Perpendicularity test', text: 'For nonzero vectors, orthogonality is exactly a zero dot product.', math: String.raw`\mathbf{u}\perp\mathbf{v}\iff\mathbf{u}\cdot\mathbf{v}=0` },
       ]),
       CA('history', 'William Rowan Hamilton and Hermann Grassmann independently developed vector systems in the nineteenth century; the modern dot and cross products emerged from their work and from quaternion algebra.', 'Hamilton and Grassmann')],
      [P('Explicit numerical work with $\\mathbf{u}=(1,2,2)$ and $\\mathbf{v}=(3,0,4)$.'),
       M(String.raw`\|\mathbf{u}\|=\sqrt{1+4+4}=3,\qquad \|\mathbf{v}\|=\sqrt{9+16}=5`),
       M(String.raw`\mathbf{u}\cdot\mathbf{v}=3+0+8=11\Rightarrow\cos\theta=\frac{11}{15}\Rightarrow\theta\approx0.7478\text{ rad}\approx42.8^\circ`),
       M(String.raw`\operatorname{proj}_{\mathbf{u}}\mathbf{v}=\frac{\mathbf{u}\cdot\mathbf{v}}{\|\mathbf{u}\|^2}\mathbf{u}=\frac{11}{9}(1,2,2)`)],
      [P('Theorem (Cauchy–Schwarz). $|\\mathbf{u}\\cdot\\mathbf{v}|\\le\\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|$, with equality iff the vectors are linearly dependent. Proof sketch: the quadratic $q(t)=\\|\\mathbf{u}-t\\mathbf{v}\\|^2\\ge0$ has nonpositive discriminant, which rearranges to the inequality.'),
       P('Theorem (triangle inequality). $\\|\\mathbf{u}+\\mathbf{v}\\|\\le\\|\\mathbf{u}\\|+\\|\\mathbf{v}\\|$, obtained by squaring and applying Cauchy–Schwarz to $\\mathbf{u}\\cdot\\mathbf{v}$.'),
       M(String.raw`\|\mathbf{u}+\mathbf{v}\|^2=\|\mathbf{u}\|^2+2\mathbf{u}\cdot\mathbf{v}+\|\mathbf{v}\|^2\le(\|\mathbf{u}\|+\|\mathbf{v}\|)^2`)],
      [P('Compute lengths, angles and projections numerically with NumPy.'),
       CO(String.raw`import numpy as np
u = np.array([1.0, 2.0, 2.0])
v = np.array([3.0, 0.0, 4.0])
print(np.linalg.norm(u), np.linalg.norm(v))            # 3.0 5.0
cos = u @ v / (np.linalg.norm(u)*np.linalg.norm(v))
print(u @ v, cos, np.arccos(cos)*180/np.pi)            # 11, 0.7333, 42.83°
print((u@v)/(u@u)*u)                                   # projection`),
       P('The angle $42.83^\\circ$ matches $\\arccos(11/15)$, and the projection vector is $(11/9,22/9,22/9)$.')],
      [P('Vectors represent forces in mechanics, coordinates in computer graphics, word embeddings in natural language processing and feature vectors in machine learning. The dot product measures similarity and drives projection-based algorithms.'),
       LI(['Physics: resultant force from component vectors.', 'Graphics: normals to surfaces for lighting.', 'Machine learning: cosine similarity between embeddings.'])],
      [P('Mistakes include confusing a point with a vector from the origin, dividing by a zero norm when normalising, and using dot product where the cross product (giving a vector) is required.'),
       CA('warning', "The zero vector has no direction and cannot be normalised. It is orthogonal to every vector by the dot-product test, but the angle formula $\\cos\\theta=\\frac{u\\cdot v}{\\|u\\|\\|v\\|}$ is undefined for it.", 'Zero vector edge case')],
      [LI(['Why is the dot product a scalar and the cross product a vector?', 'How does Cauchy–Schwarz justify the cosine formula?', 'When is the projection of v onto u equal to v?', 'Why do components depend on a chosen basis while length does not?'])],
      [LI(['OpenStax, Calculus Volume 3, chapter 2: Vectors in Space (open textbook).', 'MIT OpenCourseWare 18.02, vectors and geometry (video course).', 'Next topics: vector spaces, inner products and cross products.'])],
    ],
  }),

  article({
    id: 'vector-spaces', title: 'Vector Spaces', branchId: 'linear-algebra', level: 'Undergraduate 2',
    summary: "A vector space is any set closed under addition and scalar multiplication satisfying the familiar algebraic axioms. This abstraction unifies arrows, polynomials, matrices and functions under one theory.",
    prerequisites: ['vectors'], tags: ['axioms', 'subspace', 'closure', 'abstraction'],
    sections: [
      [P("Arrow vectors are useful, but polynomials and continuous functions also add and scale. Rather than proving analogous theorems repeatedly, we isolate the algebraic properties common to all these settings: the vector space axioms."),
       M(String.raw`V\ \text{over}\ \mathbb{F}:\quad u+v\in V,\ \lambda u\in V,\ \text{with the eight vector-space axioms}`)],
      [P("A vector space is not a set of arrows; it is a set of objects supporting two operations that behave like addition and scaling. Once the axioms hold, every theorem about span, independence and dimension applies automatically."),
       CA('intuition', "Think of a vector space as a 'flat' world closed under stretching and combining. If combining two objects ever leaves the set, the set is not a vector space — regardless of how natural its elements look.", 'Closure is the core idea')],
      [P("Examples include $\\mathbb{R}^n$, the space $M_{2\\times2}$ of matrices, the polynomials $P_n$ of degree at most $n$, and $C([0,1])$ of continuous functions. Nonexamples: the positive reals (no additive inverses), the integers (not closed under real scaling), and an affine plane not through the origin."),
       TB(['Set', 'Vector space?', 'Reason'],
         [['ℝⁿ', 'Yes', 'Add and scale componentwise'],
          ['P₂ polynomials', 'Yes', 'Sum and scalar multiple stay degree ≤ 2'],
          ['Integers ℤ over ℝ', 'No', 'π·2 is not an integer'],
          ['{(x,y): x+y=1}', 'No', 'Does not contain (0,0)']])],
      [P("Formally, a vector space over a field $\\mathbb{F}$ is a set $V$ with addition $+:V\\times V\\to V$ and scalar multiplication $\\mathbb{F}\\times V\\to V$ such that $(V,+)$ is an abelian group with identity $\\mathbf{0}$, and $\\lambda(u+v)=\\lambda u+\\lambda v$, $(\\lambda+\\mu)u=\\lambda u+\\mu u$, $\\lambda(\\mu u)=(\\lambda\\mu)u$, $1u=u$."),
       M(String.raw`\lambda(u+v)=\lambda u+\lambda v,\qquad (\lambda+\mu)u=\lambda u+\mu u`)],
      [P("Verify a subspace using the subspace test, then show an affine set fails. This is a complete proof, not an analogy."),
       ST('Subspace test applied', [
         { title: 'State the criterion', text: 'A nonempty subset W of a vector space V is a subspace iff it is closed under addition and scalar multiplication.', math: String.raw`u,v\in W\Rightarrow u+v\in W;\quad \lambda\in\mathbb{F},\,u\in W\Rightarrow\lambda u\in W` },
         { title: 'Verify P₂ inside the functions ℝ → ℝ', text: 'The sum of two polynomials of degree at most 2 again has degree at most 2; scaling does not increase degree; the zero polynomial is included.', math: String.raw`p(x)=a_0+a_1x+a_2x^2,\ q(x)=b_0+b_1x+b_2x^2\Rightarrow p+q=(a_0+b_0)+(a_1+b_1)x+(a_2+b_2)x^2` },
         { title: 'Reject the affine line x + y = 1', text: 'It fails closure under scaling (and does not contain the origin), even though it is closed under neither addition nor scaling.', math: String.raw`(1,0)\in W,\ 2(1,0)=(2,0)\notin W` },
       ]),
       CA('warning', 'Checking only closure under addition is insufficient: the positive integers are closed under addition but not under scalar multiplication by $-1$ or $\\pi$. The field matters — $\\mathbb{Q}^n$ is a vector space over $\\mathbb{Q}$ but not over $\\mathbb{R}$.', 'Closure needs both operations')],
      [P('Worked examples with explicit combinations.'),
       M(String.raw`a=(1,2),\ b=(3,-1):\quad 2a-b=(2,4)-(3,-1)=(-1,5)`),
       P("The even functions form a subspace of $C(\\mathbb{R})$ since the sum of even functions is even and a scalar multiple of an even function is even; odd functions likewise form a subspace."),
       P('The solution set of a homogeneous linear system $A\\mathbf{x}=0$ is a subspace because $A(\\mathbf{x}+\\mathbf{y})=A\\mathbf{x}+A\\mathbf{y}=0$.')],
      [P('Theorem (subspace criterion, proof). A nonempty $W\\subseteq V$ is a subspace iff $\\alpha u+\\beta v\\in W$ for all $u,v\\in W$ and $\\alpha,\\beta\\in\\mathbb{F}$. Proof: necessity is closure; sufficiency follows by choosing $\\alpha=\\beta=1$ for sums and $\\beta=0$ for scaling.'),
       P('Theorem (dimension formula, statement for finite-dimensional spaces). $\\dim(U+W)=\\dim U+\\dim W-\\dim(U\\cap W)$. Proof sketch: start with a basis of the intersection, extend it to bases of $U$ and $W$, and show the union extended set is a basis of $U+W$.')],
      [P('Verify closure numerically for random polynomials represented by coefficient vectors.'),
       CO(String.raw`import numpy as np
p = np.array([1., 2., 3.])      # 1 + 2x + 3x^2
q = np.array([-2., 0., 1.])
print(p + q)                    # coefficients remain length 3
print(2.5*p)                    # still degree ≤ 2
# check the affine set {(x,y): x+y=1} fails scaling
a = np.array([1., 0.])
print(2*a, 2*a.sum())           # (2,0), sum = 2 ≠ 1`),
       P('The affine set fails the scaling test, confirming it is not a subspace.')],
      [P('Vector spaces organise solution sets of differential equations (linear combinations of solutions are solutions), function spaces in Fourier analysis, and feature spaces in machine learning where linear models operate.'),
       LI(['Fourier series: sines and cosines span a function space.', 'Differential equations: superposition principle.', 'Coding theory: codewords form subspaces.'])],
      [P('Mistakes include assuming every subset closed under addition is a subspace, forgetting to verify the zero vector, and working over the wrong field (real versus rational).'),
       CA('warning', 'The set $\\{(x,y): x,y\\ge0\\}$ is closed under addition and under nonnegative scaling, but not under all real scalars; it is not a vector space over $\\mathbb{R}$.', 'Scalars can be negative')],
      [LI(['Why is the empty set not a vector space?', 'Are the integers a vector space over themselves?', 'How does the choice of field change whether a set is a vector space?', 'Why is the solution set of Ax = b generally not a subspace when b ≠ 0?'])],
      [LI(['OpenStax, Calculus Volume 3 / Linear Algebra supplements: vector spaces (open textbook).', 'MIT OpenCourseWare 18.06, vector spaces and subspaces (video course).', 'Next topics: basis and dimension, linear transformations and inner products.'])],
    ],
  }),

  article({
    id: 'basis-dimension', title: 'Basis and Dimension', branchId: 'linear-algebra', level: 'Undergraduate 2',
    summary: "A basis is a linearly independent spanning set that provides unique coordinates for every vector. Dimension, the number of basis vectors, is an invariant of the space and governs rank-nullity.",
    prerequisites: ['vector-spaces'], tags: ['span', 'independence', 'coordinates', 'rank-nullity'],
    sections: [
      [P("To compute with an abstract vector space we need a coordinate system: a list of vectors that can build every other vector, with no redundancy. A basis is exactly such a list, and its size is the space's dimension."),
       M(String.raw`\mathcal{B}=\{b_1,\dots,b_n\}: v=\sum_{i=1}^n c_i b_i\ \text{uniquely}`)],
      [P("Span asks whether the basis vectors can reach every point by combining; independence asks whether any of them are redundant. A basis satisfies both, so coordinates are forced — there is exactly one recipe for each vector."),
       CA('intuition', "A basis is a minimal complete toolkit. Remove any vector and you lose reach; add any vector and you gain redundancy. Both failures destroy uniqueness of coordinates.", 'Minimal and complete')],
      [P("In $\\mathbb{R}^2$ the standard basis $\\{(1,0),(0,1)\\}$ gives familiar coordinates, but $\\{(1,1),(1,-1)\\}$ works too. Coordinates change with the basis even though the underlying vector does not."),
       LI(['Standard basis: e₁ = (1,0), e₂ = (0,1).', 'Skew basis: (1,1), (1,−1) — still independent.', 'Failure: (1,0), (2,0) — dependent, spans only a line.'])],
      [P("Vectors $v_1,\\ldots,v_k$ are linearly independent if $\\sum c_i v_i=0$ forces all $c_i=0$. Their span is the set of all linear combinations. A basis is an independent set whose span is the whole space; $\\dim V$ is the number of vectors in any basis."),
       M(String.raw`\sum_{i=1}^k c_i v_i=0\ \Longrightarrow\ c_1=\cdots=c_k=0`)],
      [P("Compute coordinates in a nonstandard basis and prove why dimension is well defined."),
       ST('Coordinate computation and exchange idea', [
         { title: 'Set up the coordinate equation', text: 'Solve v = a b₁ + b b₂ for the unknown scalars.', math: String.raw`(3,1)=a(1,1)+b(1,-1)\Rightarrow a+b=3,\ a-b=1` },
         { title: 'Solve the linear system', text: 'Adding and subtracting gives a = 2 and b = 1.', math: String.raw`a=2,\ b=1\ \Longrightarrow\ [v]_{\mathcal{B}}=(2,1)` },
         { title: 'Verify uniqueness', text: 'Independence makes the coefficient matrix invertible, so the system has exactly one solution.', math: String.raw`\det\begin{pmatrix}1&1\\1&-1\end{pmatrix}=-2\neq0` },
         { title: 'Dimension invariance (exchange lemma, proof sketch)', text: 'If a spanning set has m vectors and an independent set has n vectors in the same space, replacing spanning vectors one at a time with independent ones shows n ≤ m; two bases therefore have equal size.', math: String.raw`\text{any two finite bases have the same cardinality}` },
       ]),
       CA('history', 'The concept of dimension was formalised in the nineteenth and early twentieth centuries through Grassmann\'s extension theory and the axiomatic work of Weyl and van der Waerden.', 'From geometry to axiom')],
      [P('Worked dimension and rank computations.'),
       M(String.raw`\dim\mathbb{R}^3=3,\qquad \dim P_2=3\text{ with basis }\{1,x,x^2\}`),
       M(String.raw`A=\begin{pmatrix}1&2\\2&4\end{pmatrix}:\ \text{rank}=1,\ \text{nullity}=1`),
       P('The second row is twice the first, so the column space is a line; the null space is $\\operatorname{span\\{(-2,1)\\}}$.')],
      [P('Rank–nullity theorem (statement): for a linear map $T:V\\to W$ with $V$ finite-dimensional, $\\dim V=\\dim\\ker T+\\dim\\operatorname{im}T$. Proof sketch: take a basis of the kernel, extend it to a basis of $V$, and show the images of the added vectors form a basis of the image.'),
       M(String.raw`\dim V=\operatorname{rank}T+\operatorname{nullity}T`),
       P('Exchange theorem: any linearly independent set can be extended to a basis of a finite-dimensional space; any spanning set can be trimmed to one.')],
      [P('Use SymPy to compute ranks, null spaces and coordinates.'),
       CO(String.raw`import sympy as sp
A = sp.Matrix([[1,2],[2,4]])
print(A.rank(), A.nullspace())                 # 1, [Matrix([-2, 1])]
B = sp.Matrix([[1,1],[1,-1]])
print(B.LUsolve(sp.Matrix([3,1])).T)           # Matrix([[2, 1]])`),
       P('The solved coordinates $(2,1)$ reproduce $2(1,1)+(1,-1)=(3,1)$.')],
      [P('Dimension counts degrees of freedom: the number of parameters needed to specify a physical state, the intrinsic dimension of a data manifold, and the number of independent columns in a design matrix.'),
       LI(['Engineering: degrees of freedom of a mechanism.', 'Statistics: rank of a design matrix determines estimability.', 'Data compression: represent data in a lower-dimensional basis.'])],
      [P('Errors include trying to span $\\mathbb{R}^2$ with two parallel vectors, forgetting that coordinates depend on the chosen basis, and confusing the dimension of the ambient space with that of a subspace.'),
       CA('warning', "Three vectors in $\\mathbb{R}^2$ cannot be independent. More generally, a set with more than $n$ vectors in an $n$-dimensional space is always dependent — consequences of the exchange lemma.", 'Independence has a size limit')],
      [LI(['Why must a basis be both independent and spanning?', 'Can a vector have two different coordinate representations in the same basis?', 'How does rank-nullity constrain the solutions of Ax = b?', 'What is the dimension of the space of 3×3 symmetric matrices?'])],
      [LI(['MIT OpenCourseWare 18.06, basis, dimension and rank (video course).', 'OpenStax / LibreTexts Linear Algebra, bases and dimension (open textbook).', 'Next topics: linear transformations, eigenvalues and the Gram–Schmidt derivation.'])],
    ],
  }),

  article({
    id: 'linear-transformations', title: 'Linear Transformations', branchId: 'linear-algebra', level: 'Undergraduate 2',
    summary: "A linear transformation preserves addition and scalar multiplication, and is represented by a matrix once bases are chosen. Kernel, image and rank-nullity describe its structural effect.",
    prerequisites: ['vector-spaces', 'basis-dimension'], tags: ['matrix', 'kernel', 'image', 'composition'],
    simulationId: 'matrix-transform', simCaption: 'Apply a matrix to the unit square and watch the image deform.',
    sections: [
      [P("Rotations, projections and scalings share a crucial property: the transform of a sum equals the sum of the transforms, and scaling commutes with the map. Linear transformations study exactly these structure-preserving maps."),
       M(String.raw`T(u+v)=T(u)+T(v),\qquad T(\lambda v)=\lambda T(v)`)],
      [P("A linear map sends the grid lines of a coordinate system to straight, evenly spaced lines. The image of the unit square is a parallelogram whose edges are the images of the two basis vectors — this single picture encodes the whole matrix."),
       CA('visual', 'The columns of a matrix are the transformed basis vectors. Moving a column moves one edge of the image parallelogram; the determinant measures how its area changes.', 'Columns are images')],
      [P("Examples: rotation by $90^\\circ$ sends $(1,0)$ to $(0,1)$; the projection onto the $x$-axis sends $(x,y)$ to $(x,0)$; the shear $(x,y)\\mapsto(x+2y,y)$ tilts squares into parallelograms."),
       TB(['Transformation', 'Matrix', 'Effect'],
         [['Rotation 90°', '[[0,−1],[1,0]]', 'Turns the plane'],
          ['x-axis projection', '[[1,0],[0,0]]', 'Flattens vertically'],
          ['Scaling', '[[2,0],[0,3]]', 'Area multiplied by 6']])],
      [P("A map $T:V\\to W$ between vector spaces over the same field is linear if it satisfies the two identities above for all $u,v\\in V$ and scalars $\\lambda$. Its kernel is $\\ker T=\\{v:T(v)=0\\}$ and its image is $\\operatorname{im}T=\\{T(v):v\\in V\\}$."),
       M(String.raw`[T]_{\mathcal{B}\to\mathcal{C}}\, [v]_{\mathcal{B}}=[T(v)]_{\mathcal{C}}`)],
      [P("Derive the matrix representation from the images of basis vectors, then check a numerical example."),
       ST('From linear map to matrix', [
         { title: 'Express an arbitrary vector in a basis', text: 'Write v = Σ cᵢ eᵢ; by linearity T(v) = Σ cᵢ T(eᵢ).', math: String.raw`v=\sum_i c_i e_i\ \Longrightarrow\ T(v)=\sum_i c_i T(e_i)` },
         { title: 'Build the matrix', text: 'The ith column of [T] is the coordinate vector of T(eᵢ); this makes the matrix act correctly on every input.', math: String.raw`[T]=\begin{pmatrix}|&|\\ [T(e_1)]&[T(e_2)]\\ |&|\end{pmatrix}` },
         { title: 'Apply to a concrete map', text: 'For T(x,y) = (2x+y, x−y), T(e₁)=(2,1) and T(e₂)=(1,−1).', math: String.raw`[T]=\begin{pmatrix}2&1\\1&-1\end{pmatrix}` },
         { title: 'Verify numerically', text: 'Apply matrix and formula to (3,1); both give (7,2).', math: String.raw`[T]\binom{3}{1}=\binom{2\cdot3+1}{3-1}=\binom{7}{2}` },
       ]),
       CA('warning', "An affine map such as $T(x)=x+b$ with $b\\neq0$ is not linear because $T(0)=b\\neq0$. Linearity is stricter than 'given by a formula with no powers'.", 'T(0) must be 0')],
      [P('Worked structural computations.'),
       M(String.raw`T(x,y)=(x,0):\ \ker T=\operatorname{span\{(0,1)\}},\ \operatorname{im}T=\operatorname{span\{(1,0)\}}`),
       M(String.raw`\dim\ker T+\dim\operatorname{im}T=1+1=2=\dim\mathbb{R}^2`),
       P('For the rotation matrix, $\\det=0-(-1)=1$, so area is preserved; for the scaling matrix the determinant is $2\\cdot3=6$.')],
      [P('Theorem (composition corresponds to matrix multiplication). If $T:V\\to W$ has matrix $A$ and $S:W\\to U$ has matrix $B$ in compatible bases, then $S\\circ T$ has matrix $BA$. Proof sketch: apply both maps to each basis vector.'),
       P('Rank–nullity (recalled): $\\dim V=\\dim\\ker T+\\dim\\operatorname{im}T$. Invertibility is equivalent to $\\ker T=\\{0\\}$, which for square matrices is equivalent to $\\det A\\neq0$.')],
      [P('Apply matrices to vectors with NumPy and verify the image of a square.'),
       CO(String.raw`import numpy as np
T = np.array([[2., 1.], [1., -1.]])
print(T @ np.array([3., 1.]))                  # [7. 2.]
unit = np.eye(2)
print(T @ unit)                                # columns are T(e1), T(e2)
print(np.linalg.det(T))                        # -3.0
print(np.linalg.matrix_rank(T))                # 2`),
       P('The determinant $-3$ means area scales by $3$ and orientation reverses; full rank means the map is invertible.')],
      [P('Linear transformations are the language of computer graphics (rotations, projections), quantum mechanics (operators on state spaces), statistics (design matrices mapping parameters to observations) and neural networks (affine layers).'),
       LI(['Graphics: camera projection matrices.', 'Quantum theory: observables as linear operators.', 'Machine learning: a linear layer y = Wx + b.'])],
      [P('Mistakes include mixing row and column conventions, assuming a change of basis changes the transformation itself, and neglecting that the matrix depends on the chosen bases.'),
       CA('warning', "The matrix of a rotation in the standard basis differs from its matrix in a rotated basis, although the geometric map is identical. Similarity transformations $P^{-1}AP$ relate the two.", 'Basis dependence')],
      [LI(['Why do two columns determine a 2×2 linear map?', 'What does the kernel tell you about solutions of Ax = 0?', 'Why is composition of maps represented by matrix multiplication in reverse order?', 'Which linear maps preserve area?'])],
      [LI(['MIT OpenCourseWare 18.06, linear transformations and matrices (video course).', 'OpenStax / LibreTexts Linear Algebra, linear transformations (open textbook).', 'Next topics: eigenvalues, diagonalization and the SVD.'])],
    ],
  }),

  article({
    id: 'eigenvalues', title: 'Eigenvalues', branchId: 'linear-algebra', level: 'Undergraduate 2',
    summary: "Eigenvalues are scalars for which A − λI is singular, making the equation Av = λv solvable by a nonzero vector. They encode growth rates, resonances and invariants such as trace and determinant.",
    prerequisites: ['linear-transformations', 'basis-dimension'], tags: ['characteristic-polynomial', 'spectrum', 'trace', 'determinant'],
    simulationId: 'eigenvectors', simCaption: 'Watch special directions stretch while all other directions rotate.',
    sections: [
      [P("Most vectors change direction when a matrix acts on them, but certain special directions are merely stretched or compressed. The stretch factors are eigenvalues; finding them reduces a complicated linear map to simple scaling along a few directions."),
       M(String.raw`A\mathbf{v}=\lambda\mathbf{v},\qquad \mathbf{v}\neq\mathbf{0}`)],
      [P("An eigenvector is an invariant direction; the eigenvalue says how much that direction is amplified, reversed (negative) or annihilated (zero). Repeated application multiplies the eigenvector by $\\lambda^k$, making long-term behaviour easy to predict."),
       CA('intuition', "The eigenvalue equation is a fixed-direction condition. If $\\lambda=0$ the direction is collapsed into the kernel; if $|\\lambda|>1$ repeated application grows; if $|\\lambda|<1$ it decays.", 'Scaling along invariant directions')],
      [P("For the matrix $\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$ the eigenvectors $(1,1)$ and $(1,-1)$ are stretched by $3$ and $1$ respectively. The coordinate axes are not eigenvectors: the map mixes them."),
       LI(['λ = 3: direction (1,1) is tripled.', 'λ = 1: direction (1,−1) is unchanged.', 'λ = 0 (for singular matrices): a direction is collapsed.'])],
      [P("The spectrum of $A$ is the multiset of eigenvalues (roots of the characteristic polynomial). For an $n\\times n$ matrix $p_A(\\lambda)=\\det(A-\\lambda I)$ is a degree-$n$ polynomial; its roots over $\\mathbb{C}$ are the eigenvalues, counted with algebraic multiplicity."),
       M(String.raw`p_A(\lambda)=\det(A-\lambda I)=\lambda^n-(\operatorname{tr}A)\lambda^{n-1}+\cdots+(-1)^n\det A`)],
      [P("Derive the characteristic equation from the eigenvalue equation and solve a concrete 2×2 case completely."),
       ST('Derivation of the characteristic equation', [
         { title: 'Rewrite as a homogeneous system', text: 'Move λv to one side and factor out v.', math: String.raw`A v=\lambda v\iff (A-\lambda I)v=0` },
         { title: 'Require a nontrivial solution', text: 'A nonzero solution exists exactly when the coefficient matrix is singular.', math: String.raw`\det(A-\lambda I)=0` },
         { title: 'Evaluate for A = [[2,1],[1,2]]', text: 'Compute the 2×2 determinant and factor.', math: String.raw`\det\begin{pmatrix}2-\lambda&1\\1&2-\lambda\end{pmatrix}=(2-\lambda)^2-1=\lambda^2-4\lambda+3=(\lambda-1)(\lambda-3)` },
         { title: 'Read off spectrum and invariants', text: 'The eigenvalues are 1 and 3; their sum 4 equals the trace and their product 3 equals the determinant.', math: String.raw`\lambda_1=3,\ \lambda_2=1,\quad \lambda_1+\lambda_2=4,\ \lambda_1\lambda_2=3` },
       ]),
       CA('warning', 'For real matrices eigenvalues can be complex: $\\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}$ has $\\lambda=\\pm i$. Also $\\lambda=0$ is a perfectly valid eigenvalue, signalling a singular matrix.', 'Complex and zero eigenvalues')],
      [P('Worked spectra with explicit arithmetic.'),
       M(String.raw`A=\begin{pmatrix}1&2\\2&1\end{pmatrix}:\ \lambda^2-2\lambda-3=0\Rightarrow\lambda=3,-1`),
       M(String.raw`A=\begin{pmatrix}3&5\\0&2\end{pmatrix}:\ \text{triangular}\Rightarrow\lambda=3,2`),
       M(String.raw`A=\begin{pmatrix}0&-1\\1&0\end{pmatrix}:\ \lambda^2+1=0\Rightarrow\lambda=\pm i`)],
      [P('Theorem. For complex eigenvalues counted with algebraic multiplicity, $\\sum_i\\lambda_i=\\operatorname{tr}A$ and $\\prod_i\\lambda_i=\\det A$. Proof sketch: compare coefficients in $\\det(A-\\lambda I)$ using Vieta\'s formulas.'),
       P('Theorem. A real symmetric matrix has only real eigenvalues. Proof sketch: if $Av=\\lambda v$ with complex $v$, then $\\lambda\\|v\\|^2=v^*Av=(v^*Av)^*=\\bar\\lambda\\|v\\|^2$, so $\\lambda=\\bar\\lambda$ (developed fully in the spectral theorem).')],
      [P('Compute eigenvalues numerically and verify trace/determinant identities.'),
       CO(String.raw`import numpy as np
A = np.array([[2., 1.], [1., 2.]])
w = np.linalg.eigvals(A)
print(w, w.sum(), np.trace(A), w.prod(), np.linalg.det(A))
# [3. 1.] 4.0 4.0 3.0 3.0
B = np.array([[0., -1.], [1., 0.]])
print(np.linalg.eigvals(B))                      # ~ 0±1j`),
       P('The numerical spectrum matches the factored characteristic polynomial exactly.')],
      [P('Eigenvalues determine stability of dynamical systems (sign of real parts), natural frequencies of vibrations, principal variances in PCA, and importance scores in spectral ranking algorithms.'),
       LI(['Structural engineering: resonance frequencies.', 'Markov chains: stationary distribution is the λ = 1 eigenvector.', 'Dynamical systems: stability via eigenvalues of the linearisation.'])],
      [P('Mistakes include using $\\det(\\lambda I-A)$ and $\\det(A-\\lambda I)$ as if they were identical (they differ by $(-1)^n$), confusing algebraic with geometric multiplicity, and assuming all eigenvalues are real.'),
       CA('warning', "For odd n, det(λI−A) = −det(A−λI), but the roots are the same; for even n the polynomials coincide. The sign convention must be consistent when comparing coefficients.", 'Sign conventions')],
      [LI(['Why must det(A − λI) vanish for a nonzero eigenvector?', 'What does a zero eigenvalue say about invertibility?', 'How do trace and determinant constrain the spectrum?', 'Why can a repeated root have fewer independent eigenvectors?'])],
      [LI(['MIT OpenCourseWare 18.06, eigenvalues and characteristic polynomials (video course).', 'OpenStax / LibreTexts Linear Algebra, eigenvalues (open textbook).', 'Next topics: eigenvectors, diagonalization and the eigenvalue derivation.'])],
    ],
  }),

  article({
    id: 'eigenvectors', title: 'Eigenvectors', branchId: 'linear-algebra', level: 'Undergraduate 2',
    summary: "Eigenvectors are nonzero vectors whose direction is preserved by a linear map. They form eigenspaces whose dimension — the geometric multiplicity — determines whether a matrix can be diagonalized.",
    prerequisites: ['eigenvalues'], tags: ['eigenspace', 'multiplicity', 'invariant-direction', 'independence'],
    simulationId: 'eigenvectors', simCaption: 'Drag a vector and watch which directions are only scaled by the matrix.',
    sections: [
      [P("Knowing the eigenvalues gives the stretch factors but not the directions they act on. Eigenvectors are the nonzero solutions of $(A-\\lambda I)v=0$: the kernel of a singular matrix, computed once $\\lambda$ is known."),
       M(String.raw`E_\lambda=\ker(A-\lambda I)=\{v\neq0:Av=\lambda v\}\cup\{0\}`)],
      [P("An eigenvector is not a single arrow but an entire line through the origin: any nonzero multiple works. What matters is the direction; the eigenspace collects that direction together with the zero vector so it is a genuine subspace."),
       CA('intuition', "Solving for eigenvectors is solving a homogeneous system. Free variables correspond to independent eigenvector directions, so the dimension of the eigenspace equals the number of free variables in (A − λI)v = 0.", 'Eigenspaces are null spaces')],
      [P("For $\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$, the eigenvectors are $(1,1)$ for $\\lambda=3$ and $(1,-1)$ for $\\lambda=1$. These directions are orthogonal because the matrix is symmetric."),
       LI(['λ = 3: (A − 3I) has rows (−1,1), so y = x.', 'λ = 1: (A − I) has rows (1,1), so y = −x.', 'Any nonzero scalar multiple is the same eigenvector direction.'])],
      [P("For an eigenvalue $\\lambda$, the eigenspace $E_\\lambda=\\ker(A-\\lambda I)$ is a subspace; its dimension is the geometric multiplicity $g_\\lambda$, always between $1$ and the algebraic multiplicity $a_\\lambda$."),
       M(String.raw`1\le g_\lambda=\dim\ker(A-\lambda I)\le a_\lambda`)],
      [P("Compute the eigenspaces of a 2×2 matrix explicitly and verify the defining equation."),
       ST('Eigenspace computation', [
         { title: 'Find the eigenvalues', text: 'The characteristic polynomial factors completely.', math: String.raw`(2-\lambda)^2-1=(\lambda-3)(\lambda-1)=0` },
         { title: 'Solve for λ = 3', text: 'Row-reducing A − 3I gives y = x, so the eigenspace is a line.', math: String.raw`A-3I=\begin{pmatrix}-1&1\\1&-1\end{pmatrix}\Rightarrow E_3=\operatorname{span}\{(1,1)\}` },
         { title: 'Solve for λ = 1', text: 'Row-reducing A − I gives x + y = 0.', math: String.raw`A-I=\begin{pmatrix}1&1\\1&1\end{pmatrix}\Rightarrow E_1=\operatorname{span}\{(1,-1)\}` },
         { title: 'Verify', text: 'Multiply the matrix by each candidate vector and compare.', math: String.raw`A\binom11=\binom33=3\binom11,\quad A\binom1{-1}=\binom1{-1}=1\binom1{-1}` },
       ]),
       CA('warning', 'The zero vector satisfies Av = λv for every λ, so it is explicitly excluded. Without this exclusion every scalar would be an eigenvalue of every matrix.', 'Zero is not an eigenvector')],
      [P('Worked examples including a defective matrix.'),
       M(String.raw`P=\begin{pmatrix}1&0\\0&0\end{pmatrix}:\ E_1=\operatorname{span}\{(1,0)\},\ E_0=\operatorname{span}\{(0,1)\}`),
       M(String.raw`J=\begin{pmatrix}1&1\\0&1\end{pmatrix}:\ \lambda=1\ (\text{double}),\ E_1=\operatorname{span}\{(1,0)\}`),
       P('For $J$ the algebraic multiplicity is $2$ but the geometric multiplicity is $1$, so $J$ is defective and not diagonalizable.')],
      [P('Theorem. Eigenvectors belonging to distinct eigenvalues are linearly independent. Proof sketch: suppose $\\sum c_i v_i=0$ is a shortest dependence; apply $A$ and subtract $\\lambda_1$ times the original relation to shorten it, iterating to get a contradiction.'),
       P('Theorem. For any eigenvalue, $g_\\lambda\\le a_\\lambda$. Proof sketch: choose a basis of $E_\\lambda$, extend it to a basis of $V$; the matrix becomes block upper triangular with $\\lambda I_{g_\\lambda}$ as a block, so $\\lambda$ occurs at least $g_\\lambda$ times on the diagonal.')],
      [P('Compute normalized eigenvectors with NumPy and check the eigenvalue equation.'),
       CO(String.raw`import numpy as np
A = np.array([[2., 1.], [1., 2.]])
w, V = np.linalg.eig(A)
print(w)                      # [3. 1.]
print(V)                      # columns: (0.707,0.707), (-0.707,0.707)
for i in range(2):
    print(np.allclose(A @ V[:,i], w[i]*V[:,i]))   # True True
J = np.array([[1., 1.], [0., 1.]])
print(np.linalg.eig(J)[1])    # only one independent eigenvector`),
       P('The computed directions agree with $(1,1)/\\sqrt2$ and $(1,-1)/\\sqrt2$, up to sign.')],
      [P('Eigenvectors give the normal modes of vibrating structures, the principal axes of a covariance ellipsoid, the stable directions of a dynamical system and the stationary distribution of a Markov chain.'),
       LI(['Mechanics: normal modes of oscillation.', 'Statistics: PCA loadings.', 'Networks: PageRank as the dominant eigenvector.'])],
      [P('Mistakes include reporting a non-unit vector when the software returns unit vectors (both are valid), assuming distinct eigenvalues are required for independence of a set of eigenvectors (only distinctness matters within that set), and ignoring defective matrices.'),
       CA('warning', 'For a repeated eigenvalue the eigenspace may have dimension 1 rather than 2. Always count free variables in $(A-\\lambda I)v=0$ rather than assuming multiplicity from the characteristic polynomial.', 'Multiplicity can drop')],
      [LI(['Why is an eigenspace a subspace?', 'How do you recover eigenvectors from a numerical eigensolver?', 'What fails when A − λI is invertible?', 'Why are eigenvectors for distinct eigenvalues automatically independent?'])],
      [LI(['MIT OpenCourseWare 18.06, eigenvectors and eigenspaces (video course).', 'OpenStax / LibreTexts Linear Algebra, eigenspaces (open textbook).', 'Next topics: diagonalization, defective matrices and the spectral theorem.'])],
    ],
  }),

  article({
    id: 'diagonalization', title: 'Diagonalization', branchId: 'linear-algebra', level: 'Undergraduate 3',
    summary: "A matrix is diagonalizable when it has a basis of eigenvectors, allowing A = PDP⁻¹ and turning matrix powers and functions into entrywise computations on the diagonal.",
    prerequisites: ['eigenvectors', 'eigenvalues'], tags: ['similarity', 'matrix-powers', 'defective', 'change-of-basis'],
    sections: [
      [P("Computing $A^{100}$ directly is expensive; if $A=PDP^{-1}$ with $D$ diagonal, then $A^{100}=PD^{100}P^{-1}$ and the middle step is just raising $n$ numbers to the 100th power. Diagonalization is a change to eigen-coordinates."),
       M(String.raw`A=PDP^{-1}\ \Longrightarrow\ A^k=PD^kP^{-1}`)],
      [P("In the eigenbasis the transformation simply stretches each coordinate independently. Converting into that basis, scaling, and converting back is often cheaper than working in the original coordinates."),
       CA('intuition', "Diagonalization is the matrix analogue of writing a number in a convenient base. The underlying operator is unchanged; only the coordinate description becomes simple.", 'Same map, better coordinates')],
      [P("The columns of $P$ are eigenvectors and the diagonal entries of $D$ are the matching eigenvalues; reordering columns must reorder the diagonal. If any eigenvector is missing, $P$ is not invertible and the factorisation fails."),
       LI(['P columns: eigenvectors v₁, …, vₙ.', 'D diagonal: λ₁, …, λₙ in the same order.', 'Failure mode: geometric multiplicity below algebraic multiplicity.'])],
      [P("A square matrix $A$ is diagonalizable over $\\mathbb{F}$ iff it has $n$ linearly independent eigenvectors in $\\mathbb{F}^n$. Equivalently the sum of geometric multiplicities equals $n$; distinct eigenvalues alone guarantee this, repeated ones do not."),
       M(String.raw`AP=PD\ \Longrightarrow\ A=PDP^{-1},\quad P\ \text{invertible}`)],
      [P("Derive the factorisation and use it to compute an exact high power with verified arithmetic."),
       ST('Derivation and computation', [
         { title: 'Stack the eigenvector equations', text: 'Each column satisfies A pᵢ = λᵢ pᵢ; placing them side by side gives a matrix identity.', math: String.raw`A\begin{pmatrix}|&&|\\p_1&p_2&p_3\\|&&|\end{pmatrix}=\begin{pmatrix}|&&|\\\lambda_1p_1&\lambda_2p_2&\lambda_3p_3\\|&&|\end{pmatrix}=PD` },
         { title: 'Invert P', text: 'For A = [[2,1],[1,2]] take P = [[1,1],[1,−1]] with P⁻¹ = (1/2)[[1,1],[1,−1]].', math: String.raw`P^{-1}=\frac12\begin{pmatrix}1&1\\1&-1\end{pmatrix},\quad D=\begin{pmatrix}3&0\\0&1\end{pmatrix}` },
         { title: 'Compute the tenth power', text: '3¹⁰ = 59049; multiply out the symmetric product.', math: String.raw`A^{10}=PD^{10}P^{-1}=\frac12\begin{pmatrix}59049+1&59049-1\\59049-1&59049+1\end{pmatrix}=\begin{pmatrix}29525&29524\\29524&29525\end{pmatrix}` },
         { title: 'Check consistency', text: 'Trace of A¹⁰ equals 3¹⁰ + 1 = 59050, matching the diagonal sum 2·29525.', math: String.raw`\operatorname{tr}(A^{10})=59050=3^{10}+1^{10}` },
       ]),
       CA('warning', 'The order of columns in $P$ must match the order of eigenvalues in $D$; swapping them without adjusting $D$ produces a wrong factorisation. Also $P^{-1}\\neq P^T$ unless $P$ is orthogonal.', 'Order and inverses')],
      [P('Worked classification and reconstruction.'),
       M(String.raw`\begin{pmatrix}1&1\\0&1\end{pmatrix}:\ \text{one eigenvector}\Rightarrow\text{not diagonalizable}`),
       M(String.raw`\begin{pmatrix}0&1\\1&0\end{pmatrix}:\ \lambda=\pm1,\ P=\begin{pmatrix}1&1\\1&-1\end{pmatrix}\Rightarrow\text{diagonalizable}`),
       P('Reconstructing the symmetric matrix gives $\\frac12\\begin{pmatrix}1&1\\\\1&-1\\end{pmatrix}\\begin{pmatrix}3&0\\\\0&1\\end{pmatrix}\\begin{pmatrix}1&1\\\\1&-1\\end{pmatrix}=\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$.')],
      [P('Theorem (criterion, proved above). $A$ is diagonalizable iff the sum of geometric multiplicities is $n$. Corollary: $n$ distinct eigenvalues imply diagonalizability, since their eigenvectors are independent.'),
       P('Similarity invariance: $A$ and $P^{-1}AP$ share characteristic polynomial, trace, determinant and eigenvalues. Functions of matrices can be defined by $f(A)=P f(D) P^{-1}$ whenever $f$ is defined on the spectrum.')],
      [P('Verify the tenth power two ways with NumPy.'),
       CO(String.raw`import numpy as np
A = np.array([[2., 1.], [1., 2.]])
P = np.array([[1., 1.], [1., -1.]])
D = np.diag([3., 1.])
print(P @ np.linalg.matrix_power(D, 10) @ np.linalg.inv(P))
print(np.linalg.matrix_power(A, 10))
# [[29525 29524], [29524 29525]] both ways`),
       P('Both computations return the matrix $\\begin{pmatrix}29525&29524\\\\29524&29525\\end{pmatrix}$, confirming the hand calculation.')],
      [P('Diagonalization accelerates repeated matrix multiplication, solves systems of linear differential equations by decoupling them, and underlies spectral clustering and principal component analysis.'),
       LI(['Markov chains: long-run state via powers of a transition matrix.', 'Differential equations: x′ = Ax solved in eigen-coordinates.', 'Graphics: repeated transformations.'])],
      [P('Mistakes include attempting to diagonalize a defective matrix, forgetting that diagonalizability depends on the field (complex eigenvalues may be required), and confusing similarity $P^{-1}AP$ with congruence $P^TAP$.'),
       CA('warning', 'The rotation matrix $\\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}$ is not diagonalizable over $\\mathbb{R}$ (no real eigenvalues) but is diagonalizable over $\\mathbb{C}$ with eigenvalues $\\pm i$.', 'Field matters')],
      [LI(['Why does having n independent eigenvectors guarantee P is invertible?', 'How does diagonalization simplify matrix functions?', 'What is a defective matrix?', 'Which invariants are preserved by similarity?'])],
      [LI(['MIT OpenCourseWare 18.06, diagonalization and powers (video course).', 'OpenStax / LibreTexts Linear Algebra, diagonalization (open textbook).', 'Next topics: the spectral theorem, Jordan form and the SVD.'])],
    ],
  }),

  article({
    id: 'svd', title: 'Singular Value Decomposition', branchId: 'linear-algebra', level: 'Undergraduate 3',
    summary: "The SVD factors any matrix as UΣVᵀ with orthonormal columns and nonnegative singular values. It generalises diagonalization to rectangular or defective matrices and optimises low-rank approximation.",
    prerequisites: ['eigenvalues', 'diagonalization'], tags: ['factorization', 'singular-values', 'low-rank', 'pseudoinverse'],
    simulationId: 'matrix-transform', simCaption: 'See the unit circle map to an ellipse whose semi-axes are the singular values.',
    sections: [
      [P("Eigen-decompositions require a square matrix with enough eigenvectors. The SVD removes both restrictions: every real $m\\times n$ matrix can be written as a rotation, a stretch along coordinate axes, and another rotation."),
       M(String.raw`A=U\Sigma V^T,\qquad U\in\mathbb{R}^{m\times m},\ V\in\mathbb{R}^{n\times n}\ \text{orthogonal}`)],
      [P("The singular values $\\sigma_1\\ge\\sigma_2\\ge\\cdots\\ge0$ are the semi-axes of the ellipse that is the image of the unit sphere. They measure the gain of the map along mutually orthogonal input directions."),
       CA('visual', 'The SVD decomposes a linear map into: rotate the input by $V^T$, stretch by $\\Sigma$, rotate by $U$. The largest singular value is the operator norm $\\max_{\\|x\\|=1}\\|Ax\\|$.', 'Rotate, stretch, rotate')],
      [P("For $A=\\begin{pmatrix}3&0\\\\0&2\\end{pmatrix}$ the singular values are $3$ and $2$; for $A=\\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}$ they are $2$ and $0$ because the map collapses one direction entirely."),
       TB(['Matrix', 'AᵀA eigenvalues', 'Singular values', 'Rank'],
         [['diag(3,2)', '9, 4', '3, 2', '2'],
          ['ones(2,2)', '4, 0', '2, 0', '1'],
          ['zero matrix', '0, 0', '0, 0', '0']])],
      [P("The singular values are $\\sigma_i=\\sqrt{\\lambda_i(A^TA)}$, where $A^TA$ is symmetric positive semidefinite and its eigenvalues are nonnegative. The columns of $V$ are eigenvectors of $A^TA$; the columns of $U$ are $u_i=Av_i/\\sigma_i$ for $\\sigma_i>0$, completed to an orthonormal basis."),
       M(String.raw`A^TAv_i=\sigma_i^2 v_i,\qquad Av_i=\sigma_i u_i`)],
      [P("Derive the decomposition, checking that the constructed $u_i$ are orthonormal and that the product reconstructs $A$."),
       ST('Construction and verification', [
         { title: 'Diagonalise AᵀA', text: 'AᵀA is symmetric and positive semidefinite, so the spectral theorem supplies orthonormal eigenvectors.', math: String.raw`A^TA=V\Lambda V^T,\quad \Lambda=\operatorname{diag}(\sigma_i^2)` },
         { title: 'Define uᵢ and check orthonormality', text: 'For positive σᵢ, uᵢ = Avᵢ/σᵢ; the inner product computation uses the eigen-equation.', math: String.raw`u_i\cdot u_j=\frac{v_i^TA^TAv_j}{\sigma_i\sigma_j}=\frac{\sigma_j^2}{\sigma_i\sigma_j}\delta_{ij}=\delta_{ij}` },
         { title: 'Reconstruct A', text: 'The relations Avᵢ = σᵢuᵢ for positive singular values and Avᵢ = 0 otherwise give AV = UΣ.', math: String.raw`AV=U\Sigma\ \Longrightarrow\ A=U\Sigma V^T` },
         { title: 'Worked rank-one case', text: 'For the all-ones matrix, AᵀA has eigenvalues 4 and 0; take u = v = (1,1)/√2.', math: String.raw`A=2\cdot\binom{1/\sqrt2}{1/\sqrt2}(1/\sqrt2,\,1/\sqrt2)` },
       ]),
       CA('warning', 'The decomposition is not unique when singular values repeat or vanish: you may rotate within equal-singular-value subspaces. Also $\\sigma$ is the square root of an eigenvalue of $A^TA$, not an eigenvalue of $A$ itself (unless $A$ is symmetric positive semidefinite).', 'Non-uniqueness and square roots')],
      [P('Worked numerical factorisation checks.'),
       M(String.raw`A=\begin{pmatrix}3&0\\0&2\end{pmatrix}:\ \Sigma=\begin{pmatrix}3&0\\0&2\end{pmatrix},\ U=I,\ V=I`),
       M(String.raw`\|A\|_2=\sigma_{\max}=3,\qquad \operatorname{rank}A=\#\{\sigma_i>0\}=2`),
       P('For the ones matrix, $\\|A\\|_F=\\sqrt{1+1+1+1}=2=\\sqrt{\\sigma_1^2}$ and the rank is one.')],
      [P('Theorem (existence). Every real matrix has an SVD. Proof sketch: diagonalise $A^TA$ by the spectral theorem, construct $U$ as above, and extend to orthonormal bases.'),
       P('Eckart–Young theorem (statement). The best rank-$k$ approximation to $A$ in the spectral and Frobenius norms is obtained by keeping the $k$ largest singular values: $A_k=\\sum_{i=1}^k\\sigma_i u_i v_i^T$, with error $\\sigma_{k+1}$ in spectral norm. Proof sketch: use the minimax characterisation of singular values.'),
       M(String.raw`\|A-A_k\|_2=\sigma_{k+1}`)],
      [P('Verify the factorisation and the best rank-one approximation numerically.'),
       CO(String.raw`import numpy as np
A = np.array([[1., 1.], [1., 1.]])
U, s, Vt = np.linalg.svd(A)
print(s)                                   # [2. 0.]
print(np.allclose(U @ np.diag(s) @ Vt, A))  # True
A1 = s[0]*np.outer(U[:,0], Vt[0])
print(A1, np.linalg.norm(A-A1, 2))         # ones matrix, error 0`),
       P('A rank-one matrix is exactly captured by its first singular triplet, so the truncation error is $\\sigma_2=0$.')],
      [P('The SVD powers image and data compression (keeping the largest singular values), recommender systems, principal component analysis, least-squares solutions via the pseudoinverse, and latent semantic analysis in natural language processing.'),
       LI(['Compression: store only the top k singular triplets.', 'Least squares: A⁺ = VΣ⁺Uᵀ gives the minimum-norm solution.', 'NLP: reduced-rank representations of term-document matrices.'])],
      [P('Mistakes include equating singular values with eigenvalues of $A$, forgetting that rank counts positive singular values, and truncating without measuring the discarded energy $\\sum_{i>k}\\sigma_i^2$.'),
       CA('warning', 'For a nonsymmetric matrix the singular values need not relate simply to eigenvalues: a nilpotent matrix has all eigenvalues zero but can have positive singular values. SVD measures amplification, not invariant scaling.', 'SVD ≠ eigen-decomposition')],
      [LI(['Why are singular values nonnegative?', 'What does a zero singular value mean geometrically?', 'How does the SVD give the pseudoinverse?', 'Why is keeping the largest singular values optimal?'])],
      [LI(['MIT OpenCourseWare 18.06, the SVD (video course).', 'OpenStax / LibreTexts Linear Algebra, singular value decomposition (open textbook).', 'Next topics: principal component analysis and numerical linear algebra.'])],
    ],
  }),

  article({
    id: 'spectral-theorem', title: 'The Spectral Theorem', branchId: 'linear-algebra', level: 'Undergraduate 3',
    summary: "For real symmetric matrices, eigenvalues are real and eigenvectors can be chosen orthonormal, giving A = QΛQᵀ. This diagonalisation by an orthogonal matrix underlies quadratic forms, PCA and positive definiteness.",
    prerequisites: ['eigenvalues', 'eigenvectors', 'diagonalization'], tags: ['symmetric', 'orthogonal', 'quadratic-form', 'rayleigh-quotient'],
    sections: [
      [P("General matrices may have complex eigenvalues or too few eigenvectors. Symmetric matrices are exceptionally well behaved: they always possess an orthonormal basis of eigenvectors, so the change-of-basis matrix is a rotation (or reflection) with $Q^{-1}=Q^T$."),
       M(String.raw`A=A^T\ \Longrightarrow\ A=Q\Lambda Q^T,\quad Q^TQ=I`)],
      [P("Symmetry means the map stretches space along mutually perpendicular axes without shearing. The quadratic form $x^TAx$ becomes a weighted sum of squares in those axes, which is why ellipses and energy functions simplify dramatically."),
       CA('intuition', "A symmetric matrix is completely described by perpendicular principal axes and their stretch factors. Every quadratic surface can be understood by rotating coordinates into those axes.", 'Principal axes')],
      [P("For $A=\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$ the orthonormal eigenvectors are $q_1=(1,1)/\\sqrt2$ and $q_2=(1,-1)/\\sqrt2$ with eigenvalues $3$ and $1$. The quadratic form is $2x^2+2xy+2y^2=3\\alpha^2+\\beta^2$ in the rotated coordinates."),
       LI(['q₁ direction: coefficient 3.', 'q₂ direction: coefficient 1.', 'The cross term disappears in eigen-coordinates.'])],
      [P("Real spectral theorem (statement): if $A\\in\\mathbb{R}^{n\\times n}$ satisfies $A=A^T$, then all eigenvalues are real and there is an orthonormal basis of eigenvectors; equivalently $A=Q\\Lambda Q^T$ with $Q$ orthogonal. The complex version replaces symmetry by normality $A^*A=AA^*$ and orthogonality by unitarity."),
       M(String.raw`x^TAx=\sum_{i=1}^n\lambda_i(q_i^Tx)^2`)],
      [P("Proof of the three key claims: real eigenvalues, orthogonality across eigenspaces, and existence of a full orthonormal eigenbasis."),
       ST('Proof of the spectral theorem (real case)', [
         { title: 'Eigenvalues are real', text: 'Work over ℂ; symmetry gives A = A* (conjugate transpose).', math: String.raw`\lambda\|v\|^2=v^*Av=(v^*Av)^*=\bar\lambda\|v\|^2\Rightarrow\lambda=\bar\lambda` },
         { title: 'Different eigenspaces are orthogonal', text: 'Compute vᵀAw in two ways for Av = λv, Aw = μw.', math: String.raw`\lambda\,v^Tw=v^TAw=\mu\,v^Tw\Rightarrow(\lambda-\mu)v^Tw=0` },
         { title: 'Induction builds the basis', text: 'A real eigenvalue exists; pick a unit eigenvector, restrict A to its orthogonal complement (invariant because A is symmetric), and repeat.', math: String.raw`\mathbb{R}^n=E_{\lambda_1}\oplus E_{\lambda_1}^{\perp}` },
         { title: 'Repeated eigenvalues', text: 'On each eigenspace the restriction is a scalar multiple of the identity, so any orthonormal basis of that eigenspace consists of eigenvectors; geometric and algebraic multiplicity coincide.', math: String.raw`A=Q\Lambda Q^T` },
       ]),
       CA('warning', 'Symmetry is essential for the orthogonal factorisation. A non-symmetric matrix with real eigenvalues may still be diagonalizable, but its eigenvector matrix need not be orthogonal; a defective matrix cannot be diagonalized at all.', 'Symmetry vs diagonalizability')],
      [P('Worked reconstruction and quadratic-form diagonalisation.'),
       M(String.raw`Q=\frac1{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix},\quad \Lambda=\begin{pmatrix}3&0\\0&1\end{pmatrix}`),
       M(String.raw`Q\Lambda Q^T=\frac12\begin{pmatrix}1&1\\1&-1\end{pmatrix}\begin{pmatrix}3&0\\0&1\end{pmatrix}\begin{pmatrix}1&1\\1&-1\end{pmatrix}=\begin{pmatrix}2&1\\1&2\end{pmatrix}`),
       P('The determinant $3\\cdot1=3$ matches $\\det A=4-1=3$, and the trace $3+1=4$ matches $2+2=4$.')],
      [P('Rayleigh quotient theorem (statement). For symmetric $A$, $\\lambda_{\\min}\\le\\frac{x^TAx}{x^Tx}\\le\\lambda_{\\max}$ for $x\\neq0$, with equality at the corresponding eigenvectors. Proof sketch: expand $x=\\sum c_i q_i$ so the quotient is $\\frac{\\sum\\lambda_i c_i^2}{\\sum c_i^2}$, a weighted average of the eigenvalues.'),
       P('Positive definiteness: a symmetric matrix is positive definite iff all eigenvalues are positive; positive semidefinite iff all are nonnegative. This follows from the expansion of $x^TAx$ in the eigenbasis.')],
      [P('Diagonalise numerically with eigh and check the reconstruction error.'),
       CO(String.raw`import numpy as np
A = np.array([[2., 1.], [1., 2.]])
lam, Q = np.linalg.eigh(A)                 # sorted ascending
print(lam, Q)
print(np.allclose(Q @ np.diag(lam) @ Q.T, A))   # True
print(np.allclose(Q.T @ Q, np.eye(2)))          # True
x = np.array([1., 3.])
print(x @ A @ x / (x @ x), lam[0], lam[1])      # within bounds`),
       P('The computed eigenvalues are $1$ and $3$; the Rayleigh quotient for $(1,3)$ lies between them.')],
      [P('The spectral theorem underlies principal component analysis (covariance matrices are symmetric), the second-derivative test (Hessian eigenvalues classify critical points), quantum mechanics (observables are self-adjoint operators) and graph spectral theory.'),
       LI(['PCA: orthogonal principal directions.', 'Optimisation: Hessian definiteness via eigenvalues.', 'Vibrations: normal modes of symmetric stiffness matrices.'])],
      [P('Mistakes include applying $Q^{-1}=Q^T$ to a non-orthogonal eigenvector matrix, assuming repeated eigenvalues prevent an orthonormal basis (they do not for symmetric matrices), and confusing positive definiteness with positive entries.'),
       CA('warning', 'A matrix with all positive entries need not be positive definite, and a positive definite matrix can have negative off-diagonal entries. Definiteness is about $x^TAx$, not the signs of entries.', 'Definiteness ≠ positive entries')],
      [LI(['Why are eigenvalues of a real symmetric matrix real?', 'How does the expansion xᵀAx = Σλᵢ(qᵢᵀx)² prove positive definiteness?', 'What is the complex analogue of the theorem?', 'Why do eigenvectors for distinct eigenvalues of a symmetric matrix turn out orthogonal?'])],
      [LI(['MIT OpenCourseWare 18.06, the spectral theorem (video course).', 'OpenStax / LibreTexts Linear Algebra, symmetric matrices (open textbook).', 'Next topics: positive definite matrices, the SVD and Rayleigh quotient iteration.'])],
    ],
  }),

  // ── Discrete mathematics ──────────────────────────────────────────────────
  article({
    id: 'mathematical-induction', title: 'Mathematical Induction', branchId: 'discrete-mathematics', level: 'Undergraduate 1',
    summary: "Induction proves a statement for all natural numbers by establishing a base case and an implication from n to n+1. Its logical foundation is the well-ordering property of the natural numbers.",
    prerequisites: [], tags: ['proof', 'natural-numbers', 'well-ordering', 'recurrence'],
    sections: [
      [P("Statements such as 'the sum of the first $n$ integers is $n(n+1)/2$' contain infinitely many cases. Induction replaces an impossible infinite check with two finite tasks: verify the first case and show that any true case forces the next."),
       M(String.raw`P(1)\ \text{true}\quad\text{and}\quad \forall k\ge1:\ P(k)\Rightarrow P(k+1)\ \Longrightarrow\ \forall n\ge1:\ P(n)`)],
      [P("Induction is a row of falling dominoes: the base case tips the first, and the inductive step guarantees each domino tips the next. No actual infinity of checks is required — the implication is a single proof that works for every $k$."),
       CA('intuition', "The inductive hypothesis is not wishful thinking: it is a temporary assumption used to prove an implication. The conclusion that all cases hold follows from the logical rule of induction, which is an axiom of the natural numbers.", 'The domino metaphor, precisely')],
      [P("The dependency chain is linear for weak induction: $1\\to2\\to3\\to\\cdots$. Strong induction instead assumes all smaller cases, giving a branching dependency: to prove $k+1$ you may use any $P(j)$ with $j\\le k$."),
       LI(['Weak induction: assume P(k), prove P(k+1).', 'Strong induction: assume P(1),…,P(k), prove P(k+1).', 'Both are equivalent via well-ordering.'])],
      [P("Let $P(n)$ be a predicate on positive integers. The principle of mathematical induction says: if $P(1)$ holds and, for every $k\\ge1$, $P(k)$ implies $P(k+1)$, then $P(n)$ holds for all $n\\ge1$. Strong induction replaces the hypothesis by $\\forall j\\le k\\ P(j)$."),
       M(String.raw`\bigl[P(1)\wedge\forall k\,(P(k)\Rightarrow P(k+1))\bigr]\Rightarrow\forall n\,P(n)`)],
      [P("Prove the sum formula completely, including the algebra of the inductive step."),
       ST('Proof by induction', [
         { title: 'State the predicate', text: 'Let P(n) be the claim that the first n positive integers sum to n(n+1)/2.', math: String.raw`P(n):\ \sum_{i=1}^n i=\frac{n(n+1)}{2}` },
         { title: 'Base case n = 1', text: 'The left side is 1 and the right side is 1·2/2 = 1.', math: String.raw`\sum_{i=1}^1 i=1=\frac{1\cdot2}{2}` },
         { title: 'Inductive hypothesis', text: 'Assume P(k) holds for an arbitrary k ≥ 1.', math: String.raw`\sum_{i=1}^k i=\frac{k(k+1)}{2}` },
         { title: 'Inductive step', text: 'Add k+1 to both sides and simplify.', math: String.raw`\sum_{i=1}^{k+1}i=\frac{k(k+1)}{2}+(k+1)=\frac{(k+1)(k+2)}{2}` },
         { title: 'Conclude', text: 'The implication holds for all k, so by induction P(n) holds for every n ≥ 1.', math: String.raw`P(k)\Rightarrow P(k+1)\ \Rightarrow\ \forall n\ge1\ P(n)` },
       ]),
       CA('history', 'Explicit induction principles appear in Euclid\'s constructions and were formalised in the nineteenth century by Peano, Dedekind and others as a defining property of the natural numbers.', 'Peano and the axioms')],
      [P('Two more proofs with explicit numbers.'),
       M(String.raw`2^n>n\ (n\ge1):\ 2^{k+1}=2\cdot2^k>2k\ge k+1\ \text{for }k\ge1`),
       M(String.raw`3\mid(n^3-n):\ n^3-n=(n-1)n(n+1),\ \text{a product of three consecutive integers}`),
       P('Check $n=4$: $4^3-4=60$, and $60/3=20$. The factorisation argument gives a direct proof as well as an inductive one.')],
      [P('Theorem (induction from well-ordering, proof sketch). Suppose $P(1)$ and the inductive step hold but some $P(m)$ fails. Let $m$ be the least counterexample; $m\\neq1$ by the base case, so $m-1$ satisfies $P$, and the inductive step forces $P(m)$ — a contradiction.'),
       P('Theorem (strong induction equivalence, proof sketch). Strong induction implies weak induction trivially; conversely define $Q(n)=\\forall j\\le n\\ P(j)$ and apply weak induction to $Q$.'),
       P('Recursion and induction are complementary: a recursive definition builds objects, while induction proves properties of the resulting sequence.')],
      [P('Verify the closed form computationally for the first twenty values.'),
       CO(String.raw`def s(n): return sum(range(1, n+1))
def formula(n): return n*(n+1)//2
print(all(s(n) == formula(n) for n in range(1, 21)))   # True
print([formula(n) for n in range(1, 6)])               # [1, 3, 6, 10, 15]
# induction step algebra check at k = 4
k = 4
print(formula(k) + (k+1), formula(k+1))                # 15 15`),
       P('The test verifies the pattern but is not a proof; the inductive step above is the proof.')],
      [P('Induction proves loop invariants and algorithm correctness, identities about sums and products, divisibility properties, and structural properties of recursively defined data such as trees and lists.'),
       LI(['Computer science: correctness of recursive algorithms.', 'Combinatorics: binomial theorem and counting identities.', 'Graph theory: properties of trees by induction on vertices.'])],
      [P('Common errors include proving $P(n)$ by assuming $P(n)$, forgetting the base case, and using an inductive step that fails for the smallest relevant $k$ (such as a step requiring $k\\ge2$ with a base only at $1$).'),
       CA('warning', 'Writing "assume true for n, then n+1 follows" without showing the algebra proves nothing. The inductive step must be a valid implication for every $k$ in the range, including the boundary.', 'Assume k, prove k+1')],
      [LI(['Why is the base case logically necessary?', 'How does well-ordering justify induction?', 'When would you prefer strong induction?', 'Can induction start at n = 0 or n = 5?'])],
      [LI(['OpenStax / LibreTexts, Mathematical Induction (open textbook).', 'MIT OpenCourseWare 6.042, induction and recursion (video course).', 'Next topics: recurrence relations, combinatorics and the binomial-theorem derivation.'])],
    ],
  }),

  article({
    id: 'combinatorics', title: 'Combinatorics', branchId: 'discrete-mathematics', level: 'Undergraduate 1',
    summary: "Combinatorics counts arrangements and selections using the product and sum rules, permutations and combinations. The binomial theorem and Vandermonde's identity are central counting results.",
    prerequisites: ['mathematical-induction'], tags: ['counting', 'binomial', 'permutation', 'factorial'],
    simulationId: 'binomial-tree', simCaption: 'Walk the counting tree to see why identical choices collapse into binomial coefficients.',
    sections: [
      [P("Counting the outcomes of a password rule, a lottery draw or a network topology by listing them is hopeless. Combinatorics derives counts from the structure of choices: whether order matters, whether repetition is allowed and whether choices are independent."),
       M(String.raw`n!=n(n-1)\cdots1,\qquad \binom{n}{k}=\frac{n!}{k!(n-k)!}`)],
      [P("If one choice offers $a$ options and an independent second offers $b$, there are $ab$ ordered pairs; if the alternatives are mutually exclusive, there are $a+b$ total options. Every counting formula is built from these two rules."),
       CA('intuition', "Multiplication corresponds to 'and', addition to 'or'. Before writing a formula, describe the object as a sequence of decisions and label each decision as independent or exclusive.", 'And multiplies, or adds')],
      [P("A counting tree shows why ordered selections from $n$ distinct objects give $n(n-1)\\cdots(n-k+1)$ leaves at depth $k$: each branch removes one object. Dividing by $k!$ then collapses the $k!$ orderings of the same chosen set into one combination."),
       LI(['Ordered, no repetition: n!/(n−k)!.', 'Unordered, no repetition: C(n,k).', 'Ordered, repetition allowed: nᵏ.'])],
      [P("A permutation is an ordered selection of $k$ from $n$ objects, $P(n,k)=\\frac{n!}{(n-k)!}$; a combination is an unordered selection, $\\binom nk=\\frac{n!}{k!(n-k)!}$ with $\\binom nk=0$ when $k>n$. By convention $0!=1$."),
       M(String.raw`P(n,k)=k!\binom{n}{k}`)],
      [P("Derive the combination formula and the binomial theorem from the product rule and the counting tree."),
       ST('Counting derivation', [
         { title: 'Count ordered selections', text: 'Fill k slots from n distinct objects without repetition: the first has n options, the second n−1, and so on.', math: String.raw`P(n,k)=n(n-1)\cdots(n-k+1)=\frac{n!}{(n-k)!}` },
         { title: 'Correct for overcounting', text: 'Each chosen k-element set appears in k! different orders, so divide by k!.', math: String.raw`\binom{n}{k}=\frac{P(n,k)}{k!}=\frac{n!}{k!(n-k)!}` },
         { title: 'Binomial theorem by counting', text: 'In expanding (x+y)ⁿ, choosing x from k of the n factors and y from the rest gives one term xᵏyⁿ⁻ᵏ; the number of such choices is C(n,k).', math: String.raw`(x+y)^n=\sum_{k=0}^n\binom{n}{k}x^k y^{n-k}` },
         { title: 'Symmetry', text: 'Choosing k objects to include is the same as choosing n−k to exclude.', math: String.raw`\binom{n}{k}=\binom{n}{n-k}` },
       ]),
       CA('history', 'Pascal\'s triangle and the binomial coefficients were studied in India, China and Persia centuries before Blaise Pascal; Pascal popularised the additive recurrence in the seventeenth century.', 'Many discoverers')],
      [P('Worked counts with verified arithmetic.'),
       M(String.raw`\binom52=\frac{5\cdot4}{2}=10,\qquad \binom{20}{2}=\frac{20\cdot19}{2}=190`),
       M(String.raw`26\cdot25\cdot24\cdot23=358800`, "Four-letter passwords with distinct letters."),
       P('The handshake count for 20 people is $\\binom{20}{2}=190$, since each unordered pair corresponds to one handshake.')],
      [P('Vandermonde\'s identity (statement): $\\binom{m+n}{r}=\\sum_{k=0}^r\\binom{m}{k}\\binom{n}{r-k}$ for nonnegative integers. Combinatorial proof sketch: split a set of $m+n$ objects into groups of sizes $m$ and $n$; an $r$-subset is formed by choosing $k$ from the first and $r-k$ from the second, summed over all $k$.'),
       P('The binomial theorem itself is proved by induction in the dedicated derivation, using Pascal\'s identity $\\binom nk+\\binom n{k-1}=\\binom{n+1}{k}$.')],
      [P('Explore the counting tree and verify coefficients numerically.'),
       CO(String.raw`import math
for n in range(5):
    print([math.comb(n, k) for k in range(n+1)])
print(math.factorial(26)//math.factorial(22))     # 358800
# coefficient check of (1+x)^4
print([math.comb(4, k)*2**k for k in range(5)])  # 1,8,24,32,16
print(sum(math.comb(4, k)*2**k for k in range(5)))  # 81 = 3^4`),
       P('The final sum is $3^4=81$, matching the binomial theorem with $x=2$, $y=1$.')],
      [P('Combinatorics counts algorithm possibilities, estimates probabilities of events, analyses network structures, and underlies coding theory and cryptography.'),
       LI(['Probability: counting equally likely outcomes.', 'Algorithm analysis: number of possible inputs or branches.', 'Genetics: counting combinations of alleles.'])],
      [P('Mistakes include treating ordered and unordered selections as interchangeable, forgetting the $k!$ correction, and misapplying the product rule when choices are not independent.'),
       CA('warning', "Passwords allow repeated letters, so the count is $26^4=456{,}976$, not $26\\cdot25\\cdot24\\cdot23=358{,}800$. The two rules produce different counts; identify which applies before computing.", 'Repetition changes the count')],
      [LI(['When should you divide by k!?', 'Why does the binomial theorem involve combinations?', 'How does a counting tree encode the product rule?', 'What is the difference between P(n,k) and nᵏ?'])],
      [LI(['OpenStax / LibreTexts, Combinatorics and Counting (open textbook).', 'MIT OpenCourseWare 6.042, counting and binomial coefficients (video course).', 'Next topics: pigeonhole principle, generating functions and discrete probability.'])],
    ],
  }),

  article({
    id: 'pigeonhole-principle', title: 'The Pigeonhole Principle', branchId: 'discrete-mathematics', level: 'Undergraduate 1',
    summary: "If more objects than boxes are available, some box holds at least two objects. The generalized form quantifies the guaranteed occupancy and yields existence results without constructing the object.",
    prerequisites: [], tags: ['existence', 'counting', 'dirichlet', 'finite-sets'],
    sections: [
      [P("Many questions ask whether something must exist, without asking where it is. If 13 people are assigned 12 birth months, at least two share a month — no information about which people is needed. This is the pigeonhole principle."),
       M(String.raw`n+1\ \text{objects in}\ n\ \text{boxes}\ \Longrightarrow\ \text{some box contains at least }2`)],
      [P("The principle is almost tautological but remarkably powerful: to prove an existence statement, find a finite set of objects and a smaller set of categories, then let counting force a collision. The art lies in choosing the boxes."),
       CA('intuition', "A function from a larger finite set to a smaller finite set cannot be injective. The principle generalises that simple fact and converts it into quantitative guarantees.", 'No injection into a smaller set')],
      [P("Picture $n$ boxes and $n+1$ balls placed one at a time. After filling every box with one ball, a ball remains and must join an occupied box. The generalized picture gives $\\lceil N/k\\rceil$ as the guaranteed occupancy."),
       LI(['N = k + 1 objects, k boxes: at least 2 in one box.', 'N objects, k boxes: at least ⌈N/k⌉ in one box.', 'The principle is non-constructive: it does not say which box.'])],
      [P("Generalized form: if $N$ objects are placed in $k$ boxes, some box contains at least $\\lceil N/k\\rceil$ objects. In function language, if $|A|>|B|$ then no map $f:A\\to B$ is injective; if $|A|=|B|$, injectivity implies bijectivity."),
       M(String.raw`\exists\,\text{box with}\ \ge\left\lceil\frac{N}{k}\right\rceil\ \text{objects}`)],
      [P("Prove both forms by contradiction, using only finite counting."),
       ST('Proof by contradiction', [
         { title: 'Assume the opposite', text: 'Suppose every one of the k boxes contains at most one object.', math: String.raw`\text{in each box: } n_i\le1` },
         { title: 'Count the total', text: 'Summing over k boxes bounds the number of objects by k, contradicting n+1.', math: String.raw`N=\sum_{i=1}^k n_i\le k<k+1=N` },
         { title: 'Generalized case', text: 'If every box had at most ⌈N/k⌉ − 1 objects, the total would be less than N.', math: String.raw`N\le k\left(\left\lceil\frac Nk\right\rceil-1\right)<N` },
         { title: 'Conclude', text: 'The assumption fails, so a sufficiently occupied box must exist.', math: String.raw`\max_i n_i\ge\left\lceil\frac Nk\right\rceil` },
       ]),
       CA('history', 'Peter Gustav Lejeune Dirichlet used the principle in number theory in the 1830s; it is often called Dirichlet\'s box principle in that context.', 'Dirichlet\'s drawers')],
      [P('Worked applications with explicit numbers.'),
       M(String.raw`13\ \text{people},\ 12\ \text{months}\Rightarrow\text{at least }2\text{ share a birth month}`),
       M(String.raw`5\ \text{integers},\ 4\ \text{remainders mod }4\Rightarrow\text{two congruent mod }4`),
       M(String.raw`367\ \text{people},\ 366\ \text{possible birthdays}\Rightarrow\text{at least }2\text{ share a date}`)],
      [P('Dirichlet\'s approximation theorem (statement). For any real $\\alpha$ and positive integer $N$, there exist integers $p,q$ with $1\\le q\\le N$ and $\\left|\\alpha-\\frac pq\\right|\\le\\frac{1}{qN}$. Proof sketch: divide $[0,1)$ into $N$ intervals and consider the $N+1$ fractional parts $\\{0\\alpha\\},\\{1\\alpha\\},\\ldots,\\{N\\alpha\\}$; two lie in the same interval, so their difference is at most $1/N$.'),
       P('The same mechanism proves that among $n+1$ integers there are two whose difference is divisible by $n$ (consider residues modulo $n$).')],
      [P('Simulate birthday collisions and remainder classes.'),
       CO(String.raw`import random
from collections import Counter
for trial in range(3):
    months = [random.randint(1,12) for _ in range(13)]
    print(max(Counter(months).values()))        # always ≥ 2
# fractional parts for Dirichlet: alpha = sqrt(2), N = 10
import math
alpha = math.sqrt(2)
fracs = [(i*alpha) % 1 for i in range(11)]
print(min(abs(fracs[i]-fracs[j]) for i in range(11) for j in range(i)))  # ≤ 0.1`),
       P('The simulated minimum gap between fractional parts is at most $1/10$, as the pigeonhole argument guarantees.')],
      [P('The principle proves hash collisions are unavoidable in finite tables, guarantees duplicate keys in large data sets, establishes existence results in Ramsey theory and number theory, and underlies combinatorial proofs in computer science.'),
       LI(['Hashing: collisions when keys outnumber slots.', 'Number theory: congruences and rational approximation.', 'Graph theory: a graph with enough edges must contain a vertex of high degree.'])],
      [P('Mistakes include counting boxes incorrectly (e.g. forgetting that remainders modulo 4 number four, not five), expecting the principle to identify the duplicated item, and applying it to infinite sets where the finite counting argument fails.'),
       CA('warning', 'The infinite version needs extra care: infinitely many objects in finitely many boxes does force one box to be infinite, but infinitely many objects in infinitely many boxes forces nothing. The finite proof does not transfer automatically.', 'Finite versus infinite')],
      [LI(['Why is the generalized bound ⌈N/k⌉?', 'How do you choose the boxes for a given problem?', 'Does the principle construct the colliding pair?', 'What goes wrong if the number of boxes is infinite?'])],
      [LI(['MIT OpenCourseWare 6.042, the pigeonhole principle (video course).', 'OpenStax / LibreTexts, Discrete Mathematics: pigeonhole principle (open textbook).', 'Next topics: Ramsey theory, hashing and Dirichlet approximation.'])],
    ],
  }),

  article({
    id: 'generating-functions', title: 'Generating Functions', branchId: 'discrete-mathematics', level: 'Undergraduate 3',
    summary: "A generating function encodes a sequence as the coefficients of a power series, turning recurrence relations into algebraic equations. Formal power series make the manipulations rigorous without convergence concerns.",
    prerequisites: ['combinatorics', 'mathematical-induction'], tags: ['power-series', 'recurrence', 'fibonacci', 'convolution'],
    sections: [
      [P("A recurrence such as $F_n=F_{n-1}+F_{n-2}$ defines a sequence step by step, but finding a closed form is harder. Encoding the whole sequence as coefficients of one function turns the recurrence into an equation that can be solved algebraically."),
       M(String.raw`A(x)=\sum_{n\ge0}a_nx^n`),
       P("The ordinary generating function of $(a_n)$ is $A(x)$; the exponential generating function $\\sum a_n x^n/n!$ is used for labelled combinatorial structures.")],
      [P("A generating function is a clothesline on which the sequence hangs: the coefficient of $x^n$ is the $n$th term. Multiplying two generating functions convolves their sequences, which mirrors counting ordered decompositions of a structure."),
       CA('intuition', "Treat $x$ as a marker that tracks size, not necessarily as a number. Most manipulations are valid in the ring of formal power series, so convergence is irrelevant until you actually substitute a numeric $x$.", 'x is a bookkeeping device')],
      [P("The geometric series gives $\\frac{1}{1-x}=1+x+x^2+\\cdots$, so the constant sequence $1,1,1,\\ldots$ is encoded by $1/(1-x)$. Differentiating gives $\\frac{1}{(1-x)^2}=\\sum_{n\\ge0}(n+1)x^n$."),
       TB(['Sequence aₙ', 'Generating function', 'Validity'],
         [['1, 1, 1, …', '1/(1−x)', 'formal or |x| < 1'],
          ['0, 1, 1, 2, 3, 5, …', 'x/(1−x−x²)', 'formal or |x| < 1/φ'],
          ['1, 2, 3, 4, …', '1/(1−x)²', 'formal or |x| < 1'],
          ['binomial coefficients', '(1+x)ⁿ', 'finite polynomial']])],
      [P("The coefficient of $x^n$ in $A(x)$ is denoted $[x^n]A(x)$. Basic operations: $A+B$ adds sequences termwise; $xA$ shifts coefficients right; $\\frac{A(x)-a_0}{x}$ shifts left; $A\'(x)$ sends $a_n$ to $n a_n$; $A(x)B(x)$ gives the convolution $\\sum_{k=0}^n a_k b_{n-k}$."),
       M(String.raw`[x^n]\big(A(x)B(x)\big)=\sum_{k=0}^{n}a_k b_{n-k}`)],
      [P("Derive the Fibonacci generating function from the recurrence, with every algebraic step shown."),
       ST('Fibonacci generating function', [
         { title: 'Define the series and split off initial terms', text: 'The n = 0 term vanishes, leaving a tail starting at n = 2.', math: String.raw`G(x)=\sum_{n\ge0}F_nx^n=x+\sum_{n\ge2}F_nx^n` },
         { title: 'Apply the recurrence', text: 'Replace Fₙ by the sum of the previous two terms and split the sum into two shifted copies of G.', math: String.raw`G(x)-x=\sum_{n\ge2}(F_{n-1}+F_{n-2})x^n=x\sum_{m\ge1}F_mx^m+x^2\sum_{j\ge0}F_jx^j` },
         { title: 'Recognise G', text: 'The two sums equal xG and x²G respectively (the n = 0 term of G is zero).', math: String.raw`G(x)-x=xG(x)+x^2G(x)` },
         { title: 'Solve algebraically', text: 'Rearrange to obtain the rational generating function.', math: String.raw`G(x)=\frac{x}{1-x-x^2}` },
       ]),
       CA('warning', 'The algebraic identity holds formally for all n. If you substitute a real x, the series converges only for $|x|<1/\\varphi\\approx0.618$ (φ is the reciprocal of the dominant root), so never evaluate outside that radius.', 'Formal versus analytic')],
      [P('Worked coefficient extraction and verification.'),
       M(String.raw`[x^n](1+x)^m=\binom{m}{n}`),
       M(String.raw`\sum_{k=0}^{n}a_k\ \leftrightarrow\ \frac{A(x)}{1-x}`),
       P('The Fibonacci sequence begins $0,1,1,2,3,5,8,13,21,34,55$; the coefficient of $x^{10}$ in $x/(1-x-x^2)$ is $F_{10}=55$.')],
      [P('Theorem (convolution, proof). The Cauchy product gives $[x^n]A(x)B(x)=\\sum_{k=0}^n a_k b_{n-k}$, because pairs of indices summing to $n$ contribute exactly once. This is the algebraic form of the product rule for counting.'),
       P('Binet formula (statement): $F_n=\\frac{\\varphi^n-\\psi^n}{\\sqrt5}$, where $\\varphi=\\frac{1+\\sqrt5}{2}$ and $\\psi=\\frac{1-\\sqrt5}{2}$. Proof sketch: factor $1-x-x^2=(1-\\varphi x)(1-\\psi x)$ since $\\varphi+\\psi=1$ and $\\varphi\\psi=-1$, then expand $\\frac{x}{1-x-x^2}=\\frac{1}{\\sqrt5}\\left(\\frac{1}{1-\\varphi x}-\\frac{1}{1-\\psi x}\\right)$ and read off coefficients.'),
       M(String.raw`F_n=\frac{\varphi^n-\psi^n}{\sqrt5},\qquad \varphi=\frac{1+\sqrt5}{2}`)],
      [P('Verify the generating function and Binet formula numerically.'),
       CO(String.raw`import sympy as sp
x = sp.symbols('x')
G = x/(1-x-x**2)
print(sp.series(G, x, 0, 11))                  # coefficients 0,1,1,2,...,55
phi = (1+sp.sqrt(5))/2
psi = (1-sp.sqrt(5))/2
for n in [5, 10, 12]:
    print(n, sp.simplify((phi**n-psi**n)/sp.sqrt(5)))   # 5, 55, 144`),
       P('Binet\'s formula returns $F_5=5$, $F_{10}=55$ and $F_{12}=144$, matching the recurrence.')],
      [P('Generating functions solve recurrence relations, enumerate combinatorial structures (partitions, trees, paths), analyse algorithm running times, and encode probability distributions via probability-generating functions.'),
       LI(['Computer science: analysing recursive algorithms.', 'Combinatorics: counting partitions and trees.', 'Probability: moments from derivatives of the generating function.'])],
      [P('Mistakes include forgetting the initial terms when splitting a recurrence, confusing ordinary and exponential generating functions, and substituting a numeric $x$ outside the radius of convergence.'),
       CA('warning', 'The ordinary generating function of $2^n$ is $1/(1-2x)$, which diverges for $|x|\\ge1/2$. Algebraic manipulations remain valid formally, but evaluating the series at $x=1$ is meaningless.', 'Radius matters for evaluation')],
      [LI(['Why does multiplying generating functions convolve sequences?', 'How do initial conditions appear in the algebra?', 'When is an exponential generating function more natural?', 'How does partial-fraction decomposition reveal a closed form?'])],
      [LI(['MIT OpenCourseWare 6.042, generating functions (video course).', 'OpenStax / LibreTexts, Discrete Mathematics: generating functions (open textbook).', 'Next topics: recurrence relations, partition functions and analytic combinatorics.'])],
    ],
  }),

]

export const P2_DERIVATIONS: Derivation[] = [
  {
    id: 'p2-der-sin-x-over-x',
    title: 'The limit of sin(x)/x from unit-circle geometry',
    topicId: 'limits',
    statement: "For x measured in radians, $\\lim_{x\\to0}\\frac{\\sin x}{x}=1$.",
    problem: 'The quotient is undefined at x = 0 and numerical evaluation near 0 is circular if it relies on calculus. Prove the limit from geometry alone.',
    assumptions: [
      'x is measured in radians, so a sector of angle x and radius 1 has area x/2.',
      '0 < x < π/2 for the geometric inequalities; the two-sided limit follows by evenness.',
      'The cosine function is continuous at 0 (a standard geometric result).',
      'The squeeze theorem for limits is available.',
    ],
    variables: [
      { symbol: 'x', meaning: 'angle in radians, tending to 0' },
      { symbol: 'sin x', meaning: 'half-chord length in the unit circle' },
      { symbol: 'tan x', meaning: 'length of the tangent segment from the point (1,0)' },
    ],
    tools: ['unit-circle area comparison', 'squeeze theorem', 'trigonometric identity sin² + cos² = 1', 'evenness of sin x / x'],
    steps: [
      { title: 'Compare three areas', text: 'On the unit circle with 0 < x < π/2, the triangle with vertices (0,0), (1,0), (cos x, sin x), the circular sector, and the tangent triangle are strictly nested.', math: String.raw`\tfrac12\sin x < \tfrac12 x < \tfrac12\tan x` },
      { title: 'Remove the common factor', text: 'Multiply by 2 and divide by the positive quantity sin x.', math: String.raw`\sin x < x < \tan x\ \Longrightarrow\ 1<\frac{x}{\sin x}<\frac1{\cos x}` },
      { title: 'Invert the inequality', text: 'All terms are positive, so inversion reverses the inequalities and traps the target ratio.', math: String.raw`\cos x<\frac{\sin x}{x}<1` },
      { title: 'Apply the squeeze theorem', text: 'cos x → 1 as x → 0 and the upper bound is the constant 1, so the middle term tends to 1.', math: String.raw`\lim_{x\to0^+}\frac{\sin x}{x}=1` },
      { title: 'Extend to negative x', text: 'The quotient is even, so the left-hand limit equals the right-hand limit.', math: String.raw`\frac{\sin(-x)}{-x}=\frac{\sin x}{x}\ \Longrightarrow\ \lim_{x\to0^-}\frac{\sin x}{x}=1` },
    ],
    result: String.raw`\lim_{x\to0}\frac{\sin x}{x}=1\quad\text{(radians)}`,
    interpretation: 'For small angles the sine of an angle is asymptotically equal to the angle itself: sin x = x + o(x). The ratio tends to 1 even though both numerator and denominator tend to 0.',
    examples: [
      String.raw`\lim_{x\to0}\frac{\sin 3x}{x}=3\lim_{u\to0}\frac{\sin u}{u}=3`,
      String.raw`\lim_{x\to0}\frac{\tan x}{x}=\lim_{x\to0}\frac{\sin x}{x}\cdot\frac1{\cos x}=1`,
      String.raw`\lim_{x\to0}\frac{1-\cos x}{x^2}=\lim_{x\to0}\frac{2\sin^2(x/2)}{x^2}=\frac12`,
    ],
    applications: ['Deriving the derivatives of sin and cos from first principles', 'Small-angle approximations in optics and pendulum models', 'Signal-processing sinc functions and sampling theory'],
    limitations: [
      'Radian measure is essential: in degrees the limit would be π/180.',
      'The squeeze argument uses positivity and therefore handles x > 0 first; evenness supplies the other side.',
      'It gives the leading-order behaviour only; higher-order terms require Taylor expansions.',
    ],
  },

  {
    id: 'p2-der-power-first-principles',
    title: 'Derivative of xⁿ from first principles',
    topicId: 'derivatives',
    statement: String.raw`\frac{d}{dx}x^n=n x^{n-1}\quad\text{for every positive integer }n\text{ and every real }x.`,
    problem: 'Establish the power rule without assuming any differentiation rule, using only the difference quotient and the binomial theorem.',
    assumptions: [
      'n is a positive integer (the binomial theorem applies directly).',
      'The binomial theorem (x + h)ⁿ = Σ C(n,k) xⁿ⁻ᵏ hᵏ holds.',
      'The limit of a polynomial in h is obtained by substitution.',
    ],
    variables: [
      { symbol: 'n', meaning: 'positive integer exponent' },
      { symbol: 'h', meaning: 'increment tending to 0' },
      { symbol: 'C(n,k)', meaning: 'binomial coefficient n!/(k!(n−k)!)' },
    ],
    tools: ['difference quotient', 'binomial theorem', 'limit laws'],
    steps: [
      { title: 'Write the difference quotient', text: 'Insert x + h into the function and subtract f(x).', math: String.raw`\frac{(x+h)^n-x^n}{h}` },
      { title: 'Expand with the binomial theorem', text: 'The k = 0 term cancels with −xⁿ.', math: String.raw`(x+h)^n=\sum_{k=0}^{n}\binom{n}{k}x^{n-k}h^k=x^n+nx^{n-1}h+\sum_{k=2}^{n}\binom{n}{k}x^{n-k}h^k` },
      { title: 'Cancel the common factor h', text: 'Every remaining term contains at least one power of h, so division by h (valid for h ≠ 0) is legitimate.', math: String.raw`\frac{(x+h)^n-x^n}{h}=nx^{n-1}+\sum_{k=2}^{n}\binom{n}{k}x^{n-k}h^{k-1}` },
      { title: 'Take the limit', text: 'All terms with k ≥ 2 contain a positive power of h and vanish.', math: String.raw`\lim_{h\to0}\frac{(x+h)^n-x^n}{h}=nx^{n-1}` },
    ],
    result: String.raw`\frac{d}{dx}x^n=n x^{n-1}\quad(n\in\mathbb{N})`,
    interpretation: 'Differentiation lowers the degree of a monomial by one and multiplies by the old exponent: the leading-order response of xⁿ to a small change in x is n xⁿ⁻¹ times that change.',
    examples: [
      String.raw`\frac{d}{dx}x^5=5x^4,\quad f'(2)=5\cdot16=80`,
      String.raw`\frac{d}{dx}x^3=3x^2,\quad f'(2)=12`,
      String.raw`\frac{d}{dx}x^1=1`,
    ],
    applications: ['Differentiating polynomials term by term', 'Kinematics: derivative of t² gives velocity 2t', 'Sensitivity analysis of power-law models'],
    limitations: [
      'The direct proof covers positive integer exponents only.',
      'Negative integer exponents follow from the quotient rule (for x ≠ 0); rational and real exponents require additional arguments, e.g. writing xᵃ = e^{a ln x} for x > 0.',
      'At x = 0 and n = 1 the derivative exists but the generalisation to negative exponents fails.',
    ],
  },

  {
    id: 'p2-der-chain-rule',
    title: 'The chain rule via differentiability error terms',
    topicId: 'chain-rule',
    statement: 'If g is differentiable at a and f is differentiable at g(a), then the composition f∘g is differentiable at a with derivative f′(g(a))g′(a).',
    problem: 'The informal cancellation of differentials fails when the inner derivative is zero. Give a proof valid without dividing by the inner increment.',
    assumptions: [
      'g is differentiable at a, hence continuous there.',
      'f is differentiable at b = g(a).',
      'Error functions are defined at zero by ε(0) = 0 so they are continuous there.',
    ],
    variables: [
      { symbol: 'h', meaning: 'increment of the input near a' },
      { symbol: 'k = g(a+h) − g(a)', meaning: 'increment of the inner variable, tending to 0' },
      { symbol: 'ε_g, ε_f', meaning: 'error terms vanishing at 0' },
    ],
    tools: ['Carathéodory factorisation of differentiability', 'continuity of differentiable functions', 'limit product rule'],
    steps: [
      { title: 'Factor the inner increment', text: 'Differentiability of g at a gives an exact identity with an error term tending to zero.', math: String.raw`g(a+h)-g(a)=\bigl(g'(a)+\varepsilon_g(h)\bigr)h,\quad\varepsilon_g(h)\to0` },
      { title: 'Factor the outer increment', text: 'Differentiability of f at b gives the analogous identity for increments k.', math: String.raw`f(b+k)-f(b)=\bigl(f'(b)+\varepsilon_f(k)\bigr)k,\quad\varepsilon_f(k)\to0` },
      { title: 'Substitute and divide by h', text: 'Set k = g(a+h) − g(a); differentiability of g ensures k → 0, so ε_f(k) → 0 even when k = 0 along a subsequence.', math: String.raw`\frac{f(g(a+h))-f(g(a))}{h}=\bigl(f'(b)+\varepsilon_f(k)\bigr)\bigl(g'(a)+\varepsilon_g(h)\bigr)` },
      { title: 'Take the limit', text: 'The product of factors tends to the product of the derivatives; no division by k was used.', math: String.raw`(f\circ g)'(a)=f'(g(a))\,g'(a)` },
    ],
    result: String.raw`(f\circ g)'(a)=f'(g(a))\,g'(a)`,
    interpretation: 'A composed map magnifies small changes by the product of the two local magnification factors, with the outer factor evaluated at the inner value.',
    examples: [
      String.raw`\frac{d}{dx}\sin(x^2)=2x\cos(x^2)`,
      String.raw`f(x)=\sqrt{1+x^2},\quad f'(3)=\frac{3}{\sqrt{10}}\approx0.94868`,
      String.raw`\frac{d}{dx}(3x+1)^4=12(3x+1)^3`,
    ],
    applications: ['Implicit differentiation', 'Related rates', 'Backpropagation through composite neural-network layers'],
    limitations: [
      'The proof is for real-valued functions of one real variable; the multivariable version requires the Jacobian and a norm estimate.',
      'It assumes differentiability at the exact points a and g(a); weaker assumptions do not suffice.',
      'Higher derivatives of compositions require Faà di Bruno’s formula, not simply repeated products.',
    ],
  },

  {
    id: 'p2-der-taylor-remainder',
    title: "Taylor's theorem with the Lagrange remainder",
    topicId: 'taylor-series',
    statement: 'If f⁽ⁿ⁾ is continuous on the closed interval between a and x and f⁽ⁿ⁺¹⁾ exists on the open interval between them, then f(x) equals its nth Taylor polynomial plus a remainder of the form f⁽ⁿ⁺¹⁾(ξ)(x−a)ⁿ⁺¹/(n+1)! for some ξ strictly between a and x.',
    problem: 'A truncated Taylor series is useful only with a quantitative error bound. Derive the exact remainder formula from Rolle’s theorem.',
    assumptions: [
      'f⁽ⁿ⁾ is continuous on the closed interval with endpoints a and x.',
      'f⁽ⁿ⁺¹⁾ exists on the corresponding open interval.',
      'x ≠ a; the case x = a is trivial.',
    ],
    variables: [
      { symbol: 'a', meaning: 'centre of the expansion' },
      { symbol: 'x', meaning: 'evaluation point' },
      { symbol: 'ξ', meaning: 'intermediate point guaranteed by Rolle’s theorem' },
      { symbol: 'Rₙ', meaning: 'remainder f(x) − Tₙ(x)' },
    ],
    tools: ['Taylor polynomial definition', "Rolle's theorem", 'repeated differentiation', 'compactness hypotheses'],
    steps: [
      { title: 'Define the remainder and an auxiliary function', text: 'Normalise the error so the auxiliary function vanishes at both endpoints.', math: String.raw`R_n=f(x)-T_n(x),\quad \phi(t)=f(t)-T_n(t)-R_n\frac{(t-a)^{n+1}}{(x-a)^{n+1}}` },
      { title: 'Check the endpoint values', text: 'φ(a) = 0 because Tₙ(a) = f(a), and φ(x) = 0 by the definition of Rₙ. Also φ′(a) = 0.', math: String.raw`\phi(a)=0,\quad\phi(x)=0,\quad\phi'(a)=0` },
      { title: 'Apply Rolle repeatedly', text: 'Rolle on [a, x] gives c₁ with φ′(c₁) = 0; Rolle on [a, c₁] gives c₂ with φ″(c₂) = 0; continuing n+1 times gives ξ with φ⁽ⁿ⁺¹⁾(ξ) = 0.', math: String.raw`\exists\xi\in(a,x):\ \phi^{(n+1)}(\xi)=0` },
      { title: 'Compute the (n+1)st derivative', text: 'The Taylor polynomial has degree n, so its (n+1)st derivative vanishes; the normalised power contributes a constant.', math: String.raw`\phi^{(n+1)}(t)=f^{(n+1)}(t)-\frac{(n+1)!\,R_n}{(x-a)^{n+1}}` },
      { title: 'Solve for the remainder', text: 'Set t = ξ and rearrange.', math: String.raw`R_n=\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1}` },
    ],
    result: String.raw`f(x)=\sum_{k=0}^{n}\frac{f^{(k)}(a)}{k!}(x-a)^k+\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1}` + ', for some ξ between a and x.',
    interpretation: 'The error of the nth Taylor polynomial looks like the first omitted term, with the derivative evaluated at an unknown intermediate point. If f⁽ⁿ⁺¹⁾ is bounded by M on the interval, the error is at most M|x−a|ⁿ⁺¹/(n+1)!.',
    examples: [
      String.raw`e^{0.2}=1+0.2+\frac{0.04}{2}+\frac{0.008}{6}+R_3,\quad |R_3|\le\frac{e^{0.2}(0.2)^4}{24}\approx8.14\times10^{-5}`,
      String.raw`\sin 1=1-\frac16+\frac1{120}-\frac1{5040}+R_7,\quad |R_7|\le\frac{1}{8!}\approx2.48\times10^{-5}`,
      String.raw`T_2(x)=1-\tfrac12x^2\ \text{for }\cos x,\quad \cos(0.1)\approx0.995`,
    ],
    applications: ['Rigorous error bounds for numerical function evaluation', 'Convergence proofs for power series', 'Local linearisation of nonlinear models', 'Newton’s method error analysis'],
    limitations: [
      'The Lagrange form requires the stated differentiability hypotheses; the Cauchy form may be usable under weaker conditions.',
      'The point ξ is generally unknown, so one bounds the derivative rather than computing it exactly.',
      'The theorem does not assert that the infinite Taylor series converges to f; smooth non-analytic functions exist.',
    ],
  },

  {
    id: 'p2-der-ftc',
    title: 'The fundamental theorem of calculus from Riemann sums',
    topicId: 'fundamental-theorem-calculus',
    statement: 'For continuous f on [a, b], the accumulation function A(x) = ∫ₐˣ f(t)dt satisfies A′(x) = f(x) on (a, b), and if F′ = f then ∫ₐᵇ f = F(b) − F(a).',
    problem: 'Connect the limit-of-sums definition of the integral to the derivative, then obtain the practical evaluation formula.',
    assumptions: ['f is continuous on [a, b]', 'F is differentiable with F′ = f on [a, b] (one-sided at endpoints)', 'The integral is the Riemann integral'],
    variables: [
      { symbol: 'A(x)', meaning: 'accumulated signed area from a to x' },
      { symbol: 'h', meaning: 'small increment of the upper limit' },
      { symbol: 'mₕ, Mₕ', meaning: 'minimum and maximum of f on [x, x+h]' },
    ],
    tools: ['additivity of the integral', 'continuity on compact intervals', 'squeeze theorem', 'mean value theorem corollary'],
    steps: [
      { title: 'Express the difference quotient', text: 'Additivity of the integral over adjacent intervals converts the numerator into one short integral.', math: String.raw`\frac{A(x+h)-A(x)}{h}=\frac1h\int_x^{x+h}f(t)\,dt` },
      { title: 'Bound the average value', text: 'Continuity on the tiny closed interval gives minimum mₕ and maximum Mₕ; the average of f lies between them.', math: String.raw`m_h\le\frac1h\int_x^{x+h}f(t)\,dt\le M_h` },
      { title: 'Use continuity at x', text: 'As h → 0, both mₕ and Mₕ tend to f(x), so squeezing gives A′(x) = f(x).', math: String.raw`\lim_{h\to0}\frac{A(x+h)-A(x)}{h}=f(x)` },
      { title: 'Deduce the evaluation formula', text: 'A and F have the same derivative, so A − F is constant; evaluating at a gives the constant −F(a).', math: String.raw`A(b)-F(b)=A(a)-F(a)=-F(a)\Rightarrow\int_a^b f=F(b)-F(a)` },
    ],
    result: String.raw`\frac{d}{dx}\int_a^x f(t)\,dt=f(x),\qquad\int_a^b f(x)\,dx=F(b)-F(a)`,
    interpretation: 'Differentiation undoes accumulation, and accumulation undoes differentiation up to an additive constant. This is why areas can be computed from antiderivatives.',
    examples: [
      String.raw`\int_0^1 x^2\,dx=\left[\frac{x^3}{3}\right]_0^1=\frac13`,
      String.raw`\int_0^\pi\sin x\,dx=[-\cos x]_0^\pi=2`,
      String.raw`\frac{d}{dx}\int_0^{x^2}\sin(t^2)\,dt=2x\sin(x^4)`,
    ],
    applications: ['Computing areas and accumulated quantities', 'Solving differential equations by integration', 'Cumulative distribution functions in probability', 'Work and energy calculations in physics'],
    limitations: [
      'Continuity of f is essential for A′(x) = f(x) at every interior point.',
      'Improper integrals require a limiting argument; the theorem applies on each finite subinterval.',
      'For vector-valued integrands or Lebesgue integration the statement needs appropriate generalisation.',
    ],
  },

  {
    id: 'p2-der-integration-by-parts',
    title: 'Integration by parts from the product rule',
    topicId: 'integration-by-parts',
    statement: 'For continuously differentiable u and v on [a, b], ∫ₐᵇ u v′ = [uv]ₐᵇ − ∫ₐᵇ u′ v.',
    problem: 'Derive a technique for integrating products by reversing the product rule of differentiation.',
    assumptions: ['u and v are continuously differentiable on [a, b]', 'The fundamental theorem of calculus applies to uv'],
    variables: [{ symbol: 'u, v', meaning: 'differentiable functions of x' }, { symbol: 'a, b', meaning: 'integration limits' }],
    tools: ['product rule', 'fundamental theorem of calculus', 'linearity of the integral'],
    steps: [
      { title: 'Start from the product rule', text: 'The derivative of a product splits into two terms.', math: String.raw`(uv)'=u'v+uv'` },
      { title: 'Integrate both sides', text: 'Apply the fundamental theorem to the left-hand side over [a, b].', math: String.raw`u(b)v(b)-u(a)v(a)=\int_a^b u'v\,dx+\int_a^b uv'\,dx` },
      { title: 'Rearrange', text: 'Isolate the integral containing v′.', math: String.raw`\int_a^b u\,v'\,dx=[uv]_a^b-\int_a^b u'v\,dx` },
      { title: 'Illustrate with an improper limit', text: 'For ln x on (0,1], interpret the lower limit as a limit; x ln x → 0.', math: String.raw`\int_0^1\ln x\,dx=\lim_{t\to0^+}\big([x\ln x]_t^1-\int_t^1dx\big)=-1` },
    ],
    result: String.raw`\int u\,dv=uv-\int v\,du\quad\text{(indefinite)},\qquad \int_a^b u v'=[uv]_a^b-\int_a^b u'v`,
    interpretation: 'The formula transfers the derivative from one factor to the other at the cost of a boundary term; it works best when u simplifies on differentiation and v′ is easy to integrate.',
    examples: [
      String.raw`\int_0^1 x e^x\,dx=[xe^x]_0^1-\int_0^1e^x\,dx=e-(e-1)=1`,
      String.raw`\int x\cos x\,dx=x\sin x+\cos x+C`,
      String.raw`\int_0^1\ln x\,dx=-1`,
    ],
    applications: ['Computing moments E[X] = ∫x f(x)dx', 'Fourier coefficient calculations', 'Deriving reduction formulas', 'Solving linear differential equations with integrating factors'],
    limitations: [
      'Differentiability and integrability hypotheses must hold on the interval, including improper endpoints.',
      'A poor choice of u can produce an integral no simpler than the original or a circular identity.',
      'Repeated application terminates only for special families such as polynomials times cyclic functions.',
    ],
  },

  {
    id: 'p2-der-eigen-2x2',
    title: 'The eigenvalue equation for a 2×2 matrix',
    topicId: 'eigenvalues',
    statement: 'For A = [[a, b], [c, d]], the eigenvalues are the roots of λ² − (a+d)λ + (ad − bc) = 0, i.e. λ± = (τ ± √(τ² − 4δ))/2 with τ = tr A and δ = det A.',
    problem: 'Find the scalars for which a 2×2 matrix acts as pure scaling along some nonzero direction, and relate them to trace and determinant.',
    assumptions: ['A is a real 2×2 matrix', 'A nonzero eigenvector must exist', 'The characteristic polynomial may have complex roots'],
    variables: [
      { symbol: 'a, b, c, d', meaning: 'entries of A' },
      { symbol: 'τ = a + d', meaning: 'trace of A' },
      { symbol: 'δ = ad − bc', meaning: 'determinant of A' },
      { symbol: 'λ', meaning: 'eigenvalue' },
    ],
    tools: ['determinants', 'singularity criterion', 'quadratic formula', 'Vieta’s relations'],
    steps: [
      { title: 'Rewrite the eigen-equation', text: 'A nonzero solution requires a singular coefficient matrix.', math: String.raw`A v=\lambda v\iff(A-\lambda I)v=0` },
      { title: 'Set the determinant to zero', text: 'Expand the 2×2 determinant of A − λI.', math: String.raw`\det\begin{pmatrix}a-\lambda&b\\c&d-\lambda\end{pmatrix}=(a-\lambda)(d-\lambda)-bc=0` },
      { title: 'Express in invariants', text: 'Collect terms to expose trace and determinant.', math: String.raw`\lambda^2-(a+d)\lambda+(ad-bc)=\lambda^2-\tau\lambda+\delta=0` },
      { title: 'Solve the quadratic', text: 'Apply the quadratic formula; the discriminant determines whether the eigenvalues are real and distinct.', math: String.raw`\lambda_{\pm}=\frac{\tau\pm\sqrt{\tau^2-4\delta}}{2}` },
      { title: 'Check with A = [[2,1],[1,2]]', text: 'Here τ = 4 and δ = 3, so the discriminant is 16 − 12 = 4 and the eigenvalues are 3 and 1.', math: String.raw`\lambda_{\pm}=\frac{4\pm2}{2}=3,1` },
    ],
    result: String.raw`\lambda_{\pm}=\frac{\operatorname{tr}A\pm\sqrt{(\operatorname{tr}A)^2-4\det A}}{2}`,
    interpretation: 'The spectrum of a 2×2 matrix depends only on trace and determinant. The discriminant τ² − 4δ is nonnegative for real symmetric matrices, guaranteeing real eigenvalues there.',
    examples: [
      'A = [[2,1],[1,2]]: eigenvalues 3 and 1, with eigenvectors (1,1) and (1,−1).',
      'A = [[1,2],[2,1]]: τ = 2, δ = −3, eigenvalues 3 and −1.',
      'A = [[0,−1],[1,0]]: τ = 0, δ = 1, eigenvalues ±i (complex).',
    ],
    applications: ['Stability analysis of 2D linear systems', 'Solving coupled linear differential equations', 'Principal directions of 2D covariance matrices'],
    limitations: [
      'The formula applies to 2×2 matrices; larger matrices require higher-degree polynomials that generally cannot be solved in radicals.',
      'A repeated root may have only one independent eigenvector (defective matrix).',
      'Real entries do not guarantee real eigenvalues; complex roots occur when τ² < 4δ.',
    ],
  },

  {
    id: 'p2-der-gram-schmidt',
    title: 'Gram–Schmidt orthonormalisation',
    topicId: 'basis-dimension',
    statement: 'Given a linearly independent list v₁, …, vₙ in an inner-product space, the Gram–Schmidt process produces an orthonormal list e₁, …, eₙ spanning the same subspace.',
    problem: 'Turn an arbitrary basis into an orthonormal basis without changing the subspace it spans.',
    assumptions: ['The input vectors are linearly independent', 'The inner product is positive definite', 'The field is ℝ (with conjugation adjusted for ℂ)'],
    variables: [
      { symbol: 'vₖ', meaning: 'input basis vector' },
      { symbol: 'uₖ', meaning: 'orthogonalised, unnormalised vector' },
      { symbol: 'eₖ', meaning: 'final unit vector' },
    ],
    tools: ['orthogonal projection', 'inner product', 'induction on the list index'],
    steps: [
      { title: 'Initialise', text: 'Normalise the first vector.', math: String.raw`u_1=v_1,\qquad e_1=\frac{u_1}{\|u_1\|}` },
      { title: 'Subtract previous projections', text: 'Remove from vₖ every component in the directions already processed.', math: String.raw`u_k=v_k-\sum_{j=1}^{k-1}\frac{\langle v_k,e_j\rangle}{\langle e_j,e_j\rangle}e_j` },
      { title: 'Normalise', text: 'Divide by the norm; independence guarantees uₖ ≠ 0.', math: String.raw`e_k=\frac{u_k}{\|u_k\|}` },
      { title: 'Prove orthogonality', text: 'For j < k, inner-product linearity gives ⟨uₖ, eⱼ⟩ = ⟨vₖ, eⱼ⟩ − ⟨vₖ, eⱼ⟩ = 0.', math: String.raw`\langle u_k,e_j\rangle=\langle v_k,e_j\rangle-\frac{\langle v_k,e_j\rangle}{\langle e_j,e_j\rangle}\langle e_j,e_j\rangle=0` },
      { title: 'Work an example', text: 'For v₁ = (1,1,0), v₂ = (1,0,1) the projection coefficient is 1/2.', math: String.raw`u_2=(1,0,1)-\frac12(1,1,0)=\left(\tfrac12,-\tfrac12,1\right),\quad \langle u_2,u_1\rangle=0` },
    ],
    result: String.raw`e_k=\frac{v_k-\sum_{j<k}\operatorname{proj}_{e_j}(v_k)}{\big\|v_k-\sum_{j<k}\operatorname{proj}_{e_j}(v_k)\big\|}`,
    interpretation: 'Each step subtracts the part of the new vector lying in the previously built subspace, leaving only the genuinely new direction; the resulting basis makes distance and projection computations trivial.',
    examples: [
      'v₁ = (1,1,0), v₂ = (1,0,1) gives e₁ = (1,1,0)/√2 and e₂ = (1/2,−1/2,1)/√(3/2).',
      'The standard basis of ℝⁿ is already orthonormal; Gram–Schmidt returns it unchanged.',
      'Applied to {1, x, x²} with ⟨f,g⟩ = ∫₀¹ f g, it yields shifted Legendre polynomials up to scaling.',
    ],
    applications: ['QR decomposition of matrices', 'Constructing orthonormal bases in function spaces', 'Least-squares numerical algorithms', 'Signal orthogonalisation'],
    limitations: [
      'Linearly dependent input produces uₖ = 0 and the process breaks down.',
      'Classical Gram–Schmidt can be numerically unstable; modified Gram–Schmidt or Householder methods are preferred in floating point.',
      'The resulting basis depends on the order of the input vectors.',
    ],
  },

  {
    id: 'p2-der-binomial-induction',
    title: 'The binomial theorem by mathematical induction',
    topicId: 'mathematical-induction',
    statement: 'For every integer n ≥ 0 and all commuting x, y, (x + y)ⁿ = Σₖ₌₀ⁿ C(n,k) xᵏ yⁿ⁻ᵏ.',
    problem: 'Prove the binomial expansion for all n by induction, using Pascal’s identity to pass from n to n + 1.',
    assumptions: ['n is a nonnegative integer', 'x and y commute (e.g. real or complex numbers)', 'Binomial coefficients satisfy Pascal’s identity'],
    variables: [
      { symbol: 'n', meaning: 'exponent and induction index' },
      { symbol: 'k', meaning: 'summation index, 0 ≤ k ≤ n' },
      { symbol: 'C(n,k)', meaning: 'binomial coefficient n!/(k!(n−k)!)' },
    ],
    tools: ['mathematical induction', 'Pascal’s identity', 'distributivity of multiplication'],
    steps: [
      { title: 'Base case', text: 'For n = 0, both sides equal 1.', math: String.raw`(x+y)^0=1=\binom00x^0y^0` },
      { title: 'Inductive hypothesis', text: 'Assume the expansion holds for exponent n.', math: String.raw`(x+y)^n=\sum_{k=0}^n\binom nk x^k y^{n-k}` },
      { title: 'Multiply by (x + y)', text: 'Distribute and shift indices to collect like powers.', math: String.raw`(x+y)^{n+1}=\sum_{k=0}^n\binom nk x^{k+1}y^{n-k}+\sum_{k=0}^n\binom nk x^k y^{n+1-k}` },
      { title: 'Apply Pascal’s identity', text: 'The interior coefficients combine; the endpoints come from C(n,0) = C(n,n) = 1.', math: String.raw`\binom nk+\binom n{k-1}=\binom{n+1}{k}` },
      { title: 'Conclude', text: 'The formula holds for n+1, so induction proves it for all n ≥ 0.', math: String.raw`(x+y)^{n+1}=\sum_{k=0}^{n+1}\binom{n+1}{k}x^k y^{n+1-k}` },
    ],
    result: String.raw`(x+y)^n=\sum_{k=0}^{n}\binom{n}{k}x^k y^{n-k}`,
    interpretation: 'The coefficient of xᵏyⁿ⁻ᵏ counts the number of ways to choose x from k of the n factors, giving a combinatorial meaning to each algebraic term.',
    examples: [
      String.raw`(x+y)^3=x^3+3x^2y+3xy^2+y^3`,
      String.raw`(2+1)^4=1+8+24+32+16=81=3^4`,
      String.raw`(1+x)^5=1+5x+10x^2+10x^3+5x^4+x^5`,
    ],
    applications: ['Expanding polynomials efficiently', 'Counting subsets in combinatorics', 'Probability mass of binomial random variables', 'Deriving the power rule by induction'],
    limitations: [
      'The theorem requires commuting variables; noncommuting objects need q-binomial or word-counting generalisations.',
      'The proof is for integer exponents; general exponents require infinite series and convergence conditions.',
      'Pascal’s identity must be verified algebraically before use.',
    ],
  },

  {
    id: 'p2-der-fibonacci-gf',
    title: 'The generating function for the Fibonacci sequence',
    topicId: 'generating-functions',
    statement: 'With F₀ = 0, F₁ = 1 and Fₙ = Fₙ₋₁ + Fₙ₋₂ for n ≥ 2, the ordinary generating function is G(x) = x/(1 − x − x²).',
    problem: 'Convert a second-order linear recurrence into an algebraic equation and extract a closed form for the sequence.',
    assumptions: ['The recurrence holds for all n ≥ 2', 'The generating function is treated formally unless a convergence radius is specified', 'F₀ = 0'],
    variables: [
      { symbol: 'Fₙ', meaning: 'nth Fibonacci number' },
      { symbol: 'G(x)', meaning: 'ordinary generating function Σ Fₙ xⁿ' },
      { symbol: 'φ, ψ', meaning: 'roots of t² − t − 1 = 0' },
    ],
    tools: ['ordinary generating functions', 'index shifting', 'partial fractions', 'geometric series'],
    steps: [
      { title: 'Define the series and split off initial terms', text: 'The n = 0 term vanishes, leaving a tail starting at n = 2.', math: String.raw`G(x)=\sum_{n\ge0}F_nx^n=x+\sum_{n\ge2}F_nx^n` },
      { title: 'Use the recurrence', text: 'Replace Fₙ and split the sum into two shifted copies of G.', math: String.raw`G(x)-x=\sum_{n\ge2}(F_{n-1}+F_{n-2})x^n=xG(x)+x^2G(x)` },
      { title: 'Solve for G', text: 'Collect terms and divide.', math: String.raw`G(x)(1-x-x^2)=x\ \Longrightarrow\ G(x)=\frac{x}{1-x-x^2}` },
      { title: 'Factor the denominator', text: 'Since φ + ψ = 1 and φψ = −1, the denominator factors as (1 − φx)(1 − ψx).', math: String.raw`1-x-x^2=(1-\varphi x)(1-\psi x),\quad\varphi=\frac{1+\sqrt5}{2},\ \psi=\frac{1-\sqrt5}{2}` },
      { title: 'Extract Binet’s formula', text: 'Partial fractions give G = (1/√5)[1/(1−φx) − 1/(1−ψx)], so the coefficient of xⁿ is (φⁿ−ψⁿ)/√5.', math: String.raw`F_n=\frac{\varphi^n-\psi^n}{\sqrt5}` },
    ],
    result: String.raw`G(x)=\frac{x}{1-x-x^2},\qquad F_n=\frac{\varphi^n-\psi^n}{\sqrt5}`,
    interpretation: 'A linear recurrence becomes a rational function; its poles determine the exponential growth rate φ ≈ 1.618. The generating function encodes the entire infinite sequence in one algebraic object.',
    examples: [
      'Coefficients of G: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, …',
      String.raw`F_{10}=55,\quad F_{12}=144`,
      String.raw`\frac{1}{1-x-x^2}\ \text{has coefficients}\ F_{n+1}`,
    ],
    applications: ['Solving linear recurrences', 'Counting tilings and paths', 'Algorithm analysis of recursive procedures', 'Modelling population growth'],
    limitations: [
      'The series converges only for |x| < 1/φ ≈ 0.618; the algebraic identity is valid formally regardless.',
      'The method assumes constant coefficients; variable coefficients lead to differential equations.',
      'Binet’s formula involves irrational numbers but always yields an integer; numerical evaluation needs care for large n.',
    ],
  },
]

export const P2_PROBLEMS: Problem[] = [
  {
    id: 'p2-prob-limit-one-minus-cos',
    title: 'A trigonometric limit by squeeze',
    topicId: 'limits',
    level: 'Undergraduate 1',
    type: 'Computation',
    concepts: ['small-angle limit', 'trigonometric identities', 'squeeze theorem'],
    statement: String.raw`Evaluate $\lim_{x\to0}\frac{1-\cos x}{x^2}$ without L'Hôpital's rule.`,
    hints: ['Use the identity 1 − cos x = 2 sin²(x/2).', 'Write sin(x/2)/(x/2) and use the fundamental limit lim sin u / u = 1.'],
    solution: [
      { title: 'Rewrite the numerator', text: 'The half-angle identity isolates the sine ratio.', math: String.raw`1-\cos x=2\sin^2\frac x2` },
      { title: 'Normalise the denominator', text: 'Express x² in terms of (x/2)² so the standard limit applies.', math: String.raw`\frac{1-\cos x}{x^2}=\frac{2\sin^2(x/2)}{x^2}=\frac12\left(\frac{\sin(x/2)}{x/2}\right)^2` },
      { title: 'Take the limit', text: 'Let u = x/2 → 0; the bracket tends to 1.', math: String.raw`\lim_{x\to0}\frac{1-\cos x}{x^2}=\frac12\cdot1^2=\frac12` },
    ],
    answer: String.raw`\frac12`,
    alternatives: ['Can be obtained from the second-order Taylor expansion cos x = 1 − x²/2 + O(x⁴).'],
    mistakes: ['Using degrees instead of radians changes the answer.', 'Claiming the limit is 0 because 1 − cos 0 = 0.', 'Dropping the factor 1/2 when normalising (x/2)².'],
    further: 'Show that lim (1 − cos x)/x⁴ diverges, or find the next term in the expansion.',
  },
  {
    id: 'p2-prob-continuity-piecewise',
    title: 'Make a piecewise function continuous',
    topicId: 'continuity',
    level: 'Undergraduate 1',
    type: 'Multi-step',
    concepts: ['one-sided limits', 'piecewise definitions', 'matching conditions'],
    statement: 'Find constants a and b for which the function equal to x² for x ≤ 1, to ax + b for 1 < x < 2, and to 3x − 2 for x ≥ 2 is continuous everywhere.',
    hints: ['Continuity at a join requires the two one-sided limits and the function value to agree.', 'You will get two linear equations in a and b.'],
    solution: [
      { title: 'Match at x = 1', text: 'The left limit and the middle branch must both equal f(1) = 1.', math: String.raw`\lim_{x\to1^-}x^2=1,\quad \lim_{x\to1^+}(ax+b)=a+b\ \Rightarrow\ a+b=1` },
      { title: 'Match at x = 2', text: 'The middle branch must meet the right branch value 3·2 − 2 = 4.', math: String.raw`2a+b=3\cdot2-2=4` },
      { title: 'Solve the system', text: 'Subtracting gives a = 3, hence b = −2.', math: String.raw`a=3,\quad b=1-3=-2` },
      { title: 'Verify', text: 'The middle branch is 3x − 2, which matches both neighbours at the joins.', math: String.raw`3\cdot1-2=1\ \checkmark,\qquad 3\cdot2-2=4\ \checkmark` },
    ],
    answer: 'a = 3, b = −2',
    mistakes: ['Matching only one of the two joins.', 'Using f(2) from the middle branch, where the function is not defined.', 'Forgetting that the pieces must agree with the function values, not just with each other.'],
    further: 'Can a and b be chosen so the function is also differentiable at the joins?',
  },
  {
    id: 'p2-prob-derivative-sqrt-first-principles',
    title: 'Derivative of √x from the definition',
    topicId: 'derivatives',
    level: 'Undergraduate 1',
    type: 'Derivation',
    concepts: ['difference quotient', 'rationalisation', 'evaluation at a point'],
    statement: String.raw`Using only the definition of derivative, find $f'(4)$ for $f(x)=\sqrt{x}$.`,
    hints: ['Rationalise the numerator of the difference quotient.', 'Cancel h before taking the limit.'],
    solution: [
      { title: 'Form the difference quotient', text: 'Insert a = 4.', math: String.raw`\frac{\sqrt{4+h}-\sqrt4}{h}=\frac{\sqrt{4+h}-2}{h}` },
      { title: 'Rationalise', text: 'Multiply numerator and denominator by √(4+h) + 2.', math: String.raw`\frac{\sqrt{4+h}-2}{h}\cdot\frac{\sqrt{4+h}+2}{\sqrt{4+h}+2}=\frac{(4+h)-4}{h(\sqrt{4+h}+2)}` },
      { title: 'Cancel and take the limit', text: 'For h ≠ 0 the h factors cancel; the remaining expression is continuous at h = 0.', math: String.raw`\frac{1}{\sqrt{4+h}+2}\ \xrightarrow{h\to0}\ \frac14` },
    ],
    answer: String.raw`f'(4)=\frac14`,
    alternatives: ['The general derivative is f′(x) = 1/(2√x), which gives 1/4 at x = 4.'],
    mistakes: ['Substituting h = 0 before cancelling gives 0/0.', 'Dropping the factor 2 in √(4+h)+2.', 'Confusing f(4) = 2 with f′(4) = 1/4.'],
    further: 'Use the same method to find the derivative of 1/√x at x = 9.',
  },
  {
    id: 'p2-prob-chain-rule-log-sin',
    title: 'A nested chain rule evaluation',
    topicId: 'chain-rule',
    level: 'Undergraduate 2',
    type: 'Computation',
    concepts: ['composition', 'chain rule', 'trigonometric values'],
    statement: String.raw`For $f(x)=\ln\!\big(\sin(x^2)\big)$, compute $f'\!\left(\frac{\sqrt{\pi}}{2}\right)$.`,
    hints: ['Apply the chain rule twice: logarithm, then sine, then the square.', 'At the given point x² = π/4, so cot(x²) = 1.'],
    solution: [
      { title: 'Differentiate layer by layer', text: 'The outer derivative is 1/sin(x²), the middle is cos(x²), the inner is 2x.', math: String.raw`f'(x)=\frac{1}{\sin(x^2)}\cdot\cos(x^2)\cdot 2x=2x\cot(x^2)` },
      { title: 'Evaluate the inner argument', text: 'x = √π/2 gives x² = π/4.', math: String.raw`\left(\frac{\sqrt\pi}{2}\right)^2=\frac\pi4` },
      { title: 'Evaluate the derivative', text: 'cot(π/4) = 1 and 2x = √π.', math: String.raw`f'\!\left(\frac{\sqrt\pi}{2}\right)=2\cdot\frac{\sqrt\pi}{2}\cdot\cot\frac\pi4=\sqrt\pi\approx1.77245` },
    ],
    answer: String.raw`\sqrt{\pi}\approx1.77245`,
    mistakes: ['Forgetting the inner factor 2x.', 'Evaluating cot at x rather than at x².', 'Mixing radian differentiation with degree values.'],
    further: 'Find where f′ is zero or undefined on (0, √π).',
  },
  {
    id: 'p2-prob-taylor-error-exp',
    title: 'Taylor approximation with a rigorous error bound',
    topicId: 'taylor-series',
    level: 'Undergraduate 2',
    type: 'Application',
    concepts: ['Taylor polynomial', 'Lagrange remainder', 'error bound'],
    statement: 'Approximate e^0.2 by the cubic Taylor polynomial about 0, and bound the error using the Lagrange remainder.',
    hints: ['Use e^x = Σ xⁿ/n!.', 'On [0, 0.2] the fourth derivative e^t is at most e^0.2 < 2.'],
    solution: [
      { title: 'Build the cubic polynomial', text: 'All derivatives of e^x at 0 equal 1.', math: String.raw`T_3(0.2)=1+0.2+\frac{0.2^2}{2}+\frac{0.2^3}{6}=1+0.2+0.02+0.0013333=1.2213333` },
      { title: 'Bound the remainder', text: 'R₃ = e^ξ (0.2)⁴/24 for some ξ ∈ (0, 0.2), and e^ξ ≤ e^0.2.', math: String.raw`|R_3|\le\frac{e^{0.2}(0.2)^4}{4!}=\frac{1.2214028\times0.0016}{24}\approx8.14\times10^{-5}` },
      { title: 'Compare with the true value', text: 'The actual error is about 6.94 × 10⁻⁵, smaller than the bound as required.', math: String.raw`e^{0.2}-T_3(0.2)\approx6.94\times10^{-5}<8.14\times10^{-5}` },
    ],
    answer: String.raw`e^{0.2}\approx1.2213333\ \text{with error at most }8.14\times10^{-5}`,
    alternatives: ['Using the bound e^ξ ≤ 2 gives the simpler but weaker bound 1.33 × 10⁻⁴.'],
    mistakes: ['Using the fourth-degree polynomial but the third-degree remainder.', 'Forgetting the factorial in the denominator.', 'Claiming the approximation is exact because four terms were used.'],
    further: 'Determine the smallest n for which the Lagrange bound is below 10⁻⁸.',
  },
  {
    id: 'p2-prob-mvt-ln',
    title: 'Locating the mean value point',
    topicId: 'mean-value-theorem',
    level: 'Undergraduate 2',
    type: 'Application',
    concepts: ['mean value theorem', 'logarithm', 'hypotheses'],
    statement: 'For f(x) = ln x on [1, 3], find the point c guaranteed by the mean value theorem.',
    hints: ['The secant slope is (ln 3)/2.', 'Solve 1/c = (ln 3)/2 and check that c lies in (1, 3).'],
    solution: [
      { title: 'Verify the hypotheses', text: 'ln x is continuous on [1,3] and differentiable on (1,3).', math: String.raw`f'(x)=\frac1x` },
      { title: 'Compute the secant slope', text: 'Use ln 1 = 0 and ln 3 ≈ 1.0986123.', math: String.raw`\frac{\ln3-\ln1}{3-1}=\frac{\ln3}{2}\approx0.549306` },
      { title: 'Solve for c', text: 'Set the derivative equal to the secant slope.', math: String.raw`\frac1c=\frac{\ln3}{2}\ \Rightarrow\ c=\frac{2}{\ln3}\approx1.82048` },
      { title: 'Check the interval', text: '1 < 1.82048 < 3, so the point is admissible.', math: String.raw`c\in(1,3)\ \checkmark` },
    ],
    answer: String.raw`c=\frac{2}{\ln 3}\approx1.82048`,
    mistakes: ['Using f(3)/f(1) instead of the difference quotient.', 'Reporting a value outside the interval.', 'Forgetting to check differentiability on the open interval.'],
    further: 'For which functions on [a, b] is the mean value point unique?',
  },
  {
    id: 'p2-prob-riemann-cubic',
    title: 'Integrating x³ from Riemann sums',
    topicId: 'definite-integrals',
    level: 'Undergraduate 1',
    type: 'Derivation',
    concepts: ['Riemann sum', 'sum of cubes', 'limit'],
    statement: String.raw`Compute $\int_0^2 x^3\,dx$ directly from the definition using right-endpoint Riemann sums.`,
    hints: ['Use Δx = 2/n and right endpoints xᵢ = 2i/n.', 'Use Σᵢ₌₁ⁿ i³ = n²(n+1)²/4.'],
    solution: [
      { title: 'Set up the sum', text: 'Right endpoints on [0,2] with n equal subintervals.', math: String.raw`S_n=\sum_{i=1}^{n}\left(\frac{2i}{n}\right)^3\frac2n=\frac{16}{n^4}\sum_{i=1}^n i^3` },
      { title: 'Insert the sum-of-cubes formula', text: 'The finite sum is exact for every n.', math: String.raw`S_n=\frac{16}{n^4}\cdot\frac{n^2(n+1)^2}{4}=4\frac{(n+1)^2}{n^2}` },
      { title: 'Take the limit', text: 'Expand (n+1)²/n² = 1 + 2/n + 1/n².', math: String.raw`\lim_{n\to\infty}S_n=4=\int_0^2x^3\,dx` },
    ],
    answer: '4',
    alternatives: ['The antiderivative check gives 2⁴/4 = 4.'],
    mistakes: ['Using Δx = 1/n on an interval of length 2.', 'Forgetting the factor (2i/n)³.', 'Using the sum-of-squares formula instead of the sum of cubes.'],
    further: 'Repeat for ∫₀² x⁴ dx using Σ i⁴ = n(n+1)(2n+1)(3n²+3n−1)/30.',
  },
  {
    id: 'p2-prob-ftc-variable-limit',
    title: 'Differentiating an integral with a variable upper limit',
    topicId: 'fundamental-theorem-calculus',
    level: 'Undergraduate 2',
    type: 'Computation',
    concepts: ['fundamental theorem', 'chain rule', 'variable limits'],
    statement: String.raw`Let $G(x)=\int_0^{x^2}\sin(t^2)\,dt$. Compute $G'(1)$.`,
    hints: ['Set A(u) = ∫₀ᵘ sin(t²)dt and use the chain rule on A(x²).', 'sin(1) ≈ 0.841471.'],
    solution: [
      { title: 'Apply FTC with the chain rule', text: 'The derivative of the upper limit multiplies the integrand evaluated there.', math: String.raw`G'(x)=\sin\big((x^2)^2\big)\cdot 2x=2x\sin(x^4)` },
      { title: 'Evaluate at x = 1', text: 'Both x and x⁴ equal 1.', math: String.raw`G'(1)=2\sin1\approx2\times0.841471=1.682942` },
    ],
    answer: String.raw`G'(1)=2\sin 1\approx1.68294`,
    mistakes: ['Forgetting the factor 2x.', 'Writing sin(x²) instead of sin(x⁴) at the upper limit.', 'Differentiating the integrand with respect to x instead of evaluating it.'],
    further: 'Find G′(x) when both limits are functions of x.',
  },
  {
    id: 'p2-prob-ibp-x-exp2',
    title: 'Integration by parts with an exponential',
    topicId: 'integration-by-parts',
    level: 'Undergraduate 1',
    type: 'Computation',
    concepts: ['integration by parts', 'definite integrals', 'exponentials'],
    statement: String.raw`Evaluate $\int_0^1 x e^{2x}\,dx$ exactly.`,
    hints: ['Take u = x and dv = e^{2x}dx.', 'Then v = e^{2x}/2 and du = dx.'],
    solution: [
      { title: 'Choose u and dv', text: 'Differentiating x simplifies it; integrating e^{2x} is immediate.', math: String.raw`u=x,\quad dv=e^{2x}dx\ \Rightarrow\ du=dx,\ v=\tfrac12e^{2x}` },
      { title: 'Apply the formula', text: 'Include the boundary term and simplify the remaining integral.', math: String.raw`\int_0^1xe^{2x}dx=\left[\frac{xe^{2x}}{2}\right]_0^1-\frac12\int_0^1e^{2x}dx` },
      { title: 'Evaluate', text: 'e² ≈ 7.389056, so the exact result is (e² + 1)/4 ≈ 2.097264.', math: String.raw`=\frac{e^2}{2}-\frac{e^2-1}{4}=\frac{e^2+1}{4}\approx2.09726` },
    ],
    answer: String.raw`\frac{e^2+1}{4}\approx2.09726`,
    mistakes: ['Using v = e^{2x} instead of e^{2x}/2.', 'Sign error on the subtracted integral.', 'Dropping the lower-limit contribution (which is zero here).'],
    further: 'Evaluate ∫₀¹ x²e^{2x} dx by applying the method twice.',
  },
  {
    id: 'p2-prob-partial-fraction-decompose',
    title: 'Decompose and integrate a rational function',
    topicId: 'partial-fractions',
    level: 'Undergraduate 1',
    type: 'Multi-step',
    concepts: ['factorisation', 'cover-up method', 'logarithmic integrals'],
    statement: String.raw`Decompose $\frac{5x+1}{x^2-x-2}$ into partial fractions and integrate it.`,
    hints: ['Factor the denominator as (x − 2)(x + 1).', 'Evaluate the numerator identity at x = 2 and x = −1.'],
    solution: [
      { title: 'Factor and set up', text: 'The fraction is proper, so no long division is needed.', math: String.raw`\frac{5x+1}{(x-2)(x+1)}=\frac{A}{x-2}+\frac{B}{x+1}` },
      { title: 'Find the coefficients', text: 'Clear denominators: 5x + 1 = A(x + 1) + B(x − 2).', math: String.raw`x=2:\ 11=3A\Rightarrow A=\tfrac{11}{3};\qquad x=-1:\ -4=-3B\Rightarrow B=\tfrac43` },
      { title: 'Verify the numerator', text: 'Combine over the common denominator.', math: String.raw`\frac{11(x+1)+4(x-2)}{3}=\frac{15x+3}{3}=5x+1` },
      { title: 'Integrate', text: 'Each simple pole gives a logarithm.', math: String.raw`\int\frac{5x+1}{x^2-x-2}dx=\frac{11}{3}\ln|x-2|+\frac43\ln|x+1|+C` },
    ],
    answer: String.raw`\frac{11/3}{x-2}+\frac{4/3}{x+1};\qquad \frac{11}{3}\ln|x-2|+\frac43\ln|x+1|+C`,
    mistakes: ['Using (x − 2)(x + 1) but evaluating at the wrong roots.', 'Omitting absolute values in logarithms.', 'Assuming the numerator must be constant for each term.'],
    further: 'Integrate 1/(x² + 4x + 5) by completing the square.',
  },
  {
    id: 'p2-prob-gradient-directional',
    title: 'Directional derivative and steepest ascent',
    topicId: 'gradient',
    level: 'Undergraduate 2',
    type: 'Computation',
    concepts: ['gradient', 'unit direction', 'Cauchy–Schwarz'],
    statement: String.raw`For $f(x,y)=x^2y+3y^2$, find the directional derivative at $(1,2)$ in the direction $\mathbf{v}=(3,4)$, and the maximum rate of change there.`,
    hints: ['Normalise v to a unit vector.', 'The maximum rate is the norm of the gradient.'],
    solution: [
      { title: 'Compute the gradient', text: 'The partial derivatives are ∂f/∂x = 2xy and ∂f/∂y = x² + 6y.', math: String.raw`\nabla f(1,2)=(2\cdot1\cdot2,\ 1+6\cdot2)=(4,13)` },
      { title: 'Normalise the direction', text: '‖v‖ = 5, so u = (3/5, 4/5).', math: String.raw`\mathbf u=\left(\frac35,\frac45\right)` },
      { title: 'Take the dot product', text: 'The directional derivative is 12/5 + 52/5.', math: String.raw`D_{\mathbf u}f=\nabla f\cdot\mathbf u=\frac{12+52}{5}=\frac{64}{5}=12.8` },
      { title: 'Find the maximum', text: 'The largest rate occurs along the gradient and equals its norm.', math: String.raw`\|\nabla f\|=\sqrt{16+169}=\sqrt{185}\approx13.6015` },
    ],
    answer: String.raw`D_{\mathbf u}f=\frac{64}{5}=12.8,\qquad \max D=\sqrt{185}\approx13.6015`,
    mistakes: ['Using v = (3,4) without normalising, giving 64 instead of 64/5.', 'Reversing the sign of the steepest-ascent direction.', 'Assuming the maximum rate equals a single partial derivative.'],
    further: 'Find all directions in which the directional derivative is zero at (1,2).',
  },
  {
    id: 'p2-prob-eigen-spectrum-2x2',
    title: 'Spectrum and eigenvectors of a 2×2 matrix',
    topicId: 'eigenvalues',
    level: 'Undergraduate 2',
    type: 'Computation',
    concepts: ['characteristic polynomial', 'trace and determinant', 'eigenspaces'],
    statement: String.raw`Find the eigenvalues and a basis eigenvector for each eigenvalue of $A=\begin{pmatrix}4&1\\2&3\end{pmatrix}$.`,
    hints: ['Use the characteristic polynomial λ² − (tr A)λ + det A.', 'Solve (A − λI)v = 0 for each root.'],
    solution: [
      { title: 'Compute invariants', text: 'tr A = 7 and det A = 12 − 2 = 10.', math: String.raw`p_A(\lambda)=\lambda^2-7\lambda+10=(\lambda-5)(\lambda-2)` },
      { title: 'Eigenvector for λ = 5', text: 'A − 5I = [[−1,1],[2,−2]], giving y = x.', math: String.raw`v_5=(1,1),\quad A\binom11=\binom55=5\binom11` },
      { title: 'Eigenvector for λ = 2', text: 'A − 2I = [[2,1],[2,1]], giving 2x + y = 0.', math: String.raw`v_2=(1,-2),\quad A\binom1{-2}=\binom2{-4}=2\binom1{-2}` },
      { title: 'Check invariants', text: 'The eigenvalues sum to 7 and multiply to 10.', math: String.raw`5+2=7=\operatorname{tr}A,\quad 5\cdot2=10=\det A` },
    ],
    answer: 'λ = 5 with eigenvector (1,1); λ = 2 with eigenvector (1,−2)',
    mistakes: ['Using det(A + λI) instead of det(A − λI).', 'Reporting the zero vector as an eigenvector.', 'Forgetting that any nonzero multiple of an eigenvector is valid.'],
    further: 'Compute A¹⁰ using diagonalization and verify the trace identity.',
  },
  {
    id: 'p2-prob-induction-sum-squares',
    title: 'Induction for the sum of squares',
    topicId: 'mathematical-induction',
    level: 'Pre-university',
    type: 'Proof',
    concepts: ['induction', 'finite sums', 'algebraic manipulation'],
    statement: String.raw`Prove by induction that $\sum_{i=1}^n i^2=\frac{n(n+1)(2n+1)}{6}$ for all $n\ge1$.`,
    hints: ['Verify n = 1 numerically.', 'Assume the formula for k and add (k+1)²; factor the result.'],
    solution: [
      { title: 'Base case', text: 'For n = 1 the left side is 1 and the right side is 1·2·3/6 = 1.', math: String.raw`1^2=1=\frac{1\cdot2\cdot3}{6}` },
      { title: 'Inductive hypothesis', text: 'Assume the identity for n = k.', math: String.raw`\sum_{i=1}^k i^2=\frac{k(k+1)(2k+1)}{6}` },
      { title: 'Inductive step', text: 'Add (k+1)² and factor.', math: String.raw`\sum_{i=1}^{k+1}i^2=\frac{k(k+1)(2k+1)}{6}+(k+1)^2=\frac{(k+1)\big(k(2k+1)+6(k+1)\big)}{6}` },
      { title: 'Simplify', text: 'The bracket equals (k+2)(2k+3).', math: String.raw`k(2k+1)+6(k+1)=2k^2+7k+6=(k+2)(2k+3)` },
      { title: 'Conclude', text: 'The formula holds for k+1, so induction applies.', math: String.raw`\sum_{i=1}^{k+1}i^2=\frac{(k+1)(k+2)(2k+3)}{6}` },
    ],
    answer: String.raw`\sum_{i=1}^n i^2=\frac{n(n+1)(2n+1)}{6}\ \text{for all }n\ge1`,
    alternatives: ['A combinatorial proof counts triples (i, j, k) with certain ordering constraints.'],
    mistakes: ['Assuming the formula for k+1 instead of k.', 'Dropping the common factor (k+1).', 'Omitting the base case or using n = 0 when the statement starts at 1.'],
    further: 'Find and prove by induction a formula for Σ i³.',
  },
  {
    id: 'p2-prob-generating-fibonacci',
    title: 'Fibonacci numbers via a generating function',
    topicId: 'generating-functions',
    level: 'Undergraduate 3',
    type: 'Multi-step',
    concepts: ['ordinary generating functions', 'recurrence relations', 'partial fractions', 'Binet formula'],
    statement: 'Derive the ordinary generating function of the Fibonacci sequence (F₀ = 0, F₁ = 1, Fₙ = Fₙ₋₁ + Fₙ₋₂), and use it to compute F₁₂.',
    hints: ['Let G(x) = Σ Fₙ xⁿ and split off the first two terms.', 'Factor 1 − x − x² = (1 − φx)(1 − ψx).'],
    solution: [
      { title: 'Set up the series equation', text: 'Use the recurrence for n ≥ 2 and shift indices.', math: String.raw`G(x)-x=xG(x)+x^2G(x)` },
      { title: 'Solve for G', text: 'Collect terms.', math: String.raw`G(x)=\frac{x}{1-x-x^2}` },
      { title: 'Extract a closed form', text: 'Partial fractions give the coefficient formula; φ = (1+√5)/2, ψ = (1−√5)/2.', math: String.raw`F_n=\frac{\varphi^n-\psi^n}{\sqrt5}` },
      { title: 'Compute F₁₂', text: 'Iterating the recurrence gives 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144.', math: String.raw`F_{10}=55,\ F_{11}=89,\ F_{12}=F_{11}+F_{10}=144` },
    ],
    answer: String.raw`G(x)=\frac{x}{1-x-x^2},\qquad F_{12}=144`,
    alternatives: ['F₁₂ can also be read as the coefficient of x¹² in the Maclaurin expansion of G.'],
    mistakes: ['Starting the series at n = 1 without adjusting the algebra.', 'Forgetting that F₀ = 0.', 'Confusing the recurrence index range (n ≥ 2).'],
    further: 'Find the generating function for the Lucas numbers L₀ = 2, L₁ = 1.',
  },
]
