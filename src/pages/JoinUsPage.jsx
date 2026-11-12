import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  UserPlus,
  Globe,
  Wrench,
  Trophy,
  Users,
  BookOpen,
  Briefcase,
  ArrowRight,
  ArrowUpRight,
  Handshake,
  Presentation,
  Sprout,
  Info,
} from 'lucide-react'
import gsap from 'gsap'
import { MEMBERSHIP_DRIVE_URL } from '../components/Layout'
import '../styles/joinus.css'

const PERKS = [
  { icon: Globe, title: 'Global Network', text: 'Connect with 400,000+ IEEE members, professionals and researchers across 160+ countries.', accent: '#00E5FF' },
  { icon: Wrench, title: 'Hands-on Workshops', text: 'Build real projects in robotics, IoT, signal processing, embedded systems and more.', accent: '#3B82F6' },
  { icon: Trophy, title: 'Competitions', text: 'Take part in hackathons, quizzes and flagship events — and compete at the national level.', accent: '#EC4899' },
  { icon: BookOpen, title: 'IEEE Xplore & Resources', text: 'Access research papers, magazines, standards and member-only learning resources.', accent: '#00F5D4' },
  { icon: Users, title: 'Leadership', text: 'Lead societies, organise events and grow as a team player and communicator.', accent: '#60A5FA' },
  { icon: Briefcase, title: 'Career Edge', text: 'Mentorship, industry talks, internships and a résumé that stands out.', accent: '#F59E0B' },
]

const SOCIETIES = ['Student Branch', 'EDS', 'RAS', 'SPS', 'AESS', 'WIE', 'CS']

// Paste the ExeCom recruitment Google Form link here when it opens.
// While empty, the button shows a "not recruiting" notice instead.
const EXECOM_FORM_URL = ''

const EXECOM_POINTS = [
  { icon: Handshake, title: 'Lead the Branch', text: 'Join the Executive Committee and help shape the direction of IEEE-SJCE.', accent: '#00E5FF' },
  { icon: Presentation, title: 'Teach Your Peers', text: 'Run sessions and workshops, and share what you know with fellow students.', accent: '#3B82F6' },
  { icon: Sprout, title: 'Grow With Us', text: 'Plan events, manage teams and build skills that last well beyond college.', accent: '#00F5D4' },
]

const STEPS = [
  { num: '01', title: 'Fill the Form', text: 'Register through the Membership Drive form with your details.' },
  { num: '02', title: 'Pick Societies', text: 'Choose the technical societies that match your interests.' },
  { num: '03', title: 'Get Onboarded', text: 'Our team reaches out with next steps and membership details.' },
  { num: '04', title: 'Start Building', text: 'Join events, workshops and projects from day one.' },
]

export default function JoinUsPage() {
  const [showNotice, setShowNotice] = useState(false)
  const noticeTimer = useRef(null)

  const handleExecomClick = () => {
    if (EXECOM_FORM_URL) {
      window.open(EXECOM_FORM_URL, '_blank', 'noopener,noreferrer')
      return
    }
    setShowNotice(true)
    clearTimeout(noticeTimer.current)
    noticeTimer.current = setTimeout(() => setShowNotice(false), 5000)
  }

  useEffect(() => () => clearTimeout(noticeTimer.current), [])

  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.fromTo('.jn-hero > *', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.15 })
      gsap.fromTo('.jn-perk', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.35 })
      gsap.fromTo('.jn-step', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.55 })
      gsap.fromTo('.jn-cta-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.7 })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="jn-page">
      <header className="jn-hero">
        <UserPlus size={32} className="jn-hero-icon" />
        <span className="jn-kicker">Membership Drive 2027</span>
        <h1>Join IEEE-SJCE</h1>
        <p>Become part of a community that innovates, inspires and engineers. Learn, build and lead with the world&apos;s largest technical professional organisation.</p>
        <div className="jn-hero-buttons">
          <a href={MEMBERSHIP_DRIVE_URL} target="_blank" rel="noopener noreferrer" className="nb-btn nb-btn-accent">
            REGISTER NOW <ArrowUpRight size={14} />
          </a>
          <Link to="/societies" className="nb-btn nb-btn-blue">
            EXPLORE SOCIETIES
          </Link>
        </div>
      </header>

      <div className="jn-container">
        <section>
          <h2 className="jn-section-title">Why Join?</h2>
          <div className="jn-perks-grid">
            {PERKS.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.title} className="jn-perk" style={{ '--chip-accent': p.accent }}>
                  <div className="jn-perk-icon"><Icon size={22} /></div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section>
          <h2 className="jn-section-title">Our Societies</h2>
          <div className="jn-soc-row">
            {SOCIETIES.map((s) => (
              <Link key={s} to="/societies" className="jn-soc-tag">{s}</Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="jn-section-title">How to Join</h2>
          <div className="jn-steps-grid">
            {STEPS.map((s) => (
              <div key={s.num} className="jn-step">
                <span className="jn-step-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="jn-cta-card">
          <h2>Ready to get started?</h2>
          <p>Registrations for the Membership Drive 2027 are open. Secure your spot today.</p>
          <a href={MEMBERSHIP_DRIVE_URL} target="_blank" rel="noopener noreferrer" className="nb-btn nb-btn-accent">
            OPEN REGISTRATION FORM <ArrowRight size={14} />
          </a>
        </div>

        <section className="jn-work">
          <h2 className="jn-section-title">Work With Us</h2>
          <p className="jn-work-intro">
            Want to do more than attend? Become an ExeCom member, work alongside the core team,
            teach your peers and grow together with IEEE-SJCE.
          </p>
          <div className="jn-perks-grid">
            {EXECOM_POINTS.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.title} className="jn-perk" style={{ '--chip-accent': p.accent }}>
                  <div className="jn-perk-icon"><Icon size={22} /></div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              )
            })}
          </div>
          <div className="jn-work-action">
            <button type="button" className="nb-btn nb-btn-blue" onClick={handleExecomClick}>
              BECOME AN EXECOM NOW <ArrowRight size={14} />
            </button>
            <div className={`jn-notice ${showNotice ? 'show' : ''}`} role="status" aria-live="polite">
              <Info size={18} />
              <span>We appreciate your enthusiasm, but we are not recruiting right now. Stay tuned!</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
