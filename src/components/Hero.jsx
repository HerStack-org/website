export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden px-5 sm:px-10 lg:px-16 pt-28 pb-16"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute rounded-full opacity-20" style={{ width: 600, height: 600, background: 'var(--purple)', filter: 'blur(80px)', top: -100, right: -100 }} />
        <div className="absolute rounded-full opacity-20" style={{ width: 400, height: 400, background: 'var(--purple)', filter: 'blur(80px)', bottom: 0, left: -50 }} />
        <div className="absolute rounded-full opacity-10" style={{ width: 300, height: 300, background: 'var(--teal)', filter: 'blur(80px)', top: '50%', right: '30%' }} />
        <div className="hero-grid" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        <div
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-8 animate-fade-up-1"
          style={{ background: 'var(--purple-light)', color: 'var(--purple)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: 'var(--purple)' }} />
          Open Source · Free Forever · Built by the Community
        </div>

        <h1
          className="font-display font-bold leading-none mb-6 animate-fade-up-2"
          style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', letterSpacing: '-0.03em', color: 'var(--ink)' }}
        >
          She doesn't just<br />
          use AI. She <span className="highlight">builds</span> it.
        </h1>

        <p
          className="text-xl leading-relaxed mb-10 font-light animate-fade-up-3"
          style={{ color: 'var(--ink-soft)', maxWidth: 560 }}
        >
          HerStack is an open source platform helping school girls and young women across India learn AI, find mentors, and build the future — for free.
        </p>

        <div className="flex gap-4 flex-wrap animate-fade-up-4">
          <a href="#learn" className="btn-primary">Start Learning →</a>
          <a href="#summer" className="btn-secondary">✦ Summer of AI 2026</a>
        </div>

        <div
          className="flex flex-wrap gap-6 sm:gap-10 lg:gap-12 mt-16 pt-8 animate-fade-up-5"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {[
            { num: '100%', label: 'Free, always' },
            { num: 'Open.', label: 'Source on GitHub' },
            { num: 'Pan-India', label: 'Any girl, any city' },
          ].map(({ num, label }) => (
            <div key={label}>
              <div
                className="font-display font-bold text-4xl"
                style={{ letterSpacing: '-0.03em', color: 'var(--ink)' }}
              >
                <span>{num.split(/(%|\.|-)/, 1)[0]}</span>
                <span style={{ color: 'var(--purple)' }}>{num.replace(/^[^%.\-]*/, '')}</span>
              </div>
              <div className="text-sm mt-1" style={{ color: 'var(--ink-muted)' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
