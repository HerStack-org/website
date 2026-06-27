import React from 'react'
import { mentors, avatarStyles } from '../data/mentors'

function MentorList() {
  return (
    <section className="min-h-screen py-16 px-6 lg:px-16" style={{ background: 'var(--cream)' }}>
      
      <h1 className="text-4xl font-bold mb-10 mt-5" style={{ color: 'var(--ink)' }}>
        All Mentors
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className="rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1"
            style={{
              border: '1px solid var(--border)',
              background: 'var(--cream)'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--cream-dark)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--cream)'}
          >
            
            {/* Avatar */}
            <div
              className="rounded-full flex items-center justify-center font-bold mb-4"
              style={{
                ...avatarStyles[mentor.avatarColor],
                color: 'white',
                width: 80,
                height: 80
              }}
            >
              {mentor.initials}
            </div>

            <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--ink)' }}>
              {mentor.name}
            </h2>

            <p className="text-sm mb-3" style={{ color: 'var(--ink-soft)' }}>
              {mentor.role}
            </p>

            <p className="italic text-sm mb-4" style={{ color: 'var(--ink-soft)' }}>
              "{mentor.advice}"
            </p>

            <a
              href={mentor.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
              style={{ color: 'var(--purple)' }}
            >
              Connect on LinkedIn →
            </a>
          </div>
        ))}

      </div>
    </section>
  )
}

export default MentorList