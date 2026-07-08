import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useActiveSection } from '../../hooks/useActiveSection'
import { navUnderlineVariants, mobileMenuVariants } from '../../lib/animations'
import type { NavItem } from '../../types/portfolio.types'
import { GlowButton } from '../ui/GlowButton'

// ─── NavLink ─────────────────────────────────────────────────────────────────
// Defined at module level so React never sees a new component type on re-render.
// If it were defined inside Navbar's render body, every state change (e.g. a
// new activeSection) would produce a new function reference → React unmounts
// and remounts every NavLink → the motion.button resets to initial="rest"
// before it can animate to "active", breaking the underline indicator.

interface NavLinkProps {
  item: NavItem
  activeSection: string
  onScrollTo: (href: string) => void
}

function NavLink({ item, activeSection, onScrollTo }: NavLinkProps) {
  const sectionId = item.href.replace('#', '')
  const isActive = activeSection === sectionId

  return (
    <motion.button
      onClick={() => onScrollTo(item.href)}
      initial="rest"
      whileHover="hover"
      animate={isActive ? 'active' : 'rest'}
      className="relative py-2 text-sm font-medium text-text-muted hover:text-text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 rounded"
      aria-current={isActive ? 'page' : undefined}
    >
      {item.label}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent origin-left"
        variants={navUnderlineVariants}
      />
    </motion.button>
  )
}

const PHOTO_URL = '/assets/images/profile.jpg'

const prefersReduced =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

interface NavbarProps {
  items: NavItem[]
  cvUrl?: string
}

/**
 * Circular profile avatar + full-screen lightbox modal.
 *
 * Modal structure:
 *   overlay (onClick=close)
 *     └─ content wrapper (onClick=stopPropagation)
 *           ├─ close button (X)
 *           └─ <img> — object-contain, full image visible
 *
 * Accessibility:
 * - role="dialog" + aria-modal on overlay
 * - Focus moves to close button on open; returns to avatar on close
 * - Escape closes modal
 * - prefers-reduced-motion: no scale animation
 * - Body scroll locked while modal open
 * - Modal z-[100] > Navbar z-[50]
 */
