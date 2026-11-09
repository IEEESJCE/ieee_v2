import gsap from 'gsap'
import { holdPx, sectionScrollTop } from '../bulbPoses'
import { takeOver } from './shared'

/* ═════════════════════════════════════════════════════════════
   Phase 5 — Our Societies: the wing tiles come OUT OF the centred bulb.

   Timing (all inside the Societies hold, see HOLDS + the pose in bulbPoses.js):
   - The section reaches the top and HOLDS. The bulb has grown and sits in the exact
     centre of the screen. The heading fades in; the tiles are hidden.
   - After a short lead-in (the bulb glides in with damping, so let it arrive), the
     tiles come out of the bulb one by one — nearest to the centre first, like a burst —
     each growing from small and blurred at the bulb's centre to its place in the grid.
   - From 72% of the hold the bulb shrinks back into the centre and fades out (holdSteps),
     so it never stays on top of tile text.

   Scrubbed timeline (progress = scroll position): scrolling back up sends the tiles
   back into the bulb. The bulb sits at the exact screen centre, so that's where they
   start — no pose maths needed.
   ═════════════════════════════════════════════════════════════ */

const SELECTOR = '.nb-societies-wrapper'
const LEAD_IN = 0.12 // first 12% of the hold: let the bulb arrive
const FINISH = 0.68  // all tiles in place by 68% (the bulb starts shrinking at 72%)

export default function societiesEmerge() {
  // phones have no Societies hold (HOLDS), so this returns early there
  const wrapper = document.querySelector(SELECTOR)
  const section = wrapper?.querySelector('.sct-section')
  if (!wrapper || !section || !holdPx(SELECTOR)) return null

  const header = gsap.utils.toArray(section.querySelectorAll('.sct-header > *'))
  const tiles = gsap.utils.toArray(section.querySelectorAll('.sct-tile'))
  if (!tiles.length) return null

  // Switch off SocietiesSection's own fade-in for these elements so the two never fight
  takeOver([...header, ...tiles])

  // Where a tile's centre is on screen while the section is pinned at the top of the
  // screen: its offset inside the section. Measured with the animation's transform
  // removed, so a re-measure mid-animation (GSAP refresh) still gets its normal place.
  const restingCentre = (tile) => {
    const prev = tile.style.transform
    tile.style.transform = 'none'
    const s = section.getBoundingClientRect()
    const t = tile.getBoundingClientRect()
    tile.style.transform = prev
    return { x: t.left + t.width / 2, y: t.top - s.top + t.height / 2 }
  }

  // Offset that puts a tile's centre on the screen centre (= the bulb's glass)
  const fromBulb = (tile, axis) => {
    const p = restingCentre(tile)
    return axis === 'x' ? window.innerWidth / 2 - p.x : window.innerHeight / 2 - p.y
  }

  const setTransitions = (on) => tiles.forEach((t) => { t.style.transition = on ? '' : 'none' })

  const tl = gsap.timeline({
    defaults: { ease: 'power2.out' },
    scrollTrigger: {
      // Exact scroll positions inside the hold (see eventsEmerge.js for why not "top top-=…")
      start: () => sectionScrollTop(wrapper) + holdPx(SELECTOR) * LEAD_IN,
      end: () => sectionScrollTop(wrapper) + holdPx(SELECTOR) * FINISH,
      scrub: true,
      invalidateOnRefresh: true, // re-measure on resize / GSAP refresh
      onUpdate: (self) => {
        // The tiles' CSS hover transition (transform 0.22s) would make every scrubbed
        // frame lag behind, so it's off while they're moving…
        const done = self.progress >= 1
        setTransitions(done)
        // …and once they've arrived, drop the inline transform/filter GSAP left behind,
        // so the CSS hover lift works again. (Scrolling back re-applies them.)
        if (done) gsap.set(tiles, { clearProps: 'transform,filter' })
      },
    },
  })

  // 1) the heading fades in first
  tl.fromTo(header, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.2, stagger: 0.05 }, 0)

  // 2) tiles come out of the bulb, nearest to the centre first
  const TILE_DUR = 0.4
  const FIRST_AT = 0.12
  const distance = (tile) => Math.hypot(fromBulb(tile, 'x'), fromBulb(tile, 'y'))
  const ordered = [...tiles].sort((a, b) => distance(a) - distance(b))
  const step = (1 - FIRST_AT - TILE_DUR) / Math.max(ordered.length - 1, 1)
  ordered.forEach((tile, i) => {
    tl.fromTo(
      tile,
      {
        x: () => fromBulb(tile, 'x'),
        y: () => fromBulb(tile, 'y'),
        scale: 0.15,
        opacity: 0,
        filter: 'blur(8px)',
      },
      { x: 0, y: 0, scale: 1, opacity: 1, filter: 'blur(0px)', duration: TILE_DUR, immediateRender: true },
      FIRST_AT + i * step
    )
  })

  return () => {
    tl.scrollTrigger?.kill()
    tl.kill()
    setTransitions(true)
    gsap.set([...header, ...tiles], { clearProps: 'transform,opacity,filter' })
  }
}
