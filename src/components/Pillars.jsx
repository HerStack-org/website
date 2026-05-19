const pillars = [
  {
    num: '01',
    icon: '📚',
    iconBg: 'var(--purple-light)',
    title: 'Curated Resources',
    description: 'The best free courses, lectures, and certifications — handpicked and organized into clear learning paths. Not random YouTube links. The actual good stuff.',
  },
  {
    num: '02',
    icon: '🎨',
    iconBg: '#E8F4FD',
    title: 'AI Concepts Visualized',
    description: 'Machine learning, neural networks, LLMs — explained through beautiful illustrated storyboards. Because understanding shouldn\'t require a PhD.',
  },
  {
    num: '03',
    icon: '🤝',
    iconBg: '#E8FDF5',
    title: 'Women Mentors',
    description: 'Real women working in AI across India\'s top companies and startups. See their paths, get inspired, and reach out directly on LinkedIn.',
  },
]

export default function Pillars() {
  return (
    <section id="about" className="py-16 lg:py-24 px-5 sm:px-8 lg:px-16" style={{ background: 'white' }}>
      <div className="mb-16 max-w-2xl">
        <div className="section-label">What we do</div>
        <h2 className="section-title">Everything a girl needs<br />to start building with AI</h2>
        <p className="section-sub">No fees. No gatekeeping. Just quality resources, real mentors, and a community that believes in you.</p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3 rounded-2xl overflow-hidden"
        style={{ gap: '1.5px', background: 'var(--border)', border: '1.5px solid var(--border)' }}
      >
        {pillars.map(({ num, icon, iconBg, title, description }) => (
          <div
            key={num}
            className="relative p-10 transition-colors duration-300 cursor-default"
            style={{ background: 'white' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--cream)'}
            onMouseLeave={e => e.currentTarget.style.background = 'white'}
          >
            <div
              className="absolute top-6 right-6 font-display font-bold leading-none select-none"
              style={{ fontSize: '3rem', color: 'rgba(13,13,13,0.04)' }}
            >
              {num}
            </div>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6"
              style={{ background: iconBg }}
            >
              {icon}
            </div>
            <h3
              className="font-display font-bold text-xl mb-3"
              style={{ letterSpacing: '-0.02em' }}
            >
              {title}
            </h3>
            <p className="text-sm leading-relaxed font-light" style={{ color: 'var(--ink-soft)' }}>
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
