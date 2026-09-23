import { useState } from 'react'
import { GitFork, Briefcase, Globe, Edit2, X, MapPin, Award, Star, ExternalLink } from 'lucide-react'
import { projects } from '../data/projects'
import { events } from '../data/events'

const profileData = {
  name: 'Shubhan Bora',
  handle: '@shubhan',
  degree: 'BCA • 4th Semester',
  role: 'Backend Developer',
  bio: 'Building things, learning new technologies and experimenting with ideas. Open source contributor. BCA Tech Community co-founder.',
  location: 'Guwahati, Assam',
  avatar: 'SB',
  xp: 710,
  eventsCount: 8,
  projectsCount: 5,
  certificatesCount: 6,
  github: 'github.com/shubhanbora',
  linkedin: 'linkedin.com/in/shubhanbora',
  portfolio: 'shubhandev.in',
  skills: ['JavaScript', 'Node.js', 'PHP', 'SQL', 'React', 'Python', 'Git'],
  achievements: [
    { title: 'Hack2Skill AI Hackathon', year: '2025', result: '2ND PLACE' },
    { title: 'GitHub Campus Expert', year: '2026', result: 'SELECTED' },
    { title: 'AWS Cloud Bootcamp', year: '2025', result: 'COMPLETED' },
    { title: 'SIH Internal Qualifier', year: '2024', result: 'QUALIFIED' },
  ],
  certificates: [
    { title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: '2025', color: '#FF3CAC' },
    { title: 'React Developer', issuer: 'Meta / Coursera', year: '2025', color: '#BFFF00' },
    { title: 'Python for Data Science', issuer: 'IBM / edX', year: '2024', color: '#FFE44D' },
    { title: 'Git & GitHub Essentials', issuer: 'GitHub', year: '2024', color: '#0A0A0A' },
    { title: 'Node.js Fundamentals', issuer: 'OpenJS Foundation', year: '2025', color: '#FF3CAC' },
    { title: 'SQL Intermediate', issuer: 'HackerRank', year: '2024', color: '#BFFF00' },
  ],
  activity: [
    { action: 'Submitted project', detail: 'REVA - Indian Temple Tour Platform', time: '2 days ago', color: '#BFFF00' },
    { action: 'Joined event', detail: 'Hack2Skill AI Hackathon 2026', time: '5 days ago', color: '#FF3CAC' },
    { action: 'Posted in community', detail: '"Just completed my first React project..."', time: '1 week ago', color: '#FFE44D' },
    { action: 'Earned certificate', detail: 'AWS Cloud Practitioner', time: '2 weeks ago', color: '#BFFF00' },
    { action: 'Liked project', detail: 'Wisdawn - EdTech Platform', time: '3 weeks ago', color: '#FF3CAC' },
    { action: 'Joined community', detail: 'BCA Tech Community', time: '6 months ago', color: '#BFFF00' },
  ],
}

const skillColors = ['#BFFF00', '#FF3CAC', '#FFE44D', '#BFFF00', '#FF3CAC', '#FFE44D', '#BFFF00']
const tabs = ['ABOUT', 'PROJECTS', 'ACHIEVEMENTS', 'EVENTS', 'CERTIFICATES', 'ACTIVITY']

const categoryColors = {
  Hackathon: '#BFFF00',
  Bootcamp: '#FF3CAC',
  Competition: '#FFE44D',
  Workshop: '#BFFF00',
  Webinar: '#FF3CAC',
  Internship: '#FFE44D',
}

/* ─── XP progress bar ─── */
function XPBar({ xp }) {
  const level = Math.floor(xp / 100) + 1
  const progress = xp % 100

  return (
    <div style={{ marginTop: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', color: '#888' }}>
          LVL {level}
        </span>
        <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 700, color: '#BFFF00', backgroundColor: '#0A0A0A', padding: '1px 6px' }}>
          {xp} XP
        </span>
      </div>
      <div
        style={{
          height: '8px',
          backgroundColor: '#e5e2da',
          border: '2px solid #0A0A0A',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            backgroundColor: '#BFFF00',
            borderRight: '2px solid #0A0A0A',
          }}
        />
      </div>
      <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.55rem', color: '#aaa' }}>
        {100 - progress} XP to level {level + 1}
      </span>
    </div>
  )
}

