import { useState, useEffect, useRef } from 'react'
import { Menu, X, ArrowRight, Moon, Sun } from 'lucide-react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import gsap from 'gsap'
import '../styles/layout.css'

/* ─────────────────────────────────────────────
   Dark Mode Hook (persists via localStorage)
   ───────────────────────────────────────────── */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('ieee-theme')
    return saved ? saved === 'dark' : true
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.remove('light')
    } else {
      root.classList.add('light')
    }
    localStorage.setItem('ieee-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return [isDark, setIsDark]
}

const NAV_LINKS = [
  { label: 'Home', route: '/home' },
  { label: 'Events', route: '/home', hash: '#events-section' },
  { label: 'Gallery', route: '/gallery' },
  { label: 'Societies', route: '/societies' },
  { label: 'Boards', route: '/boards' },
  { label: 'Team', route: '/team' },
  { label: 'Contact', route: '/contact' },
]

function scrollToSection(hash) {
  if (!hash) return
  document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Navbar({ isDark, toggleTheme }) {
  const navigate = useNavigate()
  const location = useLocation()
  const logoRef = useRef(null)
  const linksRef = useRef(null)
  const joinRef = useRef(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(logoRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 })
    if (window.innerWidth >= 768 && linksRef.current) {
      tl.fromTo(
        linksRef.current.children,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06 },
        '-=0.3'
      )
    }
    if (joinRef.current) {
      tl.fromTo(joinRef.current, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 }, '-=0.2')
    }
  }, [])

  const isActive = (link) => {
    if (link.hash) return false
    return location.pathname === link.route
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
            <span className="nb-logo-text glitch-hover">IEEE SJCE</span>
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

          <div ref={joinRef} className="nb-nav-right">
            <button
              className="nb-theme-toggle"
              onClick={toggleTheme}
              title={isDark ? 'Switch to light' : 'Switch to dark'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScyUvp_2L7Mw3ENLSANaXTQiZmqJJFhxETfKFOXWl9o8wn3Uw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="nb-btn nb-btn-accent"
            >
              JOIN US <ArrowRight size={14} />
            </a>
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
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScyUvp_2L7Mw3ENLSANaXTQiZmqJJFhxETfKFOXWl9o8wn3Uw/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="nb-btn nb-btn-accent"
          style={{ marginTop: '8px' }}
        >
          JOIN US <ArrowRight size={14} />
        </a>
      </div>
    </>
  )
}

export default function Layout() {
  const [isDark, setIsDark] = useDarkMode()
  const toggleTheme = () => setIsDark((prev) => !prev)

  return (
    <div className="nb-layout">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <Outlet />
    </div>
  )
}
