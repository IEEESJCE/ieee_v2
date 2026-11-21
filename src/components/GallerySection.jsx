import { useEffect, useRef, useState } from 'react'
import { Camera, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/gallery.css'

gsap.registerPlugin(ScrollTrigger)

const GALLERY_IMAGES = [
  {
    id: 1,
    src: '/photos/gallery/gall11.jpg',
    alt: 'IEEE-SJCE Flagship Gathering',
    caption: 'Flagship Assembly & Keynote Session',
    span: 'gal-slot-wide',
  },
  {
    id: 2,
    src: '/photos/gallery/gall2.jpg',
    alt: 'IEEE-SJCE Workshop Moment',
    caption: 'Hands-on Technical Workshop',
    span: '',
  },
  {
    id: 3,
    src: '/photos/gallery/gall3.jpg',
    alt: 'IEEE-SJCE Team Celebration',
    caption: 'Student Community & Event Day',
    span: '',
  },
  {
    id: 4,
    src: '/photos/gallery/gall4.jpg',
    alt: 'IEEE-SJCE Prototyping & Project Building',
    caption: 'Prototyping & Hardware Debugging',
    span: '',
  },
  {
    id: 5,
    src: '/photos/gallery/gall5.jpg',
    alt: 'IEEE-SJCE Core Members',
    caption: 'Executive Committee & Student Leaders',
    span: '',
  },
  {
    id: 6,
    src: '/photos/gallery/gall6.jpg',
    alt: 'IEEE-SJCE Event Stage Celebration',
    caption: 'Annual Festivities & Cultural Evening',
    span: 'gal-slot-wide',
  },
  {
    id: 7,
    src: '/photos/gallery/gall8.jpg',
    alt: 'IEEE-SJCE Interactive Mentorship',
    caption: 'Interactive Discussion & Mentorship',
    span: '',
  },
  {
    id: 8,
    src: '/photos/gallery/gall9.jpg',
    alt: 'IEEE-SJCE Project Showcase',
    caption: 'Hardware Demonstrations & Project Expo',
    span: '',
  },
]

export default function GallerySection() {
  const sectionRef = useRef(null)
  const [selectedIdx, setSelectedIdx] = useState(null)

  useEffect(() => {
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

  // Lightbox keyboard controls
  useEffect(() => {
    if (selectedIdx === null) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedIdx(null)
      } else if (e.key === 'ArrowRight') {
        setSelectedIdx((prev) => (prev + 1) % GALLERY_IMAGES.length)
      } else if (e.key === 'ArrowLeft') {
        setSelectedIdx((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedIdx])

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
          <h2 className="gal-title">
            Our <span className="gal-title-accent">Gallery</span>
          </h2>
          <p className="gal-subtitle">
            Glimpses of innovation, hands-on workshops, celebrations, and life at IEEE-SJCE.
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
          className="gal-modal"
          onClick={() => setSelectedIdx(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
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
