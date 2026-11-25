// ─────────────────────────────────────────────────────────────────────────────
// MATHVERSE — Part IV content: applied, computational, and frontier mathematics.
// Twenty-four canonical topics, eight rigorous derivations, twelve problems.
// All LaTeX is written with String.raw so backslashes survive verbatim.
// ─────────────────────────────────────────────────────────────────────────────

import type { Topic, Derivation, Problem } from '../lib/types'

export const P4_TOPICS: Topic[] = [
  // ── Numerical analysis ─────────────────────────────────────────────────────
  {
    id: 'root-finding',
    title: 'Root Finding: Bracketing, Fixed Points, and Trust',
    branchId: 'numerical-analysis',
    level: 'Undergraduate 2',
    summary: 'Root finding solves $f(x)=0$ when no closed form exists, by converting a continuous search into a sequence of provably shrinking intervals or fixed-point iterations. The central tension is reliability versus speed: bracketing methods never lose a root, while open methods converge fast but can diverge catastrophically.',
    prerequisites: ['limits', 'continuity', 'derivatives'],
    tags: ['root finding', 'bisection', 'fixed point', 'error bounds', 'floating point'],
    status: 'Complete',
    simulationIds: ['bisection-visual'],
    derivationIds: ['p4-der-newton-quadratic'],
    problemIds: ['p4-prob-bisection-count', 'p4-prob-fixed-point-rate'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: 'Given a function $f$ supplied as a black box (a simulation, a physical measurement, a complicated formula), find $x^*$ with $f(x^*)=0$. Closed-form formulas exist for polynomials of degree at most four and for a handful of special functions; for $f(x)=x^3-x-2$ or $f(x)=\\cos x-x$ or a CFD residual, we must iterate. Root finding is the workhorse inside almost every larger numerical algorithm: optimisation solves $\\nabla f(x)=0$, ODE solvers solve implicit stage equations, and pricing models invert implied volatility.' },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'callout', tone: 'intuition', title: 'Two philosophies', text: 'Bracketing keeps two points on opposite sides of the axis and cuts the interval in half: slow, but a sign change witnessed by continuity can never be lost. Open methods extrapolate using local geometry: fast, but with no safety net. Most production software combines both — try a fast step, fall back to a bracket when the step leaves the trusted region.' },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'callout', tone: 'visual', title: 'Zooming toward an axis crossing', text: 'Plot $y=f(x)$ and the $x$-axis. Bisection paints an interval whose endpoints straddle the crossing, then keeps the half that still straddles it. On the screen the interval shrinks by a factor of two per step, like a zoom lens; on a log scale its length falls as a straight line of slope $-\\log_{10} 2 \\approx -0.301$ per iteration.' },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'math', latex: String.raw`$\text{A root (zero) of }f:D\subseteq\mathbb{R}\to\mathbb{R}\text{ is }x^*\in D\text{ with }f(x^*)=0.$`, display: true, caption: 'The target equation.' },
      { kind: 'math', latex: String.raw`$[a,b]\text{ brackets a root if }f(a)f(b)<0;\qquad e_n=|x_n-x^*|,\qquad e_n^{\text{bound}}=\frac{b-a}{2^n}.$`, display: true, caption: 'Bracket and bisection error bound.' },
      { kind: 'math', latex: String.raw`$x_{n+1}=g(x_n),\qquad x^*=g(x^*)\implies \text{fixed-point iteration};\quad |g'(x^*)|<1\text{ makes }x^*\text{ attracting.}$`, display: true, caption: 'Fixed-point form and its local attraction condition.' },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'steps', title: 'Bisection convergence and the fixed-point error estimate', items: [
        { title: 'Bracket invariance', text: 'Assume $f$ is continuous and $f(a)f(b)<0$. By the intermediate value theorem a root lies in $[a,b]$. Set $m=(a+b)/2$. If $f(a)f(m)<0$, replace $b$ by $m$; otherwise replace $a$ by $m$. The new interval still has opposite signs at its endpoints, so it still contains a root.', math: String.raw`$[a_{n+1},b_{n+1}]\subset[a_n,b_n],\quad f(a_{n+1})f(b_{n+1})<0.$` },
        { title: 'Halve the length', text: 'Each step retains exactly one of two halves, so the interval length is halved regardless of the function.', math: String.raw`$b_n-a_n=\frac{b_0-a_0}{2^n},\qquad |x_n-x^*|\le \frac{b_0-a_0}{2^n}.$` },
        { title: 'Stopping criterion', text: 'To guarantee absolute accuracy $\\tau$, solve $(b_0-a_0)/2^n\\le\\tau$, giving $n\\ge\\log_2((b_0-a_0)/\\tau)$ steps, independent of $f$.', math: String.raw`$n\ge \left\lceil\log_2\frac{b_0-a_0}{\tau}\right\rceil.$` },
        { title: 'Fixed-point convergence', text: 'If $g$ is a contraction with constant $L<1$ on an interval containing $x^*$, the mean value theorem gives $|x_{n+1}-x^*|=|g(x_n)-g(x^*)|=|g\'(\\xi)||x_n-x^*|\\le L|x_n-x^*|$.', math: String.raw`$e_n\le L^n e_0,\qquad \text{linear (Q-linear) convergence with rate }L.$` },
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'math', latex: String.raw`$f(x)=x^3-x-2,\quad f(1)=-2<0,\quad f(2)=4>0,\quad m_0=1.5,\quad f(m_0)=-0.125.$`, display: true, caption: 'First bracket and midpoint for $x^3-x-2=0$.' },
      { kind: 'table', headers: ['n', 'interval', 'midpoint $m_n$', '$f(m_n)$'], rows: [
        ['0', '[1, 2]', '1.500000', '-0.125000'],
        ['1', '[1.5, 2]', '1.750000', '+1.609375'],
        ['2', '[1.5, 1.75]', '1.625000', '+0.666016'],
        ['3', '[1.5, 1.625]', '1.562500', '+0.252197'],
        ['4', '[1.5, 1.5625]', '1.531250', '+0.059113'],
        ['5', '[1.5, 1.53125]', '1.515625', '-0.054054'],
        ['6', '[1.515625, 1.53125]', '1.523438', '+0.012250'],
        ['7', '[1.515625, 1.523438]', '1.519531', '-0.010971'],
      ] },
      { kind: 'math', latex: String.raw`$x^*=1.5213797068\ldots,\qquad \frac{1}{2^{10}}=9.765625\times 10^{-4},\qquad \frac{1}{2^{20}}\approx 9.54\times10^{-7}.$`, display: true, caption: 'After 10 bisections the guaranteed error is below $10^{-3}$; after 20 it is below $10^{-6}$.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'math', latex: String.raw`$\text{(IVT)}\ f\in C[a,b],\ f(a)f(b)<0\ \implies\ \exists x^*\in(a,b):f(x^*)=0.$`, display: true, caption: 'The theorem that makes bracketing legitimate.' },
      { kind: 'callout', tone: 'history', title: 'A method that cannot be improved in the worst case', text: 'Bisection is optimal among methods using only sign information: after $n$ evaluations an adversary can keep a root hidden in any remaining interval of length $(b-a)/2^n$. The price is that no use is made of slope information, which is why Newton and secant methods are dramatically faster on smooth functions.' },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'code', language: 'python', caption: 'Bisection with a certified error bound, plus a fixed-point comparison.', code: String.raw`import math

def bisect(f, a, b, tol=1e-12):
    assert f(a) * f(b) < 0
    for n in range(100):
        m = (a + b) / 2
        if f(m) == 0 or (b - a) / 2 < tol:
            return m, n, (b - a) / 2
        if f(a) * f(m) < 0: b = m
        else:                a = m
    raise RuntimeError("no convergence")

f = lambda x: x**3 - x - 2
root, n, bound = bisect(f, 1.0, 2.0)
print(root, n, bound, f(root))   # 1.5213797068, 40, <1e-12, ~0

# Fixed point x = (x+2)^(1/3): g'(root) = 1/(3(root+2)^(2/3)) ~ 0.16
x = 1.5
for k in range(6):
    x = (x + 2) ** (1/3)
    print(k, x, abs(x - root))` },
      { kind: 'sim', sim: 'bisection-visual', caption: 'Watch the bracket shrink by half while the certified error bound falls linearly on a log axis.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        'Implied volatility: invert the Black–Scholes price for $\\sigma$, where no closed-form inverse exists.',
        'Engineering design: solve a residual equation from a finite-element simulation for a load parameter.',
        'Computer graphics: ray–surface intersection via a bracketed parameter along a ray.',
        'Statistics: maximum-likelihood score equations $\\nabla \\ell(\\theta)=0$ for complex hierarchical models.',
        'Astronomy: Kepler equation $M=E-e\\sin E$ solved millions of times per orbit simulation.',
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Sign change is sufficient, not necessary', text: '$f(x)=x^2$ has a root at $0$ but no sign change: bisection cannot even start. Even multiplicities touch the axis without crossing. Also, a discontinuity can produce a sign change with no root (e.g. $1/x$ across zero), so continuity must be checked, not assumed.' },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', items: [
        'Why does halving the interval give a *certified* error bound while two successive Newton iterates usually do not?',
        'A bracket of width $1$ needs how many bisections for $10^{-12}$ accuracy? (Answer: $\\lceil 12\\log_2 10\\rceil=40$.)',
        'Rewrite $x^3-x-2=0$ as two different fixed-point maps; only one converges near the root. Which, and why?',
        'What happens to bisection when $f$ is evaluated in floating point and $|f(m)|$ underflows to zero?',
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'paragraph', text: 'Burden & Faires, *Numerical Analysis*, ch. 2; Higham, *Accuracy and Stability of Numerical Algorithms*, ch. 1–2; Brent, *Algorithms for Minimization Without Derivatives* (the Brent–Dekker hybrid used in scientific libraries).' },
    ],
  },

  {
    id: 'newton-raphson',
    title: 'Newton–Raphson: Quadratic Convergence and Fractal Basins',
    branchId: 'numerical-analysis',
    level: 'Undergraduate 3',
    summary: 'Newton–Raphson linearises a nonlinear equation at the current guess and steps to the zero of that tangent line. Near a simple root the error squares at every step, but the global picture is subtle: basins of attraction can be fractal and a poor start can send the iteration to infinity.',
    prerequisites: ['root-finding', 'derivatives', 'taylor-series'],
    tags: ['Newton method', 'quadratic convergence', 'Newton fractal', 'tangent line', 'complex dynamics'],
    status: 'Complete',
    simulationIds: ['newton-fractal'],
    derivationIds: ['p4-der-newton-quadratic'],
    problemIds: ['p4-prob-newton-sqrt'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: 'We want a root of $f$ faster than bisection can deliver, using the derivative as extra information. Newton\'s idea replaces $f$ near $x_n$ by its tangent line and solves the *linear* problem exactly. The resulting iteration is the default nonlinear solver in optimisation, power-flow analysis, and circuit simulation, and it generalises to systems via the Jacobian.' },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'callout', tone: 'intuition', title: 'Ride the tangent', text: 'At $x_n$ the curve $y=f(x)$ has height $f(x_n)$ and slope $f\'(x_n)$. Follow the tangent down (or up) to where it crosses the axis; that crossing is $x_{n+1}$. If the curve is nearly straight over the step, the new point is almost exactly the root; if curvature is large, the step overshoots.' },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'callout', tone: 'visual', title: 'Tangent zig-zags and a coloured plane', text: 'In one real dimension draw successive tangent lines: each intersects the axis closer to the root, and the error curve bends downward quadratically. In the complex plane colour each starting point $z_0$ by which root $z^3-1=0$ its Newton orbit reaches; the three basins meet along a self-similar boundary — the Newton fractal.' },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'math', latex: String.raw`$x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)},\qquad f'(x_n)\neq 0.$`, display: true, caption: 'Scalar Newton–Raphson iteration.' },
      { kind: 'math', latex: String.raw`$\mathbf{x}_{n+1}=\mathbf{x}_n-J_f(\mathbf{x}_n)^{-1}\mathbf{f}(\mathbf{x}_n),\qquad (J_f)_{ij}=\partial f_i/\partial x_j.$`, display: true, caption: 'Multivariate version: solve $J_f(\\mathbf{x}_n)\\mathbf{s}_n=-\\mathbf{f}(\\mathbf{x}_n)$, then step.' },
      { kind: 'math', latex: String.raw`$e_n=x_n-x^*,\qquad \lim_{n\to\infty}\frac{|e_{n+1}|}{|e_n|^2}=\left|\frac{f''(x^*)}{2f'(x^*)}\right|\ \text{for a simple root.}$`, display: true, caption: 'The asymptotic error constant.' },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'steps', title: 'Taylor expansion gives the Newton update and its quadratic error', items: [
        { title: 'Linearise', text: 'Replace $f$ by the first two terms of its Taylor expansion at $x_n$.', math: String.raw`$f(x_n+h)=f(x_n)+f'(x_n)h+\tfrac12 f''(\xi)h^2.$` },
        { title: 'Solve the linear model', text: 'Dropping the remainder and setting the linear approximation to zero gives the Newton step $h_n$.', math: String.raw`$f(x_n)+f'(x_n)h_n=0\ \implies\ h_n=-\frac{f(x_n)}{f'(x_n)}.$` },
        { title: 'Expand the exact zero', text: 'Let $x^*$ be a simple root. Taylor-expand $0=f(x^*)$ about $x_n$ with $e_n=x_n-x^*$.', math: String.raw`$0=f(x_n)-f'(x_n)e_n+\tfrac12 f''(\xi_n)e_n^2.$` },
        { title: 'Subtract and simplify', text: 'Using $f(x_n)=f\'(x_n)e_n-\\tfrac12 f\'\'(\\xi_n)e_n^2$ in the update yields the error recursion.', math: String.raw`$e_{n+1}=e_n-\frac{f(x_n)}{f'(x_n)}=\frac{f''(\xi_n)}{2f'(x_n)}e_n^2+O(e_n^3).$` },
        { title: 'Read off the order', text: 'Since $e_{n+1}=Ce_n^2+O(e_n^3)$ with $C\\neq0$ at a simple root, convergence is quadratic (Q-order 2); roughly the number of correct digits doubles each step.', math: String.raw`$|e_{n+1}|\approx C|e_n|^2,\quad C=\left|\frac{f''(x^*)}{2f'(x^*)}\right|.$` },
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'math', latex: String.raw`$x_{n+1}=\frac12\left(x_n+\frac{2}{x_n}\right),\qquad x_0=1\ \implies\ 1.5,\ 1.4166667,\ 1.4142157,\ 1.4142135624.$`, display: true, caption: 'Babylonian square root of 2: four iterates give ten correct digits.' },
      { kind: 'table', headers: ['n', '$x_n$', '$e_n=x_n-\\sqrt2$', '$e_n/e_{n-1}^2$'], rows: [
        ['0', '1.0000000000', '$-4.1421\\times10^{-1}$', '—'],
        ['1', '1.5000000000', '$8.5786\\times10^{-2}$', '0.5000'],
        ['2', '1.4166666667', '$2.4531\\times10^{-3}$', '0.3333'],
        ['3', '1.4142156863', '$2.1237\\times10^{-6}$', '0.3532'],
        ['4', '1.4142135624', '$1.5927\\times10^{-12}$', '0.3536'],
      ] },
      { kind: 'math', latex: String.raw`$C=\frac{1}{2\sqrt2}=0.35355339\ldots,\qquad f(x)=x^3-x-2:\ 1.5\to1.5217391304\to1.5213798060\to1.5213797068.$`, display: true, caption: 'The asymptotic constant and the cubic example.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'math', latex: String.raw`$\text{If }f\in C^2,\ f(x^*)=0,\ f'(x^*)\neq0,\text{ and }x_0\text{ is close enough, then }e_{n+1}=O(e_n^2).$`, display: true, caption: 'Local quadratic convergence theorem (a proof sketch is in Derivation p4-der-newton-quadratic).' },
      { kind: 'callout', tone: 'warning', title: 'Local is the key word', text: 'Newton has no global guarantee. For $f(x)=x^3-5x$ starting at $x_0=1$ the iteration cycles between $\\pm1$ forever; at a multiple root ($f\'(x^*)=0$) convergence degrades to linear; and a near-zero derivative produces a huge step. Damped or trust-region Newton methods enforce progress.' },
      { kind: 'callout', tone: 'history', title: 'From Babylon to fractals', text: 'The square-root iteration predates Newton by two millennia (Babylonian clay tablets); Newton published his general method in 1669, and Raphson popularised the fluxion form in 1690. The fractal structure of its complex basins was visualised only in the late twentieth century with computer graphics.' },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'code', language: 'python', caption: 'Newton iteration, error ratios, and the complex Newton fractal for $z^3-1$.', code: String.raw`import numpy as np

def newton(f, df, x, n=8):
    rows = []
    for k in range(n):
        e = x - np.sqrt(2)
        rows.append((k, x, e))
        x = x - f(x) / df(x)
    return rows

for k, x, e in newton(lambda x: x*x - 2, lambda x: 2*x, 1.0):
    print(k, f"{x:.12f}", f"{e:+.3e}")

# Newton fractal: colour z0 by the root reached by z - (z^3-1)/(3z^2)
N = 400
x = np.linspace(-1.5, 1.5, N)
Z = x[:, None] + 1j * x[None, :]
roots = np.array([1, np.exp(2j*np.pi/3), np.exp(4j*np.pi/3)])
for _ in range(50):
    with np.errstate(divide='ignore', invalid='ignore'):
        Z = Z - (Z**3 - 1) / (3 * Z**2)
    Z = np.where(np.isfinite(Z), Z, 1e3)
labels = np.argmin(np.abs(Z[:, :, None] - roots), axis=2)
print("basin fractions:", np.bincount(labels.ravel(), minlength=3) / N**2)` },
      { kind: 'sim', sim: 'newton-fractal', caption: 'Change the starting point and watch which root attracts the orbit; the boundary is fractal.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        'Power-system load flow: solve nonlinear AC balance equations with Newton–Raphson and sparse Jacobians.',
        'Maximum likelihood: Fisher scoring is Newton applied to the score equation $\\nabla\\ell=0$.',
        'Circuit simulation (SPICE): modified nodal analysis linearised by Newton at every time step.',
        'Implicit ODE solvers: each step solves a nonlinear equation by Newton iteration on the stage variables.',
        'Computer graphics and ray tracing: intersection of rays with implicit surfaces.',
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Do not divide by a tiny derivative', text: 'A near-zero $f\'$ produces a gigantic Newton step; safeguard with a line search or bracket. Never stop on $|x_{n+1}-x_n|$ alone near a very flat function: iterate differences can be small while $|f|$ is still large.' },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', items: [
        'Why does a double root destroy quadratic convergence? (Hint: expand $f(x)=(x-x^*)^2h(x)$.)',
        'For $f(x)=x^2-a$, show that the Newton map is the Babylonian average and interpret it geometrically.',
        'Why can two nearby complex starting points converge to different roots after hundreds of iterations?',
        'What is the cost per iteration for a system of $m$ equations, and how is it reduced in quasi-Newton methods?',
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'paragraph', text: 'Devaney, *An Introduction to Chaotic Dynamical Systems*, ch. 6 (Newton fractals); Nocedal & Wright, *Numerical Optimization*, ch. 3–4; Higham, *Accuracy and Stability of Numerical Algorithms*, §5.' },
    ],
  },

  {
    id: 'stability-convergence',
    title: 'Stability and Convergence: Why Algorithms Do Not Explode',
    branchId: 'numerical-analysis',
    level: 'Undergraduate 3',
    summary: 'A numerical method is useful only if errors it creates are controlled (stability) and vanish as the step size tends to zero (convergence). The Dahlquist equivalence theorem links them: for a consistent linear multistep method, zero-stability is exactly what is needed for convergence, while absolute stability governs usable step sizes on stiff problems.',
    prerequisites: ['numerical-errors', 'root-finding', 'numerical-ode'],
    tags: ['stability', 'convergence', 'stability region', 'stiffness', 'Dahlquist'],
    status: 'Complete',
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: 'A discretisation can be algebraically correct yet useless: roundoff and local truncation errors may be amplified until the computed solution bears no relation to the true one. We need predicates that separate "the method approximates the right equation" (consistency), "errors do not blow up over finitely many steps" (zero-stability), and "the global error tends to zero as $h\\to0$" (convergence).' },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'callout', tone: 'intuition', title: 'Three different failure modes', text: 'Consistency asks whether the stencil is a faithful local approximation. Zero-stability asks whether the recurrence has spurious growing modes even with zero forcing. Absolute stability asks whether the method damps decaying modes of the *test equation* $y\'=\\lambda y$ with $\\Re\\lambda<0$. A method can pass the first two and still explode on stiff decay if $h\\lambda$ lies outside its stability region.' },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'callout', tone: 'visual', title: 'Regions in the complex plane', text: 'Plot the set of $z=h\\lambda$ for which the amplification factor $R(z)$ satisfies $|R(z)|\\le1$. Explicit Euler gives a disk of radius 1 centred at $-1$; backward Euler gives the entire left half-plane plus more. The negative real axis intersections $-2$ and $-\\infty$ explain why explicit methods need tiny steps for stiff decay.' },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'math', latex: String.raw`$y_{n+1}=y_n+h f(t_n,y_n)\quad\Longrightarrow\quad R(z)=1+z,\qquad z=h\lambda.$`, display: true, caption: 'Explicit Euler applied to the Dahlquist test equation $y\'=\\lambda y$.' },
      { kind: 'math', latex: String.raw`$\text{Absolute stability: }|R(z)|\le 1;\qquad \text{A-stable: }\{z:\Re z\le0\}\subseteq\mathcal{R}.$`, display: true, caption: 'Stability region and A-stability.' },
      { kind: 'math', latex: String.raw`$\tau_n=\frac{\text{local error}}{h}\to0\ (\text{consistency}),\qquad \max_n|y(t_n)-y_n|\to0\ (h\to0)\ (\text{convergence}).$`, display: true, caption: 'Consistency and convergence.' },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'steps', title: 'Stability region of explicit Euler and the error recursion', items: [
        { title: 'Test equation', text: 'Apply the method to $y\'=\\lambda y$, $y(0)=1$, whose exact solution decays when $\\Re\\lambda<0$.', math: String.raw`$y_{n+1}=y_n+h\lambda y_n=(1+h\lambda)y_n=R(z)y_n.$` },
        { title: 'Amplification after $n$ steps', text: 'Iterating gives $y_n=R(z)^n y_0$, so boundedness requires $|R(z)|\\le1$.', math: String.raw`$|1+z|\le1\iff (x+1)^2+y^2\le1,\quad z=x+iy.$` },
        { title: 'Real decay rates', text: 'For $\\lambda=-a<0$ real, $0<h\\le 2/a$ is required; for $h>2/a$ the numerical solution grows although the exact one decays.', math: String.raw`$|1-ha|\le1\iff h\le \frac{2}{a}.$` },
        { title: 'Global error from local error', text: 'If each step injects local error $O(h^{p+1})$ and the amplification is uniformly bounded by $1+Ch$, Gronwall-type summation over $O(1/h)$ steps gives global error $O(h^p)$.', math: String.raw`$e_{n+1}=R(z)e_n+O(h^{p+1})\ \implies\ \max_n|e_n|=O(h^p).$` },
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'math', latex: String.raw`$y'=-y,\ y(0)=1:\quad y(1)=e^{-1}=0.3678794412.$`, display: true, caption: 'Exact value for comparison.' },
      { kind: 'table', headers: ['$h$', 'Euler value at $t=1$', 'exact', 'absolute error', '$|1-h|$'], rows: [
        ['0.5', '$0.5^{2}=0.25$', '0.367879', '$1.18\\times10^{-1}$', '0.5'],
        ['0.1', '$0.9^{10}=0.348678$', '0.367879', '$1.92\\times10^{-2}$', '0.9'],
        ['0.01', '$0.99^{100}=0.366032$', '0.367879', '$1.85\\times10^{-3}$', '0.99'],
        ['2.5', '$(-1.5)^n$ oscillates and grows', '0.367879', 'unbounded', '1.5'],
      ] },
      { kind: 'math', latex: String.raw`$h=0.1:\ \frac{e_{0.1}}{e_{0.01}}\approx 10.4\ \text{for a tenfold step refinement} \ \Longrightarrow\ \text{observed order }p\approx 1.$`, display: true, caption: 'First-order convergence of explicit Euler.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'math', latex: String.raw`$\text{Dahlquist equivalence: consistent linear multistep method};\ \text{zero-stable}\iff\text{convergent.}$`, display: true, caption: 'The fundamental equivalence (proved for linear multistep methods).' },
      { kind: 'math', latex: String.raw`$\text{Second Dahlquist barrier: an explicit linear multistep method cannot be A-stable;}$$\text{the order of an A-stable linear multistep method is at most }2.$`, display: true, caption: 'Limits on what stability can buy.' },
      { kind: 'callout', tone: 'history', title: 'Germund Dahlquist, 1956–1963', text: 'Dahlquist formalised the test equation, proved the equivalence theorem and the barriers that bear his name. The barriers explain the enduring popularity of implicit Runge–Kutta methods (such as Gauss and Radau schemes), which are A-stable at high order.' },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'code', language: 'python', caption: 'Observe first-order convergence and the stability threshold $h=2$ for $y\'=-y$.', code: String.raw`import numpy as np
exact = np.exp(-1.0)
for h in [0.5, 0.1, 0.05, 0.01, 0.005]:
    y = 1.0
    n = int(round(1.0 / h))
    for _ in range(n):
        y = y * (1 - h)          # explicit Euler, lambda = -1
    print(f"h={h:6.4f}  y={y:.10f}  err={abs(y-exact):.3e}  ratio|R|={abs(1-h):.3f}")
for h in [2.0, 2.1, 3.0]:
    print("h=", h, "amplification", 1 - h, "stable?", abs(1 - h) <= 1)` },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        'Stiff chemical kinetics: reaction rates span many orders of magnitude, forcing implicit solvers.',
        'Circuit transient analysis with fast parasitic time constants.',
        'Climate and weather models: CFL conditions tie explicit time steps to spatial resolution.',
        'Financial PDEs: explicit schemes for Black–Scholes require $\\Delta t=O(\\Delta x^2)$.',
        'Control systems: numerical integrators used inside observers must not inject spurious instability.',
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Stable is not the same as accurate', text: 'A method can be unconditionally stable yet badly wrong for large $h$: backward Euler damps a decaying mode too aggressively. Also, the stability region of a multistep method is defined for the test equation; nonlinear stability (B-stability, L-stability) needs separate analysis.' },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', items: [
        'Why does the explicit Euler region touch the real axis only at $-2$?',
        'Show that backward Euler has $R(z)=1/(1-z)$ and is A-stable.',
        'What does stiffness mean in terms of the ratio of fast and slow time scales?',
        'If halving $h$ reduces the error by a factor of 4, what is the observed order?',
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'paragraph', text: 'Dahlquist & Björck, *Numerical Methods*; Hairer & Wanner, *Solving Ordinary Differential Equations II: Stiff and Differential-Algebraic Problems*; Higham, *Accuracy and Stability of Numerical Algorithms*, ch. 6.' },
    ],
  },

  {
    id: 'ode',
    title: 'Ordinary Differential Equations: Flow, Existence, and Numerical Integration',
    branchId: 'differential-equations',
    level: 'Undergraduate 2',
    summary: 'An ordinary differential equation prescribes a vector field and asks for curves tangent to it. Existence and uniqueness turn that geometric picture into a well-posed initial value problem, while separation of variables, integrating factors, and one-step methods provide the tools to actually find or approximate the trajectories.',
    prerequisites: ['derivatives', 'definite-integrals', 'continuity'],
    tags: ['initial value problem', 'vector field', 'existence uniqueness', 'Euler method', 'phase portrait'],
    status: 'Complete',
    simulationIds: ['ode-flow'],
    problemIds: ['p4-prob-euler-error'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: 'Many laws of nature specify a *rate of change* rather than a trajectory: radioactive decay, cooling, population growth, spring motion, capacitor discharge. An ODE converts such local rules into global predictions. The initial value problem $\\dot{\\mathbf{y}}=\\mathbf{f}(t,\\mathbf{y})$, $\\mathbf{y}(t_0)=\\mathbf{y}_0$ is the mathematical statement of "start here and follow the field".' },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'callout', tone: 'intuition', title: 'A landscape of arrows', text: 'At every point $(t,y)$ attach a small arrow of slope $f(t,y)$. A solution is a curve that is everywhere tangent to these arrows — a streamline of the field. Numerical integration is following the arrow for a short time, then recomputing it: the essence of Euler\'s method.' },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'callout', tone: 'visual', title: 'Slope field and integral curves', text: 'Draw a grid of short line segments with slope $f(t,y)$. Starting from one point, trace the segment directions: distinct integral curves never cross when $f$ is Lipschitz in $y$. For autonomous systems $\\dot{\\mathbf{y}}=\\mathbf{f}(\\mathbf{y})$ the phase portrait reveals fixed points, limit cycles and separatrices.' },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'math', latex: String.raw`$y'=f(t,y),\quad y(t_0)=y_0;\qquad \text{order }=\text{highest derivative appearing.}$`, display: true, caption: 'First-order initial value problem.' },
      { kind: 'math', latex: String.raw`$y(t)=y_0+\int_{t_0}^{t} f(s,y(s))\,ds\quad\Longleftrightarrow\quad y'=f(t,y),\ y(t_0)=y_0.$`, display: true, caption: 'Integral equation equivalent (the basis of Picard iteration).' },
      { kind: 'math', latex: String.raw`$y_{n+1}=y_n+h f(t_n,y_n),\qquad t_n=t_0+nh.$`, display: true, caption: 'Explicit Euler discretisation.' },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'steps', title: 'Separable equations and the Picard–Lindelöf idea', items: [
        { title: 'Separate variables', text: 'For $y\'=g(t)h(y)$ with $h(y)\\neq0$, divide by $h(y)$ and integrate both sides.', math: String.raw`$\frac{dy}{h(y)}=g(t)\,dt\ \implies\ H(y)=\int g(t)\,dt+C,\quad H'=1/h.$` },
        { title: 'Solve the prototype', text: 'For exponential growth $y\'=ky$ we get $\\ln|y|=kt+C$, hence $y=y_0e^{kt}$.', math: String.raw`$y(t)=y_0e^{k(t-t_0)}.$` },
        { title: 'Integral formulation', text: 'Integrate the ODE over $[t_0,t]$; any differentiable solution must satisfy this fixed-point equation.', math: String.raw`$y(t)=y_0+\int_{t_0}^{t}f(s,y(s))\,ds=:\Phi[y](t).$` },
        { title: 'Picard iteration', text: 'Start with $y^{(0)}(t)=y_0$ and iterate; a contraction estimate on a short interval gives existence and uniqueness.', math: String.raw`$y^{(k+1)}=\Phi[y^{(k)}],\qquad \|y^{(k+1)}-y^{(k)}\|_\infty\le \frac{(L T)^k}{k!}M\,T.$` },
        { title: 'Euler from Taylor', text: 'Truncate $y(t+h)=y(t)+h y\'(t)+\\tfrac12h^2 y\'\'(\\xi)$ after the linear term and substitute $y\'=f$.', math: String.raw`$y_{n+1}=y_n+h f(t_n,y_n)+O(h^2).$` },
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'math', latex: String.raw`$y'=y,\ y(0)=1:\quad y(1)=e=2.7182818285.$`, display: true, caption: 'The canonical test problem.' },
      { kind: 'table', headers: ['method', 'step $h$', 'value at $t=1$', 'absolute error'], rows: [
        ['exact', '—', '2.7182818285', '0'],
        ['Euler', '0.1', '$1.1^{10}=2.5937424601$', '$1.2454\\times10^{-1}$'],
        ['Euler', '0.01', '$1.01^{100}=2.7048138294$', '$1.3468\\times10^{-2}$'],
        ['RK4', '0.1', '2.7182818252', '$3.3\\times10^{-9}$'],
        ['Taylor order 4 (one step)', '1', '$1+1+\\frac12+\\frac16+\\frac1{24}=2.7083333333$', '$9.95\\times10^{-3}$'],
      ] },
      { kind: 'math', latex: String.raw`$y'=-0.5y+2,\ y(0)=0:\quad y(t)=4(1-e^{-t/2}),\quad y(2)=4(1-e^{-1})=2.528482235.$`, display: true, caption: 'Cooling toward an equilibrium: solve the homogeneous part plus a particular solution.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'math', latex: String.raw`$\text{Picard–Lindelöf: }f\text{ continuous in }t\text{ and Lipschitz in }y\ \implies\ \exists!\text{ local solution.}$`, display: true, caption: 'Existence and uniqueness.' },
      { kind: 'math', latex: String.raw`$y'=ay+ b\ \implies\ y(t)=\left(y_0+\frac{b}{a}\right)e^{a(t-t_0)}-\frac{b}{a}\quad (a\neq0).$`, display: true, caption: 'Linear constant-coefficient solution formula.' },
      { kind: 'callout', tone: 'history', title: 'From tangent fields to flows', text: 'Euler introduced the step-by-step method in 1768; Cauchy gave the first rigorous existence proof via polygonal approximations; Picard and Lindelöf replaced it with the contraction argument used today. The language of flows and vector fields was systematised by Lie in the nineteenth century.' },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'code', language: 'python', caption: 'Euler and RK4 for $y\'=y$, including the fourth-order Taylor single step.', code: String.raw`import numpy as np

def euler(f, y0, T, h):
    n = int(round(T/h)); y = y0
    for _ in range(n): y += h * f(y)
    return y

def rk4(f, y0, T, h):
    n = int(round(T/h)); y = y0
    for _ in range(n):
        k1 = f(y); k2 = f(y + h*k1/2)
        k3 = f(y + h*k2/2); k4 = f(y + h*k3)
        y += h*(k1 + 2*k2 + 2*k3 + k4)/6
    return y

f = lambda y: y
for h in [0.1, 0.01, 0.001]:
    print(h, euler(f, 1.0, 1.0, h), rk4(f, 1.0, 1.0, h))
print("exact", np.e, "Taylor-4", sum(1/np.math.factorial(k) for k in range(5)))` },
      { kind: 'sim', sim: 'ode-flow', caption: 'Trace solution curves through a vector field and compare Euler, Heun, and RK4 trajectories.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        'Newton\'s law $m\\ddot{x}=F$ written as a first-order system for position and velocity.',
        'Pharmacokinetics: two-compartment models for drug concentration over time.',
        'Epidemiology: the SIR system (see epidemiological-models) is a nonlinear ODE.',
        'Electrical circuits: $LC\\ddot{Q}+RC\\dot{Q}+Q/C=V(t)$.',
        'Orbital mechanics: $N$-body equations integrated with high-order symplectic schemes.',
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Existence is local; uniqueness needs Lipschitz', text: '$y\'=\\sqrt{y}$, $y(0)=0$ has infinitely many solutions because $\\sqrt{y}$ is not Lipschitz at $0$. Finite-time blowup ($y\'=y^2$) is another legitimate phenomenon: a solution may cease to exist after finite time. Do not assume global existence from continuity alone.' },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', items: [
        'Why can two solution curves of a Lipschitz ODE never cross?',
        'Show that the Euler method is exact for $y\'=c$ but not for $y\'=y$.',
        'What is the difference between an autonomous and a non-autonomous ODE?',
        'How does the order of a one-step method relate to the local truncation error?',
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'paragraph', text: 'Teschl, *Ordinary Differential Equations and Dynamical Systems* (free online); Hairer & Wanner, *Solving Ordinary Differential Equations I*; Strogatz, *Nonlinear Dynamics and Chaos*, ch. 2.' },
    ],
  },

  // ── Differential equations ────────────────────────────────────────────────
  {
    id: 'heat-equation',
    title: 'The Heat Equation: Separation, Spectra, and Smoothing',
    branchId: 'differential-equations',
    level: 'Undergraduate 3',
    summary: 'The heat equation $u_t=\\alpha u_{xx}$ models diffusion of temperature, charge, or probability density. Separation of variables diagonalises it into independent decaying sine modes, revealing the defining property of parabolic PDEs: high-frequency structure is smoothed exponentially fast and information propagates instantly.',
    prerequisites: ['ode', 'partial-derivatives', 'fourier-series'],
    tags: ['parabolic PDE', 'separation of variables', 'Fourier sine series', 'maximum principle', 'FTCS'],
    status: 'Complete',
    simulationIds: ['pde-heat'],
    derivationIds: ['p4-der-heat-separation'],
    problemIds: ['p4-prob-heat-decay'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: 'Given an initial temperature distribution along a rod and prescribed boundary temperatures, predict $u(x,t)$ for all later times. The same mathematics governs diffusion of a pollutant, spreading of a probability density (the Fokker–Planck equation), and pricing of options (Black–Scholes becomes a heat equation after a change of variables).' },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'callout', tone: 'intuition', title: 'Curvature drives change', text: 'At a local maximum the profile is concave ($u_{xx}<0$), so $u_t<0$: peaks flatten. At a local minimum it is convex, so the trough fills in. The coefficient $\\alpha$ sets the time scale: a tenfold larger diffusivity makes smoothing ten times faster at a fixed length scale but a hundred times faster for a fixed mode number.' },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'callout', tone: 'visual', title: 'Mode decay as a ladder', text: 'Plot the amplitudes $b_n e^{-\\alpha(n\\pi/L)^2t}$ of the sine modes. The first mode decays slowly, the tenth decays roughly a hundred times faster: $(10/1)^2=100$. Visually the jagged initial profile becomes a smooth single hump almost immediately, while the overall average level persists.' },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'math', latex: String.raw`$u_t=\alpha u_{xx},\quad 0<x<L,\ t>0;\qquad u(0,t)=u(L,t)=0,\quad u(x,0)=f(x).$`, display: true, caption: 'Dirichlet initial–boundary value problem.' },
      { kind: 'math', latex: String.raw`$u(x,t)=\sum_{n=1}^{\infty} b_n e^{-\alpha (n\pi/L)^2 t}\sin\frac{n\pi x}{L},\qquad b_n=\frac{2}{L}\int_0^L f(x)\sin\frac{n\pi x}{L}\,dx.$`, display: true, caption: 'Separation-of-variables solution for homogeneous Dirichlet data.' },
      { kind: 'math', latex: String.raw`$r=\frac{\alpha\Delta t}{\Delta x^2}\le\frac12\quad\text{(FTCS stability)},\qquad u_i^{m+1}=u_i^m+r(u_{i+1}^m-2u_i^m+u_{i-1}^m).$`, display: true, caption: 'Explicit finite-difference scheme and its CFL-type restriction.' },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'steps', title: 'Separation of variables and the decay spectrum', items: [
        { title: 'Assume a product solution', text: 'Look for $u(x,t)=X(x)T(t)$; the linear homogeneous problem lets us build general solutions by superposition.', math: String.raw`$X(x)T'(t)=\alpha X''(x)T(t)\ \implies\ \frac{T'}{\alpha T}=\frac{X''}{X}=-\lambda.$` },
        { title: 'Spatial eigenvalue problem', text: 'The separation constant must be negative for nontrivial solutions satisfying homogeneous Dirichlet conditions; otherwise exponential growth in space violates the boundary data.', math: String.raw`$X''+\lambda X=0,\quad X(0)=X(L)=0\ \implies\ \lambda_n=\left(\frac{n\pi}{L}\right)^2,\ X_n=\sin\frac{n\pi x}{L}.$` },
        { title: 'Temporal decay', text: 'Each mode solves $T_n\'(t)=-\\alpha\\lambda_n T_n$, an ODE of exponential decay.', math: String.raw`$T_n(t)=e^{-\alpha\lambda_n t}=e^{-\alpha (n\pi/L)^2t}.$` },
        { title: 'Fit the initial condition', text: 'Expand $f$ in a Fourier sine series; orthogonality of sines gives the coefficients exactly.', math: String.raw`$\int_0^L\sin\frac{n\pi x}{L}\sin\frac{m\pi x}{L}\,dx=\frac{L}{2}\delta_{nm}\ \implies\ b_n=\frac{2}{L}\int_0^L f(x)\sin\frac{n\pi x}{L}\,dx.$` },
        { title: 'Von Neumann stability of FTCS', text: 'Insert a Fourier mode $u_i^m=\\xi^m e^{i k i\\Delta x}$ into the difference scheme to obtain the amplification factor.', math: String.raw`$\xi=1+r(e^{i\theta}-2+e^{-i\theta})=1-4r\sin^2\frac{\theta}{2};\quad |\xi|\le1\ \forall\theta\iff r\le\frac12.$` },
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'math', latex: String.raw`$L=1,\ \alpha=0.1,\ f(x)=\sin(\pi x)\ \implies\ u(x,t)=\sin(\pi x)e^{-0.1\pi^2 t}.$`, display: true, caption: 'Single-mode initial data: only $b_1=1$ is nonzero.' },
      { kind: 'table', headers: ['$t$', '$u(0.5,t)$', 'fraction of initial', 'interpretation'], rows: [
        ['0', '1.0000000000', '100 %', 'initial peak'],
        ['0.5', '0.6105289944', '61.1 %', 'half decay time $\\approx0.703$'],
        ['1', '0.3727078389', '37.3 %', '$e^{-0.98696}$'],
        ['2', '0.1389111331', '13.9 %', '$e^{-1.97392}$'],
      ] },
      { kind: 'math', latex: String.raw`$f(x)=x(1-x)\ \implies\ b_n=\frac{4(1-(-1)^n)}{n^3\pi^3},\quad b_1=\frac{8}{\pi^3}=0.2580123\ldots$`, display: true, caption: 'Parabolic initial data: only odd modes appear, with coefficients falling as $n^{-3}$.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'math', latex: String.raw`$\text{Maximum principle: }\max_{\bar\Omega\times[0,T]}u=\max_{\partial_p\Omega}u,\qquad \text{i.e. no interior new maxima.}$`, display: true, caption: 'Parabolic maximum principle.' },
      { kind: 'math', latex: String.raw`$\|u(\cdot,t)\|_{L^2}\le e^{-\alpha(\pi/L)^2t}\|f\|_{L^2}\quad\text{(Dirichlet, Poincaré).}$`, display: true, caption: 'Exponential decay of the solution toward zero.' },
      { kind: 'callout', tone: 'history', title: 'Fourier, 1822', text: 'Joseph Fourier introduced the series expansion while modelling heat conduction in *Théorie analytique de la chaleur*. His claim that arbitrary functions can be expanded in trigonometric series was controversial; convergence questions drove much of nineteenth-century analysis, including Dirichlet, Riemann, and Lebesgue.' },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'code', language: 'python', caption: 'Compare the exact sine-mode solution with FTCS for two mesh sizes.', code: String.raw`import numpy as np
L = alpha = 1.0
x = np.linspace(0, 1, 101)
h = x[1] - x[0]
u = np.sin(np.pi * x)
print("exact at t=1:", np.exp(-0.1*np.pi**2))

for dt in [0.001, 0.005, 0.05]:
    r = alpha * dt / h**2
    v = u.copy()
    steps = int(round(1.0/dt))
    for _ in range(steps):
        v[1:-1] = v[1:-1] + r*(v[2:] - 2*v[1:-1] + v[:-2])
    print(f"dt={dt:.3f} r={r:.3f} stable={r<=0.5} u(0.5,1)={v[50]:.8f}")` },
      { kind: 'sim', sim: 'pde-heat', caption: 'Drag the initial temperature profile and watch high-frequency wiggles vanish faster than the mean level.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        'Transient thermal analysis of electronic chips and building envelopes.',
        'Diffusion of contaminants in soil and groundwater.',
        'Fokker–Planck equations for stochastic processes in physics and finance.',
        'Image denoising by nonlinear diffusion (Perona–Malik).',
        'Option pricing: the heat kernel appears after log-price and time reversal.',
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Instant propagation is not physical signalling', text: 'The heat kernel has support everywhere for any $t>0$, which conflicts with relativistic causality; it is a long-wavelength approximation. Numerically, violating $r\\le1/2$ creates growing oscillations at the grid scale — a pure artefact of the discretisation, not of the PDE.' },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', items: [
        'Why does mode $n=10$ decay about 100 times faster than mode $n=1$?',
        'What changes if the boundary condition is Neumann ($u_x=0$) instead of Dirichlet?',
        'Where does the factor $\\frac12$ in the FTCS stability limit come from?',
        'Why does the maximum principle forbid a new interior hot spot?',
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'paragraph', text: 'Evans, *Partial Differential Equations*, ch. 2; Strauss, *Partial Differential Equations: An Introduction*, ch. 3; Trefethen, *Spectral Methods in MATLAB* (lecture 7).' },
    ],
  },

  {
    id: 'chaos-theory',
    title: 'Chaos Theory: Sensitive Dependence and Strange Attractors',
    branchId: 'differential-equations',
    level: 'Undergraduate 3',
    summary: 'Chaotic deterministic systems produce trajectories that are effectively unpredictable over long horizons because nearby states separate exponentially. Lyapunov exponents quantify that separation, strange attractors organise it geometrically, and the Feigenbaum route shows how order breaks down universally as a parameter is varied.',
    prerequisites: ['ode', 'nonlinear-ode', 'stability-theory'],
    tags: ['dynamical systems', 'Lyapunov exponent', 'Lorenz attractor', 'bifurcation', 'ergodicity'],
    status: 'Complete',
    simulationIds: ['lorenz-attractor'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: 'Determinism is not the same as predictability. A system governed by smooth equations can amplify a $10^{-12}$ measurement error into an order-one error in modest time. Chaos theory supplies the quantitative language: exponents for divergence rates, attractors for long-term geometry, and bifurcation theory for the transition from regular to irregular motion.' },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'callout', tone: 'intuition', title: 'Stretching and folding', text: 'A chaotic map repeatedly stretches the phase space in one direction (exponential separation) and folds it back (boundedness). Think of kneading dough: two nearby drops of dye separate quickly even though the dough never leaves the bowl. Stretching gives a positive Lyapunov exponent; folding creates a fractal attractor.' },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'callout', tone: 'visual', title: 'The butterfly and the bifurcation diagram', text: 'The Lorenz attractor is a two-lobed set of nearly sheets; an orbit spirals around one lobe then switches to the other in an aperiodic pattern. The logistic-map bifurcation diagram shows period doubling: one branch splits into two, four, eight as $r$ increases, with the splitting intervals shrinking geometrically by $\\delta\\approx4.669$.' },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'math', latex: String.raw`$x_{n+1}=f(x_n),\quad f(x)=r x(1-x)\ \text{(logistic map)},\ 0\le x\le1,\ 0\le r\le4.$`, display: true, caption: 'A minimal deterministic chaotic map.' },
      { kind: 'math', latex: String.raw`$\lambda=\lim_{n\to\infty}\frac{1}{n}\sum_{k=0}^{n-1}\ln|f'(x_k)|,\qquad |\delta x_n|\approx e^{\lambda n}|\delta x_0|.$`, display: true, caption: 'Lyapunov exponent and separation of nearby orbits.' },
      { kind: 'math', latex: String.raw`$\dot x=\sigma(y-x),\quad \dot y=x(\rho-z)-y,\quad \dot z=xy-\beta z.$`, display: true, caption: 'Lorenz system; classic parameters $\\sigma=10$, $\\rho=28$, $\\beta=8/3$.' },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'steps', title: 'Period doubling and the Lyapunov exponent', items: [
        { title: 'Fixed point and its stability', text: 'The logistic map has $x^*=0$ and $x^*=1-1/r$. Differentiate $f$ at the nonzero fixed point.', math: String.raw`$f'(x)=r(1-2x),\quad f'(1-1/r)=2-r,\quad \text{stable iff }|2-r|<1\iff 1<r<3.$` },
        { title: 'Period-two orbit', text: 'At $r>3$ the fixed point loses stability and a 2-cycle appears; solve $f(f(x))=x$ excluding fixed points.', math: String.raw`$x_{\pm}=\frac{r+1\pm\sqrt{(r-3)(r+1)}}{2r}.$` },
        { title: 'Exact exponent at $r=4$', text: 'Use the conjugacy $x_n=\\sin^2(2^n\\theta_0)$; differentiating the $n$-th iterate and averaging $\\ln|f\'|$ gives $\\ln2$.', math: String.raw`$\lambda(r=4)=\int_0^1\frac{\ln|r(1-2x)|}{\pi\sqrt{x(1-x)}}dx=\ln2\approx0.693147.$` },
        { title: 'Predictability horizon', text: 'An initial uncertainty $\\delta_0$ grows to order 1 after $n\\approx\\ln(1/\\delta_0)/\\lambda$ steps; each extra digit of precision buys only $\\ln10/\\lambda\\approx3.32$ iterations at $r=4$.', math: String.raw`$n^*\approx\frac{\ln(1/\delta_0)}{\lambda}.$` },
        { title: 'Universal scaling', text: 'Successive bifurcation parameters $r_k$ accumulate at $r_\\infty\\approx3.569945672$ with ratios tending to the Feigenbaum constant.', math: String.raw`$\delta=\lim_{k\to\infty}\frac{r_{k}-r_{k-1}}{r_{k+1}-r_k}=4.6692016091\ldots$` },
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'math', latex: String.raw`$r=3.2:\quad x_{\pm}=\frac{4.2\pm\sqrt{0.84}}{6.4}=0.5130445095,\ 0.7994554905.$`, display: true, caption: 'The attracting 2-cycle for $r=3.2$.' },
      { kind: 'table', headers: ['$r$', 'long-term behaviour', 'Lyapunov exponent (numerical)'], rows: [
        ['2.5', 'stable fixed point $x^*=0.6$', 'negative'],
        ['3.2', 'period-2 cycle $0.5130,0.7995$', 'negative'],
        ['3.5', 'period-4 cycle', 'negative'],
        ['3.569945672', 'onset of chaos (accumulation)', '$\\to0^-$'],
        ['4.0', 'chaotic, absolutely continuous invariant density', '$+\\ln2\\approx+0.6931$'],
      ] },
      { kind: 'math', latex: String.raw`$r=4,\ x_0=0.2:\ 0.2\to0.64\to0.9216\to0.28901376\to0.82193923\to0.58542054\ldots$`, display: true, caption: 'An erratic-looking orbit of a completely deterministic map.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'math', latex: String.raw`$\text{Lorenz (1963): for }\rho>\rho_H\approx24.74\text{ the nontrivial equilibria are unstable and an attractor exists.}$`, display: true, caption: 'The Lorenz system has a bounded attracting set for classical parameters; the existence of the strange attractor was proved rigorously decades later (Tucker, 1999).' },
      { kind: 'math', latex: String.raw`$\text{Pesin entropy formula: }h_\mu(f)=\int\lambda_+(x)\,d\mu(x)\quad\text{for smooth systems with an SRB measure.}$`, display: true, caption: 'Positive exponents imply positive metric entropy under suitable hypotheses (a theorem, not a heuristic).' },
      { kind: 'callout', tone: 'history', title: 'A weather model that changed a field', text: 'Edward Lorenz discovered sensitive dependence in 1961 by re-running a weather simulation from rounded printed output; the trajectories diverged completely. His 1963 paper distilled the effect into three equations. Mitchell Feigenbaum found the universal constant in 1975, revealing that the route to chaos is shared by vastly different systems.' },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'code', language: 'python', caption: 'Logistic-map Lyapunov exponents, orbit separation, and a Lorenz integration.', code: String.raw`import numpy as np

def lyapunov(r, n=20000, transient=2000):
    x = 0.37
    for _ in range(transient): x = r*x*(1-x)
    s = 0.0
    for _ in range(n):
        s += np.log(abs(r*(1-2*x)))
        x = r*x*(1-x)
    return s/n

for r in [2.5, 3.2, 3.5, 3.8, 4.0]:
    print(f"r={r}  lambda~{lyapunov(r):+.5f}")

# Sensitive dependence at r=4
a, b = 0.2000000000, 0.2000000001
for n in range(1, 41):
    a = 4*a*(1-a); b = 4*b*(1-b)
    if n in (1, 5, 10, 20, 30, 40):
        print(n, abs(a-b))

# RK4 integration of the Lorenz system
def rhs(s):
    x,y,z = s
    return np.array([10*(y-x), x*(28-z)-y, x*y-(8/3)*z])
s = np.array([1.,1.,1.]); dt=0.005
for _ in range(4000):
    k1=rhs(s); k2=rhs(s+dt*k1/2); k3=rhs(s+dt*k2/2); k4=rhs(s+dt*k3)
    s = s + dt*(k1+2*k2+2*k3+k4)/6
print("Lorenz state at t=20:", s)` },
      { kind: 'sim', sim: 'lorenz-attractor', caption: 'Start two trajectories one part in $10^6$ apart and watch them separate while both remain on the attractor.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        'Weather and climate: intrinsic forecast limits of roughly two weeks.',
        'Nonlinear circuits: Chua circuit as a physical realisation of a strange attractor.',
        'Population biology: chaos in discrete-time models with strong reproduction rates.',
        'Cryptography: chaotic maps as pseudo-random sources (with careful security caveats).',
        'Cardiac arrhythmia and epilepsy: chaos as both pathology and a control target.',
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Random-looking is not random', text: 'A chaotic orbit is deterministic; statistical descriptions (invariant measures, ergodicity) are useful but do not make the dynamics stochastic. Conversely, a positive computed exponent over a finite time can be a transient: always check convergence with respect to orbit length and initial condition.' },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', items: [
        'How many extra decimal places of precision are needed to double the prediction horizon?',
        'Why must a chaotic attractor have at least one positive and one negative exponent?',
        'Can a one-dimensional continuous autonomous ODE be chaotic? Why not?',
        'What is the difference between period doubling and intermittency as routes to chaos?',
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'paragraph', text: 'Strogatz, *Nonlinear Dynamics and Chaos*, ch. 1–3, 9–10; Devaney, *An Introduction to Chaotic Dynamical Systems*; Tucker, *A rigorous ODE solver and Smale\'s 14th problem* (Found. Comput. Math. 2002).' },
    ],
  },

  // ── Optimisation ──────────────────────────────────────────────────────────
  {
    id: 'gradient-descent',
    title: 'Gradient Descent: Local Linearisation as a Search Strategy',
    branchId: 'optimization',
    level: 'Undergraduate 3',
    summary: 'Gradient descent takes repeated steps in the direction of steepest local decrease, making it the conceptual engine behind nearly all machine-learning training. Its convergence is governed by the curvature bounds of the objective: smooth but nonconvex functions guarantee stationarity, while strongly convex functions give an exponential rate.',
    prerequisites: ['gradient', 'directional-derivatives', 'taylor-series'],
    tags: ['gradient descent', 'learning rate', 'Lipschitz smoothness', 'convergence rate', 'line search'],
    status: 'Complete',
    simulationIds: ['gradient-descent'],
    derivationIds: ['p4-der-gd-strongly-convex'],
    problemIds: ['p4-prob-gd-rate'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: 'Find $\\arg\\min f(\\mathbf{x})$ when $f$ is differentiable but no stationarity equation can be solved in closed form — a neural-network loss with millions of parameters, for instance. Gradient descent replaces a global optimisation problem with a sequence of cheap local linear approximations.' },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'callout', tone: 'intuition', title: 'Walk downhill, one tangent plane at a time', text: 'The gradient points uphill fastest, so $-\\nabla f$ is the locally steepest descent direction. Take a short step, re-evaluate the slope, repeat. Too short a step wastes time; too long a step can jump past the minimum and diverge — the learning rate is the whole art.' },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'callout', tone: 'visual', title: 'Contours and zig-zags', text: 'On elliptical level curves of a quadratic, steepest descent is not aimed at the centre: it bounces between the walls of the narrow valley, zig-zagging because the gradient is normal to the contours. Condition number $\\kappa=L/\\mu$ predicts how elongated the ellipses are and how slow the zig-zag becomes.' },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'math', latex: String.raw`$\mathbf{x}_{k+1}=\mathbf{x}_k-\eta_k\nabla f(\mathbf{x}_k),\qquad \eta_k>0\ \text{(step size / learning rate)}.$`, display: true, caption: 'The update rule.' },
      { kind: 'math', latex: String.raw`$f\ \text{is }L\text{-smooth}:\ \|\nabla f(x)-\nabla f(y)\|\le L\|x-y\|;\quad f\ \text{is }\mu\text{-strongly convex}:\ f(y)\ge f(x)+\nabla f(x)^T(y-x)+\frac{\mu}{2}\|y-x\|^2.$`, display: true, caption: 'The two curvature assumptions behind clean convergence proofs.' },
      { kind: 'math', latex: String.raw`$\min_{\|d\|\le1}\nabla f(x)^Td=-\|\nabla f(x)\|\quad\text{attained at }d=-\nabla f(x)/\|\nabla f(x)\|.$`, display: true, caption: 'Cauchy–Schwarz proves steepest descent.' },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'steps', title: 'From Taylor linearisation to a descent guarantee', items: [
        { title: 'Linear model', text: 'The first-order Taylor expansion says $f(x+h)\\approx f(x)+\\nabla f(x)^Th$; choosing $h=-\\eta\\nabla f(x)$ decreases this model.', math: String.raw`$f(x-\eta\nabla f(x))\approx f(x)-\eta\|\nabla f(x)\|^2.$` },
        { title: 'Steepest direction', text: 'Among unit directions $d$, Cauchy–Schwarz gives $\\nabla f^Td\\ge-\\|\\nabla f\\|$, with equality for $d=-\\nabla f/\\|\\nabla f\\|$.', math: String.raw`$d^*=-\frac{\nabla f}{\|\nabla f\|},\qquad \nabla f^Td^*=-\|\nabla f\|.$` },
        { title: 'Descent lemma', text: '$L$-smoothness bounds the quadratic remainder so that a small enough step strictly decreases $f$.', math: String.raw`$f(x-\eta\nabla f)\le f(x)-\eta\left(1-\frac{L\eta}{2}\right)\|\nabla f\|^2.$` },
        { title: 'Safe step size', text: 'The right-hand side improves whenever $0<\\eta<2/L$; $\\eta=1/L$ is the classic choice.', math: String.raw`$0<\eta<\frac{2}{L}\ \implies\ f(x_{k+1})<f(x_k)\ \text{unless }\nabla f(x_k)=0.$` },
        { title: 'Strongly convex contraction', text: 'For a $\\mu$-strongly convex, $L$-smooth function the gradient mapping is a contraction in objective value with factor $1-\\mu/L$.', math: String.raw`$f(x_{k+1})-f^*\le\left(1-\frac{\mu}{L}\right)^k\big(f(x_0)-f^*\big).$` },
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'math', latex: String.raw`$f(x,y)=x^2+3y^2,\ \nabla f=(2x,6y),\ \eta=0.1,\ (x_0,y_0)=(3,2):\ (3,2)\to(2.4,0.8)\to(1.92,0.32)\to\cdots$`, display: true, caption: 'Each coordinate contracts independently by $1-2\\eta=0.8$ and $1-6\\eta=0.4$.' },
      { kind: 'table', headers: ['$k$', '$x_k$', '$y_k$', '$f(x_k,y_k)$'], rows: [
        ['0', '3.000000', '2.000000', '21.000000'],
        ['1', '2.400000', '0.800000', '7.680000'],
        ['2', '1.920000', '0.320000', '4.029440'],
        ['3', '1.536000', '0.128000', '2.577842'],
        ['5', '0.983040', '0.020480', '0.975170'],
      ] },
      { kind: 'math', latex: String.raw`$f(x)=x^2:\ x_0=4,\ \eta=0.1\Rightarrow 4,3.2,2.56,2.048;\quad \eta=0.6\Rightarrow4,-0.8,0.16;\quad \eta=1.1\Rightarrow4,-4.4,4.84,\ \text{diverges.}$`, display: true, caption: 'Step-size regimes: monotone damping, oscillatory damping, divergence.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'math', latex: String.raw`$\min_{0\le k\le K}\|\nabla f(x_k)\|^2\le\frac{2L\big(f(x_0)-f^*\big)}{K+1}\quad(L\text{-smooth, nonconvex}).$`, display: true, caption: 'Stationarity rate: $O(1/K)$ to reach an $\\varepsilon$-stationary point.' },
      { kind: 'math', latex: String.raw`$f(x_{k+1})-f^*\le\frac{L\|x_0-x^*\|^2}{2}\left(\frac{\kappa-1}{\kappa+1}\right)^{2k}\ \text{with exact line search},\quad \kappa=L/\mu.$`, display: true, caption: 'Rate for quadratics; acceleration improves $\\kappa$ to $\\sqrt{\\kappa}$.' },
      { kind: 'callout', tone: 'history', title: 'Cauchy 1847, Nesterov 1983', text: 'Augustin-Louis Cauchy introduced steepest descent for systems of equations. Its slow zig-zagging motivated conjugate-gradient methods in the 1950s and Nesterov\'s accelerated gradient in 1983, which achieves the optimal $O(1/k^2)$ rate for smooth convex functions.' },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'code', language: 'python', caption: 'Gradient descent trajectories for several learning rates on $f=x^2+3y^2$.', code: String.raw`import numpy as np

def gd(eta, x0=(3.,2.), K=12):
    x = np.array(x0, dtype=float)
    out = []
    for k in range(K):
        out.append((k, x.copy(), x[0]**2 + 3*x[1]**2))
        x = x - eta*np.array([2*x[0], 6*x[1]])
    return out

for eta in [0.05, 0.1, 0.3, 0.4]:
    run = gd(eta)
    print(f"eta={eta}: f0={run[0][2]:.4f} f11={run[-1][2]:.3e} stable={run[-1][2] < run[0][2]}")

# theory: contraction factors |1-2eta|, |1-6eta|; need eta < 1/3 here
print("theory threshold eta < 2/L =", 2/6)` },
      { kind: 'sim', sim: 'gradient-descent', caption: 'Change the learning rate and watch the path zig-zag, converge, or diverge on the same loss surface.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        'Training neural networks (stochastic gradient descent and its variants Adam, RMSProp).',
        'Logistic regression and generalised linear models.',
        'Matrix factorisation for recommender systems.',
        'Signal reconstruction and compressed sensing via smooth surrogates.',
        'Inverse problems: iteratively fitting physical models to observations.',
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'The gradient is not scale-free', text: 'Rescaling a variable changes the geometry and hence the effective step size; feature normalisation is not cosmetic. Also, for nonsmooth objectives (e.g. $|x|$) the gradient may not exist: use subgradient or proximal methods instead.' },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', items: [
        'Why does steepest descent zig-zag on an elongated valley?',
        'What happens at $\\eta=2/L$ exactly for $f(x)=x^2$?',
        'How does momentum change the effective condition number seen by the iteration?',
        'Why is stochastic gradient descent noisy yet often faster in wall-clock time?',
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'paragraph', text: 'Nocedal & Wright, *Numerical Optimization*, ch. 2–3; Boyd & Vandenberghe, *Convex Optimization*, ch. 9; Bottou, Curtis & Nocedal, *Optimization Methods for Large-Scale Machine Learning* (SIAM Review, 2018).' },
    ],
  },

  {
    id: 'convex-optimization',
    title: 'Convex Optimisation: Global Guarantees from Local Geometry',
    branchId: 'optimization',
    level: 'Undergraduate 3',
    summary: 'Convex optimisation studies minimising convex functions over convex sets, where every local minimum is global and first-order conditions are sufficient. Strong convexity and smoothness quantify curvature, while duality and KKT conditions convert constrained problems into tractable certificates and algorithms.',
    prerequisites: ['gradient', 'hessian', 'unconstrained-optimization'],
    tags: ['convexity', 'Jensen inequality', 'strong convexity', 'KKT', 'duality'],
    status: 'Complete',
    simulationIds: ['optimization-landscape'],
    derivationIds: ['p4-der-kkt'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: 'General nonlinear optimisation is riddled with local minima, saddle points, and undecidable global questions. Convex problems are the large, structured exception: the feasible set and objective fit together so that any descent method cannot get trapped, and duality provides a numerical certificate of optimality.' },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'callout', tone: 'intuition', title: 'No hidden valleys', text: 'A convex function lies below every chord, so its epigraph is a bowl. Walking downhill from any starting point cannot lead into a second, deeper bowl: there is only one bottom (or one flat bottom face). That is why first-order information is enough.' },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'callout', tone: 'visual', title: 'Epigraphs and supporting hyperplanes', text: 'Draw the epigraph $\\{(x,t):t\\ge f(x)\\}$; convexity of $f$ is convexity of this set. At any point a supporting hyperplane touches the epigraph without crossing it — geometrically the statement $f(y)\\ge f(x)+\\nabla f(x)^T(y-x)$, which is also the first-order optimality certificate at a minimiser.' },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'math', latex: String.raw`$f(\theta x+(1-\theta)y)\le\theta f(x)+(1-\theta)f(y),\quad \theta\in[0,1];\quad C\text{ convex iff }\theta x+(1-\theta)y\in C.$`, display: true, caption: 'Convex function and convex set.' },
      { kind: 'math', latex: String.raw`$f\text{ convex on an open set }\iff \nabla^2 f(x)\succeq0;\quad f\text{ }\mu\text{-strongly convex}\iff\nabla^2f(x)\succeq\mu I.$`, display: true, caption: 'Second-order characterisations (twice differentiable case).' },
      { kind: 'math', latex: String.raw`$\min_{x\in C} f(x),\quad C=\{x:g_i(x)\le0,\ i=1,\dots,m;\ Ax=b\}.$`, display: true, caption: 'Standard constrained convex program.' },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'steps', title: 'Local implies global, and the role of the Hessian', items: [
        { title: 'First-order supporting inequality', text: 'Convexity implies the graph lies above every tangent plane; prove by taking $\\theta\\to0$ in the chord inequality.', math: String.raw`$f(y)\ge f(x)+\nabla f(x)^T(y-x).$` },
        { title: 'Stationarity is sufficient', text: 'If $\\nabla f(x^*)=0$, the inequality reduces to $f(y)\\ge f(x^*)$ for all $y$, so $x^*$ is globally optimal.', math: String.raw`$\nabla f(x^*)=0\ \Longrightarrow\ x^*\in\arg\min f.$` },
        { title: 'Second-order characterisation', text: 'Apply Taylor\'s theorem with integral remainder: $f(y)=f(x)+\\nabla f(x)^T(y-x)+\\int_0^1(1-t)(y-x)^T\\nabla^2f(x+t(y-x))(y-x)\\,dt$.', math: String.raw`$f\text{ convex}\iff\nabla^2f(x)\succeq0\ \text{on the domain}.$` },
        { title: 'Strong convexity and uniqueness', text: 'Add $\\frac{\\mu}{2}\\|y-x\\|^2$ to the supporting inequality; two distinct minimisers would contradict strict positivity, so the minimiser is unique.', math: String.raw`$f(y)\ge f(x)+\nabla f(x)^T(y-x)+\frac{\mu}{2}\|y-x\|^2,\quad \mu>0.$` },
        { title: 'Jensen as a special case', text: 'Induction on the two-point inequality gives the general average form, the source of many convexity-based bounds in probability and information theory.', math: String.raw`$f\left(\mathbb{E}X\right)\le\mathbb{E}f(X).$` },
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'math', latex: String.raw`$f(x,y)=x^2+y^2+xy-3x,\quad \nabla^2 f=\begin{pmatrix}2&1\\1&2\end{pmatrix}\succ0\ (\text{eigenvalues }1,3).$`, display: true, caption: 'A strictly convex quadratic.' },
      { kind: 'table', headers: ['candidate', 'feasible?', '$f$ value', 'status'], rows: [
        ['$(0,0)$', 'yes', '0', 'not optimal'],
        ['$(2,-1)$', 'no ($y<0$)', '$-3$', 'unconstrained minimiser, infeasible'],
        ['$(1.5,0)$', 'yes', '$-2.25$', 'constrained global minimum'],
        ['$(1,1)$', 'yes', '0', 'not optimal'],
      ] },
      { kind: 'math', latex: String.raw`$x^*=1.5,\ y^*=0:\ \nabla f=(2x+y-3,\ x+2y)=(0,1.5),\ \lambda=1.5>0\ \text{for }g=-y\le0.$`, display: true, caption: 'KKT verification: stationarity with a nonnegative multiplier on the active constraint.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'math', latex: String.raw`$\text{KKT (convex + Slater): }x^*\text{ optimal}\iff\exists\lambda\ge0:\nabla f(x^*)+\sum_i\lambda_i\nabla g_i(x^*)=0,\ \lambda_i g_i(x^*)=0.$`, display: true, caption: 'Necessary and sufficient under convexity and a constraint qualification.' },
      { kind: 'math', latex: String.raw`$d^*=\min_x f(x)=\max_{\lambda\ge0}\inf_x\left(f(x)+\lambda^Tg(x)\right)\quad\text{(strong duality under Slater).}$`, display: true, caption: 'Lagrangian duality; the dual provides a lower bound and a stopping certificate.' },
      { kind: 'callout', tone: 'history', title: 'From Lagrange to KKT to interior point', text: 'Lagrange multipliers (1788) handled equalities; Karush (1939), Kuhn and Tucker (1951) extended them to inequalities. Dantzig\'s simplex (1947) launched linear programming; Karmarkar\'s interior-point method (1984) made large convex programs practically solvable.' },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'code', language: 'python', caption: 'Use SymPy to confirm positive definiteness and solve both the unconstrained and constrained quadratic programs.', code: String.raw`import sympy as sp

x, y, lam = sp.symbols('x y lam', real=True)
f = x**2 + y**2 + x*y - 3*x
H = sp.hessian(f, (x, y))
print("Hessian:", H, "eigenvalues:", H.eigenvals())
sol = sp.solve([sp.diff(f,x), sp.diff(f,y)], [x,y]); print("unconstrained:", sol)
print("f at unconstrained:", f.subs(sol))

# constrained y >= 0: KKT with g = -y <= 0
sol_c = sp.solve([sp.diff(f,x), sp.diff(f,y)-lam, lam*y, -y+0], [x,y,lam], dict=True)
print("KKT candidates:", sol_c)
for s in sol_c: print(s, "f =", sp.simplify(f.subs(s)))` },
      { kind: 'sim', sim: 'optimization-landscape', caption: 'Compare convex bowls and nonconvex landscapes; note that descent cannot be trapped in the convex case.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        'Portfolio optimisation: minimise variance subject to return and budget constraints.',
        'Support vector machines: a convex quadratic program with margin constraints.',
        'Optimal control and model predictive control with convex constraints.',
        'Signal processing: $\\ell_1$-regularised least squares (LASSO).',
        'Network flow and resource allocation: linear and convex programs at massive scale.',
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'KKT is not sufficient without convexity', text: 'For nonconvex problems a KKT point may be a saddle or a local maximum. Slater-type constraint qualifications are also needed for necessity; without them a multiplier may not exist. Finally, a positive-definite Hessian at one point does not prove global convexity.' },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', items: [
        'Why is $f(x)=x^4$ convex but not strongly convex on $\\mathbb{R}$?',
        'Show by Jensen that $-\\log$ of a geometric mean is convex in the right variables.',
        'What is the dual of the problem $\\min\\frac12\\|x-b\\|^2$ subject to $Ax=c$?',
        'How does the condition number $L/\\mu$ control gradient-descent speed?',
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'paragraph', text: 'Boyd & Vandenberghe, *Convex Optimization* (free PDF); Rockafellar, *Convex Analysis*; Nesterov, *Introductory Lectures on Convex Optimization*.' },
    ],
  },

  {
    id: 'lagrange-multipliers',
    title: 'Lagrange Multipliers: Optimisation on Constraints',
    branchId: 'optimization',
    level: 'Undergraduate 3',
    summary: 'Lagrange multipliers turn a constrained extremum problem into a stationary-point problem for an augmented function: at an optimum the objective gradient must be a linear combination of constraint gradients. The method underlies KKT conditions, sensitivity analysis, and the economics of shadow prices.',
    prerequisites: ['gradient', 'constrained-optimization', 'multivariable-functions'],
    tags: ['constraint', 'multiplier', 'level sets', 'KKT', 'shadow price'],
    status: 'Complete',
    derivationIds: ['p4-der-kkt'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: 'Maximise utility subject to a budget, minimise energy subject to a fixed angular momentum, or fit parameters under a normalisation constraint. In each case we cannot simply set $\\nabla f=0$: the optimum may lie on the boundary of the feasible set, where the unconstrained slope need not vanish.' },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'callout', tone: 'intuition', title: 'Tangent level curves', text: 'At a constrained optimum the level curve of $f$ is tangent to the constraint curve. If they crossed transversally, moving along the constraint would cross into higher (or lower) level sets, contradicting optimality. Tangency means the two normal vectors — the gradients — are parallel.' },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'callout', tone: 'visual', title: 'Nested ellipses touching a circle', text: 'For $\\max xy$ on the unit circle, the hyperbolas $xy=c$ grow outward as $c$ increases; the last one that still meets the circle touches it at $\\pm(1/\\sqrt2,1/\\sqrt2)$. At that contact, $\\nabla f=(y,x)$ and $\\nabla g=(2x,2y)$ point along the same line.' },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'math', latex: String.raw`$\max/\min\ f(x,y)\ \text{subject to}\ g(x,y)=c;\qquad \mathcal{L}(x,y,\lambda)=f(x,y)-\lambda\big(g(x,y)-c\big).$`, display: true, caption: 'The constrained problem and the Lagrangian.' },
      { kind: 'math', latex: String.raw`$\nabla_{x,y}\mathcal{L}=0\iff \nabla f=\lambda\nabla g$ (stationarity), $\quad \partial_\lambda\mathcal{L}=0\iff g=c$ (feasibility).`, display: true, caption: 'Stationary points of $\\mathcal{L}$ solve the constrained problem under regularity.' },
      { kind: 'math', latex: String.raw`$\frac{dV}{dc}=\lambda^*\quad\text{(envelope / sensitivity theorem)},\qquad V(c)=\text{optimal value as a function of }c.$`, display: true, caption: 'The multiplier is the marginal value of relaxing the constraint.' },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'steps', title: 'Tangency, the Lagrangian, and sensitivity', items: [
        { title: 'Parametrise the constraint locally', text: 'Near a regular point ($\\nabla g\\neq0$) the constraint set is a curve. Let $\\gamma(t)$ traverse it with $\\gamma(0)=x^*$.', math: String.raw`$g(\gamma(t))=c\ \implies\ \nabla g(x^*)^T\gamma'(0)=0.$` },
        { title: 'Optimality kills directional change', text: 'At an extremum the derivative of $f$ along every allowed tangent direction must vanish.', math: String.raw`$\frac{d}{dt}f(\gamma(t))\big|_{t=0}=\nabla f(x^*)^T\gamma'(0)=0.$` },
        { title: 'Orthogonal complements in $\\mathbb{R}^n$', text: 'Every vector orthogonal to the tangent space is a multiple of $\\nabla g$, so $\\nabla f$ lies in the span of $\\nabla g$.', math: String.raw`$\nabla f(x^*)=\lambda\nabla g(x^*),\qquad \lambda\in\mathbb{R}.$` },
        { title: 'Encode as a stationary point', text: 'Define $\\mathcal{L}=f-\\lambda(g-c)$; setting all partial derivatives to zero recovers stationarity plus feasibility in one system.', math: String.raw`$\mathcal{L}(x,\lambda)=f(x)-\lambda(g(x)-c),\quad \nabla_x\mathcal{L}=\nabla f-\lambda\nabla g,\ \partial_\lambda\mathcal{L}=c-g.$` },
        { title: 'Sensitivity', text: 'Differentiate $V(c)=f(x^*(c))$ and use stationarity: terms involving $dx^*/dc$ cancel, leaving $\\lambda^*$.', math: String.raw`$V'(c)=\nabla f^T\frac{dx^*}{dc}=\lambda^*\nabla g^T\frac{dx^*}{dc}=\lambda^*.$` },
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'math', latex: String.raw`$\max xy\ \text{s.t.}\ x^2+y^2=1:\ (y,x)=\lambda(2x,2y)\Rightarrow\lambda=\pm\tfrac12,\ x=\pm y=\pm\tfrac{1}{\sqrt2}.$`, display: true, caption: 'Two stationary families; same-sign points give the maximum.' },
      { kind: 'table', headers: ['point', 'constraint', '$f=xy$', 'classification'], rows: [
        ['$(1/\\sqrt2,1/\\sqrt2)$', '$1$', '$+0.5$', 'global maximum'],
        ['$(-1/\\sqrt2,-1/\\sqrt2)$', '$1$', '$+0.5$', 'global maximum'],
        ['$(1/\\sqrt2,-1/\\sqrt2)$', '$1$', '$-0.5$', 'global minimum'],
        ['$(-1/\\sqrt2,1/\\sqrt2)$', '$1$', '$-0.5$', 'global minimum'],
      ] },
      { kind: 'math', latex: String.raw`$\min x^2+y^2\ \text{s.t.}\ x+y=4:\ (2x,2y)=\lambda(1,1)\Rightarrow x=y=2,\ f=8;\qquad \lambda=4=\frac{dV}{dc}\big|_{c=4}.$`, display: true, caption: 'The multiplier equals the derivative of the optimal value $V(c)=c^2/2$.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'math', latex: String.raw`$\text{Lagrange multiplier theorem: }f,g\in C^1,\ \nabla g(x^*)\neq0,\ x^*\text{ local extremum on }g=c\ \implies\ \exists\lambda:\nabla f=\lambda\nabla g.$`, display: true, caption: 'A necessary condition; the rank (regularity) hypothesis is essential.' },
      { kind: 'math', latex: String.raw`$\text{Inequality constraints }g_i\le0:\ \nabla f+\sum_i\lambda_i\nabla g_i=0,\ \lambda_i\ge0,\ \lambda_i g_i=0\quad\text{(KKT).}$`, display: true, caption: 'Multiplier sign and complementary slackness for active constraints.' },
      { kind: 'callout', tone: 'history', title: 'From mechanics to economics', text: 'Lagrange introduced the method in *Mécanique Analytique* (1788) to handle constraints in variational mechanics. The multiplier was long treated as a formal device until Kuhn and Tucker (1951) gave inequality conditions; in economics it acquired the interpretation of a shadow price.' },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'code', language: 'python', caption: 'Solve the multiplier equations symbolically and check the sensitivity relation.', code: String.raw`import sympy as sp

x, y, lam, c = sp.symbols('x y lam c', real=True)
f = x*y; g = x**2 + y**2 - 1
sols = sp.solve([sp.diff(f,x)-lam*sp.diff(g,x),
                 sp.diff(f,y)-lam*sp.diff(g,y), g], [x,y,lam], dict=True)
for s in sols:
    print(s, "f =", sp.simplify(f.subs(s)))

# Sensitivity check for min x^2+y^2 s.t. x+y=c
V = c**2/2
print("dV/dc =", sp.diff(V,c), " equals multiplier lambda =", c/2)` },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        'Consumer choice: maximise utility subject to a budget line; $\\lambda$ is marginal utility of income.',
        'Statistical mechanics: maximise entropy subject to fixed mean energy — yields the Boltzmann distribution.',
        'Support vector machines: maximise the margin subject to classification constraints.',
        'Mechanics: constrained motion of a pendulum via generalised coordinates.',
        'Portfolio allocation: risk minimisation under a target return constraint.',
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Stationary points are only candidates', text: '$g=0$ with $\\nabla g=0$ is a singular constraint: the theorem fails (try $g=x^2+y^2=0$, a single point). Always check all stationary points, boundary pieces, and compactness for existence; for inequality constraints, remember complementary slackness.' },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', items: [
        'Why must the level curve and constraint be tangent rather than transverse at an optimum?',
        'What is the geometric meaning of a zero multiplier at an optimum?',
        'How many multipliers are needed for two equality constraints in $\\mathbb{R}^5$?',
        'Give an example where the multiplier theorem fails because $\\nabla g=0$.',
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'paragraph', text: 'Boyd & Vandenberghe, *Convex Optimization*, ch. 5; Lanczos, *The Variational Principles of Mechanics*; Simon & Blume, *Mathematics for Economists*, ch. 18–19.' },
    ],
  },

  // ── Information theory ────────────────────────────────────────────────────
  {
    id: 'shannon-entropy',
    title: 'Shannon Entropy: The Mathematics of Uncertainty',
    branchId: 'information-theory',
    level: 'Undergraduate 2',
    summary: 'Shannon entropy measures the average surprise of outcomes of a random variable, and it is the unique functional (up to a constant) satisfying natural axioms of continuity, symmetry, and additivity. It sets the fundamental limit for lossless compression and reappears as the central quantity of statistical mechanics and machine learning.',
    prerequisites: ['probability-distributions', 'expectation', 'logarithms'],
    tags: ['entropy', 'bits', 'source coding', 'axioms', 'Jensen'],
    status: 'Complete',
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: 'How many bits are needed, on average, to describe the outcome of a random experiment? Rare outcomes can be given long codewords and common ones short codewords; Shannon entropy quantifies the best possible average. It also measures dispersion in a probability distribution without reference to the values the outcomes carry.' },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'callout', tone: 'intuition', title: 'Surprise is $-\\log_2 p$', text: 'An event of probability $1$ carries no surprise ($-\\log_2 1=0$); an event of probability $1/8$ carries 3 bits of surprise. Entropy is the average surprise. Using a logarithm makes surprise additive for independent events, matching the fact that two independent messages need the sum of their code lengths.' },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'callout', tone: 'visual', title: 'The entropy curve', text: 'Plot $h(p)=-p\\log_2p-(1-p)\\log_2(1-p)$ for a binary variable. It is $0$ at $p=0,1$, symmetric about $p=1/2$, and peaks at $1$ bit there. For $n$ outcomes the maximum $\\log_2 n$ occurs at the uniform distribution — visualised as a flat bar chart.' },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'math', latex: String.raw`$H(X)=-\sum_{i=1}^{n}p_i\log_2 p_i\ \text{bits},\qquad H_{\mathrm{nats}}(X)=-\sum_i p_i\ln p_i.$`, display: true, caption: 'Definition in bits (base 2) and nats (base $e$).' },
      { kind: 'math', latex: String.raw`$0\le H(X)\le\log_2 n,\qquad H(X)=0\iff X\text{ is deterministic},\ H(X)=\log_2 n\iff X\text{ uniform}.$`, display: true, caption: 'Range and equality cases.' },
      { kind: 'math', latex: String.raw`$H(X,Y)=H(X)+H(Y|X),\qquad H_b(p)=-p\log_2p-(1-p)\log_2(1-p).$`, display: true, caption: 'Chain rule and the binary entropy function.' },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'steps', title: 'Why the logarithm, and the upper bound', items: [
        { title: 'Desiderata', text: 'Require $H$ continuous in $p$, symmetric (invariant under relabelling), maximal for uniform distributions, and additive for independent experiments: $H(X,Y)=H(X)+H(Y)$ when independent.', math: String.raw`$H(p_1,\dots,p_n)\ \text{satisfying these axioms is unique up to a positive constant.}$` },
        { title: 'Additivity forces logarithms', text: 'For $n=mk$ equally likely outcomes split into $m$ groups of $k$, additivity demands $f(mk)=f(m)+f(k)$; the continuous solutions are $f(n)=C\\log n$.', math: String.raw`$f(mk)=f(m)+f(k)\ \implies\ f(n)=C\log n.$` },
        { title: 'Extend to nonuniform distributions', text: 'Group outcomes with nearly equal probabilities $p_i\\approx1/n$; the frequency count of a type contributes $n p_i$ items, leading to the average $-\\sum p_i\\log p_i$.', math: String.raw`$H(p)=-\sum_i p_i\log p_i\quad\text{(the Gibbs/Shannon formula).}$` },
        { title: 'Maximum via Jensen', text: 'Since $-\\log$ is convex, log-sum inequality gives $\\sum p_i\\log(1/p_i)\\le\\log n$ with equality iff uniform.', math: String.raw`$H(X)\le\log_2 n,\quad\text{equality iff }p_i=1/n\ \forall i.$` },
        { title: 'Coding interpretation', text: 'Assign codeword length $\\ell_i=\\lceil-\\log_2p_i\\rceil$; Kraft inequality $\\sum 2^{-\\ell_i}\\le1$ holds and the expected length satisfies $H\\le L<H+1$.', math: String.raw`$\sum_i 2^{-\ell_i}\le1,\qquad H(X)\le\mathbb{E}[\ell]<H(X)+1.$` },
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'math', latex: String.raw`$H_b(0.25)=-0.25\log_2 0.25-0.75\log_2 0.75=0.5+0.3112781245=0.8112781245\ \text{bits}.$`, display: true, caption: 'A biased coin still carries most of a bit of uncertainty.' },
      { kind: 'table', headers: ['distribution', 'entropy (bits)', 'comment'], rows: [
        ['fair coin $(0.5,0.5)$', '1.000000', 'maximum for $n=2$'],
        ['biased coin $(0.25,0.75)$', '0.811278', 'less uncertainty'],
        ['degenerate $(1,0)$', '0.000000', 'no uncertainty'],
        ['uniform 4 outcomes', '2.000000', 'maximum for $n=4$'],
        ['$(0.5,0.25,0.125,0.125)$', '1.750000', 'dyadic: Huffman attains $H$ exactly'],
      ] },
      { kind: 'math', latex: String.raw`$p=(0.5,0.25,0.125,0.125):\ H=0.5(1)+0.25(2)+0.125(3)+0.125(3)=1.75;\quad \ell=(1,2,3,3),\ \mathbb{E}\ell=1.75.$`, display: true, caption: 'Huffman code {0,10,110,111} is optimal here.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'math', latex: String.raw`$\text{Noiseless coding theorem: }H(X)\le L^*<H(X)+1\ \text{for binary prefix codes.}$`, display: true, caption: 'Shannon\'s source coding theorem; block coding approaches $H$ per symbol.' },
      { kind: 'math', latex: String.raw`$H(X_1,\dots,X_n)=\sum_{i=1}^n H(X_i)\quad\text{for independent variables.}$`, display: true, caption: 'Additivity — the axiom that singled out the logarithm.' },
      { kind: 'callout', tone: 'history', title: 'Shannon, 1948', text: 'Claude Shannon\'s *A Mathematical Theory of Communication* created information theory in a single paper. He borrowed the word "entropy" from thermodynamics on the advice of John von Neumann, who reportedly noted that nobody truly understands entropy anyway — a useful reminder that the meaning lies in the axioms and theorems.' },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'code', language: 'python', caption: 'Compute entropies with NumPy and verify Kraft inequality for a Huffman code.', code: String.raw`import numpy as np

def H(p):
    p = np.asarray(p, dtype=float); p = p[p > 0]
    return float(-(p * np.log2(p)).sum())

for p in [[.5,.5],[.25,.75],[0,1],[.25]*4,[.5,.25,.125,.125]]:
    print(p, "H =", round(H(p), 9))

lens = [1,2,3,3]
print("Kraft sum =", sum(2**(-l) for l in lens))
print("expected length =", .5*1 + .25*2 + .125*3 + .125*3)
print("binary entropy at 0.1 =", H([.1,.9]))` },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        'Lossless compression: Huffman, arithmetic, and Lempel–Ziv coding.',
        'Machine learning: cross-entropy loss and decision-tree split criteria (information gain).',
        'Statistical mechanics: Gibbs entropy $S=-k_B\\sum p_i\\ln p_i$.',
        'Genomics: entropy of sequence motifs and binding-site conservation.',
        'Cryptography: entropy as a measure of key unpredictability.',
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Base matters, and zero probabilities need care', text: 'Bits (base 2) and nats (base $e$) differ by a factor $\\ln2$: $H_{\\rm nats}=H_{\\rm bits}\\ln2$. By convention $0\\log0=0$, but code lengths cannot be assigned to impossible symbols. Entropy is about the distribution, not the numerical labels of outcomes.' },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', items: [
        'Why is $-\\log_2 p$ a natural measure of surprise?',
        'Can a variable with more possible outcomes have lower entropy? Give an example.',
        'Show $H(X)\\le H(X,Y)$ and interpret it.',
        'Why can Huffman coding miss $H$ by up to one bit per symbol?',
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'paragraph', text: 'Shannon & Weaver, *The Mathematical Theory of Communication*; Cover & Thomas, *Elements of Information Theory*, ch. 1–5; MacKay, *Information Theory, Inference, and Learning Algorithms* (free online).' },
    ],
  },

  {
    id: 'mutual-information',
    title: 'Mutual Information: Measuring Statistical Dependence',
    branchId: 'information-theory',
    level: 'Undergraduate 3',
    summary: 'Mutual information quantifies how much knowing one random variable reduces uncertainty about another, equivalently the Kullback–Leibler divergence between the joint distribution and the product of marginals. It detects all forms of dependence, not just correlation, and governs channel capacity and the data-processing inequality.',
    prerequisites: ['shannon-entropy', 'conditional-entropy', 'joint-distributions'],
    tags: ['mutual information', 'KL divergence', 'channel capacity', 'data processing', 'independence'],
    status: 'Complete',
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: 'Correlation detects only linear association: two variables can be perfectly dependent yet uncorrelated. Mutual information asks a sharper question — how many bits on average are shared between $X$ and $Y$? This makes it the natural tool for feature selection, channel capacity, and independence testing.' },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'callout', tone: 'intuition', title: 'Bits saved by knowing $Y$', text: '$I(X;Y)=H(X)-H(X|Y)$ is the reduction in uncertainty about $X$ after observing $Y$. If $Y$ determines $X$ exactly, the reduction is all of $H(X)$; if $Y$ tells you nothing, the reduction is zero. Symmetry $I(X;Y)=I(Y;X)$ is the non-obvious part.' },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'callout', tone: 'visual', title: 'Venn diagram of entropy', text: 'Draw two overlapping circles for $H(X)$ and $H(Y)$; the overlap is $I(X;Y)$, the crescent shapes are conditional entropies, and the union is joint entropy. The diagram is exact for Shannon entropies of discrete variables (it is not generally exact for quantum entropies).' },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'math', latex: String.raw`$I(X;Y)=\sum_{x,y}p(x,y)\log_2\frac{p(x,y)}{p(x)p(y)}=D_{\mathrm{KL}}\!\big(p_{XY}\|p_Xp_Y\big).$`, display: true, caption: 'Definition as a KL divergence; nonnegative by Gibbs inequality.' },
      { kind: 'math', latex: String.raw`$I(X;Y)=H(X)-H(X|Y)=H(Y)-H(Y|X)=H(X)+H(Y)-H(X,Y).$`, display: true, caption: 'Equivalent identities.' },
      { kind: 'math', latex: String.raw`$I(X;Y)=0\iff p(x,y)=p(x)p(y)\ \text{for all }x,y\quad\text{(independence)}.$`, display: true, caption: 'Zero mutual information is exactly independence for discrete variables.' },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'steps', title: 'Chain rule, nonnegativity, and capacity', items: [
        { title: 'Chain rule for entropy', text: 'Expand the joint probability as $p(x,y)=p(x)p(y|x)$ and take expectations of $-\\log$.', math: String.raw`$H(X,Y)=H(X)+H(Y|X)=H(Y)+H(X|Y).$` },
        { title: 'Rewrite as a divergence', text: 'Subtract $H(X|Y)$ from $H(X)$ and collect terms into an expectation of a log-ratio.', math: String.raw`$I(X;Y)=\mathbb{E}_{p(x,y)}\left[\log\frac{p(x,y)}{p(x)p(y)}\right].$` },
        { title: 'Nonnegativity', text: 'Apply Jensen to $-\\log$ (a convex function) under the distribution $p(x,y)$: $-\\mathbb{E}\\log\\frac{p(x)p(y)}{p(x,y)}\\ge-\\log\\mathbb{E}\\frac{p(x)p(y)}{p(x,y)}=0$.', math: String.raw`$I(X;Y)\ge0,\quad\text{equality iff }p(x,y)=p(x)p(y).$` },
        { title: 'Data-processing inequality', text: 'For a Markov chain $X\\to Y\\to Z$, the conditional mutual information $I(X;Z|Y)=0$, and the chain rule gives $I(X;Z)\\le I(X;Y)$: information cannot be created by post-processing.', math: String.raw`$X\to Y\to Z\ \implies\ I(X;Z)\le I(X;Y).$` },
        { title: 'Channel capacity', text: 'A channel $p(y|x)$ has capacity $C=\\max_{p(x)}I(X;Y)$; the channel coding theorem says rates below $C$ are achievable with vanishing error.', math: String.raw`$C=\max_{p(x)}\big(H(Y)-H(Y|X)\big).$` },
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'math', latex: String.raw`$\text{Binary symmetric channel with error probability }p=0.1:\ I=1-H_b(0.1)=1-0.4689955936=0.5310044064\ \text{bits}.$`, display: true, caption: 'A uniform input maximises mutual information for a BSC.' },
      { kind: 'table', headers: ['scenario', '$H(X)$', '$H(X|Y)$', '$I(X;Y)$'], rows: [
        ['independent fair bits', '1', '1', '0'],
        ['$Y=X$ (noiseless copy)', '1', '0', '1'],
        ['BSC, $p=0.1$', '1', '0.468996', '0.531004'],
        ['BSC, $p=0.5$ (useless)', '1', '1', '0'],
        ['$Z=X\\oplus Y$, independent fair $X,Y$', '1', '1', '0'],
      ] },
      { kind: 'math', latex: String.raw`$X,Y\ \text{fair and independent},\ Z=X\oplus Y:\ I(X;Z)=0,\ \ I(X;Y,Z)=H(X)=1\ \text{bit}.$`, display: true, caption: 'Synergy: pairs can carry information that no single variable carries.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'math', latex: String.raw`$\text{Gibbs inequality: }D_{\mathrm{KL}}(p\|q)\ge0,\ \text{equality iff }p=q.$`, display: true, caption: 'The engine behind nonnegativity of mutual information.' },
      { kind: 'math', latex: String.raw`$\text{Noisy-channel coding theorem: rates }R<C\text{ admit codes with }P_{\mathrm{err}}\to0.$`, display: true, caption: 'Shannon\'s second fundamental theorem (1948).' },
      { kind: 'callout', tone: 'history', title: 'From telephones to feature selection', text: 'Shannon defined mutual information to describe communication channels; the same quantity now appears in bioinformatics (sequence dependencies), neuroscience (neural coding), and machine learning (information bottleneck, feature selection). Cover and Thomas systematised the identities in their standard 1991 textbook.' },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'code', language: 'python', caption: 'Estimate mutual information by brute force and verify the XOR independence paradox.', code: String.raw`import numpy as np

def mi(joint):
    j = np.asarray(joint, float); j = j/j.sum()
    px = j.sum(axis=1); py = j.sum(axis=0)
    outer = px[:,None]*py[None,:]
    mask = j > 0
    return float(np.sum(j[mask]*np.log2(j[mask]/outer[mask])))

bsc = np.array([[0.9,0.1],[0.1,0.9]])   # p(y|x)
print("BSC p=0.1 capacity ~", mi(0.5*bsc))

xor = np.full((2,2),0.25)
print("I(X;Y) for XOR inputs =", mi(xor))
print("I(X;Z) =", mi(np.full((2,2),0.25)))` },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        'Channel capacity of Wi-Fi, fibre, and deep-space links.',
        'Feature selection: keep variables with high $I(X;Y)$ and low redundancy.',
        'Decision trees: information gain is mutual information with the label.',
        'Independent component analysis and causal discovery.',
        'Neuroscience: quantifying information carried by spike trains.',
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Correlation zero does not mean information zero', text: 'For $Z=X\\oplus Y$ with fair independent bits, $\\mathrm{Cov}(X,Z)=0$ but $Z$ is completely determined by $(X,Y)$. Also, plug-in estimates of mutual information from finite samples are biased upward; use corrected estimators (Miller–Madow, NSB) or permutation tests.' },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', items: [
        'Prove $I(X;Y)=I(Y;X)$ from the definition.',
        'Why does $I(X;X)=H(X)$ but $I(X;f(X))\\le H(X)$?',
        'Give a Markov chain where $I(X;Z)<I(X;Y)$ strictly.',
        'Why is $I$ hard to estimate in high dimensions?',
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'paragraph', text: 'Cover & Thomas, *Elements of Information Theory*, ch. 2, 7–8; MacKay, *Information Theory, Inference, and Learning Algorithms*, ch. 8.' },
    ],
  },

  // ── Graphs and games ──────────────────────────────────────────────────────
  {
    id: 'shortest-paths',
    title: 'Shortest Paths: Dijkstra, Bellman–Ford, and Dynamic Programming',
    branchId: 'graph-theory-networks',
    level: 'Undergraduate 2',
    summary: 'Shortest-path algorithms exploit optimal substructure: a subpath of a shortest path is itself shortest. Dijkstra greedily settles vertices with nonnegative weights, while Bellman–Ford handles negative edges by repeated relaxation and detects negative cycles.',
    prerequisites: ['graph-fundamentals', 'paths-cycles', 'mathematical-induction'],
    tags: ['Dijkstra', 'Bellman–Ford', 'dynamic programming', 'complexity', 'negative cycles'],
    status: 'Complete',
    simulationIds: ['graph-algorithms'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: 'Find the minimum-weight route between vertices of a weighted graph: packet routing in the internet, GPS navigation, dependency resolution in build systems, or the cheapest sequence of trades in a network. The mathematical structure is simple enough for exact polynomial-time algorithms even on huge graphs.' },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'callout', tone: 'intuition', title: 'Relax, settle, repeat', text: 'Maintain a tentative distance $d(v)$. "Relaxing" an edge $u\\to v$ asks whether going through $u$ improves $d(v)$. Dijkstra always relaxes from the unsettled vertex with smallest $d$; with nonnegative weights its distance is then final. Bellman–Ford relaxes every edge repeatedly, which is slower but robust.' },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'callout', tone: 'visual', title: 'A wavefront expanding from the source', text: 'Plot vertices in the plane with $d(v)$ as a height. Dijkstra behaves like a flood filling outward: the nearest unsettled vertex is at the wavefront and cannot be improved later because any alternative route would have to pass through a vertex at least as far away.' },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'math', latex: String.raw`$G=(V,E,w),\quad w:E\to\mathbb{R};\qquad \delta(s,t)=\min_{P:s\to t}\sum_{e\in P}w(e).$`, display: true, caption: 'Weighted digraph and shortest-path distance.' },
      { kind: 'math', latex: String.raw`$d(v)\leftarrow\min\big(d(v),\,d(u)+w(u,v)\big)\quad\text{(relaxation of }(u,v)).$`, display: true, caption: 'The basic update.' },
      { kind: 'math', latex: String.raw`$\text{Dijkstra: }O((|V|+|E|)\log|V|);\quad \text{Bellman–Ford: }O(|V||E|);\quad \text{Floyd–Warshall: }O(|V|^3).$`, display: true, caption: 'Standard worst-case complexities.' },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'steps', title: 'Why Dijkstra is correct and why Bellman–Ford needs $V-1$ passes', items: [
        { title: 'Optimal substructure', text: 'If $P=s\\to\\dots\\to u\\to v$ is a shortest path to $v$, its prefix to $u$ must be a shortest path to $u$; otherwise replace it.', math: String.raw`$\delta(s,v)=\delta(s,u)+w(u,v)\ \text{for the predecessor }u\text{ on a shortest path.}$` },
        { title: 'Greedy choice', text: 'Assume all $w\\ge0$. If $u$ is the unsettled vertex of minimum $d(u)$ and a shorter route to $u$ existed through unsettled $x$, then $d(x)+\\delta(x,u)\\ge d(x)\\ge d(u)$, a contradiction.', math: String.raw`$w\ge0\ \implies\ d(u)=\delta(s,u)\ \text{when }u\text{ is extracted.}$` },
        { title: 'Bellman–Ford induction', text: 'After pass $k$, $d(v)$ is at most the weight of the cheapest $s\\to v$ path using at most $k$ edges. A shortest simple path has at most $|V|-1$ edges.', math: String.raw`$d^{(k)}(v)\le\min_{P:\,|P|\le k}w(P)\ \implies\ d^{(|V|-1)}(v)=\delta(s,v).$` },
        { title: 'Negative cycle detection', text: 'If any edge still relaxes on pass $|V|$, a negative-weight cycle is reachable from $s$; no shortest path exists (one can loop to decrease the cost forever).', math: String.raw`$d^{(|V|)}(v)<d^{(|V|-1)}(v)\ \text{for some }v\ \Longleftrightarrow\ \text{reachable negative cycle.}$` },
        { title: 'Reconstruction', text: 'Store a predecessor $\\pi(v)$ on every successful relaxation and walk backwards from the target.', math: String.raw`$v,\pi(v),\pi(\pi(v)),\dots,s\ \text{reversed gives the path.}$` },
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'math', latex: String.raw`$A\to B:4,\ A\to C:2,\ C\to B:1,\ B\to D:5,\ C\to D:8,\ D\to E:2.$`, display: true, caption: 'Example digraph: shortest $A\\to E$ path.' },
      { kind: 'table', headers: ['settled', '$d(A)$', '$d(B)$', '$d(C)$', '$d(D)$', '$d(E)$'], rows: [
        ['— (init)', '0', '$\\infty$', '$\\infty$', '$\\infty$', '$\\infty$'],
        ['$A$', '0', '4', '2', '$\\infty$', '$\\infty$'],
        ['$C$', '0', '3', '2', '8', '$\\infty$'],
        ['$B$', '0', '3', '2', '8', '$\\infty$'],
        ['$D$', '0', '3', '2', '8', '10'],
        ['$E$', '0', '3', '2', '8', '10'],
      ] },
      { kind: 'math', latex: String.raw`$A\to C\to B\to D\to E:\ 2+1+5+2=10,\qquad A\to C\to D\to E=2+8+2=12.$`, display: true, caption: 'The greedy path improves on the direct-ish alternative by 2.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'math', latex: String.raw`$\text{Bellman optimality principle: an optimal policy has the property that every subpolicy is optimal.}$`, display: true, caption: 'The general dynamic-programming foundation of shortest paths.' },
      { kind: 'math', latex: String.raw`$\text{Dijkstra fails with negative edges: }A\to B=2,\ A\to C=5,\ C\to B=-4,\ B\to D=1.$`, display: true, caption: 'Greedy settles $B$ at 2, $D$ at 3; the true optimum $A\\to C\\to B\\to D=5-4+1=2$ is missed.' },
      { kind: 'callout', tone: 'history', title: 'A problem solved twice', text: 'Dijkstra published his algorithm in 1959 in three pages; Bellman–Ford appeared in the late 1950s, and Floyd–Warshall formalised all-pairs shortest paths in 1962. The A* search (1968) adds a heuristic to Dijkstra and is the standard tool in game pathfinding.' },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'code', language: 'python', caption: 'Dijkstra with a heap, Bellman–Ford, and the negative-edge counterexample.', code: String.raw`import heapq, math

def dijkstra(adj, s):
    d = {v: math.inf for v in adj}; d[s] = 0
    pq = [(0, s)]
    while pq:
        du, u = heapq.heappop(pq)
        if du > d[u]: continue
        for v, w in adj[u]:
            if du + w < d[v]:
                d[v] = du + w; heapq.heappush(pq, (d[v], v))
    return d

adj = {'A':[('B',4),('C',2)], 'B':[('D',5)], 'C':[('B',1),('D',8)],
       'D':[('E',2)], 'E':[]}
print("Dijkstra:", dijkstra(adj, 'A'))

neg = {'A':[('B',2),('C',5)], 'C':[('B',-4)], 'B':[('D',1)], 'D':[]}
print("Dijkstra with negative edge:", dijkstra(neg, 'A'))  # D reported as 3, true 2

def bellman_ford(edges, s, n):
    d = {v: math.inf for v in range(n)}; d[s] = 0
    for _ in range(n-1):
        for u,v,w in edges:
            if d[u] + w < d[v]: d[v] = d[u] + w
    return d

edges = [(0,1,2),(0,2,5),(2,1,-4),(1,3,1)]
print("Bellman–Ford:", bellman_ford(edges, 0, 4))` },
      { kind: 'sim', sim: 'graph-algorithms', caption: 'Step through relaxation order and compare greedy settling with repeated relaxation.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        'GPS and map routing with time-dependent edge weights.',
        'OSPF/BGP internet routing protocols (Dijkstra and Bellman–Ford variants).',
        'Network-on-chip latency optimisation and VLSI place-and-route.',
        'Shortest-edit-distance-style problems in sequence alignment.',
        'Robotics motion planning on discretised configuration spaces.',
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Negative edges break greedy, negative cycles break the problem', text: 'With a reachable negative cycle the "shortest" path is $-\\infty$; Bellman–Ford detects it but Dijkstra silently returns a wrong answer. Also, Dijkstra with a naive linear scan is $O(V^2)$ — the binary-heap bound requires a priority queue.' },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', items: [
        'Prove that a subpath of a shortest path is shortest.',
        'Why is one pass of Bellman–Ford per vertex (minus one) enough?',
        'Explain how A* preserves optimality when its heuristic is admissible.',
        'In an undirected graph with nonnegative weights, can a shortest path repeat a vertex?',
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'paragraph', text: 'Cormen, Leiserson, Rivest & Stein, *Introduction to Algorithms*, ch. 24; Dijkstra, *A note on two problems in connexion with graphs* (Numerische Mathematik, 1959); Russell & Norvig, *Artificial Intelligence: A Modern Approach*, ch. 3.' },
    ],
  },

  {
    id: 'nash-equilibrium',
    title: 'Nash Equilibrium: Stable Outcomes of Strategic Interaction',
    branchId: 'game-theory',
    level: 'Undergraduate 3',
    summary: 'A Nash equilibrium is a strategy profile in which no player can improve by changing only their own strategy. Nash proved that every finite game has at least one equilibrium in mixed strategies, a result that made strategic interaction mathematically tractable and reshaped economics, biology, and computer science.',
    prerequisites: ['normal-form-games', 'mixed-strategies', 'probability-distributions'],
    tags: ['equilibrium', 'best response', 'mixed strategies', 'zero-sum', 'fixed point'],
    status: 'Complete',
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: 'In a multi-agent setting no single agent faces a fixed optimisation problem: each payoff depends on what others do. We need a solution concept predicting which strategy profiles can persist when every participant is rational and self-interested. Nash equilibrium is the canonical such concept.' },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'callout', tone: 'intuition', title: 'No profitable unilateral deviation', text: 'At equilibrium each player is playing a best response to the others. Nobody has an incentive to move alone — though all players could be better off if they moved together (as in the prisoner\'s dilemma). Equilibrium is stability, not optimality.' },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'callout', tone: 'visual', title: 'Best-response intersections', text: 'For two players with continuous strategy spaces, plot player 1\'s best response as a function of player 2\'s action and vice versa; equilibria are intersections. In mixed strategies the same picture lives on a simplex, and Nash\'s proof uses a fixed-point theorem to guarantee an intersection.' },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'math', latex: String.raw`$G=(N,(S_i),(u_i)),\quad \sigma^*\text{ is a Nash equilibrium iff }u_i(\sigma_i^*,\sigma_{-i}^*)\ge u_i(s_i,\sigma_{-i}^*)\ \forall i,\forall s_i\in S_i.$`, display: true, caption: 'Formal definition; $\\sigma_{-i}$ denotes all players except $i$.' },
      { kind: 'math', latex: String.raw`$\text{Mixed strategy }\sigma_i\in\Delta(S_i),\qquad u_i(\sigma)=\sum_{s\in S}\Big(\prod_j\sigma_j(s_j)\Big)u_i(s).$`, display: true, caption: 'Expected payoff under mixed strategies.' },
      { kind: 'math', latex: String.raw`$\max_{\sigma_1}\min_{\sigma_2}u_1(\sigma_1,\sigma_2)=\min_{\sigma_2}\max_{\sigma_1}u_1(\sigma_1,\sigma_2)=v\quad\text{(zero-sum minimax).}$`, display: true, caption: 'Von Neumann\'s minimax theorem, proved before Nash\'s general result.' },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'steps', title: 'Finding equilibria by best responses and indifference', items: [
        { title: 'Pure-strategy scan', text: 'For each player, underline the best payoff in each column (row player) or row (column player); cells where both payoffs are underlined are pure equilibria.', math: String.raw`$s_i^*\in BR_i(s_{-i}^*)\ \forall i.$` },
        { title: 'Check for pure equilibria', text: 'If no cell survives, equilibria must be mixed; a zero-sum game with no saddle point always has a fully mixed equilibrium.', math: String.raw`$\text{Prisoner\'s dilemma: }(D,D)\text{ is the unique pure NE.}$` },
        { title: 'Indifference principle', text: 'A player mixing over two actions with positive probability must be indifferent between them; equate the expected payoffs to solve for the opponent\'s mixing probability.', math: String.raw`$u_i(a,\sigma_{-i})=u_i(b,\sigma_{-i})\quad\text{if }\sigma_i(a),\sigma_i(b)>0.$` },
        { title: 'Matching pennies', text: 'Let the row player choose Heads with probability $p$ and the column player with $q$. Row\'s payoff is $(2p-1)(2q-1)$; each player makes the other indifferent by choosing $p=q=1/2$.', math: String.raw`$u_{\text{row}}=(2p-1)(2q-1),\quad \max_p\min_q u=0\ \text{at }p=q=\tfrac12.$` },
        { title: 'Existence', text: 'Nash (1950) maps the compact convex simplex of mixed profiles to itself via best responses (or a perturbed best response) and applies Brouwer\'s fixed-point theorem; a fixed point is an equilibrium.', math: String.raw`$\sigma^*\in\Phi(\sigma^*)\ \implies\ \sigma^*\text{ is a Nash equilibrium.}$` },
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'math', latex: String.raw`$\text{Prisoner\'s dilemma payoffs }(C,C)=(3,3),(C,D)=(0,5),(D,C)=(5,0),(D,D)=(1,1).$`, display: true, caption: 'Defecting strictly dominates cooperating for both players.' },
      { kind: 'table', headers: ['game', 'pure equilibria', 'mixed equilibrium', 'equilibrium payoff'], rows: [
        ['Prisoner\'s dilemma', '$(D,D)$', 'none needed', '$(1,1)$'],
        ['Matching pennies', 'none', '$p=q=1/2$', '$(0,0)$'],
        ['Coordination $(2,2),(0,0),(0,0),(1,1)$', '$(A,A), (B,B)$', '$p=q=1/3$', '$(2/3,2/3)$ at mixed'],
        ['Battle of the sexes', 'two asymmetric', 'one mixed', 'different values'],
      ] },
      { kind: 'math', latex: String.raw`$\text{Coordination: }2q=1-q\Rightarrow q=1/3;\quad u_1=2\cdot\tfrac13\cdot\tfrac13+1\cdot\tfrac23\cdot\tfrac23=\tfrac{2}{9}+\tfrac49=\tfrac23.$`, display: true, caption: 'Mixed equilibrium in the coordination game.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'math', latex: String.raw`$\text{Nash (1950): every finite game possesses at least one Nash equilibrium in mixed strategies.}$`, display: true, caption: 'A proven existence theorem; it does not say equilibria are unique or efficient.' },
      { kind: 'math', latex: String.raw`$\text{von Neumann (1928): every finite zero-sum game has a value and optimal mixed strategies.}$`, display: true, caption: 'The minimax theorem for two-player zero-sum games.' },
      { kind: 'callout', tone: 'history', title: 'From poker to the Nobel Prize', text: 'Von Neumann and Morgenstern formalised games in 1944; Nash\'s 1950 existence proof extended equilibrium beyond zero-sum settings. Nash received the Nobel Memorial Prize in 1994, shared with Harsanyi and Selten. The concept is now used in auction design, network routing, and evolutionary biology (where Maynard Smith adapted it into the evolutionarily stable strategy).' },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'code', language: 'python', caption: 'Brute-force pure equilibria and solve matching pennies by the indifference equations.', code: String.raw`import numpy as np
from itertools import product

# payoff matrices: rows = player 1 actions, columns = player 2 actions
pd1 = np.array([[3,0],[5,1]]); pd2 = np.array([[3,5],[0,1]])
mp1 = np.array([[1,-1],[-1,1]]); mp2 = -mp1
for name, A, B in [('PD', pd1, pd2), ('matching pennies', mp1, mp2)]:
    eq = [(i,j) for i,j in product(range(2),repeat=2)
          if A[i,j] == A[:,j].max() and B[i,j] == B[i,:].max()]
    print(name, "pure NE:", eq)

p = q = 0.5
val = (2*p-1)*(2*q-1)
print("matching pennies mixed value:", val)
print("deviation payoffs:", (2*1-1)*(2*q-1), (2*0-1)*(2*q-1))` },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        'Auction and market mechanism design (Nash equilibria of bidding rules).',
        'Oligopoly pricing (Cournot and Bertrand equilibria).',
        'Traffic routing: Wardrop equilibrium as a large-population limit.',
        'Network security: attacker–defender games and zero-sum modelling.',
        'Evolutionary game theory: stable strategies in biological populations.',
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Equilibrium is not efficiency', text: 'The prisoner\'s dilemma equilibrium $(1,1)$ is worse for both than $(3,3)$. Also, existence is guaranteed but computability is not: finding a mixed equilibrium is PPAD-complete, believed to be hard, and some games have exponentially many equilibria.' },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', items: [
        'Why does a strictly dominant strategy always appear in every equilibrium?',
        'Show that in matching pennies any pure profile has a profitable deviation.',
        'How does the mixed equilibrium of the coordination game compare in payoff to the pure ones?',
        'Why is a Nash equilibrium a fixed point of a best-response correspondence?',
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'paragraph', text: 'Nash, *Equilibrium points in n-person games* (PNAS, 1950); Osborne, *An Introduction to Game Theory* (free online); Daskalakis, Goldberg & Papadimitriou, *The complexity of a problem in game theory* (FOCS 2006).' },
    ],
  },

  // ── Finance and biology ───────────────────────────────────────────────────
  {
    id: 'black-scholes',
    title: 'Black–Scholes: Hedging, PDEs, and the Price of an Option',
    branchId: 'financial-mathematics',
    level: 'Master’s',
    summary: 'The Black–Scholes model prices a European option by constructing a self-financing hedge that eliminates Brownian risk, forcing the portfolio to earn the risk-free rate. The resulting parabolic PDE has a closed-form solution under constant volatility and interest rate, and its delta-hedging argument is the conceptual foundation of modern derivatives pricing.',
    prerequisites: ['stochastic-calculus', 'brownian-motion', 'probability-distributions'],
    tags: ['option pricing', 'Itô lemma', 'risk-neutral measure', 'delta hedging', 'PDE'],
    status: 'Complete',
    simulationIds: ['distribution-lab'],
    derivationIds: ['p4-der-black-scholes'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: 'What is a fair price today for the right to buy a stock at a fixed strike in one year? The payoff is random, but a dynamic trading strategy in the stock and a bond can replicate it. No-arbitrage then pins the price down uniquely — even though the actual probability of exercise is unknown.' },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'callout', tone: 'intuition', title: 'Eliminate the noise by hedging', text: 'Hold $\\Delta=V_S$ shares against a short option. Over an infinitesimal interval the random movements cancel to first order; the remaining drift must equal the risk-free return or an arbitrage exists. Pricing is therefore not about forecasting returns but about the cost of hedging.' },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'callout', tone: 'visual', title: 'Payoff versus price, and the bell curve', text: 'Plot the call payoff $\\max(S-K,0)$ (a kink at $K$) against the smooth Black–Scholes price curve, which lies above it before expiry. The two normal CDF terms $N(d_1)$, $N(d_2)$ are risk-neutral probabilities: $N(d_2)$ is the probability of finishing in the money, and $S N(d_1)$ reflects the stock-weighted hedge.' },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'math', latex: String.raw`$dS_t=\mu S_t\,dt+\sigma S_t\,dW_t,\qquad V_T=\max(S_T-K,0).$`, display: true, caption: 'Geometric Brownian motion and the European call payoff.' },
      { kind: 'math', latex: String.raw`$V_t+\frac12\sigma^2S^2V_{SS}+rSV_S-rV=0,\qquad V(S,T)=\max(S-K,0).$`, display: true, caption: 'Black–Scholes PDE with terminal condition.' },
      { kind: 'math', latex: String.raw`$C=S\,N(d_1)-Ke^{-r(T-t)}N(d_2),\quad d_1=\frac{\ln(S/K)+(r+\frac12\sigma^2)\tau}{\sigma\sqrt{\tau}},\ d_2=d_1-\sigma\sqrt{\tau}.$`, display: true, caption: 'Closed-form call price; $\\tau=T-t$, $N$ is the standard normal CDF.' },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'steps', title: 'Itô, delta hedge, no arbitrage, risk-neutral valuation', items: [
        { title: 'Apply Itô\'s lemma', text: 'For $V(S_t,t)$ with $dS=\\mu S\\,dt+\\sigma S\\,dW$, the quadratic variation $(dS)^2=\\sigma^2S^2dt$ contributes the second-derivative term.', math: String.raw`$dV=\left(V_t+\mu S V_S+\tfrac12\sigma^2S^2V_{SS}\right)dt+\sigma S V_S\,dW.$` },
        { title: 'Build a hedged portfolio', text: 'Hold one short option and $\\Delta=V_S$ shares; its value is $\\Pi=-V+\\Delta S$.', math: String.raw`$d\Pi=-dV+\Delta\,dS=\left(-V_t-\tfrac12\sigma^2S^2V_{SS}\right)dt$` },
        { title: 'No-arbitrage condition', text: 'The portfolio is instantaneously riskless, so it must earn $r\\Pi\\,dt$; substitute $\\Pi=-V+SV_S$.', math: String.raw`$-V_t-\tfrac12\sigma^2S^2V_{SS}=r(-V+SV_S)\ \implies\ V_t+\tfrac12\sigma^2S^2V_{SS}+rSV_S-rV=0.$` },
        { title: 'Reduce to the heat equation', text: 'Set $S=K e^x$, $\\tau=T-t$, $V=K v(x,\\tau)$; choosing $x$ so drift terms cancel yields $v_\\tau=\\tfrac12\\sigma^2v_{xx}$ with a kinked initial condition.', math: String.raw`$v_\tau=\tfrac12\sigma^2 v_{xx},\qquad v(x,0)=\max(e^x-1,0).$` },
        { title: 'Convolve with the heat kernel', text: 'Integrate the payoff against a lognormal density; completing the square gives the two normal CDF terms.', math: String.raw`$C=e^{-r\tau}\int_{\ln K/S}^{\infty}(Se^z-K)\frac{e^{-(z-(r-\sigma^2/2)\tau)^2/(2\sigma^2\tau)}}{\sigma\sqrt{2\pi\tau}}dz.$` },
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'math', latex: String.raw`$S=100,\ K=100,\ r=0.05,\ \sigma=0.20,\ \tau=1:\ d_1=\frac{0+0.05+0.02}{0.2}=0.35,\ d_2=0.15.$`, display: true, caption: 'At-the-money one-year call.' },
      { kind: 'table', headers: ['quantity', 'value', 'meaning'], rows: [
        ['$N(d_1)$', '0.63683065', 'delta / stock-weighted exercise probability'],
        ['$N(d_2)$', '0.55961769', 'risk-neutral probability $S_T>K$'],
        ['call price $C$', '10.45058357', 'no-arbitrage value'],
        ['put price $P$', '5.57352601', 'put–call parity: $P=C-S+Ke^{-r\\tau}$'],
        ['gamma $\\Gamma$', '0.0187621', '$\\varphi(d_1)/(S\\sigma\\sqrt{\\tau})$'],
      ] },
      { kind: 'math', latex: String.raw`$C=100(0.63683065)-100e^{-0.05}(0.55961769)=63.683065-53.232481=10.450584.$`, display: true, caption: 'Direct numerical evaluation.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'math', latex: String.raw`$\text{Put–call parity (model-free): }C-P=S-Ke^{-r\tau}.$`, display: true, caption: 'Follows from identical payoff $C-P=S-K$ at expiry and no arbitrage.' },
      { kind: 'math', latex: String.raw`$\text{Feynman–Kac: }V=e^{-r\tau}\mathbb{E}^{\mathbb{Q}}[\max(S_T-K,0)]\ \text{solves the BS PDE.}$`, display: true, caption: 'The probabilistic representation of the PDE solution.' },
      { kind: 'callout', tone: 'history', title: '1973: a formula and a market', text: 'Fischer Black and Myron Scholes published the formula in 1973; Robert Merton extended the framework and coined the term "Black–Scholes". The Chicago Board Options Exchange opened the same year. Scholes and Merton received the 1997 Nobel Prize; Black had died in 1995. Long-Term Capital Management\'s 1998 collapse became a cautionary tale about model risk and leverage.' },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'code', language: 'python', caption: 'Price the call and put with NumPy, then verify delta numerically.', code: String.raw`import numpy as np
from math import log, sqrt, exp, erf

def N(x): return 0.5*(1+erf(x/np.sqrt(2)))
def bs_call(S,K,r,sig,T):
    d1 = (log(S/K) + (r+0.5*sig**2)*T)/(sig*sqrt(T)); d2 = d1-sig*sqrt(T)
    return S*N(d1) - K*exp(-r*T)*N(d2), d1, d2

c,d1,d2 = bs_call(100,100,0.05,0.2,1.0)
print("price", c, "d1", d1, "d2", d2, "N(d1)", N(d1), "N(d2)", N(d2))
p = c - 100 + 100*exp(-0.05)
print("put by parity", p)
h = 1e-4
print("delta analytic", N(d1), "numerical", (bs_call(100+h,100,.05,.2,1)[0]-bs_call(100-h,100,.05,.2,1)[0])/(2*h))` },
      { kind: 'sim', sim: 'distribution-lab', caption: 'Compare the lognormal terminal distribution with the risk-neutral density used in the pricing integral.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        'Exchange-traded equity options and index options pricing.',
        'Implied volatility surfaces and the volatility smile.',
        'Structured products and exotic option libraries built on the same PDE.',
        'Credit risk: Merton\'s structural model treats equity as a call on firm value.',
        'Real options: valuing managerial flexibility in capital investment.',
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'The assumptions are the model', text: 'Constant volatility, continuous paths, no dividends, and frictionless markets are idealisations; real markets show smiles, jumps, and stochastic volatility. Using the historical drift $\\mu$ instead of the risk-free rate $r$ is a conceptual error: hedging removes $\\mu$ from the price.' },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', items: [
        'Why does the option price not depend on the expected return $\\mu$?',
        'Derive put–call parity from terminal payoffs.',
        'What is the interpretation of $N(d_2)$ under the risk-neutral measure?',
        'How does the PDE change when the stock pays a continuous dividend yield $q$?',
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'paragraph', text: 'Black & Scholes, *The Pricing of Options and Corporate Liabilities* (JPE, 1973); Shreve, *Stochastic Calculus for Finance II*, ch. 4–5; Hull, *Options, Futures, and Other Derivatives*, ch. 13–15.' },
    ],
  },

  {
    id: 'epidemiological-models',
    title: 'Epidemiological Models: The SIR Equations and $R_0$',
    branchId: 'biological-mathematics',
    level: 'Undergraduate 2',
    summary: 'Compartmental models divide a population into susceptible, infected, and recovered classes and describe their flow by ordinary differential equations. The basic reproduction number $R_0$ decides whether an outbreak grows, and the final-size equation predicts how many people are eventually infected.',
    prerequisites: ['ode', 'population-dynamics', 'exponents-powers'],
    tags: ['SIR model', 'reproduction number', 'herd immunity', 'compartments', 'final size'],
    status: 'Complete',
    simulationIds: ['sir-model'],
    derivationIds: ['p4-der-sir-r0'],
    problemIds: ['p4-prob-sir-threshold'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: 'How fast will an outbreak grow, when will it peak, and what fraction of the population will be infected? Compartmental ODEs turn transmission and recovery assumptions into quantitative answers that guide vaccination thresholds and intervention planning.' },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'callout', tone: 'intuition', title: 'Contact rate times infectious lifetime', text: 'One infected individual makes roughly $\\beta$ effective contacts per unit time and remains infectious for $1/\\gamma$ time units. Their expected number of secondary cases is therefore $\\beta/\\gamma$ early in the epidemic, when almost everyone is susceptible. Above one, the outbreak grows.' },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'callout', tone: 'visual', title: 'The epidemic curve', text: 'Plot $S(t)$, $I(t)$, $R(t)$: $S$ decays monotonically from $N$, $I$ rises to a peak then falls, and $R$ grows toward its final value. The peak of $I$ occurs exactly when $S/N$ crosses $1/R_0$ — the moment susceptible depletion plus recovery outpaces new infections.' },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'math', latex: String.raw`$\dot S=-\frac{\beta S I}{N},\qquad \dot I=\frac{\beta S I}{N}-\gamma I,\qquad \dot R=\gamma I,\qquad S+I+R=N.$`, display: true, caption: 'The SIR system with frequency-dependent (mass-action) transmission.' },
      { kind: 'math', latex: String.raw`$R_0=\frac{\beta}{\gamma},\qquad \mathcal{R}_t=R_0\frac{S(t)}{N}\quad\text{(effective reproduction number)}.$`, display: true, caption: 'Basic and time-dependent reproduction numbers.' },
      { kind: 'math', latex: String.raw`$1-s_\infty=e^{-R_0(1-s_\infty)},\qquad s_\infty=S(\infty)/N.$`, display: true, caption: 'Final-size relation for the fraction never infected.' },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'steps', title: '$R_0$, early growth, peak, and final size', items: [
        { title: 'Early exponential phase', text: 'When $S\\approx N$, the infected equation linearises to $\\dot I\\approx(\\beta-\\gamma)I$.', math: String.raw`$I(t)\approx I(0)e^{(\beta-\gamma)t}=I(0)e^{\gamma(R_0-1)t}.$` },
        { title: 'Threshold', text: 'Growth requires $\\beta>\\gamma$, i.e. $R_0>1$; otherwise infections decay from the start.', math: String.raw`$R_0>1\iff\text{epidemic threshold exceeded}; \quad T_d=\frac{\ln2}{\gamma(R_0-1)}.$` },
        { title: 'Peak condition', text: 'Set $\\dot I=I(\\beta S/N-\\gamma)=0$ with $I>0$.', math: String.raw`$S_{\text{peak}}/N=\frac{\gamma}{\beta}=\frac{1}{R_0}.$` },
        { title: 'Final-size equation', text: 'Divide $\\dot R$ by $\\dot S$ to get $dR/dS=-\\gamma/(\\beta S/N)$; integrate from $(N,0)$ to $(S_\\infty,R_\\infty)$ and use $R_\\infty=N-S_\\infty$ (with $I_\\infty=0$).', math: String.raw`$\ln\frac{S_\infty}{N}=-\frac{\beta}{\gamma}\left(1-\frac{S_\infty}{N}\right)\implies s_\infty=e^{-R_0(1-s_\infty)}.$` },
        { title: 'Herd immunity', text: 'Transmission cannot sustain itself once $S/N<1/R_0$; the critical immune fraction is $1-1/R_0$.', math: String.raw`$p_c=1-\frac{1}{R_0}\quad\text{(homogeneous-mixing vaccine threshold)}.$` },
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'math', latex: String.raw`$\beta=0.3\ \text{day}^{-1},\ \gamma=0.1\ \text{day}^{-1}:\ R_0=3,\ \text{doubling time }T_d=\ln2/0.2=3.4657\ \text{days}.$`, display: true, caption: 'An outbreak with an infectious period of 10 days.' },
      { kind: 'table', headers: ['quantity', 'value', 'derivation'], rows: [
        ['$R_0$', '3.0', '$\\beta/\\gamma=0.3/0.1$'],
        ['herd-immunity threshold', '$2/3\\approx0.6667$', '$1-1/R_0$'],
        ['susceptibles at peak', '$N/3$', '$1/R_0$'],
        ['final susceptible fraction $s_\\infty$', '0.059520', 'root of $s=e^{-3(1-s)}$'],
        ['final attack rate', '0.940480', '$1-s_\\infty$'],
      ] },
      { kind: 'math', latex: String.raw`$s=0.0595202093:\ e^{-3(1-0.0595202093)}=e^{-2.820439372}=0.0595202093.\ \checkmark$`, display: true, caption: 'Numerical verification of the final-size root.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'math', latex: String.raw`$\text{Threshold theorem: for SIR, }I(t)\to0\text{ as }t\to\infty\ \text{always; }R_\infty>0\iff R_0>1\text{ and }S(0)>0.$`, display: true, caption: 'Proved from the final-size equation and monotonicity of $S$.' },
      { kind: 'math', latex: String.raw`$\text{Next-generation matrix: }R_0=\rho(K),\quad K_{ij}=\text{expected type-}i\text{ cases from one type-}j\text{ case.}$`, display: true, caption: 'Generalisation to age groups or multiple stages (spectral radius).' },
      { kind: 'callout', tone: 'history', title: 'From 1927 to public health', text: 'Kermack and McKendrick formulated the SIR model in 1927 to explain the abrupt end of epidemics. Ronald Ross earlier developed malaria models. The next-generation-matrix formalism of Diekmann, Heesterbeek and Metz (1990) made $R_0$ rigorous for structured populations.' },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'code', language: 'python', caption: 'Integrate SIR with SciPy and check the peak condition numerically.', code: String.raw`import numpy as np
from scipy.integrate import solve_ivp

beta, gamma, N = 0.3, 0.1, 1000.0
def rhs(t, y):
    S, I, R = y
    return [-beta*S*I/N, beta*S*I/N - gamma*I, gamma*I]

sol = solve_ivp(rhs, [0,200], [999.,1.,0.], dense_output=True, max_step=0.1)
t = np.linspace(0,200,20001); S,I,R = sol.sol(t)
i_peak = np.argmax(I)
print("R0 =", beta/gamma)
print("peak time", t[i_peak], "peak I", I[i_peak])
print("S/N at peak", S[i_peak]/N, "expected 1/R0 =", 1/(beta/gamma))
print("final S/N", S[-1]/N, "final size residual:",
      np.exp(-beta/gamma*(1-S[-1]/N)) - S[-1]/N)` },
      { kind: 'sim', sim: 'sir-model', caption: 'Change $\\beta$ and $\\gamma$ and watch the threshold at $R_0=1$ and the peak shift.' },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        'Influenza, COVID-19, and measles forecast scenarios.',
        'Vaccination allocation and herd-immunity planning.',
        'Evaluating non-pharmaceutical interventions by effective $R_t$.',
        'Zoonotic spillover and vector-borne disease models (SEIR, SIS).',
        'Antimicrobial resistance spread in hospital networks.',
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'A model is not a forecast', text: 'Homogeneous mixing and fixed $\\beta$ are strong simplifications; real contact networks, heterogeneity, and behaviour changes matter. The herd-immunity threshold formula assumes random vaccination and a single homogeneous population — never apply it mechanically to structured populations.' },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', items: [
        'Why does the epidemic end before $S=0$?',
        'How does an SEIR compartment (exposed but not infectious) change early growth?',
        'Derive the doubling time in terms of $R_0$ and the infectious period.',
        'What does the spectral radius of the next-generation matrix mean?',
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'paragraph', text: 'Kermack & McKendrick, *A contribution to the mathematical theory of epidemics* (Proc. R. Soc. A, 1927); Anderson & May, *Infectious Diseases of Humans*; Keeling & Rohani, *Modeling Infectious Diseases in Humans and Animals*.' },
    ],
  },

  // ── Mathematics for AI ────────────────────────────────────────────────────
  {
    id: 'transformers-math',
    title: 'Transformers: Attention as Differentiable Matrix Multiplication',
    branchId: 'mathematics-for-ai',
    level: 'Master’s',
    summary: 'A transformer layer is a composition of linear maps, a softmax-weighted dictionary lookup called attention, residual connections, and normalisation — all differentiable end to end. Its mathematics explains permutation equivariance, quadratic sequence-length cost, and why scaling by $\\sqrt{d_k}$ keeps gradients well behaved.',
    prerequisites: ['matrix-multiplication', 'linear-algebra-ml', 'gradient'],
    tags: ['self-attention', 'softmax', 'matrix multiplication', 'positional encoding', 'backpropagation'],
    status: 'Complete',
    derivationIds: ['p4-der-attention-matrix'],
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: 'Recurrent models process sequences step by step, which limits parallelism. Transformers let every token attend to every other token simultaneously: the representation of a word is a weighted mixture of all tokens\' value vectors, with weights learned from query–key similarity.' },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'callout', tone: 'intuition', title: 'Soft dictionary lookup', text: 'Each token asks a question (query $q$), every token offers a label (key $k$) and content (value $v$). Similarity $q\\cdot k$ decides how much of each value to read. Hard lookup would pick one key; softmax makes the lookup smooth, so gradients can flow.' },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'callout', tone: 'visual', title: 'The attention matrix', text: 'Visualise the $n\\times n$ matrix $\\mathrm{softmax}(QK^\\top/\\sqrt{d_k})$ as a heatmap: row $i$ is a probability distribution over which tokens token $i$ reads. Diagonal-dominant heatmaps mean local attention; off-diagonal stripes reveal syntactic or coreference relationships.' },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'math', latex: String.raw`$Q=XW_Q,\quad K=XW_K,\quad V=XW_V,\qquad X\in\mathbb{R}^{n\times d_{\text{model}}}.$`, display: true, caption: 'Projections of token embeddings into queries, keys, and values.' },
      { kind: 'math', latex: String.raw`$\mathrm{Attention}(Q,K,V)=\mathrm{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right)V\in\mathbb{R}^{n\times d_v}.$`, display: true, caption: 'Scaled dot-product attention.' },
      { kind: 'math', latex: String.raw`$\mathrm{softmax}(z)_i=\frac{e^{z_i}}{\sum_j e^{z_j}},\qquad \mathrm{MultiHead}=\mathrm{Concat}(\mathrm{head}_1,\dots,\mathrm{head}_h)W_O.$`, display: true, caption: 'Softmax and multi-head composition.' },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'steps', title: 'Why scaling, equivariance, and cost', items: [
        { title: 'Dot-product similarity', text: 'With $q,k\\in\\mathbb{R}^{d_k}$ independent unit-variance entries, $q\\cdot k=\\sum_i q_i k_i$ has variance $d_k$.', math: String.raw`$\mathrm{Var}(q^\top k)=d_k\ \implies\ \text{typical logits grow as }\sqrt{d_k}.$` },
        { title: 'Softmax saturation', text: 'Large logits make softmax nearly one-hot, producing tiny gradients. Dividing by $\\sqrt{d_k}$ restores unit variance to the logits.', math: String.raw`$\frac{q^\top k}{\sqrt{d_k}}\ \implies\ \mathrm{Var}=1.$` },
        { title: 'Permutation equivariance', text: 'For any permutation matrix $P$, attention satisfies $\\mathrm{Attn}(PX,PK,PV)=P\\,\\mathrm{Attn}(X,K,V)$ because $(PX)(PK)^\\top=P XK^\\top P^\\top$. Hence positional encodings are needed to break symmetry.', math: String.raw`$\mathrm{Attn}(PX,PK,PV)=P\,\mathrm{Attn}(X,K,V).$` },
        { title: 'Computational cost', text: 'Forming $QK^\\top$ costs $O(n^2d_k)$ multiply-adds and storing it uses $O(n^2)$ memory; the subsequent product with $V$ costs $O(n^2d_v)$ — quadratic in sequence length.', math: String.raw`$\text{cost}=O(n^2d+n d^2),\qquad \text{memory}=O(n^2).$` },
        { title: 'Backpropagation shape', text: 'If $S=\\mathrm{softmax}(A)$ and $Y=SV$, the softmax Jacobian gives the gradient below, showing efficient gradient flow through the attention matrix.', math: String.raw`$\frac{\partial L}{\partial A_{ij}}=S_{ij}\left((dY\,V^\top)_{ij}-\sum_k S_{ik}(dY\,V^\top)_{ik}\right).$` },
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'math', latex: String.raw`$d_k=2,\ Q=K=I_2,\ V=\begin{pmatrix}1&2\\3&4\end{pmatrix}:\ \frac{QK^\top}{\sqrt2}=\mathrm{diag}(1/\sqrt2,1/\sqrt2).$`, display: true, caption: 'A two-token toy example.' },
      { kind: 'table', headers: ['row', 'softmax weights', 'attention output'], rows: [
        ['token 1', '$(0.669762,\\ 0.330238)$', '$(1.660477,\\ 2.660477)$'],
        ['token 2', '$(0.669762,\\ 0.330238)$', '$(1.660477,\\ 2.660477)$'],
      ] },
      { kind: 'math', latex: String.raw`$a=\frac{e^{1/\sqrt2}}{e^{1/\sqrt2}+1}=0.6697615493,\qquad a\cdot(1,2)+(1-a)\cdot(3,4)=(1.66047690,2.66047690).$`, display: true, caption: 'Numbers computed directly from the softmax formula.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'math', latex: String.raw`$\mathrm{softmax}(z+c\mathbf{1})=\mathrm{softmax}(z)\quad\text{(shift invariance)}.$`, display: true, caption: 'Proof: multiply numerator and denominator by $e^c$; this improves numerical stability.' },
      { kind: 'math', latex: String.raw`$\text{Self-attention without positional encoding is permutation equivariant (shown above).}$`, display: true, caption: 'A proved structural property, not an empirical observation.' },
      { kind: 'callout', tone: 'history', title: '2017: Attention Is All You Need', text: 'Vaswani et al. replaced recurrence with attention in 2017, enabling massive parallel training. The idea builds on Bahdanau et al.\'s 2014 attention for machine translation. Later work (Linformer, Performer, FlashAttention) targets the quadratic cost via low-rank approximations or IO-aware kernels.' },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'code', language: 'python', caption: 'Implement scaled dot-product attention in NumPy and verify permutation equivariance.', code: String.raw`import numpy as np

def softmax(z, axis=-1):
    z = z - z.max(axis=axis, keepdims=True)
    e = np.exp(z)
    return e / e.sum(axis=axis, keepdims=True)

def attention(Q, K, V):
    dk = Q.shape[-1]
    return softmax(Q @ K.T / np.sqrt(dk)) @ V

Q = K = np.eye(2); V = np.array([[1.,2.],[3.,4.]])
Y = attention(Q, K, V)
print("attention output:\n", Y)

P = np.array([[0.,1.],[1.,0.]])   # swap the two tokens
print("permuted:\n", attention(P@Q, P@K, P@V))
print("equivariant?", np.allclose(attention(P@Q, P@K, P@V), P@Y))` },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        'Machine translation, summarisation, and language modelling.',
        'Vision transformers treating image patches as tokens.',
        'Protein structure prediction with attention over residue pairs.',
        'Recommendation systems using self-attention over user histories.',
        'Speech recognition with conformer and transformer encoders.',
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Do not drop the scaling or the positional encoding', text: 'Omitting $1/\\sqrt{d_k}$ destabilises training for large $d_k$; omitting positional information makes the model unable to distinguish token order. Also, causal (autoregressive) masking is required in decoders to prevent information leaking from future tokens.' },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', items: [
        'Why does self-attention alone not know word order?',
        'Prove softmax shift invariance and explain its numerical benefit.',
        'How does multi-head attention differ from one wide head?',
        'Why is attention memory quadratic in the sequence length?',
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'paragraph', text: 'Vaswani et al., *Attention Is All You Need* (NeurIPS 2017); Bahdanau, Cho & Bengio (ICLR 2015); Dao et al., *FlashAttention* (NeurIPS 2022).' },
    ],
  },

  {
    id: 'statistical-learning-theory-ai',
    title: 'Statistical Learning Theory: Why Generalisation Is Possible',
    branchId: 'mathematics-for-ai',
    level: 'Master’s',
    summary: 'Statistical learning theory relates empirical risk on a training sample to true risk on unseen data using concentration inequalities and capacity measures such as VC dimension and Rademacher complexity. It explains the bias–variance tradeoff and gives conditions under which empirical risk minimisation is consistent.',
    prerequisites: ['probability-ml', 'concentration-inequalities', 'statistical-learning-theory'],
    tags: ['PAC learning', 'VC dimension', 'generalisation bound', 'Rademacher complexity', 'bias–variance'],
    status: 'Complete',
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: 'A model that fits the training set perfectly may still fail on new data. Learning theory asks: under what conditions does small training error imply small population error, and how many samples are needed to guarantee it? The answers are probabilistic inequalities, not heuristics.' },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'callout', tone: 'intuition', title: 'Capacity is the enemy of certainty', text: 'A hypothesis class that can fit any labelling of $n$ points has learned nothing from those points: its empirical error can be zero by accident. Generalisation requires restricting capacity, and the cost of that restriction is approximation error — the bias–variance tradeoff.' },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'callout', tone: 'visual', title: 'Two curves and a U', text: 'Plot approximation error decreasing and estimation error increasing as model capacity grows; their sum forms a U-shaped test-error curve. The modern "double descent" curve extends this picture past the interpolation threshold and is an empirical observation for many models, with a growing but incomplete theory.' },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'math', latex: String.raw`$R(h)=\mathbb{E}_{(X,Y)\sim P}[\ell(h(X),Y)],\qquad \hat R_n(h)=\frac1n\sum_{i=1}^n\ell(h(X_i),Y_i).$`, display: true, caption: 'True risk and empirical risk.' },
      { kind: 'math', latex: String.raw`$P\big(|\hat R_n(h)-R(h)|>\varepsilon\big)\le 2e^{-2n\varepsilon^2}\quad\text{(Hoeffding, bounded loss).}$`, display: true, caption: 'Concentration for a fixed hypothesis.' },
      { kind: 'math', latex: String.raw`$R(h)\le\hat R_n(h)+\sqrt{\frac{\mathrm{VC}(\mathcal H)\log(2n/\mathrm{VC}(\mathcal H))+\log(1/\delta)}{n}}\quad\text{(illustrative VC bound).}$`, display: true, caption: 'A uniform bound holding with probability at least $1-\\delta$.' },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'steps', title: 'From Hoeffding to a generalisation guarantee', items: [
        { title: 'Fixed $h$: Hoeffding', text: 'The empirical mean of $n$ independent bounded variables concentrates around its expectation.', math: String.raw`$P(|\hat R_n(h)-R(h)|>\varepsilon)\le2\exp(-2n\varepsilon^2).$` },
        { title: 'Many $h$: union bound', text: 'For a finite class $\\mathcal H$, apply Hoeffding to every hypothesis and sum failure probabilities.', math: String.raw`$P\!\left(\sup_{h\in\mathcal H}|\hat R_n-R|>\varepsilon\right)\le2|\mathcal H|e^{-2n\varepsilon^2}.$` },
        { title: 'Invert for $\\varepsilon$', text: 'Set the right-hand side to $\\delta$ and solve for the uniform deviation.', math: String.raw`$\varepsilon=\sqrt{\frac{\log|\mathcal H|+\log(2/\delta)}{2n}}.$` },
        { title: 'Infinite classes: VC dimension', text: 'Replace $\\log|\\mathcal H|$ by Sauer\'s lemma growth bound $\\sum_{k=0}^{V}\\binom{n}{k}\\le(n+1)^V$, where $V=\\mathrm{VC}(\\mathcal H)$ is the largest shattered set size.', math: String.raw`$\log|\mathcal H|_{|_{x_1^n}}\le V\log(n+1).$` },
        { title: 'Consistency condition', text: 'Empirical risk minimisation is consistent when the class has finite VC dimension; Rademacher complexity gives sharper, data-dependent bounds.', math: String.raw`$\mathbb{E}\sup_{h\in\mathcal H}\left|\hat R_n(h)-R(h)\right|\le 2\mathfrak{R}_n(\mathcal H).$` },
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'math', latex: String.raw`$n=1000,\ \varepsilon=0.05:\ 2e^{-2(1000)(0.05)^2}=2e^{-5}=0.0134758940.$`, display: true, caption: 'About a 1.35 % chance of a deviation exceeding five percentage points for a fixed $h$.' },
      { kind: 'table', headers: ['hypothesis class', 'VC dimension', 'sample complexity (approx.)'], rows: [
        ['thresholds on $\\mathbb{R}$', '1', '$O(1/\\varepsilon)$'],
        ['intervals on $\\mathbb{R}$', '2', '$O(1/\\varepsilon)$'],
        ['halfspaces in $\\mathbb{R}^d$', '$d+1$', '$O(d/\\varepsilon)$'],
        ['finite class $|\\mathcal H|=1000$', '$\\le\\log_2 1000$', '$\\varepsilon\\approx0.0704$ at $n=1000,\\delta=0.05$'],
      ] },
      { kind: 'math', latex: String.raw`$|\mathcal H|=1000,\ n=1000,\ \delta=0.05:\ \varepsilon=\sqrt{\frac{\ln1000+\ln20}{2000}}=0.0703717\ldots$`, display: true, caption: 'Finite-class guarantee computed from the union bound.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'math', latex: String.raw`$\text{Sauer–Shelah lemma: }\Pi_{\mathcal H}(n)\le\sum_{k=0}^{V}\binom{n}{k}\quad\text{where }V=\mathrm{VCdim}(\mathcal H).$`, display: true, caption: 'A proven combinatorial bound (a theorem, proved by induction or shifting).' },
      { kind: 'math', latex: String.raw`$\text{No free lunch: averaged over all distributions, no learning algorithm beats any other.}$`, display: true, caption: 'Wolpert (1996) — a theorem about averages, not a claim that learning is impossible in the real world.' },
      { kind: 'callout', tone: 'history', title: 'Valiant, Vapnik and Chervonenkis', text: 'Leslie Valiant formalised PAC learning in 1984; Vapnik and Chervonenkis developed VC theory in the 1960s–70s. The concept class "VC dimension" is named after them. Modern deep learning has challenged the theory: practical networks often have far more parameters than samples yet generalise, a phenomenon under active study.' },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'code', language: 'python', caption: 'Empirically compare training and test error as model degree grows — the bias–variance tradeoff.', code: String.raw`import numpy as np

rng = np.random.default_rng(0)
n = 60
x = np.linspace(-1,1,n)
y_true = np.sin(3*x)
y = y_true + 0.25*rng.normal(size=n)
xt = np.linspace(-1,1,400); yt = np.sin(3*xt)

for deg in [1,3,5,9,15]:
    Xtr = np.vander(x, deg+1); Xte = np.vander(xt, deg+1)
    w = np.linalg.lstsq(Xtr, y, rcond=None)[0]
    train = np.mean((Xtr@w - y)**2)
    test = np.mean((Xte@w - yt)**2)
    print(f"degree {deg:2d}: train MSE {train:.5f}  test MSE {test:.5f}")

eps = np.sqrt((np.log(1000)+np.log(20))/(2*1000))
print("finite-class epsilon bound:", eps)` },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        'Choosing model capacity: regularisation, early stopping, dropout.',
        'Sample-size planning for clinical prediction models.',
        'PAC-Bayes bounds for randomised and Bayesian neural networks.',
        'Generalisation guarantees for reinforcement learning.',
        'Distribution shift analysis: bounds typically fail when train and test differ.',
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Bounds are often loose, not false', text: 'VC bounds are worst-case over all distributions and can be vacuous for large networks; they are guarantees, not typical predictions. Double descent and benign overfitting are empirical observations with partial theoretical explanations — do not present them as settled theorems.' },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', items: [
        'Why do intervals on the line have VC dimension 2?',
        'Explain the union-bound step in the finite-class generalisation bound.',
        'What is the difference between approximation error and estimation error?',
        'Why does distribution shift invalidate standard generalisation bounds?',
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'paragraph', text: 'Valiant, *A theory of the learnable* (CACM, 1984); Vapnik, *The Nature of Statistical Learning Theory*; Shalev-Shwartz & Ben-David, *Understanding Machine Learning: From Theory to Algorithms* (free online).' },
    ],
  },

  // ── Research frontiers ────────────────────────────────────────────────────
  {
    id: 'riemann-hypothesis-frontier',
    title: 'The Riemann Hypothesis: An Open Frontier',
    branchId: 'research-frontiers',
    level: 'Doctoral',
    summary: 'The Riemann hypothesis conjectures that every nontrivial zero of the zeta function has real part exactly $1/2$. It is unproved; what is proved includes the functional equation, the prime number theorem, Hardy\'s infinity of zeros on the critical line, and partial density results.',
    prerequisites: ['riemann-zeta-function', 'analytic-number-theory', 'prime-number-theory'],
    tags: ['open problem', 'zeta function', 'prime numbers', 'critical line', 'Hilbert–Pólya'],
    status: 'Complete',
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: 'The distribution of primes has an irregular local structure but a strikingly regular average. Riemann discovered that the fluctuations are encoded in the zeros of $\\zeta(s)$. The hypothesis, stated in 1859, would give the sharp possible error term in the prime number theorem — but it remains one of the great unsolved problems.' },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'callout', tone: 'intuition', title: 'Music of the primes', text: 'Think of $\\zeta$ zeros as frequencies in a Fourier-like decomposition of the prime-counting error. If all frequencies lie on one vertical line, the error is as small as possible — roughly the size of random fluctuations, $O(\\sqrt{x}\\log x)$. Off-line zeros would produce larger, systematic oscillations.' },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'callout', tone: 'visual', title: 'The critical strip and the line', text: 'Plot the zero-free region: all nontrivial zeros lie in $0<\\Re s<1$, symmetry forces them into quadruples $\\rho,1-\\rho,\\bar\\rho,1-\\bar\\rho$, and the critical line is $\\Re s=1/2$. Numerical plots of $|\\zeta(1/2+it)|$ show zeros as dips along this line.' },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'math', latex: String.raw`$\zeta(s)=\sum_{n=1}^{\infty}n^{-s}\quad(\Re s>1),\qquad \zeta(s)=2^s\pi^{s-1}\sin(\pi s/2)\Gamma(1-s)\zeta(1-s)\quad\text{(functional equation)}.$`, display: true, caption: 'Dirichlet series and analytic continuation; $s=1$ is the only pole.' },
      { kind: 'math', latex: String.raw`$\text{RH (conjecture): }\rho=\tfrac12+i\gamma\ \text{for every nontrivial zero }\rho\ \text{of }\zeta.$`, display: true, caption: 'The precise open statement.' },
      { kind: 'math', latex: String.raw`$N(T)=\frac{T}{2\pi}\log\frac{T}{2\pi}-\frac{T}{2\pi}+\frac78+S(T),\qquad S(T)=O(\log T).$`, display: true, caption: 'Riemann–von Mangoldt formula with the correction term.' },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'steps', title: 'From Euler product to the prime number theorem and the hypothesis', items: [
        { title: 'Euler product', text: 'For $\\Re s>1$, unique factorisation gives the product over primes.', math: String.raw`$\zeta(s)=\prod_p(1-p^{-s})^{-1}.$` },
        { title: 'Explicit formula', text: 'Taking logarithmic derivatives and applying Mellin inversion expresses $\\psi(x)=\\sum_{n\\le x}\\Lambda(n)$ as $x$ minus a sum over zeros.', math: String.raw`$\psi(x)=x-\sum_{\rho}\frac{x^\rho}{\rho}-\log(2\pi)-\frac12\log(1-x^{-2}).$` },
        { title: 'Prime number theorem (proved)', text: 'Hadamard and de la Vallée Poussin (1899) proved $\\zeta(1+it)\\neq0$, which gives $\\psi(x)\\sim x$ and $\\pi(x)\\sim x/\\log x$.', math: String.raw`$\pi(x)\sim\mathrm{Li}(x)\sim\frac{x}{\log x}.$` },
        { title: 'What RH would add', text: 'If every $\\Re\\rho=1/2$, each term $x^\\rho$ has size $\\sqrt x$, yielding the sharp error.', math: String.raw`$\text{RH}\implies\pi(x)=\mathrm{Li}(x)+O(\sqrt x\log x).\quad\text{Conversely this error bound implies RH.}$` },
        { title: 'Zero counting (numerical example)', text: 'For $T=100$ the main terms give $N(100)\\approx44.042-15.915+0.875\\approx29.0$; the first zero is at $t\\approx14.134725$.', math: String.raw`$N(100)\approx29,\quad \gamma_1\approx14.134725,\ \gamma_2\approx21.022040.$` },
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'math', latex: String.raw`$\zeta(2)=\pi^2/6=1.6449340668\ldots\quad\text{(proved by Euler).}$`, display: true, caption: 'A test of the Dirichlet series at $s=2$.' },
      { kind: 'table', headers: ['statement', 'status', 'attribution'], rows: [
        ['$\\zeta$ has analytic continuation to $\\mathbb{C}\\setminus\\{1\\}$', 'Theorem', 'Riemann, 1859'],
        ['Prime number theorem', 'Theorem', 'Hadamard & de la Vallée Poussin, 1899'],
        ['Infinitely many zeros with $\\Re s=1/2$', 'Theorem', 'Hardy, 1914'],
        ['At least $2/5$ of zeros on the critical line', 'Theorem', 'Conrey, 1989'],
        ['All nontrivial zeros have $\\Re s=1/2$', 'Conjecture (OPEN)', 'Riemann, 1859'],
        ['First $10^{13}$ zeros lie on the line', 'Numerical evidence only', 'Large-scale computations'],
      ] },
      { kind: 'callout', tone: 'warning', title: 'Integrity: what is and is not proved', text: 'The Riemann hypothesis is NOT proved. Numerical verification of any finite number of zeros is evidence, not a proof. Hardy\'s theorem gives infinitely many zeros on the line, and Conrey\'s gives a positive proportion, but neither establishes that ALL nontrivial zeros lie there. Claims of a proof must be treated with extreme scepticism unless accepted by the mathematical community.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'math', latex: String.raw`$\text{Hardy (1914): }Z(t)=\zeta(1/2+it)\text{ has infinitely many real zeros.}$`, display: true, caption: 'A genuine theorem about the critical line.' },
      { kind: 'math', latex: String.raw`$\text{Conrey (1989): }\kappa\ge\frac25,\quad \kappa=\liminf_{T\to\infty}\frac{N_0(T)}{N(T)}.$`, display: true, caption: 'A proved lower bound on the proportion $N_0(T)$ of zeros on the line.' },
      { kind: 'callout', tone: 'history', title: 'Hilbert\'s eighth problem', text: 'Riemann stated the hypothesis in his 1859 paper on the number of primes below a given magnitude. Hilbert included it in his 1900 list; it is one of the seven Clay Millennium Problems ($1 million prize). The Hilbert–Pólya idea — that zeros correspond to eigenvalues of a self-adjoint operator — remains a major but unproved strategy.' },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'code', language: 'python', caption: 'Evaluate a truncated zeta approximation near the first zero; label the result as numerical, not a proof.', code: String.raw`import numpy as np

# Euler-Maclaurin-type truncated approximation; use mpmath for precision.
def zeta_approx(s, n=200):
    return sum(1/k**s for k in range(1,n+1)) + n**(1-s)/(s-1) + 0.5*n**(-s)

for t in [0, 10, 14.134725, 21.022040]:
    z = zeta_approx(0.5+1j*t)
    print(f"t={t:9.6f}  |zeta(1/2+it)| approx {abs(z):.5f}")

print("The exact first zero is t = 14.1347251417... (tabulated numerical value).")
print("This computation is numerical evidence only; it is not a proof of RH.")` },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        'Sharper explicit error bounds for prime counting and primality algorithms.',
        'Random matrix theory: zero statistics match eigenvalues of random unitary matrices (evidence and theorems about statistics, not RH itself).',
        'Quantum chaos and the search for a Hilbert–Pólya operator.',
        'Cryptography: confidence in prime distribution underlies key-generation analysis.',
        'L-functions beyond $\\zeta$: generalised Riemann hypotheses (also open).',
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Do not confuse equivalent forms with proofs', text: 'Growth bounds on the Möbius function, the error term in $\\pi(x)$, and zero-free regions are equivalent to or weaker than RH — none has been established. Also, only *nontrivial* zeros are conjectured on the line; the trivial zeros at $-2,-4,\\dots$ are known exactly.' },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', items: [
        'Why does the functional equation force zeros to be symmetric about the real axis and the critical line?',
        'State precisely what RH implies for $\\pi(x)$ and whether the converse holds.',
        'What did Hardy prove in 1914, and what did he not prove?',
        'Why is numerical verification of $10^{13}$ zeros not a proof?',
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'paragraph', text: 'Titchmarsh, *The Theory of the Riemann Zeta-Function* (rev. Heath-Brown); Iwaniec & Kowalski, *Analytic Number Theory*, ch. 10; Conrey, *The Riemann Hypothesis* (Notices AMS, 2003); Clay Mathematics Institute problem description.' },
    ],
  },

  {
    id: 'p-vs-np',
    title: 'P versus NP: An Open Problem in Computational Complexity',
    branchId: 'research-frontiers',
    level: 'Doctoral',
    summary: 'P is the class of problems solvable in polynomial time; NP is the class whose solutions can be verified in polynomial time. Whether P equals NP is open, though Cook–Levin NP-completeness, the time hierarchy theorem, and conditional collapses are proved theorems that structure the question.',
    prerequisites: ['computational-complexity', 'automata-theory', 'formal-languages'],
    tags: ['open problem', 'NP-completeness', 'polynomial time', 'Cook–Levin theorem', 'reductions'],
    status: 'Complete',
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: 'Some tasks are easy to perform (sorting a list); others seem easy to check but hard to find (a satisfying assignment, a clique of size $k$). The P versus NP question asks whether the apparent gap is a fundamental limitation or merely a lack of clever algorithms.' },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'callout', tone: 'intuition', title: 'Finding versus checking', text: 'Given a proposed solution, verification may take polynomial time while exhaustive search takes exponential time. If every checkable solution could also be found quickly, cryptography, optimisation, and much of science would be transformed. Most researchers believe $\\mathrm{P}\\neq\\mathrm{NP}$, but belief is not proof.' },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'callout', tone: 'visual', title: 'A hierarchy of classes', text: 'Draw nested regions $\\mathrm{P}\\subseteq\\mathrm{NP}\\subseteq\\mathrm{PSPACE}\\subseteq\\mathrm{EXPTIME}$, with strictness proved for the last inclusion by the time hierarchy theorem. NP-complete problems sit at the "hardest" boundary of NP: every NP problem reduces to them in polynomial time.' },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'math', latex: String.raw`$\mathrm{P}=\bigcup_{k\ge1}\mathrm{TIME}(n^k),\qquad \mathrm{NP}=\bigcup_{k\ge1}\mathrm{NTIME}(n^k).$`, display: true, caption: 'Deterministic and nondeterministic polynomial time.' },
      { kind: 'math', latex: String.raw`$L\le_m^p M\iff \exists\text{ poly-time computable }f:\ x\in L\iff f(x)\in M.$`, display: true, caption: 'Polynomial-time many-one reduction.' },
      { kind: 'math', latex: String.raw`$M\text{ is NP-complete}: M\in\mathrm{NP}\ \text{and}\ \forall L\in\mathrm{NP},\ L\le_m^p M.$`, display: true, caption: 'NP-completeness; SAT was the first example.' },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'steps', title: 'Cook–Levin, completeness, and what follows conditionally', items: [
        { title: 'Nondeterminism as certificates', text: 'Equivalently, $L\\in\\mathrm{NP}$ iff there is a polynomial $p$ and a deterministic polynomial-time verifier $V$ with $x\\in L\\iff\\exists w, |w|\\le p(|x|): V(x,w)=1$.', math: String.raw`$L\in\mathrm{NP}\iff\exists V\ \text{poly-time}: x\in L\iff\exists w:\ V(x,w)=1.$` },
        { title: 'Cook–Levin theorem (1969/1971)', text: 'Encode an arbitrary nondeterministic Turing machine computation as a Boolean formula: variables represent tape contents and states; clauses enforce valid transitions. Acceptance corresponds to satisfiability.', math: String.raw`$\text{SAT is NP-complete}\quad\Longrightarrow\quad \mathrm{P}=\mathrm{NP}\iff\text{SAT}\in\mathrm{P}.$` },
        { title: 'Karp\'s reductions', text: 'Karp (1972) showed 21 classic problems — clique, vertex cover, Hamiltonian cycle — are NP-complete, launching the theory of completeness.', math: String.raw`$\mathrm{3SAT}\le_m^p\mathrm{CLIQUE}\le_m^p\mathrm{VERTEX\_COVER}.$` },
        { title: 'Time hierarchy (proved)', text: 'More time strictly buys more languages: $\\mathrm{TIME}(n)\\subsetneq\\mathrm{TIME}(n^3)\\subsetneq\\cdots\\subsetneq\\mathrm{EXPTIME}$.', math: String.raw`$\mathrm{P}\subsetneq\mathrm{EXPTIME}\quad\text{(the inclusion is strict).}$` },
        { title: 'Conditional collapse', text: 'If SAT were in P, the entire polynomial hierarchy would collapse to P — a proved implication that explains why researchers expect separation.', math: String.raw`$\mathrm{P}=\mathrm{NP}\implies\mathrm{PH}=\mathrm{P}\quad\text{(proved consequence).}$` },
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'math', latex: String.raw`$n=40\ \text{Boolean variables}:\ 2^{40}=1{,}099{,}511{,}627{,}776\approx1.10\times10^{12}\ \text{assignments}.$`, display: true, caption: 'Brute-force search quickly becomes impractical.' },
      { kind: 'table', headers: ['statement', 'status', 'basis'], rows: [
        ['$\\mathrm{P}\\subseteq\\mathrm{NP}$', 'Theorem (trivial)', 'a deterministic machine is a special nondeterministic one'],
        ['SAT is NP-complete', 'Theorem', 'Cook 1969/1971; Levin 1973'],
        ['$\\mathrm{P}\\subsetneq\\mathrm{EXPTIME}$', 'Theorem', 'time hierarchy'],
        ['Factoring in $\\mathrm{NP}\\cap\\mathrm{coNP}$', 'Theorem', 'certificates: factorisation and primality proofs'],
        ['$\\mathrm{P}=\\mathrm{NP}$', 'OPEN', 'no proof either way'],
        ['$\\mathrm{P}\\neq\\mathrm{NP}$', 'OPEN (widely believed)', 'no proof either way'],
      ] },
      { kind: 'math', latex: String.raw`$2^{40}/10^{9}\ \text{assignments/second}\approx1099.5\ \text{s}\approx18.3\ \text{minutes};\quad 2^{100}/10^9\approx3.8\times10^{19}\ \text{s}.$`, display: true, caption: 'Why exponential search is not viable at scale.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'math', latex: String.raw`$\text{Ladner\'s theorem: unless }\mathrm{P}=\mathrm{NP},\ \mathrm{NP}\text{ has problems neither in P nor NP-complete.}$`, display: true, caption: 'A proved structural result conditional on separation.' },
      { kind: 'math', latex: String.raw`$\text{Shor (1994): factoring is in BQP (polynomial time on an ideal quantum computer).}$`, display: true, caption: 'A proved algorithmic result — it does not settle P versus NP.' },
      { kind: 'callout', tone: 'warning', title: 'Integrity: no proof in either direction', text: 'P versus NP is an open problem. NP-completeness and time hierarchy results are theorems; the widespread belief that $\\mathrm{P}\\neq\\mathrm{NP}$ is not evidence of a proof. Likewise, quantum speedups for factoring do not imply quantum polynomial-time algorithms for NP-complete problems.' },
      { kind: 'callout', tone: 'history', title: 'Cook, Levin, Karp, and a million-dollar question', text: 'Stephen Cook (1971) and Leonid Levin (1973) independently proved SAT is NP-complete; Richard Karp (1972) expanded the theory. The Clay Mathematics Institute named P versus NP a Millennium Problem in 2000. It is the only one of the seven whose statement can be understood with a few lines of plain language.' },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'code', language: 'python', caption: 'Exhaustive 3-SAT checker: correct but exponential, illustrating why P versus NP matters.', code: String.raw`from itertools import product
import time

def brute_sat(n, clauses):
    for bits in product([False, True], repeat=n):
        if all(any(bits[abs(l)-1] != (l < 0) for l in C) for C in clauses):
            return bits
    return None

# (x1 or x2) and (not x1 or x3) and (not x2 or not x3)
clauses = [(1,2), (-1,3), (-2,-3)]
t0 = time.time()
print("assignment:", brute_sat(3, clauses), "elapsed", time.time()-t0)
print("2^n assignments checked in the worst case; n=40 gives", 2**40)` },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        'Cryptography: one-way functions would not exist if $\\mathrm{P}=\\mathrm{NP}$.',
        'Operations research: SAT and ILP solvers handle hard instances heuristically.',
        'Verification: proof systems and interactive proofs (IP = PSPACE is proved).',
        'Biology: protein folding and sequence alignment as hard combinatorial search.',
        'Artificial intelligence: learning and planning problems often NP-hard.',
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'NP does not mean non-polynomial', text: 'NP means *nondeterministic* polynomial time; every problem in P is also in NP. NP-hard problems are not necessarily in NP, and "hard in practice" is not a proof of hardness in theory: worst-case complexity says nothing about a particular instance.' },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', items: [
        'Show $\\mathrm{P}\\subseteq\\mathrm{NP}$ directly from the verifier definition.',
        'Why is SAT in NP? Describe the certificate and verifier.',
        'State the time hierarchy theorem and explain why it does not settle P versus NP.',
        'What would follow if an NP-complete problem were solved in polynomial time?',
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'paragraph', text: 'Cook, *The complexity of theorem-proving procedures* (STOC 1971); Karp, *Reducibility among combinatorial problems* (1972); Sipser, *Introduction to the Theory of Computation*, ch. 7–9; Arora & Barak, *Computational Complexity: A Modern Approach*.' },
    ],
  },

  {
    id: 'navier-stokes-problem',
    title: 'Navier–Stokes Existence and Smoothness: An Open Millennium Problem',
    branchId: 'research-frontiers',
    level: 'Doctoral',
    summary: 'The incompressible Navier–Stokes equations describe fluid motion, and the Clay problem asks whether smooth initial data in three dimensions always yield a global smooth solution. Two-dimensional regularity and three-dimensional local existence are theorems; global three-dimensional regularity is open.',
    prerequisites: ['fluid-mechanics-math', 'pde', 'hilbert-spaces'],
    tags: ['open problem', 'fluid dynamics', 'regularity', 'weak solutions', 'Millennium Prize'],
    status: 'Complete',
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: 'The equations correctly describe water and air in ordinary regimes, yet we cannot prove that a smooth three-dimensional flow remains smooth forever. Losing smoothness would mean vorticity concentrating without bound — a mathematical singularity. The Clay problem asks for a proof of global regularity or of its failure.' },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'callout', tone: 'intuition', title: 'Nonlinearity transports energy to small scales', text: 'The advective term $(u\\cdot\\nabla)u$ can cascade kinetic energy toward finer structures, while viscosity $\\nu\\Delta u$ damps small scales. In two dimensions vortex stretching is absent and viscosity wins; in three dimensions vortex stretching may amplify gradients faster than diffusion can remove them.' },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'callout', tone: 'visual', title: 'Vortex tubes and stretching', text: 'Visualise vorticity $\\omega=\\nabla\\times u$ as tubes. In 3D, stretching a tube makes it thinner and spins it faster (angular-momentum-like effect), amplifying $\\omega$; in 2D vorticity is a scalar perpendicular to the plane and cannot be stretched this way.' },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'math', latex: String.raw`$\partial_t u+(u\cdot\nabla)u=-\nabla p+\nu\Delta u+f,\qquad \nabla\cdot u=0,\qquad u(x,0)=u_0(x).$`, display: true, caption: 'Incompressible Navier–Stokes in $\\mathbb{R}^3$ (density absorbed into $p$).' },
      { kind: 'math', latex: String.raw`$\text{Clay problem: for smooth, divergence-free }u_0\text{ with suitable decay, does a smooth solution exist for all }t\ge0?$`, display: true, caption: 'The precise open question (global existence AND smoothness).' },
      { kind: 'math', latex: String.raw`$\mathrm{Re}=\frac{UL}{\nu};\qquad \frac{d}{dt}\frac12\|u\|_{L^2}^2+\nu\|\nabla u\|_{L^2}^2=0\quad(f=0).$`, display: true, caption: 'Reynolds number and the energy dissipation identity.' },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'steps', title: 'From Newton\'s law to the regularity bottleneck', items: [
        { title: 'Momentum balance', text: 'For a Newtonian fluid the material acceleration equals pressure gradient plus viscous diffusion: $\\frac{Du}{Dt}=\\partial_t u+(u\\cdot\\nabla)u$.', math: String.raw`$\rho\frac{Du}{Dt}=-\nabla p+\mu\Delta u+\rho f.$` },
        { title: 'Incompressibility', text: 'Constant density gives $\\nabla\\cdot u=0$; taking the divergence of the momentum equation yields a Poisson problem for pressure.', math: String.raw`$-\Delta p=\rho\,\nabla\cdot((u\cdot\nabla)u),\qquad \nu=\mu/\rho.$` },
        { title: 'Energy identity', text: 'Multiply by $u$ and integrate; the nonlinear term contributes a boundary flux that vanishes for suitable decay, leaving viscous dissipation.', math: String.raw`$\frac{d}{dt}\frac12\int|u|^2dx=-\nu\int|\nabla u|^2dx.$` },
        { title: 'Vorticity equation', text: 'Curl the momentum equation to see the 3D stretching term absent in 2D.', math: String.raw`$\partial_t\omega+(u\cdot\nabla)\omega=(\omega\cdot\nabla)u+\nu\Delta\omega.$` },
        { title: 'Blowup criterion', text: 'Beale–Kato–Majda (proved): a smooth solution can cease to exist only if $\\int_0^T\\|\\omega\\|_{L^\\infty}dt=\\infty$; no such criterion has been ruled out.', math: String.raw`$T^*<\infty\ \implies\ \int_0^{T^*}\|\omega(t)\|_{L^\infty}\,dt=\infty.$` },
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'math', latex: String.raw`$U=1\ \mathrm{m/s},\ L=1\ \mathrm{m},\ \nu_{\text{water}}\approx10^{-6}\ \mathrm{m^2/s}:\ \mathrm{Re}=10^6$ (turbulent regime).`, display: true, caption: 'Typical Reynolds numbers are enormous, which is why direct simulation is hard.' },
      { kind: 'table', headers: ['result', 'status', 'attribution'], rows: [
        ['2D global smooth solutions', 'Theorem', 'Ladyzhenskaya, 1959'],
        ['3D local-in-time smooth solutions', 'Theorem', 'classical (Kato, Fujita–Kato, 1960s–70s)'],
        ['Finite-energy weak solutions in 3D', 'Theorem', 'Leray, 1934'],
        ['Partial regularity of suitable weak solutions', 'Theorem', 'Caffarelli–Kohn–Nirenberg, 1982'],
        ['Non-uniqueness of weak solutions in weak classes', 'Theorem (specific constructions)', 'e.g. Buckmaster–Vicol, 2019'],
        ['3D global smoothness for all smooth data', 'OPEN', 'Clay Millennium Problem'],
      ] },
      { kind: 'math', latex: String.raw`$\mathrm{Re}\gg1\ \Longrightarrow\ \text{energy cascade across scales } \ell:\quad \varepsilon\sim u_\ell^3/\ell.$`, display: true, caption: 'Kolmogorov\'s 1941 scaling is a physical theory, not a proof of regularity.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'math', latex: String.raw`$\text{Leray (1934): }\forall u_0\in L^2_\sigma\ \exists\ \text{a global weak solution satisfying the energy inequality.}$`, display: true, caption: 'Weak solutions may be non-smooth; uniqueness is not known in 3D.' },
      { kind: 'math', latex: String.raw`$\text{Beale–Kato–Majda (1984): blowup }\iff\int_0^T\|\omega\|_\infty dt=\infty.$`, display: true, caption: 'A proved necessary condition for singularity formation.' },
      { kind: 'callout', tone: 'warning', title: 'Integrity: the central question is open', text: 'Neither global regularity nor blowup has been proved in three dimensions. Numerical simulations showing large vorticity are evidence, not proof. Results about weak solutions (existence, partial regularity, non-uniqueness in very weak classes) do not settle the smoothness question for classical solutions.' },
      { kind: 'callout', tone: 'history', title: 'Navier, Stokes, Leray, and the Clay prize', text: 'Claude-Louis Navier (1822) and George Stokes (1845) derived the equations; Jean Leray introduced weak solutions in 1934. The Clay Mathematics Institute selected the problem in 2000 with a $1 million prize. It remains one of the unsolved Millennium Problems.' },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'code', language: 'python', caption: 'Spectral solution of the 2D vorticity equation on a periodic box — a setting where global regularity is a theorem.', code: String.raw`import numpy as np

N = 128
k = np.fft.fftfreq(N, d=1.0/N)*2*np.pi
KX, KY = np.meshgrid(k, k, indexing='ij')
K2 = KX**2 + KY**2; K2[0,0] = 1
nu, dt, T = 1e-3, 1e-3, 0.2

w = np.sin(KX)*np.cos(KY)          # initial vorticity (periodic)
def rhs(w):
    psi = np.fft.ifft2(np.fft.fft2(w)/K2).real
    ux = np.fft.ifft2(1j*KY*np.fft.fft2(psi)).real
    uy = np.fft.ifft2(-1j*KX*np.fft.fft2(psi)).real
    adv = np.fft.ifft2(1j*(KX*np.fft.fft2(ux*w) + KY*np.fft.fft2(uy*w))).real
    return -adv + nu*np.fft.ifft2(-K2*np.fft.fft2(w)).real

for _ in range(int(T/dt)):
    k1=rhs(w); k2=rhs(w+dt*k1/2); k3=rhs(w+dt*k2/2); k4=rhs(w+dt*k3)
    w = w + dt*(k1+2*k2+2*k3+k4)/6
print("2D enstrophy at t=T:", 0.5*np.mean(w**2))` },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        'Computational fluid dynamics for aircraft and automotive design.',
        'Weather, ocean, and climate simulation.',
        'Turbulence modelling (LES, RANS) and subgrid-scale closures.',
        'Blood flow in arteries and cardiovascular device design.',
        'Industrial mixing, combustion, and heat exchangers.',
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Do not read simulations as proofs', text: 'Finite-precision computations cannot establish existence or blowup: a growing vorticity maximum may be a resolution artefact. Also, the 2D theorem does not transfer to 3D — the vortex-stretching term is the essential difference.' },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', items: [
        'Why does pressure disappear from the vorticity equation?',
        'Explain the role of $\\nabla\\cdot u=0$ in the energy estimate.',
        'State the Beale–Kato–Majda criterion in your own words.',
        'Why is global regularity known in 2D but not 3D?',
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'paragraph', text: 'Clay Mathematics Institute, *Existence and smoothness of the Navier–Stokes equations* (official problem description); Ladyzhenskaya, *The Mathematical Theory of Viscous Incompressible Flow*; Constantin & Foias, *Navier–Stokes Equations*; Buckmaster & Vicol, *Nonuniqueness of weak solutions to the Navier–Stokes equation* (Annals of Math, 2019).' },
    ],
  },

  {
    id: 'collatz-conjecture',
    title: 'The Collatz Conjecture: A Simple Rule with No Proof',
    branchId: 'research-frontiers',
    level: 'Research',
    summary: 'The Collatz conjecture says repeated application of $n\\mapsto n/2$ for even $n$ and $n\\mapsto 3n+1$ for odd $n$ always reaches 1. It is open despite extensive numerical verification; Tao proved a related almost-all result, which is not the conjecture itself.',
    prerequisites: ['modular-arithmetic', 'recurrence-relations', 'mathematical-induction'],
    tags: ['open problem', 'iteration', 'number theory', 'numerical evidence', 'Tao theorem'],
    status: 'Complete',
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: 'Take any positive integer. If it is even, halve it; if it is odd, triple it and add one. The conjecture claims you always eventually land in the cycle $1\\to4\\to2\\to1$. No proof is known, and the problem is famously easy to state and hard to settle.' },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'callout', tone: 'intuition', title: 'A biased random walk in logarithms', text: 'Even steps divide by 2; odd steps multiply by about 3 then usually divide by 2 again. Treating parity as random, the typical two-step factor is $3/4<1$, so orbits drift downward on a logarithmic scale — but a probabilistic drift is not a proof that every orbit reaches 1.' },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'callout', tone: 'visual', title: 'A trajectory as a jagged descent', text: 'Plot $\\log n$ against step number: the graph spikes on odd steps and drops on even ones, with a downward trend. The famous orbit starting at 27 climbs to 9232 before falling to 1 after 111 steps — a reminder that a global drift permits large excursions.' },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'math', latex: String.raw`$T(n)=\begin{cases}n/2,& n\equiv0\pmod 2,\\[2pt]3n+1,& n\equiv1\pmod2.\end{cases}\qquad T_{\text{acc}}(n)=\frac{3n+1}{2^{v_2(3n+1)}}\ \ (n\text{ odd}).$`, display: true, caption: 'Standard and accelerated Collatz maps.' },
      { kind: 'math', latex: String.raw`$\text{Conjecture (OPEN): }\forall n\in\mathbb{N}_{>0}\ \exists k:\ T^k(n)=1.$`, display: true, caption: 'The exact open statement.' },
      { kind: 'math', latex: String.raw`$\mathbb{E}[\log T_{\text{acc}}(n)-\log n]\approx\log 3-2\log 2=\log(3/4)\approx-0.28768<0.$`, display: true, caption: 'Heuristic drift assuming geometric valuations — motivation, not proof.' },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'steps', title: 'What can actually be derived', items: [
        { title: 'The known cycle', text: 'Starting from 1 gives $1\\to4\\to2\\to1$; any successful orbit enters this unique known cycle.', math: String.raw`$1\to4\to2\to1,\qquad T^3(1)=1.$` },
        { title: 'Obstructions to simple induction', text: 'Odd steps increase the value by 50 % or more, so no monotone Lyapunov function on $\\mathbb{N}$ is immediate; the map is not contraction in the ordinary metric.', math: String.raw`$n\ \text{odd}\implies T(n)=3n+1>n.$` },
        { title: 'Parity-vector bookkeeping', text: 'Composing $k$ odd steps and $l$ even steps gives $n\\mapsto(3^k n + c)/2^l$ for an integer $c$ depending on the parity pattern; a nontrivial cycle would require $2^l$ close to $3^k$ with a specific integer offset.', math: String.raw`$n=\frac{c}{2^l-3^k}\quad\text{for a hypothetical cycle with }k\text{ odd steps.}$` },
        { title: 'Computational verification', text: 'Exhaustive checks cover all starting values up to very large bounds (at least $2^{68}\\approx2.95\\times10^{20}$ in published computations) — numerical evidence only.', math: String.raw`$2^{68}=295{,}479{,}051{,}793{,}528{,}336$` },
        { title: 'Tao\'s theorem (2019)', text: 'For almost all $n$ (in logarithmic density), the orbit attains almost bounded values; this is a genuine theorem about typical orbits, but it does not prove the conjecture for every $n$.', math: String.raw`$\text{Theorem (Tao): for a density-one set of }n,\ \inf_k T^k(n)\ \text{is almost bounded.}$` },
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'math', latex: String.raw`$5\to16\to8\to4\to2\to1;\qquad 7\to22\to11\to34\to17\to52\to26\to13\to40\to20\to10\to5\to\cdots\to1.$`, display: true, caption: 'Short and medium orbits.' },
      { kind: 'table', headers: ['start', 'total stopping time', 'maximum value reached'], rows: [
        ['5', '5', '16'],
        ['7', '16', '52'],
        ['27', '111', '9232'],
        ['97', '118', '9232'],
        ['871', '178', '190996'],
      ] },
      { kind: 'math', latex: String.raw`$27\to82\to41\to124\to62\to31\to94\to47\to142\to71\to214\to107\to322\to161\to484\to242\to121\to\cdots$`, display: true, caption: 'The first steps of the celebrated orbit of 27 (computed, not a proof about all integers).' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'math', latex: String.raw`$\text{Tao (2019): almost all orbits of the Collatz map attain almost bounded values.}$`, display: true, caption: 'A theorem about almost every starting value in a density sense.' },
      { kind: 'math', latex: String.raw`$\text{Proved: no nontrivial cycles with a small number of odd steps (case-by-case computational proofs).}$`, display: true, caption: 'Partial results rule out restricted families of cycles.' },
      { kind: 'callout', tone: 'warning', title: 'Integrity: numerical evidence is not proof', text: 'Checking $10^{20}$ starting values does not check infinitely many. Tao\'s almost-all theorem allows an exceptional set (of density zero) that could in principle contain a counterexample. The conjecture itself remains open; do not describe it as "verified" or "essentially proved".' },
      { kind: 'callout', tone: 'history', title: 'A problem that circulates by word of mouth', text: 'Often attributed to Lothar Collatz in the 1930s, the problem has appeared under many names (Ulam, Kakutani, Hasse). Erdős reportedly said mathematics is not yet ready for such problems. Computational projects have verified enormous ranges using distributed computing.' },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'code', language: 'python', caption: 'Reproduce stopping times and the maximum of the orbit of 27.', code: String.raw`def orbit(n):
    seq = [n]
    while n != 1:
        n = n//2 if n % 2 == 0 else 3*n+1
        seq.append(n)
    return seq

for start in [5, 7, 27, 97, 871]:
    s = orbit(start)
    print(f"start={start:4d}  steps={len(s)-1:4d}  max={max(s):7d}")

print("first 18 values from 27:", orbit(27)[:18])
# NOTE: these are computations for specific integers, not a proof of the conjecture.` },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        'Benchmark for theorem provers and formal verification systems.',
        'Test case for techniques in arithmetic dynamics and diophantine approximation.',
        'Pedagogical example of the gap between empirical evidence and proof.',
        'Random-walk heuristics for parity sequences in number theory.',
        'Distributed computing projects as models of large-scale verification.',
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'The heuristic is not an argument', text: 'The negative logarithmic drift assumes parities behave randomly and independently, which is unproved. Also, the accelerated map changes stopping-time counts: always specify which version you use when reporting "number of steps".' },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', items: [
        'Show that any cycle with $k$ odd steps satisfies $2^\\ell-3^k$ dividing a fixed integer.',
        'Why does a monotonicity argument fail for the standard map?',
        'What exactly did Tao prove, and what would still need to be proved?',
        'How is numerical verification different from a proof for infinitely many $n$?',
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'paragraph', text: 'Lagarias, *The 3x+1 Problem: An Annotated Bibliography* (arXiv:math/0608208); Tao, *Almost all orbits of the Collatz map attain almost bounded values* (Forum of Mathematics, Pi, 2022); Lagarias (ed.), *The Ultimate Challenge: The 3x+1 Problem* (AMS, 2010).' },
    ],
  },

  {
    id: 'langlands-program',
    title: 'The Langlands Program: A Research Programme Linking Number Theory and Representation Theory',
    branchId: 'research-frontiers',
    level: 'Doctoral',
    summary: 'The Langlands programme conjectures deep correspondences between Galois representations and automorphic representations, generalising class field theory and containing functoriality as its central open conjecture. Major cases — modularity of elliptic curves over $\\mathbb{Q}$ and local Langlands for $\\mathrm{GL}(n)$ — are theorems; the general programme is not.',
    prerequisites: ['galois-theory', 'modular-forms', 'representation-theory'],
    tags: ['research programme', 'automorphic forms', 'Galois representations', 'functoriality', 'open conjecture'],
    status: 'Complete',
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: 'Number fields have arithmetic encoded by Galois groups; harmonic analysis on Lie groups has spectra encoded by automorphic forms. Langlands proposed that these are two languages for the same underlying object. The programme gives a unified framework for reciprocity laws, L-functions, and the arithmetic of algebraic varieties.' },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'callout', tone: 'intuition', title: 'A dictionary between two worlds', text: 'On one side: Frobenius conjugacy classes and finite-dimensional Galois representations. On the other: Hecke eigenvalues and automorphic representations. The dictionary matches characteristic polynomials of Frobenius with Satake parameters — a "local" matching at almost every prime that globalises to L-function equality.' },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'callout', tone: 'visual', title: 'A web of correspondences', text: 'Sketch Galois representations as vertices on the left and automorphic representations on the right; draw arrows for known reciprocity (abelian/class field theory, elliptic curves over $\\mathbb{Q}$), and dotted arrows for conjectural functorial transfers between L-groups. The dotted part is most of the picture.' },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'math', latex: String.raw`$\rho:\mathrm{Gal}(\bar F/F)\to{}^L G\quad\text{(Galois side)};\qquad \pi=\otimes'_v\pi_v\ \text{an automorphic representation of }G(\mathbb{A}_F).$`, display: true, caption: 'The two sides of Langlands reciprocity.' },
      { kind: 'math', latex: String.raw`$L(s,\rho)=L(s,\pi)\quad\text{(matching of L-functions)},\qquad \mathrm{Frob}_v\mapsto \text{Satake parameters of }\pi_v.$`, display: true, caption: 'Local-to-global matching at unramified places.' },
      { kind: 'math', latex: String.raw`$\text{Functoriality (CONJECTURE): }{}^L G\to{}^L H\ \text{maps automorphic }\pi\text{ of }G\text{ to an automorphic }\Pi\text{ of }H.$`, display: true, caption: 'The central open conjecture; it includes reciprocity as a special case.' },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'steps', title: 'From quadratic reciprocity to functoriality', items: [
        { title: 'Class field theory (theorem)', text: 'Abelian extensions of a number field are classified by characters of its idele class group — the abelian case of Langlands reciprocity.', math: String.raw`$\mathrm{Gal}(F^{\mathrm{ab}}/F)\cong \mathbb{A}_F^\times/F^\times\ \text{(mod the connected component at infinity)}.$` },
        { title: 'Nonabelian obstruction', text: 'For nonabelian Galois groups, the arithmetic side uses representations into $\\mathrm{GL}_n(\\mathbb{C})$; the matching analytic objects must be automorphic representations of $\\mathrm{GL}_n$.', math: String.raw`$\rho:\text{$E$-adic representation of }\mathrm{Gal}(\bar F/F)\ \longleftrightarrow\ \pi\ \text{cuspidal on }\mathrm{GL}_n(\mathbb{A}_F).$` },
        { title: 'Local Langlands (theorem for $\\mathrm{GL}_n$)', text: 'Over a local field, irreducible smooth representations of $\\mathrm{GL}_n(F_v)$ are parametrised by $n$-dimensional Weil–Deligne representations; proved by Harris–Taylor and Henniart (2001).', math: String.raw`$\mathrm{LL}_v:\ \mathrm{Irr}(\mathrm{GL}_n(F_v))\ \leftrightarrow\ \mathrm{WD}_n(F_v).$` },
        { title: 'Modularity (theorem over $\\mathbb{Q}$)', text: 'Wiles, Taylor et al. (1995) proved that every elliptic curve over $\\mathbb{Q}$ corresponds to a weight-2 modular form; this implied Fermat\'s Last Theorem.', math: String.raw`$E/\mathbb{Q}\ \longleftrightarrow\ f\in S_2(\Gamma_0(N_E)).$` },
        { title: 'Global functoriality (open)', text: 'For a homomorphism of L-groups, the existence and automorphy of the transfer is conjectural in general; known cases include base change and some symmetric-power lifts.', math: String.raw`$\pi\ \text{on }G(\mathbb{A}_F)\ \dashrightarrow\ \Pi\ \text{on }H(\mathbb{A}_F)\quad\text{(conjectural in general)}.$` },
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'math', latex: String.raw`$\text{Quadratic reciprocity: }\left(\frac{p}{q}\right)\left(\frac{q}{p}\right)=(-1)^{\frac{p-1}{2}\frac{q-1}{2}}\quad\text{(proved by Gauss, 1801).}$`, display: true, caption: 'The prototype reciprocity law generalised by the programme.' },
      { kind: 'table', headers: ['case', 'status', 'contributors'], rows: [
        ['Class field theory (abelian)', 'Theorem', 'Artin, Hasse, Takagi, 1920s–30s'],
        ['Local Langlands for $\\mathrm{GL}_n$', 'Theorem', 'Harris–Taylor, Henniart, 2001'],
        ['Modularity of elliptic curves over $\\mathbb{Q}$', 'Theorem', 'Wiles; Taylor–Wiles; Breuil–Conrad–Diamond–Taylor, 1995–2001'],
        ['Global Langlands over function fields ($\\mathrm{GL}_n$)', 'Theorem', 'Drinfeld, L. Lafforgue'],
        ['General functoriality over number fields', 'OPEN', 'Langlands, 1967 letter'],
        ['Artin holomorphy conjecture', 'OPEN in general', 'Artin, 1920s'],
      ] },
      { kind: 'math', latex: String.raw`$\text{Fermat\'s Last Theorem (Wiles): }x^n+y^n=z^n\ \text{has no positive integer solutions for }n\ge3.$`, display: true, caption: 'A famous consequence of one proved special case, not of the whole programme.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'math', latex: String.raw`$\text{Converse theorem (Hecke/Weil): equality of sufficiently many twisted L-functions forces }\pi_1\cong\pi_2.$`, display: true, caption: 'A tool used to establish correspondences.' },
      { kind: 'math', latex: String.raw`$\text{Symmetric-power functoriality for }\mathrm{GL}_2\text{ (partial results): }\mathrm{Sym}^k\pi\ \text{automorphic for small }k.$`, display: true, caption: 'Known cases exist; the general lift is conjectural.' },
      { kind: 'callout', tone: 'warning', title: 'Integrity: a programme is not a theorem', text: 'Langlands wrote a conjectural letter to Weil in 1967; many parts have since been proved, but functoriality and most nonabelian global reciprocity over number fields remain open. "Geometric Langlands" has seen celebrated progress (including proofs in the function-field setting by Gaitsgory, Frenkel and collaborators in the 2020s); it should not be conflated with the arithmetic programme over number fields.' },
      { kind: 'callout', tone: 'history', title: 'From Gauss to a unified vision', text: 'Quadratic reciprocity (Gauss, 1801) and Artin reciprocity (1920s) are classical theorems. Robert Langlands\' 1967 letter proposed the general framework. The 1995 proof of Fermat\'s Last Theorem via modularity became its most famous public success; the 2002 and 2010 Fields Medals to Lafforgue and Ngô recognised further progress.' },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'code', language: 'python', caption: 'Compute Legendre symbols — a concrete instance of the reciprocity phenomenon the programme generalises.', code: String.raw`def legendre(a, p):
    return 0 if a % p == 0 else (1 if pow(a, (p-1)//2, p) == 1 else -1)

primes = [3,5,7,11,13,17,19,23]
for p in primes:
    for q in primes:
        if p != q:
            lhs = legendre(p,q)*legendre(q,p)
            rhs = (-1)**(((p-1)//2)*((q-1)//2))
            assert lhs == rhs, (p,q)
print("quadratic reciprocity verified for", len(primes)**2-len(primes), "prime pairs")
print("example: (3/7) =", legendre(3,7), "(7/3) =", legendre(7,3))` },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        'Modern number theory: structure of Galois groups and L-functions.',
        'Arithmetic geometry: rationality and modularity of elliptic curves and abelian varieties.',
        'Cryptography: understanding of elliptic curves over finite fields.',
        'Mathematical physics: geometric Langlands and gauge theory (S-duality).',
        'Representation theory: classification of automorphic representations.',
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Do not overstate the programme', text: 'Numerical agreement of L-function coefficients supports conjectures but proves none. "Local Langlands for GL(n)" and "global functoriality" are very different statements; the former is a theorem, the latter open in general. Fermat\'s Last Theorem used one proved instance, not the whole programme.' },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', items: [
        'How does class field theory appear as the abelian case of reciprocity?',
        'Why do L-functions provide a useful bridge between the two sides?',
        'State functoriality in one sentence without implying it is proved.',
        'Which parts of the programme are theorems, and which remain open?',
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'paragraph', text: 'Langlands, *Letter to André Weil* (1967, available online); Gelbart, *An Elementary Introduction to the Langlands Program* (Bull. AMS, 1984); Frenkel, *Langlands Correspondence for Loop Groups*; Arthur, *The Endoscopy Theory of Automorphic Forms*.' },
    ],
  },

  {
    id: 'mirror-symmetry',
    title: 'Mirror Symmetry: A Conjectural Duality between Calabi–Yau Manifolds',
    branchId: 'research-frontiers',
    level: 'Doctoral',
    summary: 'Mirror symmetry proposes that pairs of Calabi–Yau threefolds with exchanged Hodge numbers give equivalent physical theories, exchanging symplectic and complex-structure information. It has produced spectacular enumerative predictions, many later proved independently, but the general duality remains conjectural.',
    prerequisites: ['smooth-manifolds', 'cohomology', 'curvature'],
    tags: ['Calabi–Yau', 'Hodge numbers', 'enumerative geometry', 'string theory', 'conjecture'],
    status: 'Complete',
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: 'Counting rational curves on a quintic threefold is a famously hard enumerative problem. Physicists found that a "mirror" manifold with different geometry encodes the answer in a tractable period integral. Mirror symmetry turns an intractable count into a solvable differential equation.' },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'callout', tone: 'intuition', title: 'Two descriptions of the same physics', text: 'Type IIA string theory compactified on $X$ and Type IIB on its mirror $Y$ give the same physical theory. Complex-structure deformations of one side correspond to Kähler (size) deformations of the other, so a hard quantum correction on one side becomes a classical computation on the mirror.' },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'callout', tone: 'visual', title: 'Flipping the Hodge diamond', text: 'Draw the Hodge diamond of a Calabi–Yau threefold: $h^{1,1}$ counts Kähler parameters (roughly "sizes"), $h^{2,1}$ counts complex-structure parameters (roughly "shapes"). Mirror symmetry reflects the diamond: $(h^{1,1},h^{2,1})=(1,101)$ becomes $(101,1)$.' },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'math', latex: String.raw`$X\text{ Calabi–Yau}:\ K_X\cong\mathcal{O}_X,\ h^{i,0}=0\ (0<i<3),\quad X\text{ mirror to }Y\iff h^{1,1}(X)=h^{2,1}(Y),\ h^{2,1}(X)=h^{1,1}(Y).$`, display: true, caption: 'Definition (one version) and the Hodge-number exchange.' },
      { kind: 'math', latex: String.raw`$K_{q}=\text{(predicted number of degree-}q\text{ rational curves on }X),\quad q=1,2,3,\dots$`, display: true, caption: 'Enumerative invariants produced by mirror symmetry.' },
      { kind: 'math', latex: String.raw`$X_5=\{z_0^5+\cdots+z_4^5=0\}\subset\mathbb{P}^4:\quad (h^{1,1},h^{2,1})=(1,101).$`, display: true, caption: 'The quintic threefold and its Hodge numbers.' },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'steps', title: 'Hodge numbers of the quintic and the mirror construction', items: [
        { title: 'Kähler modulus', text: 'By the Lefschetz hyperplane theorem, $h^{1,1}(X_5)=h^{1,1}(\\mathbb{P}^4)=1$: only the overall Kähler class.', math: String.raw`$h^{1,1}(X_5)=1.$` },
        { title: 'Complex-structure count', text: 'Homogeneous quintics in five variables: $\\binom{9}{5}=126$ coefficients, so $\\dim\\mathbb{P}^{125}=125$; quotient by $\\dim\\mathrm{PGL}(5)=24$ gives 101.', math: String.raw`$h^{2,1}(X_5)=125-24=101.$` },
        { title: 'Greene–Plesser mirror', text: 'Take the quotient of the Fermat quintic by a suitable $\\mathbb{Z}_5^3$ subgroup and resolve singularities; the resulting $Y$ has $(h^{1,1},h^{2,1})=(101,1)$.', math: String.raw`$Y=X_5/(\mathbb{Z}_5^3)\ \text{(crepant resolution)}:\quad (h^{1,1},h^{2,1})=(101,1).$` },
        { title: 'Periods and the Picard–Fuchs equation', text: 'The variation of the holomorphic 3-form on $Y$ satisfies a fourth-order differential equation; the Frobenius method at the large-complex-structure point yields the Yukawa coupling after the mirror map.', math: String.raw`$C_{111}(t)=\frac{5}{1-5^5q}\quad\text{(after the mirror map)},\qquad q=e^{2\pi i t}.$` },
        { title: 'Enumerative output', text: 'Expanding the Yukawa coupling gives the famous genus-zero predictions on the quintic.', math: String.raw`$K_1=2875,\quad K_2=609250,\quad K_3=317206375.$` },
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'math', latex: String.raw`$X_5:\ (h^{1,1},h^{2,1})=(1,101),\qquad Y:\ (h^{1,1},h^{2,1})=(101,1)\quad\Longrightarrow\quad 1\leftrightarrow101.$`, display: true, caption: 'The Hodge-number exchange in the quintic example.' },
      { kind: 'table', headers: ['degree $q$', 'mirror prediction $K_q$', 'status'], rows: [
        ['1 (lines)', '2,875', 'known classically (Schubert calculus) — agreement'],
        ['2 (conics)', '609,250', 'independently verified'],
        ['3 (twisted cubics)', '317,206,375', 'independently verified'],
        ['higher genus', 'Gromov–Witten invariants', 'many matched; full duality still conjectural'],
      ] },
      { kind: 'math', latex: String.raw`$\binom{9}{5}=126,\quad 126-1=125,\quad 125-24=101.$`, display: true, caption: 'Arithmetic of the complex-structure count.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'math', latex: String.raw`$\text{Proved: }N_1(X_5)=2875\ \text{(number of lines on a generic quintic threefold).}$`, display: true, caption: 'A classical enumerative theorem; mirror symmetry agrees with it.' },
      { kind: 'math', latex: String.raw`$\text{Conjecture (open in general): existence of a mirror }Y\text{ with the required equivalence for arbitrary CY }X.$`, display: true, caption: 'The duality itself is not a theorem.' },
      { kind: 'callout', tone: 'warning', title: 'Integrity: predictions verified are not the conjecture proved', text: 'Specific enumerative predictions have been confirmed by rigorous algebraic geometry; that does not prove general mirror symmetry. The Hodge-number exchange is a necessary condition, not a sufficient definition of a mirror pair.' },
      { kind: 'callout', tone: 'history', title: '1991: physics solves a geometry problem', text: 'Candelas, de la Ossa, Green and Parkes computed the number of rational curves on the quintic using mirror symmetry in 1991, stunning mathematicians. Greene and Plesser had constructed the mirror pair in 1989. Subsequent work by Kontsevich, Givental and others put parts of the story on rigorous footing via Gromov–Witten theory.' },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'code', language: 'python', caption: 'Compute the quintic Hodge count and the first coefficients of the mirrored Yukawa series.', code: String.raw`from math import comb
print("quintic monomials:", comb(9,5))   # C(9,5) = 126
print("projective parameter space:", comb(9,5)-1)
print("after quotienting PGL(5):", comb(9,5)-1-24)

# Expansion of 5/(1-5^5 q) = 5 * sum (5^5)^n q^n; extracting instanton
# numbers also requires the mirror map (not shown).
for n in range(4):
    print("coefficient q^", n, "=", 5*5**(5*n))` },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        'Enumerative algebraic geometry: Gromov–Witten invariants and curve counts.',
        'String theory: compactification and duality of type II theories.',
        'Mathematical physics: topological field theory and Frobenius manifolds.',
        'Derived categories: Bondal–Orlov and Kontsevich categorical formulations.',
        'Computational algebraic geometry: period integrals and Picard–Fuchs systems.',
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Do not treat the duality as proved', text: 'Agreement in genus zero for the quintic is a landmark, not a general theorem. Also, the simple Hodge exchange is only part of the story: full mirror symmetry involves equivalences of Frobenius manifolds or derived categories.' },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', items: [
        'Why must mirror Calabi–Yau threefolds have exchanged Hodge numbers?',
        'How does the Picard–Fuchs equation turn periods into curve counts?',
        'Which parts of mirror symmetry have been proved rigorously?',
        'Why is a physical duality not automatically a mathematical theorem?',
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'paragraph', text: 'Candelas et al., *A pair of Calabi–Yau manifolds as an exactly soluble superconformal theory* (Nucl. Phys. B, 1991); Greene & Plesser, *Duality in Calabi–Yau moduli space* (1990); Cox & Katz, *Mirror Symmetry and Algebraic Geometry*; Hori et al., *Mirror Symmetry* (Clay Monographs).' },
    ],
  },

  {
    id: 'quantum-computing-foundations',
    title: 'Quantum Computing Foundations: Qubits, Unitarity, and What Is Proved',
    branchId: 'research-frontiers',
    level: 'Doctoral',
    summary: 'Quantum computation replaces bits with normalised vectors in Hilbert space and logic gates with unitary maps plus measurement. No-cloning, Shor\'s factoring algorithm, Grover\'s search speedup, and fault-tolerance thresholds are theorems; building a scalable fault-tolerant machine and separating BQP from classical classes remain open.',
    prerequisites: ['quantum-mechanics-math', 'hilbert-spaces', 'linear-operators'],
    tags: ['qubit', 'unitary', 'no-cloning', 'Shor algorithm', 'open questions'],
    status: 'Complete',
    blocks: [
      { kind: 'heading', text: '1 · The problem it solves', level: 2 },
      { kind: 'paragraph', text: 'Some computational tasks exploit superposition and entanglement to beat known classical methods. The mathematical foundations specify exactly what operations are physically allowed, what can be proved about them, and where the boundary between proven speedups and open complexity questions lies.' },
      { kind: 'heading', text: '2 · Intuition', level: 2 },
      { kind: 'callout', tone: 'intuition', title: 'Amplitudes, not probabilities', text: 'A qubit carries complex amplitudes; alternatives combine by addition of amplitudes and can cancel through interference. Measurement converts amplitudes into probabilities via $|\\alpha|^2$. Because measurement destroys the state, algorithms must arrange for constructive interference at the final step.' },
      { kind: 'heading', text: '3 · Visual understanding', level: 2 },
      { kind: 'callout', tone: 'visual', title: 'The Bloch sphere', text: 'A single pure qubit state maps to a point on the unit sphere: north pole $|0\\rangle$, south pole $|1\\rangle$, equator for equal superpositions with varying relative phase. Gates are rotations of this sphere; entanglement requires at least two qubits and cannot be visualised as two independent points.' },
      { kind: 'heading', text: '4 · Definition and notation', level: 2 },
      { kind: 'math', latex: String.raw`$|\psi\rangle=\alpha|0\rangle+\beta|1\rangle,\qquad |\alpha|^2+|\beta|^2=1;\qquad U^\dagger U=I.$`, display: true, caption: 'Qubit normalisation and unitary gates.' },
      { kind: 'math', latex: String.raw`$H=\frac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix},\quad \mathrm{CNOT}=\begin{pmatrix}1&0&0&0\\0&1&0&0\\0&0&0&1\\0&0&1&0\end{pmatrix}.$`, display: true, caption: 'Hadamard and controlled-NOT gates.' },
      { kind: 'math', latex: String.raw`$P(0)=|\alpha|^2,\quad P(1)=|\beta|^2\quad\text{(Born rule)};\qquad \mathrm{BQP}=\text{bounded-error quantum polynomial time}.$`, display: true, caption: 'Measurement and the quantum complexity class.' },
      { kind: 'heading', text: '5 · Derivation from first principles', level: 2 },
      { kind: 'steps', title: 'No-cloning, Bell states, and algorithmic speedups', items: [
        { title: 'No-cloning theorem (proved)', text: 'A linear map $C$ satisfying $C|\\psi\\rangle|0\\rangle=|\\psi\\rangle|\\psi\\rangle$ for all $\\psi$ cannot exist: inner products of clones would be $\\langle\\psi|\\phi\\rangle$ but also $\\langle\\psi|\\phi\\rangle^2$.', math: String.raw`$\langle\psi|\phi\rangle=\langle\psi|\phi\rangle^2\ \forall\psi,\phi\ \implies\ \text{no universal cloner.}$` },
        { title: 'Create entanglement', text: 'Apply $H\\otimes I$ to $|00\\rangle$, then CNOT: the result is the Bell state with maximally correlated measurement outcomes.', math: String.raw`$(H\otimes I)|00\rangle=\frac{|00\rangle+|10\rangle}{\sqrt2}\ \xrightarrow{\mathrm{CNOT}}\ \frac{|00\rangle+|11\rangle}{\sqrt2}.$` },
        { title: 'Bell inequality (theorem + experiment)', text: 'For CHSH, every local hidden-variable theory satisfies $|S|\\le2$, while quantum mechanics allows $2\\sqrt2\\approx2.828$ (Tsirelson bound), confirmed by loophole-free experiments.', math: String.raw`$|S|_{\mathrm{classical}}\le2,\qquad |S|_{\mathrm{quantum}}\le2\sqrt2.$` },
        { title: 'Shor\'s algorithm (proved)', text: 'Order finding via the quantum Fourier transform runs in $\\mathrm{poly}(\\log N)$ time and reduces factoring to order finding; this is a theorem about an ideal quantum computer, not a claim about present hardware.', math: String.raw`$\text{Factoring}\in\mathrm{BQP}\quad\text{(Shor, 1994)}.$` },
        { title: 'Fault tolerance (theorem)', text: 'The threshold theorem: if physical error rates are below a constant threshold and noise is sufficiently local and stochastic, arbitrary-length quantum computation can be performed reliably with polylogarithmic overhead.', math: String.raw`$\varepsilon<\varepsilon_{\mathrm{th}}\ \implies\ \text{arbitrarily long reliable computation is possible in principle.}$` },
      ] },
      { kind: 'heading', text: '6 · Worked examples', level: 2 },
      { kind: 'math', latex: String.raw`$H|0\rangle=\frac{|0\rangle+|1\rangle}{\sqrt2}:\quad P(0)=P(1)=\tfrac12=0.5.$`, display: true, caption: 'A single Hadamard then measurement is a fair quantum coin.' },
      { kind: 'table', headers: ['statement', 'status', 'note'], rows: [
        ['No-cloning theorem', 'Theorem', 'follows from linearity of quantum mechanics'],
        ['CHSH classical bound $|S|\\le2$', 'Theorem', 'Bell 1964; CHSH 1969'],
        ['Tsirelson bound $2\\sqrt2$', 'Theorem', 'Tsirelson, 1980'],
        ['Shor factors in polynomial time', 'Theorem (ideal model)', 'physical scaling is an open engineering challenge'],
        ['Fault-tolerance threshold theorem', 'Theorem (under noise assumptions)', 'Aharonov–Ben-Or; Kitaev'],
        ['$\\mathrm{BQP}$ vs $\\mathrm{NP}$ separation', 'OPEN', 'oracle separations are proved; unrelaxed separation is not'],
      ] },
      { kind: 'math', latex: String.raw`$\frac{|00\rangle+|11\rangle}{\sqrt2}:\quad P(00)=P(11)=0.5,\ P(01)=P(10)=0.$`, display: true, caption: 'Bell-state measurement statistics.' },
      { kind: 'heading', text: '7 · Theorems and proofs', level: 2 },
      { kind: 'math', latex: String.raw`$\text{Grover (1996): searching }N\text{ items needs }O(\sqrt N)\text{ oracle queries; this is optimal.}$`, display: true, caption: 'The quadratic speedup and its matching lower bound are theorems.' },
      { kind: 'math', latex: String.raw`$\mathrm{P}\subseteq\mathrm{BPP}\subseteq\mathrm{BQP}\subseteq\mathrm{PP}\subseteq\mathrm{PSPACE}\quad\text{(proved containments).}$`, display: true, caption: 'Known class relationships; strictness of most inclusions is open.' },
      { kind: 'callout', tone: 'warning', title: 'Integrity: proven algorithms versus open physics and complexity', text: 'Shor\'s and Grover\'s algorithms are proved results about an ideal quantum computer. It is NOT proved that BQP contains NP-complete problems, nor that scalable fault-tolerant hardware exists. Oracle separations (proved) do not resolve the unrelaxed class question.' },
      { kind: 'callout', tone: 'history', title: 'From Feynman to Shor', text: 'Paul Benioff (1980) and Richard Feynman (1982) proposed quantum simulation; David Deutsch formalised quantum Turing machines (1985). Peter Shor\'s 1994 factoring algorithm triggered explosive growth; his 9-qubit error-correcting code and subsequent threshold theorems made fault-tolerant computation a rigorous subject in the late 1990s.' },
      { kind: 'heading', text: '8 · Computational experiment', level: 2 },
      { kind: 'code', language: 'python', caption: 'Simulate one and two qubits with NumPy; compute Bell-state statistics.', code: String.raw`import numpy as np

ket0 = np.array([1.,0.]); ket1 = np.array([0.,1.])
H = np.array([[1,1],[1,-1]])/np.sqrt(2)
psi = H @ ket0
print("H|0> =", psi, " probabilities:", np.abs(psi)**2)

I = np.eye(2)
CNOT = np.array([[1,0,0,0],[0,1,0,0],[0,0,0,1],[0,0,1,0]])
bell = CNOT @ np.kron(H, I) @ np.kron(ket0, ket0)
print("Bell state:", bell)
print("probabilities:", np.abs(bell)**2)
print("norm:", np.linalg.norm(bell))` },
      { kind: 'heading', text: '9 · Real-world applications', level: 2 },
      { kind: 'list', items: [
        'Quantum simulation of molecules and materials (the original motivation).',
        'Cryptography: Shor\'s algorithm and the post-quantum cryptography response.',
        'Quantum key distribution and device-independent randomness.',
        'Optimisation heuristics (QAOA) — empirical performance, no general speedup proof.',
        'Quantum error correction and topological codes.',
      ] },
      { kind: 'heading', text: '10 · Common mistakes', level: 2 },
      { kind: 'callout', tone: 'warning', title: 'Do not confuse exponential state space with exponential speedup', text: 'An $n$-qubit state has $2^n$ amplitudes, but measurement yields only $n$ bits and accessing amplitudes is not free. Speedups are proved only for specific problems (factoring, discrete log, simulation, search); generic optimisation speedups are unproved.' },
      { kind: 'heading', text: '11 · Conceptual questions', level: 2 },
      { kind: 'list', items: [
        'Prove the no-cloning theorem from linearity in two lines.',
        'Compute the Bell-state probabilities after measuring both qubits.',
        'Why does the CHSH bound $2$ not forbid the quantum value $2\\sqrt2$?',
        'What does the fault-tolerance threshold theorem assume about noise?',
      ] },
      { kind: 'heading', text: '12 · Further reading', level: 2 },
      { kind: 'paragraph', text: 'Nielsen & Chuang, *Quantum Computation and Quantum Information*; Shor, *Polynomial-time algorithms for prime factorization and discrete logarithms* (SIAM J. Comput., 1997); Aharonov & Ben-Or, *Fault-tolerant quantum computation with constant error* (STOC 1997); Watrous, *The Theory of Quantum Information* (free online).' },
    ],
  },
]


