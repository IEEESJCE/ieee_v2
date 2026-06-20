import { useEffect, useRef } from 'react'
import { Award, Globe, Trophy, Medal } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/achievements.css'

gsap.registerPlugin(ScrollTrigger)

const ACHIEVEMENTS = [
  {
    id: 1,
    award: 'Outstanding Student Branch',
    section: 'IEEE Mysore Subsection',
    year: '2021',
    icon: <Trophy size={28} />,
    accent: '#00E5FF',
    rank: 'I',
  },
  {
    id: 2,
    award: 'Best Student Branch Website',
    section: 'IEEE Bangalore Section',
    year: '2019',
    icon: <Globe size={28} />,
    accent: '#3B82F6',
    rank: 'II',
  },
  {
    id: 3,
    award: 'Best Student Branch Website',
    section: 'IEEE Bangalore Section',
    year: '2017',
    icon: <Globe size={28} />,
    accent: '#8B5CF6',
    rank: 'III',
  },
  {
    id: 4,
    award: 'Best Student Branch Website',
    section: 'IEEE Bangalore Section',
    year: '2016',
    icon: <Award size={28} />,
    accent: '#00F5D4',
    rank: 'IV',
  },
]

export default function AchievementsSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ach-hero-block > *',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.ach-hero-block',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        '.ach-plaque',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.ach-podium',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        '.ach-orb',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.ach-hero-block',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="achievements" ref={sectionRef} className="ach-section">
      <div className="ach-rays" aria-hidden="true" />

      <div className="ach-inner">
        <div className="ach-hero-block">
          <div className="ach-hero-left">
            <Medal size={20} className="ach-hero-icon" />
            <h2 className="ach-hero-title">Hall of Fame</h2>
            <p className="ach-hero-desc">
              Awards that celebrate our commitment to excellence across IEEE sections nationwide.
            </p>
          </div>
          <div className="ach-hero-right">
            <div className="ach-hero-stats">
              <div className="ach-stat">
                <span className="ach-stat-value">4</span>
                <span className="ach-stat-key">Awards</span>
              </div>
              <div className="ach-stat-divider" />
              <div className="ach-stat">
                <span className="ach-stat-value">6+</span>
                <span className="ach-stat-key">Years</span>
              </div>
            </div>
            <div className="ach-orb">
              <iframe
                title="Achievement animation"
                className="ach-orb-lottie"
                src="https://lottie.host/?file=f399cd9d-eb80-432b-b0da-04e11035a8e4/RKEVGpvACW.json"
              />
            </div>
          </div>
        </div>

        <div className="ach-podium">
          <div className="ach-plaque-row">
            {ACHIEVEMENTS.map((item) => (
              <article
                key={item.id}
                className="ach-plaque"
                style={{ '--plaque-accent': item.accent }}
              >
                <span className="ach-plaque-year-bg">{item.year}</span>

                <div className="ach-plaque-ribbon" aria-hidden="true" />

                <div className="ach-plaque-medal">{item.icon}</div>

                <span className="ach-plaque-rank">{item.rank}</span>
                <span className="ach-plaque-year">{item.year}</span>

                <h3 className="ach-plaque-award">{item.award}</h3>
                <p className="ach-plaque-section">{item.section}</p>

                <div className="ach-plaque-base" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
