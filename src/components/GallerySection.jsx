import { useEffect, useRef } from 'react'
import { ImagePlus, Camera } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/gallery.css'

gsap.registerPlugin(ScrollTrigger)

const PLACEHOLDER_COUNT = 8

export default function GallerySection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gal-header > *',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
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
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gal-grid',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="gallery" ref={sectionRef} className="gal-section">
      <div className="gal-inner">
        <div className="gal-header">
          <Camera size={22} className="gal-icon" />
          <h2 className="gal-title">Gallery</h2>
          <p className="gal-subtitle">
            Moments from our events, workshops and celebrations — photos coming soon.
          </p>
        </div>

        <div className="gal-grid">
          {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
            <div
              key={i}
              className={`gal-slot ${i === 0 || i === 5 ? 'gal-slot-wide' : ''}`}
            >
              <div className="gal-placeholder">
                <ImagePlus size={32} strokeWidth={1.5} />
                <span>Photo coming soon</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
