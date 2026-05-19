import { useState } from "react";
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Learn', href: '#learn' },
  { label: 'AI Concepts', href: '#concepts' },
  { label: 'Mentors', href: '#mentors' },
  { label: 'Summer of AI', href: '#summer' },
  { label: 'Contribute', href: '#contribute' },
];


export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
      <nav
          style={{background: 'rgba(253,250,245,0.85)', borderBottom: '1px solid rgba(13,13,13,0.1)'}}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      > 
        <div className="flex items-center justify-between px-6 lg:px-16 py-5">
          <a href="#" className="flex items-center gap-2 no-underline"
             style={{color: 'var(--ink)', letterSpacing: '-0.02em'}}>
            <img src="/favicon.svg" alt="" style={{height: 24}}/>
            <span className="font-display text-2xl font-bold tracking-tight">
              Her<span style={{color: 'var(--purple)'}}>Stack</span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-10 list-none">
            {NAV_LINKS.map(({label, href}) => (
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

          {/* hamburger button */}
          <button
            className="lg:hidden flex flex-col justify-center items-center gap-1.5 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <span style={{
              display: 'block', width: 24, height: 2,
              background: 'var(--purple)',
              transition: 'all 0.3s',
              transform: isOpen ? 'translateY(8px) rotate(45deg)' : 'none'
            }} />
            <span style={{
              display: 'block', width: 24, height: 2,
              background: 'var(--purple)',
              transition: 'all 0.3s',
              opacity: isOpen ? 0 : 1
            }} />
            <span style={{
              display: 'block', width: 24, height: 2,
              background: 'var(--purple)',
              transition: 'all 0.3s',
              transform: isOpen ? 'translateY(-8px) rotate(-45deg)' : 'none'
            }} />
          </button>
        </div>

        {/* mobile view */}
        {isOpen && (
          <div
            className="lg:hidden"
            style={{
              background: 'rgba(253,250,245,0.98)',
              borderTop: '1px solid rgba(13,13,13,0.1)',
              padding: '1rem 2rem 2rem'
            }}
          >
            <ul className="list-none flex flex-col gap-4">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
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
              <li>
                <a
                  href="https://github.com/HerStack-org"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium no-underline px-5 py-2 rounded-full inline-block mt-2"
                  style={{ background: 'var(--ink)', color: 'white' }}
                >
                  GitHub ↗
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
  )
}
