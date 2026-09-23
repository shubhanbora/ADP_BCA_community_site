import { useState } from 'react'
import { Heart, MessageCircle, Bookmark, Plus, Search, TrendingUp, X, Share2 } from 'lucide-react'
import { posts as initialPosts, trendingTopics, postCategories } from '../data/community'

const categoryColors = {
  Discussion: '#BFFF00',
  Project: '#FF3CAC',
  Opportunity: '#FFE44D',
  Achievement: '#0A0A0A',
  Question: '#BFFF00',
}

const avatarColors = {
  PS: '#BFFF00', AD: '#FF3CAC', RB: '#FFE44D', DB: '#0A0A0A',
  SD: '#FF3CAC', RS: '#BFFF00', NB: '#FFE44D',
}

/* ─── Post Card ─── */
function PostCard({ post, onLike, onSave }) {
  const catColor = categoryColors[post.category] || '#BFFF00'
  const avColor = avatarColors[post.avatar] || '#BFFF00'
  const [expanded, setExpanded] = useState(false)
  const isLong = post.content.length > 180

  return (
    <div className="card-brutal" style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              backgroundColor: avColor,
              border: '2.5px solid #0A0A0A',
              boxShadow: '2px 2px 0px #0A0A0A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Courier New, monospace',
              fontWeight: 900,
              fontSize: '0.7rem',
              flexShrink: 0,
              color: avColor === '#0A0A0A' ? 'white' : '#0A0A0A',
            }}
          >
            {post.avatar}
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: '0.92rem', lineHeight: 1.2 }}>{post.author}</div>
            <div style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', color: '#888' }}>
              {post.semester} · {post.timeAgo}
            </div>
          </div>
        </div>
        <span
          style={{
            backgroundColor: catColor,
            border: '2px solid #0A0A0A',
            fontFamily: 'Courier New, monospace',
            fontSize: '0.56rem',
            fontWeight: 700,
            padding: '3px 8px',
            letterSpacing: '0.1em',
            color: catColor === '#0A0A0A' ? 'white' : '#0A0A0A',
            whiteSpace: 'nowrap',
          }}
        >
          {post.category.toUpperCase()}
        </span>
      </div>

      {/* Content */}
      <p
        style={{
          fontSize: '0.9rem',
          lineHeight: 1.68,
          color: '#333',
          marginBottom: '12px',
        }}
      >
        {isLong && !expanded ? post.content.slice(0, 180) + '…' : post.content}
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Courier New, monospace',
              fontSize: '0.62rem',
              fontWeight: 700,
              color: '#FF3CAC',
              marginLeft: '4px',
              letterSpacing: '0.06em',
            }}
          >
            {expanded ? 'LESS' : 'MORE'}
          </button>
        )}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
        {post.tags.map(tag => (
          <span
            key={tag}
            style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '0.6rem',
              color: '#FF3CAC',
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '0.04em',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div
        style={{
          borderTop: '1.5px solid #e5e2da',
          paddingTop: '12px',
          display: 'flex',
          gap: '18px',
          alignItems: 'center',
        }}
      >
        <button
          onClick={() => onLike(post.id)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontFamily: 'Courier New, monospace',
            fontSize: '0.66rem',
            fontWeight: 700,
            color: post.liked ? '#FF3CAC' : '#888',
            transition: 'color 0.15s',
          }}
        >
          <Heart size={14} fill={post.liked ? '#FF3CAC' : 'none'} color={post.liked ? '#FF3CAC' : '#888'} />
          {post.likes}
        </button>
        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontFamily: 'Courier New, monospace',
            fontSize: '0.66rem',
            fontWeight: 700,
            color: '#888',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#0A0A0A' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#888' }}
        >
          <MessageCircle size={14} />
          {post.comments}
        </button>
        <button
          onClick={() => onSave(post.id)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontFamily: 'Courier New, monospace',
            fontSize: '0.62rem',
            fontWeight: 700,
            color: post.saved ? '#0A0A0A' : '#aaa',
            transition: 'color 0.15s',
          }}
        >
          <Bookmark size={14} fill={post.saved ? '#0A0A0A' : 'none'} color={post.saved ? '#0A0A0A' : '#aaa'} />
        </button>
      </div>
    </div>
  )
}

