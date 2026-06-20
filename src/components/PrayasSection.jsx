import { useEffect, useRef, useState } from 'react'
import { Heart, BookOpen, Sparkles, MapPin, Users } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/prayas.css'

gsap.registerPlugin(ScrollTrigger)

const TABS = [
  {
    id: 'about',
    label: 'About Prayas',
    icon: <Heart size={18} />,
    accent: '#EC4899',
    content: (
      <>
        <p>An effort by our team to provide underprivileged students with a positive learning environment that helps them unleash their potential.</p>
        <ul>
          <li>Frequent visits to Divya Deepa and Vijaya Educational Institution.</li>
          <li>Helping kids with functional English and extracurricular activities.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'what',
    label: 'What We Do',
    icon: <BookOpen size={18} />,
    accent: '#8B5CF6',
    content: (
      <ul>
        <li>Support in academics.</li>
        <li>Introduce fun learning techniques.</li>
        <li>Aim to achieve overall development.</li>
      </ul>
    ),
  },
  {
    id: 'why',
    label: 'Why Prayas',
    icon: <Sparkles size={18} />,
    accent: '#00F5D4',
    content: (
      <ul>
        <li>Work satisfaction.</li>
        <li>Adds value to your profile.</li>
        <li>Best platform to develop communication with society.</li>
        <li>A good start or continuity of your interest to serve the society.</li>
      </ul>
    ),
  },
]

export default function PrayasSection() {
  const sectionRef = useRef(null)
  const [activeTab, setActiveTab] = useState('about')
  const active = TABS.find((t) => t.id === activeTab)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pry-header > *',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pry-header',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        '.pry-panel, .pry-tabs',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pry-body',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="prayas" ref={sectionRef} className="pry-section">
      <div className="pry-glow" aria-hidden="true" />

      <div className="pry-inner">
        <div className="pry-header">
          <span className="pry-badge">
            <Users size={14} />
            IEEE-SJCE WIE Outreach
          </span>
          <h2 className="pry-title">Prayas</h2>
          <p className="pry-lead">
            PRAYAS is an outreach program by IEEE-SJCE WIE that provides equitable education
            outcomes to underprivileged children. Volunteers visit an orphanage every week to
            interact with students and support their academic activities.
          </p>
          <div className="pry-pills">
            <span><MapPin size={14} /> Divya Deepa</span>
            <span><MapPin size={14} /> Vijaya Educational Institution</span>
          </div>
        </div>

        <div className="pry-body">
          <div className="pry-tabs" role="tablist" aria-label="Prayas information">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`pry-tab ${activeTab === tab.id ? 'pry-tab-active' : ''}`}
                style={{ '--tab-accent': tab.accent }}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="pry-tab-icon">{tab.icon}</span>
                <span className="pry-tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          <div
            className="pry-panel"
            role="tabpanel"
            style={{ '--panel-accent': active.accent }}
            key={activeTab}
          >
            <div className="pry-panel-head">
              <span className="pry-panel-icon">{active.icon}</span>
              <h3>{active.label}</h3>
            </div>
            <div className="pry-panel-body">{active.content}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
