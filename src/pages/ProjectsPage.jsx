import { useState } from 'react'
import { GitFork, ExternalLink, Heart, MessageCircle, Plus, X } from 'lucide-react'
import { projects as initialProjects, projectCategories } from '../data/projects'

const avatarColors = {
  SB: '#BFFF00', RS: '#FF3CAC', SD: '#FFE44D', DB: '#0A0A0A',
  NB: '#BFFF00', PS: '#FF3CAC', AG: '#FFE44D', MF: '#BFFF00',
}

/* ─── Project Card ─── */
function ProjectCard({ project, onLike }) {
  const avColor = avatarColors[project.creatorAvatar] || '#BFFF00'

  return (
    <div className="card-brutal" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Visual header */}
      <div
        style={{
          height: '152px',
          backgroundColor: project.accentColor,
          borderBottom: '2.5px solid #0A0A0A',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Big watermark name */}
        <span
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 900,
            color: '#0A0A0A',
            opacity: 0.1,
            letterSpacing: '-0.05em',
            userSelect: 'none',
            position: 'absolute',
          }}
        >
          {project.name}
        </span>
        {/* Category badge */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: '#0A0A0A',
            color: project.accentColor === '#0A0A0A' ? '#BFFF00' : project.accentColor,
            fontFamily: 'Courier New, monospace',
            fontSize: '0.58rem',
            fontWeight: 700,
            padding: '3px 9px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {project.category}
        </div>
        {/* Featured star */}
        {project.featured && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: '#FFE44D',
              border: '2px solid #0A0A0A',
              fontFamily: 'Courier New, monospace',
              fontSize: '0.56rem',
              fontWeight: 700,
              padding: '2px 7px',
              letterSpacing: '0.1em',
            }}
          >
            ★ FEATURED
          </div>
        )}
      </div>

      <div style={{ padding: '18px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 900, letterSpacing: '-0.01em', marginBottom: '3px' }}>
          {project.name}
        </h3>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#888', marginBottom: '10px' }}>
          {project.tagline}
        </p>
        <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.55, marginBottom: '14px', flexGrow: 1 }}>
          {project.description}
        </p>

        {/* Creator row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              backgroundColor: avColor,
              border: '2px solid #0A0A0A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Courier New, monospace',
              fontWeight: 900,
              fontSize: '0.56rem',
              flexShrink: 0,
              color: avColor === '#0A0A0A' ? 'white' : '#0A0A0A',
            }}
          >
            {project.creatorAvatar}
          </div>
          <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.63rem', color: '#555' }}>
            {project.creator}
          </span>
          {project.team.length > 1 && (
            <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', color: '#bbb' }}>
              +{project.team.length - 1} more
            </span>
          )}
        </div>

        {/* Tech stack */}
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {project.techStack.map(t => (
            <span
              key={t}
              style={{
                border: '1.5px solid #0A0A0A',
                fontFamily: 'Courier New, monospace',
                fontSize: '0.56rem',
                fontWeight: 700,
                padding: '2px 7px',
                letterSpacing: '0.06em',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '14px',
            paddingTop: '10px',
            borderTop: '1.5px solid #e5e2da',
          }}
        >
          <button
            onClick={() => onLike(project.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'Courier New, monospace',
              fontSize: '0.66rem',
              fontWeight: 700,
              color: project.liked ? '#FF3CAC' : '#888',
              transition: 'color 0.15s',
            }}
          >
            <Heart size={14} fill={project.liked ? '#FF3CAC' : 'none'} color={project.liked ? '#FF3CAC' : '#888'} />
            {project.likes}
          </button>
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'Courier New, monospace',
              fontSize: '0.66rem',
              fontWeight: 700,
              color: '#888',
            }}
          >
            <MessageCircle size={14} />
            {project.comments}
          </button>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '7px' }}>
          <button
            className="btn-black"
            style={{ flexGrow: 1, justifyContent: 'center', fontSize: '0.63rem', padding: '7px' }}
          >
            VIEW PROJECT →
          </button>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button className="btn-outline" style={{ padding: '7px 10px' }} title="GitHub">
                <GitFork size={14} />
              </button>
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button className="btn-outline" style={{ padding: '7px 10px' }} title="Live Demo">
                <ExternalLink size={14} />
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Submit Project Modal ─── */
function SubmitProjectModal({ onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.65)',
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto',
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
          maxWidth: '540px',
          padding: '32px',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <span className="section-number">SUBMIT /</span>
            <h2 style={{ fontWeight: 900, fontSize: '1.7rem', letterSpacing: '-0.02em', marginTop: '2px' }}>
              SUBMIT PROJECT
            </h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            { label: 'PROJECT NAME', placeholder: 'e.g. DevLink', type: 'text' },
            { label: 'TAGLINE', placeholder: 'One-liner description', type: 'text' },
            { label: 'GITHUB URL', placeholder: 'https://github.com/...', type: 'url' },
            { label: 'LIVE DEMO URL (optional)', placeholder: 'https://...', type: 'url' },
          ].map(field => (
            <div key={field.label}>
              <label style={{ display: 'block', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '6px', textTransform: 'uppercase', color: '#888' }}>
                {field.label}
              </label>
              <input className="input-brutal" placeholder={field.placeholder} type={field.type} />
            </div>
          ))}

          <div>
            <label style={{ display: 'block', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '6px', textTransform: 'uppercase', color: '#888' }}>
              CATEGORY
            </label>
            <select className="input-brutal" style={{ cursor: 'pointer' }}>
              {projectCategories.filter(c => c !== 'All').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '6px', textTransform: 'uppercase', color: '#888' }}>
              DESCRIPTION
            </label>
            <textarea
              className="input-brutal"
              rows={4}
              placeholder="What does your project do? What problem does it solve?"
              style={{ resize: 'vertical', lineHeight: 1.6 }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '6px', textTransform: 'uppercase', color: '#888' }}>
              TECH STACK (comma separated)
            </label>
            <input className="input-brutal" placeholder="React, Node.js, MongoDB..." />
          </div>

          <button
            className="btn-primary"
            onClick={onClose}
            style={{ justifyContent: 'center', padding: '12px', marginTop: '4px', fontSize: '0.8rem' }}
          >
            SUBMIT PROJECT →
          </button>
        </div>

        <div style={{ marginTop: '14px', backgroundColor: '#FFE44D', border: '2px solid #0A0A0A', padding: '8px 12px', fontFamily: 'Courier New, monospace', fontSize: '0.62rem', fontWeight: 700 }}>
          ⚡ DEMO MODE — Submissions are not saved. This is a frontend-only demo.
        </div>
      </div>
    </div>
  )
}

