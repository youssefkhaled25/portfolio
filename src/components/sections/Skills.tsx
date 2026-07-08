import { motion } from 'framer-motion'
import {
  Layout,
  Server,
  Code2,
  Wrench,
  Cpu,
  Network,
  Cloud,
  type LucideIcon,
} from 'lucide-react'
import { SectionWrapper } from '../layout/SectionWrapper'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'
import {
  staggerContainerVariants,
  staggerItemVariants,
  pillContainerVariants,
  pillItemVariants,
} from '../../lib/animations'
import type { SkillsProps } from '../../types/portfolio.types'

const ICON_MAP: Record<string, LucideIcon> = {
  Layout,
  Server,
  Code2,
  Wrench,
  Cpu,
  Network,
  Cloud,
}

function CategoryIcon({ name }: { name: string }) {
  const Icon = ICON_MAP[name] ?? Code2
  return <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
}

/**
 * Skills section.
 * - Categories rendered as equal-height cards (items-stretch) with icon + label.
 * - Skills as Tag pills with staggered entrance (50ms between pills).
 * - Pills highlight with accent on hover (handled by Tag component).
 * - Grid: 1 col mobile → 2 col sm → 3 col lg, auto-rows ensuring equal heights per row.
 */
export function Skills({ categories }: SkillsProps) {
  return (
    <SectionWrapper id="skills">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Skills" />

        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainerVariants}
        >
          {categories.map(({ category, icon, skills }) => (
            <motion.div
              key={category}
              variants={staggerItemVariants}
              className={[
                'flex flex-col gap-4 p-6 rounded-xl h-full',
                'bg-bg-surface border border-border-subtle',
                'hover:border-accent/40 hover:shadow-glow-sm',
                'transition-all duration-300',
              ].join(' ')}
            >
              {/* Category header */}
              <div className="flex items-center gap-3">
                <div className="text-accent">
                  <CategoryIcon name={icon} />
                </div>
                <h3 className="font-grotesk text-base font-semibold text-text-primary">
                  {category}
                </h3>
              </div>

              {/* Skill pills — staggered on viewport entry */}
              <motion.div
                className="flex flex-wrap gap-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={pillContainerVariants}
              >
                {skills.map((skill) => (
                  <motion.div key={skill} variants={pillItemVariants}>
                    <Tag label={skill} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
