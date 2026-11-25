// International-level (olympiad style) problem bank: 30 deterministic
// families × 500 variants = 15,000 problems. Every family is constructed from
// parameters chosen first, so its answer and solution are exact for all inputs.
import type { GeneratedProblem, GeneratedFamily } from './types'
import { seeded } from '../../components/sim/useCanvas'

const pick = (i: number, k: number, min: number, max: number) => min + Math.floor(seeded(i * 149 + k * 613) * (max - min + 1))
const sol = (title: string, text: string, math?: string) => ({ title, text, math })
const primes = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43]

function egcd(a: number, b: number) {
  let [or, r] = [a, b], [os, s] = [1, 0], [ot, t] = [0, 1]
  while (r !== 0) {
    const q = Math.floor(or / r)
    ;[or, r] = [r, or - q * r]; [os, s] = [s, os - q * s]; [ot, t] = [t, ot - q * t]
  }
  return { g: or, x: os, y: ot }
}
const invMod = (a: number, m: number) => ((egcd(a, m).x % m) + m) % m
function modPow(a: number, e: number, m: number) { let r = 1, b = a % m; while (e > 0) { if (e & 1) r = r * b % m; b = b * b % m; e >>= 1 } return r }
function choose(n: number, k: number) { let r = 1; for (let j = 1; j <= k; j++) r = r * (n - k + j) / j; return Math.round(r) }

