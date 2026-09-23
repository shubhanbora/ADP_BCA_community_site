import { X, User, Mail, Lock, BookOpen } from 'lucide-react'

export default function AuthModal({ mode, setMode, onClose, onAuth }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.65)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="animate-fade-in"
        style={{
          backgroundColor: '#F5F0E8',
          border: '2.5px solid #0A0A0A',
          boxShadow: '8px 8px 0px #0A0A0A',
          width: '100%',
          maxWidth: '420px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Lime accent bar */}
        <div style={{ height: '5px', backgroundColor: '#BFFF00', borderBottom: '2px solid #0A0A0A' }} />

        <div style={{ padding: '32px' }}>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div style={{ marginBottom: '28px' }}>
            <span className="section-number">
              {mode === 'login' ? '01 / WELCOME BACK' : '01 / JOIN THE COMMUNITY'}
            </span>
            <h2
              style={{
                fontSize: '2rem',
                fontWeight: 900,
                marginTop: '4px',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              {mode === 'login' ? 'LOG IN' : 'SIGN UP'}
            </h2>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.65rem', color: '#888', marginTop: '6px' }}>
              {mode === 'login'
                ? 'Welcome back to BCA Tech Community.'
                : 'Create your account and join 1,200+ builders.'}
            </p>
          </div>

          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {mode === 'signup' && (
              <div>
                <label style={{ display: 'block', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '6px', textTransform: 'uppercase', color: '#888' }}>
                  FULL NAME
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                  <input className="input-brutal" placeholder="Your full name" defaultValue="Shubhan Bora" style={{ paddingLeft: '36px' }} />
                </div>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '6px', textTransform: 'uppercase', color: '#888' }}>
                EMAIL
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input className="input-brutal" type="email" placeholder="your@email.com" defaultValue="shubhan@adpcollege.edu" style={{ paddingLeft: '36px' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '6px', textTransform: 'uppercase', color: '#888' }}>
                PASSWORD
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input className="input-brutal" type="password" placeholder="••••••••" defaultValue="password123" style={{ paddingLeft: '36px' }} />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label style={{ display: 'block', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '6px', textTransform: 'uppercase', color: '#888' }}>
                  SEMESTER
                </label>
                <div style={{ position: 'relative' }}>
                  <BookOpen size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999', pointerEvents: 'none' }} />
                  <select
                    className="input-brutal"
                    style={{ cursor: 'pointer', paddingLeft: '36px', appearance: 'none' }}
                    defaultValue="4"
                  >
                    {[1,2,3,4,5,6].map(s => (
                      <option key={s} value={s}>
                        {s}{['st','nd','rd','th','th','th'][s-1]} Semester
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <button
              className="btn-black"
              onClick={onAuth}
              style={{ marginTop: '6px', justifyContent: 'center', padding: '13px', fontSize: '0.8rem', letterSpacing: '0.12em' }}
            >
              {mode === 'login' ? 'LOGIN →' : 'CREATE ACCOUNT →'}
            </button>
          </div>

          {/* Toggle */}
          <p
            style={{
              marginTop: '20px',
              fontFamily: 'Courier New, monospace',
              fontSize: '0.68rem',
              textAlign: 'center',
              color: '#888',
            }}
          >
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Courier New, monospace',
                fontSize: '0.68rem',
                fontWeight: 700,
                color: '#FF3CAC',
                textDecoration: 'underline',
              }}
            >
              {mode === 'login' ? 'SIGN UP' : 'LOGIN'}
            </button>
          </p>

          {/* Demo note */}
          <div
            style={{
              marginTop: '18px',
              backgroundColor: '#FFE44D',
              border: '2px solid #0A0A0A',
              padding: '10px 14px',
              fontFamily: 'Courier New, monospace',
              fontSize: '0.65rem',
              fontWeight: 700,
              lineHeight: 1.5,
            }}
          >
            ⚡ DEMO MODE — Click {mode === 'login' ? 'LOGIN' : 'CREATE ACCOUNT'} to experience the logged-in state. No real auth.
          </div>
        </div>
      </div>
    </div>
  )
}
