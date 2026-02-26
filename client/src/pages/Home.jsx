import { Link } from 'react-router-dom'
import { useConfig } from '../hooks/useConfig'
import { useTrack }  from '../hooks/useTracking'

export default function Home() {
  const cfg   = useConfig()
  const track = useTrack()

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 700 }}>
            <div className="section-label" style={{ color: 'var(--orange)' }}>
              {cfg.servingAreas}
            </div>
            <h1 className="text-white" style={{ marginBottom: 20, lineHeight: 1.15 }}>
              Where Sharp Minds<br />
              <span className="text-orange">Are Built.</span>
            </h1>
            <p className="lead text-white" style={{ opacity: .85, marginBottom: 36, maxWidth: 560 }}>
              Premium 1-on-1 home tutoring for children aged 5–13. Core academics, chess strategy,
              focus coaching and verbal confidence — all in one structured programme.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/assessment" className="btn btn-primary btn-lg"
                onClick={() => track('ViewContent', { content: 'hero_cta' })}>
                Get Free Assessment →
              </Link>
              <Link to="/services" className="btn btn-outline-white btn-lg">
                View Programme →
              </Link>
            </div>
            <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
              {[['20','Sessions/month'],['2hrs','Per session'],['5','Learning pillars'],['1-on-1','Always private']].map(([val, label]) => (
                <div key={label} style={{ color: 'rgba(255,255,255,.7)', fontSize: '.88rem' }}>
                  <span style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, display: 'block' }}>{val}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────────── */}
      <div style={{ background: 'var(--orange)', padding: '18px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, flexWrap: 'wrap', color: 'white', fontSize: '.88rem', fontWeight: 600, letterSpacing: '.04em' }}>
            {['✓ We Come To Your Home','✓ Monthly Progress Reports','✓ Chess On The Curriculum','✓ Ages 5–13','✓ Results In 30 Days'].map(t => <span key={t}>{t}</span>)}
          </div>
        </div>
      </div>

      {/* ── 5 PILLARS ─────────────────────────────────────────── */}
      <section className="section bg-grey">
        <div className="container">
          <div className="text-center mb-48">
            <div className="section-label" style={{ justifyContent: 'center' }}>The Programme</div>
            <h2>Five Pillars of <span className="text-orange">Elite Learning</span></h2>
            <p className="lead" style={{ color: 'var(--grey-700)', maxWidth: 560, margin: '8px auto 0' }}>
              We don't just drill past questions. We build the whole child — academically, strategically and emotionally.
            </p>
          </div>
          <div className="grid-3">
            {PILLARS.map(p => (
              <div key={p.title} className="card card-pad" style={{ borderTop: `4px solid ${p.color}` }}>
                <div style={{ width: 48, height: 48, background: p.bg, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: 20 }}>{p.icon}</div>
                <h4 style={{ marginBottom: 8 }}>{p.title}</h4>
                <p style={{ color: 'var(--grey-700)', fontSize: '.92rem' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 64 }}>
            <div>
              <div className="section-label">How It Works</div>
              <h2>Simple to start.<br /><span className="text-orange">Powerful in practice.</span></h2>
              <p className="lead" style={{ color: 'var(--grey-700)', margin: '16px 0 32px' }}>
                We designed the entry process to be zero-pressure. Fill a 5-minute assessment,
                get your child's profile on WhatsApp, decide when you're ready.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {STEPS.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, background: step.color, color: 'white', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                    <div>
                      <h4 style={{ marginBottom: 4 }}>{step.title}</h4>
                      <p style={{ color: 'var(--grey-700)', fontSize: '.92rem' }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/assessment" className="btn btn-primary mt-32"
                onClick={() => track('ViewContent', { content: 'how_it_works' })}>
                Start Free Assessment →
              </Link>
            </div>

            {/* Sample report card */}
            <div>
              <div className="section-label">Sample Report</div>
              <SampleReportCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <section className="section bg-grey">
        <div className="container">
          <div className="text-center mb-48">
            <div className="section-label" style={{ justifyContent: 'center' }}>What Parents Say</div>
            <h2>Results that speak <span className="text-orange">for themselves.</span></h2>
          </div>
          <div className="grid-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card card-pad" style={i === 1 ? { border: '2px solid var(--orange)' } : {}}>
                <div style={{ fontSize: '1.5rem', marginBottom: 16 }}>⭐⭐⭐⭐⭐</div>
                <p style={{ color: 'var(--grey-700)', fontSize: '.92rem', lineHeight: 1.7, marginBottom: 20 }}>"{t.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: t.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{t.initial}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '.88rem' }}>{t.name}</div>
                    <div style={{ fontSize: '.78rem', color: 'var(--grey-400)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────── */}
      <section style={{ background: 'var(--navy)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 50%,rgba(249,115,22,.15) 0%,transparent 60%)' }} />
        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="text-white" style={{ marginBottom: 16 }}>Ready to invest in your child's future?</h2>
          <p className="lead" style={{ color: 'rgba(255,255,255,.75)', marginBottom: 36, maxWidth: 500, margin: '0 auto 36px' }}>
            The 5-minute assessment is free. Your child's personalised learning profile is delivered to your WhatsApp within 24 hours.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/assessment" className="btn btn-primary btn-lg"
              onClick={() => track('Lead', { source: 'homepage_bottom' })}>
              Start Free Assessment →
            </Link>
            <Link to="/services" className="btn btn-outline-white btn-lg">View Pricing</Link>
          </div>
          <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '.82rem', marginTop: 20 }}>
            No commitment · Results on WhatsApp · Serving {cfg.servingAreas}
          </p>
        </div>
      </section>
    </>
  )
}

function SampleReportCard() {
  const track = useTrack()
  const bars  = [
    { label: 'Mathematics', pct: 68, color: 'var(--blue)',   score: '68%' },
    { label: 'English',     pct: 72, color: 'var(--blue)',   score: '72%' },
    { label: 'Chess',       pct: 55, color: 'var(--orange)', score: '55%' },
    { label: 'Focus',       pct: 65, color: 'var(--green)',  score: '65%' },
    { label: 'Verbal',      pct: 58, color: '#8B5CF6',       score: '58%' },
  ]
  return (
    <div className="card">
      <div style={{ background: 'var(--navy)', padding: '20px 24px' }}>
        <div style={{ fontFamily: 'var(--font-display)', color: 'white', fontWeight: 700 }}>Monthly Progress Report</div>
        <div style={{ color: 'var(--gold)', fontSize: '.78rem', marginTop: 2 }}>Elite Learning Programme · January 2025</div>
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ fontSize: '.82rem', fontWeight: 700, color: 'var(--grey-400)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 14 }}>Subject Performance</div>
        {bars.map(b => (
          <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: '.88rem', fontWeight: 600, width: 100, flexShrink: 0 }}>{b.label}</span>
            <div style={{ flex: 1, height: 10, background: 'var(--grey-200)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ width: `${b.pct}%`, height: '100%', background: `linear-gradient(90deg,${b.color},${b.color}99)`, borderRadius: 99 }} />
            </div>
            <span style={{ fontSize: '.82rem', fontWeight: 700, color: b.color, width: 36, textAlign: 'right' }}>{b.score}</span>
          </div>
        ))}
        <div style={{ background: 'var(--grey-100)', borderRadius: 10, padding: 14, marginTop: 16, fontSize: '.82rem', color: 'var(--grey-700)', fontStyle: 'italic' }}>
          "Emeka has had a strong first month. His chess interest has been a pleasant surprise — we are using it to build his strategic thinking in Maths…"
        </div>
        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '.78rem', color: 'var(--grey-400)' }}>8/10 sessions attended</span>
          <Link to="/assessment" className="btn btn-primary btn-sm"
            onClick={() => track('report_download', { type: 'sample' })}>
            Get Sample Report →
          </Link>
        </div>
      </div>
    </div>
  )
}

const PILLARS = [
  { icon: '📚', title: 'Core Academics',      color: 'var(--orange)', bg: 'var(--orange-pale)', desc: 'Targeted intervention in Maths, English, Science. We identify root gaps, not just surface errors.' },
  { icon: '♟️', title: 'Chess Strategy',       color: 'var(--blue)',   bg: '#EFF6FF',            desc: 'Chess teaches foresight and structured thinking. These skills transfer into Maths and all subjects.' },
  { icon: '🧠', title: 'Focus & Discipline',   color: '#10B981',       bg: '#ECFDF5',            desc: 'Attention-building exercises that extend your child\'s focus from 10 minutes to 45+ over the programme.' },
  { icon: '🎤', title: 'Verbal Confidence',    color: '#8B5CF6',       bg: '#F5F3FF',            desc: 'From hesitant answers to confident presentations, through weekly articulation and speaking exercises.' },
  { icon: '📖', title: 'Advanced Reading',     color: 'var(--gold)',   bg: '#FFFBEB',            desc: 'We target above-grade-level reading comprehension. Better readers consistently outperform in every subject.' },
  { icon: '📊', title: 'Monthly Report',       color: 'var(--orange)', bg: 'rgba(249,115,22,.12)', desc: 'Detailed WhatsApp progress report every month — subject scores, attendance, goals and next steps.', dark: true },
]

const STEPS = [
  { color: 'var(--orange)', title: 'Fill the 5-Minute Assessment', desc: 'Tell us about your child\'s learning style and goals. No commitment required.' },
  { color: 'var(--blue)',   title: 'Receive Your Child\'s Learning Profile', desc: 'Within 24 hours, we send a personalised profile on WhatsApp — learning type and priority subjects.' },
  { color: '#10B981',       title: 'Decide When You\'re Ready', desc: 'Review the profile. If you\'d like to begin, reach out on WhatsApp. No pressure, no home visit required.' },
]

const TESTIMONIALS = [
  { quote: 'My daughter went from dreading Maths to asking to practice chess on weekends. The monthly report keeps me fully informed.', name: 'Adaeze O.', role: 'Mother of 9-yr-old · Victoria Island', initial: 'A', color: 'var(--navy)' },
  { quote: 'Worth every naira. My son\'s Common Entrance scores improved significantly in 3 months. The focus training alone changed how he does homework.', name: 'Tunde A.', role: 'Father of 12-yr-old · Ikoyi', initial: 'T', color: 'var(--orange)' },
  { quote: 'Two months in, my twins are completely different learners. The verbal confidence exercises are remarkable.', name: 'Chioma E.', role: 'Mother of 7-yr-old twins · Lekki Ph. 1', initial: 'C', color: 'var(--blue)' },
]
