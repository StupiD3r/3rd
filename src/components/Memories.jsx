import { motion } from 'framer-motion'
import { content } from '../config/content.js'

// Scene 5 — a cute scrapbook polaroid collage on the top half
// of the right-hand page.
const TAPE_COLORS = ['rgba(240,222,190,0.6)', 'rgba(216,186,160,0.55)', 'rgba(246,228,206,0.65)']

export default function Memories({ active }) {
  const photos = content.photos

  return (
    <div style={{ marginBottom: '0.6em' }}>
      <motion.h3
        className="hand"
        initial={{ opacity: 0, y: 10 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{
          fontSize: 'clamp(24px, 4.4vw, 36px)',
          color: 'var(--rose-deep)',
          textAlign: 'center',
          fontWeight: 700,
          marginBottom: '0.5em',
        }}
      >
        {content.memoriesTitle}
      </motion.h3>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(8px, 1.4vw, 14px)',
        }}
      >
        {photos.map((photo, i) => (
          <motion.figure
            key={i}
            className="polaroid"
            initial={{ opacity: 0, y: 26, rotate: (photo.rot || 0) * 2, scale: 0.9 }}
            animate={active ? { opacity: 1, y: 0, rotate: photo.rot || 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.18, ease: 'easeOut' }}
            whileHover={{ rotate: 0, scale: 1.04, y: -4, zIndex: 5 }}
            style={{
              position: 'relative',
              margin: 0,
              background: 'linear-gradient(180deg, #fffdf7, #fdf6ea)',
              padding: 'clamp(6px,1vw,9px) clamp(6px,1vw,9px) clamp(4px,0.8vw,8px)',
              boxShadow: '0 10px 22px -10px rgba(122,90,60,0.5), 0 2px 6px rgba(122,90,60,0.18)',
              borderRadius: '2px',
              willChange: 'transform',
            }}
          >
            {/* washi tape */}
            <span
              style={{
                position: 'absolute',
                top: -10,
                left: '50%',
                width: '46%',
                height: 22,
                transform: 'translateX(-50%) rotate(-4deg)',
                background: `linear-gradient(120deg, ${TAPE_COLORS[i % 3]}, ${TAPE_COLORS[(i + 1) % 3]})`,
                boxShadow: '0 2px 4px rgba(122,90,60,0.18)',
                opacity: 0.9,
                pointerEvents: 'none',
                clipPath: 'polygon(2% 0, 98% 4%, 96% 100%, 4% 94%)',
              }}
            />
            <div
              style={{
                overflow: 'hidden',
                aspectRatio: '4 / 3',
                background: '#ead9cd',
              }}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.92) brightness(1.02)' }}
              />
            </div>
            <figcaption
              className="hand"
              style={{
                marginTop: '6px',
                textAlign: 'center',
                fontSize: 'clamp(13px, 2.3vw, 18px)',
                color: 'var(--brown-soft)',
                fontWeight: 600,
                lineHeight: 1.15,
                minHeight: '1.6em',
              }}
            >
              {photo.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  )
}