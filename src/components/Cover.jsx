import { motion } from 'framer-motion'
import { content } from '../config/content.js'

// The front face of the closed booklet — this is what you see
// before clicking. It lives inside the 3D cover element in Scrapbook.
const TAPE =
  'background: linear-gradient(120deg, rgba(255,248,235,0.85), rgba(246,231,214,0.85)); height:26px;'

export default function CoverFace() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'transparent' }}>
      <div className="cover-face-bg" />

      <div
        className="paper-texture"
        style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {/* inner frame */}
        <div
          style={{
            position: 'absolute',
            inset: '6.5%',
            border: '1.5px solid rgba(255, 250, 243, 0.85)',
            outline: '1px solid rgba(197, 111, 137, 0.25)',
            borderRadius: '2px',
            pointerEvents: 'none',
          }}
        />

        {/* tape at corners */}
        <span style={{ position: 'absolute', top: '4%', left: '8%', transform: 'rotate(-38deg)', ...parseTape(TAPE) }} />
        <span style={{ position: 'absolute', top: '4%', right: '8%', transform: 'rotate(38deg)', ...parseTape(TAPE) }} />

        {/* small hearts */}
        <span className="hand" style={{ position: 'absolute', top: '10%', left: '14%', fontSize: 'clamp(16px,3vw,24px)', color: 'rgba(217,134,156,0.55)', transform: 'rotate(-10deg)' }}>♡</span>
        <span className="hand" style={{ position: 'absolute', top: '14%', right: '12%', fontSize: 'clamp(12px,2.2vw,18px)', color: 'rgba(217,134,156,0.45)', transform: 'rotate(14deg)' }}>✦</span>
        <span className="hand" style={{ position: 'absolute', bottom: '12%', left: '12%', fontSize: 'clamp(12px,2.2vw,18px)', color: 'rgba(217,134,156,0.5)', transform: 'rotate(8deg)' }}>✿</span>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '0.6em', textAlign: 'center', padding: '12% 14% 18%' }}>
          <span
            className="title-great"
            style={{ fontSize: 'clamp(34px, 7vw, 62px)', color: '#fdf5ec', textShadow: '0 2px 10px rgba(122,60,80,0.35)' }}
          >
            {content.cover.title}
          </span>
          <span className="hand" style={{ fontSize: 'clamp(24px,4.6vw,38px)', color: '#fce6d8', fontWeight: 600, marginTop: '0.2em' }}>
            {content.cover.subtitle}
          </span>
        </div>

        <motion.span
          className="click-hint"
          style={{ position: 'absolute', bottom: '7%', fontSize: 'clamp(16px,3vw,22px)', color: 'rgba(253,236,225,0.92)' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {content.cover.hint}
        </motion.span>
      </div>

      {/* ribbon bookmark hanging down the right side */}
      <div style={ribbonStyle} />
      <div style={ribbonKnot} />
      <span className="hand" style={{ position: 'absolute', top: '-1%', right: '12%', fontSize: 'clamp(14px,2.6vw,20px)', color: 'rgba(255,240,230,0.9)', transform: 'rotate(6deg)' }}>♡</span>
    </div>
  )
}

function parseTape(cssText) {
  const out = {}
  cssText.split(';').forEach((kv) => {
    const [k, ...rest] = kv.split(':')
    if (k && rest.length) out[k.trim()] = rest.join(':').trim()
  })
  return out
}

const ribbonStyle = {
  position: 'absolute',
  top: 0,
  right: '9%',
  width: 'clamp(18px, 4vw, 30px)',
  height: '112%',
  background: 'linear-gradient(90deg, #e89ab0, #d9869c 55%, #e89ab0)',
  borderRadius: '0 0 6px 6px',
  boxShadow: 'inset 0 0 8px rgba(122,60,80,0.25), 2px 6px 14px -6px rgba(122,60,80,0.5)',
  clipPath: 'polygon(0 0, 100% 0, 100% 96%, 50% 86%, 0 96%)',
  zIndex: 3,
}

const ribbonKnot = {
  position: 'absolute',
  top: '-7%',
  right: '5%',
  width: 'clamp(30px, 6vw, 44px)',
  height: 'clamp(16px, 3.4vw, 24px)',
  background: 'radial-gradient(circle at 18% 50%, #efb6c4, #d9869c 70%)',
  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
  boxShadow: '0 3px 8px -2px rgba(122,60,80,0.45)',
  zIndex: 4,
}