import { seeded } from './useCanvas'
import type { Params, Readout, Renderer } from './renderers'

const C = { grid: 'rgba(120,150,200,.09)', axis: 'rgba(150,175,215,.38)', text: '#8fa0bb',
  blue: '#6ea8ff', cyan: '#4fd1c5', amber: '#ffb454', red: '#ff7a90', violet: '#b98cff', green: '#7fe0a8', white: '#e6edfa' }
type Mapper = { X: (x: number) => number; Y: (y: number) => number }
const mappers = (w: number, h: number, xmin: number, xmax: number, ymin: number, ymax: number, pad = 40): Mapper => ({
  X: x => pad + (x - xmin) / (xmax - xmin) * (w - 2 * pad),
  Y: y => h - pad - (y - ymin) / (ymax - ymin) * (h - 2 * pad),
})
function frame(ctx: CanvasRenderingContext2D, w: number, h: number, m: Mapper, xmin: number, xmax: number, ymin: number, ymax: number) {
  ctx.strokeStyle = C.grid; ctx.lineWidth = 1; ctx.beginPath()
  for (let x = 0; x <= w; x += 40) { ctx.moveTo(x, 0); ctx.lineTo(x, h) }
  for (let y = 0; y <= h; y += 40) { ctx.moveTo(0, y); ctx.lineTo(w, y) }
  ctx.stroke()
  ctx.strokeStyle = C.axis; ctx.beginPath(); ctx.moveTo(0, m.Y(0)); ctx.lineTo(w, m.Y(0)); ctx.moveTo(m.X(0), 0); ctx.lineTo(m.X(0), h); ctx.stroke()
  ctx.fillStyle = C.text; ctx.font = '10px "JetBrains Mono", monospace'
  ctx.fillText(`${xmin}`, 5, h - 5); ctx.fillText(`${xmax}`, w - 30, h - 5)
  ctx.fillText(`${ymax}`, 5, 13); ctx.fillText(`${ymin}`, 5, h - 22)
}
function line(ctx: CanvasRenderingContext2D, pts: [number, number][], color: string, width = 2, glow = 0) {
  if (pts.length < 2) return
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineJoin = 'round'
  if (glow) { ctx.shadowColor = color; ctx.shadowBlur = glow }
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.stroke(); ctx.restore()
}
function dot(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, glow = 8) {
  ctx.save(); ctx.fillStyle = color; ctx.shadowColor = color; ctx.shadowBlur = glow
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.restore()
}
function text(ctx: CanvasRenderingContext2D, s: string, x: number, y: number, color = C.text, size = 11) {
  ctx.fillStyle = color; ctx.font = `${size}px "JetBrains Mono", monospace`; ctx.fillText(s, x, y)
}
function arrow(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, width = 1.5) {
  line(ctx, [[x1, y1], [x2, y2]], color, width)
  const a = Math.atan2(y2 - y1, x2 - x1), s = 5
  ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(x2, y2)
  ctx.lineTo(x2 - s * Math.cos(a - .4), y2 - s * Math.sin(a - .4))
  ctx.lineTo(x2 - s * Math.cos(a + .4), y2 - s * Math.sin(a + .4)); ctx.fill()
}

export const surfacePlot: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const a = p.a ?? 1, b = p.b ?? 1, rot = (p.rot ?? 30) * Math.PI / 180 + t * .08
  const cx = w / 2, cy = h * .58, s = Math.min(w, h) / 9
  const f = (x: number, y: number) => Math.sin(a * x) * Math.cos(b * y)
  const proj = (x: number, y: number): [number, number] => {
    const z = f(x, y)
    return [cx + (x - y) * s * Math.cos(rot), cy + (x + y) * s * Math.sin(rot) * .5 - z * s * .8]
  }
  for (let u = -3; u <= 3.01; u += .25) {
    const pts: [number, number][] = []; for (let v = -3; v <= 3.01; v += .25) pts.push(proj(u, v))
    line(ctx, pts, 'rgba(110,168,255,.55)', 1)
  }
  for (let v = -3; v <= 3.01; v += .25) {
    const pts: [number, number][] = []; for (let u = -3; u <= 3.01; u += .25) pts.push(proj(u, v))
    line(ctx, pts, 'rgba(185,140,255,.45)', 1)
  }
  let max = -9, min = 9
  for (let u = -3; u <= 3; u += .1) for (let v = -3; v <= 3; v += .1) { const z = f(u, v); max = Math.max(max, z); min = Math.min(min, z) }
  out['f(x,y)'] = 'sin(ax)·cos(by)'; out['max'] = max.toFixed(3); out['min'] = min.toFixed(3)
  out['∂f/∂x'] = 'a·cos(ax)·cos(by)'
}

