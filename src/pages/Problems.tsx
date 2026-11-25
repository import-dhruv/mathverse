import { useMemo, useState } from 'react'
import { ChevronRight, Target, Lightbulb, Eye, EyeOff, Check, ArrowRight, Dices } from 'lucide-react'
import { PROBLEMS, PROBLEM_BY_ID, ALL_TOPICS, GENERATED_FAMILIES, GENERATED_COUNT, INTERNATIONAL_FAMILIES, INTERNATIONAL_COUNT } from '../data'
import { getGeneratedProblem, generatedIdsForFamily, getInternationalProblem, internationalIdsForFamily } from '../data/generated'
import { go } from '../lib/router'
import { progress, useProgress } from '../lib/store'
import { Math as MathTex } from '../components/Math'

type ViewProblem = {
  id: string; title: string; topicId: string; level: string; type: string; concepts: string[]
  statement: string; hints: string[]; answer: string
  solution: { title: string; text: string; math?: string }[]
  mistakes?: string[]; further?: string; generated?: boolean
}

function asView(p: any): ViewProblem | null { return p ? { ...p, generated: Boolean(p.familyId) } : null }

export function ProblemArena() {
  const [level, setLevel] = useState('All')
  const [type, setType] = useState('All')
  const [topic, setTopic] = useState('All')
  const [q, setQ] = useState('')
  const [page, setPage] = useState(0)
  const p = useProgress()
  const levels = ['All', ...new Set(PROBLEMS.map(x => x.level))]
  const types = ['All', ...new Set(PROBLEMS.map(x => x.type))]

  const filtered = useMemo(() => PROBLEMS.filter(x =>
    (level === 'All' || x.level === level) && (type === 'All' || x.type === type) &&
    (topic === 'All' || x.topicId === topic) &&
    (!q || (x.title + x.statement).toLowerCase().includes(q.toLowerCase())),
  ), [level, type, topic, q])
  const pageSize = 12
  const shown = filtered.slice(page * pageSize, (page + 1) * pageSize)

  return (
    <div>
      <div className="eyebrow">Problem bank</div>
      <h1 style={{ fontSize: 'clamp(2rem,3.4vw,2.7rem)', margin: '10px 0' }}>Practice that tests understanding</h1>
      <p className="lead">{PROBLEMS.length} authored problems plus {GENERATED_COUNT.toLocaleString()} deterministic generated variants. Solutions stay hidden until you request them.</p>

      <div className="stat-strip five" style={{ marginTop: 20 }}>
        <div className="card panel"><div className="eyebrow">Authored</div><div className="m-val">{PROBLEMS.length}</div><div className="m-label">Full solutions & alternatives</div></div>
        <div className="card panel"><div className="eyebrow">Generated</div><div className="m-val">{GENERATED_COUNT.toLocaleString()}</div><div className="m-label">Deterministic variants</div></div>
        <div className="card panel"><div className="eyebrow">International</div><div className="m-val">{INTERNATIONAL_COUNT.toLocaleString()}</div><div className="m-label">Olympiad-level problems</div></div>
        <div className="card panel"><div className="eyebrow">Solved</div><div className="m-val">{p.solved.length}</div><div className="m-label">By you</div></div>
        <div className="card panel"><div className="eyebrow">Families</div><div className="m-val">{GENERATED_FAMILIES.length}</div><div className="m-label">Verified formula templates</div></div>
      </div>

      <div className="section-head"><div><h2>Authored problems</h2></div><span className="subtle">{filtered.length} match your filters</span></div>
      <div className="filter-bar">
        <input value={q} onChange={e => { setQ(e.target.value); setPage(0) }} placeholder="Search problems…" />
        <select value={level} onChange={e => { setLevel(e.target.value); setPage(0) }}>{levels.map(l => <option key={l}>{l}</option>)}</select>
        <select value={type} onChange={e => { setType(e.target.value); setPage(0) }}>{types.map(t => <option key={t}>{t}</option>)}</select>
        <select value={topic} onChange={e => { setTopic(e.target.value); setPage(0) }}><option>All</option>{ALL_TOPICS.map(t => <option value={t.id} key={t.id}>{t.title}</option>)}</select>
      </div>
      <div className="grid g2">
        {shown.map(x => <button className="card card-hover problem-card" key={x.id} onClick={() => go(`/problem/${x.id}`)} style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="chip">{x.type}</span><span className="chip">{x.level}</span>
            {p.solved.includes(x.id) && <span className="chip" style={{ color: '#4fd1a5' }}><Check size={11} /> solved</span>}
          </div>
          <h3 style={{ marginTop: 10 }}>{x.title}</h3>
          <p className="problem-statement" style={{ margin: 0 }}>{x.statement.slice(0, 190)}{x.statement.length > 190 ? '…' : ''}</p>
          <div className="subtle" style={{ marginTop: 10 }}>{ALL_TOPICS.find(t => t.id === x.topicId)?.title ?? x.topicId} · {x.concepts.slice(0, 3).join(', ')}</div>
        </button>)}
      </div>
      {filtered.length > pageSize && <div style={{ display: 'flex', gap: 8, marginTop: 16, alignItems: 'center', justifyContent: 'center' }}>
        <button className="btn btn-sm" disabled={page === 0} onClick={() => setPage(x => x - 1)}>Previous</button>
        <span className="subtle">Page {page + 1} of {Math.ceil(filtered.length / pageSize)}</span>
        <button className="btn btn-sm" disabled={(page + 1) * pageSize >= filtered.length} onClick={() => setPage(x => x + 1)}>Next</button>
      </div>}

      <div className="section-head"><div><div className="eyebrow">International level · olympiad</div><h2>15,000 competition problems</h2></div><span className="subtle">30 families × 500 deterministic variants</span></div>
      <div className="card panel" style={{ marginBottom: 14, borderLeft: '3px solid #c79cff' }}>
        <p className="dim" style={{ margin: 0, lineHeight: 1.7 }}>
          Number theory, algebra, combinatorics, geometry and inequalities at international competition level.
          Every variant is generated from a construction whose answer is exact for all parameter values —
          solutions are included, and practice mode keeps them hidden until requested.
        </p>
        <button className="btn btn-primary btn-sm" style={{ marginTop: 10 }} onClick={() => {
          const f = INTERNATIONAL_FAMILIES[new Date().getDate() % INTERNATIONAL_FAMILIES.length]
          go(`/problem/intl-${f.id}-${new Date().getMonth() * 7 % 500}`)
        }}>Today’s international challenge <ArrowRight size={12} /></button>
      </div>
      <div className="grid g3">
        {INTERNATIONAL_FAMILIES.map(f => <button className="card card-hover" key={f.id} onClick={() => go(`/problem/intl-${f.id}-0`)} style={{ textAlign: 'left', padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
            <span className="sim-tag" style={{ color: '#c79cff' }}>500 variants</span>
            <span className="chip">{f.level}</span>
          </div>
          <h3 style={{ fontSize: 13, margin: '10px 0 5px' }}>{f.title}</h3>
          <p className="subtle" style={{ margin: 0 }}>{f.concepts.join(' · ')}</p>
        </button>)}
      </div>

      <div className="section-head"><div><div className="eyebrow">Generated practice</div><h2>Problem families</h2></div><span className="subtle">{GENERATED_COUNT.toLocaleString()} verified variants</span></div>
      <div className="grid g3">
        {GENERATED_FAMILIES.map(f => <button className="card card-hover" key={f.id} onClick={() => go(`/problem/gen-${f.id}-0`)} style={{ textAlign: 'left', padding: 16 }}>
          <div className="sim-tag"><Dices size={11} style={{ verticalAlign: -1 }} /> 500 variants</div>
          <h3 style={{ fontSize: 13, margin: '9px 0 5px' }}>{f.title}</h3>
          <p className="subtle" style={{ margin: 0 }}>{f.concepts.join(' · ')} · {f.level}</p>
        </button>)}
      </div>
    </div>
  )
}

export function ProblemPage({ id }: { id: string }) {
  const view = asView(id.startsWith('gen-') ? getGeneratedProblem(id)
    : id.startsWith('intl-') ? getInternationalProblem(id) : PROBLEM_BY_ID[id])
  const [revealed, setRevealed] = useState(false)
  const [hintsShown, setHintsShown] = useState(0)
  const [attempt, setAttempt] = useState('')
  const p = useProgress()
  if (!view) return <div className="empty-state">Problem not found. <button className="btn btn-sm" onClick={() => go('/problems')}>Problem bank</button></div>

  const family = /^(?:gen|intl)-([a-z0-9-]+)-\d+$/.exec(id)?.[1] ?? null
  const siblings = family
    ? (id.startsWith('intl-') ? internationalIdsForFamily(family) : generatedIdsForFamily(family)).slice(0, 20)
    : []

  return (
    <div>
      <div className="breadcrumb"><button onClick={() => go('/problems')}>Problem Bank</button><ChevronRight size={11} /><span>{view.title}</span></div>
      <div style={{ maxWidth: 900 }}>
        <div className="card" style={{ padding: 24, borderLeft: '3px solid #ffb454' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="chip">{view.type}</span><span className="chip">{view.level}</span>
            {view.generated && <span className="chip">Generated · deterministic</span>}
            {id.startsWith('intl-') && <span className="chip" style={{ color: '#c79cff', borderColor: 'rgba(199,156,255,.4)' }}>International olympiad level</span>}
          </div>
          <h1 style={{ fontSize: 'clamp(1.7rem,3vw,2.3rem)', margin: '12px 0' }}>{view.title}</h1>
          <p style={{ fontSize: 15.5, color: 'var(--text)', lineHeight: 1.8 }}>{view.statement}</p>
          <button className="btn btn-sm" onClick={() => go(`/topic/${view.topicId}`)}>Related theory: {view.topicId.replace(/-/g, ' ')} <ArrowRight size={12} /></button>
        </div>

        <div className="card panel" style={{ marginTop: 14 }}>
          <div className="panel-title"><h3><Target size={14} style={{ verticalAlign: -2 }} /> Your attempt</h3><span className="subtle">private to this browser</span></div>
          <textarea className="proof-textarea" style={{ minHeight: 130 }} value={attempt} onChange={e => setAttempt(e.target.value)} placeholder="Write your reasoning here before revealing hints or the solution…" />
          <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={() => setHintsShown(h => Math.min(view.hints.length, h + 1))}><Lightbulb size={12} /> Reveal hint {Math.min(hintsShown + 1, view.hints.length)}</button>
            <button className="btn btn-sm" onClick={() => setRevealed(r => !r)}>{revealed ? <EyeOff size={12} /> : <Eye size={12} />} {revealed ? 'Hide solution' : 'Reveal solution'}</button>
            <button className={`btn ${p.solved.includes(id) ? '' : 'btn-primary'} btn-sm`} onClick={() => progress.toggle('solved', id)}><Check size={12} /> {p.solved.includes(id) ? 'Solved' : 'Mark solved'}</button>
          </div>
          {hintsShown > 0 && <div className="callout intuition" style={{ marginTop: 12 }}><div className="co-title">Hint {hintsShown}</div><p>{view.hints[hintsShown - 1]}</p></div>}
        </div>

        {revealed && <div className="card panel" style={{ marginTop: 14 }}>
          <div className="panel-title"><h3>Detailed solution</h3><span className="chip">answer: {view.answer}</span></div>
          {view.solution.map((s, i) => <div className="step" key={i}><div className="step-n">{i + 1}</div><div><h4>{s.title}</h4><p>{s.text}</p>{s.math && <div className="math-block"><MathTex tex={s.math} display /></div>}</div></div>)}
          {view.mistakes && view.mistakes.length > 0 && <div className="callout warning" style={{ marginTop: 12 }}><div className="co-title">Common wrong approaches</div><ul style={{ margin: 0 }}>{view.mistakes.map(m => <li key={m}>{m}</li>)}</ul></div>}
          {view.further && <div className="callout application" style={{ marginTop: 12 }}><div className="co-title">Go further</div><p>{view.further}</p></div>}
        </div>}

        {siblings.length > 0 && <div className="card panel" style={{ marginTop: 14 }}>
          <div className="panel-title"><h3>More variants of this family</h3><span className="subtle">same method, new numbers</span></div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {siblings.map(s => <button className="btn btn-sm" key={s} onClick={() => go(`/problem/${s}`)}>{s.split('-').pop()}</button>)}
          </div>
        </div>}
      </div>
    </div>
  )
}
