import { Users, Calendar, Code2, Building2 } from 'lucide-react'
import clgImg from '../assets/clg.jpg'

const stats = [
  { value: '1.2K+', label: 'MEMBERS' },
  { value: '50+',   label: 'EVENTS' },
  { value: '200+',  label: 'PROJECTS' },
  { value: '10+',   label: 'COLLEGES' },
]

/* ─── HomePage ─── */
export default function HomePage({ navigate, isLoggedIn, openSignup }) {

  return (
    <div>
      {/* ═══════════════════════════════════════════════════
          HERO  — matches reference image exactly
      ══════════════════════════════════════════════════ */}
      <section
        style={{
          borderBottom: '2.5px solid #0A0A0A',
          backgroundColor: '#F5F0E8',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '56px 32px 0',
            display: 'grid',
            gridTemplateColumns: '1fr 420px',
            gap: '48px',
            alignItems: 'flex-end',
          }}
          className="hero-grid"
        >
          {/* ── LEFT: text + buttons ── */}
          <div style={{ paddingBottom: '52px' }}>

            {/* Eyebrow */}
            <p
              style={{
                fontFamily: 'Courier New, monospace',
                fontSize: '0.62rem',
                letterSpacing: '0.2em',
                color: '#999',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              SOMETHING NEW IS BEING BUILT.
            </p>

            {/* Headline */}
            <div style={{ marginBottom: '24px', lineHeight: 1 }}>
              <h1
                style={{
                  fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  lineHeight: 0.95,
                  display: 'block',
                  color: '#0A0A0A',
                  marginBottom: '6px',
                }}
              >
                LET'S BUILD
              </h1>              {/* TOGETHER on black block with lime text — exact match */}
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: '#0A0A0A',
                  padding: '6px 18px 10px',
                }}
              >
                <h1
                  style={{
                    fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                    lineHeight: 0.95,
                    color: '#BFFF00',
                    display: 'block',
                  }}
                >
                  TOGETHER.
                </h1>
              </div>
            </div>

            {/* Sub-copy */}
            <p
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.7,
                color: '#555',
                maxWidth: '460px',
                marginBottom: '32px',
              }}
            >
              A student-driven space to learn, experiment,
              build projects, explore new technology and
              have a little fun while we're at it.
            </p>

            {/* CTA buttons — pink fill + outline, matching reference */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                className="btn-pink"
                style={{ fontSize: '0.78rem', padding: '14px 28px', letterSpacing: '0.1em' }}
                onClick={isLoggedIn ? () => navigate('projects') : openSignup}
              >
                JOIN COMMUNITY →
              </button>
              <button
                className="btn-outline"
                style={{ fontSize: '0.78rem', padding: '14px 28px', letterSpacing: '0.1em' }}
                onClick={() => navigate('events')}
              >
                EXPLORE EVENTS
              </button>
            </div>
          </div>

          {/* ── RIGHT: Editorial Neo-Brutalist collage ── */}
          <div
            style={{
              position: 'relative',
              height: '460px',
              alignSelf: 'flex-end',
            }}
            className="hero-collage"
          >

            {/* ① Lime green offset "shadow" rectangle — behind the photo, offset bottom-right */}
            <div
              style={{
                position: 'absolute',
                top: '68px',
                left: '58px',
                right: '-10px',
                bottom: '-10px',
                backgroundColor: '#BFFF00',
                border: '2.5px solid #0A0A0A',
                zIndex: 1,
              }}
            />

            {/* ② Main photo — rotated ~2deg, sits on top of lime shadow */}
            <div
              style={{
                position: 'absolute',
                top: '52px',
                left: '40px',
                right: '18px',
                bottom: '18px',
                border: '3px solid #0A0A0A',
                overflow: 'hidden',
                backgroundColor: '#111',
                transform: 'rotate(2deg)',
                zIndex: 2,
                transformOrigin: 'center center',
              }}
            >
              <img
                src={clgImg}
                alt="ADP College, Guwahati"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  filter: 'grayscale(100%) contrast(1.15) brightness(0.9)',
                  display: 'block',
                  /* counter-rotate image slightly so it looks straight inside the rotated frame */
                  transform: 'rotate(-2deg) scale(1.06)',
                  transformOrigin: 'center center',
                }}
              />
            </div>

            {/* ③ Yellow STUDENTS × TECH sticky — top-centre, rotated -4deg, overlaps photo */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-30%) rotate(-4deg)',
                backgroundColor: '#FFE44D',
                border: '2.5px solid #0A0A0A',
                boxShadow: '5px 5px 0px #0A0A0A',
                padding: '18px 24px',
                zIndex: 10,
                minWidth: '148px',
              }}
            >
              <p
                style={{
                  fontFamily: 'Courier New, monospace',
                  fontWeight: 900,
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  lineHeight: 2.1,
                  color: '#0A0A0A',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                }}
              >
                STUDENTS<br />
                <span style={{ fontSize: '1rem', letterSpacing: 0 }}>×</span><br />
                TECH
              </p>
            </div>

            {/* ④ Black IDEAS label — bottom-left, partially outside photo, rotated slightly */}
            <div
              style={{
                position: 'absolute',
                bottom: '28px',
                left: '-8px',
                backgroundColor: '#0A0A0A',
                border: '2.5px solid #0A0A0A',
                padding: '14px 20px',
                zIndex: 10,
                transform: 'rotate(-1deg)',
                maxWidth: '230px',
              }}
            >
              <p
                style={{
                  fontFamily: 'Courier New, monospace',
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  lineHeight: 2,
                  color: 'white',
                  textTransform: 'uppercase',
                }}
              >
                IDEAS<br />
                PEOPLE<br />
                OPPORTUNITIES<br />
                A BRIGHTER YOU
              </p>
            </div>

          </div>
        </div>

        {/* ── STATS ROW ── */}
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 32px',
            borderTop: '2px solid #0A0A0A',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
          }}
          className="stats-grid"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: '20px 20px',
                borderRight: i < 3 ? '2px solid #0A0A0A' : 'none',
              }}
            >
              <div
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  color: '#0A0A0A',
                  marginBottom: '4px',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'Courier New, monospace',
                  fontSize: '0.6rem',
                  color: '#888',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '88px 24px', maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
        <span
          style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '0.62rem',
            letterSpacing: '0.2em',
            color: '#999',
            display: 'block',
            marginBottom: '16px',
            textTransform: 'uppercase',
          }}
        >
          THE COMMUNITY AWAITS
        </span>
        <h2
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            marginBottom: '32px',
          }}
        >
          READY TO{' '}
          <span style={{ backgroundColor: '#0A0A0A', color: '#BFFF00', padding: '2px 14px' }}>
            BUILD?
          </span>
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <button
            className="btn-black"
            style={{ fontSize: '0.82rem', padding: '14px 32px' }}
            onClick={isLoggedIn ? () => navigate('events') : openSignup}
          >
            GET STARTED →
          </button>
          <button
            className="btn-outline"
            style={{ fontSize: '0.82rem', padding: '14px 32px' }}
            onClick={() => navigate('about')}
          >
            LEARN MORE
          </button>
        </div>
      </section>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding-bottom: 0 !important;
          }
          .hero-collage {
            display: none !important;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stats-grid > div:nth-child(2) {
            border-right: none !important;
          }
          .stats-grid > div:nth-child(1),
          .stats-grid > div:nth-child(2) {
            border-bottom: 2.5px solid #0A0A0A !important;
          }
          .why-grid { display: none; }
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  )
}
