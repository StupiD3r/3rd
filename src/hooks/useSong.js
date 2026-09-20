import { useCallback, useEffect, useRef, useState } from 'react'
import { content } from '../config/content.js'

// Tiny audio manager for the optional background song.
// The song NEVER autoplays: it is only started from inside the
// booklet-open click handler (a real user gesture).
export function useSong(enabled) {
  const audioRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)

  const start = useCallback(async () => {
    if (!enabled || !content.music.src || audioRef.current) return

    let el
    try {
      el = new Audio(content.music.src)
      el.loop = true
      el.volume = 0
      el.addEventListener('error', () => {
        audioRef.current = null
        setStarted(false)
        setPlaying(false)
      })
      await el.play()
    } catch {
      audioRef.current = null
      return
    }

    audioRef.current = el
    setStarted(true)
    setPlaying(true)

    // gentle fade-in from silence
    const fade = () => {
      if (!el || el.volume >= content.music.volume) return
      el.volume = Math.min(content.music.volume, el.volume + 0.012)
      setTimeout(fade, 130)
    }
    fade()
  }, [enabled])

  const toggle = useCallback(() => {
    const el = audioRef.current
    if (!el) {
      start()
      return
    }
    if (el.paused) {
      el.play().catch(() => {})
      setPlaying(true)
    } else {
      el.pause()
      setPlaying(false)
    }
  }, [start])

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
    }
  }, [])

  return { started, playing, start, toggle }
}