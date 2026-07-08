interface TagProps {
  label: string
  variant?: 'default' | 'accent'
  className?: string
}

/**
 * Pill-shaped tag for tech stack labels and skill names.
 * Hover highlights the pill with the accent cyan color.
 */
export function Tag({ label, variant = 'default', className = '' }: TagProps) {
  const base =
    'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 cursor-default select-none'

  const variants = {
    default:
      'bg-bg-surface border-border-subtle text-text-muted hover:bg-accent hover:text-bg-primary hover:border-accent',
    accent:
      'bg-accent/10 border-accent/30 text-accent hover:bg-accent hover:text-bg-primary hover:border-accent',
  }

  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {label}
    </span>
  )
}
