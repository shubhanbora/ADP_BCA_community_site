import { useState } from 'react'
import { X, User, Mail, Lock, BookOpen } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function AuthModal({ mode, setMode, onClose }) {
  const isLogin = mode === 'login'
  const { login, signup, loginWithGoogle } = useAuth()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [semester, setSemester] = useState('1')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isLogin) {
        await login(email, password)
      } else {
        await signup(email, password, fullName, semester)
      }
      onClose()
    } catch (err) {
      setError(err.message || 'Failed to authenticate')
    }
    setLoading(false)
  }

  const handleGoogleAuth = async () => {
    setError('')
    setLoading(true)
    try {
      await loginWithGoogle()
      onClose()
    } catch (err) {
      setError(err.message || 'Failed to authenticate with Google')
    }
    setLoading(false)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="fade-up" style={{ background: '#F4F0E6', border: '2px solid #0A0A0A', boxShadow: '8px 8px 0 #0A0A0A', width: '100%', maxWidth: 400, overflow: 'hidden' }}>
        <div style={{ height: 4, background: '#C8FF00' }} />
        <div style={{ padding: 32, position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={18} />
          </button>

          <span className="section-number">{isLogin ? '01 / WELCOME BACK' : '01 / JOIN THE COMMUNITY'}</span>
          <h2 style={{ fontSize: '1.9rem', letterSpacing: '-0.03em', marginBottom: 6 }}>{isLogin ? 'LOG IN' : 'SIGN UP'}</h2>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.63rem', color: '#888', marginBottom: 24 }}>
            {isLogin ? 'Welcome back to BCA Tech Community.' : 'Create your account and join 1,200+ builders.'}
          </p>

          {error && (
            <div style={{ padding: '8px', background: '#ffcccc', color: '#cc0000', border: '1px solid #cc0000', marginBottom: '16px', fontSize: '0.75rem', fontFamily: 'Courier New, monospace' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {!isLogin && (
              <Field icon={User} label="FULL NAME" placeholder="Your full name" value={fullName} onChange={e => setFullName(e.target.value)} required />
            )}
            <Field icon={Mail} label="EMAIL" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
            <Field icon={Lock} label="PASSWORD" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            {!isLogin && (
              <div>
                <Label>SEMESTER</Label>
                <div style={{ position: 'relative' }}>
                  <BookOpen size={13} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#aaa', pointerEvents: 'none' }} />
                  <select className="input" style={{ paddingLeft: 36, cursor: 'pointer', appearance: 'none' }} value={semester} onChange={e => setSemester(e.target.value)}>
                    {[1,2,3,4,5,6].map(s => <option key={s} value={s}>{s}{['st','nd','rd','th','th','th'][s-1]} Semester</option>)}
                  </select>
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-black" disabled={loading}
              style={{ justifyContent: 'center', padding: '12px', marginTop: 4, fontSize: '0.78rem', letterSpacing: '0.12em', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'WAIT...' : (isLogin ? 'LOGIN →' : 'CREATE ACCOUNT →')}
            </button>
            
            <button type="button" onClick={handleGoogleAuth} disabled={loading}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', border: '2px solid #0A0A0A', background: '#fff', cursor: 'pointer', fontSize: '0.78rem', letterSpacing: '0.05em', fontWeight: 'bold' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.89 16.79 15.73 17.57V20.31H19.29C21.38 18.38 22.56 15.58 22.56 12.25Z" fill="#4285F4"/>
                <path d="M12 23C14.97 23 17.46 22.02 19.29 20.31L15.73 17.57C14.74 18.24 13.48 18.64 12 18.64C9.13 18.64 6.7 16.7 5.84 14.11H2.17V16.96C3.98 20.55 7.69 23 12 23Z" fill="#34A853"/>
                <path d="M5.84 14.11C5.62 13.45 5.49 12.74 5.49 12C5.49 11.26 5.62 10.55 5.84 9.89V7.04H2.17C1.43 8.52 1 10.21 1 12C1 13.79 1.43 15.48 2.17 16.96L5.84 14.11Z" fill="#FBBC05"/>
                <path d="M12 5.36C13.62 5.36 15.06 5.92 16.2 7.01L19.37 3.84C17.46 2.05 14.97 1 12 1C7.69 1 3.98 3.45 2.17 7.04L5.84 9.89C6.7 7.3 9.13 5.36 12 5.36Z" fill="#EA4335"/>
              </svg>
              SIGN IN WITH GOOGLE
            </button>
          </form>

          <p style={{ marginTop: 18, fontFamily: 'Courier New, monospace', fontSize: '0.65rem', textAlign: 'center', color: '#888' }}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => { setMode(isLogin ? 'signup' : 'login'); setError('') }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Courier New, monospace', fontSize: '0.65rem', fontWeight: 700, color: '#FF2D9B', textDecoration: 'underline' }}>
              {isLogin ? 'SIGN UP' : 'LOGIN'}
            </button>
          </p>

        </div>
      </div>
    </div>
  )
}

function Label({ children }) {
  return <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 5, textTransform: 'uppercase', color: '#888' }}>{children}</div>
}

function Field({ icon: Icon, label, ...props }) {
  return (
    <div>
      <Label>{label}</Label>
      <div style={{ position: 'relative' }}>
        <Icon size={13} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
        <input className="input" style={{ paddingLeft: 36 }} {...props} />
      </div>
    </div>
  )
}
