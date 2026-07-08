import { motion } from 'framer-motion'
import { Award, BookMarked, ExternalLink, BookOpen, GraduationCap } from 'lucide-react'
import { SectionWrapper } from '../layout/SectionWrapper'
import { SectionHeader } from '../ui/SectionHeader'
import { staggerContainerVariants, staggerItemVariants } from '../../lib/animations'
import type { CertificatesProps } from '../../types/portfolio.types'

/**
 * Certificates section.
 * - Responsive certificate grid: 2 cols <768px, 3 cols 768-1199px, 4 cols ≥1200px.
 * - Official certificates: accent Award icon + accent issuer text.
 * - Self-study entries: muted BookMarked icon + "Self-Study" pill badge, no credential link.
 * - Education block below the grid.
 */
export function Certificates({ certificates, education }: CertificatesProps) {
  return (
    <SectionWrapper id="certificates">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* ── Certificates grid ── */}
        <div>
          <SectionHeader title="Certificates" />

          {certificates.length === 0 ? (
            <div className="mt-8 flex flex-col items-center justify-center py-16 rounded-xl border border-dashed border-border-subtle text-text-muted">
              <Award size={32} strokeWidth={1.5} className="mb-3 opacity-40" aria-hidden="true" />
              <p className="text-sm">No certificates added yet.</p>
              <p className="text-xs mt-1 opacity-60">
                Add your certificates to{' '}
                <code className="font-mono">src/data/portfolio.ts</code>.
              </p>
            </div>
          ) : (
            <motion.div
              className="mt-8 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainerVariants}
            >
              {certificates.map((cert, index) => {
                const isSelfStudy = cert.selfStudy === true

                return (
                  <motion.div
                    key={`${cert.name}-${index}`}
                    variants={staggerItemVariants}
                    className={[
                      'flex flex-col gap-3 p-5 rounded-xl transition-all duration-300',
                      isSelfStudy
                        ? 'bg-bg-surface border border-border-subtle opacity-75 hover:opacity-100 hover:border-text-muted/30'
                        : 'bg-bg-surface border border-border-subtle hover:border-accent/40 hover:shadow-glow-sm',
                    ].join(' ')}
                  >
                    {/* Icon */}
                    <div className={isSelfStudy ? 'text-text-muted' : 'text-accent'}>
                      {isSelfStudy ? (
                        <BookMarked size={22} strokeWidth={1.8} aria-hidden="true" />
                      ) : (
                        <Award size={22} strokeWidth={1.8} aria-hidden="true" />
                      )}
                    </div>

                    {/* Name */}
                    <h3 className="font-grotesk text-sm font-semibold text-text-primary leading-snug">
                      {cert.name}
                    </h3>

                    {/* Issuer */}
                    <p
                      className={`text-xs font-medium ${
                        isSelfStudy ? 'text-text-muted' : 'text-accent'
                      }`}
                    >
                      {cert.issuer}
                    </p>

                    {/* Self-study badge */}
                    {isSelfStudy && (
                      <span className="inline-flex w-fit items-center px-2 py-0.5 rounded-full text-xs font-medium bg-bg-elevated border border-border-subtle text-text-muted">
                        Self-Study
                      </span>
                    )}

                    {/* Date */}
                    {cert.date && (
                      <p className="text-xs text-text-muted font-mono">{cert.date}</p>
                    )}

                    {/* Credential link — only for official certs with a URL */}
                    {!isSelfStudy &&
                      cert.credentialUrl &&
                      cert.credentialUrl !== '[CREDENTIAL_URL]' && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View credential for ${cert.name}`}
                          className={[
                            'mt-auto inline-flex items-center gap-1.5 text-xs font-medium',
                            'text-text-muted hover:text-accent',
                            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent rounded',
                            'transition-colors duration-200',
                          ].join(' ')}
                        >
                          <ExternalLink size={12} aria-hidden="true" />
                          View credential
                        </a>
                      )}
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </div>

        {/* ── Education block ── */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap size={28} className="text-accent" strokeWidth={1.8} aria-hidden="true" />
            <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-text-primary">
              Education
            </h2>
          </div>

          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainerVariants}
          >
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={staggerItemVariants}
                className={[
                  'p-6 rounded-xl',
                  'bg-bg-surface border border-border-subtle',
                  'hover:border-accent/40 hover:shadow-glow-sm',
                  'transition-all duration-300',
                ].join(' ')}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-grotesk text-lg font-bold text-text-primary">
                      {edu.degree}
                    </h3>
                    <p className="text-accent font-medium text-sm mt-0.5">{edu.institution}</p>
                  </div>
                  <span className="text-text-muted text-xs font-mono shrink-0">{edu.period}</span>
                </div>

                {/* Coursework */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen size={14} className="text-text-muted" aria-hidden="true" />
                    <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
                      Relevant Coursework
                    </span>
                  </div>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5">
                    {edu.coursework.map((course) => (
                      <li
                        key={course}
                        className="flex items-center gap-1.5 text-sm text-text-muted"
                      >
                        <span className="text-accent text-xs" aria-hidden="true">
                          ›
                        </span>
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
