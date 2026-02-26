import { useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import config from './useConfig'

// Session ID — persists for browser session
function getSessionId() {
  let sid = sessionStorage.getItem('elp_sid')
  if (!sid) {
    sid = 'sid_' + Math.random().toString(36).slice(2) + Date.now().toString(36)
    sessionStorage.setItem('elp_sid', sid)
  }
  return sid
}

// Fire FB pixel if configured
function pixel(event, data = {}) {
  if (config.fbPixelId && typeof window.fbq === 'function') {
    window.fbq('track', event, data)
  }
}

// Send event to our backend
async function backendEvent(event_type, event_data = {}) {
  try {
    await fetch('/api/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_type, event_data, session_id: getSessionId() }),
    })
  } catch { /* non-blocking */ }
}

// Combined track: fires pixel + backend simultaneously
export function track(event, data = {}) {
  pixel(event, data)
  backendEvent(event, data)
}

// Hook: auto-tracks page views on route change
export function usePageTracking() {
  const location = useLocation()

  useEffect(() => {
    // Inject FB pixel script once if pixelId is set and not already loaded
    if (config.fbPixelId && !window._elpPixelLoaded) {
      window._elpPixelLoaded = true
      // eslint-disable-next-line no-unused-expressions
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js')
      window.fbq('init', config.fbPixelId)
    }

    // Track page view
    pixel('PageView')
    try {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: location.pathname,
          session_id: getSessionId(),
          referrer: document.referrer,
        }),
      })
    } catch { /* non-blocking */ }
  }, [location.pathname])
}

// Hook: exposes track function to components
export function useTrack() {
  return useCallback(track, [])
}