export const optimizationLandscape: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const m = mappers(w, h, -2, 2, -1, 3, 40); frame(ctx, w, h, m, -2, 2, -1, 3)
  // Rosenbrock's banana function, log-scaled contour bands.
  const f = (x: number, y: number) => (1 - x) ** 2 + 100 * (y - x * x) ** 2
  const cell = 7
  for (let px = 30; px < w - 20; px += cell) for (let py = 20; py < h - 20; py += cell) {
    const x = -2 + 4 * (px - 30) / (w - 50), y = -1 + 4 * (1 - (py - 20) / (h - 40))
    const v = Math.min(1, Math.log1p(f(x, y)) / 7)
    ctx.fillStyle = `rgba(${Math.round(35 + 190 * v)},${Math.round(100 + 70 * (1 - v))},${Math.round(200 - 140 * v)},.55)`
    ctx.fillRect(px, py, cell - 1, cell - 1)
  }
  const x = p.x ?? 0.5, y = p.y ?? 0.5
  const gx = -2 * (1 - x) - 400 * x * (y - x * x)
  const gy = 200 * (y - x * x)
  dot(ctx, m.X(x), m.Y(Math.max(-1, Math.min(3, y))), 6, C.amber, 16)
  arrow(ctx, m.X(x), m.Y(Math.max(-1, Math.min(3, y))), m.X(x + .003 * gx), m.Y(Math.max(-1, Math.min(3, y)) + .003 * gy), C.white, 1.5)
  dot(ctx, m.X(1), m.Y(1), 4, C.green, 12)
  out['f(x,y)'] = f(x, y).toFixed(4)
  out['‖∇f‖'] = Math.hypot(gx, gy).toFixed(4)
  out['Global minimum'] = '(1, 1), f = 0'
  out['Landscape'] = 'Rosenbrock (nonconvex, curved valley)'
}

export const gradientField: Renderer = (ctx, w, h, _t, _dt, p, out) => {
  const m = mappers(w, h, -3, 3, -3, 3, 36); frame(ctx, w, h, m, -3, 3, -3, 3)
  const saddle = p.type ?? 1
  const f = (x: number, y: number) => saddle < .5 ? .5 * (x * x + y * y) : .5 * (x * x - y * y)
  const gx = (x: number) => x, gy = (y: number) => saddle < .5 ? y : -y
  for (let i = -2.7; i <= 2.7; i += .6) for (let j = -2.7; j <= 2.7; j += .6) {
    const X = m.X(i), Y = m.Y(j)
    ctx.fillStyle = f(i, j) > 0 ? 'rgba(110,168,255,.10)' : 'rgba(255,122,144,.10)'
    ctx.fillRect(X - 14, Y - 14, 28, 28)
    const L = Math.hypot(gx(i), gy(j)) || 1
    arrow(ctx, X, Y, X + 18 * gx(i) / L, Y - 18 * gy(j) / L, 'rgba(79,209,165,.7)', 1.2)
  }
  out['Surface'] = saddle < .5 ? 'paraboloid z = (x²+y²)/2' : 'saddle z = (x²−y²)/2'
  out['∇f'] = saddle < .5 ? '(x, y)' : '(x, −y)'
  out['Critical point'] = '(0, 0) — ' + (saddle < .5 ? 'minimum' : 'saddle')
}

function normalSample(i: number, mu: number, sigma: number) {
  const u1 = Math.max(1e-9, seeded(i)), u2 = seeded(i + 99991)
  return mu + sigma * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
}
export const distributionLab: Renderer = (ctx, w, h, _t, _dt, p, out) => {
  const dist = p.dist ?? 0, mu = p.mu ?? 0, sigma = Math.max(.1, p.sigma ?? 1)
  const m = mappers(w, h, -5, 5, 0, .55, 40); frame(ctx, w, h, m, -5, 5, 0, .55)
  const pdf = (x: number) => dist < .5 ? Math.exp(-((x - mu) ** 2) / (2 * sigma * sigma)) / (sigma * Math.sqrt(2 * Math.PI))
    : dist < 1.5 ? x >= 0 ? Math.exp(-x / sigma) / sigma : 0
      : dist < 2.5 ? (x >= 0 && x <= 1 ? 1 : 0) : 0
  const pts: [number, number][] = []
  for (let i = 0; i <= 400; i++) { const x = -5 + 10 * i / 400; pts.push([m.X(x), m.Y(pdf(x))]) }
  line(ctx, pts, C.blue, 2.5, 6)
  const N = 4000, bins = 40, counts = new Array(bins).fill(0)
  let sum = 0, sum2 = 0
  for (let i = 0; i < N; i++) {
    let v = 0
    if (dist < .5) v = normalSample(i, mu, sigma)
    else if (dist < 1.5) v = -sigma * Math.log(Math.max(1e-9, seeded(i)))
    else if (dist < 2.5) v = seeded(i)
    else { let s = 0; for (let k = 0; k < 12; k++) s += seeded(i * 13 + k) < (mu + 5) / 10 ? 1 : 0; v = s / 12 }
    const bin = Math.floor((v + 5) / 10 * bins)
    if (bin >= 0 && bin < bins) counts[bin]++
    sum += v; sum2 += v * v
  }
  counts.forEach((c, i) => {
    const x0 = -5 + 10 * i / bins, x1 = -5 + 10 * (i + 1) / bins
    const density = Math.min(1.1, c / (N * (10 / bins)))
    ctx.fillStyle = 'rgba(79,209,165,.35)'
    ctx.fillRect(m.X(x0), m.Y(density), m.X(x1) - m.X(x0) - 1, m.Y(0) - m.Y(density))
  })
  const mean = sum / N, variance = sum2 / N - mean * mean
  out['Sample mean'] = mean.toFixed(4); out['Sample var'] = variance.toFixed(4)
  out['N'] = String(N); out['Distribution'] = ['Normal', 'Exponential', 'Uniform', 'Binomial'][dist] ?? 'Normal'
}

