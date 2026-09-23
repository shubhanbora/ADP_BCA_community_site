import { useState, useRef } from 'react'
import { GitFork, ExternalLink, Heart, MessageCircle, Plus, X, Upload } from 'lucide-react'
import { projectCategories } from '../data/projects'
import { useProjects } from '../hooks/useProjects'
import { useAuth } from '../context/AuthContext'

const AV_COLOR = { SB:'#C8FF00', RS:'#FF2D9B', SD:'#FFE040', DB:'#0A0A0A', NB:'#C8FF00', PS:'#FF2D9B', AG:'#FFE040', MF:'#C8FF00' }

/* ── Card ── */
function Card({ p, onLike }) {
  const avatarText = p.creatorName ? p.creatorName.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase() : 'SB'
  const av = AV_COLOR[avatarText] || '#C8FF00'
  return (
    <div className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Visual header */}
      <div style={{ height: 140, background: p.accentColor || '#C8FF00', borderBottom: '2px solid #0A0A0A', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {p.imageUrl ? (
          <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ fontSize: 'clamp(1.8rem,5vw,3rem)', fontWeight: 900, opacity: 0.1, letterSpacing: '-0.05em', userSelect: 'none', position: 'absolute' }}>{p.name}</span>
        )}
        <div style={{ position: 'absolute', top: 10, left: 10, background: '#0A0A0A', color: p.accentColor === '#0A0A0A' ? '#C8FF00' : (p.accentColor || '#C8FF00'), fontFamily: 'Courier New, monospace', fontSize: '0.56rem', fontWeight: 700, padding: '2px 8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.category}</div>
        {p.featured && <div style={{ position: 'absolute', top: 10, right: 10, background: '#FFE040', border: '2px solid #0A0A0A', fontFamily: 'Courier New, monospace', fontSize: '0.54rem', fontWeight: 700, padding: '2px 7px' }}>★ FEATURED</div>}
      </div>

      <div style={{ padding: 18, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: 3 }}>{p.name}</h3>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#888', marginBottom: 10 }}>{p.tagline}</p>
        <p style={{ fontSize: '0.79rem', color: '#555', lineHeight: 1.55, flexGrow: 1, marginBottom: 14 }}>{p.description}</p>

        {/* Creator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          {p.creatorPhotoURL ? (
             <img src={p.creatorPhotoURL} alt={p.creatorName} style={{ width: 26, height: 26, border: '2px solid #0A0A0A', borderRadius: 0, objectFit: 'cover' }} />
          ) : (
            <div style={{ width: 26, height: 26, background: av, border: '2px solid #0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Courier New, monospace', fontWeight: 900, fontSize: '0.54rem', flexShrink: 0, color: av === '#0A0A0A' ? 'white' : '#0A0A0A' }}>{avatarText}</div>
          )}
          <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#666' }}>{p.creatorName || 'Anonymous'}</span>
          {p.teamMemberIds && p.teamMemberIds.length > 1 && <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.56rem', color: '#bbb' }}>+{p.teamMemberIds.length - 1}</span>}
        </div>

        {/* Stack */}
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 12 }}>
          {p.techStack && p.techStack.map(t => <span key={t} style={{ border: '1.5px solid #0A0A0A', fontFamily: 'Courier New, monospace', fontSize: '0.54rem', fontWeight: 700, padding: '2px 6px' }}>{t}</span>)}
        </div>

        {/* Stats + buttons */}
        <div style={{ borderTop: '1.5px solid #e5e1d8', paddingTop: 10, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <button onClick={() => onLike(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Courier New, monospace', fontSize: '0.63rem', fontWeight: 700, color: p.liked ? '#FF2D9B' : '#aaa', transition: 'color 0.15s' }}>
            <Heart size={13} fill={p.liked ? '#FF2D9B' : 'none'} color={p.liked ? '#FF2D9B' : '#aaa'} />{p.likesCount || 0}
          </button>
          <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.63rem', color: '#bbb', display: 'flex', alignItems: 'center', gap: 4 }}><MessageCircle size={13} />{p.commentsCount || 0}</span>
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
function SubmitModal({ onClose, addProject }) {
  const [name, setName] = useState('')
  const [tagline, setTagline] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [liveUrl, setLiveUrl] = useState('')
  const [category, setCategory] = useState(projectCategories[1])
  const [description, setDescription] = useState('')
  const [techStack, setTechStack] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = {
        name,
        tagline,
        githubUrl,
        liveUrl,
        category,
        description,
        techStack: techStack.split(',').map(s => s.trim()).filter(Boolean),
        likesCount: 0,
        commentsCount: 0,
        published: true,
        accentColor: '#C8FF00'
      }
      await addProject(data, imageFile)
      onClose()
    } catch (err) {
      setError(err.message || "Failed to submit project")
    }
    setLoading(false)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, overflowY: 'auto' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="fade-up" style={{ background: '#F4F0E6', border: '2px solid #0A0A0A', boxShadow: '8px 8px 0 #0A0A0A', width: '100%', maxWidth: 520, padding: 32, marginTop: 20, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div><span className="section-number">SUBMIT /</span><h2 style={{ fontSize: '1.7rem', letterSpacing: '-0.02em', marginTop: 2 }}>SUBMIT PROJECT</h2></div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
        </div>
        
        {error && (
          <div style={{ padding: '8px', background: '#ffcccc', color: '#cc0000', border: '1px solid #cc0000', marginBottom: '16px', fontSize: '0.75rem', fontFamily: 'Courier New, monospace' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 5, textTransform: 'uppercase', color: '#888' }}>PROJECT NAME</div>
            <input className="input" placeholder="e.g. DevLink" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 5, textTransform: 'uppercase', color: '#888' }}>TAGLINE</div>
            <input className="input" placeholder="One-liner description" value={tagline} onChange={e => setTagline(e.target.value)} required />
          </div>
          <div>
            <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 5, textTransform: 'uppercase', color: '#888' }}>GITHUB URL</div>
            <input className="input" placeholder="https://github.com/..." type="url" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} required />
          </div>
          <div>
            <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 5, textTransform: 'uppercase', color: '#888' }}>LIVE URL (optional)</div>
            <input className="input" placeholder="https://..." type="url" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} />
          </div>
          <div>
            <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 5, textTransform: 'uppercase', color: '#888' }}>CATEGORY</div>
            <select className="input" style={{ cursor: 'pointer' }} value={category} onChange={e => setCategory(e.target.value)}>
              {projectCategories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 5, textTransform: 'uppercase', color: '#888' }}>DESCRIPTION</div>
            <textarea className="input" rows={3} placeholder="What does it do? What problem does it solve?" style={{ resize: 'vertical', lineHeight: 1.6 }} value={description} onChange={e => setDescription(e.target.value)} required />
          </div>
          <div>
            <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 5, textTransform: 'uppercase', color: '#888' }}>TECH STACK (comma-separated)</div>
            <input className="input" placeholder="React, Node.js, MongoDB…" value={techStack} onChange={e => setTechStack(e.target.value)} required />
          </div>
          <div>
            <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 5, textTransform: 'uppercase', color: '#888' }}>COVER IMAGE</div>
            <input type="file" ref={fileInputRef} accept="image/*" style={{ display: 'none' }} onChange={e => setImageFile(e.target.files[0])} />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="btn btn-outline" style={{ display: 'flex', gap: 6, fontSize: '0.68rem', padding: '10px 14px' }}>
              <Upload size={13} /> {imageFile ? imageFile.name : "UPLOAD IMAGE"}
            </button>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ justifyContent: 'center', padding: 12, marginTop: 4, fontSize: '0.78rem', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'SUBMITTING...' : 'SUBMIT PROJECT →'}
          </button>
        </form>
      </div>
    </div>
  )
}

