import { useState } from 'react'
import { Play, ArrowRight, Sigma, ChevronRight } from 'lucide-react'
import { SIMULATIONS, SIM_BY_ID, BRANCHES, BRANCH_BY_ID } from '../data'
import { Simulator } from '../components/Simulator'
import { go } from '../lib/router'

export function VisualPage() {
  const [branch, setBranch] = useState('All')
  const [q, setQ] = useState('')
  const list = SIMULATIONS.filter(s => (branch === 'All' || s.branchId === branch) &&
    (s.title.toLowerCase().includes(q.toLowerCase()) || s.description.toLowerCase().includes(q.toLowerCase())))
  const featured = SIMULATIONS[0]
  return (
    <div>
      <div className="eyebrow">Visual mathematics engine</div>
      <h1 style={{ fontSize: 'clamp(2rem,3.4vw,2.7rem)', margin: '10px 0' }}>See mathematics move</h1>
      <p className="lead">Drag parameters, change coefficients and watch equations respond. Every visualization is computed in the browser from the actual mathematics — no pre-rendered animation, no black box.</p>

      <div className="section-head"><div><div className="eyebrow">Featured experiment</div><h2>{featured.title}</h2></div><button className="btn btn-sm" onClick={() => go(`/simulation/${featured.id}`)}>Open in focus mode <ArrowRight size={13} /></button></div>
      <Simulator simId={featured.id} />

      <div className="section-head"><div><h2>All {SIMULATIONS.length} visualizations</h2></div></div>
      <div className="filter-bar">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search visualizations…" style={{ minWidth: 240 }} />
        <button className={`chip ${branch === 'All' ? 'chip-active' : ''}`} onClick={() => setBranch('All')}>All branches</button>
        {BRANCHES.filter(b => SIMULATIONS.some(s => s.branchId === b.id)).map(b => (
          <button key={b.id} className={`chip ${branch === b.id ? 'chip-active' : ''}`} onClick={() => setBranch(b.id)}>{b.short}</button>
        ))}
      </div>
      <div className="grid g3">
        {list.map(s => <button className="card card-hover" key={s.id} onClick={() => go(`/simulation/${s.id}`)} style={{ textAlign: 'left', padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="sim-tag"><Play size={11} style={{ verticalAlign: -1 }} /> live</span>
            <span className="chip">{BRANCH_BY_ID[s.branchId]?.short ?? s.branchId}</span>
          </div>
          <h3 style={{ margin: '12px 0 6px' }}>{s.title}</h3>
          <p className="subtle" style={{ lineHeight: 1.6, margin: 0 }}>{s.description}</p>
          {s.equations[0] && <div style={{ marginTop: 10, fontSize: 11, color: '#8b7cff' }}><Sigma size={11} style={{ verticalAlign: -1 }} /> {s.equations[0].slice(0, 54)}</div>}
        </button>)}
      </div>
      {list.length === 0 && <div className="empty-state">No visualizations match your filter.</div>}
    </div>
  )
}

export function SimulationPage({ id }: { id: string }) {
  const meta = SIM_BY_ID[id]
  if (!meta) return <div className="empty-state">Visualization not found. <button className="btn btn-sm" onClick={() => go('/visual')}>All visualizations</button></div>
  const branch = BRANCH_BY_ID[meta.branchId]
  const related = SIMULATIONS.filter(s => s.branchId === meta.branchId && s.id !== id).slice(0, 4)
  return (
    <div>
      <div className="breadcrumb"><button onClick={() => go('/visual')}>Visual Mathematics</button><ChevronRight size={11} /><span>{meta.title}</span></div>
      <div style={{ maxWidth: 1100 }}>
        <div className="eyebrow" style={{ color: branch?.color }}>{branch?.title ?? 'Mathematics'} · live visualization</div>
        <h1 style={{ fontSize: 'clamp(1.9rem,3vw,2.6rem)', margin: '10px 0' }}>{meta.title}</h1>
        <p className="lead" style={{ fontSize: 15 }}>{meta.description}</p>
        <Simulator simId={id} />
        <div className="feature-row">
          <div className="card panel">
            <div className="panel-title"><h3>The mathematics behind it</h3></div>
            {meta.equations.map((e, i) => <div className="math-block" key={i}><span>{e}</span></div>)}
          </div>
          <div className="card panel">
            <div className="panel-title"><h3>How to read it</h3></div>
            <ol>{meta.reading.map(r => <li key={r}>{r}</li>)}</ol>
          </div>
        </div>
        {related.length > 0 && <div className="section-head"><div><h2>Related visualizations</h2></div></div>}
        <div className="grid g2">
          {related.map(s => <button className="card card-hover" key={s.id} onClick={() => go(`/simulation/${s.id}`)} style={{ textAlign: 'left', padding: 16 }}>
            <h3 style={{ fontSize: 13 }}>{s.title}</h3><p className="subtle" style={{ margin: 0 }}>{s.description.slice(0, 120)}…</p>
          </button>)}
        </div>
      </div>
    </div>
  )
}
