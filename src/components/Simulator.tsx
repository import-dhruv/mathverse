import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Play, Pause, RotateCcw, Sigma, Download, Bookmark } from 'lucide-react'
import { SIM_BY_ID } from '../data/simulations'
import { useCanvas } from './sim/useCanvas'
import type { Params, Readout, Renderer } from './sim/renderers'
import * as R1 from './sim/renderers'
import * as R2 from './sim/renderers2'

const RENDERERS: Record<string, Renderer> = {
  'function-plotter': R1.functionPlotter, 'unit-circle': R1.unitCircle, 'complex-plane': R1.complexPlane,
  'matrix-transform': R1.matrixTransform, eigenvectors: R1.eigenvectors, 'gradient-descent': R1.gradientDescent,
  'optimization-landscape': R2.optimizationLandscape,
  'tangent-line': R1.tangentLine, 'riemann-sums': R1.riemannSums, 'taylor-approximation': R1.taylorApprox,
  'series-convergence': R1.seriesConvergence, 'fourier-series': R1.fourierSeries, 'vector-field': R1.vectorField,
  'surface-plot': R2.surfacePlot, 'gradient-field': R2.gradientField, 'distribution-lab': R2.distributionLab,
  'clt-simulation': R2.cltSimulation, 'bayes-updater': R2.bayesUpdater, 'markov-chain': R2.markovChain,
  'graph-algorithms': R2.graphAlgorithms, 'newton-fractal': R2.newtonFractal, 'ode-flow': R2.odeFlow,
  'pde-heat': R2.pdeHeat, 'lorenz-attractor': R2.lorenz, 'sir-model': R2.sirModel,
  'bisection-visual': R2.bisectionVisual, 'conic-sections': R2.conicSections, 'regression-fit': R2.regressionFit,
  'group-table': R2.groupTable, 'curvature-visual': R2.curvatureVisual, 'fft-spectrum': R2.fftSpectrum,
  'prime-spiral': R2.primeSpiral, mandelbrot: R2.mandelbrot, 'neural-network': R2.neuralNetwork,
  'random-walk': R2.randomWalk, 'modular-clock': R2.modularClock,
}

