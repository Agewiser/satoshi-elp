import { Link } from 'react-router-dom'
import { useTrack } from '../../hooks/useTracking'

export default function VerbalConfidence() {
  const track = useTrack()
  return (
    <>
      <div className="page-hero">
        <div className="hero-grid" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{ justifyContent: 'center', color: 'var(--orange)' }}>The Five Pillars</div>
          <h1 className="text-white">Verbal <span className="text-orange">Confidence</span></h1>
          <p className="lead" style={{ color: 'rgba(255,255,255,.75)', maxWidth: 560, margin: '16px auto 0' }}>
            Knowing the answer and being able to express it are two completely different skills. We teach the second one.
          </p>
        </div>
      </div>

      {/* ── MAIN COPY ── */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 64 }}>
            <div>
              <div className="section-label">The Gap Nobody Talks About</div>
              <h2>Your child knows more than <span className="text-orange">they can say.</span></h2>
              <p className="lead" style={{ color: 'var(--grey-700)', margin: '16px 0' }}>
                The gap between what a child understands and what they can articulate is wider than most parents realise — and it costs them marks, presence and confidence every single day.
              </p>
              <p style={{ color: 'var(--grey-700)', marginBottom: 16 }}>
                In a classroom of thirty, the quiet child disappears. The teacher moves on. The child learns that their voice doesn't matter — not because it doesn't, but because they never developed the skill to use it. Verbal confidence is not a personality trait you're born with. It is a skill, and like every other skill, it can be taught.
              </p>
              <p style={{ color: 'var(--grey-700)', marginBottom: 16 }}>
                The 1-on-1 environment is essential here. In a group, a hesitant child hides. In a room with one instructor who is specifically listening, waiting and creating space — the child has no choice but to speak. And speaking, with patient guidance, becomes progressively easier.
              </p>
              <p style={{ color: 'var(--grey-700)' }}>
                Parents tell us they notice the change at the dinner table first. Their child starts offering opinions, completing sentences, holding a position when challenged. That's the real result.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {AGE_GROUPS.map(a => (
                <div key={a.age} className="card card-pad" style={{ borderLeft: '4px solid var(--orange)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <span style={{ background: 'var(--orange)', color: 'white', borderRadius: 8, padding: '4px 12px', fontSize: '.82rem', fontWeight: 700, fontFamily: 'var(--font-label)' }}>{a.age}</span>
                    <h4 style={{ margin: 0 }}>{a.title}</h4>
                  </div>
                  <p style={{ color: 'var(--grey-700)', fontSize: '.9rem', margin: 0 }}>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE BUILD ── */}
      <section className="section bg-grey">
        <div className="container">
          <div className="text-center mb-48">
            <div className="section-label" style={{ justifyContent: 'center' }}>What We Build</div>
            <h2>Specific skills. <span className="text-orange">Measurable progress.</span></h2>
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

      {/* ── WHAT THE EXERCISES LOOK LIKE ── */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div className="section-label">Inside a Session</div>
            <h2>What the exercises <span className="text-orange">actually look like.</span></h2>
            <p style={{ color: 'var(--grey-700)', margin: '16px 0 32px' }}>
              Every exercise is calibrated to the child's current level and personality. Nobody is pushed faster than they can go.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {EXERCISES.map((e, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 20, padding: '20px 24px', background: i % 2 === 0 ? 'var(--grey-100)' : 'white', borderRadius: 12, border: '1px solid var(--grey-200)', alignItems: 'start' }}>
                  <div>
                    <div style={{ color: 'var(--orange)', fontWeight: 700, fontSize: '.82rem', fontFamily: 'var(--font-label)', letterSpacing: '.08em', textTransform: 'uppercase' }}>{e.type}</div>
                    <div style={{ color: 'var(--grey-400)', fontSize: '.78rem', marginTop: 2 }}>{e.who}</div>
                  </div>
                  <p style={{ color: 'var(--grey-700)', margin: 0, fontSize: '.92rem' }}>{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section style={{ background: 'var(--navy)', padding: '64px 0' }}>
        <div className="container text-center">
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <div style={{ fontSize: '3rem', color: 'var(--orange)', lineHeight: 1, marginBottom: 16, fontFamily: 'var(--font-display)' }}>"</div>
            <p style={{ color: 'white', fontSize: '1.2rem', lineHeight: 1.8, fontStyle: 'italic', marginBottom: 24 }}>
              The children who speak clearly, who can hold an argument, who don't fold when questioned — they aren't naturally confident. They were given the space to practice, and they did.
            </p>
            <div style={{ color: 'var(--gold)', fontSize: '.88rem', fontWeight: 600 }}>Elite Learning Programme</div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--grey-100)', padding: '80px 0' }}>
        <div className="container text-center">
          <h2 style={{ marginBottom: 16 }}>Give your child a voice that matches their mind.</h2>
          <p className="lead" style={{ color: 'var(--grey-700)', maxWidth: 480, margin: '0 auto 36px' }}>
            Start with the free 5-minute assessment. We build a personalised plan and send it to your WhatsApp within 24 hours.
          </p>
          <Link to="/assessment" className="btn btn-primary btn-lg"
            onClick={() => track('Lead', { source: 'verbal_confidence_page' })}>
            Start Free Assessment →
          </Link>
          <p style={{ color: 'var(--grey-400)', fontSize: '.82rem', marginTop: 16 }}>No commitment · Results on WhatsApp</p>
        </div>
      </section>
    </>
  )
}

