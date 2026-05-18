import { Link } from 'react-router-dom'
import { storyboards } from '../data/storyboards'

const difficultyColors = {
  beginner: { bg: 'rgba(123,92,240,0.15)', color: '#A78BFA' },
  intermediate: { bg: 'rgba(0,201,167,0.15)', color: '#00C9A7' },
  advanced: { bg: 'rgba(245,166,35,0.15)', color: '#F5A623' },
}

export default function Storyboards() {
  return (
    <section id="concepts" className="py-24 px-16" style={{ background: 'var(--ink)' }}>
      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
            AI Concepts
          </div>
          <h2 className="font-display font-bold leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em', color: 'white' }}>
            Big ideas, made visual
          </h2>
        </div>
        <Link
          to="/concepts"
          className="btn-secondary hidden md:inline-flex"
          style={{ color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.15)' }}
        >
          View all concepts →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {storyboards.slice(0, 3).map((s) => (
          <div
            key={s.id}
            className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
            }}
          >
            <div
              className="h-44 flex items-center justify-center text-6xl relative"
              style={{ background: s.gradient }}
            >
              {s.emoji}
              <div
                className="absolute bottom-3 left-3 text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                Visual Explainer
              </div>
            </div>
            <div className="p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="font-display font-bold text-base mb-1.5" style={{ color: 'white' }}>
                {s.title}
              </div>
              <div className="text-sm leading-relaxed font-light" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {s.description}
              </div>
              <span
                className="inline-block mt-3 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                style={difficultyColors[s.difficulty]}
              >
                {s.difficulty}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
