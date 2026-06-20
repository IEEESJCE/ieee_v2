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
    about: 'IEEE-SJCE Student Branch which started as an elite group 29 years ago, today has sprawled throughout the campus of SJCE, making the students technically more competitive, more professional and capable of enhancing their abilities as an engineer. Since then IEEE-SJCE Student Branch, a division under Region 10 of IEEE has been known for the immensity with which its members were bestowed. The very success story of its students as professionals into their respective fields after graduations speaks of its standards.IEEE-SJCE Student Branch, which started 29 years ago, has grown to represent 330+ members across six engineering disciplines. With a focus on technical excellence and professional growth, we conduct two major technical fests annually and organize workshops to keep students industry-ready.',
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
    about: 'IEEE-SJCE EDS has been providing students with basic electronics knowledge since its inception. It has helped students get better acquainted with electronic components, the various techniques ofcircuit making, and the basics of robot building.',
    events: [
      { title: 'SNAP CIRCUITS', desc: 'Hands-on workshop introducing basic electrical and electronic circuits to first and second year students.' },
      { title: 'SOLDERING & ETCHING WORKSHOP', desc: 'Learn proper soldering techniques and practical circuit fabrication in this intensive 3-day workshop.' },
      { title: 'VACATION PROJECT MANIA', desc: 'Interactive sessions where 120+ students share knowledge and practical experience during vacations.' },
      { title: 'ROBOTICS WORKSHOP', desc: 'Build autonomous robots with collision avoidance and mobile control systems.' },
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
    about: 'IEEE Women in Engineering (WIE) is a global network of IEEE members and volunteers dedicated to promoting women engineers and scientists and inspiring girls around the world to follow their academic interests in a career in engineering and science. It is the world’s largest technical professional organization dedicated to advancing technology for the benefit of humanity. Its goal is to facilitate the recruitment and retention of women in technical disciplines globally. IEEE WIE envisions a vibrant community of IEEE women and men collectively using their diverse talents to innovate the benefit of humanity..',
    events: [
      { title: 'PRAYAS', desc: 'Platform for Rendering Aid to Young kids - Reach-in program providing educational support to underprivileged children.' },
      { title: 'TECH-KNOW-LOGIC', desc: '2-day technical workshop teaching microcontrollers and programming to differently-abled students.' },
      { title: 'KALPANA CHAWLA MEMORIAL LECTURE', desc: 'Distinguished lecture by renowned women scientists in aerospace and technological fields.' },
      { title: 'CODEFIESTA', desc: '3-hour online coding competition with prizes for top performers and special awards for women.' },
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
    about: 'IEEE-SJCE RAS aims to keep the students up to date on the latest automation technology. Robotics focuses on systems incorporating sensors and actuators that operate autonomously or semi-autonomously in cooperation with humans. Robotics research emphasises intelligence and adaptability to cope with unstructured environments. Automation research emphasises efficiency, quality, and reliability, focusing on systems that operate autonomously.The IEEE Robotics and Automation Society\'s objectives are scientific, literary, and educational in character. The Society strives for the advancement of the theory and practice of robotics and automation engineering, along with allied arts and sciences, and for the maintenance of high professional standards among its members.',
    events: [
      { title: 'PYTHON BOOTCAMP', desc: 'Comprehensive 3-day workshop covering Python fundamentals, data structures, functions, and mini-projects.' },
      { title: 'IMAGE PROCESSING WITH OPENCV', desc: 'Learn computer vision techniques using the industry-standard OpenCV library.' },
      { title: 'IOT & EMBEDDED SYSTEMS', desc: 'Hands-on training with microcontrollers, sensors, and IoT protocols.' },
      { title: 'ROBOTICS CHALLENGES', desc: 'Compete in exciting robotics competitions featuring autonomous systems and real-world applications.' },
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
    about: 'IEEE-SJCE SPS is dedicated to providing students an insight into the world of signals and analysis. It allows students to understand the true essence of how the world is interpreted by both humans and machines alike. It shows them signal processing techniques and how to apply them to real-world models.',
    events: [
      { title: 'WAVE LAB', desc: 'This is the debut event of the SPS Wing. Students utilized the powerful tool, MATLAB, to understand the basics of Signal Processing. The workshop allows the students to explore the world of digital signal processing utilising an industrial standard tool, MATLAB. The students obtain a MATLAB license which will be useful for their future explorations..' },
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
