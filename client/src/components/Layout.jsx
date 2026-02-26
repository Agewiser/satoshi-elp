import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { WAButton, FomoTicker, ChatWidget } from './WAButton'

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