export const cltSimulation: Renderer = (ctx, w, h, _t, _dt, p, out) => {
  const n = Math.max(1, Math.round(p.n ?? 5)), N = Math.round(p.N ?? 2000)
  const m = mappers(w, h, 0, 3, 0, 1.1, 40); frame(ctx, w, h, m, 0, 3, 0, 1.1)
  const means: number[] = []
  for (let i = 0; i < N; i++) {
    let s = 0
    for (let k = 0; k < n; k++) s += -Math.log(Math.max(1e-9, seeded(i * 31 + k)))
    means.push(s / n)
  }
  const bins = 45, counts = new Array(bins).fill(0)
  means.forEach(v => { const b = Math.floor(v / 3 * bins); if (b >= 0 && b < bins) counts[b]++ })
  const maxC = Math.max(...counts) || 1
  counts.forEach((c, i) => {
    const x0 = 3 * i / bins, x1 = 3 * (i + 1) / bins
    const yh = c / maxC * .9
    ctx.fillStyle = 'rgba(79,209,165,.45)'; ctx.fillRect(m.X(x0), m.Y(yh), m.X(x1) - m.X(x0) - 1, m.Y(0) - m.Y(yh))
  })
  const pts: [number, number][] = []
  const sd = 1 / Math.sqrt(n)
  for (let i = 0; i <= 200; i++) { const x = 3 * i / 200; pts.push([m.X(x), m.Y(Math.exp(-((x - 1) ** 2) / (2 * sd * sd)) / (sd * Math.sqrt(2 * Math.PI)))]) }
  line(ctx, pts, C.amber, 2)
  const mean = means.reduce((a, b) => a + b, 0) / N
  out['Sample size n'] = String(n); out['E[X̄] = μ'] = mean.toFixed(4)
  out['σ/√n'] = sd.toFixed(4); out['N samples'] = String(N)
}

export const bayesUpdater: Renderer = (ctx, w, h, _t, _dt, p, out) => {
  const prev = (p.prev ?? 2) / 100, sens = (p.sens ?? 95) / 100, spec = (p.spec ?? 95) / 100
  const ppv = sens * prev / (sens * prev + (1 - spec) * (1 - prev))
  const npp = spec * (1 - prev) / (spec * (1 - prev) + (1 - sens) * prev)
  const bars: [string, number, string][] = [
    ['Prior P(D)', prev, C.violet], ['P(+|D)', sens, C.blue], ['P(+|¬D)', 1 - spec, C.red], ['Posterior P(D|+)', ppv, C.green],
  ]
  const x0 = 40, width = w - 100
  bars.forEach(([name, v, col], i) => {
    const y = 44 + i * 62
    ctx.fillStyle = C.text; ctx.font = '11px Inter, sans-serif'; ctx.fillText(name, x0, y - 7)
    ctx.fillStyle = 'rgba(255,255,255,.05)'; ctx.fillRect(x0, y, width, 18)
    ctx.fillStyle = col; ctx.fillRect(x0, y, width * v, 18)
    ctx.fillStyle = col; ctx.font = '11px "JetBrains Mono", monospace'; ctx.fillText((v * 100).toFixed(2) + '%', x0 + width * v + 8, y + 14)
  })
  out['Prevalence'] = (prev * 100).toFixed(2) + '%'; out['PPV'] = (ppv * 100).toFixed(2) + '%'
  out['False positives'] = ((1 - spec) * 100).toFixed(1) + '%'
  out['P(¬D|−)'] = (npp * 100).toFixed(2) + '%'
}

export const markovChain: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const q = p.p ?? .25, steps = Math.round(p.steps ?? 20)
  const P = [[1 - q, q, 0], [q / 2, 1 - q, q / 2], [0, q, 1 - q]]
  let st = [1, 0, 0]
  for (let i = 0; i < 200; i++) {
    const ns = [0, 1, 2].map(j => st[0] * P[0][j] + st[1] * P[1][j] + st[2] * P[2][j])
    st = ns
  }
  const pos = [{ x: w * .22, y: h * .42 }, { x: w * .5, y: h * .25 }, { x: w * .78, y: h * .42 }]
  ;[[0, 1], [1, 2], [0, 2]].forEach(([i, j]) => arrow(ctx, pos[i].x, pos[i].y, pos[j].x, pos[j].y, 'rgba(110,168,255,.45)', 1.5))
  pos.forEach((pt, i) => {
    ctx.beginPath(); ctx.arc(pt.x, pt.y, 26 + 40 * st[i], 0, 2 * Math.PI)
    ctx.fillStyle = `rgba(79,209,165,${.12 + st[i] * .25})`; ctx.fill()
    ctx.strokeStyle = C.green; ctx.lineWidth = 1.5; ctx.stroke()
    text(ctx, `S${i + 1}`, pt.x - 12, pt.y + 4, C.text, 11)
    text(ctx, st[i].toFixed(3), pt.x - 24, pt.y + 52, C.green, 10)
  })
  let s = 0, state = 0
  const rng = (i: number) => seeded(i * 17 + 3)
  const path: [number, number][] = []
  for (let k = 0; k < steps; k++) {
    const u = rng(k + Math.floor(t * .4) % 7)
    const row = P[state]
    state = u < row[0] ? 0 : u < row[0] + row[1] ? 1 : 2
    s = state; path.push([pos[s].x, pos[s].y])
  }
  line(ctx, path, 'rgba(255,180,84,.55)', 1.5)
  dot(ctx, pos[s].x, pos[s].y, 6, C.amber, 14)
  out['π₁'] = st[0].toFixed(4); out['π₂'] = st[1].toFixed(4); out['π₃'] = st[2].toFixed(4)
  out['Steps shown'] = String(steps)
}

