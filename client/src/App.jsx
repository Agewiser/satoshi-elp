import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { usePageTracking } from './hooks/useTracking'
import Home             from './pages/Home'
import About            from './pages/About'
import Services         from './pages/Services'
import Assessment       from './pages/Assessment'
import Admin            from './pages/Admin'
import CoreAcademics    from './pages/subjects/CoreAcademics'
import ChessStrategy    from './pages/subjects/ChessStrategy'
import FocusCoaching    from './pages/subjects/FocusCoaching'
import VerbalConfidence from './pages/subjects/VerbalConfidence'

function AppRoutes() {
  usePageTracking()

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index                         element={<Home />} />
        <Route path="about"                  element={<About />} />
        <Route path="services"               element={<Services />} />
        <Route path="assessment"             element={<Assessment />} />
        <Route path="subjects/core-academics"    element={<CoreAcademics />} />
        <Route path="subjects/chess-strategy"    element={<ChessStrategy />} />
        <Route path="subjects/focus-coaching"    element={<FocusCoaching />} />
        <Route path="subjects/verbal-confidence" element={<VerbalConfidence />} />
      </Route>
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default function App() {
  return <AppRoutes />
}
