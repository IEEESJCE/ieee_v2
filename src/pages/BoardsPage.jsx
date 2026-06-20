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
    about: 'Designing and maintaining the IEEE-SJCE website. Students collaborate on secure, creative web solutions while learning industry-standard technologies.',
    initiatives: [
      { name: 'Web Hosting & Deployment', description: 'Deploying, maintaining and updating IEEE-SJCE on secure cloud platforms.' },
    ],
  },
  {
    id: 'editorial',
    title: 'Editorial Board',
    icon: PenLine,
    accent: '#8B5CF6',
    animation: 'https://lottie.host/?file=9d286e82-2e6b-4c8c-b925-b1b8ee052744/dBXmGwKKCY.json',
    about: 'Compelling articles on technology trends while amplifying IEEE-SJCE voices through publications that inspire innovation.',
    initiatives: [
      { name: 'IEEE Interface Magazine', description: 'Annual magazine — Orientation, Tuxedo, and Cyberia editions.' },
      { name: 'Technical Article Curation', description: 'In-depth articles on emerging technologies.' },
      { name: 'Student Spotlights', description: 'Member achievements and innovative projects.' },
      { name: 'Content Strategy', description: 'Narratives for IEEE events and initiatives.' },
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
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>

        <article className="brd-mag-card">
          <div className="brd-mag-cover">
            <img src="/photos/events/magazine.png" alt="IEEE Interface Magazine" loading="lazy" />
          </div>
          <div className="brd-mag-body">
            <BookOpen size={22} />
            <h2>IEEE Interface Magazine</h2>
            <p>Our signature annual publication showcasing innovation, research, and the IEEE-SJCE community.</p>
            <a
              href="https://drive.google.com/file/d/1LCHJoy6sXg5IC3mZTSvX1WoSFKEJURc9/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="brd-mag-btn"
            >
              View Magazine <ExternalLink size={15} />
            </a>
          </div>
        </article>
      </div>
    </>
  )
}
