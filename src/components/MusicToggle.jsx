import { motion } from 'framer-motion'

// Small corner control for the optional background song.
export default function MusicToggle({ started, playing, onToggle }) {
  if (!started) return null

  return (
    <motion.button
      className="music-note-left"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onClick={onToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      aria-label={playing ? 'pause music' : 'play music'}
      style={{ position: 'fixed', zIndex: 45 }}
    >
      <span style={{ display: 'inline-block', animation: playing ? 'spin-slow 2.2s linear infinite' : 'none' }}>♪</span>
    </motion.button>
  )
}