import { Handshake } from 'lucide-react'
import '../styles/sponsors.css'

// Logos are carried over from the legacy site in their original order.
// The legacy alt text was placeholder content, so no sponsor names are claimed here.
const SPONSORS = [
  { src: '/photos/sponsors/10.png', alt: 'Sponsor logo 1' },
  { src: '/photos/sponsors/11.png', alt: 'Sponsor logo 2' },
  { src: '/photos/sponsors/12.png', alt: 'Sponsor logo 3' },
  { src: '/photos/sponsors/13.png', alt: 'Sponsor logo 4' },
  { src: '/photos/sponsors/14.png', alt: 'Sponsor logo 5' },
  { src: '/photos/sponsors/15.png', alt: 'Sponsor logo 6' },
  { src: '/photos/sponsors/16.png', alt: 'Sponsor logo 7' },
  { src: '/photos/sponsors/17.png', alt: 'Sponsor logo 8' },
  { src: '/photos/sponsors/18.png', alt: 'Sponsor logo 9' },
  { src: '/photos/sponsors/19.png', alt: 'Sponsor logo 10' },
]

function SponsorGroup({ hidden = false }) {
  return (
    <div className="spn-group" aria-hidden={hidden || undefined}>
      {SPONSORS.map((sponsor) => (
        <div className="spn-logo-tile" key={sponsor.src}>
          <img
            src={sponsor.src}
            alt={hidden ? '' : sponsor.alt}
            decoding="async"
          />
        </div>
      ))}
    </div>
  )
}

export default function SponsorSection() {
  return (
    <section id="sponsors" className="spn-section">
      <div className="spn-inner">
        <div className="spn-header">
          <Handshake size={22} className="spn-header-icon" />
          <h2 className="spn-title">Our Sponsors</h2>
          <p className="spn-subtitle">
            The organisations whose support helps IEEE-SJCE continue its workshops,
            competitions and outreach programmes.
          </p>
        </div>

        <div className="spn-marquee">
          <div className="spn-track">
            <SponsorGroup />
            <SponsorGroup hidden />
          </div>
        </div>
      </div>
    </section>
  )
}
