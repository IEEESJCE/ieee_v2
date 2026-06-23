import { useEffect, useLayoutEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ColourfulText from '../components/ui/colourful-text'

import EventsSection from '../components/EventsSection'
import MilestoneEventsSection from '../components/MilestoneEventsSection'
import AchievementsSection from '../components/AchievementsSection'
import BangaloreSection from '../components/BangaloreSection'
import FlagshipSection from '../components/FlagshipSection'
import PrayasSection from '../components/PrayasSection'
import MentorsSection from '../components/MentorsSection'
import Footer from '../components/Footer'

import '../styles/homepage.css'

gsap.registerPlugin(ScrollTrigger)

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
      gsap.fromTo(ctaEls,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out', delay: 1.8 }
      )
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
        document.querySelector('.nb-bangalore-wrapper'),
        document.querySelector('.nb-flagship-wrapper'),
        document.querySelector('.nb-prayas-wrapper'),
        document.querySelector('.nb-mentors-wrapper'),
      ].filter(Boolean)

      allPanels.forEach((panel, i) => {
        // Skip the last section (mentors — scrolls normally into footer)
        if (i === allPanels.length - 1) return

        const isLanding = panel.classList.contains('nb-section-landing')
        const innerPanel = isLanding ? panel.querySelector('.nb-section-inner') : null

        // Calculate if we need a fake scroll for landing page ONLY on desktop
        let fakeScrollRatio = 0
        if (isLanding && innerPanel && isDesktop) {
          const difference = innerPanel.offsetHeight - window.innerHeight
          fakeScrollRatio = difference > 0 ? (difference / (difference + window.innerHeight)) : 0
        }

        if (isLanding && innerPanel) {
          panel.style.marginBottom = fakeScrollRatio ? (innerPanel.offsetHeight * fakeScrollRatio + 'px') : '0px'
        }

        // On mobile, pin and animate ONLY when the bottom of the section reaches the bottom of the viewport.
        // This ensures the user can scroll natively through the entire tall section before it scales away.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: isDesktop && !isLanding ? 'top top' : 'bottom bottom',
            end: () => fakeScrollRatio ? `+=${innerPanel.offsetHeight}` : (isDesktop ? '+=600' : '+=400'),
            pinSpacing: false,
            pin: true,
            scrub: true,
          }
        })

        if (fakeScrollRatio) {
          tl.to(innerPanel, {
            yPercent: -100,
            y: window.innerHeight,
            duration: 1 / (1 - fakeScrollRatio) - 1,
            ease: 'none',
          })
        }

        tl.fromTo(panel,
          { scale: 1, opacity: 1, y: 0 },
          { scale: isLanding ? 1 : 0.82, opacity: 0, y: isLanding ? 0 : (isDesktop ? -40 : -60), duration: 1, ease: 'power2.in' }
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
              <div className="nb-bg-image" />

              <div ref={floatingRef} className="nb-floating-shapes">
                {/* Right side */}
                <div className="nb-shape nb-shape-1" />
                <div className="nb-shape nb-shape-2" />
                <div className="nb-shape nb-shape-3" />
                <div className="nb-shape nb-shape-5" />
                {/* Left side */}
                <div className="nb-shape nb-shape-6" />
                <div className="nb-shape nb-shape-7" />
                <div className="nb-shape nb-shape-8" />
                <div className="nb-shape nb-shape-9" />
              </div>

              <div className="nb-hero-wrapper">
                <div ref={heroRef} className="nb-hero-content nb-hero-centered">
                  <span className="gsap-hero nb-hero-label">⚡ IEEE Student Branch — SJCE Mysuru</span>
                  <h1 className="gsap-hero nb-hero-title">IEEE SJCE</h1>
                  <h2 className="gsap-hero nb-hero-tagline-big">
                    <span className="tagline-row">
                      <ColourfulText text="INNOVATE" color="var(--accent)" />
                      <span className="tagline-dot"> · </span>
                      <ColourfulText text="INSPIRE" color="var(--teal)" />
                    </span>
                    <span className="tagline-row">
                      <span className="tagline-dot tagline-dot-mobile"> · </span>
                      <ColourfulText text="ENGINEER" color="var(--blue-light)" />
                    </span>
                  </h2>
                  <div className="gsap-hero nb-hero-divider" />
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

              {/* CTA bar — centered */}
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
