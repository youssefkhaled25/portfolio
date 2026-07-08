import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionWrapper } from '../layout/SectionWrapper'
import { SectionHeader } from '../ui/SectionHeader'
import { GlowButton } from '../ui/GlowButton'
import { staggerContainerVariants, staggerItemVariants } from '../../lib/animations'
import type { ContactProps } from '../../types/portfolio.types'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const ICON_MAP: Record<string, LucideIcon> = {
  Github,
  Linkedin,
  Mail,
}

function SocialIcon({ name }: { name: string }) {
  const Icon = ICON_MAP[name] ?? Mail
  return <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
}

interface FieldError {
  name?: string
  email?: string
  message?: string
}

function validate(name: string, email: string, message: string): FieldError {
  const errors: FieldError = {}
  if (!name.trim()) errors.name = 'Name is required.'
  if (!email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!message.trim()) errors.message = 'Message is required.'
  return errors
}

/**
 * Contact section.
 * - Controlled form with client-side validation (name, email, message).
 * - Posts to formAction URL on submit; disables button while in-flight.
 * - Success: confirmation message + field reset.
 * - Error/timeout: inline error with retry.
 * - role="status" live region for assistive technologies.
 * - Social links with aria-labels.
 * - Two-column at md+, stacked on mobile.
 */
export function Contact({ formAction, socialLinks }: ContactProps) {
  const [nameVal, setNameVal] = useState('')
  const [emailVal, setEmailVal] = useState('')
  const [messageVal, setMessageVal] = useState('')
  const [touched, setTouched] = useState({ name: false, email: false, message: false })
  const [status, setStatus] = useState<FormStatus>('idle')
  const statusRef = useRef<HTMLDivElement>(null)

  const errors = validate(nameVal, emailVal, messageVal)
  const hasErrors = Object.keys(errors).length > 0

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    if (hasErrors) return

    setStatus('sending')

    try {
      const res = await fetch(formAction, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: nameVal, email: emailVal, message: messageVal }),
      })

      if (res.ok) {
        setStatus('success')
        setNameVal('')
        setEmailVal('')
        setMessageVal('')
        setTouched({ name: false, email: false, message: false })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass = (error?: string, isTouched?: boolean) =>
    [
      'w-full px-4 py-3 rounded-lg text-sm',
      'bg-bg-elevated border transition-colors duration-200',
      'text-text-primary placeholder:text-text-muted/50',
      'focus:outline-none focus:border-accent',
      'focus-visible:ring-1 focus-visible:ring-accent',
      error && isTouched ? 'border-red-500/60' : 'border-border-subtle hover:border-text-muted/30',
    ].join(' ')

  return (
    <SectionWrapper id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Contact" />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Contact form ── */}
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainerVariants}
            className="space-y-5"
          >
            {/* Name */}
            <motion.div variants={staggerItemVariants} className="space-y-1">
              <label htmlFor="contact-name" className="text-xs font-medium text-text-muted uppercase tracking-wider">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                value={nameVal}
                onChange={(e) => setNameVal(e.target.value)}
                onBlur={() => handleBlur('name')}
                aria-required="true"
                aria-invalid={touched.name && !!errors.name}
                aria-describedby={touched.name && errors.name ? 'error-name' : undefined}
                className={inputClass(errors.name, touched.name)}
              />
              {touched.name && errors.name && (
                <p id="error-name" role="alert" className="text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle size={11} aria-hidden="true" />
                  {errors.name}
                </p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div variants={staggerItemVariants} className="space-y-1">
              <label htmlFor="contact-email" className="text-xs font-medium text-text-muted uppercase tracking-wider">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={emailVal}
                onChange={(e) => setEmailVal(e.target.value)}
                onBlur={() => handleBlur('email')}
                aria-required="true"
                aria-invalid={touched.email && !!errors.email}
                aria-describedby={touched.email && errors.email ? 'error-email' : undefined}
                className={inputClass(errors.email, touched.email)}
              />
              {touched.email && errors.email && (
                <p id="error-email" role="alert" className="text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle size={11} aria-hidden="true" />
                  {errors.email}
                </p>
              )}
            </motion.div>

            {/* Message */}
            <motion.div variants={staggerItemVariants} className="space-y-1">
              <label htmlFor="contact-message" className="text-xs font-medium text-text-muted uppercase tracking-wider">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder="What's on your mind?"
                value={messageVal}
                onChange={(e) => setMessageVal(e.target.value)}
                onBlur={() => handleBlur('message')}
                aria-required="true"
                aria-invalid={touched.message && !!errors.message}
                aria-describedby={touched.message && errors.message ? 'error-message' : undefined}
                className={`${inputClass(errors.message, touched.message)} resize-none`}
              />
              {touched.message && errors.message && (
                <p id="error-message" role="alert" className="text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle size={11} aria-hidden="true" />
                  {errors.message}
                </p>
              )}
            </motion.div>

            {/* Submit */}
            <motion.div variants={staggerItemVariants}>
              <GlowButton
                type="submit"
                variant="primary"
                disabled={status === 'sending'}
                className="w-full justify-center"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={16} aria-hidden="true" />
                    Send Message
                  </>
                )}
              </GlowButton>
            </motion.div>

            {/* Live region for submission feedback */}
            <div
              ref={statusRef}
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="min-h-[1.5rem]"
            >
              {status === 'success' && (
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <CheckCircle size={16} aria-hidden="true" />
                  Message sent! I'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-sm text-red-400">
                  <AlertCircle size={16} aria-hidden="true" />
                  Couldn't send the message. Please try again.
                </div>
              )}
            </div>
          </motion.form>

          {/* ── Social links + info ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainerVariants}
            className="space-y-8"
          >
            <motion.div variants={staggerItemVariants} className="space-y-2">
              <h3 className="font-grotesk text-xl font-semibold text-text-primary">
                Let's connect
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Whether it's a job opportunity, a project collaboration, or just a conversation —
                feel free to reach out.
              </p>
            </motion.div>

            <motion.div variants={staggerItemVariants} className="space-y-4">
              {socialLinks.map(({ platform, url, icon }) => (
                <a
                  key={platform}
                  href={url}
                  target={url.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={`Connect on ${platform}`}
                  className={[
                    'flex items-center gap-4 p-4 rounded-xl',
                    'bg-bg-surface border border-border-subtle',
                    'hover:border-accent hover:shadow-glow-sm',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent',
                    'transition-all duration-200 group',
                  ].join(' ')}
                >
                  <div className="text-accent group-hover:scale-110 transition-transform duration-200">
                    <SocialIcon name={icon} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{platform}</p>
                    <p className="text-xs text-text-muted truncate max-w-[220px]">
                      {url.replace('mailto:', '')}
                    </p>
                  </div>
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
