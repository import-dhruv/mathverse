import { seeded } from './useCanvas'

export type Params = Record<string, number>
export type Readout = Record<string, string>
export type Renderer = (
  ctx: CanvasRenderingContext2D, w: number, h: number,
  t: number, dt: number, p: Params, out: Readout,
) => void

const C = {
  grid: 'rgba(120,150,200,.09)', axis: 'rgba(150,175,215,.38)', text: '#8fa0bb',
  blue: '#6ea8ff', cyan: '#4fd1c5', amber: '#ffb454', red: '#ff7a90',
  violet: '#b98cff', green: '#7fe0a8', white: '#e6edfa',
}

type Mapper = { X: (x: number) => number; Y: (y: number) => number }
function mappers(w: number, h: number, xmin: number, xmax: number, ymin: number, ymax: number, pad = 42): Mapper {
  return {
    X: x => pad + (x - xmin) / (xmax - xmin) * (w - 2 * pad),
    Y: y => h - pad - (y - ymin) / (ymax - ymin) * (h - 2 * pad),
  }
}
function grid(ctx: CanvasRenderingContext2D, w: number, h: number, step = 40) {
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1; ctx.beginPath()
  for (let x = 0; x <= w; x += step) { ctx.moveTo(x, 0); ctx.lineTo(x, h) }
  for (let y = 0; y <= h; y += step) { ctx.moveTo(0, y); ctx.lineTo(w, y) }
  ctx.stroke()
}
function label(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color = C.text, size = 11) {
  ctx.fillStyle = color; ctx.font = `${size}px "JetBrains Mono", monospace`; ctx.fillText(text, x, y)
}
function line(ctx: CanvasRenderingContext2D, pts: [number, number][], color: string, width = 2, glow = 0) {
  if (pts.length < 2) return
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineJoin = 'round'; ctx.lineCap = 'round'
  if (glow) { ctx.shadowColor = color; ctx.shadowBlur = glow }
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1])
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1])
  ctx.stroke(); ctx.restore()
}
function arrow(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, width = 2) {
  line(ctx, [[x1, y1], [x2, y2]], color, width)
  const a = Math.atan2(y2 - y1, x2 - x1), s = 7
  ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(x2, y2)
  ctx.lineTo(x2 - s * Math.cos(a - .42), y2 - s * Math.sin(a - .42))
  ctx.lineTo(x2 - s * Math.cos(a + .42), y2 - s * Math.sin(a + .42)); ctx.fill()
}
function dot(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, glow = 10) {
  ctx.save(); ctx.fillStyle = color; ctx.shadowColor = color; ctx.shadowBlur = glow
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.restore()
}
function frame(ctx: CanvasRenderingContext2D, w: number, h: number, m: Mapper, xmin: number, xmax: number, ymin: number, ymax: number) {
  grid(ctx, w, h)
  ctx.strokeStyle = C.axis; ctx.lineWidth = 1; ctx.beginPath()
  ctx.moveTo(0, m.Y(0)); ctx.lineTo(w, m.Y(0)); ctx.moveTo(m.X(0), 0); ctx.lineTo(m.X(0), h); ctx.stroke()
  label(ctx, `${xmin}`, 6, h - 6); label(ctx, `${xmax}`, w - 34, h - 6)
  label(ctx, `${ymax}`, 5, 14); label(ctx, `${ymin}`, 5, h - 22)
}
function plot(ctx: CanvasRenderingContext2D, f: (x: number) => number, m: Mapper, xmin: number, xmax: number, color: string, width = 2) {
  const pts: [number, number][] = []
  for (let i = 0; i <= 400; i++) {
    const x = xmin + (xmax - xmin) * i / 400, y = f(x)
    if (Number.isFinite(y) && Math.abs(y) < 1e5) pts.push([m.X(x), m.Y(y)])
  }
  line(ctx, pts, color, width, 6)
}

