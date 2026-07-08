import { motion } from 'framer-motion'
import {
  Globe,
  Database,
  Cpu,
  Search,
  Code2,
  Server,
  Layers,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  Cloud,
  type LucideIcon,
} from 'lucide-react'
import { SectionWrapper } from '../layout/SectionWrapper'
import { SectionHeader } from '../ui/SectionHeader'
import { staggerContainerVariants, staggerItemVariants } from '../../lib/animations'
import type { AboutProps } from '../../types/portfolio.types'

/** Map icon string names from data to actual lucide-react components */
const ICON_MAP: Record<string, LucideIcon> = {
  Globe,
  Database,
  Cpu,
  Search,
  Code2,
  Server,
  Layers,
  BookOpen,
  ShieldCheck,
  Cloud,
}

function InterestIcon({ name }: { name: string }) {
  const Icon = ICON_MAP[name] ?? Code2
  return <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
}

/** Filled/empty dot proficiency indicator — out of 5 */
function DotScale({ filled, total = 5 }: { filled: number; total?: number }) {
  return (
    <div className="flex items-center gap-1" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i < filled ? 'bg-accent' : 'bg-border-subtle'
          }`}
        />
      ))}
    </div>
  )
}

/**
 * About section.
 * - Scroll-triggered fade-in for bio paragraphs.
 * - Interests grid: tiles with icon + label.
 * - Spoken Languages subsection: compact horizontal row of language cards.
 * - Single column on mobile, two-column split on md+.
 */
export function About({ bio, interests, spokenLanguages }: AboutProps) {
  return (
    <SectionWrapper id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="About Me" />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* ── Bio paragraphs ── */}
          <motion.div
            className="space-y-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainerVariants}
          >
            {bio.map((paragraph, i) => (
              <motion.p
                key={i}
                variants={staggerItemVariants}
                className="text-text-muted leading-relaxed text-base sm:text-lg"
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Quick-facts strip */}
            <motion.div
              variants={staggerItemVariants}
              className="flex flex-wrap gap-4 pt-4"
            >
              {[
                { label: 'Location', value: 'Egypt' },
                { label: 'Status', value: 'Graduate — 2026' },
                { label: 'Job Title', value: 'Network Engineer | Cloud Engineer' },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col">
                  <span className="text-xs font-mono text-accent uppercase tracking-wider">
                    {label}
                  </span>
                  <span className="text-sm text-text-primary font-medium">{value}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right column: Interests + Languages Spoken ── */}
          <div className="space-y-8">
            {/* Interests grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainerVariants}
              className="grid grid-cols-2 gap-4"
            >
              {interests.map(({ icon, label }) => (
                <motion.div
                  key={label}
                  variants={staggerItemVariants}
                  className={[
                    'flex flex-col items-start gap-3 p-5 rounded-xl',
                    'bg-bg-surface border border-border-subtle',
                    'hover:border-accent/50 hover:shadow-glow-sm',
                    'transition-all duration-300 group',
                  ].join(' ')}
                >
                  <div className="text-accent group-hover:scale-110 transition-transform duration-200">
                    <InterestIcon name={icon} />
                  </div>
                  <span className="text-sm font-medium text-text-primary leading-snug">
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* ── Languages Spoken ── */}
            {spokenLanguages && spokenLanguages.length > 0 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainerVariants}
              >
                {/* Label row */}
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare
                    size={14}
                    className="text-text-muted"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
                    Languages Spoken
                  </span>
                </div>

                {/* Language cards — compact horizontal row */}
                <div className="flex flex-wrap gap-3">
                  {spokenLanguages.map(({ name, level, dots }) => (
                    <motion.div
                      key={name}
                      variants={staggerItemVariants}
                      className={[
                        'flex flex-col gap-2 px-4 py-3 rounded-lg',
                        'bg-bg-surface border border-border-subtle',
                        'hover:border-accent/30 transition-colors duration-200',
                        'min-w-[130px]',
                      ].join(' ')}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-text-primary font-grotesk">
                          {name}
                        </span>
                        <DotScale filled={dots} />
                      </div>
                      <span className="text-xs text-text-muted font-mono">{level}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
