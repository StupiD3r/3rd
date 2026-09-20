import { motion } from 'framer-motion'
import CoverFace from './Cover.jsx'
import LoveLetter from './LoveLetter.jsx'
import Memories from './Memories.jsx'
import Wishes from './Wishes.jsx'
import Doodles from './Doodles.jsx'

const OPEN = ['opening', 'letter', 'memories', 'backOut']
const RIGHT_CONTENT = ['memories', 'backOut', 'closing']
const LETTER_ACTIVE = ['letter', 'memories', 'backOut', 'closing']

// Handmade look: the closed book is tilted a hair.
const CLOSED_TILT = -2

// Focus moves for the "camera" around the book.
// `pageZoom` is the ratio we zoom in to read a page; `pw` is the page
// width. Each page's centre sits half a page-width from the book's
// centre, so that is the distance we pan (scaled up by the zoom).
function cameraTarget(stage, pageZoom, pw) {
  const mem = pageZoom * 0.96
  const half = pw / 2
  switch (stage) {
    case 'letter':
      return { x: pageZoom * half, y: 0, scale: pageZoom }
    case 'memories':
      return { x: -mem * half, y: 0, scale: mem }
    case 'backOut':
    case 'closing':
      return { x: 0, y: 0, scale: 1 }
    default:
      return { x: 0, y: 0, scale: 1 }
  }
}

function cameraTransition(stage) {
  switch (stage) {
    case 'letter':
    case 'memories':
      return { x: { duration: 1.05, ease: [0.3, 0.65, 0.25, 1] }, scale: { duration: 1.05, ease: [0.3, 0.65, 0.25, 1] } }
    case 'backOut':
      return { x: { duration: 1.0, ease: [0.4, 0, 0.25, 1] }, scale: { duration: 1.0, ease: [0.4, 0, 0.25, 1] } }
    default:
      return { duration: 0.4 }
  }
}

// The whole open/closed scrapbook. One persistent element across the
// closed-book → letter → memories → closing flow so every move feels
// like panning over the same physical booklet.
export default function Scrapbook({ stage, pageZoom, pw, onOpen, onTurnPage }) {
  const open = OPEN.includes(stage)

  const sheetX = stage === 'book' || stage === 'closing' ? '-25%' : '0%'
  const coverRotateY = open ? -180 : 0
  const coverZ = open ? -2 : 0

  const leftOpacity = stage === 'book' || stage === 'closing' ? 0 : 1
  const rightOpacity = stage === 'book' || stage === 'closing' ? 0 : 1

  const leftTrans =
    stage === 'opening'
      ? { opacity: { duration: 0.45, delay: 0.55 } }
      : stage === 'closing'
      ? { opacity: { duration: 0.3, delay: 0.12 } }
      : { duration: 0.4 }

  const rightTrans =
    stage === 'opening'
      ? { opacity: { duration: 0.4, delay: 0.1 } }
      : stage === 'closing'
      ? { opacity: { duration: 0.35, delay: 0.55 } }
      : { duration: 0.4 }

  return (
    <div className="world">
      <motion.div
        className="camera"
        animate={cameraTarget(stage, pageZoom, pw)}
        transition={cameraTransition(stage)}
        initial={{ x: 0, y: 0, scale: 1 }}
      >
        <motion.div
          className="book"
          animate={{ y: stage === 'book' ? [0, -8, 0] : 0 }}
          transition={stage === 'book' ? { duration: 3.4, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.5 }}
        >
          {/* grounding shadow under the book */}
          <motion.div
            style={{
              position: 'absolute',
              left: '4%',
              right: '4%',
              bottom: '-7%',
              height: '9%',
              background: 'radial-gradient(50% 50% at 50% 50%, rgba(122,90,60,0.34), rgba(122,90,60,0))',
              filter: 'blur(8px)',
              pointerEvents: 'none',
            }}
            animate={{ opacity: open ? 0.3 : 0.75 }}
            transition={{ duration: 0.8 }}
          />

          <motion.div
            className="sheet"
            animate={{ x: sheetX }}
            transition={
              stage === 'opening'
                ? { duration: 1.25, ease: [0.4, 0.62, 0.2, 1] }
                : stage === 'closing'
                ? { duration: 1.25, ease: [0.5, 0.1, 0.4, 1], delay: 0.1 }
                : { duration: 0.5 }
            }
          >
            {/* LEFT PAGE — the love letter */}
            <motion.div
              className="page page--left paper-texture"
              animate={{ opacity: leftOpacity }}
              transition={leftTrans}
              style={{ pointerEvents: leftOpacity ? 'auto' : 'none' }}
            >
              <LoveLetter active={LETTER_ACTIVE.includes(stage)} onRevealed={onTurnPage} />
            </motion.div>

            {/* RIGHT PAGE — memories on top, wishes below */}
            <motion.div
              className="page page--right paper-texture"
              animate={{ opacity: rightOpacity }}
              transition={rightTrans}
              style={{ pointerEvents: rightOpacity ? 'auto' : 'none' }}
            >
              <Doodles
                defs={[
                  { x: 4, y: 4, kind: 'flower', size: 20, rot: 6 },
                  { x: 90, y: 42, kind: 'heart', size: 16, rot: -8 },
                  { x: 7, y: 60, kind: 'spark', size: 14, rot: 12 },
                ]}
                color="rgba(197,111,137,0.28)"
              />
              <div
                style={{
                  height: '100%',
                  padding: 'clamp(12px, 1.6vw, 18px) 7%',
                  display: 'flex',
                  flexDirection: 'column',
                  overflowY: 'auto',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                <Memories active={RIGHT_CONTENT.includes(stage)} />
                <div className="divider-scrap">
                  <span style={{ fontSize: 'clamp(15px, 2.6vw, 20px)' }} className="hand">
                    ♡
                  </span>
                </div>
                <Wishes active={RIGHT_CONTENT.includes(stage)} />
              </div>
            </motion.div>

            {/* centre crease of the open book */}
            <div className="spine-shade" />

            {/* THE COVER — a single page-leaf hinged at the spine, flips left */}
            <motion.div
              className="cover"
              style={{ pointerEvents: open ? 'none' : 'auto', cursor: stage === 'book' ? 'pointer' : 'default' }}
              animate={{
                rotateY: coverRotateY,
                z: coverZ,
                rotate: stage === 'book' ? CLOSED_TILT : 0,
              }}
              transition={
                stage === 'opening' || stage === 'closing'
                  ? {
                      rotateY: { duration: 1.25, ease: [0.55, 0.06, 0.25, 1] },
                      rotate: { duration: 0.9 },
                      z: { duration: 0.3 },
                    }
                  : { duration: 0.5 }
              }
              whileHover={stage === 'book' ? { scale: 1.03, z: 8 } : undefined}
              whileTap={stage === 'book' ? { scale: 0.985 } : undefined}
              onClick={stage === 'book' ? onOpen : undefined}
            >
              <div className="cover__face">
                <CoverFace />
              </div>
              <div className="cover__face cover__back" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}