export const graphAlgorithms: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const nodes = [[.13,.25],[.36,.12],[.62,.2],[.85,.35],[.7,.68],[.42,.8],[.16,.65],[.5,.45]]
    .map(([x, y]) => [x * w, y * h] as [number, number])
  const edges: [number, number, number][] = [[0,1,2],[0,6,3],[1,2,1],[1,7,4],[2,3,2],[2,7,1],[3,4,5],[4,5,2],[5,6,1],[6,7,3],[0,7,7],[4,7,2]]
  const algo = p.algo ?? 1, reveal = Math.min(edges.length, Math.floor(t * 2) % (edges.length + 1))
  edges.forEach(([i, j, wt], k) => {
    const vis = k < reveal
    line(ctx, [nodes[i], nodes[j]], vis ? 'rgba(110,168,255,.7)' : 'rgba(120,140,170,.18)', vis ? 1.8 : 1)
    const mx = (nodes[i][0] + nodes[j][0]) / 2, my = (nodes[i][1] + nodes[j][1]) / 2
    text(ctx, String(wt), mx - 3, my - 4, vis ? C.amber : C.text, 10)
  })
  nodes.forEach((pt, i) => {
    dot(ctx, pt[0], pt[1], 15, i === 0 ? C.green : '#1a2740', 4)
    text(ctx, String(i), pt[0] - 4, pt[1] + 4, C.text, 11)
  })
  out['Algorithm'] = algo < .5 ? 'BFS (unweighted)' : 'Dijkstra (weighted)'
  out['Edges visited'] = `${reveal}/${edges.length}`
  out['Nodes'] = String(nodes.length)
}

export const newtonFractal: Renderer = (ctx, w, h, _t, _dt, p, out) => {
  const zoom = p.zoom ?? 1, maxIter = Math.round(p.iter ?? 24)
  const colors = ['#6ea8ff', '#4fd1a5', '#ffb454']
  const roots = [[1, 0], [-.5, Math.sqrt(3) / 2], [-.5, -Math.sqrt(3) / 2]]
  for (let px = 0; px < w; px += 4) for (let py = 0; py < h; py += 4) {
    let zx = (px / w - .5) * 4 / zoom, zy = (py / h - .5) * 4 / zoom
    let k = 0
    for (; k < maxIter; k++) {
      const a = zx * zx - zy * zy, b = 2 * zx * zy
      const den = 3 * (a * a + b * b)
      if (den < 1e-12) break
      const fre = zx ** 3 - 3 * zx * zy * zy - 1
      const fim = 3 * zx * zx * zy - zy ** 3
      const nx = zx - (fre * a + fim * b) / den
      const ny = zy - (fim * a - fre * b) / den
      zx = nx; zy = ny
      const rre = zx ** 3 - 3 * zx * zy * zy - 1
      const rim = 3 * zx * zx * zy - zy ** 3
      if (Math.hypot(rre, rim) < 1e-3 && k > 1) break
    }
    let root = 0, best = Infinity
    roots.forEach(([rx, ry], i) => { const d = Math.hypot(zx - rx, zy - ry); if (d < best) { best = d; root = i } })
    const shade = 1 - k / maxIter
    const base = colors[root].match(/\w\w/g)!.map(x => parseInt(x, 16))
    ctx.fillStyle = `rgb(${base.map(v => Math.round(v * (.35 + .65 * shade))).join(',')})`
    ctx.fillRect(px, py, 4, 4)
  }
  out['Polynomial'] = 'z³ − 1 = 0'; out['Roots'] = '3 (roots of unity)'
  out['Iterations'] = String(maxIter); out['Zoom'] = zoom.toFixed(2) + '×'
}

export const odeFlow: Renderer = (ctx, w, h, _t, _dt, p, out) => {
  const m = mappers(w, h, 0, 8, 0, 1.2, 40); frame(ctx, w, h, m, 0, 8, 0, 1.2)
  const r = p.r ?? 1, K = p.K ?? 1
  const f = (y: number) => r * y * (1 - y / K)
  for (let i = 0; i <= 8; i += .5) for (let j = 0; j <= 1.2; j += .1) {
    const v = f(j), L = Math.hypot(1, v)
    arrow(ctx, m.X(i) - 8 / L, m.Y(j) + 8 * v / L, m.X(i) + 8 / L, m.Y(j) - 8 * v / L, 'rgba(110,168,255,.35)', 1)
  }
  ;[p.y0 ?? .1, p.y0 ?? .1].forEach((y0, idx) => {
    let y = y0 + (idx ? .01 : 0)
    const pts: [number, number][] = []
    for (let x = 0; x <= 8.01; x += .08) { pts.push([m.X(x), m.Y(y)]); y += .08 * f(y) }
    line(ctx, pts, idx ? C.violet : C.amber, 2)
  })
  ctx.strokeStyle = 'rgba(255,180,84,.6)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(0, m.Y(K)); ctx.lineTo(w, m.Y(K)); ctx.stroke(); ctx.setLineDash([])
  out['ODE'] = "y' = r y (1 − y/K)"; out['Equilibria'] = 'y = 0 (unstable), y = K (stable)'
  out['y(8)'] = (1 / (1 + (1 / (p.y0 ?? .1) - 1) * Math.exp(-r * 8))).toFixed(4)
}

