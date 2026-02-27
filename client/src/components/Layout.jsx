import { Outlet } from 'react-router-dom'
import Navbar     from './Navbar'
import Footer     from './Footer'
import { WAButton, ChatWidget, FomoTicker } from './WAButton'

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WAButton />
      <ChatWidget />
      <FomoTicker />
    </>
  )
}
