import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'outline'

interface BaseProps {
  variant?: ButtonVariant
  className?: string
  children: React.ReactNode
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button'
    href?: never
    download?: never
  }

type AnchorProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a'
    href: string
    download?: string | boolean
  }

type GlowButtonProps = ButtonProps | AnchorProps

/**
 * CTA button with cyan glow hover effect.
 * Supports disabled state with a distinct visual style.
 * Fully keyboard-navigable with visible focus ring.
 *
 * Usage:
 *   <GlowButton variant="primary" onClick={...}>View Projects</GlowButton>
 *   <GlowButton as="a" href="/cv.pdf" download variant="outline">Download CV</GlowButton>
 */
export function GlowButton(props: GlowButtonProps) {
  const { variant = 'primary', className = '', children } = props

  const base = [
    'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm',
    'transition-all duration-200 cursor-pointer',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:pointer-events-none',
  ].join(' ')

  const variants: Record<ButtonVariant, string> = {
    primary: [
      'bg-accent text-bg-primary border border-accent',
      'hover:shadow-glow hover:brightness-110',
      'active:brightness-90',
    ].join(' '),
    outline: [
      'bg-transparent text-accent border border-accent',
      'hover:bg-accent/10 hover:shadow-glow',
      'active:bg-accent/20',
    ].join(' '),
  }

  const combinedClass = `${base} ${variants[variant]} ${className}`

  if (props.as === 'a') {
    const { as: _as, variant: _v, className: _c, ...rest } = props
    return (
      <a {...rest} className={combinedClass}>
        {children}
      </a>
    )
  }

  const { as: _as, variant: _v, className: _c, href: _h, download: _d, ...rest } = props as ButtonProps & {
    href?: never
    download?: never
  }

  return (
    <button {...rest} className={combinedClass}>
      {children}
    </button>
  )
}
