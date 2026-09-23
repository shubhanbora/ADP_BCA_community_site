const items = [
  'BUILD • LEARN • COLLABORATE • SHARE • GROW',
  'BCA TECH COMMUNITY',
  'UPCOMING: HACK2SKILL AI HACKATHON 2026',
  'NEW PROJECTS SUBMITTED',
  'JOIN 1200+ MEMBERS',
  'IDEAS INTO REALITY',
  'GUWAHATI, ASSAM',
  'EVENTS FROM 20+ PLATFORMS',
]

export default function TickerBar() {
  const repeated = [...items, ...items, ...items]
  return (
    <div
      style={{
        backgroundColor: '#0A0A0A',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        borderBottom: '2px solid #0A0A0A',
        padding: '7px 0',
      }}
    >
      <div className="animate-marquee">
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '0.66rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#BFFF00',
              marginRight: '48px',
            }}
          >
            {item}
            <span style={{ color: '#FF3CAC', marginLeft: '24px' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
