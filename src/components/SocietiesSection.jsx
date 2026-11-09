import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Cpu, Users, Bot, Radio, Rocket, Monitor, Network, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/societies-section.css'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────
   OUR SOCIETIES — home page tiles for the IEEE wings at SJCE.
   Names, colours, icons and taglines match the Societies page (src/pages/SocietiesPage.jsx).
   `to`: where the tile links. Computer Society is new and not on the Societies page yet,
   so it has no link (shown with a NEW tag) until that page gets its content.
   ───────────────────────────────────────────── */
const WINGS = [
  { short: 'EDS',  name: 'Electron Devices Society',                icon: Cpu,     accent: '#00E5FF', tagline: 'Semiconductors, circuits & hands-on hardware.', to: '/societies' },
  { short: 'WIE',  name: 'Women in Engineering',                    icon: Users,   accent: '#EC4899', tagline: 'Empowering women in STEM globally.',           to: '/societies' },
  { short: 'RAS',  name: 'Robotics & Automation Society',           icon: Bot,     accent: '#00F5D4', tagline: 'Robotics, automation & intelligent systems.',   to: '/societies' },
  { short: 'SPS',  name: 'Signal Processing Society',               icon: Radio,   accent: '#60A5FA', tagline: 'Signals, analysis & real-world models.',        to: '/societies' },
  { short: 'AESS', name: 'Aerospace & Electronic Systems Society',  icon: Rocket,  accent: '#F59E0B', tagline: 'Aerospace, radar & avionics systems.',          to: '/societies' },
  { short: 'CS',   name: 'Computer Society',                        icon: Monitor, accent: '#8B5CF6', tagline: 'Computing, software & emerging technologies.',  to: null, isNew: true },
]

function WingTile({ wing }) {
  const Icon = wing.icon
  const body = (
    <>
      <div className="sct-tile-top">
        <span className="sct-tile-icon" aria-hidden="true">
          <Icon size={22} />
        </span>
        {wing.isNew && <span className="sct-tile-new">NEW</span>}
      </div>
      <span className="sct-tile-short">{wing.short}</span>
      <h3 className="sct-tile-name">{wing.name}</h3>
      <p className="sct-tile-tagline">{wing.tagline}</p>
      {wing.to && (
        <span className="sct-tile-cta">
          Explore <ArrowRight size={14} aria-hidden="true" />
        </span>
      )}
    </>
  )

  return wing.to ? (
    <Link to={wing.to} className="sct-tile sct-tile-link" style={{ '--wing-accent': wing.accent }}>
      {body}
    </Link>
  ) : (
    <article className="sct-tile" style={{ '--wing-accent': wing.accent }}>
      {body}
    </article>
  )
}

export default function SocietiesSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    // Fade the header and tiles up when the section scrolls into view (skipped for reduced motion)
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        '.sct-header > *',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.sct-header', start: 'top 88%', toggleActions: 'play none none none' },
        }
      )
      gsap.fromTo(
        '.sct-tile',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.sct-grid', start: 'top 85%', toggleActions: 'play none none none' },
        }
      )
    }, sectionRef)
    return () => mm.revert()
  }, [])

  return (
    <section id="societies" ref={sectionRef} className="sct-section">
      <div className="sct-inner">
        <div className="sct-header">
          <span className="sct-badge">
            <Network size={14} aria-hidden="true" /> IEEE Wings at SJCE
          </span>
          <h2 className="sct-title">Our Societies</h2>
          <p className="sct-subtitle">
            Specialised IEEE societies under the IEEE-SJCE Student Branch, each running its own
            workshops, talks and competitions.
          </p>
        </div>

        <div className="sct-grid">
          {WINGS.map((wing) => (
            <WingTile key={wing.short} wing={wing} />
          ))}
        </div>
      </div>
    </section>
  )
}
