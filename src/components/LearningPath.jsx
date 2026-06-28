import { useState } from 'react'
import { learningStages, resources } from '../data/resources'
import { HighlightedText } from './Tooltip'

export default function LearningPath() {
  const [activeStage, setActiveStage] = useState(1)

  const stageResources = resources.filter((r) => r.stage === activeStage)
  const featuredResources = stageResources.length > 0
    ? stageResources.slice(0, 3)
    : resources.slice(0, 3)

  return (
<section id="learn" className="py-16 lg:py-24 px-5 sm:px-8 lg:px-16" style={{ background: 'var(--cream)' }}>
      <div className="mb-10 lg:mb-14">
        <div className="section-label">Start Here</div>
        <h2 className="section-title">Your path into AI,<br />step by step</h2>
        <p className="section-sub">No idea where to begin? We've mapped out exactly what to learn and in what order.</p>
      </div>

      {/* Roadmap: each row = one stage, optionally paired with its resource card */}
      <div className="flex flex-col relative gap-4 lg:gap-6">

        {/* Single continuous timeline, spans the full stack so it never looks chopped between rows */}
        <div
          className="absolute pointer-events-none hidden sm:block"
          style={{
            left: 17, // centers under the 36px (w-9) marker
            width: 0,
            borderLeft: '2px dotted var(--border)',
            top: 18,    // start at center of first marker
            bottom: 18, // end at center of last marker
          }}
        />
        <div
          className="absolute top-0 left-0 pointer-events-none transition-all duration-500 ease-out hidden sm:block"
          style={{
            left: 17,
            width: 0,
            borderLeft: '2px dotted var(--purple)',
            top: 18,
            height: `calc(${(activeStage - 1) / (learningStages.length - 1)} * (100% - 36px))`,
          }}
        />

        {learningStages.map((stage, i) => {
          const resource = featuredResources.find((r) => r.stage === stage.id); // undefined for stage 4 — intentional, no 4th card
          const isActive = activeStage === stage.id

          return (
            <div key={stage.id} className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-stretch">

              {/* Stage column (marker + content) */}
              <button
                onClick={() => setActiveStage(stage.id)}
                className="flex gap-6 text-left transition-all duration-200 border-none bg-transparent cursor-pointer relative"
                style={{ padding: '1.75rem 0', minHeight: 168 }}
              >
                {/* Marker sits on top of the continuous timeline behind it */}
                <div className="flex flex-col items-center flex-shrink-0 relative" style={{ zIndex: 1 }}>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0 transition-all duration-200"
                    style={{
                      background: isActive ? 'var(--purple)' : 'var(--cream-dark)',
                      border: `1.5px solid ${isActive ? 'var(--purple)' : 'var(--border)'}`,
                      color: isActive ? 'white' : 'var(--ink-muted)',
                    }}
                  >
                    {stage.number}
                  </div>
                </div>

                <div className="pb-2">
                  <h4
                    className="font-display font-bold text-base mb-1 transition-colors duration-200"
                    style={{ color: isActive ? 'var(--purple)' : 'var(--ink)' }}
                  >
                    {stage.title}
                  </h4>
                  <p className="text-sm leading-relaxed font-light max-w-sm" style={{ color: 'var(--ink-muted)' }}>
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

              {/* Horizontal connector: only when this stage has a paired card, desktop only */}
              <div className="hidden lg:flex items-center justify-center" style={{ width: 64 }}>
                {resource && (
                  <div className="flex items-center w-full">
                    <div
                      className="flex-1 transition-all duration-500 ease-out"
                      style={{
                        height: 0,
                        borderTop: `2px dashed ${isActive ? 'var(--purple)' : 'var(--border)'}`,
                        opacity: isActive ? 1 : 0.6,
                      }}
                    />
                    <div
                      className="w-2.5 h-2.5 rounded-full border-2 flex-shrink-0 transition-all duration-300"
                      style={{
                        borderColor: isActive ? 'var(--purple)' : 'var(--border)',
                        background: isActive ? 'var(--purple)' : 'var(--cream)',
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Card column */}
              <div className="hidden lg:flex items-center" style={{ minHeight: 168 }}>
                {resource && (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline block flex-shrink-0 transition-all duration-300 ease-out"
                    style={{
                      width: 300,
                      height: 168,
                      transformOrigin: 'center left',
                      transform: isActive ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
                    }}
                  >
                    <div
                      className="rounded-2xl p-6 w-full h-full flex flex-col justify-center transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
                      style={{
                        background: 'var(--cream-dark)',
                        border: `1px solid ${isActive ? 'var(--purple)' : 'var(--border)'}`,
                        boxShadow: isActive
                          ? '0 12px 32px rgba(0,0,0,0.12)'
                          : '0 4px 24px rgba(0,0,0,0.06)',
                      }}
                    >
                      <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--ink-muted)' }}>
                        {resource.platform}
                      </div>
                      <div className="font-display font-bold text-base mb-3" style={{ color: 'var(--ink)' }}>
                        {resource.title}
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {resource.free && <Badge color="teal">Free</Badge>}
                        {resource.hasCert && <Badge color="amber">Certificate</Badge>}
                        <Badge color="purple">{resource.difficulty}</Badge>
                      </div>
                    </div>
                  </a>
                )}
              </div>
            </div>
          )
        })}
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
