import { motion } from 'framer-motion'
import { Briefcase, Calendar } from 'lucide-react'
import { SectionWrapper } from '../layout/SectionWrapper'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'
import { slideInLeftVariants, staggerContainerVariants, staggerItemVariants } from '../../lib/animations'
import type { ExperienceProps } from '../../types/portfolio.types'

/**
 * Experience section — vertical timeline layout.
 * - Accent-colored connector line on the left.
 * - Each entry slides in from the left on scroll.
 * - Collapses to single-column on mobile (no horizontal offset).
 */
export function Experience({ items }: ExperienceProps) {
  return (
    <SectionWrapper id="experience">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Experience" />

        <div className="mt-12 relative">
          {/* Vertical accent connector line — hidden on mobile */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-accent via-accent/40 to-transparent"
          />

          <motion.div
            className="space-y-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainerVariants}
          >
            {items.map((item, index) => (
              <motion.div
                key={`${item.company}-${index}`}
                variants={slideInLeftVariants}
                className="relative md:pl-16"
              >
                {/* Timeline dot */}
                <div
                  aria-hidden="true"
                  className="hidden md:flex absolute left-0 top-1 w-12 h-12 rounded-full bg-bg-surface border-2 border-accent items-center justify-center text-accent shrink-0"
                >
                  <Briefcase size={18} strokeWidth={1.8} />
                </div>

                {/* Card */}
                <div
                  className={[
                    'p-6 rounded-xl',
                    'bg-bg-surface border border-border-subtle',
                    'hover:border-accent/40 hover:shadow-glow-sm',
                    'transition-all duration-300',
                  ].join(' ')}
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-grotesk text-lg font-bold text-text-primary leading-snug">
                        {item.role}
                      </h3>
                      <p className="text-accent font-medium text-sm mt-0.5">{item.company}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-text-muted text-xs font-mono shrink-0">
                      <Calendar size={13} aria-hidden="true" />
                      {item.period}
                    </div>
                  </div>

                  {/* Description bullets */}
                  <motion.ul
                    className="space-y-2 mb-5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainerVariants}
                  >
                    {item.description.map((bullet, i) => (
                      <motion.li
                        key={i}
                        variants={staggerItemVariants}
                        className="flex items-start gap-2 text-sm text-text-muted leading-relaxed"
                      >
                        <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">
                          ›
                        </span>
                        {bullet}
                      </motion.li>
                    ))}
                  </motion.ul>

                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <Tag key={skill} label={skill} variant="accent" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
