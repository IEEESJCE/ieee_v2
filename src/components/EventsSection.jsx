import { useEffect, useRef, useState } from 'react'
import { Calendar, Code, Lightbulb, Zap, Award, Trophy, Star, Rocket, ChevronLeft, ChevronRight, Users } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/events.css'

gsap.registerPlugin(ScrollTrigger)

const EVENTS = [
  {
    title: 'Induction Ceremony',
    date: '18 JAN 2024',
    description: 'Welcoming new minds to the IEEE SJCE family.',
    icon: <Users size={22} />,
    accent: '#3B82F6',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
  },
  {
    title: 'Tech Talk',
    date: '22 FEB 2024',
    description: 'Insights from industry experts on emerging technologies.',
    icon: <Code size={22} />,
    accent: '#8B5CF6',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop',
  },
  {
    title: 'CodeFest 2.0',
    date: '15 MAR 2024',
    description: '48 hours of coding, collaboration and innovation.',
    icon: <Trophy size={22} />,
    accent: '#00E5FF',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
    featured: true,
  },
  {
    title: 'Workshop',
    date: '26 APR 2024',
    description: 'Hands-on learning experiences with cutting-edge tools.',
    icon: <Rocket size={22} />,
    accent: '#EC4899',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop',
  },
  {
    title: 'IEEE Day Celebration',
    date: '30 MAY 2024',
    description: 'Celebrating innovation and the IEEE spirit.',
    icon: <Star size={22} />,
    accent: '#60A5FA',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=300&fit=crop',
  },
  {
    title: 'Induction Ceremony',
    date: '18 JAN 2024',
    description: 'Welcoming new minds to the IEEE SJCE family.',
    icon: <Users size={22} />,
    accent: '#3B82F6',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
  },
  {
    title: 'Tech Talk',
    date: '22 FEB 2024',
    description: 'Insights from industry experts on emerging technologies.',
    icon: <Code size={22} />,
    accent: '#8B5CF6',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop',
  },
  {
    title: 'CodeFest 2.0',
    date: '15 MAR 2024',
    description: '48 hours of coding, collaboration and innovation.',
    icon: <Trophy size={22} />,
    accent: '#00E5FF',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
    featured: true,
  },
]

