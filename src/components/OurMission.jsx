export default function OurMission() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ padding: '10rem 4rem 7rem', background: 'var(--cream)' }}
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute rounded-full opacity-20"
            style={{
              width: 500,
              height: 500,
              background: 'var(--purple)',
              filter: 'blur(100px)',
              top: -100,
              right: -100,
            }}
          />

          <div
            className="absolute rounded-full opacity-10"
            style={{
              width: 350,
              height: 350,
              background: 'var(--teal)',
              filter: 'blur(90px)',
              bottom: 0,
              left: -80,
            }}
          />

          <div className="hero-grid" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl">
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-8"
            style={{
              background: 'var(--purple-light)',
              color: 'var(--purple)',
            }}
          >
            ✦ Our Mission
          </div>

          <h1
            className="font-display font-bold leading-none mb-8"
            style={{
              fontSize: 'clamp(3rem, 6.5vw, 5rem)',
              letterSpacing: '-0.04em',
              color: 'var(--ink)',
            }}
          >
            Building a future
            <br />
            where girls don’t just
            <br />
            use AI. They <span className="highlight">lead</span> it.
          </h1>

          <p
            className="text-lg md:text-xl leading-relaxed font-light"
            style={{
              color: 'var(--ink-soft)',
              maxWidth: 6200,
            }}
          >
            HerStack exists to make artificial intelligence education,
            mentorship, and open source opportunities accessible to every girl
            across India — regardless of background, city, or experience level.
          </p>

          {/* Stats */}
          <div
            className="flex gap-10 mt-12 flex-wrap"
            style={{
              borderTop: '1px solid var(--border)',
              paddingTop: '2rem',
            }}
          >
            {[
              { number: '100%', label: 'Free Access' },
              { number: 'Open', label: 'Source Community' },
              { number: 'Pan-India', label: 'Built for Everyone' },
            ].map((item) => (
              <div key={item.label}>
                <div
                  className="font-display font-bold text-3xl"
                  style={{
                    color: 'var(--ink)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {item.number}
                </div>

                <div
                  className="text-sm mt-1"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Pillars */}
      <section
        className="py-24 px-16"
        style={{ background: 'white' }}
      >
        <div className="mb-14">
          <div className="section-label">What We Believe</div>

          <h2 className="section-title">
            More access.
            <br />
            More representation.
            <br />
            More builders.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              number: '01',
              icon: '📚',
              title: 'Accessible Learning',
              text: 'Free beginner-friendly AI resources, roadmaps, and visual learning experiences for students starting from zero.',
            },
            {
              number: '02',
              icon: '✨',
              title: 'Women in Tech',
              text: 'Connecting girls with mentors, role models, and real stories from women already building in AI.',
            },
            {
              number: '03',
              icon: '🤝',
              title: 'Open Source First',
              text: 'Encouraging contributors to collaborate, build projects, and gain real-world experience through community.',
            },
          ].map((item) => (
            <div
              key={item.number}
              className="rounded-[2rem] p-8 transition-all duration-300"
              style={{
                border: '1px solid var(--border)',
                background: 'var(--cream)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.borderColor = 'var(--purple)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'var(--border)'
              }}
            >
              <div
                className="font-display font-bold text-6xl mb-8"
                style={{
                  color: 'rgba(0,0,0,0.05)',
                  letterSpacing: '-0.04em',
                }}
              >
                {item.number}
              </div>

              <div
                className="pillar-icon w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-transform duration-300"
                style={{
                  background: 'var(--purple-light)',
                }}
              >
                {item.icon}
              </div>

              <h3
                className="font-display font-bold text-2xl mb-4"
                style={{ color: 'var(--ink)' }}
              >
                {item.title}
              </h3>

              <p
                className="text-base leading-relaxed font-light"
                style={{ color: 'var(--ink-soft)' }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision */}
      <section
        className="py-24 px-16"
        style={{ background: 'var(--ink)' }}
      >
        <div className="max-w-4xl">
          <div
            className="section-label"
            style={{ color: 'var(--purple-mid)' }}
          >
            Our Vision
          </div>

          <h2
            className="font-display font-bold leading-tight mb-8"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              letterSpacing: '-0.03em',
              color: 'white',
            }}
          >
            AI should not be shaped
            <br />
            by a small few.
          </h2>

          <p
            className="text-xl leading-relaxed font-light"
            style={{
              color: 'rgba(255,255,255,0.7)',
              maxWidth: 720,
            }}
          >
            We believe the next generation of AI innovation should be inclusive,
            community-driven, and diverse. HerStack aims to create spaces where
            girls can confidently explore technology, ask questions, experiment,
            and become leaders in the future of AI.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 px-16 text-center"
        style={{ background: 'var(--cream)' }}
      >
        <div className="section-label">Join Us</div>

        <h2 className="section-title mb-6">
          The future needs
          <br />
          more women builders.
        </h2>

        <p
          className="section-sub mx-auto mb-10"
          style={{ maxWidth: 700 }}
        >
          Whether you're just starting your AI journey or already building
          projects, HerStack is a place to learn, collaborate, and grow.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <a href="#learn" className="btn-primary">
            Start Learning →
          </a>

          <a href="#contribute" className="btn-secondary">
            Contribute to HerStack
          </a>
        </div>
      </section>
    </>
  )
}