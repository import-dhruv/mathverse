import { useEffect, useMemo, useState } from 'react'
import {
  Check, Lightbulb, FileCheck2, Sparkles, ArrowRight, Search, BookOpen,
  ShieldCheck, ExternalLink, Compass, FileText, Layers, AlertTriangle,
} from 'lucide-react'
import {
  PROOF_TECHNIQUES, PROOF_EXERCISES, PROOF_ATLAS, PROOF_SOURCES, PROOF_CULTURE,
} from '../data'
import { go } from '../lib/router'
import { progress, useProgress } from '../lib/store'
import { Math } from '../components/Math'

const CHECKLIST = [
  'Every assumption is stated and used',
  'Quantifiers and negations are handled correctly',
  'No step assumes the conclusion',
  'Each implication is justified by a definition or theorem',
  'Edge cases (zero, empty set, v = 0) are handled',
  'The final line matches the exact statement',
]

type Tab = 'atlas' | 'techniques' | 'exercises' | 'workspace' | 'sources'

const statusClass: Record<string, string> = {
  Theorem: 'theorem', Lemma: 'theorem', Corollary: 'theorem',
  'Classical result': 'theorem', 'Proof sketch': 'active', 'Open problem': 'open',
}

export function ProofStudioPage() {
  const p = useProgress()
  const [tab, setTab] = useState<Tab>('atlas')
  const [techniqueId, setTechniqueId] = useState(PROOF_TECHNIQUES[0].id)
  const [exerciseId, setExerciseId] = useState(PROOF_EXERCISES[0].id)
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [draft, setDraft] = useState('')
  const [checked, setChecked] = useState<boolean[]>(CHECKLIST.map(() => false))
  const [query, setQuery] = useState('')
  const [field, setField] = useState('All')
  const [status, setStatus] = useState('All')
  const [proofId, setProofId] = useState<string | null>(PROOF_ATLAS[0]?.id ?? null)

  const technique = PROOF_TECHNIQUES.find(t => t.id === techniqueId)!
  const exercise = PROOF_EXERCISES.find(e => e.id === exerciseId) ?? PROOF_EXERCISES[0]
  const fields = useMemo(() => ['All', ...new Set(PROOF_ATLAS.map(x => x.field))], [])
  const filtered = useMemo(() => PROOF_ATLAS.filter(x =>
    (field === 'All' || x.field === field) && (status === 'All' || x.status === status) &&
    (!query || (x.title + x.idea + x.statement + x.field).toLowerCase().includes(query.toLowerCase())),
  ), [field, status, query])
  const proof = PROOF_ATLAS.find(x => x.id === proofId) ?? filtered[0] ?? null

  useEffect(() => {
    const raw = window.location.hash.split('?')[1] ?? ''
    const id = new URLSearchParams(raw).get('p')
    if (id && PROOF_ATLAS.some(x => x.id === id)) { setProofId(id); setTab('atlas') }
  }, [])

  const tabs: { id: Tab; label: string; icon: typeof Compass }[] = [
    { id: 'atlas', label: `Proof atlas (${PROOF_ATLAS.length})`, icon: Compass },
    { id: 'techniques', label: 'Techniques', icon: Layers },
    { id: 'exercises', label: 'Exercises', icon: FileCheck2 },
    { id: 'workspace', label: 'Write a proof', icon: FileText },
    { id: 'sources', label: 'Formal libraries', icon: BookOpen },
  ]

  return (
    <div>
      <div className="eyebrow">Proof Studio</div>
      <h1 style={{ fontSize: 'clamp(2rem,3.4vw,2.7rem)', margin: '10px 0' }}>The machinery of mathematical certainty</h1>
      <p className="lead">A searchable atlas of classical proofs, the techniques that generate them, a workspace to write your own, and the external formal libraries where mathematics is checked by machine. Every record states its hypotheses and labels its epistemic status.</p>

      <div className="filter-bar" style={{ marginTop: 20 }}>
        {tabs.map(t => <button className={`chip ${tab === t.id ? 'chip-active' : ''}`} key={t.id} onClick={() => setTab(t.id)}>
          <t.icon size={12} /> {t.label}
        </button>)}
      </div>

      {/* ── ATLAS ─────────────────────────────────────────────────────────── */}
      {tab === 'atlas' && <>
        <div className="callout note" style={{ marginTop: 16 }}>
          <div className="co-title">Honest scope</div>
          <p>This atlas contains {PROOF_ATLAS.length} classical proofs — not every proof ever written. Long arguments are labelled <em>Proof sketch</em>, open problems are never presented as theorems, and the Formal libraries tab links to the world's leading machine-checked proof archives for deeper verification.</p>
        </div>
        <div className="card panel" style={{ marginTop: 12 }}>
          <div className="filter-bar" style={{ marginBottom: 10 }}>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search proofs by name, idea or statement…" style={{ minWidth: 300 }} />
            <span className="chip">{filtered.length} shown</span>
          </div>
          <div className="filter-bar" style={{ marginBottom: 6 }}>
            {fields.map(f => <button className={`chip ${field === f ? 'chip-active' : ''}`} key={f} onClick={() => setField(f)}>{f}</button>)}
          </div>
          <div className="filter-bar" style={{ marginBottom: 0 }}>
            {['All', 'Theorem', 'Lemma', 'Classical result', 'Proof sketch'].map(s => <button className={`chip ${status === s ? 'chip-active' : ''}`} key={s} onClick={() => setStatus(s)}>{s}</button>)}
          </div>
        </div>

        <div className="proof-layout" style={{ marginTop: 16 }}>
          <div className="card" style={{ padding: 6, maxHeight: 900, overflowY: 'auto' }}>
            {filtered.map(x => <button key={x.id} className="nav-item" style={{ width: '100%', textAlign: 'left', color: proof?.id === x.id ? '#fff' : 'var(--text-2)', background: proof?.id === x.id ? 'rgba(110,168,255,.10)' : 'transparent' }} onClick={() => setProofId(x.id)}>
              <span style={{ flex: 1 }}>
                <span style={{ fontSize: 12.5, fontWeight: 600, display: 'block' }}>{x.title}</span>
                <span className="subtle" style={{ fontSize: 10.5 }}>{x.field} · {x.level}</span>
              </span>
              <span className={`tag-status ${statusClass[x.status] ?? 'active'}`}>{x.status}</span>
            </button>)}
            {filtered.length === 0 && <div className="empty-state">No proofs match. Try a broader field or a different status.</div>}
          </div>

          {proof && <div>
            <div className="card" style={{ padding: 24, borderLeft: '3px solid #8b7cff' }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span className={`tag-status ${statusClass[proof.status] ?? 'active'}`}>{proof.status}</span>
                <span className="chip">{proof.field}</span><span className="chip">{proof.level}</span>
              </div>
              <h2 style={{ fontSize: '1.5rem', margin: '12px 0' }}>{proof.title}</h2>
              <div className="math-block"><Math tex={proof.statement} display /></div>
              <p style={{ color: 'var(--text-2)', lineHeight: 1.8 }}><strong>Conclusion:</strong> {proof.conclusion}</p>
            </div>

            <div className="card panel" style={{ marginTop: 14 }}>
              <div className="panel-title"><h3>The decisive idea</h3><Sparkles size={15} color="#8b7cff" /></div>
              <div className="callout intuition"><div className="co-title">Insight</div><p>{proof.idea}</p></div>
              <h4 style={{ fontSize: 12, marginTop: 16 }}>Hypotheses</h4>
              <ul>{proof.hypotheses.map(h => <li key={h}>{h}</li>)}</ul>
              {proof.keyLemma && <><h4 style={{ fontSize: 12, marginTop: 14 }}>Key lemma</h4><p className="dim">{proof.keyLemma}</p></>}
            </div>

            <div className="section-head"><div><h2>Proof, step by step</h2></div><span className="subtle">Reconstruct before reading</span></div>
            <div className="steps-box">
              {proof.steps.map((s, i) => <div className="step" key={i}>
                <div className="step-n">{i + 1}</div>
                <div><h4>{s.title}</h4><p>{s.text}</p>{s.math && <div className="math-block"><Math tex={s.math} display /></div>}</div>
              </div>)}
            </div>

            <div className="feature-row" style={{ marginTop: 14 }}>
              <div className="card panel">
                <div className="panel-title"><h3>Hypothesis audit</h3><ShieldCheck size={14} /></div>
                <h4 style={{ fontSize: 12 }}>Where each assumption is used</h4>
                <ul>{proof.assumptionsUsed.map(a => <li key={a}>{a}</li>)}</ul>
                <h4 style={{ fontSize: 12, marginTop: 14 }}>Edge cases</h4>
                <ul>{proof.edgeCases.map(e => <li key={e}>{e}</li>)}</ul>
              </div>
              <div className="card panel">
                <div className="panel-title"><h3>Applications & references</h3><BookOpen size={14} /></div>
                <h4 style={{ fontSize: 12 }}>Applications</h4>
                <ul>{proof.applications.map(a => <li key={a}>{a}</li>)}</ul>
                <h4 style={{ fontSize: 12, marginTop: 14 }}>Further reading</h4>
                <ul>{proof.references.map(r => <li key={r}>{r}</li>)}</ul>
                {proof.formalNote && <div className="callout note" style={{ marginTop: 12 }}><div className="co-title">Formal verification</div><p>{proof.formalNote}</p></div>}
              </div>
            </div>
          </div>}
        </div>
      </>}

      {/* ── TECHNIQUES ────────────────────────────────────────────────────── */}
      {tab === 'techniques' && <>
        <div className="section-head"><div><h2>Proof techniques</h2></div><span className="subtle">{PROOF_TECHNIQUES.length} methods</span></div>
        <div className="grid g4">
          {PROOF_TECHNIQUES.map(t => <button className={`card card-hover ${techniqueId === t.id ? 'path-active' : ''}`} key={t.id} onClick={() => { setTechniqueId(t.id); setDraft(''); setChecked(CHECKLIST.map(() => false)) }} style={{ textAlign: 'left', padding: 15 }}>
            <div className="sim-tag">{t.id}</div>
            <h3 style={{ fontSize: 13, margin: '9px 0 5px' }}>{t.title}</h3>
            <p className="subtle" style={{ margin: 0, lineHeight: 1.55 }}>{t.summary}</p>
          </button>)}
        </div>
        <div className="card panel" style={{ marginTop: 18 }}>
          <div className="panel-title"><h3>{technique.title} — template and example</h3><Sparkles size={15} color="#8b7cff" /></div>
          <div className="feature-row">
            <div>
              <h4 style={{ fontSize: 12, marginBottom: 8 }}>When to use it</h4>
              <p className="subtle">{technique.when}</p>
              <h4 style={{ fontSize: 12, margin: '14px 0 8px' }}>Template</h4>
              <ol>{technique.template.map(t => <li key={t}>{t}</li>)}</ol>
            </div>
            <div>
              <h4 style={{ fontSize: 12, marginBottom: 8 }}>Worked example</h4>
              <div className="callout intuition"><div className="co-title">Example</div><p>{technique.example}</p></div>
              <h4 style={{ fontSize: 12, margin: '14px 0 8px' }}>Common pitfalls</h4>
              <div className="callout warning"><div className="co-title">Watch for</div><ul style={{ margin: 0 }}>{technique.pitfalls.map(x => <li key={x}>{x}</li>)}</ul></div>
            </div>
          </div>
        </div>
      </>}

      {/* ── EXERCISES ─────────────────────────────────────────────────────── */}
      {tab === 'exercises' && <>
        <div className="section-head"><div><h2>Proof exercises</h2></div><span className="subtle">{PROOF_EXERCISES.length} scaffolded problems</span></div>
        <div className="proof-layout">
          <div>
            <div className="card panel">
              <div className="panel-title"><h3>Choose an exercise</h3></div>
              <select value={exerciseId} onChange={e => { setExerciseId(e.target.value); setShowHints(false); setShowSolution(false) }} style={{ width: '100%', background: 'var(--panel)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 8, padding: 10 }}>
                {PROOF_EXERCISES.map(e => <option value={e.id} key={e.id}>{e.title} · {e.level}</option>)}
              </select>
              <h3 style={{ margin: '14px 0' }}>{exercise.statement}</h3>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button className="btn btn-sm" onClick={() => setShowHints(h => !h)}><Lightbulb size={12} /> {showHints ? 'Hide hints' : 'Request hints'}</button>
                <button className={`btn ${p.proofs.includes(exercise.id) ? '' : 'btn-primary'} btn-sm`} onClick={() => progress.toggle('proofs', exercise.id)}><Check size={12} /> {p.proofs.includes(exercise.id) ? 'Completed' : 'Mark complete'}</button>
              </div>
              {showHints && <div className="callout intuition" style={{ marginTop: 12 }}><div className="co-title">Progressive hints</div><ol style={{ margin: 0 }}>{exercise.hints.map(h => <li key={h}>{h}</li>)}</ol></div>}
            </div>
            <div className="card panel" style={{ marginTop: 14 }}>
              <div className="panel-title"><h3>Model proof</h3></div>
              <button className="btn btn-sm" onClick={() => setShowSolution(s => !s)}>{showSolution ? 'Hide' : 'Reveal model proof'}</button>
              {showSolution && <div className="solution-box">
                {exercise.solution.map((s, i) => <div className="step" key={i}><div className="step-n">{i+1}</div><div><h4>{s.title}</h4><p>{s.text}</p>{s.math && <div className="math-block"><Math tex={s.math} display /></div>}</div></div>)}
                {exercise.formalNote && <div className="callout note" style={{ marginTop: 10 }}><div className="co-title">Formal note</div><p>{exercise.formalNote}</p></div>}
              </div>}
            </div>
          </div>
          <aside className="toc"><div className="card toc-box">
            <h4>Rigour checklist</h4>
            {CHECKLIST.map((c, i) => <label className="check-item" key={c} style={{ cursor: 'pointer' }}>
              <input type="checkbox" checked={checked[i]} onChange={() => setChecked(v => v.map((x, j) => j === i ? !x : x))} style={{ accentColor: '#4fd1a5' }} />
              <span>{c}</span>
            </label>)}
          </div></aside>
        </div>
      </>}

      {/* ── WORKSPACE ─────────────────────────────────────────────────────── */}
      {tab === 'workspace' && <>
        <div className="section-head"><div><h2>Your proof workspace</h2></div><span className="subtle">Write first, reveal later</span></div>
        <div className="proof-layout">
          <div className="card panel">
            <div className="panel-title"><h3>Proof of: {exercise.title}</h3></div>
            <p className="subtle">{exercise.statement}</p>
            <textarea className="proof-textarea" value={draft} onChange={e => setDraft(e.target.value)} placeholder="Claim: …&#10;Assume …&#10;By definition …&#10;Therefore …" />
            <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={() => setDraft(exercise.scaffold.join('\n'))}>Load step scaffold</button>
              <button className="btn btn-sm" onClick={() => setShowSolution(s => !s)}><FileCheck2 size={12} /> {showSolution ? 'Hide model' : 'Compare with model'}</button>
            </div>
            {showSolution && <div className="solution-box">
              {exercise.solution.map((s, i) => <div className="step" key={i}><div className="step-n">{i+1}</div><div><h4>{s.title}</h4><p>{s.text}</p>{s.math && <div className="math-block"><Math tex={s.math} display /></div>}</div></div>)}
            </div>}
          </div>
          <aside className="toc">
            <div className="card toc-box">
              <h4>Rigour checklist</h4>
              {CHECKLIST.map((c, i) => <label className="check-item" key={c}>
                <input type="checkbox" checked={checked[i]} onChange={() => setChecked(v => v.map((x, j) => j === i ? !x : x))} style={{ accentColor: '#4fd1a5' }} />
                <span>{c}</span>
              </label>)}
              <div className="subtle" style={{ marginTop: 10 }}>{checked.filter(Boolean).length}/{CHECKLIST.length} passed. A checklist is a self-audit, not verification.</div>
            </div>
            <div className="card toc-box" style={{ marginTop: 14 }}>
              <h4>Go deeper</h4>
              <button className="toc-link" onClick={() => setTab('sources')}>Formal proof libraries</button>
              <button className="toc-link" onClick={() => go('/tutor')}>Ask the tutor</button>
            </div>
          </aside>
        </div>
      </>}

      {/* ── SOURCES ───────────────────────────────────────────────────────── */}
      {tab === 'sources' && <>
        <div className="feature-row" style={{ marginTop: 16 }}>
          <div className="card panel">
            <div className="panel-title"><h3><BookOpen size={15} /> External proof libraries</h3></div>
            <p className="subtle">MATHVERSE connects to the world's leading proof assistants and proof databases. No single site contains every proof; these are the places where the frontier of formalisation lives.</p>
            {PROOF_SOURCES.map(s => <div className="mini-item" key={s.id}>
              <a href={s.url} target="_blank" rel="noreferrer" style={{ display: 'flex', gap: 8, alignItems: 'center', color: '#6ea8ff' }}>
                <ExternalLink size={13} /> <strong style={{ fontSize: 12 }}>{s.name}</strong>
              </a>
              <div className="mi-sub" style={{ marginLeft: 20 }}>{s.type} · {s.description}</div>
              <div className="mi-sub" style={{ marginLeft: 20, color: '#4fd1a5' }}>Best for: {s.bestFor}</div>
              <div className="mi-sub" style={{ marginLeft: 20 }}>Caveat: {s.caveat}</div>
            </div>)}
          </div>
          <div className="card panel">
            <div className="panel-title"><h3><AlertTriangle size={15} /> The culture of proof</h3></div>
            {PROOF_CULTURE.map(c => <div key={c.id} style={{ marginBottom: 16 }}>
              <h4 style={{ fontSize: 13 }}>{c.title}</h4>
              <p style={{ color: 'var(--text-2)', lineHeight: 1.8, fontSize: 13, margin: '6px 0 0' }}>{c.text}</p>
            </div>)}
          </div>
        </div>
      </>}
    </div>
  )
}
