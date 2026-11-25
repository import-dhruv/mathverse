import { useMemo, useState } from 'react'
import { ChartNoAxesCombined, Check, RotateCcw, BookOpen, Target, Flame, Clock } from 'lucide-react'
import { ALL_TOPICS, BRANCHES, QUICK_CHECKS, LEARNING_PATHS, PROBLEMS, PROOF_EXERCISES } from '../data'
import { go } from '../lib/router'
import { progress, useProgress } from '../lib/store'

export function ProgressPage() {
  const p = useProgress()
  const [cardIndex, setCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const cards = useMemo(() => {
    const studied = ALL_TOPICS.filter(t => p.studying.includes(t.id) || p.completed.includes(t.id) || p.bookmarks.includes(t.id))
    const pool = studied.length ? studied : ALL_TOPICS.filter(t => t.status !== 'Outline').slice(0, 40)
    return pool.slice(0, 60).map(t => ({ id: t.id, title: t.title, prompt: QUICK_CHECKS[t.id]?.prompt ?? `Explain ${t.title}.`, answer: QUICK_CHECKS[t.id]?.answer ?? t.summary }))
  }, [p.studying, p.completed, p.bookmarks])
  const due = cards.filter(c => !p.flashcards[c.id] || p.flashcards[c.id].due <= Date.now())
  const card = due[cardIndex % Math.max(1, due.length)]
  const accuracy = Object.values(p.quiz).reduce((a, q) => a + q.correct, 0) / Math.max(1, Object.values(p.quiz).reduce((a, q) => a + q.attempts, 0))
  const masteryPct = Math.round(p.completed.length / ALL_TOPICS.length * 100)

  const branchStats = BRANCHES.map(b => {
    const topics = ALL_TOPICS.filter(t => t.branchId === b.id)
    return { ...b, total: topics.length, done: topics.filter(t => p.completed.includes(t.id)).length }
  }).sort((a, b) => b.done - a.done)

  return (
    <div>
      <div className="eyebrow">My progress</div>
      <h1 style={{ fontSize: 'clamp(2rem,3.4vw,2.7rem)', margin: '10px 0' }}>Mastery, measured honestly</h1>
      <p className="lead">A topic counts as mastered only when you have marked it complete after working through its derivation, proof and problems. Time spent is context, not a credential.</p>

      <div className="stat-strip" style={{ marginTop: 22 }}>
        <div className="card metric"><div className="eyebrow">Topics mastered</div><div className="m-val">{p.completed.length}<span className="subtle" style={{ fontSize: 14 }}> / {ALL_TOPICS.length}</span></div><div className="m-label">{masteryPct}% of the map</div></div>
        <div className="card metric"><div className="eyebrow">Conceptual accuracy</div><div className="m-val">{Math.round(accuracy * 100)}%</div><div className="m-label">{Object.values(p.quiz).reduce((a, q) => a + q.attempts, 0)} quick checks</div></div>
        <div className="card metric"><div className="eyebrow">Problems solved</div><div className="m-val">{p.solved.length}</div><div className="m-label">of {PROBLEMS.length} authored</div></div>
        <div className="card metric"><div className="eyebrow">Proofs completed</div><div className="m-val">{p.proofs.length}</div><div className="m-label">of {PROOF_EXERCISES.length} exercises</div></div>
      </div>

      <div className="feature-row" style={{ marginTop: 16 }}>
        <div className="card panel">
          <div className="panel-title"><h3><ChartNoAxesCombined size={14} style={{ verticalAlign: -2 }} /> Mastery by branch</h3><button className="btn btn-sm" onClick={() => go('/explore')}>Explore</button></div>
          {branchStats.slice(0, 12).map(b => <div className="bar-row" key={b.id}>
            <button onClick={() => go(`/branch/${b.id}`)} style={{ border: 0, background: 'none', color: 'var(--text-2)', textAlign: 'left', padding: 0 }}>{b.short}</button>
            <div className="bar-track"><div className="bar-fill" style={{ width: `${b.total ? b.done / b.total * 100 : 0}%` }} /></div>
            <span className="mono subtle">{b.done}/{b.total}</span>
          </div>)}
        </div>
        <div className="card panel">
          <div className="panel-title"><h3><RotateCcw size={14} style={{ verticalAlign: -2 }} /> Spaced repetition</h3><span className="chip">{due.length} due</span></div>
          {card ? <>
            <div className="eyebrow">Prompt</div>
            <p style={{ color: 'var(--text)', margin: '8px 0' }}>{card.prompt}</p>
            <button className="btn btn-sm" onClick={() => setShowAnswer(s => !s)}>{showAnswer ? 'Hide answer' : 'Reveal answer'}</button>
            {showAnswer && <div className="callout intuition" style={{ marginTop: 10 }}><div className="co-title">Model answer</div><p>{card.answer}</p></div>}
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button className="btn btn-sm" onClick={() => { progress.reviewCard(card.id, false); setShowAnswer(false); setCardIndex(i => i + 1) }}><RotateCcw size={12} /> Again</button>
              <button className="btn btn-primary btn-sm" onClick={() => { progress.reviewCard(card.id, true); setShowAnswer(false); setCardIndex(i => i + 1) }}><Check size={12} /> Remembered</button>
              <button className="btn btn-sm" onClick={() => go(`/topic/${card.id}`)}><BookOpen size={12} /> Review lesson</button>
            </div>
            <p className="subtle" style={{ marginTop: 10 }}>Intervals grow 1 → 2 → 4 → 7 → 15 → 30 → 60 days. A miss resets the card.</p>
          </> : <div className="empty-state">No cards due. Study a topic to build your revision deck.</div>}
        </div>
      </div>

      <div className="feature-row" style={{ marginTop: 16 }}>
        <div className="card panel">
          <div className="panel-title"><h3><Flame size={14} style={{ verticalAlign: -2 }} /> Learning habits</h3></div>
          <div className="grid g2">
            <div><div className="eyebrow">Streak</div><div className="m-val">{p.streak} days</div></div>
            <div><div className="eyebrow">Time tracked</div><div className="m-val">{Math.floor(p.seconds / 3600)}h {Math.floor(p.seconds % 3600 / 60)}m</div></div>
          </div>
          <p className="subtle" style={{ marginTop: 10 }}><Clock size={11} style={{ verticalAlign: -1 }} /> Tracked locally in this browser only. No account or server is required.</p>
          <button className="btn btn-sm" style={{ marginTop: 10 }} onClick={() => { if (confirm('Reset all local progress?')) progress.reset() }}>Reset local progress</button>
        </div>
        <div className="card panel">
          <div className="panel-title"><h3><Target size={14} style={{ verticalAlign: -2 }} /> Prerequisite gaps & revision</h3></div>
          {p.studying.length > 0 ? <>
            <p className="subtle">Currently studying:</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {p.studying.map(id => <button className="chip" key={id} onClick={() => go(`/topic/${id}`)}>{id.replace(/-/g, ' ')}</button>)}
            </div>
          </> : <p className="subtle">No active topics. Choose a learning path to begin.</p>}
          <div className="panel-title" style={{ marginTop: 18 }}><h3>Saved for revision</h3></div>
          {p.bookmarks.length ? <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {p.bookmarks.map(id => <button className="chip" key={id} onClick={() => go(`/topic/${id}`)}>{id.replace(/-/g, ' ')}</button>)}
          </div> : <p className="subtle">Nothing saved yet.</p>}
          <div className="panel-title" style={{ marginTop: 18 }}><h3>Your path</h3></div>
          {p.path ? <button className="btn btn-sm" onClick={() => go('/paths')}>{LEARNING_PATHS.find(l => l.id === p.path)?.title ?? p.path}</button> : <button className="btn btn-sm" onClick={() => go('/paths')}>Choose a path</button>}
        </div>
      </div>
    </div>
  )
}
