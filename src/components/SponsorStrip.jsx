import '../styles/sponsors.css'

/* ─────────────────────────────────────────────
   Sponsor logo strip — a compact, continuously scrolling row of logos.
   Shown at the top of the footer, just above the address.
   (Replaces the old full "Our Sponsors" section.)
   Logos are carried over from the legacy site in their original order.
   The legacy alt text was placeholder content, so no sponsor names are claimed here.
   ───────────────────────────────────────────── */
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

// The logos are rendered twice so the loop is seamless; the copy is hidden from screen readers
function SponsorGroup({ hidden = false }) {
  return (
    <div className="spn-group" aria-hidden={hidden || undefined}>
      {SPONSORS.map((sponsor) => (
        <div className="spn-logo-tile" key={sponsor.src}>
          <img src={sponsor.src} alt={hidden ? '' : sponsor.alt} loading="lazy" decoding="async" />
        </div>
      ))}
    </div>
  )
}

export default function SponsorStrip() {
  return (
    <section className="spn-strip" aria-labelledby="spn-strip-title">
      {/* visible only to screen readers, so the logos still have a heading */}
      <h2 id="spn-strip-title" className="spn-sr-only">Our sponsors</h2>
      <div className="spn-marquee">
        <div className="spn-track">
          <SponsorGroup />
          <SponsorGroup hidden />
        </div>
      </div>
    </section>
  )
}
