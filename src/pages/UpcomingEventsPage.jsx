import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, CalendarClock, ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Phone } from 'lucide-react'
import gsap from 'gsap'
import '../styles/upcoming-events.css'

/* ─────────────────────────────────────────────
   UPCOMING EVENTS DATA
   To add another event, copy one object below and change its fields.
   Images live in public/photos/upcoming_events/ (filename case must match).
   ───────────────────────────────────────────── */
const UPCOMING_EVENTS = [
  {
    id: 'prayas-2026',
    wing: 'WIE',
    registerUrl: 'https://bit.ly/PRAYAS26VolunteerRegistrationform',
    images: [
      { src: '/photos/upcoming_events/prayas1.jpeg', alt: 'PRAYAS — Call for Volunteers poster' },
      { src: '/photos/upcoming_events/prayas2.jpeg', alt: 'What is PRAYAS? — poster explaining the initiative' },
    ],
    quote: {
      text: 'Education is the most powerful weapon which you can use to change the world.',
      author: 'Nelson Mandela',
    },
    details: [
      { icon: Calendar, label: 'Date', value: '15th November 2026' },
      { icon: Clock, label: 'Time', value: '3:00 PM' },
      { icon: MapPin, label: 'Venue', value: 'PEJAWARA HOSTEL' },
    ],
    contacts: [
      { name: 'Apoorva', phone: '94497 42005' },
      { name: 'Gouthami', phone: '91136 41265' },
    ],
    // Caption body — paragraphs shown in order between the quote and the details
    body: (
      <>
        <p>Hola folks! 🌻</p>
        <p>Greetings from IEEE-SJCE! ✨</p>
        <p>A little guidance and encouragement can open up a world of possibilities for young minds. 💡</p>
        <p className="upe-post-callout">📢 CALL FOR VOLUNTEERS! 📢</p>
        <p>Join the WIE wing of IEEE-SJCE as a volunteer for:</p>
        <p className="upe-post-event-name">🌻 PRAYAS 🌻</p>
        <p className="upe-post-expansion">Platform for Rendering Aids to Young minds And Spreading smiles!</p>
        <p>
          PRAYAS is an initiative dedicated to empowering underprivileged children through
          interactive STEM activities and hands-on projects. 📚
        </p>
        <p>
          Be a part of this initiative by introducing young learners to interesting concepts,
          guiding them through engaging activities, and encouraging them to explore their
          creativity. Your time and enthusiasm can make their experience truly memorable! 🌟
        </p>
      </>
    ),
    closing: (
      <>
        <p>
          So, what are you waiting for? Be a part of this initiative by registering through the
          link in the bio.
        </p>
        <p>Let&apos;s come together to inspire young minds and spread smiles! 🌈</p>
      </>
    ),
  },
]

/* Instagram-style photo carousel: swipe / scroll, arrows and dots */
function PhotoCarousel({ images }) {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)

  // Keep the dots in sync when the user swipes or scrolls the track themselves
  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    const i = Math.round(track.scrollLeft / track.clientWidth)
    if (i !== index) setIndex(i)
  }

  const goTo = (i) => {
    const track = trackRef.current
    if (!track) return
    const clamped = Math.max(0, Math.min(images.length - 1, i))
    track.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className="upe-carousel">
      <div className="upe-carousel-track" ref={trackRef} onScroll={handleScroll}>
        {images.map((img) => (
          <img key={img.src} src={img.src} alt={img.alt} className="upe-carousel-img" loading="lazy" />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            className="upe-carousel-btn upe-carousel-prev"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous photo"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="upe-carousel-btn upe-carousel-next"
            onClick={() => goTo(index + 1)}
            disabled={index === images.length - 1}
            aria-label="Next photo"
          >
            <ChevronRight size={18} />
          </button>

          <div className="upe-carousel-dots">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                className={`upe-carousel-dot ${i === index ? 'is-active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Show photo ${i + 1} of ${images.length}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function UpcomingEventsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    gsap.fromTo(
      '.upe-hero > *',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.15 }
    )
    gsap.fromTo(
      '.upe-body > *',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', delay: 0.4 }
    )
  }, [])

  return (
    <div className="upe-page">
      <header className="upe-hero">
        <CalendarClock size={28} className="upe-hero-icon" />
        <h1>Upcoming Events</h1>
        <p>Workshops, talks and competitions coming up at IEEE-SJCE.</p>
      </header>

      <div className="upe-body">
        {UPCOMING_EVENTS.map((evt) => (
          <article key={evt.id} className="upe-post">
            <PhotoCarousel images={evt.images} />

            <div className="upe-post-content">
              {/* Instagram-style header */}
              <div className="upe-post-header">
                <img src="/logo.png" alt="" className="upe-post-avatar" />
                <div className="upe-post-handle">
                  <strong>IEEE-SJCE</strong>
                  <span>{evt.wing} Wing</span>
                </div>
              </div>

              <div className="upe-post-caption">
                <blockquote className="upe-post-quote">
                  &ldquo;{evt.quote.text}&rdquo;
                  <cite>— {evt.quote.author}</cite>
                </blockquote>

                {evt.body}

                <ul className="upe-post-details">
                  {evt.details.map(({ icon: Icon, label, value }) => (
                    <li key={label}>
                      <Icon size={16} />
                      <span>{label}:</span>
                      <strong>{value}</strong>
                    </li>
                  ))}
                </ul>

                {evt.closing}

                <div className="upe-post-contacts">
                  <span className="upe-post-contacts-title">For further queries, contact:</span>
                  {evt.contacts.map((c) => (
                    <a key={c.phone} href={`tel:+91${c.phone.replace(/\s/g, '')}`}>
                      <Phone size={14} />
                      {c.name}: {c.phone}
                    </a>
                  ))}
                </div>

                {/* Floating register button — sticks to the bottom of the caption while it scrolls */}
                {evt.registerUrl && (
                  <div className="upe-register-float">
                    <a
                      href={evt.registerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="upe-register-btn"
                    >
                      Register Now <ArrowUpRight size={16} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
