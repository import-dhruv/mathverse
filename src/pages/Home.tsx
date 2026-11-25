import { useEffect, useRef } from 'react'
import { ArrowRight, Play, BookOpen, Sigma, Compass, Sparkles, Network, FlaskConical } from 'lucide-react'
import { BranchIcon } from '../components/BranchIcon'
import { BRANCHES, STATS, TIMELINE, FRONTIERS, LEARNING_PATHS, ALL_TOPICS, PROBLEMS, SIMULATIONS } from '../data'
import { go } from '../lib/router'
import { useProgress } from '../lib/store'
import { seeded } from '../components/sim/useCanvas'

function MathUniverse() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf = 0, w = 0, h = 0
    const stars = Array.from({ length: 240 }, (_, i) => ({
      x: seeded(i * 2), y: seeded(i * 2 + 1), r: .4 + seeded(i * 5) * 1.4,
      s: .2 + seeded(i * 7) * .8, p: seeded(i * 11) * Math.PI * 2,
    }))
    const resize = () => {
      const rect = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2)
      w = rect.width; h = rect.height
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize); ro.observe(canvas)
    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h)
      const t = now / 1000
      stars.forEach(s => {
        const a = .2 + .55 * (.5 + .5 * Math.sin(t * s.s + s.p))
        ctx.fillStyle = `rgba(190,215,255,${a})`
        ctx.beginPath(); ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2); ctx.fill()
      })
      // rotating Lissajous curves — a visual metaphor for interconnected mathematics
      for (let c = 0; c < 3; c++) {
        ctx.strokeStyle = ['rgba(110,168,255,.16)', 'rgba(185,140,255,.13)', 'rgba(79,209,165,.11)'][c]
        ctx.lineWidth = 1
        ctx.beginPath()
        for (let i = 0; i <= 260; i++) {
          const u = 2 * Math.PI * i / 260
          const x = w * .78 + Math.sin((2 + c) * u + t * .12) * w * .2
          const y = h * .5 + Math.sin((3 + c) * u + t * .09) * h * .34
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])
  return <canvas ref={ref} aria-hidden="true" />
}

