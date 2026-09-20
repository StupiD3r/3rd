import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Intro from './components/Intro.jsx'
import Scrapbook from './components/Scrapbook.jsx'
import Ending from './components/Ending.jsx'
import MusicToggle from './components/MusicToggle.jsx'
import { usePageZoom } from './hooks/useViewport.js'
import { useSong } from './hooks/useSong.js'
import { content } from './config/content.js'

// INTRO → BOOK → OPENING → LETTER → MEMORIES → BACK OUT → CLOSING → END
const STAGE = {
  INTRO: 'intro',
  BOOK: 'book',
  OPENING: 'opening',
  LETTER: 'letter',
  MEMORIES: 'memories',
  BACKOUT: 'backOut',
  CLOSING: 'closing',
  END: 'end',
}

export default function App() {
  const { pageZoom, pw } = usePageZoom()
  const music = useSong(Boolean(content.music.src))
  const [stage, setStage] = useState(STAGE.INTRO)
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const later = useMemo(() => (ms, fn) => {
    timers.current.push(setTimeout(fn, ms))
  }, [])

  const areBlobs = useMemo(() => [...Array(3)], [])

  const handleOpen = () => {
    if (content.music.autoplayAfterOpen && !music.started) music.start()
    setStage(STAGE.OPENING)
    later(1400, () => setStage(STAGE.LETTER))
  }

  const handleTurnPage = () => setStage(STAGE.MEMORIES)

  const handleCloseBook = () => {
    setStage(STAGE.BACKOUT)
    later(1050, () => setStage(STAGE.CLOSING))
    later(1050 + 1500, () => setStage(STAGE.END))
  }

  const replay = () => window.location.reload()

  const showBook = stage !== STAGE.INTRO && stage !== STAGE.END

  return (
    <>
      {/* persistent backdrop */}
      <div className="stage" style={{ zIndex: 0 }}>
        {areBlobs.map((_, i) => (
          <div key={i} className={`blob blob-${['a', 'b', 'c'][i]}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {stage === STAGE.INTRO && (
          <Intro key="intro" onDone={() => setStage(STAGE.BOOK)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBook && (
          <motion.div
            key="scrapbook"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.7, ease: 'easeInOut' } }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ position: 'fixed', inset: 0, zIndex: 10 }}
          >
            <Scrapbook stage={stage} pageZoom={pageZoom} pw={pw} onOpen={handleOpen} onTurnPage={handleTurnPage} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* "close the book" control while reading the right page */}
      {stage === STAGE.MEMORIES && (
        <div className="float-hint" style={{ zIndex: 40 }}>
          <motion.button
            className="cta"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            onClick={handleCloseBook}
          >
            {content.nav.closeBook}
          </motion.button>
        </div>
      )}

      <MusicToggle started={music.started} playing={music.playing} onToggle={music.toggle} />

      <AnimatePresence mode="wait">
        {stage === STAGE.END && <Ending key="ending" onReplay={replay} />}
      </AnimatePresence>
    </>
  )
}