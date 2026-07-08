// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string // e.g. "#projects"
}

export interface NavbarProps {
  items: NavItem[]
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export interface HeroProps {
  name: string
  title: string // e.g. "Network & Security Engineer"
  tagline: string // One-line value proposition
  cvUrl: string // Path to downloadable CV asset
  projectsHref: string // "#projects"
  contactHref: string // "#contact"
  photoUrl?: string // Path to profile photo, e.g. "/assets/images/profile.jpg"
}

// ─── About ───────────────────────────────────────────────────────────────────

export interface Interest {
  icon: string // lucide-react icon name
  label: string
}

export interface SpokenLanguage {
  name: string       // e.g. "Arabic"
  level: string      // e.g. "Native" | "B1 (Intermediate)"
  dots: number       // filled dots out of 5 for visual indicator
}

export interface AboutProps {
  bio: string[]
  interests: Interest[]
  spokenLanguages?: SpokenLanguage[]
  imageAlt?: string
}

// ─── Skills ──────────────────────────────────────────────────────────────────

export interface SkillCategory {
  category: string // e.g. "Frontend"
  icon: string // lucide-react icon name
  skills: string[] // e.g. ["React", "TypeScript"]
}

export interface SkillsProps {
  categories: SkillCategory[]
}

// ─── Projects ────────────────────────────────────────────────────────────────

export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  features: string[]
  githubUrl: string // Placeholder: "https://github.com/[USERNAME]/[REPO]"
  liveUrl?: string // Optional live demo URL
  highlight?: string // Optional badge: "Graduation Project", "Featured", etc.
}

export interface ProjectsProps {
  projects: Project[]
}

export interface ProjectCardProps {
  project: Project
  index: number // For staggered animation delay
}

// ─── Experience ──────────────────────────────────────────────────────────────

export interface ExperienceItem {
  role: string
  company: string
  period: string // e.g. "[START_DATE] – [END_DATE]"
  description: string[] // Bullet points
  skills: string[]
}

export interface ExperienceProps {
  items: ExperienceItem[]
}

// ─── Certificates & Education ────────────────────────────────────────────────

export interface Certificate {
  name: string // "[CERTIFICATE_NAME]"
  issuer: string // "[ISSUER]"
  date: string // "[DATE]"
  credentialUrl?: string // "[CREDENTIAL_URL]" — optional
  selfStudy?: boolean // true = not an official issued credential — renders with muted styling
}

export interface EducationItem {
  degree: string
  institution: string
  period: string
  coursework: string[]
}

export interface CertificatesProps {
  certificates: Certificate[]
  education: EducationItem[]
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface SocialLink {
  platform: string // "GitHub" | "LinkedIn" | "Email"
  url: string // placeholder or real URL
  icon: string // lucide-react icon name
}

export interface ContactProps {
  formAction: string // "[FORM_ACTION_PLACEHOLDER]"
  socialLinks: SocialLink[]
}

// ─── Footer ──────────────────────────────────────────────────────────────────

export interface FooterProps {
  name: string // "[YOUR_NAME]"
  year: number // computed: new Date().getFullYear()
}

// ─── Animation variants (Framer Motion) ──────────────────────────────────────

export interface AnimationVariants {
  hidden: Record<string, unknown>
  visible: Record<string, unknown>
}
