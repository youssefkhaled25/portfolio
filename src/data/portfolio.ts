/**
 * portfolio.ts — Single source of truth for all portfolio content.
 *
 * All fields marked with [BRACKETS] are placeholders.
 * Replace them with your real data before deploying.
 */

import type {
  HeroProps,
  AboutProps,
  SkillCategory,
  Project,
  ExperienceItem,
  Certificate,
  EducationItem,
  ContactProps,
  NavItem,
  SpokenLanguage,
} from '../types/portfolio.types'

// ─── Navigation ──────────────────────────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
]

// ─── Hero ────────────────────────────────────────────────────────────────────

export const HERO_DATA: HeroProps = {
  name: 'Youssef Khaled Rizk',
  title: 'Network Engineer | Cloud Engineer',
  tagline: 'Designing secure, scalable network and cloud infrastructure — with hands-on experience across Cisco, Huawei, and AWS.',
  cvUrl: '/assets/cv/Youssef-Rizk-CV.pdf', // [REPLACE: drop your CV PDF here]
  projectsHref: '#projects',
  contactHref: '#contact',
  photoUrl: '/assets/images/profile.jpg', // [REPLACE: drop your photo at public/assets/images/profile.jpg]
}

// ─── About ───────────────────────────────────────────────────────────────────

export const ABOUT_DATA: AboutProps = {
  bio: [
    'Computer Science graduate from Menoufia University with hands-on experience in enterprise networking and cloud infrastructure. Currently focused on AWS, cloud computing and DevOps — with practical experience on Cisco and Huawei platforms. I\'m looking to grow within a professional IT environment.',
  ],
  interests: [
    { icon: 'ShieldCheck', label: 'Network Security' },
    { icon: 'Cloud',       label: 'Cloud Infrastructure (AWS)' },
    { icon: 'Globe',       label: 'Web Application Developer' },
  ],
  spokenLanguages: [
    { name: 'Arabic',  level: 'Native',                          dots: 5 },
    { name: 'English', level: 'B1 — Intermediate',               dots: 3 },
    { name: 'German',  level: 'B1–B2 — Upper-Intermediate',      dots: 3 },
  ] satisfies SpokenLanguage[],
}

// ─── Skills ──────────────────────────────────────────────────────────────────

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: 'Frontend',
    icon: 'Layout',
    skills: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    icon: 'Server',
    skills: ['Node.js', 'Express', 'MongoDB', 'JWT Auth', 'REST API', 'FastAPI', 'Flask'],
  },
  {
    category: 'Languages',
    icon: 'Code2',
    skills: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C++', 'PHP', 'YAML'],
  },
  {
    category: 'Tools & Infra',
    icon: 'Wrench',
    skills: ['Git / GitHub', 'Docker', 'ESLint / Prettier', 'Apache Tomcat', 'Apache', 'Redis', 'Virtualization'],
  },
  {
    category: 'Cloud & AWS',
    icon: 'Cloud',
    skills: ['AWS Cloud Foundations', 'AWS Cloud Architecture', 'MySQL', 'MongoDB'],
  },
  {
    category: 'Networking & Security',
    icon: 'Network',
    skills: ['Linux', 'CCNA', 'HCIA', 'Network Security Fundamentals'],
  },
]

// ─── Projects ────────────────────────────────────────────────────────────────

export const PROJECTS_DATA: Project[] = [
  {
    id: 'smart-it-lab',
    title: 'Smart IT Lab',
    description:
      'Web-based Cisco networking education platform built as a graduation project. Students learn IOS CLI commands through interactive browser-based labs, with the full stack containerized and deployed on AWS via Terraform.',
    techStack: ['React 18', 'TypeScript', 'Vite', 'Node.js 20', 'Express 4', 'MongoDB', 'JWT', 'SSE', 'Docker', 'Terraform', 'AWS'],
    features: [
      'Cisco IOS CLI simulator with a 5-mode state machine',
      'Hands-on lab exercises with automated validation',
      'Achievement system, streak tracking, and real-time leaderboard via Server-Sent Events (SSE)',
      'Modular backend architecture — auth, labs, achievements, leaderboard, and admin modules',
      'JWT migrated to in-memory tokens with httpOnly cookie refresh for security hardening',
      '550+ passing automated tests',
      'Containerized with Docker and provisioned on AWS using Terraform for infrastructure-as-code deployment',
    ],
    githubUrl: 'https://github.com/youssefkhaled25/smart-it-lab',
    highlight: 'Graduation Project',
  },
  {
    id: 'enterprise-network-security',
    title: 'Enterprise Network Security Infrastructure (Multi-Site VPN & Firewall)',
    description:
      'Designed a multi-site enterprise network security infrastructure in Huawei eNSP — dual-firewall HA, three VPN technologies, zone-based policy, NAT, DMZ, and integrated wireless access, simulating a real-world secure corporate network.',
    techStack: [
      'Huawei VRP',
      'eNSP Simulator',
      'Firewall (USG)',
      'HRP',
      'GRE',
      'IPSec VPN',
      'L2TP',
      'NAT',
      'WLAN / AC-AP',
      'Security Zones',
    ],
    features: [
      'Connected two sites via three VPN types: GRE (site-to-site), IPSec (encrypted tunnel), and L2TP (remote access)',
      'Deployed Master/Backup firewalls with HRP for automatic failover',
      'Designed zone-based security policy (Trust/DMZ/Untrust) with source and server NAT',
      'Integrated a full WLAN deployment and verified end-to-end connectivity using a security client',
    ],
    githubUrl: 'https://github.com/youssefkhaled25/Huawei-Network-Security-Final-Project',
    highlight: 'HCIA-Security Capstone',
  },
]

