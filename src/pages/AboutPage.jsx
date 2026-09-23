import { Users, Code2, Globe, BookOpen, Zap, TrendingUp, ArrowRight } from 'lucide-react'

const values = [
  { word: 'BUILD', desc: 'Turn ideas into real products. Ship projects that solve real problems and impact real people.', color: '#BFFF00' },
  { word: 'LEARN', desc: 'Explore new technologies, attend workshops, join bootcamps and grow constantly.', color: '#FF3CAC' },
  { word: 'COLLABORATE', desc: 'Work with peers, find teammates for hackathons, and build ambitious things together.', color: '#FFE44D' },
  { word: 'SHARE', desc: 'Contribute to the community. Teach what you know. Open source everything you can.', color: '#BFFF00' },
  { word: 'GROW', desc: 'Develop skills, earn XP, earn certificates, and advance your technology career.', color: '#FF3CAC' },
]

const teamMembers = [
  { name: 'Shubhan Bora', role: 'Co-founder & Backend Lead', avatar: 'SB', color: '#BFFF00', handle: '@shubhan' },
  { name: 'Priya Sharma', role: 'Co-founder & Design Lead', avatar: 'PS', color: '#FF3CAC', handle: '@priyasharma' },
  { name: 'Rahul Sharma', role: 'Full Stack Developer', avatar: 'RS', color: '#FFE44D', handle: '@rahuldev' },
  { name: 'Debjit Borah', role: 'Community Manager', avatar: 'DB', color: '#0A0A0A', handle: '@debjit' },
]

const stats = [
  { value: '1.2K+', label: 'MEMBERS', accent: '#BFFF00' },
  { value: '50+', label: 'EVENTS', accent: '#FF3CAC' },
  { value: '200+', label: 'PROJECTS', accent: '#BFFF00' },
  { value: '10+', label: 'COLLEGES', accent: '#FF3CAC' },
  { value: '24+', label: 'WORKSHOPS', accent: '#BFFF00' },
  { value: '₹15L+', label: 'IN PRIZES WON', accent: '#FF3CAC' },
]

const whatWeDo = [
  { icon: BookOpen, title: 'LEARN', desc: 'Workshops, bootcamps, and peer-learning sessions on the latest tech stacks.' },
  { icon: Code2, title: 'BUILD', desc: 'A platform to showcase your projects and get real community feedback.' },
  { icon: Users, title: 'COLLABORATE', desc: 'Find teammates for hackathons, open source projects, and startup ideas.' },
  { icon: Globe, title: 'DISCOVER', desc: 'Centralized discovery for 50+ tech events from platforms worldwide.' },
  { icon: Zap, title: 'PARTICIPATE', desc: 'Hackathons, competitions, challenges — curated for student developers.' },
  { icon: TrendingUp, title: 'GROW', desc: 'Track progress with XP, earn certificates, and advance your career.' },
]

