import { Link } from 'react-router-dom'
import { useTrack } from '../../hooks/useTracking'

export default function CoreAcademics() {
  const track = useTrack()
  return (
    <>
      <div className="page-hero">
        <div className="hero-grid" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{ justifyContent: 'center', color: 'var(--orange)' }}>The Five Pillars</div>
          <h1 className="text-white">Core <span className="text-orange">Academics</span></h1>
          <p className="lead" style={{ color: 'rgba(255,255,255,.75)', maxWidth: 560, margin: '16px auto 0' }}>
            Targeted subject intervention — built around your child's specific gaps, not a generic syllabus.
          </p>
        </div>
      </div>

      {/* ── MAIN COPY ── */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 64 }}>
            <div>
              <div className="section-label">The Problem With Generic Tutoring</div>
              <h2>Most children don't have a <span className="text-orange">subject problem.</span></h2>
              <p className="lead" style={{ color: 'var(--grey-700)', margin: '16px 0' }}>
                They have a <em>specific</em> problem inside a subject — and nobody has ever found it.
              </p>
              <p style={{ color: 'var(--grey-700)', marginBottom: 16 }}>
                A child who scores 45% in Mathematics doesn't have a "Maths problem." They have a fractions problem, or a word problem problem, or they freeze under timed conditions. The difference matters enormously — because the fix is completely different in each case.
              </p>
              <p style={{ color: 'var(--grey-700)', marginBottom: 16 }}>
                Conventional tutoring covers everything broadly. Past questions get drilled. The same content gets repeated. And the child continues to struggle — because the root cause was never identified.
              </p>
              <p style={{ color: 'var(--grey-700)' }}>
                Our first session with every child is a structured diagnostic. We don't start teaching until we know exactly where the gap is. Then we go after it specifically, measure the improvement, and move forward.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {SUBJECTS_COVERED.map(s => (
                <div key={s.title} className="card card-pad" style={{ borderLeft: `4px solid ${s.color}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{ fontSize: '1.4rem' }}>{s.icon}</span>
                    <h4 style={{ margin: 0 }}>{s.title}</h4>
                  </div>
                  <p style={{ color: 'var(--grey-700)', fontSize: '.9rem', margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW WE APPROACH IT ── */}
      <section className="section bg-grey">
        <div className="container">
          <div className="text-center mb-48">
            <div className="section-label" style={{ justifyContent: 'center' }}>Our Approach</div>
            <h2>Diagnostics first. <span className="text-orange">Teaching second.</span></h2>
          </div>
          <div className="grid-3">
            {APPROACH.map((a, i) => (
              <div key={i} className="card card-pad">
                <div style={{ width: 44, height: 44, background: 'var(--orange-pale)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', marginBottom: 16 }}>{a.icon}</div>
                <h4 style={{ marginBottom: 8 }}>{a.title}</h4>
                <p style={{ color: 'var(--grey-700)', fontSize: '.9rem' }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT PARENTS SEE ── */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div className="section-label">What Parents Notice</div>
            <h2>The shift happens <span className="text-orange">faster than expected.</span></h2>
            <p style={{ color: 'var(--grey-700)', margin: '16px 0 32px' }}>
              When a child finally understands <em>why</em> something works — not just that it does — something changes. They stop dreading the subject. They start attempting questions they used to skip. They ask to practice.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {TIMELINE.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', padding: '20px 24px', background: i % 2 === 0 ? 'var(--grey-100)' : 'white', borderRadius: 12, border: '1px solid var(--grey-200)' }}>
                  <div style={{ background: 'var(--orange)', color: 'white', borderRadius: 8, padding: '6px 14px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.88rem', flexShrink: 0 }}>{t.when}</div>
                  <p style={{ color: 'var(--grey-700)', margin: 0, fontSize: '.92rem' }}>{t.what}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--navy)', padding: '80px 0' }}>
        <div className="container text-center">
          <h2 className="text-white" style={{ marginBottom: 16 }}>Find out exactly where your child needs support.</h2>
          <p className="lead" style={{ color: 'rgba(255,255,255,.75)', maxWidth: 480, margin: '0 auto 36px' }}>
            The free assessment takes 5 minutes. We send a personalised learning profile to your WhatsApp within 24 hours.
          </p>
          <Link to="/assessment" className="btn btn-primary btn-lg"
            onClick={() => track('Lead', { source: 'core_academics_page' })}>
            Start Free Assessment →
          </Link>
          <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '.82rem', marginTop: 16 }}>No commitment · Results on WhatsApp</p>
        </div>
      </section>
    </>
  )
}

const SUBJECTS_COVERED = [
  { icon: '🔢', title: 'Mathematics', color: 'var(--orange)', desc: 'Fractions, algebra, word problems, number patterns. We find the exact gap and close it with structured practice.' },
  { icon: '📝', title: 'English Language', color: 'var(--blue)', desc: 'Reading comprehension, essay structure, vocabulary and grammar — all in one integrated approach.' },
  { icon: '🔬', title: 'Basic Science', color: '#10B981', desc: 'Concept mastery, not memorisation. We use visual and practical techniques that make science stick.' },
  { icon: '🌍', title: 'Social Studies', color: 'var(--gold)', desc: 'Context, analysis and structured answers — the skills that score marks in assessments and exams.' },
]

const APPROACH = [
  { icon: '🔍', title: 'Session 1: Diagnostic', desc: 'We spend the first session identifying exactly where the child\'s understanding breaks down — not just which subject, but which concept within it.' },
  { icon: '🎯', title: 'Targeted Intervention', desc: 'Every session is built around the identified gap. We don\'t move on until the concept is genuinely understood, not just temporarily memorised.' },
  { icon: '📊', title: 'Monthly Measurement', desc: 'At the end of each month, we test the same concepts from the start of the month. The improvement is measurable and documented in your progress report.' },
]

const TIMELINE = [
  { when: 'Week 1–2', what: 'The diagnostic is complete. Your child knows exactly what they\'re working on and why. Confusion starts to reduce.' },
  { when: 'Week 3–4', what: 'The targeted concept begins to click. You notice them attempting homework with less resistance and fewer requests for help.' },
  { when: 'Month 2', what: 'Subject scores begin moving. The child develops a new relationship with the subject — less dread, more willingness.' },
  { when: 'Month 3+', what: 'Confidence compounds. Strong foundation in one area begins improving others — especially reading and Maths, which cross over constantly.' },
]