export function HomePage() {
  const p = useProgress()
  const continueTopic = ALL_TOPICS.find(t => p.studying.includes(t.id)) ?? ALL_TOPICS.find(t => !p.completed.includes(t.id))
  const sim = SIMULATIONS[new Date().getDate() % SIMULATIONS.length]
  const spotlight = FRONTIERS[new Date().getDate() % FRONTIERS.length]
  const challenge = PROBLEMS[new Date().getDate() % Math.max(1, PROBLEMS.length)]

  return (
    <div>
      <div className="hero">
        <MathUniverse />
        <div className="hero-inner">
          <div className="eyebrow">The complete interactive universe of mathematics</div>
          <h1>Understand the <em>language</em><br />of the universe.<br />Then invent your own.</h1>
          <p>From arithmetic to research: intuition before abstraction, derivation before application, proof before acceptance. A living encyclopedia, laboratory, university and research environment for mathematics.</p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => go('/explore')}>Explore mathematics <ArrowRight size={15} /></button>
            <button className="btn" onClick={() => go('/visual')}><Play size={14} /> Open visual engine</button>
            <button className="btn" onClick={() => go('/paths')}><Compass size={14} /> Choose a path</button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><b>{STATS.branches}</b><span>Branches</span></div>
            <div className="hero-stat"><b>{STATS.topics}</b><span>Topics</span></div>
            <div className="hero-stat"><b>{STATS.deepTopics}</b><span>Deep articles</span></div>
            <div className="hero-stat"><b>{STATS.simulations}</b><span>Visualizations</span></div>
            <div className="hero-stat"><b>{STATS.problems.toLocaleString()}</b><span>Problems</span></div>
          </div>
        </div>
      </div>

      <div className="stat-strip">
        {[
          { icon: BookOpen, label: 'Long-form lessons', value: STATS.deepTopics, path: '/explore' },
          { icon: Sigma, label: 'Derivations', value: STATS.derivations, path: '/derivations' },
          { icon: FlaskConical, label: 'Laboratories', value: STATS.labs, path: '/labs' },
          { icon: Network, label: 'Connections mapped', value: STATS.topics, path: '/graph' },
        ].map(s => (
          <button className="card card-hover metric" key={s.label} onClick={() => go(s.path)} style={{ textAlign: 'left' }}>
            <s.icon size={16} color="#6ea8ff" />
            <div className="m-val">{s.value}</div>
            <div className="m-label">{s.label}</div>
          </button>
        ))}
      </div>

      <div className="section-head"><div><div className="eyebrow">The discipline</div><h2>Every branch of mathematics</h2></div><button className="btn btn-sm" onClick={() => go('/explore')}>View full map <ArrowRight size={13} /></button></div>
      <div className="grid g4">
        {BRANCHES.map(b => (
          <button className="card card-hover branch-tile" key={b.id} onClick={() => go(`/branch/${b.id}`)} style={{ textAlign: 'left' }}>
            <div className="bt-icon" style={{ background: `${b.color}18`, color: b.color }}><BranchIcon name={b.icon} /></div>
            <div className="bt-count">{b.topicIds.length}</div>
            <h3>{b.short}</h3><p>{b.description}</p>
          </button>
        ))}
      </div>

      <div className="feature-row" style={{ marginTop: 16 }}>
        <div className="card panel">
          <div className="panel-title"><h3>Continue learning</h3><button className="btn btn-sm" onClick={() => go('/progress')}>Dashboard</button></div>
          {continueTopic && (
            <div className="mini-item" onClick={() => go(`/topic/${continueTopic.id}`)} style={{ cursor: 'pointer' }}>
              <span className="mi-num">01</span>
              <div><div className="mi-title">{continueTopic.title}</div><div className="mi-sub">{continueTopic.summary.slice(0, 110)}…</div></div>
            </div>
          )}
          {LEARNING_PATHS.slice(0, 3).map((lp, i) => (
            <div className="mini-item" key={lp.id} onClick={() => go('/paths')} style={{ cursor: 'pointer' }}>
              <span className="mi-num">0{i + 2}</span>
              <div><div className="mi-title">{lp.title}</div><div className="mi-sub">{lp.topicIds.length} topics · ~{lp.hours} hours</div></div>
            </div>
          ))}
        </div>
        <div className="card panel">
          <div className="panel-title"><h3>Visual experiment of the day</h3><span className="chip"><span className="chip-dot" style={{ background: '#4fd1a5' }} />live</span></div>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{sim.title}</div>
          <p className="subtle" style={{ lineHeight: 1.6 }}>{sim.description}</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-sm" onClick={() => go(`/simulation/${sim.id}`)}>Launch <ArrowRight size={13} /></button>
            {sim.equations[0] && <span className="chip">{sim.equations[0].slice(0, 46)}…</span>}
          </div>
        </div>
      </div>

      <div className="feature-row" style={{ marginTop: 16 }}>
        <div className="card panel">
          <div className="panel-title"><h3>Daily mathematical challenge</h3><button className="btn btn-sm" onClick={() => go('/problems')}>Problem bank</button></div>
          {challenge ? (
            <>
              <span className="chip">{challenge.type} · {challenge.level}</span>
              <h3 style={{ fontSize: 15, margin: '12px 0 6px' }}>{challenge.title}</h3>
              <p className="subtle" style={{ lineHeight: 1.7 }}>{challenge.statement.slice(0, 240)}{challenge.statement.length > 240 ? '…' : ''}</p>
              <button className="btn btn-sm" onClick={() => go(`/problem/${challenge.id}`)}>Solve it <ArrowRight size={12} /></button>
            </>
          ) : <p className="subtle">New challenges are being authored.</p>}
        </div>
        <div className="card panel">
          <div className="panel-title"><h3>Research frontier spotlight</h3><button className="btn btn-sm" onClick={() => go('/research')}>Explore all</button></div>
          <span className={`tag-status ${spotlight.status.toLowerCase().replace(/ /g, '-')}`}>{spotlight.status}</span>
          <h3 style={{ fontSize: 16, margin: '10px 0 6px' }}>{spotlight.title}</h3>
          <p className="subtle" style={{ lineHeight: 1.7 }}>{spotlight.summary}</p>
          <div style={{ marginTop: 10 }}>{spotlight.questions.slice(0, 2).map(q => <div className="mini-item" key={q}><span className="mi-num">?</span><div className="mi-sub">{q}</div></div>)}</div>
        </div>
      </div>

      <div className="feature-row" style={{ marginTop: 16 }}>
        <div className="card panel">
          <div className="panel-title"><h3>Discovery timeline</h3><button className="btn btn-sm" onClick={() => go('/history')}>Full history</button></div>
          <div className="timeline">
            {TIMELINE.slice(0, 5).map(e => (
              <div className="tl-event" key={e.id}>
                <div className="tl-year">{e.year}</div><div className="tl-title">{e.title}</div>
                <div className="tl-desc">{e.description.slice(0, 130)}…</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card panel">
          <div className="panel-title"><h3>The five dimensions of every lesson</h3><Sparkles size={15} color="#8b7cff" /></div>
          {[
            ['Intuitive understanding', 'What problem was this idea invented to solve?'],
            ['Visual & geometric', 'Manipulate objects and see consequences immediately.'],
            ['Formulation & derivation', 'Derive equations from definitions, not authority.'],
            ['Theory & proof', 'State hypotheses, reconstruct proofs, question gaps.'],
            ['Computation & application', 'Implement experiments and connect to the real world.'],
          ].map(([t, d], i) => <div className="mini-item" key={t}><span className="mi-num">0{i+1}</span><div><div className="mi-title">{t}</div><div className="mi-sub">{d}</div></div></div>)}
        </div>
      </div>
    </div>
  )
}
