import { X, User, Mail, Lock, BookOpen } from 'lucide-react'

export default function AuthModal({ mode, setMode, onClose, onAuth }) {
  const isLogin = mode === 'login'

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

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {!isLogin && (
              <Field icon={User} label="FULL NAME" placeholder="Your full name" defaultValue="Shubhan Bora" />
            )}
            <Field icon={Mail} label="EMAIL" type="email" placeholder="your@email.com" defaultValue="shubhan@adpcollege.edu" />
            <Field icon={Lock} label="PASSWORD" type="password" placeholder="••••••••" defaultValue="password" />
            {!isLogin && (
              <div>
                <Label>SEMESTER</Label>
                <div style={{ position: 'relative' }}>
                  <BookOpen size={13} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#aaa', pointerEvents: 'none' }} />
                  <select className="input" style={{ paddingLeft: 36, cursor: 'pointer', appearance: 'none' }} defaultValue="4">
                    {[1,2,3,4,5,6].map(s => <option key={s} value={s}>{s}{['st','nd','rd','th','th','th'][s-1]} Semester</option>)}
                  </select>
                </div>
              </div>
            )}

            <button className="btn btn-black" onClick={onAuth}
              style={{ justifyContent: 'center', padding: '12px', marginTop: 4, fontSize: '0.78rem', letterSpacing: '0.12em' }}>
              {isLogin ? 'LOGIN →' : 'CREATE ACCOUNT →'}
            </button>
          </div>

          <p style={{ marginTop: 18, fontFamily: 'Courier New, monospace', fontSize: '0.65rem', textAlign: 'center', color: '#888' }}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => setMode(isLogin ? 'signup' : 'login')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Courier New, monospace', fontSize: '0.65rem', fontWeight: 700, color: '#FF2D9B', textDecoration: 'underline' }}>
              {isLogin ? 'SIGN UP' : 'LOGIN'}
            </button>
          </p>

          <div style={{ marginTop: 16, background: '#FFE040', border: '2px solid #0A0A0A', padding: '8px 12px', fontFamily: 'Courier New, monospace', fontSize: '0.62rem', fontWeight: 700 }}>
            ⚡ DEMO — Click {isLogin ? 'LOGIN' : 'CREATE ACCOUNT'} to try the logged-in state.
          </div>
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
