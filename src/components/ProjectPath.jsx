import { useState } from 'react'
import { learningStages } from '../data/resources'
import { projects } from '../data/projects'
import { HighlightedText } from './Tooltip'

// Only stages that actually have projects mapped to them (Stage 1-3).
const projectStages = learningStages.filter((stage) =>
  projects.some((p) => p.stage === stage.id)
)

export default function ProjectPath() {
  const [activeStage, setActiveStage] = useState(projectStages[0]?.id ?? 1)

  return (
    <section id="projects" className="py-16 lg:py-24 px-5 sm:px-8 lg:px-16" style={{ background: 'var(--cream)' }}>
      <div className="mb-10 lg:mb-14">
        <div className="section-label">Build As You Learn</div>
        <h2 className="section-title">Turn theory into<br />something you built</h2>
        <p className="section-sub">Every stage of the roadmap pairs with a hands-on mini-project — pick a dataset, build the model, walk away with something for your portfolio.</p>
      </div>

      {/* Roadmap: each row = one stage, paired with a project card */}
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
            height: projectStages.length > 1
              ? `calc(${(projectStages.findIndex((s) => s.id === activeStage)) / (projectStages.length - 1)} * (100% - 36px))`
              : '0px',
          }}
        />

        {projectStages.map((stage) => {
          const stageProjects = projects.filter((p) => p.stage === stage.id)
          const featured = stageProjects[0]
          const isActive = activeStage === stage.id

          return (
            <div key={stage.id} className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-stretch">

              {/* Stage column (marker + content) */}
              <button
                onClick={() => setActiveStage(stage.id)}
                className="flex gap-6 text-left transition-all duration-200 border-none bg-transparent cursor-pointer relative"
                style={{ padding: '1.75rem 0', minHeight: 168 }}
              >
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
                    <HighlightedText text={`${stageProjects.length} project${stageProjects.length === 1 ? '' : 's'} for this stage — ${stage.description}`} />
                  </p>
                  <span
                    className="inline-block mt-2 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                    style={{ background: 'var(--purple-light)', color: 'var(--purple)' }}
                  >
                    {stage.tag}
                  </span>
                </div>
              </button>

              {/* Horizontal connector, desktop only */}
              <div className="hidden lg:flex items-center justify-center" style={{ width: 64 }}>
                {featured && (
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

              {/* Card column — separate Dataset and Tutorial links, same interaction as the resource cards */}
              <div className="hidden lg:flex items-center" style={{ minHeight: 168 }}>
                {featured && (
                  <div
                    className="flex-shrink-0 transition-all duration-300 ease-out"
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
                        {featured.category}
                      </div>
                      <div className="font-display font-bold text-base mb-3" style={{ color: 'var(--ink)' }}>
                        {featured.title}
                      </div>
                      <div className="flex gap-2 flex-wrap mb-3">
                        <Badge color="purple">{featured.difficulty}</Badge>
                      </div>
                      <div className="flex gap-3 text-xs font-semibold">
                        <a
                          href={featured.tutorialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline"
                          style={{ color: 'var(--purple)' }}
                        >
                          Tutorial →
                        </a>
                        <a
                          href={featured.datasetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline"
                          style={{ color: 'var(--ink-muted)' }}
                        >
                          Dataset →
                        </a>
                      </div>
                    </div>
                  </div>
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
      className="text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap overflow-hidden text-ellipsis"
      style={{ ...styles[color], maxWidth: 180 }}
    >
      {children}
    </span>
  )
}