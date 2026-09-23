import { useState } from 'react'
import { X, ChevronRight, ChevronLeft, User, MapPin, BookOpen, Link, Check } from 'lucide-react'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'

const STEPS = ['PROFILE', 'ACADEMIC', 'SKILLS', 'LINKS']

const SKILL_SUGGESTIONS = [
  'JavaScript', 'Python', 'React', 'Node.js', 'PHP', 'Java', 'C++',
  'MySQL', 'MongoDB', 'Git', 'HTML/CSS', 'TypeScript', 'Flutter',
  'Firebase', 'Docker', 'Figma', 'UI/UX', 'Machine Learning',
]

export default function OnboardingModal({ onComplete }) {
  const { user } = useAuth()

  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)

  // Step 0 — Profile
  const [username, setUsername] = useState(user?.username || user?.email?.split('@')[0] || '')
  const [bio, setBio] = useState(user?.bio || '')
  const [location, setLocation] = useState(user?.location || '')

  // Step 1 — Academic
  const [college, setCollege] = useState(user?.college || '')
  const [semester, setSemester] = useState(user?.semester || '1')
  const [role, setRole] = useState(user?.role === 'member' ? '' : user?.role || '')

  // Step 2 — Skills
  const [skills, setSkills] = useState(user?.skills || [])
  const [customSkill, setCustomSkill] = useState('')

  // Step 3 — Links
  const [github, setGithub] = useState(user?.githubUrl || '')
  const [linkedin, setLinkedin] = useState(user?.linkedinUrl || '')
  const [portfolio, setPortfolio] = useState(user?.portfolioUrl || '')

  const toggleSkill = (s) => {
    setSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  const addCustomSkill = () => {
    const trimmed = customSkill.trim()
    if (trimmed && !skills.includes(trimmed)) {
      setSkills(prev => [...prev, trimmed])
    }
    setCustomSkill('')
  }

  const handleFinish = async () => {
    setSaving(true)
    try {
      // setDoc with merge:true — works whether doc exists or not
      await setDoc(doc(db, 'users', user.uid), {
        username:     username.trim(),
        bio:          bio.trim(),
        location:     location.trim(),
        college:      college.trim(),
        semester,
        role:         role || 'member',
        skills,
        githubUrl:    github.trim(),
        linkedinUrl:  linkedin.trim(),
        portfolioUrl: portfolio.trim(),
        profileComplete: true,
        updatedAt:    new Date().toISOString(),
      }, { merge: true })   // ← merge keeps existing fields (uid, email, createdAt etc.)

      localStorage.setItem(`onboarded_${user.uid}`, 'true')
    } catch (err) {
      console.error('Onboarding save failed:', err)
      alert('Failed to save. Please try again.')
      setSaving(false)
      return
    }
    setSaving(false)
    onComplete()
  }

  const handleSkip = () => {
    // Set localStorage so it doesn't reappear on refresh
    localStorage.setItem(`onboarded_${user.uid}`, 'true')
    onComplete()
  }

  const canNext = () => {
    if (step === 0) return username.trim().length > 0
    return true
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div className="fade-up" style={{ background: '#F4F0E6', border: '2px solid #0A0A0A', boxShadow: '8px 8px 0 #0A0A0A', width: '100%', maxWidth: 520, overflow: 'hidden' }}>

        {/* Top accent + progress */}
        <div style={{ height: 4, background: '#C8FF00' }} />
        <div style={{ display: 'flex', borderBottom: '2px solid #0A0A0A' }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ flex: 1, padding: '10px 0', textAlign: 'center', borderRight: i < STEPS.length - 1 ? '2px solid #0A0A0A' : 'none', background: i < step ? '#C8FF00' : i === step ? '#0A0A0A' : 'transparent', transition: 'background 0.2s' }}>
              <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.56rem', fontWeight: 700, letterSpacing: '0.1em', color: i === step ? '#C8FF00' : i < step ? '#0A0A0A' : '#aaa' }}>
                {i < step ? '✓' : s}
              </span>
            </div>
          ))}
        </div>

        <div style={{ padding: '28px 28px 24px' }}>
          {/* Header */}
          <div style={{ marginBottom: 24 }}>
            <span className="section-number">{`0${step + 1} / ${STEPS.length}`}</span>
            <h2 style={{ fontSize: '1.6rem', letterSpacing: '-0.02em', marginTop: 3 }}>
              {step === 0 && 'Set Up Your Profile'}
              {step === 1 && 'Academic Details'}
              {step === 2 && 'Your Skills'}
              {step === 3 && 'Your Links'}
            </h2>
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.62rem', color: '#888', marginTop: 5 }}>
              {step === 0 && `Welcome, ${user?.displayName?.split(' ')[0] || 'there'}! Fill in a few details to get started.`}
              {step === 1 && 'Tell the community about your academic background.'}
              {step === 2 && 'Select or add the technologies you work with.'}
              {step === 3 && 'Add your links so people can find your work. (All optional)'}
            </p>
          </div>

          {/* ── Step 0: Profile ── */}
          {step === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Pre-filled name from Google — read only display */}
              {user?.displayName && (
                <div style={{ background: '#fff9f0', border: '1.5px solid #e0ddd5', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  {user?.photoURL
                    ? <img src={user.photoURL} alt="" style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid #0A0A0A' }} />
                    : <div style={{ width: 36, height: 36, background: '#C8FF00', border: '2px solid #0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Courier New, monospace', fontWeight: 900, fontSize: '0.8rem' }}>{user.displayName[0]}</div>
                  }
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{user.displayName}</div>
                    <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', color: '#888' }}>{user.email} · from Google</div>
                  </div>
                </div>
              )}
              <FField label="USERNAME *" icon={User} placeholder="e.g. shubhanbora" value={username} onChange={e => setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))} />
              <FField label="BIO" icon={User} placeholder="Building things, learning new tech…" value={bio} onChange={e => setBio(e.target.value)} textarea />
              <FField label="LOCATION" icon={MapPin} placeholder="Guwahati, Assam" value={location} onChange={e => setLocation(e.target.value)} />
            </div>
          )}

          {/* ── Step 1: Academic ── */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <FField label="COLLEGE / INSTITUTION" icon={BookOpen} placeholder="ADP College, Guwahati" value={college} onChange={e => setCollege(e.target.value)} />
              <div>
                <FLabel>SEMESTER</FLabel>
                <select className="input" style={{ cursor: 'pointer' }} value={semester} onChange={e => setSemester(e.target.value)}>
                  {[1,2,3,4,5,6].map(s => <option key={s} value={s}>{s}{['st','nd','rd','th','th','th'][s-1]} Semester</option>)}
                </select>
              </div>
              <div>
                <FLabel>YOUR ROLE</FLabel>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['Frontend Dev', 'Backend Dev', 'Full Stack', 'UI/UX Designer', 'ML/AI', 'DevOps', 'Mobile Dev', 'Student'].map(r => (
                    <button key={r} onClick={() => setRole(r)}
                      style={{ border: '2px solid #0A0A0A', padding: '5px 12px', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, cursor: 'pointer', background: role === r ? '#0A0A0A' : 'transparent', color: role === r ? 'white' : '#0A0A0A', boxShadow: role === r ? '2px 2px 0 #C8FF00' : '2px 2px 0 #0A0A0A', transition: 'all 0.1s' }}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 2: Skills ── */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                {SKILL_SUGGESTIONS.map(s => {
                  const active = skills.includes(s)
                  return (
                    <button key={s} onClick={() => toggleSkill(s)}
                      style={{ border: '2px solid #0A0A0A', padding: '5px 12px', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, cursor: 'pointer', background: active ? '#C8FF00' : 'transparent', color: '#0A0A0A', boxShadow: active ? '2px 2px 0 #0A0A0A' : '1px 1px 0 #ccc', transition: 'all 0.1s', display: 'flex', alignItems: 'center', gap: 5 }}>
                      {active && <Check size={10} strokeWidth={3} />}{s}
                    </button>
                  )
                })}
              </div>
              {/* Custom skill */}
              <div style={{ display: 'flex', gap: 8 }}>
                <input className="input" placeholder="Add a skill…" value={customSkill}
                  onChange={e => setCustomSkill(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustomSkill() } }}
                  style={{ flexGrow: 1 }} />
                <button className="btn btn-outline" onClick={addCustomSkill} style={{ padding: '8px 14px', fontSize: '0.65rem', flexShrink: 0 }}>ADD</button>
              </div>
              {skills.length > 0 && (
                <div>
                  <FLabel>SELECTED ({skills.length})</FLabel>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {skills.map(s => (
                      <span key={s} onClick={() => toggleSkill(s)}
                        style={{ background: '#C8FF00', border: '2px solid #0A0A0A', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, padding: '3px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                        {s} <X size={9} strokeWidth={3} />
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Step 3: Links ── */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <FField label="GITHUB" icon={Link} placeholder="github.com/yourusername" value={github} onChange={e => setGithub(e.target.value)} />
              <FField label="LINKEDIN" icon={Link} placeholder="linkedin.com/in/yourname" value={linkedin} onChange={e => setLinkedin(e.target.value)} />
              <FField label="PORTFOLIO / WEBSITE" icon={Link} placeholder="yourwebsite.com" value={portfolio} onChange={e => setPortfolio(e.target.value)} />
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 28, paddingTop: 20, borderTop: '1.5px solid #e5e1d8' }}>
            <button onClick={handleSkip} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', color: '#bbb', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              SKIP FOR NOW
            </button>
            <div style={{ display: 'flex', gap: 10 }}>
              {step > 0 && (
                <button className="btn btn-outline" onClick={() => setStep(s => s - 1)} style={{ padding: '8px 16px', fontSize: '0.68rem', gap: 6 }}>
                  <ChevronLeft size={14} /> BACK
                </button>
              )}
              {step < STEPS.length - 1 ? (
                <button className="btn btn-black" onClick={() => setStep(s => s + 1)} disabled={!canNext()} style={{ padding: '8px 18px', fontSize: '0.68rem', gap: 6, opacity: canNext() ? 1 : 0.5 }}>
                  NEXT <ChevronRight size={14} />
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleFinish} disabled={saving} style={{ padding: '8px 20px', fontSize: '0.68rem', gap: 6, opacity: saving ? 0.7 : 1 }}>
                  {saving ? 'SAVING…' : 'FINISH SETUP →'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── helpers ── */
function FLabel({ children }) {
  return (
    <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 5, textTransform: 'uppercase', color: '#888' }}>
      {children}
    </div>
  )
}

function FField({ label, icon: Icon, textarea, ...props }) {
  return (
    <div>
      <FLabel>{label}</FLabel>
      <div style={{ position: 'relative' }}>
        <Icon size={13} style={{ position: 'absolute', left: 12, top: textarea ? 12 : '50%', transform: textarea ? 'none' : 'translateY(-50%)', color: '#aaa' }} />
        {textarea
          ? <textarea className="input" rows={3} style={{ paddingLeft: 36, resize: 'vertical', lineHeight: 1.6 }} {...props} />
          : <input className="input" style={{ paddingLeft: 36 }} {...props} />
        }
      </div>
    </div>
  )
}
