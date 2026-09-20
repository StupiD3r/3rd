import { useMemo } from 'react'

const GLYPHS = ['\u2661', '\u2726', '\u273F', '\u2740', '\u2665']

// Deterministic pseudo-random so the pattern is stable across renders.
function mulberry(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function Particles({ seed = 7, count = 26 }) {
  const items = useMemo(() => {
    const rnd = mulberry(seed)
    const kinds = [
      { cls: 'part--heart', text: '\u2661' },
      { cls: 'part--heart', text: '\u2665' },
      { cls: 'part--spark', text: '\u2726' },
      { cls: 'part--spark', text: '\u273F' },
      { cls: 'part--petal', text: '\u2740' },
    ]
    return Array.from({ length: count }, (_, i) => {
      const kind = kinds[Math.floor(rnd() * kinds.length)]
      return {
        id: i,
        text: kind.text,
        cls: kind.cls,
        left: rnd() * 98,
        size: 10 + rnd() * 20,
        duration: 16 + rnd() * 20,
        delay: -rnd() * 34,
        sway: (rnd() - 0.5) * 160,
        opacity: 0.22 + rnd() * 0.4,
      }
    })
  }, [seed, count])

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {items.map((it) => (
        <span
          key={it.id}
          className={'part ' + it.cls}
          style={{
            left: `${it.left}%`,
            fontSize: it.size,
            '--sway': `${it.sway}px`,
            '--po': it.opacity,
            animationDuration: `${it.duration}s`,
            animationDelay: `${it.delay}s`,
          }}
        >
          {it.text}
        </span>
      ))}
    </div>
  )
}