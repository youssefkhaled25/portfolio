import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import { SectionWrapper } from '../layout/SectionWrapper'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'
import { cardContainerVariants, cardItemVariants } from '../../lib/animations'
import type { ProjectCardProps, ProjectsProps } from '../../types/portfolio.types'

/**
 * Individual project card.
 * - Cyan border glow + scale 1.02 on hover.
 * - Conditional highlight badge.
 * - Tech stack Tag pills.
 * - Feature bullet list.
 * - GitHub icon link with aria-label.
 */
function ProjectCard({ project, index: _index }: ProjectCardProps) {
  const { title, description, techStack, features, githubUrl, liveUrl, highlight } = project

  return (
    <motion.article
      variants={cardItemVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={[
        'relative flex flex-col gap-5 p-6 rounded-xl h-full',
        'bg-bg-surface border border-border-subtle',
        'hover:border-accent hover:shadow-glow',
        'transition-colors duration-300 group',
      ].join(' ')}
    >
      {/* Highlight badge */}
      {highlight && (
        <span
          className={[
            'absolute top-4 right-4',
            'px-2.5 py-0.5 rounded-full text-xs font-semibold',
            'bg-accent/15 text-accent border border-accent/30',
          ].join(' ')}
        >
          {highlight}
        </span>
      )}

      {/* Title */}
      <h3 className="font-grotesk text-lg font-bold text-text-primary pr-24 leading-snug">
        {title}
      </h3>

      {/* Description */}
      <p className="text-text-muted text-sm leading-relaxed flex-none">{description}</p>

      {/* Feature list */}
      <ul className="space-y-1.5 flex-1">
        {features.map((feat) => (
          <li key={feat} className="flex items-start gap-2 text-sm text-text-muted">
            <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">
              ›
            </span>
            {feat}
          </li>
        ))}
      </ul>

      {/* Tech stack pills */}
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <Tag key={tech} label={tech} variant="accent" />
        ))}
      </div>

      {/* Links row */}
      <div className="flex items-center gap-4 pt-1 border-t border-border-subtle">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${title} source code on GitHub`}
          className={[
            'flex items-center gap-1.5 text-xs font-medium text-text-muted',
            'hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent',
            'transition-colors duration-200 rounded',
          ].join(' ')}
        >
          <Github size={15} aria-hidden="true" />
          GitHub
        </a>

        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${title} live demo`}
            className={[
              'flex items-center gap-1.5 text-xs font-medium text-text-muted',
              'hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent',
              'transition-colors duration-200 rounded',
            ].join(' ')}
          >
            <ExternalLink size={15} aria-hidden="true" />
            Live Demo
          </a>
        )}
      </div>
    </motion.article>
  )
}

/**
 * Projects section.
 * - Responsive card grid: 1 col mobile → 2 col md → 3 col xl.
 * - Staggered scroll-reveal entrance (100ms between cards).
 */
export function Projects({ projects }: ProjectsProps) {
  return (
    <SectionWrapper id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Projects" />

        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={cardContainerVariants}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
