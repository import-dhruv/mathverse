import { useState } from 'react'
import {
  Route as RouteIcon, ArrowRight, Check, Clock, Compass, Sparkles,
  BookOpen, Target, Network, Sigma, Layers, ChevronDown,
} from 'lucide-react'
import { LEARNING_PATHS, TOPIC_BY_ID, STATS, BRANCHES } from '../data'
import { go } from '../lib/router'
import { progress, useProgress } from '../lib/store'
import { Math } from '../components/Math'
import { InlineText } from '../components/Blocks'

// A cross-path essay: the ladder by which mathematics builds itself.
const LADDER = [
  { name: 'Operation', text: 'Count. Repeat a move.' },
  { name: 'Inverse', text: 'Undo it — new numbers appear.' },
  { name: 'Structure', text: 'Forget the objects, keep the rules.' },
  { name: 'Dependence', text: 'Let one quantity determine another.' },
  { name: 'Limit', text: 'Zoom in without end; accumulate without end.' },
  { name: 'Abstraction', text: 'Prove once for every structure.' },
  { name: 'Computation', text: 'Make the proof mechanical.' },
  { name: 'Research', text: 'Ask what no one knows yet.' },
]

const UNIVERSE = [
  {
    title: `Mathematics is the study of what remains true when everything else changes.`,
    text: `Ask a child what a number is and you get an answer about counting. Ask a mathematician and you get an answer about structure. The subject grows by a repeated, very simple move: take an operation, ask what undoes it, and enlarge your world until the inverse exists. Subtraction forces negative numbers; division forces fractions; √2 forces irrationals; x² + 1 = 0 forces complex numbers. Nothing is arbitrary. Each extension is the smallest one in which a previously impossible question becomes possible.`,
  },
  {
    title: `Then we learn to forget on purpose.`,
    text: `A vector space forgets what its vectors are and keeps addition and scaling. A metric space forgets everything except distance. A topological space forgets even distance and keeps open sets. A group forgets the elements and keeps one operation. Every act of forgetting throws away information and gains generality: a theorem proved about a structure is true of every model of it. This is why the same eigenvalue argument applies to a rotating rigid body, a quantum observable and a recommendation system.`,
  },
  {
    title: `Limits are the bridge between the finite and the infinite.`,
    text: `A derivative is what a curve looks like when you magnify it indefinitely. An integral is what infinitely many tiny pieces add up to. They appear to be different problems — slope and area — until the fundamental theorem reveals that they are inverse descriptions of local linearity. Almost every later subject is an echo of this: probability is a limit of frequencies, a manifold is locally Euclidean, a numerical method is a limit of discrete steps, and a generation gap in learning theory is bounded by a concentration inequality.`,
  },
  {
    title: `Proof is the unit of knowledge.`,
    text: `Visualisation suggests, computation tests, analogy guides — but proof is what makes a statement invariant across every admissible interpretation. The Proof Studio in this platform exists because the ability to construct an argument is not a side skill of mathematics; it is the thing itself. A proof states its hypotheses, uses every one of them, and survives an honest search for a counterexample.`,
  },
]

const PATH_RELATIONS: Record<string, { text: string; paths: string[] }> = {
  'path-zero': { text: `Calculus is the fork: analysis follows the limit, physics follows the law, AI follows the gradient.`, paths: ['path-university', 'path-physics', 'path-ai'] },
  'path-university': { text: `The core splits into proof (pure), modelling (applied) and computation (algorithms plus analysis).`, paths: ['path-pure', 'path-applied', 'path-computational'] },
  'path-pure': { text: `Abstraction pays off in geometry, mathematical physics and the foundations of computation.`, paths: ['path-physics', 'path-ai', 'path-computational'] },
  'path-applied': { text: `Models become algorithms, algorithms become learning systems, and both need analysis of uncertainty.`, paths: ['path-computational', 'path-ai', 'path-university'] },
  'path-ai': { text: `Learning theory is applied optimisation plus probability; attention is geometry in high-dimensional spaces.`, paths: ['path-applied', 'path-pure', 'path-computational'] },
  'path-physics': { text: `The same tensor and operator language reappears in geometry, functional analysis and numerical simulation.`, paths: ['path-pure', 'path-applied', 'path-university'] },
  'path-computational': { text: `Every discrete algorithm approximates a continuous idea; every numerical claim needs a proof.`, paths: ['path-applied', 'path-pure', 'path-university'] },
  'path-olympiad': { text: `Elementary sharpness grows into inequalities, number theory and the proof culture of the pure path.`, paths: ['path-pure', 'path-university', 'path-ai'] },
}

