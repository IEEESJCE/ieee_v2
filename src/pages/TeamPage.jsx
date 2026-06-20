import { useState, useEffect, useRef } from 'react'
import { current_team_photo } from '../components/team_photo'
import '../styles/team.css'

/* ─── Category config ─── */
const CATEGORIES = [
  { key: 'all',                              label: 'All',                  color: '#2563EB' },
  { key: 'executive_committee',              label: 'Executive Committee',  color: '#2563EB' },
  { key: 'signal_processing_society',        label: 'Signal Processing',    color: '#0369A1' },
  { key: 'robotics_and_automation_society',  label: 'Robotics & Automation',color: '#1D4ED8' },
  { key: 'electron_devices_society',         label: 'Electron Devices',     color: '#0284C7' },
  { key: 'women_in_engineering',             label: 'WIE',                  color: '#4F46E5' },
  { key: 'editorial_board',                  label: 'Editorial Board',      color: '#1E3A8A' },
  { key: 'membership_development_committee', label: 'MDC',                  color: '#0EA5E9' },
  { key: 'web_development_board',            label: 'Web Dev Board',        color: '#00C2FF' },
]
const CAT_MAP   = Object.fromEntries(CATEGORIES.map(c => [c.key, c]))
const CAT_DISPLAY = {
  executive_committee:              'Executive Committee',
  signal_processing_society:        'Signal Processing Society',
  robotics_and_automation_society:  'Robotics & Automation Society',
  electron_devices_society:         'Electron Devices Society',
  women_in_engineering:             'Women in Engineering',
  editorial_board:                  'Editorial Board',
  membership_development_committee: 'Membership Development Committee',
  web_development_board:            'Web Development Board',
}

/* ─── Icons ─── */
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  )
}

/* ─── Lazy photo ─── */
function LazyPhoto({ src, alt }) {
  const [status, setStatus] = useState('idle')
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!src) { setStatus('error'); return }
    const el = wrapRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatus('loading'); obs.disconnect() } },
      { rootMargin: '400px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [src])

  const showPlaceholder = !src || status === 'error' || status === 'idle'
  const imgVisible = status === 'loading' || status === 'loaded'

  return (
    <div ref={wrapRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      {showPlaceholder && (
        <div className="tmc-photo-placeholder" aria-hidden="true">
          <span className="tmc-photo-placeholder-letter">{alt?.charAt(0) ?? '?'}</span>
        </div>
      )}
      {imgVisible && (
        <img
          className={`tmc-photo-img ${status}`}
          src={src}
          alt={alt}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top' }}
        />
      )}
    </div>
  )
}

/* ─── Member Card ─── */
function MemberCard({ member, color }) {
  const hasLinkedin = member.linkedin &&
    member.linkedin !== 'Nil' &&
    member.linkedin.trim() !== ''

  const hasGmail = member.gmail && member.gmail.trim() !== ''

  const linkedinUrl = hasLinkedin
    ? (member.linkedin.startsWith('http') ? member.linkedin : `https://${member.linkedin}`)
    : null

  return (
    <div className="tmc-wrap" style={{ '--card-accent': color }}>
      {/* Neo-brutalist offset shadow block */}
      <div className="tmc-shadow" aria-hidden="true" />

      <div className="tmc" role="article" aria-label={`${member.name} – ${member.post}`}>

        {/* ── Body: photo + info ── */}
        <div className="tmc-body">

          {/* Photo frame */}
          <div className="tmc-photo-frame">
            <LazyPhoto src={member.src} alt={member.name} />
          </div>

          {/* Info */}
          <div className="tmc-info">
            <p className="tmc-name">{member.name}</p>
            <div className="tmc-role-badge">
              <span className="tmc-role-text">{member.post}</span>
            </div>
          </div>
        </div>

        {/* ── Footer buttons — always visible ── */}
        <div className="tmc-footer">
          {hasLinkedin ? (
            <a
              className="tmc-btn"
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              onClick={e => e.stopPropagation()}
            >
              <span className="tmc-btn-icon"><LinkedInIcon /></span>
              LINKEDIN
            </a>
          ) : (
            <span className="tmc-btn disabled" aria-hidden="true">
              <span className="tmc-btn-icon"><LinkedInIcon /></span>
              LINKEDIN
            </span>
          )}

          {hasGmail ? (
            <a
              className="tmc-btn"
              href={`mailto:${member.gmail}`}
              aria-label={`Email ${member.name}`}
              onClick={e => e.stopPropagation()}
            >
              <span className="tmc-btn-icon"><MailIcon /></span>
              EMAIL
            </a>
          ) : (
            <span className="tmc-btn disabled" aria-hidden="true">
              <span className="tmc-btn-icon"><MailIcon /></span>
              EMAIL
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Section with scroll-reveal ─── */
function TeamSection({ categoryKey, members, color }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold: 0.04, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="team-section" style={{ '--section-color': color }}>
      <div className="team-section-header">
        <div className="team-section-accent" />
        <h2 className="team-section-label">{CAT_DISPLAY[categoryKey] || categoryKey}</h2>
        <div className="team-section-line" />
        <span className="team-section-count">{members.length}</span>
      </div>
      <div className="team-grid">
        {members.map((m, i) => (
          <MemberCard key={`${m.name}-${i}`} member={m} color={color} />
        ))}
      </div>
    </section>
  )
}

/* ─── Team Page ─── */
export default function TeamPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const grouped = {}
  current_team_photo.forEach(m => {
    if (!grouped[m.type]) grouped[m.type] = []
    grouped[m.type].push(m)
  })

  const totalMembers = current_team_photo.length
  const activeCats   = CATEGORIES.filter(c => c.key === 'all' || grouped[c.key])
  const renderKeys   = activeCategory === 'all'
    ? Object.keys(grouped)
    : Object.keys(grouped).filter(k => k === activeCategory)

  return (
    <div className="team-page">

      <header className="team-hero">
        <div className="team-hero-badge">⚡ IEEE SJCE · 2025–26</div>
        <h1>Our <em>Team</em></h1>
        <p>The dedicated minds driving innovation at IEEE SJCE — students leading change, one project at a time.</p>
        <span className="team-hero-count">
          ✦ {totalMembers} members · {Object.keys(grouped).length} divisions
        </span>
      </header>

      <nav className="team-tabs-wrap" aria-label="Filter by division">
        <div className="team-tabs">
          {activeCats.map(cat => (
            <button
              key={cat.key}
              data-cat={cat.key}
              className={`team-tab-btn${activeCategory === cat.key ? ' active' : ''}`}
              style={activeCategory === cat.key ? { '--tab-color': cat.color } : {}}
              onClick={() => setActiveCategory(cat.key)}
              aria-pressed={activeCategory === cat.key}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="team-content">
        {renderKeys.map(key => (
          <TeamSection
            key={key}
            categoryKey={key}
            members={grouped[key]}
            color={CAT_MAP[key]?.color ?? '#2563EB'}
          />
        ))}
      </main>
    </div>
  )
}
