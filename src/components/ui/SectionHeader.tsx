interface SectionHeaderProps {
  title: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}

/**
 * Reusable section title with accent underline decoration.
 * Renders as <h2> by default. Uses Space Grotesk font at weight 600-700.
 */
export function SectionHeader({ title, as: Tag = 'h2', className = '' }: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Tag className="font-grotesk text-3xl md:text-4xl font-bold text-text-primary">
        {title}
      </Tag>
      <div className="w-16 h-1 bg-accent rounded-full" />
    </div>
  )
}