export const pdeHeat: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const m = mappers(w, h, 0, 1, -.1, 1.1, 40); frame(ctx, w, h, m, 0, 1, -.1, 1.1)
  const alpha = p.alpha ?? .2, N = 80, dx = 1 / (N - 1)
  let u = Array.from({ length: N }, (_, i) => Math.sin(Math.PI * i / (N - 1)) + .3 * Math.sin(3 * Math.PI * i / (N - 1)))
  const steps = Math.floor(t * 20) % 120
  for (let s = 0; s < steps; s++) {
    const un = u.slice()
    for (let i = 1; i < N - 1; i++) u[i] = un[i] + alpha * (un[i + 1] - 2 * un[i] + un[i - 1])
    u[0] = 0; u[N - 1] = 0
  }
  const pts = u.map((v, i) => [m.X(i * dx), m.Y(v)] as [number, number])
  line(ctx, pts, C.cyan, 2.5, 8)
  out['PDE'] = 'u_t = α u_xx'; out['α'] = alpha.toFixed(3)
  out['Steps'] = String(steps); out['u(0.5)'] = u[Math.floor(N / 2)].toFixed(4)
  out['Boundary'] = 'Dirichlet u(0)=u(1)=0'
}

const lorenzStep = (s: [number, number, number], sig: number, rho: number, beta: number, dt: number): [number, number, number] => {
  const f = ([x, y, z]: [number, number, number]): [number, number, number] => [sig * (y - x), x * (rho - z) - y, x * y - beta * z]
  const k1 = f(s), k2 = f([s[0] + dt * k1[0] / 2, s[1] + dt * k1[1] / 2, s[2] + dt * k1[2] / 2])
  const k3 = f([s[0] + dt * k2[0] / 2, s[1] + dt * k2[1] / 2, s[2] + dt * k2[2] / 2])
  const k4 = f([s[0] + dt * k3[0], s[1] + dt * k3[1], s[2] + dt * k3[2]])
  return [0, 1, 2].map(i => s[i] + dt * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]) / 6) as [number, number, number]
}
export const lorenz: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const sig = p.sigma ?? 10, rho = p.rho ?? 28, beta = p.beta ?? 8 / 3
  let s: [number, number, number] = [1, 1, 1]
  let s2: [number, number, number] = [1 + (p.delta ?? .0001), 1, 1]
  const pts: [number, number][] = [], pts2: [number, number][] = []
  const rot = t * .12
  const proj = ([x, y, z]: [number, number, number]): [number, number] => [
    w / 2 + (x * Math.cos(rot) - y * Math.sin(rot)) * (w / 90),
    h / 2 - (z - 25) * (h / 70) + (x * Math.sin(rot) + y * Math.cos(rot)) * .12,
  ]
  for (let i = 0; i < 1400; i++) {
    s = lorenzStep(s, sig, rho, beta, .005); s2 = lorenzStep(s2, sig, rho, beta, .005)
    if (i > 100) { pts.push(proj(s)); pts2.push(proj(s2)) }
  }
  line(ctx, pts, 'rgba(110,168,255,.8)', 1.2)
  line(ctx, pts2, 'rgba(255,122,144,.55)', 1)
  out['σ, ρ, β'] = `${sig.toFixed(1)}, ${rho.toFixed(1)}, ${beta.toFixed(2)}`
  out['Separation'] = Math.hypot(s[0] - s2[0], s[1] - s2[1], s[2] - s2[2]).toExponential(2)
  out['Regime'] = rho > 24.74 ? 'chaotic' : 'fixed points stable'
}

export const sirModel: Renderer = (ctx, w, h, _t, _dt, p, out) => {
  const m = mappers(w, h, 0, 160, 0, 1.05, 40); frame(ctx, w, h, m, 0, 160, 0, 1.05)
  const beta = p.beta ?? .35, gamma = p.gamma ?? .12, N = 1
  let S = 1 - (p.I0 ?? 1) / 1000, I = (p.I0 ?? 1) / 1000, R = 0
  const SS: [number, number][] = [], II: [number, number][] = [], RR: [number, number][] = []
  const step = (s: number, i: number, r: number): [number, number, number] => {
    const dS = -beta * s * i / N, dI = beta * s * i / N - gamma * i, dR = gamma * i
    return [s + .2 * dS, i + .2 * dI, r + .2 * dR]
  }
  let peak = 0
  for (let day = 0; day <= 160; day++) {
    SS.push([m.X(day), m.Y(S)]); II.push([m.X(day), m.Y(I)]); RR.push([m.X(day), m.Y(R)])
    peak = Math.max(peak, I); [S, I, R] = step(S, I, R)
  }
  line(ctx, SS, C.blue, 2); line(ctx, II, C.red, 2.2); line(ctx, RR, C.green, 2)
  text(ctx, 'S', w - 60, m.Y(S) - 6, C.blue); text(ctx, 'I', w - 60, m.Y(I) - 6, C.red); text(ctx, 'R', w - 60, m.Y(R) - 6, C.green)
  out['R₀'] = (beta / gamma).toFixed(3); out['Peak infected'] = (peak * 100).toFixed(2) + '%'
  out['Final size'] = (R * 100).toFixed(2) + '%'
}

