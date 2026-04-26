import { useState, useEffect, useRef } from 'react'
import { Menu, X, ArrowRight, Moon, Sun } from 'lucide-react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import gsap from 'gsap'
import '../styles/layout.css'

/* ─────────────────────────────────────────────
   Dark Mode Hook
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

/* ─────────────────────────────────────────────
   Navbar
   ───────────────────────────────────────────── */
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
    if (window.innerWidth >= 768) {
      tl.fromTo(linksRef.current.children, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.06 }, '-=0.3')
    }
    tl.fromTo(joinRef.current, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 }, '-=0.2')
  }, [])

  const NAV_LINKS = [
    { label: 'Home', route: '/home' },
    { label: 'Events', route: '/home', hash: '#events-section' },
    { label: 'Societies', route: '/societies' },
    { label: 'About', route: '#' },
    { label: 'Team', route: '#' },
    { label: 'Contact', route: '#' },
  ]

  const isActive = (link) => {
    if (link.route === '/home' && !link.hash) return location.pathname === '/home'
    if (link.route === '/societies') return location.pathname === '/societies'
    return false
  }

  const handleNavClick = (e, link) => {
    e.preventDefault()
    setMobileOpen(false)
    if (link.hash && location.pathname === '/home') {
      document.querySelector(link.hash)?.scrollIntoView({ behavior: 'smooth' })
    } else if (link.hash) {
      navigate('/home')
      setTimeout(() => document.querySelector(link.hash)?.scrollIntoView({ behavior: 'smooth' }), 300)
    } else if (link.route !== '#') {
      navigate(link.route)
    }
  }

  return (
    <>
      <nav className="nb-nav">
        <div className="nb-nav-inner">
          <div ref={logoRef} className="nb-nav-logo"
            onClick={() => navigate('/home')} role="button" tabIndex={0}>
            <img src="/logo.png" alt="IEEE SJCE" className="nb-logo-img" />
            <span className="nb-logo-text glitch-hover">IEEE SJCE</span>
          </div>

          <div ref={linksRef} className="nb-nav-links">
            {NAV_LINKS.map((link) => (
              <a key={link.label}
                href={link.route}
                className={isActive(link) ? 'active' : ''}
                onClick={(e) => handleNavClick(e, link)}
              >{link.label}</a>
            ))}
          </div>

          <div className="nb-nav-right">
            <button className="nb-theme-toggle" onClick={toggleTheme}
              title={isDark ? 'Switch to light' : 'Switch to dark'}>
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button ref={joinRef} className="nb-btn nb-btn-accent">
              JOIN US <ArrowRight size={14} />
            </button>
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
          <a key={link.label}
            href={link.route}
            className={isActive(link) ? 'active' : ''}
            onClick={(e) => handleNavClick(e, link)}
          >{link.label}</a>
        ))}
        <button className="nb-theme-toggle" onClick={toggleTheme}
          style={{ marginTop: 8, width: 'auto', padding: '10px 20px' }}>
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
          <span style={{ marginLeft: 8, fontFamily: 'var(--font-body)', fontSize: 14 }}>
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
        <button className="nb-btn nb-btn-accent" onClick={() => setMobileOpen(false)}>
          JOIN US <ArrowRight size={14} />
        </button>
      </div>
    </>
  )
}

/* ─────────────────────────────────────────────
   Layout (wraps all pages)
   ───────────────────────────────────────────── */
export default function Layout() {
  const [isDark, setIsDark] = useDarkMode()

  return (
    <div className="nb-layout">
      <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      <Outlet />
    </div>
  )
}
