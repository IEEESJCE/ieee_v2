import gsap from 'gsap'
import { bulb, flashBulb } from '../bulbBus'
import { holdPx, sectionScrollTop } from '../bulbPoses'
import { takeOver } from './shared'

/* ═════════════════════════════════════════════════════════════
   Phase 2 — Flagship Events: lightning from the bulb to each poster.

   - The section HOLDS (bulbPoses HOLDS) so the bulb has arrived before anything fires.
   - Shortly into the hold, a jagged glowing bolt shoots from the bulb's LIVE position
     to each visible poster, one after another. Each bolt draws in fast, flashes and
     fades; the bulb flickers brighter (flashBulb) and the poster lights up and appears.
   - Scrolling back up above that point: posters go dark again (no bolts).
     Scrolling down again replays the strikes.
   - Phones: no bolts — each poster just lights up with a yellow flash (bulb still flickers).

   Safety: strikes are ≥ 0.36 s apart (under 3 flashes per second — the
   photosensitive-seizure limit), small, and very short.
   ═════════════════════════════════════════════════════════════ */

const SELECTOR = '.nb-milestones-wrapper'
const FIRE_AT = 0.2   // fire 20% into the hold (bulb has settled)
const GAP = 0.36      // seconds between strikes
const BOLT_DRAW = 0.11
const BOLT_FADE = 0.22

const HIDDEN = { opacity: 0, scale: 0.94, filter: 'brightness(0.3) drop-shadow(0 0 0px rgba(255, 213, 74, 0))' }

/* ─── Bolt geometry: midpoint displacement → a jagged line from a to b ─── */
function jaggedPoints(a, b, roughness, depth) {
  let pts = [a, b]
  let disp = Math.hypot(b.x - a.x, b.y - a.y) * roughness
  for (let d = 0; d < depth; d++) {
    const next = [pts[0]]
    for (let i = 0; i < pts.length - 1; i++) {
      const p = pts[i]
      const q = pts[i + 1]
      const dx = q.x - p.x
      const dy = q.y - p.y
      const len = Math.hypot(dx, dy) || 1
      const off = (Math.random() * 2 - 1) * disp
      // midpoint pushed sideways (perpendicular to the segment)
      next.push({ x: (p.x + q.x) / 2 - (dy / len) * off, y: (p.y + q.y) / 2 + (dx / len) * off }, q)
    }
    pts = next
    disp *= 0.55
  }
  return pts
}

const toPath = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')

/** A main bolt plus 1–2 short forks, as SVG path strings. */
function boltPaths(from, to) {
  const main = jaggedPoints(from, to, 0.16, 5)
  const paths = [toPath(main)]
  const forks = 1 + Math.round(Math.random())
  const len = Math.hypot(to.x - from.x, to.y - from.y)
  for (let f = 0; f < forks; f++) {
    const start = main[Math.floor(main.length * (0.3 + Math.random() * 0.4))]
    const angle = Math.atan2(to.y - from.y, to.x - from.x) + (Math.random() < 0.5 ? -1 : 1) * (0.4 + Math.random() * 0.4)
    const end = { x: start.x + Math.cos(angle) * len * 0.22, y: start.y + Math.sin(angle) * len * 0.22 }
    paths.push(toPath(jaggedPoints(start, end, 0.2, 3)))
  }
  return paths
}

/* ─── The overlay the bolts are drawn on: fixed, full-screen, never blocks clicks ─── */
const SVG_NS = 'http://www.w3.org/2000/svg'
function createOverlay() {
  const svg = document.createElementNS(SVG_NS, 'svg')
  svg.setAttribute('class', 'bolt-overlay')
  svg.setAttribute('aria-hidden', 'true')
  svg.innerHTML = `
    <defs>
      <filter id="bolt-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" />
      </filter>
      <radialGradient id="bolt-impact">
        <stop offset="0%" stop-color="#fffbe6" stop-opacity="1" />
        <stop offset="40%" stop-color="#ffd54a" stop-opacity="0.7" />
        <stop offset="100%" stop-color="#ffd54a" stop-opacity="0" />
      </radialGradient>
    </defs>`
  Object.assign(svg.style, {
    position: 'fixed', inset: '0', width: '100vw', height: '100vh',
    pointerEvents: 'none', zIndex: '95', overflow: 'visible',
  })
  document.body.appendChild(svg)
  return svg
}