/* ─── Create Post Modal ─── */
function CreatePostModal({ onClose }) {
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('Discussion')

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
          padding: '28px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
          <div>
            <span className="section-number">NEW POST /</span>
            <h2 style={{ fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.02em', marginTop: '2px' }}>
              CREATE POST
            </h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ marginBottom: '14px' }}>
          <label style={{ display: 'block', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '8px', textTransform: 'uppercase', color: '#888' }}>
            CATEGORY
          </label>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['Discussion', 'Project', 'Opportunity', 'Achievement', 'Question'].map(cat => {
              const color = categoryColors[cat] || '#BFFF00'
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    border: '2px solid #0A0A0A',
                    padding: '4px 10px',
                    fontFamily: 'Courier New, monospace',
                    fontSize: '0.58rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    backgroundColor: category === cat ? color : 'transparent',
                    color: category === cat && color === '#0A0A0A' ? 'white' : '#0A0A0A',
                    boxShadow: category === cat ? '2px 2px 0px #0A0A0A' : 'none',
                    transition: 'all 0.1s',
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '6px', textTransform: 'uppercase', color: '#888' }}>
            WHAT'S ON YOUR MIND?
          </label>
          <textarea
            className="input-brutal"
            rows={5}
            placeholder="Share your thoughts, projects, questions, wins..."
            value={content}
            onChange={e => setContent(e.target.value)}
            style={{ resize: 'vertical', lineHeight: 1.6 }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontFamily: 'Courier New, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '6px', textTransform: 'uppercase', color: '#888' }}>
            TAGS (optional)
          </label>
          <input
            className="input-brutal"
            placeholder="#React  #Hackathon  #OpenSource"
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-black" onClick={onClose} style={{ flexGrow: 1, justifyContent: 'center', fontSize: '0.78rem' }}>
            POST →
          </button>
          <button className="btn-outline" onClick={onClose} style={{ fontSize: '0.72rem' }}>
            CANCEL
          </button>
        </div>

        <div style={{ marginTop: '14px', backgroundColor: '#FFE44D', border: '2px solid #0A0A0A', padding: '8px 12px', fontFamily: 'Courier New, monospace', fontSize: '0.62rem', fontWeight: 700 }}>
          ⚡ DEMO MODE — Posts are not saved. This is a frontend-only demo.
        </div>
      </div>
    </div>
  )
}

