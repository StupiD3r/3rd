// Tiny hand-drawn doodles scattered around the pages.
// `defs` is an array of { x, y (percent), kind, size, rot }.
export default function Doodles({ defs = [], color = 'rgba(197,111,137,0.4)' }) {
  return (
    <>
      {defs.map((d, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: `${d.x}%`,
            top: `${d.y}%`,
            fontSize: d.size || 18,
            transform: `rotate(${d.rot || 0}deg)`,
            color,
            opacity: d.op || 0.9,
            pointerEvents: 'none',
            lineHeight: 1,
          }}
        >
          {GLYPH[d.kind || 'heart']}
        </span>
      ))}
    </>
  )
}

const GLYPH = {
  heart: '\u2661',
  spark: '\u2726',
  flower: '\u2740',
  swirl: '\u3030',
  star4: '\u273F',
  kiss: '\u2764',
  wave: '\u223C',
  leaf: '\u2618',
}