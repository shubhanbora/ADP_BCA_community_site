const ITEMS = [
  'BUILD', 'LEARN', 'COLLABORATE', 'SHARE', 'GROW',
  'BCA TECH COMMUNITY', 'EVENTS FROM 20+ PLATFORMS',
  'HACKATHONS', 'BOOTCAMPS', 'WORKSHOPS', 'GUWAHATI, ASSAM',
]

const SEP = <span style={{ color: '#FF2D9B', margin: '0 20px' }}>✦</span>

export default function TickerBar() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div style={{ background: '#0A0A0A', overflow: 'hidden', padding: '7px 0', borderBottom: '2px solid #0A0A0A' }}>
      <div className="ticker">
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '0.64rem', fontWeight: 700,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: '#C8FF00', marginRight: 0,
          }}>
            {item}{SEP}
          </span>
        ))}
      </div>
    </div>
  )
}
