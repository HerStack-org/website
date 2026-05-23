import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { storyboards } from '../data/storyboards'
import { HighlightedText } from './Tooltip'

const difficultyColors = {
  beginner: { bg: 'rgba(123,92,240,0.15)', color: '#A78BFA' },
  intermediate: { bg: 'rgba(0,201,167,0.15)', color: '#00C9A7' },
  advanced: { bg: 'rgba(245,166,35,0.15)', color: '#F5A623' },
}

export default function Storyboards() {
  const [startIndex, setStartIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setStartIndex((prev) => (prev + 3) % storyboards.length)
        setFade(true)
      }, 400)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const visibleConcepts = [
    storyboards[startIndex % storyboards.length],
    storyboards[(startIndex + 1) % storyboards.length],
    storyboards[(startIndex + 2) % storyboards.length],
  ]

  const totalDots = Math.ceil(storyboards.length / 3)
  const activeDot = Math.floor(startIndex / 3) % totalDots

  return (
    <section id="concepts" className="py-16 lg:py-24 px-5 sm:px-8 lg:px-16" style={{ background: 'var(--ink)' }}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10 sm:mb-12">
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
          className="btn-secondary hidden md:inline-flex text-white/60 border-white/15 hover:text-black hover:bg-white hover:border-white"
        >
          View all concepts →
        </Link>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
        style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.4s ease' }}
      >
        {visibleConcepts.map((s, i) => (
          <div
            key={`${s.id}-${i}`}
            className="rounded-2xl cursor-pointer transition-all duration-200"
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
              className="h-44 flex items-center justify-center text-6xl relative rounded-t-2xl overflow-hidden"
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
            <div className="p-5 rounded-b-2xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="font-display font-bold text-base mb-1.5" style={{ color: 'white' }}>
                <HighlightedText text={s.title} />
              </div>
              <div className="text-sm leading-relaxed font-light" style={{ color: 'rgba(255,255,255,0.45)' }}>
                <HighlightedText text={s.description} />
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

      {/* Dot indicators + progress bar */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <div className="flex gap-2">
          {Array.from({ length: totalDots }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setFade(false); setTimeout(() => { setStartIndex(i * 3); setFade(true) }, 400) }}
              style={{
                width: i === activeDot ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === activeDot ? 'white' : 'rgba(255,255,255,0.25)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
              aria-label={`Go to group ${i + 1}`}
            />
          ))}
        </div>
        {/* 10s progress bar */}
        <ProgressBar key={startIndex} />
      </div>

      <div className="text-center mt-6 md:hidden">
        <Link to="/concepts" className="btn-secondary inline-flex text-white/60 border-white/15">
          View all concepts →
        </Link>
      </div>
    </section>
  )
}

function ProgressBar() {
  return (
    <div style={{ width: 120, height: 2, background: 'rgba(255,255,255,0.15)', borderRadius: 2, overflow: 'hidden' }}>
      <div
        style={{
          height: '100%',
          background: 'white',
          borderRadius: 2,
          animation: 'progress10s 10s linear forwards',
        }}
      />
      <style>{`
        @keyframes progress10s {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </div>
  )
}