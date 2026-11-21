import { useEffect, useRef, useState } from 'react'
import {
  BookOpen,
  Trophy,
  Wrench,
  Presentation,
  Activity,
  TrendingUp,
  Sparkles,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/standfor.css'

gsap.registerPlugin(ScrollTrigger)

const AREAS = [
  {
    id: 'seminars',
    name: 'Seminars',
    icon: <Presentation size={18} />,
    image: '/photos/standfor/seminars.jpeg',
    alt: 'IEEE-SJCE technical seminar session',
    accent: '#00E5FF',
    description:
      'IEEE-SJCE conducts many technical talks, seminars and panel discussions during its technical fests. PAPYRUS encourages students to write technical papers.',
  },
  {
    id: 'workshops',
    name: 'Workshops',
    icon: <Wrench size={18} />,
    image: '/photos/standfor/robotics_workshop.jpeg',
    alt: 'Students attending a robotics workshop',
    accent: '#8B5CF6',
    description:
      'Attend seminars and workshops on the most trending and interesting topics led by leading scientists and industry personnel. The major workshops conducted are: VPM, Soldering and Etching, and Robotics.',
  },
  {
    id: 'competitions',
    name: 'Competitions',
    icon: <Trophy size={18} />,
    image: '/photos/standfor/competition.jpg',
    alt: 'Participants at an IEEE-SJCE competition',
    accent: '#EC4899',
    description:
      'IEEE-SJCE conducts many competitions during its technical fests — TUXEDO and CYBERIA. Some of the competitions are: Amaze, Fury Road and Coding Owl.',
  },
  {
    id: 'activities',
    name: 'Activities',
    icon: <Activity size={18} />,
    image: '/photos/standfor/activities.jpeg',
    alt: 'IEEE-SJCE student activity',
    accent: '#00F5D4',
    description:
      'There are a lot of technical and non-technical activities that are undertaken here at IEEE to encourage students to learn in a way which inspires them to do so.',
  },
  {
    id: 'growth',
    name: 'Personal Growth',
    icon: <TrendingUp size={18} />,
    image: '/photos/standfor/personal_development.jpg',
    alt: 'IEEE-SJCE personal development session',
    accent: '#F59E0B',
    description:
      "Soft skills are one of the most important attributes in today's world. We at IEEE aspire to inculcate values that define us as people who are ethically adept and vision driven.",
  },
  {
    id: 'magazine',
    name: 'Magazine',
    icon: <BookOpen size={18} />,
    image: '/photos/standfor/magazine_launch.jpeg',
    alt: 'IEEE Interface magazine launch',
    accent: '#60A5FA',
    description:
      'We publish three editions of the IEEE Interface magazine every year: the Orientation edition, the Tuxedo edition and the Cyberia edition.',
  },
]

export default function StandForSection() {
  const sectionRef = useRef(null)
  const [activeId, setActiveId] = useState(AREAS[0].id)
  const active = AREAS.find((area) => area.id === activeId) ?? AREAS[0]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stf-header > *',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stf-header',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        '.stf-stage',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stf-stage',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="stand-for" ref={sectionRef} className="stf-section">
      <div className="stf-inner">
        <div className="stf-header">
          <span className="stf-badge">
            <Sparkles size={14} />
            What Drives Us
          </span>
          <h2 className="stf-title">What We Stand For</h2>
          <p className="stf-subtitle">
            The programmes and experiences that shape every IEEE-SJCE member.
          </p>
        </div>

        <div className="stf-stage">
          <div className="stf-tabs" role="tablist" aria-label="IEEE-SJCE activities">
            {AREAS.map((area) => (
              <button
                key={area.id}
                type="button"
                role="tab"
                aria-selected={activeId === area.id}
                className={`stf-tab ${activeId === area.id ? 'stf-tab-active' : ''}`}
                style={{ '--tab-accent': area.accent }}
                onClick={() => setActiveId(area.id)}
              >
                <span className="stf-tab-icon">{area.icon}</span>
                <span>{area.name}</span>
              </button>
            ))}
          </div>

          <div
            className="stf-panel"
            role="tabpanel"
            key={active.id}
            style={{ '--panel-accent': active.accent }}
          >
            <div className="stf-media">
              <img src={active.image} alt={active.alt} loading="lazy" />
            </div>
            <div className="stf-copy">
              <span className="stf-panel-icon">{active.icon}</span>
              <h3>{active.name}</h3>
              <p>{active.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
