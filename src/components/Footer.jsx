const links = {
  Learn: ['Start Here', 'Resources', 'AI Concepts', 'Blog'],
  Community: ['Mentors', 'Summer of AI 2026', 'Contribute', 'GitHub'],
  About: ['Our Mission', 'GirlScript Affiliation', 'Contact', 'Nominate a Mentor'],
}

export default function Footer() {
  return (
    <footer className="px-16 pt-16 pb-8" style={{ background: 'var(--ink)' }}>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 pb-12"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        {/* Brand */}
        <div>
          <div
            className="font-display font-bold text-xl mb-4"
            style={{ color: 'white', letterSpacing: '-0.02em' }}
          >
            Her<span style={{ color: 'var(--purple-mid)' }}>Stack</span>
          </div>
          <p className="text-sm leading-relaxed font-light" style={{ color: 'rgba(255,255,255,0.4)', maxWidth: 260 }}>
            An open source community platform helping girls across India learn AI, find mentors, and build the future — for free.
          </p>
        </div>

        {/* Link columns */}
        {Object.entries(links).map(([heading, items]) => (
          <div key={heading}>
            <h5
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              {heading}
            </h5>
            <ul className="flex flex-col gap-3 list-none">
              {items.map(item => (
                <li key={item}>
                  <a
                   href={item === 'Our Mission' ? '/our-mission' : '#'}
                   title={item !== 'Our Mission' ? 'Coming Soon' : ''}
                    className="text-sm font-light no-underline transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                    onMouseEnter={e => e.target.style.color = 'white'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.25)' }}>
          © 2025 HerStack · Made with <span style={{ color: 'var(--purple-mid)' }}>♥</span> for India's next generation of AI builders · Open Source
        </p>
        <div
          className="font-display font-bold text-base"
          style={{ color: 'white', letterSpacing: '-0.02em' }}
        >
          Her<span style={{ color: 'var(--purple-mid)' }}>Stack</span>
        </div>
      </div>
    </footer>
  )
}
