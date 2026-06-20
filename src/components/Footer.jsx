import { Instagram, Facebook, Linkedin, Youtube, MapPin, Mail, Phone } from 'lucide-react'
import '../styles/footer.css'

const LINKS = [
  { label: 'JSS STU', href: 'https://jssstuniv.in/' },
  { label: 'IEEE.org', href: 'https://www.ieee.org/' },
  { label: 'IEEE WIE', href: 'https://wie.ieee.org/' },
  { label: 'IEEE Standards', href: 'https://standards.ieee.org/' },
  { label: 'IEEE Xplore', href: 'https://ieeexplore.ieee.org/Xplore/home.jsp' },
  { label: 'IEEE EDS', href: 'https://eds.ieee.org/' },
  { label: 'IEEE SPS', href: 'https://signalprocessingsociety.org/' },
  { label: 'IEEE Bangalore', href: 'https://ieeebangalore.org/' },
  { label: 'IEEE RAS', href: 'http://www.ieee-ras.org/' },
]

const SOCIAL = [
  { icon: <Instagram size={18} />, href: 'https://www.instagram.com/ieee_sjce/', label: 'Instagram' },
  { icon: <Facebook size={18} />, href: 'https://www.facebook.com/ieeesjce/', label: 'Facebook' },
  { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/company/ieee-sjce/mycompany/', label: 'LinkedIn' },
  { icon: <Youtube size={18} />, href: 'https://www.youtube.com/user/IEEESJCE', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft-stripe" aria-hidden="true" />

      <div className="ft-main">
        <div className="ft-brand">
          <h2 className="ft-logo">IEEE-SJCE</h2>
          <p className="ft-tagline">Innovate · Inspire · Engineer</p>
        </div>

        <div className="ft-col">
          <h3 className="ft-col-title">Address</h3>
          <address className="ft-address">
            <p><MapPin size={14} /> IEEE-SJCE Student Branch</p>
            <p>Sri Jayachamarajendra College of Engineering</p>
            <p>Mysuru, 570006</p>
            <p><Phone size={14} /> +(91) 7795317819</p>
            <p>
              <Mail size={14} />
              <a href="mailto:ieeesjce2019@gmail.com">ieeesjce2019@gmail.com</a>
            </p>
          </address>
        </div>

        <div className="ft-col">
          <h3 className="ft-col-title">Important Links</h3>
          <nav className="ft-links">
            {LINKS.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="ft-col">
          <h3 className="ft-col-title">Follow Us</h3>
          <div className="ft-social">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="ft-bottom">
        <p>© 2026 IEEE-SJCE · Developed by the WBD Board at IEEE-SJCE</p>
      </div>
    </footer>
  )
}
