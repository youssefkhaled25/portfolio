import { ArrowUp } from 'lucide-react'
import type { FooterProps } from '../../types/portfolio.types'

/**
 * Minimal footer.
 * - Dynamic copyright year.
 * - Back-to-top button scrolls smoothly to #hero.
 * - Renders as <footer> semantic landmark.
 */
export function Footer({ name, year }: FooterProps) {
  const scrollToTop = () => {
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-bg-surface border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-text-muted text-sm">
            © {year}{' '}
            <span className="text-text-primary font-medium">{name}</span>
            {' '}— Built with React &amp; Tailwind CSS
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top of page"
            className={[
              'flex items-center gap-2 text-xs font-medium text-text-muted',
              'hover:text-accent transition-colors duration-200',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded',
            ].join(' ')}
          >
            Back to top
            <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
