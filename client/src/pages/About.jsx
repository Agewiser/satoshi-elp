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
          <div className="section-label" style={{ justifyContent: 'center', color: 'var(--orange)' }}>Who We Are</div>
          <h1 className="text-white">About <span className="text-orange">Elite Learning</span></h1>
          <p className="lead" style={{ color: 'rgba(255,255,255,.75)', maxWidth: 560, margin: '16px auto 0' }}>
            A {cfg.companyName} initiative built for parents who expect more than conventional tutoring.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 64 }}>
            <div>
              <div className="section-label">Why We Built This</div>
              <h2>The most thoughtful parents <span className="text-orange">deserve better.</span></h2>
              <p className="lead" style={{ color: 'var(--grey-700)', margin: '16px 0' }}>
                Nigeria has no shortage of lesson teachers. Every estate in Victoria Island, every close in Ikoyi, every street in Lekki Phase 1 has one. Parents pay. Teachers show up. Past questions get drilled. The teacher leaves.
              </p>
              <p style={{ color: 'var(--grey-700)', marginBottom: 16 }}>
                And the child remains exactly where they were — except now they've memorised answers they don't understand, to questions that may not even appear in the exam. We kept seeing the same story repeat itself: bright children, thoughtful parents, and lesson teachers who showed up with no structure, no accountability, and no real development plan.
              </p>
              <p style={{ color: 'var(--grey-700)', marginBottom: 16 }}>
                The lesson teacher model was built for a different era. It assumes a child's only problem is missing content. But the children struggling most today aren't struggling because they haven't seen enough past questions. They're struggling because nobody has taught them <em>how to think</em> — how to sit with difficulty, how to organise their thoughts, how to focus without prompting.
              </p>
              <p style={{ color: 'var(--grey-700)' }}>
                Elite Learning was built to fix that. We come to your home. We work 1-on-1. We track progress with data. And we hold ourselves accountable with a detailed report every single month.
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
            <p style={{ color: 'var(--grey-700)', maxWidth: 480, margin: '12px auto 0', fontSize: '.95rem' }}>
              Quality over quantity — every session is structured, purposeful and built around your child specifically.
            </p>
          </div>
          <div className="grid-4">
            {[['20','Sessions','Per child, per month'],['20','Hours','Of private instruction'],['5','Pillars','Core, Chess, Focus, Verbal, Reading'],['1','Report','Detailed, monthly, on WhatsApp']].map(([val, label, sub]) => (
              <div key={label} className="card card-pad text-center">
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 800, color: 'var(--orange)', lineHeight: 1, marginBottom: 8 }}>{val}</div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: '.82rem', color: 'var(--grey-700)' }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESEARCH SECTION ──────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-48">
            <div className="section-label" style={{ justifyContent: 'center' }}>The Research</div>
            <h2>Why 1-on-1 learning produces results <span className="text-orange">classrooms cannot.</span></h2>
            <p style={{ color: 'var(--grey-700)', maxWidth: 560, margin: '12px auto 0' }}>
              Every pillar of the Elite Learning Programme is built on a body of evidence that spans decades of educational research. Below are the findings that shaped how we teach.
            </p>
          </div>

          {/* Comparison table */}
          <div style={{ maxWidth: 780, margin: '0 auto 64px', overflow: 'hidden', borderRadius: 16, border: '1px solid var(--grey-200)', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: 'var(--grey-100)' }}>
              <div style={{ padding: '14px 20px' }} />
              <div style={{ padding: '14px 20px', textAlign: 'center', fontSize: '.8rem', fontWeight: 600, color: 'var(--grey-400)', textTransform: 'uppercase', borderLeft: '1px solid var(--grey-200)', fontFamily: 'var(--font-label)' }}>Average Classroom</div>
              <div style={{ padding: '14px 20px', textAlign: 'center', background: 'var(--navy)', fontSize: '.8rem', fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', fontFamily: 'var(--font-label)' }}>Elite Learning</div>
            </div>
            {ABOUT_COMPARISON.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px solid var(--grey-200)', background: i % 2 === 0 ? 'white' : 'var(--grey-100)' }}>
                <div style={{ padding: '13px 20px', fontSize: '.88rem', fontWeight: 600 }}>{row[0]}</div>
                <div style={{ padding: '13px 20px', textAlign: 'center', fontSize: '.88rem', color: 'var(--grey-400)', borderLeft: '1px solid var(--grey-200)' }}>{row[1]}</div>
                <div style={{ padding: '13px 20px', textAlign: 'center', fontSize: '.88rem', fontWeight: 600, color: '#10B981', background: 'rgba(16,185,129,.04)' }}>{row[2]}</div>
              </div>
            ))}
          </div>

          {/* Stat cards — 3 columns × 2 rows */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, maxWidth: 900, margin: '0 auto 48px' }}>
            {RESEARCH_STATS.map((s, i) => (
              <div key={i} className="card card-pad" style={{ borderTop: `4px solid ${s.color}` }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: 10 }}>{s.stat}</div>
                <p style={{ color: 'var(--grey-700)', fontSize: '.88rem', lineHeight: 1.6, marginBottom: 8 }}>{s.desc}</p>
                <div style={{ fontSize: '.75rem', color: 'var(--grey-400)', fontStyle: 'italic' }}>{s.source}</div>
              </div>
            ))}
          </div>

          {/* Dark callout */}
          <div style={{ background: 'var(--navy)', borderRadius: 20, padding: '40px 48px', maxWidth: 900, margin: '0 auto 48px' }}>
            <p style={{ color: 'white', fontSize: '1.1rem', lineHeight: 1.8, fontStyle: 'italic', marginBottom: 12 }}>
              "One-on-one and small-group in-person tutoring interventions are the strongest research-backed method for improving student outcomes."
            </p>
            <div style={{ color: 'var(--gold)', fontSize: '.85rem', fontWeight: 600 }}>— National Council on Teacher Quality (NCTQ), 2025</div>
          </div>

          {/* Four pillar cards — 2×2 grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, maxWidth: 900, margin: '0 auto' }}>
            {RESEARCH_PILLARS.map((p, i) => (
              <div key={i} className="card card-pad" style={{ borderLeft: `4px solid ${p.color}` }}>
                <div style={{ fontSize: '1.6rem', marginBottom: 12 }}>{p.icon}</div>
                <h4 style={{ marginBottom: 8 }}>{p.title}</h4>
                <p style={{ color: 'var(--grey-700)', fontSize: '.9rem', lineHeight: 1.65, marginBottom: 8 }}>{p.body}</p>
                <div style={{ fontSize: '.75rem', color: 'var(--grey-400)', fontStyle: 'italic' }}>{p.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHERE WE SERVE ─────────────────────────────────────── */}
      <section className="section bg-grey">
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

