import { useEffect, useState } from 'react'
import {
  Home, Compass, Route as RouteIcon, Shapes, FlaskConical, FileCheck2, Target,
  Library as LibraryIcon, History, Sparkles, ChartNoAxesCombined, NotebookPen,
  Search, Menu, X, ChevronRight, Sigma, Telescope, Network, BookOpen, Sun, Moon, FileText,
} from 'lucide-react'
import { GlobalSearch } from './components/Search'
import { useRoute, go } from './lib/router'
import { useProgress, progress } from './lib/store'
import { STATS } from './data'

import { HomePage } from './pages/Home'
import { ExplorePage, BranchPage } from './pages/Explore'
import { TopicPage } from './pages/Topic'
import { DerivationsPage, DerivationPage } from './pages/Derivation'
import { VisualPage, SimulationPage } from './pages/Visual'
import { LabsPage, LabPage } from './pages/Lab'
import { ProofStudioPage } from './pages/ProofStudio'
import { ProblemArena, ProblemPage } from './pages/Problems'
import { ResearchPage, FrontierPage, HistoryPage } from './pages/Research'
import { GraphPage } from './pages/Graph'
import { PathsPage } from './pages/Paths'
import { ProgressPage } from './pages/Progress'
import { LibraryPage } from './pages/Library'
import { TutorPage } from './pages/Tutor'
import { WorkspacePage } from './pages/Workspace'
import { PapersPage } from './pages/Papers'

const NAV = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/explore', label: 'Explore Mathematics', icon: Compass },
  { path: '/paths', label: 'Learning Paths', icon: RouteIcon },
  { path: '/visual', label: 'Visual Mathematics', icon: Shapes },
  { path: '/labs', label: 'Mathematical Labs', icon: FlaskConical },
  { path: '/proof', label: 'Proof Studio', icon: FileCheck2 },
  { path: '/problems', label: 'Problem Bank', icon: Target },
  { path: '/library', label: 'Research Library', icon: LibraryIcon },
  { path: '/history', label: 'History of Mathematics', icon: History },
  { path: '/tutor', label: 'AI Mathematics Tutor', icon: Sparkles },
  { path: '/progress', label: 'My Progress', icon: ChartNoAxesCombined },
  { path: '/workspace', label: 'Personal Workspace', icon: NotebookPen },
]

const MORE = [
  { path: '/papers', label: 'Live Paper Archive', icon: FileText },
  { path: '/derivations', label: 'Derivation Library', icon: Sigma },
  { path: '/research', label: 'Research Frontiers', icon: Telescope },
  { path: '/graph', label: 'Knowledge Graph', icon: Network },
]

