import { useEffect, useRef } from 'react'
import { FileText, Bug, Brain, Bot, Wifi, Cpu, Wrench, Database, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/milestone-events.css'

gsap.registerPlugin(ScrollTrigger)

const EVENTS = [
  {
    id: 1,
    title: 'Latex Workshop',
    content: 'LaTeX is a typesetting software used to generate professional-looking documents.',
    img: '/photos/events/latex_workshop.jpeg',
    icon: <FileText size={18} />,
    accent: '#3B82F6',
    tag: 'Workshop',
  },
  {
    id: 2,
    title: 'Bug Bounty',
    content: 'IEEE-SJCE welcomes you to BUG BOUNTY — an online treasure hunt!',
    img: '/photos/events/bug_bounty.jpeg',
    icon: <Bug size={18} />,
    accent: '#8B5CF6',
    tag: 'Competition',
  },
  {
    id: 3,
    title: 'Quiz-Bizz',
    content: 'An event for all branches to test skills and knowledge across various fields.',
    img: '/photos/events/QUIZBIZZ.jpeg',
    icon: <Brain size={18} />,
    accent: '#00E5FF',
    tag: 'Quiz',
  },
  {
    id: 4,
    title: 'Robotics 13',
    content: 'Robots have changed the course of our lives in unimaginable ways.',
    img: '/photos/events/robotics_13.jpeg',
    icon: <Bot size={18} />,
    accent: '#EC4899',
    tag: 'Robotics',
  },
  {
    id: 5,
    title: 'IOT Workshop',
    content: 'Explore the futuristic world of Internet of Things hands-on.',
    img: '/photos/events/iot.png',
    icon: <Wifi size={18} />,
    accent: '#00F5D4',
    tag: 'Workshop',
  },
  {
    id: 6,
    title: 'PC Assembly',
    content: "Building a computer is fun, affordable and empowering.",
    img: '/photos/events/pc.jpg',
    icon: <Cpu size={18} />,
    accent: '#60A5FA',
    tag: 'Hands-on',
  },
  {
    id: 7,
    title: 'Soldering Workshop',
    content: "Build a strong relation-chip with electronics from scratch.",
    img: '/photos/events/soldering.jpeg',
    icon: <Wrench size={18} />,
    accent: '#F59E0B',
    tag: 'Workshop',
  },
  {
    id: 8,
    title: 'SQL Bootcamp',
    content: 'Master database queries — from basics to advanced SQL challenges.',
    img: '/photos/events/sql.jpg',
    icon: <Database size={18} />,
    accent: '#22D3EE',
    tag: 'Bootcamp',
  },
]

export default function MilestoneEventsSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ms-intro > *',
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.ms-layout',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        '.ms-poster',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.ms-filmstrip-track',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="milestone-events" ref={sectionRef} className="ms-section">
      <div className="ms-diagonal-bg" aria-hidden="true" />

      <div className="ms-inner">
        <div className="ms-layout">
          {/* Left — editorial intro */}
          <div className="ms-intro">
            <div className="ms-intro-badge">
              <Sparkles size={14} />
              <span>Since Day One</span>
            </div>
            <h2 className="ms-intro-title">
              Milestone
              <em>Events</em>
            </h2>
            <p className="ms-intro-text">
              Iconic workshops and competitions that built IEEE SJCE&apos;s legacy — scroll the filmstrip to explore each chapter.
            </p>
            <div className="ms-intro-stat">
              <span className="ms-stat-num">{EVENTS.length}</span>
              <span className="ms-stat-label">Events<br />Catalogued</span>
            </div>
          </div>

          {/* Right — horizontal filmstrip */}
          <div className="ms-filmstrip-wrap">
            <div className="ms-filmstrip-track">
              <div className="ms-filmstrip">
                {EVENTS.map((event, index) => (
                  <article
                    key={event.id}
                    className="ms-poster"
                    style={{ '--poster-accent': event.accent }}
                  >
                    <div className="ms-poster-frame">
                      <div className="ms-poster-media">
                        <img
                          src={event.img}
                          alt={event.title}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            e.currentTarget.parentElement.classList.add('ms-poster-fallback')
                          }}
                        />
                        <div className="ms-poster-shade" />
                      </div>

                      <div className="ms-poster-meta">
                        <span className="ms-poster-tag" style={{ borderColor: event.accent, color: event.accent }}>
                          {event.tag}
                        </span>
                        <span className="ms-poster-num">{String(index + 1).padStart(2, '0')}</span>
                      </div>

                      <div className="ms-poster-content">
                        <div className="ms-poster-icon" style={{ color: event.accent }}>
                          {event.icon}
                        </div>
                        <h3>{event.title}</h3>
                        <p>{event.content}</p>
                      </div>

                      <div className="ms-poster-perforation" aria-hidden="true">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <span key={i} />
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="ms-filmstrip-rail">
              <div className="ms-filmstrip-progress" />
            </div>
            <p className="ms-scroll-hint">← Scroll to browse →</p>
          </div>
        </div>
      </div>
    </section>
  )
}