const AGE_GROUPS = [
  { age: 'Ages 5–8', title: 'Clarity and Structure', desc: 'At this age we work on complete responses — moving from single-word answers to full sentences, from "I don\'t know" to "I think it means…" Small shifts that build enormous confidence.' },
  { age: 'Ages 9–13', title: 'Articulation and Argument', desc: 'Older children learn to summarise passages aloud, argue a position with evidence, and deliver short prepared talks without reading from a page. These are the skills that matter in secondary school and beyond.' },
]

const SKILLS = [
  { icon: '🗣️', title: 'Clear Articulation', color: 'var(--orange)', desc: 'Speaking in complete, structured sentences. Not rushing. Not trailing off. Communicating the thought from start to finish.' },
  { icon: '🧩', title: 'Summarising', color: 'var(--blue)', desc: 'Taking a complex passage, idea or problem and explaining it simply. A child who can summarise has understood. A child who can\'t, hasn\'t.' },
  { icon: '⚖️', title: 'Holding a Position', color: '#10B981', desc: 'Being challenged and not collapsing. Children learn to defend a point calmly, update it when given good evidence, and disagree without shutting down.' },
  { icon: '👥', title: 'Eye Contact & Presence', color: 'var(--gold)', desc: 'Physical confidence — where to look, how to stand, what to do with your hands. The non-verbal communication that shapes how the world receives a child.' },
  { icon: '🎙️', title: 'Prepared Talks', color: '#8B5CF6', desc: 'Short structured presentations without reading from notes. Every child in the programme delivers at least one per month, filmed so they can watch themselves improve.' },
  { icon: '📖', title: 'Reading Aloud', color: 'var(--orange)', desc: 'Reading with expression, pace and comprehension simultaneously. A skill that transfers directly into English exams and oral assessments.' },
]

const EXERCISES = [
  { type: 'Retelling', who: 'Ages 5–9', desc: 'Child reads a short passage, closes the book, and retells what happened in their own words. We listen for structure, completeness and confidence — not perfection.' },
  { type: '2-Minute Talk', who: 'Ages 8–13', desc: 'Child is given a simple topic — "describe your favourite place" or "explain how photosynthesis works" — and speaks for two minutes without preparation. We coach on structure and flow.' },
  { type: 'Defend a Position', who: 'Ages 10–13', desc: 'Child takes a side on a simple argument and defends it while the instructor gently challenges. The goal is staying calm, thinking clearly and speaking clearly under mild pressure.' },
  { type: 'Chess Commentary', who: 'All ages', desc: 'While playing chess, the child narrates their thinking aloud: "I\'m moving here because…" This builds the habit of externalising thought — the foundation of all verbal confidence.' },
]
