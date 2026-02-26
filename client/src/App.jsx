import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { usePageTracking } from './hooks/useTracking'
import Home       from './pages/Home'
import About      from './pages/About'
import Services   from './pages/Services'
import Assessment from './pages/Assessment'
import Admin      from './pages/Admin'

function AppRoutes() {
  // Fires on every route change: tracks page view to backend + FB pixel PageView
  usePageTracking()

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index          element={<Home />} />
        <Route path="about"   element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="assessment" element={<Assessment />} />
      </Route>
      {/* Admin has its own full-screen layout */}
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default function App() {
  return <AppRoutes />
}
