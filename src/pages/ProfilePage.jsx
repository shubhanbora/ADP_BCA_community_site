import { useState, useEffect, useRef } from 'react'
import { GitFork, Briefcase, Globe, Edit2, X, MapPin, Award, Star, ExternalLink, Camera, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useProfile } from '../hooks/useProfile'
import { useProjects } from '../hooks/useProjects'
import { useEvents } from '../hooks/useEvents'

const defaultProfileData = {
  name: 'Anonymous User',
  handle: '@user',
  degree: 'BCA',
  semester: '4th Semester',
  role: 'Member',
  bio: 'Building things, learning new technologies and experimenting with ideas.',
  location: 'Earth',
  avatar: 'US',
  eventsCount: 0,
  projectsCount: 0,
  github: '',
  linkedin: '',
  portfolio: '',
  skills: ['JavaScript', 'HTML', 'CSS'],
  achievements: [
    { title: 'Joined Community', year: '2026', result: 'ACHIEVED' },
  ],
  activity: [],
}

const skillColors = ['#BFFF00', '#FF3CAC', '#FFE44D', '#BFFF00', '#FF3CAC', '#FFE44D', '#BFFF00']
const tabs = ['About', 'Projects', 'Achievements', 'Events', 'Activity']

const categoryColors = {
  Hackathon: '#BFFF00',
  Bootcamp: '#FF3CAC',
  Competition: '#FFE44D',
  Workshop: '#BFFF00',
  Webinar: '#FF3CAC',
  Internship: '#FFE44D',
}

