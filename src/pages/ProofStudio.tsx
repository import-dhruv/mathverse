import { useState } from 'react'
import { ChevronRight, Check, Lightbulb, FileCheck2, Sparkles, ArrowRight } from 'lucide-react'
import { PROOF_TECHNIQUES, PROOF_EXERCISES } from '../data'
import { go } from '../lib/router'
import { progress, useProgress } from '../lib/store'
import { Blocks } from '../components/Blocks'
import { Math } from '../components/Math'

const CHECKLIST = [
  'Every assumption is stated and used',
  'Quantifiers and negations are handled correctly',
  'No step assumes the conclusion',
  'Each implication is justified by a definition or theorem',
  'Edge cases (zero, empty set, v = 0) are handled',
  'The final line matches the exact statement',
]

export function ProofStudioPage() {
  const [techniqueId, setTechniqueId] = useState<string>(PROOF_TECHNIQUES[0].id)
  const [exerciseId, setExerciseId] = useState<string>(PROOF_EXERCISES[0].id)
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [draft, setDraft] = useState('')
  const [checked, setChecked] = useState<boolean[]>(CHECKLIST.map(() => false))
  const p = useProgress()
  const technique = PROOF_TECHNIQUES.find(t => t.id === techniqueId)!
  const exercise = PROOF_EXERCISES.find(e => e.id === exerciseId) ?? PROOF_EXERCISES[0]

  return (
    <div>
      <div className="eyebrow">Proof Studio</div>
      <h1 style={{ fontSize: 'clamp(2rem,3.4vw,2.7rem)', margin: '10px 0' }}>Learn to construct proofs, not just read them</h1>
      <p className="lead">Choose a technique, build an argument step by step, run the rigour checklist, then compare with a model proof. A formal proof is different from an intuition or a proof sketch — the studio keeps that distinction explicit.</p>

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

      <div className="section-head"><div><h2>Proof workspace</h2></div><span className="subtle">Write first, reveal later</span></div>
      <div className="proof-layout">
        <div>
          <div className="card panel">
            <div className="panel-title"><h3>Choose an exercise</h3><span className="chip">{PROOF_EXERCISES.length} available</span></div>
            <select value={exerciseId} onChange={e => { setExerciseId(e.target.value); setShowHints(false); setShowSolution(false); setDraft('') }} style={{ width: '100%', background: 'var(--panel)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 8, padding: 10 }}>
              {PROOF_EXERCISES.map(e => <option value={e.id} key={e.id}>{e.title} · {e.level}</option>)}
            </select>
            <div style={{ marginTop: 16 }}>
              <span className="chip">{PROOF_TECHNIQUES.find(t => t.id === exercise.techniqueId)?.title}</span>
              <h3 style={{ margin: '10px 0' }}>{exercise.statement}</h3>
              <p className="subtle">Related topic: <button className="btn btn-sm" onClick={() => go(`/topic/${exercise.topicId}`)}>{exercise.topicId.replace(/-/g, ' ')} <ArrowRight size={11} /></button></p>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={() => setShowHints(h => !h)}><Lightbulb size={12} /> {showHints ? 'Hide hints' : 'Request hints'}</button>
              <button className="btn btn-sm" onClick={() => go('/tutor')}>Ask the tutor</button>
              <button className={`btn ${p.proofs.includes(exercise.id) ? '' : 'btn-primary'} btn-sm`} onClick={() => progress.toggle('proofs', exercise.id)}>
                <Check size={12} /> {p.proofs.includes(exercise.id) ? 'Proof completed' : 'Mark proof complete'}
              </button>
            </div>
            {showHints && <div className="callout intuition" style={{ marginTop: 12 }}><div className="co-title">Progressive hints</div><ol style={{ margin: 0 }}>{exercise.hints.map(h => <li key={h}>{h}</li>)}</ol></div>}
          </div>

          <div className="card panel" style={{ marginTop: 14 }}>
            <div className="panel-title"><h3>Your proof</h3><span className="subtle">Plain text or LaTeX with $…$</span></div>
            <textarea className="proof-textarea" value={draft} onChange={e => setDraft(e.target.value)} placeholder="Assume…&#10;By definition…&#10;Therefore…" />
            <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={() => setDraft(exercise.scaffold.join('\n'))}>Load step scaffold</button>
              <button className="btn btn-sm" onClick={() => setShowSolution(s => !s)}><FileCheck2 size={12} /> {showSolution ? 'Hide model proof' : 'Compare with model proof'}</button>
            </div>
            {exercise.scaffold.length > 0 && draft.length === 0 && <div style={{ marginTop: 12 }}>
              <p className="subtle">Scaffold available — load it to see the logical skeleton.</p>
            </div>}
            {showSolution && <div className="solution-box"><h4 style={{ fontSize: 13, marginBottom: 8 }}>Model proof (a complete proof, not just intuition)</h4>
              {exercise.solution.map((s, i) => <div className="step" key={i}><div className="step-n">{i+1}</div><div><h4>{s.title}</h4><p>{s.text}</p>{s.math && <div className="math-block"><Math tex={s.math} display /></div>}</div></div>)}
              {exercise.formalNote && <div className="callout note" style={{ marginTop: 12 }}><div className="co-title">Formal verification note</div><p>{exercise.formalNote}</p></div>}
            </div>}
          </div>
        </div>

        <aside className="toc">
          <div className="card toc-box">
            <h4>Rigour checklist</h4>
            {CHECKLIST.map((c, i) => <label className="check-item" key={c} style={{ cursor: 'pointer' }}>
              <input type="checkbox" checked={checked[i]} onChange={() => setChecked(v => v.map((x, j) => j === i ? !x : x))} style={{ accentColor: '#4fd1a5' }} />
              <span>{c}</span>
            </label>)}
            <div className="subtle" style={{ marginTop: 10 }}>{checked.filter(Boolean).length}/{CHECKLIST.length} checks passed. Checklist passed ≠ proof correct — it is a self-audit, not verification.</div>
          </div>
          <div className="card toc-box" style={{ marginTop: 14 }}>
            <h4>Formal proof assistants</h4>
            <p className="subtle">Lean’s kernel checks every inference. Start with a small theorem, let the assistant show you the remaining goals, and compare the formal proof with your prose proof.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
