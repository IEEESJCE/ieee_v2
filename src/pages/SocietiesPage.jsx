import { useEffect, useRef } from 'react'
import { Cpu, Users, Bot, Radio, Zap } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/societies.css'

gsap.registerPlugin(ScrollTrigger)

const SOCIETIES = [
  {
    id: 'ieee-sjce',
    name: 'IEEE-SJCE Student Branch',
    icon: <Zap size={24} />,
    accent: '#3B82F6',
    description: 'IEEE-SJCE Student Branch which started as an elite group 29 years ago, today has sprawled throughout the campus of SJCE, making the students technically more competitive, more professional and capable of enhancing their abilities as an engineer. Since then IEEE-SJCE Student Branch, a division under Region 10 of IEEE has been known for the immensity with which its members were bestowed. The very success story of its students as professionals into their respective fields after graduations speaks of its standards.',
    stats: 'IEEE-SJCE Student Branch, which started 29 years ago, has grown to represent 330+ members across six engineering disciplines. With a focus on technical excellence and professional growth, we conduct two major technical fests annually and organize workshops to keep students industry-ready.',
    events: [],
  },
  {
    id: 'eds',
    name: 'Electron Devices Society',
    icon: <Cpu size={24} />,
    accent: '#00E5FF',
    description: 'IEEE-SJCE EDS has been providing students with basic electronics knowledge since its inception. It has helped students get better acquainted with electronic components, the various techniques of circuit making, and the basics of robot building.',
    stats: null,
    events: [
      { title: 'SNAP CIRCUITS', desc: 'Hands-on workshop introducing basic electrical and electronic circuits to first and second year students.' },
      { title: 'SOLDERING & ETCHING WORKSHOP', desc: 'Learn proper soldering techniques and practical circuit fabrication in this intensive 3-day workshop.' },
      { title: 'VACATION PROJECT MANIA', desc: 'Interactive sessions where 120+ students share knowledge and practical experience during vacations.' },
      { title: 'ROBOTICS WORKSHOP', desc: 'Build autonomous robots with collision avoidance and mobile control systems.' },
    ],
  },
  {
    id: 'wie',
    name: 'Women in Engineering',
    icon: <Users size={24} />,
    accent: '#22D3EE',
    description: 'IEEE Women in Engineering (WIE) is a global network of IEEE members and volunteers dedicated to promoting women engineers and scientists and inspiring girls around the world to follow their academic interests in a career in engineering and science. It is the world\'s largest technical professional organization dedicated to advancing technology for the benefit of humanity. Its goal is to facilitate the recruitment and retention of women in technical disciplines globally. IEEE WIE envisions a vibrant community of IEEE women and men collectively using their diverse talents to innovate the benefit of humanity.',
    stats: null,
    events: [
      { title: 'PRAYAS', desc: 'Platform for Rendering Aid to Young kids - Reach-in program providing educational support to underprivileged children.' },
      { title: 'TECH-KNOW-LOGIC', desc: '2-day technical workshop teaching microcontrollers and programming to differently-abled students.' },
      { title: 'KALPANA CHAWLA MEMORIAL LECTURE', desc: 'Distinguished lecture by renowned women scientists in aerospace and technological fields.' },
      { title: 'CODEFIESTA', desc: '3-hour online coding competition with prizes for top performers and special awards for women.' },
    ],
  },
  {
    id: 'ras',
    name: 'Robotics & Automation Society',
    icon: <Bot size={24} />,
    accent: '#00F5D4',
    description: 'IEEE-SJCE RAS aims to keep the students up to date on the latest automation technology. Robotics focuses on systems incorporating sensors and actuators that operate autonomously or semi-autonomously in cooperation with humans. Robotics research emphasises intelligence and adaptability to cope with unstructured environments. Automation research emphasises efficiency, quality, and reliability, focusing on systems that operate autonomously. The IEEE Robotics and Automation Society\'s objectives are scientific, literary, and educational in character. The Society strives for the advancement of the theory and practice of robotics and automation engineering, along with allied arts and sciences, and for the maintenance of high professional standards among its members.',
    stats: null,
    events: [
      { title: 'PYTHON BOOTCAMP', desc: 'Comprehensive 3-day workshop covering Python fundamentals, data structures, functions, and mini-projects.' },
      { title: 'IMAGE PROCESSING WITH OPENCV', desc: 'Learn computer vision techniques using the industry-standard OpenCV library.' },
      { title: 'IOT & EMBEDDED SYSTEMS', desc: 'Hands-on training with microcontrollers, sensors, and IoT protocols.' },
      { title: 'ROBOTICS CHALLENGES', desc: 'Compete in exciting robotics competitions featuring autonomous systems and real-world applications.' },
    ],
  },
  {
    id: 'sps',
    name: 'Signal Processing Society',
    icon: <Radio size={24} />,
    accent: '#60A5FA',
    description: 'IEEE-SJCE SPS is dedicated to providing students an insight into the world of signals and analysis. It allows students to understand the true essence of how the world is interpreted by both humans and machines alike. It shows them signal processing techniques and how to apply them to real-world models.',
    stats: null,
    events: [
      { title: 'WAVE LAB', desc: 'This is the debut event of the SPS Wing. Students utilized the powerful tool, MATLAB, to understand the basics of Signal Processing. The workshop allows the students to explore the world of digital signal processing utilising an industrial standard tool, MATLAB. The students obtain a MATLAB license which will be useful for their future explorations.' },
    ],
  },
]

export default function SocietiesPage() {
  const headerRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    gsap.fromTo(headerRef.current.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
    )

    document.querySelectorAll('.soc-card').forEach((card, i) => {
      gsap.fromTo(card,
        { y: 50, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
          delay: i * 0.05,
        }
      )
    })
  }, [])

  return (
    <>
      <div ref={headerRef} className="soc-header">
        <span className="soc-header-label">◆ OUR CHAPTERS</span>
        <h1>Societies & Boards</h1>
        <p>Explore the technical societies and affinity groups that power the IEEE SJCE Student Branch.</p>
      </div>

      <div className="soc-content">
        {SOCIETIES.map((soc) => (
          <div key={soc.id} className="soc-card">
            <div className="soc-card-header">
              <div className="soc-card-icon" style={{ background: soc.accent, color: '#fff' }}>
                {soc.icon}
              </div>
              <h2>{soc.name}</h2>
            </div>
            <div className="soc-card-body">
              <p>{soc.description}</p>
              {soc.stats && <p className="soc-card-stats">{soc.stats}</p>}

              {soc.events.length > 0 && (
                <>
                  <div className="soc-events-title">Featured Events & Workshops</div>
                  <div className="soc-events-grid">
                    {soc.events.map((evt, j) => (
                      <div key={j} className="soc-event-card">
                        <h4>{evt.title}</h4>
                        <p>{evt.desc}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