/* ─── Edit Profile Modal ─── */
function EditProfileModal({ profile, onClose, onSave, onUploadImage, uploadingImage }) {
  const [formData, setFormData] = useState({
    name: profile.name,
    role: profile.role,
    location: profile.location,
    semester: profile.semester,
    github: profile.github,
    linkedin: profile.linkedin,
    portfolio: profile.portfolio,
    bio: profile.bio,
    skills: profile.skills.join(', ')
  })
  const fileInputRef = useRef(null)

  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }))
  
  const handleSave = () => {
    onSave({
      ...formData,
      displayName: formData.name,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean)
    })
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onUploadImage(e.target.files[0])
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.65)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', overflowY: 'auto' }} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="animate-fade-in" style={{ backgroundColor: '#F5F0E8', border: '2.5px solid #0A0A0A', boxShadow: '8px 8px 0px #0A0A0A', width: '100%', maxWidth: '520px', padding: '32px', marginTop: '20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <span className="section-number">EDIT /</span>
            <h2 style={{ fontWeight: 900, fontSize: '1.7rem', letterSpacing: '-0.02em', marginTop: '2px' }}>EDIT PROFILE</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={22} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            {profile.photoURL ? (
              <img src={profile.photoURL} alt="Profile" referrerPolicy="no-referrer" style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: '50%', border: '2px solid #0A0A0A' }} />
            ) : (
              <div style={{ width: 64, height: 64, backgroundColor: '#BFFF00', border: '2px solid #0A0A0A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem' }}>
                {profile.avatar}
              </div>
            )}
            <div>
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" style={{ display: 'none' }} />
              <button className="btn-outline" onClick={() => fileInputRef.current?.click()} disabled={uploadingImage} style={{ padding: '6px 12px', fontSize: '0.65rem', gap: '6px' }}>
                <Camera size={13} /> {uploadingImage ? 'UPLOADING...' : 'CHANGE PICTURE'}
              </button>
            </div>
          </div>

          {[
            { label: 'FULL NAME', name: 'name', type: 'text' },
            { label: 'ROLE / TITLE', name: 'role', type: 'text' },
            { label: 'SEMESTER', name: 'semester', type: 'text' },
            { label: 'LOCATION', name: 'location', type: 'text' },
            { label: 'GITHUB URL', name: 'github', type: 'text' },
            { label: 'LINKEDIN URL', name: 'linkedin', type: 'text' },
            { label: 'PORTFOLIO URL', name: 'portfolio', type: 'text' },
          ].map(field => (
            <div key={field.name}>
              <label style={{ display: 'block', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '5px', textTransform: 'uppercase', color: '#888' }}>{field.label}</label>
              <input className="input-brutal" name={field.name} value={formData[field.name]} onChange={handleChange} type={field.type} />
            </div>
          ))}
          <div>
            <label style={{ display: 'block', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '5px', textTransform: 'uppercase', color: '#888' }}>BIO</label>
            <textarea className="input-brutal" name="bio" value={formData.bio} onChange={handleChange} rows={3} style={{ resize: 'vertical', lineHeight: 1.6 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '5px', textTransform: 'uppercase', color: '#888' }}>SKILLS (comma separated)</label>
            <input className="input-brutal" name="skills" value={formData.skills} onChange={handleChange} />
          </div>

          <button className="btn-black" onClick={handleSave} style={{ justifyContent: 'center', padding: '12px', marginTop: '4px', fontSize: '0.8rem' }}>
            SAVE CHANGES →
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── ProfilePage ─── */
export default function ProfilePage({ navigate }) {
  const [activeTab, setActiveTab] = useState('About')
  const [editOpen, setEditOpen] = useState(false)
  
  const { user, logout } = useAuth()
  const { getProfile, updateProfile, uploadProfileImage, loading: profileLoading } = useProfile()
  const { projects } = useProjects()
  const { events, savedEvents } = useEvents()

  const [dbProfile, setDbProfile] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (user) {
      getProfile(user.uid).then(data => {
        if (data) setDbProfile(data)
      })
    }
  }, [user])

  const handleSaveProfile = async (data) => {
    if (!user) return
    try {
      await updateProfile(user.uid, data)
      setDbProfile(prev => ({ ...prev, ...data }))
      setEditOpen(false)
    } catch (err) {
      console.error(err)
      alert("Failed to update profile.")
    }
  }

  const handleUploadImage = async (file) => {
    if (!user) return
    setUploadingImage(true)
    try {
      const url = await uploadProfileImage(user.uid, file)
      setDbProfile(prev => ({ ...prev, photoURL: url }))
    } catch (err) {
      console.error(err)
      alert("Failed to upload image.")
    } finally {
      setUploadingImage(false)
    }
  }

  const handleChangePhoto = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleUploadImage(e.target.files[0])
    }
  }

  if (!user) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center', maxWidth: 1280, margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>Please log in to view your profile.</h2>
      </div>
    )
  }

  const baseAvatarText = user.displayName ? user.displayName.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase() : 'US'
  
  const profile = {
    ...defaultProfileData,
    name: user.displayName || defaultProfileData.name,
    handle: `@${(dbProfile?.username || user.email?.split('@')[0] || 'user')}`,
    degree: `${dbProfile?.course || 'BCA'} • ${dbProfile?.semester || ''}${dbProfile?.semester ? (['st','nd','rd','th','th','th'][(+dbProfile.semester)-1] || 'th') + ' Semester' : 'Semester'}`,
    role: dbProfile?.role && dbProfile.role !== 'member' ? dbProfile.role : defaultProfileData.role,
    bio: dbProfile?.bio || defaultProfileData.bio,
    location: dbProfile?.location || defaultProfileData.location,
    college: dbProfile?.college || '',
    avatar: baseAvatarText,
    photoURL: dbProfile?.photoURL || user.photoURL || null,
    github: dbProfile?.githubUrl || '',
    linkedin: dbProfile?.linkedinUrl || '',
    portfolio: dbProfile?.portfolioUrl || '',
    skills: (dbProfile?.skills?.length > 0) ? dbProfile.skills : defaultProfileData.skills,
    achievements: dbProfile?.achievements?.length > 0 ? dbProfile.achievements : defaultProfileData.achievements,
    activity: dbProfile?.activity || [],
  }

  // Derived user lists
  const myProjects = projects.filter(p => p.creatorId === user.uid)
  const myEvents = events.filter(e => savedEvents.has(e.id))

  return (
    <div>
      {/* ── Page Header ── */}
      <div style={{ borderBottom: '2.5px solid #0A0A0A', padding: '36px 24px', maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="section-number">02 /</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.92, marginTop: '4px' }}>
            MY PROFILE
          </h1>
        </div>
        <div className="sticky-note" style={{ fontSize: '0.62rem' }}>BUILD YOUR<br />IDENTITY</div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '28px 24px' }}>

        {/* ── Profile Card (horizontal) ── */}
        <div style={{ border: '2.5px solid #0A0A0A', boxShadow: '5px 5px 0px #0A0A0A', padding: '28px 32px', marginBottom: '0', backgroundColor: '#F5F0E8', display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' }} className="profile-card">
          
          {/* Avatar + Change Photo */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {profile.photoURL ? (
              <img
                src={profile.photoURL}
                alt={profile.name}
                referrerPolicy="no-referrer"
                onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex' }}
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', border: '3px solid #0A0A0A', boxShadow: '4px 4px 0px #0A0A0A' }}
              />
            ) : null}
            <div style={{ width: '100px', height: '100px', backgroundColor: '#BFFF00', border: '3px solid #0A0A0A', borderRadius: '50%', boxShadow: '4px 4px 0px #0A0A0A', display: profile.photoURL ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Courier New, monospace', fontWeight: 900, fontSize: '2rem', letterSpacing: '-0.02em' }}>
              {profile.avatar}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleChangePhoto} accept="image/*" style={{ display: 'none' }} />
            <button 
              onClick={() => fileInputRef.current?.click()} 
              disabled={uploadingImage}
              style={{ background: 'none', border: 'none', fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 700, color: '#888', cursor: 'pointer', letterSpacing: '0.06em', transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#0A0A0A'}
              onMouseLeave={e => e.currentTarget.style.color = '#888'}
            >
              {uploadingImage ? 'Uploading...' : 'Change Photo'}
            </button>
          </div>

          {/* Info section */}
          <div style={{ flexGrow: 1, minWidth: '200px' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '2px', lineHeight: 1.1 }}>{profile.name}</h2>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.68rem', color: '#FF3CAC', marginBottom: '6px', fontWeight: 700 }}>{profile.handle}</p>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.7rem', color: '#555', marginBottom: '4px' }}>
              {profile.degree} – {profile.semester}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
              <MapPin size={12} color="#888" />
              <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.65rem', color: '#888' }}>{profile.location}</span>
            </div>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: '#555', maxWidth: '500px' }}>{profile.bio}</p>
          </div>

          {/* Edit Profile button */}
          <div style={{ flexShrink: 0, alignSelf: 'flex-start' }}>
            <button className="btn-outline" onClick={() => setEditOpen(true)} style={{ padding: '8px 18px', fontSize: '0.65rem', gap: '6px', whiteSpace: 'nowrap' }}>
              <Edit2 size={12} /> Edit Profile
            </button>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', border: '2.5px solid #0A0A0A', borderTop: 'none', boxShadow: '5px 5px 0px #0A0A0A', marginBottom: '28px' }} className="stats-row">
          {[
            { value: myEvents.length, label: 'Events' },
            { value: myProjects.length, label: 'Projects' },
          ].map((stat, i, arr) => (
            <div key={i} style={{ padding: '18px 16px', textAlign: 'center', borderRight: i < arr.length - 1 ? '2px solid #0A0A0A' : 'none', backgroundColor: '#F5F0E8' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '4px', color: '#0A0A0A' }}>{stat.value}</div>
              <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', color: '#888', textTransform: 'uppercase' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div style={{ display: 'flex', borderBottom: '2.5px solid #0A0A0A', marginBottom: '24px', overflowX: 'auto' }} className="scrollbar-hide">
          {tabs.map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              style={{ 
                border: 'none', 
                borderBottom: activeTab === tab ? '3px solid #BFFF00' : '3px solid transparent', 
                padding: '12px 22px', 
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.82rem', 
                fontWeight: activeTab === tab ? 700 : 500,
                letterSpacing: '0.02em',
                cursor: 'pointer', 
                backgroundColor: 'transparent',
                color: activeTab === tab ? '#0A0A0A' : '#999', 
                whiteSpace: 'nowrap', 
                transition: 'color 0.15s, border-color 0.15s',
              }}
              onMouseEnter={e => { if (activeTab !== tab) e.currentTarget.style.color = '#555' }}
              onMouseLeave={e => { if (activeTab !== tab) e.currentTarget.style.color = '#999' }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Tab Content ── */}

        {/* ABOUT tab */}
        {activeTab === 'About' && (
          <div className="animate-fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="about-grid">
              {/* Left: About + Skills */}
              <div>
                <div style={{ border: '2.5px solid #0A0A0A', boxShadow: '4px 4px 0px #0A0A0A', padding: '22px', marginBottom: '18px' }}>
                  <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '12px', color: '#888', textTransform: 'uppercase' }}>About</p>
                  <p style={{ fontSize: '0.86rem', lineHeight: 1.7, color: '#444' }}>{profile.bio}</p>
                </div>

                <div style={{ border: '2.5px solid #0A0A0A', boxShadow: '4px 4px 0px #0A0A0A', padding: '22px' }}>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {profile.skills.map((skill, i) => (
                      <span key={skill} style={{ backgroundColor: skillColors[i % skillColors.length], border: '2px solid #0A0A0A', boxShadow: '2px 2px 0px #0A0A0A', fontFamily: 'Courier New, monospace', fontSize: '0.65rem', fontWeight: 700, padding: '4px 12px', letterSpacing: '0.06em' }}>
                        {skill}
                      </span>
                    ))}
                    <button onClick={() => setEditOpen(true)} style={{ border: '2px dashed #ccc', backgroundColor: 'transparent', fontFamily: 'Courier New, monospace', fontSize: '0.65rem', fontWeight: 700, padding: '4px 12px', cursor: 'pointer', color: '#aaa', transition: 'border-color 0.15s, color 0.15s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#0A0A0A'; e.currentTarget.style.color = '#0A0A0A' }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#ccc'; e.currentTarget.style.color = '#aaa' }}>
                      + Add Skill
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Links */}
              <div>
                <div style={{ border: '2.5px solid #0A0A0A', boxShadow: '4px 4px 0px #0A0A0A', overflow: 'hidden' }}>
                  <div style={{ backgroundColor: '#F5F0E8', padding: '14px 20px', borderBottom: '2px solid #0A0A0A' }}>
                    <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: '#555', textTransform: 'uppercase' }}>Links</span>
                  </div>
                  {[
                    { icon: GitFork, label: 'GitHub', value: profile.github, url: `https://${profile.github}` },
                    { icon: Briefcase, label: 'LinkedIn', value: profile.linkedin, url: `https://${profile.linkedin}` },
                    { icon: Globe, label: 'Portfolio', value: profile.portfolio, url: `https://${profile.portfolio}` },
                  ].map((link, i, arr) => (
                    <a key={link.label} href={link.value ? link.url : '#'} target={link.value ? '_blank' : undefined} rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '13px 20px', borderBottom: i < arr.length - 1 ? '1px solid #e5e2da' : 'none', cursor: link.value ? 'pointer' : 'default', transition: 'background 0.1s' }} onMouseEnter={e => { if (link.value) e.currentTarget.style.backgroundColor = '#BFFF00' }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}>
                        <link.icon size={15} color="#888" />
                        <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.7rem', fontWeight: 700, color: '#0A0A0A' }}>{link.label}</span>
                        <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#999', marginLeft: 'auto', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>
                          {link.value ? link.value.replace('github.com/', '').replace('linkedin.com/in/', '') : '—'}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Logout button */}
                <button
                  onClick={async () => {
                    try {
                      await logout()
                      if (navigate) navigate('home')
                    } catch (err) {
                      console.error('Logout error:', err)
                    }
                  }}
                  style={{
                    width: '100%',
                    marginTop: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    border: '2.5px solid #0A0A0A',
                    boxShadow: '4px 4px 0px #0A0A0A',
                    backgroundColor: '#0A0A0A',
                    color: '#FF3CAC',
                    fontFamily: 'Courier New, monospace',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'transform 0.15s, box-shadow 0.15s, background-color 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translate(-2px,-2px)'
                    e.currentTarget.style.boxShadow = '6px 6px 0px #0A0A0A'
                    e.currentTarget.style.backgroundColor = '#1a1a1a'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translate(0,0)'
                    e.currentTarget.style.boxShadow = '4px 4px 0px #0A0A0A'
                    e.currentTarget.style.backgroundColor = '#0A0A0A'
                  }}
                >
                  <LogOut size={14} /> LOGOUT
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PROJECTS tab */}
        {activeTab === 'Projects' && (
          <div className="animate-fade-in">
            {myProjects.length === 0 ? (
              <div style={{ padding: '40px', border: '2.5px solid #0A0A0A', textAlign: 'center', backgroundColor: '#F5F0E8' }}>
                <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.72rem', letterSpacing: '0.1em', color: '#888' }}>NO PROJECTS YET.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
                {myProjects.map(project => (
                  <div key={project.id} style={{ border: '2.5px solid #0A0A0A', boxShadow: '4px 4px 0px #0A0A0A', overflow: 'hidden', transition: 'transform 0.15s, box-shadow 0.15s' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0px #0A0A0A' }} onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = '4px 4px 0px #0A0A0A' }}>
                    <div style={{ height: '90px', backgroundColor: project.accentColor || '#BFFF00', borderBottom: '2px solid #0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                      {project.imageUrl ? (
                        <img src={project.imageUrl} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ fontWeight: 900, fontSize: '1.5rem', opacity: 0.12, letterSpacing: '-0.04em' }}>{project.name}</span>
                      )}
                    </div>
                    <div style={{ padding: '16px' }}>
                      <h4 style={{ fontWeight: 900, fontSize: '0.95rem', marginBottom: '3px' }}>{project.name}</h4>
                      <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', color: '#888', marginBottom: '8px' }}>{project.tagline}</p>
                      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                        {project.techStack && project.techStack.map(t => (
                          <span key={t} style={{ border: '1.5px solid #0A0A0A', fontFamily: 'Courier New, monospace', fontSize: '0.54rem', fontWeight: 700, padding: '2px 6px' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ACHIEVEMENTS tab */}
        {activeTab === 'Achievements' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {profile.achievements.map((ach, i) => (
              <div key={i} style={{ border: '2.5px solid #0A0A0A', boxShadow: '4px 4px 0px #0A0A0A', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px', transition: 'transform 0.1s, box-shadow 0.1s' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0px #0A0A0A' }} onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = '4px 4px 0px #0A0A0A' }}>
                <div style={{ width: '44px', height: '44px', backgroundColor: ['#BFFF00', '#FF3CAC', '#FFE44D', '#BFFF00'][i % 4], border: '2.5px solid #0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {i === 1 ? <Star size={20} /> : <Award size={20} />}
                </div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontWeight: 900, fontSize: '0.95rem', marginBottom: '2px' }}>{ach.title}</div>
                  <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#888' }}>{ach.year}</div>
                </div>
                <div style={{ backgroundColor: '#0A0A0A', color: '#BFFF00', fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 700, padding: '4px 10px', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                  {ach.result}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EVENTS tab */}
        {activeTab === 'Events' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {myEvents.length === 0 ? (
              <div style={{ padding: '40px', border: '2.5px solid #0A0A0A', textAlign: 'center', backgroundColor: '#F5F0E8' }}>
                <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.72rem', letterSpacing: '0.1em', color: '#888' }}>NO SAVED EVENTS.</p>
              </div>
            ) : myEvents.map(event => (
              <div key={event.id} style={{ border: '2.5px solid #0A0A0A', boxShadow: '4px 4px 0px #0A0A0A', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px', transition: 'transform 0.1s, box-shadow 0.1s' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-1px,-1px)'; e.currentTarget.style.boxShadow = '5px 5px 0px #0A0A0A' }} onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = '4px 4px 0px #0A0A0A' }}>
                <div style={{ width: '6px', minHeight: '44px', backgroundColor: categoryColors[event.category] || '#BFFF00', borderRight: '2px solid #0A0A0A', flexShrink: 0 }} />
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 900, fontSize: '0.9rem', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.title}</div>
                  <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#888' }}>{event.organizer} · {event.date}</div>
                </div>
                <span style={{ border: '1.5px solid #0A0A0A', fontFamily: 'Courier New, monospace', fontSize: '0.56rem', fontWeight: 700, padding: '2px 7px', backgroundColor: categoryColors[event.category] || '#BFFF00', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {event.category}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* ACTIVITY tab */}
        {activeTab === 'Activity' && (
          <div className="animate-fade-in">
            {profile.activity.length === 0 ? (
              <div style={{ padding: '40px', border: '2.5px solid #0A0A0A', textAlign: 'center', backgroundColor: '#F5F0E8' }}>
                <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.72rem', letterSpacing: '0.1em', color: '#888' }}>NO ACTIVITY YET.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '2.5px solid #0A0A0A' }}>
                {profile.activity.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '14px 18px', borderBottom: i < profile.activity.length - 1 ? '1.5px solid #e5e2da' : 'none', transition: 'background 0.1s' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FBF7EF' }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}>
                    <div style={{ width: '10px', height: '10px', backgroundColor: item.color, border: '2px solid #0A0A0A', borderRadius: '50%', flexShrink: 0, marginTop: '5px' }} />
                    <div style={{ flexGrow: 1 }}>
                      <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#888', marginRight: '8px' }}>{item.action}</span>
                      <span style={{ fontSize: '0.85rem', color: '#333' }}>{item.detail}</span>
                    </div>
                    <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', color: '#bbb', whiteSpace: 'nowrap', flexShrink: 0 }}>{item.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {editOpen && <EditProfileModal profile={profile} onClose={() => setEditOpen(false)} onSave={handleSaveProfile} onUploadImage={handleUploadImage} uploadingImage={uploadingImage} />}

      <style>{`
        @media (max-width: 768px) {
          .profile-card {
            flex-direction: column !important;
            text-align: center !important;
            gap: 16px !important;
            padding: 20px !important;
          }
          .profile-card > div:nth-child(2) {
            align-items: center;
          }
          .profile-card > div:nth-child(2) p {
            text-align: center;
          }
          .stats-row {
            grid-template-columns: 1fr 1fr !important;
          }
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .stats-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
