import { useState } from 'react'
import { Search, Menu, X, User, ChevronDown } from 'lucide-react'

const navLinks = [
  { label: 'HOME', key: 'home' },
  { label: 'EVENTS', key: 'events' },
  { label: 'COMMUNITY', key: 'community' },
  { label: 'PROJECTS', key: 'projects' },
  { label: 'ABOUT', key: 'about' },
]

export default function Navbar({ currentPage, navigate, isLoggedIn, openLogin, openSignup, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')

  return (
    <nav
      style={{
        borderBottom: '2.5px solid #0A0A0A',
        backgroundColor: '#F5F0E8',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '56px',
        }}
      >
        {/* ── Logo ───────────────────────────────── */}
        <button
          onClick={() => { navigate('home'); setMobileOpen(false) }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <span
            style={{
              backgroundColor: '#0A0A0A',
              color: '#BFFF00',
              fontFamily: 'Courier New, monospace',
              fontWeight: 900,
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              padding: '4px 8px',
              border: '2px solid #0A0A0A',
              boxShadow: '2px 2px 0px #BFFF00',
            }}
          >
            BCA
          </span>
          <span
            style={{
              fontFamily: 'Courier New, monospace',
              fontWeight: 700,
              fontSize: '0.62rem',
              letterSpacing: '0.12em',
              color: '#0A0A0A',
            }}
          >
            / TECH COMMUNITY
          </span>
        </button>

        {/* ── Desktop Nav ────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hide-mobile">
          {navLinks.map(link => (
            <button
              key={link.key}
              onClick={() => navigate(link.key)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: currentPage === link.key ? '#0A0A0A' : '#666',
                borderBottom: currentPage === link.key ? '2.5px solid #BFFF00' : '2.5px solid transparent',
                paddingBottom: '2px',
                paddingLeft: '10px',
                paddingRight: '10px',
                fontFamily: 'Courier New, monospace',
                fontWeight: 700,
                fontSize: '0.68rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transition: 'color 0.15s, border-color 0.15s',
              }}
              onMouseEnter={e => { if (currentPage !== link.key) e.currentTarget.style.color = '#0A0A0A' }}
              onMouseLeave={e => { if (currentPage !== link.key) e.currentTarget.style.color = '#666' }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* ── Right Actions ──────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="hide-mobile">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            style={{
              background: 'none',
              border: '2px solid transparent',
              cursor: 'pointer',
              padding: '5px',
              display: 'flex',
              alignItems: 'center',
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#0A0A0A' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent' }}
          >
            <Search size={17} />
          </button>

          {isLoggedIn ? (
            <>
              <button
                onClick={() => navigate('profile')}
                style={{
                  backgroundColor: currentPage === 'profile' ? '#BFFF00' : 'transparent',
                  border: '2.5px solid #0A0A0A',
                  boxShadow: '3px 3px 0px #0A0A0A',
                  padding: '5px 14px',
                  fontFamily: 'Courier New, monospace',
                  fontWeight: 700,
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  textTransform: 'uppercase',
                  transition: 'background 0.15s, transform 0.1s, box-shadow 0.1s',
                }}
                onMouseEnter={e => {
                  if (currentPage !== 'profile') e.currentTarget.style.backgroundColor = '#BFFF00'
                  e.currentTarget.style.transform = 'translate(-1px,-1px)'
                  e.currentTarget.style.boxShadow = '4px 4px 0px #0A0A0A'
                }}
                onMouseLeave={e => {
                  if (currentPage !== 'profile') e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.transform = 'translate(0,0)'
                  e.currentTarget.style.boxShadow = '3px 3px 0px #0A0A0A'
                }}
              >
                <User size={14} />
                MY PROFILE
              </button>
              <button
                onClick={onLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Courier New, monospace',
                  fontWeight: 700,
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#888',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#FF3CAC' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#888' }}
              >
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <button
                onClick={openLogin}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Courier New, monospace',
                  fontWeight: 700,
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#0A0A0A',
                  padding: '5px 8px',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#FF3CAC' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#0A0A0A' }}
              >
                LOGIN
              </button>
              <button
                onClick={openSignup}
                style={{
                  backgroundColor: '#0A0A0A',
                  color: 'white',
                  border: '2.5px solid #0A0A0A',
                  boxShadow: '3px 3px 0px #BFFF00',
                  padding: '5px 16px',
                  fontFamily: 'Courier New, monospace',
                  fontWeight: 700,
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'transform 0.1s, box-shadow 0.1s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translate(-2px,-2px)'
                  e.currentTarget.style.boxShadow = '5px 5px 0px #BFFF00'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translate(0,0)'
                  e.currentTarget.style.boxShadow = '3px 3px 0px #BFFF00'
                }}
              >
                SIGN UP
              </button>
            </>
          )}
        </div>

        {/* ── Mobile hamburger ──────────────────── */}
        <button
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none' }}
          className="show-mobile-only"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Search bar dropdown ──────────────────── */}
      {searchOpen && (
        <div
          className="animate-fade-in"
          style={{
            borderTop: '2px solid #0A0A0A',
            padding: '10px 20px',
            backgroundColor: '#F5F0E8',
            maxWidth: '1280px',
            margin: '0 auto',
          }}
        >
          <div style={{ position: 'relative' }}>
            <Search
              size={15}
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}
            />
            <input
              className="input-brutal"
              placeholder="Search events, projects, community..."
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              style={{ paddingLeft: '38px' }}
              autoFocus
            />
          </div>
        </div>
      )}

      {/* ── Mobile menu ──────────────────────────── */}
      {mobileOpen && (
        <div
          className="animate-fade-in"
          style={{
            borderTop: '2.5px solid #0A0A0A',
            backgroundColor: '#F5F0E8',
            padding: '16px 20px 20px',
          }}
        >
          {navLinks.map(link => (
            <button
              key={link.key}
              onClick={() => { navigate(link.key); setMobileOpen(false) }}
              style={{
                display: 'block',
                width: '100%',
                background: currentPage === link.key ? '#BFFF00' : 'none',
                border: 'none',
                textAlign: 'left',
                padding: '11px 10px',
                borderBottom: '1.5px solid #e0ddd5',
                fontFamily: 'Courier New, monospace',
                fontWeight: 700,
                fontSize: '0.82rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                color: '#0A0A0A',
              }}
            >
              {link.label}
            </button>
          ))}
          <div style={{ marginTop: '16px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {isLoggedIn ? (
              <>
                <button
                  className="btn-black"
                  style={{ fontSize: '0.7rem' }}
                  onClick={() => { navigate('profile'); setMobileOpen(false) }}
                >
                  <User size={14} /> MY PROFILE
                </button>
                <button
                  className="btn-outline"
                  style={{ fontSize: '0.7rem' }}
                  onClick={() => { onLogout(); setMobileOpen(false) }}
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn-outline"
                  style={{ fontSize: '0.7rem' }}
                  onClick={() => { openLogin(); setMobileOpen(false) }}
                >
                  LOGIN
                </button>
                <button
                  className="btn-black"
                  style={{ fontSize: '0.7rem' }}
                  onClick={() => { openSignup(); setMobileOpen(false) }}
                >
                  SIGN UP
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* mobile-only show hack */}
      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile-only { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile-only { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
