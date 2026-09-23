import { ArrowRight, Users, Calendar, Code2, Building2, Zap, Globe, Star, TrendingUp, ExternalLink } from 'lucide-react'
import { events } from '../data/events'
import { projects } from '../data/projects'
import heroImg from '../assets/hero.png'
import clgImg from '../assets/clg.jpg'

/* ─── colour helpers ─── */
const categoryColors = {
  Hackathon: '#BFFF00',
  Bootcamp: '#FF3CAC',
  Competition: '#FFE44D',
  Workshop: '#BFFF00',
  Webinar: '#FF3CAC',
  Internship: '#FFE44D',
}

const stats = [
  { value: '1.2K+', label: 'MEMBERS', icon: Users },
  { value: '50+', label: 'EVENTS', icon: Calendar },
  { value: '200+', label: 'PROJECTS', icon: Code2 },
  { value: '10+', label: 'COLLEGES', icon: Building2 },
]

const whyJoin = [
  {
    icon: Zap,
    title: 'DISCOVER EVENTS',
    desc: 'Hackathons, bootcamps, workshops & competitions from 20+ platforms in one place.',
    accent: '#BFFF00',
  },
  {
    icon: Code2,
    title: 'BUILD PROJECTS',
    desc: 'Collaborate on real projects, get feedback, and showcase your work to the world.',
    accent: '#FF3CAC',
  },
  {
    icon: Star,
    title: 'GROW YOUR SKILLS',
    desc: 'Learn from peers, mentors, and working developers. Level up with XP.',
    accent: '#FFE44D',
  },
  {
    icon: Globe,
    title: 'FIND YOUR TEAM',
    desc: 'Connect with developers, designers, and builders for hackathons & startups.',
    accent: '#BFFF00',
  },
]

const communityHighlights = [
  {
    name: 'Debjit Borah',
    role: 'GitHub Campus Expert',
    achievement: 'Selected for GitHub Campus Expert Program 2026 — building open source culture at ADP College.',
    avatar: 'DB',
    accent: '#BFFF00',
  },
  {
    name: 'Sneha Das',
    role: 'AI Developer',
    achievement: 'Built Fryday — an AI Task Automation Tool that earned 32 upvotes in the community.',
    avatar: 'SD',
    accent: '#FF3CAC',
  },
  {
    name: 'Rahul Sharma',
    role: 'Full Stack Dev',
    achievement: 'Launched Wisdawn EdTech Platform with peer-to-peer learning for 500+ students.',
    avatar: 'RS',
    accent: '#FFE44D',
  },
]

/* ─── Event card for homepage ─── */
function EventCard({ event, navigate }) {
  const bg = categoryColors[event.category] || '#BFFF00'
  return (
    <div
      className="card-brutal"
      style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', overflow: 'hidden' }}
      onClick={() => navigate('events')}
    >
      <div style={{ height: '5px', backgroundColor: bg, borderBottom: '2px solid #0A0A0A' }} />
      <div style={{ padding: '18px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
          <span
            style={{
              backgroundColor: bg,
              border: '2px solid #0A0A0A',
              fontFamily: 'Courier New, monospace',
              fontSize: '0.58rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '2px 8px',
            }}
          >
            {event.category}
          </span>
          <span
            style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '0.58rem',
              border: '1.5px solid #ccc',
              padding: '2px 6px',
              color: '#666',
            }}
          >
            {event.mode}
          </span>
        </div>
        <h3
          style={{
            fontSize: '1.02rem',
            fontWeight: 900,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
            marginBottom: '4px',
          }}
        >
          {event.title}
        </h3>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.62rem', color: '#888', marginBottom: '10px' }}>
          {event.organizer}
        </p>
        <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.55, marginBottom: '14px', flexGrow: 1 }}>
          {event.shortDescription}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
          <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.62rem', fontWeight: 700, color: '#444' }}>
            📅 {event.date}
          </span>
          {event.prizePool && (
            <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.62rem', fontWeight: 700, color: '#FF3CAC' }}>
              🏆 {event.prizePool}
            </span>
          )}
        </div>
        <button
          className="btn-outline"
          style={{ width: '100%', justifyContent: 'center', fontSize: '0.68rem', padding: '8px' }}
          onClick={e => { e.stopPropagation(); navigate('events') }}
        >
          VIEW DETAILS →
        </button>
      </div>
    </div>
  )
}

