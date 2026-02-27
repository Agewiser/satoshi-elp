import { Link } from 'react-router-dom'
import { useTrack } from '../../hooks/useTracking'

export default function FocusCoaching() {
  const track = useTrack()
  return (
    <>
      <div className="page-hero">
        <div className="hero-grid" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{ justifyContent: 'center', color: 'var(--orange)' }}>The Five Pillars</div>
          <h1 className="text-white">Focus <span className="text-orange">Coaching</span></h1>
          <p className="lead" style={{ color: 'rgba(255,255,255,.75)', maxWidth: 560, margin: '16px auto 0' }}>
            Attention span is not a personality trait. It is a trainable skill — and most children have never been trained.
          </p>
        </div>
      </div>

      {/* ── MAIN COPY ── */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 64 }}>
            <div>
              <div className="section-label">The Real Problem</div>
              <h2>Your child isn't <span className="text-orange">distracted. They're untrained.</span></h2>
              <p className="lead" style={{ color: 'var(--grey-700)', margin: '16px 0' }}>
                Most parents assume a child who can't sit and study for more than ten minutes has a focus problem. The more accurate diagnosis is that nobody has ever taught them how to focus.
              </p>
              <p style={{ color: 'var(--grey-700)', marginBottom: 16 }}>
                Focus is a muscle. Like any muscle, it develops through progressive resistance — short, structured bursts of concentrated effort followed by deliberate rest. Left untrained, most children default to the path of least resistance: distraction, avoidance, half-attention.
              </p>
              <p style={{ color: 'var(--grey-700)', marginBottom: 16 }}>
                The children we work with typically arrive with an effective focus window of 8–12 minutes. By month two, that window is consistently 30–40 minutes. By month three, 45 minutes of uninterrupted, productive work is normal.
              </p>
              <p style={{ color: 'var(--grey-700)' }}>
                The change doesn't just show up in sessions. Parents notice it at homework time. Teachers notice it in class. The child notices it — and begins to trust themselves in a way they didn't before.
              </p>
            </div>

            {/* Stats panel */}
            <div style={{ background: 'var(--navy)', borderRadius: 24, padding: 40, display: 'flex', flexDirection: 'column', gap: 28 }}>
              <div style={{ color: 'rgba(255,255,255,.6)', fontSize: '.82rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: 'var(--font-label)' }}>What the research shows</div>
              {STATS.map((s, i) => (
                <div key={i} style={{ borderBottom: i < STATS.length - 1 ? '1px solid rgba(255,255,255,.08)' : 'none', paddingBottom: i < STATS.length - 1 ? 24 : 0 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 800, color: 'var(--orange)', lineHeight: 1, marginBottom: 8 }}>{s.stat}</div>
                  <p style={{ color: 'rgba(255,255,255,.75)', fontSize: '.9rem', margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW WE TRAIN IT ── */}
      <section className="section bg-grey">
        <div className="container">
          <div className="text-center mb-48">
            <div className="section-label" style={{ justifyContent: 'center' }}>Our Method</div>
            <h2>How we build <span className="text-orange">attention span deliberately.</span></h2>
          </div>
          <div className="grid-3">
            {METHOD.map((m, i) => (
              <div key={i} className="card card-pad">
                <div style={{ width: 44, height: 44, background: '#ECFDF5', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', marginBottom: 16 }}>{m.icon}</div>
                <h4 style={{ marginBottom: 8 }}>{m.title}</h4>
                <p style={{ color: 'var(--grey-700)', fontSize: '.9rem' }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHESS CONNECTION ── */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 780, margin: '0 auto', background: 'var(--orange-pale)', border: '1px solid rgba(249,115,22,.2)', borderRadius: 24, padding: '48px 56px' }}>
            <div className="section-label">The Chess Connection</div>
            <h2 style={{ marginBottom: 20 }}>Chess is our <span className="text-orange">focus training tool.</span></h2>
            <p style={{ color: 'var(--grey-700)', marginBottom: 16, fontSize: '1.05rem', lineHeight: 1.75 }}>
              We don't use worksheets or timers to build focus. We use chess. A chess game demands complete attention — a distracted player loses pieces, misses threats, falls apart. The game itself is the discipline mechanism.
            </p>
            <p style={{ color: 'var(--grey-700)', fontSize: '1.05rem', lineHeight: 1.75 }}>
              Children who would resist a "focus exercise" will voluntarily concentrate for 30+ minutes on a chess position. By the time they realise they've been sitting still and thinking hard for half an hour, the habit is already forming.
            </p>
          </div>
        </div>
      </section>

      {/* ── PROGRESS ── */}
      <section className="section bg-grey">
        <div className="container">
          <div className="text-center mb-48">
            <div className="section-label" style={{ justifyContent: 'center' }}>Typical Progress</div>
            <h2>Focus spans we see <span className="text-orange">month by month.</span></h2>
          </div>
          <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {PROGRESS.map((p, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 12, padding: '18px 24px', border: '1px solid var(--grey-200)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <strong style={{ fontSize: '.92rem' }}>{p.label}</strong>
                  <span style={{ color: 'var(--orange)', fontWeight: 700, fontFamily: 'var(--font-display)' }}>{p.time}</span>
                </div>
                <div style={{ height: 10, background: 'var(--grey-200)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ width: p.pct, height: '100%', background: 'linear-gradient(90deg, var(--orange), var(--orange-hot))', borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--navy)', padding: '80px 0' }}>
        <div className="container text-center">
          <h2 className="text-white" style={{ marginBottom: 16 }}>A focused child is a confident child.</h2>
          <p className="lead" style={{ color: 'rgba(255,255,255,.75)', maxWidth: 480, margin: '0 auto 36px' }}>
            Start with the free assessment. We measure your child's current focus baseline and build from there.
          </p>
          <Link to="/assessment" className="btn btn-primary btn-lg"
            onClick={() => track('Lead', { source: 'focus_coaching_page' })}>
            Start Free Assessment →
          </Link>
          <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '.82rem', marginTop: 16 }}>No commitment · Results on WhatsApp</p>
        </div>
      </section>
    </>
  )
}

const STATS = [
  { stat: '8–12 min', desc: 'Average effective focus window of a child arriving at their first session with us.' },
  { stat: '30–40 min', desc: 'Typical focus window after 8 weeks of structured attention training.' },
  { stat: '3×', desc: 'Average improvement in homework completion time when focus span doubles.' },
]

const METHOD = [
  { icon: '⏱', title: 'Structured Bursts', desc: 'We start with focused work blocks matched to the child\'s current capacity — never longer. Gradually, the block extends as the muscle strengthens.' },
  { icon: '♟️', title: 'Chess as Training', desc: 'Chess demands sustained attention naturally. Children build focus through gameplay without experiencing it as an exercise.' },
  { icon: '📓', title: 'Focus Logs', desc: 'Every session ends with a brief self-assessment. Children learn to notice their own attention — a metacognitive skill that accelerates the development.' },
  { icon: '🏠', title: 'Home Carry-Over', desc: 'We give parents a simple homework routine built around the same structured burst method. The training continues between sessions.' },
  { icon: '📈', title: 'Progressive Load', desc: 'Like physical training, we increase the demand gradually. Rushing the process produces anxiety, not focus. Patience here is the strategy.' },
  { icon: '✅', title: 'Reward Calibration', desc: 'We work with each child to identify what motivates them and use it deliberately — making the reward of focused effort feel immediate and real.' },
]

const PROGRESS = [
  { label: 'On arrival (typical)', time: '8–12 min', pct: '20%' },
  { label: 'Month 1', time: '15–20 min', pct: '35%' },
  { label: 'Month 2', time: '30–40 min', pct: '65%' },
  { label: 'Month 3', time: '45+ min', pct: '85%' },
]
