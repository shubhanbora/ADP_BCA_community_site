import { useState } from 'react'
import { GitFork, ExternalLink, Heart, MessageCircle, Plus, X } from 'lucide-react'
import { projects as allProjects, projectCategories } from '../data/projects'

const AV_COLOR = { SB:'#C8FF00', RS:'#FF2D9B', SD:'#FFE040', DB:'#0A0A0A', NB:'#C8FF00', PS:'#FF2D9B', AG:'#FFE040', MF:'#C8FF00' }

/* ── Card ── */
function Card({ p, onLike }) {
  const av = AV_COLOR[p.creatorAvatar] || '#C8FF00'
  return (
    <div className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Visual header */}
      <div style={{ height: 140, background: p.accentColor, borderBottom: '2px solid #0A0A0A', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <span style={{ fontSize: 'clamp(1.8rem,5vw,3rem)', fontWeight: 900, opacity: 0.1, letterSpacing: '-0.05em', userSelect: 'none', position: 'absolute' }}>{p.name}</span>
        <div style={{ position: 'absolute', top: 10, left: 10, background: '#0A0A0A', color: p.accentColor === '#0A0A0A' ? '#C8FF00' : p.accentColor, fontFamily: 'Courier New, monospace', fontSize: '0.56rem', fontWeight: 700, padding: '2px 8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.category}</div>
        {p.featured && <div style={{ position: 'absolute', top: 10, right: 10, background: '#FFE040', border: '2px solid #0A0A0A', fontFamily: 'Courier New, monospace', fontSize: '0.54rem', fontWeight: 700, padding: '2px 7px' }}>★ FEATURED</div>}
      </div>

      <div style={{ padding: 18, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: 3 }}>{p.name}</h3>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#888', marginBottom: 10 }}>{p.tagline}</p>
        <p style={{ fontSize: '0.79rem', color: '#555', lineHeight: 1.55, flexGrow: 1, marginBottom: 14 }}>{p.description}</p>

        {/* Creator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 26, height: 26, background: av, border: '2px solid #0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Courier New, monospace', fontWeight: 900, fontSize: '0.54rem', flexShrink: 0, color: av === '#0A0A0A' ? 'white' : '#0A0A0A' }}>{p.creatorAvatar}</div>
          <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#666' }}>{p.creator}</span>
          {p.team.length > 1 && <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.56rem', color: '#bbb' }}>+{p.team.length - 1}</span>}
        </div>

        {/* Stack */}
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 12 }}>
          {p.techStack.map(t => <span key={t} style={{ border: '1.5px solid #0A0A0A', fontFamily: 'Courier New, monospace', fontSize: '0.54rem', fontWeight: 700, padding: '2px 6px' }}>{t}</span>)}
        </div>

        {/* Stats + buttons */}
        <div style={{ borderTop: '1.5px solid #e5e1d8', paddingTop: 10, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <button onClick={() => onLike(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Courier New, monospace', fontSize: '0.63rem', fontWeight: 700, color: p.liked ? '#FF2D9B' : '#aaa', transition: 'color 0.15s' }}>
            <Heart size={13} fill={p.liked ? '#FF2D9B' : 'none'} color={p.liked ? '#FF2D9B' : '#aaa'} />{p.likes}
          </button>
          <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.63rem', color: '#bbb', display: 'flex', alignItems: 'center', gap: 4 }}><MessageCircle size={13} />{p.comments}</span>
        </div>

        <div style={{ display: 'flex', gap: 7 }}>
          <button className="btn btn-black" style={{ flexGrow: 1, justifyContent: 'center', fontSize: '0.62rem', padding: 7 }}>VIEW PROJECT →</button>
          {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"><button className="btn btn-outline" style={{ padding: '7px 10px' }} title="GitHub"><GitFork size={13} /></button></a>}
          {p.liveUrl   && <a href={p.liveUrl}   target="_blank" rel="noopener noreferrer"><button className="btn btn-outline" style={{ padding: '7px 10px' }} title="Live"><ExternalLink size={13} /></button></a>}
        </div>
      </div>
    </div>
  )
}

/* ── Submit modal ── */
function SubmitModal({ onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, overflowY: 'auto' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="fade-up" style={{ background: '#F4F0E6', border: '2px solid #0A0A0A', boxShadow: '8px 8px 0 #0A0A0A', width: '100%', maxWidth: 520, padding: 32, marginTop: 20, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div><span className="section-number">SUBMIT /</span><h2 style={{ fontSize: '1.7rem', letterSpacing: '-0.02em', marginTop: 2 }}>SUBMIT PROJECT</h2></div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[['PROJECT NAME','e.g. DevLink','text'],['TAGLINE','One-liner description','text'],['GITHUB URL','https://github.com/...','url'],['LIVE URL (optional)','https://...','url']].map(([l,p,t]) => (
            <div key={l}>
              <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 5, textTransform: 'uppercase', color: '#888' }}>{l}</div>
              <input className="input" placeholder={p} type={t} />
            </div>
          ))}
          <div>
            <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 5, textTransform: 'uppercase', color: '#888' }}>CATEGORY</div>
            <select className="input" style={{ cursor: 'pointer' }}>{projectCategories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}</select>
          </div>
          <div>
            <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 5, textTransform: 'uppercase', color: '#888' }}>DESCRIPTION</div>
            <textarea className="input" rows={3} placeholder="What does it do? What problem does it solve?" style={{ resize: 'vertical', lineHeight: 1.6 }} />
          </div>
          <div>
            <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 5, textTransform: 'uppercase', color: '#888' }}>TECH STACK (comma-separated)</div>
            <input className="input" placeholder="React, Node.js, MongoDB…" />
          </div>
          <button className="btn btn-primary" onClick={onClose} style={{ justifyContent: 'center', padding: 12, marginTop: 4, fontSize: '0.78rem' }}>SUBMIT PROJECT →</button>
        </div>
        <div style={{ marginTop: 14, background: '#FFE040', border: '2px solid #0A0A0A', padding: '8px 12px', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700 }}>
          ⚡ DEMO — Submissions are not saved. Frontend-only.
        </div>
      </div>
    </div>
  )
}

