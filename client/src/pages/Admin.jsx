import { useState, useEffect } from 'react'

const s = {
  body:    { fontFamily: "'DM Sans', sans-serif", background: '#F1F5F9', minHeight: '100vh', color: '#0B1F3A' },
  login:   { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0B1F3A' },
  card:    { background: 'white', borderRadius: 16, padding: 40, width: 360, boxShadow: '0 20px 60px rgba(0,0,0,.3)' },
  inp:     { width: '100%', padding: '12px 14px', border: '2px solid #E2E8F0', borderRadius: 8, fontSize: '.9rem', fontFamily: 'inherit', marginBottom: 14, outline: 'none', display: 'block' },
  sidebar: { position: 'fixed', top: 0, left: 0, bottom: 0, width: 220, background: '#0B1F3A', padding: '24px 0', zIndex: 100 },
  main:    { marginLeft: 220, padding: 32 },
  stat:    { background: 'white', borderRadius: 12, padding: 22, border: '1px solid #E2E8F0' },
  tbl:     { width: '100%', borderCollapse: 'collapse', background: 'white' },
  th:      { padding: '11px 16px', textAlign: 'left', fontSize: '.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: '#94A3B8', background: '#F1F5F9', borderBottom: '1px solid #E2E8F0' },
  td:      { padding: '13px 16px', fontSize: '.88rem', borderBottom: '1px solid #E2E8F0' },
}

function authHeaders(token) {
  return { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
}

export default function Admin() {
  const [token, setToken]   = useState(() => sessionStorage.getItem('elp_admin_token'))
  const [view, setView]     = useState('analytics')
  const [analytics, setAnalytics] = useState(null)
  const [assessments, setAssessments] = useState([])
  const [totalPages, setTotalPages]   = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState(null)
  const [detail, setDetail] = useState(null)
  const [loginErr, setLoginErr] = useState('')
  const [creds, setCreds]   = useState({ username: '', password: '' })

  async function login() {
    const res  = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(creds) })
    const data = await res.json()
    if (data.token) {
      sessionStorage.setItem('elp_admin_token', data.token)
      setToken(data.token)
      setLoginErr('')
    } else {
      setLoginErr('Invalid credentials.')
    }
  }

  function logout() {
    sessionStorage.removeItem('elp_admin_token')
    setToken(null)
  }

  useEffect(() => {
    if (!token) return
    if (view === 'analytics' || view === 'pages') loadAnalytics()
    if (view === 'assessments') loadAssessments(currentPage, statusFilter)
  }, [token, view, currentPage, statusFilter])

  async function loadAnalytics() {
    const res  = await fetch('/api/admin/analytics', { headers: authHeaders(token) })
    setAnalytics(await res.json())
  }

  async function loadAssessments(page = 1, status = null) {
    let url = `/api/admin/assessments?page=${page}`
    if (status) url += `&status=${status}`
    const res  = await fetch(url, { headers: authHeaders(token) })
    const data = await res.json()
    setAssessments(data.assessments || [])
    setTotalPages(data.pages || 1)
  }

  async function updateStatus(id, status) {
    await fetch(`/api/admin/assessments/${id}/status`, {
      method: 'POST', headers: authHeaders(token), body: JSON.stringify({ status })
    })
    loadAssessments(currentPage, statusFilter)
  }

  async function openDetail(id) {
    const res = await fetch(`/api/admin/assessments/${id}`, { headers: authHeaders(token) })
    setDetail(await res.json())
  }

  function exportCSV() {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', '/api/admin/export')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.responseType = 'blob'
    xhr.onload = () => {
      const url = URL.createObjectURL(xhr.response)
      const a   = document.createElement('a'); a.href = url; a.download = 'elp_assessments.csv'; a.click()
      URL.revokeObjectURL(url)
    }
    xhr.send()
  }

  // ── Login screen ────────────────────────────────────────────
  if (!token) return (
    <div style={s.login}>
      <div style={s.card}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.2rem', fontWeight: 700, marginBottom: 4 }}>Elite Learning Programme</div>
        <div style={{ fontSize: '.82rem', color: '#94A3B8', marginBottom: 28 }}>Admin Dashboard · Satoshi Media</div>
        <input style={s.inp} placeholder="Username" value={creds.username}
          onChange={e => setCreds(c => ({ ...c, username: e.target.value }))} />
        <input style={s.inp} type="password" placeholder="Password" value={creds.password}
          onChange={e => setCreds(c => ({ ...c, password: e.target.value }))}
          onKeyDown={e => e.key === 'Enter' && login()} />
        <button onClick={login} style={{ width: '100%', padding: 13, background: '#0B1F3A', color: 'white', border: 'none', borderRadius: 8, fontSize: '.95rem', fontWeight: 600, cursor: 'pointer' }}>
          Sign In
        </button>
        {loginErr && <div style={{ color: '#EF4444', fontSize: '.82rem', marginTop: 8 }}>{loginErr}</div>}
      </div>
    </div>
  )

  const STATUSES = ['new','contacted','enrolled','declined']
  const STATUS_COLORS = { new: '#2563EB', contacted: '#C2410C', enrolled: '#065F46', declined: '#DC2626' }
  const STATUS_BG     = { new: '#EFF6FF', contacted: '#FFF7ED', enrolled: '#ECFDF5', declined: '#FEF2F2' }

  return (
    <div style={s.body}>
      {/* Sidebar */}
      <div style={s.sidebar}>
        <div style={{ padding: '0 20px 24px', fontWeight: 700, color: 'white', fontSize: '1rem', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
          ELP Admin<span style={{ color: '#F97316' }}>.</span>
          <div style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.4)', fontWeight: 400, marginTop: 2 }}>Satoshi Media</div>
        </div>
        <nav style={{ padding: '16px 0' }}>
          {[['analytics','📊  Analytics'],['assessments','📋  Assessments'],['pages','👁  Page Views']].map(([v, label]) => (
            <div key={v} onClick={() => setView(v)} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '11px 20px', cursor: 'pointer',
              color: view === v ? 'white' : 'rgba(255,255,255,.65)', fontSize: '.88rem', fontWeight: 500,
              background: view === v ? 'rgba(255,255,255,.06)' : 'none',
              borderLeft: view === v ? '3px solid #F97316' : '3px solid transparent',
              transition: '.15s',
            }}>{label}</div>
          ))}
        </nav>
        <div style={{ position: 'absolute', bottom: 24, left: 20, right: 20 }}>
          <button onClick={logout} style={{ width: '100%', padding: '9px 0', background: 'none', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, color: 'rgba(255,255,255,.6)', fontSize: '.82rem', cursor: 'pointer' }}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={s.main}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, textTransform: 'capitalize' }}>{view}</h1>
          <span style={{ fontSize: '.8rem', color: '#94A3B8' }}>Updated: {new Date().toLocaleTimeString()}</span>
        </div>

        {/* ── Analytics ── */}
        {view === 'analytics' && analytics && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, marginBottom: 32 }}>
              {[
                { label: 'Total Assessments', val: analytics.totalAssessments, color: '#0B1F3A' },
                { label: 'This Week',          val: analytics.weekAssessments,  color: '#2563EB' },
                { label: 'Enrolled',           val: analytics.enrolled,         color: '#10B981' },
                { label: 'WhatsApp Clicks',    val: analytics.waClicks,         color: '#F97316' },
              ].map(({ label, val, color }) => (
                <div key={label} style={s.stat}>
                  <div style={{ fontSize: '.75rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>{label}</div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color }}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E2E8F0', padding: 22 }}>
                <div style={{ fontWeight: 700, marginBottom: 20 }}>Pipeline</div>
                {[
                  { label: 'New',       val: analytics.newAssessments, color: '#2563EB' },
                  { label: 'Contacted', val: analytics.contacted,      color: '#F97316' },
                  { label: 'Enrolled',  val: analytics.enrolled,       color: '#10B981' },
                ].map(({ label, val, color }) => {
                  const max = Math.max(analytics.totalAssessments, 1)
                  return (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                      <div style={{ width: 80, fontSize: '.85rem', fontWeight: 500 }}>{label}</div>
                      <div style={{ flex: 1, height: 10, background: '#E2E8F0', borderRadius: 99, overflow: 'hidden' }}>
                        <div style={{ width: `${(val / max) * 100}%`, height: '100%', background: color, borderRadius: 99 }} />
                      </div>
                      <div style={{ width: 28, textAlign: 'right', fontSize: '.82rem', fontWeight: 700 }}>{val}</div>
                    </div>
                  )
                })}
              </div>
              <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', fontWeight: 700, borderBottom: '1px solid #E2E8F0' }}>Recent Submissions</div>
                <table style={s.tbl}>
                  <thead><tr><th style={s.th}>Child</th><th style={s.th}>Age</th><th style={s.th}>Status</th><th style={s.th}>Date</th></tr></thead>
                  <tbody>
                    {analytics.recentAssessments?.map(a => (
                      <tr key={a.child_name + a.created_at}>
                        <td style={s.td}><strong>{a.child_name}</strong></td>
                        <td style={s.td}>{a.age}</td>
                        <td style={s.td}><span style={{ background: STATUS_BG[a.status], color: STATUS_COLORS[a.status], padding: '3px 10px', borderRadius: 99, fontSize: '.72rem', fontWeight: 600 }}>{a.status}</span></td>
                        <td style={{ ...s.td, fontSize: '.78rem', color: '#94A3B8' }}>{new Date(a.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ── Assessments ── */}
        {view === 'assessments' && (
          <>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
              {[null, ...STATUSES].map(st => (
                <button key={st || 'all'} onClick={() => { setStatusFilter(st); setCurrentPage(1) }}
                  style={{ padding: '7px 14px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: '.82rem', cursor: 'pointer', fontFamily: 'inherit', background: statusFilter === st ? '#2563EB' : 'white', color: statusFilter === st ? 'white' : '#0B1F3A', fontWeight: statusFilter === st ? 600 : 400 }}>
                  {st || 'All'}
                </button>
              ))}
              <div style={{ flex: 1 }} />
              <button onClick={exportCSV} style={{ padding: '7px 16px', background: '#10B981', color: 'white', border: 'none', borderRadius: 8, fontSize: '.82rem', fontWeight: 600, cursor: 'pointer' }}>
                ⬇ Export CSV
              </button>
            </div>
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E2E8F0', overflow: 'hidden', marginBottom: 16 }}>
              <table style={s.tbl}>
                <thead>
                  <tr>{['Child','Age','Parent','WhatsApp','Struggles','Status','Date',''].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {assessments.map(a => (
                    <tr key={a.id} style={{ cursor: 'default' }}>
                      <td style={s.td}><strong>{a.child_name}</strong></td>
                      <td style={s.td}>{a.age}</td>
                      <td style={s.td}>{a.parent_name}</td>
                      <td style={s.td}><a href={`https://wa.me/${a.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" style={{ color: '#10B981', fontWeight: 600 }}>{a.whatsapp}</a></td>
                      <td style={{ ...s.td, maxWidth: 160, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '.82rem', color: '#555' }}>{a.struggles || '—'}</td>
                      <td style={s.td}>
                        <select value={a.status} onChange={e => updateStatus(a.id, e.target.value)}
                          style={{ padding: '4px 8px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: '.8rem', fontFamily: 'inherit', cursor: 'pointer' }}>
                          {STATUSES.map(st => <option key={st} value={st}>{st}</option>)}
                        </select>
                      </td>
                      <td style={{ ...s.td, fontSize: '.78rem', color: '#94A3B8' }}>{new Date(a.created_at).toLocaleDateString()}</td>
                      <td style={s.td}>
                        <button onClick={() => openDetail(a.id)} style={{ padding: '5px 12px', background: '#0B1F3A', color: 'white', border: 'none', borderRadius: 6, fontSize: '.78rem', cursor: 'pointer' }}>View</button>
                      </td>
                    </tr>
                  ))}
                  {assessments.length === 0 && <tr><td colSpan={8} style={{ ...s.td, textAlign: 'center', color: '#94A3B8', padding: 32 }}>No assessments found.</td></tr>}
                </tbody>
              </table>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setCurrentPage(i + 1)}
                  style={{ padding: '7px 14px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: '.82rem', cursor: 'pointer', background: currentPage === i + 1 ? '#2563EB' : 'white', color: currentPage === i + 1 ? 'white' : '#0B1F3A' }}>
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}

        {/* ── Page views ── */}
        {view === 'pages' && analytics && (
          <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E2E8F0', padding: 28 }}>
            <div style={{ fontWeight: 700, marginBottom: 20 }}>Page Views Breakdown</div>
            {analytics.pageViews?.map(p => {
              const max = Math.max(...analytics.pageViews.map(x => x.views), 1)
              return (
                <div key={p.page} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 120, fontSize: '.85rem', fontWeight: 500 }}>{p.page}</div>
                  <div style={{ flex: 1, height: 10, background: '#E2E8F0', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ width: `${(p.views / max) * 100}%`, height: '100%', background: 'linear-gradient(90deg,#2563EB,#60A5FA)', borderRadius: 99 }} />
                  </div>
                  <div style={{ width: 40, textAlign: 'right', fontSize: '.82rem', fontWeight: 700 }}>{p.views}</div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Detail panel */}
      {detail && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 200 }} onClick={() => setDetail(null)}>
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 480, background: 'white', padding: 28, overflowY: 'auto', boxShadow: '-4px 0 30px rgba(0,0,0,.15)' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setDetail(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#94A3B8' }}>✕</button>
            <h3 style={{ marginBottom: 4 }}>{detail.child_name}</h3>
            <p style={{ fontSize: '.82rem', color: '#94A3B8', marginBottom: 20 }}>Submitted by {detail.parent_name}</p>
            <a href={`https://wa.me/${(detail.whatsapp||'').replace(/\D/g,'')}`} target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', background: '#25D366', color: 'white', borderRadius: 8, fontSize: '.85rem', fontWeight: 600, marginBottom: 24 }}>
              💬 WhatsApp Parent
            </a>
            {Object.entries(detail).filter(([k]) => !['id','ip_address','user_agent'].includes(k)).map(([key, val]) => (
              <div key={key} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: '.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: '#94A3B8', marginBottom: 3 }}>{key.replace(/_/g,' ')}</div>
                <div style={{ fontSize: '.9rem' }}>{val || '—'}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
