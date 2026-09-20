import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { content } from '../config/content.js'
import Doodles from './Doodles.jsx'

const LETTER_DURATION = 6500 // total ms while the letter "writes itself"

const DOODLES = [
  { x: 6, y: 9, kind: 'heart', size: 22, rot: -14 },
  { x: 88, y: 14, kind: 'spark', size: 18, rot: 10 },
  { x: 9, y: 88, kind: 'flower', size: 20, rot: 8 },
  { x: 86, y: 80, kind: 'spark', size: 15, rot: -8 },
  { x: 70, y: 6, kind: 'wave', size: 20, rot: 0 },
]

// Scene 3 — the love letter on the left page, written out gently.
export default function LoveLetter({ active, onRevealed }) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  const paragraphs = content.letter.paragraphs
  const full = paragraphs.join('\n\n')

  useEffect(() => {
    if (!active) return

    let c = 0
    // Fixed ~24 fps tick rate; perTick scales to finish around LETTER_DURATION ms.
    const stepMs = 42
    const perTick = Math.max(1, Math.round(full.length / (LETTER_DURATION / stepMs)))

    const iv = setInterval(() => {
      c = Math.min(full.length, c + perTick)
      setCount(c)
      if (c >= full.length) {
        clearInterval(iv)
        setTimeout(() => setDone(true), 350)
      }
    }, stepMs)

    return () => clearInterval(iv)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const finishInstantly = () => {
    if (done) return
    setCount(full.length)
    setDone(true)
  }

  const shownParts = full.slice(0, count).split('\n\n')

  return (
    <div className="page__inner" onClick={finishInstantly} style={{ cursor: 'pointer' }}>
      <Doodles defs={DOODLES} color="rgba(197,111,137,0.3)" />

      <motion.div
        initial={{ opacity: 0, x: -14 }}
        animate={active ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.25 }}
        className="title-great"
        style={{ fontSize: 'clamp(28px, 5.4vw, 48px)', textAlign: 'center' }}
      >
        {content.letter.heading}
      </motion.div>

      <span
        style={{
          display: 'block',
          margin: '0.35em 0 0.5em',
          textAlign: 'center',
          color: 'var(--rose)',
          letterSpacing: '0.6em',
          fontSize: 'clamp(14px,2.4vw,18px)',
          opacity: 0.7,
        }}
      >
        · — ·
      </span>

      <div
        className="serif"
        style={{
          flex: 1,
          fontSize: 'clamp(15px, 2.6vw, 21px)',
          lineHeight: 1.75,
          color: 'var(--ink)',
          marginTop: '0.4em',
          whiteSpace: 'pre-wrap',
        }}
      >
        <p style={{ marginBottom: '0.85em', fontStyle: 'italic' }}>{content.letter.salutation}</p>
        <span className="par-in" style={{ display: 'block' }}>
          {shownParts.map((part, i) => {
            const isLast = i === shownParts.length - 1
            const isFullPara = !isLast || done
            return (
              <span key={i}>
                {part}
                {isFullPara ? '\n\n' : ''}
                {isLast && !done && <span className="caret" />}
              </span>
            )
          })}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={done ? { opacity: 1 } : {}}
        transition={{ duration: 0.9 }}
        className="hand"
        style={{ marginTop: 'auto', marginBottom: '2.3em', textAlign: 'right', fontSize: 'clamp(26px, 4.6vw, 38px)', color: 'var(--rose-deep)' }}
      >
        {content.letter.signature}
      </motion.div>

      {done && (
        <motion.button
          className="cta"
          initial={{ opacity: 0, y: 12, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          transition={{ delay: 0.6, duration: 0.7 }}
          onClick={(e) => {
            e.stopPropagation()
            if (onRevealed) onRevealed()
          }}
          style={{ position: 'absolute', bottom: '7%', left: '50%', whiteSpace: 'nowrap' }}
        >
          {content.nav.turnPage}
        </motion.button>
      )}
    </div>
  )
}