/* ─── CommunityPage ─── */
export default function CommunityPage({ isLoggedIn, openLogin }) {
  const [postsList, setPostsList] = useState(initialPosts)
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [createPostOpen, setCreatePostOpen] = useState(false)

  const handleLike = (id) => {
    setPostsList(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    )
  }

  const handleSave = (id) => {
    setPostsList(prev =>
      prev.map(p => p.id === id ? { ...p, saved: !p.saved } : p)
    )
  }

  const filtered = postsList.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      p.content.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    return matchCat && matchSearch
  })

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
          <span className="section-number">03 /</span>
          <h1
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 5rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              marginTop: '4px',
            }}
          >
            COMMUNITY
          </h1>
          <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.68rem', color: '#666', marginTop: '8px', letterSpacing: '0.04em' }}>
            Connect, discuss, share and grow with BCA students across India.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="sticky-note">
            PEOPLE<br />IDEAS<br />CONVERSATIONS
          </div>
          <button
            className="btn-black"
            onClick={isLoggedIn ? () => setCreatePostOpen(true) : openLogin}
            style={{ gap: '7px' }}
          >
            <Plus size={15} />
            CREATE POST
          </button>
        </div>
      </div>

      {/* ─── Content area ─── */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '24px',
          display: 'grid',
          gridTemplateColumns: '1fr 288px',
          gap: '28px',
          alignItems: 'flex-start',
        }}
        className="community-layout"
      >
        {/* ── Main feed ── */}
        <div>
          {/* Search */}
          <div style={{ position: 'relative', marginBottom: '14px' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            <input
              className="input-brutal"
              placeholder="Search posts, people, topics..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={14} color="#888" />
              </button>
            )}
          </div>

          {/* Category filters */}
          <div
            style={{ display: 'flex', gap: '6px', marginBottom: '22px', overflowX: 'auto', paddingBottom: '4px' }}
            className="scrollbar-hide"
          >
            {postCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  border: '2.5px solid #0A0A0A',
                  padding: '5px 13px',
                  fontFamily: 'Courier New, monospace',
                  fontSize: '0.6rem',
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

          {/* Post count */}
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.62rem', color: '#999' }}>
              <strong style={{ color: '#0A0A0A' }}>{filtered.length}</strong> POST{filtered.length !== 1 ? 'S' : ''}
            </span>
          </div>

          {/* Posts feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filtered.map(post => (
              <PostCard key={post.id} post={post} onLike={handleLike} onSave={handleSave} />
            ))}
            {filtered.length === 0 && (
              <div style={{ border: '2.5px solid #0A0A0A', padding: '48px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.72rem', color: '#aaa', letterSpacing: '0.1em' }}>
                  NO POSTS FOUND.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div>
          {/* Trending topics */}
          <div
            style={{
              border: '2.5px solid #0A0A0A',
              boxShadow: '5px 5px 0px #0A0A0A',
              marginBottom: '20px',
              overflow: 'hidden',
              position: 'sticky',
              top: '80px',
            }}
          >
            {/* Sidebar header */}
            <div
              style={{
                backgroundColor: '#0A0A0A',
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <TrendingUp size={15} color="#BFFF00" />
              <span style={{ fontFamily: 'Courier New, monospace', fontWeight: 900, fontSize: '0.67rem', letterSpacing: '0.12em', color: '#BFFF00', textTransform: 'uppercase' }}>
                TRENDING TOPICS
              </span>
            </div>
            <div style={{ padding: '6px 0' }}>
              {trendingTopics.map((topic, i) => (
                <div
                  key={i}
                  onClick={() => setSearch(topic.tag.replace('#', ''))}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '9px 18px',
                    borderBottom: i < trendingTopics.length - 1 ? '1px solid #f0ece4' : 'none',
                    cursor: 'pointer',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#BFFF00' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
                >
                  <span style={{ fontFamily: 'Courier New, monospace', fontWeight: 700, fontSize: '0.7rem', color: '#FF3CAC' }}>
                    {topic.tag}
                  </span>
                  <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', color: '#aaa' }}>
                    {topic.posts}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Community CTA box */}
          <div
            style={{
              border: '2.5px solid #0A0A0A',
              backgroundColor: '#0A0A0A',
              boxShadow: '5px 5px 0px #BFFF00',
              padding: '20px',
            }}
          >
            <p style={{ fontFamily: 'Courier New, monospace', fontSize: '0.58rem', color: '#666', letterSpacing: '0.1em', marginBottom: '8px', textTransform: 'uppercase' }}>
              GOOD PEOPLE BUILD GREAT THINGS
            </p>
            <p style={{ color: '#BFFF00', fontWeight: 900, fontSize: '1rem', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '14px' }}>
              Share your ideas,<br />projects and wins.
            </p>
            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.7rem' }}
              onClick={isLoggedIn ? () => setCreatePostOpen(true) : openLogin}
            >
              START POSTING →
            </button>
          </div>
        </div>
      </div>

      {createPostOpen && <CreatePostModal onClose={() => setCreatePostOpen(false)} />}

      <style>{`
        @media (max-width: 900px) {
          .community-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
