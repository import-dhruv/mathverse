import { useEffect, useMemo, useState } from 'react'
import {
  BookOpen, ExternalLink, ArrowRight, FileText, GraduationCap, Library as LibraryIcon,
  Compass, FlaskConical, ShieldCheck, Wrench, PenLine, Download, Check,
} from 'lucide-react'
import {
  REFERENCES, PAPERS, PAPER_CATEGORIES, FRONTIERS,
  RESEARCH_UNIVERSE, EPISTEMIC_LADDER, RESEARCH_GUIDES, SOURCE_ATLAS,
  READING_ROUTES, RESEARCH_GLOSSARY, PAPER_STUDY_FIELDS,
} from '../data'
import { go } from '../lib/router'

type Tab = 'atlas' | 'reading' | 'sources' | 'papers' | 'routes' | 'workspace'

const TABS: { id: Tab; label: string; icon: typeof BookOpen }[] = [
  { id: 'atlas', label: 'The research universe', icon: Compass },
  { id: 'reading', label: 'Reading & method', icon: GraduationCap },
  { id: 'sources', label: 'Source atlas', icon: LibraryIcon },
  { id: 'papers', label: 'Landmark papers', icon: FileText },
  { id: 'routes', label: 'Reading routes', icon: BookOpen },
  { id: 'workspace', label: 'Paper study desk', icon: PenLine },
]

const GUIDE_ICON: Record<string, typeof BookOpen> = {
  Reading: GraduationCap, Method: FlaskConical, Writing: PenLine, Tools: Wrench, Integrity: ShieldCheck,
}

const STUDY_KEY = 'mathverse-paper-study-v1'
function loadStudy(): Record<string, string> {
  try { return JSON.parse(localStorage.getItem(STUDY_KEY) ?? '{}') } catch { return {} }
}

