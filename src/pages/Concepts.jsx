import { useState } from 'react'
import { Link } from 'react-router-dom'
import { storyboards } from '../data/storyboards'

const difficultyOptions = ['All', 'Beginner', 'Intermediate', 'Advanced']
const difficultyStyles = {
  beginner: 'bg-[var(--purple-light)] text-[var(--purple)]',
  intermediate: 'bg-[var(--teal-light)] text-[var(--teal)]',
  advanced: 'bg-[var(--amber-light)] text-[var(--amber)]',
}

export default function Concepts() {
  const [filter, setFilter] = useState('All')
  const filteredConcepts = filter === 'All'
    ? storyboards
    : storyboards.filter((item) => item.difficulty.toLowerCase() === filter.toLowerCase())

  return (
    <section className="min-h-screen px-6 py-24 lg:px-16" style={{ background: 'var(--cream)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <div className="section-label">AI Concepts</div>
            <h1 className="section-title" style={{ color: 'var(--ink)' }}>
              Explore every concept in one place
            </h1>
            <p className="section-sub mt-4" style={{ color: 'var(--ink-soft)' }}>
              Browse the full HerStack concept library with beginner-friendly explainers and visual storyboards.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {difficultyOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 ${
                  filter === option
                    ? 'border-transparent bg-[var(--purple)] text-white shadow-lg'
                    : 'border-[rgba(13,13,13,0.08)] bg-white text-[var(--ink)] hover:border-[var(--purple)]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between mb-10">
          <p className="text-sm text-[var(--ink-soft)] max-w-2xl">
            These concepts are the building blocks of AI literacy. Each card includes a visual explainer, a short summary, and difficulty labeling to help learners choose the right next step.
          </p>
          <Link to="/" className="btn-secondary inline-flex items-center justify-center px-6 py-3 text-sm font-semibold">
            ← Back to homepage
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredConcepts.map((concept) => (
            <article
              key={concept.id}
              className="rounded-3xl overflow-hidden border border-[rgba(13,13,13,0.08)] bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1"
            >
              <div
                className="h-48 flex items-center justify-center text-7xl"
                style={{ background: concept.gradient }}
              >
                {concept.emoji}
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="rounded-full bg-[rgba(13,13,13,0.05)] px-3 py-1 text-xs uppercase tracking-widest text-[var(--ink-muted)]">
                    {concept.status.replace('-', ' ')}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-widest ${difficultyStyles[concept.difficulty]}`}>
                    {concept.difficulty}
                  </span>
                </div>
                <h2 className="font-display text-2xl font-bold mb-3" style={{ color: 'var(--ink)' }}>
                  {concept.title}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
                  {concept.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