/* ─── ProjectsPage ─── */
export default function ProjectsPage({ isLoggedIn, openLogin }) {
  const [projectsList, setProjectsList] = useState(initialProjects)
  const [activeCategory, setActiveCategory] = useState('All')
  const [submitOpen, setSubmitOpen] = useState(false)

  const handleLike = (id) => {
    setProjectsList(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    )
  }

  const filtered =
    activeCategory === 'All'
      ? projectsList
      : projectsList.filter(p => p.category === activeCategory)

  return (
    <div>
      {/* ─── Header ─── */}
      <div
        style={{
          borderBottom: '2.5px solid #0A0A0A',
          padding: '44px 24px',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <span className="section-number">04 /</span>
          <h1
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 5rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              marginTop: '4px',
            }}
          >
            PROJECTS
          </h1>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.68rem', color: '#666', marginTop: '8px' }}>
            Showcase your work and get feedback from the community.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="sticky-note-pink">
            SHOW WHAT<br />YOU BUILD
          </div>
          <button
            className="btn-black"
            onClick={isLoggedIn ? () => setSubmitOpen(true) : openLogin}
            style={{ gap: '7px' }}
          >
            <Plus size={15} />
            SUBMIT PROJECT
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
        {/* Category filters */}
        <div
          style={{ display: 'flex', gap: '6px', marginBottom: '28px', overflowX: 'auto', paddingBottom: '4px' }}
          className="scrollbar-hide"
        >
          {projectCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                border: '2.5px solid #0A0A0A',
                padding: '6px 16px',
                fontFamily: 'Courier New, monospace',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                backgroundColor: activeCategory === cat ? '#0A0A0A' : 'transparent',
                color: activeCategory === cat ? 'white' : '#0A0A0A',
                boxShadow: activeCategory === cat ? '3px 3px 0px #BFFF00' : '2px 2px 0px #0A0A0A',
                transition: 'all 0.1s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        <div style={{ marginBottom: '20px' }}>
          <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.62rem', color: '#999' }}>
            <strong style={{ color: '#0A0A0A' }}>{filtered.length}</strong> PROJECT{filtered.length !== 1 ? 'S' : ''}
          </span>
        </div>

        {/* Projects grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(295px, 1fr))',
            gap: '20px',
            marginBottom: '48px',
          }}
        >
          {filtered.map(project => (
            <ProjectCard key={project.id} project={project} onLike={handleLike} />
          ))}
        </div>

        {/* CTA row */}
        <div
          style={{
            borderTop: '2.5px solid #0A0A0A',
            paddingTop: '36px',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '24px',
            alignItems: 'center',
          }}
          className="projects-cta"
        >
          <div>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.62rem', color: '#999', letterSpacing: '0.12em', marginBottom: '8px', textTransform: 'uppercase' }}>
              IDEAS → REALITY
            </p>
            <p style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Have a project to share?<br />Show the community what you're building.
            </p>
          </div>
          <button
            className="btn-primary"
            style={{ fontSize: '0.78rem', padding: '12px 24px', whiteSpace: 'nowrap' }}
            onClick={isLoggedIn ? () => setSubmitOpen(true) : openLogin}
          >
            <Plus size={14} />
            SUBMIT PROJECT
          </button>
        </div>
      </div>

      {submitOpen && <SubmitProjectModal onClose={() => setSubmitOpen(false)} />}

      <style>{`
        @media (max-width: 640px) {
          .projects-cta {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