export default function AboutPage({ navigate, openSignup }) {
  return (
    <div>
      {/* ─── Header ─── */}
      <section
        style={{
          borderBottom: '2.5px solid #0A0A0A',
          padding: '60px 24px',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '40px',
          alignItems: 'flex-start',
        }}
        className="about-hero"
      >
        <div>
          <span className="section-number">00 /</span>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              marginTop: '6px',
            }}
          >
            ABOUT<br />BCA TECH<br />COMMUNITY
          </h1>
          <p
            style={{
              marginTop: '24px',
              fontSize: '1.1rem',
              lineHeight: 1.72,
              color: '#444',
              maxWidth: '560px',
            }}
          >
            A student-driven technology community where BCA students can learn, build, collaborate, discover opportunities, participate in hackathons, showcase projects, and connect with other students.
          </p>
        </div>
        <div>
          <div
            style={{
              backgroundColor: '#FFE44D',
              border: '2.5px solid #0A0A0A',
              boxShadow: '6px 6px 0px #0A0A0A',
              padding: '20px',
              transform: 'rotate(2.5deg)',
              maxWidth: '200px',
            }}
          >
            <p
              style={{
                fontFamily: 'Courier New, monospace',
                fontWeight: 900,
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                lineHeight: 1.8,
              }}
            >
              IDEAS → CODE<br />
              CODE → PROJECTS<br />
              PROJECTS → FUTURE
            </p>
          </div>
        </div>
      </section>

      {/* ─── What We Are ─── */}
      <section style={{ padding: '60px 24px', maxWidth: '1280px', margin: '0 auto', borderBottom: '2.5px solid #0A0A0A' }}>
        <span className="section-number">01 /</span>
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            marginTop: '4px',
            marginBottom: '36px',
          }}
        >
          WHAT WE ARE
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            border: '2.5px solid #0A0A0A',
          }}
          className="what-grid"
        >
          {whatWeDo.map((item, i) => (
            <div
              key={i}
              style={{
                padding: '26px',
                borderRight: (i + 1) % 3 !== 0 ? '2.5px solid #0A0A0A' : 'none',
                borderBottom: i < 3 ? '2.5px solid #0A0A0A' : 'none',
                transition: 'background 0.15s',
                cursor: 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#BFFF00' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              <item.icon size={26} style={{ marginBottom: '14px' }} />
              <h3
                style={{
                  fontFamily: 'Courier New, monospace',
                  fontWeight: 900,
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  marginBottom: '8px',
                }}
              >
                {item.title}
              </h3>
              <p style={{ fontSize: '0.83rem', color: '#555', lineHeight: 1.65 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section style={{ backgroundColor: '#0A0A0A', borderBottom: '2.5px solid #0A0A0A' }}>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
          }}
          className="stats-grid"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: '32px 24px',
                borderRight: (i + 1) % 3 !== 0 ? '2px solid #1a1a1a' : 'none',
                borderBottom: i < 3 ? '2px solid #1a1a1a' : 'none',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                  fontWeight: 900,
                  color: stat.accent,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: '4px',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'Courier New, monospace',
                  fontSize: '0.6rem',
                  color: '#555',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Values ─── */}
      <section style={{ padding: '60px 24px', maxWidth: '1280px', margin: '0 auto', borderBottom: '2.5px solid #0A0A0A' }}>
        <span className="section-number">02 /</span>
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            marginTop: '4px',
            marginBottom: '36px',
          }}
        >
          OUR VALUES
        </h2>
        <div style={{ border: '2.5px solid #0A0A0A' }}>
          {values.map((val, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '200px 1fr',
                borderBottom: i < values.length - 1 ? '2.5px solid #0A0A0A' : 'none',
              }}
              className="value-row"
            >
              <div
                style={{
                  backgroundColor: val.color,
                  borderRight: '2.5px solid #0A0A0A',
                  padding: '26px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontWeight: 900,
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                    letterSpacing: '-0.02em',
                    color: '#0A0A0A',
                  }}
                >
                  {val.word}
                </span>
              </div>
              <div style={{ padding: '26px 28px', display: 'flex', alignItems: 'center' }}>
                <p style={{ fontSize: '1rem', lineHeight: 1.68, color: '#444' }}>{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Team ─── */}
      <section style={{ padding: '60px 24px', maxWidth: '1280px', margin: '0 auto', borderBottom: '2.5px solid #0A0A0A' }}>
        <span className="section-number">03 /</span>
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            marginTop: '4px',
            marginBottom: '36px',
          }}
        >
          THE TEAM
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '20px',
          }}
        >
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="card-brutal"
              style={{ padding: '24px', textAlign: 'center' }}
            >
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  backgroundColor: member.color,
                  border: '2.5px solid #0A0A0A',
                  boxShadow: '4px 4px 0px #0A0A0A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Courier New, monospace',
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  color: member.color === '#0A0A0A' ? 'white' : '#0A0A0A',
                  margin: '0 auto 16px',
                }}
              >
                {member.avatar}
              </div>
              <h3 style={{ fontWeight: 900, fontSize: '0.95rem', marginBottom: '3px' }}>{member.name}</h3>
              <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#FF3CAC', fontWeight: 700, marginBottom: '4px' }}>
                {member.handle}
              </p>
              <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#888' }}>
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        style={{
          padding: '88px 24px',
          maxWidth: '1280px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '60px',
            backgroundColor: '#FFE44D',
            border: '2px solid #0A0A0A',
            boxShadow: '3px 3px 0px #0A0A0A',
            padding: '10px 14px',
            fontFamily: 'Courier New, monospace',
            fontSize: '0.62rem',
            fontWeight: 700,
            transform: 'rotate(-3deg)',
            lineHeight: 1.6,
          }}
          className="cta-note"
        >
          GOOD PEOPLE<br />BUILD GREAT THINGS
        </div>

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
            marginBottom: '20px',
          }}
        >
          LET'S BUILD{' '}
          <span style={{ backgroundColor: '#0A0A0A', color: '#BFFF00', padding: '4px 14px' }}>
            TOGETHER.
          </span>
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: '#666',
            maxWidth: '480px',
            margin: '0 auto 32px',
            lineHeight: 1.7,
            fontFamily: 'Courier New, monospace',
            fontSize: '0.8rem',
          }}
        >
          Join 1,200+ BCA students who are already building, learning, and growing with the community.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            className="btn-black"
            style={{ fontSize: '0.85rem', padding: '14px 32px' }}
            onClick={openSignup}
          >
            JOIN NOW <ArrowRight size={16} />
          </button>
          <button
            className="btn-outline"
            style={{ fontSize: '0.85rem', padding: '14px 32px' }}
            onClick={() => navigate('events')}
          >
            EXPLORE EVENTS
          </button>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .about-hero {
            grid-template-columns: 1fr !important;
          }
          .about-hero > div:last-child {
            display: none;
          }
          .what-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .what-grid > div:nth-child(2n) {
            border-right: none !important;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stats-grid > div:nth-child(2n) {
            border-right: none !important;
          }
          .cta-note {
            display: none;
          }
        }
        @media (max-width: 600px) {
          .what-grid {
            grid-template-columns: 1fr !important;
          }
          .what-grid > div {
            border-right: none !important;
          }
          .value-row {
            grid-template-columns: 140px 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
