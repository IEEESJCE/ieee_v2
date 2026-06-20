import { useEffect, useRef } from 'react'
import { MapPin, Award, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/bangalore.css'

gsap.registerPlugin(ScrollTrigger)

export default function BangaloreSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.blr-intro > *',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.blr-intro',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        '.blr-stat',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.6)',
          scrollTrigger: {
            trigger: '.blr-stats',
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="bangalore-section" ref={sectionRef} className="blr-section">
      <div className="blr-grid-bg" aria-hidden="true" />

      <div className="blr-inner">
        <div className="blr-intro">
          <span className="blr-badge">
            <MapPin size={14} />
            IEEE Bangalore Section
          </span>
          <h2 className="blr-title">Bangalore Section</h2>
          <p className="blr-lead">
            IEEE-SJCE has been successfully recognized by IEEE Bangalore Section for completing
            its Silver Jubilee in flying colours. We have also been able to bag the Best Website
            Award two times in a row.
          </p>
        </div>

        <div className="blr-stats">
          <div className="blr-stat">
            <Award size={28} />
            <span className="blr-stat-num">25+</span>
            <span className="blr-stat-label">Years of Excellence</span>
          </div>
          <div className="blr-stat">
            <Sparkles size={28} />
            <span className="blr-stat-num">2×</span>
            <span className="blr-stat-label">Best Website Award</span>
          </div>
          <div className="blr-stat">
            <MapPin size={28} />
            <span className="blr-stat-num">R10</span>
            <span className="blr-stat-label">IEEE Region</span>
          </div>
        </div>
      </div>
    </section>
  )
}
