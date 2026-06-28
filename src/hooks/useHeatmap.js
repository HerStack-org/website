/**
 * useHeatmap
 *
 * Tracks how many times a user has interacted with resources per category/tag.
 * Data is persisted in localStorage under the key "herstack_heatmap".
 *
 * Usage:
 *   const { trackInteraction, counts, totalInteractions, reset } = useHeatmap()
 *   trackInteraction(['ai', 'ml', 'python'])  // pass a resource's tags array
 */

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'herstack_heatmap'
const EVENT_NAME = 'herstack_heatmap_update'

function readCounts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

function writeCounts(counts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counts))
    // Notify all useHeatmap hook instances to re-read
    window.dispatchEvent(new CustomEvent(EVENT_NAME))
  } catch {
    // storage unavailable — graceful no-op
  }
}

export function useHeatmap() {
  const [counts, setCounts] = useState(readCounts)

  // Re-sync whenever recordInteraction (outside React) writes to localStorage
  useEffect(() => {
    const handler = () => setCounts(readCounts())
    window.addEventListener(EVENT_NAME, handler)
    return () => window.removeEventListener(EVENT_NAME, handler)
  }, [])

  const trackInteraction = useCallback((tags = []) => {
    if (!tags || tags.length === 0) return
    setCounts((prev) => {
      const next = { ...prev }
      tags.forEach((tag) => {
        next[tag] = (next[tag] ?? 0) + 1
      })
      writeCounts(next)
      return next
    })
  }, [])

  const totalInteractions = Object.values(counts).reduce((a, b) => a + b, 0)

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      window.dispatchEvent(new CustomEvent(EVENT_NAME))
    } catch { }
    setCounts({})
  }, [])

  return { trackInteraction, counts, totalInteractions, reset }
}

/** Singleton write — for use outside of React (e.g. in event handlers) */
export function recordInteraction(tags = []) {
  if (!tags || tags.length === 0) return
  const counts = readCounts()
  tags.forEach((tag) => {
    counts[tag] = (counts[tag] ?? 0) + 1
  })
  writeCounts(counts)
}
