import { Link } from 'react-router-dom'

const links = {
  Learn: [
    { label: 'Start Here', href: '#' },
    { label: 'Resources', href: '#' },
    { label: 'AI Concepts', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  Community: [
    { label: 'Mentors', href: '#' },
    { label: 'Summer of AI 2026', href: '#' },
    { label: 'Contribute', href: '#' },
    { label: 'GitHub', href: 'https://github.com/HerStack-org', external: true },
  ],
  About: [
    { label: 'Our Mission', href: '/our-mission', internal: true },
    { label: 'GirlScript Affiliation', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Nominate a Mentor', href: '#' },
  ],
}

const linkStyle = {
  color: 'rgba(255,255,255,0.55)',
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
                  {items.map(({ label, href, internal, external }) => (
                      <li key={label}>
                        {internal ? (
                            <Link
                                to={href}
                                className="text-sm font-light no-underline transition-colors duration-200"
                                style={linkStyle}
                                onMouseEnter={e => e.target.style.color = 'white'}
                                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
                            >
                              {label}
                            </Link>
                        ) : (

                          <a  href={href}
                          title={href === '#' ? 'Coming Soon' : ''}
                          target={external ? '_blank' : undefined}
                          rel={external ? 'noopener noreferrer' : undefined}
                          className="text-sm font-light no-underline transition-colors duration-200"
                          style={linkStyle}
                          onMouseEnter={e => e.target.style.color = 'white'}
                          onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
                          >
                        {label}
                          </a>
                          )}
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