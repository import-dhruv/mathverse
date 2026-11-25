import { ChevronRight, Sigma, ArrowRight } from 'lucide-react'
import { DERIVATIONS, DERIVATION_BY_ID, TOPIC_BY_ID } from '../data'
import { go } from '../lib/router'
import { Blocks } from '../components/Blocks'
import { Math } from '../components/Math'

export function DerivationsPage() {
  return (
    <div>
      <div className="eyebrow">Derivation library</div>
      <h1 style={{ fontSize: 'clamp(2rem,3.4vw,2.7rem)', margin: '10px 0' }}>Equations, derived not memorised</h1>
      <p className="lead">Each derivation states the problem, its assumptions and variables, then reconstructs the result step by step. Limits of validity are made explicit.</p>
      <div className="grid g2" style={{ marginTop: 24 }}>
        {DERIVATIONS.map(d => <button className="card card-hover" key={d.id} onClick={() => go(`/derivation/${d.id}`)} style={{ textAlign: 'left', padding: 18 }}>
          <div className="sim-tag">step-by-step derivation</div>
          <h3 style={{ margin: '10px 0 6px' }}>{d.title}</h3>
          <div style={{ margin: '8px 0' }}><Math tex={d.statement} display /></div>
          <div className="subtle">Topic: {TOPIC_BY_ID[d.topicId]?.title ?? d.topicId} · {d.steps.length} steps</div>
        </button>)}
      </div>
    </div>
  )
}

export function DerivationPage({ id }: { id: string }) {
  const d = DERIVATION_BY_ID[id]
  if (!d) return <div className="empty-state">Derivation not found. <button className="btn btn-sm" onClick={() => go('/derivations')}>All derivations</button></div>
  const topic = TOPIC_BY_ID[d.topicId]
  return (
    <div>
      <div className="breadcrumb"><button onClick={() => go('/derivations')}>Derivations</button><ChevronRight size={11} /><span>{d.title}</span></div>
      <div className="card" style={{ padding: 24, borderLeft: '3px solid #8b7cff' }}>
        <div className="eyebrow"><Sigma size={12} style={{ verticalAlign: -2 }} /> Mathematical derivation</div>
        <h1 style={{ fontSize: 'clamp(1.8rem,3vw,2.5rem)', margin: '10px 0' }}>{d.title}</h1>
        <div className="math-block"><Math tex={d.statement} display /></div>
        <p className="lead" style={{ fontSize: 15 }}>{d.problem}</p>
        {topic && <button className="btn btn-sm" onClick={() => go(`/topic/${topic.id}`)}>Back to {topic.title} <ArrowRight size={12} /></button>}
      </div>

      <div className="feature-row" style={{ marginTop: 16 }}>
        <div className="card panel">
          <div className="panel-title"><h3>Assumptions & hypotheses</h3></div>
          <Blocks blocks={d.assumptions.map(a => ({ kind: 'paragraph', text: a }))} />
          <div className="panel-title" style={{ marginTop: 18 }}><h3>Variables</h3></div>
          <table className="data-table"><thead><tr><th>Symbol</th><th>Meaning</th></tr></thead><tbody>
            {d.variables.map(v => <tr key={v.symbol}><td><Math tex={v.symbol} /></td><td>{v.meaning}</td></tr>)}
          </tbody></table>
        </div>
        <div className="card panel">
          <div className="panel-title"><h3>Tools used</h3></div>
          <ul>{d.tools.map(t => <li key={t}>{t}</li>)}</ul>
          <div className="panel-title" style={{ marginTop: 18 }}><h3>Result</h3></div>
          <div className="math-block"><Math tex={d.result} display /></div>
          <p className="subtle">{d.interpretation}</p>
        </div>
      </div>

      <div className="section-head"><div><h2>Derivation in steps</h2></div><span className="subtle">Reproduce each line before moving on</span></div>
      <div className="steps-box">
        {d.steps.map((s, i) => <div className="step" key={i}>
          <div className="step-n">{i + 1}</div>
          <div><h4>{s.title}</h4><p>{s.text}</p>{s.math && <div className="math-block"><Math tex={s.math} display /></div>}</div>
        </div>)}
      </div>

      <div className="feature-row" style={{ marginTop: 16 }}>
        <div className="card panel">
          <div className="panel-title"><h3>Worked examples</h3></div>
          <ul>{d.examples.map(e => <li key={e}>{e}</li>)}</ul>
          <div className="panel-title" style={{ marginTop: 18 }}><h3>Applications</h3></div>
          <ul>{d.applications.map(a => <li key={a}>{a}</li>)}</ul>
        </div>
        <div className="card panel">
          <div className="panel-title"><h3>Limits & caveats</h3></div>
          <div className="callout warning"><div className="co-title">Where this derivation can fail</div><ul style={{ margin: 0 }}>{d.limitations.map(l => <li key={l}>{l}</li>)}</ul></div>
        </div>
      </div>
    </div>
  )
}
