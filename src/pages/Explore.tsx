import { useState } from 'react'
import { ChevronRight, ArrowRight, BookOpen, Sigma, Layers } from 'lucide-react'
import { BranchIcon } from '../components/BranchIcon'
import { BRANCHES, BRANCH_BY_ID, PART_NAMES, ALL_TOPICS, topicsForBranch, STATS } from '../data'
import { go } from '../lib/router'
import { useProgress } from '../lib/store'

export function ExplorePage() {
  const [q, setQ] = useState('')
  const [part, setPart] = useState('All')
  const branches = BRANCHES.filter(b => (part === 'All' || b.part === part) &&
    (b.title.toLowerCase().includes(q.toLowerCase()) || b.description.toLowerCase().includes(q.toLowerCase())))
  const matched = q ? ALL_TOPICS.filter(t => t.title.toLowerCase().includes(q.toLowerCase()) || t.summary.toLowerCase().includes(q.toLowerCase())).slice(0, 20) : []

  return (
    <div>
      <div className="eyebrow">Explore mathematics</div>
      <h1 style={{ fontSize: 'clamp(2rem,3.5vw,2.8rem)', margin: '10px 0' }}>The complete knowledge architecture</h1>
      <p className="lead">{STATS.branches} branches and {STATS.topics} canonical topics — from counting to current research. Every topic has a verified place in the map; long-form articles are marked clearly, and unfinished ones are labelled outlines.</p>

      <div className="filter-bar" style={{ marginTop: 22 }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Filter branches and topics…" style={{ minWidth: 260 }} />
        {['All', ...PART_NAMES].map(p => <button key={p} className={`chip ${part === p ? 'chip-active' : ''}`} onClick={() => setPart(p)}>{p}</button>)}
      </div>

      {matched.length > 0 && (
        <div className="card panel" style={{ marginBottom: 18 }}>
          <div className="panel-title"><h3>Matching topics</h3><span className="chip">{matched.length} shown</span></div>
          <div className="grid g2">
            {matched.map(t => <div className="mini-item" key={t.id} onClick={() => go(`/topic/${t.id}`)} style={{ cursor: 'pointer' }}>
              <BookOpen size={14} color="#6ea8ff" style={{ marginTop: 4 }} />
              <div><div className="mi-title">{t.title}</div><div className="mi-sub">{t.status === 'Outline' ? 'Curriculum outline' : 'Long-form article'} · {t.level}</div></div>
            </div>)}
          </div>
        </div>
      )}

      {PART_NAMES.filter(p => part === 'All' || p === part).map(p => {
        const list = branches.filter(b => b.part === p)
        if (!list.length) return null
        return <div key={p}>
          <div className="section-head"><div><div className="eyebrow">{p}</div><h2>{p.split('·').slice(1).join('·').trim()}</h2></div><span className="subtle">{list.length} branches</span></div>
          <div className="grid g3">
            {list.map(b => <button className="card card-hover branch-tile" key={b.id} onClick={() => go(`/branch/${b.id}`)} style={{ textAlign: 'left' }}>
              <div className="bt-icon" style={{ background: `${b.color}18`, color: b.color }}><BranchIcon name={b.icon} /></div>
              <div className="bt-count">{b.topicIds.length} topics</div>
              <h3>{b.title}</h3><p>{b.description}</p>
            </button>)}
          </div>
        </div>
      })}
    </div>
  )
}

export function BranchPage({ id }: { id: string }) {
  const branch = BRANCH_BY_ID[id]
  const p = useProgress()
  if (!branch) return <div className="empty-state">Branch not found. <button className="btn btn-sm" onClick={() => go('/explore')}>Back to explore</button></div>
  const topics = topicsForBranch(id)
  const done = topics.filter(t => p.completed.includes(t.id)).length
  return (
    <div>
      <div className="breadcrumb"><button onClick={() => go('/explore')}>Explore Mathematics</button><ChevronRight size={11} /><span>{branch.title}</span></div>
      <div className="card" style={{ padding: 24, borderLeft: `3px solid ${branch.color}` }}>
        <div className="eyebrow" style={{ color: branch.color }}>{branch.part}</div>
        <h1 style={{ fontSize: 'clamp(1.9rem,3vw,2.6rem)', margin: '10px 0' }}>{branch.title}</h1>
        <p className="lead">{branch.description}</p>
        <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
          <span className="chip"><Layers size={12} /> {topics.length} topics</span>
          <span className="chip"><Sigma size={12} /> {topics.filter(t => t.status !== 'Outline').length} deep articles</span>
          <span className="chip"><BookOpen size={12} /> {done} completed</span>
        </div>
      </div>
      <div className="section-head"><div><h2>Topics in this branch</h2></div></div>
      <div className="grid g2">
        {topics.map((t, i) => (
          <button className="card card-hover" key={t.id} onClick={() => go(`/topic/${t.id}`)} style={{ textAlign: 'left', padding: 17 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <span className="chip" style={{ borderColor: t.status === 'Outline' ? undefined : 'rgba(79,209,165,.4)' }}>
                {t.status === 'Outline' ? 'Outline' : 'Deep article'}
              </span>
              <span className="subtle">{(i + 1).toString().padStart(2, '0')}</span>
            </div>
            <h3 style={{ margin: '12px 0 5px' }}>{t.title}</h3>
            <p className="subtle" style={{ lineHeight: 1.6, margin: 0 }}>{t.summary.slice(0, 150)}{t.summary.length > 150 ? '…' : ''}</p>
            <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="chip">{t.level}</span>
              {p.completed.includes(t.id) && <span className="chip" style={{ color: '#4fd1a5' }}>Completed</span>}
              <ArrowRight size={13} style={{ marginLeft: 'auto', color: '#6f7d93' }} />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
