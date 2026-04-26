import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EventsSection from '../components/EventsSection'
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
  const heroRef = useRef(null)
  const ctaRef = useRef(null)
  const floatingRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    // 1. Initial Animations
    const heroEls = heroRef.current.querySelectorAll('.gsap-hero')
    gsap.fromTo(heroEls,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.5 }
    )

    const ctaEls = ctaRef.current.querySelectorAll('.gsap-cta')
    gsap.fromTo(ctaEls,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out', delay: 1.8 }
    )

    if (floatingRef.current) {
      gsap.fromTo(floatingRef.current.children,
        { scale: 0, opacity: 0, rotation: -20 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)', delay: 1.2 }
      )
    }

    // 2. Pinned Panels with Overscroll
    // ONLY target the landing section. We do NOT want Events to scale/fade out.
    const panels = gsap.utils.toArray('.nb-section-landing')

    panels.forEach((panel) => {
      const innerpanel = panel.querySelector('.nb-section-inner')
      if (!innerpanel) return

      const panelHeight = innerpanel.offsetHeight
      const windowHeight = window.innerHeight
      const difference = panelHeight - windowHeight

      const fakeScrollRatio = difference > 0 ? (difference / (difference + windowHeight)) : 0

      if (fakeScrollRatio) {
        panel.style.marginBottom = panelHeight * fakeScrollRatio + 'px'
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: 'bottom bottom',
          end: () => fakeScrollRatio ? `+=${innerpanel.offsetHeight}` : 'bottom top',
          pinSpacing: false,
          pin: true,
          scrub: true,
        }
      })

      if (fakeScrollRatio) {
        tl.to(innerpanel, {
          yPercent: -100,
          y: window.innerHeight,
          duration: 1 / (1 - fakeScrollRatio) - 1,
          ease: 'none',
        })
      }

      tl.fromTo(panel,
        { scale: 1, opacity: 1 },
        { scale: 0.75, opacity: 0.4, duration: 0.9 }
      ).to(panel, { opacity: 0, duration: 0.1 })
    })

    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="nb-panels-container">
      {/* ════════ PANEL 1: Landing ════════ */}
      <section className="nb-section nb-section-landing">
        <div className="nb-section-inner">
          {/* Landing — fits in one viewport */}
          <div className="nb-landing">
            <div className="nb-bg">
              <div className="nb-bg-image" />

              <div ref={floatingRef} className="nb-floating-shapes">
                <div className="nb-shape nb-shape-1" />
                <div className="nb-shape nb-shape-2" />
                <div className="nb-shape nb-shape-3" />
                <div className="nb-shape nb-shape-4" />
                <div className="nb-shape nb-shape-5" />
              </div>

              <div className="nb-hero-wrapper">
                <div ref={heroRef} className="nb-hero-content">
                  <span className="gsap-hero nb-hero-label">⚡ IEEE Student Branch — SJCE Mysuru</span>
                  <h1 className="gsap-hero nb-hero-title">
                    INNOVATE<br />
                    INSPIRE<br />
                    <span className="accent-cyan">ENGINEER</span>
                  </h1>
                  <div className="gsap-hero nb-hero-divider" />
                  <p className="gsap-hero nb-hero-subtitle">Advancing Technology for Humanity</p>
                  <p className="gsap-hero nb-hero-tagline">Building tomorrow's engineers, today.</p>
                  <div className="gsap-hero nb-hero-buttons">
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLScyUvp_2L7Mw3ENLSANaXTQiZmqJJFhxETfKFOXWl9o8wn3Uw/viewform" target='_blank'>
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

      {/* ════════ PANEL 3: Footer ════════ */}
      <footer style={{
        background: 'var(--bg-surface)', padding: '60px 48px',
        textAlign: 'center', borderTop: 'var(--border)', position: 'relative', zIndex: 10
      }}>
        <h2 style={{ fontFamily: 'var(--font-display)', margin: '0 0 16px', color: 'var(--primary-strong)' }}>
          IEEE SJCE
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>© 2026 IEEE SJCE. All rights reserved.</p>
      </footer>
    </div>
  )
}
