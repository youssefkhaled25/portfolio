import { useState, useEffect, useRef } from 'react'

/**
 * Tracks which section is currently occupying the most viewport space.
 *
 * Uses IntersectionObserver per section element. Handles lazy-loaded sections
 * by watching for DOM additions via MutationObserver — sections that aren't
 * mounted when the hook first runs (e.g. React.lazy chunks) are picked up
 * automatically once they appear in the DOM.
 *
 * Returns the id string of the active section (without '#' prefix).
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '')

  // Stable ref so the MutationObserver callback always sees the latest map
  const visibilityMap = useRef(new Map<string, number>())
  const intersectionObservers = useRef(new Map<string, IntersectionObserver>())

  useEffect(() => {
    if (sectionIds.length === 0) return

    visibilityMap.current.clear()
    // Disconnect any existing intersection observers from a previous run
    intersectionObservers.current.forEach((obs) => obs.disconnect())
    intersectionObservers.current.clear()

    const pickMostVisible = () => {
      let maxRatio = 0
      let mostVisible = sectionIds[0] ?? ''
      visibilityMap.current.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio
          mostVisible = id
        }
      })
      setActiveId(mostVisible)
    }

    const attachObserver = (id: string) => {
      // Already observing this id — skip
      if (intersectionObservers.current.has(id)) return
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          visibilityMap.current.set(id, entry.intersectionRatio)
          pickMostVisible()
        },
        {
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
          rootMargin: '-64px 0px -10% 0px', // account for fixed 64px navbar height
        }
      )
      observer.observe(el)
      intersectionObservers.current.set(id, observer)
    }

    // Attach to any sections already in the DOM
    sectionIds.forEach(attachObserver)

    // Watch for sections that aren't mounted yet (React.lazy / Suspense)
    const unobserved = () => sectionIds.filter((id) => !intersectionObservers.current.has(id))

    const mutationObserver = new MutationObserver(() => {
      const pending = unobserved()
      if (pending.length === 0) {
        mutationObserver.disconnect()
        return
      }
      pending.forEach(attachObserver)
    })

    // Only keep watching if there are still unattached sections
    if (unobserved().length > 0) {
      mutationObserver.observe(document.body, { childList: true, subtree: true })
    }

    return () => {
      mutationObserver.disconnect()
      intersectionObservers.current.forEach((obs) => obs.disconnect())
      intersectionObservers.current.clear()
      visibilityMap.current.clear()
    }
  }, [sectionIds])

  return activeId
}