/** Draw one bolt from → to: glow + core + forks, draw in fast, flash, fade, remove. */
function strike(svg, from, to) {
  const g = document.createElementNS(SVG_NS, 'g')
  const make = (d, stroke, width, extra = {}) => {
    const p = document.createElementNS(SVG_NS, 'path')
    p.setAttribute('d', d)
    p.setAttribute('fill', 'none')
    p.setAttribute('stroke', stroke)
    p.setAttribute('stroke-width', width)
    p.setAttribute('stroke-linecap', 'round')
    p.setAttribute('stroke-linejoin', 'round')
    Object.entries(extra).forEach(([k, v]) => p.setAttribute(k, v))
    g.appendChild(p)
    return p
  }
  const [main, ...forks] = boltPaths(from, to)
  const strokes = [
    make(main, '#ffd54a', 10, { opacity: '0.55', filter: 'url(#bolt-glow)' }), // soft glow
    make(main, '#ffd54a', 3.2),                                               // yellow body
    make(main, '#fffbe6', 1.3),                                               // white-hot core
    ...forks.map((d) => make(d, '#ffe58a', 1.6, { opacity: '0.85' })),
  ]
  const impact = document.createElementNS(SVG_NS, 'circle')
  impact.setAttribute('cx', to.x)
  impact.setAttribute('cy', to.y)
  impact.setAttribute('r', '34')
  impact.setAttribute('fill', 'url(#bolt-impact)')
  impact.setAttribute('opacity', '0')
  g.appendChild(impact)
  svg.appendChild(g)

  // "draw" each stroke from the bulb to the poster using a dash the length of the path
  strokes.forEach((p) => {
    const len = p.getTotalLength()
    p.style.strokeDasharray = `${len}`
    p.style.strokeDashoffset = `${len}`
  })
  return gsap.timeline({ onComplete: () => g.remove() })
    .to(strokes, { strokeDashoffset: 0, duration: BOLT_DRAW, ease: 'power2.out' })
    .to(impact, { opacity: 1, duration: 0.05 }, BOLT_DRAW * 0.8)
    .to(g, { opacity: 0, duration: BOLT_FADE, ease: 'power1.in' }, BOLT_DRAW + 0.03)
}

/** The poster lights up: bright yellow flash, then settles to normal. */
function lightUp(poster) {
  return gsap.timeline()
    .fromTo(poster, HIDDEN, {
      opacity: 1, scale: 1,
      filter: 'brightness(1.7) drop-shadow(0 0 22px rgba(255, 213, 74, 0.85))',
      duration: 0.12, ease: 'power2.out',
    })
    .to(poster, {
      filter: 'brightness(1) drop-shadow(0 0 0px rgba(255, 213, 74, 0))',
      duration: 0.5, ease: 'power2.out',
      onComplete: () => gsap.set(poster, { clearProps: 'filter,transform' }),
    })
}

export default function flagshipBolts({ isMobile }) {
  const wrapper = document.querySelector(SELECTOR)
  const posters = gsap.utils.toArray(wrapper?.querySelectorAll('.ms-poster') || [])
  if (!wrapper || !posters.length || !holdPx(SELECTOR)) return null

  // Switch off the section's own poster fade-in, then start the posters dark
  takeOver(posters)
  gsap.set(posters, HIDDEN)

  const svg = isMobile ? null : createOverlay()
  let sequence = null // the running strike sequence
  let fired = false

  const isOnScreen = (el) => {
    const r = el.getBoundingClientRect()
    return r.right > 0 && r.left < window.innerWidth && r.bottom > 0 && r.top < window.innerHeight
  }

  const fire = () => {
    if (fired) return
    fired = true
    sequence?.kill()
    sequence = gsap.timeline()
    const visible = posters.filter(isOnScreen)
    // posters scrolled off to the side of the filmstrip: just appear (no bolt)
    posters.filter((p) => !visible.includes(p)).forEach((p) => gsap.set(p, { opacity: 1, scale: 1, clearProps: 'filter,transform' }))

    visible.forEach((poster, i) => {
      sequence.add(() => {
        flashBulb(0.9)
        if (svg && bulb.visible) {
          const r = poster.getBoundingClientRect()
          // strike the top-centre of the poster, from the bulb's live position
          strike(svg, { x: bulb.x, y: bulb.y + bulb.radius * 0.6 }, { x: r.left + r.width / 2, y: r.top + 12 })
          gsap.delayedCall(BOLT_DRAW, () => lightUp(poster))
        } else {
          lightUp(poster)
        }
      }, i * GAP)
    })
  }

  const reset = () => {
    if (!fired) return
    fired = false
    sequence?.kill()
    gsap.killTweensOf(posters)
    gsap.to(posters, { ...HIDDEN, duration: 0.25, ease: 'power1.out' })
  }

  // Exact scroll position (not "top top-=…": the wrapper is itself pinned, see eventsEmerge.js)
  const trigger = gsap.timeline({
    scrollTrigger: {
      start: () => sectionScrollTop(wrapper) + holdPx(SELECTOR) * FIRE_AT,
      end: () => sectionScrollTop(wrapper) + holdPx(SELECTOR) * FIRE_AT + 1,
      invalidateOnRefresh: true,
      onEnter: fire,        // scrolling down past it → strikes
      onLeaveBack: reset,   // scrolling back up above it → posters go dark
    },
  }).scrollTrigger

  // Loaded (or refreshed) already below that point: show the posters, no strikes
  if (window.scrollY > trigger.start) {
    fired = true
    gsap.set(posters, { opacity: 1, scale: 1, clearProps: 'filter,transform' })
  }

  return () => {
    trigger.kill()
    sequence?.kill()
    gsap.killTweensOf(posters)
    gsap.set(posters, { clearProps: 'opacity,transform,filter' })
    svg?.remove()
  }
}