// 1 · Function plotter with reference curve
export const functionPlotter: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const m = mappers(w, h, -6, 6, -4, 4, 40); frame(ctx, w, h, m, -6, 6, -4, 4)
  const a = p.a ?? 1, b = p.b ?? 1, c = p.c ?? 0, fn = p.fn ?? 0
  const f = (x: number) => {
    if (fn < .5) return a * Math.sin(b * x + c)
    if (fn < 1.5) return a * Math.cos(b * x + c)
    if (fn < 2.5) return a * x * x / 8 - 2 + c * .2
    return a * Math.exp(Math.max(-3, Math.min(1.6, b * x * .3))) - 1
  }
  const ref = (x: number) => Math.sin(x)
  plot(ctx, ref, m, -6, 6, 'rgba(185,140,255,.45)', 1.5)
  plot(ctx, f, m, -6, 6, C.blue, 2.5)
  const names = ['a·sin(bx+c)', 'a·cos(bx+c)', 'a·x²/8 + d', 'a·exp(bx/3) − 1']
  label(ctx, names[Math.round(fn)] ?? '', 12, 20, C.blue, 12)
  label(ctx, 'reference: sin x', 12, 38, 'rgba(185,140,255,.7)', 10)
  const x0 = (t * .6) % 12 - 6
  dot(ctx, m.X(x0), m.Y(f(x0)), 4, C.cyan, 14)
  out['f(x₀)'] = f(x0).toFixed(3); out['x₀'] = x0.toFixed(2)
  out['Period'] = b > 0 ? (2 * Math.PI / b).toFixed(3) + ' rad' : '—'
}

// 2 · Unit circle
export const unitCircle: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const cx = w * .46, cy = h * .52, R = Math.min(w, h) * .32
  const theta = ((p.theta ?? 30) * Math.PI / 180) + (p.spin ?? 0) * t
  grid(ctx, w, h)
  ctx.strokeStyle = C.axis; ctx.beginPath(); ctx.moveTo(cx - R - 40, cy); ctx.lineTo(cx + R + 40, cy); ctx.moveTo(cx, cy - R - 30); ctx.lineTo(cx, cy + R + 30); ctx.stroke()
  ctx.strokeStyle = 'rgba(110,168,255,.7)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke()
  const px = cx + R * Math.cos(theta), py = cy - R * Math.sin(theta)
  line(ctx, [[cx, cy], [px, py]], C.white, 2)
  line(ctx, [[px, py], [px, cy]], C.cyan, 1.5); line(ctx, [[cx, cy], [px, cy]], C.amber, 1.5)
  dot(ctx, px, py, 5, C.white, 16)
  // angle arc
  ctx.strokeStyle = C.violet; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, 26, 0, -theta, theta > 0); ctx.stroke()
  label(ctx, 'θ', cx + 32, cy - 12, C.violet, 12)
  label(ctx, `cos θ = ${Math.cos(theta).toFixed(3)}`, cx + R + 20, cy - 14, C.amber, 11)
  label(ctx, `sin θ = ${Math.sin(theta).toFixed(3)}`, cx + R + 20, cy + 4, C.cyan, 11)
  label(ctx, `tan θ = ${Math.tan(theta).toFixed(3)}`, cx + R + 20, cy + 22, C.violet, 11)
  out['sin θ'] = Math.sin(theta).toFixed(4); out['cos θ'] = Math.cos(theta).toFixed(4)
  out['tan θ'] = Math.abs(Math.cos(theta)) < 1e-3 ? 'undefined' : Math.tan(theta).toFixed(4)
  out['θ (rad)'] = theta.toFixed(3)
}

