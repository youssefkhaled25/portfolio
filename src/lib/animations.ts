import type { Variants } from 'framer-motion'

/**
 * Check user's reduced-motion preference.
 * When true, all motion variants collapse to instant transitions.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Returns animation variants with reduced-motion awareness.
 * If prefers-reduced-motion is active, visible === hidden (no animation).
 */
function reducedAware(hidden: Variants['hidden'], visible: Variants['visible']): Variants {
  if (prefersReducedMotion()) {
    return { hidden: visible, visible }
  }
  return { hidden, visible }
}

// ─── Fade up (used by SectionWrapper) ────────────────────────────────────────

export const fadeUpVariants: Variants = reducedAware(
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
)

// ─── Stagger container (Skills, Projects) ────────────────────────────────────

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// ─── Stagger item (child of stagger container) ────────────────────────────────

export const staggerItemVariants: Variants = reducedAware(
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
)

// ─── Skill pill stagger (50ms between pills) ─────────────────────────────────

export const pillContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05, // 50ms
      delayChildren: 0.1,
    },
  },
}

export const pillItemVariants: Variants = reducedAware(
  { opacity: 0, scale: 0.85 },
  { opacity: 1, scale: 1, transition: { duration: 0.25, ease: 'easeOut' } }
)

// ─── Slide in from left (Experience entries) ─────────────────────────────────

export const slideInLeftVariants: Variants = reducedAware(
  { opacity: 0, x: -30 },
  { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } }
)

// ─── Card stagger (Projects — 100ms between cards) ───────────────────────────

export const cardContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
}

export const cardItemVariants: Variants = reducedAware(
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
)

// ─── Mobile menu slide down ───────────────────────────────────────────────────

export const mobileMenuVariants: Variants = reducedAware(
  { opacity: 0, y: -16 },
  { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } }
)

// ─── Nav underline scale ─────────────────────────────────────────────────────

export const navUnderlineVariants: Variants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  active: { scaleX: 1, transition: { duration: 0.2, ease: 'easeOut' } },
}
