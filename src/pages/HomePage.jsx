import { useEffect, useLayoutEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ColourfulText from '../components/ui/colourful-text'

import MagazineSection from '../components/magazine/MagazineSection'
import MilestoneEventsSection from '../components/MilestoneEventsSection'
import AchievementsSection from '../components/AchievementsSection'
import StandForSection from '../components/StandForSection'
import BangaloreSection from '../components/BangaloreSection'
import FlagshipSection from '../components/FlagshipSection'
import PrayasSection from '../components/PrayasSection'
import MentorsSection from '../components/MentorsSection'
import SponsorSection from '../components/SponsorSection'
import Footer from '../components/Footer'

import '../styles/homepage.css'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })

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
  const navigate = useNavigate()
  const location = useLocation()
  
  const heroRef = useRef(null)
  const ctaRef = useRef(null)
  const floatingRef = useRef(null)
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

  useLayoutEffect(() => {
    // 1. Initial hero animations
    const heroEls = heroRef.current?.querySelectorAll('.gsap-hero')
    if (heroEls?.length) {
      gsap.fromTo(heroEls,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.5 }
      )
    }

    const ctaEls = ctaRef.current?.querySelectorAll('.gsap-cta')
    if (ctaEls?.length) {
      if (window.innerWidth >= 768) {
        gsap.fromTo(ctaEls,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out', delay: 1.8 }
        )
      } else {
        gsap.set(ctaEls, { y: 0, opacity: 1 })
      }
    }

    if (floatingRef.current) {
      gsap.fromTo(floatingRef.current.children,
        { scale: 0, opacity: 0, rotation: -20 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)', delay: 1.2 }
      )
    }

    // 2. PINNED PANEL SYSTEM — same pin + scale-shrink for EVERY section
    let mm = gsap.matchMedia()

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      let { isDesktop } = context.conditions;

      const allPanels = [
        document.querySelector('.nb-section-landing'),
        document.querySelector('.nb-events-wrapper'),
        document.querySelector('.nb-milestones-wrapper'),
        document.querySelector('.nb-achievements-wrapper'),
        document.querySelector('.nb-standfor-wrapper'),
        document.querySelector('.nb-bangalore-wrapper'),
        document.querySelector('.nb-flagship-wrapper'),
        document.querySelector('.nb-prayas-wrapper'),
        document.querySelector('.nb-mentors-wrapper'),
        document.querySelector('.nb-sponsors-wrapper'),
      ].filter(Boolean)

      allPanels.forEach((panel, i) => {
        // Mentors and sponsors scroll normally into the footer (no pin/shrink).
        if (i >= allPanels.length - 2) return

        const isLanding = panel.classList.contains('nb-section-landing')
        const innerPanel = isLanding ? panel.querySelector('.nb-section-inner') : panel.firstElementChild
        const fadeDistance = isDesktop ? 600 : 450

        // Calculate if we need a fake scroll for landing page ONLY on desktop
        let fakeScrollRatio = 0
        if (isLanding && innerPanel && isDesktop) {
          const difference = innerPanel.offsetHeight - window.innerHeight
          fakeScrollRatio = difference > 0 ? (difference / (difference + window.innerHeight)) : 0
        }

        if (isLanding && innerPanel) {
          panel.style.marginBottom = fakeScrollRatio ? (innerPanel.offsetHeight * fakeScrollRatio + 'px') : '0px'
        }

        // Sections taller than the viewport (e.g. Hall of Fame on mobile) need
        // their remaining content revealed before the panel fades away.
        const overflow = (!isLanding && innerPanel)
          ? Math.max(0, panel.offsetHeight - window.innerHeight)
          : 0

        // Section-to-section slide deck animation on BOTH laptop & mobile!
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: 'top top',
            end: () => fakeScrollRatio ? `+=${innerPanel.offsetHeight}` : `+=${overflow + fadeDistance}`,
            pin: true,
            pinSpacing: false,
            scrub: isDesktop ? true : 0.6,
          }
        })

        if (fakeScrollRatio && isDesktop) {
          tl.to(innerPanel, {
            yPercent: -100,
            y: window.innerHeight,
            duration: 1 / (1 - fakeScrollRatio) - 1,
            ease: 'none',
          })
        }

        if (overflow > 0) {
          tl.to(innerPanel, {
            y: -overflow,
            duration: overflow,
            ease: 'none',
          })
        }

        tl.fromTo(panel,
          { scale: 1, opacity: 1, y: 0 },
          { scale: isLanding ? 1 : 0.85, opacity: 0, y: isDesktop ? -40 : -20, duration: isLanding ? 1 : fadeDistance, ease: 'power2.in' }
        )
      })

      ScrollTrigger.refresh()
    })

    return () => {
      mm.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="nb-panels-container">
      {/* ════════ PANEL 1: Landing ════════ */}
      <section className="nb-section nb-section-landing">
        <div className="nb-section-inner">
          <div className="nb-landing">
            <div className="nb-bg">
              {/* Circuit background image */}
              <div className="nb-bg-image" />

              {/* Floating neo-brutal geometric shapes */}
              <div ref={floatingRef} className="nb-floating-shapes">
                {/* Left side shapes */}
                <div className="nb-shape nb-shape-1" />
                <div className="nb-shape nb-shape-2" />
                <div className="nb-shape nb-shape-3" />
                <div className="nb-shape nb-shape-4" />

                {/* Right side shapes */}
                <div className="nb-shape nb-shape-5" />
                <div className="nb-shape nb-shape-6" />
                <div className="nb-shape nb-shape-7" />
              </div>

              <div className="nb-hero-wrapper">
                <div ref={heroRef} className="nb-hero-content nb-hero-centered">
                  <h1 className="gsap-hero nb-hero-title">IEEE SJCE</h1>
                  <h2 className="gsap-hero nb-hero-tagline-big">
                    <span className="tagline-row">
                      <span className="tagline-cyan">INNOVATE</span>
                      <span className="tagline-dot"> · </span>
                      <span className="tagline-cyan">INSPIRE</span>
                      <span className="tagline-dot"> · </span>
                      <span className="tagline-cyan">ENGINEER</span>
                    </span>
                  </h2>
                  <p className="gsap-hero nb-hero-subtitle">Advancing Technology for Humanity</p>
                  <p className="gsap-hero nb-hero-tagline">Building tomorrow's engineers, today.</p>
                  <div className="gsap-hero nb-hero-buttons">
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLScyUvp_2L7Mw3ENLSANaXTQiZmqJJFhxETfKFOXWl9o8wn3Uw/viewform" target='_blank' rel="noopener noreferrer">
                      <button className="nb-btn nb-btn-accent">
                        GET STARTED <ArrowRight size={14} />
                      </button>
                    </a>
                    <button className="nb-btn nb-btn-blue"
                      onClick={() => document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' })}>
                      EXPLORE EVENTS
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom CTA Box matching screenshot */}
              <div ref={ctaRef} className="nb-cta-bar">
                <h3 className="gsap-cta">EXPLORE THE FUTURE OF TECHNOLOGY</h3>
                <button className="gsap-cta nb-btn nb-btn-outline" onClick={() => navigate('/societies')}>
                  LEARN MORE <ArrowRight size={14} />
                </button>
              </div>

              <MarqueeStrip />
            </div>
          </div>
        </div>
      </section>

      {/* ════════ PANEL 2: The IEEE Chronicle ════════ */}
      {/* The previous Events Timeline remains in components/EventsSection.jsx
          until the magazine experience has been fully verified. */}
      <div className="nb-events-wrapper">
        <MagazineSection />
      </div>

      {/* ════════ PANEL 3: Milestone Events ════════ */}
      <div className="nb-milestones-wrapper">
        <MilestoneEventsSection />
      </div>

      {/* ════════ PANEL 4: Achievements ════════ */}
      <div className="nb-achievements-wrapper">
        <AchievementsSection />
      </div>

      {/* ════════ PANEL 5: What We Stand For ════════ */}
      <div className="nb-standfor-wrapper">
        <StandForSection />
      </div>

      {/* ════════ PANEL 6: Bangalore Section ════════ */}
      <div className="nb-bangalore-wrapper">
        <BangaloreSection />
      </div>

      {/* ════════ PANEL 7: Flagship Programs ════════ */}
      <div className="nb-flagship-wrapper">
        <FlagshipSection />
      </div>

      {/* ════════ PANEL 8: Prayas ════════ */}
      <div className="nb-prayas-wrapper">
        <PrayasSection />
      </div>

      {/* ════════ PANEL 9: Mentors ════════ */}
      <div className="nb-mentors-wrapper">
        <MentorsSection />
      </div>

      {/* ════════ PANEL 10: Sponsors ════════ */}
      <div className="nb-sponsors-wrapper">
        <SponsorSection />
      </div>

      {/* ════════ PANEL 11: Footer ════════ */}
      <Footer />
    </div>
  )
}
