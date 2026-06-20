import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import EventsSection from '../components/EventsSection'
import MilestoneEventsSection from '../components/MilestoneEventsSection'
import AchievementsSection from '../components/AchievementsSection'
import BangaloreSection from '../components/BangaloreSection'
import FlagshipSection from '../components/FlagshipSection'
import PrayasSection from '../components/PrayasSection'
import MentorsSection from '../components/MentorsSection'
import Footer from '../components/Footer'
import '../styles/homepage.css'

/* ─────────────────────────────────────────────
   Marquee Strip (truly infinite — 4x repeat)
   ───────────────────────────────────────────── */
function MarqueeStrip() {
  const items = ['INNOVATE', '◆', 'ENGINEER', '◆', 'INSPIRE', '◆', 'BUILD', '◆', 'IEEE SJCE', '◆']
  const repeated = [...items, ...items, ...items, ...items]
  return (
    <div className="nb-marquee-wrapper">
      <div className="nb-marquee-track">
        {repeated.map((text, i) => (
          <span key={i} className={text === '◆' ? 'nb-marquee-dot' : 'nb-marquee-word'}>{text}</span>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Home Page
   ───────────────────────────────────────────── */
export default function HomePage() {
  const location = useLocation()
  const heroRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(() => {
        const el = document.querySelector(location.hash)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [location.hash])

  useEffect(() => {
    const heroEls = heroRef.current?.querySelectorAll('.gsap-hero')
    if (heroEls?.length) {
      gsap.fromTo(
        heroEls,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
      )
    }

    return () => {}
  }, [])

  return (
    <div ref={containerRef} className="nb-panels-container">
      {/* ════════ Landing Hero ════════ */}
      <section className="nb-hero-section">
        <div className="nb-hero-glow" aria-hidden="true" />
        <div className="nb-hero-inner">
          <div ref={heroRef} className="nb-hero-content">
            <span className="gsap-hero nb-hero-eyebrow">IEEE Student Branch · SJCE Mysuru</span>
            <h1 className="gsap-hero nb-hero-title">IEEE SJCE</h1>
            <p className="gsap-hero nb-hero-tagline">
              <span className="nb-tag-accent">Innovate</span>
              <span className="nb-tag-sep">·</span>
              <span>Inspire</span>
              <span className="nb-tag-sep">·</span>
              <span>Engineer</span>
            </p>
            <p className="gsap-hero nb-hero-desc">Advancing technology for humanity — building tomorrow&apos;s engineers, today.</p>
            <div className="gsap-hero nb-hero-actions">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScyUvp_2L7Mw3ENLSANaXTQiZmqJJFhxETfKFOXWl9o8wn3Uw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="nb-btn nb-btn-accent"
              >
                Get Started <ArrowRight size={14} />
              </a>
              <button
                type="button"
                className="nb-btn nb-btn-ghost"
                onClick={() => document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Events
              </button>
            </div>
          </div>
        </div>
        <MarqueeStrip />
      </section>

      {/* ════════ PANEL 2: Events ════════ */}
      <div className="nb-events-wrapper">
        <EventsSection />
      </div>

      {/* ════════ PANEL 3: Milestone Events ════════ */}
      <div className="nb-milestones-wrapper">
        <MilestoneEventsSection />
      </div>

      {/* ════════ PANEL 4: Achievements ════════ */}
      <div className="nb-achievements-wrapper">
        <AchievementsSection />
      </div>

      {/* ════════ PANEL 5: Bangalore Section ════════ */}
      <div className="nb-bangalore-wrapper">
        <BangaloreSection />
      </div>

      {/* ════════ PANEL 6: Flagship Programs ════════ */}
      <div className="nb-flagship-wrapper">
        <FlagshipSection />
      </div>

      {/* ════════ PANEL 7: Prayas ════════ */}
      <div className="nb-prayas-wrapper">
        <PrayasSection />
      </div>

      {/* ════════ PANEL 8: Mentors ════════ */}
      <div className="nb-mentors-wrapper">
        <MentorsSection />
      </div>

      {/* ════════ PANEL 9: Footer ════════ */}
      <Footer />
    </div>
  )
}
