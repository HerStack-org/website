import { useState } from 'react'

export default function ShareButtons({ title, url }) {
  const shareUrl = url || window.location.href
  const [copied, setCopied] = useState(false)

  const platforms = [
    {
      name: 'Twitter / X',
      icon: '𝕏',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'LinkedIn',
      icon: 'in',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      href: `https://wa.me/?text=${encodeURIComponent(title + ' ' + shareUrl)}`,
    },
  ]

  function handleNativeShare() {
    if (navigator.share) {
      navigator.share({ title, url: shareUrl })
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-3 mt-8">
      <span className="text-sm font-semibold text-[var(--ink-muted)] uppercase tracking-wide">
        Share
      </span>

      {typeof navigator !== 'undefined' && navigator.share && (
        <button
          onClick={handleNativeShare}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-[var(--border)] hover:border-[var(--purple)] hover:text-[var(--purple)] transition-all"
        >
          ↑ Share
        </button>
      )}

      {platforms.map((p) => (
        <a
          key={p.name}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${p.name}`}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-[var(--border)] hover:border-[var(--purple)] hover:text-[var(--purple)] transition-all"
        >
          <span>{p.icon}</span>
          <span>{p.name}</span>
        </a>
      ))}

      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-[var(--border)] hover:border-[var(--purple)] hover:text-[var(--purple)] transition-all"
      >
        {copied ? '✓ Copied!' : '🔗 Copy Link'}
      </button>
    </div>
  )
}
