import { motion } from 'framer-motion'
import { content } from '../config/content.js'
import Particles from './Particles.jsx'

// FINAL SCENE — a warm, quiet landing page.
const E = content.ending

export default function Ending({ onReplay }) {
  return (
    <motion.div
      className="stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      style={{ zIndex: 30, display: 'grid', placeItems: 'center' }}
    >
      <Particles seed={23} count={30} />

      <div style={{ position: 'relative', textAlign: 'center', padding: '0 24px', maxWidth: '720px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(40px, 9vw, 76px)', color: 'var(--rose)', marginBottom: '0.1em' }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
          >
            ♥
          </motion.span>
        </motion.div>

        <motion.h1
          className="title-great"
          initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.9, duration: 1.2, ease: 'easeOut' }}
          style={{ fontSize: 'clamp(34px, 7.4vw, 64px)', letterSpacing: '2px' }}
        >
          {E.title}
        </motion.h1>

        <motion.div
          className="title-great"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1 }}
          style={{ fontSize: 'clamp(30px, 6.6vw, 56px)', color: 'var(--brown)', marginTop: '0.15em' }}
        >
          {E.name}
        </motion.div>

        <motion.p
          className="hand"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.15, duration: 0.9 }}
          style={{ fontSize: 'clamp(19px, 3.5vw, 27px)', color: 'var(--brown-soft)', marginTop: '0.9em' }}
        >
          {E.sub}
        </motion.p>

        <motion.p
          className="hand"
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 2.7, duration: 0.9, ease: 'easeOut' }}
          style={{ fontSize: 'clamp(24px, 4.6vw, 36px)', color: 'var(--rose-deep)', marginTop: '0.8em', fontWeight: 600 }}
        >
          {E.love}
        </motion.p>

        <motion.button
          className="hand"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ delay: 3.6, duration: 1 }}
          onClick={onReplay}
          whileHover={{ opacity: 1, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            marginTop: '3.2em',
            fontFamily: 'var(--font-hand)',
            fontSize: 'clamp(15px, 2.6vw, 19px)',
            color: 'var(--rose-deep)',
            background: 'none',
            borderBottom: '1.5px dashed rgba(217,134,156,0.6)',
            padding: '4px 10px',
          }}
        >
          {E.replay}
        </motion.button>
      </div>
    </motion.div>
  )
}