import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useScrollY } from '../../hooks/useScrollY'

/**
 * Floating "scroll to top" button.
 * - Appears when the user scrolls past the Hero section height (100vh).
 * - Hides while user is within Hero viewport.
 * - Smooth scrolls to top on click.
 */
export function ScrollToTop() {
  const scrollY = useScrollY()
  // Show after scrolling past full viewport height (Hero is 100vh)
  const visible = typeof window !== 'undefined'
    ? scrollY > window.innerHeight
    : false

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
          className={[
            'fixed bottom-6 right-6 z-50',
            'w-11 h-11 rounded-full',
            'bg-bg-surface border border-border-subtle',
            'flex items-center justify-center',
            'text-accent',
            'hover:bg-accent hover:text-bg-primary hover:border-accent hover:shadow-glow',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
            'transition-all duration-200',
          ].join(' ')}
        >
          <ArrowUp size={18} strokeWidth={2.5} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