// 3 · Complex plane
export const complexPlane: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const m = mappers(w, h, -3, 3, -3, 3, 36); frame(ctx, w, h, m, -3, 3, -3, 3)
  const r = p.r ?? 1.6, th = (p.theta ?? 30) * Math.PI / 180, n = p.n ?? 2
  const zx = r * Math.cos(th), zy = r * Math.sin(th)
  const wx = Math.pow(r, n) * Math.cos(n * th), wy = Math.pow(r, n) * Math.sin(n * th)
  ctx.strokeStyle = 'rgba(110,168,255,.35)'; ctx.setLineDash([4, 5]); ctx.beginPath()
  ctx.arc(m.X(0), m.Y(0), (m.X(r) - m.X(0)), 0, 2 * Math.PI); ctx.stroke(); ctx.setLineDash([])
  arrow(ctx, m.X(0), m.Y(0), m.X(zx), m.Y(zy), C.blue, 2)
  arrow(ctx, m.X(0), m.Y(0), m.X(Math.max(-3, Math.min(3, wx))), m.Y(Math.max(-3, Math.min(3, wy))), C.violet, 2)
  dot(ctx, m.X(zx), m.Y(zy), 5, C.blue, 14); dot(ctx, m.X(Math.max(-3, Math.min(3, wx))), m.Y(Math.max(-3, Math.min(3, wy))), 5, C.violet, 14)
  label(ctx, 'z', m.X(zx) + 8, m.Y(zy) - 8, C.blue, 12)
  label(ctx, `z^${n}`, m.X(wx) + 8, m.Y(wy) - 8, C.violet, 12)
  out['Re z'] = zx.toFixed(3); out['Im z'] = zy.toFixed(3)
  out['|z|'] = r.toFixed(3); out['arg z'] = (p.theta ?? 30).toFixed(1) + '°'
  out[`|z^${n}|`] = Math.pow(r, n).toFixed(3)
}

// 4 · Matrix transformation of the plane
export const matrixTransform: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const m = mappers(w, h, -3, 3, -3, 3, 36); frame(ctx, w, h, m, -3, 3, -3, 3)
  const a = p.a ?? 1, b = p.b ?? 0, c = p.c ?? 0, d = p.d ?? 1
  const T = (x: number, y: number): [number, number] => [a * x + b * y, c * x + d * y]
  // transformed grid lines
  ctx.strokeStyle = 'rgba(110,168,255,.22)'; ctx.lineWidth = 1
  for (let k = -3; k <= 3; k++) {
    const pts1: [number, number][] = [], pts2: [number, number][] = []
    for (let s = -3; s <= 3; s += .1) {
      const u = T(k, s), v = T(s, k)
      pts1.push([m.X(u[0]), m.Y(u[1])]); pts2.push([m.X(v[0]), m.Y(v[1])])
    }
    line(ctx, pts1, 'rgba(110,168,255,.20)', 1); line(ctx, pts2, 'rgba(185,140,255,.20)', 1)
  }
  const sq = [[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]].map(([x, y]) => T(x, y))
  line(ctx, sq.map(([x, y]) => [m.X(x), m.Y(y)]), C.green, 2)
  const v = T(1, .6); arrow(ctx, m.X(0), m.Y(0), m.X(v[0]), m.Y(v[1]), C.amber, 2)
  const det = a * d - b * c, tr = a + d
  const disc = tr * tr - 4 * det
  const l1 = disc >= 0 ? (tr + Math.sqrt(disc)) / 2 : tr / 2
  const l2 = disc >= 0 ? (tr - Math.sqrt(disc)) / 2 : tr / 2
  out['det(A)'] = det.toFixed(3); out['trace'] = tr.toFixed(3)
  out['λ₁'] = l1.toFixed(3); out['λ₂'] = l2.toFixed(3)
  out['type'] = Math.abs(det) < 1e-6 ? 'singular' : disc >= 0 ? 'real eigenstructure' : 'complex eigenvalues'
  label(ctx, 'unit square → image', 12, 20, C.green, 11)
}

