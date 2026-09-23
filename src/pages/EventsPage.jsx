import { useState } from 'react'
import { Search, X, Heart, Share2, ExternalLink, Calendar, MapPin, Users, Trophy, Clock, ChevronDown } from 'lucide-react'
import { eventCategories, eventModes } from '../data/events' // We still use these static filter categories
import { useEvents } from '../hooks/useEvents'
import { useAuth } from '../context/AuthContext'

const CAT_COLOR = { Hackathon:'#C8FF00', Bootcamp:'#FF2D9B', Competition:'#FFE040', Workshop:'#C8FF00', Webinar:'#FF2D9B', Internship:'#FFE040' }

function daysLeft(str) {
  if (!str) return null
  const parts = str.replace(',','').split(' ')
  if (parts.length < 3) return null
  const mon = { Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11 }
  const d = new Date(+parts[2], mon[parts[0]], +parts[1])
  if (isNaN(d.getTime())) return null
  return Math.ceil((d - new Date()) / 86400000)
}

/* ── EventCard ── */
function EventCard({ ev, onSelect, onSave, onUnsave, saved }) {
  const bg  = CAT_COLOR[ev.category] || '#C8FF00'
  const dl  = daysLeft(ev.registrationDeadline)
  const dlColor = dl <= 0 ? '#555' : dl <= 7 ? '#FF2D9B' : dl <= 14 ? '#FFE040' : '#eae6dc'
  const dlText  = dl > 0 ? `Reg. closes ${ev.registrationDeadline} · ${dl}d left` : 'Registration closed'

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ height: 4, background: bg }} />
      <div style={{ padding: 18, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ background: bg, border: '2px solid #0A0A0A', fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '2px 8px' }}>{ev.category}</span>
          <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.56rem', fontWeight: 700, border: '1.5px solid #0A0A0A', padding: '2px 7px', background: ev.mode === 'Offline' ? '#0A0A0A' : ev.mode === 'Hybrid' ? '#FFE040' : 'transparent', color: ev.mode === 'Offline' ? 'white' : '#0A0A0A' }}>{ev.mode}</span>
        </div>

        <h3 style={{ fontSize: '0.97rem', lineHeight: 1.25, marginBottom: 4, cursor: 'pointer' }} onClick={() => onSelect(ev)}>{ev.title}</h3>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#888', marginBottom: 10 }}>{ev.organizer}</p>
        <p style={{ fontSize: '0.78rem', color: '#555', lineHeight: 1.55, flexGrow: 1, marginBottom: 14 }}>{ev.shortDescription}</p>

        {/* meta */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
          {[
            [Calendar, ev.date],
            [MapPin, ev.location],
            ev.teamSize !== 'Individual' ? [Users, `Team: ${ev.teamSize}`] : null,
          ].filter(Boolean).map(([Icon, text], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon size={11} color="#aaa" />
              <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#666' }}>{text}</span>
            </div>
          ))}
          {ev.prizePool && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Trophy size={11} color="#FF2D9B" />
              <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, color: '#FF2D9B' }}>{ev.prizePool}</span>
            </div>
          )}
        </div>

        {/* deadline pill */}
        {dl !== null && (
          <div style={{ background: dlColor, border: '1.5px solid #0A0A0A', padding: '4px 9px', fontFamily: 'Courier New, monospace', fontSize: '0.57rem', fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 5, color: dl > 0 && dl <= 7 ? 'white' : '#0A0A0A' }}>
            <Clock size={10} />{dlText}
          </div>
        )}

        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-black" style={{ flexGrow: 1, justifyContent: 'center', fontSize: '0.65rem', padding: 8 }} onClick={() => onSelect(ev)}>VIEW DETAILS →</button>
          <button onClick={() => saved ? onUnsave(ev.id) : onSave(ev.id)}
            style={{ border: '2px solid #0A0A0A', padding: '8px 12px', background: saved ? '#FF2D9B' : 'transparent', cursor: 'pointer', boxShadow: '3px 3px 0 #0A0A0A', display: 'flex', alignItems: 'center', transition: 'background 0.15s' }}>
            <Heart size={15} color={saved ? 'white' : '#0A0A0A'} fill={saved ? 'white' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── EventModal ── */
function EventModal({ ev, onClose, saved, onSave, onUnsave }) {
  const bg = CAT_COLOR[ev.category] || '#C8FF00'
  const dl = daysLeft(ev.registrationDeadline)
  const [copied, setCopied] = useState(false)

  const share = () => {
    navigator.clipboard?.writeText(ev.officialUrl || window.location.href)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  const handleSaveToggle = () => saved ? onUnsave(ev.id) : onSave(ev.id)

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 500, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 16, overflowY: 'auto' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="fade-up" style={{ background: '#F4F0E6', border: '2px solid #0A0A0A', boxShadow: '8px 8px 0 #0A0A0A', width: '100%', maxWidth: 700, marginTop: 20, marginBottom: 20, overflow: 'hidden' }}>

        {/* Banner */}
        <div style={{ background: bg, minHeight: 130, borderBottom: '2px solid #0A0A0A', padding: '20px 24px', display: 'flex', alignItems: 'flex-end', position: 'relative' }}>
          <div style={{ flex: 1, paddingRight: 40 }}>
            <span style={{ background: '#0A0A0A', color: 'white', fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 700, padding: '3px 10px', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'inline-block', marginBottom: 8 }}>{ev.category}</span>
            <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)', letterSpacing: '-0.02em', color: '#0A0A0A', lineHeight: 1.1 }}>{ev.title}</h2>
          </div>
          <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, background: '#0A0A0A', border: 'none', padding: 7, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <X size={16} color="white" />
          </button>
        </div>

        <div style={{ padding: '24px 28px' }}>
          {/* Organiser row */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20, paddingBottom: 18, borderBottom: '1.5px solid #e5e1d8' }}>
            <span style={{ background: '#0A0A0A', color: 'white', fontFamily: 'Courier New, monospace', fontSize: '0.66rem', fontWeight: 700, padding: '4px 12px' }}>{ev.organizer}</span>
            <Row icon={Calendar}>{ev.date}</Row>
            <Row icon={MapPin}>{ev.location}</Row>
            <span style={{ border: '1.5px solid #0A0A0A', fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 700, padding: '3px 8px' }}>{ev.mode}</span>
          </div>

          {/* 2-col */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 190px', gap: 24, marginBottom: 20 }} className="modal-grid">
            <div>
              <SLabel>About This Event</SLabel>
              <p style={{ fontSize: '0.86rem', lineHeight: 1.68, color: '#444', marginBottom: 16 }}>{ev.description}</p>
              <SLabel>Eligibility</SLabel>
              <p style={{ fontSize: '0.84rem', color: '#444', lineHeight: 1.6 }}>{ev.eligibility}</p>
            </div>
            <div style={{ border: '2px solid #0A0A0A', padding: 16, background: '#fbf7ef', display: 'flex', flexDirection: 'column', gap: 14, alignSelf: 'flex-start' }}>
              {ev.prizePool && <InfoBlock label="PRIZE POOL"><span style={{ fontWeight: 900, fontSize: '1.05rem', color: '#FF2D9B' }}>{ev.prizePool}</span></InfoBlock>}
              <InfoBlock label="TEAM SIZE"><span style={{ fontWeight: 700 }}>{ev.teamSize}</span></InfoBlock>
              <InfoBlock label="REG. DEADLINE">
                <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.67rem', fontWeight: 700, color: dl !== null && dl <= 7 ? '#FF2D9B' : '#0A0A0A' }}>
                  {ev.registrationDeadline}
                  {dl !== null && <span style={{ display: 'block', fontSize: '0.56rem', color: '#FF2D9B' }}>{dl > 0 ? `${dl} days left` : 'Closed'}</span>}
                </span>
              </InfoBlock>
            </div>
          </div>

          {/* Timeline */}
          {ev.timeline && <>
            <SLabel>Timeline</SLabel>
            <div style={{ marginBottom: 18 }}>
              {ev.timeline.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '7px 12px', borderLeft: `3px solid ${bg}`, borderBottom: i < ev.timeline.length - 1 ? '1px dashed #ddd' : 'none' }}>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#999', minWidth: 120 }}>{t.date}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{t.label}</span>
                </div>
              ))}
            </div>
          </>}

          {/* Rules */}
          {ev.rules && <>
            <SLabel>Rules</SLabel>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 18 }}>
              {ev.rules.map((r, i) => (
                <li key={i} style={{ fontSize: '0.82rem', color: '#444', paddingLeft: 12, borderLeft: '3px solid #0A0A0A', lineHeight: 1.5 }}>{r}</li>
              ))}
            </ul>
          </>}

          {/* Tags */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
            {ev.tags && ev.tags.map(t => <span key={t} style={{ border: '1.5px solid #0A0A0A', fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 600, padding: '3px 8px' }}>#{t}</span>)}
          </div>

          {/* Actions */}
          <div style={{ borderTop: '1.5px solid #e5e1d8', paddingTop: 18, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {ev.officialUrl && (
              <button className="btn btn-primary" style={{ flexGrow: 1, justifyContent: 'center', fontSize: '0.76rem', padding: 12, gap: 8 }} onClick={() => window.open(ev.officialUrl, '_blank', 'noopener,noreferrer')}>
                <ExternalLink size={14} /> VISIT OFFICIAL WEBSITE ↗
              </button>
            )}
            <button className="btn btn-outline" style={{ gap: 6, fontSize: '0.68rem', padding: '10px 14px' }} onClick={handleSaveToggle}>
              <Heart size={13} fill={saved ? '#FF2D9B' : 'none'} color={saved ? '#FF2D9B' : '#0A0A0A'} />{saved ? 'SAVED' : 'SAVE'}
            </button>
            <button className="btn btn-outline" style={{ gap: 6, fontSize: '0.68rem', padding: '10px 14px' }} onClick={share}>
              <Share2 size={13} />{copied ? 'COPIED!' : 'SHARE'}
            </button>
          </div>
        </div>
      </div>
      <style>{`.modal-grid { } @media(max-width:560px){.modal-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  )
}

function Row({ icon: Icon, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <Icon size={12} color="#aaa" />
      <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.63rem', color: '#555' }}>{children}</span>
    </div>
  )
}
function SLabel({ children }) {
  return <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', letterSpacing: '0.14em', color: '#aaa', marginBottom: 7, textTransform: 'uppercase', fontWeight: 700 }}>{children}</p>
}
function InfoBlock({ label, children }) {
  return (
    <div>
      <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.54rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 3 }}>{label}</span>
      {children}
    </div>
  )
}

/* ── EventsPage ── */
export default function EventsPage({ navigate }) {
  const { events, loading, error, saveEvent, unsaveEvent, savedEvents } = useEvents()
  const { user } = useAuth()
  
  const [search, setSearch]   = useState('')
  const [cat, setCat]         = useState('All')
  const [mode, setMode]       = useState('All Modes')
  const [selected, setSelected] = useState(null)

  const handleSave = id => {
    if (!user) return alert("Please log in to save events.")
    saveEvent(id)
  }
  
  const handleUnsave = id => {
    if (!user) return alert("Please log in to save events.")
    unsaveEvent(id)
  }

  const filtered = events.filter(e => {
    const q = search.toLowerCase()
    const ms = !q || [e.title, e.organizer, e.category, ...(e.tags || []), e.shortDescription].some(v => v?.toLowerCase().includes(q))
    const mc = cat === 'All' || (cat === 'Hackathons' && e.category === 'Hackathon') || (cat === 'Bootcamps' && e.category === 'Bootcamp') || (cat === 'Workshops' && e.category === 'Workshop') || (cat === 'Competitions' && e.category === 'Competition') || (cat === 'Webinars' && e.category === 'Webinar') || (cat === 'Internships' && e.category === 'Internship')
    const mm = mode === 'All Modes' || e.mode === mode
    return ms && mc && mm
  })

  return (
    <div>
      {/* Header */}
      <div style={{ borderBottom: '2px solid #0A0A0A', padding: '48px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="section-number">01 /</span>
            <h1 style={{ fontSize: 'clamp(2.8rem, 7vw, 4.8rem)', letterSpacing: '-0.04em', lineHeight: 0.92, marginTop: 4 }}>EVENTS</h1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <div className="sticker" style={{ transform: 'rotate(-2deg)', fontSize: '0.65rem' }}>OPPORTUNITIES<br />DON'T WAIT.</div>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.65rem', color: '#888', maxWidth: 340, textAlign: 'right', lineHeight: 1.6 }}>
              Discover hackathons, bootcamps, workshops & more from 20+ platforms.
            </p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 60px' }}>
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <Search size={14} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: '#bbb' }} />
          <input className="input" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search hackathons, bootcamps, workshops, organizers…" style={{ paddingLeft: 40 }} />
          {search && <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}><X size={14} color="#aaa" /></button>}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', flexGrow: 1, paddingBottom: 2 }} className="no-scroll">
            {eventCategories.map(c => (
              <button key={c} onClick={() => setCat(c)}
                style={{ border: '2px solid #0A0A0A', padding: '5px 13px', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap', background: cat === c ? '#0A0A0A' : 'transparent', color: cat === c ? 'white' : '#0A0A0A', boxShadow: cat === c ? '3px 3px 0 #C8FF00' : '2px 2px 0 #0A0A0A', transition: 'all 0.1s' }}>{c}</button>
            ))}
          </div>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <select value={mode} onChange={e => setMode(e.target.value)}
              style={{ border: '2px solid #0A0A0A', background: '#F4F0E6', padding: '6px 28px 6px 11px', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', appearance: 'none', boxShadow: '2px 2px 0 #0A0A0A', minWidth: 120, outline: 'none' }}>
              {eventModes.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <ChevronDown size={11} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>
        </div>

        {/* Count + clear */}
        <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.62rem', color: '#888' }}>
            <strong style={{ color: '#0A0A0A' }}>{filtered.length}</strong> event{filtered.length !== 1 ? 's' : ''} found
          </span>
          {(cat !== 'All' || mode !== 'All Modes' || search) && (
            <button onClick={() => { setCat('All'); setMode('All Modes'); setSearch('') }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, color: '#FF2D9B', display: 'flex', alignItems: 'center', gap: 4, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              <X size={11} /> CLEAR
            </button>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ padding: '56px 24px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.72rem', letterSpacing: '0.1em' }}>LOADING EVENTS...</p>
          </div>
        ) : error ? (
          <div style={{ border: '2px solid #cc0000', background: '#ffcccc', padding: '24px', textAlign: 'center', color: '#cc0000' }}>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.72rem', letterSpacing: '0.1em' }}>FAILED TO LOAD EVENTS.</p>
          </div>
        ) : filtered.length > 0
          ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(295px,1fr))', gap: 20 }}>
              {filtered.map(ev => <EventCard key={ev.id} ev={ev} onSelect={setSelected} onSave={handleSave} onUnsave={handleUnsave} saved={savedEvents.has(ev.id)} />)}
            </div>
          : <div style={{ border: '2px solid #0A0A0A', padding: '56px 24px', textAlign: 'center', background: '#fbf7ef' }}>
              <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.72rem', color: '#aaa', letterSpacing: '0.1em' }}>NO EVENTS FOUND — try adjusting your filters.</p>
            </div>
        }
      </div>

      {selected && <EventModal ev={selected} onClose={() => setSelected(null)} saved={savedEvents.has(selected.id)} onSave={handleSave} onUnsave={handleUnsave} />}
    </div>
  )
}
