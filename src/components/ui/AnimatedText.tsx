import { useState, useEffect, useRef } from 'react'

// Computed once at module load — matches the pattern used in animations.ts and Hero.tsx
const prefersReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

interface AnimatedTextProps {
  text: string
  /** ms per character — stays within 40-80ms range */
  speed?: number
  className?: string
  /** Called when typing animation finishes */
  onComplete?: () => void
}

/**
 * Typing-effect component.
 * - Reveals one character at a time at 40–80ms per character.
 * - Shows a blinking cursor that toggles visibility every 500ms.
 * - Respects prefers-reduced-motion: shows full text immediately.
 */
export function AnimatedText({
  text,
  speed = 55,
  className = '',
  onComplete,
}: AnimatedTextProps) {
  const clampedSpeed = Math.min(Math.max(speed, 40), 80)

  const [displayed, setDisplayed] = useState(prefersReducedMotion ? text : '')
  const [showCursor, setShowCursor] = useState(true)
  const [done, setDone] = useState(prefersReducedMotion)
  const indexRef = useRef(prefersReducedMotion ? text.length : 0)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  // Typing effect
  useEffect(() => {
    if (prefersReducedMotion) {
      onCompleteRef.current?.()
      return
    }

    indexRef.current = 0
    setDisplayed('')
    setDone(false)

    const timer = setInterval(() => {
      indexRef.current += 1
      setDisplayed(text.slice(0, indexRef.current))

      if (indexRef.current >= text.length) {
        clearInterval(timer)
        setDone(true)
        onCompleteRef.current?.()
      }
    }, clampedSpeed)

    return () => clearInterval(timer)
  }, [text, clampedSpeed, prefersReducedMotion])

  // Blinking cursor — 500ms toggle
  useEffect(() => {
    if (prefersReducedMotion) return

    const cursor = setInterval(() => {
      setShowCursor((v) => !v)
    }, 500)

    return () => clearInterval(cursor)
  }, [prefersReducedMotion])

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{displayed}</span>
      {/* Cursor: hide after a short delay once typing is done */}
      {!prefersReducedMotion && (
        <span
          aria-hidden="true"
          className={`inline-block w-0.5 h-[1em] bg-accent ml-0.5 align-middle transition-opacity duration-100 ${
            showCursor && !done ? 'opacity-100' : done ? 'opacity-0' : 'opacity-0'
          }`}
        />
      )}
    </span>
  )
}