// 5 · Eigenvectors
export const eigenvectors: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const m = mappers(w, h, -3, 3, -3, 3, 36); frame(ctx, w, h, m, -3, 3, -3, 3)
  const a = p.a ?? 1.2, b = p.b ?? .6, c = p.c ?? .4, d = p.d ?? .9
  // vector field of A x
  for (let i = -2.5; i <= 2.5; i += .7) for (let j = -2.5; j <= 2.5; j += .7) {
    const vx = a * i + b * j, vy = c * i + d * j
    const L = Math.hypot(vx, vy) || 1
    arrow(ctx, m.X(i), m.Y(j), m.X(i + .55 * vx / L), m.Y(j + .55 * vy / L), 'rgba(110,168,255,.35)', 1)
  }
  const tr = a + d, det = a * d - b * c, disc = tr * tr - 4 * det
  if (disc >= 0) {
    for (const lam of [(tr + Math.sqrt(disc)) / 2, (tr - Math.sqrt(disc)) / 2]) {
      const ex = Math.abs(b) > 1e-6 ? lam - d : 1
      const ey = b
      const L = Math.hypot(ex, ey) || 1
      const dx = 2.6 * ex / L, dy = 2.6 * ey / L
      arrow(ctx, m.X(-dx), m.Y(-dy), m.X(dx), m.Y(dy), C.amber, 2)
      label(ctx, `λ = ${lam.toFixed(2)}`, m.X(dx) + 4, m.Y(dy) - 5, C.amber, 10)
    }
    out['λ₁'] = ((tr + Math.sqrt(disc)) / 2).toFixed(3); out['λ₂'] = ((tr - Math.sqrt(disc)) / 2).toFixed(3)
  } else {
    out['λ₁'] = `${(tr / 2).toFixed(3)} ± ${(Math.sqrt(-disc) / 2).toFixed(3)}i`
    out['λ₂'] = 'complex conjugate pair'
  }
  out['det(A)'] = det.toFixed(3)
  label(ctx, 'A x as a vector field; amber = eigendirections', 12, 20, C.text, 10)
}

// 6 · Gradient descent on Himmelblau's function
export const gradientDescent: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const m = mappers(w, h, -5, 5, -5, 5, 36)
  const f = (x: number, y: number) => (x * x + y - 11) ** 2 + (x + y * y - 7) ** 2
  const scale = Math.min(w, h) / 10
  for (let i = 0; i < 46; i++) for (let j = 0; j < 46; j++) {
    const x = -5 + i * 10 / 45, y = -5 + j * 10 / 45
    const v = Math.min(1, Math.log1p(f(x, y)) / 8)
    ctx.fillStyle = `rgba(${Math.round(30 + 200 * v)},${Math.round(90 + 60 * (1 - v))},${Math.round(200 - 130 * v)},.35)`
    ctx.fillRect(m.X(x) - scale / 90, m.Y(y) - scale / 90, scale / 45 + 1, scale / 45 + 1)
  }
  ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.beginPath(); ctx.moveTo(0, m.Y(0)); ctx.lineTo(w, m.Y(0)); ctx.moveTo(m.X(0), 0); ctx.lineTo(m.X(0), h); ctx.stroke()
  let x = p.x0 ?? -4, y = p.y0 ?? -4
  const lr = p.lr ?? .006, steps = 160
  const pts: [number, number][] = [[m.X(x), m.Y(y)]]
  for (let k = 0; k < steps; k++) {
    const gx = 4 * x * (x * x + y - 11) + 2 * (x + y * y - 7)
    const gy = 2 * (x * x + y - 11) + 4 * y * (x + y * y - 7)
    x -= lr * gx; y -= lr * gy
    pts.push([m.X(x), m.Y(y)])
  }
  line(ctx, pts, C.white, 2, 8)
  const idx = Math.min(pts.length - 1, Math.floor((t * 22) % pts.length))
  dot(ctx, pts[idx][0], pts[idx][1], 5, C.amber, 16)
  const gx = 4 * x * (x * x + y - 11) + 2 * (x + y * y - 7)
  const gy = 2 * (x * x + y - 11) + 4 * y * (x + y * y - 7)
  out['f(x,y)'] = f(x, y).toFixed(4); out['final x'] = x.toFixed(3); out['final y'] = y.toFixed(3)
  out['‖∇f‖'] = Math.hypot(gx, gy).toFixed(4)
}

