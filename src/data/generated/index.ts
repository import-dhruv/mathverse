// Deterministic generated problem families. Nothing is stored as thousands of
// static strings: each id encodes a family and an index, and the problem is
// rebuilt on demand from verified formulas. 40 families × 500 = 20,000.
import type { GeneratedFamily, GeneratedProblem } from './types'
import { seeded } from '../../components/sim/useCanvas'

const pick = (i: number, k: number, min: number, max: number) => min + Math.floor(seeded(i * 131 + k * 977) * (max - min + 1))
const fx = (n: number) => Number.isInteger(n) ? String(n) : n.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')
const sol = (title: string, text: string, math?: string) => ({ title, text, math })
const round = (x: number, d = 4) => Number(x.toFixed(d))
const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : Math.abs(a)
const isPrime = (n: number) => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true }

export const GENERATED_FAMILIES: GeneratedFamily[] = [
  { id: 'add-int', title: 'Adding integers', topicId: 'integers', level: 'School', type: 'Computation', concepts: ['integers', 'addition'],
    make: i => { const a = pick(i,1,-99,99), b = pick(i,2,-99,99); return { statement: `Compute ${a} + ${b}.`, hints: ['Add signs first: same signs add magnitudes; opposite signs subtract.'], answer: String(a+b), solution: [sol('Add', `${a} + ${b} = ${a+b}.`)] } } },
  { id: 'mul-int', title: 'Multiplying integers', topicId: 'integers', level: 'School', type: 'Computation', concepts: ['integers', 'multiplication'],
    make: i => { const a = pick(i,1,-20,20), b = pick(i,2,-20,20); return { statement: `Compute ${a} × ${b}.`, hints: ['A negative times a negative is positive.'], answer: String(a*b), solution: [sol('Multiply', `${a} × ${b} = ${a*b}.`)] } } },
  { id: 'gcd-lcm', title: 'GCD and LCM', topicId: 'gcd-lcm', level: 'School', type: 'Computation', concepts: ['divisibility', 'gcd', 'lcm'],
    make: i => { const a = pick(i,1,4,90), b = pick(i,2,4,90), g = gcd(a,b), l = a*b/g; return { statement: `Find gcd and lcm of ${a} and ${b}.`, hints: ['Use the Euclidean algorithm for gcd.', 'lcm(a,b)·gcd(a,b) = ab.'], answer: `gcd = ${g}, lcm = ${l}`, solution: [sol('Euclidean algorithm', `${a} = ${b}·${Math.floor(a/b)} + ${a%b}; continue until remainder 0.`, String.raw`$\gcd(a,b)\cdot\operatorname{lcm}(a,b)=ab$`), sol('Result', `gcd = ${g} and lcm = ${l}.`)] } } },
  { id: 'mod-exp', title: 'Modular exponentiation', topicId: 'modular-arithmetic', level: 'Pre-university', type: 'Computation', concepts: ['congruences', 'powers'],
    make: i => { const m = pick(i,1,7,30), a = pick(i,2,2,m-1), e = pick(i,3,2,8); let r = 1; for (let k=0;k<e;k++) r = r*a % m; return { statement: `Compute ${a}^${e} mod ${m}.`, hints: ['Repeatedly reduce modulo m after each multiplication.'], answer: String(r), solution: [sol('Repeated squaring', `Reduce after each multiply: final residue ${r}.`, String.raw`$a^{e}\bmod m$`)] } } },
  { id: 'prime-test', title: 'Primality testing', topicId: 'prime-numbers', level: 'School', type: 'Conceptual', concepts: ['primes', 'divisibility'],
    make: i => { const n = pick(i,1,2,200), p = isPrime(n); return { statement: `Is ${n} prime? Justify.`, hints: ['Test divisors up to √n.'], answer: p ? 'Prime' : 'Composite', solution: [sol('Test divisors', p ? `No divisor d with 2 ≤ d ≤ √${n} divides ${n}.` : `${n} factors nontrivially.`, p ? '' : `${n} = ${(() => { for(let d=2;d*d<=n;d++) if(n%d===0) return d+' × '+(n/d); return '' })()}`)] } } },
  { id: 'fraction-add', title: 'Adding fractions', topicId: 'fractions', level: 'School', type: 'Computation', concepts: ['fractions', 'common denominator'],
    make: i => { const a=pick(i,1,1,12), b=pick(i,2,2,12), c=pick(i,3,1,12), d=pick(i,4,2,12); const num=a*d+c*b, den=b*d, g=gcd(num,den); return { statement: `Compute ${a}/${b} + ${c}/${d}; simplify.`, hints: ['Use common denominator bd.', 'Reduce by gcd.'], answer: `${num/g}/${den/g}`, solution: [sol('Common denominator', `${a}·${d} + ${c}·${b} = ${num}, denominator ${den}.`), sol('Simplify', `Divide by ${g}: ${num/g}/${den/g}.`)] } } },
  { id: 'percent', title: 'Percentages', topicId: 'percentages', level: 'School', type: 'Application', concepts: ['percent', 'ratio'],
    make: i => { const p=pick(i,1,5,95), n=pick(i,2,20,2000); const v=round(n*p/100,2); return { statement: `Find ${p}% of ${n}.`, hints: ['Convert percent to a decimal multiplier.'], answer: String(v), solution: [sol('Convert', `${p}% = ${p/100}, so ${p/100} × ${n} = ${v}.`)] } } },
  { id: 'linear-eq', title: 'Linear equations', topicId: 'linear-equations', level: 'School', type: 'Computation', concepts: ['linear equations'],
    make: i => { const a=pick(i,1,2,12), x=pick(i,2,-9,9), b=pick(i,3,-15,15), c=a*x+b; return { statement: `Solve ${a}x ${b<0?'−':'+'} ${Math.abs(b)} = ${c}.`, hints: ['Isolate x by subtracting b then dividing by a.'], answer: `x = ${x}`, solution: [sol('Isolate', `${a}x = ${c} − (${b}) = ${a*x}, hence x = ${x}.`)] } } },
  { id: 'quad-roots', title: 'Quadratic roots by factorisation', topicId: 'quadratic-equations', level: 'Pre-university', type: 'Computation', concepts: ['quadratics', 'factorisation'],
    make: i => { const r1=pick(i,1,-9,9), r2=pick(i,2,-9,9), B=-(r1+r2), C=r1*r2; return { statement: `Solve x² ${B<0?'−':'+'} ${Math.abs(B)}x ${C<0?'−':'+'} ${Math.abs(C)} = 0.`, hints: ['Find two integers with sum '+(-B)+' and product '+C+'.'], answer: `x = ${r1}, ${r2}`, solution: [sol('Factor', `(x − (${r1}))(x − (${r2})) = 0.`), sol('Roots', `x = ${r1} or x = ${r2}.`)] } } },
  { id: 'exp-laws', title: 'Exponent laws', topicId: 'exponents-powers', level: 'School', type: 'Computation', concepts: ['exponents'],
    make: i => { const a=pick(i,1,2,6), m=pick(i,2,2,5), n=pick(i,3,2,5); return { statement: `Simplify ${a}^${m} × ${a}^${n}.`, hints: ['Add exponents when multiplying like bases.'], answer: `${a}^${m+n} = ${a**(m+n)}`, solution: [sol('Product rule', `${a}^${m}·${a}^${n} = ${a}^${m+n}.`, String.raw`$a^m a^n=a^{m+n}$`)] } } },
  { id: 'log-eval', title: 'Evaluating logarithms', topicId: 'logarithms', level: 'Pre-university', type: 'Computation', concepts: ['logarithms'],
    make: i => { const b=pick(i,1,2,6), e=pick(i,2,2,6); return { statement: `Evaluate log_${b}(${b**e}).`, hints: ['log_b(b^k) = k.'], answer: String(e), solution: [sol('Inverse property', `log_${b}(${b**e}) = ${e}.`, String.raw`$\log_b(b^k)=k$`)] } } },
  { id: 'deriv-power', title: 'Derivative of a power', topicId: 'derivatives', level: 'Undergraduate 1', type: 'Computation', concepts: ['differentiation', 'power rule'],
    make: i => { const n=pick(i,1,2,9), a=pick(i,2,1,7); return { statement: `Differentiate ${a}x^${n} with respect to x.`, hints: ['Bring down the exponent and reduce it by one.'], answer: `${a*n}x^${n-1}`, solution: [sol('Power rule', `d/dx(${a}x^${n}) = ${a}·${n}x^${n-1}.`, String.raw`$\frac{d}{dx}ax^{n}=anx^{n-1}$`)] } } },
  { id: 'deriv-product', title: 'Derivative of a product at a point', topicId: 'product-rule', level: 'Undergraduate 1', type: 'Computation', concepts: ['product rule'],
    make: i => { const a=pick(i,1,1,5), b=pick(i,2,-5,5), c=pick(i,3,1,5), d=pick(i,4,-5,5), x0=pick(i,5,-3,3); const val=2*a*c*x0 + a*d + b*c; return { statement: `Find f′(${x0}) for f(x) = (${a}x + (${b}))(${c}x + (${d})).`, hints: ['Expand first or use f′ = g′h + gh′.'], answer: String(val), solution: [sol('Expand', `f(x) = ${a*c}x² + (${a*d+b*c})x + ${b*d}.`), sol('Differentiate', `f′(${x0}) = 2·${a*c}·${x0} + ${a*d+b*c} = ${val}.`)] } } },
  { id: 'limit-factor', title: 'Limit by factoring', topicId: 'limits', level: 'Undergraduate 1', type: 'Computation', concepts: ['limits', 'factorisation'],
    make: i => { const a=pick(i,1,1,9); return { statement: `Evaluate lim_{x→${a}} (x² − ${a*a})/(x − ${a}).`, hints: ['Factor the numerator as (x−a)(x+a).'], answer: String(2*a), solution: [sol('Cancel', `(x² − ${a*a})/(x − ${a}) = x + ${a} for x ≠ ${a}.`), sol('Limit', `Limit = ${a} + ${a} = ${2*a}.`)] } } },
  { id: 'integral-power', title: 'Indefinite integral of a power', topicId: 'antiderivatives', level: 'Undergraduate 1', type: 'Computation', concepts: ['integration', 'power rule'],
    make: i => { const n=pick(i,1,1,9), a=pick(i,2,1,6); return { statement: `Evaluate ∫ ${a}x^${n} dx.`, hints: ['Increase exponent by one and divide by the new exponent.'], answer: `${fx(a/(n+1))}x^${n+1} + C`, solution: [sol('Power rule for integrals', `∫ ${a}x^${n} dx = ${fx(a/(n+1))}x^${n+1} + C.`, String.raw`$\int x^n dx=\frac{x^{n+1}}{n+1}+C$`)] } } },
  { id: 'definite-square', title: 'Definite integral of x²', topicId: 'definite-integrals', level: 'Undergraduate 1', type: 'Computation', concepts: ['definite integrals'],
    make: i => { const a=pick(i,1,1,8); return { statement: `Evaluate ∫₀^${a} x² dx.`, hints: ['Antiderivative is x³/3.'], answer: `${fx(a**3/3)}`, solution: [sol('FTC', `∫₀^${a} x² dx = ${a}³/3 = ${fx(a**3/3)}.`)] } } },
  { id: 'det-2x2', title: '2×2 determinant', topicId: 'determinants', level: 'Undergraduate 1', type: 'Computation', concepts: ['determinants'],
    make: i => { const a=pick(i,1,-9,9), b=pick(i,2,-9,9), c=pick(i,3,-9,9), d=pick(i,4,-9,9); return { statement: `Compute det [[${a}, ${b}], [${c}, ${d}]].`, hints: ['ad − bc.'], answer: String(a*d-b*c), solution: [sol('Formula', `${a}·${d} − ${b}·${c} = ${a*d-b*c}.`, String.raw`$\det\begin{pmatrix}a&b\\c&d\end{pmatrix}=ad-bc$`)] } } },
  { id: 'mat-mult', title: '2×2 matrix multiplication', topicId: 'matrix-multiplication', level: 'Undergraduate 1', type: 'Computation', concepts: ['matrix multiplication'],
    make: i => { const a=pick(i,1,-4,4), b=pick(i,2,-4,4), c=pick(i,3,-4,4), d=pick(i,4,-4,4), e=pick(i,5,-4,4), f=pick(i,6,-4,4), g=pick(i,7,-4,4), h=pick(i,8,-4,4); const A=a*e+b*g, B=a*f+b*h, C=c*e+d*g, D=c*f+d*h; return { statement: `Compute [[${a},${b}],[${c},${d}]] · [[${e},${f}],[${g},${h}]].`, hints: ['Row times column.'], answer: `[[${A},${B}],[${C},${D}]]`, solution: [sol('Entries', `First row: ${a}·${e}+${b}·${g}=${A}; ${a}·${f}+${b}·${h}=${B}.`), sol('Second row', `${c}·${e}+${d}·${g}=${C}; ${c}·${f}+${d}·${h}=${D}.`)] } } },
  { id: 'eigen-triangular', title: 'Eigenvalues of a triangular matrix', topicId: 'eigenvalues', level: 'Undergraduate 2', type: 'Computation', concepts: ['eigenvalues'],
    make: i => { const a=pick(i,1,-8,8), d=pick(i,2,-8,8), b=pick(i,3,-5,5); return { statement: `Find eigenvalues of [[${a}, ${b}], [0, ${d}]].`, hints: ['Triangular matrices have eigenvalues on the diagonal.'], answer: `${a}, ${d}`, solution: [sol('Characteristic polynomial', `det(A − λI) = (${a}−λ)(${d}−λ).`), sol('Roots', `λ = ${a} and λ = ${d}.`)] } } },
  { id: 'binomial', title: 'Binomial coefficients', topicId: 'combinations', level: 'Pre-university', type: 'Computation', concepts: ['combinatorics'],
    make: i => { const n=pick(i,1,5,14), k=pick(i,2,1,Math.min(n-1,7)); let v=1; for(let j=1;j<=k;j++) v=v*(n-j+1)/j; return { statement: `Compute C(${n}, ${k}).`, hints: ['C(n,k) = n!/(k!(n−k)!).'], answer: String(v), solution: [sol('Formula', `C(${n},${k}) = ${n}!/(${k}!·${n-k}!) = ${v}.`)] } } },
  { id: 'dice-prob', title: 'Two-dice probability', topicId: 'discrete-probability', level: 'School', type: 'Computation', concepts: ['probability', 'sample spaces'],
    make: i => { const s=pick(i,1,2,12); let count=0; for(let a=1;a<=6;a++) for(let b=1;b<=6;b++) if(a+b===s) count++; const g=gcd(count,36); return { statement: `Two fair dice are rolled. Find P(sum = ${s}).`, hints: ['There are 36 equally likely ordered outcomes.'], answer: `${count/g}/${36/g}`, solution: [sol('Count outcomes', `${count} of the 36 ordered pairs sum to ${s}.`), sol('Simplify', `${count}/36 = ${count/g}/${36/g}.`)] } } },
  { id: 'bayes-simple', title: 'Bayes’ theorem with a test', topicId: 'bayes-theorem', level: 'Undergraduate 1', type: 'Application', concepts: ['conditional probability'],
    make: i => { const prev=pick(i,1,1,10)/100, sens=pick(i,2,80,99)/100, spec=pick(i,3,80,99)/100; const ppv=sens*prev/(sens*prev+(1-spec)*(1-prev)); return { statement: `Disease prevalence ${round(prev*100,1)}%, sensitivity ${round(sens*100)}%, specificity ${round(spec*100)}%. Find P(disease | positive).`, hints: ['Use a natural frequency tree with 10,000 people.'], answer: `${round(ppv*100,2)}%`, solution: [sol('Bayes', `PPV = sens·prev / [sens·prev + (1−spec)(1−prev)].`, String.raw`$P(D\mid+)=\frac{P(+|D)P(D)}{P(+)}$`), sol('Compute', `= ${round(ppv*100,2)}%.`)] } } },
  { id: 'expectation', title: 'Discrete expectation', topicId: 'expectation', level: 'Undergraduate 1', type: 'Computation', concepts: ['expectation'],
    make: i => { const v1=pick(i,1,1,6), v2=pick(i,2,7,12), p1=pick(i,3,1,9)/10, p2=1-p1; const E=v1*p1+v2*p2; return { statement: `X takes ${v1} with probability ${p1.toFixed(1)} and ${v2} otherwise. Find E[X].`, hints: ['Multiply each value by its probability and add.'], answer: String(round(E)), solution: [sol('Expectation', `${v1}·${p1.toFixed(1)} + ${v2}·${p2.toFixed(1)} = ${round(E)}.`, String.raw`$\mathbb E[X]=\sum x\,p(x)$`)] } } },
  { id: 'geom-series', title: 'Finite geometric sum', topicId: 'series', level: 'Pre-university', type: 'Computation', concepts: ['series'],
    make: i => { const r=pick(i,1,2,4)/4, n=pick(i,2,3,8); const S=(1-Math.pow(r,n+1))/(1-r); return { statement: `Compute Σ_{k=0}^{${n}} (${fx(r)})^k.`, hints: ['Use (1−r^{n+1})/(1−r).'], answer: String(round(S)), solution: [sol('Formula', `S = (1 − ${fx(r)}^${n+1})/(1 − ${fx(r)}) = ${round(S)}.`, String.raw`$S_n=\frac{1-r^{n+1}}{1-r}$`)] } } },
  { id: 'taylor-term', title: 'Taylor coefficient of sin', topicId: 'taylor-series', level: 'Undergraduate 2', type: 'Computation', concepts: ['Taylor series'],
    make: i => { const k=pick(i,1,0,6), coeff=(k%2===0?1:-1), c=coeff/ (function fact(n:number){let r=1;for(let j=2;j<=n;j++)r*=j;return r})(2*k+1); return { statement: `Find the coefficient of x^${2*k+1} in the Maclaurin series of sin x.`, hints: ['sin x = Σ (−1)^k x^{2k+1}/(2k+1)!.'], answer: `${coeff}/${(function fact(n:number){let r=1;for(let j=2;j<=n;j++)r*=j;return r})(2*k+1)}`, solution: [sol('Formula', `Coefficient = (−1)^${k}/(${2*k+1})! = ${c}.`)] } } },
  { id: 'dot-product', title: 'Dot product', topicId: 'vectors', level: 'Undergraduate 1', type: 'Computation', concepts: ['vectors'],
    make: i => { const a=pick(i,1,-6,6), b=pick(i,2,-6,6), c=pick(i,3,-6,6), d=pick(i,4,-6,6); return { statement: `Compute (${a}, ${b}) · (${c}, ${d}).`, hints: ['Multiply components and add.'], answer: String(a*c+b*d), solution: [sol('Formula', `${a}·${c} + ${b}·${d} = ${a*c+b*d}.`)] } } },
  { id: 'complex-mul', title: 'Complex multiplication', topicId: 'complex-numbers', level: 'Pre-university', type: 'Computation', concepts: ['complex numbers'],
    make: i => { const a=pick(i,1,-6,6), b=pick(i,2,-6,6), c=pick(i,3,-6,6), d=pick(i,4,-6,6); return { statement: `Compute (${a} ${b<0?'−':'+'} ${Math.abs(b)}i)(${c} ${d<0?'−':'+'} ${Math.abs(d)}i).`, hints: ['Use i² = −1 and expand.'], answer: `${a*c-b*d} ${a*d+b*c<0?'−':'+'} ${Math.abs(a*d+b*c)}i`, solution: [sol('Expand', `Real: ${a}·${c} − ${b}·${d} = ${a*c-b*d}; imaginary: ${a}·${d} + ${b}·${c} = ${a*d+b*c}.`)] } } },
  { id: 'bisection-bound', title: 'Bisection error bound', topicId: 'bisection-method', level: 'Undergraduate 1', type: 'Computation', concepts: ['numerical methods'],
    make: i => { const L=pick(i,1,1,10), n=pick(i,2,3,14); return { statement: `An interval of length ${L} is halved ${n} times. What is the error bound?`, hints: ['Error ≤ length / 2ⁿ.'], answer: `${fx(L/2**n)}`, solution: [sol('Bound', `${L}/2^${n} = ${fx(L/2**n)}.`, String.raw`$\text{error}\le\frac{b-a}{2^{n}}$`)] } } },
  { id: 'midpoint-rule', title: 'Midpoint rule for ∫₀¹x²', topicId: 'numerical-integration', level: 'Undergraduate 1', type: 'Computation', concepts: ['numerical integration'],
    make: i => { const n=pick(i,1,2,20); const S=(4*n*n-1)/(12*n*n); return { statement: `Approximate ∫₀¹ x² dx using the midpoint rule with ${n} equal subintervals.`, hints: ['Midpoints are (k+½)/n.'], answer: String(round(S,6)), solution: [sol('Sum', `Midpoint sum = (4n²−1)/(12n²) with n = ${n}.`), sol('Exact comparison', `Exact value 1/3 = 0.333333; error ${round(Math.abs(S-1/3),6)}.`)] } } },
  { id: 'newton-step', title: 'One Newton step for a square root', topicId: 'newton-raphson', level: 'Undergraduate 1', type: 'Computation', concepts: ['root finding'],
    make: i => { const A=pick(i,1,2,50), x0=pick(i,2,1,20)/2; const x1=(x0 + A/x0)/2; return { statement: `Perform one Newton step toward √${A} starting at x₀ = ${x0}.`, hints: ['For x²−A: x₁ = (x₀ + A/x₀)/2.'], answer: String(round(x1,5)), solution: [sol('Iteration', `x₁ = (${x0} + ${A}/${x0})/2 = ${round(x1,5)}.`, String.raw`$x_{n+1}=\frac12\left(x_n+\frac{A}{x_n}\right)$`)] } } },
  { id: 'gradient-2d', title: 'Gradient of a quadratic', topicId: 'gradient', level: 'Undergraduate 2', type: 'Computation', concepts: ['gradient'],
    make: i => { const a=pick(i,1,-5,5), b=pick(i,2,-5,5); return { statement: `Find ∇f(${a}, ${b}) for f(x,y) = x² + 2y².`, hints: ['∂f/∂x = 2x, ∂f/∂y = 4y.'], answer: `(${2*a}, ${4*b})`, solution: [sol('Partial derivatives', `∇f = (2x, 4y), so at (${a},${b}) it is (${2*a}, ${4*b}).`)] } } },
  { id: 'entropy', title: 'Binary entropy', topicId: 'shannon-entropy', level: 'Undergraduate 2', type: 'Computation', concepts: ['entropy'],
    make: i => { const p=pick(i,1,1,9)/10; const H=-p*Math.log2(p)-(1-p)*Math.log2(1-p); return { statement: `Compute H(X) in bits for P(head) = ${p.toFixed(1)}.`, hints: ['H = −p log₂p − (1−p)log₂(1−p).'], answer: `${round(H,4)} bits`, solution: [sol('Formula', `H = −${p.toFixed(1)}log₂(${p.toFixed(1)}) − ${(1-p).toFixed(1)}log₂(${(1-p).toFixed(1)}) = ${round(H,4)} bits.`)] } } },
  { id: 'markov-stationary', title: 'Stationary distribution of a 2-state chain', topicId: 'markov-chains', level: 'Undergraduate 2', type: 'Computation', concepts: ['Markov chains'],
    make: i => { const a=pick(i,1,1,9)/10, b=pick(i,2,1,9)/10; const p1=b/(a+b), p2=a/(a+b); return { statement: `Find the stationary distribution for P = [[${(1-a).toFixed(1)}, ${a.toFixed(1)}], [${b.toFixed(1)}, ${(1-b).toFixed(1)}]].`, hints: ['Solve π = πP with π₁ + π₂ = 1.'], answer: `(${round(p1)}, ${round(p2)})`, solution: [sol('Balance', `π₁a = π₂b and π₁+π₂=1, so π₁ = ${round(p1)}, π₂ = ${round(p2)}.`)] } } },
  { id: 'shortest-path', title: 'Shortest path in a diamond graph', topicId: 'shortest-paths', level: 'Undergraduate 1', type: 'Computation', concepts: ['graph algorithms'],
    make: i => { const a=pick(i,1,1,12), b=pick(i,2,1,12), c=pick(i,3,1,12), d=pick(i,4,1,12); const v=Math.min(a+c,b+d); return { statement: `A graph has edges 0→1 (${a}), 0→2 (${b}), 1→3 (${c}), 2→3 (${d}). Find the shortest distance 0→3.`, hints: ['Compare the two paths.'], answer: String(v), solution: [sol('Compare paths', `Via 1: ${a}+${c}=${a+c}; via 2: ${b}+${d}=${b+d}; minimum ${v}.`)] } } },
  { id: 'compound', title: 'Compound interest', topicId: 'compound-interest', level: 'School', type: 'Application', concepts: ['finance', 'exponentials'],
    make: i => { const P=pick(i,1,100,10000), r=pick(i,2,1,12)/100, n=pick(i,3,1,20); const A=P*Math.pow(1+r,n); return { statement: `Find the value of ${P} after ${n} years at ${round(r*100)}% annual compound interest.`, hints: ['A = P(1+r)^n.'], answer: String(round(A,2)), solution: [sol('Formula', `A = ${P}(1+${r})^${n} = ${round(A,2)}.`, String.raw`$A=P(1+r)^n$`)] } } },
  { id: 'trig-exact', title: 'Exact trigonometric values', topicId: 'trigonometric-functions', level: 'Pre-university', type: 'Computation', concepts: ['trigonometry'],
    make: i => { const idx=pick(i,1,0,11), deg=idx*30, vals=['0','1/2','√3/2','1','√3/2','1/2','0','−1/2','−√3/2','−1','−√3/2','−1/2']; return { statement: `Find sin ${deg}°.`, hints: ['Use the unit circle.'], answer: vals[idx], solution: [sol('Unit circle', `sin ${deg}° = ${vals[idx]}.`)] } } },
  { id: 'alternating', title: 'Alternating harmonic partial sum', topicId: 'series', level: 'Undergraduate 2', type: 'Computation', concepts: ['series', 'convergence'],
    make: i => { const n=pick(i,1,2,12); let s=0; for(let k=0;k<n;k++) s+=(k%2===0?1:-1)/(k+1); return { statement: `Compute the partial sum Σ_{k=0}^{${n-1}} (−1)^k/(k+1).`, hints: ['Add terms alternately.'], answer: String(round(s,6)), solution: [sol('Partial sum', `S_${n} = ${round(s,6)}; the infinite sum is ln 2 ≈ 0.693147.`)] } } },
  { id: 'convex-check', title: 'Convexity of a quadratic', topicId: 'convex-optimization', level: 'Undergraduate 3', type: 'Conceptual', concepts: ['convexity'],
    make: i => { const a=pick(i,1,1,9), b=pick(i,2,-9,9), c=pick(i,3,-9,9); return { statement: `Is f(x) = ${a}x² ${b>=0?'+':'−'} ${Math.abs(b)}x + (${c}) convex on ℝ? Find its minimiser.`, hints: ['Check f″ = 2a.'], answer: `Convex; x* = ${fx(-b/(2*a))}`, solution: [sol('Second derivative', `f″ = ${2*a} > 0, so f is strictly convex.`), sol('Minimiser', `x* = −b/(2a) = ${fx(-b/(2*a))}.`)] } } },
  { id: 'poisson', title: 'Poisson probability', topicId: 'probability-distributions', level: 'Undergraduate 2', type: 'Computation', concepts: ['distributions'],
    make: i => { const lam=pick(i,1,1,8), k=pick(i,2,0,8); const v=Math.exp(-lam)*Math.pow(lam,k)/ (function fact(n:number){let r=1;for(let j=2;j<=n;j++)r*=j;return r})(k); return { statement: `For X ~ Poisson(${lam}), find P(X = ${k}).`, hints: ['P(X=k) = e^{−λ}λ^k/k!.'], answer: String(round(v,5)), solution: [sol('PMF', `P(X=${k}) = e^{−${lam}} ${lam}^${k}/${k}! = ${round(v,5)}.`)] } } },
  { id: 'vector-norm', title: 'Euclidean norm', topicId: 'vectors', level: 'Undergraduate 1', type: 'Computation', concepts: ['norms'],
    make: i => { const a=pick(i,1,-9,9), b=pick(i,2,-9,9), c=pick(i,3,-9,9); return { statement: `Find ‖(${a}, ${b}, ${c})‖.`, hints: ['Square, add, take the square root.'], answer: String(round(Math.hypot(a,b,c),4)), solution: [sol('Norm', `√((${a})²+(${b})²+(${c})²) = ${round(Math.hypot(a,b,c),4)}.`)] } } },
  { id: 'limit-at-inf', title: 'Limit at infinity of a rational function', topicId: 'limits', level: 'Undergraduate 1', type: 'Computation', concepts: ['limits'],
    make: i => { const a=pick(i,1,1,9), b=pick(i,2,1,9); return { statement: `Evaluate lim_{x→∞} (${a}x² + ${b})/(${a}x² + 1).`, hints: ['Divide by the highest power of x.'], answer: '1', solution: [sol('Dominant terms', `Both numerator and denominator are dominated by ${a}x², so the limit is 1.`)] } } },
]

