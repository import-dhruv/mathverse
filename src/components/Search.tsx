import { useEffect, useMemo, useRef, useState } from 'react'
import { Search as SearchIcon, X, CornerDownLeft } from 'lucide-react'
import { ALL_TOPICS, DERIVATIONS, PROBLEMS, BRANCHES, MATHEMATICIANS, FRONTIERS, LABS, REFERENCES, PAPERS } from '../data'
import { SIMULATIONS } from '../data/simulations'
import { GENERATED_FAMILIES, INTERNATIONAL_FAMILIES } from '../data/generated'
import { go } from '../lib/router'
import { BRANCH_BY_ID } from '../data/architecture'

export interface SearchHit { id: string; title: string; sub: string; group: string; path: string; color: string }

function buildIndex(): SearchHit[] {
  const hits: SearchHit[] = []
  ALL_TOPICS.forEach(t => hits.push({ id: 't-' + t.id, title: t.title, sub: `${BRANCH_BY_ID[t.branchId]?.title ?? ''} · ${t.status === 'Outline' ? 'outline' : 'article'}`, group: 'Topics', path: `/topic/${t.id}`, color: BRANCH_BY_ID[t.branchId]?.color ?? '#6ea8ff' }))
  BRANCHES.forEach(b => hits.push({ id: 'b-' + b.id, title: b.title, sub: b.part, group: 'Branches', path: `/branch/${b.id}`, color: b.color }))
  DERIVATIONS.forEach(d => hits.push({ id: 'd-' + d.id, title: d.title, sub: 'Step-by-step derivation', group: 'Derivations', path: `/derivation/${d.id}`, color: '#8b7cff' }))
  PROBLEMS.forEach(p => hits.push({ id: 'p-' + p.id, title: p.title, sub: `${p.type} · ${p.level}`, group: 'Problems', path: `/problem/${p.id}`, color: '#ffb454' }))
  SIMULATIONS.forEach(s => hits.push({ id: 's-' + s.id, title: s.title, sub: 'Interactive visualization', group: 'Visualizations', path: `/simulation/${s.id}`, color: '#4fd1c5' }))
  LABS.forEach(l => hits.push({ id: 'l-' + l.id, title: l.title, sub: `Laboratory ${l.letter}`, group: 'Laboratories', path: `/lab/${l.id}`, color: '#6ea8ff' }))
  FRONTIERS.forEach(f => hits.push({ id: 'f-' + f.id, title: f.title, sub: `${f.field} · ${f.status}`, group: 'Research frontiers', path: `/research/${f.id}`, color: '#c79cff' }))
  MATHEMATICIANS.forEach(m => hits.push({ id: 'm-' + m.id, title: m.name, sub: `${m.years} · ${m.field}`, group: 'Mathematicians', path: `/history/${m.id}`, color: '#ff9eb5' }))
  REFERENCES.forEach(r => hits.push({ id: 'r-' + r.id, title: r.title, sub: `${r.type} · ${r.authors ?? ''}`, group: 'Library', path: '/library', color: '#8fd0ff' }))
  PAPERS.forEach(p => hits.push({ id: 'pa-' + p.id, title: p.title, sub: `${p.authors.slice(0, 3).join(', ')} · ${p.year}`, group: 'Papers', path: '/library', color: '#b98cff' }))
  GENERATED_FAMILIES.forEach(f => hits.push({ id: 'g-' + f.id, title: `${f.title} — generated set`, sub: '500 deterministic variants', group: 'Generated problems', path: `/problem/gen-${f.id}-0`, color: '#ffb454' }))
  INTERNATIONAL_FAMILIES.forEach(f => hits.push({ id: 'i-' + f.id, title: `${f.title} — international level`, sub: '500 olympiad-style variants', group: 'International problems', path: `/problem/intl-${f.id}-0`, color: '#c79cff' }))
  return hits
}

const INDEX = buildIndex()

export function GlobalSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (!needle) return INDEX.filter(h => ['Topics', 'Branches', 'Visualizations'].includes(h.group)).slice(0, 8)
    const words = needle.split(/\s+/)
    return INDEX.map(h => {
      const t = `${h.title} ${h.sub} ${h.group}`.toLowerCase()
      const score = words.reduce((s, w) => s + (t.includes(w) ? (h.title.toLowerCase().includes(w) ? 3 : 1) : -5), 0)
      return { h, score }
    }).filter(x => x.score > 0).sort((a, b) => b.score - a.score || a.h.title.localeCompare(b.h.title)).slice(0, 16).map(x => x.h)
  }, [q])

  useEffect(() => { if (open) { setQ(''); setSelected(0); setTimeout(() => inputRef.current?.focus(), 20) } }, [open])
  useEffect(() => { setSelected(0) }, [q])

  if (!open) return null
  const choose = (hit: SearchHit) => { go(hit.path); onClose() }
  let lastGroup = ''

  return (
    <div className="overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="search-box">
        <div className="search-input-wrap">
          <SearchIcon size={18} color="#6f7d93" />
          <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)}
            placeholder="Search concepts, equations, visualizations, papers…"
            onKeyDown={e => {
              if (e.key === 'Escape') onClose()
              if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(results.length - 1, s + 1)) }
              if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(0, s - 1)) }
              if (e.key === 'Enter' && results[selected]) choose(results[selected])
            }} />
          <button className="icon-btn" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="search-results">
          {results.length === 0 && <div className="search-empty">No matches. Try a broader term — “limit”, “entropy”, “group”, “eigenvalue”.</div>}
          {results.map((hit, i) => {
            const showGroup = hit.group !== lastGroup; lastGroup = hit.group
            return <div key={hit.id}>
              {showGroup && <div className="search-group">{hit.group}</div>}
              <div className={`search-result ${i === selected ? 'selected' : ''}`} onMouseEnter={() => setSelected(i)} onClick={() => choose(hit)}>
                <span className="sr-ico" style={{ color: hit.color }}><SearchIcon size={13} /></span>
                <div style={{ minWidth: 0 }}><div className="sr-title">{hit.title}</div><div className="sr-sub">{hit.sub}</div></div>
                {i === selected && <CornerDownLeft size={13} style={{ marginLeft: 'auto', color: '#6f7d93' }} />}
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}