const ABOUT_COMPARISON = [
  ['Instructor attention per child', '1–2 min per hour',     '✓ Full 60 minutes'],
  ['Curriculum pace',                'Fixed for whole class', '✓ Set by your child'],
  ['Immediate feedback',             'Rarely possible',       '✓ Every question'],
  ['Weak spot identified',           'Months, if ever',       '✓ First session'],
  ['Chess, Focus & Verbal skills',   '✗ Almost never',        '✓ Every session'],
  ['Progress tracking',              'End-of-term report',    '✓ Monthly on WhatsApp'],
]

const RESEARCH_STATS = [
  { stat: '0.37 SD', color: 'var(--orange)', desc: 'Average improvement in learning outcomes across 96 tutoring experiments — one of the largest effect sizes in all of education research.', source: 'Nickow, Oreopoulos & Quan — NBER Working Paper 27476, 2020' },
  { stat: '2×',      color: 'var(--blue)',   desc: 'Children receiving 1-on-1 sessions were twice as likely to reach their reading target compared to standard classroom instruction.', source: 'National Student Support Accelerator, 2023' },
  { stat: '4×',      color: '#10B981',       desc: 'Third-graders not reading proficiently are four times less likely to graduate high school than their peers.', source: 'J-PAL / Abdul Latif Jameel Poverty Action Lab' },
  { stat: '0.38 SD', color: '#8B5CF6',       desc: 'Chess instruction improves Maths performance in primary school children. The effect grows with hours of practice.', source: 'Sala & Gobet — Meta-analysis of 24 studies, 2016' },
  { stat: '2–3 min', color: 'var(--gold)',   desc: 'A child\'s natural attention span per year of age. A 9-year-old has roughly 18–27 minutes of unassisted focus. It can be trained much higher.', source: 'Developmental research consensus — Waterford.org, Brain Balance' },
  { stat: '–27%',    color: 'var(--orange)', desc: 'Decline in children\'s attention during sustained tasks — the sharpest drop of any age group. Structured training reverses this.', source: 'Continuous Performance Task studies — Amra & Elma, 2025' },
]

const RESEARCH_PILLARS = [
  { icon: '📚', color: 'var(--orange)', title: 'The 1-on-1 Advantage', body: 'A 2020 NBER meta-analysis of 96 randomised experiments found tutoring produces a 0.37 standard deviation improvement in learning outcomes. Effects are strongest when sessions are frequent, in-person, and delivered by trained instructors.', source: 'Nickow, Oreopoulos & Quan — NBER Working Paper 27476 (2020)' },
  { icon: '♟️', color: 'var(--blue)',   title: 'Chess and Cognitive Development', body: 'A meta-analysis of 24 studies involving over 5,000 students found chess instruction improves Maths performance by 0.38 SD and overall cognitive ability by 0.34 SD. Effects increase with hours of instruction.', source: 'Sala & Gobet — Educational Research Review (2016)' },
  { icon: '🧠', color: '#10B981',       title: 'Attention Span Is Trainable', body: "Children's attention spans decline 27% during sustained tasks — the sharpest of any age group. Structured progressive training reliably extends the focus window over weeks, not months.", source: 'CPT studies via Amra & Elma (2025); Brain Balance / Waterford.org' },
  { icon: '🎯', color: 'var(--gold)',   title: 'Early Intervention Compounds', body: "J-PAL's review of 96 randomised evaluations found tutoring effects are strongest in the earliest grades. A child who falls behind at 8 faces compounding disadvantage that grows every year.", source: 'J-PAL North America; cited by US Dept. of Education (2022)' },
]

export default About


// ─────────────────────────────────────────────────────────────────────────────
// Services.jsx — in the same file for brevity, export separately below
// ─────────────────────────────────────────────────────────────────────────────