function Sidebar({ route, onSearch, mobile, close }: { route: string; onSearch: () => void; mobile: boolean; close: () => void }) {
  const p = useProgress()
  const pct = Math.round(p.completed.length / STATS.topics * 100)
  return (
    <aside className={`sidebar ${mobile ? 'mobile-open' : ''}`}>
      <div className="sidebar-brand" onClick={() => { go('/'); close() }} style={{ cursor: 'pointer' }}>
        <div className="brand-mark" />
        <div>
          <div className="brand-name">MATH<span>VERSE</span></div>
          <div className="brand-sub">The universe of mathematics</div>
        </div>
        {mobile && <button className="icon-btn" style={{ marginLeft: 'auto' }} onClick={close}><X size={16} /></button>}
      </div>
      <nav className="sidebar-nav">
        <button className="nav-item" onClick={() => { onSearch(); close() }}>
          <Search className="ico" size={16} /> <span>Search everything</span>
        </button>
        <div className="nav-label">Platform</div>
        {NAV.map(n => {
          const active = n.path === '/' ? route === '/' : route.startsWith(n.path)
          return (
            <button key={n.path} className={`nav-item ${active ? 'active' : ''}`} onClick={() => { go(n.path); close() }}>
              <n.icon className="ico" size={16} /> <span>{n.label}</span>
              {n.path === '/visual' && <span className="badge">{STATS.simulations}</span>}
            </button>
          )
        })}
        <div className="nav-label">Deepen</div>
        {MORE.map(n => (
          <button key={n.path} className={`nav-item ${route.startsWith(n.path) ? 'active' : ''}`} onClick={() => { go(n.path); close() }}>
            <n.icon className="ico" size={16} /> <span>{n.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-foot">
        <div className="progress-mini"><span>Your mastery</span><span>{pct}% · {p.completed.length} topics</span></div>
        <div className="progress-track"><div className="progress-fill" style={{ width: `${Math.max(1, pct)}%` }} /></div>
        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#6f7d93' }}>
          <span>🔥 {p.streak} day streak</span><span>{STATS.branches} branches</span>
        </div>
      </div>
    </aside>
  )
}

function RouteView({ route }: { route: string }) {
  const parts = route.split('/').filter(Boolean)
  const [area, id] = parts
  if (!area) return <HomePage />
  switch (area) {
    case 'explore': case 'branch': return id ? <BranchPage id={id} /> : <ExplorePage />
    case 'topic': return id ? <TopicPage id={id} /> : <ExplorePage />
    case 'paths': return <PathsPage />
    case 'visual': case 'simulation': return id ? <SimulationPage id={id} /> : <VisualPage />
    case 'labs': case 'lab': return id ? <LabPage id={id} /> : <LabsPage />
    case 'proof': return <ProofStudioPage />
    case 'derivations': case 'derivation': return id ? <DerivationPage id={id} /> : <DerivationsPage />
    case 'problems': case 'problem': return id ? <ProblemPage id={id} /> : <ProblemArena />
    case 'research': return id ? <FrontierPage id={id} /> : <ResearchPage />
    case 'history': return <HistoryPage focus={id} />
    case 'graph': return <GraphPage />
    case 'progress': return <ProgressPage />
    case 'library': return <LibraryPage />
    case 'papers': return <PapersPage />
    case 'tutor': return <TutorPage />
    case 'workspace': return <WorkspacePage />
    default: return <HomePage />
  }
}

export default function App() {
  const route = useRoute()
  const p = useProgress()
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', p.theme)
    document.documentElement.style.colorScheme = p.theme
  }, [p.theme])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSearchOpen(true) }
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => progress.tick(), 60000)
    return () => clearInterval(id)
  }, [])

  const crumb = route.split('/').filter(Boolean).map(s => s.replace(/-/g, ' ')).join(' / ') || 'Home'

  return (
    <div className="app">
      <Sidebar route={route} onSearch={() => setSearchOpen(true)} mobile={mobileNav} close={() => setMobileNav(false)} />
      {mobileNav && <div className="nav-scrim" onClick={() => setMobileNav(false)} />}
      <div className="main">
        <header className="topbar">
          <button className="icon-btn mobile-menu" onClick={() => setMobileNav(true)}><Menu size={18} /></button>
          <button className="search-trigger" onClick={() => setSearchOpen(true)}>
            <Search size={15} /> <span>Search any concept, equation, visualization…</span> <kbd>⌘ K</kbd>
          </button>
          <div className="topbar-spacer" />
          <div className="breadcrumb" style={{ margin: 0, maxWidth: 320, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {crumb.split(' / ').map((c, i, a) => <span key={i}>{i > 0 && <ChevronRight size={11} style={{ verticalAlign: -2, margin: '0 5px' }} />}{c}</span>)}
          </div>
          <button className="icon-btn" onClick={() => progress.setTheme(p.theme === 'dark' ? 'light' : 'dark')} title="Toggle light / dark theme">
            {p.theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className="avatar" title="Personal workspace" onClick={() => go('/workspace')}>MV</button>
        </header>
        <main className="page fade-up" key={route}><RouteView route={route} /></main>
      </div>
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
