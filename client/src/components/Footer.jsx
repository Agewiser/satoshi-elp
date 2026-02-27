import { Link } from 'react-router-dom'
import { useConfig } from '../hooks/useConfig'
import { useTrack } from '../hooks/useTracking'

export default function Footer() {
  const cfg   = useConfig()
  const track = useTrack()

  return (
    <footer style={s.footer}>
      <div className="container">
        <div style={s.grid}>
          <div>
            <div style={s.logo}>{cfg.businessName}</div>
            <p style={s.tagline}>
              Premium 1-on-1 academic coaching for children aged 5–13 in {cfg.servingAreas}.
            </p>
            <p style={s.address}>
              A {cfg.companyName} initiative<br />{cfg.officeAddress}
            </p>
          </div>

          <div>
            <h5 style={s.colHead}>Programme</h5>
            <Link to="/"           style={s.link}>Home</Link>
            <Link to="/about"      style={s.link}>About Us</Link>
            <Link to="/services"   style={s.link}>Services & Pricing</Link>
            <Link to="/assessment" style={s.link}>Free Assessment</Link>
          </div>

          <div>
            <h5 style={s.colHead}>Subjects</h5>
            <Link to="/subjects/core-academics"    style={s.link}>Core Academics</Link>
            <Link to="/subjects/chess-strategy"    style={s.link}>Chess Strategy</Link>
            <Link to="/subjects/focus-coaching"    style={s.link}>Focus Coaching</Link>
            <Link to="/subjects/verbal-confidence" style={s.link}>Verbal Confidence</Link>
          </div>

          <div>
            <h5 style={s.colHead}>Contact</h5>
            <Link to="/assessment" style={s.link}>Get Assessment</Link>
            <a
              href={cfg.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              style={s.link}
              onClick={() => track('whatsapp_click', { source: 'footer' })}
            >
              WhatsApp Us
            </a>
            <Link to="/about" style={s.link}>About Us</Link>
          </div>
        </div>

        <div style={s.bottom}>
          <span>© {new Date().getFullYear()} {cfg.companyName} Ltd. All rights reserved.</span>
          <span style={{ color: 'var(--grey-400)' }}>Serving Lagos families since 2024</span>
        </div>
      </div>
    </footer>
  )
}

const s = {
  footer:  { background: 'var(--navy)', color: 'rgba(255,255,255,.75)', padding: '64px 0 32px' },
  grid:    { display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 },
  logo:    { fontFamily: 'var(--font-display)', fontWeight: 800, color: 'white', fontSize: '1.2rem', marginBottom: 8 },
  tagline: { fontSize: '.88rem', lineHeight: 1.6, marginBottom: 16 },
  address: { fontSize: '.82rem', color: 'var(--grey-400)' },
  colHead: { color: 'white', fontSize: '.85rem', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 16 },
  link:    { display: 'block', fontSize: '.88rem', marginBottom: 10, transition: 'color var(--transition)', color: 'rgba(255,255,255,.75)' },
  bottom:  { borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '.82rem', flexWrap: 'wrap', gap: 12 },
}
