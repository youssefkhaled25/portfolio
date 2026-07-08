import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { AnimatedText } from '../ui/AnimatedText'
import { GlowButton } from '../ui/GlowButton'
import type { HeroProps } from '../../types/portfolio.types'

const prefersReduced =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

/** Staggered fade-up variants for Hero entrance — 100ms between items */
const itemVariant = {
  hidden: prefersReduced ? {} : { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.1 },
  }),
}

interface HeroSectionProps extends HeroProps {
  /** Called when "View Projects" is clicked */
  onViewProjects?: () => void
}

/**
 * Circular profile photo with:
 * - Cyan accent ring
 * - Hover cyan glow
 * - "YR" initials fallback when image fails to load
 */
function ProfilePhoto({ src, name }: { src?: string; name: string }) {
  const [imgError, setImgError] = useState(false)
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')

  const showFallback = !src || imgError

  return (
    <div
      className={[
        'relative w-36 h-36 mx-auto rounded-full',
        'ring-2 ring-accent ring-offset-2 ring-offset-bg-primary',
        'hover:shadow-glow transition-shadow duration-300',
        'overflow-hidden',
      ].join(' ')}
    >
      {showFallback ? (
        /* Initials fallback */
        <div
          className="w-full h-full flex items-center justify-center bg-bg-elevated text-accent font-grotesk font-bold text-3xl select-none"
          aria-label={`Profile photo placeholder — initials ${initials}`}
        >
          {initials}
        </div>
      ) : (
        <img
          src={src}
          alt={`Profile photo of ${name}`}
          className="w-full h-full object-cover"
          style={{ objectPosition: '50% 15%' }}
          onError={() => setImgError(true)}
        />
      )}
    </div>
  )
}

/**
 * Hero section — full viewport, centered, animated background grid,
 * profile photo, typing effect title, staggered fade-up entrance.
 */
export function Hero({
  name,
  title,
  tagline,
  cvUrl,
  projectsHref,
  photoUrl,
  onViewProjects,
}: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  /* ── Animated dot-grid background canvas ── */
  useEffect(() => {
    if (prefersReduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let time = 0

    /**
     * Scale the canvas backing store to match devicePixelRatio so it renders
     * crisp on retina / HiDPI screens. CSS size stays at 100% (w-full h-full),
     * and we re-apply ctx.scale on every resize so draw coordinates stay in
     * CSS pixel units throughout the draw loop.
     */
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      // Set the actual pixel dimensions of the backing store
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      // Scale the context so all subsequent draw calls use CSS pixel units
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      // Use CSS pixel dimensions (offsetWidth/Height) for layout maths so
      // dot positions are independent of DPR.
      const cssWidth = canvas.offsetWidth
      const cssHeight = canvas.offsetHeight
      // Clear the full backing-store area (real pixels)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const spacing = 40
      const cols = Math.ceil(cssWidth / spacing) + 1
      const rows = Math.ceil(cssHeight / spacing) + 1

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacing
          const y = r * spacing
          const dist = Math.sqrt((x - cssWidth / 2) ** 2 + (y - cssHeight / 2) ** 2)
          const alpha = 0.04 + 0.06 * Math.sin((dist / 120 - time / 60) * 2)
          const radius = 1 + 0.8 * Math.sin((dist / 80 - time / 45) * 2)

          ctx.beginPath()
          ctx.arc(x, y, Math.max(0.3, radius), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0,212,255,${Math.max(0, alpha)})`
          ctx.fill()
        }
      }

      time++
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-primary"
    >
      {/* Animated dot-grid background */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Radial vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, #0a0a0f 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">

        {/* Eyebrow label */}
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={itemVariant}
          className="font-mono text-accent text-xs sm:text-sm tracking-[0.25em] uppercase"
        >
          Portfolio
        </motion.p>

        {/* Profile photo — custom={1}, sits between label and name */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={itemVariant}
        >
          <ProfilePhoto src={photoUrl} name={name} />
        </motion.div>

        {/* Name */}
        <motion.h1
          custom={2}
          initial="hidden"
          animate="visible"
          variants={itemVariant}
          className="font-grotesk text-5xl sm:text-6xl md:text-7xl font-bold text-text-primary leading-tight"
        >
          {name}
        </motion.h1>

        {/* Animated title */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={itemVariant}
          className="font-grotesk text-xl sm:text-2xl md:text-3xl font-semibold text-accent min-h-[2rem]"
        >
          <AnimatedText text={title} speed={55} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          custom={4}
          initial="hidden"
          animate="visible"
          variants={itemVariant}
          className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed"
        >
          {tagline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={itemVariant}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-2"
        >
          <GlowButton
            variant="primary"
            onClick={() => {
              onViewProjects?.()
              scrollTo(projectsHref)
            }}
          >
            View Projects
          </GlowButton>

          <GlowButton
            as="a"
            href={cvUrl}
            download
            variant="outline"
            aria-label="Download CV as PDF"
          >
            Download CV
          </GlowButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {!prefersReduced && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted/50"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
