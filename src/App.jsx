import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import EventsPage from './pages/EventsPage'
import CommunityPage from './pages/CommunityPage'
import ProjectsPage from './pages/ProjectsPage'
import ProfilePage from './pages/ProfilePage'
import AboutPage from './pages/AboutPage'
import AuthModal from './components/AuthModal'
import TickerBar from './components/TickerBar'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')

  const navigate = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openLogin = () => {
    setAuthMode('login')
    setAuthModalOpen(true)
  }

  const openSignup = () => {
    setAuthMode('signup')
    setAuthModalOpen(true)
  }

  const handleAuth = () => {
    setIsLoggedIn(true)
    setAuthModalOpen(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    if (currentPage === 'profile') navigate('home')
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage navigate={navigate} isLoggedIn={isLoggedIn} openSignup={openSignup} />
      case 'events': return <EventsPage navigate={navigate} />
      case 'community': return <CommunityPage isLoggedIn={isLoggedIn} openLogin={openLogin} />
      case 'projects': return <ProjectsPage isLoggedIn={isLoggedIn} openLogin={openLogin} />
      case 'profile': return <ProfilePage navigate={navigate} />
      case 'about': return <AboutPage navigate={navigate} openSignup={openSignup} />
      default: return <HomePage navigate={navigate} isLoggedIn={isLoggedIn} openSignup={openSignup} />
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F0E8' }}>
      <TickerBar />
      <Navbar
        currentPage={currentPage}
        navigate={navigate}
        isLoggedIn={isLoggedIn}
        openLogin={openLogin}
        openSignup={openSignup}
        onLogout={handleLogout}
      />
      <main>
        {renderPage()}
      </main>
      <Footer navigate={navigate} />
      {authModalOpen && (
        <AuthModal
          mode={authMode}
          setMode={setAuthMode}
          onClose={() => setAuthModalOpen(false)}
          onAuth={handleAuth}
        />
      )}
    </div>
  )
}

export default App
