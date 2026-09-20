import { useEffect, useState } from 'react'

export function useViewport() {
  const [view, setView] = useState({
    w: typeof window !== 'undefined' ? window.innerWidth : 1000,
    h: typeof window !== 'undefined' ? window.innerHeight : 800,
  })

  useEffect(() => {
    const onResize = () => setView({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return view
}

// Clamp helper
export const clamp = (n, min, max) => Math.max(min, Math.min(max, n))

// Returns the target camera zoom used while reading a single page.
// The page is a fixed fraction of the viewport width; we zoom until the
// page height fills most of the screen (without going overboard).
export function usePageZoom() {
  const { w, h } = useViewport()
  const pw = Math.min(420, Math.max(300, w * 0.78))
  const ph = pw * 1.7
  const pageZoom = clamp((h * 0.92) / ph, 1.14, 2.35)
  return { pw, ph, pageZoom }
}