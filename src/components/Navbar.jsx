import { useState } from 'react'
import { Search, Menu, X, User, Shield } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const NAV = [
  { label: 'HOME',     key: 'home' },
  { label: 'EVENTS',   key: 'events' },
  { label: 'PROJECTS', key: 'projects' },
  { label: 'ABOUT',    key: 'about' },
]

export default function Navbar({ currentPage, navigate, isLoggedIn, openLogin, openSignup }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { user } = useAuth()

  const isAdmin = false // Admin is separate at /admin route

  const linkStyle = (key) => ({
    background: 'none', border: 'none', cursor: 'pointer',
    fontFamily: 'Courier New, monospace', fontWeight: 700,
    fontSize: '0.67rem', letterSpacing: '0.1em', textTransform: 'uppercase',
    padding: '6px 10px',
    color: currentPage === key ? '#0A0A0A' : '#777',
    borderBottom: currentPage === key ? '2.5px solid #C8FF00' : '2.5px solid transparent',
    transition: 'color 0.15s, border-color 0.15s',
  })

  const navStyle = {
    position: 'sticky', top: 0, zIndex: 100,
    backgroundColor: '#F4F0E6',
    borderBottom: '2px solid #0A0A0A',
  }

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <button onClick={() => { navigate('home'); setMobileOpen(false) }}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer' }}>
          <span style={{ backgroundColor: '#0A0A0A', color: '#C8FF00', fontFamily: 'Courier New, monospace', fontWeight: 900, fontSize: '0.65rem', letterSpacing: '0.12em', padding: '4px 9px', border: '2px solid #0A0A0A', boxShadow: '2px 2px 0 #C8FF00' }}>BCA</span>
          <span style={{ fontFamily: 'Courier New, monospace', fontWeight: 700, fontSize: '0.6rem', letterSpacing: '0.12em', color: '#0A0A0A' }}>/ TECH COMMUNITY</span>
        </button>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="desktop-only">
          {NAV.map(l => (
            <button key={l.key} style={linkStyle(l.key)} onClick={() => navigate(l.key)}
              onMouseEnter={e => { if (currentPage !== l.key) e.currentTarget.style.color = '#0A0A0A' }}
              onMouseLeave={e => { if (currentPage !== l.key) e.currentTarget.style.color = '#777' }}>
              {l.label}
            </button>
          ))}
        </div>

        {/* Desktop right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} className="desktop-only">
          <button
            style={{ background: 'none', border: '2px solid transparent', padding: 5, cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'border-color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#0A0A0A'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
            onClick={() => setSearchOpen(v => !v)}>
            <Search size={16} />
          </button>

          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button className="btn btn-outline" style={{ padding: '5px 14px', fontSize: '0.63rem' }}
                onClick={() => navigate('profile')}>
                <User size={13} /> MY PROFILE
              </button>
            </div>
          ) : (
            <>
              <button onClick={openLogin} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Courier New, monospace', fontSize: '0.63rem', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0A0A0A',
                padding: '6px 8px', transition: 'color 0.15s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#FF2D9B'}
                onMouseLeave={e => e.currentTarget.style.color = '#0A0A0A'}>LOGIN</button>
              <button className="btn btn-black" style={{ padding: '5px 16px', fontSize: '0.63rem' }}
                onClick={openSignup}>SIGN UP</button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="mobile-only" style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => setMobileOpen(v => !v)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Search dropdown */}
      {searchOpen && (
        <div className="fade-up" style={{ borderTop: '2px solid #0A0A0A', padding: '10px 24px', backgroundColor: '#F4F0E6' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
            <input className="input" placeholder="Search events, projects…" style={{ paddingLeft: 38 }} autoFocus />
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fade-up" style={{ borderTop: '2px solid #0A0A0A', backgroundColor: '#F4F0E6', padding: '12px 16px 20px' }}>
          {NAV.map(l => (
            <button key={l.key} onClick={() => { navigate(l.key); setMobileOpen(false) }}
              style={{ display: 'block', width: '100%', textAlign: 'left', background: currentPage === l.key ? '#C8FF00' : 'none', border: 'none', padding: '11px 10px', borderBottom: '1px solid #e5e1d8', fontFamily: 'Courier New, monospace', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', color: '#0A0A0A' }}>
              {l.label}
            </button>
          ))}
          {isAdmin && (
            <button onClick={() => { navigate('admin'); setMobileOpen(false) }}
              style={{ display: 'block', width: '100%', textAlign: 'left', background: currentPage === 'admin' ? '#C8FF00' : 'none', border: 'none', padding: '11px 10px', borderBottom: '1px solid #e5e1d8', fontFamily: 'Courier New, monospace', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', color: '#0A0A0A' }}>
              ADMIN ⚡
            </button>
          )}          <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
            {isLoggedIn
              ? <button className="btn btn-black" style={{ fontSize: '0.68rem' }}
                  onClick={() => { navigate('profile'); setMobileOpen(false) }}>
                  <User size={13} /> MY PROFILE
                </button>
              : <>
                  <button className="btn btn-outline" style={{ fontSize: '0.68rem' }} onClick={() => { openLogin(); setMobileOpen(false) }}>LOGIN</button>
                  <button className="btn btn-black" style={{ fontSize: '0.68rem' }} onClick={() => { openSignup(); setMobileOpen(false) }}>SIGN UP</button>
                </>
            }
          </div>
        </div>
      )}
    </nav>
  )
}
