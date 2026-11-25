import { useMemo, useState } from 'react'
import { Sparkles, Send, AlertTriangle, ArrowRight, Lightbulb, Target, BookOpen } from 'lucide-react'
import { ALL_TOPICS, TOPIC_KEY_EQUATIONS, PROBLEMS, FRONTIERS, SIMULATIONS } from '../data'
import { go } from '../lib/router'
import { Math } from '../components/Math'

type Mode = 'Explain from first principles' | 'Give me a hint' | 'Challenge me' | 'Review my proof'

function findTopic(q: string) {
  const needle = q.toLowerCase().trim()
  const words = needle.split(/\s+/).filter(w => w.length > 2)
  const scored = ALL_TOPICS.map(t => {
    const title = t.title.toLowerCase(), text = (t.summary + ' ' + t.tags.join(' ')).toLowerCase()
    let s = 0
    if (title.includes(needle)) s += 10
    words.forEach(w => { if (title.includes(w)) s += 3; if (text.includes(w)) s += 1 })
    return { t, s }
  }).sort((a, b) => b.s - a.s)
  return scored[0]?.s > 0 ? scored[0].t : null
}

export function TutorPage() {
  const [q, setQ] = useState('')
  const [mode, setMode] = useState<Mode>('Explain from first principles')
  const [submitted, setSubmitted] = useState('')
  const [proof, setProof] = useState('')
  const topic = useMemo(() => submitted ? findTopic(submitted) : null, [submitted])
  const equations = topic ? TOPIC_KEY_EQUATIONS[topic.id] ?? [] : []
  const problems = topic ? PROBLEMS.filter(p => p.topicId === topic.id).slice(0, 3) : []
  const sims = topic ? SIMULATIONS.filter(s => s.branchId === topic.branchId).slice(0, 3) : []
  const frontier = submitted ? FRONTIERS.find(f => submitted.toLowerCase().includes(f.title.toLowerCase().slice(0, 12))) : null

  const ask = () => { if (q.trim()) setSubmitted(q); setQ('') }

  return (
    <div>
      <div className="eyebrow">AI Mathematics Tutor</div>
      <h1 style={{ fontSize: 'clamp(2rem,3.4vw,2.7rem)', margin: '10px 0' }}>A rigorous conversation partner</h1>
      <div className="callout warning">
        <div className="co-title">Honest capability note</div>
        <p>This tutor is currently a <strong>knowledge-base tutor</strong>, not a connected language model. It retrieves verified concepts, equations, problems and visualizations from MATHVERSE and structures them as a Socratic explanation. It will not invent theorems, proofs or references. Answers are labelled: <strong>definition</strong>, <strong>derivation prompt</strong>, <strong>intuition</strong>, <strong>open question</strong>.</p>
      </div>

      <div className="card panel" style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(['Explain from first principles', 'Give me a hint', 'Challenge me', 'Review my proof'] as Mode[]).map(m => (
            <button key={m} className={`chip ${mode === m ? 'chip-active' : ''}`} onClick={() => setMode(m)}>{m}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <input value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') ask() }}
            placeholder="Ask about a concept, e.g. 'why is the derivative a limit?'" style={{ flex: 1, background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 8, padding: 10, color: 'var(--text)' }} />
          <button className="btn btn-primary" onClick={ask}><Send size={14} /> Ask</button>
        </div>
        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['derivatives', 'Bayes theorem', 'eigenvalues', 'compactness', 'Riemann hypothesis'].map(s => <button className="chip" key={s} onClick={() => { setQ(s); setSubmitted(s) }}>{s}</button>)}
        </div>
      </div>

      {mode === 'Review my proof' && <div className="card panel" style={{ marginTop: 14 }}>
        <div className="panel-title"><h3>Proof review checklist</h3><AlertTriangle size={15} color="#ffb454" /></div>
        <p className="subtle">Paste a proof. This local checker gives a structural audit, not mathematical verification; use the Proof Studio for guided construction and a formal assistant for machine-checked certainty.</p>
        <textarea className="proof-textarea" value={proof} onChange={e => setProof(e.target.value)} placeholder="State your claim, assumptions and proof steps…" />
        {proof.length > 40 && <div className="callout note" style={{ marginTop: 10 }}><div className="co-title">Structural audit</div><p>
          {!claim(proof) ? 'I cannot identify an explicit claim — begin with “Claim: …”.' : 'A claim is stated.'}{' '}
          {!hasBecause(proof) ? 'Add justifications (“because”, “by definition”, “by theorem”) after each step.' : 'Justification language is present.'}{' '}
          Length: {proof.split(/\s+/).length} words. Check every quantifier and edge case yourself.
        </p></div>}
        <button className="btn btn-sm" style={{ marginTop: 10 }} onClick={() => go('/proof')}>Open Proof Studio <ArrowRight size={12} /></button>
      </div>}

      {submitted && mode !== 'Review my proof' && <div style={{ marginTop: 16 }}>
        <div className="card" style={{ padding: 22, borderLeft: '3px solid #8b7cff' }}>
          <div className="eyebrow">Tutor response · {mode}</div>
          <h2 style={{ fontSize: '1.5rem', margin: '8px 0' }}>“{submitted}”</h2>
          {topic ? <>
            <div className="chip">Matched topic: {topic.title}</div>
            <p style={{ color: 'var(--text-2)', marginTop: 12 }}><strong>Definition / summary.</strong> {topic.summary}</p>
            {mode === 'Explain from first principles' && <>
              <div className="callout intuition"><div className="co-title">Intuition</div><p>{topic.tags.join(' · ')}. Ask: what problem did this concept solve that earlier tools could not? {topic.blocks.find(b => b.kind === 'callout' && (b.tone === 'intuition' || b.tone === 'visual')) && ((topic.blocks.find(b => b.kind === 'callout') as any).text)}</p></div>
              <div className="callout note"><div className="co-title">Derivation prompt</div><p>Reconstruct the key formula from the definitions rather than reading it. Start with the prerequisites: {topic.prerequisites.map(p => p.replace(/-/g, ' ')).join(', ') || 'the basic definitions'}.</p></div>
            </>}
            {mode === 'Give me a hint' && <div className="callout intuition"><div className="co-title">Progressive hints</div><ol>
              <li>Write down the exact definition relevant to your question.</li>
              <li>Identify which hypothesis you have not used yet.</li>
              <li>Try the simplest nontrivial example and see where the general case differs.</li>
            </ol></div>}
            {mode === 'Challenge me' && <div className="callout warning"><div className="co-title">Conceptual challenge</div><p>Explain why the following statement needs its hypotheses: “{topic.title} works without any assumptions.” Construct a counterexample, then state the precise theorem.</p></div>}
            {equations.length > 0 && <><h3 style={{ fontSize: 13, marginTop: 16 }}>Verified mathematical structure</h3>
              {equations.map((e, i) => <div className="math-block" key={i}><Math tex={e} display /></div>)}</>}
            <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-sm" onClick={() => go(`/topic/${topic.id}`)}>Read the full lesson <ArrowRight size={12} /></button>
              {sims.map(s => <button className="btn btn-sm" key={s.id} onClick={() => go(`/simulation/${s.id}`)}><Sparkles size={12} /> {s.title}</button>)}
            </div>
            {problems.length > 0 && <div className="card panel" style={{ marginTop: 14 }}>
              <div className="panel-title"><h3><Target size={14} /> Practice this concept</h3></div>
              {problems.map(pb => <div className="mini-item" key={pb.id} onClick={() => go(`/problem/${pb.id}`)} style={{ cursor: 'pointer' }}><span className="mi-num">→</span><div><div className="mi-title">{pb.title}</div><div className="mi-sub">{pb.type} · {pb.level}</div></div></div>)}
            </div>}
          </> : frontier ? <>
            <span className="chip">Research frontier · {frontier.status}</span>
            <p style={{ marginTop: 12, color: 'var(--text-2)' }}>{frontier.summary}</p>
            <div className="math-block"><Math tex={frontier.statement} display /></div>
            <div className="callout warning"><div className="co-title">Open question — not a theorem</div><p>{frontier.questions[0]}</p></div>
            <button className="btn btn-sm" onClick={() => go(`/research/${frontier.id}`)}>Open frontier page <ArrowRight size={12} /></button>
          </> : <>
            <p style={{ color: 'var(--text-2)' }}>I could not match that to a verified topic. Try a concept name such as “eigenvalues”, “Bayes theorem” or “compactness”. I will not guess an answer.</p>
            <button className="btn btn-sm" onClick={() => go('/explore')}><BookOpen size={12} /> Browse the knowledge map</button>
          </>}
        </div>
      </div>}
    </div>
  )
}

function claim(s: string) { return /claim|prove|show that|theorem/i.test(s) }
function hasBecause(s: string) { return /because|since|by definition|by theorem|therefore|hence/i.test(s) }