/* ── ProjectsPage ── */
export default function ProjectsPage({ isLoggedIn, openLogin }) {
  const [list, setList] = useState(allProjects)
  const [activeCat, setActiveCat] = useState('All')
  const [submitOpen, setSubmitOpen] = useState(false)

  const onLike = id => setList(prev => prev.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p))
  const filtered = activeCat === 'All' ? list : list.filter(p => p.category === activeCat)

  return (
    <div>
      {/* Header */}
      <div style={{ borderBottom: '2px solid #0A0A0A', padding: '48px 24px', maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <span className="section-number">04 /</span>
          <h1 style={{ fontSize: 'clamp(2.8rem, 7vw, 4.8rem)', letterSpacing: '-0.04em', lineHeight: 0.92, marginTop: 4 }}>PROJECTS</h1>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.65rem', color: '#888', marginTop: 8 }}>Showcase your work and get feedback from the community.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="sticker sticker-pink" style={{ transform: 'rotate(1.5deg)', fontSize: '0.65rem' }}>SHOW WHAT<br />YOU BUILD</div>
          <button className="btn btn-black" style={{ gap: 7 }} onClick={isLoggedIn ? () => setSubmitOpen(true) : openLogin}><Plus size={14} />SUBMIT PROJECT</button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 60px' }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 28, overflowX: 'auto', paddingBottom: 2 }} className="no-scroll">
          {projectCategories.map(c => (
            <button key={c} onClick={() => setActiveCat(c)}
              style={{ border: '2px solid #0A0A0A', padding: '5px 15px', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap', background: activeCat === c ? '#0A0A0A' : 'transparent', color: activeCat === c ? 'white' : '#0A0A0A', boxShadow: activeCat === c ? '3px 3px 0 #C8FF00' : '2px 2px 0 #0A0A0A', transition: 'all 0.1s' }}>{c}</button>
          ))}
        </div>

        <div style={{ marginBottom: 18 }}>
          <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#aaa' }}>
            <strong style={{ color: '#0A0A0A' }}>{filtered.length}</strong> project{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px,1fr))', gap: 20, marginBottom: 48 }}>
          {filtered.map(p => <Card key={p.id} p={p} onLike={onLike} />)}
        </div>

        {/* CTA */}
        <div style={{ borderTop: '2px solid #0A0A0A', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#aaa', letterSpacing: '0.12em', marginBottom: 6, textTransform: 'uppercase' }}>IDEAS → REALITY</p>
            <p style={{ fontSize: '1rem', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.2 }}>Have a project to share?<br />Show the community what you're building.</p>
          </div>
          <button className="btn btn-primary" style={{ fontSize: '0.75rem', padding: '12px 22px' }} onClick={isLoggedIn ? () => setSubmitOpen(true) : openLogin}><Plus size={13} />SUBMIT PROJECT</button>
        </div>
      </div>

      {submitOpen && <SubmitModal onClose={() => setSubmitOpen(false)} />}
    </div>
  )
}