export const bisectionVisual: Renderer = (ctx, w, h, _t, _dt, p, out) => {
  const m = mappers(w, h, 0, 3, -3, 12, 40); frame(ctx, w, h, m, 0, 3, -3, 12)
  const f = (x: number) => x ** 3 - x - 2
  const pts: [number, number][] = []
  for (let i = 0; i <= 300; i++) { const x = 3 * i / 300; pts.push([m.X(x), m.Y(Math.max(-3, Math.min(12, f(x))))]) }
  line(ctx, pts, C.blue, 2.2)
  ctx.strokeStyle = C.axis; ctx.beginPath(); ctx.moveTo(0, m.Y(0)); ctx.lineTo(w, m.Y(0)); ctx.stroke()
  let a = 1, b = 2, iter = 0
  const shown = Math.round(p.iters ?? 8)
  for (; iter < shown; iter++) {
    const mid = (a + b) / 2
    if (f(a) * f(mid) <= 0) b = mid; else a = mid
  }
  const A = m.X(a), B = m.X(b)
  ctx.fillStyle = 'rgba(79,209,165,.18)'; ctx.fillRect(A, 20, B - A, h - 40)
  dot(ctx, m.X((a + b) / 2), m.Y(0), 5, C.amber, 14)
  out['f(x)'] = 'x³ − x − 2'; out['Interval'] = `[${a.toFixed(5)}, ${b.toFixed(5)}]`
  out['Estimate'] = ((a + b) / 2).toFixed(7); out['Iterations'] = String(iter)
  out['f(estimate)'] = f((a + b) / 2).toExponential(2)
}

export const conicSections: Renderer = (ctx, w, h, _t, _dt, p, out) => {
  const m = mappers(w, h, -5, 5, -4, 4, 38); frame(ctx, w, h, m, -5, 5, -4, 4)
  const e = p.e ?? .5, d = p.d ?? 1.6
  const pts: [number, number][] = []
  for (let i = 0; i <= 720; i++) {
    const th = 2 * Math.PI * i / 720
    const den = 1 + e * Math.cos(th)
    if (Math.abs(den) < 1e-3) continue
    const r = e * d / den
    if (Math.abs(r) > 20) continue
    pts.push([m.X(r * Math.cos(th)), m.Y(r * Math.sin(th))])
  }
  line(ctx, pts, C.blue, 2.2, 7)
  dot(ctx, m.X(0), m.Y(0), 4, C.amber, 12)
  out['Eccentricity e'] = e.toFixed(3)
  out['Type'] = e < .99 ? 'ellipse' : Math.abs(e - 1) < .02 ? 'parabola' : 'hyperbola'
  out['Polar form'] = 'r = ed / (1 + e cos θ)'
}

export const regressionFit: Renderer = (ctx, w, h, _t, _dt, p, out) => {
  const m = mappers(w, h, 0, 10, -2, 12, 40); frame(ctx, w, h, m, 0, 10, -2, 12)
  const slope = p.slope ?? 1.1, noise = p.noise ?? 1
  const xs: number[] = [], ys: number[] = []
  for (let i = 0; i < 40; i++) { const x = 10 * (i + .5) / 40, y = .5 + slope * x + noise * (seeded(i * 7) - .5) * 2.4; xs.push(x); ys.push(y) }
  const mx = xs.reduce((a, b) => a + b) / xs.length, my = ys.reduce((a, b) => a + b) / ys.length
  let sxy = 0, sxx = 0, syy = 0
  xs.forEach((x, i) => { sxy += (x - mx) * (ys[i] - my); sxx += (x - mx) ** 2; syy += (ys[i] - my) ** 2 })
  const b1 = sxy / sxx, b0 = my - b1 * mx, r2 = (sxy * sxy) / (sxx * syy)
  xs.forEach((x, i) => {
    const X = m.X(x), Y = m.Y(ys[i]), Yfit = m.Y(b0 + b1 * x)
    line(ctx, [[X, Y], [X, Yfit]], 'rgba(255,180,84,.35)', 1)
    dot(ctx, X, Y, 3, C.blue, 4)
  })
  line(ctx, [[m.X(0), m.Y(b0)], [m.X(10), m.Y(b0 + 10 * b1)]], C.amber, 2.4, 6)
  out['Slope β̂₁'] = b1.toFixed(4); out['Intercept β̂₀'] = b0.toFixed(4)
  out['R²'] = r2.toFixed(4); out['n'] = String(xs.length)
}

export const groupTable: Renderer = (ctx, w, h, _t, _dt, p, out) => {
  const n = Math.max(3, Math.round(p.n ?? 6)), op = p.op ?? 0
  const cell = Math.min((w - 60) / (n + 1), (h - 60) / (n + 1))
  const x0 = 40, y0 = 46
  const elem = (i: number) => i === 0 ? 'e' : op < .5 ? `a^${i}` : `r^${i % 3}${i >= 3 ? 's' : ''}`
  const compose = (i: number, j: number) => op < .5 ? (i + j) % n : ((i % 3 + (j % 3) * (i >= 3 ? -1 : 1) + 3) % 3) + (i >= 3 || j >= 3 ? 3 : 0) % (n === 6 ? 6 : n)
  ctx.fillStyle = C.text; ctx.font = '11px "JetBrains Mono", monospace'
  for (let i = 0; i < n; i++) { ctx.fillText(elem(i), x0 + (i + 1) * cell + cell * .35, y0 - 8); ctx.fillText(elem(i), x0 - 20, y0 + (i + 1) * cell + cell * .35) }
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const v = compose(i, j) % n
    ctx.fillStyle = `hsla(${215 + v / n * 100},70%,${22 + 28 * v / n}%,.8)`
    ctx.fillRect(x0 + (j + 1) * cell, y0 + (i + 1) * cell, cell - 2, cell - 2)
    ctx.fillStyle = '#eaf0ff'; ctx.fillText(elem(v), x0 + (j + 1) * cell + cell * .35, y0 + (i + 1) * cell + cell * .6)
  }
  out['Group'] = op < .5 ? `Z/${n} (cyclic)` : 'D₃ (dihedral, order 6)'
  out['Order'] = op < .5 ? String(n) : '6'
  out['Abelian'] = op < .5 ? 'yes' : 'no'
}

