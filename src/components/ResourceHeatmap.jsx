/**
 * ResourceHeatmap
 *
 * Displays a bar-style heatmap of which categories/tags a user has explored.
 * Reads from the heatmap hook and renders a ranked list with filled bars.
 */

import { useHeatmap } from '../hooks/useHeatmap'

// Human-readable labels for raw tags
const TAG_LABELS = {
  'ai':              'AI & Overview',
  'ml':              'Machine Learning',
  'deep-learning':   'Deep Learning',
  'llm':             'Large Language Models',
  'generative-ai':   'Generative AI',
  'python':          'Python',
  'data':            'Data Science',
  'programming':     'Programming',
  'tensorflow':      'TensorFlow',
  'pytorch':         'PyTorch',
  'prompting':       'Prompt Engineering',
  'overview':        'AI Overview',
  'no-code':         'No-Code AI',
  'fundamentals':    'Fundamentals',
  'machine-learning':'Machine Learning',
  'stanford':        'Stanford / Andrew Ng',
  'andrew-ng':       'Stanford / Andrew Ng',
  'ibm':             'IBM Courses',
  'claude':          'Claude / Anthropic',
  'api':             'API & Tools',
  'mcp':             'MCP',
  'beginner':        'Beginner-Friendly',
}

// Merge duplicate display labels (e.g. 'ml' and 'machine-learning' → one entry)
function mergeCounts(rawCounts) {
  const merged = {}
  for (const [tag, count] of Object.entries(rawCounts)) {
    const label = TAG_LABELS[tag] ?? tag
    merged[label] = (merged[label] ?? 0) + count
  }
  return merged
}

// Unicode block characters for the terminal-style bar
const BLOCKS = ['▏', '▎', '▍', '▌', '▋', '▊', '▉', '█']

function buildBar(fraction, maxCells = 10) {
  const totalEighths = Math.round(fraction * maxCells * 8)
  const fullBlocks = Math.floor(totalEighths / 8)
  const remainder = totalEighths % 8
  let bar = '█'.repeat(fullBlocks)
  if (remainder > 0 && fullBlocks < maxCells) bar += BLOCKS[remainder - 1]
  return bar.padEnd(maxCells, ' ')
}

export default function ResourceHeatmap() {
  const { counts, totalInteractions, reset } = useHeatmap()

  if (totalInteractions === 0) {
    return (
      <div
        style={{
          borderRadius: 20,
          border: '1px solid var(--border)',
          background: 'var(--cream-dark)',
          padding: '28px 32px',
        }}
      >
        <div className="section-label" style={{ marginBottom: 8 }}>Your Learning Map</div>
        <p style={{ color: 'var(--ink-muted)', fontSize: 14, margin: 0 }}>
          Start exploring resources and concepts — your activity will appear here.
        </p>
      </div>
    )
  }

  const merged = mergeCounts(counts)
  const sorted = Object.entries(merged).sort((a, b) => b[1] - a[1]).slice(0, 8)
  const max = sorted[0][1]

  return (
    <div
      style={{
        borderRadius: 20,
        border: '1px solid var(--border)',
        background: 'var(--cream-dark)',
        padding: '28px 32px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, gap: 12 }}>
        <div>
          <div className="section-label" style={{ marginBottom: 4 }}>Your Learning Map</div>
          <p style={{ color: 'var(--ink-muted)', fontSize: 13, margin: 0 }}>
            {totalInteractions} interaction{totalInteractions !== 1 ? 's' : ''} across {sorted.length} topic{sorted.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={reset}
          title="Reset heatmap data"
          style={{
            background: 'none',
            border: '1px solid var(--border)',
            borderRadius: 99,
            color: 'var(--ink-muted)',
            fontSize: 11,
            fontWeight: 600,
            padding: '4px 12px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Reset
        </button>
      </div>

      {/* Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {sorted.map(([label, count]) => {
          const fraction = count / max
          // Interpolate color: low → purple-light tint, high → solid purple
          const opacity = 0.25 + fraction * 0.75
          return (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Label */}
              <div
                style={{
                  width: 160,
                  flexShrink: 0,
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--ink-soft)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                title={label}
              >
                {label}
              </div>

              {/* Bar track */}
              <div
                style={{
                  flex: 1,
                  height: 10,
                  borderRadius: 99,
                  background: 'var(--cream)',
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                }}
              >
                <div
                  style={{
                    width: `${Math.round(fraction * 100)}%`,
                    height: '100%',
                    borderRadius: 99,
                    background: `rgba(123, 92, 240, ${opacity})`,
                    transition: 'width 0.4s ease',
                  }}
                />
              </div>

              {/* Count */}
              <div
                style={{
                  width: 28,
                  textAlign: 'right',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--ink-muted)',
                  flexShrink: 0,
                }}
              >
                {count}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer hint */}
      <p style={{ marginTop: 18, marginBottom: 0, fontSize: 11, color: 'var(--ink-muted)', opacity: 0.7 }}>
        Updates as you open resources and explore concepts
      </p>
    </div>
  )
}
