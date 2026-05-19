import { Link } from 'react-router-dom'
export default function Nav() {
  return (
      <nav
          style={{background: 'rgba(253,250,245,0.85)', borderBottom: '1px solid rgba(13,13,13,0.1)'}}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16 py-5 backdrop-blur-md"
      >
        <Link to="/" className="flex items-center gap-2 no-underline"
           style={{color: 'var(--ink)', letterSpacing: '-0.02em'}}>
          <img src="/favicon.svg" alt="" style={{height: 24}}/>
          <span className="font-display text-2xl font-bold tracking-tight">
            Her<span style={{color: 'var(--purple)'}}>Stack</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-10 list-none">
          {[
            {label: 'Learn', href: '/#learn'},
            {label: 'AI Concepts', href: '/#concepts'},
            {label: 'Mentors', href: '/#mentors'},
            {label: 'Summer of AI', href: '/#summer'},
            {label: 'Contribute', href: '/#contribute'},
          ].map(({label, href}) => (
              <li key={label}>
                <a
                    href={href}
                    className="text-sm font-medium no-underline transition-colors duration-200"
                    style={{color: 'var(--ink-soft)'}}
                    onMouseEnter={e => e.target.style.color = 'var(--ink)'}
                    onMouseLeave={e => e.target.style.color = 'var(--ink-soft)'}
                >
                  {label}
                </a>
              </li>
          ))}
          <li>
            <a
                href="https://github.com/HerStack-org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium no-underline px-5 py-2 rounded-full transition-all duration-200"
                style={{background: 'var(--ink)', color: 'white'}}
                onMouseEnter={e => e.target.style.background = 'var(--purple)'}
                onMouseLeave={e => e.target.style.background = 'var(--ink)'}
            >
              GitHub ↗
            </a>
          </li>
        </ul>
      </nav>
  )
}
