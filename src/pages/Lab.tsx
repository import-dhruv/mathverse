import { ChevronRight, FlaskConical, ArrowRight, Target, Play } from 'lucide-react'
import { LABS, LAB_BY_ID, SIM_BY_ID, TOPIC_BY_ID } from '../data'
import { Simulator, SimCard } from '../components/Simulator'
import { go } from '../lib/router'

export function LabsPage() {
  return (
    <div>
      <div className="eyebrow">Interactive laboratories</div>
      <h1 style={{ fontSize: 'clamp(2rem,3.4vw,2.7rem)', margin: '10px 0' }}>Experiment, don't just observe</h1>
      <p className="lead">Dedicated laboratories for algebra, geometry, calculus, linear algebra, probability, statistics, differential equations, number theory, optimization, graphs, complex analysis and the mathematics of the real world.</p>
      <div className="grid g3" style={{ marginTop: 24 }}>
        {LABS.map(l => <button className="card card-hover" key={l.id} onClick={() => go(`/lab/${l.id}`)} style={{ textAlign: 'left', padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="bt-icon" style={{ background: 'rgba(110,168,255,.12)', color: '#6ea8ff', width: 30, height: 30, margin: 0 }}><FlaskConical size={15} /></div>
            <span className="chip">Lab {l.letter}</span>
          </div>
          <h3 style={{ margin: '12px 0 6px' }}>{l.title}</h3>
          <p className="subtle" style={{ lineHeight: 1.6, margin: 0 }}>{l.description}</p>
          <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
            <span className="chip">{l.simulationIds.length} experiments</span>
            <ArrowRight size={13} style={{ marginLeft: 'auto', color: '#6f7d93' }} />
          </div>
        </button>)}
      </div>
    </div>
  )
}

export function LabPage({ id }: { id: string }) {
  const lab = LAB_BY_ID[id]
  if (!lab) return <div className="empty-state">Laboratory not found. <button className="btn btn-sm" onClick={() => go('/labs')}>All labs</button></div>
  return (
    <div>
      <div className="breadcrumb"><button onClick={() => go('/labs')}>Mathematical Labs</button><ChevronRight size={11} /><span>{lab.title}</span></div>
      <div className="card" style={{ padding: 24, borderLeft: '3px solid #6ea8ff' }}>
        <div className="eyebrow">Laboratory {lab.letter}</div>
        <h1 style={{ fontSize: 'clamp(1.9rem,3vw,2.6rem)', margin: '10px 0' }}>{lab.title}</h1>
        <p className="lead">{lab.description}</p>
      </div>
      <div className="feature-row" style={{ marginTop: 16 }}>
        <div className="card panel">
          <div className="panel-title"><h3><Target size={14} style={{ verticalAlign: -2 }} /> Learning objectives</h3></div>
          <ul>{lab.objectives.map(o => <li key={o}>{o}</li>)}</ul>
        </div>
        <div className="card panel">
          <div className="panel-title"><h3><Play size={14} style={{ verticalAlign: -2 }} /> Suggested activities</h3></div>
          <ol>{lab.activities.map(a => <li key={a}>{a}</li>)}</ol>
        </div>
      </div>
      <div className="section-head"><div><h2>Experiments in this lab</h2></div></div>
      <div className="grid g3">
        {lab.simulationIds.map(s => <div key={s} onClick={() => go(`/simulation/${s}`)} style={{ cursor: 'pointer' }}><SimCard simId={s} /></div>)}
      </div>
      {lab.simulationIds.map(s => <Simulator key={s} simId={s} />)}
      <div className="section-head"><div><h2>Related theory</h2></div></div>
      <div className="grid g2">
        {lab.topicIds.map(t => TOPIC_BY_ID[t] && (
          <button className="card card-hover" key={t} onClick={() => go(`/topic/${t}`)} style={{ textAlign: 'left', padding: 16 }}>
            <h3 style={{ fontSize: 13 }}>{TOPIC_BY_ID[t].title}</h3>
            <p className="subtle" style={{ margin: 0 }}>{TOPIC_BY_ID[t].summary.slice(0, 130)}…</p>
          </button>
        ))}
      </div>
    </div>
  )
}
