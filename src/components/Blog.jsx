import { useState } from 'react'
import { blogPosts } from '../data/blog'
import BlogPostLayout from './BlogPostLayout'

export default function Blog() {
  const [selected, setSelected] = useState(null)

  if (selected) {
    return (
      <section id="blog" className="py-16" style={{ background: 'var(--cream)' }}>
        <div className="max-w-2xl mx-auto px-6">
          <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-2 text-sm text-[var(--ink-muted)] hover:text-[var(--purple)] mb-8 transition-colors"
          >
            ← Back to Blog
          </button>
        </div>
        <BlogPostLayout post={selected} />
      </section>
    )
  }

  return (
    <section id="blog" className="py-20" style={{ background: 'var(--cream-dark)' }}>
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--purple)' }}>
          From the Community
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--ink)] mb-12">
          Blog & Resources
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <button
              key={post.id}
              onClick={() => setSelected(post)}
              className="text-left group rounded-2xl overflow-hidden border border-[var(--border)] hover:border-[var(--purple)] transition-all duration-200 hover:shadow-lg"
              style={{ background: 'white' }}
            >
              {/* Cover image — pre-sized */}
              <div className="w-full aspect-[16/9] bg-[var(--cream-dark)] overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  width={400}
                  height={225}
                />
              </div>

              <div className="p-5">
                <span
                  className="inline-block text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-3"
                  style={{ background: 'var(--purple-light)', color: 'var(--purple)' }}
                >
                  {post.category}
                </span>
                <h3 className="font-display text-lg font-bold text-[var(--ink)] leading-snug mb-2 group-hover:text-[var(--purple)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--ink-muted)] line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-2 mt-4 text-xs text-[var(--ink-muted)]">
                  <span>{post.author}</span>
                  <span>·</span>
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}