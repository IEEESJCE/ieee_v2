import { useEffect, useRef } from 'react'
import { FileText, Bug, Brain, Bot, Wifi, Cpu, Wrench, Database, Sparkles, Globe } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/milestone-events.css'

gsap.registerPlugin(ScrollTrigger)

const EVENTS = [
  {
    id: 1,
    title: 'International IEEE Conferences',
    content: 'Premier global summits hosted by IEEE SJCE, notably ICETEG 2025 (International Conference on Emerging Technologies in Electronics and Green Energy, 10–11 Oct 2025) and IEEE MysuruCon 2022 (16–17 Oct 2022).',
    img: '/photos/events/iceteg.png',
    icon: <Globe size={18} />,
    accent: '#F59E0B',
    tag: 'Conference',
  },
  {
    id: 2,
    title: 'Robotics Workshop',
    content: 'Our premier annual hands-on robotics bootcamp, guiding students through microcontroller architecture, sensor arrays, motor control, and autonomous navigation.',
    img: '/photos/events/robotics_13.jpeg',
    icon: <Bot size={18} />,
    accent: '#EC4899',
    tag: 'Robotics',
  },
  {
    id: 3,
    title: 'IoT Workshop',
    content: 'Annual connected devices bootcamp exploring ESP32 microcontrollers, sensor telemetry streams, MQTT cloud brokers, and smart edge automation.',
    img: '/photos/events/iot_4_0_2025.jpg',
    icon: <Wifi size={18} />,
    accent: '#00F5D4',
    tag: 'IoT',
  },
  {
    id: 4,
    title: 'Soldering & Etching',
    content: 'Hands-on PCB fabrication and hardware prototyping where participants design circuit traces, chemically etch copper boards, and master precision through-hole soldering.',
    img: '/photos/events/soldering_etching_jan_2025.jpeg',
    icon: <Wrench size={18} />,
    accent: '#00E5FF',
    tag: 'Hardware',
  },
  {
    id: 5,
    title: 'ML Workshop',
    content: 'A comprehensive deep dive into machine learning workflows, exploring Python data pipelines, feature engineering, neural network foundations, and model inference.',
    img: '/photos/events/ml_workshop.jpeg',
    icon: <Brain size={18} />,
    accent: '#8B5CF6',
    tag: 'Intelligence',
  },
  {
    id: 6,
    title: 'Latex Workshop',
    content: 'Professional typesetting software workshop teaching students to structure, format, and render publication-grade IEEE papers and technical documentation.',
    img: '/photos/events/latex_workshop.jpeg',
    icon: <FileText size={18} />,
    accent: '#3B82F6',
    tag: 'Workshop',
  },
  {
    id: 7,
    title: 'Bug Bounty',
    content: 'High-energy cyber capture-the-flag and code debugging challenge testing analytical reasoning, security audits, and rapid problem-solving skills.',
    img: '/photos/events/bug_bounty.jpeg',
    icon: <Bug size={18} />,
    accent: '#A855F7',
    tag: 'Competition',
  },
  {
    id: 8,
    title: 'Quiz-Bizz',
    content: 'Flagship inter-branch technical and business quiz evaluating participants across engineering domains, technological breakthroughs, and business acumen.',
    img: '/photos/events/quizbizz.jpeg',
    icon: <Brain size={18} />,
    accent: '#38BDF8',
    tag: 'Quiz',
  },
  {
    id: 9,
    title: 'PC Assembly',
    content: 'Interactive hardware masterclass demystifying computing architectures, motherboard chipsets, thermal management, and step-by-step custom PC assembly.',
    img: '/photos/events/pc.jpg',
    icon: <Cpu size={18} />,
    accent: '#60A5FA',
    tag: 'Hands-on',
  },
  {
    id: 10,
    title: 'SQL Bootcamp',
    content: 'Foundational relational database workshop covering SQL syntax, table schemas, multi-table joins, subqueries, and query performance optimization.',
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
              Flagship
              <em>Events</em>
            </h2>
            <p className="ms-intro-text">
              Iconic workshops and premier competitions that define IEEE SJCE&apos;s flagship legacy — scroll the filmstrip to explore each edition.
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