export default function EventsSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const trackRef = useRef(null)
  const cardsRef = useRef([])
  const [activeIndex, setActiveIndex] = useState(2) // center card (CodeFest)

  useEffect(() => {
    // Animate header
    gsap.fromTo(titleRef.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      }
    )

    // Animate cards staggered
    gsap.fromTo('.evt-card',
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.evt-timeline-track', start: 'top 80%', toggleActions: 'play none none none' },
      }
    )

    // Animate the timeline line drawing
    gsap.fromTo('.evt-timeline-line-fill',
      { scaleX: 0 },
      {
        scaleX: 1, duration: 1.5, ease: 'power2.out',
        scrollTrigger: { trigger: '.evt-timeline-track', start: 'top 80%', toggleActions: 'play none none none' },
      }
    )

    // Animate timeline dots
    gsap.fromTo('.evt-node',
      { scale: 0 },
      {
        scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(2)',
        scrollTrigger: { trigger: '.evt-timeline-track', start: 'top 75%', toggleActions: 'play none none none' },
        delay: 0.6,
      }
    )
  }, [])

  const scrollToCard = (dir) => {
    const next = activeIndex + dir
    if (next < 0 || next >= EVENTS.length) return
    setActiveIndex(next)
  }

  // Center the active card in the viewport
  useEffect(() => {
    if (trackRef.current && cardsRef.current[activeIndex]) {
      const card = cardsRef.current[activeIndex]
      const track = trackRef.current
      const trackRect = track.getBoundingClientRect()
      const cardRect = card.getBoundingClientRect()
      const scrollLeft = track.scrollLeft
      const targetScroll = scrollLeft + cardRect.left - trackRect.left - (trackRect.width / 2) + (cardRect.width / 2)
      track.scrollTo({ left: targetScroll, behavior: 'smooth' })
    }
  }, [activeIndex])

  return (
    <section id="events-section" ref={sectionRef} className="evt-section">
      {/* Circuit board SVG background */}
      <div className="evt-circuit-bg">
        <svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" className="evt-circuit-svg">
          {/* Left circuit traces */}
          <g className="evt-circuit-group" opacity="0.12">
            {/* Left side traces */}
            <path d="M0 200 H80 L120 240 H200" stroke="var(--blue)" strokeWidth="1.5" fill="none" />
            <path d="M0 240 H60 L90 270 H160" stroke="var(--accent)" strokeWidth="1" fill="none" />
            <path d="M0 300 H120" stroke="var(--blue)" strokeWidth="1" fill="none" />
            <path d="M0 340 H40 L70 370 H130" stroke="var(--cyan)" strokeWidth="1.5" fill="none" />
            <circle cx="200" cy="240" r="3" fill="var(--blue)" />
            <circle cx="160" cy="270" r="2.5" fill="var(--accent)" />
            <circle cx="120" cy="300" r="3" fill="var(--blue)" />
            <circle cx="130" cy="370" r="2.5" fill="var(--cyan)" />

            <path d="M0 500 H100 L130 470 H220" stroke="var(--blue)" strokeWidth="1" fill="none" />
            <path d="M0 540 H70 L110 580 H180" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
            <path d="M0 620 H90" stroke="var(--cyan)" strokeWidth="1" fill="none" />
            <circle cx="220" cy="470" r="3" fill="var(--blue)" />
            <circle cx="180" cy="580" r="2.5" fill="var(--accent)" />
            <circle cx="90" cy="620" r="2.5" fill="var(--cyan)" />

            {/* Right side traces */}
            <path d="M1440 200 H1360 L1320 240 H1240" stroke="var(--blue)" strokeWidth="1.5" fill="none" />
            <path d="M1440 250 H1380 L1350 280 H1280" stroke="var(--accent)" strokeWidth="1" fill="none" />
            <path d="M1440 310 H1320" stroke="var(--cyan)" strokeWidth="1" fill="none" />
            <path d="M1440 360 H1400 L1370 390 H1310" stroke="var(--blue)" strokeWidth="1.5" fill="none" />
            <circle cx="1240" cy="240" r="3" fill="var(--blue)" />
            <circle cx="1280" cy="280" r="2.5" fill="var(--accent)" />
            <circle cx="1320" cy="310" r="3" fill="var(--cyan)" />
            <circle cx="1310" cy="390" r="2.5" fill="var(--blue)" />

            <path d="M1440 500 H1340 L1310 470 H1220" stroke="var(--accent)" strokeWidth="1" fill="none" />
            <path d="M1440 550 H1370 L1330 590 H1260" stroke="var(--blue)" strokeWidth="1.5" fill="none" />
            <path d="M1440 630 H1350" stroke="var(--cyan)" strokeWidth="1" fill="none" />
            <circle cx="1220" cy="470" r="2.5" fill="var(--accent)" />
            <circle cx="1260" cy="590" r="3" fill="var(--blue)" />
            <circle cx="1350" cy="630" r="2.5" fill="var(--cyan)" />

            {/* Top traces */}
            <path d="M500 0 V60 L530 90 V150" stroke="var(--blue)" strokeWidth="1" fill="none" />
            <path d="M700 0 V80" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
            <path d="M900 0 V50 L870 80 V130" stroke="var(--cyan)" strokeWidth="1" fill="none" />
            <circle cx="530" cy="150" r="2.5" fill="var(--blue)" />
            <circle cx="700" cy="80" r="3" fill="var(--accent)" />
            <circle cx="870" cy="130" r="2.5" fill="var(--cyan)" />

            {/* Bottom traces */}
            <path d="M400 900 V820 L430 790 V730" stroke="var(--accent)" strokeWidth="1" fill="none" />
            <path d="M600 900 V840" stroke="var(--blue)" strokeWidth="1.5" fill="none" />
            <path d="M1000 900 V830 L970 800 V750" stroke="var(--blue)" strokeWidth="1" fill="none" />
            <circle cx="430" cy="730" r="2.5" fill="var(--accent)" />
            <circle cx="600" cy="840" r="3" fill="var(--blue)" />
            <circle cx="970" cy="750" r="2.5" fill="var(--blue)" />
          </g>
        </svg>
      </div>

      <div className="evt-inner">
        {/* ─── Header ─── */}
        <div ref={titleRef} className="evt-header">
          <span className="evt-overline">OUR JOURNEY</span>
          <h2 className="evt-title">
            Events <span className="evt-title-accent">Timeline</span>
          </h2>
          <p className="evt-subtitle">
            Milestones that define our passion for technology, innovation and impact.
          </p>
        </div>

        {/* ─── Timeline ─── */}
        <div className="evt-timeline-wrapper">
          {/* Nav arrows */}
          <button
            className={`evt-nav evt-nav-left ${activeIndex === 0 ? 'evt-nav-disabled' : ''}`}
            onClick={() => scrollToCard(-1)}
            aria-label="Previous event"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            className={`evt-nav evt-nav-right ${activeIndex === EVENTS.length - 1 ? 'evt-nav-disabled' : ''}`}
            onClick={() => scrollToCard(1)}
            aria-label="Next event"
          >
            <ChevronRight size={28} />
          </button>

          {/* Scrollable track */}
          <div className="evt-timeline-track" ref={trackRef}>
            {/* Cards row */}
            <div className="evt-cards-row">
              {/* Timeline line — inside cards-row so it scrolls with content */}
              <div className="evt-timeline-line">
                <div className="evt-timeline-line-fill" />
              </div>
              {EVENTS.map((evt, i) => (
                <div
                  key={i}
                  className={`evt-card-wrapper ${i === activeIndex ? 'evt-card-active' : ''}`}
                  ref={el => cardsRef.current[i] = el}
                  onClick={() => setActiveIndex(i)}
                >
                  {/* Date */}
                  <div className="evt-date" style={{ color: evt.accent }}>{evt.date}</div>

                  {/* Card */}
                  <div
                    className={`evt-card ${evt.featured ? 'evt-card-featured' : ''}`}
                    style={{ '--card-accent': evt.accent }}
                  >
                    {/* Icon hexagon */}
                    <div className="evt-icon-hex" style={{ background: `${evt.accent}18`, borderColor: `${evt.accent}60` }}>
                      <div className="evt-icon-inner" style={{ color: evt.accent }}>
                        {evt.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="evt-card-title">{evt.title}</h3>

                    {/* Description */}
                    <p className="evt-card-desc">{evt.description}</p>

                    {/* Event image */}
                    <div className="evt-card-image">
                      <img src={evt.image} alt={evt.title} loading="lazy" />
                      <div className="evt-card-image-overlay" />
                    </div>
                  </div>

                  {/* Timeline node */}
                  <div className="evt-node" style={{ '--node-color': evt.accent }}>
                    <div className="evt-node-dot" />
                    <div className="evt-node-glow" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Footer CTA ─── */}
        <div className="evt-footer">
          <div className="evt-footer-icon">
            <Calendar size={24} />
          </div>
          <div className="evt-footer-text">
            <span className="evt-footer-heading">And many more to come...</span>
            <span className="evt-footer-sub">Stay tuned for exciting events ahead!</span>
          </div>
        </div>
      </div>
    </section>
  )
}