// 7 · Tangent line and secants
export const tangentLine: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const m = mappers(w, h, -3, 3, -2, 6, 38); frame(ctx, w, h, m, -3, 3, -2, 6)
  const fn = p.fn ?? 0
  const f = (x: number) => fn < .5 ? Math.sin(x * 1.2) + 1 : fn < 1.5 ? x * x : Math.exp(x * .55)
  const fp = (x: number) => fn < .5 ? 1.2 * Math.cos(x * 1.2) : fn < 1.5 ? 2 * x : .55 * Math.exp(x * .55)
  plot(ctx, f, m, -3, 3, C.blue, 2.5)
  const x0 = p.x0 ?? 1, y0 = f(x0)
  const tangent = (x: number) => y0 + fp(x0) * (x - x0)
  plot(ctx, tangent, m, -3, 3, C.amber, 1.8)
  const hh = Math.max(.05, p.h ?? 1)
  const sec = (x: number) => y0 + (f(x0 + hh) - y0) / hh * (x - x0)
  plot(ctx, sec, m, -3, 3, 'rgba(185,140,255,.75)', 1.4)
  dot(ctx, m.X(x0), m.Y(y0), 5, C.white, 14)
  dot(ctx, m.X(x0 + hh), m.Y(f(x0 + hh)), 4, C.violet, 12)
  out['f′(x₀)'] = fp(x0).toFixed(4)
  out['secant slope'] = ((f(x0 + hh) - y0) / hh).toFixed(4)
  out['h'] = hh.toFixed(2)
}

// 8 · Riemann sums
export const riemannSums: Renderer = (ctx, w, h, _t, _dt, p, out) => {
  const a = p.a ?? 0, b = p.b ?? Math.PI, n = Math.round(p.n ?? 12), mode = p.mode ?? 1
  const m = mappers(w, h, -0.4, 3.7, -0.3, 2.6, 40); frame(ctx, w, h, m, -0.4, 3.7, -0.3, 2.6)
  const f = (x: number) => Math.sin(x) + .45
  plot(ctx, f, m, a, b, C.blue, 2.5)
  const dx = (b - a) / n
  let sum = 0
  for (let i = 0; i < n; i++) {
    const xs = mode < .5 ? a + i * dx : mode < 1.5 ? a + (i + 1) * dx : a + (i + .5) * dx
    const yv = f(xs); sum += yv * dx
    ctx.fillStyle = 'rgba(79,209,165,.20)'; ctx.strokeStyle = 'rgba(79,209,165,.65)'; ctx.lineWidth = 1
    const X1 = m.X(a + i * dx), X2 = m.X(a + (i + 1) * dx), Y = m.Y(yv), Y0 = m.Y(0)
    ctx.fillRect(X1, Math.min(Y, Y0), X2 - X1, Math.abs(Y0 - Y)); ctx.strokeRect(X1, Math.min(Y, Y0), X2 - X1, Math.abs(Y0 - Y))
  }
  const exact = 2 + .45 * (b - a)
  out['n'] = String(n); out['Riemann sum'] = sum.toFixed(5)
  out['Exact ∫'] = exact.toFixed(5); out['Error'] = Math.abs(sum - exact).toFixed(5)
  out['Method'] = mode < .5 ? 'left' : mode < 1.5 ? 'right' : 'midpoint'
}

// 9 · Taylor approximation
export const taylorApprox: Renderer = (ctx, w, h, _t, _dt, p, out) => {
  const m = mappers(w, h, -8, 8, -3, 3, 40); frame(ctx, w, h, m, -8, 8, -3, 3)
  const n = Math.round(p.n ?? 3)
  const f = (x: number) => Math.sin(x)
  const poly = (x: number) => {
    let s = 0
    for (let k = 0; k <= n; k++) s += (k % 2 === 0 ? 1 : -1) * Math.pow(x, 2 * k + 1) / factorial(2 * k + 1)
    return s
  }
  plot(ctx, f, m, -8, 8, C.blue, 2.5)
  plot(ctx, poly, m, -8, 8, C.amber, 2)
  out['Degree'] = String(2 * n + 1); out['P(2)'] = poly(2).toFixed(5)
  out['sin(2)'] = Math.sin(2).toFixed(5); out['Error at 2'] = Math.abs(poly(2) - Math.sin(2)).toFixed(5)
}
function factorial(k: number) { let r = 1; for (let i = 2; i <= k; i++) r *= i; return r }