/* ─── Project card for homepage ─── */
function ProjectCard({ project }) {
  return (
    <div className="card-brutal" style={{ overflow: 'hidden' }}>
      <div
        style={{
          height: '130px',
          backgroundColor: project.accentColor,
          borderBottom: '2.5px solid #0A0A0A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            fontSize: '3rem',
            fontWeight: 900,
            color: '#0A0A0A',
            opacity: 0.1,
            letterSpacing: '-0.06em',
            userSelect: 'none',
          }}
        >
          {project.name}
        </span>
        <span
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '10px',
            backgroundColor: '#0A0A0A',
            color: project.accentColor === '#0A0A0A' ? '#BFFF00' : project.accentColor,
            fontFamily: 'Courier New, monospace',
            fontSize: '0.58rem',
            fontWeight: 700,
            padding: '2px 7px',
            letterSpacing: '0.08em',
          }}
        >
          {project.category}
        </span>
      </div>
      <div style={{ padding: '16px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 900, marginBottom: '3px' }}>{project.name}</h3>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#888', marginBottom: '10px' }}>
          {project.tagline}
        </p>
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {project.techStack.map(t => (
            <span
              key={t}
              style={{
                border: '1.5px solid #0A0A0A',
                fontFamily: 'Courier New, monospace',
                fontSize: '0.56rem',
                fontWeight: 700,
                padding: '2px 6px',
                letterSpacing: '0.06em',
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.62rem', color: '#666' }}>
            by {project.creator}
          </span>
          <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.62rem', color: '#FF3CAC', fontWeight: 700 }}>
            ♥ {project.likes}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─── HomePage ─── */
export default function HomePage({ navigate, isLoggedIn, openSignup }) {
  const upcomingEvents = events.slice(0, 3)
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3)

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
            <div style={{ marginBottom: '28px', lineHeight: 1 }}>
              <h1
                style={{
                  fontSize: 'clamp(3.8rem, 8.5vw, 6.8rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.95,
                  display: 'block',
                  color: '#0A0A0A',
                  marginBottom: '6px',
                }}
              >
                LET'S BUILD
              </h1>
              {/* TOGETHER on black block with lime text — exact match */}
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: '#0A0A0A',
                  padding: '6px 18px 10px',
                }}
              >
                <h1
                  style={{
                    fontSize: 'clamp(3.8rem, 8.5vw, 6.8rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.04em',
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
                fontSize: '1.05rem',
                lineHeight: 1.72,
                color: '#444',
                maxWidth: '500px',
                marginBottom: '40px',
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
                onClick={isLoggedIn ? () => navigate('community') : openSignup}
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

        {/* ── STATS ROW — directly below hero, same section ── */}
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 32px',
            borderTop: '2.5px solid #0A0A0A',
            marginTop: '52px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
          }}
          className="stats-grid"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: '28px 20px',
                borderRight: i < 3 ? '2.5px solid #0A0A0A' : 'none',
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
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
                  fontSize: '0.62rem',
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
          UPCOMING EVENTS
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '64px 24px', maxWidth: '1280px', margin: '0 auto', borderBottom: '2.5px solid #0A0A0A' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '36px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <span className="section-number">02 /</span>
            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                marginTop: '4px',
              }}
            >
              UPCOMING<br />EVENTS
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="sticky-note">
              OPPORTUNITIES<br />DON'T WAIT.
            </div>
            <button className="btn-black" onClick={() => navigate('events')}>
              ALL EVENTS →
            </button>
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {upcomingEvents.map(ev => (
            <EventCard key={ev.id} event={ev} navigate={navigate} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FEATURED PROJECTS
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '64px 24px', maxWidth: '1280px', margin: '0 auto', borderBottom: '2.5px solid #0A0A0A' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '36px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <span className="section-number">03 /</span>
            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                marginTop: '4px',
              }}
            >
              FEATURED<br />PROJECTS
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="sticky-note-pink">
              SHOW WHAT<br />YOU BUILD
            </div>
            <button className="btn-black" onClick={() => navigate('projects')}>
              ALL PROJECTS →
            </button>
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {featuredProjects.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          COMMUNITY HIGHLIGHTS
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '64px 24px', maxWidth: '1280px', margin: '0 auto', borderBottom: '2.5px solid #0A0A0A' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '36px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <span className="section-number">04 /</span>
            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                marginTop: '4px',
              }}
            >
              COMMUNITY<br />HIGHLIGHTS
            </h2>
          </div>
          <button className="btn-outline" onClick={() => navigate('community')}>
            VIEW COMMUNITY →
          </button>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {communityHighlights.map((person, i) => (
            <div key={i} className="card-brutal" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    backgroundColor: person.accent,
                    border: '2.5px solid #0A0A0A',
                    boxShadow: '3px 3px 0px #0A0A0A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '0.85rem',
                    flexShrink: 0,
                    fontFamily: 'Courier New, monospace',
                    color: person.accent === '#0A0A0A' ? 'white' : '#0A0A0A',
                  }}
                >
                  {person.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: '1rem', marginBottom: '2px' }}>{person.name}</div>
                  <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.62rem', color: '#888' }}>
                    {person.role}
                  </div>
                </div>
              </div>
              <p
                style={{
                  fontSize: '0.83rem',
                  lineHeight: 1.6,
                  color: '#444',
                  borderLeft: `3px solid ${person.accent}`,
                  paddingLeft: '12px',
                }}
              >
                {person.achievement}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          WHY JOIN
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '64px 24px', maxWidth: '1280px', margin: '0 auto', borderBottom: '2.5px solid #0A0A0A' }}>
        <div style={{ marginBottom: '36px' }}>
          <span className="section-number">05 /</span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              marginTop: '4px',
            }}
          >
            WHY JOIN US?
          </h2>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            border: '2.5px solid #0A0A0A',
          }}
          className="why-grid"
        >
          {whyJoin.map((item, i) => (
            <div
              key={i}
              style={{
                padding: '30px',
                borderRight: i % 2 === 0 ? '2.5px solid #0A0A0A' : 'none',
                borderBottom: i < 2 ? '2.5px solid #0A0A0A' : 'none',
                transition: 'background 0.15s',
                cursor: 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = item.accent }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              <item.icon size={28} style={{ marginBottom: '16px' }} />
              <h3
                style={{
                  fontFamily: 'Courier New, monospace',
                  fontWeight: 900,
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  marginBottom: '10px',
                }}
              >
                {item.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.65 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TICKER / MARQUEE ACCENT ROW
      ══════════════════════════════════════════════════ */}
      <section
        style={{
          borderTop: '2.5px solid #0A0A0A',
          borderBottom: '2.5px solid #0A0A0A',
          backgroundColor: '#BFFF00',
          overflow: 'hidden',
          padding: '12px 0',
        }}
      >
        <div className="animate-marquee">
          {Array(6).fill(null).map((_, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'Courier New, monospace',
                fontWeight: 900,
                fontSize: '0.9rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginRight: '48px',
                color: '#0A0A0A',
              }}
            >
              BUILD ✦ LEARN ✦ COLLABORATE ✦ SHARE ✦ GROW ✦
            </span>
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
          .why-grid {
            grid-template-columns: 1fr !important;
          }
          .why-grid > div {
            border-right: none !important;
          }
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
