import React from 'react'
import { mentors, avatarStyles } from '../data/mentors'

function MentorList() {
  return (
    <section className="min-h-screen py-16 px-6 lg:px-16 bg-white">
      
      <h1 className="text-4xl font-bold mb-10 mt-5">
        All Mentors
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className="rounded-3xl p-6 border transition-all duration-200 hover:-translate-y-1 hover:bg-white"
            style={{
              borderColor: 'var(--border)',
              background: 'var(--cream)'
            }}
          >
            
            {/* Avatar */}
            <div
              className="rounded-full flex items-center justify-center text-white font-bold mb-4"
              style={{
                ...avatarStyles[mentor.avatarColor],
                width: 80,
                height: 80
              }}
            >
              {mentor.initials}
            </div>

            <h2 className="text-xl font-bold mb-1">
              {mentor.name}
            </h2>

            <p className="text-sm mb-3 text-gray-500">
              {mentor.role}
            </p>

            <p className="italic text-sm mb-4">
              "{mentor.advice}"
            </p>

            <a
              href={mentor.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 font-bold"
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