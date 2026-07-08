import { motion } from 'framer-motion'
import { fadeUpVariants } from '../../lib/animations'

interface SectionWrapperProps {
  id: string
  children: React.ReactNode
  className?: string
  /** Set to true for the Hero section which has its own entry animation */
  noAnimation?: boolean
}

/**
 * Wraps each section with:
 * - Consistent vertical padding
 * - An `id` anchor for hash-based navigation
 * - Scroll-triggered fade-up entrance via Framer Motion whileInView
 * - Renders as a <section> semantic element
 */
export function SectionWrapper({
  id,
  children,
  className = '',
  noAnimation = false,
}: SectionWrapperProps) {
  if (noAnimation) {
    return (
      <section id={id} className={`w-full ${className}`}>
        {children}
      </section>
    )
  }

  return (
    <motion.section
      id={id}
      className={`w-full py-20 md:py-28 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={fadeUpVariants}
    >
      {children}
    </motion.section>
  )
}
