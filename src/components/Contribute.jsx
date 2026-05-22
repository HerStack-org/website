const ways = [
  { icon: '💡', title: 'Add a Resource', description: 'Know a great free course or tutorial? Submit it via a GitHub PR.' },
  { icon: '🎨', title: 'Design a Storyboard', description: 'Illustrate an AI concept. Make something complex beautiful and simple.' },
  { icon: '✍️', title: 'Write a Blog Post', description: 'Explain a concept, share your learning journey, or cover the latest in AI.' },
  { icon: '🛠️', title: 'Build Features', description: 'The platform itself is open source. Pick a good first issue and ship something.' },
]

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

export default function Contribute() {
  return (
    <section id="contribute" className="py-16 lg:py-24 px-5 sm:px-8 lg:px-16" style={{ background: 'var(--cream)' }}>
      <div className="section-label">Open Source</div>
      <h2 className="section-title">Built by the community,<br />for the community</h2>
      <p className="section-sub mb-12">Everything on HerStack — the code, the resources, the storyboards — is open source. You can contribute too.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
        {/* Ways to contribute */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ways.map(({ icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl p-6 transition-all duration-200 cursor-default"
              style={{ background: 'white', border: '1px solid var(--border)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--purple)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div className="text-3xl mb-3">{icon}</div>
              <h4 className="font-display font-bold text-base mb-1.5" style={{ color: 'var(--ink)' }}>{title}</h4>
              <p className="text-xs leading-relaxed font-light" style={{ color: 'var(--ink-muted)' }}>{description}</p>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="rounded-2xl p-10" style={{ background: 'var(--ink)' }}>
          <h3
            className="font-display font-bold text-2xl mb-3"
            style={{ color: 'white', letterSpacing: '-0.02em' }}
          >
            Start contributing today
          </h3>
          <p className="text-sm leading-relaxed mb-6 font-light" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Everything lives on GitHub. Good first issues are labeled and waiting. No contribution is too small — a typo fix counts.
          </p>
          <a
            href="https://github.com/HerStack-org/website"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold no-underline transition-all duration-200"
            style={{ background: 'white', color: 'var(--ink)', fontSize: '0.9rem' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--purple)'
              e.currentTarget.style.color = 'white'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'white'
              e.currentTarget.style.color = 'var(--ink)'
            }}
          >
            <GitHubIcon /> View on GitHub
          </a>

          <div
            className="flex flex-wrap gap-5 sm:gap-8 mt-8 pt-6"
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
          >
            {[
              { num: '⭐ 0', label: 'Stars — be the first' },
              { num: '🍴 0', label: 'Forks — fork it' },
              { num: '🛠 Open', label: 'Good first issues' },
            ].map(({ num, label }) => (
              <div key={label}>
                <div className="font-display font-bold text-xl" style={{ color: 'white' }}>{num}</div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
