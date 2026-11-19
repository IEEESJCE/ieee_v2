import { useEffect, useRef, useState } from 'react'
import { Camera, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/motion'
import '../styles/gallery.css'

gsap.registerPlugin(ScrollTrigger)

const GALLERY_IMAGES = [
  {
    id: 1,
    src: '/photos/gallery/gall11.webp',
    alt: 'IEEE SJCE Flagship Gathering',
    caption: 'Flagship Assembly & Keynote Session',
    span: 'gal-slot-wide',
    width: 1600,
    height: 1200,
  },
  {
    id: 2,
    src: '/photos/gallery/gall2.webp',
    alt: 'IEEE SJCE Workshop Moment',
    caption: 'Hands-on Technical Workshop',
    span: '',
    width: 1600,
    height: 1200,
  },
  {
    id: 3,
    src: '/photos/gallery/gall3.webp',
    alt: 'IEEE SJCE Team Celebration',
    caption: 'Student Community & Event Day',
    span: '',
    width: 1600,
    height: 1271,
  },
  {
    id: 4,
    src: '/photos/gallery/gall4.webp',
    alt: 'IEEE SJCE Prototyping & Project Building',
    caption: 'Prototyping & Hardware Debugging',
    span: '',
    width: 1600,
    height: 1200,
  },
  {
    id: 5,
    src: '/photos/gallery/gall5.webp',
    alt: 'IEEE SJCE Core Members',
    caption: 'Executive Committee & Student Leaders',
    span: '',
    width: 1600,
    height: 1064,
  },
  {
    id: 6,
    src: '/photos/gallery/gall6.webp',
    alt: 'IEEE SJCE Event Stage Celebration',
    caption: 'Annual Festivities & Cultural Evening',
    span: 'gal-slot-wide',
    width: 1500,
    height: 1000,
  },
  {
    id: 7,
    src: '/photos/gallery/gall8.webp',
    alt: 'IEEE SJCE Interactive Mentorship',
    caption: 'Interactive Discussion & Mentorship',
    span: '',
    width: 1600,
    height: 1200,
  },
  {
    id: 8,
    src: '/photos/gallery/gall9.webp',
    alt: 'IEEE SJCE Project Showcase',
    caption: 'Hardware Demonstrations & Project Expo',
    span: '',
    width: 1600,
    height: 1200,
  },
]

export default function GallerySection() {
  const sectionRef = useRef(null)
  const lightboxRef = useRef(null)
  const closeButtonRef = useRef(null)
  const previousFocusRef = useRef(null)
  const [selectedIdx, setSelectedIdx] = useState(null)
  const isLightboxOpen = selectedIdx !== null

  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gal-header > *',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gal-header',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        '.gal-slot',
        { y: 35, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gal-grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Lock the page and move focus into the lightbox while it is open.
  useEffect(() => {
    if (!isLightboxOpen) return undefined

    previousFocusRef.current = document.activeElement
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = ''
      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus()
      }
    }
  }, [isLightboxOpen])

  // Lightbox keyboard controls, including a focus trap.
  useEffect(() => {
    if (!isLightboxOpen) return undefined

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedIdx(null)
      } else if (e.key === 'ArrowRight') {
        setSelectedIdx((prev) => (prev + 1) % GALLERY_IMAGES.length)
      } else if (e.key === 'ArrowLeft') {
        setSelectedIdx((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)
      } else if (e.key === 'Tab') {
        const focusable = lightboxRef.current?.querySelectorAll(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        )
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen])

  const currentImage = selectedIdx !== null ? GALLERY_IMAGES[selectedIdx] : null

  return (
    <section id="gallery" ref={sectionRef} className="gal-section">
      <div className="gal-inner">
        {/* ─── Header ─── */}
        <div className="gal-header">
          <div className="gal-badge">
            <Camera size={14} />
            <span>MOMENTS & MEMORIES</span>
          </div>
          <h1 className="gal-title">
            Our <span className="gal-title-accent">Gallery</span>
          </h1>
          <p className="gal-subtitle">
            Glimpses of innovation, hands-on workshops, celebrations, and life at IEEE SJCE.
          </p>
        </div>

        {/* ─── Bento Grid ─── */}
        <div className="gal-grid">
          {GALLERY_IMAGES.map((item, idx) => (
            <div
              key={item.id}
              className={`gal-slot ${item.span}`}
              onClick={() => setSelectedIdx(idx)}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.caption}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setSelectedIdx(idx)
                }
              }}
            >
              <div className="gal-slot-img-wrap">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="gal-img"
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  decoding="async"
                />
                <div className="gal-overlay">
                  <p className="gal-caption">{item.caption}</p>
                  <span className="gal-zoom-hint">
                    <Maximize2 size={12} /> Click to expand
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Lightbox Modal ─── */}
      {currentImage && (
        <div
          ref={lightboxRef}
          className="gal-modal"
          onClick={() => setSelectedIdx(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Image preview: ${currentImage.caption}`}
        >
          {/* Close button */}
          <button
            ref={closeButtonRef}
            className="gal-modal-close"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedIdx(null)
            }}
            aria-label="Close image preview"
          >
            <X size={20} />
          </button>

          {/* Previous button */}
          <button
            className="gal-modal-btn gal-modal-prev"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedIdx((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next button */}
          <button
            className="gal-modal-btn gal-modal-next"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedIdx((prev) => (prev + 1) % GALLERY_IMAGES.length)
            }}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Modal Content */}
          <div className="gal-modal-box" onClick={(e) => e.stopPropagation()}>
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="gal-modal-img"
              width={currentImage.width}
              height={currentImage.height}
              loading="eager"
              decoding="async"
            />
            <div className="gal-modal-bar">
              <span className="gal-modal-caption">{currentImage.caption}</span>
              <span className="gal-modal-count">
                {selectedIdx + 1} / {GALLERY_IMAGES.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