function ProfileAvatar() {
  const [modalOpen, setModalOpen] = useState(false)
  const [imgError, setImgError] = useState(false)

  const avatarRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const openModal = () => setModalOpen(true)

  const closeModal = useCallback(() => {
    setModalOpen(false)
    requestAnimationFrame(() => avatarRef.current?.focus())
  }, [])

  // Move focus to close button when modal opens
  useEffect(() => {
    if (modalOpen) {
      requestAnimationFrame(() => closeButtonRef.current?.focus())
    }
  }, [modalOpen])

  // Escape key
  useEffect(() => {
    if (!modalOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [modalOpen, closeModal])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modalOpen])

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: prefersReduced ? 0 : 0.25 } },
    exit:    { opacity: 0, transition: { duration: prefersReduced ? 0 : 0.2  } },
  }

  const contentVariants = {
    hidden:  { opacity: 0, scale: prefersReduced ? 1 : 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: prefersReduced ? 0 : 0.25, ease: 'easeOut' } },
    exit:    { opacity: 0, scale: prefersReduced ? 1 : 0.95, transition: { duration: prefersReduced ? 0 : 0.2 } },
  }

  return (
    <>
      {/* ── Avatar button ── */}
      <button
        ref={avatarRef}
        onClick={openModal}
        aria-label="View profile photo of Youssef Khaled Rizk"
        aria-haspopup="dialog"
        className={[
          'w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden shrink-0 cursor-pointer',
          'border-2 border-accent',
          'hover:shadow-glow hover:scale-[1.08]',
          'transition-all duration-200 ease-in-out',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
        ].join(' ')}
      >
        {imgError ? (
          <div className="w-full h-full bg-bg-elevated flex items-center justify-center text-accent font-grotesk font-bold text-sm select-none">
            YK
          </div>
        ) : (
          <img
            src={PHOTO_URL}
            alt="Youssef Khaled Rizk"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 15%' }}
            onError={() => setImgError(true)}
          />
        )}
      </button>

      {/* ── Lightbox modal — rendered via portal to escape the header's
           stacking context (backdrop-blur creates a stacking context that
           prevents fixed children from painting over the full viewport) ── */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {modalOpen && (
            /* OVERLAY — click here closes modal */
            <motion.div
              key="modal-overlay"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
              onClick={closeModal}
              className="fixed inset-0 z-[200] flex items-center justify-center p-6"
              style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
              role="dialog"
              aria-modal="true"
              aria-label="Profile photo of Youssef Khaled Rizk"
            >
              {/* CONTENT WRAPPER — click here does NOT close modal */}
              <motion.div
                key="modal-content"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
                onClick={(e) => e.stopPropagation()}
                className="relative inline-flex items-center justify-center"
              >
                {/* Close button — top-right of image */}
                <button
                  ref={closeButtonRef}
                  onClick={closeModal}
                  aria-label="Close photo"
                  className={[
                    'absolute -top-3 -right-3 z-10',
                    'w-8 h-8 rounded-full flex items-center justify-center',
                    'bg-bg-surface border border-border-subtle text-text-muted',
                    'hover:text-accent hover:border-accent hover:shadow-glow-sm',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent',
                    'transition-all duration-200',
                  ].join(' ')}
                >
                  <X size={16} aria-hidden="true" />
                </button>

                {/* Full image — object-contain so nothing is cropped */}
                <img
                  src={PHOTO_URL}
                  alt="Youssef Khaled Rizk"
                  style={{
                    display: 'block',
                    width: 'auto',
                    height: 'auto',
                    maxWidth: 'min(500px, 90vw)',
                    maxHeight: '80vh',
                    borderRadius: 12,
                    border: '2px solid #00d4ff',
                    boxShadow: '0 0 24px 3px rgba(0,212,255,0.25)',
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

/**
 * Fixed top navbar with blur backdrop, active section tracking, and mobile menu.
 */
export function Navbar({ items, cvUrl = '/assets/cv/[YOUR_NAME]-CV.pdf' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Stable array reference — only recomputes when `items` identity changes.
  // Without useMemo this is a new array every render, which makes the
  // useActiveSection effect dependency change every render, tearing down and
  // recreating all IntersectionObservers before they can fire. That keeps
  // visibilityMap permanently empty and activeId stuck on "hero".
  const sectionIds = useMemo(
    () => ['hero', ...items.map((item) => item.href.replace('#', ''))],
    [items]
  )
  const activeSection = useActiveSection(sectionIds)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [mobileMenuOpen])

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-lg border-b border-border-subtle">
      <nav aria-label="Main navigation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Profile avatar / lightbox trigger */}
          <ProfileAvatar />

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {items.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                activeSection={activeSection}
                onScrollTo={scrollToSection}
              />
            ))}
            <GlowButton as="a" href={cvUrl} download variant="outline" className="ml-2 text-xs py-2">
              Resume / CV
            </GlowButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-text-muted hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            className="md:hidden absolute top-16 left-0 right-0 bg-bg-surface border-b border-border-subtle shadow-2xl"
          >
            <div className="px-4 py-6 space-y-4">
              {items.map((item) => {
                const sectionId = item.href.replace('#', '')
                const isActive = activeSection === sectionId
                return (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
                      isActive
                        ? 'bg-accent/10 text-accent'
                        : 'text-text-muted hover:bg-bg-elevated hover:text-text-primary'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                )
              })}
              <div className="pt-4 border-t border-border-subtle">
                <GlowButton
                  as="a"
                  href={cvUrl}
                  download
                  variant="primary"
                  className="w-full justify-center"
                >
                  Download CV
                </GlowButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
