import { useEffect, useMemo, useState } from 'react'
import {
  Search, ExternalLink, FileText, Download, Bookmark, ChevronRight,
  Globe2, Database, AlertTriangle, ArrowRight, BookOpen, Trash2,
} from 'lucide-react'
import { ALL_TOPICS } from '../data'
import { go } from '../lib/router'

type PaperRecord = {
  id: string
  title: string
  year: number | null
  authors: string[]
  venue: string | null
  citedBy: number
  abstract: string
  doi: string | null
  landingUrl: string
  oaUrl: string | null
  isOa: boolean
  type: string | null
}
type Result = { source: string; total: number; papers: PaperRecord[]; nextCursor?: string | null; nextOffset?: number }
type Source = 'openalex' | 'crossref'

const SAVED_KEY = 'mathverse-reading-list-v1'
function loadSaved(): string[] { try { return JSON.parse(localStorage.getItem(SAVED_KEY) ?? '[]') } catch { return [] } }

function relatedTopic(title: string) {
  const words = title.toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 4)
  let best: { id: string; score: number } | null = null
  for (const t of ALL_TOPICS) {
    const text = `${t.title} ${t.tags.join(' ')}`.toLowerCase()
    const score = words.filter(w => text.includes(w)).length
    if (score > 0 && (!best || score > best.score)) best = { id: t.id, score }
  }
  return best?.id ?? null
}

