import { useEffect, useRef, useState } from 'react'
import { Cpu, Users, Bot, Radio, Zap, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import '../styles/societies.css'

const SOCIETIES = [
  {
    id: 'student-branch',
    short: 'Student Branch',
    name: 'IEEE SJCE Student Branch',
    icon: Zap,
    accent: '#3B82F6',
    animation: 'https://lottie.host/?file=89a9d017-c9c2-4e7c-a02e-c33653a6972a/3dpYgASICZ.json',
    tagline: 'Advancing technology and professional development.',
    about: 'IEEE-SJCE Student Branch which started as an elite group 29 years ago, today has sprawled throughout the campus of SJCE, making the students technically more competitive, more professional and capable of enhancing their abilities as an engineer.',
    extra: '330+ members across six engineering disciplines. Two major technical fests annually and industry-ready workshops.',
    events: [],
  },
  {
    id: 'eds',
    short: 'EDS',
    name: 'Electron Devices Society',
    icon: Cpu,
    accent: '#00E5FF',
    animation: '',
    tagline: 'Hands-on electronics from circuits to robots.',
    about: 'IEEE-SJCE EDS has been providing students with basic electronics knowledge since its inception — electronic components, circuit making, and robot building fundamentals.',
    events: [
      { title: 'Snap Circuits', desc: 'Basic electrical and electronic circuits for first and second year students.' },
      { title: 'Soldering & Etching', desc: 'Intensive 3-day circuit fabrication workshop.' },
      { title: 'Vacation Project Mania', desc: '120+ students sharing knowledge during vacations.' },
      { title: 'Robotics Workshop', desc: 'Autonomous robots with collision avoidance.' },
    ],
  },
  {
    id: 'wie',
    short: 'WIE',
    name: 'Women in Engineering',
    icon: Users,
    accent: '#EC4899',
    animation: 'https://lottie.host/?file=2f28a704-d29d-4531-975b-c3e7e6d9bf20/WVBLEk0GNv.json',
    tagline: 'Empowering women in STEM globally.',
    about: 'IEEE WIE is a global network dedicated to promoting women engineers and inspiring girls to pursue careers in engineering and science.',
    events: [
      { title: 'Prayas', desc: 'Educational support for underprivileged children.' },
      { title: 'Tech-Know-Logic', desc: 'Microcontroller workshop for differently-abled students.' },
      { title: 'Kalpana Chawla Lecture', desc: 'Distinguished lecture by women in aerospace.' },
      { title: 'Codefiesta', desc: 'Online coding competition with special awards for women.' },
    ],
  },
  {
    id: 'ras',
    short: 'RAS',
    name: 'Robotics & Automation Society',
    icon: Bot,
    accent: '#00F5D4',
    animation: 'https://lottie.host/?file=2761ce9c-5f1d-49bd-9db8-b7b3bd572353/UrP5jahB6E.json',
    tagline: 'Robotics, automation & intelligent systems.',
    about: 'IEEE-SJCE RAS keeps students up to date on automation technology — from autonomous systems to professional standards in robotics engineering.',
    events: [
      { title: 'Python Bootcamp', desc: '3-day Python fundamentals and mini-projects.' },
      { title: 'OpenCV Workshop', desc: 'Computer vision with industry-standard tools.' },
      { title: 'IoT & Embedded', desc: 'Microcontrollers, sensors and IoT protocols.' },
      { title: 'Robotics Challenges', desc: 'Competitions with real-world applications.' },
    ],
  },
  {
    id: 'sps',
    short: 'SPS',
    name: 'Signal Processing Society',
    icon: Radio,
    accent: '#60A5FA',
    animation: '',
    tagline: 'Signals, analysis & real-world models.',
    about: 'IEEE-SJCE SPS provides insight into how the world is interpreted by humans and machines — signal processing techniques applied to real-world models.',
    events: [
      { title: 'Wave Lab', desc: 'MATLAB-based digital signal processing debut workshop.' },
    ],
    comingSoon: true,
  },
]

export default function SocietiesPage() {
  const [activeId, setActiveId] = useState('student-branch')
  const headerRef = useRef(null)
  const active = SOCIETIES.find((s) => s.id === activeId)
  const Icon = active.icon

  useEffect(() => {
    window.scrollTo(0, 0)
    gsap.fromTo(
      headerRef.current?.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.15 }
    )
  }, [])

  return (
    <>
      <div className="soc-page">
        <header ref={headerRef} className="soc-hero">
          <p className="soc-hero-eyebrow">Explore Chapters</p>
          <h1>Societies</h1>
          <p>Select a chapter to dive into its mission, events and community.</p>
        </header>

        <div className="soc-shell">
          <nav className="soc-rail" aria-label="Society chapters">
            {SOCIETIES.map((s) => {
              const SIcon = s.icon
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`soc-rail-btn ${activeId === s.id ? 'soc-rail-active' : ''}`}
                  style={{ '--rail-accent': s.accent }}
                  onClick={() => setActiveId(s.id)}
                >
                  <SIcon size={18} />
                  <span>{s.short}</span>
                  {activeId === s.id && <ChevronRight size={14} className="soc-rail-arrow" />}
                </button>
              )
            })}
          </nav>

          <article
            key={activeId}
            className="soc-stage"
            style={{ '--stage-accent': active.accent }}
          >
            <div className="soc-stage-top">
              <div className="soc-stage-copy">
                <span className="soc-stage-tag">{active.tagline}</span>
                <h2><Icon size={24} /> {active.name}</h2>
                <p>{active.about}</p>
                {active.extra && <p className="soc-stage-extra">{active.extra}</p>}
                {active.comingSoon && <span className="soc-soon">More programs coming soon</span>}
              </div>
              <div className="soc-stage-visual">
                {active.animation ? (
                  <iframe title="" className="soc-lottie" src={active.animation} />
                ) : (
                  <div className="soc-visual-empty"><Icon size={48} /></div>
                )}
              </div>
            </div>

            {active.events.length > 0 && (
              <div className="soc-events-block">
                <h3>Featured Events</h3>
                <div className="soc-events-scroll">
                  {active.events.map((evt, i) => (
                    <div key={i} className="soc-event-tile">
                      <span className="soc-event-idx">{String(i + 1).padStart(2, '0')}</span>
                      <h4>{evt.title}</h4>
                      <p>{evt.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    </>
  )
}
