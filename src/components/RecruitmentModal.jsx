import { useEffect, useRef } from 'react'
import { X, Instagram, Linkedin, Bell, ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import '../styles/recruitment-modal.css'

export default function RecruitmentModal({ isOpen, onClose }) {
  const overlayRef = useRef(null)
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    // Prevent background scrolling while modal is open
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    // GSAP animated entrance
    if (overlayRef.current && dialogRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      )
      gsap.fromTo(
        dialogRef.current,
        { scale: 0.85, opacity: 0, y: 35 },
        { scale: 1, opacity: 1, y: 0, duration: 0.38, ease: 'back.out(1.6)', delay: 0.05 }
      )
      gsap.fromTo(
        dialogRef.current.querySelectorAll('.rec-stagger'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power3.out', delay: 0.15 }
      )
    }

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose()
    }
  }

  return (
    <div
      ref={overlayRef}
      className="rec-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="rec-modal-title"
    >
      <div ref={dialogRef} className="rec-dialog">
        {/* Top Accent Strip */}
        <div className="rec-stripe" aria-hidden="true" />

        {/* Close Button */}
        <button
          type="button"
          className="rec-close-btn"
          onClick={onClose}
          aria-label="Close notification"
        >
          <X size={18} />
        </button>

        <div className="rec-body">
          {/* Status Badge */}
          <div className="rec-stagger rec-status-badge">
            <span className="rec-pulse-dot" aria-hidden="true" />
            <span className="rec-badge-text">STATUS: NOT CURRENTLY RECRUITING</span>
          </div>

          {/* Heading */}
          <div className="rec-stagger rec-header">
            <div className="rec-icon-box">
              <Bell size={24} />
            </div>
            <h2 id="rec-modal-title" className="rec-title">
              We are currently not recruiting
            </h2>
          </div>

          {/* Message */}
          <p className="rec-stagger rec-message">
            If recruitment does begin, the application link will be updated right over here.
            Till then, for all upcoming fests, technical workshops, and official updates, follow our channels:
          </p>

          {/* Social Channels with neo-brutalist interactive buttons */}
          <div className="rec-stagger rec-social-grid">
            <a
              href="https://www.instagram.com/ieee_sjce/"
              target="_blank"
              rel="noopener noreferrer"
              className="rec-social-card rec-instagram"
            >
              <div className="rec-social-icon-wrap">
                <Instagram size={22} />
              </div>
              <div className="rec-social-info">
                <span className="rec-social-platform">Instagram</span>
                <span className="rec-social-handle">@ieee_sjce</span>
              </div>
              <ArrowUpRight size={18} className="rec-social-arrow" />
            </a>

            <a
              href="https://www.linkedin.com/company/ieee-sjce/"
              target="_blank"
              rel="noopener noreferrer"
              className="rec-social-card rec-linkedin"
            >
              <div className="rec-social-icon-wrap">
                <Linkedin size={22} />
              </div>
              <div className="rec-social-info">
                <span className="rec-social-platform">LinkedIn</span>
                <span className="rec-social-handle">IEEE-SJCE</span>
              </div>
              <ArrowUpRight size={18} className="rec-social-arrow" />
            </a>
          </div>

          {/* Footer Action */}
          <div className="rec-stagger rec-footer-action">
            <button
              type="button"
              className="rec-ack-btn"
              onClick={onClose}
            >
              GOT IT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
