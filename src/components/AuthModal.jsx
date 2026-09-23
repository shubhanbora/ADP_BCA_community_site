import { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

/* Google SVG */
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

export default function AuthModal({ onClose }) {
  const { loginWithGoogle } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleGoogle = async () => {
    setError('')
    setLoading(true)
    try {
      await loginWithGoogle()
      onClose()
    } catch (err) {
      setError(err.message || 'Sign-in failed. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="fade-up" style={{ background: '#F4F0E6', border: '2px solid #0A0A0A', boxShadow: '8px 8px 0 #0A0A0A', width: '100%', maxWidth: 380, overflow: 'hidden' }}>
        <div style={{ height: 4, background: '#C8FF00' }} />
        <div style={{ padding: '32px 32px 28px', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={18} />
          </button>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <span style={{ background: '#0A0A0A', color: '#C8FF00', fontFamily: 'Courier New, monospace', fontWeight: 900, fontSize: '0.65rem', letterSpacing: '0.12em', padding: '3px 8px' }}>BCA</span>
            <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', color: '#888' }}>/ TECH COMMUNITY</span>
          </div>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 6, lineHeight: 1 }}>
            JOIN THE<br />COMMUNITY.
          </h2>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.62rem', color: '#888', marginBottom: 28, lineHeight: 1.6 }}>
            Sign in with your Google account to access events, projects and your profile.
          </p>

          {error && (
            <div style={{ background: '#ffe0e0', border: '1.5px solid #cc0000', padding: '8px 12px', fontFamily: 'Courier New, monospace', fontSize: '0.65rem', color: '#cc0000', marginBottom: 16 }}>
              {error}
            </div>
          )}

          <button
            onClick={handleGoogle}
            disabled={loading}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              padding: '13px 20px', border: '2px solid #0A0A0A', boxShadow: '4px 4px 0 #0A0A0A',
              background: 'white', cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'Courier New, monospace', fontWeight: 700, fontSize: '0.75rem',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              opacity: loading ? 0.7 : 1, transition: 'transform 0.1s, box-shadow 0.1s',
            }}
            onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0 #0A0A0A' } }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = '4px 4px 0 #0A0A0A' }}
          >
            <GoogleIcon />
            {loading ? 'SIGNING IN…' : 'CONTINUE WITH GOOGLE'}
          </button>

          <p style={{ marginTop: 18, fontFamily: 'Courier New, monospace', fontSize: '0.58rem', color: '#bbb', textAlign: 'center', lineHeight: 1.6 }}>
            By signing in you agree to our community guidelines.
          </p>
        </div>
      </div>
    </div>
  )
}
