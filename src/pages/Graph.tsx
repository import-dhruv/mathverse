import { useEffect, useMemo, useRef, useState } from 'react'
import { Network, ArrowRight } from 'lucide-react'
import { BRANCHES, BRANCH_BY_ID, ALL_TOPICS, TOPIC_BY_ID } from '../data'
import { go } from '../lib/router'

type Node = { id: string; label: string; x: number; y: number; r: number; color: string; branch: string }
type Edge = { a: string; b: number; from: string; to: string }

export function GraphPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [branch, setBranch] = useState('All')
  const [hover, setHover] = useState<{ node: Node; x: number; y: number } | null>(null)
  const [selected, setSelected] = useState<Node | null>(null)

  const graph = useMemo(() => {
    const nodes: Node[] = []
    const edges: Edge[] = []
    BRANCHES.forEach((b, bi) => {
      const a = 2 * Math.PI * bi / BRANCHES.length - Math.PI / 2
      const bx = Math.cos(a), by = Math.sin(a)
      nodes.push({ id: `branch:${b.id}`, label: b.short, x: bx * .58, y: by * .58, r: .026, color: b.color, branch: b.id })
      b.topicIds.forEach((id, ti) => {
        const spread = 2 * Math.PI * ti / b.topicIds.length
        const rr = .12 + .07 * (ti % 3)
        nodes.push({ id: `topic:${id}`, label: TOPIC_BY_ID[id]?.title ?? id, x: bx * .58 + Math.cos(spread) * rr, y: by * .58 + Math.sin(spread) * rr, r: .008, color: b.color, branch: b.id })
        edges.push({ a: '', b: 0, from: `branch:${b.id}`, to: `topic:${id}` })
      })
    })
    ALL_TOPICS.forEach(t => t.prerequisites.forEach((pr, k) => {
      if (TOPIC_BY_ID[pr]) edges.push({ a: '', b: 1, from: `topic:${pr}`, to: `topic:${t.id}` })
      if (k > 2) return
    }))
    return { nodes, edges }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let w = 0, h = 0, raf = 0, t = 0
    const resize = () => {
      const rect = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2)
      w = rect.width; h = rect.height; canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize(); const ro = new ResizeObserver(resize); ro.observe(canvas)
    const map = Object.fromEntries(graph.nodes.map(n => [n.id, n])) as Record<string, Node>
    let R = 1
    const S = (n: Node): [number, number] => [w / 2 + n.x * R, h / 2 + n.y * R + Math.sin(t + n.x * 7) * 1.5]
    const draw = () => {
      t += .002
      ctx.fillStyle = '#070b12'; ctx.fillRect(0, 0, w, h)
      R = Math.min(w, h) * .46
      graph.edges.forEach(e => {
        const A = map[e.from], B = map[e.to]
        if (!A || !B) return
        if (branch !== 'All' && A.branch !== branch && B.branch !== branch) return
        const [ax, ay] = S(A), [bx, by] = S(B)
        ctx.strokeStyle = e.b === 0 ? 'rgba(120,150,210,.18)' : 'rgba(79,209,165,.16)'
        ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke()
      })
      graph.nodes.forEach(n => {
        if (branch !== 'All' && n.branch !== branch) return
        const [x, y] = S(n)
        const rad = Math.max(2.5, n.r * R)
        ctx.beginPath(); ctx.arc(x, y, rad, 0, 2 * Math.PI)
        ctx.fillStyle = n.id.startsWith('branch:') ? '#0e1626' : n.color
        ctx.fill()
        ctx.strokeStyle = n.color; ctx.lineWidth = n.id.startsWith('branch:') ? 2 : .7; ctx.stroke()
        if (n.id.startsWith('branch:') || rad > 5) {
          ctx.fillStyle = n.id.startsWith('branch:') ? '#dce6f7' : 'rgba(220,230,247,.75)'
          ctx.font = n.id.startsWith('branch:') ? '600 10px Inter, sans-serif' : '9px Inter, sans-serif'
          ctx.fillText(n.label, x + rad + 4, y + 3)
        }
      })
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left, my = e.clientY - rect.top
      let best: Node | null = null, bestD = 18
      for (const n of graph.nodes) {
        if (branch !== 'All' && n.branch !== branch) continue
        const [x, y] = S(n), d = Math.hypot(mx - x, my - y)
        if (d < bestD) { bestD = d; best = n }
      }
      const hit = best as Node | null
      if (hit) {
        setSelected(hit)
        if (hit.id.startsWith('branch:')) go(`/branch/${hit.id.slice(7)}`)
        else go(`/topic/${hit.id.slice(6)}`)
      }
    }
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left, my = e.clientY - rect.top
      let found: Node | null = null, bestD = 14
      for (const n of graph.nodes) {
        if (branch !== 'All' && n.branch !== branch) continue
        const [x, y] = S(n), d = Math.hypot(mx - x, my - y)
        if (d < bestD) { bestD = d; found = n }
      }
      const hitNode = found as Node | null
      setHover(hitNode ? { node: hitNode, x: mx, y: my } : null)
    }
    canvas.addEventListener('click', onClick); canvas.addEventListener('mousemove', onMove)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); canvas.removeEventListener('click', onClick); canvas.removeEventListener('mousemove', onMove) }
  }, [graph, branch])

  const selectedTopic = selected?.id.startsWith('topic:') ? TOPIC_BY_ID[selected.id.slice(6)] : null

  return (
    <div>
      <div className="eyebrow">Mathematical connection graph</div>
      <h1 style={{ fontSize: 'clamp(2rem,3.4vw,2.7rem)', margin: '10px 0' }}>Nothing stands alone</h1>
      <p className="lead">Explore how ideas develop across branches. Each hub is a branch; points are topics; green edges are prerequisite dependencies. Click a node to open its article.</p>
      <div className="filter-bar" style={{ marginTop: 20 }}>
        <button className={`chip ${branch === 'All' ? 'chip-active' : ''}`} onClick={() => setBranch('All')}>All branches</button>
        {BRANCHES.map(b => <button key={b.id} className={`chip ${branch === b.id ? 'chip-active' : ''}`} onClick={() => setBranch(b.id)}>{b.short}</button>)}
      </div>
      <div className="graph-wrap">
        <canvas ref={canvasRef} />
        <div className="graph-info">
          <div className="sim-tag"><Network size={11} style={{ verticalAlign: -1 }} /> knowledge map</div>
          <h3 style={{ fontSize: 13, margin: '8px 0 5px' }}>{selected ? selected.label : 'Dependencies & alternative paths'}</h3>
          <p className="subtle" style={{ lineHeight: 1.6, margin: 0 }}>
            {selectedTopic ? selectedTopic.summary.slice(0, 180) : selected?.id.startsWith('branch:')
              ? BRANCH_BY_ID[selected.id.slice(7)]?.description : 'Hover a point to inspect it; click to navigate. Use the branch chips to isolate one area of mathematics.'}
          </p>
          {selectedTopic && <div style={{ marginTop: 8 }}><button className="btn btn-sm" onClick={() => go(`/topic/${selectedTopic.id}`)}>Open article <ArrowRight size={12} /></button></div>}
        </div>
        {hover && <div className="graph-tooltip" style={{ left: hover.x + 12, top: hover.y + 12 }}>{hover.node.label}</div>}
      </div>
    </div>
  )
}