export function LibraryPage() {
  const [tab, setTab] = useState<Tab>('atlas')
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')
  const [guideId, setGuideId] = useState(RESEARCH_GUIDES[0].id)
  const [sourceCat, setSourceCat] = useState('All')
  const [study, setStudy] = useState<Record<string, string>>(loadStudy)
  const [saved, setSaved] = useState(false)

  useEffect(() => { try { localStorage.setItem(STUDY_KEY, JSON.stringify(study)) } catch { /* ignore */ } }, [study])

  const guide = RESEARCH_GUIDES.find(g => g.id === guideId) ?? RESEARCH_GUIDES[0]
  const guideCats = ['All', ...new Set(RESEARCH_GUIDES.map(g => g.category))]
  const guides = RESEARCH_GUIDES.filter(g => cat === 'All' || g.category === cat)
  const sourceCats = ['All', ...new Set(SOURCE_ATLAS.map(s => s.category))]
  const sources = SOURCE_ATLAS.filter(s => (sourceCat === 'All' || s.category === sourceCat) &&
    (!q || (s.title + s.description + s.examples.map(e => e.name).join(' ')).toLowerCase().includes(q.toLowerCase())))
  const refs = REFERENCES.filter(r => !q || (r.title + (r.authors ?? '') + r.note).toLowerCase().includes(q.toLowerCase()))
  const papers = PAPERS.filter(p => (cat === 'All' || p.category === cat) &&
    (!q || (p.title + p.authors.join(' ') + p.summary).toLowerCase().includes(q.toLowerCase())))

  const exportStudy = () => {
    const text = PAPER_STUDY_FIELDS.map(f => `## ${f.label}\n\n${study[f.key] ?? ''}`).join('\n\n')
    const blob = new Blob([text], { type: 'text/markdown' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'mathverse-paper-study.md'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <div>
      <div className="eyebrow">Research paper & advanced study library</div>
      <h1 style={{ fontSize: 'clamp(2rem,3.4vw,2.7rem)', margin: '10px 0' }}>The research library</h1>
      <p className="lead">A working guide to doing mathematics at the frontier: how to read a paper, how to judge evidence, how to choose a problem, how to write and review, where the real sources live, and how to turn a paper into understanding you own.</p>

      <div className="filter-bar" style={{ marginTop: 20 }}>
        {TABS.map(t => <button key={t.id} className={`chip ${tab === t.id ? 'chip-active' : ''}`} onClick={() => setTab(t.id)}>
          <t.icon size={12} /> {t.label}
        </button>)}
      </div>

      {/* ── ATLAS ─────────────────────────────────────────────────────────── */}
      {tab === 'atlas' && <>
        <div className="grid g2" style={{ marginTop: 16 }}>
          {RESEARCH_UNIVERSE.map((u, i) => <div className="card panel" key={u.id}>
            <div className="eyebrow">0{i + 1} · Universal principle</div>
            <h3 style={{ fontSize: 14, margin: '10px 0 7px' }}>{u.title}</h3>
            <p style={{ color: 'var(--text-2)', lineHeight: 1.85, fontSize: 13 }}>{u.text}</p>
          </div>)}
        </div>

        <div className="section-head"><div><div className="eyebrow">Epistemic discipline</div><h2>The ladder of mathematical knowledge</h2></div><ShieldCheck size={17} color="#ffb454" /></div>
        <div className="card" style={{ padding: 6 }}>
          <table className="data-table" style={{ margin: 0 }}>
            <thead><tr><th>Status</th><th>What it means</th><th>Responsible standard</th><th>Common failure</th></tr></thead>
            <tbody>{EPISTEMIC_LADDER.map(r => <tr key={r.rung}>
              <td><strong>{r.rung}</strong></td><td>{r.meaning}</td><td>{r.standard}</td><td className="muted">{r.danger}</td>
            </tr>)}</tbody>
          </table>
        </div>
        <div className="callout warning" style={{ marginTop: 16 }}>
          <div className="co-title">The integrity rule</div>
          <p>Every research page in MATHVERSE labels claims by status. Conjectures are never called theorems, numerical evidence is never called proof, and references are linked rather than fabricated. When in doubt, state the uncertainty explicitly.</p>
        </div>
      </>}

      {/* ── READING & METHOD ──────────────────────────────────────────────── */}
      {tab === 'reading' && <>
        <div className="filter-bar" style={{ marginTop: 16 }}>
          {guideCats.map(c => <button className={`chip ${cat === c ? 'chip-active' : ''}`} key={c} onClick={() => { setCat(c); if (c !== 'All' && !guides.some(g => g.id === guideId)) setGuideId(RESEARCH_GUIDES.find(g => g.category === c)!.id) }}>{c}</button>)}
        </div>
        <div className="feature-row" style={{ marginTop: 12 }}>
          <div className="card panel">
            <div className="panel-title"><h3>Choose a guide</h3><span className="chip">{guides.length} available</span></div>
            {guides.map(g => {
              const Icon = GUIDE_ICON[g.category] ?? BookOpen
              return <div className="mini-item" key={g.id} onClick={() => setGuideId(g.id)} style={{ cursor: 'pointer' }}>
                <Icon size={14} color={guideId === g.id ? '#6ea8ff' : '#6f7d93'} style={{ marginTop: 4 }} />
                <div><div className="mi-title">{g.title}</div><div className="mi-sub">{g.category}</div></div>
              </div>
            })}
          </div>
          <div className="card panel" style={{ borderLeft: '3px solid #8b7cff' }}>
            <div className="eyebrow">{guide.category} guide</div>
            <h3 style={{ fontSize: 16, margin: '8px 0' }}>{guide.title}</h3>
            <p style={{ color: 'var(--text-2)', lineHeight: 1.8 }}>{guide.summary}</p>
            <div className="steps-box">
              {guide.steps.map((s, i) => <div className="step" key={s.title}>
                <div className="step-n">{i + 1}</div>
                <div><h4>{s.title}</h4><p>{s.text}</p></div>
              </div>)}
            </div>
            <div className="callout warning"><div className="co-title">Pitfalls to avoid</div><ul style={{ margin: 0 }}>{guide.pitfalls.map(p => <li key={p}>{p}</li>)}</ul></div>
          </div>
        </div>

        <div className="section-head"><div><div className="eyebrow">Notation survival kit</div><h2>Research glossary</h2></div></div>
        <div className="grid g3">
          {RESEARCH_GLOSSARY.map(g => <div className="card" key={g.term} style={{ padding: 15 }}>
            <h3 style={{ fontSize: 13, fontFamily: 'var(--mono)', color: '#6ea8ff' }}>{g.term}</h3>
            <p className="subtle" style={{ lineHeight: 1.6, margin: '7px 0' }}>{g.meaning}</p>
            <div className="callout warning" style={{ margin: 0, padding: '8px 10px' }}><div className="co-title" style={{ fontSize: 9 }}>Pitfall</div><p style={{ fontSize: 11.5 }}>{g.pitfall}</p></div>
          </div>)}
        </div>
      </>}

      {/* ── SOURCE ATLAS ──────────────────────────────────────────────────── */}
      {tab === 'sources' && <>
        <div className="filter-bar" style={{ marginTop: 16 }}>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search sources and textbooks…" style={{ minWidth: 260 }} />
          {sourceCats.map(c => <button className={`chip ${sourceCat === c ? 'chip-active' : ''}`} key={c} onClick={() => setSourceCat(c)}>{c}</button>)}
        </div>
        <div className="grid g2" style={{ marginTop: 12 }}>
          {sources.map(s => <div className="card" key={s.id} style={{ padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <span className="chip">{s.category}</span>
              <span className="chip">curated directory</span>
            </div>
            <h3 style={{ fontSize: 14, margin: '10px 0 6px' }}>{s.title}</h3>
            <p className="subtle" style={{ lineHeight: 1.7 }}>{s.description}</p>
            <div style={{ margin: '10px 0' }}>
              {s.examples.map(e => <div className="mini-item" key={e.name}>
                <a href={e.url} target="_blank" rel="noreferrer" style={{ display: 'flex', gap: 8, alignItems: 'center', color: '#6ea8ff' }}>
                  <ExternalLink size={13} /> <strong style={{ fontSize: 12 }}>{e.name}</strong>
                </a>
                <div className="mi-sub" style={{ marginLeft: 20 }}>{e.note}</div>
              </div>)}
            </div>
            <div className="callout note" style={{ margin: 0, padding: '9px 11px' }}><div className="co-title" style={{ fontSize: 9 }}>Caveat</div><p style={{ fontSize: 11.5 }}>{s.caveat}</p></div>
          </div>)}
        </div>

        <div className="section-head"><div><div className="eyebrow">Open collection</div><h2>Referenced books, notes and tools</h2></div><span className="chip">{refs.length} resources</span></div>
        <div className="grid g2">
          {refs.map(r => <div className="card" key={r.id} style={{ padding: 17 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <span className="chip">{r.type}</span>
              {r.openAccess && <span className="chip" style={{ color: '#4fd1a5' }}>Open access</span>}
            </div>
            <h3 style={{ fontSize: 14, margin: '10px 0 4px' }}>{r.title}</h3>
            <div className="subtle">{[r.authors, r.publisher, r.year].filter(Boolean).join(' · ')}</div>
            <p className="subtle" style={{ lineHeight: 1.6, margin: '8px 0' }}>{r.note}</p>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <a className="btn btn-sm" href={r.url} target="_blank" rel="noreferrer">Open source <ExternalLink size={12} /></a>
              {r.license && <span className="chip">{r.license}</span>}
            </div>
          </div>)}
        </div>
      </>}

      {/* ── PAPERS ────────────────────────────────────────────────────────── */}
      {tab === 'papers' && <>
        <div className="filter-bar" style={{ marginTop: 16 }}>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search landmark papers…" />
          {['All', ...PAPER_CATEGORIES].map(c => <button className={`chip ${cat === c ? 'chip-active' : ''}`} key={c} onClick={() => setCat(c)}>{c}</button>)}
        </div>
        <div className="grid g2" style={{ marginTop: 12 }}>
          {papers.map(p => <div className="card" key={p.id} style={{ padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <span className="chip">{p.category}</span><span className="chip">{p.year}</span>
            </div>
            <h3 style={{ fontSize: 14, margin: '10px 0 4px' }}>{p.title}</h3>
            <div className="subtle">{p.authors.join(', ')}</div>
            <p className="subtle" style={{ lineHeight: 1.7, margin: '9px 0' }}>{p.summary}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a className="btn btn-sm" href={p.url} target="_blank" rel="noreferrer">Find paper <ExternalLink size={12} /></a>
              {p.frontierIds.map(f => {
                const frontier = FRONTIERS.find(x => x.id === f)
                return frontier && <button className="btn btn-sm" key={f} onClick={() => go(`/research/${f}`)}>{frontier.title} <ArrowRight size={11} /></button>
              })}
            </div>
          </div>)}
        </div>
        <p className="subtle" style={{ marginTop: 16 }}>Links search arXiv by title; we do not assert a specific identifier or DOI unless it has been verified. Always prefer the published journal version when available.</p>
      </>}

      {/* ── ROUTES ────────────────────────────────────────────────────────── */}
      {tab === 'routes' && <>
        <p className="lead" style={{ fontSize: 14, margin: '16px 0' }}>A reading route is an order, not a list. Each step supplies the language needed for the next; skipping a step usually turns a paper into noise.</p>
        <div className="grid g2">
          {READING_ROUTES.map(r => <div className="card panel" key={r.id}>
            <div className="eyebrow">{r.field}</div>
            <h3 style={{ fontSize: 15, margin: '9px 0 6px' }}>{r.title}</h3>
            <p className="subtle" style={{ lineHeight: 1.7 }}>{r.goal}</p>
            <div className="timeline" style={{ marginTop: 12 }}>
              {r.steps.map(s => <div className="tl-event" key={s.label} style={{ paddingBottom: 12 }}>
                <div className="tl-title" style={{ fontSize: 12 }}>{s.label}</div>
                <div className="tl-desc">{s.detail}</div>
              </div>)}
            </div>
          </div>)}
        </div>
        <div className="section-head"><div><h2>Frontier prerequisite maps</h2></div><button className="btn btn-sm" onClick={() => go('/research')}>All frontiers <ArrowRight size={12} /></button></div>
        <div className="grid g2">
          {FRONTIERS.map(f => <div className="mini-item" key={f.id} onClick={() => go(`/research/${f.id}`)} style={{ cursor: 'pointer' }}>
            <BookOpen size={13} color="#6ea8ff" style={{ marginTop: 4 }} />
            <div><div className="mi-title">{f.title}</div><div className="mi-sub">{f.prerequisites.join(' → ')}</div></div>
          </div>)}
        </div>
      </>}

      {/* ── WORKSPACE ─────────────────────────────────────────────────────── */}
      {tab === 'workspace' && <>
        <div className="feature-row" style={{ marginTop: 16 }}>
          <div className="card panel">
            <div className="panel-title"><h3><PenLine size={15} /> Paper study desk</h3><span className="chip">saved locally</span></div>
            <p className="subtle">Use this sheet on every paper. Filling it in forces the ten passes of the reading guide; leaving it blank means you have only skimmed.</p>
            <input value={study.paper ?? ''} onChange={e => setStudy(s => ({ ...s, paper: e.target.value }))}
              placeholder="Paper title you are studying…"
              style={{ width: '100%', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 8, padding: 10, color: 'var(--text)', marginBottom: 12 }} />
            {PAPER_STUDY_FIELDS.map(f => <div key={f.key} style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 11.5, color: 'var(--text-2)', marginBottom: 5 }}>{f.label}</label>
              <textarea value={study[f.key] ?? ''} onChange={e => setStudy(s => ({ ...s, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                style={{ width: '100%', minHeight: 70, background: 'var(--panel)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 8, padding: 10, resize: 'vertical', font: 'inherit', fontSize: 12 }} />
            </div>)}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 1500) }}>{saved ? <Check size={12} /> : <PenLine size={12} />} {saved ? 'Saved' : 'Saved automatically'}</button>
              <button className="btn btn-sm" onClick={exportStudy}><Download size={12} /> Export Markdown</button>
            </div>
          </div>
          <div className="card panel">
            <div className="panel-title"><h3>Reading protocol at a glance</h3><Compass size={15} /></div>
            <ol>
              {RESEARCH_GUIDES[0].steps.map(s => <li key={s.title} style={{ marginBottom: 8 }}><strong>{s.title}.</strong> {s.text}</li>)}
            </ol>
            <div className="callout intuition" style={{ marginTop: 14 }}>
              <div className="co-title">The test of understanding</div>
              <p>You understand a paper when you can state its main theorem without looking, explain why each hypothesis is needed, reproduce its key lemma, and name one question it leaves open.</p>
            </div>
            <button className="btn btn-sm" style={{ marginTop: 12 }} onClick={() => go('/proof')}>Practise proof reconstruction <ArrowRight size={12} /></button>
          </div>
        </div>
      </>}
    </div>
  )
}
