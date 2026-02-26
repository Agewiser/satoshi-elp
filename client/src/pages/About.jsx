// About.jsx
import { Link } from 'react-router-dom'
import { useConfig } from '../hooks/useConfig'
import { useTrack }  from '../hooks/useTracking'

export function About() {
  const cfg   = useConfig()
  const track = useTrack()
  return (
    <>
      <div className="page-hero">
        <div className="hero-grid" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{ justifyContent: 'center', color: 'var(--orange)' }}>Our Story</div>
          <h1 className="text-white">About <span className="text-orange">Elite Learning</span></h1>
          <p className="lead" style={{ color: 'rgba(255,255,255,.75)', maxWidth: 560, margin: '16px auto 0' }}>
            A {cfg.companyName} initiative built for parents who expect more than the standard lesson teacher.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 64 }}>
            <div>
              <div className="section-label">Why We Built This</div>
              <h2>The best parents in Lagos <span className="text-orange">deserve better.</span></h2>
              <p className="lead" style={{ color: 'var(--grey-700)', margin: '16px 0' }}>
                We kept seeing the same story: bright children, successful parents in {cfg.servingAreas} — and lesson teachers who showed up, drilled past questions, and left. No structure. No progress reports. No real development.
              </p>
              <p style={{ color: 'var(--grey-700)', marginBottom: 16 }}>
                The Elite Learning Programme was designed to fix that. We built a curriculum that treats the whole child — not just their exam scores. Chess trains strategic thinking. Focus coaching extends attention spans. Verbal confidence turns quiet children into communicators.
              </p>
              <p style={{ color: 'var(--grey-700)' }}>
                We come to your home. We work 1-on-1. We track progress with data. And we hold ourselves accountable with a detailed report every single month.
              </p>
            </div>
            <div style={{ background: 'var(--grey-100)', borderRadius: 24, padding: 40, display: 'flex', flexDirection: 'column', gap: 28 }}>
              {WHY_ITEMS.map(item => (
                <div key={item.title} style={{ display: 'flex', gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: item.bg, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <h4 style={{ marginBottom: 6 }}>{item.title}</h4>
                    <p style={{ fontSize: '.9rem', color: 'var(--grey-700)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-grey">
        <div className="container">
          <div className="text-center mb-48">
            <div className="section-label" style={{ justifyContent: 'center' }}>By The Numbers</div>
            <h2>What we deliver <span className="text-orange">every month.</span></h2>
          </div>
          <div className="grid-4">
            {[['20','Sessions','Per child, per month'],['40','Hours','Of private instruction'],['5','Pillars','Core, Chess, Focus, Verbal, Reading'],['1','Report','Detailed, monthly, on WhatsApp']].map(([val, label, sub]) => (
              <div key={label} className="card card-pad text-center">
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 800, color: 'var(--orange)', lineHeight: 1, marginBottom: 8 }}>{val}</div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: '.82rem', color: 'var(--grey-700)' }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center mb-48">
            <div className="section-label" style={{ justifyContent: 'center' }}>Where We Serve</div>
            <h2>Currently accepting families in <span className="text-orange">three areas.</span></h2>
          </div>
          <div className="grid-3">
            {[
              { icon: '🏢', title: 'Victoria Island', color: 'var(--orange)', desc: 'Serving families across VI, from Ahmadu Bello Way to Adeola Odeku and surrounding estates.' },
              { icon: '🌳', title: 'Ikoyi',           color: 'var(--blue)',   desc: 'Serving families across Ikoyi, including Banana Island, Alexander Road and Osborne Estate.' },
              { icon: '🌊', title: 'Lekki Phase 1',   color: 'var(--gold)',   desc: `Our home base at ${cfg.officeAddress}. Serving families throughout Lekki Phase 1.` },
            ].map(a => (
              <div key={a.title} className="card card-pad text-center" style={{ borderTop: `4px solid ${a.color}` }}>
                <div style={{ fontSize: '2rem', marginBottom: 16 }}>{a.icon}</div>
                <h3 style={{ marginBottom: 8 }}>{a.title}</h3>
                <p style={{ fontSize: '.9rem', color: 'var(--grey-700)' }}>{a.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <p style={{ color: 'var(--grey-700)', marginBottom: 20 }}>Outside these areas? Reach out — we'll let you know if we can accommodate you.</p>
            <Link to="/assessment" className="btn btn-primary btn-lg" onClick={() => track('Lead', { source: 'about_cta' })}>
              Start Free Assessment →
            </Link>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--navy)', padding: '80px 0' }}>
        <div className="container text-center">
          <h2 className="text-white" style={{ marginBottom: 16 }}>Start with zero commitment.</h2>
          <p className="lead" style={{ color: 'rgba(255,255,255,.75)', marginBottom: 36, maxWidth: 500, margin: '0 auto 36px' }}>
            Fill the free 5-minute assessment. Receive your child's personalised learning profile on WhatsApp within 24 hours.
          </p>
          <Link to="/assessment" className="btn btn-primary btn-lg">Get Free Assessment →</Link>
        </div>
      </section>
    </>
  )
}

const WHY_ITEMS = [
  { icon: '🎯', bg: 'var(--orange-pale)', title: 'Outcomes-first philosophy', desc: 'We measure what matters: subject scores, focus span, confidence, and exam readiness. Every month you see the numbers.' },
  { icon: '♟️', bg: '#EFF6FF',            title: 'Chess is not optional',      desc: 'Chess builds foresight, patience and structured thinking. It is on every session\'s agenda because it transfers into every subject.' },
  { icon: '📊', bg: '#ECFDF5',            title: 'Data-driven progress',       desc: 'Monthly reports sent to parents on WhatsApp. Actual subject scores, attendance, and next-month targets — not vague reassurances.' },
  { icon: '🏠', bg: 'var(--orange-pale)', title: 'We come to you',             desc: 'Learning in a familiar environment reduces anxiety and increases retention. Your child performs better at home.' },
]

export default About


// ─────────────────────────────────────────────────────────────────────────────
// Services.jsx — in the same file for brevity, export separately below
// ─────────────────────────────────────────────────────────────────────────────
