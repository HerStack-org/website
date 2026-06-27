import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../hooks/useTheme'

const NAV_LINKS = [
  { label: 'Learn', href: '/#learn' },
  { label: 'AI Concepts', href: '/#concepts' },
  { label: 'Mentors', href: '/#mentors' },
  { label: 'Summer of AI', href: '/#summer' },
  { label: 'Contribute', href: '/#contribute' },
]

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  return (
    <nav
      style={{ backgroundColor: 'color-mix(in srgb, var(--cream) 85%, transparent)', borderBottom: '1px solid var(--border)' }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
    >
      <div className="flex items-center justify-between px-6 lg:px-16 py-5">
        <Link to="/" className="flex items-center gap-2 no-underline"
          style={{ color: 'var(--ink)', letterSpacing: '-0.02em' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/favicon.svg" alt="" style={{ height: 24 }} />
          <span className="font-display text-2xl font-bold tracking-tight">
            Her<span style={{ color: 'var(--purple)' }}>Stack</span>
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden lg:flex items-center gap-10 list-none">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              
               <a href={href}
                className="text-sm font-medium no-underline transition-colors duration-200"
                style={{ color: 'var(--ink-soft)' }}
                onMouseEnter={e => e.target.style.color = 'var(--ink)'}
                onMouseLeave={e => e.target.style.color = 'var(--ink-soft)'}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            
             <a href="https://github.com/HerStack-org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium no-underline px-5 py-2 rounded-full transition-all duration-200"
              style={{ background: 'var(--ink)', color: 'var(--cream)' }}
              onMouseEnter={e => e.target.style.background = 'var(--purple)'}
              onMouseLeave={e => e.target.style.background = 'var(--ink)'}
            >
              GitHub ↗
            </a>
          </li>
          <li>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full flex items-center justify-center transition-colors duration-200"
              style={{ color: 'var(--ink-soft)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-soft)'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center items-center gap-1.5 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <span style={{ display: 'block', width: 24, height: 2, background: 'var(--purple)', transition: 'all 0.3s', transform: isOpen ? 'translateY(8px) rotate(45deg)' : 'none' }} />
          <span style={{ display: 'block', width: 24, height: 2, background: 'var(--purple)', transition: 'all 0.3s', opacity: isOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: 24, height: 2, background: 'var(--purple)', transition: 'all 0.3s', transform: isOpen ? 'translateY(-8px) rotate(-45deg)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="lg:hidden"
          style={{ backgroundColor: 'color-mix(in srgb, var(--cream) 98%, transparent)', borderTop: '1px solid var(--border)', padding: '1rem 2rem 2rem' }}
        >
          <ul className="list-none flex flex-col gap-4">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                
                 <a href={href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium no-underline block py-1"
                  style={{ color: 'var(--ink-soft)', fontSize: '1rem' }}
                  onMouseEnter={e => e.target.style.color = 'var(--ink)'}
                  onMouseLeave={e => e.target.style.color = 'var(--ink-soft)'}
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-4 mt-2">
              
               <a href="https://github.com/HerStack-org"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="text-base font-medium no-underline px-5 py-2 rounded-full inline-block"
                style={{ background: 'var(--ink)', color: 'var(--cream)' }}
              >
                GitHub ↗
              </a>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{ color: 'var(--ink-soft)' }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <FiMoon size={24} /> : <FiSun size={24} />}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}