import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useConfig } from '../hooks/useConfig'

export default function Navbar() {
  const cfg     = useConfig()
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navClass = `navbar${scrolled ? ' scrolled' : ''}`

  return (
    <>
      <nav className={navClass} style={styles.nav}>
        <div style={styles.inner}>
          {/* Logo */}
          <Link to="/" style={styles.logo}>
            <div style={styles.logoMark}>EL</div>
            <div style={styles.logoText}>
              <span style={styles.brand}>{cfg.businessName}</span>
              <span style={styles.sub}>by {cfg.companyName}</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div style={styles.links}>
            {NAV_LINKS.map(l => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'}
                style={({ isActive }) => ({ ...styles.link, ...(isActive ? styles.linkActive : {}) })}>
                {l.label}
              </NavLink>
            ))}
          </div>

          <Link to="/assessment" className="btn btn-sm"
            style={{ background: 'var(--orange)', color: 'white', border: 'none', display: window.innerWidth < 768 ? 'none' : 'inline-flex' }}>
            Free Assessment →
          </Link>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(o => !o)} style={styles.hamburger} aria-label="Menu">
            <span style={{ ...styles.bar, transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <span style={{ ...styles.bar, opacity: menuOpen ? 0 : 1 }} />
            <span style={{ ...styles.bar, transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {NAV_LINKS.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} style={styles.mobileLink}>
              {l.label}
            </Link>
          ))}
          <Link to="/assessment" className="btn btn-primary" onClick={() => setMenuOpen(false)} style={{ marginTop: 16 }}>
            Start Free Assessment →
          </Link>
        </div>
      )}
    </>
  )
}

const NAV_LINKS = [
  { to: '/',           label: 'Home' },
  { to: '/about',      label: 'About' },
  { to: '/services',   label: 'Services' },
  { to: '/assessment', label: 'Assessment' },
]

const styles = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
    background: 'rgba(11,31,58,.96)', backdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(255,255,255,.08)',
    transition: 'var(--transition)',
  },
  inner: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    height: 70, maxWidth: 1180, margin: '0 auto', padding: '0 24px',
  },
  logo:     { display: 'flex', alignItems: 'center', gap: 10 },
  logoMark: {
    width: 38, height: 38, background: 'var(--orange)', borderRadius: 8,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-display)', fontWeight: 800, color: 'white', fontSize: '1rem',
  },
  logoText: { display: 'flex', flexDirection: 'column', lineHeight: 1 },
  brand:    { fontFamily: 'var(--font-display)', fontWeight: 700, color: 'white', fontSize: '.95rem' },
  sub:      { fontSize: '.7rem', color: 'var(--grey-400)', fontWeight: 400, letterSpacing: '.05em', textTransform: 'uppercase' },
  links:    { display: 'flex', alignItems: 'center', gap: 32 },
  link:     { color: 'rgba(255,255,255,.75)', fontSize: '.9rem', fontWeight: 500, transition: 'color var(--transition)' },
  linkActive:{ color: 'white' },
  hamburger:{ display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', padding: 4 },
  bar:      { width: 24, height: 2, background: 'white', borderRadius: 2, display: 'block', transition: 'all .2s' },
  mobileMenu:{
    position: 'fixed', top: 70, left: 0, right: 0, bottom: 0,
    background: 'var(--navy)', zIndex: 899, padding: '32px 24px',
    display: 'flex', flexDirection: 'column', gap: 8,
  },
  mobileLink:{ color: 'white', fontSize: '1.2rem', fontWeight: 500, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,.08)' },
}
