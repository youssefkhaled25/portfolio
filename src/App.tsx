import { lazy, Suspense, useEffect } from 'react'
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'

import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ScrollToTop } from './components/ui/ScrollToTop'
// Hero is above-fold — load eagerly
import { Hero } from './components/sections/Hero'

// Below-fold sections — lazy loaded for code splitting (Req 14.1)
const About = lazy(() => import('./components/sections/About').then((m) => ({ default: m.About })))
const Skills = lazy(() => import('./components/sections/Skills').then((m) => ({ default: m.Skills })))
const Projects = lazy(() => import('./components/sections/Projects').then((m) => ({ default: m.Projects })))
const Experience = lazy(() => import('./components/sections/Experience').then((m) => ({ default: m.Experience })))
const Certificates = lazy(() => import('./components/sections/Certificates').then((m) => ({ default: m.Certificates })))
const Contact = lazy(() => import('./components/sections/Contact').then((m) => ({ default: m.Contact })))

import {
  NAV_ITEMS,
  HERO_DATA,
  ABOUT_DATA,
  SKILLS_DATA,
  PROJECTS_DATA,
  EXPERIENCE_DATA,
  CERTIFICATES_DATA,
  EDUCATION_DATA,
  CONTACT_DATA,
} from './data/portfolio'

/** Minimal inline loading fallback — avoids flash of empty space */
function SectionFallback() {
  return (
    <div className="py-28 flex items-center justify-center" aria-hidden="true">
      <div className="w-6 h-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  )
}

/**
 * Handles hash-based scroll-to-section when the URL changes.
 * e.g. navigating to /#projects scrolls to <section id="projects">
 */
function HashScrollHandler() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    // Small delay to let lazy sections mount before scrolling
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
    return () => clearTimeout(timer)
  }, [hash])

  return null
}

/**
 * The main portfolio page — all seven sections on one page.
 * Semantic landmarks: <header> (Navbar) · <main> · <footer>
 */
function PortfolioPage() {
  return (
    <>
      {/* header landmark — rendered inside Navbar component */}
      <Navbar items={NAV_ITEMS} cvUrl={HERO_DATA.cvUrl} />
      <ScrollToTop />
      <HashScrollHandler />

      {/* main landmark */}
      <main aria-label="Portfolio content">
        {/* Hero is eager — no Suspense needed */}
        <Hero {...HERO_DATA} />

        {/* Below-fold sections are lazy */}
        <Suspense fallback={<SectionFallback />}>
          <About {...ABOUT_DATA} />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Skills categories={SKILLS_DATA} />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Projects projects={PROJECTS_DATA} />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Experience items={EXPERIENCE_DATA} />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Certificates certificates={CERTIFICATES_DATA} education={EDUCATION_DATA} />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Contact formAction={CONTACT_DATA.formAction} socialLinks={CONTACT_DATA.socialLinks} />
        </Suspense>
      </main>

      {/* footer landmark */}
      <Footer name="Youssef Khaled Rizk" year={new Date().getFullYear()} />
    </>
  )
}

/**
 * App — HashRouter provides shareable /#section URLs without server config.
 *
 * Routes:
 *   /          → PortfolioPage (scrolled to top / #hero)
 *   /#about    → PortfolioPage (scrolled to #about via HashScrollHandler)
 *   /#skills   → PortfolioPage
 *   /#projects → PortfolioPage
 *   /#experience    → PortfolioPage
 *   /#certificates  → PortfolioPage
 *   /#contact  → PortfolioPage
 *   *          → redirect to / (which lands at #hero)
 */
export default function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <HashRouter>
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          {/* Redirect any unknown route back to root / #hero */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </div>
  )
}
