import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import EventsPage from './pages/EventsPage'
import ProjectsPage from './pages/ProjectsPage'
import ProfilePage from './pages/ProfilePage'
import AboutPage from './pages/AboutPage'
import AdminPage from './pages/AdminPage'
import AuthModal from './components/AuthModal'
import OnboardingModal from './components/OnboardingModal'
import { useAuth } from './context/AuthContext'

/* ── Main site shell (all non-admin pages) ── */
function SiteShell() {
  const [currentPage, setCurrentPage] = useState('home')
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)

  const { user, loading } = useAuth()
  const isLoggedIn = !!user
  const uid             = user?.uid
  const profileComplete = user?.profileComplete

  useEffect(() => {
    if (loading) return
    if (!uid)    return
    const done = localStorage.getItem(`onboarded_${uid}`)
    if (done)   return
    if (profileComplete === false) setShowOnboarding(true)
  }, [uid, profileComplete, loading])

  const navigate = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openLogin  = () => setAuthModalOpen(true)
  const openSignup = () => setAuthModalOpen(true)

  const renderPage = () => {
    switch (currentPage) {
      case 'home':     return <HomePage     navigate={navigate} isLoggedIn={isLoggedIn} openSignup={openSignup} />
      case 'events':   return <EventsPage   navigate={navigate} />
      case 'projects': return <ProjectsPage isLoggedIn={isLoggedIn} openLogin={openLogin} />
      case 'profile':  return <ProfilePage  navigate={navigate} />
      case 'about':    return <AboutPage    navigate={navigate} openSignup={openSignup} />
      default:         return <HomePage     navigate={navigate} isLoggedIn={isLoggedIn} openSignup={openSignup} />
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F0E8' }}>
      <Navbar
        currentPage={currentPage}
        navigate={navigate}
        isLoggedIn={isLoggedIn}
        openLogin={openLogin}
        openSignup={openSignup}
      />
      <main>{renderPage()}</main>
      <Footer navigate={navigate} />

      {authModalOpen && (
        <AuthModal onClose={() => setAuthModalOpen(false)} />
      )}
      {showOnboarding && isLoggedIn && (
        <OnboardingModal onComplete={() => { setShowOnboarding(false); navigate('profile') }} />
      )}
    </div>
  )
}

/* ── Root App with routing ── */
export default function App() {
  return (
    <Routes>
      {/* Admin — completely separate, no Navbar/Footer */}
      <Route path="/admin" element={<AdminPage />} />

      {/* Everything else — the main site */}
      <Route path="*" element={<SiteShell />} />
    </Routes>
  )
}
