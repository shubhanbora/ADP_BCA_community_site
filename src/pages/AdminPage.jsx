import { useState, useEffect } from 'react'
import {
  collection, getDocs, addDoc, deleteDoc,
  doc, getCountFromServer, query, orderBy, limit,
} from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import { Plus, Trash2, Users, Calendar, Code2, X, ChevronDown, ExternalLink } from 'lucide-react'

/* ── Admin emails allowed ── */
const ADMIN_EMAILS = ['shubhan121b@gmail.com']

const CAT_COLORS = {
  Hackathon: '#C8FF00', Bootcamp: '#FF2D9B', Competition: '#FFE040',
  Workshop: '#C8FF00', Webinar: '#FF2D9B', Internship: '#FFE040',
}

/* ── Stat Card ── */
function StatCard({ icon: Icon, value, label, accent }) {
  return (
    <div style={{ border: '2px solid #0A0A0A', boxShadow: '4px 4px 0 #0A0A0A', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, background: '#F4F0E6' }}>
      <div style={{ width: 48, height: 48, background: accent, border: '2px solid #0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={22} />
      </div>
      <div>
        <div style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>{value}</div>
        <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', color: '#888', textTransform: 'uppercase', marginTop: 2 }}>{label}</div>
      </div>
    </div>
  )
}

/* ── Add Event Modal ── */
function AddEventModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    title: '', organizer: '', category: 'Hackathon', mode: 'Online',
    date: '', location: '', teamSize: 'Individual', prizePool: '',
    shortDescription: '', description: '', eligibility: '',
    registrationDeadline: '', officialUrl: '',
    tags: '', featured: false,
  })
  const [saving, setSaving] = useState(false)

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSave = async () => {
    if (!form.title || !form.organizer || !form.officialUrl) {
      alert('Title, organiser and official URL are required.')
      return
    }
    setSaving(true)
    try {
      await onSave({
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        createdAt: new Date().toISOString(),
      })
      onClose()
    } catch (e) {
      alert('Failed to add event: ' + e.message)
    }
    setSaving(false)
  }

  const fields = [
    { label: 'Event Title *', key: 'title', placeholder: 'e.g. Hack2Skill AI Hackathon 2026' },
    { label: 'Organiser *', key: 'organizer', placeholder: 'e.g. Hack2Skill' },
    { label: 'Official URL *', key: 'officialUrl', placeholder: 'https://hack2skill.com' },
    { label: 'Date', key: 'date', placeholder: 'e.g. Oct 15 – 20, 2026' },
    { label: 'Location', key: 'location', placeholder: 'Online / City' },
    { label: 'Team Size', key: 'teamSize', placeholder: 'e.g. 2–4 or Individual' },
    { label: 'Prize Pool', key: 'prizePool', placeholder: 'e.g. ₹5,00,000 (leave blank if none)' },
    { label: 'Registration Deadline', key: 'registrationDeadline', placeholder: 'e.g. Oct 10, 2026' },
    { label: 'Tags (comma-separated)', key: 'tags', placeholder: 'AI, Hackathon, Students' },
  ]

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 500, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 16, overflowY: 'auto' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="fade-up" style={{ background: '#F4F0E6', border: '2px solid #0A0A0A', boxShadow: '8px 8px 0 #0A0A0A', width: '100%', maxWidth: 580, marginTop: 20, marginBottom: 20 }}>
        <div style={{ height: 4, background: '#C8FF00' }} />
        <div style={{ padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <span className="section-number">ADD /</span>
              <h2 style={{ fontSize: '1.6rem', letterSpacing: '-0.02em', marginTop: 2 }}>ADD EVENT</h2>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Category + Mode */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <FLabel>CATEGORY</FLabel>
                <div style={{ position: 'relative' }}>
                  <select className="input" value={form.category} onChange={e => set('category', e.target.value)} style={{ appearance: 'none', cursor: 'pointer' }}>
                    {['Hackathon','Bootcamp','Workshop','Competition','Webinar','Internship'].map(c => <option key={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={12} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                </div>
              </div>
              <div>
                <FLabel>MODE</FLabel>
                <div style={{ position: 'relative' }}>
                  <select className="input" value={form.mode} onChange={e => set('mode', e.target.value)} style={{ appearance: 'none', cursor: 'pointer' }}>
                    {['Online','Offline','Hybrid'].map(m => <option key={m}>{m}</option>)}
                  </select>
                  <ChevronDown size={12} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                </div>
              </div>
            </div>

            {/* All text fields */}
            {fields.map(f => (
              <div key={f.key}>
                <FLabel>{f.label}</FLabel>
                <input className="input" placeholder={f.placeholder} value={form[f.key]} onChange={e => set(f.key, e.target.value)} />
              </div>
            ))}

            {/* Short description */}
            <div>
              <FLabel>SHORT DESCRIPTION</FLabel>
              <input className="input" placeholder="One-liner shown on card" value={form.shortDescription} onChange={e => set('shortDescription', e.target.value)} />
            </div>

            {/* Full description */}
            <div>
              <FLabel>FULL DESCRIPTION</FLabel>
              <textarea className="input" rows={3} placeholder="Detailed description shown in modal" value={form.description} onChange={e => set('description', e.target.value)} style={{ resize: 'vertical', lineHeight: 1.6 }} />
            </div>

            {/* Eligibility */}
            <div>
              <FLabel>ELIGIBILITY</FLabel>
              <input className="input" placeholder="e.g. Open to all college students" value={form.eligibility} onChange={e => set('eligibility', e.target.value)} />
            </div>

            {/* Featured toggle */}
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontFamily: 'Courier New, monospace', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)}
                style={{ width: 16, height: 16, accentColor: '#C8FF00', cursor: 'pointer' }} />
              MARK AS FEATURED
            </label>

            <button className="btn btn-primary" onClick={handleSave} disabled={saving}
              style={{ justifyContent: 'center', padding: 12, fontSize: '0.78rem', marginTop: 4, opacity: saving ? 0.7 : 1 }}>
              {saving ? 'SAVING…' : 'ADD EVENT →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function FLabel({ children }) {
  return <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 5, textTransform: 'uppercase', color: '#888' }}>{children}</div>
}

/* ═══════════════════════════════
   AdminPage
════════════════════════════════ */
export default function AdminPage({ navigate }) {
  const { user } = useAuth()
  const [stats, setStats]         = useState({ users: '…', events: '…', projects: '…' })
  const [users, setUsers]         = useState([])
  const [events, setEvents]       = useState([])
  const [addEventOpen, setAddEventOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('DASHBOARD')
  const [deleting, setDeleting]   = useState(null)

  /* Access check */
  const isAdmin = user && ADMIN_EMAILS.includes(user.email)

  /* Load stats */
  useEffect(() => {
    if (!isAdmin) return
    Promise.all([
      getCountFromServer(collection(db, 'users')),
      getCountFromServer(collection(db, 'events')),
      getCountFromServer(collection(db, 'projects')),
    ]).then(([u, e, p]) => setStats({
      users:    u.data().count,
      events:   e.data().count,
      projects: p.data().count,
    }))
  }, [isAdmin])

  /* Load users list */
  useEffect(() => {
    if (!isAdmin || activeTab !== 'USERS') return
    getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc'), limit(50)))
      .then(snap => setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
  }, [isAdmin, activeTab])

  /* Load events list */
  useEffect(() => {
    if (!isAdmin || activeTab !== 'EVENTS') return
    getDocs(query(collection(db, 'events'), orderBy('createdAt', 'desc')))
      .then(snap => setEvents(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
  }, [isAdmin, activeTab])

  const handleAddEvent = async (data) => {
    const ref = await addDoc(collection(db, 'events'), data)
    setEvents(prev => [{ id: ref.id, ...data }, ...prev])
    setStats(s => ({ ...s, events: s.events + 1 }))
  }

  const handleDeleteEvent = async (id) => {
    if (!confirm('Delete this event?')) return
    setDeleting(id)
    await deleteDoc(doc(db, 'events', id))
    setEvents(prev => prev.filter(e => e.id !== id))
    setStats(s => ({ ...s, events: Math.max(0, s.events - 1) }))
    setDeleting(null)
  }

  /* Not admin */
  if (!user) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center', maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>Please log in.</h2>
      </div>
    )
  }
  if (!isAdmin) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center', maxWidth: 1200, margin: '0 auto' }}>
        <span className="section-number">403 /</span>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: 4 }}>ACCESS DENIED</h2>
        <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.72rem', color: '#888', marginTop: 12 }}>
          This page is restricted to admins only.
        </p>
        <button className="btn btn-black" style={{ marginTop: 24 }} onClick={() => navigate('home')}>← GO HOME</button>
      </div>
    )
  }

  const TABS = ['DASHBOARD', 'EVENTS', 'USERS']

  return (
    <div>
      {/* Header */}
      <div style={{ borderBottom: '2px solid #0A0A0A', padding: '40px 24px', maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <span className="section-number">ADMIN /</span>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.92, marginTop: 4 }}>ADMIN PANEL</h1>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.65rem', color: '#888', marginTop: 8 }}>
            Logged in as <strong>{user.email}</strong>
          </p>
        </div>
        <div style={{ background: '#FFE040', border: '2px solid #0A0A0A', boxShadow: '3px 3px 0 #0A0A0A', padding: '8px 14px', fontFamily: 'Courier New, monospace', fontSize: '0.65rem', fontWeight: 700, transform: 'rotate(-1.5deg)' }}>
          ADMIN<br />ACCESS
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 60px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '2px solid #0A0A0A', marginBottom: 28 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              style={{ border: 'none', borderBottom: activeTab === t ? '3px solid #C8FF00' : '3px solid transparent', padding: '12px 20px', fontFamily: 'Courier New, monospace', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', cursor: 'pointer', background: activeTab === t ? '#C8FF00' : 'transparent', transition: 'background 0.15s' }}>
              {t}
            </button>
          ))}
        </div>

        {/* ── DASHBOARD TAB ── */}
        {activeTab === 'DASHBOARD' && (
          <div className="fade-up">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: 20, marginBottom: 32 }}>
              <StatCard icon={Users}    value={stats.users}    label="Total Members"  accent="#C8FF00" />
              <StatCard icon={Calendar} value={stats.events}   label="Total Events"   accent="#FF2D9B" />
              <StatCard icon={Code2}    value={stats.projects} label="Total Projects"  accent="#FFE040" />
            </div>
            <div style={{ border: '2px solid #0A0A0A', padding: 20, background: '#FBF7EF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.62rem', color: '#888', marginBottom: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Quick Actions</p>
                <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>Add a new event to the discovery platform</p>
              </div>
              <button className="btn btn-black" style={{ gap: 7 }} onClick={() => { setActiveTab('EVENTS'); setAddEventOpen(true) }}>
                <Plus size={14} /> ADD EVENT
              </button>
            </div>
          </div>
        )}

        {/* ── EVENTS TAB ── */}
        {activeTab === 'EVENTS' && (
          <div className="fade-up">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.65rem', color: '#888' }}>
                <strong style={{ color: '#0A0A0A' }}>{events.length}</strong> events loaded
              </span>
              <button className="btn btn-black" style={{ gap: 7 }} onClick={() => setAddEventOpen(true)}>
                <Plus size={14} /> ADD EVENT
              </button>
            </div>

            {events.length === 0 ? (
              <div style={{ border: '2px solid #0A0A0A', padding: '48px 24px', textAlign: 'center', background: '#FBF7EF' }}>
                <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.72rem', color: '#aaa', letterSpacing: '0.1em' }}>NO EVENTS YET. ADD ONE ABOVE.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '2px solid #0A0A0A' }}>
                {events.map((ev, i) => {
                  const bg = CAT_COLORS[ev.category] || '#C8FF00'
                  return (
                    <div key={ev.id}
                      style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderBottom: i < events.length - 1 ? '1px solid #e5e1d8' : 'none', transition: 'background 0.1s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#FBF7EF'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <span style={{ background: bg, border: '1.5px solid #0A0A0A', fontFamily: 'Courier New, monospace', fontSize: '0.54rem', fontWeight: 700, padding: '2px 7px', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }}>{ev.category}</span>
                      <div style={{ flexGrow: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.title}</div>
                        <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', color: '#888' }}>{ev.organizer} · {ev.date}</div>
                      </div>
                      <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', color: '#aaa', flexShrink: 0 }}>{ev.mode}</span>
                      {ev.officialUrl && (
                        <a href={ev.officialUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#888', flexShrink: 0 }}>
                          <ExternalLink size={14} />
                        </a>
                      )}
                      <button onClick={() => handleDeleteEvent(ev.id)} disabled={deleting === ev.id}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FF2D9B', flexShrink: 0, opacity: deleting === ev.id ? 0.5 : 1 }}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ── USERS TAB ── */}
        {activeTab === 'USERS' && (
          <div className="fade-up">
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.65rem', color: '#888' }}>
                Showing last <strong style={{ color: '#0A0A0A' }}>50</strong> registered users
              </span>
            </div>
            {users.length === 0 ? (
              <div style={{ border: '2px solid #0A0A0A', padding: '48px 24px', textAlign: 'center', background: '#FBF7EF' }}>
                <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.72rem', color: '#aaa', letterSpacing: '0.1em' }}>LOADING USERS…</p>
              </div>
            ) : (
              <div style={{ border: '2px solid #0A0A0A' }}>
                {/* Table header */}
                <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr 120px 100px', gap: 0, padding: '10px 18px', background: '#0A0A0A', borderBottom: '2px solid #0A0A0A' }}>
                  {['#', 'NAME', 'EMAIL', 'JOINED', 'STATUS'].map(h => (
                    <span key={h} style={{ fontFamily: 'Courier New, monospace', fontSize: '0.56rem', fontWeight: 700, letterSpacing: '0.1em', color: '#C8FF00', textTransform: 'uppercase' }}>{h}</span>
                  ))}
                </div>
                {users.map((u, i) => (
                  <div key={u.id}
                    style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr 120px 100px', gap: 0, padding: '12px 18px', borderBottom: i < users.length - 1 ? '1px solid #e5e1d8' : 'none', alignItems: 'center', transition: 'background 0.1s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#FBF7EF'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#aaa' }}>{i + 1}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                      {u.photoURL
                        ? <img src={u.photoURL} referrerPolicy="no-referrer" alt="" style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid #0A0A0A', flexShrink: 0 }} />
                        : <div style={{ width: 28, height: 28, background: '#C8FF00', border: '1.5px solid #0A0A0A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Courier New, monospace', fontWeight: 900, fontSize: '0.6rem', flexShrink: 0 }}>
                            {(u.displayName || 'U')[0].toUpperCase()}
                          </div>
                      }
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.displayName || '—'}</span>
                    </div>
                    <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.email}</span>
                    <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', color: '#888' }}>
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' }) : '—'}
                    </span>
                    <span style={{
                      fontFamily: 'Courier New, monospace', fontSize: '0.54rem', fontWeight: 700,
                      padding: '2px 8px', border: '1.5px solid #0A0A0A',
                      background: u.profileComplete ? '#C8FF00' : '#FFE040',
                      letterSpacing: '0.06em', textTransform: 'uppercase', width: 'fit-content',
                    }}>
                      {u.profileComplete ? 'COMPLETE' : 'PENDING'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {addEventOpen && <AddEventModal onClose={() => setAddEventOpen(false)} onSave={handleAddEvent} />}
    </div>
  )
}
