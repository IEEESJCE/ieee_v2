import { useEffect } from 'react'
import { BadgeCheck, Hourglass } from 'lucide-react'
import gsap from 'gsap'
import '../styles/membership.css'

export default function MembershipPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    gsap.fromTo(
      '.mbr-hero > *',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.15 }
    )
    gsap.fromTo(
      '.mbr-body > *',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', delay: 0.4 }
    )
  }, [])

  return (
    <div className="mbr-page">
      <header className="mbr-hero">
        <BadgeCheck size={28} className="mbr-hero-icon" />
        <h1>Membership</h1>
        <p>Become a part of IEEE-SJCE and grow with a global community of engineers.</p>
      </header>

      <div className="mbr-body">
        {/* Placeholder — real membership content will replace this card */}
        <div className="mbr-card">
          <Hourglass size={22} className="mbr-card-icon" />
          <h2>Details Coming Soon</h2>
          <p>Membership benefits, plans and the joining process will be published here shortly.</p>
        </div>
      </div>
    </div>
  )
}