export {
  INTERNATIONAL_FAMILIES, INTERNATIONAL_COUNT, INTERNATIONAL_FAMILY_BY_ID,
  INTERNATIONAL_IDS, getInternationalProblem, internationalIdsForFamily,
  internationalForTopic,
} from './international'
import { INTERNATIONAL_COUNT, internationalForTopic as internationalTopics } from './international'

export const GENERATED_COUNT = GENERATED_FAMILIES.length * 500
export const ALL_GENERATED_COUNT = GENERATED_COUNT + INTERNATIONAL_COUNT
export const GENERATED_FAMILY_BY_ID = Object.fromEntries(GENERATED_FAMILIES.map(f => [f.id, f])) as Record<string, GeneratedFamily>

export function getGeneratedProblem(id: string): GeneratedProblem | null {
  const m = /^gen-([a-z0-9-]+)-(\d+)$/.exec(id)
  if (!m) return null
  const family = GENERATED_FAMILY_BY_ID[m[1]]
  if (!family) return null
  const index = Number(m[2])
  if (!Number.isInteger(index) || index < 0 || index >= 500) return null
  const body = family.make(index + 1)
  return { id, familyId: family.id, index, title: `${family.title} · #${index + 1}`,
    topicId: family.topicId, level: family.level, type: family.type, ...body }
}

export function getGeneratedMeta(id: string) {
  const m = /^gen-([a-z0-9-]+)-(\d+)$/.exec(id)
  if (!m) return null
  const family = GENERATED_FAMILY_BY_ID[m[1]]
  if (!family) return null
  return { family, count: 500, ids: Array.from({ length: 500 }, (_, i) => `gen-${family.id}-${i}`) }
}

export const GENERATED_IDS = GENERATED_FAMILIES.flatMap(f => Array.from({ length: 500 }, (_, i) => `gen-${f.id}-${i}`))

export function generatedForTopic(topicId: string): string[] {
  const standard = GENERATED_FAMILIES.filter(f => f.topicId === topicId).flatMap(f => Array.from({ length: 12 }, (_, i) => `gen-${f.id}-${i}`))
  return [...standard, ...internationalTopics(topicId)]
}

export function generatedIdsForFamily(familyId: string): string[] {
  return Array.from({ length: 500 }, (_, i) => `gen-${familyId}-${i}`)
}
