import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTrack } from '../hooks/useTracking'

const SECTIONS = ['A','B','C','D','E']
const SECTION_LABELS = ['About Child','Learning Style','Confidence','Concerns','Goals']

const SUBJECTS = [
  { key: 'maths_score',    label: 'Mathematics (numbers, fractions, problem solving)' },
  { key: 'english_score',  label: 'English Language (reading, writing, comprehension)' },
  { key: 'science_score',  label: 'Basic Science / Biology' },
  { key: 'social_score',   label: 'Social Studies / History' },
  { key: 'computer_score', label: 'Computer / ICT' },
  { key: 'verbal_score',   label: 'Verbal / Speaking Confidence' },
  { key: 'memory_score',   label: 'Memory & Ability to Retain Information' },
  { key: 'focus_score',    label: 'Focus — ability to sit and study without distraction' },
]

const RATINGS = ['1 – Very Weak','2 – Weak','3 – Average','4 – Good','5 – Strong']

// Use div-based radio to avoid any hidden input click issues
function RadioGroup({ name, options, value, onChange }) {
  return (
    <div className="radio-group">
      {options.map(opt => (
        <div
          key={opt}
          className={`radio-pill${value === opt ? ' selected' : ''}`}
          onClick={() => onChange(opt)}
          role="radio"
          aria-checked={value === opt}
          tabIndex={0}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onChange(opt)}
        >
          {opt}
        </div>
      ))}
    </div>
  )
}