export const curvatureVisual: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const type = p.type ?? 0, a = Math.max(.2, p.a ?? 1), b = Math.max(.2, p.b ?? 1)
  const rot = t * .06, cx = w / 2, cy = h * .56, s = Math.min(w, h) / 8
  const f = (x: number, y: number) => type < .5 ? (x * x + y * y) / a : type < 1.5 ? (x * x - y * y / b) / a : (x * x + y * y) / a - (x * x + y * y) ** 2 / (b * 4)
  const proj = (x: number, y: number): [number, number] => [cx + (x - y) * s * Math.cos(rot), cy + (x + y) * s * Math.sin(rot) * .5 - f(x, y) * s * .35]
  for (let u = -2.5; u <= 2.5; u += .25) {
    const pts: [number, number][] = []; for (let v = -2.5; v <= 2.5; v += .25) pts.push(proj(u, v)); line(ctx, pts, 'rgba(110,168,255,.5)', 1)
  }
  for (let v = -2.5; v <= 2.5; v += .25) {
    const pts: [number, number][] = []; for (let u = -2.5; u <= 2.5; u += .25) pts.push(proj(u, v)); line(ctx, pts, 'rgba(185,140,255,.4)', 1)
  }
  const K = type < .5 ? 4 / (a * a) : type < 1.5 ? -4 / (a * a * b) : NaN
  out['Surface'] = ['Sphere-like (K > 0)', 'Saddle (K < 0)', 'Mixed curvature'][Math.round(type)] ?? ''
  out['Gaussian curvature K'] = Number.isFinite(K) ? K.toFixed(3) : 'sign varies'
  out['Principal curvatures'] = type < .5 ? 'both positive' : type < 1.5 ? 'opposite signs' : 'change sign'
}

export const fftSpectrum: Renderer = (ctx, w, h, _t, _dt, p, out) => {
  const f1 = p.f1 ?? 3, f2 = p.f2 ?? 7, f3 = p.f3 ?? 11
  const N = 1024
  const signal = Array.from({ length: N }, (_, i) => Math.sin(2 * Math.PI * f1 * i / N) + .6 * Math.sin(2 * Math.PI * f2 * i / N) + .3 * Math.sin(2 * Math.PI * f3 * i / N))
  const bins = 40
  const m = mappers(w, h, 0, bins, 0, 1.1, 40); frame(ctx, w, h, m, 0, bins, 0, 1.1)
  const mags: number[] = []
  for (let k = 0; k < bins; k++) {
    let re = 0, im = 0
    for (let n = 0; n < N; n++) { const th = 2 * Math.PI * k * n / N; re += signal[n] * Math.cos(th); im -= signal[n] * Math.sin(th) }
    mags.push(Math.hypot(re, im) / (N / 2))
  }
  const max = Math.max(...mags) || 1
  mags.forEach((v, k) => { const X = m.X(k), Y = m.Y(v / max); ctx.fillStyle = C.blue; ctx.fillRect(X, Y, m.X(k + 1) - X - 2, m.Y(0) - Y) })
  out['Input'] = `sin(${f1}t) + 0.6 sin(${f2}t) + 0.3 sin(${f3}t)`
  out['Peak bins'] = [f1, f2, f3].join(', ')
  out['DFT size'] = String(N)
}

export const primeSpiral: Renderer = (ctx, w, h, _t, _dt, p, out) => {
  const N = Math.round(p.N ?? 400), cell = Math.max(3, Math.min(w, h) / (Math.sqrt(N) * 1.15))
  const cx = w / 2, cy = h / 2
  const prime = (k: number) => { if (k < 2) return false; for (let d = 2; d * d <= k; d++) if (k % d === 0) return false; return true }
  let x = 0, y = 0, dx = 1, dy = 0, seg = 1, segLen = 1, count = 0
  for (let k = 1; k <= N; k++) {
    ctx.fillStyle = prime(k) ? C.blue : 'rgba(120,150,200,.16)'
    ctx.fillRect(cx + x * cell - 1, cy - y * cell - 1, Math.max(1, cell - 1), Math.max(1, cell - 1))
    x += dx; y += dy; count++
    if (count === segLen) { count = 0; ;[dx, dy] = [-dy, dx]; if (dy === 0) seg++; segLen = seg }
  }
  out['Numbers plotted'] = String(N)
  out['Primes ≤ N'] = String(Array.from({ length: N }, (_, i) => i + 1).filter(prime).length)
  out['Pattern'] = 'Ulam spiral — primes align on diagonals'
}

