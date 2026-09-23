import { useState } from 'react'
import { Search, X, Heart, Share2, ExternalLink, Calendar, MapPin, Users, Trophy, Clock, ChevronDown, Filter } from 'lucide-react'
import { events, eventCategories, eventModes } from '../data/events'

const categoryColors = {
  Hackathon: '#BFFF00',
  Bootcamp: '#FF3CAC',
  Competition: '#FFE44D',
  Workshop: '#BFFF00',
  Webinar: '#FF3CAC',
  Internship: '#FFE44D',
}

function getDaysLeft(deadlineStr) {
  if (!deadlineStr) return null
  const parts = deadlineStr.replace(',', '').split(' ')
  const months = { Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11 }
  const month = months[parts[0]]
  const day = parseInt(parts[1])
  const year = parseInt(parts[2])
  if (isNaN(month) || isNaN(day) || isNaN(year)) return null
  const deadline = new Date(year, month, day)
  const now = new Date()
  const diff = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24))
  return diff
}

/* ─── Event Card ─── */
function EventCard({ event, onSelect, onSave, isSaved }) {
  const bg = categoryColors[event.category] || '#BFFF00'
  const daysLeft = getDaysLeft(event.registrationDeadline)

  return (
    <div
      className="card-brutal"
      style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
    >
      {/* Accent bar */}
      <div style={{ height: '5px', backgroundColor: bg, borderBottom: '2px solid #0A0A0A' }} />

      <div style={{ padding: '18px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Category + Mode row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
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
              fontSize: '0.56rem',
              fontWeight: 700,
              border: '1.5px solid #0A0A0A',
              padding: '2px 6px',
              letterSpacing: '0.08em',
              backgroundColor:
                event.mode === 'Offline' ? '#0A0A0A' :
                event.mode === 'Hybrid' ? '#FFE44D' : 'transparent',
              color: event.mode === 'Offline' ? 'white' : '#0A0A0A',
            }}
          >
            {event.mode}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 900,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
            marginBottom: '4px',
            cursor: 'pointer',
          }}
          onClick={() => onSelect(event)}
        >
          {event.title}
        </h3>

        {/* Organizer */}
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#888', marginBottom: '10px' }}>
          {event.organizer}
        </p>

        {/* Description */}
        <p style={{ fontSize: '0.78rem', color: '#555', lineHeight: 1.55, marginBottom: '14px', flexGrow: 1 }}>
          {event.shortDescription}
        </p>

        {/* Meta info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={11} color="#888" />
            <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#666' }}>{event.date}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={11} color="#888" />
            <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#666' }}>{event.location}</span>
          </div>
          {event.teamSize !== 'Individual' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={11} color="#888" />
              <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#666' }}>Team: {event.teamSize}</span>
            </div>
          )}
          {event.prizePool && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Trophy size={11} color="#FF3CAC" />
              <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#FF3CAC', fontWeight: 700 }}>
                {event.prizePool}
              </span>
            </div>
          )}
        </div>

        {/* Deadline indicator */}
        {daysLeft !== null && (
          <div
            style={{
              backgroundColor: daysLeft <= 0 ? '#333' : daysLeft <= 7 ? '#FF3CAC' : daysLeft <= 14 ? '#FFE44D' : '#f0ece4',
              border: '1.5px solid #0A0A0A',
              padding: '4px 10px',
              fontFamily: 'Courier New, monospace',
              fontSize: '0.58rem',
              fontWeight: 700,
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              color: daysLeft <= 7 && daysLeft > 0 ? 'white' : daysLeft <= 0 ? '#aaa' : '#0A0A0A',
            }}
          >
            <Clock size={10} />
            {daysLeft > 0
              ? `REG. CLOSES: ${event.registrationDeadline} · ${daysLeft}d left`
              : 'REGISTRATION CLOSED'}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn-black"
            style={{ flexGrow: 1, justifyContent: 'center', fontSize: '0.67rem', padding: '8px' }}
            onClick={() => onSelect(event)}
          >
            VIEW DETAILS →
          </button>
          <button
            onClick={() => onSave(event.id)}
            style={{
              border: '2.5px solid #0A0A0A',
              padding: '8px 12px',
              backgroundColor: isSaved ? '#FF3CAC' : 'transparent',
              cursor: 'pointer',
              boxShadow: '3px 3px 0px #0A0A0A',
              transition: 'background 0.15s, transform 0.1s',
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-1px,-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)' }}
          >
            <Heart size={15} color={isSaved ? 'white' : '#0A0A0A'} fill={isSaved ? 'white' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Event Detail Modal ─── */
function EventModal({ event, onClose, isSaved, onSave }) {
  const bg = categoryColors[event.category] || '#BFFF00'
  const daysLeft = getDaysLeft(event.registrationDeadline)
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: event.title, url: event.officialUrl })
    } else {
      navigator.clipboard.writeText(event.officialUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.65)',
        zIndex: 500,
        display: 'flex',
        alignItems: 'flex-start',
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
          maxWidth: '740px',
          marginTop: '20px',
          marginBottom: '20px',
          overflow: 'hidden',
        }}
      >
        {/* Banner */}
        <div
          style={{
            backgroundColor: bg,
            minHeight: '140px',
            borderBottom: '2.5px solid #0A0A0A',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '20px 24px',
            position: 'relative',
          }}
        >
          <div style={{ flex: 1, paddingRight: '40px' }}>
            <span
              style={{
                backgroundColor: '#0A0A0A',
                color: 'white',
                fontFamily: 'Courier New, monospace',
                fontSize: '0.58rem',
                fontWeight: 700,
                padding: '3px 10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '10px',
                display: 'inline-block',
              }}
            >
              {event.category}
            </span>
            <h2
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 2.1rem)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                color: '#0A0A0A',
                lineHeight: 1.1,
              }}
            >
              {event.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              backgroundColor: '#0A0A0A',
              border: 'none',
              padding: '7px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={17} color="white" />
          </button>
        </div>

        <div style={{ padding: '24px 28px' }}>
          {/* Organizer + meta tags */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              alignItems: 'center',
              marginBottom: '22px',
              paddingBottom: '20px',
              borderBottom: '2px solid #e0ddd5',
            }}
          >
            <div
              style={{
                backgroundColor: '#0A0A0A',
                color: 'white',
                fontFamily: 'Courier New, monospace',
                fontSize: '0.68rem',
                fontWeight: 700,
                padding: '5px 14px',
                letterSpacing: '0.06em',
              }}
            >
              {event.organizer}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Calendar size={13} color="#888" />
              <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.65rem', color: '#555' }}>
                {event.date}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={13} color="#888" />
              <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.65rem', color: '#555' }}>
                {event.location}
              </span>
            </div>
            <span
              style={{
                border: '1.5px solid #0A0A0A',
                fontFamily: 'Courier New, monospace',
                fontSize: '0.6rem',
                fontWeight: 700,
                padding: '3px 8px',
                letterSpacing: '0.06em',
              }}
            >
              {event.mode}
            </span>
          </div>

          {/* Main 2-col layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '24px', marginBottom: '22px' }}
            className="modal-grid"
          >
            <div>
              <p
                style={{
                  fontFamily: 'Courier New, monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.14em',
                  color: '#999',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                ABOUT THIS EVENT
              </p>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.68, color: '#444', marginBottom: '18px' }}>
                {event.description}
              </p>
              <p
                style={{
                  fontFamily: 'Courier New, monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.14em',
                  color: '#999',
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                ELIGIBILITY
              </p>
              <p style={{ fontSize: '0.86rem', color: '#444', lineHeight: 1.6 }}>
                {event.eligibility}
              </p>
            </div>

            {/* Info sidebar */}
            <div
              style={{
                border: '2px solid #0A0A0A',
                padding: '16px',
                backgroundColor: '#FBF7EF',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                alignSelf: 'flex-start',
              }}
            >
              {event.prizePool && (
                <div>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.56rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '3px' }}>
                    PRIZE POOL
                  </span>
                  <span style={{ fontWeight: 900, fontSize: '1.1rem', color: '#FF3CAC', letterSpacing: '-0.02em' }}>
                    {event.prizePool}
                  </span>
                </div>
              )}
              <div>
                <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.56rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '3px' }}>
                  TEAM SIZE
                </span>
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{event.teamSize}</span>
              </div>
              <div>
                <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.56rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '3px' }}>
                  REG. DEADLINE
                </span>
                <span
                  style={{
                    fontWeight: 700,
                    fontFamily: 'Courier New, monospace',
                    fontSize: '0.68rem',
                    color: daysLeft !== null && daysLeft <= 7 ? '#FF3CAC' : '#0A0A0A',
                    display: 'block',
                  }}
                >
                  {event.registrationDeadline}
                </span>
                {daysLeft !== null && daysLeft > 0 && (
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', color: '#FF3CAC' }}>
                    {daysLeft} days left
                  </span>
                )}
                {daysLeft !== null && daysLeft <= 0 && (
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', color: '#888' }}>
                    Closed
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Timeline */}
          {event.timeline && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', letterSpacing: '0.14em', color: '#999', marginBottom: '10px', textTransform: 'uppercase', fontWeight: 700 }}>
                TIMELINE
              </p>
              <div>
                {event.timeline.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: '14px',
                      alignItems: 'center',
                      padding: '8px 12px',
                      borderLeft: `3px solid ${bg}`,
                      borderBottom: i < event.timeline.length - 1 ? '1px dashed #ddd' : 'none',
                    }}
                  >
                    <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.62rem', color: '#888', minWidth: '130px' }}>
                      {item.date}
                    </span>
                    <span style={{ fontSize: '0.83rem', fontWeight: 600 }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rules */}
          {event.rules && (
            <div style={{ marginBottom: '22px' }}>
              <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', letterSpacing: '0.14em', color: '#999', marginBottom: '10px', textTransform: 'uppercase', fontWeight: 700 }}>
                RULES
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {event.rules.map((rule, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: '0.83rem',
                      color: '#444',
                      paddingLeft: '14px',
                      borderLeft: '3px solid #0A0A0A',
                      lineHeight: 1.5,
                    }}
                  >
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '22px' }}>
            {event.tags.map(tag => (
              <span
                key={tag}
                style={{
                  border: '1.5px solid #0A0A0A',
                  fontFamily: 'Courier New, monospace',
                  fontSize: '0.6rem',
                  fontWeight: 600,
                  padding: '3px 9px',
                  letterSpacing: '0.06em',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ borderTop: '2px solid #e0ddd5', paddingTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a
              href={event.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'flex', flexGrow: 1 }}
            >
              <button
                className="btn-primary"
                style={{ flexGrow: 1, justifyContent: 'center', fontSize: '0.78rem', padding: '12px 16px', gap: '8px' }}
              >
                <ExternalLink size={15} />
                VISIT OFFICIAL WEBSITE ↗
              </button>
            </a>
            <button
              onClick={() => onSave(event.id)}
              className="btn-outline"
              style={{ gap: '6px', fontSize: '0.7rem', padding: '10px 14px' }}
            >
              <Heart size={14} fill={isSaved ? '#FF3CAC' : 'none'} color={isSaved ? '#FF3CAC' : '#0A0A0A'} />
              {isSaved ? 'SAVED' : 'SAVE'}
            </button>
            <button
              onClick={handleShare}
              className="btn-outline"
              style={{ gap: '6px', fontSize: '0.7rem', padding: '10px 14px' }}
            >
              <Share2 size={14} />
              {copied ? 'COPIED!' : 'SHARE'}
            </button>
          </div>

          {/* Demo note */}
          <div
            style={{
              marginTop: '14px',
              backgroundColor: '#FFE44D',
              border: '2px solid #0A0A0A',
              padding: '8px 12px',
              fontFamily: 'Courier New, monospace',
              fontSize: '0.62rem',
              fontWeight: 700,
            }}
          >
            ↗ External links open the official event platform. Registration is handled there.
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .modal-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

/* ─── EventsPage ─── */
export default function EventsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [mode, setMode] = useState('All Modes')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [savedEvents, setSavedEvents] = useState(new Set())

  const toggleSave = (id) => {
    setSavedEvents(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filtered = events.filter(e => {
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      e.title.toLowerCase().includes(q) ||
      e.organizer.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      e.tags.some(t => t.toLowerCase().includes(q)) ||
      e.shortDescription.toLowerCase().includes(q)

    const matchCategory =
      category === 'All' ||
      (category === 'Hackathons' && e.category === 'Hackathon') ||
      (category === 'Bootcamps' && e.category === 'Bootcamp') ||
      (category === 'Workshops' && e.category === 'Workshop') ||
      (category === 'Competitions' && e.category === 'Competition') ||
      (category === 'Webinars' && e.category === 'Webinar') ||
      (category === 'Internships' && e.category === 'Internship')

    const matchMode = mode === 'All Modes' || e.mode === mode

    return matchSearch && matchCategory && matchMode
  })

  const hasFilters = category !== 'All' || mode !== 'All Modes' || search !== ''

  return (
    <div>
      {/* ─── Header ─── */}
      <div style={{ borderBottom: '2.5px solid #0A0A0A', padding: '44px 24px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="section-number">01 /</span>
            <h1
              style={{
                fontSize: 'clamp(2.8rem, 7vw, 5rem)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 0.92,
                marginTop: '4px',
              }}
            >
              EVENTS
            </h1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
            <div className="sticky-note">
              OPPORTUNITIES<br />DON'T WAIT.
            </div>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.68rem', color: '#666', maxWidth: '380px', textAlign: 'right', lineHeight: 1.5 }}>
              Discover hackathons, bootcamps, workshops, competitions and more from 20+ platforms.
            </p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <Search size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
          <input
            className="input-brutal"
            placeholder="Search hackathons, bootcamps, workshops, organizers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: '42px', fontSize: '0.82rem' }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={15} color="#888" />
            </button>
          )}
        </div>

        {/* Filter row */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Category tabs – scroll on mobile */}
          <div
            style={{ display: 'flex', gap: '6px', overflowX: 'auto', flexGrow: 1, paddingBottom: '4px' }}
            className="scrollbar-hide"
          >
            {eventCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  border: '2.5px solid #0A0A0A',
                  padding: '6px 14px',
                  fontFamily: 'Courier New, monospace',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  backgroundColor: category === cat ? '#0A0A0A' : 'transparent',
                  color: category === cat ? 'white' : '#0A0A0A',
                  boxShadow: category === cat ? '3px 3px 0px #BFFF00' : '2px 2px 0px #0A0A0A',
                  transition: 'all 0.1s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mode select */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <select
              value={mode}
              onChange={e => setMode(e.target.value)}
              style={{
                border: '2.5px solid #0A0A0A',
                backgroundColor: '#F5F0E8',
                padding: '6px 30px 6px 12px',
                fontFamily: 'Courier New, monospace',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                appearance: 'none',
                boxShadow: '2px 2px 0px #0A0A0A',
                minWidth: '120px',
                outline: 'none',
              }}
            >
              {eventModes.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <ChevronDown size={12} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>
        </div>

        {/* Result count + clear */}
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.65rem', color: '#888', letterSpacing: '0.08em' }}>
            <strong style={{ color: '#0A0A0A' }}>{filtered.length}</strong> EVENT{filtered.length !== 1 ? 'S' : ''} FOUND
          </span>
          {hasFilters && (
            <button
              onClick={() => { setCategory('All'); setMode('All Modes'); setSearch('') }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Courier New, monospace',
                fontSize: '0.62rem',
                fontWeight: 700,
                color: '#FF3CAC',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              <X size={12} /> CLEAR FILTERS
            </button>
          )}
        </div>

        {/* Cards grid */}
        {filtered.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px',
              marginBottom: '40px',
            }}
          >
            {filtered.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onSelect={setSelectedEvent}
                onSave={toggleSave}
                isSaved={savedEvents.has(event.id)}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              border: '2.5px solid #0A0A0A',
              padding: '60px 24px',
              textAlign: 'center',
              backgroundColor: '#FBF7EF',
            }}
          >
            <div
              style={{
                fontFamily: 'Courier New, monospace',
                fontSize: '2rem',
                fontWeight: 900,
                color: '#ddd',
                marginBottom: '12px',
              }}
            >
              ∅
            </div>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.75rem', color: '#888', letterSpacing: '0.1em' }}>
              NO EVENTS FOUND. TRY ADJUSTING YOUR FILTERS.
            </p>
          </div>
        )}

        {/* Saved section */}
        {savedEvents.size > 0 && (
          <div
            style={{
              marginTop: '16px',
              borderTop: '2.5px solid #0A0A0A',
              paddingTop: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <Heart size={16} color="#FF3CAC" fill="#FF3CAC" />
            <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.65rem', color: '#666', letterSpacing: '0.08em' }}>
              {savedEvents.size} event{savedEvents.size !== 1 ? 's' : ''} saved
            </span>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          isSaved={savedEvents.has(selectedEvent.id)}
          onSave={toggleSave}
        />
      )}
    </div>
  )
}
