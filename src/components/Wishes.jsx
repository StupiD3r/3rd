import { motion } from 'framer-motion'
import { content } from '../config/content.js'

// Scene 6 — handwritten wishes fading in one after another
// on the bottom half of the right-hand page.
const WISH_TILTS = [0, 2.5, -2, 1.5, -1.5, 2]

export default function Wishes({ active }) {
  const wishes = content.wishes

  return (
    <div style={{ position: 'relative', paddingTop: '0.6em' }}>
      <motion.h3
        className="hand"
        initial={{ opacity: 0, y: 10 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{
          fontSize: 'clamp(24px, 4.4vw, 36px)',
          color: 'var(--rose-deep)',
          textAlign: 'center',
          fontWeight: 700,
          marginBottom: '0.55em',
        }}
      >
        {content.wishesTitle}
      </motion.h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(7px, 1vw, 11px)' }}>
        {wishes.map((wish, i) => (
          <motion.p
            key={i}
            className="hand"
            initial={{ opacity: 0, x: 26, rotate: (WISH_TILTS[i % WISH_TILTS.length] || 0) * 2.4 }}
            animate={active ? { opacity: 1, x: 0, rotate: WISH_TILTS[i % WISH_TILTS.length] || 0 } : {}}
            transition={{ duration: 0.55, delay: 0.55 + i * 0.35, ease: 'easeOut' }}
            style={{
              fontSize: 'clamp(16px, 2.7vw, 22px)',
              color: 'var(--brown)',
              lineHeight: 1.3,
              paddingLeft: '0.2em',
              textShadow: '0 1px 0 rgba(255,255,255,0.6)',
            }}
          >
            <span style={{ color: 'var(--rose)', marginRight: '0.45em', fontSize: '0.9em' }}>♡</span>
            {wish}
          </motion.p>
        ))}
      </div>
    </div>
  )
}