// ─────────────────────────────────────────────────────────────────────────────
// Derivations: complete first-principles arguments with assumptions and limits.
// ─────────────────────────────────────────────────────────────────────────────

export const P4_DERIVATIONS: Derivation[] = [
  {
    id: 'p4-der-newton-quadratic',
    title: 'Quadratic convergence of Newton–Raphson at a simple root',
    topicId: 'newton-raphson',
    statement: String.raw`If $f\in C^2$ on an interval containing a simple root $x^*$ ($f(x^*)=0$, $f'(x^*)\neq0$), and $x_0$ is sufficiently close to $x^*$, then the Newton iterates $x_{n+1}=x_n-f(x_n)/f'(x_n)$ converge to $x^*$ with
$$e_{n+1}=\frac{f''(x^*)}{2f'(x^*)}e_n^2+O(e_n^3),\qquad e_n=x_n-x^*.$$
Thus $\lim_{n\to\infty}|e_{n+1}|/|e_n|^2=|f''(x^*)/(2f'(x^*))|$ — Q-order 2.`,
    problem: String.raw`Prove the error recursion, identify the asymptotic constant, and explain why the convergence is only local. Illustration: for $f(x)=x^2-2$, compute the ratio $e_{n+1}/e_n^2$ and compare it to the predicted constant.`,
    assumptions: [
      '$f$ is twice continuously differentiable near $x^*$.',
      '$x^*$ is a simple root: $f\'(x^*)\\neq0$ (so $f\'$ is bounded away from zero nearby).',
      '$x_0$ lies in a neighbourhood where the Newton map is a contraction (local hypothesis).',
      'Exact arithmetic in the proof; floating-point roundoff is treated separately.',
    ],
    variables: [
      { symbol: 'x^*', meaning: 'the simple root being approximated' },
      { symbol: 'e_n', meaning: 'iteration error $x_n-x^*$' },
      { symbol: 'C', meaning: 'asymptotic error constant $f\'\'(x^*)/(2f\'(x^*))$' },
      { symbol: '\\xi_n', meaning: 'Taylor remainder point between $x_n$ and $x^*$' },
    ],
    tools: ['Taylor theorem with Lagrange remainder', 'continuity of $f\'$ and $f\'\'$', 'definition of Q-order convergence'],
    steps: [
      { title: 'Set up the error variable', text: String.raw`Write $x_n=x^*+e_n$. Since $f(x^*)=0$, Taylor expansion about $x_n$ gives an exact relation involving $f(x_n)$ and $e_n$.`, math: String.raw`$0=f(x^*)=f(x_n)-f'(x_n)e_n+\tfrac12 f''(\xi_n)e_n^2.$` },
      { title: 'Solve for $f(x_n)$', text: String.raw`Rearrange to express the residual in terms of the error; this is valid whenever $f\'(x_n)\\neq0$.`, math: String.raw`$f(x_n)=f'(x_n)e_n-\tfrac12 f''(\xi_n)e_n^2.$` },
      { title: 'Insert into the Newton update', text: String.raw`Substitute the expression for $f(x_n)$ into $e_{n+1}=e_n-f(x_n)/f\'(x_n)$ and cancel the linear terms.`, math: String.raw`$e_{n+1}=e_n-e_n+\frac{f''(\xi_n)}{2f'(x_n)}e_n^2=\frac{f''(\xi_n)}{2f'(x_n)}e_n^2.$` },
      { title: 'Pass to the limit', text: String.raw`As $x_n\to x^*$, both $\xi_n\to x^*$ and $f\'(x_n)\to f\'(x^*)\\neq0$ by continuity; hence the coefficient tends to $C=f\'\'(x^*)/(2f\'(x^*))$.`, math: String.raw`$\frac{e_{n+1}}{e_n^2}\to\frac{f''(x^*)}{2f'(x^*)}=C.$` },
      { title: 'Conclude the order', text: String.raw`If $C\\neq0$, then $|e_{n+1}|\\approx|C||e_n|^2$, so the number of correct digits roughly doubles each iteration. If $C=0$ the order can be different; for a multiple root the rate degrades.`, math: String.raw`$|e_{n+1}|=|C||e_n|^2+O(|e_n|^3).$` },
      { title: 'Locality', text: String.raw`To guarantee $x_n\to x^*$ one needs $|x_0-x^*|$ small: the Newton map $N(x)=x-f/f\'$ is not a contraction globally. For $f(x)=x^3-5x$, $N(1)=-1$ and $N(-1)=1$, a 2-cycle.`, math: String.raw`$N'(x^*)=0\ \text{but}\ |N'(x)|\ \text{can exceed }1\ \text{away from }x^*.$` },
    ],
    result: String.raw`Newton iteration is locally quadratically convergent at a simple root with error constant $C=f\'\'(x^*)/(2f\'(x^*))$; for $f(x)=x^2-a$, $C=1/(2\\sqrt a)$ (e.g. $a=2$: $C=0.35355339\ldots$; $a=7$: $C=0.18898224\ldots$).`,
    interpretation: String.raw`Quadratic convergence means the correction term is proportional to the square of the previous error: once the iterate is close, each step roughly doubles the number of accurate digits. The catch is that "close" is a neighbourhood, not a global guarantee, which is why production solvers use damping, line search, or bracketing fallbacks.`,
    examples: [
      String.raw`$f(x)=x^2-2$, $x_0=1$: $1\to1.5\to1.4166667\to1.4142157\to1.4142135624$; ratios $0.5,\,0.3333,\,0.3532,\,0.3536\to1/(2\\sqrt2)=0.353553$.`,
      String.raw`$f(x)=x^3-x-2$, $x_0=1.5$: $1.5217391304\to1.5213798060\to1.5213797068$; $C\approx0.497.$`,
    ],
    applications: ['Root polishing after a bracketing method', 'Nonlinear least squares and Fisher scoring', 'Implicit ODE and mechanics solvers', 'Power-flow and circuit equations'],
    limitations: ['Requires $f\'$ and can fail near $f\'=0$', 'At a multiple root the rate degrades to linear', 'Local convergence only; basins can be fractal', 'Roundoff sets a floor on attainable accuracy'],
  },

  {
    id: 'p4-der-euler-stability',
    title: 'Absolute stability region of the explicit Euler method',
    topicId: 'stability-convergence',
    statement: String.raw`Applied to the Dahlquist test equation $y'=\lambda y$ ($\lambda\in\mathbb{C}$, $\Re\lambda<0$), explicit Euler gives $y_n=(1+h\lambda)^n y_0$. It is absolutely stable exactly when $|1+h\lambda|\le1$: a unit disk in the complex $z=h\lambda$ plane centred at $-1$. For real $\lambda=-a<0$ this means $0<h\le2/a$.`,
    problem: String.raw`Derive the amplification factor, describe the stability region geometrically, show that the stability threshold for $y'=-y$ is $h=2$, and connect bounded amplification to convergence order.`,
    assumptions: [
      'The test equation is linear, scalar, autonomous with constant $\\lambda$.',
      'Step size $h>0$ is constant.',
      'Exact arithmetic (roundoff ignored in the stability analysis).',
      'The exact solution decays: $\\Re\\lambda<0$.',
    ],
    variables: [
      { symbol: 'z', meaning: 'dimensionless product $h\\lambda$' },
      { symbol: 'R(z)', meaning: 'amplification factor $1+z$ per step' },
      { symbol: '\\mathcal R', meaning: 'stability region $\\{z:|R(z)|\\le1\\}$' },
    ],
    tools: ['Dahlquist test equation', 'complex moduli', 'Taylor/local truncation error', 'Gronwall-type error summation'],
    steps: [
      { title: 'Apply the method', text: String.raw`Substitute $f(t_n,y_n)=\\lambda y_n$ into $y_{n+1}=y_n+h f_n$.`, math: String.raw`$y_{n+1}=(1+h\lambda)y_n=R(z)y_n,\quad z=h\lambda,\ R(z)=1+z.$` },
      { title: 'Iterate', text: String.raw`Induction gives the closed form for the numerical solution after $n$ steps.`, math: String.raw`$y_n=R(z)^n y_0=(1+z)^n y_0.$` },
      { title: 'Stability inequality', text: String.raw`Boundedness requires $|R(z)|\\le1$. Writing $z=x+iy$ gives the disk condition.`, math: String.raw`$|1+x+iy|\le1\iff(x+1)^2+y^2\le1.$` },
      { title: 'Real-axis intersection', text: String.raw`For purely decaying real modes $\\lambda=-a$ ($a>0$), $-2\\le-ha\\le0$, i.e. $h\\le2/a$. At $h=2/a$, $R=-1$ and the solution oscillates without growing.`, math: String.raw`$|1-ha|\le1\iff 0\le ha\le2.$` },
      { title: 'Contrast with backward Euler', text: String.raw`The implicit method gives $R(z)=1/(1-z)$; $|R|\\le1$ whenever $\\Re z\\le0$, so it is A-stable.`, math: String.raw`$y_{n+1}=y_n+h\lambda y_{n+1}\implies R(z)=\frac{1}{1-z}.$` },
      { title: 'From local to global error', text: String.raw`If $R$ is uniformly bounded and the local truncation error is $O(h^{p+1})$, summing $O(1/h)$ steps gives $O(h^p)$ global accuracy.`, math: String.raw`$e_{n+1}=R(z)e_n+O(h^{p+1})\ \Longrightarrow\ e_N=O(h^p),\quad N=T/h.$` },
    ],
    result: String.raw`The explicit Euler stability region is $\\{z:|1+z|\\le1\\}$; for $\\lambda=-1$, $h\\le2$ is necessary and sufficient for boundedness, and the global error is $O(h)$ when the step is inside the region.`,
    interpretation: String.raw`Stability and accuracy are distinct: shrinking $h$ improves the $O(h)$ error, but crossing $h=2/|\\lambda|$ flips the amplification from damping to growth. Stiff systems with widely separated $|\\lambda|$ force explicit methods to use the smallest time scale even when the fast modes are irrelevant.`,
    examples: [
      String.raw`$y'=-y$, $y(0)=1$, $T=1$: $h=0.1$ gives $0.9^{10}=0.348678$ vs $e^{-1}=0.367879$ (error $1.92\\times10^{-2}$); $h=0.01$ gives $0.99^{100}=0.366032$ (error $1.85\\times10^{-3}$), a factor $10.4$ improvement.`,
      String.raw`$h=2.1$: $|R|=1.1$, so after 40 steps $|y_{40}|\\approx1.1^{40}=45.3$ although the exact solution is $e^{-4}=0.0183$.`,
    ],
    applications: ['Choosing time steps in explicit ODE integrators', 'CFL conditions for hyperbolic and parabolic PDEs', 'Stability of discrete-time control filters', 'Analysis of stiff chemical kinetics'],
    limitations: ['The test equation is scalar and linear; nonlinear stability needs separate notions', 'A-stability does not guarantee accuracy', 'Dahlquist barriers restrict high-order A-stable multistep methods'],
  },

  {
    id: 'p4-der-heat-separation',
    title: 'Separation of variables for the one-dimensional heat equation',
    topicId: 'heat-equation',
    statement: String.raw`For $u_t=\alpha u_{xx}$ on $0<x<L$ with $u(0,t)=u(L,t)=0$ and $u(x,0)=f(x)$,
$$u(x,t)=\sum_{n=1}^{\infty} b_n e^{-\alpha(n\pi/L)^2t}\sin\frac{n\pi x}{L},\qquad b_n=\frac{2}{L}\int_0^L f(x)\sin\frac{n\pi x}{L}\,dx.$$
Each mode decays exponentially at rate $\alpha(n\pi/L)^2$.`,
    problem: String.raw`Derive the sine-series solution from first principles: justify the product ansatz, solve the resulting eigenvalue problem, obtain decay rates, and determine coefficients by orthogonality. Then derive the FTCS von Neumann stability condition $r\le1/2$.`,
    assumptions: [
      'Linear homogeneous PDE with constant diffusivity $\\alpha>0$.',
      'Homogeneous Dirichlet boundary data (needed for the sine eigenfunctions).',
      '$f$ is piecewise smooth so its sine series converges appropriately.',
      'Superposition is valid by linearity.',
    ],
    variables: [
      { symbol: '\\lambda_n', meaning: 'spatial eigenvalue $(n\\pi/L)^2$' },
      { symbol: 'b_n', meaning: 'Fourier sine coefficient of the initial data' },
      { symbol: 'r', meaning: 'mesh ratio $\\alpha\\Delta t/\\Delta x^2$' },
      { symbol: '\\xi', meaning: 'von Neumann amplification factor per time step' },
    ],
    tools: ['separation of variables', 'Sturm–Liouville eigenvalue problem', 'Fourier sine orthogonality', 'von Neumann Fourier analysis'],
    steps: [
      { title: 'Product ansatz', text: String.raw`Assume a nontrivial solution $u=XT$; divide by $\\alpha XT$ so that each side depends on a single variable.`, math: String.raw`$\frac{T'}{\alpha T}=\frac{X''}{X}=-\lambda.$` },
      { title: 'Boundary value problem', text: String.raw`Homogeneous Dirichlet data forces sinusoidal eigenfunctions with $\\lambda>0$; $\\lambda=0$ and $\\lambda<0$ give only trivial solutions.`, math: String.raw`$X''+\lambda X=0,\ X(0)=X(L)=0\ \implies\ \lambda_n=(n\pi/L)^2,\ X_n=\sin(n\pi x/L).$` },
      { title: 'Time evolution', text: String.raw`Solve the first-order decay ODE for each mode.`, math: String.raw`$T_n'(t)=-\alpha\lambda_n T_n\ \implies\ T_n(t)=e^{-\alpha\lambda_n t}.$` },
      { title: 'Superpose and fit initial data', text: String.raw`Linearity permits summing all modes; sine orthogonality with weight $2/L$ extracts $b_n$.`, math: String.raw`$f(x)=\sum_{n\ge1}b_n\sin\frac{n\pi x}{L},\quad b_n=\frac{2}{L}\int_0^L f(x)\sin\frac{n\pi x}{L}\,dx.$` },
      { title: 'Discrete stability', text: String.raw`Insert a single Fourier mode $u_i^m=\\xi^m e^{i\\theta i}$ into the FTCS scheme.`, math: String.raw`$\xi=1+r(e^{i\theta}-2+e^{-i\theta})=1-4r\sin^2(\theta/2).$` },
      { title: 'Stability bound', text: String.raw`The worst case is $\\sin^2(\\theta/2)=1$; requiring $|\\xi|\\ge-1$ gives $r\\le1/2$.`, math: String.raw`$|1-4r|\le1\iff 0\le r\le1/2.$` },
    ],
    result: String.raw`The exact solution is a decaying sine series with rate $\\alpha(n\\pi/L)^2$ per mode; the explicit FTCS discretisation is stable iff $r=\\alpha\\Delta t/\\Delta x^2\\le1/2$. For $L=\\alpha=1$, $f=\\sin(\\pi x)$: $u(0.5,1)=e^{-0.1\\pi^2}=0.3727078389$.`,
    interpretation: String.raw`Diffusion acts as a low-pass filter: mode $n$ is damped $n^2$ times faster than mode 1, so rough initial data smooths almost instantly. The numerical stability limit reflects the same physics — explicit schemes cannot resolve the fastest grid-scale mode unless the time step is $O(\\Delta x^2)$.`,
    examples: [
      String.raw`$L=1$, $\\alpha=0.1$, $f=\\sin\\pi x$: $u(0.5,t)=e^{-0.1\\pi^2 t}$; at $t=1$, $0.3727078389$; at $t=2$, $0.1389111331$.`,
      String.raw`$f(x)=x(1-x)$ on $[0,1]$: $b_n=4(1-(-1)^n)/(n^3\\pi^3)$; $b_1=8/\\pi^3=0.2580123\ldots$`,
    ],
    applications: ['Thermal diffusion in rods and slabs', 'Fokker–Planck densities', 'Image diffusion filtering', 'Black–Scholes PDE after change of variables'],
    limitations: ['Homogeneous Dirichlet data is essential for this simple sine series', 'Neumann or periodic data changes the eigenbasis', 'Corner compatibility at $t=0$ needs care', 'Explicit time stepping is expensive for fine meshes'],
  },

  {
    id: 'p4-der-gd-strongly-convex',
    title: 'Linear convergence of gradient descent under strong convexity and smoothness',
    topicId: 'gradient-descent',
    statement: String.raw`Let $f:\mathbb{R}^d\to\mathbb{R}$ be $\mu$-strongly convex and $L$-smooth ($\mu>0$). With constant step $\eta=1/L$, gradient descent $x_{k+1}=x_k-\eta\nabla f(x_k)$ satisfies
$$f(x_{k+1})-f^*\le\left(1-\frac{\mu}{L}\right)\big(f(x_k)-f^*\big).$$
Hence $f(x_k)-f^*\le(1-\mu/L)^k(f(x_0)-f^*)$: exponential convergence with condition number $\kappa=L/\mu$.`,
    problem: String.raw`Prove the one-step contraction using the descent lemma and the strong convexity lower bound, derive the iteration complexity to reach $f(x_k)-f^*\le\varepsilon$, and verify numerically on $f(x,y)=x^2+5y^2$.`,
    assumptions: [
      '$f$ is differentiable and $L$-smooth on $\\mathbb{R}^d$.',
      '$f$ is $\\mu$-strongly convex with $\\mu>0$, so a unique minimiser $x^*$ exists.',
      'Constant step size $\\eta=1/L$ (the argument extends to $0<\\eta<2/L$).',
      'Exact gradients (no stochastic noise).',
    ],
    variables: [
      { symbol: 'L', meaning: 'Lipschitz constant of $\\nabla f$ (maximum curvature)' },
      { symbol: '\\mu', meaning: 'strong convexity parameter (minimum curvature)' },
      { symbol: '\\kappa', meaning: 'condition number $L/\\mu$' },
      { symbol: 'x^*', meaning: 'unique minimiser, $f(x^*)=f^*$' },
    ],
    tools: ['descent lemma from $L$-smoothness', 'strong convexity inequality', 'Cauchy–Schwarz / PL inequality'],
    steps: [
      { title: 'Descent lemma', text: String.raw`$L$-smoothness bounds the Taylor remainder by a quadratic, giving a guaranteed decrease.`, math: String.raw`$f(y)\le f(x)+\nabla f(x)^T(y-x)+\frac L2\|y-x\|^2.$` },
      { title: 'Plug in the step', text: String.raw`Set $y=x_{k+1}=x_k-\\frac1L\\nabla f(x_k)$ and simplify.`, math: String.raw`$f(x_{k+1})\le f(x_k)-\frac{1}{2L}\|\nabla f(x_k)\|^2.$` },
      { title: 'Strong convexity lower bound', text: String.raw`Apply $\\mu$-strong convexity at $x_k$ with $y=x^*$; since $\\nabla f(x^*)=0$, Cauchy–Schwarz yields a PL-type inequality.`, math: String.raw`$f(x_k)-f^*\le\frac{1}{2\mu}\|\nabla f(x_k)\|^2.$` },
      { title: 'Combine', text: String.raw`Eliminate $\\|\\nabla f(x_k)\\|^2$ between the previous two inequalities.`, math: String.raw`$f(x_{k+1})-f^*\le\left(1-\frac{\mu}{L}\right)(f(x_k)-f^*).$` },
      { title: 'Iterate', text: String.raw`Induction produces the exponential rate and the iteration count $k\\ge\\kappa\\ln((f(x_0)-f^*)/\\varepsilon)$.`, math: String.raw`$f(x_k)-f^*\le\left(1-\frac1\kappa\right)^k(f(x_0)-f^*)\le e^{-k/\kappa}(f(x_0)-f^*).$` },
      { title: 'Quadratic verification', text: String.raw`For $f=x^2+5y^2$, $\\nabla^2f=\\mathrm{diag}(2,10)$, so $\\mu=2$, $L=10$, and with $\\eta=0.1$ the coordinates contract by $0.8$ and $0.5$.`, math: String.raw`$x_k=10(0.8)^k,\quad y_k=4(0.5)^k,\quad f_k=100(0.64)^k+80(0.25)^k.$` },
    ],
    result: String.raw`Gradient descent converges linearly with factor at most $1-\\mu/L$ in objective value (and $\\max\\{|1-\\eta\\mu|,|1-\\eta L|\\}$ per coordinate for quadratics). For $f=x^2+5y^2$, $\\eta=0.1$, $(x_0,y_0)=(10,4)$: after 5 steps $(x,y)=(3.2768,0.125)$ and $f=10.81554324$; reaching $f\\le10^{-6}f_0$ needs at least 31 steps.`,
    interpretation: String.raw`Ill-conditioning ($\\kappa\\gg1$) is the enemy: elongated level sets force zig-zags, and the number of iterations grows linearly in $\\kappa$. Acceleration (Nesterov, conjugate gradients) improves the dependence to $\\sqrt\\kappa$ but requires additional structure or momentum.`,
    examples: [
      String.raw`$f=x^2$ from $x_0=4$, $\\eta=0.1$: $4,3.2,2.56,2.048,\\dots$; $\\eta=1.1$ multiplies errors by $-1.2$ and diverges.`,
      String.raw`$f=x^2+3y^2$, $\\eta=0.1$: $(3,2)\\to(2.4,0.8)\\to(1.92,0.32)$; contraction factors $0.8$ and $0.4$.`,
    ],
    applications: ['Convex machine-learning objectives', 'Least squares and ridge regression', 'Quadratic programs in control', 'Preconditioning analysis for iterative solvers'],
    limitations: ['Strong convexity fails for flat directions and overparameterised networks', 'Smoothness constants may be unknown or huge', 'Stochastic gradients break the deterministic rate', 'Accelerated methods need different proofs'],
  },

  {
    id: 'p4-der-kkt',
    title: 'KKT conditions from Lagrange multipliers and convex duality',
    topicId: 'lagrange-multipliers',
    statement: String.raw`For $\min f(x)$ subject to $g_i(x)\le0$ ($i=1,\dots,m$) and $Ax=b$, with $f,g_i$ convex differentiable and affine $A$, a point $x^*$ satisfying Slater's condition is globally optimal if and only if there exist $\lambda_i\ge0$ and $\nu$ with
$$\nabla f(x^*)+\sum_i\lambda_i\nabla g_i(x^*)+A^T\nu=0,\quad g_i(x^*)\le0,\quad Ax^*=b,\quad \lambda_i g_i(x^*)=0.$$
The last relation is complementary slackness.`,
    problem: String.raw`Derive the KKT system from stationarity of the Lagrangian and feasibility, explain why the multipliers are nonnegative for inequality constraints, prove sufficiency under convexity, and verify on a two-dimensional quadratic program.`,
    assumptions: [
      '$f$ and $g_i$ are convex and continuously differentiable; $Ax=b$ is affine.',
      'Slater condition: some strictly feasible point exists ($g_i(x)<0$ for all $i$).',
      'A constraint qualification holds so that multipliers exist at an optimum.',
      'The feasible set is nonempty and the infimum is attained.',
    ],
    variables: [
      { symbol: '\\lambda_i', meaning: 'multiplier for inequality $g_i\\le0$' },
      { symbol: '\\nu', meaning: 'multiplier vector for equalities $Ax=b$' },
      { symbol: '\\mathcal L', meaning: 'Lagrangian $f+\\sum\\lambda_i g_i+\\nu^T(Ax-b)$' },
      { symbol: 'd^*', meaning: 'optimal value (also the dual maximum under strong duality)' },
    ],
    tools: ['Lagrangian stationarity', 'complementary slackness', 'convex supporting hyperplane inequality', 'weak and strong duality'],
    steps: [
      { title: 'Form the Lagrangian', text: String.raw`Combine the objective and constraints with multipliers; for inequalities the correct sign is $\\lambda_i\\ge0$.`, math: String.raw`$\mathcal L(x,\lambda,\nu)=f(x)+\sum_i\lambda_i g_i(x)+\nu^T(Ax-b),\quad \lambda_i\ge0.$` },
      { title: 'Dual function and weak duality', text: String.raw`For feasible $x$ and $\\lambda\\ge0$, $\\mathcal L(x,\\lambda,\\nu)\\le f(x)$, so the dual infimum is a lower bound.`, math: String.raw`$q(\lambda,\nu)=\inf_x\mathcal L(x,\lambda,\nu)\le d^*\le f(x^*).$` },
      { title: 'Stationarity', text: String.raw`At an unconstrained minimum of the Lagrangian in $x$, the gradient vanishes.`, math: String.raw`$\nabla_x\mathcal L=\nabla f(x^*)+\sum_i\lambda_i\nabla g_i(x^*)+A^T\nu=0.$` },
      { title: 'Complementary slackness', text: String.raw`Since $\\lambda_i\\ge0$ and $g_i\\le0$, each term $\\lambda_i g_i\\le0$; equality of primal and dual values forces it to vanish, so inactive constraints have $\\lambda_i=0$.`, math: String.raw`$\lambda_i g_i(x^*)=0\quad\forall i.$` },
      { title: 'Sufficiency under convexity', text: String.raw`If a KKT point exists, the supporting-hyperplane inequality gives $f(x)\\ge\\mathcal L(x,\\lambda,\\nu)\\ge\\mathcal L(x^*,\\lambda,\\nu)=f(x^*)$ for all feasible $x$.`, math: String.raw`$f(x)\ge f(x^*)+\nabla f(x^*)^T(x-x^*)\ge f(x^*).$` },
      { title: 'Worked verification', text: String.raw`Minimise $x^2+2y^2$ subject to $x+y=3$: $2x=\\nu$, $4y=\\nu$, hence $x=2y$, $y=1$, $x=2$, $f=6$, $\\nu=4$. The value function $V(c)=2c^2/3$ has $V\'(3)=4=\\nu$, confirming sensitivity.`, math: String.raw`$x^*=2,\ y^*=1,\ \nu^*=4,\ V(c)=\frac{2c^2}{3},\ V'(c)=\frac{4c}{3}.$` },
    ],
    result: String.raw`KKT conditions are necessary under a constraint qualification and sufficient under convexity with Slater; multipliers equal derivatives of the optimal value with respect to constraint right-hand sides. In the example, $(x^*,y^*)=(2,1)$, $f^*=6$, $\\nu^*=4$.`,
    interpretation: String.raw`KKT generalises $\\nabla f=0$ to constrained problems: the objective gradient can be nonzero if it balances constraint gradients. Complementary slackness tells us which constraints actually shape the optimum; the multiplier quantifies the value of relaxing each binding constraint (shadow price).`,
    examples: [
      String.raw`$\\max xy$ s.t. $x^2+y^2=1$: $\\lambda=\\pm1/2$ and $x=\\pm y=\\pm1/\\sqrt2$; the four candidates give $f=\\pm0.5$.`,
      String.raw`$\\min x^2+y^2+xy-3x$ s.t. $y\\ge0$: at $(1.5,0)$ the active multiplier is $\\lambda=1.5>0$, and the constrained minimum is $-2.25$.`,
    ],
    applications: ['Convex QPs in SVMs and portfolio selection', 'Economic shadow prices', 'Signal processing with constraints', 'Model predictive control'],
    limitations: ['Nonconvex KKT points may be saddles or local maxima', 'Without constraint qualifications multipliers may not exist', 'Slater failure breaks strong duality', 'Numerical solvers stop at approximate satisfaction'],
  },

  {
    id: 'p4-der-black-scholes',
    title: 'Black–Scholes PDE via delta hedging and the closed-form call price',
    topicId: 'black-scholes',
    statement: String.raw`Under $dS=\mu S\,dt+\sigma S\,dW$, a European option price $V(S,t)$ satisfies
$$V_t+\tfrac12\sigma^2S^2V_{SS}+rSV_S-rV=0,\qquad V(S,T)=\max(S-K,0),$$
and the call price is $C=S N(d_1)-Ke^{-r\tau}N(d_2)$ with $d_1=[\ln(S/K)+(r+\sigma^2/2)\tau]/(\sigma\sqrt\tau)$, $d_2=d_1-\sigma\sqrt\tau$, $\tau=T-t$.`,
    problem: String.raw`Derive the PDE by constructing a self-financing delta-hedged portfolio, transform it to the heat equation, solve by convolution with the lognormal kernel, and verify the formula numerically for $S=K=100$, $r=0.05$, $\sigma=0.2$, $T=1$.`,
    assumptions: [
      'The stock follows geometric Brownian motion with constant $\\mu,\\sigma$.',
      'Constant risk-free rate $r$, no dividends, no transaction costs or taxes.',
      'Continuous trading and frictionless markets allow perfect replication.',
      'European exercise; no early exercise feature.',
    ],
    variables: [
      { symbol: '\\Delta', meaning: 'hedge ratio $V_S$ (shares held per short option)' },
      { symbol: '\\Pi', meaning: 'portfolio value $-V+\\Delta S$' },
      { symbol: '\\tau', meaning: 'time to maturity $T-t$' },
      { symbol: 'N(\\cdot)', meaning: 'standard normal cumulative distribution function' },
    ],
    tools: ["Itô's lemma", 'no-arbitrage argument', 'logarithmic change of variables', 'Feynman–Kac / heat kernel'],
    steps: [
      { title: 'Itô expansion', text: String.raw`Apply Itô to $V(S_t,t)$; the $(dS)^2=\\sigma^2S^2dt$ term supplies the convexity correction.`, math: String.raw`$dV=(V_t+\mu S V_S+\tfrac12\sigma^2S^2V_{SS})dt+\sigma S V_S dW.$` },
      { title: 'Hedge away the diffusion', text: String.raw`Hold $\\Delta=V_S$ shares against one short option; the $dW$ terms cancel exactly.`, math: String.raw`$d\Pi=-dV+\Delta dS=\left(-V_t-\tfrac12\sigma^2S^2V_{SS}\right)dt.$` },
      { title: 'No arbitrage', text: String.raw`A riskless portfolio must earn $r\\Pi\\,dt$; substitute $\\Pi=-V+SV_S$ and cancel.`, math: String.raw`$V_t+\tfrac12\sigma^2S^2V_{SS}+rSV_S-rV=0.$` },
      { title: 'Transform to heat equation', text: String.raw`Set $x=\\ln(S/K)$, $\\tau=T-t$ and rescale $V$; the drift terms cancel and $v_\\tau=\\tfrac12\\sigma^2 v_{xx}$ with a kinked initial condition.`, math: String.raw`$v_\tau=\tfrac12\sigma^2 v_{xx},\qquad v(x,0)=\max(e^x-1,0)e^{-\alpha x}.$` },
      { title: 'Convolve with the heat kernel', text: String.raw`The solution is a Gaussian integral; completing the square yields two lognormal probabilities and a discount factor.`, math: String.raw`$C=e^{-r\tau}\,\mathbb{E}^{\mathbb{Q}}[\max(S_T-K,0)].$` },
      { title: 'Evaluate and verify', text: String.raw`For $S=K=100$, $r=0.05$, $\\sigma=0.2$, $\\tau=1$: $d_1=0.35$, $d_2=0.15$, $N(d_1)=0.63683065$, $N(d_2)=0.55961769$, $C=10.45058357$, put $=5.57352601$ by parity.`, math: String.raw`$C=S N(d_1)-K e^{-r\tau}N(d_2)=10.45058357.$` },
    ],
    result: String.raw`The delta-hedging argument yields a parabolic PDE whose solution is $C=S N(d_1)-Ke^{-r\\tau}N(d_2)$; the option price is independent of $\\mu$ and equals the risk-neutral discounted expected payoff.`,
    interpretation: String.raw`Pricing is replication, not prediction: $\\mu$ disappears because continuous hedging removes exposure to the realised drift. The two probabilities $N(d_1)$ and $N(d_2)$ encode, respectively, the stock-weighted and probability-weighted chance of finishing in the money.`,
    examples: [
      String.raw`At-the-money call $S=K=100$, $r=5\\%$, $\\sigma=20\\%$, $\\tau=1$: price $10.45058357$, delta $0.63683065$, gamma $0.0187621$.`,
      String.raw`Put–call parity: $P=C-S+Ke^{-r\\tau}=10.45058357-100+95.122942=5.57352601$.`,
    ],
    applications: ['Equity and index option pricing', 'Implied volatility calibration', 'Credit structural models', 'Real-option valuation'],
    limitations: ['Constant volatility and no jumps contradict observed smiles', 'Continuous hedging and zero costs are idealised', 'American exercise and dividends require modifications', 'Model risk dominates when assumptions fail'],
  },

  {
    id: 'p4-der-sir-r0',
    title: 'Basic reproduction number, peak, and final size of the SIR model',
    topicId: 'epidemiological-models',
    statement: String.raw`For $\dot S=-\beta SI/N$, $\dot I=\beta SI/N-\gamma I$, $\dot R=\gamma I$:
$$R_0=\frac{\beta}{\gamma},\qquad \frac{S_{\text{peak}}}{N}=\frac{1}{R_0},\qquad 1-s_\infty=e^{-R_0(1-s_\infty)}.$$
$R_0>1$ is the epidemic threshold; $p_c=1-1/R_0$ is the homogeneous-mixing herd-immunity threshold.`,
    problem: String.raw`Linearise the infected equation around $S=N$, derive the growth threshold and doubling time, find the peak condition, integrate $dR/dS$ to obtain the final-size relation, and solve it numerically for $R_0=3$ and $R_0=4$.`,
    assumptions: [
      'Closed, well-mixed population of constant size $N=S+I+R$.',
      'Frequency-dependent transmission at rate $\\beta$ per infective.',
      'Exponential recovery with rate $\\gamma$, giving mean infectious period $1/\\gamma$.',
      'No latent stage, no births/deaths, no waning immunity, constant parameters.',
    ],
    variables: [
      { symbol: 'S,I,R', meaning: 'susceptible, infectious, recovered counts' },
      { symbol: '\\beta', meaning: 'effective contact rate per unit time' },
      { symbol: '\\gamma', meaning: 'recovery rate (inverse infectious period)' },
      { symbol: 's_\\infty', meaning: 'final susceptible fraction $S(\\infty)/N$' },
    ],
    tools: ['linearisation', 'separation of variables for $dR/dS$', 'spectral radius for structured generalisations'],
    steps: [
      { title: 'Early epidemic', text: String.raw`At $t\\approx0$, $S\\approx N$, so the $I$ equation linearises.`, math: String.raw`$\dot I\approx(\beta-\gamma)I=\gamma(R_0-1)I.$` },
      { title: 'Threshold and doubling', text: String.raw`Growth requires $R_0>1$; the initial doubling time follows from the exponential rate.`, math: String.raw`$T_d=\frac{\ln2}{\gamma(R_0-1)}.$` },
      { title: 'Peak of infections', text: String.raw`Set $\\dot I=0$ with $I>0$ to find the susceptible fraction at the peak.`, math: String.raw`$S_{\text{peak}}/N=\gamma/\beta=1/R_0.$` },
      { title: 'Final-size relation', text: String.raw`Eliminate time: $dR/dS=-1/(R_0 s)$ with $s=S/N$; integrate from $s=1,r=0$ to $s_\\infty,r_\\infty=1-s_\\infty$.`, math: String.raw`$\ln s_\infty=-R_0(1-s_\infty)\ \Longrightarrow\ s_\infty=e^{-R_0(1-s_\infty)}.$` },
      { title: 'Herd immunity', text: String.raw`$\\dot I<0$ whenever $s<1/R_0$; vaccinating a fraction $p$ reduces the initial $s$ to $1-p$.`, math: String.raw`$p_c=1-\frac1{R_0}.$` },
      { title: 'Numerical roots', text: String.raw`Solve by bisection for $R_0=3$ and $R_0=4$; the trivial root $s=1$ corresponds to no epidemic.`, math: String.raw`$R_0=3:\ s_\infty=0.0595202093;\qquad R_0=4:\ s_\infty=0.0198274013.$` },
    ],
    result: String.raw`The epidemic grows iff $R_0=\\beta/\\gamma>1$, peaks when $S/N=1/R_0$, and leaves susceptible fraction $s_\\infty$ solving $s=e^{-R_0(1-s)}$. For $\\beta=0.3$, $\\gamma=0.1$: $R_0=3$, doubling time $3.4657$ days, peak at $S=N/3$, $s_\\infty=0.05952$, attack rate $94.05\\%$.`,
    interpretation: String.raw`$R_0$ is a threshold parameter, not a growth rate: the growth rate is $\\gamma(R_0-1)$. The final size is less than $100\\%$ because susceptibles are depleted below $1/R_0$ before transmission stops — the epidemic burns itself out rather than infecting everyone.`,
    examples: [
      String.raw`$R_0=3$: $p_c=2/3$, $s_\\infty=0.0595202093$ (verified: $e^{-3(1-s)}=s$).`,
      String.raw`$R_0=4$: $p_c=3/4$, $s_\\infty=0.0198274013$, attack rate $98.02\\%$.`,
    ],
    applications: ['Outbreak forecasting and scenario planning', 'Vaccination threshold estimation', 'Evaluating interventions via effective $R_t$', 'Next-generation-matrix models for structured populations'],
    limitations: ['Homogeneous mixing ignores contact heterogeneity', 'Fixed $R_0$ ignores behaviour change and seasonality', 'No exposed or asymptomatic compartment', 'Herd-immunity formula assumes random vaccination'],
  },

  {
    id: 'p4-der-attention-matrix',
    title: 'Scaled dot-product attention as a differentiable matrix product',
    topicId: 'transformers-math',
    statement: String.raw`For $Q\in\mathbb{R}^{n\times d_k}$, $K\in\mathbb{R}^{m\times d_k}$, $V\in\mathbb{R}^{m\times d_v}$,
$$\mathrm{Attention}(Q,K,V)=\mathrm{softmax}_{\text{rows}}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right)V.$$
Each output row is a convex combination of value rows; the whole layer is a composition of matrix multiplications and a pointwise nonlinearity, hence differentiable.`,
    problem: String.raw`Derive the attention formula from a similarity-based dictionary lookup, explain the $1/\sqrt{d_k}$ scaling by variance analysis, prove permutation equivariance, derive the softmax Jacobian, and verify the algebra on a two-token example.`,
    assumptions: [
      'Query, key and value vectors share the key dimension $d_k$.',
      'Softmax is applied row-wise over keys.',
      'No causal mask (full self-attention); masking changes support but not the algebra.',
      'Key components are roughly independent with unit variance (motivates scaling).',
    ],
    variables: [
      { symbol: 'n,m', meaning: 'numbers of query and key/value tokens' },
      { symbol: 'A', meaning: 'logit matrix $QK^\\top/\\sqrt{d_k}$' },
      { symbol: 'S', meaning: 'row-stochastic attention matrix softmax(A)' },
      { symbol: 'd_k', meaning: 'key dimension controlling logit variance' },
    ],
    tools: ['matrix multiplication', 'softmax and its Jacobian', 'variance identities', 'permutation matrices'],
    steps: [
      { title: 'Similarity lookup', text: String.raw`Score query $q_i$ against key $k_j$ with a dot product; normalise across $j$ to obtain weights summing to 1.`, math: String.raw`$A_{ij}=\frac{q_i^\top k_j}{\sqrt{d_k}},\qquad S_{ij}=\frac{e^{A_{ij}}}{\sum_l e^{A_{il}}}.$` },
      { title: 'Variance argument', text: String.raw`If $q,k$ have independent unit-variance components then $\\mathrm{Var}(q^\\top k)=d_k$; dividing by $\\sqrt{d_k}$ restores unit-variance logits and prevents softmax saturation.`, math: String.raw`$\mathrm{Var}\left(\frac{q^\top k}{\sqrt{d_k}}\right)=1.$` },
      { title: 'Matrix form', text: String.raw`Stacking rows gives $A=QK^\\top/\\sqrt{d_k}$ and output $Y=SV$ — two matrix products with cost $O(nmd_k+nmd_v)$.`, math: String.raw`$Y=\mathrm{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right)V.$` },
      { title: 'Permutation equivariance', text: String.raw`For a permutation $P$, $PK=(PX)W_K$ and $(PX)(PK)^\\top=P XK^\\top P^\\top$; softmax commutes with row permutations.`, math: String.raw`$\mathrm{Attn}(PX,PK,PV)=P\,\mathrm{Attn}(X,K,V).$` },
      { title: 'Backward pass', text: String.raw`With $G=\\partial L/\\partial Y$, $\\partial L/\\partial S=GV^\\top$; the softmax Jacobian gives the logit gradient.`, math: String.raw`$\frac{\partial L}{\partial A_{ij}}=S_{ij}\left[(GV^\top)_{ij}-\sum_l S_{il}(GV^\top)_{il}\right].$` },
      { title: 'Toy verification', text: String.raw`With $d_k=2$, $Q=K=I_2$, $V=[[1,2],[3,4]]$: $A=\\mathrm{diag}(1/\\sqrt2)$, $a=e^{1/\\sqrt2}/(e^{1/\\sqrt2}+1)=0.66976155$, output rows $(1.66047690,2.66047690)$.`, math: String.raw`$a\cdot(1,2)+(1-a)\cdot(3,4)=(1.66047690,\,2.66047690).$` },
    ],
    result: String.raw`Attention is a differentiable, permutation-equivariant matrix computation with output $Y=\\mathrm{softmax}(QK^\\top/\\sqrt{d_k})V$; for the two-token toy input the output is $(1.66047690,2.66047690)$ in each row.`,
    interpretation: String.raw`The softmax matrix is a learned, content-dependent routing table: each row is a probability distribution over tokens. Positional encodings break permutation symmetry, causal masks enforce autoregression, and multiple heads let the model route different information in parallel subspaces.`,
    examples: [
      String.raw`Two-token example above: weights $(0.669762,0.330238)$ even for identical keys because the diagonal logit is $1/\\sqrt2$ and off-diagonal logits are $0$.`,
      String.raw`Without scaling ($d_k=100$), typical logits have standard deviation $10$, driving softmax into a nearly one-hot regime with vanishing gradients.`,
    ],
    applications: ['Language modelling and translation', 'Vision transformers', 'Protein structure prediction', 'Retrieval-augmented generation'],
    limitations: ['Quadratic memory and compute in sequence length', 'Softmax concentrates on a few keys', 'Permutation equivariance requires explicit positional information', 'Interpretability of attention weights remains debated'],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Problems: verified numerics, full worked solutions, and common pitfalls.
// ─────────────────────────────────────────────────────────────────────────────

export const P4_PROBLEMS: Problem[] = [
  {
    id: 'p4-prob-bisection-count',
    title: 'How many bisections for certified accuracy?',
    topicId: 'root-finding',
    level: 'Undergraduate 2',
    type: 'Computation',
    concepts: ['bisection', 'error bound', 'logarithms', 'bracketing'],
    statement: String.raw`The equation $f(x)=x^3-x-2=0$ has a root in $[1,2]$ because $f(1)=-2$ and $f(2)=4$. (a) Find the least number $n$ of bisections that guarantees absolute error below $10^{-10}$. (b) Give the certified error bound after that many steps. (c) State whether the same count works for any continuous $f$ with a sign change on $[1,2]$.`,
    hints: [
      String.raw`The interval length after $n$ steps is $2^{-n}$; the midpoint error is at most half that.`,
      String.raw`Solve $2^{-n}<10^{-10}$ by taking base-2 logarithms: $n>10\\log_2 10$.`,
      String.raw`Remember the ceiling function: the bound is strict, so an integer threshold matters.`,
    ],
    solution: [
      { title: 'Error bound', text: String.raw`Starting from $b_0-a_0=1$, after $n$ bisections the interval has length $2^{-n}$ and the midpoint is within $2^{-(n+1)}$ of any root inside it. Using the conservative bound $(b_0-a_0)/2^n$ gives the same order; we solve $(b-a)/2^n\le10^{-10}$.`, math: String.raw`$\frac{1}{2^n}\le 10^{-10}\iff n\ge\log_2(10^{10})=10\log_2 10\approx33.2193.$` },
      { title: 'Integer threshold', text: String.raw`Since $n$ must be an integer, $n=34$.`, math: String.raw`$2^{-34}=5.8207660913\times10^{-11}<10^{-10},\qquad 2^{-33}=1.1641532183\times10^{-10}>10^{-10}.$` },
      { title: 'General validity', text: String.raw`The bound depends only on the initial width and continuity plus a sign change (IVT), not on the shape of $f$; therefore the same count holds for every such $f$ on $[1,2]$.`, math: String.raw`$|x_n-x^*|\le\frac{b_0-a_0}{2^n}=\frac{1}{2^n}.$` },
    ],
    answer: String.raw`$n=34$ bisections; certified error $2^{-34}=5.8207660913\times10^{-11}$; yes, the count is universal for continuous functions with a sign change on $[1,2]$.`,
    alternatives: [String.raw`If one uses the midpoint-to-endpoint bound $2^{-(n+1)}$, then $n=33$ suffices: $2^{-34}<10^{-10}$. Both conventions appear in textbooks; state which one you use.`],
    mistakes: ['Forgetting the ceiling and reporting 33.2 iterations', 'Confusing interval length with midpoint error', 'Assuming the bound depends on the derivative (it does not)'],
    further: String.raw`Compare with Newton from $x_0=1.5$: three steps reach $1.5213797068$ (about 10 correct digits) after only three derivative evaluations, but without a certified bound.`,
  },

  {
    id: 'p4-prob-fixed-point-rate',
    title: 'A convergent fixed-point form for a cubic',
    topicId: 'root-finding',
    level: 'Undergraduate 3',
    type: 'Theoretical',
    concepts: ['fixed point', 'contraction mapping', 'linear convergence', 'error estimation'],
    statement: String.raw`Rewrite $x^3-x-2=0$ as $x=g(x)=(x+2)^{1/3}$. (a) Show $g$ maps $[1.5,2]$ into itself and is a contraction there. (b) Starting from $x_0=1.5$, compute six iterates. (c) Bound the error after six steps using the contraction constant, and compare with the true root $1.5213797068$.`,
    hints: [
      String.raw`$g'(x)=1/[3(x+2)^{2/3}]$ is positive and decreasing on $[1.5,2]$.`,
      String.raw`A contraction satisfies $|g(x)-g(y)|\le L|x-y|$ with $L=\\max|g'|<1$.`,
    ],
    solution: [
      { title: 'Self-map and contraction', text: String.raw`On $[1.5,2]$, $g$ increases, so $g([1.5,2])=[3.5^{1/3},4^{1/3}]=[1.51829,1.58740]\\subset[1.5,2]$. The derivative is largest at the left endpoint.`, math: String.raw`$L=g'(1.5)=\frac{1}{3(3.5)^{2/3}}=0.1445994749<1.$` },
      { title: 'Iterates', text: String.raw`Repeated application of $x_{k+1}=(x_k+2)^{1/3}$ from $1.5$:`, math: String.raw`$1.5,\ 1.518294486,\ 1.520935263,\ 1.521315698,\ 1.521370489,\ 1.521378379,\ 1.521379516.$` },
      { title: 'A priori error bound', text: String.raw`With $x^*=1.5213797068$, $|x_6-x^*|\\approx1.9\\times10^{-7}$. The contraction bound gives $|x_k-x^*|\\le L^k|x_0-x^*|\\le0.1446^6\\cdot0.022\\approx2.3\\times10^{-6}$, a valid but conservative estimate.`, math: String.raw`$|x_6-x^*|\le L^6|x_0-x^*|\approx(0.1446)^6(0.02138)\approx2.3\times10^{-6}.$` },
      { title: 'Convergence order', text: String.raw`Since $g'(x^*)=0.1440136\\neq0$, convergence is Q-linear with ratio about $0.144$: each step gains roughly $\\log_{10}(1/0.144)\\approx0.84$ digits, far slower than Newton's quadratic rate.`, math: String.raw`$\lim_{k\to\infty}\frac{|e_{k+1}|}{|e_k|}=g'(x^*)\approx0.1440.$` },
    ],
    answer: String.raw`$L=0.1445995$ on $[1.5,2]$; six iterates give $x_6=1.521379516$ with actual error $\\approx1.9\\times10^{-7}$ and certified bound $\\approx2.3\\times10^{-6}$; convergence is linear with ratio $0.1440$.`,
    alternatives: [String.raw`Other rearrangements such as $x=x^3-x+2+x$? no such rearrangement is contractive; $x=(2/(x+1))^{1/2}$? Check its derivative magnitude near the root before claiming convergence.`],
    mistakes: ['Using the derivative at the left endpoint as the exact asymptotic ratio (the limit uses $g\'(x^*)$)', 'Assuming every rearrangement converges', 'Reporting an error bound without the factor $|x_0-x^*|$'],
    further: String.raw`Show that the equivalent rearrangement $x=g(x)=x^3-2$ has $|g\'(x^*)|=3(x^*)^2\\approx6.94>1$ and diverges from nearby starts — a useful contrast.`,
  },

  {
    id: 'p4-prob-newton-sqrt',
    title: 'Newton computes square roots',
    topicId: 'newton-raphson',
    level: 'Undergraduate 3',
    type: 'Computation',
    concepts: ['Newton iteration', 'quadratic convergence', 'asymptotic error constant'],
    statement: String.raw`Apply Newton's method to $f(x)=x^2-7$ starting from $x_0=3$. (a) Derive the iteration in the Babylonian form $x_{n+1}=\tfrac12(x_n+7/x_n)$. (b) Compute $x_1,x_2,x_3$. (c) Predict and check the limiting ratio $|e_{n+1}|/|e_n|^2$, where $e_n=x_n-\sqrt7$.`,
    hints: [
      String.raw`Simplify $x-f(x)/f\'(x)$ algebraically before computing numbers.`,
      String.raw`The asymptotic constant is $|f\'\'(x^*)/(2f\'(x^*))|=1/(2\\sqrt7)$.`,
    ],
    solution: [
      { title: 'Iteration', text: String.raw`With $f\'(x)=2x$, $x_{n+1}=x_n-(x_n^2-7)/(2x_n)=\\tfrac12(x_n+7/x_n)$.`, math: String.raw`$x_{n+1}=\frac12\left(x_n+\frac{7}{x_n}\right).$` },
      { title: 'Numbers', text: String.raw`From $x_0=3$:`, math: String.raw`$x_1=\frac{3+7/3}{2}=2.6666666667,\quad x_2=2.6458333333,\quad x_3=2.6457513111.$` },
      { title: 'Error ratio', text: String.raw`Since $\\sqrt7=2.6457513110645907\\ldots$, $e_3\\approx3.6\\times10^{-11}$. The predicted ratio is`, math: String.raw`$C=\frac{1}{2\sqrt7}=0.1889822365\ldots,\qquad \frac{e_2}{e_1^2}\approx0.187,\quad \frac{e_3}{e_2^2}\approx0.189.$` },
      { title: 'Global caution', text: String.raw`The iteration fails for $x_0=0$ (division by zero) and is only locally convergent; for positive $x_0$ it in fact converges globally by AM–GM, but $x_0<0$ converges to $-\\sqrt7$.`, math: String.raw`$\frac12\left(x+\frac7x\right)\ge\sqrt7\quad\text{for }x>0.$` },
    ],
    answer: String.raw`$x_1=2.6666666667$, $x_2=2.6458333333$, $x_3=2.6457513111$; predicted ratio $C=1/(2\\sqrt7)=0.1889822365$, matching the observed ratios.`,
    mistakes: ['Using $f\'(x)=x^2$ instead of $2x$', 'Assuming quadratic convergence from the very first iterate', 'Forgetting that negative starts converge to the negative root'],
    further: String.raw`Explain why this iteration is quadratically convergent yet each step costs a division; compare with the digit-by-digit time complexity of long division.`,
  },

  {
    id: 'p4-prob-euler-error',
    title: 'First-order convergence and the stability of Euler',
    topicId: 'ode',
    level: 'Undergraduate 3',
    type: 'Derivation',
    concepts: ['Euler method', 'local truncation error', 'global error', 'absolute stability'],
    statement: String.raw`Consider $y'=-2y$, $y(0)=1$, whose exact solution at $t=1$ is $e^{-2}=0.1353352832$. (a) Show explicit Euler gives $y_N=(1-2h)^N$ with $N=1/h$. (b) Compute the values and errors for $h=0.1$ and $h=0.05$. (c) State the stability restriction and verify that $h=1.1$ fails qualitatively.`,
    hints: [
      String.raw`Each step multiplies by $1+h\\lambda=1-2h$; $N=1/h$ steps are needed.`,
      String.raw`The observed order is $\\log_2(E_{0.1}/E_{0.05})$.`,
    ],
    solution: [
      { title: 'Closed form', text: String.raw`Euler yields $y_{n+1}=(1-2h)y_n$, so after $N$ steps $y_N=(1-2h)^N$.`, math: String.raw`$y_N=(1-2h)^{1/h}.$` },
      { title: 'Error table', text: String.raw`For $h=0.1$: $(0.8)^{10}=0.1073741824$, error $0.0279611008$. For $h=0.05$: $(0.9)^{20}=0.1215766546$, error $0.0137586286$.`, math: String.raw`$E_{0.1}=2.79611008\times10^{-2},\qquad E_{0.05}=1.37586286\times10^{-2}.$` },
      { title: 'Observed order', text: String.raw`The error ratio is about $2.0323$ for a halved step, giving $p=\\log_2(2.0323)\\approx1.023\\approx1$, consistent with the theorem.`, math: String.raw`$p=\log_2\frac{E_{0.1}}{E_{0.05}}\approx1.02.$` },
      { title: 'Stability', text: String.raw`Boundedness requires $|1-2h|\\le1$, i.e. $h\\le1$. For $h=1.1$ the factor is $-1.2$ and the solution oscillates with growing amplitude; for $h=1$ it oscillates $\\pm1$ forever although the exact solution decays.`, math: String.raw`$|R|=|1-2h|\le1\iff0<h\le1.$` },
    ],
    answer: String.raw`$y_{0.1}=0.1073741824$ (error $2.80\\times10^{-2}$); $y_{0.05}=0.1215766546$ (error $1.38\\times10^{-2}$); observed order $\\approx1$; stability requires $h\\le1$, and $h=1.1$ diverges.`,
    mistakes: ['Taking $N=1/h$ as a non-integer', 'Confusing the local error $O(h^2)$ with global error $O(h)$', 'Believing smaller $h$ always helps when the method is already unstable'],
    further: String.raw`Repeat with backward Euler $y_{n+1}=y_n/(1+2h)$: it is stable for all $h>0$ but badly underdamps large steps — stability is not accuracy.`,
  },

  {
    id: 'p4-prob-heat-decay',
    title: 'How long until a hot spot cools?',
    topicId: 'heat-equation',
    level: 'Undergraduate 3',
    type: 'Application',
    concepts: ['heat equation', 'Fourier mode', 'exponential decay', 'separation of variables'],
    statement: String.raw`A rod of length $L=2$ with diffusivity $\\alpha=0.5$ has ends held at zero temperature and initial temperature $u(x,0)=10\\sin(\\pi x/2)$. (a) Write $u(x,t)$. (b) Find the time at which the temperature at $x=1$ falls below $1$ (i.e. below $10\\%$ of its initial value). (c) Explain qualitatively what happens if the initial profile is a sharp spike instead.`,
    hints: [
      String.raw`The initial data is already a single eigenmode: $n=1$ with $\\lambda_1=(\\pi/L)^2$.`,
      String.raw`Solve $e^{-\\alpha\\lambda_1 t}=0.1$ using logarithms.`,
    ],
    solution: [
      { title: 'Solution', text: String.raw`With $L=2$, $\\lambda_1=(\\pi/2)^2=\\pi^2/4\\approx2.4674$; the amplitude decays as $\\exp(-0.5\\cdot2.4674\\,t)$.`, math: String.raw`$u(x,t)=10\sin\frac{\pi x}{2}\,e^{-(\pi^2/8)t},\qquad u(1,t)=10e^{-(\pi^2/8)t}.$` },
      { title: 'Decay time', text: String.raw`Set $10e^{-(\\pi^2/8)t}=1$, so $t=\\ln10/(\\pi^2/8)$.`, math: String.raw`$t=\frac{8\ln10}{\pi^2}=\frac{18.42068}{9.86960}=1.86641\ \text{time units}.$` },
      { title: 'Sharp spike', text: String.raw`A spike requires many sine modes: mode $n$ decays as $\\exp[-\\alpha(n\\pi/L)^2t]$, i.e. $n^2$ times faster than $n=1$. The fine structure disappears almost immediately, leaving the slow fundamental mode; this is diffusion as a low-pass filter.`, math: String.raw`$\frac{\text{rate}_n}{\text{rate}_1}=n^2.$` },
    ],
    answer: String.raw`$u(x,t)=10\\sin(\\pi x/2)e^{-(\\pi^2/8)t}$; the centre cools below $1$ after $t=8\\ln10/\\pi^2\\approx1.86641$; a spike loses its high-frequency structure much faster than the fundamental decays.`,
    mistakes: ['Using $e^{-\\alpha\\pi^2t}$ with the wrong length $L$', 'Forgetting the $n^2$ factor in mode decay', 'Treating the spike as a single-mode initial condition'],
    further: String.raw`For Neumann insulation $u_x=0$ at both ends, the eigenbasis is $\\cos(n\\pi x/L)$ including $n=0$; the mean temperature then persists forever instead of decaying to zero.`,
  },

  {
    id: 'p4-prob-gd-rate',
    title: 'Gradient descent rate on an anisotropic quadratic',
    topicId: 'gradient-descent',
    level: 'Master’s',
    type: 'Multi-step',
    concepts: ['gradient descent', 'condition number', 'linear convergence', 'step size'],
    statement: String.raw`Let $f(x,y)=x^2+5y^2$ and start from $(10,4)$ with step size $\\eta=0.1$. (a) Give the coordinate recursions. (b) Compute $(x_5,y_5)$ and $f(x_5,y_5)$. (c) How many iterations are needed to reduce $f$ below $10^{-6}f(0)$? (d) State the theoretical bound from strong convexity and compare.`,
    hints: [
      String.raw`$\\nabla f=(2x,10y)$; each coordinate multiplies by $1-2\\eta$ or $1-10\\eta$.`,
      String.raw`The dominant decay factor in the objective is $0.8^2=0.64$.`,
    ],
    solution: [
      { title: 'Recursions', text: String.raw`The updates decouple: $x_{k+1}=(1-0.2)x_k=0.8x_k$, $y_{k+1}=(1-1)y_k=0.5y_k$.`, math: String.raw`$x_k=10(0.8)^k,\qquad y_k=4(0.5)^k.$` },
      { title: 'After five steps', text: String.raw`$(x_5,y_5)=(3.2768,0.125)$ and the objective is`, math: String.raw`$f_5=3.2768^2+5(0.125)^2=10.73741824+0.078125=10.81554324.$` },
      { title: 'Iteration count', text: String.raw`The exact objective is $f_k=100(0.64)^k+80(0.25)^k$. Requiring $(0.64)^k\\le10^{-6}$ gives`, math: String.raw`$k\ge\frac{\ln10^{-6}}{\ln0.64}=30.9566\ \Longrightarrow\ k=31.$` },
      { title: 'Theory versus reality', text: String.raw`Here $\\mu=2$, $L=10$, so the general bound $f_k\\le(1-\\mu/L)^k f_0=0.8^k f_0$ requires $k\\ge\\ln10^{-6}/\\ln0.8\\approx62$. The exact quadratic analysis ($0.64^k$) is tighter because the step $1/L$ gives per-coordinate contraction $0.8$ and $0.5$.`, math: String.raw`$1-\mu/L=0.8\quad\text{vs}\quad\max(0.8^2,0.5^2)=0.64.$` },
    ],
    answer: String.raw`$x_k=10(0.8)^k$, $y_k=4(0.5)^k$; $(x_5,y_5)=(3.2768,0.125)$, $f_5=10.81554324$; at least 31 iterations for $f\\le10^{-6}f_0$; the generic strong-convexity bound is looser (about 62 steps).`,
    mistakes: ['Using $1-\\mu/L$ as the exact per-step factor for a specific quadratic', 'Forgetting that the objective involves squared coordinates', 'Choosing $\\eta>2/L=0.2$, which diverges in $y$'],
    further: String.raw`Show that preconditioning with $P=\\mathrm{diag}(1/2,1/10)$ makes the transformed Hessian the identity, so steepest descent converges in one step.`,
  },

  {
    id: 'p4-prob-kkt',
    title: 'Solve a constrained quadratic with KKT',
    topicId: 'convex-optimization',
    level: 'Undergraduate 3',
    type: 'Proof',
    concepts: ['KKT conditions', 'convexity', 'duality', 'sensitivity'],
    statement: String.raw`Solve $\\min_{x,y} x^2+2y^2$ subject to $x+y=3$. (a) Write the Lagrangian and KKT system. (b) Find the minimiser and multiplier. (c) Compute the value function $V(c)=\\min\\{x^2+2y^2:x+y=c\\}$ and verify $V\'(3)$ equals the multiplier. (d) Justify global optimality.`,
    hints: [
      String.raw`Stationarity gives $2x=\\nu$ and $4y=\\nu$.`,
      String.raw`With $x=2y$ and $x+y=c$, solve directly for $y$.`,
    ],
    solution: [
      { title: 'Lagrangian', text: String.raw`$\\mathcal L=x^2+2y^2-\\nu(x+y-3)$; stationarity and feasibility give the KKT system.`, math: String.raw`$2x-\nu=0,\quad4y-\nu=0,\quad x+y=3.$` },
      { title: 'Solution', text: String.raw`From $2x=4y$, $x=2y$; with $x+y=3$, $y=1$ and $x=2$. Then $\\nu=4$ and $f=4+2=6$.`, math: String.raw`$(x^*,y^*)=(2,1),\quad \nu^*=4,\quad f^*=6.$` },
      { title: 'Sensitivity', text: String.raw`For general $c$: $y=c/3$, $x=2c/3$, so $V(c)=4c^2/9+2c^2/9=2c^2/3$ and $V\'(3)=4=\\nu^*$.`, math: String.raw`$V(c)=\frac{2c^2}{3},\qquad V'(c)=\frac{4c}{3},\qquad V'(3)=4.$` },
      { title: 'Global optimality', text: String.raw`The Hessian $\\mathrm{diag}(2,4)\\succ0$ makes $f$ strictly convex and the constraint affine; the KKT point is the unique global minimiser. Equivalently, the dual $q(\\nu)=\\inf_{x,y}[x^2+2y^2-\\nu(x+y-3)]=3\\nu-9\\nu^2/8$ attains its maximum at $\\nu=4$ with value $6$.`, math: String.raw`$q(\nu)=3\nu-\frac{9\nu^2}{8},\quad q(4)=6=f^*.$` },
    ],
    answer: String.raw`$(x^*,y^*)=(2,1)$, $\\nu^*=4$, minimum value $6$; $V(c)=2c^2/3$ and $V\'(3)=4$, matching the multiplier; strict convexity guarantees global optimality.`,
    mistakes: ['Taking the multiplier with the wrong sign', 'Assuming KKT suffices for a nonconvex problem', 'Confusing the constraint right-hand side $c$ with the multiplier'],
    further: String.raw`Add $y\\ge0$ as an inequality constraint and determine whether it is active; repeat with $y\\ge2$ and verify complementary slackness.`,
  },

  {
    id: 'p4-prob-shannon',
    title: 'Entropy of a four-outcome source',
    topicId: 'shannon-entropy',
    level: 'Undergraduate 2',
    type: 'Computation',
    concepts: ['Shannon entropy', 'bits', 'uniform maximum', 'Huffman coding'],
    statement: String.raw`A source emits symbols with probabilities $(\\tfrac13,\\tfrac13,\\tfrac16,\\tfrac16)$. (a) Compute $H$ in bits to six decimals. (b) Compare with the maximum possible entropy over four symbols. (c) A prefix code has lengths $(1,2,3,3)$ assigned to the four symbols in order; verify Kraft and compute its expected length.`,
    hints: [
      String.raw`Use $\\log_2 3=1.5849625$ and $\\log_2 6=2.5849625$.`,
      String.raw`Kraft: $\\sum 2^{-\\ell_i}\\le1$ for a prefix code.`,
    ],
    solution: [
      { title: 'Entropy', text: String.raw`Group equal probabilities: two symbols have probability $1/3$, two have $1/6$.`, math: String.raw`$H=2\cdot\frac13\log_2 3+2\cdot\frac16\log_2 6=\frac23(1.5849625)+\frac13(2.5849625)=1.9182958341.$` },
      { title: 'Maximum', text: String.raw`With four outcomes, $H\\le\\log_2 4=2$ bits with equality only for the uniform distribution; the given source is 0.0817 bits short of maximum.`, math: String.raw`$2-1.9182958341=0.0817041659\ \text{bits}.$` },
      { title: 'Code check', text: String.raw`Kraft sum: $2^{-1}+2^{-2}+2^{-3}+2^{-3}=0.5+0.25+0.125+0.125=1$, so the lengths are feasible. Expected length:`, math: String.raw`$L=\frac13(1)+\frac13(2)+\frac16(3)+\frac16(3)=\frac13+\frac23+\frac12+\frac12=2.0\ \text{bits}.$` },
      { title: 'Comparison', text: String.raw`$L-H=0.0817041659$ bits, within the guaranteed $H\\le L<H+1$; a better code could use lengths $(2,2,2,2)$ giving $L=2$ as well, but no code can beat $H$.`, math: String.raw`$H\le L < H+1.$` },
    ],
    answer: String.raw`$H=1.9182958341$ bits; maximum $2$ bits; Kraft sum $=1$; expected code length $L=2.0$ bits, exceeding $H$ by $0.0817$ bits.`,
    mistakes: ['Using natural logs but reporting bits', 'Treating $0\\log0$ as undefined instead of $0$', 'Assuming the given code is optimal because Kraft holds with equality'],
    further: String.raw`Find a dyadic approximation with probabilities $(1/2,1/4,1/8,1/8)$ and show Huffman coding attains $H$ exactly.`,
  },

  {
    id: 'p4-prob-nash',
    title: 'Pure and mixed equilibria of a 2×2 game',
    topicId: 'nash-equilibrium',
    level: 'Undergraduate 3',
    type: 'Multi-step',
    concepts: ['best response', 'mixed strategy', 'indifference principle', 'Nash equilibrium'],
    statement: String.raw`The row player's payoffs (rows Up/Down, columns Left/Right) are $A=\begin{pmatrix}3&1\\0&2\end{pmatrix}$ and the column player's are $B=\begin{pmatrix}2&0\\1&3\end{pmatrix}$. (a) Find all pure Nash equilibria. (b) Let $q$ be the probability the column player chooses Left and $p$ the probability the row player chooses Up; use indifference to find the mixed equilibrium. (c) Compute each player's expected payoff there.`,
    hints: [
      String.raw`Underline row-maxima in each column and column-maxima in each row.`,
      String.raw`Row's payoff from Up is $3q+1(1-q)$; from Down it is $0q+2(1-q)$.`,
    ],
    solution: [
      { title: 'Pure equilibria', text: String.raw`If column plays Left, row prefers Up ($3>0$); if column plays Right, row prefers Down ($2>1$). If row plays Up, column prefers Left ($2>0$); if row plays Down, column prefers Right ($3>1$). Hence two pure equilibria.`, math: String.raw`$(U,L)\ \text{and}\ (D,R)$ are pure NE.` },
      { title: 'Indifference', text: String.raw`For the row player to mix, $1+2q=2-2q$, so $q=1/4$. For the column player, payoff from Left is $2p$ and from Right is $3(1-p)$; equating gives $p=3/5$.`, math: String.raw`$q^*=\frac14,\qquad p^*=\frac35.$` },
      { title: 'Payoffs', text: String.raw`At the mixed profile, the row player's expected payoff is $1+2(1/4)=1.5$; the column player's is $2(3/5)=1.2$.`, math: String.raw`$u_1=\frac32,\qquad u_2=\frac65=1.2.$` },
      { title: 'Verification', text: String.raw`Both players are indifferent across their supports, so neither can gain by deviating; Nash's theorem guarantees at least one equilibrium and we have found three in total.`, math: String.raw`$u_1(U,q^*)=u_1(D,q^*)=1.5,\quad u_2(p^*,L)=u_2(p^*,R)=1.2.$` },
    ],
    answer: String.raw`Pure NE $(U,L)$ and $(D,R)$; mixed NE with row playing Up with probability $3/5$ and column playing Left with probability $1/4$; payoffs $(1.5,1.2)$ at the mixed equilibrium.`,
    alternatives: [String.raw`Check degenerate cases: if any indifference equation has a solution outside $[0,1]$, the corresponding player uses a pure strategy instead.`],
    mistakes: ['Equating the wrong player\'s payoffs to find the other\'s mixing probability', 'Assuming a 2×2 game has a unique equilibrium', 'Reporting the mixed equilibrium payoffs as $(3,3)$ or other pure-outcome values'],
    further: String.raw`Verify that $(U,L)$ gives payoffs $(3,2)$ and $(D,R)$ gives $(2,3)$, then discuss which pure equilibrium is payoff-dominant and why the mixed equilibrium yields lower payoffs for both players.`,
  },

  {
    id: 'p4-prob-bs',
    title: 'Price a put with Black–Scholes and verify parity',
    topicId: 'black-scholes',
    level: 'Master’s',
    type: 'Computation',
    concepts: ['Black–Scholes formula', 'normal CDF', 'put–call parity', 'Greeks'],
    statement: String.raw`Let $S=50$, $K=52$, $r=0.03$, $\\sigma=0.25$, $T=0.5$ years. (a) Compute $d_1,d_2$ and $N(d_1),N(d_2)$ to eight decimals. (b) Compute the European call price $C$ and put price $P$ by put–call parity. (c) Compute delta and gamma of the call.`,
    hints: [
      String.raw`$\\sigma\\sqrt T=0.25\\sqrt{0.5}\\approx0.1767767$.`,
      String.raw`$\\Gamma=\\varphi(d_1)/(S\\sigma\\sqrt T)$, where $\\varphi$ is the standard normal density.`,
    ],
    solution: [
      { title: 'Arguments', text: String.raw`With $\\ln(S/K)=\\ln(50/52)=-0.0392207$ and $(r+\\sigma^2/2)T=(0.03+0.03125)(0.5)=0.030625$,`, math: String.raw`$d_1=\frac{-0.0392207+0.030625}{0.1767767}=-0.04862470,\quad d_2=d_1-0.1767767=-0.22540139.$` },
      { title: 'Probabilities and price', text: String.raw`From the standard normal CDF: $N(d_1)=0.48060919$, $N(d_2)=0.41083351$.`, math: String.raw`$C=50(0.48060919)-52e^{-0.015}(0.41083351)=24.0304595-21.045284=2.98517569.$` },
      { title: 'Put by parity', text: String.raw` $P=C-S+Ke^{-rT}=2.98517569-50+51.225963=4.21113869$.`, math: String.raw`$P=4.21113869.$` },
      { title: 'Greeks', text: String.raw`$\\Delta=N(d_1)=0.48060919$; $\\varphi(d_1)=0.3989423e^{-d_1^2/2}=0.3980627$, so`, math: String.raw`$\Gamma=\frac{0.3980627}{50(0.25)\sqrt{0.5}}=0.0450291.$` },
    ],
    answer: String.raw`$d_1=-0.04862470$, $d_2=-0.22540139$, $N(d_1)=0.48060919$, $N(d_2)=0.41083351$, $C=2.98517569$, $P=4.21113869$, $\\Delta=0.48060919$, $\\Gamma=0.0450291$.`,
    mistakes: ['Using calendar time instead of year fractions', 'Forgetting the discount factor on the strike', 'Assuming put and call prices are equal at-the-money forward'],
    further: String.raw`Check numerically that the Black–Scholes call satisfies the PDE $V_t+\\tfrac12\\sigma^2S^2V_{SS}+rSV_S-rV=0$ by computing the derivatives symbolically.`,
  },

  {
    id: 'p4-prob-sir-threshold',
    title: 'Epidemic threshold and final size',
    topicId: 'epidemiological-models',
    level: 'Undergraduate 2',
    type: 'Application',
    concepts: ['SIR model', 'basic reproduction number', 'herd immunity', 'final-size equation'],
    statement: String.raw`In an SIR model with $\\beta=0.4$ per day and infectious period $5$ days, (a) compute $R_0$, (b) the initial doubling time, (c) the herd-immunity threshold, and (d) the final susceptible fraction $s_\\infty$ by solving $s=e^{-R_0(1-s)}$ numerically to six decimals.`,
    hints: [
      String.raw`$\\gamma=1/5=0.2$ per day and $R_0=\\beta/\\gamma$.`,
      String.raw`Bisection on $F(s)=e^{-4(1-s)}-s$ over $(0,1)$; discard the trivial root $s=1$.`,
    ],
    solution: [
      { title: 'Reproduction number', text: String.raw`$\\gamma=0.2$, so $R_0=0.4/0.2=4$ and the initial exponential growth rate is $\\gamma(R_0-1)=0.6$ per day.`, math: String.raw`$R_0=4,\qquad T_d=\frac{\ln2}{0.6}=1.155245\ \text{days}.$` },
      { title: 'Herd immunity', text: String.raw`Transmission cannot be sustained once $s<1/R_0$, so the critical immunised fraction is $1-1/4=0.75$.`, math: String.raw`$p_c=\frac34=0.75.$` },
      { title: 'Final size', text: String.raw`Solving $s=e^{-4(1-s)}$ on $(0,1)$ by bisection gives the non-trivial root.`, math: String.raw`$s_\infty=0.0198274013\ldots,\qquad e^{-4(1-0.0198274013)}=0.0198274013\ \checkmark.$` },
      { title: 'Interpretation', text: String.raw`The epidemic infects about $98.02\\%$ of the population even though $R_t<1$ at the peak; it stops when susceptible depletion, not interventions, drives transmission below replacement.`, math: String.raw`$1-s_\infty=0.9801725987.$` },
    ],
    answer: String.raw`$R_0=4$; doubling time $1.155245$ days; herd-immunity threshold $0.75$; $s_\\infty=0.019827$ (attack rate $98.02\\%$).`,
    mistakes: ['Using the infectious period instead of its reciprocal for $\\gamma$', 'Confusing $R_0$ with the growth rate', 'Reporting the trivial root $s=1$ as the epidemic outcome'],
    further: String.raw`Derive the peak infected fraction numerically by integrating the ODE and check $S/N=1/R_0=0.25$ at the peak.`,
  },

  {
    id: 'p4-prob-rh-classify',
    title: 'Theorem, conjecture, or numerical evidence?',
    topicId: 'riemann-hypothesis-frontier',
    level: 'Doctoral',
    type: 'Research challenge',
    concepts: ['Riemann hypothesis', 'prime number theorem', 'critical line', 'research integrity'],
    statement: String.raw`Classify each statement as (T) proved theorem, (C) open conjecture, or (N) numerical evidence. Explain one-sentence justifications. (a) $\\zeta(s)$ has a pole only at $s=1$. (b) All nontrivial zeros have $\\Re s=1/2$. (c) Infinitely many zeros lie on $\\Re s=1/2$. (d) At least $2/5$ of zeros lie on the critical line. (e) The first $10^{13}$ zeros lie on the critical line. (f) $\\pi(x)=\\mathrm{Li}(x)+O(\\sqrt x\\log x)$.`,
    hints: [
      String.raw`Separate what has a published proof from what has only been checked for finitely many cases.`,
      String.raw`At least $2/5$ is a theorem about a limiting proportion, not about all zeros.`,
    ],
    solution: [
      { title: 'Classification', text: String.raw`Assign each label with its precise meaning.`, math: String.raw`$(a)\ T,\quad(b)\ C,\quad(c)\ T,\quad(d)\ T,\quad(e)\ N,\quad(f)\ C.$` },
      { title: 'Justifications', text: String.raw`(a) Riemann's analytic continuation gives a single simple pole at $s=1$. (b) This is the Riemann hypothesis itself — open. (c) Hardy (1914) proved infinitely many zeros on the critical line. (d) Conrey (1989) proved a lower density $\\ge2/5$. (e) Large computations verify finitely many zeroes — evidence, not proof. (f) This error term is equivalent to RH and is unproved.`, math: String.raw`$\text{RH}\iff\pi(x)=\mathrm{Li}(x)+O(\sqrt x\log x).$` },
      { title: 'Distinctions', text: String.raw`A density result allows a zero-density exceptional set; a finite computation cannot exclude a counterexample at larger height. The prime number theorem $\\pi(x)\\sim x/\\log x$ is proved, but its sharp error term is not.`, math: String.raw`$N_0(T)/N(T)\ge\tfrac25-o(1)\quad\text{(proved)}\\not\\Rightarrow\\ N_0(T)=N(T).$` },
    ],
    answer: String.raw`(a) T; (b) C (open); (c) T (Hardy 1914); (d) T (Conrey 1989); (e) N (numerical evidence); (f) C (equivalent to RH, unproved).`,
    alternatives: [String.raw`Some sources quote improved density constants beyond $2/5$; the classification is unchanged because any fixed proportion is strictly weaker than "all".`],
    mistakes: ['Treating numerical verification as a proof', 'Believing the $2/5$ theorem settles RH', 'Calling the prime number theorem an open problem'],
    further: String.raw`Research direction: the Hilbert–Pólya programme seeks a self-adjoint operator whose spectrum matches the zeros; no such operator with the required properties has been established.`,
  },
]