export function PapersPage() {
  const [source, setSource] = useState<Source>('openalex')
  const [q, setQ] = useState('')
  const [query, setQuery] = useState('')
  const [year, setYear] = useState('')
  const [oaOnly, setOaOnly] = useState(false)
  const [sort, setSort] = useState('relevance_score:desc')
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cursors, setCursors] = useState<string[]>(['*'])
  const [page, setPage] = useState(0)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [saved, setSaved] = useState<string[]>(loadSaved)

  useEffect(() => { try { localStorage.setItem(SAVED_KEY, JSON.stringify(saved)) } catch { /* ignore */ } }, [saved])

  const search = async (nextPage = 0) => {
    if (!query.trim()) return
    setLoading(true); setError('')
    try {
      const params = new URLSearchParams({ q: query, perPage: '15' })
      if (year) params.set('year', year)
      if (source === 'openalex') {
        params.set('cursor', nextPage === 0 ? '*' : (cursors[nextPage] ?? '*'))
        params.set('sort', sort)
        if (oaOnly) params.set('oaOnly', 'true')
      } else params.set('offset', String(nextPage * 15))
      const res = await fetch(`/api/${source === 'openalex' ? 'papers' : 'crossref'}?${params}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Search failed')
      setResult(data)
      setPage(nextPage)
      if (data.nextCursor) setCursors(prev => { const next = [...prev]; next[nextPage + 1] = data.nextCursor; return next })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.')
      setResult(null)
    } finally { setLoading(false) }
  }

  useEffect(() => {
    setResult(null); setCursors(['*']); setPage(0)
  }, [source, oaOnly, sort, year])

  const savedPapers = useMemo(() => saved, [saved])
  const toggleSave = (id: string) => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [id, ...s])

  return (
    <div>
      <div className="eyebrow">Live global paper archive</div>
      <h1 style={{ fontSize: 'clamp(2rem,3.4vw,2.7rem)', margin: '10px 0' }}>Search the world's research literature</h1>
      <p className="lead">Live search across <strong>OpenAlex</strong> (250M+ scholarly works worldwide) and <strong>Crossref</strong> (publisher-registered DOI literature). Find a paper, read its abstract, follow the open-access PDF or publisher page, and connect it to the relevant MATHVERSE topic.</p>

      <div className="callout note" style={{ marginTop: 16 }}>
        <div className="co-title">Honest scope</div>
        <p>This is live search over the world's largest open scholarly indexes — not a local copy of every paper ever written. No paper is hosted here: links go to the publisher, repository or preprint server. Access and licensing are determined by the source, and abstracts are shown for discovery only. Preprints and peer-reviewed articles are different epistemic statuses; check before citing.</p>
      </div>

      <div className="card panel" style={{ marginTop: 16 }}>
        <div className="filter-bar" style={{ marginBottom: 12 }}>
          <button className={`chip ${source === 'openalex' ? 'chip-active' : ''}`} onClick={() => setSource('openalex')}><Globe2 size={12} /> OpenAlex · global index</button>
          <button className={`chip ${source === 'crossref' ? 'chip-active' : ''}`} onClick={() => setSource('crossref')}><Database size={12} /> Crossref · DOI registry</button>
        </div>
        <form onSubmit={e => { e.preventDefault(); search(0) }} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by title, author, concept, DOI…"
            style={{ flex: '1 1 320px', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 8, padding: 11, color: 'var(--text)' }} />
          <input value={year} onChange={e => setYear(e.target.value)} placeholder="From year" type="number" min="1500" max="2030"
            style={{ width: 120, background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 8, padding: 11, color: 'var(--text)' }} />
          <select value={sort} onChange={e => setSort(e.target.value)} disabled={source === 'crossref'}
            style={{ background: 'var(--panel)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 8, padding: 10 }}>
            <option value="relevance_score:desc">Relevance</option>
            <option value="cited_by_count:desc">Most cited</option>
            <option value="publication_date:desc">Newest first</option>
          </select>
          {source === 'openalex' && <label className="chip" style={{ cursor: 'pointer' }}>
            <input type="checkbox" checked={oaOnly} onChange={e => setOaOnly(e.target.checked)} style={{ accentColor: '#4fd1a5' }} /> Open access only
          </label>}
          <button className="btn btn-primary" type="submit" disabled={loading}><Search size={14} /> {loading ? 'Searching…' : 'Search'}</button>
        </form>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
          {['Riemann hypothesis', 'machine learning generalisation', 'Navier Stokes', 'elliptic curves', 'graph neural networks'].map(s =>
            <button className="chip" key={s} onClick={() => { setQ(s); setQuery(s); setTimeout(() => search(0), 0) }}>{s}</button>)}
        </div>
      </div>

      {error && <div className="callout warning" style={{ marginTop: 16 }}><div className="co-title">Search unavailable</div><p>{error} Try the other index, or use the curated landmark papers in the Research Library.</p></div>}

      {result && <>
        <div className="section-head">
          <div><div className="eyebrow">{result.source} results</div><h2>{result.total.toLocaleString()} papers match</h2></div>
          <button className="btn btn-sm" onClick={() => go('/library')}>Curated landmark papers <ArrowRight size={12} /></button>
        </div>
        {result.papers.length === 0 && <div className="empty-state">No papers found. Try broader terms or a different index.</div>}
        <div className="grid g2">
          {result.papers.map((p, i) => {
            const topic = relatedTopic(p.title)
            const isExpanded = expanded === p.id
            return <div className="card" key={`${p.id}-${i}`} style={{ padding: 18 }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 9 }}>
                <span className="chip">{p.year ?? 'n.d.'}</span>
                {p.isOa && <span className="chip" style={{ color: '#4fd1a5' }}>Open access</span>}
                {p.type && <span className="chip">{p.type.replace(/[-_]/g, ' ')}</span>}
                <span className="chip">Cited by {p.citedBy.toLocaleString()}</span>
              </div>
              <h3 style={{ fontSize: 14, lineHeight: 1.5, marginBottom: 6 }}>{p.title}</h3>
              <div className="subtle" style={{ fontSize: 11.5 }}>{p.authors.length ? p.authors.join(', ') : 'Authors unavailable'}{p.venue ? ` · ${p.venue}` : ''}</div>
              {p.abstract && <p style={{ color: 'var(--text-2)', fontSize: 12.5, lineHeight: 1.75, margin: '10px 0 0' }}>
                {isExpanded ? p.abstract : `${p.abstract.slice(0, 230)}${p.abstract.length > 230 ? '…' : ''}`}
              </p>}
              {p.abstract.length > 230 && <button className="btn btn-sm" style={{ marginTop: 6 }} onClick={() => setExpanded(isExpanded ? null : p.id)}>
                {isExpanded ? 'Show less' : 'Show abstract'}
              </button>}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                <a className="btn btn-sm" href={p.landingUrl} target="_blank" rel="noreferrer">Publisher / record <ExternalLink size={12} /></a>
                {p.oaUrl && <a className="btn btn-sm" href={p.oaUrl} target="_blank" rel="noreferrer" style={{ color: '#4fd1a5' }}><Download size={12} /> Open PDF</a>}
                {p.doi && <a className="btn btn-sm" href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer">DOI</a>}
                <button className="btn btn-sm" onClick={() => toggleSave(p.id)}><Bookmark size={12} /> {saved.includes(p.id) ? 'Saved' : 'Save'}</button>
              </div>
              {topic && <button className="btn btn-sm" style={{ marginTop: 8 }} onClick={() => go(`/topic/${topic}`)}>
                <BookOpen size={12} /> Related: {topic.replace(/-/g, ' ')} <ChevronRight size={11} />
              </button>}
            </div>})}
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 18 }}>
          <button className="btn btn-sm" disabled={page === 0 || loading} onClick={() => search(page - 1)}>Previous</button>
          <span className="subtle">Page {page + 1}</span>
          <button className="btn btn-sm" disabled={loading || (source === 'openalex' ? !result.nextCursor : (result.nextOffset ?? 0) >= result.total)} onClick={() => search(page + 1)}>Next</button>
        </div>
      </>}

      {savedPapers.length > 0 && <div className="section-head"><div><div className="eyebrow">Your library</div><h2>Saved papers ({savedPapers.length})</h2></div></div>}
      {savedPapers.length > 0 && <div className="card panel">
        {savedPapers.map(id => <div className="mini-item" key={id}>
          <FileText size={13} color="#6ea8ff" style={{ marginTop: 4 }} />
          <div style={{ flex: 1, minWidth: 0 }}><div className="mi-title" style={{ wordBreak: 'break-all' }}>{id}</div><div className="mi-sub">Saved to your local reading list</div></div>
          <button className="icon-btn" onClick={() => toggleSave(id)}><Trash2 size={13} /></button>
        </div>)}
        <p className="subtle" style={{ marginTop: 10 }}>Reading list is stored in this browser only. Use the Paper study desk in the Research Library to take notes on each paper.</p>
      </div>}
    </div>
  )
}
