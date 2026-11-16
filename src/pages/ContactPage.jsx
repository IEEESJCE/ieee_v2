import { useEffect, useRef } from 'react'
import { Mail, Phone, Instagram, Linkedin, MessageCircle, MapPin } from 'lucide-react'
import gsap from 'gsap'
import '../styles/contact.css'

const CHANNELS = [
  { icon: Mail, label: 'Email', value: 'ieeesjce2019@gmail.com', href: 'mailto:ieeesjce2019@gmail.com', accent: '#00E5FF' },
  { icon: Phone, label: 'Phone', value: '09972373829', href: 'tel:09972373829', accent: '#3B82F6' },
  { icon: Instagram, label: 'Instagram', value: '@ieee_sjce', href: 'https://www.instagram.com/ieee_sjce/', accent: '#EC4899' },
  { icon: Linkedin, label: 'LinkedIn', value: 'IEEE-SJCE', href: 'https://www.linkedin.com/company/ieee-sjce/', accent: '#60A5FA' },
]

export default function ContactPage() {
  const headerRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    gsap.fromTo(
      '.cnt-hero > *',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.15 }
    )
    gsap.fromTo(
      '.cnt-chip',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
    )
    gsap.fromTo(
      '.cnt-map-card',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.45 }
    )
  }, [])

  return (
    <>
      <div className="cnt-page">
        <header ref={headerRef} className="cnt-hero">
          <MessageCircle size={32} className="cnt-hero-icon" />
          <h1>Let&apos;s Connect</h1>
          <p>Reach out through our official channels or visit us at our campus branch.</p>
        </header>

        <div className="cnt-container">
          {/* Contact Channels Grid */}
          <div className="cnt-channels-grid">
            {CHANNELS.map((ch) => {
              const ChIcon = ch.icon
              return (
                <a
                  key={ch.label}
                  href={ch.href}
                  className="cnt-chip"
                  style={{ '--chip-accent': ch.accent }}
                  target={ch.href.startsWith('http') ? '_blank' : undefined}
                  rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <div className="cnt-chip-icon">
                    <ChIcon size={22} />
                  </div>
                  <div className="cnt-chip-text">
                    <span>{ch.label}</span>
                    <strong>{ch.value}</strong>
                  </div>
                </a>
              )
            })}
          </div>

          {/* Interactive Map */}
          <div className="cnt-map-card">
            <div className="cnt-map-header">
              <MapPin size={18} className="cnt-map-pin" />
              <span>Sri Jayachamarajendra College of Engineering (SJCE), JSS STU, Mysuru 570006</span>
            </div>
            <iframe
              title="JSS STU Mysuru"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15592.149409781525!2d76.6134265!3d12.3132715!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1ad797cbfc78d07a!2sJSS%20Science%20and%20Technology%20University%2C%20Mysuru.!5e0!3m2!1sen!2sin!4v1567658298958!5m2!1sen!2sin"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </>
  )
}
