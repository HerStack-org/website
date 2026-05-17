import ShareButtons from './ShareButtons'

export default function BlogPostLayout({ post }) {
  if (!post) return null

  const formattedDate = new Date(post.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="max-w-2xl mx-auto px-6 py-12">
      {/* Category */}
      <span
        className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
        style={{ background: 'var(--purple-light)', color: 'var(--purple)' }}
      >
        {post.category}
      </span>

      {/* Title */}
      <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--ink)] leading-tight mb-4">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-4 text-sm text-[var(--ink-muted)] mb-8">
        <span>{post.author}</span>
        <span>·</span>
        <span>{formattedDate}</span>
        <span>·</span>
        <span>{post.readTime} min read</span>
      </div>

      {/* Cover image — pre-sized to prevent CLS */}
      <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8 bg-[var(--cream-dark)]">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
          width={800}
          height={450}
        />
      </div>

      {/* Excerpt */}
      <p className="text-lg text-[var(--ink-soft)] leading-relaxed mb-8">
        {post.excerpt}
      </p>

      {/* Share buttons */}
      <ShareButtons title={post.title} />
    </article>
  )
}