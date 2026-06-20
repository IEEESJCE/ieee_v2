import { useEffect, useRef, useState } from 'react'
import { Mail, Phone, Instagram, Linkedin, Send, MessageCircle } from 'lucide-react'
import gsap from 'gsap'
import '../styles/contact.css'

const CONTACT_EMAIL = 'kumarsubrato1103@gmail.com'

const CHANNELS = [
  { icon: Mail, label: 'Email', value: 'ieeesjce2019@gmail.com', href: 'mailto:ieeesjce2019@gmail.com', accent: '#00E5FF' },
  { icon: Phone, label: 'Phone', value: '+91 7795317819', href: 'tel:+917795317819', accent: '#3B82F6' },
  { icon: Instagram, label: 'Instagram', value: '@ieee_sjce', href: 'https://www.instagram.com/ieee_sjce/', accent: '#EC4899' },
  { icon: Linkedin, label: 'LinkedIn', value: 'IEEE-SJCE', href: 'https://www.linkedin.com/company/ieee-sjce/', accent: '#60A5FA' },
]

export default function ContactPage() {
  const headerRef = useRef(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    gsap.fromTo(
      '.cnt-hero > *',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.15 }
    )
    gsap.fromTo(
      '.cnt-bento > *',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', delay: 0.4 }
    )
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = `Name: ${name}\nPhone: ${phone}\nMessage: ${message}`
    window.open(`mailto:${CONTACT_EMAIL}?subject=Website Query&body=${encodeURIComponent(body)}`)
  }

  return (
    <>
      <div className="cnt-page">
        <header ref={headerRef} className="cnt-hero">
          <MessageCircle size={28} className="cnt-hero-icon" />
          <h1>Let&apos;s Connect</h1>
          <p>Questions, collaborations, or just a hello — we&apos;re one message away.</p>
        </header>

        <div className="cnt-bento">
          <form className="cnt-form-card" onSubmit={handleSubmit}>
            <h2>Send a Message</h2>
            <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="tel" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <textarea placeholder="Your message..." rows={4} value={message} onChange={(e) => setMessage(e.target.value)} required />
            <button type="submit" className="nb-btn nb-btn-accent">
              Send <Send size={14} />
            </button>
          </form>

          <div className="cnt-side">
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
                  <ChIcon size={20} />
                  <div>
                    <span>{ch.label}</span>
                    <strong>{ch.value}</strong>
                  </div>
                </a>
              )
            })}
          </div>

          <div className="cnt-map-card">
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