export const INTERNATIONAL_FAMILIES: GeneratedFamily[] = [
  { id: 'mod-inverse', title: 'Modular inverses', topicId: 'modular-arithmetic', level: 'Pre-university', type: 'Computation', concepts: ['congruences', 'Euclidean algorithm'],
    make: i => { const p = primes[pick(i,1,0,9)], a = pick(i,2,2,p-1), x = invMod(a, p); return { statement: `Find the least positive integer x such that ${a}x ≡ 1 (mod ${p}).`, hints: ['Run the Euclidean algorithm on (a, p).', 'Back-substitute to express 1 as ax + py.'], answer: String(x), solution: [sol('Euclidean algorithm', `${p} = ${Math.floor(p/a)}·${a} + ${p%a}; continue to remainder 1.`), sol('Back-substitute', `1 = ${a}·${x} + ${p}·${((1-a*x)/p)}.`, String.raw`$ax\equiv1\pmod p$`), sol('Result', `x = ${x}.`)] } } },

  { id: 'crt', title: 'Chinese remainder theorem', topicId: 'chinese-remainder-theorem', level: 'Pre-university', type: 'Computation', concepts: ['CRT', 'congruences'],
    make: i => { const m1 = pick(i,1,0,6), m2 = pick(i,2,7,9); const A = primes[m1], B = primes[m2]; const r1 = pick(i,3,0,A-1), r2 = pick(i,4,0,B-1); const t = ((r2-r1) * invMod(A % B, B) % B + B) % B; let n = r1 + A * t; if (n === 0) n = A * B; return { statement: `Find the least positive n with n ≡ ${r1} (mod ${A}) and n ≡ ${r2} (mod ${B}).`, hints: ['Write n = r₁ + A·t.', 'Solve A·t ≡ r₂ − r₁ (mod B).'], answer: String(n), solution: [sol('Substitute', `n = ${r1} + ${A}t.`), sol('Solve for t', `t ≡ (${r2}−${r1})·${A}^{−1} ≡ ${t} (mod ${B}).`), sol('Result', `n = ${r1} + ${A}·${t} = ${n}; check both congruences hold.`)] } } },

  { id: 'divisor-count', title: 'Counting divisors', topicId: 'divisibility', level: 'Pre-university', type: 'Computation', concepts: ['divisors', 'prime factorisation'],
    make: i => { const p = primes[pick(i,1,0,6)], q = primes[pick(i,2,7,9)], a = pick(i,3,1,5), b = pick(i,4,1,5); const d = (a+1)*(b+1); return { statement: `How many positive divisors does n = ${p}^${a}·${q}^${b} have?`, hints: ['A divisor is p^i q^j with 0 ≤ i ≤ a and 0 ≤ j ≤ b.'], answer: String(d), solution: [sol('Exponent choices', `i has ${a+1} choices and j has ${b+1} choices.`), sol('Multiply', `d(n) = (${a}+1)(${b}+1) = ${d}.`, String.raw`$d\!\left(p^aq^b\right)=(a+1)(b+1)$`)] } } },

  { id: 'flt-pow', title: 'Fermat reduction of powers', topicId: 'fermats-little-theorem', level: 'Pre-university', type: 'Computation', concepts: ['Fermat', 'modular powers'],
    make: i => { const p = primes[pick(i,1,0,9)], a = pick(i,2,2,p-1), k = pick(i,3,10,300); const e = k % (p-1), r = modPow(a, e, p); return { statement: `Compute ${a}^${k} mod ${p}.`, hints: ['Since p is prime and p ∤ a, a^(p−1) ≡ 1 (mod p).', 'Reduce the exponent modulo p − 1.'], answer: String(r), solution: [sol('Reduce exponent', `${k} mod ${p-1} = ${e}, so ${a}^${k} ≡ ${a}^${e} (mod ${p}).`, String.raw`$a^{p-1}\equiv1\pmod p$`), sol('Compute', `${a}^${e} mod ${p} = ${r}.`)] } } },

  { id: 'linear-diophantine', title: 'Linear Diophantine equations', topicId: 'diophantine-equations', level: 'Pre-university', type: 'Derivation', concepts: ['Diophantine', ' Bezout'],
    make: i => { const a = primes[pick(i,1,0,9)], b = primes[pick(i,2,0,9)] || primes[0], A = a === b ? primes[(primes.indexOf(a)+1)%10] : a; const x0 = pick(i,3,-9,9), y0 = pick(i,4,-9,9), c = A*x0 + b*y0; return { statement: `Find all integer solutions of ${A}x + ${b}y = ${c}.`, hints: ['gcd(a,b) = 1, so solutions exist.', 'One solution is enough; then add the homogeneous part.'], answer: `x = ${x0} + ${b}t, y = ${y0} − ${A}t (t ∈ ℤ)`, solution: [sol('Particular solution', `x₀ = ${x0}, y₀ = ${y0} gives ${A}·${x0} + ${b}·${y0} = ${c}.`), sol('Homogeneous solutions', `${A}·(${b}t) + ${b}·(−${A}t) = 0.`), sol('General solution', `x = ${x0} + ${b}t, y = ${y0} − ${A}t for t ∈ ℤ.`, String.raw`$x=x_0+\frac{b}{d}t,\quad y=y_0-\frac{a}{d}t$`)] } } },

  { id: 'legendre', title: 'Legendre’s exponent formula', topicId: 'prime-number-theory', level: 'Undergraduate 1', type: 'Computation', concepts: ['valuations', 'factorials'],
    make: i => { const p = primes[pick(i,1,0,7)], n = p * pick(i,2,2,6) + pick(i,3,0,p-1); let e = 0, q = p; while (q <= n) { e += Math.floor(n/q); q *= p } return { statement: `Find the exponent of ${p} in the prime factorisation of ${n}!.`, hints: ['Count multiples of p, then p², then p³, …'], answer: String(e), solution: [sol('Legendre formula', `v_${p}(${n}!) = ⌊${n}/${p}⌋ + ⌊${n}/${p*p}⌋ + … = ${e}.`, String.raw`$v_p(n!)=\sum_{k\ge1}\left\lfloor\frac{n}{p^k}\right\rfloor$`)] } } },

  { id: 'euler-phi', title: 'Euler’s totient', topicId: 'eulers-theorem', level: 'Pre-university', type: 'Computation', concepts: ['totient', 'coprimality'],
    make: i => { const p = primes[pick(i,1,0,7)], q = primes[pick(i,2,8,9)]; const phi = (p-1)*(q-1); return { statement: `Compute φ(${p*q}) for distinct primes ${p}, ${q}.`, hints: ['φ is multiplicative on coprime factors.', 'φ(p) = p − 1 for prime p.'], answer: String(phi), solution: [sol('Multiplicativity', `φ(${p}·${q}) = φ(${p})·φ(${q}) = (${p}−1)(${q}−1).`), sol('Result', `φ(${p*q}) = ${phi}.`, String.raw`$\varphi(pq)=(p-1)(q-1)$`)] } } },

  { id: 'digit-sum', title: 'Digit sums mod 9', topicId: 'number-representation', level: 'Pre-university', type: 'Computation', concepts: ['modular arithmetic', 'decimals'],
    make: i => { const n = pick(i,1,1000,999999), s = String(n).split('').reduce((a,c)=>a+Number(c),0); return { statement: `Find the remainder when ${n} is divided by 9.`, hints: ['A number is congruent to its digit sum mod 9.'], answer: String(s % 9), solution: [sol('Digit sum', `Digits sum to ${s}.`), sol('Reduce', `${s} ≡ ${s%9} (mod 9), so ${n} ≡ ${s%9} (mod 9).`, String.raw`$n\equiv\sum\text{digits}\pmod 9$`)] } } },

  { id: 'bezout', title: 'Bézout coefficients', topicId: 'gcd-lcm', level: 'Pre-university', type: 'Computation', concepts: ['Euclidean algorithm', 'gcd'],
    make: i => { const a = primes[pick(i,1,0,9)], b = primes[pick(i,2,0,9)]; const B = a === b ? primes[(primes.indexOf(a)+3)%10] : b; const g = egcd(a, B); return { statement: `Find integers x, y with ${a}x + ${B}y = 1.`, hints: ['Use the extended Euclidean algorithm.'], answer: `x = ${g.x}, y = ${g.y}`, solution: [sol('Extended Euclid', `Back-substitution gives 1 = ${a}·(${g.x}) + ${B}·(${g.y}).`), sol('Check', `${a}·(${g.x}) + ${B}·(${g.y}) = ${a*g.x+B*g.y}.`, String.raw`$ax+by=\gcd(a,b)$`)] } } },

  { id: 'sym-squares', title: 'Symmetric sums of squares', topicId: 'algebraic-identities', level: 'Pre-university', type: 'Computation', concepts: ['symmetric polynomials'],
    make: i => { const x = pick(i,1,1,15), y = pick(i,2,1,15), s = x+y, p = x*y, v = s*s - 2*p; return { statement: `If x + y = ${s} and xy = ${p}, find x² + y².`, hints: ['Square the sum: (x+y)² = x² + 2xy + y².'], answer: String(v), solution: [sol('Identity', `x² + y² = (x+y)² − 2xy.`, String.raw`$x^2+y^2=(x+y)^2-2xy$`), sol('Compute', `${s}² − 2·${p} = ${v}.`)] } } },

  { id: 'sym-cubes', title: 'Symmetric sums of cubes', topicId: 'algebraic-identities', level: 'Pre-university', type: 'Computation', concepts: ['symmetric polynomials'],
    make: i => { const x = pick(i,1,1,12), y = pick(i,2,1,12), s = x+y, p = x*y, v = s*s*s - 3*p*s; return { statement: `If x + y = ${s} and xy = ${p}, find x³ + y³.`, hints: ['Use (x+y)³ = x³ + y³ + 3xy(x+y).'], answer: String(v), solution: [sol('Identity', `x³ + y³ = (x+y)³ − 3xy(x+y).`, String.raw`$x^3+y^3=(x+y)^3-3xy(x+y)$`), sol('Compute', `${s}³ − 3·${p}·${s} = ${v}.`)] } } },

  { id: 'amgm', title: 'AM–GM minimisation', topicId: 'algebraic-inequalities', level: 'Pre-university', type: 'Proof', concepts: ['AM–GM', 'inequalities'],
    make: i => { const m = pick(i,1,2,12), k = m*m; return { statement: `For positive reals x, y with xy = ${k}, find the minimum of x + y.`, hints: ['AM–GM: x + y ≥ 2√(xy).', 'Equality occurs at x = y.'], answer: String(2*m), solution: [sol('AM–GM', `x + y ≥ 2√${k} = ${2*m}.`, String.raw`$\frac{x+y}{2}\ge\sqrt{xy}$`), sol('Equality', `At x = y = ${m} the bound is attained, so the minimum is ${2*m}.`)] } } },

  { id: 'poly-remainder', title: 'Polynomial remainder theorem', topicId: 'polynomials', level: 'Pre-university', type: 'Computation', concepts: ['remainder theorem'],
    make: i => { const a = pick(i,1,1,5), b = pick(i,2,-6,6), c = pick(i,3,-6,6), d = pick(i,4,-9,9), r = pick(i,5,-4,4); const v = a*r*r*r + b*r*r + c*r + d; return { statement: `Find the remainder when P(x) = ${a}x³ + (${b})x² + (${c})x + (${d}) is divided by x − (${r}).`, hints: ['The remainder is P(r).'], answer: String(v), solution: [sol('Remainder theorem', `P(${r}) = ${a}·(${r})³ + ${b}·(${r})² + ${c}·(${r}) + ${d}.`, String.raw`$P(x)=(x-r)Q(x)+P(r)$`), sol('Compute', `Remainder = ${v}.`)] } } },

  { id: 'recurrence', title: 'Linear recurrences', topicId: 'recurrence-relations', level: 'Pre-university', type: 'Computation', concepts: ['recurrences'],
    make: i => { const p = pick(i,1,1,4), q = pick(i,2,1,4), a0 = pick(i,3,0,3), a1 = pick(i,4,1,4), n = pick(i,5,5,12); let A = a0, B = a1; for (let k=2;k<=n;k++) { const C = p*B + q*A; A = B; B = C } return { statement: `A sequence satisfies a₀ = ${a0}, a₁ = ${a1}, aₙ = ${p}aₙ₋₁ + ${q}aₙ₋₂. Find a_${n}.`, hints: ['Iterate the recurrence, keeping the last two terms.'], answer: String(B), solution: [sol('Iterate', `Compute forward from a₀, a₁ up to index ${n}.`, String.raw`$a_n=p\,a_{n-1}+q\,a_{n-2}$`), sol('Result', `a_${n} = ${B}.`)] } } },

  { id: 'geom-series', title: 'Finite geometric sums', topicId: 'sequences-series', level: 'Pre-university', type: 'Computation', concepts: ['series'],
    make: i => { const r = pick(i,1,2,6), n = pick(i,2,3,10), S = (Math.pow(r,n+1)-1)/(r-1); return { statement: `Compute 1 + ${r} + ${r}² + … + ${r}^${n}.`, hints: ['Use S = (r^(n+1) − 1)/(r − 1).'], answer: String(S), solution: [sol('Formula', `S = (${r}^${n+1} − 1)/(${r} − 1).`, String.raw`$S_n=\frac{r^{n+1}-1}{r-1}$`), sol('Result', `S = ${S}.`)] } } },

  { id: 'choose-identity', title: 'Pascal’s identity in action', topicId: 'combinations', level: 'Pre-university', type: 'Computation', concepts: ['binomial coefficients'],
    make: i => { const n = pick(i,1,6,15), k = pick(i,2,2,Math.max(2,n-2)), v = choose(n+1, k); return { statement: `Compute C(${n}, ${k}) + C(${n}, ${k-1}).`, hints: ['Pascal: C(n,k) + C(n,k−1) = C(n+1,k).'], answer: String(v), solution: [sol('Pascal', `The sum equals C(${n+1}, ${k}).`, String.raw`$\binom nk+\binom n{k-1}=\binom{n+1}k$`), sol('Compute', `C(${n+1}, ${k}) = ${v}.`)] } } },

  { id: 'pigeonhole', title: 'Pigeonhole threshold', topicId: 'pigeonhole-principle', level: 'Pre-university', type: 'Conceptual', concepts: ['pigeonhole'],
    make: i => { const m = pick(i,1,3,20); return { statement: `What is the least number of integers needed to guarantee two have the same remainder modulo ${m}?`, hints: ['There are m residue classes.'], answer: String(m+1), solution: [sol('Residue classes', `There are ${m} possible remainders.`), sol('Pigeonhole', `With ${m+1} integers, two must share a remainder; m integers can all be distinct residues.`, String.raw`$n=m+1$`)] } } },

  { id: 'incl-excl', title: 'Inclusion–exclusion counting', topicId: 'inclusion-exclusion', level: 'Pre-university', type: 'Computation', concepts: ['counting', 'divisibility'],
    make: i => { const a = primes[pick(i,1,0,4)], b = primes[pick(i,2,5,9)], N = pick(i,3,60,600); const v = Math.floor(N/a)+Math.floor(N/b)-Math.floor(N/(a*b)); return { statement: `How many integers from 1 to ${N} are divisible by ${a} or by ${b}?`, hints: ['Add counts for a and b, subtract the double count.'], answer: String(v), solution: [sol('Count', `⌊${N}/${a}⌋ + ⌊${N}/${b}⌋ − ⌊${N}/${a*b}⌋.`, String.raw`$|A\cup B|=|A|+|B|-|A\cap B|$`), sol('Compute', `${Math.floor(N/a)} + ${Math.floor(N/b)} − ${Math.floor(N/(a*b))} = ${v}.`)] } } },

  { id: 'graph-edges', title: 'Counting edges in complete graphs', topicId: 'graph-theory', level: 'Pre-university', type: 'Computation', concepts: ['graph theory'],
    make: i => { const n = pick(i,1,4,40), e = n*(n-1)/2; return { statement: `How many edges does the complete graph K_${n} have?`, hints: ['Each pair of vertices contributes exactly one edge.'], answer: String(e), solution: [sol('Count pairs', `C(${n}, 2) = ${n}·${n-1}/2 = ${e}.`, String.raw`$|E(K_n)|=\binom n2$`)] } } },

  { id: 'derangements', title: 'Derangements', topicId: 'combinatorics', level: 'Pre-university', type: 'Computation', concepts: ['inclusion–exclusion', 'permutations'],
    make: i => { const n = pick(i,1,2,10); let d0=1, d1=0; for (let k=2;k<=n;k++) { const d=(k-1)*(d0+d1); d0=d1; d1=d } const v = n===1?0:d1; return { statement: `How many permutations of ${n} objects have no fixed point?`, hints: ['Use D(n) = (n−1)(D(n−1)+D(n−2)).'], answer: String(v), solution: [sol('Recurrence', `D₀=1, D₁=0, Dₙ=(n−1)(Dₙ₋₁+Dₙ₋₂).`, String.raw`$!n=n!\sum_{k=0}^{n}\frac{(-1)^k}{k!}$`), sol('Result', `!${n} = ${v}.`)] } } },

  { id: 'grid-paths', title: 'Lattice paths', topicId: 'combinatorics', level: 'Pre-university', type: 'Computation', concepts: ['binomial coefficients', 'counting'],
    make: i => { const a = pick(i,1,2,10), b = pick(i,2,2,10), v = choose(a+b, a); return { statement: `How many shortest lattice paths go from (0,0) to (${a}, ${b}) using unit right/up steps?`, hints: ['Choose which of the a+b steps are rightward.'], answer: String(v), solution: [sol('Encode a path', `${a} right steps and ${b} up steps in some order.`), sol('Choose positions', `C(${a+b}, ${a}) = ${v}.`, String.raw`$\binom{a+b}{a}$`)] } } },

  { id: 'pythagorean', title: 'Pythagorean triples', topicId: 'triangles', level: 'Pre-university', type: 'Computation', concepts: ['Euclid’s formula'],
    make: i => { const m = pick(i,1,2,12), n = pick(i,2,1,Math.max(1,m-1)), h = m*m+n*n, l1 = m*m-n*n, l2 = 2*m*n; return { statement: `A right triangle has legs ${l1} and ${l2}. Find its hypotenuse.`, hints: ['Try Euclid’s triple formula with parameters m, n.'], answer: String(h), solution: [sol('Euclid’s formula', `Legs m²−n² = ${l1}, 2mn = ${l2}.`), sol('Hypotenuse', `m²+n² = ${m}²+${n}² = ${h}.`, String.raw`$c=m^2+n^2$`)] } } },

  { id: 'triangle-area', title: 'Area of a right triangle', topicId: 'geometric-proofs', level: 'Pre-university', type: 'Computation', concepts: ['area', 'Pythagorean triples'],
    make: i => { const m = pick(i,1,2,12), n = pick(i,2,1,Math.max(1,m-1)), A = m*n*(m*m-n*n); return { statement: `A right triangle has legs ${m*m-n*n} and ${2*m*n}. Find its area.`, hints: ['Area = half the product of the legs.'], answer: String(A), solution: [sol('Area', `½·(${m*m-n*n})·(${2*m*n}) = ${A}.`, String.raw`$A=\frac12 ab=mn(m^2-n^2)$`)] } } },

  { id: 'inscribed-angle', title: 'Inscribed angle theorem', topicId: 'circles', level: 'Pre-university', type: 'Conceptual', concepts: ['circle geometry'],
    make: i => { const theta = 2*pick(i,1,10,80); return { statement: `An inscribed angle subtends a minor arc with central angle ${theta}°. Find the inscribed angle.`, hints: ['An inscribed angle is half its intercepted central angle.'], answer: `${theta/2}°`, solution: [sol('Theorem', `Inscribed angle = ½ × central angle.`, String.raw`$\angle=\tfrac12\theta$`), sol('Compute', `½ × ${theta}° = ${theta/2}°.`)] } } },

  { id: 'similarity', title: 'Similarity and area scaling', topicId: 'similarity', level: 'Pre-university', type: 'Conceptual', concepts: ['similarity'],
    make: i => { const k = pick(i,1,2,12), A = pick(i,2,3,30), v = A*k*k; return { statement: `Two similar figures have linear scale factor ${k}. If the smaller has area ${A}, find the larger area.`, hints: ['Areas scale by the square of the linear factor.'], answer: String(v), solution: [sol('Area ratio', `A₂/A₁ = ${k}² = ${k*k}.`, String.raw`$\frac{A_2}{A_1}=k^2$`), sol('Compute', `${A}·${k*k} = ${v}.`)] } } },

  { id: 'power-point', title: 'Power of a point', topicId: 'circles', level: 'Pre-university', type: 'Computation', concepts: ['circle geometry', 'tangent–secant'],
    make: i => { const a = pick(i,1,2,9), k = pick(i,2,2,9), t = a*k, whole = a*k*k, inside = whole - a; return { statement: `From a point P outside a circle, a tangent has length ${t} and a secant has external segment ${a}. Find the length of the segment inside the circle.`, hints: ['tangent² = external × whole secant.'], answer: String(inside), solution: [sol('Power of a point', `${t}² = ${a}·L so L = ${whole}.`, String.raw`$PT^2=PA\cdot PB$`), sol('Internal segment', `${whole} − ${a} = ${inside}.`)] } } },

  { id: 'wilson', title: 'Wilson’s theorem', topicId: 'prime-number-theory', level: 'Pre-university', type: 'Conceptual', concepts: ['primes', 'factorials'],
    make: i => { const p = primes[pick(i,1,0,9)]; return { statement: `Find the remainder of (${p}−1)! modulo the prime ${p}.`, hints: ['Pair each residue with its inverse.'], answer: String(p-1), solution: [sol('Inverse pairs', `Every a ≠ ±1 pairs with a⁻¹ to give product 1.`), sol('Wilson', `(${p}−1)! ≡ −1 ≡ ${p-1} (mod ${p}).`, String.raw`$(p-1)!\equiv-1\pmod p$`)] } } },

  { id: 'sigma', title: 'Sum of divisors', topicId: 'divisibility', level: 'Pre-university', type: 'Computation', concepts: ['divisors', 'geometric sums'],
    make: i => { const p = primes[pick(i,1,0,6)], q = primes[pick(i,2,7,9)], a = pick(i,3,1,4), b = pick(i,4,1,4); const s1 = (Math.pow(p,a+1)-1)/(p-1), s2 = (Math.pow(q,b+1)-1)/(q-1), v = s1*s2; return { statement: `Compute σ(n), the sum of positive divisors, for n = ${p}^${a}·${q}^${b}.`, hints: ['σ is multiplicative; σ(p^a) = (p^(a+1)−1)/(p−1).'], answer: String(v), solution: [sol('Multiplicativity', `σ(n) = σ(${p}^${a})·σ(${q}^${b}).`, String.raw`$\sigma(p^a)=\frac{p^{a+1}-1}{p-1}$`), sol('Compute', `σ(n) = ${s1}·${s2} = ${v}.`)] } } },

  { id: 'multiples-between', title: 'Counting multiples in an interval', topicId: 'divisibility', level: 'Pre-university', type: 'Computation', concepts: ['floor functions'],
    make: i => { const d = pick(i,1,3,12), A = pick(i,2,10,200), B = A + pick(i,3,20,300); const v = Math.floor((B-1)/d) - Math.floor(A/d); return { statement: `How many multiples of ${d} lie strictly between ${A} and ${B}?`, hints: ['Count multiples ≤ B−1 and subtract multiples ≤ A.'], answer: String(v), solution: [sol('Floor count', `⌊(${B}−1)/${d}⌋ − ⌊${A}/${d}⌋.`, String.raw`$\#=\left\lfloor\frac{B-1}{d}\right\rfloor-\left\lfloor\frac{A}{d}\right\rfloor$`), sol('Compute', `${Math.floor((B-1)/d)} − ${Math.floor(A/d)} = ${v}.`)] } } },

  { id: 'alternating', title: 'Alternating sums', topicId: 'sequences-series', level: 'Pre-university', type: 'Computation', concepts: ['series', 'pairing'],
    make: i => { const n = pick(i,1,3,40); return { statement: `Compute 1 − 2 + 3 − 4 + … + (${2*n-1}) − ${2*n}.`, hints: ['Pair consecutive terms: (1−2) + (3−4) + …'], answer: String(-n), solution: [sol('Pair terms', `Each pair (2k−1) − 2k = −1; there are ${n} pairs.`), sol('Result', `Sum = −${n}.`, String.raw`$\sum_{k=1}^{2n}(-1)^{k+1}k=-n$`)] } } },
]

