// The intellectual architecture behind each learning path. These are not
// motivational blurbs: each field answers a specific mathematical question —
// where the idea comes from, what problem forced it into existence, and why the
// next topic becomes unavoidable.
import type { LearningPath } from '../lib/types'
import { BASE_LEARNING_PATHS } from './content.library'

type Study = LearningPath['study']

const STUDIES: Record<string, Study> = {
  'path-zero': {
    firstPrinciple: `How do we count, compare and measure — and what happens when a finite process is allowed to continue without end?`,
    worldview: `Mathematics begins with one operation: move to the next thing. Repeating it gives the natural numbers. Once you allow the inverse of an operation, new numbers are forced into existence: subtraction demands negatives, division demands fractions, taking a square root of 2 demands irrationals, and solving x² + 1 = 0 demands complex numbers. Each extension is not a convention but a response to an equation the old system could not solve. Algebra appears when we give a name to an unknown and discover that certain transformations preserve the set of solutions. Geometry appears when we ask how the same reasoning applies to space. A function appears when we notice that dependence itself can be an object. Finally calculus appears when we ask what it means to zoom in without limit — and discovers that the same limiting process that produces a tangent also produces an area. That is the whole ladder in one sentence: operations → inverses → structures → dependence → limits.`,
    arc: [
      { title: `1 · Number is generated, not listed`, text: `Start from the successor map n ↦ n + 1. The naturals are what that map generates. Closing the system under inverse operations forces ℤ, then ℚ. The discovery that √2 is not rational is the first great proof that our intuitive picture of "number" was incomplete; completeness of ℝ is precisely the property that repairs it. Notice the pattern: every new number system is the smallest extension in which a previously unsolvable problem becomes solvable.`, math: String.raw`\mathbb{N}\subset\mathbb{Z}\subset\mathbb{Q}\subset\mathbb{R}\subset\mathbb{C}` },
      { title: `2 · The unknown becomes a thing`, text: `Writing x for a quantity we do not yet know is a conceptual leap of the first order. An equation is then a constraint, and solving means finding the objects satisfying it. The foundational insight is equivalence: adding the same number to both sides, or multiplying by a nonzero number, does not change the solution set. Linear equations are the simplest case; quadratics reveal that symmetry (completing the square) can solve a whole family at once.`, math: String.raw`ax^{2}+bx+c=0\;\Longleftrightarrow\;\left(x+\frac{b}{2a}\right)^{2}=\frac{b^{2}-4ac}{4a^{2}}` },
      { title: `3 · Dependence is geometry`, text: `A function f : X → Y turns a relation into an object you can transform, compose and plot. Its graph is not decoration: the shape encodes the behaviour. Shifting an argument translates the graph; multiplying by a constant scales it; composing functions composes transformations. Trigonometry is the study of one particularly important function pair — the coordinates of a point moving on a circle — so periodicity becomes visible rather than asserted.`, math: String.raw`(\cos\theta,\sin\theta)\ \text{on }x^{2}+y^{2}=1` },
      { title: `4 · Zooming in: the derivative`, text: `The derivative answers a question about arbitrarily small change: if you magnify a smooth curve near a point, what straight line does it resemble? The difference quotient measures an average slope over an interval h; letting h tend to zero converts an average into an instantaneous rate. Every differentiation rule is then a consequence of how limits interact with arithmetic — product, quotient and chain rules are algebra performed inside a limit.`, math: String.raw`f'(x)=\lim_{h\to0}\frac{f(x+h)-f(x)}{h}` },
      { title: `5 · Accumulation: the integral`, text: `Area under a curve is approximated by rectangles. Refining the partition turns a finite sum into a limit — an integral. The astonishing fact, the fundamental theorem of calculus, is that this accumulation process is the inverse of the zooming-in process. Differentiation and integration look like unrelated problems until you see they are two sides of one statement about local linearity.`, math: String.raw`\int_a^b f(x)\,dx=F(b)-F(a)\quad\Longleftrightarrow\quad F'=f` },
    ],
    essentialQuestions: [
      `Why must the real numbers be complete, and what breaks in ℚ?`,
      `Why does solving equations force us to enlarge our number system?`,
      `What does the graph of a function actually represent?`,
      `Why is area a limit, and why is that limit an antiderivative?`,
    ],
    themes: [`Extension by solving equations`, `Invariance under allowed transformations`, `Local-to-global through limits`, `Symbol, graph and number as three views of one idea`],
    rationale: {
      'natural-numbers': { question: `What is the smallest structure that supports counting?`, idea: `The successor operation generates ℕ; induction is the proof principle that comes with it.`, bridge: `Once you ask "what is left over?" you need parts — fractions.` },
      'fractions': { question: `How do we divide a whole into equal parts consistently?`, idea: `A fraction is an equivalence class of pairs; simplification is choosing a canonical representative.`, bridge: `Decimal notation makes those classes comparable by place value.` },
      'decimals': { question: `Can every fraction be written as an infinite process?`, idea: `Long division reveals terminating or repeating expansions, exposing the rational/irrational boundary.`, bridge: `Repeated ratios lead naturally to percentages and proportional reasoning.` },
      'ratios-proportions': { question: `How do we compare quantities that scale together?`, idea: `A proportion is equality of ratios; scaling preserves the invariant relationship.`, bridge: `Repeated multiplication is compactly expressed by exponents.` },
      'exponents-powers': { question: `What is repeated multiplication, and how do we undo it?`, idea: `Exponent laws turn multiplication into addition of exponents; roots and logs are their inverses.`, bridge: `The unknown exponent becomes an equation to solve.` },
      'variables': { question: `Can we reason about a number before knowing it?`, idea: `A variable is a placeholder subject to the same arithmetic laws as known numbers.`, bridge: `Once named, the unknown can be constrained by an equation.` },
      'equations': { question: `Which operations preserve the set of solutions?`, idea: `Equivalence transformations, not guesswork, are the engine of solving.`, bridge: `The simplest family is linear; quadratics need symmetry.` },
      'linear-equations': { question: `What does a straight-line constraint look like algebraically?`, idea: `Isolate the variable using inverse operations; the graph is a line and the solution is an intersection.`, bridge: `Patterns of dependence deserve their own object: the function.` },
      'functions-relations': { question: `How can dependence itself be studied?`, idea: `A function is a deterministic mapping; composition and inversion are its natural operations.`, bridge: `Cyclic dependence is measured by angle — hence trigonometry.` },
      'angles': { question: `How do we quantify rotation?`, idea: `Angles measure turn; radians measure arc length per radius, making calculus natural.`, bridge: `Coordinates on the unit circle turn rotation into functions.` },
      'trigonometric-functions': { question: `Can circular motion be described by functions?`, idea: `Sine and cosine are the coordinates of a rotating point, so periodicity is built in.`, bridge: `A moving point has a varying slope — the derivative question.` },
      'limits': { question: `What does it mean to approach a value without reaching it?`, idea: `The ε–δ definition converts intuition about closeness into a checkable statement.`, bridge: `Apply limits to difference quotients and to sums of rectangles.` },
      'derivatives': { question: `What line does a curve resemble when magnified indefinitely?`, idea: `The derivative is the limit of average slopes — a local linear approximation.`, bridge: `If slopes are known everywhere, can we recover the original change?` },
      'definite-integrals': { question: `How do we accumulate infinitely many tiny contributions?`, idea: `Riemann sums converge to an integral; the fundamental theorem links it back to derivatives.`, bridge: `This completes the zero-to-calculus ladder and opens every other path.` },
    },
    capstone: {
      title: `From counting to accumulation: derive the area under y = x²`,
      prompt: `Without using the power rule for integration, partition [0, 1] into n equal intervals, form upper and lower Riemann sums, compute both limits explicitly, and then explain why the fundamental theorem guarantees the same answer.`,
      deliverables: [`Explicit formula for the upper and lower sums`, `Both limits computed from first principles`, `A short argument connecting the two limiting values to an antiderivative`],
    },
  },

  'path-university': {
    firstPrinciple: `What does it mean for a mathematical statement to be true — and how can that certainty be transported across entirely different structures?`,
    worldview: `Undergraduate mathematics is where intuition is replaced by definition. Analysis makes "close" precise; algebra studies operations detached from any particular objects; discrete mathematics makes finite reasoning rigorous; probability axiomatises uncertainty; statistics turns uncertainty into evidence about the world. The unifying move is abstraction: once you define a vector space, every theorem you prove applies to arrows, polynomials, functions and signals at once. Once you define a metric space, convergence in ℝ, in function spaces and in probability are instances of one idea. Once you define a group, symmetries of an equation, of a crystal and of a permutation are the same object. The core curriculum trains two muscles simultaneously: prove, and recognise the same structure wearing different clothes.`,
    arc: [
      { title: `1 · Rigour as a tool, not a hurdle`, text: `The ε–δ definition of a limit is not pedantry; it is the precise statement of a game: for every tolerance you name, I can find a sufficiently small input change. Continuity becomes the preservation of closeness, and compactness turns local statements into global ones.`, math: String.raw`\forall\varepsilon>0\;\exists\delta>0:\;|x-a|<\delta\Rightarrow|f(x)-L|<\varepsilon` },
      { title: `2 · Structure without objects`, text: `A vector space is a set with addition and scaling satisfying eight axioms. That is all. The payoff is enormous: the same proof of linear independence works for geometric vectors, polynomials and function spaces. Matrices become coordinates of linear maps once a basis is chosen; eigenvalues become the invariants that survive every change of basis.`, math: String.raw`Av=\lambda v\;\Longleftrightarrow\;\det(A-\lambda I)=0` },
      { title: `3 · Proof as an engine`, text: `Propositional logic gives the grammar of implication; induction gives the ability to prove infinitely many statements with finitely many lines. These are not separate topics — induction is the proof principle that makes the natural numbers usable, and logic is the discipline that tells you exactly what your proof established.`, math: String.raw`P(1)\wedge\forall n\,(P(n)\Rightarrow P(n+1))\Rightarrow\forall n\,P(n)` },
      { title: `4 · Uncertainty made exact`, text: `Kolmogorov's axioms put probability inside measure theory: events are measurable sets, probability is a measure of total mass 1. Random variables are functions, expectation is an integral. Statistics then reverses the question: instead of deriving consequences from a known distribution, we infer the distribution from observed data, with controlled error rates.`, math: String.raw`\mathbb E[X]=\int_\Omega X\,dP` },
      { title: `5 · One convergence to rule them all`, text: `Metric spaces unify convergence across mathematics; groups unify symmetry. Recognising these two abstractions is the moment undergraduate mathematics becomes modern mathematics — you stop proving facts about objects and start proving facts about structures.`, math: String.raw`d(x,z)\le d(x,y)+d(y,z)` },
    ],
    essentialQuestions: [
      `What exactly is gained by replacing intuition with a definition?`,
      `Why do eigenvalues survive a change of basis while matrix entries do not?`,
      `How can a finite proof establish infinitely many cases?`,
      `In what sense is probability just measure theory with total mass one?`,
    ],
    themes: [`Abstraction as compression`, `Proof as the unit of knowledge`, `Structure preserved under maps`, `Local-to-global reasoning`],
    rationale: {
      'limits': { question: `How do we make "approaches" precise?`, idea: `Quantifier order turns a fuzzy notion into a testable definition.`, bridge: `Continuity is the same idea applied at a point.` },
      'continuity': { question: `What does it mean for a map to preserve closeness?`, idea: `Small input changes produce small output changes; the domain and codomain metrics do the work.`, bridge: `Continuous functions on compact sets behave especially well.` },
      'vector-spaces': { question: `What is common to arrows, polynomials and waveforms?`, idea: `Closure under addition and scaling — nothing else.`, bridge: `Coordinates require bases; bases require dimension.` },
      'matrices': { question: `How do we compute with a linear map?`, idea: `A matrix is the array of images of basis vectors; changing basis changes the array, not the map.`, bridge: `Some quantities survive every basis change — eigenvalues.` },
      'eigenvalues': { question: `Which directions does a map merely scale?`, idea: `Solve det(A − λI) = 0; trace and determinant constrain the answer.`, bridge: `Diagonalisation turns powers of maps into powers of numbers.` },
      'propositional-logic': { question: `What are the valid moves in a proof?`, idea: `Implication, quantifiers and negation have precise rules; contrapositive and contradiction are derived, not assumed.`, bridge: `Induction is the rule that reaches the infinite.` },
      'mathematical-induction': { question: `How can finitely many lines prove infinitely many cases?`, idea: `A base case plus a step that manufactures the next case from the current one.`, bridge: `Recursions, divisibility and algorithms all inherit this structure.` },
      'probability-axioms': { question: `What are the rules that any coherent uncertainty must obey?`, idea: `Nonnegativity, normalisation and countable additivity; everything else is theorem.`, bridge: `Random variables put those axioms to work.` },
      'random-variables': { question: `How do we do calculus on outcomes?`, idea: `A random variable transports mass from a sample space to numbers; distributions describe the result.`, bridge: `Expectation summarises that transported mass.` },
      'descriptive-statistics': { question: `How do we summarise data without lying?`, idea: `Centre, spread and shape; every summary discards information, so state what.`, bridge: `Inference asks whether an observed summary is surprising.` },
      'hypothesis-testing': { question: `When is an observation evidence against a claim?`, idea: `Define a null world, a test statistic and controlled error rates; a p-value is not the probability the null is true.`, bridge: `The same logic generalises to arbitrary metric spaces.` },
      'metric-spaces': { question: `What is the minimal structure needed for convergence?`, idea: `A distance satisfying positivity, symmetry and triangle inequality.`, bridge: `Forget the distance entirely and you have topology.` },
      'groups': { question: `What is common to all symmetries?`, idea: `A set with one associative operation, identity and inverses — structure with the elements forgotten.`, bridge: `Groups are the gateway to the pure path.` },
    },
    capstone: {
      title: `The structural diagnostic`,
      prompt: `Given the set of 2×2 real matrices with determinant 1, prove it forms a group under multiplication; exhibit a homomorphism into a group of linear maps on polynomials; and state precisely which property is preserved and which is lost.`,
      deliverables: [`Complete group verification`, `An explicit structure-preserving map`, `A short essay on what "same structure" means`],
    },
  },

  'path-pure': {
    firstPrinciple: `Which properties survive every allowable transformation — and can we prove it with no hidden assumptions?`,
    worldview: `Pure mathematics studies form divorced from matter. The move is to decide what structure you are keeping and what you are deliberately forgetting. Topology forgets distance and keeps open sets; algebra forgets the nature of the elements and keeps operations; category theory forgets even the elements and keeps the maps. What remains is invariant, and invariant means "true in every model of the structure". Proof is not a decoration on this process — it is the only way to know that a property is genuinely invariant rather than an accident of representation. This path builds the three great engines of modern mathematics: analysis of the infinite (measure, Banach and Hilbert spaces), algebra of structure (groups, rings, fields, Galois theory), and topology of shape (spaces, homotopy, homology), then shows how complex analysis and functional analysis bind them together.`,
    arc: [
      { title: `1 · Proof before theory`, text: `Direct proof, contradiction, contrapositive, induction and invariants are not styles; they are different ways of exploiting the logical form of a statement. Learning to choose the right one is the first real act of mathematical maturity.`, math: String.raw`P\Rightarrow Q\quad\equiv\quad \neg Q\Rightarrow\neg P` },
      { title: `2 · From distance to shape`, text: `A metric gives convergence; a topology keeps only the open sets. Compactness survives the forgetting: every open cover has a finite subcover. Fundamental groups then attach algebra to holes, turning "a circle is not a disk" into a computable group.`, math: String.raw`\pi_1(S^1)\cong\mathbb{Z}` },
      { title: `3 · The algebraic dictionary`, text: `Groups measure symmetry, rings measure arithmetic, fields measure solvability. Galois theory is the surprising theorem that intermediate fields of a field extension correspond, upside down, to subgroups of the automorphism group — a dictionary between two apparently unrelated worlds.`, math: String.raw`\{\text{fields }M\}\longleftrightarrow\{\text{subgroups }H\le\operatorname{Gal}(L/K)\}` },
      { title: `4 · Rigidity of the complex world`, text: `Complex differentiability is a vastly stronger condition than real differentiability: one equation implies analyticity, contour independence and the residue theorem. Holomorphic functions are rigid — their behaviour on a small disc determines them everywhere.`, math: String.raw`\oint_\gamma f(z)\,dz=2\pi i\sum\operatorname{Res}(f,a_k)` },
      { title: `5 · Infinite dimensions`, text: `Banach spaces add completeness to normed spaces, enabling analysis of operators; Hilbert spaces add an inner product, enabling orthogonality, projection and spectral decomposition in infinite dimensions. This is the natural home of quantum mechanics and of much of modern PDEs.`, math: String.raw`\langle x,y\rangle\ \text{with}\ \|x\|=\sqrt{\langle x,x\rangle}` },
    ],
    essentialQuestions: [
      `What do you lose — and gain — when you forget the metric?`,
      `Why is complex differentiability so much more powerful than real differentiability?`,
      `How can a group encode the solvability of a polynomial?`,
      `What makes an infinite-dimensional space behave like a finite-dimensional one?`,
    ],
    themes: [`Invariance under isomorphism`, `Proof as construction`, `Forgetfulness as a method`, `Duality between algebra and geometry`],
    rationale: {
      'propositional-logic': { question: `What exactly follows from what?`, idea: `Logical form, not intuition, determines valid inference.`, bridge: `Induction needs a formal statement to induct on.` },
      'mathematical-induction': { question: `How do we prove statements about all naturals?`, idea: `Base plus successor step; strong induction when the step needs earlier cases.`, bridge: `Convergence proofs need structures beyond the naturals.` },
      'metric-spaces': { question: `What is the least structure supporting limits?`, idea: `A distance with triangle inequality; open balls generate the topology.`, bridge: `Dropping the distance leaves the topological essence.` },
      'compactness': { question: `When does local imply global?`, idea: `Finite subcovers extract finite control from infinite covers.`, bridge: `Group theory will provide a different kind of global control.` },
      'groups': { question: `What is symmetry in the abstract?`, idea: `One associative operation with identity and inverses; substructures and quotients reveal the shape.`, bridge: `Two operations create rings.` },
      'rings': { question: `What happens when addition and multiplication coexist?`, idea: `Ideals play the role of divisibility; quotient rings are the new objects.`, bridge: `Invertibility of nonzero elements gives fields.` },
      'fields': { question: `When can we divide by everything nonzero?`, idea: `A field is a ring where every nonzero element is a unit; extensions add new roots.`, bridge: `Which extensions come from adjoining roots? Galois theory answers.` },
      'galois-theory': { question: `Why are some polynomials solvable by radicals?`, idea: `Attach the automorphism group of the splitting field; solvable groups correspond to radical towers.`, bridge: `Topology attaches groups to spaces in an analogous spirit.` },
      'topological-spaces': { question: `Can continuity survive without distance?`, idea: `Define continuity by inverse images of open sets.`, bridge: `Loops in the space become algebraic objects.` },
      'fundamental-groups': { question: `How do we detect a hole?`, idea: `Classify loops up to homotopy; the circle yields ℤ, the sphere yields 0.`, bridge: `Complex analysis supplies a rigid analytic world to compare.` },
      'holomorphic-functions': { question: `What is special about complex differentiability?`, idea: `Cauchy–Riemann plus contour integration gives infinite differentiability and power series.`, bridge: `Singularities lead to residues and global integral formulas.` },
      'residue-theorem': { question: `Can a contour integral be computed locally?`, idea: `Only the coefficients of (z − a)⁻¹ matter; sum residues inside the contour.`, bridge: `The same operator viewpoint generalises to Banach spaces.` },
      'banach-spaces': { question: `How do we do analysis on functions?`, idea: `Completeness makes limits of Cauchy sequences exist inside the space.`, bridge: `Add an inner product for geometry in infinite dimensions.` },
      'hilbert-spaces': { question: `What survives of Euclidean geometry infinitely far up?`, idea: `Orthogonal projection, orthonormal bases and the spectral theorem.`, bridge: `This is the language of quantum theory and modern PDEs.` },
    },
    capstone: {
      title: `An original proof with a stated structure`,
      prompt: `Choose two structures on this path (for example a compact metric space and a group action). Prove one genuine theorem connecting them, write the proof in the Proof Studio, and identify precisely which hypotheses were used and which could be weakened.`,
      deliverables: [`A complete proof with explicit hypotheses`, `A checklist audit`, `A paragraph on what generalisation fails and why`],
    },
  },

  'path-applied': {
    firstPrinciple: `Given a real system, which idealisations make it solvable — and what does the solution actually predict about the world?`,
    worldview: `Applied mathematics is a loop, not a collection of techniques. You observe a system, decide which effects matter, write local laws (usually differential equations), analyse existence and stability, compute an approximation, compare with reality, and revise the model. The deepest applied insight is that the idealisation is part of the claim: a model that ignores viscosity or delay is not "approximately right" in all regimes — it is a different statement whose validity has a boundary. Continuum limits turn discrete interactions into PDEs; conservation laws turn symmetries into equations; asymptotics separate scales; optimisation chooses among admissible designs; numerical analysis tells you whether your computer answered the equation you meant to solve.`,
    arc: [
      { title: `1 · Local laws, global futures`, text: `An ODE states a rule for instantaneous change: y′ = f(y). An initial condition selects one trajectory. Existence and uniqueness are not technicalities — they are the mathematical version of determinism for the model.`, math: String.raw`y'=f(y),\quad y(0)=y_0` },
      { title: `2 · When space matters`, text: `A PDE adds spatial coupling. The heat equation says the rate of temperature change is proportional to curvature of the temperature profile; the wave equation says acceleration is proportional to spatial curvature. The difference is first versus second order in time, and it changes the physics completely.`, math: String.raw`u_t=\alpha u_{xx}\qquad\text{versus}\qquad u_{tt}=c^{2}u_{xx}` },
      { title: `3 · The discrete bridge`, text: `Computers cannot solve continuum equations directly. Discretising space and time produces a recurrence; consistency, stability and convergence are the three questions that decide whether the recurrence approximates the original problem.`, math: String.raw`u_i^{n+1}=u_i^{n}+r\left(u_{i+1}^{n}-2u_i^{n}+u_{i-1}^{n}\right)` },
      { title: `4 · Choosing the best admissible solution`, text: `Optimisation asks which of the allowed configurations minimises a cost. Lagrange multipliers express the geometric fact that at a constrained optimum the gradients align; convexity is the property that makes a local answer global.`, math: String.raw`\nabla f=\lambda\nabla g` },
      { title: `5 · Qualitative understanding`, text: `Dynamical systems and asymptotics answer questions that formulas cannot: are equilibria stable, do solutions blow up, what happens when a parameter crosses a bifurcation value, and which terms dominate at small or large scale?`, math: String.raw`x_{n+1}=r\,x_n(1-x_n)` },
    ],
    essentialQuestions: [
      `Which neglected effects are harmless, and which change the answer qualitatively?`,
      `Why does an explicit heat solver fail when the time step is too large?`,
      `When is a numerical answer evidence, and when is it an artefact?`,
      `What does the sign of a Lyapunov exponent tell you about prediction?`,
    ],
    themes: [`Model → analyse → compute → validate`, `Consistency, stability, convergence`, `Conservation and symmetry`, `Scale separation and asymptotics`],
    rationale: {
      'ode': { question: `Can a local rule determine a whole trajectory?`, idea: `Existence and uniqueness under Lipschitz conditions; phase portraits for qualitative insight.`, bridge: `Add spatial variation and the rule becomes a PDE.` },
      'pde': { question: `How do local laws propagate through a continuum?`, idea: `Classification by type — elliptic, parabolic, hyperbolic — predicts boundary/initial data needs.`, bridge: `The heat equation is the simplest parabolic archetype.` },
      'heat-equation': { question: `Why does diffusion smooth everything out?`, idea: `High Fourier modes decay fastest; separation of variables makes this exact.`, bridge: `Exact solutions rarely exist, so we compute — and must control error.` },
      'numerical-errors': { question: `How wrong is a floating-point answer?`, idea: `Distinguish truncation error from roundoff; condition number amplifies both.`, bridge: `Root-finding is the simplest setting where these errors interact.` },
      'root-finding': { question: `How do we locate a zero we cannot write down?`, idea: `Bracketing gives guarantees; Newton gives speed but local convergence.`, bridge: `Every iterative method needs a stability analysis.` },
      'stability-convergence': { question: `Why doesn't a smaller step always help?`, idea: `Consistency plus stability implies convergence (Lax equivalence in the linear case).`, bridge: `Optimisation algorithms need the same analysis.` },
      'convex-optimization': { question: `When is the local best the global best?`, idea: `Convexity and strong convexity give certificates and rates.`, bridge: `Constraints require a geometric condition for optimality.` },
      'lagrange-multipliers': { question: `How do we optimise on a constraint surface?`, idea: `At optimum the gradients are parallel; KKT extends this to inequalities.`, bridge: `Constrained dynamics reveals qualitative behaviour.` },
      'dynamical-systems': { question: `Can we predict without solving?`, idea: `Fixed points, stability and bifurcations organise the long-term behaviour.`, bridge: `Extreme scales need asymptotic methods.` },
      'asymptotic-analysis': { question: `Which terms matter in the limit?`, idea: `Dominant balance, matched expansions and error ordering.`, bridge: `This closes the modelling loop with a defensible approximation.` },
    },
    capstone: {
      title: `Validate a numerical solver for a nonlinear model`,
      prompt: `Choose a nonlinear ODE or a 1D PDE, implement two discretisations, prove or state the stability condition for each, and compare against an exact or high-resolution reference. Report where the model — not the code — is wrong.`,
      deliverables: [`Two working solvers`, `Convergence study with rates`, `A written discussion of modelling assumptions and failure regimes`],
    },
  },

  'path-ai': {
    firstPrinciple: `How can a composition of simple linear maps and nonlinearities represent complex functions, generalise from limited data, and be optimised at all?`,
    worldview: `Modern machine learning is three old mathematical ideas meeting at scale. Linear algebra supplies representation: vectors, matrices, tensors and the singular value decomposition describe what a network can store. Calculus supplies learning: gradients of compositions are computed by the chain rule, which is exactly backpropagation. Probability supplies inference: uncertainty, likelihood and Bayes' theorem tell us what it means to learn from evidence. Information theory measures uncertainty and discrepancy; optimisation explains why a loss can be minimised; statistical learning theory asks why a fitted model works on unseen data. The transformer is the clearest example: attention is a differentiable, matrix-multiplication-based lookup with a softmax, and the whole architecture is a composition of linear maps and pointwise nonlinearities. Nothing magical — just mathematics composed at enormous scale.`,
    arc: [
      { title: `1 · Representation is linear algebra`, text: `A layer computes Wx + b. Composition of layers is composition of affine maps, and inserting a nonlinearity is what prevents the whole network from collapsing into a single linear map. The SVD tells us which directions carry variance and why low-rank structure is so useful.`, math: String.raw`a^{(l+1)}=\sigma\left(W^{(l)}a^{(l)}+b^{(l)}\right)` },
      { title: `2 · Learning is calculus`, text: `Backpropagation is the chain rule applied in reverse order across a computation graph. Matrix calculus keeps the shapes straight; gradient descent takes steps opposite the gradient of a loss. Everything about learning rates, momentum and preconditioning is a statement about the geometry of that loss surface.`, math: String.raw`\theta_{t+1}=\theta_t-\eta\nabla_\theta\mathcal{L}(\theta)` },
      { title: `3 · Inference is probability`, text: `A model is a family of distributions p(y|x, θ). Maximum likelihood, Bayesian updating and expectation-maximisation are all consequences of treating learning as inference. Entropy and KL divergence quantify uncertainty and the cost of using the wrong distribution.`, math: String.raw`D_{\mathrm{KL}}(p\|q)=\mathbb E_p\left[\log\frac{p}{q}\right]\ge0` },
      { title: `4 · Generalisation is the real question`, text: `Fitting training data is easy; performing on unseen data is the theorem-worthy part. Capacity control, regularisation, margin bounds and double-descent phenomena show that the classical bias–variance picture is incomplete but still organising.`, math: String.raw`\mathcal{R}(f)\le\widehat{\mathcal{R}}(f)+\text{complexity term}` },
      { title: `5 · Architecture is mathematics`, text: `Attention computes weighted averages of values using similarities between queries and keys. The scaling by √dₖ keeps variances stable. Layer normalisation, residuals and positional encodings are design choices with precise mathematical effects on conditioning and equivariance.`, math: String.raw`\operatorname{Attention}(Q,K,V)=\operatorname{softmax}\!\left(\frac{QK^{T}}{\sqrt{d_k}}\right)V` },
    ],
    essentialQuestions: [
      `Why is a nonlinearity necessary for depth to matter?`,
      `In what sense is backpropagation just the chain rule?`,
      `Why can a model that fits training data still fail on new data?`,
      `What is attention computing, geometrically?`,
    ],
    themes: [`Representation, optimisation, inference as three threads`, `Compositionality`, `Geometry of loss landscapes`, `Uncertainty and information`],
    rationale: {
      'vectors': { question: `What is the natural data type for learning?`, idea: `A vector is a point with direction and magnitude; geometry gives distance and angle.`, bridge: `Matrices transform vectors in bulk.` },
      'matrix-multiplication': { question: `How do layers compose?`, idea: `Matrix multiplication is composition of linear maps; shape compatibility encodes composability.`, bridge: `Some maps have invariant directions worth finding.` },
      'eigenvalues': { question: `Which directions does a linear map preserve?`, idea: `Eigenpairs reveal invariant subspaces and control dynamics.`, bridge: `The singular value decomposition generalises this to non-square maps.` },
      'svd': { question: `What is the best low-rank approximation of data?`, idea: `SVD factors a matrix into rotations and scaling; truncating smallest singular values is optimal.`, bridge: `Differentiation is needed to adjust the maps.` },
      'partial-derivatives': { question: `How does a loss change when one parameter moves?`, idea: `Partial derivatives isolate one coordinate's contribution.`, bridge: `Collect them into a gradient for efficient descent.` },
      'gradient': { question: `Which direction reduces the loss fastest?`, idea: `The negative gradient is steepest local descent and is perpendicular to level sets.`, bridge: `Chain rule propagates it through layers.` },
      'matrix-calculus': { question: `How do we differentiate with respect to a whole matrix?`, idea: `Track dimensions and use differentials; dL = tr(Gᵀ dW) identifies the gradient.`, bridge: `This is the machinery of backpropagation.` },
      'probability-distributions': { question: `How do we model uncertainty about data?`, idea: `Distributions assign mass or density; likelihood scores a model against observations.`, bridge: `A single number summary of a distribution is its expectation.` },
      'expectation': { question: `What is the average behaviour of a random model?`, idea: `Expectation is linear; variance measures spread around it.`, bridge: `Updating expectations with evidence is Bayes' rule.` },
      'bayes-theorem': { question: `How should a belief change after seeing data?`, idea: `Posterior ∝ likelihood × prior; normalisation makes it a distribution.`, bridge: `Repeated updating is a form of optimisation.` },
      'gradient-descent': { question: `How do we find good parameters?`, idea: `Repeated small steps against the gradient; convergence depends on curvature.`, bridge: `Convexity gives the cleanest guarantees.` },
      'convex-optimization': { question: `When is optimisation trustworthy?`, idea: `Convex losses have no spurious local minima; strong convexity gives linear rates.`, bridge: `Not all relevant quantities are losses — some are uncertainties.` },
      'shannon-entropy': { question: `How much uncertainty is in a variable?`, idea: `Expected surprise; maximum entropy is the least-committal distribution under constraints.`, bridge: `Comparing two distributions needs a divergence.` },
      'kl-divergence': { question: `How costly is it to use q when nature uses p?`, idea: `KL is nonnegative, asymmetric, and equals cross-entropy minus entropy.`, bridge: `These bounds feed into generalisation theory.` },
      'statistical-learning-theory-ai': { question: `Why does a trained model work on unseen data?`, idea: `Capacity, concentration and complexity terms bound the gap between empirical and true risk.`, bridge: `Architecture determines capacity in practice.` },
      'transformers-math': { question: `What mathematics is a attention layer?`, idea: `Scaled dot products produce a softmax weighting over values — differentiable matrix algebra.`, bridge: `This is where all previous threads compose.` },
    },
    capstone: {
      title: `Derive the gradient of a transformer block`,
      prompt: `Write down the forward pass of one attention head with parameters W_Q, W_K, W_V. Derive the gradient of a scalar loss with respect to each matrix using differentials, stating every shape, and explain how the √dₖ scaling affects the variance of the attention logits.`,
      deliverables: [`Full forward pass with dimensions`, `Three gradient derivations`, `A variance argument for the scaling factor`],
    },
  },

  'path-physics': {
    firstPrinciple: `What mathematical structure must a physical law have so that it means the same thing to every observer?`,
    worldview: `Physics does not merely use mathematics; it constrains it. A law must be expressible in quantities that transform consistently under changes of coordinates, reference frame or basis. That requirement leads directly to tensors. Local conservation of energy and momentum leads to differential equations; symmetries of the action lead to conserved quantities by Noether's theorem; the equivalence of inertial frames leads to Lorentz transformations and Minkowski geometry; the equivalence of all coordinate systems leads to Riemannian geometry and general relativity. Quantum theory replaces numbers with operators on Hilbert spaces, so spectra become observable values. Complex analysis enters because wave amplitudes and propagators are naturally holomorphic objects. The through-line is invariance: physics is the study of what does not change when everything permissible changes.`,
    arc: [
      { title: `1 · Local laws and integral identities`, text: `Vector calculus packages local differential relations into global integral statements. Green's, Stokes' and divergence theorems say that a derivative integrated over a region equals a flux around its boundary — the mathematical form of conservation.`, math: String.raw`\oint_{\partial\Omega}\omega=\int_{\Omega}d\omega` },
      { title: `2 · Operators and spectra`, text: `Observables are self-adjoint operators; measured values are eigenvalues. Diagonalisation is therefore not a computational trick but the statement that a quantity has definite values in a particular basis.`, math: String.raw`\hat A\psi=a\psi` },
      { title: `3 · The complex engine`, text: `Contour integration and residues evaluate real integrals that are otherwise intractable, and analytic continuation is the natural language of propagators and response functions.`, math: String.raw`\int_{-\infty}^{\infty}\frac{dx}{1+x^{4}}=\frac{\pi}{\sqrt2}` },
      { title: `4 · Geometry becomes gravity`, text: `A metric tensor defines lengths and times; its Levi-Civita connection defines straightest possible paths; curvature measures the failure of parallel transport to return a vector unchanged. Einstein's equations equate curvature to energy and momentum.`, math: String.raw`G_{\mu\nu}+\Lambda g_{\mu\nu}=\frac{8\pi G}{c^{4}}T_{\mu\nu}` },
      { title: `5 · Infinite dimensions and quantum theory`, text: `Hilbert spaces give the precise setting for superpositions, inner products and the spectral theorem; Banach spaces support the analysis of operators and unbounded observables.`, math: String.raw`\langle\psi|\psi\rangle=1` },
    ],
    essentialQuestions: [
      `Why must a physical law be written in tensorial form?`,
      `How does a symmetry produce a conservation law?`,
      `What is curvature, intrinsically, without referring to an embedding?`,
      `Why are eigenvalues the mathematical image of measurement?`,
    ],
    themes: [`Invariance under frame change`, `Local laws and boundary fluxes`, `Symmetry → conservation`, `Spectra as observables`],
    rationale: {
      'multivariable-calculus': { question: `How do fields change in space?`, idea: `Partial derivatives and the gradient generalise slope to several variables.`, bridge: `Directional change is best organised as a vector field.` },
      'vector-fields': { question: `How do we draw a law that assigns an arrow to every point?`, idea: `A vector field is a section; its flow integrates local directions into trajectories.`, bridge: `Flux through a boundary is the integral counterpart.` },
      'greens-theorem': { question: `How is a local derivative related to a global boundary?`, idea: `The integral theorems convert volume integrals of derivatives into boundary integrals.`, bridge: `This is the prototype of all conservation laws.` },
      'linear-transformations': { question: `What is a coordinate change, really?`, idea: `A linear map between vector spaces; tensors are defined by how their components transform.`, bridge: `Invariant quantities are eigenvalues and spectra.` },
      'spectral-theorem': { question: `When can an operator be diagonalised?`, idea: `Self-adjoint operators have orthonormal eigenbases — the mathematical basis of measurement.`, bridge: `Complex methods compute spectra and propagators.` },
      'holomorphic-functions': { question: `Why do complex methods simplify physical integrals?`, idea: `Analyticity forces contour independence; residues isolate contributions from poles.`, bridge: `Residue calculus is the computational payoff.` },
      'residue-theorem': { question: `How do we evaluate oscillatory and rational integrals?`, idea: `Close a contour and sum residues; pole locations encode physical resonances.`, bridge: `Curved spacetime needs more general tensors.` },
      'tensor-algebra': { question: `What object is independent of coordinates?`, idea: `Tensors are multilinear maps whose components transform covariantly or contravariantly.`, bridge: `A metric is a particular (0,2) tensor.` },
      'metric-tensors': { question: `How do we measure distance on a curved manifold?`, idea: `A smoothly varying inner product on tangent spaces defines lengths, angles and volume.`, bridge: `Straightest paths follow from the metric.` },
      'geodesics': { question: `What is a straight line in curved space?`, idea: `Curves whose tangent is parallel-transported; extremals of the length functional.`, bridge: `Their deviation measures curvature.` },
      'curvature': { question: `How does a manifold bend, intrinsically?`, idea: `Commutator of covariant derivatives; Riemann tensor and its contractions.`, bridge: `Infinite-dimensional analysis underlies quantum theory.` },
      'banach-spaces': { question: `Where do operators on function spaces live?`, idea: `Complete normed spaces make limits of functions well behaved.`, bridge: `Hilbert spaces add the inner product physics needs.` },
    },
    capstone: {
      title: `Derive geodesic equations for a chosen metric`,
      prompt: `Take a two-dimensional metric of your choice (for example the Poincaré half-plane). Compute the Christoffel symbols, write the geodesic equations, and verify that the resulting curves are circles orthogonal to the boundary.`,
      deliverables: [`Christoffel symbols computed step by step`, `Geodesic equations`, `A geometric verification of the result`],
    },
  },

  'path-computational': {
    firstPrinciple: `Which mathematical questions can be settled by a finite mechanical procedure — and for the rest, how accurately can we approximate the answer?`,
    worldview: `Computational mathematics sits between logic and the continuum. On the discrete side, set theory, induction and recursion define what an algorithm is; graph theory gives the structures algorithms act on; computability and complexity say what can be done and at what cost. On the continuous side, floating-point arithmetic is a finite model of the reals, so every numerical method is a statement about how errors propagate through that model. Discretisation replaces derivatives by differences and integrals by sums; the central trio — consistency, stability, convergence — decides whether the computation says anything about the original equation. The discipline is therefore not programming: it is knowing which statements about a computed number are theorems and which are hopes.`,
    arc: [
      { title: `1 · The finite foundation`, text: `Sets, induction and recursion are the three pillars: sets give the objects, induction proves properties of all finite cases, and recursion defines computable functions.`, math: String.raw`f(0)=0,\quad f(n+1)=f(n)+1` },
      { title: `2 · Structures and algorithms`, text: `Graphs encode relationships; shortest paths and traversals are proofs of optimality expressed as procedures. Complexity theory measures the resources a proof-as-program consumes.`, math: String.raw`d(v)=\min_{u\sim v}\bigl(d(u)+w(u,v)\bigr)` },
      { title: `3 · The finite model of the reals`, text: `Floating-point numbers are a discrete, non-uniform grid. Rounding error is unavoidable; conditioning determines whether a problem amplifies it, and stability determines whether an algorithm adds more.`, math: String.raw`\mathrm{fl}(x)=x(1+\delta),\qquad|\delta|\le u` },
      { title: `4 · From derivatives to differences`, text: `Interpolation replaces a function by a polynomial through sample points; differentiation and integration formulas come from differentiating or integrating that polynomial. Truncation error is controlled by the next derivative.`, math: String.raw`f'(x)\approx\frac{f(x+h)-f(x-h)}{2h}+O(h^{2})` },
      { title: `5 · The convergence contract`, text: `For a well-posed problem, consistency plus stability gives convergence. This is the theorem that turns a numerical experiment into mathematical evidence.`, math: String.raw`\text{consistency}+\text{stability}\Rightarrow\text{convergence}` },
    ],
    essentialQuestions: [
      `What does it mean for a procedure to be finite and mechanical?`,
      `Why is a numerically stable algorithm on an ill-conditioned problem still unreliable?`,
      `When does a smaller step size make the answer worse?`,
      `What is the difference between an empirical convergence plot and a proof?`,
    ],
    themes: [`Finite procedures and their limits`, `Error as a mathematical object`, `Discretisation and convergence`, `Optimisation as computation`],
    rationale: {
      'set-theory': { question: `What are the objects computation manipulates?`, idea: `Sets and relations provide the vocabulary; cardinality distinguishes finite from infinite.`, bridge: `Induction reasons over the finite cases.` },
      'mathematical-induction': { question: `How do we prove a loop correct for every iteration?`, idea: `An invariant plus an inductive step is the proof of a loop.`, bridge: `Recursion is induction turned into a definition.` },
      'recursion': { question: `Can a function be defined by its own earlier values?`, idea: `Well-founded recursion guarantees termination and uniqueness.`, bridge: `Graphs are the natural recursive data structure.` },
      'graph-theory': { question: `How do we encode relationships?`, idea: `Vertices and edges; degree, connectivity and paths are the basic invariants.`, bridge: `Algorithms need procedures on these structures.` },
      'graph-algorithms': { question: `What is the optimal route?`, idea: `Dijkstra's greedy invariant proves optimality for nonnegative weights.`, bridge: `Continuous problems also need algorithms.` },
      'root-finding': { question: `How does a machine solve an equation?`, idea: `Bracketing guarantees convergence; Newton's method trades guarantees for speed.`, bridge: `Every iteration inherits floating-point error.` },
      'interpolation': { question: `How do we reconstruct a function from samples?`, idea: `Fit a polynomial; error depends on the next derivative and node placement.`, bridge: `Differentiation and quadrature formulas follow directly.` },
      'numerical-linear-algebra-num': { question: `How do we solve huge linear systems reliably?`, idea: `Factorisations, pivoting and condition numbers; stability is about backward error.`, bridge: `ODE solvers reduce to repeated linear solves.` },
      'numerical-ode': { question: `How do we step a differential equation forward?`, idea: `One-step methods approximate the flow; local error accumulates into global error.`, bridge: `Stability regions determine usable step sizes.` },
      'stability-convergence': { question: `Why can a consistent method still fail?`, idea: `Amplification of perturbations must be bounded; Lax equivalence for linear problems.`, bridge: `Optimisation is another iterative process.` },
      'numerical-optimization': { question: `How do machines find minima?`, idea: `Descent directions, step-size rules and convergence to stationary points.`, bridge: `This closes the loop from discrete proof to continuous approximation.` },
    },
    capstone: {
      title: `Benchmark two solvers with a convergence proof`,
      prompt: `Implement two numerical methods for the same differential equation. For each, state the local truncation error, derive the stability restriction, and produce a log–log convergence plot. Explain which observed rate is explained by theory and which is not.`,
      deliverables: [`Two implementations`, `Derivation of stability conditions`, `A convergence study with interpretation`],
    },
  },

  'path-olympiad': {
    firstPrinciple: `Using only elementary tools, what is the deepest thing you can prove about integers, shapes and choices?`,
    worldview: `Olympiad mathematics is a laboratory for pure reasoning under constraints. You are forbidden the heavy machinery of advanced theory, so you must find the one idea that makes the problem collapse: an invariant that cannot change, an extremal object that must exist, a clever pairing, a descent that cannot continue forever, a construction that achieves a bound exactly. This style is not a precursor to "real" mathematics — it is the distilled essence of it. The same instinct drives research: find the right representation, isolate the obstruction, prove sharpness. The four classical pillars — number theory, combinatorics, geometry and inequalities — are deliberately elementary in statement and often profound in solution.`,
    arc: [
      { title: `1 · Integers have structure`, text: `Primes are the atoms; congruences let us reason about remainders instead of sizes; Diophantine equations ask which integer solutions exist. The decisive tool is often descent: if a smaller solution always exists, no minimal one can.`, math: String.raw`\sqrt2=\frac pq\Rightarrow p,q\text{ both even}\Rightarrow\text{contradiction}` },
      { title: `2 · Counting is proof`, text: `Counting the same set in two ways produces identities. Pigeonhole turns "too many objects, too few boxes" into existence; inclusion–exclusion repairs overcounting.`, math: String.raw`|A\cup B|=|A|+|B|-|A\cap B|` },
      { title: `3 · Geometry without coordinates`, text: `Synthetic proof asks which relations are forced by the axioms alone: similar triangles, cyclic quadrilaterals, power of a point. The discipline is to find the auxiliary construction that reveals them.`, math: String.raw`PT^{2}=PA\cdot PB` },
      { title: `4 · Sharpness is the whole point`, text: `An inequality is not understood until you know when equality holds. AM–GM, Cauchy–Schwarz and rearrangement are not tricks: they are statements about convexity and inner products, and equality conditions identify the extremal configuration.`, math: String.raw`\left(\sum a_i b_i\right)^{2}\le\left(\sum a_i^{2}\right)\left(\sum b_i^{2}\right)` },
    ],
    essentialQuestions: [
      `What invariant survives every allowed move?`,
      `Which extremal object makes the bound inevitable?`,
      `Can you construct an example where equality holds?`,
      `Why does a descent argument prove non-existence?`,
    ],
    themes: [`Invariants and monovariants`, `Extremal principle`, `Double counting`, `Sharpness and equality cases`],
    rationale: {
      'prime-numbers': { question: `What are the atoms of multiplication?`, idea: `Unique factorisation; infinitude of primes by Euclid's construction.`, bridge: `Congruences let us study primes through remainders.` },
      'modular-arithmetic': { question: `Can we ignore size and keep only remainders?`, idea: `Congruence classes form a ring; invertible residues form a group.`, bridge: `Equations in that ring are Diophantine problems.` },
      'diophantine-equations': { question: `Which integer solutions exist?`, idea: `gcd obstructions, modular obstructions, infinite descent and constructive parametrisation.`, bridge: `Counting arguments solve existence questions of a different kind.` },
      'combinatorics': { question: `How many configurations are possible?`, idea: `Product, sum and bijection principles; count twice for identities.`, bridge: `Pigeonhole is the simplest existence tool from counting.` },
      'pigeonhole-principle': { question: `When does "too many" force a coincidence?`, idea: `More objects than boxes guarantees a shared box.`, bridge: `Overlapping sets need inclusion–exclusion.` },
      'inclusion-exclusion': { question: `How do we fix double counting?`, idea: `Alternate signs over intersections; the formula is a combinatorial identity.`, bridge: `Geometric configuration counting uses the same logic.` },
      'triangles': { question: `Which relations are forced by three sides?`, idea: `Congruence, similarity, angle sums and classical centres.`, bridge: `Circles add the power of cyclic structure.` },
      'circles': { question: `What is invariant under a circle?`, idea: `Inscribed angles, tangents and power of a point.`, bridge: `Choosing the right auxiliary line turns a circle problem into a proof.` },
      'geometric-proofs': { question: `How do we prove without measuring?`, idea: `Construct auxiliary objects and chain axioms; diagrams suggest, logic proves.`, bridge: `Inequalities provide the algebraic counterpart of extremal geometry.` },
      'algebraic-inequalities': { question: `How sharp can a bound be?`, idea: `AM–GM, Cauchy–Schwarz and equality-case analysis.`, bridge: `Recursive sequences hide the same extremal structure.` },
      'recurrence-relations': { question: `Can a sequence's long-term behaviour be predicted from its rule?`, idea: `Find closed forms or invariants; monotonicity and boundedness force convergence.`, bridge: `This returns to number theory with the same toolset, one level deeper.` },
    },
    capstone: {
      title: `Six unseen problems, six complete proofs`,
      prompt: `Select six problems from the International bank spanning at least three pillars. Solve them without reading the solutions, then for each identify the single decisive idea and state whether the proof is constructive, extremal or invariant-based.`,
      deliverables: [`Six complete proofs`, `A classification of the decisive idea in each`, `One original variation you can prove`],
    },
  },
}

export const LEARNING_PATHS: LearningPath[] = BASE_LEARNING_PATHS.map(p => {
  const study = STUDIES[p.id]
  if (!study) throw new Error(`Missing study atlas for learning path ${p.id}`)
  const missing = p.topicIds.filter(t => !study.rationale[t])
  if (missing.length) throw new Error(`Missing rationale in ${p.id}: ${missing.join(', ')}`)
  return { ...p, study }
})
