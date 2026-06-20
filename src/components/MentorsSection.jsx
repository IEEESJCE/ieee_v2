import { useEffect, useRef, useState } from 'react'
import { Mail, Linkedin, GraduationCap, ArrowLeft } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/mentors.css'

gsap.registerPlugin(ScrollTrigger)

const MENTORS = [
  {
    id: 1,
    type: 'Branch Counsellor',
    src: '/photos/members/MG Veena.jpg',
    name: 'Dr. M G Veena',
    linkedin: 'https://www.linkedin.com/in/veena-m-g-3b2ab039/',
    gmail: 'veenamaheshn@gmail.com',
    accent: '#00E5FF',
  },
  {
    id: 2,
    type: 'RAS Advisor',
    src: '/photos/members/Sudarshan PK.jpeg',
    name: 'Dr. Sudarshan P K',
    linkedin: 'https://www.linkedin.com/in/sudarshan-patilkulkarni-86178447/',
    gmail: 'sudarshan_pk@sjce.ac.in',
    accent: '#3B82F6',
  },
  {
    id: 3,
    type: 'EDS Advisor',
    src: '/photos/members/SB Rudraswamy.jpg',
    name: 'Dr. S B Rudraswamy',
    linkedin: '',
    gmail: 'rudra.swamy@gmail.com',
    accent: '#8B5CF6',
  },
  {
    id: 4,
    type: 'WIE Advisor',
    src: '/photos/members/Supreetha M.jpg',
    name: 'Ms. Supreetha M',
    linkedin: 'https://www.linkedin.com/in/supreetha-manjanna-65308415/',
    gmail: 'supreetha.manjann@sjce.ac.in',
    accent: '#EC4899',
  },
  {
    id: 5,
    type: 'SPS Advisor',
    src: '/photos/members/Dr. SHASHIDHAR R.jpg',
    name: 'Dr. Shashidhar R',
    linkedin: 'https://www.linkedin.com/in/shashidhar-r-ph-d-ab6152123/',
    gmail: 'shashidhar.r@sjce.ac.in',
    accent: '#00F5D4',
  },
  {
    id: 6,
    type: 'SBMDC Advisor',
    src: '/photos/members/anitha_prasad.jpg',
    name: 'Dr. Anitha Prasad',
    linkedin: '',
    gmail: 'anith.sp@sjce.ac.in',
    accent: '#F59E0B',
  },
]

export default function MentorsSection() {
  const sectionRef = useRef(null)
  const [flippedId, setFlippedId] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.mnt-header > *',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.mnt-header',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        '.mnt-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.mnt-grid',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const toggleFlip = (id) => {
    setFlippedId((prev) => (prev === id ? null : id))
  }

  return (
    <section id="mentors" ref={sectionRef} className="mnt-section">
      <div className="mnt-inner">
        <div className="mnt-header">
          <GraduationCap size={22} className="mnt-header-icon" />
          <h2 className="mnt-title">Our Mentors</h2>
          <p className="mnt-subtitle">
            Hover a card to flip and connect — tap on mobile to reveal email &amp; LinkedIn.
          </p>
        </div>

        <div className="mnt-grid">
          {MENTORS.map((mentor) => (
            <article
              key={mentor.id}
              className={`mnt-card ${flippedId === mentor.id ? 'mnt-flipped' : ''}`}
              style={{ '--mnt-accent': mentor.accent }}
              onClick={() => toggleFlip(mentor.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggleFlip(mentor.id)
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`${mentor.name} — flip to see contact`}
            >
              <div className="mnt-flip-inner">
                {/* Front */}
                <div className="mnt-face mnt-front">
                  <div className="mnt-photo-wrap">
                    <img
                      src={mentor.src}
                      alt={mentor.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.parentElement.classList.add('mnt-photo-fallback')
                      }}
                    />
                  </div>
                  <div className="mnt-info">
                    <span className="mnt-role">{mentor.type}</span>
                    <h3 className="mnt-name">{mentor.name}</h3>
                    <span className="mnt-hint">Flip to connect</span>
                  </div>
                </div>

                {/* Back */}
                <div className="mnt-face mnt-back">
                  <span className="mnt-back-label">Connect</span>
                  <h3 className="mnt-back-name">{mentor.name}</h3>
                  <span className="mnt-back-role">{mentor.type}</span>

                  <div className="mnt-social">
                    <a
                      href={`mailto:${mentor.gmail}`}
                      className="mnt-social-btn mnt-social-email"
                      aria-label={`Email ${mentor.name}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Mail size={22} />
                      <span className="mnt-social-text">
                        <strong>Email</strong>
                        <small>{mentor.gmail}</small>
                      </span>
                    </a>

                    {mentor.linkedin ? (
                      <a
                        href={mentor.linkedin}
                        className="mnt-social-btn mnt-social-linkedin"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${mentor.name} on LinkedIn`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin size={22} />
                        <span className="mnt-social-text">
                          <strong>LinkedIn</strong>
                          <small>View profile</small>
                        </span>
                      </a>
                    ) : (
                      <div className="mnt-social-btn mnt-social-disabled">
                        <Linkedin size={22} />
                        <span className="mnt-social-text">
                          <strong>LinkedIn</strong>
                          <small>Not available</small>
                        </span>
                      </div>
                    )}
                  </div>

                  <span className="mnt-back-tip">
                    <ArrowLeft size={12} /> Tap card to flip back
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