export const INTERNATIONAL_COUNT = INTERNATIONAL_FAMILIES.length * 500
export const INTERNATIONAL_FAMILY_BY_ID = Object.fromEntries(INTERNATIONAL_FAMILIES.map(f => [f.id, f])) as Record<string, GeneratedFamily>
export const INTERNATIONAL_IDS = INTERNATIONAL_FAMILIES.flatMap(f => Array.from({ length: 500 }, (_, i) => `intl-${f.id}-${i}`))

export function getInternationalProblem(id: string): GeneratedProblem | null {
  const m = /^intl-([a-z0-9-]+)-(\d+)$/.exec(id)
  if (!m) return null
  const family = INTERNATIONAL_FAMILY_BY_ID[m[1]]
  if (!family) return null
  const index = Number(m[2])
  if (!Number.isInteger(index) || index < 0 || index >= 500) return null
  const body = family.make(index + 1)
  return { id, familyId: family.id, index, title: `${family.title} · #${index + 1}`,
    topicId: family.topicId, level: family.level, type: family.type, ...body }
}

export function internationalIdsForFamily(familyId: string): string[] {
  return Array.from({ length: 500 }, (_, i) => `intl-${familyId}-${i}`)
}

export function internationalForTopic(topicId: string): string[] {
  return INTERNATIONAL_FAMILIES.filter(f => f.topicId === topicId).flatMap(f => Array.from({ length: 12 }, (_, i) => `intl-${f.id}-${i}`))
}
