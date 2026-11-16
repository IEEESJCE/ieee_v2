import { useEffect, useRef } from 'react'
import { Code2, PenLine, ExternalLink, BookOpen } from 'lucide-react'
import gsap from 'gsap'
import '../styles/boards.css'

const BOARDS = [
  {
    id: 'web-dev',
    title: 'Web Development Board',
    icon: Code2,
    accent: '#3B82F6',
    animation: 'https://lottie.host/?file=dc229b20-4a86-4c49-b454-7a5023d86ab8/o7qpAuynA7.json',
    about: 'Designing, building, and maintaining the digital infrastructure for IEEE-SJCE. Members collaborate on modern, responsive, high-performance web systems while mastering industry-standard frameworks and engineering practices.',
    initiatives: [
      { name: 'Portal Architecture & Deployment', description: 'Designing, deploying, and maintaining the official IEEE-SJCE platform on secure, modern cloud infrastructure.' },
      { name: 'UI/UX & Interactive Design Systems', description: 'Crafting responsive, accessible, and high-performance neo-brutalist interfaces for students and members.' },
      { name: 'Technical Sessions & Bootcamps', description: 'Mentoring students in full-stack web development, modern frontend frameworks, and Git collaboration workflows.' },
      { name: 'Digital Operations & Infrastructure', description: 'Managing domain routing, event registration pipelines, and continuous deployment systems across branch activities.' },
    ],
  },
  {
    id: 'editorial',
    title: 'Editorial Board',
    icon: PenLine,
    accent: '#8B5CF6',
    animation: 'https://lottie.host/?file=9d286e82-2e6b-4c8c-b925-b1b8ee052744/dBXmGwKKCY.json',
    about: 'Curating compelling articles on emerging technology trends while amplifying IEEE-SJCE voices through flagship publications, student showcases, and thoughtful technical journalism.',
    initiatives: [
      {
        name: 'IEEE Interface Magazine',
        description: 'Our signature annual publication featuring Orientation, Tuxedo, and Cyberia editions showcasing student innovation, research, and technical achievements.',
        action: {
          label: 'Read Magazine',
          href: 'https://drive.google.com/file/d/1LCHJoy6sXg5IC3mZTSvX1WoSFKEJURc9/view?usp=sharing',
        },
      },
      { name: 'Technical Article Curation', description: 'In-depth articles covering emerging technologies, artificial intelligence developments, and engineering breakthroughs.' },
      { name: 'Student & Member Spotlights', description: 'Celebrating student achievements, project milestones, and leadership journeys across IEEE-SJCE.' },
      { name: 'Content & Narrative Strategy', description: 'Crafting narratives, editorial coverage, and documentation for IEEE-SJCE flagship events and community initiatives.' },
    ],
  },
]

export default function BoardsPage() {
  const headerRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    gsap.fromTo(
      headerRef.current?.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
    )
    gsap.fromTo(
      '.brd-card',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, stagger: 0.12, ease: 'power3.out', delay: 0.3 }
    )
  }, [])

  return (
    <>
      <div className="brd-page">
        <header ref={headerRef} className="brd-hero">
          <p className="brd-hero-eyebrow">Creative Teams</p>
          <h1>Boards</h1>
          <p>Committees that power our digital presence and publications.</p>
        </header>

        <div className="brd-grid">
          {BOARDS.map((board) => {
            const Icon = board.icon
            return (
              <article key={board.id} className="brd-card" style={{ '--card-accent': board.accent }}>
                <div className="brd-card-top">
                  <div className="brd-card-icon"><Icon size={20} /></div>
                  <h2>{board.title}</h2>
                </div>

                <div className="brd-card-lottie">
                  <iframe title="" src={board.animation} />
                </div>

                <p className="brd-card-about">{board.about}</p>

                <div className="brd-card-init">
                  <h3>Initiatives</h3>
                  <ul>
                    {board.initiatives.map((item, i) => (
                      <li key={i}>
                        <strong>{item.name}</strong>
                        <span>{item.description}</span>
                        {item.action && (
                          <div className="brd-init-action-wrap">
                            <a
                              href={item.action.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="brd-init-action-btn"
                            >
                              <BookOpen size={14} className="brd-init-action-icon" />
                              <span className="brd-init-action-label">{item.action.label}</span>
                              <ExternalLink size={13} className="brd-init-action-icon" />
                            </a>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </>
  )
}