// ─── Experience ──────────────────────────────────────────────────────────────

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: 'Freelance German Audio Transcription Reviewer',
    company: 'Utrans & Hitech (海天瑞声)',
    period: 'Dec 2026 – Present',
    description: [
      'Reviewed and corrected German audio transcriptions against a detailed linguistic ruleset covering formatting, punctuation, speaker/noise tagging, and capitalization rules',
      'Consistently delivered submissions accepted without revision requests',
      'Maintained high accuracy and turnaround in a fully remote, async-first environment',
    ],
    skills: ['Attention to Detail', 'Linguistic Precision', 'Remote Work', 'Quality Assurance'],
  },
]

// ─── Certificates ────────────────────────────────────────────────────────────

export const CERTIFICATES_DATA: Certificate[] = [
  {
    name: 'AWS Academy Graduate — Cloud Architecting',
    issuer: 'AWS Academy',
    date: '2025',
  },
  {
    name: 'AWS Academy Graduate — Cloud Foundations',
    issuer: 'AWS Academy',
    date: '2025',
  },
  {
    name: 'Computer Network Fundamentals',
    issuer: 'Mahara-Tech (ITI)',
    date: 'July 3, 2025',
    // Verification code: GpcekJ7sTM — add a direct verify URL here if the platform provides one
  },
  {
    name: 'Getting Started with Cisco Packet Tracer',
    issuer: 'Cisco Networking Academy',
    date: '',
  },
  {
    name: 'Networking Devices and Basic Configuration',
    issuer: 'Cisco Networking Academy',
    date: 'July 4, 2025',
  },
  {
    name: 'Networking Basics',
    issuer: 'Cisco Networking Academy',
    date: '',
  },
  {
    name: 'HCIA-Security V4.0 — Score: 100%',
    issuer: 'Huawei / NTI — Egyptian Talent Academy',
    date: 'June 30, 2025',
    // Program: May 25 – June 29, 2025 (80 hours)
  },
  {
    // Course-completion certificate — distinct from the exam/certification above
    name: 'HCIA-Security V4.0 Course — Course Certificate',
    issuer: 'Huawei Talent Online',
    date: 'June 30, 2025',
  },
  {
    name: 'Ubuntu Linux Essentials',
    issuer: 'Mahara-Tech (ITI)',
    date: 'July 5, 2025',
  },
  {
    name: 'Cloud Services Management and Operation — Score: 96%',
    issuer: 'NTI — Digital Egypt Youth Program',
    date: 'January 24, 2026 – April 4, 2026',
    // 90 technical hours + 30 soft skills hours
  },
  {
    name: 'CCNA Curriculum',
    issuer: 'Cisco Networking Academy (self-paced materials)',
    date: '',
    selfStudy: true, // Not an official Cisco certification — self-study only
  },
]

// ─── Education ───────────────────────────────────────────────────────────────

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'Bachelor of Computer Science and Information Technology (CS-Department)',
    institution: 'Menoufia University',
    period: 'Graduate: 2026',
    coursework: [
      'Computer Networks',
      'Network Security',
      'Cloud Computing',
      'Operating Systems',
    ],
  },
]

// ─── Contact ─────────────────────────────────────────────────────────────────

export const CONTACT_DATA: ContactProps = {
  formAction: '[FORM_ACTION_PLACEHOLDER]', // [REPLACE: e.g. https://formspree.io/f/xxxx]
  socialLinks: [
    { platform: 'GitHub', url: 'https://github.com/youssefkhaled25', icon: 'Github' },
    { platform: 'LinkedIn', url: '[LINKEDIN_URL]', icon: 'Linkedin' }, // [REPLACE]
    { platform: 'Email', url: 'mailto:youssefkhaled252004@gmail.com', icon: 'Mail' },
  ],
}
