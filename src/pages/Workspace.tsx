import { useState } from 'react'
import { NotebookPen, Save, Trash2, ArrowRight, Bookmark, SlidersHorizontal } from 'lucide-react'
import { ALL_TOPICS, SIMULATIONS, LABS, PROOF_TECHNIQUES } from '../data'
import { go } from '../lib/router'
import { useProgress } from '../lib/store'

interface Note { id: string; title: string; body: string; updated: string }
const KEY = 'mathverse-notes-v1'
function loadNotes(): Note[] { try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') } catch { return [] } }
function saveNotes(n: Note[]) { try { localStorage.setItem(KEY, JSON.stringify(n)) } catch { /* ignore */ } }

export function WorkspacePage() {
  const p = useProgress()
  const [notes, setNotes] = useState<Note[]>(loadNotes)
  const [active, setActive] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const note = notes.find(n => n.id === active)

  const create = () => {
    const n = { id: String(Date.now()), title: title.trim() || 'Untitled note', body: '', updated: new Date().toISOString() }
    const next = [n, ...notes]; setNotes(next); saveNotes(next); setActive(n.id); setTitle(''); setBody('')
  }
  const update = (b: string) => {
    if (!note) return
    const next = notes.map(n => n.id === note.id ? { ...n, body: b, updated: new Date().toISOString() } : n)
    setNotes(next); saveNotes(next); setBody(b)
  }
  const remove = (id: string) => { const next = notes.filter(n => n.id !== id); setNotes(next); saveNotes(next); if (active === id) setActive(null) }

  const savedSims = SIMULATIONS.filter(s => {
    try { return localStorage.getItem(`mathverse-sim-${s.id}`) !== null } catch { return false }
  })

  return (
    <div>
      <div className="eyebrow">Personal workspace</div>
      <h1 style={{ fontSize: 'clamp(2rem,3.4vw,2.7rem)', margin: '10px 0' }}>Your mathematical notebook</h1>
      <p className="lead">Notes, saved experiments and bookmarks live in this browser. Nothing is uploaded. Open a note, write freely in Markdown or LaTeX ($…$), and return to it later.</p>

      <div className="feature-row" style={{ marginTop: 20 }}>
        <div className="card panel">
          <div className="panel-title"><h3><NotebookPen size={15} /> Notes</h3><button className="btn btn-sm" onClick={create}><Save size={12} /> New note</button></div>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New note title…" style={{ width: '100%', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 8, padding: 9, color: 'var(--text)' }} />
          <div style={{ marginTop: 12 }}>
            {notes.length === 0 ? <p className="subtle">No notes yet. Create one to record derivations, questions and ideas.</p> : notes.map(n => (
              <div className="mini-item" key={n.id} style={{ cursor: 'pointer' }} onClick={() => { setActive(n.id); setBody(n.body) }}>
                <Bookmark size={13} color={active === n.id ? '#6ea8ff' : '#6f7d93'} style={{ marginTop: 4 }} />
                <div style={{ flex: 1 }}><div className="mi-title">{n.title}</div><div className="mi-sub">{new Date(n.updated).toLocaleString()} · {n.body.length} chars</div></div>
                <button className="icon-btn" onClick={e => { e.stopPropagation(); remove(n.id) }}><Trash2 size={13} /></button>
              </div>
            ))}
          </div>
        </div>
        <div className="card panel">
          <div className="panel-title"><h3>Workspace at a glance</h3></div>
          <div className="grid g2">
            <div><div className="eyebrow">Notes</div><div className="m-val">{notes.length}</div></div>
            <div><div className="eyebrow">Saved experiments</div><div className="m-val">{savedSims.length}</div></div>
            <div><div className="eyebrow">Bookmarked topics</div><div className="m-val">{p.bookmarks.length}</div></div>
            <div><div className="eyebrow">Proofs drafted</div><div className="m-val">{p.proofs.length}</div></div>
          </div>
          <div className="panel-title" style={{ marginTop: 18 }}><h3><SlidersHorizontal size={14} /> Saved experiments</h3></div>
          {savedSims.length ? <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {savedSims.map(s => <button className="chip" key={s.id} onClick={() => go(`/simulation/${s.id}`)}>{s.title}</button>)}
          </div> : <p className="subtle">Use the bookmark button on a visualization to save its parameters.</p>}
        </div>
      </div>

      {note && <div className="card panel" style={{ marginTop: 16 }}>
        <div className="panel-title"><h3>{note.title}</h3><span className="subtle">editing locally</span></div>
        <textarea className="proof-textarea" style={{ minHeight: 300 }} value={body} onChange={e => update(e.target.value)} placeholder="Write your derivation, questions, or research notes…" />
      </div>}

      <div className="section-head"><div><h2>Recent & recommended</h2></div></div>
      <div className="grid g3">
        {ALL_TOPICS.filter(t => p.studying.includes(t.id) || p.bookmarks.includes(t.id) || t.status !== 'Outline').slice(0, 9).map(t => (
          <button className="card card-hover" key={t.id} onClick={() => go(`/topic/${t.id}`)} style={{ textAlign: 'left', padding: 15 }}>
            <h3 style={{ fontSize: 13 }}>{t.title}</h3><p className="subtle" style={{ margin: 0 }}>{t.summary.slice(0, 110)}…</p>
          </button>
        ))}
      </div>
      <div className="section-head"><div><h2>Proof methods quick reference</h2></div><button className="btn btn-sm" onClick={() => go('/proof')}>Proof Studio <ArrowRight size={12} /></button></div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {PROOF_TECHNIQUES.map(t => <span className="chip" key={t.id}>{t.title}</span>)}
      </div>
      <div className="subtle" style={{ marginTop: 16 }}>{LABS.length} laboratories are available from the navigation.</div>
    </div>
  )
}
