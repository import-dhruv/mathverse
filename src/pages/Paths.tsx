import { useState } from 'react'
import { ChevronRight, Route as RouteIcon, ArrowRight, Check, Clock } from 'lucide-react'
import { LEARNING_PATHS, TOPIC_BY_ID, STATS } from '../data'
import { go } from '../lib/router'
import { progress, useProgress } from '../lib/store'

export function PathsPage() {
  const [active, setActive] = useState<string | null>(LEARNING_PATHS[0].id)
  const p = useProgress()
  const path = LEARNING_PATHS.find(l => l.id === active) ?? LEARNING_PATHS[0]
  const done = path.topicIds.filter(t => p.completed.includes(t)).length
  return (
    <div>
      <div className="eyebrow">Learning paths</div>
      <h1 style={{ fontSize: 'clamp(2rem,3.4vw,2.7rem)', margin: '10px 0' }}>Structured routes through the universe</h1>
      <p className="lead">Paths are sequences, not playlists: each topic assumes the previous ones. Customise any path by opening individual topics and following the prerequisites you need.</p>

      <div className="grid g4" style={{ marginTop: 22 }}>
        {LEARNING_PATHS.map(l => <button className={`card card-hover ${active === l.id ? 'path-active' : ''}`} key={l.id} onClick={() => setActive(l.id)} style={{ textAlign: 'left', padding: 16 }}>
          <div className="sim-tag"><RouteIcon size={11} style={{ verticalAlign: -1 }} /> {l.level}</div>
          <h3 style={{ fontSize: 13, margin: '9px 0 5px' }}>{l.title}</h3>
          <p className="subtle" style={{ margin: 0, lineHeight: 1.55 }}>{l.tagline}</p>
          <div className="subtle" style={{ marginTop: 10 }}>{l.topicIds.length} topics · ~{l.hours}h</div>
        </button>)}
      </div>

      <div className="card" style={{ padding: 24, marginTop: 18, borderLeft: '3px solid #6ea8ff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div>
            <div className="eyebrow">Selected path</div>
            <h2 style={{ fontSize: '1.6rem', margin: '8px 0' }}>{path.title}</h2>
            <p className="lead" style={{ fontSize: 14 }}>{path.description}</p>
          </div>
          <div style={{ minWidth: 180 }}>
            <button className="btn btn-primary btn-sm" onClick={() => progress.setPath(path.id)}>
              {p.path === path.id ? <Check size={12} /> : <ArrowRight size={12} />} {p.path === path.id ? 'Current path' : 'Set as my path'}
            </button>
            <div className="subtle" style={{ marginTop: 10 }}><Clock size={11} style={{ verticalAlign: -1 }} /> ~{path.hours} hours · {path.topicIds.length} topics</div>
          </div>
        </div>
        <div className="progress-track" style={{ marginTop: 16 }}><div className="progress-fill" style={{ width: `${path.topicIds.length ? done / path.topicIds.length * 100 : 0}%` }} /></div>
        <div className="subtle" style={{ marginTop: 6 }}>{done}/{path.topicIds.length} topics mastered on this path</div>
      </div>

      <div className="feature-row" style={{ marginTop: 16 }}>
        <div className="card panel">
          <div className="panel-title"><h3>Objectives</h3></div>
          <ul>{path.objectives.map(o => <li key={o}>{o}</li>)}</ul>
          <div className="panel-title" style={{ marginTop: 18 }}><h3>Completion criterion</h3></div>
          <div className="callout intuition"><div className="co-title">Mastery, not completion</div><p>{path.completion}</p></div>
          {path.prerequisites.length > 0 && <><div className="panel-title" style={{ marginTop: 18 }}><h3>Prerequisites</h3></div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{path.prerequisites.map(t => <button className="chip" key={t} onClick={() => go(`/topic/${t}`)}>{t.replace(/-/g, ' ')}</button>)}</div></>}
        </div>
        <div className="card panel">
          <div className="panel-title"><h3>Topic sequence</h3><span className="chip">{path.topicIds.length} steps</span></div>
          <div className="timeline">
            {path.topicIds.map((t, i) => {
              const topic = TOPIC_BY_ID[t]
              return <div className="tl-event" key={t}>
                <div className="tl-year">STEP {String(i + 1).padStart(2, '0')} {p.completed.includes(t) ? ' · mastered' : ''}</div>
                <div className="tl-title" onClick={() => go(`/topic/${t}`)} style={{ cursor: 'pointer' }}>{topic?.title ?? t}</div>
                <div className="tl-desc">{topic?.summary.slice(0, 130) ?? ''}{topic && topic.summary.length > 130 ? '…' : ''}</div>
              </div>
            })}
          </div>
        </div>
      </div>
      <div className="subtle" style={{ marginTop: 16 }}>{STATS.paths} curated paths · every topic is also reachable directly through Explore.</div>
    </div>
  )
}
