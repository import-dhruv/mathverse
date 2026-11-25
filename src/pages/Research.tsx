import { ChevronRight, Telescope, BookOpen, ArrowRight } from 'lucide-react'
import { FRONTIERS, FRONTIER_BY_ID, TIMELINE, MATHEMATICIANS, PAPERS, PAPERS_BY_FRONTIER } from '../data'
import { go } from '../lib/router'
import { Math } from '../components/Math'

const statusLabel: Record<string, string> = {
  'Theorem': 'theorem', 'Conjecture': 'conjecture', 'Open problem': 'open',
  'Active research': 'active', 'Research programme': 'research-programme',
  'Theorem of independence': 'theorem', 'Established framework': 'theorem',
}

export function ResearchPage({ focus }: { focus?: string }) {
  return (
    <div>
      <div className="eyebrow">Research frontiers</div>
      <h1 style={{ fontSize: 'clamp(2rem,3.4vw,2.7rem)', margin: '10px 0' }}>The edge of what we know</h1>
      <p className="lead">Major conjectures, open problems and active research programmes. Proven results, conjectures, numerical evidence and open questions are labelled separately — never conflated.</p>
      <div className="filter-bar" style={{ marginTop: 20 }}>
        {['All', 'Open problem', 'Conjecture', 'Active research', 'Research programme', 'Theorem'].map(s => (
          <span className="chip" key={s}>{s}</span>
        ))}
      </div>
      <div className="grid g2">
        {FRONTIERS.map(f => <button className="card card-hover" key={f.id} onClick={() => go(`/research/${f.id}`)} style={{ textAlign: 'left', padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
            <div className="sim-tag"><Telescope size={11} style={{ verticalAlign: -1 }} /> {f.field}</div>
            <span className={`tag-status ${statusLabel[f.status] ?? 'active'}`}>{f.status}</span>
          </div>
          <h3 style={{ margin: '12px 0 6px' }}>{f.title}</h3>
          <p className="subtle" style={{ lineHeight: 1.6, margin: 0 }}>{f.summary.slice(0, 190)}{f.summary.length > 190 ? '…' : ''}</p>
          <div style={{ marginTop: 8 }}><Math tex={f.statement} /></div>
        </button>)}
      </div>
    </div>
  )
}

export function FrontierPage({ id }: { id: string }) {
  const f = FRONTIER_BY_ID[id]
  if (!f) return <div className="empty-state">Research topic not found. <button className="btn btn-sm" onClick={() => go('/research')}>All frontiers</button></div>
  const papers = PAPERS_BY_FRONTIER.get(id) ?? []
  return (
    <div>
      <div className="breadcrumb"><button onClick={() => go('/research')}>Research Frontiers</button><ChevronRight size={11} /><span>{f.title}</span></div>
      <div className="card" style={{ padding: 24, borderLeft: '3px solid #a9c6ff' }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <span className={`tag-status ${statusLabel[f.status] ?? 'active'}`}>{f.status}</span>
          <span className="chip">{f.field}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.9rem,3.2vw,2.6rem)', margin: '12px 0' }}>{f.title}</h1>
        <p className="lead">{f.summary}</p>
        <div className="math-block" style={{ marginTop: 16 }}><Math tex={f.statement} display /></div>
      </div>

      <div className="feature-row" style={{ marginTop: 16 }}>
        <div className="card panel">
          <div className="panel-title"><h3>Historical background</h3></div>
          <p style={{ color: 'var(--text-2)' }}>{f.history}</p>
          <div className="panel-title" style={{ marginTop: 18 }}><h3>Prerequisites</h3></div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {f.prerequisites.map(t => <button className="chip" key={t} onClick={() => go(`/topic/${t}`)}>{t.replace(/-/g, ' ')}</button>)}
          </div>
        </div>
        <div className="card panel">
          <div className="panel-title"><h3>Known results</h3></div>
          <ul>{f.known.map(k => <li key={k}>{k}</li>)}</ul>
          <div className="panel-title" style={{ marginTop: 18 }}><h3>Important theorems</h3></div>
          <ul>{f.theorems.map(k => <li key={k}>{k}</li>)}</ul>
        </div>
      </div>

      <div className="feature-row" style={{ marginTop: 16 }}>
        <div className="card panel">
          <div className="panel-title"><h3>Major researchers</h3></div>
          <p className="dim">{f.researchers.join(' · ')}</p>
          <div className="panel-title" style={{ marginTop: 18 }}><h3>Current research directions</h3></div>
          <ul>{f.directions.map(d => <li key={d}>{d}</li>)}</ul>
        </div>
        <div className="card panel">
          <div className="panel-title"><h3>Unsolved questions</h3></div>
          <div className="callout warning"><div className="co-title">Open — do not treat as proved</div><ol style={{ margin: 0 }}>{f.questions.map(q => <li key={q}>{q}</li>)}</ol></div>
          {f.experiments && <><div className="panel-title" style={{ marginTop: 18 }}><h3>Computational experiments</h3></div><p className="subtle">{f.experiments}</p></>}
        </div>
      </div>

      <div className="card panel" style={{ marginTop: 16 }}>
        <div className="panel-title"><h3>References & further reading</h3><BookOpen size={15} /></div>
        <ul>{f.references.map(r => <li key={r}>{r}</li>)}</ul>
        {papers.length > 0 && <><h4 style={{ fontSize: 12, margin: '14px 0 8px' }}>Library papers</h4>
          {papers.map(pa => <div className="mini-item" key={pa.id} onClick={() => go('/library')} style={{ cursor: 'pointer' }}><span className="mi-num">↗</span><div><div className="mi-title">{pa.title}</div><div className="mi-sub">{pa.authors.join(', ')} · {pa.year}</div></div></div>)}</>}
      </div>
    </div>
  )
}

export function HistoryPage({ focus }: { focus?: string }) {
  const person = MATHEMATICIANS.find(m => m.id === focus)
  return (
    <div>
      <div className="eyebrow">History of mathematics</div>
      <h1 style={{ fontSize: 'clamp(2rem,3.4vw,2.7rem)', margin: '10px 0' }}>How mathematical ideas came to be</h1>
      <p className="lead">Discoveries, not just biographies: timelines are organised around the mathematical idea that changed what could be thought next.</p>
      {person && <div className="card panel" style={{ marginTop: 18, borderLeft: '3px solid #c79cff' }}>
        <div className="eyebrow">Mathematician</div><h2 style={{ fontSize: '1.5rem', margin: '8px 0' }}>{person.name}</h2>
        <p className="subtle">{person.years} · {person.field}</p><p style={{ color: 'var(--text-2)' }}>{person.contribution}</p>
        <button className="btn btn-sm" onClick={() => go('/history')}>Full timeline</button>
      </div>}
      <div className="feature-row" style={{ marginTop: 20 }}>
        <div className="card panel">
          <div className="panel-title"><h3>Discovery timeline</h3><span className="chip">{TIMELINE.length} milestones</span></div>
          <div className="timeline">
            {TIMELINE.map(e => <div className="tl-event" key={e.id}>
              <div className="tl-year">{e.year}</div><div className="tl-title">{e.title}</div>
              <div className="tl-desc">{e.description}</div>
              {e.figure && <div className="subtle" style={{ marginTop: 4 }}>Figure: {e.figure}</div>}
            </div>)}
          </div>
        </div>
        <div className="card panel">
          <div className="panel-title"><h3>Mathematicians</h3><span className="chip">{MATHEMATICIANS.length}</span></div>
          <div className="grid g2">
            {MATHEMATICIANS.map(m => <div className="mini-item" key={m.id} onClick={() => go(`/history/${m.id}`)} style={{ cursor: 'pointer' }}>
              <div><div className="mi-title">{m.name}</div><div className="mi-sub">{m.field} · {m.years}</div></div>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  )
}
