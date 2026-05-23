import { useState, useEffect } from 'react'
import { mentors, avatarStyles } from '../data/mentors'

const VISIBLE = 4

export default function Mentors() {
  const [startIndex, setStartIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setStartIndex((prev) => (prev + VISIBLE) % mentors.length)
        setFade(true)
      }, 400)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const visibleMentors = Array.from({ length: VISIBLE }, (_, i) =>
    mentors[(startIndex + i) % mentors.length]
  )

  const totalDots = Math.ceil(mentors.length / VISIBLE)
  const activeDot = Math.floor(startIndex / VISIBLE) % totalDots

  return (
    <section id="mentors" className="py-16 lg:py-24 px-5 sm:px-8 lg:px-16" style={{ background: 'white' }}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10 sm:mb-12">
        <div>
          <div className="section-label">Role Models</div>
          <h2 className="section-title">Women who have walked this path before you</h2>
        </div>
        <a href="#" className="btn-secondary hidden md:inline-flex">See all mentors</a>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.4s ease' }}
      >
        {visibleMentors.map((mentor, i) => (
          <div
            key={mentor.id + '-' + i}
            className="rounded-2xl p-6 transition-all duration-200 cursor-default"
            style={{ border: '1px solid var(--border)', background: 'var(--cream)' }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--purple)'
              e.currentTarget.style.background = 'white'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.background = 'var(--cream)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div
              className="rounded-full flex items-center justify-center font-display font-bold text-lg text-white mb-4"
              style={{ ...avatarStyles[mentor.avatarColor], width: 52, height: 52 }}
            >
              {mentor.initials}
            </div>
            <div className="font-display font-bold text-base mb-0.5" style={{ color: 'var(--ink)' }}>
              {mentor.name}
            </div>
            <div className="text-xs font-light mb-3" style={{ color: 'var(--ink-muted)' }}>
              {mentor.role}
            </div>
            <p className="text-sm leading-relaxed italic font-light mb-4" style={{ color: 'var(--ink-soft)' }}>
              "{mentor.advice}"
            </p>
            <a
              href={mentor.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold no-underline transition-all duration-200"
              style={{ color: 'var(--purple)' }}
            >
              Connect on LinkedIn
            </a>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <div className="flex gap-2">
          {Array.from({ length: totalDots }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setFade(false)
                setTimeout(() => {
                  setStartIndex(i * VISIBLE)
                  setFade(true)
                }, 400)
              }}
              style={{
                width: i === activeDot ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === activeDot ? 'var(--purple)' : 'rgba(0,0,0,0.15)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
              aria-label={'Go to group ' + (i + 1)}
            />
          ))}
        </div>
        <ProgressBar key={startIndex} />
      </div>

      <div className="text-center mt-8">
        <a href="#" className="btn-secondary">Are you a woman in AI? Join as a mentor</a>
      </div>
    </section>
  )
}

function ProgressBar() {
  return (
    <div style={{ width: 120, height: 2, background: 'rgba(0,0,0,0.1)', borderRadius: 2, overflow: 'hidden' }}>
      <div
        style={{
          height: '100%',
          background: 'var(--purple)',
          borderRadius: 2,
          animation: 'progress10s 10s linear forwards',
        }}
      />
      <style>{`
        @keyframes progress10s {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </div>
  )
}