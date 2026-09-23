import { GitFork, MessageCircle, Globe, Briefcase } from 'lucide-react'

const PAGES = ['home', 'events', 'projects', 'about']
const LINKS = ['Discord Server', 'GitHub Org', 'Newsletter', 'Contribute']

export default function Footer({ navigate }) {
  const btnStyle = {
    display: 'block', background: 'none', border: 'none', cursor: 'pointer',
    fontFamily: 'Courier New, monospace', fontSize: '0.68rem', color: '#555',
    marginBottom: 9, letterSpacing: '0.08em', padding: 0, textAlign: 'left',
    transition: 'color 0.15s', textTransform: 'uppercase',
  }
  return (
    <footer style={{ borderTop: '2px solid #0A0A0A', background: '#0A0A0A', color: 'white' }}>

      {/* CTA */}
      <div style={{ borderBottom: '1px solid #1a1a1a', padding: '48px 24px', maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
        <div>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#555', letterSpacing: '0.14em', marginBottom: 8, textTransform: 'uppercase' }}>READY TO START?</p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            LET'S BUILD <span style={{ color: '#C8FF00' }}>TOGETHER.</span>
          </h2>
        </div>
        <button className="btn btn-primary" style={{ fontSize: '0.75rem', padding: '12px 24px' }}
          onClick={() => navigate('events')}>EXPLORE EVENTS →</button>
      </div>

      {/* Links */}
      <div style={{ padding: '44px 24px', maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40 }} className="footer-grid">
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <span style={{ background: '#C8FF00', color: '#0A0A0A', fontFamily: 'Courier New, monospace', fontWeight: 900, fontSize: '0.63rem', letterSpacing: '0.12em', padding: '3px 8px' }}>BCA</span>
            <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', color: '#555', letterSpacing: '0.1em' }}>/ TECH COMMUNITY</span>
          </div>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.68rem', color: '#555', lineHeight: 1.75, marginBottom: 18, maxWidth: 260 }}>
            A student-driven space to learn, build, and grow with BCA students across India.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            {[GitFork, MessageCircle, Globe, Briefcase].map((Icon, i) => (
              <button key={i} style={{ background: 'none', border: '1.5px solid #222', padding: 7, cursor: 'pointer', color: '#555', display: 'flex', alignItems: 'center', transition: 'color 0.15s, border-color 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#C8FF00'; e.currentTarget.style.borderColor = '#C8FF00' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = '#222' }}>
                <Icon size={13} />
              </button>
            ))}
          </div>
        </div>

        {/* Pages */}
        <div>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#444', letterSpacing: '0.14em', marginBottom: 14, textTransform: 'uppercase', fontWeight: 700 }}>PAGES</p>
          {PAGES.map(p => (
            <button key={p} style={btnStyle} onClick={() => navigate(p)}
              onMouseEnter={e => e.currentTarget.style.color = '#C8FF00'}
              onMouseLeave={e => e.currentTarget.style.color = '#555'}>{p}</button>
          ))}
        </div>

        {/* Community */}
        <div>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#444', letterSpacing: '0.14em', marginBottom: 14, textTransform: 'uppercase', fontWeight: 700 }}>COMMUNITY</p>
          {LINKS.map(l => (
            <button key={l} style={btnStyle}
              onMouseEnter={e => e.currentTarget.style.color = '#C8FF00'}
              onMouseLeave={e => e.currentTarget.style.color = '#555'}>{l}</button>
          ))}
        </div>

        {/* Contact */}
        <div>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#444', letterSpacing: '0.14em', marginBottom: 14, textTransform: 'uppercase', fontWeight: 700 }}>CONTACT</p>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.66rem', color: '#555', lineHeight: 1.7 }}>hello@bcatechcommunity.dev</p>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.66rem', color: '#555', lineHeight: 1.7, marginTop: 6 }}>ADP College<br />Guwahati, Assam</p>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid #111', padding: '12px 24px', maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        {['ADP COLLEGE', 'BUILD / LEARN / SHARE / GROW', 'BCA / 2026'].map(t => (
          <span key={t} style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', color: '#333', letterSpacing: '0.1em' }}>{t}</span>
        ))}
      </div>

      <style>{`
        @media (max-width: 860px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } .footer-grid > div:first-child { grid-column: 1/-1; } }
        @media (max-width: 520px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}
