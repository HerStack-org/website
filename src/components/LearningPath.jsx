import { useState } from 'react'
import { learningStages, resources } from '../data/resources'
import { HighlightedText } from './Tooltip'

const featuredResources = resources.slice(0, 3)

export default function LearningPath() {
  const [activeStage, setActiveStage] = useState(1)

  return (
    <section id="learn" className="py-16 lg:py-24 px-5 sm:px-8 lg:px-16" style={{ background: 'var(--cream)' }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">

        {/* Left: Steps */}
        <div>
          <div className="section-label">Start Here</div>
          <h2 className="section-title">Your path into AI,<br />step by step</h2>
          <p className="section-sub mb-10">No idea where to begin? We've mapped out exactly what to learn and in what order.</p>

          <div className="flex flex-col">
            {learningStages.map((stage, i) => (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className="flex gap-6 text-left transition-all duration-200 border-none bg-transparent cursor-pointer"
                style={{
                  padding: '1.75rem 0',
                  borderBottom: i < learningStages.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0 transition-all duration-200"
                  style={{
                    background: activeStage === stage.id ? 'var(--purple)' : 'var(--cream-dark)',
                    border: `1.5px solid ${activeStage === stage.id ? 'var(--purple)' : 'var(--border)'}`,
                    color: activeStage === stage.id ? 'white' : 'var(--ink-muted)',
                  }}
                >
                  {stage.number}
                </div>
                <div>
                  <h4
                    className="font-display font-bold text-base mb-1 transition-colors duration-200"
                    style={{ color: activeStage === stage.id ? 'var(--purple)' : 'var(--ink)' }}
                  >
                    {stage.title}
                  </h4>
                  <p className="text-sm leading-relaxed font-light" style={{ color: 'var(--ink-muted)' }}>
                    <HighlightedText text={stage.description} />
                  </p>
                  <span
                    className="inline-block mt-2 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                    style={{ background: 'var(--purple-light)', color: 'var(--purple)' }}
                  >
                    {stage.tag}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Resource cards */}
        <div className="hidden lg:block relative" style={{ height: 400 }}>
          {featuredResources.map((r, i) => (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute no-underline transition-transform duration-300 hover:z-20"
              style={{
                top: i * 80,
                left: i % 2 === 0 ? 40 : 10,
                transform: `rotate(${[-3, 1.5, -1][i]}deg)`,
                zIndex: i + 1,
                width: 300,
              }}
            >
              <div
                className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl"
                style={{ background: 'white', border: '1px solid var(--border)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
              >
                <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--ink-muted)' }}>
                  {r.platform}
                </div>
                <div className="font-display font-bold text-base mb-3" style={{ color: 'var(--ink)' }}>
                  {r.title}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {r.free && <Badge color="teal">Free</Badge>}
                  {r.hasCert && <Badge color="amber">Certificate</Badge>}
                  <Badge color="purple">{r.difficulty}</Badge>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Badge({ color, children }) {
  const styles = {
    teal:   { background: '#E8FDF5', color: '#00A880' },
    amber:  { background: '#FFF3E8', color: '#E07B00' },
    purple: { background: 'var(--purple-light)', color: 'var(--purple)' },
  }
  return (
    <span
      className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
      style={styles[color]}
    >
      {children}
    </span>
  )
}
