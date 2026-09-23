import { GitFork, MessageCircle, Globe, Briefcase } from 'lucide-react'

export default function Footer({ navigate }) {
  return (
    <footer
      style={{
        borderTop: '2.5px solid #0A0A0A',
        backgroundColor: '#0A0A0A',
        color: 'white',
        marginTop: '0',
      }}
    >
      {/* ── Big CTA row ── */}
      <div
        style={{
          borderBottom: '2px solid #1a1a1a',
          padding: '48px 24px',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        <div>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.62rem', letterSpacing: '0.15em', color: '#555', marginBottom: '10px', textTransform: 'uppercase' }}>
            READY TO START?
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: 'white',
              lineHeight: 1.05,
            }}
          >
            LET'S BUILD{' '}
            <span style={{ color: '#BFFF00' }}>TOGETHER.</span>
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            className="btn-primary"
            onClick={() => navigate('events')}
            style={{ fontSize: '0.78rem', padding: '12px 26px' }}
          >
            EXPLORE EVENTS →
          </button>
          <button
            className="btn-outline"
            onClick={() => navigate('community')}
            style={{ fontSize: '0.78rem', padding: '12px 26px', color: 'white', borderColor: '#333', boxShadow: '3px 3px 0px #333' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#BFFF00'; e.currentTarget.style.color = '#0A0A0A' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'white' }}
          >
            JOIN COMMUNITY
          </button>
        </div>
      </div>

      {/* ── Links grid ── */}
      <div
        style={{
          padding: '44px 24px',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '40px',
        }}
        className="footer-grid"
      >
        {/* Brand col */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span
              style={{
                backgroundColor: '#BFFF00',
                color: '#0A0A0A',
                fontFamily: 'Courier New, monospace',
                fontWeight: 900,
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                padding: '4px 9px',
                border: '2px solid #BFFF00',
              }}
            >
              BCA
            </span>
            <span style={{ fontFamily: 'Courier New, monospace', fontWeight: 700, fontSize: '0.6rem', letterSpacing: '0.12em', color: '#666' }}>
              / TECH COMMUNITY
            </span>
          </div>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.7rem', color: '#555', lineHeight: 1.75, marginBottom: '20px', maxWidth: '280px' }}>
            A student-driven space to learn, build, and grow. Discover events, showcase projects, and connect with BCA students across India.
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[GitFork, MessageCircle, Globe, Briefcase].map((Icon, i) => (
              <button
                key={i}
                style={{
                  background: 'none',
                  border: '1.5px solid #222',
                  padding: '7px',
                  cursor: 'pointer',
                  color: '#555',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'color 0.15s, border-color 0.15s, background 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#BFFF00'
                  e.currentTarget.style.borderColor = '#BFFF00'
                  e.currentTarget.style.backgroundColor = 'rgba(191,255,0,0.05)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#555'
                  e.currentTarget.style.borderColor = '#222'
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>

        {/* Pages */}
        <div>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.62rem', letterSpacing: '0.14em', color: '#444', marginBottom: '14px', textTransform: 'uppercase', fontWeight: 700 }}>
            PAGES
          </p>
          {['home', 'events', 'community', 'projects', 'about'].map(page => (
            <button
              key={page}
              onClick={() => navigate(page)}
              style={{
                display: 'block',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Courier New, monospace',
                fontSize: '0.7rem',
                color: '#555',
                marginBottom: '9px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: 0,
                transition: 'color 0.15s',
                textAlign: 'left',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#BFFF00' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#555' }}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Community */}
        <div>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.62rem', letterSpacing: '0.14em', color: '#444', marginBottom: '14px', textTransform: 'uppercase', fontWeight: 700 }}>
            COMMUNITY
          </p>
          {['Discord Server', 'GitHub Org', 'Newsletter', 'Contribute', 'Volunteer'].map(item => (
            <button
              key={item}
              style={{
                display: 'block',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Courier New, monospace',
                fontSize: '0.7rem',
                color: '#555',
                marginBottom: '9px',
                padding: 0,
                letterSpacing: '0.08em',
                transition: 'color 0.15s',
                textAlign: 'left',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#BFFF00' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#555' }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Contact */}
        <div>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.62rem', letterSpacing: '0.14em', color: '#444', marginBottom: '14px', textTransform: 'uppercase', fontWeight: 700 }}>
            CONTACT
          </p>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.68rem', color: '#555', marginBottom: '8px', lineHeight: 1.5 }}>
            hello@bcatechcommunity.dev
          </p>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.68rem', color: '#555', lineHeight: 1.6 }}>
            ADP College,<br />Guwahati, Assam<br />India
          </p>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          borderTop: '1px solid #111',
          padding: '14px 24px',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#333', letterSpacing: '0.1em' }}>
          ADP COLLEGE
        </span>
        <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#333', letterSpacing: '0.1em' }}>
          BUILD / COLLABORATE / LEARN / SHARE / GROW
        </span>
        <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#333', letterSpacing: '0.1em' }}>
          BCA / 2026
        </span>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .footer-grid > div:first-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 560px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-grid > div:first-child {
            grid-column: 1;
          }
        }
      `}</style>
    </footer>
  )
}
