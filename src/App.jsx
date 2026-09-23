import { useState, useEffect } from 'react'
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

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [showOnboarding, setShowOnboarding] = useState(false)

  const { user, loading } = useAuth()
  const isLoggedIn = !!user

  // Stable values to avoid the "array size changed" warning
  const uid              = user?.uid
  const profileComplete  = user?.profileComplete

  useEffect(() => {
    if (loading) return
    if (!uid)    return

    const alreadyOnboarded = localStorage.getItem(`onboarded_${uid}`)
    if (alreadyOnboarded) return

    if (profileComplete === false) {
      setShowOnboarding(true)
    }
  }, [uid, profileComplete, loading])

  const navigate = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openLogin = () => { setAuthMode('login'); setAuthModalOpen(true) }
  const openSignup = () => { setAuthMode('signup'); setAuthModalOpen(true) }

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    navigate('profile')
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':     return <HomePage navigate={navigate} isLoggedIn={isLoggedIn} openSignup={openSignup} />
      case 'events':   return <EventsPage navigate={navigate} />
      case 'projects': return <ProjectsPage isLoggedIn={isLoggedIn} openLogin={openLogin} />
      case 'profile':  return <ProfilePage navigate={navigate} />
      case 'about':    return <AboutPage navigate={navigate} openSignup={openSignup} />
      case 'admin':    return <AdminPage navigate={navigate} />
      default:         return <HomePage navigate={navigate} isLoggedIn={isLoggedIn} openSignup={openSignup} />
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

      {/* Auth modal */}
      {authModalOpen && (
        <AuthModal
          mode={authMode}
          setMode={setAuthMode}
          onClose={() => setAuthModalOpen(false)}
        />
      )}

      {/* Onboarding — only on first login */}
      {showOnboarding && isLoggedIn && (
        <OnboardingModal onComplete={handleOnboardingComplete} />
      )}
    </div>
  )
}

export default App
