import { useEffect, useRef, useState } from 'react'
import { Rocket, ExternalLink, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/flagship.css'

gsap.registerPlugin(ScrollTrigger)

const PROGRAMS = [
  {
    id: 'house-of-cards',
    title: 'House of Cards',
    accent: '#8B5CF6',
    description:
      'A simulation of a political scenario with real world problems. As citizens, we all have voices — we give you the stage to speak about these problems, voice your opinion, ideas and question the happenings around you.',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSdstCW-NPK_sd3n7chovldbZDkAjZFc6d2rtTO8y_VAGluPjQ/viewform',
  },
  {
    id: 'ieeextreme',
    title: 'IEEEXtreme 16.0',
    accent: '#00E5FF',
    description:
      'A global challenge where teams of IEEE Student members compete to solve programming problems in 24 hours. Select school as "A48251 - Sri Jayachamarajendra College of Engineering".',
    href: 'https://xtreme.vtools.ieee.org/',
  },
  {
    id: 'hac-sac',
    title: 'HAC SAC 2.0',
    accent: '#EC4899',
    description:
      'IEEE Bangalore Section\'s virtual hackathon is back with HAC SAC 2.0 — prizes worth ₹35k up for grabs. If you are fond of challenges, this one is for you.',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSeHELToMMwRYAyvdVOBvTBsHUOFXk8UONSIYrlR85oR3JmcGA/viewform',
  },
]

export default function FlagshipSection() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)
  const program = PROGRAMS[active]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.flg-header > *',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.flg-header',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        '.flg-stage',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.flg-stage',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="flagship" ref={sectionRef} className="flg-section">
      <div className="flg-inner">
        <div className="flg-header">
          <Rocket size={22} className="flg-header-icon" />
          <h2 className="flg-title">Flagship Programs</h2>
          <p className="flg-subtitle">Competitions and initiatives from IEEE Bangalore Section — select a program to explore.</p>
        </div>

        <div className="flg-stage">
          <div className="flg-tabs" role="tablist">
            {PROGRAMS.map((p, i) => (
              <button
                key={p.id}
                role="tab"
                aria-selected={active === i}
                className={`flg-tab ${active === i ? 'flg-tab-active' : ''}`}
                style={{ '--tab-accent': p.accent }}
                onClick={() => setActive(i)}
              >
                <span className="flg-tab-num">{String(i + 1).padStart(2, '0')}</span>
                {p.title}
              </button>
            ))}
          </div>

          <div
            className="flg-panel"
            key={program.id}
            style={{ '--panel-accent': program.accent }}
          >
            <div className="flg-panel-glow" aria-hidden="true" />
            <span className="flg-panel-label">Featured Program</span>
            <h3>{program.title}</h3>
            <p>{program.description}</p>
            <a
              href={program.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flg-register"
            >
              Register Now <ExternalLink size={16} />
            </a>
            <div className="flg-nav-hint">
              {PROGRAMS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`flg-dot ${active === i ? 'flg-dot-active' : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={`Show program ${i + 1}`}
                />
              ))}
              {active < PROGRAMS.length - 1 && (
                <button type="button" className="flg-next" onClick={() => setActive((a) => a + 1)}>
                  Next <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