/* ─── Edit Profile Modal ─── */
function EditProfileModal({ profile, onClose }) {
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
          maxWidth: '520px',
          padding: '32px',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <span className="section-number">EDIT /</span>
            <h2 style={{ fontWeight: 900, fontSize: '1.7rem', letterSpacing: '-0.02em', marginTop: '2px' }}>
              EDIT PROFILE
            </h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            { label: 'FULL NAME', value: profile.name, type: 'text' },
            { label: 'ROLE / TITLE', value: profile.role, type: 'text' },
            { label: 'LOCATION', value: profile.location, type: 'text' },
            { label: 'GITHUB URL', value: profile.github, type: 'text' },
            { label: 'LINKEDIN URL', value: profile.linkedin, type: 'text' },
            { label: 'PORTFOLIO URL', value: profile.portfolio, type: 'text' },
          ].map(field => (
            <div key={field.label}>
              <label style={{ display: 'block', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '5px', textTransform: 'uppercase', color: '#888' }}>
                {field.label}
              </label>
              <input className="input-brutal" defaultValue={field.value} type={field.type} />
            </div>
          ))}
          <div>
            <label style={{ display: 'block', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '5px', textTransform: 'uppercase', color: '#888' }}>
              BIO
            </label>
            <textarea className="input-brutal" defaultValue={profile.bio} rows={3} style={{ resize: 'vertical', lineHeight: 1.6 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '5px', textTransform: 'uppercase', color: '#888' }}>
              SKILLS (comma separated)
            </label>
            <input className="input-brutal" defaultValue={profile.skills.join(', ')} />
          </div>

          <button
            className="btn-black"
            onClick={onClose}
            style={{ justifyContent: 'center', padding: '12px', marginTop: '4px', fontSize: '0.8rem' }}
          >
            SAVE CHANGES →
          </button>
        </div>

        <div style={{ marginTop: '14px', backgroundColor: '#FFE44D', border: '2px solid #0A0A0A', padding: '8px 12px', fontFamily: 'Courier New, monospace', fontSize: '0.62rem', fontWeight: 700 }}>
          ⚡ DEMO MODE — Changes are not saved. This is a frontend-only demo.
        </div>
      </div>
    </div>
  )
}

