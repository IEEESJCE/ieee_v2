import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ColourfulText from '../components/ui/colourful-text'

import EventsSection from '../components/EventsSection'
import MilestoneEventsSection from '../components/MilestoneEventsSection'
import AchievementsSection from '../components/AchievementsSection'
import StandForSection from '../components/StandForSection'
import SocietiesSection from '../components/SocietiesSection'
import MentorsSection from '../components/MentorsSection'
import Footer from '../components/Footer'

import '../styles/homepage.css'
import '../styles/home-bulb.css'

// 3D bulb behind the hero — lazy-loaded so Three.js downloads separately and never delays first paint
const BulbScene = lazy(() => import('../components/BulbScene'))

// Bulb poses per section + section-position helpers (shared with the section effects)
import { getBulbStops, HOLDS, holdPx } from '../lib/bulbPoses'
// Section effects that react to the bulb (installed once the bulb is running)
import { installBulbEffects } from '../lib/bulb-effects'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })

/* ─────────────────────────────────────────────
   Marquee Strip (truly infinite — 4x repeat)
   ───────────────────────────────────────────── */
function MarqueeStrip() {
  const items = ['INNOVATE', '◆', 'ENGINEER', '◆', 'INSPIRE', '◆', 'BUILD', '◆', 'IEEE-SJCE', '◆']
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
  // true once the 3D bulb has started; only then does the hero become see-through
  const [hasBulb, setHasBulb] = useState(false)

  // Section effects that react to the bulb. Installed only once the bulb is running
  // (hasBulb), never under reduced motion, with lighter versions on phones.
  // gsap.matchMedia re-runs this when the screen crosses the mobile breakpoint and
  // undoes everything (its ScrollTriggers, inline styles) on cleanup.
  useEffect(() => {
    if (!hasBulb) return
    const mm = gsap.matchMedia()
    // NOTE: gsap.matchMedia only runs the callback when at least ONE condition matches,
    // so isDesktop + isMobile together guarantee it always runs.
    mm.add(
      {
        isDesktop: '(min-width: 768px)',
        isMobile: '(max-width: 767px)',
        reduce: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { isMobile, reduce } = context.conditions
        if (reduce) return
        return installBulbEffects({ isMobile })
      }
    )
    return () => mm.revert()
  }, [hasBulb])

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
        document.querySelector('.nb-societies-wrapper'),
        document.querySelector('.nb-mentors-wrapper'),
      ].filter(Boolean)

      allPanels.forEach((panel) => {
        // Mentors scrolls normally into the footer (no pin/shrink).
        if (panel.classList.contains('nb-mentors-wrapper')) return

        const isLanding = panel.classList.contains('nb-section-landing')
        const innerPanel = isLanding ? panel.querySelector('.nb-section-inner') : panel.firstElementChild

        // Fade gap: each section fades out COMPLETELY before the next one slides in.
        // The sections are see-through (only the bulb canvas behind), so if the next
        // section arrived while this one was still fading, their content would overlap.
        const fadeGap = Math.round(window.innerHeight * (isDesktop ? 0.4 : 0.35))

        // Landing (desktop): extra scroll to reveal a hero taller than the screen
        let fakeScroll = 0
        if (isLanding && innerPanel && isDesktop) {
          fakeScroll = Math.max(0, innerPanel.offsetHeight - window.innerHeight)
        }

        // Sections taller than the viewport (e.g. Hall of Fame on mobile) need
        // their remaining content revealed before the panel fades away.
        const overflow = (!isLanding && innerPanel)
          ? Math.max(0, panel.offsetHeight - window.innerHeight)
          : 0

        // Hold: some sections stay still for extra scrolling after reaching the top, so a
        // bulb effect can play (see HOLDS in src/lib/bulbPoses.js).
        const holdSelector = Object.keys(HOLDS).find((sel) => panel.matches(sel))
        const hold = holdSelector ? holdPx(holdSelector) : 0

        // Everything this section does while pinned, in px of scrolling:
        //   [fake scroll / hold] → [overflow] → [fade out over the gap]
        // A bottom margin of the same length delays the next section until it's done.
        const pinLength = fakeScroll + hold + overflow + fadeGap
        // The next section starts entering once this one's bottom edge (+ margin) passes the
        // bottom of the screen, i.e. after (height − screen height + margin) of scrolling.
        // Make that equal pinLength. (The hero is 71px shorter than the screen, so it needs
        // a little extra; a section taller than the screen already covers its overflow.)
        const margin = pinLength - (panel.offsetHeight - window.innerHeight)
        panel.style.marginBottom = `${Math.max(0, margin)}px`

        // Section-to-section slide deck animation on BOTH laptop & mobile!
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: 'top top',
            end: `+=${pinLength}`,
            pin: true,
            pinSpacing: false,
            scrub: isDesktop ? true : 0.6,
          }
        })

        // landing: move the tall hero up to reveal its bottom
        if (fakeScroll > 0) {
          tl.to(innerPanel, { y: -fakeScroll, duration: fakeScroll, ease: 'none' })
        }

        // the hold: an empty stretch (the panel stays still while a bulb effect plays)
        if (hold > 0) tl.to({}, { duration: hold })

        if (overflow > 0) {
          tl.to(innerPanel, {
            y: -overflow,
            duration: overflow,
            ease: 'none',
          })
        }

        // fade out completely during the gap (the next section hasn't started yet)
        tl.fromTo(panel,
          { scale: 1, opacity: 1, y: 0 },
          { scale: isLanding ? 1 : 0.85, opacity: 0, y: isDesktop ? -40 : -20, duration: fadeGap, ease: 'power2.in' }
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
    <>
    {/* Fixed WebGL bulb behind the hero (rises in, then switches on) */}
    <Suspense fallback={null}>
      <BulbScene
        layout="hero"
        riseIn
        autoRotate
        getStops={getBulbStops}
        onReady={() => setHasBulb(true)}
      />
    </Suspense>

    <div ref={containerRef} className={`nb-panels-container${hasBulb ? ' has-bulb' : ''}`}>
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
                  <h1 className="gsap-hero nb-hero-title">IEEE-SJCE</h1>
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
                    <button className="nb-btn nb-btn-accent" onClick={() => navigate('/membership')}>
                      JOIN US <ArrowRight size={14} />
                    </button>
                    <button className="nb-btn nb-btn-blue"
                      onClick={() => document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' })}>
                      EXPLORE EVENTS
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom CTA: single "Dive in" block (same action as the old LEARN MORE button) */}
              <button
                ref={ctaRef}
                type="button"
                className="nb-cta-bar nb-cta-dive"
                onClick={() => navigate('/societies')}
              >
                <span className="gsap-cta nb-cta-dive-text">
                  DIVE IN <ArrowRight size={16} />
                </span>
              </button>

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

      {/* ════════ PANEL 5: What We Stand For ════════ */}
      <div className="nb-standfor-wrapper">
        <StandForSection />
      </div>

      {/* ════════ Our Societies (IEEE wing tiles) ════════ */}
      <div className="nb-societies-wrapper">
        <SocietiesSection />
      </div>


      {/* ════════ PANEL 9: Mentors ════════ */}
      <div className="nb-mentors-wrapper">
        <MentorsSection />
      </div>

      {/* ════════ Footer (includes the scrolling sponsor logos) ════════ */}
      <Footer />
    </div>
    </>
  )
}