export function PathsPage() {
  const [active, setActive] = useState<string | null>(LEARNING_PATHS[0].id)
  const [openStep, setOpenStep] = useState<number | null>(0)
  const p = useProgress()
  const path = LEARNING_PATHS.find(l => l.id === active) ?? LEARNING_PATHS[0]
  const done = path.topicIds.filter(t => p.completed.includes(t)).length
  const s = path.study
  const parts = [...new Set(BRANCHES.map(b => b.part))]

  return (
    <div>
      <div className="eyebrow">Learning paths · a first-principles atlas</div>
      <h1 style={{ fontSize: 'clamp(2rem,3.4vw,2.7rem)', margin: '10px 0' }}>Structured routes through the universe</h1>
      <p className="lead">A path is not a playlist. It is a dependency chain in which each idea exists because the previous one raised a question it could not answer. Read the atlas first, then choose the route that matches the kind of question you want to be able to answer.</p>

      {/* ── The universe in one view ─────────────────────────────────────── */}
      <div className="section-head"><div><div className="eyebrow">Before you choose</div><h2>The universe in one view</h2></div><Compass size={18} color="#6ea8ff" /></div>
      <div className="card" style={{ padding: 26, borderLeft: '3px solid #6ea8ff' }}>
        <div className="grid g2">
          {UNIVERSE.map((u, i) => <div key={u.title}>
            <h3 style={{ fontSize: 14, marginBottom: 8 }}><span className="mi-num">0{i + 1}</span> {u.title}</h3>
            <p style={{ color: 'var(--text-2)', lineHeight: 1.85, fontSize: 13 }}>{u.text}</p>
          </div>)}
        </div>
        <div style={{ marginTop: 18 }}>
          <div className="eyebrow">The ladder of abstraction</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12, alignItems: 'stretch' }}>
            {LADDER.map((rung, i) => <div key={rung.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div className="card" style={{ padding: '9px 11px', maxWidth: 132 }}>
                <div className="mono" style={{ fontSize: 9, color: '#6f7d93' }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ fontSize: 11.5, fontWeight: 600 }}>{rung.name}</div>
                <div className="subtle" style={{ fontSize: 9.5, lineHeight: 1.4 }}>{rung.text}</div>
              </div>
              {i < LADDER.length - 1 && <ArrowRight size={12} color="#6f7d93" />}
            </div>)}
          </div>
        </div>
        <div style={{ marginTop: 18 }}>
          <div className="eyebrow">The six territories</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
            {parts.map(part => <span className="chip" key={part}>{part}</span>)}
          </div>
        </div>
      </div>

      {/* ── Path selection ───────────────────────────────────────────────── */}
      <div className="section-head"><div><div className="eyebrow">Choose a route</div><h2>Eight ways into the same universe</h2></div><span className="subtle">{STATS.paths} curated paths</span></div>
      <div className="grid g4">
        {LEARNING_PATHS.map(l => <button className={`card card-hover ${active === l.id ? 'path-active' : ''}`} key={l.id} onClick={() => { setActive(l.id); setOpenStep(0) }} style={{ textAlign: 'left', padding: 16 }}>
          <div className="sim-tag"><RouteIcon size={11} style={{ verticalAlign: -1 }} /> {l.level}</div>
          <h3 style={{ fontSize: 13, margin: '9px 0 5px' }}>{l.title}</h3>
          <p className="subtle" style={{ margin: 0, lineHeight: 1.55, fontStyle: 'italic' }}>{l.tagline}</p>
          <p className="subtle" style={{ margin: '8px 0 0', lineHeight: 1.5, fontSize: 10.5 }}>{l.study.firstPrinciple.slice(0, 105)}…</p>
          <div className="subtle" style={{ marginTop: 10 }}>{l.topicIds.length} topics · ~{l.hours}h</div>
        </button>)}
      </div>

      {/* ── Selected path: worldview ─────────────────────────────────────── */}
      <div className="card" style={{ padding: 26, marginTop: 18, borderLeft: '3px solid #8b7cff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ maxWidth: 940 }}>
            <div className="eyebrow">Selected path · {path.level}</div>
            <h2 style={{ fontSize: '1.7rem', margin: '8px 0 10px' }}>{path.title}</h2>
            <p style={{ color: 'var(--text-2)', lineHeight: 1.85, fontSize: 14 }}>{s.worldview}</p>
          </div>
          <div style={{ minWidth: 190 }}>
            <button className="btn btn-primary btn-sm" onClick={() => progress.setPath(path.id)}>
              {p.path === path.id ? <Check size={12} /> : <ArrowRight size={12} />} {p.path === path.id ? 'Current path' : 'Set as my path'}
            </button>
            <div className="subtle" style={{ marginTop: 10 }}><Clock size={11} style={{ verticalAlign: -1 }} /> ~{path.hours} hours · {path.topicIds.length} topics</div>
          </div>
        </div>
        <div className="callout intuition" style={{ marginTop: 18 }}>
          <div className="co-title">The first principle of this path</div>
          <p style={{ fontSize: 15 }}>{s.firstPrinciple}</p>
        </div>
        <div className="progress-track" style={{ marginTop: 18 }}><div className="progress-fill" style={{ width: `${path.topicIds.length ? done / path.topicIds.length * 100 : 0}%` }} /></div>
        <div className="subtle" style={{ marginTop: 6 }}>{done}/{path.topicIds.length} topics mastered on this path</div>
      </div>

      {/* ── Grand arc ────────────────────────────────────────────────────── */}
      <div className="section-head"><div><div className="eyebrow">The conceptual arc</div><h2>Why this path exists, chapter by chapter</h2></div><Layers size={17} color="#8b7cff" /></div>
      <div className="grid g2">
        {s.arc.map((chapter, i) => <div className="card panel" key={chapter.title}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
            <div className="eyebrow">Chapter {String(i + 1).padStart(2, '0')}</div>
            <span className="chip">{chapter.title.split('·')[0].trim()}</span>
          </div>
          <h3 style={{ fontSize: 14, margin: '10px 0 6px' }}>{chapter.title.replace(/^\d+\s*·\s*/, '')}</h3>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.85, fontSize: 13 }}><InlineText text={chapter.text} /></p>
          {chapter.math && <div className="math-block"><Math tex={chapter.math} display /></div>}
        </div>)}
      </div>

      {/* ── Questions and themes ─────────────────────────────────────────── */}
      <div className="feature-row" style={{ marginTop: 16 }}>
        <div className="card panel">
          <div className="panel-title"><h3><Sparkles size={14} style={{ verticalAlign: -2 }} /> Essential questions</h3></div>
          <p className="subtle">Keep these beside you. A topic is understood when you can answer its question without looking.</p>
          <ol>{s.essentialQuestions.map(q => <li key={q} style={{ marginBottom: 7 }}>{q}</li>)}</ol>
        </div>
        <div className="card panel">
          <div className="panel-title"><h3><Network size={14} style={{ verticalAlign: -2 }} /> Unifying themes</h3></div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {s.themes.map(t => <span className="chip" key={t}>{t}</span>)}
          </div>
          <div className="panel-title" style={{ marginTop: 20 }}><h3><Sigma size={14} style={{ verticalAlign: -2 }} /> Destination</h3></div>
          <div className="callout note"><div className="co-title">Mastery, not completion</div><p>{path.completion}</p></div>
          <div className="panel-title" style={{ marginTop: 18 }}><h3><BookOpen size={14} style={{ verticalAlign: -2 }} /> Entry requirements</h3></div>
          {path.prerequisites.length ? <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {path.prerequisites.map(t => <button className="chip" key={t} onClick={() => go(`/topic/${t}`)}>{t.replace(/-/g, ' ')}</button>)}
          </div> : <p className="subtle">Start here — no prior topic required.</p>}
          <h4 style={{ fontSize: 12, marginTop: 18 }}>Learning objectives</h4>
          <ul style={{ marginBottom: 0 }}>{path.objectives.map(o => <li key={o}>{o}</li>)}</ul>
        </div>
      </div>

      {/* ── Step-by-step first-principles rationale ─────────────────────── */}
      <div className="section-head"><div><div className="eyebrow">The route itself</div><h2>Every step: question, idea, bridge</h2></div><span className="subtle">Expand a step to see why it must come next</span></div>
      <div className="card" style={{ padding: 6 }}>
        {path.topicIds.map((t, i) => {
          const topic = TOPIC_BY_ID[t]
          const r = s.rationale[t]
          const isOpen = openStep === i
          return <div key={t} style={{ borderTop: i ? '1px solid var(--border-soft)' : 0 }}>
            <button className="nav-item" style={{ width: '100%', padding: '12px 14px', color: 'var(--text)' }} onClick={() => setOpenStep(isOpen ? null : i)}>
              <span className="mono" style={{ fontSize: 10, color: '#6f7d93', minWidth: 32 }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ flex: 1, textAlign: 'left' }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{topic?.title ?? t}</span>
                <span className="subtle" style={{ display: 'block', fontSize: 10.5 }}>{r.question}</span>
              </span>
              {p.completed.includes(t) && <Check size={13} color="#4fd1a5" />}
              <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform .18s' }} />
            </button>
            {isOpen && <div style={{ padding: '4px 18px 18px 58px', maxWidth: 940 }}>
              <div className="callout intuition" style={{ marginTop: 6 }}>
                <div className="co-title">The idea from first principles</div>
                <p>{r.idea}</p>
              </div>
              <div className="callout note">
                <div className="co-title">Why the next step is forced</div>
                <p>{r.bridge}</p>
              </div>
              <p className="subtle" style={{ lineHeight: 1.75, margin: '10px 0 0' }}>{topic?.summary}</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-sm" onClick={() => go(`/topic/${t}`)}>Open the lesson <ArrowRight size={12} /></button>
                <button className={`btn btn-sm ${p.completed.includes(t) ? '' : 'btn'}`} onClick={() => progress.markComplete(t)}>
                  <Check size={12} /> {p.completed.includes(t) ? 'Mastered' : 'Mark mastered'}
                </button>
              </div>
            </div>}
          </div>
        })}
      </div>

      {/* ── Capstone ─────────────────────────────────────────────────────── */}
      <div className="section-head"><div><div className="eyebrow">The final test</div><h2>Capstone research challenge</h2></div><Target size={17} color="#ffb454" /></div>
      <div className="card panel" style={{ borderLeft: '3px solid #ffb454' }}>
        <h3 style={{ fontSize: 15 }}>{s.capstone.title}</h3>
        <p style={{ color: 'var(--text-2)', lineHeight: 1.85, marginTop: 10 }}>{s.capstone.prompt}</p>
        <h4 style={{ fontSize: 12, marginTop: 16 }}>Deliverables</h4>
        <ol>{s.capstone.deliverables.map(d => <li key={d}>{d}</li>)}</ol>
        <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
          <button className="btn btn-sm" onClick={() => go('/proof')}>Open Proof Studio <ArrowRight size={12} /></button>
          <button className="btn btn-sm" onClick={() => go('/problems')}>Find practice problems <ArrowRight size={12} /></button>
          <button className="btn btn-sm" onClick={() => go('/workspace')}>Write it in my workspace <ArrowRight size={12} /></button>
        </div>
      </div>

      <div className="section-head"><div><div className="eyebrow">No path is an island</div><h2>Where this path leads</h2></div><Network size={17} color="#4fd1a5" /></div>
      <div className="card panel">
        <p style={{ color: 'var(--text-2)', lineHeight: 1.8 }}>{PATH_RELATIONS[path.id].text}</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
          {PATH_RELATIONS[path.id].paths.map(id => {
            const other = LEARNING_PATHS.find(l => l.id === id)
            return <button className="chip" key={id} onClick={() => { setActive(id); setOpenStep(0); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
              {other?.title ?? id} <ArrowRight size={11} />
            </button>
          })}
          <button className="chip" onClick={() => go('/graph')}>Open knowledge graph <ArrowRight size={11} /></button>
        </div>
      </div>

      <p className="subtle" style={{ marginTop: 18 }}>{STATS.paths} curated paths · {STATS.topics} canonical topics · every topic is also reachable directly through Explore.</p>
    </div>
  )
}
