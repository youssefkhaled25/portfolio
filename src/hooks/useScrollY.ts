import { useState, useEffect } from 'react'

/**
 * Returns the current window.scrollY value, updated on every scroll event.
 * Used by ScrollToTop to decide visibility.
 */
export function useScrollY(): number {
  const [scrollY, setScrollY] = useState(
    typeof window !== 'undefined' ? window.scrollY : 0
  )

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollY
}
