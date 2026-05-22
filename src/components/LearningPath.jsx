import { useState } from 'react'
import { learningStages, resources } from '../data/resources'
import { HighlightedText } from './Tooltip'

const stageDetailsMap = {
  1: {
    skills: ["Python programming fundamentals", "Variables, loops, and functions", "Understanding algorithms", "Basic command line & Git basics"],
    highlightText: "This foundational stage is designed for absolute beginners. You'll master Python, which is the universal language of AI, and build confidence in computational thinking."
  },
  2: {
    skills: ["Supervised vs Unsupervised learning", "Data cleaning & feature engineering", "Regression and Classification models", "Working with Pandas, NumPy, and Scikit-Learn"],
    highlightText: "Now you'll dive into the core of Machine Learning. You will learn how computers learn from data patterns, clean datasets, and train your very first predictive models."
  },
  3: {
    skills: ["Neural networks & Deep Learning", "Large Language Models (LLMs) & Prompts", "Developing and deploying AI web apps", "Using PyTorch and Hugging Face API"],
    highlightText: "Level up to deep learning and generative AI. You'll work with advanced neural networks, leverage pre-trained LLMs, and build functional AI web applications."
  },
  4: {
    skills: ["Contributing to open-source codebases", "Git collaboration & Pull Request workflows", "Weekly mentoring with women engineers", "Building real-world AI impact products"],
    highlightText: "Put your skills into action! Join the HerStack Summer of AI program. You will collaborate on real open-source AI projects, receive 1:1 mentorship, and earn an industry-recognized certificate."
  }
};

