import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import gsap from 'gsap'
import '../styles/layout.css'

/* Always dark theme */
export function useDarkMode() {
  useEffect(() => {
    document.documentElement.classList.remove('light')
    localStorage.setItem('ieee-theme', 'dark')
  }, [])
  return [true, () => {}]
}

const NAV_LINKS = [
  { label: 'Home', route: '/home' },
  { label: 'Events', route: '/home', hash: '#events-section' },
  { label: 'Gallery', route: '/gallery' },
  { label: 'Societies', route: '/societies' },
  { label: 'Boards', route: '/boards' },
  { label: 'Contact', route: '/contact' },
]

function scrollToSection(hash) {
  if (!hash) return
  document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const logoRef = useRef(null)
  const linksRef = useRef(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(logoRef.current, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 })
    if (window.innerWidth >= 768 && linksRef.current) {
      tl.fromTo(
        linksRef.current.children,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.05 },
        '-=0.25'
      )
    }
  }, [])

  const NAV_LINKS = [
    { label: 'Home', route: '/' },
    { label: 'Events', route: '/', hash: '#events-section' },
    { label: 'Societies', route: '/societies' },
    { label: 'About', route: '#' },
    { label: 'Team', route: '/team' },
    { label: 'Contact', route: '#' },
  ]

  const isActive = (link) => {
    if (link.route === '/' && !link.hash) return location.pathname === '/'
    if (link.route === '/societies') return location.pathname === '/societies'
    if (link.route === '/team') return location.pathname === '/team'
    return false
  }

  const handleNavClick = (e, link) => {
    e.preventDefault()
    setMobileOpen(false)

    if (link.hash) {
      if (location.pathname === '/home') {
        scrollToSection(link.hash)
        window.history.replaceState(null, '', `/home${link.hash}`)
      } else {
        navigate(`/home${link.hash}`)
      }
      return
    }

    if (link.route !== '#') navigate(link.route)
  }

  return (
    <>
      <nav className="nb-nav">
        <div className="nb-nav-inner">
          <div
            ref={logoRef}
            className="nb-nav-logo"
            onClick={() => navigate('/home')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/home')}
          >
            <img src="/logo.png" alt="IEEE SJCE" className="nb-logo-img" />
            <span className="nb-logo-text">IEEE SJCE</span>
          </div>

          <div ref={linksRef} className="nb-nav-links">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.hash ? `${link.route}${link.hash}` : link.route}
                className={isActive(link) ? 'active' : ''}
                onClick={(e) => handleNavClick(e, link)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button className="nb-hamburger" onClick={() => setMobileOpen(true)}>
            <Menu size={26} />
          </button>
        </div>
      </nav>

      <div className={`nb-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <button className="nb-mobile-close" onClick={() => setMobileOpen(false)}>
          <X size={28} />
        </button>
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.hash ? `${link.route}${link.hash}` : link.route}
            className={isActive(link) ? 'active' : ''}
            onClick={(e) => handleNavClick(e, link)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  )
}

export default function Layout() {
  useDarkMode()

  return (
    <div className="nb-layout">
      <Navbar />
      <Outlet />
    </div>
  )
}