// 10 · Series convergence
export const seriesConvergence: Renderer = (ctx, w, h, _t, _dt, p, out) => {
  const m = mappers(w, h, 0, 60, -1, 3, 42); frame(ctx, w, h, m, 0, 60, -1, 3)
  const type = p.type ?? 0, r = p.r ?? .5
  const term = (k: number) => type < .5 ? Math.pow(r, k) : type < 1.5 ? 1 / (k + 1) : Math.pow(-1, k) / (k + 1)
  const pts: [number, number][] = []
  let s = 0
  for (let k = 0; k < 60; k++) { s += term(k); pts.push([m.X(k + 1), m.Y(s)]) }
  line(ctx, pts, C.blue, 2.5, 6)
  if (type < .5) { ctx.strokeStyle = 'rgba(255,180,84,.7)'; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.moveTo(0, m.Y(1 / (1 - r))); ctx.lineTo(w, m.Y(1 / (1 - r))); ctx.stroke(); ctx.setLineDash([]) }
  const shown = Math.min(60, Math.round(p.n ?? 20))
  dot(ctx, pts[shown - 1][0], pts[shown - 1][1], 5, C.amber, 14)
  out['S_' + shown] = pts[shown - 1][1].toFixed(5)
  out['Limit'] = type < .5 ? (1 / (1 - r)).toFixed(5) : type < 1.5 ? 'diverges (harmonic)' : Math.LN2.toFixed(5)
  out['Type'] = type < .5 ? 'geometric' : type < 1.5 ? 'harmonic' : 'alternating harmonic'
}

// 11 · Fourier series
export const fourierSeries: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const m = mappers(w, h, -Math.PI, Math.PI, -1.4, 1.4, 40); frame(ctx, w, h, m, -Math.PI, Math.PI, -1.4, 1.4)
  const N = Math.max(1, Math.round(p.N ?? 5))
  const square = (x: number) => Math.sin(x) >= 0 ? 1 : -1
  const series = (x: number) => {
    let s = 0
    for (let k = 0; k < N; k++) s += 4 / Math.PI * Math.sin((2 * k + 1) * x) / (2 * k + 1)
    return s
  }
  const pts1: [number, number][] = [], pts2: [number, number][] = []
  for (let i = 0; i <= 500; i++) {
    const x = -Math.PI + 2 * Math.PI * i / 500
    pts1.push([m.X(x), m.Y(square(x))]); pts2.push([m.X(x), m.Y(series(x))])
  }
  line(ctx, pts1, 'rgba(185,140,255,.5)', 1.5); line(ctx, pts2, C.blue, 2.5, 6)
  const x = (t * .7 % (2 * Math.PI)) - Math.PI
  dot(ctx, m.X(x), m.Y(series(x)), 4, C.amber, 12)
  out['Harmonics'] = String(N); out['S(x)'] = series(x).toFixed(4)
  out['Overshoot ≈'] = '8.9% (Gibbs)'
}

// 12 · Vector field / direction field
export const vectorField: Renderer = (ctx, w, h, _t, _dt, p, out) => {
  const m = mappers(w, h, -4, 4, -4, 4, 36); frame(ctx, w, h, m, -4, 4, -4, 4)
  const type = p.type ?? 0, k = p.k ?? 1
  const slope = (x: number, y: number) => type < .5 ? x - k * y : type < 1.5 ? -k * y / (Math.abs(x) + .3) : k * x * y / 3
  for (let i = -3.5; i <= 3.5; i += .55) for (let j = -3.5; j <= 3.5; j += .55) {
    const s = slope(i, j), L = Math.hypot(1, s)
    arrow(ctx, m.X(i) - 12 / L, m.Y(j) + 12 * s / L, m.X(i) + 12 / L, m.Y(j) - 12 * s / L, 'rgba(110,168,255,.45)', 1)
  }
  let x = p.x0 ?? -3, y = p.y0 ?? 2
  const pts: [number, number][] = [[m.X(x), m.Y(y)]]
  const step = .05
  for (let n = 0; n < 220 && x < 4; n++) {
    const s1 = slope(x, y), s2 = slope(x + step / 2, y + step * s1 / 2)
    y += step * s2; x += step
    if (Math.abs(y) > 8) break
    pts.push([m.X(x), m.Y(y)])
  }
  line(ctx, pts, C.amber, 2.2, 7)
  out['ODE'] = type < .5 ? "y' = x − ky" : type < 1.5 ? "y' = −ky/x" : "y' = kxy/3"
  out['y(0) approx'] = y.toFixed(3); out['k'] = k.toFixed(2)
}