export default function LearningPath() {
  const [activeStage, setActiveStage] = useState(1)

  const activeStageData = learningStages.find(s => s.id === activeStage)
  const activeResources = resources.filter(r => r.stage === activeStage)

  return (
    <section id="learn" className="py-16 lg:py-24 px-5 sm:px-8 lg:px-16 relative" style={{ background: 'var(--cream)' }}>
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="section-label text-center">Start Here</div>
        <h2 className="section-title text-center">Your path into AI,<br />step by step</h2>
        <p className="section-sub mx-auto text-center">No idea where to begin? We've mapped out exactly what to learn and in what order.</p>
      </div>

      {/* Desktop Roadmap (Hidden on Mobile) */}
      <div className="hidden md:block max-w-4xl mx-auto mb-20 relative px-8">
        {/* Connection Line */}
        <div 
          className="absolute top-6 left-12 right-12 h-1 -translate-y-1/2 rounded-full overflow-hidden" 
          style={{ background: 'rgba(13, 13, 13, 0.08)' }}
        >
          <div 
            className="h-full bg-purple transition-all duration-500 ease-out"
            style={{ 
              width: `${((activeStage - 1) / (learningStages.length - 1)) * 100}%`,
              background: 'var(--purple)',
              boxShadow: '0 0 12px var(--purple-mid)'
            }}
          />
        </div>

        {/* Nodes */}
        <div className="relative flex justify-between items-center w-full z-10">
          {learningStages.map((stage) => {
            const isCompleted = stage.id < activeStage;
            const isActive = stage.id === activeStage;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className="flex flex-col items-center focus:outline-none group border-none bg-transparent cursor-pointer"
                style={{ width: '140px' }}
              >
                {/* Node Circle */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-base transition-all duration-300 relative"
                  style={{
                    background: isActive 
                      ? 'var(--purple)' 
                      : isCompleted 
                        ? 'var(--purple-light)' 
                        : 'white',
                    border: `2px solid ${isActive || isCompleted ? 'var(--purple)' : 'var(--border)'}`,
                    color: isActive 
                      ? 'white' 
                      : isCompleted 
                        ? 'var(--purple)' 
                        : 'var(--ink-muted)',
                    boxShadow: isActive ? '0 0 15px rgba(123, 92, 240, 0.3)' : 'none',
                    transform: isActive ? 'scale(1.15)' : 'scale(1)',
                  }}
                >
                  {isActive && (
                    <span className="absolute -inset-2 rounded-full border border-purple/30 animate-ping pointer-events-none" style={{ borderColor: 'rgba(123, 92, 240, 0.2)' }} />
                  )}
                  {stage.number}
                </div>
                
                {/* Node Title */}
                <span 
                  className="mt-3 text-xs font-semibold uppercase tracking-wider text-center transition-colors duration-200"
                  style={{ 
                    color: isActive ? 'var(--purple)' : 'var(--ink-soft)',
                    fontWeight: isActive ? '700' : '500'
                  }}
                >
                  {stage.title}
                </span>
                
                {/* Node Tag */}
                <span 
                  className="text-[10px] uppercase tracking-widest mt-1 text-center px-2 py-0.5 rounded-full"
                  style={{
                    background: isActive ? 'var(--purple-light)' : 'transparent',
                    color: isActive ? 'var(--purple)' : 'var(--ink-muted)',
                    border: isActive ? 'none' : '1px solid transparent'
                  }}
                >
                  {stage.tag}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Roadmap (Hidden on Desktop) */}
      <div className="md:hidden max-w-sm mx-auto mb-12 relative px-4">
        {/* Connection Line */}
        <div 
          className="absolute left-9 top-6 bottom-6 w-1 -translate-x-1/2 rounded-full" 
          style={{ background: 'rgba(13, 13, 13, 0.08)' }}
        >
          <div 
            className="w-full bg-purple transition-all duration-500 ease-out" 
            style={{ 
              background: 'var(--purple)',
              height: `${((activeStage - 1) / (learningStages.length - 1)) * 100}%`
            }} 
          />
        </div>

        {/* Nodes */}
        <div className="relative flex flex-col gap-8 z-10">
          {learningStages.map((stage) => {
            const isCompleted = stage.id < activeStage;
            const isActive = stage.id === activeStage;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className="flex items-center gap-4 text-left focus:outline-none border-none bg-transparent cursor-pointer group w-full"
              >
                {/* Circle */}
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0 transition-all duration-300 relative"
                  style={{
                    background: isActive 
                      ? 'var(--purple)' 
                      : isCompleted 
                        ? 'var(--purple-light)' 
                        : 'white',
                    border: `2px solid ${isActive || isCompleted ? 'var(--purple)' : 'var(--border)'}`,
                    color: isActive 
                      ? 'white' 
                      : isCompleted 
                        ? 'var(--purple)' 
                        : 'var(--ink-muted)',
                    boxShadow: isActive ? '0 0 10px rgba(123, 92, 240, 0.25)' : 'none',
                    transform: isActive ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {isActive && (
                    <span className="absolute -inset-1.5 rounded-full border border-purple/30 animate-ping pointer-events-none" style={{ borderColor: 'rgba(123, 92, 240, 0.2)' }} />
                  )}
                  {stage.number}
                </div>
                
                {/* Label details inline */}
                <div className="flex flex-col">
                  <span 
                    className="text-sm font-semibold uppercase tracking-wider transition-colors duration-200"
                    style={{ color: isActive ? 'var(--purple)' : 'var(--ink)' }}
                  >
                    {stage.title}
                  </span>
                  <span 
                    className="text-[10px] uppercase tracking-widest mt-0.5 text-left font-light"
                    style={{ color: isActive ? 'var(--purple)' : 'var(--ink-muted)' }}
                  >
                    {stage.tag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage Details Section */}
      <div 
        key={activeStage} /* Triggers component re-mount or fade-in animation on activeStage change */
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12 animate-fade-up"
      >
        {/* Left Column: Stage Details (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-white rounded-2xl p-6 lg:p-8 border border-border h-full flex flex-col justify-between" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
            <div>
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4" style={{ background: 'var(--purple-light)', color: 'var(--purple)' }}>
                {activeStageData.tag}
              </span>
              <h3 className="font-display font-bold text-2xl lg:text-3xl mb-4" style={{ color: 'var(--ink)' }}>
                {activeStageData.title}
              </h3>
              <p className="text-sm lg:text-base leading-relaxed font-light mb-6" style={{ color: 'var(--ink-soft)' }}>
                <HighlightedText text={stageDetailsMap[activeStage].highlightText} />
              </p>
            </div>
            
            <div className="border-t border-border pt-6 mt-6">
              <h5 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--ink-soft)' }}>
                What you'll master:
              </h5>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {stageDetailsMap[activeStage].skills.map((skill, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm font-light" style={{ color: 'var(--ink-soft)' }}>
                    <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--teal)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Curated Resources (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-display font-bold text-lg" style={{ color: 'var(--ink)' }}>
              {activeStage === 4 ? 'Program Opportunities' : 'Curated Resources'}
            </h4>
            {activeStage !== 4 && (
              <span className="text-xs font-medium text-ink-muted" style={{ color: 'var(--ink-muted)' }}>
                {activeResources.length} {activeResources.length === 1 ? 'resource' : 'resources'} available
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
            {activeResources.map((r) => (
              <a
                key={r.id}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline transition-all duration-300"
              >
                <div
                  className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-xl flex flex-col justify-between h-full"
                  style={{
                    background: 'white',
                    border: '1px solid var(--border)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  }}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--ink-muted)' }}>
                        {r.platform}
                      </span>
                      <span 
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider"
                        style={{ background: 'var(--cream-dark)', color: 'var(--ink-soft)' }}
                      >
                        {r.durationWeeks} {r.durationWeeks === 1 ? 'week' : 'weeks'}
                      </span>
                    </div>
                    <div className="font-display font-bold text-base mb-3" style={{ color: 'var(--ink)', minHeight: '44px' }}>
                      <HighlightedText text={r.title} />
                    </div>
                    
                    {/* Tags */}
                    <div className="flex gap-1.5 flex-wrap mb-4">
                      {r.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-[10px] font-medium px-2 py-0.5 rounded"
                          style={{ background: 'rgba(13, 13, 13, 0.04)', color: 'var(--ink-soft)', border: '1px solid var(--border)' }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap pt-3 border-t border-border/60">
                    {r.free && <Badge color="teal">Free</Badge>}
                    {r.hasCert && <Badge color="amber">Certificate</Badge>}
                    <Badge color="purple">{r.difficulty}</Badge>
                  </div>
                </div>
              </a>
            ))}

            {activeStage === 4 && (
              <div className="col-span-1 sm:col-span-2 h-full">
                <div
                  className="rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between h-full relative overflow-hidden"
                  style={{
                    background: 'var(--purple)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 10px 30px rgba(123, 92, 240, 0.2)',
                    minHeight: '260px'
                  }}
                >
                  {/* Decorative background circle */}
                  <div 
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      width: '240px',
                      height: '240px',
                      right: '-60px',
                      bottom: '-60px',
                    }}
                  />
                  
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      HERSTACK PROGRAM
                    </div>
                    <div className="font-display font-bold text-2xl lg:text-3xl mb-4 leading-tight">
                      Summer of AI 2026
                    </div>
                    <p className="text-sm font-light leading-relaxed mb-8 max-w-lg" style={{ color: 'rgba(255,255,255,0.85)' }}>
                      A specialized open-source program where you get to work on active repositories, learn professional Git workflows, participate in code reviews, and earn credit for your career.
                    </p>
                  </div>
                  
                  <a
                    href="#summer"
                    className="inline-flex items-center justify-center gap-2 font-semibold no-underline px-8 py-3.5 rounded-full transition-all duration-200 text-center z-10 w-fit"
                    style={{ background: 'white', color: 'var(--purple)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    Join the Waitlist Now →
                  </a>
                </div>
              </div>
            )}
          </div>
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
