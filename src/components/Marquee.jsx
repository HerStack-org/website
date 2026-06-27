const items = [
  'Free Resources', 'AI Concepts Made Visual', 'Women Mentors',
  'Open Source', 'Summer of AI 2026', 'Community Built', 'Pan India',
]

export default function Marquee() {
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden flex py-6" style={{ background: '#0D0D0D' }}>
      <div className="flex gap-12 animate-marquee whitespace-nowrap flex-shrink-0">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            {item}
            <span style={{ color: 'var(--purple-mid)' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
