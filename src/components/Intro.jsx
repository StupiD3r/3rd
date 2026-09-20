import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { content } from '../config/content.js'
import Particles from './Particles.jsx'

// Scene 1 — a soft cinematic zoom into "For my favorite person..."
export default function Intro({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 5600)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="stage"
      onMouseDown={onDone}
      onTouchStart={onDone}
      initial={{ opacity: 1, scale: 0.92 }}
      animate={{ scale: 1.06, transition: { duration: 5.4, ease: [0.25, 0.6, 0.2, 1] } }}
      exit={{ opacity: 0, scale: 1.08, transition: { duration: 0.7, ease: 'easeInOut' } }}
      style={{ zIndex: 20, display: 'grid', placeItems: 'center', cursor: 'pointer' }}
      title={content.intro.hint}
    >
      <Particles seed={11} count={18} />

      <div style={{ position: 'relative', textAlign: 'center', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [20, 0, -10, -26],
            scale: [0.96, 1, 1, 0.98],
          }}
          transition={{ duration: 2.1, times: [0, 0.4, 0.72, 1], ease: 'easeInOut', delay: 0.2 }}
          className="hand"
          style={{ fontSize: 'clamp(26px, 5vw, 44px)', color: 'var(--brown-soft)' }}
        >
          {content.intro.lineOne}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{
            opacity: [0, 1, 1],
            y: [16, 0, 3],
            scale: [0.9, 1, 1.02],
          }}
          transition={{ duration: 2.4, times: [0, 0.55, 1], ease: 'easeInOut', delay: 2.5 }}
          className="title-great"
          style={{ fontSize: 'clamp(44px, 9.5vw, 86px)', marginTop: '10px' }}
        >
          {content.intro.lineTwo}
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 1.6, delay: 5.3 }}
          className="click-hint"
          style={{ position: 'absolute', left: 0, right: 0, bottom: '-64px' }}
        >
          {content.intro.hint}
        </motion.span>
      </div>
    </motion.div>
  )
}