function RatingRow({ num, label, name, value, onChange }) {
  return (
    <div style={{ background: 'var(--grey-100)', borderRadius: 10, padding: '14px 18px', marginBottom: 10, position: 'relative', zIndex: 1 }}>
      <div style={{ fontSize: '.88rem', fontWeight: 600, marginBottom: 10 }}><span style={{ color: 'var(--orange)', marginRight: 6 }}>{num}.</span>{label}</div>
      <div className="rating-group">
        {RATINGS.map(r => (
          <div key={r} className={`rating-pill${value === r ? ' selected' : ''}`}
            onClick={() => onChange(r)}
            style={{ cursor: 'pointer', pointerEvents: 'all', userSelect: 'none' }}>
            {r.split(' – ')[0]}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.72rem', color: 'var(--grey-400)', marginTop: 4 }}>
        <span>Very Weak</span><span>Average</span><span>Very Strong</span>
      </div>
    </div>
  )
}

export default function Assessment() {
  const track = useTrack()
  const [current, setCurrent] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    // Section A
    child_name: '', age: '', gender: '', class_year: '', school_name: '',
    parent_name: '', email: '', whatsapp: '',
    // Section B
    learning_style: '', reading_pref: '', handles_mistakes: '',
    new_challenges: '', homework_attention: '',
    // Section C — subject ratings
    maths_score: '', english_score: '', science_score: '', social_score: '',
    computer_score: '', verbal_score: '', memory_score: '', focus_score: '',
    // Section D
    struggles: '', specific_problem: '', prior_support: '',
    upcoming_exams: '', medical_notes: '',
    // Section E
    main_goal: '', result_timeline: '', involvement: '', child_notes: '',
  })

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  // ── Validation ─────────────────────────────────────────────
  function validate(sectionIndex) {
    const errs = {}
    if (sectionIndex === 0) {
      if (!form.child_name.trim()) errs.child_name = 'Required'
      if (!form.age.trim())        errs.age        = 'Required'
      if (!form.class_year.trim()) errs.class_year = 'Required'
      if (!form.parent_name.trim())errs.parent_name= 'Required'
      if (!form.whatsapp.trim())   errs.whatsapp   = 'Required — we send the profile here'
    }
    if (sectionIndex === 3) {
      if (!form.struggles.trim())  errs.struggles  = 'Required'
      if (!form.prior_support)     errs.prior_support = 'Please select one'
    }
    if (sectionIndex === 4) {
      if (!form.main_goal)         errs.main_goal       = 'Please select one'
      if (!form.result_timeline)   errs.result_timeline = 'Please select one'
      if (!form.involvement)       errs.involvement     = 'Please select one'
      if (!form.child_notes.trim())errs.child_notes     = 'Required'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function next() {
    if (!validate(current)) return
    setCurrent(c => Math.min(c + 1, 4))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  function back() {
    setCurrent(c => Math.max(c - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Allow Enter key to advance sections
  function handleKeyDown(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault()
      if (current < 4) next()
      else submit()
    }
  }

  async function submit() {
    if (!validate(4)) return
    setSubmitting(true)
    setServerError('')
    try {
      const res  = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, session_id: sessionStorage.getItem('elp_sid') || '' }),
      })
      const data = await res.json()
      if (data.success) {
        track('Lead', { source: 'assessment_form', child_age: form.age })
        setSubmitted(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        throw new Error('Submission failed')
      }
    } catch {
      setServerError('Something went wrong. Please try again or WhatsApp us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) return <SuccessState />

  return (
    <>
      <div className="page-hero">
        <div className="hero-grid" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{ justifyContent: 'center', color: 'var(--orange)' }}>Free · No Commitment</div>
          <h1 className="text-white" style={{ marginBottom: 12 }}>
            5-Minute Academic<br /><span className="text-orange">Strengths Assessment</span>
          </h1>
          <p className="lead" style={{ color: 'rgba(255,255,255,.75)', maxWidth: 520, margin: '0 auto' }}>
            Tell us about your child. We'll send a personalised learning profile to your WhatsApp within 24 hours.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container-sm" onKeyDown={handleKeyDown}>
          {/* Step indicator */}
          <div className="steps">
            {SECTIONS.map((s, i) => (
              <div key={s} className={`step${i === current ? ' active' : ''}${i < current ? ' done' : ''}`}>
                <div className="step-num">{i < current ? '✓' : s}</div>
                <div className="step-label">{SECTION_LABELS[i]}</div>
              </div>
            ))}
          </div>

          {/* ── Section A: About ─── */}
          {current === 0 && (
            <Section title="About Your Child" sub="Basic details so we can personalise the profile we send you.">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <Field label="1. Child's First Name" required error={errors.child_name}>
                  <input className={`form-input${errors.child_name ? ' error' : ''}`} placeholder="e.g. Emeka"
                    value={form.child_name} onChange={e => set('child_name', e.target.value)} />
                </Field>
                <Field label="2. Age" required error={errors.age}>
                  <input className={`form-input${errors.age ? ' error' : ''}`} placeholder="e.g. 9"
                    value={form.age} onChange={e => set('age', e.target.value)} />
                </Field>
                <Field label="3. Class / Year Group" required error={errors.class_year}>
                  <input className={`form-input${errors.class_year ? ' error' : ''}`} placeholder="e.g. Primary 4 / JSS 1"
                    value={form.class_year} onChange={e => set('class_year', e.target.value)} />
                </Field>
                <Field label="4. Gender">
                  <select className="form-select" value={form.gender} onChange={e => set('gender', e.target.value)}>
                    <option value="">Select…</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </Field>
                <Field label="5. School Name" sub="optional">
                  <input className="form-input" placeholder="e.g. Corona Schools"
                    value={form.school_name} onChange={e => set('school_name', e.target.value)} />
                </Field>
                <Field label="6. Parent / Guardian Name" required error={errors.parent_name}>
                  <input className={`form-input${errors.parent_name ? ' error' : ''}`} placeholder="Your full name"
                    value={form.parent_name} onChange={e => set('parent_name', e.target.value)} />
                </Field>
                <Field label="7. Email" sub="optional">
                  <input className="form-input" type="email" placeholder="your@email.com"
                    value={form.email} onChange={e => set('email', e.target.value)} />
                </Field>
              </div>
              <Field label="8. WhatsApp Number" required error={errors.whatsapp}
                hint="⚠ This is where we'll send your child's personalised profile — please double-check it">
                <input className={`form-input${errors.whatsapp ? ' error' : ''}`} placeholder="e.g. 08012345678"
                  value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} />
              </Field>
            </Section>
          )}

          {/* ── Section B: Learning style ─── */}
          {current === 1 && (
            <Section title="How Your Child Learns Best" sub="Select the option that best describes your child. Helps us identify their learning type.">
              {[
                { key: 'learning_style',     num: 1, label: 'When learning something new, your child tends to…', opts: ['Watch/see it first','Hear it explained','Try it with their hands'] },
                { key: 'reading_pref',        num: 2, label: 'How does your child prefer to read?',              opts: ['Reads alone quietly','Reads aloud','Prefers to be read to'] },
                { key: 'handles_mistakes',    num: 3, label: 'How does your child handle mistakes?',              opts: ['Gets frustrated quickly','Tries again calmly','Needs encouragement'] },
                { key: 'new_challenges',      num: 4, label: 'How does your child respond to new challenges?',   opts: ['Excited / curious','Cautious but willing','Avoids / resists'] },
                { key: 'homework_attention',  num: 5, label: 'Attention during homework at home:',               opts: ['Focused, finishes quickly','Gets distracted often','Needs supervision throughout'] },
              ].map(q => (
                <div key={q.key} className="form-group" style={{ position: 'relative', zIndex: 1 }}>
                  <label className="form-label"><span style={{ color: 'var(--orange)', marginRight: 6 }}>{q.num}.</span>{q.label}</label>
                  <RadioGroup name={q.key} options={q.opts} value={form[q.key]} onChange={v => set(q.key, v)} />
                </div>
              ))}
            </Section>
          )}

          {/* ── Section C: Subject confidence ─── */}
          {current === 2 && (
            <Section title="Subject Confidence Rating" sub="Rate your child's confidence in each area. 1 = Very Weak · 3 = Average · 5 = Very Strong.">
              {SUBJECTS.map((s, i) => (
                <RatingRow key={s.key} num={i + 1} label={s.label} name={s.key}
                  value={form[s.key]} onChange={v => set(s.key, v)} />
              ))}
            </Section>
          )}

          {/* ── Section D: Concerns ─── */}
          {current === 3 && (
            <Section title="Areas of Specific Concern" sub="Help us understand where your child needs the most support.">
              <Field label="1. What subject(s) does your child struggle with most?" required error={errors.struggles}>
                <input className={`form-input${errors.struggles ? ' error' : ''}`}
                  placeholder="e.g. Maths, Reading aloud, Spelling…"
                  value={form.struggles} onChange={e => set('struggles', e.target.value)}
                  style={{ position: 'relative', zIndex: 1 }} />
              </Field>
              <Field label="2. Describe the specific problem if you can:">
                <textarea className="form-textarea" placeholder="e.g. 'Can't do long division' / 'Loses interest after 10 minutes'…"
                  value={form.specific_problem} onChange={e => set('specific_problem', e.target.value)}
                  style={{ position: 'relative', zIndex: 1 }} />
              </Field>
              <div className="form-group" style={{ position: 'relative', zIndex: 1 }}>
                <label className="form-label">3. Has your child had extra support before? <span className="req">*</span></label>
                <RadioGroup name="prior_support" options={['No','Yes','Not sure']}
                  value={form.prior_support} onChange={v => set('prior_support', v)} />
                {errors.prior_support && <div style={{ color: '#DC2626', fontSize: '.82rem', marginTop: 4 }}>{errors.prior_support}</div>}
              </div>
              <Field label="4. Any upcoming exams we should know about?">
                <input className="form-input" placeholder="e.g. Common Entrance, terminal exams, WAEC prep…"
                  value={form.upcoming_exams} onChange={e => set('upcoming_exams', e.target.value)}
                  style={{ position: 'relative', zIndex: 1 }} />
              </Field>
              <Field label="5. Any medical or learning considerations?" sub="optional">
                <input className="form-input" placeholder="e.g. Dyslexia, ADHD, hearing/vision concerns"
                  value={form.medical_notes} onChange={e => set('medical_notes', e.target.value)}
                  style={{ position: 'relative', zIndex: 1 }} />
              </Field>
            </Section>
          )}

          {/* ── Section E: Goals ─── */}
          {current === 4 && (
            <Section title="Your Goals & Expectations" sub="The last section. This shapes the focus plan we build for your child.">
              {[
                { key: 'main_goal', num: 1, label: 'What is your main goal for your child?', opts: ['Improve exam grades','Build confidence','Develop focus & discipline','Prepare for secondary school','General enrichment'] },
                { key: 'result_timeline', num: 2, label: 'How quickly are you hoping to see results?', opts: ['Within 1 month','Within 3 months','I\'m thinking long-term'] },
                { key: 'involvement', num: 3, label: 'How involved would you like to be?', opts: ['Monthly WhatsApp reports are enough','I want weekly updates','I\'d like to observe sessions'] },
              ].map(q => (
                <div key={q.key} className="form-group" style={{ position: 'relative', zIndex: 1 }}>
                  <label className="form-label"><span style={{ color: 'var(--orange)', marginRight: 6 }}>{q.num}.</span>{q.label} <span className="req">*</span></label>
                  <RadioGroup name={q.key} options={q.opts} value={form[q.key]} onChange={v => set(q.key, v)} />
                  {errors[q.key] && <div style={{ color: '#DC2626', fontSize: '.82rem', marginTop: 4 }}>{errors[q.key]}</div>}
                </div>
              ))}
              <Field label="Is there anything else we should know about your child?" required error={errors.child_notes}>
                <textarea className={`form-textarea${errors.child_notes ? ' error' : ''}`}
                  placeholder="Personality, interests, what motivates them, anything that helps us build the best profile…"
                  value={form.child_notes} onChange={e => set('child_notes', e.target.value)} />
              </Field>

              <div style={{ background: 'var(--grey-100)', borderRadius: 12, padding: '14px 18px', marginBottom: 24, display: 'flex', gap: 10 }}>
                <span>🔒</span>
                <p style={{ fontSize: '.82rem', color: 'var(--grey-700)' }}>
                  Your information is completely private. We will only contact you on the WhatsApp number you provided. We never share your details with anyone.
                </p>
              </div>

              {serverError && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', padding: '14px 18px', borderRadius: 10, marginBottom: 16, fontSize: '.88rem' }}>
                  {serverError}
                </div>
              )}
            </Section>
          )}

          {/* Navigation buttons */}
          <div style={{ display: 'flex', justifyContent: current === 0 ? 'flex-end' : 'space-between', marginTop: 8, flexWrap: 'wrap', gap: 12 }}>
            {current > 0 && (
              <button className="btn btn-outline-navy" onClick={back}>← Back</button>
            )}
            {current < 4 ? (
              <button className="btn btn-primary" onClick={next}>
                Continue → {SECTION_LABELS[current + 1]}
              </button>
            ) : (
              <button className="btn btn-primary btn-lg" onClick={submit} disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit Assessment →'}
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

function Section({ title, sub, children }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <h3 style={{ marginBottom: 6 }}>{title}</h3>
      <p style={{ color: 'var(--grey-700)', marginBottom: 28 }}>{sub}</p>
      {children}
    </div>
  )
}

function Field({ label, required, sub, hint, error, children }) {
  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required && <span className="req"> *</span>}
        {sub && <span style={{ color: 'var(--grey-400)', fontWeight: 400 }}> ({sub})</span>}
      </label>
      {hint && <p style={{ fontSize: '.8rem', color: 'var(--grey-400)', marginBottom: 6 }}>{hint}</p>}
      {children}
      {error && <div style={{ color: '#DC2626', fontSize: '.82rem', marginTop: 4 }}>{error}</div>}
    </div>
  )
}

function SuccessState() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: 520 }}>
        <div style={{ width: 72, height: 72, background: 'var(--orange-pale)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 24px' }}>✅</div>
        <h2 style={{ marginBottom: 12 }}>Assessment Submitted!</h2>
        <p className="lead" style={{ color: 'var(--grey-700)', marginBottom: 32 }}>
          Thank you. We'll review your child's responses and send a personalised learning profile to your WhatsApp <strong>within 24 hours</strong>.
        </p>
        <div style={{ background: 'var(--grey-100)', borderRadius: 16, padding: 24, marginBottom: 32, textAlign: 'left' }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>What happens next:</div>
          {[
            'We review your child\'s full assessment',
            'We build a personalised Child Learning Profile',
            'You receive it on WhatsApp within 24 hours',
          ].map(s => (
            <div key={s} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: 'var(--orange)', flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: '.92rem', color: 'var(--grey-700)' }}>{s}</span>
            </div>
          ))}
        </div>
        <Link to="/" className="btn btn-outline-navy">← Back to Home</Link>
      </div>
    </div>
  )
}
