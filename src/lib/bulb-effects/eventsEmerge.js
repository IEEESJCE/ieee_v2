import gsap from 'gsap'
import { poseToScreen } from '../bulbBus'
import { getPose, holdPx, sectionScrollTop } from '../bulbPoses'
import { takeOver } from './shared'

/* ═════════════════════════════════════════════════════════════
   Phase 1 — Events: the cards come OUT OF the bulb, right → left.

   Timing:
   - While the Events panel slides up over the hero, the bulb travels to the right.
     The heading and cards stay hidden.
   - Once the panel reaches the top it HOLDS (stays pinned) for extra scrolling
     (HOLDS in bulbPoses.js) and the bulb waits on the right.
   - After a short lead-in (the bulb glides in with damping, so let it arrive),
     the cards come out of the bulb one by one and slide right → left to their
     places. The left-most card leaves first: it has the furthest to travel, like
     a strip feeding out of the bulb.

   It's a scrubbed timeline (progress = scroll position), so scrolling back up
   sends the cards back into the bulb.
   ═════════════════════════════════════════════════════════════ */

const SELECTOR = '.nb-events-wrapper'
const LEAD_IN = 0.15  // first 15% of the hold: wait for the bulb to arrive
const FINISH = 0.9    // cards are all in place by 90% of the hold

export default function eventsEmerge({ isMobile }) {
  const wrapper = document.querySelector(SELECTOR)
  const section = wrapper?.querySelector('.evt-section')
  const pose = getPose(SELECTOR)
  if (!wrapper || !section || !pose || !holdPx(SELECTOR)) return null

  const header = gsap.utils.toArray(section.querySelectorAll('.evt-header > *'))
  const cards = gsap.utils.toArray(section.querySelectorAll('.evt-card-wrapper'))
  if (!cards.length) return null

  // Switch off EventsSection's own fade-in for these elements so the two never fight
  takeOver([...header, ...section.querySelectorAll('.evt-card')])

  // Where is a card on screen when the effect runs? The panel is pinned at the top
  // then, so: its offset inside the section. Measured with the animation's transform
  // removed, so a re-measure mid-animation (GSAP refresh) still gets its normal place.
  const restingPosition = (card) => {
    const prev = card.style.transform
    card.style.transform = 'none'
    const s = section.getBoundingClientRect()
    const c = card.getBoundingClientRect()
    card.style.transform = prev
    return {
      x: c.left + c.width / 2,
      y: c.top - s.top + c.height / 2,
      onScreenX: c.right > 0 && c.left < window.innerWidth,
    }
  }

  // Offset that puts a card's centre on the bulb's centre
  const fromBulb = (card, axis) => {
    const bulbAt = poseToScreen(pose)
    const p = restingPosition(card)
    if (!p.onScreenX) return axis === 'x' ? 60 : 0 // off-screen sideways: short slide in from the right
    if (axis === 'y') return isMobile ? 0 : bulbAt.y - p.y
    const dx = bulbAt.x - p.x
    // phones: a shorter right → left slide
    return isMobile ? gsap.utils.clamp(0, 220, dx) : dx
  }

  const tl = gsap.timeline({
    defaults: { ease: 'power2.out' },
    scrollTrigger: {
      // Exact scroll positions inside the hold (section top + a fraction of the hold).
      // NOT "top top-=…" on the wrapper: the wrapper is itself pinned, and GSAP then
      // shifts the trigger to after the whole pin — the cards would never appear.
      start: () => sectionScrollTop(wrapper) + holdPx(SELECTOR) * LEAD_IN,
      end: () => sectionScrollTop(wrapper) + holdPx(SELECTOR) * FINISH,
      scrub: isMobile ? 0.5 : true,
      invalidateOnRefresh: true, // re-measure on resize / GSAP refresh
    },
  })

  // 1) the heading fades in first
  tl.fromTo(
    header,
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.25, stagger: 0.05 },
    0
  )

  // 2) cards come out of the bulb and slide right → left; left-most leaves first.
  // The cards you can see are spread over the whole timeline; cards scrolled off to
  // the side of the track (not visible anyway) arrive together with the last one.
  const CARD_DUR = 0.45
  const FIRST_AT = 0.1
  const ordered = [...cards].sort((a, b) => restingPosition(a).x - restingPosition(b).x)
  const visibleCount = Math.max(ordered.filter((c) => restingPosition(c).onScreenX).length, 1)
  const step = (1 - FIRST_AT - CARD_DUR) / Math.max(visibleCount - 1, 1)
  ordered.forEach((card, i) => {
    tl.fromTo(
      card,
      {
        x: () => fromBulb(card, 'x'),
        y: () => fromBulb(card, 'y'),
        scale: isMobile ? 0.85 : 0.2,
        opacity: 0,
        filter: isMobile ? 'blur(0px)' : 'blur(8px)',
      },
      { x: 0, y: 0, scale: 1, opacity: 1, filter: 'blur(0px)', duration: CARD_DUR },
      FIRST_AT + Math.min(i, visibleCount - 1) * step
    )
  })

  return () => {
    tl.scrollTrigger?.kill()
    tl.kill()
    gsap.set([...header, ...cards], { clearProps: 'transform,opacity,filter' })
  }
}