/* ─── ProfilePage ─── */
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('ABOUT')
  const [editOpen, setEditOpen] = useState(false)
  const profile = profileData
  const myProjects = projects.slice(0, 3)
  const myEvents = events.slice(0, 5)

  return (
    <div>
      {/* Header */}
      <div
        style={{
          borderBottom: '2.5px solid #0A0A0A',
          padding: '36px 24px',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <span className="section-number">05 /</span>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              marginTop: '4px',
            }}
          >
            MY PROFILE
          </h1>
        </div>
        <div className="sticky-note" style={{ fontSize: '0.62rem' }}>
          BUILD YOUR<br />IDENTITY
        </div>
      </div>

      {/* Profile layout */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '28px 24px',
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: '28px',
          alignItems: 'flex-start',
        }}
        className="profile-layout"
      >
        {/* ── Left sidebar ── */}
        <div>
          {/* Profile card */}
          <div
            style={{
              border: '2.5px solid #0A0A0A',
              boxShadow: '5px 5px 0px #0A0A0A',
              padding: '24px',
              marginBottom: '18px',
              backgroundColor: '#F5F0E8',
            }}
          >
            {/* Avatar + Edit */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#BFFF00',
                    border: '3px solid #0A0A0A',
                    boxShadow: '4px 4px 0px #0A0A0A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Courier New, monospace',
                    fontWeight: 900,
                    fontSize: '1.6rem',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {profile.avatar}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-6px',
                    right: '-6px',
                    width: '22px',
                    height: '22px',
                    backgroundColor: '#BFFF00',
                    border: '2px solid #0A0A0A',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => setEditOpen(true)}
                >
                  <Edit2 size={10} />
                </div>
              </div>
              <button
                className="btn-outline"
                onClick={() => setEditOpen(true)}
                style={{ padding: '5px 12px', fontSize: '0.6rem', gap: '4px' }}
              >
                <Edit2 size={11} />
                EDIT
              </button>
            </div>

            {/* Name & details */}
            <h2 style={{ fontSize: '1.3rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '2px' }}>
              {profile.name}
            </h2>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.62rem', color: '#FF3CAC', marginBottom: '4px', fontWeight: 700 }}>
              {profile.handle}
            </p>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.65rem', color: '#666', marginBottom: '6px' }}>
              {profile.degree}
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#0A0A0A',
                color: '#BFFF00',
                fontFamily: 'Courier New, monospace',
                fontSize: '0.58rem',
                fontWeight: 700,
                padding: '3px 9px',
                marginBottom: '10px',
                letterSpacing: '0.06em',
              }}
            >
              {profile.role}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '14px' }}>
              <MapPin size={12} color="#888" />
              <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#888' }}>
                {profile.location}
              </span>
            </div>

            <XPBar xp={profile.xp} />
          </div>

          {/* Stats grid */}
          <div
            style={{
              border: '2.5px solid #0A0A0A',
              boxShadow: '5px 5px 0px #0A0A0A',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              marginBottom: '18px',
            }}
          >
            {[
              { value: profile.xp, label: 'Community XP', accent: '#BFFF00' },
              { value: profile.eventsCount, label: 'Events', accent: '#FF3CAC' },
              { value: profile.projectsCount, label: 'Projects', accent: '#FFE44D' },
              { value: profile.certificatesCount, label: 'Certificates', accent: '#0A0A0A' },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: '16px',
                  borderRight: i % 2 === 0 ? '2px solid #0A0A0A' : 'none',
                  borderBottom: i < 2 ? '2px solid #0A0A0A' : 'none',
                  textAlign: 'center',
                  backgroundColor: i === 0 ? '#0A0A0A' : 'transparent',
                }}
              >
                <div
                  style={{
                    fontSize: '1.7rem',
                    fontWeight: 900,
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    marginBottom: '3px',
                    color: i === 0 ? '#BFFF00' : '#0A0A0A',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: 'Courier New, monospace',
                    fontSize: '0.56rem',
                    letterSpacing: '0.08em',
                    color: i === 0 ? '#888' : '#888',
                    textTransform: 'uppercase',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Links */}
          <div
            style={{
              border: '2.5px solid #0A0A0A',
              boxShadow: '5px 5px 0px #0A0A0A',
              overflow: 'hidden',
            }}
          >
            <div style={{ backgroundColor: '#0A0A0A', padding: '10px 16px' }}>
              <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', color: '#888', textTransform: 'uppercase' }}>
                LINKS
              </span>
            </div>
            {[
              { icon: GitFork, label: 'GitHub', value: profile.github, url: `https://${profile.github}` },
              { icon: Briefcase, label: 'LinkedIn', value: profile.linkedin, url: `https://${profile.linkedin}` },
              { icon: Globe, label: 'Portfolio', value: profile.portfolio, url: `https://${profile.portfolio}` },
            ].map((link, i, arr) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '11px 16px',
                    borderBottom: i < arr.length - 1 ? '1px solid #e5e2da' : 'none',
                    cursor: 'pointer',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#BFFF00' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
                >
                  <link.icon size={14} color="#888" />
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.65rem', fontWeight: 700, color: '#0A0A0A' }}>
                    {link.label}
                  </span>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', color: '#999', marginLeft: 'auto', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '120px' }}>
                    {link.value.replace('github.com/', '').replace('linkedin.com/in/', '')}
                  </span>
                  <ExternalLink size={11} color="#ccc" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Right main area ── */}
        <div>
          {/* Tabs */}
          <div
            style={{
              display: 'flex',
              borderBottom: '2.5px solid #0A0A0A',
              marginBottom: '28px',
              overflowX: 'auto',
            }}
            className="scrollbar-hide"
          >
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  border: 'none',
                  borderBottom: activeTab === tab ? '3px solid #BFFF00' : '3px solid transparent',
                  borderRight: '1px solid #e5e2da',
                  padding: '10px 16px',
                  fontFamily: 'Courier New, monospace',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  backgroundColor: activeTab === tab ? '#BFFF00' : 'transparent',
                  color: '#0A0A0A',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.15s',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ── ABOUT tab ── */}
          {activeTab === 'ABOUT' && (
            <div className="animate-fade-in">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '0' }} className="about-grid">
                <div style={{ border: '2.5px solid #0A0A0A', boxShadow: '4px 4px 0px #0A0A0A', padding: '20px' }}>
                  <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '10px', color: '#888', textTransform: 'uppercase' }}>
                    ABOUT
                  </p>
                  <p style={{ fontSize: '0.86rem', lineHeight: 1.68, color: '#444' }}>{profile.bio}</p>
                </div>

                <div style={{ border: '2.5px solid #0A0A0A', boxShadow: '4px 4px 0px #0A0A0A', padding: '20px' }}>
                  <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '14px', color: '#888', textTransform: 'uppercase' }}>
                    SKILLS
                  </p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {profile.skills.map((skill, i) => (
                      <span
                        key={skill}
                        style={{
                          backgroundColor: skillColors[i % skillColors.length],
                          border: '2px solid #0A0A0A',
                          boxShadow: '2px 2px 0px #0A0A0A',
                          fontFamily: 'Courier New, monospace',
                          fontSize: '0.62rem',
                          fontWeight: 700,
                          padding: '3px 10px',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                    <button
                      onClick={() => setEditOpen(true)}
                      style={{
                        border: '2px dashed #ccc',
                        backgroundColor: 'transparent',
                        fontFamily: 'Courier New, monospace',
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        padding: '3px 10px',
                        cursor: 'pointer',
                        color: '#aaa',
                        transition: 'border-color 0.15s, color 0.15s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#0A0A0A'; e.currentTarget.style.color = '#0A0A0A' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#ccc'; e.currentTarget.style.color = '#aaa' }}
                    >
                      + ADD SKILL
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── PROJECTS tab ── */}
          {activeTab === 'PROJECTS' && (
            <div className="animate-fade-in">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                {myProjects.map(project => (
                  <div
                    key={project.id}
                    style={{
                      border: '2.5px solid #0A0A0A',
                      boxShadow: '4px 4px 0px #0A0A0A',
                      overflow: 'hidden',
                      transition: 'transform 0.15s, box-shadow 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0px #0A0A0A' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = '4px 4px 0px #0A0A0A' }}
                  >
                    <div
                      style={{
                        height: '80px',
                        backgroundColor: project.accentColor,
                        borderBottom: '2px solid #0A0A0A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span style={{ fontWeight: 900, fontSize: '1.5rem', opacity: 0.12, letterSpacing: '-0.04em' }}>{project.name}</span>
                    </div>
                    <div style={{ padding: '14px' }}>
                      <h4 style={{ fontWeight: 900, fontSize: '0.95rem', marginBottom: '3px' }}>{project.name}</h4>
                      <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', color: '#888', marginBottom: '8px' }}>
                        {project.tagline}
                      </p>
                      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                        {project.techStack.map(t => (
                          <span key={t} style={{ border: '1.5px solid #0A0A0A', fontFamily: 'Courier New, monospace', fontSize: '0.54rem', fontWeight: 700, padding: '2px 5px' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ACHIEVEMENTS tab ── */}
          {activeTab === 'ACHIEVEMENTS' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {profile.achievements.map((ach, i) => (
                <div
                  key={i}
                  style={{
                    border: '2.5px solid #0A0A0A',
                    boxShadow: '4px 4px 0px #0A0A0A',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'transform 0.1s, box-shadow 0.1s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0px #0A0A0A' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = '4px 4px 0px #0A0A0A' }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      backgroundColor: ['#BFFF00', '#FF3CAC', '#FFE44D', '#BFFF00'][i % 4],
                      border: '2.5px solid #0A0A0A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {i === 1 ? <Star size={20} /> : <Award size={20} />}
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontWeight: 900, fontSize: '0.95rem', marginBottom: '2px' }}>{ach.title}</div>
                    <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#888' }}>{ach.year}</div>
                  </div>
                  <div
                    style={{
                      backgroundColor: '#0A0A0A',
                      color: '#BFFF00',
                      fontFamily: 'Courier New, monospace',
                      fontSize: '0.58rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      letterSpacing: '0.08em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {ach.result}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── EVENTS tab ── */}
          {activeTab === 'EVENTS' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {myEvents.map(event => (
                <div
                  key={event.id}
                  style={{
                    border: '2.5px solid #0A0A0A',
                    boxShadow: '4px 4px 0px #0A0A0A',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    transition: 'transform 0.1s, box-shadow 0.1s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-1px,-1px)'; e.currentTarget.style.boxShadow = '5px 5px 0px #0A0A0A' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = '4px 4px 0px #0A0A0A' }}
                >
                  <div
                    style={{
                      width: '6px',
                      minHeight: '44px',
                      backgroundColor: categoryColors[event.category] || '#BFFF00',
                      borderRight: '2px solid #0A0A0A',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 900, fontSize: '0.9rem', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {event.title}
                    </div>
                    <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#888' }}>
                      {event.organizer} · {event.date}
                    </div>
                  </div>
                  <span
                    style={{
                      border: '1.5px solid #0A0A0A',
                      fontFamily: 'Courier New, monospace',
                      fontSize: '0.56rem',
                      fontWeight: 700,
                      padding: '2px 7px',
                      backgroundColor: categoryColors[event.category] || '#BFFF00',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {event.category}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* ── CERTIFICATES tab ── */}
          {activeTab === 'CERTIFICATES' && (
            <div className="animate-fade-in">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px' }}>
                {profile.certificates.map((cert, i) => (
                  <div
                    key={i}
                    style={{
                      border: '2.5px solid #0A0A0A',
                      boxShadow: '4px 4px 0px #0A0A0A',
                      overflow: 'hidden',
                      transition: 'transform 0.15s, box-shadow 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0px #0A0A0A' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = '4px 4px 0px #0A0A0A' }}
                  >
                    <div style={{ height: '6px', backgroundColor: cert.color, borderBottom: '2px solid #0A0A0A' }} />
                    <div style={{ padding: '16px' }}>
                      <Award size={20} style={{ marginBottom: '10px', color: '#888' }} />
                      <div style={{ fontWeight: 900, fontSize: '0.88rem', marginBottom: '4px', lineHeight: 1.2 }}>{cert.title}</div>
                      <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#888', marginBottom: '4px' }}>{cert.issuer}</div>
                      <div
                        style={{
                          display: 'inline-block',
                          backgroundColor: cert.color,
                          border: '1.5px solid #0A0A0A',
                          fontFamily: 'Courier New, monospace',
                          fontSize: '0.56rem',
                          fontWeight: 700,
                          padding: '2px 7px',
                          color: cert.color === '#0A0A0A' ? '#BFFF00' : '#0A0A0A',
                        }}
                      >
                        {cert.year}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ACTIVITY tab ── */}
          {activeTab === 'ACTIVITY' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '2.5px solid #0A0A0A' }}>
                {profile.activity.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'flex-start',
                      padding: '14px 18px',
                      borderBottom: i < profile.activity.length - 1 ? '1.5px solid #e5e2da' : 'none',
                      transition: 'background 0.1s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FBF7EF' }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
                  >
                    <div
                      style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: item.color,
                        border: '2px solid #0A0A0A',
                        borderRadius: '50%',
                        flexShrink: 0,
                        marginTop: '5px',
                      }}
                    />
                    <div style={{ flexGrow: 1 }}>
                      <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#888', marginRight: '8px' }}>
                        {item.action}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: '#333' }}>
                        {item.detail}
                      </span>
                    </div>
                    <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', color: '#bbb', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {editOpen && <EditProfileModal profile={profile} onClose={() => setEditOpen(false)} />}

      <style>{`
        @media (max-width: 900px) {
          .profile-layout {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