export function Simulator({ simId }: { simId: string }) {
  const meta = SIM_BY_ID[simId]
  const [params, setParams] = useState<Params>(() =>
    Object.fromEntries((meta?.controls ?? []).map(c => [c.key, c.value])),
  )
  const [playing, setPlaying] = useState(true)
  const [resetKey, setResetKey] = useState(0)
  const [display, setDisplay] = useState<Readout>({})
  const readout = useRef<Readout>({})
  const renderer = RENDERERS[simId]

  const draw = useMemo<Renderer>(() => (ctx, w, h, t, dt, p, out) => {
    if (renderer) renderer(ctx, w, h, t, dt, p, out)
    else { ctx.fillStyle = '#8fa0bb'; ctx.font = '13px Inter'; ctx.fillText('Visualisation unavailable', 20, 30) }
  }, [renderer])

  const canvasRef = useCanvas(
    (ctx, w, h, t, dt) => draw(ctx, w, h, t, dt, params, readout.current),
    [params, draw], playing, resetKey,
  )

  useEffect(() => {
    if (!meta) return
    try {
      const saved = JSON.parse(localStorage.getItem(`mathverse-sim-${simId}`) ?? 'null')
      if (saved) setParams({ ...Object.fromEntries(meta.controls.map(c => [c.key, c.value])), ...saved })
    } catch { /* ignore */ }
  }, [simId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const id = window.setInterval(() => setDisplay({ ...readout.current }), 180)
    return () => clearInterval(id)
  }, [])

  if (!meta) return null

  const defaults = () => Object.fromEntries(meta.controls.map(c => [c.key, c.value]))
  const reset = () => { setParams(defaults()); setResetKey(k => k + 1); setPlaying(true) }
  const save = () => {
    try { localStorage.setItem(`mathverse-sim-${simId}`, JSON.stringify(params)) } catch { /* ignore */ }
  }
  const exportPng = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const a = document.createElement('a')
    a.download = `mathverse-${simId}.png`
    a.href = canvas.toDataURL('image/png')
    a.click()
  }

  // A few visualizations expose direct manipulation: drag the point on the
  // unit circle, the contact point of a tangent, or the start of a descent.
  const dragging = useRef(false)
  const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
  const drag = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = e.clientX - rect.left, py = e.clientY - rect.top
    if (simId === 'unit-circle') {
      const cx = rect.width * .46, cy = rect.height * .52
      const deg = ((Math.atan2(cy - py, px - cx) * 180 / Math.PI) % 360 + 360) % 360
      setParams(p => ({ ...p, theta: Math.round(deg) }))
    } else if (simId === 'tangent-line') {
      const x = -3 + (px - 38) / Math.max(1, rect.width - 76) * 6
      setParams(p => ({ ...p, x0: Number(clamp(x, -2.5, 2.5).toFixed(2)) }))
    } else if (simId === 'gradient-descent') {
      const x = -5 + (px - 36) / Math.max(1, rect.width - 72) * 10
      const y = 5 - (py - 36) / Math.max(1, rect.height - 72) * 10
      setParams(p => ({ ...p, x0: Number(clamp(x, -4, 4).toFixed(1)), y0: Number(clamp(y, -4, 4).toFixed(1)) }))
    } else if (simId === 'optimization-landscape') {
      const x = -2 + (px - 40) / Math.max(1, rect.width - 80) * 4
      const y = -1 + (1 - (py - 40) / Math.max(1, rect.height - 80)) * 4
      setParams(p => ({ ...p, x: Number(clamp(x, -2, 2).toFixed(2)), y: Number(clamp(y, -1, 3).toFixed(2)) }))
    }
  }
  const draggable = ['unit-circle', 'tangent-line', 'gradient-descent', 'optimization-landscape'].includes(simId)

  return (
    <div className="sim-shell">
      <div className="sim-head">
        <h4><Sigma size={14} style={{ color: '#4fd1a5' }} /> {meta.title} <span className="sim-tag">live visualization</span></h4>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="icon-btn" onClick={() => setPlaying(p => !p)} title={playing ? 'Pause' : 'Play'}>
            {playing ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button className="icon-btn" onClick={reset} title="Reset"><RotateCcw size={14} /></button>
          <button className="icon-btn" onClick={save} title="Save experiment parameters"><Bookmark size={14} /></button>
          <button className="icon-btn" onClick={exportPng} title="Export PNG"><Download size={14} /></button>
        </div>
      </div>
      <div className="sim-body">
        <div className="sim-canvas-wrap"><canvas ref={canvasRef}
          style={draggable ? { cursor: 'grab' } : undefined}
          onPointerDown={draggable ? e => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); drag(e) } : undefined}
          onPointerMove={draggable ? e => { if (dragging.current) drag(e) } : undefined}
          onPointerUp={draggable ? e => { dragging.current = false; e.currentTarget.releasePointerCapture(e.pointerId) } : undefined}
        /></div>
        <div className="sim-panel">
          {meta.controls.map(c => (
            <div className="control" key={c.key}>
              <label htmlFor={`${simId}-${c.key}`}><span>{c.label}</span><b>{params[c.key]}{c.unit ? ` ${c.unit}` : ''}</b></label>
              <input id={`${simId}-${c.key}`} type="range" min={c.min} max={c.max} step={c.step} value={params[c.key]}
                onChange={e => setParams(p => ({ ...p, [c.key]: Number(e.target.value) }))} />
            </div>
          ))}
          <div className="sim-readout">
            {Object.entries(display).slice(0, 8).map(([k, v]) => (
              <div className="readout" key={k}><span>{k}</span><b>{v}</b></div>
            ))}
          </div>
          <div className="sim-actions"><button className="btn btn-sm" onClick={reset}><RotateCcw size={12} /> Reset</button></div>
        </div>
      </div>
      <div className="sim-reading"><b>Reading the visualization:</b> {meta.reading.join(' ')}</div>
    </div>
  )
}

export function SimCard({ simId }: { simId: string }) {
  const meta = SIM_BY_ID[simId]
  if (!meta) return null
  return (
    <div className="card card-hover" style={{ padding: 16 }}>
      <div className="sim-tag" style={{ marginBottom: 8 }}>interactive visualization</div>
      <h3 style={{ fontSize: 14, marginBottom: 6 }}>{meta.title}</h3>
      <p className="subtle" style={{ margin: 0, lineHeight: 1.6 }}>{meta.description}</p>
    </div>
  )
}
