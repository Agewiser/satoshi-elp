import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useConfig } from '../hooks/useConfig'
import { useTrack }  from '../hooks/useTracking'

export default function Services() {
  const cfg   = useConfig()
  const track = useTrack()
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <>
      <div className="page-hero">
        <div className="hero-grid" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{ justifyContent: 'center', color: 'var(--orange)' }}>Programme Details</div>
          <h1 className="text-white">Services <span className="text-orange">& Pricing</span></h1>
          <p className="lead" style={{ color: 'rgba(255,255,255,.75)', maxWidth: 520, margin: '12px auto 0' }}>
            Everything included in one transparent monthly investment. No hidden costs.
          </p>
        </div>
      </div>

      {/* ── PRICING CARD ─── */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <div style={{ background: 'var(--navy)', borderRadius: 24, overflow: 'hidden', boxShadow: 'var(--shadow-xl)' }}>
              {/* Price header */}
              <div style={{ background: 'linear-gradient(135deg,var(--orange),var(--orange-hot))', padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
                <div>
                  <div style={{ color: 'rgba(255,255,255,.8)', fontSize: '.82rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6 }}>Monthly Programme</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,3rem)', color: 'white', fontWeight: 800, lineHeight: 1 }}>₦500,000</div>
                  <div style={{ color: 'rgba(255,255,255,.8)', fontSize: '.9rem', marginTop: 4 }}>per child · per month</div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {[['20','sessions/month'],['2hrs','per session']].map(([v, l]) => (
                    <div key={l} style={{ background: 'rgba(255,255,255,.2)', borderRadius: 12, padding: '12px 20px', textAlign: 'center' }}>
                      <div style={{ color: 'white', fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>{v}</div>
                      <div style={{ color: 'rgba(255,255,255,.85)', fontSize: '.78rem' }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Included items */}
              <div style={{ padding: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {INCLUDED.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,.85)', fontSize: '.92rem' }}>
                    <span style={{ color: 'var(--orange)', fontSize: '1.1rem' }}>✓</span> {item}
                  </div>
                ))}
              </div>
              <div style={{ padding: '0 40px 40px', display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link to="/assessment" className="btn btn-primary btn-lg" style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => track('Lead', { source: 'services_pricing' })}>
                  Start Free Assessment →
                </Link>
                <a href={cfg.whatsappUrl} target="_blank" rel="noreferrer"
                  className="btn btn-outline-white btn-lg" style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => track('whatsapp_click', { source: 'services' })}>
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Value note */}
            <div style={{ background: 'var(--orange-pale)', border: '1px solid rgba(249,115,22,.2)', borderRadius: 16, padding: '24px 28px', marginTop: 20 }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>💡 Put it in perspective</div>
              <p style={{ color: 'var(--grey-700)', fontSize: '.92rem', lineHeight: 1.7 }}>
                ₦500,000 for 40 hours of private, expert education delivered to your home. That's ₦12,500 per hour — less than most Lagos driving lessons. You get chess strategy, focus coaching, verbal confidence training and a monthly progress report. This is a complete academic development investment, not a lesson teacher.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SESSION BREAKDOWN ─── */}
      <section className="section bg-grey">
        <div className="container">
          <div className="text-center mb-48">
            <div className="section-label" style={{ justifyContent: 'center' }}>Session Structure</div>
            <h2>What happens in a <span className="text-orange">typical month?</span></h2>
          </div>
          <div style={{ maxWidth: 860, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {SESSION_WEEKS.map((w, i) => (
              <div key={i} className="card card-pad" style={w.dark ? { background: 'var(--navy)' } : {}}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h4 style={w.dark ? { color: 'white' } : {}}>{w.title}</h4>
                  <span className={`badge badge-${w.badge}`}>{w.badgeText}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {w.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', gap: 10 }}>
                      <span style={{ color: w.accentColor, fontWeight: 700, flexShrink: 0 }}>{item.num}</span>
                      <div>
                        <strong style={{ fontSize: '.88rem', color: w.dark ? 'white' : 'var(--navy)' }}>{item.title}</strong>
                        <p style={{ fontSize: '.82rem', color: w.dark ? 'rgba(255,255,255,.6)' : 'var(--grey-700)' }}>{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ─── */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-48">
            <div className="section-label" style={{ justifyContent: 'center' }}>Why Elite Learning</div>
            <h2>Not just a <span className="text-orange">lesson teacher.</span></h2>
          </div>
          <div style={{ maxWidth: 780, margin: '0 auto', overflow: 'hidden', borderRadius: 16, border: '1px solid var(--grey-200)', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: 'var(--grey-100)' }}>
              <div style={{ padding: '14px 20px' }}></div>
              <div style={{ padding: '14px 20px', textAlign: 'center', fontSize: '.8rem', fontWeight: 600, color: 'var(--grey-400)', textTransform: 'uppercase', borderLeft: '1px solid var(--grey-200)' }}>Typical Lesson Teacher</div>
              <div style={{ padding: '14px 20px', textAlign: 'center', background: 'var(--navy)', fontSize: '.8rem', fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase' }}>Elite Learning</div>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px solid var(--grey-200)', background: i % 2 === 0 ? 'white' : 'var(--grey-100)' }}>
                <div style={{ padding: '13px 20px', fontSize: '.88rem', fontWeight: 600 }}>{row[0]}</div>
                <div style={{ padding: '13px 20px', textAlign: 'center', fontSize: '.88rem', color: 'var(--grey-400)', borderLeft: '1px solid var(--grey-200)' }}>{row[1]}</div>
                <div style={{ padding: '13px 20px', textAlign: 'center', fontSize: '.88rem', fontWeight: 600, color: '#10B981', background: 'rgba(16,185,129,.04)' }}>{row[2]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─── */}
      <section className="section bg-grey">
        <div className="container">
          <div className="text-center mb-48">
            <div className="section-label" style={{ justifyContent: 'center' }}>Questions</div>
            <h2>Frequently Asked <span className="text-orange">Questions</span></h2>
          </div>
          <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQS.map((f, i) => (
              <div key={i} style={{ background: 'white', border: '1px solid var(--grey-200)', borderRadius: 12, overflow: 'hidden' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', background: 'none', border: 'none', textAlign: 'left', fontWeight: 600, fontSize: '.95rem', color: 'var(--navy)', cursor: 'pointer' }}>
                  {f[0]}
                  <span style={{ fontSize: '1.2rem', color: 'var(--orange)', flexShrink: 0, marginLeft: 12 }}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 22px 18px', fontSize: '.9rem', color: 'var(--grey-700)', lineHeight: 1.7, borderTop: '1px solid var(--grey-200)' }}>
                    <div style={{ paddingTop: 14 }}>{f[1]}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─── */}
      <section style={{ background: 'var(--navy)', padding: '80px 0' }}>
        <div className="container text-center">
          <h2 className="text-white" style={{ marginBottom: 16 }}>Begin with a free assessment.</h2>
          <p className="lead" style={{ color: 'rgba(255,255,255,.75)', marginBottom: 36, maxWidth: 500, margin: '0 auto 36px' }}>
            No commitment. You receive your child's learning profile on WhatsApp within 24 hours.
          </p>
          <Link to="/assessment" className="btn btn-primary btn-lg"
            onClick={() => track('Lead', { source: 'services_cta_bottom' })}>
            Start Free Assessment →
          </Link>
          <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '.82rem', marginTop: 16 }}>Takes 5 minutes · Results on WhatsApp</p>
        </div>
      </section>
    </>
  )
}

const INCLUDED = [
  'Core subjects (your choice)',
  'Chess strategy every session',
  'Focus & discipline coaching',
  'Verbal confidence exercises',
  'Advanced reading programme',
  'Monthly WhatsApp progress report',
  'Dedicated personal tutor',
  'We come to your home',
  'Ages 5–13 (all classes)',
  'Exam prep integration',
]

const SESSION_WEEKS = [
  { title: 'Week 1', badge: 'orange', badgeText: 'Sessions 1–5', accentColor: 'var(--orange)', dark: false,
    items: [
      { num: '1.', title: 'Maths + Chess Opening Principles', sub: 'Diagnose gaps, introduce structured approach' },
      { num: '2.', title: 'English + Focus Training', sub: 'Reading comprehension + attention exercises' },
      { num: '3.', title: 'Science + Verbal Confidence', sub: 'Concept review + first verbal exercise' },
      { num: '4.', title: 'Maths Word Problems + Chess Tactics', sub: 'Strategy thinking applied to maths' },
      { num: '5.', title: 'English Writing + Focus Training', sub: 'Structure and paragraph building' },
    ]},
  { title: 'Week 2', badge: 'blue', badgeText: 'Sessions 6–10', accentColor: 'var(--blue)', dark: false,
    items: [
      { num: '6.',  title: 'Science Revision + Verbal Drills', sub: 'Mind-map techniques introduced' },
      { num: '7.',  title: 'Maths Review + Chess Endgame', sub: 'Consolidate week 1 + chess advancement' },
      { num: '8.',  title: 'Full Subject Review + Confidence', sub: 'Mid-month check across all subjects' },
      { num: '9.',  title: 'Advanced Reading + Focus Session', sub: 'Reading above grade level techniques' },
      { num: '10.', title: 'Verbal Presentation + Chess Game', sub: 'First timed chess game + 2-min talk' },
    ]},
  { title: 'Weeks 3–4', badge: 'green', badgeText: 'Sessions 11–20', accentColor: '#10B981', dark: false,
    items: [
      { num: '→', title: 'Deep-dive on weakest subject', sub: 'Intensive sessions on identified gap areas' },
      { num: '→', title: 'Chess advancement', sub: 'Mid-game strategy and pattern recognition' },
      { num: '→', title: 'Focus target: 35–45 minute sessions', sub: 'Extended concentration without prompting' },
      { num: '→', title: 'Monthly assessment + goal setting', sub: 'Score all subjects, set next month targets' },
      { num: '→', title: 'Progress report compiled', sub: 'Full report sent to parent on WhatsApp' },
    ]},
  { title: 'Inside a 2-Hour Session', badge: 'orange', badgeText: 'Every session', accentColor: 'var(--orange)', dark: true,
    items: [
      { num: '0–10', title: 'Warm-up + review of last session', sub: '' },
      { num: '10–60', title: 'Core subject deep-work block', sub: '' },
      { num: '60–70', title: 'Chess or verbal confidence break', sub: '' },
      { num: '70–110', title: 'Second subject or exam practice', sub: '' },
      { num: '110–120', title: 'Wrap-up, focus log, next session prep', sub: '' },
    ]},
]

const COMPARISON = [
  ['Personalised curriculum',   '✗ Generic',   '✓ Tailored to your child'],
  ['Chess on curriculum',       '✗ Never',     '✓ Every session'],
  ['Focus coaching',            '✗ No',        '✓ Structured programme'],
  ['Monthly progress report',   '✗ Rarely',    '✓ Always, on WhatsApp'],
  ['Verbal confidence training','✗ No',        '✓ Weekly exercises'],
  ['Home delivery',             'Sometimes',   '✓ Always'],
  ['Exam-linked strategy',      'Hit & miss',  '✓ Integrated always'],
]

const FAQS = [
  ['Do you serve my area?', 'We currently serve Victoria Island, Ikoyi, and Lekki Phase 1. If you\'re just outside these areas, reach out on WhatsApp — we may still be able to accommodate you.'],
  ['What age does my child need to be?', 'We work with children aged 5 to 13. Our approach adapts significantly between age groups — a 5-year-old session looks very different from a 13-year-old\'s.'],
  ['Why is the price ₦500,000?', 'This reflects the 1-on-1 nature, quality of tutors, comprehensive curriculum and home delivery. At ₦12,500 per hour for private education, it\'s competitively priced for what you receive.'],
  ['How do I know it\'s working?', 'Every month you receive a detailed progress report on WhatsApp showing subject scores, attendance, what improved, and what we\'re working on next. Measurable data within 30 days.'],
  ['Can sessions be rescheduled?', 'Yes. We understand family schedules are dynamic. Sessions can be rescheduled with at least 24 hours\' notice.'],
  ['What subjects do you cover?', 'All core subjects your child studies in school — Maths, English, Science, Social Studies and more — alongside our signature pillars: Chess, Focus Coaching, Verbal Confidence and Advanced Reading.'],
  ['Is there a contract?', 'No long-term contract. You enrol monthly and continue as long as you\'re seeing results and value.'],
]
