import { useState } from 'react'
import { BookOpen, ExternalLink, ArrowRight, FileText, GraduationCap } from 'lucide-react'
import { REFERENCES, PAPERS, PAPER_CATEGORIES, FRONTIERS } from '../data'
import { go } from '../lib/router'

export function LibraryPage() {
  const [tab, setTab] = useState<'references' | 'papers' | 'guide'>('references')
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')
  const refs = REFERENCES.filter(r => !q || (r.title + (r.authors ?? '') + r.note).toLowerCase().includes(q.toLowerCase()))
  const papers = PAPERS.filter(p => (cat === 'All' || p.category === cat) && (!q || (p.title + p.authors.join(' ') + p.summary).toLowerCase().includes(q.toLowerCase())))

  return (
    <div>
      <div className="eyebrow">Research paper & advanced study library</div>
      <h1 style={{ fontSize: 'clamp(2rem,3.4vw,2.7rem)', margin: '10px 0' }}>Read the originals</h1>
      <p className="lead">Open-access textbooks, lecture notes, software documentation and landmark papers. We link to legitimate sources rather than reproducing copyrighted material, and we never fabricate citations.</p>
      <div className="filter-bar" style={{ marginTop: 20 }}>
        <button className={`btn ${tab === 'references' ? 'btn-primary' : ''} btn-sm`} onClick={() => setTab('references')}>Open resources ({REFERENCES.length})</button>
        <button className={`btn ${tab === 'papers' ? 'btn-primary' : ''} btn-sm`} onClick={() => setTab('papers')}>Landmark papers ({PAPERS.length})</button>
        <button className={`btn ${tab === 'guide' ? 'btn-primary' : ''} btn-sm`} onClick={() => setTab('guide')}>How to read a paper</button>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search library…" style={{ marginLeft: 'auto' }} />
      </div>

      {tab === 'references' && <div className="grid g2">
        {refs.map(r => <div className="card" key={r.id} style={{ padding: 17 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
            <span className="chip">{r.type}</span>
            {r.openAccess && <span className="chip" style={{ color: '#4fd1a5' }}>Open access</span>}
          </div>
          <h3 style={{ fontSize: 14, margin: '10px 0 4px' }}>{r.title}</h3>
          <div className="subtle">{[r.authors, r.publisher, r.year].filter(Boolean).join(' · ')}</div>
          <p className="subtle" style={{ lineHeight: 1.6, margin: '8px 0' }}>{r.note}</p>
          <a className="btn btn-sm" href={r.url} target="_blank" rel="noreferrer">Open source <ExternalLink size={12} /></a>
        </div>)}
      </div>}

      {tab === 'papers' && <>
        <div className="filter-bar">
          <button className={`chip ${cat === 'All' ? 'chip-active' : ''}`} onClick={() => setCat('All')}>All categories</button>
          {PAPER_CATEGORIES.map(c => <button className={`chip ${cat === c ? 'chip-active' : ''}`} key={c} onClick={() => setCat(c)}>{c}</button>)}
        </div>
        <div className="grid g2">
          {papers.map(p => <div className="card" key={p.id} style={{ padding: 17 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <span className="chip">{p.category}</span><span className="chip">{p.year}</span>
            </div>
            <h3 style={{ fontSize: 14, margin: '10px 0 4px' }}>{p.title}</h3>
            <div className="subtle">{p.authors.join(', ')}</div>
            <p className="subtle" style={{ lineHeight: 1.6, margin: '8px 0' }}>{p.summary}</p>
            <a className="btn btn-sm" href={p.url} target="_blank" rel="noreferrer">Find paper <ExternalLink size={12} /></a>
          </div>)}
        </div>
        <p className="subtle" style={{ marginTop: 16 }}>Links search arXiv by title; we do not assert a specific identifier or DOI unless it has been verified. Always prefer the published journal version when available.</p>
      </>}

      {tab === 'guide' && <div className="feature-row">
        <div className="card panel">
          <div className="panel-title"><h3><GraduationCap size={15} /> A reading protocol</h3></div>
          <ol>
            <li>Read the title, abstract and section headings before any proof.</li>
            <li>Write down every definition the paper assumes; look each one up.</li>
            <li>Identify the main theorem and list its hypotheses explicitly.</li>
            <li>Sketch the proof structure before reading the details.</li>
            <li>Track notation in a personal glossary — authors reuse symbols differently.</li>
            <li>Find one example the theorem applies to and one where a hypothesis fails.</li>
            <li>Reproduce a small lemma independently, then compare.</li>
            <li>Record open questions raised by the paper.</li>
          </ol>
        </div>
        <div className="card panel">
          <div className="panel-title"><h3><FileText size={15} /> Prerequisite maps for research</h3></div>
          {FRONTIERS.slice(0, 8).map(f => <div className="mini-item" key={f.id} onClick={() => go(`/research/${f.id}`)} style={{ cursor: 'pointer' }}>
            <BookOpen size={13} color="#6ea8ff" style={{ marginTop: 4 }} />
            <div><div className="mi-title">{f.title}</div><div className="mi-sub">{f.prerequisites.join(' → ')}</div></div>
          </div>)}
          <button className="btn btn-sm" style={{ marginTop: 12 }} onClick={() => go('/research')}>All frontier maps <ArrowRight size={12} /></button>
        </div>
      </div>}
    </div>
  )
}