export const mandelbrot: Renderer = (ctx, w, h, _t, _dt, p, out) => {
  const zoom = p.zoom ?? 1, cx = p.cx ?? -.6, cy = p.cy ?? 0, max = Math.round(p.iter ?? 40)
  const scale = 3.2 / zoom
  for (let px = 0; px < w; px += 3) for (let py = 0; py < h; py += 3) {
    const cr = cx + (px / w - .5) * scale, ci = cy + (py / h - .5) * scale
    let zr = 0, zi = 0, k = 0
    while (zr * zr + zi * zi < 4 && k < max) { const nzr = zr * zr - zi * zi + cr; zi = 2 * zr * zi + ci; zr = nzr; k++ }
    const v = k / max
    ctx.fillStyle = k === max ? '#05070d' : `hsl(${220 - v * 190},75%,${25 + 40 * v}%)`
    ctx.fillRect(px, py, 3, 3)
  }
  out['Iterations'] = String(max); out['Zoom'] = zoom.toFixed(2) + '×'
  out['Set'] = 'z ↦ z² + c, bounded orbits'
}

export const neuralNetwork: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const layers = [3, Math.round(p.width ?? 5), Math.round(p.width ?? 5), 2]
  const pos = layers.map((n, li) => Array.from({ length: n }, (_, i) => ({
    x: w * (.12 + li * .25), y: h * (i + 1) / (n + 1),
  })))
  const act = (z: number) => 1 / (1 + Math.exp(-z))
  const scale = p.weight ?? 1
  pos.slice(0, -1).forEach((layer, li) => layer.forEach((a, i) => pos[li + 1].forEach((b, j) => {
    const wt = Math.sin(i * 3.1 + j * 1.7 + li) * scale
    const pulse = (Math.sin(t * 2 + i + j + li) + 1) / 2
    ctx.strokeStyle = wt >= 0 ? `rgba(110,168,255,${.12 + pulse * .5})` : `rgba(255,122,144,${.12 + pulse * .5})`
    ctx.lineWidth = Math.abs(wt) * 1.6 + .3
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
  })))
  pos.forEach((layer, li) => layer.forEach((pt, i) => {
    const z = li === 0 ? (i + 1) / 4 : act((i + 1 - layer.length / 2) * .7 * scale + Math.sin(t + i) * .1)
    dot(ctx, pt.x, pt.y, 8 + 6 * z, li === pos.length - 1 ? C.amber : C.violet, 8)
    if (li === 0) text(ctx, String((i + 1) / 4), pt.x - 24, pt.y + 4, C.text, 10)
  }))
  text(ctx, 'input', pos[0][0].x - 15, 24, C.text, 10)
  text(ctx, 'hidden', pos[1][0].x - 15, 24, C.text, 10)
  text(ctx, 'output', pos[3][0].x - 15, 24, C.text, 10)
  out['Layers'] = layers.join(' → ')
  out['Parameters'] = String(pos.slice(0, -1).reduce((s, l, i) => s + l.length * pos[i + 1].length, 0))
  out['Activation'] = 'sigmoid σ(z) = 1/(1+e^{−z})'
}

export const randomWalk: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const n = Math.round(p.steps ?? 600), sig = p.sigma ?? 1
  const m = mappers(w, h, -90, 90, -90, 90, 30)
  const path: [number, number][] = []
  let x = 0, y = 0
  for (let i = 0; i < n; i++) { x += sig * (seeded(i * 2) - .5) * 6; y += sig * (seeded(i * 2 + 1) - .5) * 6; path.push([m.X(x), m.Y(y)]) }
  line(ctx, path, 'rgba(110,168,255,.7)', 1.2)
  ctx.strokeStyle = C.axis; ctx.beginPath(); ctx.moveTo(0, m.Y(0)); ctx.lineTo(w, m.Y(0)); ctx.moveTo(m.X(0), 0); ctx.lineTo(m.X(0), h); ctx.stroke()
  const idx = Math.min(path.length - 1, Math.floor((t * 60) % path.length))
  dot(ctx, path[idx][0], path[idx][1], 5, C.amber, 14)
  out['Steps'] = String(n); out['Final (x,y)'] = `${x.toFixed(1)}, ${y.toFixed(1)}`
  out[' RMS distance'] = Math.hypot(x, y).toFixed(2)
  out['Erupt² ∝ t'] = 'diffusive scaling'
}

export const modularClock: Renderer = (ctx, w, h, t, _dt, p, out) => {
  const n = Math.round(p.n ?? 12), k = Math.round(p.k ?? 3)
  const cx = w / 2, cy = h / 2, R = Math.min(w, h) * .36
  ctx.strokeStyle = 'rgba(110,168,255,.5)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 2 * Math.PI); ctx.stroke()
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + 2 * Math.PI * i / n
    const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a)
    dot(ctx, x, y, 12, i === 0 ? C.green : '#18243a', 4)
    text(ctx, String(i), x - 4, y + 4, C.text, 11)
  }
  const orbit: number[] = []
  let v = 1
  for (let i = 0; i < n + 1; i++) { orbit.push(v); v = (v * k) % n; if (v === 1 && i > 0) break }
  const pts: [number, number][] = orbit.map(i => {
    const a = -Math.PI / 2 + 2 * Math.PI * i / n
    return [cx + R * .68 * Math.cos(a), cy + R * .68 * Math.sin(a)]
  })
  line(ctx, pts, C.amber, 2)
  const idx = Math.floor(t) % orbit.length
  dot(ctx, pts[idx][0], pts[idx][1], 5, C.red, 12)
  out['Modulus'] = String(n); out['Multiply by'] = String(k)
  out['Orbit of 1'] = orbit.join(' → ')
  out['gcd(k,n)'] = String(n && k ? (function g(a: number, b: number): number { return b ? g(b, a % b) : a })(n, k) : n)
}
