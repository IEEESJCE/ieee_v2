import { useEffect, useRef } from 'react'
import { Mail, Linkedin, GraduationCap } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/mentors.css'

gsap.registerPlugin(ScrollTrigger)

const MENTORS = [
  {
    id: 1,
    type: 'Branch Counsellor',
    src: '/photos/advisors/MG Veena.jpg',
    name: 'Dr. M G Veena',
    linkedin: 'https://www.linkedin.com/in/veena-m-g-3b2ab039/',
    gmail: 'veenamaheshn@gmail.com',
    accent: '#00E5FF',
  },
  {
    id: 2,
    type: 'RAS Advisor',
    src: '/photos/advisors/Sudarshan PK.jpeg',
    name: 'Dr. Sudarshan P K',
    linkedin: 'https://www.linkedin.com/in/sudarshan-patilkulkarni-86178447/',
    gmail: 'sudarshan_pk@sjce.ac.in',
    accent: '#3B82F6',
  },
  {
    id: 3,
    type: 'EDS Advisor',
    src: '/photos/advisors/SB Rudraswamy.jpg',
    name: 'Dr. S B Rudraswamy',
    linkedin: '',
    gmail: 'rudra.swamy@gmail.com',
    accent: '#8B5CF6',
  },
  {
    id: 4,
    type: 'WIE Advisor',
    src: '/photos/advisors/Supreetha M.jpg',
    name: 'Ms. Supreetha M',
    linkedin: 'https://www.linkedin.com/in/supreetha-manjanna-65308415/',
    gmail: 'supreetha.manjann@sjce.ac.in',
    accent: '#EC4899',
  },
  {
    id: 5,
    type: 'SPS Advisor',
    src: '/photos/advisors/Dr. SHASHIDHAR R.jpg',
    name: 'Dr. Shashidhar R',
    linkedin: 'https://www.linkedin.com/in/shashidhar-r-ph-d-ab6152123/',
    gmail: 'shashidhar.r@sjce.ac.in',
    accent: '#00F5D4',
  },
  {
    id: 6,
    type: 'SBMDC Advisor',
    src: '/photos/advisors/anitha_prasad.jpg',
    name: 'Dr. Anitha Prasad',
    linkedin: '',
    gmail: 'anith.sp@sjce.ac.in',
    accent: '#F59E0B',
  },
]

export default function MentorsSection() {
  const sectionRef = useRef(null)

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

  return (
    <section id="mentors" ref={sectionRef} className="mnt-section">
      <div className="mnt-inner">
        <div className="mnt-header">
          <GraduationCap size={22} className="mnt-header-icon" />
          <h2 className="mnt-title">Our Mentors</h2>
          <p className="mnt-subtitle">
            The faculty advisors guiding IEEE SJCE — hover a card to connect.
          </p>
        </div>

        <div className="mnt-grid">
          {MENTORS.map((mentor) => (
            <article
              key={mentor.id}
              className="mnt-card"
              style={{ '--mnt-accent': '#2563EB' }}
            >
              {/* Neo-brutalist offset shadow via ::before in CSS */}
              <div className="mnt-flip-inner">
                <div className="mnt-face mnt-front">

                  {/* ── Photo column ── */}
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
                    {/* Dot matrix overlay */}
                    <div className="mnt-photo-dots" aria-hidden="true" />
                  </div>

                  {/* ── Info column ── */}
                  <div className="mnt-info">
                    <span className="mnt-role">{mentor.type}</span>
                    <h3 className="mnt-name">{mentor.name}</h3>
                    <span className="mnt-hint">↑ hover to connect</span>
                  </div>

                  {/* ── Slide-up social footer ── */}
                  <div className="mnt-footer">
                    <a
                      href={`mailto:${mentor.gmail}`}
                      className="mnt-footer-btn"
                      aria-label={`Email ${mentor.name}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="mnt-footer-icon"><Mail /></span>
                      EMAIL
                    </a>

                    {mentor.linkedin ? (
                      <a
                        href={mentor.linkedin}
                        className="mnt-footer-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${mentor.name} on LinkedIn`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="mnt-footer-icon"><Linkedin /></span>
                        LINKEDIN
                      </a>
                    ) : (
                      <span className="mnt-footer-btn disabled">
                        <span className="mnt-footer-icon"><Linkedin /></span>
                        N/A
                      </span>
                    )}
                  </div>

                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
