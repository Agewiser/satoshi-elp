// ── WAButton.jsx / FomoTicker.jsx / ChatWidget.jsx ──────────────────────────
import { useState, useEffect, useRef } from 'react'
import { useConfig } from '../hooks/useConfig'
import { useTrack }  from '../hooks/useTracking'

export function WAButton() {
  const cfg   = useConfig()
  const track = useTrack()

  return (
    
    <a>
      href={cfg.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="wa-fab"
      title="Chat on WhatsApp"
      onClick={() => track('whatsapp_click', { source: 'fab' })}
   
      <div className="wa-pulse" />
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.555 4.118 1.529 5.845L.057 23.5l5.79-1.519A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.366l-.36-.213-3.714.975.992-3.617-.234-.372A9.818 9.818 0 1112 21.818z"/>
      </svg>
    </a>
  )
}

export function FomoTicker() {
  const [toasts, setToasts] = useState([])
  const dataRef  = useRef([])
  const indexRef = useRef(0)
  const TIMES    = ['just now','2 min ago','5 min ago','12 min ago','18 min ago','30 min ago']

  useEffect(() => {
    fetch('/api/ticker')
      .then(r => r.json())
      .then(data => {
        const d = [...data].sort(() => Math.random() - .5)
        dataRef.current = d
        setTimeout(showNext, 7000)
      })
      .catch(() => {})
  }, [])

  function showNext() {
    if (!dataRef.current.length) return
    const item = dataRef.current[indexRef.current % dataRef.current.length]
    indexRef.current++
    const id   = Date.now()
    const time = TIMES[Math.floor(Math.random() * TIMES.length)]
    setToasts(prev => [...prev, { id, message: item.message, time }])
    setTimeout(() => removeToast(id), 5500)
    setTimeout(showNext, 18000 + Math.random() * 22000)
  }

  function removeToast(id) {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div style={{ position: 'fixed', bottom: 90, left: 20, zIndex: 800, maxWidth: 320, pointerEvents: 'none' }}>
      {toasts.map(t => (
        <div key={t.id} className="fomo-toast">
          <div style={{ width: 32, height: 32, background: 'var(--orange-pale)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            📋
          </div>
          <div>
            <div style={{ fontSize: '.82rem', color: 'var(--grey-700)', lineHeight: 1.4 }}>
              <strong style={{ color: 'var(--navy)', display: 'block', fontSize: '.8rem' }}>New Activity</strong>
              {t.message}
            </div>
            <div style={{ fontSize: '.72rem', color: 'var(--grey-400)', marginTop: 2 }}>{t.time}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ChatWidget() {
  const cfg                          = useConfig()
  const track                        = useTrack()
  const [open, setOpen]              = useState(false)
  const [greeted, setGreeted]        = useState(false)
  const [messages, setMessages]      = useState([])
  const [input, setInput]            = useState('')
  const [loading, setLoading]        = useState(false)
  const historyRef                   = useRef([])
  const bottomRef                    = useRef(null)

  function toggle() {
    setOpen(o => {
      if (!o && !greeted) {
        setGreeted(true)
        setTimeout(() => addBot("Hi! I'm Ade 👋 I'm here to answer any questions about the Elite Learning Programme. What would you like to know?"), 400)
      }
      return !o
    })
  }

  function addBot(text) {
    const showWA = text.includes('[SHOW_WHATSAPP]')
    const clean  = text.replace('[SHOW_WHATSAPP]', '').trim()
    setMessages(prev => [...prev, { role: 'bot', text: clean, showWA }])
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text }])
    historyRef.current.push({ role: 'user', content: text })
    setLoading(true)
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)

    try {
      const res  = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyRef.current }),
      })
      const data = await res.json()
      const reply = data.reply || "Let me connect you with our team! [SHOW_WHATSAPP]"
      addBot(reply)
      historyRef.current.push({ role: 'assistant', content: reply })
    } catch {
      addBot("Oops, I'm having a moment! [SHOW_WHATSAPP]")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat-widget">
      <button className="chat-toggle" onClick={toggle} title="Ask Ade">
        {open ? '✕' : '💬'}
      </button>
      {open && (
        <div className="chat-box">
          <div className="chat-header">
            <div className="chat-avatar">A</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '.9rem' }}>Ade · ELP Assistant</div>
              <div style={{ fontSize: '.75rem', color: '#86EFAC' }}>● Online now</div>
            </div>
          </div>
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                {m.text}
                {m.showWA && (
                  <a href={cfg.whatsappUrl} target="_blank" rel="noreferrer" className="chat-wa-btn"
                    onClick={() => track('whatsapp_click', { source: 'chat' })}>
                    💬 Open WhatsApp
                  </a>
                )}
              </div>
            ))}
            {loading && (
              <div className="chat-msg bot" style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '12px 16px' }}>
                <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="chat-input-row">
            <input
              className="chat-input" value={input} placeholder="Ask me anything…"
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              disabled={loading}
            />
            <button className="chat-send" onClick={send} disabled={loading}>Send</button>
          </div>
        </div>
      )}
    </div>
    
  )
}

export default WAButton