import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="min-h-screen px-6 py-24 lg:px-16" style={{ background: 'var(--cream)' }}>
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col gap-6 mb-12">
          <div>
            <div className="section-label">Get In Touch</div>
            <h1 className="section-title" style={{ color: 'var(--ink)' }}>
              We'd love to hear from you
            </h1>
            <p className="section-sub mt-4" style={{ color: 'var(--ink-soft)' }}>
              Have questions, feedback, or want to collaborate? Reach out to us. We're here to help and always excited to connect with our community.
            </p>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden border border-[rgba(13,13,13,0.08)] bg-white shadow-sm p-8 md:p-12 mb-12">
          {submitted && (
            <div className="mb-6 p-4 rounded-lg" style={{ background: 'var(--purple-light)', color: 'var(--purple)' }}>
              <p className="font-semibold">Thank you for reaching out! We'll get back to you soon.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: 'var(--ink)' }}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg border border-[rgba(13,13,13,0.08)] focus:outline-none focus:ring-2 focus:ring-[var(--purple)] transition"
                style={{ color: 'var(--ink)' }}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: 'var(--ink)' }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg border border-[rgba(13,13,13,0.08)] focus:outline-none focus:ring-2 focus:ring-[var(--purple)] transition"
                style={{ color: 'var(--ink)' }}
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold mb-2" style={{ color: 'var(--ink)' }}>
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What is this about?"
                className="w-full px-4 py-3 rounded-lg border border-[rgba(13,13,13,0.08)] focus:outline-none focus:ring-2 focus:ring-[var(--purple)] transition"
                style={{ color: 'var(--ink)' }}
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-2" style={{ color: 'var(--ink)' }}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell us what's on your mind..."
                rows="6"
                className="w-full px-4 py-3 rounded-lg border border-[rgba(13,13,13,0.08)] focus:outline-none focus:ring-2 focus:ring-[var(--purple)] transition resize-none"
                style={{ color: 'var(--ink)' }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-semibold rounded-lg transition duration-200"
              style={{
                background: 'var(--purple)',
                color: 'white'
              }}
              onMouseEnter={e => e.target.style.background = 'var(--purple-dark)'}
              onMouseLeave={e => e.target.style.background = 'var(--purple)'}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="rounded-3xl overflow-hidden border border-[rgba(13,13,13,0.08)] bg-white shadow-sm p-8 md:p-12 mb-12">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--ink)' }}>
            Other ways to reach us
          </h2>
          <div className="space-y-4">
            <p style={{ color: 'var(--ink-soft)' }}>
              <span className="font-semibold" style={{ color: 'var(--ink)' }}>Email:</span>{' '}
              <a href="mailto:hey@herstack.org" className="text-[var(--purple)] hover:underline">
                hey@herstack.org
              </a>
            </p>
            <p style={{ color: 'var(--ink-soft)' }}>
              <span className="font-semibold" style={{ color: 'var(--ink)' }}>Community:</span>{' '}
              <a href="https://github.com/HerStack-org" target="_blank" rel="noopener noreferrer" className="text-[var(--purple)] hover:underline">
                Join us on GitHub
              </a>
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Link to="/" className="btn-secondary inline-flex items-center justify-center px-6 py-3 text-sm font-semibold">
            ← Back to homepage
          </Link>
        </div>
      </div>
    </section>
  )
}