/* ── ProjectsPage ── */
export default function ProjectsPage({ isLoggedIn, openLogin }) {
  const { projects, loading, error, addProject } = useProjects()
  const { user } = useAuth()
  const [activeCat, setActiveCat] = useState('All')
  const [submitOpen, setSubmitOpen] = useState(false)

  // Like logic placeholder since useProjects doesn't have it explicitly implemented yet
  const onLike = id => {
    if (!user) return alert("Log in to like")
    console.log("Toggle like", id)
  }
  
  const filtered = activeCat === 'All' ? projects : projects.filter(p => p.category === activeCat)

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
        {loading ? (
          <div style={{ padding: '56px 24px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.72rem', letterSpacing: '0.1em' }}>LOADING PROJECTS...</p>
          </div>
        ) : error ? (
          <div style={{ border: '2px solid #cc0000', background: '#ffcccc', padding: '24px', textAlign: 'center', color: '#cc0000' }}>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.72rem', letterSpacing: '0.1em' }}>FAILED TO LOAD PROJECTS.</p>
          </div>
        ) : filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px,1fr))', gap: 20, marginBottom: 48 }}>
            {filtered.map(p => <Card key={p.id} p={p} onLike={onLike} />)}
          </div>
        ) : (
          <div style={{ border: '2px solid #0A0A0A', padding: '56px 24px', textAlign: 'center', background: '#fbf7ef', marginBottom: 48 }}>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.72rem', color: '#aaa', letterSpacing: '0.1em' }}>NO PROJECTS FOUND</p>
          </div>
        )}

        {/* CTA */}
        <div style={{ borderTop: '2px solid #0A0A0A', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#aaa', letterSpacing: '0.12em', marginBottom: 6, textTransform: 'uppercase' }}>IDEAS → REALITY</p>
            <p style={{ fontSize: '1rem', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.2 }}>Have a project to share?<br />Show the community what you're building.</p>
          </div>
          <button className="btn btn-primary" style={{ fontSize: '0.75rem', padding: '12px 22px' }} onClick={isLoggedIn ? () => setSubmitOpen(true) : openLogin}><Plus size={13} />SUBMIT PROJECT</button>
        </div>
      </div>

      {submitOpen && <SubmitModal onClose={() => setSubmitOpen(false)} addProject={addProject} />}
    </div>
  )
}
