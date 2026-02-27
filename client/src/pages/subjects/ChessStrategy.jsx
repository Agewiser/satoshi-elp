import { Link } from 'react-router-dom'
import { useTrack } from '../../hooks/useTracking'

export default function ChessStrategy() {
  const track = useTrack()
  return (
    <>
      <div className="page-hero">
        <div className="hero-grid" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{ justifyContent: 'center', color: 'var(--orange)' }}>The Five Pillars</div>
          <h1 className="text-white">Chess <span className="text-orange">Strategy</span></h1>
          <p className="lead" style={{ color: 'rgba(255,255,255,.75)', maxWidth: 560, margin: '16px auto 0' }}>
            Not enrichment. Not a hobby. Chess is a thinking curriculum — and it transfers into every subject your child studies.
          </p>
        </div>
      </div>

      {/* ── MAIN COPY ── */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 64 }}>
            <div>
              <div className="section-label">Why Chess, Specifically</div>
              <h2>Chess teaches children <span className="text-orange">how to think.</span></h2>
              <p className="lead" style={{ color: 'var(--grey-700)', margin: '16px 0' }}>
                Not what to think. How to think — and that distinction changes everything.
              </p>
              <p style={{ color: 'var(--grey-700)', marginBottom: 16 }}>
                Every move in chess requires a child to ask: if I do this, what happens next? That habit — consequence awareness, planning ahead, evaluating options before acting — is exactly what separates strong Maths students from weak ones. It's what makes a child's essay structured rather than scattered. It's what keeps them calm in an exam rather than reactive.
              </p>
              <p style={{ color: 'var(--grey-700)', marginBottom: 16 }}>
                We chose chess over coding, debate or music for a specific reason: it has no language barrier, it produces results in weeks not months, and children find it intrinsically motivating. A child who would never voluntarily practice Maths will voluntarily replay a chess position until they understand why they lost.
              </p>
              <p style={{ color: 'var(--grey-700)' }}>
                That motivation is the engine. We use it deliberately — introducing chess problems that mirror the exact type of structured thinking required in their schoolwork.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {TRANSFERS.map(t => (
                <div key={t.title} className="card card-pad" style={{ borderLeft: '4px solid var(--blue)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{ fontSize: '1.3rem' }}>{t.icon}</span>
                    <h4 style={{ margin: 0 }}>{t.title}</h4>
                  </div>
                  <p style={{ color: 'var(--grey-700)', fontSize: '.9rem', margin: 0 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT CHILDREN DEVELOP ── */}
      <section className="section bg-grey">
        <div className="container">
          <div className="text-center mb-48">
            <div className="section-label" style={{ justifyContent: 'center' }}>What Develops</div>
            <h2>Six skills chess builds <span className="text-orange">that school doesn't teach.</span></h2>
          </div>
          <div className="grid-3">
            {SKILLS.map((s, i) => (
              <div key={i} className="card card-pad" style={{ borderTop: `4px solid ${s.color}` }}>
                <div style={{ fontSize: '1.6rem', marginBottom: 16 }}>{s.icon}</div>
                <h4 style={{ marginBottom: 8 }}>{s.title}</h4>
                <p style={{ color: 'var(--grey-700)', fontSize: '.9rem' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE TEACH IT ── */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div className="section-label">How We Teach It</div>
            <h2>Every child starts <span className="text-orange">from zero.</span></h2>
            <p style={{ color: 'var(--grey-700)', margin: '16px 0 32px' }}>
              No prior experience needed. We build from the absolute basics — piece movement, board awareness, basic tactics — and advance at the child's natural pace. By month two, most children are playing full games and beginning to think several moves ahead.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {PROGRESSION.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 20, padding: '18px 24px', background: 'var(--grey-100)', borderRadius: 12, alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--navy)', color: 'var(--orange)', borderRadius: 8, padding: '6px 14px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.88rem', flexShrink: 0 }}>{p.phase}</div>
                  <div>
                    <strong style={{ display: 'block', marginBottom: 4 }}>{p.title}</strong>
                    <p style={{ color: 'var(--grey-700)', margin: 0, fontSize: '.9rem' }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--navy)', padding: '80px 0' }}>
        <div className="container text-center">
          <h2 className="text-white" style={{ marginBottom: 16 }}>Chess is on every session's agenda.</h2>
          <p className="lead" style={{ color: 'rgba(255,255,255,.75)', maxWidth: 480, margin: '0 auto 36px' }}>
            Start with a free 5-minute assessment. We'll identify where your child is and build a plan from there.
          </p>
          <Link to="/assessment" className="btn btn-primary btn-lg"
            onClick={() => track('Lead', { source: 'chess_page' })}>
            Start Free Assessment →
          </Link>
          <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '.82rem', marginTop: 16 }}>No commitment · Results on WhatsApp</p>
        </div>
      </section>
    </>
  )
}

const TRANSFERS = [
  { icon: '🔢', title: 'Transfers into Maths', desc: 'Pattern recognition, sequential thinking and working through multi-step problems — chess trains all three. Children who play chess approach Maths problems differently.' },
  { icon: '📝', title: 'Transfers into Writing', desc: 'A chess player learns to plan before acting. This translates directly into essay structure — introduction, argument, conclusion — rather than writing reactively.' },
  { icon: '⏱', title: 'Transfers into Exams', desc: 'Timed chess games build comfort with working under pressure. Children learn to make decisions with incomplete information — exactly what exams require.' },
]

const SKILLS = [
  { icon: '🔭', title: 'Foresight', color: 'var(--orange)', desc: 'Thinking 2–3 moves ahead. This is the same skill required to plan an essay or anticipate consequences in a word problem.' },
  { icon: '😤', title: 'Frustration Tolerance', color: 'var(--blue)', desc: 'Chess involves losing — repeatedly. Children learn to recover, analyse what went wrong, and try again without giving up.' },
  { icon: '🎯', title: 'Focused Attention', color: '#10B981', desc: 'A chess game demands full attention. The focus span extends organically because the game itself punishes distraction.' },
  { icon: '⚖️', title: 'Decision Making', color: 'var(--gold)', desc: 'Every move is a decision under uncertainty. Children develop the confidence to commit to a choice and adapt when it doesn\'t work.' },
  { icon: '🏛️', title: 'Structured Thinking', color: '#8B5CF6', desc: 'Chess has rules, patterns and principles. Following structured logic in chess makes following structured logic in any subject feel natural.' },
  { icon: '💪', title: 'Self-Reliance', color: 'var(--orange)', desc: 'In chess, nobody helps you mid-game. Children discover they can figure things out independently — a confidence that carries into the classroom.' },
]

const PROGRESSION = [
  { phase: 'Week 1–2', title: 'Foundation', desc: 'Piece names, movements, board orientation. First complete games played with guidance.' },
  { phase: 'Week 3–4', title: 'Tactics', desc: 'Simple checkmates, basic captures, protecting pieces. Children begin thinking one move ahead.' },
  { phase: 'Month 2', title: 'Strategy', desc: 'Opening principles, centre control, piece coordination. Children start planning rather than reacting.' },
  { phase: 'Month 3+', title: 'Advancement', desc: 'Mid-game patterns, endgame basics, timed games. Strategic thinking becomes instinctive.' },
]
